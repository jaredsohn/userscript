// ==UserScript==
// @name        Digg Reader Chinese
// @namespace   http://70apps.com/
// @description Chinese Support for Digg Reader
// @include     http://digg.com/reader*
// @include     https://digg.com/reader*
// @version     0.01
// @grant          none
// ==/UserScript==


function pageRunner(e) {
	var elements=["story-title","dr-label-txt","detail-body","story-meta","dr-feed-label","dr-label","feed-stream-header","story-data"];

        for (var j=0; j < elements.length; j++) {
	      if(e.target && e.target.getElementsByClassName){
		    var statuses = e.target.getElementsByClassName(elements[j]);
		    if (statuses != null && statuses.length > 0) {
					    statuses[i].style.fontFamily="微软黑体";
		    }
	      }
	}
  }

function appendStyle(styles) {
  var css = document.createElement('style');
  css.type = 'text/css';
  if (css.styleSheet) css.styleSheet.cssText = styles;
  else css.appendChild(document.createTextNode(styles));

  document.getElementsByTagName("head")[0].appendChild(css);
}

var styles = '.detail-body {font-family:微软雅黑;}';
styles+='.feeditem-headline {font-family:微软雅黑;}';
styles+='.feeditem-description {font-family:微软雅黑;}';
styles+='body {font-family:Helvetica Neue,微软雅黑,黑体;}';

window.onload = function() { appendStyle(styles) };

runOnPage();
//pageRunner();

function runOnPage(callback) {
	document.addEventListener("DOMNodeInserted", pageRunner, true);
}