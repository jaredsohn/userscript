// ==UserScript==
// @name          Craigslist image preview 2
// @description   View craigslist image previews
// @include       http://*.craigslist.org/*
// @include       http://*.craigslist.ca/*
// @exclude       http://*.craigslist.org/
// @exclude       http://*.craigslist.ca/
// ==/UserScript==

/* This is a reworking of "Craigslist image preview" by Jeffrey Palm.
 * I fixed 3 bugs & added 2 improvements.
 * Bug fix #1 (missing thumbnails): the image preview didn't appear if the original img 
 * tag in the ad has any attribute (style, border, etc.) before the source attribute.
 * Bug fix #2 (small pics blown up): Small images were enlarged.
 * Bug fix #3 (internationalize): Now works in Canada too.
 * Improvement #1 (small-pics clutter): filter out small images, so that they don't even appear
 * Improvement #2 (enlarge thumbnail on mouseover): up to 550x600 pixels.
 * All my changes are shown with a VERSION 2 CODE comment.
 */

// --------------------------------------------------
// misc
// --------------------------------------------------

var PREFIX = "*cs*.";
var SIZE_PARAM = "size";
var KEEP_ASPECT_RATIO_PARAM = "aspect.ratio";
var CLASS = "_c";
var size = 0;
var mouseMoves = 0;
var lastImg;

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
      
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// VERSION 2 CODE: change reg exp below
//    if (m = details.responseText.match(/img src=\"([^\"]+)\"/gi)) {
      if (m = details.responseText.match(/<img ([^>]+)>/gi)) {
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// VERSION 2 CODE: change replace methods to split methods below
//        s = s.replace(/img src=/g,"");
//        s = s.replace(/\"/g,"");
          s = s.split('src="')[1];
          s = s.split('"')[0];
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// VERSION 2 CODE: changed width, height to maxWidth, maxHeight below
          if (!keepAspectRatio) {
            img.style.maxWidth = size + "px";
          }
          img.style.maxHeight = size + "px";
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

          $t(" ",div);
          newA.href = s;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// VERSION 2 CODE: filter out small images, add mouseover blowups
          img.addEventListener("load", function() {
                                 if (this.height < size) {
                                   this.parentNode.parentNode.removeChild(this.parentNode);
                                 } 
                              },true);
          //img.addEventListener("mousemove", function() {
          //                       mouseMoves += 1;
          //                    },true);
          //img.addEventListener("mouseover", function() {
          //                       mouseMoves = 0;
          //                       if (lastImg) {
          //                         lastImg.style.maxHeight = size + "px";
          //                         lastImg = null;
          //                       }
          //                       this.style.maxHeight = 550 + "px";
          //                       if (!keepAspectRatio) {
          //                         this.style.maxWidth = 600 + "px";
          //                       }
          //                     },true);
          //img.addEventListener("mouseout", function() {
          //                       if (mouseMoves > 2) {
          //                         this.style.maxHeight = size + "px";
          //                         if (!keepAspectRatio) {
          //                           this.style.maxWidth = size + "px";
          //                         }
          //                       }
          //                       else lastImg = this;
          //                     },true);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// VERSION 2 CODE: change width, height to maxWidth, maxHeight below
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if (!keepAspectRatio) {
      img.style.maxWidth = size + "px";
    }
    img.style.maxHeight = size + "px";
  }
}

function showImages() {
  //
  // find all the links to listings and display the images
  //
  links = document.getElementsByTagName("a");
  for (i=0; i<links.length; i++) {
    //alert(i + links[i]);
    if(i==0 || (link!=links[i-1])){
      link = links[i];
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// VERSION 2 CODE: remove "org" below, so that it works in Canada too (.ca)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      if (link.href && link.href.match(/.*craigslist.*\/\d+\.html$/)) {
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
}

function main() {
  size = getValue(SIZE_PARAM,100);
  keepAspectRatio = getValue(KEEP_ASPECT_RATIO_PARAM,true);
  addLinkAtTop();
  showImages();
}

try {main();} catch (e) {}
