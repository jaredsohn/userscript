// ==UserScript==
// @name           Player Play Watch Or/And/Xor/Not
// @namespace      GLB
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @include        http://glb.warriorgeneral.com/game/game.pl?game_id=*&mode=pbp
// @author         numone (http://userscripts.org/users/74270)
// @version        13.12.29
// ==/UserScript==

// pabst added Or/And/Xor/Not on 7/23/2013

var CACHE = {};
PlayerWatch = function(){
	var that = this;
	
	// div that holds everything
	this.mainDiv = document.createElement('DIV');
	var area = document.getElementById('pbp');
	area.insertBefore(this.mainDiv,area.firstChild);
	
	// open/close list button
	this.button = document.createElement('Input');
	this.button.setAttribute('type','button');
	this.button.setAttribute('value','Open Pannel');
	this.button.addEventListener('click',function() { that.gatherLists.apply(that); },false);
	this.mainDiv.appendChild(this.button);
	
	// div that holds the player's names
	this.innerDiv = document.createElement('DIV');
	this.mainDiv.appendChild(this.innerDiv);
	this.innerDiv.style.display = 'none';
};
PlayerWatch.prototype = {};

PlayerWatch.prototype.gatherLists = function(){
	// take care of the button and div
	var that = this;
	this.button.setAttribute('value','Close Pannel');
	this.button.addEventListener('click',function() { that.closeLists.apply(that); },false);
	this.innerDiv.style.display = 'block';
	if(this.isLoaded){
		return;
	}
	
	// get the team's names and links
	this.team1 = {};
	this.team2 = {};
	var temp = document.getElementById('scoreboard');
	var links = temp.getElementsByTagName('A');
	this.team1.name = links[0].innerHTML;
	this.team1.link = links[0].getAttribute('href');
	this.team1.teamID = this.team1.link.split('=')[1];
	this.team1.rosterLink = '/game/roster.pl?team_id=' + this.team1.teamID;
	this.team2.name = links[1].innerHTML;
	this.team2.link = links[1].getAttribute('href');
	this.team2.teamID = this.team2.link.split('=')[1];
	this.team2.rosterLink = '/game/roster.pl?team_id=' + this.team2.teamID;
	
	this.getAjaxRequest(this.team1.rosterLink,this.setRoster1,this.innerDiv);
};

PlayerWatch.prototype.setRoster1 = function(address,xmlhttp){
	this.team1.results = xmlhttp;
	this.team1.holder = document.createElement('SPAN');
	this.team1.holder.innerHTML = xmlhttp.responseText;
	//this.mainDiv.appendChild(this.team1.holder);
	this.getAjaxRequest(this.team2.rosterLink,this.setRoster2,this.innerDiv);
};

