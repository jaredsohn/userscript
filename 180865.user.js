// ==UserScript==
// @name        youTrack_time_manager
// @namespace   youTrack
// @description automaticaly tracks time into tasks. Ctrl + Q for pause/resume timer; Ctrl + Q for showing timesheet
// @include     *//maxymiser.myjetbrains.com/youtrack/issue/*
// @include     *//www.openair.com/timesheet.pl?*timesheet_id=*
// @grant	    GM_getValue
// @grant	    GM_setValue
// @version     1.16
// @run-at document-end
// ==/UserScript==


var $ = unsafeWindow.jQuery;

function log(){
	unsafeWindow.console.log.apply(0, arguments);
};

if(location.href.match(/youtrack/)){
	var tracker = new function(){

		var self = this;
		var document_title = document.title;

		this.fillData = function(){
			this.ticket = {
				id: (location.href.match(/issue\/([^\/]+)/) || [,])[1],
				url: location.href,
				title: document.title.replace(/\s:\s[^:]+$/, '')
			};

			this.project = {
				client: $('a[title*="Client Account: "]').attr('title').replace('Client Account: ', ''),
				id: getProjectId(),
				title: $('.cf-wrapper[title*="OA Name: "]').text().trim()
			};
		};

		function getProjectId(){
			return $('li.listCaption:contains("Subtask of:") + li a:eq(1)').text().trim();
		};

		this.init = function(){
			
			this.fillData();

			if(!this.ticket.id)
				return;

			this.initTimer();
		};

		this.getToday = function(){
			var date = (new Date());
			return date.getFullYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate();
		};

		this.initTimer = function(){
			this.timer = {
				ticket: this.ticket,
				project: this.project,
				state: 'paused',
				started: 0,
				value: 0
			};

			this.today_tickets = JSON.parse(GM_getValue('yT_' + this.getToday()) || "{}");
			//log(this.today_tickets);

			var stored_timer = this.today_tickets[this.ticket.id] || {state: 'active'};
			$.extend(this.timer, stored_timer);
			//log(this.timer);

			this.onresume();
		};

		this.storeTimer = function(){
			this.today_tickets[this.ticket.id] = this.timer;
			GM_setValue('yT_' + this.getToday(), JSON.stringify(this.today_tickets));
		};

		this.onpause = function(){
			var timestamp = +(new Date);
			this.timer.state = 'paused';
			this.timer.value += this.timer.started ? timestamp - this.timer.started : 0;

			this.fillData();
			this.storeTimer();

			clearInterval(this.notificationInterval);
		};

		this.onresume = function(){
			var timestamp = +(new Date);
			this.timer.state = 'active';
			this.timer.started = timestamp;

			clearInterval(this.notificationInterval);
			this.notificationInterval = setInterval(function(){
				var time = self.getTime();

				document.title = self.addLeadingZero(time.hours) + ':' + self.addLeadingZero(time.minutes) + ':' + self.addLeadingZero(time.seconds) + ' ' + document_title;
			}, 1e3);
		};

		this.addLeadingZero = function(i){
			if(i < 10) return '0' + i;
			else return i;
		};

		this.getTime = function(){

			var time_dif = +(new Date) - this.timer.started + this.timer.value;

			var hours = (time_dif / (1000 * 60 * 60)) | 0,
				minutes = ((time_dif / (1000 * 60)) | 0) - hours * 60,
				seconds = ((time_dif / 1000) | 0) - hours * 60 * 60 - minutes * 60;

			return {
				hours: hours,
				minutes: minutes,
				seconds: seconds
			};
		};

		this.switchState = function(){
			if(this.timer.state == 'paused')
				this.onresume();
			else	
				this.onpause();
		};

		window.onbeforeunload = function(){
			if(self.timer.state != 'paused')
				self.onpause();
			else
				self.storeTimer();

			setTimeout(function(){
				self.onresume();
			}, 3e3);	
		};

		$(window).keypress(function(e){
			if(e.ctrlKey && (e.which == 113 || e.which == 17)){
				self.switchState();
			}
		});
		
		this.init();

	};
}else if(location.href.match(/openair/)){

	var filler = new function(){

		var self = this;

		this.init = function(){
			this.initData();
		};

		this.dateToString = function(date){
			return date.getFullYear() + '-' + (1 + date.getMonth()) + '-' + date.getDate();
		};

		this.initData = function(){

			var ua_format = (new Date('2013-10-28')).getFullYear();

			var period = $('#app_header_title .aht_middle').text().split(/\s*to\s*/),
				period_start = new Date(period[0].replace(/(\d+)\/(\d+)\/(\d+)/, ua_format ? '20$3-$2-$1' : '20$3-$1-$2')),
				period_end = new Date(period[1].replace(/(\d+)\/(\d+)\/(\d+)/, ua_format ? '20$3-$2-$1' : '20$3-$1-$2')),
				week_data = {};

			period_start = new Date(period_start.valueOf() + period_start.getTimezoneOffset() * 60000);
			period_end = new Date(period_end.valueOf() + period_end.getTimezoneOffset() * 60000);	

			while(period_start <= period_end){
				var date_string = this.dateToString(period_start);

				var	day_tickets = JSON.parse(GM_getValue('yT_' + date_string) || "{}");

				self.prepareData(day_tickets, date_string);

				period_start.setDate(period_start.getDate() + 1);
			}

		};

		this.createWindow = function(){
			this.ctx = window.open('about:blank', 'yT_timesheet', 'location=0,scrollbars=1,width=800,height=400');
		};

		this.prepareData = function(tickets, date){

			var clients = {},
				no_data = true;

			for(var key in tickets){
				var ticket_client = tickets[key].project.client;
				clients[ticket_client] = clients[ticket_client] || [];
				clients[ticket_client].push(tickets[key]);
				no_data = false;
			}

			this.writeData(date.big().bold());
			if(no_data)
				this.writeData('no data');

			for(var key in clients){
				this.writeData('&nbsp;&nbsp;&nbsp;&nbsp;<b>Client:</b> ' + key);
				
				var projects = {};
				for(var i = 0; i < clients[key].length; i++){
					var ticket = clients[key][i];

					projects[ticket.project.id] = projects[ticket.project.id] || [];
					projects[ticket.project.id].push(ticket);

				}

				for(var project_id in projects){
					var project_tickets = projects[project_id];

					var total = 0;
					for(var l = 0; l < project_tickets.length; l++){
						total += (project_tickets[l].value / (1000 * 60 * 60));
					}
					this.writeData('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Project:</b> ' + project_tickets[0].project.title.link('http://maxymiser.myjetbrains.com/youtrack/issue/' + project_tickets[0].project.id) + ' : ' + total.toFixed(2) + 'h');
					
					for(var l = 0; l < project_tickets.length; l++){
						this.writeData('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>-</b> ' + project_tickets[l].ticket.title.link(project_tickets[l].ticket.url) + ' : ' + (project_tickets[l].value / (1000 * 60 * 60)).toFixed(2) + 'h');
					}
				}
			}
			this.writeData('');
		};

		this.writeData = function(data){
			this.output = this.output || [];
			this.output.push(data + '<br/>');
		};

		this.showData = function(){
			this.createWindow();
			for(var i = 0; i < this.output.length; i++){
				this.ctx.document.write(this.output[i]);
			}
		};


		$(window).keypress(function(e){
			if(e.ctrlKey && (e.which == 113 || e.which == 17)){
				self.showData();
			}
		});

		this.init();
	};	
}