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