import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowsUpDownLeftRight, faAngleDown, faArrowRightArrowLeft, faNoteSticky, faTrash} from "@fortawesome/free-solid-svg-icons";
library.add(faArrowsUpDownLeftRight, faAngleDown, faArrowRightArrowLeft, faNoteSticky, faTrash);
import 'vue3-toastify/dist/index.css';


createApp(App)
.component("font-awesome-icon", FontAwesomeIcon)
.mount('#app')
