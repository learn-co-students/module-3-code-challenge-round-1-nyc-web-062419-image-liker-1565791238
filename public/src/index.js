document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3195 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


//-------get---------
  function getImage(){
    fetch(imageURL)
    .then(response => response.json())
    .then( data => showImage(data))
  }

//---------post likes---------
function patchLikes(id,likes){
fetch(`https://randopic.herokuapp.com/likes`,{
method: 'POST',
 headers: {
"Content-Type": "application/json",
Accept: "application/json"
},
body: JSON.stringify({
image_id: id
})
})
.then(response => response.json())
.then(data => console.log(data))
}


//-------post comment-------
function postComment(id, content){
fetch(`https://randopic.herokuapp.com/comments`,{
method: 'POST',
 headers: {
"Content-Type": "application/json",
Accept: "application/json"
},
body: JSON.stringify({
image_id: id,
content: content,
})
})
.then(response => response.json())
.then(data => console.log(data))
}





//---------code-------

//-----
  let commentsArray = []
  let likeButton = document.getElementById("like_button")
  let likeCount = document.querySelector("span#likes")
  let commentForm = document.getElementById("comment_form")
  let comments = document.getElementById("comments")

//----- putting comments into an array early because i will need to grab them later to push new comments into
  function showImage(data){
  commentsArray = data.comments

  //---- setting the name
  let name = document.getElementById("name")
  name.innerText = data.name

//---- setting the like count 
  let likes = document.getElementById("likes")
  likes.innerText = data.like_count

//---- setting the img src 
  let imgSrc = document.getElementById("image")
  imgSrc.src = data.url

//----- Looping through all the comments. For each comment, I am creating a new <li> and appending it to the comments parent
let comments = document.getElementById("comments")
commentsArray.forEach(function(comment){
  newCommentLi = document.createElement("li")
  newCommentLi.innerText = comment.content
  comments.appendChild(newCommentLi)
})

//----Added event listen to the like button. Button id is set to the image id 
//---- image/button id and new like count sent to patch request
likeButton.id = data.id
likeButton.addEventListener("click",function(e){
  let likeInt = parseInt(likeCount.innerText)
  likeInt++
  likeCount.innerText = likeInt
  likeButtonId = likeButton.id 
  patchLikes(likeButtonId, likeInt )
})

//---- added event listener to form
//--- once submitted, first optimistically rendering comments
//--- after, image Id and comment contents are sent to the post comment function
commentForm.addEventListener("submit",function(e){
  e.preventDefault()
  let newComment = e.target.comment.value 
  comments.insertAdjacentHTML("beforeend",`<li> ${e.target.comment.value} </li>`)
  postComment(imageId, newComment)
})

 }

  getImage()
})


//----Everything works and im scared to try deleting in case it breaks everything.