// ==UserScript==
// @name        Google Account Chooser Cleaner
// @namespace   http://se7en-soft.com
// @include     https://accounts.google.com/ServiceLogin?*
// @include     https://accounts.google.com/AccountChooser?*
// @include		https://accounts.google.com/Login?*
// @include		https://accounts.google.com/Logout?*
// @include		https://accounts.google.com/SignOutOptions?*
// @include		https://*.google.com/*
// @include		https://*.youtube.com/*
// @version		1.0.13
// @grant		none
// ==/UserScript==

//Defines the amount of time to delay functions that are wrapped inside of 'setTimeout' calls
const delay = 50;

const landingPage = "https://www.google.com/landing/signout.html";

//---------------------------------------------------------------------------------------------------------------------------------
//-- defines whether or not to send you to the www.google.com home page after logging out or to use the 'continue' parameter value
//-- change this to suite yourself
//---------------------------------------------------------------------------------------------------------------------------------
const sendHomeOnLogout = false;

(function(){

	var cUrl = parseURL(document.location);
	if(document.location.href == landingPage)
		document.location = "http://www.google.com";
	
	
	//Determine if we're on the page with the Account Chooser widget.
	if(cUrl.params["sacu"] == undefined){
		
		if(document.location.href.indexOf("https://accounts.google.com/SignOutOptions?") != -1){
			var signOut = document.getElementsByName("signout");
			if(signOut){
				var so = signOut[0];
				so.setAttribute('id', 'LogMeTheFuckOut!');
				clickElement(so.id);
			}
		}
		
		var reauthEmail = $('#reauthEmail');
		if(reauthEmail && reauthEmail.textContent.length > 0){
			//we're on a page that displays the last account we were logged in with and only gives us the option of filling the password for the same account.
			var acctChooserLink = $("#account-chooser-link");
			if(acctChooserLink)
				clickElement('account-chooser-link');
		} else {
			//Call the 'clearAccounts' method to ensure that local accounts are deleted if more than one is saved.
			clearAccounts();
		}
	} 
	
	//Figure out what service we're trying to access
	if(cUrl.params["service"]){
	
		var buttonText = "Sign in []";
		var service = cUrl.params["service"];
		var rText = "";
		
		if(service == "mail")
			rText = "for GMail";
			
		if(service == "local")
			rText = "for Maps";
			
		if(service == "youtube")
			rText = "for YouTube";
			
		if(service == "wise")
			rText = "for Drive";
			
		if(service == "groups2")
			rText = "for Google Groups";
			
		if(service == "oz") //they must be in the land of fucking OZ to keep pushing this shit on everyone!
			rText = "for Google+"
		
		if(rText != ""){
			//Adjust the Sign In button text to match the service
			$('#signIn').setAttribute('value', buttonText.replace('[]', rText));
		}
	}

	//look for and slightly modify the 'Sign out' link.
	modLogoutLink();
	
	
})()

function modLogoutLink(){
	//get a parsed url for this page
	var locHref = parseURL(document.location.href);
	var links = document.documentElement.querySelectorAll("a"),
		target, href, isYT;
		
	//are we on a YouTube page?
	isYT = locHref.host.indexOf("youtube.") != -1;
	if(isYT){
		//find the YT logout button
		var signOutButton = $("#yt-masthead-multilogin-sign-out");
		if(signOutButton){
			//remove the 'onclick' handler from the button
			signOutButton.removeAttribute('onclick');
			//add our own 'click' handler function to the button
			signOutButton.addEventListener('click', function(e){
				e.preventDefault();
				var continu = sendHomeOnLogout ? "http://www.google.com" : document.location.href;
				if(continu == undefined)
					continu = encodeURI("http://www.google.com");
				document.location = "https://accounts.google.com/Logout?continue=https://accounts.google.com/ServiceLogin?continue=" + continu;
			});
		}
	}
	
	//loop through the link collectin so we can find the 'Sign out' link
	for(var i = 0; i < links.length; i++){
		var lnk = links[i];
		href = parseURL(lnk.href);
		//is this the link we're looking for?
		if(lnk.textContent.toLowerCase().indexOf("Manage accounts") != -1){
			target = lnk;
			if(isYT){
				var continu = sendHomeOnLogout ? "http://www.google.com" : document.location.href;
				target.removeAttribute('onclick');
				target.href = "https://accounts.google.com/Logout?continue=https://accounts.google.com/ServiceLogin?continue=" + continu;
			} else {
				target.addEventListener('click', function(e){
					e.preventDefault(); //prevent the link from registering the click event
					var continu = sendHomeOnLogout ? "http://www.google.com" : parseURL(target.href).params["continue"];
					//manually redirect the page so that logout happens and then auto-redirects to the login page where the account chooser is then purged.
					if(continu == undefined)
						continu = encodeURI("http://www.google.com");
					document.location = "https://accounts.google.com/Logout?continue=https://accounts.google.com/ServiceLogin?continue=" + continu;
				});
			}
		}
	}
	
	
}

