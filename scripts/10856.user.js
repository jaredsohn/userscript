 // ==UserScript==

// @name          MySpace Rich Edit (Images)

// @description	  Adds a simple rich edit interface (Italic, Bold, Blockquote, Center, Link) to any comment or bulletin textarea on MySpace. Changed by Anarchon to replace the Text with buttons (Update: Integrated Icons)

// @namespace     http://www.myspace.com/sean_is_a_bamf

// @include       http://*myspace.com/*
// @include       http*://*blogger.com*comment*
// @include       http://*typepad.com*comments*

// @exclude       http://*profileedit.myspace.com*
// @include       http://*flickr.com/*
// @exclude       http://*flickr.com/messages_write.gne*
// @include	  http://www.flickr.com/photos/

// ==/UserScript==


//Images Stats

var iconbold="data:image/gif,GIF89a%18%00%14%00%A2%00%00%00%00%00%FF%FF%FF%EF%ED%DEMMM%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%04%00%2C%00%00%00%00%18%00%14%00%00%03'(%BA%DC%FE0%CAI%AB%BDo%E8%AD%B1%D8%0Ax%89%A2Ev%23%87%A6C%B8Vg%CB%BA2%AC%BE%5E%AE%EF%7C%EFG%09%00%3B";
var iconkursiv="data:image/gif,GIF89a%18%00%14%00%A2%00%00%00%00%00%FF%FF%FF%EF%ED%DE%A6%A6%A6MMM%FF%FF%FF%00%00%00%00%00%00!%F9%04%01%00%00%05%00%2C%00%00%00%00%18%00%14%00%00%03%24(%BA%DC%FE0%CAI%AB%BD8%2B%C2%B9%DE%C4%F0%09%837r%E2W%12%A3%80%8Ek%FBj%5D%D7%DEx%AEc%09%00%3B";
var iconimg ="data:image/gif,GIF89a%18%00%14%00%B3%00%00%00%00%00%FF%FF%FF%FF%FFM%A6%A6M%EF%ED%DE%D3%D3%D3%A6%A6%A6MMM%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%08%00%2C%00%00%00%00%18%00%14%00%00%04_%90%C8I%AB%BD8%EB%BD%8F%FF%60%98%1DBP%9Ef*%1C%A3%AA%1A%9E%11%B0%18%E9%96%C70%90%F4u%DC%A6%DCn6B%A1%60%07%C3%AAe%04%F6%2C6%5CT%F5%AC%FCp%06%D8%EAJ%ACaa%B0B%E1Z%A5%FC%92%D9%F4A%7C%1E%A1%DF%D9%F5%B8%3CA%C7%EF%E1%B1%3B%C4%F7p%FE%80%81%82%16%11%00%3B";
var iconstrike ="data:image/gif,GIF89a%17%00%14%00%F7%00%00%00%00%00%80%00%00%00%80%00%80%80%00%00%00%80%80%00%80%00%80%80%80%80%80%C0%C0%C0%FF%00%00%00%FF%00%FF%FF%00%00%00%FF%FF%00%FF%00%FF%FF%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%003%00%00f%00%00%99%00%00%CC%00%00%FF%003%00%0033%003f%003%99%003%CC%003%FF%00f%00%00f3%00ff%00f%99%00f%CC%00f%FF%00%99%00%00%993%00%99f%00%99%99%00%99%CC%00%99%FF%00%CC%00%00%CC3%00%CCf%00%CC%99%00%CC%CC%00%CC%FF%00%FF%00%00%FF3%00%FFf%00%FF%99%00%FF%CC%00%FF%FF3%00%003%0033%00f3%00%993%00%CC3%00%FF33%0033333f33%9933%CC33%FF3f%003f33ff3f%993f%CC3f%FF3%99%003%9933%99f3%99%993%99%CC3%99%FF3%CC%003%CC33%CCf3%CC%993%CC%CC3%CC%FF3%FF%003%FF33%FFf3%FF%993%FF%CC3%FF%FFf%00%00f%003f%00ff%00%99f%00%CCf%00%FFf3%00f33f3ff3%99f3%CCf3%FFff%00ff3fffff%99ff%CCff%FFf%99%00f%993f%99ff%99%99f%99%CCf%99%FFf%CC%00f%CC3f%CCff%CC%99f%CC%CCf%CC%FFf%FF%00f%FF3f%FFff%FF%99f%FF%CCf%FF%FF%99%00%00%99%003%99%00f%99%00%99%99%00%CC%99%00%FF%993%00%9933%993f%993%99%993%CC%993%FF%99f%00%99f3%99ff%99f%99%99f%CC%99f%FF%99%99%00%99%993%99%99f%99%99%99%99%99%CC%99%99%FF%99%CC%00%99%CC3%99%CCf%99%CC%99%99%CC%CC%99%CC%FF%99%FF%00%99%FF3%99%FFf%99%FF%99%99%FF%CC%99%FF%FF%CC%00%00%CC%003%CC%00f%CC%00%99%CC%00%CC%CC%00%FF%CC3%00%CC33%CC3f%CC3%99%CC3%CC%CC3%FF%CCf%00%CCf3%CCff%CCf%99%CCf%CC%CCf%FF%CC%99%00%CC%993%CC%99f%CC%99%99%CC%99%CC%CC%99%FF%CC%CC%00%CC%CC3%CC%CCf%CC%CC%99%CC%CC%CC%CC%CC%FF%CC%FF%00%CC%FF3%CC%FFf%CC%FF%99%CC%FF%CC%CC%FF%FF%FF%00%00%FF%003%FF%00f%FF%00%99%FF%00%CC%FF%00%FF%FF3%00%FF33%FF3f%FF3%99%FF3%CC%FF3%FF%FFf%00%FFf3%FFff%FFf%99%FFf%CC%FFf%FF%FF%99%00%FF%993%FF%99f%FF%99%99%FF%99%CC%FF%99%FF%FF%CC%00%FF%CC3%FF%CCf%FF%CC%99%FF%CC%CC%FF%CC%FF%FF%FF%00%FF%FF3%FF%FFf%FF%FF%99%FF%FF%CC%FF%FF%FF!%F9%04%01%00%00%10%00%2C%00%00%00%00%17%00%14%00%00%08%A4%00%FF%F9%13H%10%1F%C1%81%03%0D%22%24H%ED%1F5%7F%0D%1FF%84%E8%90%A2D%87%18%076%D4%C8%B0%23%C7%8B%12!Z%14%09%92%22%C7%84%1E%FF)%CC%88%11%A4%9F)%2F%FDP%8B%09%13%24%CB%8D15%C6%DC%D8%92%24E%98SD%02%F5%C9s!%BE%9C%02%91.%8CH-U%D3%A7N%A3Bm%DA%D2!%B5%ABX%B3j%C5Z%F1%AA%D4%AFS%A3%9Ady%B4fR%98'%7BN%1C%DA%10h%D7%AA'c%A6%FA%97jg%C7%90%25%81%EE%24z%B0%60_%94%0B%3F%8E%9CH%F8m%C4%94%3C%13%DF%1DL%B2kc%89%01%01%00%3B";
var iconuline="data:image/gif,GIF89a%18%00%14%00%A2%00%00%00%00%00%FF%FF%FF%EF%ED%DE%A6%A6%A6MMM%FF%FF%FF%00%00%00%00%00%00!%F9%04%01%00%00%05%00%2C%00%00%00%00%18%00%14%00%00%03-(%BA%DC%FE0%CAI%AB%BD%8Fh%226%BF%DA%12bc%F7%81gi%95j%C5%9Ek%0A%BB%C4%20%0C-%BDa%3C%E4%FD%BD%A0pHd%24%00%00%3B";
var iconquote="data:image/gif,GIF89a%18%00%14%00%C4%00%00%00%00%00%FF%FF%FF%BF%A0%A4%9A%81%88ges%DA%F4%ED%EC%E9%D8%C0%C0%C0TTTIIIAAA555***(((!!!%20%20%20%1A%1A%1A%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%11%00%2C%00%00%00%00%18%00%14%00%00%05x%A0!%8Edi%9Eh%9A%26l%82%2Cp%AC%8AI%60%17%F8%A1%EB%CB%5C%07%B8%C2n%E7%F0%05%00%05%C0%01%C0%5C%0A%1C%04U%228%D4%09%04%80h%0A%91%AB%5E%B1Z%D4%22%D9T2%AFY%D5%A2z%F8%0A%06%E9%D4z%E8%1E%C0%C3%A75%13%80e%C2%EFj%3Buv%80rV_%84vq)%0F%0F%7B~p%10%04x(%93%96%04%0D%03%0C%943%25%0A%0C%9D3%08%A1%A4%A5%A4!%00%3B";
var iconcenter="data:image/gif,GIF89a%18%00%14%00%A2%00%00%00%00%00%FF%FF%FF%EC%E9%D8%2B%16%0B%FF%FF%FF%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%04%00%2C%00%00%00%00%18%00%14%00%00%03!(%BA%DC%FE0%CAI%AB%1C8km%FB%DB%9B'.%609%8C%A3%89%A1%A2%1A%B2%9D%0B%CFtmS%09%00%3B";
var iconurl="data:image/gif,GIF89a%18%00%14%00%F7%00%00%FF%FF%C3%FF%FD%C6%FD%EB%B8%FF%EB%B0%E0%ED%EA%EC%EC%DE%9E%FF%FC%E2%EC%E5%E7%EB%DF%FF%E9%AE%EC%E9%D8%EB%E8%D7%E9%E6%D5%E8%E5%D5%FF%E1%AD%FE%E0%AC%E5%E2%D1%E4%E1%D0%FF%DB%A2%E0%DD%CD%8D%F8%98%EB%D7%CE%FF%D7%96%D7%DB%D4%DD%DA%CA%DB%D9%C9%C2%DD%E6%D8%D5%C5%5C%F2%FD%FF%CC%92%FF%CB%8F%D4%D1%C2%FF%CA%8A%B5%D5%E9%EF%C7%B6%CE%CC%BD%FE%C1%85%F2%BF%ABS%E3%FF%C6%C4%B5%FF%B6z%EB%BB%83%C6%C1%B3%C2%C0%B2%C1%C0%B7%FE%B4%80%B2%C4%B9%8C%C8%EE%C1%BE%B0%FF%B1se%D4%E8Q%D7%FF%FC%B1%80%A8%BE%CF%FF%ADu%FF%ADs%D7%B5%8D%FF%ABt%BC%B9%AC%FF%AAs%85%BF%F5%B8%B6%A9%C8%B2%A1%84%C2%D0%EF%A9%8D%F3%A5%8F%B6%B4%A7%B5%B3%A7%EC%A8u%FF%A2n%8B%B7%E2%FF%9Fc%FF%9Fn%B3%B0%A3%DC%A6%81q%B8%FF%EA%9D%81v%B3%ED%E7%9B%8C%FF%98g%5B%B8%E1%94%AB%BB%CE%A0tC%BB%FF%FF%92c%FF%90a%A7%A4%98%AD%A1%A2%A5%A3%9C%FF%8Dc%FF%8DV%B4%9B%99%CE%97za%B6t%FF%89%5D%A1%9F%93%D4%94g%E0%8Fy%FF%87Y%CB%92%8A%D5%90%7B%3E%AC%FF%DC%8D_%40%AA%FF%E1%8AfZ%A2%EE%CD%8F_%FF%82O%FF%7DS%E0%85XZ%9D%E7K%9D%F52%B9'%E9%7CV2%9D%FFd%9Cu%8F%8D%82%E9wL%3B%9A%FCX%94%D67%99%FC%E8sOV%92%D4%8A%88~%AB%83D%BDy%5D%5B%90%9E%87%85%7CO%8D%B67%8D%EC%9E%7Bk9%99k5%8A%F0F%87%CDj%82%9C%BAoT3%86%E3%BDlS%93vj%B1oV1%82%DBD%7F%C5%20%9B%1Bwvm8%88%5DG%7D%9Cvtl0%7D%D5%3Fz%C5%40y%BF0%7B%CC%40w%BB.w%C8Ax%85%3At%BC2u%BCFl%B5%2Bs%C17o%AE.n%B2%C4M5%0A%88%107o%864k%A0(k%B7bae4l%7D6r02lg(h%AF1kh%7CVG%22g%B5%26s3(f%9C%26c%A8'c%A89_%8E%23%60%AA%07u%010Y%9D!h%22dPK1V%86%1Ah%0ACPh%1ES%B33Qz%08i%06%1CQ%9F(RnbE%40%0Eb%00(Nd%24K%87YC%3D%19H%85%20E%83%04W%03M8%5DAA!%5D6%2F.%3F%60%00D%98%7B%25Fb0%25d.'67Nd)J25N%08-%95%2B(P%00)%00%3B%05e%26%10%0D%00%0B%7B%00%00%8D%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%FC%14%00%FF%00%2C%00%00%00%00%18%00%14%00%40%08%FF%00%15%08%1CH%B0%A0A%83%05x%C8%91A%C1%85%13*b%D6h9%02%26%19%9D%06%07%07Fy%E5*%12%A5F%97%8A%3D%FB%821c%C6%0A4P%D8%F0%90%20%C0%00%22%CD%F6%400%E8%C6%12%22%3C%9C%90Q3%06%E9%13%AC9%C1%AC%984)%02%08%930d%B8HI%B1jEF%02%2F%BA%84%E2%83%C4K%91%3C%A0%12%F5%F9%F5!c%93%40gfp%D8%E2%A0M5l%D7%96%11%1B2%F4B%A1T%A46%B5%02VK%95%A7%3B%C2Ja%18ZpD%8F%1E'%22%F0%1D%5CP%85%20E%0C%08%97hA%A2%C3%03%01%12%2C%98%19%06%C3%24%02%0D%3F%AE%DCx%B2%23%0E%1A%25%87%9CI%DA%90%F1%C0%12(p%1C%A9%C9%C2%A6J%0E%10%00p%D8%9A%901%C4%9B2%26%0C%F8%08%12%A3%0E3h%C7%A6%FD%C9%602%0D%23%3BS%00%8DYdM%9A%AE%5E%99%7Ca%19j%04S%A7I%84%06%CD%E2%85%CB%94%26%3F%CAt%F0%1F%AD%C1J%96%A8S%A8FU%D2C%2BZ%12%C2%0AX%18%8AukW%AEG%3A%16%C0%DFO0%20%00%3B";

