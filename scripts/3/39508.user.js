// ==UserScript==
// @name			Facepunch: Thread Stuff
// @description		Adds a few things to thread view
// @author			Vampired (http://forums.facepunchstudios.com/Vampired)
// @include			http://forums.facepunchstudios.com/showthread.php*
// @version			1.0
// ==/UserScript==

/*
Features

* Fixes annoying page scroll thing.
* Adds collapsing lua/code boxes (Mouse over to show menu).
* Resizes big images to fit in browser window.
* Opening a media player closes all others unless control is held.
* Changes page navigation to a dropdown menu. Makes Prev and Next buttons easier to click.

*/

function $(id)
{
	return typeof id == "string" ? document.getElementById(id) : id;
}

function $x(xpath)
{
	var item, arr = [], xpr = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i = 0; item = xpr.snapshotItem(i); i++)
		arr.push(item);
	return arr;
}

function $A(iterable)
{
	if (!iterable) return [];
	if (iterable.toArray) return iterable.toArray();
	var length = iterable.length || 0, results = new Array(length); 
	while (length--) results[length] = iterable[length];
	return results;
}
var Event = {
	add: function(t, ev, fn) { $(t).addEventListener(ev, fn, false) },
	remove: function(t, ev, fn) { $(t).removeEventListener(ev, fn, false) }
};
var Dom = {
	add: function(dest, type)
	{
		var el = document.createElement(type);
		var dest = $(dest);
		dest.appendChild(el);
		return el;
	},
	addAfter: function(dest, type)
	{
		var dest = $(dest);
		var parent = dest.parentNode;
		
		var newel = document.createElement( type );
		parent.insertBefore(newel, dest.nextSibling)
		return newel;
	},
	addText: function(dest, text)
	{
		var node = document.createTextNode(text);
		var dest = $(dest);
		dest.appendChild(node);
		return node;
	},
	remove: function(el)
	{
		var el = $(el);
		el.parentNode.removeChild(el);
	},
	removeAll: function(el)
	{
		el = $(el);
		if(el.hasChildNodes())
		{
			while(el.childNodes.length >= 1)
				Dom.remove(el.firstChild);
		}
	}
}

Function.prototype.bind = function()
{
	var __method = this, args = $A(arguments), object = args.shift();
	return function()
	{
		return __method.apply(object, args.concat($A(arguments)));
	}
} 

var CODEBOX_NORMAL = 0;
var CODEBOX_HIDDEN = 1;
var CODEBOX_TEXTBOX = 2;

var CODEBOX_LUA = 1;
var CODEBOX_CODE = 2;


// Images
// http://www.greywyvern.com/code/php/binary2base64

