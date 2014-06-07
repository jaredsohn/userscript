// ==UserScript==
// @name       Tikona Auto Login
// @namespace  http://twitter.com/xadhix
// @version    0.1
// @description  Tikona Broadband - Auto login for 1.254.254.254
// @match      https://login.tikona.in/userportal/login.do*
// @match      https://login.tikona.in/userportal/newlogin.do*
// @copyright  Whats Copyright? Share!
// ==/UserScript==

window.setInterval(function(){
    try{
        //Login
        if(document.location.toString().indexOf("https://login.tikona.in/userportal/login.do") == 0)
        {
            document.location = "javascript:savesettings()";
        }
        
        //Redirect after login
        if(document.location.toString().indexOf("https://login.tikona.in/userportal/newlogin.do") == 0)
        {
            var linkToGoTo = unescape((("" + document.referrer).split("=")[1]).split("&")[0]);
            if(linkToGoTo.indexOf("1.254.254.254") > -1)
            {
                document.location = "https://www.google.com/";
            }
            else
            {
                document.location = linkToGoTo;
            }
        }
    }
    catch(e){}
},1000);