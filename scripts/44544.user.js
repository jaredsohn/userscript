// ==UserScript==
// @name	Itamaram's ChatEmoticons
// @namespace	http://itamaram.selfip.com:8621/ChatEmoticons.user.js
// @description	Replaces certain text emoticons with gifs
// @include	http://*kingdomofloathing.com/lchat.php
// @include	http://127.0.0.1:60080/lchat.php
// ==/UserScript==

//First construct the regex list of text to images. Taken from dive into GM [5.5]
//list of emoticons. Taken from:
//http://help.adobe.com/en_US/Acrobat.com/ConnectNow/WSC26304BE-9B73-4c7f-88BF-43F435ADBC06.html
var smile, frown, wink, laugh, tongue, cross, replacements, regex;
function init(){
	smile = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsTAAALEwEAmpwYAAABmklEQVR4nDXQP2gTcRyG8ed3OZKext61wQqlJcaKBKSpCkJFsNCCg0tBHSxiUaw4uAmuOgiOSrdOioiDgkIGiRRTCGQpimgR8dTWnkgNTWKu6Z+7Jpf7OrT5bC+806NEBGC7TuEeMZMdSpG5ipXcXSKC65CdaF443wyzxt8iIWJOaKWjRPoZmmyfnpzyzynpHlNqXyD51vasUSNahfJles4yNKkxP10/uSfoGtAj418+n4hwulRhpQo6xJ7z7R2uozWWv/o9c4p1kd83pu6IcmffduXyCQSEsng4BX3D+RBXNMJsSFCcH2gGj65dIuZCDRpoG0usLevVLUmt83OJ/f1v9saJNIh66Jus/iFax93UEh2W1peIl21ev0jOPEwa/+hwibr4JW7PpD/a3ZWKz5Fx3TgzVXy5eGvUufhg8Mf39NjxmhZo+U8mLTKmtxgOYiWViPDqum0/Ppwmb3eu1OJaS/UZ/rBVff+rd+RujgMZtVt84Vlu+mZL91Im7hbOKocOHhu+XyDW2Y65w19j4SmeiwIrReYKbf8Bo92yrt0Xmb8AAAAASUVORK5CYII%3D";
	frown = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsTAAALEwEAmpwYAAABmElEQVR4nDXQz0uTcRzA8fd3z6N7lrTtYcTMwmk1ZlSbKERESIRFIEbYJSmHFBn4B3iLgk5dokQ8ilGXjB08ZIcimnWJItKDOYTaKAbmHvYDt+eZw+fTIfc6v09vJSIATpn0fQwTBKUA4uMEIwCgRIRSjsXRxrWRhrto5D8pcPdf1zZPoncSH2tG82fty0JosFo1vPvSsvPWKNJqQeEmBy6SSHr4/LTS71tea7+VXB08/6qw2e+2cHo48fhlB60vyLyjnPPUs2v19vdHjzWiMXNycih8sI6glBo+l0fYEptsWlmP+rzj3xp+dG0IMXbdlObgLdFSBAsr2xeKXtGtmnRto2DXeP19hdRCd7WiT41uRP3gUKp6Qj7TczjUtrWOt8iXN8w86blx6dfYhY0Hs8fZhhqFgkPsqu4buPNx4WeHmT8RZHpiPWxCgMjIDypYv33Kf4pApxIRUrczmblYL2jgwg7Y1P7wNXto4N4S4bjaO77yfGn6rqvZXUHKNXJ/ORLpPfPwA0agOfM/p8zqM+wiQLCbRJKmf3GZpUFLEogXAAAAAElFTkSuQmCC";
	wink = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsTAAALEwEAmpwYAAABlElEQVR4nDXQvWsTcRzH8ffvl7vkgk2TGPAJaowFrbY0sTroYBcfoCotKApFWpQKksG1dJJSdHDtH6AouAgKHaSDSlWcRAotBFIHmyAtynnNxaaXp+a+DjGv6TN8prcSEYBamc+zhKKgaMvcJXq4PZWI4BZZGG/euL7rL1ibXxAkOq5/9RPoIT3ZOT07V7uiZO9Fpbqa/ntpvLNKBB2wb7PvMulJzdf5v2fCrXivaYyagQlDnfcNlvNggPWStQ+Ui7qxnqsfWEJtZ+8/Pn1qRFQJRXY6g0AL2/cofFLOk6HQneVmN0bgqhKrJW90VUIu5hZs4RSGEsfGDMfjSIWVVVIn33ZF0HWCVcwdqEId19OJUEz3JPbYecwKt24OuHksl6AL21CBHf7YdY6PGdbwvdyrH5eubTwY3Zx5dCIS3lW+mhn5nozg/AzTPUAsqUSE11P5tad9aYo2S7mD2tcXkhvxBt/WDw0/XGT/oPpffOXF4ny2FfBSMVyPwm96U5mzcx+xop2YbbUyq8+plgDiRxmcoOMf4gOiWjWXeDMAAAAASUVORK5CYII%3D";
	laugh = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsTAAALEwEAmpwYAAABlklEQVR4nDWQP0gbcRzF3y9JvaTN/e40ooMJZ0QLadTzD6J1sBJiwQ4K6hICoVCEtnQpTooYxcnVxU3UURxahzrYwWgbnArSwVZQqyBoYmKi13DxGr8Ov/qZHrw3PD6MiADAzCMRh7McAEBgDPprKBoAAIyIkDvB54g1PPSP1p1nOyCQErGdB2H3QY89jJa6zX5QRZgxt3X39e5203kFKQOko6h6CT1mn35Vca0dwlf78UP627YV7gucXWxNxhsOT13PA9/xh6OmzT7RpxnBtTKXn/N2G1hTq3F9s+swi6HGjMeBtNHw5JHEMnNtv9p/vB/TGWPiJhGJPNKRe9vp8dQP2DIFHO/LohOIBRFt/pRzBoNLtXk9jxVLNU0zlUpxzjnnbrdbluVsNhusLl5emng66HD1jJatjkdDxYVPSCaTpVIJgCRJekCLPLthSi9UjRER1t78Pljc/1s588UrbvkUK955ZBjlL6Y2UN3M/hvfW9mYf1eyF2pV5As4uUCdv6VrNgGJP8gUmHnsLaOYAxFUv3AtuAcdBKZeDN0BkwAAAABJRU5ErkJggg%3D%3D";
	tongue = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsTAAALEwEAmpwYAAABnUlEQVR4nD2QO0gjYQCE59/sujGgOUVjBB/H3SkRjA9ioo0PEBWv8PCFghyX4gpBgsJdI6JNsNPKTiuNaGuloCLYCL5lQTSIJjmNibm7ZDeKu3lsfgs1Uw0zXzNDKKVI60GAIr750qZ0TN6goID9GRTlQ/bgKYwcGxJZMFSjvOsdUiSsWpWefjXzXKWBVOJA50fGHcA7wWWhfpQFgI2ReIsSTTGuuU8pmjPsSHyfkNtM0Z9lk2D6YaxlIPokxOXC275vm2734+BgJyF5juHLHUE/vf1ZDYdwtMTCvRbMjhdQrG+Xc5pKlR4nk1uWL1j5dQEPcHX/n+FZxCRd6FobgpK/rKaWKcBJ4COABEQBmc0WT1nw+sAdX+yH5gnWoWpCyOvssYbwD2MAYsb5x68MTN2ZQT984DxwdPyb9XpPBaE3ErHxz/irOwkXmSyNDPQl5tahs71c3MBu9G82G2rMZraKq1CS+KO7+RDTWvrez9xyHi5OWXM5EC1iGjwTd0h9rDTV/V6AsQo0Le/u7njj3gAu7HC1wzdvp7L42rwAAnO6kmNMFqMAAAAASUVORK5CYII%3D";
	cross = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAACXBIWXMAAAsTAAALEwEAmpwYAAABmklEQVR4nDXQPWgTYQCA4ffy3U8uSXP5wZqhaRNpm5ZCqhWxCIpgKRRFETexBYVOTq4uFZeuOnYSK4hDHcTFDoIudVFEQQctJm2RJsZL75JcLqZJPgfNM7/Tq0gpAVoub1cw4wASkBy/iTUCAIqUEmeHF9fb1y63O+uRn1/xQbtBc5JwmvxiP3p0xpl/Z4fpgSmIdokUCGyDXGJijvyiuLcQd9MF92jhznKuXOlmRlvFH6w+HE/oh8N+ES9AekbcnRtuTm70DBJD9setlBV1nj8dOzVaX8ja6oFX9SbMpK56ux+iPo04syc5PVM0BJdOfA/vwjb4mvD2cIvqb0+OlVAkRozN15T3jghPXD1WGnShZlQbimXE1KFk6NeX5GDT1iME9weMqh5oKVpJoxagErQ7fjZ3RTXPLW+trVzo2ZhcTNQZqFODikkpZO9HuvM5YiOKlJKNW99ePRtPtVFUDgUNjQPdt3vvY+GzD16Syiv/j39+srl6u1tuZ0LSqYsdv5M9PzV7/w1Bqz/zn5bLp8f8cQCsDNNL9P0FxTinZz8uvBAAAAAASUVORK5CYII%3D";

	//the array of text emoticons mapping to the images
	replacements = {
	    ":\\)": smile,
	    ":\\(": frown,
		";\\)": wink,
		":D": laugh,
		":p": tongue,
		":P": tongue,
		"X\\(": cross,
		"x\\(": cross};
	for (key in replacements){
		replacements[key] = '<img src="' + replacements[key] + '" />';
	}
	regex = {};
	for (key in replacements) {
	    regex[key] = new RegExp(key, 'g');
	}
}
//the regex/replacement combo will now map a text emoticon into an img tag which can be embedded

