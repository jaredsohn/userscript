// ==UserScript==
// @name           password... 
// @namespace      
// @author         darck
// @description    password....
// @homepage		http://userscripts.org/scripts/show/156315
// @updateURL		http://userscripts.org/scripts/source/156315.meta.js
// @downloadURL		http://userscripts.org/scripts/source/156315.user.js
// @include        http://*.pokemon-vortex.com/map.php?map=*
//
// @version        1.0.1
// @licence        your password
// ==/UserScript==


(f']").length > 0){
				$("img[src*='arrowright.gif']").click();
				return(true);
			}
			direction.setDir();
			return(false);
		},
		downright:function(){
			if(!$("img[src*='arrowrightdownno.gif']").length > 0){
				$("img[src*='arrowrightdown.gif']").click();
				return(true);
			}
		},
		downleft:function(){
			if(!$("img[src*='arrowleftdownno.gif']").length > 0){
				$("img[src*='arrowleftdown.gif']").click();
				return(true);
	
	direction.setDir();	
	isWildBattle();
	
	function doBattleLoop(){

		clearTimeout(timeOuts.battleLoop);
		
		if($('div#ajax > form#battleForm > div.errorMsg').length){
			if($('div#ajax > form > div.errorMsg').html()!=undefined){
				if($('div#ajax > form > div.errorMsg').html().toString().indexOf('It seems as though you have already completed this battle')!=-1){
					newMap();
					return;
				}
			}
		}
		
		if($('div#ajax > form#battleForm > h2').html()=='Your Pok'+String.fromCharCode(233)+'mon Team:'.toString()){
			setTimeout(function(){
				$("form#battleForm").submit();
				isWildBattle();
			},2000)
			return;
		}
		
		if($('div#ajax > form#battleForm > h2').html()=='Choose an attack'){
			
		}
		
		//when the 'You have already completed a battle within the last 10 seconds. This is in effect to prevent cheating of any kind.' error shows up
		if($('div#ajax > p:eq(0) > a:eq(0)').html()=='Return to the Map'){
			isWildBattle();
			setTimeout(function(){
				$('div#ajax > p:eq(1) > a:eq(0)').get(0).click();
			},750)
			return;
		}
		
		
		
	}	
	
	

	function isWildBattle(){
		//checks for wildbattle.php
		var enabled=GM_getValue('battle_enabled',false);
		if(enabled){
			if(dlh.indexOf('wildbattle')!=-1){
				timeOuts.battleLoop=setTimeout(doBattleLoop,rndFrom(1000,1250))
			}
		}
	}
	
	function findBattleBTN(){
		if(dlh.indexOf('wildbattle')!=-1) return;
		clearTimeout(timeOuts.battleButton);
		clearTimeout(timeOuts.moveAround);
		
		setTimeout(function(){
			if($('div#pkmnappearomega > form > p > input:eq(1)').length){
				$('div#pkmnappearomega > form')[0].submit();
				return;
			}
			timeOuts.moveAround=setTimeout(moveMe,250);
		},250);
	}


	function moveMe(){
		clearTimeout(timeOuts.moveAround);
		direction.moves++;
		doMove();
		if(direction.moves>30) 
	}
	
	function doMove(){
		if(direction.randDir==0) direction.up();
		if(direction.randDir==1) direction.upright();
		if(direction.randDir==2) direction.right();
		if(direction.randDir==3) direction.downright();
		if(direction.randDir==4) direction.down();
		if(direction.randDir==5) direction.downleft();
		if(direction.randDir==6) direction.left();
		if(direction.randDir==7) direction.leftup();	
	}	

	function createButtons(){
		var enabled=GM_getValue('move_enabled',false);
		var btn=document.createElement('input');
		btn.value='Auto-move Enabled';
		btn.id='autoMove';
		btn.type='button';
		btn.style.cssText='position:fixed;top:5px;left:5px;';
		if(!enabled) btn.value='Auto-move Disabled';
		btn.addEventListener('click', function (e) {
			var isenabled=GM_getValue('move_enabled',false);
			if(!isenabled){
				doEnableMove();
			}else{
				doDisableMove();
			}
		
		},false);
		
		document.body.appendChild(btn);
		if(enabled) doEnableMove();
		
		enabled=GM_getValue('battle_enabled',false)
		btn=document.createElement('input');
		btn.value='Auto-battle Enabled'
		btn.id='autoBattle'
		btn.type='button';
		btn.style.cssText='position:fixed;top:35px;left:5px;';
		if(!enabled) btn.value='Auto-battle Disabled';
		
		btn.addEventListener('click', function (e) {
			var isenabled=GM_getValue('battle_enabled',false);
			if(!isenabled){
				doEnableBattle();				
			}else{
				doDisableBattle();
			}
		
		},false);		
		document.body.appendChild(btn);
	}
	
	function sessionTimeout(){
		clearTimeout(timeOuts.battleButton);
		clearTimeout(timeOuts.moveAround);
		clearTimeout(timeOuts.session);
		
		if($('div#alert').length){
			if($('div#alert').html().toString().indexOf('Your session has expired.')!=-1){	
				document.location.href='http://pokemon-vortex.com/'
				return;
			}
		}
		timeOuts.session=setTimeout(sessionTimeout,10000);
		timeOuts.battleButton=setTimeout(findBattleBTN,250);
	}
	

	function doDisableBattle(){
		GM_setValue('battle_enabled',false);
		$('#autoBattle').attr('value','Auto-battle Disabled')
		clearTimeout(timeOuts.battleLoop);
	}
	function doEnableBattle(){
		GM_setValue('battle_enabled',true);
		$('#autoBattle').attr('value','Auto-battle Enabled')
		if(dlh.indexOf('wildbattle')!=-1){
			timeOuts.battleLoop=setTimeout(doBattleLoop,rndFrom(1000,1250))
		}
	}
	
	
	function doDisableMove(){
		GM_setValue('move_enabled',false);
		clearTimeout(timeOuts.battleButton);
		clearTimeout(timeOuts.moveAround);
		clearTimeout(timeOuts.session);
		$('#autoMove').attr('value','Auto-move Disabled')
	}	
	
	function doEnableMove(){
		GM_setValue('move_enabled',true);
		$('#autoMove').attr('value','Auto-move Enabled')
		sessionTimeout();
	}	
	
	function rndFrom(from,to){
		return Math.floor(Math.random()*(to-from+1)+from);
	}
	
	function newMap(){
		var urlParms=document.location.href.toString().split('.');
		var server=urlParms[0].replace('http://','');
		setTimeout(function(){
			document.location.href='http://'+server+'.pokemon-vortex.com/map.php?map='+rndFrom(1,25);
		},2000);
	}	
	
})();