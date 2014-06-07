// ==UserScript==
// @name           Flickr : Online Photo Editor
// @description    Adds a button to the photo toolbar that lets you edit the image online then reupload it to Flickr
// @version        1.1
// @author         Stephen Fernandez aka steeev http://steeev.f2o.org http://flickr.com/photos/steeev
// @namespace      http://steeev.f2o.org/flickr
// @include        http://www.flickr.com/photos*
// @include        http://flickr.com/photos*
// @include        http://www.flickr.com/tools/uploader_edit.gne?*
// @include        http://flickr.com/tools/uploader_edit.gne?*
// ==/UserScript==


/*
 Installation
 ------------
 This is a Greasemonkey user script.

 To install, you need FireFox  http://www.mozilla.org/firefox and the firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
 Install the Greasemonkey extension then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Flickr : Online Photo Editor", and click Uninstall.

 --------------------------------------------------------------------

 Usage Instructions
 ------------------
 This script adds an "Edit" button above photos on Flickr.com. Clicking it lets you edit that image online.
 you can choose which online image editor you want to use, either preloadr.com or snipshot.com
 the default editor is preloadr.com, you can change it to snipshot.com by going to the tools menu in firefox
 then selecting "User Script Commands" then "Switch Default Online Image Editor"

 Changelog
 ---------
 v1.0 14-jUl-06 initial release
 v1.1 14-jul-06 added a menu command to let u change the default editor
*/


