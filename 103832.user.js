// ==UserScript==
// @name    		Gaia - Wing Favicon
// @author  		v5 (http://www.gaiaonline.com/p/mindset)
// @description 	Changes Gaia's favicon into the wing symbol.
// @include 		http://www.gonline.com/*
// @include 		http://gonline.com/*
// @include 		https://www.gonline.com/*
// @include 		https://gonline.com/*
// @require 		http://sizzlemctwizzle.com/updater.php?id=99666
// ==/UserScript==

/* Code based on http://userscripts.org/scripts/show/35858 -- wing icon by Mindset @ Gaia Online */

var icon = document.createElement('link');
icon.setAttribute('rel', 'shortcut icon');
icon.setAttribute('href', 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6cWlL+vGp1Psx6hq7MeoauzHqGrpxaVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9+/eHu3Ur73qyKPw6sah5vHMss72yqn/8cmt//HOu//xzbn+6cWl7PLUqVAAAAAAAAAAAAAAAAAAAAAAAAAAAO3Wu+Dux67/+c7M//HGuv/qwJ7/+uTZ///7+P///v7///b3//zk4v/wzLL++divJgAAAAAAAAAAAAAAAAAAAADv07Lj+Ozh//3r5v/tv6P/9+HR//7////68+n/+/bu///////+////+eTY/+/OptgAAAAAAAAAAAAAAAAAAAAA7di22ujJqP/55df/7sim//z28P/z2MT/7Min/+rHoP/359L///////78+P/v0rD7AAAAAAAAAAD16tdQ7Mqq/fLHt//4zbr/+8+9//LMs//48Ob/79jB//36+f/88+z/7tGu//z58///////8Nm+/gAAAAAAAAAA6cqr8/PLv//86eP//fPp//7y6//11L3/9erd/+/bxP/v1Lz//f39/+7StP/79u7///////Hawf4AAAAAAAAAAObHp/Dw0rv////////////+/////PXu/+/bwv/1693/+PLo//Li0P/v1rr//v78///+///z2Lv8AAAAAAAAAAD35M0q6M2p6ezVuf/v2L//9dnD//zw5v/8+/f/9evc//Tr3P/06Nn//fv4//7////79/L/79Cp5AAAAAAAAAAAAAAAAAAAAADt0q/R6LyW//zn2f//////////////////////////////////////9OPQ//XVqFQAAAAAAAAAAAAAAAAAAAAA7MSg/fzf1P////z/////////////////////////////////+PLq/+7SrOgAAAAAAAAAAAAAAAAAAAAA6cKJhvHKsv//9e//////////////////////////////////+fTt/+nNqPny2LUUAAAAAAAAAAAAAAAAAAAAAOS/ktH42cz////9///////////////////////9/f3/7+DM/+zOqOkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADtyqDP+NbH///+/P/+/////f79//v48//y49D/69Gv/OrHnZMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8tGob+zEn/7szar/7dOz/urPrvnnx6Ha7ciYhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAPAHAADgAwAA4AEAAOABAADAAQAAgAEAAIABAADAAQAA4AMAAOADAADABwAAwA8AAMAfAADgf////////w==');
var head = document.getElementsByTagName('head')[0];
head.appendChild(icon);
