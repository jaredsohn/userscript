// ==UserScript==
// @name           Castle Age Monster Manager
// @namespace        Castle Age_MM 
// @include        http://apps.facebook.com/castle_age/*
// @include        http://*.facebook.com/castle_age/*
// @include        https://web3.castleagegame.com/castle_ws/*
// @include        http://75.126.76.147/castle/*
// @include        http://web.castleagegame.com/castle/*
// @include        https://www.facebook.com/dialog/apprequests*
// @require        http://code.jquery.com/jquery-1.4.2.min.js
// @version        1
// @description    Manager your monsters at battle_monster.php
// ==/UserScript==

function clear_world() {
	
	button8.disabled="disabled";
var answer = confirm("This will delete all monster in your temp list permanently.... Click OK to confirm");
	if (answer){
		$.jStorage.set("extra_monster", new Array);
		window.location = "http://apps.facebook.com/castle_age/battle_monster.php";
	}
	else{
		alert("Abort!");
	}
}

function extra_monster(){
	
	button8.disabled="disabled";
	var extralist = $.jStorage.get("extra_monster", new Array());
	var coLink = new Array();
	var coLinkcounter=0;
	var tool,tool2;
	if(extralist.length==0) {
	allLinks = document.evaluate("//div/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	if(thisLink.toString().indexOf("battle_monster.php?casuser=")>0) {
	if(($(thisLink).children()[0].src.indexOf('dragon_list_btn_3')>=0)&&(thisLink.toString().indexOf("mpool=3")>-1)) {
		remove = thisLink.toString().replace("casuser","remove_list");
		chrome.extension.sendRequest({name:'new', url:remove},
     function(response)
     {
		chrome.extension.sendRequest({name:'close', id:response.tabid.toString(), delay:$.jStorage.get("Delay", 0.5).toString()});
     });

		extralist[coLinkcounter] = $($($(thisLink).parent()).parent()).parent().html();
			coLinkcounter++;
			$($($($(thisLink).parent()).parent()).parent()).remove();
	}
	}
	}//for
	$.jStorage.set("extra_monster", extralist);
	extra = jQuery("table.layout");
		size = $(extra.children(0).children(0).children(0).children(0)[8].children(2)).children().length;
		for(i=coLinkcounter;i>=0;i--) {
			if(i==coLinkcounter){
				tool = document.createElement("div");
				
		tool.innerHTML = '<div class="mseperator"; style="height: 50px;">the lost monsters</div>';
		$(tool).insertAfter($($(extra.children(0).children(0).children(0).children(0)[8].children(2)).children()[size-2]));
			}else {
				$(extralist[i]).insertAfter($('.mseperator'));
			}
		}
		
	}else {
		allLinks = document.evaluate("//div/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < allLinks.snapshotLength; i++) {
		thisLink = allLinks.snapshotItem(i);
		if(thisLink.toString().indexOf("battle_monster.php?casuser=")>0) {
		if(($(thisLink).children()[0].src.indexOf('dragon_list_btn_3')>=0)&&(thisLink.toString().indexOf("mpool=3")>-1)) {
		remove = thisLink.toString().replace("casuser","remove_list");
		chrome.extension.sendRequest({name:'new', url:remove},
     function(response)
     {
		chrome.extension.sendRequest({name:'close', id:response.tabid.toString(), delay:$.jStorage.get("Delay", 0.5).toString()});
     });
	 extralist.push($($($(thisLink).parent()).parent()).parent().html());
	 //console.log("exlist ="+extralist.length+" : "+extralist);
			$($($($(thisLink).parent()).parent()).parent()).remove();
		}
		}
		}
		$.jStorage.set("extra_monster", extralist);
		
		extra = jQuery("table.layout");
		if(window.location.href.indexOf("web3.castleagegame.com")>-1) {
		size = $(extra.children(0).children(0).children(0).children(0)[8].children(2)).children().length;
		//console.log("size ="+size+"extralist ="+extralist.length);
		}
		for(i=extralist.length;i>=0;i--) {
			if(i==extralist.length){
				if(window.location.href.indexOf("facebook.com")>-1) {
				tool = document.createElement("div");
			tool.innerHTML = '<div style="overflow: hidden; z-index: 5; border: 1px solid; opacity: 1; background-color: rgb(68, 68, 68); float: left; position: absolute; width: 837px; height: 2014px; top: 287px; margin-left: 181px;"'+
							'</div><div class="mseperator2" style="height: 50px;">the lost monsters</div>';
							jQuery('div#mainContainer').prepend(tool);
				}
		if(window.location.href.indexOf("web3.castleagegame.com")>-1) {
			tool = document.createElement("div");
				tool.innerHTML = '<div class="mseperator" style="height: 50px;">the lost monsters</div>';
		$(tool).insertAfter($($(extra.children(0).children(0).children(0).children(0)[8].children(2)).children()[size-2]));
		}
			}else {
				if(window.location.href.indexOf("web3.castleagegame.com")>-1) {
				$(extralist[i]).insertAfter($('.mseperator'));
				
				}else {
					$(extralist[i]).insertAfter($('.mseperator2'));
				}
			}

		}
	}


	
}

