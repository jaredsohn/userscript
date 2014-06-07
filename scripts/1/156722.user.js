// ==UserScript==
// @name       Fantasy Online wiki frame
// @namespace  http://www.darklan.net/
// @version    0.4
// @description  Opens a frame with the Fantasy online Database
// @match      http://www.fantasy-mmorpg.com/?server*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @copyright  2012+, Emanuele Conti
// ==/UserScript==
function setCookie(cookieName,value,durationDays)
{
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + durationDays);
    var cookieValue = escape(value) + ((durationDays==null) ? "" : "; expires="+expireDate.toUTCString());
    document.cookie = cookieName + "=" + cookieValue;
}
function getCookie(cookieName)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==cookieName)
        {
            return unescape(y);
        }
    }
}

var collapseState = getCookie("FoDbCollapseState");
function toggleCollapseState() 
{
    if (collapseState == "open")
    	collapseState = "closed";
    else
        collapseState = "open";
    setCookie("FoDbCollapseState", collapseState, 30);
}
function toggleDb()
{
    $('#fodb').toggle();
    toggleCollapseState();
}
if (collapseState == null)
{
    toggleCollapseState();
}
var db = document.createElement('iframe');
$(db).attr('id', 'fodb');
$(db).css('position', 'absolute').css('top', '510px').width('100%').height(document.height - 510 + 'px');
$(db).attr('src', 'http://www.fantasy-mmorpg.com/fowiki/#1419~2').attr('name', 'db');
if (collapseState == "closed") $(db).css('display', 'none');
$('body').append(db);
var closeButton = document.createElement('div');
$(closeButton).css('position', 'absolute').css('bottom', '5px').css('right','5px').css('border', '2px groove lightgray').width('20px').height('20px').css('text-align','center');
$(closeButton).click(toggleDb);
$(closeButton).append(document.createTextNode("X"));
$('body').append(closeButton);