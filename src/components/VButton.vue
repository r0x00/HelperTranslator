<script>
export default {
    props: ['name', 'dHref', 'dName', 'type'],
    methods: {
        fileUpload: () => {

        }
    }
}

</script>

<template>
    <div v-if="type == 'upload'">
        <input type="file" id="file" style="display:none;" />
        <button id="button" name="button" value="upload" onclick="fileUpload();">{{ name }}</button>
    </div>

    <div v-if="type == 'download'">
        <a v-bind:href="dHref"  v-bind:download="dName">{{ name }}</a>
    </div>

    <!-- <div v-if="!type">
        <button name="button" value="upload">{{ name }}</button>
    </div> -->
    
</template>

<style>
.button--style {

}
</style>