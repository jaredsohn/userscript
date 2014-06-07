// ==UserScript==
// @name           LOR No Date
// @description    Removes timestamps from LOR posts and comments
// @namespace      http://www.linux.org.ru/*
// @namespace      https://www.linux.org.ru/*
// @include        http://www.linux.org.ru/*
// @include        https://www.linux.org.ru/*
// @author         Cancellor
// @license        GPL
// @version        0.1
// ==/UserScript==

var strDateTimeRegex = /\(\d{2}\.\d{2}.\d{4}\s\d{1,2}\:\d{2}:\d{2}\)/g;
var arrDateTimeInstances = document.body.innerHTML.match(strDateTimeRegex);

if (arrDateTimeInstances != null)
{
    if (arrDateTimeInstances.length > 0)
    {
        document.body.innerHTML = document.body.innerHTML.replace(strDateTimeRegex,'');
    }
}
