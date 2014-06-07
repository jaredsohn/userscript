// ==UserScript==
// @name          Kongregate superior friends
// @description   Displays your friends above the moderators and staff in the Kongregate chat user list.
// @include       http://www.kongregate.com/games/*/*
// @exclude       http://www.kongregate.com/games/*/*/*
// ==/UserScript==

unsafeWindow.ChatRoom.prototype.a7fd8f90 = unsafeWindow.ChatRoom.prototype.userSorter;
unsafeWindow.ChatRoom.prototype.userSorter = function() {
	var prevSorter = this.a7fd8f90();
	var cw = this._chat_window;
	var self = cw.username();
	return function(u1, u2) {
		var u1s = u1.username == self;
		var u2s = u2.username == self;
		return ((u1s == u2s)?((cw.isFriend(u1)==cw.isFriend(u2))?prevSorter(u1,u2):(cw.isFriend(u1)?-1:1)):u1s?-1:1);
	}
}