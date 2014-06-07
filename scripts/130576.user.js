// ==UserScript==

// @name           FarmList Manager
// @namespace      Buyaas
// @description    Travian Auto FarmList Manager
// @include        http://tx2.travian.ir/build.php?id=39&tt=99
// @include        http://tx2.travian.ir/build.php?gid=16&tt=99
// @include        http://tx2.travian.ir/login.php
// @include        http://tx2.travian.ir/dorf3.php*
// ==/UserScript==


var Troops = {};
Troops.Name = [
			[	"Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris",
				"Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"],
			[	"Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", 
				"Ram", "Catapult", "Chief", "Settler", "Hero"],
			[	"Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider"] ,
];

Troops.Speed = [
		[6,5,6,16,14,10,4,3,5,4,16],
		[7,7,6,9,10,9,4,3,4,5,10],
		[7,6,17,19,16,13,4,3,5,5,10],
];


var Config = {};

Config.DMin = 12;
Config.DMax = 15;


var Doc = {

	New : function(tt,attrs){
		newElement = document.createElement(tt);
		if (attrs !== undefined) {
		  for(var xi = 0; xi < attrs.length; xi++) {
		  	newElement.setAttribute(attrs[xi][0], attrs[xi][1]);
		  }
	  }
  	return newElement;
	}, 

	Element : function(eid){
		return document.getElementById(eid);	
	},

	xy2id : function (x, y) {
		 return (((400-parseInt(y))*801)+(parseInt(x)+401));
	},
	id2xy : function(vid) {
    arrXY = [];
	  var x = (vid % 801) - 401;
    var y = 400 - (vid - 401 - x) / 801;
	  arrXY[0] = x;
	  arrXY[1] = y;
	  return arrXY;
	},

	Tab : function(url){
		form = this.New('form',[['action', url],['target','_blank'],['method','get']]);
		form.appendChild(this.New('input',[['type','submit'],['value','build']]));
		document.body.appendChild(form);
		form.submit();
	},

  Login : function(){
		LoginReq = document.getElementsByClassName("innerLoginBox");
		if (LoginReq && LoginReq.length > 0){
      LoginForm = LoginReq[0].getElementsByTagName("form")[0];
			LoginData = "";
			LoginForm.setAttribute('target', '_blank');
      document.getElementsByName("password")[0].value = "99259890";
			LoginForm.submit();

			setInterval(function(){
			  window.location = "/build.php?gid=16&tt=99";
			},10000);
		}
  },
  Safe : function(){
    safer = GM_getValue(dataIndex+"_safe",'');
    if (safer == ''){
      GM_setValue(dataIndex+"_safe",Time.getCurrTime());
      Doc.Tab("dorf3.php");
			setInterval(function(){
			  window.location = "/build.php?gid=16&tt=99";
			},1000);
    }else{
      safe_sec = Time.toSec(safer);
      cur_sec = Time.toSec(Time.getCurrTime());
      if ((cur_sec - safe_sec) > 1800){
         GM_setValue(dataIndex+"_safe",Time.getCurrTime());
         Doc.Tab("dorf3.php");
			   setInterval(function(){
			      window.location = "/build.php?gid=16&tt=99";
			   },1000);
      }
    }
  }
};

