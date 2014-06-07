// ==UserScript==
// @name        Charpane Timer
// @namespace   http://www.noblesse-oblige.org/hellion/timer
// @description Add a user-configurable adventure countdown timer to the Character Pane 
// @author		Hellion
// @contributor	CDMoyer
// @include     http://127.0.0.1:60*/charpane.php*
// @include		http://*localhost:*/charpane.php*
// @include     http://*kingdomofloathing.com/charpane.php*
// @exclude     http://images.kingdomofloathing.com/*
// @exclude     http://forums.kingdomofloathing.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version		0.2
// @unwrap
// ==/UserScript==

var turncounter = unsafeWindow.turnsplayed;
var pid = unsafeWindow.playerid;
var turnsLeft = 0;
var imgs = document.images;

if (imgs.length == 0 || imgs == null) return;
var compactMode = imgs[0].getAttribute('height') < 60;

$('center:first').parent()
	.prepend('<font size=1><a href="#" id="H_setTimer">[set timer]</a></font>');

$('#H_setTimer').click(function() {setTimer(this);});

// retrieve and sort our array of timers
var timerlist = eval(GM_getValue("timerlist_"+pid,'[]'));
timerlist.sort(function(a,b) {return a.duration - b.duration;}); 

// eliminate any expired timers at the front of the array.
var expireIndex = 0;
for (var i=0; i < timerlist.length; i++) if (timerlist[i].duration < turncounter) expireIndex = i+1;
if (expireIndex) { 
	timerlist = timerlist.slice(expireIndex);
	GM_setValue("timerlist_"+pid,timerlist.toSource());
}

// build up the HTML to display our remaining timers.
var CounterHTML = '';
for (var i=0; i < timerlist.length; i++) {

	var TriggerTurn = timerlist[i].duration;
	var timerName = timerlist[i].name;

//	GM_log("TriggerTurn="+TriggerTurn+", turncounter="+turncounter);
	var turnsleft = TriggerTurn - turncounter;
	var highlight="green";
	if (turnsleft >= 0) {
		if (turnsleft <= 5) highlight="red";
		if (turnsleft <= 3) fsize = (6 - turnsleft); else fsize = 2;
		if (compactMode) {
			CounterHTML  += '<center><table><tr><td><img src="http://images.kingdomofloathing.com/itemimages/clock.gif"'+
				'alt="'+timerName+'" title="'+timerName+'" id="H_CPT_'+i+'">'+
				'</td><td><font size='+fsize+' color='+highlight+'>('+turnsleft+')</font></td></tr></table></center>';
		}
		else { // full mode 
			CounterHTML += '<tr><td><img src="http://images.kingdomofloathing.com/itemimages/clock.gif"'+
				'alt="'+timerName+'" title="'+timerName+'" id="H_CPT_'+i+'"></td>'+
				'<td valign=center><font size='+fsize+' color='+highlight+'>'+timerName+' ('+turnsleft+')</font></td></tr>';
		}
	}
}

// insert our HTML in an appropriate place, if we have any.
if (CounterHTML != '') {
	if (compactMode) {
		$('a:contains("Adv")').closest('table').next().after(CounterHTML);
	} else {
		if ($('p:contains("Effects:")').length > 0) {
			$('p:contains("Effects:")').parent().next().children('table:first').prepend(CounterHTML);
		} else {		// no active effects!  oh noes!
			$('p:contains("Familiar:") > table').prepend(CounterHTML);
		}
	}	
	// and finally, attach the right-click handlers to allow the removal of the timers.
	for (i=0;i<timerlist.length;i++) {
		$('#H_CPT_'+i).bind('contextmenu',RCHandler(i));
	}
}

// --------------- end of action.  now for the supporting functions.

// Return a function to be attached as the Right-click handler for each counter.
// n.b. this must return a function, rather than skipping the indirection and assigning
// this function directly, in order to have the proper closure for the loop index;
// otherwise right-clicking on any effect would always remove the last effect.
function RCHandler(i) {	
	return function(){
		if (confirm("Remove "+timerlist[i].name+"?")) {
			timerlist.splice(i,1);
//			GM_log("timerlist now="+timerlist.toSource());
			GM_setValue("timerlist_"+pid,timerlist.toSource());
			document.location='charpane.php';
		} 
		return false; // no context menu, please.
	}
}

function setTimer(link) {
	pop_query($(link),'Timer:', 'Set!', function(res) {
//		GM_log("res="+res);
		var parts = res.split(';')
//		GM_log("parts="+parts[0]+", "+parts[1]);
		parts[0] = parseInt(parts[0],10);
		timerlist[timerlist.length]={"name":parts[1],"duration":parts[0]+turncounter};
		GM_setValue("timerlist_"+pid,timerlist.toSource());
//		GM_log("set timerlist_"+pid+" to "+timerlist.toSource());
		document.location="charpane.php"; 
	}, "Timer", 100);
}

// pop_query lifted from CDM's inventory page utility scripts and tweaked slightly.

function pop_query(caller, title, button, callback, defname, defdur) {
	if (!defname) defname = '';
	if (!defdur) defdur = '';
	var close = function () { $('#pop_query').css('margin-left','-1000px').hide().remove(); }
	close();
	var $div = $('<div id="pop_query">'+
				'<div style="color:white;background-color:blue;padding:2px 15px 2px 15px;white-space: nowrap;text-align:center">'+
				title+'</div>'+
				'<img class="close" style="cursor: pointer; position: absolute;right:1px;top:1px;" alt="Cancel [Esc]" title="Cancel [Esc]"'+
				'src="http://images.kingdomofloathing.com/closebutton.gif"/>'+
				'<div style="padding:4px; text-align: center">'+
				'Name:<input id="timername" type="text" style="width: 80px;" value="'+defname+'"/><br />'+
				'Turns:<input id="timervalue" type="text" style="width: 80px;" value="'+defdur+'"/><br />'+
				'<input type="button" value="'+button+'" class="button" /></div>'+
				'<div style="clear:both"></div></div>');
	var pos = caller.offset();
	var left = 4; // pos.left;
	$div.css({
		'position': 'absolute',
		'font-weight': 'bold',
		'text-align': 'right',
		'background-color': 'white',
		'border': '1px solid black',
		'top': pos.top + 4,
		'left': left
	});
		
	$('body').append($div);
	$div.find('input[type="button"]').click(function () {
		var parms=$('#timervalue').val()+';'+$('#timername').val();
		callback(parms);
//		callback($(this).parent().find('input[type="text"]').val());	// CDM's original multipurpose code :-)
		close();
	});

	$div.find('.close').click(close);

	$div.find('input[type="text"]')
		.keyup(function (ev) {
			if (ev.keyCode == 27) { close(); }
			else if (ev.keyCode == 13) { 
				callback($(this).val()); 
				close();
			}
		})
		.focus();

	if ((pos.left  + $div.width() + 30) > $(document).width()) {
		$div.css('left', (left - $div.width()));
	}
	if ((pos.top  + $div.height() + 10) > $(document).height()) {
		$div.css('top', (pos.top - $div.height() - 4));
	}
	$div.css('margin-left','1px');
}