function clearAccounts(){
	//Find the account chooser title
	var accountChooserHeading = document.getElementById('accountchooser-title');
	if(accountChooserHeading)
		//Patch the content to be a bit more meaningful..
		accountChooserHeading.innerHTML = "Please select a tracking profile...";
	
	//This is not the page where you can add new accounts..
	//We need to re-navigate the page to where new accounts can be added
	var AddAccountLink = document.getElementById('account-chooser-add-account');
		
	if(AddAccountLink){
		//Re-navigate the document to our target page. The AddAccountLink points at our target so, we'll use its 'href' value and change the document location to it.
		//document.location.href = AddAccountLink.getAttribute('href');
		AddAccountLink.textContent = "Add New Tracking Profile";
	}
	//Find the list element that allows you to remove accounts
	removeLocalAccounts();
}

function removeLocalAccounts(){
	var RemAccountLink = document.getElementById('edit-account-list');
	if(RemAccountLink){
		//Automate a 'click' on the Edit-Account-List element so that the accounts can be removed
		clickElement('edit-account-list');
						
		//Give the page a 100ms to update elements in response to clicking the Edit-Account-List element
		setTimeout(function(){
			//Find the Account-List element
			var acctList = document.getElementById('account-list');
			if(acctList){
				//Get a collection of the buttons in the list
				var buttons = $$('li button', acctList);
				//Sanity check!	
				if(buttons.length > 0){
					//Loop through the button collection
					for(var b = 0; b < buttons.length; b++){
					
						var button = buttons[b],
							emailAddress = button.value;
						
						//Automate a 'click' on each button
						clickElement(button.id);
						
						//---------------------------------------------------------------------------------------------------------------------------------
						// This bit of script was taken from the page and is being used against it in order to remove the local accounts.
						var params = [];
						params['Email'] = emailAddress; 
							
						try{
							G_sendXmlHttpRequest(params, 'RemoveLocalAccount', gaia.bind(gaia.AccountChooser, handleGaiaRemoveResponse(emailAddress))); 
						}
						catch(e){
							alert(e);
						}
						//----------------------------------------------------------------------------------------------------------------------------------
					}
					
					//Set a time out of 100ms to allow the page elements to update after clicking each button and calling the remove AJAX call on them
					setTimeout(function(){
						//Find the element with the Edit-Account-List id. It should now be an anchor element
						var doneLink = document.getElementById('edit-account-list');
						
						//Sanity check!
						if(doneLink){
						
							//Fetch the link destination from the anchor
							var href = doneLink.getAttribute('href');
							
							//Forcefully navigate the page to the link destination to ensure local accounts are cleared.
							document.location.href = href;
						}
					}, delay);
						
						
				}
			}
		}, delay);
	}
}

function handleGaiaRemoveResponse(emailAddress){
	//----------------------------------------------------------------------------------------------------
	// Taken directly from the page. Called to handle removal of local account objects.
	return function(response) {
		if (response.status == 200) {
			try {
				var elem = document.getElementById('account-' + emailAddress);
				if (elem) {
					gaia.AccountChooser.accountList_.removeChild(elem);
					if (gaia.AccountChooser.accountList_.getElementsByTagName('li').length == 0) {
						gaia.AccountChooser.createAndAppendEmptyNotice_();
						gaia.AccountChooser.updateDoneLinkActionForEmptyList_();
					}
				}
			} 
			catch (err) {
			
			};
		}
	}; 
	//----------------------------------------------------------------------------------------------------
}

function clickElement(d){
	//Find the element in the document
	var elm = document.getElementById(d);
	if(elm){
		//Create a new event 
		var evt = document.createEvent("MouseEvent");
		//Initialize it as a mouse event
		evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		//Dispatch the event on the found DOM element
		elm.dispatchEvent(evt);
	}
}

//------------------------------------------------------------------------------------------------------------
// Begin Utility Functions
//------------------------------------------------------------------------------------------------------------

function $ (selector, el) {
     if (!el) {el = document;}
     return el.querySelector(selector);
}

function $$ (selector, el) {
     if (!el) {el = document;}
     return el.querySelectorAll(selector);
     // Note: the returned object is a NodeList.
     // If you'd like to convert it to a Array for convenience, use this instead:
     // return Array.prototype.slice.call(el.querySelectorAll(selector));
}

function endsWidth(input, test){
	if(!input || !test) return false;
	
	var idx = input.indexOf(test);
	if(idx > -1)
		return input.subString(idx, test.length) === test;
	return false;
}

function startsWidth(input, test){
	if(!input || !test) return false;
	return input.subString(0, test.length) === test;
}

function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}

//------------------------------------------------------------------------------------------------------------
// End Utility Functions
//------------------------------------------------------------------------------------------------------------