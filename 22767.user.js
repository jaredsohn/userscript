// eRepublik BetterWay
// version 0.6 BETA!
// 2008-04-28
// Copyright (c) 2008, Arias
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "eRepublik Swe", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript== 
// @name	eRepublik BetterWay
// @namespace	http://userscripts.org/scripts/show/22767
// @description	For a better and easier eRepublik.com !
// @include	http://www.erepublik.com/*
// ==/UserScript== 


// list nodes matching this expression, optionally relative to the node `root'
function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
	result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

// list nodes matching this expression, optionally relative to the node `root'
function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
	result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}


// Fetches url, $x slices it up, and then invokes cb(nodes, url, dom, xhr).
// If runGM is set to true and the url is on the same domain as location.href,
// the loaded document will first be processed by all GM scripts that apply.
function wget$x( url, cb/*( [DOMNodes], url, dom, xhr )*/, xpath, runGM ) {
  wget(url, function(xml, url, xhr) {
    cb( $x( xpath, xml ), url, xml, xhr );
  });
}

// Fetches url, $X slices it up, and then invokes cb(node, url, dom, xhr).
// If runGM is set to true and the url is on the same domain as location.href,
// the loaded document will first be processed by all GM scripts that apply.
function wget$X( url, cb/*( DOMNode, url, dom, xhr )*/, xpath, runGM ) {
  wget(url, function(xml, url, xhr) {
    cb( $X( xpath, xml ), url, xml, xhr );
  });
}

// Fetches url, turns it into an HTML DOM, and then invokes cb(dom, url, xhr).
// If runGM is set to true and the url is on the same domain as location.href,
// the loaded document will first be processed by all GM scripts that apply.
function wget( url, cb/*( dom, url, xhr )*/, runGM ) {
  //console.log("Loading %x", url);
  if (html2dom[url]) // cache hit?
    return html2dom(null, cb, url, null, runGM);
  GM_xmlhttpRequest({ method:'GET', url:url, onload:function( xhr ) {
    if (xhr.responseXML)
      cb( xhr.responseXML, url, xhr );
    else
      html2dom( xhr.responseText, cb, url, xhr, runGM );
  }});
}

