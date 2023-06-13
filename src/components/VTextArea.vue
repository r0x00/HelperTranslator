<script>
    export default {
        props: ['position', 'languageTranslate', 'languageTranslated', 'dataTranslated', 'loadData'],
        data() {
            return {
                textArea: this.position == 'right' ? this.dataTranslated : '',
                count: 0,
                isTyping: undefined,
                load: this.loadData
            }
        },
        methods: {
            textAreaChange () {
                if(this.position == 'right') return;

                if(this.position == 'left') {
                    this.$emit('updateData', { type: 'loadData', data: true });
                };

                if(this.textArea == '') {
                    this.$emit('updateData', { type: 'loadData', data: false });
                    this.$emit('updateData', { type: 'dataTranslated', data: this.textArea });
                    clearInterval(this.isTyping);
                    return;
                };
                
                clearInterval(this.isTyping);

                this.isTyping = setInterval(() => {
                    if(this.count <= 5) return this.count++;

                    this.$emit('updateData', { type: 'data', data: this.textArea });

                    this.count = 0;

                    clearInterval(this.isTyping);
                }, 1000);
            }
        },
        watch: {
            'dataTranslated' (newVal, oldVal) {
                if(oldVal != newVal) {
                    this.$emit('updateData', { type: 'loadData', data:false });
                    this.textArea = newVal;
                }
            },
            'loadData' (newVal, oldVal) {
                if(oldVal != newVal) this.load = newVal
            }
        }
    }
</script>

<template>
    <div class="position--relative">
        <div class="lds-center" v-if="load">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        
        <textarea class="vtextarea"  v-on:input="textAreaChange" v-model="textArea" v-bind:class="position == 'left' ? 'vtextarea--left' : 'vtextarea--right'" cols="80" rows="10"></textarea>
    </div>
</template>

<style>

.lds-center {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.position--relative {
    position: relative;
    width:100%;
    max-width: 600px;
    background: none;
    border:1px solid rgba(0,0,0,.8);
    height: 50vh;
    max-height: 500px;
    padding:25px;
}

.vtextarea {
    resize: none;
    width:100%;
    background: none;
    border: unset;
    height: max-content;
    outline: unset;
    font-size:20px;
    
}
.position--relative:focus-within {
    outline: none;
    border:1px solid #ff2929;
}
.vtextarea--left {
    border-radius: 0 0 0 5px;
}

.vtextarea--right {
    border-left: unset;
    border-radius: 0  0 5px 0;
}
</style>