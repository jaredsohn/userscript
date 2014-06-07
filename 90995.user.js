// ==UserScript==
// @name           RFD Forums - Private Message Receipts - Add Toggle CheckBoxes
// @namespace      http://userscripts.org/users/238624
// @description    Adds 'Select/Unselect All' toggle buttons for Confirmed & Unconfirmed Private Message Receipts mass-deletion
// @include        http://forums.redflagdeals.com/private.php?do=trackpm
// @author         RenegadeX
// @version        1.1
// ==/UserScript==

// DEPRECATED due to forum fix Dec 8 2010
alert("**GREASEMONKEY SCRIPT ALERT**\n\nThe 'RFD Forums - Private Message Receipts - Add Toggle CheckBoxes' script is no longer necessary due to a forum fix Dec 8 2010\n\nUninstall this script manually via the GreaseMonkey 'Manage Scripts' interface");

// ORIGINAL CODE BELOW left commented-out for historical purposes


// //Get number of Private Message forms on page
// var xpath = "//div[@class='cp_content']//form";
// var numForms = document.evaluate('count('+xpath+"/h2[(text()='Confirmed Private Message Receipts') or (text()='Unconfirmed Private Message Receipts')]"+')', document, null, 1, null).numberValue;
// 
// //Set up form elements
// var headerElem = new Array (numForms);
// var toggleBtn = new Array (numForms);
// var toggleLabel = new Array (numForms);
// 
// //Get header rows for each form
// for (h=0; h<numForms; h++) {
// 	headerElem[h] = document.evaluate(xpath+"/h2", document, null, 7, null).snapshotItem(h);
// 	
// 	//Create the Toggle button
// 	toggleBtn[h] = document.createElement('input');
// 	toggleBtn[h].setAttribute('id','checkall_all');
// 	toggleBtn[h].className = 'checkall pm_checkall';
// 	toggleBtn[h].type = 'checkbox';
// 	toggleBtn[h].value = 'false';
// 	toggleBtn[h].title = 'Check / Uncheck All';
// 	toggleBtn[h].name = 'allbox'+h;	
// 	
// 	//Create the Toggle button label
// 	toggleLabel[h] = document.createElement('dl');
// 	toggleLabel[h].className = 'stats foldercount';
// 	toggleLabel[h].innerHTML = '<dt class=\"folder_count\">Select/Unselect All</dt></dl>';
// 	
// 	// Insert the toggle & label into the header
// 	headerElem[h].parentNode.insertBefore(toggleBtn[h], headerElem[h]);
// 	headerElem[h].parentNode.insertBefore(toggleLabel[h], headerElem[h]);
// 
// 	//Insert eventListener for toggle box(es)	
// 	toggleBtn[h].addEventListener("click",CheckAllBoxes, false);
// }
// 
// //Check/Uncheck function
// function CheckAllBoxes(evt) {
// 	var formNum = parseInt(evt.target.name[evt.target.name.length-1])+1;
// 	var Checkboxes = document.evaluate(xpath+'['+formNum+']'+"/ol/li/label/input[@type='checkbox']", document, null, 7, null);
// 	for (var i=0 ; i<Checkboxes.snapshotLength; i++) {
//  				Checkboxes.snapshotItem(i).checked = evt.target.checked;
//  	}
// }
// 
// //fix 'Delete Messages' button hover text
// var deleteButton = document.evaluate("//input[@value='Delete Messages']", document, null, 7, null);
// for (dbNum=0; dbNum<deleteButton.snapshotLength; dbNum++) {
// 	 	deleteButton.snapshotItem(dbNum).title='Delete Messages';
// }

/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_162', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_162', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=162&version=0.9';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();