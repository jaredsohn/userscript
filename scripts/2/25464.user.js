// RhapEx
// version 1.0 Beta
// 2008-04-21
// Bryan Richard <bryanjrichard@gmail.com>
// Copyright (c) 2008
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "RhapEx", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          RhapEx
// @namespace     http://www.pitchforkmedia.com/article/record_review/*
// @description   The Rhapsody.com Explorer
// @include       http://www.pitchforkmedia.com/article/record_review/*
// ==/UserScript==

var g_ALBUM_AVAILIBILITY = ""; 
var g_XML = "";
var g_Debug = 0;

/* URLs */
var g_UrlHelp = "";
// var g_UrlCT = "http://www.tkqlhce.com/click-2873685-10436574?url=%desturl%&pcode=cj&cpath=aff";

/* Images */
var uriWaiting = 'data:image/gif;base64,R0lGODlhEAAQAPQAAFpCMf%2F%2FmWNMNqSXX21YPdDKe6%2BjZv%2F%2FmcW8c%2BbjiY5%2BUoNxSvHvj5mKWfv7ltvWgrqxbgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2BGkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAAFdyAgAgIJIeWoAkRCCMdBkKtIHIngyMKsErPBYbADpkSCwhDmQCBethRB6Vj4kFCkQPG4IlWDgrNRIwnO4UKBXDufzQvDMaoSDBgFb886MiQadgNABAokfCwzBA8LCg0Egl8jAggGAA1kBIA1BAYzlyILczULC2UhACH5BAAKAAEALAAAAAAQABAAAAV2ICACAmlAZTmOREEIyUEQjLKKxPHADhEvqxlgcGgkGI1DYSVAIAWMx%2BlwSKkICJ0QsHi9RgKBwnVTiRQQgwF4I4UFDQQEwi6%2F3YSGWRRmjhEETAJfIgMFCnAKM0KDV4EEEAQLiF18TAYNXDaSe3x6mjidN1s3IQAh%2BQQACgACACwAAAAAEAAQAAAFeCAgAgLZDGU5jgRECEUiCI%2ByioSDwDJyLKsXoHFQxBSHAoAAFBhqtMJg8DgQBgfrEsJAEAg4YhZIEiwgKtHiMBgtpg3wbUZXGO7kOb1MUKRFMysCChAoggJCIg0GC2aNe4gqQldfL4l%2FAg1AXySJgn5LcoE3QXI3IQAh%2BQQACgADACwAAAAAEAAQAAAFdiAgAgLZNGU5joQhCEjxIssqEo8bC9BRjy9Ag7GILQ4QEoE0gBAEBcOpcBA0DoxSK%2Fe8LRIHn%2Bi1cK0IyKdg0VAoljYIg%2BGgnRrwVS%2F8IAkICyosBIQpBAMoKy9dImxPhS%2BGKkFrkX%2BTigtLlIyKXUF%2BNjagNiEAIfkEAAoABAAsAAAAABAAEAAABWwgIAICaRhlOY4EIgjH8R7LKhKHGwsMvb4AAy3WODBIBBKCsYA9TjuhDNDKEVSERezQEL0WrhXucRUQGuik7bFlngzqVW9LMl9XWvLdjFaJtDFqZ1cEZUB0dUgvL3dgP4WJZn4jkomWNpSTIyEAIfkEAAoABQAsAAAAABAAEAAABX4gIAICuSxlOY6CIgiD8RrEKgqGOwxwUrMlAoSwIzAGpJpgoSDAGifDY5kopBYDlEpAQBwevxfBtRIUGi8xwWkDNBCIwmC9Vq0aiQQDQuK%2BVgQPDXV9hCJjBwcFYU5pLwwHXQcMKSmNLQcIAExlbH8JBwttaX0ABAcNbWVbKyEAIfkEAAoABgAsAAAAABAAEAAABXkgIAICSRBlOY7CIghN8zbEKsKoIjdFzZaEgUBHKChMJtRwcWpAWoWnifm6ESAMhO8lQK0EEAV3rFopIBCEcGwDKAqPh4HUrY4ICHH1dSoTFgcHUiZjBhAJB2AHDykpKAwHAwdzf19KkASIPl9cDgcnDkdtNwiMJCshACH5BAAKAAcALAAAAAAQABAAAAV3ICACAkkQZTmOAiosiyAoxCq%2BKPxCNVsSMRgBsiClWrLTSWFoIQZHl6pleBh6suxKMIhlvzbAwkBWfFWrBQTxNLq2RG2yhSUkDs2b63AYDAoJXAcFRwADeAkJDX0AQCsEfAQMDAIPBz0rCgcxky0JRWE1AmwpKyEAIfkEAAoACAAsAAAAABAAEAAABXkgIAICKZzkqJ4nQZxLqZKv4NqNLKK2%2FQ4Ek4lFXChsg5ypJjs1II3gEDUSRInEGYAw6B6zM4JhrDAtEosVkLUtHA7RHaHAGJQEjsODcEg0FBAFVgkQJQ1pAwcDDw8KcFtSInwJAowCCA6RIwqZAgkPNgVpWndjdyohACH5BAAKAAkALAAAAAAQABAAAAV5ICACAimc5KieLEuUKvm2xAKLqDCfC2GaO9eL0LABWTiBYmA06W6kHgvCqEJiAIJiu3gcvgUsscHUERm%2BkaCxyxa%2BzRPk0SgJEgfIvbAdIAQLCAYlCj4DBw0IBQsMCjIqBAcPAooCBg9pKgsJLwUFOhCZKyQDA3YqIQAh%2BQQACgAKACwAAAAAEAAQAAAFdSAgAgIpnOSonmxbqiThCrJKEHFbo8JxDDOZYFFb%2BA41E4H4OhkOipXwBElYITDAckFEOBgMQ3arkMkUBdxIUGZpEb7kaQBRlASPg0FQQHAbEEMGDSVEAA1QBhAED1E0NgwFAooCDWljaQIQCE5qMHcNhCkjIQAh%2BQQACgALACwAAAAAEAAQAAAFeSAgAgIpnOSoLgxxvqgKLEcCC65KEAByKK8cSpA4DAiHQ%2FDkKhGKh4ZCtCyZGo6F6iYYPAqFgYy02xkSaLEMV34tELyRYNEsCQyHlvWkGCzsPgMCEAY7Cg04Uk48LAsDhRA8MVQPEF0GAgqYYwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA%3D%3D';
var uriConfig = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHaSURBVDjLlZO7a1NRHMfzfzhIKQ5OHR1ddRRBLA6lg4iTd5PSas37YR56Y2JiHgg21uoFxSatCVFjbl5iNBBiMmUJgWwZhCB4pR9%2FV4QKfSQdDufF5%2Fv7nu85xwJYprV0Oq0kk8luIpEw4vG48f%2FeVDiVSikCTobDIePxmGg0yokEBO4OBgNGoxH5fJ5wOHwygVgsZpjVW60WqqqWzbVgMIjf78fn8xlTBcTy736%2FT7VaJRQKfQoEArqmafR6Pdxu9%2FECkUjkglje63Q6NBoNisUihUKBcrlMpVLB6XR2D4df3VQnmRstsWzU63WazSZmX6vV0HWdUqmEw%2BGY2Gw25SC8dV1l1wrZNX5s3qLdbpPL5fB6vXumZalq2O32rtVqVQ6GuGnCd%2BHbFnx9AZrC%2BMkSHo%2Fnp8vlmj%2FM7f4ks6yysyawgB8fwPv70HgKG8v8cp%2F7fFRO%2F%2BAllewqNJ%2FDhyBsi9A7J1QTkF4E69mXRws8u6ayvSJwRqoG4K2Md%2BygxyF5FdbPaMfdlIXUZfiyAUWx%2FOY25O4JHBP4CtyZ16a9EwuRi1CXs%2B5K1ew6lB9DXERX517P8tEsPDzfNIP6C5YeQewSrJyeCd4P0bnwXYISy3MCn5oZNtsf3pH46e7XBJcAAAAASUVORK5CYII%3D';
var uriHelp = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKkSURBVDjLpZPdT5JhGMb9W%2BBPaK3matVqndXWOOigA6fmJ9DUcrUMlrN0mNMsKTUznQpq6pyKAm8CIogmypcg8GIiX8rHRHjhVbPt6o01nMvZWge%2Fk3vP9duuZ%2FedAyDnf%2FhjoCMP2Vr3gUDj3CdV6zT1xZ6iFDaKnLEkBFOmPfaZArWT5sw60iFP%2BBAbOzTcQSqDZzsNRyCNkcVoaGghzDlVQKylOHJrMrUZ2Yf52y6kc36IxpyoH1lHF7EBgyMKV4jCJ5U%2F1UVscU4IZOYEa3I1HtwI01hwxlDLhDoJD%2FwxGr5YGmOLAdRIrVCuhmD3JdA6SQabx12srGB0KSpc86ew4olDOGjH4x4z0gdHDD9%2Bc4TaQQtq%2Bk2Yt0egXYugTmoVZgV9cyHSxXTtJjZR3WNCVfcK%2FNE0ppYDUNu2QTMCtS0IbrsOrVMOWL27eNJtJLOCDoWXdgeTEEosqPxoBK%2FTwDzWY9rowy51gJ1dGr2zLpS2aVH5QQ%2BHbw88sZ7OClrGXbQrkMTTAQu4HXqUv9eh7J0OSfo7tiIU%2BGItilpUuM%2FAF2tg98eR36Q%2BFryQ2kjbVhximQu8dgPKxPMoeTuH4tfqDIWvCBQ2KlDQKEe9dBlGTwR36%2BTHFZg%2BQoUxAL0jgsoOQzYYS%2BwjskcjTzSToVAkA7Hqg4Spc6tm4vgT%2BeIFVvmb%2BeCSMwLlih%2FcNg0KmpRoGzdl%2BBXOb5jAsMYNjSWAm9VjwesPR1knFilPNMu510CkdPZtqK1BvJQsoaRZjqLGaTzv1UNp9EJl9uNqxefU5QdDnFNX%2BY5Qxrn9bDLUR6zjqzsMizeWYdG5gy6ZDbk8aehiuYRz5jHdeDTKvlY1IrhSMUxe4g9SuVwpdaFsgDxf2i84V9zH%2Fus1%2Fis%2FAdevBaK9Tb3EAAAAAElFTkSuQmCC';
var uriClose ='data:image/gif;base64,R0lGODlhEAAQAIAAAFpCMf%2F%2FmSH5BAQUAP8ALAAAAAAQABAAAAIWhI%2Bpy%2B0PVwhmvmlhvphXGoXiSJZLAQA';
var uriDelicious = 'data:image/gif;base64,R0lGODlhEAAQAJEAAAAAAN3d3QAA%2F1pCMSH5BAQUAP8ALAAAAAAQABAAAAIjnI%2Bpy%2B0jYnxyuipo1VKB%2FwWi6IHASCbmiZYgGrhh%2B9T2XQAAOw%3D%3D';
var uriPlay = 'data:image/gif;base64,R0lGODlhJAAQAIAAAFpCMf%2F%2FmSH5BAQUAP8ALAAAAAAkABAAAAIyhI%2Bpy%2B0Po5y02otf2OHsxHkd8DVfWRrnSIYOx6atq7Km3SKrji%2FyPNqJMsSi8YhMXgoAOw%3D%3D';
var uriViewAlbum = 'data:image/gif;base64,R0lGODlhEAAQAIAAAFpCMf%2F%2FmSH5BAQUAP8ALAAAAAAQABAAAAIjhI%2Bpy60BI2ThUSClrady5IHYJn7deJpGFqFWonZs7NS2XQAAOw%3D%3D';
var uriSearch = 'data:image/gif;base64,R0lGODlhEAAQAJEAAFpCMf%2F%2FmcwzAAAAACH5BAQUAP8ALAAAAAAQABAAAAIshI%2Bpq%2BEPHQqi2hvm3SIf2kGWZ4AYSALmiGqV%2BLpc%2FLFbunL4PE7RzwgKFwUAOw%3D%3D';
var uriError = 'data:image/gif;base64,R0lGODlhEAAQAJEAAFpCMf%2F%2FmcwzAAAAACH5BAQUAP8ALAAAAAAQABAAAAIrhI%2Bpq%2BEPHQqi2hvm3SIfajmYFoKVZ5idigIsS3JnvI6fHNJcG%2FUtAwweCgA7';

