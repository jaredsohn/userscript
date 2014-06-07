// ==UserScript==
// @name        KickFilter
// @namespace   KickFilter
// @description Allows you to filter projects in lists by keywords they contain.
// @include     http://www.kickstarter.com/discover/*
// @version     3
// @grant       none
// ==/UserScript==

(/* void */ function(/* void */)
{
	var /* HTMLHeadingElement */  container;
	var /* HTMLInputElement */    textbox;
	var /* HTMLSpanElement */     divider;
	var /* Function */            initialise;

	(container = document.getElementById("running-board").getElementsByTagName("h1")[0]).appendChild(document.createTextNode(" "));
	divider = document.createElement("span");
	divider.className = "divider";
	divider.appendChild(document.createTextNode("/"));
	container.appendChild(divider);
	container.appendChild(document.createTextNode(" "));
	textbox = document.createElement("input");
	textbox.className = "input-search header text";
	textbox.placeholder = "(All)";
	textbox.title = "Search terms starting with a / are treated as regular expressions";
	textbox.onkeypress = textbox.onblur = textbox.oncut = textbox.onpaste = textbox.ondelete = /* void */ function(/* void */)
	{
		if(!document.getElementsByClassName("load_more")[2] || document.getElementsByClassName("load_more")[2].style.display == "none")
		{
			setTimeout(/* void */ function(/* void */)
			{
				var /* NodeList<HTMLDivElement> */  card;
				var /* Number */                    index;
				var /* HTMLParagraphElement */      paragraph;
				var /* String */                    text;

				index = (card = document.getElementsByClassName("project")).length;
				text = textbox.value;
				if(text.substr(0, 1) == "/")
				{
					text = new RegExp(text.substr(1), "g");
					while(index--)
						card[index].style.display = text.test(card[index].getElementsByTagName("p")[0].textContent) || text.test(card[index].getElementsByTagName("h2")[0].textContent) || text.test(card[index].getElementsByClassName("location-name")[0].textContent) ? "" : "none";
				}
				else
				{
					text = text.trim().toLowerCase();
					while(index--)
						card[index].style.display = card[index].getElementsByTagName("p")[0].textContent.toLowerCase().indexOf(text) > -1 || card[index].getElementsByTagName("h2")[0].textContent.toLowerCase().indexOf(text) > -1 || card[index].getElementsByClassName("location-name")[0].textContent.toLowerCase().indexOf(text) > -1 ? "" : "none";
				}

				return;
			}, 1);
		}

		return;
	};
	initialise = textbox.onfocus = /* void */ function(/* void */)
	{
		var /* Function */                  defragment;
		var /* HTMLDivElement */            overlay;
		var /* Number */                    thread;
		var /* NodeList<HTMLDivElement> */  page;

		defragment = /* void */ function(/* void */)
		{
			var /* Number */                   index;
			var /* Number */                   length;
			var /* HTMLUListElement */         list;
			var /* NodeList<HTMLLIElement> */  project;

			if(thread != null)
			{
				clearInterval(thread);
				document.documentElement.scrollTop = 0;
			}
			if(overlay)
				overlay.parentNode.removeChild(overlay);
			window.onkeypress = null;
			length = (project = document.getElementsByClassName("project")).length;
			list = project[0].parentNode;
			for(index = 15; index < length; index++)
				list.appendChild(project[index]);
		};
		if((page = document.getElementsByClassName("page"))[page.length - 1].getAttribute("data-last_page") == "true")
			defragment();
		else
			if(document.getElementsByClassName("load_more")[2] && document.getElementsByClassName("load_more")[2].style.display != "none")
			{
				overlay = document.createElement("div");
				overlay.style.position = "fixed";
				overlay.style.left = overlay.style.top = overlay.style.right = overlay.style.bottom = 0;
				overlay.style.background = "rgba(255, 0, 0, .5)";
				overlay.style.lineHeight = window.innerHeight + "px";
				overlay.style.textAlign = "center";
				overlay.style.fontFamily = "sans-serif";
				overlay.style.fontSize = "20px";
				overlay.style.zIndex = 999;
				overlay.style.textShadow = "0 0 10px #fff, 0 0 10px #fff, 0 0 10px #fff, 0 0 30px #fff, 0 0 30px #fff, 0 0 50px #fff, 0 0 50px #fff, 0 0 50px #fff, 0 0 50px #fff, 0 0 50px #fff";
				overlay.appendChild(document.createTextNode("Please wait, initialising filter... (Press ESC to abort)"));
				document.body.appendChild(overlay);
				textbox.onfocus = null;
				window.onkeypress = /* void */ function(/* Event */ happening)
				{
					if(happening.keyCode == 27 && !happening.ctrlKey && !happening.altKey && !happening.shiftKey && !happening.metaKey)
					{
						happening.preventDefault();
						happening.stopPropagation();
						textbox.onfocus = initialise;
						textbox.blur();
						defragment();
					}
				};
				thread = setInterval(/* void */ function(/* void */)
				{
					if(document.getElementsByClassName("load_more")[2].style.display != "none")
						document.documentElement.scrollTop = document.documentElement.scrollHeight;
					else
					{
						defragment();
						textbox.onblur();
					}

					return;
				}, 1);
			}

		return;
	};
	textbox.style.position = "relative";
	textbox.style.top = "-4px";
	textbox.type = "text";
	container.appendChild(textbox);

	return;
})();
