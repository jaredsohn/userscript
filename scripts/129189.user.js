// ==UserScript==

// @name            Watchseries.eu Helper
// @namespace       http://hippy.csoma.elte.hu/~kraxor/
// @author          Bence Balint <balintbence1337@gmail.com>
// @description     Removes some annoying delays on watchseries.eu and some of the sites linked by watchseries.eu, namely GorillaVid.in, DaClips.in, MovPod.in, SockShare.com, PutLocker.com, vidxden.com and MovShare.net. Check back for updates as the list may grow!
// @match           http://*.watchseries.eu/open/cale/*
// @match           http://*.gorillavid.in/*
// @match           http://*.daclips.in/*
// @match           http://*.movpod.in/*
// @match           http://*.sockshare.com/file/*
// @match           http://*.putlocker.com/file/*
// @match           http://*.vidxden.com/*
// @match           http://*.vidbux.com/*
// @match           http://*.movshare.net/video/*
// @include         http://*.watchseries.eu/open/cale/*
// @include         http://*.gorillavid.in/*
// @include         http://*.daclips.in/*
// @include         http://*.movpod.in/*
// @include         http://*.sockshare.com/file/*
// @include         http://*.putlocker.com/file/*
// @include         http://*.vidxden.com/*
// @include         http://*.vidbux.com/*
// @include         http://*.movshare.net/video/*
// @version         1.3

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
    
    
    if (window.location.hostname == 'www.watchseries.eu' || window.location.hostname == 'watchseries.eu') {
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
    alert('Sorry, watchseries.eu helper has encounteren an error. Please report bug and / or get the latest version at userscripts.org.');
}