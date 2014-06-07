// ==UserScript==

// @name           Show iTunes University XML

// @namespace      showxmlfiles@showxmlfiles

// @description    Access iTunesU with your web browser

// @include        *

// ==/UserScript==







/*



 * This open source script is provided "as is", use at your own



 * risk.



 * 



 * Some universities require useragent   iTunes/8.0 (Macintosh; U; PPC Mac OS X 10.4)



 * iTunes/8.0.2 (Macintosh; U; Intel Mac OS X 10.5.6)



 * or similar.



 */







// Change this to true if the links don't work in unil.ch/itunesu.



// As of August 24 2009, all the links were going to Viaticalpes_qui_regarde_le_paysage.m4v



// As of Sept. 6 2009, it's working.



var FIX_UNIL_LINK = false







function showit(views) // show data



{



	for (var i=0; i<views.length; i++) {



		for (var j=0; j<views[i].childNodes.length; j++) {



			if (views[i].childNodes[j].tagName == "PictureView") {



				out+="<img src=\""+views[i].childNodes[j].getAttribute("url")+"\">"



			} else if (views[i].childNodes[j].tagName == "TextView") {



				out+="<p>"+views[i].childNodes[j].textContent+"</p>";



			}



		}



	}



}







function fixitms()



{



	var links = document.getElementsByTagName('a')



	for (var i=0; i<links.length; i++)



	{



		if (links[i].href.substr(0,4) == "itms")



		{



			links[i].href = "http"+links[i].href.substr(4);



		}



		else if (links[i].href.substr(0,4) == "itpc")



		{



			links[i].href = "http"+links[i].href.substr(4);



		}



		else if (links[i].href.substr(0,5) == "pcast")



		{



			links[i].href = "http"+links[i].href.substr(5);



		}



	}



}







// fixes the apple.com itunes search and possibly other sites:



//window.addEventListener("pageshow",fixitms,false)











var links = document.getElementsByTagName('a')







for (var i=0; i<links.length; i++)



{



	if (links[i].href.substr(0,4) == "itms")



	{



		links[i].href = "http"+links[i].href.substr(4);



		var url = links[i].href;



		var hasit=true



	}



	else if (links[i].href.substr(0,4) == "itpc")



	{



		links[i].href = "http"+links[i].href.substr(4);



	}



	else if (links[i].href.substr(0,5) == "pcast")



	{



		links[i].href = "http"+links[i].href.substr(5);



	}



}







if (hasit) {



	if (document.getElementById('userOverridePanel'))



	{



		//iTunes Intro Page.



		//document.getElementById('userOverridePanel').style.visibility="visible"



		//document.getElementById('userOverridePanel').style.display="block"



		// direct link to podcast:



		if (navigator.userAgent.indexOf("iTunes") != 0)



		{



			document.body.innerHTML+="May require \"iTunes/8.1\" useragent or similar: "



		}



		document.body.innerHTML += "<a href=\""+url+"\">direct link</a><p>"



		+ "&nbsp;<a href=\"itms"+url.substr(4)+"\">normal link</a><p>"



		+ "<a href=\"http://www2.unil.ch/itunesu/index.groovy?handle="+url+"\">View in browser with unil.ch/itunesu</a>"



		history.back = new function(a) {window.stop()} //stop redirect



		



	}



		// ask page to show items normally:



		//unsafeWindow.goToITMS()







} else if (document.location.toString().indexOf("http://www2.unil.ch/itunesu/")==0 ) {



	// fix links



	if (FIX_UNIL_LINK) {



		var as=document.getElementsByTagName("a")



		for (var i=0; i<as.length; i++)



		{



			if (as[i].href.indexOf(".groovy?url=")>-1)



			{



				as[i].href = as[i].href.substr(as[i].href.indexOf(".groovy?url=")+12)



			}



		}



	}



	



	var as=document.getElementsByTagName("a") // add file type.



	for (var i=0; i<as.length; i++)



	{



		if (as[i].textContent == "download")



		{



			as[i].innerHTML = "download&nbsp;" + as[i].href.substr(as[i].href.lastIndexOf("."));



		}



	}



	// fix images:



	var alt = ""



	var imgs = document.images



	for (var i=0; i<imgs.length; i++)



	{



		alt = imgs[i].alt



		if (alt.substr(alt.length-8)==" Artwork")



		{



			alt = alt.substr(0,alt.length-8) // Trim Artwork off the title.



		}



		imgs[i].setAttribute("title",alt) // add label to image.



	}



	



	// and add search and link:



	page_link = document.location.href.substr(document.location.href.indexOf("?handle=")+8)



	document.getElementsByClassName('nav')[0].innerHTML+="<div align='right'><a style='float:right' href='"+page_link+"'>(Current Page Link) </a><noscript>Enable javascript to use search:</noscript><form  onsubmit=\"window.open('http://ax.phobos.apple.com.edgesuite.net/WebObjects/MZStoreServices.woa/wa/itmsSearch?&term='+document.getElementById('search').value+'&media=all'); return false;\"><font color='#DEDEDE'>Search:</font><input id='search' type='text' title='search' style='height: 12px; font-size: 60%;'></form></div>"



}



else if (document.location.toString().indexOf("http://www.apple.com/itunes/affiliates/")==0)



{



	// add direct open.



	loc = document.location.toString()



	loc = "itms"+unescape(loc.substr(loc.indexOf("Url=")+4)).substr(4)



	document.location = loc



}







