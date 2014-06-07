// ==UserScript==
// @name       mp2cdv
// @version    0.4
// @match      http://www.jeuxvideo.com/profil/*
// ==/UserScript==
var url = "http://www.jeuxvideo.com/profil/ajax_cdv_description.php";
function getHorr() {

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
return horr;
}

function getMps(){


    var req = new XMLHttpRequest();
req.open('GET', 'http://www.jeuxvideo.com/messages-prives/get_message_nonlu.php?skipmc=1/', true);
var mp = req.onreadystatechange = function () {
    if (req.readyState == 4) {
    if(req.status == 200){
    
    
 
    var mp = req.responseText;
        mp = mp.split(':')[1].split('}')[0];
    getMess(mp);
    
    
        



  }
}
};
req.send(null);

}

function getMess(mp){

var horr = getHorr();

var mess = 'J\'ai '+mp+" MP :noel:\n\n appii > all :ok: \n \n \n Dernière mise à jour à "+horr;
data(mess);


}

function goPost(data){

     var xhr = new XMLHttpRequest();
                                        xhr.open('POST', url, true);
                                        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                                        
                                        xhr.send(data);
}
function data(mess){


    var data = "action=save&donnees="+mess+"&hash_cdv="+unsafeWindow.hash_cdv+"&time_cdv="+unsafeWindow.time_md5;
    goPost(data);
}

function cdv() {

    getMps();
   
}






if(document.getElementById('msg_visible') !== null)
{
    var ong = document.getElementById('onglets');
    ong.innerHTML = ong.innerHTML+'<li id="ongMp2cdv" ><a id="mp2cdv" href="#">Mp2Cdv</a></li>';
    var mp2cdv = document.getElementById('mp2cdv');
    var onglet = document.getElementById('ongMp2cdv');

    mp2cdv.onclick = function(a)
    {
        a.preventDefault();
        
        alert('Ne quittez ou ne rechargez pas cet page, ou le compteur s\'arrêta.');

        window.onbeforeunload = function (e) {
            var e = e || window.event;
 
 
            if (e) {
                e.returnValue = 'Ne quittez ou ne rechargez pas la cdv !';
            }
 
  
            return 'Ne quittez ou ne rechargez pas la cdv !';
};

        onglet.innerHTML = "Mp2Cdv en cours";

        setInterval(cdv,5000);

        var doc = document.getElementsByTagName('body')[0];


    }
}