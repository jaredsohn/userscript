// ==UserScript==
// @name           Chau atajos del teclado de Taringa!
// @description    Si tenes algun flash en el mi, cuando apretas las letras 'c', 's', 'n' o 'p' se te va el foco
// @namespace      http://castg.com.ar
// @include        *.taringa.net/mi
// @version        0.1
// @author         Incasoft / Castg!
// ==/UserScript==
unsafeWindow.$(unsafeWindow).unbind('keyup');