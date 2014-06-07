// ==UserScript==
// @name           Image Settings on Topic List
// @namespace      shoecream@luelinks.net
// @description    Puts your image display settings on the topic list for ez access. Requires Firefox 3.
// @include        http://boards.endoftheinter.net/showtopics.php?*
// @include        https://boards.endoftheinter.net/showtopics.php?*
// ==/UserScript==

// XHR function from quickpost
var XHR = {};

XHR.createQueryString = function (obj) {
   var ret = [];
   for (var i in obj) {
      ret.push([i, encodeURIComponent(obj[i])].join('='));
   }
   return ret.join('&');
}

XHR.createDoc = function (r, callback) {
   var doc = document.implementation.createDocument(null,null,null);
   var html = document.createElement('html');
   html.innerHTML = r.responseText;
   doc.appendChild(html);
   r.doc = doc;
   callback(r);
}

// adds an extra 'doc' property to the response object that contains
// the document element of the response
XHR.post = function (url, callback, data) {
   GM_xmlhttpRequest({
         method: 'POST',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': XHR.createQueryString(data).length,
         },
         data: XHR.createQueryString(data),
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}

XHR.get = function (url, callback) {
   GM_xmlhttpRequest({
         method: 'GET',
         url: url,
         headers: {
            'User-Agent': navigator.userAgent,
            'Content-Type': 'application/x-www-form-urlencoded',
         },
         onload: function (r) { XHR.createDoc(r, callback) }
      });
}

// hacks together a query string when passed a form element
var create_qstring = function (form) {
   form = form.elements;
   var query = {};

   for (i in form) {
      if (isNaN(+i)) { continue };
      if ((form[i].type == 'radio' && form[i].checked) || form[i].type != 'radio') {
      query[form[i].name] = form[i].value;
   }
   }
   return query;
}

var update_status = function(string) {
   var span = document.getElementById('image-settings-clicked');
   var text = document.createTextNode(string);
   span.innerHTML = '';
   span.appendChild(text);
}

var throw_error = function(num) {
   update_status (num + ' error!');
   document.getElementById('image-settings-inner').removeEventListener('click',li_Handler,false);
}

var get_css = function() {
   for (i in document.styleSheets) {
      if (/ncss\.php/.test(document.styleSheets[i].href)) {
         return 'Custom';
      }
   }
   return 'Blue (Default)';
}

/***********************
 * Handlers start here *
 ***********************/

var onclick_Handler = function (e) {
   var box = document.getElementById('image-settings-box');
   if (box.style['display']) {
      box.style['display'] = '';
   } else {
      box.style['display'] = 'none';
   }
}

var li_Handler = function (e) {
   e.target.innerHTML = '<span id="image-settings-clicked">'+e.target.innerHTML+'</span>';
   var clicked = document.getElementById('image-settings-clicked');
   XHR.get(document.location.protocol+'//endoftheinter.net/editdisplay.php', get_Handler);
   update_status('GET... (1/3)');
}

var get_Handler = function (response) {
   if (response.status != 200)
      throw_error(response.status)
   var doc = response.doc;
   var input = doc.getElementsByTagName('input');
   var value = document.getElementById('image-settings-clicked');
   value = value.parentNode.title;
   var data = create_qstring(doc.getElementsByTagName('form')[0]);
   data['images'] = value;
   data['css'] = get_css();
   XHR.post(document.location.protocol+'//endoftheinter.net/editdisplay.php', post_Handler, data);
   update_status('POST... (2/3)');
}

var post_Handler = function (response) {
   if (response.status != 200) {
      throw_error(response.status);
   }
   var em = response.doc.getElementsByTagName('em');
   for (i in em) {
      if (em[i].textContent == 'Updated!') {
	 update_status('Done! (3/3)');
         setTimeout(function () {
               var i = document.getElementById('image-settings-box');
               var j = document.getElementById('image-settings');
               i.parentNode.removeChild(i);
               j.parentNode.removeChild(j);
            }, 2000);
	 document.getElementById('image-settings-inner').removeEventListener('click',li_Handler,false);
	 return;
      } else {
	 throw_error('POST');
      }
   }
}


// there are no less than 3 elements on the topic list with ID 'infobar'
// so let's use some other way to get it
var infobar = document.getElementsByClassName('grid')[0].previousSibling;

var settings = document.createElement('span');
settings.setAttribute('style','position:absolute; right:15px');
settings.id = 'image-settings';
infobar.appendChild(settings);
settings.innerHTML = 'Set Image Display';

settings.addEventListener('click',onclick_Handler,false);

var settings_box = document.createElement('div');
settings_box.className = 'infobar';
settings_box.id = 'image-settings-box';
settings_box.innerHTML = '<div id="image-settings-inner"><a href="#" title="0" onclick="return false;">Thumbnails</a><br/><a href="#" title="1" onclick="return false;">Full-size</a><br/><a href="#" title="2" onclick="return false;">Links only</a></div>';
settings_box.setAttribute('style','display:none;position:absolute;right: 15px');
infobar.appendChild(settings_box);

document.getElementById('image-settings-inner').addEventListener('click',li_Handler,false);
