// ==UserScript==
// @name		craigslist_apartment_scrub
// @namespace	craigslist
// @description	Scrub apartment ads
// @include		http://*.craigslist.org/search/apa/*
// @include		http://*.craigslist.org/*/apa/*
// @include		http://*.craigslist.org/search/*
// @include		http://*.craigslist.org/apa/*
// ==/UserScript==
var oDiv = document.createElement('div');
oDiv.id = 'greaseDiv';
oDiv.name = 'greaseDiv';
oDiv.innerHTML = '<span id="greaseExp">[+]</span>\
	<form id="greaseFilter" onSubmit="return false;" \
		style="visibility:hidden;display:none;">\
	<input type="button" value="unFilter" onclick="unFilter()" />\
	<input type="submit" value="Filter" onclick="adFilter()" />\
	<input id="min_price" type="text" value="" title="min price" \
		style="width:5em;" />\
		<--->\
	<input id="max_price" type="text" value="" title="max price" \
		style="width:5em;" />\
	<iframe id="grease_view" style="visible:hidden;display:none">\
	<!--iframe id="grease_view" src="about:blank"-->\
	</iframe><hr /><hr /></form>';
document.body.insertBefore(oDiv,document.body.firstChild);
document.getElementById('greaseExp').setAttribute("onclick","toggleExpand()");
////////////////////////////////////////////////////////////////////////////////
function grease() {
	window.get = function(url) {
		var oRequest = new XMLHttpRequest();
		alert('get' + url);
		oRequest.open("GET",url,false);
		oRequest.send(null)
		if (oRequest.status==200) return(oRequest.responseText);
		return "";
	}
	window.toggleExpand = function() {
		if(getCookie("grease_vis")==1) {
			setCookie("grease_vis", "0", 365);
		} else {
			setCookie("grease_vis", "1", 365);
		}
		expand();
	}
	window.expand = function() {
		var frm=document.getElementById("greaseFilter");
		if(getCookie("grease_vis")==1) {
			hideEle(frm);
		} else {
			showEle(frm);
		}
	}
	window.unFilter = function() {
		var colP = document.getElementsByTagName('p');
		for(var i=0; i<colP.length; i++) {
			showEle(colP[i]);
			var oAdvert = document.getElementById('greaseAdvert'+i)
			if(oAdvert){hideEle(oAdvert);}
		}
	}
	window.adFilter = function(doShow) {
		unFilter();
		setCookie("min_price", document.getElementById("min_price").value);
		var minP=getCookie("min_price");
		setCookie("max_price", document.getElementById("max_price").value);
		var maxP=getCookie("max_price");
		var colP=document.getElementsByTagName('p');
		var oIframe=document.getElementById("grease_view");
		$.ajaxSetup({async: false});
		for(var i=0; i<colP.length; i++) {
			var oAdvert = colP[i].getElementsByTagName('a');
			var sCost=null
			if(oAdvert){oAdvert = oAdvert[0];}
			if(oAdvert){
				sCost = oAdvert.innerHTML.replace(",", "").match(/\$[0-9]*/g);}
			if(sCost==null){
				var strParTxt=colP[i].innerHTML
				if(strParTxt.indexOf("next 100 postings")==-1) {
					hideEle(colP[i]);
				}
			} else {
				sCost = parseInt(sCost[0].slice(1, sCost[0].length));
				if(sCost > maxP || sCost < minP) {
					hideEle(colP[i]);
				} else {
					var sAdvert='greaseAdvert'+i;
					var oDiv=document.getElementById(sAdvert);
					if(oDiv==null){
						var oP=colP[i];
						var oSpan=document.createElement('span');
						oSpan.id="show_"+sAdvert;
						oSpan.innerHTML="[...]";
						oSpan.style.height="1em";
						oSpan.style.verticalAlign="text-top";
						oP.style.backgroundColor="#ADD8E6";
						oDiv=document.createElement('div');
						oDiv.id = sAdvert;
						oDiv.name = sAdvert;
						//console.log(oP.nextSibling);
						oP.appendChild(oSpan);
						oP.appendChild(oDiv);
						hideEle(oDiv);
						oSpan.onclick = new Function("toggleEle(document.getElementById('"+oDiv.id+"'))");
						//oDiv.onclick = new Function("showEle(document.getElementById('"+oDiv.id+"'))");
						var iWait=1;
						jQuery.get(oAdvert.href,function(data,oP){
							var sText=data.split('<div id="userbody">')
							if(sText.length==1){return;}
							sText=sText[1].split('<ul class="clfooter">')
							if(sText.length==1){return;}
							sText=sText[0];
							//sText=sText.replace(/<\/?[^>]+(>|$)/g, "");//remove html tags
							while(sText.indexOf("<br> ")>0){
								sText=sText.replace("<br> ", "<br>");}
							while(sText.indexOf("<br>\t")>0){
								sText=sText.replace("<br>\t", "<br>");}
							while(sText.indexOf("<br><br>")>0){
								sText=sText.replace("<br><br>", "<br>");}
							oDiv.innerHTML = sText;
							},iWait=0);
						while(iWait==1);
					}
				}
			}
		}
		document.getElementById("max_price").value=maxP;
		document.getElementById("min_price").value=minP;
	}
	window.filterAdd = function(sAdvert,oDiv,oP) {}

	window.toggleEle = function(ele) {
		if(ele.style.visibility=="hidden"){showEle(ele);
		}else {hideEle(ele);}
	}
	window.hideEle = function(ele) {
		//ele.parentNode.removeChild(ele);
		ele.style.visibility="hidden";
		ele.style.display="none";
	}
	window.showEle = function(ele) {
		ele.style.visibility="visible";
		ele.style.display="block";
	}
	window.getCookie = function(c_name,defVal) {
		defVal = (typeof defVal == "undefined")?null:defVal;
		var i,x,y,aCook=document.cookie.split(";");
		for (i=0;i<aCook.length;i++) {
			x=aCook[i].substr(0,aCook[i].indexOf("="));
			y=aCook[i].substr(aCook[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x==c_name) {return unescape(y);}}
		return defVal;
	}
	window.setCookie = function(c_name,val,exD) {
		var expDt=new Date();
		expDt.setDate(expDt.getDate() + exD);
		var c_val=escape(val)+((exD==null)?"":"; expires="+expDt.toUTCString());
		document.cookie=c_name + "=" + c_val;
	}
	document.getElementById("max_price").value=getCookie("max_price", 500);
	document.getElementById("min_price").value=getCookie("min_price", 500);
	window.expand();
}

//Inject our script ////////////////////////////////////////////////////////////
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ grease +')();'));
var oBefore = (document.body || document.head || document.documentElement)
oBefore.insertBefore(script, oBefore.firstChild);
