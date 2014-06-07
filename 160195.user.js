// ==UserScript==

// @name           warian
// @namespace      sorena2
// @description    warian Auto Gold Club FarmList Sender
// @include        http://x*.warian.*/build.php?id=39&tt=99*
// @include        http://x*.warian.*/build.php?gid=16&tt=99*
// @include        http://x*.warian.*/dorf3.php*
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
		var aTime = Math.round