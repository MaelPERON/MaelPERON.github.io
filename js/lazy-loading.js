// Lazyloading: thanks to this guide https://imagekit.io/blog/lazy-loading-images-complete-guide/
function cardLoading(image){
    if (image.classList.contains("video")) {
        videoElement = createElementFromHTML(`<iframe id="player" type="text/html"
        src="http://www.youtube.com/embed/${image.getAttribute("data-src").replace("http://www.youtube.com/embed/","")}"
        frameborder="0"></iframe>`)
        image.append(videoElement)
    }
    image.style["background-image"] = `url('${image.getAttribute("data-src")}')`
    image.classList.remove("lazy");
}

function lazyLoading() {
    var lazyloadImages;

    if ("IntersectionObserver" in window) {
        lazyloadImages = document.querySelectorAll(".lazy");
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    imageObserver.unobserve(image);
                    cardLoading(image)
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
                        cardLoading(img)
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
}