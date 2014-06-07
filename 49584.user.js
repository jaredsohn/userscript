// ==UserScript==
// @name           Quick Tactics Editor
// @namespace      GLB
// @include        http://test.goallineblitz.com/game/quick_training.pl
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

function findId(test) {
	var xsw = test.childNodes[0]
	setTacticsId[counter2] = xsw.href.split('player_id=', 2)[1]
}

function findCd(test2) {
	var xsw = test2.childNodes[0]
	setTacticsCd[counter2] = xsw.value
}

function findAgg(test3) {
	var xsw = test3.childNodes[0]
	setTacticsAgg[counter2] = xsw.value
}

function setTacticsCB() {
	var setTactics1 = getElementsByClassName('checkboxCB', document)
	for(var i=0,j=setTactics1.length; i<j; i++) {
		if (setTactics1[i].checked == true) {
			var tdtest = setTactics1[i].parentNode.parentNode.getElementsByTagName('td')
			findId(tdtest[0])
			findCd(tdtest[1])
			findAgg(tdtest[2])
			var url = 'http://test.goallineblitz.com/game/player_tactics.pl?player_id=' +setTacticsId[counter2]+ '&coverage_distance_pct=' +setTacticsCd[counter2]+ '&coverage_style=' +setTacticsAgg[counter2]+ '&action=Update'
			setTactics2(url)
			counter2 = counter2 + 1
		}
	}
	counter2 = 0
};

function setTacticsSafety() {
	var setTactics1 = getElementsByClassName('checkboxSA', document)
	for(var i=0,j=setTactics1.length; i<j; i++) {
		if (setTactics1[i].checked == true) {
			var tdtest = setTactics1[i].parentNode.parentNode.getElementsByTagName('td')
			findId(tdtest[0])
			findCd(tdtest[1])
			findAgg(tdtest[2])
			var url = 'http://test.goallineblitz.com/game/player_tactics.pl?player_id=' +setTacticsId[counter2]+ '&coverage_distance_pct=' +setTacticsCd[counter2]+ '&coverage_style=' +setTacticsAgg[counter2]+ '&action=Update'
			setTactics2(url)
			counter2 = counter2 + 1
		}
	}
	counter2 = 0
};

function setTacticsLB() {
	var setTactics1 = getElementsByClassName('checkboxLB', document)
	for(var i=0,j=setTactics1.length; i<j; i++) {
		if (setTactics1[i].checked == true) {
			var tdtest = setTactics1[i].parentNode.parentNode.getElementsByTagName('td')
			findId(tdtest[0])
			findCd(tdtest[1])
			findAgg(tdtest[2])
			var url = 'http://test.goallineblitz.com/game/player_tactics.pl?player_id=' +setTacticsId[counter2]+ '&coverage_distance_pct=' +setTacticsCd[counter2]+ '&coverage_style=' +setTacticsAgg[counter2]+ '&action=Update'
			setTactics2(url)
			counter2 = counter2 + 1
		}
	}
	counter2 = 0
};

function setTactics2(url1) {
	GM_xmlhttpRequest({
	method: 'GET',
	url: url1,
	headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	  	'Accept': 'application/atom+xml,application/xml,text/xml'}
	})
}


function cbs2() {
CB_table.setAttribute('style', 'width: 100%; visibility: visible')
traintable.setAttribute('style', 'width: 100%; visibility: collapse')
Safety_table.setAttribute('style', 'width: 100%; visibility: collapse')
LB_table.setAttribute('style', 'width: 100%; visibility: collapse')
CBs.setAttribute('class', 'subtab_on')
ttraining.setAttribute('class', 'subtab_off')
LBs.setAttribute('class', 'subtab_off')
Safetys.setAttribute('class', 'subtab_off')
setbutton.setAttribute('value', 'Set Tactics')
setbutton.setAttribute('type', 'button')
setbutton.addEventListener('click', setTacticsCB, false)
setbutton.removeEventListener('click', setTacticsSafety, false)
setbutton.removeEventListener('click', setTacticsLB, false)
};

