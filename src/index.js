let imageId = 3194 //Enter the id from the fetched image here

const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

const likeURL = `https://randopic.herokuapp.com/likes/`

const commentsURL = `https://randopic.herokuapp.com/comments/`

const imageDisplay = document.getElementById('image')

const nameDisplay = document.getElementById('name')

const likesDisplay = document.getElementById('likes')

const commentsDisplay = document.getElementById('comments')

const likeButton = document.getElementById('like_button')

const commentForm = document.getElementById('comment_form')

const commentInput = document.getElementById('comment_input')


function renderImage(image) {
  imageDisplay.src = image.url
  nameDisplay.innerText = image.name
  likesDisplay.innerText = image.like_count
  image.comments.forEach(commentObject => displayComment(commentObject.content))
}

function displayComment(comment) {
  commentsDisplay.insertAdjacentHTML("beforeend", `
    <li>${comment}</li>
  `)
}

function fetchImage() {
  fetch(imageURL)
  .then(res => res.json())
  .then(renderImage)
}

function submit_like (){
  likesDisplay.innerText++

  config = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'image_id': imageId})
  }
  fetch(likeURL, config)
}

function submitComment(comment) {
  displayComment(comment)
  config = {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  }
  fetch(commentsURL, config)


  commentForm.reset()
}


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  

  fetchImage()

  likeButton.addEventListener('click', event => submit_like())

  commentForm.addEventListener('submit', event => {
    event.preventDefault()
    const value = commentInput.value
    submitComment(value)
  })

  










})

