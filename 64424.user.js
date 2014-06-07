// ==UserScript==
// @name           Mangahelpers auto thanks + direct link
// @namespace      http://userscripts.org/scripts/show/64424
// @description    thanks automatically + directly links to download or external site 
// @include        http://mangahelpers.com/s/*/details/*
// @include        http://mangahelpers.com/downloads/details/*
// @copyright      2009+, Toost Inc.
// @license        kopimi http://www.kopimi.com/kopimi/
// @version        2.6
// @require        http://code.jquery.com/jquery-1.3.2.min.js
// ==/UserScript==


var	xpath = document.evaluate(
    "//html/body/div/div[2]/div/div/div/div[4]/form",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
var place = xpath.snapshotItem(0);

if(place!=null){
	
	var	xpath = document.evaluate(
    "/html/body/div/div[2]/div/div/div/div[4]/form",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	var place = xpath.snapshotItem(0);	
	
	var br = document.createElement('br')
	place.appendChild(br);

	
	var checkbox = document.createElement('input');
	checkbox.type='checkbox';
	checkbox.id='thankscheckbox';
	place.appendChild(checkbox);
	
	var text = document.createElement('label');
	text.id='thankstext';
	text.style.fontWeight='normal';
	text.innerHTML='Always say Thanks';
	place.appendChild(text);
		
	var checkboxmem = GM_getValue('checkboxmem');
	
	if (checkboxmem==null) {
	
		checkboxmem=false;
		GM_setValue('checkboxmem', checkboxmem);
		checkbox.checked=checkboxmem;
		
	}
	
	else {
		checkbox.checked=checkboxmem;
			if(checkboxmem==true) {
				sayThanks();
			}
	}


	
    checkbox.addEventListener('change',function () {checkboxchange()},false)

}	

else if(place==null) {

	var	xpath = document.evaluate(
    "/html/body/div/div[2]/div/div/div/div[4]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	var place = xpath.snapshotItem(0);	
	
	place.align='center';
	
	var	xpath = document.evaluate(
    "/html/body/div/div[2]/div/div/div/div[4]/h5",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	var h5 = xpath.snapshotItem(0);
	
	
	var br = document.createElement('br')
	place.insertBefore(br, h5);

	
	var checkbox = document.createElement('input');
	checkbox.type='checkbox';
	checkbox.id='thankscheckbox';
	checkbox.checked="GM_getValue('checkboxmem')"
	place.insertBefore(checkbox, h5);
	
	var text = document.createElement('label');
	text.id='thankstext';
	text.style.fontWeight='normal';
	text.innerHTML='Always say Thanks';
	place.insertBefore(text, h5);
		

    checkbox.addEventListener('change',function () {checkboxchange()},false)
	
}


$(document).ready( function() {
	var url = $("a[title*=Download]").attr("href");
	
	GM_xmlhttpRequest({
	method: "GET",
	url: url,
	onload: function (response) {

		var raw = response.responseText;
		
		var external = /Click here to be directed to your download/im.test(raw);
		
		if(external == true) {
		
			//GM_log(external);
		
			var link = new Array();
			
			var link = /<a href="http:\/\/.*" target="_blank" rel="nofollow">(?=Click here to be directed to your download)/im.exec(raw);
			

			//GM_log(link);
			
			var linktitle = $("a[title*=Download]").attr("title") + " [External]";
			
			//GM_log(linktitle);
			
			var link = link + ' title="' + linktitle + '" id="Downloadlink">';
			
			var link = link.replace(/>/,"");
			
			var test = /null/g.test(link);
			
			if(test == false) {
			
				var imgalt= ' alt="' + $("img[src*=download.png]").attr("alt") + ' (External)"';
			
				var img = '<img style="vertical-align: middle;" src="/static/images/buttons/download.png"' + imgalt + "/>"
			
				//GM_log(imgalt);
			
				//GM_log(img);
			
				$("a[title*=Download]").replaceWith(link + "\n" + img + "\n</a>");
			
				var newlink = $("#Downloadlink").attr("href");
			
				//GM_log("downloadlink was replaced with:" + newlink);
			}
		
		}
		
		else if(external == false) {
			
			//var raw = raw.replace(/\n/,"");
			
			var link = new Array();
			
			var link = /<a href=".*[zip|raw]"\n.*/im.exec(raw);
			var link = link + 'id="Downloadlink">'
			var link = link.replace(/>/, " ");
			var link = link.replace(/\stitle/,"title");
			var link = link.replace(/\n/, "");
			
			var test = /null/g.test(link);
			
			if(test == false) {			
			
				var imgalt= ' alt="' + $("img[src*=download.png]").attr("alt") + ' (Mangahelpers)"';
				var img = '<img style="vertical-align: middle;" src="/static/images/buttons/download.png"' + imgalt + "/>"		

				$("a[title*=Download]").replaceWith(link + "\n" + img + "\n</a>");
			
				var newlink = $("#Downloadlink").attr("href");
			
			
			//GM_log("downloadlink was replaced with:" + newlink);
		
			}	

		}		
		
	}	
		
	
	});
	
});


function checkboxchange() {
	
	if(checkbox.checked==true){
        sayThanks();
		GM_setValue('checkboxmem', checkbox.checked);
	}
	
	else if (checkbox.checked==false) {
		GM_setValue('checkboxmem', checkbox.checked);
	}
	

}
	
function sayThanks() {
	
	var	xpath = document.evaluate(
    "/html/body/div/div[2]/div/div/div/div[4]/form/input[2]",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	
	var Thanks = xpath.snapshotItem(0);
	
	Thanks.click();
	
}