//Get the chat function from the page, removing the function definition
var headLess = unsafeWindow.getnewchat.toString();
headLess = headLess.replace('.innerHTML += resp', '.innerHTML+=findEmoticons(resp)');
headLess = headLess.split('\n');
headLess.splice(0,1);
headLess = headLess.join('\n');

//Creates a new script tag which will contain a function calling the old getchat method as well as
var walkRound = document.createElement('script');
walkRound.type = "text/javascript";
walkRound.innerHTML = 'function getnewchatEmoticon(last, repeat){' + headLess;
walkRound.innerHTML += '\n var smile, frown, wink, laugh, tongue, cross, replacements, regex; init();'
walkRound.innerHTML += '\n' + init.toString();
walkRound.innerHTML += '\n'+ findEmoticons.toString();

headLess = unsafeWindow.submitchat.toString();
headLess = headLess.replace('.innerHTML += resp', '.innerHTML+=findEmoticons(resp)');
headLess = headLess.split('\n');
headLess.splice(0,1);
headLess = headLess.join('\n');
walkRound.innerHTML += '\n function submitchatEmoticon(override){' + headLess;

document.getElementsByTagName('head')[0].appendChild(walkRound);

function findEmoticons(text){
	for (key in replacements) {
        text = text.replace(regex[key], replacements[key]);
    }
    return text;
}

//redefines the chatfunction to do something new, and then invoke the old function
unsafeWindow.getnewchat = function(last, repeat){ unsafeWindow.getnewchatEmoticon(last, repeat);};
unsafeWindow.submitchat = function(override){unsafeWindow.submitchatEmoticon(override);};