<script setup>
import VBoxHeader from './VBoxHeader.vue';
import VTextArea from './VTextArea.vue'
import VTranslate from './VTranslate.vue';
import { toast } from 'vue3-toastify';
const { ipcRenderer } = window;

</script>

<script>
export default {
    data () {
        return {
            changeLanguageType: undefined,
            languageTranslate: {lang: 'Autodetect', short: 'Autodetect'},
            languageTranslated: {lang: "English", short: "en"},
            languageTitle: "Select Language",
            data: '',
            dataTranslated: '',
            loadData: false,
            mimetype: { mimetype: 'application/json', extension: 'json' },
            clearData: false
        }
    },

    methods: {
        checkElectron () {
            try {
                ipcRenderer
            } catch(e) {
                return false
            }
            return true;
        },
        updateData (args) {
            if(this.changeLanguageType && args.type == 'changeLanguageType') return this.changeLanguageType = undefined;

            if(args.type == 'clearData') return this.clearData = !this.clearData;

            this[args.type] = args.data;

            if(args.type == 'data') this.translate();

            if(args.type == 'switchLanguage') {
                const languageTranslated = this.languageTranslated;

                if(this.languageTranslate.lang == 'Autodetect') this.languageTranslated = { lang: "Portuguese", short: "pt"};
                else this.languageTranslated = this.languageTranslate;
                
                this.languageTranslate = languageTranslated;
            };

        },
        translate () {
            let data = {
                languageTranslate: this.languageTranslate, 
                languageTranslated: this.languageTranslated,
                data: this.data
            };

            if(!this.checkElectron()) {
                this.loadData = false;
                toast.error("You need use the electron app", {
                    autoClose: 3000,
                    position: toast.POSITION.TOP_RIGHT,
                    limit: 1,
                    theme: 'dark',
                });
                
                return;
            };

            ipcRenderer.send('translate', JSON.stringify(data));
            ipcRenderer.receive('translate', (value) => {
                this.dataTranslated = value;
            });
        },
        fileUpload (e) {
            const file = e.target.files;
            // download file
            // read file
            // translate 

        }

    },
}   
</script>

<template>

    <!-- <div>
        <div>   
            <button class="file--upload" id="button" name="button" value="upload">
                <font-awesome-icon :icon="['fas', 'note-sticky']" />
                Translate Files
                <input @change="fileUpload" type="file"/>
            </button>
        </div>
    </div> -->
    
    <div class="center">
        <div class="vbox--content">
            
            <VBoxHeader :languageTitleTranslate="languageTranslate && languageTranslate.lang" :languageTitleTranslated="languageTranslated && languageTranslated.lang"  :changeLanguageType="changeLanguageType" @updateData="updateData" />
            <div class="flex">
                <VTextArea v-if="!changeLanguageType || changeLanguageType === 'translated'" position="left" :clearData="clearData" :languageTranslate="languageTranslate" :languageTranslated="languageTranslated" @updateData="updateData"/>
                <VTranslate v-if="changeLanguageType === 'translate'" changeLanguageType="languageTranslate" @updateData="updateData" />
                

                <VTextArea v-if="!changeLanguageType || changeLanguageType === 'translate'" position="right" :loadData="loadData" :dataTranslated="dataTranslated" @updateData="updateData"/>
                <VTranslate v-if="changeLanguageType === 'translated'" changeLanguageType="languageTranslated" @updateData="updateData" />
            </div>
        </div>
    </div>
</template>

<style>
.center {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width:100%;
    /* height:100vh; */
    margin-top:3.5em;
}
.flex {
    display:flex;
    /* display: grid; */
    /* grid-template-columns:  repeat(auto-fill, minmax(100px, 100%)); */
    /* grid-template: 600px 600px; */
}
.vbox--content {
    max-width: 1200px;
    width:98vw;
    /* margin:0 1em; */
    background-color: #101010;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 4px 4px 4px rgba(0,0,0,.8);
    /* border:2px solid rgba(0,0,0,.8); */
    /* border: 1px solid rgba(0,0,0,.3); */
}

.file--upload {
    position: relative;
    overflow: hidden;
    margin: 10px;
}
.file--upload input {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    filter: alpha(opacity=0);
}




</style>