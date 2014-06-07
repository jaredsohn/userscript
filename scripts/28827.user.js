// LoveHina.dk - cheat script
// Enables:
// - 1 turn move to any place (done)
// - instant chat with any girl (done)
// - text fields for turn number input, instead of 1-10 drop-down menu (done)
// - all found items are epic items (done)
// - one-click trainings and jobs for any number of turns (done)

// This scripts adds:
// - 1 turn movement to any place with a drop-down menu
// - instant chat with any of the girls
// - all found items are epic (most precious) items
// - one-click trainings and jobs for any number of turns
// - with text fields to input the number of turns to work/train, instead of 1-10 drop-down menus

// Reskins:
var reskin = true; // set to false if you don't want to reskin
//
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          LoveHina.dk Cheat Script
// @namespace     http://www.lovehina.dk/theydontknowthisns
// @description   LoveHina.dk is a web Love Hina - based RPG/date sim. This script exploits lack of server-side control of users behavior in some places.
// @include       http://www.lovehina.dk/*
// ==/UserScript==

// *** RESKIN ***

if(reskin) {

// background colour
document.body.style.backgroundColor = "#7E5E5E";
// hiding the big'n'full-of-hearts-sic top banner
document.styleSheets[0].insertRule(".banner{height: 40px !important; background-image:none !important;}", 0);

}

// *** CHEATS ***

// main menu's top
var theplace = document.getElementById("gamez");

// 1-turn move anywhere

window.places = function() {
places = [];
places[ 0] = ['Hinata Hotel', 'F1', '1'];
places[ 1] = ['Training Center', 'F2', '1'];
places[ 2] = ['Prep School', 'F3', '1'];
places[ 3] = ['Tokyo U', 'T', '1'];
places[ 4] = ['Train Station', 'E1', '1'];
places[ 5] = ['Hinata Disco', 'E2', '1'];
places[ 6] = ['Bookshop', 'E3', '1'];
places[ 7] = ['Beach Center (West)', 'D1', '1'];
places[ 8] = ['Hinata Bridge', 'D2', '1'];
places[ 9] = ['Beach Center (East)', 'D3', '1'];
places[10] = ['Hinata Tea House', 'C1', '1'];
places[11] = ['Hinata Inn Front', 'C2', '1'];
places[12] = ['Hinata Park', 'C3', '1'];
// Basement
places[13] = ['Stairs (Basement)', 'C1', '5'];
places[14] = ['Kaolla Room', 'B1', '5'];
places[15] = ['Turtle Room', 'A1', '5'];
// 1st floor
places[16] = ['Dining Room', 'D1', '2'];
places[17] = ['Backyard', 'A3', '1'];
places[18] = ['Stairs (Main)', 'C1', '2'];
places[19] = ['Kitchen', 'C2', '2'];
places[20] = ['Stairs (to Backyard)', 'B3', '1'];
places[21] = ['TV Room', 'B1', '2'];
places[22] = ['Living Room', 'B2', '2'];
places[23] = ['Magic Annex', 'A1', '1'];
places[24] = ['Back Entrance', 'A2', '1'];
places[25] = ['Front Entrance', 'A1', '2'];
places[26] = ['Hot Springs', 'A2', '2'];
// 2nd floor
places[27] = ['Stairs (2nd floor)', 'C1', '3'];
places[28] = ['Mitsune Room', 'C2', '3'];
places[29] = ['Naru Room', 'B1', '3'];
places[30] = ['Living Room', 'B2', '3'];
places[31] = ['Shinobu Room', 'A1', '3'];
places[32] = ['Kanako Room', 'A2', '3'];
// 3rd floor
places[33] = ['Stairs (3rd floor)', 'C1', '4'];
places[34] = ['Motoko Room', 'B1', '4'];
places[35] = ['Mutsumi Room', 'A1', '4'];
places[36] = ['Haruka Room', 'A2', '4'];

return places;
} // window.places

