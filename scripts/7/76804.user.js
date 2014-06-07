// ==UserScript==
// @name           Sylvia => Silvy
// @description    God bless you, Silvy!
// @namespace      http://www.linux.org.ru/*
// @namespace      https://www.linux.org.ru/*
// @include        http://www.linux.org.ru/*
// @include        https://www.linux.org.ru/*
// @author         Cancellor
// @license        GPL
// @version        0.3
// ==/UserScript==

var strSylviaRegex = /Sylvia/g;
var arrSylviaInstances = document.body.innerHTML.match(strSylviaRegex);

if (arrSylviaInstances != null)
{
    if (arrSylviaInstances.length > 0)
    {
        document.body.innerHTML = document.body.innerHTML.replace(strSylviaRegex,'Silvy');
    }
}
