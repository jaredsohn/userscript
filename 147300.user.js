// ==UserScript==
// @name        Moderator Plugin 
// @namespace   modplugin
// @description Infernoshoutbox plugin for moderators.
// @include     *rune-server.org*
// @version     1
// @grant		none
// ==/UserScript==

var $ = unsafeWindow.jQuery;

function main() {
    
    var elements = document.getElementsByTagName("span");
    for(var i = 0; i < elements.length; i++)
	{
        elements[i].style.removeProperty("text-shadow");
	}
    
    InfernoShoutbox.showModOptions = false;
    
    InfernoShoutbox.idlecheck = function() { /* Idle timeout removed */ }
        
    InfernoShoutbox.append_tab('<a href="?" onclick="return InfernoShoutbox.switch_options();"><b><font color="#F41B43">Rune-Server Moderator Plugin</color></b></a>');
	
	InfernoShoutbox.append_tab('<a href="?" onclick="return InfernoShoutbox.search_user();"><font color="#FFFFFF">Search User</color></a>');
	
	InfernoShoutbox.search_user = function()
	{
		var message = InfernoShoutbox.editor.value;
		window.open('http://www.rune-server.org/members/' + encodeURIComponent(message) + '/');
		message = "";
	}
    
    InfernoShoutbox.switch_options = function()
	{
	if(InfernoShoutbox.showModOptions)
		InfernoShoutbox.showModOptions = false;
	else
		InfernoShoutbox.showModOptions = true;
		InfernoShoutbox.update_shouts(InfernoShoutbox.shoutframe.innerHTML);
        return false;
	}

	InfernoShoutbox.update_shouts = function(shouts) {
		InfernoShoutbox.shoutframe.innerHTML = shouts;
		if (InfernoShoutbox.newestbottom && InfernoShoutbox.shoutframe.scrollTop < InfernoShoutbox.shoutframe.scrollHeight) {
			InfernoShoutbox.shoutframe.scrollTop = InfernoShoutbox.shoutframe.scrollHeight;
		}
		var elements = InfernoShoutbox.shoutframe.getElementsByTagName('a');
		var buttons = new Array();
		var userIds = new Array();
		var i = 0;
		for (var k = 0; k < elements.length; k++) {
			var element = elements[k];
			var onclick = new String(element.onclick);
			var banIndex = onclick.indexOf('/ban');
			if (banIndex != -1) {
				buttons[i] = element;
				userIds[i] = onclick.substring(banIndex + 5, onclick.indexOf(';', banIndex) - 1);
				i++;
			}
		}
		i--;
        if(!InfernoShoutbox.showModOptions)
        {
		for (; i >= 0; i--) {
			$(buttons[i]).before('<a href="http://www.rune-server.org/infraction.php?do=report&u=' + userIds[i] + '" target="blank"><img src="http://www.quarterx.org/scripts/img/infract.png" /></a> ');
            $(buttons[i]).before('<a href="http://www.rune-server.org/member.php?u=' + userIds[i] + '" target="blank"><img src="http://www.quarterx.org/scripts/img/user.png" /></a> ');
		}
        }
		else
		{
			InfernoShoutbox.shoutframe.innerHTML = "Options";
		}
        var elements = document.getElementsByTagName("span");
		for(var i = 0; i < elements.length; i++)
		{
			elements[i].style.removeProperty("text-shadow");
		}
    }
        InfernoShoutbox.update_shouts($('#shoutbox_frame').html());
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);