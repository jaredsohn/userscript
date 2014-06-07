// ==UserScript==
// @name           animefreak_list
// @version        0.9
// @namespace      af_list
// @description    link-list of watched animes
// @include        http://www.animefreak.tv/*
// ==/UserScript==

var evaluator = new XPathEvaluator();
var delim="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABHNCSVQICAgIfAhkiAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIfSURBVDiNpZK%2FT1NRFMe%2F596%2B9rXpD%2FrE9BHbRRcpYQCxCZhIHBzBiVUH%2FwINu4NuLC4yOytzE%2BLUdKhNbAlDjSyWAK0lQG1K3nu8tvcdh9aaYjEmfJOz3JzzyT3f8yVmxnUkrjUNwDfusUAU1IDHElhQQBJAUQL5Oeavl3vp8go7RA9FNPpham3NCE1P%2B0Q4TO7%2Bvvczl%2Bu2CoX3DLy8x2yPBZSIHsVmZ7Op9XW957roNZvwXBcyGITfNOGUSqq6ufllvttdxGBwCCgSRQOx2Pe7Gxs3nIMDqHYbYO6X5wFKIZhO4zyf79a3tl7MM78bMVECT26trka7p6fo1euAZQGOA9g2YFlgy4JdLiO%2BvKxp0eirv0wUwAM9mdQudnehGg2Q3w9pGCCi4Q%2B8Xg%2B9Vgt6KmUUiIxF5uafKxDdkUqhUy6DHQdCCLCUEJEIKBIBAgGw60LVavDHYirQv05zuIJiLnROTlibnIQgghACgghkWUCjAa9ahXd0BEGEi1pN6sC3EQ8IyLf39jr6zAyICDSASCn7MCGgmSZI12E3GpU0c2cEsMD86axY%2FMxEHMpkIKQEBiAQQRgGQktLqGezHbju86tyMKWFw%2BXkyspN3TSlOj4GXBc0MQERj6O%2Bvd05r1Rezyn15soklohCJMRbPZF4FkqlPF84TE6tJpzDwx%2BubT%2B9z5z7Z5R%2F6yORvA2kGUh4wE6G%2BWxc35WA%2F9UvEs70xXEXay4AAAAASUVORK5CYII%3D";
var backbar="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAPCAYAAAAlH6X5AAAAAXNSR0IArs4c6QAAAAZiS0dEAAAAAAAA%2BUO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKFRclBRiqaN0AAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAEdJREFUCNcFwbENgDAQBMHVSRQAJdAGlOmSIEZOaeON%2FOfEzABMldKRR0PuDdmB0h9KBxpuKDPQti7oOHdU64uu%2B0EjA4D5Ax3NIPZECUGRAAAAAElFTkSuQmCC";
var backup="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAKCAYAAACjd%2B4vAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKFRc2KUudRawAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAKFJREFUOMu10bENwjAQQNEXpXSfCZghO6SDnhHYgRkyAwPQpadiBkagSkV9NEZKgYSdCEu%2F8N357vTdRITa0zRNwiFfrxHxqm4SEUWgxYALZtwyc44NaIv7FQzsMeKJO07oFvkux%2B65ZkS%2FajB2OOOROWO3yCccM6n03dfBvzavVV1gSsK0oUHtwhPSJ7lfq2zFF%2B2rVNeyWfVWqlT%2Fi6XqN6Rx6z6Tjip3AAAAAElFTkSuQmCC";
var backdo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAKCAYAAACjd%2B4vAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKFgALISRynzsAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAAKhJREFUOMu107ENwjAQheEvonSfCZiBHeigZ4TswAzMwAB06amYgRGoqKiP5kAUiJAYLD3Jlu33Tr%2FPIgJWKBHhn0LBKucKelyxxxKzH4bN0nOfGT3K64EWHU64YIdFReAiPS7p2aF97r9DjTm2OKe2mH8R9vHeKNSDlQ%2BQqkb9xuCYmlZwBbJNatIT1TfJxKas%2BRYfUQ%2BpeXTYmNE0TcE6l4eIuI31uAOCPus%2BdYchPAAAAABJRU5ErkJggg%3D%3D";
var imgadd="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAGIAYgCFzDD3swAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKFgAVKf7oKNYAAAILSURBVDjLxVPNTxNxEH3T%2Fa3d2tpuyW5rP7T4efAGBj8SIfFAUC9KjTGC4EE9yIGD%2F4AH9a6JRxM1NWgQ24vRqInRAAkKwYO0okikidGEtu62i92y0K6HSrUtRi%2FG32nyMvN%2BM2%2FeAP%2F70Wqg1CnaiKjdqrsPmFTyGkL2CYDhVFRJ1OayWkAOu9t4iQ029vsb9J4tPABsvls4Eh9JLAG4CeB8KqrkV%2FItNcX7xTbHY%2B94q7fddZBfwdfzPovtWrN11%2BWmM8TTM%2F9ZieoIpE7RyUvsnuNWiwAAY9pohfitHgcAfO4SuWC%2Fp3kpU%2ByrIyCiw4FzsrNlyAFbZBbz3XKFQDnpB7s%2BDXbjHTqCh3heYhfqRNzeunfCvuDb%2BetIoVAjACCZnKvSSeseL6qjmicdU79WOsiJc%2Fm%2FXR0vsSIRBau2sMz057bI7D5lMkf6zCLcD%2FZU%2FZw9%2BhJm0cTWY5swM1DgiGG6ioCIhpWJnCFcbbIKPwpc93eXu%2Bt6BddAObYd16B%2FXIzPDypGlYipqPI081Adc93%2BZAIAcT89RlSOQ3e%2BYSqaMEq6eXpVJ8pht4%2B5uMlAn0cOrtvAJU%2FYAQCOSBIyL%2BPNo7ihjixcTA0pl35rZTnsXgsLrggb15yyB5ymdcrPtG0fSvn3hS%2FL2WJvOqa%2B%2BOMtAEBDh5Pj7NwOAF7TNF%2BnY2rmn1zjd0qhrnDGnSLdAAAAAElFTkSuQmCC";
var imgnew="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAGIAYgCFzDD3swAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sKFgAWBn4URkwAAAIxSURBVDjLpZNLaBNRFIb%2Fe%2BdOm2aapHlMfCStSqGKW%2B0iCgUX4mMjpLjVhRbRhaB7UdCt4MaNK7cqyc66KFRrCyqtD9AkUmotjUEyIZM0Se9MJ5l7XVQLCbGb%2FMvD4eOc8%2F%2BHSCnRiyh6FOtW1JPBAULIaQDHAcQBfAAwb6TMbGcv6VwhOhmaUCPs%2BcGb%2B0PjWoL5FB%2FJWRmRWcg2yy83ngK4baRM3hUQnQydGpoYnL56ccrDBYfRLMISHBodxEj%2FAbytvXEX731ZYn6aKDwpyTaAngz6%2B3R19dqdqXDOyqDSMiEgAACudOGihXEtgdnCTDP%2FsHjLSJmP245ICLkQu677C84vrDtrqIsaLMGxKRqoN%2BvgNsdcdRZn4udVNcLudnPh5CFtVP1YWkQt20D9xyashg2HOxC2gNsQaJktGM0ivGOekJ4MhjpdGJVSovq6DpcLgAJUJWBBBWyIgXoohC2wtncVaoS5hJA4AHNnAinlu0IzL%2Fti6vZKCgEo4NYEttYd8JwFa8UGBYW1YiuE4XvnDeYrSzUneiwMUIBQgBACohKAbQM9w%2F0YoF5YP7cyxWem0wYwUuZMebr6noDK8LnAzgR%2F4VCjDIdPjOFbOusIS175Xw72sYDyKXYjqsd9w0rBysPlAlpAg67q%2BPoq41QXGveNF%2BaD3ZLoBcUjz0jfZe8Rj1BDjPBlm%2FJl%2B3drw71USlfmdo3yP4XPBhRFU44C2COl%2FFxKV8rd%2Bkiv7%2FwHz%2B%2F9vaK2P2gAAAAASUVORK5CYII%3D";

