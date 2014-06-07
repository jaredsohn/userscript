// ==UserScript==
// @name           HT-Maffia Vote Counter - Invisible Supporter Tool - Chrome
// @description	   This tool counts and saves votes in Hattrick Mafia Games and present them in the forums live. To be used in Chrome with Tampermonkey.
// @namespace      http://www.secretinternet.se/
// @grant          GM_xmlhttpRequest
// @description    Vote counter for HT-Maffia
// @version	       2.5
// @include        http://*.hattrick.org/Forum/Read.aspx*
// ==/UserScript==

	function getAllVotes(getday,diff){
		var getstr = "";
		getstr = getstr.concat("thread="+thread+"&day="+getday+"&diff="+diff);
        
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.secretinternet.se/sites/ht/ist/get.php",
			data: getstr,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded, charset=utf-8",
			},
			onload: function(response) {
				if(response.readyState==4 && response.status==200){
					var jsonRes = JSON.parse(response.responseText);
					if(jsonRes[0] != null){
						var maffia_temp = document.querySelector('#maffiaVotesContainer');
						if(maffia_temp){
							maffia_temp.parentNode.removeChild(maffia_temp);
						}
						elementStr = '<table border="0px">';
						for (var i = jsonRes[0].length-1; i >= 0; i--) {
							elementStr = elementStr.concat('<tr><td style="width: 120px;"><a href="#'+jsonRes[4][i]+'">'+jsonRes[3][i]+'</a></td><td style="width: 95px;">'+jsonRes[0][i]+'</td><td><strong>'+jsonRes[1][i]+' '+jsonRes[2][i]+'</strong></td></tr>');
						}	
						elementStr = elementStr.concat('</table>');
						
						var tot = jsonRes[5];
						
						totStr = '<table border="0px">';
						for (i in tot){
							totStr = totStr.concat('<tr><td style="width: 95px">'+i+'</td><td style="width: 50px;">'+tot[i]+'</td></tr>');
						}			
						totStr = totStr.concat('</table>');
						var newElement = document.createElement('div');
						newElement.setAttribute('id', 'maffiaVotesContainer');
						newElement.setAttribute('style', 'width: 650px;');
						
						var allVotes = document.createElement('div');
						allVotes.setAttribute('id', 'maffiaVotes');
						allVotes.setAttribute('style', 'width: 450px;');		
						allVotes.innerHTML = elementStr;
						
						var totVotes = document.createElement('div');
						totVotes.setAttribute('id', 'voteSum');
						totVotes.setAttribute('style', 'width: 200px; margin-top: 24px; float:right;');
						totVotes.innerHTML = totStr;
						
						var getday = jsonRes[6];
						var prevLink = document.createElement('a');
						prevLink.setAttribute('href', '#');
						prevLink.innerHTML = 'prev';
						var nextLink = document.createElement('a');
						nextLink.setAttribute('href', '#');
						nextLink.innerHTML = 'next';
						var curDate = document.createElement('span');
						curDate.innerHTML = '   '+getday+'   ';
						prevLink.addEventListener('click', function(){ getAllVotes(getday,-1); });
						nextLink.addEventListener('click', function(){ getAllVotes(getday,1); });
						
						var dateLink = document.createElement('div');
						dateLink.setAttribute('id', 'dateLink');
						dateLink.setAttribute('style', 'width: 650px; margin-bottom:10px;');
						dateLink.appendChild(prevLink);
						dateLink.appendChild(curDate);
						dateLink.appendChild(nextLink);
						
						newElement.appendChild(totVotes);
						newElement.appendChild(allVotes);
						newElement.insertBefore(dateLink,allVotes);
						pasteElement = document.getElementById('ctl00_ctl00_CPContent_pnlScrollContent');
						beforeElement = pasteElement.getElementsByClassName('left')[0];
						pasteElement.insertBefore(newElement, beforeElement); 
					}
					else if(jsonRes[7]){
						var maffia_temp = document.querySelector('#maffiaVotesContainer');
						if(maffia_temp){
							maffia_temp.parentNode.removeChild(maffia_temp);
						}
						var getday = jsonRes[6];
						var prevLink = document.createElement('a');
						prevLink.setAttribute('href', '#');
						prevLink.innerHTML = 'prev';
						var nextLink = document.createElement('a');
						nextLink.setAttribute('href', '#');
						nextLink.innerHTML = 'next';
						var curDate = document.createElement('span');
						curDate.innerHTML = '   '+getday+'   ';
						prevLink.addEventListener('click', function(){ getAllVotes(getday,-1); });
						nextLink.addEventListener('click', function(){ getAllVotes(getday,1); });
						
						var dateLink = document.createElement('div');
						dateLink.setAttribute('id', 'dateLink');
						dateLink.setAttribute('style', 'width: 650px; margin-bottom:10px;');
						dateLink.appendChild(prevLink);
						dateLink.appendChild(curDate);
						dateLink.appendChild(nextLink);
						
						var newElement = document.createElement('div');
						newElement.setAttribute('id', 'maffiaVotesContainer');
						newElement.setAttribute('style', 'width: 650px;');
						
						newElement.appendChild(dateLink);
						pasteElement = document.getElementById('ctl00_ctl00_CPContent_pnlScrollContent');
						beforeElement = document.getElementsByClassName('left')[0];
						pasteElement.insertBefore(newElement, beforeElement);
					}
				}
			}
		});
	}
	
	function checkMultiplicity(users, i, nbr){
		var k = i + 1;
		while(k < nbr){
			if(users[i] + '*' == users[k]){
				return false;
			}
			k ++;
		}
		return true;
	}
	function arrayToString(arr){
		var str;
		for(var i in arr){
			if(i == 0){
				str = arr[0];
			}
			else{
				str = str.concat('@'+arr[i])
			}
		}
		return str;
	}
	function getIdTag(message){
		var idTag = message.querySelector('.cfHeader').querySelector('.float_left').childNodes;

		var i = 0;
		while(!idTag[i].getAttribute('id')){
			i++;
		}
		return idTag[i];
	}
	
	var messages = document.querySelectorAll('.cfWrapper'),
		users = {},
		times = {},
		votes = {},
		ids = {},
		strong_pattern = /(((([h]|(oh))\u00E4ng)|(([d]|(od))\u00F6da))(?!(des|ning)))|(vote)|(lucka)/i,
		time_pattern = /(\d{4}-\d{2}-\d{2}\s\d{2}(.|:)\d{2})|(\d{2}(.|:)\d{2})|((\d{1}|\d{2})-\d{2}-\d{4}\s\d{2}(.|:)\d{2})/i,
		index = 0;
	
	// for each message
	for (var i = 0; i < messages.length; i ++) {
		if(!messages[i].querySelectorAll('.cfDeleted')[0]){
			var message = messages[i],
				user = message.querySelector('.inner[title]'),
				strong = message.querySelectorAll('strong'),
				time = message.querySelector('div.float_right'),
				idtag = getIdTag(message),
				content = '';
			// check that the elements exist
			if (user && strong.length != 0 && time) {
				var userName = user.getAttribute('title');
				var timeStr = time.innerHTML.match(time_pattern)[0];
				var id = idtag.getAttribute('id');
				for (var k=0; k < strong.length; k ++){
					if (strong[k].parentNode.className == 'message'){	
						content = content.concat(strong[k].innerHTML+' ');
					}
					else if (strong[k].parentNode.tagName == 'EM' || strong[k].parentNode.tagName == 'A'){
						if (strong[k].parentNode.parentNode.className == 'message'){
							content = content.concat(strong[k].innerHTML.replace(/(^\s*)|(\s*$)/g,'')+' ');
						}
					}
				}
				// check if it matches the pattern
				if (content.match(strong_pattern) && userName && timeStr) {
					users[index] = userName;
					times[index] = timeStr;
					votes[index] = content;
					ids[index] = id;
					index ++;
				}
				
			}
		}
		
	}
	// placing a marker on the last vote of every user
