document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3190 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCardElement = document.querySelector("#image_card")
  const nameElement = document.querySelector("#name")
  const likesElement = document.querySelector("#likes")
 
  
  getImage()

  
  function getImage(){
    fetch(imageURL)
    .then(response => response.json())
    .then(image => renderImage(image))
  }
  
  function renderImage(image){
    
    imageCardElement.innerHTML=`
      <img src="${image.url}" id="image" data-id="${image.id}">
      <h4 id="name">${image.name}</h4>
      <span>Likes:
        <span id="likes">${image.like_count}</span>
      </span>
      <button id="like_button">Like</button>
      <form id="comment_form">
        <input id="comment_input" type="text" name="comment" placeholder="Add Comment">
        <input type="submit" value="Submit">
      </form>
      <ul id="comments">
            <!-- <li> $ -->
      </ul>
    </div>`


    image.comments.forEach(comment => {
      const commentsElement = document.querySelector("#comments")
      commentsElement.innerHTML += `<li>${comment.content}</li> `
      console.log(comment.content)
      document.querySelector("#like_button").addEventListener('click', e => likeComment(image))})

function likeComment(image){
  debugger
  console.log('image')
    fetch(imageURL),{
      method: 'PATCH',
      headers:{ "Content-Type": "application/json",
      "Accept": "application/json" },
      body: {
        "like_count": `${image.like_count.value}`
}}
      .then(response => response.json())
      .then(response => console.log(response))
    }
  }

  
  

})

  
