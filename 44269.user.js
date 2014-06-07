// ==UserScript==
// @name           Rapidshare Remote Upload Mass Deleter
// @namespace      rapidshare
// @description    Rapidshare remote upload mass deleter
// @include        https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi*
// @include        https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi*
// ==/UserScript==

//Basically the code comes from lifetalk's cookie-stealing version. I've cleaned it up, using the Jquery 
//directly from the author's site, and I made the button/alerts look better, without any unnecessary words.
//That's all folks.

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.2.6.js';
/* This jquery is the latest version that will work with Rapidshare, and is DIRECTLY implemented from the author's site.*/
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    }
    else {
        $ = unsafeWindow.jQuery;
        main();
    }
}

GM_wait();

// All your GM code must be inside this function..ok
function main(){

    //$('h1').text( $('h1').text() + ' [Improved and Fixed]').attr("style","color: red;");
    
    /************* MAIN PAGE ***************/
    if (document.location.href == 'https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi') 
    if (document.location.href == 'https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi') {
		$("center").attr("style","text-align:left; margin-left: 250px;");
        $("<div id='dl_list' style='position: fixed; width: 240px; font-size:10px; overflow: auto; top: 0px; height: 100%; left: 0px; background-color: #000000; color: #ffffff; border-right: 5px solid #ccc;'></div>").appendTo("body").fadeTo(0, 0.7);
        $('div.fliste td a:nth-child(1)').each(function(){
            $("#dl_list").append($(this).attr("href") + "<br/>");
        });
    }
    
    /************* MAIN PAGE:END ***************/
    
    
    /************* REMOTE UPLOAD PAGE ***************/
    if (document.location.href != 'https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi?remotegets=1') 
    if (document.location.href != 'https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi?urls=&remotegets=1') 
    if (document.location.href != 'https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?remotegets=1') 
    if (document.location.href != 'https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi?urls=&remotegets=1') 
        return; // Not remote upload page, do not continue
    // Mass delete
    $("input[@type='button']").parent('div').prepend($("<button id='massmass'>Delete All</button>"));
    $('button#massmass').click(function(){
        if (confirm("Remove all saved Remote Upload jobs?")) {
            $("button").attr("disabled", "disabled");
            
            $(".dtabelle a").each(function(i, a){
                var self = $(this);
                var id = $(this).attr('href').split("'")[1];
                var param = "remotegets=1&killjobs=1&killjob-" + id + "=1";
                $.ajax({
                    type: "POST",
                    data: param,
                    success: function(html){ // Let's parse the response!
                        self.parents('tr').empty();
                    }
                });
                
            });
        }
    });
}    