code = '<div>' +
'<script type="text/javascript">var places = [' +
window.places().map(function(v){return ('[\''+v[0]+'\', \''+v[1]+'\', \''+v[2]+'\']'); } ).join(',') +
'];</script>' +
'<div class=menutip id=glistc>&nbsp;<b>QuickMove</b></div>' +
'<form action="moveto.php" method="post" name="mymoveform">' +
'<input type=hidden name=where value=F1 id=myf1><input type=hidden name=mapen value=1 id=myf2>' +
'<select name="dummy" onChange="document.getElementById(\'myf1\').value=places[this.options.selectedIndex][1]; document.getElementById(\'myf2\').value=places[this.options.selectedIndex][2];">' +
'<option value="0" checked="checked">Hinata Hotel</option>';
for(var i = 1; i < window.places().length; i++) {
code = code + '<option value="' + i + '">' + window.places()[i][0] + '</option>';
}
code = code +
'</select><input type=submit class=knap2 name=submit value=Go></form>' +
'<hr width=100%>' +
'</div>';

var qm;
qm = document.createElement("div");
qm.innerHTML = code;
theplace.parentNode.insertBefore(qm, theplace);

// Girls menu

var gl;

if(theplace) {
gl = document.createElement("div");
gl.innerHTML = '' +
'<div>' +
'<div class=menutip id=glistc>&nbsp;<b>Girls</b></div>' +
'<div id=glist>' +
'<form style="display: inline;" name=form2 method=post action="http://www.lovehina.dk/girl.php"><input type=hidden name="girl" value=1><input type=submit name=submit class=knap2 style="display: inline;" value=1></form>' +
'<form style="display: inline;" name=form2 method=post action="http://www.lovehina.dk/girl.php"><input type=hidden name="girl" value=2><input type=submit name=submit class=knap2 style="display: inline;" value=2></form>' +
'<form style="display: inline;" name=form2 method=post action="http://www.lovehina.dk/girl.php"><input type=hidden name="girl" value=3><input type=submit name=submit class=knap2 style="display: inline;" value=3></form>' +
'<form style="display: inline;" name=form2 method=post action="http://www.lovehina.dk/girl.php"><input type=hidden name="girl" value=4><input type=submit name=submit class=knap2 style="display: inline;" value=4></form>' +
'<form style="display: inline;" name=form2 method=post action="http://www.lovehina.dk/girl.php"><input type=hidden name="girl" value=5><input type=submit name=submit class=knap2 style="display: inline;" value=5></form>' +
'<form style="display: inline;" name=form2 method=post action="http://www.lovehina.dk/girl.php"><input type=hidden name="girl" value=6><input type=submit name=submit class=knap2 style="display: inline;" value=6></form>' +
'<form style="display: inline;" name=form2 method=post action="http://www.lovehina.dk/girl.php"><input type=hidden name="girl" value=7><input type=submit name=submit class=knap2 style="display: inline;" value=7></form>' +
'<form style="display: inline;" name=form2 method=post action="http://www.lovehina.dk/girl.php"><input type=hidden name="girl" value=8><input type=submit name=submit class=knap2 style="display: inline;" value=8></form>' +
'</div>' +
'<hr width=100%>' +
'</div>';

theplace.parentNode.insertBefore(gl, theplace);

}

// Item found overwrite
// TODO - allow changing item type, i.e. dropdown and a cofigurable default

var theitem = document.getElementsByName("itempickform")[0];
if(theitem) {
theitem.childNodes[1].className="itemepic";
theitem.childNodes[1].textContent="Epic";
theitem.childNodes[3].value="5";
}

// Quick trainer / Quick worker

