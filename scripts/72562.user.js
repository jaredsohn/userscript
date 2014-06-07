// ==UserScript==
// @name           Endless E-hentai Pages with 1 second autoadd
// @namespace      http://userscripts.org/scripts/show/68601
// @description    View everything on g.e-hentai.org on a single endless page.
// @include        http://g.e-hentai.org/*
// ==/UserScript==

if(parent.location != window.location)
	return;

///////////////////FUNCTIONS////////////////////////////////////////////////////////////////////

function jumpTo(element) //Jump to a given element
	{
	if(element != null)
		window.scrollTo(0, element.offsetTop);
	}

///////////////////////////////////////////////////////////////////////////////////////////////

/*function newTabifyLinks(container) //Make links open in a new tab
	{
	var links = container.getElementsByTagName("a");

	for(var i = 0; i < links.length; i++)
		links[i].setAttribute("target", "_blank");
	}*/

///////////////////////////////////////////////////////////////////////////////////////////////

function setManual() //Set load mode to manual
	{
	mode = "manual";
	
	window.addEventListener("keypress", checkKey, false);
	
	if(typeof autoloader != "undefined")
		clearInterval(autoloader);
	
	autobutton.setAttribute("value", "Autoload");
	autobutton.removeEventListener("click", setManual, false);
	autobutton.addEventListener("click", setAuto, false);
	}

///////////////////////////////////////////////////////////////////////////////////////////////

function setAuto() //Set load mode to auto
	{
	mode = "auto";
	
	window.removeEventListener("keypress", checkKey, false);
	
	var delay = Math.abs(parseInt(prompt("Interval between load cycles in seconds:", 15))) * 1000;

	if(!isNaN(delay))
		{
		if(delay < 1000)
			{
			alert("Autoload delay must be at least 5 seconds.");
			return;
			}

		autoloader = setInterval(function(){pending = true; copyStuff();}, delay);
		
		autobutton.setAttribute("value", "Stop");
		autobutton.removeEventListener("click", setAuto, false);
		autobutton.addEventListener("click", setManual, false);
		}
	}

///////////////////////////////////////////////////////////////////////////////////////////////

function checkKey(e) //Check what key was pressed
	{
	if((!pending) && e.keyCode == 39)
		{
		pending = true;
	    	copyStuff();
		}
	}

///////////////////////////////////////////////////////////////////////////////////////////////

function getNextPicURL(framedocument) //Grab URL for the next picture page
	{
	currentpicnumber = framedocument.location.href.split("-")[6];

	as = framedocument.getElementsByTagName("a");
	
	for(var i = 0; typeof pageURL == "undefined"; i++)
		{
		if(parseInt(as[i].getAttribute("href").split("-")[6]) == (parseInt(currentpicnumber) + 1))
			var pageURL = as[i].getAttribute("href");
		
		else if(i == as.length - 1)
			var pageURL = "not found";
		}

	return pageURL;
	}

///////////////////////////////////////////////////////////////////////////////////////////////

