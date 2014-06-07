// ==UserScript==
// @name           The Developing Tank voting buttons
// @namespace      http://www.flickr.com/photos/joshjohnson
// @description    voting buttons for The Developing Tank
// @include        http://*.flickr.com/*
// ==/UserScript==
// originally by j / f / photos for The IceBox (http://www.flickr.com/photos/good-karma)
//
// updated by Josh_Wolf (http://www.flickr.com/photos/joshjohnson)

(function() {
 // only execute for photo pages that are in The Developing Tank
  var mxrewind = 1;
  var mxadvance = 1;
  if ((document.getElementById('context-pool-2030923__at__N22')) || (document.getElementById('contextDiv_pool2030923@N22'))) {

   // how many advances and rewinds are there?
   var p = document.body.innerHTML.match(/Y\.PhotoTags\.addTag\('(.+?)'/g);
   if(p)
		for (i=0; i < p.length; i++) {
		   	if (p[i].substr(20,6)=='rewind') { mxrewind=mxrewind + 1; };
		   	if (p[i].substr(20,7)=='advance') { mxadvance=mxadvance + 1; };
		}

     // no number added for first tag
    if (mxadvance==1) {mxadvance='';}
    if (mxrewind==1) {mxrewind='';}
    // construct the buttons
    var buttons = document.createElement('p');
    buttons.innerHTML = "<div class='buttons'><p><input type='button' name='delete' class='Butt' style=\"background-color: #FF0000;\" value='REWIND' onClick='document.forms.tagadderform.tag.value=\"rewind"+mxrewind+"\";this.form.message.value+=\"\\nVoted rewind"+mxrewind+" for <a href=http://www.flickr.com/groups/thedevelopingtank/>The Developing Tank</a>\";document.tagadderform.elements[2].click();'>" +
      '&nbsp;&nbsp;&nbsp;&nbsp; OR &nbsp;&nbsp;&nbsp;&nbsp;'+
      "<input type='button' name='save' class='Butt' value='ADVANCE' style=\"background-color: #00FF00;\" onClick='if(confirm(\"Are you sure this is a keeper?\")) { document.forms.tagadderform.tag.value=\"advance"+mxadvance+"\";this.form.message.value+=\"\\nVoted advance"+mxadvance+" for <a href=http://www.flickr.com/groups/thedevelopingtank/>The Developing Tank</a>\";document.tagadderform.elements[2].click(); }'></p></div>";
    // place them
    var place = document.getElementsByName('preview');
    if (place[0]) {
      place[0].parentNode.insertBefore(buttons,place[0]);
    }
  }
})();