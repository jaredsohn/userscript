// ==UserScript==
// @name           plug.dj enhancments
// @namespace      http://userscripts.org/users/73184
// @description    various enhancments for plug.dj (only tested for bashurverse channel!)
// @include        *plug.dj/*/*
// @version 1.2.1-dev
// ==/UserScript==
 
/**Todo list:
 
 
1: there's a bunch of callback's from the plug.dj javascript API i should use instead of the 5k refresh interval (thanks to steven@plug.dj for pointing it out)
2: (fixed in v1.1)
3: allow fan/un-fan/mention etc from the lists..
4: auto-updater ( http://userscripts.org/scripts/show/130611 )
 
 */
/**Changelog:
v1.2.1: Codeformatting (just for the sake of readability), 
v1.2:  Moved the boxes to the top left, desing changed to using plug.dj css-classes (by Syberspace).  (possibly fixes some strange unclickable-avatar bugs too!) ; the lists now start with the number of people in the list. MEH/WOOT!/Undecided lists are now optional, can (de)activate them at will.
v1.13: more chrome bug-fix, sorry
v1.12: fixed a chrome-specific bug causing an js exception.. (i hope)
v1.11: fixed a bug causing "DJs" not to show up on the list (switched from API.getAudience to API.getUsers)
v1.1: added changelog. renamed meh/woot-list variables. added undecided-list. added colors to auto-woot! button (green for activated, red for deactivated)
v1.0: auto-woot now optional. added MEH/WOOT!-list. added TODO-list.
v0.1: auto-woot
 */
 
function hhb_autowoot()
{
    if(typeof(unsafeWindow) !== 'undefined')//this code is to make greasemonkey work :/
    {
        if(typeof(unsafeWindow.hhb_auto) === 'undefined')
        {
            unsafeWindow.hhb_auto = false;
            unsafeWindow.hhb_mehlist_on = true;
            unsafeWindow.hhb_wootlist_on = true;
            unsafeWindow.hhb_undecidedlist_on = false;
        }
        hhb_auto=unsafeWindow.hhb_auto;
    }
    if(typeof(hhb_autowootv) === 'undefined')//
    {
        hhb_autowootv = true;
        hhb_auto = false;
        if(typeof(unsafeWindow) === 'undefined')
        {//Geezas, all the stuff i have to do for greasemonkey's unsafeWindow thing -.-
            hhb_mehlist_on = true;
            hhb_wootlist_on = true;
            hhb_undecidedlist_on = false;
        }
 
        var d = document.getElementById('up-next').parentNode.parentNode.parentNode;
        d.innerHTML += '<button type="button" onclick="Javascript:if(typeof(hhb_auto)===\'undefined\' || !hhb_auto){hhb_auto=true;this.innerHTML=\'Auto-WOOT!: <span style=\\\'color:rgb(0,138,5);\\\'>Enabled</span>.\';}else{hhb_auto=false;this.innerHTML=\'Auto-WOOT!: <span style=\\\'color:rgb(233,6,6);\\\'>Disabled</span>.\';}">Auto-WOOT!: <span style=\'color:rgb(233,6,6);\'>Disabled</span>.</button>';
        d.innerHTML += '<form>'+
    '<input type="checkbox" name="MEH-list" checked="checked" onclick="Javascript:if(typeof(hhb_mehlist_on) !==\'undefined\'){hhb_mehlist_on=!hhb_mehlist_on;}" /> MEH-list '+
    '<input type="checkbox" name="WOOT-list" checked="checked" onclick="Javascript:if(typeof(hhb_wootlist_on) !==\'undefined\'){hhb_wootlist_on=!hhb_wootlist_on;}" /> WOOT!-list<br/>'+
    '<input type="checkbox" name="Undecided-list" onclick="Javascript:if(typeof(hhb_undecidedlist_on) !==\'undefined\'){hhb_undecidedlist_on=!hhb_undecidedlist_on;}" />Undecided-list'+
    '</form>';
    }
    //alert(hhb_auto);
    if(hhb_auto==true)
    {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);//<<simulate mouse click.
        document.getElementById("vote-positive").dispatchEvent(evt);
    }
 
}
 
