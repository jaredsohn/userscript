// ==UserScript==
// @name           Demeiz Outwar Tools
// @namespace      http://userscripts.org/scripts/show/100161
// @description    A compilation of helpful functions for outwar (v1.0)
// @include        http://*.outwar.com*
// ==/UserScript==


var autoRaidDamage = true;
var bHandler = true;
var aHit = new Array();

if ( document.URL.indexOf("world.php") != -1 ) {
	//setTimeout(room,5000);
}

if ( document.URL.indexOf("trade.php") != -1 ) {
	var aLinks = document.links;
	for ( var i = 0 ; i < document.links.length ; i++ ) {
		if ( aLinks[i].href.indexOf("trade.php") != -1 ) {
			aLinks[i].addEventListener('click',function (e) { GM_openInTab(e.target.parentNode.href); e.preventDefault();},false);
		}
	}
}	

function emoIsPage(vURL, vPage) {
    var regex = new RegExp("^http://(torax|sigil|fabar|zimbob|rancid|quiver|www)\.outwar\.com/(" + vPage + ")");
    var result = regex.exec(vURL);

    if ( result != null){
        if ( result.length == 3){
            if ( result[2] == vPage ){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function emoGetServer(vURL) {
    var regex = new RegExp("^http://(torax|sigil|fabar|zimbob|rancid|quiver|www)\.outwar\.com/");
    var result = regex.exec(vURL);

    if ( result != null ){
        if ( result.length == 2){
            return result[1];
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function room() {
unsafeWindow.gotoRoom(0,0);
setTimeout(room,5000);
}
		
/* Open Hitlist and Crew Profile in Tabs */
if ( document.URL.indexOf("crew_hitlist.php") != -1 ) {

	hitlistsource = $X('/html/body/center/div[1]/div[3]/table[1]/tbody/tr[1]/td[2]/table/tbody/tr[1]/td[1]/center/table/tbody/tr[2]/td[1]/table/tbody/tr[1]/td[1]/div[2]/center/table/tbody/tr[1]/td[1]');
	
	hitlistregexp = new RegExp("\\((\\d+).*\\d+\\)","gim");
	
	peoplehitlisted = parseInt(hitlistregexp.exec(hitlistsource.innerHTML)[1]);

	menutarget = $X('/html/body/center/div[1]/div[3]/table[1]/tbody/tr[1]/td[2]/table/tbody/tr[1]/td[1]/center'); /* Holds The Hitlist Table we'll create the menu with the links to open the hitlist in tabs over the hitlist table */
	
	hitlisttable = menutarget.firstChild; /* Hitlist Table */

	menutarget.insertBefore(document.createElement('br'),hitlisttable);

	menu = document.createElement('div'); /* creates and defines the menu that will hold the "shortcuts" */
	menu.setAttribute('style','margin-left: auto; margin-right: auto; width: 405px');

	menutarget.insertBefore(menu,menutarget.firstChild);

	for ( i = 0 ; i < peoplehitlisted ; i += 25 ) {
		box = document.createElement('div');
		link = document.createElement('a');
		aHit[i/25] = i;
		link.addEventListener("click",attackhl, false);
		link.appendChild(document.createTextNode(i.toString()+'-'+(i+25).toString()));
		link.setAttribute('title',i.toString());
		link.setAttribute('href','#');
		link.setAttribute('style','clear: all;color: #ffa500; font-weight: bold; width: 50px; float: left;')
		box.appendChild(link);
		menu.appendChild(box);
	}
}

if ( document.URL.indexOf("crew_profile.php") != -1 ) {

	hitlistsource = $X('/html/body/center/div[1]/div[3]/table[1]/tbody/tr[1]/td[2]/table/tbody/tr[1]/td[1]/table/tbody/tr[1]/td[1]/table/tbody/tr[1]/td[1]/table/tbody/tr[2]/td[1]/table/tbody/tr[4]/td[2]/font');
	
	
	peoplehitlisted = parseInt(hitlistsource.innerHTML);

	menutarget = $X('/html/body/center/div[1]/div[3]/table[1]/tbody/tr[1]/td[2]'); /* Holds The Hitlist Table we'll create the menu with the links to open the hitlist in tabs over the hitlist table */

	hitlisttable = menutarget.firstChild; /* Hitlist Table */

	menutarget.insertBefore(document.createElement('br'),hitlisttable);

	menu = document.createElement('div'); /* creates and defines the menu that will hold the "shortcuts" */
	menu.setAttribute('style','margin-left: auto; margin-right: auto; width: 405px');

	menutarget.insertBefore(menu,menutarget.firstChild);

	for ( i = 0 ; i < peoplehitlisted ; i += 25 ) {
		box = document.createElement('div');
		link = document.createElement('a');
		aHit[i/25] = i;
		link.addEventListener("click",attackcrew, false);
		link.appendChild(document.createTextNode(i.toString()+'-'+(i+25).toString()));
		link.setAttribute('title',i.toString());
		link.setAttribute('href','#');
		link.setAttribute('style','clear: all;color: #ffa500; font-weight: bold; width: 50px; float: left;')
		box.appendChild(link);
		menu.appendChild(box);
	}

}

function attackcrew(e) {
    starton = parseInt(this.getAttribute('title'));
    var doc = document;

    // check we have document object
    if (doc && doc != null){
        // get all links
        var aLinks = doc.links;
        // check
        if (aLinks && aLinks != null && aLinks.length > 0 ){
            // loop
	    mycount = 0;
	    started = 0
            for (var i = 0; i < aLinks.length &&  mycount < 25; i++){
                // check
                if ( emoIsPage(aLinks[i].href, 'profile.php') == true ) {
                    // open new tab
			if ( started >= starton ) { 
                    	GM_openInTab(aLinks[i].href);
			mycount++;
			}
			started++;
                }
            }
        }
    }
}

function attackhl(e) {
    starton = parseInt(this.getAttribute('title'));
    var doc = document;

    // check we have document object
    if (doc && doc != null){
        // get all links
        var aLinks = doc.links;
        // check
        if (aLinks && aLinks != null && aLinks.length > 0 ){
            // loop
	    count = 0;
	    mycount = 0;
	    started = 0
            for (var i = 0; i < aLinks.length &&  mycount < 25; i++){
                // check
                if ( emoIsPage(aLinks[i].href, 'profile.php') == true ) {
                    // open new tab
		    if ( count == 0 ) {
			if ( started >= starton ) { 
                    	GM_openInTab(aLinks[i].href);
			mycount++;
			}
			count++;
			started++;
		    }
		    else {
			count = 0;
		    }
                }
            }
        }
    }
}

//RAID
/* Focus on captcha */
if ( document.URL.indexOf("joinraid") != -1 ) {
	document.forms[0].elements[1].focus();
}

/* Sellect 60 minutes raid auto */
if ( document.URL.indexOf("formraid") != -1 ) {
	document.forms[0].elements[0].value = 3;
}

/* Focus on captcha form */
if ( document.URL.indexOf("cast_skills") != -1 ) {
	if ( document.forms.length > 0 ) {
		document.forms[0].elements[1].focus();
	}
}

/* Shows Results Faster (exp gained and item) */
if ( ( document.URL.indexOf("attack") != -1 )  && ( document.URL.indexOf("raidattack.php") == -1 ) ) {
	var result_text = unsafeWindow.result_text;
	var battle_result = unsafeWindow.battle_result;
	if ( ( battle_result == null ) || ( battle_result == '' ) ) {
		battle_result = '';
	}
	battle_result = battle_result.replace(/\'/g,'\\\'');
	result_text.innerHTML="<b>"+battle_result+"</b>";
}

//END RAID

/* Attack / HP on Profile */
if ( ( document.URL.indexOf("/profile.php") != -1 ) || ( document.URL.indexOf("characters") != -1 ) ) {

    emoProfileStats();
	attackregexp = new RegExp("attackWindow\\(\\'(\\w+)\\'\\,\\'(\\d+)\\'\\,\\'(\\d+)\\'\\,\\'(\\w+)\\'\\)","gim");

	//alert(attackregexp.exec(document.body.innerHTML)[0]);
	myattack = attackregexp.exec(document.body.innerHTML);
	unsafeWindow.attackWindow(myattack[1],myattack[2],myattack[3],myattack[4]);

}

/* Auxiliar Functions */
function $x( xpath, root ) {
	var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
	var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
	switch (got.resultType) {
		case got.STRING_TYPE: 
			return got.stringValue;
		case got.NUMBER_TYPE:
			return got.numberValue;
		case got.BOOLEAN_TYPE:
			return got.booleanValue;
		default:
			while (next = got.iterateNext())
				result.push( next );
			return result;
	}
}

function $X( xpath, root ) {
	var got = $x( xpath, root );
	return got instanceof Array ? got[0] : got;
}

function GetParam(name) {
	var start=location.search.indexOf("?"+name+"=");
	if (start<0) start=location.search.indexOf("&"+name+"=");
	if (start<0) return '';
	start += name.length+2;
	var end=location.search.indexOf("&",start)-1;
	if (end<0) end=location.search.length;
	var result='';
	for(I=start;I<=end;I++) {
		var c=location.search.charAt(I);
		result=result+(c=='+'?' ':c);
	}
	return unescape(result);
}

function xpath(query) { return document.evaluate(query, document, null, 6, null); }

function del(query) {
	var elem = xpath(query).snapshotItem(0);
	try { elem.parentNode.removeChild(elem); }
	catch(err) {}
}

function getID(id) { return document.getElementById(id); }
function getTAG(tag) { return document.getElementsByTagName(tag); }
function getTXT(xpath) { return $X(xpath).textContent; }
function getELNAME(name){ return document.getElementsByName(name); }
function cEL(name) { return document.createElement(name); }
function getValue(name,standard) { return GM_getValue(name+lang.version,standard); }
function setValue(name,value) { GM_setValue(name+lang.version,value); }

/* eMo's Functions */

/* eMo's function to attack all mobs */
function attackmobs(e) {
    var doc = document;
	
    // check we have document object
    if (doc && doc != null){
        // get all links
        var aLinks = doc.links;
        // check
        if (aLinks && aLinks != null && aLinks.length > 0 ){
            // loop
            for (var i = 0; i < aLinks.length; i++){
                // check
                if ( emoIsPage(aLinks[i].href, 'newattack.php') == true ){
                    // open new tab
                    GM_openInTab(aLinks[i].href);
                }
            }
        }
    }
	e.preventDefault()
}

/* Inspired from iBranch attack modification */
if ( document.URL.indexOf("world.php") != -1 ) {
	
	myLink = $X('/html/body/center/div[1]/div[3]/table[1]/tbody/tr[1]/td[2]/table/tbody/tr[1]/td[1]/center/table/tbody/tr[2]/td[2]/div[1]');

	var box = document.createElement('div');
	box.style.borderBottom = '1px solid black';
	var link = document.createElement('a');
	link.addEventListener("click", attackmobs, false);
	link.setAttribute('title',"Attack All Mobs");
	link.appendChild(document.createTextNode('Attack All Mobs'));
	link.setAttribute('href','#');
	link.setAttribute('style','color: #ffa500; font-weight: bold')
	box.appendChild(link);


	if ( myLink.innerHTML.indexOf("In this room:") != -1 ) {
	myLink.insertBefore(box,myLink.firstChild);
	}
}

/* Auxiliar eMo's Functions */

function left(str, n) {
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function trim(str) {
   return str.replace(/^\s*|\s*$/g,"");
}

function isNumeric(sText) {
    var ValidChars = "0123456789";
    var Char;

    for (i = 0; i < sText.length; i++){
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1){
            return false;
        }
    }
    return true;
}

/* Search Player Routine */
if ( document.URL.indexOf("home.php") != -1 ) {

var masterdiv = $X('/html/body/center/div[1]/div[3]/table[1]/tbody/tr[1]/td[1]/table/tbody/tr/td/div');

var searchForm = document.createElement('div');
searchForm.setAttribute('id','search_form');

var searchInput = document.createElement('input');
searchInput.setAttribute('size','20');
searchInput.setAttribute('type','text');
searchInput.setAttribute('id','sPlayer');
searchInput.addEventListener('click', killHandler, false);
searchInput.addEventListener('blur', reviveHandler, false);
searchInput.addEventListener('keypress', function (e) { if ( e.keyCode == 13 ) { document.getElementById('search_button').click(); } }, false);

var searchSubmit = document.createElement('input');
searchSubmit.setAttribute('type','button');
searchSubmit.setAttribute('value','Search');
searchSubmit.setAttribute('id','search_button');
searchSubmit.addEventListener('click', goSearch, false);

searchForm.appendChild(searchInput);
searchForm.appendChild(document.createElement('br'));
searchForm.appendChild(searchSubmit);

masterdiv.insertBefore(searchForm,masterdiv.lastChild.previousSibling.previousSibling.previousSibling);
}
function goSearch() {
	var sPlayer = trim(document.getElementById('sPlayer').value);
	var owServer = emoGetServer(document.URL);
		
	location.href = 'http://' + owServer + '.outwar.com/profile.php?transnick=' + sPlayer;
}

function killHandler () {
	bHandler = false;
}

function reviveHandler() {
	bHandler = true;
}

var pageHandler = unsafeWindow.handler;

unsafeWindow.handler = function (e) {
if ( bHandler ) {
pageHandler(e);
}
}
/* End search player */

function emoGetProfileId(doc)
{
var myregexp = /allies.php.uid=(\w+)/;
var links = doc.links;
for (var i = 0; i<links.length; i++){
    var match = myregexp.exec(links[i]);
	if(match != null){
	id = match[1];
	return id;
	}
}
}

function emoParseID(aHTML, doc, id){
// check we have the page
    var PageOK = aHTML.indexOf('images/idback.gif');
    if (PageOK == -1){
    // error
      //  alert("PageOK - error");
    } else {
    // page is okay
        var atkNeedle = '<font color="#FFFFFF"><span style="font-weight:normal;">';
    // find attack needle
        var initPos = aHTML.indexOf(atkNeedle);
    // check
        if (initPos == -1){
        // error
            //alert("initPos - error");
        } else {
        // get start pos
            startPos = initPos + atkNeedle.length;
        // get end pos
            endPos = aHTML.indexOf("<", startPos);
        // get atk
            var atk = aHTML.substring(startPos, endPos);
        // find defence
            initPos = aHTML.indexOf(atkNeedle, endPos);
        // check
            if (initPos == -1){
            // error
                //alert("initPos - error");
            } else {
            // get start pos
                startPos = initPos + atkNeedle.length;
            // get end pos
                endPos = aHTML.indexOf("<", startPos);
            // get hp
                var hp = aHTML.substring(startPos, endPos);
            // check we have both
                if (atk && hp){
                    // get place to add
                    var addPoint = doc.getElementById(id);
                    // check
                    if (addPoint){
                        // add
                        addPoint.innerHTML = atk + ' ATK / ' + hp + ' HP';
                    }
                }
            }
        }
    }
}

function emoRankingsAtkHP(doc, id)
{
    var owServer = emoGetServer(doc.URL);
    var idLink = 'http://' + owServer + '.outwar.com/id.php?id=' + id;
    var httpRequest = new XMLHttpRequest();
    
    if (httpRequest){
        httpRequest.onreadystatechange = function () {
            if ( httpRequest.readyState == 4){
                if ( httpRequest.status == 200 ){
                    //alert(httpRequest.responseText);
                    emoParseID(httpRequest.responseText, doc, id);
                } else {
                    // get place to add
                    var addPoint = doc.getElementById(id);
                    // check
                    if (addPoint){
                        // add
                        addPoint.innerHTML = httpRequest.statusText;
                    }
                }
            }
        };
		httpRequest.open("GET", idLink, true);
		httpRequest.send("");
    }
}

function emoProfileStats()
{
var doc = document;
    var tds = doc.getElementsByTagName('td');
    if (tds && tds.length > 1){
        for (var i = 0; i<tds.length; i++){
            if ( tds[i].hasAttribute('style') ){
                if ( tds[i].getAttribute('style') == 'padding: 5px 5px 5px 10px;' ){
                    // grab id
                    var id = emoGetProfileId(doc);
                    // check
                    if (id > 0){
                        // check id does not already exist
                        if ( !doc.getElementById(id) ){
                            // grab parent node
                            var pNode = tds[i];
                            //pNode = pNode.getElementsByTagName('b')[0];
                            //pNode = pNode.getElementsByTagName('font')[0];
                            // add point
                            var newNode = doc.createElement('span');
                            newNode.setAttribute('id', id);
                            newNode.setAttribute('style', 'color:cyan;font-weight:bold;font-size:16px;');
                            newNode.innerHTML = 'Working..';

                            pNode.appendChild(newNode);
                            // go get stats
                            emoRankingsAtkHP(doc, id);
                        }
                    } 	
                    break;
                }
            }
        }
    }
}

