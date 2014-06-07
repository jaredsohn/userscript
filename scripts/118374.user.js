// ==UserScript==
// @name           TV Countdown (tvcd) OneDDL search
// @include        http://*tvcd.tv/*
// @include        http://*tvcountdown.com/*
// @namespace      http://userscripts.org/scripts/show/118374
// @description    Search for episode from TVCD listing on OneDDL.  
// @version        20111208
// ==/UserScript==
function StripTags(strMod){
    if(arguments.length<3) strMod=strMod.replace(/<\/?(?!\!)[^>]*>/gi, '');
    else{
        var IsAllowed=arguments[1];
        var Specified=eval("["+arguments[2]+"]");
        if(IsAllowed){
            var strRegExp='</?(?!(' + Specified.join('|') + '))\b[^>]*>';
            strMod=strMod.replace(new RegExp(strRegExp, 'gi'), '');
        }else{
            var strRegExp='</?(' + Specified.join('|') + ')\b[^>]*>';
            strMod=strMod.replace(new RegExp(strRegExp, 'gi'), '');
        }
    }
    return strMod;
}

var tds;

var trs=document.getElementsByClassName('sixteen columns');
for (i=0; i<trs.length; i++){
	var tds=trs[i].getElementsByTagName('div');
	var name=tds[0].innerHTML.replace(/\([^()]*\)/g, ""); // parantheses
	name=name.replace(/\b[a-zA-Z]*\'[a-zA-Z]*\b/g, ""); // removes words with '
	var epi=tds[1].innerHTML;
	tds[1].innerHTML='<a href="http://www.oneddl.com/?s='+escape(StripTags(name))+'+'+epi+'" target=_blank>'+tds[1].innerHTML+'</a>';
}