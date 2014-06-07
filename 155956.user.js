// ==UserScript==
// @name        Add youtube inbox to sidebar with unread comments count
// @namespace   #perunaonparas
// @include     *youtube.com/*
// @version     1.21
// ==/UserScript==
	function getToken (responseString)
{
	var match = responseString.match (/ *'session_token=([^']*).*initEllipsis/) [1];
	return match;
}

var status=1;

if (window.location.href.indexOf("my_subscriptions") > -1) {status=2;}


if (status == 1){

var tgt=document.querySelector("#guide-container .guide-user-links");
var d = document.createElement("li");
d.className="guide-channel";
d.innerHTML = '<a class="guide-item yt-uix-sessionlink yt-valign" href="http://www.youtube.com/inbox"> <span class="yt-valign-container"> <span class="display-name"> <span id="inboxadd">Inbox (?)</span> </span> </span> </a>';
tgt.appendChild(d);
    
}
	var secure ="";
	if (window.location.href.substr (0, 5) == "https") {secure = "s";}
	
	var base = 'http'+secure+'://www.youtube.com/inbox?folder=messages&action_message=1#';
	var req1 = new XMLHttpRequest ();
	var req2 = new XMLHttpRequest ();
	
	req1.onreadystatechange = function ()
	{
		if (req1.readyState == 4 && req1.status == 200)
		{
			req2.onreadystatechange = function ()
			{
				if (req2.readyState == 4 && req2.status == 200)
				{
					var counts = req2.responseText;
					var match = counts.match (new RegExp ('"inbox": ([0-9]*)')) [1];
					var newinbox=parseInt(match, 10);
					if(newinbox=="") {newinbox=0;}
                    if (status == 1){
					document.getElementById('inboxadd').innerHTML='Inbox ('+newinbox+')';	
                    }
                    if (status == 2){
                        var list = document.getElementsByClassName("yt-nav-item");
                        for (var i = 0; i < list.length; i++) {
                            if(list[i].innerHTML.indexOf("Inbox") > -1){ list[i].innerHTML='Inbox ('+newinbox+")";}

                        }
                    }
					
				}
			}
			req2.open ('POST', 'http'+secure+'://www.youtube.com/inbox_ajax?action_ajax=1&type=display_messages&folder=messages', true);
			req2.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
			req2.send ('session_token=' + getToken (req1.responseText) + '&messages=[{"type":"display_messages","request":{"folder":"messages","start":0,"num":20,"messages_deleted":[],"messages_read":[]}}]');
		}
	}
	req1.open ('GET', base, true);
	req1.send ();
