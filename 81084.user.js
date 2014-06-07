// ==UserScript==
// @name        Facebook Autopoke Multi-Language
// @author      Andreas Terpotiz
// @namespace   at_autopoke
// @description Automatically pokes back pokers listed on your home page. This script was inspired by http://userscripts.org/scripts/show/5200.
// @version     0.1
// @license     GPL
// @include     http*://facebook.com/home.php*
// @include     http*://*.facebook.com/home.php*
// @include     http*://*.facebook.com/
// @include     http*://*.facebook.com/?*
// @include     http*://*.facebook.com/#*
// 
// @require     http://usocheckup.dune.net/5200.js
//
// ==/UserScript==
var debug = 0;
var retries = 40;
var wait = 1500; // 1.5 seconds

var subDomainRegExp = /http[s]?:\/\/(.*\.)facebook\.com/;
var subDomain = '';
var debug_url = /&autopoke_debug=(\d+)/;
var language='';

var lang =
{
	en:
	{
		'Autopoke debugging as been activated to level ' : 'Autopoke debugging as been activated to level ',
		'Autopoke debugging as been activated via URL to level ' : 'Autopoke debugging as been activated via URL to level ',
		'Auto-Poke failed! [1.1]' : 'Auto-Poke failed! [1.1]',
		'Auto-Poke failed! [1.2]' : 'Auto-Poke failed! [1.2]',
		'Poke back links found: ' : 'Poke back links found: ',
		'No pokes found. Retries left: ' : 'No pokes found. Retries left: ',
		'Retrieving confirmation page' : 'Retrieving confirmation page',
		'Reading confirmation page' : 'Reading confirmation page',
		'Auto-Poke failed -- Error Code 1.1: While retreiving the poke confirmation page, the script was unable to determine whether the user had already been poked or is about to be poked.  This is likely the result of Facebook changing their code again.' : 'Auto-Poke failed -- Error Code 1.1: While retreiving the poke confirmation page, the script was unable to determine whether the user had already been poked or is about to be poked.  This is likely the result of Facebook changing their code again.',
		'Auto-Poke failed -- Error Code 1.2: The poke confirmation page returned a non-200 OK response\n\nfacebook returned:' : 'Auto-Poke failed -- Error Code 1.2: The poke confirmation page returned a non-200 OK response\n\nfacebook returned:',
		'Auto-Poke failed -- Error Code 2.1: Facebook gave an unexpected response to the poke.' : 'Auto-Poke failed -- Error Code 2.1: Facebook gave an unexpected response to the poke.',
		'Auto-Poke failed -- Error Code 2.2: Facebook.com gave a non-200 OK response.\n\nfacebook.com returned: ' : 'Auto-Poke failed -- Error Code 2.2: Facebook.com gave a non-200 OK response.\n\nfacebook.com returned: ',
		'Auto-Poke failed -- Error Code 2.3: The script experienced unknown errors while attempting to confirm the poke.' : 'Auto-Poke failed -- Error Code 2.3: The script experienced unknown errors while attempting to confirm the poke.',
		'nodes returned: ' : 'nodes returned: ',
		'Current Location: ' : 'Current Location: ',
		'Unsupportet Language. Please UNINSTALL this Greasemonkey script.' : 'Unsupportet Language. Please UNINSTALL this Greasemonkey script.',
		'Facebook-Intern' : 'Facebook-Intern',
		'Pokes' : 'Pokes',
		'Auto-poke' : 'Auto-poke',
		'You are about to poke' : 'You are about to poke',
		'You have poked' : 'You have poked',
		'has not received your last poke yet' : 'has not received your last poke yet',
		'Already poked!' : 'Already poked!'
	},
	
	de:
	{
		'Pokes' : 'Anstupser',
		'Auto-poke' : 'Auto-Anstupser',
		'You are about to poke' : 'Du bist im Begriff,',
		'You have poked' : 'Du hast',
		'has not received your last poke yet' : 'hat deinen letzten Anstupser noch nicht erhalten.',
		'Already poked!' : 'Already poked!'
	}
}

// Get a string in the current language, or default to english
function $choose_lang(key) {
	var string, l;
	
	if (lang[language][key])
	{
		string = lang[language][key];
	} else {
		string = lang['en'][key];
	}

	return string;
}

buffer = document.body.className.match(/locale_([^ ]+)/i);
language_buf = buffer[1].toLowerCase().split('_');
language = language_buf[0];

//alert(language);
//return;

if (subDomainRegExp.exec(document.location) != 0)
     subDomain = RegExp.$1;

if ((debug_url.exec(document.location) != 0) && (RegExp.$1 > debug)) {
     debug = RegExp.$1;
     alert($choose_lang('Autopoke debugging as been activated via URL to level ') + debug);
     GM_log($choose_lang('Autopoke debugging as been activated via URL to level ') + debug);
}

if (debug > 0) GM_log($choose_lang('Current Location: ') + document.location);

setTimeout(init, wait);

// =-=-=-=-=- FUNCTIONS -=-=-=-=-= //
function init() {
	//
	// Figure out what language we should be using
	//
	html_tag = evaluate_xpath('.//html');

	if (!lang[language]) {
		alert($choose_lang('Unsupportet Language. Please UNINSTALL this Greasemonkey script.'));
		return 1;
    } else {
		if (debug > 0) {
			var poke_div = evaluate_xpath('.//h4[contains(.,' + $choose_lang('Pokes') + ')]');

			if (poke_div.snapshotLength == 1) {
				poke_div.snapshotItem(0).innerHTML += ' <a href="#" id="auto_poke">'+$choose_lang('Auto-poke')+'</a>';
				evaluate_xpath('.//a[@id="auto_poke"]').snapshotItem(0).addEventListener('click', find_pokes, true);
			}
		}
		find_pokes();
	}
}

