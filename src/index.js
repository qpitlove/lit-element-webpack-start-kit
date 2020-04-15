import "./styles.css";
import "./views/todo-view.js";

async function registerSW() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (e) {
      console.error("ServiceWorker registration failed. Sorry about that.", e);
    }
  }
}

window.addEventListener("load", (e) => {
  // registerSW();
});
