// ==UserScript==
// @name        text marker
// @namespace   *
// @description
// @version     1.01
// ==/UserScript==

cursorline = null;

function mark(range)
{
			var span = document.createElement("span");
			span.style.cssText = "background:#ffffaa !important; font-size:115% !important; color:black !important;";
			span.className = "hd"; // highlighted
			// var range = window.getSelection().getRangeAt(0);
			var start = range.startContainer.parentNode;
			var end = range.endContainer.parentNode;

			if (start != end)
			{
				// determine which one is deeper in the domtree
				var n = start;
				while (n != document.body && n)
				{
					if (n.parentNode == end) // n is deeper than end
					{
						range.setStartBefore(n);
						break;
					}
					else
						n = n.parentNode;
				}

				n = end;
				while (n != document.body && n)
				{
					if (n.parentNode == start) // n is deeper than start
					{
						// range.setEndAfter(n);
						/*
							bug workaround, because including the whole end
							node (i.e. a link) and removing the range via
							range.setEndAfter(mylink);
							range.deleteContents();
							causes errors
						*/
						//*
						// exclude endnode
						range.setEndBefore(n);
						// create an extra range for the endnode
						var newrange = document.createRange();
						newrange.selectNode(n);
						// select when finished with this function call
						setTimeout(function(){mark(newrange);}, 0);
						//*/
						break;
					}
					else
						n = n.parentNode;
				}
			}

			// if the selection already includes a highligted area,
			// merge it into the new selection
			if (start.className == "hd")
			{
				range.setStartBefore(start);
			}
			if (end.className == "hd")
			{
				range.setEndAfter(end);
			}

			// range.surroundContents(span);
			var fragment = range.cloneContents();
			//*
			range.deleteContents();
			while (fragment.firstChild)
			{
				span.appendChild(fragment.firstChild);
			}
			//*/
			span.innerHTML = span.innerHTML.replace(/<.?span[^>]*>/ig,"");
			range.insertNode(span);
}

window.addEventListener(
	"mouseup",
	function (e)
	{
		if (window.getSelection().toString().length > 0)
		{
			mark(window.getSelection().getRangeAt(0));
		}
		else if (e.which == 1 && e.target.className == "hd")
		{
			var range = document.createRange();
			// have to get the textNode to select something
			range.selectNode(e.target.firstChild);
			window.getSelection().addRange(range);
		}
	}
);

window.addEventListener(
	"mousemove",
	function(e)
	{
		if (e.ctrlKey)
		{
			if (cursorline == null)
			{
				// create cursorline
				cursorline = document.createElement("hr");
				cursorline.style.cssText = 
					"position: absolute; \
					z-index: 9; \
					pointer-events:none; \
					background:magenta; \
					opacity:0.05; \
					margin-top:-7pt; \
					height:14pt; \
					left:0; \
					right:0; \
					border:none;";
				document.body.appendChild( cursorline );
			}
			// keep cursorline at the mouse cursor location
			cursorline.style.top = e.pageY + "px";
		}
	}
);

window.addEventListener(
	"mousedown", 
	function(e)
	{
		if (e.which == 1 && e.ctrlKey) // crtl + click
		{
			// leave stationary blue cursorline at cursor location
			var markline = document.createElement("hr");
			markline.style.cssText = cursorline.style.cssText;
			markline.style.backgroundColor = "dodgerblue";
			markline.style.opacity = .1;
			document.body.appendChild( markline );
		}
	}
);

window.addEventListener(
	"contextmenu",
	function(e)
	{
		if (window.getSelection().isCollapsed) // ctrl + rightclick
		{
			window.t = e;
			if (e.target.className == "hd")
			{
				e.target.insertAdjacentHTML("afterend", e.target.innerHTML);
				e.target.parentNode.removeChild(e.target);
				e.preventDefault();
				e.stopPropagation();
				return false;
			}
		}
	}
)
