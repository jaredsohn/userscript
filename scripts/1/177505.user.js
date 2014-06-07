// ==UserScript==
// @name          Center Image
// @namespace     CenterImage
// @author        Owyn
// @version       1.5
// @updateURL     https://userscripts.org/scripts/source/177505.user.js
// @downloadURL   https://userscripts.org/scripts/source/177505.user.js
// @homepage      https://userscripts.org/scripts/show/177505
// @description   Centers images with hotkeys
// @run-at        document-start
// @noframes
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_registerMenuCommand
// @match         http://*/*
// @match         https://*/*
// @match         file://*/*
// ==/UserScript==

if (typeof GM_registerMenuCommand !== "undefined")
{
	GM_registerMenuCommand("Center Image Configuration", cfg, "n");
}

var images = document.images;
if (!images || images.length !== 1 || images[0].src !== location.href) 
{
	return false;
}

var rescaled = false;
var iot = 0, iol = 0;
var img = images[0];

function makeimage()
{
	if(cfg_bgclr)
	{
		document.body.bgColor = cfg_bgclr;
		if(document.head){document.head.innerHTML = "";} // remove FireFox background
	}
	document.body.innerHTML = "<style>img { position: absolute; top: 0; right: 0; bottom: 0; left: 0; }</style>"; // center image
	img.id = "resizing";
	img.style.margin = "auto"; // center image
	document.body.style.margin = "0px";
	document.body.appendChild(img);
	img.addEventListener("mousedown", onmousedown, true);
	img.addEventListener("click", rescale, true);
	window.addEventListener("keydown", onkeydown, true);
	window.addEventListener("resize", onresize, true);
	autoresize();
}

function onresize()
{
	if(rescaled)
	{
		rescaled = false;
		rescale();
	}
}

function changecursor()
{
	img.style.margin = "auto";
	var root = document.compatMode=='BackCompat'? document.body : document.documentElement;
	var CH = root.clientHeight;
	if(CH == 0){CH = document.compatMode=='BackCompat'? document.documentElement.clientHeight : document.body.clientHeight;} // StupidFox
	if(!rescaled && ((img.naturalHeight == CH) || (img.naturalWidth == root.clientWidth)) && ((CH == root.scrollHeight) && (root.clientWidth == root.scrollWidth)) ) // no scrollbars and one img dimension is equal to screen
	{
		img.style.cursor = "";
	}
	else if((img.naturalHeight > CH) || (img.naturalWidth > root.clientWidth))
	{
		if(rescaled)
		{
			img.style.cursor = "-moz-zoom-in";
			img.style.cursor = "-webkit-zoom-in";
		}
		else
		{
			img.style.cursor = "-moz-zoom-out";
			img.style.cursor = "-webkit-zoom-out";
			if(img.naturalHeight > CH) // chrome bug fuuuuu
			{
				img.style.margin = "0px auto";
			}
		}
	}
	else
	{
		if(rescaled)
		{
			img.style.cursor = "-moz-zoom-out";
			img.style.cursor = "-webkit-zoom-out";
		}
		else
		{
			img.style.cursor = "-moz-zoom-in";
			img.style.cursor = "-webkit-zoom-in";
		}
	}
}

function onmousedown(event)
{
	if(img.offsetLeft > 0){iol = img.offsetLeft;}
	if(img.offsetTop > 0){iot = img.offsetTop;}
}

function rescale(event)
{
	if(rescaled)
	{
		rescaled = false;
		var scale;
		if(event != 0)
		{
			if (typeof event.y === "undefined") // Firefox
			{
				ex = event.clientX;
				ey = event.clientY;
			}
			else
			{
				ex = event.x;
				ey = event.y;
			}
			ex -= iol;
			ey -= iot;
			scale = Math.min((window.innerWidth / img.naturalWidth), (window.innerHeight / img.naturalHeight));
		}
		img.removeAttribute("style");
		img.removeAttribute("width");
		img.removeAttribute("height");
		changecursor();
		if(event != 0)
		{
			window.scrollTo(ex / scale - window.innerWidth / 2, ey / scale - window.innerHeight / 2);
		}
	}
	else
	{
		img.removeAttribute("width");
		img.removeAttribute("height");
		img.removeAttribute("style");
		if(img.naturalWidth != window.innerWidth)
		{
			img.style.width = window.innerWidth + "px";
			rescaled = true;
		}
		var root = document.compatMode=='BackCompat'? document.body : document.documentElement;
		if((root.scrollHeight != root.clientHeight) || (root.scrollWidth != root.clientWidth))
		{
			img.removeAttribute("style");
			if(img.naturalHeight != window.innerHeight)
			{
				img.style.height = window.innerHeight + "px";
				rescaled = true;
			}
		}
		changecursor();
	}
}