PlayerWatch.prototype.setRoster2 = function(address,xmlhttp){
	var that = this;
	this.isLoaded = true;
	this.innerDiv.innerHTML = '';
	
	// embed the results
	this.team2.holder = document.createElement('SPAN');
	this.team2.holder.innerHTML = xmlhttp.responseText;
	
	// create results table
	this.mainTable = document.createElement('table');
	var tbody = document.createElement('tbody');
	var tr = document.createElement('tr');
	tr.setAttribute('class','nonalternating_color');
	this.innerDiv.appendChild(this.mainTable);
	this.mainTable.appendChild(tbody);
	tbody.appendChild(tr);
	
	// create the team names
	var td = document.createElement('td');
	td.setAttribute('colSpan','2');
	tr.appendChild(td);
	td.innerHTML = this.team1.name + ':'
	td = document.createElement('td');
	td.setAttribute('colSpan','2');
	tr.appendChild(td);
	td.innerHTML = this.team2.name + ':'
	
	// team 1
	this.team1.rows = [];
	var rosTable = this.team1.holder.getElementsByTagName('TABLE')[0].parentNode;
	this.team1.rows = rosTable.getElementsByTagName('TR');
	this.team1.stat = 0;
	
	// team 2
	this.team2.rows = [];
	rosTable = this.team2.holder.getElementsByTagName('TABLE')[0].parentNode;
	this.team2.rows = rosTable.getElementsByTagName('TR');
	this.team2.stat = 0;
	
	// writes the team to the div
	this.printTheTeams();
	
	this.orButton = document.createElement('input');
	this.orButton.setAttribute('id','playerPlayWatch_Or');
	this.orButton.setAttribute('type','radio');
	this.orButton.setAttribute('name','logic');
	this.orButton.setAttribute('checked', true);
	this.orLabel = document.createElement('label');
    this.orLabel.innerHTML = "Or";
	this.orSpan = document.createElement('span');
	this.orSpan.appendChild(this.orButton);
	this.orSpan.appendChild(this.orLabel);
	this.innerDiv.appendChild(this.orSpan);
	
	this.andButton = document.createElement('input');
	this.andButton.setAttribute('id','playerPlayWatch_And');
	this.andButton.setAttribute('type','radio');
	this.andButton.setAttribute('name','logic');
	this.andLabel = document.createElement('label');
    this.andLabel.innerHTML = "And";
	this.andSpan = document.createElement('span');
	this.andSpan.appendChild(this.andButton);
	this.andSpan.appendChild(this.andLabel);
	this.innerDiv.appendChild(this.andSpan);

	this.xorButton = document.createElement('input');
	this.xorButton.setAttribute('id','playerPlayWatch_Xor');
	this.xorButton.setAttribute('type','radio');
	this.xorButton.setAttribute('name','logic');
	this.xorLabel = document.createElement('label');
    this.xorLabel.innerHTML = "Xor";
	this.xorSpan = document.createElement('span');
	this.xorSpan.appendChild(this.xorButton);
	this.xorSpan.appendChild(this.xorLabel);
	this.innerDiv.appendChild(this.xorSpan);
	
	this.notButton = document.createElement('input');
	this.notButton.setAttribute('id','playerPlayWatch_Not');
	this.notButton.setAttribute('type','radio');
	this.notButton.setAttribute('name','logic');
	this.notLabel = document.createElement('label');
    this.notLabel.innerHTML = "Not";
	this.notSpan = document.createElement('span');
	this.notSpan.appendChild(this.notButton);
	this.notSpan.appendChild(this.notLabel);
	this.innerDiv.appendChild(this.notSpan);
	
	// create the button to filter the results
	this.runButton = document.createElement('input');
	this.runButton.setAttribute('type','button');
	this.runButton.setAttribute('value','Filter Results');
	this.innerDiv.appendChild(this.runButton);
	this.runButton.addEventListener('click',function() { that.startFiltering.apply(that); },false);
	
	// create a status div
	this.statusDiv = document.createElement('DIV');
	this.innerDiv.appendChild(this.statusDiv);
	this.info1 = document.createElement('SPAN');
	this.info2 = document.createElement('SPAN');
	this.info3 = document.createElement('SPAN');
	this.statusDiv.appendChild(this.info1);
	this.statusDiv.appendChild(this.info2);
	this.statusDiv.appendChild(this.info3);
};

PlayerWatch.prototype.startFiltering = function(){
	var checkboxs = this.mainTable.getElementsByTagName('input');
	var names = [];
	for(var i=0;i<checkboxs.length;i++){
		if(checkboxs[i].checked){
			names.push(checkboxs[i].getAttribute('playerName'));
		}
	}
	
	if(names.length == 0){
		alert('No Names Checked');
		return;
	}
	
	//this.runButton.setAttribute('disabled',true);
	
	// for(var i=0;i<names.length;i++){
		// console.log('checked: ' + names[i]);
	// }
	
	if(!this.cached){
		this.names = names;
		this.cachePlays(names);
	}else{
		this.filterRows(names);
	}
};

