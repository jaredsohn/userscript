// ==UserScript==
// @name           wigBot
// @namespace      http://www.sofiawars.com/*
// @description    wigBot
// @include        http://www.sofiawars.com/*
// @exclude        http://www.sofiawars.com/@/*
// @require        http://userscripts.org/scripts/source/123326.user.js
// @require        http://userscripts.org/scripts/source/123340.user.js
// ==/UserScript==

function Refresh2(){
	if (GM_getValue("wigBotMonya",false)==true){
		setTimeout(Refresh2,10000);
	}else{
		document.location.href = top.location.href.substr(20);
	}
}

function SelectWeakTarget(){
	$ = unsafeWindow.jQuery;
	$('#searchForm select[name="type"]').val("weak");
	$('#searchForm').trigger('submit');
}

function GoToHref(strHref){
	top.location.href = strHref;
}

function AddDivElement(html){
	sLastAtack = '<div id="wigBotLastDay" style="height:400px;width:200px;position:fixed;top:120px;left:0px;z-index:2;margin:0 auto;background-color:#e0ffff;border: 1px black solid;">'+html+'</div>';

	var el4 = document.createElement("div");
	el4.innerHTML = sLastAtack;
	document.body.appendChild(el4);
}

function GetPlayerFightsArray(playerID){
	var storageData = GM_getValue("wigBotDayStorage","");
	var storageArray = storageData.split(';');
	
	var Fights = []
	
	var AllMoney = 0;
	
	for (i=0;i<storageArray.length;i++){
		var recordArray = storageArray[i].split(',');
		if (recordArray[1]=="") continue;
		if (recordArray[1]!=playerID) continue;
		if(recordArray[2]=="") recordArray[2]=0;
		Fights[Fights.length] = recordArray;
		
		AllMoney = AllMoney + parseInt(recordArray[2]);
	}
	
	if (Fights.length==0) return [];
	
	return Fights;
}
function GetWantedAll(){
	document.location.href='/huntclub/wanted/level/all/';
}
function GoToHuntclub(){
	document.location.href='/huntclub/';
}
function GoToArbat(){
	document.location.href='/arbat/';
}
function ShrauWorkHour(){
	$('#workForm  select[name="time"]').val(1);
	$('#workForm').trigger('submit');
}
function GoToPlayer(){
	document.location.href='/player/';
}
function GoToDesert(){
	document.location.href='/desert/';
}
function GoToDesertRob(){
	document.location.href='/desert/rob/';
}
function GoToSportLoto(){
	document.location.href='/casino/sportloto/';
}
function GoToShopOther(){
	document.location.href='/shop/section/other/';
	//alleyAttack(parseInt(targetID), 1, 0);
	//document.location.href='/player/';
}
function LeaveMetro2(){
	unsafeWindow.metroLeave2();
}
function GetLives(text,url){

	var live_Count = text.substr(text.indexOf('<div class="pers-statistics">')+13);
	live_Count = live_Count.substr(live_Count.indexOf('<span>')+6);
	live_Count_End = live_Count.substr(0,live_Count.indexOf('</span>/'));
	live_Count2 = live_Count.substr(live_Count.indexOf('</span>/')+8);
	live_Count2_End = live_Count2.substr(0,live_Count2.indexOf('<div '));
	var playerId = url.substr(28);
	var playerId = playerId.substr(0,playerId.indexOf('/'));
	return [parseInt(live_Count_End),parseInt(live_Count2_End),playerId];
	//alert(live_Count_End+' ! '+live_Count2_End);
}

function AddToNextAction(strText){
	AddTextToDiv('wigBotNextAction',strText);
}

unsafeWindow.InverseBooleanParametr = function(strName){
}

function onParametrClick(strName){
	var gm_value = GM_getValue(this.id,false);
	GM_setValue(this.id,(gm_value==false));
	//SetupData();
	return false;
}

function ActivateScript(scriptText){
	var innerText=document.documentElement.innerHTML;
	unsafeWindow.document.write(innerText+'<scr' + 'ipt language="JavaScript">'+scriptText+'<\/scr' + 'ipt>');
}
function FindAlley(){
	var PosTimer1 = document.body.innerHTML.indexOf('alleyAttack(');
	var PosTimer2 = document.body.innerHTML.indexOf(',',PosTimer1+12);
	return (document.body.innerHTML.substr(PosTimer1+12,PosTimer2-PosTimer1-12));
}		
function AtackTarget(){
	var targetID = FindAlley();
	unsafeWindow.alleyAttack(parseInt(targetID), 1, 0);
	//ActivateScript('alleyAttack('+parseInt(targetID)+', 1, 0);');
}
	