(function () {

var switcheditor=function () {
 if (confirm('Do you want to switch between using SNIPSHOT + PRELOADR as the default editor?') ) {
   if (GM_getValue('defaultEditor')=='SNIPSHOT') {
     GM_setValue('defaultEditor','PRELOADR');
   }
   else 
     GM_setValue('defaultEditor','SNIPSHOT');
 defaultEditor= GM_getValue('defaultEditor');
 alert('The default online image editor has been changed to' + defaultEditor);
 stsimg.setAttribute('title','Edit photo at ' + defaultEditor);
 }
}

if (GM_getValue('defaultEditor','')=='')
  GM_setValue('defaultEditor','PRELOADR');

defaultEditor= GM_getValue('defaultEditor');
 
GM_registerMenuCommand("Switch default online image editor", switcheditor);


if (((location.href.match(/http:\/\/www.flickr.com\/photos\//)) || (location.href.match(/http:\/\/flickr.com\/photos\//))) && location.href.split('/')[5]){

 createURL=function() {
    picid=location.href.split('\/')[5]
    GM_setValue('title',unsafeWindow.global_photos[picid].title);
    GM_setValue('desc',unsafeWindow.global_photos[picid].description);
    GM_setValue('tags',unsafeWindow.global_photos[picid].tags_rawA.join(' '));

    if (defaultEditor=='SNIPSHOT') {
      baseURL='http://open.snipshot.com/import?url=';
      photoid=location.href.split('/')[5];
      pserver=eval("unsafeWindow.global_photos['" + photoid + "'].server");
      psecret=eval("unsafeWindow.global_photos['" + photoid + "'].secret");
      photourl=baseURL+escape("http\:\/\/static.flickr.com/" + pserver + "\/" + photoid + "\_" + psecret + "_o.jpg");
      return photourl;
      }
    else
      return 'http://preloadr.com/edit/' +picid;
  }


  var imgoffsrc="data:image/gif;base64,R0lGODlhMQAYAJEAAP%2F%2F%2F8DAwHt9e6CAgCH5BAAAAAAALAAAAAAxABgAQAJ5hI%2Bpy70BYzwSuutqfbgrDW7eCEjGdAxmIrSAYMDvITPhHZD6zmdaCupdcLnSCtGCJWOupe24UBWRTdfLWnsQE1Oh9wsOD4k%2FMYJcNp%2BCFJHaGGqj3iapxWDvxmj7Wf95V6Jgp1Ajc8jXkBalJ7bF9bb2eBJZaXlZAAA7";
  var imgoversrc="data:image/gif;base64,R0lGODlhMQAYAKIAAAAAAMDAwKCAgICAwKCgpP%2F%2F%2FwAAAAAAACH5BAAAAAAALAAAAAAxABgAQAOoWLrc%2FjAussK4%2BNYcpHeUYmXZ031oERYj6WJn6q2tcsWFADtAXwAK4G8hZNACyKRyiZR9Vs7oc0Na6Eg4aYP2utl2jR5QHPSRjdRBtqFbk89wULrbWGsV0Lt%2Bsu%2FzRUyBSn5%2FLF1ddndcLgxYhHhzVV9ej4sdV2pWYAxFQp5EciIYFQ5XbqBDqaqFLRoRAolai3R1jyqRLwyxUnm2TgTAwcLDxMXGx8MJADs%3D";
  var imgdownsrc="data:image/gif;base64,R0lGODlhMQAYAKIAAAAAAMDAwOBAQKCAgKCgpP%2F%2F%2FwAAAAAAACH5BAAAAAAALAAAAAAxABgAQAOmGLTc%2FjDKVkoQOONqdeBgKI4cUV2aNn5k65pdKntuPcKoUGFsNWQ9DmBYAFSMReHtFGg6n9CmbVqiWq%2FVmMonC2KX2u4OKBoazUciOoQjt37eopooRyLZp9mWE%2F%2BCYH6BYIKEWVGHUIV4YXo0ioYzICl9gm16HI6PBZYfPzwcngJxd3ZHSiKWOicinqOnpaaoeXsjA5SBqZEht365l3yaFYDBxMUuCQA7";
 
  var sendtosnipshot = unsafeWindow.document.createElement("a");
  var stsimg = unsafeWindow.document.createElement("img");
  stsimg.src=imgoffsrc;
  stsimg.onmouseover = function() { stsimg.src = imgoversrc; }
  stsimg.onmouseout = function() { stsimg.src = imgoffsrc; }
  stsimg.onmousedown = function() { stsimg.src = imgdownsrc; }
  stsimg.setAttribute('title','Edit photo at ' + defaultEditor);
  stsimg.onclick = function() { void(window.location.href=createURL());} 
  sendtosnipshot.appendChild(stsimg);
  sendtosnipshot.href = 'javascript:;'//createURL(); 

  insertpoint=document.getElementById('button_bar');
  insertpoint.appendChild(sendtosnipshot);

}


if (location.href.match(/\/tools\/uploader\_edit\.gne/)) {

  restoremetalink=document.createElement('a');
  restoremetalink.setAttribute('href','javascript:;');
  restoremetalink.setAttribute('onclick','bringitall()');
  restoremetalink.textContent='Restore Title,Description+Tags after editing at Snipshot.com';
  restoremetalink.setAttribute('title','Click here to restore the title, tags and description of your image if you have just edited it at snipshot.com');

  daforms=document.getElementsByTagName('form');
  for(i=0;i<daforms.length;i++) {
    if(daforms[i].getAttribute('action')=='/photos_upload_save.gne') {
      daform=daforms[i];
      daform.parentNode.insertBefore(restoremetalink, daform);
      break;
    }
  }


  unsafeWindow.bringit=function(mode) {
    if (mode=='tags') {
      //alert(GM_getValue('tags'));
      document.getElementById('tagsimp').setAttribute('value',GM_getValue('tags') + ' ' + document.getElementById('tagsimp').getAttribute('value'));
    } 
    if (mode=='desc') {
      //alert(GM_getValue('desc'));
      document.getElementById('descimp').textContent=GM_getValue('desc') + '\n\n' + document.getElementById('descimp').textContent;
    }
    if (mode=='title') {
      document.getElementById('titleimp').setAttribute('value',GM_getValue('title'));
    }
  }

  unsafeWindow.bringitall=function() {
    unsafeWindow.bringit('tags');
    unsafeWindow.bringit('title');
    unsafeWindow.bringit('desc');
  }

  imps=document.getElementsByTagName('input');
  for (i=0;i<imps.length;i++) {
    if (imps[i].getAttribute('name') &&  imps[i].getAttribute('name').match(/^title_/)) {
      imps[i].setAttribute('id','titleimp');
    }
    if (imps[i].getAttribute('name') && imps[i].getAttribute('name').match(/^tags_/)) {
      imps[i].setAttribute('id','tagsimp');
    }
  }
  txs=document.getElementsByTagName('textarea');
  for (i=0;i<txs.length;i++) {
    if (txs[i].getAttribute('name') &&  txs[i].getAttribute('name').match(/^description_/)) {
      txs[i].setAttribute('id','descimp')
    }
  }


}


}) ();