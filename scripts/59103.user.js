// ==UserScript==
// @name			Twitter Account Switcher
// @author			Erik Vold
// @namespace		twitterAccountSwitcher
// @include			/https?:\/\/twitter\.com.*/i
// @include			http*://twitter.com*
// @include			http*://*.twitter.com*
// @version			0.1.3
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-09-03
// @lastupdated		2010-03-07
// @description		This userscript helps twitter users switch between accounts.
// ==/UserScript==

var twitterAccountSwitcher={};
twitterAccountSwitcher.newProfileSelect='';
twitterAccountSwitcher.defaultSelected=0;
twitterAccountSwitcher.currentUsername='';
twitterAccountSwitcher.addUsernameToList = function(list,username){
	if(list.match(username)) return list;
	else if(list!="") return list + "," + username;

	return username;
}
twitterAccountSwitcher.changeFunc=function(e){
	var select = twitterAccountSwitcher.newProfileSelect,
		selected = select.selectedIndex,
		options=select.options,
		optLen = options.length,
		optionsIndex = optLen-4;

	if(selected==0) return;
	else if(selected<optionsIndex){
		var tempUsername = twitterAccountSwitcher.newProfileSelect.options[selected].value;
		if(twitterAccountSwitcher.currentUsername!=tempUsername){
			document.cookie = "_twitter_sess=false; expires=15/06/1999 00:00:00; path=/; domain=.twitter.com";
			document.cookie = "auth_token=false; expires=15/06/1999 00:00:00; path=/; domain=.twitter.com";
			if (GM_getValue("hrefB4UserSwitch", "") != "") {
				GM_setValue("hrefB4UserSwitch", window.location.href);
			}
			window.location = "http://twitter.com/login?username="+tempUsername;
		}

		return;
	}
	else if (selected==optionsIndex){
		// ADD USER
		var newUsername = prompt("New Username:");
		if(!newUsername) return;
		GM_setValue('usernameList',twitterAccountSwitcher.addUsernameToList(GM_getValue('usernameList',''),newUsername));
		if(confirm("You must refresh the page to see the change")){
			window.location=window.location.href;
		}
		select.selectedIndex = twitterAccountSwitcher.defaultSelected;

		return;
	}
	else if (selected==optionsIndex+1){
		// REMOVE USER
		var removeUsername = prompt("Remove Username:");
		if(!removeUsername) return;
		GM_setValue('usernameList',GM_getValue('usernameList','').replace(eval("/("+removeUsername+",|,"+removeUsername+"|"+removeUsername+")/i"),"",'i'));
		if(confirm("You must refresh the page to see the change")){
			window.location=window.location.href;
		}
		select.selectedIndex = twitterAccountSwitcher.defaultSelected;

		return;
	}
	else if (selected==optionsIndex+2){
		// RESET
		GM_setValue('usernameList','');
		if(confirm("You must refresh the page to see the change")){
			window.location=window.location.href;
		}
		select.selectedIndex = twitterAccountSwitcher.defaultSelected;

		return;
	}
	else{
		//CHANGE REDIRECT SETTGIN
		var option=options[selected];
		select.selectedIndex = twitterAccountSwitcher.defaultSelected;
		var redirectStatus=option.innerHTML.match(/ON/);
		if(redirectStatus){
			GM_setValue("hrefB4UserSwitch","");
			option.innerHTML="Login Redirect: OFF";
			alert('You will now stay at the home page after login.');
		}
		else{
			GM_setValue("hrefB4UserSwitch","done");
			option.innerHTML="Login Redirect: ON";
			alert('You now will be redirected to the page you were at after login.');
		}
	}
};
twitterAccountSwitcher.nonLoginPg=function(){
	var header=document.getElementById('header');
	if(!header) return;

	var topNav=header.getElementsByClassName('top-navigation')[0];
	if(!topNav) return;

	var topNavLink=document.evaluate(".//a[@accesskey='l' or @accesskey='p']",topNav,null,9,null).singleNodeValue;
	if(!topNavLink) return;

	var newProfileSelect=document.createElement('select');
	twitterAccountSwitcher.newProfileSelect=newProfileSelect;
	newProfileSelect.name="gm-profile-selector";
	newProfileSelect.id="gm-profile-selector-id";

	tempOption = document.createElement('option');
	tempOption.setAttribute('style','display:block;');
	tempOption.value="null";
	tempOption.innerHTML="NULL";
	newProfileSelect.appendChild(tempOption);

	var tempOption, tempOptGroup, currentUsername='', usernameList=GM_getValue('usernameList','');
	if(topNavLink.getAttribute("accesskey")=='p'){
		currentUsername=topNavLink.href.match(/twitter\.com\/([^\s\?#]*)/i);
		if(!currentUsername) return;
		currentUsername=currentUsername[1];
	}

	// Check if a redirect should be performed
	var hrefB4UserSwitch=GM_getValue("hrefB4UserSwitch","").replace(/done/,'');
	if(window.location.pathname=="/" && document.referrer=="http://twitter.com/login?username="+currentUsername && hrefB4UserSwitch!="" ){
		GM_setValue("hrefB4UserSwitch","done");
		window.location=hrefB4UserSwitch;
		return;
	}

	twitterAccountSwitcher.currentUsername = currentUsername;
	if(currentUsername!="" && !usernameList.match(/currentUsername/i)){
		usernameList = twitterAccountSwitcher.addUsernameToList(usernameList,currentUsername);
	}
	GM_setValue('usernameList',usernameList);
	var usernameAry=usernameList.split(",");

	tempOptGroup = document.createElement('optgroup');
	tempOptGroup.setAttribute('style','display:block;');
	tempOptGroup.label = "Accounts";

	for(var i=0;i<usernameAry.length;i++){
		tempOption = document.createElement('option');
		tempOption.setAttribute('style','display:block;');
		tempOption.value=usernameAry[i];
		tempOption.innerHTML="@"+usernameAry[i];
		if(usernameAry[i]==currentUsername){
			tempOption.selected="selected";
			twitterAccountSwitcher.defaultSelected=i+1;
		}
		tempOptGroup.appendChild(tempOption);
	}

	newProfileSelect.appendChild(tempOptGroup);

	tempOptGroup = document.createElement('optgroup');
	tempOptGroup.setAttribute('style','display:block;');
	tempOptGroup.label = "Options";

	tempOption = document.createElement('option');
	tempOption.setAttribute('style','display:block;');
	tempOption.value="add-user";
	tempOption.innerHTML="Add User";
	tempOptGroup.appendChild(tempOption);

	tempOption = document.createElement('option');
	tempOption.setAttribute('style','display:block;');
	tempOption.value="remove";
	tempOption.innerHTML="Remove User";
	tempOptGroup.appendChild(tempOption);

	tempOption = document.createElement('option');
	tempOption.setAttribute('style','display:block;');
	tempOption.value="reset";
	tempOption.innerHTML="Reset List";
	tempOptGroup.appendChild(tempOption);

	tempOption = document.createElement('option');
	tempOption.setAttribute('style','display:block;');
	tempOption.value="redirect";
	hrefB4UserSwitch=GM_getValue("hrefB4UserSwitch","done");
	if(hrefB4UserSwitch!=""){
		if(hrefB4UserSwitch=="done") GM_setValue("hrefB4UserSwitch","done");
		tempOption.innerHTML="Login Redirect: ON";
	}
	else{
		tempOption.innerHTML="Login Redirect: OFF";
	}
	tempOptGroup.appendChild(tempOption);

	newProfileSelect.appendChild(tempOptGroup);
	newProfileSelect.addEventListener("change",twitterAccountSwitcher.changeFunc,false);
	topNavLink.parentNode.appendChild(newProfileSelect);
	return;
};
twitterAccountSwitcher.loginPg=function(){
	var username=window.location.search.match(/username=([^&]*)/i);
	if(!username) return;

	username=username[1];
	document.getElementById('username_or_email').value=username;

	var password = document.getElementById('password');
	password.focus();
	if(password.value!="") document.getElementById('signin_submit').click();

	return;
};
twitterAccountSwitcher.run=function(){
	if(window.location.pathname=='/login') twitterAccountSwitcher.loginPg();

	twitterAccountSwitcher.nonLoginPg();

	return;
};
twitterAccountSwitcher.run();