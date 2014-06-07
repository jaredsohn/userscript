// ==UserScript==
// @name          vBulletin Total Ignore
// @include       */showthread.php*
// @include       */showpost.php*
// @include       */private.php*
// @include       */member.php*
// @exclude       
// @version       1.03
// @date          2014-01-27
// @creator       Tjololo
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

//var plonk = new Array();
var plonk = (GM_getValue("plonk") ? GM_getValue("plonk") : new Array());

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
    	return localStorage[key] || def;
		};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
		};
    this.GM_deleteValue=function (key) {
        return localStorage.removeItem(key);
    }
}
   
$('li[class*=postbitignored]').each(function() {
    var name = $(this).find(".postbody").find("strong").html();
    if ($.inArray(name,plonk) == -1)
        plonk.push(name);
    GM_setValue("plonk",plonk);
    $(this).hide();
    console.log("Found "+name);
});

$(".bbcode_quote").each(function() {
    var name = $(this).find("strong").html();
    if ($.inArray(name,plonk) > -1){
        console.log("Found quote from "+name);
        $(this).html("Quote from "+name+" hidden");
        $(this).hide();
    }
});

/*if (GM_getValue("plonk")){
    var oldPlonk = GM_getValue("plonk");
    for (var i = 0; i < plonk.length; i ++){
        if ($.inArray(plonk[i],oldPlonk) == -1)
            oldPlonk.push(plonk[i]);
    }
    GM_deleteValue("plonk");
    GM_setValue("plonk",oldPlonk);
}
else
    GM_setValue("plonk",plonk);*/