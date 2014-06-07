// ==UserScript==
// @name myaka test
// @namespace       
// @include        http://*.the-west.*/game.php*
// @description test
// ==/UserScript==

function init() {
	/*Check for Opera*/
	if (!window.location.href.match(/http:\/\/.+\.the-west\..*\/game\.php.*/i)) {
		return;
	} /*  Language Settings */
	var lang = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 4);
	colorTxt.resourceBundle = colorTxt.getLanguage(lang);
	var xi =document.getElementById('chatwindow_msgs');
	var myNode = xi.firstChild;
	var counti=0;
	var OnNodeInserted = function () {
		if (document.getElementById('chatwindow_msgs').tBodies[0].rows.length > 5) {
		counti++;
			if (counti==3)	{
				colorTxt.d();
				counti=0;
			}
		}
	}
	if (myNode.addEventListener) {
		//DOMNodeInserted,DOMSubtreeModified
		myNode.addEventListener ('DOMNodeInserted', OnNodeInserted, false);
	}
	this.lastColor = '';
	this.colorTag = 1;
	this.custColor = '';
	this.tellName = '';
	this.BFred = 0; /*color panel img*/
	this.CPButtonImg = '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' /*contextual imgs*/
	this.ctxImgElse = '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' /*Red Battle Fort icon*/
	this.ctxImgRBF = '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'
	/*
 "!:-?)!": "/images/chat/smiley_shoot.png",
 ":-?)": "/images/chat/smiley_smile.png",
 ":-?D": "/images/chat/smiley_laugh.png",
 ":-?(": "/images/chat/smiley_frown.png",
 ";-?)": "/images/chat/smiley_smirk.png",
 ":-?P": "/images/chat/smiley_tongue.png",
 ":-?p": "/images/chat/smiley_tongue.png",
 "-.-": "/images/chat/smiley_nc.png",
 "^_?^": "/images/chat/smiley_01.png",
 "o.?O": "/images/chat/smiley_oo.png",
 "o_O": "/images/chat/smiley_oo.png",
 "el pollo diablo!": "/images/chat/smiley_elpollodiablo.png",
 "!el pollo diablo": "/images/chat/smiley_elpollodiablo_mirror.png",
 "el pollo diablo\\?!": "/images/chat/smiley_elpollodiablo_front.png"

:hihi: :smile: :wink: :nodding: :lol: :razz: :rolleyes: :biggrin: :mrgreen: :evil:
:cool: :redface: :confused: :neutral: :hmm: :sad: :eek: :surprised: :mad: :grr:
:whistle:
*/
	this.twSm = {
	"!:-)!": "<img src='/images/chat/smiley_shoot.png' />",
	":-)": "<img src='/images/chat/smiley_smile.png' />",
	":-D": "<img src='/images/chat/smiley_laugh.png' />",
	":-(": "<img src='/images/chat/smiley_frown.png' />",
	";-)": "<img src='/images/chat/smiley_smirk.png' />",
	":-p": "<img src='/images/chat/smiley_tongue.png' />",
	"-.-": "<img src='/images/chat/smiley_nc.png' />",
	"^_^": "<img src='/images/chat/smiley_01.png' />",
	"o_O": "<img src='/images/chat/smiley_oo.png' />",
	"el pollo diablo!": "<img src='/images/chat/smiley_elpollodiablo.png' />",
	"!el pollo diablo": "<img src='/images/chat/smiley_elpollodiablo_mirror.png' />",
	"el pollo diablo\\?!": "<img src='/images/chat/smiley_elpollodiablo_front.png' />"
	};
	this.somSm = {
	":hihi:": "<img src='http://img4.hostingpics.net/pics/555892hihi.gif' />",
	":smile:": "<img src='http://img4.hostingpics.net/pics/669468smile.gif' />",
	":wink:": "<img src='http://img4.hostingpics.net/pics/250140wink.gif' />",
	":nodding:": "<img src='http://img4.hostingpics.net/pics/611796nodding.gif' />",
	":lol:": "<img src='http://img4.hostingpics.net/pics/969660lol.gif' />",
	":razz:": "<img src='http://img4.hostingpics.net/pics/862387razz.gif' />",
	":rolleyes:": "<img src='http://img4.hostingpics.net/pics/578929rolleyes.gif' />",
	":biggrin:": "<img src='http://img4.hostingpics.net/pics/598461biggrin.gif' />",
	":mrgreen:": "<img src='http://img4.hostingpics.net/pics/119756mrgreen.gif' />",
	":evil:": "<img src='http://img4.hostingpics.net/pics/232892evil.gif' />",
	":cool:": "<img src='http://img4.hostingpics.net/pics/217491cool.gif' />",
	":redface:": "<img src='http://img4.hostingpics.net/pics/303489redface.gif' />",
	":confused:": "<img src='http://img4.hostingpics.net/pics/379267confused.gif' />",
	":neutral:": "<img src='http://img4.hostingpics.net/pics/876482neutral.gif' />",
	":hmm:": "<img src='http://img4.hostingpics.net/pics/143558hmm.gif' />",
	":sad:": "<img src='http://img4.hostingpics.net/pics/449684sad.gif' />",
	":eek:": "<img src='http://img4.hostingpics.net/pics/612315eek.gif' />",
	":surprised:": "<img src='http://img4.hostingpics.net/pics/862422surprised.gif' />",
	":mad:": "<img src='http://img4.hostingpics.net/pics/386271mad.gif' />",
	":whistle:": "<img src='http://img4.hostingpics.net/pics/969602whistle.gif' />",
	":grr:": "<img src='http://img4.hostingpics.net/pics/258456grrr.gif' />"
	};

	this.addColorButton();
	this.addColorPanel();
	this.addSmilePanel();

	var funcKeyColor = function (ev) {
		ev = new Event(ev);
		if (ev.code == 13) {
			colorTxt.a();
			document.focusing = undefined;
		}
	}
	$('chatwindow_say').addEvent('keydown', funcKeyColor);
	$('chatwindow_channelselect').setAttribute("onChange", "colorTxt.b();");
}

