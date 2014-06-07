// ==UserScript==
// @name           OSU AnotherDownload
// @author         9尾雪狐(modified by crucify_m_l)
// @namespace      http://userscripts.org/scripts/show/100778
// @description    Download Beatmaps with no limit！|无限制下图！
// @icon           http://osu.ppy.sh/favicon.ico
// @include        http://osu.ppy.sh/s/*
// @include        http://osu.ppy.sh/b/*
// @include        http://osu.ppy.sh/p/beatmap?*
// @include        https://osu.ppy.sh/s/*
// @include        https://osu.ppy.sh/b/*
// @include        https://osu.ppy.sh/p/beatmap?*
// @updateURL      https://userscripts.org/scripts/source/100778.meta.js
// @downloadURL    https://userscripts.org/scripts/source/100778.user.js
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @version        0.9.2
// ==/UserScript==
var sous=document.getElementsByTagName("h1")[0];
var acc=document.getElementsByClassName("login-open-button")[0];
var isranked=document.getElementsByClassName("beatmapListing")[0];
var script;
if(username=/Welcome, <b><a href=".*?>(.*?)<\/a><\/b>/.exec(document.body.innerHTML)){
var username="&username=" + username[1];
}else{
var username="";
};
var myobj=new Array;
var uptime = "1";
var nupdate = "";
var uploader = "";
var songid=/return play\((\d+)/.exec(document.body.innerHTML)[1];
if(!isranked){
uptime = document.getElementsByClassName("colour")[15].innerHTML;
uptime = uptime.match(/(.*)/g)[3].replace(/[\s]/g,"");
};
enuptime = '&uptime=' + encodeURIComponent(uptime);
function needupdate(a){
if(a==uptime){
nupdate = "";
}else{
nupdate = '<a title="A new version of this map have found，please update it." style="padding:6px;text-shadow: 0px 0px 13px #264A7F;font-size:9px;" onclick=' +"'" + 'javascript:window.open("http://osuosz.duapp.com/1000eb.php' + '?songid=' + songid + enuptime + username + '","_blank","width=616,height=563,scrollbars=no,resizable=no,location=no,status=no,menubar=no,toolbar=no");' + "'>" + "Update osz" + '</a>';
}
}
function haveacc(a){
	if(a=="" || a==null){
		n1000eblink = "<span>»1000eb</span>";
	}else{
		n1000eblink = '<a class="link 1000eb" target=_blank " href="http://1000eb.com/' + a + '">»1000eb</a>';
	};
};
function noacc(a,b){
if(a=="" || a==null){
	n1000eblink = '<a title="Upload the osz to 1000eb.OSUAD need your help." style="text-shadow: 0px 0px 13px #264A7F;" onclick=' +"'" + 'javascript:window.open("http://osuosz.duapp.com/1000eb.php' + '?songid=' + songid + enuptime + username + '","_blank","width=616,height=563,scrollbars=no,resizable=no,location=no,status=no,menubar=no,toolbar=no");' + "'>" + "Upload osz!" + '</a>';
	}else{
		n1000eblink = '<a class="link 1000eb" target=_blank " href="http://1000eb.com/' + a + '">»1000eb</a>';
		needupdate(b);
	};
};
function main(){GM_xmlhttpRequest({
	method: 'GET',
	url: 'http://osuosz.duapp.com/osuAD.php?id=' + songid,
	headers: {
	'Referer': location.href,
	},
	onload: function(response){
		var mydata = /{.*?}/.exec(response.responseText)[0];
		var myobj = eval('(' + mydata + ')');
        uploader = myobj.usern;
		//MF
		if(myobj.mf=="" || myobj.mf==null){
		mflink = "»MediaFire";
		}else{
		mflink = '<a href="http://www.mediafire.com/?' + myobj.mf + '" class="link mediafire" target=_blank>»MediaFire</a>';
		}
		//size
		if(myobj.size=="" || myobj.size==null){
		size = "?MB"
		}else{
		size = myobj.size;
		}
		//blood
		if(myobj.blood == 0 || myobj.blood==null){
		bloodlink = "»BloodCat";
		}else{
		bloodlink = '<a id="bloodlink" href="http://bloodcat.com/osu/m/' + myobj.blood + '" class="link bloodcat">»BloodCat</a>';
		}
		//loli.al
		lolilink = '<a id="lolilink" href="http://loli.al/s/' + myobj.blood + '" class="link loli">»loli.al</a>';
		//uugl
		if(myobj.uugl == 0 || myobj.uugl==null){
		uugllink = "»Osu.uu.gl";
		}else{
		uugllink = '<a href="http://osu.uu.gl/pid/' + myobj.uugl + '" class="link uugl">»Osu.uu.gl</a>';
		}
		//1000eb
		if(acc){
		haveacc(myobj.n1000eb)
		}else{
		if(!myobj.Suptime){myobj.Suptime="";};
		noacc(myobj.n1000eb,myobj.Suptime)
		}
			sous.innerHTML = sous.innerHTML + '<div id="my_1" style="display:none">' + size +"&nbsp" + mflink + " " + bloodlink + "&nbsp&nbsp" + uugllink + "&nbsp&nbsp" + lolilink + "&nbsp&nbsp" + '<div style="position: absolute;display: inline;">' + n1000eblink + '<div class="1000eb" id="box" style="white-space:nowrap;position: absolute;display:none; text-shadow: 0px 0px 13px #264A7F;font-size:11px;">Uploader:<a target=_blank href="http://osu.ppy.sh/u/' + uploader + '">' + uploader + '</div>' + nupdate + '</div>' + '<a title="English or chinese please.If the osz is wrong,please tell me.\n如果osz不对，请通知我" href="http://weibo.com/gameclamp/" target=_blank style="float: right; text-shadow: 0px 0px 13px #264A7F;font-size:8px;">Feedback</a>' + '</div>';
			script = document.createElement("script");
			script.innerHTML = "(" + adisplay + ")();";
			document.body.appendChild(script);
			document.getElementById('bloodlink').onclick = function(){GM_openInTab(document.getElementById('bloodlink').href);return false;};
			mycss = 
			"\
			.link:hover{\
				display: inline;\
				padding:3px;\
				border:3px solid #beceeb;\
				background-color:white;\
				-moz-box-shadow: 0 0 8px rgba(72, 106, 170, 0.5);\
				-webkit-box-shadow: 0 0 8px rgba(72, 106, 170, 0.5);\
				box-shadow: 0 0 8px rgba(72, 106, 170, 0.5);\
			}\
			.link:active{\
				display: inline;\
				padding:3px;border:3px solid #beceeb;\
				background-color:#dee6ff;\
				-moz-box-shadow: 0 0 8px rgba(72, 106, 170, 0.5);\
				-webkit-box-shadow: 0 0 8px rgba(72, 106, 170, 0.5);\
				box-shadow: 0 0 8px rgba(72, 106, 170, 0.5);\
				\
			}\
			.link{\
				display:inlink;\
				padding:6px\
			}\
			"
			style = document.createElement("style");
			style.innerHTML = mycss;
			style.setAttribute("type", "text/css"); 
			document.head.appendChild(style);
	}
})
}
function adisplay(){

	$("#my_1").show(150);
	$(".1000eb").mouseenter(function(){document.getElementById("box").style.display="block"});
	$(".1000eb").mouseleave(function(){document.getElementById("box").style.display="none"});
	$(".inline-form:eq(2)").after('<select title="AutoDownload" class="todown"><option value="0">None</option><option value="1">Auto</option><option value="bloodcat">BloodCat</option><option value="uugl">Osu.uu.gl</option></select>');
	$(".todown").val(localStorage.todown);
	$(".todown").change(function(){
		localStorage.todown = $(this).val();
		window.location.reload();
	});
	if(!localStorage.todown || localStorage.todown == "0"){
		
	}else if(localStorage.todown == "1"){
		if(dn = document.getElementsByClassName("bloodcat")[0]){
			dn.click();
		}else if(dn = document.getElementsByClassName("uugl")[0]){
			dn.click();
		}else{
			
		}
	}else{
		document.getElementsByClassName(localStorage.todown)[0].click();
	};
};
main();