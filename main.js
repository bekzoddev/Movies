var templateElement = document.querySelector(".template").content;
var newArray = normalizedMovies.slice(0, 12)
var id = 1;
var modalBlok = document.querySelector(".modal-blok")


function cloningTemplateContent(array) {
  var elNewFragmentElement = document.createDocumentFragment();
  array.forEach((element, index) => {
    id++
    var newTemplateElement = templateElement.cloneNode(true);
    newTemplateElement.querySelector(".movie__title").textContent = element.title;
    newTemplateElement.querySelector(".movie__year").textContent = element.year;
    newTemplateElement.querySelector(".movie__rating").textContent = element.imdbRating;
    newTemplateElement.querySelector(".text").textContent = element.summary;
    newTemplateElement.querySelector(".youtube_link").href = element.trailer;
    newTemplateElement.querySelector(".movie__poster").src = element.smallPoster;
    newTemplateElement.querySelector(".language").textContent = element.language;

    newTemplateElement.querySelector(".info").dataset.imdbid = element.imdbId;
    newTemplateElement.querySelector(".block").dataset.id = index + 1;
    element.categories.forEach(item => {
      newTemplateElement.querySelector(".categories").textContent = item

    })
    elNewFragmentElement.appendChild(newTemplateElement)

  });

  blok.appendChild(elNewFragmentElement);

}

var moviesBlock = document.querySelectorAll(".block")
var templateModal = document.querySelector(".template-modal").content;

cloningTemplateContent(newArray)

var page = 1;
var pageSize = 12;
var pageCounter = Math.ceil(normalizedMovies.length / pageSize);
// console.log(pageCounter);
var paginationArray = [];

// function paginating(number) {
//   for (page; page <= number; page++) {
//     var createLi = document.createElement("li");
//     createLi.textContent = page;
//     createLi.dataset.id = page
//     paginationArray.push(createLi)
//     list.appendChild(createLi)

//   }
// }
// paginating((Math.ceil(normalizedMovies.length / 12)))
// paginating(9)

var pageCount = document.querySelector(".page-count");
var summ;

function executing(id) {
  var array = normalizedMovies.slice(((id - 1) * pageSize), pageSize * id);
  // console.log(array);
  // console.log(id);
  return array
}

var ulElement = document.querySelector("#list");


ulElement.addEventListener("click", (evt) => {

  ulElement.querySelectorAll("li").forEach(item => {
    item.classList.remove("active");

  })

  var newArray;
  if (evt.target.matches("li")) {
    newArray = executing(Number(evt.target.textContent));
    blok.innerHTML = "";
    evt.target.classList.add("active")
    cloningTemplateContent(newArray);
  }
  if (evt.target.matches(".arrow-right")) {
    newArray = executing(Number(evt.target.textContent));

    if (pageCount.textContent == 314) {
      evt.target.disabled = true
    }
    else if (!pageCount.textContent == 314) {
      evt.target.disabled = false;
      pageCount.textContent = Number(pageCount.textContent) + 1
      evt.target.previousElementSibling.previousElementSibling.disabled = false
    }
     else {
       evt.target.disabled = false;
       pageCount.textContent = Number(pageCount.textContent) + 1
       evt.target.previousElementSibling.previousElementSibling.disabled = false
    }
    blok.innerHTML = "";
    newArray = executing(Number(pageCount.textContent));
    cloningTemplateContent(newArray);
  }
  if (evt.target.matches(".arrow-left")) {
    newArray = executing(Number(evt.target.textContent));
    console.log(pageCount.textContent);
    if (pageCount.textContent <= 1) {
      evt.target.disabled = true;

    } else {
      pageCount.textContent = Number(pageCount.textContent) - 1
      evt.target.disabled = false;
     evt.target.nextElementSibling.nextElementSibling.disabled = false
    }

    blok.innerHTML = "";
    newArray = executing(Number(pageCount.textContent));
    cloningTemplateContent(newArray);
  }
})
var closeBtn = document.querySelector(".tugma");
var infoBtn = document.querySelectorAll(".info");

