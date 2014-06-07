// ==UserScript==
// @name           CSM Admin - Predefined admin notes
// @namespace      None
// @description    None
// @include        http://www*.cs-manager.com/csm/other/?p=other_admin_notes&u=*
// ==/UserScript==

var generalName = ["Brothers", "Brothers with same computer", "Sharing the same IP during..."];
var generalContent = [" () and  () seem to be brothers.",
" () and  () seem to be brothers and will also share the same computer.",
" () and  () will share the same IP from [b][/b] to [b][/b].\n\n[b]Reason:[/b] "];

var punishName = ["Transfer cheat (one transfer)", "Transfer cheat (2 or more)", "Multi / Account sitting"];
var punishContent = ["Same IP / CID \n\n/admin/\n\n[b]Lookup[/b]\n\n\n\n[b]Other[/b]\n\n\n\n[b]Transfer[/b]",
"Same IP / CID \n\n/admin/\n\n[b]Lookup[/b]\n\n\n\n[b]Other[/b]\n\n\n\n[b]Transfer #1[/b]\n\n\n\n[b]Transfer #2[/b]\n\n\n\n[b]Seller / Bidder[/b]",
"Same IP / CID \n\n/admin/\n\n[b]Users involved[/b]\n\n\n\n[b]Lookup[/b]"];

var transferName = ["Newbie rollback"];
var transferContent = ["[b]Rolledback due to newbie[/b]\n\n[b]Relation:[/b]\n\n/admin/\n\n[b]Lookup[/b]\n\n\n\n[b]Transfer[/b]"];

var forumName = ["Headline violation", "Offensive language", "Spam"];
var forumContent = ["[b]Headline violation[/b]\n\nTopic title:\n\nRule:\n\nAdmin action:\n\nNext time:\n\n", "[b]Offensive language[/b]\n\nForum topic: /forum/\n\nAdmin action:", "[b]Spamming[/b]\n\nTopic: /forum/\n\nAdmin action:\n\nNext time:"];

var select, newEl, cnt;
select = document.getElementById('text');
newEl = document.createElement('div');
cnt = "<table id=\"popup_link_same\"><tr><td style=\"border:none;\">Choose your reason:</td><td style=\"border: none;width: 445px;\"><select onChange=\"document.getElementById('text').value = this.options[this.selectedIndex].value.replace('[nl]', '\\n');\" style=\"width: 100%;\">";
cnt+= '<option value="">Custom</option><optgroup label="General">';
for (var i = 0; i < generalName.length; i++) {
	cnt+='<option value="' + generalContent[i] + '">' + generalName[i] + '</option>';
}
cnt+='</optgroup>';
cnt+= '<optgroup label="Punishment">';
for (var i = 0; i < punishName.length; i++) {
	cnt+='<option value="' + punishContent[i] + '">' + punishName[i] + '</option>';
}
cnt+='</optgroup>';
cnt+= '<optgroup label="Transfers">';
for (var i = 0; i < transferName.length; i++) {
	cnt+='<option value="' + transferContent[i] + '">' + transferName[i] + '</option>';
}
cnt+='</optgroup>';
cnt+= '<optgroup label="Forum">';
for (var i = 0; i < forumName.length; i++) {
	cnt+='<option value="' + forumContent[i] + '">' + forumName[i] + '</option>';
}
cnt+='</optgroup>';
cnt+='</select></td></tr></table><hr />';
newEl.innerHTML = cnt;
select.parentNode.insertBefore(newEl, select);

/* NEXT GEN


var body, popup;
body = document.getElementsByTagName('body')[0];
if (body) {
    popup = document.createElement('div');
	popup.innerHTML = '<div class="show" style="position: absolute; width: 500px; display: none;" id="popup_same"><table class="popup" cellpadding="0" cellspacing="0"><tr><td class="head"><a href=\"javascript: closeShowedPopup(\'same\')" style="float: right;"><img src="/images/popup_close.png" width="14" height="14" border="0" /></a> Same:</td></tr><tr><td class="data"><table class="inline" cellpadding="0" cellspacing="0"><tr><td><input type="checkbox" value="IP" /></td><td>IP</td></tr><tr><td><input type="checkbox" value="IP" /></td><td>IP</td></tr><tr><td><input type="checkbox" value="IP" /></td><td>IP</td></tr><tr><td><input type="checkbox" value="IP" /></td><td>IP</td></tr><tr><td><input type="checkbox" value="IP" /></td><td>IP</td></tr><tr><td><input type="checkbox" value="IP" /></td><td>IP</td></tr><tr><td><input type="checkbox" value="IP" /></td><td>IP</td></tr><tr><td><input type="checkbox" value="IP" /></td><td>IP</td></tr><tr><td><input type="checkbox" value="IP" /></td><td>IP</td></tr></table></td></tr></table></div>';
    body.parentNode.insertBefore(popup, body.nextSibling);
}




var select, newEl, cnt;
select = document.getElementById('text');
newEl = document.createElement('div');
cnt = "<table id=\"popup_link_same\"><tr><td style=\"border:none;\">Choose your reason:</td><td style=\"border: none;width: 445px;\"><select onChange=\"showPopupPosition('same', 0, 0);document.getElementById('text').value = this.options[this.selectedIndex].value.replace('[nl]', '\\n');\" style=\"width: 100%;\">";
for (var i = 0; i < fbanName.length; i++) {
	cnt+='<option value="' + fbanContent[i] + '">' + fbanName[i] + '</option>';
}
cnt+="</select></td></tr></table><hr />";
newEl.innerHTML = cnt;
select.parentNode.insertBefore(newEl, select);

NEXT GEN */