// ==UserScript==
// @name          UserScripts+ (Türkçe)
// @description   Userscript.org'u Geliştirin!
// @version       1.0
// @include       *userscripts*
// @include       http://userscripts.org/topics/*
// @include       http://userscripts.org/review/*
// @include       http://userscripts.org/scripts/*
// @license       GNU General Public License (GPL)
// ==/UserScript==

function getElementsByClassName( strClassName, obj ) {
 var ar = arguments[2] || new Array();
    var re = new RegExp("\\b" + strClassName + "\\b", "g");

    if ( re.test(obj.className) ) {
        ar.push( obj );
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i], ar );
    
    return ar;
}

 /*var newdiv=getElementsByClassName("wide forums",document.body)[0];
 newdiv.setAttribute('id','reqTable');*/

 var allScripts=getElementsByClassName("title",document.body);
 var allBoxes=getElementsByClassName("script-meat",document.body);
 var length=allScripts.length;
 for(var i=0;i<=length;i++)
 {
 var g=allScripts[i];
 var url=g.href;
 //alert(g.href);
 var integer=url.match(/\d+/);
 //alert(integer);
 var installurl="/scripts/source/"+integer.toString()+".user.js";
var sourceurl="/scripts/review/"+integer.toString();
var reviewurl="/scripts/show/"+integer.toString();
var fanurl="/scripts/fans/"+integer.toString()+"#";
 g=allBoxes[i];
 g.innerHTML=g.innerHTML+"<base target='_blank' /><td class='inv lp'><a href='"+installurl+ "' style='color:blue;'>[İndir]</a> | <a href='"+sourceurl+ "' style='color:blue;'>[Kaynak Kodu]</a> | <a href='"+reviewurl+ "' style='color:blue;'>[Görüntüle]</a> | <a href='"+fanurl+ "' style='color:blue;'>[Favorim Olsun]</a></td>";
 }
