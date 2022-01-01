root = document.querySelector("#particles")

class Hexagon {
    constructor() {
        this.hexagonImg = undefined;
        this.life = parseInt(randomNumber(3, 6)) * 1000
        this.width = parseInt(randomNumber(2, 6))
        this.handleHexagon();
    }

    handleHexagon() {
        this.hexagonImg = document.createElement("img")
        this.hexagonImg.setAttribute("src", "./assets/svg/hexagon.svg")
        this.hexagonImg.classList.add("hexagon");
        this.hexagonImg.style.width = `${this.width}%`
        this.hexagonImg.style.animation = `${this.life/1000}s ease-out infinite rotation`
        root.append(this.hexagonImg)
        this.handlePosition()

        this.hexagonEnd.call(this.hexagonImg, this.life)
    }

    handlePosition() {
        this.posX = parseInt(randomNumber(0, 100));
        this.posY = parseInt(randomNumber(0, 100));

        this.hexagonImg.style.top = `${this.posX}%`
        this.hexagonImg.style.left = `${this.posY}%`
    }

    hexagonEnd(t) {
        if (t > 200) setTimeout(() => {
            this.style.opacity = 1;
        }, 1)
        setTimeout(() => {
            this.style.opacity = 0;
        }, t === 0 ? t : t - 200)

        setTimeout(() => {
            this.remove()
            new Hexagon()
        }, t)
    }

}

window.onload = () => {

    [...Array(10).keys()].forEach(x => {
        setTimeout(() => {
            new Hexagon()
        }, parseInt(randomNumber(0, 10) * 100))
    })

}