function safety2() {
Safety_table.setAttribute('style', 'width: 100%; visibility: visible')
traintable.setAttribute('style', 'width: 100%; visibility: collapse')
CB_table.setAttribute('style', 'width: 100%; visibility: collapse')
LB_table.setAttribute('style', 'width: 100%; visibility: collapse')
Safetys.setAttribute('class', 'subtab_on')
ttraining.setAttribute('class', 'subtab_off')
LBs.setAttribute('class', 'subtab_off')
CBs.setAttribute('class', 'subtab_off')
setbutton.setAttribute('value', 'Set Tactics')
setbutton.setAttribute('type', 'button')
setbutton.addEventListener('click', setTacticsSafety, false)
setbutton.removeEventListener('click', setTacticsCB, false)
setbutton.removeEventListener('click', setTacticsLB, false)
};

function LB2() {
LB_table.setAttribute('style', 'width: 100%; visibility: visible')
traintable.setAttribute('style', 'width: 100%; visibility: collapse')
CB_table.setAttribute('style', 'width: 100%; visibility: collapse')
Safety_table.setAttribute('style', 'width: 100%; visibility: collapse')
LBs.setAttribute('class', 'subtab_on')
ttraining.setAttribute('class', 'subtab_off')
Safetys.setAttribute('class', 'subtab_off')
CBs.setAttribute('class', 'subtab_off')
setbutton.setAttribute('value', 'Set Tactics')
setbutton.setAttribute('type', 'button')
setbutton.removeEventListener('click', setTacticsSafety, false)
setbutton.addEventListener('click', setTacticsLB, false)
setbutton.removeEventListener('click', setTacticsCB, false)
};

function training2() {
CB_table.setAttribute('style', 'width: 100%; visibility: collapse')
traintable.setAttribute('style', 'width: 100%; visibility: visible')
Safety_table.setAttribute('style', 'width: 100%; visibility: collapse')
LB_table.setAttribute('style', 'width: 100%; visibility: collapse')
CBs.setAttribute('class', 'subtab_off')
ttraining.setAttribute('class', 'subtab_on')
LBs.setAttribute('class', 'subtab_off')
Safetys.setAttribute('class', 'subtab_off')
setbutton.setAttribute('value', 'Update')
setbutton.removeEventListener('click', setTacticsCB, false)
setbutton.removeEventListener('click', setTacticsSafety, false)
setbutton.removeEventListener('click', setTacticsLB, false)
};

var form = document.getElementsByTagName('form')[0]
var traintable = document.getElementById('training_table')
var setbutton = document.getElementById('submit').firstChild

var tabs = document.createElement('div')
tabs.setAttribute('class', 'tabs')

var tabsb = document.createElement('div')
tabsb.setAttribute('class', 'tab_base')

var CB_table = document.createElement('table')
CB_table.setAttribute('style', 'width: 100%; visibility: collapse')
var CB_table_body = document.createElement('tbody')
var CB_table_tr = document.createElement('tr')
CB_table_tr.setAttribute('class', 'nonalternating_color')
var PN_title = document.createElement('td')
var CD_title = document.createElement('td')
var AGG_title = document.createElement('td')
var ACC_title = document.createElement('td')
PN_title.innerHTML = 'Player Name'
PN_title.setAttribute('class', 'playername')
PN_title.setAttribute('style', 'width: 2000px')
CD_title.innerHTML = 'Coverage Distance'
CD_title.setAttribute('class', 'progress')
AGG_title.innerHTML = 'Aggressiveness'
AGG_title.setAttribute('class', 'training')
ACC_title.innerHTML = 'Accept'
ACC_title.setAttribute('class', 'training_points')

CB_table_tr.appendChild(PN_title)
CB_table_tr.appendChild(CD_title)
CB_table_tr.appendChild(AGG_title)
CB_table_tr.appendChild(ACC_title)
CB_table.appendChild(CB_table_body)
CB_table_body.appendChild(CB_table_tr)

