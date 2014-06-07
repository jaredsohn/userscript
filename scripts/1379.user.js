/*
// ==UserScript==
// @name          Flickr Titles + Descriptions Batch Tools
// @description	  Adds tools for batch editing titles and descriptions in the organise page
// @version       1.8  (2008-06-18)
// @author        Steeev http://steeev.f2o.org http://flickr.com/photos/steeev
// @contributor	  scragz http://scragz.com/  (he fixed the script to work with ff1.5+gm0.6.4)
// @namespace     http://steeev.f2o.org/flickr/
// @include       http://flickr.com/photos/organize*
// @include       http://www.flickr.com/photos/organize*
// @include       http://www.flickr.com/photos/upload/done/
// @include       http://flickr.com/photos/upload/done/
// @include       http://www.flickr.com/tools/uploader_edit.gne?*
// @include       http://flickr.com/tools/uploader_edit.gne?*


 (c) 2008 Stephen Fernandez - Excellatronic Communications
 
 Disclaimer
 -------------
 Please note that this software is provided free of charge and comes with no warranty whatsoever, any usage of this script is at your own risk, 
 i cannot be held responsible for anything bad that happens regarding usage of this script.

 --------------------------------------------------------------------

 This is a Greasemonkey user script.

 To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called 
 Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 There will be a button in the top right hand corner of the page saying "Install User Script".
 Click the button and accept the default configuration to install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Flickr Titles + Descriptions Batch Tools", and click Uninstall.

 --------------------------------------------------------------------

 Title:
 ------
 Flickr Titles + Descriptions Batch Tools

 Description:
 ------------
 This script adds 7 new tools to the photos_batch.gne page
 1) clicking "append text to title" link, pops up a user prompt and then appends the entered text to all titles in batch
 2) clicking "append text to description" link, pops up a user prompt and then appends the entered text to all descriptions in batch
 3) clicking "down arrow graphic" next to first title input box, copies that title to all other images in batch
 4) clicking "down arrow graphic" next to first description input box, copies that description to all other images in batch
 5) clicking "down arrow graphic" next to first tags input box, copies those tags to all other images in batch
 6) Clicking Search + Replace Titles, asks you to enter the text you wish to replace, and the text that you wish to replace it with,it then performs the replacement.
 7) Clicking Search + Replace Descriptions, asks you to enter the text you wish to replace, and the text that you wish to replace it with, it then performs the replacement.

 If the down arrow graphics do not show up when the page has finished loading, click the "Show Arrows" link

 N.B once you have finished editing the titles, descriptions and tags, you need to click the save button at the bottom
 to save the changes you have made

 Example Scenario
 ----------------
 After the script is installed, go to your photostream page, then click the "edit as batch" link
 you should now see the additional tools that this script provides. If you wanted to make all the titles
 of the images the same, you could edit the title of the first image, then click the down arrow next to
 it, and that will copy that title to all the other images in the batch, you can do the same for the
 descriptions and tags. You can also simply append some text to all titles or descriptions, using the append links
 at the top of the page.


 Changelog
 ---------
 2005-??-?? Steeev released initial version
 2006-03-26 Scragz fixed script for ff1.5+gm0.6.4 compatibility
 2006-05-04 v1.2 Steeev added search and replace functions
 2006-05-30 v1.3 Steeev made script compatible with Flickr Gamma
 2006-06-12 v1.4 Steeev made bugfix (save button wasnt saving changes anymore)
 2006-07-03 v1.5 Steeev added search+replace "titles+descriptions" function
 2006-07-28 v1.6 Steeev made maintenance bugfix
 2007-05-23 v1.7 Steeev fixed bug - the replace function only replaced the first instance of any word in a textarea/box, it now replaces all instances in each textarea/box.
 2008-06-18 v1.8 Steeev got the script working on 2 of the upload batch edit pages ( uploader_edit.gne + /upload/done/ )

 DONATE
 ------
 If you wish to thank me for all the work i have put into writing/testing/supporting this script,  
 and would like to support further updates and bug fixes, you can send me a few pounds/dollars/euros etc
 via PayPal, my paypal donation link is http://steeev.freehostia.com/donate/ 
 or else you might like to buy me something from my amazon wishlist http://www.amazon.co.uk/gp/registry/1LAD1VZGDF3XS :)

 miscellaneous script notes
 --------------------------
 example url for uploader edit page http://www.flickr.com/tools/uploader_edit.gne?ids=2587787355,2588622690,2588622778,
 input names follow these patterns:
 title_[picid]
 description_[picid]
 tags_[picid]

*/


