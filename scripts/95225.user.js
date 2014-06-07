// ==UserScript==
// @name           Backpage Post Preview
// @namespace      real.billy
// @description    Shows ad preview on link mouseover
// @include        http://*.backpage.*
// @version 2.1
// ==/UserScript==

var NEW_DIV_CSS_TEXT = "position: fixed; top: 10px; right: 10px; display: none; z-index:1000; "
        + "width:550px; font-size: 85%; background-color:#fafafa; padding:20px; overflow: auto; "
        + "border: 3px #444444 solid; -moz-box-shadow: 3px 3px 4px #000; -webkit-box-shadow: 3px 3px 4px #000; box-shadow: 3px 3px 4px #000;"

var isMouseOverLink = false;
var currentlyOpenedIndex = -1;

function closeAll() {
  var index = 0;
  while (document.getElementById("newDiv" + index)) {
    document.getElementById("newDiv" + index).style.display = 'none';
    index++;
  }
}

function setMouseTracking(isEnabled) {
  if (isEnabled) {
    document.addEventListener("mousemove", onMouseMove, true);
  } else {
    document.removeEventListener("mousemove", onMouseMove, true);
  }
}

function showThisOne(event) {
  closeAll();
  currentlyOpenedIndex = event.target.id;
  document.getElementById("newDiv" + currentlyOpenedIndex).style.display = 'block';
  document.getElementById("newDiv" + currentlyOpenedIndex).style.top = window.pageYOffset + 10;
  setMouseTracking(true);
}

function onMouseMove(event) {
  if (!isMouseOverLink && currentlyOpenedIndex != -1) {
    if (!mouseInsideDiv(event)) {
      closeDiv(currentlyOpenedIndex);
    }
  }
}

function mouseInsideDiv(event) {
  var index = event.target.id;
  if (!index) return false;
  var newDiv = document.getElementById(index);
  var divDim = new Dimension(newDiv);
  if (currentlyOpenedIndex != -1) {
    if (divDim.x <= event.pageX && event.pageX <= (divDim.x + divDim.w)
       && divDim.y <= event.pageY && event.pageY <= (divDim.y + divDim.h)) {
        return true;
    }
  }
  return false;
}

function closeDiv(index) {
  document.getElementById("newDiv" + index).style.display = 'none';
  setMouseTracking(false);
  currentlyOpenedIndex = -1;
}

function closeThisOne(event) {
  var index = event.target.id;
  closeDiv(index);
}

function onMouseOver(event) {
  isMouseOverLink = true;
  showThisOne(event);
}

function onMouseOut(event) {
  var index = event.target.id;
  if (!mouseInsideDiv(event)) {
    closeThisOne(event);
  }
  isMouseOverLink = false;
}

var index = 0;
function processLink(_a) {
  var a = _a;
  return function(details) {
    if (details.responseText) {
      a.id = index;
      var time = details.responseText.match(/<div class="adInfo">posted:.*?<\/div>/);
      var START_TEXT = "<div class=\"postingBody\">";
      var startIndex = details.responseText.indexOf(START_TEXT);
      var endIndex = details.responseText.indexOf("</div>", startIndex);
      var postText = time + '<br>' + details.responseText.substring(startIndex + START_TEXT.length, endIndex);
      
      // change image sizes to 50% height/width and put them on one row
      postText = postText.replace(/img src=/g,"img height=\"50%\" width=\"50%\" src=");
      postText = condenseImageTable(postText);
      
      var div = document.createElement("div");
      document.getElementsByTagName('body')[0].appendChild(div);
      
      var newDiv = document.createElement("div");
      newDiv.id = "newDiv" + index;
      newDiv.innerHTML = postText;
      newDiv.style.cssText = NEW_DIV_CSS_TEXT;
      div.appendChild(newDiv);
      
      a.addEventListener("mouseover", onMouseOver, true);
      a.addEventListener("mouseout", onMouseOut, true);
      a.addEventListener("click", closeThisOne, true);
      
      index++;
    }
  };
}

function Dimension(element){
  this.x = -1;
  this.y = -1;
  this.w = 0;
  this.h = 0;
  if (element == document){
    this.x = element.body.scrollLeft;
    this.y = element.body.scrollTop;
    this.w = element.body.clientWidth;
    this.h = element.body.clientHeight;
  }
  else if (element != null) {
    var e = element;
    
    var left = e.offsetLeft;
    while ((e = e.offsetParent) != null) {
      left += e.offsetLeft;
    }
    
    e = element;
    var top = e.offsetTop;
    while((e = e.offsetParent) != null) {
      top += e.offsetTop;
    }
    
    this.x = left;
    this.y = top;
    this.w = element.offsetWidth;
    this.h = element.offsetHeight;
  }
}

// puts table of images all in one row
function condenseImageTable(postText) {
  var startTable = postText.indexOf("<table summary=\"craigslist hosted images\">");
  if (startTable == -1) return postText;
  // remove </tr><tr> if present
  var endTR = postText.indexOf("</tr>", startTable);
  // see if we have another <tr> between the </tr> and the </table>
  var nextTR = postText.indexOf("<tr>", endTR);
  var endTable = postText.indexOf("</table>", startTable);
  if (nextTR < endTable) {
    postText = postText.substring(0, endTR) + postText.substring(nextTR + "<tr>".length);
  }
  return postText;
}

// find all the links to listings and fetch their content
function loadListings() {
  links = document.getElementsByTagName("a");
  for (var i=0; i<links.length; i++) {
    link = links[i];
    if (link.href && link.href.match(/.*\.backpage.com\/.*\/\d+$/)) {
      GM_xmlhttpRequest({
        method:"GET",
            url: link.href,
            headers:{
              "User-Agent": navigator.userAgent,
            },
            onload: processLink(link)
        });
		link.setAttribute('target','_blank');
    }
  }
}

loadListings();