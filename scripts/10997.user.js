// ==UserScript==
// @name Shack posting in Opera by kne
// @namespace 
// @description Shack posting in Opera
// @include http://*.shacknews.com/laryn.x?*
// @include http://shacknews.com/laryn.x?*
// ==/UserScript==
/*

* 8/5/2007 - (update1) minor update to "fix" the display on a reply.
* 8/5/2007 - (update2) fixed the real form submission from completing, thereby removing the annoying "5 chars or less" message
* 8/13/2007 - Fixed a typo that caused an error to pop up in the console

Hi. Let's post on the shack from Opera ! !

I grabbed the POST code from here, I think: http://java.sun.com/developer/technicalArticles/WebServices/restful/code_sample4.html

I made this all in a matter of a couple of hours, and it's my first Greasemonkey script, so sorry if it doesn't work.

- kne
 7/28/2007

*/

(function() {
   var http_request = false;
   window.addEventListener('submit', do_post, true);
   HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
   HTMLFormElement.prototype.submit = do_post;

   function makePOSTRequest(url, parameters) {
      http_request = false;
      if (window.XMLHttpRequest) { // Mozilla, Safari,...
         http_request = new XMLHttpRequest();
         if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/html');
         }
      } else if (window.ActiveXObject) { // IE
         try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e) {
            try {
               http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
         }
      }
      if (!http_request) {
         alert('Cannot create XMLHTTP instance');
         return false;
      }
      
      http_request.onreadystatechange = alertContents;
      http_request.open('POST', url, true);
      http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      http_request.setRequestHeader("Content-length", parameters.length);
      http_request.setRequestHeader("Connection", "close");
      http_request.send(parameters);
   }

   function alertContents() {
      if (http_request.readyState == 4) {
         if (http_request.status == 200) {
            result = http_request.responseText;
            if (result.indexOf("frame_laryn.x") != -1) {
               //refresh the post. i don't know what to do, so reload the page instead
               window.location.reload();
            } else {
               document.write(result);
            }
         } else {
            alert('There was a problem with the request.');
         }
      }
   }

   function do_post(event) {
        var target = event ? event.target : this;
        //alert('Submitting form to ' + target.action);
        if (target.action.indexOf("post_laryn.x") == -1) {
           //alert("submitting normally");
           this._submit();
        } else {
           //alert("submitting with script");
           event.stopPropagation();
           event.preventDefault();
           var poststr = "parent=" + encodeURI( document.postform[0].parent[0].value ) +
                    "&group="      + encodeURI( document.postform[0].group [0].value ) +
                    "&dopost="     + encodeURI( document.postform[0].dopost[0].value ) +
                    "&body="       + encodeURI( document.postform[0].body  [0].value ) +
                    "&frm_submit=Post";
           makePOSTRequest('post_laryn.x', poststr);
        }
        return false;
    }

}
)();
