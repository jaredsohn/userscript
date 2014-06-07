// ==UserScript==
// @name		    Pastebin.com on UserScripts
// @namespace		http://userscripts.org/scripts/show/69862
// @description		Creates pastebin.com window that opens from link on userscripts navbar
// @require			http://usocheckup.dune.net/69862.js?maxage=10
// @include	  		http://*userscripts*
// @version       	0.3
// ==/UserScript==

// Release Notes
// 0.3
// -added pastebin.com to @name and @desc
// -temp. fix of "pipe symbol clutter" error reported by Marti
// 0.2
// - added link near "reply to thread" link in forums
// - slightly changed the div location
// - added update require
// 0.1
// - initial code

// insertAfter function
	//create function, it expects 2 values.
	function insertAfter(newElement,targetElement) 
	{
		// target is what you want it to go after. Look for this elements parent.
		var parent = targetElement.parentNode;	
		// if the parents lastchild is the targetElement...
		if(parent.lastchild == targetElement) 
		{
			// add the newElement after the target element.
			parent.appendChild(newElement);
		} 
		else 
		{
			// else the target has siblings, insert the new element between the target and it's next sibling.
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	};

function toggleDiv(me) {
			me.style.visibility = (me.style.visibility=="hidden") ? "visible" : "hidden";
		}

var makeIframe = document.createElement("iframe");
	makeIframe.setAttribute("height", "408px");
	makeIframe.setAttribute("width", "430px");
	makeIframe.setAttribute("scrolling", "no");
	makeIframe.setAttribute("src", "http://pastebin.com/api_form.php");
// Create box with certain style
var box = document.createElement('div');
	box.id = 'center_div';
	box.setAttribute('style', 'position:fixed; top:119px; right:60px; border:1px solid black; background:#DDDDDD; color:#000; padding:20px; -moz-border-radius:1px; -moz-appearance:none;');
box.style.visibility = "hidden";

var createClose = document.createElement("a");
	createClose.setAttribute("href", "#");
	createClose.innerHTML = "Close";
document.body.appendChild(box);
var pastebin = document.createElement("center");
	pastebin.innerHTML = "<h3>~PasteBin~</h3><br>";
box.appendChild(pastebin);
box.appendChild(makeIframe);
box.appendChild(document.createElement('br'));
box.appendChild(createClose);

function divAction(uh)
{
uh.addEventListener(
    "click",
    function() {
		// function to use on click
        toggleDiv(box);
        return false;
    },
    false
);
}
divAction(createClose);
var makeEl = document.createElement("li");
var makenewEl = document.createElement("a");
	makenewEl.setAttribute("href", "#");
	makenewEl.innerHTML = "Pastebin";
(function() {
	var div = document.getElementsByTagName('a');
	var attribs = "";
		for (var i = div.length - 1; i >= 0; i--) {
			attribs = div[i].getAttribute('href');
			if(attribs == "/books"){
			    // Use our insertAfter function to insert our new navbar element
				insertAfter(makeEl,div[i]);
			}
		}
	}
)();
makeEl.appendChild(makenewEl);

(function() {
	var div = document.getElementsByTagName('a');
	var attribs = "";
		for (var i = div.length - 1; i >= 0; i--) {
			attribs = div[i].getAttribute('href');
			if(attribs == "/books"){
				div[i].parentNode.removeChild(div[i]);
			}
		}
	}
)();
divAction(makenewEl);