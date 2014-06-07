// ==UserScript==
// @name        iTunesConnectAutoPopulate
// @namespace   CargoApps
// @include     https://itunesconnect.apple.com/WebObjects/iTunesConnect.woa/wo/*
// @require  	http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js
// @require  	http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.19/jquery-ui.min.js
// @resource    customCSS http://ajax.aspnetcdn.com/ajax/jquery.ui/1.8.19/themes/cupertino/jquery-ui.css
// @version     1
// ==/UserScript==



var newCSS = GM_getResourceText("customCSS");
GM_addStyle(newCSS);


var CA = {};
CA.accounts = null;
CA.currentAccountId = -1;
CA.currentAccount = null;

CA.createAccountChoiceDialog = function(){
	$(document.body).append('<div id="ca-choose-account" style="display: none"><label>Choose CargoApps Account:</label><select id="account-select"><option value="Select"></option></select></div>');
	var accountSelect = $('#ca-choose-account select');
	$.each(CA.accounts, function(index, account) {   
		accountSelect.append(
			$('<option>', { value : account.AccountId }).text(account.Name)
		); 
	});
	$('#ca-choose-account').dialog({
		title: 'Choose Cargo Apps Account',
		autoOpen: false,
		show: "blind",
		modal: true,
		hide: "explode",
		buttons: {
			Ok: function() {
				CA.currentAccountId = accountSelect.find('option:selected').val();
				$(this).dialog( "close" );
				if(CA.accountChosenCallBack){
					CA.accountChosenCallBack(CA.currentAccountId);
				}
			},
			Cancel:function(){
				$(this).dialog( "close" );
			}
		}
	});
};

CA.getAccountInfo = function(callBack){
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://staging.cargoapps.com/App/ItunesConnect/" + CA.currentAccountId,
		onload: function(xhr2) {
			var container = eval("(" + xhr2.responseText + ")");
			var accountInfo = container.info;
			CA.currentAccount = accountInfo;
			if(callBack != null){
				callBack(accountInfo);
			}
		}
	});
}
CA.accountChosenCallBack = null;
CA.chooseAccount = function(callBack){
	CA.accountChosenCallBack = callBack;
	$('#ca-choose-account').dialog('open');
};
CA.initialize = function(callBack){
	GM_xmlhttpRequest({
		method: "GET",
		url: "https://staging.cargoapps.com/AdminConfigureApp/ItunesConnectAccounts",
		onload: function(xhr) {
			var data = eval("(" + xhr.responseText + ")");
			CA.accounts = data;
			CA.createAccountChoiceDialog();
			if(callBack){
				callBack();
			}
		}
	});
};

CA.inputFromSibling = function(toolTipSelector, siblingSelector){
	var toolTip = $(toolTipSelector);
	if(toolTip.size() > 0){
		var input = toolTip.siblings(siblingSelector || 'input[type=text]');
		return input;
	}
	return null;
};

CA.isPresent = function(value){
	return value != null && value.size() > 0;
};

CA.setIfPresent = function(item, value){
	if(CA.isPresent(item)){
		var tagName = (item.get(0).nodeName || '').toLowerCase();
		switch(tagName){
			case 'select':
				$(item.selector + ' option').each(function(){
					if($(this).text() == value){
						$(this).attr('selected', true);
						return false;
					}
				});
				break;
			case 'input':
			default:			
				item.val(value);
				break;
		}
	}
};


$(document).ready(function(){
	CA.initialize(function(){
		console.log('initializing');
		var pricingPopup = $('#pricingPopup');
		if(pricingPopup.size() > 0){
			pricingPopup.find('option').each(function(){
				if($(this).text() == "Free"){
					$(this).attr('selected', true);
					return false;
				}
			});
			$('#education-checkbox').attr('checked', false);
			var reallyClearEdu = window.setInterval(
				function(){
					if($('#education-checkbox').attr('checked')){
						$('#education-checkbox').attr('checked', false);
					}else{
						window.clearInterval(reallyClearEdu);
					}
				},
				500
			);
		}
		
		var bundleIdentifierSelect = $('div.bundleIdentifierBox select option');
		if(bundleIdentifierSelect.size() != 0){
			bundleIdentifierSelect.each(function(index, option){
				var text=$(this).text();
				switch(text){
					case 'CargoAppsDemo - *':
					case 'PLC iTrack - com.freightinnovations.cargoapps.platinum':
						$(this).remove();
						break;
					default:
						break;
				}
			});
		}
		
		var versionNumber = CA.inputFromSibling('#versionNumberTooltipId');
		if(CA.isPresent(versionNumber)){
			versionNumber.val('1.0.0.1');
			CA.setIfPresent(
				$('#version-primary-popup'),
				'Business'
			);
			//var populateAppVersionInfoAndMetaData = function(){} 
			CA.chooseAccount(function(accountId){
				CA.getAccountInfo(function(){
					CA.setIfPresent(
						CA.inputFromSibling('#copyrightTooltipId'),
						(new Date()).getFullYear() + ' ' + CA.currentAccount.CompanyName
					);
					
					CA.setIfPresent(
						CA.inputFromSibling('#reviewNotesOptionalTooltipId', 'textarea'),
						[
							(CA.currentAccount.UseMyShipments || CA.currentAccount.UseQuickTrack) ? 'Testing Input Values:\r\n' : '',
							CA.currentAccount.UseMyShipments ? [
								'Quick Track Tab:\r\n\tTrackingNumber="',
								CA.currentAccount.TestTrackingNumber,
								'"\r\n'
							].join('') : '',
							CA.currentAccount.UseMyShipments ? [
								'My Shipments Tab:\r\n\tUserName="',
								CA.currentAccount.TestUsername,
								'"\r\n\tPassword="',
								CA.currentAccount.TestPassword,
								'"\r\n'
							].join('') : ''
						].join('')
					);
					$('#game-ratings input[type=radio]#rank-1').each(function(){
						$(this).attr('checked', true);
					});
					CA.setIfPresent(
						$('#descriptionUpdateContainerId textarea'),
						CA.currentAccount.AppStoreDescription
					);
					CA.setIfPresent(
						CA.inputFromSibling('#keywordsTooltipId'),
						CA.currentAccount.AppStoreKeywords
					);
					CA.setIfPresent(
						CA.inputFromSibling('#keywordsTooltipId'),
						CA.currentAccount.AppStoreKeywords
					);
					CA.setIfPresent(
						CA.inputFromSibling('#supportEmailAddressTooltipId'),
						'appsupport@cargoapps.com'
					);
					CA.setIfPresent(
						CA.inputFromSibling('#supportURLTooltipId'),
						CA.currentAccount.ContactPage
					);
					CA.setIfPresent(
						CA.inputFromSibling('#marketingURLOptionalTooltipId'),
						CA.currentAccount.Website
					);
				});
			});
			
			
		}
		
		var appNameText = $('div#appNameUpdateContainerId input[type=text]');
		if(appNameText.size() != 0 && appNameText.val() == ''){
			alert('here');
			CA.chooseAccount(function(accountId){
				CA.getAccountInfo(function(){
					appNameText.val(CA.currentAccount.AppName);
					appSkuNumber = $('#sKUNumberTooltipId').parent().find('input[type=text]');
					appSkuNumber.val(accountId);
					var ending = new RegExp(CA.currentAccount.BundleSuffix + '$');
					$('div.bundleIdentifierBox select option').each(function(){
						if(ending.test($(this).text())){
							$(this).attr('selected', true);
						}
					});
				});
			});
		}
	});
});