// ==UserScript==
// @name           SSW Reply To All
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Puts a Reply To All link on smails with multiple recipients
// @include        http://www.secretsocietywars.com/index.php?p=forums&a=show_pm*
// @include        http://www.secretsocietywars.com/index.php?p=forums&a=pm_editor*
// ==/UserScript==

if(document.location.href.indexOf('a=show_pm') > -1) {
	add_reply_link();
} else if(document.location.href.indexOf('a=pm_editor')) {
	add_recipient_list();
}

function add_reply_link() {
	var reply_link;
	var reply_to_all_link;
	
	if(document.evaluate('//text()[contains(., "This message was sent to:")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
		reply_link = document.evaluate('//a[contains(@href, "&reply=")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		reply_to_all_link = document.createElement('a');
		reply_to_all_link.className = "pm_link";
		reply_to_all_link.href = reply_link.href;
		reply_to_all_link.innerHTML = "Reply To All";
		reply_to_all_link.addEventListener('click', reply_to_all, false);
		reply_link.parentNode.insertBefore(reply_to_all_link, reply_link);
		reply_link.parentNode.insertBefore(document.createTextNode(" | "), reply_link);
	}
}

function reply_to_all() {
	var recipient_list;
	var reply_id;
	var message_body;
	var re;

	if(re = /reply=(\d+)/.exec(this.href)) {
		reply_id = parseInt(re[1]);
	}
	if(message_body = document.evaluate('//text()[contains(., "This message was sent to:")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
		if(re = /This message was sent to:\s*((?:\w+(?:, )?)*)/.exec(message_body.data)) {
			recipient_list = build_recipient_list(re[1]);
			GM_setValue('id', reply_id);
			GM_setValue('recipients', recipient_list.join(', '));
		}
	}
}

function add_recipient_list() {
	var send_to;
	var recipients = GM_getValue('recipients', '');
	var stored_reply_id = GM_getValue('id', -1);
	var this_reply_id;
	var re;
	
	if(re = /reply=(\d+)/.exec(document.location.href)) {
		this_reply_id = parseInt(re[1]);
	}

	send_to = document.getElementsByName('send_to');
	if((this_reply_id == stored_reply_id) && recipients.length) {
		send_to[0].value += ", " + recipients;
	}
}

function build_recipient_list(str) {
	var list = str.split(', ');
	var username = String.toLowerCase(get_username());
	
	for(var i = 0; i < list.length; i++) {
		if(String.toLowerCase(list[i]) == username) {
			list.splice(i, 1);
		}
	}
	return list;
}

function get_username() {
	var pattrname = document.evaluate('//td[@class="pattrName"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var username;

	if(pattrname) {
		var re;

		if(re = /<b[^>]*>([^<]+)/.exec(pattrname.innerHTML)) {
			username = re[1];
		}
	}
	return username;
}
