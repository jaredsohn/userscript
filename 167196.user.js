// ==UserScript==
// @id             forums.whirlpool.net.au-9229c113-b2e4-4488-a083-920a66ad7259@aw3tfr
// @name           WP Watched threads on user page
// @version        1.8
// @namespace      whirlpool
// @author         Yansky
// @description    
// @include        http://forums.whirlpool.net.au/user/*
// @include        https://forums.whirlpool.net.au/user/*
// @match        http://forums.whirlpool.net.au/user/*
// @match        https://forums.whirlpool.net.au/user/*
// @updateURL       http://userscripts.org/scripts/source/167196.user.js
// @run-at         document-start
// ==/UserScript==


var watThreadU = {

	jsonResponse : null,
	threads : null,
	newSection : null,
	wpAPIKey : null,
	tyme : new Date(),
	days:{
		0:'Sunday',
		1:'Monday',
		2:'Tuesday',
		3:'Wednesday',
		4:'Thursday',
		5:'Friday',
		6:'Saturday'
	},
	threadsAlreadyDisplayed : {},
	init : function(){

		//first run
		
		if(!localStorage.getItem("wpAPIKey")){

			var promptValue = prompt('Please enter your API Key');
			
			if(!promptValue)
				return;
			
			localStorage.setItem("wpAPIKey", promptValue.toString());

		}
		
		watThreadU.wpAPIKey = localStorage.getItem("wpAPIKey");
			
		GM_xmlhttpRequest({
			method: "GET",
			url: "/api/?key="+watThreadU.wpAPIKey+"&get=watched&output=json",
			onload: function(res) {
			
				if(res.status !== 200 ){
				
					console.log(
						"Error tryinig to get watched threads\n"+
						"Status : "+res.status+"\n"+
						"responseText : "+res.responseText
					);

					return;
					
				}
			
				try{
				
					watThreadU.jsonResponse = JSON.parse(res.responseText);
				
				}
				catch(e){
				
					console.log(e);
				
				}
				
				if(watThreadU.jsonResponse){
				
					watThreadU.domWaiter();
					
				}
				
			}
		});			
	
	},
	//to make it compatible with WP+ (assuming the GM_xmlhttpRequest finishes before WP+ is ready)
	domWaiter:function(){
	
		watThreadU.threads = document.querySelector('#threads tbody');
		
		if(!watThreadU.threads){
		
			window.setTimeout(function(){
			
				watThreadU.domWaiter();
			
			},10);
		
		}
		else{
		
			if(window.location.href !== document.querySelector('.userinfo a').href)
				return;
		
			watThreadU.createHTML();
		
		}
		
	},
	figureOutDateText : function(jsonItem){
	
		var threadDate = new Date(jsonItem.LAST_DATE);
		var hours = threadDate.getHours();
		var minutes = threadDate.getMinutes();
		var amorpm = 'am';
		var timeText = '';
		
		if(hours>11){
		
			amorpm = 'pm';
			hours-=12;
		
		}

		if(minutes < 10){
		
			minutes = '0'+minutes;
		
		}

		if(watThreadU.tyme.getMonth() === threadDate.getMonth() ){
		
			if( watThreadU.tyme.getDate() === threadDate.getDate() ){

				timeText = 'Today at '+hours+':'+minutes+' '+amorpm;
			
			}		
			else if( ( watThreadU.tyme.getDate() - threadDate.getDate() ) === 1){
			
				timeText = 'Yesterday at '+hours+':'+minutes+' '+amorpm;
			
			}
			else if( ( watThreadU.tyme.getDate() - threadDate.getDate() ) < 7 ){
			
				timeText = watThreadU.days[threadDate.getDay()]+' at '+hours+':'+minutes+' '+amorpm;
			
			}
			else{
			
				var tds = threadDate.toDateString().split(' ');
			
				timeText = tds[3]+"-"+tds[1]+"-"+tds[2]+', '+hours+':'+minutes+' '+amorpm;
			
			}			
		}
		else{
		
			var tds = threadDate.toDateString().split(' ');
		
			timeText = tds[3]+"-"+tds[1]+"-"+tds[2]+', '+hours+':'+minutes+' '+amorpm;
		
		}

		return timeText;
	
	},
	createHTML : function (){
		
		this.newSection = document.createElement('tr');
		this.newSection.setAttribute('class','section');
		this.newSection.innerHTML = '<td colspan="5" class="title"><a href="/forum/?action=watched" class="title">Watched Threads</a></td>';
		
		this.threads.appendChild(this.newSection);
		
		//check if a watched thread is already displayed
		var threadsCheck = document.querySelectorAll('#threads tr:not([class="section"])>td:first-child>a[href^="/forum-replies.cfm?t="]');
		
		[].forEach.call(threadsCheck,function(item,index,arr){
		
			watThreadU.threadsAlreadyDisplayed[item.href.split('?t=')[1]] = item.href.split('?t=')[1];
		
		});

		this.jsonResponse.WATCHED.forEach(function(item,index,arr){
		
			if(watThreadU.threadsAlreadyDisplayed[item.ID])
				return;
		
			var tt = watThreadU.figureOutDateText(item);
		
			var newTR = document.createElement('tr');
		
			var td1 = document.createElement('td');
			td1.setAttribute('class','title');
			
			var td1A = document.createElement('a');
			td1A.setAttribute('class','title');
			td1A.setAttribute('href','/forum-replies.cfm?t='+item.ID);
			td1A.innerHTML = item.TITLE;
			
			td1.appendChild(td1A);
			newTR.appendChild(td1);
			
			
			var td2 = document.createElement('td');
			td2.setAttribute('class','reps');

			newTR.appendChild(td2);			
			
			
			var td3 = document.createElement('td');
			td3.setAttribute('class','reps');
			td3.innerHTML = item.REPLIES;
			
			newTR.appendChild(td3);	
			
			
			var td4 = document.createElement('td');
			td4.setAttribute('class','newest');
			
			var td4A = document.createElement('a');
			td4A.setAttribute('href','/user/'+item.LAST.ID);
			td4A.innerHTML = item.LAST.NAME;
			td4.appendChild(td4A);
			td4.innerHTML = td4.innerHTML + '<br>'+tt;
			
			newTR.appendChild(td4);	


			var td5 = document.createElement('td');
			td5.setAttribute('class','goend');
			
			var td5A = document.createElement('a');
			td5A.setAttribute('href','/forum-replies.cfm?t='+item.ID+'&p=-1&#bottom');
			td5A.innerHTML = item.TITLE;
			
			td5A.innerHTML = '<img width="16" height="17" border="0" alt="Jump to last post" src="/img/forum/arrow.gif">';
			
			td5.appendChild(td5A);
			newTR.appendChild(td5);
			
			
			watThreadU.threads.appendChild(newTR);

			
		})

	}

};

	
watThreadU.init()
