// ==UserScript==
// @name            Uppercut Auto Thread Updater
// @namespace       Scorn
// @description		Check for new posts, which reloads every 30 seconds
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant           GM_addStyle
// @grant           GM_setValue
// @grant           GM_getValue
// @grant       GM_xmlhttpRequest
// @grant           GM_deleteValue
// @grant           GM_log
// @include         http://uppercutservers.com/forum/*
// @exclude         http://uppercutservers.com/forum/editpost.php*
// @exclude         http://uppercutservers.com/forum/private.php*
// @exclude         http://uppercutservers.com/forum/newthread.php*
// @exclude         http://uppercutservers.com/forum/newreply.php*
// @exclude         http://uppercutservers.com/forum/usercp.php*
// @exclude         http://uppercutservers.com/forum/modcp.php*
// @exclude         http://uppercutservers.ocm/forum/admin*
// @version         1.41
// ==/UserScript==
var version = 1.41;
try{
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://www.friendshipisgaming.net/autoupdate.html",
            onload: function(response){
                var emyHTML, elementzLink, res, newres = [], i;              
                res = trimString(response.responseText);
                newres = res.split('\n');
				GM_setValue("latestversion", parseFloat(newres.join(" | ")));
//                GM_log(GM_getValue("latestversion"));
            },
        });
    }catch(err){
        GM_log(err.message);
    }