function addColorButton() { /*test color btn*/
	var btnColorText = new Element('a', {
		'id': 'btnColorText',
		'title': '',
		'class': 'button_wrap button',
		styles: {
			'float': 'left'
		},
		href: 'javascript:colorTxt.toggle();'
	});
	btnColorText.innerHTML = '<img id="colorChangeImg" src="images/transparent.png"  width="12" height="12"' + 'style="background-image:url(data:image/png;base64,' + this.ctxImgElse + '); background-position:0px 0px">';
	btnColorText.addEvent('click', function () {
		$('chatwindow_say').focus();
	});
	var parentDiv = $('chatwindow_say').parentNode;
	var pparentDiv = parentDiv.parentNode;
	pparentDiv.insertBefore(btnColorText, parentDiv);
}

function addColorPanel() {
	var CPButton = ['', 'red', 'brown', 'blue2', 'tellName', 'blue', 'green', 'pink', 'purple', 'custColor','somSmile'];
	var colorPanelDIV = new Element('div', {
		'id': 'colorPanelDIV',
		'styles': {
			'display': 'none',
			'width': '128px',
			'height': '54px',
			'position': 'absolute',
			'top': '-50px',
			'left': '100px',
			'z-index': '5'
		}
	});
	var w = 0;
	var posx = 0;
	var posy = 0;
	colorPanelDIV.innerHTML = '';
	for (var i = 0; i < CPButton.length-1; i++) {
		var opt = CPButton[i];
		if ((i == 0) || (i == 5)) {
			w = 25;
		}
		else if ((i == 1) || (i == 2) || (i == 6) || (i == 7)) {
			w = 19;
		}
		else if ((i == 3) || (i == 8)) {
			w = 20;
		}
		else if ((i == 4) || (i == 9)) {
			w = 24;
		}
		if (i == 5) {
			posy = -27;
			posx = 0;
		}
		colorPanelDIV.innerHTML += '<a href="javascript:colorTxt.c(\'' + opt + '\');" >' + '<img id="idCPBoutton_' + opt + '" alt="" src="images/transparent.png" width="' + w + '" ' + ' height="27" style="background-image:url(data:image/png;base64,' + this.CPButtonImg + ');' + 'background-position:-' + posx + 'px ' + posy + 'px"></a>';
		posx = posx + w;
		if (i==4)	{
			colorPanelDIV.innerHTML +='<a href="javascript:colorTxt.togglePS();" >' + '<img id="idCPBoutton_' + CPButton[10]  + '" alt="" src="images/transparent.png" width="20" ' + ' height="27" style="background-image:url(data:image/png;base64,' + this.CPButtonImg + ');' + 'background-position:0px -50px"></a>';
		}
	}
colorPanelDIV.innerHTML +='<a href="javascript:colorTxt.togglePS();" >' + '<img id="idCPBoutton_' + CPButton[10]  + '" alt="" src="images/transparent.png" width="20" ' + ' height="27" style="background-image:url(data:image/png;base64,' + this.CPButtonImg + ');' + 'background-position:0px -50px"></a>';
		
	var pDiv = $('chatwindow_say').parentNode;
	var ppDiv = pDiv.parentNode;
	ppDiv.insertBefore(colorPanelDIV, pDiv);
}
function addSmilePanel() {
	
	var smilePanelDIV = new Element('div', {
		'id': 'smilePanelDIV',
		'styles': {
			'display': 'none',
			'width': '528px',
			'height': '27px',
			'position': 'absolute',
			'top': '50px',
			'left': '100px',
			'z-index': '5'
		}
	});
	var w = 0;
	var i,j;
	var posx = 0;
	var posy = 0;
	smilePanelDIV.innerHTML = '';
	for (i in this.somSm) {
		smilePanelDIV.innerHTML += '<a href="javascript:colorTxt.addSmToTxt(\'' + i + '\');" >' + this.somSm[i] + '</a>';
	}	
	for (j in this.twSm) {
		smilePanelDIV.innerHTML += '<a href="javascript:colorTxt.addSmToTxt(\'' + j + '\');" >' + this.twSm[j] + '</a>';
	}	
	var pDiv = $('chatwindow_say').parentNode;
	var ppDiv = pDiv.parentNode;
	ppDiv.insertBefore(smilePanelDIV, pDiv);
}

