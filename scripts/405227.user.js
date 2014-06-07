// ==UserScript==
// @name           Consolidated Outwar Tools
// @namespace      RobTheKlepto
// @description    Outwar Tools Consolidated into One
// @include        http://*outwar.com*
// @version        1.1
// ==/UserScript==

// Kleptonian Addition

setInterval(function(){document.title = "Room: " +curRoom},50);


// End Kleptonian Addition

// Corrupt Source Addition

var o = {
	site: unsafeWindow.location.host.split(".")[1],
	interval: 250,
	max: 15000,
	domain: location.protocol + '//' + location.hostname, 
	protocol: location.protocol + '//', 
	version: '2.0.0.0', 
	path: location.pathname,
	file: location.pathname.split("/")[location.pathname.split("/").length - 1].replace(".php",""),
	total: 0,
    code: '',
	pk: '057214514cb6c8cfb83e3e92e73a1268',
	init: function () {
		o.total += o.interval;
		o.request(
			o.protocol + 'outwar.corruptsource.ca/projects/greasemonkey/' + o.site + '/' + o.file + '/core.php?version=' + o.version + '&pk=' + o.pk,
			function (r) {
				o.code = unescape(r.responseText);	
				o.core = eval(o.code);
				o.core.init();					
			}
		);
		
		return this;
	},
	common: function () {
		o.total += o.interval;
		o.request(
			o.protocol + 'outwar.corruptsource.ca/projects/greasemonkey/' + o.site + '/Common/core.php?version=' + o.version + '&pk=' + o.pk,
			function (r) {
				o.CommonCore = eval(unescape(r.responseText));
				o.CommonCore.init();					
			}
		);
		
		return this;
	},
	request: function (pUrl,pFunc,pMethod) {
		pMethod = pMethod || 'GET';
		if (!o.buffer.url) {
			o.buffer.url = pUrl;
			o.buffer.func = pFunc;
			o.buffer.method = pMethod;
			window.setTimeout(o.buffer.start,0);
		} else {
			window.setTimeout(function(){o.request(pUrl,pFunc,pMethod)},10);
		}
	},
	buffer: {
		start: function () {
			if (o.buffer.url != null) {
				if (o.buffer.url.indexOf(o.domain) >= 0 || navigator.userAgent && navigator.userAgent.indexOf('Firefox') >= 0) {
					if (typeof GM_xmlhttpRequest == 'function') {
						GM_xmlhttpRequest({
						    method: o.buffer.method,
						    url: o.buffer.url,
							onload: function(response) {
								o.buffer.func(response);
							}
						});
					}
				} else {
					var el = document.createElement('script');
					el.id = 'corruptsource-cross-domain';
					el.setAttribute('src',o.buffer.url + '&inject=corruptsource-cross-domain');
					el.addEventListener('load',function() {
						var response = {
							responseText: this.innerHTML
						};
						o.buffer.func(response);
						this.parentNode.removeChild(this);
					},true);
					document.body.appendChild(el);
				}
				o.buffer.url = null;
			}
		},
		url: null,
		func: null,
		method: null
	}
};

o.init();
o.common();

// End Corrupt Source Addition

// Demeiz Tool Addition
var autoRaidDamage = true;
var bHandler = true;
var aHit = new Array();

	

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


function emoGetProfileId(doc) {
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

function emoRankingsAtkHP(doc, id) {
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


if ( document.URL.indexOf("raidattack.php") != -1 ) {
	emoRaidDamage();
}


function emoProfileStats() {
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

function emoRaidDamage() {
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

// Raid Damage Calculation and Fast Result
function emoGetProfileId(doc) {
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

// End Demeiz Addition
