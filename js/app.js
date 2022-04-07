document.addEventListener("DOMContentLoaded", () => {
    lazyLoading();
})

document.querySelectorAll(".newtab").forEach(element => {
    element.setAttribute("target", "_blank")
    element.setAttribute("ref", "noopener noreferrer")
    element.classList.remove("newtab")
})