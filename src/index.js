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

function fetchImage(imageURL) {
  fetch(imageURL)
    .then(resp => resp.json())
    .then(function(json) {
      renderImageInfo(json)
    })
}

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

function makeLikeListener(imageId) {
  const likeButton = document.querySelector("#like_button")
  likeButton.dataset.imageId = imageId
  likeButton.addEventListener("click", function(e) {
    clickedLike(likeButton.dataset.imageId)
  })
}

function makeNewCommentListener(imageId) {
  const form = document.querySelector("#comment_form")
  form.addEventListener("submit", function(e) {
    e.preventDefault()
    addComment(e.target.comment.value)
    postComment(e.target, imageId)
    e.target.reset()
  })
}

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

function clickedLike(imageId) {
  const likesSpan = document.querySelector("#likes")
  let likes = parseInt(likesSpan.innerText)
  likes++
  likesSpan.innerText = likes
  postLike(imageId)
}

function addComment(comment, cId) {
  const commentsList = document.querySelector("#comments")
  // prettier-ignore
  commentsList.insertAdjacentHTML("beforeend", `<li data-id='${cId}'>${comment}<button onclick="deleteComment(this)"> Delete</button></li>`)
}

function deleteComment(button) {
  const commentId = button.parentElement.dataset.id
  fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
    method: "DELETE"
  })
    .then(resp => resp.json())
    .then(function(json) {
      removeCommentFromScreen(commentId)
    })
}

function removeCommentFromScreen(commentId) {
  document.querySelector(`li[data-id='${commentId}']`).remove()
}
