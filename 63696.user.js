// ==UserScript==
// @name           Facebook Shortcut Search
// @namespace      http://craigtweedy.co.uk
// @description    Hijacks the search box so you can quickly navigate to important pages. For instance, I could search for "mom" in order to go to my moms profile, or "mindjolt" to head to the mindjolt home page.
// @include        *.facebook.com*
// @require       http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==


(function() {
    var shortcuts = new Array();
    //shortcuts['SHORTCUT NAME GOES HERE'] = "LOCATION TO PAGE"
    shortcuts['home'] = "http://www.facebook.com/";

    $("div#universal_search_submit input[type='submit']").bind("click",function(){
        var input = $("div#universal_search_input input").val();
        if(shortcuts[input]){
            window.location = shortcuts[input];
        }else{
            return true;
        }
        return false;
    });
    
}());