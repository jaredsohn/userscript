// ==UserScript==
// @name           My T(C)
// @namespace      http://userscripts.org/users/65879
// @description    Add links: Vault next to Items,  Personal Stats next to Awards, Profile Signature under Account. Deletes Blackjack, Poker, Upgrade button
// @include        http://www.torn.com/* 
// @include        http://torn.com/* 
// @include        http://www.torncity.com/*
// @include        http://torncity.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


//test


//add links
//profil signature
var allLinks, thisLink;
allLinks = document.evaluate(
'//a[@href]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	hrefas = thisLink.href;

	if (hrefas.match("/playerpolicies.php") && hrefas.title != "undefined") {
		var elem2=document.createElement('span');		
		elem2.innerHTML='<br/>  &#8226; <a title="Profile Signature - Edit your Profile Signature" target="_self" href="/preferences.php?action=psig">Profile Signature</a>';
		thisLink.parentNode.insertBefore(elem2, thisLink.nextSibling);
	}
}



//personal stats
//var allLinks, thisLink;
//allLinks = document.evaluate(
//'//a[@href]',
//document,
//null,
//XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
//null);
//
//for (var i = 0; i < allLinks.snapshotLength; i++) {
//	thisLink = allLinks.snapshotItem(i);
//	hrefas = thisLink.href;
//
//	if (hrefas.match("/awards.php") && hrefas.title != "undefined") {
//		var elem2=document.createElement('span');		
//		elem2.innerHTML=' | <a title="View personal stats" target="_self" href="personalstats.php">Pr. Stats</a>';
//		thisLink.parentNode.insertBefore(elem2, thisLink.nextSibling);
//	}
//}

//vault
{try{$('font > strong:contains("Areas")').parent().after('<br/><a title="Vault - Here you can manage what goes in to your ultra safe vault." target="_self" href="/properties.php?step=vault&ID=296897">Vault</a>')}catch(ex){}}

// bounties
var allLinks, thisLink;
allLinks = document.evaluate(
'//a[@href]',
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
	thisLink = allLinks.snapshotItem(i);
	hrefas = thisLink.href;

	if (hrefas.match("/newspaper.php") && hrefas.title != "undefined") {
		var elem2=document.createElement('span');		
		elem2.innerHTML=' | <a title="Bounties - Head over to the bounties section for more information!" target="_self" href="/bounties.php">Bounties</a>';
		thisLink.parentNode.insertBefore(elem2, thisLink.nextSibling);
	}
}

// stockmarket
// var allLinks, thisLink;
// allLinks = document.evaluate(
// '//a[@href]',
// document,
// null,
// XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
// null);
// 
// for (var i = 0; i < allLinks.snapshotLength; i++) {
// 	thisLink = allLinks.snapshotItem(i);
// 	hrefas = thisLink.href;
// 
// 	if (hrefas.match("/city.php") && hrefas.title != "undefined") {
// 		var elem2=document.createElement('span');		
// 		elem2.innerHTML=' | <a title="Stock Market - Invest your hard earned money in the stock market!" target="_self" href="/stockexchange.php?step=portfolio">Stock Market</a>';
// 		thisLink.parentNode.insertBefore(elem2, thisLink.nextSibling);
// 	}
// }


//remove links
//blackjack
$('a[href="blackjack.php"]').after('Blacjack -Blocked-');
$('a[href="blackjack.php"]').hide();

//poker
$('a[href="poker.php"]').after('Poker -Blocked-');
$('a[href="poker.php"]').hide();

//levelupgrade
$('a[href^="level2.php"]').hide();

//RR
$('a[href="russianroulette.php"]').after('Dont');
$('a[href="russianroulette.php"]').hide();






//Mail
{try{$('font > strong:contains("Account")').parent().after('<br/>  &#8226; <a href="/messages.php?action=send&XID=479620" target="_self" title="Mail My T(C) Maker to help him. Suggest and bugs reports are more than welcome."><i>Mail My T(C)</i></a>')}catch(ex){}}





// Feel free to copy this into any script you write; that's what it's here for. A credit and/or URL back to here would be appreciated, though.
// I was careful to use as few variables as I could so it would be easy to paste right into an existing script. All the ones you need to set are at the very top.
// The target script needs to be uploaded to userscripts.org. The update checks will -not- increase the install count for the script there.
// This script is set up to check for updates to itself by default. It may be a good idea to leave it like this.

var SUC_script_num = 58909; // Change this to the number given to the script by userscripts.org (check the address bar)

try {
    function updateCheck(forced) {
        if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) { // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
            try {
                GM_xmlhttpRequest( {
									method: 'GET',
									url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
									headers: {'Cache-Control': 'no-cache'
									},
									onload: function(resp) {
										var local_version, remote_version, rt, script_name;

										rt=resp.responseText;
										GM_setValue('SUC_last_update', new Date().getTime()+'');
										remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
										local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
										if (local_version!=-1) {
											script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
											GM_setValue('SUC_target_script_name', script_name);
											if (remote_version > local_version) {
												if (confirm('There is an update available for the Greasemonkey script "'+script_name+"\"."
															+"\nLocal version is "+local_version+", while the version on the server is "+remote_version+"."
												+"\nWould you like to go to the install page now?")) {
                                    GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
                                    GM_setValue('SUC_current_version', remote_version);
									}
                            } else if (forced)
                                alert('No update is available for "'+script_name+'."');
                        } else
                            GM_setValue('SUC_current_version', remote_version+'');
                    }
                });
            } catch (err) {
                if (forced)
                    alert('An error occurred while checking for updates:\n'+err);
            }
        }
    }
    GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function() {
        updateCheck(true);
    });
    updateCheck(false);
} catch (err) {}