// ==/UserScript==

// wrap the entire functionality in an anonymous function
if(location.href.match(/flickr\.com\/photos\/organize/)) {

(function() {

//one_set\d{1,100}_edit_together_photos_div

var setcontainerid=''
var allonesetids=document.getElementById('one_set*');

if(allonesetids) 
  for (i=0;i<allonesetids.length;i++) {
    if ((allonesetids[i].getAttribute('id')) && allonesetids[i].getAttribute('id').match(/one_set\d{1,100}_edit_together_photos_div/)) {
      setcontainerid=allonesetids[i].getAttribute('id');
      break;
      }
  }

if(document.getElementById('batch_edit_together_photos_div')||setcontainerid) {

//unsafeWindow._ge('bad_browser_div').style.display = 'block';

var downarrow = '<img style="padding-top 10px; padding-left 5px;" align="top" width="16" height="16" src="data:image/gif,GIF89a%10%00%10%00%80%01%00%00%00%00%FF%FF%FF!%F9%04%01%00%00%01%00%2C%00%00%00%00%10%00%10%00%00%02%20%8C%8Fy%C0%ED%9C%DESABZ\'6n%A3%EBq%C0fib%09%9E%16U%92%26%D6%85%99%1C%16%00%3B"/>';
//var appendtotitlelink = '<a href="" onclick="edittitles(\'append\',prompt(\'Enter the text you wish to append to all titles in batch\'));return false;">Enter text to append to all Titles</a>';
//var appendtodesclink = '<a href="" onclick="editdesc(\'append\',prompt(\'Enter the text you wish to append to the all descriptions in batch\'));return false;">Enter text to append to    all Descriptions</a>';

var innitlink_clickHandler = function(event) {
  innitpage();
  event.preventDefault();
}

var innitlink = document.createElement("a");
innitlink.setAttribute("href", "");
innitlink.addEventListener('click', innitlink_clickHandler, true);
innitlink.innerHTML = 'Show Arrows';


var appendtotitlelink_clickHandler = function(event) {
  edittitles('append', prompt('Enter the text you wish to append to the all titles in batch'));
  event.preventDefault();
}
var appendtotitlelink = document.createElement("a");
appendtotitlelink.setAttribute("href", "");
appendtotitlelink.addEventListener('click', appendtotitlelink_clickHandler, true);
appendtotitlelink.innerHTML = 'Append text to all Titles';

var appendtodesclink_clickHandler = function(event) {
  editdesc('append', prompt('Enter the text you wish to append to the all descriptions in batch'));
  event.preventDefault();
}
var appendtodesclink = document.createElement("a");
appendtodesclink.setAttribute("href", "");
appendtodesclink.addEventListener('click', appendtodesclink_clickHandler, true);
appendtodesclink.innerHTML = 'Append text to all Descriptions';


var searchandreplacetitlelink_clickHandler = function(event) {
  searchandreplace("Title");
  event.preventDefault();
}

var searchandreplacetitlelink = document.createElement("a");
searchandreplacetitlelink.setAttribute("href", "");
searchandreplacetitlelink.addEventListener('click', searchandreplacetitlelink_clickHandler, true);
searchandreplacetitlelink.innerHTML = 'Search + Replace Titles';

var searchandreplacedesclink_clickHandler = function(event) {
  searchandreplace("Description");
  event.preventDefault();
}

var searchandreplacedesclink = document.createElement("a");
searchandreplacedesclink.setAttribute("href", "");
searchandreplacedesclink.addEventListener('click', searchandreplacedesclink_clickHandler, true);
searchandreplacedesclink.innerHTML = 'Search + Replace Descriptions';

/* new stuff */
var searchandreplacetitlesndesclink_clickHandler = function(event) {
  searchandreplace("Titles and Description");
  event.preventDefault();
}

var searchandreplacetitlesndesclink = document.createElement("a");
searchandreplacetitlesndesclink.setAttribute("href", "");
searchandreplacetitlesndesclink.addEventListener('click', searchandreplacetitlesndesclink_clickHandler, true);
searchandreplacetitlesndesclink.innerHTML = 'Search + Replace Titles+Descriptions';
/* new stuff */


var toolsmenu = document.createElement("span");
toolsmenu.id = 'btdtoolsmenu';

toolsmenu.innerHTML="&nbsp;&nbsp;";
toolsmenu.appendChild(searchandreplacetitlesndesclink);
toolsmenu.appendChild(document.createTextNode(' | '));
toolsmenu.appendChild(searchandreplacetitlelink);
toolsmenu.appendChild(document.createTextNode(' | '));
toolsmenu.appendChild(searchandreplacedesclink);
toolsmenu.appendChild(document.createTextNode(' | '));
toolsmenu.appendChild(appendtotitlelink);
toolsmenu.appendChild(document.createTextNode(' | '));
toolsmenu.appendChild(appendtodesclink);
toolsmenu.appendChild(document.createTextNode(' | '));
toolsmenu.appendChild(innitlink);


var copytagsbutt_clickHandler = function(event) {
  copytagstoall();
  event.preventDefault();
}
var copytagsbutt = document.createElement("a");
copytagsbutt.setAttribute("href", "");
copytagsbutt.setAttribute("title", "Copy these Tags to all images in batch");
copytagsbutt.addEventListener('click', copytagsbutt_clickHandler, true);
copytagsbutt.innerHTML = downarrow;

var copytitlesbutt_clickHandler = function(event) {
  edittitles('copytoall', '');
  event.preventDefault();
}

var copytitlesbutt = document.createElement("a");
copytitlesbutt.setAttribute("href", "");
copytitlesbutt.setAttribute("title", "Copy this Title to all images in batch");
copytitlesbutt.addEventListener('click', copytitlesbutt_clickHandler, true);
copytitlesbutt.innerHTML = downarrow;

var copydescsbutt_clickHandler = function(event) {
  editdesc('copytoall', '');
  event.preventDefault();
}
var copydescsbutt = document.createElement("a");
copydescsbutt.setAttribute("href", "");
copydescsbutt.setAttribute("title", "Copy this Description to all images in batch");
copydescsbutt.addEventListener('click', copydescsbutt_clickHandler, true);
copydescsbutt.innerHTML = downarrow;

var getElementsByClassName = function(clsName)
{
  var elems = document.getElementsByTagName("*");
  for ( var cls, i = 0; ( elem = elems[i] ); i++ ) {
    if ( elem.className == clsName ) {
      arr = elem;
    }
  }
  if (typeof(arr) != 'undefined')
    return arr;
  else
    return 'undefined';
}

var edittitles = function(command, text) {
  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('input');
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if ((thisTextarea.getAttribute('id')) && thisTextarea.getAttribute('id').match(/^together_title/)) {
      if (command == 'append')
        if (text) thisTextarea.value += ' ' + text;
          if (command == 'replace')
            thisTextarea.value=text;
      if (command == 'copytoall') {
        copytitletoall(thisTextarea.value);
        break;
      }
    }
  }
  enablesavebutt();
}

var editdesc = function(command, text) {
  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('textarea');
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if (command == 'append')
      if (text) thisTextarea.value = thisTextarea.value + '\n\n' +text;
        if (command == 'replace')
          thisTextarea.value=text;
    if (command == 'copytoall') {
      copydesctoall(thisTextarea.value);
      break;
    }
  }
  enablesavebutt(); 
  return false;
}

var searchandreplace = function(command) {

  var repthis=prompt('Enter the text in the ' + command + 's you wish to replace');
  var reptext=prompt('Enter the replacement text');
  var allTextareas;
  if (command=='Description') {
    allTextareas = document.getElementsByTagName('textarea');
    for (var i = 0; i < allTextareas.length; i++) {
      allTextareas[i].value = allTextareas[i].value.replace(repthis,reptext,'g');
    }
  }
  if (command=="Title") {
    allTextareas = document.getElementsByTagName('input');
    for (var i = 0; i < allTextareas.length; i++) {
      if ((allTextareas[i].getAttribute('id')) && allTextareas[i].getAttribute('id').match(/^together_title/)) {
        allTextareas[i].value = allTextareas[i].value.replace(repthis,reptext,'g');
      }
    }
  }
  if (command=="Titles and Description") {
    allTextareas = document.getElementsByTagName('input');
    for (var i = 0; i < allTextareas.length; i++) {
      if ((allTextareas[i].getAttribute('id')) && allTextareas[i].getAttribute('id').match(/^together_title/)) {
        allTextareas[i].value = allTextareas[i].value.replace(repthis,reptext,'g');
      }
    }
    allTextareas = document.getElementsByTagName('textarea');
    for (var i = 0; i < allTextareas.length; i++) {
      allTextareas[i].value = allTextareas[i].value.replace(repthis,reptext,'g');
    }
  }


  enablesavebutt();
  return false;
}

var copytitletoall = function(text) {
  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('input');
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if ((thisTextarea.getAttribute('id')) && thisTextarea.getAttribute('id').match(/^together_title/)) {
      thisTextarea.value = text;
    }
  }
  enablesavebutt();
  return false;
}

var copydesctoall = function(text) {
  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('textarea');
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    thisTextarea.value=text;
  }
  enablesavebutt();
  return false;
}

