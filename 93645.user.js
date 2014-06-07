// ==UserScript==
// @name          The Gutter voting buttons
// @description	  Adds ditch and keep buttons below the comment field, which insert the appropriate line to the comment
// @namespace     http://www.genista.de/kai
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*

// by Kai Schreiber (http://www.genista.de/kai)
// ==/UserScript==

// fixed by j / f / photos (http://www.flickr.com/photos/good-karma
// modified for the Gutter by 42n4

(function() {
 // only execute for photo pages that are in the gutter pool context
  var mxditch = 1;
  var mxkeep = 1;
  if ((document.getElementById('candy_nav_button_bar') && (document.getElementById('context-pool-1135449__at__N24'))) || (document.getElementById('button_bar') && (document.getElementById('contextDiv_pool1135449@N24')))) {
    // how many ditches and keeps are there?
	var all = document.all ? document.all : document.getElementsByTagName('*');
	for (var e = 0; e < all.length; e++)
		if (all[e].title == 'Added by You')
			if(all[e].href.search('.*/ditch/$') ||all[e].href.search('.*/keep/$') || all[e].href.search('.*/ditch[0-9]*/$') || all[e].href.search('.*/keep[0-9]*/$'))
				return;

   var p = document.body.innerHTML.match(/Y.tagRS.addTag\('(.+?)'/g);
   var n = 0;
   if(p)
	   for (i=0; i < p.length; i++) {
			if (p[i].substr(16,5)=='ditch') { mxditch=mxditch + 1; };
			if (p[i].substr(16,4)=='keep') { mxkeep=mxkeep + 1; };
		}

    // construct the buttons
	var ditch = document.getElementsByName('ditch');
	var buttons = document.createElement('p');
	//buttons.innerHTML = "HI!!!"
    buttons.innerHTML = "<div class='buttons'><p><input type='button' name='ditch' class='Butt' style=\"background-color: #FF0000;\" value='ditch' onClick='document.forms.tagadderform.tag.value=\"ditch"+mxditch+"\";this.form.message.value+=\"\\n-Voted ditch"+mxditch+" (from the <a href=http://www.flickr.com/groups/thegutter/>The Gutter</a> group)\";document.tagadderform.elements[2].click();'>" +
      '&nbsp;&nbsp;&nbsp;&nbsp; OR &nbsp;&nbsp;&nbsp;&nbsp;'+
      "<input type='button' name='keep' class='Butt' value='keep' style=\"background-color: #00FF00; font-size: 50%;\" onClick='document.forms.tagadderform.tag.value=\"keep"+mxkeep+"\";this.form.message.value+=\"\\n-Voted keep"+mxkeep+" (from the <a href=http://www.flickr.com/groups/thegutter/>The Gutter</a> group)\";document.tagadderform.elements[2].click();'></p></div>";
    // place them
    var place = document.getElementsByName('preview');
    if (place[0]) {
	  if (!ditch[0]) {
	      place[0].parentNode.insertBefore(buttons,place[0]);
	  }
    }
  }
}
)();
