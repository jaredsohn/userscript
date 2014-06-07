// ==UserScript==
// @name           Fictionmania Favorite Authors
// @namespace      http://example.com/fictionmania/authors/
// @description    Mark Fictionmania authors as favorite.
// @include        http://fictionmania.com/*
// ==/UserScript==

var name_of_key = 'favorite_authors';

// Adds author_name to the list of favorite authors
window.mark_author = function(event) {
    author_name = document.getElementById('author_name').innerHTML;
    // should check if author_name doesn't exist.
    if (!is_marked(author_name)) {
	existing_authors = GM_getValue(name_of_key, '');
	GM_setValue(name_of_key, existing_authors+","+author_name);
    }
    update_favauth_span();
    event.preventDefault();
};
;
window.unmark_author = function (event) {
    author_name = document.getElementById('author_name').innerHTML;
    if (is_marked(author_name)) {
	var existing_authors = GM_getValue(name_of_key, '');
	var authors_array = existing_authors.split(",");
	var new_value = "";
	for (author_index=0; author_index<authors_array.length; author_index++) {
	    author = authors_array[author_index];
	    if (author != author_name && author != "") {
		new_value += ","+author;
	    }
	}
	GM_setValue(name_of_key, new_value);
    }
    update_favauth_span();
    event.preventDefault();
};
//window.unmark_author = unmark_author



// If we are at an author view page, then add the option to mark this
// author as a favorite.
if (window.location.href.match("authordisplay.html")) {
    // If there is no 'favauth_span' element, then create it
    if (!document.getElementById('favauth_span')) {
	var author_name;
	var match_string = document.body.innerHTML.match(/Stories written by: <b>(.*)<\/b>/);
	var author_name = RegExp.$1;

	author_span = document.createElement('span');
	author_span.id = 'favauth_span';
	p_node = document.getElementsByTagName('p')[1];
	p_node.insertBefore(author_span, p_node.childNodes[p_node.childNodes.length]);
	author_span.style.margin = "0px";
	author_span.style.border = "0px";
	author_span.style.padding = "0px";
	author_span.innerHTML = "<b><span id=\"author_name\">"+ author_name+"</span></b> is not one of your favorite authors. <a href='#' id=\"mark_author\">Make <b>"+author_name+"</b> one of your favorites</a>.</span><br />";
	document.getElementById('mark_author').addEventListener('click', mark_author, false);
    }
    // we know such an element exists, so update the favauth_span element.
    update_favauth_span();
}

function update_favauth_span() {
    span = document.getElementById('favauth_span');
    if (span) {
	author_name = document.getElementById('author_name').innerHTML;
	if (is_marked(author_name)) {
	    span.innerHTML = "<b><span id=\"author_name\">"+author_name+"</span></b> is one of your favorite authors. <a href='#' id=\"unmark_author\"\">Take <b>"+author_name+"</b> off your list of favorite authors</a>.</span><br />";
	    document.getElementById('unmark_author').addEventListener('click', unmark_author, false);
	} else {
	    span.innerHTML = "<b><span id=\"author_name\">"+ author_name+"</span></b> is not one of your favorite authors. <a href='#' id=\"mark_author\">Make <b>"+author_name+"</b> one of your favorites</a>.</span><br />";
	    document.getElementById('mark_author').addEventListener('click', mark_author, false);
	}
    }
}


function is_marked(author_name) {
    var existing_authors = GM_getValue(name_of_key, '');
    var authors_array = existing_authors.split(',');
    for (author_index=0; author_index<authors_array.length; author_index++) {
	author = authors_array[author_index];
	if (author == author_name) {
	    return true;
	}
    }
    return false;
}

function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

