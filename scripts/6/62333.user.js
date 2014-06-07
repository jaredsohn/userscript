// ==UserScript==
// @name           TH auto enter chat
// @namespace      http://userscripts.org/users/29327/scripts
// @description    Automatically enters chat when logging in
// @include        *twilightheroes.com/chat/index.php
// @include        *twilightheroes.com/chat/chat_chat.php
// ==/UserScript==

var x=document.getElementById('txt_message');
if(x==null)
  window.location.href = 'http://' + window.location.host + '/chat/chat_chat.php';
else{
  x.value='/day';
  document.getElementById('btn_send_chat').click();
}