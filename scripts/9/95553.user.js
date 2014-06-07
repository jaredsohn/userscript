// ==UserScript==
// @name          ReadPrint Whole Chapters
// @namespace     https://sites.google.com/site/yaadtek/
// @version       2.1
// @description   Shows the whole chapter on one page on ReadPrint.com.
//                Remembers user's reading mode preference for subqequent chapters
//                Enable closing reading mode functionality
// @author        Dannie F (http://userscripts.org/users/dannief)
// @license       GNU GENERAL PUBLIC LICENSE
// @match         http://www.readprint.com/chapter-*/*
// @include       http://www.readprint.com/chapter-*/*
// ==/UserScript==

//options: func, shouldExecute, shouldWaitForJQuery, shouldLoadJQuery, jQueryWaitCallBackFuncName
function loadFunction(options) {  
  function loadScript(func, exec){
    var script = document.createElement("script");
    script.textContent = exec ? "(" + func.toString() + ")();" : func.toString();
    document.body.appendChild(script); 
  }
  
  if(options.shouldLoadJQuery){
    var jqScript = document.createElement("script");
    jqScript.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js");
    jqScript.addEventListener("load", function() {
      loadScript(options.func, true);
    }, false);
    document.body.appendChild(jqScript);
  }
  else if(options.shouldWaitForJQuery){
    var waitForJquery = 
      "function waitForJquery(){ if(!$) window.setTimeout(waitForJquery, 100); else " + options.jQueryWaitCallBackFuncName + "(); }";    
    loadScript(options.func, false);
    loadScript(waitForJquery, true);
  }
  else{
    loadScript(options.func, options.shouldExecute);
  }
}

