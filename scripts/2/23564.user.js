// ==UserScript==
// @name 'About me Expander' for Orkut (By fenil)
// @author fenil http://www.orkut.com/Profile.aspx?uid=16772656223375861910
// @namespace fenil
// @description Expands section of about me while editing it (for orkut)
// @include http://*.orkut.*/EditSocial.aspx*
// ==/UserScript==

aboutme=document.forms[2].elements[42]; function fenil(){aboutme.rows="75";aboutme.cols="95";}void(setInterval(fenil,0));

//made by fenil (My first script :) )