function getNextThumbURL(framedocument) //Grab URL for the next thumbnail page
	{
	as = framedocument.getElementsByTagName("a");
	
	for(var i = 0; typeof pageURL == "undefined"; i++)
		{
		if(as[i].innerHTML == "&gt;" && /g.e-hentai.org\/g\//.test(as[i].getAttribute("href")))
			var pageURL = as[i].getAttribute("href");
		
		else if(i == as.length - 1)
			var pageURL = "not found";
		}
	
	return pageURL;
	}


///////////////////////////////////////////////////////////////////////////////////////////////

function getNextSearchURL(framedocument) //Grab URL for the next search page
	{
	as = framedocument.getElementsByTagName("a");
	
	for(var i = 0; typeof pageURL == "undefined"; i++)
		{
		if(as[i].innerHTML == "&gt;" && /g.e-hentai.org\/?\//.test(as[i].getAttribute("href")))
			var pageURL = as[i].getAttribute("href");
		
		else if(i == as.length - 1)
			var pageURL = "not found";
		}

	return pageURL;
	}

///////////////////////////////////////////////////////////////////////////////////////////////

function loadNext(nextpage) //Set the cache frame location and give it some time to load
	{
	cacheframe.contentWindow.location.replace(nextpage);
		
	function wait(i)
		{
		var bars = ["[|---------]", "[||--------]", "[|||-------]", "[||||------]", "[|||||-----]", "[||||||----]", "[|||||||---]", "[||||||||--]", "[|||||||||-]", "[||||||||||]"];

		document.title = bars[i] + " " + title;

		i = i + 1;
	
		if (i == 10)
			{
			document.title = title;

			if(mode == "manual")
				window.addEventListener("keypress", checkKey, false);
			}
		
		else
			setTimeout(function(){wait(i);}, 350);
		}
	
	if(mode == "manual")
		window.removeEventListener("keypress", checkKey, false);

	wait(0);
	
	pending = false;	
}

///////////////////////////////////////////////////////////////////////////////////////////////

function copyStuff() //Copy what we want from the cache frame into the main window and make some other cosmetic changes
	{
	if(type == "picture")
		{
		nextpage = getNextPicURL(cacheframe.contentWindow.document);

		imgs = cacheframe.contentWindow.document.getElementsByTagName("img");
	
		for(var i = 0; i < imgs.length; i++)
			if(imgs[i].src.length > 60 && imgs[i].parentNode.parentNode.className == "ssb")
				pic = imgs[i];

		picnumber = parseInt(picnumber) + 1;
	
		linebreak = document.createElement("br");
		document.body.appendChild(linebreak);
		
		newheader = document.createElement("h1");
		newheader.setAttribute("style", "font-size: xx-large; padding-top: 25px;");
		newheader.appendChild(document.createTextNode(picnumber));
		document.body.appendChild(newheader);
		
		newpic = document.body.appendChild(pic.cloneNode(true));

		jumpTo(newpic);

		if(nextpage == "not found")
			{
			window.removeEventListener("keypress", checkKey, false);
		
			cacheframe.parentNode.removeChild(cacheframe);
	
			newheader = document.createElement("h1");
			newheader.setAttribute("style", "font-size: xx-large; padding-top: 25px;");
			newheader.appendChild(document.createTextNode("(End)"));
			document.body.appendChild(newheader);
		
			return;
			}
	
		else
			loadNext(nextpage);
		}

	if(type == "thumbnails")
		{
		nextpage = getNextThumbURL(cacheframe.contentWindow.document);
	
		thumbs = cacheframe.contentWindow.document.getElementById("gtt");
	
		//newTabifyLinks(thumbs);
	
		newthumbs = thumbbox.appendChild(thumbs.cloneNode(true));
	
		jumpTo(newthumbs);

		if(nextpage == "not found")
			{
			window.removeEventListener("keypress", checkKey, false);
		
			cacheframe.parentNode.removeChild(cacheframe);

			return;
			}
	
		else
			loadNext(nextpage);
		
		}

	if(type == "search")
		{

		nextpage = getNextSearchURL(cacheframe.contentWindow.document);

		results = cacheframe.contentWindow.document.getElementsByClassName("itg")[0].getElementsByTagName("tbody")[0];
		
		//newTabifyLinks(results);
	
		rows = results.getElementsByTagName("tr");

		for(var i = 0; i < rows.length; i++) 
			if(rows[i].getAttribute("class") == null)
				rows[i].parentNode.removeChild(rows[i]);
	
		newresults = resultsbox.appendChild(results.cloneNode(true));
	
		if(nextpage == "not found")
			{
			window.removeEventListener("keypress", checkKey, false);
	
			cacheframe.parentNode.removeChild(cacheframe);

			return;
			}

		else
			loadNext(nextpage);
	
		}
	
	}

///////////////////////////////////////////////////////////////////////////////////////////////

///\/\/\/PROGRAM STARTS HERE\/\/\/\\\

if(/g.e-hentai.org\/s\//.test(window.location.href))
	type = "picture";

if(/g.e-hentai.org\/g\//.test(window.location.href))
	type = "thumbnails";

if(document.getElementById("searchbox") != null)
	type = "search";

if(typeof type == "undefined")
	return;

var SUC_script_num = 68601;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', 'BPT') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

title = document.title;
mainURL = document.location.href;

autobutton = document.createElement("input");
autobutton.setAttribute("type", "button");

if(type == "picture")
	{
	nextpage = getNextPicURL(document);

	picnumber = mainURL.split("-")[6];

	stuffbox = document.getElementsByClassName("ssb")[0];
	
	stuffboxdivs = stuffbox.getElementsByTagName("div");

	for(var i = 0; i < stuffboxdivs.length; i++)
		stuffboxdivs[i].innerHTML = "";
	
	document.body.innerHTML = stuffbox.innerHTML;

	GM_addStyle('body{text-align: center;}');
	
	newheader = document.createElement("h1");
	newheader.setAttribute("style", "font-size: xx-large; padding-top: 0px;");

	if(nextpage == window.location)
		{
		newheader.appendChild(document.createTextNode("(End)"));
		document.body.appendChild(newheader);
	
		return;
		}

	newheader.appendChild(document.createTextNode(picnumber));
	document.body.insertBefore(newheader, document.getElementsByTagName("a")[0]);
	
	document.body.insertBefore(autobutton, document.getElementsByTagName("h1")[0]);

	jumpTo(autobutton);
	}

if(type == "thumbnails")
	{
	nextpage = getNextThumbURL(document);
	
	thumbbox = document.getElementById("gdt");

	//newTabifyLinks(thumbbox);

	bigad = document.getElementById("ebo");

	if(bigad != null)
		bigad.parentNode.removeChild(bigad);

	if(nextpage == "not found")
		return;

	document.body.insertBefore(autobutton, document.getElementsByClassName("pt")[0]);
	}

if(type == "search")
	{
	nextpage = getNextSearchURL(document);

	resultsbox = document.getElementsByClassName("itg")[0];

	//newTabifyLinks(resultsbox);

	rows = resultsbox.getElementsByTagName("tr");

	for(var i = 0; i < rows.length; i++)
		if(rows[i].getAttribute("class") == null)
			rows[i].parentNode.removeChild(rows[i]);
	
	if(nextpage == "not found")
		return;

	document.getElementsByClassName("ip")[0].appendChild(document.createElement("br"));
	document.getElementsByClassName("ip")[0].appendChild(autobutton);
	}

cacheframe = document.createElement("iframe");
cacheframe.setAttribute("style", "display: none;");

autobutton.setAttribute("value", "Initializing...");

document.body.appendChild(cacheframe);

function initFrame()
	{
	cacheframe.contentWindow.location.replace(nextpage);
	setTimeout(proceed, 2500);
	}

function proceed()
	{
	pending = false;
	setManual();
	}

setTimeout(initFrame, 3500);