document.addEventListener("DOMContentLoaded", () => {
  console.log("%c DOM Content Loaded and Parsed!", "color: magenta");
  getImage();
  likeButtonListener();
  commentFormListen();
});

///Global Selectors

const nameTitle = document.getElementById("name");
const pageImage = document.getElementById("image");
const likes = document.getElementById("likes");
const likeButton = document.getElementById("like_button");
const commentForm = document.getElementById("comment_form");
const comments = document.getElementById("comments");

///Api URLs

let image_id = 3192;
const imageURL = `https://randopic.herokuapp.com/images/${image_id}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

//Api calls and renders

const getImage = () =>
  fetch(imageURL)
    .then(resp => resp.json())
    .then(json => renderImage(json));

const renderImage = image => {
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
  comments.innerHTML += printComment(comment);
};

///Configs

const postConfig = obj => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(obj)
});

//Event Listeners

const likeButtonListener = () => {
  likeButton.addEventListener("click", e => {
    const like_count = parseInt(likes.innerText) + 1;
    likes.innerText = like_count;
    const obj = { image_id };
    const config = postConfig(obj);
    postLike(config);
  });
};

const commentFormListen = () => {
  commentForm.addEventListener("submit", e => {
    e.preventDefault();
    const content = e.target.children[0].value;
    const obj = { content, image_id };
    const config = postConfig(obj);
    postComment(config);
    commentForm.reset();
  });
};

//Templates

const printComment = comment => `<li>${comment.content}</li>`;

const printComments = comments => {
  let str = ``;
  comments.forEach(comment => {
    str += printComment(comment);
  });
  return str;
};
