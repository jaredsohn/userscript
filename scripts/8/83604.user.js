// ==UserScript==
// @name           JuniperVpnSslRemoveVirtualKeyboard
// @namespace      http://mdessus.free.fr
// @description    Allows to use the form even if it the VPN SSL admin forces to use the virtual keyboard
// @include        https://*/dana-na/auth/*
// ==/UserScript==
//
// Author: Mathieu Dessus (mdessus@free.fr)
// License: GPL
// Version 1.0

var passInput;
var newInput;

if (document.getElementById('divKeyboard'))  // Do you we have the virt keyboard enabled ?
{
  passInput = document.getElementById('password');
  if (passInput)
  {
    newInput = document.createElement('INPUT');
    newInput.type = 'password';
    newInput.name = "password";
    newInput.id = "password";
    passInput.parentNode.replaceChild(newInput, passInput);
  }
}
