// ==UserScript==
// @name           BBCode in Text
// @namespace      http://mailerdaemon.home.comcast.net/
// @include        http://forums.secondlife.com/*
// ==/UserScript==

//configures how urls are displayed.
const ERRORS = false;
const url_start = 40;
const url_end = 25;
const url_len = url_start + url_end;

if(!GM_addStyle) GM_addStyle = function(css){
	style = document.createElement("style");
	style.type = "text/css";
    style.innerHTML = css;
	document.getElementsByTagName('head')[0].appendChild(style);
};
if(!GM_log) GM_log = function(text){/*too lazy to implment! Get Firefox :P */};

GM_addStyle(".GMCode {border: 1px inset ; margin: 0px; padding: 6px; overflow: auto; width: auto; height: auto; text-align: left; font-family:monospace; } .GMCode br {display:none;}")

const chars = '&Ã Ã¡Ã¢Ã£Ã¤Ã¥Ã¦Ã§Ã¨Ã©ÃªÃ«Ã¬Ã­Ã®Ã¯Ã°Ã±Ã²Ã³Ã´ÃµÃ¶Ã¸Ã¹ÃºÃ»Ã¼Ã½Ã¾Ã¿Ã€ÃÃ‚ÃƒÃ„Ã…Ã†Ã‡ÃˆÃ‰ÃŠÃ‹ÃŒÃÃŽÃÃÃ‘Ã’Ã“Ã”Ã•Ã–Ã˜Ã™ÃšÃ›ÃœÃÃžâ‚¬\"ÃŸ<>Â¢Â£Â¤Â¥Â¦Â§Â¨Â©ÂªÂ«Â¬Â­Â®Â¯Â°Â±Â²Â³Â´ÂµÂ¶Â·Â¸Â¹ÂºÂ»Â¼Â½Â¾â‚¬â€¢' + String.fromCharCode(160,161);
const entities = new Array ('amp','agrave','aacute','acirc','atilde','auml','aring',
						'aelig','ccedil','egrave','eacute','ecirc','euml','igrave',
						'iacute','icirc','iuml','eth','ntilde','ograve','oacute',
						'ocirc','otilde','ouml','oslash','ugrave','uacute','ucirc',
						'uuml','yacute','thorn','yuml','Agrave','Aacute','Acirc',
						'Atilde','Auml','Aring','AElig','Ccedil','Egrave','Eacute',
						'Ecirc','Euml','Igrave','Iacute','Icirc','Iuml','ETH','Ntilde',
						'Ograve','Oacute','Ocirc','Otilde','Ouml','Oslash','Ugrave',
						'Uacute','Ucirc','Uuml','Yacute','THORN','euro','quot','szlig',
						'lt','gt','cent','pound','curren','yen','brvbar','sect','uml',
						'copy','ordf','laquo','not','shy','reg','macr','deg','plusmn',
						'sup2','sup3','acute','micro','para','middot','cedil','sup1',
						'ordm','raquo','frac14','frac12','frac34',
						'euro','bull','nbsp','iexcl');

