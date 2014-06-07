// ==UserScript==
// @id             kaliop.redmine.add.some.stuffs
// @name           Redmine add some stuffs
// @version        3.0
// @namespace      -
// @author         Julien Fabre
// @description    
// @include        http*
// @run-at         document-end
// ==/UserScript==

if (document.querySelector("meta[content='Redmine']") != null){

displayDate();
addTopshortcut();
addMainshortcut();
addHrefOnIssues();


}

function displayDate(){

    var count=0;
    var thisNode=null;
    var tabNode= [];
    var iterator = document.evaluate('//a[@title]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
    var thisNode = iterator.iterateNext();
    
    while (thisNode) {
    	count++;
    	thisNode= iterator.iterateNext();
        tabNode.push(thisNode);
      }	
    
    for (i=0;i< count-1; i++ ) {
    
    if (/(\d+)\/(\d+)\/(\d+) (\d+):(\d+)/.test(tabNode[i].getAttribute('title')))
    
        tabNode[i].parentNode.appendChild(document.createTextNode( ' '+tabNode[i].getAttribute('title')));
    	
    }	

}


function addTopshortcut(){

  var ul=document.querySelector("#top-menu>ul");
    
    var li1=document.createElement("li");
    li1.innerHTML="<a  class=\"projects\" href=\"/issues\" > Issues </a>";
    ul.appendChild(li1);
    
    var li2=document.createElement("li");
    li2.innerHTML="<a  class=\"projects\" href=\"/time_entries\" > Time entries </a>";
    ul.appendChild(li2);
    
}


function addMainshortcut(){

    var ul2=document.querySelector("#main-menu>ul");
    
    var li3= ul2.firstChild.cloneNode(true);
    li3.firstChild.href=li3.firstChild.href+ "/time_entries";
    
    if(li3.baseURI == li3.firstChild.href ){
        li3.firstChild.className="selected";
        var liissues=document.querySelector("#main-menu li a.issues");
        liissues.className="issues";
    }else {
        li3.firstChild.className="";
    }
    li3.firstChild.innerHTML="Time entries";
    
    ul2.appendChild(li3);
    
}


function addHrefOnIssues(){

var count=0;
var tds1=document.querySelectorAll("table#time-report td");
    count= tds1.length;
    for (i=0;i< count-1; i++ ) {
       if (/#(\d+)/.test(tds1[i].innerHTML)){
        var txt = tds1[i].innerHTML;
        tds1[i].innerHTML = txt.replace(/#(\d+)/,"<a href='/issues/$1' target='about:blank'>$1</a>");
       }
    
    }
}