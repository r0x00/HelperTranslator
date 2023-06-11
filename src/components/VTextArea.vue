<script>
    export default {
        props: ['position', 'languageTranslate', 'languageTranslated', 'dataTranslated'],
        data() {
            return {
                textArea: this.position == 'right' ? this.dataTranslated : '',
                count: 0,
                isTyping: undefined
            }
        },
        methods: {
            textAreaChange () {
                if(this.position == 'right') return;

                if(this.textArea == '') {
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
                if(oldVal != newVal) this.textArea = newVal
            }
        }
    }
</script>

<template>
    <textarea class="vtextarea"  v-on:input="textAreaChange" v-model="textArea" v-bind:class="position == 'left' ? 'vtextarea--left' : 'vtextarea--right'" cols="80" rows="10"></textarea>
</template>

<style>

.vtextarea {
    resize: none;
    background: none;
    border:1px solid rgba(0,0,0,.8);
    width:100%;
    max-width: 600px;
    height: 500px;
    font-size:20px;
    padding:25px;
}
.vtextarea:focus {
    outline: none;
    border:1px solid #ff2929; ;
}
.vtextarea--left {
    border-radius: 0 0 0 5px;
}

.vtextarea--right {
    border-left: unset;
    border-radius: 0  0 5px 0;
}
</style>