function _start() {
	console.log("bae = "+document.baseURI);
	var navbar;
	if((window.location.href == "http://apps.facebook.com/castle_age/battle_monster.php"))
	{   

		navbar = document.getElementById('app46755028429_equippedGeneralContainer');
		
		var logo = document.createElement("div");

	
	logo.innerHTML = '<div style="overflow: hidden; z-index: 5; border: 1px solid; opacity: 1; background-color: rgb(68, 68, 68); float: left; position: absolute; width: 437px; height: 214px; top: 87px; margin-left: 181px;'+
    'color: white;" >' +
    '<font style=""><table border="0" bordercolor="" width="0" bgcolor="">' +
	'<tr>' + '<td>' +
    '<font style="font-size:10px;">Check Monsters </font>' + '</td>' + '<td>' +
    '<input id="btn1" name="CM" type="button" value="Check Monster" style="width: 10em;";/><font style="font-size:10px;">Delay = </font><input type="text" title="Delay in second" id ="bdelay" name="delay" style="text-align:center; width: 3em;"; />' + '</td>' + '</tr>' +
    '<tr>' + '<td>' +
    '<font style="font-size:10px;">Collect Rewards From Skaar </font>' + '</td>' + '<td>' +
    '<input id="btn2" name="CR1" type="button" value="Process!" style="width: 10em;";/><input id="btn7" title="Collect All!" name="CR7" type="button" value="All" style="width: 3em;";/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
	'<font style="font-size:10px;">Collect Rewards From Serpents/Dragons </font>' + '</td>' + '<td>' +
    '<input id="btn3" name="CR2" type="button" value="Process!" style="width: 10em;";/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    '<font style="font-size:10px;">Collect Rewards FromW World Monsters </font>' + '</td>' + '<td>' +
    '<input id ="btn4" name="DM" type="button" value="Process!" style="width: 10em"/>' + '</td>' + '</tr>' +
	'<tr>'+ '<td>' +
	'<font style="font-size:10px;">Delete All collected Monsters </font>' + '</td>' + '<td>' +
    '<input id ="btn5" name="DM" type="button" value="Remove Monsters" style="width: 10em"/>' + '</td>' + '</tr>' +
	'<tr>'+ '<td>' +
    '<font style="font-size:10px;">Remove World Monster! </font>' + '</td>' + '<td>' +
    '<input id ="rw" name="rw" type="button" value="Add to new List" style="width: 10em"/><input id ="cw" name="rw" type="button" value="Remove all from list" style="width: 10em"/>' + '</td>' + '</tr>' +
    '</table></font>' +
    '</div>';
	//jQuery('div#app46755028429_main_bn_container').prepend(logo);
	jQuery('div#mainContainer').prepend(logo);
	//navbar.parentNode.insertBefore(logo, navbar);
	var delay=document.getElementById("bdelay");
	delay.value = $.jStorage.get("Delay", 0.5);
	console.log(delay.value);
	delay.addEventListener("change",function() {
		console.log("d = "+delay.value);
		$.jStorage.set("Delay", delay.value);},false);
	
	button1=document.getElementById("btn1");
	button1.addEventListener("click", checkMonsters, false);
	button2=document.getElementById("btn2");
	button2.addEventListener("click", collectRewardsSkaar, false);
	button3=document.getElementById("btn3");
	button3.addEventListener("click", collectRewardsSerpent, false);
	button4=document.getElementById("btn4");
	button4.addEventListener("click", collectRewardsWorld, false);
	button5=document.getElementById("btn5");
	button5.addEventListener("click", delMonster, false);
	//button6=document.getElementById("btn6");
	//button6.addEventListener("click", countFavor, false);
	button7=document.getElementById("btn7");
	button7.addEventListener("click", collectRewardsAll, false);
	button8=document.getElementById("rw");
	button8.addEventListener("click", extra_monster, false);
	button9=document.getElementById("cw");
	button9.addEventListener("click", clear_world, false);
	}else if(window.location.href == "http://web3.castleagegame.com/castle_ws/battle_monster.php")
	{
		navbar = document.getElementById('equippedGeneralContainer');
		var logo = document.createElement("div");

	logo.innerHTML = '<div style="overflow: hidden; z-index: 5; border: 1px solid; opacity: 1; background-color: rgb(68, 68, 68); float: left; position: absolute; width: 437px; height: 194px; top: 87px; margin-left: 181px;'+
    'color: white;" >' +
    '<table border="0" bordercolor="" width="0" bgcolor="">' +
	'<tr>' + '<td>' +
    '<font style="font-size:10px;">Check Monsters </font>' + '</td>' + '<td>' +
    '<input id="btn1" name="CM" type="button" value="Check Monster" style="width: 10em;";/><input type="text" title="Delay in second" id ="bdelay" name="delay" style="text-align:center; width: 3em;"; />' + '</td>' + '</tr>' +
    '<tr>' + '<td>' +
    '<font style="font-size:10px;">Collect Rewards From Skaar </font>' + '</td>' + '<td>' +
    '<input id="btn2" name="CR1" type="button" value="Process!" style="width: 10em;";/><input id="btn7" title="Collect All!" name="CR7" type="button" value="All" style="width: 3em;";/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
	'<font style="font-size:10px;">Collect Rewards From Serpents/Dragons </font>' + '</td>' + '<td>' +
    '<input id="btn3" name="CR2" type="button" value="Process!" style="width: 10em;";/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    '<font style="font-size:10px;">Collect Rewards FromW World Monsters </font>' + '</td>' + '<td>' +
    '<input id ="btn4" name="DM" type="button" value="Process!" style="width: 10em"/>' + '</td>' + '</tr>' +
	'<tr>'+ '<td>' +
	'<font style="font-size:10px;">Delete All collected Monsters </font>' + '</td>' + '<td>' +
    '<input id ="btn5" name="DM" type="button" value="Remove Monsters" style="width: 10em"/>' + '</td>' + '</tr>' +
	'<tr>'+ '<td>' +
	'<font style="font-size:10px;">Remove World Monster! </font>' + '</td>' + '<td>' +
    '<input id ="rw" name="rw" type="button" value="Add to new List" style="width: 10em"/><input id ="cw" name="rw" type="button" value="Remove all from list" style="width: 10em"/>' + '</td>' + '</tr>' +
    '</table></font>' +
    //'<font style="font-size:10px;">Count Favor Points! </font>' + '</td>' + '<td>' +
    //'<input id ="btn6" name="FC" type="button" value="Count" style="width: 10em"/>' + '</td>' + '</tr>' +
    '</table>' +
    '</div>';
	jQuery('div#main_bn_container').prepend(logo);
	var delay=document.getElementById("bdelay");
	delay.value = $.jStorage.get("Delay", 0.5);
	console.log(delay.value);
	delay.addEventListener("change",function() {
		console.log("d = "+delay.value);
		$.jStorage.set("Delay", delay.value);},false);
	
	button1=document.getElementById("btn1");
	button1.addEventListener("click", checkMonsters, false);
	button2=document.getElementById("btn2");
	button2.addEventListener("click", collectRewardsSkaar, false);
	button3=document.getElementById("btn3");
	button3.addEventListener("click", collectRewardsSerpent, false);
	button4=document.getElementById("btn4");
	button4.addEventListener("click", collectRewardsWorld, false);
	button5=document.getElementById("btn5");
	button5.addEventListener("click", delMonster, false);
	//button6=document.getElementById("btn6");
	//button6.addEventListener("click", countFavor, false);
	button7=document.getElementById("btn7");
	button7.addEventListener("click", collectRewardsAll, false);
	button8=document.getElementById("rw");
	button8.addEventListener("click", extra_monster, false);
	button9=document.getElementById("cw");
	button9.addEventListener("click", clear_world, false);
	}else if(window.location.href == "http://web3.castleagegame.com/castle_ws/festival_tower.php" || window.location.href == "http://web3.castleagegame.com/castle_ws/festival_tower2.php")
	{
		
		navbar = document.getElementById('equippedGeneralContainer');
		var logo = document.createElement("div");

	logo.innerHTML = '<div style="overflow: hidden; z-index: 5; border: 1px solid; opacity: 1; background-color: rgb(68, 68, 68); float: left; position: absolute; width: 437px; height: 174px; top: 107px; margin-left: 181px;'+
    'color: white;" >' +
    '<font style=""><table border="0" bordercolor="" width="0" bgcolor="">' +
	'<tr>' + '<td>' +
    '<font style="font-size:10px;">Check Monsters </font>' + '</td>' + '<td>' +
    '<input id="btn1" name="CM" type="button" value="Check Monster" style="width: 10em;";/><input type="text" title="Delay in second" id ="bdelay" name="delay" style="text-align:center; width: 3em;"; />' + '</td>' + '</tr>' +
    '<tr>' + '<td>' +
	'<font style="font-size:10px;">Collect All Rewards</font>' + '</td>' + '<td>' +
    '<input id="btn7" title="Collect All!" name="CR7" type="button" value="Collect All" style="width: 10em;";/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    '<font style="font-size:10px;">Delete! </font>' + '</td>' + '<td>' +
    '<input id ="btn6" name="DM" type="button" value="Delete" style="width: 10em"/>' + '</td>' + '</tr>' +
   '</table></font>' +
    '</div>';
	jQuery('div#main_bn_container').prepend(logo);
	//navbar.parentNode.insertBefore(logo, navbar);
	var delay=document.getElementById("bdelay");
	delay.value = $.jStorage.get("Delay", 0.5);
	console.log(delay.value);
	delay.addEventListener("change",function() {
		console.log("d = "+delay.value);
		$.jStorage.set("Delay", delay.value);},false);
	
	button1=document.getElementById("btn1");
	button1.addEventListener("click", checkMonsters2, false);
	button6=document.getElementById("btn6");
	button6.addEventListener("click", delete2, false);
	button7=document.getElementById("btn7");
	button7.addEventListener("click", collectRewardsAll2, false);

	}else if(window.location.href == "http://apps.facebook.com/castle_age/festival_tower.php" || window.location.href == "http://apps.facebook.com/castle_age/festival_tower2.php")
	{
		console.log("test");
		navbar = document.getElementById('app46755028429_equippedGeneralContainer');
		var logo = document.createElement("div");

	logo.innerHTML = '<div style="overflow: hidden; z-index: 5; border: 1px solid; opacity: 1; background-color: rgb(68, 68, 68); float: left; position: absolute; width: 437px; height: 174px; top: 107px; margin-left: 181px;'+
    'color: white;" >' +
    '<font style=""><table border="0" bordercolor="" width="0" bgcolor="">' +
	'<tr>' + '<td>' +
    '<font style="font-size:10px;">Check Monsters </font>' + '</td>' + '<td>' +
    '<input id="btn1" name="CM" type="button" value="Check Monster" style="width: 10em;";/><input type="text" title="Delay in second" id ="bdelay" name="delay" style="text-align:center; width: 3em;"; />' + '</td>' + '</tr>' +
    '<tr>' + '<td>' +
	'<font style="font-size:10px;">Collect All Rewards </font>' + '</td>' + '<td>' +
    '<input id="btn7" title="Collect All!" name="CR7" type="button" value="Collect All" style="width: 10em;";/>' + '</td>' + '</tr>' +
    '<tr>'+ '<td>' +
    '<font style="font-size:10px;">Remove dead </font>' + '</td>' + '<td>' +
    '<input id ="btn6" name="DM" type="button" value="Remove" style="width: 10em"/>' + '</td>' + '</tr>' +
   '</table></font>' +
    '</div>';
	jQuery('div#app46755028429_main_bn_container').prepend(logo);
	//navbar.parentNode.insertBefore(logo, navbar);
	var delay=document.getElementById("bdelay");
	delay.value = $.jStorage.get("Delay", 0.5);
	console.log(delay.value);
	delay.addEventListener("change",function() {
		console.log("d = "+delay.value);
		$.jStorage.set("Delay", delay.value);},false);
	
	button1=document.getElementById("btn1");
	button1.addEventListener("click", checkMonsters2, false);
	button6=document.getElementById("btn6");
	button6.addEventListener("click", delete2, false);
	button7=document.getElementById("btn7");
	button7.addEventListener("click", collectRewardsAll2, false);
	}

};//start()

