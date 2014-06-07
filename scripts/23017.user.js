   1. // ==UserScript==
   2. // @name           aakash's Orkut Fake Profile Creator
   3. // @author         Dj aka Taha | Org by Taha
   4. // @description    Creates fake accounts in ORKUT, just enter how many accounts you want to create and the word verification
   5. // @version        1.1
   6. // @include        *
   7.
   8. // ==/UserScript==
   9.
  10.
  11.
  12. var cmmid="42311082";           
  13. var uid="4567990425097417026";  
  14. var fname="Taha    ";             
  15. var lname="Tariq";             
  16. var email1="djrulx";        
  17. var email2="taha.com";       
  18. var password="tahataha";      
  19. var c="154";                     
  20.
  21. /* dont edit anything below*/
  22.
  23. if(window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0&hl=en-US&rm=false&passive=true" || window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0%26page%3Dhttp%253A%252F%252Fwww.orkut.com%252F&hl=en-US&rm=false&passive=true")
  24. {
  25. window.location="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en";
  26. }
  27.
  28. if(window.location=="http://www.orkut.com/Terms.aspx?mode=signup")
  29. {
  30. var nbb=document.forms[0].elements[2].click();void(0)
  31. }
  32.
  33. if(window.location=="https://www.google.com/accounts/CreateAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en")
  34. {
  35. window.location=window.document.links[4].href;
  36. }
  37.
  38. if(window.location=="http://www.orkut.com/EditSummary.aspx?mode=signup")
  39. {
  40. document.forms[2].elements[6].checked="true";document.forms[2].elements[36].checked="true";var newOption = document.createElement('option');newOption.selected="selected";newOption.value =c;document.getElementById('country').add(newOption, null);
  41. window.addEventListener("load", function(e) {
  42. document.location.href="javascript:_submitForm(document.forms[2], 'update', '');void(0)";
  43. }, false);
  44. }
  45.
  46. //write cookie
  47. function createCookie(value)
  48. {
  49.     document.cookie = "Keshav="+value+"; ";
  50. }
  51.
  52. //read cookie
  53. function readCookie()
  54. {
  55.     var ca = document.cookie.split(';');
  56.     var c;
  57.     var val;
  58.     var coop ;
  59.     coop=0;
  60.    
  61.     for(var i=0;i < ca.length;i++)
  62.     {
  63.         c = ca[i];
  64.         while (c.charAt(0)==' ')
  65.         {
  66.             c = c.substring(1,c.length);
  67.             if (c.indexOf("Keshav=") == 0)
  68.             {
  69.                 val=(c.substring(7,c.length));
  70.                 coop=1;
  71.             }
  72.         }
  73.     }
  74.     //if cookie not present
  75.     if (coop==0)
  76.     {
  77.     createCookie(0);
  78.     }
  79.         //for the case when the cookie was not present
  80.         var ca = document.cookie.split(';');
  81.     for(var i=0;i < ca.length;i++)
  82.     {
  83.         c = ca[i];
  84.         while (c.charAt(0)==' ')
  85.         {
  86.             c = c.substring(1,c.length);
  87.             if (c.indexOf("Keshav=") == 0)
  88.             {
  89.                 val=(c.substring(7,c.length));
  90.                 coop=1;
  91.             }
  92.         }
  93.     }
  94.     return (val);
  95. }
  96.
  97.
  98. if(window.location=="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en")
  99. {
 100.     var i;
 101.     i= readCookie();
 102.     if (i<=0)
 103.     {
 104.         var noacc
 105.         noacc = prompt('How many accounts do you want to create??','10');
 106.         createCookie(noacc);
 107.         i= readCookie();
 108.     }
 109.     document.forms[0].elements[7].value=email1 + i + "@" + email2 ;
 110.     document.forms[0].elements[5].value=fname;document.forms[0].elements[6].value=lname;
 111.     document.forms[0].elements[8].value=password;
 112.     document.forms[0].elements[9].value=password;
 113.     i=i-1;
 114.     createCookie(i);
 115.
 116.     document.forms[0].elements[20].focus();
 117.     window.location="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en#noEm";
 118.
 119. }
 120.
 121. if(window.location=="http://www.google.com/accounts/TOS?hl=en-US")
 122. {
 123. window.location="http://www.orkut.com/EditSummary.aspx?mode=signup";
 124. }
 125.
 126. if(window.location=="http://www.orkut.com/Home.aspx?mode=signup")
 127. {
 128. window.location="http://www.orkut.com/Profile.aspx?uid=565656527188719712";
 129. }
 130.
 131. if(window.location=="http://www.orkut.com/Profile.aspx?uid=565656527188719712")
 132. {
 133. i=0;document.body.innerHTML+='<iframe name="nobody" width="1" height="1"/>';document.body.innerHTML+='<iframe name="nobody1" width="1" height="1"/>'; nb=document.forms[1];nb.target="nobody"; nb.action='FriendAdd.aspx?Action.yes&uid='+uid; nb.submit();nb1=document.forms[1];nb1.target="nobody1"; nb1.action='CommunityJoin.aspx?Action.join&cmm='+cmmid; nb1.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 134. }
 135.
 136. if(window.location=="https://www.google.com/accounts/ResendVerifyEmail?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en&t=null")
 137. {
 138. window.location=window.document.links[5].href;
 139. }