<script setup>
import { useRoute } from 'vue-router';
import { ref, reactive, onMounted, defineExpose, onUnmounted } from 'vue';
const route = useRoute();
import router from '@/router/index.js';
import CardSpread from './CardSpread.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import CardSwiper from './CardSwiper.vue';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

// Swiper.use([Navigation, Pagination]);



// const swiper = new Swiper('.swiper', {
//     // Swiper options
//     direction: 'horizontal',
//     loop: true,
//     slidesPerView: 1,
//     spaceBetween: 10,
//     effect: 'cards',
//     cardsEffect: {
//         slideShadows: true,
//     },
//     grabCursor: true,
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//   },
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//     },
//     observer: true,
//     observeParents: true,
//     // Add other options as needed
// });

let spreadType = ref("");
const options = ref([
    { value: 'onecard', text: 'One Card' },
    { value: 'threecard', text: 'Three Card' },
    { value: 'celtic_cross', text: 'Celtic Cross' },
    { value: 'relationship', text: 'Relationship' },
    { value: 'career', text: 'Career' }
]);
let showSpreadSelection = ref(false);
let drawLimit = ref(0);
let drawCount = ref(0);
const spread = reactive({
    cards: []
});
let isVisible = ref(false);
let isLoading = ref(true);
let showShuffleSuccess = ref(false);
let showCutSuccess = ref(false);