PlayerWatch.prototype.cachePlays = function(names){
	var that = this;
	this.hasMonsterkill = document.getElementById('statsDiv') ? true : false;
	console.log('monsterkill: ' + this.hasMonsterkill);
	var table = document.getElementById('play_by_play_table');
	var rows = table.getElementsByTagName('TR');
	
	// remove rows that aren't needed and count the total rows needed
	var useRows = [];
	for(var i=0;i<rows.length;i++){
		var c = " " + rows[i].className + " ";
		// it is a play
		if(c.indexOf(" pbp_play_row ") != -1 || c.indexOf(" pbp_play_row_scoring ") != -1 || c.indexOf(" pbp_play_row_turnover ") != -1){
			//console.log('row innerhtml: ' + rows[i].innerHTML);
			var link = rows[i].lastChild.previousSibling.firstChild.href;
			if(this.hasMonsterkill && link){
				if(this.isTimeout(rows[i])){
					useRows.push(rows[i]);
					continue;
				}else{
					useRows.push(rows[i]);
					i = i + 2;
					continue;
				}
			}else{ // replays only take up 1 row with MK
				useRows.push(rows[i]);
				continue;
			}
		}
	}
	
	this.totalPlays = useRows.length;
	this.playNum = 0;
	this.info1.innerHTML = 'Cacheing play ';
	this.info2.innerHTML = this.playNum;
	this.info3.innerHTML = ' of ' + this.totalPlays;
	
	for(var i=0;i<useRows.length;i++){
		var link = useRows[i].lastChild.previousSibling.firstChild.href;
		if(link){
			this.cachePlay(link);
		}else{
			this.postCachePlay();
		}
	}
};

PlayerWatch.prototype.isTimeout = function(row){
	var td = getElementsByClassName('pbp_play',row)[0];
	//console.log('td innerhtml: ' + td.innerHTML);
	if(td.innerHTML == 'Offensive Timeout Called: ' + this.team1.name || 
		td.innerHTML == 'Offensive Timeout Called: ' + this.team2.name || 
		td.innerHTML == this.team1.name + ' calls timeout' || 
		td.innerHTML == this.team2.name + ' calls timeout' || 
		td.innerHTML == 'Defensive Timeout Called: ' + this.team1.name || 
		td.innerHTML == 'Defensive Timeout Called: ' + this.team2.name){
		return true;
	}
	return false;
};

PlayerWatch.prototype.cachePlay = function(link){
	this.getAjaxRequest(link,this.postCachePlay);
};

PlayerWatch.prototype.postCachePlay = function(link,xmlhttp){
	this.playNum++;
	this.info2.innerHTML = this.playNum;
	
	if(this.playNum == this.totalPlays){
		this.cached = true;
		this.filterRows(this.names);
	}
};

PlayerWatch.prototype.filterRows = function(names){
	var that = this;
	this.hasMonsterkill = document.getElementById('statsDiv') ? true : false;
	var table = document.getElementById('play_by_play_table');
	var rows = table.getElementsByTagName('TR');
	
	// remove rows that aren't needed and count the total rows needed
	var useRows = [];
	for(var i=0;i<rows.length;i++){
		var c = " " + rows[i].className + " ";
		// it is a play
		if(c.indexOf(" pbp_play_row ") != -1 || c.indexOf(" pbp_play_row_scoring ") != -1 || c.indexOf(" pbp_play_row_turnover ") != -1){
			var link = rows[i].lastChild.previousSibling.firstChild;
			link.target = '_blank';
			link = link.href;
			if(this.hasMonsterkill && link){
				if(this.isTimeout(rows[i])){
					useRows.push(rows[i]);
					continue;
				}else{
					useRows.push(rows[i]);
					i = i + 2;
					continue;
				}
			}else{ // replays only take up 1 row with MK
				useRows.push(rows[i]);
				continue;
			}
		}
	}
	
	this.totalRows = useRows.length;
	this.currPlay = 0;
	this.info1.innerHTML = 'Processing play ';
	this.info2.innerHTML = this.currPlay;
	this.info3.innerHTML = ' of ' + this.totalRows;

	for(var i=0;i<useRows.length;i++){
		if(useRows[i]){
			var link = useRows[i].lastChild.previousSibling.firstChild.href;
			if(!link){
				this.filterFGPlays(useRows[i],names);
			}else{
				this.runFilter(link,useRows[i],names);
			}
		}
	}
};

PlayerWatch.prototype.filterFGPlays = function(row,names){
	var str = row.getElementsByTagName('TD')[3].innerHTML;
	for(var i=0;i<names.length;i++){
		if(str.indexOf(names[i]) != -1){
			row.style.display = '';
			return;
		}
	}
	row.style.display = 'none';
	this.currPlay++;
	this.info2.innerHTML = this.currPlay;
	if(this.currPlay >= this.totalRows){
		this.finishUpFiltering();
	}
};