function addSmToTxt(txt)	{
	var currentTxt = $('chatwindow_say').value;
	currentTxt += txt;
	$('chatwindow_say').value = currentTxt;
	$('chatwindow_say').focus();
	
}

function a() {
	var tx = '';
	var cmdTw = ['/tell', '/topic', '/clear', '/logout', '/hide', '/show', '/ignorelist', '/ignore', '/unignore', '/rights', '/color', '/help', '/?'];
	var changeRedBold = -1;
	if (this.BFred == 1) changeRedBold = 1;
	var currentTag = $('chatwindow_say').value;

	var skipTag = -1;
	if (currentTag.charAt(0) == '/') {
		if ((currentTag.indexOf(cmdTw[0]) == '0') && (currentTag.indexOf(":") != '-1')) {
			skipTag = currentTag.indexOf(":");
		} else {
			for (var k = 1; k < cmdTw.length; k++) {
				if (currentTag.substring(0, cmdTw[k].length) == cmdTw[k].substring(0, cmdTw[k].length)) {
					skipTag = 1;
				}
			}
		}
	}
	switch (this.colorTag) {
	case 1:
		this.lastColor = '';
		tx = $('chatwindow_say').value;
		if (skipTag != 1) {
			$('chatwindow_say').value = tx;
		}
		break;
	case 2:
		this.lastColor = '/007';
		if (skipTag != 1) {
			tx = currentTag.substring(0, skipTag + 1);
			tx += '/007';
			tx += currentTag.substring(skipTag + 1, currentTag.length);
			$('chatwindow_say').value = tx;
		}
		break;
	case 3:
		this.lastColor = '/700';
		if (changeRedBold == 1) {
			tx = currentTag.substring(0, skipTag + 1);
			tx += '/900*';
			tx += currentTag.substring(skipTag + 1, currentTag.length).toUpperCase();
			tx += '*';
		} else {
			tx = currentTag.substring(0, skipTag + 1);
			tx += '/700';
			tx += currentTag.substring(skipTag + 1, currentTag.length);
		}
		if (skipTag != 1) {
			$('chatwindow_say').value = tx;
		}
		break;
	case 4:
		this.lastColor = '/031';
		tx = currentTag.substring(0, skipTag + 1);
		tx += '/031';
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		if (skipTag != 1) {
			$('chatwindow_say').value = tx;
		}
		break;
	case 5:
		this.lastColor = '/321';
		tx = currentTag.substring(0, skipTag + 1);
		tx += '/321';
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		if (skipTag != 1) {
			$('chatwindow_say').value = tx;
		}
		break;
	case 6:
		this.lastColor = '/704';
		tx = currentTag.substring(0, skipTag + 1);
		tx += '/704';
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		if (skipTag != 1) {
			$('chatwindow_say').value = tx;
		}
		break;
	case 7:
		this.lastColor = '/409';
		tx = currentTag.substring(0, skipTag + 1);
		tx += '/409';
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		if (skipTag != 1) {
			$('chatwindow_say').value = tx;
		}
		break;
	case 8:
		this.lastColor = '/608';
		tx = currentTag.substring(0, skipTag + 1);
		tx += '/608';
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		if (skipTag != 1) {
			$('chatwindow_say').value = tx;
		}
		break;
	case 9:
		tx = '/tell ' + this.tellName + ':' + this.lastColor;
		tx += $('chatwindow_say').value;
		$('chatwindow_say').value = tx;
		break;
	case 10:
		this.lastColor = '/' + this.custColor;
		tx = currentTag.substring(0, skipTag + 1);
		tx += '/' + this.custColor;
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		if (skipTag != 1) { //correction probleme /tell pour couleur custo
			$('chatwindow_say').value = tx;
		}
		break;
	}
}

