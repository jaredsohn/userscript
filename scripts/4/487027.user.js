// ==UserScript==
// @name        Howrse Replace Lottery Dark Green Background
// @namespace   myHowrse
// @description Replaces the dark green background with a light green background
// @author      daexion
// @include     http://www.howrse.com/operation/tombola/*
// @version     1
// ==/UserScript==
moduleList = document.getElementsByClassName("module-pattern spacer-large-bottom ra-m pa-m fz-m ba-green-dark bo-n co-green");

for(i = 0;i < moduleList.length;++i)
{
	moduleList[i].setAttribute("class","module-pattern spacer-large-bottom ra-m pa-m fz-m ba-green-light bo-n co-n");
}

// module-pattern spacer-large-bottom ra-m pa-m fz-m ba-green-dark bo-n co-green