// ==UserScript==
// @name           rlslog.net - neverending page
// @namespace      idontneedadomainname.com
// @description    When scrolling to or past the end of the page, automatically load the next page and show it.
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include        http://www.rlslog.net/*
// ==/UserScript==


/* urls the script should be able to work on are
- BASE_URL
- BASE_URL/page/##/
- BASE_URL/category/xxxx
- BASE_URL/category/xxxx/page/##/
- BASE_URL/category/xxxx/yyyy
- BASE_URL/category/xxxx/yyyy/page/##/
*/


/* -------------------------------------------------------- Global variables */


var loadingNextPage = false;
var lastLoadSuccesful = true;
var currentPageNumber = 1;
var baseurl = "";


/* -------------------------------------------------------- Functions */


var loadNextPage = function()
{
  if(lastLoadSuccesful && !loadingNextPage) {
    loadingNextPage = true;
    
    //alert("loadNextPage: making ajax request");
    $.ajax(getNextPageUrl())
      .done( function(data) {  receivedPageData(data); } )
      .fail( function() { failedToReceivePageData(); } );
    $("#scrollDetector")[0].innerHTML = "Loading next page...";
  }
};


var getNextPageUrl = function()
{
  var u = baseurl + "page/" + (currentPageNumber+1) + "/";
  //alert("next url: " + u);
  return u;
};


var receivedPageData = function(pageContent)
{
  //alert("receivedPageData: start");
  $("#ifr")[0].innerHTML = pageContent;
  $("#ifr div.entry").insertAfter("html body #wrap #content .entry:last");
  
  $("#scrollDetector")[0].innerHTML = "Scroll to load next page";
  currentPageNumber = currentPageNumber + 1;
  loadingNextPage = false;
};


var failedToReceivePageData = function()
{
  //alert("failedToReceivePageData: start");
  $("#scrollDetector")[0].innerHTML = "Failed to load next page<br/>" +
    "<a href='" + getNextPageUrl() + "'>Click here to try and load the page normally</a>";
  loadingNextPage = false;
  lastLoadSuccesful = false;
};


var initializePageNumber = function()
{
  // Look at the URL for a "/page/xx" match. If it's not there then we're on the very first page and the page-url is our baseurl
  var matchResults = document.URL.match(/(.*)\/page\/([\d]+)/);
  if(!matchResults)
    baseurl = document.URL;
  else {
    baseurl = matchResults[1] + "/";
    currentPageNumber = parseInt(matchResults[2]);
  }
};


var addHTML = function()
{
  $("#content p:last")[0].innerHTML = scrollDetectorHTML;
  
  var ifrElem = document.createElement("iframe");
  ifrElem.id = "ifr";
  $(ifrElem).css("display", "none");
  document.body.appendChild(ifrElem);
};


var addCSS = function()
{
  var styleElem = document.createElement("style");
  styleElem.innerHTML = neverEndingRLS_css;
  document.head.appendChild(styleElem);
};


var setupScrollHandler = function()
{ 
  $(document).scroll( function() {
    if(!loadingNextPage && isScrolledIntoView("#scrollDetector"))
      loadNextPage();
  });
};


// copied from stackoverflow: http://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling
var isScrolledIntoView = function(elem)
{
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();

  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();

  return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)
    && (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
};


/* -------------------------------------------------------- HTML and CSS */

var scrollDetectorHTML = "<div id='scrollDetector'>Scroll to load next page</div>";

var neverEndingRLS_css =
"#scrollDetector {\n" +
  "width: 80%; margin-left: auto; margin-right: auto; background-color: #BFD9FF;\n" +
  "padding: 0.7em 0em 0.7em 0em; text-align: center;\n" +
"};";


/* -------------------------------------------------------- Initial setup function */

$(document).ready(function() {
  initializePageNumber();
  addCSS();
  addHTML();
  setupScrollHandler();
});



/*-----------
 
var xhrResult = "";

$.ajax("http://www.rlslog.net/category/movies/page/2/").done( function(d) { xhrResult = d; }).always( function() { alert('done'); } );

var ifr = document.createElement("iframe");
ifr.innerHTML = xhrResult;

$(ifr).css("display", "none");
document.body.appendChild(ifr);
ifr.id = "ifr";

$("#ifr div.entry").insertAfter("html body #wrap #content .entry:last");

------------- */

