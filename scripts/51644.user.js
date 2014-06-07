// ==UserScript==
// @name           CSM Admin - Reasons adder
// @namespace      None
// @description    None
// @include        http://www*.cs-manager.com/csm/other/?p=other_info&s=admin&u=*
// ==/UserScript==

// AUTO ADD MY SIGN ? 1 = YES; 0 = NO;
var autoAddMySign = 1;
// CHANGE YOUR SIGN HERE
var sign = "depmod // French Game Admin";
var emptyMessage = " \n\n" + sign;

// CONTENT OF DISCIPLINE MESSAGES
var discName = ["Custom", "Transfer cheat", "Account sitting", "Multi with two accounts", "Default message", "Remove warning message"];
var discContent = [emptyMessage,
"Hello,\n\nYou have been punished, because we have found you to be breaking the rules of the game, which you agreed to when you registered.\n\nThe rule in question is:\n4.2. You are not allowed to deliberately transfer money from one clan to another. This may be by trading a player at a higher value or trading many players with lower values.\n\nYou received punishment points and a 10 000 csm fine. Please note that if you continue to break the rules and receive more punishment points, then your account may be disabled.\n\nInvolved users:\n* \n* \n\nSupsicious transfer:\n* <<>>\n\nRegards,\n" + sign,
"Hello,\n\nYou have been punished, because we have found you to be breaking the rules of the game, which you agreed to when you registered.\n\nThe rule in question is:\n2.5. You are not allowed to log into another persons account.\n\nYou received punishment points[ and a 5 000 csm fine]. Please note that if you continue to break the rules and receive more punishment points, then your account may be disabled.\n\nInvolved users:\n* \n* \n\nRegards,\n" + sign,
"Hello,\n\nYou have been punished, because we have found you to be breaking the rules of the game, which you agreed to when you registered.\n\nThe rule in question is:\n2.4. You are not allowed to have more than one account at any time.\n\nYou received punishment points[ and a 5 000 csm fine]. Please note that if you continue to break the rules and receive more punishment points, then your account may be disabled.\n\nInvolved users:\n* \n* \n\nRegards,\n" + sign,
"Hello,\n\nYou have been punished because we have found you to be breaking the rules of the game, which you agreed to when you registered.\n\nThe rule in question is:\n(rule)\n\n[ fine, if any]your account has received punishment points. Please note that if you continue to break the rules and receive more punishment points, then your account may be disabled.\n\nRegards,\n" + sign,
"Hello,\n\nYour account warning has been converted into the new punishment system, therefore your account has received punishment points.\n\nThe rule broken was:\n(rule)\n\nIf you break the rules again, you will receive more punishment points and your account may be disabled.\n\nRegards,\n" + sign];

// CONTENT OF FBAN MESSAGES
var fbanName = ["Custom", "Offensive language", "FBan reason #1", "FBan reason #2"];
var fbanContent = [emptyMessage,
"Offensive language.\nIf you break the rules again, then your account will be disabled.\n\n" + sign,
"Reason #1\n\n" + sign,
"Reason #2\n\n" + sign];

// CONTENT OF CP BAN
var cpbanName = ["Custom", "CP BAN reason #1"];
var cpbanContent = [emptyMessage,
"Reason #1\n\n" + sign];

// CONTENT OF MESSAGING
var mailbanName = ["Custom", "MESSAGING BAN reason #1"];
var mailbanContent = [emptyMessage,
"Reason #1\n\n" + sign];

// CONTENT OF BAN MESSAGES
var banName = ["Custom", "Multi + Transfer Cheating", "Multi (no transfer cheat)", "Wrong nationality", "Ban reason #1"];
var banContent = [emptyMessage,
"Hello\n\nYou account has been disabled, because we have found you to be breaking the rules of the game, which you agreed to when you registered.\n\nThe rules in question are:\n&sect;2 One clan per person and &sect;4 Do not cheat on the transfer market.\n\nIt is our belief that the following accounts are being owned or taken care off by the same person:\n\n* <<User name - Clan name - User ID>>\n\nWe noticed the following bid between the above accounts:\n* <<CLAN placed bid on: PLAYER | From: CLAN (User id: USER ID) | Bid: BID SIZE csm>>\n\nYou should be aware that you can appeal to this ban. Please do not appeal unless you are innocent in the charges.\n\nOn behalf of the CSM-Admins,\n" + sign,
"Hello\n\nYour account has been disabled, because we have found you to be playing with more than one clan. According to &sect;2 of the rules (One clan per person), which you agreed to when you registered, this is illegal.\n\nInvolved accounts:\n* <<User name - Clan name - User ID>>\n\nYou should be aware that you can appeal to this ban. Please do not appeal unless you are innocent in the charges.\n\nOn behalf of the CSM-Admins,\n" + sign,
"Hello\n\nYour account has been disabled, because we have found you to be breaking the rules which you agreed to when you registered, this is illegal.\n\nYou violate the following rules:\n2.a: When signing up fill in correct information about yourself. Wrong info will be a liability for you if you are punished for breaking another rule.\n\n2.b: Chose the right nationality when you signup. If we find out you are in fact playing from another country than what you signed up as, we may disable your account.\nUser:\n* ()\n\nYou should be aware that you can appeal to this ban. Please do not appeal unless you are innocent in the charges.\n\nOn behalf of the CSM-Admins,\n" + sign,
"Reason #1\n\n" + sign];

