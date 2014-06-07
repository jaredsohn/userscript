// ==UserScript==
// @name           ETI Archive Quoter
// @description    Adds a 'Quote' button to posts in the archives
// @namespace      pendevin
// @include        http://archives.endoftheinter.net/showmessages.php*
// @include        https://archives.endoftheinter.net/showmessages.php*
// @include        http://boards.endoftheinter.net/showmessages.php*
// @include        https://boards.endoftheinter.net/showmessages.php*
// ==/UserScript==

//returns a new element with (tag, id(optional), classname(optional), innerHTML(optional))
//if you want any other attributes, add arrays to the end of the arguments with [attribute,value]
//this might be cooler using JSON, but i could be wrong---probably
//for the attributes, use the html versions not the dom versions
function addElm(tag,id,className,innerHTML){
	var newElm=document.createElement(tag);
	if(id!=undefined&&id!=null)newElm.id=id;
	if(className!=undefined&&className!=null)newElm.className=className;
	if(innerHTML!=undefined&&innerHTML!=null)typeof innerHTML=="string"?newElm.innerHTML=innerHTML:newElm.appendChild(innerHTML);
	for(var i=4;i<arguments.length;i++)newElm.setAttribute(arguments[i][0],arguments[i][1]);
	return newElm;
}

//i totally improved this one
//variables that aren't present return null
//a variable with no value returns the true
function getUrlVars(urlz){
	//thanks for the function citizenray
	var vars=[];
	var hash="";
	var hashes=urlz.slice(urlz.indexOf('?')+1).split('&');
	for(var i=0;i<hashes.length;i++){
		hash=hashes[i].split('=');
		if(hash[1]!=null&&hash[1].indexOf("#")>=0)hash[1]=hash[1].substring(0,hash[1].indexOf("#"));
		if(hash[1]==undefined){
			hash[1]=true;
			if(hash[0].indexOf("#")>=0)hash[0]=hash[0].substring(0,hash[0].indexOf("#"));
		}
		vars.push(hash[0]);
		vars[hash[0]]=hash[1];
	}
	return vars;
}

//not a method
function insertAfter(newNode,target){
	var parent=target.parentNode;
	var refChild=target.nextSibling;
	if(refChild!=null)parent.insertBefore(newNode,refChild);
	else parent.appendChild(newNode);
}

function postToText(post){
	var body=document.getElementsByClassName('body')[0];
	//duplicate post
	var poster=addElm("div",null,null,post.innerHTML);
	body.appendChild(poster);

	//get rid of sigs
	if(poster.innerHTML.indexOf("<br>\n---<br>")!=-1)poster.innerHTML=poster.innerHTML.substring(0,poster.innerHTML.lastIndexOf("<br>\n---<br>"));
	else if(poster.innerHTML.indexOf("</div>---<br>")!=-1)poster.innerHTML=poster.innerHTML.substring(0,poster.innerHTML.lastIndexOf("</div>---<br>"));

	//deal with spoilers
	var spoiled=[];
	for(var i=0;poster.getElementsByClassName("spoiler_closed")[0]!=undefined;i++){
		var spoilers=poster.getElementsByClassName("spoiler_closed")[0];
		spoiled[i]=addElm(
			"span",
			null,
			"replace",
			'<spoiler'+(spoilers.lastChild.firstChild.innerHTML!="&lt;spoiler&gt;"?' caption="'+spoilers.lastChild.firstChild.innerHTML.slice(4,-4)+'"':'')+'>'+
				spoilers.lastChild.innerHTML.substring(spoilers.lastChild.innerHTML.indexOf("</a>")+4,spoilers.lastChild.innerHTML.lastIndexOf("<a class="))+"</spoiler>"
		);
		spoilers.parentNode.insertBefore(spoiled[i],spoilers);
		spoilers.parentNode.removeChild(spoilers);
	}

	//deal with quotes
	var quoted=[];
	for(i=0;poster.getElementsByClassName("quoted-message")[0]!=undefined;i++){
		var quotes=poster.getElementsByClassName("quoted-message")[0];
		quotes.removeChild(quotes.firstChild);
		quoted[i]=addElm(
			"span",
			null,
			"replace",
			'<quote'+(quotes.getAttribute("msgid")!=""?' msgid="'+quotes.getAttribute("msgid")+'"':"")+(quotes.parentNode.parentNode.className=="message"&&quotes.getAttribute("msgid")!=""?" />":'>'+quotes.innerHTML)+"</quote>"
		);
		quotes.parentNode.insertBefore(quoted[i],quotes);
		quotes.parentNode.removeChild(quotes);
	}

	//deal with images
	var imgs=poster.getElementsByClassName("imgs");
	for(i=0;i<imgs.length;i++){
		var imged=[];
		for(j=0;imgs[i].getElementsByClassName("img")[0]!=undefined;j++){
			var img=imgs[i].getElementsByClassName("img")[0];
			if(img.tagName=="A"&&img.nextSibling.tagName=="BR")
				img.parentNode.removeChild(img.nextSibling);
			imged[j]=addElm("img",null,null,null,["src",img.tagName=="A"?img.getAttribute("imgsrc"):img.firstChild.firstChild.getAttribute("imgsrc")]);
			img.parentNode.insertBefore(imged[j],img);
			img.parentNode.removeChild(img);
		}
		var iaed=[];
		for(var j=0;imgs[i].getElementsByTagName("a")[0]!=undefined;j++)if(imgs[i].getElementsByTagName("a")[0].parentNode.parentNode.className!="img"){
			var ias=imgs[i].getElementsByTagName("a")[0];
			iaed[j]=addElm("img",null,null,null,["src",ias.getAttribute("imgsrc")]);
			ias.parentNode.insertBefore(iaed[j],ias);
			ias.parentNode.removeChild(ias);
		}
	}

	//deal with links
	var aed=[];
	for(i=0;poster.getElementsByTagName("a")[0]!=undefined;i++){
		var as=poster.getElementsByTagName("a")[0];
		aed[i]=addElm("span",null,"replace",!as.href.match(/^javascript/)?as.href:'');
		as.parentNode.insertBefore(aed[i],as);
		as.parentNode.removeChild(as);
	}

	//deal with pre tags
	var pred=[];
	for(i=0;poster.getElementsByClassName("pr")[0]!=undefined;i++){
		var pres=poster.getElementsByClassName("pr")[0];
		pred[i]=addElm("span",null,"replace","<pre>"+pres.innerHTML+"</pre>");
		pres.parentNode.insertBefore(pred[i],pres);
		pres.parentNode.removeChild(pres);
	}

	//if you have the userpics script, get rid of the userpic
	if(poster.getElementsByClassName("photo-album-image")[0])poster.removeChild(poster.getElementsByClassName("photo-album-image")[0]);

	//final clean-up and display
	var alert=poster.innerHTML;
	body.removeChild(poster);
	alert=alert.replace(/<span\sclass="replace">/g,"").replace(/<span>/g,"").replace(/<\/span>/g,"");
	alert=alert.replace(/<div\sclass="imgs">\s?<img/g,"<img").replace(/<div\sstyle="clear:both"><\/div><\/div>/g,'<br>').replace(/<div\sstyle="clear:both"><\/div><\/div><br><img/g,'<img');
	alert=alert.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/&lt;br&gt;/g,"<br>");
	alert='&lt;quote msgid="'+post.getAttribute("msgid")+'"&gt;'+alert+"&lt;/quote&gt;\n";
	//popup wrapper
	var wrapper=document.createElement('div');
	wrapper.id='archiveQuoterWrapper';
	document.body.appendChild(wrapper);
	//classify brings up popup overlay thing (ugh)
	var textBox=document.createElement('div');
	textBox.id='archiveQuoterTextBox';
	wrapper.appendChild(textBox);
	textBox.style.backgroundColor=window.getComputedStyle(document.body).getPropertyValue("background-color");
	textBox.innerHTML='<div id="aq_text">'+alert+'</div><br><div id="aq_close"><input type="button" value="Close"></div>';
	textBox.lastChild.addEventListener('click',function(){document.body.removeChild(wrapper);},false);
	wrapper.addEventListener('click',function(e){if(e.target==wrapper)document.body.removeChild(wrapper);},false);
}