function mayCommunicate(url1, url2) {
  function beforePath(url) {
    url = url.match(/^[^:]+:\/*[^\/]+/);
    return url && url[0].toLowerCase();
  }
  return beforePath(url1) == beforePath(url2);
}

// Well-behaved browers (Opera, maybe WebKit) could use this simple function:
// function html2dom( html, cb/*( xml, url, xhr )*/, url, xhr ) {
//   cb( (new DOMParser).parseFromString(html, "text/html"), url, xhr );
// }

// Firefox doesn't implement (new DOMParser).parseFromString(html, "text/html")
// (https://bugzilla.mozilla.org/show_bug.cgi?id=102699), so we need this hack:
function html2dom( html, cb/*( xml, url, xhr )*/, url, xhr, runGM ) {
  function loaded() {
    doc = cached.doc = iframe.contentDocument;
    iframe.removeEventListener("load", loaded, false);
    doc.removeEventListener("DOMContentLoaded", loaded, false);
    var callbacks = cached.onload;
    delete cached.onload;
    //console.log("DOMContentLoaded of %x: cb %x", url, callbacks);
    setTimeout(function() { // avoid racing with GM's DOMContentLoaded callback
      //console.log("Running %x callbacks", url);
      callbacks.forEach(function(cb,i) { cb( doc, url, xhr ); });
    }, 10);
  };

  var cached = html2dom[url]; // cache of all already loaded and rendered DOM:s
  if (cached)
    if (cached.onload)
      return cached.onload.push(cb);
    else
      return cb(cached.doc, cached.xhr, url);

  var iframe = document.createElement("iframe");
  iframe.style.height = iframe.style.left = "0";
  iframe.style.width = (innerWidth - 32)+"px";
  iframe.style.visibility = "hidden";
  iframe.style.position = "absolute";
  document.body.appendChild(iframe);

  iframe.addEventListener("load", loaded, false);
  html2dom[url] = cached = { onload:[cb], xhr:xhr };
  if (runGM && mayCommunicate(url, location.href))
    return iframe.src = url; // load through GM (should be cached due to xhr)

  //console.log("May not communicate / GM scripts unwanted! (%x)", runGM);
  html = html.replace(/[\n\r]+/g, " "). // needed not freeze up(?!)
    replace(/<script.*?<\/script>/ig, ""). // no code execution on injection!
    replace(/<body(\s+[^="']*=("[^"]*"|'[^']*'|[^'"\s]\S*))*\s*onload=("[^"]*"|'[^']*'|[^"']\S*)/ig, "<body$1" );
  iframe.contentWindow.location.href = location.href; // for cross domain issues
  var doc = iframe.contentDocument;
  doc.open("text/html");
  doc.addEventListener("DOMContentLoaded", loaded, false);
  doc.write(html); // this may throw weird errors we can't catch or silence :-|
  doc.close();
}

html2dom.destroy = function() {
  for (var url in html2dom)
    if (html2dom.hasOwnProperty(url)) {
      var cache = html2dom[url];
      cache.doc = cache.onload = cache.xhr = null;
      delete html2dom[url];
    }
};

// functionally belongs to html2dom above (see location.href line for details)
try { // don't run this script recursively on wget() documents on other urls
  if (window.frameElement &&
      window.parent.location.href.replace(/#.*/, "") == location.href)
    return; // console.warn("Avoiding double firing on %x", location.href);
} catch(e) {
  //console.error("Double fire check error: %x", e);
}

window.addEventListener("unload", html2dom.destroy, false);


/***--------------------------------------------------***
----------EASIER TO READ COMMENTS---------***
****--------------------------------------------------***/

var commenttext = document.getElementById("primaryfull");
commenttext.style.color = 'black';

/***--------------------------------------------------***
----------------------END OF-----------------------***
----------EASIER TO READ COMMENTS---------***
****--------------------------------------------------***/

// auto uppdaterar om du fått PM för att sedan ge ut info om att du fått meddelande.

var newPM = document.getElementById("NrMess");
	if (newPM.innerHTML >= 1) {
		alert("You got " + newPM.innerHTML + " new PM");
	}


/***--------------------------------------------------***
-------WORKING AND TRAINING STATUS-----***
****--------------------------------------------------***/

var infobara = document.getElementById("headinfo5");

/*var working = document.getElementsByTagName("LI");
alert(working.className);
if (working.className == 'mic'){
	var workingurl = working.baseURI;
	alert("workingurl");
}
*/


// har du tränat  ?
//document.createElement("div");
(function train(){
	
				try
	{

	
	
	

		
		
		if (wget$X('http://www.erepublik.com/train.html', function(img){ 
			if(img) 
				var trainbar = document.createElement('a');
				//trainbar.className = "trainbar";
				trainbar.innerHTML = "Trained !";
				//thebar2.offsetLeft = 919;
				infobara.appendChild(trainbar);	 }, '//td/img[@src="http://www.erepublik.com/parts/EN/btn-train-off.gif"]')){
		}
		

	
		if (wget$X('http://www.erepublik.com/train.html', function(img){ 
			if(img) 
				var trainbar2 = document.createElement('a');
				trainbar2.href = "http://www.erepublik.com/train.html";
				trainbar2.innerHTML = "NOT TRAINED ! ";
				infobara.appendChild(trainbar2);	
				/*var trainanswer = confirm ("you haven´t trained today! \nWanna train ? "); 
				if you wanna train
				if (trainanswer) window.location.href = 'http://www.erepublik.com/train.html'*/ }, '//a/img[@src="http://www.erepublik.com/parts/EN/btn-train.gif"]')){ 
				
		}	
	
	}
	
	
	
	catch (e)
	{
		GM_log("Fel i train\n" + e);
	}
})();

	


// har du jobbat ?
	
	
	if (GM_getValue('workid') !== undefined){



			
				(function work(){
					
								try
					{
				
						//om du har jobbat
						if (wget$X('http://www.erepublik.com/work-' + GM_getValue('workid') + '.html', function(img){ 
							if(img) 
								var workbar = document.createElement('a');
								//workbar.className = "workbar";
								workbar.innerHTML = "Worked !";
								//thebar2.offsetLeft = 919;
								infobara.appendChild(workbar);							
								/*alert("you have worked today!\nWork-ID: " + GM_getValue('workid'));*/ }, '//a/img[@src="http://www.erepublik.com/parts/EN/btn-work_off.gif"]')){
								}
						//om du INTE har jobbat
						if (GM_getValue('workid') !== undefined && wget$X('http://www.erepublik.com/work-' + GM_getValue('workid') + '.html', 
							function(img){ 
								if(img) 
									var workbar2 = document.createElement('a');
									workbar2.href = 'http://www.erepublik.com/work-' + GM_getValue('workid') + '.html';
									workbar2.innerHTML = "NOT WORKED ! ";
									infobara.appendChild(workbar2);	
									/*var workanswer = confirm ("you haven´t worked today! \nWanna work ? "); 
									if (workanswer) window.location.href = 'http://www.erepublik.com/work-' + GM_getValue('workid') + '.html';*/ }, '//a/img[@src="http://www.erepublik.com/parts/EN/btn-work.gif"]')){ 
								
									}
						/*
						else {
							var workidanswer = confirm ("Wrong company, have you change work, or just own an company ?\nWorkid: " + GM_getValue('workid'));
								//if (workidanswer)
								//	var workid = prompt("Please enter your company number","");
								//	GM_setValue('workid', workid);			
						}
						*/
					
					}
					
					catch (e)
					{
						GM_log("Fel i work\n" + e);
					}
				})();
			
	}
	
	else {
		//(function workidi(){
			var workid = prompt("Please enter your company number","");
			GM_setValue('workid', workid);
		//})();
	}

	
/***--------------------------------------------------***
----------------------END OF-----------------------***
-------WORKING AND TRAINING STATUS-----***
****--------------------------------------------------***/	





/*
CHANGELOG:
0.6 - fixed bug, PM-box moves down when you have trained/worked
0.5 - train AND work check, added popup for new PM
0.4 - Added easier to read text (black text)
0.3 - New feature: If you haven´t trained today popup, with a buttom that will take you to train-page.
0.2 - New feature: change å ä ö in real time to other character when you are writing PM.
0.1 - New feature: change from the f*cked up letters to the original swedish å ä ö.
*/

// END FILE