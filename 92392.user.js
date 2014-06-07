// ==UserScript==
// @name			eRepublik Newspaper Ignore
// @description		Ignore the newspapers you don't want in eRepublik
// @include			http://*.erepublik.com/*
// @version			0.3
// ==/UserScript==

if(GM_getValue("newspapers")==undefined) {
	GM_setValue("newspapers",0);
}

if(GM_getValue("comments")==undefined) {
	GM_setValue("comments",0);
}

if(document.body.id=="media") {
	document.getElementById("container").style.position="relative";
	var res=document.getElementsByClassName("bordersep");
	var res0;
	var res1;
	var name;
	var msg;
	//unignore part
	if(window.location.toString().search("/bg/")!=-1)
		msg="&#1044;&#1077;&#1080;&#1075;&#1085;&#1086;-<br/>&#1088;&#1080;&#1088;&#1072;&#1081;";
	else
		msg="Unignore";
	res=document.getElementsByClassName("core")[0];
	res0=document.createElement("br");
	res.appendChild(res0);
	res0=document.createElement("a");
	res0.setAttribute("href","javascript:void(0);");
	res0.setAttribute("class","logout");
	res0.setAttribute("id","unignore");
	res0.addEventListener("click",function(event) {
		document.getElementById("blacklist").style.top=event.pageY+"px";
		document.getElementById("blacklist").style.display="block";
	},false);
	res0.innerHTML=msg;
	res.appendChild(res0);
	//blacklist part
	res=document.getElementById("container");
	res0=document.createElement("div");
	res0.setAttribute("id","blacklist");
	res0.setAttribute("style","position: absolute; min-width: 150px; padding: 10px; color: white; opacity: 0.8; background-color: black; left: 93px; -moz-border-radius: 10px; display: none;");
	res.appendChild(res0);
	if(window.location.toString().search("/bg/")!=-1)
		msg="&#1063;&#1077;&#1088;&#1077;&#1085; &#1089;&#1087;&#1080;&#1089;&#1098;&#1082;";
	else
		msg="Blacklist";
	res=document.getElementById("blacklist");
	res0=document.createElement("div");
	res0.setAttribute("style","text-align: center");
	res0.innerHTML=msg;
	res.appendChild(res0);
	res0=document.createElement("br");
	res.appendChild(res0);
	for(i=2;i<2+parseInt(GM_getValue("newspapers"));i++) {
		res0=document.createElement("a");
		res0.setAttribute("href","javascript:void(0);");
		res0.setAttribute("id",i);
		res0.innerHTML=GM_getValue("newspaper"+i);
		res0.addEventListener("click",function() {
			setTimeout(function() {
				var id0=this.id;
				GM_setValue("newspapers",parseInt(GM_getValue("newspapers"))-1);
				for(i=id0+1;i<=parseInt(GM_getValue("newspapers"))+2;i++) {
					GM_setValue("newspaper"+(i-1),GM_getValue("newspaper"+i));
				}
				window.location=window.location;
			},0);
		},false);
		res.appendChild(res0);
		res0=document.createElement("br");
		res.appendChild(res0);
	}
	if(window.location.toString().search("/bg/")!=-1)
		msg="&#1047;&#1072;&#1090;&#1074;&#1086;&#1088;&#1080;";
	else
		msg="Close";
	res0=document.createElement("br");
	res.appendChild(res0);
	res0=document.createElement("div");
	res0.setAttribute("style","text-align: center");
	res1=document.createElement("a");
	res1.setAttribute("href","javascript:void(0);");
	res1.innerHTML=msg;
	res1.addEventListener("click",function() {
		document.getElementById("blacklist").style.display="none";
	},false);
	res0.appendChild(res1);
	res.appendChild(res0);
	//main part
	if(window.location.toString().search("/bg/")!=-1)
		msg="&#1048;&#1075;&#1085;&#1086;&#1088;&#1080;&#1088;&#1072;&#1081; &#1074;&#1077;&#1089;&#1090;&#1085;&#1080;&#1082;&#1072;";
	else
		msg="Ignore newspaper";
	res=document.getElementsByClassName("bordersep");
	for(i=2;i<res.length;i++) {
		res0=res[i].getElementsByClassName("nameholder")[0];
		res1=document.createElement("br");
		res0.appendChild(res1);
		res1=document.createElement("a");
		res1.setAttribute("href","javascript:void(0);");
		res1.setAttribute("style","color: #ee0000;");
		res1.addEventListener("click",function() {
			var res3=this.parentNode.getElementsByClassName("dotted")[0].innerHTML;
			setTimeout(function() {GM_setValue("newspapers",parseInt(GM_getValue("newspapers"))+1);},0);
			setTimeout(function() {GM_setValue("newspaper"+(parseInt(GM_getValue("newspapers"))+1),res3);},0);
			window.location=window.location;
		},false);
		res1.innerHTML=msg;
		res0.appendChild(res1);
		for(j=2;j<2+parseInt(GM_getValue("newspapers"));j++) {
			if(res[i].getElementsByClassName("dotted")[1].innerHTML==GM_getValue("newspaper"+j)) {
				res[i].style.display="none";
				break;
			}
		}
	}
}
else if(document.body.id=="newspaper") {
	document.getElementById("container").style.position="relative";
	var res=document.getElementsByClassName("core")[0];
	var res0;
	var res1;
	var msg;
	//unignore part
	if(window.location.toString().search("/bg/")!=-1)
		msg="&#1044;&#1077;&#1080;&#1075;&#1085;&#1086;-<br/>&#1088;&#1080;&#1088;&#1072;&#1081;";
	else
		msg="Unignore";
	res=document.getElementsByClassName("core")[0];
	res0=document.createElement("br");
	res.appendChild(res0);
	res0=document.createElement("a");
	res0.setAttribute("href","javascript:void(0);");
	res0.setAttribute("class","logout");
	res0.innerHTML=msg;
	res0.addEventListener("click",function(event) {
		document.getElementById("blacklist").style.top=event.pageY+"px";
		document.getElementById("blacklist").style.display="block";
	},false);
	res.appendChild(res0);
	//blacklist part
	res=document.getElementById("container");
	res0=document.createElement("div");
	res0.setAttribute("id","blacklist");
	res0.setAttribute("style","position: absolute; min-width: 150px; padding: 10px; color: white; opacity: 0.8; background-color: black; left: 93px; -moz-border-radius: 10px; display: none;");
	res.appendChild(res0);
	if(window.location.toString().search("/bg/")!=-1)
		msg="&#1063;&#1077;&#1088;&#1077;&#1085; &#1089;&#1087;&#1080;&#1089;&#1098;&#1082;";
	else
		msg="Blacklist";
	res=document.getElementById("blacklist");
	res0=document.createElement("div");
	res0.setAttribute("style","text-align: center");
	res0.innerHTML=msg;
	res.appendChild(res0);
	res0=document.createElement("br");
	res.appendChild(res0);
	for(i=1;i<1+parseInt(GM_getValue("comments"));i++) {
		res0=document.createElement("a");
		res0.setAttribute("href","javascript:void(0);");
		res0.setAttribute("id",i);
		//res0.setAttribute("onclick","unignoreComments("+i+");");
		res0.innerHTML=GM_getValue("comment"+i);
		res0.addEventListener("click",function() {
			setTimeout(function() {
				var id0=this.id;
				GM_setValue("comments",parseInt(GM_getValue("comments"))-1);
				for(i=id0+1;i<=parseInt(GM_getValue("comments"))+1;i++) {
					GM_setValue("comment"+(i-1),GM_getValue("comment"+i));
				}
				window.location=window.location;
			},0);
		},false);
		res.appendChild(res0);
		res0=document.createElement("br");
		res.appendChild(res0);
	}
	if(window.location.toString().search("/bg/")!=-1)
		msg="&#1047;&#1072;&#1090;&#1074;&#1086;&#1088;&#1080;";
	else
		msg="Close";
	res0=document.createElement("br");
	res.appendChild(res0);
	res0=document.createElement("div");
	res0.setAttribute("style","text-align: center");
	res1=document.createElement("a");
	res1.setAttribute("href","javascript:void(0);");
	res1.innerHTML=msg;
	res1.addEventListener("click",function() {
		document.getElementById("blacklist").style.display="none";
	},false);
	res0.appendChild(res1);
	res.appendChild(res0);
	//main part
	if(window.location.toString().search("/bg/")!=-1)
		msg="&#1048;&#1075;&#1085;&#1086;&#1088;&#1080;&#1088;&#1072;&#1081; &#1082;&#1086;&#1084;&#1077;&#1085;&#1090;&#1072;&#1088;&#1080;&#1090;&#1077;";
	else
		msg="Ignore comments";
	res=document.getElementsByClassName("articlecomments");
	for(i=0;i<res.length;i++) {
		res0=res[i].getElementsByClassName("nameholder")[0];
		for(j=1;j<=parseInt(GM_getValue("comments"));j++)
			if(res0.innerHTML==GM_getValue("comment"+j)) {
				res[i].style.display="none";
				break;
			}
		res0.style.paddingTop="2px";
		res0.style.marginBottom="3px";
		res0=res0.parentNode;
		res1=document.createElement("br");
		res0.appendChild(res1);
		res1=document.createElement("a");
		res1.setAttribute("href","javascript:void(0);");
		res1.setAttribute("style","color: #ee0000; position: relative; top: 2px;");
		res1.innerHTML=msg;
		res1.addEventListener("click",function() {
			var res3=this.parentNode.getElementsByClassName("nameholder")[0].innerHTML;
			setTimeout(function() {GM_setValue("comments",(parseInt(GM_getValue("comments"))+1));},0);
			setTimeout(function() {GM_setValue("comment"+parseInt(GM_getValue("comments")),res3);},0);
			window.location=window.location;
		},false);
		res0.appendChild(res1);
	}
}