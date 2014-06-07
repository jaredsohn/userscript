// ==UserScript==
// @name           twitter automatic follow back uses tweepi reciprocate
// @namespace      mdlamar
// @description    automates tweepi reciprocation
// @include        http://tweepi.com/tools/recip/*
// ==/UserScript==

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}
var node = document.getElementById('followtable');
var checkboxes = getElementsByClassName('cbf', node);
for(var i=0,j=checkboxes.length;i<j;i++){
  checkboxes[i].checked = true;
}
// This function inserts newNode after referenceNode
function insertAfter( referenceNode, newNode )
{
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}
setTimeout("document.getElementById('followbtn-bottom').click()",5000);
var query = window.location.search.substring(1);
query=query.split('&');
for(i in query){
	var tmp=query[i].split('=');
	if(tmp[0]=='page'){
		var page=Number(tmp[1]);
		page++;
		query[i]='page=' + page;
	}
}
query = '?'+query.join('&');
var link = document.createElement('a');
var par = document.createElement('p');
par.setAttribute('style', 'text-align:center');
link.setAttribute('href', query);
//link.setAttribute('id', 'nextpagelink');

var text = document.createElement('input');
text.setAttribute('value', 'Next page >');
text.setAttribute('type', 'button');
text.setAttribute('id', 'nextpagelink');
link.appendChild(text);
par.appendChild(link)
document.getElementById('site').insertBefore(par,document.getElementById('main'));
//setTimeout("document.getElementById('nextpagelink').click()",10000);
