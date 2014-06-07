// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ==UserScript==
// @name           VanHalenator beta
// @namespace      http://www.augiemania.com/userscripts/vanhalenator.user.js
// @description    Searchs for the full names of all Van Halen band member (past and present) and returns a link to a googe search so you can learn more about the decade-spanning rock super-group.
// @version				 0.5
// @date					 2007-03-18
// @include        *
// ==/UserScript==
//
// This version simply inserts the Van Halen "VH" logo next to all results.  The next version will include images of the band members.
// 
// 
// "David Lee Roth"
//   -"Diamond Dave"
// "Eddie Van Halen"
// "Michael Anthony" 
// "Alex Van Halen"
// "Gary Cherone"
// "Sammy Hagar"
// "Wolfgang Van Halen"
//
//

(function () {
       const vanhalenRegex = /\b(van halen|david lee roth|diamond dave|eddie van halen|alex van halen|michael anthony|gary cherone|sammy hagar|wolfgang van halen)\b/ig;

       function vanhalenUrl(t) {
               return "http://www.google.com/search?hl=en&q=" + String(t).replace(/ /g, "+");
       }
			 

   // tags we will scan looking for un-hyperlinked urls
   var allowedParents = [
       "a", "abbr", "acronym", "address", "applet", "b", "bdo", "big", "blockquote", "body",
       "caption", "center", "cite", "code", "dd", "del", "div", "dfn", "dt", "em",
       "fieldset", "font", "form", "h1", "h2", "h3", "h4", "h5", "h6", "i", "iframe",
       "ins", "kdb", "li", "object", "pre", "p", "q", "samp", "small", "span", "strike",
       "s", "strong", "sub", "sup", "table", "tbody", "td", "tr",  "th", "tt", "u", "var"
       ];

   var xpath = "//text()[(parent::" + allowedParents.join(" or parent::") + ")" +
                               //" and contains(translate(., 'HTTP', 'http'), 'http')" +
                               "]";

   var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

   //var t0 = new Date().getTime();
   for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {

       // vanhalen Track
       if (vanhalenRegex.test(cand.nodeValue)) {
               var span = document.createElement("span");
               var source = cand.nodeValue;

               cand.parentNode.replaceChild(span, cand);

               vanhalenRegex.lastIndex = 0;
							
               for (var match = null, lastLastIndex = 0; (match = vanhalenRegex.exec(source)); ) {
							 		//alert(match);
                         
					 
						 
                       span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));

                       var a = document.createElement("a");
                       a.setAttribute("href", vanhalenUrl(match[0]));
                       a.setAttribute("title", 'a link created by vanhalen.user.js');
											 a.setAttribute("target", '_blank');
                       a.appendChild(document.createTextNode(match[0]));
                       span.appendChild(a);
                       
                       var a = document.createElement("img");
                       a.setAttribute("src", 'data:image/gif;base64,R0lGODlhMgAdAPcAAP///wAAADU1Nf7+/gcHBwMDAwYGBggICAEBAQsLC/z8/AQEBA4ODmZmZjIyMhYWFhUVFRISEgUFBdra2jc3NyMjIw8PDxcXFzs7OxQUFA0NDQwMDAkJCQICAv39/Tk5OTQ0NDMzM/n5+ZeXlzw8PBAQEPb29vr6+vLy8tzc3CcnJ0tLS7+/v4yMjBERESoqKgoKCkNDQ1paWiQkJBgYGFBQUKenpy0tLZSUlOXl5dPT0xoaGvX19YiIiCAgIBwcHCEhIcPDw7S0tLy8vN7e3sHBwYuLi4qKiomJicbGxq2trdXV1R0dHXBwcKOjo2RkZIaGhjo6OkVFRefn546OjnFxcUdHR0JCQnt7e/Pz87m5ube3t+3t7ZycnHZ2dtDQ0BkZGcvLy+/v7/Dw8Pv7+2lpaT4+Pujo6N/f37OzszExMRMTE42NjaampmpqapOTk+Tk5EBAQB4eHk1NTZaWlqysrHNzc25ubqmpqXh4eK+vr8LCwvj4+D09PVdXV0lJSU5OTr6+vk9PT4WFha6urri4uEZGRr29vV9fX7q6um1tbYKCgoeHh7Gxsc3NzZGRkcjIyJiYmLa2tmNjYx8fHygoKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAyAB0AAAj/ALc4MCSgoMGDambU4RPGAQgKHzAoOhJCgZ0PFCooAOBGSogoIA4WdECSJJIBlAIEQLAAgcoAHSQkCACBAg8ASQKUSHDgwYYKPQwkkGABAIAANF4aWMq0QIAFATYYJSSEBYtAQvS0saGkkSQZCRakMZrEEZEgFwJ4qVDggI4cAAZAPcMlyIS7eOF8yQEphVEAJFQiIEDgAAEDEhYwobEGwsa/JDggAgC1yMYBGGA8UAn15csSAaB4MDoAwAg2RhgNQmKkRYsjOLoQCPDX6EoUMgJEIP1kh4sYTSY1aUCcuBMnfvIAEEG6tvPaAW5M+TsmAwETFjq8+BuAwQy/A0o//x8PIEV3DQEMOA1QwGUACxZQLAfCocaKCBnkAyDjA4jnlwV0UABUJgAwmnOVAEJBCBh8EJEZMaywgko2mEYAAzqwt8MSSwzxhAv4bSCTBho8wMQFP1SgAnksxmVUAwxcAAABBYwAAAQuHeASjQ+06OOPhbR3FAQntGBBdCpEIEcEBNzxo1GPPVlbAjBwkJYSCSRQw18lcBBHlFKGadQBDAQggRWCBEBAEdxJEImYcBrFwgEB+HDUBYmQRocBtMUZZ2AjiOACAeIBEAIYffopZhYBnEBBAH0AsJECGwQwhKJxvtCABi948FgPCOBQ2oGYPnlIBQE88tcJERwgRqlxHlXQQW0qPFAArHEi0KOLDEAAAq5wXlGgUVpkEMBNwIaJRqFlEJasom8EcMAcz/oJQpl4VBsnTVVoCycWMxXq7ZN/9DSumIsEQMW5YYrwAxHshrkHsAEBADs=');
                       a.setAttribute("width", '50');
                       a.setAttribute("alt", 'Van Halen Logo');
                       a.appendChild(document.createTextNode(match[0]));
                       span.appendChild(a);
 
                       lastLastIndex = vanhalenRegex.lastIndex;
               }
							 
							

               span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
               span.normalize();
       }
			 
			 
					 

       }
			 

   //var t1 = new Date().getTime();
   //alert("this shit took " + ((t1 - t0) / 1000) + " seconds");

})();
