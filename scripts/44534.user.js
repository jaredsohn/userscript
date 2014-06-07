// ==UserScript==
// @name           Beautiful Meta Refresh Blocker
// @namespace      http://www.domoticpoint.com/
// @description    Block meta refresh. Based on http://userscripts.org/scripts/show/5506, with cosmetic changes +  allows refreshes if timeout<10s (which is normally a redirect)
// @include        *
// @exclude        https://www.google.com/*
// ==/UserScript==


(function(){


	var allMetas, thisMeta, content, timeout, timeout_ms, url, view1, view2, link;

	timeout = -1;
	url = 'none';

	allMetas = document.getElementsByTagName('meta');
	for (var i = 0; i < allMetas.length; i++) {
		thisMeta = allMetas[i];

		if (thisMeta.httpEquiv.match(/refresh/i)) {
			if (thisMeta.content.match(/[\D]/)) {
				content = thisMeta.content.split(';');
				timeout = content[0];
				
				url = thisMeta.content.match(/url=['"]?([^'"]+)['"]?$/i);
				url = RegExp.lastParen;
			}
			else {
				timeout = thisMeta.content;
				url = thisMeta.baseURI;
			}
		}
	}

if (timeout < 10) return; // A refresh of < 10 secs is probably a redirect	
	if (timeout > 0) {
		timeout_ms = (timeout - 1) * 1000;
	}

// uncomment this part to see the old style bar showing the information
/*
	view1 = document.createElement('div');
	// render migliore senza la prossima linea
	//view1.setAttribute('style', 'padding-top: 1em; padding-bottom: 1em;');
	view2 = document.createElement('div');
	view2.setAttribute('style', 'background: rgb(255, 255, 191) none repeat scroll 0%; width:100%; font-family: sans-serif; font-size: small; text-align: left; color: #000000');
	//view2.appendChild(document.createTextNode('This page will Not Redirect to:   '));

	link = document.createElement('a');
	link.href = url;
	link.setAttribute('style', 'color: blue;');
	link.appendChild(document.createTextNode(url));

	view2.appendChild(document.createTextNode(timeout + 's autoRedirect stopped for '));
	view2.appendChild(link);
	view1.appendChild(view2);
*/

var RedSquare = document.createElement("div")
    RedSquare.setAttribute('id', 'autopagerize_icon')
    with (RedSquare.style) {
        fontSize   = '12px'
        position   = 'fixed'
        top        = '3px'
        right      = '3px'
        background = '#f00'
        color      = '#fff'
        width = '20px'
        height = '20px'
        zIndex = '255'
    }
    document.body.appendChild(RedSquare)
    
		
var InfoPink = document.createElement("div")
    InfoPink.setAttribute('id', 'autopagerize_icon')
    with (InfoPink.style) {
        fontSize   = '12px'
	   fontFamily = 'segoe ui, sans-serif'
        position   = 'fixed'
        top        = '-200px'
        right      = '3px'
        background = '#fbc'
        color      = '#000'
       width = '200px'
     //   height = '50px'
        zIndex = '255'
    }
document.body.appendChild(InfoPink);
InfoPink.appendChild(document.createTextNode(timeout + 's autoRedirect stopped, click to redirect to ' + url ));

RedSquare.addEventListener("mouseover",
        function(){InfoPink.style.top = '3px'  }, true)

InfoPink.addEventListener("mouseout",
        function(){InfoPink.style.top = '-200px' }, true)
		
InfoPink.addEventListener("click",
        function(){window.location = url }, true)




	if (timeout >= 0) {
		// in case load hasn't finished when the refresh fires
		var stopTimer = window.setTimeout("window.stop();", timeout_ms); 
		window.addEventListener("load", function() {
			try { window.clearTimeout(stopTimer); } catch(ex) {}
			window.stop();
		}, true);

		var fc = document.body.firstChild;
		if (fc) {
			fc.parentNode.insertBefore(view2, fc);
		}
		else {
			var view3 = document.createElement('div');
			view3.appendChild(view1);
			document.body.innerHTML = view3.innerHTML + document.body.innerHTML;
		}
	}


})();


/*
	allMetas = document.getElementsByTagName('script');
for (var i = 0; i < allMetas.length; i++) {
		thisMeta = allMetas[i];

		if (thisMeta.httpEquiv.match(/refresh/i)) {
			thisMeta.parentNode.removeChild(thisMeta); }
*/