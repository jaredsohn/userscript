// ==UserScript==
// @name           Edit on message bar
// @namespace      shoecream@luelinks.net
// @description    Puts an edit link on the message bar of editable posts. Requires Firefox 3.
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        http://links.endoftheinter.net/linkme.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// @include        https://links.endoftheinter.net/linkme.php*
// ==/UserScript==

USR_DELETE = '[This message was deleted at the request of the original poster]';
MOD_DELETE = '[This message was deleted by a LUElinks moderator]'

MOD_TOPBAR_DELETED = 'Deleted by user';
MOD_TOPBAR_MODDED = 'Deleted by moderator';

DELETED_MSG = [USR_DELETE, MOD_DELETE];
DELETED_TOP = [MOD_TOPBAR_DELETED, MOD_TOPBAR_MODDED];


// from MDC
function is_ignorable(nod) {
   return ( nod.nodeType == 8) || // A comment node
   ( (nod.nodeType == 3) && is_all_ws(nod) ); // a text node, all ws
}

// from MDC
function node_after(sib) {
   while ((sib = sib.nextSibling)) {
      if (!is_ignorable(sib)) return sib;
   }
   return null;
}

// from quirksmode
// easiest way to find userid
function readCookie(name) {
   var nameEQ = name + "=";
   var ca = document.cookie.split(';');
   for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
   }
   return null;
}

function getUser() {
   return readCookie('userid');
}

// expects a div with className="messagetop"
function getPoster(top) {
   if (top.className != 'message-top')
      return;
   links = top.getElementsByTagName('a');
   for (var i=0;i<links.length;i++) {
      var id = links[i].href.match(/profile\.php\?user=(\d+)/i)[1];
      if (id)
         return id;
   }
}
function getMsgInfo(top) {
   if (top.className != 'message-top')
      return;
   links = top.getElementsByTagName('a');
   for (var i=0;i<links.length;i++) {
      if (/message\.php\?/.test(links[i].href)) {
         return links[i].href.replace('message.php', 'postmsg.php');
      }
   }
}


function isInvalid(top) {
   if (top.parentNode.className == 'quoted-message')
      return true;

   var em = top.getElementsByTagName('em');
   if (em[0]) {
      DELETED_TOP.some(
         function(e) {return e == em[0]}
      );
      return true;
   }

   if (DELETED_MSG.some(
         function(e) { return e == node_after(top).textContent }
      )) {
      return true;
   }

   // have we already inserted a message?
   if (top.getElementsByClassName('editsection').length) {
      return true;
   }
   return false;
}


function createEditLink(string) {
   var span = document.createElement('span');
   span.className = 'editsection';
   span.setAttribute('style','position:absolute; right:1em;');
   span.innerHTML = '[<a href="'+string+'" title="Edit this message">edit</a>]';
   return span;
}

function display (e) {
   if (e.target) {
      if (e.target.tagName != 'DIV') return;
      e = e.target;
   }

   var tops = e.getElementsByClassName('message-top');

   for (var i=0;i<tops.length;i++) {
      if (isInvalid(tops[i])) continue;
      if (getUser() == getPoster(tops[i])) {
         var info = getMsgInfo(tops[i]);
         if (/links/.test(document.location.host)) {
            info = info.replace(/&?link=(\d+)/, '');
            info = info.replace('topic', 'link');
         }
         tops[i].appendChild(createEditLink(info));
      }
   }

}

display(document);

document.addEventListener('DOMNodeInserted', display, false);
