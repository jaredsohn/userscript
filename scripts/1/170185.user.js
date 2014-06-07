// ==UserScript==
// @name        KBL Event Manager
// @namespace   KBLEM
// @include     http://www.kongregate.com/games/NivalPublishing/kings-bounty-legions*
// @include     http://fb.playkb.com/*
// @version     1.7.0
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

var DEBUG = false;

function VisitEvent(ID)
{
    try
    {
        var XHR = new XMLHttpRequest();
        XHR.open('GET', GM_getValue('GameURL', null) + "&kv_eventkey=" + ID, true);
        XHR.send(null);
		MarkAsVisited("VisitedEvents", ID);
    } catch (ex) { if (DEBUG) alert("VisitEvent: " + ex); }

}

function MarkAsVisited(ListName, ID)
{
	var L = GM_getValue(ListName, "");
	L += "," + ID;
	GM_setValue(ListName, L);	
}

function ListContains(ListName, ID)
{
	var L = GM_getValue(ListName, "");
	return L != "" && 0 <= L.indexOf(ID);
}

function ChatProcessor()
{
    try
    {
        var LinksSnapshot = document.evaluate("//div[@id='chat_rooms_container']//span[contains(@class,'message')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < LinksSnapshot.snapshotLength; i++)
        {
            var LinkNode = LinksSnapshot.snapshotItem(i);
            var Match = LinkNode.innerHTML.match(/kv_eventkey=([0-9a-f]{24})/);
            if (Match)
            {
				var ID = Match[1];
				if (ListContains("MyEvents", ID))
				{
					LinkNode.innerHTML = "my event";
				}
				else if (ListContains("VisitedEvents", ID))
				{
					LinkNode.innerHTML = "already visited";
				}
				else
				{
					VisitEvent(ID);
					LinkNode.innerHTML = "visited";
				}
                LinkNode.style.color = "#999";
                return;
            }
        }
    } catch (ex) { if (DEBUG) alert("ChatProcessor: " + ex); }
}

// My events

function GetUserEvents(UserName, N)
{
    try
    {
        var IDs = [];
        try
        {
            var XHR = new XMLHttpRequest();
            XHR.open('GET', "http://www.kongregate.com/accounts/" + UserName + "/more_feed_items?num=" + N, false);
            XHR.send(null);
            if (XHR.readyState == 4)
            {
                var Matches = XHR.responseText.match(/kv_eventkey=[0-9a-f]{24}/g);
                if (Matches)
                {
                    for (var i = 0; i < Matches.length; i++)
                    {
                        var ID = Matches[i].substr(12);
                        if (IDs.indexOf(ID) < 0)
                            IDs.push(ID);
                    }
                }
            }
        }
        catch (e) {}
        return IDs;
    } catch (ex) { if (DEBUG) alert("GetUserEvents: " + ex); }
}

function PostMyEvent(ID)
{
    try
    {
        var LinksSnapshot = document.evaluate("//div[@id='chat_rooms_container']//textarea", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        if (LinksSnapshot.snapshotLength == 1)
        {
            var Textarea = LinksSnapshot.snapshotItem(0);
            Textarea.value = "http://www.kongregate.com/games/NivalPublishing/kings-bounty-legions?kv_eventkey=" + ID;
			var Event;
			if (window.KeyEvent)
			{
				Event = document.createEvent("KeyEvents");
				Event.initKeyEvent('keypress', true, true, window, false, false, false, false, 13, 0);
			}
			else
			{
				Event = document.createEvent("UIEvents");
				Event.initUIEvent( 'keypress', true, true, window, 1);
				Event.keyCode = 13;
			}
            Textarea.dispatchEvent(Event);
        }
    } catch (ex) { if (DEBUG) alert("PostMyEvent: " + ex); }

}

function PostMyEvents()
{
    try
    {
        var MyEvents = GM_getValue('MyEvents', null);
        var MyName = unsafeWindow.active_user.username();
        var IDs = GetUserEvents(MyName, 15);
        for (var i = 0; i < IDs.length; i++)
        {
			var ID = IDs[i];
            if (MyEvents.indexOf(ID) < 0)
            {
                PostMyEvent(ID);
				MarkAsVisited("MyEvents", ID);
                return;
            }
        }
    } catch (ex) { if (DEBUG) alert("PostMyEvent: " + ex); }
}

// Initialization

function KBLEMLoad()
{
    try {
        var MyName = unsafeWindow.active_user.username();
        var IDs = GetUserEvents(MyName, 15);
		GM_setValue('MyEvents', IDs.join(","));
        GM_setValue('VisitedEvents', "");
        window.setInterval(ChatProcessor, 2000);
        window.setInterval(PostMyEvents, 60000);
        if (DEBUG) alert("KBL Event Manager installed.");
    } catch (ex) { if (DEBUG) alert("KBLEMLoad: " + ex); }
}

try {
    if (window.top == window.self)
        window.addEventListener("load", KBLEMLoad, false);
    else if (0 < document.URL.indexOf("playkb.com/index.kg.php"))
        GM_setValue('GameURL', document.URL);
} catch (ex) { if (DEBUG) alert("Init: " + ex); }