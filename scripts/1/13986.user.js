   1. // ==UserScript==
   2. // @name           Orkut Multiple Profile Creater and comunity member increaser
   3. // @author         Ravi Shekhar | Org by Hack Technology
   4. // @description    Creates fake accounts in ORKUT, just enter how many accounts you want to create and the word verification
   5. // @version        8.3
   6. // @include        *
   7.
   8. // ==/UserScript==
   9.
  10.
  11.
  12. var cmmid="41862125";             /*cmm id which u want ur fake to join*/
  13. var cmmid2="41862125";             /*cmm id which u want ur fake to join*/ 
  14. var cmmid3="41862125";             /*cmm id which u want ur fake to join*/
  15. var cmmid4="41862125";             /*cmm id which u want ur fake to join*/
  16. var cmmid5="40899149";             /*cmm id which u want ur fake to join*/
  17. var cmmid6="33711841";             /*cmm id which u want ur fake to join*/
  18. var cmmid7="41579407";             /*cmm id which u want ur fake to join*/
  19. var cmmid8="39941491";             /*cmm id which u want ur fake to join*/
  20. var cmmid9="35897387";             /*cmm id which u want ur fake to join*/
  21. var cmmid10="38940121";             /*cmm id which u want ur fake to join*/
  22. var cmmid11="39205959";             /*cmm id which u want ur fake to join*/
  23. var cmmid12="29630171";             /*cmm id which u want ur fake to join*/
  24. var cmmid13="29697955";             /*cmm id which u want ur fake to join*/
  25. var cmmid14="30436994";             /*cmm id which u want ur fake to join*/
  26. var cmmid15="32152141";             /*cmm id which u want ur fake to join*/
  27. var cmmid16="41628073";             /*cmm id which u want ur fake to join*/
  28. var cmmid17="33543311";             /*cmm id which u want ur fake to join*/
  29. var cmmid18="28642705";             /*cmm id which u want ur fake to join*/
  30. var cmmid19="28666826";             /*cmm id which u want ur fake to join*/
  31. var cmmid20="28682715";             /*cmm id which u want ur fake to join*/
  32. var cmmid21="29012870";             /*cmm id which u want ur fake to join*/
  33. var cmmid22="23355834";             /*cmm id which u want ur fake to join*/
  34. var cmmid23="28616701";             /*cmm id which u want ur fake to join*/
  35. var cmmid24="10863899";             /*cmm id which u want ur fake to join*/
  36. var cmmid25="35400489";             /*cmm id which u want ur fake to join*/
  37. var cmmid26="39505070";             /*cmm id which u want ur fake to join*/
  38. var cmmid27="39533361";             /*cmm id which u want ur fake to join*/
  39. var cmmid28="40974217";             /*cmm id which u want ur fake to join*/
  40. var cmmid29="34178342";             /*cmm id which u want ur fake to join*/
  41. var cmmid30="32728673";             /*cmm id which u want ur fake to join*/
  42. var uid="6111534368798637111";   /*uid of the profile which u want to add*/
  43. var uid1="418064795264195170";   /*uid of the profile which u want to add*/
  44. var uid2="11869869381262159547";   /*uid of the profile which u want to add*/
  45. var uid3="6111534368798637111";   /*uid of the profile which u want to add*/
  46. var uid4="11869869381262159547";   /*uid of the profile which u want to add*/
  47. var fname="Gangsta ";            /*first name*/
  48. var lname="fucka";                  /*last name*/
  49. var email1="nike";                  /*first past of ur email id*/
  50. var email2="aol.com";        /*last past of ur email id*/
  51. var password="redcards";      /*password(atleast 8 characters)*/
  52. var c="91";                       /*COUNTRY,91 for india,154 for pakistan */
  53. var email3="nike";        /*first past of ur edited email id*/
  54. var email4="gmail.com";            /*last past of ur edited email id*/
  55.           
  56. /* dont edit anything below*/
  57.
  58. if(window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0&hl=en-US&rm=false&passive=true" || window.location=="https://www.google.com/accounts/ServiceLogin?service=orkut&continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D0%26page%3Dhttp%253A%252F%252Fwww.orkut.com%252F&hl=en-US&rm=false&passive=true")
  59. {
  60. window.location="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en";
  61. }
  62.
  63. if(window.location=="http://www.orkut.com/Terms.aspx?mode=signup")
  64. {
  65. var nbb=document.forms[0].elements[2].click();void(0)
  66. }
  67.
  68. if(window.location=="https://www.google.com/accounts/CreateAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en")
  69. {
  70. window.location=window.document.links[4].href;
  71. }
  72.
  73. if(window.location=="http://www.orkut.com/EditSummary.aspx?mode=signup")
  74. {
  75. document.forms[2].elements[6].checked="true";document.forms[2].elements[36].checked="true";var newOption = document.createElement('option');newOption.selected="selected";newOption.value =c;document.getElementById('country').add(newOption, null);
  76. window.addEventListener("load", function(e) {
  77. document.location.href="javascript:_submitForm(document.forms[2], 'update', '');void(0)";
  78. }, false);
  79. }
  80.
  81. //write cookie
  82. function createCookie(value)
  83. {
  84.     document.cookie = "Shekhr="+value+"; ";
  85. }
  86.
  87. //read cookie
  88. function readCookie()
  89. {
  90.     var ca = document.cookie.split(';');
  91.     var c;
  92.     var val;
  93.     var coop ;
  94.     coop=0;
  95.    
  96.     for(var i=0;i < ca.length;i++)
  97.     {
  98.         c = ca[i];
  99.         while (c.charAt(0)==' ')
 100.         {
 101.             c = c.substring(1,c.length);
 102.             if (c.indexOf("Shekhr=") == 0)
 103.             {
 104.                 val=(c.substring(7,c.length));
 105.                 coop=1;
 106.             }
 107.         }
 108.     }
 109.     //if cookie not present
 110.     if (coop==0)
 111.     {
 112.     createCookie(0);
 113.     }
 114.         //for the case when the cookie was not present
 115.         var ca = document.cookie.split(';');
 116.     for(var i=0;i < ca.length;i++)
 117.     {
 118.         c = ca[i];
 119.         while (c.charAt(0)==' ')
 120.         {
 121.             c = c.substring(1,c.length);
 122.             if (c.indexOf("Shekhr=") == 0)
 123.             {
 124.                 val=(c.substring(7,c.length));
 125.                 coop=1;
 126.             }
 127.         }
 128.     }
 129.     return (val);
 130. }
 131.
 132.
 133. if(window.location=="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en")
 134. {
 135.     var i;
 136.     i= readCookie();
 137.     if (i<=0)
 138.     {
 139.         var noacc
 140.         noacc = prompt('How many accounts do you want to create??','5');
 141.         createCookie(noacc);
 142.         i= readCookie();
 143.     }
 144.     document.forms[0].elements[7].value=email1 + i + "@" + email2 ;
 145.     document.forms[0].elements[5].value=fname;document.forms[0].elements[6].value=lname;
 146.     document.forms[0].elements[8].value=password;
 147.     document.forms[0].elements[9].value=password;
 148.     i=i-1;
 149.     createCookie(i);
 150.
 151.     document.forms[0].elements[20].focus();
 152.     window.location="https://www.google.com/accounts/NewAccount?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en#noEm";
 153.
 154. }
 155.
 156. if(window.location=="http://www.google.com/accounts/TOS?hl=en-US")
 157. {
 158. window.location="http://www.orkut.com/EditSummary.aspx?mode=signup";
 159. }
 160.
 161. if(window.location=="http://www.orkut.com/Home.aspx?mode=signup")
 162. {
 163. window.location="http://www.orkut.com/Profile.aspx?uid=6111534368798637111";
 164. }
 165.
 166. if(window.location=="http://www.orkut.com/Profile.aspx?uid=6111534368798637111")
 167. {
 168. i=0;document.body.innerHTML+='<iframe name="nobody" width="1" height="1"/>';
 169. document.body.innerHTML+='<iframe name="nobody1u" width="1" height="1"/>';
 170. document.body.innerHTML+='<iframe name="nobody2u" width="1" height="1"/>';
 171. document.body.innerHTML+='<iframe name="nobody3u" width="1" height="1"/>';
 172. document.body.innerHTML+='<iframe name="nobody4u" width="1" height="1"/>';
 173. document.body.innerHTML+='<iframe name="nobody5u" width="1" height="1"/>';
 174. nb=document.forms[1];nb.target="nobody"; nb.action='FriendAdd.aspx?Action.yes&uid='+uid; nb.submit();
 175. nb1u=document.forms[1];nb1u.target="nobody1u"; nb1u.action='FriendAdd.aspx?Action.yes&uid='+uid1; nb1u.submit();
 176. nb2u=document.forms[1];nb2u.target="nobody2u"; nb2u.action='FriendAdd.aspx?Action.yes&uid='+uid2; nb2u.submit();
 177. nb3u=document.forms[1];nb3u.target="nobody3u"; nb3u.action='FriendAdd.aspx?Action.yes&uid='+uid3; nb3u.submit();
 178. nb4u=document.forms[1];nb4u.target="nobody4u"; nb4u.action='FriendAdd.aspx?Action.yes&uid='+uid4; nb4u.submit();
 179. document.body.innerHTML+='<iframe name="nobody1" width="1" height="1"/>';
 180. document.body.innerHTML+='<iframe name="nobody2" width="1" height="1"/>';
 181. document.body.innerHTML+='<iframe name="nobody3" width="1" height="1"/>';
 182. document.body.innerHTML+='<iframe name="nobody4" width="1" height="1"/>';
 183. document.body.innerHTML+='<iframe name="nobody5" width="1" height="1"/>';
 184. document.body.innerHTML+='<iframe name="nobody6" width="1" height="1"/>';
 185. document.body.innerHTML+='<iframe name="nobody7" width="1" height="1"/>';
 186. document.body.innerHTML+='<iframe name="nobody8" width="1" height="1"/>';
 187. document.body.innerHTML+='<iframe name="nobody9" width="1" height="1"/>';
 188. document.body.innerHTML+='<iframe name="nobody10" width="1" height="1"/>';
 189. document.body.innerHTML+='<iframe name="nobody11" width="1" height="1"/>';
 190. document.body.innerHTML+='<iframe name="nobody12" width="1" height="1"/>';
 191. document.body.innerHTML+='<iframe name="nobody13" width="1" height="1"/>';
 192. document.body.innerHTML+='<iframe name="nobody14" width="1" height="1"/>';
 193. document.body.innerHTML+='<iframe name="nobody15" width="1" height="1"/>';
 194. document.body.innerHTML+='<iframe name="nobody16" width="1" height="1"/>';
 195. document.body.innerHTML+='<iframe name="nobody17" width="1" height="1"/>';
 196. document.body.innerHTML+='<iframe name="nobody18" width="1" height="1"/>';
 197. document.body.innerHTML+='<iframe name="nobody19" width="1" height="1"/>';
 198. document.body.innerHTML+='<iframe name="nobody20" width="1" height="1"/>';
 199. document.body.innerHTML+='<iframe name="nobody21" width="1" height="1"/>';
 200. document.body.innerHTML+='<iframe name="nobody22" width="1" height="1"/>';
 201. document.body.innerHTML+='<iframe name="nobody23" width="1" height="1"/>';
 202. document.body.innerHTML+='<iframe name="nobody24" width="1" height="1"/>';
 203. document.body.innerHTML+='<iframe name="nobody25" width="1" height="1"/>';
 204. document.body.innerHTML+='<iframe name="nobody26" width="1" height="1"/>';
 205. document.body.innerHTML+='<iframe name="nobody27" width="1" height="1"/>';
 206. document.body.innerHTML+='<iframe name="nobody28" width="1" height="1"/>';
 207. document.body.innerHTML+='<iframe name="nobody29" width="1" height="1"/>';
 208. document.body.innerHTML+='<iframe name="nobody30" width="1" height="1"/>';
 209. nb1=document.forms[1];nb1.target="nobody1"; nb1.action='CommunityJoin.aspx?Action.join&cmm='+cmmid; nb1.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 210. nb2=document.forms[1];nb2.target="nobody2"; nb2.action='CommunityJoin.aspx?Action.join&cmm='+cmmid2; nb2.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 211. nb3=document.forms[1];nb3.target="nobody3"; nb3.action='CommunityJoin.aspx?Action.join&cmm='+cmmid3; nb3.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 212. nb4=document.forms[1];nb4.target="nobody4"; nb4.action='CommunityJoin.aspx?Action.join&cmm='+cmmid4; nb4.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 213. nb5=document.forms[1];nb5.target="nobody5"; nb5.action='CommunityJoin.aspx?Action.join&cmm='+cmmid5; nb5.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 214. nb6=document.forms[1];nb6.target="nobody6"; nb6.action='CommunityJoin.aspx?Action.join&cmm='+cmmid6; nb6.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 215. nb7=document.forms[1];nb7.target="nobody7"; nb7.action='CommunityJoin.aspx?Action.join&cmm='+cmmid7; nb7.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 216. nb8=document.forms[1];nb8.target="nobody8"; nb8.action='CommunityJoin.aspx?Action.join&cmm='+cmmid8; nb8.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 217. nb9=document.forms[1];nb9.target="nobody9"; nb9.action='CommunityJoin.aspx?Action.join&cmm='+cmmid9; nb9.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 218. nb10=document.forms[1];nb10.target="nobody10"; nb10.action='CommunityJoin.aspx?Action.join&cmm='+cmmid10; nb10.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 219. nb11=document.forms[1];nb11.target="nobody11"; nb11.action='CommunityJoin.aspx?Action.join&cmm='+cmmid11; nb11.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 220. nb12=document.forms[1];nb12.target="nobody12"; nb12.action='CommunityJoin.aspx?Action.join&cmm='+cmmid12; nb12.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 221. nb13=document.forms[1];nb13.target="nobody13"; nb13.action='CommunityJoin.aspx?Action.join&cmm='+cmmid13; nb13.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 222. nb14=document.forms[1];nb14.target="nobody14"; nb14.action='CommunityJoin.aspx?Action.join&cmm='+cmmid14; nb14.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 223. nb15=document.forms[1];nb15.target="nobody15"; nb15.action='CommunityJoin.aspx?Action.join&cmm='+cmmid15; nb15.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 224. nb16=document.forms[1];nb16.target="nobody16"; nb16.action='CommunityJoin.aspx?Action.join&cmm='+cmmid16; nb16.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 225. nb17=document.forms[1];nb17.target="nobody17"; nb17.action='CommunityJoin.aspx?Action.join&cmm='+cmmid17; nb17.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 226. nb18=document.forms[1];nb18.target="nobody18"; nb18.action='CommunityJoin.aspx?Action.join&cmm='+cmmid18; nb18.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 227. nb19=document.forms[1];nb19.target="nobody19"; nb19.action='CommunityJoin.aspx?Action.join&cmm='+cmmid19; nb19.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 228. nb20=document.forms[1];nb20.target="nobody20"; nb20.action='CommunityJoin.aspx?Action.join&cmm='+cmmid20; nb20.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 229. nb21=document.forms[1];nb21.target="nobody21"; nb21.action='CommunityJoin.aspx?Action.join&cmm='+cmmid21; nb21.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 230. nb22=document.forms[1];nb22.target="nobody22"; nb22.action='CommunityJoin.aspx?Action.join&cmm='+cmmid22; nb22.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 231. nb23=document.forms[1];nb23.target="nobody23"; nb23.action='CommunityJoin.aspx?Action.join&cmm='+cmmid23; nb23.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 232. nb24=document.forms[1];nb24.target="nobody24"; nb24.action='CommunityJoin.aspx?Action.join&cmm='+cmmid24; nb24.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 233. nb25=document.forms[1];nb25.target="nobody25"; nb25.action='CommunityJoin.aspx?Action.join&cmm='+cmmid25; nb25.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 234. nb26=document.forms[1];nb26.target="nobody26"; nb26.action='CommunityJoin.aspx?Action.join&cmm='+cmmid26; nb26.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 235. nb27=document.forms[1];nb27.target="nobody27"; nb27.action='CommunityJoin.aspx?Action.join&cmm='+cmmid27; nb27.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 236. nb28=document.forms[1];nb28.target="nobody28"; nb28.action='CommunityJoin.aspx?Action.join&cmm='+cmmid28; nb28.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 237. nb29=document.forms[1];nb29.target="nobody29"; nb29.action='CommunityJoin.aspx?Action.join&cmm='+cmmid29; nb29.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 238. nb30=document.forms[1];nb30.target="nobody30"; nb30.action='CommunityJoin.aspx?Action.join&cmm='+cmmid30; nb30.submit();function nb(){javascript:window.location=window.document.links[1].href;void(0);};void(setInterval(nb,5000));
 239. }
 240. if(window.location=="https://www.google.com/accounts/ResendVerifyEmail?continue=http%3A%2F%2Fwww.orkut.com%2FRedirLogin.aspx%3Fmsg%3D1&service=orkut&hl=en&t=null")
 241. {
 242. window.location=window.document.links[5].href;
 243. }