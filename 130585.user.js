// ==UserScript==
// @name           Add Google Scholar
// @namespace      userscripts.org
// @description    Add Google Scholar to search options bar
// @include        http://google.*
// @include        http://www.google.*
// @include        https://google.*
// @include        https://www.google.*
// @version        0.2
// ==/UserScript==



var url1 	= 'https://scholar.google.com/scholar?q=';
var url2 = url = ref1 = t ='';

function sch_update(){
	if(document.getElementById('ms')!=null){
		ref1 = document.getElementById("ms").children[0].children[1].children[0].href;
		if(ref1.search("/?q=")!=0) url2 = ref1.substring(ref1.search("/?q=")+2).split("&")[0]
		url 	= url1+url2;
		document.getElementById('sch022886').children[0].setAttribute('href',url)  
	}
	else{
		t = setTimeout("sch_append()",200);
		return;
	}
}

function sch_append(){
	if(document.getElementById('ms')!=null){
		if(document.getElementById("sch022886")==null){
			var list1 	= document.getElementById("ms").children[0];
			var dd 		= document.createElement('li');
			dd.innerHTML="<a href='' class='kl'>Scholar</a>";
			dd.setAttribute('class','mitem');
			dd.setAttribute('id','sch022886');
			list1.appendChild(dd);			
		}
		sch_update();
	}
	else{
		t = setTimeout("sch_append()",200);
		return;
	}
}


window.onpopstate = function(event) {  
  sch_append();
}; 

sch_append();