const spreadHelper = async (type) => {
    try {
        const response = await fetch(`http://localhost:3000/cards/spread?type=${type}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
            if (response.status === 404) {
                console.log("Spread type not found");
                router.push('/notfound');
            }
        }
        const cards = await response.json();
        if (!Array.isArray(cards)) {
            spread.cards.push(cards);
        }
        else {
            spread.cards.push(...cards);
        }

        console.log("Fetched spread cards:", spread.cards);
        // return spread.cards;
        // You can store spreadCards in a reactive variable if needed
    } catch (error) {
        console.log(`Error fetching ${type} spread:`, error);
        router.push('/error');
        router.refresh();
    }
};

const handleSpreadChange = async (event) => {
    const selectedSpread = spreadType.value;
    drawCount.value = 0; // Reset draw count on spread change
    console.log("Selected spread type:", selectedSpread);
    // You can add logic here to navigate to the selected spread route if needed
    switch (selectedSpread) {
        case 'onecard':
            drawLimit.value = 1;
            // window.location.href = '/spread/onecard';
            break;
        case 'threecard':
            drawLimit.value = 3;
            //window.location.href = '/spread/threecard';
            break;
        case 'celtic_cross':
            //window.location.href = '/spread/celtic_cross';
            drawLimit.value = 10;
            break;
        case 'relationship':
            drawLimit.value = 3;
            //window.location.href = '/spread/relationship';
            break;
        case 'career':
            drawLimit.value = 5;
            //window.location.href = '/spread/career';
            break;
        default:
            break;
    }
};

const spreadLoad = async (type) => {
    try {
        await spreadHelper(type);
        console.log("Completed " + type + " spread fetch.");
        // router.push('/spread/onecard');  
    } catch (error) {
        console.log("Error handling " + type + " spread:", error);
        router.push('/error');
    } finally {
        showSpreadSelection.value = true;
        isLoading.value = false;
        console.log("isLoading set to false, showSpreadSelection set to true.");
    }
};

const handleDraw = async () => {
    // let spreadCards = [];
    console.log("handleDraw called.");  
    if (spreadType.value === "") {
        isVisible.value = true;
        setTimeout(() => {
            isVisible.value = false;
        }, 5000);
        return;
    }
    if (drawCount.value < drawLimit.value || drawCount.value === 0) {
        ++drawCount.value;
        console.log(`Card drawn. Total drawn: ${drawCount.value}`);
        // Add logic to display the drawn card
    }
    if (drawCount.value === drawLimit.value && drawLimit.value !== 0) {

        switch (spreadType.value) {
            case 'onecard':
                spreadLoad('onecard');
                // router.push('/spread/onecard');
                break;
            case 'threecard':
                spreadLoad('threecard');
                // router.push('/spread/threecard');
                break;
            case 'celtic_cross':
                spreadLoad('celtic_cross');
                // router.push('/spread/celtic_cross');
                break;
            case 'relationship':
                spreadLoad('relationship');
                // router.push('/spread/relationship');
                break;
            case 'career':
                spreadLoad('career');
                // router.push('/spread/career');
                break;
            default:
                break;
        }
        shuffleCards();
    }
};

onMounted(() => {
    isVisible.value = false;
    showSpreadSelection.value = false;
});

onUnmounted(() => {
    const tooltip = document.getElementById('tooltip');
    // tooltip.removeEventListener('click');
});

const shuffleCards = async () => {
    // Implement shuffle logic here
    try {
        const response = await fetch('http://localhost:3000/cards/shuffle');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.log("the error response is: ", error.status);
        if (error.status === 404) {
            console.log("Shuffle endpoint not found.");
            router.push('/notfound');
            router.refresh();
        }
        else {
            console.log("Server error while shuffling cards.");
            router.push('/error');
            router.refresh();
        }
    }
    showShuffleSuccess.value = true;
    setTimeout(() => {
        showShuffleSuccess.value = false;
    }, 3000);

};

const cutCards = async () => {
    // Implement cut logic here
    try {
        const response = await fetch('http://localhost:3000/cards/cut');
        const cards = await response.json();
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        if (error.status === 404) {
            console.log("Cut endpoint not found.");
            router.push('/notfound');
            router.refresh();
        }
        else {
            console.log("Server error while cutting cards:", error);
            router.push('/error');
            router.refresh();
        }
    }
    showCutSuccess.value = true;
    setTimeout(() => {
        showCutSuccess.value = false;
    }, 3000);

};

function onEnter(el, done) {
    el.style.height = 'auto';
    const height = getComputedStyle(el).height;
    el.style.height = '0';
    getComputedStyle(el); // Force reflow
    el.style.transition = 'height 0.5s ease-in-out';
    el.style.height = height;

    el.addEventListener('transitionend', done, { once: true });
}

function onLeave(el, done) {
    el.style.height = getComputedStyle(el).height;
    getComputedStyle(el); // Force reflow
    el.style.transition = 'height 0.5s ease-in-out';
    el.style.height = '0';

    el.addEventListener('transitionend', done, { once: true });
}

const resetHome = () => {
    showSpreadSelection.value = false;
    spread.cards = [];
    spreadType.value = "";
    drawCount.value = 0;
    drawLimit.value = 0;
    isLoading.value = true;
    isVisible.value = false;
    showCutSuccess.value = false;
    showShuffleSuccess.value = false;
};

defineExpose({
    resetHome
});

</script>

<template>
    <div v-if="showSpreadSelection" class="spread-selection">
        <CardSpread v-if="!isLoading" :spreadCards="spread.cards" :spreadType="spreadType" @resethome="resetHome" />
        <PulseLoader v-else :size="'15'" :loading="true" />
    </div>
    <div v-else class="wrap">
        <div class="wrap">
            <label for="spreads">Choose a Spread</label><br />
            <select v-model="spreadType" @change="handleSpreadChange" name="spreads" id="spreads">
                <option disabled value="">Please select one</option>
                <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
            </select>
        </div>
        <div v-if="spreadType">
            <p>Drawn {{ drawCount }} out of {{ drawLimit }}</p>
        </div>
        <transition name="collapse-transition" @enter="onEnter" @leave="onLeave" :css="false">
            <div class="tooltip collapsible-content" v-if="isVisible">
                <p>You must select a spread before drawing cards.</p>
            </div>
        </transition>
        <CardSwiper @handleDraw="handleDraw" @shuffleDeck="shuffleCards" @cutDeck="cutCards" />
        <!-- <div class="swiper"> -->
        <!-- <div class="swiper">
            <div class="cardNav swiper-button-prev"><</div>
            <div class="tarot-card" id="tarot-card" aria-label="Tarot card">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        slide 1
                        <img src="../assets/images/image140.png" />
                    </div>
                    <div class="swiper-slide">
                        slide 2
                        <img src="../assets/images/image140.png" />
                    </div>
                    <div class="swiper-slide">
                        slide 3
                        <img src="../assets/images/image140.png" />
                    </div>
                    <div class="swiper-slide">
                        slide 4
                        <img src="../assets/images/image140.png" />
                    </div>
                </div>
                     <img src="../assets/images/image140.png" /> -->
                <transition name="collapse-transition2" @enter="onEnter" @leave="onLeave" :css="false">
                    <div id="tooltip" class="tooltip" v-if="isVisible">
                        <ul>
                            <li>Swipe</li>
                            <li>Left to Shuffle</li>
                            <li>Right to Draw</li>
                            <li>Down to Cut the Deck</li>
                        </ul>
                    </div>
                </transition>
                    <transition name="collapse-transition3">
                        <div class="tooltip" v-if="showShuffleSuccess">
                            <p>Shuffle Successful</p>
                        </div>
                    </transition>
                    <transition name="collapse-transition4">
                        <div class="tooltip" v-if="showCutSuccess">
                            <p>Cut Successful</p>
                        </div> 
                    </transition>
            <!-- </div>
            <div class="cardNav swiper-button-next">></div>
         </div> --> 
        <!-- </div> -->


        <div class="card-actions" id="card-actions">
            <button id="btn-shuffle" type="button" @click="shuffleCards">Shuffle</button>
            <button id="btn-cut" type="button" @click="cutCards">Cut</button>
            <button id="btn-draw" type="button" @click="handleDraw">Draw</button>
        </div>
    </div>
</template>


<style scoped>
/* Define the transition properties, duration, and easing */
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

/* Define the starting state for entering and the ending state for leaving */
.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(20px);
}

/* Define the ending state for entering and the starting state for leaving (defaults to final CSS state) */
.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}
</style>