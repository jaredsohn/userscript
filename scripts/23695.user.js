/******************************************************************************
 *
 * Factorydirect Checkstock
 * version 1.0.0 + i
 * 2008-03-08
 * Copyright (c) 2008, Daniel Jors
 * Released under the GPL license, version 2
 * http://www.gnu.org/copyleft/gpl.html
 *
 ******************************************************************************
 * This script changes www.factorydirect.ca pages to include 
 * the stores' item status (out of stock, in stock) as iframes.
 * Wherever a "check stock" button appears, the corresponding iframe is appened
 *
 * drjors2@gmail.com
 *
 */
// ==UserScript==
// @name          Factorydirect CheckStock
// @namespace     http://www.factorydirect.ca/checkstock
// @description   Adds stock information for factorydirect.ca
// @include       http://*factorydirect.ca/*
// @exclude       http://factorydirect.ca/cgi-bin/instock.pl*
// ==/UserScript==
// vim: fdc=4 fdm=marker tabstop=4 :

function getp(node,name){
	if (node.parentNode.nodeName==name)return node.parentNode;
	else return getp(node.parentNode,name);}
function gettd(node){return getp(node,'TD')};
function geta(node) {return getp(node,'A')};
(function()
{
   var imgs,ss,ck;
   imgs = document.getElementsByTagName('IMG'); if (!imgs)return;
   var imgscnt = imgs.length;
   ss='';
   for (var i = 0; i < imgscnt; i++) {
   	var ii=imgs[i];
	if (ii.src.match(/check_stock.gif/)){
		var clk,ptd,aa,newfrm;
		if (clk=ii.getAttribute('onClick'));
			else clk=geta(ii).href;
		ck=/'([^']*)'/.exec(clk)[1];
		newfrm=document.createElement('IFRAME');
		newfrm.setAttribute('src',ck);
		gettd(ii).appendChild(newfrm);
		}
	}
})();

