if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register('/drawing-canvas/serviceWorker.js', {scope: '/drawing-canvas/'})
      .then(registration => {
          console.log("service worker registered");
      }).catch(error => {
          console.log("service worker not registered", error);
  })
}