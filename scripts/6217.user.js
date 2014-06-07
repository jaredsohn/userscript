// ==UserScript==
// @name          Reddit tags
// @namespace     http://jeffpalm.com/redditags
// @description	  Makes the font a difference size based on points
// @include       http://*reddit.com/*
// ==/UserScript==

/*
 * Copyright 2006 Jeffrey Palm.
 */

var VERSION = 0.1;

// --------------------------------------------------
// misc
// --------------------------------------------------

function $n(tag,on) {
	var e = document.createElement(tag);
	if (on) on.appendChild(e);
	return e;
}

function $t(text,on) {
	var e = document.createTextNode(text);
	if (on) on.appendChild(e);
	return e;
}

function insertBefore(newNode,target) {
	// http://lists.xml.org/archives/xml-dev/200201/msg00873.html
  var parent   = target.parentNode;
	var refChild = target; //target.nextSibling;	
	if(refChild) parent.insertBefore(newNode, refChild);
	else parent.appendChild(newNode);	
}

// --------------------------------------------------
// main
// --------------------------------------------------

function main() {
  changeSizes();
}

function changeSizes() {
  //
  // build a list of scores and titles
  //
	var trs = document.getElementsByTagName("tr");
	var scoresAndTitles = new Array();
	var debug = true;
  var min;
  var max;
	for (var i=0; i<trs.length; i++) {
		var tr = trs[i];

		// make sure we're in the right table
		if (!tr.parentNode) continue;
		if (!tr.parentNode.id == "siteTable") continue;

		// decide which TR this is
		if (tr.id && tr.id.match(/^site.*/)) {
      scoreId = tr.id.replace(/site/,'score');
      scoreSpan = document.getElementById(scoreId);
      if (scoreSpan) {
        score = parseInt(scoreSpan.innerHTML.replace(/\s+.*/,''));
        titleSpan = document.getElementById(tr.id.replace(/site/,'title'));
        scoresAndTitles.push(score);
        scoresAndTitles.push(titleSpan);
        //
        // keep track of the min and max
        //
        if (!max || score>max) max = score;
        if (!min || score<min) min = score;
      }
      debug=0;
    }
  }
  //
  // change the font on all of these
  // we want the min to have a font-size of 'LO' em and the
  // max 'HI' em y=m*x+b and we fit so
  //
  //  m*min+b =  LO
  //  m*max+b =  HI
  //
  var HI = 3;
  var LO = 1;
  var m = (HI-LO) / (max-min);
  var b = LO;
  for (var i=0; i<scoresAndTitles.length;) {
    var score = scoresAndTitles[i++];
    var title = scoresAndTitles[i++];
    var size = m*score + b;    
    title.style.fontSize = size + "em";
	}
}

main();