/*	var i = index - 1;
	while (i >= 0) {
		if(checkMultiplicity(users, i, index)){
			users[i] = users[i] + '*';
		}
		i --;
	}*/
/*	if(!messages[0].querySelectorAll('.cfDeleted')[0]){
		if(getday = messages[0].querySelector('div.float_right').innerHTML.match(time_pattern)[0]){
			
		}
		else{
			var time = document.querySelector('#time');	
			var getday = time.innerHTML.match(/\d{4}-\d{2}-\d{2}/);
		}
	}*/
	var time = document.querySelector('#time');	
	var getday = time.innerHTML.match(/\d{4}-\d{2}-\d{2}/);
	var thread = location.href.match(/(\d{8})/i)[0];

	if(index != 0) {
		var users_str = arrayToString(users);
		var times_str = arrayToString(times);
		var votes_str = arrayToString(votes);
		var ids_str = arrayToString(ids);
		var putstr = 'thread='+thread+'&user='+users_str+'&vote='+votes_str+'&time='+times_str+'&ids='+ids_str;
        
		GM_xmlhttpRequest({
			method: "POST",
			url: "http://www.secretinternet.se/sites/ht/ist/put.php",
			data: putstr,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded, charset=utf-8",
			},
			onload: function(response) {
				getAllVotes(getday,0);
			}
		});
		
		/*var http = new XMLHttpRequest();
		http.open("POST", "http://www.secretinternet.se/sites/ht/ist/put.php", true);
		http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		http.setRequestHeader("Content-type","charset=utf-8");
		http.send(url);
		
		http.onreadystatechange=function(){
			alert('00');
			if(http.readyState==4 && http.status==200){getAllVotes(getday,0);}
		}*/
	}
	else{getAllVotes(getday,0);}