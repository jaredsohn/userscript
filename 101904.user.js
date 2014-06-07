// ==UserScript==
// @name Loading citat
// @namespace inchy
// @description Loading citat
// @include
// ==/UserScript==

document.addEventListener("DOMContentLoaded", function(){
                document.removeEventListener("DOMContentLoaded", arguments.callee, false);
                bwaKell();
}, false);

var quoteField;
var forumQuote = false;

function bwaKell()
{
	quoteField = document.getElementsByTagName("textarea")[0];
	
	doAddQuote = myQuote;
		
	if($("#message").size()>0) forumQuote = true;
	else $(".action_link.interactive.tooltip").each(function(){
		$(this).append(" Citera");
		$(this).attr("onclick", $(this).attr("href"));
		$(this).removeAttr("href");
	});
	
	var qb = "<div id=\"qb\"></div>";
	$("body").append(qb);
	
	$("#qb").hide();
	
	$("#qb").css({
		"position": "fixed",
		"z-index": 1337,
		"bottom": 0,
		"left": 0,
		"background": "#AF0",
		"font-size": "12px",
		"font-family": "Lucida Sans Unicode",
		"padding": "5px"
	});
}

function myQuote(user)
{
	var s = getSelText();
	
	if(s=="")
	{
		var c = event.target;
		if(forumQuote) c = c.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousSibling.lastChild.getElementsByClassName("forum_thread_text")[0].firstChild;
		else c = c.parentNode.parentNode.parentNode.getElementsByClassName("text")[0].firstChild;
		
		s = extractText(c);
	}
	else if(!isValid(user)) return;
	
	addQuote(makeQuote(user, s));
	quoteNote(user);
	
	delSel();
}

function addQuote(quote)
{
	quoteField.value += quote;
}

function makeQuote(user, s)
{
	if(quoteField.value) return "\n[quote="+user+"]"+s+"[/quote]\n";
	else return "[quote="+user+"]"+s+"[/quote]\n";
}

function quoteNote(user)
{	
	$("#qb").html("Du citerade <span style=\"font-weight: bold;\">" + user + "</span>");
	$("#qb").fadeIn("slow", function(){$("#qb").delay(1300); $("#qb").fadeOut(1000);});
}

function isValid(user)
{
	if(user!=startQuoteUser) alert("Felaktig markering!\nDu f\u00F6rs\u00F6kte citera "+user+", men har markerat "+startQuoteUser+"s text.");
	return user==startQuoteUser;
}

function getSelText()
{
	if(window.getSelection) return window.getSelection();
	else if(document.getSelection) return document.getSelection();
	else return "";
}

function delSel()
{
    if(window.getSelection)
    {
        var selection = window.getSelection();
        if(selection.rangeCount > 0)
        {
            window.getSelection().deleteFromDocument();
            window.getSelection().removeAllRanges();
        }
    }
    else if(document.selection)
    {
        var ranges = document.selection.createRangeCollection();
        for (var i = 0; i < ranges.length; i++) ranges[i].text = "";
    }
}

function extractText(c)
{
	var s = "";
	
	while(c)
	{
		if(c.nodeType==3) s += c.nodeValue;
		else if(c.nodeName=="BR") s += "\n";
		else if(c.nodeName=="P") s += extractText(c.firstChild) + "\n";
		else if(c.nodeName=="A") s += "[url="+c.getAttribute("href")+"]"+ extractText(c.firstChild) + "[/url]";
		else if(c.nodeName=="STRONG" || c.nodeName=="B") s += "[b]" + extractText(c.firstChild) + "[/b]";
		else if(c.nodeName=="EM" || c.nodeName=="I") s += "[i]" + extractText(c.firstChild) + "[/i]";
		else if(c.nodeName=="U") s += "[u]" + extractText(c.firstChild) + "[/u]";
		else if(c.nodeName=="SPAN")
		{
			var patt = /color:\u0020*#?\w+/;
			
			if(patt.test(c.getAttribute("style"))) s += "[color="+c.getAttribute("style").slice(6,-1)+"]" + extractText(c.firstChild) + "[/color]";
			else s += "[hidden]" + extractText(c.firstChild.nextSibling.firstChild) + "[/hidden]";
		}
		else if(c.nodeName=="IMG")
		{
			var patt = /\u005B\w+\u005D/;
			
			if(patt.test(c.getAttribute("alt"))) s += c.getAttribute("alt");
			else s += "[img]" + c.getAttribute("src") + "[/img]";
		}
		else if(c.nodeName=="OBJECT") s += c.firstChild.getAttribute("value").replace("/v/", "/watch?v=") + " ";
		else if(c.nodeName=="PRE")  s += "[pre]" + extractText(c.firstChild) + "[/pre]";
		
		c = c.nextSibling;
	}
	
	return s;
}