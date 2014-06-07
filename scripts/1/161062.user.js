// ==UserScript==
// @name           LLer Photo Album
// @namespace      shoecream@luelinks.net
// @description    Displays approved pictures of LLers next to their posts. Requires Firefox 3.
// @include        http://boards.endoftheinter.net/showmessages.php?*
// @include        http://archives.endoftheinter.net/showmessages.php?*
// @include        http://endoftheinter.net/profile.php?*
// @include        http://www.endoftheinter.net/profile.php?*
// @include        https://boards.endoftheinter.net/showmessages.php?*
// @include        https://archives.endoftheinter.net/showmessages.php?*
// @include        https://endoftheinter.net/profile.php?*
// @include        https://www.endoftheinter.net/profile.php?*
// ==/UserScript==

var spinner_url = {};

spinner_url.spinner = 
   'data:image/gif;base64,R0lGODlhEAAQAPIAAP%2F%2F%2F6CgoOfn57i4uKCgoMTExNDQ0'+
   'NbW1iH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbw'+
   'Ah%2BQQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEw'+
   'nHQLVsYOd2mBzkYDAdKa%2BdIAAAh%2BQQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7'+
   'DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABA'+
   'AEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKp'+
   'ZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqR'+
   'oKw0R8DYlJd8z0fMDgsGo%2FIpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTw'+
   'GPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo%2FIpFKSAAAh%2BQQJCgAAACwAA'+
   'AAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJib'+
   'ufbSlKAAAh%2BQQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWh'+
   'UFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc%2FjDKSatl'+
   'QtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA%3D'+
   '%3D';

spinner_url.snoop = 'http://llamaguy.com/upload/snoopsmall.gif';

spinner_url.toString = function () {
   if (Math.random() < 0.15) {
      return spinner_url.snoop;
   } else {
      return spinner_url.spinner;
   }
}

