// --------------------------------------------------------------------
// Se precisar me contactar use: williantg(a)gmail.com 
// --------------------------------------------------------------------

// ==UserScript==
// @name           DX auto SKU.1888 insert 
// @namespace      http://www.multitralhas.net 
// @description    This script inserts the item SKU.1888 at your cart.
// @include        http://www.dealextreme.com/shoppingcart.dx
// @include        http://www.dealextreme.com/shoppingcart.dx/*
// ==/UserScript==


 str="01888";
 if (parseInt(navigator.appVersion)<4) return;
 var strFound;
 if (window.find) {

  // CODE FOR BROWSERS THAT SUPPORT window.find

  strFound=self.find(str);
  if (strFound && self.getSelection && !self.getSelection().anchorNode) {
   strFound=self.find(str)
  }
  if (!strFound) {
   strFound=self.find(str,0,1)
   while (self.find(str,0,1)) continue
  }
 }
 
 if (!strFound) location.href='http://www.dealextreme.com/shoppingcart.dx/add.1888~quantity.1';


