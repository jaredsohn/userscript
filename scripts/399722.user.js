// ==UserScript==
// @name          Ignore User - vozForums.com
// @description   Add a link to ignore user into user popup menu in a thread.
// @include       *vozforums.com/showthread.php*
// @exclude       
// @version       1.0
// @date          2014-02-27
// @creator       vitcon
// @credits       vozForums's User.
// @inspiration   This never would have been done without you.
// @grant none
// ==/UserScript==

(function() 
{

	var hdTagA = document.getElementsByTagName('a');
    for(var i = 0; i < hdTagA.length; i++) {
        if(hdTagA[i].innerHTML.match('View Public Profile')) {
            var strUserID=hdTagA[i].href;    
            var userID=strUserID.split("=");
            var ignoreURL="http://vozforums.com/profile.php?do=addlist&userlist=ignore&u=" + userID[1];
            var parentOfA = hdTagA[i].parentNode;
            var parentOfA2 = parentOfA.parentNode;
            var parentOfA3 = parentOfA2.parentNode;
            var parentOfA4 = parentOfA3.parentNode;
            var row = parentOfA4.insertRow();
            var cell = row.insertCell(0);
            cell.setAttribute("style","background-color:red;");
            cell.setAttribute("class","vbmenu_option vbmenu_option_alink");
            cell.innerHTML = "<a style=\"color: yellow; display: block; width: 100%;\" href=\"" + ignoreURL + "\">Ignore this user</a>";
            
        }
    }


})();