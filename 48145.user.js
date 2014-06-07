// ==UserScript==
// @name           HoboScript (Decoded) updated
// @namespace      hobowars
// @description    Updated to work with FBHW at level 7211
// @author         Xyan Flux
// @author         CrackFiend
// @version        2.0.0
// @include        http://*hobowars.com/game/*
// @include        http://www.mike01.com/hoboscript/configure.php?*
// @include        http://www.hobowars.com/fb/game.php* 
// @include        http://*facebook.com/hobowars/game.php*
// @include        http://apps.facebook.com/*
// @include        http://www.hobowars.com/fb/game.php?* 
// ==/UserScript==

try{
	function addCommas(a){
		var b='';if(a<0){b='-';a=Math.abs(a)}a=''+a;
		if(a.length>3){
			var c=a.length%3;
			var d=(c>0?(a.substring(0,c)):'');
			for(i=0;i<Math.floor(a.length/3);i++){
				if((c==0)&&(i==0)){
					d+=a.substring(c+3*i,c+3*i+3);
				}else{
					d+=','+a.substring(c+3*i,c+3*i+3);
				}
			}
			return b+d;
		}else{
			return b+a;
		}
	};

	var hbwLivingUrl=/^.+cmd=$/;
	var hbwRatsUrl=/^.+cmd=rats$/;
	var hbwRatsUrls=/^.+cmd=rats.*$/;
	var hbwBoardViewUrl=/^.+board=\d.*$/;
	var hbwUniUrl=/^.+cmd=uni.*$/;
	var hbwLinkerUrl=/^.+linker\.php\?.*$/;
	var configUrl=/^http:\/\/www\.mike01\.com\/hoboscript\/configure\.php.+/;
	var configBase="http://www.mike01.com/hoboscript/configure.php?";
	var scriptName='HoboScript';
	var scriptVersion='1.0';
	var scriptAuthor='CrackFiend (415085)';

	function encodeRE(s){
		return s.replace(/([.*+?^${}()|[\]\/\\])/g,'\\$1');
	};

	function addFooter(){
		var a=document.createElement('div');
		a.innerHTML='Using '+scriptName+' v'+scriptVersion+' by '+scriptAuthor+'.    <a href="'+configBase+'" target="_blank">Configuration Options</a> <a href="http://www.mike01.com/hoboscript/" target="_blank">Website</a>';
		a.style.textAlign='center';
		document.body.appendChild(a);
	};

	if(document.location.href.match(configUrl)){
		document.title=scriptName+' v'+scriptVersion+' Configuration';
		document.body.innerHTML='';
		document.body.style.background='white';
		document.body.innerHTML='<h3>Configuration Options</h3>';
		if(document.location.href.match(/^.*toggleDD$/)){
			GM_setValue('displayDD',Math.abs(GM_getValue('displayDD',0)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleC$/)){
			GM_setValue('displayC',Math.abs(GM_getValue('displayC',1)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleNC$/)){
			GM_setValue('displayNC',Math.abs(GM_getValue('displayNC',1)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleLP$/)){
			GM_setValue('displayLP',Math.abs(GM_getValue('displayLP',1)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleNR$/)){
			GM_setValue('displayNR',Math.abs(GM_getValue('displayNR',1)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleAW$/)){
			GM_setValue('displayAW',Math.abs(GM_getValue('displayAW',1)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleNW$/)){
			GM_setValue('displayNW',Math.abs(GM_getValue('displayNW',1)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleRI$/)){
			GM_setValue('displayRI',Math.abs(GM_getValue('displayRI',1)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleSB$/)){
			GM_setValue('displaySB',Math.abs(GM_getValue('displaySB',1)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleBB$/)){
			GM_setValue('displayBB',Math.abs(GM_getValue('displayBB',0)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleST$/)){
			GM_setValue('displayST',Math.abs(GM_getValue('displayST',1)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*toggleFastLinker$/)){
			GM_setValue('fastLinker',Math.abs(GM_getValue('fastLinker',1)-1));
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*setWPAdditional$/)){
			var wpString=prompt('Enter comma seperated win percentages you wish to see listed:',GM_getValue('WPAdditional',"80,50,35"));
			if(wpString!=null){
				var wpArray=wpString.split(',');
				wpArray=wpArray.filter(function(a,b,c){var d=parseInt(a);return(d>0&&d<100)});
				wpArray=wpArray.map(function(a,b,c){return parseInt(a)});
				wpNewString=wpArray.join(',');
				GM_setValue('WPAdditional',wpNewString);
			}
			document.location.replace(configBase);
		}if(document.location.href.match(/^.*setUniLock$/)){
			var uniString=prompt('Enter the number to lock university:\n1. Speed\n2. Power\n3. Strength\n0. Disabled',GM_getValue('uniLock',0));
			if(uniString!=null){
				var uniInt=parseInt(uniString);
				switch(uniInt){
					case 0:default:GM_setValue('uniLock',0);break;
					case 1:case 2:case 3:GM_setValue('uniLock',uniInt);
				}
			}
			document.location.replace(configBase);
		}
		document.body.innerHTML+='<ul><li>Display Donator Days (No longer needed on HBW1): [<a href="'+configBase+'toggleDD">'+(GM_getValue('displayDD',0)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Display Cans Value: [<a href="'+configBase+'toggleC">'+(GM_getValue('displayC',1)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Display Next Level Cans Value: [<a href="'+configBase+'toggleNC">'+(GM_getValue('displayNC',1)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Display Leveling Progress: [<a href="'+configBase+'toggleLP">'+(GM_getValue('displayLP',1)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Display Stat Balance: [<a href="'+configBase+'toggleSB">'+(GM_getValue('displaySB',1)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Display Stat Total (Str+Spd+Pow): [<a href="'+configBase+'toggleST">'+(GM_getValue('displayST',1)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Display Respect Ring Bonus Level Progress: [<a href="'+configBase+'toggleNR">'+(GM_getValue('displayNR',1)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Display Accurate Win %: [<a href="'+configBase+'toggleAW">'+(GM_getValue('displayAW',1)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Display Next Win % Progress: [<a href="'+configBase+'toggleNW">'+(GM_getValue('displayNW',1)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Show Progress on the Following Win %: [<a href="'+configBase+'setWPAdditional">'+(GM_getValue('WPAdditional',"80,50,35").length>1?GM_getValue('WPAdditional',"80,50,35"):"None")+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Display Extra Rat Info: [<a href="'+configBase+'toggleRI">'+(GM_getValue('displayRI',1)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Bold Current Page At Bottom of Board (No longer needed on HBW1): [<a href="'+configBase+'toggleBB">'+(GM_getValue('displayBB',0)?'Enabled':'Disabled')+'</a>]</li></ul>';
		document.body.innerHTML+='<ul><li>Make linker redirect instantly: [<a href="'+configBase+'toggleFastLinker">'+(GM_getValue('fastLinker',0)?'Enabled':'Disabled')+'</a>]</li></ul>';
		var uniLock='Disabled';
		switch(GM_getValue('uniLock',0)){
			case 0:break;
			case 1:uniLock='Speed';break;
			case 2:uniLock='Power';break;
			case 3:uniLock='Strength';break;
		}
		document.body.innerHTML+='<ul><li>Lock University To (Prevents Misclicks): [<a href="'+configBase+'setUniLock">'+uniLock+'</a>]</li></ul>';
	}

	if(document.location.href.match(hbwLinkerUrl)&&GM_getValue('fastLinker',1)){
		var linkerMatches=document.location.href.match(/^.+?linker\.php\?url=(.*)$/);
		document.location.href=linkerMatches[1];
	}

	if(document.location.href.match(hbwLivingUrl)){
		if(GM_getValue('displayLP',1)){
			var expPercentMsg='<br />';
			var expInfo=document.body.innerHTML.match(/Exp: ([\d,]+)\/([\w,]+)<br>/);
			var expEarned;
			var expNeeded
			if(expInfo[2]!='inf'){
			    expEarned=parseInt(expInfo[1].replace(/,/g,''));
			    expNeeded=parseInt(expInfo[2].replace(/,/g,''));
			}else{
			    expEarned='inf'
			    expNeeded='inf'
			}
			var expPercentMsg='';
			var expRemainingMsg='';
			if(expInfo[2]!='inf'){
			    expPercentMsg=(expEarned/expNeeded*100).toFixed(2)+'%<br />';
			    expRemainingMsg='Need '+addCommas(expNeeded-expEarned)+' exp to level up.<br />';
			}else{
			    expPercentMsg='0%<br />';
			    expRemainingMsg='Need infinate exp to level up.<br />';
			}
			document.body.innerHTML=document.body.innerHTML.replace(/(Exp: [\d,]+\/[\w,]+)<br>/,"$1 "+expPercentMsg+expRemainingMsg);
		}
		var d=new Date();
		var t=d.getTime();
		var d=new Date();
		var winLossInfo=document.body.innerHTML.match(/Won\/Lost: <.*?>([\d,]+)\/([\d,]+)/);
		var wins=parseInt(winLossInfo[1].replace(/,/g,''));
		var losses=parseInt(winLossInfo[2].replace(/,/g,''));
		var totalFights=wins+losses;
		var fightDifference=0;
		var allowedMsg='';
		var actualPercent=(wins/totalFights*100).toFixed(5);

		if(GM_getValue('displayAW',1)){
			allowedMsg+="Accurate Win Percent: "+actualPercent+"%<br />";
		}
		if(GM_getValue('displayNW',1)){
			var nextPercent=Math.floor(actualPercent)+1;
			fightDifference=Math.round((totalFights*(nextPercent/100)-wins)*(1/(1-(nextPercent/100))));
			allowedMsg+="You need "+fightDifference+" wins to reach "+nextPercent+"%<br />";
		}
		var winPercentagesString=GM_getValue('WPAdditional',"80,50,35");
		if(winPercentagesString!=""){
			var winPercentages=winPercentagesString.split(',');
			winPercentages=winPercentages.map(function(a,b,c){return((parseFloat(a)/100).toFixed(2))});
			for(var i=0;i<winPercentages.length;i++){
				if(actualPercent>=winPercentages[i]*100){
					fightDifference=Math.floor((wins/winPercentages[i])-totalFights);
					allowedMsg+="You can lose "+fightDifference+" fights and maintain "+(winPercentages[i]*100)+"%<br />";
				}else{
					fightDifference=Math.round(((totalFights*winPercentages[i])-wins)*(1/(1-winPercentages[i])));
					allowedMsg+="You need "+fightDifference+" wins to reach "+(winPercentages[i]*100)+"%<br />";
				}
			}
		}
		document.body.innerHTML=document.body.innerHTML.replace(/(Won\/Lost: <.*>[\d,]+?\/[\d,]+?.*?\(\d+%\)<br>)/,"$1 "+allowedMsg);
		var hoboStats=document.body.innerHTML.match(/Respect.*?>([-\d,]+)[\w\s\W]*?Speed: ([\d.]+)<br>[\W]*?Power: ([\d.]+)<br>[\W]*?Strength: ([\d.]+)<br>[\W]*?Begging: ([\d.]+)<br>[\W]*?Intelligence: ([\d.]+)/);
		var respect=parseInt(hoboStats[1].replace(/,/g,''));
		var speed=parseFloat(hoboStats[2]);
		var power=parseFloat(hoboStats[3]);
		var strength=parseFloat(hoboStats[4]);
		var begging=parseFloat(hoboStats[5]);
		var intel=parseFloat(hoboStats[6]);
		if(GM_getValue('displayNR',1)){
			var respectNeeded=0;
			var absRespect=Math.abs(respect);
			var respectSign=respect/absRespect;
			var respectLevels=new Array(25000,50000,100000,200000,400000,800000,1600000,3200000,5000000,8000000,14000000,20000000,30000000);
			if(absRespect<respectLevels[respectLevels.length-1]){
				for(var i=0;i<respectLevels.length;i++){
					if(absRespect<respectLevels[i]){
						respectNeeded=respectSign*(respectLevels[i]-absRespect);
						break;
					}
				}
			}
			document.body.innerHTML=document.body.innerHTML.replace(/(Respect.*?)(<.*>)([-\d,]+)(<.+>)(.+?<br>)/,"$1$2$3$4$5 "+"$2"+addCommas(respectNeeded)+"$4 to next ring bonus.<br />");
		}

		if(GM_getValue('displaySB',1)||GM_getValue('displayST',1)){
			var statTotal=speed+power+strength;
			var speedPercent=Math.round((speed/statTotal)*100);
			var strengthPercent=Math.round((strength/statTotal)*100);
			var powerPercent=Math.round((power/statTotal)*100);
			var statBalanceMsg='';var statTotalMsg='';
			if(GM_getValue('displaySB',1)){
				statBalanceMsg="Spd "+speedPercent+"% Pwr "+powerPercent+"% Str "+strengthPercent+"%<br />";
			}
			if(GM_getValue('displayST',1)){
				statTotalMsg="Stat Total: "+statTotal.toFixed(2)+"<br />";
			}
			document.body.innerHTML=document.body.innerHTML.replace(/(Speed\*: [\d,]+ ~ [\d,]+<br>)/,"$1 "+statBalanceMsg+statTotalMsg);
		}

		if(GM_getValue('displayC',1)||GM_getValue('displayNC',1)){
			var canMultiplier=0.1*Math.floor(intel/50)+1;
			var canMatch=document.body.innerHTML.match(/Cans: ([\d,]+?)<br>/);
			var cans=parseInt(canMatch[1].replace(/,/g,''));
			var hoboLevel=parseInt(document.body.innerHTML.match(/Level: ([\d]+?)<br>/)[1]);
			var levelCanValue=0;
			var nextLevelCanValue=0;
			var nextLevel=hoboLevel+1;
			if(hoboLevel<199){
				levelCanValue=Math.round(canMultiplier*(hoboLevel-Math.floor((hoboLevel-1)/5)+7));
				nextLevelCanValue=Math.round(canMultiplier*(nextLevel-Math.floor((nextLevel-1)/5)+7));
			}else{
				levelCanValue=(500.5/3)*canMultiplier+(canMultiplier/2)*((hoboLevel-199)-Math.floor((hoboLevel-196)/5));
				nextLevelCanValue=(500.5/3)*canMultiplier+(canMultiplier/2)*((nextLevel-199)-Math.floor((nextLevel-196)/5));
			}
			var canMsg='';
			var nextCanMsg='';
			if(GM_getValue('displayC',1)){
				canMsg=" Value: $$"+addCommas(Math.floor(levelCanValue*cans))+"<br />";
			}
			if(GM_getValue('displayNC',1)){
				nextCanMsg=" Next Lv: $$"+addCommas(Math.floor(nextLevelCanValue*cans))+"<br />";
			}
			document.body.innerHTML=document.body.innerHTML.replace(/(Cans.*?[\d,]+?<br>)/g,"$1 "+canMsg+nextCanMsg);
		}

		if(GM_getValue('displayDD',0)){
			var donatorDaysInfo=document.body.innerHTML.match(/title=.([\d,]+) donator days left/);
			if(donatorDaysInfo){
				document.body.innerHTML=document.body.innerHTML.replace(/(Name: .*?\(\d+\)<br>)/,"$1 "+donatorDaysInfo[1]+" donator days remaining<br/ >");
			}
		}

		addFooter();
	}

	if(document.location.href.match(hbwRatsUrls)){
		if(GM_getValue('displayRI',1)&&document.body.innerHTML.match(/General Info:/)){
			var ratInfo=document.body.innerHTML.match(/<b>Age(?:<.*?>){3,5}(\d+)[\w\d\W]+?Level(?:<.*?>){3,5}(\d+)[\w\d\W]+?Skill p.(?:<.*?>){3,5}(\d+)[\w\d\W]+?Stat p.(?:<.*?>){3,5}(\d+)[\w\d\W]+?Lifespan(?:<.*?>){3,5}(\d+)[\w\d\W]+?Hunger(?:<.*?>){3,5}(\d+)\/(\d+)[\w\d\W]+?Energy(?:<.*?>){3,5}(\d+)\/(\d+)[\w\d\W]+?Vitality(?:<.*?>){3,5}([.\d]+)[\w\d\W]+?Agility(?:<.*?>){3,5}([.\d]+)[\w\d\W]+?Strength(?:<.*?>){3,5}([.\d]+)[\w\d\W]+?Consent.(?:<.*?>){3,5}([.\d]+)/);
			var ratAge=parseInt(ratInfo[1]);
			var ratLevel=parseInt(ratInfo[2]);
			var ratVit=parseFloat(ratInfo[10]);
			var ratAgl=parseFloat(ratInfo[11]);
			var ratStr=parseFloat(ratInfo[12]);
			var ratCon=parseFloat(ratInfo[13]);
			var ratIndexValue=ratLevel*5+ratVit/4+ratAgl+ratStr+ratCon;
			var ratNextIndex=(50-(ratIndexValue%50)).toFixed(2);
			var ratIndex=Math.floor(ratIndexValue/50)+1;
			ratIndexValue=ratIndexValue.toFixed(2);
			document.body.innerHTML=document.body.innerHTML.replace(/(<tr.*?>)Age((?:<.*?>))(\d+)(.*<\/tr>)/,"$1Age$2$3$4$1Index$2"+ratIndex+"$4$1Index Pts.$2"+ratIndexValue+"$4$1Next Index$2"+ratNextIndex+"$4");
			addFooter();
		}
	}

	if(document.location.href.match(hbwBoardViewUrl)){
		if(GM_getValue('displayBB',0)){
			var pageResult=document.body.innerHTML.match(/\[Page: .*?([\w\W\s])<b>(<a.+?>)(\d+)<\/a><\/b>.*?\]/);
			if(pageResult){
				var matchRegex=new RegExp(encodeRE(pageResult[2]+pageResult[3]),"g");
				document.body.innerHTML=document.body.innerHTML.replace(matchRegex,"<b>"+pageResult[2]+pageResult[3]+"</a></b>");
			}
			addFooter();
		}
	}

	if(document.location.href.match(hbwUniUrl)){
		if(GM_getValue('uniLock',0)!=0){
			var uniReplace='do=int';
			var lockedTo="Intel";
			switch(GM_getValue('uniLock',0)){
				case 1:uniReplace='do=spd';lockedTo="Speed";break;
				case 2:uniReplace='do=pow';lockedTo="Power";break;
				case 3:uniReplace='do=str';lockedTo="Strength";break;
			}
			document.body.innerHTML=document.body.innerHTML.replace(/do=(str|spd|pow|reset)/g,uniReplace);
			document.body.innerHTML=document.body.innerHTML.replace(/Reset \[([0-3]) left\]/,"Reset [<a href=\""+configBase+"setUniLock\" target=\"_blank\">Locked</a>]");
			document.body.innerHTML=document.body.innerHTML.replace(/Train (Strength|Power|Speed)/g,"Train "+lockedTo);
			addFooter();
		}
	}
}catch(e){}