function delMonster() {
		var id = new Array();
		var idRemove = new Array();
		var num =0;
		var num2 =0;
	var allLinks, thisLink, count=0;
	//disableAllButton();
	allLinks = document.evaluate("//a[@href]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	if(thisLink.href.indexOf('remove_list')>0) {
		var temp_id;
		temp_id = thisLink.toString();
		temp_id = temp_id.replace("http://web3.castleagegame.com/castle_ws/battle_monster.php?remove_list=", "");
		temp_id = temp_id.replace("http://apps.facebook.com/castle_age/battle_monster.php?remove_list=", "");
		temp_id = temp_id.replace("&mpool=1", "");
		temp_id = temp_id.replace("&mpool=2", "");
		temp_id = temp_id.replace("&mpool=3", "");
		count++;
		id[num] = temp_id;
		num++;
	} else if((thisLink.href.indexOf('casuser')>0) && (($(thisLink).children()[0]).src.indexOf('dragon_list_btn_4')>0)) {

			var temp_id;
			temp_id = thisLink.toString();
			temp_id = temp_id.replace("http://apps.facebook.com/castle_age/battle_monster.php?casuser=", "");
			temp_id = temp_id.replace("http://web3.castleagegame.com/castle_ws/battle_monster.php?casuser=", "");
			temp_id = temp_id.replace("&mpool=1", "");
			temp_id = temp_id.replace("&mpool=2", "");
			temp_id = temp_id.replace("&mpool=3", "");
			var j = 0;
			while(j <= num) {
				if(id[j]==temp_id) {
					idRemove[num2]=temp_id;
						num2++;
				if(allLinks.snapshotItem(i-1).href.indexOf('remove_list')>0) {
				performClick(allLinks.snapshotItem(i-1));
				}
			}
			j++;
			}
		//window.location='http://apps.facebook.com/castle_age/battle_monster.php';
	}

	}//letJQuery
};

