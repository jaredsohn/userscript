// ==UserScript==
// @name           The Pig Sty voting buttons
// @namespace      http://www.flickr.com/photos/joshjohnson
// @description    voting buttons for The Pig Sty
// @include        http://*.flickr.com/*
// ==/UserScript==
// originally by j / f / photos for The IceBox (http://www.flickr.com/photos/good-karma)
//
// updated by Josh_Wolf (http://www.flickr.com/photos/joshjohnson)

(function() {
 // only execute for photo pages that are in The Pig Sty
  var mxchuck = 1;
  var mxcheers = 1;
  if ((document.getElementById('context-pool-1822492__at__N20')) || (document.getElementById('contextDiv_pool1822492@N20'))) {

   // how many cheers and pukes are there?
   var p = document.body.innerHTML.match(/Y\.PhotoTags\.addTag\('(.+?)'/g);
   if(p)
		for (i=0; i < p.length; i++) {
		   	if (p[i].substr(20,5)=='chuck') { mxchuck=mxchuck + 1; };
		   	if (p[i].substr(20,6)=='cheers') { mxcheers=mxcheers + 1; };
		}

     // no number added for first tag
    if (mxcheers==1) {mxcheers='';}
    if (mxchuck==1) {mxchuck='';}
    // construct the buttons
    var buttons = document.createElement('p');
    buttons.innerHTML = "<div class='buttons'><p><input type='button' name='delete' class='Butt' style=\"background-color: #FF0000;\" value='CHUCK' onClick='document.forms.tagadderform.tag.value=\"chuck"+mxchuck+"\";this.form.message.value+=\"\\nThat&apos;s chuck"+mxchuck+" on <a href=http://www.flickr.com/groups/the_pig_sty/>The Pig Sty</a> floor\";document.tagadderform.elements[2].click();'>" +
      '&nbsp;&nbsp;&nbsp;&nbsp; OR &nbsp;&nbsp;&nbsp;&nbsp;'+
      "<input type='button' name='save' class='Butt' value='CHEERS' style=\"background-color: #00FF00;\" onClick='if(confirm(\"Raise a glass?\")) { document.forms.tagadderform.tag.value=\"cheers"+mxcheers+"\";this.form.message.value+=\"\\n<a href=http://www.flickr.com/groups/the_pig_sty/>The Pig Sty</a> says cheers"+mxcheers+"!\";document.tagadderform.elements[2].click(); }'></p></div>";
    // place them
    var place = document.getElementsByName('preview');
    if (place[0]) {
      place[0].parentNode.insertBefore(buttons,place[0]);
    }
  }
})();