init();
styles();
full();

if(GM_getValue('res')==1){
	init();	
	document.getElementById('afl_list').innerHTML+="<div id='afl_bar'><a id='afl_rres'></a></div>";
	document.getElementById('afl_bar').addEventListener('click',res,false);
}else{
	init();
	full();
}

function init(){
	if(document.getElementById('afl_list')){document.body.removeChild(document.getElementById('afl_list'));}
	var neutab = document.createElement("div");
	neutab.id='afl_list';
	document.body.insertBefore(neutab,document.body.firstChild)
}
function styles(){
	var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = "#afl_list {position:fixed;left:0px;top:0px;background-color:#99F;text-align:left;font-size:12;cursor:pointer;border-radius:0px 0px 12px 0px; padding:5px;}"+
	"#afl_list a, #afl_list a:visited{link-decoration:none;color:black}"+
	"#afl_list a:hover{color:red;}"+
	"#afl_list img{margin-bottom: -3px;right:0px;position:relative;}"+
	"#afl_list .afl_active{color:#BF0!important;}"+
	"#afl_bar{background-image:url("+backbar+");height:15px;border-radius:0 0 5px 0;margin:5px -5px -5px;}"+
	"{background-image:url("+backbar+");height:15px;border-radius:0 0 5px 0;margin:5px -5px -5px;}"+
	"#afl_bar a{display:block;height:10px;width:30px;}"+
	"#afl_res{margin: auto;background-image:url("+backup+");}"+
	"#afl_rres{margin: -10px auto auto;background-image:url("+backdo+");}";
    document.head.appendChild(style);
}

