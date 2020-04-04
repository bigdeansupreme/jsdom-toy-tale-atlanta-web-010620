let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  fetchToys();
  addNewToy()
  
  
  // const addBtn = document.querySelector("#new-toy-btn");
  // const toyForm = document.querySelector(".container");
  
})

const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector('#toy-collection');
const addToyBtn = document.getElementById('new-toy-btn')

const fetchToys = () => {
  const toysUrl = `http://localhost:3000/toys`
  fetch(toysUrl)
  .then(res => res.json())
  .then(data => {
    data.forEach(toy => renderToys(toy))
  })
}

const renderToys = (toy) => {
  const toyDiv = document.createElement('div')
  toyDiv.className = 'card'
  
  const toyName = document.createElement('h2')
  toyName.innerHTML = toy.name
  
  const toyImage = document.createElement('img')
  toyImage.src = toy.image
  toyImage.className = 'toy-avatar'
  
  const currentLikes = document.createElement('p')
  currentLikes.innerHTML = `${toy.likes} 💚`
  
  const likeBtn = document.createElement('button')
  likeBtn.className = 'like-btn'
  likeBtn.innerHTML = 'like'
  likeBtn.id = toy.id
  likeBtn.addEventListener('click', e => {
    increaseLikes(e)
  })

  
toyDiv.appendChild(toyName)
toyDiv.appendChild(toyImage)
toyDiv.appendChild(currentLikes)
toyDiv.appendChild(likeBtn)

toyCollection.appendChild(toyDiv)

}

const postToy = toy => {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(toy => renderToys(toy))
}



const addNewToy = () => {
  addToyBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', e => {
        e.preventDefault()
        postToy(e.target)
        e.target.reset()
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

}

const increaseLikes = e => {
  e.preventDefault()
  // debugger
  let increasedLikes = parseInt(e.target.previousElementSibling.innerHTML) + 1
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "likes": increasedLikes
    })
  })
  .then(res => res.json())
  .then(updatedLike => {
    e.target.previousElementSibling.innerHTML = `${increasedLikes} 💚`
  })
}