if(location.hostname=="archives.endoftheinter.net"||document.getElementsByTagName("em")&&document.getElementsByTagName("em")[0].innerHTML=="This topic has been closed. No additional messages may be posted."){
	var tops=document.getElementsByClassName("message-top");
	var quotes=[];
	for(var i=0;i<tops.length;i++){
		if(tops[i].parentNode.className!="quoted-message"){
			quotes[i]=addElm("span",null,null," | <a id='quote_"+i+"'>Quote</a>");
			var a=tops[i].getElementsByTagName("a");
			for(var j=0;j<a.length;j++)if(a[j].href.search(/\/message\.php\?/)!=-1){
				insertAfter(quotes[i],a[j]);
				break;
			}
			var href=quotes[i].parentNode.nextSibling.tagName=="DIV"?
				quotes[i].parentNode.nextSibling.getAttribute("msgid").split(","):
				quotes[i].parentNode.nextSibling.firstChild.firstChild.firstChild.getAttribute("msgid").split(",");
			quotes[i].lastChild.href="/postmsg.php?board="+getUrlVars(location.href)["board"]+"&topic="+href[1]+"&quote="+href[2].slice(0,-2);
			quotes[i].lastChild.addEventListener("click",function(e){
				e.preventDefault();
				if(e.target.parentNode.parentNode.nextSibling.tagName=="DIV")
					postToText(e.target.parentNode.parentNode.nextSibling);
				else
					postToText(e.target.parentNode.parentNode.nextSibling.firstChild.firstChild.firstChild)
			},
			false);
		}
	}
}

unsafeWindow.console.log(window.getComputedStyle(document.body).getPropertyValue("background-color"))
var css='\
		#archiveQuoterWrapper{\
			position:fixed;\
			top:0px;\
			left:0px;\
			width:100%;\
			height:100%;\
			background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA9JREFUeNpiYGBgaAAIMAAAhQCB69VMmQAAAABJRU5ErkJggg==);\
		}\
		#archiveQuoterTextBox{\
			margin:100px auto;\
			padding:8px;\
			color:#000000;\
			width:800px;\
			padding:6px;\
		}\
		#aq_text{\
			background-color:#ffffff;\
			border:#000000 1px inset;\
			overflow-y:scroll;\
			height:600px;\
			padding:10px;\
		}\
		#aq_close{\
			text-align:center;\
		}\
	';
GM_addStyle(css);