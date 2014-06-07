// ==UserScript==
// @name           Alerts in Toolbar
// @namespace      cabrasher, ddcunderground
// @include        http://goallineblitz.com/game/*
// ==/UserScript==


function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

var newtab = 1;

if (window.location.href.indexOf('http://goallineblitz.com/game/inbox.pl')>-1) {
    GM_setValue('alreadyopened', '1');

}else if (window.location.href!='http://goallineblitz.com/game/home.pl') {
    
    GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://goallineblitz.com/game/home.pl',
    headers: {
    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
    'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(inbox) {
    var bodySource=inbox.responseText;
    
    var newPM = bodySource.split('<div id="inbox_button"><div>');
    var newPM1 = newPM[1].split('</div>');
    var numNewPMs = newPM1[0];
    
    
    var newAlert = bodySource.split('<div id="alerts_button"><div>');
    var newAlert1 = newAlert[1].split('</div>');
    var numNewAlerts = newAlert1[0];

    var toolbarlinks = document.getElementsByTagName('a');

    var alertlink = document.createElement('a');
    alertlink.setAttribute('href', 'inbox.pl?alerts=1.pl');
    alertlink.setAttribute('class', 'toolbar_item');

    var tn = document.createTextNode('Alerts (' + numNewAlerts + ')');
    alertlink.appendChild(tn);

    toolbarlinks[5].firstChild.nodeValue = toolbarlinks[5].firstChild.nodeValue + '(' + numNewPMs + ')';

    toolbarlinks[6].parentNode.insertBefore(alertlink,toolbarlinks[6]);

    if (parseInt(numNewAlerts)==0 && parseInt(numNewPMs) == 0) {
        GM_setValue('alreadyopened','0');
    }

    var alreadyopened = GM_getValue('alreadyopened', '0');

    if (newtab ==1 && alreadyopened == '0') {
        if (parseInt(numNewAlerts)>0) {
            GM_openInTab('http://goallineblitz.com/game/inbox.pl?alerts=1.pl');
        }
        if (parseInt(numNewPMs)>0) {
            GM_openInTab('http://goallineblitz.com/game/inbox.pl');
        }
    }

    }});
}else if (window.location.href.indexOf('http://goallineblitz.com/game/inbox.pl') == -1){
    var bodySource = document.body.innerHTML;
    var newPM = bodySource.split('<div id="inbox_button"><div>');
    var newPM1 = newPM[1].split('</div>');
    var numNewPMs = newPM1[0];
    
    
    var newAlert = bodySource.split('<div id="alerts_button"><div>');
    var newAlert1 = newAlert[1].split('</div>');
    var numNewAlerts = newAlert1[0];
    
    var toolbarlinks = document.getElementsByTagName('a');

    var alertlink = document.createElement('a');
    alertlink.setAttribute('href', 'inbox.pl?alerts=1.pl');
    alertlink.setAttribute('class', 'toolbar_item');

    var tn = document.createTextNode('Alerts (' + numNewAlerts + ')');
    alertlink.appendChild(tn);

    toolbarlinks[5].firstChild.nodeValue = toolbarlinks[5].firstChild.nodeValue + '(' + numNewPMs + ')';

    toolbarlinks[6].parentNode.insertBefore(alertlink,toolbarlinks[6]);

    if (parseInt(numNewAlerts)==0 && parseInt(numNewPMs) == 0) {
        GM_setValue('alreadyopened','0');
    }

    var alreadyopened = GM_getValue('alreadyopened', '0');

    if (newtab ==1 && alreadyopened == '0') {

        GM_setValue('newtab','0')
        if (parseInt(numNewAlerts)>0) {
            GM_openInTab('http://goallineblitz.com/game/inbox.pl?alerts=1.pl');
        }
        if (parseInt(numNewPMs)>0) {
            GM_openInTab('http://goallineblitz.com/game/inbox.pl');
        }
    }

}
