 // ==UserScript==
// @name        Ys168 No Download Redirection
// @namespace   http://jixun.org/
// @version     0.1
// @description No redirection while downloading file from ys168. E.g. Executable File.
// @include     *://*.ys168.com/
// @copyright   2012+, You
// ==/UserScript==

// Credit to: http://stackoverflow.com/questions/789630/javascript-function-hooks
try{var MyScript = 'try{\
	var addHook = function(d,b,a){a=a||window;for(var c in a)a[c]===b&&(a[c]=function(){var a=b.apply(this,arguments);d();return a})};\
	addHook (function () { var sKey = \'/note/fd.htm?\';\
	var eLinks = document.querySelectorAll (\'a[href^="\' + sKey + \'"]\');\
	for (var i=0; i<eLinks.length; i++) {\
		eLinks[i].href = eLinks[i].href.substr (eLinks[i].href.indexOf (sKey) + sKey.length);\
		eLinks[i].target = \'_self\';\
	}}, mldq);\
} catch (e) {alert (\'Please report the following error to jixun.org:\\n\\n\' + e);}';
    var s = document.createElement ('script');
    s.innerHTML = MyScript;
    document.getElementsByTagName ('body')[0].appendChild (s);
} catch (e) {alert ('Please report the following error to jixun.org:\n\n' + e);}