if (window.location.href.match('/searchdisplay')) {
    var story_links = xpath('//a[contains(@href, "/stories/readtextstory.html")]');
    var author_links = xpath('//a[contains(@href, "/searchdisplay/authordisplay.html")]');
    //GM_log("Found "+story_links.snapshotLength+" stories");
    for (var i=0; i<story_links.snapshotLength; i++) {
	curr_story = story_links.snapshotItem(i);
	curr_author = author_links.snapshotItem(i).firstChild.innerHTML;
	//GM_log("I think \""+curr_author+"\" wrote \""+curr_story.innerHTML+"\"");
	if (is_marked(curr_author)) {
	    var star_img = document.createElement('img');
	    star_img.src = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0F%00%00%00%0F%08%02%00%00%00%B4%B4%02%1D%00%00%07%BDiCCPICC%20Profile%00%00x%9C%AD%97yTS%D7%16%87%7F7%810%04%02b%04%82%A8%C1%01Q%40%11%14%D4V%10%C2%20%08%11%99dph%C8%00%D1%90%84%9B%80%22(j%1D%10%7D%8E%1D%1C%8BJ%ABP%7CR%ADO%85b%5B%7DZ%8B%15q%1E*%FA%40%B1*%224%A0%822%E4%FD%91%04%88%A0%BC%B7%DA%F3%D7%BEg%EDs%F6%3D%DFw%F6Z%F7%02%E6Oyr%B9%84%02%20E%AA%24%23%82%FC%D8%B1q%F1l%A3%9B0%06%0BT%0C%81%11%8F%AF%90%FB%86%87%87%E2%BD%E3%F5-%10%00p%DD%95'%97K%DE%9F%D7%E7%60%90%B1q%F1%00%E1%02%80%99%A4%89%A7%03%60%26j%E2(%00%CC%C5J%B9%12%20%92%010%F9%C9%3C%01%40d%01p!%A3%228%00Q%00%80%91%A4%89O%01%60%24j%E2_%010%D2%F9IJ%80%B8%03P%AD%A4%02%B1%140%A8%07h%DE%02%A1%82%0F%D0%5D%00%08%04%0A~%0A%40%DF%02%10%9D))2%01%60%BE%05%80%13_N*%01%F3S%00%5Cc%E3%E2%D9%9AW%9E%CF%02%3C%D3%00S%AF%EE%B9%D4(%E0%A8%0C%60%3D%E9%9E%1B-%06l%BD%80b%A3%EE%B9%E6%08%10%00%08%EBJ%85%C8%C3%1D%00%40%98%F9%01%86%0F%D4%EAfG%C0h%1B%D0%B1U%ADn%3B%A0Vw%E4%03%D4*%E0g%09%3F%8DL%D7%F2%22%88%0A%A0%BFg%CD%99%B5%83J%00%04(TC%9A%91%B1)%DD%CC%9Ca9%C0j%20%D3%DA%C6%96eg%3Fd%E80%B6%C3%88%91%A3%1CG%3B%8Duvq%1D7~%82%BB%C7%C4I%9E%5ES%A6~%F4%F14o%9F%E9~%1C%FF%80%C0%A0%19%C1!%A1a%DCY%E1%B3%23%22%A3b%E6%C4%C6%C5'%CC%9D7%7F%C1'%BCD%81P%94%94%2C%5E%B8H%92%22%95%C9SI%852-%7D%F1%92%8C%A5%99Y%CB%96g%AFX%B9%EA%D3%D5k%D6%AE%5B%97%B3%3Ew%C3%C6%7Fl%DA%BCe%EB%B6%ED%9F%7D%FE%C5%97%3Bv%EE%DA%BDg%EFWy%FB%F6%1F%C8%FF%FA%9B%83%87%0A%0A%BF-%3A%FC%CF%23%C5%DF%1D%3D%F6%FD%F1%7F%9D8y%AA%F4%87%B2%D3%3F%FE%F4%F3%99%B3%FF%3Ew%FE%97%0B%BF%96_%FC%ED%D2%E5%CA%2BW%AF%5D%BF~%E3%E6%AD%DBw%EE%FE~%AF%EA%FE%83%FFT%D7%3C%7CT%5B%FB%F8%8F'O%9F%D5%D5%3D%AF%7F%D1%D0%D0%F8%E7%9F%AA%A6%A6%E6%97%2F_%BD~%DD%D2%D2%FA%E6%CD%DB%B7mm%ED%ED%1D%1D%9D%9DjP%0C%FA9%FF%18g%17%D7q%E3%DD%26%B8O%9C%E4%E95Y%03%60%BAo%17%80%99%A1a%1A%00%D11sb%E3%E2%B5%00%F8%FD%12X%BDf%AD%3E%81%FF%09AI%E9%0Fe%A7%7F%EC%89%A0B%83%E0C%04%5E%E8%13hm%D5%00%D0%9E%9Fj%60H321%A5%9B%993%2C%2C%07X%0Dd%0E%B2%B6%B1e%D9%0D%D60%18%AE%850VG%C1cb7%87i%DE%3EZ%12%3A%14%DCY%E1%3D%60%24%24t%E3%D0%E3%A1%07%A4%C7%9D%C8Y%9F%BB%A1%9F%3B%D1%93%87%1E%0E%CD%85%A8%D0%D2%E8%82Q%F3%F0%91%16%C5%F3%FA%17%0D%8D%AA%A6%E6%97%AF%5E%B7%B4%BEy%DB%D6%DE%D1%D1%A9%064%BD%0F%004O%60%BB%23%10%13%07%C48%03%9Bs%01'%00%D6%05%40%B89%105%05%14%B7%7CP%EC%9D%40%7C%EF%01*%01P%00%10%A0%82%0EKXc%14%BC%10%868%08%B1%12y8%83%C7h%25%E8%C4%24%82Gl!%CE%10%BF%13%AF(%CE%14%01%25%8FREi%A7%DAS%17P%F3%A9u%06%13%0D%B2%0D%0E%1AT%18%0E1%94%1B%9E%A3%0D%A6)i%FBi%95F%AEF%1B%8D%1A%8C%23%8CO%19%3F7a%9B%E4%9A%BC6%15%98%DE%A4%07%D1%CB%E8-f%EEfE%E6%8E%E6%07%18%0E%8C%FD%16%23-%0A-%EA-%C7%5B%9E%1A%C0%19Pi5%CF%AAa%E0%0A%E6%20f%11%B3e%10g%D0%7D%EB%0C%1B%1B%9B%13%B6%B1%B6%ED%AC%FDv3%EC%F6%DA%A9%06%EF%B1%0F%B6o%1DR04a%98%C5%B0%F3%ECe%0E%5E%0EM%C3%BF%1B!%1BQ9%D2md%F3%A8%93%8E%CBG%07%3AY%3AU%8D)%1C%9B%E1%1C%E2b%EF%A2r%BD0n%DF%F8%0C%B7%E8%09%1E%EEV%EE%CD%1E7'%96L%DA%E7%B9%CE%2Bu%F2%DC)%C1S'%7F%E4%F4%B1%DD4%867%D5%BB%CD%E7%E5%F4%06%DF%3A%BF%A7%FE%CF%02%EA%03UA-3%D4!%263%99%A1%0Ean%DC%E9%B3%22%C2E%B33%23%B6E%16E%9D%8F%AE%89Q%C7%0E%8D%F3%89%E7%25%AC%99%5B4%EF%DA%FC%B6OF%F1%22%12%B3%F9%C5%82j%91URPr%96%F8%F8%C2%17%12%A7%14%81%F4%80%AC%26u8)T%14*%1B%D3%3D%17g%2F)_%3A(%93%9FulY%FCrjv%F4%8A%C2%95%EAOcV%17%AF5Y'%CC9%9B%EB%B0a%E5%C6G%9B%826%1F%DEj%B5-s%7B%ED%E7%E1_%94%7D%A9%D8%E1%BCs%F7n%B3%3D%D9%7B_%E6-%3C%10%9F%7F%F3%9B%D9%07%2B%0B%B8%85%97%8Bf%1F%BEq%24%BE%B8%FA%A8%F8X%D3%F1%E5'%E8'w%96%8C)-%3D%5D%F3%D3%E23%8C%B3%87%CE%F9%9E%BF_%CE%BAXz)%A1B%7D5%E4%9A%EAV%C0m%D5%3Dn%95%BAZ%F0%90%F58%E7i%7B%5DI%83%A7%AA%E4%95_%EB%95v%A1Z%AD%F5O%03%FDo%F3_I%EB%EC%F6%AF%B5%EF%AA%F3%FF%8E%7D%91Eao%FB%5D%EEE%3D%EC%EB%BB_%D8%D3%FE%DF%E3%9E%D3%8F%FB%BFn%BE%B7%F7%F5%A9%7D%99%DF%E1%BCs%F7%AEH%9D%F9%7D5%FD%BB%2F%0B%3B%5D%A3s%7F!%B3%9Cu)%A1B%5D%99%7FMuc%F7%AD%80%BBy%F7%B8%0F%8EV%0B%1E%5D%D1%D9oli%CEj1%D6%F3%DF%A7%FD%1E%EE%BB%CC%EBy%D7%B3%DE%CB%F9%BB%C6%F7%5B%8C%D4%B7%AD%E7%FA%84m%ACm%7B%2F%CF%E7%D9%CB%FAv%DC%97%E1%F7%F9%D5tvo%BF%1F%EA%EC%BFd%97%F2%BE%BE%FEl%97%CE%AF%C6%EEWGz%FA%3D%B4%E9%1D%C3%AE%EF8%B6%E9%D9%E3%172%CBY%17K%7F%CB%D5%B8%BE%1A%A2%B1%7D%5Bu7%EF%1E%B7J%FD%E0h%B5%E0!%EB%D1%95%DA%C3%8Fs%9E%F8%3Em%AF%2B%A9Oo%F0llQ%954g%BD%F2k1n%BD%F2vW%E7%04%B5%1A%D0%7C%2F%02%00L92%89%8Cd%87r%FC%FF%CF%8F%DD%FEF%8A%24MW%C3%02%80%99X%19%1C%05%80%09%E0%9C%88%0C%8C%00%E0%07%E0%8E4%91%3B%0B%80%15%40%D8%09%15%01%91%DA%D8E%24%0E%0C%06%60%09%10%DErex%14%00%5B%80%E0.M%8E%9A%03%80%01%10%A2%85%BC%90pm%AC%94J%B8%A1%00%AC%01b%95%40%E8%1F%A0%5D%BBc%91lf%04%003%80(%10J%A3u%FB%1FW%A4G%EAr~%11%F0%FCg%02%B0%07%88%5BK%939%5Cm~%13B%C1%81%3F%D8%E0C%06%09d%20!F9%F8%20%C1%83%14lT%83%0D%3EH%88%A1%80%12%3C%A4a%09%D8%90%40%8CT%A4A%0C%01%84Ph%D7%A7A%02!%D2%40%22%10%3C%90H%82%10%AE%DA%0A%BD%EB%C4%A0%16%24%C4%1F%C8%10C%00%D9%02%F1*2%E5%98(%7D%87%2CcjL%B2%5B%91%DB3%B7v%B0%B5%D93%BB*%0A!%ED%DAIS%3DQ%F7%7C%B9%FEd%7D%D7%0AN%D7%EE%EC%AE%ECZ%90Hz%E7%3D%5C!%02%0F%24%D2!%84%02%8B%F0%07H%A4%2C%10%AF%EA%5E%07%CD%BF%07%00%D0%2C%81%3D%3E%00P%B6%D5%AC%D7%3DQ%0A%97(%01%80%23%93g%90%E2%A4d%25%DBW.%97%08%D9%1CY%8A%3CM)%24%5D%D8%C1R%FE8%17%B6%BB%9B%DB%24%00%F8%2F%F2%92%F0%1EKP%C03%00%00%01%C9IDAT(%91c%F8%8F%01%EA%1A%9FIJ%1E%8BO%7C%88)%C5%80)%A4%ABwiR%DF4I%C9c%98RL%0C%A8%60%F6%FC%D7%FA%BA%2Fr%B2fZ%9A%1D%ACoz%8E%26%8B%AE%FA%E8%E1%EFf%C6w%18%99%9F%7B%7B%5C%3F%7C%E8%03%9A%2C%0B%C4%BC%CF%9F%FFA%F8%E7%CE~%AC)%DA%C3%C0%C0%A0%A3y%F8%C6%B5%8C%FA%A6%E7%FC%02L%0C%0C%0C%BC%BCL%A9%89%A2%2CN.%D7%19%18%18%A4%25%9E%40T%BB%3B%7FUV%BD%CB%C0%C0%60j%FA.%D8%EF%C4%853%CF%F9%F8x%3F%7D%FA%7C%FA%8C%E4%F2%A5o%18%24%25%8F%E5%A4%F7%FD%FB%A1%0FG%FF%7F%8B%FD%FB%CA%FF%EF%2B%FF%FF%DFb%10%91wO8C%02%82%25%25%8F1%CC%9A%F7JR%F2XH%40%F0%C9%03%8A%10E%C8%E8%DD%13%CE%7D%DBXB%02%82%C5D%E7%F6N%7C%C1%F0%FF%FF%FFS%E7%3F9%3A_%13%13%9D%8B%A6%E1%F3%0B%F6%E9%13T%F4t%A3u%F5.%ED%3B%FC%01%25%BC%1D%9D%AF%E5%A4%F7%C1%9D%01Q%1D%12%10%AC%ABw%09%AE%86%059%80%0C%0D.000%3C%7F%F6%8D%81%81%81%93%93%85%81%81%C9%D9%E1%E2%D1%93_%D0%C3%7B%FF%91%8Fo%5E%FF%B1%B3%F9%F2%EC%C1%FBM%5B%E5%F3K%FDV%AE%91%FE%FE%FD%8F%91%C1%DF%BF%7F%AE%CF%9E%FF%1A%11%DE%0C%0C%0C%07%F6%7DS%94%BF%CD%C5%B1%B9o%B2%F6%E2%E5%B9%E2%92%A6%87%8E%9E%BEso%B2%B7%C7%15%3B%EBmG%0F%BB%A4%262000%40%DD%1D%9F%F8PO7%1A%EE%F7%FF%FF%FFC%C2JO7ZO7%DA%D1%F9%1AJ%AAZ%BB%F1%AD%AE%DE%25G%E7kk7%BE%85%FBi%DF%E1%0F%8E%CE%D7%24%25%8FA%F4%FF%FF%FF%1F%00%83%01_%FC%A0V%7C%14%00%00%00%00IEND%AEB%60%82";
		curr_story.parentNode.insertBefore(star_img, curr_story);
		//GM_log("\""+curr_story.innerHTML+"\" was written by \""+curr_author+"\" one of your favorite authors");
	}
    }
}