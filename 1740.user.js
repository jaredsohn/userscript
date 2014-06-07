// ==UserScript==
// @name          LF Quick Voting
// @namespace     http://users.linkfilter.net/~deathburger/
// @description	  Retrofit the Otter voting system onto Linkfilter
// @include       http://linkfilter.net/*
// @include       http://www.linkfilter.net/*
// @exclude       http://beta.linkfilter.net/*
// ==/UserScript==

/*
   This replaces the number links one normally votes with in favor of stars,
   and a behind-the-scenes vote so there is no page reload to give someone
   a vote.

   It has limitations, such as being unable to update the displayed averages.

   This is probably a poor choice of script for someone who is just getting
   their feet wet with Greasemonkey scripting.
*/

(function() {
  window.addEventListener("load", function(e) {
try{

var strs = document.getElementsByTagName("a");
var str, i;
var found = false;
var skin = readCookie("lfskin");
var voteurl = "";

for (i=0; str = strs[i]; ++i)
{
  if(str.getAttribute("href") && str.getAttribute("href").indexOf("/?cmd=vote;") != -1)
  {
    found = true;
    var url = str.getAttribute("href").split(";");
    var j,v,l;
    for(j=0;v=url[j];++j)
    {
	if(v && v.indexOf("rating=") != -1)
	{
	    v = v.split("=")[1];
	    break;
	}
    }
    for(j=0;l=url[j];++j)
    {
	if(l && l.indexOf("lid=") != -1)
	{
	    l = l.split("=")[1];
	    break;
	}
    }
    if(str.firstChild)
        str.removeChild(str.firstChild);
    if(str.previousSibling && str.previousSibling.nodeName == "#text")
    {
	var clip = (skin == "digital" ? 2 : (skin == "digitalsnow" ? 2 : (skin == "stripped" ? 21 : 20)));
	var info = document.createTextNode(str.previousSibling.nodeValue.substring(0, str.previousSibling.length - clip));
	str.parentNode.replaceChild(info, str.previousSibling);

/* This will get the current rating in Robot Dreams, but since it's not universal I can't use it. */
/*
	var rating = info.nodeValue.split("\n");
	rating = rating[rating.length-1].split(/Rating: /)
	rating = rating[rating.length-1].split(/ \/ /)[0];
	alert("'"+rating+"'");
*/
    }
    if(str.nextSibling && str.nextSibling.nodeName == "#text" && v == 10)
    {
	str.parentNode.replaceChild(makestars(l), str.nextSibling);
	voteurl = str.getAttribute("href").split(/;param_string=/)[0];
	voteurl = voteurl.substring(0,voteurl.length - 2);
	voteurl = location.href.split(/.net/)[0] + ".net" + voteurl;
	var votelink = document.createElement("a");
	votelink.setAttribute("href",voteurl);
	votelink.setAttribute("id","qv"+l);
        str.parentNode.appendChild(votelink);
    }
  }
  if(i == strs.length)
    break;
}

if(found)
{
    var buf =	'var currentvote = "";\
function voteover()\
{\
    var lid = currentvote.split("l")[1].split("v")[0];\
    var vote = currentvote.split("l")[1].split("v")[1];\
    var back, i;\
    var left = true;\
    for(i=1; back=document.getElementById("l"+lid+"v"+i); ++i)\
    {\
	back.setAttribute("src", left ? "'+redleft+'" : "'+redright+'");\
	left = !left;\
	if(i == vote)\
	    break;\
    }\
}\
function voteout()\
{\
    var lid = currentvote.split("l")[1].split("v")[0];\
    var back, i;\
    var left = true;\
    for(i=1; back=document.getElementById("l"+lid+"v"+i); ++i)\
    {\
	back.setAttribute("src", left ? "'+greyleft+'" : "'+greyright+'");\
	left = !left;\
	if(i > 11)\
	    break;\
    }\
}\
function dovote()\
{\
    var lid = currentvote.split("l")[1].split("v")[0];\
    var vote = currentvote.split("l")[1].split("v")[1];\
    var back, i;\
    var left = true;\
    for(i=1; back=document.getElementById("l"+lid+"v"+i); ++i)\
    {\
	if(i <= vote)\
	{\
	    back.setAttribute("src", left ? "'+purpleleft+'" : "'+purpleright+'");\
	    left = !left;\
	}\
	back.removeAttribute("title");\
	if(i == 10)\
	    break;\
    }\
    back.parentNode.removeAttribute("onmouseover");\
    back.parentNode.removeAttribute("onmouseout");\
    back.parentNode.setAttribute("title","You voted a "+vote+" on this link.");\
    var url = document.getElementById("qv"+lid).getAttribute("href")+vote;\
    var httpreq = new XMLHttpRequest();\
    httpreq.open("GET",url,true);\
    httpreq.send(null);\
}\
';
    document.injectScript(buf);
}

}catch(err){alert(err)}
// End of script
  }, false);
})();

