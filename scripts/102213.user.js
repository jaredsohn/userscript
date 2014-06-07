// ==UserScript==
// @name        Ikariam.ru BattleLog saver
// @version     1.6b
// @date        2010-09-24
// @author      RuKi with help of Demetros
// @description Позволяет сохранить боевой доклад сервера Икариам (v0.4.0) на логомолотилках шахтеров.нет и икацентр.
//
// @include     http://s*.ikariam.*/index.php?view=militaryAdvisorReportView*
// @include     http://s*.ikariam.*/index.php?view=safehouseReport*
// @include     http://s*.ikariam.*/index.php?action=Espionage*
// ==/UserScript==

// this script partially based on IkaLogo script by Vitramir and logo4ikariam script by MaxPayne
// foreign language support idea by stnkvcmls

( function() {  // this will prevent from collisions with other possible scripts installed

// GLOBAL VARS

var roundNo;
var timeout;
var numRoundsToSave;
var battleOngoing;
var lang;

var language = { 
	ru: { textChoseLogSite: "Выберите логовницу и тип лога:", 
	      textHeader: "Сохранить боевой доклад", 
	      textSave: "Сохранить", 
	      textGettingRound: " Получение раунда номер: ", 
	      textComment: "Комментарий:", 
	      textShort: "краткий",
	      textFull: "полный",
	      textLast3: "3 последних",
	      textGettingRoundError: "Ошибка получения раунда ",
	      textHeaderSpy: "Сохранить доклад шпиона" },
	en: { textChoseLogSite: "Choose logging site:", 
	      textHeader: "Save battle report", 
	      textSave: "Save", 
	      textGettingRound: " Getting round no: ",
	      textComment: "Add comment:", 
	      textShort: "short",
	      textFull: "full",
	      textLast3: "last 3",
	      textGettingRoundError: "Error getting round ",
	      textHeaderSpy: "Save spy report" },
	by: { textChoseLogSite: "Абярыце лагоўніцу:", 
       	      textHeader: "Захаваць баявы даклад", 
              textSave: "Захаваць", 
              textGettingRound: " Атрыманне раунда нумар: ", 
              textComment: "Каментар:", 
              textShort: "скарочаны",
              textFull: "падрабязны",
              textLast3: "3 апошніх" ,
	      textGettingRoundError: "Памылка пры атрыманні раунда ",
	      textHeaderSpy: "Захаваць даклад шпіёна" }
}

function setLoggingSite(chosenLogSite){
        setCookie("chosenLogSite",chosenLogSite,365);
        return;
}

function SaveLogButton(){
        var BattleForm = document.createElement('form');
        BattleForm.setAttribute('method','post');
        BattleForm.setAttribute('target','_blank');
        BattleForm.setAttribute('style', 'display:none;');
        BattleForm.setAttribute('id', 'BattleFormId');

        roundNo=document.getElementById('troopsReport').innerHTML.match(/combatRound=(\d+)/)[1];

        var results=document.getElementsByClassName('result');
        if (results.length==0){
        	battleOngoing = true;
        } else {
        	battleOngoing = false;
        }
     
        switch (getCookie("chosenLogSite")) {
                case "ShahterovShort":
                        BattleForm.setAttribute('action','http://ikariam.shahterov.net/save.php');
                        var elem1 = document.createElement('input');
                        elem1.type = 'hidden';
                        elem1.name = 'report_2';
                        elem1.value = '<div id="mainview">'+document.getElementById('troopsReport').innerHTML+'</div>';
                        BattleForm.appendChild(elem1);
                        var elem2 = document.createElement('input');
                        elem2.type = 'hidden';
                        elem2.name = 'comment';
                        elem2.value = document.getElementById('LogComment').value;
                        BattleForm.appendChild(elem2);
                        document.body.appendChild(BattleForm);
                        BattleForm.submit();
                        document.body.removeChild(BattleForm);
                        break;
                case "ShahterovFull":
                        BattleForm.setAttribute('action','http://ikariam.shahterov.net/save.php');
                        var elem1 = document.createElement('input');
                        elem1.type = 'hidden';
                        elem1.name = 'report_2';
                        elem1.value = '<div id="mainview">'+document.getElementById('troopsReport').innerHTML+'</div>';
                        BattleForm.appendChild(elem1);
                        var elem2 = document.createElement('input');
                        elem2.type = 'hidden';
                        elem2.name = 'comment';
                        elem2.value = document.getElementById('LogComment').value;
                        BattleForm.appendChild(elem2);
                        var elem3 = document.createElement('input');
                        elem3.type = 'hidden';
                        elem3.name = 'report_1';
                        elem3.value = '<link href="/skin/ik_militaryAdvisorDetailedReportView_0.3.2.css" rel="stylesheet" type="text/css" media="screen" />';
                        BattleForm.appendChild(elem3);
                        document.body.appendChild(BattleForm);
                        //roundNo=1;
                        //removeElement(document.getElementById('SaveLogButton'));
                        document.getElementById('SaveLog').innerHTML='<img src="skin/resources/icon_time.gif" height=11px style="display:inline;"/>'+language[lang].textGettingRound+roundNo;
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = fullReportHandler;
                        //xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        var combatId=document.URL.split('&')[1].split('=')[1];
                        xmlhttp.open('GET', 'index.php?view=militaryAdvisorDetailedReportView&combatRound='+roundNo+'&detailedCombatId='+combatId, true);
//                      xmlhttp.overrideMimeType('text/xml');
                        xmlhttp.send(null);
                        timeout = setTimeout( function(){ xmlhttp.abort(); handleError("Timeout!") }, 10000);
                        break;
                case "IkacenterShort":
                        BattleForm.setAttribute('action','http://ikacenter.ru/ikac_save_fight.php');
                        var elem1 = document.createElement('input');
                        elem1.type = 'hidden';
                        elem1.name = 'fight_short';
                        elem1.value = document.getElementsByTagName('html')[0].innerHTML;
                        BattleForm.appendChild(elem1);
                        var elem2 = document.createElement('input');
                        elem2.type = 'hidden';
                        elem2.name = 'fight_comments';
                        elem2.value = document.getElementById('LogComment').value;
                        BattleForm.appendChild(elem2);
                        document.body.appendChild(BattleForm);
                        BattleForm.submit();
                        document.body.removeChild(BattleForm);
                        break;
                case "IkacenterFull":
                        BattleForm.setAttribute('action','http://ikacenter.ru/ikac_save_fight.php');
                        var elem1 = document.createElement('input');
                        elem1.type = 'hidden';
                        elem1.name = 'fight_short';
                        elem1.value = document.getElementsByTagName('html')[0].innerHTML;
                        BattleForm.appendChild(elem1);
                        var elem2 = document.createElement('input');
                        elem2.type = 'hidden';
                        elem2.name = 'fight_comments';
                        elem2.value = document.getElementById('LogComment').value;
                        BattleForm.appendChild(elem2);
                        document.body.appendChild(BattleForm);
                        //roundNo=1;
                        //removeElement(document.getElementById('SaveLogButton'));
                        document.getElementById('SaveLog').innerHTML='<img src="skin/resources/icon_time.gif" height=11px style="display:inline;"/>'+language[lang].textGettingRound+roundNo;
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = fullReportHandler;
                        //xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        var combatId=document.URL.split('&')[1].split('=')[1];
                        xmlhttp.open('GET', 'index.php?view=militaryAdvisorDetailedReportView&combatRound='+roundNo+'&detailedCombatId='+combatId, true);
                        xmlhttp.send(null);
                        timeout = setTimeout( function(){ xmlhttp.abort(); handleError("Timeout!") }, 20000);
                        break;
                case "IkacenterLast3":
                	numRoundsToSave=3;
                        BattleForm.setAttribute('action','http://ikacenter.ru/ikac_save_fight.php');
                        var elem1 = document.createElement('input');
                        elem1.type = 'hidden';
                        elem1.name = 'fight_short';
                        elem1.value = document.getElementsByTagName('html')[0].innerHTML;
                        BattleForm.appendChild(elem1);
                        var elem2 = document.createElement('input');
                        elem2.type = 'hidden';
                        elem2.name = 'fight_comments';
                        elem2.value = document.getElementById('LogComment').value;
                        BattleForm.appendChild(elem2);
                        document.body.appendChild(BattleForm);
                        document.getElementById('SaveLog').innerHTML='<img src="skin/resources/icon_time.gif" height=11px style="display:inline;"/>'+language[lang].textGettingRound+roundNo;
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = fullReportHandler;
                        var combatId=document.URL.split('&')[1].split('=')[1];
                        xmlhttp.open('GET', 'index.php?view=militaryAdvisorDetailedReportView&combatRound='+roundNo+'&detailedCombatId='+combatId, true);
                        xmlhttp.send(null);
                        timeout = setTimeout( function(){ xmlhttp.abort(); handleError("Timeout!") }, 20000);
                        break;
        }
        return;
}

function fullReportHandler(){    //when request for full report complete, then add response to form
         if(this.readyState == 4){
               if(this.status != 200){
                       handleError(textGettingRoundError+"("+this.status+","+roundNo+")");
               }
               //else {   do not need this - behavior is the same in case of error and if all rounds received
                       clearTimeout(timeout); // clear timeout at readyState=4
                       
                       var checkRoundExistence=this.responseText.match(/id="battlefield"/); 
                       if (checkRoundExistence!=null) { //check if we participated in this round
                                var firstRound=this.responseText.match(/detailedCombatId=\d+&view=militaryAdvisorDetailedReportView&combatRound=(\d+)'><img src='skin\/combatreport\/arrow_first.gif/);
                	        var prevRound=this.responseText.match(/detailedCombatId=\d+&view=militaryAdvisorDetailedReportView&combatRound=(\d+)'><img src='skin\/combatreport\/arrow_back.gif/);
                                var nextRound=this.responseText.match(/detailedCombatId=\d+&view=militaryAdvisorDetailedReportView&combatRound=(\d+)'><img src='skin\/combatreport\/arrow_fore.gif/);
      	 			var lastRound=this.responseText.match(/detailedCombatId=\d+&view=militaryAdvisorDetailedReportView&combatRound=(\d+)'><img src='skin\/combatreport\/arrow_last.gif/);

                                switch (getCookie("chosenLogSite")) {
                                        case "ShahterovFull":
		                		if (nextRound==null && prevRound==null){ //there is only one round. save it
                                               		var response = this.responseText.substring(this.responseText.indexOf('<div id="mainview">',this.responseText.indexOf('<div id="cityNav">')));
                                               		document.getElementsByName('report_1')[0].value = response;   
							submitLogData();
			                        } else if (battleOngoing){//battle is ongoing
                                               		var response = this.responseText.substring(this.responseText.indexOf('<div id="mainview">',this.responseText.indexOf('<div id="cityNav">')));
                                               		document.getElementsByName('report_1')[0].value = response + document.getElementsByName('report_1')[0].value;   

			                	        if (prevRound==null){//no more rounds left
								submitLogData();
			                                } else {//battle is ongoing (the link is on last round). save round backwards.
			                                        roundNo=prevRound[1];
			                                        getNextRound(prevRound[0]);
			                                }
			                        } else {//old log. battle has finished already
                                               		var response = this.responseText.substring(this.responseText.indexOf('<div id="mainview">',this.responseText.indexOf('<div id="cityNav">')));
                                               		document.getElementsByName('report_1')[0].value += response;   

			                	        if (nextRound==null){//no more rounds left
								submitLogData();
			                                } else {//continue saving rounds
				                                roundNo=nextRound[1];  //if battle participated not from begining not all rounds shown in detailed report
				                                getNextRound(nextRound[0]);
			                                }
			                        }
                                                break;
                                        case "IkacenterFull":
	                                        var elem3 = document.createElement('input');
	                                        elem3.type = 'hidden';
	                                        elem3.name = 'fight_full['+roundNo+']';
	                                        elem3.value = this.responseText;  
	                                        document.getElementById("BattleFormId").appendChild(elem3);
		                	
			                	if (nextRound==null && prevRound==null){ //there is only one round. save it
							submitLogData();
						} else if (battleOngoing){//battle is ongoing
			                	        if (prevRound==null){//no more rounds left
								submitLogData();
			                                } else {//battle is ongoing (the link is on last round). save round backwards.
			                                        roundNo=prevRound[1];
				                                getNextRound(prevRound[0]);
			                                }
			                        } else {//old log. battle has finished already
			                	        if (nextRound==null){//no more rounds left
								submitLogData();
			                                } else {//continue saving rounds
				                                roundNo=nextRound[1];  //if battle participated not from begining not all rounds shown in detailed report
				                                getNextRound(nextRound[0]);
			                                }
			                        }
			                        break;
                                        case "IkacenterLast3":
                                                if (numRoundsToSave!=3 || nextRound==null || battleOngoing){ //do not save first round if it is not needed
                                                	var elem3 = document.createElement('input');
                                                	elem3.type = 'hidden';
                                                	elem3.name = 'fight_full['+roundNo+']';
                                                	elem3.value = this.responseText;  
                                                	document.getElementById("BattleFormId").appendChild(elem3);
                                                }
                                                
			                	if (nextRound==null && prevRound==null){ //there is only one round. save it
							submitLogData();
						} else if (battleOngoing){//battle is ongoing (easy)
			                	        if (prevRound==null || numRoundsToSave==1){//no more rounds left
								submitLogData();
			                                } else { //continue with rounds (backward)
			                                        numRoundsToSave=numRoundsToSave-1;
			                                        roundNo=prevRound[1];
			                                        getNextRound(prevRound[0]);
			                                }
			                        } else {//old log. battle has finished already
			                        	if (numRoundsToSave==3){ //first round got, start saving rounds from the end (backward)
			                       	 	   //numRoundsToSave=numRoundsToSave-1;
			                                   roundNo=lastRound[1];
			                                   getNextRound(lastRound[0]);
			                                   battleOngoing=true; //now switch to battle ongoing mode even if it is not
			                                }
			                        }
			                        break;
                                }
                       } else {// submit what we have
                       		submitLogData();
		       }
                //}
         }
         return;
}

function SaveSpyLogButton(){
        var SpyForm = document.createElement('form');
        SpyForm.setAttribute('method','post');
        SpyForm.setAttribute('target','_blank');
        SpyForm.setAttribute('style', 'display:none;');
        SpyForm.setAttribute('id', 'SpyFormId');
        SpyForm.setAttribute('action','http://ikariam.shahterov.net/save_spy.php'); // only shahterov.net supports spy logging yet

        var elem1 = document.createElement('input');
        elem1.type = 'hidden';
        elem1.name = 'spy_report';
        elem1.value = document.getElementsByTagName('html')[0].innerHTML;
        SpyForm.appendChild(elem1);
        var elem2 = document.createElement('input');
        elem2.type = 'hidden';
        elem2.name = 'comment';
        elem2.value = document.getElementById('SpyComment').value;
        SpyForm.appendChild(elem2);
        document.body.appendChild(SpyForm);
        SpyForm.submit();
        document.body.removeChild(SpyForm);
        return;
}

function submitLogData() {
         document.getElementById("BattleFormId").submit();
         document.body.removeChild(document.getElementById("BattleFormId"));
         document.getElementById('SaveLog').innerHTML='<a class=button href="#" id="SaveLogButton" onclick="return false;">'+language[lang].textSave+'</a>';
         return;
}

function getNextRound(roundLink) {
         document.getElementById('SaveLog').innerHTML='<img src="skin/resources/icon_time.gif" height=11px style="display:inline;"/>'+language[lang].textGettingRound+roundNo;
         var xmlhttp = new XMLHttpRequest();
         xmlhttp.onreadystatechange = fullReportHandler;
         xmlhttp.open('GET', 'index.php?'+roundLink, true);
         xmlhttp.send(null);
         timeout = setTimeout( function(){ xmlhttp.abort(); handleError("Timeout!") }, 20000);
         return;
}

function removeElement(node){
        return node.parentNode.removeChild(node);
}

function getCookie(c_name)  //example from w3school. mine wasn't working in Opera :)
{
        if (document.cookie.length>0)
        {
                var c_start=document.cookie.indexOf(c_name + "=");
                if (c_start!=-1)
                {
                        c_start=c_start + c_name.length+1;
                        var c_end=document.cookie.indexOf(";",c_start);
                        if (c_end==-1) c_end=document.cookie.length;
                        return unescape(document.cookie.substring(c_start,c_end));
                }
        }
        return;
}

function setCookie(c_name,value,expiredays)
{
        var exdate=new Date();
        exdate.setDate(exdate.getDate()+expiredays);
        document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
        return
}
        

function handleError(message) {
        alert("Ikariam.ru BattleLog saver: "+message);
        submitLogData();
        return;
}

function insertAfter(node, referenceNode) {
        referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
        return;
}

function getLang(){//author: stnkvcmls
	var url = document.URL.replace("http://","");
	url = url.substring(0,url.indexOf("/")).split('.');
	var length = url.length;
	if(url[3] == "co"){
		if(url[length-1] == "uk") return "en";
		else return url[length-1];
	} else {
		if(length == 3){
			if(url[length-1] == "com" || url[length-1] == "org") return "en";
			else return url[length-1];
		} else {
			if(url[1] == "us") return "en";
			else return url[1];
		}
	}
}

//MAIN
lang = getLang();
if (language[lang] == null){
       lang = 'ru';
}
      
var URLparts = document.URL.split('&');

if (URLparts[1] != null) {
   if (URLparts[1].split('=')[0] == 'combatId'){       //main military report opened
        var LogSite=getCookie("chosenLogSite");
        
        if (LogSite==null){   //first time
                setCookie("chosenLogSite","ShahterovShort",365);
                LogSite="ShahterovShort";
        }
    
        var BattleDynamicMenu = document.createElement("div");
        BattleDynamicMenu.id = 'DynamicBattleReport';
        BattleDynamicMenu.className = 'dynamic';
        BattleDynamicMenu.align='center';
        BattleDynamicMenu.innerHTML='<h3 class="header">'+language[lang].textHeader+'</h3> \
		                     <div class="content"> \
        	                        <p>'+language[lang].textChoseLogSite+'</p> \
                	                    <select id="LoggingSelect" class="citySelect bigFont" name="LoggingId" onchange="return false;"> \
                        	                <option class="coords" value="ShahterovShort" ' + (LogSite == 'ShahterovShort' ? 'selected="selected"' : '') + '><p>Shahterov.Net ('+language[lang].textShort+')</p></option> \
                                	        <option class="coords" value="ShahterovFull" ' + (LogSite == 'ShahterovFull' ? 'selected="selected"' : '') + '><p>Shahterov.Net ('+language[lang].textFull+')</p></option> \
                                        	<option class="coords" value="IkacenterShort" ' + (LogSite == 'IkacenterShort' ? 'selected="selected"' : '') + '><p>Ikacenter.ru ('+language[lang].textShort+')</p></option> \
	                                        <option class="coords" value="IkacenterFull" ' + (LogSite == 'IkacenterFull' ? 'selected="selected"' : '') + '><p>Ikacenter.ru ('+language[lang].textFull+')</p></option> \
        	                                <option class="coords" value="IkacenterLast3" ' + (LogSite == 'IkacenterLast3' ? 'selected="selected"' : '') + '><p>Ikacenter.ru ('+language[lang].textLast3+')</p></option> \
                	                    </select> \
                        	        <p>'+language[lang].textComment+'</p> \
	                                <textarea id="LogComment" style="font-size:12px;" name="LogComment" cols="30"></textarea> \
        	                        <div class="centerButton" id="SaveLog" style="height:17px;"><a class=button href="#" id="SaveLogButton" onclick="return false;">'+language[lang].textSave+'</a></div> \
                	             </div> \
	                             <div class="footer"></div>';

        document.getElementById("container2").insertBefore(BattleDynamicMenu,document.getElementById("backTo"));
        BattleDynamicMenu.addEventListener('change',function(event){if(event.target.id=='LoggingSelect')setLoggingSite(document.getElementById("LoggingSelect").options[document.getElementById("LoggingSelect").selectedIndex].value);}, true);
        BattleDynamicMenu.addEventListener('click',function(event){if(event.target.id=='SaveLogButton')SaveLogButton();}, true);
   } else if (URLparts[1].split('=')[0] == 'combatRound'){       //detailed military report opened
   //alert('preparing save round')
   //     var SaveRoundButton = document.createElement("div");
   //     SaveRoundButton.id = 'SaveRoundButtonID';
   //     SaveRoundButton.className = 'button';
   //     SaveRoundButton.innerHTML='Сохранить раунд';
        
   //     document.getElementById("defender").insertBefore(SaveRoundButton,document.getElementById("back"));
   //     SaveRoundButton.addEventListener('click',function(event){if(event.target.id=='SaveRoundButtonID')SaveRound();}, true);
   } else if(URLparts[0].split('=')[1]=='safehouseReports' || URLparts[0].split('=')[1]=='Espionage'){
        var SpyDynamicMenu = document.createElement("div");    //appears also when spy is trained. to be fixed!
        SpyDynamicMenu.id = 'DynamicSpyReport';
        SpyDynamicMenu.className = 'dynamic';
        SpyDynamicMenu.align='center';
        SpyDynamicMenu.innerHTML='<h3 class="header">'+language[lang].textHeader+'</h3> \
                                  <p>'+language[lang].textComment+'</p> \
	                          <textarea id="SpyComment" style="font-size:12px;" name="LogComment" cols="30"></textarea> \
                                  <div class="centerButton"><a class=button href="#" id="SaveSpyLogButton" onclick="return false;">'+language[lang].textSave+'</a></div> \
                                  <div class="footer"></div>';

        document.getElementById("container2").insertBefore(SpyDynamicMenu,document.getElementById("backTo"));
        SpyDynamicMenu.addEventListener('click',function(event){if(event.target.id=='SaveSpyLogButton')SaveSpyLogButton();}, true);
   } 
}               
})(); // this will prevent from collisions with other possible scripts installed