// ==UserScript==
// @name           Search Terms Highlighter
// @namespace      http://userscripts.org/users/28612
// @description    Highlight search terms in search pages and linked pages, just click the yellow H in the lower right corner of the browser
// @author         Aquilax
// @version        0.2.0
// @include        *
// ==/UserScript==

var terms=getSearchTerms();

if (terms!=null)
{
    isDomNodeInsertedHandlerEnabled=false;
    var div1=$ce("div","H",{oncontextmenu:"return false;",style:"float:none;position:fixed;z-index:10000;right:2px;bottom:2px;width:auto;background-color:yellow;color:black;font-size:10px;font-family:Arial;border:Solid 1px Black;cursor:pointer"});
    div1.addEventListener("click",function(e)
    {
        document.body.removeChild(this);
        if (e.button==0)
        {
            setTimeout(highlightTerms,0,terms,document.body,0);
            document.addEventListener("DOMNodeInserted",domNodeInsertedHandler,false);
        }
    },false);
    document.body.appendChild(div1);
}

function getSearchTerms() 
{ 
	Array.prototype.cycle=function(reverse){var o=reverse?this.pop():this.shift();reverse?this.unshift(o):this.push(o);return o;};
	Array.prototype.distinct=function(){var a=new Array();for(var num1=0;num1<this.length;num1++) if (a.indexOf(this[num1])==-1) a.push(this[num1]);return a;};
	var colors=["yellow","cyan","lime","deeppink","orange"];
    for each(var name in ["q","s","search"])
    {
        if (typeof(name)=="function") continue;
        var regexp=new RegExp("(?:\\?|&)"+name+"=(.*?)(?:&|$)","i");
        var match=regexp.exec(location.href)||regexp.exec(document.referrer);
        if (match)
        {
            return decodeURIComponent(match[1])
                .split(/"([^"]*?)"|\+/)
                .filter(function(term,index,array){return term && term.indexOf(":")==-1;})
		.distinct()
                .map(function(term){
                    var flag=term.indexOf("-")==0;
                    if (flag) term=term.substring(1);
                    return {backcolor:flag?"Red":colors.cycle(),
                            forecolor:"black",
                            regexp:new RegExp("\\b"+term.replace(/\+/gm," ").replace(/(\[|\]|\(|\)|\{|\}|\\|\/|\.|\*|\+|\?|\^|\$)/gm,"\\$1").replace(/\s+/gm,"\\s*")+"(?=$|\\s)","gmi")};
                });
        }
    }
    return null;
}

function domNodeInsertedHandler(e)
{
    if (isDomNodeInsertedHandlerEnabled) setTimeout(highlightTerms,0,terms,e.relatedNode,0);
}

function highlightTerms(terms,node,index)
{
	isDomNodeInsertedHandlerEnabled=false;
	var term=terms[index++];
	replaceTextContent(term.regexp,
				function(match){return $ce("span",match[0],{style:"background-color:"+term.backcolor+";color="+term.forecolor});},
				node,["script","style","textarea"]);
    isDomNodeInsertedHandlerEnabled=true;
	if (index<terms.length) setTimeout(highlightTerms,0,terms,node,index);
}

function replaceTextContent(regexp,handler,node,ignoreParentNode)
{
    var snapshots=document.evaluate(".//text()[normalize-space(.)!='']",node,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    for(var num1=0;num1<snapshots.snapshotLength;num1++)
    {
        var node1=snapshots.snapshotItem(num1);
        if (ignoreParentNode && ignoreParentNode.indexOf(node1.parentNode.tagName.toLowerCase())!=-1) continue;
        var node2=node1.parentNode;
        var text1=node1.textContent;
        var flag1=false;
        var match1;
        regexp.lastIndex=0;
        while(match1=regexp.exec(text1))
        {
            var node3=handler(match1);
            if (node3!=null)
            {
                flag1=true;
                text1=RegExp.rightContext;
                if (RegExp.leftContext.length) node2.insertBefore($ctn(RegExp.leftContext),node1);
                node2.insertBefore(node3,node1);
                regexp.lastIndex=0;
            }
        }
        if (flag1)
        {
            if (text1.length) node2.insertBefore($ctn(text1),node1);
            node2.removeChild(node1);
        }
    }
}

function $ctn(text) { return document.createTextNode(text); }
function $ce(tagName,textContent,attributes)
{
    var element1=document.createElement(tagName);
    element1.textContent=textContent;
    for(var name1 in attributes) element1.setAttribute(name1,attributes[name1]);
    return element1;
}