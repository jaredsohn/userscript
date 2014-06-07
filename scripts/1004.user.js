// Displays a box in Gmail with your Bloglines feeds 
// version 0.2.1
// 2005-12-22
// Copyright (c) 2005, Martin Sarsale - martin@malditainternet.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// ==UserScript==
// @name          Bloglines+Gmail
// @namespace     http://martin.malditainternet.com/greasemonkey/gmail+bloglines/
// @include       https://gmail.google.com/*
// @include       http://gmail.google.com/* 
// @include       http://mail.google.com/* 
// @include       https://mail.google.com/* 
// @include       http://gmail.google.com/gmail?logout&hl=en 
// @include	  https://www.google.com/accounts/ServiceLogin?service=mail*
// @exclude       
// @description	 Displays a box in Gmail with your Bloglines feeds 
// ==/UserScript==

(function(){
	var __items={};
	// called after getting the subscription data
	function cache_gotsubs(e){
		GM_setValue('subs',e['responseText']);
		GM_setValue('subs_updated',Date.parse(Date())/1000)
		//GM_log/gci('getting data, subs_updated set to '+GM_getValue('subs_updated',0));
		gotsubs(e);
	}
	//return (cached) subs XML or false if the cache is not valid
	function getcachedsubs(){
		var v=GM_getValue('subs',null);
		if (v){
			updated=GM_getValue('subs_updated',0);
			d=Date.parse(Date())/1000;
			if ((d - updated) > 300){
				//GM_log/gci('cache expired: '+(d - updated)+"("+d+" - "+updated+")");
				return false;
			}else{
				return v;
			}
		}
		return false;
	}
	//process the cached subs or requests them to bloglines
	function getsubs(){
		v=getcachedsubs();
		if (v){
			gotsubs(v); 
			return true;
		}
		_getsubs();
	}
	//triggers an XMLHTTPRequest to bloglines
	function _getsubs(){
		GM_xmlhttpRequest({'method':'GET','url':"http://rpc.bloglines.com/listsubs",'onload':cache_gotsubs});
	}
	//Parses the bloglines response
	function parsesubs(r){
		parser=new new XPCNativeWrapper(window, "DOMParser").DOMParser();
		dom=parser.parseFromString(r,'text/xml');
		outlines=dom.getElementsByTagName('outline');
		subs=new Array();
		for(i=0; i<outlines.length; i++){
			if (outlines[i].getAttribute('type') != undefined ){
				d={ 'title':outlines[i].getAttribute('title'), 'htmlUrl':outlines[i].getAttribute('htmlUrl'), 'type':outlines[i].getAttribute('type'), 'xmlUrl':outlines[i].getAttribute('xmlUrl'), 'BloglinesSubId':outlines[i].getAttribute('BloglinesSubId'), 'BloglinesUnread':outlines[i].getAttribute('BloglinesUnread') };
				subs[subs.length]=d;
			}
		}
		return subs;
	}
	//receives the XMLHTTPRequest response, parses the data and generates the HTML
	function gotsubs(response){
		if (typeof(response)=='object'){
			data=response['responseText'];
		}else{
			data=response;
		}
		r=parsesubs(data);
		r.sort(function(a,b){return b['BloglinesUnread'] - a['BloglinesUnread']});
		addsubhtml_init();
		for(i=0; i<r.length; i++){
			addsubhtml(r[i]);		
		}
		addsubhtml_end();
	}
	//Called after adding all elements to the HTML. sets the new cache
	function addsubhtml_end(){
		ul=document.getElementById('bloglines_subs');
		if (ul){
			GM_setValue('subs_cached_html',ul.innerHTML);
		}
	}
	// creates a HTML button with a string
	function createbutton(str){
			a=document.createElement('div');
			a.appendChild(document.createTextNode(str))
			a.style.backgroundColor='#dddddd';
			a.style.borderStyle='outset';
			a.style.borderColor='#eeeeee';
			a.style.borderWidth='2px';
			a.style.width='10px';
			a.style.height='10px';
			a.style.lineHeight='10px';
			a.style.verticalAlign='middle';
			a.style.textAlign='center';
			a.style.fontSize='x-small';
			a.style.fontWeight='bold';
			a.style.position='absolute';
			a.style.top='0px';
			a.style.right='0px';
			return a;
	}
	// Cleans the bloglines HTML box and creates the reload button
	function addsubhtml_init(){
		ul=document.getElementById('bloglines_subs');
		ul.innerHTML='';
		if (!document.getElementById('bloglines_reload')){
			a=createbutton('R');
			a.addEventListener('click',_getsubs,false);
			a.id='bloglines_reload';
			ul.parentNode.appendChild(a);
		}

	}
	//called for each subscription
	function addsubhtml(d){
		ul=document.getElementById('bloglines_subs');
		li=document.createElement('li');
		li.className='nl';
		li.style.padding='0px';
		li.style.margin='0px';
		li.style.width='100%';
		li.style.overflow='hidden';
		
		a=document.createElement('a');
		a.id=d['BloglinesSubId'];
		a.href='http://www.bloglines.com/myblogs_display?sub='+d['BloglinesSubId']+'&site=0';
		a.addEventListener('click',function(){setTimeout(_getsubs,1000); return true},false);
		a.target='_blank';
		txt=d['title']
		a.style.fontSize='x-small';
		if (d['BloglinesUnread']>0){
			a.style.fontWeight='bold';
			a.title=d['BloglinesUnread']+" unread";
		}
		a.appendChild(document.createTextNode(txt));
		li.appendChild(a);
		ul.appendChild(li);
	}
	// not used yet, gets a specific sub info. Triggers XMLHTTPRequest
	function getsub(e){
		id=e.target.id;
		GM_xmlhttpRequest({'method':'GET','url':"http://rpc.bloglines.com/getitems?n=0&s="+id,'onload':gotsub});

	}
	// not used, 
	function gotsub(r){
		var d=parsesub(r['responseText']);
		for(var i=0; i<d.length; i++){
			item=d[i];
			__items[getText(item.getElementsByTagName('guid')[0])]=item;
		}
		for(i=0; i<d.length; i++){
			item=d[i];
			displaysubhtml(item);
		}
	}
	// not used
	function displaysubhtml(item){
		li=document.createElement('li');
		b=document.getElementById('items');
		
		a=document.createElement('a');
		a.id=getText(item.getElementsByTagName('guid')[0]);
		a.addEventListener('click',displayitem,false);
		a.appendChild(document.createTextNode(getText(item.getElementsByTagName('title')[0])));
		li.appendChild(a);
		b.appendChild(li);
	}
	// not used
	function displayitem(e){
		id=e.target.id;
		var item=__items[id];
		displayitemhtml(item);
	}
	// not used
	function displayitemhtml(item){
		i=document.getElementById('item');
		i.innerHTML=getText(item.getElementsByTagName('description')[0]);
	}
	function getText(e){
		nodes=e.childNodes;
		for (var i=0; i<nodes.length; i++){
			if (nodes[i].nodeValue != null){
				return nodes[i].nodeValue;
			}
		}
	}
	function parsesub(r){
		parser=new DOMParser();
		dom=parser.parseFromString(r,'text/xml');
		r=dom.getElementsByTagName('item');
		return r;
	}
	// checks if our bloglines box is present in the HTML. if not, it calls inithtml and getsubs
	function checkifpresenthtml(){
		d=document.getElementById('nt_9');
		if (!d){
			inithtml();
			getsubs();
		}
	}
	// not used
	function switch_labels(){
		for(i=0; i<window.labels_readed.length; i++){
			label=window.labels_readed[i];
			if (label.style.display != 'none'){
				label.style.display='none';
			}else{
				label.style.display='block';
			}
		}
	}
	// Creates the new bloglines box, cleans up the cache, hides the invites box
	function inithtml(){
		bar=document.getElementById('nav');
		if (bar){
			document.styleSheets[0].insertRule('ul#bloglines_subs>li>a{text-decoration:none}',document.styleSheets[0].length);


			v=getcachedsubs();
			if (v){
				data=GM_getValue('subs_cached_html','');
			}else{
				data='';
			}
			
			// hide invite box
			invite=document.getElementById('nb_1');
			if (invite){ invite.style.display='none'; }
			//Some people complained about this, so, Im not hiding spam, all, trash labels and the compose button
			//document.getElementById('ds_spam').parentNode.style.display='none';
			//document.getElementById('ds_all').parentNode.style.display='none';
			//document.getElementById('ds_trash').parentNode.style.display='none';
			//document.getElementById('comp').parentNode.style.display='none';
			
			div=document.createElement('div');
			div.style.paddingTop='0px';
			div.id='nb_9';
			html="<div style='width: 95%;padding:0px;position:relative'><table width='100%' style='margin-top:0px;' cellspacing='0' cellpadding='0' bgcolor='#c3d9ff'> <tbody> <tr height='2'> <td class='tl'> </td> <td class='tr'> </td> </tr> </tbody> </table> <div style='padding: 0pt 3px 1px; background: rgb(195, 217, 255) none repeat scroll 0%; -moz-background-clip: initial; -moz-background-origin: initial; -moz-background-inline-policy: initial;'> <div id='nt_9' class='s h'> <table cellspacing='0' cellpadding='0'> <tbody> <tr> <td style='vertical-align: top;' class='s h'> <img width='11' height='11' src='/gmail/images/opentriangle.gif' /> </td> <td class='s'> Bloglines</td></tr></tbody> </table> </div> <table cellspacing='2' class='nb'> <tbody> <tr> <td><ul id='bloglines_subs' style='width:100%; margin:0px; padding:0px; list-style-type:none'>"+data+"</ul></td> </tr> </tbody> </table> </div> <table width='100%' cellspacing='0' cellpadding='0' bgcolor='#c3d9ff'> <tbody> <tr height='2'> <td class='bl'> </td> <td class='br'> </td> </tr> </tbody> </table></div>";
			div.innerHTML=html;
			bar.appendChild(div);
			return true;
		}
		return false;
	}
	function init(){
		return inithtml();
	}
	if (window.location.href=='http://gmail.google.com/gmail?logout&hl=en' || window.location.href.substr(0,57) == 'https://www.google.com/accounts/ServiceLogin?service=mail' ){
		//GM_log/gci('logout');
		GM_setValue('subs',null);
		GM_setValue('subs_update',null);
		GM_setValue('subs_cached_html',null);
	}else{
		if(init()){
			getsubs();
			setInterval(checkifpresenthtml,1000);
		}
	}
})()
