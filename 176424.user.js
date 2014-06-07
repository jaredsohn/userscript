// ==UserScript==
// @name		s-donkey4u
// @namespace		s-donkey4u
// @version		0.1
// @include		http://donkey4u.com/*
// author		admin@donkey4u.com
// 2013-08-06		initial version
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
$('img.thumbimg').each( function(){ $(this).attr('src', 'http://thumb.donkey4u.com/'+$(this).attr('hash')+'/thumb.jpg' ); } );
$('a[usage=ed2k]').each( function(){ $(this).css("visibility", "visible");} )
}

addJQuery(main);

//以下是从http://userscripts.org/scripts/show/170664抄来的。好人。
addEventListener ('DOMContentLoaded', function () {
  var eImg = document.querySelectorAll ('div img'),
      imgRef = eImg[eImg.length-1],
      aLink = document.createElement ('a'),
      eBr = document.createElement ('br');
  var lInfo = document.body.innerHTML.match(/文件名: (.+?)(\s+|)<br([\s\S]+?)\((\s+|)(\d+)([\s\S]+?)Hash:(\s+|)([a-f0-9]+)/im);
  
  aLink.textContent = '下载档案';
  aLink.href = 'ed2k://|file|' + 
    encodeURIComponent (lInfo [1]) +
    '|' + lInfo [5] +
    '|' + lInfo [8] +
    '|/';
  imgRef.parentNode.insertBefore(aLink, imgRef.nextSibling);
  aLink.parentNode.insertBefore(eBr, aLink);
  
}, false);