if(document.location == "http://www.lovehina.dk/move.php"){

var spot = document.getElementsByTagName("center")[2].firstChild.lastChild;

var qt = document.createElement("tr");
var qttd = document.createElement("td");
qttd.innerHTML = '<hr width=100%>' +
'<div id=various><p><b>Various (Hotel)</b></p>' + // *** Various
'<div><form name=form45 action=other.php method=post>Sleep over (¥100) <input type=hidden name=tim4 value=1><input type=hidden name=ting value=2> <input type=submit name=submit value=sleep class=knap2></form></div>' + // sleep
'<div><form name=form226 action=train.php method=post><input type=hidden name=ting value=9>Eat <input type=text name=tim value=1> side dish(es) and heal some HP <input type=submit name=submit value=Eat class=knap2></form></div>' + // meal/HP regen
'<div><form name=form227 action=train.php method=post><input type=hidden name=ting value=8>Look at the TV for <input type=text name=tim value=1> hour(s) and heal some MP <input type=submit name=submit value=see class=knap2></form></div>' + // television/MP regen
'<div><form name=form2 action=other.php method=post>Look at photo album <input type=hidden name=tim4 value=1><input type=hidden name=ting value=3> <input type=submit name=submit value=look class=knap2></form></div>' + // photos
'<div><form name=form2 action=other.php method=post>Use phone <input type=hidden name=tim4 value=\'2984\'><input type=hidden name=ting value=4> <input type=submit name=submit value=ring class=knap2></form></div>' + // phone
'<div>You can <input class=knap2 type=button value=Buy onClick="document.location = \'http://www.lovehina.dk/shopbuy.php?shop=johs\';"> or <input type=button class=knap2 onClick="document.location = \'http://www.lovehina.dk/shopsell.php?shop=johs\';" value=Sell>things</div>' + // buy/sell things
'<div>You can <input class=knap2 type=button value=Buy onClick="document.location = \'http://www.lovehina.dk/shopbuy.php?shop=daray\';"> or <input type=button class=knap2 onClick="document.location = \'http://www.lovehina.dk/shopsell.php?shop=daray\';" value=Sell>things with Daray (extra cash)</div>' + // buy/sell things (Daray)
'<div><form name=form3577 action=auctionh.php method=post><input type=hidden name=auction value=1>  Sell/buy the newest equipment (auction house)<input type=submit name=submit value=\'here\' class=knap2></form></div>' + // auction house
'<div><form name=form3577 action=other.php method=post><input type=hidden name=ting value=5><input type=hidden name=tim4 value=1> Buy 1 lottery ticket for ¥10 <input type=submit name=submit value=buy class=knap2></form></div>' + // lottery
'<div><form name=shop action=shop.php method=post><input type=hidden name=who value=3>Have too much money? Or not enough? <input type=submit name=submit value=Bank class=knap2></form></div>' + // bank
'<div><form name=form200 action=other.php method=post>Take exam <input type=hidden name=tim4 value=1><input type=hidden name=ting value=1> <input type=submit name=submit value=\'do it\' class=knap2></form></div>' + // exam
'</div>' + // Various_END
'<div id=jobs><p><b>Jobs</b></p>' + // *** Jobs
'<div><form name=form3577 action=work.php method=post><input type=hidden name=ting value=9>Work at a random job for <input type=text name=tim value=20>hours <input type=submit name=submit value=work class=knap2></form></div>' + //random
'<div><form name=form1 action=work.php method=post><input type=hidden name=ting value=8>Work as a guide for <input type=text value=20 name=tim>hour(s) <input type=submit name=submit value=work class=knap2></form></div>' + // guide
'<div><form name=form1 action=work.php method=post><input type=hidden name=ting value=7>Work as a trainer for <input type=text name=tim value=20>hour(s) <input type=submit name=submit value=work class=knap2></form></div>' + // trainer
'<div><form name=form1 action=work.php method=post>Work as a Cartoon writer for <input type=hidden name=ting value=3><input type=text name=tim value=20>hour(s) <input type=submit name=submit value=work class=knap2></form></div>' + // cartoonist
'<div><form name=form1 action=work.php method=post>Work as a <input type=hidden name=ting value=4>Cook for <input type=text name=tim value=20>hour(s) <input type=submit name=submit value=work class=knap2></form></div>' + // cook
'<div><form name=form1 action=work.php method=post>Work as a <input type=hidden name=ting value=6>Cake Cook for <input type=text name=tim value=20>hour(s) <input type=submit name=submit value=work class=knap2></form></div>' + // cake cook
'<div><form name=form1 action=work.php method=post>Work as a <input type=hidden name=ting value=5>Chief Cook for <input type=text name=tim value=20>hour(s) <input type=submit name=submit value=work class=knap2></form></div>' + // chief cook
'</div>' + // Jobs_END
'<div id=citytrain><p><b>Training (Hinata)</b></p>' + // *** Training (Hinata)
'<div><form name=form221 action=train.php method=post><input type=hidden name=ting value=6>Drink <input type=text name=tim value=20> Hit Points tea(s) for ¥1000 each to get more HP <input type=submit name=submit value=drink class=knap2></form></div>' + // HP
'<div><form name=form221 action=train.php method=post><input type=hidden name=ting value=7>Drink <input type=text name=tim value=20> Mana Points tea(s) for ¥700 each to get more MP <input type=submit name=submit value=drink class=knap2></form></div>' + // MP
'<div><form name=form77 action=train.php method=post><input type=hidden name=ting value=5>Party for <input type=text name=tim value=20>hour(s) at ¥500 an hour for beers and drinks and talk to the girls to increase your charisma <input type=submit name=submit value=party class=knap2></form></div>' + // charisma
'<div><form name=form224 action=train.php method=post><input type=hidden name=ting value=1>Read for <input type=text name=tim value=20> hour(s) at ¥200 an hour and get smarter <input type=submit name=submit value=read class=knap2></form></div>' + // intelligence
'<div><form name=form22 action=train.php method=post><input type=hidden name=ting value=4>Train for <input type=text value=20 name=tim>hour(s) at ¥100 an hour and get stronger <input type=submit name=submit value=train class=knap2></form></div>' + // strength
'<div><form name=form222 action=train.php method=post><input type=hidden name=ting value=2>Draw for <input type=text name=tim value=20>hour(s) at ¥100 an hour and get more fantasy <input type=submit name=submit value=draw class=knap2></form></div>' + // fantasy
'<div><form name=form228 action=train.php method=post><input type=hidden name=ting value=3>Pay the chief ¥100 to teach you how to cook for <input type=text name=tim value=20>hour(s) and become a better cook <input type=submit name=submit value=Learn class=knap2></form></div>' + //cooking
'</div>' + // Training_Hinata_END
'<div id=girltrain><p><b>Training (girls)</b></p>' + // *** Training (girls)
'<div><form name=form228 action=train.php method=post><input type=hidden name=ting value=17>Study the mystical arts with Kanako for <input type=text name=tim value=20> hour(s) and gain more magical energy <input type=submit name=submit value=Train class=knap2></form></div>' + // HP
'<div><form name=form228 action=train.php method=post><input type=hidden name=ting value=15>Talk with Kitsune for <input type=text name=tim value=20> hour(s) and learn how to be more charming <input type=submit name=submit value=Chat class=knap2></form></div>' + // charisma
'<div><form name=form228 action=train.php method=post><input type=hidden name=ting value=11>Study with Naru for <input type=text name=tim value=20> hour(s) and become more Intelligent <input type=submit name=submit value=Study class=knap2></form></div>' + // intelligence
'<div><form name=form228 action=train.php method=post><input type=hidden name=ting value=14>Spar with Motoko for <input type=text name=tim value=20> hour(s) and hone your fighting skills <input type=submit name=submit value=Spar class=knap2></form></div>' + // strength
'<div><form name=form228 action=train.php method=post><input type=hidden name=ting value=16>Play with Su for <input type=text name=tim value=20> hour(s) and exercise your imagination <input type=submit name=submit value=Play class=knap2></form></div>' + // fantasy
'<div><form name=form228 action=train.php method=post><input type=hidden name=ting value=13>Help Shinobu with the cooking for <input type=text name=tim value=20> hour(s) and learn some your self <input type=submit name=submit value=Help class=knap2></form></div>' + // cooking
'</div>' + // Training_girls_END
'</td>';
qttd.colSpan="5";
qt.appendChild(qttd);
spot.appendChild(qt);
qttd.colSpan="5";
qt.id = "cheatpage";

} // if doc.loc == move.php


