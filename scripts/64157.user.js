// ==UserScript==
// @name           STC
// @namespace      http://m0.to/
// @description    SurfTheChannel extension.
// @include        http://www.surfthechannel.com/video/*/*.html
// @version        1.1
// ==/UserScript==

function Checker(cont){
	this.cont = cont;
	this.recheck();
}
Checker.prototype = {
	recheck:function(){
		if(!this.cont.getElementsByTagName("embed")[0])
			return;
		var embed = this.cont.getElementsByTagName("embed")[0];
		if(embed.GetVariable){
			var href = embed.GetVariable("_level1.redir_string");
			if(href!=null)
				this.cont.outerHTML = '<a style=\'color:blue;font-size:20px;\' href=\''+href+'\'>Click to watch!</a>';
			else
				window.setTimeout(function(self){return function(){self.recheck();}}(this),20);
		}
	}
}

function requ(request){
	function checkRss(result) {
		var content = result.responseText;
		var html;
		var container = document.createElement("div");
		container.innerHTML=content;
		if(container.getElementsByTagName("embed")[0])
			html = container.getElementsByTagName("embed")[0].parentNode.innerHTML;
		else
			html = "<div style='text-align:center;width:250px;'>Link broken!</div>";
			
		container.innerHTML="";
		
		toFix[request.l].setAttribute("href","#");
		toFix[request.l].setAttribute("target","");
		toFix[request.l].setAttribute("onclick","");
		toFix[request.l].style.float="left";
		toFix[request.l].style.clear="left";
		toFix[request.l].style.display="block";
		toFix[request.l].style.width="260px";
		toFix[request.l].style.marginBottom="10px";
		toFix[request.l].style.height="35px";
		toFix[request.l].parentNode.nextSibling.setAttribute("style","margin-left:70px;float:right;");
		toFix[request.l].parentNode.parentNode.style.height=(55*(toFix[request.l].parentNode.getElementsByTagName("a").length))+"px";
		if(toFix[request.l].innerHTML=="Watch This Video!"){
			toFix[request.l].innerHTML="";
		}
		toFix[request.l].innerHTML+="<div style='margin:0;padding:0;float:right;'>"+html+"</div>";
		
		new Checker(toFix[request.l]);
	}
	GM_xmlhttpRequest({
		method:"GET",
		url:request.site,
		onload:checkRss
	});
}
var links=document.getElementsByTagName("a");
var divs = document.getElementsByTagName("div");
var toFix=new Array();
var i=0;
for(i=0;i<divs.length;i++){
	if(divs.item(i).className=="siteexpand"){
		divs.item(i).parentNode.style.display="none";
	}
	else if(divs.item(i).id.match("^expand.*")){
		divs.item(i).style.display="";
	}
	else if(divs.item(i).className=="download" || divs.item(i).className=="addrating" || divs.item(i).className=="deadlink"){
		divs.item(i).style.display="none";
	}
}


for(i=0;i<links.length;i++){
	var link=links.item(i);
	if(link.getAttribute("href")){
		if(link.innerHTML=="Buy This Video!"){
			link.parentNode.parentNode.style.display="none";
		}
		var result;
		result = link.getAttribute("href").match(".*link\/([0-9]+\/[0-9]+\/[0-9]+\/[0-9]+)");
		if(result){
			toFix.push(link);
			requ({site: "http://www.surfthechannel.com"+link.getAttribute("href"),l:toFix.length-1});
		}
		
		if(link.getAttribute("onclick")){
			result = link.getAttribute("onclick").match(/window\.open\(\'(\/link.*?)\'\)/);
			if(result){
				toFix.push(link);
				requ({site: "http://www.surfthechannel.com"+result[1],l:toFix.length-1});
			}
		}
	}
}