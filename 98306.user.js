// ==UserScript==
// @name           MySpace Messages - Bulk Remover
// @author         South Somewhere
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=7981358aef708e92eeadd4422aed9e5e&r=PG&s=64&default=identicon
// @require        http://sizzlemctwizzle.com/updater.php?id=98306&days=1&show
// @description    Automatically Empty MySpace Inbox, Trash & Junk
// @include        http://www.myspace.com/my/mail/inbox
// @include        http://www.myspace.com/my/mail/trash
// @include        http://www.myspace.com/my/mail/junk
// @version        v2.1

// ==/UserScript==

var timerVar = setInterval (function() {DoMeEverySecond (); }, 5000);

function DoMeEverySecond ()

{ 

      window.location.reload(false)

	var message = document.getElementById("checkAll");
	if(message) message.click();

	var message = document.getElementById("deleteSelected");
	if(message) message.click();

}