function autoresize()
{
	if(img.naturalWidth != 0) // stupidfox
	{
		if(!document.head) // old fix for old chrome - let it be
		{
			document.lastChild.insertBefore(document.createElement("head"), document.body);
		}
		var link = document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = img.src;
		document.head.appendChild(link); // favicon
		var title = img.src.substr(img.src.lastIndexOf("/")+1);
		if(title.indexOf("?") != -1)
		{
			title = title.substr(0, title.indexOf("?"));
		}
		document.title = title + " (" + img.naturalWidth + "x" + img.naturalHeight + ")"; // title
		
		var root = document.compatMode=='BackCompat'? document.body : document.documentElement;
		if(img.naturalHeight > root.clientHeight && img.naturalWidth > root.clientWidth) // both scrollbars
		{
			rescaled = true;
			if(!cfg_fitWH)
			{
				rescale(0);
			}
			else
			{
				changecursor();
			}
		}
		else if(img.naturalHeight > root.clientHeight || img.naturalWidth > root.clientWidth) // one scrollbar
		{
			rescaled = true;
			if(!cfg_fitB)
			{
				rescale(0);
			}
			else
			{
				changecursor();
			}
		}
		else // no scrollbars
		{
			if(cfg_fitS)
			{
				rescale(0);
			}
			else
			{
				changecursor();
			}
		}
		if(cfg_js){eval(cfg_js);}
	}
	else
	{
		setTimeout(function() { autoresize(); }, 10);
	}
}

// hotkeys
if (typeof KeyEvent === "undefined")
{
	var KeyEvent = {
		DOM_VK_SPACE: 32,
		DOM_VK_LEFT: 37,
		DOM_VK_UP: 38,
		DOM_VK_RIGHT: 39,
		DOM_VK_DOWN: 40,
		DOM_VK_A: 65,
		DOM_VK_D: 68,
		DOM_VK_P: 80,
		DOM_VK_Q: 81,
		DOM_VK_S: 83,
		DOM_VK_W: 87,
		DOM_VK_NUMPAD2: 98,
		DOM_VK_NUMPAD4: 100,
		DOM_VK_NUMPAD5: 101,
		DOM_VK_NUMPAD6: 102,
		DOM_VK_NUMPAD8: 104
	};
}

function cancelEvent(a)
{
	a = a ? a : window.event;
	if (a.stopPropagation)
	{
		a.stopPropagation();
	}
	if (a.preventDefault)
	{
		a.preventDefault();
	}
	a.cancelBubble = true;
	a.cancel = true;
	a.returnValue = false;
	return false;
}

function scroll_space(a, b)
{
	var by = Math.round((b ? window.innerHeight : window.innerWidth) * 0.50 * (a ? -1 : 1));
	if(!b)
	{
		window.scrollBy(0, by);
	}
	else
	{
		window.scrollBy(by, 0);
	}
}

