// ==UserScript==
// @name           GMail SVN Highlighter Fluid
// @namespace      http://fluidapp.com
// @description    Highlights diff syntax in SVN commit messages
// @author         Tanguy de Courson 
// @version        0.3
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// ==/UserScript==
window.addEventListener("load", loader, false);

function loader() {
   var api = typeof unsafeWindow != "undefined" && unsafeWindow.gmonkey ||
             (frames.js ? frames.js.gmonkey : null);
   if (api) api.load("1.0", init);
}

function init(gmail) {

   function findElement(root, name) {
      var elts = root.getElementsByName(name);
      return elts ? elts[0] : null;
   }

   function handleClicks(event) {
      var elt = event.target;
      if (elt.innerText == 'Send') {
         var fromElt = findElement(elt.ownerDocument, 'from');
         if (fromElt) {
            var bccElt = findElement(elt.ownerDocument, 'bcc');
            if (bccElt) {
               var re = new RegExp(fromElt.value);
               if (!bccElt.value.match(re)) {
                  bccElt.value = bccElt.value ? bccElt.value + ', ' + fromElt.value :
fromElt.value;
               }
            }
         }
      }
   }
   
   function viewChanged() {
      var view = gmail.getActiveViewType();
      if (view == 'co' || view == 'cv') {
         //var root = gmail.getNavPaneElement().ownerDocument;
         //root.addEventListener('click', handleClicks, true);
			var divs = gmail.getActiveViewElement().getElementsByTagName('div');
			//alert(divs.length);
			for (i=0; i<divs.length; i++) {
				if (divs[i].className.match(/\bii\b/)) {
					var ih = divs[i].innerHTML;
					if (!ih.match(/Author:[^\n]+\nDate:[^\n]+\nNew Revision:/)) {
						
						continue; // highlight only svn messages
					}
					ih = ih.replace(/(\n) /g,'$1&nbsp;'); // it's a fix for incorrect gmail behavior
					ih = ih.replace(/(\n)(Modified:|========|\+\+\+\s|---\s|@@\s)(.+?)(<br)/g, '$1<span style="color:#999">$2$3</span>$4');
					ih = ih.replace(/(\n)(\+.*?)(<br)/g, '$1<span style="color:#090">$2</span>$3');
					ih = ih.replace(/(\n)(\-.*?)(<br)/g, '$1<span style="color:#900">$2</span>$3');
					divs[i].innerHTML = ih;
				}
			}
      }
   }

   gmail.registerViewChangeCallback(viewChanged);
}