// autotalk bot

// ******************************************* BIG document inside... ********************************************************************
var botscr = (<r><![CDATA[

var girl = 1;
var dp = 88;
var rno = 10;

var nleft = 0;
var succ = 0;
var fail = 0;

var f = function() {
	return false;
};

var inTalk = false; /* flag, to prevent invalidating passkeys */
var inTalkTo = 50; /* timeout before forcing unlock... just in case */

var msg = function(txt) {
	document.getElementById("msgp").innerHTML = txt;
};

var updateStatus = function() {
	var t = "";
	if (nleft > 0) {
		t = "The script is working, " + (succ+fail) + " requests out of " + rno +
		" have been done, " + succ + " successes and " + fail + " failures.";
	} else {
		if (succ > 0 || fail > 0) {
			t = "The script has finished work, " + (succ+fail) + " requests out of " + rno +
			" have been done, " + succ + " successes and " + fail + " failures.";
		} else {
			t = "The script is idle.";
		}
	}
	msg(t == "" ? "Strange failure really." : t);
};

var valForm = function() {
	if (1 <= parseInt(document.getElementById("girl").value) && parseInt(document.getElementById("girl").value) <= 8) {
		girl = parseInt(document.getElementById("girl").value);
	}
	if (1 <= parseInt(document.getElementById("dp").value)) {
		dp = parseInt(document.getElementById("dp").value);
	}
	if (1 <= parseInt(document.getElementById("rno").value)) {
		rno = parseInt(document.getElementById("rno").value);
	}
};

var doOneStep = function() {
	/* nested functions start */
	/* form "parser" */
	var getPassData = function(pd) {
		var passid = 0; var passkey = 0; var Billede = "0";
		var nb = document.createElement("body");
		nb.innerHTML += pd;
		var forms  = nb.getElementsByTagName("form");
		for(var i = 0; i < forms.length; i++) {
			if(/.*girl2.php$/.test(forms[i].action)) {
				var f = forms[i];
				passid = f.passid.value;
				passkey = f.passkey.value;
				Billede = f.Billede.value;
			}
		}
		return [passid, passkey, Billede];
	};
	
	var talkRight = function(passid, passkey, Billede) {
		try {
			/*netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");*/
		} catch (e) {
			alert("Permission UniversalBrowserRead denied.");
			nleft = 0;
			return "";
		}
	
		var req = new XMLHttpRequest();
		req.open(\'POST\', \'http://www.lovehina.dk/girl2.php\', true);
		req.setRequestHeader(\'User-agent\', \'Mozilla/4.0\');
	       	req.setRequestHeader(\'Accept\', \'text/html\');
		req.setRequestHeader(\'Content-type\', \'application/x-www-form-urlencoded\');
		/* request callback */
		req.onreadystatechange = function(e) {
			if(req.readyState == 4) {
				if(req.status == 200) {
					/* alert(/sexily/.test(req.responseText)); check for the right narus response */
					succ++; /* success or so we think, we dont count turns etc :) */
					inTalk = false; /* in any case, reset these */
					inTalkTo = 30;
				} else {
					fail++; /* failure */
					inTalk = false; /* in any case, reset these */
					inTalkTo = 30;
				}
			}
		};
		/* end of request callback */
		req.send("girl=" + girl + "&passid=" + passid + "&passkey=" + passkey + "&Billede=" + Billede +
			"&DoA=" + dp + "&DoB=0&DoC=0&ans=A");

	};

	var getGirlDocument = function() {
		try {
			/*netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");*/
		} catch (e) {
			alert("Permission UniversalBrowserRead denied.");
			nleft = 0;
			return "";
		}
	
		var req = new XMLHttpRequest();
		req.open(\'POST\', \'http://www.lovehina.dk/girl.php\', true);
		req.setRequestHeader(\'User-agent\', \'Mozilla/4.0\');
	       	req.setRequestHeader(\'Accept\', \'text/html\');
		req.setRequestHeader(\'Content-type\', \'application/x-www-form-urlencoded\');
		/* request callback */
		req.onreadystatechange = function(e) {
			if(req.readyState == 4) {
				if(req.status == 200) {
					var passdata = getPassData(req.responseText);
					if(passdata[0]==0 || passdata[1]==0 || passdata[2]=="0") {
						fail++; /* failure */
						inTalk = false;
						inTalkTo = 30;
					} else {
						talkRight(passdata[0], passdata[1], passdata[2]); /* continue on fetching */
					}
				} else {
					fail++; /* failure */
					inTalk = false;
					inTalkTo = 30;
				}
			}
		};
		/* end of request callback */
		req.send("girl=" + girl);
	};

	/* ** Finish Nested Functions *** */
	/* doOneStep() main body begins here */

	updateStatus(); /* update the displayed status */

	if(nleft > 0) {
		document.getElementById("submit").disabled = true;
		if(!inTalk) { /* if no talk is pending... */
			nleft--;
			inTalk = true;
			inTalkTo = 50;
			getGirlDocument(); /* initialize conversation sequence */
		} else {
			if(inTalkTo <= 0) {
				fail++;
				inTalk = false;
				inTalkTo = 30;
			} else {
				inTalkTo--;
			}
		}
	} else {
		document.getElementById("submit").disabled = false;
	}
	setTimeout(\'doOneStep();\', 100);
};

var powerOn = function() {
	if(nleft > 0) return false; /* do not do anything while the button should be disabled anyway */
	
	valForm();
	/* alertDeb(); */
	nleft = rno;
	fail = 0;
	succ = 0;
};

/* start timers */
var onLoadInit = function() {
	setTimeout(\'doOneStep();\', 100);
};
]]></r>).toString();

var botpage = (<r><![CDATA[
<body>
<p>This is the <a href="http://www.lovehina.dk">LoveHina.dk</a> autotalker bot.</p>
<p>You should be logged in before attempting to use this application.</p>
<p>Select  girl and conversation destination point. Then enter the number of times the conversation
should be repeated. It takes 2 turns for each of them, and 3 owned to be able to talk. You should
be able to do the math alone.</p>
<p>Please note: the girl you are XPing for and the girl conversation comes from does not need to agree.
Also, you don\'t need to be on the target level with the chosen girl. Yes, it is possible to access all
dialogues anytime.</p>

<hr width=100%>

<form name="inp" method="post" action="#">
<p><label for="girl">Girl number (integer 1 to 8)</label><input type=text name="girl" value=1 id="girl"></p>
<p><label for="dp">Destination point (leave if you don\'t know what does it mean)</label><input type="text" name="dp" value=88 id="dp"></p>
<p><label for="rno">Number of repeats (positive integer, be sure to count turns)</label><input type="text" name="rno" value=10 id="rno"></p>
<p><input type="submit" onClick="powerOn(); return false;" id="submit" value="Talk!">
<input type="button" onClick="document.location.reload();" value="Go back">
</form>

<p id="msgp" style="color:red; font-weight:bold;"></p>

<hr width=100%>

<p>Known conversation destination points:</p>
<table><tr>
<td>21</td><td>Naru\'s "studying with me" INT based, +5 INT, less xp.</td> </tr><tr>
<td>88</td><td>Naru\'s "You\'re so naughty" INT based, more xp.</td>

</tr></table>

</body>
]]></r>).toString();
// ******************************************* BIG document ENDS... ********************************************************************
// add the button
var bb;

if(theplace) {

bb = document.createElement("div");
bb.innerHTML = '<script type="text/javascript" language="javascript">var bbb = \'' + botpage.replace(/[\n\r\t]/g,'') + '\';var bbbs = \'' + botscr.replace(/[\n\r\t]/g,'') + '\';</script><input type=button value=TalkBot onClick="timeleft=1; setTimeout(\'var nb = document.createElement(\\\'body\\\');nb.innerHTML += bbb; document.firstChild.replaceChild(nb, document.body); eval(bbbs); onLoadInit();\', 1009); return false;" class=knap2><hr width=100%>';
theplace.parentNode.insertBefore(bb, theplace);

}
