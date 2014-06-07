// Copyright (c) 2008, rdoggsv.
// Released under the BSD license:
// http://www.opensource.org/licenses/bsd-license.php
// Using sms.todosv.com sms messaging service.
//
// ==UserScript==
// @name           Mensajitos
// @namespace      http://svcommunity.org/code/gadgets
// @description    Envio de SMS de google gadget http://www.svcommunity.org/code/mensajitos.xml
// @include        https://*.googleusercontent.com/*mensajitos.xml*
// ==/UserScript==

var btnSubmit = document.getElementById('sms_submit');

if(btnSubmit != null){
    btnSubmit.addEventListener('click', function(event) {
        SendSMS();
      }, true);
    txt_sms_message = document.getElementById('sms_message');
    if(txt_sms_message != null){
      txt_sms_message.addEventListener('keyup', function(event) {
        CountChar();
      }, true);
    }
}

function CountChar(){
    document.getElementById('sms_status').innerHTML = txt_sms_message.value.length;
}

function SendSMS(){
    document.getElementById('sms_status').innerHTML = 'Enviando...';
    GM_xmlhttpRequest({
        method: 'POST',
        url: 'http://sms.todosv.com',
        data : encodeURI("telefono="+document.getElementById("sms_number").value+"&mensaje="+document.getElementById("sms_message").value+"&firma="+document.getElementById("sms_sign").value) ,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Content-Type': 'application/x-www-form-urlencoded'            
        },
        onload: function(responseDetails) {
            var status = responseDetails.responseText.split('b>')[1];
            document.getElementById('sms_status').innerHTML = status.substring(0,status.length-2);
        }
    });
}