function upp(){
	if(!GM_getValue("afl_akt"))return false;
	var titlepage= evaluator.evaluate("/html/body/div[4]/div[5]/div/div/h1", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);	
	if(titlepage.singleNodeValue&&titlepage.singleNodeValue.innerHTML.match(/(.*?) episode (\d+)/i)){
	var mat=titlepage.singleNodeValue.innerHTML.match(/(.*?) episode (\d+)/i);
	var list = GM_getValue("afl_akt").split(String.fromCharCode(20));
	for(var i=0;i<list.length;i++){
	if(mat[1]==list[i].split(String.fromCharCode(21))[0]){
	list[i]=list[i].split(String.fromCharCode(21))[0]+String.fromCharCode(21)+mat[2];
	}
	}
	GM_setValue("afl_akt",list.join(String.fromCharCode(20)));
	}
}

function akt(){
	var htmllist= evaluator.evaluate("/html/body/div[4]/div[5]/div[3]/div[3]/div", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);	
	if(!htmllist.singleNodeValue)return false;
	
	var entrlist =new Array();
	var entrnamlist=new Array();
	if (GM_getValue("afl_akt"))entrlist=GM_getValue("afl_akt").split(String.fromCharCode(20));
	for(var i=0;i<entrlist.length;i++){
	entrnamlist.push(entrlist[i].split(String.fromCharCode(21))[0]);
	}	
	var htmlentr="";
	var patt=/<a href="([^"]*?)">.*?<span style="font-size: x-small;">([^<]*?) Episode (\d+)<\/span>/ig;
	while(htmlentr=patt.exec(htmllist.singleNodeValue.innerHTML)){
	if(entrnamlist.indexOf(htmlentr[2])!=-1){
	if(parseInt(entrlist[entrnamlist.indexOf(htmlentr[2])].split(String.fromCharCode(21))[1])<parseInt(htmlentr[3])){
	var linkentry= evaluator.evaluate("/html/body/div/a[contains(.,'"+htmlentr[2]+"')]", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);	
	if(linkentry.singleNodeValue){
	linkentry.singleNodeValue.className="afl_active";
	linkentry.singleNodeValue.previousSibling.childNodes[1].src=imgnew;
	linkentry.singleNodeValue.href=htmlentr[1];
	}
	}
	}
	}
}


