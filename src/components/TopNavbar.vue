<scripts>
</scripts>

<template>
    <div class="topnavbar">
        <p class="title">Helper Translator</p>
        <font-awesome-icon class="icon--drag" :icon="['fas', 'arrows-up-down-left-right']" />
    </div>

</template>

<style>
.title {
    font-weight: 700;
    letter-spacing: -1px;
    font-size: 18px;
    word-spacing: -3px;
    margin:0;
    cursor: pointer;
}
.title:hover {
    color:#ff2929;
}
.topnavbar {
    display:flex;
    justify-content: space-between;
    align-items: center;
    /* width: 100%; */
    position: absolute;
    top:0;
    left:0;
    right:0;
    padding:15px;
}
.icon--drag {
    -webkit-app-region: drag;
    font-size: 25px;
}
.icon--drag:hover {
    color: #ff2929;
}

</style>