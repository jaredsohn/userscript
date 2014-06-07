// ==UserScript==
// @name           Fark
// @namespace      edfwefwewrg
// @description    minimalize Fark.com
// @include        http://www.fark.com/
// @include        http://www.foobies.com/
// ==/UserScript==

function nukeTopicImages(){
	var imgs=document.getElementsByTagName('img');
	for (var i = 0; i < imgs.length; i++){
		if(imgs[i] && 
			(imgs[i].getAttribute("height")=="11" || 
				(
					imgs[i].parentNode 
					&& imgs[i].parentNode.hasAttribute("target") 
					&& imgs[i].parentNode.getAttribute("target")=="_blank"
				)
			)
			){
			var newspan=document.createElement('span');
			newspan.style.fontSize='x-small';
			newspan.style.textTransform='uppercase';
			var text=document.createTextNode(imgs[i].getAttribute('alt'));
			newspan.appendChild(text);
			imgs[i].parentNode.replaceChild(newspan,imgs[i].parentNode.firstChild);
		}
	}
}

function resizeCounts(){
	var tds=document.getElementsByTagName('td');
	for(var i = 0; i < tds.length; i++){
		tds[i].style.textAlign="left";
		if(tds[i] && tds[i].hasChildNodes && (tds[i].getAttribute('width')=="80")){
			tds[i].style.textAlign="right";
			var link=tds[i].firstChild;
			link.setAttribute('onmouseover','this.style.textDecoration="none";');
			var c=link.innerHTML.match(/\(([0-9]+)\)/);
			if(c){
				c=c[1];
				var rs=Math.min(64,Math.floor(c/10)+10);
				link.style.fontSize=String.concat(rs,'px');
				link.innerHTML=c;
			}else{
				link.style.color="red";
				link.style.fontSize='64px';
				link.innerHTML="&raquo;";
			}
		}
	}
}

function unFilter(){
	var body=document.getElementsByTagName('body')[0];
	body.style.backgroundColor="white";
	var content=body.innerHTML;
	content=content.replace(/biatch/gi,'bitch');
	content=content.replace(/shiat/gi,'shit');
	body.innerHTML=content;
}

function zebra(){
	var trs=document.getElementsByTagName('tr');
	var oe=0; 
	for(var i=0; i < trs.length; i++){
		oe=1-oe;
		if(oe==1){
			trs[i].style.backgroundColor='#dde';
		}
	}
}

function linkTitles(){
	var as=document.getElementsByTagName('a');
	for(var i = 0; i< as.length; i++){
		if(as[i] && as[i].hasAttribute('href') && as[i].getAttribute('href').match(/ordershirt/)){
			as[i].parentNode.removeChild(as[i]);
		}else
		if(as[i] && as[i].hasAttribute('target') && as[i].getAttribute('target')=='_blank'){
			as[i].setAttribute('href',
				unescape(
					as[i]
						.getAttribute('href')
						.replace(
							/^http:\/\/go\.fark\.com.*?l=/
							,''
							,as[i].getAttribute('href')
						)
				)
			);
			var titletd=as[i].parentNode;
			if(titletd.nextSibling){
				titletd=titletd.nextSibling;
				if(titletd.nextSibling){
					titletd=titletd.nextSibling;
					var content=titletd.innerHTML;
					content=String.concat('<a href="',as[i].getAttribute('href'),'" target="_blank">',content,'</a>');
					titletd.innerHTML=content;
				}
			}
		}
	}
}

function customize(){
	if(document.location.href.indexOf('www.fark')>0){
		resizeCounts();
	}
	unFilter();
	var bhc=document.getElementById('bodyHeadlineContainer');
	bhc.style.width="100%";
	bhc.style.backgroundImage="none";
	bhc.style.border="none";
	document.getElementById('bodyRightSideContainer').style.display="none";
	document.getElementById('headerTop').style.display="none";
	document.getElementById('topSearch').style.display="none";
	document.getElementById('footer').style.display="none";
	document.getElementById('topMenu').style.backgroundColor="#ccc";
	document.getElementById('topMenu').style.border="none";
	document.getElementById('bodyTabNotNews').style.backgroundColor="#ccc";
	document.getElementById('bodyTabSports').style.backgroundColor="#ccc";
	document.getElementById('bodyTabBusiness').style.backgroundColor="#ccc";
	document.getElementById('bodyTabGeek').style.backgroundColor="#ccc";
	document.getElementById('bodyTabShowbiz').style.backgroundColor="#ccc";
	document.getElementById('bodyTabPolitics').style.backgroundColor="#ccc";
	document.getElementById('bodyTabMusic').style.backgroundColor="#ccc";
	document.getElementById('bodyTabVideo').style.backgroundColor="#ccc";
	document.getElementById('bodyTabAll').style.backgroundColor="#ccc";
	zebra();
	for(var i = 0; i < 8; i++){ //not doing this makes it skip a bunch...	
		nukeTopicImages();
	}
	linkTitles();
}

