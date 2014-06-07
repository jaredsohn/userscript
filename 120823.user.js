// ==UserScript==
// @name           Siries.me Downloader and Quicktime Linker
// @version        1.0
// @author	   Hexxeh
// @description    Adds a button underneath the Siries.me video player to allow easy download of the video file or opening in an external quicktime player.
// @include        http://siries.me/*/*/*
// @include        http://*.siries.me/*/*/*
// ==/UserScript==

var flashvars = document.getElementById('episode_video_wrapper').childNodes[0].childNodes[4].attributes[1].value.split("&");

var filepath = false;
for(var i = 0; i < flashvars.length; i++) {
	var tmp2 = flashvars[i].split("=",2);
	if(tmp2[0] == "file") {
		filepath = unescape(tmp2[1]);
	}
}

var divCollection = document.getElementsByTagName("div");
for (var i=0; i<divCollection.length; i++) {
    if(divCollection[i].getAttribute("class") == "player-toolbar") {
        divCollection[i].innerHTML = divCollection[i].innerHTML+'<a href="'+filepath+'" style="margin-right: 7px; float: right; border-color: #c1c1c1; padding: 2px; font-weight: bold; font-size: 11px; border-width: 1px; border-style: solid; color: black; text-decoration: none; -webkit-border-radius: 3px; -moz-border-radius: 3px; border-radius: 3px; background: #ffffff; background: -moz-linear-gradient(top,  #ffffff 0%, #d7d7d7 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#ffffff), color-stop(100%,#d7d7d7)); background: -webkit-linear-gradient(top,  #ffffff 0%,#d7d7d7 100%); background: -o-linear-gradient(top,  #ffffff 0%,#d7d7d7 100%); background: -ms-linear-gradient(top,  #ffffff 0%,#d7d7d7 100%); background: linear-gradient(top,  #ffffff 0%,#d7d7d7 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'#ffffff\', endColorstr=\'#d7d7d7\',GradientType=0 );" onmouseover="this.style.borderColor = \'#3b3b3b\'" onmouseout="this.style.borderColor = \'#c1c1c1\'">Open in Quicktime</a>';
    }
}

(function()
{
	
	function onClickCapture(event)
	{
		
		if (event.ctrlKey || event.altKey || event.shiftKey) return;
		if (!event.target || !event.target.tagName || !event.target.tagName.toLowerCase() == 'a') return;
		if (!event.target.href) return;
		if (!event.target.href.match(/^http?:\/\//)) return;
		if (!event.target.href.match(/\.(?:mp[34v]|mov|m4[av])(\?.*)?$/i)) return;
		
		var obj = document.createElement('object');
		obj.style.position = 'absolute';
		obj.style.visibility = 'hidden';
		obj.style.top = obj.style.left = '-128px';
		obj.style.width = obj.style.height = '1px';
		obj.type = 'video/quicktime';
		obj.data = 'data:video/quicktime;base64,\
			AAAAIGZ0eXBxdCAgIAUDAHF0ICAAAAAAAAAAAAAAAAAAAAUjbW9vdgAAAGxtdmhkAAAAAMNzerLDc3qyAAACWAAAAAYAAQAAAQAAAAAAAAAAAA\
			AAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAlF0cmFrAAAAXHRraGQA\
			AAAPw3N6qMNzerIAAAABAAAAAAAAAAYAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAEAAAABAA\
			AAAAAkZWR0cwAAABxlbHN0AAAAAAAAAAEAAAAGAAAAAAABAAAAAAG9bWRpYQAAACBtZGhkAAAAAMNzerLDc3qyAAACWAAAAAYAAAAAAAAAOmhk\
			bHIAAAAAbWhscnZpZGVhcHBsEAAAAAABASkZQXBwbGUgVmlkZW8gTWVkaWEgSGFuZGxlcgAAAVttaW5mAAAAFHZtaGQAAAABAQOAAIAAgAAAAA\
			A5aGRscgAAAABkaGxyYWxpc2FwcGwQAAABAAEBQRhBcHBsZSBBbGlhcyBEYXRhIEhhbmRsZXIAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAM\
			YWxpcwAAAAEAAADic3RibAAAAH5zdHNkAAAAAAAAAAEAAABuZ2lmIAAAAAAAAAABAAAAAAAAAAAAAAIAAAACAAABAAEASAAAAEgAAAAAAAAAAQ\
			NHSUYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAACAAAABgAAAAAAAAACAAAAAAAAAAAAAABhzdHRzAAAAAAAAAAEAAAABAAAA\
			BgAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAqAAAAAQAAABRzdGNvAAAAAAAAAAEAAAVrAAAADHVkdGEAAAAAAA\
			ACNG1ldGEAAAAgaGRscgAAAAAAAAAAbWR0YQAAAAAAAAAAAAAAAAAAAThrZXlzAAAAAAAAAAYAAAA6bWR0YWNvbS5hcHBsZS5xdWlja3RpbWUu\
			cGxheWVyLm1vdmllLnZpc3VhbC5icmlnaHRuZXNzAAAANW1kdGFjb20uYXBwbGUucXVpY2t0aW1lLnBsYXllci5tb3ZpZS52aXN1YWwuY29sb3\
			IAAAA0bWR0YWNvbS5hcHBsZS5xdWlja3RpbWUucGxheWVyLm1vdmllLnZpc3VhbC50aW50AAAAOG1kdGFjb20uYXBwbGUucXVpY2t0aW1lLnBs\
			YXllci5tb3ZpZS52aXN1YWwuY29udHJhc3QAAAAqbWR0YWNvbS5hcHBsZS5xdWlja3RpbWUucGxheWVyLnZlcnNpb24AAAAjbWR0YWNvbS5hcH\
			BsZS5xdWlja3RpbWUudmVyc2lvbgAAANRpbHN0AAAAHAAAAAEAAAAUZGF0YQAAABcAAAAAAAAAAAAAABwAAAACAAAAFGRhdGEAAAAXAAAAAD+A\
			AAAAAAAcAAAAAwAAABRkYXRhAAAAFwAAAAAAAAAAAAAAHAAAAAQAAAAUZGF0YQAAABcAAAAAP4AAAAAAAB0AAAAFAAAAFWRhdGEAAAABAAAAAD\
			cuMi4xAAAAPwAAAAYAAAA3ZGF0YQAAAAEAAAAANy4yLjEgMHg3MjE4MDAwIChNYWMgT1MgWCwgMTAuNSwgOUE1ODEpAAAAKnVkdGEAAAAMV0xP\
			QwAtABUAAAAJU2VsTwAAAAAJQWxsRgAAAAAAAAAACGZyZWUAAAAId2lkZQAAAEJtZGF0AAAACHdpZGUAAAAAbWRhdEdJRjg5YQEAAQCAAAAAAA\
			AAAAAh+QQBAAAAACwAAAAAAQABAAACAkQBAA=='; // qtbutton.mov
		
		params = {
			target: 'quicktimeplayer',
			postdomevents: 'true',
			href: event.target.href,
			autohref: 'true',
			autostart: 'false',
			controller: 'false',
			cache: 'true',
			spec: 'qt'
		};
		for (name in params)
		{
			var param = document.createElement('param');
			param.name = name;
			param.value = params[name];
			obj.appendChild(param);
		}
		
		document.body.appendChild(obj);
		
		event.preventDefault();
		
	}
	
	window.addEventListener('click', onClickCapture, true);
	
})();