function collectRewardsSkaar() {
	var windowObjectReference;  
	var allLinks, thisLink, count=0;
	var coLink = new Array();
	var coLinkcounter = 0;
	disableAllButton();
allLinks = document.evaluate("//div/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
if(thisLink.toString().indexOf("battle_monster.php?casuser=")>0) {
	if($(thisLink).children()[0].src.indexOf('dragon_list_btn_2')>=0) {
		thisLink = thisLink.toString();
		id=thisLink.substring(thisLink.indexOf('casuser=')+8,thisLink.indexOf('&mpool'));
		mpool = thisLink.substring(thisLink.length-1, thisLink.length);
		if(mpool=='1') {
			if(window.location.href.indexOf("apps.facebook.com")>-1) {
		thisLink = 'http://apps.facebook.com/castle_age/battle_monster.php?'+'casuser='+id+'&mpool='+mpool;
		}else if(window.location.href.indexOf("web3.castleagegame.com")>-1) {
			thisLink = 'http://web3.castleagegame.com/castle_ws/battle_monster.php?'+'casuser='+id+'&mpool='+mpool;
		}
			coLink[coLinkcounter] = thisLink;
			coLinkcounter++;
		}
	}
	}
	}
  var j = 0;
  var intervalID = window.setInterval(function() { collectReward(); }, $.jStorage.get("Delay", 0.5)*1000);
	function collectReward()  {  
		if(j<coLink.length) {
			thisLink = coLink[j];
			thisLink = thisLink.toString().replace('http://apps.facebook.com/castle_age/battle_monster.php?','http://apps.facebook.com/castle_age/battle_monster.php?mm&');
			thisLink = thisLink.toString().replace('http://web3.castleagegame.com/castle_ws/battle_monster.php?','http://web3.castleagegame.com/castle_ws/battle_monster.php?mm&');
			thisLink = thisLink+'&action=collectReward';
			chrome.extension.sendRequest({name:'new', url:thisLink.toString()},
     function(response)
     {
		//console.log(response.tabid);
		chrome.extension.sendRequest({name:'close', id:response.tabid.toString(), delay:$.jStorage.get("Delay", 0.5).toString()});
     });
			/*windowObjectReference = window.open(thisLink+'&action=collectReward',  
                  "Test Window",  
                  "resizable=yes,scrollbars=yes,status=yes");*/

			j++;
		
		} else {
			window.clearInterval(intervalID);
			//alert("Rewards Collecting done!");
			if(window.location.href.indexOf('apps.facebook.com')>0) {
			window.location='http://apps.facebook.com/castle_age/battle_monster.php';
			}else if (window.location.href.indexOf('web3.castleagegame.com')>0)
			{
				window.location='http://web3.castleagegame.com/castle_ws/battle_monster.php';
			}
		}
		};

	};
	//}//if

