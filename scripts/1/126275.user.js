// ==UserScript==
// @name Goalhi Post Blocker
// @author revassez
// @version 1.4
// @create 2012-2-20
// @include http://bbs.goalhi.com/*
// @include http://bbs.hupu.com/*
// ==/UserScript==

(function(){

	var blocked=new Array(
		"桑巴王朝",
		"橙魂一生"
	);

	var blockedRegex=new Array(
		/桑巴王朝/,
		/橙魂一生/
	);

	var getUsername=function(floorDiv){
		
		var subDivs=floorDiv.getElementsByTagName('div');
		
		for(var i=0;i<subDivs.length;i++){
			if(subDivs[i].getAttribute('class')=='author'){
				return subDivs[i].firstChild.firstChild.innerHTML;
			}
		}
	};

	var isBlocked=function(username){

		for(var i=0;i<blocked.length;i++) {
			if (blocked[i] == username){
				return true;
			}
		}

		for(var i=0;i<blockedRegex.length;i++){
			if( blockedRegex[i].test(username) ){
				return true;
			}
		}

		return false;
	};

	var floors=document.getElementsByTagName('div');
	for(var i=0;i<floors.length;i++){
		if(floors[i].getAttribute('class')!='floor'){
			continue;
		}
		
		var floor=floors[i];
		var username=getUsername(floor);
		if(username!=undefined && isBlocked(username)){
			floor.style.display='none';
		}
	}

})();