// ==UserScript==
// @name TibiHouseLinker
// @description This will link all worlds and houses from the characters page and show who is online or offline on a guilds page
// @version 1.2.2.1
// @author Vixon
// @include http://www.tibia.com/community/?subtopic=characters*
// @include http://www.tibia.com/community/?subtopic=guilds*
// @require http://sizzlemctwizzle.com/updater.php?id=110699
// ==/UserScript==

var Data = Data = document.getElementsByTagName("td");
var Cities = ["Ab'Dendriel","Ankrahmun","Carlin","Darashia","Edron","Farmine","Kazordoon","Liberty Bay","Port Hope","Svargrond","Thais","Venore","Yalahar"];
var World = "";
var City = "";
var House = false;
var HouseName = "";
var HouseId = "";
var Members = -1;
var WhoIsWorld = "";
var PlayerName = new Array();
var PlayerStatus = new Array();

if(document.location.href.match(/characters/)){
	SetWorld();
	GetHouseCity();
	if(House == true){
		GetHouseCity();
		GetHouseName();
		GetHouseId();
	}
}

if(document.location.href.match(/guilds/)){
	GetPlayerNames();
	GetPlayerStatus();
}

function SetWorld(){
	for(i=0; i<Data.length; i++){
		if(Data[i].innerHTML == "World:"){
			i++;
			World = Data[i].innerHTML;
			Data[i].innerHTML = "<a href='http://www.tibia.com/community/?subtopic=worlds&world=" + Data[i].innerHTML + "'>" + Data[i].innerHTML + "</a>"
		}
		if(Data[i].innerHTML == "House:"){
			House = true;
		}
	}
}

function SetHouse(){
	for(i=0; i<Data.length; i++){
		if(Data[i].innerHTML == "House:"){
			i++;
			Data[i].innerHTML = "<a href=\"http://www.tibia.com/community/?subtopic=houses&page=view&world=" + World + "&town=" + City + "&houseid=" + HouseId + "\">" + HouseName + "</a>(" + City + ")" + "(<a href='http://tibia.wikia.com/wiki/Special:Search?search=" + HouseName + "'>TibiaWiki</a>)";
		}
	}
}

function SetPlayerStatus(x,Status){
	var Links = document.getElementsByTagName('A');
	PlayerStatus[x] = Status;
	for(i=0; i<Links.length; i++){
		if(Links[i].innerHTML.replace(/\&nbsp;/g, ' ') == PlayerName[x]){
			if(PlayerStatus[x] == 'Online'){
				Links[i].parentNode.innerHTML = Links[i].parentNode.innerHTML + " - " + "<b style='color: green'>" + PlayerStatus[x] + "</b>";
			}else{
				Links[i].parentNode.innerHTML = Links[i].parentNode.innerHTML + " - " + "<b style='color: red'>" + PlayerStatus[x] + "</b>";
			}
		}
	}
}

function GetHouseCity(){
	for(i=0; i<Data.length; i++){
		if(Data[i].innerHTML == "House:"){
			var Exp = new RegExp('(.*?) is', 'gi');
			i++;
			City = Exp.exec(Data[i].innerHTML);
			for(x=0; x<=Cities.length; x++){
				if(City[1].match(Cities[x])){
					City = Cities[x];
				}
			}
		}
	}
}

function GetHouseName(){
	for(i=0; i<Data.length; i++){
		if(Data[i].innerHTML == "House:"){
			i++;
			var x = 0;
			while(Data[i].innerHTML[x] + Data[i].innerHTML[x+1] != '(' + City[0]){
				HouseName += Data[i].innerHTML[x];
				x++;
			}
		}
	}
}

function GetHouseId(){
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://www.tibia.com/community/?subtopic=houses&world=" + World + "&town=" + City,
		onload: function(page){
			var Dom = page.responseText.replace(/\&#160;/g, ' ');
			var Exp1 = new RegExp('<TD WIDTH=40%>(.*?)</TD>', 'gi');
			var Exp2 = new RegExp('<INPUT TYPE=hidden NAME=houseid VALUE=(.*?)>', 'gi');
			var hName = "";
			var hId = "";
			var c = 0;
			while((hName = Exp1.exec(Dom)) != null){
				c++;
				hName[1] = hName[1].replace(/<NOBR>|<\/NOBR>/gi, '');
				if(hName[1].replace(/\s/gi, '') == HouseName.replace(/\s/gi, '')){
					for(i=0; i<=c/2-1; i++){
						hId = Exp2.exec(Dom);
					}
					HouseId = hId[1];
					SetHouse();
				}
			}
		}
	});
}

function GetPlayerNames(){
	var Dom = document.documentElement.innerHTML;
	var Exp1 = new RegExp('subtopic=characters&amp;name=(.*?)">', 'gi');
	var Exp2 = new RegExp('on (.*?) on', 'gi');
	var PageLinks = "";
	while((PageLinks = Exp1.exec(Dom)) != null){
		Members++;
		PlayerName[Members] = PageLinks[1].replace(/\+/g, ' ');
	}
	WhoIsWorld = "http://www.tibia.com/community/?subtopic=worlds&world=" + Exp2.exec(Dom)[1];
}

function GetPlayerStatus(){
	var x;
	GM_xmlhttpRequest({
		method: 'GET',
		url: WhoIsWorld,
		onload: function(page){
			for(x=0; x<=Members; x++){
				if(page.responseText.replace(/\&nbsp;/g, ' ').match(PlayerName[x])){
					SetPlayerStatus(x,'Online');
				}else{
					SetPlayerStatus(x,'Offline');
				}
			}
		}
	});
}