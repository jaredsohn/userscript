// ==UserScript==
// @name            Speedy Google Account Switcher 
// @author          Dan Vanderkam and Robert Schonberger
// @namespace       http://danvk.org/
// @description     Saves you one click when switching accounts with the new Google top navigation bar.
// @license         Creative Commons Attribution 3.0 Unported License
// @version	        0.0.2
// @include        http://*.google.*/*
// @include        https://*.google.*/*
// @include        http://google.*/*
// @include        https://google.*/*
// @exclude        http*://mail.google.tld/*ui=1*
// ==/UserScript==

/* Include domains ripped from
 * Google Account Multi-Login by Jarrett
 * http://userscripts.org/scripts/show/16341
 */

if (typeof GM_forceVisibility == "undefined")
{
	function GM_forceVisibility()
	{
		// The "user@domain.com" link can be identified based on its href.
		var anchors = document.getElementsByTagName("a");
		var as = [];
		for (var i = 0; i < anchors.length; i++) {
			if (anchors[i].href == 'http://google.com/profiles' ||
				anchors[i].href == 'https://google.com/profiles') {
				as.push(anchors[i]);
			}
		}
		
		if (as.length > 0) {
			var killer_fn = function() {
				var acct_list = document.getElementById("gbmps");
				if (acct_list) {
				  acct_list.style.display = '';
				}
				
				// Kill the "This account managed by " section, "Switch accounts" and "< Back"
				var class_kill = ['gbmpalb', 'gbpmc'];
				for (var j = 0; j < class_kill.length; j++) {
					var klass = class_kill[j];
					var account_managed_by = document.getElementsByClassName(klass);
					for (var i = 0; i < account_managed_by.length; i++) {
						account_managed_by[i].style.display = 'none';
					}
				}
				var back = document.getElementById('gbmpsb');
				if (back) {
					back.style.display = 'none';
				}
				
				// swap the order of the Account switcher and the Profile miniview
				var mini_profile = acct_list.previousElementSibling;
				if (mini_profile) {
					var container = acct_list.parentNode;
					container.removeChild(acct_list);
					container.insertBefore(acct_list, mini_profile);
					acct_list.style.borderBottom = '1px solid #DEDEDE';
					acct_list.style.paddingBottom = '10px';
					acct_list.style.marginBottom = '10px';
				}
				
				// move the current account to the bottom
				var selected_acct = document.getElementsByClassName('gbp0');
				if (selected_acct.length == 1) {
					selected_acct = selected_acct[0];
					var container = selected_acct.parentNode;
					container.removeChild(selected_acct);
					container.appendChild(selected_acct);
				}
			};
			
			for (var i = 0; i < as.length; i++) {
				as[i].addEventListener('click', killer_fn);	
			}
		}
	}
}

GM_forceVisibility();
