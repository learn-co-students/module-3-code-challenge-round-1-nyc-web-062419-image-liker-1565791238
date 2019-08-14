document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta")
  let imageId = 3191 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  makeLikeListener(imageId)
  makeNewCommentListener(imageId)

  fetchImage(imageURL)
})

// Function to initially fetch the image object
function fetchImage(imageURL) {
  fetch(imageURL)
    .then(resp => resp.json())
    .then(function(json) {
      renderImageInfo(json)
    })
}

// Function to increment likes in the database
function postLike(imageId) {
  fetch("https://randopic.herokuapp.com/likes", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
}

// Function to make a POST request to make a new comment in the database
function postComment(form, imageId) {
  fetch("https://randopic.herokuapp.com/comments", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: imageId,
      content: form.comment.value
    })
  })
    .then(resp => resp.json())
    .then(function(comment) {
      const commentsList = document.querySelector("#comments")
      const newestComment =
        commentsList.children[commentsList.children.length - 1]
      newestComment.dataset.id = comment.id
    })
}

// Function to make the listener for like button
function makeLikeListener(imageId) {
  const likeButton = document.querySelector("#like_button")
  likeButton.dataset.imageId = imageId
  likeButton.addEventListener("click", function(e) {
    clickedLike(likeButton.dataset.imageId)
  })
}

// Make the submit listener to make a new comment
function makeNewCommentListener(imageId) {
  const form = document.querySelector("#comment_form")
  form.addEventListener("submit", function(e) {
    e.preventDefault()
    addComment(e.target.comment.value)
    postComment(e.target, imageId)
    e.target.reset()
  })
}

// Function to put the info from initial response to the screen
function renderImageInfo(image) {
  const imageUrl = document.querySelector("#image")
  const imageName = document.querySelector("#name")
  const imageLikes = document.querySelector("#likes")
  imageUrl.src = image.url
  imageName.innerText = image.name
  imageLikes.innerText = image.like_count
  image.comments.forEach(comment => {
    addComment(comment.content, comment.id)
  })
}

// Function to increase like count on the screen
function clickedLike(imageId) {
  const likesSpan = document.querySelector("#likes")
  let likes = parseInt(likesSpan.innerText)
  likes++
  likesSpan.innerText = likes
  postLike(imageId)
}

// Function to add a coment to the screen
function addComment(comment, cId) {
  const commentsList = document.querySelector("#comments")
  // prettier-ignore
  commentsList.insertAdjacentHTML("beforeend", `<li data-id='${cId}'>${comment}<button onclick="deleteComment(this)"> Delete</button></li>`)
}

// Function to delete comment from database
function deleteComment(button) {
  const commentId = button.parentElement.dataset.id
  fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(removeCommentFromScreen(commentId))
}

// Function to remove comment from screen
function removeCommentFromScreen(commentId) {
  document.querySelector(`li[data-id='${commentId}']`).remove()
}
