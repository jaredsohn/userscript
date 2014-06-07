// ==UserScript==
// @name           Wer kennt wen? Gruppenforum
// @namespace      http://felix-kloft.invalid/werkenntwengruppenforum
// @description    Ermöglicht das Springen auf jede Seite eines Threads auf der Gruppenseite.
// @include        http://www.wer-kennt-wen.de/club/*
// @include        http://www.wer-kennt-wen.de/forum/*
// ==/UserScript==

(function()
{
	/* CSS */
	var css = "" + (<r><![CDATA[
.jumpTo
{
	padding:0!important;
	width:10em!important;
	font-size:1em!important;
	border:0px none
}
.jumpTo div.jumpToOuter
{
	overflow-x:scroll!important;
	width:10em!important;
	padding:3px!important;
}
.jumpTo div.jumpToOuter div.jumpToInner
{
	white-space:nowrap!important;
	font-size:1.25em!important;
}
.jumpTo span
{
	color:#A00!important;
	font-weight:bold!important;
}
.jumpTo div.jumpToOuter div.jumpToInner a
{
	color:#135AA0!important;
}
.jumpTo div.jumpToOuter div.jumpToInner a:visited
{
	color:#006!important;
}
.jumpTo.post
{
	width:auto!important;
	text-align:center!important;
	font-size:1em!important;
	margin-bottom:1em!important;
}
.jumpTo.post div.jumpToFast
{
	font-size:1.2em!important;
}
.jumpTo.post div.jumpToOuter
{
	width:auto!important;
	overflow-x:auto!important;
}
.jumpTo.post div.jumpToOuter div.jumpToInner *
{
	min-width:1.2em!important;
	display:inline-block!important;
	text-align:right!important;
	padding:0 1px!important;
}
#GM_gruppenforum, #GM_gruppenforum #GM_overlay
{
	position:fixed!important;
	top:0!important;
	bottom:0!important;
	left:0!important;
	right:0!important;
	width:100%!important;
	height:100%!important;
	margin:0!important;
	padding:0!important;
	border:0px none!important;
	background:none transparent!important;
	z-index:65536!important;
}
#GM_gruppenforum #GM_overlay
{
	background-color:#CCC!important;
	opacity:0.7!important;
	-moz-opacity:0.7!important;
}
#GM_gruppenforum fieldset
{
	z-index:65536!important;
	background:none white!important;
	position:fixed!important;
	width:25em!important;
	height:auto!important;
	margin:0 -12.5em!important;
	top:5em!important;
	left:50%!important;
	text-align:left!important;
	padding: 5px 10px 12px !important;
}
#GM_gruppenforum fieldset legend
{
	background-color:white!important;
	padding:0 2px !important;
}
#GM_gruppenforum fieldset label
{
	display:block!important;
}

]]></r>);
	
	if(GM_addStyle)
		GM_addStyle(css);
	else
	{
		var head = document.getElementsByTagName('head')[0];
		if(head)
		{
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = css;
			head.appendChild(style);
		}
	}
	
	/**********************************************************************/
	/* Konfiguration */
	var config = {};
	config.get = function(key)
	{
		switch(key.toLowerCase())
		{
			case "clubpage":
			case "anchors":
				return GM_getValue(key.toLowerCase(), 1)?true:false;
			case "threadpage":
				var val = parseInt(GM_getValue(key.toLowerCase(), 3));
				if(val<0)
					return 0;
				if(val>3)
					return 3;
				return val;
		}
	};
	
	config.open = function()
	{
		config.close();
		
		var form = document.body.insertBefore(document.createElement("form"), document.body.firstChild);
		form.id = "GM_gruppenforum";
		var overlay = form.appendChild(document.createElement("div"));
		overlay.id = "GM_overlay";
		
		var fieldset = form.appendChild(document.createElement("fieldset"));
		
		var legend = fieldset.appendChild(document.createElement("legend"));
		legend.appendChild(document.createTextNode("Wer kennt wen? Gruppenforum - Einstellungen"));
		
		var label = fieldset.appendChild(document.createElement("label"));
		var input = label.appendChild(document.createElement("input"));
		input.name = "clubpage";
		input.type = "checkbox";
		input.checked = config.get("clubpage");
		label.appendChild(document.createTextNode(" in der Forenübersicht"));
		
		fieldset.appendChild(document.createElement("br"));
		fieldset.appendChild(document.createTextNode("In der Threadansicht anzeigen"));
		
		var label = fieldset.appendChild(document.createElement("label"));
		var input = label.appendChild(document.createElement("input"));
		input.name = "threadpage";
		input.type = "radio";
		input.checked = config.get("threadpage")==0?true:false;
		label.appendChild(document.createTextNode(" gar nicht (normale Anzeige)"));
		
		var label = fieldset.appendChild(document.createElement("label"));
		var input = label.appendChild(document.createElement("input"));
		input.name = "threadpage";
		input.type = "radio";
		input.checked = config.get("threadpage")==1?true:false;
		label.appendChild(document.createTextNode(" oben"));
		
		var label = fieldset.appendChild(document.createElement("label"));
		var input = label.appendChild(document.createElement("input"));
		input.name = "threadpage";
		input.type = "radio";
		input.checked = config.get("threadpage")==2?true:false;
		label.appendChild(document.createTextNode(" unten"));
		
		var label = fieldset.appendChild(document.createElement("label"));
		var input = label.appendChild(document.createElement("input"));
		input.name = "threadpage";
		input.type = "radio";
		input.checked = config.get("threadpage")==3?true:false;
		label.appendChild(document.createTextNode(" oben und unten"));
		
		fieldset.appendChild(document.createElement("br"));
		
		var label = fieldset.appendChild(document.createElement("label"));
		var input = label.appendChild(document.createElement("input"));
		input.name = "anchors";
		input.type = "checkbox";
		input.checked = config.get("anchors");
		label.appendChild(document.createTextNode(" Links nach oben/unten auf Threadseiten"));
		
		fieldset.appendChild(document.createElement("br"));
		
		var button = fieldset.appendChild(document.createElement("input"));
		button.type = "button";
		button.value = "Speichern";
		button.addEventListener("click", config.save, false);
		
		fieldset.appendChild(document.createTextNode(" "));
		
		var button = fieldset.appendChild(document.createElement("input"));
		button.type = "button";
		button.value = "Abbrechen";
		button.addEventListener("click", config.close, false);
	};
	
	config.close = function()
	{
		if(!document.getElementById("GM_gruppenforum"))
			return;
		
		var form = document.getElementById("GM_gruppenforum");
		form.parentNode.removeChild(form);
	};
	
	config.save = function()
	{
		if(!document.getElementById("GM_gruppenforum"))
			return;
		
		var i=0;
		var form = document.getElementById("GM_gruppenforum");
		
		if(form.elements[++i])
			GM_setValue("clubpage", form.elements[i].checked);
		
		if(form.elements[++i].checked)
			GM_setValue("threadpage", 0);
		if(form.elements[++i].checked)
			GM_setValue("threadpage", 1);
		if(form.elements[++i].checked)
			GM_setValue("threadpage", 2);
		if(form.elements[++i].checked)
			GM_setValue("threadpage", 3);
		
		if(form.elements[++i])
			GM_setValue("anchors", form.elements[i].checked);
		
		if(confirm("Änderungen werden erst nach dem Neuladen einer Seite angewendet!\nMöchten Sie die Seite jetzte neuladen?"))
			location.reload();
		config.close();
	};
	
	GM_registerMenuCommand("Gruppenforum - Einstellungen", config.open);
	
	/**********************************************************************/
	/* Hauptskript */
	
	function proceedOverviewRow(row)
	{
		if(!(row.className == "normal" || row.className == "odd"))
			return;
		
		var max = Math.ceil((parseInt(row.cells[2].textContent)+1)/10);
		var cell = row.insertCell(-1);
		cell.className = "jumpTo overview";
		
		var outer = cell.appendChild(document.createElement("div"));
		outer.className = "jumpToOuter";
		
		var inner = outer.appendChild(document.createElement("div"));
		inner.className = "jumpToInner";
		
		var base = row.getElementsByTagName("a")[0].href + "/page/";
		
		for(var i=1;i<=max;i++)
		{
			var link = inner.appendChild(document.createElement("a"));
			
			link.href = base + i;
			link.appendChild(document.createTextNode(i));
			
			inner.appendChild(document.createTextNode(" "));
		}
		
		// Nach rechts scrollen
		outer.scrollLeft = outer.scrollWidth;
	}
	
	
	
	function writeNavigation(max)
	{
		if(!location.href.match(/showThread\/([a-zA-Z0-9]+)(\/|\?|$)/))
			return;
		var id = RegExp.$1;
		
		if(location.href.match(/page\/(\d+)(\/|\?|$)/))
			var page = parseInt(RegExp.$1);
		else
			var page = 1;
		var page = parseInt(page);
		
		var main = document.createElement("div")
		main.className = "jumpTo post";
		
		var base = "http://www.wer-kennt-wen.de/forum/showThread/"+id+"/page/"
		
		var makeLink = function(label, href)
		{
			if(typeof href=="undefined" || href<0)
			{
				var el = document.createElement("span");
			}
			else
			{
				var el = document.createElement("a");
				el.href = href;
			}
			el.appendChild(document.createTextNode(label));
			return el;
		}
		
		
		var fast = main.appendChild(document.createElement("div"));
		fast.className = "jumpToFast";
		
		fast.appendChild(makeLink("⇤", (1 >= page) ? -1 : base + "1"));
		fast.appendChild(document.createTextNode("   "));
		fast.appendChild(makeLink("←", (1 >= page) ? -1 : base + (page-1)));
		fast.appendChild(document.createTextNode("   "));
		fast.appendChild(makeLink("|", -1)).className = "current";
		fast.appendChild(document.createTextNode("   "));
		fast.appendChild(makeLink("→", (max <= page) ? -1 : base + (page+1)));
		fast.appendChild(document.createTextNode("   "));
		fast.appendChild(makeLink("⇥", (max <= page) ? -1 : base + max));
		
		var outer = main.appendChild(document.createElement("div"));
		outer.className = "jumpToOuter";
		
		var inner = outer.appendChild(document.createElement("div"));
		inner.className = "jumpToInner";
		
		for(var i=1;i<=max;i++)
		{
			inner.appendChild(makeLink(i, (i == page) ? -1 : base + i));
			inner.appendChild(document.createTextNode(" "));
		}
		
		
		var content = document.getElementById("content");
		
		var main2 = main.cloneNode(true);
		
		var allP = content.getElementsByTagName("p");
		var p;
		// Alte Navigation entfernen
		for(var i=0;p=allP[i];i++)
		{
			if(p.className == "pagination")
				content.removeChild(p);
		}
		
		if(config.get("threadpage")==1 || config.get("threadpage")==3)
		{
			if(config.get("anchors"))
			{
				var el = main2.firstChild.getElementsByClassName("current")[0];
				var link = document.createElement("a");
				link.href = location.href;
				link.hash = "#";
				link.appendChild(document.createTextNode("↓"));
				
				link.addEventListener("click", function(e)
				{
					window.scrollTo(0, window.scrollMaxY);
					e.preventDefault();
					return false;
				}, false);
				el.parentNode.replaceChild(link, el);
			}
			
			content.insertBefore(main2, content.getElementsByTagName("h2")[0].nextSibling);
			// Nach rechts scrollen
			main2.lastChild.scrollLeft = main2.lastChild.scrollWidth;
		}
		
		if(config.get("threadpage")==2 || config.get("threadpage")==3)
		{
			if(config.get("anchors"))
			{
				var el = main.firstChild.getElementsByClassName("current")[0];
				var link = document.createElement("a");
				link.href = location.href;
				link.hash = "#";
				link.appendChild(document.createTextNode("↑"));
				el.parentNode.replaceChild(link, el);
			}
			
			content.appendChild(main);
			// Nach rechts scrollen
			main.lastChild.scrollLeft = main.lastChild.scrollWidth;
		}
	}
	
	
	if(!document.getElementById("content"))
		return;
	
	/* Übersicht */
	if(document.getElementById("forum_threads") && config.get("clubpage"))
	{
		var table = document.getElementById("forum_threads");
		table.rows[0].appendChild(document.createElement("th")).appendChild(document.createTextNode("Seite"))
		var row;
		for(var i=1;row=table.rows[i];i++)
		{
			proceedOverviewRow(row);
		}
	}
	
	
	if(config.get("threadpage")!=0
	&& document.getElementById("content")
	&& document.getElementById("content").getElementsByTagName("h2")[0]
	&& document.getElementById("content").getElementsByTagName("h2")[0].textContent.match(/Beiträge/))
	{
		/* Wir sind auf einer Postseite */
		var p = document.getElementById("content").getElementsByTagName("p");
		if(p)
		{
			var pages = p[p.length-1].textContent.match(/\d+/g)
			if(pages)
			{
				writeNavigation(pages[pages.length-1]);
			}
		}
	}
})();
