// ==UserScript==
// @name          Pasha's Pig Sty voting buttons
// @description	  Adds cheers and chuck buttons below the comment field, which insert the appropriate line to the comment
// @namespace     http://www.flickr.com/photos/pablito_garza/
// @include       http://flickr.com/photos/*
// @include       https://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*
// @include       https://www.flickr.com/photos/*
// @grant       none

// adapted by Pasha C from icebox script by Kai Schreiber (http://www.genista.de/kai)
//
// ==/UserScript==

// fixed by j / f / photos (http://www.flickr.com/photos/good-karma
// fixed by Pasha C http://www.flickr.com/photos/pablito_garza/
(function() {
	
	var done_yet = 0;
  function check_for_tag() {
	var all = document.all ? document.all : document.getElementsByTagName('li');
	for (var e = 0; e < all.length; e++) {
		if(all[e].className.indexOf("new-comment") > -1)
			window.setTimeout(document.forms.tagadderform.submit(),2000);
	}
  }
  
  function highlight_group() {
  	if (window.location.href.indexOf("in/pool") > -1) {
  	     return;
  	     }
  	if (done_yet==0) {
  		document.getElementById('context-link-pool-1822492__at__N20').click();
  		F.actionQueue.queue_click('context-link-pool-1822492__at__N20');
  		done_yet=1;
  	}
  }
  
  function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
  }
  
  

  var chucks=['chuck','chuck2','chuck3','chuck4','chuck5','chuck6','chuck7','chuck8','chuck9','chuck10','chuck11','chuck12','chuck13','chuck14','chuck15'];
  var cheers=['cheers','cheers2','cheers3','cheers4','cheers5','cheers6','cheers7','cheers8','cheers9','cheers10','cheers11','cheers12','cheers13','cheers14','cheers15'];
  var att = '';
 // only execute for photo pages that are in the Delete Me! pool context
if ((document.getElementById('context-pool-1822492__at__N20')) || (document.getElementById('contextDiv_pool1022390@N23'))) {
    // how many chucks and cheers are there?
	var all = document.all ? document.all : document.getElementsByTagName('a');
	for (var e = 0; e < all.length; e++) {
		if (all[e].title == 'Added by You') {
			if(all[e].href.indexOf('chuck') > -1 || all[e].href.indexOf('cheers') > -1)
				setInterval(highlight_group,2000);
		}
		if (all[e].getAttribute('data-tag')) {
			att=all[e].getAttribute('data-tag');
			if (att.indexOf('chuck')>-1) {
				if (att=='chuck1')
					att='chuck';
				chucks=removeA(chucks,att);
			}
			if (att.indexOf('cheers')>-1) {
				if (att=='cheers1')
					att='cheers';
				cheers=removeA(cheers,att);
			}
		}
	}

	mxcheers=cheers[0];
	mxchuck=chucks[0];
 
    // construct the buttons
	var chuck= document.getElementsByName('chuck');
	var buttons = document.createElement('p');
	//buttons.innerHTML = "HI!!!"
    buttons.innerHTML = "<div class='buttons'><p><input type='button' name='chuck' class='Butt' style=\"background-color: #FF0000;\" value='chuck' onClick='document.forms.tagadderform.tag.value=\""+mxchuck+"\\n\";this.form.message.value+=\"\\n-Voted "+mxchuck+" (from the <a href=http://www.flickr.com/groups/the_pig_sty/pool>The Pig Sty</a> group)\";'>" +'&nbsp;&nbsp;&nbsp;&nbsp; OR &nbsp;&nbsp;&nbsp;&nbsp;' + "<input type='button' name='cheers' class='Butt' value='cheers' style=\"background-color: #00FF00; font-size: 75%;\" onClick='document.forms.tagadderform.tag.value=\""+mxcheers+"\";this.form.message.value+=\"\\n-Voted "+mxcheers+" (from the <a href=http://www.flickr.com/groups/the_pig_sty/pool>The Pig Sty</a> group)\";'></p></div>";
    // place them
    var place = document.getElementsByName('preview');
    if (place[0]) {
	  if (!chuck [0]) 
	      place[0].parentNode.insertBefore(buttons,place[0]);
	  setInterval(check_for_tag,2000);
    }
  }
}
)();