// ==UserScript==
// @name           GaiaOnline ~ Stalk your own tank
// @description    Stalks your own tank {* Or others *} on Gaia
// @include        *
// @version        1.0.2
// ==/UserScript==

function firstTimePage(){/* Coded by Absol */
	GM_openInTab('data:text/html;charset=utf-8,<html><head><title>First Run - GaiaOnline: Is It Glowing?</title></head><body><h1>Configuring Script</h1><img src="http://s3.amazonaws.com/uso_ss/8572/large.PNG"/><br/><h1>This is where to get the ID (If you don\'t know what I mean now you will soon)</h1><img src="http://i553.photobucket.com/albums/jj385/my_cat_rules/gettingTankId.png"></img><br/><h1>Uninstalling</h1><img src="http://i49.tinypic.com/2wewc9y.png"/><br/><a href="http://userscripts.org/scripts/show/78409">Click here to go to the script\'s install page</a><script type="text/javascript">alert(\'Welcome to "GaiaOnline: Is It Glowing?"\\nYou are seeing this cause you just installed this script (or you clicked help in the menu)\');</script></body></html>');
}

function seconds2HMS(inputval){
	var hh=Math.floor(inputval/3600);
	var ss_remaining=inputval-(hh*3600);
	var mm=Math.floor(ss_remaining/60);
	var ss=ss_remaining-(mm*60);
	if(hh<10){
		hh='0'+hh;
	}
	if(mm<10){
		mm='0'+mm;
	}
	if(ss<10){
		ss='0'+ss;
	}
	return hh+':'+mm+':'+ss;
}
function getTanks(){/* Coded by Absol */
	var arr=GM_listValues().toString();
	arr=arr.replace('date,','');
	if(arr.length>0&&arr!='date'){
		if(arr.indexOf(',')>-1){
			arr=arr.split(',');
		}
		else{
			var sid=arr;
			arr=new Array();
			arr[0]=sid;
		}
		var ARR=new Array();
		var ct=0;
		for(var i=0;i<arr.length;i++){
			if(arr[i].slice(0,1)==Number(arr[i].slice(0,1))){
				ARR[ct]=arr[i];
				ct++;
			}
		}
		return ARR;
	}
	else{
		return '';
	}
	
}
function addTank(){/* Coded by Absol */
	var id=prompt('What is the tank ID');
	if(id){
		if(id==Number(id)){
			if(Number(id)>0){
				if(id==Math.round(Number(id))){
					var owner=confirm('Click "OK" if you are the owner of tank '+id);
					if(owner===true){
						var text='the owner';
					}
					else{
						var text='a stalker';
					}
					if(confirm('If this is correct click "OK"\nTank ID is '+id+'\nYou are '+text)===true){
						GM_setValue(id,owner);
						alert('Tank '+id+' has been added as '+text+'\n\nI recommend keeping the number of tanks below 10\nEach tank you add uses more of your bandwith\nAlso the constant glowing alerts can get very annoying\n\nThis script does not limit how many tanks you can have on file');
					}
				}
				else{
					alert('Tank ids are whole numbers silly');
				}
			}
			else{
				alert('Tank ids are greater than 0 silly');
			}
		}
		else{
			alert('That is not a number silly');
		}
	}
}
function deleteTank(){/* Coded by Absol */
	var tankId=prompt('What is the tank ID');
	if(tankId){
		GM_deleteValue(tankId);
		GM_deleteValue('instance_id~'+tankId);
		if(confirm(tankId+' was deleted if it was on file\nClick "OK" to show a list of all remaining tanks')===true){
			listTanks();
		}
	}
}
function deleteAllTank(){/* Coded by Absol */
	if(confirm('Click "OK" to delete EVERY tank on file')){
		if(confirm('Final Sanity Check\nTHIS CAN NOT BE UNDONE\nClick "OK" to delete EVERY tank on file')){
			var list=getTanks();
			if(list.length>0){
				for(var i=0;i<list.length;i++){
					GM_deleteValue(list[i]);
					GM_deleteValue('instance_id~'+list[i]);
				}
				alert('Congratulations\nAll tanks have been deleted');
			}
			else{
				alert('There are no tanks on file to delete');
			}
		}
	}
}
function listTanks(){/* Coded by Absol */
	var list=getTanks();
	if(list.length>0){
		var str='';
		for(var i=0;i<list.length;i++){
			var val=GM_getValue(list[i]);
			if(val===true){
				str+=list[i]+': Owner\n';
			}
			else{
				str+=list[i]+': Stalker\n';
			}
		}
		alert(str.substr(0,str.length-1));
	}
	else{
		alert('There are no tanks on file');
	}
}
function checkTank(tankId,owner){/* Coded by Absol */
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.gaiaonline.com/chat/gsi/index.php?'+'v=json&m=[[6500%2C[1]]%2C[6510%2C["'+tankId+'"%2C0%2C1]]%2C[6511%2C["'+tankId+'"%2C0]]%2C[6512%2C["'+tankId+'"%2C0]]%2C[107%2C["null"]]]&X='+(new Date().getTime().toString().substring(0, 10)),
		onload: function(r){
			try{
				if(typeof JSON != 'undefined'){
					var json=JSON.parse(r.responseText);
				}
				else{
					var json=eval(r.responseText);
				}
				var gaiaT=json[0][2]['gaia_curr_time'];
				try{
					var glowT=json[1][2][tankId]['game_info'][1]["open_time"];
				}
				catch(e){}
				if(glowT){
					if(json[1][2][tankId]['game_info'][1]["instance_id"]!=GM_getValue('instance_id~'+tankId,0)){
						var aquaN=json[1][2][tankId]['name'];
						if(aquaN=='<undefined string>'||!aquaN){
							aquaN=tankId;
						}
						GM_setValue('instance_id~'+tankId,json[1][2][tankId]['game_info'][1]["instance_id"]);
						var over=false;
						if(glowT<=gaiaT){
							if(glowT+720>gaiaT){
								alert(aquaN+' ('+tankId+') has been glowing for '+seconds2HMS(gaiaT-glowT)+'.');
							}
							else{
								var over=true;
							}
						}
						else{
							alert(aquaN+' ('+tankId+') will glow in '+seconds2HMS(glowT-gaiaT));
						}
						if(over===false){
							if(confirm('Would you like to play the tank or make a new topic? /n Click Okay to Play or Make a new topic {* Depending on if you are the owner *}. /n Click Cancel to do nothing.')===true){
								if(owner===true){
									GM_openInTab('http://www.gaiaonline.com/forum/compose/topic/new/?f=393&tank='+aquaN);
								}
								else{
									GM_openInTab('http://www.gaiaonline.com/landing/flashaquarium/?userid='+json[1][2][tankId]['user_id']);
								}
							}
							else{
							}
						}
						var fish='';
						var fishCt=0;
						var glowCt=0;
						var playCt=json[1][2][tankId]['game_info'][1]["player_count"];
						for(var i in json[2][2]){
							if(json[2][2][i]['in_env']==1){
								fishCt++;
								fish+=json[2][2][i]['item_id']+',';
								if(json[2][2][i]['game_specifics']){
									glowCt++;
								}
							}
						}
						GM_xmlhttpRequest({
							method: "POST",
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							data: "tankId="+tankId+"&fishCt="+fishCt+"&glowCt="+glowCt+"&playCt="+playCt+"&glowT="+glowT+"&fish="+fish.substr(0,fish.length-1),
							url: 'http://absol.site88.net/gtools/background/glowRecorder.php',
							onload: function(r){}
						});
					}
				}
				else{
					//alert('not glowing');
				}
			}
			catch(e){GM_log('\n'+e)}
		}
	});
}
var time=Number(new Date().getTime().toString().substring(0,10));
var oldTime=GM_getValue('date',time-30);
if(time>=oldTime+30){
	GM_setValue('date',time);
	if(GM_getValue('ftime',true)===true){
		firstTimePage();
		GM_setValue('ftime',false);
	}
	else{
		var tanks=getTanks();
		if(tanks.length>0){
			for(var i=0;i<tanks.length;i++){
				checkTank(tanks[i],GM_getValue(tanks[i]));
			}
		}
	}
}
else if(Math.abs(time-oldTime)>60){
	GM_setValue('date',time-30);
}
GM_registerMenuCommand("Is it Glowing: List all tanks", listTanks);
GM_registerMenuCommand("Is it Glowing: Add/Update a tank", addTank);
GM_registerMenuCommand("Is it Glowing: Delete a tank", deleteTank);
GM_registerMenuCommand("Is it Glowing: Delete all tank(s)", deleteAllTank);
GM_registerMenuCommand("Is it Glowing: Help", firstRunAndHelp);