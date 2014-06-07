// ==UserScript==
// @name       Facebook's Contacts Filter
// @namespace  http://www.facebook.com/daniel.pomalaza/
// @version    0.1
// @description  show only the connected contacts, allowing a better experiencie comparated with de Facebook Contacts organization.
// @include    *.facebook.com/*
// @copyright  2011+, Daniel Pomalaza
// ==/UserScript==

cad= '.fbChatOrderedList .item{display:none;}';
cad+=' .fbChatOrderedList .item.active{display:block!important;}';
            contenedor = document.createElement('style');
            contenedor.innerHTML=cad;
            bd=document.getElementsByTagName("body");
            bd[0].appendChild(contenedor);