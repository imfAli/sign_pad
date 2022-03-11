const canvas = document.querySelector('canvas')
const form = document.querySelector('.signature-pad-form')
const clearButton = document.querySelector('.clear-button')
const ctx = canvas.getContext('2d')
let writingMode = false;

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const imgURL = canvas.toDataURL();
    const image = document.createElement('img')
    image.src = imgURL
    image.height = canvas.height
    image.width = canvas.width
    image.style.display = 'block'
    form.appendChild(image)
    clearPad();
})

const clearPad = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height)
}

clearButton.addEventListener('click', (e) => {
    e.preventDefault()
    clearPad()
})

const getTargetPosition = (e) => {
    positionX = event.clientX - event.target.getBoundingClientRect().x 
    positionY = event.clientY - event.target.getBoundingClientRect().y 

    return [positionX,positionY]
}

const handlePointerMove = (e) => {
    if(!writingMode) return 

    const [positionX,positionY] = getTargetPosition(e)
    ctx.lineTo(positionX,positionY)
    ctx.stroke()
}

const handlePointerUp = () => {
    writingMode = false
}

const handlePointerDown = (e) => {
    writingMode = true
    ctx.beginPath()

    const [positionX,positionY] = getTargetPosition(e)
    ctx.moveTo(positionX,positionY)
}

ctx.lineWidth = 3;
ctx.lineJoin = ctx.lineCap ='round';

canvas.addEventListener('pointerdown',handlePointerDown, {passive: true})
canvas.addEventListener('pointerup',handlePointerUp, {passive: true})
canvas.addEventListener('pointermove',handlePointerMove, {passive: true})