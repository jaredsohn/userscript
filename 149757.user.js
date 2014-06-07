// ==UserScript==
// @name IMDb to CMA Link Creator
// @namespace http://userscripts.org
// @description Adds a link on IMDb.com by the celebrity's name to the search results for them on CelebrityMovieArchive.com.
// @include *.imdb.com/*
// @version 1.0d
// @author Lassik
// ==/UserScript==

// Set some script variables for Greasemonkey.
var script = {
    url: "http://userscripts.org/scripts/source/149757.user.js",
    version: "1.0d",
    homePage: "http://userscripts.org"
};

/****************************************************************
 *                       !!!!WARNING!!!!                        *
 * Watch out for people claiming on userscripts.org to have     *
 * created a newer version of this script. Look at the source   *
 * first. The fake current version is actually a script that    *
 * performs multiple functions on Facebook to make you          * 
 * subscribe to other sites. This is one of the reasons I       *
 * document my code so heavily. So that you know what's         *
 * actually taking place.                                       *
 ****************************************************************/ 

/****************************************************************
 * This script is very simple and is only really a few actual   *
 * lines of code. I heavily commented this script so that it    *
 * would be easy to understand for anyone wanting to adjust it  *
 * to fit their needs or just to know what is being done.       *
 ****************************************************************/ 

/****************************************************************
 * Change the variable below if you'd like to use a different   *
 * site other than Celebrity Movie Archive                      *
 ****************************************************************/ 
var searchURL = "http://www.celebritymoviearchive.com/tour/search.php?searchstring=";
  
/****************************************************************
 * Change the variable below if you'd like the text for the     *
 * created link to say something else. You can also comment it  *
 * out and uncomment the line below it if you'd like the        *
 * Celebrity Movie Archive fav icon image to show instead of    *
 * text.                                                        *
 ****************************************************************/
var linkText = "CMA";
//var linkText = "<img src='http://www.google.com/s2/favicons?domain=celebritymoviearchive.com' />";

/****************************************************************
 * The following if statement is just used to verify that       *
 * you're on the actual celebrity's page vs the page of a movie *
 * they were in.                                                *
 ****************************************************************/ 
if(window.location.href.indexOf('name') != -1) {

  /****************************************************************
   * Grabbing the existing links on the page.                     *
   ****************************************************************/ 
  var pageLinks = document.getElementsByClassName("infobar")[0].innerHTML;
  
  /****************************************************************
   * Grabbing the celebrity's name.                               *
   ****************************************************************/ 
  var celebName = document.getElementsByClassName("header")[0].innerHTML;
  
  /****************************************************************
   * Replacing the spaces with + signs for a proper URL format.   *
   ****************************************************************/ 
  celebName = celebName.replace(/\s/g, "+");
  
  /****************************************************************
   * There's an extra space at the end of the name that ends up   *
   * being an additional + sign. The following line just knocks   *
   * it off.                                                      *
   ****************************************************************/   
  celebName = celebName.slice(0, -1);
  
  /****************************************************************
   * Building the link from all the collected data.               *
   ****************************************************************/ 
  var cmaLink = "&nbsp;<span>|</span> " + "<a href='" + searchURL + 
                 celebName + "' target='cma'>" + linkText + "</a>";
 
  /****************************************************************
   * Inserting the link in to the page.                           *
   ****************************************************************/ 
  document.getElementsByClassName("infobar")[0].innerHTML = pageLinks + cmaLink;
}

/****************************************************************
 * The following if statement is just used to verify that       *
 * you're on the page of a movie vs the actual page for the     *
 * celebrity themselves.                                        *
 ****************************************************************/ 
