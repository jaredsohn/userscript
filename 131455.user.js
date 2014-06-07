// ==UserScript==
// @name           The Boat voting buttons
// @namespace      http://www.flickr.com/photos/28372013@N07
// @description    voting buttons for The Boat
// @include        http://*.flickr.com/*
// @version        1.0.4
// ==/UserScript==
// originally by Kai Schreiber for DeleteMe! (http://www.genista.de/kai)
//
// updated by Robert_Edwards / photos (http://www.flickr.com/photos/28372013@N07)

(function() {
 // only execute for photo pages that are in The Boat pool context
  var mxsink = 1;
  var mxswim = 1;
  if ((document.getElementById('context-pool-1824447__at__N25')) || (document.getElementById('contextDiv_pool1824447__at__N25'))) {

   // how many swims and sinks are there?
   var p = document.body.innerHTML.match(/Y\.PhotoTags\.addTag\('(.+?)'/g);
   if(p)
		console.log('Found tags');
                for (i=0; i < p.length; i++) {
                        console.log('Tag: '+p[i]+', '+p[i].substr(20,4));
		   	if (p[i].substr(20,4)=='sink') { mxsink=mxsink + 1; };
                        console.log('mxsink='+mxsink);  
		   	if (p[i].substr(20,4)=='swim') { mxswim=mxswim + 1; };
                        console.log('mxswim='+mxswim);
		}

     // no number added for first tag
    if (mxswim==1) {mxswim='';}
    if (mxsink==1) {mxsink='';}
    // construct the buttons
    var buttons = document.createElement('p');
    buttons.innerHTML = "<div class='buttons'><p><input type='button' name='delete' class='Butt' style=\"background-color: #FF0000;\" value='SINK'  onClick='debugger;document.forms.tagadderform.tag.value=\"sink"+mxsink+"\";var yconf=eval(\"yconf=document.body.innerHTML.match(/{\\\"flickr\\\":{\\\"flags\\\":(.*}}};)/g)[0]\");console.log(\"yconf=\"+yconf);YUI(yconf).use(\"photo\",\"photo-tags\", function (Y){ Y.PhotoTags.tagrs_addTag(Y.photo.getCurrentPhoto().get(\"id\"),\"test\")});document.getElementById(\"addtagbox\").focus();var evt = document.createEvent(\"TextEvent\");"+"evt.initTextEvent(\"textInput\", true, true, null, String.fromCharCode(13)+\"\\r\\n\", 9, \"en-US\");"+"document.getElementById(\"addtagbox\").dispatchEvent(evt);this.form.message.value+=\"\\n-Voted sink"+mxsink+" (from <a href=http://www.flickr.com/groups/1824447@N25/>The Boat</a>)\";'>"+
	"&nbsp;&nbsp;&nbsp;&nbsp; OR &nbsp;&nbsp;&nbsp;&nbsp;"+
	"<input type='button' name='save' class='Butt' value='SWIM' style=\"background-color: #00FF00; \" onClick='if(confirm(\"you want THIS to swim??\")) { document.forms.tagadderform.tag.value=\"swim"+mxswim+"\";this.form.message.value+=\"\\n-Voted swim"+mxswim+" (from <a href=http://www.flickr.com/groups/1824447@N25/>The Boat</a>)\";document.tagadderform.elements[2].click(); }'></p><p>REMEMBER:  SINK is the default!</p></div>";
    // place them
    var place = document.getElementsByName('preview');
    if (place[0]) {
      place[0].parentNode.insertBefore(buttons,place[0]);
    }
  }
})();