var movieTitle = document.querySelectorAll(".movie__title")
var modalBody = document.querySelector(".modal-section")

moviesBlock.forEach((item, index) => {
  item.addEventListener("click", function (evt) {
    if (evt.target.matches(".info")) {
      modalBlok.classList.add("open");
      modalBody.forEach(item => {
        item.classList.remove("visible")
      })
      modalBody[index].classList.add("visible")
    }
  })
})



modalBlok.addEventListener("click", function (evt) {

  if (evt.target.matches(".exit-btn") || evt.target.matches(".span")) {
    evt.target.parentNode.classList.remove("visible");
    modalBlok.classList.remove("open")
    document.querySelector("body").classList.remove("bg")
  }
  if (evt.target.matches(".modal-blok")) {
    modalBlok.classList.remove("open");
    document.querySelector("body").classList.remove("bg")
    evt.target.closest(".modaldiv").classList.remove("visible");
  }
})

blok.addEventListener('click', (evt) => {
  const movieImdbId = evt.target.dataset.imdbid

  const findedMovie = normalizedMovies.find(movie => {
    return movie.imdbId === movieImdbId
  })
  const template = document.createDocumentFragment();
  const newModalTemplate = templateModal.cloneNode(true);
  newModalTemplate.querySelector('.modal-img').src = findedMovie.smallPoster;
  newModalTemplate.querySelector('.modal-title').textContent = findedMovie.title;
  newModalTemplate.querySelector('.modal-info').textContent = findedMovie.summary;
  newModalTemplate.querySelector('.modal-trailer').href = findedMovie.trailer;
  newModalTemplate.querySelector('.modal-year').textContent = findedMovie.year;
  newModalTemplate.querySelector('.modal-language').textContent = findedMovie.language;
  findedMovie.categories.forEach(item => {
    newModalTemplate.querySelector('.modal-categories').textContent = item
  });
  template.appendChild(newModalTemplate);
  modalBody.innerHTML = ""
  modalBody.appendChild(template)

  if (evt.target.matches(".info")) {
    modalBlok.classList.add("open");
    modalBody.classList.add("visible");
    document.querySelector("body").classList.add("bg")
  }
})
var searchInput = document.querySelector(".search-input");
var searchBtn = document.querySelector(".search-btn");
var searchedWord = searchInput.nodeValue;
var searchedRegex = new RegExp(searchedWord, "gi");
searchBtn.addEventListener("click", (evt) => {

})
var moviesWrapper = document.querySelector(".movies-body")
var watchBtn = document.querySelector(".watch");
watchBtn.addEventListener("click", (evt) => {
  moviesWrapper.classList.remove("hidden");
  main.classList.add("closed");
  header.classList.add("bgcolor");
  header.style.marginBottom = "0px";
  header.style.marginTop = "-30px";
  header.style.backgroundColor = "#000";
  footer.style.backgroundColor = "#000";
  document.querySelector("body").classList.add("changed");

})
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 30) {
    header.classList.add("onlycolor");

  }
  if (window.pageYOffset < 30) {
    header.classList.remove("onlycolor");
    var some = setInterval(() => {

    }, 1000);
  }
})

var moviesCategories = [];
normalizedMovies.forEach(element => {
  element.categories.forEach(item => {
    moviesCategories.push(item)
  })

});



searchBtn.addEventListener("click",(evt)=> {
  var newArray;
 var searchedMovie = searchInput.value.trim();
 var newRegexp = new RegExp(searchedMovie, "gi");
 var searchResult = normalizedMovies.filter(movie => {
   return movie.title.match(newRegexp)
 })
  function searchingSlice(number) {
  var array;
  array = searchResult.slice(Number(number) - 1, 12 * Number(number));
  return array
  }
 blok.innerHTML = "";
 newArray = searchingSlice(Number(pageCount.textContent))
 cloningTemplateContent(newArray)

})