<script setup>
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { defineEmits } from 'vue';
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/effect-cards';
  import { EffectCards } from 'swiper/modules';

const modules = [EffectCards];

const emit = defineEmits(['handleDraw','shuffleDeck','cutDeck']);

    const onSlidePrev = () => {
        console.log('slide prev transition end');
        emit('handleDraw');
    }
    const onSlideNext = () => {
        console.log('slide next transition end');
        emit('shuffleDeck');
    }
    const onSwiper = (swiper) => {
        console.log(swiper);
    }
    // const onSlideChange = () => {
    //     console.log('slide change');
    //     // emit('handleDraw');
    // }
    const verticalSlideChange = (swiper) => {
        console.log('vertical slide change');
        emit('cutDeck');
    }
</script>

<template>
  <swiper
    :slides-per-view="1"
    :space-between="0"
    :loop="true"
    :effect="'cards'"
    :grab-cursor="true"
    :modules="modules"
    :threshold="10"
    :short-swipes="true"
    :edge-swipe-threshold="0"
    :direction ="'horizontal'"
    :css-mode="false"
    :centered-slides="true"
    @swiper="onSwiper"
    @slideNextTransitionEnd="onSlideNext"
    @slidePrevTransitionEnd ="onSlidePrev"
    >   
  
        <swiper-slide>
            <!-- <img src="../assets/images/image140.png" /> -->
            <div class="vertical-swiper">
                <swiper :direction ="'vertical'" :slides-per-view="1" :modules='modules' :effect="'cards'" :loop="true" :nested="true" @slideChange="verticalSlideChange" :space-between="0">
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>                
                </swiper>
            </div> 
        </swiper-slide>
        <swiper-slide>
            <!-- <img src="../assets/images/image140.png" /> -->
            <div class="vertical-swiper">
                <swiper :direction ="'vertical'" :slides-per-view="1" :modules='modules' :effect="'cards'" :loop="true" :nested="true" @slideChange="verticalSlideChange" :space-between="0">
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide> 
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>                
                </swiper>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="vertical-swiper">
                <swiper :direction ="'vertical'" :slides-per-view="1" :modules='modules' :effect="'cards'" :loop="true" :nested="true" @slideChange="verticalSlideChange" :space-between="0">
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                </swiper>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="vertical-swiper">
                <swiper :direction ="'vertical'" :slides-per-view="1" :modules='modules' :effect="'cards'" :loop="true" :nested="true" @slideChange="verticalSlideChange" :space-between="0">
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                </swiper>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="vertical-swiper">
                <swiper :direction ="'vertical'" :slides-per-view="1" :modules='modules' :effect="'cards'" :loop="true" :nested="true" @slideChange="verticalSlideChange" :space-between="0">
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                </swiper>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="vertical-swiper">
                <swiper :direction ="'vertical'" :slides-per-view="1" :modules='modules' :effect="'cards'" :loop="true" :nested="true" @slideChange="verticalSlideChange" :space-between="0">
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                </swiper>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="vertical-swiper">
                <swiper :direction ="'vertical'" :slides-per-view="1" :modules='modules' :effect="'cards'" :loop="true" :nested="true" @slideChange="verticalSlideChange" :space-between="0">
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                </swiper>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="vertical-swiper">
                <swiper :direction ="'vertical'" :slides-per-view="1" :modules='modules' :effect="'cards'" :loop="true" :nested="true" @slideChange="verticalSlideChange" :space-between="0">
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                </swiper>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="vertical-swiper">
                <swiper :direction ="'vertical'" :slides-per-view="1" :modules='modules' :effect="'cards'" :loop="true" :nested="true" @slideChange="verticalSlideChange" :space-between="0">
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                </swiper>
            </div>
        </swiper-slide>
        <swiper-slide>
            <div class="vertical-swiper">
                <swiper :direction ="'vertical'" :slides-per-view="1" :modules='modules' :effect="'cards'" :loop="true" :nested="true" @slideChange="verticalSlideChange" :space-between="0">
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>
                    <swiper-slide><img src="../assets/images/image140.png" /></swiper-slide>                 
                </swiper>
            </div>
        </swiper-slide>
         <!-- <swiper-slide :v-for="card in cards" :key="card.id">
            <div class="card-content" :style="{ backgroundColor: card.color }">
                {{ card.text }}
            </div>
        </swiper-slide>  -->
  </swiper>
</template>