// find element position, from quirksmode
function findPos(obj) {
   var curleft = curtop = 0;
   if (obj.offsetParent) {
      do {
         curleft += obj.offsetLeft;
         curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
      return [curleft,curtop];
   }
}

// helper functions from mdc
function is_all_ws( nod ) {
   // Use ECMA-262 Edition 3 String and RegExp features
   return !(/[^\t\n\r ]/.test(nod.data));
}

function is_ignorable( nod ) {
   return ( nod.nodeType == 8) || // A comment node
   ( (nod.nodeType == 3) && is_all_ws(nod) ); // a text node, all ws
}

function node_before( sib ) {
   while ((sib = sib.previousSibling)) {
      if (!is_ignorable(sib)) return sib;
   }
   return null;
}

function node_after( sib ) {
   while ((sib = sib.nextSibling)) {
      if (!is_ignorable(sib)) return sib;
   }
   return null;
}

function last_child( par ) {
   var res=par.lastChild;
   while (res) {
      if (!is_ignorable(res)) return res;
      res = res.previousSibling;
   }
   return null;
}

function first_child( par ) {
   var res=par.firstChild;
   while (res) {
      if (!is_ignorable(res)) return res;
      res = res.nextSibling;
   }
   return null;
}

// gets userid of a messagetop
function get_msg_poster (top) {
   var links = top.getElementsByTagName('a');
   for (var i=0; i<links.length;i++) {
      if (links[i].href) {
         var id = links[i].href.search(/profile\.php\?user=/)
         if (id > -1)
            return links[i].textContent;
      }
   }
   return 0;
}

// gets the picture
function get_pic (user, th) {
   // removes things in parentheses from the end of the username
   user = user.replace(/\s+\(.*\)$/, '');

   if (th) {
      return 'http://pix.tiko.be/pic.php?t&u='+user;
   } else {
      return 'http://pix.tiko.be/pic.php?u='+user;
   }
}

// dynamically resizes the message based on image height
function resize_msg (e) {
   if (is_profile_page()) {
      e.target.removeEventListener('load', resize_msg, false);   
      return;
   }
   // we have to briefly display the picture otherwise we don't know its size
   e.target.style.display='block';
   // height of 1 indicates that there is no picture available
   if (e.target.clientHeight == 1) {
      e.target.style.display='none';
      e.target.removeEventListener('load', resize_msg, false);   
      return;
   }
   e.target.parentNode.style.minHeight = '';   
   if (e.target.parentNode.clientHeight < +e.target.clientHeight+2) {
      e.target.parentNode.style.minHeight = (e.target.clientHeight+2)+'px';
   }
   e.target.removeEventListener('load', resize_msg, false);   
}

function adjust_spinner (pos, width, height) {
   var spinner = document.getElementById('photo-album-spinner');
   spinner.style.display = 'block';
   spinner.style.left = pos[0]+'px';
   spinner.style.top = pos[1]+'px';
   spinner.style.width = width+'px';
   spinner.style.height = height+'px';
}

function hide_spinner (e) {
   var spinner = document.getElementById('photo-album-spinner');
   spinner.style.display = 'none';
   e.target.removeEventListener('load', hide_spinner, false);      
}

function expand_pic (e) {
   adjust_spinner(
      findPos(e.target),
      e.target.clientWidth,
      e.target.clientHeight
   );
   // add load listeners before setting src
   e.target.addEventListener('load', resize_msg, false);
   e.target.addEventListener('load', hide_spinner, false);   
   e.target.src = get_pic(e.target.title,false);
   e.target.addEventListener('click',contract_pic,false);
   e.target.removeEventListener('click', expand_pic, false);
}

function contract_pic (e) {
   // add load listeners before setting src
   e.target.addEventListener('load', resize_msg, false);
   e.target.src = get_pic(e.target.title,true);
   e.target.addEventListener('click',expand_pic,false);
   e.target.removeEventListener('click', contract_pic, false);
}

function on_new_msg (e) {
   var tops = e.target.getElementsByClassName('message-top');
   for (var i=0;i<tops.length;i++) {
      add_picture(tops[i]);
   }
}

function create_picture (user) {
   var img = document.createElement ('img');
   img.addEventListener('load', resize_msg, false);
   img.addEventListener('load',display_profile_img,false)
   img.src = get_pic(user, true);
   img.setAttribute('style','display:none;border:1px outset;margin-left:1em;cursor:pointer;float:right');
   img.title = user;
   img.className = 'photo-album-image';
   return img;
}


function add_picture (top) {
   if (is_invalid(top)) return; // don't put pictures in quoted messages
   var user = get_msg_poster(top);
   var msg = node_after(top);
   if (/message-body/.test(msg.className)) {
      // has avatars enabled
      msg = msg.getElementsByClassName('message')[0];
   }
   var img = create_picture(user);
   msg.insertBefore(img, msg.firstChild);
   img.addEventListener('click', expand_pic, false);
}

function is_invalid (top) {
   // checks if the message is a quoted message, blank post, or deleted post
   if (top.parentNode.className == 'quoted-message')
      return true;
   if (/^\s+$/.test(node_after(top).textContent))
      return true;
   if (node_after(top).textContent == '[This message was deleted at the request of the original poster]') {
      return true;
   }
}

function is_profile_page() {
   if (document.location.pathname.search('profile.php') > -1)
      return true;
   return false;
}

var spinner = document.createElement('div');
spinner.id = 'photo-album-spinner';
spinner.setAttribute('style','border:1px outset;position:absolute;background:white url('+spinner_url+') no-repeat center center;display:none;opacity:.66');
document.getElementsByTagName('body')[0].appendChild(spinner);

if (is_profile_page()) {
   // since we're using firefox 3 anyway and this works for classic users...
   var table = document.getElementsByClassName('grid')[0];
   var user = document.title.match('User Profile - (.+)')[1];
   var row = table.insertRow(3);
   var data = row.insertCell(0);
   data.id = 'photo-album-profile';   
   var label = row.insertCell(0);
   var label_link = document.createElement('a');
   label_link.href = '/showmessages.php?board=42&topic=4519448';
   label_link.appendChild(document.createTextNode('User Picture'));
   label.appendChild(label_link);
   var data_content = document.createElement('em');
   data_content.appendChild(document.createTextNode('Loading...'));
   data.appendChild(data_content);
   var img = create_picture(user)
   img.setAttribute('style','border:1px outset;cursor:pointer');
   img.addEventListener('click',expand_pic,false)
} else {
   document.addEventListener('DOMNodeInserted', on_new_msg, false);
   var tops = document.getElementsByClassName('message-top');
   for (var i=0;i<tops.length;i++) {
      add_picture(tops[i]);
   }
}

function display_profile_img (e) {
   if (!is_profile_page()) {
      e.target.removeEventListener('load',display_profile_img,false);
      return;
   }
   var profile_location = document.getElementById('photo-album-profile');
   e.target.style.display = 'block';
   profile_location.appendChild(e.target);
   profile_location.removeChild(profile_location.firstChild);   
   if (e.target.clientHeight == 1) {
      profile_location.removeChild(profile_location.firstChild);
      var anchor = document.createElement('a');
      anchor.appendChild(document.createTextNode('No image'));
      anchor.href = 'http://pix.tiko.be/';
      profile_location.appendChild(anchor);
   }
   e.target.removeEventListener('load',display_profile_img,false);
}
