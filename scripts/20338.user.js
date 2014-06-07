// ==UserScript==
// @name           hdbHideBlacklistedTopics
// @description    hides blacklisted Topics or Forum Categories from the viewunread page
// @include        https://hdbits.org/forums.php?action=viewunread*
// @include        http://hdbits.org/forums.php?action=viewunread*
// ==/UserScript==


// global vars in use
  var blAlienTopics = null;
  var blFilter = null;
  var blTopic = null;
  var blForum = null;
  var iconMatches = 0;
  var topicMatches = 0;
  var forumMatches = 0;
 
  var firstRun = true;
 
  documentStyle = document.styleSheets[0];
  documentStyle.insertRule('.blSpan:hover {color:maroon}',documentStyle.cssRules.length);
 
  main();
 


function main(){    // ********** main start **********
 
blTopic = getCookie('blTopic');
if (blTopic!=null && blTopic!=""){
  blTopic = blTopic.replace(/, /g,",");
  blTopic = blTopic.split(",");
} else {
  blTopic = new Array();
}

blForum = getCookie('blForum');
if (blForum!=null && blForum!=""){
  blForum = blForum.replace(/, /g,",");
  blForum = blForum.split(",");
} else {
  blForum = new Array();
}

blFilter = getCookie('blFilter');
if (blFilter != null && blFilter != ""){
  if(blFilter == 1){
      blFilter = true;
  }else{
      blFilter = false;
  }  
} else {
  blFilter = false;
}

blAlienTopics = getCookie('blAlienTopics');
if (blAlienTopics != null && blAlienTopics != ""){
  if(blAlienTopics == 1){
      blAlienTopics = true;
  }else{
      blAlienTopics = false;
  }  
} else {
  blAlienTopics = false;
}


iconMatches = 0;
topicMatches = 0;
forumMatches = 0;

h1 = document.getElementsByTagName('h1');

resultTable = null;

for (var j = 0; j < h1.length; j++){
  if(h1[j].innerHTML == "Topics with unread posts"){
     
      elem = h1[j];
      bug = 0;
      while(elem.tagName != 'TABLE' && bug < 10){ // tagName -> UPPERCASE
          elem = elem.nextSibling;
         
          bug++;  // break if not found within 10 first <h1>-elems
      }      
      resultTable = elem;    
      break;
  }
}

if(resultTable == null){ // don't filter if there's no table
  filter = false;
}



tBody = myFirstChild(resultTable);
tr = myNextSibling(tBody.firstChild);   // row (can be null)

limit = 999;    // max number of lines to check

while(tr && limit >= 0){
  tr.style.display = null;    // unset display-style
  nextTr = myNextSibling(tr);
  if(blFilter){
      removeIfBlacklisted(tr);
  }
  tr = nextTr;    
  limit--;

}


resultEmbed = document.createElement('div');
resultEmbed.style.margin = '-5px 0 10px 0';
resultEmbed.style.color = '#444444';

topicOnMouseOver = "";  
forumOnMouseOver = "";

if(blTopic.length == 0){
  topicOnMouseOver = "no blacklisted words set";
} else {
  topicOnMouseOver = "filtering topics with the following content: "
      + blTopic.concat();
}

if(blForum.length == 0){
  forumOnMouseOver = "no blacklisted forum categories set";
} else {
  forumOnMouseOver = "filtering topics from the following categories: "
      + blForum.concat();
}

if(blFilter){
  resultOut = "<strong>" + (iconMatches+topicMatches+forumMatches)
  + " threads filtered</strong> ("
  + "<span id='blFilter' class='blSpan'>disable filter</span>)<br>\n"
  + "<u>filtered</u>: <span title='"+topicOnMouseOver+"' id='blTopic'"
  + "class='blSpan'>by topic (" + topicMatches + ")</span>, \n"
  + "<span title='"+forumOnMouseOver+"' id='blForum' class='blSpan'>by"
  + " forum (" + forumMatches + ")</span>, "
  + "<span id='blAlienTopics' class='blSpan' title='click to toggle'>by"
  + " threads you didn't post in (" + iconMatches + ")</span>";
}else{
  resultOut = "<span id='blFilter' class='blSpan'>enable filter</span>";
}

resultEmbed.innerHTML = resultOut;

if(firstRun){
  resultTable.parentNode.insertBefore(resultEmbed, resultTable);
} else {
  resultTable.parentNode.replaceChild(resultEmbed, resultTable.previousSibling);
}
 
myAddEvents();  

firstRun = false;

}   // ******************** main end ********************

