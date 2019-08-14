document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");

  getImage();
  likeButtonListener();
  commentFormListen();
});

///api calls

let imageId = 3192; //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

const getImage = () =>
  fetch(imageURL)
    .then(resp => resp.json())
    .then(json => renderImage(json));

const renderImage = image => {
  const pageImage = document.getElementById("image");
  const nameTitle = document.getElementById("name");
  const likes = document.getElementById("likes");
  const comments = document.getElementById("comments");
  pageImage.src = image.url;
  nameTitle.innerText = image.name;
  likes.innerText = image.like_count;
  comments.innerHTML += printComments(image.comments);
};

const postLike = config => {
  fetch(likeURL, config);
};
const postComment = config => {
  fetch(commentsURL, config)
    .then(resp => resp.json())
    .then(json => renderComment(json));
};
const renderComment = comment => {
  const comments = document.getElementById("comments");
  comments.innerHTML += printComment(comment);
};

//const renderImage

///configs

const postConfig = obj => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(obj)
});
//event listeners

const likeButtonListener = () => {
  const likeButton = document.getElementById("like_button");
  const likes = document.getElementById("likes");
  likeButton.addEventListener("click", e => {
    const like_count = parseInt(likes.innerText) + 1;
    likes.innerText = like_count;
    const obj = { image_id: 3192 };
    const config = postConfig(obj);
    postLike(config);
  });
};

const commentFormListen = () => {
  const commentForm = document.getElementById("comment_form");

  commentForm.addEventListener("submit", e => {
    e.preventDefault();
    const content = e.target.children[0].value;
    const obj = { content, image_id: imageId };
    const config = postConfig(obj);
    postComment(config);
    commentForm.reset();
  });
};

//templates
const printComment = comment => `<li>${comment.content}</li>`;
const printComments = comments => {
  let str = ``;
  comments.forEach(comment => {
    str += printComment(comment);
  });
  return str;
};