var Safety_table = document.createElement('table')
Safety_table.setAttribute('style', 'width: 100%; visibility: collapse')
var Safety_table_body = document.createElement('tbody')
var Safety_table_tr = document.createElement('tr')
Safety_table_tr.setAttribute('class', 'nonalternating_color')
Safety_table_tr.appendChild(PN_title.cloneNode(true))
Safety_table_tr.appendChild(CD_title.cloneNode(true))
Safety_table_tr.appendChild(AGG_title.cloneNode(true))
Safety_table_tr.appendChild(ACC_title.cloneNode(true))
Safety_table.appendChild(Safety_table_body)
Safety_table_body.appendChild(Safety_table_tr)

var LB_table = document.createElement('table')
LB_table.setAttribute('style', 'width: 100%; visibility: collapse')
var LB_table_body = document.createElement('tbody')
var LB_table_tr = document.createElement('tr')
LB_table_tr.setAttribute('class', 'nonalternating_color')
LB_table_tr.appendChild(PN_title.cloneNode(true))
LB_table_tr.appendChild(CD_title.cloneNode(true))
LB_table_tr.appendChild(AGG_title.cloneNode(true))
LB_table_tr.appendChild(ACC_title.cloneNode(true))
LB_table.appendChild(LB_table_body)
LB_table_body.appendChild(LB_table_tr)

var CBs = document.createElement('div')
CBs.setAttribute('class', 'subtab_off')
CBs.innerHTML = '<a>CBs</a>'
CBs.addEventListener('click', cbs2, false)

var Safetys = document.createElement('div')
Safetys.setAttribute('class', 'subtab_off')
Safetys.innerHTML = '<a>Safeties</a>'
Safetys.addEventListener('click', safety2, false)

var LBs = document.createElement('div')
LBs.setAttribute('class', 'subtab_off')
LBs.innerHTML = '<a>LBs</a>'
LBs.addEventListener('click', LB2, false)

var ttraining = document.createElement('div')
ttraining.setAttribute('class', 'subtab_on')
ttraining.innerHTML = '<a>Training</a>'
ttraining.addEventListener('click', training2, false)

tabs.appendChild(ttraining)
tabs.appendChild(CBs)
tabs.appendChild(Safetys)
tabs.appendChild(LBs)
form.appendChild(tabs)
form.appendChild(tabsb)
form.removeChild(traintable)
form.appendChild(CB_table)
form.appendChild(Safety_table)
form.appendChild(LB_table)
form.appendChild(traintable)

var test1 = getElementsByClassName('alternating_color1', document)
var test2 = getElementsByClassName('alternating_color2', document)
var CB_Array = new Array()
var CB_button2 = new Array()
var counter = 0
var gray = 0
for(var i=0,j=test1.length; i<j; i++) {
	if (test1[i].innerHTML.indexOf('CB', 0)>=0) {
		CB_Array[counter] = test1[i].cloneNode(true)
		CB_table_body.appendChild(CB_Array[counter])
		if (gray == 1) {
			CB_Array[counter].setAttribute('class', 'alternating_color2')
			gray = 0
		} else {
			CB_Array[counter].setAttribute('class', 'alternating_color1')
			gray = 1
		}
		getElementsByClassName('progress', CB_Array[counter])[0].innerHTML = '<input type="text" style="text-align: right" class="CD_box" title="'+counter+'">'
		getElementsByClassName('training', CB_Array[counter])[0].innerHTML = '<select class="coverage_style" title="'+counter+'"><option value="loose">Loose: Play it safe and try not to get beat</option><option value="normal">Medium: Go for the interception/PD only if you have help over the top, otherwise play loose</option><option value="semi">Semi-Aggressive: Go for the PD frequently, but do not worry about the interception</option><option value="aggressive">Aggressive: Go for the interception frequently, even if you might get beat</option></select>'
		CB_button = getElementsByClassName('training_points', CB_Array[counter])[0]
		CB_button.innerHTML = ''
		CB_button2[counter] = document.createElement('input')
		CB_button2[counter].setAttribute('type', 'checkbox')
		CB_button2[counter].setAttribute('class', 'checkboxCB')
		CB_button.appendChild(CB_button2[counter])
		CB_button2[counter].setAttribute('title', counter)
		counter = counter + 1
	}
}