/* Set up the voting stars and their flicker killing container */
function makestars(id)
{
    var first = true;
    var span = document.createElement("span");
    span.setAttribute("onmouseover","voteover()");
    span.setAttribute("onmouseout","voteout()");
    for(i=1; i < 11; ++i)
    {
	var img = document.createElement("img");
	img.setAttribute("src",first ? greyleft : greyright);
	img.setAttribute("id","l"+id+"v"+i)
	img.setAttribute("title","Vote "+i+" on this link")
	img.setAttribute("onmouseover","currentvote = 'l"+id+"v"+i+"';")
	img.setAttribute("onclick","dovote();")
	img.setAttribute("border","0");
	span.appendChild(img);
	first = !first;
    }
    return span;
}
/* Script injector */
document.injectScript = function(data)
{
    var head = document.getElementsByTagName("head").item(0);
    var js = document.createTextNode(data);
    var script = document.createElement("script");
    script.setAttribute("language","Javascript");
    script.setAttribute("type","text/javascript");
    script.appendChild(js);
    head.appendChild(script);
}
function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++)
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

// Blue for the current average
var blueleft 	=	"data:image/gif,GIF89a%08%00%0F%00%B3%0F%00%82%95%FFv%8A%FF%FB"+
			"%FC%FF%A4%B2%FF%5Cu%FF%BD%C7%FF%E1%E5%FF%E7%EB%FF%CD%D4%FF%9E"+
			"%AD%FF%F0%F3%FFLg%FF9W%FF%3F%5C%FF3R%FF%FF%FF%FF!%F9%04%01%00"+
			"%00%0F%00%2C%00%00%00%00%08%00%0F%00%40%041%F0%C9%F9%D4%3C%81"+
			"%B9F%25%E2%92%B08%C4%D1I%80%028%2C%0Bz%1A%13%16%C5I%D5%9DB%18"+
			"I2%FC%19%CF%C8%D5!l(%2B%D2%04%E1H%08%1E%11%00%3B";
var blueright	=	"data:image/gif,GIF89a%08%00%0F%00%B3%0F%00Jf%FF%D1%D9%FF%B3%B"+
			"E%FF%99%A9%FF%E6%EA%FF%F9%FA%FF9W%FF%C7%CF%FF%DC%E2%FF%80%93%"+
			"FFq%86%FF%5Dv%FF5T%FF%3F%5C%FF3R%FF%FF%FF%FF!%F9%04%01%00%00%"+
			"0F%00%2C%00%00%00%00%08%00%0F%00%40%043P%BCI_s%0E%0C%EAR%9D%C"+
			"5%C0%18%01%05%10%9F%E50%AC%B3%20%0C%B6%A5%C8PL%CA%FD%19%D2%0E"+
			"%04%C0%C0%01q%C1tP%C5%1E%0E%B3H%1D%1A%9EI%04%00%3B";
// Red on mouseover prior to voting, but only beyond the average
var redleft	=	"data:image/gif,GIF89a%08%00%0F%00%B3%0F%00%FF%FC%FC%F8%B2%AB%"+
			"FE%F3%F2%FA%C7%C2%F5%86%7C%FD%E7%E5%FB%D4%D1%F8%AD%A6%F2gZ%F6"+
			"%91%88%F3ui%F6%9B%92%F0WI%F1%5CN%F0RC%FF%FF%FF!%F9%04%01%00%0"+
			"0%0F%00%2C%00%00%00%00%08%00%0F%00%40%042%F0%C9%F9%C4%2C%89%B"+
			"9F%A5%E1%12%808J%D1I%8B%908%2C%0Bz%1A%13%0E%C3I%D5%9DP%1EG%E0"+
			"%13%B2%87a%E4%EA(6%94%15ibp%1C%00%8F%08%00%3B";
