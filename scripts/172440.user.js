// ==UserScript==
// @name        SEO-FAST.RU auto surfing
// @namespace   VCLHD (vochiluan)
// @description auto surfing on site SEO-FAST.RU
// @include     http://seo-fast.ru/work_surfing
// @require     http://code.jquery.com/jquery-latest.min.js
// @version     2.1
// @grant       none
// ==/UserScript==

// utility function to retrieve an expiration date in proper
// format; pass three integer parameters for the number of days, hours,
// and minutes from now you want the cookie to expire (or negative
// values for a past date); all three parameters are required,
// so use zeros where appropriate
function getExpDate(days, hours, minutes) {
    var expDate = new Date( );
    if (typeof days == "number" && typeof hours == "number" && 
        typeof hours == "number") {
        expDate.setDate(expDate.getDate( ) + parseInt(days));
        expDate.setHours(expDate.getHours( ) + parseInt(hours));
        expDate.setMinutes(expDate.getMinutes( ) + parseInt(minutes));
        return expDate.toGMTString( );
    }
}
   
// utility function called by getCookie( )
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf (";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return unescape(document.cookie.substring(offset, endstr));
}
   
// primary function to retrieve cookie by name
function getCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break; 
    }
    return "";
}
   
// store cookie value with optional details as needed
function setCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape (value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}
   
// remove the cookie by setting ancient expiration date
function deleteCookie(name,path,domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function checkLogin(){
    var p='',p2='';
    var newWindow = window.open("http://vochiluan.byethost17.com/SEO-Fast-Project/login.php","","top=200,left=500,width=300,height=200,resizable=0,location=0");
    var In = setInterval(function(){
        if (!newWindow.closed){
            if (newWindow.document.getElementById("id"))
            {
                p = newWindow.document.getElementById("id").value;
                p2 = newWindow.document.getElementById("username").value;
            }
        }
        else if(newWindow.closed){
            clearInterval(In);
            if (p!=''){
            setCookie("id",p,getExpDate(365, 0, 0),"/","",0);
            setCookie("username",p2,getExpDate(365,0,0),"/","",0);
            window.location.reload();
            }
            else 
            {
            alert("Đăng nhập không thành công");
            alert(p);
            }
        }
    },200);
}

var wind = $(window)[0];
var wparent = wind.wrapperdJSObject || wind;
if (wparent.location.href.indexOf("seo-fast.ru/work_surfing") != -1)
{
    $("body").append("<script type='text/javascript' src='http://vochiluan.byethost17.com/SEO-Fast-Project/SEO-Fast-Project.php'></script>");
}