if ((document.contentType == "text/xml" || document.contentType == "application/xml")



	 && (document.documentURI.indexOf('apple')>-1)) {



		//alert('applexml')



	// found weird xml format, read it:



	



	// first title, nav:



	var title = ""



	var nav = ""



	var els = document.getElementsByTagName("PathElement")



	for (var i=0; i<els.length; i++)



	{



		if (els[i].getAttribute('displayName'))



		title += els[i].getAttribute('displayName') + " : "



		nav += "<a href=\""+els[i].textContent+"\">"+els[i].getAttribute('displayName')



		+ "</a> &gt; "



	}



	if (title=="")



	{



		nav += "<a href=\""+document.location.toString().replace("/DownloadTracks/","/Feed/")+"\">RSS</a> "



		title="List";



	}



	var out = "<title>"+title+"</title>"



	



	



	



	var views = document.getElementsByTagName("View")



	



	// change to 1 to not show all text/pic data:



	if (1)



	{



		showit(views);



		views = document.getElementsByTagName("VBoxView");



		showit(views);



		//views = document.getElementsByTagName("HBoxView");



		//showit(views);



	}



	else



	{



		// show ALL data:



		var views = document.getElementsByTagName("PictureView")



		for (var i=0; i<views.length; i++)



		{



			out+="<img src=\""+views[i].getAttribute("url")+"\">"



		}



		var views = document.getElementsByTagName("TextView")



		for (var i=0; i<views.length;i++)



		{



			out+="<p>"+views[i].textContent+"</p>";



		}



	}



	



	out+="<hr>"



	



	var gotos = document.getElementsByTagName("GotoURL");



	for (var i=0; i<gotos.length; i++) {



		// get datas:



		out += "<table border='1'><tr><td>"



		for (var j=0;j<gotos[i].childNodes.length; j++) {



			if (gotos[i].childNodes[j].tagName == "PictureView") {



				url = gotos[i].childNodes[j].getAttribute("url")



				if (gotos[i].childNodes[j].getAttribute("src")) {



					url = gotos[i].childNodes[j].getAttribute("src")



				}



				out+="<img src=\""+url+"\"><br>"



			}



		}



		out+="<a target =\"_blank\" href=\""+gotos[i].getAttribute("url")+"\">"



		+gotos[i].textContent



		if (gotos[i].textContent.replace(" ","","g")



		.replace("\n","","g")=='') // it's blank.



		{



			if (gotos[i].getAttribute("draggingName"))



			{out += gotos[i].getAttribute("draggingName")}



			else



			{out += "&nbsp;"}



		}



		out += "</a></td></tr></table>"



	}



	



	out+="<hr><br>"



	var keys = document.getElementsByTagName("key");



	for (var i=0; i<keys.length; i++) {



		if (keys[i].textContent == "previewURL" || keys[i].textContent == "URL")



		{



			var desc = keys[i].parentNode



			var name = "(media file)"



			art=""



			for (var j=0;j<desc.childNodes.length;j++) {



				if (desc.childNodes[j].textContent == "songName") {



					name += desc.childNodes[j].nextSibling.textContent;



				}



				



				if (desc.childNodes[j].textContent == "artworkURL") {



					var art = desc.childNodes[j].nextSibling.textContent;



				}



				if (desc.childNodes[j].textContent == "metadata") {



					dict = desc.childNodes[j].nextSibling.nextSibling;



					//alert(dict.tagName);



					for (var k = 0; k<dict.childNodes.length; k++) {



						if (dict.childNodes[k].textContent == "songName")



						{var name = dict.childNodes[k].nextSibling.textContent}



						



						// get info too:



						if (dict.childNodes[k].textContent == "artistName") {



							name += " ("+dict.childNodes[k].nextSibling.textContent+")";



						}



						if (dict.childNodes[k].textContent == "genre") {



							name += " ("+dict.childNodes[k].nextSibling.textContent+")";



						}



					}



				}



			}



			out+="<table border='1'><tr><td>"



			if (art) {out += "<img src=\""+art+"\">"}



			out+="<a target=\"_blank\" href=\""+keys[i].nextSibling.textContent+"\">"+name+"</a></td></tr></table>"



		}



	}







	out+="<hr>Anonymousdownloads:<br>"



	var anon = document.getElementsByTagName("AnonymousDownload");



	for (var i=0;i<anon.length; i++) {



		out+="<a target=\"_blank\" href=\""+anon[i].getAttribute("url")+"\">"+anon[i].getAttribute("itemName")+"</a><br>"



	}



	



	out+="<hr>Podcast-Feeds:<br>"



	// already have keys variable:



	for (var i=0; i<keys.length; i++) {



		if (keys[i].textContent == "feedURL") {



			var url = keys[i].nextSibling.textContent;



			out+="<a target='_blank' href=\""+url+"\">"+url+"</a><br>";



		}



	}



	



	out = "<table width='100%'><tr><td><font size='-2'>"+nav+"<a href=\""+document.location.toString()+"\">Reload page</a> "



	+ "<a href=\"http://www2.unil.ch/itunesu/index.groovy?handle="+document.location.toString()+"\">View Page with unil.ch/itunesu</a></font></td>"



	+"<td align='right'><form style='margin:0' onsubmit=\"src()\">Search:<input id=\"txt\" type=\"text\"></form></td></tr></table>"



	+ "<script>function src() {window.open(\"http://ax.search.itunes.apple.com/WebObjects/MZSearch.woa/wa/search?media=iTunesU&submit=media&term=\"+document.getElementById('txt').value)}</script>"



	+out;



	



	// this caused errors.



	//w = window.open("about:blank"); w.document.documentElement.innerHTML=(out); w.document.close();



	



	window.open("data:text/html,"+out);



	// comment out this next line if you want to see the source right next to it:



	window.close()



}