function replaceSpace (str) {
	return str.replace(/\s+/g, '');
}

/* Text sent to Rhapsody needs a bit of massaging. */
function rhapsifyText(mytxt) {
	// Lowercase
	mytxt = mytxt.toLowerCase()
	// Remove HTML
	mytxt = mytxt.replace(/(<([^>]+)>)/ig,"");
	// Remove whitespace
	mytxt = replaceSpace(mytxt);
	// Remove special characters
	var re = /\n|\t|\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\_|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$|\./g;
    mytxt = mytxt.replace(re, "");


	// HACK: Rhapsody doesn't like "Various Artists." Replace with "album"
	if (mytxt == "variousartists") { mytxt = "album"; }

	return mytxt;
}

function makeTxtSearchReady (searchstr) {
	searchstr = searchstr.replace(/^\s*|\s*$/g,""); // Remove trailing spaces.
	searchstr = searchstr.replace(/(<([^>]+)>)/ig,"+");;
	// Remove special characters
	var re = /\n|\t|\$|,|@|#|~|`|\%|\*|\^|\&|\(|\)|\+|\=|\[|\-|\_|\]|\[|\}|\{|\;|\:|\'|\"|\<|\>|\?|\||\\|\!|\$|\./g;
    searchstr = searchstr.replace(re, "");
	return searchstr;
}