function hhb_meanlist()
{
    var d = '';
    if(typeof(hhb_meanlistv) === 'undefined')
    {
        hhb_meanlistv = true;
        hhb_autowoot();
        d = document.getElementById('up-next').parentNode.parentNode.parentNode;
        d.innerHTML += '<span id="hhb_meanlist"></span>';
    }
    d = document.getElementById('hhb_meanlist');
    var mehlist = '';
    var wootlist = '';
    var undecidedlist = '';
    var allloaded = true; //<<this does nothing?!
 
    if(typeof(API) === 'undefined' && (typeof(unsafeWindow) !== 'undefined' && typeof(unsafeWindow.API) !== 'undefined'))//this code is to make greasemonkey work :/
    {
        var API = unsafeWindow.API;
        var hhb_mehlist_on = unsafeWindow.hhb_mehlist_on;
        var hhb_wootlist_on = unsafeWindow.hhb_wootlist_on;
        var hhb_undecidedlist_on = unsafeWindow.hhb_undecidedlist_on;
    }
    //alert(typeof(API));
    if(typeof(API) !== 'undefined')
    {
        if(typeof(hhb_meanlistvv) === 'undefined')
        {
            hhb_meanlistvv = true;
        ///dont think this works out-of-the-box with greasemonkey :/ API.addEventListener(API.VOTE_UPDATE, hhb_meanlist); >> http://blog.plug.dj/p/api-documentation.html
        }
 
 
        var a = API.getUsers();
        var totalMEHs = 0;
        var totalWOOTs = 0;
        var totalUNDECIDEDs = 0;
        for(i in a)
        {//thanks to... (forgot)someone for the pointers
            if(a[i].vote == -1)
            {
                totalMEHs++;
                mehlist += "<br/>"+a[i].username+","
            } 
            else if(a[i].vote == +1)
            {
                totalWOOTs++;
                wootlist += "<br/>"+a[i].username+","
            } 
            else
            {
                totalUNDECIDEDs++;
                undecidedlist += "<br/>"+a[i].username+","
            }
        }//remove the last dots? :p
        mehlist = ' ' + totalMEHs.toString()+mehlist.slice(0,-1);
        wootlist = ' ' + totalWOOTs.toString()+wootlist.slice(0,-1);
        undecidedlist = ' ' + totalUNDECIDEDs.toString()+undecidedlist.slice(0,-1);
    } 
    else 
    {
        mehlist = wootlist = undecidedlist = '<br/>waiting for all scripts to load...';
    }
    //dmFyIHN0cj0nPHRhYmxlIGJvcmRlcj0iMSIgc3R5bGU9ImJvcmRlci13aWR0aDoxMHB4O2JvcmRlci1jb2xvcjpyZ2IoMjMzLDYsNik7YmFja2dyb3VuZC1jb2xvcjpyZ2IoMjMzLDYsNik7Ij48dHI+PHRkPk1FSC1saXN0Oic7DQpzdHIrPW1laGxpc3Q7DQpzdHIrPSc8L3RkPjwvdHI+PC90YWJsZT48dGFibGUgYm9yZGVyPSIxIiBzdHlsZT0iYm9yZGVyLXdpZHRoOjEwcHg7Ym9yZGVyLWNvbG9yOnJnYigwLDEzOCw1KTtiYWNrZ3JvdW5kLWNvbG9yOnJnYigwLDEzOCw1KTsiPjx0cj48dGQ+V09PVCEtbGlzdDonOw0Kc3RyKz13b290bGlzdDsNCnN0cis9JzwvdGQ+PC90cj48L3RhYmxlPjx0YWJsZSBib3JkZXI9IjEiIHN0eWxlPSJib3JkZXItd2lkdGg6MTBweDtib3JkZXItY29sb3I6cmdiKDEyOCwxMjgsMTI4KTtiYWNrZ3JvdW5kLWNvbG9yOnJnYigxMjgsMTI4LDEyOCk7Ij48dHI+PHRkPlVuZGVjaWRlZCEtbGlzdDonOw0Kc3RyKz11bmRlY2lkZWRsaXN0Ow0Kc3RyKz0nPC90ZD48L3RyPjwvdGFibGU+Jzs=
    var str = '<div style="position:absolute; top:auto; left:5px">';
    str += '<div class="frame-background">';
    if(hhb_mehlist_on)
    {
        str += '<div style="border:1px solid rgb(233,6,6);"><span style="font-weight:bold">MEH-list:</span>';
        str += mehlist;
        str += '</div>';
    }
    if(hhb_wootlist_on)
    {
        str += '<div style="border:1px solid rgb(0,138,5); border-top:0px;"><span style="font-weight:bold">WOOT!-list:</span>';
        str += wootlist;
        str += '</div>';
    }
    if(hhb_undecidedlist_on)
    {
        str += '<div style="border:1px solid rgb(128,128,128); border-top:0px;"><span style="font-weight:bold">Undecided!-list:</span>';
        str += undecidedlist;
        str += '</div>';
    }
    str += '</div></div>';
    d.innerHTML = str;
}
hhb_meanlist();
setInterval(hhb_meanlist, 5000);
setInterval(hhb_autowoot, 60000);