window.addEventListener('load',customize,true);
// ==UserScript==
// @name           Fark
// @namespace      edfwefwewrg
// @description    minimalize Fark.com
// @include        http://www.fark.com/
// ==/UserScript==

function nukeTopicImages(){
	var imgs=document.getElementsByTagName('img');
	for (var i = 0; i < imgs.length; i++){
		if(imgs[i] && 
			(imgs[i].getAttribute("height")=="11" || 
				(
					imgs[i].parentNode 
					&& imgs[i].parentNode.hasAttribute("target") 
					&& imgs[i].parentNode.getAttribute("target")=="_blank"
				)
			)
			){
			var newspan=document.createElement('span');
			newspan.style.fontSize='x-small';
			newspan.style.textTransform='uppercase';
			var text=document.createTextNode(imgs[i].getAttribute('alt'));
			newspan.appendChild(text);
			imgs[i].parentNode.replaceChild(newspan,imgs[i].parentNode.firstChild);
		}
	}
}

function resizeCounts(){
	var tds=document.getElementsByTagName('td');
	for(var i = 0; i < tds.length; i++){
		tds[i].style.textAlign="left";
		if(tds[i] && tds[i].hasChildNodes && (tds[i].getAttribute('width')=="96")){
			tds[i].style.textAlign="right";
			var link=tds[i].firstChild;
			link.setAttribute('onmouseover','this.style.textDecoration="none";');
			var c=link.innerHTML.match(/\(([0-9]+)\)/);
			if(c){
				c=c[1];
				var rs=Math.min(64,Math.floor(c/10)+10);
				link.style.fontSize=String.concat(rs,'px');
				link.innerHTML=c;
			}else{
				link.style.color="red";
				link.style.fontSize='64px';
				link.innerHTML="&raquo;";
			}
		}
	}
}

function unFilter(){
	var body=document.getElementsByTagName('body')[0];
	body.style.backgroundColor="white";
	var content=body.innerHTML;
	content=content.replace(/biatch/gi,'bitch');
	content=content.replace(/shiat/gi,'shit');
	body.innerHTML=content;
}

function zebra(){
	var trs=document.getElementsByTagName('tr');
	var oe=0; 
	for(var i=0; i < trs.length; i++){
		oe=1-oe;
		if(oe==1){
			trs[i].style.backgroundColor='#dde';
		}
	}
}

function linkTitles(){
	var as=document.getElementsByTagName('a');
	for(var i = 0; i< as.length; i++){
		if(as[i] && as[i].hasAttribute('href') && as[i].getAttribute('href').match(/ordershirt/)){
			as[i].parentNode.removeChild(as[i]);
		}else
		if(as[i] && as[i].hasAttribute('target') && as[i].getAttribute('target')=='_blank'){
			as[i].setAttribute('href',
				unescape(
					as[i]
						.getAttribute('href')
						.replace(
							/^http:\/\/go\.fark\.com.*?l=/
							,''
							,as[i].getAttribute('href')
						)
				)
			);
			var titletd=as[i].parentNode;
			if(titletd.nextSibling){
				titletd=titletd.nextSibling;
				if(titletd.nextSibling){
					titletd=titletd.nextSibling;
					var content=titletd.innerHTML;
					content=String.concat('<a href="',as[i].getAttribute('href'),'" target="_blank">',content,'</a>');
					titletd.innerHTML=content;
				}
			}
		}
	}
}

function customize(){
	if(document.location.href.indexOf('www.fark')>0){
		resizeCounts();
	}
	unFilter();
	var bhc=document.getElementById('bodyHeadlineContainer');
	bhc.style.width="100%";
	bhc.style.backgroundImage="none";
	bhc.style.border="none";
	document.getElementById('bodyRightSideContainer').style.display="none";
	document.getElementById('headerTop').style.display="none";
	document.getElementById('topSearch').style.display="none";
	document.getElementById('footer').style.display="none";
	document.getElementById('topMenu').style.backgroundColor="#ccc";
	document.getElementById('topMenu').style.border="none";
	document.getElementById('bodyTabNotNews').style.backgroundColor="#ccc";
	document.getElementById('bodyTabSports').style.backgroundColor="#ccc";
	document.getElementById('bodyTabBusiness').style.backgroundColor="#ccc";
	document.getElementById('bodyTabGeek').style.backgroundColor="#ccc";
	document.getElementById('bodyTabShowbiz').style.backgroundColor="#ccc";
	document.getElementById('bodyTabPolitics').style.backgroundColor="#ccc";
	document.getElementById('bodyTabMusic').style.backgroundColor="#ccc";
	document.getElementById('bodyTabVideo').style.backgroundColor="#ccc";
	document.getElementById('bodyTabAll').style.backgroundColor="#ccc";
	zebra();
	for(var i = 0; i < 8; i++){ //not doing this makes it skip a bunch...	
		nukeTopicImages();
	}
	linkTitles();
}

window.addEventListener('load',customize,true);