function main() {

// -------------------- Init Variables ------------------------
  // Read mode variables
  var readingModeCookie = "readingMode";
  var readingModeLink = $("a.launch_reading_mode.c-normal");
  var readingModeClickHandler = readingModeLink.data('events').click[0].handler;

  // Current page and the number of pages to load
  var divPagination = $("div.book_pagination");
  var pgs = divPagination.html();
  var pgsRE = new RegExp(/Page (\d+) of (\d+)/i);
  var pgsReMathes = pgsRE.exec(pgs);
  var currentPg = pgsReMathes[1];
  var numPgs = pgsReMathes[2];
  
  // title header
  var title = $("h1.main_title");
  
  // The selector of the chapter context div
  var contentSelector = "div#book_content > div:has(div.ad_chapter_floated)"; //"div#book_content > div:nth-child(5)"

  // array to hold texts of chapters
  chapterPagesArray = [];
// -------------------- Init Variables --------------------------
  
  function setCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
  } 

  function getCookie(name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0;i < ca.length;i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
  }

  function deleteCookie(name) {
      setCookie(name,"",-1);
  }
  
  // click handler for launch reading mode link
  var onLaunchReadingMode = function () {
    setCookie(readingModeCookie, "1");    
    readingModeLink.html("Close Reading Mode")
      .unbind("click", readingModeClickHandler)
      .unbind("click", onLaunchReadingMode)
      .bind("click", onHideReadingMode);
  }

  // click handler for close reading mode link
  var onHideReadingMode = function () {
    deleteCookie(readingModeCookie);

    $('.hide_rm').show();
    $('body').css('background', '');
    $('#content').addClass('content_shadow');
    $('#right_column').css('width', '720px');
      
    readingModeLink.html("Launch Reading Mode")
      .unbind("click", onHideReadingMode)
      .bind("click", readingModeClickHandler)
      .bind("click", onLaunchReadingMode);
  }

  // Get all pages of the chapter except the current one
  function GetChapters() {
    var re = new RegExp(/(http:\/\/www\.readprint\.com\/chapter\-\d+\/[\w\-]+)\/?.*/ig);
    var url = re.exec(location.href)[1];
    // Create a temporary div to hold the chapter
    var divChPg = $("<div/>").attr("id", "temp_chapter_page");
    for (var pageNum = 1; pageNum <= numPgs; pageNum++) {
      if (pageNum == currentPg) continue;

      // creates a callback function to add the page to a specific array index
      var callback = (function (pgIndex) {
        return function () {
          chapterPagesArray[pgIndex] = $(divChPg.children()[0]).html();
        }
      })(pageNum - 1);

      // Get the page content and load into the div
      var chUrl = url + "/" + pageNum + " " + contentSelector;
      divChPg.load(chUrl, callback);
    }
  }
     
  function allPagesLoaded(){
    if(chapterPagesArray.length < numPgs - 1){          
      return false;
    }
    for(var i = 0; i < numPgs; i++){   
      if((i + 1) == currentPg) continue;
      if(chapterPagesArray[i] === undefined){
        return false;
      }          
    }  
    return true;
  } 
  
  function loadContent(){    
    if(!allPagesLoaded()){
       setTimeout(loadContent, 100);
       return;
    }
     
    var preContent = "";
    var postContent = ""
    var divContent = $(contentSelector);
    for(var i = 0; i < numPgs; i++){
      if((i + 1) < currentPg){
        preContent += chapterPagesArray[i];
      }
      else if((i + 1) > currentPg){
        postContent += chapterPagesArray[i];
      }        
    } 
    divContent.html(preContent + divContent.html() + postContent);
  }

  function SetChapterNavigationLinks() {
    // Get the table of contents URL
    var tocUrl = $("div.side_back_to_author a")[1].href + "/contents";

    // Create a temporary div to hold the TOC
    var divToc = $("<div id='temp_toc'></div>");

    // Get first and last chapter links from contents page
    divToc.load(tocUrl + " ul.chapters_list li a", function () {
      // Get the last chapter URL
      var numLinks = divToc.children().length;
      var firstChildUrl = divToc.children()[0].href;
      var lastChUrl = divToc.children()[numLinks - 1].href;

      // Extract the last chapter number from the URL
      var pattern = /http:\/\/www\.readprint\.com\/chapter\-(\d+)\/(.*)/ig
      var regexp = new RegExp(pattern);
      var lastChapter = parseInt(regexp.exec(lastChUrl)[1]);

      // Extract the first chapter number from the URL
      regexp = new RegExp(pattern);
      var firstChapter = parseInt(regexp.exec(firstChildUrl)[1]);

      // Extract the current chapter number from the URL
      regexp = new RegExp(pattern);
      var matches = regexp.exec(location.href);

      // Calculate the next and previous chapter numbers    
      var currChapter = parseInt(matches[1]);
      var nextChapter = currChapter + 1;
      var prevChapter = currChapter - 1;

      // If the next chapter number does not exceed the last chapter number
      // Create a "Next Chapter" link
      if (nextChapter <= lastChapter) {
        var nextChUrl = "http://www.readprint.com/chapter-" + nextChapter + "/" + matches[2];
        $("div.chapter_navigat.chapter_navigat_next.f-r a").attr("href", nextChUrl).html("Next Chapter");
      }

      // If the previous chapter number is not less than first chapter number
      // Create a "Previous Chapter" link
      if (prevChapter >= firstChapter) {
        var prevChUrl = "http://www.readprint.com/chapter-" + prevChapter + "/" + matches[2];
        $("div.chapter_navigat.f-l.chapter_navigat_prev a").attr("href", prevChUrl).html("Previous Chapter");
      }

      // Hide the "Next Chapter" link if the current chapter is the last
      if (currChapter == lastChapter) {
        $("div.chapter_navigat.chapter_navigat_next.f-r").hide();
      }
    });
  }

  // Run the script
  function Run() {
    // turn on reading mode by default if the cookie is set
    var isReadingModeEnabled = getCookie(readingModeCookie) != null;
    if (isReadingModeEnabled) {
      readingModeLink.click();
      onLaunchReadingMode();
    }
    else {
      readingModeLink.bind("click", onLaunchReadingMode);
    }

    // Hide the pagination
    divPagination.hide();

    // Change the title to display the chapter number only (without page number)
    title.html(title.html().replace(/(Chapter \d+)( \- Page \d+)?/i, "$1"));

    // Get all pages of the chapter except the current one
    GetChapters();
    // load all pages of the chapter if they have all been retrieved
    loadContent();

    SetChapterNavigationLinks();
  }

  // Run the script
  Run();

}

// Execute the main function
loadFunction({func: main, shouldWaitForJQuery: true, jQueryWaitCallBackFuncName: "main"});
