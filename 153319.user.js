// ==UserScript==
// @name           Twitter: Classify Users
// @version        1.0
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

	var screenname = document.getElementsByClassName('profile-card-inner')[0].getAttribute('data-screen-name');
	
	var nfriends = document.evaluate('//ul[@class="stats js-mini-profile-stats"]/li[2]/a[@class="js-nav"]/strong', document, null, 9, null).singleNodeValue.textContent;
	nfriends=nfriends.replace(/\,/g,'');
	
	var nfollowers = document.evaluate('//ul[@class="stats js-mini-profile-stats"]/li[3]/a[@class="js-nav"]/strong', document, null, 9, null).singleNodeValue.textContent;
	nfollowers=nfollowers.replace(/\,/g,'');
	
	var newdiv = document.createElement('div');
		document.getElementById('page-container').insertBefore(newdiv, document.getElementsByClassName('dashboard')[0]);
		newdiv.setAttribute("id", 'user_classify_div');
		
			var friends = parseInt(nfriends)+1;
			var followers = parseInt(nfollowers)+1;
			var ratio = friends/followers;
				friends--;
				followers--;
			var type  = '';
			var color = '';
			if(ratio <= 0.2){
				type  = 'a twitter caster';
				color = 'green';
			}else if(ratio <= 0.5){
				type  = 'notable';
				color = '#9ACD32';
			}else if(ratio <= 1){
				type = 'socially healthy';
				color = '#FFD700';
			}else if(ratio <= 2){
				type = 'a newbie or social climber';
				color = '#FF8C00';
			}else{
				type = 'a twitter spammer';
				color = '#B22222';
			}

		newdiv.setAttribute("style", 'background-color: ' + color + '; text-align: center; color:white; font-weight: bold;');
		newdiv.innerHTML = 'This user ('+screenname+') is '+type+' ('+friends+' friends, '+followers+' followers, ratio: '+(Math.round(ratio*100)/100)+').';