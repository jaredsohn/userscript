// ==UserScript==
// @name           BaseNotes Ratings Percentages
// @namespace      #avg
// @include        http://*basenotes.net/ID*
// @version        0.1
// ==/UserScript==
var single=function(x){return document.evaluate(x,document,null,9,null).singleNodeValue},
    toNum=function(x){return parseInt(x.match(/\d+/)[0])},
    get=function(x) {return toNum(single("//a[contains(@href,'/"+x+".html')]").innerHTML)},
    pos=get("positivereviews"),
    base=single("//p[contains(text(),'Showing')]"),
    total=toNum(base.childNodes[1].innerHTML);

var info=  (((pos / total) * 100) + "").match(/\d*(?:\.\d{0,2})?/)[0]+"%";

base.innerHTML+=". Overall, it is "+info+" positive.";