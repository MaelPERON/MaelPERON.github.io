function createCarousel(overlaySection, images) {
    carousel = createElementFromHTML(`\
    <div class="carousel-container">\
        ${images.map(image => {
            return `<div class="item" style="display: none">\
                <div class="image" style="background-image: url('${image}')"></div>\
            </div>`
        }).join("")}
        <a href="" class="carousel-button exit">\
            <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-xmark" class="svg-inline--fa exit-svg fa-circle-xmark" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M336.1 175c-9.375-9.375-24.56-9.375-33.94 0L256 222.1L208.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03L175 303c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L256 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94l-47.03-47.03l47.03-47.03C346.3 199.6 346.3 184.4 336.1 175zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256S512 397.4 512 256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z"></path></svg>\
        </a>\
        <a href="" class="carousel-button prev">\
            <svg class="svg-inline--fa prev-svg fa-angle-left fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>\
        </a>\
        <a href="" class="carousel-button next">\
            <svg class="svg-inline--fa next-svg fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>\
        </a>\
    </div>\
    `)

    insertNumbers(carousel);

    document.addEventListener("keyup", (e) => {
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

    carousel.querySelectorAll(".carousel-button").forEach(button => {
        button.addEventListener("click", (e) => {
            buttonAction = button.classList.item(1)
            e.preventDefault();
            if(buttonAction == "exit") deleteCarousel(carousel);
            if(buttonAction == "prev") minusItem(carousel);
            if(buttonAction == "next") plusItem(carousel);
        })
    })

    insertDots(carousel);

    carousel.querySelectorAll(".dot").forEach((dot) => {
        dot.addEventListener("click", (e) => {
            let item = Array.prototype.indexOf.call(
                e.target.parentNode.children,
                e.target
            );

            showItems(carousel, item);
        });
    });

    showItems(carousel, 0);

    overlaySection.append(carousel)

    return carousel
}

function deleteCarousel(carousel){
    document.dispatchEvent(new CustomEvent("toggleOverlay", {detail: {toClose: true}}))
    return carousel.parentElement.removeChild(carousel)
}

function insertNumbers(carousel) {
    const length = carousel.querySelectorAll(".item").length;
    for (let i = 0; i < length; i++) {
        const nmbr = document.createElement("div");
        nmbr.classList.add("numbertext");
        nmbr.innerText = i + 1 + " / " + length;

        carousel.querySelectorAll(".item")[i].append(nmbr);
    }
}

function insertDots(carousel) {
    const dots = document.createElement("div");
    dots.classList.add("dots");

    carousel.append(dots);

    carousel.querySelectorAll(".item").forEach((elem) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");

        carousel.querySelector(".dots").append(dot);
    });
}

function plusItem(carousel) {
    let item = currentItem(carousel);

    carousel
        .querySelectorAll(".item")[item].nextElementSibling.classList.contains("item") ?
        showItems(carousel, item + 1) :
        showItems(carousel, 0);
}

function minusItem(carousel) {
    let item = currentItem(carousel);

    carousel.querySelectorAll(".item")[item].previousElementSibling != null ?
        showItems(carousel, item - 1) :
        showItems(carousel, carousel.querySelectorAll(".item").length - 1);
}

function currentItem(carousel) {
    return [...carousel.querySelectorAll(".item")].findIndex(
        (item) => item.style.display == "flex"
    );
}

function showItems(carousel, item) {
    if (carousel.querySelectorAll(".item")[currentItem(carousel)] != undefined)
        carousel.querySelectorAll(".item")[currentItem(carousel)].style.display =
        "none";
    carousel.querySelectorAll(".item")[item].style.display = "flex";

    if (carousel.querySelector(".dot.active") != null)
        carousel.querySelector(".dot.active").classList.remove("active");
    carousel.querySelectorAll(".dot")[item].classList.add("active");
}