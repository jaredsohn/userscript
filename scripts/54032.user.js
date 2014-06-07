// Updates
// 07/29/09 fixed list not randomizing every day
//          fixed number of shows to exclude archived shows link
//          re-added jquery for future use
// 07/28/09 excluded contact page from script
//          removed jquery, it was not needed
//          changed namespace
// 07/22/09 list no longer contains items with 0 unseen episodes
//

// ==UserScript==
// @name           MyTVShows.org Playlister
// @namespace      http://mytvshows.org/
// @copyright      2009+ lildog.
// @version        0.3
// @description    Generates a new random playlist from your MyTVShows.org TV shows daily
// @include        http://www.mytvshows.org/*
// @exclude        http://www.mytvshows.org/contacts/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

/* require        http://jquery.com/src/jquery-latest.js */
//GM_addStyle(".rs { right: -25px; position: absolute; z-index: 200; link-decoration: none; }");


// check that we have everything we need
if(!(GM_setValue && GM_getValue && GM_registerMenuCommand && GM_openInTab)){
  alert("Please update your Greasemonkey to the latest version before using this script.");
  return;
}


OPTION_PLAYLIST_LENGTH_DEFAULT='5';
OPTION_DATE='lastDateVisited';
OPTION_LAST_VISIT_DEFAULT='7/10/2009';
OPTION_SHOW_NAMES ='show_names';
OPTION_SHOW_NAMES_DEFAULT ='There is no playlist.';
OPTION_SHOW_HREFS ='hrefs';
OPTION_SHOW_UNSEEN ='unseen';

// get the current date - ex.7/16/2009
var todayDate= getthedate();

//get last date visited, if set if not get default value
lastVisit = GM_getValue(OPTION_DATE, OPTION_LAST_VISIT_DEFAULT);
//var lastVisit = OPTION_LAST_VISIT_DEFAULT;

//tDates="Today:"+ todayDate+" Last Visit:"+ lastVisit;

//set the last visited date to today
GM_setValue(OPTION_DATE, todayDate);

if(lastVisit != todayDate){
  //make a new list
  //alert("Going to Make new list");
  makeList();
  //alert("Done Making new list");
}

//get list
showNames=GM_getValue(OPTION_SHOW_NAMES, "ERROR GETTING Shownames");
showHrefs=GM_getValue(OPTION_SHOW_HREFS, "ERROR GETTING hrefs");
showUnseens=GM_getValue(OPTION_SHOW_UNSEEN, "ERROR GETTING unseen");

var showNames = showNames.split("^");
var showHrefs = showHrefs.split("^");
var showUnseens = showUnseens.split("^");




//make a title line
var newTitle = document.createElement("p");
newTitle.className = "archived";
var newTxt = document.createTextNode("Today's Playlist");
newTitle.appendChild(newTxt);
document.getElementById("shows").appendChild(newTitle);

//put in dates line
/*
var newDate = document.createElement("p");
newDate.className = "";
var newTxt = document.createTextNode(tDates);
newDate.appendChild(newTxt);
document.getElementById("shows").appendChild(newDate);
*/


var newUL = document.createElement("ul");
//add the links to the new ul
for(i = 0; i < showNames.length; i++){
  var newLi = document.createElement("li");
  var newA = document.createElement("a");
  newA.href = "http://www.mytvshows.org/show/"+showHrefs[i];
  var newTxt = document.createTextNode(showNames[i]+" ");
  newA.appendChild(newTxt);
  //start add the show unseen count
  var newSp=document.createElement("span");
  newSp.className = "unseeneps";
  var newTxt = document.createTextNode(showUnseens[i]);
  newSp.appendChild(newTxt);
  newA.appendChild(newSp);
  //end add the show unseen count
  newLi.appendChild(newA);
  newUL.appendChild(newLi);
}
document.getElementById("shows").appendChild(newUL);


function makeList(){
  //alert("In makeList function");
  // <a href="/show/apparitions/">Apparitions <span class="unseeneps">4</span></a>
  var allshows = document.getElementById('shows');
  var somePs = allshows.getElementsByTagName('a');
  //get # of shows -1 to account for 0(first element of array), and -1 to account for archive link
  var numofshows=somePs.length-2;
  //alert("Num of Shows:"+numofshows+"   Last Show:"+ somePs[numofshows]);

  var showNames ='';
  var showHrefs ='';
  var showUnseen ='';

  for (i=0; i< OPTION_PLAYLIST_LENGTH_DEFAULT; i++){
    var tCount=0;
    while(tCount==undefined || tCount==0 || tCount==''){ //get a show with a unseen count greater than 0
      //get a random number from ? to # of shows
      var randomnumber=Math.floor(Math.random()* numofshows);
      var showInfo=somePs[randomnumber].innerHTML.replace(/[ ]?<\/?[^>]+>/g,'^');
      var SplitInfo = showInfo.split("^");
      var tName=SplitInfo[0];   
      var tCount= SplitInfo[1];
    }


   // is this the 1st show added or not, put the caret(split character) in the correct place.
   // greasemonkey cannot store an array in a file, so caret is used to split later
   if(i>0){
      showNames = showNames +"^"+tName;
      showHrefs = showHrefs + "^"+somePs[randomnumber].href.replace("http://www.mytvshows.org/show/",'');
      showUnseen= showUnseen+"^"+tCount;
    }else{
      //showNames = showNames +somePs[randomnumber].innerHTML.replace(/<span\b[^>]*>(.*?)<\/span>/,'');
      var showNames = tName;
      var showUnseen= tCount;
      var showHrefs = showHrefs +somePs[randomnumber].href.replace("http://www.mytvshows.org/show/",'');
    }
  }
  GM_setValue(OPTION_SHOW_NAMES, showNames);
  GM_setValue(OPTION_SHOW_HREFS, showHrefs);
  GM_setValue(OPTION_SHOW_UNSEEN, showUnseen);
 // alert("exiting makelist Function");
}

function getthedate(){
  var currentTime = new Date();
  var month = currentTime.getMonth() + 1;
  var day = currentTime.getDate();
  var year = currentTime.getFullYear();
  var todayDate = month + "/" + day + "/" + year;
  //alert("Today:"+ todayDate);
  return todayDate;
}