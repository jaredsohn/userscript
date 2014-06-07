// ==UserScript==
// @name            TEST
// @description	    TEST
// @require                 http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js
// ==/UserScript==

var a = document.body.innerHTML;
 
var Num = prompt("", "1");
 
   formx = a.match(/name="post_form_id" value="([\d\w]+)"/)[1];
 
 
 
    dts = a.match(/name="fb_dtsg" value="([^"]+)"/)[1];    
 
    composerid = a.match(/name="xhpc_composerid" value="([^"]+)"/)[1];
 
   var msg = prompt("", "Hai Saya menegur :) :* ");
 
    target = a.match(/name="targetid" value="([^"]+)"/)[1];
 
 
 
 pst = "post_form_id=" + formx + "&fb_dtsg=" + dts +  "&xhpc_composerid=" + composerid + "&xhpc_targetid=" + target+  "&xhpc_context=home&xhpc_fbx=1&xhpc_message_text=" +  encodeURIComponent(msg) + "&xhpc_message=" + encodeURIComponent(msg)  +  "&UIPrivacyWidget[0]=40&privacy_data[value]=40&privacy_data[friends]=0&privacy_data[list_anon]=0&privacy_data[list_x_anon]=0&=Share&nctr[_mod]=pagelet_composer&lsd&post_form_id_source=AsyncRequest";
 
 
 
i=0;
 
       
 
                    while(i < Num){
 
 
 
 with(newx = new XMLHttpRequest()) open("POST",  "/ajax/updatestatus.php?__a=1"), setRequestHeader("Content-Type",  "application/x-www-form-urlencoded")  , send(pst);
 
    i += 1;
 
                }