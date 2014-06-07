// ==UserScript==
// @name           Better bash.org.ru
// @namespace      http://zhekanax.livejournal.com/
// @description    Submits your vote w/o opening new window or reloading page + more
// @include        http://bash.org.ru/*
// ==/UserScript==

var loading=document.createElement("img");
//loading.src="http://www.ajaxload.info/cache/ff/ff/ff/38/38/38/1-0.gif";
loading.src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///zg4OM/Pz2trazg4OISEhJ2dnampqSH/C05FVFNDQVBFMi4wAwEAAAAh/h1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh/hVNYWRlIGJ5IEFqYXhMb2FkLmluZm8AIfkECQoAAAAsAAAAABAAEAAAAzMIutz+MMpJaxNjCDoIGZwHTphmCUWxMcK6FJnBti5gxMJx0C1bGDndpgc5GAwHSmvnSAAAIfkECQoAAAAsAAAAABAAEAAAAzQIutz+TowhIBuEDLuw5opEcUJRVGAxGSBgTEVbGqh8HLV13+1hGAeAINcY4oZDGbIlJCoSACH5BAkKAAAALAAAAAAQABAAAAM2CLoyIyvKQciQzJRWLwaFYxwO9BlO8UlCYZircBzwCsyzvRzGqCsCWe0X/AGDww8yqWQan78EACH5BAkKAAAALAAAAAAQABAAAAMzCLpiJSvKMoaR7JxWX4WLpgmFIQwEMUSHYRwRqkaCsNEfA2JSXfM9HzA4LBqPyKRyOUwAACH5BAkKAAAALAAAAAAQABAAAAMyCLpyJytK52QU8BjzTIEMJnbDYFxiVJSFhLkeaFlCKc/KQBADHuk8H8MmLBqPyKRSkgAAIfkECQoAAAAsAAAAABAAEAAAAzMIuiDCkDkX43TnvNqeMBnHHOAhLkK2ncpXrKIxDAYLFHNhu7A195UBgTCwCYm7n20pSgAAIfkECQoAAAAsAAAAABAAEAAAAzIIutz+8AkR2ZxVXZoB7tpxcJVgiN1hnN00loVBRsUwFJBgm7YBDQTCQBCbMYDC1s6RAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P4wykmrZULUnCnXHggIwyCOx3EOBDEwqcqwrlAYwmEYB1bapQIgdWIYgp5bEZAAADsAAAAAAAAAAAA=";
var links=document.getElementsByTagName("a");
var divs=document.getElementsByTagName("div");
var imgs=document.getElementsByTagName("img");
var req=0;
var reqa=0;
var FILTER_ABYSS=false;
var Remain={
	valueOf:function(){
		var sc=document.body.scrollTop;
		var total=(document.body.scrollHeight - document.body.clientHeight);
		var remain=total-sc;
		return total-sc;
	}
};

var watch_scroll=function(){
	var self=arguments.callee;
	if(Remain<700)
		abyss();
	setTimeout(self,100);
};
var getElementsByClassName=function(cl) {
	var retnode=[];
	var myclass=new RegExp('\\b'+cl+'\\b');
	var elem=document.getElementsByTagName('*');
	for(i=0;i<elem.length;i++){
		var classes=elem[i].className;
			if(myclass.test(classes))
				retnode.push(elem[i]);
	}
	return retnode;
};




function updfilter(e){
	FILTER_ABYSS=e.target.checked;
	els=document.getElementsByTagName("*");
			for(i=0;i<els.length;i++)
				if(els[i].className=="q")
					els[i].style.display="none";
	abyss();
}

function abyss(){
	if(reqa)
		return false;

	document.body.appendChild(loading);

	reqa=1;
	a=new XMLHttpRequest();

	a.open("GET","http://bash.org.ru/abyss",true);
	a.setRequestHeader("Referer", window.location);
	a.send('');

	a.onreadystatechange = function(){
		if(a.readyState==4){
			add=a.responseText;

			qs=getElementsByClassName("q");
			q=qs[qs.length-1];

			div=document.createElement("div");
			div.innerHTML=add;
			els=div.getElementsByTagName("*");
			for(i=0;i<els.length;i++)
				if(els[i].className=="q"){
					if(FILTER_ABYSS){
						canadd=0;
						if(els[i].innerHTML.match(/<span>([0-9-]+)<\/span>/gim))
							canadd=parseInt(RegExp.$1);
						if(canadd>0)
							q.parentNode.appendChild(els[i]);
					}
					else{
						q.parentNode.appendChild(els[i]);
					}
				}
			init();
			document.body.removeChild(loading);
			reqa=0;
		}
	};
}