if(!String.prototype.trim) String.prototype.trim = function() { return this.replace(/^\s*/,'').replace(/\s*$/, ''); }
if(!String.prototype.htmlUnescape) String.prototype.htmlUnescape = function(){
	var r = /&(#[0-9]*|[A-Za-z0-9]*);/;
	var i = this;
	var o = ""
	var p;
	do
	{
		if(!(p = r.exec(i)))
			return o + i;
		if(p.index > 0)
			o += i.slice(0, p.index);
		i = i.slice(p.index + p[0].length);
		if(p[1].charAt(0) == '#')
			o += String.fromCharCode(p[1].slice(1))
		else
		{
			var w = entities.indexOf(p[1]);
			o += (w != -1)?chars[w]:("&"+p[1]+";");
		}
	}while(1);
}
if(!String.prototype.htmlEscape) String.prototype.htmlEscape = function(){
	var i = this;
	for(var k = 0;k < chars.length; k++)
		i = i.replace(new RegExp(chars[k], "g"), "&"+entities[k]+";");
	return i;
}
if(!Array.prototype.insert) Array.prototype.insert = function( i, v ) {
	var b = this.splice( i );
	this.push(v);
	return this.concat( b );
};

var count = 0;
var base = document.URL;
count = base.indexOf("?");
if(count >= 0) base = base.substring(0, count);
base = base.substring(0, base.lastIndexOf("/")+1);
var pattern = /(?:\[(?:[\/\\]?)(url|email|thread|post|indent|code|php|font|size|color|b|u|i|right|left|center|highlight|list|img|[*])(?:|=[^\]]*)\]|((?:https?|mms|rstp|secondlife|ftp|mailto):[^\s\[]*)|((?:[a-z0-9.\-]{3,}\.(?:com|net|org|co\.uk)|(?:(?:0x[0-9a-f]{1,8}|[0-9]{1,3})\.){3}(?:0x[0-9a-f]{1,8}|[0-9]{1,3}))(?:(?:\:[0-9]+|)\/[^\s\[]*|(?=[^0-9a-z\-.]|$))))/im;
var split_pattern = /\[([\/\\]?)([^=\]]*?)(?:\s*=\s*"?([^\]"]*)"?\s*|)\]/im;
count = 0;
var calls = 100000;//stops a race condition that doesn't happen anymore.

start();

function start()
{
	var i, j, divs;
	var xpath = "//td[@class='thead']/../../tr[2]/td[position()=2 and @class='alt1']"+"|"+//thread
						"//tr[contains(td, 'Preview')]/td[@class='tcat']/../../tr[2]"+"|"+//edit - preview
						"//td[@class='thead']/../../tr/td[position()=2 and @class='alt2']/..";//topic review
	var res = document.evaluate(xpath, document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
	for (i = 0; divs = res.snapshotItem(i); ++i) {
		var t = divs.childNodes.length;
//		GM_log(divs.nodeName + "\nChild Count = " + t+ "\n"+divs.innerHTML);
		for (t=0; t<divs.childNodes.length; t++){
			parse(divs.childNodes[t]);
		}
	}
	if(i > 0 || count > 0)
	{
//		GM_log(document.URL.concat("\nHad "+count+" broken tag"+((count != 1)?"s":"") + " in "+i +" messages. (debug = " + calls + " )"));
//		GM_log(calls);
	}
}

function parse(element, only, nourl)
{
	var table = new Array(0);
	var urls = new Array(0);
	var badurls = new Array(0);
	var t = element.firstChild;
	for (;t != null; t = t.nextSibling){
		if(--calls < 0)
			return;
//		GM_log("nodeName = "+t.nodeName+"\nnodeType = "+t.nodeType );
		if(t.nodeType == 3)
		{
			var nodes = pattern;
			var p = pattern.exec(t.nodeValue);
			if(p != null)
			{
//				GM_log(p.length+"\n"+p[0]+"\n"+p[1]+"\n"+p[2]+"\n"+p[3]);
//				if(p[1] != null || p[2] != null || p[3] != null)
				{
					var m=document.createTextNode(p[0]);
					var n=document.createTextNode(t.nodeValue.substring(p.index + p[0].length));
					t.nodeValue = t.nodeValue.substring(0,p.index);
					insertAfter(m, t);
					insertAfter(n, m);
					++count;
				}
				if(p[1] != null)
					table.push(m);
				else if(p[2] != null && !nourl)
					urls.push(m);
				else if(p[3] != null && !nourl)
					badurls.push(m);
				t = t.nextSibling;
			}
		}
		else if(t.nodeType == 1)
		{
			if(t.nodeName != "TEXTAREA" && t.nodeName != "INPUT" && t.nodeName != "PRE")
				parse(t, only, nourl);
		}
//		else
//			GM_log("nodeName = "+t.nodeName+"\nnodeType = "+t.nodeType );
	}
//	if(element.innerHTML)
//		GM_log("Count = "+table.length+"\n"+table+"\n" + element.innerHTML);
	if(table.length > 0)
		tag(table, only);
	var i;
	for(i = 0; i < urls.length; i++)
	{
		var t = urls[i];
		var v = t;
		while(v = v.parentNode)
		{
			if(v.nodeName == "A" || v.nodeName == "PRE")//keep it honest
				break;
		}
		if(v == null && t.parentNode)
		{
//			GM_log(t.nodeValue);
			var m=document.createElement("A");
			m.href = (m.innerHTML = t.nodeValue).htmlUnescape();
			if(m.innerHTML.length > url_len)
				m.innerHTML = m.innerHTML.slice(0,url_start)+"..."+m.innerHTML.slice(m.innerHTML.length-url_end);
			t.parentNode.replaceChild(m, t);
		}
	}
	for(i = 0; i < badurls.length; i++)
	{
		var t = badurls[i];
		var v = t;
		while(v = v.parentNode)
		{
			if(v.nodeName == "A" || v.nodeName == "PRE")//keep it honest
				break;
		}
		if(v == null && t.parentNode)
		{
//			GM_log(t.nodeValue);
			var m=document.createElement("A");
			m.href = "http://"+(m.innerHTML = t.nodeValue).htmlUnescape();
			if(m.innerHTML.length > url_len)
				m.innerHTML = m.innerHTML.slice(0,url_start)+"..."+m.innerHTML.slice(m.innerHTML.length-url_end);
			t.parentNode.replaceChild(m, t);
		}
	}
	badurls = urls = table = null;
}

/*
function juggle(table)
{
	var t;
	var map = new Object();
	for (t=0; t<table.length; t++){
		var type = split_pattern.exec(table[t].nodeValue);
		if(type[1] == "")
		{
			if(map[type[2].toLowerCase()])
				++map[type[2].toLowerCase()];
			else
				map[type[2].toLowerCase()] = 1;
		}
		else
		{
			if(map[type[2].toLowerCase()])
				--map[type[2].toLowerCase()];
			else
				map[type[2].toLowerCase()] = -1;
		}
	}
	map = null;
	return table;
}
*/
function log(table, sep, msg_a, msg_b)
{
	var kw = "";
	Array.forEach(table, function(item) {if(kw !="") kw +=sep;kw += item.nodeValue;});
	GM_log(msg_a+kw+msg_b);
}

function oc(a)
{
	if(a && a.length)
	{
		var o = {};
		for(var i=0;i<a.length;i++)
		{
			o[a[i]]='';
		}
		return o;
	}
	return null;
}

function tag(table, only)
{
//	log(table, "\n", "tags = [\n","\n]");
	var t;
	var z = oc(only);
	for (t=0; t<table.length; t++){
		if(--calls < 0)
			return;
		var type = split_pattern.exec(table[t].nodeValue);
		if(type)//make sure it is infact a valid tag.
		{
			if(type[1] == "")
			{
				var c = 1;
				var m = t;
				var r = type[2].toLowerCase();
				var dtype;
				var k = table.length - 1;
				if(z && !(r in z));//silently ignore missing tags
				else if(r == "*")
				{
					while(t < k && c != 0)
					{
						if(--calls < 0)
							return;
						dtype = split_pattern.exec(table[++t].nodeValue);
						if(dtype)
						{
							var dt = dtype[2].toLowerCase();
							if(dt == "list")
							{
								if(dtype[1] == "")
									c++;
								else
									c--;
							}
							else if(dt == "*" && c == 1)
								c = 0;
						}
					}
					if(c > 0)
						t++;
				}
				else
				{
					while(t < k && c != 0)
					{
						if(--calls < 0)
							return;
						dtype = split_pattern.exec(table[++t].nodeValue);
						if(dtype)
						{
							if(dtype[2].toLowerCase() == r)
							{
								if(dtype[1] == "")
									c++;
								else
									c--;
							}
						}
					}
					if(c > 0 && (r == "url" || r =="img") && type[3] && type[3] != "")
					{//some idiot didn't close thier URL/IMG tag, *rolls eyes*
//						log(table, ", ", "before: " + table.length+"\n")
						table.splice(t = m+1, 0, insertAfter(document.createTextNode("[/"+r+"]"), table[m]));
//						log(table, ", ", "after: " + table.length+"\n")
						insertAfter(document.createTextNode(type[3]), table[m]);
						k+=1;//adjust the end...
						type[3]="";//makes it work harder
						c = 0;
					}
				}
				
	//			if(table.length > t)
	//				GM_log("( "+(t - m)+", " + c + " ) = " + type[0] +" && " + split_pattern.exec(table[t].nodeValue)[0]);
	//			else
	//				GM_log("( "+(t - m)+", " + c + " ) = " + type[0] +" && last");
				if(c == 0 || r == "*")
				{
					var nodes = new Array(0);
					var p = null;
					var q = null;
					if(r == "url" || r == "thread" || r == "post" || r =="email")
					{
						p = document.createElement("a");
						var d = "";
						if(type[3] != null)
							d = type[3].replace(/  /g,"").htmlUnescape();
						if(r == "thread")
							p.href = (base + "showthread.php?t=" + d);
						else if(r == "post")
							p.href = (base + "showthread.php?p=" + d);
						else if(d != "")
						{
							if(r == "email")
								p.href = (d.trim().toLowerCase().indexOf("mailto:") != 0)?"mailto:"+d:d;
							else if(r == "url")
							{
								var d1 = d.trim();
								var d3 = d1.indexOf("/");
								var d4 = d1.indexOf(":");
								var d5 = d1.indexOf("?");
								if(d4 == -1 || (d4 > d3 && d3 != -1))
								{
									if(d5 == -1 || d3 != -1)
										p.href = "http://"+d;
									else
										p.href = base + d;
								}
								else
									p.href = d;
							}
						}
					}
					else if(r == "color" ||  r == "size" || r == "font")
					{
						p = document.createElement("font");
						if(r == "color")
							p.color = type[3];
						else if(r == "size")
							p.size = type[3];
						else if(r == "font")
							p.face = type[3];
					}
					else if(r == "right" || r == "left" || r == "center")
					{
						p = document.createElement("div");
						if(r == "right")
							p.align = "right";
						else if(r == "left")
							p.align = "left";
						else if(r == "center")
							p.align = "center";
					}
					else if(r == "u" || r == "b" ||  r == "i")
					{
						p = document.createElement(r);
					}
					else if(r == "highlight")
					{
						p = document.createElement("span");
						p.className = "highlight";
					}
					else if(r == "indent")
					{
						p = document.createElement("blockquote");
						q = document.createElement("div");
						p.appendChild(q);
					}
					else if(r == "code" || r == "php")
					{
						p = document.createElement("div");
						p.style.margin="5px 20px 20px";
						q = document.createElement("div");
						q.className = "smallfont";
						q.style.marginBottom="2px";
						q.appendChild(document.createTextNode("Code:"));
						p.appendChild(q);
						q = document.createElement("pre");
						q.className = "alt2 GMCode";
						q.dir = "ltr";
						p.appendChild(q);
					}
					else if(r == "list")
					{//<ol type="1"><li>list item 1</li><li>list item 2</li></ol>
						if(type[3] != "" && type[3] != null)
						{
							p = document.createElement("ol");
							p.type=type[3];
						}
						else
						{
							p = document.createElement("ul");
						}
					}
					else if(r == "img")
					{
						p = document.createElement("img");
						q = document.createElement("span");
					}
					else if(r == "*")
					{
						p = document.createElement("li");
					}
					if(q == null)
						q = p;
					if(p != null)
					{
						var h = table[m];
						var w = h.parentNode;
						var n = h.nextSibling;
						var s = null;
						if(table.length > t)
							s = table[t];
						while(n != s && n != null)
						{
							y = n.nextSibling;
							child = w.removeChild(n);
							if(child.nodeName != "BR" || (r != "code" && r != "php"))
								q.appendChild(child);
							if(child.nodeName == "#text")
								child.nodeValue = child.nodeValue.replace(/([\S]{50,52})  /gm,"$1");
							n = y;
							if(--calls < 0)
								return;
						}
						if(s != null)
						{
							var rtype = split_pattern.exec(s.nodeValue);
							if(rtype[1] != "" && rtype[2].toLowerCase() == r /*/&& w/**/)//catch for lists ~_~
								w.removeChild(s);
						}
						if(r == "code" || r == "php")//keeps it from trying to parse code and php stuff.
						{
						//FIXME: make the replacement smarter, i'm too lazy.
							q.innerHTML = q.innerHTML.replace(/\t/g,"    ");
							//if(r != "code")//oddly enabling this test borks things, not exactly sure what causesit.
								m = t;//no internal parsing
							if(r == "code")//this is the wrong solutions but it works
								parse(q, ["i", "b", "u", "color", "highlight", "url", "thread", "post", "email"], true);
						}
						else if(r == "img")
						{
							if("" == (p.src = q.textContent.trim().htmlUnescape()))
								p = q;
							m = t;//no internal parsing
						}
						else if((r == "url" || r == "email" || r == "post" || r == "thread") && (type[3]=="" || type[3] == null))
						{
							s = q.textContent.trim().replace(/  /g,"").htmlUnescape();
							if(r == "email")
								q.href = (s.toLowerCase().indexOf("mailto:") != 0)?"mailto:"+s:s;
							else if(r == "url")
								q.href = ((s+"/:").indexOf(":") > s.indexOf("/"))?"http://"+s:s;
							else
								p.href += s;
							if(s.length > url_len)
								q.innerHTML = (s.slice(0,url_start)+"..."+s.slice(s.length-url_end)).htmlEscape();
							else
								q.innerHTML = q.textContent;//strip the html from it, it should be unformated.
							m = t;//no internal parsing
						}
						/*/if(w)/**/
							w.replaceChild(p,h);
					}
				}
				else //if(c > 0 && r != "*")
				{
					++t;
					if(ERRORS)
					{
						GM_log("tag error = " + type[0]);
//						log(table, "\n", "tags = [\n","\n]");
					}
				}
				if(m+1 < t)
					tag(table.slice(m+1, t));
				if((r == "*" && c == 0))// || (c == 1 && r != "*"))
					--t;
			}
			else if(ERRORS)
			{
				GM_log("tag error = " + type[0]);
//				log(table, "\n", "tags = [\n","\n]");
			}
		}
	}
}

function insertAfter(insert, after)
{
	return after.parentNode.insertBefore(insert, after.nextSibling);
}