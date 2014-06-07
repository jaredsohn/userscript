// ==UserScript==
// @name        Plurk Productivity
// @namespace   http://kathar.in
// @description Voluntarily bans you from Plurk for a chosen period of time so you can get something done.
// @include     http://www.plurk.com/*
// @author      Katharine Berry
// ==/UserScript==

(function () {
    var win = window;
	if(typeof(unsafeWindow) != 'undefined') win = unsafeWindow;
    
    if(isBlocked())
    {
        block(true);
        return;
    }
    if(!win.$('top_bar')) win.TopBar.init();
    var bar = win.document.getElementById('icon_friends').parentNode.parentNode;
    if(!bar) return;
    var element = win.TopBar.createItem('beproductive', 'Be productive!', function() {
        var to = prompt("How many minutes would you like to be productive for?\n\nPress cancel to cancel.","10");
        if(!to) return;
        setBlock(to);
    });
    element.removeChild(element.firstChild); // Remove the image they added.
    bar.appendChild(element);
    
    function isBlocked()
    {
        var time = new Date();
        var until = blockedTo();
        if(time.getTime() > until || !until)
        {
            return false;
        }
        return true;
    }
    
    function blockedTo()
    {
        var cookies = win.document.cookie.split(';');
		for(var i = 0; i < cookies.length; ++i)
		{
			var cookie = cookies[i];
			while(cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
			if(cookie.indexOf("plurk_be_productive=") == 0) // We've got it.
			{
				var time = cookie.substring(20, cookie.length) || false;
                return time;
			}
		}
    }
    
    function setBlock(to)
    {
        to = to*1;
        if(to != to)
        {
            alert("Please enter a number.");
            return;
        }
        var date = new Date();
        to = date.getTime() + (to * 60000);
        date.setTime(to);
        win.document.cookie = 'plurk_be_productive='+to+'; expires='+date.toGMTString()+"; path=/";
        block();
    }
    
    function hidestuff()
    {
        var div = win.document.getElementById('hidden-stuff-node');
        if(!div)
        {
            var div = win.document.createElement('div');
            div.setAttribute('id','hidden-stuff-node');
            div.style.display = 'none';
            win.getBody().appendChild(div);
        }
        var node = win.getBody().firstChild;
        while(node) {
            var nextnode = node.nextSibling;
            if(node != div) div.appendChild(node);
            node = nextnode;
        }
    }
    
    function block(firstrun)
    {
        win.Users.updateTitle = function() {
            document.title = 'Be Productive - Plurk.com';
        }
        win.Users.updateTitle();
        hidestuff();
        win.Poll.showUpdates = function(G) { }; // Disable update notifications.
        if(win.fluid)
        {
            win.fluid.dockBadge = '';
            if(firstrun)
            {
                setTimeout(function() {
                    win.fluid.dockBadge = '';
                    win.Poll.showUpdates = function(G) { };
                }, 1000); // This is to protect against my notification script.
            }
        }
        var note = win.document.createElement('p');
        note.innerHTML = 'You have blocked yourself from Plurk in the name of productivity. Get some work done and come back later.';
        win.getBody().appendChild(note);
        
        // Hide the annoying arrows that won't go away.
        var link = win.document.createElement('link');
        link.setAttribute('href','data:text/css;base64,LmJyb3dzZV9idXR0b24ge3Zpc2liaWxpdHk6IGhpZGRlbiAhaW1wb3J0YW50O307');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('type','text/css');
        win.document.getElementsByTagName('head')[0].appendChild(link);
    }
})();