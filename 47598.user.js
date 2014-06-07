// ==UserScript==
// @name			torrent2wtorrent
// @namespace			http://www.brooksworks.com
// @description			Let's you download torrents using wTorrent wether you have a http or a secure https connection to your wtorrent interface
// @include			*
// @include			http://isohunt.com/torrent_details/*
// @include			http://thepiratebay.org/details.php?*
// @include			http://torrentreactor.net/view.php?*
// @include			http://www.mininova.org/*
// @include			http://www.torrentspy.com/*
// @include			http://ts.searching.com/*
// ==/UserScript==

(function() {

	var host = GM_getValue("wTorrent_FQDN","wtorrent") ; 
	var port = GM_getValue("wTorrent_Port","80");
	var username = GM_getValue("wTorrent_User",""); 
	var password = GM_getValue("wTorrent_Pass","");

  	if (GM_getValue("wTorrent_FQDN") == undefined) {
	  GM_setValue("wTorrent_FQDN","wtorrent");
		GM_setValue("wTorrent_SECURE",false);
		GM_setValue("wTorrent_Port","80");
		GM_setValue("wTorrent_User","");
		GM_setValue("wTorrent_Pass","");
		GM_setValue("wTorrent_OverRideCheck",false);
	}

	// sanity checks
	if (GM_getValue("wTorrent_OverRideCheck")===false) { if (host == "" || username == "" || password == "") { alert("You need to configure the \"Add Torrents To wTorrent\" user script with your wTorrent parameters before using it.\n\nType about:config in the address bar and filter for wtorrent. Variables are self explanitory."); return false; } }
	if (port == "80" || port == "") { port = ""; } else { port = ":"+port; }
			
	if (GM_setValue("wTorrent_SECURE") == false) {
  var proto = "http";}
  else if {
  var proto = "https";
  }	
			
	// register menu item to enable opening wTorrent page
	function wTorrentMenu() { GM_openInTab("https://"+host+port); }
	GM_registerMenuCommand("Open wTorrent", wTorrentMenu, "w", "shift alt"); 
	
	// this function makes a wTorrent link using embeded images
	var wTorrentLinkIdCounter = 0;
	function makeWTorrentLink(link) {
		var wTorrentLink = document.createElement('a');
		wTorrentLink.setAttribute("href", link.href);
		wTorrentLink.setAttribute("id","wTorrentLink"+wTorrentLinkIdCounter); wTorrentLinkIdCounter++;
		wTorrentLink.setAttribute("class", "wtorrentlink");
		wTorrentLink.addEventListener('click',wTorrentClick,false);
		wTorrentLink.setAttribute("onclick", "return false;");
		wTorrentLink.innerHTML = "<img src=\"" + wTorrentImage + "\" style='border: 0px; padding: 0 1px;' alt='Open with wTorrent' title='Open with wTorrent' />";
		return wTorrentLink; 
		}

	// wrapper function for wTorrentAdd to fix issue with not getting an error
	// when clicking a torrent link the first time after not being logged in
	function wTorrentClick() { wTorrentAdd(this.id); }
	
	// this function posts the url for the torrent to wTorrent
	function wTorrentAdd(wTorrentLinkId) {
	
		// reference the link
		var wTorrentLink = document.getElementById(wTorrentLinkId);
		
			
		// here we actually send the form data with the torrenturl
		post(''+proto+'://'+host+port+'/index.php?cls=AddT', 'torrenturl='+encodeURIComponent(wTorrentLink.href)+'&start_now=on', function(s) {
			
			// our regexes to do checks after adding torrents
			var match_added = /Erfolgreich hinzugefügt/gmi;
			var already_exists = /Fehler: Torrent existiert bereits im Torrent-Verzeichnis/gmi;
			var login_needed = /login-username/gmi;
			
			// check for string 'torrent added correctly' in return HTML
			if (match_added.exec(s)) {
				show_message('Torrent erfolgreich hinzugefügt<br/>');
				wTorrentLink.getElementsByTagName('img')[0].src=wTorrentSuccess;
				wTorrentLink.getElementsByTagName('img')[0].title="Torrent lädt herunter";
				}
			// check for string 'error: file already exists in torrent directory'
			else if (already_exists.exec(s)) {
				show_message('Torrent existiert bereit<br />');
				wTorrentLink.getElementsByTagName('img')[0].src=wTorrentFailed;
				wTorrentLink.getElementsByTagName('img')[0].title="Torrent wurde bereits heruntergeladen";
				}
			// check for login page, and if we find the login we attempt to login
			else if (login_needed.exec(s)) {
				post(''+proto'://'+host+'/','userf='+username+'&passwdf='+password+'&user_login=Login', function(l) {
					// if we are still getting a login page there is probably a typo in the config
					var login_needed = /login-username/gmi;
					if (login_needed.exec(l)) { show_message('Login fehlgeschlagen!<br />Check configuration...'); }
					else { wTorrentAdd(wTorrentLinkId); }
					});
				}
			// un-handled issue, try adding torrent manually as you may be having an issue with wtorrent
			else {
				show_message('Problem Adding Torrent<br />to wTorrent');
				// debug
				//alert("torrent url: "+wTorrentLink.href+"\n\nDebug Info:\n"+s);
				wTorrentLink.getElementsByTagName('img')[0].src=wTorrentFailed;
				wTorrentLink.getElementsByTagName('img')[0].title="Torrent Download Failed";
				}
 			})
		}

	// generic post function taken from GreaseSpot
	// http://wiki.greasespot.net/Code_snippets#POST_data_to_a_URL_with_callback_function
	function post(url, data, cb) {
		GM_xmlhttpRequest({
			method: "POST",
			url: url,
			headers:{'Content-type':'application/x-www-form-urlencoded'},
			data: data,
			onload: function(xhr) { cb(xhr.responseText); }
			});
		}

	// function from Julien's "Add Torrents to uTorrent" script
	// this function inits the script and adds all the wTorrent download links
	function scanLinks() {
		var links = getLinks();

		for (var i=0; i < links.length; i++){
			var link = links[i];
			if (match(link.href)) {
				var wTorrentLink = makeWTorrentLink(link);
				link.parentNode.insertBefore(wTorrentLink, link.nextSibling);
				}
			}
		}
	
	// function from Julien's "Add Torrents to uTorrent" script
	// this function puts all the links on the page into an array
	function getLinks() {
		var doc_links = document.links;
		var links = new Array();
		for (var i=0; i < doc_links.length; i++){
			links.push(doc_links[i]);
			}
		return links;
		}

	// function from Julien's "Add Torrents to uTorrent" script
	// modified to be a little more efficient.
	function match(url) {

		var matchRegex = new Array(
	
			// isohunt
			/http:\/\/.*isohunt\.com\/download\//i,
			/http:\/\/.*bt-chat\.com\/download\.php/,
		
			// TorrentReactor
			/:\/\/dl\.torrentreactor\.net\/download.php\?/i,
		
			// Mininova
			/http:\/\/www\.mininova\.org\/get\//i,
		
			// TorrentSpy
			/http:\/\/ts\.searching\.com\/download\.asp\?/i,
			/http:\/\/www\.torrentspy\.com\/download.asp\?/i,
		
			// Seedler
			/http:\/\/.*seedler\.org\/download\.x\?/i,
		
			// all direct torrent links
			/\.torrent$/
			
			);
	
		for (r=0; r<matchRegex.length; r++) {
			if (url.match(matchRegex[r])) {
				if (r<3) { alert(url.match(matchRegex[r])); }
				return true;
				}
			}
		return false;
		}

	// opacity script from brainerror.net
	// http://brainerror.net/scripts/javascript/blendtrans/
	function opacity(id, opacStart, opacEnd, millisec) {
	    //speed for each frame
	    var speed = Math.round(millisec / 100);
	    var timer = 0;
	    //determine the direction for the blending, if start and end are the same nothing happens
	    if(opacStart > opacEnd) {
	        for(i = opacStart; i >= opacEnd; i--) {
	            setTimeout(opacity_change,(timer * speed),i,id);
	            timer++;
	        }
	    }
		else if(opacStart < opacEnd) {
	        for(i = opacStart; i <= opacEnd; i++) {
	            setTimeout(opacity_change,(timer * speed),i,id);
	            timer++;
	        }
	    }
	}
	function opacity_change(opacity, id) {
	    var object = document.getElementById(id).style;
	    object.opacity = (opacity / 100);
	    object.MozOpacity = (opacity / 100);
	    object.KhtmlOpacity = (opacity / 100);
	    object.filter = "alpha(opacity=" + opacity + ")";
	}
	function opacity_shift(id) {
		//if an element is invisible, make it visible, else make it ivisible
	    if(document.getElementById(id).style.opacity == 0) { opacity(id, 0, 100, 1000); }
		else { opacity(id, 100, 0, 1000); }
	}
	
	// these functions show and hide status messages so that there is no need to click ok when
	// adding torrents
	GM_addStyle('#wtorrent_message { z-index: 9999; position: fixed; bottom: 5px; right: 5px; font-weight: bold; color: #333; background: #FFF url("data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7%2FwAALCABQAAEBAREA%2F8QAFQABAQAAAAAAAAAAAAAAAAAABAX%2FxAAYEAEBAQEBAAAAAAAAAAAAAAAAE2EBUf%2FaAAgBAQAAPwB0MVIYqRxRhilE%2BWHyw6XPDJFz1%2F%2FZ") repeat; border: 2px solid #333; width: 200px; height: 60px; text-align: center; }');
	function show_message(text,autohide) {
		if (autohide == undefined) { var autohide = true; }
		if (node=document.getElementById('wtorrent_message')) { node.parentNode.removeChild(node); }
		var wTorrentMessage = document.createElement('div');
		wTorrentMessage.setAttribute("id","wtorrent_message");
		wTorrentMessage.innerHTML = "<p>"+text+"</p>";
		wTorrentMessage.addEventListener('click',hide_message,false);
		document.body.insertBefore(wTorrentMessage, document.body.firstChild);
		opacity_shift('wtorrent_message');
		if (autohide) { setTimeout(hide_message,4000); }
	}
	function hide_message() {
		if(document.getElementById('wtorrent_message').style.opacity>0) { opacity_shift('wtorrent_message',true); }
	}
	
    // wTorrent Icons
    var wTorrentImage = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP38%2FAPy7egu7ebdRPv6%2BQri1shw3c%2B%2Fhe3m3UT%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAPby7h%2FApYX%2Fu6mJ%2F7Kwkf%2FApYX%2Fq7aX%2F6DAof%2B5q4v%2F3M69if%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAOng1VTApYX%2Fprqb%2F3bhxf9y5cn%2FrbWW%2F23pzf9r68%2F%2FdOPG%2F7upiv%2FZyreU%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwDPu6O%2Fkcyu%2F2fu0%2F9s6s7%2FbOrO%2F3Dmyv9t6c3%2FbenN%2F2vqzv9s6s7%2FvaeH%2F%2FDr5DX%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwDn3dFes7CR%2F2jt0f9t6c3%2FbenN%2F23pzf9t6c3%2FbenN%2F23pzf9t6c3%2FaezR%2F57Aov%2FXxrKf%2F%2F%2F%2FAP%2F%2F%2FwD28%2B8evqeH%2F5bIqv9q7ND%2FbenN%2F23pzf9t6c3%2FbenN%2F23pzf9t6c3%2FbenN%2F23pzf9t6c3%2Fv6aG%2F%2Fby7h%2F%2F%2F%2F8A7ebdRLesjf%2BC2Lr%2FbOrO%2F23pzf9s6s7%2FbenN%2F23pzf9t6c3%2FbenN%2F23pzf9t6c3%2FaO3S%2F621lv%2Fg08R4%2F%2F%2F%2FAOzk20i6qor%2Fg9e5%2F2ns0P9w5sr%2Fd%2BHF%2F2zqzv9t6c3%2FbenN%2F23pzf9t6c3%2FbenN%2F2rrz%2F%2BWyKr%2F1MOtqP%2F%2F%2FwD%2F%2F%2F8A49fJbr6mhv944MP%2Fgdq8%2F7aujv9q7ND%2FbenN%2F23pzf9s6s7%2FduHF%2F23pzf9s6s7%2FhNa5%2F865oMX%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwDe0cGBv6aG%2F6q4mP%2FPuqLBkM2v%2F2fu0v9m79P%2FqbiZ%2F621lv9o7dH%2FbOnO%2F4PYu%2F%2FNt57J%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAPj28xXg08R46d%2FVVr6nh%2F%2BRzK7%2FsbGS%2F8y2nM2H1Lf%2FZu%2FT%2F2ns0P%2BB2bz%2Fzbifx%2F%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwDp39VWz7ujv%2BTZzGfApYX%2Fp7qb%2F6S8nf%2Bmu5v%2Fu6mJ%2F%2Bfd0V7%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A9vLuH9zNvIvZybaX4NPDefHr5TP%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F%2F%2FAP%2F%2F%2FwD%2F%2F%2F8A%2F%2F8AAP%2B%2FAADwDwAA4AcAAMAHAADAAwAAgAMAAIADAACAAQAAwAEAAMABAAD8AQAA%2FoMAAP%2FPAAD%2F%2FwAA%2F%2F8AAA%3D%3D";
	var wTorrentFailed = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%04gAMA%00%00%AF%C87%05%8A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%02%5DIDAT8%CB%A5%93%FBKSa%18%C7%FD%5B%B6%1F%A2%04%89n%84%84QP%98%F32w%D6%DA%DC%A6%CE%B3L%8F%5B%2Cbi%8E%9Da%9AA%8D%C5%5C%F8C%A8%A5v%D5%CA_2Ml%94ZFj%D7%A1%E5%B1%F2%D2NMjm%9E%B3k%CA%B7%B9%60%26.%23z%E1%FB%CB%CB%FB%F9%BC%3C%0F%CF%93%02%20%E5%7F%B2%E6bV%AF%17%CEP%15%E6%F7T%193%A5%25%B9I%AD%86%7BG%AA%99qRiv%95%C8%85%EB%0A%E6tz%E2%23E%B1%DF%1C6%84%07%9D%88%BC%19Edd%08%FC%DD%0E%CC%1AJ%F1%AA%90%60%9F%AB%C5DR%C12%3C%5DN%F1%0B%B7%3B%B04%F5%16%D1%BE%3B%88%B6%DB%11m%3E%87%1F7%9B%B08%DC%07%8F%C9%80Qe6%FFL%9EI%AC%12%CC%E8t%82%18%EC%E6%AE%B7c%89q!z%F1%0C%7Cv%0B%FC%B6j%84%2FX%10i%A0%11%B6%9E%40%F8%DE%0D%CC%1D%251%7Ch%9F%FB%B1l%8F%20!%88%C1%F4%7C%AD%19%8B%AE%B1%F8%8F!%07%0D%EFY%23%82u%BAU%E1N%92%08w%5D%C1%CB%BC%0C%0CH3%E8%84%E0%03u%84%09t%5DE%B4%B3%19%3Ek%25%BE%16I%93f%A1%92%04o%AB%81%C7R%85%87D%3A%93%100%E5%DA%60%E4~%17%A2%0E%0B%7C%A7%0D%F8%D3%F1(r%E0%A5%0A%E1on%843oG0!%98%24%8B%82%A1%CEV%84%EB%0D%08%9E*%5BW0_%AA%82%BF%A9%11%FD%E2-%2B%82%89%12%15%E3%B5%D6%20d%A7%C1%1DW%C7%1F%26%8D2%0F%BEZ%13fMF%F4%89%D2VJp%15%CBiF%26B%B0%B3%0D%3E%AD%0C%DER%C9%1A%98%95g%83-%90%20%D0~%09C%E2m%E8%CD%DA%B4%D2%C4%D7ER%C1%0B%0D%E1%9E%AB%D0%20p%AB5%DE%B0y%95%F8%17%A8%C8%05%2B%8B%C121%F8%B6%16%8C%17K%97aw%B7h%A3%60%D5%20%8D%15%E4%10%23%8A%03%FC%F4a%15%02%D7Z%F1%BD%9E%86%87T%E2%B3Z%01o%9D%19%FC%E5%16L%A8%F3%D1%93%95%CA%C7%60%22%E9(%3F%95%EF'%9E%1C%DC%CB%8EJv%E1K%B5%11%DE%86%F3%F1%7C%AA%3A%86G9%5B%97a%F6w8%E92%0DJw%0B%07%C4%E9f'%B1%93y%90%BF%9D%EB%17m%E6zs%D3%98%9E%ECTsw%E6%06%E1_%B7%F1_%F3%13%1D%D2%CE%B9Ir%1B%FE%00%00%00%00IEND%AEB%60%82";
	var wTorrentSuccess = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%06bKGD%00%FF%00%FF%00%FF%A0%BD%A7%93%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%00%07tIME%07%D8%0A%1D%16%177%7F%EF%5DZ%00%00%01yIDAT8%CB%A5%93%CD%2BDQ%18%C6%9Fs%EF%99%D3qgJ%B84%F9%18%9A%C9wI(%0B%A3d%C3%DAJ%B2%B4%B2%B1%B1%90dmia%C1%8E%FF%40%F64Q%12%93PL%94h%CCD%9Ad%CAm%A63%E7%9Ckc%A1i%AE%8F%EE%BB%7C%17%BF~o%CF%FB%10%D7u%E1g%0C%F8%1C%DF%00Zi9%B5%19%85E98%E5%E0%94%81%1A%0C%EB3%87%7F%07%14%85%C0%F4%E0%02%A8Ia%12%03%FB%D7%3B%FF3%E0%8C%E9%BD%CB-%F2%DD%00%00%F1c%A0%FFd%10%5D%25%B0%18A8dCj%85%EC%FB%03Z%EB%DA!%B4%C4%DC%F6%008e%D8%98%3D%A9%9C%82%BDD%A0%B4%89%A1%C88%8AR%40j%85%92%96PZAH%89%88%DD%0D!%85w%8C%B95%17%A6%A1%9Cd%FA%C0%89%D9%BDD%B9%1AR%97%A0%E1%A2%A9%B6%C3H%E7R%0E%A3%CC%F1%3C%C1%5E%22UAjZC%911%0C%B7%8D%E29%9FFI%95%F0%92%CF%A0%AF9%8E%00%0DX%99%5C%EAG%83BA%ABh%E2n%3F%9BL%1F%A36%14%86a0%D4%04%1Bp%FAx%80%9B%EC9%84%96V9%80%94w%A1q%99t2%8A%C4D%D7dx%A0e%04%17OG%B8%7F%BD%D4%16%E3%A1%DD%F9%C7%C2%AF%80%2FH%0F%A7H%8C%C4%E2%F5%B7%CFg%9AS%AB%FAp%F1%ED%A3R%8C%C4%AB%8D%CD%CB%A4%DFbHrJ%EA%AEVt%DE%EB%0F%88%DF%3A%7F%02_%1F%95%FF%E8%EA%EB%2C%00%00%00%00IEND%AEB%60%82";
	
	// start the script
	scanLinks();
		
	})();// JavaScript Document
