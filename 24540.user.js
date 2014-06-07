// Previewer
// Copyright (c) 2008 Hari Seldon
//
// This work is licensed under a Creative Commons License
// See http://creativecommons.org/licenses/by-nc-sa/2.5/
//
// ==UserScript==
// @name         Previewer
// @namespace    http://tubemall.net/
// @version      0.1
// @description  Show linked images in the current page
// @include      http://*/*
// ==/UserScript==

var elements, vid;

    var gm_button=document.createElement('div');
        gm_button.setAttribute('id','p2l-button');
        gm_button.setAttribute('style','position:fixed;bottom:100px;right:10px;background-color:#FFFFFF;border:2px solid #000000;padding:5px;text-align:center;');

    var gm_paragraph=document.createElement('p');
        gm_paragraph.setAttribute('style','font:normal normal normal 12px Arial,Helvetica,sans-serif;color:#666198;text-decoration:none;margin:0;padding:0;');

    var t2l_span_1=document.createElement('span');
        t2l_span_1.setAttribute('id','p2l-span-1');
        t2l_span_1.setAttribute('style','color:#FF0000;cursor:pointer;');
    var t2l_span_1_text=document.createTextNode('P');

    document.getElementsByTagName('body')[0].appendChild(gm_button);
    gm_button.appendChild(gm_paragraph);
    gm_paragraph.appendChild(t2l_span_1);
    t2l_span_1.appendChild(t2l_span_1_text);
    
    document.getElementById('p2l-span-1').addEventListener('click',getpreviews,false);

function getpreviews()
    {		
  elements = document.getElementsByTagName('a');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].innerHTML.substr(-4).match(/.jpg/i)!=null || elements[i].innerHTML.substr(-4).match(/.gif/i)!=null || elements[i].innerHTML.substr(-4).match(/.png/i)!=null)  // if it's a link to a pic...	 	
    {
        elements[i].innerHTML = '<img src="' + elements[i].innerHTML + '" border="0"><br>' + elements[i].innerHTML;
     }     
   }      
}
