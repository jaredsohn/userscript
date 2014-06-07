// ==UserScript==
// @id             better-virgilio@scriptish
// @name           Better Virgilio.it [Beta]
// @version        0.3
// @namespace      http://www.virgilio.it/
// @author         nonhocapito
// @description    Rimuove un po' di immondizia da virgilio.it / Removes garbage from virgilio.it
// @include        http://*virgilio.it/
// @include        http://*virgilio.it/?refresh_ce
// @exclude        http://webmail.virgilio.it
// @updateURL      http://userscripts.org/scripts/source/154631.user.js
// @run-at         document-end
// @icon           http://www.virgilio.it/favicon.ico
// ==/UserScript==


/**** HISTORY ****/
//0.3   Nothing special
//0.2   Tentative Beta



//Block meta refresh.
//code taken from http://userscripts.org/scripts/show/44534
function blockmetarefresh(){		

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

/*var RedSquare = document.createElement("div")
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
        function(){window.location = url }, true)*/




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
	
	}

//main function 
(function(){ 
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}	
	
	//parts of the page to hide
	var cssStyle = '#col-2, #mobile, #social_net, #boxIs, #cento_gadget, #box-marketing, #top_footer_link, #IE9, #adv_gda_virgilio, .adv, #alichildren, .ddcq, #bottom_chat, #vtrends, #skin_ADV_DIV {display:none !important}';
	
	//a little make-up
cssStyle += '#col-1 {width:100% !important} .primopiano{width:625px !important} #col-1_int, .strillo h3, #box-giochi, .strillo {width:500px !important} #ultime_notizie,#community, #finanza, #editoriali_spp, #alichildren, #box_is_1, #box-giochi, #oknotizie, #comm-testuale-1, #comm-testuale-2, .com_link, .box, #editoriali_spp li {width:500px !important; font-size:14px !important} .dx, .not, #ultime_notizie div, .dx a, #editoriali_spp p {width:400px !important; font-size:14px !important} #wrapper{/*width:100%*/ width:355px !important} #scroller{left:281px !important; width:86px !important} #eventi .box, #local .box {width:288px !important} .primopiano{margin-bottom:10px !important} body{margin-top: 15px !important; background:none !important} #lanci{width: 99% !important; } #col-1_int {font-size: 110% !important} #ultime_notizie div {height:180px !important}'; 

  //add CSS
	addGlobalStyle(cssStyle);
		
	//some
	blockmetarefresh()
	
	}

)()