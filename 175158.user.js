// ==UserScript==
// @name       cdv by appli'
// @version    0.1
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
var horr = he+":"+min+":"+secondes;
    var mess = 'Il est :cd:'+horr+":cd: \n Noraj' :cool: \n Mes Dédi :hap: \n Dédi Ownage Génération Goldman http://image.noelshack.com/fichiers/2013/15/1365605339-sans-titre-1.png \n 7K Jean masturbin :fete: \n http://puu.sh/3SCBo.png \n Vidéo Drawball 6/8/13 :fete: : \n http://www.youtube.com/watch?v=NWaCqo_eVCQ :";
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
setInterval(cdv,1000);