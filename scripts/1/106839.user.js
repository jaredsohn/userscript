// ==UserScript==
// @name		The Date Changer!
// @namespace	Date changer
// @description 	Date changer to fuck with friends.
// @author      wes1190@hotmail.com
// @include	*.*
// @version	1.0
// ==/UserScript==

function decodeString(str) {

    str = str.replace(/16/g, "17");
    str = str.replace(/Sixteen/g, "Seventeen");
    str = str.replace(/sixteen/g, "seventeen");
    str = str.replace(/Saturday/g, "Sunday");
    str = str.replace(/saturday/g, "sunday");

    return str;
}

document.body.innerHTML = decodeString(document.body.innerHTML);