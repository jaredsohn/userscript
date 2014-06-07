// ==UserScript==
// @id             mwomercs.com-f5f46f0c-8aab-4be0-893a-c8a453ab40e4@scriptish
// @name           https-enforce
// @version        1.0
// @namespace      xnx-https
// @author         Xian Nox
// @description    
// @include        http://mwomercs.com/forums/*
// @run-at         document-start
// ==/UserScript==

if(window.location.href.startsWith("http://")) {
    window.open(window.location.href.replace("http://", "https://"),"_self")
}