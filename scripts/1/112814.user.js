// ==UserScript==
// @name           BTO-All
-// @namespace http://bto.dovogame.com/all
-// @include http://s40.bto.dovogame.com/gamebto/index.php
-// @include http://s40.bto.dovogame.com/gamebto
-// @include http://s40.bto.dovogame.com/gamebto/
-// @include http://s40.bto.dovogame.com/gamebto/#* 
// ==/UserScript==
var BOT = {};
BOT.ArenaIndexer = function(userId) {
	this.userId = userId;
		
	this.getCommunication = function(){
		return BOT.UI.comm;
	}
	
	this.openDatabase = function() {
		if (!BOT.UI.data.arena) BOT.UI.data.arena = BOT.UI.storage.get("arena", {});
	}
	
	this.saveDatabase = function() {
		BOT.UI.storage.set("arena", BOT.UI.data.arena);		
	}

	this.getRecord = function(id) {
		return BOT.UI.data.arena[id] || this.getDefaultRecord();
	}
	
	this.setRecord = function(id, value) {
		BOT.UI.data.arena[id] = value;
	}
	
	this.start = function() {		
		this.lister = new BOT.PagedList('ajax_action.php?action=wonbtovs&doaction=myfree&page={page}', this.gotMatch.bind(this), this.finished.bind(this), this.getMatchList, this.canGoNextPage, this.getCommunication());
		this.lister.start();
	}
	
	this.gotMatch = function(item) {
		var matchDate = BOT.Utils.parseDate(item.CamStartTime);		
		var matchDateNumeric = matchDate.getTime();
		if (matchDate < BOT.Utils.getYesterday()) { this.finished(); return; }
		
		var opponent, opponentName;
		[opponent, opponentName] = this.getOpponent(item);
			
		var record = this.getRecord(opponent);				
		if (record.matches.indexOf(item.Id) > -1) {
			this.finished();
			return;		
		}
		
		record.UserId = opponent;
		record.UserName = opponentName;
		
		if (record.lastMatch < matchDateNumeric) {  record.lastMatch = matchDateNumeric; }
		if (record.matchDates.length > 3) { record.matchDates = record.matchDates.slice(record.matchDates.length-3); }
		record.matchDates.push(matchDateNumeric);
		
		if (record.matches.length > 3) { record.matches = record.matches.slice(record.matches.length-3); }
		record.matches.push(item.Id);

		this.setRecord(opponent,record);
		this.lister.getNextItem();	
	}
	
	this.getOpponent = function(item) {
		return item.UserId == this.userId ? [item.ToUserId,item.ToVUserName] : [item.UserId, item.VUserName];
	};	

	this.finished = function() {
		this.saveDatabase();
		BOT.UI.arena.gotoArenaPage();		
	};

	this.flagPlayer = function(playerId, playerName, teamA, teamB, teamC, isFlagged) {
		var record = this.getRecord(playerId);		
		record.flag = {"teamA":teamA,"teamB":teamB,"teamC":teamC,"isFlagged":isFlagged};
		
		this.setRecord(playerId, record);
		this.saveDatabase();
	};	
				
	this.getMatchList = function(data) { return data.o.List; }
	this.canGoNextPage = function(data) { return data.o.page < data.o.pagecount; }
	this.getDefaultRecord = function() { return {"lastMatch":0,"matches":[],"matchDates":[],"flag":{"teamA":6,"teamB":6,"teamC":0,"isFlagged":0}}; }
	this.openDatabase();						
}
BOT.Arena = function() {
	this.getDefaultFlag = function() { return {"teamA":6,"teamB":6,"teamC":0,"isFlagged":0}; }	
	this.getDefaultRecord = function() { return {"canMatch":true,"nextMatch":BOT.Utils.getGameTime().getTime(),"playCount":0,"flag":this.getDefaultFlag()} };
		
	this.gotoArenaPage = function() {
		unsafeWindow.BTO.menu.open({x:'Arena',y:'0',z:'1'}); 
	}
	
	this.switchInactives = function() {
		this.showInactives = !this.showInactives;
		this.gotoArenaPage();
	};		
		
	this.appendSwitchTo = function(target) {
		jQuery("<input>", { type:'checkbox',checked:this.showInactives,click: this.switchInactives.bind(this)}).appendTo(target);		
	};
	
	this.modifyHeaders = function(container) {
		var headers = [null, "Player", "Score", "Vitality", "Schedule"];
		
		headers.forEach(function(val, index) { 
			if (val) { container.cells[index].innerHTML = val; } 
		});					
	};
	
	this.isNotMy = function(user) {		
		return user.UserId != unsafeWindow.UserId;
	};

	this.getRecord = function(playerId) {
		return BOT.UI.data.arena[playerId] || this.getDefaultRecord();				
	};
		
	this.sortByTime = function(list) {
		list.sort(function(a, b) {
			if (!a.nextMatch || !b.nextMatch) return 0;
			var diff = a.nextMatch - b.nextMatch;
			return diff < 0 ? -1 : 1;
		});		
	}
	
	this.updateMatchList = function(data) {
		var list = data.map(function(val) { return jQuery.extend(this.getRecord(val.UserId), val); }.bind(this));
		this.sortByTime(list);
		
		this.matchListContainer.innerHTML = "";
		
		list.forEach(function(record, index) {
			if (!record.nextMatch || record.flag.isFlagged == 1) return;
			this.matchListContainer.innerHTML += "<li><p><a href=\"javascript:void(0);\" class=\"mygreen\" onclick=\"javascript:shortcuts.arena.attackPlayer(" + record.UserId + ");\">" + record.VUserName + "</a></p><div class=\"mydata\">" + BOT.Utils.toDateString(record.nextMatch) + "</div></li>";
		}.bind(this));
	}	
	
	this.updatePlayer = function(table, player, index) {
		var row = table.rows[this.rowIndex];			
		var flag = "";
		
		if (this.isNotMy(player)) {
			var record = this.getRecord(player.UserId);
			record.matchDates =record.matchDates || [];			
			record.playCount = record.matchDates.filter(function(date) { return date >= BOT.Utils.getYesterday(); }).length;
			record.todayPlayCount = record.matchDates.filter(function(date) { return date >= BOT.Utils.getToday();}).length;
			record.nextMatch = BOT.Utils.getGameTime().getTime();
			record.canMatch = true;
	
			if (record.playCount >= 3 || (record.playCount > 0 && record.todayPlayCount == 0)) {
				record.nextMatch = new Date(record.lastMatch).addDays(1).getTime();
				record.canMatch = false;
			}

			if ((!record.canMatch || record.flag.isFlagged == 1)  && !this.showInactives) { table.deleteRow(this.rowIndex); return; }

			row.cells[4].innerHTML = BOT.Utils.toDateString(record.nextMatch);

			var buttons = table.rows[this.rowIndex].cells[5].getElementsByTagName("button");
			if (buttons.length > 0) {
				var button = buttons[0];
				button.innerHTML = 'Played: ' + record.playCount;
				button.removeAttribute("disabled");
				button.disabled = false;
				button.enabled = true;
				button.setAttribute("onclick", "javascript:c.__OnSend('ajax_action.php?action=wonbto&doaction=Challenge&PlayUserId=" + player.UserId + "','',c.__func_comm_list,'Challenge');return false;");
			}
			
			flag = " <a href=\"javascript:void(0);\" style=\"color: " + (record.flag.isFlagged == 1 ? "red" : "green") + ";\" onclick=\"javascript:shortcuts.arena.showDialog(" + player.UserId + ", '" + player.VUserName + "');\">(" + record.flag.teamA + "-" + record.flag.teamB + "-" + record.flag.teamC + ")</a>";
		}
				
		row.cells[1].innerHTML = row.cells[2].innerHTML + flag;
		row.cells[2].setAttribute("class", "red");
		row.cells[2].innerHTML = player.WeekPoints;
		row.cells[3].setAttribute("class", (player.Physical < 20 ? 'tdbg1' : 'red'));
		row.cells[3].innerHTML = player.Physical;

		this.rowIndex++;		
	}
	
	this.updatePlayerList = function(confin) {
		if (confin.contents.o.doaction != "") { return; }
	
		var data = confin.contents;
		var rawTable = document.getElementById('thing3onealt');

		this.appendSwitchTo(rawTable.rows[1].getElementsByTagName('table')[0].rows[0].cells[1]);	
		this.modifyHeaders(rawTable.rows[2].getElementsByTagName('table')[0].rows[0]);		
		var table = rawTable.rows[2].getElementsByTagName('table')[1];

		this.rowIndex = 0;
		data.o.List.forEach(this.updatePlayer.bind(this, table));

		this.updateMatchList(data.o.List);	
	};	
	
	this.showDialog = function(playerId, playerName) {
		BOT.UI.showDialog("<table width=\"100%\" cellspacing=\"0\" class=\"tborder\">" + 
		"	<tbody>" + 
		"		<tr height=\"10\">" + 
		"			<td colspan=\"3\"></td>" + 
		"		</tr>" + 
		"		<tr>" + 
		"			<td width=\"20%\">Player:&nbsp;&nbsp;</td>" + 
		"			<td width=\"80%\" class=\"tdbg1\"><span class=\"yellow2\">" + playerName + "</span></td>" + 
		"		</tr>" + 
		"		<tr>" + 
		"			<td width=\"20%\">Strategy:&nbsp;&nbsp;</td>" + 
		"			<td width=\"80%\" colspan=\"2\" class=\"tdbg1\">" + 
		"				<div><span class=\"text_normal_out\"><span class=\"text_normal_in\"><input type=\"text\" value=\"\" id=\"playerA\"></span></span></div>" + 		
		"				<div><span class=\"text_normal_out\"><span class=\"text_normal_in\"><input type=\"text\" value=\"\" id=\"playerB\"></span></span></div>" + 		
		"				<div><span class=\"text_normal_out\"><span class=\"text_normal_in\"><input type=\"text\" value=\"\" id=\"playerC\"></span></span></div>" + 
		"			</td>" + 
		"		</tr>" + 
		"		<tr>" + 
		"			<td width=\"20%\">Flag:&nbsp;&nbsp;</td>" + 
		"			<td width=\"80%\" colspan=\"2\" class=\"tdbg1\">" + 
		"				<input type=\"radio\" name=\"flag\" id=\"flagFree\" checked=\"checked\" value=\"0\" /> <label for=\"flagFree\">Attack When Available</label> &nbsp;&nbsp;" + 
		"				<input type=\"radio\" name=\"flag\" id=\"flagDont\" value=\"1\" /> <label for=\"flagDont\">Don't Attact</label>" + 
		"			</td>" + 
		"		</tr>" + 		
		"		<tr>" + 
		"			<td align=\"right\" colspan=\"3\">" + 
		"				<span class=\"btn_normal\"><button onclick=\"javascript:shortcuts.arenaIndexer.flagPlayer(" + playerId + ", '" + playerName + "', document.getElementById('playerA').value, document.getElementById('playerB').value, document.getElementById('playerC').value, document.getElementById('flagFree').checked ? 0 : 1);shortcuts.hideDialog();\">Flag</button></span>" + 
		"				<span class=\"btn_normal\"><button onclick=\"javascript:shortcuts.hideDialog();\">Close</button></span>" + 
		"			</td>" + 
		"		</tr>" + 
		"	</tbody>" + 
		"</table>");
	};				
}
BOT.AutoPilot = function() {
	this.wearHonorMedal = function(id) {
		BOT.UI.comm.enqueue('ajax_action.php?action=charagoodsMedal&toolsid=219', null, this.taskFinished.bind(this, id));
	};

	this.doSecretaryTasks = function(id) {
		this.jobQueue = new BOT.JobQueue({
			url:"ajax_action.php?action=assistTake&actGet=seryJobAction&tid=2&jaction=jobxms&doaction=", 
			tasks:["think", "gazette", "patrol", "communicate", "analyse", "negotiate", "evection", "meeting", "think", "gazette"],
			interval:60000,
			onFinish: this.taskFinished.bind(this, id)
		});		
		this.jobQueue.start();
	};
		
	this.employeeIndex = function(id) {
		if (!this.employeeIndexer) {
			this.employeeIndexer = new BOT.EmployeeIndexer({noAttire:true,onFinished:this.taskFinished.bind(this, id)});
		}
		  
		this.employeeIndexer.indexAll();
	};
		
	this.employeeMeeting = function(id) {
		BOT.UI.comm.enqueue('ajax_action.php?action=assistTake&actGet=otherJobAction&tid=1&jaction=thingjob&doaction=Meeting&MoodId=3&State=0', null, this.taskFinished.bind(this, id));
	};
	
	this.employeeTraining = function(id) {
		BOT.EmployeeManagement.train(this.taskFinished.bind(this, id));		
	}
	
	this.employeeCommunication = function(count, id) {	
		var func = function(employees) {
			this.jobQueue = new BOT.JobQueue({
				url:"ajax_action.php?action=employeecommunicate&doaction=communicateExec&communicateId=1&EmployeeId=", 
				tasks:employees,
				interval:180000,
				onFinish: this.taskFinished.bind(this)
			});		
			
			this.jobQueue.start();
		};			
		
		BOT.EmployeeManagement.findCommunicatableEmployees(0, func.bind(this));
	}

	this.employeeRoutines = function(settings, id) {
		settings = settings || {};
		settings.id = id;
		settings.rule = settings.rule || function() { return true; };		
	
		this.employeeQueue = BOT.EmployeeManagement.findUnmaxedEmployees();
		this.employeeIndex = -1;
		this.employeeRoutinesNext(settings);		
	}
	
	this.employeeRoutinesNext = function(settings) {
		this.employeeIndex++;
		if (this.employeeIndex >= this.employeeQueue.length || !settings.rule(["90"])) {
			this.taskFinished(settings.id);
			return;
		}
		
		var id = this.employeeQueue[this.employeeIndex];
		BOT.EmployeeManagement.doFirstAvailableRoutine(settings, id, function(settings, task, id) {
			if (!task) { this.employeeRoutinesNext(settings); return; }
			setTimeout(BOT.EmployeeManagement.distributePoints.bind(BOT.EmployeeManagement, id, BOT.UI.employeeIndexer.indexSingle.bind(BOT.UI.employeeIndexer, id, this.employeeRoutines.bind(this, settings))), (parseInt(task.task[0]) + 5) * 1000)
		}.bind(this, settings));						
	};
	
	this.inspectCompany = function(id) { 
		BOT.UI.comm.enqueue('ajax_action.php?action=assistTake&actGet=otherJobAction&tid=1&jaction=jobconst&doaction=patrol', null, this.taskFinished.bind(this, id));
	};
	
	this.performanceReport = function(id) {
		BOT.UI.comm.enqueue("task.php?action=assistTake&murl=wmoJobAction&tid=1&jaction=Agent&doaction=BoardReport", null, this.taskFinished.bind(this, id), null, true);		
	}
	
	this.storeOperations = function(id) {
		BOT.Stores.closeAllStores.bind(BOT.Stores,
		BOT.Stores.openAllStores.bind(BOT.Stores,
		BOT.Stores.stockAllStores.bind(BOT.Stores, 36,
		BOT.Stores.cleanAllStores.bind(BOT.Stores, 		
		this.taskFinished.bind(this, id)))))();
	};	
		
	this.wearBellMedal = function(id) {
		BOT.UI.comm.enqueue('ajax_action.php?action=charagoodsMedal&toolsid=242','', this.taskFinished.bind(this, id),'charagoods');
	};
	
	this.taskFinished = function(task) {
		BOT.UI.taskScheduler.finished(task);
	};

	this.morningRoutines = function(id) {
		var date = BOT.Utils.getGameTime();
		date.setHours(8); date.setMinutes(00); date.setSeconds(0);
		this.routineWorker = new BOT.AutoRoutines({majorsOnly:true,deadline:date,onFinished:this.taskFinished.bind(this, id)});
		this.routineWorker.start();
	};

	this.noonRoutines = function(id) {
		var date = BOT.Utils.getGameTime();
		date.setHours(14); date.setMinutes(00); date.setSeconds(0);
		this.routineWorker = new BOT.AutoRoutines({minorsOnly:true,deadline:date,onFinished:this.taskFinished.bind(this, id)});
		this.routineWorker.start();
	};

	this.afterNoonRoutines = function(id) {
		var date = BOT.Utils.getGameTime();
		date.setHours(17); date.setMinutes(00); date.setSeconds(0);
		this.routineWorker = new BOT.AutoRoutines({minorsOnly:true,deadline:date,onFinished:this.taskFinished.bind(this, id)});
		this.routineWorker.start();
	};	
	
	this.eveningRoutines = function(id) {
		var date = BOT.Utils.getGameTime();
		date.setHours(23); date.setMinutes(59); date.setSeconds(0);
		this.routineWorker = new BOT.AutoRoutines({minorsOnly:true,deadline:date,onFinished:this.taskFinished.bind(this, id)});
		this.routineWorker.start();
	};
	
	this.employeeTaskDeadlineRule = function(hour, min, task) {		
		var finishTime =  BOT.Utils.getGameTime();
		finishTime.setSeconds(finishTime.getSeconds() + parseInt(task[0]));

		var deadline = BOT.Utils.getGameTime();
		deadline.setHours(hour);
		deadline.setMinutes(min);
		deadline.setSeconds(0);
		
		return finishTime < deadline;
	};
	
	this.doNpc = function(id) {
		BOT.UI.city.npc(BOT.UI.settings.npc, this.taskFinished.bind(this, id));
	}

	this.horseTraining = function(id) {
		BOT.UI.comm.enqueue("ajax_action.php?action=Horses&modact=HorsesTeam&doaction=SingleTrainingOk&TrainingId=" + BOT.UI.settings.horse.toString() + "&TrainingLevel=3",'', this.taskFinished.bind(this, id));	
	}
		
	this.start = function() {				
		BOT.UI.taskScheduler.add("Routines", new BOT.TimeSchedule(00,01, this.morningRoutines.bind(this)));			
		BOT.UI.taskScheduler.add("NPC Negotiation", new BOT.TimeSchedule(00,05, this.doNpc.bind(this)));
		BOT.UI.taskScheduler.add("Horse Training", new BOT.TimeSchedule(00,10, this.horseTraining.bind(this)));
		BOT.UI.taskScheduler.add("NPC Negotiation", new BOT.TimeSchedule(02,05, this.doNpc.bind(this)));
		BOT.UI.taskScheduler.add("Horse Training", new BOT.TimeSchedule(02,10, this.horseTraining.bind(this)));		
		BOT.UI.taskScheduler.add("NPC Negotiation", new BOT.TimeSchedule(04,05, this.doNpc.bind(this)));
		BOT.UI.taskScheduler.add("Horse Training", new BOT.TimeSchedule(04,10, this.horseTraining.bind(this)));
		BOT.UI.taskScheduler.add("Horse Training", new BOT.TimeSchedule(06,10, this.horseTraining.bind(this)));		
		BOT.UI.taskScheduler.add("Training", new BOT.TimeSchedule(8,00, this.employeeTraining.bind(this)));
		BOT.UI.taskScheduler.add("Horse Training", new BOT.TimeSchedule(08,10, this.horseTraining.bind(this)));		
		BOT.UI.taskScheduler.add("Honor Medal", new BOT.TimeSchedule(8,45, this.wearHonorMedal.bind(this)));
		BOT.UI.taskScheduler.add("Store Operations", new BOT.TimeSchedule(8,46, this.storeOperations.bind(this)));	
		BOT.UI.taskScheduler.add("Meeting", new BOT.TimeSchedule(9,01, this.employeeMeeting.bind(this)));
		BOT.UI.taskScheduler.add("Communication", new BOT.TimeSchedule(9,06, this.employeeCommunication.bind(this, 3)));	
		BOT.UI.taskScheduler.add("Inspect", new BOT.TimeSchedule(9,10, this.inspectCompany.bind(this)));	
		BOT.UI.taskScheduler.add("Perf.Report", new BOT.TimeSchedule(9,20, this.performanceReport.bind(this)));
		BOT.UI.taskScheduler.add("Bell Medal", new BOT.TimeSchedule(9,45, this.wearBellMedal.bind(this)));
		BOT.UI.taskScheduler.add("Routines", new BOT.TimeSchedule(9,46, this.noonRoutines.bind(this)));
		BOT.UI.taskScheduler.add("Horse Training", new BOT.TimeSchedule(10,10, this.horseTraining.bind(this)));
		BOT.UI.taskScheduler.add("Horse Training", new BOT.TimeSchedule(12,10, this.horseTraining.bind(this)));				
		BOT.UI.taskScheduler.add("Refresh Index", new BOT.TimeSchedule(13,50, this.employeeIndex.bind(this)));		
		BOT.UI.taskScheduler.add("Emp. Routine", new BOT.TimeSchedule(14,00, this.employeeRoutines.bind(this, {rule: this.employeeTaskDeadlineRule.bind(this, 17,00)})));	
		BOT.UI.taskScheduler.add("Communication", new BOT.TimeSchedule(14,01, this.employeeCommunication.bind(this)));			
		BOT.UI.taskScheduler.add("Routines", new BOT.TimeSchedule(14,10, this.afterNoonRoutines.bind(this)));	
		BOT.UI.taskScheduler.add("Horse Training", new BOT.TimeSchedule(14,15, this.horseTraining.bind(this)));
		BOT.UI.taskScheduler.add("Horse Training", new BOT.TimeSchedule(16,15, this.horseTraining.bind(this)));				
		BOT.UI.taskScheduler.add("Meeting", new BOT.TimeSchedule(17,10, this.employeeMeeting.bind(this)));
		BOT.UI.taskScheduler.add("Training", new BOT.TimeSchedule(17,20, this.employeeTraining.bind(this)));
		BOT.UI.taskScheduler.add("Refresh Index", new BOT.TimeSchedule(18,15, this.employeeIndex.bind(this)));
		BOT.UI.taskScheduler.add("Horse Training", new BOT.TimeSchedule(18,10, this.horseTraining.bind(this)));				
		BOT.UI.taskScheduler.add("Emp. Routine", new BOT.TimeSchedule(18,25, this.employeeRoutines.bind(this, {rule: this.employeeTaskDeadlineRule.bind(this, 23,59)})));
		BOT.UI.taskScheduler.add("Routines", new BOT.TimeSchedule(18,30, this.eveningRoutines.bind(this)));		
	};
};
BOT.AutoRoutines = function(settings) {
	this.settings = settings || {};
	
	this.onFinished = this.settings.onFinished || function() {};
	this.onTaskExecuted = this.settings.onTaskExecuted || function() {};
	
	this.start = function(settings) {
		this.isWorking = true;		
		BOT.Utils.merge(this.settings, settings);
		
		if (this.settings.executionPlan) {
			this.executionPlan = this.settings.executionPlan;
		} else if (this.settings.majorsOnly) {
			this.executionPlan = ["analyse", "evection", "negotiate", "rest"];
		} else {
			this.executionPlan = ["think", "gazette", "patrol", "communicate", "rest"];
		};
		
		BOT.UI.comm.enqueue('ajax_action.php?action=jobconst', null, this.getRoutineList.bind(this));
	};
	
	this.stop = function() {
		if (this.jobTimer) {
			window.clearTimeout(this.jobTimer);
			this.jobTimer = null;
		}
		
		this.isWorking = false;
		this.onFinished();
	};
	
	this.getRoutineList = function(data) {
		this.routines = [];
		for(var key in this.executionPlan)
		{
			var routine = this.executionPlan[key];
			var elem = data.o[routine];			
			elem.task = routine;
			if (routine != "think" && routine != "gazette" && routine != "rest") {
				elem.duration = parseInt(elem[1]) * ((100 - BOT.UI.settings.car.routineDuration) / 100);
				elem.recharge = parseInt(elem[0]) * ((100 - BOT.UI.settings.car.routineRecharge) / 100);
			} else {
				elem.duration = parseInt(elem[1]);
				elem.recharge = parseInt(elem[0]);
			}			
			this.routines.push(elem);
		}			
		
		this.routines.sort(function(x, y) { return x.duration - y.duration; });
		
		this.executeNextJob();
	};
			
	this.executeNextJob = function() {
		if (!this.isWorking) { return; }	
		if (this.settings.deadline && BOT.Utils.getGameTime() > this.settings.deadline) { this.stop(); return; }
		if (this.jobTimer != null) { clearTimeout(this.jobTimer); }		
		
		BOT.UI.comm.enqueue('ajax_action.php?action=jobconst', null, this.findTask.bind(this));
	};
	
	this.findTask = function(data) {
		if (!this.isWorking) { return; }	
		
		if (data.doState == 1) {
			this.waitForTask(data);
			return;
		}; 
									
		for(var i = 0; i < this.routines.length; i++) {
			if (data.o[this.routines[i].task].stat == 0 && BOT.UI.settings.fatigue > data.all.TiredDegrees + parseInt(data.o[this.routines[i].task].TiredDegrees)) {
				if (this.settings.deadline) {
					var date = BOT.Utils.getGameTime();
					date.setTime(date.getTime() + (this.routines[i].duration * 1000));
											
					if (date > this.settings.deadline) { this.stop(); return; }
				}
				
				BOT.UI.comm.enqueue('ajax_action.php?action=jobxms', null, this.checkSecretary.bind(this, this.routines[i].task));		
				return;
			}
		}	

		setTimeout(this.executeNextJob.bind(this), 300000);
	};
	
	this.checkSecretary = function(job, data) {
		if(data.o[0].LimitNum <= data.o[0].allCount || !data.list[job]) {
			this.doJob(job);
			return;
		}
		
		if (data.list[job].Count >= parseInt(data.list[job][1])) {
			this.doJob(job);
			return;
		}
		
		BOT.UI.comm.enqueue('ajax_action.php?action=assistTake&actGet=seryJobAction&tid=2&jaction=jobxms&doaction=' + job, null, this.doJob.bind(this, job));
	};
					
	this.doJob = function(job) {
		BOT.UI.comm.enqueue('ajax_action.php?action=assistTake&actGet=otherJobAction&tid=1&jaction=jobconst&doaction=' + job,  null, this.afterJobExecuted.bind(this, job));		
	};
	
	this.afterJobExecuted = function(job) {	
		this.onTaskExecuted(job);
		BOT.UI.comm.enqueue('ajax_action.php?action=jobconst', null, this.waitForTask.bind(this));		
	};
	
	this.waitForTask = function(data) {
		if (!data || !data.o) {
			setTimeout(this.executeNextJob.bind(this), 300000);
			return;
		}
		
		for(var key in data.o) {
			if (data.o[key].stat == 1) {
				this.jobTimer = setTimeout(this.executeNextJob.bind(this), (data.o[key].ShowStartTime * 1000) - new Date().getTime() + 5000);
				return;
			}
		};	
		
		setTimeout(this.executeNextJob.bind(this), 300000);
	}
};
BOT.City = function() {

	this.npc = function(id, onFinished) {	
		var func = function(data) {			
			var count = parseInt(data.empLimit);			
			if (data.o.length < count) {
				BOT.UI.setStatus("Cannot send employees. You need " + count + " employees but only have " + data.o.length + ".");
				return;
			}

			var employees = data.o.slice(0, count).map(function(emp) { return emp.Id; }).join(',') + ',';
			BOT.UI.comm.enqueue('ajax_action.php?action=NPClandStorm_SendEmployees&landStormId=' + id + '&allEmployeeId=' + employees, null, onFinished || function() {});
		};
		
		BOT.UI.comm.enqueue('ajax_action.php?action=NPClandStorm_AssignEmployee&landStormId=' + id + '&order=3&teamId=', null, func.bind(this));
	},
	
	this.startNpc = function(id) {
		this.npcInterval = setInterval(this.npc.bind(this, id), 320000);
		this.npc(id);
	},
	
	this.stopNpc = function() {
		clearInterval(this.npcInterval);
	}
}
BOT.Communication = function(serverValues) {
	this.queue = [];
	this.serverValues = serverValues;
	this.isBusy = false;
	this.xmlHttp = new XMLHttpRequest();
	
	this.ajax = function(url, data, success, failure) {
		var nowtime	= new Date().getTime();			
		url	+= (url.indexOf("?") >= 0 ? "&" : "?") + "tthetime=" + this.serverValues.thetime + "&nowtime=" +  nowtime; 

		try
		{
			if(typeof(data) == 'string'){
				this.xmlHttp.open('POST' , url, true);
				this.xmlHttp.setRequestHeader("Content-Length", data.length);
				this.xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				this.xmlHttp.setRequestHeader("Connection", "Keep-Alive");
				this.xmlHttp.onreadystatechange = this.ajaxCallback.bind(this, success, failure);
				this.xmlHttp.send(data);
			} else {
				this.xmlHttp.open("GET",url,true);
				this.xmlHttp.setRequestHeader("Content-Type", "text/html;charset=" +  this.serverValues.charset);
				this.xmlHttp.onreadystatechange = this.ajaxCallback.bind(this, success, failure);
				this.xmlHttp.send(null);
			}
		}
		catch (err)
		{
			GM_log(err);
			if (failure) failure(err);
			this.next();
		}	
	};
	
	this.ajaxCallback = function(success, failure) {
		if (this.xmlHttp.readyState != 4)  { return false; }

		if (this.xmlHttp.status == 200 || this.xmlHttp.status == 304){
			if (this.timeoutTimer != null) {
				clearTimeout(this.timeoutTimer);
				this.timeoutTimer = null;	
			}		
			
			try {
				success(this.unserialize(this.xmlHttp.responseText));
			} catch (err) {
				GM_log(err);
				if (failure) failure(err)
			}
		} else {
			var err = "Error loading page\n" + this.xmlHttp.status + ":" + this.xmlHttp.statusText;
			GM_log(err);
			if (failure) failure(err);
		}	
		
		this.next();
	};
	
	this.send = function(url, data, success, failure)  {
		url += (url.indexOf("?") >= 0 ? "&" : "?") + 'tthetime=' +  this.serverValues.thetime + '&d=' + Date() + '&UserAssetsPin=' +  this.serverValues.userAssetPin
		try
		{
			this.xmlHttp.open("GET", url, true);
			this.xmlHttp.setRequestHeader("Content-Type", "text/xml;charset=" +  this.serverValues.charset);
			this.xmlHttp.onreadystatechange = this.ajaxCallback.bind(this, success, failure);
			this.xmlHttp.send(data);
		}
		catch (err)
		{
			GM_log(err);
			if (failure) failure(err);
			this.next();
		}			
	};
	
	this.unserialize = function(raw) {
		if(raw.indexOf('@@@') == -1) { return raw; }
		var data = raw.split('@@@');
		var statusCode = parseInt(data[0].replace(/[^\d]*/ig, ''));
		var dataset = data[1].split('/*###*/');

		var response = dataset[0];
		for(var index in dataset) {
			if(dataset[index].substring(0,3) != 'var') {
				response = new unsafeWindow.unserialize(dataset[index]) || response;
			} 
		}	

		if (statusCode == 10) {
			GM_log("Redirect received")
		} else if (statusCode > 0) {
			BOT.UI.setStatus(response);
		}
	
		return response;		
	};
			
	this.enqueue = function(url, data, success, failure, isQuery) {		
		this.queue.push((isQuery ? this.send : this.ajax).bind(this, url, data, success, failure));
		
		if (!this.isBusy) {
			this.dequeue();
		}
	};
	
	this.dequeue = function() {
		this.isBusy = true;
		
		if (this.queue.length == 0) {
			this.isBusy = false;
			return;
		}
		
		try {
			this.queue[0]();	
		} catch(err) {
			GM_log(err);			
			this.next();
			return;
		}
		
		this.timeoutTimer = setTimeout(this.timeout.bind(this), 30000);	
	};
	
	this.next = function() {
		if(this.queue.length > 0) this.queue.shift();
		setTimeout(this.dequeue.bind(this), 1500);
	};
	
	this.timeout = function() {
		this.dequeue();
	}	
}

