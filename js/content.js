function createCard(contentDiv, path, span) {
    obj = document.createElement("div")
    obj.classList.add("card")
    obj.classList.add("lazy")
    obj.setAttribute("data-src", path);
    if (span != undefined) {
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

function createSection(contentDiv, id, section){
    displayName = section.displayName != undefined ? section.displayName : id
    collection = createElementFromHTML(`<div class="collection" id="${id}"><h1>${displayName != undefined ? displayName : id}</h1>${section.description != undefined ? `<p>${section.description}</p>` : ""}</div>`);
    document.querySelector(".summary-nav").appendChild(createElementFromHTML(`<li class="summary-item"><a href="#${id}"><span>${displayName != undefined ? displayName : id}</span></a></li>`))
    grid = createElementFromHTML(`<div class="grid"></div>`)
    section.value.forEach(object => {
        object.folder = section.folder;
        createObject(object)
    })
    // cards = !Array.isArray(objects) ? [...Array(objects).keys()].map(x => x+1) : objects
    // cards.forEach(e => {
    //     createCard(grid, `./files/photography/${folder}/thumbnails/${e}.jpg`, undefined)
    // })
    collection.appendChild(grid)
    contentDiv.appendChild(collection)
}

function createObject(object){
    switch(object.type){
        case "card":
            createCard(grid, `./files/${object.folder}/${object.value}`, undefined)
            break;
        case "cards":
            object.value.forEach(card => {
                createCard(grid, `./files/${object.folder}/${card}`, undefined)
            })
            break;
        case "video":
            [videoId, classes] = object.value
            grid.append(createVideo(videoId, classes))
        default:
            break;
    }
}

mainDiv = document.querySelector(".main")
overlay = document.getElementById("overlay")
returnToSummary = document.getElementById("return-to-summary")

for(const [id, section] of Object.entries(content)){
    createSection(contentDiv, id, section)
}

document.addEventListener("keyup", (e) => {
    if(["ArrowRight","ArrowLeft","Escape"].includes(e.key)) e.preventDefault();
    switch(e.key) {
        case "ArrowRight":
            plusItem(carousel);
            break;
        case "ArrowLeft":
            minusItem(carousel);
            break;
        case "Escape":
            deleteCarousel(carousel);
            break;
        default:
            break;
    }
})

document.addEventListener("toggleOverlay", (e) => {
    options = e.detail
    if(options.toClose){
        document.body.style.overflow = "";
        overlay.style.display = "none";
        returnToSummary.style.display = "block";
    } else {
        carousel = createCarousel(options.overlaySection, options.cards.map(card => card.dataset.src));
        if(options.cardIndex) showItems(carousel, options.cardIndex)
        document.body.style.overflow = "hidden";
        overlay.style.display = "block";
        overlay.style.top = `${window.scrollY}px`;
        returnToSummary.style.display = "none";
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
                    image.style["background-image"] = `url('${image.getAttribute("data-src")}')`
                    image.classList.remove("lazy");
                    image.addEventListener("click", (e) => {
                        card = e.target
                        return document.dispatchEvent(new CustomEvent('toggleOverlay', {detail: {toClose: false, cards: Array.from(card.parentElement.querySelectorAll(".card")), cardIndex: Array.prototype.indexOf.call(card.parentNode.children, card), overlaySection: overlay.querySelector(".section")}}))
                    })
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