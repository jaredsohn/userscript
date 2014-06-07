// version 0.1 2006-01-15
// Copyright (c) 2006, Jeremy Dunck
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           Blogger comment moderation
// @namespace      http://dunck.us/code/greasemonkey
// @description    Check off comments to delete, then blast them all at the same time.  Use with Checkrange for extra fun.
// @include        http://*.blogspot.com/*
// @include        http://www.blogger.com/comment.g?*
// ==/UserScript==

//FIXME: replace getelms w/ xpath?

function t(name) {
   return document.getElementsByTagName(name);
}

function $(elm) {
   if (isString(elm)) {
      return document.getElementById(elm);
   } else {
      return elm;
   }
}

function randomURL(url) {
   return  url + (url.indexOf('?') == -1 ?
    '?' : '&') + 'cachemiss=' + 
      Math.floor(Math.random() *10000);
}

function getURLParam(location, key) {
   var pairs = location.search.substring(1).split('&');

   for (var i=0, pair; pair=pairs[i];i++) {
      if (pair.indexOf(key) == 0) {
         return pair.split('=')[1];
      }
   }
   return '';
}

function hasClass(elm, classToCheck) {
   return (' ' + elm.getAttribute('class') + ' ').indexOf(classToCheck) != -1;
}

function addClass(elm, classToAdd) {
   if (!hasClass(elm, classToAdd)) {
      elm.setAttribute('class', elm.getAttribute('class') + ' ' + classToAdd);
   }
}

function hasAttrValue(elm, attr, value) {
   return elm.getAttribute(attr) == value;
}

function newNode(type) {
   return document.createElement(type);
}

function newText(s) {
   return document.createTextNode(s);
}

function isString(wh) {
	return (wh instanceof String || typeof wh == "string");
}


String.prototype.startsWith = function(pref) { 
   return this.indexOf(pref) == 0; 
} 

var buttons = [];
function buttonFiddle(doSomething) {
   for (var button,i=0;button=buttons[i];i++) {
      doSomething(button);
   }
}

function getBlogID() {
   var blogID = getURLParam(window.location, 'blogID');
   
   if (blogID) {
      return blogID;
   }
   var links = t('link');
   for (var i=0;link=links[i];i++) {
      if (hasAttrValue(link, 'rel', 'EditURI')) {
         var url = link.getAttribute('href');
         //<link rel="EditURI" type="application/rsd+xml" title="RSD" href="http://www.blogger.com/rsd.g?blogID=11645460">
         blogID = url.substring(url.indexOf('?blogID=') + '?blogID='.length)
         break;
      }
   }
   return blogID;
}

function getCommentID(url) {
   //http://www.blogger.com/delete-comment.g?blogID=11645460&postID=113059419079568966
   return url.substring(url.indexOf('&postID=') + '&postID='.length)
}

if (!document.body.hasChildNodes()) { //sometimes after mass delete, even though
                                       //I'm waiting a bit for blogger to process them,
                                       // the reloaded page is borked.
                                       //If that happens, we'll just reload it again.
   window.location.href = randomURL(window.location.href);
   return;
}

var blogID = getBlogID();
var links = t('a');
var delCheck;
var foundDelLinks = false;
var CHECK_CLASS = 'gm_commentDeleteCheck';
var CHECK_LABEL = 'Delete?';
var BUTTON_PREFIX = 'gm_deleteComments_';
var BUTTON_PROMPT = 'Delete. Forever.';

for (var link, i=0; link=links[i];i++) {
   if (link.href.startsWith('http://www.blogger.com/delete-comment.g?')) { //is delete comment link.
      foundDelLinks = true;
      delCont = newNode('span');
      delCheck = newNode('input');
      delCheck.setAttribute('type', 'checkbox');
      delCheck.setAttribute('value', link.href);
      addClass(delCheck, CHECK_CLASS);
      
      delCont.appendChild(delCheck);
      delCont.appendChild(newText(CHECK_LABEL));
      link.parentNode.replaceChild(delCont.cloneNode(true), link); 
   }
}

if (foundDelLinks) { //serves as the check for whether we have rights to delete comments.
   var commentsDiv = $('comments-block');
   var delButton = newNode('button');
   var delAction = function() {
      var inputs = t('input');
      var selDeletes = [];
      var deleteSuccessCounter = 0;
      var deleteFailureCounter = 0;
      
      for (var i=0,input; input=inputs[i];i++) {
         if (hasClass(input, CHECK_CLASS) && input.checked) {
            selDeletes.push(input);
         }
      }
      if (selDeletes.length == 0) {
         alert('No comments selected for deletion.');  //FIXME: just disable the button when nothing selected?
         return;
      } else {
         var confirmMsg = 'You\'re about to delete ' + selDeletes.length + ' comments.  \nAre you ';
         var howSure = Math.min(Math.floor(selDeletes.length/10), 3);
         for (var i=0;i<howSure;i++) {
            confirmMsg += 'really ';
         }
         confirmMsg += 'sure?'
         if (!confirm(confirmMsg)) { //FIXME: pluralize properly
            return;
         }
      }

      buttonFiddle(function(button){
         button.disabled = true;
      })

      var commentID;
      for (var i=0,input; input=selDeletes[i];i++) {
         commentID = getCommentID(input.getAttribute('value'));
         GM_xmlhttpRequest({
            method:'get',
            url:'http://www.blogger.com/delete-comment.do?' + 'blogID=' + blogID + '&postID=' + commentID + '&scribble=&removeForeverCheckbox=1', 
            headers:{
               'referer':window.location.href
            },
            onload:function(details) {
               if (details.status == 200) {
                  deleteSuccessCounter++;               
               } else {
                  deleteFailureCounter++;                              
               }

               buttonFiddle(function(button){ 
                  var text;
                  if (deleteSuccessCounter + deleteFailureCounter >= selDeletes.length) {
                     text = 'One clean page, comin\' up!';
                     setTimeout(function() { //hackish setTimeout to let blogger process the deletes before reloading.
                        window.location.href = randomURL(window.location.href);
                     }, 1500); 
                  } else {
                     text = '' + deleteSuccessCounter + ' of ' + selDeletes.length + ' deleted.';                     
                     if (deleteFailureCounter > 0) {
                        text += '  ' + deleteFailureCounter + ' failures.'; //FIXME: pluralize
                     }
                  }
                  button.firstChild.data = text;
               });
            }
         }); //end GM_xhr
      } //end for input=selDeletes[i]
   }; //end delAction
   
   delButton.setAttribute('type', 'button');
   delButton.setAttribute('class', 'siteprimary');
   delButton.setAttribute('id', BUTTON_PREFIX+'top')
   delButton.appendChild(newText(BUTTON_PROMPT));
   delButton.addEventListener('click', delAction, false);
   commentsDiv.insertBefore(delButton, commentsDiv.firstChild);
   buttons.push(delButton);
   delButton = delButton.cloneNode(true); 
   delButton.setAttribute('id', BUTTON_PREFIX+'bottom')
   delButton.addEventListener('click', delAction, false); //have to hook again because clone doesn't include listeners.
   commentsDiv.appendChild(delButton);
   buttons.push(delButton);

} //end del links found

