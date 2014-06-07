// ==UserScript==
// @name        Ikariam.ru BattleLog saver
// @version     1.251
// @date        2009-12-18
// @author      RuKi with help of Demetros
// @description Позволяет сохранить боевой доклад сервера Икариам (v0.3.2) на логомолотилках шахтеров.нет и икацентр.
//
// @include                     http://s*.ikariam.*/index.php?view=militaryAdvisorReportView*
// ==/UserScript==

// this script partially based on IkaLogo script by Vitramir and logo4ikariam script by MaxPayne

( function() {  // this will prevent from collisions with other possible scripts installed

// GLOBAL VARS

var roundNo;
var timeout;

function setLoggingSite(chosenLogSite){
        setCookie("chosenLogSite",chosenLogSite,365);
}

function SaveLogButton(){
        var BattleForm = document.createElement('form');
        BattleForm.setAttribute('method','post');
        BattleForm.setAttribute('target','_blank');
        BattleForm.setAttribute('style', 'display:none;');
        BattleForm.setAttribute('id', 'BattleFormId');
    
        switch (getCookie("chosenLogSite")) {
                case "ShahterovShort":
                        BattleForm.setAttribute('action','http://ikariam.shahterov.net/save.php');
                        var elem1 = document.createElement('input');
                        elem1.type = 'hidden';
                        elem1.name = 'report_2';
                        elem1.value = document.getElementsByTagName('html')[0].innerHTML;
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
                case "IkalogoShort":
                        BattleForm.setAttribute('action','http://ikalogo.spb.ru/save.php');
                        var elem1 = document.createElement('input');
                        elem1.type = 'hidden';
                        elem1.name = 'csmall';
                        elem1.value = document.getElementsByTagName('html')[0].innerHTML;
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
                        elem1.value = document.getElementsByTagName('html')[0].innerHTML;
                        BattleForm.appendChild(elem1);
                        var elem2 = document.createElement('input');
                        elem2.type = 'hidden';
                        elem2.name = 'comment';
                        elem2.value = document.getElementById('LogComment').value;
                        BattleForm.appendChild(elem2);
                        var elem3 = document.createElement('input');
                        elem3.type = 'hidden';
                        elem3.name = 'report_1';
                        elem3.value = '';
                        BattleForm.appendChild(elem3);
                        document.body.appendChild(BattleForm);
                        roundNo=1;
                        //removeElement(document.getElementById('SaveLogButton'));
                        document.getElementById('SaveLog').innerHTML='<img src="skin/resources/icon_time.gif" height=11px style="display:inline;"/> Pridedamas raundas: 1';
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = fullReportHandler;
                        //xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        var combatId=document.URL.split('&')[1].split('=')[1];
                        xmlhttp.open('GET', 'index.php?view=militaryAdvisorDetailedReportView&combatRound=1&detailedCombatId='+combatId, true);
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
                        roundNo=1;
                        //removeElement(document.getElementById('SaveLogButton'));
                        document.getElementById('SaveLog').innerHTML='<img src="skin/resources/icon_time.gif" height=11px style="display:inline;"/> Получение раунда номер: 1';
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = fullReportHandler;
                        //xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        var combatId=document.URL.split('&')[1].split('=')[1];
                        xmlhttp.open('GET', 'index.php?view=militaryAdvisorDetailedReportView&combatRound=1&detailedCombatId='+combatId, true);
                        xmlhttp.send(null);
                        timeout = setTimeout( function(){ xmlhttp.abort(); handleError("Timeout!") }, 20000);
                        break;
                }
}

function fullReportHandler(){    // when request for full report complete, then add response to form
         if(this.readyState == 4){
               if(this.status != 200){
                       alarm("Oшибка "+this.status+" чтения полного доклада (раунд="+roundNo+")");
               }
               //else {   do not need this - behavior is the same incase of error and if all rounds received
                       clearTimeout(timeout); // clear timeout at readyState=4
                       
                       var checkRoundExistence=this.responseText.match(/id="battlefield"/); 
                       if (checkRoundExistence!=null) { //check if we participated in this round
                                switch (getCookie("chosenLogSite")) {
                                        case "ShahterovFull":
                                                document.getElementsByName('report_1')[0].value+=this.responseText;   
                                                break;
                                        case "IkacenterFull":
                                                var elem3 = document.createElement('input');
                                                elem3.type = 'hidden';
                                                elem3.name = 'fight_full['+roundNo+']';
                                                elem3.value = this.responseText;  
                                                document.getElementById("BattleFormId").appendChild(elem3);
                                                break;
                                }
                       }
        //               document.getElementsByName('cfull')[0].value=this.responseText       //ikalogo
        //               var ResponseXML=this.responseXML;
        
                       var getStrings=this.responseText.match(/detailedCombatId=\d+&view=militaryAdvisorDetailedReportView&combatRound=(\d+)/);
                       if (getStrings==null){ //only one first round exist. just submit it.
                                document.getElementById("BattleFormId").submit();
                                document.body.removeChild(document.getElementById("BattleFormId"));
                                document.getElementById('SaveLog').innerHTML='<a class=button href="#" id="SaveLogButton" onclick="return false;">Сохранить</a>';
                       }
                       else if (parseInt(roundNo)<parseInt(getStrings[1])){
                                //roundNo=roundNo+1;
                                roundNo=getStrings[1];  //if battle participated not from begining not all rounds shown in detailed report
                                if (parseInt(roundNo)>100){
                                        return;   //infinite loop protection
                                }
                                document.getElementById('SaveLog').innerHTML='<img src="skin/resources/icon_time.gif" height=11px style="display:inline;"/> Pridedamas Raundas: '+roundNo;
                                var xmlhttp = new XMLHttpRequest();
                                xmlhttp.onreadystatechange = fullReportHandler;
                                xmlhttp.open('GET', 'index.php?'+getStrings[0], true);
                                //xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                xmlhttp.send(null);
                                timeout = setTimeout( function(){ xmlhttp.abort(); handleError("Timeout!") }, 20000);
                       }
                       else {
                                document.getElementById("BattleFormId").submit();
                                document.body.removeChild(document.getElementById("BattleFormId"));
                                document.getElementById('SaveLog').innerHTML='<a class=button href="#" id="SaveLogButton" onclick="return false;">Сохранить</a>';
                       }
                //}
         }
}

function SaveSpyLogButton(){
        var SpyForm = document.createElement('form');
        SpyForm.setAttribute('method','post');
        SpyForm.setAttribute('target','_blank');
        SpyForm.setAttribute('style', 'display:none;');
        SpyForm.setAttribute('id', 'SpyFormId');
        SpyForm.setAttribute('action','http://ikalogo.spb.ru/spysave.php'); // only ikalogo supports spy logging yet
        
        var elem1 = document.createElement('input');
        elem1.type = 'hidden';
        elem1.name = 'code';
        elem1.value = document.getElementsByTagName('html')[0].innerHTML;
        SpyForm.appendChild(elem1);
        document.body.appendChild(SpyForm);
        SpyForm.submit();
        document.body.removeChild(SpyForm);
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
}
        

function handleError(message) {
        alert("Ikariam.ru BattleLog saver: "+message);
        document.getElementById("BattleFormId").submit(); //even if error encountered, try to submit everything we got so far
        document.body.removeChild(document.getElementById("BattleFormId"));
}

function insertAfter(node, referenceNode) {
        referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

//MAIN

if(document.URL.split('&')[1].split('=')[0]=='combatId'){
        var LogSite=getCookie("chosenLogSite");
        
        if (LogSite==null){   //first time
                setCookie("chosenLogSite","ShahterovShort",365);
                LogSite="ShahterovShort";
        }
    
        var BattleDynamicMenu = document.createElement("div");
        BattleDynamicMenu.id = 'DynamicBattleReport';
        BattleDynamicMenu.className = 'dynamic';
        BattleDynamicMenu.align='center';
        BattleDynamicMenu.innerHTML=' \
                <h3 class="header">Issaugoti Karine Ataskaita</h3> \
                <div class="content"> \
                        <p>Pasirinkite kur issaugoti ir kokio tipo ataskaita:</p> \
                                <select id="LoggingSelect" class="citySelect bigFont" name="LoggingId" onchange="return false;"> \
                                        <option class="coords" value="ShahterovShort" ' + (LogSite == 'ShahterovShort' ? 'selected="selected"' : '') + '><p>Shahterov.Net Trumpa</p></option> \
                                        <option class="coords" value="ShahterovFull" ' + (LogSite == 'ShahterovFull' ? 'selected="selected"' : '') + '><p>Shahterov.Net Pilna</p></option> \
                                        <option class="coords" value="IkacenterShort" ' + (LogSite == 'IkacenterShort' ? 'selected="selected"' : '') + '><p>Ikacenter.ru Trumpa</p></option> \
                                        <option class="coords" value="IkacenterFull" ' + (LogSite == 'IkacenterFull' ? 'selected="selected"' : '') + '><p>Ikacenter.ru Pilna</p></option> \
                                </select> \
                        <p>Komentarai:</p> \
                        <textarea id="LogComment" style="font-size:12px;" name="LogComment" cols="30"></textarea> \
                        <div class="centerButton" id="SaveLog" style="height:17px;"><a class=button href="#" id="SaveLogButton" onclick="return false;">Issaugoti</a></div> \
                </div> \
                <div class="footer"></div>';

        document.getElementById("container2").insertBefore(BattleDynamicMenu,document.getElementById("backTo"));
        BattleDynamicMenu.addEventListener('change',function(event){if(event.target.id=='LoggingSelect')setLoggingSite(document.getElementById("LoggingSelect").options[document.getElementById("LoggingSelect").selectedIndex].value);}, true);
        BattleDynamicMenu.addEventListener('click',function(event){if(event.target.id=='SaveLogButton')SaveLogButton();}, true);
}               

// temporary removed:  <option class="coords" value="IkalogoShort" ' + (LogSite == 'IkalogoShort' ? 'selected="selected"' : '') + '><p>Ikalogo.spb.ru краткий</p></option> \

// removed since ikalogo is dead
//if(document.URL.split('?')[1].split('&')[0]=='view=safehouseReports' || document.URL.split('?')[1].split('&')[0]=='action=Espionage'){
//        var SpyDynamicMenu = document.createElement("div");    //appears also when spy is trained. to be fixed!
//        SpyDynamicMenu.id = 'DynamicSpyReport';
//        SpyDynamicMenu.className = 'dynamic';
//        SpyDynamicMenu.align='center';
//        SpyDynamicMenu.innerHTML=' \
//                <h3 class="header">Сохранить доклад шпиона</h3> \
//                <div class="centerButton"><a class=button href="#" id="SaveSpyLogButton" onclick="return false;">Issaugoti</a></div> \
//                <div class="footer"></div>';
//
//        document.getElementById("container2").insertBefore(SpyDynamicMenu,document.getElementById("backTo"));
//        SpyDynamicMenu.addEventListener('click',function(event){if(event.target.id=='SaveSpyLogButton')SaveSpyLogButton();}, true);
//} 

})(); // this will prevent from collisions with other possible scripts installed






