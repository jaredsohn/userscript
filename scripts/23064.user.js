// ==UserScript==
// @name     litres_capture
// @description Capture 'copy-protected HTML' from litres-related online libraries - fictiobook/aldebaran/litportal/fenzin.
// @include  http://www.fictionbook.ru/read_book/*
// @include  http://www.litportal.ru/genre*/author*/read/*
// @include  http://lib.aldebaran.ru/author/*/*/*.html
// @include  http://www.fenzin.org/online/*
// ==/UserScript==
function unprotect(text) 
{
	var pageHtml = null;
	if( document.location.hostname == "www.fictionbook.ru" )
	{// FictionBook: move havigation bar from text to parent 
		text.parentNode.insertBefore(text.firstChild, text);
		text.removeChild(text.firstChild);
		text.removeChild(text.lastChild);
		
	}
	if( document.location.hostname == "lib.aldebaran.ru" )
	{// Aldebaran: move havigation bar from text to parent 
		var innerDiv = text.firstChild;
		text.parentNode.insertBefore(innerDiv.firstChild, text);
		innerDiv.removeChild(innerDiv.firstChild);
		innerDiv.removeChild(innerDiv.lastChild);
		pageHtml = innerDiv.innerHTML;
	}
	
	if( !pageHtml ) pageHtml = text.innerHTML;
	
	if( document.location.hostname == "www.fictionbook.ru" )
	{// FictionBook uses "<br>+nbsp" to format text. replace them by <p>-s - it's more PDA-friendly
		pageHtml = pageHtml.replace(new RegExp('<br>(&nbsp;){3,}','gi'), '<p>');
	}
	
	pageHtml = pageHtml.replace(new RegExp('<span class=[\'"]?h[\'"]?>[^<]*</span>','gi'), '');
	pageHtml = pageHtml.replace(new RegExp('xmlns:xlink="http://www.w3.org/1999/xlink"','gi'), '');
	pageHtml = pageHtml.replace(new RegExp('xmlns:fb="http://www.gribuser.ru/xml/fictionbook/2.0"','gi'), '');
	pageHtml = pageHtml.replace(new RegExp('<a name="@number"></a>','gi'), '');
	pageHtml = pageHtml.replace(new RegExp('&nbsp;','gi'), ' ');
	pageHtml = pageHtml.replace(new RegExp('[ \t][ \t]+','gi'), ' ');
	pageHtml = pageHtml.replace(new RegExp('<(h[1-6]|div|p)','gi'), '\n<$1');
	pageHtml = pageHtml.replace(new RegExp('[ \t]*align="justify"','gi'), '');
	
	pageHtml = '<!-- ' + document.location.pathname + ' -->\n' + pageHtml;
	text.innerHTML = '<TEXTAREA style="width:100%; height:100%" rows=30>' + pageHtml + '</TEXTAREA>';
	text.firstChild.select();
}

unsafeWindow.wait_for_text = function() 
{
	var text = document.getElementById("PlaceForText"); // fictionbook.ru
	if( null == text ) text = document.getElementById("chid"); // fenzin.ru/aldebaran.ru
	if( null == text ) text = document.getElementById("page_text"); //litportal.ru
	if( null == text ) {
		alert('No copyable text found!');
		return;
	}
	
	if( text.innerHTML.length > 100 ) {
		var button = document.createElement("BUTTON");
		button.innerHTML = 'Unprotect';
		button.title     = '...and piss off greedy crooks from litres';
		button.addEventListener('click', function(){unprotect(text)}, true);
		text.parentNode.insertBefore(button, text);
	} else
		window.setTimeout("wait_for_text()", 1000 );
}
window.setTimeout("wait_for_text()", 1000 );
