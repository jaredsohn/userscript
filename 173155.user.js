// ==UserScript==
// @name	Hide Signatures for Certain Users [XenForo]
// @namespace	Makaze
// @include	*
// @grant	none
// @version	2.1.1
// ==/UserScript==

var toggleSigBlockState = function() {
	var opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {}, 
	users = (opts.hasOwnProperty('xf_hidden_sigs')) ? opts.xf_hidden_sigs : [],
	userID = this.getAttribute('data-userid'),
	context,
	postAuthor,
	signature,
	isBlocked = false,
	i = 0;

	for (i = 0; i < users.length; i++) {
		if (userID === users[i]) {
			users.splice(i, 1);
			opts.xf_hidden_sigs = users;
			localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));
			isBlocked = true;
			break;
		}
	}

	if (!isBlocked) {
		users.push(userID);
		opts.xf_hidden_sigs = users;
		localStorage.setItem('MakazeScriptOptions', JSON.stringify(opts));
	}

	for (i = 0; i < document.getElementsByClassName('messageUserInfo').length; i++) {
		context = document.getElementsByClassName('messageUserInfo')[i];
		postAuthor = context.getElementsByClassName('username')[0].href.replace(/.*?members\/.*?\.(.*?)\//gi, '$1');
		signature = context.parentNode.getElementsByClassName('signature')[0];

		if (postAuthor === userID) {
			if (isBlocked) {
				signature.style.display = 'block';
				context.getElementsByClassName('blockSigContainer')[0].getElementsByTagName('a')[0].childNodes[0].nodeValue = 'Block Signature';
			} else {
				signature.style.display = 'none';
				context.getElementsByClassName('blockSigContainer')[0].getElementsByTagName('a')[0].childNodes[0].nodeValue = 'Unblock Signature';
			}
		}
	}
};

if (document.documentElement.id === 'XenForo') {
	if (document.getElementsByClassName('signature').length && document.getElementsByClassName('messageUserInfo').length) {
		var opts = (localStorage.getItem('MakazeScriptOptions')) ? JSON.parse(localStorage.getItem('MakazeScriptOptions')) : {}, 
		users = (opts.hasOwnProperty('xf_hidden_sigs')) ? opts.xf_hidden_sigs : [],
		context,
		userID,
		appendLocation,
		signature,
		sigBlockContainer,
		sigBlockLink,
		sigBlockLinkText,
		i = 0,
		j = 0;

		for (i = 0; i < document.getElementsByClassName('messageUserInfo').length; i++) {
			context = document.getElementsByClassName('messageUserInfo')[i];
			if (context.getElementsByClassName('username')[0] != null) {
				userID = context.getElementsByClassName('username')[0].href.replace(/.*?members\/.*?\.(.*?)\//gi, '$1');
				appendLocation = context.getElementsByClassName('extraUserInfo')[0];
				signature = context.parentNode.getElementsByClassName('signature')[0];

				sigBlockContainer = document.createElement('div');
				sigBlockLink = document.createElement('a');

				sigBlockLink.href = 'javascript:void(0)';
				sigBlockLink.setAttribute('data-userid', userID);
				sigBlockLink.onclick = toggleSigBlockState;

				if (users.length) {
					for (j = 0; j < users.length; j++) {
						if (userID === users[j]) {
							signature.style.display = 'none';
							sigBlockLinkText = document.createTextNode('Unlock Signature');
						} else {
							sigBlockLinkText = document.createTextNode('Block Signature');
						}
					}
				} else {
					sigBlockLinkText = document.createTextNode('Block Signature');
				}

				sigBlockContainer.className = 'blockSigContainer';
				sigBlockContainer.style.marginTop = '1em';

				sigBlockLink.appendChild(sigBlockLinkText);
				sigBlockContainer.appendChild(sigBlockLink);
				appendLocation.appendChild(sigBlockContainer);
			}
		}
	}
}