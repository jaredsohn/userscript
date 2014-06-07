// ==UserScript==
// @name           SBM Count With Google
// @namespace      http://white.s151.xrea.com/
// @description    show SBM count in Google search result
// @include        http://www.google.*/*q=*
// ==/UserScript==

(function (){

	var version = "2007.06.02";
	var author  = "shiro";

	var launch = function(){
		hatena();
		livedoor();
		buzzurl();
//		delicious();
	}

	// --------------------------------------------------------------
	// MD5
	// http://www.onicos.com/staff/iz/amuse/javascript/expert/md5.txt
	// --------------------------------------------------------------
	/* md5.js - MD5 Message-Digest
	 * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
	 * Version: 2.0.0
	 * LastModified: May 13 2002
	 *
	 * This program is free software.  You can redistribute it and/or modify
	 * it without any warranty.  This library calculates the MD5 based on RFC1321.
	 * See RFC1321 for more information and algorism.
	 */
	var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391);
	var MD5_round1 = new Array(new Array( 0, 7, 1), new Array( 1,12, 2), new Array( 2,17, 3), new Array( 3,22, 4), new Array( 4, 7, 5), new Array( 5,12, 6), new Array( 6,17, 7), new Array( 7,22, 8), new Array( 8, 7, 9), new Array( 9,12,10), new Array(10,17,11), new Array(11,22,12), new Array(12, 7,13), new Array(13,12,14), new Array(14,17,15), new Array(15,22,16));
	var MD5_round2 = new Array(new Array( 1, 5,17), new Array( 6, 9,18), new Array(11,14,19), new Array( 0,20,20), new Array( 5, 5,21), new Array(10, 9,22), new Array(15,14,23), new Array( 4,20,24), new Array( 9, 5,25), new Array(14, 9,26), new Array( 3,14,27), new Array( 8,20,28), new Array(13, 5,29), new Array( 2, 9,30), new Array( 7,14,31), new Array(12,20,32));
	var MD5_round3 = new Array(new Array( 5, 4,33), new Array( 8,11,34), new Array(11,16,35), new Array(14,23,36), new Array( 1, 4,37), new Array( 4,11,38), new Array( 7,16,39), new Array(10,23,40), new Array(13, 4,41), new Array( 0,11,42), new Array( 3,16,43), new Array( 6,23,44), new Array( 9, 4,45), new Array(12,11,46), new Array(15,16,47), new Array( 2,23,48));
	var MD5_round4 = new Array(new Array( 0, 6,49), new Array( 7,10,50), new Array(14,15,51), new Array( 5,21,52), new Array(12, 6,53), new Array( 3,10,54), new Array(10,15,55), new Array( 1,21,56), new Array( 8, 6,57), new Array(15,10,58), new Array( 6,15,59), new Array(13,21,60), new Array( 4, 6,61), new Array(11,10,62), new Array( 2,15,63), new Array( 9,21,64));
	function MD5_F(x,y,z){return (x&y)|(~x&z);}
	function MD5_G(x,y,z){return (x&z)|(y&~z);}
	function MD5_H(x,y,z){return x^y^z;}
	function MD5_I(x,y,z){return y^(x|~z);}
	var MD5_round=new Array(new Array(MD5_F, MD5_round1), new Array(MD5_G, MD5_round2), new Array(MD5_H, MD5_round3), new Array(MD5_I, MD5_round4));
	function MD5_pack(n32){return String.fromCharCode(n32 & 0xff)+String.fromCharCode((n32>>>8)&0xff)+String.fromCharCode((n32>>>16)&0xff)+String.fromCharCode((n32>>>24)&0xff);}
	function MD5_unpack(s4){return s4.charCodeAt(0)|(s4.charCodeAt(1)<<8)|(s4.charCodeAt(2)<<16)|(s4.charCodeAt(3)<<24);}
	function MD5_number(n){while(n<0)n+=4294967296;while(n>4294967295)n-=4294967296;return n;}
	function MD5_apply_round(x,s,f,abcd,r){var a,b,c,d;var kk,ss,ii;var t,u;a=abcd[0];b=abcd[1];c=abcd[2];d=abcd[3];kk=r[0];ss=r[1];ii=r[2];u=f(s[b],s[c],s[d]);t=s[a]+u+x[kk]+MD5_T[ii];t=MD5_number(t);t=((t<<ss)|(t>>>(32-ss)));t+=s[b];s[a]=MD5_number(t);}
	function MD5_hash(data){var abcd,x,state,s;var len,index,padLen,f,r;var i,j,k;var tmp;state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);len=data.length;index=len&0x3f;padLen=(index<56)?(56-index):(120-index);if(padLen>0){data+="\x80";for(i=0;i<padLen-1;i++)data+="\x00";}data+=MD5_pack(len*8);data+=MD5_pack(0);len+=padLen+8;abcd=new Array(0,1,2,3);x=new Array(16);s=new Array(4);for(k=0;k<len;k+=64){for(i=0,j=k;i<16;i++,j+=4){x[i] = data.charCodeAt(j)|(data.charCodeAt(j+1)<<8)|(data.charCodeAt(j+2)<<16)|(data.charCodeAt(j+3)<<24);}for(i=0;i<4;i++)s[i]=state[i];for(i=0;i<4;i++){f=MD5_round[i][0];r=MD5_round[i][1];for(j=0;j<16;j++){MD5_apply_round(x,s,f,abcd,r[j]);tmp=abcd[0];abcd[0]=abcd[3];abcd[3]=abcd[2];abcd[2]=abcd[1];abcd[1]=tmp;}}for(i=0;i<4;i++){state[i]+=s[i];state[i]=MD5_number(state[i]);}}return MD5_pack(state[0])+MD5_pack(state[1])+MD5_pack(state[2])+MD5_pack(state[3]);}
	function MD5_hexhash(data){var i,out,c;var bit128;bit128=MD5_hash(data);out="";for(i=0;i<16;i++){c=bit128.charCodeAt(i);out+="0123456789abcdef".charAt((c>>4) & 0xf);out+="0123456789abcdef".charAt(c & 0xf);}return out;}


	var XPATH = "//a[@class='l']";

	String.prototype.htmlescape = function() {
		return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	}

	function forEachMatch(xpath, cb, class){
		var matches = document.evaluate(
			xpath, document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0; i<matches.snapshotLength; i++){
			var link=matches.snapshotItem(i);
			var test=class+"_loaded['"+link.href+"']";
			if(!eval(test)){
				eval(test+"=true");
				cb(link);
			}
		}
	}

	function setBookmarkCount(link, count, href, icon, class){
		var container = document.createElement("span");
		container.setAttribute("class", class);
		var a = document.createElement("a");
		a.setAttribute("href", href);
		if(count==0){
			a.appendChild(document.createTextNode(" "));
		}else{
			a.appendChild(document.createTextNode(""+count+" user"+(count>1?"s":"")));
			
			var img = document.createElement("img");
			img.setAttribute("src", icon);
			container.appendChild(img);
		}
		with(a.style){
			fontSize = "0.9em";
			textDecoration = "none";
			if (count >= 5) {
				fontWeight = "bold";
				backgroundColor = "#fff0f0";
				color = "#f66";
			}
			if (count >= 10) {
				backgroundColor = "#ffcccc";
				color = "red";
			}
		}
		container.appendChild(a);
		link.parentNode.insertBefore(container, link.nextSibling);
		link.parentNode.insertBefore(document.createTextNode(" "), link.nextSibling);
	}

	// hatena
	var hatena_icon = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM5BGP9aJBD/WiQQ/1okEP9aJBD/WiQQ/1okEP9aJBD/WiQQ/1okEP9aJBD/WiQQ/1okEP9aJBD/AAAAAAAAAADnmoT/zkEY/85BGP/OQRj/zkEY/85BGP/OQRj/zkEY/85BGP/OQRj/zkEY/85BGP/OQRj/WiQQ/wAAAAAAAAAA55qE/85BGP/OQRj/zkEY/85BGP/OQRj/zkEY/85BGP/OQRj/zkEY/85BGP/OQRj/zkEY/1okEP8AAAAAAAAAAOeahP/OQRj/zkEY/85BGP//poT//6aE//+mhP//poT//6aE//+mhP/OQRj/zkEY/85BGP9aJBD/AAAAAAAAAADnmoT/zkEY/85BGP/OQRj//6aE//+mhP/OQRj/zkEY/85BGP//poT//6aE/85BGP/OQRj/WiQQ/wAAAAAAAAAA55qE/85BGP/OQRj/zkEY//+mhP//poT/zkEY/85BGP/OQRj//6aE//+mhP/OQRj/zkEY/1okEP8AAAAAAAAAAOeahP/OQRj/zkEY/85BGP//poT//6aE/85BGP/OQRj/zkEY//+mhP//poT/zkEY/85BGP9aJBD/AAAAAAAAAADnmoT/zkEY/85BGP/OQRj//6aE//+mhP//poT//6aE//+mhP//poT/zkEY/85BGP/OQRj/WiQQ/wAAAAAAAAAA55qE/85BGP/OQRj/zkEY//+mhP//poT/zkEY/85BGP//poT//6aE/85BGP/OQRj/zkEY/1okEP8AAAAAAAAAAOeahP/OQRj/zkEY/85BGP//poT//6aE/85BGP/OQRj//6aE//+mhP/OQRj/zkEY/85BGP9aJBD/AAAAAAAAAADnmoT/zkEY/85BGP/OQRj//6aE//+mhP//poT//6aE//+mhP/OQRj/zkEY/85BGP/OQRj/WiQQ/wAAAAAAAAAA55qE/85BGP/OQRj/zkEY/85BGP/OQRj/zkEY/85BGP/OQRj/zkEY/85BGP/OQRj/zkEY/1okEP8AAAAAAAAAAOeahP/OQRj/zkEY/85BGP/OQRj/zkEY/85BGP/OQRj/zkEY/85BGP/OQRj/zkEY/85BGP9aJBD/AAAAAAAAAADnmoT/55qE/+eahP/nmoT/55qE/+eahP/nmoT/55qE/+eahP/nmoT/55qE/+eahP/nmoT/zkEY/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAA//8AAA==';
	var hatena_loaded = {};
	var hatena = function() {
		function callXmlrpc(requestbody, url2link) {
			const endpoint = "http://b.hatena.ne.jp/xmlrpc";
			function onload(response) {
				var pattern = /<name>([^<]+)<\/name>\s*<value><int>(\d+)/g;
				var m;
				while (m = pattern.exec(response.responseText)) {
					var link = url2link[m[1]];
					if(link) setBookmarkCount(link, m[2], "http://b.hatena.ne.jp/entry/"+link.href, hatena_icon, "hatena");
				}
			}
			GM_xmlhttpRequest({method: "POST", url: endpoint, data: requestbody, onload: onload});
		}
		var request = '<?xml version="1.0"?>\n<methodCall>\n<methodName>bookmark.getCount</methodName>\n<params>\n';
		var url2link = new Array();
		var cb = function(link){
			request += "<param><value><string>"+link.href.htmlescape()+"</string></value></param>\n";
			url2link[link.href] = link;
		}
		forEachMatch(XPATH, cb, "hatena");
		request += "</params>\n</methodCall>\n";
		callXmlrpc(request, url2link);
	}

	// livedoor
	var livedoor_icon = 'data:image/x-icon;base64,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Qv/CXAb/24YI/8NmBP+ral//9u7h//jx5P/48eT/+PHk//jx5P/48eT/+PHk//jx5P/48eT/+PHk//jx5P/48eT/r5uQ/6+bkP/48ub/+PLm//jy5v/48ub/+PLm/+vczv/OhT7/zmkM/+SMBP+0VAj/wpaN//jy5v/48ub/8OPN/+6xNv/BWwn/4I8I/8FlBf+1fXP/+PLm//jy5v/48ub/+PLm//jy5v/48ub/+PLm//jy5v/48ub/+PLm//jy5v+vm5D/r5uQ//n06f/59On/+fTp//n06f/59On/+fTp//Diyf/urTX/z2oH/+WSB/+uTwj/x56V//n06f/59On/8+XK/++vL//CYQr/5JYF/8BpFf/KoZn/+fTp//n06f/59On/+fTp//n06f/59On/+fTp//n06f/59On/+fTp/6+bkP+vm5D/+vXs//r17P/69ez/+vXs//r17P/69ez/+vXs//Hhxv/upRv/0G8J/+iaCf+sTw3/zamh//r17P/69ez/9ubJ/+2pJP/BYQv/6aAH/7heDv/Jn5j/+vXs//r17P/69ez/+vXs//r17P/69ez/+vXs//r17P/69ez/r5uQ/6+bkP/79+//+/fv//v37//79+//+/fv//v37//79+//+/fv//LfvP/snhD/0nQK/+ibCP+nTBL/1bWu//v37//79+//9eK7/+2oHv/FaQz/6J8E/7FWE//QrKX/+/fv//v37//79+//+/fv//v37//79+//+/fv//v37/+vm5D/r5uQ//v48f/7+PH/+/jx//v48f/7+PH/+/jx//v48f/7+PH/+/jx//DbsP/rnQf/1HkK/+ecBf+lShb/17q0//v48f/7+PH/8Niy/+ihHf/agQ3/8KoD/6pMDP/Qrab/+/jx//v48f/7+PH/+/jx//v48f/7+PH/+/jx/6+bkP+vm5D//Pn0//z59P/8+fT//Pn0//z59P/8+fT//Pn0//z59P/8+fT//Pn0//TbqP/omAP/138J/+ecAv+kSx//4cvG//z59P/27un/xog+/+qhCv/ejxD/7akD/6RGEf/kz8v//Pn0//z59P/8+fT//Pn0//z59P/8+fT/r5uQ/6+bkP/9+vb//fr2//369v/9+vb//fr2//369v/9+vb//fr2//369v/9+vb//fr2//fbm//llwP/2ocJ/+SaAv+jTCn/5dDM/9Kvq/+HKBT/9LkB/9uSIv/pu2f/66gM/9afcf/8+fX//fr2//369v/9+vb//fr2//369v+vm5D/r5uQ//38+P/9/Pj//fz4//38+P/9/Pj//fz4//38+P/9/Pj//fz4//38+P/9/Pj//fz4//fYjP/hkAH/3o8K/+CVA/+PLRX/eRYY/6JCCP/8xAH/9MA9/+bGqf/Vpmn/7KkS/+Cyiv/8+vX//fz4//38+P/9/Pj//fz4/6+bkP+vm5D//v36//79+v/+/fr//v36//79+v/+/fr//v36//79+v/+/fr//v36//79+v/+/fr//vz4//jWff/gkAf/3I4M/+WeCf/OhCT/8cdq///mcv/3zV//9+zf/8ablf/fnAL/35IW/+zQtf/+/fr//v36//79+v/+/fr/r5uQ/6+bkP/+/vz//v78//7+/P/+/vz//v78//7+/P/+/vz//v78//7+/P/+/vz//v78//7+/P/+/vz//fz4//jVd//ZhAr/y34l//jchf//+9j/++e5//rr0P/+/vz/rHBy/8d9Bv/5vQ7/3qdv//7+/P/+/vz//v78//7+/P+vm5D/r5uQ///+/v///v7///7+///+/v///v7///7+///+/v///v7///7+///+/v///v7///7+///+/v///v7//fn1//nXff/Gbg7/vYJz//v29P///v7///7+/+DJx/9/ISD/0YYB///TH//rwID///7+///+/v///v7///7+/6+bkP+vm5D//////////////////////////////////////////////////////////////////////////////////fn0//nVdv+5XwP/mU5L/8qko/+4g4H/fyQk/5IvC//zsgD//9lH//TTl///////////////////////r5uQ/6+bkP///////////////////////////////////////////////////////////////////////////////////////PTq//jQa//CbhD/kisC/44rEf+mSxr/4ZgB///ZMP/30mv/+uvU//////////////////////+vm5D/r5uQ/////////////////////////////////////////////////////////////////////////////////////////////Pfx//zlpf/0yFz/8syC//3svf//8J///Oms//rpx////////////////////////////6+bkP+vm5D/////////////////////////////////////////////////////////////////////////////////////////////////////////9v////X///////79+f/+/fr/////////////////////////////////r5uQ/9zMxP+vm5D//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6+bkP/czMT/////F9zMxP+vm5D///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+vm5D/3MzE/wAAAAAAAAAAAAAAANzMxP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/9zMxP8AAAAAAAAAAMAAAAOAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAADKAAAABAAAAAgAAAAAQAgAAAAAABABAAAAAAAAAAAAAAAAAAAAAAAAPv48aevm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ//v48aevm5D/7+ja/+/o2v/v6Nr/7+ja/+/o2v/v6Nr/7+ja/+/o2v/v6Nr/7+ja/+/o2v/v6Nr/7+ja/+/o2v+vm5D/r5uQ//Ts2v/dw6n/0YhG/9J+Kv/Ok1r/4tnQ//Lr3P/y69z/8uvc//Lr3P/y69z/8uvc//Lr3P/y69z/r5uQ/6+bkP/07d7/zH0//9icHv+HgHj/rnI//82ERP/p287/8uvf//Lr3//y69//8uvf//Lr3//y69//8uvf/6+bkP+vm5D/9/Dh/8ZmIf+5oYL/7+rn/9jIu//NdCX/zH87/+nZyf/17uP/9e7j//Xu4//17uP/9e7j//Xu4/+vm5D/r5uQ//jy5f+weVr/zYc+/+/n3//q5N//zI9I/+KMHv/OgDj/6tbC//bx5//28ef/9vHn//fy5v/28ef/r5uQ/6+bkP/59On/+fTp/8B7SP/SikT/8Ofe/+Lf3f/Xo1z/5pgj/9KGOv/q07r/+PPr//jz6//48+v/+PPr/6+bkP+vm5D/+vbu//r27v/PnHT/6ZUY/9WNRv/x5tn/7+3r/+K5df/qpCz/1Yg4/+nOsf/59e//+vbu//n17/+vm5D/r5uQ//v48v/7+PL/+/jy/9ulYv/tohz/2JBF//Hj0v/39vX/68qP/+2yPv/blDv/6Mel//r48//6+PP/r5uQ/6+bkP/9+/b//fv2//379v/9+/b/5bl5//CqHf/blD//8d/L//v6+P/uwGn/7sJz/+KlVf/rza///fv2/6+bkP+vm5D//vz6//78+v/+/Pr//vz6//78+v/vyo//8bIj/92XPv/hr33/8sJb//DVt//46dH/3JZL//78+v+vm5D/r5uQ//7+/f/+/v3//v79//7+/f/+/v3//v79//PUoP/vszf/8MNv//XduP//////9eDD/+WlP//+/v3/r5uQ/6+bkP//////////////////////////////////////9dux/+Wva//w2b7/7tS4//HBW//uw4///////6+bkP+vm5D////////////////////////////////////////////34sP/78eD//rowf/56MX//Pfy//////+vm5D/r5uQ////////////////////////////////////////////////////////////////////////////r5uQ/////0yvm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/6+bkP+vm5D/r5uQ/////4EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
	var livedoor_loaded = {};
	var livedoor = function (){
		function callXmlrpc(requestbody, url2link) {
			const endpoint = "http://rpc.clip.livedoor.com/count";
			function onload(response) {
				var pattern = /<name>([^<]+)<\/name>\s*<value><int>(\d+)/g;
				var m;
				while (m = pattern.exec(response.responseText)) {
					var link = url2link[m[1]];
					if(link) setBookmarkCount(link, m[2], 'http://clip.livedoor.com/page/' + link.href, livedoor_icon, "livedoor");
				}
			}
			GM_xmlhttpRequest({method: "POST",
			  url: endpoint,
			  data: requestbody,
			  headers: {'Content-type': 'text/xml'},
			  onload: onload});
		}
		var request = '<?xml version="1.0"?>\n<methodCall>\n<methodName>clip.getCount</methodName>\n<params>\n';
		var url2link = new Array();
		var cb = function(link){
			request += "<param><value><string>"+link.href.htmlescape()+"</string></value></param>\n";
			url2link[link.href] = link;
		}
		forEachMatch(XPATH, cb, "livedoor");
		request += "</params>\n</methodCall>\n";
		callXmlrpc(request, url2link);
	}

	// buzzurl
	var buzzurl_icon = 'data:image/x-icon;base64,AAABAAIAICAAAAEAGACoDAAAJgAAABAQAAABABgAaAMAAM4MAAAoAAAAIAAAAEAAAAABABgAAAAAAIAMAAAAAAAAAAAAAAAAAAAAAAAAEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEPz/PTU3TISHIEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEMDDLtbXs////////////////////0tL0pqbpa2vaISHIEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEMDDL8PD7////////////////////xMTwxMTwxMTw0tL0////tbXsTU3TEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLETU3T////////////////enreISHIEhLEEhLEEhLEEhLEISHIiIjh8PD7xMTwMDDLEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLE8PD7////////l5flEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEPz/P8PD78PD7a2vaEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEpqbp////////XFzXEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLETU3T////////a2vaEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEMDDL////////pqbpEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLE8PD7////////TU3TEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLExMTw////////TU3TEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLExMTw////////4eH4EhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLETU3T////////0tL0EhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEISHI8PD7////////////EhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLExMTw////////enreEhLEEhLEEhLEEhLEEhLEEhLEISHIpqbp////////////8PD7EhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEa2va////////8PD7MDDLiIjhxMTwxMTwxMTw0tL0////////////////////a2vaEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLE4eH4////////tbXsTU3T////////////////////////////0tL0XFzXEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEa2va////////////TU3TPz/P0tL0////enreTU3TTU3TISHIEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLE4eH4////////0tL0EhLEEhLEiIjh////iIjhEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEa2va////////////a2vaEhLEEhLEa2va////xMTwISHIEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLE4eH4////////0tL0EhLEEhLEEhLEa2va////4eH4Pz/PEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEPz/PISHIEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEXFzX////////////Pz/PEhLEEhLEEhLExMTw////8PD7ISHIEhLEEhLEEhLEEhLEEhLEEhLEEhLEMDDL8PD70tL0MDDLEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEXFzX8PD7////l5flEhLEEhLEEhLEiIjh////////xMTwEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEMDDLxMTw////0tL0iIjhTU3TEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEMDDLxMTwenreEhLEEhLEISHI0tL0////////////MDDLEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLETU3TxMTw////////////xMTwl5fliIjhTU3TTU3TPz/PEhLEEhLEMDDLTU3TXFzXl5fl8PD7////////////////Pz/PEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLETU3TtbXs////////////////////////////////////////////////////////////////////0tL0EhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEMDDLiIjh4eH4////////////////////////////////////////////////////0tL0MDDLEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEPz/PenretbXs4eH4////////////////////////////0tL0enreEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEPz/PTU3TTU3TTU3TTU3TEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAEAAAACAAAAABABgAAAAAAEADAAAAAAAAAAAAAAAAAAAAAAAAEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEAADEAADEAADEAADECAjEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEAADEw8Pl////////////tbXempraAgLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEAADE////////AADIAADEAADEICDI2trhTU3TAADEEhLEEhLEEhLEEhLEEhLEEhLEAADE3d3pu7vpAADEBQXEEhLECgrEAADE////T0/XEhLEEhLEEhLEEhLEEhLEEhLEDAzEDg7L////KCjPAADEDAzEAADEAADE///////7EhLEEhLEEhLEEhLEEhLEEhLEEhLEAADE////////AADITU3TTU3TnZ3l////5+fwEhLEEhLEEhLEEhLEEhLEEhLEEhLEAgLETEzT////Y2Pa7Oz2////iIjha2vaAADEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEAADE///////7AADIa2vaenreAADEAADEEhLEEhLEEhLEEhLEERHEEhLEEhLEEhLEAADETEzT////a2vaAADEenre6envAADEEhLEEhLEEhLEPz/P///lTU3TAADEAADEAADEAADEKyvToKDlAADENzfX////a2vaEhLEEhLEEhLEEhLEAQHE4uLp////////4uLpiIjhiIjhiIjhpqbp///7////a2vaEhLEEhLEEhLEEhLEEhLECQnEAADETU3Tv7/l////////////////////iIjhAADEEhLEEhLEEhLEEhLEEhLEEhLEEhLECgrEAADEAADEAADEAADEAADEAADEAADEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEEhLEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
	var buzzurl_loaded = {};
	var buzzurl = function(){
		var call = function(hash){
			var onload = function(response){
				var res = eval(response.responseText);
				if(!res) return;
				for(var j=0; j<res.length; j++){
					var count = res[j]["users"];
					if(count){
						var link=hash[res[j]["url"]];
						setBookmarkCount(link, count, 'http://buzzurl.jp/entry/' + link.href, buzzurl_icon, "buzzurl");
						hash[res[j]["url"]] = false;
					}
				}
				for(var url in hash){
					if(hash[url]){
						setBookmarkCount(hash[url], 0, 'http://buzzurl.jp/entry/' + url, buzzurl_icon, "buzzurl");
					}
				}
			}
			var list=new Array();
			for(var key in hash) list.push(encodeURIComponent(key));
			if(list.length > 30) list=list.slice(0,30); // adhoc
			GM_xmlhttpRequest({
			  method: "GET",
			  url: 'http://api.buzzurl.jp/api/counter/v1/json?url=' + list.join("&url="),
			  onload: onload});
		}
		var hash = {};
		forEachMatch(XPATH, function(link) {
			hash[link.href] = link;
		}, "buzzurl");
		call(hash);
	}

	// del.icio.us
	var delicious_icon = 'data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP8AAADd3d0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAwMDAwMDAwMAAAAAAAAAAAMDAwMDAwMDAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAwMDAwMDAwMAAAAAAAAAAAMDAwMDAwMDAAAAAAAAAAADAwMDAwMDAwAAAAAAAAAAAwMDAwMDAwMBAQEBAQEBAQICAgICAgICAQEBAQEBAQECAgICAgICAgEBAQEBAQEBAgICAgICAgIBAQEBAQEBAQICAgICAgICAQEBAQEBAQECAgICAgICAgEBAQEBAQEBAgICAgICAgIBAQEBAQEBAQICAgICAgICAQEBAQEBAQECAgICAgICAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
	var delicious_loaded = {};
	var delicious = function(){
		var cb = function(link){
			var md5url = MD5_hexhash(link.href);
			var onload = function(response){
				var res = eval(response.responseText);
				if(!res || !res[0] ) {
					setBookmarkCount(link, 0, 'http://del.icio.us/url/' + md5url, delicious_icon, "delicious");
					return;
				}
				setBookmarkCount(link, res[0]["total_posts"], 'http://del.icio.us/url/' + md5url, delicious_icon, "delicious");
			}
			GM_xmlhttpRequest({
			  method: "GET",
			  url: 'http://badges.del.icio.us/feeds/json/url/data?hash=' + md5url,
			  onload: onload});
		}
		forEachMatch(XPATH, cb, "delicious");
	}

	// for debug
	function debug1(id){
		var div = document.createElement("div");
		div.setAttribute("id", id);
		var hash = eval(id + "_loaded");
		var lst = new Array();
		for(var key in hash) lst.push(key);
		var div1 = document.createElement("div");
		div1.appendChild(document.createElement("br"));
		div1.appendChild(document.createTextNode(">>> "+id+"( "+lst.length+" ):"));
		div.appendChild(div1);
		var txt = document.createTextNode(lst.join(", "));
		div.appendChild(txt);
		div.appendChild(document.createElement("br"));
		var res = document.getElementById("res");
		res.parentNode.insertBefore(div,res);
	}
	function debug(){
		var bmlst = ["hatena", "livedoor", "buzzurl", "delicious"];
		for(var i=0; i<bmlst.length; i++){
			var res = document.getElementById("res");
			var div = document.getElementById(bmlst[i]);
			if(div) res.parentNode.removeChild(div);
			debug1(bmlst[i]);
		}
	}

	// for Auto Pager
	var scrollHeight = document.documentElement.scrollHeight;
	document.addEventListener(
		"scroll",
		function(e){
			if(document.documentElement.scrollHeight - scrollHeight > 100){
//				debug();
				scrollHeight = document.documentElement.scrollHeight;
				launch();
			}
		},false);

	launch();
})();
