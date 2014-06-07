// ==UserScript==
// @name       cdv by tidus
// @version    0.2
// @match      http://www.jeuxvideo.com/profil/*
// ==/UserScript==
var url = "http://www.jeuxvideo.com/profil/ajax_cdv_description.php";
function cdv() {
 
var date=new Date()
if (date.getSeconds() < 10) {
var secondes = '0'+date.getSeconds();
}
else {
        var secondes = date.getSeconds();
}
if (date.getHours() < 10) {
var he = '0'+date.getHours();
}
else {
var     he = date.getHours();
}
if (date.getMinutes() < 10) {
var min = '0'+date.getMinutes();
}
else {
        var min = date.getMinutes();
}
    var req = new XMLHttpRequest();
req.open('GET', 'http://www.jeuxvideo.com/messages-prives/get_message_nonlu.php?skipmc=1/', true);
req.onreadystatechange = function () {
    if (req.readyState == 4) {
    if(req.status == 200){
     console.log(req.responseText);
    var mp = req.responseText;
        mp = mp.split(':')[1].split('}')[0];
   
var horr = he+":"+min+":"+secondes;
        var mess = 'Il est :cd:'+horr+":cd: \n J'ai "+mp+" MP :noel:";
var data = "action=save&donnees="+mess+"&hash_cdv="+unsafeWindow.hash_cdv+"&time_cdv="+unsafeWindow.time_md5;
        var xhr = new XMLHttpRequest();
                                        xhr.open('POST', url, true);
                                        xhr.setRequestHeader('Content-Type',
'application/x-www-form-urlencoded');
                                        xhr.onload = function()
                                        {
                                               
                                                                                       
                                                console.log('done');
                                        }
                                        xhr.send(data);
                               
  }
}
};
req.send(null); 
}
setInterval(cdv,1000);