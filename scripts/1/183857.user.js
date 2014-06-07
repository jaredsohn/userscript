// ==UserScript==
// @name            Signature App
// @description     Signature-app google chrome extension. Allow users of signature-app to attach their signatures automatically to the end of their email bodies.
// @match      *://mail.google.com/*
// @match      *://*.mail.yahoo.com/*
// @match      *://*.mail.live.com/default.aspx*
// @require    https://code.jquery.com/jquery-latest.min.js
// @version         1
// ==/UserScript==

var sig = "Auto Generated Signature : <br/>";
var s;
var flag = true;

/*--------------Start Yahoo mail signature code--------------*/
function yahooSig() {    
    var sendSpan = $("span[data-action='send']");
    if (sendSpan.length > 0) {        
        if (flag) {            
            flag = false;
            sendSpan.unbind("click").click(function () {                
                $("#rtetext").html(sig + $("#rtetext").html());                
            });            
        }        
    }
    else {        
        flag = true;        
    }    
}
/*--------------End Yahoo mail signature--------------*/

/*--------------Start Gmail mail signature--------------*/
function gmailSig()
{
    var arr_elms = [];
    arr_elms = document.body.getElementsByTagName("div");
    var elms_len = arr_elms.length;
    var target='';
    var target2='';
    for (var i = 0; i < elms_len; i++) {
        if(arr_elms[i].getAttribute("aria-label")=="Message Body")
        {
            console.log('Div Found');
            var ifrm=$(arr_elms[i]).children('iframe');
            if(ifrm.length>0)
            {
                //alert(ifrm.contents().find('body').html());
                target2=ifrm.contents().find('body');                
                //alert(ifrm.contents().find('body').html());
            }
            else
            {
                target=arr_elms[i];
            }
        }
        if((arr_elms[i].getAttribute("Role") == "button" || arr_elms[i].getAttribute("role") == "button") && arr_elms[i].innerHTML=="Send" && $(arr_elms[i]).attr('id')!="mySendButton" && $(arr_elms[i]).attr('id')!="Send"){
            console.log('Button Id Replaced');
            $(arr_elms[i]).attr('id','Send');
        }
        
    }
    if ($('#mySendButton').length <= 0) { 
        var clone=$("#Send").clone();
        var parent=$("#Send").parent();
        $(clone).attr('id','mySendButton');
        $("#Send").unbind('click').click(function(){
            console.log('Trigger Called');            
        });
        $(clone).unbind('click').click(function(){
            console.log('Clicked');
            if(target!=""){
                var temp=target.innerHTML;
                target.innerHTML='Auto Generated Signature : <br/>'+temp;
                console.log("message: "+target.innerHTML);
            }
            else{
                $(target2).html("Auto Generated Signature : <br/>"+$(target2).html());
                console.log("message: "+$(target2).html());
            }
            $("#Send").trigger('click');
        });
        $(parent).append(clone);
        $("#Send").hide();
        console.log("length3 : " + $("#mySendButton").length);
    }
}
/*--------------End Gmail mail signature--------------*/

/*--------------------Start Hotmail---------------------*/
function HotmailSig() {
    
    $ = jQuery.noConflict();
    var msg = $("#ComposeRteEditor_surface");
    var sendbtn = $("#SendMessage");
    sendbtn.unbind("click").click(function () {
        
        var msg = $("#ComposeRteEditor_surface");
        var bodymessage = msg.contents().find("body");
        bodymessage.html(sig + bodymessage.html());
        
    });
    
}
/*--------------End Gmail mail signature--------------*/

function showExtentionMail() {    
    if (document.URL.indexOf("mail.yahoo.com/") > -1) {        
        setInterval(yahooSig, 3000);        
    }
    if (document.URL.indexOf("mail.google.com/mail") > -1) {        
        setInterval(gmailSig, 3000);        
    }
    if (document.URL.indexOf(".mail.live.com/default.aspx") > -1) {        
        setInterval(HotmailSig, 3000);        
    }    
}
setTimeout(showExtentionMail,2000);
