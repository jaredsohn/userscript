// ==UserScript==
// @name           Aion Forums Replace HTTPS
// @author         Yumi Nanako (yuminanako@yuminanako.info)
// @provided by    Yumi Nanako
// @namespace      http://www.yuminanako.info
// @description    Forces Aion Forums login forms to use non-secure connection since it causes problems with login.
// @include        http://forums.aiononline.com/*
// ==/UserScript==

var cl = document.forms[0];
var l = document.forms[3];

function beginsWithStr(s1,s2)
{
    return s1.slice(0,s2.length) == s2;
}

if (beginsWithStr(cl.action,'https://forums.aiononline.com/' || l.action,'https://forums.aiononline.com/'))
{
    cl.action = cl.action.replace(/https:/, 'http:');
    l.action = l.action.replace(/https:/, 'http:');
}