function full() {
	document.getElementById('afl_list').innerHTML="";
	var i=0;
	if(GM_getValue('afl_anime')){
	var liste=GM_getValue('afl_anime').split(String.fromCharCode(20));
	for(e in liste){
	document.getElementById('afl_list').innerHTML += '<a id="afl_k'+i+'" title="Remove entry!"> <img src="'+delim+'" /></a><a href="'+liste[e].split(String.fromCharCode(21))[0]+'">'+liste[e].split(String.fromCharCode(21))[1]+'</a>';
	i++;
	if(e!=liste.length-1){document.getElementById('afl_list').innerHTML += "<br />";}
	}
	}
	if(!curcontain()&&window.location.href.match(/\bhttp:\/\/www\.animefreak\.tv\/watch\//)){
	if(GM_getValue('afl_anime')&&!GM_getValue('afl_anime')==""){document.getElementById('afl_list').innerHTML+='<br />';}
	document.getElementById('afl_list').innerHTML+='<a id="afl_new"><img src="'+imgadd+'" style="margin-right:2px;margin:top;"/>Element hinzufügen<a>';
	}
	document.getElementById('afl_list').innerHTML+="<div id='afl_bar'><a id='afl_res'></a></div>";
	for(var x=0; x<i;x++){
	document.getElementById('afl_k'+x).addEventListener('click',del,false);
	}
	document.getElementById('afl_bar').addEventListener('click',res,false);
	if(document.getElementById('afl_new'))document.getElementById('afl_new').addEventListener('click',add,false);
	upp();
	akt();
}

function res(){
	if(GM_getValue('res')!=1){
	init();	
	document.getElementById('afl_list').innerHTML+="<div id='afl_bar'><a id='afl_rres'></a></div>";
	document.getElementById('afl_bar').addEventListener('click',res,false);
	GM_setValue('res',1);
	}else{
	init();
	full();
	GM_setValue('res',0);
	}
}

function del(evt){
	var arr = GM_getValue('afl_anime').split(String.fromCharCode(20));
	arr.splice(arr.indexOf(evt.target.parentNode.nextSibling.href.replace(/episode-\d+-online/,"online")+String.fromCharCode(21)+evt.target.parentNode.nextSibling.innerHTML),1);
	GM_setValue('afl_anime',arr.join(String.fromCharCode(20)));	
	
	arr = GM_getValue('afl_akt').split(String.fromCharCode(20));
	for(var i=0;i<arr.length;i++){
	if(arr[i].split(String.fromCharCode(21))[0]==evt.target.parentNode.nextSibling.innerHTML){arr.splice(i,1);}
	}
	GM_setValue('afl_akt',arr.join(String.fromCharCode(20)));	
	full();
}

function add(){
	var title= evaluator.evaluate("/html/body/div[4]/div[5]/div[2]/div/h2", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);	
	if(GM_getValue('afl_anime')){
		var arr = GM_getValue('afl_anime').split(String.fromCharCode(20));
	}else{
		var arr = new Array();
	}
	if(GM_getValue('afl_akt')){
		var ark = GM_getValue('afl_akt').split(String.fromCharCode(20));
	}else{
		var ark = new Array();
	}
	
	if(arr.indexOf(window.location.href+String.fromCharCode(21)+title.singleNodeValue.innerHTML)==-1){
		if(!window.location.href.match(/episode-\d+-online/)){
			var link=window.location.href;
		}else{
			var link =evaluator.evaluate("/html/body/div[4]/div[5]/div/div/div/p/a", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			link=link.singleNodeValue;
		}
		arr.push(link+String.fromCharCode(21)+title.singleNodeValue.innerHTML.replace(/\s\s+/gi,""));
		ark.push(title.singleNodeValue.innerHTML.replace(/\s\s+/gi,"")+String.fromCharCode(21)+"0")
	}
	arr.sort();
	ark.sort();
	GM_setValue('afl_anime',arr.join(String.fromCharCode(20)));
	GM_setValue('afl_akt',ark.join(String.fromCharCode(20)));
	full();
}

function curcontain(){
	var title= evaluator.evaluate("/html/body/div[4]/div[5]/div[2]/div/h2", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);	
	
	if(GM_getValue('afl_anime')&&title.singleNodeValue){
		var arr = GM_getValue('afl_anime').split(String.fromCharCode(20));
	}else{
		return false;
		GM_log("liste Leer");
	}
	if(!window.location.href.match(/episode-\d+-online/)){
			var link=window.location.href;
	}else{
			var link =evaluator.evaluate("/html/body/div[4]/div[5]/div/div/div/p/a", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
			link=link.singleNodeValue;
	}
	if(arr.indexOf(link+String.fromCharCode(21)+title.singleNodeValue.innerHTML.replace(/\s\s+/gi,""))!=-1){
		return true;
	}
	return false;
	GM_log("nicht vorhanden\n"+link+String.fromCharCode(21)+title.singleNodeValue.innerHTML);
}














