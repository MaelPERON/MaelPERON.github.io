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

// Dessin Académique
// Perspective
// Photographie
contentDiv = document.querySelector("#photography > .content");
array = [
    ["dissociation", "Dissociation #{{i}}", 3],
    ["night", "", 8],
    ["pierres et roches", "", 6],
    ["setup", "", 2],
    ["verres", "", 6],
    ["others", "", 1]
].forEach(elements => {
    [path, customName, elementNumber] = elements;
    another_array = [...Array(elementNumber).keys()].forEach((e, i) => {
        createCard(contentDiv, `./assets/thumbnail/photography/${path}/${i+1}.jpg`, customName != "" ? customName.replace(/{{i}}/g, (i + 1)) : null)
    })
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
                        toggleOverlay(src.replace(/thumbnail/, "img"))
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