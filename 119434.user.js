// ==UserScript==
// @name Firefox Embed Modify in ActiveX
// @namespace http://blog.windpr.tw
// @description Firefox Embed Modify in ActiveX
// @include        http://*
// @include        https://*
// @include        file:///*
// @version 1.0.1
// ==/UserScript==


var XPFirst	= XPathResult.FIRST_ORDERED_NODE_TYPE;		// Constante que devuelve el primer elemento por XPath
var XPList	= XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;	// Constante que devuelve una lista de elementos por XPath
var XPIter	= XPathResult.UNORDERED_NODE_ITERATOR_TYPE;	// Constante que deuvelve un iterador de elementos por XPath
function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return xpres == XPFirst ? ret.singleNodeValue : ret;
}
function funcionPrincipal(e){
	function fun_objf(){
		var s4= find("//param[@name='ShowControl']", XPList);
		if(s4){
			for(var j=0;j<s4.snapshotLength;j++){
				var node2=s4.snapshotItem(j);
				var obj2=document.createElement('param');
					obj2.setAttribute('name', node2.getAttribute("name"));
					obj2.setAttribute('value', "1");
					obj2.innerHTML=node2.innerHTML;
				node2.parentNode.replaceChild(obj2, node2);
			}
		}
		var obj1=document.createElement('object');
			obj1.setAttribute('id', node1.id);
			obj1.setAttribute('type', 'application/x-itst-activex');
			obj1.setAttribute('clsid', '{'+c1+'}');
			obj1.setAttribute('codeBase', node1.codeBase);
			obj1.innerHTML=node1.innerHTML;

			obj1.setAttribute('width', window.innerWidth);
			obj1.setAttribute('height', window.innerHeight);
		s3.parentNode.replaceChild(obj1, s3);
	}
	function fun_obj(){
		var obj1=document.createElement('object');
			obj1.setAttribute('id', node1.id);
			obj1.setAttribute('type', 'application/x-itst-activex');
			obj1.setAttribute('clsid', '{'+c1+'}');
			obj1.setAttribute('codeBase', node1.codeBase);
			obj1.innerHTML=node1.innerHTML;

			obj1.setAttribute('width', node1.width);
			obj1.setAttribute('height', node1.height);
		node1.parentNode.replaceChild(obj1, node1);
	}


	var ocid = new Array();
		ocid.push(/d27cdb6e-ae6d-11cf-96b8-444553540000/i);			//ShockwaveFlash
		ocid.push(/6BF52A52-394A-11D3-B153-00C04F79FAA6/i);		//Windows Media Player 7,9,10
		ocid.push(/22D6F312-B0F6-11D0-94AB-0080C74C7E95/i);		//Windows Media Player 6.4
		ocid.push(/05589FA1-C356-11CE-BF01-00AA0055595A/i);		//Windows Media Player 6 (Older Version)

		ocid.push(/D719897A-B07A-4C0C-AEA9-9B663A28DFCB/i);	//iTunesDetectorIE
		ocid.push(/3050f819-98b5-11cf-bb82-00aa00bdce0b/i);			//dlgHelper
		ocid.push(/2D360201-FFF5-11d1-8D03-00A0C959BC0A/i);		//DHTML Edit Control

	var otype = new Array();
		otype.push(/application\/x-shockwave-flash/i);	//ShockwaveFlash
		otype.push(/application\/futuresplash/i);			//ShockwaveFlash
		otype.push(/application\/x-ms-wmp/i);			//Windows Media Player
		otype.push(/application\/x-mplayer2/i);			//Windows Media Player
		otype.push(/application\/asx/i);					//Windows Media Player
		otype.push(/video\/x-ms-asf-plugin/i);			//Windows Media Player
		otype.push(/video\/x-ms-asf/i);					//Windows Media Player
		otype.push(/video\/x-ms-wm/i);					//Windows Media Player
		otype.push(/video\/x-ms-wmv/i);				//Windows Media Player
		otype.push(/video\/x-ms-wvx/i);					//Windows Media Player
		otype.push(/audio\/x-ms-wma/i);				//Windows Media Player
		otype.push(/audio\/x-ms-wax/i);					//Windows Media Player

		otype.push(/application\/x-itst-activex/i);				//ActiveX hosting plugin for NPAPI
		otype.push(/text\/javascript/i);							//JavaScript
		otype.push(/application\/java-deployment-toolkit/i);	//Java Deployment Toolkit

	var ocidf = new Array();
		ocidf.push("5EC7C511-CD0F-42E6-830C-1BD9882F3458");		//PPStream
		ocidf.push("EF0D1A14-1033-41A2-A589-240C01EDC078");		//PPLive Lite Class
		ocidf.push("F3D0D36F-23F8-4682-A195-74C92B03D4AF");		//QvodInsert

	var otypef = new Array();
		otypef.push(/application\/qvod-plugin/i);			//QvodInsert

	var s2 = find("//object", XPList);					// find("//object[contains(@classid, ocid[j])]", XPList);
	var s3 = find("//body", XPFirst);
	for(var i=0;i<s2.snapshotLength;i++){
		var node1=s2.snapshotItem(i);
		var m1=1;
		var m2=0;
		var clsid		=node1.getAttribute("classid");	// node1.parentNode.innerHTML.search(/clsid:(.*)\" /i);clsid=RegExp.$1;
		var mimetype	=node1.getAttribute("type");	// node1.parentNode.innerHTML.search(/type=\"(.*)\" /i);mimetype=RegExp.$1;

		if(clsid=="" && mimetype==""){m1=0;}
		else{
			if(clsid)		{for(var j=0;j<ocid.length;j++)	{if(clsid.search(ocid[j])>-1){m1=0;};}}
			if(mimetype)	{for(var j=0;j<otype.length;j++)	{if(mimetype.search(otype[j])>-1){m1=0;};}}
		}
		if(clsid)		{for(var j=0;j<ocidf.length;j++)	{if(clsid.search(ocidf[j])>-1){m2=1;};}}
		if(mimetype)	{for(var j=0;j<otypef.length;j++)	{if(mimetype.search(otypef[j])>-1){m2=1;};}}
		if(m1==1){
			c1=node1.getAttribute("classid").split(':')[1];
			if(m2==1){
				if(confirm("此網頁中有IE專用屬性之OBJECT元件\n　　("+c1+")\n\n目前將修改為 Firefox 相容格式\n\n\n並且您是否希望能延展到全畫面？")){
					fun_objf();
				}
				else{fun_obj();}
			}
			else{fun_obj();}
		}
	}
};


window.addEventListener('DOMContentLoaded', funcionPrincipal, true);