for(var i=0,j=test2.length; i<j; i++) {
	if (test2[i].innerHTML.indexOf('CB', 0)>=0) {
		CB_Array[counter] = test2[i].cloneNode(true)
		CB_table_body.appendChild(CB_Array[counter])
		if (gray == 1) {
			CB_Array[counter].setAttribute('class', 'alternating_color2')
			gray = 0
		} else {
			CB_Array[counter].setAttribute('class', 'alternating_color1')
			gray = 1
		}
		getElementsByClassName('progress', CB_Array[counter])[0].innerHTML = '<input type="text" style="text-align: right" class="CD_box" title="'+counter+'">'
		getElementsByClassName('training', CB_Array[counter])[0].innerHTML = '<select class="coverage_style" title="'+counter+'"><option value="loose">Loose: Play it safe and try not to get beat</option><option value="normal">Medium: Go for the interception/PD only if you have help over the top, otherwise play loose</option><option value="semi">Semi-Aggressive: Go for the PD frequently, but do not worry about the interception</option><option value="aggressive">Aggressive: Go for the interception frequently, even if you might get beat</option></select>'
		CB_button = getElementsByClassName('training_points', CB_Array[counter])[0]
		CB_button.innerHTML = ''
		CB_button2[counter] = document.createElement('input')
		CB_button2[counter].setAttribute('type', 'checkbox')
		CB_button2[counter].setAttribute('class', 'checkboxCB')
		CB_button.appendChild(CB_button2[counter])
		CB_button2[counter].setAttribute('title', counter)
		counter = counter + 1
	}
}

//===============//
// Start of safety code //
//===============//

var SA_Array = new Array()
var SA_button2 = new Array()
counter = 0
var gray = 0

for(var i=0,j=test1.length; i<j; i++) {
	if (test1[i].innerHTML.indexOf('FS', 0)>=0) {
		SA_Array[counter] = test1[i].cloneNode(true)
		Safety_table_body.appendChild(SA_Array[counter])
		if (gray == 1) {
			SA_Array[counter].setAttribute('class', 'alternating_color2')
			gray = 0
		} else {
			SA_Array[counter].setAttribute('class', 'alternating_color1')
			gray = 1
		}
		getElementsByClassName('progress', SA_Array[counter])[0].innerHTML = '<input type="text" style="text-align: right" class="CD_box" title="'+counter+'">'
		getElementsByClassName('training', SA_Array[counter])[0].innerHTML = '<select class="coverage_style" title="'+counter+'"><option value="loose">Loose: Play it safe and try not to get beat</option><option value="normal">Medium: Go for the interception/PD only if you have help over the top, otherwise play loose</option><option value="semi">Semi-Aggressive: Go for the PD frequently, but do not worry about the interception</option><option value="aggressive">Aggressive: Go for the interception frequently, even if you might get beat</option></select>'
		SA_button = getElementsByClassName('training_points', SA_Array[counter])[0]
		SA_button.innerHTML = ''
		SA_button2[counter] = document.createElement('input')
		SA_button2[counter].setAttribute('type', 'checkbox')
		SA_button2[counter].setAttribute('class', 'checkboxSA')
		SA_button.appendChild(SA_button2[counter])
		SA_button2[counter].setAttribute('title', counter)
		counter = counter + 1
	}
}

