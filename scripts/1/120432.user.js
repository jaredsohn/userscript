// ==UserScript==
// @name           ydict
// @namespace      ydict
// @description    yahoo dictionary
// @include        *
// @version        0.0.5
// ==/UserScript==


var mydiv = document.createElement("div");
var divStyle = "opacity: 0.7;filter:alpha(opacity=70);position:absolute;display:none;z-index:1000;border-left:solid 2px #AA0000;border-top:solid 2px #AA0000;border-right:solid 2px #AA0000;border-bottom:solid 2px #AA0000;background-color:#000000;padding: 2pt 3pt 2pt 3pt;color: #ffffff;font-size: 12px;text-align:left;"
var ydict=""
var query=""

mydiv.setAttribute("style", divStyle);
mydiv.id = "dict-pupup";
document.body.appendChild(mydiv);

var curpos = {'x' : 0, 'y' : 0};
var sound = null;
var flag_switch = false;
var dcount=0;

function clog(string)
{
    console.log(string);
}

/*
function getElementsByClassName(classname, node) {

    if(!node) 
        node = document.getElementsByTagName("body")[0];
    
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))
            a.push(els[i]);

    return a;
}*/


function filtercb(e){
	if(e.class=="pronun" || e.class=="explanation")
		mydiv.childNodes.push(e);
}

function ydictcb(doc){

	p = doc.getElementsByClassName("summary");
	
	if(p.length>0)
	{
		summary=p[0];
		mydiv.innerHTML = "<h2><a href=\""+ydict+"\">"+query+"</a></h2>";	
		
		for (var i = 0; i < summary.childNodes.length; ++i) {
			if(summary.childNodes[i].className=="pronun" || summary.childNodes[i].className=="explanation")
			{
				mydiv.appendChild(summary.childNodes[i]);
			}
		}
		links=mydiv.getElementsByTagName("a");
		for(var i=0;i<links.length;i++)
			if(links[i].href)
				links[i].style.color = "#FFF000";

		clog("mydiv:"+mydiv.innerHTML);
	
		//mydiv.innerHTML = summary.innerHTML;
		mydiv.style.left = (curpos.x + window.scrollX + 10).toString() + "px";
		mydiv.style.top = (curpos.y + window.scrollY + 10).toString() + "px";
		mydiv.style.display = "inline";
	}	
	return;
}

function parseHTML(source) {

	//cann't be used in Chrome
	dt = document.implementation.createDocumentType("html", "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd");
	doc = document.implementation.createDocument('','', dt);
	html = doc.createElement('html');
	html.innerHTML = source;
	doc.appendChild(html);
	return doc;
}

function getaudio(txt){
	
	sound = null;
	start=txt.indexOf("flashVars");
	if(start)
	{
		vs=txt.indexOf("{",start);
		ve=txt.indexOf("}",start);
		if(vs && ve && ve>vs)
			sound=eval('(' + txt.substr(vs,ve-vs+1) + ')');
	}
}

function mouseproc(e) {

    if (!flag_switch)
        return;
        
    if (e.target.id == mydiv.id)
        return;
        
    mydiv.style.display = "none";
    var seltext = window.getSelection();
    if (seltext == "")
        return;
    
    curpos.x = e.clientX;
    curpos.y = e.clientY;

    query=seltext;
	clog("query:"+seltext);
    ydict = "http://tw.dictionary.yahoo.com/dictionary?p="+seltext;
    encodeURI(ydict);
    
    GM_xmlhttpRequest( {
        method : "GET",
        url : ydict.toString(),
		headers:{'Referer' : 'http://tw.dictionary.yahoo.com/'},
        onload : function (result) {
			
			//console.log(result.responseText);
        	//getaudio(result.responseText);
            ydictcb(parseHTML(result.responseText));
        }
    });
}

function keyproc(e) {
    if (e.charCode == 100)
        dcount++;
    else
        dcount=0;

    if(dcount==2){
        flag_switch=flag_switch?false:true;
        dcount=0;
    }
}
// Add keypress event handler
document.addEventListener('keypress', keyproc, false);
document.addEventListener('mouseup', mouseproc, false);