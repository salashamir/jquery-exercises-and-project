const movieList = $("#movie-list");

// form event listener
$("#movie-form").on("submit", (e) => {
  e.preventDefault();

  // get input values from form
  const movieObj = getInputValues();
  // data validation
  if (!(checkTitleChars(movieObj) && checkRating(movieObj))) {
    alertMessage(
      "Title must be 2 chars or longer. Rating must be between 0 and 10."
    );
    return;
  }
  // construct html template
  const movieHtml = createMovieHtml(movieObj);
  // create dom element from template
  const listItem = $(movieHtml);
  // append to dom
  movieList.append(listItem);
});

// unordered list event listener
movieList.on("click", "i", (event) => {
  $(event.currentTarget).parent().remove();
});

const getInputValues = () => {
  return {
    title: $("#movie-title").val(),
    rating: $("#movie-rating").val(),
    id: generateID(),
  };
};

// function takes in object holding input values
const createMovieHtml = ({ title, rating, id }) => {
  // html template
  const movieHtml = `<li class="movie-item" data-uid="${id}">
  <span class="title">${title}</span>
  <span class="rating">${rating}</span>
  <i class="fa-solid fa-trash-can delete-btn"></i>
</li>`;

  return movieHtml;
};

// generate a unique ID
const generateID = () => {
  return (performance.now().toString(36) + Math.random().toString(36)).replace(
    /\./g,
    ""
  );
};

// data validation functions
const checkTitleChars = ({ title }) => {
  return title.length >= 2;
};

const checkRating = ({ rating }) => {
  return rating >= 0 && rating <= 10;
};

// message alert
const alertMessage = (message) => {
  alert(message);
};
