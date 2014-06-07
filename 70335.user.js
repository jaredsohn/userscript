// ==UserScript==
// @name           TV Countdown (tvcd) Filestube search
// @include        http://tvcd.tv/*
// @namespace      http://userscripts.org/scripts/show/70335
// @description    Search for episode from TVCD listing on FilesTube.  
// @version        20110213
// ==/UserScript==

// Change to 1 for rapidshare, 3 for megaupload, 27 for hotfile etc. Leave blank for all.
var service='';

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

var allElements, thisElement, tables, thistable, tds;

//Create Array of All HTML Tags
allHTMLTags=document.getElementsByTagName("*");
tables=document.getElementsByTagName("table");

//Loop through all tags using a for loop
for (i=0; i<tables.length; i++) {
//Get all tags with the specified class name.
if (tables[i].className=='episode_list_table') {
	var thistable=tables[i];
	break;
}
}

var trs=thistable.getElementsByTagName('tr');

for (i=1; i<trs.length; i++){
	tds=trs[i].getElementsByTagName('td');
	tds[1].innerHTML='<a href="http://www.filestube.com/search.html?q='+escape(StripTags(tds[0].innerHTML))+'+'+tds[1].innerHTML+'&select=avi&hosting='+service+'" target=_blank>'+tds[1].innerHTML+'</a>';
}