var copytagstoall = function() {
  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('input');
  foundtags = 0;
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if ((thisTextarea.getAttribute('id')) && thisTextarea.getAttribute('id').match(/^together_tags/)) {
      if (!foundtags) {
        taglist=thisTextarea.value;
        foundtags=1;
      } 
      else {
          thisTextarea.value=taglist;
      }
    }
  }
  enablesavebutt();
  return false;
}

var enablesavebutt=function () {
  //document.getElementById('batch_edit_together_form_save_button').setAttribute('class','Butt');
  //document.getElementById('batch_edit_together_form_save_button').removeAttribute('disabled');


  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('textarea');
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if((thisTextarea.getAttribute('id')) && thisTextarea.getAttribute('id').replace(/[a-zA-Z_]/g,'')!='')
      unsafeWindow._ge('tabl_mat_batch').together_changed_idsA.push(thisTextarea.getAttribute('id').replace(/[a-zA-Z_]/g,''));
  }
  //alert(unsafeWindow._ge('tabl_mat_batch').together_changed_idsA);

  // begin eliminate duplicates in the array
  ary=unsafeWindow._ge('tabl_mat_batch').together_changed_idsA
  ary.sort();
  var x, y=0, len = ary.length;
  for (x=1; x<len; x++) {
    if (ary[x] != ary[y]) y++;
    if (y < x) ary[y] = ary[x];
  }
  ary.length = y + 1;
  //alert(ary.join(", "));
  unsafeWindow._ge('tabl_mat_batch').together_changed_idsA=ary;
  // end eliminate duplicates in the array

  unsafeWindow.F.changes_were_made("together form has changed");
  unsafeWindow._ge('tabl_mat_batch').together_enable_save_button();
}


