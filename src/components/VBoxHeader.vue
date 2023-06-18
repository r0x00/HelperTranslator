<script setup>
import VButton from './VButton.vue'

</script>

<script>
export default {
    props: ['changeLanguageType', 'languageTitleTranslate', 'languageTitleTranslated'],
    methods: {
        changeLanguage (type) {
            this.$emit('updateData', { type: 'changeLanguageType', data: type });
        },
        switchLanguage () {
            this.$emit('updateData', { type: 'switchLanguage'});
        },
        clearTextArea() {
            this.$emit('updateData', { type: 'clearData' });
        }
    }
}
</script>

<template>
    <div class="vbox--header">
        <div class="vflex">
            <div class="vselect" v-on:click="changeLanguage('translate')">
                <p class="vselect--name">{{ !languageTitleTranslate ? 'Select Language' : languageTitleTranslate }}</p>
                <font-awesome-icon :icon="['fas', 'angle-down']" />
            </div>
            <font-awesome-icon @click="clearTextArea" class="vselect--icon " :icon="['fas', 'trash']" />
            
        </div>

        <font-awesome-icon @click="switchLanguage" class="vselect--icon" :icon="['fas', 'arrow-right-arrow-left']" />

        <div class="vselect" v-on:click="changeLanguage('translated')">
            <p class="vselect--name">{{ !languageTitleTranslated ? 'Select Language' : languageTitleTranslated }}</p>
            <font-awesome-icon :icon="['fas', 'angle-down']" />
        </div>
    </div>
</template>

<style>
.vbox--header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding:15px 25px ;
}
.vselect {
    width:48%;
    font-size: 16px;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.vselect--name {
    margin: 0;
    margin-right:.5em;
}
.vselect:focus,
.vselect:hover, 
.vselect--icon:focus,
.vselect--icon:hover {
    color: #ff2929;
}
.vselect--icon {
    cursor: pointer;
}
.vflex {
    width:48%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>