var pencil = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFUSURBVDjLrZM/SAJxGIZdWwuDlnCplkAEm1zkaIiGFFpyMIwGK5KGoK2lphDKkMDg3LLUSIJsSKhIi+684CokOtTiMizCGuzEU5K3vOEgKvtBDe/2Pc8H3x8NAM1fQlx4H9M3pcOWp6TXWmM8A7j0629v1nraiAVC0IrrwATKIgs5xyG5QiE+Z4iQdoeU2oAsnqCSO1NSTu+D9VhqRLD8nIB8F0Q2MgmJDyipCzjvYJkIfpN2UBLG8MpP4dxvQ3ZzGuyyBQ2H+AnOOCBd9aL6soh81A5hyYSGWyCFvxUcerqI4S+CvYVOFPMHxLAq8I3qdHVY5LbBhJzEsCrwutpRFBlUHy6wO2tEYtWAzLELPN2P03kjfj3luqDycV2F8AgefWbEnVqEHa2IznSD6BdsVDNStB0lfh0FPoQjdx8RrAqGzC0YprSgxzsUMOY2bf37N/6Ud1Vc9yYcH50CAAAAAElFTkSuQmCC";
var exclamation = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJPSURBVDjLpZPLS5RhFMYfv9QJlelTQZwRb2OKlKuINuHGLlBEBEOLxAu46oL0F0QQFdWizUCrWnjBaDHgThCMoiKkhUONTqmjmDp2GZ0UnWbmfc/ztrC+GbM2dXbv4ZzfeQ7vefKMMfifyP89IbevNNCYdkN2kawkCZKfSPZTOGTf6Y/m1uflKlC3LvsNTWArr9BT2LAf+W73dn5jHclIBFZyfYWU3or7T4K7AJmbl/yG7EtX1BQXNTVCYgtgbAEAYHlqYHlrsTEVQWr63RZFuqsfDAcdQPrGRR/JF5nKGm9xUxMyr0YBAEXXHgIANq/3ADQobD2J9fAkNiMTMSFb9z8ambMAQER3JC1XttkYGGZXoyZEGyTHRuBuPgBTUu7VSnUAgAUAWutOV2MjZGkehgYUA6O5A0AlkAyRnotiX3MLlFKduYCqAtuGXpyH0XQmOj+TIURt51OzURTYZdBKV2UBSsOIcRp/TVTT4ewK6idECAihtUKOArWcjq/B8tQ6UkUR31+OYXP4sTOdisivrkMyHodWejlXwcC38Fvs8dY5xaIId89VlJy7ACpCNCFCuOp8+BJ6A631gANQSg1mVmOxxGQYRW2nHMha4B5WA3chsv22T5/B13AIicWZmNZ6cMchTXUe81Okzz54pLi0uQWp+TmkZqMwxsBV74Or3od4OISPr0e3SHa3PX0f3HXKofNH/UIG9pZ5PeUth+CyS2EMkEqs4fPEOBJLsyske48/+xD8oxcAYPzs4QaS7RR2kbLTTOTQieczfzfTv8QPldGvTGoF6/8AAAAASUVORK5CYII%3D";
var page_white_text = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADoSURBVBgZBcExblNBGAbA2ceegTRBuIKOgiihSZNTcC5LUHAihNJR0kGKCDcYJY6D3/77MdOinTvzAgCw8ysThIvn/VojIyMjIyPP+bS1sUQIV2s95pBDDvmbP/mdkft83tpYguZq5Jh/OeaYh+yzy8hTHvNlaxNNczm+la9OTlar1UdA/+C2A4trRCnD3jS8BB1obq2Gk6GU6QbQAS4BUaYSQAf4bhhKKTFdAzrAOwAxEUAH+KEM01SY3gM6wBsEAQB0gJ+maZoC3gI6iPYaAIBJsiRmHU0AALOeFC3aK2cWAACUXe7+AwO0lc9eTHYTAAAAAElFTkSuQmCC";


//
// Collapsable code box
//

