// ==UserScript==
// @name           Rapidshare Collectors/Premium Zone Tweak (Updated and Fixed)
// @namespace      rapidshare
// @description    Rapidshare Collectors/Premium Zone Tweak (Updated and Fixed)
// @include        https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi*
// @include        https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi*
// ==/UserScript==

Version = "20090315";

check_new_version = 'true';

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js';
// Meh... thanks to Yansky, now sourcing jQuery from the official googleapi distribution
// network. Please do not go about bitching that this thing grabs cookies!
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

    $('h1').text( $('h1').text() + ' [Improved and Fixed]').attr("style","color: red;");
    
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
    $("input[@type='button']").parent('div').prepend($("<button id='massmass'>Mass *Evil* Delete!</button>"));
    $('button#massmass').click(function(){
        if (confirm("Kill Each and Everyone Of Those Innocent (hehe) jobs?")) {
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
    /************* REMOTE UPLOAD PAGE:END ***************/
if (check_new_version == 'true'){
check_update();
}

function check_update(){

 var today = new Date( );

 day = parseInt( getdays (today) );

    function getdays(date){
    	Year = ((date.getYear() + 1900)*365);
    	
    	var daday = (date.getMonth() + 1);
    	
    	if(daday<10) {daday = "0" + daday;}
    	daday  = (daday*30);
    	
    	daret = Year+daday+date.getDate();
    	
    return daret;
    }


if ( (typeof GM_getValue("day") == "undefined") || ( ( (day - GM_getValue("day")) ) < 0) || ( ( (day - GM_getValue("day")) ) > 10)){
	setTimeout(check_version,1000);
	GM_setValue("day",day);
	}

function check_version() {

		var script_url = "http://userscripts.org/scripts/show/32809";
		var download_url = "http://userscripts.org/scripts/source/32809.user.js";
		GM_xmlhttpRequest({ method:"GET",url:script_url,
			onload:function(result) {

		var myregexp = /Version: <b>(.*?)<\/b>/;
		var newversion = myregexp.exec(result.responseText);
				if(result.responseText.indexOf("Version: <b>"+version) == -1 && confirm('A new version of Rapidshare Premium/Collectors Zone Tweak is available.\nYour version = '+version+'\nNew version = '+newversion[1]+'\nDo you want to update now?')) top.location.href = download_url;
			
			}
		});
}
}