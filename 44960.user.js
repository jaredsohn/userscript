// ==UserScript==
// @name             civiweb-background-login
// @namespace        http://userscripts.org/scripts/show/44960
// @description      [FR] -- le login a lieu en arrière-plan (fait en sorte que la redirection fonctionne effectivement)
// @include          http://www.civiweb.com/*
// ==/UserScript==

( function () {
   var form = document.evaluate('//form[@name="formLogin"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null);
   form = form.singleNodeValue;
   // if alread logged in, then form.elements.length == 0
   if (!form || 0 == form.elements.length)
      return;

   function bgLogin (e) { // {{{
      var form = this;
      var xhr = false;
      var data = new Array();
      var tdNode = false;
      xhr = new XMLHttpRequest();

      // prevent 'foreground' submit
      e.preventDefault();
      
      xhr.onreadystatechange = function () { // {{{
         // kind of progress bar
         tdNode.textContent = tdNode.textContent.replace('[', '[ [').replace(']', '] ]');

         if (4 == xhr.readyState && 200 == xhr.status) {
            // cookie should be set by now, refresh the window
            if ('/' == location.pathname || '/home.asp' == location.pathname) {
               location.href = 'http://www.civiweb.com/default.asp?action=offres';
            } else {
               window.location.reload();
            }
         }
      }
      // }}}

      // getting data from form
      for (var i=0, elt ; elt = form.elements.item(i) ; i++) {
         data.push(elt.name + '=' + encodeURIComponent(elt.value));
         if ('redirection' == elt.name)
            tdNode = elt.parentNode;
      }

      // let the user know we're doing something
      if (tdNode) {
         while(tdNode.lastChild)
            tdNode.removeChild(tdNode.lastChild);
         tdNode.appendChild(document.createTextNode('[  loading  ]'));
      }

      // required
      data.push('btnlogin.x=0');
      data.push('btnlogin.y=0');

      xhr.open('POST', form.action, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(data.join('&'));

   }
   // }}}

   // refresh the window once the login informations are sent
   form.addEventListener('submit', bgLogin, true);

} ) ();

/* vim: set et sts=3 sw=3 foldmethod=marker : */
