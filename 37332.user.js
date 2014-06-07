// ==UserScript==
// @name           SnowTigers : Registration Alerter
// @namespace      http://gm.wesley.eti.br/snowtigers
// @description    Opens the Account Signup page when registration is open
// @include        *
// ==/UserScript==

(function recursive()
{	// script scope

	var user = {
		'interval':15 * 60 * 1000	// every 15 minutes
	};

	var script = {
		'lastCheck':parseInt(GM_getValue('lastCheck', '0'), 10),
		'currentDate':parseInt(new Date().valueOf(), 10)
	};

	if (script.lastCheck + user.interval < script.currentDate)
	{
		GM_log('Requesting http://www.snowtigers.net/account-signup.php ...');
		GM_setValue('lastCheck', "" + (script.lastCheck = script.currentDate));
		GM_xmlhttpRequest({
			'url':'http://www.snowtigers.net/account-signup.php',
			'method':'get',
			'onload':function(e)
			{
				if (/^2/.test(e.status))
				{
					if (!/Le nombre maximum de membres est atteint/i.test(e.responseText))
						GM_openInTab(e.finalUrl);
				}
				else
					GM_log('An error has occurred while requesting '+e.finalUrl);
			},
			'onerror':function(e)
			{
				GM_log('An error has occurred while requesting '+e.finalUrl);
			}
		});
	}

	setTimeout( recursive, script.lastCheck + user.interval - script.currentDate + 1000 * Math.random());
})();