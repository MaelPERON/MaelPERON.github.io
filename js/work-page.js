function toggleMore(button,cards){
    button.classList.toggle("active")
    cards.forEach(card => card.style.display = button.classList.contains("active") ? "none" : "")
    button.innerHTML = button.classList.contains("active") ? `Afficher Plus (${cards.length})` : "Afficher Moins"
}

document.querySelectorAll("a.more").forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        target = e.target.getAttribute("data-target")
        toggleMore(button, Array.from(button.parentElement.querySelectorAll(target ? target : ".grid > .card")).filter((card,i) => i+1 > (button.getAttribute("data-min") ? parseInt(button.getAttribute("data-min")) : 3)))
    })
    button.click()
})

document.querySelectorAll(".section-anchor").forEach(anchor => {
    id = anchor.closest('section').getAttribute("id")
    anchor.setAttribute("data-anchor", id)
    if(id != null) anchor.addEventListener('click', (e) => {
        navigator.clipboard.writeText(location.href = location.href.match(/(^[^#]*)/)[0] + '#' + e.target.getAttribute("data-anchor")).then(function() {
            console.log(location.href)
        }, function() {alert("failed")});
    })
})