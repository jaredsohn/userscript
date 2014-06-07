// ==UserScript==
// @name          Craigslist image preview
// @namespace     http://jeffpalm.com/craigslist edited by deicidist
// @description   View craigslist image previews
// @include       http://*.craigslist.ca/*
// ==/UserScript==

/*
 * Copyright 2007 Jeffrey Palm. (Edited by deicidist)
 */

// --------------------------------------------------
// misc
// --------------------------------------------------

var PREFIX = "*cs*.";
var SIZE_PARAM = "size";
var KEEP_ASPECT_RATIO_PARAM = "aspect.ratio";
var CLASS = "_c";
var size = 0;

function setValue(key,val) {
  GM_setValue(PREFIX + key,val);
  return val;
}

function getValue(key,defaultValue) {
  var res = GM_getValue(PREFIX + key);
  if (!res) res = defaultValue;
  return res;
}

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

/**
 * Node Node -> Void
 * Inserts newNode before target.
 * http://lists.xml.org/archives/xml-dev/200201/msg00873.html
 */
function insertBefore(newNode,target) {
  var parent   = target.parentNode;
  var refChild = target; //target.nextSibling;  
  if(refChild) parent.insertBefore(newNode, refChild);
  else parent.appendChild(newNode);  
}

var cnt=0;
function newFunction(_a) {
  var a = _a;
  return function(details) {
    if (details.responseText) {
      
      if (m = details.responseText.match(/img src=\"([^\"]+)\"/gi)) {

        //
        // Go thru the links
        // div will hold the new div below the links parent
        //
        var div;
        for (j=0; j<m.length; j++) {
          s = m[j];
          if (!s) continue;
          //
          // basically a hack, but I thought this would return 
          // an array
          s = s.replace(/img src=/g,"");
          s = s.replace(/\"/g,"");
          //
          // For the first time create the div to hold the links
          //
          if (!div) {
            var d = $n("div",a.parentNode);
            var br = $t(" ",a.parentNode);
            div = $n("div",a.parentNode);
          }
          //
          // Create the link and image and add them
          //
          var newA = $n("a",div);
          var img = $n("img",newA);
          img.className = CLASS;
          img.src = s;
          //
          // 1.5: Don't change the height if we're keeping the aspect ratio
          //
          if (!keepAspectRatio) {
            img.style.width = size + "px";
          }
          img.style.height = size + "px";
          $t(" ",div);
          newA.href = s;
        }
      }
    }
  };
}

function addLinkAtTop() {

  var span = $n("span");
  span.style.verticalAlign = "middle";

  $t("change size: ",span);

  var sel = $n("select",span);
  for (var i=10; i<=300; i += 10) {
    var opt = $n("option",sel);
    opt.value = i;
    if (i == size) opt.selected = true;
    opt.innerHTML = i;
  }
  sel.addEventListener("change",function() {
                         var v = sel.value;
                         size = setValue(SIZE_PARAM,v);
                         changeSizes();
                       },true);

  $t(" keep aspect ratio: ",span);

  var check = $n("input",span);
  check.type = "checkbox";
  if (keepAspectRatio) check.checked = "1";
  check.addEventListener("change",function() {
                           var v = check.checked;
                           keepAspectRatio = setValue(KEEP_ASPECT_RATIO_PARAM,v);
                           changeSizes();
                         },true);
  
  var tab = document.getElementById("topbar");
  if (!tab) {
    tab = document.getElementsByTagName("table")[0];
  }
  tr = $n("tr",tab);
  td = $n("td",tab);
  td.appendChild(span);
  tab.insertBefore(tr,tab.firstChild);
}

function changeSizes() {
  var imgs = document.getElementsByTagName("img");
  for (var i in imgs) {
    var img = imgs[i];
    if (img.className != CLASS) continue;
    //
    // 1.5: Don't change the height if we're keeping the aspect ratio
    //
    if (!keepAspectRatio) {
      img.style.width = size + "px";
    }
    img.style.height = size + "px";
  }
}

function showImages() {
  //
  // find all the links to listings and display the images
  //
  links = document.getElementsByTagName("a");
  for (i=0; i<links.length; i++) {

    link = links[i];
    if (link.href && link.href.match(/.*craigslist.ca.*\/\d+\.html$/)) {
      GM_xmlhttpRequest({
        method:"GET",
            url: link.href,
            headers:{
            "User-Agent": "monkeyagent",
              "Accept":"text/html,text/monkey,text/xml,text/plain",
              },
            onload: newFunction(link)
        });
    }
  }
}

function main() {
  size = getValue(SIZE_PARAM,100);
  keepAspectRatio = getValue(KEEP_ASPECT_RATIO_PARAM,true);
  addLinkAtTop();
  showImages();
}

try {main();} catch (e) {}
