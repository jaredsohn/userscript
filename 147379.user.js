// ==UserScript==
// @name           marcheRR
// @namespace      www.lesroyaumes.com
// @description    permet d'acheter autant de marchandises que souhaite en un clic sur le marche.
// @include        http://www.lesroyaumes.com/EcranPrincipal.php?l=6
// @author         LJD Mclegrand
// ==/UserScript==

setTimeout(function(){

function f(nb){
    var l=Array();
    var n=0;
    var p=0;
    while(n<nb){
        l.push(n);
        n+=Math.pow(10,p);
        if(n==Math.pow(10,p+1)){p++;}
    }
    l.push(nb);
    return l;
}

var patt=/^<td><img[^>]*><\/td><td>[^<]*<\/td><td>[^<]*<\/td><td>([0-9]+)<\/td><td><img[^>]*><\/td><td><form[^>]*><select[^>]*>/;
var patt2=/<\/select><input[^>]*><input[^>]*><input[^>]*><\/form><\/td>/;
var marche=document.getElementById("zoneTexte0").firstChild.firstChild.firstChild.childNodes;//.firstChlid.firstChild.firstChild.childNodes
//alert(marche[0].innerHTML);
var nelts=marche.length;
var ddd;
var e;
for (ddd=1;ddd<nelts;ddd++){
    var co=marche[ddd].innerHTML;
    var matches=patt.exec(co);
    var elt=matches[0];
    var nb=parseInt(matches[1]);
    var l=f(nb);    
    for(e=0;e<l.length;e++){
        elt+='<option value="'+l[e]+'">'+l[e]+'</option>';
    }
    elt+=(patt2.exec(co))[0];
    marche[ddd].innerHTML=elt;
}
},2000);
