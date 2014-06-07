// ==UserScript==
// @name 1j
// @author Outku
// @description
// @create
// @lastmodified
// @namespace http://userscripts.org/users/Rabbit
// @updateURL
// @version
// @include
// ==/UserScript==
	var messages = {
		"extName":{"message": "Ly: \u77ed\u94fe\u63a5","description": "extension name"},
		"extDescription":{"message": "\u70b9\u51fb\u56fe\u6807\u540e\u81ea\u52a8\u7f29\u77ed\u5f53\u524d\u9875\u9762\u94fe\u63a5\uff0c\u5e76\u590d\u5236\u5230\u526a\u8d34\u677f\uff1b\u8fd8\u53ef\u4ee5\u53f3\u952e\u70b9\u51fb\u9875\u9762\u4e2d\u4efb\u4f55\u94fe\u63a5\u8fdb\u884c\u7f29\u77ed","description": "extension description"},
		"extDefaultTitle":{"message": "\u77ed\u94fe\u63a5","description": "default title of the browser action"},
		"bitlyDomain":{"message": "bit.ly","description": "domain name of bit.ly"},
		"about": {"message": "\u5173\u4e8e","description": "about link in the footer"},
		"help": {"message": "\u5e2e\u52a9","description": "help link in the footer"},
		"titleShortLink":{"message": "\u77ed\u94fe\u63a5","description": "title for Short Link section"},
		"titleHistory":{"message": "\u5386\u53f2","description": "title for History section"},
		"buttonShorten":{"message": "\u7f29\u77ed","description": "text for Shorten button"},
		"textCurrentTab": {"message": "\u5f53\u524d\u9875\u9762","description": "text: current tab"},
		"textCopyPrompt": {"message": "\u6309 Ctrl (Cmd) + C \u590d\u5236","description": "text: Copied to clipboard"},
		"titleEnterLink": {"message": "\u8bf7\u8f93\u5165\u7f51\u5740","description": "title for link input"},
		"buttonClearHistory": {"message": "\u6e05\u7a7a\u5386\u53f2","description": "click to remove all history"},
		"buttonMore": {"message": "\u66f4\u591a","description": "click to show all history"},
		"shortening": {"message": "\u7f29\u77ed\u4e2d...","description": ""},
		"ErrorSomethingWrong": {"message":"\u5bf9\u4e0d\u8d77\uff0c\u7a0b\u5e8f\u5f02\u5e38.", "description": "error mssage: Sorry, something went wrong."},
		"ErrorInvalidLink": {"message": "\u5f53\u524d\u7f51\u5740\u65e0\u6548","description": "error message: Invalid link"},
		"ErrorServiceNA": {"message": "\u5bf9\u4e0d\u8d77\uff0c\u670d\u52a1\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u91cd\u8bd5","description": "error message: Oops, service not available. Please try it again."},
		"ErrorInvalidLink2" :{"message": "\u8bf7\u8f93\u5165\u4e00\u4e2a\u6709\u6548\u7f51\u5740","description": "error message for manual input: Please enter a valid link"}
	};
	var i18n = {
		getMessage: function(str) {if ( str in messages ) {return messages[str].message;}return '';}
	};