/*
	Breaking out GM_xmlhttpRequest in a generic might 
	seem like overkill but I think we'll probably be 
	using it more in the future. 
	
	Regardless, dynamic callbacks for GM_xmlhttpRequest 
	are considerably better than inline code on the onload.
*/
function goFetch(uri, callback) {
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: uri,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
	        'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
		onload: function (resp) {
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			var entries = dom.getElementsByTagName('available');
			for (var i = 0; i < entries.length; i++) {
				entries[i].textContent;
				
			}	

		}
	});
}

function setAlbumAvability(responseDetails) {
	var parser = new DOMParser();
	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
	var entries = dom.getElementsByTagName('available');
	for (var i = 0; i < entries.length; i++) {
		g_ALBUM_AVAILIBILITY = entries[i].textContent;
		alert(g_ALBUM_AVAILIBILITY);
	}	
}

function makeDeliciousLink (albumurl, myalbum) {
	var imgDelicious = document.createElement('img');
	// imgDelicious.setAttribute("style", "border: 1px solid #fff;");
	imgDelicious.src = uriDelicious;

	var rhapAddToDel = document.createElement("a");
	rhapAddToDel.setAttribute("href", "http://del.icio.us/post?v=4&url=" + albumurl + "&title=" + myalbum + "=&tags=rhapex");
	rhapAddToDel.setAttribute("target", "_blank");
	rhapAddToDel.setAttribute("title", "Add to del.icio.us");
	rhapAddToDel.appendChild(imgDelicious);

	var rhapAddToDelContainer = document.createElement("span");
	rhapAddToDelContainer.setAttribute("id", "reDelLink");
	rhapAddToDelContainer.appendChild(rhapAddToDel);

	return rhapAddToDelContainer
}