function removeIfBlacklisted(elem){
 
  // global vars in use
  blAlienTopics;
  blTopic;
  blForum;
  iconMatches;
  topicMatches;
  forumMatches;
 
  table = myFirstChild(elem);
  poster = myNextSibling(table);
  forum = myNextSibling(poster);
 
  temp1 = table.firstChild.firstChild.firstChild.firstChild
  iconVal =  temp1.firstChild.className; // either 'unlocked' or 'unlockednew'
  topicVal = temp1.nextSibling.firstChild.firstChild.innerHTML;
  forumVal = forum.firstChild.firstChild.innerHTML;
 
 
  // Icon (for unparticipated topics)
  if(blAlienTopics && iconVal == 'unlockednew'){
      elem.style.display = "none";
      iconMatches++;
      return;
  }

  // Forum Category
  for(j=0; j< blForum.length; j++){
      if(blForum[j] == forumVal){
          elem.style.display = "none";
          forumMatches++;
          return;
      }
  }
 
  // Topic
  for(j=0; j< blTopic.length; j++){
      if(topicVal.toLowerCase().indexOf(blTopic[j]) != -1){   // -1 = not found
          elem.style.display = "none";
          topicMatches++;
          return;
      }
  }  
}


function myAddEvents() {    // add event listeners (onlcick events)
  blFilter;
  if(blFilter){
      var topicEL = document.getElementById("blTopic");
      topicEL.addEventListener("click", changeBlTopic, false);

      var forumEL = document.getElementById("blForum");
      forumEL.addEventListener("click", changeBlForum, false);

      var alienEL = document.getElementById("blAlienTopics");
      alienEL.addEventListener("click", changeBlAlienTopics, false);
  }
 
  var filterEL = document.getElementById("blFilter");
  filterEL.addEventListener("click", changeBlFilter, false);
}


function changeBlTopic(){
  blTopic;
  blTopic = prompt('Enter words to blacklist (use small caps only. separate using commas):',
              blTopic.concat());
  if (blTopic!=null && blTopic!=""){
      blTopic = blTopic.toLowerCase();
      setCookie('blTopic',blTopic,365);
      blTopic = blTopic.replace(/ /g,"");
      blTopic = blTopic.split(",");
  } else {
      blTopic = new Array();
      unsetCookie('blTopic');
  }
    return main();
}

function changeBlForum(){
  blForum;
  blForum = prompt('Enter categories to blacklist (case sensitive. separate using commas):',
              blForum.concat());
  if (blForum!=null && blForum!=""){
      setCookie('blForum',blForum,365);
      blForum = blForum.replace(/, /g,",");
      blForum = blForum.split(",");
  } else {
      blForum = new Array();
      unsetCookie('blForum');
  }
   return main();
}

function changeBlFilter(){
  blFilter;  
  if(blFilter == true){   // toggle
      setCookie('blFilter',0,365);
  }else{
      setCookie('blFilter',1,365);
  }  
  return main();
}  

function changeBlAlienTopics(){
  blAlienTopics;  
  if(blAlienTopics == true){  // toggle
      setCookie('blAlienTopics',0,365);
  }else{
      setCookie('blAlienTopics',1,365);
  }  
  return main();
}

// ease of use functions

function myNextSibling(elem){   // returns next Sibling that is not a whitespace.
                              // null if no next sibling available
  if(elem == null) {
      return null;
  }
 
  tElem = elem.nextSibling;
  while (tElem.tagName == undefined){    
      if((tElem = tElem.nextSibling) == null){
          return null;
      }
  }
  return tElem;
}

function myFirstChild(elem){    // returns first Child that is not a whitespace.
                              // null if no first Child available
  if(elem == null) {
      return null;
  }
 
  tElem = elem.firstChild;    
  while (tElem.tagName == undefined){
      if((tElem = tElem.nextSibling) == null){
          return null;
      }
  }
  return tElem;
}

function setCookie(name,value,expiredays){
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
 
  document.cookie = name+ "=" +escape(value)
          + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

function unsetCookie(name){
  setCookie(name, "", -1);
}

function getCookie(name){
  if (document.cookie.length > 0){
      c_start=document.cookie.indexOf(name + "=");
      if (c_start != -1){
         
          c_start = c_start + name.length+1 ;
          c_end = document.cookie.indexOf(";",c_start);
         
          if (c_end == -1) {
              c_end = document.cookie.length;
          }
          return unescape(document.cookie.substring(c_start,c_end));
      }
  }
  return "";
}