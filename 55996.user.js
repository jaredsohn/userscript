// ==UserScript==
// @name            myBrute info
// @version         1.0.3
// @namespace       
// @description     myBrute.com - some additional info 
// @include http://*.mybrute.com/cellule*
// @include http://*.mybrute.com/arene*
// @include http://*.mybrute.com/fight*
// ==/UserScript==
var exp = new Array();
exp[1] = '4'; exp[2] = '8'; exp[3] = '12'; exp[4] = '16'; exp[5] = '21'; 
exp[6] = '26'; exp[7] = '32'; exp[8] = '37'; exp[9] = '43'; exp[10] = '49';
exp[11] = '55'; exp[12] = '61'; exp[13] = '68'; exp[14] = '75'; exp[15] = '81';
exp[16] = '88'; exp[17] = '95'; exp[18] = '102'; exp[19] = '109'; exp[20] = '117';
exp[21] = '124'; exp[22] = '132'; exp[23] = '139'; exp[24] = '147'; exp[25] = '155';
exp[26] = '163'; exp[27] = '171'; exp[28] = '179'; exp[29] = '187'; exp[30] = '196';
exp[31] = '204'; exp[32] = '212'; exp[33] = '221'; exp[34] = '230'; exp[35] = '238';
exp[36] = '247'; exp[37] = '256'; exp[38] = '265'; exp[39] = '273'; exp[40] = '283';
exp[41] = '292'; exp[42] = '301'; exp[43] = '310'; exp[44] = '320'; exp[45] = '329';
exp[46] = '338'; exp[47] = '348'; exp[48] = '358'; exp[49] = '367'; exp[50] = '376';
exp[51] = '387'; exp[52] = '396'; exp[53] = '406'; exp[54] = '416'; exp[55] = '426';
exp[56] = '436'; exp[57] = '446'; exp[58] = '456'; exp[59] = '466'; exp[60] = '476';
exp[61] = '487'; exp[62] = '497'; exp[63] = '508'; exp[64] = '517'; exp[65] = '529';
exp[66] = '538'; exp[67] = '550'; exp[68] = '560'; exp[69] = '570'; exp[70] = '581';
exp[71] = '592'; exp[72] = '603'; exp[73] = '614'; exp[74] = '624'; exp[75] = '636';
exp[76] = '646'; exp[77] = '658'; exp[78] = '668'; exp[79] = '680'; exp[80] = '690';
exp[81] = '702'; exp[82] = '713'; exp[83] = '724'; exp[84] = '736'; exp[85] = '747';
exp[86] = '758'; exp[87] = '770'; exp[88] = '781'; exp[89] = '793'; exp[90] = '804';
exp[91] = '816'; exp[92] = '827'; exp[93] = '839'; exp[94] = '851'; exp[95] = '862';
exp[96] = '875'; exp[97] = '886'; exp[98] = '898'; exp[99] = '909';

var maxLevel = 99;

var url=window.location.href;
var page = 'unknown';
var command = url.substr(url.length - 4, 4);
var bruteArray = new Array();
var enemyArray = new Array();


