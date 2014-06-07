// ==UserScript==
// @name           MuteReddit
// @namespace      Mutes Subreddits
// @description    Mutes Subreddits
// @include        *
// ==/UserScript==


modules['subredditMute'] = {
	moduleID: 'subredditMute',
	moduleName: 'Subreddit Mute',
	//category: 'Filters',
	options: {
		keywords: {
			type: 'table',
			fields: [{
				name: 'keyword',
				type: 'text'
			}],
			value: [],
			description: 'Type in subreddit names to include in the filter.'
		}	
	},
	description: 'Mute specified subreddits',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/?(?:\??[\w]+=[\w]+&?)*/i
	),
	exclude: Array(
			/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i,
			/https?:\/\/([a-z]+).reddit.com\/user\/[-\w\.]+/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	muteSubreddits: function(ele, state) {
		var subredditname, re, subs = this.options.keywords.value;
		for (var i = 0, lene = ele.length; i < lene; i += 1) {
			if (ele[i]) {
				subredditName = ele[i].querySelector('.subreddit').innerHTML;
				re = new RegExp(subredditName);
				for (var w=0,lens=subs.length;w<lens;w+=1){
					if(subs[w].toString().toLowerCase().match(re)){
						if(state=="checked") {
						ele[i].style.display="none";
						break;
						}
					 else {
						ele[i].style.display="block";
						//break;
					}
                    }
				}
            }
		}
	},
	createMuteButton: function(){
		var parentDiv = document.querySelectorAll('div.sidebox.submit div.morelink')[0];
		var dv = document.createElement("div");
		dv.setAttribute("id", "subMuteDiv");
		dv.innerHTML = "<p><input type='checkbox' defaultChecked='false' id='subredditMute'> Subreddit Mute ON/OFF</p><br/>";
		parentDiv.parentNode.insertBefore(dv, parentDiv);
	},
	go: function() {
	    if ((this.isEnabled()) && (this.isMatchURL())) {
			document.body.addEventListener('DOMNodeInserted', function(event) {
				if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
                var ele = document.querySelectorAll('.sitetable .thing.link');
					if(document.querySelector('#subredditMute').checked === true){
						modules['subredditMute'].muteSubreddits(ele, "checked");
					}
            }
        }, false);
		this.createMuteButton();
		var muteBtn = document.querySelector('#subredditMute');
		muteBtn.addEventListener('click', function() {
		    if (muteBtn.checked == false) {
			var ele = document.querySelectorAll('.sitetable .thing.link');
			modules['subredditMute'].muteSubreddits(ele, "unchecked");
		    } else {
			var ele = document.querySelectorAll('.sitetable .thing.link');
			modules['subredditMute'].muteSubreddits(ele, "checked");
		    }
		});
	    }
	}
};