function buildRhapsodyLinks(myartist, myalbum) {
	var myurl = "http://www.rhapsody.com/";
	var artisturl = myurl + rhapsifyText(myartist) ;
	var albumurl = artisturl + '/' + rhapsifyText(myalbum);
	
	var rhapsearch = "http://www.rhapsody.com/-search?query=%keywords%&searchtype=RhapArtist";
	GM_xmlhttpRequest({
	    method: 'GET',
	    url: albumurl + '/data.xml',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'text/html,application/atom+xml,application/xml,text/xml',
	    },
		onload: function (resp) {
			var rhapAlbum = document.createElement("td");
			rhapAlbum.setAttribute("td", "reA1");
			var parser = new DOMParser();
			var dom = parser.parseFromString(resp.responseText, "application/xml");
			var entries = dom.getElementsByTagName('available');
			var avail = "";
			var albumlink = "";
			var rhapAlbum = document.createElement("td");
			rhapAlbum.setAttribute("id", "reA1");
			if (entries.length < 1) {
				avail = "";
			} else {
				avail = rhapsifyText(entries[0].textContent);
			}
			

			switch (avail){ // Found, available
				case "true":
					var u = albumurl.replace("http://www", "http://play");
					var play_btn = "<a href=\"" + albumurl + "\" title=\"View: " + myalbum + "\" target=\"_blank\">View</a> | <a href=\"" + LinkMod(u) + "\" title=\"Play: " + myalbum + "\" target=\"_blank\">Play</a>";
					rhapAlbum.appendChild(makeDeliciousLink (albumurl, myalbum)); 
					rhapAlbum.innerHTML = rhapAlbum.innerHTML + play_btn;
					break;
				case "false": // Found but not available
    				var imgUnfound = document.createElement('img');
						imgUnfound.src = uriViewAlbum;
				    var rhapLink = document.createElement("a");
				    rhapLink.setAttribute("href", "albumurl");
				    // rhapLink.setAttribute("target", "_blank");
				    rhapLink.setAttribute("title", "Album found but not available. Click to view.");
				    // rhapLink.appendChild(imgUnfound);
						rhapLink.innerHTML = "View (Play Unavailable)";
						rhapAlbum.appendChild(rhapLink);
					break;
				case "": // No results found
					var imgUnfound = document.createElement('img');
					imgUnfound.src = uriSearch;

				    var rhapLink = document.createElement("a");
					/* We search on album name b/c some artists will be "Various Artists" and will return bad results. */
				    rhapLink.setAttribute("href", rhapsearch.replace("%keywords%", makeTxtSearchReady(myartist)));
				    // rhapLink.setAttribute("target", "_blank");
				    rhapLink.setAttribute("title", "Album not found. Click to search Rhapsody.com.");
				    // rhapLink.appendChild(imgUnfound);
					// rhapLink.innerHTML = 'FAIL: ' + albumurl + '/data.xml';
					rhapLink.innerHTML = "Not Found: Click to Search"

					rhapAlbum.appendChild(rhapLink);
					break;

				default:
					var imgUnfound = document.createElement('img');
					imgUnfound.src = uriError;
					rhapAlbum.appendChild(imgUnfound);
					break;
			}

			var theStatusBar = document.getElementById('reA1');
		    theStatusBar.parentNode.replaceChild(rhapAlbum, theStatusBar);

		}
	});
}

