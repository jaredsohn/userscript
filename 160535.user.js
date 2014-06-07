// ==UserScript==
// @name        Politically Incorrect Infowars
// @namespace   infowars.com
// @description Delivers a politically incorrect version of Infowars.com
// @include     http://*.infowars.com/*
// @author      John Woods
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js
// @version     0.0.1
// ==/UserScript==

function politicallyIncorrectFilter(body) {
  body.html( body.html().replace(/Janet Napolitano/gi,'Janet (Disgusting Dyke) Napolitano') );
  body.html( body.html().replace(/Transportation Security Administration/gi,'unconstitutional Transportation Security Administration') );
  body.html( body.html().replace(/Homeland Security/gi,'Communist Homeland Security') );
  body.html( body.html().replace(/Supreme Court/gi,'Corrupt Supreme Court') );
  body.html( body.html().replace(/Barack Obama/gi,'Kenyan born Barack Obama') );
  body.html( body.html().replace(/Democrat/g,'Communist') );
  body.html( body.html().replace(/Feinstein/g,'(That dirty skank) Feinstein') );
  body.html( body.html().replace(/Anonymous/g,'Another Anonymous Bovine') );
  body.html( body.html().replace(/Big Sis/g,'Big Lesbian Sis') );
  body.html( body.html().replace(/Biden/g,'(That mental retard) Biden') );
}

$(document).ready(function() {
  politicallyIncorrectFilter($('body'));
});
