`use strict`;
//state variable
let Apiquotes;

//selecting elements
const quoteAuthor = document.getElementById("author");
const tweetBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const containerEl = document.querySelector(".container");
const quoteText = document.getElementById("text");
const loader = document.getElementById("loader");
const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");

//functions
function showloading() {
  loader.hidden = false;
  containerEl.hidden = true;
}
function removeLoading() {
  loader.hidden = true;
  containerEl.hidden = false;
}
//showing random quotes
const showQuotes = function () {
  showloading();
  getDate();
  getTime();
  let quotes = Apiquotes[Math.floor(Math.random() * Apiquotes.length)];

  if (!quotes.author) {
    quoteAuthor.textContent = "unknown";
  } else {
    quoteAuthor.textContent = quotes.author;
  }
  //check length
  if (quotes.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  setTimeout(removeLoading, 1000);
  quoteText.textContent = quotes.text;
};
//get data
function getDate() {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  console.log(date, month, year);
  dateEl.textContent = ` ${date}/${month}/${year}`;
}
//getting Time
function getTime() {
  setInterval(() => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const sec = new Date().getSeconds();
    timeEl.textContent = `${hours}h:${minutes}:${sec}`;
  }, 1000);
}

//twitter upload
const tweetUpload = function () {
  const getWebIntentUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(getWebIntentUrl, "_blank");
};

//fetch Data
const getQuotes = async function () {
  showloading();
  const getURL = `https://jacintodesign.github.io/quotes-api/data/quotes.json`;

  try {
    const response = await fetch(getURL);

    Apiquotes = await response.json();

    console.log(Apiquotes);
    showQuotes();
    tweetBtn.addEventListener("click", tweetUpload);
    newQuoteBtn.addEventListener("click", showQuotes);
  } catch (err) {
    throw new Error(`Something went wrong ${err.message}`);
  }
};

getQuotes();
