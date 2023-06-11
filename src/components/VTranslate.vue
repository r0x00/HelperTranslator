<script setup></script>
<script>
export default {
    props: ['changeLanguageType'],
    data() {
        return {
            translations: [ 
                { lang: "Autodetect", short: "Autodetect"},
                { lang: "Portuguese", short: "pt"},
                { lang: "English", short: "en"},
                { lang: "Spanish", short: "es"},
                { lang: "French", short: "fr"},
            ],
        }
    },
    methods: {
        changeLanguage (type) {
            this.$emit('updateData', { type: this.changeLanguageType, data: type });
            this.$emit('updateData', { type: 'changeLanguageType', data: undefined });
        }
    }
}
</script>
<template>

    <div class="vtranslate">  
        <ul>
            <li v-for="lang of translations" v-on:click="changeLanguage({lang: lang.lang, short: lang.short})">{{lang.lang}}</li>
        </ul>
    </div>

</template>
<style>
.vtranslate {
    border:1px solid rgba(0,0,0,.8);
    width:100%;
    height: 500px;
    font-size:18px;
    padding:25px;
    display: grid;
}
.vtranslate ul {
    list-style: none;
    display: grid;
    width: 100%;
    padding: 0;
    gap:10px;
    grid-template-columns: repeat(auto-fill, minmax(1rem, 10rem));
    grid-template-rows: repeat(auto-fill, 5rem);
    text-align: left; 
}
.vtranslate li:focus,
.vtranslate li:hover {
    color:#ff2929;
    cursor: pointer;
}
</style>