// ==UserScript==
// @name		  Forum Signature Remover
// @namespace	  
// @description   Removes signatures on vbulletin 4, phpBB, and IP Board forums.
// @require		http://usocheckup.dune.net/64368.js
// @version       0.5
// @include       http://*forum*
// @include       http://*community*
// @include       http://*board*
// @exclude	   
// ==/UserScript==





function removeElement(el, attribs, attribValue) {

	// Get element tag

	var div = document.getElementsByTagName(el);

	var myAttribs = "";

		for (var i = div.length - 1; i >= 0; i--) {

			// Get attribute

			myAttribs = div[i].getAttribute(attribs);

			// Get attribute value

			if(myAttribs == attribValue){

				div[i].parentNode.removeChild(div[i]);

			}

		}

	};
removeElement('blockquote', 'class', 'signature restore');
removeElement('div', 'class', 'signature');
removeElement('span', 'class', 'postbody signature');