if(window.location.href.indexOf('title') != -1) {

  /****************************************************************
   * There are 2 different styles of pages depending on if you're *
   * looking at the full cast of a movie or just the original     *
   * overview page that only shows a few main cast members. The   *
   * following if statement is used to verify which page you're   *
   * looking at.                                                  *
   ****************************************************************/ 
  if((window.location.href.indexOf('fullcredits') != -1) ||
     (window.location.href.indexOf('combined') != -1)) {

    /****************************************************************
     * Createing an array of all the links containing the           *
     * celebrity's names. (full cast page)                         *
     ****************************************************************/ 
    var celebArray = document.getElementsByClassName("nm");

    /****************************************************************
     * The following loop just cycles through the array that was    *
     * created earlier, inserting the new links.                    *
     ****************************************************************/ 
    for (i=0; i<celebArray.length; i++) {
  
      /****************************************************************
       * Grabbing the celebrity's name from the link within the array *
       * that was created above.                                      *
       ****************************************************************/   
      var celebName = celebArray[i].getElementsByTagName("a")[0].innerHTML;
    
      /****************************************************************
       * Replacing the spaces with + signs for a proper URL format.   *
       ****************************************************************/ 
      celebName = celebName.replace(/\s/g, "+");
    
      /****************************************************************
       * Building the link and inserting it in to the page.           *
       ****************************************************************/ 
      celebArray[i].innerHTML = celebArray[i].innerHTML + 
                                "&nbsp;<span>|</span> " + "<a href='" + 
                                searchURL + celebName + "' target='cma'>" + 
                                linkText + "</a>";
    }
  }else {
    /****************************************************************
     * Createing an array of all the links containing the           *
     * celebrity's names. (brief cast page)                         *
     ****************************************************************/ 
    var celebArray = document.getElementsByClassName("cast_list")[0].
                              getElementsByClassName("itemprop");

    /****************************************************************
     * The following loop just cycles through the array that was    *
     * created earlier, inserting the new links.                    *
     ****************************************************************/ 
    for (i=0; i<celebArray.length; i++) {

      /****************************************************************
       * Grabbing the celebrity's name from the link within the array *
       * that was created above.                                      *
       ****************************************************************/   
      if(celebArray[i].innerHTML.indexOf('span') != -1) { 
        var celebName = celebArray[i].getElementsByTagName("a")[0].
                                      getElementsByTagName("span")[0].innerHTML;
    
        /****************************************************************
         * Replacing the spaces with + signs for a proper URL format.   *
         ****************************************************************/ 
        celebName = celebName.replace(/\s/g, "+");
    
        /****************************************************************
         * Building the link and inserting it in to the page.           *
         ****************************************************************/ 
        celebArray[i].innerHTML = celebArray[i].innerHTML + 
                                  "&nbsp;<span>|</span> " + "<a href='" + 
                                  searchURL + celebName + "' target='cma'>" + 
                                  linkText + "</a>";
      }
    }
  }
}

/****************************************************************
 * The following if statement is just used to verify that       *
 * you're on a list page.                                       *
 ****************************************************************/ 
if(window.location.href.indexOf('list') != -1) {

  /****************************************************************
   * Createing an array of all the links containing the           *
   * celebrity's names.                                           *
   ****************************************************************/ 
  var celebArray = document.getElementsByClassName("info");

  /****************************************************************
   * The following loop just cycles through the array that was    *
   * created earlier, inserting the new links.                    *
   ****************************************************************/ 
  for (i=0; i<celebArray.length; i++) {
  
    /****************************************************************
     * Grabbing the celebrity's name from the link within the array *
     * that was created above.                                      *
     ****************************************************************/   
    var celebName = celebArray[i].getElementsByTagName("a")[0].innerHTML;
    
    /****************************************************************
     * Replacing the spaces with + signs for a proper URL format.   *
     ****************************************************************/ 
    celebName = celebName.replace(/\s/g, "+");
    
    /****************************************************************
     * Building the link and inserting it in to the page as long as *
     * the list item on the page is a celebrity's name. The if      *
     * statement is used to verify that.                            *
     ****************************************************************/
    if (celebArray[i].getElementsByTagName("a")[0].href.indexOf('name') != -1) {
      celebArray[i].innerHTML = celebArray[i].innerHTML + "<a href='" + 
                                searchURL + celebName + "' target='cma'>" + 
                                linkText + "</a>";
    }
  }
}