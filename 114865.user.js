// ==UserScript==
// @name         Acs Athens Skyward Blocker
// @author       Linzx
// @version      2012-03-29
// @description  popup blocker for acs athens skyward
// @include      *
// ==/UserScript==

var blocklist = [
    "https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduathensgr/fwemnu01.w",
    "https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduathensgr/sfwmnu01.w",
    "https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduathensgr/sfwgrd30.w",
    "https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduathensgr/weblog03.w",
    "https://skyward.iscorp.com/"
];

for(var i = 0; i < blocklist.length; i++)
{
    if(window.location.toString().indexOf(blocklist[i]) != -1)
    {
        window.open("", "_self", "");
        window.close();
    }
}

window.openOld = window.open;
window.open = function( windowURL, windowName, windowParameters)
    {//alert(windowURL);
        var blocklist = [
           "https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduathensgr/fwemnu01.w",
"https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduathensgr/fwemnu01.w",
"https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduathensgr/sfwmnu01.w",
"https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduathensgr/sfwgrd30.w",
"https://skyward.iscorp.com/scripts/wsisa.dll/WService=wseduathensgr/weblog03.w",
"https://skyward.iscorp.com/"
            
        ];
        for(var i = 0; i < blocklist.length; i++)
        {
            if(windowURL.indexOf(blocklist[i]) != -1)
            {
                //alert(blocklist[i] + "blocked!");
                return null;
            }
        }
        return window.openOld(windowURL, windowName, windowParameters);
    }