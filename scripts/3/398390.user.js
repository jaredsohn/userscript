// ==UserScript==
// @name           xat's "Social" Bar.
// @namespace      Awesomesauce?
// @description    Social bar for xat webchats.. Allows docking/undocking, and returning to top of page.
// @include        *://xat.com/*
// @exclude        *://xat.com/web_gear/*
// @icon            
// @version        0010
// ==/UserScript==


var a = document.getElementsByClassName('btext2')[0];a.setAttribute('style', 'position: fixed; bottom: 0px; filter: alpha (opacity=90);');a.setAttribute('id', 'x_SocialBar');var b = document.getElementsByTagName('body')[0];b.setAttribute('id', 'top');var c = a.getElementsByTagName('td')[6];c.setAttribute('align', 'right');c.innerHTML = '<a href=\"javascript:void(0);\" name=\"x\" onclick=\"docking()\" style=\"color:#FF0000;\" id=\"dock\"><b>X</b></a></td>\n<td>&nbsp;</td>\n<td width=\"10\">&nbsp;</td>\n<td><a href=\"#\">Top</a></td>\n<td>&nbsp;</td>\n<td width=\"10\">&nbsp;</td>';var x_script = document.createElement("script");x_script.type = "text/javascript";x_script.innerHTML = "function docking() {var a = document.getElementById('x_SocialBar');var d = document.getElementById('dock');if(d.getAttribute('name')=='x'){d.innerHTML = '<b>__</b>';d.removeAttribute('style');d.removeAttribute('name');d.setAttribute('style', 'color:#00FF00;');d.setAttribute('name', '__');a.removeAttribute('style');a.setAttribute('style', 'filter: alpha (opacity=90);')}else if(d.getAttribute('name')=='__'){d.innerHTML='<b>X</b>';d.removeAttribute('style');d.removeAttribute('name');d.setAttribute('style', 'color:#FF0000');d.setAttribute('name', 'x');a.removeAttribute('style');a.setAttribute('style', 'position: fixed; bottom: 0px; filter: alpha (opacity=90);');;}};";document.head.appendChild(x_script);