var CodeBoxes = {
	menubar: null,	// menubar div
	current: null,	// current codebox mouse over
	
	init: function()
	{
		// Lua code boxes
		// All divs with class = code
		var codes = $x("//div[@class='code']");
		
		for(var i=0; i<codes.length; i++)
		{
			var inner = codes[i].getElementsByClassName("lua")[0]; // should only be one element with class=lua
			
			// Store the actual code in a variable.
			// textContent gets the actual text content stripped of HTML and the like.
			codes[i].v_code = inner.textContent;
			
			codes[i].v_style = CODEBOX_NORMAL;
			codes[i].v_type = CODEBOX_LUA;
			
			Event.add(codes[i], "mouseover", this.event_mouseover.bind(this, codes[i]));
			Event.add(codes[i], "mouseout", this.event_mouseout.bind(this, codes[i]));
		}
		
		// Code code boxes
		// All pre elements with class = code
		var codes = $x("//pre[@class='code']");
		
		for(var i=0; i<codes.length; i++)
		{
			// Store the actual code in a variable.
			// textContent gets the actual text content stripped of HTML and the like.
			codes[i].v_code = codes[i].textContent;
			
			codes[i].v_style = CODEBOX_NORMAL;
			codes[i].v_type = CODEBOX_CODE;
			
			// We put all code inside a span so we can reference it similar to a Lua box.
			codes[i].innerHTML = "<span>"+codes[i].innerHTML+"</span>";
			codes[i].style.paddingTop = "30px";
			
			Event.add(codes[i], "mouseover", this.event_mouseover.bind(this, codes[i]));
			Event.add(codes[i], "mouseout", this.event_mouseout.bind(this, codes[i]));
		}
		
		
		GM_addStyle([
		"#codeboxes_menubar{ position:absolute; display:none; background-color:#DDDDDD; font-family:verdana; padding:1px; margin:1px }",
		"#codeboxes_menubar ul{ padding:0px; margin:0px }",
		"#codeboxes_menubar li{ list-style: none; float:left; margin:2px; }",
		
		".codeboxes_textbox{ margin-top:20px; width:100%; height:200px; }",
		].join(""));
		
		// Menu bar
		
		this.menubar = Dom.add(document.body, "div");
		this.menubar.id = "codeboxes_menubar";
		
		this.menubar.innerHTML = [
		"<ul>",
		"<li><a href=\"javascript:;\" id=\"codebar0\"><img src=\""+exclamation+"\" title=\"Hide\"></a></li>",
		"<li><a href=\"javascript:;\" id=\"codebar1\"><img src=\""+page_white_text+"\" title=\"Show\"></a></li>",
		"<li><a href=\"javascript:;\" id=\"codebar2\"><img src=\""+pencil+"\" title=\"Textbox\"></a></li>",
		"</ul>",
		].join("");
		
		Event.add("codebar0", "click", this.event_click0.bind(this));
		Event.add("codebar1", "click", this.event_click1.bind(this));
		Event.add("codebar2", "click", this.event_click2.bind(this));
		
	},
	
	hideCode: function(codebox)
	{
		// Hide all elements inside
		for(var i=0; i<codebox.childNodes.length; i++)
			if(codebox.childNodes[i].nodeType == 1)
				codebox.childNodes[i].style.display = "none";
	},
	showCode: function(codebox)
	{
		// Show all elements inside
		for(var i=0; i<codebox.childNodes.length; i++)
			if(codebox.childNodes[i].nodeType == 1)
				codebox.childNodes[i].style.display = "";
			
	},
	
	event_click0: function(ev)
	{
		this.current.v_style = CODEBOX_HIDDEN;
		
		// Remove textbox if exists
		if(this.current.v_textbox)
		{
			Dom.remove(this.current.v_textbox);
			this.current.v_textbox = null;
		}
		
		this.hideCode(this.current);
	},
	event_click1: function(ev)
	{
		this.current.v_style = CODEBOX_NORMAL;
		
		// Remove textbox if exists
		if(this.current.v_textbox)
		{
			Dom.remove(this.current.v_textbox);
			this.current.v_textbox = null;
		}
		
		this.showCode(this.current);
	},
	event_click2: function(ev)
	{
		this.current.v_style = CODEBOX_TEXTBOX;
		this.hideCode(this.current);
		
		// Create an editting textbox and assign it to a code box
		
		if(!this.current.v_textbox)
		{
			var textbox = Dom.add(this.current, "textarea");
			textbox.className = "codeboxes_textbox";
			
			textbox.value = this.current.v_code;
			textbox.focus();
			textbox.select();
			
			this.current.v_textbox = textbox;
		}
		
	},
	
	event_mouseover: function(codebox, ev)
	{
		codebox.appendChild(this.menubar);
		
		this.menubar.style.left = codebox.offsetLeft+"px";
		this.menubar.style.top = codebox.offsetTop+"px";
		this.menubar.style.display = "block";
		
		this.current = codebox;
	},
	
	event_mouseout: function(codebox, ev)
	{
		this.menubar.style.display = "none";
		this.current = null;
	},
}

//
// Image Resize
//

ImageResize = {
	on: true,
	
	init: function()
	{
		if(!this.on) return;
		
		Event.add(window, "resize", this.event_resize.bind(this));
		this.updateImages();
	},
	
	toggle: function()
	{
		this.on = !this.on;
	},
	
	updateImages: function()
	{
		if(!this.on) return;
		
		var pageWidth = document.documentElement.clientWidth;
		
		var images = $x("//img[@class='bbimg']");
		for(var i=0; i<images.length; i++)
		{
			var neww = pageWidth - images[i].offsetLeft - 20;
			if(images[i].naturalWidth > neww)
				images[i].width = neww;
			else if(images[i].width < images[i].naturalWidth)
				images[i].width = images[i].naturalWidth;
		}
		
	},
	
	// Events ////////
	
	event_resize: function(ev)
	{
		this.updateImages();
	}
}

//
// Media Player Toggle
//

