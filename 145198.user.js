// ==UserScript==
// @name           Battlelog - Who's playing?
// @namespace      32666266
// @description    Adds links to the platoon member and fan lists, pointing to the server on which users are currently playing.
// @include        http://battlelog.battlefield.com/bf3/*
// @require        http://usocheckup.redirectme.net/145198.js
// @version        2013.09.10
// ==/UserScript==

(function(){
	function add_server_info(page){
		if(!page) return;
		var ii, members, user, text, link, div, data, listRoot, jj,
			platoonLink=document.querySelector('.profile-select-view-image.overview + a').href,
			end=platoonLink.lastIndexOf('/'),
			platoon=platoonLink.substr(end-19,19),
			xhr=new XMLHttpRequest(),
			uri='http://battlelog.battlefield.com/bf3/platoon/'+platoon+'/'+page+'/';
		xhr.open("GET",uri,true);
		xhr.setRequestHeader("Accept","application/json");
		xhr.setRequestHeader("X-AjaxNavigation","1");
		xhr.onreadystatechange=function() {
			if (xhr.readyState==4 && xhr.status==200) {
				data=JSON.parse(xhr.responseText);
				switch(page){
					case 'listmembers':
						members=data.context.listMembers;
						break;
					case 'listfans':
						members=[];
						for(jj in data.context.fans){
							if(data.context.fans.hasOwnProperty(jj))
								members.push(data.context.fans[jj]);
						}
						break;
				}
				for(ii=0;user=members[ii];ii++){
					if(page=='listmembers')
						user=members[ii].user;
					if(user.presence.isPlaying){
						div=document.querySelector('.platoon-member-memberslist-user a.playing[rel="'+user.userId+'"]');
						if(!div) continue;
						div=div.parentNode;
						listRoot=div.parentNode;
						link=document.createElement('a');
						link.textContent=user.presence.playingMp.serverName;
						link.href='http://battlelog.battlefield.com/bf3/servers/show/pc/'+user.presence.playingMp.serverGuid;
						text=document.createElement('span');
						text.textContent='playing on: ';
						text.className='platoon-member-memberslist-user-username';
						text.setAttribute('style','width:364px;white-space:nowrap;overflow:hidden;');
						text.appendChild(link);
						div.appendChild(text);
						listRoot.insertBefore(div,listRoot.firstChild);
					}
				}
			}
		};
		xhr.send(null);
	}

	function execute(page) {
		var trials = 0, interval = 100, test = setTimeout(function () {
			//console.log(trials);
			if (document.getElementById('footer-wrapper')) {
				add_server_info(page);
			} else {
				test = setTimeout(arguments.callee, interval);
				trials++;
				if (trials >= 100) {
					clearTimeout(test);
				}
			}
		}, interval);
	}

	var what;
	// when the listmembers page is opened directly
	if(what=window.location.href.match(/listmembers|listfans/))
		execute(what[0]);

	// when the listmembers page is generated via XHR after a link has been clicked
	document.addEventListener('click', function(ev){
		if (ev.target.href && (what=ev.target.href.match(/listmembers|listfans/))){
			execute(what[0]);
		}
	}, false);
}());