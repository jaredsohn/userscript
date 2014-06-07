// ==UserScript==
// @name			Clean and Simple Rapidlibrary 
// @namespace		http://userscripts.org/scripts/show/136417
// @updateURL      	http://userscripts.org/scripts/source/136417.user.js
// @require		http://code.jquery.com/jquery.min.js
// @author		DarkSkul
// @description	remove All the Ads and unnecessary items from rapidlibrary.biz
// @include		*rapidlibrary.biz/*
// @grant          	GM_addStyle
// @version		2.0
// @source         

// ==/UserScript==

function RemoveBoldTag(strg) {
	strg=strg.replace(/<span style="font-weight:bold;">/g,"");
	strg=strg.replace(/<\/span>/g,"");
	strg=strg.replace(/<\/*b>/g,"");
	return strg;
}
function replaceURLWithHTMLLinks(text) {
	var exp = /(\b(https?|ftp|file):\/\/[^\n\r]+)/ig;
	return text.replace(exp,"<a style='text-decoration:none;' href='$1'><font color=red>$1</font></a><br>"); 
}

str = location.href;
//Home page
if( str.search(/rapidlibrary.biz\/?$/ig) != -1 ) { 
	//Hide unwanted items
	GM_addStyle("#footer, #content, .toggle, A[onclick='addEngine(); return false'], #top-nav {\ndisplay:none !important;\n}");
}
//results page	
else if( (str.search(/rapidlibrary.biz\/files/ig) == -1) ) {
	//source
	$(".result-link > SPAN").each(function(){
		source=$(this).text();
		source=source.replace(/ /g,"");
		source=RemoveBoldTag(source);
		source="http://" + source;
		$(this).replaceWith("<span><a style='text-decoration:none;' href='" + source + "'><font color=green>" + source + "</font></a></span>");
	});
	
	//Links
	function getlinks(loadUrl,stuff) {
		$.ajax ({
			url: loadUrl,
			success: function (code) {
				dl_link=$(code).find(".line > .wrap-input > INPUT").attr('value');				
				if( (dl_link.search(/rapidlibrary.biz\/files/ig) != -1) )
					$(stuff).parent().next().next().after("<div class='result-link'><span><a style='text-decoration:none;' href='" + dl_link + "'><font color=red>Unable to get link because of the captcha, go to the download page and enter the captcha !</font></a></span></div>");
				else
					$(stuff).parent().next().next().after("<div class='result-link'><span><a style='text-decoration:none;' href='" + dl_link + "'><font color=red>" + dl_link + "</font></a></span></div>");
			}
		});
	}
	$(".results-list > LI > H3 > A").each(function(){
		getlinks($(this).attr('href'), $(this));
	});
	
	//Hide unwanted items
	GM_addStyle(".download, #footer, .block.banner, .result-desc, #right, .also, .sponsored {\ndisplay:none !important;\n}");
}
// download page
else {
	
	//Hide unwanted items
	GM_addStyle(".file-report, .h2h2, .file-urls > DIV, .file-copy-link, .file-recommend, .file-urls2, #footer, .file-comments, #right {\ndisplay:none !important;\n}");
	
	//download link
	dl_link=$(".line > .wrap-input > INPUT").attr('value');
	$(".h2h2 + TABLE").before("<span>Link: </span>").replaceWith("<a style='text-decoration:none;' href='" + dl_link + "'><font color=red>" + dl_link + "</font></a><br>");
	
	//link to source
	$("SMALL > A").each(function(){
		source=$(this).text();
		source="http://" + source;
		$(this).parents(".file-desc")
			.before("<span>Source: </span>")
			.replaceWith("<a  href='" + source + "' style='text-decoration:none;'><font color=green>" + source + "</font></a>");
	});	
}

