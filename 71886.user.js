// ==UserScript==
// @name           CAnDy
// @autor          genes - Ikariam Chile-Beta
// @contact		   rogelio.meza.t(at)gmail(dot)com	
// @brief		   CAnDy means: Clean Attackers 'n Defenders y.
// @description    Script for Ikariam. Clear list of attackers and defenders from battle report. It removes the word "de" on the names of players. It works in Ikariam's Spanish servers only.
// @include        http://s*.ikariam.*/*view=militaryAdvisorReportView&combatId*// @version        1.0
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
// ==/UserScript==

CAnDy = function (){
	this.players = {
		attackers : document.getElementById("troopsReport").getElementsByTagName("span")[1].innerHTML,
		defenders : document.getElementById("troopsReport").getElementsByTagName("span")[2].innerHTML
	};
			
	this.token = function(sps) {				
		var object = new String (sps);
		var tokens = sps.split(',');
		var n = tokens.length;
					
		var object_return = new Array();
			for (i = 0; i < n; i++){
				var temp = tokens[i].split(' de ');
	
				if(temp.length > 2){
							var m = temp.length;							
					var strtmp = new String('');
					for (j = 0; j < m; j++){
						strtmp += temp[j];
						if(j <= m-3){
							strtmp += ' de ';
						}
					}
					temp[0] = strtmp;
				}
				object_return[i] = temp[0];
			}
					
			return object_return;
									
	};
				
	this.link = function( sps ){
		var string_return = new String('');
		var n = sps.length;
		for(i = 0; i < n; i++){
			string_return += sps[i];
			if(i == n-2) {
				string_return += ' y ';
			}
			else if(i <= n-2){
				string_return += ', ';
			}					
		}
				
		return string_return;
	};
				
				
	this.candy = function (){
		document.getElementById("troopsReport").getElementsByTagName("span")[1].innerHTML = this.link(this.token(this.players.attackers));
		document.getElementById("troopsReport").getElementsByTagName("span")[2].innerHTML = this.link(this.token(this.players.defenders));
	};
		
};

			
var candy = new CAnDy();
candy.candy();