function collectRewardsWorld() {
	var windowObjectReference;  
	var allLinks, thisLink, count=0;
	var coLink = new Array();
	var coLinkcounter = 0;
	disableAllButton();
	allLinks = document.evaluate("//div/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	if(thisLink.toString().indexOf("battle_monster.php?casuser=")>0) {
	if($(thisLink).children()[0].src.indexOf('dragon_list_btn_2')>=0) {
		thisLink = thisLink.toString();
		id=thisLink.substring(thisLink.indexOf('casuser=')+8,thisLink.indexOf('&mpool'));
		mpool = thisLink.substring(thisLink.length-1, thisLink.length);
		if(mpool=='3') {
			if(window.location.href.indexOf("apps.facebook.com")>-1) {
		thisLink = 'http://apps.facebook.com/castle_age/battle_monster.php?'+'casuser='+id+'&mpool='+mpool;
		}else if(window.location.href.indexOf("web3.castleagegame.com")>-1) {
			thisLink = 'http://web3.castleagegame.com/castle_ws/battle_monster.php?'+'casuser='+id+'&mpool='+mpool;
		}
			coLink[coLinkcounter] = thisLink;
			coLinkcounter++;
		}
	}
	}
	}
  var j = 0;
  var intervalID = window.setInterval(function() { collectReward(); }, $.jStorage.get("Delay", 0.5)*1000);
	function collectReward()  {  
		if(j<coLink.length) {
			thisLink = coLink[j];
			thisLink = thisLink.toString().replace('http://apps.facebook.com/castle_age/battle_monster.php?','http://apps.facebook.com/castle_age/battle_monster.php?mm&');
			thisLink = thisLink.toString().replace('http://web3.castleagegame.com/castle_ws/battle_monster.php?','http://web3.castleagegame.com/castle_ws/battle_monster.php?mm&');
			thisLink = thisLink+'&action=collectReward';
			//console.log(thisLink);
			chrome.extension.sendRequest({name:'new', url:thisLink.toString()},
     function(response)
     {
		//console.log(response.tabid);
		chrome.extension.sendRequest({name:'close', id:response.tabid.toString(), delay:$.jStorage.get("Delay", 0.5).toString()});
     });
		/*	windowObjectReference = window.open(thisLink+'&action=collectReward',  
                  "Test Window",  
                  "resizable=yes,scrollbars=yes,status=yes");*/

			j++;
		
		} else {
			window.clearInterval(intervalID);
			//alert("Rewards Collecting done!");
			if(window.location.href.indexOf('apps.facebook.com')>0) {
			window.location='http://apps.facebook.com/castle_age/battle_monster.php';
			}else if (window.location.href.indexOf('web3.castleagegame.com')>0)
			{
				window.location='http://web3.castleagegame.com/castle_ws/battle_monster.php';
			}
		}
		};

	};
	//}//if



function collectRewardsSerpent() {
	var windowObjectReference;  
	var allLinks, thisLink, count=0;
	var coLink = new Array();
	var coLinkcounter = 0;
	disableAllButton();
	allLinks = document.evaluate("//div/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
if(thisLink.toString().indexOf("battle_monster.php?casuser=")>0) {
	if($(thisLink).children()[0].src.indexOf('dragon_list_btn_2')>=0) {
		thisLink = thisLink.toString();
		id=thisLink.substring(thisLink.indexOf('casuser=')+8,thisLink.indexOf('&mpool'));
		mpool = thisLink.substring(thisLink.length-1, thisLink.length);
		if(mpool=='2') {
			if(window.location.href.indexOf("apps.facebook.com")>-1) {
		thisLink = 'http://apps.facebook.com/castle_age/battle_monster.php?'+'casuser='+id+'&mpool='+mpool;
		}else if(window.location.href.indexOf("web3.castleagegame.com")>-1) {
			thisLink = 'http://web3.castleagegame.com/castle_ws/battle_monster.php?'+'casuser='+id+'&mpool='+mpool;
		}
			coLink[coLinkcounter] = thisLink;
			coLinkcounter++;
		}
	}
	}
	}
  var j = 0;
  var intervalID = window.setInterval(function() { collectReward(); }, $.jStorage.get("Delay", 0.5)*1000);
	function collectReward()  {  
		if(j<coLink.length) {
			thisLink = coLink[j];
			thisLink = thisLink.toString().replace('http://apps.facebook.com/castle_age/battle_monster.php?','http://apps.facebook.com/castle_age/battle_monster.php?mm&');
			thisLink = thisLink.toString().replace('http://web3.castleagegame.com/castle_ws/battle_monster.php?','http://web3.castleagegame.com/castle_ws/battle_monster.php?mm&');
			thisLink = thisLink+'&action=collectReward';
			chrome.extension.sendRequest({name:'new', url:thisLink.toString()},
     function(response)
     {
		//console.log(response.tabid);
		chrome.extension.sendRequest({name:'close', id:response.tabid.toString(), delay:$.jStorage.get("Delay", 0.5).toString()});
     });

			j++;
		
		} else {
			window.clearInterval(intervalID);
			//alert("Rewards Collecting done!");
			if(window.location.href.indexOf('apps.facebook.com')>0) {
			window.location='http://apps.facebook.com/castle_age/battle_monster.php';
			}else if (window.location.href.indexOf('web3.castleagegame.com')>0)
			{
				window.location='http://web3.castleagegame.com/castle_ws/battle_monster.php';
			}
		}
		};

	};
	//}//if
