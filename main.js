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
    var some = document.createElement("span");
    some.textContent = element.language;
    newTemplateElement.querySelector(".language").appendChild(some)

    newTemplateElement.querySelector(".info").dataset.imdbid = element.imdbId;
    newTemplateElement.querySelector(".block").dataset.id = index + 1;
    element.categories.forEach(item => {
      var some =  document.createElement("span");
      some.textContent = item;
      some.style.margin = "0px 5px"
     var summ =   newTemplateElement.querySelector(".categories");
     summ.appendChild(some)

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



var pageCount = document.querySelector(".page-count");
var summ;

function executing(id) {
  var array = normalizedMovies.slice(((id - 1) * pageSize), pageSize * id);

  return array
}

var ulElement = document.querySelector("#list");

function countingPage(evt) {


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
    moreBtn.addEventListener("click", function () {
      if (searchResult.length > 12) {
        blok.innerHTML = "";
        cloningTemplateContent(searchResult);
      }
      var exitbtn = document.createElement("button");
      exitbtn.classList.add("knopka", "btn");
      exitbtn.textContent = "Exit";
      blok.appendChild(exitbtn)
      exitbtn.addEventListener("click", function () {

        window.location.href = "./main.html"
      })
    })

    if (pageCount.textContent == 314) {
      evt.target.disabled = true
    } else if (!pageCount.textContent == 314) {
      evt.target.disabled = false;
      pageCount.textContent = Number(pageCount.textContent) + 1
      evt.target.previousElementSibling.previousElementSibling.disabled = false
    } else {
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
    moreBtn.addEventListener("click", function () {
      if (searchResult.length > 12) {
        blok.innerHTML = "";
        cloningTemplateContent(searchResult);
      }
      var exitbtn = document.createElement("button");
      exitbtn.classList.add("knopka", "btn");
      exitbtn.textContent = "Exit";
      blok.appendChild(exitbtn)
      exitbtn.addEventListener("click", function () {

        window.location.href = "./main.html"
      })
    })
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


}


ulElement.addEventListener("click", countingPage)
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
  var movieImdbId = evt.target.dataset.imdbid

  var findedMovie = normalizedMovies.find(movie => {
    return movie.imdbId === movieImdbId
  })
  var template = document.createDocumentFragment();
  var newModalTemplate = templateModal.cloneNode(true);
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


var nextBtn = document.querySelector(".arrow-right");
var prevBtn = document.querySelector(".arrow-left");
var moreBtn = document.querySelector(".more");

searchBtn.addEventListener("click", (evt) => {
  var newArray;
  ulElement.remove();
  removed.classList.remove("removed")
  ulElement.removeEventListener("click", countingPage);

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
  newArray = searchingSlice(Number(pageCount.textContent))
  blok.innerHTML = "";
  var exitbtn = document.createElement("button");
  exitbtn.classList.add("knopka", "btn");
  exitbtn.textContent = "Exit";
  blok.appendChild(exitbtn)
  exitbtn.addEventListener("click", function () {

    window.location.href = "./main.html"
  })
  cloningTemplateContent(newArray);
   if (newArray.length <= 0 ) {
     remove(exitbtn)
     var creteText = document.createElement("p");
     creteText.textContent = "Afsuski hech narsa topilmadi";
     blok.appendChild(creteText)
   }

  nextBtn.addEventListener("click", function () {
    newArray = searchingSlice(Number(pageCount.textContent) + 1)
    blok.innerHTML = "";
    cloningTemplateContent(newArray);
  })

   moreBtn.addEventListener("click", function () {
     if (searchResult.length > 12) {
       blok.innerHTML = "";
       cloningTemplateContent(searchResult);
     }
      var exitbtn = document.createElement("button");
      exitbtn.classList.add("knopka", "btn");
      exitbtn.textContent = "Exit";
      blok.appendChild(exitbtn)
      exitbtn.addEventListener("click", function () {

        window.location.href = "./main.html"
      })
   })



})
var bodyElement = document.querySelector("#body")
var time = 1;

let clearIntervalId;
var bgImgchanged = function (vaqt) {
  clearIntervalId = setInterval(() => {
    bodyElement.style.backgroundImage = `url(./img/hero${time}.jpg)`
    time++;
    if (time === 6) {
      time = 1;
    }
  }, vaqt);
}
bgImgchanged(4000)
var first = 1;
var second = 12;
var last = 5;
var headerColorChange = setInterval(() => {
  first = first + 5;
  second = second + 11;
  last = last + 80;
  if (200 <= first) {
    first = 0;
    second = 3;
    last = 5;
  }

  header.style.backgroundColor = `rgb(${first},${second},${last})`
}, 2000);

watchBtn.addEventListener("click", (evt) => {
  var exitbtn = document.createElement("button");
  exitbtn.classList.add("knopka", "btn");
   exitbtn.textContent = "Exit";
  blok.appendChild(exitbtn)
  bodyElement.style.backgroundImage = "url(none)"
  clearInterval(clearIntervalId)
  moviesWrapper.classList.remove("hidden");
  main.classList.add("closed");
  header.classList.add("bgcolor");
  header.style.marginBottom = "0px";
  header.style.marginTop = "-30px";
  header.style.backgroundColor = "#000";
  footer.style.backgroundColor = "#000";
  document.querySelector("body").classList.add("changed");

  exitbtn.addEventListener("click", function () {

    window.location.href = "./main.html"
  })

})


var selectMovies = document.querySelector("#select-movies");
selectMovies.addEventListener("change",function () {
 var newArray = normalizedMovies.filter(item => {
   return item.categories.includes(this.value)
 })
 blok.innerHTML = "";
 newArray = newArray.slice(0,12)
 cloningTemplateContent(newArray)
})
