// ==UserScript==
// @name           FB Test User Tool
// @namespace      http://www.bzc.co.jp/greasemonkey/facebook
// @include        https://developers.facebook.com/apps/*
// @author        Tsugami Masaaki (http://www.bzc.co.jp)
// @version       0.3.1
// ==/UserScript==

var fbtuc_debug = false;
(function(){
//	window.setTimeout(function(){
	window.addEventListener('load', function () {
		if(fbtuc_debug) console.log('main start');
		var dashboardTitle = document.evaluate('//div[contains(concat(" ",normalize-space(@class)," "), " dashboardTitle ")]',document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
		if(! dashboardTitle.snapshotLength){
			if(fbtuc_debug) console.log('dashboardTitle not exist');
		}else{
			if(fbtuc_debug) console.log('dashboardTitle exists');
			var appIdDiv = document.evaluate('//div[@id="developerAppDashboardContainer"]/div[2]/table/tbody/tr/td[2]/table/tbody/tr/td/div[2]',document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			var appId = "";
			var appSecret = "";
			var childs;
			if(! appIdDiv.snapshotLength){
				console.log('no appIdDiv');
			}else{
				childs = appIdDiv.snapshotItem(0).childNodes;
				appId = childs[0].textContent;
			}
			var appSecretDiv = document.evaluate('//*[@id="application_secret"]',document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
			if(! appSecretDiv.snapshotLength){
				console.log('no appSecretDiv');
			}else{
				childs = appSecretDiv.snapshotItem(0).childNodes;
				appSecret = childs[0].textContent;
			}
			console.log(appId + " " + appSecret);
			var newURL = 'https://graph.facebook.com/oauth/access_token?client_id='+appId+'&client_secret='+appSecret+'&grant_type=client_credentials';
			
			var nextUrl = 'https://graph.facebook.com/'+appId+'/accounts/test-users?method=post&access_token=';
			var nextUrl2 = 'https://graph.facebook.com/'+appId+'/accounts/test-users?method=get&access_token=';
			
			//追加するHTMLを定義
			var appendHtml = '<a id="test_user_button" class="uiButton" onClick="GetRequest(\''+newURL+'\',\''+appId+'\',\''+nextUrl+'\');" role="button"><span class="uiButtonText">Generate a Test User</span></a>';
			var appendHtml2 = '<a id="test_user_list_button" class="uiButton" onClick="GetRequest(\''+newURL+'\',\''+appId+'\',\''+nextUrl2+'\');" role="button"><span class="uiButtonText">List Test Users</span></a>';
			var selectElem       = document.createElement('div');
			selectElem.innerHTML = appendHtml;
			var selectElem2      = document.createElement('div');
			selectElem2.innerHTML = appendHtml2;
			selectElem           = selectElem.firstChild;
			selectElem2         = selectElem2.firstChild;
		  
			var buttonExist = document.evaluate('//*[@id="edit_button"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			var btnElem = buttonExist.snapshotItem(0);
			btnElem.parentNode.insertBefore(selectElem, btnElem);
			btnElem.parentNode.insertBefore(selectElem2, btnElem);
		}
	},false);
//	}, 500 );
})();

/*
unsafeWindow.GetRequest = function (url, appId){
	if(fbtuc_debug) console.log(url);
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(facebook_script_request) {
			if (facebook_script_request.readyState != 4) return;
			if (facebook_script_request.status != 200) return;
			if(fbtuc_debug) console.log('response ok');
			if(fbtuc_debug) console.log('a:'+facebook_script_request.responseText);
			//eval(facebook_script_request.responseText);
			//https://graph.facebook.com/'+appId+'/accounts/test-users?method=post&access_token='+access_token
		}
	});
}
*/
unsafeWindow.GetRequest = function (url, appId,nextUrl_){
		var xmlhttp = false;
		var adress = url;
		// IE
		if(typeof ActiveXObject != "undefined"){
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				xmlhttp = false;
			}
		}
		// others
		if(!xmlhttp && typeof XMLHttpRequest != "undefined") {
			xmlhttp = new XMLHttpRequest();
		}
		xmlhttp.open('GET', adress, true);
		xmlhttp.onreadystatechange = function() {
			// Normal Response
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				//alert(xmlhttp.responseText);
				var access_token_response = xmlhttp.responseText;
				//console.log('http success ' + access_token_response);
				access_token = access_token_response.replace(/access_token\=/,"");
				//console.log('access_token '+access_token);
				//var url_next = nextUrl;
				//console.log(url_next);
				window.location.href = nextUrl_ + access_token;
			}
		};
		xmlhttp.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded");
		xmlhttp.send("");
}
