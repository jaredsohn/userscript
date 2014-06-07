// ==UserScript==
// @name		Automates GlassDoor/Techgig/Naukri in Frame Links 
// @version		3.2.1.2
// @description	This small scripts removed GlassDoor/Techgig  links and moves to main websites for Resume upload.
// @include		http://www.glassdoor.com/*
// @include		http://www.techgig.com/jobs/*
// @include		http://*.naukri.com/*
// @match		http://*.naukri.com/*
// @grant		GM_getValue
// @grant		GM_setValue
// @copyright	2013+, Narender
// @author		Narender
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(document).ready(function($) {
	$(window).load(function(){
        if(window.location.hostname == "apply.naukri.com"){
            setTimeout(function(){process_WebSite("apply.naukri.com")}, 2000);
        }
        else if(window.location.hostname == "jobsearch.naukri.com"){
            setTimeout(function(){process_WebSite("jobsearch.naukri.com")}, 2000);
		}
		else if(window.location.hostname == "www.glassdoor.com"){
			setTimeout(function(){process_WebSite("www.glassdoor.com")}, 100);
		}
		else if(window.location.hostname == "www.techgig.com"){
			status=setTimeout(function(){process_WebSite("www.techgig.com")}, 100);
        }
	});
});

function process_WebSite(url){
    if ("www.glassdoor.com"  == url){
		if($('.applyButton').length > 0){
			navURL = $(".applyButton").attr("href");
			window.location.href = navURL;
		}
		else if($('.closeBox').length > 0){
			$('.closeBox').attr('data-href');
            window.location.href = $('.closeBox').attr('data-href');
            alert("");
            return -1;
        }
    }
    else if( "www.techgig.com" == url){
       window.location.href = $('#iframe').attr('src');
    }
    else if("jobsearch.naukri.com" == url){
        $("#apply1top").click();
        setTimeout(function(){ $('#pspSbtBtn').click();}, 3000);
	}else if ("apply.naukri.com"  == url) {
        if($('#pspSbtBtn')){
            $('#pspSbtBtn').click();
        }
        if($("#apply1top")){
            $("#apply1top").click()
        }
    }
}