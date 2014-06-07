// ==UserScript==
// @name           Rad Post Craglist Testing
// @namespace      http://demo.radtechnosolutions.com/
// @description    Allows you to test demo.rad grease monkey
// @include        http://*.craigslist.org/*
// @include       https://post.craigslist.org/
// @include       https://post.craigslist.org/*
// @include       https://accounts.craigslist.org/
// @include       https://accounts.craigslist.org/*
// @include       http://localhost:25873/Handlers/*
// @require        http://code.jquery.com/jquery-1.9.1.js

// ==/UserScript==

 $(document).ready(function () {
     
           if(window.location.href.toString().indexOf('s=type')>-1) {
                $("input[value='ho']").attr('checked',true);
                $("button[type='submit']").click();
            }
            else if(window.location.href.toString().indexOf('s=hcat')>-1) {
                $("input[value='144']").attr('checked',true);
                $("button[type='submit']").click();
            }
            else if(window.location.href.toString().indexOf('s=subarea')>-1) {
                $("input[value='1']").attr('checked',true);
                $("button[type='submit']").click();
            }
            else if(window.location.href.toString().indexOf('s=edit')>-1) {
                if(window.location.href.toString().indexOf('s=editimage')>-1 ) {
                    $("button[value='Done with Images']").click();
                }
                else{

                    GM_xmlhttpRequest({
                   method: "GET",
                   url:  window.name+"/Handlers/Craigs_GetHtml.ashx?usr=1",
                   onload: function(response) {
                   
                   var data=response.responseText.split('^');
                   $("textarea").first().text(data[0]);
                   $("#PostingTitle").val(data[1]);
                    $("#GeographicArea").val('');
                   $("#postal_code").val(data[3]);
                    $("#FromEMail").val(data[2]);
                    $("#ConfirmEMail").val(data[2]);
                    $("button[type='submit']").click();
                   }
                  });

                    
               }
            }
 else if(window.location.href.toString().indexOf('s=geoverify')>-1) {
                 $(".bigbutton").click();
            }
            else if(window.location.href.toString().indexOf('s=preview')>-1 ) {
                $(".bigbutton").click();
                $("#attributes").css("display","none");
                }
 else if(window.location.href.toString().indexOf('s=mailoop')>-1 ) {
                GM_xmlhttpRequest({
                   method: "GET",
                   url:  window.name+"/Handlers/Craigs_GetHtml.ashx?post=1",
                   onload: function(response) {
                   
                   
                   
                   }
                  });
     alert("Advertise posted successfully.");
                self.close();
                }
        });

    function GetParameterValues(param) {
        var val="";
        var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < url.length; i++) {
            var urlparam = url[i].split('=');
            if (urlparam[0] == param) {
                val= urlparam[1];
            }
        }
        return val;
    }

function OnComplete(result) {
    alert('Success');
}
function OnFail(result) {
    alert('Request failed');

}