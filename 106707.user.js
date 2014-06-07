// ==UserScript==
// @name           Taboo
// @namespace      Taboo
// @description    Taboo
// @include        http://www.artikel7.nu/*
// ==/UserScript==

a="";
b=GM_getValue("taboolist", a);
mtaboolist=b.split(",");

(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}


function letsJQuery() {
    GM_registerMenuCommand("Delete Taboo Word List", deleteTabooList);
    GM_registerMenuCommand("Add Taboo Word", addTabooWord);
    checkfortaboo();    
}

function deleteTabooList(){
    mtaboolist=[];
    GM_setValue( "taboolist", "");
    checkfortaboo();
}

function addTabooWord(){
    a=prompt ("TabooWord","Anja");
    mtaboolist.push(a);
    b="";
    for (c in mtaboolist){
        b=b+mtaboolist[c]+",";
    }
    GM_setValue( "taboolist", b);
    checkfortaboo(); 
}

function checkfortaboo(){
    mtaboonotfound=0;
    $(".commentlist li").each(function(index) {
        mresult=checktaboointext($(this).text());
        if (mresult==1){
	    $(this).hide();
        } else {
            mtaboonotfound=mtaboonotfound+1;
            $(this).show();
        }
        $("#commentstitle B").text(mtaboonotfound);
        $(".ui-icon-comment").next().text(mtaboonotfound);
    });  
    
}

function checktaboointext(text){
    for (item in mtaboolist){
        if (mtaboolist[item]){
            d=text.indexOf(mtaboolist[item]);
            if (d>-1){
                return 1;
            }
        }
    }
    return 0;
}