var redright	=	"data:image/gif,GIF89a%08%00%0F%00%B3%0F%00%F5%91%88%F0WI%FD%E"+
			"8%E6%F3vj%FF%FA%F9%F2dV%F9%BD%B8%FC%DF%DC%F8%A9%A1%FC%D7%D3%F"+
			"4%82w%FB%C6%C1%F0TE%F1%5CN%F0RC%FF%FF%FF!%F9%04%01%00%00%0F%0"+
			"0%2C%00%00%00%00%08%00%0F%00%40%044%D0%BCI_s%AE%20%CA%40%9D%0"+
			"4%120%07U%08%9F%E50%AC3%1C%0C%B6%A5%07BL%CA%FD%05%D2%5E%24%40"+
			"%E0%E1%82q%00P%C4%DE%04%80%19%A4%16%0D%CF%24%02%00%3B";
// Purple for what you voted and for the average vote of others
var purpleleft	=	"data:image/gif,GIF89a%08%00%0F%00%B3%0F%00%E7%85%E6%ED%A4%EC%"+
			"DE%5C%DD%F5%CE%F5%DCQ%DB%F9%E3%F9%E4y%E3%FE%FB%FE%FC%F1%FC%F2"+
			"%BF%F2%DFa%DF%D8%3C%D7%D8%3E%D7%D9D%D8%D78%D6%FF%FF%FF!%F9%04"+
			"%01%00%00%0F%00%2C%00%00%00%00%08%00%0F%00%40%042%F0%C9%F9%D0"+
			"%2C%86%B9F%E5%E0%D2A8J%D1I%00%028%2C%0Bz%8B%C3%84IrRv%87%08E%"+
			"E0%FB%86%85g%E4%EA%086%94%15i2p%04%0E%8F%08%00%3B";
var purpleright	=	"data:image/gif,GIF89a%08%00%0F%00%B3%0F%00%EB%9C%EB%F8%DC%F8%"+
			"E6%83%E5%E3t%E2%FE%F9%FE%DCO%DB%D8%3E%D7%FA%E5%FA%F4%C8%F4%F0"+
			"%B4%F0%DFa%DE%F6%D3%F6%D7%3A%D6%D9D%D8%D78%D6%FF%FF%FF!%F9%04"+
			"%01%00%00%0F%00%2C%00%00%00%00%08%00%0F%00%40%0430%BDI_s%AE%0"+
			"0%EAD%9D%04%600%0BU%1C%9F%E50%AC%A3%04%06%B6%A5%01%40L%C3%FD%"+
			"19%D2%5E%2C%C0%05%E2p%C1tP%C5%1E%0E%A3H!%1A%9EI%04%00%3B";
// Grey for no average and beyond the average
var greyleft	=	"data:image/gif,GIF89a%08%00%0F%00%B3%0F%00%AE%AE%AE%FD%FD%FD%"+
			"DE%DE%DE%BE%BE%BE%F1%F1%F1%E7%E7%E7%F8%F8%F8%CF%CF%CF%A6%A6%A"+
			"6%E4%E4%E4%D1%D1%D1%D2%D2%D2%9C%9C%9C%9F%9F%9F%99%99%99%FF%FF"+
			"%FF!%F9%04%01%00%00%0F%00%2C%00%00%00%00%08%00%0F%00%40%041%F"+
			"0%C9%F9%CC%24%83%B9Fe%E1R%808%00%D1I%8318%2C%0Bz%1A%13%0A%C2I"+
			"%D5%9DQ%1E%C7%E2g%92%C4%C8%D5%01l(%2B%D2%A4%E08%04%1E%11%00%3B";
var greyright	=	"data:image/gif,GIF89a%08%00%0F%00%B3%0F%00%BD%BD%BD%EE%EE%EE%"+
			"A7%A7%A7%E8%E8%E8%F3%F3%F3%B3%B3%B3%FC%FC%FC%9C%9C%9C%E3%E3%E"+
			"3%D9%D9%D9%CC%CC%CC%C2%C2%C2%9A%9A%9A%9F%9F%9F%99%99%99%FF%FF"+
			"%FF!%F9%04%01%00%00%0F%00%2C%00%00%00%00%08%00%0F%00%40%0450%"+
			"BDI_s%AE)%EA%40%9D%86r%1C%03%25%10%9F%E50%AC%23%04%07%B6%A5%8"+
			"1bL%C5%FD%1D%D2.%0C%C0%01%22p%C18%16%A8bo%02%C0%14R%88%86g%12"+
			"%01%00%3B";
