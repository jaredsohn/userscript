// ==UserScript==
// @name        Bottomless Browsing
// @namespace   http://userscripts.org
// @description Pad the bottom of the page with tildes if it is longer than one page to allow seamlessly paging down, much the way the vi editor does. Plays well with AutoPager.
// @include     *
// @version     1.1
// ==/UserScript==
var ScrollLimit = 2;
window.addEventListener("scroll", ScrollingDetected, false);
// create a new div element and give it some content
var newDiv = document.createElement("div");
newDiv.setAttribute("id", "pagePadder");
document.body.appendChild(newDiv);

//default to padding if it's longer than one screenful, since we won't have a chance to catch the event if it is between 1 and 2 screenfuls long
if (pixelsBelow() < pixelsPerPgDn() && getDocHeight() > pixelsPerPgDn()) {
  newContent = Array(linesPerPgDn()).join("~<br>"); //ten lines of tildes
  newDiv.innerHTML += newContent; 
}

function ScrollingDetected() {
  if (pixelsBelow() < pixelsPerPgDn() && ScrollLimit > 0) {
    //var newContent = document.createTextNode("Bottoming out:pageYOffset="+window.pageYOffset+" innerHeight="+window.innerHeight+" scrollMaxY="+window.scrollMaxY+" Scroll events detected="+NumberOfScrollEvents+"\n");
    //var newContent = "Bottoming out:pageYOffset="+window.pageYOffset+" innerHeight="+window.innerHeight+" scrollMaxY="+window.scrollMaxY+" Scroll events detected="+NumberOfScrollEvents+"<br>";
    newContent = Array(linesPerPgDn()).join("~<br>"); //ten lines of tildes
    pagePadderDiv = document.getElementById('pagePadder');
    pagePadderDiv.innerHTML += newContent; 
    ScrollLimit--;
  }
}
//http://code.google.com/p/chromium/issues/detail?id=2891
function documentScrollTop() {
  return (document.documentElement.scrollTop + document.body.scrollTop
  == document.documentElement.scrollTop) ?
  document.documentElement.scrollTop : document.body.scrollTop;
}
//http://stackoverflow.com/questions/871399/cross-browser-method-for-detecting-the-scrolltop-of-the-browser-window
function getScrollTop(){
    if(typeof pageYOffset!= 'undefined'){
        //most browsers
        return pageYOffset;
    }
    else{
        var B= document.body; //IE 'quirks'
        var D= document.documentElement; //IE with doctype
        D= (D.clientHeight)? D: B;
        return D.scrollTop;
    }
}
//http://stackoverflow.com/questions/1766861/find-the-exact-height-and-width-of-the-viewport-in-a-cross-browser-way-no-proto
function getViewportHeight() {
  var viewPortHeight;
  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerHeight != 'undefined') {
    viewPortHeight = window.innerHeight;
  }
  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (typeof document.documentElement != 'undefined'
        && typeof document.documentElement.clientHeight!= 'undefined' 
        && document.documentElement.clientHeight!= 0) {
    viewPortHeight = document.documentElement.clientHeight;
  }
  else {
  // older versions of IE
    viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
  }
  return viewPortHeight;
}
function getDocHeight() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}

function pixelsBelow() {
  return getDocHeight() - getScrollTop() - getViewportHeight();//total height - height above viewport - height of viewport
}

function pixelsPerPgDn() {
  return window.innerHeight;
}

function linesPerPgDn() {
  pagePadderDiv = document.getElementById('pagePadder');
  //var CSSlineHeight = pagePadderDiv.style.lineHeight;
  if (getLineHeight(pagePadderDiv) > 10 && !isNaN(getLineHeight(pagePadderDiv))) {
    return Math.ceil(pixelsPerPgDn() / getLineHeight(pagePadderDiv));
  }
  else { //estimate at least 10 lines per page down
    return 10;
  }
}

//http://stackoverflow.com/questions/4392868/javascript-find-divs-line-height-not-css-property-but-actual-line-height
function getLineHeight(element){
   var temp = document.createElement(element.nodeName);
   temp.setAttribute("style","margin:0px;padding:0px;font-family:"+element.style.fontFamily+";font-size:"+element.style.fontSize);
   temp.innerHTML = "test";
   temp = element.parentNode.appendChild(temp);
   var ret = temp.clientHeight;
   temp.parentNode.removeChild(temp);
   return ret;
}
