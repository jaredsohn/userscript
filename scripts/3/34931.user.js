// ==UserScript==
// @name            DT Gold Tools - Farming tool
// @author          darkyndy
// @description     Dark Throne Gold Tools - Farming, get informations
// @include         http://gold.darkthrone.com/log/spy_attack*
// @include         http://www.darkthrone.com/log/spy_attack*
// @include         http://darkthrone.com/log/spy_attack*
// @include         *darkthrone.com/log/spy_attack*
// @version         1.04
// ==/UserScript==

//settings
var delimitator = ",";
var vector = new Array(
  {
    'nameReg' : 'defense',
    'nameUrl' : 'defense',
    'value' : 0
  },
  {
    'nameReg' : 'offense',
    'nameUrl' : 'offense',
    'value' : 0
  },
  {
    'nameReg' : 'spy defense',
    'nameUrl' : 'spy_defense',
    'value' : 0
  },
  {
    'nameReg' : 'spy offense',
    'nameUrl' : 'spy_offense',
    'value' : 0
  },
  {
    'nameReg' : 'Citizen',
    'nameUrl' : 'citizen',
    'value' : 0
  },
  {
    'nameReg' : 'Worker',
    'nameUrl' : 'worker',
    'value' : 0
  },
  {
    'nameReg' : 'Guard',
    'nameUrl' : 'guard',
    'value' : 0
  },
  {
    'nameReg' : 'Archer',
    'nameUrl' : 'archer',
    'value' : 0
  },
  {
    'nameReg' : 'Soldier',
    'nameUrl' : 'soldier',
    'value' : 0
  },
  {
    'nameReg' : 'Knight',
    'nameUrl' : 'knight',
    'value' : 0
  },
  {
    'nameReg' : 'Spie',
    'nameUrl' : 'spie',
    'value' : 0
  },
  {
    'nameReg' : 'Sentrie',
    'nameUrl' : 'sentrie',
    'value' : 0
  },
  {
    'nameReg' : 'Infiltrator',
    'nameUrl' : 'infiltrator',
    'value' : 0
  },
  {
    'nameReg' : 'Sentinel',
    'nameUrl' : 'sentinel',
    'value' : 0
  },
  {
    'nameReg' : 'Berserker',
    'nameUrl' : 'berserker',
    'value' : 0
  },
  {
    'nameReg' : 'Royal Guard',
    'nameUrl' : 'royal_guard',
    'value' : 0
  },
  {
    'nameReg' : 'Asassin',
    'nameUrl' : 'asassin',
    'value' : 0
  },
  {
    'nameReg' : 'Inquisitor',
    'nameUrl' : 'inquisitor',
    'value' : 0
  }
);

if(location.href.match(/spy_attack/)){
  var spyLog = document.getElementById("content_holder_div");
  var contentSpyLog = spyLog.innerHTML;
  
  var playerName = playerName(contentSpyLog);
  //alert(playerName);
  if(playerName != "Null"){
    for(var i=0; i<vector.length; i++ ){
      vector[i].value = returnStat(contentSpyLog, vector[i].nameReg);
    }
    
    var logBy = spyBy(contentSpyLog);
    var playerLvl = playerLvl(contentSpyLog, playerName);
    var linkSpy = window.location.href;
    var spyID = getSpyID(linkSpy);
    var linkData = "";
    for (var i =0; i<vector.length; i++){
      linkData += vector[i].nameUrl+"="+vector[i].value+"&";
    }
    linkData += "logid="+spyID+"&"+"logby="+logBy+"&"+"playername="+playerName+"&"+"playerlvl="+playerLvl;
    saveLogLink = "http://www.darkyndy.com/dtgold/farmtool/savelog.php?"+linkData;
    //alert(saveLogLink);
    createUrl(saveLogLink, "Save log", 5000);
    /*
    This part adds a div to the page if the popup doesn't work properly
    */
    // Add styles BEGIN
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    
    addGlobalStyle(
    '#farmBox { height: 20px; width: 130px; position: relative; margin:0px 0px 0px 0px; z-index:99; display:block;}');
    // Add styles END
    
    var dtMain = document.getElementById('sidebar-left-advisor-bot');
    var dtNewElement = document.createElement('div');
    dtNewElement.setAttribute('id', 'farmBox');
    dtMain.parentNode.insertBefore(dtNewElement, dtMain);
    document.getElementById("farmBox").innerHTML = '<a href="'+saveLogLink+'" target="_blank" style="color:#FF0000;font-weight: bold;font-size: 12px;">Save log</a>';
    
  }
}

function createUrl(url, name, myTime){
  var newwindow;
  newwindow=window.open(url,name,'height=200,width=400');
  if (window.focus) {newwindow.focus()}
  //newwindow.document.write("Wait "time/1000" seconds ...");
  setTimeout(function(){wait(newwindow);},myTime);
}

function wait(newwindow){
  if (newwindow) newwindow.close();
}

function getSpyID(linkSpy){
  var reg_expr = new RegExp("\/log\/spy_attack\/([0-9]+)");
  if(linkSpy.match(reg_expr)){
    var rez_reg = reg_expr.exec(linkSpy);
    var spyID = rez_reg[1];
  }
  else{
    var spyID = 0;
  }
  return spyID;
}

function playerLvl(contentSpyLog, playerName){
  var reg_expr = new RegExp(playerName+" <\/b><br>\n+.*Level ([0-9]+)", "gm");
  if(contentSpyLog.match(reg_expr)){
    var rez_reg = reg_expr.exec(contentSpyLog);
    var playerLvl = rez_reg[1];
  }
  else{
    var playerLvl = 0;
  }
  return playerLvl;
}

function spyBy(contentSpyLog){
  var reg_expr = new RegExp('>(.*) sent');
  if(contentSpyLog.match(reg_expr)){
    var rez_reg = reg_expr.exec(contentSpyLog);
    var playerName = rez_reg[1];
  }
  else{
    var playerName = "Null";
  }
  return playerName;
}

function returnStat(contentSpyLog, logType){
  var reg_expr = new RegExp('(([0-9]+'+delimitator+'*)+)(?:<\/span> '+logType+')');
  if(contentSpyLog.match(reg_expr)){
    var reg_rez_1 = reg_expr.exec(contentSpyLog);
    //delimitator global
    var stat = reg_rez_1[1].replace(/,/g, "");
  }
  else{
    var stat = 0;
  }
  return stat;
}

function playerName(contentSpyLog){
  var reg_expr = new RegExp('(report|reports) that (.*) has');
  if(contentSpyLog.match(reg_expr)){
    var rez_reg = reg_expr.exec(contentSpyLog);
    var playerName = rez_reg[2];
  }
  else{
    var playerName = "Null";
  }
  return playerName;
}