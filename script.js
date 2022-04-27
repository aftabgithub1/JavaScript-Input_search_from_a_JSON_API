"use strict"
const api = 'https://raw.githubusercontent.com/aftabgithub1/json-api/main/myNiblings.json'
const allPosts = document.getElementById('all-posts')
const search = document.getElementById('search')
const templateX = document.getElementById('post-template').content
let myNiblings = []

const displayList = async () => {
    const response = await fetch(api)
    const data = await response.json()
    
    myNiblings = data.myNiblings.map(({name, desp, photo}) => {
        const card = document.importNode(templateX, true).children[0]
        photo != null ?
            card.querySelector('.profile-pic').src = photo :
            card.querySelector('.profile-pic').src

        card.querySelector('.name').textContent = name
        card.querySelector('.desp').textContent = desp
        allPosts.append(card)
        return {name, desp, element: card}
    })
}
setTimeout(displayList, 0)

search.addEventListener('input', e => {
    const value = e.target.value.toLowerCase()
    console.log(value);
    myNiblings.filter(({name, desp, element}) => {
        const isVisible = 
            name.toLowerCase().includes(value) || 
            desp.toLowerCase().includes(value)
        element.classList.toggle('hide', !isVisible)
    })
})


const copyApi = document.querySelector('.copy-api-input');
const tooltip = document.querySelector('.tooltip');


copyApi.addEventListener('click', () => {
    copyApi.select();
    copyApi.setSelectionRange(0, 99999); /* For mobile devices */
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyApi.value);
  
    tooltip.style.visibility = "visible"
    tooltip.style.opacity = "1"
})

copyApi.addEventListener('mouseleave', () => {
    setTimeout(() => {
        tooltip.style.visibility = "hidden"
        tooltip.style.opacity = "0"
        tooltip.style.transition = "opacity 400ms ease"
        document.getSelection().removeAllRanges()
    }, 2000)
})