var Time = {

	Sync : function(x,y,x1,y1,last_sent,farm_id,trps,interval){
		dist = this.getDistance(x,y,x1,y1);
		slow = 20;
		for (var i = 1 ; i <= 11 ; i++ ){
			tid = "f"+farm_id+"_t"+i;
			if (parseInt(trps.split("|")[i-1]) > 0){
				if (slow > Troops.Speed[Race][i-1]){
					slow = Troops.Speed[Race][i-1];
				}
			} 
		}
		mtime = this.getTTime(dist,slow);
		lsec = this.toSec(last_sent);
		crT = this.getCurrTime();
		nsec = this.toSec(crT);
		msec = this.toSec('0000-00-00 '+mtime);
		msec = parseInt((msec * 2)/interval);
		mode = 'def1';
		dsec = nsec - lsec;
		tm = parseInt(lsec) + parseInt(msec) - parseInt(nsec);
		if ( tm < 0 ){ tm = 0; }
		if (dsec > msec) {
			dsec = msec;
		}
		return [mtime,this.toHour(tm+lsec),mode,tm,msec,dsec];
	}, 

	getDistance: function(sx1, sy1, sx2, sy2){
		var x1 = parseInt(sx1);
		var y1 = parseInt(sy1);
		var x2 = parseInt(sx2);
		var y2 = parseInt(sy2);

		var dX = Math.min(Math.abs(x2 - x1), Math.abs(801 - Math.abs(x2 - x1)));
		var dY = Math.min(Math.abs(y2 - y1), Math.abs(801 - Math.abs(y2 - y1)));
		var dist = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

		return dist;
	},

	getTTime : function(qDist,theSlow){
		var aTime = Math.round(qDist * 3600000 / theSlow);
		//aTime += 10;
		hh=Math.floor(aTime/3600000);
		if(hh<10){hh="0"+hh;}
		mm=Math.floor((aTime-hh*3600000)/60000);
		if(mm<10){mm="0"+mm;}
		ss=Math.ceil((aTime-hh*3600000-mm*60000)/1000);
		if(ss<10){ss="0"+ss;}
		return hh+":"+mm+":"+ss;
	},

	toSec : function(dt){

		// 2009-10-10 12:00:00
		d = dt.split(" ");
		dds = d[1].split(":");
		hhs = d[0].split("-");
		s = parseInt(dds[2]) + parseInt((dds[1]) * 60) + parseInt((dds[0]) * 3600);
		//alert(parseInt(dds[0]) + "s = " +s);
		s1 = parseInt(hhs[2]) * 86400  + parseInt(hhs[1]) * 2592000;
		return parseInt(s) + parseInt(s1);
	},

	toHour : function(sc){

		sc = parseInt(sc);
		m = Math.floor(sc/2592000);
		sc = Math.floor(sc%2592000);

		d = Math.floor(sc/86400);
		sc = Math.floor(sc%86400);

		h = Math.floor(sc/3600);
		sc = Math.floor(sc%3600);

		mm = Math.floor(sc/60);
		sc = Math.floor(sc%60);

		if (m<10){m = "0"+m;}
		if (d<10){d = "0"+d;}
		if (h<10){h = "0"+h;}
		if (mm<10){mm = "0"+mm;}
		if (sc<10){sc = "0"+sc;}
		res =  "2012-"+m+"-"+d+" " +h+":"+mm+":"+sc;
		return res;

	},

	getCurrTime : function(){
		crTime = new Date();
		year = crTime.getFullYear();
		month = parseInt(crTime.getMonth()+1);
   	day = crTime.getDate();
		hour = (crTime.getHours() );
    minute = crTime.getMinutes();
    second = crTime.getSeconds();

		if (month < 10) {month = "0" + month;}
		if (day < 10) {day = "0" + day;} 
		if (hour < 10) {hour = "0" + hour;} 
		if (minute < 10)  {minute = "0" + minute;} 
		if (second < 10) {second = "0" + second;}

		res =  year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second; 
		return res;
	},

};


var Farm = {};

Farm.Send = function(ListIndex){
  raidList = Doc.Element(ListIndex);
  ListRows = raidList.getElementsByClassName("slotRow");
  AtLeastChecked = false;
  for (var i = 0 ; i < ListRows.length ; i++){
    ListRow = ListRows[i];
    RowCheck = ListRow.getElementsByTagName("input")[0];
    RowDistance = parseInt(ListRow.getElementsByClassName("distance")[0].innerHTML);
    RowLastCont = ListRow.getElementsByClassName("lastRaid")[0];
    if (RowLastCont.getElementsByTagName("img") && RowLastCont.getElementsByTagName("img").length > 0){
      RowLast = RowLastCont.getElementsByTagName("img")[0].className; 
      if (RowLast.split(" ")[1] == "iReport1"){
        RowCheck.checked = true;
        AtLeastChecked = true;
      }
    }else{
      RowCheck.checked = true;
      AtLeastChecked = true;
    }
  }

  if (AtLeastChecked == true){
    currTime = Time.getCurrTime();
    GM_setValue(dataIndex+"_LastSent_"+ListIndex,currTime);

    dDif = Config.DMax - Config.DMin;
    dMin = Config.DMin;
    dDif *= 60;
    dMin *= 60;
    rNum = Math.ceil(dMin + (Math.random() * dDif));

    GM_setValue(dataIndex+"_NextSent_"+ListIndex,Time.toHour(rNum + Time.toSec(currTime)));
    GM_setValue(dataIndex + "_safe", Time.getCurrTime());
    Log.Info("Sent: " + ListIndex);
    raidList.getElementsByTagName("form")[0].submit();
  }else{
     currTime = Time.getCurrTime();
     GM_setValue(dataIndex+"_LastSent_"+ListIndex,currTime);

     dDif = Config.DMax - Config.DMin;
     dMin = Config.DMin;

     dDif *= 60;
     dMin *= 60;

     rNum = Math.ceil(dMin + (Math.random() * dDif));
     GM_setValue(dataIndex + "_safe", Time.getCurrTime());
     GM_setValue(dataIndex+"_NextSent_"+ListIndex,Time.toHour(rNum + Time.toSec(currTime)));
     Log.Info("Nothing Found: " + ListIndex);
  }
};

