document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3200 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.querySelector("#image_card")
  const commentList = imageCard.querySelector("#comments")
  const commentForm = document.querySelector("#comment_form")

  fetch (imageURL)
  .then(response => response.json())
  .then(json => drawImageCard(json))
  
  imageCard.addEventListener("click", function(e){
    if (e.target.id === "like_button") {
      imageCard.querySelector("#likes").innerHTML ++
      fetch (likeURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({image_id: imageId})
      })
    }
  })

  commentForm.addEventListener("submit", function(e){
    e.preventDefault()
    const comment = commentForm.comment.value
    commentList.insertAdjacentHTML("beforeend", `<li>${comment}<button id="delete_button">Delete</button></li>`)
    commentForm.reset()
    fetch (commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId, content: `${comment}`})
    })
  })

  commentList.addEventListener("click", function(e){
    if (e.target.id === "delete_button"){
      const commentId = e.target.parentElement.dataset.commentId
      fetch (`https://randopic.herokuapp.com/comments/${commentId}`, {
        method: "DELETE"
      })
      .then (e.target.parentElement.remove())
      
    }
    
  })

  function drawImageCard (json) {
    imageCard.querySelector("img").src = json.url
    imageCard.querySelector("#name").innerText = json.name
    imageCard.querySelector("#likes").innerHTML = json.like_count
    json.comments.forEach(comment => {
      commentList.insertAdjacentHTML("beforeend", `<li data-comment-id=${comment.id}>${comment.content}<button id="delete_button">Delete</button></li>`)
    });
  }

})
