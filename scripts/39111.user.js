// ==UserScript==
// @name       Sort Players On GLB Homepage
// @namespace  http://goallinebliz.com
// @include    http://goallineblitz.com/game/home.pl
// @include    http://goallineblitz.com/game/home.pl?user_id=*
// @version    08.12.22.2
// ==/UserScript==

/*
 *
 * written by forestmb@userscripts.org
 *
 * modified by pabst 12/22/08+
 *
 */

window.setTimeout( function() {

	function compare(a, b) {
		var item1 = a[0];
		var item2 = b[0];
		if (item1 < item2) return 1;
		if (item1 > item2) return -1;
		return 0;
	}


	function player(info,num) {
		//console.log(info.innerHTML);
		this.id= num;
		this.name = getElementsByClassName("playerhead",info)[0].firstChild.innerHTML;

		if(document.location.href=="http://goallineblitz.com") {
			var stringXp = getElementsByClassName("player_xp",info)[0].innerHTML.substring(0,getElementsByClassName("player_xp",info)[0].innerHTML.indexOf("/"));
			this.xp = parseFloat(stringXp);
			var stringVXp = getElementsByClassName("player_xp",info)[1].innerHTML.substring(0,getElementsByClassName("player_xp",info)[0].innerHTML.indexOf("/"));
			this.vxp = parseFloat(stringVXp);
		}
		else {
			var stringXp = "0";
			this.xp = parseFloat(stringXp);
			var stringVXp = "0";
			this.vxp = parseFloat(stringVXp);
		}

		var text;
		var levelText = getElementsByClassName("player_level",info)[0].innerHTML;
		this.level = parseFloat(levelText.substring(levelText.indexOf(".")+2));

		this.position = getElementsByClassName("position",info)[0].innerHTML;

		var trn = getElementsByClassName("player_vital_head",info)[1];
		if (trn != null) {
			this.training = parseInt(trn.parentNode.cells[1].innerHTML);
		}
		else {
			this.training = 0;
		}
		
		var links = info.getElementsByTagName("a");

		for(var i=0; i<links.length;i++) {
			var link = links[i];
			if(link.href.indexOf("/game/player.pl?player_id=")!=-1) {
				this.date = parseFloat(link.href.substring(link.href.indexOf("player_id=")+10));
			}
			if(link.href.indexOf("/game/team.pl?team_id=")!=-1)	{
				this.team = link.innerHTML;
			}
			if(link.href.indexOf("compare_teams.pl?")!=-1) {
				text = link.parentNode.innerHTML;
				var gameText = text.substring(text.indexOf("(in")+4,text.indexOf(")"));
				gameText = gameText.replace(/:/g,'');
				this.game = parseFloat(gameText);
			}
		}
		if(!this.game) {
			this.game=999999;
		}
		/*
		console.log("id="+this.id);	
		console.log("name="+this.name);	
		console.log("xp="+this.xp);	
		console.log("vxp="+this.vxp);	
		console.log("level="+this.level);	
		console.log("pos="+this.position);	
		console.log("date="+this.date);	
		console.log("team="+this.team);	
		console.log("game="+this.game);	
		console.log("training="+this.training);	
		*/
	}

	function testFunc(testing) {
		var testElement = document.createElement("p");
		testElement.innerHTML = testing;
		var testContainer = getElementsByClassName("medium_head subhead_head",document)[0];
        testContainer.appendChild(testElement);
	}

	function getElementsByClassName(classname, par)	{
		var a=[];   
		var re = new RegExp('\\b' + classname + '\\b');

		var els = par.getElementsByTagName("*");

		for(var i=0,j=els.length; i<j; i++) {       
			if(re.test(els[i].className)) {	
				a.push(els[i]);
			}
		}


		return a;
	};

	var playerInfo = getElementsByClassName("player_box",document);
	playerInfo = playerInfo.concat(getElementsByClassName("player_box_vet",document));
	
	var players = new Array();
	for(var i=0; i<playerInfo.length; i++) {
		players[i] = new player(playerInfo[i],i);
	}

	var container = getElementsByClassName("medium_head subhead_head",document)[0];
	var options = "<option value=''> Sort Players </option>";
	var sortTypes = new Array();
	sortTypes[0]="Alphabetical";
	sortTypes[1]="Next Game";
	sortTypes[2]="Team";
	sortTypes[3]="Position";
	sortTypes[4]="Level";
	sortTypes[5]="XP";
	sortTypes[6]="VXP";
	sortTypes[7]="Date Created";
	sortTypes[8]="Training";

	var saved = GM_getValue("type","0");
	for(var i=0; i<sortTypes.length; i++) {
		if(sortTypes[i]==saved)
			options+="<option value='"+sortTypes[i]+"' selected='selected'>"+sortTypes[i]+"</option>";	
		else
			options+="<option value='"+sortTypes[i]+"'>"+sortTypes[i]+"</option>";	
	}

	container.innerHTML = container.innerHTML +" | <select id='sortPlayers'>"+options+"</select> ";

	var oSelect = document.getElementById("sortPlayers");
	oSelect.addEventListener("change",sortList,true);

	var adOptions = "<option value='Descending'>Descending</option><option value='Ascending'>Ascending</option>";
	var adSE = document.createElement("select");
	adSE.id="adSelect";
	adSE.innerHTML=adOptions;
	var savedOrder = GM_getValue("sortOrder","0");
	if(savedOrder!="0")	{
		if(savedOrder=="Ascending") {
			adSE.options[1].selected = true;
		}
		else {
			adSE.options[0].selected = true;
		}
	}
	container.appendChild(adSE);

	var adSelectElement = document.getElementById("adSelect");
	adSelectElement.addEventListener("change",sortList,true);

	if(saved!="0") {
		sortList();	
	}
	
	function sortList() {
		var oSelect = document.getElementById("sortPlayers");
		var type = oSelect.options[oSelect.selectedIndex].value;

		var newOrder = new Array();

		if(type=="Alphabetical") {
			newOrder = sortKey("name","text");
		}
		else if(type=="Next Game") {
			newOrder = sortKey("game","num");
		}
		else if(type=="Team") {
			newOrder = sortKey("team","text");
		}
		else if(type=="Position") {
			newOrder = sortKey("position","text");
		}
		else if(type=="Level") {
			newOrder = sortKey("level","num");
		}
		else if(type=="XP") {
			newOrder = sortKey("xp","num");
		}
		else if(type=="VXP") {
			newOrder = sortKey("vxp","num");
		}
		else if(type=="Date Created") {
			newOrder = sortKey("date","num");
		}
		else if(type=="Training") {
			newOrder = sortKey("training","num");
		}
		if (type!="") {
			var box = document.getElementById("players");

			for(var i=0; i<newOrder.length; i++) {
				var side = i+1;
				if(side%2!=0) {
					newOrder[i].style.marginRight = "10px";
				}
				else {
					newOrder[i].style.marginRight= "0px";
				}
				box.appendChild(newOrder[i]); 
			}
			GM_setValue("type",type);
		}

	}

	function sortKey(k,sortVar) {

		var key = new Array(players.length);
		var sortedArray	= new Array();


		for(var i=0; i<players.length; i++)	{
			var toAdd;
			if(k=="position")
				toAdd = players[i].position;
			else if (k=="team")
				toAdd = players[i].team;
			else if (k=="name")
				toAdd = players[i].name;
			else if (k=="level")
				toAdd = players[i].level;
			else if (k=="xp")
				toAdd = players[i].xp;
			else if (k=="vxp")
				toAdd = players[i].vxp;
			else if (k=="game")
				toAdd = players[i].game;
			else if (k=="date")
				toAdd = players[i].date;
			else if (k=="training")
				toAdd = players[i].training;

			key[i] = new Array(2);
			key[i][0] = toAdd;
			key[i][1] = players[i].id;
		}

		if(sortVar=="text") {
			key.sort();
		}
		else if(sortVar == "num") {
			key.sort(compare);
		}

		var sortSelect = document.getElementById("adSelect");
		var sortOrder = sortSelect.options[sortSelect.selectedIndex].value;

		if(sortOrder=="Ascending") {
			key.reverse();
		}
		GM_setValue("sortOrder",sortOrder);

		for(var i=0; i<players.length; i++)	{
			sortedArray[i] = playerInfo[key[i][1]]; 
		}


		return sortedArray;
	}

},100);