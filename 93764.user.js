// ==UserScript==
// @name          Top Pics voting buttons
// @description	  Adds reject and accept buttons below the comment field, which insert the appropriate line to the comment
// @namespace     http://www.genista.de/kai
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*

// by Kai Schreiber (http://www.genista.de/kai)
// ==/UserScript==

// fixed by j / f / photos (http://www.flickr.com/photos/good-karma
// modified for Top Pics by 42n4

(function() {
 // only execute for photo pages that are in Top Pics pool context
  var mxreject = 1;
  var mxaccept = 1;
  if ((document.getElementById('candy_nav_button_bar') && (document.getElementById('context-pool-1564596__at__N20'))) || (document.getElementById('button_bar') && (document.getElementById('contextDiv_pool1564596@N20')))) {
    // how many rejectes and accepts are there?
	var all = document.all ? document.all : document.getElementsByTagName('*');
	for (var e = 0; e < all.length; e++)
		if (all[e].title == 'Added by You')
			if(all[e].href.search('.*/reject/$') ||all[e].href.search('.*/accept/$') || all[e].href.search('.*/reject[0-9]*/$') || all[e].href.search('.*/accept[0-9]*/$'))
				return;

   var p = document.body.innerHTML.match(/Y.tagRS.addTag\('(.+?)'/g);
   var n = 0;
   if(p)
	   for (i=0; i < p.length; i++) {
			if (p[i].substr(16,6)=='reject') { mxreject=mxreject + 1; };
			if (p[i].substr(16,6)=='accept') { mxaccept=mxaccept + 1; };
		}

    // construct the buttons
	var reject = document.getElementsByName('reject');
	var buttons = document.createElement('p');
	//buttons.innerHTML = "HI!!!"
    buttons.innerHTML = "<div class='buttons'><p><input type='button' name='reject' class='Butt' style=\"background-color: #FF0000;\" value='reject' onClick='document.forms.tagadderform.tag.value=\"reject"+mxreject+"\";this.form.message.value+=\"\\n-Voted reject"+mxreject+" (from the <a href=http://www.flickr.com/groups/1564596@N20/>Top Pics</a> group)\";document.tagadderform.elements[2].click();'>" +
      '&nbsp;&nbsp;&nbsp;&nbsp; OR &nbsp;&nbsp;&nbsp;&nbsp;'+
      "<input type='button' name='accept' class='Butt' value='accept' style=\"background-color: #00FF00; font-size: 50%;\" onClick='document.forms.tagadderform.tag.value=\"accept"+mxaccept+"\";this.form.message.value+=\"\\n-Voted accept"+mxaccept+" (from the <a href=http://www.flickr.com/groups/1564596@N20/>Top Pics</a> group)\";document.tagadderform.elements[2].click();'></p></div>";
    // place them
    var place = document.getElementsByName('preview');
    if (place[0]) {
	  if (!reject[0]) {
	      place[0].parentNode.insertBefore(buttons,place[0]);
	  }
    }
  }
}
)();
