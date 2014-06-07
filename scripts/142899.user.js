// ==UserScript==
// @name           Blacklisted Userscripts Warning
// @version        12.0
// @include        http://userscripts.org/*
// @include        https://userscripts.org/*
// ==/UserScript==

	/* blacklisted users' scripts */
	if (document.evaluate('//span[@class="author"]/a[' +
						'contains(@user_id, "469018") or ' +
						'contains(@user_id, "445861") or ' +
						'contains(@user_id, "505765") or ' +
						'contains(@user_id, "505792") or ' +
						'contains(@user_id, "505791") or ' +
						'contains(@user_id, "505782") or ' +
						'contains(@user_id, "505775") or ' +
						'contains(@user_id, "490174") or ' +
						'contains(@user_id, "505511") or ' +
						'contains(@user_id, "505352") or ' +
						'contains(@user_id, "505300") or ' +
						'contains(@user_id, "497384") or ' +
						'contains(@user_id, "505107") or ' +
						'contains(@user_id, "504907") or ' +
						'contains(@user_id, "475448") or ' +
						'contains(@user_id, "502220") or ' +
						'contains(@user_id, "439139") or ' +
						'contains(@user_id, "489768") or ' +
						'contains(@user_id, "484405") or ' +
						'contains(@user_id, "427958") or ' +
						'contains(@user_id, "500250") or ' +
						'contains(@user_id, "500010") or ' +
						'contains(@user_id, "501687") or ' +
						'contains(@user_id, "502618") or ' +
						'contains(@user_id, "422222") or ' +
						'contains(@user_id, "441113") or ' +
						'contains(@user_id, "442786") or ' +
						'contains(@user_id, "477783") or ' +
						'contains(@user_id, "477939") or ' +
						'contains(@user_id, "469787") or ' +
						'contains(@user_id, "480448") or ' +
						'contains(@user_id, "490444") or ' +
						'contains(@user_id, "422223") or ' +
						'contains(@user_id, "422224") or ' +
						'contains(@user_id, "422226") or ' +
						'contains(@user_id, "422227")' +
						']', document, null, 9, null).singleNodeValue != null){
	GM_addStyle('#install_script{display:none!important;}');
	alert('This script belongs to a blacklisted user. Do not install!');
	}