BOT.EmployeeIndexer = function(settings) {
	this.settings = settings || {};

	this.onFinished = settings.onFinished || function() {};	
	this.noAttire = settings.noAttire;

	this.mySkill = BOT.UI.settings.mySkill;
	this.skillBonuses = [0, 5, 10, 25, 50 ,75];
	this.talentBonuses = [0, 5, 10, 20, 50];
	this.talentLevel = {"0":0,"Junior":1,"Intermediate":2,"Expert":3,"Master":4};
	
	this.getEmployeeList = function(data) { return data.o; };
	this.canGoNextPage = function(data) { if (data && data.showpage) { return data.showpage.indexOf("next.gif") > -1; }; return false; };
	
	this.openDatabase = function() {
		BOT.UI.data.employees = {};
		BOT.UI.data.maxedEmployees = [];
		
		if (!this.noAttire) { BOT.UI.data.attires = []; }
	}
	
	this.saveDatabase = function() {
		BOT.UI.storage.set("employees", BOT.UI.data.employees);
		BOT.UI.storage.set("maxedEmployees", BOT.UI.data.maxedEmployees);
		BOT.UI.storage.set("attires", BOT.UI.data.attires);
	}
	
	this.indexAll = function() {		
		this.openDatabase();
		
		var employeeListUrl = 'ajax_action.php?action=thing3&nameOrder=0&jobOrder=0&powerOrder=0&Assign=0&FealtyOrder=0&salaryOrder=0&MyShopId=0&ContractOrder=0&page={page}';		
		this.lister = new BOT.PagedList(employeeListUrl, this.gotEmployee.bind(this), this.indexFinished.bind(this), this.getEmployeeList, this.canGoNextPage);
		this.lister.start();	
	};
	
	this.indexFinished = function() {
		this.saveDatabase();
		this.onFinished();		
	};

	this.gotEmployee = function(item) {	
		if (item.Tkillmy > 0 && !this.noAttire) {
			this.indexSingle(item.Id, this.lister.getNextItem.bind(this, true));
		}
		else {
			this.insertEmployee(item);
			this.lister.getNextItem(true);
		}			
	};	
	
	this.indexSingle = function(id, onFinish) {
		BOT.UI.comm.enqueue('ajax_action.php?action=thing3one&EmployeeId=' + id + '&page=1&searcEmp=', null, this.gotEmployeeDetails.bind(this, onFinish));
	};
	
	this.gotEmployeeDetails = function(onFinish, data) {
		this.insertEmployee(data.o[0]);
		this.getAttires(data.nowFashion, data.EmployeeId);		
		this.saveDatabase();
		onFinish();
	};

	this.insertEmployee = function(item) {
		if (!item) return;		
		if (!item.SkillMaster) { item.SkillMaster = []; }
		
		var talentLevel = this.talentLevel[item.DowerLevel];
		var skillLevel = item.SkillMaster.sort(function(a,b){return b-a})[0];
		var skills = item.SkillMaster.reduce(function(obj, val, index) { obj[index]= parseInt(val) || 0; return obj; }, {})		
		var employee = {
						"attireRev":0,"attireExe":0,"attireMan":0,"attireConf":0,"attireAcumen":0,"attireMastery":0
						,"name":item.Name,"id":item.Id,"skillLevel":skillLevel
						,"talentName":item.DowerName,"talentLevel":talentLevel,"skills": skills
						,"exec":item.Exec, "execCap":item.ExecUpLimit 
						,"man":item.Admin, "manCap":item.AdminUpLimit
						,"ability":item.Power, "bonus":this.skillBonuses[skills[this.mySkill]] + this.talentBonuses[talentLevel]
						,"shopId":item.ShopId, "isManager":(item.advance == 1 ? 1 : 0)					
					   };			
		
		employee.remaining = employee.execCap + employee.manCap - employee.exec - employee.man;				
		employee.isMaxed = employee.remaining <= 0;		
		if (item.myFashionVal && item.myFashionVal.length > 0) {
			for(var key in item.myFashionVal) {
				var attire = item.myFashionVal[key];
				if (attire.mgVal > 0) employee.manBonus += attire.mgVal;
				if (attire.singleBonus > 0) employee.revBonus += attire.singleBonus;
				if (attire.faVal > 0) employee.confBonus += attire.faVal;
				if (attire.inVal > 0) employee.acumen += attire.inVal;
				if (attire.atVal > 0) employee.mastery += attire.atVal;
				if (attire.doVal > 0) employee.exeBonus += attire.doVal;
			}
		}
		
		BOT.UI.data.employees[item.Id] = employee;
		if (!employee.isMaxed) { BOT.UI.data.maxedEmployees.push(employee); }
	};	
	
	this.getAttires = function(attireTypes, employeeId) {
		if (!attireTypes) return;
		
		for (var type in attireTypes) {
			if (!attireTypes[type] || !attireTypes[type].id) { continue; }			
			attires.push({"id":parseInt(attireTypes[type].id),"text":attireTypes[type].hint, "employeeId":employeeId});
		}
	};	
}
BOT.EmployeeManagement = {
	findUnmaxedEmployees: function() {			
		BOT.UI.data.maxedEmployees.sort(function(a, b) { return b.skillLevel != a.skillLevel ? b.skillLevel - a.skillLevel :  a.remaining - b.remaining; });
		return BOT.UI.data.maxedEmployees.map(function(employee) { return employee.id; });
	},
	
	train: function(callback) {
		var url = 'ajax_action.php?action=assistTake&actGet=mwoJobAction&tid=1&jaction=thing3&doaction=EmployeeFoster&foster=6&jobone=undefined';
		BOT.UI.comm.enqueue(url, "pEmpId=" + this.findUnmaxedEmployees().join(','), callback);	
	},
	
	getFirstAvailableRoutine: function(settings, id, callback) {				
		var func = function(data) {  		
			var available = data.o.LimitNum - data.o[0].allCount;		
			if (available < 1) { callback(null, id); return; }
						
			for(var key in data.list) {
				var task = data.list[key];
				if (task.stat == 0 && task.useLimitStat == 0 && task.Count < parseInt(task[2]) && settings.rule(task)) {					
					callback({"name":key, "task":task}, id);
					return;
				}
			}
			
			callback(null, id);
		};
		BOT.UI.comm.enqueue('ajax_action.php?action=employeejob&EmployeeId=' + id, null, func.bind(this));			
	},
	
	doFirstAvailableRoutine: function(settings, id, callback) {
		var func = function(task) {	
			if (!task) { callback(null, id); return; }
			this.doRoutine(id, task.name, callback.bind(this, task, id));
		};
		this.getFirstAvailableRoutine(settings, id, func.bind(this));
	},
	
	doRoutine: function(id, task, callback) {
		BOT.UI.comm.enqueue('ajax_action.php?action=assistTake&actGet=emplJobAction&tid=3&jaction=employeejob&doaction=' + task + '&EmployeeId=' + id, null, callback);	
	},
	
	distributePoints: function(id, callback) {
		var func = function(data) {
			var employee = BOT.UI.data.employees[id];
			var points = Math.min([employee.execCap - employee.exec,employee.manCap - employee.man][Number(employee.exec < employee.execCap)], data.EmployeeInfo.info.prizegiving);
			var type = [1,2][Number(employee.exec < employee.execCap)];

			if (points == 0) {
				callback();
				return;
			}
			
			BOT.UI.comm.enqueue('ajax_action.php?action=Donebatchemp&batch_type=' + type + '&EmployeeId=' + id, "emppoint=" +  points, callback);
		};
				
		BOT.UI.comm.enqueue('ajax_action.php?action=thing3one&EmployeeId=' + id + '&page=1&searcEmp=', null, func.bind(this));	
	},

	findCommunicatableEmployees: function(count, callback) {
		var func = function(data) {
			if (!count || count < 1) { count = data.allCount; };			
			
			var employees = data.EmployeeList
								.filter(function(employee) { return (employee.ExecUpLimit + employee.AdminUpLimit - employee.Exec - employee.Admin)})
								.slice(0, count)
								.map(function(val) { return val.Id; })
			callback(employees);
		};
		BOT.UI.comm.enqueue('ajax_action.php?action=empshowfullgoutong&order=1&teamId=null', null, func.bind(this));
	}	
};
BOT.JobQueue = function (settings) {	
	this.interval = settings.interval;		
	this.isRepeating = settings.isRepeating;
	this.repeatingInterval = settings.repeatingInterval;	
	this.executionPlan = settings.tasks;	
	
	this.url = settings.url;
	this.data = settings.data;
	
	this.onStart = settings.onStart || function() {};
	this.onStop = settings.onStop || function() {};
	this.onFinish = settings.onFinish || function() {};
	this.onJobExecuted = settings.onJobExecuted || function() {};
	
	this.start = function() {	
		this.isWorking = true;			
		this.lastJob = -1;
		
		this.onStart();
		this.executeNextJob();		
	};
	
	this.stop = function() {
		if (this.jobTimer) {
			clearTimeout(this.jobTimer);
			this.jobTimer = null;
			this.jobDate = null;
		}
		
		this.isWorking = false;
		this.onStop();
	};
	
	this.executeNextJob = function() {	
		if (!this.isWorking) return;
		
		if (!this.executionPlan || this.lastJob + 1 >= this.executionPlan.length) {			
			this.finished();
			return;
		}
		
		this.lastJob++;
		var currentJob = this.executionPlan[this.lastJob];		
		
		BOT.UI.comm.enqueue(this.url + currentJob, null, this.afterJobExecuted.bind(this), this.data);
	};

	this.afterJobExecuted = function() {
		if (this.interval) {
			this.jobTimer = setTimeout(this.executeNextJob.bind(this), this.interval);			
			this.jobDate = new Date(new Date().getTime() + this.interval);					
		}
		
		if(this.onJobExecuted) { 
			this.onJobExecuted();
		}
	};
	
	this.finished = function() {
		this.stop();
		
		if (this.isRepeating) {
			this.jobTimer = setTimeout(this.start.bind(this), this.repeatingInterval);			
			this.jobDate = new Date(new Date().getTime() + this.repeatingInterval);									
		}
		
		this.onFinish();
	};	
};
BOT.PagedList = function(url, callback, onFinished, getList, canGoNextPage, comm) {	
	this.getPage = function() {
		this.dataArray = [];		
		this.currentIndex = 0;
		this.comm.enqueue(this.url.replace("{page}", this.currentPage), null, this.gotPage.bind(this));	
	};
	
	this.gotPage = function(data) {
		var list = this.getList(data);
		for(var key in list) {
			if (parseInt(key) > -1) { this.dataArray.push(list[key]); }
		}		
		this.hasNextPage = this.canGoNextPage(data);
		
		this.getPageInfo();
	};
			
	this.getPageInfo = function() {
		if (this.currentIndex >= this.dataArray.length || this.dataArray[this.currentIndex] == null) {
			this.getNextItem(true);
			return;
		}
		
		try {
			this.callback(this.dataArray[this.currentIndex]);
		} catch(err) {
			GM_log(err);
			this.getNextItem();
		}
		
	};	
	
	this.getNextItem = function() {
		this.currentIndex++;
		
		if (this.currentIndex >= this.dataArray.length) {			
			this.gotoNextPage();
			return;
		}		
		
		this.getPageInfo();					
	}
	
	this.gotoNextPage = function() {		
		if (this.hasNextPage) {
			this.currentPage++;	
			this.getPage();		
			
			return;
		}
		
		this.onFinished();
	};
	
	this.start = function() {
		this.getPage();
	}
	
	this.url = url;
	this.callback = callback;
	this.currentPage = 1;	
	this.currentIndex = 0;
	this.onFinished = onFinished;
	
	this.comm = comm || BOT.UI.comm;
	this.getList = getList || [];
	this.canGoNextPage = canGoNextPage || false;	
}

