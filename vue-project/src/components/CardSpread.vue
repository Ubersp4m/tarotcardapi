<script setup>
import { useRoute } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { ref, onMounted, defineEmits, defineProps } from 'vue';
import CardModal from './CardModal.vue';
const route = useRoute();
// const spreadType = route.params.type;

const { spreadCards, spreadType } = defineProps({
    spreadCards: {
        type: Array,
        required: true
    },
    spreadType: {
        type: String,
        required: true
    }
});

const close = ref(true);
const modalCard = ref(null);
const cardSlot = ref("");


const emit = defineEmits(['resethome']);

const imageURL = spreadCards.map(card => {
    return `http://localhost:3000${card.image}`;
});

const backgroundStyle = (index) => {
    return {
        backgroundImage: `url('${imageURL[index]}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };
};

onMounted(() => {
    console.log("Mounted CardSpread with spreadType:", spreadType);
    console.log("Mounted CardSpread with spreadCards:", spreadCards);
});

const closeModal = () => {
    close.value = true;
};

const findCardSlot = (card) => {
    switch (spreadType) {
        case 'onecard':
            cardSlot.value = "Present Moment";
            break;
        case 'threecard':
            // Determine slot based on card position in three card spread
            const index = spreadCards.indexOf(card);
            if (index === 0) {
                cardSlot.value = "Past";
            } else if (index === 1) {
                cardSlot.value = "Present";
            } else if (index === 2) {
                cardSlot.value = "Future";
            } else {
                cardSlot.value = "Unknown";
            }
            break;
        case 'celtic_cross':
            // Determine slot based on card id or position in celtic cross spread
            const ccIndex = spreadCards.indexOf(card);
            switch (ccIndex) {
                case 0:
                    cardSlot.value = "Present Situation";
                    break;
                case 1:
                    cardSlot.value = "Challenge";
                    break;
                case 2:
                    cardSlot.value = "Subconscious Influences";
                    break;
                case 3:
                    cardSlot.value = "Past Influences";
                    break;
                case 4:
                    cardSlot.value = "Conscious Goals";
                    break;
                case 5:
                    cardSlot.value = "Future Influences";
                    break;
                case 6:
                    cardSlot.value = "Advice";
                    break;
                case 7:
                    cardSlot.value = "External Influences";
                    break;
                case 8:
                    cardSlot.value = "Hopes and Fears";
                    break;
                case 9:
                    cardSlot.value = "Outcome";
                    break;
                default:
                    cardSlot.value = "Unknown Position";
            }
            break;
        case 'relationship':
            // Determine slot based on card position in relationship spread
            const relIndex = spreadCards.indexOf(card);
            if (relIndex === 0) {
                cardSlot.value = "You";
            } else if (relIndex === 1) {
                cardSlot.value = "Partner";
            } else {
                cardSlot.value = "Relationship Theme";
            }
            break;
        case 'career':
            // Determine slot based on card position in career spread
            const carIndex = spreadCards.indexOf(card);
            if (carIndex === 0) {
                cardSlot.value = "Current Situation";
            } else if (carIndex === 1) {
                cardSlot.value = "Strengths";
            } else if (carIndex === 2) {
                cardSlot.value = "Challenges";
            } else if (carIndex === 3) {
                cardSlot.value = "Opportunities";
            } else {
                cardSlot.value = "Action Plan";
            }
            break;
        default:
            cardSlot.value = "Unknown Spread Type";
    }
}

const openModal = (card) => {
    modalCard.value = card;
    close.value = false;
    findCardSlot(card);
};

const cardPrev = () => {
    const modalIndex = spreadCards.indexOf(modalCard.value)
    if(modalIndex!==0){
        close.value = true;
        openModal(spreadCards[modalIndex-1]);
    }   
}

const cardNext = () => {
    const modalIndex = spreadCards.indexOf(modalCard.value)
    if(modalIndex!==(spreadCards.length-1)){
        close.value = true;
        openModal(spreadCards[modalIndex+1]);
    }
}

const resetHome = () => {
    emit('resethome');
};

</script>


<template>
    <div class="spread">
        <CardModal v-if="!close" :card="modalCard" @loadPrev="cardPrev" @loadNext="cardNext" :slot="cardSlot" @close="closeModal" />
        <div class="onecard" v-if="spreadType === 'onecard' && spreadCards.length > 0">
            <div class="title">{{ spreadCards[0].name }}</div>
            <div class="tarot-card" id="tarot-card" aria-label="Tarot card" :style="backgroundStyle(0)" @click="openModal(spreadCards[0])">
                <!-- <img src="'http://localhost:3000' + spreadCards[0].image" /> -->
            </div>
            <!-- <div class="description">{{ spreadCards[0].description }}</div> -->
        </div>
        <div class="celtic_cross" v-else-if="spreadType === 'celtic_cross' && spreadCards.length > 0">
            <div class="title">Celtic Cross Spread</div>
            <div class="cards-grid">
                <!-- <div v-for="(card, index) in spreadCards" :key="index" class="tarot-card"
                    :style="backgroundStyle(index)" :aria-label="'Card ' + (index + 1) + ': ' + card.name"> -->
                <!-- <img :src="'http://localhost:3000' + card.image" /> -->
                <section class="celtic-cross" aria-label="Celtic Cross spread">
                    <!-- Cross area (visual layout can be handled by CSS) -->
                    <div class="cross-area" role="group" aria-label="Cross">
                        <div class="pos pos1" data-pos="1" aria-label="Position 1" @click="openModal(spreadCards[0])"
                            :style="backgroundStyle(0)"></div>
                        <div class="pos pos2" data-pos="2" aria-label="Position 2" @click="openModal(spreadCards[1])"
                            :style="backgroundStyle(1)"></div>
                        <div class="pos pos3" data-pos="3" aria-label="Position 3" @click="openModal(spreadCards[2])"
                            :style="backgroundStyle(2)"></div>
                        <div class="pos pos4" data-pos="4" aria-label="Position 4" @click="openModal(spreadCards[3])"
                            :style="backgroundStyle(3)"></div>
                        <div class="pos pos5" data-pos="5" aria-label="Position 5" @click="openModal(spreadCards[4])"
                            :style="backgroundStyle(4)"></div>
                        <div class="pos pos6" data-pos="6" aria-label="Position 6" @click="openModal(spreadCards[5])"
                            :style="backgroundStyle(5)"></div>
                    </div>

                    <!-- Staff area (vertical stack to the right) -->
                    <aside class="staff-area" role="group" aria-label="Staff">
                        <div class="pos pos7" data-pos="7" aria-label="Position 7" @click="openModal(spreadCards[6])"
                            :style="backgroundStyle(6)"></div>
                        <div class="pos pos8" data-pos="8" aria-label="Position 8" @click="openModal(spreadCards[7])"
                            :style="backgroundStyle(7)"></div>
                        <div class="pos pos9" data-pos="9" aria-label="Position 9" @click="openModal(spreadCards[8])"
                            :style="backgroundStyle(8)"></div>
                        <div class="pos pos10" data-pos="10" aria-label="Position 10" @click="openModal(spreadCards[9])"
                            :style="backgroundStyle(9)"></div>
                    </aside>
                </section>
                <!-- </div> -->
            </div>
        </div>
        <div v-else-if="spreadType === 'threecard' && spreadCards.length > 0" class="threecard">
            <div class="title">Three Card Spread</div>
            <div class="cards-row">
                <div class="tarot-card" id="tarot-card" aria-label="Past card" :style="backgroundStyle(0)" @click="openModal(spreadCards[0])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[0].image" /> -->
                </div>
                <div class="tarot-card" id="tarot-card" aria-label="Present card" :style="backgroundStyle(1)" @click="openModal(spreadCards[1])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[1].image" /> -->
                </div>
                <div class="tarot-card" id="tarot-card" aria-label="Future card" :style="backgroundStyle(2)" @click="openModal(spreadCards[2])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[2].image" /> -->
                </div>
            </div>
        </div>
        <div v-else-if="spreadType === 'relationship' && spreadCards.length > 0">
            <div class="title">Relationship Spread</div>
            <div class="cards-row">
                <div class="tarot-card" id="tarot-card" aria-label="You card" :style="backgroundStyle(0)" @click="openModal(spreadCards[0])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[0].image" /> -->
                </div>
                <div class="tarot-card" id="tarot-card" aria-label="Partner card" :style="backgroundStyle(1)" @click="openModal(spreadCards[1])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[1].image" /> -->
                </div>
                <div class="tarot-card" id="tarot-card" aria-label="Relationship Theme card" :style="backgroundStyle(2)" @click="openModal(spreadCards[2])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[2].image" /> -->  
                </div>     
            </div>
        </div>
        <div v-else-if="spreadType === 'career' && spreadCards.length > 0">
            <div class="title">Career Spread</div>
            <div class="cards-row">
                <div class="tarot-card" id="tarot-card" aria-label="Current Situation card" :style="backgroundStyle(0)" @click="openModal(spreadCards[0])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[0].image" /> -->
                </div>
                <div class="tarot-card" id="tarot-card" aria-label="Challenge card" :style="backgroundStyle(1)" @click="openModal(spreadCards[1])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[1].image" /> -->
                </div>
                <div class="tarot-card" id="tarot-card" aria-label="Advice card" :style="backgroundStyle(2)" @click="openModal(spreadCards[2])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[2].image" /> -->
                </div>
                <div class="tarot-card" id="tarot-card" aria-label="Outcome card" :style="backgroundStyle(3)" @click="openModal(spreadCards[3])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[3].image" /> -->
                </div>
                <div class="tarot-card" id="tarot-card" aria-label="Future card" :style="backgroundStyle(4)" @click="openModal(spreadCards[4])">
                    <!-- <img :src="'http://localhost:3000' + spreadCards[4].image" /> -->
                </div>
            </div>
        </div>
        <div v-else>
            <PulseLoader :size="'15'" :loading="true" />
        </div>
        <div class="buttons">
            <button @click="resetHome">Back to Home</button>
            <button @click="$router.push('/cards')">View All Cards</button>
            <button @click="handleSaveSpread">Save Spread</button>
        </div>
    </div>
</template>