function find_pokes() {
     // Retrieve poke links via XPath
     var anchors = evaluate_xpath('.//a[@id[starts-with(.,"poke")]]');

     if (anchors.snapshotLength > 0) {
	  if (debug > 0) GM_log($choose_lang('Poke back links found: ') + anchors.snapshotLength)
	  var pokeRegExp = /id=(\d*)/;
	  for (var i = 0; i < anchors.snapshotLength; i++) {
	       pokeRegExp.exec(anchors.snapshotItem(i).href);
	       poke_function(anchors.snapshotItem(i).href, anchors.snapshotItem(i));
	  }
     } else {
	  retries--;
	  GM_log($choose_lang('No pokes found. Retries left: ') + retries);
	  setTimeout(find_pokes, wait);
     }
}


function poke_function(poke_link, poke_node) {
     var uid_match = /uid=(\d+)&can_poke=(\d+)/;
     uid_match.exec(poke_link);
     var poke_uid = RegExp.$1;

     poke_link += "&__a=1&__d=1";
     if (debug > 0) GM_log( $choose_lang('Retrieving confirmation page') + "(" + poke_link + ")");

     GM_xmlhttpRequest({
	  method:'GET',
	  url:poke_link,
	  onload: function(response) {
	       if (response.status == 200) {
		    if (response.responseText.indexOf($choose_lang('You are about to poke')) != -1) {
			 poke_node.innerHTML = $choose_lang('Reading confirmation page') + '(' + poke_uid + ')...';
			 if (debug >= 2) GM_log("Text:" + response.responseText);
			 execute_poke(poke_uid, poke_node);
		    } else if (response.responseText.indexOf($choose_lang('has not received your last poke yet')) != -1) {
			 poke_node.removeAttribute('href');
			 poke_node.innerHTML = $choose_lang('Already poked!');
		    } else {
			 poke_node.removeAttribute('href'); 
			 poke_node.innerHTML = $choose_lang('Auto-Poke failed! [1.1]'); 
			 GM_log($choose_lang('Auto-Poke failed -- Error Code 1.1: While retreiving the poke confirmation page, the script was unable to determine whether the user had already been poked or is about to be poked.  This is likely the result of Facebook changing their code again.')); 
			 GM_log(response.responseText);
		     }
	      } else {
		    poke_node.innerHTML = $choose_lang('Auto-Poke failed! [1.2]');
		    GM_log($choose_lang('Auto-Poke failed -- Error Code 1.2: The poke confirmation page returned a non-200 OK response\n\nfacebook returned:') + response.status + response.statusText);
	      }
	  }
     }); // end of GM_xmlhttpRequest

}

function execute_poke(poke_uid, poke_node) {
     GM_log('cookie: ' + document.cookie);
     var post_form_id = evaluate_xpath('.//*[@id="post_form_id"]').snapshotItem(0).value;
     var fb_dtsg = evaluate_xpath('.//*[@name="fb_dtsg"]').snapshotItem(0).value;
     var post_data = 'uid=' + poke_uid + '&pokeback=1&post_form_id=' + post_form_id + '&fb_dtsg=' + fb_dtsg + '&post_form_id_source=AsyncRequest';

     poke_node.innerHTML = 'Executing autopoke (' + poke_uid + ')...';
     if (debug > 0) GM_log('post_data: ' + post_data);

     //Submit the poke.
     GM_xmlhttpRequest({
	  method:'POST',
	  url:'http://' + subDomain + 'facebook.com/ajax/poke.php?__a=1',
	  headers:{
	       'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
	       'Referer':document.location,
	       'Cookie':document.cookie,
	  },
	  data:post_data,
	  onload: function (response) {
	       if (response.status == 200) {
		    //Poke either already happened, was successful, or failed.
		    if (response.responseText.indexOf('has not received your last poke yet') != -1) {
			 poke_node.removeAttribute('href');
			 poke_node.innerHTML = 'Already poked!';
		    } else if (response.responseText.indexOf($choose_lang('You have poked')) != -1) {
			 poke_node.removeAttribute('href');
			 poke_node.innerHTML = 'Auto-Poked!';
		    } else {
			 poke_node.innerHTML = 'Poke failed! [2.1]';
			 GM_log($choose_lang('Auto-Poke failed -- Error Code 2.1: Facebook gave an unexpected response to the poke.'));
			 GM_log(response.responseText);
		    }
	       } else {
		    poke_node.innerHTML = 'Poke failed! [2.2]';
		    GM_log($choose_lang('Auto-Poke failed -- Error Code 2.2: Facebook.com gave a non-200 OK response.\n\nfacebook.com returned: ') + response.status + response.statusText);
		    GM_log(response.responseText);
	       }
	  },
	  onerror: function (responseDetails) {
	       poke_node.removeAttribute('href');
	       poke_node.innerHTML = 'Poke failed! [2.3]';
	       GM_log($choose_lang('Auto-Poke failed -- Error Code 2.3: The script experienced unknown errors while attempting to confirm the poke.'));
	       GM_log(response.responseText);
	  }
     });
}

function evaluate_xpath(xpath_query) {
     if (debug >= 2) GM_log(xpath_query);
     var nodes = document.evaluate(xpath_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
     if (debug >= 1) GM_log($choose_lang('nodes returned: ') + nodes.snapshotLength);
     return nodes;
}