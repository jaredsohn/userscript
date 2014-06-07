// ==UserScript==
// @name           Google+ Vanity URL
// @description    Changes your Google Plus profile links to point to the domain of your choice when copying
// @author         rummik
// @include        https://plus.google.com/
// @version        0.07
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js
// @require        http://userscripts.org/scripts/source/49700.user.js
// ==/UserScript==

GM_config.init('Configuration for Personal Data',{
	id:  { label: 'Google+ ID:', type: 'text', cols:50, default: '112239280424945704046' },
	url: { label: 'Custom URL:', type: 'text', cols:50, default: 'http://pls.rummik.com' }
});

GM_registerMenuCommand('Google+ Vanity URL: Configuration', GM_config.open);

$('a').live('contextmenu', function() {
	var $this = $(this),
	    $href = $this.attr('href'),
	    base  = '^(?:(?:(?:https?:)?//plus.google.com|\\.)?/(?:u/\\d/)?)?',
	    user  = new RegExp(base + GM_config.get('id')),
	    multi = new RegExp(base + '(.+)'),
	    ping  = new RegExp(base + '(http.+)');

	if (user.test($href)) {
		$this.attr('href', $href.replace(user, GM_config.get('url').replace(/\/+$/, '')));
	} else if (ping.test($href)) {
		$this.attr('href', $href.replace(ping, '$1'));
	} else if (multi.test($href)) {
		$this.attr('href', $href.replace(multi, 'https://plus.google.com/$1'));
	}

	// reset the link after the menu appears
	if ($this.attr('href') != $href) {
		setTimeout(function() { $this.attr('href', $href); }, 1);
	}
});

// ==ChangeLog==
// 0.07: Added removing Google tracking on copied links.
// 0.06: Minor touch up on the regex that removes /u/N/.
// 0.05: Regex fixes.
// 0.04: Source cleanup.
// 0.03: Added URL cleanups. (Removes extra bits from using multiple logins)
// 0.02: Added GM_config.
// 0.01: Initial release.
// ==/ChangeLog==