function LinkMod ( rawlink ) {
    // truelink = g_UrlCT.replace("%desturl%", rawlink);
	return rawlink;
}

function BuildJS () {
	var urSuchaHead = document.getElementsByTagName('head')[0];

	var myJScript = document.createElement('script');
	myJScript.type = "text/javascript";
	myJScript.innerHTML = 'function rhapexClose(d) { document.getElementById(d).style.display = "none"; }\n';
	myJScript.innerHTML = myJScript.innerHTML + 'function rhapexStatus(sMsg) { window.status = sMsg; return true; }\n';	
	urSuchaHead.appendChild(myJScript);
	return;
}

function BuildCSS () {
	var urSuchaHead = document.getElementsByTagName('head')[0];

	var myCSS = document.createElement('style');
	myCSS.type = 'text/css';
	myCSS.innerHTML = '#re_container { position: absolute; top: 0px; left: 0px; color: #FFFF99; z-index: 10; font-family: arial, verdana, sans serif;} ' +
	'#re_container a { color: #FFFF99; }' +
	'#re_container a:hover { color: #CC6600; }' +
	'img { vertical-align:middle; }' +
	'#reRe { padding: 0 10px 0 0; color: #FFFF99; }' + 
	'#reDelLink { padding-right: 10px; }' +
	'#reViewAlbum { padding-right: 5px; }' +
	'#rePlayerCell { background-color: #5a4231; }' + 
	'#rePlayerCellCorner { width: 10px; background: url(data:image/gif;base64,R0lGODlhCgAKAIMAAP%2F%2F%2F%2FTy8enm5N7Z1tPNyMjAur2zrbKnn6eakZyOg5GBdoZ0aHtoWnBbTGVPP1pCMSH%2BHmh0dHA6Ly93aWdmbGlwLmNvbS9jb3JuZXJzaG9wLwAh%2BQQBAAAAACwAAAAACgAKAAAEG%2FDJSSt1drIsD38BdwDZApCVeVbjSTrMEbhnBAA7) no-repeat bottom right; }' + 
	'#reMatrix td { padding: 0px 0px 0px 5px; color: #FFFF99; font-weight: 900; font-size: 12px; vertical-align: bottom; }';

	// TAN: #D6A00C
	// DARK BROWN: #5a4231

	urSuchaHead.appendChild(myCSS);
	return;
}

