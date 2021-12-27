particles = []

function randomNumber(min, max, r = 2) {
    return (Math.floor(Math.random() * (max - min)) + min).toFixed(r)
}

overlay = document.getElementById("overlay")
imageWrapper = document.querySelector("#overlay > .imageWrapper")
watchingImage = false;

function toggleOverlay(src = "") {
    if (watchingImage) {
        overlay.style.display = "none"
        imageWrapper.removeChild(imageWrapper.querySelector("img"));
        document.body.style.overflow = "";
        watchingImage = false;
    } else {
        overlay.style.display = "block"
        overlay.style.top = `${window.scrollY}px`
        obj = document.createElement("img")
        obj.setAttribute("src", src)
        imageWrapper.appendChild(obj)
        document.body.style.overflow = "hidden"
        watchingImage = true;
    }
}

document.addEventListener("keyup", e => {
    console.log(e.key)
    if (e.key == "Escape" && watchingImage) {
        toggleOverlay()
    }
})

overlay.addEventListener("click", (e) => {
    if (e.target.nodeName.toLowerCase() !== "img" && watchingImage) {
        toggleOverlay()
    }
})