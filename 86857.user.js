// ==UserScript==
// @name           Persona Previewer
// @namespace      pendevin
// @description    Puts a link on the persona info page to a preview page with full-size images
// @include        http://www.getpersonas.com/*/persona/*
// ==/UserScript==

function getUrlVars(urlz){
	//thanks for the function citizenray
	var vars=[];
	var hash="";
	var hashes=urlz.slice(urlz.indexOf('?')+1).split('&');
	for(var i in hashes){
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

var persona=JSON.parse(document.getElementById("try-button").getAttribute("persona"));

if(getUrlVars(location.href)["preview"]){
	var purview=document.createElement("div");
	purview.id="persona-preview";
	purview.innerHTML="\
			<img id='preview-header' src='"+persona.header+"'>\
			<br>\
			<span id='preview-text1'>Primary text color: "+(persona.textcolor?persona.textcolor:"#000000")+"</span>\
			<a id='preview-link' href='"+location.href.substring(0,location.href.indexOf("?preview"))+"'>Return to Persona Page</a>\
			<span id='preview-text2'>Secondary text color: "+(persona.accentcolor?persona.accentcolor:"#000000")+"</span>\
			<br>\
			<img id='preview-footer' src='"+persona.footer+"'>\
		";
	document.getElementById("outer-wrapper").appendChild(purview);

	var blackground=[
		persona.textcolor!=null&&parseInt(persona.textcolor.substring(1,3),16)+parseInt(persona.textcolor.substring(3,5),16)+parseInt(persona.textcolor.substring(5,7),16)>198?true:false,
		persona.accentcolor!=null&&parseInt(persona.accentcolor.substring(1,3),16)+parseInt(persona.accentcolor.substring(3,5),16)+parseInt(persona.accentcolor.substring(5,7),16)>198?true:false
	];
	var css="\
			#outer-wrapper,#footer{width:3000px;}\
			#persona-preview,#footer{text-align:center;}\
			#preview-header,#preview-footer{margin:20px 0px;}\
			#preview-text1,#preview-text2{margin:15px;padding:10px;font-size:16px;}\
			#preview-text1{background-color:"+(blackground[0]?"#000000":"#ffffff")+";color:"+persona.textcolor+";}\
			#preview-text2{background-color:"+(blackground[1]?"#000000":"#ffffff")+";color:"+persona.accentcolor+";}\
			#maincontent,#secondary-content{display:none;}\
		";
	GM_addStyle(css);
	window.scrollTo(1500-window.innerWidth/2,0);
}
else{
	var link=document.createElement("a");
	link.id="preview-link";
	link.href=location.href+"?preview";
	link.innerHTML="View Persona Preview";
	document.getElementsByClassName("details")[0].appendChild(document.createElement("br"))
	document.getElementsByClassName("details")[0].appendChild(link);
}