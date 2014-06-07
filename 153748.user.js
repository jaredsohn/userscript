// ==UserScript==
// @name           F2n tko ti gleda profil
// @author         Maniche
// @version        0.1.2
// @namespace      f2n
// @description    Stalkanje više nije moguće
// @include        http://*fer2.net/member.php?u=7753*
// @include        http://*fer2.info/member.php?u=7753*
// @include        http://*fer2.net/online.php*
// @include        http://*fer2.info/online.php*
// NOTES
// Loncar edition
// 
// ==/UserScript==

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
if(window.location.href.indexOf("online.php")>0){
    if(window.location.href.indexOf("stalk")>0){
        alert(1);
        }
    }
else{
    var visitors = document.getElementById('visitors');
    var count_tag = visitors.getElementsByTagName('strong')[0];
    var count = count_tag.innerHTML;
    var stalk = getUrlVars()['stalk'];
    if(count == stalk){
        setTimeout(function(){
            open("http://www.fer2.info/member.php?u=7753&stalk="+count, "_self")
			}, 1000);
    }
    else{
        open("http://www.fer2.net/online.php?order=desc&sort=time&pp=200&page=1&stalk="+count);
		open("http://www.fer2.info/member.php?u=7753&stalk="+count, "_self");
    }
}