function FirstRun() {
	// function GM_setValue(key, value);
	// function GM_getValue(key, defaultValue);
}


// GO

// STEP 1: Fetch the artist and album meta
// PITCHFORK - The artist & album can't be pulled from the URL so we have to bust it out of the HTML
var allSpans, thisSpan;
allSpans = document.evaluate(
    "//span[@class=\"reviewtitle\ fn\"]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < allSpans.snapshotLength; i++) {
    thisSpan = allSpans.snapshotItem(i);
		myartistalbum = thisSpan.innerHTML
		var artistalbum_array = myartistalbum.split("<br>");
		// Clean up any nonsense in the string
		re = /\n|\t/g;
    
		artistalbum_array[0] = artistalbum_array[0].replace("&nbsp;", ""); // PFM is putting a space after the artist name now...
		artistalbum_array[0] = artistalbum_array[0].replace(re, "");
    artistalbum_array[1] = artistalbum_array[1].replace(re, "");
}

BuildJS();
BuildCSS();

var statusbar = document.createElement("div");
statusbar.setAttribute("id", "rhapstar_statusbar");
statusbar.setAttribute("class", "re_statusbar");
var sbText = document.createElement("span");
sbText.innerHTML = 'Checking Rhapsody.com';

// Working animation
var imgWaiting = document.createElement('img');
imgWaiting.src = uriWaiting;

// Config icon
// var imgConfig = document.createElement('img');
// imgConfig.src = uriConfig;

// Close button
var closeButton = document.createElement('a');
closeButton.setAttribute("href", "#");
closeButton.setAttribute("onclick", "javascript:document.getElementById('re_container').style.display = 'none'");
var imgClose = document.createElement('img');
imgClose.src = uriClose; 
closeButton.appendChild(imgClose);

var rhapContainer = document.createElement("div");
rhapContainer.setAttribute("id", "re_container");
rhapContainer.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" style="border-top: 5px solid #CC6600"><tr><td rowspan="2" id="rePlayerCell"><table id="reMatrix" border="0"><tr><td id="reRe">RhapEx</td><td id="reA1"></td><td id="reY1"></td><td id="reZ1"></td></tr></table></td><td id="rePlayerCell" height="25">&nbsp;</td></tr><tr><td height="10" id="rePlayerCellCorner"><div></div><td></tr></table>';

var body = document.getElementsByTagName('body')[0];
body.appendChild(rhapContainer);

// Build the initial player
tmpBuildPlayer = document.getElementById('reA1');
tmpBuildPlayer.appendChild(imgWaiting);

/* Config icon */
//tmpBuildPlayer = document.getElementById('reY1');
//tmpBuildPlayer.appendChild(imgConfig);

/* Close button */
tmpBuildPlayer = document.getElementById('reZ1');
tmpBuildPlayer.appendChild(closeButton);

// alert(artistalbum_array[0] + "\n" + artistalbum_array[1]);

//STEP 2: Add Rhapsody links to the page
buildRhapsodyLinks(artistalbum_array[0], artistalbum_array[1]);