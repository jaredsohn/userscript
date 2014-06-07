// ==UserScript==
// @name           AnonymousEraser
// @namespace      AnonymousEraser
// @description    AnonymousEraser
// @include        http://*.forumwarz.com/discussions/rp
// @include        http://forumwarz.com/discussions/rp
// @include        http://*.forumwarz.com/discussions
// @include        http://forumwarz.com/discussions
// ==/UserScript==

var anonsErased = 0;
$$ = unsafeWindow['window'].$$;

function getThread(text,whichThread){
var returnHTML = '<tr class="even_read"><td class="sub">';
var subForum = text.responseText;
var startingPoint = subForum.indexOf('<b>STICKY:</b>');
startingPoint += 300;

var trCount = 0;
for(var i=startingPoint;i<subForum.length;i++) {
if(subForum.charAt(i)=="<" && subForum.charAt(i+1)=="t" && subForum.charAt(i+2)== "r") {
  trCount++;
 }
 if(trCount == whichThread) { 
  startingPoint = i;
  i = subForum.length;
 }
}
var rowText = "";
for(var i=startingPoint;i<subForum.length;i++){


if(subForum.slice(i,i+4) == "</tr") {
 rowText += "</tr>";
 i=subForum.length;
}
else {
 rowText += subForum.charAt(i);
}
}
var startLink = rowText.indexOf("class='sub'>") + 13;
var endLink = rowText.indexOf("<span class='pages'>")-1;
var linkText = "";
for(var i=startLink;i<endLink;i++) {
linkText += rowText.charAt(i);
}
var linkInnerHTML = linkText.slice(linkText.indexOf(">")+1,linkText.length-4);
var temp;
if(linkText.length > linkText.indexOf(">")+42){
 temp = linkText.slice(0,linkText.indexOf(">")+1);
 temp += linkText.slice(linkText.indexOf(">")+1,linkText.indexOf(">")+42);
 temp += "...";
 linkText = temp;
}
var opName = rowText.substring(endLink).indexOf('title="');
opName = rowText.slice(endLink + opName + 7);
opName = opName.slice(0,opName.indexOf('"'));

temp = linkText.slice(0,linkText.indexOf(">"))
temp += ' title="' + linkInnerHTML + " - by " + opName + '">' + linkText.slice(linkText.indexOf(">")+1);

linkText = temp;
returnHTML += linkText;

var tdCount = 0;
for(var c = endLink;c<rowText.length;c++){
if(rowText.slice(c,c+4) == "</td") {
  
  tdCount++;
  c +=6;

  if(tdCount == 3 || tdCount == 5) {
   returnHTML += "</td>";
  }
 }
if(tdCount == 2 || tdCount == 4) {
  returnHTML += rowText.charAt(c);

 }
}
returnHTML += "</tr>";


var myTable = document.getElementsByTagName("table")[6].innerHTML;
myTable = myTable.slice(0,myTable.length-125);
myTable += returnHTML + '</tr><tr class="footer"><td colspan="3"><a href="/discussions/rp">View More Active Topics</a></td></tr></tbody>';
document.getElementsByTagName("table")[6].innerHTML = myTable;
}


function newPosts() {

GM_xmlhttpRequest({

    method: 'GET',

    url: 'http://www.forumwarz.com/discussions/topics/9', //General Role-Playing

    onload: function(responseDetails) {
        for(var i=8; i<8+anonsErased; i++) {
         getThread(responseDetails, i);
        }
    }

});

}

function getElementsByClass(theClass) {
 var allHTMLTags = new Array();
 var classElements = new Array();
 var allHTMLTags=document.getElementsByTagName("*");
 for (i=0; i<allHTMLTags.length; i++) {
  if (allHTMLTags[i].className==theClass) {
   classElements[classElements.length] = allHTMLTags[i];
  }
 }
 return classElements;
}
var target;
if(window.location.pathname.indexOf("discussions/rp") == -1){
target = getElementsByClass("small min")[1].children[0].children;

for(var a = 1; a < target.length-1; a++) {
var testText = "";
for(var i=1; i<target[a].children[2].textContent.length-1; i++) {
 testText += target[a].children[2].textContent.charAt(i);
}
if(testText == "Anonymous") {
 target[a].style.display = "none";
 anonsErased++;
}
}

target = getElementsByClass("small")[3].children[0].children;
target[9].style.display = "none";
target[10].className = "even";
}
else{
target = getElementsByClass("small")[0].children[0].children;

for(var a = 1; a < target.length-1; a++) {
var testText = "";
for(var i=1; i<target[a].children[2].textContent.length-1; i++) {
 testText += target[a].children[2].textContent.charAt(i);
}
if(testText == "Anonymous") {
 target[a].style.display = "none";
 anonsErased++;
}
}

target = getElementsByClass("small")[1].children[0].children;
target[9].style.display = "none";
target[10].className = "even";
}

if(anonsErased > 0) {

if (document.title.indexOf("The Forumwarz Forums") != -1) {

	window.addEventListener("load", function (e) {newPosts();}, "false");

} else {

	newPosts();

}
}