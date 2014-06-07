// ==UserScript==
// @name           Blogger Advanced Comment Editor
// @namespace      http://ad1987.blogspot.com
// @description    Adds some advanced editing options to help writing comments in Blogger
// @include        *blogger.com/comment.g*
// @include        *blogger.com/comment.do
// ==/UserScript==

//Editor for Blogger
function addStyle(css)
	{
	head = document.getElementsByTagName("head")[0];
	if(!head) return;
	styl = document.createElement("style");
	styl.type = 'text/css';
	styl.innerHTML=css;
	head.appendChild(styl);
	}
function for_sel(tag) {
	var txtarea = document.getElementsByTagName("textarea")[0];
	var strt = txtarea.selectionStart;
    var end = txtarea.selectionEnd;
    txtarea.value = [txtarea.value.substr(0, strt), "<", tag, ">", txtarea.value.substr(strt, end - strt), "</", tag, ">", txtarea.value.substr(end, txtarea.value.length)].join("");
	txtarea.focus();
	}
function ins_link()
	{
	var txtarea = document.getElementsByTagName("textarea")[0];
	var strt = txtarea.selectionStart;
    var end = txtarea.selectionEnd;
	url = prompt("Enter URL:", '');
	if(url)
	{
	txtarea.value = [txtarea.value.substr(0, strt), "<", "a", " href=", url, ">", txtarea.value.substr(strt, end - strt), "</", "a", ">", txtarea.value.substr(end, txtarea.value.length)].join("");
	}
	txtarea.focus();
	}
window.addEventListener('load', function()
	{
	addStyle(".editor{border:1px solid whitesmoke;border-right:2px solid silver;border-bottom:2px solid silver;margin:3px;padding:3px 3px 0 3px;text-align:center;cursor:pointer}.editor:hover{border:1px solid whitesmoke;border-top:2px solid silver;border-left:2px solid silver;}");
	el = document.getElementById("html-usage-msg");
	if(!el) {return;}
	frag = document.createDocumentFragment();
	an_bold = document.createElement("a");
	an_bold.className = 'editor';
	an_bold.href = 'javascript:;';
	an_bold.innerHTML='<img src="data:image/gif,GIF89a%12%00%12%00%80%01%00%00%00%00%00%00%00!%F9%04%01%00%00%01%00%2C%00%00%00%00%12%00%12%00%00%02%25%8C%8F%A9%CB%0A%D0%D2%7BQ%D2z%26%CET%C7%09y%8C(%3AWPZ%90%91%22%E4i%AE%AD%1B%CE%DB%8D%E7%5B%01%00%3B"/>';
	an_bold.addEventListener('click', function(){for_sel('b');}, true);
	frag.appendChild(an_bold);
	an_italic = document.createElement("a");
	an_italic.className = 'editor';
	an_italic.href = 'javascript:;';
	an_italic.innerHTML='<img src="data:image/gif,GIF89a%12%00%12%00%80%01%00%00%00%00%00%00%00!%F9%04%01%00%00%01%00%2C%00%00%00%00%12%00%12%00%00%02%1A%8C%8F%A9%CB%ED%0F%11%00%F1%CC%8As%9A4%D2%5B%81a%E7%7D%23%A9%A5%EAz%14%00%3B"/>';
	an_italic.addEventListener('click', function(){for_sel('i')}, true);
	frag.appendChild(an_italic);
	an_quote = document.createElement("a");
	an_quote.className = 'editor';
	an_quote.href = 'javascript:;';
	an_quote.innerHTML='<img src="data:image/gif,GIF89a%12%00%12%00%80%01%00%7F%7F%7F%00%00%00!%F9%04%01%00%00%01%00%2C%00%00%00%00%12%00%12%00%00%02)%8C%8F%A9%CB%ED%09%00%94%2BRckDYu%BCiW%F0M%96t%86G%8A%A6f%C6%BE%5B%CC%B9%F4j%BB%CF%CE%F7%3ES%00%00%3B"/>';
	an_quote.addEventListener('click', function(){for_sel('blockquote')}, true);
	frag.appendChild(an_quote);
	an_link = document.createElement("a");
	an_link.href='javascript:;';
	an_link.className = 'editor';
	an_link.innerHTML = '<img src="data:image/gif,GIF89a%12%00%12%00%B3%0A%00%00%00%00%81%96p%A5%CE%86%A7%D1%87%C0%C0%C0%F8%FC%F8YYY%AD%D4%8F%D3%E8%C4%FC%FD%FA%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%0A%00%2C%00%00%00%00%12%00%12%00%00%04%5BP%C9I%AB%BDx%82%AD%F9%05D%11%02%A2%08X%E0%A6%AE%C4I%91\'H%B4%0A%5C%A5%2B%EB%BE%E1X%D2%06%D4F%10%08%A8%04%C4%81%C5%40%2C%16%91He%85%D9t%1E%A2K%A76p%95R%0CO%EB%01!%F0N%06O(%22Q6O%C0%D6%C4%DA%FD%E5%8E%03%03z%25%CF%D7g.%11%00%3B"/>';
	an_link.addEventListener('click', ins_link, true);
	frag.appendChild(an_link);
	txt = document.getElementsByTagName("textarea")[0];
	txt.parentNode.insertBefore(frag, txt);
	}, true);