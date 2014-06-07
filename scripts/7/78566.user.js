// ==UserScript==
// @name           GaiaOnline: Stalk Your Own Tank
// @namespace      http://userscripts.org/users/109446
// @description    Checks tanks on Gaia for if they are glowing (Tools -> GreaseMonkey -> User Script Commands
// @include        *
// @require        http://sizzlemctwizzle.com/updater.php?id=78566
// @version        1.0.0
// ==/UserScript==
//Thanks greatly to "Absol - Ruler of Chaos" (http://www.gaiaonline.com/p/Absol-RulerofChaos, http://userscripts.org/users/62850, http://www.absol.site88.net) for first making the script to stalk your own tank. Also, for making his own version that is better than mine so that I was driven to create an even better version of mine. 

function firstRunAndHelp(){
	var start='data:text/html;charset=utf-8,<html>';
	var head='<head><style type="text/css">html{background-color: black; color: #d9d9d9;} a{text-decoration: strikethrough; color: #858585;} h1{color: white; text-align: center;} h2{color: white; text-align: center;} h3{color: white; text-align: center;} h4{color: white; text-align: center;} h5{color: white; text-align: center;} h6{color: white; text-align: center;}</style><title>First Run and Help Page</title><link rel="shortcut icon" href="http://awesomolocity.hostzi.com/Awesomolocity.jpg" type="image/x-icon"></head>';
	var body='<body><h1>First Run and Help Page</h1><br /><h3>The help page and start page for the "Stalk your own Tank" script.</h3><br /><br /><img src=http://s3.amazonaws.com/uso_ss/8572/large.PNG"/><br /><h1>Configuring the Script</h1><br /><img src="http://i553.photobucked.com/albums/my_cat_rules/gettingTankId.png"></img><br /><h1>This is where you get the tankId (You will need this to add tanks to the script)</h1><br /><img src="http://i49.tinypic.com/2wewc9y.png"/><br /><h1>Uninstalling the Script</h1><br /><script type="text/javascript">';
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
function getTanks(){
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
		var nAr=new Array();
		var ct=0;
		for(var i=0;i<arr.length;i++){
			if(arr[i].slice(0,1)==Number(arr[i].slice(0,1))){
				nAr[ct]=arr[i];
				ct++;
			}
		}
		return nAr;
	}
	else{
		return '';
	}
	
}
function addTank(){
	var start='data:text/html;charset=utf-8,<html>';
	var head='<head><style type="text/css">html{background-color: black; color: #d9d9d9;} a{text-decoration: strikethrough; color: #858585;} h1{color: white; text-align: center;} h2{color: white; text-align: center;} h3{color: white; text-align: center;} h4{color: white; text-align: center;} h5{color: white; text-align: center;} h6{color: white; text-align: center;}</style><title>Add Tank</title><link rel="shortcut icon" href="http://awesomolocity.hostzi.com/Awesomolocity.jpg" type="image/x-icon"></head>';
	var body='<body><h1>Add Tank</h1><br /><h3>The place to add tanks for the "Stalk Your Own Tank" script.</h3><br /><br /><textarea id="id"></textarea><br /><button type="button" id="button">Add Tank</button><br /><p>Note: You may only add one tank at a time</p></body>';
	var end='</html>';
	var body2='<body><h1>Are you the owner of the tank number '+id+'?</h1><br /><br />Enter "yes" or "no". <textarea id="id2"></textarea></body>'
	var what='<body><h1>I cannot understand what you entered!</h1></body>'
	var combine=start+head+body+end;
	var combine2=start+head+body2+end;
	var combine3=start+head+what+end;
	var button=document.getElementById('button')
	button.addEventListener(click,function(){var id=document.getElementById('id').value},false);
	if(id){
		if(id==Number(id)){
			if(Number(id)>0){
				if(id==Math.round(Number(id))){
					GM_openInTab(combine2)
					var type=document.getElementById('id2').value;
					if (type===yes)
						var owner=true;
						var text='the owner';
					}
					if (type===no){
						var owner=false;
						var text='a stalker';
					{
					else{
						GM_openInTab(combine3);
					}
					if(confirm('If this is correct click "OK"\nTank ID is '+id+'\nYou are '+text)===true){
						GM_setValue(id,owner);
						GM_openInTab(start+head+'<body><h1>Congradulations</h1><br /><br /><p>The tank has sucessfully been added. You can add more tanks if you like. This script does not limit how many tanks you have <b>however</b> you might not want to go over ten for two reasons: <br /><br />1.) The script will take more bandwidth, causing it to lag more. <br /><br />2.)Constant alerts get kinda annoying. xD</p></body>'+end);
					}
				}
				else{
					GM_openInTab(start+head+'<body><h1>Tank Id\'s are whole numbers.</h1></body>'+end);
				}
			}
			else{
				GM_openInTab(start+head+'<body><h1>Tank Id\'s are greater than 0.</h1></body>'+end);
			}
		}
		else{
			GM_openInTab(start+head+'<body><h1>That is not a number.</h1></body'+end);
		}
	}
}
function deleteTank(){
	var start='data:text/html;charset=utf-8,<html>';
	var head='<head><style type="text/css">html{background-color: black; color: #d9d9d9;} a{text-decoration: strikethrough; color: #858585;} h1{color: white; text-align: center;} h2{color: white; text-align: center;} h3{color: white; text-align: center;} h4{color: white; text-align: center;} h5{color: white; text-align: center;} h6{color: white; text-align: center;}</style><title>Add Tank</title><link rel="shortcut icon" href="http://awesomolocity.hostzi.com/Awesomolocity.jpg" type="image/x-icon"></head>';
	var body='<body><h1>Delete A Tank</h1><br /><br /><p>What is the tank Id?</p><br /><textarea id="textareathing"></textarea></body>';
	var body2='<body><h1>Congradulations</h1><br /><p>'+tankId+' was deleted. Click the button to list tanks.</p><br /><button type="button" id="click">List Tanks</button></body>';
	var end='</html>';
	var combine=start+head+body+end;
	var combine2=start+head+body2+end;
	GM_openInTab(combine);
	var tankId=document.getElementById('textareathing').value;
	if(tankId){
		GM_deleteValue(tankId);
		GM_deleteValue('instance_id~'+tankId);
		GM_openInTab(combine2);
		var click=document.getElementById('click');
		click_addEventListener(click,listTanks(),false);
		}
	}
}
function deleteAllTank(){
	var start='data:text/html;charset=utf-8,<html>';
	var head='<head><style type="text/css">html{background-color: black; color: #d9d9d9;} a{text-decoration: strikethrough; color: #858585;} h1{color: white; text-align: center;} h2{color: white; text-align: center;} h3{color: white; text-align: center;} h4{color: white; text-align: center;} h5{color: white; text-align: center;} h6{color: white; text-align: center;}</style><title>Add Tank</title><link rel="shortcut icon" href="http://awesomolocity.hostzi.com/Awesomolocity.jpg" type="image/x-icon"></head>';
	var body='<body><h1>Delete All Tanks</h1><br /><br /><p>Are you sure you would like to delete every file on this tank? <b>This Action Cannot Be Undone!</b><br /><br />Please Enter "Yes" or "No"</p><br /><textarea id="check"></textarea></body>';
	var end='</html>';
	var combine=start+head+body+end;
	GM_openInTab(combine);
	var check=document.getElementById('check').value;
	if(check===yes){
		var list=getTanks();
		if(list.length>0){
			for(var i=0;i<list.length;i++){
				GM_deleteValue(list[i]);
				GM_deleteValue('instance_id~'+list[i]);
			}
			GM_openInTab(start+head+'<body><h1>All Tanks have been deleted!</h1></body>'+end;
			
		}
		else{
			alert('There are no tanks on file to delete');
		}
	}
	if(check===no){
	}
	else{
		GM_openInTab(start+head+'<body><h1>WHAT?!?!</h1><br /><h3>I\'ve no idea what you just said</h3></body>'+end);
	}
}
function listTanks(){
	var start='data:text/html;charset=utf-8,<html>';
	var head='<head><style type="text/css">html{background-color: black; color: #d9d9d9;} a{text-decoration: strikethrough; color: #858585;} h1{color: white; text-align: center;} h2{color: white; text-align: center;} h3{color: white; text-align: center;} h4{color: white; text-align: center;} h5{color: white; text-align: center;} h6{color: white; text-align: center;}</style><title>Add Tank</title><link rel="shortcut icon" href="http://awesomolocity.hostzi.com/Awesomolocity.jpg" type="image/x-icon"></head>';
	var body='<body><h1>Tanks List</h1><br /><br /><p>';
	var endBody='</p></body>';
	var end='</html>';
	var list=getTanks();
	if(list.length>0){
		var str='';
		for(var i=0;i<list.length;i++){
			var val=GM_getValue(list[i]);
			if(val===true){
				str+=list[i]+': Owner<br />';
			}
			else{
				str+=list[i]+': Stalker<br />';
			}
		}
		GM_openInTab(start+head+body+str.substr(0,str.length-1)+endBody+end);
	}
	else{
		GM_openInTab(start+head+body+'There are no tanks yet...'+endBody+end);
	}
}
function checkTank(tankId,owner){
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
							if(owner===true){
								GM_openInTab('http://www.gaiaonline.com/forum/compose/topic/new/?f=393&tank='+aquaN);
							}
							else{
								GM_openInTab('http://www.gaiaonline.com/landing/flashaquarium/?userid='+json[1][2][tankId]['user_id']);
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
						GM_xmlhttpRequest({/*Left in to show respect to Absol. */
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