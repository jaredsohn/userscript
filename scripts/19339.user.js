   1. // ==UserScript==
   2. // @name          Gmail Account Multi-Login
   3. // @namespace      http://aparna.neil.googlepages.com
   4. // @description    Replaces "Sign out" link on gmail with a select box of accounts.
   5. // @include        http*://*.gmail.com*
   6. // @include        http*://gmail.com*
   7. // ==/UserScript==
   8.
   9. // Load persistent user data
  10. if (!GM_getValue)
  11.     {alert("You need the newest version of Greasemonkey to run this script. Please upgrade."); return;}
  12. unsafeWindow.gmAUTOLOGIN = GM_getValue("autologin");
  13. unsafeWindow.gmUSERNAMES = GM_getValue("usernames", "").split(",");
  14. unsafeWindow.gmPASSWORDS = GM_getValue("passwords", "").split(",");
  15.
  16. // functions
  17. unsafeWindow.GM_setValue = GM_setValue; // Makes these functions public so they can be accessed from the generated inline Javascript.
  18. unsafeWindow.GM_getValue = GM_getValue; // Same here.
  19.
  20. function makeUserList(prefix, numbered)
  21. {
  22.     if(unsafeWindow.gmUSERNAMES[0] == "")
  23.         return "";
  24.     a = "";
  25.     for (i = 0; i < unsafeWindow.gmUSERNAMES.length; i++)
  26.     {
  27.         a += prefix;
  28.         if(numbered)
  29.             a += (i+1) + ") "
  30.         a += unsafeWindow.gmUSERNAMES[i];
  31.     }
  32.     return a;
  33. }
  34.
  35. function initialize()
  36. {
  37. //    unsafeWindow.netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
  38.     selectBox = unsafeWindow.document.createElement("span");
  39.     selectBox.innerHTML = '<form name="gmLoginForm" action="https://www.google.com/accounts/ServiceLoginAuth?service=mail" method="post" style="display:inline;"><select style="font-family:arial,san-serif; font-size:7pt; position:relative; top:2px; padding:0px; height:13px;" name="gmSelectLogin" onchange="i=document.gmLoginForm.gmSelectLogin.selectedIndex-1; len=document.gmLoginForm.gmSelectLogin.length; if((i<len-4)&&(i>=0)){document.gmLoginForm.Email.value=gmUSERNAMES[i]; document.gmLoginForm.Passwd.value=gmPASSWORDS[i]; document.gmLoginForm.submit();} else if(i==len-4){u=prompt(\'Username:\'); p=prompt(\'Password:\'); if((u.indexOf(\',\')!=-1)||(p.indexOf(\',\')!=-1)) {alert(\'Usernames and passwords cannot contain commas.\');} else { if(!GM_getValue(\'autologin\')) {a=confirm(\'Turn on autologin?\'); GM_setValue(\'autologin\', a);} u2 = GM_getValue(\'usernames\',\'\'); if(u2.length>0) {u=u2+\',\'+u; p=GM_getValue(\'passwords\')+\',\'+p;}; GM_setValue(\'usernames\',u); GM_setValue(\'passwords\',p); alert(\'Account added. Refresh the page for changes to take effect.\');} document.gmLoginForm.gmSelectLogin.selectedIndex=0;} else if(i==len-3){u=-1; u=parseInt(prompt(\'Enter the number of the account to be removed:' + makeUserList('\\n', true) + '\')); if((u<1)||(u>gmUSERNAMES.length)) {alert(\'Invalid option.\')} else {u=gmUSERNAMES[u-1]; un=GM_getValue(\'usernames\').split(\',\'); pw=GM_getValue(\'passwords\').split(\',\'); j=-1; for(i=0;i<un.length;i++) {if(un[i]==u) j=i;} if(j==-1) {alert(\'Account appears to have already been removed. Refresh the page to update account list.\');} else {un.splice(j,1); pw.splice(j,1); GM_setValue(\'usernames\',un.join(\',\')); GM_setValue(\'passwords\',pw.join(\',\')); alert(\'Account removed. Refresh the page for the changes to take effect.\');}} document.gmLoginForm.gmSelectLogin.selectedIndex=0;} else if(i==len-2){document.location.href=\'http://mail.google.com/mail/?logout\';}"><option>Change User...' + makeUserList('<option>', false) + '<option>Add Account...<option>Remove Account...<option>Sign Out</select><input type = "hidden" name="continue" value="http://mail.google.com/mail"><input type="hidden" name="PersistentCookie" value="' + unsafeWindow.gmAUTOLOGIN + '"><input type="hidden" name="Email"><input type="hidden" name="Passwd"></form>';
  40.     if (frames.length == 0)
  41.         {f = new Array(unsafeWindow);}
  42.     else
  43.         {f = frames;}
  44.     for (j = 0; j < f.length; j++)
  45.     {
  46.         links = f[j].document.getElementsByTagName("a");
  47.         for (i = 0; i < links.length; i++)
  48.         {
  49.             if (links[i].innerHTML.toLowerCase().indexOf("sign out") != -1)
  50.                 {links[i].parentNode.replaceChild(selectBox, links[i]);}
  51.         }
  52.     }
  53. }
  54.
  55. unsafeWindow.addEventListener('load', initialize, true);