function getBruteName() {
    //return window.location.href.split("//")[1].split(".mybrute.com/")[0];
    return window.location.href.split("//")[1].split(".")[0];
}
function makeLink(brute) {
    return "http://" + brute + ".mybrute.com/cellule";
}
function makeVsLink(brute) {
    return "http://" + getBruteName() + ".mybrute.com/vs/" + brute;
}
function getVsBruteName() {
    if (window.location.href.split("=").length > 1) {
        return window.location.href.split("=")[1].split(";")[0];
    }
    else {
        return 'x';
    }
}
function fixName(brute) {
    brute = brute.replace(/-/g, "-");
    brute = brute.replace(/^\s+|\s+$/g, "");
    brute = brute.replace(/ /g, "-");
    brute = brute.replace(/[^a-z0-9\-]/ig, "");
    return brute;
}
function getNewPupilName(s) {
    s = s.replace(/New pupil: /, "");
    s = s.replace(/ !/, "");
    return s;
}
function getLevelupPupilName(s) {
    s = s.replace(/The pupil /, "");
    s = s.replace(/ goes to level /, "*");
    s = s.split("*")[0];
    return s;
}
function registerForTournament() {
    if (document.getElementById('tournament')) {
        var t = document.getElementById('tournament');
        var a = t.getElementsByTagName('a');
        if (a.length > 0) {
            window.location.href = a[0].href;
        }
    }
}
function addFriend() {
    var bruteCount = GM_getValue('brutecount', 0);
    var brute = getBruteName();

    for (var a = 0; a < bruteCount; a++) {
        if (GM_getValue('brute' + a) == brute) {
            return;
        }
    }
    
    GM_setValue('brutecount', bruteCount + 1);
    GM_setValue('brute' + bruteCount, brute);

    window.location.reload();
}
function delFriend() {
    var bruteCount = GM_getValue('brutecount', 0);
    if (bruteCount > 0) {
        var brute = getBruteName();
        var brutes = new Array();

        for (var a = 0; a < bruteCount; a++) {
            if (GM_getValue('brute' + a) != brute) {
                brutes.push(GM_getValue('brute' + a));
            }
            GM_deleteValue('brute' + a);
        }

        for (var a = 0; a < brutes.length; a++) {
            GM_setValue('brute' + a, brutes[a]);
        }
        GM_setValue('brutecount', brutes.length);
    }

    window.location.reload();
}
function addEnemy() {
    var bruteCount = GM_getValue('enemycount', 0);
    var brute = getBruteName();

    for (var a = 0; a < bruteCount; a++) {
        if (GM_getValue('enemy' + a) == brute) {
            return;
        }
    }

    GM_setValue('enemycount', bruteCount + 1);
    GM_setValue('enemy' + bruteCount, brute);

    window.location.reload();
}
function delEnemy() {
    var bruteCount = GM_getValue('enemycount', 0);
    if (bruteCount > 0) {
        var brute = getBruteName();
        var brutes = new Array();

        for (var a = 0; a < bruteCount; a++) {
            if (GM_getValue('enemy' + a) != brute) {
                brutes.push(GM_getValue('enemy' + a));
            }
            GM_deleteValue('enemy' + a);
        }

        for (var a = 0; a < brutes.length; a++) {
            GM_setValue('enemy' + a, brutes[a]);
        }
        GM_setValue('enemycount', brutes.length);
    }

    window.location.reload();
}
function enemyFight() {
    var enemy = document.getElementById('enemylist').options[document.getElementById('enemylist').selectedIndex].value;
    if (enemy != getBruteName()) {
        location.href = 'http://' + getBruteName() + '.mybrute.com/vs/' + document.getElementById('enemylist').options[document.getElementById('enemylist').selectedIndex].value;
    }
}
function enemyVisit() {
    var enemy = document.getElementById('enemylist').options[document.getElementById('enemylist').selectedIndex].value;
    if (enemy != getBruteName()) {
        location.href = 'http://' + enemy + '.mybrute.com/cellule';
    }
}


if(url.indexOf('/cellule')>=0){	page='cellule';}
else if(url.indexOf('/arene')>=0){ page='arene';}
else if (url.indexOf('/fight') >= 0) { page = 'fight'; }
var thisBrute = getBruteName();

