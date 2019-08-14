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

const commentIdRecord = []

let newCommentNumber = 0


function renderImage(image) {
  imageDisplay.src = image.url
  nameDisplay.innerText = image.name
  likesDisplay.innerText = image.like_count
  image.comments.forEach(displayOldComment)
}

function displayOldComment(comment) {
  commentsDisplay.insertAdjacentHTML("beforeend", `
    <li>${comment.content}</li>
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

function displayNewComment(comment) {
  commentsDisplay.insertAdjacentHTML("beforeend", `
  <li data-new-comment-id=${newCommentNumber}>${comment}<button class="delete">Delete</button></li>
`)
}

function submitComment(comment) {
  displayNewComment(comment)
  newCommentNumber++ 
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
  .then(res => res.json())
  .then(data => {
    commentIdRecord.push(data.id)
  })
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

  commentsDisplay.addEventListener('click', event => {
    if (event.target.className === "delete") {

      config = {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }

      fetch(`https://randopic.herokuapp.com/comments/${commentIdRecord[event.target.parentNode.dataset.newCommentId]}`, config)
      .then(res => res.json())
      .then(data=>{
        if (data.message === 'Comment Successfully Destroyed') {
          event.target.parentNode.remove()
        }
      })
    }
  })

  










})

