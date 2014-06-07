// ==UserScript==
// @author 		 XoooX
// @name           Gondal AllInOne
// @namespace      http://userscripts.org/scripts/show/55469
// @description 	 Dieser Script laesst deinen Krieger vollautomatisch Arenakaempfe austragen (vorerst nur einen Gegner) und aber auch vollautomatisch Quests erledigen (mit der option Machtsteine zu investieren oder nicht)! WICHTIG, in der Scriptdatei gibt es einige Variablen die angepasst werden mÃ¼ssen!
// @copyright 	 XoooX - the ultimate milk drinker
// @version 	 0.1.7

// @include        http://w1.gondal.de/fights/start*
// @include        http://w1.gondal.de/fights/waitFight*
// @include        http://w1.gondal.de/fights/results/*
// @include        http://w1.gondal.de/fights/fight*
// @include        http://w1.gondal.de/quests/start*
// @include        http://w1.gondal.de/quests/fight*
// @include        http://w1.gondal.de/quests/results*
// @include        http://w1.gondal.de/quests/endText*
// @include        http://w1.gondal.de/quests/wait*
// @include        http://w1.gondal.de/quests/finish*
// @include        http://w1.gondal.de/services/index/gold*

// ==/UserScript==
/* ####################VARIABLEN################### */
var url3 = window.location.pathname;

/* Anzugreifendes Ziel */
var aim = "";		//Wenn feld leergelassen wird, dann wird automatisch der letzte aus der kampfarenaliste ausgewählt

/* Automatischer Intervall zum Neuladen der fight/waitFight - Site und quests/wait - Site und des Progressbar bei Quest Gegner */
var timeout = 27; 		//seconds
var progressBarTimeOut = 5; 	//seconds

/* QUEST ID 0 = quest ohne gegner(leicht) und QUEST FLAG 1 = quest mit gegner(schwer)*/
var questID = 1;			

/* Dieser QuestFlag dient dazu, weiter zu Questen wenn Tageslimit erreicht wurde */
var questFlag = 0; 		// 0 = keine weiteren // 1 = weitere Quests machen (Machtsteine investieren)

var goldHours = 15;
/* #####################END OF VARIABLEN################### */




/* Bereich Kampfarena */
if(url3.indexOf("fights/start") != "-1"){
       if( (document.getElementById("CharacterName").value == "" || document.getElementById("CharacterName").value == null) && aim != ""){
		document.getElementById("CharacterName").value = aim;
       	document.forms[1].submit();
	 } else {//bereich
		if(aim != "")var tmp = document.getElementsByTagName("td")[49].innerHTML;
		else var tmp = document.getElementsByTagName("td")[49].innerHTML;
		
	 	//alert(tmp);
       	var endPos = tmp.lastIndexOf("\"");
       	tmp = tmp.slice(0,endPos);
      	var startPos = tmp.lastIndexOf("/");
       	tmp = tmp.substr(startPos+1,endPos);
		//alert(tmp);
       	window.location.href = "http://"+window.location.hostname+"/fights/start/"+tmp;
	 }
} else if (url3.indexOf("fights/results") != "-1") {
       window.location.href = "http://"+window.location.hostname+"/fights/start/";
} else if (url3.indexOf("fights/fight") != "-1") {
       //window.location.href = "http://"+window.location.hostname+"/fights/start/";
	 var tmp = document.getElementsByTagName("a")[17].href;
	 //alert(tmp);
	 //window.setTimeout(function() { window.location.href = tmp; },timeout * 1000);
	 window.location.href = tmp;	 
} else if (url3.indexOf("fights/waitFight") != "-1") {
       //setTimeout(20000);
       //window.location.href = "http://"+window.location.hostname+"/fights/start/";
	 document.getElementById("tip1").innerHTML = timeout;
	 window.setTimeout(function() { window.location.href = "http://"+window.location.hostname+"/fights/start"; },timeout * 1000);	 
}

