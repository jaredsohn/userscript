// ==UserScript==
// @name           Alien Visitors - SmartScan Edited ZC.Khoo
// @namespace      ZC.Khoo
// @description    SmartScan for Alien Visitors by ZC.Khoo
// @include        http://apps.facebook.com/alienvisitors/*
// @include        http://alien-visitors.com/alienvisitor/*
// @version        1.02
// @history        1.02 - Modify Captcha
// @history        1.01 - Update Captcha Refreshing Time(Beta)
// @history        1.00 - Original Version
// ==/UserScript==
var SUC_local_ver = 1.02;

/*********** MAIN SCRIPT (DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING!) ***********/
/********************* Update Checker *********************/
var SUC_script_num = 105463;
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
                                document.getElementById("newsBox").innerHTML = '<div id="news0" class="newsEntry "><div class="newsDate"></div><div class="newsText">There is an update available for the auto-scan script! <a href=\"http://userscripts.org/scripts/source/105463.user.js\">Download</a> now!</div></div>';
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
/************ Battery **************/
function getBatteryCount()
{
    var count = 0;
    var countXes = 0;
    var number;
    var childnodes = document.getElementById("batteryCount").childNodes;
    for(var i = 0; i < childnodes.length ; ++i)
    {
        number = childnodes[i].className.replace("number", "");
        if (number !== "X")
        {
            count += (number * Math.pow(10, childnodes.length - countXes - i));
        } else {
            ++countXes;
        }
    }
    return count;
}
/************* Firefox Scan Time ***************/
function getScanTime()
{
    var scanTime = unsafeWindow.secondsToNextScan - 1;
    
    if (scanTime == 0) {
        return "NOW !";
    } 
    else {
        var mins = Math.floor(scanTime / 60);
        var secs = scanTime % 60;
        
        if (mins < 10)
        {
            mins = "0" + mins;
        }
        if (secs < 10)
        {
            secs = "0" + secs;
        }
        
        return mins + ":" + secs;
    }
}
/****************** Auto Scan *********************/
function scan()
{
    if (document.getElementById("scanButtonOff").style.display == "none")
    {
        if (getBatteryCount() != "0") {
            document.location = 'javascript:onHuntClick();';
        }
        else {
            document.title = "| AV | No Batteries! |";
        }
    } 
    else {
        document.title = "| AV | Scan: " + getScanTime() + " | Battery: " + getBatteryCount() + " |";
    }
}
/************ Scanning & Captcha *************/

var TitleOver = "";
if (document.getElementById("catpchaPopup"))
{
    var d = new Date();
    d.setMilliseconds(d.getMilliseconds() + 1800000);
    
    var mins = d.getMinutes();
    var secs = d.getSeconds();
    
    if (mins < 10)
    {mins = "0" + mins;}
    if (secs < 10)
    {secs = "0" + secs;}
    
    document.title =  "| AV | Captcha - Refreshing at " + d.getHours() + ":" + mins + ":" + secs;
    setTimeout(function() {document.getElementsByName("captcha_id")[0].parentNode.submit();}, 1800000)
        //name = "captcha";
        //setTimeout(function() {document.forms.captcha.submit(); }, 1800000);
        
        
        //var forms = document.getElementsByTagName('form');
        //var formid = forms[3].id
        //setTimeout(function() {document.getElementById(formid).submit();}, 1800000);
        }
else {
    scan();
}
UpdateTitle();
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
        if (document.getElementById("catpchaPopup") == null) {
            scan();
        }
        else {
            document.title =  "| AV | Captcha! |";
        }
    }
    else
    {
        document.title = TitleOver
            }
    setTimeout(UpdateTitle, 1000);
}