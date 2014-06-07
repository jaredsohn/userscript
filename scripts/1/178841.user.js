// ==UserScript==
// @name       Economy Userscript
// @namespace  Economy Userscript
// @version    1.0
// @description  Checks the Economy subforums to check for new posts and alerts the user if there are, created by Oscar/osc-rwar/HypnoToad/Gnome
// @include      http://leakforums.org*
// @include      http://*.leakforums.org*
// @updateURL https://userscripts.org/scripts/source/178841.meta.js
// @downloadURL https://userscripts.org/scripts/source/178841.user.js
// @copyright  2013+, Oscar Sanchez
// @icon	http://i.imgur.com/CjzbMSk.png
// @require http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// @require https://googledrive.com/host/0B3djEhxHeikDNkR6MGM4Q3BLenc/cookie.js
// @run-at document-end
// ==/UserScript==

/* Settings to change because I'm a coder, not an asshole.
 * Don't be an asshole and make sure you give credits if you use this.
 * All are required...
 * gn = Group Name
 * gid = Group ID
 * k = Cookie name
 * img = Icon image for menu bar 32 x 32
 * animate = If set to 1, the bar will grow as it loads, so it's slightly more fluid.
 */

gn="Economy",gid=187,k="_eusc",img="http://i.imgur.com/CjzbMSk.png",animate=1/* Stop editing now */,m=".menu li span",n=["c","d","e","f"],i={},r=Date.now();if(getCookie(k)==null){setCookie(k,r+",0"+",0,");s=r+",0"+",0,"}else{s=getCookie(k)}$.each(n,function(a,b){x=s.split(",")[a];i[b]=(x)});var _anim = (animate == 1 ? gn : "null");$("head").append("<style>.li_"+_anim+"{animation: fadein 1s; -webkit-animation: fadein 1s;}@keyframes fadein {0% {width:0;opacity:0} 90% {width:73px;opacity:0.5;} 100% {width:73px;opacity:1;}} @-webkit-keyframes fadein {0% {width:0;opacity:0} 90% {width:73px;opacity:0;} 100% {width:73px;opacity:1;}}.img_"+gn+"{margin-top:-4px;position:relative;margin-right:0}.menu li span{text-align:center;background:#303030;position:absolute;width:15px;right:0;top:0;display:none}.menu li span:hover {background-color:#202020!important}</style>");$(".menu:first li:first").after('<li class="li_'+gn+'" style="width: 73px"><a href="/forumdisplay.php?fid='+gid+'"><img class="img_'+gn+'" src="'+img+'" title="'+gn+'"><span>+</span></a></li>');if((location.search=="?fid="+gid)||($(".navigation a[href*='?fid="+gid+"']").length!=0)){setCookie(k,r+","+i.d+","+i.d+","+"index.php");return}if((r-i.c>1e4)&&((i.d==0)||(!(i.d>i.e)))){$.ajax({url:"/forumdisplay.php?fid=89"}).done(function(a){u=$(a).find('#content a[href*="?fid='+gid+'"]').parent().parent().children("td:eq(3)").html().replace(",","");l=$(a).find('#content a[href*="?fid='+gid+'"]').parent().parent().children("td:eq(4)").find("a:first").attr("href");setCookie(k,r+","+parseInt(u,10)+","+i.e+","+l);if(parseInt(u,10)>i.e){$(m).css("display","block");$(m).attr("onclick","window.location='/"+l+"';return false;")}})}else if(i.d>i.e){$(m).css("display","block");$(m).attr("onclick","window.location='/"+i.f+"';return false;")}