//GM_log(GM_getValue("latestversion"));
var latestversion = GM_getValue("latestversion");
var numericalversion = version; 
var emyNotice = [
    ".emy_alert {",
    "background: #333333;",
    "border-top: 1px solid #F4D639;",
    "border-bottom: 1px solid #F4D639;",
    "text-align: center;",
    "padding: 5px 20px;",
    "font-size: 11px;",
    "margin-bottom: 15px;}",
].join("");
    
    GM_addStyle(emyNotice);
    
    
    $("strong:contains('Threaded Mode')").before("<a class='smalltext' id='threadstatus' style='color:white;cursor:pointer;'><strong><font color=\"#FF0000\">(Disabled)</font></strong></a> <strong>- <a class='smalltext' id='timetorefresh' style='color:white;cursor:pointer;'></a></strong><strong> | </strong><a class='smalltext' id='notifyThread' style='color:white;cursor:pointer;'><strong>Enable Automatic Refreshing</strong></a> | ");
    $('body').html($('body').html().replace('				<!-- End theme created by statement -->\n			</span>','				<!-- End theme created by statement -->&nbsp; <a style=\'color:white;cursor:pointer;\' href=\"http://uppercutservers.com/forum/thread-221.html\"><strong>Uppercut Thread Auto Updater ' + version + '</strong></a> by <a style=\'color:white;cursor:pointer;\' href=\"http://uppercutservers.com/forum/user-2.html\"><strong>Scorn.</strong></a>\n			</span>'));
    $('body').html($('body').html().replace('<span style=\"color: #BFA619;\">Scorn</span>','<span style=\"color: #BFA619;\">Scorn</span> <a class=\'smalltext\' style=\"color:black;cursor:pointer;\" href=\"http://uppercutservers.com/forum/thread-221.html\">Creator of Uppercut Thread Auto Updater</a>'));
    $("strong:contains('»')").after(" <a class='smalltext' id='threadstatus2' style='color:white;cursor:pointer;'><strong><font color=\"#FF0000\">(Disabled)</font></strong></a> <strong>- <a class='smalltext' id='timetorefresh2' style='color:white;cursor:pointer;'></a></strong><strong> | </strong><a class='smalltext' id='notifyThread2' style='color:white;cursor:pointer;'><strong>Enable Automatic Refreshing</strong></a>");
    postAmount = $(".smalltext > strong > a:contains('#')").length;
    
    $('body').html($('body').html().replace('<span style=\"font-style: italic;\">If you are running this script as of version 1.2, you should see your version number here. (If I did it right).</span>','<i>You are currently running version: </i><strong>' + version + '</strong>'));
    
    function hideEmyMessage(){
    $("#emy_msg").fadeOut();
    }
    function trimString (str) {
    /* Also didn't write this, but it's very useful and so elegant! */
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }    
    function emyMessage(){    
    if(version >= latestversion){
    GM_log("[Log] Not displaying message... you have latest version.");
    }else if(latestversion == "NaN"){
    GM_log("[Log] Not displaying message... you have latest version.");
    }else{
    hideButton = '<div class="float_right"><a href="javascript:void(0);" title="Dismiss this notice" id="hider"><img src="http://uppercutservers.com/forum/images/1/dismiss_notice.gif" alt="Dismiss this notice" title="[x]"></a></div>';
    emyHTML = '<br><div class="red_alert" id="emy_msg"><div><strong>Uppercut Auto Thread Updater Notice: A new version, V ' + latestversion + ' is available. <a href=\"http://userscripts.org/scripts/source/404709.user.js\">Click here to upgrade from V ' + version + '</a></strong>'+hideButton+'</div></div>';
    if(emyHTML = '<br><div class="red_alert" id="emy_msg"><div><strong>Uppercut Auto Thread Updater Notice: A new version, V ' + latestversion + ' is available. <a href=\"http://userscripts.org/scripts/source/404709.user.js\">Click here to upgrade from V NaN</a></strong><div class="float_right"><a href="javascript:void(0);" title="Dismiss this notice" id="hider"><img src="http://uppercutservers.com/forum/images/1/dismiss_notice.gif" alt="Dismiss this notice" title="[x]"></a></div></div></div>'){
//Do nothing
}else{
    $('body').html($('body').html().replace('<!-- start: nav -->',emyHTML + "<br><!-- start: nav -->"));
    $("#hider").live("click",function(){hideEmyMessage();});
}
    }
    }
    
    $("#notifyThread").click(function(){
    if(GM_getValue("runScript") == "1"){
    GM_setValue("runScript", "0");
    clearInterval(interval);
    $("#notifyThread").html("<strong>Enable Automatic Refreshing</strong>");
    $("#threadstatus").html("<strong><font color=\"#FF0000\">(Disabled)</font></strong>");
    $("#timetorefresh").html("");
    $("#notifyThread2").html("<strong>Enable Automatic Refreshing</strong>");
    $("#threadstatus2").html("<strong><font color=\"#FF0000\">(Disabled)</font></strong>");
    $("#timetorefresh2").html("");
    }
    else{
    GM_setValue("URL",location.href);
    if(location.href == GM_getValue("URL")){
    GM_setValue("newPage","0");
    GM_setValue("postAmount",postAmount);
    GM_setValue("runScript","1");    
    runScript();
    }
    }
    });
    emyMessage();
    
    $("#notifyThread2").click(function(){
    if(GM_getValue("runScript") == "1"){
    GM_setValue("runScript", "0");
    clearInterval(interval);
    $("#notifyThread").html("<strong>Enable Automatic Refreshing</strong>");
    $("#threadstatus").html("<strong><font color=\"#FF0000\">(Disabled)</font></strong>");
    $("#timetorefresh").html("");
    $("#notifyThread2").html("<strong>Enable Automatic Refreshing</strong>");
    $("#threadstatus2").html("<strong><font color=\"#FF0000\">(Disabled)</font></strong>");
    $("#timetorefresh2").html("");
    }
    else{
    GM_setValue("URL",location.href);
    if(location.href == GM_getValue("URL")){
    GM_setValue("newPage","0");
    GM_setValue("postAmount",postAmount);
    GM_setValue("runScript","1");    
    runScript();
    }
    }
    });
    
    
    if(location.href == GM_getValue("URL")){
    GM_setValue("newPage",$(".pagination_next").length);
    if(GM_getValue("postAmount") != postAmount || GM_getValue("newPage") == 2){
    GM_deleteValue("runScript");
    GM_deleteValue("URL");
    GM_deleteValue("postAmount");
    alert("Thread has updated!");
    }
    if(GM_getValue("runScript") == "1"){
    runScript();
    }  
    }
    
    function runScript(){
    var count = 29;
    $("#threadstatus").html("<strong><font color=\"#00FF00\">(Enabled)</font></strong>");
    $("#notifyThread").html("<strong>Disable Automatic Refreshing</strong>");
    $("#timetorefresh").html(30);
    $("#threadstatus2").html("<strong><font color=\"#00FF00\">(Enabled)</font></strong>");
    $("#notifyThread2").html("<strong>Disable Automatic Refreshing</strong>");
    $("#timetorefresh2").html(30);
    interval = setInterval(function(){
    if (count >= 6) {
    $("#timetorefresh").html(count);
    $("#timetorefresh2").html(count);
    }
    if (count <= 5 && count >= 1) {
    $("#timetorefresh").html("<font color=\"#FF0000\">" + count + "</font>");
    $("#timetorefresh2").html("<font color=\"#FF0000\">" + count + "</font>");
    }   
    if (count == 0) {
    $("#timetorefresh").html("Refreshing...");
    $("#timetorefresh2").html("Refreshing...");
    location.reload();
    }
    count--;
    }, 1000);
    }