// nextSibling can include line breaks in FF, this function will ignore them
PlayerWatch.prototype.nextSibling = function(node){
	var endBrother = node.nextSibling;
	while(endBrother.nodeType != 1){
		if(!endBrother.nextSibling){
			console.log('%o',node);
		}
		endBrother = endBrother.nextSibling;
	}
	return endBrother;
};

PlayerWatch.prototype.runFilter = function(link,row,names){	
	var that = this;
	if(this.isTimeout(row)){
		row.style.display = 'none';
		this.currPlay++;
		this.info2.innerHTML = this.currPlay;
		if(this.currPlay >= this.totalRows){
			this.finishUpFiltering();
		}
		return;
	}
	
	this.getAjaxRequest(link,function(theLink,xmlhttp){
		if(that.processPlay(names,xmlhttp)){
			row.style.display = '';
			if(that.hasMonsterkill){
				row = that.nextSibling(row);
				row.style.display = '';
				row = that.nextSibling(row);
				row.style.display = '';
			}
		}else{
			row.style.display = 'none';
			if(that.hasMonsterkill){
				row = that.nextSibling(row);
				row.style.display = 'none';
				row = that.nextSibling(row);
				row.style.display = 'none';
			}
		}
		that.currPlay++;
		that.info2.innerHTML = that.currPlay;
		if(that.currPlay >= that.totalRows){
			that.finishUpFiltering();
		}
	});
	
};

PlayerWatch.prototype.finishUpFiltering = function(){
	var that = this;
	window.setTimeout(function(){
		that.info1.innerHTML = '';
		that.info2.innerHTML = '';
		that.info3.innerHTML = '';
	},250);
	
	//this.runButton.setAttribute('disabled',false);
};

PlayerWatch.prototype.processPlay = function(names,result){
	var span = document.createElement('SPAN');
	span.innerHTML = result.responseText;
	
	var replayNames = getElementsByClassName('player_name',span);
	//console.log('replayNames length: ' + replayNames.length);
	
	var pbpNames = [];
  	for (var k=0; k<replayNames.length; k++) {
        pbpNames.push(replayNames[k].innerHTML);
  	}
  	
	if (document.getElementById("playerPlayWatch_Or").checked) {
    	for (var k=0; k<names.length; k++){
            var idx = pbpNames.indexOf(names[k]);
            if (idx != -1) return true;
        }
        return false;
    }
    
	if (document.getElementById("playerPlayWatch_Xor").checked) {
        var result = 0;
    	for (var k=0; k<names.length; k++){
            var idx = pbpNames.indexOf(names[k]);
            if (idx != -1) result++;
            if (result > 1) return false;
        }
        return (result == 1);
    }
    
	if (document.getElementById("playerPlayWatch_And").checked) {
        var result = 0;
    	for (var k=0; k<names.length; k++){
            var idx = pbpNames.indexOf(names[k]);
            if (idx == -1) return false;
        }
        return true;
    }

	if (document.getElementById("playerPlayWatch_Not").checked) {
    	for (var k=0; k<names.length; k++){
            var idx = pbpNames.indexOf(names[k]);
            if (idx != -1) return false;
        }
        return true;
    }
    
	return false;
};