for(var i=0,j=test2.length; i<j; i++) {
	if (test2[i].innerHTML.indexOf('FS', 0)>=0) {
		SA_Array[counter] = test2[i].cloneNode(true)
		Safety_table_body.appendChild(SA_Array[counter])
		if (gray == 1) {
			SA_Array[counter].setAttribute('class', 'alternating_color2')
			gray = 0
		} else {
			SA_Array[counter].setAttribute('class', 'alternating_color1')
			gray = 1
		}
		getElementsByClassName('progress', SA_Array[counter])[0].innerHTML = '<input type="text" style="text-align: right" class="CD_box" title="'+counter+'">'
		getElementsByClassName('training', SA_Array[counter])[0].innerHTML = '<select class="coverage_style" title="'+counter+'"><option value="loose">Loose: Play it safe and try not to get beat</option><option value="normal">Medium: Go for the interception/PD only if you have help over the top, otherwise play loose</option><option value="semi">Semi-Aggressive: Go for the PD frequently, but do not worry about the interception</option><option value="aggressive">Aggressive: Go for the interception frequently, even if you might get beat</option></select>'
		SA_button = getElementsByClassName('training_points', SA_Array[counter])[0]
		SA_button.innerHTML = ''
		SA_button2[counter] = document.createElement('input')
		SA_button2[counter].setAttribute('type', 'checkbox')
		SA_button2[counter].setAttribute('class', 'checkboxSA')
		SA_button.appendChild(SA_button2[counter])
		SA_button2[counter].setAttribute('title', counter)
		counter = counter + 1
	}
}

for(var i=0,j=test1.length; i<j; i++) {
	if (test1[i].innerHTML.indexOf('SS', 0)>=0) {
		SA_Array[counter] = test1[i].cloneNode(true)
		Safety_table_body.appendChild(SA_Array[counter])
		if (gray == 1) {
			SA_Array[counter].setAttribute('class', 'alternating_color2')
			gray = 0
		} else {
			SA_Array[counter].setAttribute('class', 'alternating_color1')
			gray = 1
		}
		getElementsByClassName('progress', SA_Array[counter])[0].innerHTML = '<input type="text" style="text-align: right" class="CD_box" title="'+counter+'">'
		getElementsByClassName('training', SA_Array[counter])[0].innerHTML = '<select class="coverage_style" title="'+counter+'"><option value="loose">Loose: Play it safe and try not to get beat</option><option value="normal">Medium: Go for the interception/PD only if you have help over the top, otherwise play loose</option><option value="semi">Semi-Aggressive: Go for the PD frequently, but do not worry about the interception</option><option value="aggressive">Aggressive: Go for the interception frequently, even if you might get beat</option></select>'
		SA_button = getElementsByClassName('training_points', SA_Array[counter])[0]
		SA_button.innerHTML = ''
		SA_button2[counter] = document.createElement('input')
		SA_button2[counter].setAttribute('type', 'checkbox')
		SA_button2[counter].setAttribute('class', 'checkboxSA')
		SA_button.appendChild(SA_button2[counter])
		SA_button2[counter].setAttribute('title', counter)
		counter = counter + 1
	}
}

for(var i=0,j=test2.length; i<j; i++) {
	if (test2[i].innerHTML.indexOf('SS', 0)>=0) {
		SA_Array[counter] = test2[i].cloneNode(true)
		Safety_table_body.appendChild(SA_Array[counter])
		if (gray == 1) {
			SA_Array[counter].setAttribute('class', 'alternating_color2')
			gray = 0
		} else {
			SA_Array[counter].setAttribute('class', 'alternating_color1')
			gray = 1
		}
		getElementsByClassName('progress', SA_Array[counter])[0].innerHTML = '<input type="text" style="text-align: right" class="CD_box" title="'+counter+'">'
		getElementsByClassName('training', SA_Array[counter])[0].innerHTML = '<select class="coverage_style" title="'+counter+'"><option value="loose">Loose: Play it safe and try not to get beat</option><option value="normal">Medium: Go for the interception/PD only if you have help over the top, otherwise play loose</option><option value="semi">Semi-Aggressive: Go for the PD frequently, but do not worry about the interception</option><option value="aggressive">Aggressive: Go for the interception frequently, even if you might get beat</option></select>'
		SA_button = getElementsByClassName('training_points', SA_Array[counter])[0]
		SA_button.innerHTML = ''
		SA_button2[counter] = document.createElement('input')
		SA_button2[counter].setAttribute('type', 'checkbox')
		SA_button2[counter].setAttribute('class', 'checkboxSA')
		SA_button.appendChild(SA_button2[counter])
		SA_button2[counter].setAttribute('title', counter)
		counter = counter + 1
	}
}

