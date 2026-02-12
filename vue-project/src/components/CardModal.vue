<script setup>
import { defineProps, defineEmits } from 'vue';
const {card, slot} = defineProps({
    card: {
        type: Object,
        required: true
    },
    slot: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['close', 'loadPrev', 'loadNext']);

const closeModal = () => {
    emit('close', true);
}

</script>

<template>
    <teleport to="body">
        <div class="modal-overlay" @click.self="closeModal" role="dialog" aria-modal="true">
            <div class="modal-content">
                
                <div class="modal-content-row">
                    <div class="cardslot">{{ slot }}</div>
                    <button class="close-button" @click="closeModal" aria-label="Close modal">&times;</button>
                </div>
                <h2>{{ card.name }}</h2>
                <div class="modal-content-row">
                    <div id="cardPrev" class="modalNav" @click="emit('loadPrev')"><<</div>
                    <img :src="'http://localhost:3000' + card.image" :alt="card.name" />
                    <div id="cardNext" class="modalNav" @click="emit('loadNext')">>></div>
                </div>
                <p><strong>Description:</strong> {{ card.description }}</p>
            </div>
        </div>
    </teleport>
</template>