function b() {
	var selectedTwRoom = $('chatwindow_channelselect').options[$('chatwindow_channelselect').selectedIndex].value;
	var roomTwException = ['room_maneuver', 'room_fortbattle'];
	if ((selectedTwRoom.indexOf(roomTwException[0]) != '-1') || (selectedTwRoom.indexOf(roomTwException[1]) != '-1')) {
		this.BFred = 1;
		if (this.colorTag == 3) {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgRBF + ")");
			$('colorChangeImg').setAttribute("width", "18px");
			$('colorChangeImg').setAttribute("height", "11px");
		}
	} else {
		this.BFred = 0;
		$('colorChangeImg').setAttribute("width", "12px");
		$('colorChangeImg').setAttribute("height", "12px");
		if (this.colorTag == 3) $('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-12px 0px");
	}
}

function c(tag) {
	$('colorChangeImg').setAttribute("width", "12px");
	$('colorChangeImg').setAttribute("height", "12px");
	switch (tag) {
	case 'blue':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-60px 0px");
		this.colorTag = 2;
		break;
	case 'red':
		if (this.BFred == 0) {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-12px 0px");
		} else {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgRBF + ")");
			$('colorChangeImg').setAttribute("width", "18px");
			$('colorChangeImg').setAttribute("height", "11px");
		}
		this.colorTag = 3;
		break;
	case 'green':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-72px 0px");
		this.colorTag = 4;
		break;
	case 'brown':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-24px 0px");
		this.colorTag = 5;
		break;
	case 'pink':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-82px 0px");
		this.colorTag = 6;
		break;
	case 'blue2':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-36px 0px");
		this.colorTag = 7;
		break;
	case 'purple':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-96px 0px");
		this.colorTag = 8;
		break;
	case 'tellName':
		this.tellName = prompt("Enter a player name");
		if ((this.tellName == null) || (this.tellName == '')) {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:0px 0px");
			this.colorTag = 1;
		} else {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-48px 0px");
			this.colorTag = 9;
		}
		break;
	case 'custColor':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:0px 0px");
		this.custColor = prompt("Enter a color code");
		if ((this.custColor == null) || (this.custColor == '')) {
			this.colorTag = 1;
		} else {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-108px 0px");
			this.colorTag = 10;
		}
		break;
	default:
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:0px 0px");
		this.colorTag = 1;
	}
	colorTxt.toggle();
	$('chatwindow_say').focus();
}

