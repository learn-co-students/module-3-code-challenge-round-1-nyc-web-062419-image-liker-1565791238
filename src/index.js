
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  //// invocation 
  fetchImage()

  let imageId = "https://randopic.herokuapp.com/images/3193"

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


//// GET fetch the image - pass to the renderImage function
  function fetchImage(){
    return fetch('https://randopic.herokuapp.com/images/3193')
    .then(response => response.json())
    .then(function(image){
      renderImage(image)
  })
  }


  
/// this accepts the image from the fetch, it then inserts the HTML with the fetched attributes
//// i did not get the comments rendering...
  function renderImage(image){
    let imageCard = document.querySelector("#image_card")
    imageCard.insertAdjacentHTML("beforeend",
    `
    <img src="${image.url}" id="image" data-id="${image.id}"/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
    <span id="likes">${image.like_count}</span>
    </span>
    <button class="likeBtn" id="like_button">Like</button>
    <form id="comment_form">
    <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
    <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
    <li>${image.comments.content}</li> 
    </ul>
    `)
  }



/////// put an event listener on to the image card, identify if the like button is pressed by targeting the class name
// of the like button, which i've assigned to "likeBtn"
/// target the like count with likeCounter, increment the innertext by one when the like button is pressed
//// send a PATCH reques with the likeCounter's inner text
/// optimistic rendering
  let imageCard = document.querySelector("#image_card")
  imageCard.addEventListener("click", function(e){
    if (e.target.className === "likeBtn"){
      let likeCounter = document.getElementById("likes")
      likeCounter.innerText++
    
      fetch('https://randopic.herokuapp.com/images/3193', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
          },
        body: JSON.stringify({
          id:3193, 
          like_count: parseInt(likeCounter.innerText)
        })
        .then(response => response.json())
    })
  }
})

///////////put an event listener on the submit button, prevent the default action of it so the page does not refresh
/////query select the input box, we are going to have to pass the value of that into the comment section as well as POST
// it with a fetch

///this again would be an optimistic rendering, inserting the comment on to the page then sending the POST fetch
imageCard.addEventListener("submit", function(e){
  e.preventDefault()
  
    let commentInput = document.querySelector("#comment_input")
    let commentSection = document.getElementById("comments")
    commentSection.insertAdjacentHTML("beforeend",
    `
    <li>${commentInput.value}</li> 
    `)
  

    fetch('https://randopic.herokuapp.com/comments', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
          },
        body: JSON.stringify({
        id: 3193,
        comment: commentInput.value
        })
        .then(response => response.json())
    })
  })
  
  








})
