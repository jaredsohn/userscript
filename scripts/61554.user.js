// ==UserScript==
// @name          Destyle
// @namespace     Kafke
// @description   Removes all Tags
// @include       *
// ==/UserScript==

//============
//Tags to Remove
//============
rtag("*");

//============



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

function rtag(tag)
{
var block = new Array();
block = document.getElementsByTagName(tag);

for(i=0; i<=block.length; i+=1)
{
var txt = StripTags(block.item(i).innerHTML);

block.item(i).innerHTML = txt;
}
}