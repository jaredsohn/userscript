// ==UserScript==
// @name          League Underground Trophies
// @namespace     GLB
// @description   Puts the season champion trophies in the team profiles
// @include       http://goallineblitz.com/game/team.pl?team_id=*
// ==/UserScript==



var TEAMS = {
	Travel:{
		teamID:'6451',
		text:'League Underground',
		bText:'Current Champion',
		imgUrl:'http://goallineblitz.com/images/game/trophies/pwt_1st.gif'
	},
	s10:{
		teamID:'6451',
		text:'Season 10, League Underground',
		bText:'League Champion',
		imgUrl:'http://goallineblitz.com/images/game/trophies/league_champ.gif'
	},
	s10RunnerUp:{
		teamID:'6438',
		text:'Season 10, League Underground',
		bText:'League Runnerup',
		imgUrl:'http://goallineblitz.com/images/game/trophies/conference_champ.gif'
	}
};

function main(){
	if(document.getElementById('trophies')){
		var trophyDiv = document.getElementById('trophies');
	}else{
		var trophyDiv = document.createElement('DIV');
		trophyDiv.setAttribute('id','trophies');
		var tempDiv = document.getElementById('chemistry');
		tempDiv.parentNode.insertBefore(trophyDiv,tempDiv);
	}
	var currTeamId = window.location.href.split('=')[1];
	runScript(trophyDiv,currTeamId);
};

function runScript(trophyDiv,currTeamId){
	for(teams in TEAMS){
		if(TEAMS[teams].teamID == currTeamId){
			console.log('match team: ' + TEAMS[teams].teamID);
			addTrophy(TEAMS[teams],trophyDiv);
		}
	}
};

function addTrophy(teamObj,trophyDiv){
	var holder = document.createElement('DIV');
	holder.setAttribute('class','trophy');
	var imgHolder = document.createElement('DIV');
	holder.appendChild(imgHolder);
	imgHolder.setAttribute('class','trophy_image');
	var img = document.createElement('IMG');
	img.setAttribute('src',teamObj.imgUrl);
	imgHolder.appendChild(img);
	var seasonDiv = document.createElement('DIV');
	holder.appendChild(seasonDiv);
	seasonDiv.setAttribute('class','trophy_season');
	seasonDiv.innerHTML = teamObj.text;
	var textDiv = document.createElement('DIV');
	holder.appendChild(textDiv);
	textDiv.setAttribute('class','trophy_text');
	textDiv.innerHTML = teamObj.bText;
	
	if(trophyDiv.firstChild){
		trophyDiv.insertBefore(holder,trophyDiv.firstChild);
	}else{
		trophyDiv.appendChild(holder);
	}
};

window.setTimeout(function(){
	main();
},0);