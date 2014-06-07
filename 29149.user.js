// ==UserScript==
// @namespace   http://ellab.org/
// @name        Forum Photo Viewer
// @description Easier to view photos in forum
// @include http://*/*thread*
// ==/UserScript==

// By: Angus http://angusdev.mysinablog.com/
// --- Supported Forum ---
// Discuz! 6.0
// Discuz! 5.X

// Version History
// 1 - 12-Dec-2007        1. First Release

// ------------------------------
// Begin Now
var THUMB_WIDTH = 80;
var THUMB_HEIGHT = 80;
var SIZE_THERSHOLD = 100;
var PID = Math.round(Math.random() * 100000, 0);

var ForumType = "";
var PhotoList = null;
var CurrentSelected = 0;
var TYPE_DISCUZ_6 = "discuz6";
var TYPE_DISCUZ_5 = "discuz5";
var TYPE_DISCUZ_5_INLINE = "discuz5i";

function getPhotoList() {
  var res = null;
  if (!ForumType || ForumType == TYPE_DISCUZ_6) {
    res = document.evaluate("//dl[@class='t_attachlist']//dd//img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!ForumType && res.snapshotLength > 0) {
      ForumType = TYPE_DISCUZ_6;
    }
  }
  if (!ForumType || ForumType == TYPE_DISCUZ_5) {
    res = document.evaluate("//div[@class='t_attachlist']//img", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!ForumType && res.snapshotLength > 0) {
      ForumType = TYPE_DISCUZ_5;
    }
  }
  if (!ForumType || ForumType == TYPE_DISCUZ_5_INLINE) {
    res = document.evaluate("//img[@onmousewheel='return imgzoom(this);']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (!ForumType && res.snapshotLength > 0) {
      ForumType = TYPE_DISCUZ_5_INLINE;
    }
  }

  if (res.snapshotLength > 0) {
    PhotoList = new Array();
    for (var i=0;i<res.snapshotLength;i++) {
      var item = res.snapshotItem(i);
      var alreadyExist = false;
      for (var j=0;j<PhotoList.length;j++) {
        if (PhotoList[j].src == item.src) {
          alreadyExist = true;
          break;
        }
      }
      if (!alreadyExist && (!item.height || item.height >= SIZE_THERSHOLD) && (!item.width || item.width >= SIZE_THERSHOLD)) {
        PhotoList[PhotoList.length] = item;
      }
    }
  }
}

function funcionPrincipal() {
  window.setTimeout(checkSupport, 2000);
}

function checkSupport() {
  getPhotoList();
  if (PhotoList && PhotoList.length > 0) {
    GM_addStyle("#photoviewer-button" + PID + " { " +
                "display: block;" +
                "position: fixed;" +
                "z-index: 32767;" +
                "top: 0; right: 0;" +
                "padding: 7px 7px; background: #ffc272;" +
                "font-size:12pt; color: black; font-family: Tahoma;" +
                "cursor:pointer;" +
                "-moz-border-radius: 0 0 0 15px; border: solid #ccc; border-width: 0 0 1px 1px; }");
    var div = document.createElement("div");
    div.setAttribute("id", "photoviewer-button" + PID);
    div.innerHTML = "View Photos (" + PhotoList.length + ")";
    div.addEventListener("click", function(e) {
      makeGallery();
    }, 0);
    document.body.appendChild(div);
  }
}
function makeGallery() {
  GM_addStyle("#photoviewer" + PID + " {" +
              "background-color:#555555;" +
              "-moz-opacity:1;" +
              "position:fixed;left:0px;top:0px;" +
              "height:100px;width:10000px;" +
              "overflow:hidden; }");
  GM_addStyle("#photoviewer" + PID + " div.separator {" +
              "background-color:white;" +
              "margin:10px 4px;" +
              "height:" + THUMB_HEIGHT + "px;width:2px;" +
              "float:left; }");
  GM_addStyle("#photoviewer" + PID + " div.thumb {" +
              "width:" + THUMB_WIDTH + "px;" +
              "height:"+ THUMB_HEIGHT +"px;" +
              "margin:10px 5px;" +
              "-moz-opacity:1;" +
              "float:left;" +
              "overflow:hidden; }");
  GM_addStyle("#photo" + PID + " {" +
              "width:100%;height:" + (window.innerHeight - 120) + "px;" +
              "margin-top:110px;" +
              "overflow:auto;" +
              "text-align:center; }");
  var container = document.createElement('DIV');
  container.setAttribute("id", "photoviewer" + PID);
  container.setAttribute("style", "margin-left: 0px;");

  var res = PhotoList;
  var loop = 2;
  if (window.innerWidth >= getOffSet(res.length)) {
    loop = 1;
  }
  for (var i=0;i<loop;i++) {
    // create separator
    var div = document.createElement("DIV");
    div.className = "separator";
    container.appendChild(div);
    for (var j=0;j<res.length;j++) {
      var img = res[j];
      var div = document.createElement("DIV");
      div.className = "thumb";
      var thumbimg = document.createElement("IMG");
      thumbimg.src = img.src;
      if (img.width && img.height && img.width > img.height) {
        thumbimg.height = THUMB_HEIGHT;
        thumbimg.style.marginLeft = (-Math.round((img.width / img.height * THUMB_HEIGHT - THUMB_WIDTH) / 2, 0)) + "px";
      }
      else {
        thumbimg.width = THUMB_WIDTH;
      }
      thumbimg.addEventListener("mouseover", function(e) {
        /*
        var imglist = document.getElementById("photoviewer" + PID).getElementsByTagName("IMG");
        imglist[CurrentSelected].className = "";
        for (var i=0;i<imglist.length;i++) {
          if (imglist[i] == e.target) {
            CurrentSelected = i;
            imglist[CurrentSelected].className = "selected";
          }
        }
        */
        document.getElementById("photo"  + PID).innerHTML = "<img src='" + e.target.src + "'/>";
      }, 0);
      div.appendChild(thumbimg);
      container.appendChild(div);
    }
  }

  var photo = document.createElement("DIV");
  photo.setAttribute("id", "photo"  + PID);

  document.body.innerHTML = "";
  document.body.style.backgroundColor = "white";

  document.body.appendChild(container);
  document.body.appendChild(photo);

  if (loop > 1) {
    window.addEventListener('DOMMouseScroll', wheel, false);
  }
}

function getOffSet(n) {
  return n * (THUMB_WIDTH + 10);
}

function wheel(e){
  var ele = e.target;
  var parentEle = document.getElementById("photoviewer" + PID);
  var isInParent = false;
  while (ele && !isInParent) {
    if (ele == parentEle) {
      isInParent = true;
    }
    ele = ele.parentNode;
  }
  if (isInParent) {
    var delta = e.detail/3;
    if (delta) {
      var div = document.getElementById("photoviewer" + PID);
      var res = div.style.marginLeft.match(/^-?(\d*)/);
      var m = 0;
      if (res) {
        m = parseInt(res[1], 10);
      }
      m += (delta / Math.abs(delta)) * (THUMB_WIDTH + 10);
      if (m > getOffSet(PhotoList.length)) {
        m -= getOffSet(PhotoList.length);
      }
      if (m < 0) {
        m += getOffSet(PhotoList.length);
      }
      //m = Math.min(m, getOffSet(PhotoList.length) - window.innerWidth);
      m = Math.max(m, 0);
      div.style.marginLeft = -m + "px";
    }
    e.preventDefault();
    e.returnValue = false;
  }
}

window.addEventListener('DOMContentLoaded', funcionPrincipal, false);
if (document.body) funcionPrincipal();