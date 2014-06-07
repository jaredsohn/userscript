// ==UserScript==
// @name           Icebox voting buttons
// @namespace      http://www.flickr.com/photos/good-karma
// @description    voting buttons for The Icebox
// @include        http://*.flickr.com/*
// @version        1.0.2
// ==/UserScript==
// originally by Kai Schreiber for DeleteMe! (http://www.genista.de/kai)
//
// updated by j / f / photos (http://www.flickr.com/photos/good-karma)
// thanks to aaronalexa05 (http://www.flickr.com/photos/57103037@N05) 
// and rose_peacock (http://www.flickr.com/photos/rose_peacock) for helping troubleshoot during the great button outage of 2011
// updated by floyka (http://www.flickr.com/photos/floyka) on 2012-08-26 to fix cool/uncool counting. Autotagging is not yet fixed however.

(function() {
 // only execute for photo pages that are in the Icebox pool context
  var mxuncool = 1;
  var mxcool = 1;
  if ((document.getElementById('context-pool-1022390__at__N23')) || (document.getElementById('contextDiv_pool1022390@N23'))) {

   // how many cools and uncools are there?
   var p = document.getElementById("thetags");
   if(p && p.hasChildNodes())
   {
		var c = p.childNodes;
		for (i=0; i < c.length; i++) 
		{
		    var text = c.item(i).textContent.toLowerCase();
		   	if (text.substr(0,6)=='uncool') { mxuncool=mxuncool + 1; };
		   	if (text.substr(0,4)=='cool') { mxcool=mxcool + 1; };
		}
    }
     // no number added for first tag
    if (mxcool==1) {mxcool='';}
    if (mxuncool==1) {mxuncool='';}
    // construct the buttons
    var buttons = document.createElement('p');
    buttons.innerHTML = "<div class='buttons'><p><input type='button' name='delete' class='Butt' style=\"background-color: #FF0000;\" value='UNCOOL' onClick='document.forms.tagadderform.tag.value=\"uncool"+mxuncool+"\";this.form.message.value+=\"\\n-Voted uncool"+mxuncool+" (from <a href=http://www.flickr.com/groups/theicebox/>The Icebox</a>)\";document.tagadderform.elements[2].click();'>" +
      '&nbsp;&nbsp;&nbsp;&nbsp; OR &nbsp;&nbsp;&nbsp;&nbsp;'+
      "<input type='button' name='save' class='Butt' value='COOL' style=\"background-color: #00FF00; font-size: 50%;\" onClick='if(confirm(\"you want to cool THIS??\")) { document.forms.tagadderform.tag.value=\"cool"+mxcool+"\";this.form.message.value+=\"\\n-Voted cool"+mxcool+" (from <a href=http://www.flickr.com/groups/theicebox/>The Icebox</a>)\";document.tagadderform.elements[2].click(); }'></p></div>";
    // place them
    var place = document.getElementsByName('preview');
    if (place[0]) {
      place[0].parentNode.insertBefore(buttons,place[0]);
    }
  }
})();