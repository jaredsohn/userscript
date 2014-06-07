// ==UserScript==
// @name           Ranger
// @include      http://www.soundrangers.com/*
// ==/UserScript==

unsafeWindow.dlSounds = function() 
{
	setTimeout(
		function ()
		{
			javascript:
			var newButt = document.createElement("button");
			newButt.innerHTML = "Add Links";
			newButt.setAttribute("style", "position:absolute; left:0; top:0; z-index:10000;");
			//newButt.setAttribute("onclick", "unsafeWindow.dlSounds(0);alert('Added Links');");
			newButt.onclick = dlSounds;
			document.body.appendChild(newButt);
			
			/*alert("starting sorting");*/
			var node_list = document.getElementsByTagName("embed");
			/*alert("Nodes: " + node_list.length);*/
			for (var i = 0; i < node_list.length; i++) 
			{
				var node = node_list[i];
				if (node.getAttribute("src") != "") 
				{
					var src = node.getAttribute("src");
					var re = new RegExp(/url2swf=([^&]*)/i);
					var m = re.exec(src);
					if (m == null) 
					{
					} 
					else 
					{
						/*alert("found link\r\n" + m[1]);*/
						var newlink = document.createElement("a");
						newlink.setAttribute("href", "http://localhost/rangersound.php?url=" + m[1]);
						newlink.innerHTML = "&nbsp;DL&nbsp;";
						insertAfter(newlink, node);
						
						function insertAfter(newElement,targetElement) 
						{
							/*target is what you want it to go after. Look for this elements parent.*/
							var parent = targetElement.parentNode;
							
							/*if the parents lastchild is the targetElement...*/
							if(parent.lastchild == targetElement) {
								/*add the newElement after the target element.*/
								parent.appendChild(newElement);
							} else {
								/* else the target has siblings, insert the new element between the target and its next sibling.*/
								parent.insertBefore(newElement, targetElement.nextSibling);
							}
						}
						
					}
				}
			}
		}
	, timeout);
}
unsafeWindow.dlSounds(3000);