BOT.Panel = function(menu) { 
	this.createContainer = function() {
		this.panel = document.getElementById("gameBanner");
		this.panel.innerHTML = "<div style=\"float:right;color:#FFF695; font-weight:bold;max-width: 500px; overflow: hidden; height: 2em;\">Last Message: <span id=\"botStatus\" style=\"font-weight: normal; font-size: 11px;\"></span></div>";
	};
	
	this.addMenuItem = function(settings) {
		if(!settings) return;
		
		var elem = document.createElement("LI");
		elem.setAttribute("class", "bnnrlist");
		if (settings.action) { elem.addEventListener("click", settings.action, true); }
		elem.innerHTML = "<a class=\"normal\" href=\"javascript:void(0)\">" + settings.caption + "</a>";
		
		var seperator = document.createElement("LI");
		seperator.setAttribute("class", "bnnrlist myline");
		seperator.innerHTML = "|";
		
		if (settings.subMenus) {
			elem.subMenu = this.addSubMenu(elem, settings.subMenus);
		}
		
		this.panel.appendChild(elem);
		this.panel.appendChild(seperator);
		
		return elem;
	};
	
	this.addSubMenu = function(elem, subMenus) {
		elem.setAttribute("class", "bnnrlist events");
		unsafeWindow.$j(elem).hover(function(){unsafeWindow.$j(this).addClass("hover");},function(){unsafeWindow.$j(this).removeClass("hover");});
		
		var menu = document.createElement("UL");
		menu.setAttribute("class", "eventsList");
		for(var i=0; i < subMenus.length; i++) {
			this.addItem(subMenus[i], menu);
		}
		elem.appendChild(menu);	
		
		return menu;
	};
	
	this.addItem = function(settings, menu) {
		var menuElem = document.createElement("LI");			
		var link = document.createElement("A");			
		link.setAttribute("class", "mygreen");
		link.setAttribute("href", "javascript:void(0)");
		link.innerHTML = settings.caption;
		if (settings.action) { link.addEventListener("click", settings.action, true); }
		var cont = document.createElement("P");
		cont.appendChild(link);	
		menuElem.appendChild(cont);		
		
		if (settings.data) {
			var data = document.createElement("DIV");
			data.innerHTML = settings.data;
			data.setAttribute("class", "mydata");
			menuElem.appendChild(data);
		}
		
		menu.appendChild(menuElem);	
		
		return menuElem;
	};
	
	this.createContainer();
};