// ---------------------------------------------- DONT EDIT AFTER THIS LINE OR SOME CHILDRENS ARE GONNA DIE!!! ---------------------------------------------- //
// CHECK IF THE USER ALREADY HAVE A WARN / FBAN / BAN
var body = document.getElementsByTagName('body')[0].innerHTML, warned, fbanned, banned;
var regexFBan = 'remove forum ban';
var regexCPBan = 'remove clan presentation ban';
var regexMailBan = 'remove messaging ban';
var regexBan = 'remove account ban';
if(body.match(regexFBan)) {
	var fbanned = 1;
}
if(body.match(regexCPBan)) {
	var cpbanned = 1;
}
if(body.match(regexMailBan)) {
	var mailbanned = 1;
}
if(body.match(regexBan)) {
	var banned = 1;
}
			
			
// ADD SOME STYLE TO THE PAGE
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var j = 0;

// DISCIPLINE REASONS
var select, newEl, cnt;
select = document.getElementsByName('message')[j];
newEl = document.createElement('div');
newEl.id = 'modif';
cnt = "<select name=\"message\" onChange=\"document.discipline.discipline_msg.value = this.options[this.selectedIndex].value.replace('[nl]', '\\n');\" style=\"width: 305px;\">";
for (var i = 0; i < discName.length; i++) {
	cnt+='<option value="' + discContent[i] + '">' + discName[i] + '</option>';
}
cnt+="</select>";
newEl.innerHTML = cnt;
select.parentNode.replaceChild(newEl, select);
j+=1;

if (fbanned != 1) {
	// FBAN REASONS
	var select, newEl, cnt;
	select = document.getElementsByName('message')[j];
	newEl = document.createElement('div');
	newEl.id = 'modif';
	cnt = "<select name=\"message\" onChange=\"document.getElementById('msg_forum').value = this.options[this.selectedIndex].value.replace('[nl]', '\\n');\" style=\"width: 305px;\">";
	for (var i = 0; i < fbanName.length; i++) {
		cnt+='<option value="' + fbanContent[i] + '">' + fbanName[i] + '</option>';
	}
	cnt+="</select>";
	newEl.innerHTML = cnt;
	select.parentNode.replaceChild(newEl, select);
	j+=1;
}

if (cpbanned != 1) {
	// CP BAN REASONS
	var select, newEl, cnt;
	select = document.getElementsByName('message')[j];
	newEl = document.createElement('div');
	newEl.id = 'modif';
	cnt = "<select name=\"message\" onChange=\"document.getElementById('msg_clan_presentation').value = this.options[this.selectedIndex].value.replace('[nl]', '\\n');\" style=\"width: 305px;\">";
	for (var i = 0; i < cpbanName.length; i++) {
		cnt+='<option value="' + cpbanContent[i] + '">' + cpbanName[i] + '</option>';
	}
	cnt+="</select>";
	newEl.innerHTML = cnt;
	select.parentNode.replaceChild(newEl, select);
	j+=1;
}

if (mailbanned != 1) {
	// MESSAGING BAN REASONS
	var select, newEl, cnt;
	select = document.getElementsByName('message')[j];
	newEl = document.createElement('div');
	newEl.id = 'modif';
	cnt = "<select name=\"message\" onChange=\"document.getElementById('msg_messaging').value = this.options[this.selectedIndex].value.replace('[nl]', '\\n');\" style=\"width: 305px;\">";
	for (var i = 0; i < mailbanName.length; i++) {
		cnt+='<option value="' + mailbanContent[i] + '">' + mailbanName[i] + '</option>';
	}
	cnt+="</select>";
	newEl.innerHTML = cnt;
	select.parentNode.replaceChild(newEl, select);
	j+=1;
}

if (banned != 1) {
	// BAN REASONS
	var select, newEl, cnt;
	select = document.getElementsByName('message')[j];
	newEl = document.createElement('div');
	newEl.id = 'modif';
	cnt = "<select name=\"message\" onChange=\"document.disable_account.msg.value = this.options[this.selectedIndex].value.replace('[nl]', '\\n');\" style=\"width: 305px;\">";
	for (var i = 0; i < banName.length; i++) {
		cnt+='<option value="' + banContent[i] + '">' + banName[i] + '</option>';
	}
	cnt+="</select>";
	newEl.innerHTML = cnt;
	select.parentNode.replaceChild(newEl, select);
	j+=1;
}

// STYLE FOR THE VIRTUAL DIV
addGlobalStyle('#modif { display:inline; }');

// AUTO ADD MY SIGN
if (autoAddMySign == 1) {
	var textarea;

	textarea = document.getElementById('discipline_msg');
	textarea.innerHTML = emptyMessage;
	
	if (fbanned != 1) {
		textarea = document.getElementById('msg_forum');
		textarea.innerHTML = emptyMessage;
	}
	if (cpbanned != 1) {
		textarea = document.getElementById('msg_clan_presentation');
		textarea.innerHTML = emptyMessage;
	}
	if (mailbanned != 1) {
		textarea = document.getElementById('msg_messaging');
		textarea.innerHTML = emptyMessage;
	}
	if (banned != 1) {
		textarea = document.getElementById('msg_disable_account');
		textarea.innerHTML = emptyMessage;
	}
}