if (!setcontainerid)
  bdesc = document.getElementById('candy_batch_together_button_bar');
else
  bdesc = document.getElementById('candy_one_set_together_button_bar');
if (bdesc) {
  toolsmenu.setAttribute('class', 'candy_button_bar');
  bdesc.parentNode.insertBefore(toolsmenu, bdesc.nextSibling);
}

innitpage = function() {
  foundtitle = 0;
  foundtag = 0;
  founddesc = 0;
  inputs = document.getElementsByTagName('input');
  for (i = 0; i < inputs.length; i++) {
    if ((inputs[i].getAttribute('id')) && inputs[i].getAttribute('id').match(/^together_title/)) {
      if (!foundtag) {
        inputs[i].parentNode.insertBefore(copytitlesbutt, inputs[i].nextSibling);
        foundtag = 1;
      }
    }
    if ((inputs[i].getAttribute('id')) && inputs[i].getAttribute('id').match(/^together_tags/)) {
      if (!foundtitle) {
        inputs[i].parentNode.insertBefore(copytagsbutt, inputs[i].nextSibling);
        foundtitle = 1;
      }
    }
    if (foundtag && foundtitle)
      break;
  }
  inputs = document.getElementsByTagName('textarea');
  inputs[0].parentNode.insertBefore(copydescsbutt, inputs[0].nextSibling);
}

innitpage();

} //end if we are on the organizer page

// end of the anonymous function
})();

} 

