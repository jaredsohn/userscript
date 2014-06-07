// ==UserScript==
// @name		OdnoklassnikiMediaEmbedder
// @namespace	su.gornostaev
// @description	Заменят ссылки на картинки самими картинками, а ссылки на youtube-ролики роликами
// @version		2.9
// @author		Sergey TheDeadOne Gornostaev
// @license		GPL
// @include		http://www.odnoklassniki.ru/*
// @include		https://www.odnoklassniki.ru/*
// @include		http://odnoklassniki.ru/*
// @include		https://odnoklassniki.ru/*
// @grant		none
// @updateURL		https://userscripts.org/scripts/source/144938.user.js
// @downloadURL		https://userscripts.org/scripts/source/144938.user.js
// ==/UserScript==

var paneWidth = 500;
var paneHeight = 500;

function onLoadCallback(e) {
  var ratio = paneHeight/paneWidth;

  if(this.height/this.width > ratio) {
    if(this.height > paneHeight){
//      this.width = Math.round(this.width*(paneHeight/this.height));
//      this.height = paneHeight;
    }
  }
  else {
    if(this.width > paneWidth) {
      this.height = Math.round(this.height*(paneWidth/this.width));
      this.width = paneWidth;
    }
  }
}

function hasClass(domNode, className) {
  var c;
  if(domNode && domNode.className && typeof className === "string") {
    c = domNode.getAttribute("class");
    c = " "+ c + " ";
    return c.indexOf(" " + className + " ") > -1;
  }
  else {
    return false;
  }
}

var divList = document.querySelector('div');
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if(mutation.target.nodeName == "DIV") {
      if(hasClass(mutation.target, "textWrap")) {
	    paneWidth = mutation.target.offsetWidth;
        for(var i = 0; i < mutation.target.childNodes.length; i++) {
          var txtDivNode = mutation.target.childNodes[i];
          if(txtDivNode.hasChildNodes()) {
            for(var x = 0; x < txtDivNode.childNodes.length; x++) {
              if(txtDivNode.childNodes[x].nodeName == "A") {
                var aNode = txtDivNode.childNodes[x];
                if(aNode.textContent.search(/^https?:\/\/(?:[\da-z\.\-]+)\.([a-z\.]{2,6})(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/i) != -1) {
                  //shitcode
                  var objImg = new Image();
                  objImg.src = aNode.textContent;

                  var imgNode = document.createElement('img');
                  imgNode.onload = onLoadCallback;
                  imgNode.src = aNode.textContent;
                  if((objImg.width != 0) && (objImg.width > paneWidth)) {
                    var aNodeR = document.createElement('a');
                    aNodeR.href = aNode.textContent;
                    aNodeR.target = '_blank';
                    aNodeR.appendChild(imgNode);
                    txtDivNode.replaceChild(aNodeR, aNode);
                  }
                  else {
                    txtDivNode.replaceChild(imgNode, aNode);
                  }
                }
                if(aNode.textContent.search(/youtube\.com\/watch\?/) != -1) {
                  var id = aNode.textContent.split("v=")[1].substring(0, 11);
                  var objNode = document.createElement('object');
                  objNode.width = paneWidth;
                  objNode.height = 350;
                  objNode.innerHTML = '<param value="http://www.youtube.com/v/' + id + '" name="movie"/><param value="transparent" name="wmode"/><embed width="' + paneWidth + '" height="350" wmode="transparent" type="application/x-shockwave-flash" src="http://www.youtube.com/v/' + id + '"/><a href="http://www.youtube.com/v/' + id + '" />';
                  txtDivNode.replaceChild(objNode, aNode);
                }
              }
            }
          }
        }
      }
    }
  });
});
observer.observe(divList, { subtree: true, childList: true });