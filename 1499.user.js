// ==UserScript==
// @name            Flickr Group Promotion Tool
// @description     Adds a select box with pre written comments, inviting the photo owner and viewers to join your groups.
// @author          Stephen Fernandez aka Steeev http://steeev.f2o.org/mt/ http://steeev.f2o.org
// @namespace       http://steeev.f2o.org/flickr
// @include         http://www.flickr.com/photos/*
// @include         http://flickr.com/photos/*
// @version         0.2 (13-Apr-06)
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr Group Promotion Tool", and click Uninstall.
//
// --------------------------------------------------------------------

/*
Additional Info: you can edit the list of groups in the source code, remember to put in the correct URL for the group and also to add the group name.
*/

//window.addEventListener("load", function() { initflickrgroupinviter() }, false);//.user.js

//function initflickrgroupinviter(theform) {

  //initialise comments list
  var commentarr = new Array();

  // you can edit and add as many groups as you want in the list below, its important to keep the same formatting though,
  // the template you need to conform to is as follows commentarr.push("your message goes here <a href=/groups/yourgroupnameurl/>Your group name</a> Rest of message here.");
  commentarr.push("Cool pic! Please consider adding it to the <a href=/groups/handsignals>Hand Signals + Gestures</a> Group. Cheers! :)");
  commentarr.push("Cool pic! Please consider adding it to the <a href=/groups/bodylanguage>Body Language</a> Group. Cheers! :)");
  commentarr.push("Cool pic! Please consider adding it to the <a href=/groups/crudephotoshopping>Crude PhotoShopping</a> Group. Cheers! :)");
  commentarr.push("Cool pic! Please consider adding it to the <a href=/groups/mutants>Mutants</a> Group. Cheers! :)");
  commentarr.push("Cool pic! Please consider adding it to the <a href=/groups/pstennis>PhotoShop Tennis</a> Group. Cheers! :)");


  commentarr.sort();

/*
  var superlist="Brilliant,Awesome,Excellent,Wonderful,Cool,Amazing,Superb,Magnificent";
  var superarr=superlist.split(',');
  superarr.sort();

  var medialist="Photo,Photograph,Image,Pic,Picture,Capture,Shot,Snap,Montage,Collage,Portrait,Landscape";
  var mediaarr=medialist.split(',');
  mediaarr.sort();

*/
  var w;
  if (unsafeWindow) 
	w=unsafeWindow;
  else
	w=window;

  w.addcomment=function(theform) {
  //alert(theform.sfcomment.options[theform.sfcomment.selectedIndex].value);
  allTextAreas = document.evaluate(
    '//textarea',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
  for (var i = 0; i < allTextAreas.snapshotLength; i++) {
    thisTextArea = allTextAreas.snapshotItem(i);
    if (thisTextArea.getAttribute('name')=='message')
      //thisTextArea.setAttribute('textContent');
      thisTextArea.value=theform.sfcomment.options[theform.sfcomment.selectedIndex].value;
    }
  }

arse=document.createElement('span');
autocommenter="&nbsp;<form name='sfcommentform'>";

/*
autocommenter+=<select name='sfsuper'>";
for (i=0;i<superarr.length;i++) {
  autocommenter+='<option>' + superarr[i];
}
autocommenter+="</select>";

autocommenter+="<select name='sfmedia'>";
for (i=0;i<mediaarr.length;i++) {
  autocommenter+='<option>' + mediaarr[i];
}
autocommenter+="</select>";
*/

autocommenter+="Invite to:<select name='sfcomment'>";
for (i=0;i<commentarr.length;i++) {
  begstr=commentarr[i].indexOf('>');
  endstr=commentarr[i].indexOf('<',begstr);
  //alert(begstr);  //alert(endstr);  //alert(commentarr[i].substr(begstr,endstr));
  autocommenter += '<option value="' + commentarr[i].replace('<','&lt;').replace('>','&gt;')+ '">' + commentarr[i].substr(begstr+1,(endstr-begstr)-1) ;
}

autocommenter += "</select><input class='butt' type='button' value='Add Comment' onclick='addcomment(document.forms.sfcommentform);></form>";
arse.innerHTML=autocommenter;
var allLinks, thisLink;
allLinks = document.evaluate(
    '//h3',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
    // do something with thisLink
    if (thisLink.textContent=='Add your comment')
       //thisLink.parentNode.appendChild(arse);
       thisLink.parentNode.insertBefore(arse, thisLink.nextSibling);
}

//};