else {

// we must be on one of the upload pages ()
// eg http://flickr.com/tools/uploader_edit.gne* or http://www.flickr.com/photos/upload/done/

(function() {


var downarrow = '<img style="padding-top 10px; padding-left 5px;" align="top" width="16" height="16" src="data:image/gif,GIF89a%10%00%10%00%80%01%00%00%00%00%FF%FF%FF!%F9%04%01%00%00%01%00%2C%00%00%00%00%10%00%10%00%00%02%20%8C%8Fy%C0%ED%9C%DESABZ\'6n%A3%EBq%C0fib%09%9E%16U%92%26%D6%85%99%1C%16%00%3B"/>';
//var appendtotitlelink = '<a href="" onclick="edittitles(\'append\',prompt(\'Enter the text you wish to append to all titles in batch\'));return false;">Enter text to append to all Titles</a>';
//var appendtodesclink = '<a href="" onclick="editdesc(\'append\',prompt(\'Enter the text you wish to append to the all descriptions in batch\'));return false;">Enter text to append to    all Descriptions</a>';

var appendtotitlelink_clickHandler = function(event)
{
  edittitles('append', prompt('Enter the text you wish to append to the all titles in batch'));
  event.preventDefault();
}
var appendtotitlelink = document.createElement("a");
appendtotitlelink.setAttribute("href", "javascript:;");
appendtotitlelink.addEventListener('click', appendtotitlelink_clickHandler, true);
appendtotitlelink.innerHTML = 'Append text to all Titles';

var appendtodesclink_clickHandler = function(event)
{
  editdesc('append', prompt('Enter the text you wish to append to the all descriptions in batch'));
  event.preventDefault();
}
var appendtodesclink = document.createElement("a");
appendtodesclink.setAttribute("href", "javascript:;");
appendtodesclink.addEventListener('click', appendtodesclink_clickHandler, true);
appendtodesclink.innerHTML = 'Append text to all Descriptions';


var searchandreplacetitlendesclink_clickHandler = function(event)
{
  searchandreplace("Title+Desc");
  event.preventDefault();
}
var searchandreplacetitlendesclink = document.createElement("a");
searchandreplacetitlendesclink.setAttribute("href", "javascript:;");
searchandreplacetitlendesclink.addEventListener('click', searchandreplacetitlendesclink_clickHandler, true);
searchandreplacetitlendesclink.innerHTML = 'Search + Replace Titles + Descriptions';


var searchandreplacetitlelink_clickHandler = function(event)
{
  searchandreplace("Title");
  event.preventDefault();
}
var searchandreplacetitlelink = document.createElement("a");
searchandreplacetitlelink.setAttribute("href", "javascript:;");
searchandreplacetitlelink.addEventListener('click', searchandreplacetitlelink_clickHandler, true);
searchandreplacetitlelink.innerHTML = 'Search + Replace Titles';

var searchandreplacedesclink_clickHandler = function(event)
{
  searchandreplace("Description");
  event.preventDefault();
}
var searchandreplacedesclink = document.createElement("a");
searchandreplacedesclink.setAttribute("href", "javascript:;");
searchandreplacedesclink.addEventListener('click', searchandreplacedesclink_clickHandler, true);
searchandreplacedesclink.innerHTML = 'Search + Replace Descriptions';

var toolsmenu = document.createElement("p");
toolsmenu.id = 'btdtoolsmenu';
toolsmenu.appendChild(searchandreplacetitlendesclink);
toolsmenu.appendChild(document.createTextNode(' | '));
toolsmenu.appendChild(searchandreplacetitlelink);
toolsmenu.appendChild(document.createTextNode(' | '));
toolsmenu.appendChild(searchandreplacedesclink);
toolsmenu.appendChild(document.createTextNode(' | '));
toolsmenu.appendChild(appendtotitlelink);
toolsmenu.appendChild(document.createTextNode(' | '));
toolsmenu.appendChild(appendtodesclink);

//toolsmenu.innerHTML = '<div id="btdtoolsmenu"> ' + appendtotitlelink + ' | ' + appendtodesclink + '</div>';

var copytagsbutt_clickHandler = function(event)
{
  copytagstoall();
  event.preventDefault();
}
var copytagsbutt = document.createElement("a");
copytagsbutt.setAttribute("href", "");
copytagsbutt.setAttribute("title", "Copy these Tags to all images in batch");
copytagsbutt.addEventListener('click', copytagsbutt_clickHandler, true);
copytagsbutt.innerHTML = downarrow;

var copytitlesbutt_clickHandler = function(event)
{
  edittitles('copytoall', '');
  event.preventDefault();
}
var copytitlesbutt = document.createElement("a");
copytitlesbutt.setAttribute("href", "");
copytitlesbutt.setAttribute("title", "Copy this Title to all images in batch");
copytitlesbutt.addEventListener('click', copytitlesbutt_clickHandler, true);
copytitlesbutt.innerHTML = downarrow;

var copydescsbutt_clickHandler = function(event)
{
  editdesc('copytoall', '');
  event.preventDefault();
}
var copydescsbutt = document.createElement("a");
copydescsbutt.setAttribute("href", "");
copydescsbutt.setAttribute("title", "Copy this Description to all images in batch");
copydescsbutt.addEventListener('click', copydescsbutt_clickHandler, true);
copydescsbutt.innerHTML = downarrow;

var getElementsByClassName = function(clsName)
{
  var elems = document.getElementsByTagName("*");
  for ( var cls, i = 0; ( elem = elems[i] ); i++ ) {
    if ( elem.className == clsName ) {
      arr = elem;
    }
  }
  if (typeof(arr) != 'undefined')
    return arr;
  else
    return 'undefined';
}

var edittitles = function(command, text) {
  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('input');
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if (thisTextarea.name.match(/^title_/)) {
      if (command == 'append')
        if (text) thisTextarea.value += ' ' + text;
          if (command == 'replace')
            thisTextarea.value=text;
      if (command == 'copytoall') {
        copytitletoall(thisTextarea.value);
        break;
      }
    }
  }
}

var editdesc = function(command, text) {
  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('textarea');
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if (thisTextarea.name.match(/^description_/)) {
      if (command == 'append')
        if (text)
          thisTextarea.value = thisTextarea.value + '\n\n' +text;
      if (command == 'replace')
        thisTextarea.value=text;
      if (command == 'copytoall') {
        copydesctoall(thisTextarea.value);
        break;
      }
    }
  }
  return false;
}

var searchandreplace = function(command) {

  var repthis=prompt('Enter the text in the ' + command + ' you wish to replace');
  if (!repthis) {
    alert('You didnt enter any text!');
    return false;
  }
  var reptext=prompt('Enter the replacement text');

  var allTextareas;
  if (command=='Description' || command=='Title+Desc') {
    allTextareas = document.getElementsByTagName('textarea');
    for (var i = 0; i < allTextareas.length; i++) {
      allTextareas[i].value = allTextareas[i].value.replace(repthis,reptext,'g');
    }
  }
  if (command=="Title" || command=='Title+Desc') {
    allTextareas = document.getElementsByTagName('input');
    for (var i = 0; i < allTextareas.length; i++) {
      if (allTextareas[i].name.match(/^title_/))
        allTextareas[i].value = allTextareas[i].value.replace(repthis,reptext,'g')
    }
  }
  return false;
}

var copytitletoall = function(text) {
  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('input');
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if (thisTextarea.name.match(/^title_/)) {
      thisTextarea.value = text;
    }
  }
  return false;
}

