// ==UserScript==
// @name           Alien Visitors AutoScanner
// @namespace      xDdark
// @description    AutoScan for Aliens Visitors by xDdark
// @include        http://apps.facebook.com/alienvisitors/?ref=bookmarks
// @version        1.01
// ==/UserScript==
var SUC_local_ver = 1.01;

/*********** MAIN SCRIPT (DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING!) ***********/
/********************* Update Checker *********************/
var SUC_script_num = 103455;
function updateCheck(forced)
{
    try
    {
        GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().Date.getTime,
            headers: {
                "Pragma": "no-cache",
                "Cache-Control": "no-cache"
            },
            onload: function(resp)
            {
                var remote_version, rt, script_name;
                
                rt=resp.responseText;
                remote_version=(/@version\s*(.*?)\s*$/m.exec(rt))[1];
                if(SUC_local_ver!=-1)
                {
                    script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                    GM_setValue('SUC_target_script_name', script_name);
                    if (remote_version > SUC_local_ver)
                    {
                        if ( document.getElementById("newsBox")) {
                            document.getElementById("newsBox").innerHTML = '<div id="news0" class="newsEntry "><div class="newsDate"></div><div class="newsText">There is an update available for the auto-scan script! <a href=\"http://userscripts.org/scripts/source/103455.user.js\">Download</a> now!</div></div>';
                        }
                        if (forced)
                        {
                            alert('Update available for "'+script_name+'! Click on the link at the newsText near the hunt button to download."');
                        }
                    }
                    else if (forced)
                    {
                        alert('No update is available for "'+script_name+'."');
                    }
                }
            }
        });
    }
    catch (err)
    {
        if (forced)
            alert('An error occurred while checking for updates:\n'+err);
    }
}
GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
{
    updateCheck(true);
});
updateCheck(false);

/************ Hunting & Captcha *************/
var TitleOver = ""
if(document.getElementById("captchaContent"))
{
    var d = new Date();
    d.setMilliseconds(d.getMilliseconds() + 1800000);
    
    var mins = d.getMinutes();
    var secs = d.getSeconds();
        
    if (mins < 10)
    {mins = "0" + mins;}
    if (secs < 10)
    {secs = "0" + secs;}
    
    TitleOver = "Captcha - Auto refreshing at " + d.getHours() + ":" + mins + ":" + secs;
    setTimeout(function() {document.getElementsByName("captcha_id")[0].parentNode.submit();}, 1800000)
    //name = "captcha";
    //setTimeout(function() {document.forms.captcha.submit(); }, 1800000);
    
    
    //var forms = document.getElementsByTagName('form');
    //var formid = forms[3].id
    //setTimeout(function() {document.getElementById(formid).submit();}, 1800000);
}
else
{
    //autoscan
}
UpdateTitle()

/************************* Titles *************************/
var pt = document.location.toString().search(/\?type=/);
/*var ptt = "";
if (pt != -1)
{
    ptt = ": " + document.location.toString().substring(pt + "?type=".length, document.location.toString().length);
}*/
function UpdateTitle()
{
    if (TitleOver == "")
    {
        if (secondsToNextScan > 0) {
            var mins = Math.floor(secondsToNextScan / 60);
            var secs = secondsToNextScan - (mins * 60);

            if (mins < 10)
                {mins = "0" + mins;}
            if (secs < 10)
                {secs = "0" + secs;}

            document.title = "|AV| Scan: " + mins + ':' + secs + " |";
        } else {
            document.title = "|AV| Scanning ! |";
            document.location="javascript:onHuntClick();";
            //n = window.webkitNotifications.createNotification('http://photos-e.ak.fbcdn.net/photos-ak-snc1/v27562/71/160212754026683/app_2_160212754026683_3795.gif', 'Alien Visitors', 'Scan Now!');
           // n.show();

        }
    }
    else
    {
        document.title = TitleOver
    }
    setTimeout(UpdateTitle, 1000);
}