function collectRewardsAll() {
	var windowObjectReference;  
	var allLinks, thisLink, count=0;
	var coLink = new Array();
	var coLinkcounter = 0;
	disableAllButton();
	allLinks = document.evaluate("//div/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
if(thisLink.toString().indexOf("battle_monster.php?casuser=")>0) {
	if($(thisLink).children()[0].src.indexOf('dragon_list_btn_2')>=0) {
		thisLink = thisLink.toString();
		id=thisLink.substring(thisLink.indexOf('casuser=')+8,thisLink.indexOf('&mpool'));
		mpool = thisLink.substring(thisLink.length-1, thisLink.length);
		if(window.location.href.indexOf("apps.facebook.com")>-1) {
		thisLink = 'http://apps.facebook.com/castle_age/battle_monster.php?'+'casuser='+id+'&mpool='+mpool;
		}else if(window.location.href.indexOf("web3.castleagegame.com")>-1) {
			thisLink = 'http://web3.castleagegame.com/castle_ws/battle_monster.php?'+'casuser='+id+'&mpool='+mpool;
		}
		coLink[coLinkcounter] = thisLink;
		coLinkcounter++;
	}
	}
	}
  var j = 0;
  var intervalID = window.setInterval(function() { collectReward(); }, $.jStorage.get("Delay", 0.5)*1000);
	function collectReward()  {  
		if(j<coLink.length) {
			thisLink = coLink[j];
			thisLink = thisLink.toString().replace('http://apps.facebook.com/castle_age/battle_monster.php?','http://apps.facebook.com/castle_age/battle_monster.php?mm&');
			thisLink = thisLink.toString().replace('http://web3.castleagegame.com/castle_ws/battle_monster.php?','http://web3.castleagegame.com/castle_ws/battle_monster.php?mm&');
			thisLink = thisLink+'&action=collectReward';
			chrome.extension.sendRequest({name:'new', url:thisLink.toString()},
     function(response)
     {
		chrome.extension.sendRequest({name:'close', id:response.tabid.toString(), delay:$.jStorage.get("Delay", 0.5).toString()});
     });
			j++;
		
		} else {
			window.clearInterval(intervalID);
			if(window.location.href.indexOf('apps.facebook.com')>0) {
				//window.location='http://apps.facebook.com/castle_age/battle_monster.php';
			}else if (window.location.href.indexOf('web3.castleagegame.com')>0)
			{
				window.location='http://web3.castleagegame.com/castle_ws/battle_monster.php';
			}
		}
		};

	};

	function collectRewardsAll2() {
	var windowObjectReference;  
	var allLinks, thisLink, count=0;
	var coLink = new Array();
	var coLinkcounter = 0;
	//disableAllButton();
	allLinks = document.evaluate("//a[@href]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

	if((thisLink.href.indexOf('casuser')>0) && (($(thisLink).children()[0]).src.indexOf('festival_monster_collectbtn')>0)) {
		
		coLink[coLinkcounter] = thisLink;
		coLinkcounter++;
		
	}
	}
  var j = 0;
  var intervalID = window.setInterval(function() { collectReward(); }, $.jStorage.get("Delay", 0.5)*1000);
	function collectReward()  {  
		if(j<coLink.length) {
			thisLink = coLink[j];
			thisLink = thisLink.toString().replace('http://apps.facebook.com/castle_age/battle_monster.php?','http://apps.facebook.com/castle_age/battle_monster.php?mm&');
			thisLink = thisLink.toString().replace('http://web3.castleagegame.com/castle_ws/battle_monster.php?','http://web3.castleagegame.com/castle_ws/battle_monster.php?mm&');
			thisLink = thisLink+'&action=collectReward';
			chrome.extension.sendRequest({name:'new', url:thisLink.toString()},
     function(response)
     {
		//console.log(response.tabid);
		chrome.extension.sendRequest({name:'close', id:response.tabid.toString(), delay:$.jStorage.get("Delay", 0.5).toString()});
     });
			/*windowObjectReference = window.open(thisLink+'&action=collectReward',  
                  "Test Window",  
                  "resizable=yes,scrollbars=yes,status=yes");*/

			j++;
		
		} else {
			window.clearInterval(intervalID);
			//alert("Rewards Collecting done!");
			if(window.location.href.indexOf('apps.facebook.com')>0) {
			window.location='http://apps.facebook.com/castle_age/festival_tower.php';
			}else if (window.location.href.indexOf('web3.castleagegame.com')>0)
			{
				if(window.location.href.indexOf('festival_tower2.php')>0) {
					window.location='http://web3.castleagegame.com/castle_ws/festival_tower2.php';
				}else {
				window.location='http://web3.castleagegame.com/castle_ws/festival_tower.php';
				}
			}
		}
		};

	};