Farm.Toggle = function(lid){
  window.location.href = "javascript:void(Travian.Game.RaidList.toggleList("+lid+"));";
};

Farm.IDS = [];
Farm.NextSents = [];
Farm.Timer = false;

Farm.Init = function(){

  ToMinID = 0;
  ToMinVal = 99999999;
  RL = Doc.Element("raidList");
  ListEntries = RL.getElementsByClassName("listEntry");
  if (ListEntries && ListEntries.length > 0){
    for (var i = 0; i < ListEntries.length ; i++){
      ShouldDelay = 0;
      ListEntry = ListEntries[i];

      ListIndex = ListEntry.id;
      NextSent = GM_getValue(dataIndex + "_NextSent_"+ListIndex,"");
      LastSent = GM_getValue(dataIndex + "_LastSent_"+ListIndex,"");

      if (NextSent == ""){
        NextSent = Time.getCurrTime();
      }
      if (Time.toSec(NextSent) < ToMinVal){
        ToMinID = i;
        ToMinVal = Time.toSec(NextSent);
      }
      Farm.IDS[i] = ListIndex;
      Farm.NextSents[i] = NextSent;

      NameData = "<font color='red'>"+LastSent+"</font> / ";
      NameData += "<font color='green'>"+NextSent+"</font>";
      ListEntry.getElementsByClassName("listTitleText")[0].innerHTML += NameData;
    }
  }
  Farm.Timer = setInterval(function(){Farm.Observe(ToMinID);},1000);
};

Farm.Toggling = 0;
Farm.Observe = function(ListID){
  ListIndex = Farm.IDS[ListID];
  NextSent = Time.toSec(Farm.NextSents[ListID]);
  CurrTime = Time.toSec(Time.getCurrTime());
  if (CurrTime >= NextSent){
    ListEntry = Doc.Element(ListIndex);
    InfoBox = ListEntry.getElementsByClassName("troopSelection");
    if (InfoBox && InfoBox.length > 0){
      Farm.Send(ListIndex);
      clearInterval(Farm.Timer);
    }else{
      if (Farm.Toggling == 0){
        Farm.Toggle(ListIndex.substr(4));
        Farm.Toggling = 1;
      }
    }
  }
};

var Log = {};

Log.Info = function(msg){
		var strLog = decodeURIComponent(GM_getValue(dataIndex+"_log",false));
		if (strLog != 'false' && strLog.length > 1 && strLog.length < 20000 ) {
			strLog += ("\n[" + Time.getCurrTime() + "] - ["+ msg + " ] ");		
		}else{
		    strLog = ("\n[" + Time.getCurrTime() + "] - ["+ msg + " ] ");	
		}
		GM_setValue(dataIndex+"_log",encodeURIComponent(strLog));
};

Log.Show = function(){
	  logTable = Doc.New('ul');
		var strLog = decodeURIComponent(GM_getValue(dataIndex+"_log",false));
		aLogs = strLog.split("\n");
		for (var j = 0 ; j < aLogs.length ; j++){
      td = Doc.New("li");
			td.innerHTML = "<p>" + aLogs[j] + "</p>";
			logTable.appendChild(td);
    
		} 
		td = Doc.New("li");
		clearButton = Doc.New("button");
		clearButton.addEventListener('click',function(){Log.Clear()},false);
		clearButton.innerHTML = "Clear Log"
		td.appendChild(clearButton);
		logTable.appendChild(td);
		side_info = Doc.Element("villageList").getElementsByClassName("list")[0];
    
		side_info.appendChild(logTable);
};

Log.Clear = function(){
	GM_setValue(dataIndex+"_log",'');
};

function getUserId(){
		navi = Doc.Element("side_info");
		navi_p = navi.getElementsByClassName("sideInfoPlayer")[0];
		profile_link = navi_p.getElementsByTagName("a")[0];
		return profile_link.href.split("=")[1];
};

var crtPage = window.location.href;
if (crtPage.match(/login.php/)){
  Doc.Login();
} else if (crtPage.match(/dorf3.php/)){
  var user_id = getUserId();
  var dataIndex = window.location.hostname.split(".")[0]+"_"+user_id+"_farms";
  setInterval(function(){Doc.Safe()},60000);
} else {
  var user_id = getUserId();
  var dataIndex = window.location.hostname.split(".")[0]+"_"+user_id+"_farms";
  Farm.Init();
}