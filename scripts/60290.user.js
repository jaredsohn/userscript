// ==UserScript==
// @name           FastVZ
// @namespace      schuelervz
// @description    Überspringt diese nervigen Nachfrage-Dialogboxen bei SchülerVZ. ACHTUNG: Keine Gewährleistung, nicht in allen Bereichen von Schülervz getestet.
// @include        http://www.schuelervz.net/Birthday/DialogHideout/*
// @include        http://www.schuelervz.net/Microblog/BlockUser/*
// @include        http://www.schuelervz.net/Gruscheln/DialogGruscheln/*
// @include        http://www.schuelervz.net/Groups/Join/*
// @include        http://www.schuelervz.net/Groups/Leave/*
// (c) 2009 by js - js.de.eu.org - licensed cc-by-nc-sa. See http://creativecommons.org/licenses/by-nc-sa/3.0/de
// ==/UserScript==

formNames=new Array("doHideOut","blockUser","performGruscheln","joinGroup","leaveGroup");
stop=false;
if(! /^http(s|)\:\/\/www.schuelervz.net\//i.test(document.referrer)) return;
for(i in document.forms){
	form=document.forms[i];
	for(j in formNames){
		formName=formNames[j];
		if(form.name==formName){
			form.submit();
			stop=true;
			break;
		}
		if(stop) break;
	}
}
