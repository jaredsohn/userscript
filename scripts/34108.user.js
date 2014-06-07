// ==UserScript==
// @name           SA Quoteblocker 2
// @description    Show/hide quoted text from ignored users on Something Awful forums
// @include        http://*somethingawful.com/showthread.php?*
// ==/UserScript==

var ignoreURL = 'http://forums.somethingawful.com/member2.php?action=viewlist&userlist=ignore';
var ignoredUsernameStart = 'name="listbits[]" value="';
var css = {
	userQuote: ['div.bbc-block.', '>h4:not(:hover)+blockquote:not(:hover)'],
	hideUnhovered: ['div.bbc-block>h4 {cursor:default}', '{display:hidden}']
};

function userToClassName (username) {
    return 'quoteby-' + btoa(username).replace(/=/g, '');
};

function unescapeHTML(html) {
	unescapeHTML.span.innerHTML = html;
	return unescapeHTML.span.firstChild.data;
};

unescapeHTML.span = document.createElement('span');

function ignoreQuotes(ignored) {
    var style = document.createElement('style');

    style.innerHTML = css.hideUnhovered.join(ignored.map(function (user)
        css.userQuote.join(userToClassName(user))
    ).join(', '));

    document.documentElement.firstChild.appendChild(style);

    Array.forEach(document.getElementsByTagName('blockquote'), function (el) {
        try { 
            var author = el.previousSibling.firstChild.data.match(/(.+) posted:$/)[1];
            el.parentNode.className += ' ' + userToClassName(author);
        } catch(ex) {}
    });
};

GM_xmlhttpRequest({
	method: "GET",
	url: ignoreURL,
	onload:function(responseDetails) {
		var ignoredUsers = responseDetails.responseText
			.split(ignoredUsernameStart)
			.slice(1)
			.map(function(x) unescapeHTML(x.split('"')[0]));
		ignoreQuotes(ignoredUsers);

	}
});