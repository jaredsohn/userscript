// ==UserScript==
// @name           InviteBlackList
// @namespace      fnx
// @include        http://klavogonki.ru*
// @author         Fenex
// @version        1.1
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
var script_str = 'showInvite = function(){if(closed_invites.indexOf(invite.timestamp)!=-1){return;}if(invite.gamestatus=="racing"){return;}if(localStorage["AntiInvite"]){var a = localStorage["AntiInvite"].split(";");for(i=0;i<a.length;i++){if(parseInt(a[i])==invite.invited_by.id){new Ajax.Request("/play/"+invite.game_id+".inviteReceive");return;}}}var d="";if(invite.invited_by.avatar){d="style=\'padding-left: 20px; background: transparent url("+invite.invited_by.avatar+") no-repeat 0% 0%;\'";}var f="";if(invite.type=="normal"){f="открытой игре";}if(invite.type=="private"){f="игре с друзьями";}var g="<span style=\'font-size: 13px;\'>Пользователь <a href=\'/profile/" + invite.invited_by.id + "/\' " + d + ">" + invite.invited_by.login + "</a> приглашает вас присоединиться к " + f + " " + invite.gametype_html + "." + "</span><input type=\'button\' value=\'В игнор\' style=\'margin: -6px;height: 26px;float:right;\' onclick=\'addAntiInvite("+invite.invited_by.id+")\' />";var b="Присоединиться";var a=function(){new Ajax.Request("/play/"+invite.game_id+".inviteReceive");window.location="/play/?gmid="+invite.game_id;};var e=function(){closed_invites.push(invite.timestamp);new Ajax.Request("/play/"+invite.game_id+".inviteReceive");};top_popup(g,b,a,e);};';

function addAntiInvite(id) {
	if(confirm('Are you sure?')){localStorage['AntiInvite']+=id+';'}
}

var s = document.createElement('script');
s.innerHTML = addAntiInvite+script_str+"\nif(!localStorage['AntiInvite']){localStorage['AntiInvite'] = '';}";
document.body.appendChild(s);