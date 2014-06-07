// ==UserScript==
// @name           Public Player Data Upload
// @version        2.6.0
// @author         Gryphon
// @downloadURL    https://userscripts.org/scripts/source/165372.user.js
// @updateURL      https://userscripts.org/scripts/source/165372.meta.js
// @description    Public Player Data Upload
// @grant          none 
// @include        http*://prodgame*.alliances.commandandconquer.com/*/index.aspx*

// ==/UserScript==

function playerdata() {  
	var myVar=setInterval(function(){myTimer()},120000);
	function myTimer() {
		//var playerData = JSON.stringify(ClientLib.Data.MainData.GetInstance().get_Alliance().GetMember(PlayerId));
		var city = ClientLib.Data.MainData.GetInstance().get_Cities().get_CurrentOwnCity();//all player cities
		var player = ClientLib.Data.MainData.GetInstance().get_Player();//player data
		var alliance = ClientLib.Data.MainData.GetInstance().get_Alliance();//alliance data
		var server = ClientLib.Data.MainData.GetInstance().get_Server();//server data
		var AccountId = player.accountId;
		var Faction = player.get_FactionFolder().toUpperCase();
		var PlayerId = player.id;
		var PlayerName = player.name;
		var PlayerRank = player.get_OverallRank();
		var PlayerScore = player.get_ScorePoints();
		var AllianceId = player.allianceId;
		var AllianceName = city.get_AllianceName();
		var AllianceAbbr = alliance.get_Abbreviation();
		var AllianceRank = alliance.get_Rank();
		var getRole = alliance.get_CurrentMemberRoleInfo().Name; 
		if (getRole == "Leader") { 
			var AllianceRole = "CiC"; 
		} 
		else if (getRole == "Second Commander") { 
			var AllianceRole = "SiC"; 
		} 
		else {
			var AllianceRole = getRole;
		}
		var AllianceDesc = alliance.get_Description();
		var WorldId = server.get_WorldId();
		var WorldName = server.get_Name();
 
		var xhr;  
		if (window.XMLHttpRequest) { // Mozilla, Safari, ...  
			xhr = new XMLHttpRequest();  
		} else if (window.ActiveXObject) { // IE 8 and older  
			xhr = new ActiveXObject("Microsoft.XMLHTTP");  
		}  
		var data = "AccountId=" + AccountId + "&PlayerId=" + PlayerId + "&PlayerName=" + PlayerName + "&Faction=" + Faction + "&AllianceId=" + AllianceId + "&AllianceName=" + AllianceName + "&AllianceAbbr=" + AllianceAbbr + "&AllianceRank=" + AllianceRank + "&AllianceRole=" + AllianceRole + "&WorldId=" + WorldId + "&WorldName=" + WorldName + "&PlayerRank=" + PlayerRank + "&PlayerScore=" + PlayerScore;  
		xhr.open("POST", "http://tiberiumalliances.thesanders.net/test.php", true);   
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");                    
		xhr.send(data);  
	}  
};

function waitForClientLib(){
    
    qx = unsafeWindow["qx"];
    ClientLib = unsafeWindow["ClientLib"];
    webfrontend = unsafeWindow["webfrontend"];
	
    if ((typeof ClientLib == 'undefined') || (typeof qx == 'undefined') || (qx.core.Init.getApplication().initDone == false)) {
        setTimeout(waitForClientLib, 1000);
        return;
    }
    else{    
        playerdata();
    }  
}
function startup(){
    
	setTimeout(waitForClientLib, 1000);
};
startup();