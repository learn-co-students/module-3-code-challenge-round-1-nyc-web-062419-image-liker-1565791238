// make the only one post function

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  // API Variables:
  let imageId = 3189
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // Display Variables
  const headerSpot = document.getElementById("name")
  const imageCard = document.getElementById("image_card")
  const imageSpot = imageCard.querySelector("img")
  const likes = document.getElementById("likes")
  const commentList = document.getElementById("comments")

  // Fetch for all Data
  fetch(imageURL)
  .then(resp => resp.json())
  .then(resp => {headerSpot.innerText = resp.name, imageSpot.setAttribute("src", resp.url), likes.innerText = resp.like_count, resp.comments.forEach(displayComments)})
  
  // LIKE SECTION
  const likeButton = document.getElementById("like_button")
  likeButton.addEventListener("click", function(e){
    likes.innerText++
    addLikeToTheDB()
  })
  function addLikeToTheDB(){
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify({image_id: imageId})
    })
  }

  
  
  //  COMMENT SECTION

  // Show each comment on page
  function displayComments(comment){
    commentList.insertAdjacentHTML("beforeend", `<li id="${comment.id}">${comment.content}<button class="delete-button">Delete</li>`)
  }

  // Pull a new comment from the comment form
  const commentForm = document.getElementById("comment_form")
  commentForm.addEventListener("submit", function(e){
    e.preventDefault()
    addCommntToTheDB(e.target)
  })

  // Add each comment to the DB
  function addCommntToTheDB(comment){
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify({image_id: imageId, content: comment.comment.value})
    })
    .then(resp => resp.json())
    // Send the response comment to be shown on the page
    .then(resp => displayComments(resp))
    .then(comment.reset())
  }

  // DELETE A COMMENT SECTION
  // Listen for click on "Delete button"
  commentList.addEventListener("click", function(e){
    if (e.target.className === "delete-button"){
      deleteAComment(e.target.parentNode)
    }
  })
  // Remove it from the DB
  function deleteAComment(targetComment){
    fetch(`${commentsURL}/${targetComment.id}`, {method: 'DELETE'})
    // Remove it from the page
    .then(function() {targetComment.remove()})
  }
})