function vote(e){
	if(req){
		window.setTimeout(function(){vote(e)},300);
	}
	else{
		link=e.target;
		link.parentNode.appendChild(loading);

		req=1;
		r=new XMLHttpRequest();

		r.open("GET",link.href,true);
		r.setRequestHeader("Referer", window.location);
		r.send('');

		r.onreadystatechange = function(){
			if(r.readyState==4){
				link.parentNode.removeChild(link.parentNode.lastChild);
				if(!/abyss/.test(link.href)){
					r.responseText.match(/<span>([0-9-]{1,10})<\/span>/gim);
					rating=RegExp.$1;
					nodes=link.parentNode.childNodes;
					for(i=0;i<nodes.length;i++)
						if(nodes[i].tagName=="SPAN")
							nodes[i].innerHTML=rating;
				}
				req=0;
			}
		};
	}
	e.preventDefault();
	return false;
}

function init(){
	for(i=0;i<links.length;i++){
		link=links[i];
		if(/\/(quote|abyss)\/[0-9]+\/[a-z]+/.test(link.href)){
			link.addEventListener("click",vote,false);
		}
	}


	/* remove ads */

	for(i=0;i<divs.length;i++){
		div=divs[i];
		if(div.className=="news stats c"){
		    div.style.width = "auto";
		    div.style.height = "auto";
		}
		if(!div.id&&!div.className){
			children=div.childNodes;
			for(j=0;j<children.length;j++){
				if(children[j].tagName=="A")
				    if(!/\/quote\//.test(children[j].href))
						div.style.display="none";
			}
		}
	}

	/* remove images */
    if(!/\/comics/.test(window.location)){
    	for(i=0;i<imgs.length;i++)
    		imgs[i].style.display="none";
	}
	else{
	    for(i=0;i<imgs.length;i++){
	        if(!/\/img\/[a-z0-9]{16,20}[0-9]{1,8}\.(jpg|gif)/i.test(imgs[i].src))
	            imgs[i].style.display="none";
		}
	}

	 /* set page width */
	bar=document.getElementById("bar");
	if(bar){
		bar.style.height="auto";
	}
	page=document.getElementById("page");
	if(page){
		page.style.margin = "20px auto 20px 160px";
		page.style.width = "800px";
	}

}
if(/\/abyss$/.test(window.location)){
	watch_scroll();
}

for(i=0;i<divs.length;i++){
	div=divs[i];
	if(div.className=="news stats c"){
		div.style.width="740px";
		div.style.margin="0px";
	}
	else if(div.className=="menu"){
		div.style.position="fixed";
		div.style.top="10px";
		div.style.left="2px";
		div.style.width="150px";
		menu=div.innerHTML;
		menu=menu.replace(/<b>\[(.*)\]<\/b>/i,"[<a href=\""+window.location.href.replace(/^http:\/\/bash\.org\.ru\/(.+)\/.+$/,"/$1")+"\"><b>$1</b></a>]");
		menu=menu.replace(/\[<a/g,"<br />&nbsp;&nbsp;&nbsp;[<a");
		menu="<span style=color:#555><b>bash.org.ru<br />Цитатник Рунета</b></span><br/><br/>"+menu;
//		if(/abyss/.test(window.location))
//			menu+="<br /><input type='checkbox' id='GM_BOR_FILTERABYSS' /><label for='GM_BOR_FILTERABYSS'> &gt;1</label>";
		div.innerHTML=menu;

//		if(/abyss/.test(window.location))
//			document.getElementById("GM_BOR_FILTERABYSS").addEventListener("change",updfilter,false);
	}
	else if(div.className=="header"){
		div.style.display="none";
	}
}

if(/\/comics/.test(window.location)){
	links=document.getElementsByTagName("a");
	for(i=0;i<links.length;i++){
		links[i].setAttribute("style","color: #ddddff");
	}
}

	copy=document.createElement("small");
	copy.innerHTML="greasemonkey script by zhekanax [at] gmail [dot] com";
	copy.style.color="gray";
	document.body.appendChild(copy);

init();