BOT.Shortcuts = function(shortcuts) {
	this.create = function(obj, methods) {
		for(var index in methods) {					
			if (!!obj) {
				if (!BOT.UI[obj]) { continue; }			
				if (!unsafeWindow.shortcuts[obj]) { unsafeWindow.shortcuts[obj] = {}; }			
				unsafeWindow.shortcuts[obj][methods[index]] = BOT.UI[obj][methods[index]].bind(BOT.UI[obj]);			
			} else {
				unsafeWindow.shortcuts[methods[index]] = BOT.UI[methods[index]].bind(BOT.UI);			
			}				
		}		
	}
	
	unsafeWindow.shortcuts = {};
	if (!shortcuts) { return; }
	
	for(var key in shortcuts) {
		this.create(key, shortcuts[key]);
	}	
}



BOT.Storage = function() {
	this.get = function(key, defaultValue) {
		return JSON.parse(window.localStorage.getItem(key)) || defaultValue;		
	}
	
	this.set = function(key, value) {
		window.localStorage.setItem(key, JSON.stringify(value));
	}
};


/*
 * 	if (!unsafeWindow.google) unsafeWindow.google= {};
	if (!unsafeWindow.google.gears) {
		unsafeWindow.google.gears= {factory: new GearsFactory()};
		try {
			this.storage = unsafeWindow.google.gears.factory.create('beta.database');
			this.storage.open('database-beta');	
		} catch(e) {}
	}

	this.execute = function(command, args) {
		return this.storage.execute(command, args);
	};
	
	this.getScalar = function(query, values) {
		var rs = this.storage.execute(query, values);
		var result = rs.field(0);
		rs.close();
	
		return result;
	};	
 */
