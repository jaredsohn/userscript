// ==UserScript==
// @name           twitter unfollower uses tweepi to flush slackers
// @namespace      mdlamar
// @include        http://tweepi.com/tools/flush/*
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

//Check all the boxes
var node = document.getElementById('followtable');
var checkboxes = getElementsByClassName('cbf', node);
for(var i=0,j=checkboxes.length;i<j;i++){
  checkboxes[i].checked = true;
}

//click unfollow after a few seconds to make sure the page has loaded.
setTimeout("document.getElementById('unfollowbtn-bottom').click()",5000);

//create a next page button at the top to avoid all that scrolling
//potential to fully automate the process.
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
link.setAttribute('href', query);
link.setAttribute('style', 'text-decoration:none');
//link.setAttribute('id', 'nextpagelink');

var par = document.createElement('p');
par.setAttribute('style', 'text-align:center');

var btn = document.createElement('input');
btn.setAttribute('value', 'Next page >');
btn.setAttribute('type', 'button');
btn.setAttribute('id', 'nextpagelink');

link.appendChild(btn);
par.appendChild(link)
document.getElementById('site').insertBefore(par,document.getElementById('main'));
//setTimeout("document.getElementById('nextpagelink').click()",10000);