PlayerWatch.prototype.printTheTeams = function(){
	// see which team has the most players
	var count = this.team1.rows.length > this.team2.rows.length ? this.team1.rows.length : this.team2.rows.length;
	for(var i=0;i<count;i++){
		// create the row
		var tr = document.createElement('TR');
		if(i % 2 == 0){
			tr.setAttribute('class','alternating_color1');
		}else{
			tr.setAttribute('class','alternating_color2');
		}
		this.mainTable.appendChild(tr);
		
		if(this.team1.rows.length > i){// if this row exists for this team
			if(this.team1.rows[i].getElementsByTagName('A').length > 0){// see if it was a player or header
				var aID = this.team1.rows[i].getElementsByTagName('A').length > 2 ? 2 : 0;
				var td = document.createElement('TD');
				tr.appendChild(td);
				var checkbox = document.createElement('input');
				checkbox.setAttribute('type','checkbox');
				checkbox.setAttribute('playerName',this.team1.rows[i].getElementsByTagName('A')[aID].innerHTML);
				td.appendChild(checkbox);
				td = document.createElement('TD');
				tr.appendChild(td);
				td.innerHTML = this.team1.rows[i].getElementsByTagName('A')[aID].innerHTML;
				var tds = getElementsByClassName('player_position',this.team1.rows[i]);
				td.innerHTML += ' (' + tds[0].firstChild.innerHTML.replace('<div></div>','') + ')';
			}else{
				var td = document.createElement('TD');
				td.setAttribute('colSpan','2');
				tr.appendChild(td);
				if(this.team1.stat == 0){
					td.innerHTML = 'Offense';
					this.team1.stat++;
				}else if(this.team1.stat == 1){
					td.innerHTML = 'Defense';
					this.team1.stat++;
				}else if(this.team1.stat == 2){
					td.innerHTML = 'Kicker';
					this.team1.stat++;
				}
			}
		}else{
			var td = document.createElement('TD');
			td.setAttribute('colSpan','2');
			tr.appendChild(td);
		}
		
		if(this.team2.rows.length > i){
			if(this.team2.rows[i].getElementsByTagName('A').length > 0){
				var aID = this.team2.rows[i].getElementsByTagName('A').length > 2 ? 2 : 0;
				var td = document.createElement('TD');
				tr.appendChild(td);
				var checkbox = document.createElement('input');
				checkbox.setAttribute('type','checkbox');
				checkbox.setAttribute('playerName',this.team2.rows[i].getElementsByTagName('A')[aID].innerHTML);
				td.appendChild(checkbox);
				td = document.createElement('TD');
				tr.appendChild(td);
				td.innerHTML = this.team2.rows[i].getElementsByTagName('A')[aID].innerHTML;
				var tds = getElementsByClassName('player_position',this.team2.rows[i]);
				td.innerHTML += ' (' + tds[0].firstChild.innerHTML.replace('<div></div>','') + ')';
			}else{
				var td = document.createElement('TD');
				td.setAttribute('colSpan','2');
				tr.appendChild(td);
				if(this.team2.stat == 0){
					td.innerHTML = 'Offense';
					this.team2.stat++;
				}else if(this.team2.stat == 1){
					td.innerHTML = 'Defense';
					this.team2.stat++;
				}else if(this.team2.stat == 2){
					td.innerHTML = 'Kicker';
					this.team2.stat++;
				}
			}
		}else{
			var td = document.createElement('TD');
			td.setAttribute('colSpan','2');
			tr.appendChild(td);
		}
		
	}
};

PlayerWatch.prototype.closeLists = function(){
	var that = this;
	this.innerDiv.style.display = 'none';
	this.button.setAttribute('value','Open Pannel');
	this.button.addEventListener('click',function() { that.gatherLists.apply(that); },false);
};

PlayerWatch.prototype.mergeArrays = function(oldArray,newArray){
	for(var i=0;i<newArray.length;i++){
		oldArray.push(newArray[i]);
	}
	return oldArray;
};

PlayerWatch.prototype.getAjaxRequest = function(address,callback,loadingDiv){
	var that = this;
	if(loadingDiv){
		loadingDiv.innerHTML = 'Loading...';
	}
	
	if(!CACHE[address]){
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.open( 'GET', address, true );

		xmlhttp.onload = function() {
			if (this.status != 200) {
				alert("Error loading a page: Error "+this.status+" loading "+address);
			}else {
				console.log("loaded: "+address);
				CACHE[address] = this;
				if(callback){
					callback.apply(that,[address,this]);
				}
			}
		};

		xmlhttp.send(null);
		return xmlhttp;
	}else{
		console.log("loaded from cache: "+address);
		if(callback){
			callback.apply(that,[address,CACHE[address]]);
		}
	}
};

function getElementsByClassName(classname, par){
   var a=[];
   var re = new RegExp('\\b' + classname + '\\b');
   var els = par.getElementsByTagName("*");
   for(var i=0,j=els.length; i<j; i++){
      if(re.test(els[i].className)){
         a.push(els[i]);
      }
   }
   return a;
};

window.setTimeout(function() { new PlayerWatch(); },0);