BOT.Stores = {
	listFunc: function(data) { return data.o; },
	pageFunc: function(data) { return data.showpage && data.showpage.indexOf("next.gif") > 0; },
	
	stockAllStores: function(maxStock, callback) {
		this.stockLister = new BOT.PagedList('ajax_action.php?action=thing2&StoreOrder=1&page={page}', this.stockStore.bind(this, maxStock), callback, this.listFunc, this.pageFunc);
		this.stockLister.start();		
	},
	
	stockStore: function(maxStock, store) {
		if (store.getStore <= maxStock) {
			this.purchase(store.ShopId, 3, 3, this.stockLister.getNextItem.bind(this.stockLister));
			return;
		}
		
		this.stockLister.getNextItem();
	},
	
	closeAllStores: function(callback) {
		var func = function(callback, data) { this.close(data.o.allOnBusinessId, callback); };
		BOT.UI.comm.enqueue('ajax_action.php?action=thing2', null, func.bind(this, callback));		
	},
	
	openAllStores: function(callback) {		
		var func = function(callback) {
			this.openStatus = 0;
			var funcFinished = function(callback) { this.openStatus++; if (this.openStatus == 2) { callback(); } }.bind(this, callback);
			
			if (this.lowPromotion != '') {
				this.open(this.lowPromotion, 2, funcFinished);
			} else {
				funcFinished(callback);
			}
			
			if (this.largePromotion != '') {
				this.open(this.largePromotion, 4, funcFinished);
			} else {
				funcFinished(callback);
			}			
		};
		
		this.openLister = new BOT.PagedList('ajax_action.php?action=thing2&page={page}', this.openStore.bind(this), func.bind(this, callback), this.listFunc, this.pageFunc);
		this.openLister.start();
		this.lowPromotion = '';
		this.largePromotion = '';
	},
	
	openStore: function(store) {
		if (store.getStore > 0 && store.EmployeeNums > 0 && store.OnBusiness == "Closed") {
			if (store.ShopFamous >= 40) {
				this.lowPromotion += store.ShopId + ',';
			} else {
				this.largePromotion += store.ShopId + ',';
			}
		}
		
		this.openLister.getNextItem();
	},
	
	cleanAllStores: function(callback) {
		var func = function(data) { this.clean((data.o.allOver750Id || '') + (data.o.allUnder750Id || ''), callback); };
		BOT.UI.comm.enqueue('ajax_action.php?action=thing2', null, func.bind(this));				
	},
	
	purchase: function(id, purchaseId, transportId, callback) {
		BOT.UI.comm.enqueue('task.php?action=Agent&doaction=Purchase&ShopId=' + id + '&PurchaseId=' + purchaseId + '&TransportId=' + transportId, null, callback, null, true);
	},
	
	list: function() {
		BOT.UI.comm.enqueue('ajax_action.php?action=thing2&StoreOrder=0&nameOrder=0&levelOrder=0&enumsOrder=0&TodayIncomeOrder=0&YesterdayIncomeOrder=0&page=1',null,callback);		
	},
	
	close:function(list, callback) {
		BOT.UI.comm.enqueue('ajax_action.php?action=PauseBusiness_all&AllShopStat=1&AllShopId=' + list, null, callback);		
	},
	
	open:function(list, promotion, callback) {
		BOT.UI.comm.enqueue("ajax_action.php?action=thingjob&doaction=AllBusiness&AllShopStat=1&AllShopId=" + list + "&ShopId=0&State=0&ModeId=2&ShopAdvType=" + promotion + "&GoodLevel=0", null, callback);
	},
	
	clean:function(list, callback) {
		BOT.UI.comm.enqueue('ajax_action.php?action=shopClearSome&step=clearStart&shopID=' + list + '&type=0&clearType=fenshuawaiqiang', null, callback);
	}
};
BOT.TimeSchedule = function(hour, minute, action) {
	this.action = action;
	this.hour = hour;
	this.minute = minute;
	
	this.onAfterRun = function() {};
	
	this.start = function() {
		this.setNextRun();		
	};
	
	this.run = function() {
		try {
			this.action(this.id);
		} catch(err) {
			BOT.UI.setStatus("Task error:" + err);
		}
		
		this.setNextRun();				
	};
	
	this.setNextRun = function() {
		this.nextRun = BOT.Utils.getGameTime();
		this.nextRun.setHours(this.hour);
		this.nextRun.setMinutes(this.minute);
		
		if (this.nextRun <= BOT.Utils.getGameTime()) { this.nextRun.setDate(this.nextRun.getDate() + 1); }
		
		this.timer = setTimeout(this.run.bind(this), this.nextRun - BOT.Utils.getGameTime());
		if (this.onAfterRun) { this.onAfterRun(); }
	};
};