var iconwidth="25";
var iconheight="25";



//Images Stats End
unsafeWindow.tagIt = function (tagOpen,tagClose,i) {

	// most of this bit is from http://placenamehere.com/photographica/js_textareas.html

	var ta = unsafeWindow.textArray[i];

	var st = ta.scrollTop;

		

	if (ta.selectionStart | ta.selectionStart == 0) { // Mozzzzzzila relies on builds post bug #88049

		// work around Mozilla Bug #190382

		if (ta.selectionEnd > ta.value.length) { ta.selectionEnd = ta.value.length; }



		// decide where to add it and then add it

		var firstPos = ta.selectionStart;

		var secondPos = ta.selectionEnd+tagOpen.length; // cause we're inserting one at a time



		ta.value=ta.value.slice(0,firstPos)+tagOpen+ta.value.slice(firstPos);

		ta.value=ta.value.slice(0,secondPos)+tagClose+ta.value.slice(secondPos);

		

		// reset selection & focus... after the first tag and before the second 

		ta.selectionStart = firstPos+tagOpen.length;

		ta.selectionEnd = secondPos;

		//ta.focus();

		ta.scrollTop=st;

	}	

}



unsafeWindow.linkIt = function (i) {

	var myLink = prompt("Enter URL:","http://");
	var name = prompt("Enter the name of the website:");

	if (myLink != null) {

		unsafeWindow.tagIt('<a href="' +myLink+ '" target="_blank">','' +name+ '</a>', i);

	}

}

