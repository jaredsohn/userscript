// ==UserScript==
// @name           HatenaBookmarkNgHelper
// @namespace      http://www.madin.jp/
// @include        http://b.hatena.ne.jp/*
// @author	   Maripo GODA (HatenaID: avena) <madin@madin.jp>
// ==/UserScript==


HatebuNgHelper = {
	myId : null,
	targetId : null,
	addNgButton : function () {
		try {
			var tmpList = getElementsByClassName (document, 'bookmarkinfo');
			if (tmpList.length == 0) return;
			infoUl = tmpList[0];
			infoUl.appendChild (HatebuNgHelper.getNgButton());
			
		} catch (ex) {alert(ex);
		}
	},
	getUserName : function () {
		
	},
	getNgButton : function () {
		var ngButton = document.createElement('LI');
		with (ngButton.style) {
			fontSize='70%';
			color='red';
			backgroundColor='white';
			border='solid 1px red';
		}
		var ngLink = document.createElement ('A');
		with (ngLink) {
			innerHTML = 'NG';
			href = '#';
			title = '非表示ユーザに追加';
			with (style) {
				color='red';
				textDecoration='none';
			}
		}
		ngLink.addEventListener ('click', function () {
			try {
				var configWindow = window.open ('http://b.hatena.ne.jp/'+HatebuNgHelper.myId+'/config');
				configWindow.addEventListener ('load', function (){
					var ignoreUserField = configWindow.document.getElementsByName('ignore_users')[0];
					var ngUsers = (ignoreUserField.value.length>0)?ignoreUserField.value.split('|'):new Array();
					var targetUserIdFound = false;
					for (var index in ngUsers) {
						if (ngUsers[index] == HatebuNgHelper.targetId) targetUserIdFound = true;
					}
					if (targetUserIdFound) {
						window.alert("id:" + HatebuNgHelper.targetId + " は、すでに NG リストに入っています。");
						configWindow.close();
					}
					else {
						var confirmAnswer = confirm("id:" + HatebuNgHelper.targetId + " を本当に NG リストに加えますか?");
						if (confirmAnswer) {
							ngUsers.push(HatebuNgHelper.targetId);
							ignoreUserField.value = ngUsers.join('|');
							var form = configWindow.document.getElementsByTagName('FORM')[1].submit();
							configWindow.close();
							window.alert("id:" + HatebuNgHelper.targetId + " を NG リストに追加しました。\n"
								+ "現在 NG リストには" + ngUsers.length + "人入っています。"
							);
							
						}
						else {
							configWindow.close();
						}
					}
				},false);
			} catch (ex) {alert(ex);}
		},
		true);
		
		ngButton.appendChild (ngLink);
		return ngButton;
	},
	checkUserPage : function () {
		if (getElementsByClassName (document, 'addtofavor').length == 0) return false;
		try {
			HatebuNgHelper.myId = getElementsByClassName(document, 'username')[0].innerHTML;

		} 
		catch (ex){
			return false;
		}
		try {
			HatebuNgHelper.targetId = document.getElementsByName('name')[0].value;
		}
		catch (ex) {
			return false;
		}
		HatebuNgHelper.configFrame = document.createElement('IFRAME');
		with (HatebuNgHelper.configFrame.style) {
			width = '1px';
			height = '1px';
		}
		document.body.appendChild(HatebuNgHelper.configFrame);
		return true;
	}
};
function getElementsByClassName (element, className) {
	var elements = element.getElementsByTagName('*');
	var foundElements = new Array();
	for (var index in elements) {
		if (className == elements[index].className) foundElements.push(elements[index]);
	}
	return foundElements;
}
if (HatebuNgHelper.checkUserPage())
	HatebuNgHelper.addNgButton();