// ==UserScript==
// @name           OnionPlurk-emoIDWSnKaSKUS
// @namespace      neofreko.com -- Z_Y
// @include        http://www.plurk.com/*
// @include        http://www.plurk.com/user/*
// @include        http://www.plurk.com/p/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js
// ==/UserScript==


/*
http://alexking.org/blog/2003/06/02/inserting-at-the-cursor-using-javascript
*/
function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA/NETSCAPE support
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos)
        + myValue
        + myField.value.substring(endPos, myField.value.length);
		myField.focus();
    } else {
        myField.value += myValue;
    }
}

var putOnionFunc = function() {
    GM_log('put me onion!' + this.src);
	
    var plurkTextBox = document.getElementById("input_small");
    if (plurkTextBox == null || plurkTextBox.offsetParent == null) {
        plurkTextBox = document.getElementById("input_big");
    }
	if (plurkTextBox == null) {
		plurkTextBox = document.getElementById("input_permalink");
	}
    //var plurkTextBox = document.evaluate('//*[@id="input_big"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    //insertAtCursor(plurkTextBox.snapshotItem(0), this.src);
	insertAtCursor(plurkTextBox, ' ' + this.src + ' ');
}

var goOnion = function () {
	$("<div id='example' class='flora'></div>").appendTo("body");
    GM_log('looking up emoButtonPlaceHolder');
    // create own table, insert button after the original smilies
    // var emoButtonPlaceHolder = document.evaluate('/html/body/div[3]/div/form/div[2]/table/tbody/tr/td[3]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var emoButtonPlaceHolder = $(".smily_holder");
    
    if (emoButtonPlaceHolder.snapshotLength == null) {
        GM_log('No onion for you since I can;t foudn the placeholder');
    }
	
	$("#example").append($("<ul><li><a href='#fragment-1'><span>Onion</span></a></li><li><a href='#fragment-2'><span>Animated</span></a></li><li><a href='#fragment-3'><span>3D</span></a></li><li><a href='#fragment-4'><span>TV Baby</span></a></li><li><a href='#fragment-5'><span>Bubble Bear</span></a></li><li><a href='#fragment-6'><span>OnionIDWS-KAskuS</span></a></li><li><a href='#fragment-7'><span>TuzKI</span></a></li><li><a href='#fragment-8'><span>MOnYet</span></a></li></ul>"));
	
	
	$("<div id='fragment-1'></div>").appendTo($("#example"));
	
    var onionSmileys = [];
    var i = 0;
    for (i = 1; i <= 132; i++) {
        var tmp = '' + i;
        while (tmp.length < 3) {
            tmp = '0' + tmp;
        }
        tmp += '.gif';
        onionSmileys.push(tmp);
    }
       
    GM_log('create smiley table');
    i = 0;
    while(i < onionSmileys.length) {
        img = document.createElement('img');
        img.setAttribute('src', 'http://jiayun.org/onion/' + onionSmileys[i]);
        img.style.width = '40px';
        img.style.padding = '2px';
        img.addEventListener("click", putOnionFunc, false);
		$("#fragment-1").append(img);
        i++;
    }
    
	$("<div id='fragment-2'></div>").appendTo($("#example"));
	
    var onionSmileys = [];
    var i = 0;
    for (i = 1; i <= 87; i++) {
        var tmp = '' + i;
        while (tmp.length < 3) {
            tmp = '0' + tmp;
        }
        tmp += '.gif';
        onionSmileys.push(tmp);
    }
       
    GM_log('create smiley table');
    i = 0;
    while(i < onionSmileys.length) {
        img = document.createElement('img');
        img.setAttribute('src', 'http://jiayun.org/imgs/animated/' + onionSmileys[i]);
        img.style.width = '40px';
        img.style.padding = '2px';
        img.addEventListener("click", putOnionFunc, false);
		$("#fragment-2").append(img);
        i++;
    }
	
	$("<div id='fragment-3'></div>").appendTo($("#example"));
	
    var onionSmileys = [];
    var i = 0;
    for (i = 1; i <= 20; i++) {
        var tmp = '' + i;
        while (tmp.length < 3) {
            tmp = '0' + tmp;
        }
        tmp += '.gif';
        onionSmileys.push(tmp);
    }
       
    GM_log('create smiley table');
    i = 0;
    while(i < onionSmileys.length) {
        img = document.createElement('img');
        img.setAttribute('src', 'http://jiayun.org/imgs/3d/' + onionSmileys[i]);
        img.style.width = '40px';
        img.style.padding = '2px';
        img.addEventListener("click", putOnionFunc, false);
		$("#fragment-3").append(img);
        i++;
    }
	
	$("<div id='fragment-4'></div>").appendTo($("#example"));
	
    var onionSmileys = [];
    var i = 0;
    for (i = 1; i <= 74; i++) {
        var tmp = '' + i;
        tmp += '.gif';
        onionSmileys.push(tmp);
    }
       
    GM_log('create smiley table');
    i = 0;
    while(i < onionSmileys.length) {
        img = document.createElement('img');
        img.setAttribute('src', 'http://jiayun.org/imgs/tvbaby/' + onionSmileys[i]);
        img.style.width = '40px';
        img.style.padding = '2px';
        img.addEventListener("click", putOnionFunc, false);
		$("#fragment-4").append(img);
        i++;
    }
	
	$("<div id='fragment-5'></div>").appendTo($("#example"));
	
    var onionSmileys = [];
    
	var i = 0;
    for (i = 1; i <= 137; i++) {
        var tmp = '' + i;
        while (tmp.length < 3) {
            tmp = '0' + tmp;
        }
        tmp += '.gif';
        onionSmileys.push(tmp);
    }
    
    GM_log('create smiley table');
    i = 0;
    while(i < onionSmileys.length) {
        img = document.createElement('img');
        img.setAttribute('src', 'http://jiayun.org/imgs/qpx/' + onionSmileys[i]);
        img.style.width = '65px';
        img.style.padding = '2px';
        img.addEventListener("click", putOnionFunc, false);
		$("#fragment-5").append(img);
        i++;
    }
	
///////////////////////////////////////////////////modifan///////////////////////////////////////////
	
	$("<div id='fragment-6'></div>").appendTo($("#example"));
	
    var onionSmileys = [];
    
	var i = 0;
    for (i = 1; i <= 127; i++) {
        var tmp = '' + i;
        while (tmp.length < 3) {
            tmp = '0' + tmp;
        }
        tmp += '.gif';
        onionSmileys.push(tmp);
    }
    
    GM_log('create smiley table');
    i = 0;
    while(i < onionSmileys.length) {
        img = document.createElement('img');
        img.setAttribute('src', 'http://i818.photobucket.com/albums/zz106/sijampang/dodol/' + onionSmileys[i]);
        img.style.width = '55px';
        img.style.padding = '2px';
        img.addEventListener("click", putOnionFunc, false);
		$("#fragment-6").append(img);
        i++;
    }
	
	$("<div id='fragment-7'></div>").appendTo($("#example"));
	
    var onionSmileys = [];
    //http://www.freesmileys.org/emoticons/tuzki-bunnys/tuzki-bunny-emoticon-001.gif
	var i = 0;
    for (i = 1; i <= 52; i++) {
        var tmp = '' + i;
        while (tmp.length < 3) {
            tmp = '0' +tmp ;
        }
        tmp = 'tuzki-bunny-emoticon-' + tmp + '.gif';
        onionSmileys.push(tmp);
    }
    
    GM_log('create smiley table');
    i = 0;
    while(i < onionSmileys.length) {
        img = document.createElement('img');
        img.setAttribute('src', 'http://www.freesmileys.org/emoticons/tuzki-bunnys/' + onionSmileys[i]);
        img.style.width = '55px';
        img.style.padding = '2px';
        img.addEventListener("click", putOnionFunc, false);
		$("#fragment-7").append(img);
        i++;
    }
	
	$("<div id='fragment-8'></div>").appendTo($("#example"));
	
    var onionSmileys = [];
    //http://www.addemoticons.com/emoticon/monkey/AddEmoticons126.1.gif
	var i = 0;
    for (i = 1; i <= 164; i++) {
        var tmp = '' + i;
        //while (tmp.length < 3) {
        //    tmp = '0' +tmp ;
        //}
        tmp = 'AddEmoticons126' + tmp + '.gif';
        onionSmileys.push(tmp);
    }
    
    GM_log('create smiley table');
    i = 0;
    while(i < onionSmileys.length) {
        img = document.createElement('img');
        img.setAttribute('src', 'http://www.addemoticons.com/emoticon/monkey/' + onionSmileys[i]);
        img.style.width = '55px';
        img.style.padding = '2px';
        img.addEventListener("click", putOnionFunc, false);
		$("#fragment-8").append(img);
        i++;
    }
/////////////////////////////////////////////batas////////////////////////////////////////	

	$("#example > ul").tabs();
	var dialog = $("#example").dialog();
    
    GM_log('creating onion button');
	var onionButton = $('<img />');
	onionButton.attr('class', 'emoticon_selecter_img');
	onionButton.attr('src', 'http://i818.photobucket.com/albums/zz106/sijampang/dodol/025.gif');
	
    GM_log('attaching onclick event');
    // attach on-click handler
    onionButtonOnClick = function() {
		if (dialog.data('dialog').isOpen) {
			dialog.dialog("close");
		} else {
			dialog.dialog("open");
		}
    }
    // onionButton.addEventListener("click", onionButtonOnClick, false);
	onionButton.click(onionButtonOnClick);
	
    GM_log('append the button');
    // put button on place
	emoButtonPlaceHolder.append(onionButton);
}

// add menu item to mnually enable onionButton
GM_registerMenuCommand('I can haz Onion please?', goOnion);

$('<link rel="stylesheet" href="http://jiayun.org/themes/flora/flora.all.css" type="text/css" media="screen">').appendTo("head");

$(document).ready(function(){
	GM_log(document.defaultView.frameElement);
	if (document.defaultView.frameElement == null) {
		goOnion();
	}
});
