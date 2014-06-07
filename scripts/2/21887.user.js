// ==UserScript==
// @name           ConquerClub - Cards
// @namespace      http:/klupar.com
// @description    Selects the most armies per card set
// @include        *conquerclub.*
// ==/UserScript==


var card_log="";
var startLogTime = Math.round((new Date()).getTime()/1000);
GM_registerMenuCommand('Show_Help', showHelp);

var originalRefreshScript = unsafeWindow.refreshGMScript; 
unsafeWindow.refreshGMScript = function(){
	checkCards();
	originalRefreshScript();
	return true;
}

function checkCards(){
	

	
	logger('<b>Start Logging</b>');
	var formDiv = document.getElementById('action');
	if (formDiv.innerHTML.search('class="card') != -1){
	
		var form = formDiv.innerHTML.split('<br>');
		
		var color = new Array();	var number = new Array();	var bold = new Array();
		color[0]='';				number[0]='';				bold[0]=false;
		color[1]='';				number[1]='';				bold[1]=false;
		color[2]='';				number[2]='';				bold[2]=false;
		color[3]='';				number[3]='';				bold[3]=false;
		color[4]='';				number[4]='';				bold[4]=false;
		color[5]='';				number[5]='';				bold[5]=false;
		color[6]='';				number[6]='';				bold[6]=false;
		color[7]='';				number[7]='';				bold[7]=false;
		color[8]='';				number[8]='';				bold[8]=false;
		color[9]='';				number[9]='';				bold[9]=false;
		color[10]='';				number[10]='';				bold[10]=false;

		var total = new Array();
		total[0]=0;//Red
		total[1]=0;//Green
		total[2]=0;//Blue
		total[3]=0;//Mixed

		var Red_cards=0;	var red_done=false;
		var Green_cards=0;	var green_done=false;
		var Blues_cards=0;	var blue_done=false;

		var GameType='';
		if (document.getElementById('dashboard').innerHTML.search('Escalating') != -1){
			GameType='Escalating';
		}
		else
		{
			GameType='Flat Rate';
		}
		logger('<b>Game Type:</b> '+GameType);		
		
		var NumOfBold = 0;
		var selected = 0;
		var CardNum = 0;
		CardNum=form.length;

		//process the card data
		logger('<b>Cards  Values</b>');
		for (i = 0; i < CardNum; i++){
			if (form[i].search('<b>') != -1){
				bold[i]=true;
				number[i]=form[i].substring(form[i].search('for="card_')+10, form[i].search('"><b><span'));
			}
			else{
				number[i]=form[i].substring(form[i].search('for="card_')+10, form[i].search('"><span'));
			}
			number[i]=number[i].substring(0,number[i].search('_'));
			
			if (form[i].search('class="card0') != -1){
				color[i]='0';
				Red_cards++;
			}
			if (form[i].search('class="card1') != -1){
				color[i]='1';
				Green_cards++;
			}
			if (form[i].search('class="card2') != -1){
				color[i]='2';
				Blues_cards++;
			}
			logger('Card'+i+': card_'+number[i]+'_'+color[i]);
		}
		logger('<b>Number of Cards</b>');
		logger('Red cards: '+Red_cards);
		logger('Green cards: '+Green_cards);
		logger('Blue cards: '+Blues_cards);
//----------------------------------------------------------------------------------------------------------------
		//logger('Number of Bold');
		if (Red_cards >= 3){
			if (GameType=='Flat Rate'){
				total[0]=4;
			}
			selected = 0;
			NumOfBold=0;
			for (i=0 ;i<CardNum ;i++ ){
				if (color[i]=='0' && bold[i]==true && selected<3){
					NumOfBold++;
					selected++;
				}
			}
			total[0]=total[0]+2*NumOfBold;
		}
//----------------------------------------------------------------------------------------------------------------
		if (Green_cards>=3){
			if (GameType=='Flat Rate'){
				total[1]=6;
			}
			selected = 0;
			NumOfBold=0;
			for (i=0 ;i<CardNum ;i++ ){
				if (color[i]=='1' && bold[i]==true && selected<3){
					NumOfBold++;
					selected++;
				}
			}
			total[1]=total[1]+2*NumOfBold;
		}
//----------------------------------------------------------------------------------------------------------------
		if (Blues_cards>=3){
			if (GameType=='Flat Rate'){
				total[2]=8;
			}
			selected = 0;
			NumOfBold=0;
			for (i=0 ;i<CardNum ;i++ ){
				if (color[i]=='2' && bold[i]==true && selected<3){
					NumOfBold++;
					selected++;
				}
			}
			total[2]=total[2]+2*NumOfBold;
		}
//----------------------------------------------------------------------------------------------------------------
		//mixed set
		if (Red_cards>=1 && Green_cards>=1 && Blues_cards>=1){
			if (GameType=='Flat Rate'){
				total[3]=10;
			}
			red_done=false;
			green_done=false;
			blue_done=false;
			NumOfBold=0;
			for (i=0 ;i<CardNum ;i++ ){
				if (bold[i]==true){
					if (color[i]=='0' && red_done==false){
						NumOfBold++;
						red_done=true;
					}
					if (color[i]=='1' && green_done==false){
						NumOfBold++;
						green_done=true;
					}
					if (color[i]=='2' && blue_done==false){
						NumOfBold++;
						blue_done=true;
					}
				}
			}
			total[3]=total[3]+2*NumOfBold;
		}	
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
		//find the combination with the most armies returned
		var Max = Math.max(Math.max(total[3],total[2]),Math.max(total[1],total[0]));
		logger('<b>Card Sets</b>');
		logger('   Max: '+Max+', Mixed Bonus'+total[3]+', Green Bonus: '+total[1]+', Blue Bonus: '+total[2]+', Red Bonus: '+total[0]);
		var AfterSet = 0;
		
		var Redemption = document.getElementById('redemption').innerHTML;
		var RedemptionVal = Redemption.substring(Redemption.search('is <b>')+6, Redemption.search('.</b>'));
		if (GameType=="Escalating"){
			if (!isNaN(RedemptionVal)){
				AfterSet += new Number(RedemptionVal);
				logger('Redemption: '+RedemptionVal);
			}
		}
		
		
		var CurVal = form[0].substring(form[0].search(' have ')+6, form[0].search(' armies '));
		logger('Current Deploy: '+CurVal);
		if (!isNaN(CurVal)){AfterSet += new Number(CurVal);}

		
//----------------------------------------------------------------------------------------------------------------
		if (Max == total[3]){//Mixed set
			if (GameType=="Flat Rate"){
				AfetSet=+10;
			}
			if (Red_cards>=1 && Green_cards>=1 && Blues_cards>=1){
				red_done=false;
				green_done=false;
				blue_done=false;
				for (i=0 ;i<CardNum ;i++){
					if (bold[i]==true){
						if (color[i]=='0' && red_done==false){
							document.getElementById('card_'+number[i]+'_'+color[i]).click();
							red_done=true;
						}
						if (color[i]=='1' && green_done==false){
							document.getElementById('card_'+number[i]+'_'+color[i]).click();
							green_done=true;
						}
						if (color[i]=='2' && blue_done==false){
							document.getElementById('card_'+number[i]+'_'+color[i]).click();
							blue_done=true;
						}
					}
				}
				for (i=0 ;i<CardNum ;i++ ){
					if (bold[i]==false){
						if (color[i]=='0' && red_done==false){
							document.getElementById('card_'+number[i]+'_'+color[i]).click();
							red_done=true;
						}
						if (color[i]=='1' && green_done==false){
							document.getElementById('card_'+number[i]+'_'+color[i]).click();
							green_done=true;
						}
						if (color[i]=='2' && blue_done==false){
							document.getElementById('card_'+number[i]+'_'+color[i]).click();
							blue_done=true;
						}
					}
				}
				//logger("AfterSet: " + AfetSet);
				//formDiv.innerHTML=formDiv.innerHTML.replace('hand in', 'hand in. After the <u>current</u> set you will have <b>'+AfterSet+'</b> armies to deploy');
				if (Max != 0){
					return;
				}
			}	
		}
//----------------------------------------------------------------------------------------------------------------
		if (Max == total[2]){
			if (GameType == 'Flat Rate'){
				AfetSet=+8;
			}
			if (Blues_cards>=3){
				selected = 0;
				for (i=0 ;i<CardNum ;i++ ){
					if (color[i]=='2' && bold[i]==true && selected<3){
						document.getElementById('card_'+number[i]+'_'+color[i]).click();
						selected++;
					}
				}
				if (selected<3){
					for (i=0 ;i<CardNum ;i++ ){
						if (color[i]=='2' && bold[i]==false && selected<3){
							document.getElementById('card_'+number[i]+'_'+color[i]).click();
							selected++;
						}
					}
				}
				//logger("AfterSet: " + AfetSet);
				//formDiv.innerHTML=formDiv.innerHTML.replace('hand in', 'hand in. After the <u>current</u> set you will have <b>'+AfterSet+'</b> armies to deploy');
				if (Max != 0){
					return;
				}
			}
		}
//----------------------------------------------------------------------------------------------------------------
		if (Max == total[1]){
			if (GameType=="Flat Rate"){
				AfetSet=+6;
			}
			if (Green_cards >= 3){
				selected = 0;
				for (i=0 ;i<CardNum ;i++ ){
					if (color[i]=='1' && bold[i]==true && selected<3){
						document.getElementById('card_'+number[i]+'_'+color[i]).click();
						selected++;
					}
				}
				for (i=0 ;i<CardNum ;i++ ){
					if (color[i]=='1' && bold[i]==false && selected<3){
						document.getElementById('card_'+number[i]+'_'+color[i]).click();
						selected++;
					}
				}
				//logger("AfterSet: " + AfetSet);
				//formDiv.innerHTML=formDiv.innerHTML.replace('hand in', 'hand in. After the <u>current</u> set you will have <b>'+AfterSet+'</b> armies to deploy');
				if (Max != 0){
					return;
				}
			}
		}
//----------------------------------------------------------------------------------------------------------------
		if (Max == total[0]){
			if (GameType=="Flat Rate"){
				AfetSet=+4;
			}
			if (Red_cards >= 3){
				selected = 0;
				for (i=0 ;i<CardNum ;i++ ){
					if (color[i]=='0' && bold[i]==true && selected <3){
						document.getElementById('card_'+number[i]+'_'+color[i]).click();
						selected++;
					}
				}
				if (selected<3){
					for (i=0 ;i<CardNum ;i++ ){
						if (color[i]=='0' && bold[i]==false && selected<3){
							document.getElementById('card_'+number[i]+'_'+color[i]).click();
							selected++;
						}
					}
				}
				//logger("AfterSet: " + AfetSet);
				//formDiv.innerHTML=formDiv.innerHTML.replace('hand in', 'hand in. After the <u>current</u> set you will have <b>'+AfterSet+'</b> armies to deploy');	
				if (Max != 0){
					return;
				}
			}
		}	
	}//now just hit enter
}

function logger(m) {
	card_log = card_log + m + "<br/>";
}

function showHelp() {
	var win = window.open("","CardHelp","height=600, width=600, toolbar=yes, scrollbars=yes, menubar=no");
	win.document.write(card_log);
	win.document.close();
	win.focus();
}