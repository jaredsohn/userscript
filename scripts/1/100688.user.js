// ==UserScript==
// @name           Pixiv Translation Plus Enhancer and Image Enbiggenator
// @namespace      http://userscripts.org/users/318347
// @description    Adds custom PTP menu to side of tags pages, enlarges images, removes loading-via-scrollto in manga, and adds 'related' bookmark link.
// @version        110406
// @include        http://www.pixiv.net/*
// @include        http://pixiv.net/*
// @author         RandomDryad
// ==/UserScript==

var ptptrycount=0;
var imageSearch = "http://danbooru.iqdb.hanyuu.net/db-search.php?url=";
var debug=false;

location.href.match(/\/([^\/]+)\.php/);
var pagetype=RegExp.$1;

function tryptplist() {
	if(ptptrycount>20) return;
	var ptpclist=document.getElementById('ptp_custom_list');
	
	if(ptpclist) {
		var clist=ptpclist.cloneNode(true);
		clist.setAttribute('id','clist');
		clist.setAttribute('style','float: left; position: absolute; spacing: 0px;');
		var clistlen=clist.rows.length;
		if(debug) document.title='got ptplist, pagetype: ' + pagetype + ', tries: ' + ptptrycount + ', listlen: ' + clist.rows.length;
		var pwrapper=document.getElementById('wrapper');
		for(i=0;i<clistlen;i++) {
			clist.rows[i].deleteCell(2);
			clist.rows[i].deleteCell(0);
			clist.rows[i].cells[0].removeAttribute('class');
			clist.rows[i].cells[0].setAttribute('style','padding: 0px; margin: 0px;');
			clist.rows[i].cells[0].firstElementChild.setAttribute('style','font-size: 10px;');
			if(clist.rows[i].cells[0].firstElementChild.href==document.location) {
				clist.rows[i].cells[0].firstElementChild.style.color='#BB0055';
			}
		}
		pwrapper.parentNode.insertBefore(clist,pwrapper);
	} else {
		ptptrycount++;
		window.setTimeout(tryptplist,100);
		if(debug) document.title='nolist: ' + ptptrycount;
	}
}

if(pagetype=='member_illust') {

	var mode = location.href.replace(/(.*(&|\?)mode=|&.*)/g,'');
	var image = null;

	for (var i = 0; i < document.links.length; i++) {
		var elem = document.links[i];
		if  ( (elem.href.match(/bookmark_add\.php\?.*illust_id=([0-9]*)/i)) && (!elem.innerHTML.match(/^Edit$/) ) ) {
			elem.parentNode.className="";
			elem.parentNode.insertBefore(document.createTextNode('[ '),elem);
			elem.innerHTML="Bookmark";
			//elem.setAttribute('style','float:left; width: 100px;');
			
			link2=elem.cloneNode(true);
			link2.href="bookmark_detail.php?illust_id=" + RegExp.$1;
			link2.innerHTML="Related";
			//link2.setAttribute('style','float:right; width: 100px;');
							
			elem.parentNode.appendChild(document.createTextNode(' | '));
			elem.parentNode.appendChild(link2);
			elem.parentNode.appendChild(document.createTextNode(' ] '));
		}
/*		
		for (var j = 0; j < Hrefs2.length; j++) { 
		  var HrefRegex = Hrefs2[j];
		  if (elem.href.match(HrefRegex)) {
		    elem.target = "";
		  }
		}
*/		
	}
	
	if( mode == 'medium' ) {
		var link = document.evaluate("//div/a[contains(@href,'mode=big') or contains(@href,'mode=manga')]",
									  document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		//Make link open in same window
		link.removeAttribute('target');

		//For non-manga images, force the display of the full size (scaled) and link it to the image search
		if( /mode=big/.test(link.href) ) {
			image = link.firstChild;
			image.setAttribute("style", "max-width: 740px; height: auto; width: auto;");
			image.src = image.src.replace(/(\/\d+)_m\./,'$1.');
			link.href = imageSearch + image.src.replace(/(\.[^\.]+$)/,'_s$1') + "&fullimage=" + image.src;
		}
	} else if( mode == 'manga' ) {
		//var bigLink = 'http://www.pixiv.net/member_illust.php?mode=manga_big&illust_id='+location.href.replace(/(.*illust_id=|[^\d].*)/g,'') + '&page=';
		for (var i = 0; i < document.images.length; i++) {
			var elem=document.images[i];
			if(elem.src.match(/transparent\.gif/i)) {
				var scr=elem.parentNode.getElementsByTagName("script");
				//elem.parentNode.style.margin='0px';						// breaks scroller
				var scrsrc=scr[0].innerHTML.replace(/(.*unshift\(('|")|('|").*)/g,'');
				elem.src=scrsrc;
				elem.parentNode.className="image-container";					// fixes scroller
			}
		}
	} else if( mode == 'manga_big' || mode == 'big' ) {
		var link = document.getElementsByTagName("a")[0];
		link.removeAttribute( "onclick" );
		image = link.firstChild;
		link.href = imageSearch + image.src;
	}
	//"View image" shortcut with Ctrl+x when viewing single image
	if( image ) {
		window.addEventListener("keypress", function(key) {
			if( key.ctrlKey && String.fromCharCode(key.charCode) == 'x' )
				location.href = image.src;
		}, true);
	}	
} else if(pagetype=='tags') {
	tryptplist();
}
//searchbar = document.getElementsByClassName("search_area")[0];
//if (searchbar) searchbar.jsadefaultvalue="";