var copydesctoall = function(text) {
  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('textarea');
  for (var i = 0; i < allTextareas.length; i++) {
    if(allTextareas[i].name.match(/^description_/)) {
      thisTextarea = allTextareas[i];
      thisTextarea.value=text;
    }
  }
  return false;
}

var copytagstoall = function() {
  var allTextareas, thisTextarea;
  allTextareas = document.getElementsByTagName('input');
  foundtags = 0;
  for (var i = 0; i < allTextareas.length; i++) {
    thisTextarea = allTextareas[i];
    if (thisTextarea.name.match(/^tags_/)) {
      if (!foundtags) {
        taglist=thisTextarea.value;
        foundtags=1;
      } 
      else {
        thisTextarea.value=taglist;
      }
    }
  }
  return false;
}

if(location.href.match('uploader_edit\.gne'))
  toolsinsertpoint=document.getElementsByTagName('h1')[0];
  
if(location.href.match('upload\/done'))
  toolsinsertpoint=document.getElementsByTagName('h3')[0];
  
if (toolsinsertpoint) {
  toolsmenu.setAttribute('class', 'candy_button_bar');
  toolsinsertpoint.parentNode.insertBefore(toolsmenu, toolsinsertpoint.nextSibling);
}

innitpage = function() {
  foundtitle = 0;
  foundtag = 0;
  founddesc = 0;
  inputs = document.getElementsByTagName('input');
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].name.match(/^title_/)) {
      if (!foundtag) {
        inputs[i].parentNode.insertBefore(copytitlesbutt, inputs[i].nextSibling);
        foundtag = 1;
      }
    }
    if (inputs[i].name.match(/^tags_/)) {
      if (!foundtitle) {
        inputs[i].parentNode.insertBefore(copytagsbutt, inputs[i].nextSibling);
        foundtitle = 1;
      }
    }
  }
  inputs = document.getElementsByTagName('textarea');
  for (i = 0; i < inputs.length; i++) {
    if(inputs[i].name.match(/^description_/)) {
      inputs[i].parentNode.insertBefore(copydescsbutt, inputs[i].nextSibling);
      break;
    }
  }  
}

innitpage();

// end of the anonymous function
})();


} // end of if we are on one of the upload edit pages