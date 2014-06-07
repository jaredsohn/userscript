// ==UserScript==
// @name	bbs.archlinux.pl
// @namespace	lobotomius.com
// @include	http://bbs.archlinux.pl/*
// ==/UserScript==


function sn(xp, ct) {
	var r = document.evaluate(xp, ct, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	if(r)
		return r.singleNodeValue
	else
		return null;
}

function eth(tag, html) {
	var t =  document.createElement(tag); t.innerHTML = html;
	return t;
};

// styl
GM_addStyle(" \
	.roweven { background-color: #f8f8ff } \
	.usermenu { font-family: sans-serif; font-size: 14px; color: #999; display: block; font-weight: bold; float: right; line-height: 45px; padding-left: 15px; padding-right: 15px } \
	.usermenu a { text-decoration: none; color: #999} \
	.usermenu a:visited { color: #999 } \
	.usermenu a:hover { color: #fff; text-decoration: none;} \
    .usermenu span:hover { color: #fff; text-decoration: none; cursor: pointer; } \
	.usermenu div { display: none; line-height: 20px; font-size: 14px;padding-left: 15px; padding-right: 15px; padding-bottom: 15px } \
	.usermenu:hover {  } \
	.usermenu:hover div { display: block; position: absolute;  z-index: 6; \
		 background: #333; -moz-box-shadow: 3px 3px 3px #666; }\
	");

function aintabs() {
    var n = document.evaluate('//span[@class="newtext"]/a', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for(i=0; i<n.snapshotLength; i++) {
            console.log(i);
            window.open(n.snapshotItem(i).getAttribute('href'), "_blank");
    };
};


// poprawia pusty href
sn('//div[@id="archnavbarlogo"]/h1/a', document).setAttribute('href', 'http://bbs.archlinux.pl');

var u = sn('//div[@id="brdmenu"]/ul', document);
var n = sn('//div[@id="archnavbarmenu"]/ul', document);

if( n ) {

	// BRDMENU
	if(u) {
		// usuwanie zbednych linek
		var r = sn('.//li[@id="navregister"]', u); if (r) { u.removeChild(r); };
		var r = sn('.//li[@id="navindex"]', u); if (r) { u.removeChild(r); };
		var r = sn('//a[@href="misc.php?action=markread"]', document); if(r) r.parentNode.removeChild(r);
	};

	// 'ikonki'
	if(GM_getValue('icons', true)) {
        var r = sn('.//li[@id="anb-start"]/a', n); if(r) { r.innerHTML='&#x2318;'; r.style.fontSize='24px'; };
        var r = sn('.//li[@id="anb-pakiety"]/a', n); if(r) { r.innerHTML='&#x2699;'; r.style.fontSize='24px'; };
        var r = sn('.//li[@id="anb-forum"]/a', n); if(r) { r.innerHTML='&#x270e;'; r.style.fontSize='24px'; };
		var r = sn('.//li[@id="anb-wiki"]/a', n); if(r) { r.innerHTML='&#x13d4;'; r.style.fontSize='24px'; };
        var r = sn('.//li[@id="anb-planeta"]/a', n); if(r) { r.innerHTML='&#x2615;'; r.style.fontSize='24px'; };
		var r = sn('.//li[@id="anb-pobierz"]/a', n); if(r) { r.innerHTML='&#x2b07;'; r.style.fontSize='24px'; };

	};

	var user = sn('//ul[@class="conl"]/li/span/strong', document);
	if(user) {
		// zalogowany
		user = user.textContent;
		var profileLink = sn('.//li[@id="navprofile"]/a', u).getAttribute('href');
		var logoutLink = sn('.//li[@id="navlogout"]/a', u).getAttribute('href');
		var mypostsLink = sn('//a[.="Moje posty"]', document); if(mypostsLink) mypostsLink = mypostsLink.getAttribute('href');

		var usermenu = document.createElement('div');
			usermenu.setAttribute('class', 'usermenu');
			usermenu.innerHTML='<a href="'+profileLink+'">['+user+']</a>';
		var dropdown = document.createElement('div');
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/search.php?action=show_new">nowe posty</a><br />'));
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/search.php?action=show_recent">aktywne wątki</a><br />'));
            if (location.href.indexOf('viewforum.php') != -1 || location.href.indexOf('search.php?action') != -1) {
                var tmp = eth('span', 'aktywne w kartach<br />'); 
                tmp.addEventListener("click", aintabs, false); 
                dropdown.appendChild(tmp);
            };
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/search.php?action=show_replies">z twoimi postami</a><br />'));
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/misc.php?action=markread">oznacz jako przeczytane</a><br />'));
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/search.php?action=show_subscriptions">subskrybowane wątki</a><br />'));
			if(mypostsLink) dropdown.appendChild(eth('span', '<a href="'+mypostsLink+'">moje posty</a><br />'));
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/userlist.php">lista użytkowników</a><br />'));
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/misc.php?action=rules">regulamin</a><br />'));
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/search.php">szukaj</a><br />'));
			dropdown.appendChild(eth('span', '<a href="'+logoutLink+'">wyloguj</a><br />'));

		usermenu.appendChild(dropdown);

	} else {
		// nie zalogowany
		var usermenu = document.createElement('div');
			usermenu.setAttribute('class', 'usermenu');
			usermenu.innerHTML='<a href="http://bbs.archlinux.pl/login.php">Logowanie</a>';
		var dropdown = document.createElement('div');
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/userlist.php">lista użytkowników</a><br />'));
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/search.php">szukaj</a><br />'));
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/misc.php?action=rules">regulamin</a><br />'));
			dropdown.appendChild(eth('span', '<a href="http://bbs.archlinux.pl/search.php?action=show_24h">ostatnie posty</a><br />'));

		usermenu.appendChild(dropdown);

	};


	if(GM_getValue('layout', true)) {
		var styles = [
			['//div[@id="punindex"]', 'padding: 0px'],
			['//div[@id="punsearch"]', 'padding: 0px'],
			['//div[@id="punviewtopic"]', 'padding: 0px'],
			['//div[@id="punviewforum"]', 'padding: 0px'],
			['//div[@id="punuserlist"]', 'padding: 0px'],
			['//div[@id="punmisc"]', 'padding: 0px'],
			['//div[@id="punlogin"]', 'padding: 0px'],
			['//div[@id="punprofile"]', 'padding: 0px'],

			['//div[@class="pagepost"]', 'border: 0 none'],
			['//dl[@id="onlinelist"]', 'border: 0 none'],
			['//div[@id="brdstats"]', 'border: 0 none; margin: 0px'],
			['//div[@id="brdmain"]', 'border: 0 none; padding: 0px'],

			['//div[@id="quickpost"]', 'border: 0 none'],
			['//div[@id="quickpost"]/div[@class="box"]', 'background: #f6f9fc; border: 0 none'],
			['//div[@id="quickpost"]/h2', 'background-color: #f6f9fc'],
			['//fieldset/div', 'border: 0 none'],

			['//div[@id="rules"]/div[2]', 'border: none'],

			['//input', 'border: 1px solid #999; -moz-box-shadow: 2px 2px 2px #666; padding: 2px'],
			['//textarea', 'border: 1px solid #999; -moz-box-shadow: 2px 2px 2px #666; padding: 5px'],
			['//select', 'border: 1px solid #999; -moz-box-shadow: 2px 2px 2px #666;']
		];

		for(var i in styles) {
			var elements = document.evaluate(styles[i][0], sn('.//body/div[2]', document), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			for(var j=0; j<elements.snapshotLength; j++) {
				elements.snapshotItem(j).setAttribute('style', styles[i][1]);
			};
		};
	};

	if(GM_getValue('dropdown', true)) {
		var r = sn('.//div[@class="punwrap"]', document);
		if(r) {
			var s = sn('.//div[@id="brdheader"]', r); if(s) r.removeChild(s);
		};

		n.setAttribute('id', 'archnavbarlist');
		sn('//div[@id="archnavbarmenu"]', document).appendChild(usermenu);
	};

};

// redirect po logowaniu
if(GM_getValue('redirect', true)) {
	if (location.href.indexOf('bbs.archlinux.pl/login.php') != -1) {
		var r = sn('//input[@name="redirect_url"]', document);
		if(r) r.setAttribute('value', 'http://bbs.archlinux.pl/search.php?action=show_new');
	};
};

function toggleOption(item) {
	GM_log(item);
	GM_setValue(item, !GM_getValue(item, true));
	unsafeWindow.document.location.reload(false);
}

GM_registerMenuCommand(
	(GM_getValue('logo', true) ? "\u2714 " : "\u2718 ") + "Logo przenosi do strony głównej BBS", function() {toggleOption('logo')});
GM_registerMenuCommand(
	(GM_getValue('layout', true) ? "\u2714 " : "\u2718 ") + "Uproszczony layout", function() {toggleOption('layout')});
GM_registerMenuCommand(
	(GM_getValue('dropdown', true) ? "\u2714 " : "\u2718 ") + "Rozwijane menu", function() {toggleOption('dropdown')});
GM_registerMenuCommand(
	(GM_getValue('icons', true) ? "\u2714 " : "\u2718 ") + "'Ikonki' w menu portalu", function() {toggleOption('icons')});
GM_registerMenuCommand(
	(GM_getValue('redirect', true) ? "\u2714 " : "\u2718 ") + "Po logowaniu wyświetl nowe posty", function() {toggleOption('redirect')});









//