// ==UserScript==
// @name           Outwar Helper
// @namespace      Reality Tools
// @version	   1.1.5
// @date	   18-03-2009
// @description    Helper for Outwar
// @include        http://bloodlinesrpg.com/*
// ==/UserScript==

var autoRaidDamage = true;
var bHandler = true;


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

if ( document.URL.indexOf("raidattack.php") != -1 ) {
emoRaidDamage();
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

/* Attack / HP on Profile */

if ( document.URL.indexOf("profile.php") != -1 ) {
emoProfileStats();
}

/* Attack / HP on Profile */

if ( document.URL.indexOf("characters") != -1 ) {
emoProfileStats();
}

/* Inspired from iBranch attack modification */
if ( document.URL.indexOf("world.php") != -1 ) {

	//Create div that will contain the Attack All Mobs Link, and the Attack All Mobs Link
	var box = document.createElement('div');
	var link = document.createElement('a');
	link.addEventListener("click", attackmobs, false);
	link.setAttribute('title',"Attack All Mobs");
	link.appendChild(document.createTextNode('Attack All Mobs'));
	link.setAttribute('href','#');
	// Make it pretty
	link.setAttribute('style','color: #ffa500; font-weight: bold')

	//Insert it after the Mobs in room div:
	box.appendChild(link);

	/*
	 * 8th table holds all room details
	 * 1st row holds the info we want ( 0th row is the one with the title of the room that is -> room name and Room Details
	 * 64th column is the one that holds the mobs and players in the room
	 * 0th div holds all data and is the main div, 1st div holds the In this room text, we want to insert before the 2nd div
	 *
	 * If the In this room: text appears and is not in the right place then Outwar changed the structure of the page
	 */

	var room = document.getElementsByTagName('table')[8].getElementsByTagName('tr')[1].getElementsByTagName('td')[66];
	if ( room.innerHTML.indexOf("In this room") != -1 ) {
		var maindiv = room.getElementsByTagName('div');
		maindiv[0].insertBefore(box,maindiv[2]);

	}
	else {
		if ( document.body.innerHTML.indexOf("In this room") != -1 ) {
			alert("Page changed?! Contact developer or download most updated version.");
		}
	}
}

/* Search Player Routine */

var masterdiv = document.getElementById('masterdiv');

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

masterdiv.insertBefore(searchForm,masterdiv.childNodes[54]);

function goSearch() {
	var sPlayer = trim(document.getElementById('sPlayer').value);
	var owServer = emoGetServer(document.URL);
		
	location.href = 'http://bloodlinesrpg.com/profile.php?transnick=' + sPlayer;
}

function killHandler () {
	bHandler = false;
}

function reviveHandler() {
	bHandler = true;
}

var oHandler = unsafeWindow.handler;


function myHandler (e) {
	if ( ( bHandler ) && ( oHandler != null ) ) {
		oHandler(e);
	}
}

unsafeWindow.onkeypress = myHandler;



/* eMo's Functions */

// Raid Damage Calculation and Fast Result

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
    var idLink = 'http://bloodlinesrpg.com/id.php?id=' + id;
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

function emoRaidDamage()
{

var doc = document;

// zero damage
    var damage = 0;
    var newDamage = 0;
    // last message id
    var firstSpan = null;
    var lastSpan = null;
    
    if (doc){
        // get span elements
        var spans = doc.getElementsByTagName('span');
        // check
        if (spans && spans.length > 0){
            // loop through all spans
            var firstwithout = -1;
            for (var i = 0; i < spans.length; i++){
                // check for id attribute
                if ( spans[i].hasAttribute('id') ){
                    // check id
                    if ( left(spans[i].getAttribute('id'), 8) == 'message_' ){
                        // show
                        spans[i].setAttribute('style', 'visibility: visible');
                        
                        // raid damage...
                        if (autoRaidDamage == true){
                            // save raid damage span
                            if ( spans[i].parentNode.hasAttribute('rowspan') && spans[i].parentNode.hasAttribute('align') ){
                                // first one
                                if (firstSpan == null){
                                    firstSpan = spans[i];
                                }
                                // last one
                                lastSpan = spans[i];
                            }
                            // get b tag
                            var b = spans[i].getElementsByTagName('b');
                            // first span w/o bold
                            
                            // check
                            if (b && b.length == 1){
                                // get font tags
                                var fonts = b[0].getElementsByTagName('font');
                                // check
                                if (fonts && fonts.length >= 1){
                                    newDamage = trim(fonts[fonts.length-1].innerHTML);
				    newDamage = newDamage.replace(/,/g, "");
                                    if (isNumeric(newDamage) == true){
                                        damage += parseInt(newDamage);
                                    }
                                }
                            }
                            else if(firstwithout == -1){
                               firstwithout = spans[i+1]; 
                               
                            }
                        }
                    }
                }
            }
            // check for damage
            if (autoRaidDamage == true && damage > 0 && lastSpan != null && firstSpan != null){
		// damage = damage.replace(/(?<=[0-9])(?=(?:[0-9]{3})+(?![0-9]))/g, ",");
                var newImage = doc.createElement('img');
                var newTable = doc.createElement('table');
                var newTr = doc.createElement('tr');
                var newTd = doc.createElement('td');
                var newLink = doc.createElement('a');
                // image
                newImage.setAttribute('src', 'images/spacer.gif');
                newImage.setAttribute('height', '20');
                newImage.setAttribute('width', '1');
                lastSpan.parentNode.appendChild(newImage);
                // td
                newTd.innerHTML = '<b>Total Damage Dealt: ' + damage + '</b>';
                newTd.setAttribute('style', 'padding-left:10px;color:red;border:solid 2px black;');
                // tr
                newTr.appendChild(newTd);
                // table
                newTable.setAttribute('style', 'background-color:white;');
                newTable.setAttribute('width', '263');
                newTable.setAttribute('height', '30');
                newTable.appendChild(newTr);
                // link
                newLink.setAttribute('href', '#top');
                newLink.innerHTML = 'Back to Top';
                // attach to bottom
                lastSpan.parentNode.appendChild(newTable);
                lastSpan.parentNode.appendChild(newImage.cloneNode(true));
                lastSpan.parentNode.appendChild(newLink);
                // attach to top
                firstSpan.parentNode.insertBefore(newTable.cloneNode(true), firstSpan);
                firstSpan.parentNode.insertBefore(newImage.cloneNode(true), firstSpan);
                // move second column down.
                var sTable = doc.createElement('table');
                var sTr = doc.createElement('tr');
                var sTd = doc.createElement('td');
                
                sTd.innerHtml = '&nbsp;';
                sTd.setAttribute('style', 'border:0px;');
                sTr.appendChild(sTd);
                sTable.setAttribute('style','border:0px;');
                sTable.setAttribute('height', '30');
                sTable.appendChild(sTr);
                firstwithout.parentNode.insertBefore(sTable.cloneNode(true), firstwithout);
                firstwithout.parentNode.insertBefore(newImage.cloneNode(true), firstwithout);
                
            }
        }
    }
}

/* eMo's function to attack all mobs */
function attackmobs() {
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
}


/* Auxiliar eMo's Functions */

function left(str, n)
{
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function trim(str)
{
   return str.replace(/^\s*|\s*$/g,"");
}

function isNumeric(sText)
{
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

function emoIsPage(vURL, vPage) {
    var regex = new RegExp("^http://\.bloodlinesrpg\.com/(" + vPage + ")");
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

function emoGetServer(vURL)
{
    var regex = new RegExp("^http://www)\.bloodlinesrpg\.com/");
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