// ==UserScript==
// @name        NiceChat
// @namespace   http://yulli.org
// @description Makes chat nicer by removing most of everything
// @grant       none
// @include     *tf2r.com/chat.html
// @version     1.7.2
// ==/UserScript==

function addGlobalStyle(css) {
    try {
        var elmHead, elmStyle;
        elmHead = document.getElementsByTagName('head')[0];
        elmStyle = document.createElement('style');
        elmStyle.type = 'text/css';
        elmHead.appendChild(elmStyle);
        elmStyle.innerHTML = css;
    } catch (e) {
        if (!document.styleSheets.length) {
            document.createStyleSheet();
        }
        document.styleSheets[0].cssText += css;
    }
}


var elmDeleted;

elmDeleted = document.getElementById("header");
elmDeleted.parentNode.removeChild(elmDeleted);

elmDeleted = document.getElementsByClassName("adverts")[0];
elmDeleted.parentNode.removeChild(elmDeleted);

// Oh, you :3
elmDeleted = document.getElementById("nicechat");
if (elmDeleted) {
    elmDeleted.parentNode.removeChild(elmDeleted);
}

elmDeleted = document.getElementById("nicechat2");
if (elmDeleted) {
    elmDeleted.parentNode.removeChild(elmDeleted);
}


mErrors = document.getElementsByClassName("mError");
while(mErrors.length > 0) {
    elmDeleted = mErrors[0];
    elmDeleted.parentNode.removeChild(elmDeleted);
}

mSucs = document.getElementsByClassName("mSuc");
while(mSucs.length > 0) {
    elmDeleted = mSucs[0];
    elmDeleted.parentNode.removeChild(elmDeleted);
}

mNeuts = document.getElementsByClassName("mNeut");
while(mNeuts.length > 0) {
    elmDeleted = mNeuts[0];
    elmDeleted.parentNode.removeChild(elmDeleted);
}

textHolders = document.getElementsByClassName("text_holder");
while(textHolders.length > 0) {
    elmDeleted = textHolders[0];
    elmDeleted.parentNode.removeChild(elmDeleted);
}


addGlobalStyle("#nav_holder { \
	background-repeat: repeat; \
	height: 20px; \
	width: 790px; \
	-webkit-border-top-left-radius: 5px; \
	-webkit-border-top-right-radius: 5px; \
	-moz-border-radius-topleft: 5px; \
	-moz-border-radius-topright: 5px; \
	border-top-left-radius: 5px; \
	border-top-right-radius: 5px; \
	border: 1px solid #5b4d40; \
	-moz-box-shadow: 1px 2px 10px #000000; \
	-webkit-box-shadow: 1px 2px 10px #000000; \
	box-shadow: 1px 2px 10px #000000; \
}");

elmReplaced = document.getElementById("nav_content");
elmReplaced.innerHTML = '<div class="nav_font_s"> \
			<a href="http://tf2r.com/info.html" title="Site info">Info</a> | \
			<a href="http://tf2r.com/rules.html" title="Site rules">Rules</a> | \
			<a href="http://tf2r.com/donate.html" title="Donations">Donations</a> | \
			<a href="http://tf2r.com/active.html" title="So... just who is addicted?">Active users</a> | \
			<a href="http://tf2r.com/newraf.html" title="New raffle">New raffle</a> | \
			<a href="http://tf2r.com/raffles.html" title="Public raffles">Public raffles</a> | \
			<a href="http://tf2r.com/notifications.html" title="Notifications">Notifications</a> \
		</div>';