/* Bereich Quests */
if(url3.indexOf("quests/start") != "-1"){
	var limitReached;
	var tmpLimit = document.getElementById("wrapper").innerHTML;
	if (tmpLimit.indexOf("Tageslimit") == "-1") {
		limitReached = false;
	} else {
		limitReached = true;
	}
	if(limitReached == false){
		if(questID == 0){
			unsafeWindow.chooseQuest(1);
			
			var quest = unsafeWindow.quests[0];
    		  	document.getElementById('questGiver').src = quest.giver;
      		document.getElementById('questTitle').innerHTML = quest.title;
	      	document.getElementById('questText').innerHTML = quest.description;
	      	document.getElementById('questDuration').innerHTML = quest.duration;
	      	document.getElementById('questTitle').style.color = unsafeWindow.questTypeColors[quest.type];
	      	document.getElementById('questGold').innerHTML = quest.gold;
	      	document.getElementById('questXP').innerHTML = quest.xp;
			
			var questId = unsafeWindow.quests[0].questId;
			window.location.href = "http://"+window.location.hostname+"/quests/start/" + questId;	
		} else if(questID == 1){
			unsafeWindow.chooseQuest(2);
			
			var quest = unsafeWindow.quests[1];
	      	document.getElementById('questGiver').src = quest.giver;
	      	document.getElementById('questTitle').innerHTML = quest.title;
	      	document.getElementById('questText').innerHTML = quest.description;
	      	document.getElementById('questDuration').innerHTML = quest.duration;
	      	document.getElementById('questTitle').style.color = unsafeWindow.questTypeColors[quest.type];
	      	document.getElementById('questGold').innerHTML = quest.gold;
	      	document.getElementById('questXP').innerHTML = quest.xp;
			
			var questId = unsafeWindow.quests[1].questId;
			window.location.href = "http://"+window.location.hostname+"/quests/start/" + questId;
		} else {
			alert("Please change the Quest-ID. It is the wrong number!")
		}
	} else {
		if(questFlag != 1){
			alert("Quest Limit erreicht!\nMÃ¶chtest du trotz Limit weiter Questen dann Ã¤ndere das Questflag auf 1!");
		} else {
			//alert("Weitere Quest erledigen!");
			if(questID == 0){
				unsafeWindow.chooseQuest(1);
			
				var quest = unsafeWindow.quests[0];
    			  	document.getElementById('questGiver').src = quest.giver;
      			document.getElementById('questTitle').innerHTML = quest.title;
		      	document.getElementById('questText').innerHTML = quest.description;
		      	document.getElementById('questDuration').innerHTML = quest.duration;
		      	document.getElementById('questTitle').style.color = unsafeWindow.questTypeColors[quest.type];
		      	document.getElementById('questGold').innerHTML = quest.gold;
		      	document.getElementById('questXP').innerHTML = quest.xp;
				
				var questId = unsafeWindow.quests[0].questId;
				window.location.href = "http://"+window.location.hostname+"/quests/start/" + questId;	
			} else if(questID == 1){
				unsafeWindow.chooseQuest(2);
			
				var quest = unsafeWindow.quests[1];
		      	document.getElementById('questGiver').src = quest.giver;
		      	document.getElementById('questTitle').innerHTML = quest.title;
		      	document.getElementById('questText').innerHTML = quest.description;
		      	document.getElementById('questDuration').innerHTML = quest.duration;
		      	document.getElementById('questTitle').style.color = unsafeWindow.questTypeColors[quest.type];
		      	document.getElementById('questGold').innerHTML = quest.gold;
		      	document.getElementById('questXP').innerHTML = quest.xp;
				
				var questId = unsafeWindow.quests[1].questId;
				window.location.href = "http://"+window.location.hostname+"/quests/start/" + questId;
			} else {
				alert("Please change the Quest-ID. It is the wrong number!")
			}
		}
	}
} else if (url3.indexOf("quests/fight") != "-1") {
	var tmp = document.getElementById("wrapper").innerHTML;
		//alert(tmp);
	var endPos = tmp.lastIndexOf("'); this");
     	tmp = tmp.slice(0,endPos);
		//alert(tmp);
      var startPos = tmp.lastIndexOf("/quests/results/");
      tmp = tmp.substr(startPos+16,endPos);//start erhÃ¶ht da such string Ã¼berbrÃ¼ckt werden muss
		//alert(tmp);
	unsafeWindow.startProgressBar(progressBarTimeOut*1000, '/quests/results/'+tmp);      
} else if (url3.indexOf("quests/results/") != "-1" || url3.indexOf("quests/endText") != "-1" || url3.indexOf("quests/finish") != "-1") {
	document.getElementById("tip1").innerHTML = timeout;
	window.location.href = "http://"+window.location.hostname+"/quests/start";	 
} else if (url3.indexOf("quests/wait") != "-1") {
	document.getElementById("tip1").innerHTML = timeout;
	window.setTimeout(function() { window.location.href = "http://"+window.location.hostname+"/quests/start"; },timeout * 1000);	 
}

