// ==UserScript==
// @name        Digg Reader RTL
// @namespace   http://altqniah.com/
// @description RTL Support for Digg Reader
// @include     http://digg.com/reader*
// @include     https://digg.com/reader*
// @version     0.15
// @grant          none
// ==/UserScript==


function pageRunner(e) {
	var elements=["story-title","dr-label-txt","detail-body","story-meta","dr-feed-label","dr-label","feed-stream-header","story-data"];

        for (var j=0; j < elements.length; j++) {
	      if(e.target && e.target.getElementsByClassName){
		    var statuses = e.target.getElementsByClassName(elements[j]);
		    if (statuses != null && statuses.length > 0) {
			    var isThereRTLChars=/[\u0590-\u05ff\u0600-\u06ff]/;
			    
			    for (var i = 0; i < statuses.length; i++) {
				    var tweetText = statuses[i].innerHTML; 
				    if (isThereRTLChars.test(tweetText)) {
					    statuses[i].style.direction="rtl";
					    statuses[i].style.textAlign="right";
					    statuses[i].style.textAlign="justify";
				    }
				    else{
					    statuses[i].style.direction="ltr";
					    statuses[i].style.textAlign="left";
					    statuses[i].style.textAlign="justify";
				    }
			    }
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

var styles = '.feed-stream-header { padding-right: 30px;}';
styles += '.dr-label.dr-feed-label { padding-right: 20px;}';
styles += '#root-feed-list .dr-list-item, #root-feed-list .dr-feed-list-item{display:none;}';
styles +='.dr-label-has-unread ,dr-list-item dr-feed-list-folder{display: list-item !important;}';
styles +='.dr-list-item.dr-feed-list-folder {display: list-item !important;height: auto !important;}';

window.onload = function() { appendStyle(styles) };

runOnPage();
pageRunner();


function runOnPage(callback) {
	document.addEventListener("DOMNodeInserted", pageRunner, true);
}