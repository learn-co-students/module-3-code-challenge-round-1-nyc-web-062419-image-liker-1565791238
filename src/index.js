document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  const imageId = 3201 //Enter the id from the fetched image here
  const imgBox = document.getElementById('image')
  const likeSpan = document.getElementById('likes')
  const commentList = document.getElementById('comments')
  const likeButton = document.querySelector("#like_button")
  const commentForm = document.querySelector("#comment_form")
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage()

  function fetchImage(){
    fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(resp => resp.json())
    // .then(data => console.log(data))
    .then(data => renderImage(data))
  }

  function renderImage(imageData){
    imgBox.src = imageData.url
    likeSpan.innerHTML = imageData.like_count
    imageData.comments.forEach( (comment) => {
      commentList.insertAdjacentHTML("afterbegin", `<li>${comment.content}</li>`)
    })
  }

  function updateLikes(likes){
    fetch(`https://randopic.herokuapp.com/likes`, {
      method: "POST",
      headers: { "content-type": "application/json",
               "accept": "application/json"
                },
      body: JSON.stringify({image_id: imageId, likes_count: likes}),
      })
      .then(resp => console.log(resp))
  }

  function updateComments(comment){
    fetch('https://randopic.herokuapp.com/comments', {
      method: "POST",
      headers: { "content-type": "application/json",
                "accept": "application/json"
                },
      body: JSON.stringify({image_id: imageId, content: comment}),
      })
      .then(resp => console.log(resp))
  }
  

  likeButton.addEventListener("click", e=> {
    likeSpan.innerHTML++
    updateLikes(likeSpan.innerHTML)
  })

  commentForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log('submit firing')
    let commentInput = commentForm.comment.value 
    console.log(commentInput)
    commentList.insertAdjacentHTML('afterbegin', `<li>${commentInput}</li>`)
    updateComments(commentInput)
    commentInput = ''
  })


})
