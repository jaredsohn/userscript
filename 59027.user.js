// ==UserScript==
// @name          testaankoop
// @namespace     http://myTselection.blogspot.com
// @description	  Provide PDF download next to overview of magazine content, to make it much easier to download the magazine archive with less pageloads: www.test-aankoop.be/tadoc, www.test-aankoop.be/tgdoc, www.test-aankoop.be/brdoc
//                Working for Test Aankoop magazines, Test Gezondheid magazines and Budget & Recht magazines
// @include       http://*test-aankoop.be/*
// ==/UserScript==

// file: 	testaankoop.user.js
// date: 	2/10/2009 20:46:53
// author:	myTselection.blogspot.com
// license:	This file is in the public domain and comes with no warranty.
// history:	0.1	September 2009



function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('^' + classname + '$');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].className))a.push(els[i]);
	return a;
} 


function getElementsByNodeNameWithinNode(nodenamefilter, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('^' + nodenamefilter + '$');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
		if(re.test(els[i].nodeName))a.push(els[i]);
	return a;
} 


var pagelinksCol2 = getElementsByClassName('col2', document.getElementById('magazines'));
for(var i=0,j=pagelinksCol2.length;i<j;i++) {
    var yearMagazine = getElementsByClassName('line', document.getElementById('magazines'))[0].textContent.match(/(\d\d\d\d)/)[1];
    var monthMagazines = getElementsByNodeNameWithinNode('SCRIPT', document.getElementById('centralColumn'));
    var monthMagazine = monthMagazines[0].textContent.match(/\[\d\]\[(.*)-1/)[1];
    //var monthMagazine = prompt("Month?:","");
    //var yearMagazine = prompt("Year?:","");
    //alert('monthMagazine:'+monthMagazine + ',Year:' +yearMagazine);
	//alert('pagelinksCol2 ' + pagelinksCol2[i].className);
	var pageLinksACol2 = getElementsByNodeNameWithinNode('A', pagelinksCol2[i]);
	for (var i2=0,j2=pageLinksACol2.length;i2<j2;i2++) {
	   var pdf = document.createElement('A');
	   var contructedUrl;
		if(pageLinksACol2[i2].pathname.match('(.*)/')[1]) {
			contructedUrl = 'http://www.test-aankoop.be'+pageLinksACol2[i2].pathname.match('(.*)/')[1]+'/'+yearMagazine+monthMagazine+'01/'+pageLinksACol2[i2].pathname.match('/.*/(.*\.)htm')[1].replace(/-s(\d)/,'-Attach_s$1')+'pdf';
		}
		else {
			contructedUrl = 'http://www.test-aankoop.be/'+yearMagazine+monthMagazine+'01/'+pageLinksACol2[i2].pathname.match('/(.*\.)htm')[1].replace(/-s(\d)/,'-Attach_s$1')+'pdf';
		}

	   	pdf.setAttribute('href', contructedUrl);
	   pdf.appendChild(document.createTextNode(' (PDF) '))
	   pageLinksACol2[i2].parentNode.appendChild(pdf);
		//alert('pageLinksACol2'+pageLinksACol2[i2].pathname);
	}
	
}

var SUC_script_num = 59027; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