function MainScript(jQuery){
	$=jQuery;
	var hrefPage = top.location.href.substr(20);	

	if (hrefPage.substr(0,3)=='/@/') return;
	try {
		var curHP = parseInt($("#currenthp").html());
		var maxHP = parseInt($("#maxhp").html());
		var curUpdateTime = parseInt($("#servertime").attr('rel'));
		var elementTimeOut = $("#timeout");
	}
	catch (e) {
		setTimeout(GoToAlley,60000);
		return;
	}
	if (isNaN(curUpdateTime)) {
		AddToNextAction('Неизвестная страница через 60 секунд.');
		setTimeout(GoToAlley,60000);
		return;
	}
	
	
	var hrefTimeOut = elementTimeOut.attr('href');
	var hrefTimeOutET = parseInt(elementTimeOut.attr('endtime'));
	
	
	if (hrefPage.substr(0,6)=='/clan/'){
		if (document.body.innerHTML.indexOf('На этот клан можно будет напасть')>=0){
			var subString = MySubString(document.body.innerHTML,'На этот клан можно будет напасть <b>','</b>.</p>');
			//alert(subString);
			var newString = subString.substr(3,2)+'/'+subString.substr(0,2)+'/'+subString.substr(6);
			myDate = new Date(newString);
			var tempTimeValue = myDate.valueOf()-curUpdateTime*1000;
			if (tempTimeValue>10000){
				var tempTimeValue = tempTimeValue-10000;
			}else if (tempTimeValue>1000){
				tempTimeValue = tempTimeValue-1000;
			}else if (tempTimeValue<0){
				tempTimeValue = 0;
			}
			var outDate = OutOnlyTime(new Date(tempTimeValue+curUpdateTime*1000));
			AddToNextAction('Обновление данной страницы	 - '+outDate);
			
			setRandTimeout(Refresh2,tempTimeValue);
			return;
		}
		var st = hrefPage.substr(6);
		var st = st.substr(0,st.indexOf('/'));
		if (document.body.innerHTML.indexOf('clanDiplomacyExt')>0){
			if (parseInt(st)==1693){
				unsafeWindow.postUrl("/clan/" + 1693 + "/", {action: 'attack'}, "post");
			}
		}
		if ((hrefTimeOut=='/metro/')&&((hrefTimeOutET-curUpdateTime)<15)){
			setRandTimeout(Refresh2,75000);
		}else{
			setRandTimeout(Refresh2,15000);
		}
		return;
	}
	GM_setValue("wigBotLastUpdate",curUpdateTime);
	
	var intMoney = parseInt($(".tugriki-block").attr('title').substr(7));
	var intOre = parseInt($(".ruda-block").attr('title').substr(6));


	function StartPatrol(){
		if ($("#regions-choose-id").val()!=16){
			$("#region-choose-arrow-right").click();
			setTimeout(StartPatrol,100);
			return;
		}
		$('#patrolForm  select[name="time"]').val(10);
		$("#alley-patrol-button").click();
	//	$('#patrolForm').trigger('submit');
	}
	function SportLotoTicketGet(){
		$('#button-ticket-get').click();
	};
	
	function SportLotoPrizeGet(){
		$('#button-prize-get').click();
	}	
	function GoToCar(){
		document.location.href='/automobile/car/7937/';
	}
	function TaxiModeSubmit(){
		$("#cars-trip-choose .object-thumb").eq(1).click();
		GM_setValue("wigBotRideCount",parseInt(GM_getValue("wigBotRideCount",""))+1);
		$('.ride-button').eq(0).click();
	}
	function SportLotoRandomSelect(){
		$('#casino-sportloto-ticket-randomize').click();
		setTimeout(SportLotoTicketGet,100);
	}
	function ProcedPetricks(){
		$ = unsafeWindow.jQuery;
		if (hrefPage.substr(0,9)=="/factory/"){
			var timerFactory = parseInt($("#petriksprocess").attr('timer'));
			if (isNaN(timerFactory)) {
				timerFactory=0;
				if (intMoney<500) timerFactory=900;
				if (intOre<5) timerFactory=900;
			}
			GM_setValue("wigBotPetricks",curUpdateTime+timerFactory);
			if (timerFactory==0){
				setRandTimeout(PetricksStart,1000);
				return false;
			}else{
				AddToNextAction("Ожидание денег или руды (завод)");
				setRandTimeout(GoToFactory,timerFactory*1000);
				return false;
			}
		}
		if ((curUpdateTime>=(GM_getValue("wigBotPetricks",0)+110)) && (intMoney>700) && (intOre>=5)) {
			setRandTimeout(GoToFactory,1000);
			return true;
		}
		return false;
	}
	
	function ProcedThimble(hrefPage,intMoneyStart){
		GM_setValue("wigBotMonya",false);
		if (hrefPage.substr(0,9)=="/thimble/"){
			GM_setValue("wigBotMonya",true);
			if (document.body.innerHTML.indexOf('/thimble/play/9/')>0){
				if (intMoney<1500){
					GM_setValue("wigBotMonya",false);
					setRandTimeout(LeaveThimble,500);
					return true;
				}
				setRandTimeout(GoToThimbleNine,500);
				return true;
			}
			var thimbles = document.getElementsByClassName("icon thimble-closed-active");
			
			randomnumber=Math.floor(Math.random()*thimbles.length);
			resultnumber=parseInt(thimbles[randomnumber].id.substr(7,1));
			if (resultnumber==0){
				setRandTimeout(GoToThimbleGuess0,500);
				return true;
			}else if (resultnumber==1){
				setRandTimeout(GoToThimbleGuess1,500);
				return true;
			}else if (resultnumber==2){
				setRandTimeout(GoToThimbleGuess2,500);
				return true;
			}else if (resultnumber==3){
				setRandTimeout(GoToThimbleGuess3,500);
				return true;
			}else if (resultnumber==4){
				setRandTimeout(GoToThimbleGuess4,500);
				return true;
			}else if (resultnumber==5){
				setRandTimeout(GoToThimbleGuess5,500);
				return true;
			}else if (resultnumber==6){
				setRandTimeout(GoToThimbleGuess6,500);
				return true;
			}else if (resultnumber==7){
				setRandTimeout(GoToThimbleGuess7,500);
				return true;
			}else if (resultnumber==8){
				setRandTimeout(GoToThimbleGuess8,500);
				return true;
			}
			return false;
		}

		if (intMoney>=intMoneyStart){
			GM_setValue("wigBotMonya",true);
			setRandTimeout(GoToThimble,1000);
			return true;
		}
	}
	//GM_setValue("wigBotDayStorage","");
	function ReCalcDayStats(){
		var storageData = GM_getValue("wigBotDayStorage","");
	//	alert(GM_getValue("wigBotDayStorage",""));
		var storageArray = [];
		if (storageData!="")
			storageArray = storageData.split(';');
		var i=0,j=0;
		
		var outDate = OutTime(new Date((GM_getValue("wigBotLastUpdate",0)-86400)*1000));
		var outDate2 = OutTime(new Date((GM_getValue("wigBotLastUpdate",0)-82800)*1000));
		for (i=0;(i<storageArray.length)||(i<200);i++){
			for (j=i+1;(j<storageArray.length)||(j<200);j++){
				if ((storageArray[i]==storageArray[j])&&(i!=j)){
				//	alert(storageArray[i]+'\n'+storageArray[j]);
					storageArray.splice(j, 1);
					j--;
				}
			}
		}
		for (i=storageArray.length-1;i>=0;i--){
			if (storageArray[i]==""){
				storageArray.splice(i, 1);
			}else{
				try{
					var recordArray = storageArray[i].split(',');
					if (CompareDates(recordArray[0],outDate)==-1) ;//storageArray.splice(i, 1);
					if (recordArray[0].substr(1,1)=='.') storageArray.splice(i, 1);
					if (recordArray[1]=='') storageArray.splice(i, 1);
				} 
				catch (e) {
					storageArray.splice(i, 1);
					//alert(storageArray[i]);
				};
			}
		}
		var resultData = storageArray.join(';');
		GM_setValue("wigBotDayStorage",resultData);
		GM_setValue("wigBotCountAtack",storageArray.length);
		//alert(storageArray.length);
		var moneyCount=0;
		var poorCount = 0;
		var reachCount =0;
		var moneyCountDay=0;
		var countCountDay=0;
		var moneyCountDay2=0;
		var countCountDay2=0;
		for (i=0;i<storageArray.length;i++){
			var recordArray = storageArray[i].split(',');
			if (!isNaN(parseInt(recordArray[2]))){
				moneyCount += parseInt(recordArray[2]);
				if (parseInt(recordArray[2])>1000) reachCount++;
				if (parseInt(recordArray[2])<300) poorCount++;
				if (CompareDates(recordArray[0],outDate)!=-1) {
					moneyCountDay += parseInt(recordArray[2]);
					countCountDay++;
				};
				if ((CompareDates(recordArray[0],outDate2)!=-1)&&(CompareDates(recordArray[0],"05.05.2011 11:16:36")!=-1)) {
					moneyCountDay2 += parseInt(recordArray[2]);
					countCountDay2++;
				};
			}else{
				poorCount++;
				if (CompareDates(recordArray[0],outDate)!=-1) {
					countCountDay++;
				};
				if ((CompareDates(recordArray[0],outDate2)!=-1)&&(CompareDates(recordArray[0],"05.05.2011 11:16:36")!=-1)) {
					countCountDay2++;
				};
			}
		}
		var lastDayCount = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		var tempStrStr='';
		for (i=0;i<storageArray.length;i++){
			var recordArray = storageArray[i].split(',');
			var newString = recordArray[0].substr(3,2)+'/'+recordArray[0].substr(0,2)+'/'+recordArray[0].substr(6);
			var myDate = new Date(newString);
			var tempTimeValue = curUpdateTime-(myDate.valueOf()/1000);
			tempTimeValue = tempTimeValue/3600;
			if (tempTimeValue<24){
				lastDayCount[parseInt(tempTimeValue)]++;
			}
			//myDate
			//recordArray[0];
		}
		var dayStats = "";
		for (i=0;i<24;i++){
			dayStats += '<tr><td>'+i+'</td><td>'+lastDayCount[i]+'</td></tr>';
		}
		dayStats = '<table>'+dayStats+'</table>';
		//SetupTextByID("wigBotLastDay",dayStats);
		//alert($("#wigBotLastDay").html(	));
		AddDivElement(dayStats);
		GM_setValue("wigBotCountMoney",moneyCount);
		GM_setValue("wigBotReachCount",reachCount);
		GM_setValue("wigBotCountMoneyDay",moneyCountDay);
		GM_setValue("wigBotCountAtackDay",countCountDay);
		GM_setValue("wigBotCountMoneyDay2",moneyCountDay2);
		GM_setValue("wigBotCountAtackDay2",countCountDay2);
		GM_setValue("wigBotPoorCount",poorCount);
	}
	ReCalcDayStats();
	function ParseDayStorage(date,id,money,nick){
		var storageData = GM_getValue("wigBotDayStorage","");
		var storageArray = [];
		if (storageData!="")
			storageArray = storageData.split(';');
		var i=0;
		var insTo = 0;
		for (i=0;i<storageArray.length;i++){
			var recordArray = storageArray[i].split(',');
			if (CompareDates(recordArray[0],date)==0) {
				var replaseElement = date+","+id+","+money+","+nick;
				storageArray[i]=replaseElement;
				insTo = -1;
				i=storageArray.length;	
			}
			if (CompareDates(recordArray[0],date)==1) insTo = i+1;
			if (CompareDates(recordArray[0],date)==-1) i=storageArray.length;	
		}
		if (insTo >= 0){
			var newElement = date+","+id+","+money+","+nick;
			storageArray.splice(insTo, 0, newElement);
		}
		
		var outDate = OutTime(new Date((GM_getValue("wigBotLastUpdate",0)-86400)*1000));
		for (i=storageArray.length-1;i>=0;i--){
			if (storageArray[i]==""){
				storageArray.splice(i, 1);
			}else{
				try{
					var recordArray = storageArray[i].split(',');
					if (CompareDates(recordArray[0],outDate)==-1) ;//storageArray.splice(i, 1);
					if (recordArray[0].substr(1,1)=='.') storageArray.splice(i, 1);
					if (recordArray[1]=='') storageArray.splice(i, 1);
				} 
				catch (e) {
					storageArray.splice(i, 1);
					//alert(storageArray[i]);
				};
			}
		}
		var resultData = storageArray.join(';');
		GM_setValue("wigBotDayStorage",resultData);
		GM_setValue("wigBotCountAtack",storageArray.length);
		//alert(storageArray.length);
		var moneyCount=0;
		var poorCount = 0;
		var reachCount =0;
		var moneyCountDay=0;
		var countCountDay = 0;
		for (i=0;i<storageArray.length;i++){
			var recordArray = storageArray[i].split(',');
			if (!isNaN(parseInt(recordArray[2]))){
				moneyCount += parseInt(recordArray[2]);
				if (parseInt(recordArray[2])>1000) reachCount++;
				if (parseInt(recordArray[2])<300) poorCount++;
				if (CompareDates(recordArray[0],outDate)!=-1) {
					moneyCountDay += parseInt(recordArray[2]);
					countCountDay++;
				/*	if (countCountDay==120)
						alert(recordArray[0]+" "+outDate);*/
					;//storageArray.splice(i, 1);
				};
			}else{
				poorCount++;
				if (CompareDates(recordArray[0],outDate)!=-1) {
					countCountDay++;
				};
			}
		}
		GM_setValue("wigBotCountMoney",moneyCount);
		GM_setValue("wigBotReachCount",reachCount);
		GM_setValue("wigBotCountMoneyDay",moneyCountDay);
		GM_setValue("wigBotCountAtackDay",countCountDay);
		GM_setValue("wigBotPoorCount",poorCount);

	//	var storageArray = storageData.split(';');
	}
	function BuyPetrolCar(){
		$('form[action="/automobile/buypetrol/7937/"]').eq(0).submit();
	}
	//alert(GM_getValue("wigBotRideCount",""));
	if (GM_getValue("wigBotRideCount","")>=5){
		if (hrefPage == '/automobile/car/7937/'){
			var fuelCount = TakeSubString(document.documentElement.innerHTML,'Топливо: ','/');
			if (fuelCount==0){
				setTimeout(BuyPetrolCar,1000);
			}else{
				GM_setValue("wigBotRideCount",5-fuelCount);
				setTimeout(GoToAlley,1000);
			}
		}else{
			setTimeout(GoToCar,1000);
		}
		return;
	}
	if (hrefPage == '/desert/'){
		setTimeout(GoToDesertRob,1000);
	}
	if (hrefPage.substr(0,6) == '/home/'){
		setTimeout(GoToAlley,1000);
	}
	if (hrefPage == '/desert/rob/'){
		setTimeout(GoToAlley,1000);
	}
	if (hrefPage == '/huntclub/'){
		var countText = parseInt(TakeSubString(document.documentElement.innerHTML,'Можно выполнить заказов: ','</p>'));  
		GM_setValue("wigBotHuntCount",countText);
		GM_setValue("wigBotHuntCountUpdate",curUpdateTime);
	}
/*	if (hrefPage == '/metrowar/clan/'){
		var count = $(".collectbar").length;
		var i;
		for (i=0;i<count;i++){
			alert($(".collectbar").eq(i).html());
		}
	}*/
	
/*	 if (hrefPage == '/arbat/'){
		if ($(".ride-button").eq(0).html() != null){
			setTimeout(TaxiModeSubmit,1000);
			return;
		}
		var taxiCounter = $("#cooldown");
		var taxiEndTime = taxiCounter.attr('endtime');
		GM_setValue("wigBotTaxiEndTime",taxiEndTime);
		if ((taxiEndTime-curUpdateTime)<0){
			setTimeout(GoToArbat,1000);
			return;
		}else{
			var outDate = OutOnlyTime(new Date((taxiEndTime)*1000));
			AddToNextAction('Ожидание такси - '+outDate);
			setTimeout(GoToArbat,(taxiEndTime-curUpdateTime)*1000);
		}
	}else{
		var taxiEndTimeSaved = GM_getValue("wigBotTaxiEndTime",0);
		if (taxiEndTimeSaved != 0){
			var different = taxiEndTimeSaved - curUpdateTime;
			if (different<0){
				setTimeout(GoToArbat,1000);
				return;
			}else{
				var outDate = OutOnlyTime(new Date(taxiEndTimeSaved*1000));
				AddToNextAction('Ожидание такси - '+outDate);
				setTimeout(GoToArbat,different*1000);
			}
		}
	}*/
	if ((curUpdateTime - GM_getValue("wigBotHuntCountUpdate",curUpdateTime))>3600){
		setTimeout(GoToHuntclub,10000);
	}
	var sportLotoLastView = new Date((GM_getValue("wigBotSportLotoLastView",curUpdateTime))*1000);
	var sportLotoLastViewDay = sportLotoLastView.getDate();
	var globalUpdateDate = new Date(curUpdateTime*1000);
	var globalUpdateDateDay = globalUpdateDate.getDate();
	
	if (hrefPage == '/casino/sportloto/'){
		if (document.documentElement.innerHTML.indexOf('Купить билетик')<0){
			$('#button-ticket-select').click();
			setTimeout(SportLotoRandomSelect,100);
		}
		if (document.documentElement.innerHTML.indexOf('Получить выигрыш')>0){
			setTimeout(SportLotoPrizeGet,100);
		}
		GM_setValue("wigBotSportLotoLastView",curUpdateTime);
		setRandTimeout(GoToAlley,3000);
		return;
	}
	if (globalUpdateDateDay!=sportLotoLastViewDay){
		GM_setValue("wigBotHuntCount",27);
		setRandTimeout(GoToSportLoto,1000);
		return;
	}
/*		var new_win = window.open('', 'разное','scrollbars=yes,menubar=no,top=0,left=0,toolbar=no,width=820,height=600,resizable=yes');
		var strWindow = (GM_getValue("wigBotDayStorage","").replace(new RegExp(";",'g'),'</td></tr><tr><td>'));
		strWindow = strWindow.replace(new RegExp(",",'g'),'</td><td>');
		new_win.document.body.innerHTML = "<table width='100%'><tr><td>"+strWindow+"</td></tr></table>";
		new_win.focus();*/
		
	//alert(GM_getValue("wigBotCountAtackDay2",0));

	//alert(curHP+' '+maxHP);
	if (curHP*1.4<maxHP){
		setRandTimeout(FlatHeal,1000);
	}
	if (hrefPage == '/alley/'){
		GM_setValue("wigBotPatrolAvaible",0);
		if (document.documentElement.innerHTML.indexOf('<option value="10">10 минут</option>') >= 0 ){
			GM_setValue("wigBotPatrolAvaible",1);
		}
		if (document.documentElement.innerHTML.indexOf('Улизнуть с патрулирования') >= 0){
			GM_setValue("wigBotPatrolAvaible",1);
		}
	}
	if ((hrefPage == '/alley/')&&(hrefTimeOut == '/alley/')&&(intMoney>10)&&(intMoney<9000)&&(GM_getValue("wigBotCountAtackDay2",0)<=500)){
		if (document.documentElement.innerHTML.indexOf('<option value="10">10 минут</option>') >= 0){
			GM_setValue("wigBotPatrolAvaible",1);
			setRandTimeout(StartPatrol,1000);
		}
		if (document.documentElement.innerHTML.indexOf('Улизнуть с патрулирования') >= 0){
			if (document.documentElement.innerHTML.indexOf('Девида Блейна') >= 0){
				setTimeout(GoToDesert,500);
			}
		}
	}
/*	<form style="text-align: center;" action="/fight/" method="post" id="flag-form">
<input name="action" value="join fight" type="hidden"><input name="fight" value="582002" type="hidden"><button class="button" type="submit"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">
                                                                    Буду участвовать в битве
                                                                </div></span></button>
</form>*/

	if (GM_getValue("wigBotMoneyToOre",false)==true){
/*		if (GM_getValue("wigBotCountAtackDay2",0)>=140){
			if (ProcedThimble(hrefPage,9000)) return;
		}else{*/
			var LastUpdateHour = (new Date(parseInt(GM_getValue("wigBotLastUpdate",0))*1000)).getHours();
			if (LastUpdateHour<8){
				if (ProcedThimble(hrefPage,15000)) return;
			}else{
				if (ProcedThimble(hrefPage,12000)) return;
			}
	//	}
	}	
	if (hrefPage=='/casino/slots/'){
	
	}
	if (hrefPage.substr(0,13)=='/alley/fight/'){
		setRandTimeout(GoToAlley,5000);
		if (GM_getValue("wigBotHntrs",false)==true){
			GM_setValue("wigBotHuntCount",parseInt(GM_getValue("wigBotHuntCount",0))-1);
			GM_setValue("wigBotHunterClubLastTryCount",10);
			GM_setValue("wigBotHunterClubLast",'');
		}
		unsafeWindow.fightForward();
		var defencePlayer = $(".fighter2").eq(0).html();
		var battleResult = $(".result").eq(0).html();
		if (defencePlayer == null){
			return;
		}
		if (battleResult == null){
			return;
		}
		var Winner1 = MySubString(battleResult,"Победитель:","</b></b>");
		var Winner = MySubString(Winner1,"<b><b>"," [");
		
		if (Winner != "Andrew Wiggin"){
			return;
		}
		var Price1 = MySubString(battleResult,'<span class="tugriki" title="','</i>');
		Price1 = Price1.replace(',', '');
		var Price = parseInt(MySubString(Price1,'">','<i>'));
		
		var Level = parseInt(MySubString(defencePlayer,'<span class="level">[',']</span>'));
		
		var DefenseId = parseInt(MySubString(defencePlayer,'<a href="/player/','/">'));
		
		setRandTimeout(function () {document.location.href='/player/'+DefenseId+'/';} ,3000);
		
		var DefenseNick1 = MySubString(defencePlayer,'<a href="/player/','<span class="level">');
		var DefenseNick = MySubString(DefenseNick1,'/">','</a>');
	
		var Time2 = MySubString(battleResult,'</a><br>',')');
		var posOpen = Time2.indexOf('(');
		var strDate = Time2.substr(posOpen+1);
		var strTime = Time2.substr(0,8);
		
		//alert(Level);
		//if (Level == 9){
			//alert(strDate+' '+strTime+';'+DefenseId+';'+Price+';'+DefenseNick);
		ParseDayStorage(strDate+' '+strTime,DefenseId,Price,DefenseNick);
		//return;
		//}
	}
	//	GM_setValue("wigBotHunterClub","");
	if (hrefPage.substr(0,8) == '/player/') {
		//Lives = GetLives(document.documentElement.innerHTML,document.location.href);
		setRandTimeout(GoToAlley,5000);
	}
	if ((GM_getValue("wigBotHntrs",false)==true)&&(parseInt(GM_getValue("wigBotHuntCount",0))>0)){
		AddToNextAction('Last target: '+GM_getValue("wigBotHunterClubLast",''));
		AddToNextAction('Last count: '+GM_getValue("wigBotHunterClubLastTryCount",''));
		if (hrefPage.substr(0,8) == '/player/') {
			//alert(parseInt(GM_getValue("wigBotHunterClubLastTryCount",0))<=10);
			if (hrefPage == '/player/'+GM_getValue("wigBotHunterClubLast",'')+'/'){
				//curLives = GetLives(response.responseText,response.finalUrl);
				if (parseInt(GM_getValue("wigBotHunterClubLastTryCount",0))<=5){
					GM_setValue("wigBotHunterClubLastTryCount",parseInt(GM_getValue("wigBotHunterClubLastTryCount",0))+1);
				//alert("retry");
					unsafeWindow.alleyAttack(GM_getValue("wigBotHunterClubLast",''));
					return;				
				}
			}
		}	
		GM_setValue("wigBotHunterClubLastTryCount",0);
		if (hrefPage.substr(0,17) != '/huntclub/wanted/') {
			if (!isNaN(hrefTimeOutET)) {
				setRandTimeout(GetWantedAll,(hrefTimeOutET-curUpdateTime)*1000+1000);
				return;
			}
			setRandTimeout(GetWantedAll,1000);
			return;
		}	
		if (hrefPage.substr(0,17) == '/huntclub/wanted/'){
			if (!isNaN(hrefTimeOutET)) {
				setRandTimeout(GetWantedAll,(hrefTimeOutET-curUpdateTime)*1000+1000);
				return;
			}
			str_table = $(".list").eq(0).html();
			
			var hunterData = GM_getValue("wigBotHunterClub","");
			var hunterArray = hunterData.split(';');
			var hunterPlayers = [];
			var hunterPlayers2 = [];
			for (var i=0;i<hunterArray.length;i++){
				if (hunterArray[i]!=""){
					var current = hunterArray[i].split(',');
					hunterPlayers[current[0]] = current[1];
					hunterPlayers2[current[0]] = current[2];
				}
			}
			function AtackRecurse(playerId){  
				AddToNextAction('Try Attack: '+playerId);                                                                                
				GM_xmlhttpRequest({
					method: "POST",
					url: "/alley/",
					data: "action=attack&player="+playerId+"werewolf=0&useitems=0",
					onload: function(response) {
						AddToNextAction(response.finalUrl);
					}
				});
			}
			
			while (str_table.indexOf('<td class="name">')>=0){
				var index1 = str_table.indexOf('<td class="name">');
				var index2 = str_table.indexOf('</tr>',index1);
				var newStr = str_table.substr(index1,index2-index1);
				//alert(newStr);
				var level = parseInt(MySubString(newStr, '<span class="level">[', ']</span>'));
				var str_table = str_table.substr(index2+5);
				//if (level!=9) continue;
				if (level!=10) continue;
				//if (level!=11) continue;
				var indexAttackButton1 = newStr.indexOf('alleyAttack(')+12;
				if (indexAttackButton1<12) continue;
				var indexAttackButton2 = newStr.indexOf(')',indexAttackButton1);
				var indexDef = newStr.substr(indexAttackButton1,indexAttackButton2-indexAttackButton1);
				if (hunterPlayers[indexDef]!= undefined){
					if (parseInt(hunterPlayers[indexDef])<3000){
						GM_setValue("wigBotHunterClubLastCurLives",hunterPlayers2[indexDef]);
						GM_setValue("wigBotHunterClubLast",indexDef);
						unsafeWindow.alleyAttack(indexDef);
					}else{
						AddToNextAction('Skip: '+indexDef+', lives: '+hunterPlayers[indexDef]);
					}
					continue;
				}
				AddToNextAction('Request info: '+indexDef+'.');
				GM_xmlhttpRequest({
					method: "GET",
					url: "http://www.sofiawars.com/player/"+indexDef+"/",
					onload: function(response) {	
						lives = GetLives(response.responseText,response.finalUrl);
						//alert(lives.length);
						//alert(lives[0]+' '+lives[1]+' '+lives[2]);
						var st = lives[2];
						if (GM_getValue("wigBotHunterClub","")==""){
							GM_setValue("wigBotHunterClub", lives[2]+','+lives[1]);
						}else{
							GM_setValue("wigBotHunterClub", GM_getValue("wigBotHunterClub","")+';'+lives[2]+','+lives[1]+','+lives[0]);
						}
						AddToNextAction('Add info: '+lives[2]+', lives: '+parseInt(lives[1]));
						if (parseInt(lives[1])>3000) return;
						GM_setValue("wigBotHunterClubLast",lives[2]);
						GM_setValue("wigBotHunterClubLastCurLives",lives[0]);
						unsafeWindow.alleyAttack(lives[2]);
					}
				});
			}
			//<a href="/huntclub/wanted/level/all/page/2/"><span class="arrow">←</span>
			//<a href="/huntclub/wanted/level/all/page/2/"><span class="arrow">→</span></a>
			//if ('"><span class="arrow">→</span>')
			var str_scroll = $(".pagescroll").eq(0).html();
			if (str_scroll != null){
				var strNext = '"><span class="arrow">→</span>';
				var strPrev = '"><span class="arrow">←</span>';
				var indexNext = str_scroll.indexOf(strNext);
				var indexPrev = str_scroll.indexOf(strPrev);
				if (indexNext>0){
					var SomeValue = str_scroll.substr(indexNext-40,40);
					var NextHref = SomeValue.substr(SomeValue.indexOf('="')+2);
					setRandTimeout(function () {top.location.href=NextHref;} ,5000);
				}else if (indexPrev>0){
					var SomeValue = str_scroll.substr(indexPrev-40,40);
					var PrevHref = SomeValue.substr(SomeValue.indexOf('="')+2);
					setRandTimeout(function () {top.location.href=PrevHref;} ,5000);
				}
			}
			setRandTimeout(GetWantedAll,6000);
			return;
		}
		return;
	}else{
		GM_setValue("wigBotHunterClub","");
	}
	if (GM_getValue("wigBotOn",false)==true){
		if((intMoney>700)&&(intMoney<6000)&&(GM_getValue("wigBotCountAtackDay2",0)>120)){
		//if((GM_getValue("wigBotCountAtackDay2",0)>30)){
			if (hrefTimeOut!='/shaurburgers/'){
				if (hrefPage == '/shaurburgers/'){
					setRandTimeout(ShrauWorkHour,1500);	
				}else{
					setRandTimeout(GoToShaurburgers,1500);
				}
				return;
			}
		}
		if(GM_getValue("wigBotCountAtackDay2",0)>=140){
			if (hrefTimeOut!='/shaurburgers/'){
				if (hrefPage == '/shaurburgers/'){
					setRandTimeout(ShrauWorkHour,1500);	
				}else{
					setRandTimeout(GoToShaurburgers,1500);
				}
				return;
			}
		}
	}
	if (GM_getValue("wigBotCreatePetrs",false)==true){	
		if (ProcedPetricks()) return;
	}
	 
	if (hrefPage.substr(0,13)=="/phone/duels/"){
		var i=0;
		var count = $(".date").length;
		 
		for (i=0;i<count;i++){
			var strDate = $(".date").eq(i).html();
			if (strDate.substr(1,1)=='.'){
				strDate = '0'+strDate;
			}
			var strText = $(".text").eq(i).html();
			var strLevel = TakeSubString(strText,'<span class="level">[',']</span>');
			//if ((parseInt(strLevel)!=6)&&(parseInt(strLevel)!=7)&&(parseInt(strLevel)!=8)&&(parseInt(strLevel)!=9)&&(parseInt(strLevel)!=10)&&(parseInt(strLevel)!=11)) continue;
			if (strText.indexOf('Крысомаха ')!=-1){
				continue;
			}
			var strPlayerID =  TakeSubString(strText,'<a href="/player/','/">');
			var strPlayerNick =  TakeSubString(strText,'<a href="/player/'+strPlayerID+'/">','</a>');
			var strMoneyTake =  TakeSubString(strText,'<span class="tugriki">','<i>');
			strMoneyTake = strMoneyTake.replace(',', '');
			ParseDayStorage(strDate,strPlayerID,strMoneyTake,strPlayerNick);
		}
	}
		//GM_setValue("wigBotHunterClub","");
	/*	if (hrefPage.substr(0,8)=="/player/"){
			GetLives(document.body.innerHTML);
		}	*/
	
	if (hrefTimeOut=='/alley/'){
		GM_setValue("wigBotHunterClubLast",'');
		GM_setValue("wigBotHunterClubLastTryCount",0);
	//	StartPatrol();
		//alert(GM_getValue("wigBotHunterClubLastTryCount",0));
	}
	if (curUpdateTime<(GM_getValue("wigBotPetricks")-110)) {
		var outDate = OutOnlyTime(new Date(GM_getValue("wigBotPetricks",0)*1000));
		AddToNextAction('Ожидание таймера (петрики) - '+outDate);
		setRandTimeout(GoToAlley,(GM_getValue("wigBotPetricks",0)-curUpdateTime+121)*1000);
	}	
	
	if ((hrefPage=='/shop/section/other/')&&(GM_getValue("wigBotKirkaCount",0)<=0)){
		if (intMoney>1500){
			idString = TakeSubString(document.documentElement.innerHTML.substr(document.documentElement.innerHTML.indexOf('/images/obj/underground2.png')),"shopBuyItem('","', 70, '/shop/section/other/');");
			GM_setValue("wigBotKirkaCount",15);
			unsafeWindow.shopBuyItem(idString, 70, '/shop/section/other/');
			return;
		}
	}
/*	if (hrefTimeOut=='/metro/'){
			if (GM_getValue("wigBotKirkaCount",0)<=0){
				setRandTimeout(GoToPlayer,(hrefTimeOutET-curUpdateTime)*1000+1000);
				return;
			}	*/
	if (GM_getValue("wigFarm",false)==true){
		if ((hrefPage=="/alley/search/level/")||(hrefPage=="/alley/search/again/")){
			if ($(".num").length != 14){
				setRandTimeout(GoToAlley,1000);
				return;
			}
			var val1 = parseInt($(".num").eq(0).html())+parseInt($(".num").eq(1).html())+parseInt($(".num").eq(2).html())+
					   parseInt($(".num").eq(3).html())+parseInt($(".num").eq(4).html())+parseInt($(".num").eq(5).html());
			var val2 = parseInt($(".num").eq(7).html())+parseInt($(".num").eq(8).html())+parseInt($(".num").eq(9).html())+
					   parseInt($(".num").eq(10).html())+parseInt($(".num").eq(11).html())+parseInt($(".num").eq(12).html());
			
			var targetID = FindAlley();
			var Fights = GetPlayerFightsArray(targetID);
			
			if (Fights.length>=2){
				var AllMoney = 0;
				for (var j=0;j<Fights.length;j++){
					var CurMoney = parseInt(Fights[j][2]);
					if (isNaN(CurMoney)) CurMoney=0;
					AllMoney += CurMoney;
				}
				var Avarage = AllMoney/Fights.length;
				if (Avarage<200){
					setRandTimeout(SelectAgain,1000);
					if (GM_getValue("wigBotSkiped","")==""){
						GM_setValue("wigBotSkiped",targetID);
					}else{
						GM_setValue("wigBotSkiped",GM_getValue("wigBotSkiped","")+';'+targetID);
					}
					return;
				}
			}
			if (val1*0.7>val2){
				setRandTimeout(AtackTarget,1000);
			}else{
				setRandTimeout(SelectAgain,1000);
			}
			return;
		}		
		/*if ((hrefPage=="/alley/search/type/")||(hrefPage=="/alley/search/again/")){
			if ($(".num").length != 14){
				setRandTimeout(GoToAlley,1000);
				return;
			}
			var lvl = $(".level").eq($(".level").length-1).html();
			var lvlPars = parseInt(TakeSubString(lvl,'[',']'));
			var val1 = parseInt($(".num").eq(0).html())+parseInt($(".num").eq(1).html())+parseInt($(".num").eq(2).html())+
					   parseInt($(".num").eq(3).html())+parseInt($(".num").eq(4).html())+parseInt($(".num").eq(5).html());
			var val2 = parseInt($(".num").eq(7).html())+parseInt($(".num").eq(8).html())+parseInt($(".num").eq(9).html())+
					   parseInt($(".num").eq(10).html())+parseInt($(".num").eq(11).html())+parseInt($(".num").eq(12).html());
			
			var targetID = FindAlley();
			var Fights = GetPlayerFightsArray(targetID);
			
			if (Fights.length>=2){
				var AllMoney = 0;
				for (var j=0;j<Fights.length;j++){
					var CurMoney = parseInt(Fights[j][2]);
					if (isNaN(CurMoney)) CurMoney=0;
					AllMoney += CurMoney;
				}
				var Avarage = AllMoney/Fights.length;
				if (Avarage<200){
					setRandTimeout(SelectAgain,1000);
					if (GM_getValue("wigBotSkiped","")==""){
						GM_setValue("wigBotSkiped",targetID);
					}else{
						GM_setValue("wigBotSkiped",GM_getValue("wigBotSkiped","")+';'+targetID);
					}
					return;
				}
			}
			//alert(lvlPars);
			if ((lvlPars<11)){
				setRandTimeout(AtackTarget,1000);
			}else{
				setRandTimeout(SelectAgain,1000);
			}
			return;
		}*/
		if (hrefPage=="/alley/"){
			var outDate = OutOnlyTime(new Date((hrefTimeOutET)*1000+1000));
			AddToNextAction('Ожидание слаб(заколуки) - '+outDate);
			setRandTimeout(SelectTarget,(hrefTimeOutET-curUpdateTime)*1000+1000);
			//return;
		}
	}
	
	if (hrefTimeOut=='/metro/'){
		if ((GM_getValue("wigBotKirkaCount",0)<=0)&&(hrefPage=='/metro/')){
			setRandTimeout(GoToPlayer,1000);
			return;
		}
		if (hrefTimeOutET-curUpdateTime>15){
			AddToNextAction('Копаем в метро - '+OutOnlyTime(new Date((hrefTimeOutET-10)*1000)));
			setRandTimeout(GoToMetro,(hrefTimeOutET-curUpdateTime-10)*1000);
		}else{
			setRandTimeout(GoToMetro,(hrefTimeOutET-curUpdateTime)*1000+1000);
		}
	}
	
	if ((GM_getValue("wigBotMetroDig",false)==true)&&(parseInt(GM_getValue("wigBotKirkaCount",0))>0)&&(intMoney<9000)&&(parseInt(curUpdateTime)-parseInt(GM_getValue("wigBotRatLastMeet",0))>46800)&&(GM_getValue("wigBotPatrolAvaible",1)==0)){
		if (hrefPage=="/metro/"){
			if (document.body.innerHTML.indexOf("%</b>")>=0){
				setRandTimeout(StartMetroDig,500);
				return;
			}
			if(TakeSubString(document.body.innerHTML,'<span id="ratlevel">',"</span>")!=""){
				setRandTimeout(LeaveMetro2,1000);
				GM_setValue("wigBotRatCount",(parseInt(GM_getValue("wigBotRatCount",0))+1));
				GM_setValue("wigBotRatLastMeet",curUpdateTime);
				return;
			}
		}
		if (((hrefTimeOut=='//')&&(GM_getValue("wigFarm",false)==true))){
			setRandTimeout(GoToAlley,500);
		}
		if ((hrefTimeOut=='/alley/')||((hrefTimeOut=='//')&&(GM_getValue("wigFarm",false)!=true))){
			if ((hrefPage=="/metro/")||(GM_getValue("wigFarm",false)!=true)){
				GM_setValue("wigBotKirkaCount",(parseInt(GM_getValue("wigBotKirkaCount",0))-1));
				setRandTimeout(StartMetroWork,500);
			}else{
				setRandTimeout(GoToMetro,500);
			}
		}

	}
	if ((GM_getValue("wigBotMetroDig",false)==true)&&(GM_getValue("wigFarm",false)==true)){
	//	wigBotMetroDig,wigFarm
	}
	if (hrefPage=="/metro/"){
		setRandTimeout(GoToAlley,1000);
		return;
	}	
	//	alert(count);
	if (hrefPage=="/player/"){
		var FindKirka = MySubString(document.body.innerHTML,'Использований: ','/15');
		var count = parseInt(FindKirka);
		if(isNaN(count)) count=0;
		GM_setValue("wigBotKirkaCount",count);
		if (count==0){
			setRandTimeout(GoToShopOther,1000);	
			return;
		}
	}else{
	}
	if (hrefPage!="/alley/"){
		var outDate = OutOnlyTime(new Date((hrefTimeOutET)*1000+5000));
		var outDate2 = OutOnlyTime(new Date((curUpdateTime+3600)*1000+5000));
		if ((hrefTimeOutET-curUpdateTime)<3600){
			AddToNextAction('Ожидание таймера (заколуки) - '+outDate);
			setRandTimeout(GoToAlley,(hrefTimeOutET-curUpdateTime)*1000+1000);
		}else{
			AddToNextAction('Ожидание таймера (заколуки) - '+outDate2);
			setRandTimeout(GoToAlley,3600*1000+1000);		
		}
		return;
	}
	var outDate = OutOnlyTime(new Date((hrefTimeOutET)*1000+1000));
	AddToNextAction('Ожидание таймера (заколуки) - '+outDate);
	if ((hrefTimeOutET-curUpdateTime)<3600)
		setRandTimeout(GoToAlley,(hrefTimeOutET-curUpdateTime)*1000+1000);
	else
		setRandTimeout(GoToAlley,3600*1000+1000);
	return;
	//alert(intOre);
	//alert(hrefPage);
	//setRandTimeout(SelectTarget,(hrefTimeOutET-curUpdateTime)*1000+1000);*/
	
};
/*

var sLastAtack = '<div id="wigBotLastDayInner" style="height:300px;width:100%;margin:0 auto;background-color:#409999;border: 0px black solid;text-align: center;color:#FFFFFF;">Последние 24 часа</div>';
sLastAtack = '<div id="wigBotLastDay" style="height:300px;width:200px;position:fixed;top:0;left:852px;z-index:2;margin:0 auto;background-color:#e0ffff;border: 1px black solid;">'+sLastAtack+'</div>';

var el4 = document.createElement("div");
el4.innerHTML = sLastAtack;
document.body.appendChild(el4);*/
