function createCard(contentDiv, path, span = null) {
    obj = document.createElement("div")
    obj.classList.add("card")
    obj.classList.add("lazy")
    obj.setAttribute("data-src", path);
    if (span != null) {
        spanElement = document.createElement("span");
        spanElement.textContent = span;
        obj.appendChild(spanElement);
    }
    contentDiv.appendChild(obj)
    return obj;
}

function createVideo(id, classes = []) {
    return createElementFromHTML(`<iframe${classes.length > 0 ? ` class=${classes.join(" ")}` : ''} src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
}

function createA(link, child, classes = []) {
    return `<a href="${link}"${classes.length > 0 ? ` class="${classes.join(' ')}"` : ''} target="_blank" ref="noopener noreferrer">${child}</a>`;
}

overlay = document.getElementById("overlay")
returnToSummary = document.getElementById("return-to-summary")
imageWrapper = document.querySelector("#overlay > .imageWrapper")
watchingImage = false;

function toggleOverlay(src = "") {
    if (watchingImage) {
        overlay.style.display = "none"
        returnToSummary.style.display = "block"
        imageWrapper.removeChild(imageWrapper.querySelector("img"));
        document.body.style.overflow = "";
        watchingImage = false;
    } else {
        overlay.style.display = "block"
        overlay.style.top = `${window.scrollY}px`
        returnToSummary.style.display = "none"
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

// Lazyloading: thanks to this guide https://imagekit.io/blog/lazy-loading-images-complete-guide/

document.addEventListener("DOMContentLoaded", function() {
    var lazyloadImages;

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    console.log(image)
                    image.style["background-image"] = `url('${image.getAttribute("data-src")}')`
                    image.classList.remove("lazy");
                    image.addEventListener("click", (e) => {
                        src = e.target.style["background-image"].replace(/^url\("(.*)"\)$/gm, `$1`)
                        console.log(src)
                        if (!src.startsWith("./") || e.target.classList.contains("no-zoom")) return;
                        toggleOverlay(src.replace(/thumbnails/, "images"))
                    });
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll(".lazy");

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function() {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function(img) {
                    if (img.offsetTop < (window.innerHeight + scrollTop)) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener("scroll", lazyload);
                    window.removeEventListener("resize", lazyload);
                    window.removeEventListener("orientationChange", lazyload);
                }
            }, 20);
        }

        document.addEventListener("scroll", lazyload);
        window.addEventListener("resize", lazyload);
        window.addEventListener("orientationChange", lazyload);
    }
})