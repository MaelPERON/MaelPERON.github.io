navbar = document.querySelector("nav")
ul = createElementFromHTML(`<ul class="nav-list"></ul>`)
pages = [
    ['./index.html','accueil'],
    ['./works.html','mes travaux']
].forEach(page => {
    li = createElementFromHTML(`<li class="nav-item"><a class="nav-link" href="${page[0]}">${page[1]}</a></li>`)
    ul.append(li)
})
navbar.append(ul)

document.addEventListener("DOMContentLoaded", () => {
    lazyLoading();
})

document.querySelectorAll(".newtab").forEach(element => {
    element.setAttribute("target", "_blank")
    element.setAttribute("ref", "noopener noreferrer")
    element.classList.remove("newtab")
})