if (page == 'cellule') {

    // friend array
    for (var a = 0; a < GM_getValue('brutecount', 0); a++) {
        bruteArray.push(GM_getValue('brute' + a));
    }

    //register for tournament
    for (var a = 0; a < bruteArray.length; a++) {
        if (bruteArray[a] == thisBrute) registerForTournament();
    }

    var thispercent='0';
    var thislevel='?';
    var lb=document.getElementsByClassName('levelBar');
    if(lb[0]){
	    var lbw = lb[0].style.width;
	    if(lbw){
		    thispercent=lbw.substr(0,lbw.length-1);
	    }
    }

    var cell_t=document.getElementsByClassName('level');
			    if(cell_t[0]){ var cell_s = cell_t[0].getElementsByTagName('span');
				    if(cell_s[0]){ var cell_d=cell_s[0];
					    if(cell_d){ var cell_leveltext=cell_d.innerHTML.split(" ");
						    if(cell_leveltext[1]) thislevel=cell_leveltext[1];
					    }
				    }
			    }

	var infoText = "";

	if (thislevel <= maxLevel) {
	    var exp_current = exp[thislevel] * thispercent / 100;
	    exp_current = Math.round(exp_current);
	    infoText = exp_current + '/' + exp[thislevel] + ' (' + new Number(thispercent).toFixed(2) + '%)';
	}
	else {
	    infoText = new Number(thispercent).toFixed(2) + '%';
	}


    var oLevelBar = document.getElementsByClassName('levelBar')[0];
    var oLevelTxt = document.createElement('div');


    oLevelTxt.innerHTML = infoText;

    oLevelTxt.style.width = '100px';
    oLevelTxt.style.fontSize = '11px';
    oLevelTxt.style.textAlign = 'left';

    document.getElementsByClassName('level')[0].appendChild(oLevelTxt);
    
    ////////////////////////////////////////////////////////////////////////
    //    history enchancement
    ////////////////////////////////////////////////////////////////////////

    var pup = document.getElementsByClassName('log log-child');
    for (var i = 0; i < pup.length; i++) {
        var lmain = pup[i].getElementsByClassName('lmain')[0];
        lmain.innerHTML = '<a href="' + makeLink(fixName(getNewPupilName(lmain.innerHTML))) + '" onmouseover="mt.js.Tip.show(this,\'Click here to visit your pupil.\',null)" onmouseout="mt.js.Tip.hide()">' + lmain.innerHTML + '</a>';
    }

    pup = document.getElementsByClassName('log log-childup');
    for (var i = 0; i < pup.length; i++) {
        var lmain = pup[i].getElementsByClassName('lmain')[0];
        lmain.innerHTML = '<a href="' + makeLink(fixName(getLevelupPupilName(lmain.innerHTML))) + '" onmouseover="mt.js.Tip.show(this,\'Click here to visit your pupil.\',null)" onmouseout="mt.js.Tip.hide()">' + lmain.innerHTML + '</a>';
    }
    
    ////////////////////////////////////////////////////////////////////////
    //    Friends list
    ////////////////////////////////////////////////////////////////////////    

    var showAdd = 0;
    var showDel = 1;
    var bruteList = '';
    
    for (var i = 0; i < bruteArray.length; i++) {
        bruteList = bruteList + '<option ';
        if (getBruteName() == bruteArray[i]){
            showAdd = 1;
            showDel = 0;
            bruteList = bruteList + 'selected ';
        }
        bruteList = bruteList + 'value="' + makeLink(bruteArray[i]) + '">' + bruteArray[i] + '</option>';
    }

    if (showAdd == 0) {
        bruteList = '<select style="width: 150px;" onchange="location.href=this.options[this.selectedIndex].value;"><option selected value=""></option>' + bruteList;
    }
    else {
        bruteList = '<select style="width: 150px;" onchange="location.href=this.options[this.selectedIndex].value;">' + bruteList;
    }
    bruteList = bruteList + '</select>';

    if (showAdd == 0) {
	    bruteList += ' <span id="addFriend" style="cursor:pointer;text-decoration:underline;" >add</span>';
	}
	if (showDel == 0){
	    bruteList += ' <span id="delFriend" style="cursor:pointer;text-decoration:underline;" >del</span>';
    }

    ////////////////////////////////////////////////////////////////////////
    //    Enemy list;
    ////////////////////////////////////////////////////////////////////////    

    for (var a = 0; a < GM_getValue('enemycount', 0); a++) {
        enemyArray.push(GM_getValue('enemy' + a));
    }

    showAdd = 0;
    showDel = 1;
    var enemyList = '';

    for (var i = 0; i < enemyArray.length; i++) {
        enemyList = enemyList + '<option ';
        if (getBruteName() == enemyArray[i]) {
            showAdd = 1;
            showDel = 0;
            enemyList = enemyList + 'selected ';
        }
        enemyList = enemyList + 'value="' + enemyArray[i] + '">' + enemyArray[i] + '</option>';
    }

    if (showAdd == 0) {
        enemyList = '<select id="enemylist" style="width: 150px;" ><option selected value="' + getBruteName() + '"></option>' + enemyList;
    }
    else {
        enemyList = '<select id="enemylist" style="width: 150px;" >' + enemyList;
    }
    enemyList += '</select>';

    if (showAdd == 0) {
        enemyList += ' <span id="addEnemy" style="cursor:pointer;text-decoration:underline;">add</span>';
    } else {
        enemyList += ' <span id="delEnemy" style="cursor:pointer;text-decoration:underline;">del</span>';
    }

    enemyList += '<br /><span id="enemyVisit" style="cursor:pointer;text-decoration:underline;">visit</span>';
    enemyList += ' <span id="enemyFight" style="cursor:pointer;text-decoration:underline;" >fight</span>'; 

    var cr = document.getElementsByClassName('cellulePub');
    if (cr[0]) {
        cr[0].innerHTML = '<div class="img_box" style="text-align: left; padding-left: 25px">Friends:<br />' + bruteList + '<br />Enemies:<br />' + enemyList + '</div>';
    }

    // register events
    if (document.getElementById('addFriend'))
        document.getElementById('addFriend').addEventListener('click', addFriend, false);
    if (document.getElementById('delFriend'))
        document.getElementById('delFriend').addEventListener('click', delFriend, false);
    if (document.getElementById('addEnemy'))
        document.getElementById('addEnemy').addEventListener('click', addEnemy, false);
    if (document.getElementById('delEnemy'))
        document.getElementById('delEnemy').addEventListener('click', delEnemy, false);
    if (document.getElementById('enemyFight'))
        document.getElementById('enemyFight').addEventListener('click', enemyFight, false);
    if (document.getElementById('enemyVisit'))
        document.getElementById('enemyVisit').addEventListener('click', enemyVisit, false);
}