function performClick(node) {
	if (!node)
		return;

	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	node.dispatchEvent(evt);
};

function checkMonsters() {
	//var windowObjectReference;  
	var coLink = new Array();
	var coLinkcounter = 0;
	var allLinks, thisLink, count=0;
	disableAllButton();
	//allLinks = document.evaluate("//div/form", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	allLinks = document.evaluate("//div/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
if(thisLink.toString().indexOf("battle_monster.php?casuser=")>0) {
	if($(thisLink).children()[0].alt == 'engage') {
		thisLink = thisLink.toString();
		id=thisLink.substring(thisLink.indexOf('casuser=')+8,thisLink.indexOf('&mpool'));
		mpool = thisLink.substring(thisLink.length-1, thisLink.length);
		if(window.location.href.indexOf("apps.facebook.com")>-1) {
		thisLink = 'http://apps.facebook.com/castle_age/battle_monster.php?'+'casuser='+id+'&mpool='+mpool;
		}else if(window.location.href.indexOf("web3.castleagegame.com")>-1) {
			thisLink = 'http://web3.castleagegame.com/castle_ws/battle_monster.php?'+'casuser='+id+'&mpool='+mpool;
		}
		coLink[coLinkcounter] = thisLink;
		coLinkcounter++;
	}
	}
	}
	var j =0;

	var intervalID = window.setInterval(function() { popup(); }, $.jStorage.get("Delay", 0.5)*1000);

	function popup()  
		{  
		var windowObjectReference;  
		if(j<coLink.length){
			thisLink = coLink[j];
			thisLink = thisLink.toString().replace('http://apps.facebook.com/castle_age/battle_monster.php?','http://apps.facebook.com/castle_age/battle_monster.php?mm&');
			thisLink = thisLink.toString().replace('http://web3.castleagegame.com/castle_ws/battle_monster.php?','http://web3.castleagegame.com/castle_ws/battle_monster.php?mm&');
			chrome.extension.sendRequest({name:'new', url:thisLink.toString()},
     function(response)
     {
		chrome.extension.sendRequest({name:'close', id:response.tabid.toString(), delay:$.jStorage.get("Delay", 0.5).toString()});
     });
			//chrome.tabs.create({"url":thisLink, "selected":true});
		/*windowObjectReference = window.open(thisLink,  
                  "Test Window",  
                  "resizable=yes,scrollbars=yes,status=yes");*/
		j++;

		}else {
			window.clearInterval(intervalID);
			if(window.location.href.indexOf('apps.facebook.com')>0) {
			window.location='http://apps.facebook.com/castle_age/battle_monster.php';
			}else if (window.location.href.indexOf('web3.castleagegame.com')>0)
			{
				window.location='http://web3.castleagegame.com/castle_ws/battle_monster.php';
			}
		}


		};

};
function checkMonsters2() {
	//var windowObjectReference;  
	var coLink = new Array();
	var coLinkcounter = 0;
	var allLinks, thisLink, count=0;
	//disableAllButton();
	allLinks = document.evaluate("//a[@href]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	if((thisLink.href.indexOf('casuser')>0) && (($(thisLink).children()[0]).src.indexOf('festival_monster_engagebtn')>0)) {
		coLink[coLinkcounter] = thisLink;
		console.log("link = "+thisLink);
		coLinkcounter++;
		
	}
	
	}
	var j =0;

	var intervalID = window.setInterval(function() { popup(); }, $.jStorage.get("Delay", 0.5)*1000);

	function popup()  
		{  
		var windowObjectReference;  
		if(j<coLink.length){
			thisLink = coLink[j];
			thisLink = thisLink.toString().replace('http://apps.facebook.com/castle_age/battle_monster.php?','http://apps.facebook.com/castle_age/battle_monster.php?mm&');
			thisLink = thisLink.toString().replace('http://web3.castleagegame.com/castle_ws/battle_monster.php?','http://web3.castleagegame.com/castle_ws/battle_monster.php?mm&');
			chrome.extension.sendRequest({name:'new', url:thisLink.toString()},
     function(response)
     {
		chrome.extension.sendRequest({name:'close', id:response.tabid.toString(), delay:$.jStorage.get("Delay", 0.5).toString()});
     });
			//chrome.tabs.create({"url":thisLink, "selected":true});
		/*windowObjectReference = window.open(thisLink,  
                  "Test Window",  
                  "resizable=yes,scrollbars=yes,status=yes");*/
		j++;

		}else {
			window.clearInterval(intervalID);
			//alert("Monsters Checking done!");
			if(window.location.href.indexOf('apps.facebook.com')>0) {
				window.location='http://apps.facebook.com/castle_age/festival_tower.php';
			}else if (window.location.href.indexOf('web3.castleagegame.com')>0)
			{
				if(window.location.href.indexOf('festival_tower2.php')>0) {
					window.location='http://web3.castleagegame.com/castle_ws/festival_tower2.php';
				}else {
				window.location='http://web3.castleagegame.com/castle_ws/festival_tower.php';
				}
			}
		}


		};

};

