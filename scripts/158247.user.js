// ==UserScript==
// @name           WatchSeries.lt, Gorillavid & Putlocker Helper
// @description    This allows you to skip the of watchseries.lt, gorillavid, daclips, movpod, sockshare, putlocker.
// @version         1.5
// @match           http://watchseries.lt/open/cale/*
// @match           http://watchtvseries.ch/open/cale/*
// @match           http://*.gorillavid.in/*
// @match           http://*.daclips.in/*
// @match           http://*.movpod.in/*
// @match           http://*.sockshare.com/file/*
// @match           http://*.putlocker.com/file/*
// @include         http://watchseries.lt/open/cale/*
// @include         http://*.watchseries.lt/open/cale/*
// @include         http://*.gorillavid.in/*
// @include         http://*.daclips.in/*
// @include         http://*.movpod.in/*
// @include         http://*.sockshare.com/file/*
// @include         http://*.putlocker.com/file/*
// @source         userscripts.org/scripts/show/158247
// @downloadURL    http://userscripts.org/scripts/source/158247.user.js
// @updateURL    http://userscripts.org/scripts/source/158247.user.js
// ==/UserScript==

function checkHosts(hosts) {
    for (i in hosts) if (window.location.hostname == hosts[i] || window.location.hostname == 'www.' + hosts[i]) {
	return true;
    }
    return false;
}

function clickButton(button, hosts) {
    button.disabled = false;
    button.click();
}

function clickButtonByIdOnHosts(buttonId, hosts) {
    if (checkHosts(hosts)) try {
	var button = document.getElementById(buttonId);
	clickButton(button);
    } catch (err) {}
}

function clickButtonByNameOnHosts(buttonName, hosts) {
    if (checkHosts(hosts)) try {
	var button = document.getElementsByName(buttonName)[0];
	clickButton(button);
    } catch (err) {}
}

try {
    
    
    if (window.location.hostname == 'watchseries.lt' || window.location.hostname == 'watchseries.lt') {
	var button = document.getElementsByClassName('myButton')[0];
	window.location.href = button.href;
    }
    
	  if (window.location.hostname == 'watchtvseries.ch' || window.location.hostname == 'watchtvseries.ch') {
	var button = document.getElementsByClassName('myButton')[0];
	window.location.href = button.href;
    }
	
    
    var hosts = ['gorillavid.in', 'daclips.in', 'movpod.in'];
    clickButtonByIdOnHosts('btn_download', hosts);
    

    hosts = ['sockshare.com', 'putlocker.com'];
    clickButtonByIdOnHosts('submitButton', hosts);


    hosts = ['vidxden.com', 'vidbux.com'];
    clickButtonByNameOnHosts('method_free', hosts);


    hosts = ['movshare.net'];
    clickButtonByNameOnHosts('submit', hosts);

} catch (err) {
    alert('Sorry, watchseries.lt helper has encounteren an error. Please report bug and / or get the latest version at userscripts.org.');
}

if (document.getElementById("pre-download-block"))
	document.forms[1].submit();
	
if (document.getElementById("submitButton"))
	document.getElementById("submitButton").disabled = false;
	document.getElementById("submitButton").click();