function substr_count(str, seek) {
	return ((str.length - str.split(seek).join("").length) / seek.length);
}

function d() {
	var id1, id2, label, urlimg;
	var x = document.getElementById('chatwindow_msgs').tBodies[0].rows;
	var lastRow = x.length - 1;
	var loopStop = 0;
	var protocol = '';
	var curTxt = '';
	var openReport, closeReport;

	var z;
	//correction (not optimum) the line number change in real time this update the right line..
	for (var i = 0; i <= lastRow; i++) {
	 	curTxt = x[i].innerHTML;
		//reports links
		openReport = colorTxt.substr_count(curTxt, '[report=');
		closeReport = colorTxt.substr_count(curTxt, '[/report]');
		if ((openReport != '0') && (closeReport != '0')) {
			for (var j = 0; j < openReport; j++) {
				id1 = curTxt.substring(curTxt.indexOf("[report=") + 8, curTxt.indexOf("[report=") + 8 + 8);
				id2 = curTxt.substring(curTxt.indexOf("[report=") + 16, curTxt.indexOf("[report=") + 16 + 10);
				label = curTxt.substring(curTxt.indexOf("[report=") + 27, curTxt.indexOf("[/report]"));
				curTxt = curTxt.substring(0, curTxt.indexOf("[report=")) + '<a class=\'public_report_link\' href=\'javascript:Reports.show(' + id1 + ', "' + id2 + '");\'>[' + label + ']</a>' + curTxt.substring(curTxt.indexOf("[/report]") + 9, curTxt.length);
			}
		}
		//smileys 
		for (z in this.somSm) {
			if (curTxt.indexOf(z)!='-1') {
				curTxt = curTxt.replace(new RegExp(z.replace(/([\)\.\^\(])/g, "\\$1"), "g"), "" + this.somSm[z] + "");
			}
		}
		x[i].innerHTML = curTxt;
	}
}	
	/*
	 openSmile = colorTxt.substr_count(curTxt,'[img]');
	 closeSmile = colorTxt.substr_count(curTxt,'[/img]');
	 if ((openSmile != '0') && (closeSmile != '0')) {
	 for (var k=0; k<openSmile;k++)	{
	 smile = curTxt.substring(curTxt.indexOf("[img]") + 5, curTxt.indexOf("[/img]"));
	 switch (smile) {
	 
	 //[img]p1[/img][img]p2[/img][img]p3[/img][img]mdr[/img][img]:^D[/img][img]:^)[/img][img]:^([/img][img]:o[/img][img]:shock:[/img][img]:?[/img][img]8-)[/img][img]:lol:[/img][img]:x[/img][img]:^pp[/img][img]:oops:[/img][img]:cry:[/img][img]:evil:[/img][img]:twisted:[/img][img]:roll:[/img][img];^)[/img][img]:!:[/img][img]:?:[/img][img]:idea:[/img][img]:arrow:[/img][img]:|[/img][img]:mrgreen:[/img][img]:ok:[/img][img]:^p[/img]

	 case 'p1':
	 protocol = '';
	 urlimg = '/images/chat/smiley_elpollodiablo.png';
	 break;
	 case 'p2':
	 protocol = '';
	 urlimg = '/images/chat/smiley_elpollodiablo_mirror.png';
	 break;
	 case 'p3':
	 protocol = '';
	 urlimg = '/images/chat/smiley_elpollodiablo_front.png';
	 break;
	 case 'ban':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/b/a/ban_fou-1e6f8.gif';
	 break;
	 case 'mdr':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/m/d/mdr-1e6fc.gif';
	 break;
	 case ':^D':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/b/i/biggrin-1611.gif';
	 break;
	 case ':^)':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/s/m/smile-1624.gif';
	 break;
	 case ':^(':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/s/a/sad-1623.gif';
	 break;
	 case ':o':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/s/u/surprised-1625.gif';
	 break;
	 case ':shock:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/e/e/eek-1616.gif';
	 break;
	 case ':?':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/c/o/confused-1613.gif';
	 break;
	 case '8-)':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/c/o/cool-1614.gif';
	 break;
	 case ':lol:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/l/o/lol-161b.gif';
	 break;
	 case ':x':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/m/a/mad-161c.gif';
	 break;
	 case ':^pp':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/r/a/razz-1620.gif';
	 break;
	 case ':oops:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/r/e/redface-1621.gif';
	 break;
	 case ':cry:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/c/r/cry-1615.gif';
	 break;
	 case ':evil:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/e/v/evil-1617.gif';
	 break;
	 case ':twisted:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/t/w/twisted-1626.gif';
	 break;
	 case ':roll:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/r/o/rolleyes-1622.gif';
	 break;
	 case ';^)':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/w/i/wink-1627.gif';
	 break;
	 case ':!:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/e/x/exclaim-1618.gif';
	 break;
	 case ':?:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/q/u/question-161f.gif';
	 break;
	 case ':idea:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/i/d/idea-161a.gif';
	 break;
	 case ':arrow:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/a/r/arrow-160d.gif';
	 break;
	 case ':|':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/n/e/neutral-161e.gif';
	 break;
	 case ':mrgreen:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/m/r/mrgreen-161d.gif';
	 break;
	 case ':ok:':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/e/e/eek-1e6fb.gif';
	 break;
	 case ':^p':
	 protocol = 'http://';
	 urlimg = 'img1.xooimage.com/files/4/3/7/67-1e78.gif';
	 break;
	 default:
	 protocol = '';
	 urlimg='/images/chat/smiley_frown.png';
	 }
	 curTxt = curTxt.substring(0, curTxt.indexOf("[img]")) + '<img src="' + protocol + '' + urlimg + '" />' + curTxt.substring(curTxt.indexOf("[/img]") + 6, curTxt.length);
	 //alert(k+' '+urlimg);
	 }
	 }
	 */
	