if (page == 'arene') {

	var o=document.getElementsByClassName('swf');
    var allnames = document.getElementsByClassName("name");

    for (var i = 0; i < allnames.length; i++) {
        var opp=o[i+1].id.substr(10,o[i+1].id.length);
    
        var nameEl = allnames[i];
        var name = nameEl.innerHTML;
//        name = name.replace(/ /g, "-");
//        name = name.replace(/[^a-z0-9\-]/ig, "");
        var link = document.createElement('a');
        link.setAttribute('href', 'http://' + opp + '.mybrute.com/cellule');
        link.setAttribute('target', '_blank');
        link.setAttribute('onclick', 'e=event; if (!e) var e = window.event; e.cancelBubble = true; if (e.stopPropagation) e.stopPropagation();');

        link.innerHTML = name;
        nameEl.innerHTML = "";
        nameEl.insertBefore(link, null);
    }

    allnames = document.getElementsByClassName("miniCaracs");
    for (var i = 0; i < allnames.length; i++) {
        var nameEl = allnames[i];
        nameEl.setAttribute('onmouseover', 'return false;');
    }

    var thispercent = '0';
    var thislevel = '?';
    var lb = document.getElementsByClassName('levelBar');
    if (lb[0]) {
        var lbw = lb[0].style.width;
        if (lbw) {
            thispercent = lbw.substr(0, lbw.length - 1);
        }
    }

    var cell_t = document.getElementsByClassName('xpContainer');
    if (cell_t[0]) {
        var cell_s = cell_t[0].getElementsByTagName('span');
        if (cell_s[0]) {
            var cell_d = cell_s[0];
            if (cell_d) {
                var cell_leveltext = cell_d.innerHTML.split(" ");
                if (cell_leveltext[1]) thislevel = cell_leveltext[1];
            }
        }
    }

    var infoText = "";

    if (thislevel <= maxLevel) {
        var exp_current = exp[thislevel] * thispercent / 100;
        exp_current = Math.round(exp_current);
        infoText = exp_current + '/' + exp[thislevel] + ' (' + new Number(thispercent).toFixed(2) + '%)';
    }
    else {
        infoText = new Number(thispercent).toFixed(2) + '%';
    }

    var oLevelBar = document.getElementsByClassName('levelBar')[0];
    var oLevelTxt = document.createElement('div');


    oLevelTxt.innerHTML = infoText;

    oLevelTxt.style.width = '100px';
    oLevelTxt.style.fontSize = '11px';
    oLevelTxt.style.textAlign = 'left';

    document.getElementsByClassName('xpContainer')[0].appendChild(oLevelTxt);
    
}

if (page == 'fight') {

	var sc = document.getElementsByTagName('script');
	var s = sc[1].innerHTML;
	var s1 = s.split('("')[5];
	var s2 = s1.split('%3A')[15];
	var s3 = s2.split('R8')[0];
	s3 = unescape(unescape(s3));
   
	var s2 = s1.split('%3A')[8];
	var s4 = s2.split('y5')[0];
	s4 = unescape(unescape(s4));


	var lb = document.getElementsByClassName('ctn');
	if (lb[0]) {
	    if (getVsBruteName() != 'x') {
	        lb[0].innerHTML += ' <a href="' + makeLink(getVsBruteName()) + '">Visit ' + s3 + '\'s cell</a>';
	    }
	    else {
	        if (fixName(s3).toUpperCase() == getBruteName().toUpperCase()) {
	            lb[0].innerHTML += ' <a href="' + makeLink(fixName(s4)) + '">Visit ' + s4 + '\'s cell</a>';
	        }
	        else if (fixName(s4).toUpperCase() == getBruteName().toUpperCase()) {
	            lb[0].innerHTML += ' <a href="' + makeLink(fixName(s3)) + '">Visit ' + s3 + '\'s cell</a>';
	        }
	    }
	}
	var h = document.getElementById('debrief');
	h.style.display = 'inline';
	//alert(h.innerHTML);
}
