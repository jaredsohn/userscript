   1.  // ==UserScript==
   2. // @name           aakash's Automatic Orkut Fake Profile Creator
   3. // @author         Asad| Org by Mr Nobody
   4. // @description    Creates fake accounts in ORKUT, just enter how many accounts you want to create and the word verification
   5. // @version        1.1
   6. // @include        *
   7.
   8. // ==/UserScript==
   9.
  10.
  11. var cmmid="42311082";             /*cmm id which u want ur fake to join*/
  12. var uid="4567990425097417026";   /*uid of the profile which u want to add*/
  13. var fname="Xtreme";            /*first name*/
  14. var lname="Dominatorz";                  /*last name*/
  15. var email1="Devilz";                  /*first part of ur email id*/
  16. var email2="india.co.in";        /*last part of ur email id*/
  17. var password="9956076084";      /*password(atleast 8 characters)*/
  18. var c="91";                       /*COUNTRY,91 for india,154 for pakistan */
  19.
  20. /* dont edit anything below*/
  21.
  22. if(window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0&hl=en-US&rm=false&passive=true" || window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0%26page%3Dhttp%253A%252F%252Fwww.orkut.com%252F&hl=en-US&rm=false&passive=true")
  23. {
  24. window.location="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en";
  25. }
  26.
  27. if(window.location=="http://www.orkut.com/Terms.aspx?mode=signup")
  28. {
  29. var nbb=document.forms[0].elements[2].click();void(0)
  30. }
  31.
  32. if(window.location=="https://www.google.com/accounts/CreateAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en")
  33. {
  34. window.location=window.document.links[4].href;
  35. }
  36.
  37. if(window.location=="http://www.orkut.com/EditSummary.aspx?mode=signup")
  38. {
  39. document.forms[2].elements[6].checked="true";document.forms[2].elements[36].checked="true";var newOption = document.createElement('option');newOption.selected="selected";newOption.value =c;document.getElementById('country').add(newOption, null);
  40. window.addEventListener("load", function(e) {
  41. document.location.href="javascript:_submitForm(document.forms[2], 'update', '');void(0)";
  42. }, false);
  43. }
  44.
  45. //write cookie
  46. function createCookie(value)
  47. {
  48.      document.cookie = "Keshav="+value+"; ";
  49. }
  50.
  51. //read cookie
  52. function readCookie()
  53. {
  54.      var ca = document.cookie.split(';');
  55.      var c;
  56.      var val;
  57.      var coop ;
  58.      coop=0;
  59.    
  60.      for(var i=0;i < ca.length;i++)
  61.      {
  62.          c = ca[i];
  63.          while (c.charAt(0)==' ')
  64.          {
  65.              c = c.substring(1,c.length);
  66.              if (c.indexOf("Keshav=") == 0)
  67.              {
  68.                  val=(c.substring(7,c.length));
  69.                  coop=1;
  70.              }
  71.          }
  72.      }
  73.      //if cookie not present
  74.      if (coop==0)
  75.      {
  76.      createCookie(0);
  77.      }
  78.          //for the case when the cookie was not present
  79.          var ca = document.cookie.split(';');
  80.      for(var i=0;i < ca.length;i++)
  81.      {
  82.          c = ca[i];
  83.         while (c.charAt(0)==' ')
  84.          {
  85.              c = c.substring(1,c.length);
  86.              if (c.indexOf("Keshav=") == 0)
  87.             {
  88.                  val=(c.substring(7,c.length));
  89.                  coop=1;
  90.              }
  91.          }
  92.      }
  93.      return (val);
  94. }
  95.
  96.
  97. if(window.location=="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en")
  98. {
  99.      var i;
 100.      i= readCookie();
 101.      if (i<=0)
 102.     {
 103.          var noacc
 104.          noacc = prompt('How many accounts do you want to create??','10');
 105.          createCookie(noacc);
 106.          i= readCookie();
 107.      }
 108.      document.forms[0].elements[7].value=email1 + i + "@" + email2 ;
 109.      document.forms[0].elements[5].value=fname;document.forms[0].elements[6].value=lname;
 110.      document.forms[0].elements[8].value=password;
 111.      document.forms[0].elements[9].value=password;
 112.      i=i-1;
 113.      createCookie(i);
 114.
 115.      document.forms[0].elements[20].focus();
 116.      window.location="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en#noEm";
 117.
 118. }
 119.
 120. if(window.location=="http://www.google.com/accounts/TOS?hl=en-US")
 121. {
 122. window.location="http://www.orkut.com/EditSummary.aspx?mode=signup";
 123. }
 124.
 125. if(window.location=="http://www.orkut.com/Home.aspx?mode=signup")
 126. {
 127. window.location="http://www.orkut.com/Profile.aspx?uid=6269360632092489426";
 128. }
 129.
 130. if(window.location=="http://www.orkut.com/Profile.aspx?uid=6269360632092489426")
 131. {
 132. i=0;document.body.innerHTML+='<iframe name="nobody" width="1" height="1"/>';document.body.innerHTML+='<iframe name="nobody1" width="1" height="1"/>'; nb=document.forms[1];nb.target="nobody"; nb.action='FriendAdd.aspx?Action.yes&uid='+uid; nb.submit();nb1=document.forms[1];nb1.target="nobody1"; nb1.action='CommunityJoin.aspx?Action.join&cmm='+cmmid; nb1.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 133. }
 134.
 135. if(window.location=="https://www.google.com/accounts/ResendVerifyEmail?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en&t=null")
 136. {
 137. window.location=window.document.links[5].href;
 138. }