// ==UserScript==
// @name           Vkontakte video downloader 
// @namespace      http://vkontakte.ru/video*
// @description    add button to download video from vkontakte.ru Opera fixed version of script 17126
// @include        http://vkontakte.ru/video*
// ==/UserScript==

if ((/video(\d+)/.exec(window.location))||(/video(.*)\&id=(\d+)/.exec(window.location)))
{

    var allText = document.documentElement.innerHTML;

	var vars = {vtag:"",vkid:"",host:"",link:"",md_title:"",md_author:""}
	var varsStr = ""
	for(v in vars){
	    var val = allText.match(v + ":\\'([^\\']+)\\'");
	    if(val){
		vars[v] = val[1];
		varsStr += v + "=" + vars[v] + "&";
	    }
	}
	var cont = document.createElement("div");
	cont.setAttribute("style", "float:right");
    var addon=document.createElement("a");
	var src = "http://"+vars["host"]+"/assets/videos/"+vars["vtag"]+vars["vkid"]+".vk.flv";
    addon.setAttribute("href",src);
    addon.innerHTML="\u0421\u043A\u0430\u0447\u0430\u0442\u044C"; 
    cont.appendChild(addon);
	cont.innerHTML += " | ";
    var input=document.createElement("input");
	var movie = "http://1.vkadre.ru/VkontaktePlayer.swf?14";
	var text = '<object width="460" height="345">'+
	'<param name="movie" value="' + movie + '"></param>'+
	'<param name="flashvars" value="' + varsStr + '"></param>'+
	'<embed src="' + movie + '" flashvars="' + varsStr + '" type="application/x-shockwave-flash" width="460" height="345"></embed>'+
	'</object><br/>'+
	'<a href="'+location.href+'">\u0412\u0438\u0434\u0435\u043E \u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435</a>';
    input.setAttribute("value",text);
	input.setAttribute("readonly","1");
	input.setAttribute("style", "font-size:10px;width:150px;border:#CCCCCC 1px solid;color:#666666");
	input.setAttribute("onclick","javascript:this.focus();this.select();");
    var addon=document.createElement("a");
    addon.setAttribute("href",""+src);
    addon.innerHTML="\u0421\u043A\u0430\u0447\u0430\u0442\u044C AVI"; 
    cont.appendChild(addon);
	cont.innerHTML += " | ";
    cont.appendChild(input);
    document.getElementById("bigSummary").appendChild(cont);

}

