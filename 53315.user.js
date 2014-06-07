// ==UserScript==
// @name           test
// @description    
// @include        http://darkthrone.com/attack/index/*
// @author	   			
// @version	   	
// ==/UserScript==

var txtBox=document.getElementById("turns" );
if (txtBox!=null ) txtBox.focus();
txtBox.value = "10";