var MediaPlayerToggle = {

	currentMedia: [],	// array of media players open
	controlPressed: false,	// if control key is pressed
	
	init: function()
	{
		
		//var obj = ;
		
		// Overwrite PlayMedia function
		unsafeWindow.PlayMedia = function(id) { }
		
		var divs = $x("//div[starts-with(@id,'mediabuttons_')]");
		
		for(var i=0; i<divs.length; i++)
		{
			var id = divs[i].id.substr("mediabuttons_".length);
			Event.add(divs[i], "click", this.event_click.bind(this, id));
		}
		
		
		Event.add(window, "keydown", this.event_keydown.bind(this));
		Event.add(window, "keyup", this.event_keyup.bind(this));
	},
	
	event_click: function(id, ev)
	{
		
		// If control key isn't held
		if(!this.controlPressed)
		{
			// Loop all open media windows and close them
			for(var i=0; i<this.currentMedia.length; i++)
			{
				$("mediabuttons_"+this.currentMedia[i]).style.display = "block";
				$("mediadiv_"+this.currentMedia[i]).style.display = "none";
			}
			
			// Empty list
			this.currentMedia = [];
		}
		
		// Open the one we clicked
		
		$("mediabuttons_"+id).style.display = "none";
		$("mediadiv_"+id).style.display = "inline";
		
		// Add to list
		
		this.currentMedia.push(id);
			
	},
	
	event_keyup: function(ev)
	{
		if(ev.keyCode == 17) // control
			this.controlPressed = false;
	},
	
	event_keydown: function(ev)
	{
		if(ev.keyCode == 17) // control
			this.controlPressed = true;
	}

}



//
// Better Page Nav
//

var PageNav = {
	threadid: null,
	
	init: function()
	{
		var divs = $x("//div[@class='pagenav']");
		
		if(!divs[0])
		{
			// Single page thread
			return;
		}
		
		var m = divs[0].innerHTML.match(/Page ([0-9]+) of ([0-9]+)/);
		var currentpage = Number(m[1]);
		var totalpages = Number(m[2]);
		
		var m = divs[0].innerHTML.match(/showthread\.php\?t=([0-9]+)/);
		this.threadid = m[1];
		
		var prevpage = "showthread.php?t="+this.threadid + (currentpage > 2 ? "&page="+(currentpage-1) : "");
		var nextpage = "showthread.php?t="+this.threadid+"&page="+(currentpage+1);
		
		var options = "";
		for(var i=1; i<=totalpages; i++)
		{
			options += "<option"+(i==currentpage ? " selected=true style=\"font-weight:bold\"" : "")+">"+i+"</option>"
		}
		
		var html = ["<table cellspacing=\"1\" cellpadding=\"3\" border=\"0\" class=\"tborder\">",
		"<tbody><tr>",
		//"<td style=\"font-weight: normal;\" class=\"vbmenu_control\">Page "+currentpage+" of "+totalpages+"</td>",
		(currentpage > 1 ? "<td class=\"alt1\"><a title=\"Prev Page\" href=\""+prevpage+"\" class=\"smallfont\" style=\"padding:2px\">< Prev Page</a></td>" : ""),
		"<td class=\"alt2\"><select onchange=\"pagenav_selectChange(this)\">"+options+"</select> of "+totalpages+"</td>",
		(currentpage < totalpages ? "<td class=\"alt1\"><a title=\"Next Page\" href=\""+nextpage+"\" class=\"smallfont\" style=\"padding:2px\">Next Page></a></td>" : ""),
		
		"</tr></tbody></table>"].join("");
		
		for(var i=0; i<divs.length; i++)
		{
			
			var div = Dom.addAfter(divs[i], "div");
			div.setAttribute("align", "right");
			div.innerHTML = html;
			
			divs[i].style.display = "none";
		}
		
		unsafeWindow.pagenav_selectChange = this.event_selectChange.bind(this);
	},
	
	// Events
	
	
	event_selectChange: function(selectobj)
	{
		window.location.href = "showthread.php?t="+this.threadid+"&page="+selectobj.value;
	},
}


// 
// Misc Stuff
//


var MiscStuff = {
	init: function()
	{
		// Fixes annoying scrolling thing.
		document.body.setAttribute("onload","");
	},
}




CodeBoxes.init();
ImageResize.init();
MediaPlayerToggle.init();
PageNav.init();
MiscStuff.init();