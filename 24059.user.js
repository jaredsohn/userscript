// ==UserScript==
// @name           Album Hack.
// @author          jaggudada
// @description    Paste the following javascript in your web browser address bar after navigating to the specified orkut page.
// ==/UserScript==

javascript:alert("Wait.. Snaps are loading..");nb=document.all[0].innerHTML.match(/[0-9]*.jpg\)/g);nb=parseInt(nb);document.body.innerHTML="<center><font style='font-size:100'><b>ALBUM SPY<br></b>jaggudada_d_don</font>";for(i=1;i<=100;i++){document.body.innerHTML+='<img src="http://img3.orkut.com/images/milieu/'+i+'/0/'+nb+'.jpg"><br><br><br><br>';};void(0)