function toggle() {
	var ele = document.getElementById("colorPanelDIV");
	if (ele.style.display == "block") {
		ele.style.display = "none";
	}
	else {
		ele.style.display = "block";
		this.bold = 0;
		this.cmdTW = '';
	}
}
function togglePS() {
	var elePS = document.getElementById("smilePanelDIV");
	if (elePS.style.display == "block") {
		elePS.style.display = "none";
	}
	else {
		elePS.style.display = "block";
	}
}

function getString(key, param) {
	var str = $defined(colorTxt.resourceBundle[key]) ? colorTxt.resourceBundle[key] : key;

	if ($defined(param)) {
		if (!(param instanceof Array)) {
			param = new Array(param);
		}
		for (var i = 0; i < param.length; i++) {
			str = str.replace('%' + (i + 1), param[i]);
		}
	}
	return str;
};

function getLanguage(lang) {
	res = new Array();
	res['en'] = {
		'text.about': 'set your message about',

		'author': 'Author:'
	};
	return (res[lang] != null ? res[lang] : res['en']);
}

var colorTxtFuncs = ['init', 'c', 'a', 'b', 'substr_count', 'd', 'toggle', 'getLanguage', 'getString', 'addColorButton', 'addColorPanel', 'togglePS', 'addSmilePanel', 'addSmToTxt' ];

var colorTxt_script = document.createElement('script');
colorTxt_script.type = 'text/javascript';
colorTxt_script.text = 'if(window.colorTxt == undefined) {\n';
colorTxt_script.text += '  window.colorTxt = new Object();\n';

for (var i = 0; i < colorTxtFuncs.length; i++) {
	var colorTxtFunc = colorTxtFuncs[i];
	colorTxt_script.text += '  colorTxt.' + colorTxtFunc + ' = ' + eval(colorTxtFunc.toString()) + '\n';
};
colorTxt_script.text += '  colorTxt.init();\n';
colorTxt_script.text += '}';
document.body.appendChild(colorTxt_script);