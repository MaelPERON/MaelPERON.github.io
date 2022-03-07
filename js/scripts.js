function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
}

document.querySelector("#nav-button").addEventListener("click", e => {
    toggleNavbar(e.target);
    e.preventDefault();
})

function toggleNavbar(button) {
    button.classList.toggle("active")
    navbar = document.querySelector("nav.navbar")
    bars = document.querySelector("#nav-button svg.fa-bars")
    times = document.querySelector("#nav-button svg.fa-times")
    if (button.classList.contains("active")) {
        navbar.style.display = "block"
        bars.style.display = "none"
        times.style.display = "block"
    } else {
        navbar.style.display = "none"
        bars.style.display = "block"
        times.style.display = "none"
    }

}

function imageExist(src) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img.height != 0)
        img.onerror = reject
        img.src = src
    })
}

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

function extensionArray(n, format = "jpg") { return [...Array(n).keys()].map(i => `${i+1}.${format}`) }