function delete2() {
	//var windowObjectReference;  
	var coLink = new Array();
	var coLinkcounter = 0;
	var allLinks, thisLink, count=0;
	//disableAllButton();
	allLinks = document.evaluate("//a[@href]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);
	if((thisLink.href.indexOf('casuser')>0) && (($(thisLink).children()[0]).src.indexOf('festival_monster_viewbtn')>0)) {
		coLink[coLinkcounter] = thisLink;
		//console.log("link = "+thisLink);
		coLinkcounter++;
		
	}
	}
	var j =0;

	var intervalID = window.setInterval(function() { popup(); }, $.jStorage.get("Delay", 0.5)*1000);

	function popup()  
		{  
		var windowObjectReference;  
		if(j<coLink.length){
			thisLink = coLink[j];
			thisLink = thisLink.toString().replace('http://apps.facebook.com/castle_age/battle_monster.php?','http://apps.facebook.com/castle_age/battle_monster.php?mm&');
			thisLink = thisLink.toString().replace('http://web3.castleagegame.com/castle_ws/battle_monster.php?','http://web3.castleagegame.com/castle_ws/battle_monster.php?mm&');
			chrome.extension.sendRequest({name:'new', url:thisLink.toString()},
     function(response)
     {
		chrome.extension.sendRequest({name:'close', id:response.tabid.toString(), delay:$.jStorage.get("Delay", 0.5).toString()});
     });
			//chrome.tabs.create({"url":thisLink, "selected":true});
		/*windowObjectReference = window.open(thisLink,  
                  "Test Window",  
                  "resizable=yes,scrollbars=yes,status=yes");*/
		j++;

		}else {
			window.clearInterval(intervalID);
			//alert("Monsters Checking done!");
			if(window.location.href.indexOf('apps.facebook.com')>0) {
			window.location='http://apps.facebook.com/castle_age/festival_tower.php';
			}else if (window.location.href.indexOf('web3.castleagegame.com')>0)
			{
				if(window.location.href.indexOf('festival_tower2.php')>0) {
					window.location='http://web3.castleagegame.com/castle_ws/festival_tower2.php';
				}else {
				window.location='http://web3.castleagegame.com/castle_ws/festival_tower.php';
				}
			}
		}


		};

};

function disableAllButton() {
	button1.disabled="disabled";
	button2.disabled="disabled";
	button3.disabled="disabled";
	button4.disabled="disabled";
	button5.disabled="disabled";
	//button6.disabled="disabled";
	button7.disabled="disabled";
};

function countFavor() {
	var favor = 0, item;
	if (window.location.href.indexOf('apps.facebook.com/castle_age')>0)
	{
		var fLinks = document.evaluate("//div[@style='padding: 30px 0pt 0pt 10px; float: left;']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}else if (window.location.href.indexOf('web3.castleagegame.com/castle_ws')>0)
	{
		var fLinks = document.evaluate("//div[@style='float:left;padding: 30px 0 0 10px;']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	//var fLinks = document.evaluate("//div[@style='padding: 30px 0pt 0pt 10px; float: left;']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	//console.log(fLinks.snapshotLength);
	for (var i = 0; i < fLinks.snapshotLength; i++) {
		item = fLinks.snapshotItem(i);
		favor = favor + parseInt((item.innerHTML.replace("You have been awarded ","")).replace(" Favor Points!",""));
		
	}
	/*var w = document.evaluate("//img[@src='http://image2.castleagegame.com/1492/graphics/water_small.jpg']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var wl;
	if(w.snapsnotItem!===null) {
		wl = w.snapshotLength;
	}*/
	alert("You got "+favor+" Favor Points!");
};


function dispatchLink(link) {
	window.location.href=link;
}
function extraMonster() {
	node ='<div style="height:61px;">' +
'<div style="clear: both;"></div>' +
'<div style="float: left; padding-left: 15px;overflow:hidden;"><div style="background-image: url(\'http://image4.castleagegame.com/graphics/hydra_head.jpg\');width:223px;height:61px;">' +
'</div>' +	
'</div>' +
'<div style="float:left;padding-left:11px;padding-top:2px;width:336px;height:59px;background-image: url(\'http://image4.castleagegame.com/graphics/dragon_list_gray.jpg\');">' +
'<div style="padding-top: 14px; font-size: 15px;"> <span style="color: #a6a6a6;">Daniel\'s Cronus, The World Hydra</span>'+
'	</div>'+
'</div>'+
'<div style="float: left; padding-left: 17px; padding-top: 4px; height: 59px; overflow: hidden;">' +
'<div class="imgButton"> <a href="battle_monster.php?casuser=786286877&amp;mpool=3" onclick="ajaxLinkSend(\'globalContainer\', \'battle_monster.php?casuser=786286877&amp;mpool=3\'); return false;"><img alt="engage" src="http://image4.castleagegame.com/graphics/dragon_list_btn_3.jpg"></a>	</div>'+
'</div>' +
'<div style="clear: both;"></div>' +
'</div>';
}

_start();