function onkeydown (b)
{
	var a = (window.event) ? b.keyCode : b.which;
	
	if (a != KeyEvent.DOM_VK_SPACE && (b.altKey || b.ctrlKey || b.metaKey))
	{
		return;
	}
	
	var by = Math.round(window.innerHeight * 0.10);
	
	switch (a)
	{
	case KeyEvent.DOM_VK_RIGHT:
	case KeyEvent.DOM_VK_D:
	case KeyEvent.DOM_VK_NUMPAD6:
		window.scrollBy(by, 0);
		cancelEvent(b);
		break;
	case KeyEvent.DOM_VK_LEFT:
	case KeyEvent.DOM_VK_A:
	case KeyEvent.DOM_VK_NUMPAD4:
		window.scrollBy(by * -1, 0);
		cancelEvent(b);
		break;
	case KeyEvent.DOM_VK_W:
	case KeyEvent.DOM_VK_NUMPAD8:
		window.scrollBy(0, by * -1);
		cancelEvent(b);
		break;
	case KeyEvent.DOM_VK_S:
	case KeyEvent.DOM_VK_NUMPAD2:
		window.scrollBy(0, by);
		cancelEvent(b);
		break;
	case KeyEvent.DOM_VK_SPACE:
		scroll_space(b.shiftKey, b.ctrlKey);
		cancelEvent(b);
		break;
	case KeyEvent.DOM_VK_Q:
	case KeyEvent.DOM_VK_NUMPAD5:
		rescale(0);
		cancelEvent(b);
		break;
	case KeyEvent.DOM_VK_P:
		cfg();
		cancelEvent(b);
	}
}

var cfg_bgclr;
var cfg_fitWH = true;
var cfg_fitB = true;
var cfg_fitS;
var cfg_js;
if (typeof GM_getValue !== "undefined")
{
	cfg_bgclr = GM_getValue("bgColor");
	cfg_fitWH = GM_getValue("fitWH", true);
	cfg_fitB = GM_getValue("fitB", true);
	cfg_fitS = GM_getValue("fitS");
	cfg_js = GM_getValue("js");
}

function $(id) {return document.getElementById(id);} // for StupidFox

function cfg()
{
	if (typeof GM_setValue !== "undefined")
	{
		function saveCfg()
		{
			GM_setValue("bgColor", $("ci_cfg_2_bgclr").value);
			GM_setValue("fitWH", $("ci_cfg_3_fitWH").checked);
			GM_setValue("fitB", $("ci_cfg_4_fitB").checked);
			GM_setValue("fitS", $("ci_cfg_5_fitS").checked);
			GM_setValue("js", $("ci_cfg_6_js").value);
			alert("Configuration Saved");
			if($("ci_cfg_2_bgclr").value){document.body.bgColor = $("ci_cfg_2_bgclr").value;}else{document.body.removeAttribute("bgColor");}
		}
		if(img){img.removeEventListener("click", rescale, true);}
		window.removeEventListener("keydown", onkeydown, true);
		if(document.head){document.head.innerHTML = "";}
		document.body.innerHTML = "";
		var div = document.createElement("div");
		div.style.margin = "11% auto";
		div.style.width = "444px";
		div.style.border = "solid 1px black";
		div.style.background = "silver";
		div.innerHTML = "<b><center>Configuration</center></b>"
		+ "<br><input id='ci_cfg_2_bgclr' type='text' size='6'> Background color (empty = default)"
		+ "<br><br>Fit to window images:"
		+ "<br><br><input id='ci_cfg_3_fitWH' type='checkbox'> Larger than window both vertically and horizontally"
		+ "<br><br><input id='ci_cfg_4_fitB' type='checkbox'> Larger than window either vertically or horizontally"
		+ "<br><br><input id='ci_cfg_5_fitS' type='checkbox'> Smaller than window"
		+ "<br><br><center>Custom JS Action:<textarea id='ci_cfg_6_js' style='margin: 0px; width: 400px; height: 50px;'></textarea>"
		+ "<br><input id='ci_cfg_save' type='button' value='Save configuration'></center>";
		document.body.appendChild(div);
		$("ci_cfg_2_bgclr").value = GM_getValue("bgColor", "");
		$("ci_cfg_3_fitWH").checked = GM_getValue("fitWH", true);
		$("ci_cfg_4_fitB").checked = GM_getValue("fitB", true);
		$("ci_cfg_5_fitS").checked = GM_getValue("fitS");
		$("ci_cfg_6_js").value = GM_getValue("js", "");
		$("ci_cfg_save").addEventListener("click", saveCfg, true);
	}
	else
	{
		alert("Sorry, Chrome userscripts in native mode can't have configurations! Install TamperMonkey extension. (it's very good)");
	}
}
	
makeimage();