BOT.TaskScheduler = function() {
	this.jobQueue = [];
	
	this.add = function(caption, schedule) {				
		schedule.id = this.jobQueue.length;
		schedule.start();		
		
		var span = BOT.UI.panel.addItem({caption:caption,data:BOT.Utils.toDateString(schedule.nextRun),action:schedule.action}, this.container).getElementsByTagName("DIV")[0];
		this.jobQueue.push({"caption":caption,"schedule":schedule,"label":span});				
		schedule.onAfterRun = function(schedule, elem) { elem.innerHTML = BOT.Utils.toDateString(schedule.nextRun); BOT.UI.setStatus("Task started:" + caption); }.bind(this, schedule, span);		
				
		return this.jobQueue.length - 1;
	};	
	
	this.finished = function(index) {
		if(!this.jobQueue[index]) { return; }
		this.jobQueue[index].label.innerHTML = 'Done';
	};
};
BOT.TemplateIntercept = function(patches, postActions) {	
	this.patchedTemplates = {};
	
	this.interceptNewTpl = function(oTemplates, o) {
		if (unsafeWindow[oTemplates.action]) {
			this.patchNewTpl(oTemplates.action);
		}		
		this.originalNewLoader.call(unsafeWindow.BTO.TEMPLATES, oTemplates, o);
	};
	
	this.patchNewTpl = function(key) {
		if(!this.patches[key]) { return; }
		if(this.patchedTemplates[key]) { return; }
		
		this.patchedTemplates[key] = unsafeWindow[key].load;
        unsafeWindow[key].load = function(target, patch, scope) { return patch(target.apply(scope)); }.bind(this, this.patchedTemplates[key], this.patches[key], unsafeWindow[key]);
	}
		
	this.interceptOldTpl = function() {		
		var key = unsafeWindow.c.Confin.action;
		var patch = this.patches[key] || function(x) { return x }; 
	
		return patch(this.originalOldLoader.apply(unsafeWindow.c, arguments));
	}
	
	this.interceptPostTpl = function(arg1) {
		this.originalPostLoader.apply(unsafeWindow.c, arguments);
		(this.postActions[arg1.action] || function() {}).apply(this, arguments);
	};
		
	this.patches = patches || [];	
	this.postActions = postActions || [];
	 
	this.originalNewLoader = unsafeWindow.BTO.TEMPLATES.load;
	this.originalOldLoader = unsafeWindow.c.__MenuChild_Tpl;
	this.originalPostLoader = unsafeWindow.c.__OpenHostRight;
	unsafeWindow.BTO.TEMPLATES.load = this.interceptNewTpl.bind(this);		
	unsafeWindow.c.__MenuChild_Tpl = this.interceptOldTpl.bind(this);
	unsafeWindow.c.__OpenHostRight = this.interceptPostTpl.bind(this);
}
BOT.UI = {
	initialize: function(thetime, userAssetPin, charset) {
		this.serverValues = {"thetime":thetime,"userAssetPin":userAssetPin,"charset":charset};		
		this.createDialogDiv();	
		this.loadSettings();		
		
		BOT.UI.storage = new BOT.Storage();
		BOT.UI.data = {};
		BOT.UI.data.maxedEmployees = BOT.UI.storage.get("maxedEmployees", []);
		BOT.UI.data.employees = BOT.UI.storage.get("maxedEmployees", {});
		BOT.UI.data.arena = BOT.UI.storage.get("arena", {});		
		
		BOT.UI.comm = new BOT.Communication(this.serverValues);	
		BOT.UI.panel = new BOT.Panel();
		BOT.UI.arena = new BOT.Arena(); 
		BOT.UI.arenaIndexer = new BOT.ArenaIndexer(unsafeWindow.UserId);
		BOT.UI.city = new BOT.City();
		BOT.UI.taskScheduler = new BOT.TaskScheduler();
		BOT.UI.employeeIndexer = new BOT.EmployeeIndexer({noAttire:true});
		BOT.UI.autoPilot = new BOT.AutoPilot();		
		BOT.UI.templateIntercepter = new BOT.TemplateIntercept();		
		BOT.UI.shortcuts = new BOT.Shortcuts(); 	
		
		BOT.UI.panel.addMenuItem({caption:"Arena", subMenus:[{caption:"Update Matches", action:this.arenaIndexer.start.bind(this.arenaIndexer)}]});
		BOT.UI.panel.addMenuItem({caption:"NPC", subMenus:this.getNpcMenus()});
		BOT.UI.panel.addMenuItem({caption:"Stores", 
			subMenus:[
				{caption:"Close All", action:BOT.Stores.closeAllStores.bind(BOT.Stores, this.doneDialog)},
				{caption:"Open All", action:BOT.Stores.openAllStores.bind(BOT.Stores, this.doneDialog)},
				{caption:"Restock All", action:BOT.Stores.stockAllStores.bind(BOT.Stores, this.doneDialog)},
				{caption:"Clean All", action:BOT.Stores.cleanAllStores.bind(BOT.Stores, this.doneDialog)}
			]}
		);
		BOT.UI.panel.addMenuItem({caption:"Configuration", action:BOT.UI.showConfigDialog.bind(this)});
		BOT.UI.taskScheduler.container = BOT.UI.panel.addMenuItem({caption:"Auto Pilot", subMenus:[]}).subMenu;				
		BOT.UI.arena.matchListContainer = BOT.UI.panel.addMenuItem({caption:"Auto Matches", subMenus:[]}).subMenu;		
		BOT.UI.templateIntercepter.postActions["wonbtofreedom"] = this.arena.updatePlayerList.bind(this.arena);				
		BOT.UI.autoPilot.start();
		
		BOT.UI.shortcuts.create(null, ["hideDialog", "saveSettings"]);
		BOT.UI.shortcuts.create("arena", ["showDialog"]);
		BOT.UI.shortcuts.create("arenaIndexer", ["flagPlayer"]);			
	},
	
	getNpcMenus: function() {
		var npcMenus = [];
		for(var key in this.npcLandmarks) {
			var npc = this.npcLandmarks[key];
			npcMenus.push({caption:npc.name.substr(0, 35), data:npc.count, action:this.city.npc.bind(this.city, npc.id)});
		}	
		
		return npcMenus;
	},
		
	showDialog: function(html) {
		this.dialogContent.innerHTML = html;		
		this.dialog.style.display = 'block';	
		
		var top = parseInt((window.innerHeight - this.dialog.clientHeight) / 2) + window.scrollY;   
		var left = parseInt((window.innerWidth - this.dialog.clientWidth) / 2) + window.scrollX;      
		this.dialog.style.top = top + "px";  
		this.dialog.style.left = left + "px";  		
	},
	
	hideDialog: function() {
		this.dialogContent.innerHTML = '';
		this.dialog.style.display = 'none';
	},
		
	setStatus: function(message) {
		document.getElementById("botStatus").innerHTML = message;
	},
	
	createDialogDiv: function() {
		this.dialog = document.createElement("DIV");
		this.dialog.setAttribute("id", "botDialogContainer");
		this.dialog.setAttribute("style", "position:absolute; z-index:99999;display:none;");
		this.dialog.innerHTML = "<div style=\"\" id=\"botDialogContainer\">" + 
		"<table cellspacing=\"0\" style=\"width: 415px;background-image: url('http://img1.bto.dovogame.com/gamebto/images/maps/main.jpg');\" class=\"box\">" + 
		"	<tbody>" + 
		"		<tr>" + 
		"			<td style=\"line-height: 3px; height: 3px; background: url('http://img1.bto.dovogame.com/gamebto//images/elem/win_top1.png') no-repeat scroll 0pt 0pt transparent; width: 3px;\"></td>	" + 
		"			<td style=\"line-height: 3px; height: 3px; background: url('http://img1.bto.dovogame.com/gamebto//images/elem/win_top2.png') repeat-x scroll 0pt 0pt transparent;\"></td>	" + 
		"			<td style=\"line-height: 3px; height: 3px; background: url('http://img1.bto.dovogame.com/gamebto//images/elem/win_top3.png') no-repeat scroll 0pt 0pt transparent; width: 3px;\"></td>" + 
		"		</tr>" + 
		"		<tr>	" + 
		"			<td style=\"background: url('http://img1.bto.dovogame.com/gamebto//images/elem/win_cen1.png') repeat-y scroll 0pt 0pt transparent; width: 3px;\"></td>" + 
		"			<td style=\"padding:4px;\" id=\"botDialogContent\">" + 
		"			" + 
		"			</td>" + 
		"			<td style=\"background: url('http://img1.bto.dovogame.com/gamebto//images/elem/win_cen3.png') repeat-y scroll 0pt 0pt transparent; width: 3px;\"></td>" + 
		"		</tr>" + 
		"		<tr>" + 
		"			<td style=\"line-height: 3px; height: 3px; background: url('http://img1.bto.dovogame.com/gamebto//images/elem/win_foot1.png') no-repeat scroll 0pt 0pt transparent; width: 3px;\"></td>" + 
		"			<td style=\"line-height: 3px; height: 3px; background: url('http://img1.bto.dovogame.com/gamebto//images/elem/win_foot2.png') repeat-x scroll 0pt 0pt transparent;\"></td>	<td style=\"line-height: 3px; height: 3px; background: url('http://img1.bto.dovogame.com/gamebto//images/elem/win_foot3.png') no-repeat scroll 0pt 0pt transparent; width: 3px;\"></td>" + 
		"		</tr>" + 
		"	</tbody>" + 
		"</table>" + 
		"</div>";
		
		document.body.appendChild(this.dialog);
		this.dialogContent = document.getElementById("botDialogContent");
	},
		
	showConfigDialog: function() {
		var landmarks = '', horses = '';	
		for(var key in this.npcLandmarks) {
			landmarks += "<option value=\"" + this.npcLandmarks[key].id + "\"" + (this.npcLandmarks[key].id == BOT.UI.settings.npc ? " selected=\"selected\"" : "") + ">" + this.npcLandmarks[key].name.substr(0, 35) + "</option>";
		}	
		
		for(var i = 1; i < 11; i++) {
			horses += "<option value=\"" + i + "\"" + (i == BOT.UI.settings.horse ? " selected=\"selected\"" : "") + ">Level " + i + "</option>";
		}
		
		BOT.UI.showDialog("<table width=\"100%\" cellspacing=\"0\" class=\"tborder\">" + 
		"	<tbody>" + 
		"		<tr height=\"10\">" + 
		"			<td colspan=\"3\"></td>" + 
		"		</tr>" + 
		"		<tr>" + 
		"			<td colspan=\"3\" class=\"tdbg1\" align=\"center\"><span class=\"yellow2\">Car Bonus</span></td>" + 
		"		</tr>" + 
		"		<tr>" + 
		"			<td width=\"20%\" class=\"tdbg1\">Recharge:&nbsp;&nbsp;</td>" + 
		"			<td width=\"80%\" colspan=\"2\" class=\"tdbg1\">" + 
		"				<div><span class=\"text_normal_out\"><span class=\"text_normal_in\"><input type=\"text\" value=\"" + BOT.UI.settings.car.routineRecharge + "\" id=\"recharge\"></span></span></div>" + 		
		"			</td>" + 
		"		</tr>" + 
		"		<tr>" + 
		"			<td width=\"20%\" class=\"tdbg1\">Duration:&nbsp;&nbsp;</td>" + 
		"			<td width=\"80%\" colspan=\"2\" class=\"tdbg1\">" + 
		"				<div><span class=\"text_normal_out\"><span class=\"text_normal_in\"><input type=\"text\" value=\"" + BOT.UI.settings.car.routineDuration + "\" id=\"duration\"></span></span></div>" + 		
		"			</td>" + 
		"		</tr>" + 				
		"		<tr>" + 
		"			<td width=\"20%\" class=\"tdbg1\">Fatigue Limit:&nbsp;&nbsp;</td>" + 
		"			<td width=\"80%\" colspan=\"2\" class=\"tdbg1\">" + 
		"				<div><span class=\"text_normal_out\"><span class=\"text_normal_in\"><input type=\"text\" value=\"" + BOT.UI.settings.fatigue + "\" id=\"fatigue\"></span></span></div>" +
		"			</td>" + 		
		"		</tr>" + 		
		"		<tr>" + 
		"			<td width=\"20%\" class=\"tdbg1\">Poacher:&nbsp;&nbsp;</td>" + 
		"			<td width=\"80%\" colspan=\"2\" class=\"tdbg1\">" + 
		"				<div><span class=\"text_normal_out\"><span class=\"text_normal_in\"><input type=\"text\" value=\"" + BOT.UI.settings.poacher + "\" id=\"poacher\"></span></span></div>" +
		"			</td>" + 		
		"		</tr>" + 	
		"		<tr>" + 
		"			<td width=\"20%\" class=\"tdbg1\">NPC:&nbsp;&nbsp;</td>" + 
		"			<td width=\"80%\" colspan=\"2\" class=\"tdbg1\">" + 
		"				<div><select id=\"npc\" style=\"visibility:visible;\">" + landmarks + "</select></div>" +
		"			</td>" + 		
		"		</tr>" + 		
		"		<tr>" + 
		"			<td width=\"20%\" class=\"tdbg1\">Horse Training Level:&nbsp;&nbsp;</td>" + 
		"			<td width=\"80%\" colspan=\"2\" class=\"tdbg1\">" + 
		"				<div><select id=\"horse\" style=\"visibility:visible;\">" + horses + "</select></div>" +
		"			</td>" + 		
		"		</tr>" +		
		"		<tr>" + 
		"			<td align=\"right\" colspan=\"3\">" + 
		"				<span class=\"btn_normal\"><button onclick=\"javascript:shortcuts.saveSettings(document.getElementById('recharge').value, document.getElementById('duration').value, document.getElementById('fatigue').value, document.getElementById('poacher').value, document.getElementById('npc').value, document.getElementById('horse').value);shortcuts.hideDialog();\">Save</button></span>" + 
		"				<span class=\"btn_normal\"><button onclick=\"javascript:shortcuts.hideDialog();\">Cancel</button></span>" + 
		"			</td>" + 
		"		</tr>" + 
		"	</tbody>" + 
		"</table>");
	},
	
	npcLandmarks: {
		"35":{id:35, count:6, name:"Peace Park"},
		"36":{id:36, count:8, name:"Liberty City"},
		"39":{id:39, count:12, name:"MG TV Tower"},
		"42":{id:42, count:16, name:"Thunder International Building"},
		"43":{id:43, count:22, name:"Sailboat Hotel"},
		"44":{id:44, count:32, name:"Tiger Beach Hotel"},
		"38":{id:38, count:38, name:"United Center Stadium"},		
		"37":{id:37, count:42, name:"biggH International Convention and Exhibition Center"}				
	},	
	
	loadSettings: function() {
		BOT.UI.settings = eval(GM_getValue("settings", "null"));
		if(!BOT.UI.settings) {
			BOT.UI.settings = { 
				car:{
					routineRecharge:0, 
					routineDuration:0
				}, 
				fatigue:1000,
				poacher:1,
				npc:37,				
				horse: 4
			};
			BOT.UI.showConfigDialog(); 
			return; 
		}	
	},
		
	saveSettings: function(recharge, duration, fatigue, poacher, npc, horse) {
		BOT.UI.settings = { 
			"car":{"routineRecharge":parseInt(recharge), "routineDuration":parseInt(duration)}, 
			"fatigue":parseInt(fatigue),
			"poacher":poacher,
			"npc":npc,
			"horse":horse
		};	
		
		setTimeout(function() { GM_setValue("settings", uneval(BOT.UI.settings)); }, 0);
	}		
};
function GM_log(message) { unsafeWindow.console.log(message); }

