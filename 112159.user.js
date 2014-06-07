// ==UserScript==1
// @name http://www.bloodyworld.com/*
// ==/UserScript==1

if(!document.location.href.match("http://www.bloodyworld.com/xfn")) {
  if (document.location.href.match("http://www.bloodyworld.com/index.php\\?file=menu")) {
	window.opera.addEventListener('AfterEvent.load',function(e){
	  if( e.event.target instanceof Document) {
		kobb = document.getElementById('kob_tbl');
		if (!kobb) {
		  /* Create special menu */
		  var newdiv = document.createElement('div');
		  newdiv.setAttribute('id','kob_conf');
		  newdiv.innerHTML = '<hr><table border=1><tr id=kob_tbl><td>&nbsp;</td></tr></table>';
		  document.body.appendChild(newdiv);
		  kobb = document.getElementById('kob_tbl');
		}
		newtd=document.createElement('td');
		newtd.innerHTML = "<input type=checkbox id=kob_autobattle>Auto-battle<br>"+
						  "<button onclick='top.main.bwab_fight_set();return false;'>Fight</button>"+
						  "<button onclick='top.main.bwab_def_set();return false;'>Defend</button><br>"+
						  "MinHP: <input size=4 id=kob_ab_stophp value="+Math.floor(top.main.realLife*0.25)+">";
		kobb.appendChild(newtd);
	  }
	},false);
  } else {
	function scan_items()
	{
	  var db = document.body.innerHTML;

	  var ans = new Object();
	  var uid = db.match(/showNameBlock\('[^']+','([0-9]+)'/i)[1];
	  var l = db.match(/var h_[^}]+}";/ig);
	  var re = new RegExp("var h_([a-z0-9]+)"+uid+"=[^}]+'fi':'([0-9]*)'");
	  for(var i=0;i<l.length;i++) {
		var rr = l[i].match(re);
		if (rr) ans[rr[1]] = rr[2];
	  }
	  return ans;
	}

	function bwab_def_set()
	{
	  var items = (function(){ try { return scan_items(); } catch (error) { return new Object(); } })()
	  var verkart = [10,10,10,10,10];
	  verkart[0] += Math.max(items["shlem"], items['necklace']); // head
	  verkart[1] += Math.max(items["weapon"], items['ring'], items['ring2']); // right hand
	  verkart[2] += Math.max(items['armours']); // body
	  verkart[3] += Math.max(items["weapon2"], items['ring3'], items['ring4']); // left hand
	  verkart[4] += Math.max(items["boots"], items["belt"]); // legs
	  var vertot = verkart[0] + verkart[1] + verkart[2] + verkart[3] + verkart[4];
	  var s = 0;
	  for (var i=0; i<5; i++) {
		s+=verkart[i]; verkart[i] = s*5/vertot;
	  }
	  bDEF = document.getElementsByName('shit[]');
	  if (bDEF && bDEF.length > 0) {
		if (TotalDEF!=0) {
		  for (i = 0; i<bDEF.length; i++) {
			bDEF[i].checked = false;
		  }
		}
		set = [0,0,0,0,0];
		for (i = 0; i<MaxTotalDEF; i++) {
		  var j = -1;
		  while(j<0 || set[j] == 1) {
			var k = Math.floor(Math.random()*5);
			for (j=0; j<4; j++) if (k < verkart[j]) break;
			j = Math.floor(Math.random()*5);
		  }
		  set[j] = 1;
		}
		for (i = 0; i<bDEF.length; i++) {
		  bDEF[i].checked = (set[i]==1);
		}
		TotalDEF = MaxTotalDEF;
	  }
	};

	function bwab_fight_set()
	{
	  if (MaxTotalATK > 1) {
		bATK = document.getElementsByName('fire[]');
		if (bATK && bATK.length > 0) {
		  if (TotalATK!=0) {
			for (i = 0; i<bATK.length; i++) {
			  bATK[i].checked = false;
			}
		  }
		  set = [0,0,0,0,0];
		  for (i = 0; i<MaxTotalATK; i++) {
			j = Math.floor(Math.random()*5);
			set[j]++;
		  }
		  c = bATK.length/5;
		  for (i = 0; i<5; i++) {
			for(j=0; j<set[i]; j++) {
			  bATK[i*c+j].checked = true;
			}
		  }
		  TotalATK = MaxTotalATK;
		}
	  } else {
		bATK = document.getElementsByName('fire');
		if (bATK && bATK.length > 0) {
		  j = Math.floor(Math.random()*bATK.length);
		  bATK[j].checked = true;
		}
		TotalATK = MaxTotalATK;
	  }
	};

	window.opera.addEventListener('AfterEvent.load',function(e){
	  if( e.event.target instanceof Document && top.menu.document.getElementById('kob_autobattle').checked ) {
		bwab_def_set();
		bwab_fight_set();
		youRL = document.body.innerHTML.match(/realLife = parseInt\('([0-9]+)'\);/)[1]+0;
		if (youRL <= (top.menu.document.getElementById('kob_ab_stophp').value+0)) {
		  SendSay("Life below auto-minimum!");
		} else
		if ((MaxTotalATK > 0) && (TotalATK == MaxTotalATK) && (MaxTotalDEF > 0) && (TotalDEF == MaxTotalDEF)) {
		  hitin = Math.random()*1000;
		  setTimeout("document.getElementsByName('go')[0].click()", hitin+1000);
		}
	  }
	},false);
  }
}