//===============//
// Start of LB code //
//===============//

var LB_Array = new Array()
var LB_button2 = new Array()
counter = 0
var gray = 0

for(var i=0,j=test1.length; i<j; i++) {
	if (test1[i].innerHTML.indexOf('LB', 0)>=0) {
		LB_Array[counter] = test1[i].cloneNode(true)
		LB_table_body.appendChild(LB_Array[counter])
		if (gray == 1) {
			LB_Array[counter].setAttribute('class', 'alternating_color2')
			gray = 0
		} else {
			LB_Array[counter].setAttribute('class', 'alternating_color1')
			gray = 1
		}
		getElementsByClassName('progress', LB_Array[counter])[0].innerHTML = '<input type="text" style="text-align: right" class="CD_box" title="'+counter+'">'
		getElementsByClassName('training', LB_Array[counter])[0].innerHTML = '<select class="coverage_style" title="'+counter+'"><option value="loose">Loose: Play it safe and try not to get beat</option><option value="normal">Medium: Go for the interception/PD only if you have help over the top, otherwise play loose</option><option value="semi">Semi-Aggressive: Go for the PD frequently, but do not worry about the interception</option><option value="aggressive">Aggressive: Go for the interception frequently, even if you might get beat</option></select>'
		LB_button = getElementsByClassName('training_points', LB_Array[counter])[0]
		LB_button.innerHTML = ''
		LB_button2[counter] = document.createElement('input')
		LB_button2[counter].setAttribute('type', 'checkbox')
		LB_button2[counter].setAttribute('class', 'checkboxLB')
		LB_button.appendChild(LB_button2[counter])
		LB_button2[counter].setAttribute('title', counter)
		counter = counter + 1
	}
}

for(var i=0,j=test2.length; i<j; i++) {
	if (test2[i].innerHTML.indexOf('LB', 0)>=0) {
		LB_Array[counter] = test2[i].cloneNode(true)
		LB_table_body.appendChild(LB_Array[counter])
		if (gray == 1) {
			LB_Array[counter].setAttribute('class', 'alternating_color2')
			gray = 0
		} else {
			LB_Array[counter].setAttribute('class', 'alternating_color1')
			gray = 1
		}
		getElementsByClassName('progress', LB_Array[counter])[0].innerHTML = '<input type="text" style="text-align: right" class="CD_box" title="'+counter+'">'
		getElementsByClassName('training', LB_Array[counter])[0].innerHTML = '<select class="coverage_style" title="'+counter+'"><option value="loose">Loose: Play it safe and try not to get beat</option><option value="normal">Medium: Go for the interception/PD only if you have help over the top, otherwise play loose</option><option value="semi">Semi-Aggressive: Go for the PD frequently, but do not worry about the interception</option><option value="aggressive">Aggressive: Go for the interception frequently, even if you might get beat</option></select>'
		LB_button = getElementsByClassName('training_points', LB_Array[counter])[0]
		LB_button.innerHTML = ''
		LB_button2[counter] = document.createElement('input')
		LB_button2[counter].setAttribute('type', 'checkbox')
		LB_button2[counter].setAttribute('class', 'checkboxLB')
		LB_button.appendChild(LB_button2[counter])
		LB_button2[counter].setAttribute('title', counter)
		counter = counter + 1
	}
}

var counter2 = 0
var setTacticsId = new Array()
var setTacticsCd = new Array()
var setTacticsAgg = new Array()