[["addYears","Year"],["addMonths","Month"],["addDays","Date"],["addHours","Hours"],["addMinutes","Minutes"],["addSeconds","Seconds"]].forEach(function(val) { Date.prototype[val[0]] = function(value) { this["set" + val[1]](this["get" + val[1]]() + value); return this; } });

BOT.Utils = {
	merge: function(target, source) {
		for(var key in source) {
			target[key] = source[key];
		}
	},	
	appendZero: function(value) {
		return value < 10 ? "0" + value : value.toString();
	},

	convertToGameTime: function(date) {
		return date.addMinutes(date.getTimezoneOffset()).addHours(-7);
	},
	
	getYesterday: function() {
		return this.getGameTime().addDays(-1);
	},	

	getToday: function() {
		var date = this.getGameTime();
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	},
	getGameTime: function() {
		var date = new Date();
		return this.convertToGameTime(date);	
	},
	parseDate: function(dateString) {
		var dateTime = dateString.split(' ');
		var date = dateTime[0].split('-');	
		var time = dateTime[1].split(':');
		
		if(date.length == 2) { date[2] = date[1]; date[1] = date[0]; date[0] = new Date().getFullYear(); }
		return new Date(date[0], date[1]-1, date[2], time[0], time[1], time[2] || 0, 0);
	},	

	toDateString: function(date) {
		if (!date) return '';
		if (!(date instanceof Date) && !!parseInt(date)) date = new Date(date);
		
		var today = BOT.Utils.getToday();
		var tomorrow = BOT.Utils.getToday().addDays(1);
		
		if (date >= tomorrow) return 'Tomorrow';
		if (date < today) return 'Yesterday';
		return this.appendZero(date.getHours()) + ":" + this.appendZero(date.getMinutes());
	}
};

// BIND
if ( !Function.prototype.bind ) {

  Function.prototype.bind = function( obj ) {
	var slice = [].slice,
		args = slice.call(arguments, 1), 
		self = this, 
		nop = function () {}, 
		bound = function () {
		  return self.apply( this instanceof nop ? this : ( obj || {} ), 
							  args.concat( slice.call(arguments) ) );    
		};

	nop.prototype = self.prototype;

	bound.prototype = new nop();

	return bound;
  };
}

if ( !Function.prototype.construct ) {
	Function.prototype.construct = function(args) {
		var boundArgs = [].concat.apply([null], args),
		boundFn = this.bind.apply(this, boundArgs);	
		return new boundFn();	
	};
}
// BIND

// Stuck fix
unsafeWindow.FF_SearchEvent = function() {}
var jQuery = unsafeWindow.jQuery;
// Stuck fix
setTimeout(BOT.UI.initialize.bind(BOT.UI, unsafeWindow.thetime, unsafeWindow.__UserAssetsPin, unsafeWindow.pagecharset), 10000);
unsafeWindow.onerror = null;