unsafeWindow.linkImg = function (i) {

	var myImg = prompt("Enter Image URL:","http://");

	if (myImg != null) {

		unsafeWindow.tagIt('<img src="' +myImg+ '">','', i);

	}

}

textareas = document.evaluate("//textarea",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

unsafeWindow.textArray = new Array();unsafeWindow.textArray = new Array();



for (i=0; i<textareas.snapshotLength; i++) {

	// if this is not the extra special hidden textarea from the "invite to group" widget

	if (!textareas.snapshotItem(i).getAttribute('style') || textareas.snapshotItem(i).getAttribute('style').indexOf("display: none") == -1){

		unsafeWindow.textArray[i] = textareas.snapshotItem(i);

		var accessBar = document.createElement("div");

		accessBar.setAttribute('style','');

		accessBar.innerHTML = 
			
			"<a href=\"javascript:tagIt('<b>','</b>',"+ i +")\"><b><img src="+iconbold+" width="+iconwidth+" height="+iconheight+"></b></a> " +
			"<a href=\"javascript:tagIt('<s>','</s>',"+ i +")\"><b><img src="+iconstrike+" width="+iconwidth+" height="+iconheight+"></b></a> " +
			"<a href=\"javascript:tagIt('<i>','</i>',"+ i +")\"><b><img src=" +iconkursiv+ " width="+iconwidth+" height="+iconheight+"></b></a> " +
			"<a href=\"javascript:tagIt('<u>','</u>',"+ i +")\"><b><img src="+iconuline+" width="+iconwidth+" height="+iconheight+"></b></a> " +
			"<a href=\"javascript:tagIt('[QUOTE]','[/QUOTE]',"+ i +")\"><img src="+iconquote+" width="+iconwidth+" height="+iconheight+" ></a> " +

			"<a href=\"javascript:tagIt('<blockquote>','</blockquote>',"+ i +")\"><img src=http://www.kalbimden.net/resim/bg_blockquote.gif width="+iconwidth+" height="+iconheight+" ></a> " +			
			"<a href=\"javascript:tagIt('<center>','</center>',"+ i +")\"><img src="+iconcenter+" width="+iconwidth+" height="+iconheight+"></a> " +
			"<a href=\"javascript:linkImg("+i+")\"><img src="+iconimg+" width="+iconwidth+" height="+iconheight+"></a>" +
			"<a href=\"javascript:linkIt("+i+")\"><img src="+iconurl+" width="+iconwidth+" height="+iconheight+"></a>"; +
			
			
		unsafeWindow.textArray[i].parentNode.insertBefore(accessBar, unsafeWindow.textArray[i]);
	}

}

for (i=0; i<textareas.snapshotLength; i++) {

	// if this is not the extra special hidden textarea from the "invite to group" widget

	if (!textareas.snapshotItem(i).getAttribute('style') || textareas.snapshotItem(i).getAttribute('style').indexOf("display: none") == -1){

		unsafeWindow.textArray[i] = textareas.snapshotItem(i);

		var accessBar = document.createElement("div");

		accessBar.setAttribute('style','');

		//accessBar.innerHTML = "<a href=\"javascript:linkImg("+i+")\"><img src=http://mls-metal.de/bilder/toolbar_06.jpg width=30 height=30></a>"; +

		unsafeWindow.textArray[i].parentNode.insertBefore(accessBar, unsafeWindow.textArray[i]);
	}

}
