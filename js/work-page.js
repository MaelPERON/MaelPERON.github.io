function toggleMore(button,cards){
    button.classList.toggle("active")
    cards.forEach(card => card.style.display = button.classList.contains("active") ? "none" : "")
    button.innerHTML = button.classList.contains("active") ? `Afficher Plus (${cards.length})` : "Afficher Moins"
}

document.querySelectorAll("a.more").forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMore(button, Array.from(button.parentElement.querySelectorAll(".grid > .card")).filter((card,i) => i+1 > (button.getAttribute("data-min") ? parseInt(button.getAttribute("data-min")) : 3)))
    })
    button.click()
})