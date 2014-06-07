// ==UserScript==
// @name           googss
// @namespace      bunedoggle.com
// @description    Add "search this site" link to google seaches
// @include        http://www.google.com/search*
// ==/UserScript==

function getElementsByClass( searchClass, domNode, tagName) {
	var i;
	var j;
	if (tagName == null) tagName = '*';
	var el = new Array();
	var tags = domNode.getElementsByTagName(tagName);
	var tcl = " "+searchClass+" ";
	for(i=0,j=0; i<tags.length; i++) {
		var test = " " + tags[i].className + " ";
		if (test.indexOf(tcl) != -1)
			el[j++] = tags[i];
	}
	return el;
}

function appendHtmlToClass(class,txt, domNode) {
	var el = getElementsByClass(class, domNode);

//	alert(el.length + " " + txt);

	for (var i = 0; i < el.length; i++) {
		el[i].innerHTML = el[i].innerHTML + txt;
	}
} 

var t;

lil =  document.getElementsByTagName('li');

//alert(lil.length);

for(var i=0;i<lil.length;i++){

	if(lil[i].getElementsByTagName('cite')[0]){

		t = lil[i].getElementsByTagName('cite')[0].innerHTML.replace(/<.*?b>/g , "");

		t = t.replace(/\/.*/ , "");

		n = t.replace(/www.(.*)/ , "$1");
		n = n.replace(/(.*?)\.\w+$/ , "$1");

		//alert(n);

		t = "site:" + t;
		

		//alert(i + " -> " + t);

		//appendHtmlToClass('gl' , ' <form action="http://google.com/search?q=' + t + '"> <input name=q> <input type=submit value="Search Site"> </form>', lil[i]);
		appendHtmlToClass('gl' , 
				' &nbsp; <input style:"font-size: 8px;" name=q onchange="javascript: document.gs.q.value=\'' + t + ' \' + this.value;"> <input type=button value="Search ' + n + '" onClick="javascript: document.gs.submit();">', lil[i]);
	}
}