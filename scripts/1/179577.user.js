// ==UserScript==
// @name        alibaba
// @namespace   copy righted for : boshrast71@yahoo.com
// @description writed by S!Y0U.T4r.6T
// @include     http*://*.alibaba.com/*
// @version     1.0
// @grant       none
// ==/UserScript==
var username = 'think.yan@yahoo.com';
var password = 'jackbauer363636';
var subject = 'subject';
var text = 'hello M.R.<br>how are you?<br>I love you.';
var address=location.pathname;function do_click(){document.getElementById("send").click()}if(location.href=="https://login.alibaba.com/"){setTimeout(function(){document.getElementById('xloginPassportId').value=username;document.getElementById('xloginPasswordId').value=password;document.getElementById('signInButton').click()},8000)}else if(address=="/"){var id=prompt("Please enter the ID.","");if(id!=null){var url=id.split(',');var aString='';for(var i=1;i<=url.length;i++){var win=window.open('http://message.alibaba.com/msgsend/contact.htm?action=contact_action&domain=2&id='+url[i-1],'_blank');win.focus()}}}else{var n=address.match(/msgsend\/contact\.htm/gi);if(n=='msgsend/contact.htm'){document.getElementById('subject').value=subject;document.getElementById('contentMessage').value=text;var myVar=setInterval(function(){do_click()},1000)}}