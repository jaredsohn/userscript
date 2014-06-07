/*
Вест на весь экран
Иконки зданий города
Дополнительные пункты меню
Best Items by PK & S Лучшие_вещи - ver3
The West - Center Jobs
Скрипт Мотивация
The-west Market Helper 1.2.8.4
The West - Quest Helper
The West - ColorMe ver. 1.9
*/

//============

// ==UserScript==
// @name           tw_my
// @namespace      www.the-west.ru
// @description    West: Артур, ПоросячийКот; Александр, Сторан
// @description    Вест на весь экран, Иконки зданий города, Дополнительные пункты меню, Покупки на рынке, Лучшие_вещи - ver3
// @include        http://*.the-west.*
// @include        http://*.beta.the-west.*
// @include        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*     
// ==/UserScript==


// для Mozilla
aWindow = (unsafeWindow) ? unsafeWindow : window;
// +++++

// для Opera
//aWindow = window;
// +++++

//-------------------- The West - Quest Helper - [Multilingual] ver. 2.0.0.1 -------------------

var labor_points_text={
                 en:'Labor points',
		 br:'Pontos de Trabalho', /*CWalter*/
		 pt:'Pontos de Trabalho', /*CWalter*/
		 cz:'PracovnГ­ body',
		 sk:'PracovnГ© body',
		 pl:'Punkty Pracy',
		 hu:'Munkapont',
		 se:'ArbetspoГ¤ng',
		 de:'Arbeits Punkte',
		 nl:'Arbeidspunten',
		 ru:'Трудовые очки'
};
var difficulty_text={
                 en:'Difficulty',
		 br:'Dificuldade', /*CWalter*/
		 pt:'Dificuldade', /*CWalter*/
		 cz:'ObtГ­Еѕnost',
		 sk:'ObtiaЕѕnosЕҐ',
		 pl:'TrudnoЕ›Д‡',
		 hu:'NehГ©zsГ©g',
		 se:'SvГҐrighet',
		 de:'Schwerigkeit',
		 nl:'Moeilijkheid',
		 ru:'Требования'
};

var gCount=0;
var gLang='en';


function getJobId(text){
  foundId = -1;
  foundL  = 0;
  for (id in unsafeWindow.JobList) {
    aJob = unsafeWindow.JobList[id]; 
    if (foundL < aJob.name.length && aJob.name==text.substring(0,aJob.name.length)) {
      foundId = id;
      foundL  = aJob.name.length;
    }

    for (t=0;t<aJob.yields.length;t++)
      if (aJob.yields[t]!==null && aJob.yields[t].name.length > foundL && aJob.yields[t].name == text.substring(0,aJob.yields[t].name.length)) {
        foundId = id;
        foundL  = aJob.yields[t].name.length;
      }
  }
  return foundId;
}

function findTopPos(obj){
  var top = 0;
  if (obj.offsetParent)
    top += findTopPos(obj.offsetParent);
  top += obj.offsetTop;
  return top;
}

function escapeText(text) {
  return text.replace("'","\\'");
}

function searchForQuestRequirements() {
  if (window.document.getElementById('questFoot')){
    var qReqsTags = unsafeWindow.document.getElementsByTagName('DIV');
    try {
      for (i in qReqsTags) {
        if (qReqsTags[i].id=='questRequirements') {
          if (qReqsTags[i].previousSibling!==null && qReqsTags[i].previousSibling.tagName=='SCRIPT')
            continue;
          req=qReqsTags[i].firstChild;
          while(req.nextSibling && req.nextSibling.tagName=='DIV'){
            req=req.nextSibling;
            job_id=getJobId(req.innerHTML);
            
            if (job_id == -1) {
              req=req.nextSibling;
              continue;
            }
            
            var selectedJob=unsafeWindow.JobList[job_id];
            if (job_id!=-1) {
              req.style.cursor="pointer";
              req.setAttribute("job_id", job_id);
              req.addEventListener('click',
                function(){
                  var job_id = this.getAttribute("job_id");
                  var mj = document.getElementById('minimap_job_id');
                  var options = mj.options;for (i in options){
                    if (options[i].value==job_id) {
                      mj.selectedIndex=i;
                      var minimap = document.getElementById('minimap_container');                      
                      var icon = document.getElementById('footer_minimap_icon');                      
                      if (!minimap.style.display)
                        unsafeWindow.WMinimap.update();
                      else
                        unsafeWindow.WMinimap.toggle(arguments[0] || unsafeWindow.event);
                      minimap.style.top=(findTopPos(icon)-minimap.offsetHeight)+'px';
                      break;
                    }
                  }
                },false);
            }
            var jobImg='<div style="padding: 2px;"<img src="images/jobs/mini/'+selectedJob.shortName+'.png" alt=""></div>';
            var jobName='<div style="font-weight: bold;">'+escapeText(selectedJob.name)+'</div>';
            var jobPoints=(selectedJob.calcJobPoints(unsafeWindow.Character.bonus_skills)+unsafeWindow.WearSet.getWorkPointAddition(job_id)-selectedJob.malus)-1;
            var jobMalus=selectedJob.malus+1;
            var playerJobInfo='<div style="padding: 1px; font-size: 10px;">'+labor_points_text[gLang]+': %1'.replace('%1','<strong'+(jobPoints<=0?' style="color:#A00"':'')+'>'+jobPoints+'</strong>')+'<br />'+difficulty_text[gLang]+': %1'.replace('%1','<strong>'+jobMalus+'</strong>')+'</div>';
            var jobYields='<div>';
            for (t=0;t<selectedJob.yields.length;t++) {
              if (selectedJob.yields[t]!==null){
                jobYields+='<div class="popup_yield">';
                jobYields+='<div class="popup_yield_divider"></div>';
                jobYields+='<div class="popup_yield_image"><img src="images/items/yield/mini/'+selectedJob.yields[t].short+'.png" /></div>';
                jobYields+=escapeText(selectedJob.yields[t].name);
               jobYields+='</div>';
             }
            }
            jobYields+='</div>';
       
            var jobPopup='<div style="text-align:center">'+jobImg+'<div class="popup_yield_divider"></div><div style="padding: 4px; text-align: center;">'+jobName+playerJobInfo+'<div style="font-size: 9px;">'+jobYields+'</div></div></div>';
            var popupScript="ar = new Array();ar.opacity=0.9;newPopup=new MousePopup('"+jobPopup+"',250,ar);$('customPopupId_"+gCount+"').addMousePopup(newPopup);";
            req.setAttribute("id","customPopupId_"+gCount);
            gCount++;
            var insertBeforeElement = qReqsTags[i];
            var newScriptElement = document.createElement('script');
            newScriptElement.setAttribute('type', 'text/javascript');
            newScriptElement.innerHTML = popupScript;
            insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
            req=req.nextSibling;
          }
        }
      }
    } catch(e) {}
  }
  setTimeout(function(){searchForQuestRequirements()},1000);
}

lang = window.location.href.substring(window.location.href.indexOf("//")+2,window.location.href.indexOf("//")+4);
if (labor_points_text[lang]) gLang=lang;
setTimeout(function(){searchForQuestRequirements()},1000);
//-------------------- The West - Quest Helper - [Multilingual] ver. 2.0.0.1 -------------------


//----------------------- The West - ColorMe ver. 1.9 -----------------------
var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {
	(function(fonctionGZA){
		var documentGZA=document,scriptGZA=documentGZA.createElement("script");
		scriptGZA.type = "application/javascript";
		scriptGZA.textContent = "("+fonctionGZA.toString()+")()";
		(documentGZA.body||documentGZA.head||documentGZA.documentElement).appendChild(scriptGZA);
		scriptGZA.parentNode.removeChild(scriptGZA)
	})(function(){
//-----------------------/\
	var VERSION 			= "1.9" ;
	var NUMERO_SCRIPT		= "115675" ;
//-----------------------\/

function init(v) {
	/*Check for Opera*/
	if (!window.location.href.match(/http:\/\/.+\.the-west\..*\/game\.php.*/i)) {
		return;
	} /*  Language Settings */
	var lang = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 4);
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
	};
	if (myNode.addEventListener) {
		myNode.addEventListener ('DOMNodeInserted', OnNodeInserted, false);
	}
	this.myVersion = v;
	this.lastTag='';
	this.lastColor = '';
	this.colorTag = 1;
	this.custColor = '';
	this.tellName = '';
	this.BFred = 0; /*color panel img*/
	this.CPButtonImg ='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' /*contextual imgs*/
	this.ctxImgElse = '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' /*Red Battle Fort icon*/
	this.ctxImgRBF = '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'
	this.imgNothing = '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'
	this.imgSomSm = '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'
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

	this.twTag ={
	"[player][/player]": "<img src='images/transparent.png' style='background-image:url(../images/bbcodes.png);background-position: -80px;height:20px;width:20px;margin:6px 1px;'>"/*,
	"[town][/town]": "<img src='images/transparent.png' style='background-image:url(../images/bbcodes.png);background-position: -100px;height:20px;width:20px;margin:6px 1px;'>",
	"[fort][/fort]": "<img src='images/transparent.png' style='background-image:url(../images/bbcodes.png);background-position: -120px;height:20px;width:20px;margin:6px 1px;'>"*/
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
		$('chatwindow_say').focus();	});
	var parentDiv = $('chatwindow_say').parentNode;
	var pparentDiv = parentDiv.parentNode;
	pparentDiv.insertBefore(btnColorText, parentDiv);
}
function e() {
	
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
			'top': '-59px',
			'left': '124px',
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
			colorPanelDIV.innerHTML +='<a href="javascript:colorTxt.c(\'somSmile\');" >' + '<img id="idCPBoutton_somSmile" alt="" src="images/transparent.png" width="20" ' + ' height="27" style="background-image:url(data:image/png;base64,' + this.imgSomSm + ');' + 'background-position:0px -27px"></a>';
		}
	}
colorPanelDIV.innerHTML +='<a href="javascript:colorTxt.c(\'nothing\');" >' + '<img id="idCPBoutton_nothing" alt="" src="images/transparent.png" width="20" ' + ' height="27" style="background-image:url(data:image/png;base64,' + this.imgNothing + ');' + 'background-position:0px 0px"></a>';
		
	var pDiv = $('chatwindow_say').parentNode;
	var ppDiv = pDiv.parentNode;
	ppDiv.insertBefore(colorPanelDIV, pDiv);
}

function addSmilePanel() {
	
	var smilePanelDIV = new Element('div', {
		'id': 'smilePanelDIV',
		'styles': {
			'display': 'none',
			'width': '120px',
			'height': '100px',
			'position': 'absolute',
			'top': '260px',
			'left': '10px',
			'z-index': '5'
		}
	});
	var i,j,k;
	smilePanelDIV.innerHTML = '';

	for (i in this.somSm) {
		smilePanelDIV.innerHTML += '<a href="javascript:colorTxt.addSmToTxt(\'' + i + '\');" >' + this.somSm[i] + '</a>';
	}	
	for (j in this.twSm) {
		smilePanelDIV.innerHTML += '<a href="javascript:colorTxt.addSmToTxt(\'' + j + '\');" >' + this.twSm[j] + '</a>';
	}	
	for (k in this.twTag ) {
		smilePanelDIV.innerHTML += '<a href="javascript:colorTxt.addSmToTxt(\'' + k + '\');" >' + this.twTag[k] + '</a>';
	}
	var refNode = $('abdorment_left');
	refNode.parentNode.insertBefore(smilePanelDIV, refNode.nextSibling);
}

function addSmToTxt(txt)	{
	var currentTxt = $('chatwindow_say').value;
	currentTxt += txt;
	$('chatwindow_say').value = currentTxt;
	$('chatwindow_say').focus();
}

function a(c) {
	var tx = '';
	var cmdTw = ['/tell', '/topic', '/clear', '/logout', '/hide', '/show', '/ignorelist', '/ignore', '/unignore', '/rights', '/color', '/help', '/?'];
	var tabColor = ['/900*', '', '/007', '/700', '/031', '/321', '/704', '/409', '/608', '/tell'];
	var changeRedBold = -1;
	if (this.BFred == 1) {
		changeRedBold = 1;
	}
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
	if (this.colorTag != 9)
		if (this.colorTag != 10)
			this.lastColor = tabColor[this.colorTag];

	switch (this.colorTag) {
	case 1:
		tx = $('chatwindow_say').value;
		break;
	case 2:
		if (skipTag != 1) {
			tx = currentTag.substring(0, skipTag + 1);
			tx += tabColor[2];
			tx += currentTag.substring(skipTag + 1, currentTag.length);
		}
		break;
	case 3:
		if (changeRedBold == 1) {
			tx = currentTag.substring(0, skipTag + 1);
			tx += tabColor[0];
			tx += currentTag.substring(skipTag + 1, currentTag.length).toUpperCase();
			tx += '*';
		} else {
			tx = currentTag.substring(0, skipTag + 1);
			tx += tabColor[3];
			tx += currentTag.substring(skipTag + 1, currentTag.length);
		}
		break;
	case 4:
		tx = currentTag.substring(0, skipTag + 1);
		tx += tabColor[4];
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	case 5:
		tx = currentTag.substring(0, skipTag + 1);
		tx += tabColor[5];
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	case 6:
		tx = currentTag.substring(0, skipTag + 1);
		tx += tabColor[6];
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	case 7:
		tx = currentTag.substring(0, skipTag + 1);
		tx += tabColor[7];
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	case 8:
		tx = currentTag.substring(0, skipTag + 1);
		tx += tabColor[8];
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	case 9:
		tx = tabColor[9]+' ' + this.tellName + ':' + this.lastColor;
		tx += $('chatwindow_say').value;
		break;
	case 10:
		this.lastColor = this.custColor;
		tx = currentTag.substring(0, skipTag + 1);
		tx += this.custColor;
		tx += currentTag.substring(skipTag + 1, currentTag.length);
		break;
	}
	if (skipTag != 1) {
			$('chatwindow_say').value = tx;
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

function c(tag, from) {
	$('colorChangeImg').setAttribute("width", "12px");
	$('colorChangeImg').setAttribute("height", "12px");
	$('btnColorText').setAttribute("href", "javascript:colorTxt.toggle();");
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
		this.tellName = prompt("* Шепнуть *\n\nВведите имя игрока:");
		if ((this.tellName == null) || (this.tellName == '')) {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:0px 0px");
			this.colorTag = 1;
		} else {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-48px 0px");
			this.colorTag = 9;
			$('btnColorText').setAttribute("href", "javascript:colorTxt.c('"+this.lastTag+"','tell');");
		}
		break;
	case 'custColor':
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:0px 0px");
		if(from == 'tell') {
			this.custColor=this.lastColor;
		} else {
			this.custColor ='/'+ prompt("* Пользовательский цвет (000-999) *\n\nВведите цветовой код:");
		}
		if ((this.custColor == null) || (this.custColor == '')) {
			this.colorTag = 1;
		} else {
			$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:-108px 0px");
			this.colorTag = 10;
		}
		break;
	case 'nothing':
		break;
	case 'somSmile':
		colorTxt.togglePS();
		break;
	default:
		$('colorChangeImg').setAttribute("style", "background-image:url(data:image/png;base64," + this.ctxImgElse + ");background-position:0px 0px");
		this.colorTag = 1;
	}
	if ((tag != 'somSmile') && (tag != 'nothing')){
		if (tag != 'tellName')
			this.lastTag=tag;
		if(!from || from != 'tell'){
			colorTxt.toggle();
			$('chatwindow_say').focus();
		}
	}
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
	var openP, closeP, openF, closeF, openT, closeT, openR, closeR;

	var z;
	for (var i = 0; i <= lastRow; i++) {
	 	curTxt = x[i].innerHTML;
		openP = colorTxt.substr_count(curTxt, '[player]');
		closeP = colorTxt.substr_count(curTxt, '[/player]');
		if ((openP != '0') && (closeP != '0')) {
			for (var j = 0; j < openP; j++) {
				label = curTxt.substring(curTxt.indexOf("[player]") + 9, curTxt.indexOf("[/player]"));
				curTxt = curTxt.substring(0, curTxt.indexOf("[player]")) + '<a href="javascript:parent.AjaxWindow.show(\'profile\',{player_name:encodeURIComponent(&quot;' + label + '&quot;)},&quot;' + label + '&quot;);">' + label + '</a>' + curTxt.substring(curTxt.indexOf("[/player]") + 10, curTxt.length);
			}
		}
		//reports links
		openR = colorTxt.substr_count(curTxt, '[report=');
		closeR = colorTxt.substr_count(curTxt, '[/report]');
		if ((openR != '0') && (closeR != '0')) {
			for (var k = 0; k < openR; k++) {
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
		$('idCPBoutton_somSmile').setAttribute("style", "background-image:url(data:image/png;base64," + this.imgSomSm+ ");background-position:0px -27px");
	}
	else {
		elePS.style.display = "block";
		$('idCPBoutton_somSmile').setAttribute("style", "background-image:url(data:image/png;base64," + this.imgSomSm+ ");background-position:0px 0px");
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


var colorTxtFuncs = ['init', 'c', 'a', 'b', 'substr_count', 'd', 'toggle', 'getString', 'addColorButton', 'addColorPanel', 'togglePS', 'addSmilePanel', 'addSmToTxt' ]; //, 'infoScript'

var colorTxt_script = document.createElement('script');
colorTxt_script.type = 'text/javascript';
colorTxt_script.text = 'if(window.colorTxt == undefined) {\n';
colorTxt_script.text += '  window.colorTxt = new Object();\n';

for (var i = 0; i < colorTxtFuncs.length; i++) {
	var colorTxtFunc = colorTxtFuncs[i];
	colorTxt_script.text += '  colorTxt.' + colorTxtFunc + ' = ' + eval(colorTxtFunc.toString()) + '\n';
};
colorTxt_script.text += '  colorTxt.init('+VERSION+');\n';
colorTxt_script.text += '}';
document.body.appendChild(colorTxt_script);
//-----------------------\/
	})

//-----------Safari installer------------\/
			var n = this;
			if (n.safari) { 
				if (!(document.getElementById('gsID'))) {
					var gsiSrc =n.safari.extension.baseURI;
					var headID = document.getElementsByTagName("head")[0];         
					var greaseScript = document.createElement('script');
					greaseScript.type = 'text/javascript';
					greaseScript.id = 'gsID';
					greaseScript.src = gsiSrc + 'js/grease_dialog.js';
					headID.appendChild(greaseScript);
				}
				if (!(document.getElementById('greaseSafari-installer'))) {
					var scpNum = "115675";
				 	var iframeSafariInstaller = document.createElement('iframe');
					var href = "http://userscripts.org/scripts/source/"+scpNum+".user.js";
					iframeSafariInstaller.name = 'greaseSafari-installer'+scpNum+'';
					iframeSafariInstaller.id = 'greaseSafari-installer';
					iframeSafariInstaller.src = n.safari.extension.baseURI + 'grease.html';
					document.body.appendChild(iframeSafariInstaller);

					iframeSafariInstaller.onload = function () {
					var data = {
							type: '.user.js',
							original: 'http://userscripts.org/scripts/review/'+scpNum+'',
							src: href
						};
						sendRequest(data, install_response, "NinjaKit.install");
					};
					var top = (window.innerHeight - 350) / 2;
					var left = (window.innerWidth - 500) / 2;
					iframeSafariInstaller.setAttribute('style', '-webkit-box-shadow: 4px 4px 4px rgba(0,0,0,0.5);display:none;z-index:90000;border-radius:10px;background:-webkit-gradient(linear, left top, left bottom, from(rgba(246,246,246,0.7)), to(rgba(202,202,202,0.7)));position:fixed;height:350px;width:500px;left:' + left + 'px;top:' + top + 'px;');
				}
			}

function install_response(meta) {
	window.onmessage = function (evt) {
		if (evt.data.type === 'install') {
			if (meta_json === JSON.stringify(evt.data.meta)) {
				!n.safari && sendRequest({
					type: 'install',
					meta: meta
				}, installed_response);
			}
		} else if (evt.data.type === 'view_source') {
			if (meta_json === JSON.stringify(evt.data.meta)) {
				!n.safari && sendRequest({
					type: 'view_source',
					meta: meta
				});
			}
			installed_response();
		} else if (evt.data.type === 'cancel') {
			installed_response();
		} else if (evt.data.type === 'end') {
			installed_response();
		}
	};
}


function installed_response(meta) {
	document.body.removeChild(iframeSafariInstaller);
	iframeSafariInstaller = null;
}
//-----------Safari installer------------/\


}
else	//Cas du script exГ©cutГ© dans l'iframe pour la mise Г  jour
{
	//CrГ©ation d'une fonction globale pour tout le script
	(function(fonctionGZA2){
		var documentGZA2=document,scriptGZA2=documentGZA2.createElement("script");
		scriptGZA2.type = "application/javascript";
		scriptGZA2.textContent = "("+fonctionGZA2.toString()+")()";
		(documentGZA2.body||documentGZA2.head||documentGZA2.documentElement).appendChild(scriptGZA2);
		scriptGZA2.parentNode.removeChild(scriptGZA2)
	})(function(){
	var NUMERO_SCRIPT	= "115675" ;
	function envoi_info(){
		var destination = window.parent;
		message = String(escape(document.body.textContent));

		//Indiquer le nВ° du script pour identifier la communication
		if(destination.postMessage) {
			destination.postMessage(NUMERO_SCRIPT + message, '*');
		}
	}
	envoi_info();
	})
}
//----------------------- The West - ColorMe ver. 1.9 -----------------------


//======================================= Buildings, Menu Shortcut Icons, Fullscreen =====================================
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) {return;}
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// ============ ДОПОЛНИТЕЛЬНОЕ МЕНЮ ============
  var actual_world = window.location.host.substr(0,3);
  var actual_region = window.location.host.substr(0,2);
//  var weststats_link = document.createElement("div");
//  weststats_link.id="weststats_link";
//  if(actual_region=="ru"){
//    weststats_link.innerHTML = '<a id=\"TWF_weststats_link\" title=\"Weststats\" href="http://ru.weststats.com/?change_world='+actual_world+' " target="_blank"></a>';
//  }
//  else
//  {
//    weststats_link.innerHTML = '<a id=\"TWF_weststats_link\" title=\"Weststats\" href=\"http://ru.weststats.com/?change_world='+actual_world+' " target="_blank"></a>';
//  }
//  addGlobalStyle('#weststats_link { background:url(data:image/png;base64,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%3D); }');
//  var menu_duel = document.getElementById('menu_duel');
//  if (menu_duel) {
//    menu_duel.parentNode.insertBefore(weststats_link, menu_duel.nextSibling);
//  }
  //var fortsmaps_link = document.createElement("div");
  //fortsmaps_link.id="fortsmaps_link";
  //fortsmaps_link.innerHTML = "<img class=\"TWF_fortsmaps\" src=\"images/transparent.png\" width=\"128\" height=\"25\" title=\"Карты фортов\" usemap=\"#map_mapy\" class=\"TWF_fortsmaps\" /><map name=\"map_mapy\" class=\"TWF_fortsmaps\"><area shape=\"rect\" coords=\"32,0,65,25\" href=\"http://i757.photobucket.com/albums/xx211/Darius_II/forty/fort_duzy.jpg\" alt=\"duzy fort\" target=\"_blank\" title=\"Duzy fort\" class=\"TWF_fortsmaps\" /\"><area shape=\"rect\" coords=\"65,0,94,25\" href=\"http://i757.photobucket.com/albums/xx211/Darius_II/forty/fort_sredni.jpg\" alt=\"sredni fort\" target=\"_blank\" title=\"Sredni fort\" class=\"TWF_fortsmaps\" /><area shape=\"rect\" coords=\"94,0,120,25\" href=\"http://i757.photobucket.com/albums/xx211/Darius_II/forty/fort_maly.jpg\" alt=\"maly fort\" target=\"_blank\" title=\"Maly fort\" class=\"TWF_fortsmaps\" /></map>";
  //addGlobalStyle('#fortsmaps_link { background-image:url(data:image/png;base64,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); }');
  //addGlobalStyle('.TWF_fortsmaps:hover {background:url(/images/main/menu_highlight.png) no-repeat scroll right 0 transparent; }');
  var ForumSkripts_link = document.createElement("div");
  ForumSkripts_link.id="ForumSkripts_link";
  ForumSkripts_link.innerHTML = '<a id=\"TWF_ForumSkripts_link\" title=\"Форум: Скрипты для Веста\" href="http://forum.the-west.ru/showthread.php?t=9703" target="_blank"></a>';
  addGlobalStyle('#ForumSkripts_link { background:url(data:image/png;base64,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); }');
  var PKSkripts_link = document.createElement("div");
  PKSkripts_link.id="PKSkripts_link";
  PKSkripts_link.innerHTML = '<a id=\"TWF_PKSkripts_link\" title=\"Обновить сборку скриптов от: ПоросячийКот\" href="http://userscripts.org/scripts/show/82472" target="_blank"></a>';
  addGlobalStyle('#PKSkripts_link { background:url(data:image/png;base64,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); }');
  var menu_settings = document.getElementById('menu_settings');
  if (menu_settings) {
      menu_settings.parentNode.insertBefore(PKSkripts_link, menu_settings.nextSibling);
      menu_settings.parentNode.insertBefore(ForumSkripts_link, menu_settings.nextSibling);
  };

//addGlobalStyle('body { padding:0; margin:0; width:100%; height:100%; }');
  //addGlobalStyle('#screensizer {padding:0; margin:0; width:100%; height:100%;}');
    addGlobalStyle('#border_cap {display:none;}');
      addGlobalStyle('#abdorment_left, #abdorment_right { display:none; }');
      addGlobalStyle('#workbar_left, #workbar_right { position:absolute; background:transparent; }');
      addGlobalStyle('.wb_taskbar { width:75px; height:239px; top:301px; }');
      addGlobalStyle('.workbar_top { height:239px!important; background:url(/images/main/workbar_top.png); }');
      addGlobalStyle('#wb_buy_pa { display:none; }');
      addGlobalStyle('#wb_task_0, #wb_task_1, #wb_task_2, #wb_task_3, #wb_task_4, #wb_task_5, #wb_task_6, #wb_task_7 { margin-left:0; margin-top:0; margin-bottom:-10px; }');
    addGlobalStyle('#shadow_top, #shadow_left_top, #shadow_right_top { display:none; }');
    addGlobalStyle('#shadow_left_wing, #shadow_right_wing, #shadow_left_wing_bottom, #shadow_right_wing_bottom { display:none; }');
    addGlobalStyle('#shadow_left_side, #shadow_right_side { display:none; }');
      addGlobalStyle('#shadow_bottom { display:none; }');
    addGlobalStyle('#shadow_left_corner, #shadow_right_corner { display:none; }');
    addGlobalStyle('#main_sizer { margin:0; }'); //padding:0; 
      addGlobalStyle('#head_container { background:transparent; }'); //padding-top:0; 
        addGlobalStyle('#head_title { display:none; }');
        addGlobalStyle('#menus { width:100%; }');
          addGlobalStyle('#left_menu, #right_menu { top:-14px; background:transparent; }');
          addGlobalStyle('#left_menu { left:0; }');
          addGlobalStyle('#right_menu { right:0; }');
        addGlobalStyle('#current_task_box { top:40px; z-index:3; }');
        addGlobalStyle('#current_task_box_text a { color:yellow; ');
        addGlobalStyle('#head_background { margin:0; }');
        addGlobalStyle('#head_background { margin-top:-38px; }');
          addGlobalStyle('#character_info { margin: 0 16px 0 60px; top:37px; z-index:3; }');
    addGlobalStyle('#minimap_container { position:absolute; margin-left:125px; margin-top:430px; }');
    //
    //addGlobalStyle('#main_container_position { top:40px; height:100%; }');
      addGlobalStyle('#main_container_border_left, #main_container_border_right { display:none!important; }');
      addGlobalStyle('#main_container { margin:0; background:none; }'); //padding:0; 
        addGlobalStyle('#map_scroll_top { top:-60px; }');
        addGlobalStyle('#map_scroll_bottom { top:-36px!important; }');
        addGlobalStyle('#map_scroll_left { left:50%; top:-48px!important; margin-left:-35px; }');
        addGlobalStyle('#map_scroll_right { left:50%; top:-48px!important; margin-left:15px; }');
        addGlobalStyle('#map_maximize_button { left:50%; top:-48px!important; margin-left:50px; }');
        addGlobalStyle('#map_place { margin:0; }');
        //addGlobalStyle('#footer { margin-top: 5px; }');
          addGlobalStyle('#chatwindow { margin:0; }');
        //addGlobalStyle('.bottomleftcurve, .bottomrightcurve {background:url(/images/main/brown_bg_repeat.jpg);}');
        addGlobalStyle('.bottomleftcurve, .bottomrightcurve { background:none; }');
        addGlobalStyle('#footer_menu_left { position:absolute; width:100%!important; padding-top:1px!important; top:-133px!important; left:0px!important; }'); //padding:1px!important;
        addGlobalStyle('#footer_scroll_map_to_char {margin-left:5px;}');
        addGlobalStyle('#footer_menu_right { position:absolute; width:215px!important; padding-top:1px!important; top:-133px!important; right:0px!important; }'); //padding:1px!important;
        addGlobalStyle('#footer_logout {margin-right:5px;}');
        addGlobalStyle('#map_border_bottom { width:100%; left:0px; }');
        addGlobalStyle('#scroll_to_fort_list{ top:140px!important; left:140px!important; z-index:55;}');
        addGlobalStyle('#scroll_to_fort_list * { margin: 0; padding: 0; background-color:#cbb784; }');
        function hc_fmf(){
	  var h_c = document.getElementById('head_container');
          var fm = document.getElementById('main_footnotes');
          if (!h_c||!fm) {setTimeout(hc_fmf,2000);return}
          fm = fm.parentNode.removeChild(fm);
          h_c.appendChild(fm);
	  
        };
        addGlobalStyle('#main_footnotes{position:absolute !important; top:122px !important; left:-50% !important; margin-left:109px !important;}');
        hc_fmf();
        addGlobalStyle('#window_bar { margin-top: -15px; }');

        addGlobalStyle('#minimap_micro{background-image:url(data:image/png;base64,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); }');

        addGlobalStyle('#buffbar {left:150px;}');

// ============= ДОПОЛНИТЕЛЬНЫЕ КНОПКИ ==================

function addFooterIcon(mylink,idname, title) {
	var head, style;
	footer_menu_left = document.getElementById('footer_minimap_icon');
	if (footer_menu_left) footer_menu_left = footer_menu_left.parentNode;
	if (footer_menu_left) footer_menu_left = footer_menu_left.parentNode;
	if (!footer_menu_left) {return false;}
	var iconlink = document.createElement('a');
	iconlink.setAttribute('href',mylink);
	iconlink.innerHTML = "<img id=\""+idname+"\" alt=\"\" src=\"images/transparent.png\"/>";
	footer_menu_left.appendChild(iconlink);
	addPop(idname,'<b>'+title+'</b>');
	return true;
};

function addPop (id,title){
	if (document.getElementById(id))
		setTimeout(function() {document.getElementById(id).setAttribute('title', title)},2500)
}

add_link_button = function (){
	fml = document.getElementById('footer_minimap_icon');
	if (!fml) {setTimeout(add_link_button, 2000);return;}
	addFooterIcon('javascript:if(Character.home_town != null) Trader.open(\'gunsmith\', Character.home_town.town_id);','footer_building_gunsmith','Оружейная');
	addFooterIcon('javascript:if(Character.home_town != null) Trader.open(\'tailor\', Character.home_town.town_id)','footer_building_tailor','Портной');
	addFooterIcon('javascript:if(Character.home_town != null) Trader.open(\'general\', Character.home_town.town_id);','footer_building_general','Магазин');
	addFooterIcon('javascript:if(Character.home_town != null) HotelWindow.open(Character.home_town.town_id);','footer_building_hotel','Отель');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_bank\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_bank','Банк');
	addFooterIcon('javascript:if(Character.home_town != null) ChurchWindow.open(Character.home_town.town_id);','footer_building_church','Церковь');
	addFooterIcon('javascript:if(Character.home_town != null) MorticianWindow.open(Character.home_town.town_id);','footer_building_mortician','Могильщик');
	addFooterIcon('javascript:if(Character.home_town != null) CityhallWindow.open(Character.home_town.town_id);','footer_building_cityhall','Мэрия');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_saloon\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_saloon','Свой салун');
	addFooterIcon('javascript:if(Character.home_town != null) MarketWindow.open(Character.home_town.town_id, 10)','footer_building_market','Рынок');
	addFooterIcon('javascript:if(Character.home_town != null) AjaxWindow.show(\'building_sheriff\',{town_id:Character.home_town.town_id},Character.home_town.town_id);','footer_building_sheriff','Шериф');
        addFooterIcon('javascript:Trader.open(\'item_trader\');','footer_building_trader','Коммивояжер');
        addFooterIcon('javascript:CharacterWindow.open();CharacterWindow.showTab(\'crafting\');','footer_building_Crafting','Крафтинг');
        addFooterIcon('javascript:dyMarketHelper.calculate();','footer_building_TradeMarket','Покупки на рынке');

	addEndDiv('\
		if (Character.home_town == null) {\
			var footer_menu_left = document.getElementById(\'footer_minimap_icon\');\
			footer_menu_left.parentNode.parentNode.setAttribute(\'class\',\'homeless\');\
		}\
	;');
};

function addEndDiv(code) {
    var bodyx, enddiv;
    bodyx = document.getElementsByTagName('body')[0];
    if (!bodyx) {return;}
    enddiv = document.createElement('script');
    enddiv.type = 'text/javascript';
    enddiv.innerHTML = code;
    bodyx.appendChild(enddiv);
}

add_link_button();
addGlobalStyle('#footer_menu_left #footer_building_gunsmith, #footer_menu_left #footer_building_tailor, #footer_menu_left #footer_building_general, #footer_menu_left #footer_building_hotel, #footer_menu_left #footer_building_bank, #footer_menu_left #footer_building_church, #footer_menu_left #footer_building_mortician, #footer_menu_left #footer_building_cityhall, #footer_menu_left #footer_building_saloon, #footer_menu_left #footer_building_market, #footer_menu_left #footer_building_sheriff, #footer_menu_left #footer_building_trader, #footer_menu_left #footer_building_Crafting, #footer_menu_left #footer_building_TradeMarket {background-image:url(data:image/png;base64,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%3D%3D);}');
//addGlobalStyle('#abdorment_middle {display:none;}');
addGlobalStyle('#footer_building_tailor {background-position:-37px 0;}');
addGlobalStyle('#footer_building_general {background-position:-74px 0;}');
addGlobalStyle('#footer_building_saloon {background-position:-111px 0;}');
addGlobalStyle('#footer_building_mortician {background-position:-148px 0;}');
addGlobalStyle('#footer_building_bank {background-position:-185px 0;}');
addGlobalStyle('#footer_building_church {background-position:-222px 0;}');
addGlobalStyle('#footer_building_hotel {background-position:-259px 0;}');
addGlobalStyle('#footer_building_cityhall {background-position:-296px 0;}');
addGlobalStyle('#footer_building_market {background-position:-333px 0;}');
addGlobalStyle('#footer_building_sheriff {background-position:-370px 0;}');
addGlobalStyle('#footer_building_trader {background-position:-407px 0;}');
addGlobalStyle('#footer_building_Crafting {background-position:-444px 0;}');
addGlobalStyle('#footer_building_TradeMarket {background-position:-481px 0;}');



//       TW-DB.info Quick Import Button
//       1.2.2
TWDBQI_inject = function(){
	if(document.getElementById('TWDBQI_js')) return;
	var TWDBQIjs = document.createElement('script');
	TWDBQIjs.setAttribute('type', 'text/javascript');
	TWDBQIjs.setAttribute('language', 'javascript'); 
	TWDBQIjs.setAttribute('id', 'TWDBQI_js');
	TWDBQIjs.innerHTML = "var _TWDBQI_int = setInterval("+(function(){

/* injected script starts */
/**************************/

	if(!TheWestApi.version) return; else clearInterval(_TWDBQI_int);
	jQuery('#footer_minimap_icon').parent().after('<'
+'img alt="TW-DB Import" id="TWDBI_import_button" style="left:2'+(TheWestApi.version=='1.35'?6:2)+'8px;top:-2px;cursor:pointer" title="<'
+'b>Launch TW-DB.info Import<'+'/b>" onclick="wman.open(\'twdbi nominimize noreload\').addTab(\'Please wait...\');jQuery.getScript(\'http://tw-db.info/cache/js/sDoImport_eng.js\');"'
+'src="data:image/png;base64,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" /'+'>');

/**************************/
/*  injected script ends  */

	}).toString()+", 100); ";
	document.getElementsByTagName('body')[0].appendChild(TWDBQIjs);
};

if ((location.href.indexOf(".the-west.") != -1 || location.href.indexOf(".tw.innogames.") != -1) && location.href.indexOf("game.php") != -1) TWDBQI_inject();


//=======================================Positions =====================================
var resourceBundle = "{'center.popup':'Показать на карте'};";

function init_cj() {
	var that = this;
	
	Tasks.generate_queue_xhtml_centerJobs = Tasks.generate_queue_xhtml;
	Tasks.generate_queue_xhtml = function(options) {
		var table = Tasks.generate_queue_xhtml_centerJobs(options);
		if(Tasks.tasks.length > 0) {
			var lastPos = Tasks.last_pos;
			var workingCoords = new Array();
			for(var i=0; i < Tasks.tasks.length; i++){
				var obj = Tasks.tasks[i];
				if(obj.type == 'way'){
					lastPos = {x:obj.data_obj.to_x, y:obj.data_obj.to_y};
				} else {
					workingCoords.push(lastPos);
				}
			}
			var tds = $ES('td', $E('tr', table));
			for(var i=0; i < workingCoords.length; i++){
				var td = tds[i];
				var div = $E('div', td);
				
				var center = new Element('img',{title:that.resourceBundle['center.popup'],src:'images/icons/center.png',styles:{position:'absolute',top:'5px',left:'63px', width:'20px', cursor:'pointer'}});
				center.addEvent('click',function(pos){
					WMap.scroll_map_to_pos(pos.x, pos.y);
				}.bind(this, [workingCoords[i]]));
				center.injectInside(div);
			}
		}
		return table;
	}	
}


var centerJob_script = document.createElement('script');
centerJob_script.type='text/javascript';
centerJob_script.text =  'if(window.CenterJob == undefined) {\n';
centerJob_script.text += '  window.CenterJob = new Object();\n';
centerJob_script.text += '  CenterJob.init = ' + init_cj.toString() + '\n';
centerJob_script.text += '  CenterJob.resourceBundle = ' + resourceBundle + ';\n';
centerJob_script.text += '  CenterJob.init();\n';
centerJob_script.text += '}';
document.body.appendChild(centerJob_script);


//======================================= Motivation =====================================

/*
	Eine Veraenderung, Weitergabe oder sonstige Veroeffentlichung dieses Scripts oder Teilen davon bedarf einer schriftlichen Genehmigung des Autors. 
	Das Copyright liegt beim Autor.
*/

MoCheck = new Object();

MoCheck.getMoCheckVersion = function() {
	return "3.0";
}

MoCheck.init = function() {

	/*Manuelle Ueberpruefung fuer z.B. Opera*/
	if(!window.location.href.match(/http:\/\/.+\.the-west\..*\/game\.php.*/i)) {
		return;
	}
	/*  Language Settings */
	var lang = window.location.href.substring(window.location.href.indexOf("//") + 2, window.location.href.indexOf("//") + 4);
	MoCheck.resourceBundle = MoCheck.getLanguage(lang);


	/*  Configuration Settings */
	MoCheck.cookieName = 'motScript';
	MoCheck.cookieSplitter = '/*.';
	MoCheck.oldCookieName = 'moScript';
	
	/* AjaxWindow.setJSHTML ueberschreiben, um Add-Buttons hinzu zu fuegen */
	AjaxWindow.setJSHTML_Motivation = AjaxWindow.setJSHTML;
	AjaxWindow.setJSHTML = function(div,content) {
		AjaxWindow.setJSHTML_Motivation(div,content);
		MoCheck.setAddButton(div);
	}
	
	/* Sichtbarkeit der einzelnen Spalten */
	MoCheck.ColumnVisibility = new Class({
		money:true,
		experience:true,
		luck:true,
		motivation:true,
		initialize:function(money,experience,luck,motivation){
			this.money = money;
			this.experience = experience;
			this.luck = luck;
			this.motivation = motivation;
		},
		show_money:function(){return this.money;},
		show_experience:function(){return this.experience;},
		show_luck:function(){return this.luck;},
		show_motivation:function(){return this.motivation;},
		toString2:function(){return '' + Number(this.money) + Number(this.experience) + Number(this.luck) + Number(this.motivation);},
		count:function(){return Number(this.money) + Number(this.experience) + Number(this.luck) + Number(this.motivation);}
	});

	
	/* Ein paar Vars initialisieren */
	this.listen = new Array();
	this.aktJobs = new Array();
	this.jobSortBy = 'motivation';
	this.jobSortType = 'desc';
	this.columnVisibility = new Object(); /* Sichtbarkeit der Listen: this.columnVisibility[Listenname] */
	
	/* Sollte vielleicht besser aus dem JS der JobDIVs gelesen werden, um aktuell zu bleiben... */
	JobCalculation.functionCalcLuck = "$workTime / (60*600) * 1.2 * $factor * $motivation";
	JobCalculation.functionCalcDollar = "$max_dollar = .9 * $dollar_exponent * 100 + 5; $moneyFactor = 1 + ($moneyBonus / 100); return $max_dollar * pow($job_points,.2) * $moneyFactor;";
	JobCalculation.functionCalcMaxDanger = "8 * pow($danger*100, 1.35) / ($jobPoints + 3)";
	JobCalculation.workSpeed = 1;
	
	this.getCookie();
	
	/* Arbeiten der aktuelle Liste laden */
	MoCheck.getAllJobInfoFromServer();
	
	//this.addMotivationButton();
	WEvent.register('moCheckJobWindowLoaded', MoCheck.readJobInfo.store());
}


/*
 * Schaltet den "Add"-Button einer Arbeit sichtbar oder unsichtbar
 */
MoCheck.setAddButton = function(div) {
	if(div && div.id && div.id.search(/window_job/) != -1) {
		var splt = div.id.split("_");
		var x = splt[2];
		var y = splt[3];
		var btnId = 'btnAdd_' + x + "_" + y;
		
		var isNewJob = (MoCheck.getJobCoords().filter(function(job, index){
		    return (job.pos.x == x) && (job.pos.y == y);
		})).length == 0;

		/* Button ggf. erst einfuegen */
		var btnAdd = $(btnId);
		if(btnAdd == null) {
			btnAdd = new Element('img',{
				title:'', 'id':btnId, src:'img.php?type=button&subtype=normal&value=plus', 
				styles:{cursor:'pointer', 'margin-left':'20px', display:(isNewJob ? 'inline' : 'none')}
			});
			btnAdd.addMousePopup(new MousePopup(MoCheck.getString('btnAdd.popup'),100,{opacity:0.9}));
			
			btnAdd.addEvent('click',function(){
				$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
				this.remove();
				MoCheck.addJob(x, y);
			});
			
			btnAdd.injectInside($ES('h2', div)[0]);
		} else {
			btnAdd.setStyle('display', isNewJob ? 'inline' : 'none');
		}
	}
}

/*
 * @return Arbeiten von listenName (aktliste, falls null)
 */
MoCheck.getJobCoords = function(listenName) {
	if(listenName == null) {
		listenName = this.aktListe;
	}
	/* Liste muss ggf. gespeichert werden */
	MoCheck.addListe(listenName);
	return this.jobCoords[listenName];
}

MoCheck.setAktListe = function(listenName) {
	listenName = $defined(listenName) ? listenName : 'по умолчанию';
	MoCheck.aktListe = listenName;
	
	/* Liste muss ggf. gespeichert werden */
	MoCheck.addListe(listenName);
	
	/* Add-Button der geoeffneten Fenster ueberpruefen */
	$each(AjaxWindow.windows, function(aktWindow, index) {
		if(aktWindow && aktWindow.id) {
			var contentDiv = $(aktWindow.id + '_content');
			MoCheck.setAddButton(contentDiv);
		}
	});
}

MoCheck.addListe = function(listenName) {
	if(MoCheck.jobCoords[listenName] == null) {
		MoCheck.jobCoords[listenName] = new Array();
		MoCheck.listen.push(listenName);
	}
}

MoCheck.deleteListe = function(name, newListe) {
	this.listen.splice(this.listen.indexOf(name), 1);
	this.jobCoords[name] = null;
	this.columnVisibility[name] = null;
	
	if(newListe != null) {
		this.setAktListe(newListe);
	} else {
		this.setAktListe(MoCheck.listen[0]);
	}
}

MoCheck.sortArbeiten = function() {
	var that = this;
	
	/* Sortierungsindex auf job mappen */
	switch(this.jobSortBy) {
		case 'money':		sortBy = 'getMoneySortValue()';break;
		case 'experience':	sortBy = 'getExperienceSortValue()';break;
		case 'luck':		sortBy = 'getLuckSortValue()';break;
		case 'motivation':	sortBy = 'jobCalc.motivation';break;
		default:			sortBy = 'jobCalc.motivation';
	}
	
	this.aktJobs.sort(function sortAsc(a, b){
		a = eval('a.' + sortBy);
		b = eval('b.' + sortBy);
		if(MoCheck.jobSortType == "asc") {
			return a > b ? 1 : a < b ? -1 : 0;
		} else {
			return a < b ? 1 : a > b ? -1 : 0;
		}
	});
}

MoCheck.changeSortOrder = function(sortBy) {
	if(this.jobSortBy == sortBy) {
		this.jobSortType = this.jobSortType == 'asc' ? 'desc' : 'asc';
	} else {
		this.jobSortBy = sortBy;
		this.jobSortType = 'desc';
	}
	MoCheck.openMotivationWindow();
};

/**
 * Alle Jobs der aktuellen Liste laden
 */
MoCheck.getAllJobInfoFromServer = function() {
	MoCheck.aktJobs = new Array();
	if(MoCheck.getJobCoords().length > 0) {
		$each(MoCheck.getJobCoords(), function(jobCoords, index) {
			MoCheck.getJobInfoFromServer(jobCoords.pos.x, jobCoords.pos.y);
		});
	} else {
		/* MotivationWindow muss ggf. neu geladen werden, auch wenn die aktuelle Liste keine Jobs hat */
		MoCheck.reloadWindow();
	}
}

MoCheck.getJobInfoFromServer = function(x, y) {
	new Ajax('game.php?window=job&x=' + x + '&y=' + y, {
		method:'post',
		data:{},
		onComplete:function(data) {
			data = Json.evaluate(data);
			if(data.page != undefined){
				WEvent.trigger('moCheckJobWindowLoaded', [data.page, data.js]);
			}
		}
	}).request();
}

/**
 * Job-Informationen aus einem Job-Div auslesen
 */
MoCheck.readJobInfo = function(page, js) {
	/* JS auslesen */	
	/*  Zeilenumbrueche entfernen, da diese beim str.match() Probleme verursachen koennen */
	js = js.replace(/\r/g, " ");
	js = js.replace(/\n/g, " ");

	eval(MoCheck.getJsParam('var calculationData', js));
	
	/* windowJob einmal auslesen, um an ID zu kommen */
	var task_skills = new Array();
	eval(MoCheck.getJsParam('var windowJob', js));
	
	/* Skills aus der Joblist auslesen und in task_skills eintragen */
	var str = "";
	var skillString = JobList[windowJob.jobCalc.jobId].formular.match(/\d \* skills\.[a-z_]+ /gi);
	for (i = 0; i < skillString.length; i++) {
		var elements = skillString[i].split(' ');
		var aktSkill = elements[2].split('.');
		var ev = 'for (i = 1; i <= ' + elements[0] + '; i++) {task_skills.push(\'' + aktSkill[1] + '\');}';
		str += ev;
		
	}
	eval(str);
	if(task_skills.length < 5) {
		alert("Fehler: es wurden weniger als 5 Skills ausgelesen: \n" + task_skills + "\nQuelle: " + JobList[windowJob.jobCalc.jobId].formular);
	}

	/* windowJob auslesen, diesmal mit gefuellten task_skills */
	eval(MoCheck.getJsParam('var windowJob', js));
	windowJob.name = JobList[windowJob.jobCalc.jobId].name;
	
	/* Aktuelle Dauer speichern (u.a. fuer Sortierung) */
	for(key in windowJob.jobCalc.calculations) { windowJob.aktDuration = key; }
	
	/* Zusaetzliche Methoden fuer die Sortierung */
	windowJob.getMoneySortValue = function() {
		var points = Math.max(1, Tasks.getJobPoints(this.jobCalc.jobId, this.jobCalc.task_skills) - this.jobCalc.malus);
		return this.jobCalc.calcMoney(this.aktDuration, points);
	};
	windowJob.getLuckSortValue = function() {
		var points = Math.max(1, Tasks.getJobPoints(this.jobCalc.jobId, this.jobCalc.task_skills) - this.jobCalc.malus);
		var luckval = this.jobCalc.calcLuckItemValue(points);
		var erg = (luckval[0] + luckval[1]) / 2;
		return erg;
	};
	windowJob.getExperienceSortValue = function() {
		return this.jobCalc.calculations[this.aktDuration].expCalc;
	};
	
		
	/* Temporaeren DIV erstellen */
	var divId = 'tmpJob_' + windowJob.pos.x + '_' + windowJob.pos.y;
	var window_div = new Element('div',{'id':divId, 'styles':{'display':'none'}});
	window_div.setHTML(page);
	window_div.injectInside('window_bar');
	
	/* Image auslesen */
	windowJob.image = $ES('h2', divId)[0].style.backgroundImage.match(/images\/jobs\/.*\.[a-z]{3}/i);
	
	/* Temporaeren DIV wieder loeschen */
	var trashvar = $(divId);
	trashvar.empty();
	trashvar.remove();
	Garbage.trash([trashvar]);
	
	/* Neuen windowJob speichern */
	MoCheck.aktJobs.push(windowJob);
	
	/* MotivationWindow ggf. neu laden */
	MoCheck.reloadWindow();
}

MoCheck.reloadWindow = function() {
	if(AjaxWindow.windows['motivation'] && MoCheck.aktJobs.length == MoCheck.getJobCoords().length) {
		MoCheck.openMotivationWindow();
	}
}

function lo(obj) {
	var txt = "";
	for (a in obj) {
		txt += "\n" + a;
	}
	alert(txt);
}

/* Trigger zum automatischen Aktualisieren aktivieren */
MoCheck.setTrigger = function() {
	$each(MoCheck.aktJobs, function(job, index) {
		var aktJobId = job.pos.x + '_' + job.pos.y;
				
		/* checks if the player can do the job and sets the way time*/
		var reload_task_points = Tasks.reload_task_points(job.jobCalc.task_skills, job.jobCalc.malus, 'job', job.window, job.jobCalc.jobId);
		
		reload_task_points();
		job.refresh_way_time();

		var eventname = 'windowJob_' + aktJobId;
		WEvent.register('jobCalcDuration_' + aktJobId, MoCheck.durationChanged.store(job), eventname);
		WEvent.register('character_speed_changed', job.refresh_way_time.store(job), eventname);
		WEvent.register('character_values_changed', reload_task_points.store(job), eventname);
		WEvent.register('character_values_changed', job.calcDuration.store(job), eventname);
		job.calcDuration();
	});
}

MoCheck.durationChanged = function() {
	/* Duration speichern */
	var selectElements = $ES('.jobTime', this.window);
	this.aktDuration = selectElements[0].options[selectElements[0].selectedIndex].value;
	
	/* Aenderungen berechnen und anzeigen */
	this.calcDuration();
}

MoCheck.addJobRow = function(job, index) {
	var aktJobId = job.pos.x + '_' + job.pos.y;
	var displayMoney = MoCheck.isColumnVisible('money') ? '' : 'display:none;';
	var displayExperience = MoCheck.isColumnVisible('experience') ? '' : 'display:none;';
	var displayLuck = MoCheck.isColumnVisible('luck') ? '' : 'display:none;';
	var displayMotivation = MoCheck.isColumnVisible('motivation') ? '' : 'display:none;';
	var td_insert = '<td></td>';
	for (var ii = 0; ii < PK_S3.cookies.save.length; ++ii){
	    if (job.name == PK_S3.cookies.save[ii].name){
		td_insert ='<td>' +
		    '<div class="startWork task_control" style="margin:0 10px 0 0; padding:5px 0 0 0; width:100px; white-space:nowrap; float:right;" title="Одеть сохранённый набор">' +
		    '<span>' +
		    '<a class="button_wrap button" style="margin-top:-3px;" href="#" onClick="PK_S3.equip_motivation(\''+job.name+'\')">' +
		    '<span class="button_left"></span><span class="button_middle">!</span><span class="button_right"></span>' +
		    '</a>' +
		    '</span>' +
		    '</div>' +
		    '</td>'
	    }
	}
	
	var result = 
			'<div id="moJob_' + aktJobId + '" style="text-align:center;border:1px solid black; margin:2px;">' +
			'	<div class="jobWrapper" style="margin:0 0 0 0; padding:0 0 0 0;">' +
//		'<table border="1">' +
//		'<tr>' +
//		'<td colspan="4">' +
			'		<div id="moCheck.jobImage_' + aktJobId + '" style="position:relative; height:42px; width:50px; float:left;">'+
			'		</div>' +
			'<table>' +
			'<tr>' +
			'<td>' +
					// Опыт
			'		<div class="jobBar jobExperience" style="float:left;' + displayExperience + '">' +
			'			<span class="icon iconExperience"></span>' +
			'			<span class="valueStatic" style="cursor:default;"><span class="barValue">0</span></span>' +
			'		</div>' +
			'</td>' +
			'<td>' +
					// Удача
			'		<div class="jobBar jobLuck" style="float:left;' + displayLuck + '">' +
			'			<span class="icon iconLuck"></span>' +
			'			<span class="progress" style="display:none;"><span class="percent" style="width: 2%;"></span></span>' +
			'			<span class="value" style="cursor:default;"><span class="additional">$ </span><span class="barValue">0</span></span>' +
			'		</div>' +
			'</td>' +
			'<td>' +
					// Мотивация
			'		<div class="jobBar jobMotivation" style="float:left;' + displayMotivation + '">'+
			'			<span class="icon iconMotivation"></span>'+
			'			<span class="progress" style="display:none;"><span class="percent" style="width: ' + job.jobCalc.motivation + '%;"></span></span>' +
			'			<span class="value" style="cursor:default;"><span class="barValue">' + Math.floor(job.jobCalc.motivation*100) + '%</span></span>' +
			'		</div>' +
			'</td>' +
			'<td>' +
					// ТО {background-position:-276px 0;}  margin-top: 4px;
			'		<div class="progressBar" style="display:block; background-position:-276px 0; float:left; width:51px; left:2px; margin-top: 3px;">' +
			'			<span class="laborValue" style="position:relative; left:0px; top:3px;">0</span>' +
			'			<span class="laborPercent" style="display:none;"><span class="value">0 / 0</span><span class="fill" style="width:50%;"></span></span>' +
			'		</div>' +
			'</td>' +
			'<td>' +
// Время
			'		<div class="startWork task_control" style="margin:0 10px 0 0; padding:5px 0 0 0; width:100px; white-space:nowrap; float:right;">' +
			'			<select class=\'jobTime\' name=\'job_task_time\' style=\'vertical-align:top;\' onchange=\'WEvent.trigger(\"jobCalcDuration_' + aktJobId + '\", []);\'>' +
			'			</select>' +
			'			<span id="button_start_task_job_' + aktJobId + '">' +
			'				<a class="button_wrap button"  style="margin-top: -3px;" href="#" >' +
			'				<span class="button_left"></span><span class="button_middle">' + MoCheck.getString("btnOk.label") + '</span><span class="button_right"></span>' +
//			'				<span style="clear: both;"></span>' +
			'				</a>' +
//			'				<span class="way_time" style="display:none;">00:00:00</span>' +
			'			</span>' +
			'		</div>' +
// Время
			'</td>' +
			'</tr>' +
			'<tr>' +
			'<td>' +
					// Деньги
			'		<div class="jobBar jobMoney" style="float:left;' + displayMoney + '">' +
			'			<span class="icon iconMoney"></span>' +
			'			<span class="valueStatic" style="cursor:default;"><span class="barValue">0</span></span>' +
			'		</div>' +
			'</td>' +
			'<td>' +
					// Опасность
			'		<div class="jobBar jobDanger">' +
			'			<span class="icon iconDanger"></span>' +
			'			<span class="progress" style="display:none;"><span class="percent" style="width: 2%;"></span></span>' +
			'			<span class="value">' +
			'				<span class="additional"><img src="../images/job/redesign/heart.png" alt="" style="margin-top: -3px;" /></span>' +
			'				<span class="barValue">4</span>' +
			'			</span>' +
			'		</div>' +
			'</td>' +	 
                        // расстояние
			'<td class="strong">Расстояние:</td>' +
			'<td class="txright">' +
			'			<span class="way_time">00:00:00</span>' +
			'</td>' +
// Одевание
			td_insert +
/*			
			'<td>' +
			'		<div class="startWork task_control" style="margin:0 10px 0 0; padding:5px 0 0 0; width:100px; white-space:nowrap; float:right;">' +
			'			<span>' +
			'				<a class="button_wrap button" style="margin-top:-3px;" href="#" onClick="PK_S3.equip_motivation(\''+job.name+'\')">' +
			'				<span class="button_left"></span><span class="button_middle">!</span><span class="button_right"></span>' +
			'				</a>' +
			'			</span>' +
			'		</div>' +
			'</td>' +
//*/			
// Время
			'</tr>' +
			'</table>'+
			/* Dummy-Daten, damit automatische Anpassungen der Punkte usw. funktionieren */
//		'</td>' +
//		'</tr>' +
//		'</table>'+
			'		<div id="moJob_' + aktJobId + '_title" class="window_borders" style="display:none;">' +
						/* Skillbox */
			'			<div class="skill_box task_skill_0">0</div>' +
			'			<div class="skill_box task_skill_1">0</div>' +
			'			<div class="skill_box task_skill_2">0</div>' +
			'			<div class="skill_box task_skill_3">0</div>' +
			'			<div class="skill_box task_skill_4">0</div>' +
			'		</div>' +
			'	</div>' +
			'</div>';
	return result;
}

/* Liest paramName bis zum naechsten Semikolon */
MoCheck.getJsParam = function(paramName, str) {
	var p = str.match(eval('/' + paramName + '.*/i'));
	return p[0].split(';')[0] + ';';
}


// === меню "Мотивация" ===
  addGlobalStyle('#window_motivation { position:absolute; top:133px;}');
  var moBtn = document.createElement("div");
  moBtn.id="moBtn";
  moBtn.innerHTML = '<a id=\"TWF_moBtn\" title=\"Открыть окно Мотивации\" href="javascript:MoCheck.openMotivationWindow(\'motivation\', \'work\');"></a>';
  addGlobalStyle('#moBtn { background:url(data:image/png;base64,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%3D%3D); }');
  // добавляем меню "Влево" под "Дуэль"
  var menu_duel = document.getElementById('menu_duel');
  if (menu_duel) {
    menu_duel.parentNode.insertBefore(moBtn, menu_duel.nextSibling);
  }
// === меню "Мотивация" ===


MoCheck.openMotivationWindow = function() {
	var windowName = 'motivation';
	var group = 'work';

	MoCheck.sortArbeiten();
	$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});

	var window_div = $('window_' + windowName);
	if(!window_div) {
		/* Neu erstellen */
		window_div = new Element('div',{'id':'window_' + windowName,'class':'window'});
		AjaxWindow.windows[windowName] = window_div;
		window_div.injectInside('windows');
		window_div.centerLeft();
	} else {
		window_div.empty();
	}
	AjaxWindow.bringToTop(window_div);
	
	/* Fuellen */
	var xhtml = '<div class="window_borders">';
	xhtml += '  <h2 id="window_' + windowName + '_title" class="window_title" style="background-image:url(img.php?type=window_title&value=work);"><span>' + windowName + '</span></h2>';
	xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall"></a>';
	xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + windowName + '\', \'' + group + '\');" class="window_minimize"></a>';
	xhtml += '  <a href="javascript:AjaxWindow.close(\'' + windowName + '\');" class="window_close"></a>';
	xhtml += '  <div id="window_' + windowName + '_content" class="window_content">';
//	xhtml += '    <div class="tab_container" style="margin-left:7px; width:100%; height:275px">';
//	xhtml += '      <ul class="tabs">' +
//			 '        <li class="active" id="mojob.tab.1" onclick="MoCheck.showTab(this);">'+ MoCheck.getString("dialog.tab.work.titel") + '</li>' + 
//			 '        <li id="mojob.tab.2" onclick="MoCheck.showTab(this);">' + MoCheck.getString("dialog.tab.about.titel") + '</li>' + 
//			 '      </ul>';
	xhtml += '    	<table class="shadow_table" style="margin-left:6px; width:100%; height:360px">';
	xhtml += '    		<tr>';
	xhtml += '    			<td class="edge_shadow_top_left"></td>';
	xhtml += '    			<td class="border_shadow_top"></td>';
	xhtml += '    			<td class="edge_shadow_top_right"></td>';
	xhtml += '    		</tr>';
	xhtml += '    		<tr>';
	xhtml += '    			<td class="border_shadow_left"></td>';
	xhtml += '    			<td class="shadow_content">';
	xhtml += '    				<div style="overflow:auto;width: 675px; height:360px; position: relative;">';
	//xhtml += '    					<div id="mojob.tab.1.div">';
										if(MoCheck.aktJobs.length <= 0) {
											xhtml += '<div style="text-align:center;"><br />' +
													'	<h2>' + MoCheck.getString("dialog.tab.work.nothingSelected.1") + '</h2><br />' +
														MoCheck.getString("dialog.tab.work.nothingSelected.2") +
													'</div>';
										} else {
											xhtml += '<select id="pk_s3_odevalo4ka_select3" style="width: 125px; background-color:#e8dab3; font-size:11px; height:18px; margin:5px;"> </select>';
											xhtml += '<a href="#" onClick="PK_S3.equip_add3()" style="padding:0px 5px; font-size:11px;">Надеть</a>';
											xhtml += '<div id="moCheck.sortBar" style="text-align:right;padding-right:2px; display:inline;">&nbsp;</div>';
											$each(MoCheck.aktJobs, function(job, index) {
												xhtml += MoCheck.addJobRow(job, index);
											});
										}
	//xhtml += '    					</div>';
//	xhtml += '    					<div style="display:none;padding:5px;" id="mojob.tab.2.div">';
//	xhtml += '    						<div style="text-align:center;height:230px;">';
//	xhtml += '    							<h2>The West - Motivation</h2>';
//	xhtml += '    							<ul style="margin-top:10px;text-align:left;">' +
//			 '									<li>Возможность создания списков работ удобных для вас</li>' +
//			 '									<li>Направить на работу своего персонажа 1 кликом без долги поисков</li>' +
//			 '									<li>Сортировка работ по опыту, мотивации, заработку и удаче</li>' +
//			 '								</ul>';
//	xhtml += '    						</div>';
//	xhtml += '    						<div style="float:left;">';
//	xhtml += '    							Узнать больше, а также скачть скрипт вы можете здесь: <br />';
//	xhtml += '    							<a href="http://userscripts.org/scripts/show/63326" target="_blank">http://userscripts.org/scripts/show/63326</a>';
//	xhtml += '    							<br>Русская версия: <br />';
//	xhtml += '    							<a href="http://userscripts.org/scripts/show/85632" target="_blank">http://userscripts.org/scripts/show/85632</a>';
//	xhtml += '    						</div>';
//	xhtml += '    						<div style="float:right;">';
//	xhtml += '    							<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=GYPQLS5LSBTC2" target="_blank">';
//	xhtml += '    								<img src="https://www.paypal.com/de_DE/DE/i/btn/btn_donateCC_LG.gif" alt="Spenden" />';
//	xhtml += '    							</a>';	
//	xhtml += '    						</div>';	
//	xhtml += '    					</div>';
	xhtml += '    				</div>';
	xhtml += '    			</td>';
	xhtml += '    			<td class="border_shadow_right"></td>';
	xhtml += '    		</tr>';
	xhtml += '    		<tr>';
	xhtml += '    			<td class="edge_shadow_bottom_left"></td>';
	xhtml += '    			<td class="border_shadow_bottom"></td>';
	xhtml += '    			<td class="edge_shadow_bottom_right"></td>';
	xhtml += '    		</tr>';
	xhtml += '    	</table>';
//	xhtml += '      <span style="position:absolute; right:22px; top:19px;">' + MoCheck.getString('author') + '&nbsp;' + MoCheck.getAuthor() + '</span>';
	xhtml += '      <span id="moCheck.listen" style="position:absolute; right:22px;">&nbsp;</span>';
// показывает характеристики работ
	xhtml += '		<div id="moCheck.visibleBar" style="text-align:left;padding-left:2px;">&nbsp;</div>';
	//xhtml += '    </div>';
	xhtml += '  </div>';
	xhtml += '</div>';
	xhtml += '</div>';
	window_div.setHTML(xhtml);
	
	PK_S3.spam_bagazh_option();
	
	$ES('.window_closeall').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.closeAll.popup")+'<\/b>'));});
	$ES('.window_minimize').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.minimize.popup")+'<\/b>'));});
	$ES('.window_close').each(function(el){el.addMousePopup(new MousePopup('<b>'+MoCheck.getString("dialog.close.popup")+'<\/b>'));});
	var window_title_div = $('window_' + windowName + '_title');
	window_div.makeDraggable({handle:window_title_div});
	window_title_div.addEvent('dblclick',function(){
				window_div.centerLeft();
				window_div.setStyle('top',133);
			});
	window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
	window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
	

	var listDiv = $('moCheck.listen');

	/* Job-Select anzeigen */
	var onChangeTxt = 'onChange="MoCheck.doConfiguration(\'loadListe\')"';
	var moListen = '<select id="moWorkListen" size="1" style="width:180px; margin-top:2px" ' + onChangeTxt + '>';
	$each(MoCheck.listen, function(liste, index) {
		var isSelected = (liste == MoCheck.aktListe ? 'selected' : '');
		var isActual = liste + (liste == MoCheck.aktListe ? ' (' + MoCheck.getString("dialog.tab.configuration.actual") + ')' : '');
		moListen += '			<option value="' + liste + '" ' + isSelected + '>' + isActual + '</option>';
	});
	moListen += '</select>';
	listDiv.innerHTML = moListen;
	
	/* Conf-Buttons */
//	var btnDelete = new Element('div',{styles:{'margin':'2px', 'float':'left', width:'25px', height:'25px', 'background':'url(images/forum/icons.png) 50px 0', cursor:'pointer'}});
	var btnDelete = new Element('div',{styles:{'margin-left':'2px', 'margin-right':'2px', 'float':'left', width:'25px', height:'25px', 'background':'url(images/forum/icons.png) 50px 0', cursor:'pointer'}});
	btnDelete.innerHTML = "&nbsp;";
	btnDelete.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.configuration.btnDelete.popup'),100,{opacity:0.9}));
	btnDelete.addEvent('click',function(){
		MoCheck.doConfiguration('deleteListe');
	});
	btnDelete.injectInside(listDiv);
	
//	var btnRename = new Element('div',{styles:{'margin':'2px', 'float':'left', width:'25px', height:'25px', 'background':'url(images/forum/icons.png) 0 0', cursor:'pointer'}});
	var btnRename = new Element('div',{styles:{'margin-left':'2px', 'margin-right':'2px', 'float':'left', width:'25px', height:'25px', 'background':'url(images/forum/icons.png) 0 0', cursor:'pointer'}});
	btnRename.innerHTML = "&nbsp;";
	btnRename.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.configuration.btnRename.popup'),100,{opacity:0.9}));
	btnRename.addEvent('click',function(){
		MoCheck.doConfiguration('renameListe');
	});
	btnRename.injectInside(listDiv);
	

	var btnAdd = new Element('div',{styles:{'margin-left':'2px', 'margin-right':'2px', 'float':'left', width:'25px', height:'25px', 'background':'url(images/forum/icons.png) 100px 0', cursor:'pointer'}});
	btnAdd.innerHTML = "&nbsp;";
	btnAdd.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.configuration.btnNew.popup'),100,{opacity:0.9}));
	btnAdd.addEvent('click',function(){
		MoCheck.doConfiguration('newListe');
	});
	btnAdd.injectInside(listDiv);

/*
	var btnAdd = new Element('a',{'title':'', 'class':'button_wrap button', styles:{'float':'left'}, href:'#'});
	btnAdd.innerHTML =  '<span class="button_left"></span><span class="button_middle">+</span>' +
						'<span class="button_right"></span>' +
						'<span style="clear: both;"></span>';
	//btnAdd.addMousePopup(new MousePopup(MoCheck.getString('dialog.tab.configuration.btnNew.popup'),100,{opacity:0.9}));
	//btnAdd.addEvent('click',function(){
	//	MoCheck.doConfiguration('newListe');
	//});
	//btnAdd.injectInside(listDiv);
*/
	
	if(MoCheck.aktJobs.length > 0) {
		$each(MoCheck.aktJobs, function(job, index) {
			var aktJobId = job.pos.x + '_' + job.pos.y;
			
			/* Kleine Anpassung, damit der Job auf das richtige DIV verweist */
			job.window = $('moJob_' + aktJobId);
			
			/* Images einfuegen */
			MoCheck.getJobImageDiv(job).injectInside($('moCheck.jobImage_' + aktJobId));
			
			/* Duration-Select fuellen */
			var selectElement = $ES('.jobTime', job.window)[0];
			for (dur in job.jobCalc.calculations) {
				var o = new Element('option', {'value':dur, 'selected':(dur == job.aktDuration ? true : false)});
				
				var h = Math.floor(dur / 3600);
				var txt;
				if(h > 0) {
					txt = h + " " + MoCheck.getString("select.option.hours");
				} else {
					txt = (dur / 60) + " " + MoCheck.getString("select.option.minutes");
				}
				
                o.textContent = txt;
				o.injectInside(selectElement);
			}
			
			/* Button aktivieren */
			job.button = new Button('ok', 'normal', 'button_start_task_job_' + aktJobId, job.start.bind(job));

		});
		
		/* Automatisches Aktualisieren aktivieren */
		MoCheck.setTrigger();
		
		/* Sortbar fuellen */
		MoCheck.addSortIcon('experience');
		MoCheck.addSortIcon('money');
		MoCheck.addSortIcon('luck');
		MoCheck.addSortIcon('motivation');
		
		/* Visiblebar fuellen */
		MoCheck.addVisibleIcon('experience');
		MoCheck.addVisibleIcon('money');
		MoCheck.addVisibleIcon('luck');
		MoCheck.addVisibleIcon('motivation');
	}
}


/*
 * Erstellt das Div mit den Icons der Arbeit, dem Zentrieren- und Loeschen-Button
 */
MoCheck.getJobImageDiv = function(aktArbeit) {
	var way_time = WMap.calcWayTime(Tasks.last_pos, aktArbeit.pos);
	var image_div = new Element('div',{styles:{position:'relative', height:'42px', width:'35px', margin:'2px', cursor:'pointer'}});
	var image = new Element('img',{title:'',src:aktArbeit.image,styles:{position:'absolute',left:0,top:0, height:'100%'}});
	image.addEvent('click',function(){
		AjaxWindow.show('job',{x:aktArbeit.pos.x,y:aktArbeit.pos.y},aktArbeit.pos.x+"_"+aktArbeit.pos.y);
	});
	
	/* Arbeitspunkte sind hier statisch: Sie werden bei Kleidungswechsel nicht aktualisiert */
	var points = Math.max(1, Tasks.getJobPoints(aktArbeit.jobCalc.jobId, aktArbeit.jobCalc.task_skills) - aktArbeit.jobCalc.malus);
	image.addMousePopup(new MousePopup(MoCheck.getString('jobImage.popup', [aktArbeit.name, points]),250,{opacity:0.9}));
	image.injectInside(image_div);
	
	
	var center = new Element('img',{title:'',src:'images/icons/walk_to.png',styles:{position:'absolute',top:'0px',left:'0px', width:'15px', cursor:'pointer'}});
	center.addMousePopup(new MousePopup(MoCheck.getString('btnCenter.popup', way_time.formatDuration()),100,{opacity:0.9}));
	center.addEvent('click',function(){
		WMap.scroll_map_to_pos(parseInt(aktArbeit.pos.x), parseInt(aktArbeit.pos.y));
	});
	center.injectInside(image_div);

	var btnDelete = new Element('img',{title:'',src:'images/icons/cancel_small.png',styles:{position:'absolute',top:'22px',left:'30px',cursor:'pointer', width:'18px'}});
	btnDelete.addMousePopup(new MousePopup(MoCheck.getString('btnDelete.popup'),100,{opacity:0.9}));
	btnDelete.addEvent('click',function(){
		MoCheck.deleteJob(aktArbeit.pos.x, aktArbeit.pos.y);
	});
	btnDelete.injectInside(image_div);
	return image_div;
}

MoCheck.addSortIcon = function(str) {
	if(MoCheck.isColumnVisible(str)) {
		var icon = new Element('img',{
			title:'', 
			src:'images/job/redesign/bar/icon/' + str + ".png",
			styles:{cursor:'pointer', width:'15px', opacity:(MoCheck.jobSortBy == str ? 1 : 0.4)}}
		);
		icon.addMousePopup(new MousePopup(MoCheck.getString('sortIcon.popup.' + str),100,{opacity:0.9}));
	
		icon.addEvent('click',function(){
			$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
			MoCheck.changeSortOrder(str);
		});
		
		icon.addEvent('mouseover',function(){
			this.setStyle('opacity', 1);
		});
		
		icon.addEvent('mouseout',function(){
			this.setStyle('opacity', MoCheck.jobSortBy == str ? 1 : 0.4);
		});
	
		icon.injectInside($('moCheck.sortBar'));
	}
}

MoCheck.addVisibleIcon = function(str) {
	var isVisible = MoCheck.isColumnVisible(str);
	var icon = new Element('img',{
		title:'', 
		src:'images/job/redesign/bar/icon/' + str + ".png",
		styles:{cursor:'pointer', width:'15px', opacity:(isVisible ? 1 : 0.4)}}
	);
	icon.addMousePopup(new MousePopup(MoCheck.getString('visibleIcon.popup.' + str),100,{opacity:0.9}));

	icon.addEvent('click',function(){
		$ES('.mousepopup').each(function(el){el.setStyle('visibility','hidden')});
		MoCheck.changeColumnVisibility(str, !isVisible);
	});
	
	icon.addEvent('mouseover',function(){
		this.setStyle('opacity', 1);
	});
	
	icon.addEvent('mouseout',function(){
		this.setStyle('opacity', isVisible ? 1 : 0.4);
	});

	icon.injectInside($('moCheck.visibleBar'));
}

MoCheck.doConfiguration = function(cmd) {
	var selectId = 'moWorkListen';
	var msg = '';
	var selectedListe = $(selectId).options[$(selectId).selectedIndex].value;
	
	switch(cmd) {
		case 'loadListe':
			MoCheck.setAktListe(selectedListe);
			msg = MoCheck.getString('message.listLoaded', selectedListe);
			break;
		case 'newListe':
			var newName = prompt(MoCheck.getString("message.newName"), '');
			if(newName == null || newName.length == 0) {
				return;
			}
			if($defined(this.jobCoords[newName])) {
				new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
				return;
			}
			MoCheck.setAktListe(newName);
			msg = MoCheck.getString('message.listCreated', newName);
			break;
		case 'deleteListe':
			if(confirm(unescape(MoCheck.getString('message.deleteList', selectedListe)))) {
				MoCheck.deleteListe(selectedListe);
				msg = MoCheck.getString('message.listDeleted', selectedListe);
			}
			break;
		case 'renameListe':
			var newName = prompt(MoCheck.getString("message.newName"), selectedListe);
			if(newName == null || newName.length == 0) {
				return;
			}
			if($defined(this.jobCoords[newName])) {
				new HumanMessage(MoCheck.getString('message.error.nameAlreadyDefined', newName));
				return;
			}
			/* Neue Liste erstellen */
			MoCheck.addListe(newName);
			
			/* Neue Liste kopieren */
			this.jobCoords[newName] = this.jobCoords[selectedListe];
			
			/* Alte Liste loeschen */
			MoCheck.deleteListe(selectedListe, newName);

			
			msg = MoCheck.getString('message.listRenamed');
			break;
	}
	
	/* Jobs neu laden */
	MoCheck.getAllJobInfoFromServer();
	
	this.setCookie();
	
	/* Nachricht anzeigen */
	if(msg != '') {
		new HumanMessage(msg, {type:'success'});
	}
}

/**
 * Eine Arbeit der Liste hinzufuegen
 */
MoCheck.addJob = function(x, y) {
	/* Jobcoords in Array aufnehmen TODO das geht doch auch schoener... */
	var job = new Object();
	job.pos = new Object();
	job.pos.x = x;
	job.pos.y = y;
	
	MoCheck.getJobCoords().splice(0, 0, job);
	
	/* Arbeit in Cookie speichern */
	this.setCookie();
	
	/* Fenster schlieГџen, auslesen und neu oeffnen */
	MoCheck.getJobInfoFromServer(x, y);
	
	new HumanMessage(MoCheck.getString('message.addedWork'), {type:'success'});
}

/**
 * Eine Arbeit aus der Liste entfernen
 */
MoCheck.deleteJob = function(x, y) {
	$each(MoCheck.aktJobs, function(windowJob, index) {
		if(x == windowJob.pos.x && y == windowJob.pos.y) {
			if(confirm(unescape(MoCheck.getString('message.deleteFromList', windowJob.name)))) {
				/* Arbeit aus beiden Arrays entfernen */
				MoCheck.aktJobs.splice(index, 1);
				$each(MoCheck.getJobCoords(), function(jobCoords, coordIndex) {
					if(x == jobCoords.pos.x && y == jobCoords.pos.y) {
						MoCheck.getJobCoords().splice(coordIndex, 1);
					}
				});
				/* Arbeit aus Cookie loeschen */
				MoCheck.setCookie();
				
				/* Fenster neu laden */
				MoCheck.openMotivationWindow();
				
				/* Add-Button einfuegen */
				MoCheck.setAddButton($('window_job_' + windowJob.pos.x + '_' + windowJob.pos.y + '_content'));
			}
		}
	});
}

/*
 * Arbeiten werden aus Platzgruenden etwas komprimiert gespeichert:
 * version/aktListe/liste1*x.y*x.y*x.y/liste2*x.y*x.y   usw.
 */
MoCheck.getCookie = function() {
	var cookieVersion = "0";
	var data = "{}";
	
	if (document.cookie.indexOf(MoCheck.cookieName) != -1)  {
		var cookieContent = (document.cookie + ";").match(eval('/' + MoCheck.cookieName + '=.*?;/gi'));
		data = cookieContent[0].substring(MoCheck.cookieName.length + 1, cookieContent[0].length-1);
		
		data = unescape(data);
		
		var cookieElements = data.split(MoCheck.cookieSplitter[0]);
		cookieVersion = cookieElements[0];
		var aktListe = cookieElements[1];
		
		/* Arbeiten importieren */
		var arbeiten = '';
		var columnVisibility = '';
		for(var i=2; i < cookieElements.length; i++) {
			/* Aktuelle Liste in Json-Format bringen */
			var listElements = cookieElements[i].split(MoCheck.cookieSplitter[1]);
			var listenName = listElements[0];
			
			/* Sichtbare Spalten (Ab Version 1.1.3) */
			var coordsStartIndex = 1;
			var cols = "1111";
			if(this.isMinVersion(cookieVersion, "1.1.3")) {
				cols = listElements[1];
				coordsStartIndex = 2;
			}
			columnVisibility += (columnVisibility == '' ? '' : ',') + '"' + listenName + '":' + '"' + cols + '"';
			
			/* Coords der Arbeiten */
			var coordList = '';
			for(var j = coordsStartIndex; j < listElements.length; j++) {
				/* Aktuelle Arbeit in Json-Format bringen */
				var coords = listElements[j].split(MoCheck.cookieSplitter[2]);
				var aktArbeit = '{"pos":{"x":"' + coords[0] + '","y":"' + coords[1]+'"}}';
				coordList += (coordList == '' ? '' : ',') + aktArbeit;
			}
			coordList = '"' + listenName + '": [' + coordList + ']';
			arbeiten += (arbeiten == '' ? '' : ',') + coordList;
		}
		data = '{"aktListe":"' + aktListe + '", "arbeiten":{' + arbeiten + '}, "columnVisibility": {' + columnVisibility + '}}';
	}
	
	/****** Daten in MoCheck laden ******/
	data = Json.evaluate(data);
	
	/* Liefert zu einem Listennamen die Koordinaten der darin gespeicherten Arbeiten */
	this.jobCoords = $defined(data.arbeiten) ? data.arbeiten : new Object();

	/****** Verwendete (nicht leere) Listen ermitteln ******/
	this.listen = new Array();
	for (liste in this.jobCoords) {
		if(this.jobCoords[liste].length > 0) {
			this.listen.push(liste);
		}
	}
	MoCheck.setAktListe(data.aktListe);

	/****** Sichtbarkeiten ******/
	this.columnVisibility = new Object();
	if($defined(data.columnVisibility)) {
		$each(data.columnVisibility, function(colStr, liste) {
			var columnVisibility = new MoCheck.ColumnVisibility(Boolean(Number(colStr[0])), Boolean(Number(colStr[1])), Boolean(Number(colStr[2])), Boolean(Number(colStr[3])));
			MoCheck.setColumnVisibility(columnVisibility, liste);
		});
	}

	/****** ggf. Cookie direkt in neuer Version speichern ******/
	if(!this.isMinVersion(cookieVersion, this.getMoCheckVersion())) {
		this.setCookie();
	}
	/* ggf. Arbeiten aus aelterer Version loeschen */
	if (document.cookie.indexOf(MoCheck.oldCookieName) != -1)  {
		document.cookie = MoCheck.oldCookieName + "=; expires=0";
	}
}

MoCheck.setCookie = function() {
	/* Arbeiten exportieren */
	var exportArbeiten = '';

	for (liste in this.jobCoords) {
		/* Leere Listen werden nicht gespeichert */
		if(this.jobCoords[liste] != null && this.jobCoords[liste].length > 0) {
			var aktListe = '';
			var arbeiten = this.jobCoords[liste];
			
			$each(arbeiten, function(arbeit, index) {
				var aktArbeit = arbeit.pos.x + MoCheck.cookieSplitter[2] + arbeit.pos.y;
				aktListe += (aktListe == '' ? '' : MoCheck.cookieSplitter[1]) + aktArbeit;
			});
			
			exportArbeiten +=  MoCheck.cookieSplitter[0] + liste + MoCheck.cookieSplitter[1] + this.getColumnVisibility(liste).toString2() + MoCheck.cookieSplitter[1] + aktListe;
		}
	}
	var data = MoCheck.getMoCheckVersion() + MoCheck.cookieSplitter[0] + MoCheck.aktListe + exportArbeiten;
	data = escape(data);
	var expires = new Date();
	expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 365));/* 1 Jahr */

	document.cookie = MoCheck.cookieName + "=" + data + "; expires=" + expires.toGMTString();
}

MoCheck.getString = function(key, param) {
	var str = $defined(MoCheck.resourceBundle[key]) ? MoCheck.resourceBundle[key] : key;
	
	if($defined(param)) {
		if (!(param instanceof Array)) { param = new Array(param); }
		for(var i=0; i<param.length; i++) {
			str = str.replace('%'+(i+1), param[i]);
		}
	}
	return str;
};

/********************************
** Sichtbarkeit der Spalten *****
********************************/

/**
 * Setzt die sichtbaren Spalten einer uebergebenen Liste
 * Falls listenName leer: Sichtbare Spalten der aktuellen Liste
 * @columnVisibility als Object, z.B. {'column1':Bool, 'column2':Bool, 'column3':Bool};
 */
MoCheck.setColumnVisibility = function(columnVisibility, listenName) {
	listenName = $defined(listenName) ? listenName : this.aktListe;
	this.columnVisibility[listenName] = columnVisibility;
}

/*
 * Liefert die sichtbaren Spalten einer uebergebenen Liste
 * Falls listenName leer: Sichtbare Spalten der aktuellen Liste
 */
MoCheck.getColumnVisibility = function(listenName){
	listenName = $defined(listenName) ? listenName : this.aktListe;
	var result = $defined(this.columnVisibility[listenName]) ? this.columnVisibility[listenName] : new MoCheck.ColumnVisibility(true, true, true, true);
	return result;
}

MoCheck.isColumnVisible = function(column) {
	return eval('this.getColumnVisibility().show_' + column + '()');
}

MoCheck.changeColumnVisibility = function(str, isVisible) {
	var cols2 = MoCheck.getColumnVisibility();
	eval('cols2.' + str + '=' + isVisible + ';');
	this.setColumnVisibility(cols2);
	MoCheck.setCookie();
	MoCheck.openMotivationWindow();
}

/********************************
** Sonstiges ********************
********************************/


MoCheck.isMinVersion = function(a, b) {
	var result = true;
	a = a.replace(/\./g, "");
	b = b.replace(/\./g, "");
	for (var i = 1; i <= Math.max(a.length, b.length); i++) {
		var z1 = parseInt(a.length >= i ? a[i-1] : "0");
		var z2 = parseInt(b.length >= i ? b[i-1] : "0");
		if(z1 > z2) {
			break;
		}
		if(z1 < z2) {
			result = false;
			break;
		}
	}
	return result;
}

MoCheck.getLanguage = function(lang) {
	res = new Array();
	res['en'] = {
		'dialog.closeAll.popup':'Close All',
		'dialog.minimize.popup':'Minimize',
		'dialog.close.popup':'Close',

		'dialog.tab.work.titel':'Job',
		'dialog.tab.about.titel':'About',
		'dialog.tab.work.nothingSelected.1':'There is no selected work!',
		'dialog.tab.work.nothingSelected.2':'You need to open a job and add it.',
		'dialog.tab.work.tableHeader.work':'Work',
		'dialog.tab.work.tableHeader.points':'Labor Points',
		'dialog.tab.work.tableHeader.money':'Wages',
		'dialog.tab.work.tableHeader.experience':'Experience',
		'dialog.tab.work.tableHeader.luck':'Luck',
		'dialog.tab.work.tableHeader.motivation':'Motivation',
		
		'dialog.tab.configuration.actual':'actual',
		'dialog.tab.configuration.btnDelete.popup':'Delete list',
		'dialog.tab.configuration.btnRename.popup':'Rename list',
		'dialog.tab.configuration.btnNew.popup':'Create new List',
	
		'select.option.minutes':'m',
		'select.option.hours':'h',
		
		'btnOk.label':'Ok',
		'btnAdd.popup':'Add Job',
		'btnCenter.popup':'<b>Transit time:</b> %1h',
		'btnDelete.popup':'Delete job from the list',
		
		'sortIcon.popup.money':'Sort by <b>wages</b>',
		'sortIcon.popup.luck':'Sort by <b>luck</b>',
		'sortIcon.popup.experience':'Sort by <b>experience</b>',
		'sortIcon.popup.motivation':'Sort by <b>motivation</b>',
		
		'visibleIcon.popup.money':'Show /don\'t show <b>wages</b>',
		'visibleIcon.popup.luck':'Show /don\'t show <b>luck</b>',
		'visibleIcon.popup.experience':'Show /don\'t show <b>experience</b>',
		'visibleIcon.popup.motivation':'Show /don\'t show <b>motivation</b>',
		
		'jobImage.popup':'Job: <b>%1</b><br />Labor points: <b>%2</b>',
	
		'message.error.unableToDeleteCurrentList':'Unable to delete current list.',
		'message.deleteList':'Delete List %1?',
		'message.newName':'New name:',
		'message.addedWork':'Added job.',
		'message.deleteFromList':'Delete %1 from list?',
		'message.listLoaded':'Loaded %1.',
		'message.listDeleted':'Deleted %1.',
		'message.listRenamed':'Renamed list.',
		'message.listCreated':'Created list.',
		'message.error.nameAlreadyDefined': 'Name %1 already in use.',
		
//		'author':'Author:'
	};
	res['de'] = {
		'dialog.closeAll.popup':'Alle Fenster schlie&szlig;en',
		'dialog.minimize.popup':'Fenster minimieren',
		'dialog.close.popup':'Fenster schlie&szlig;en',

		'dialog.tab.work.titel':'Arbeiten',
		'dialog.tab.about.titel':'&Uuml;ber',
		'dialog.tab.work.nothingSelected.1':'Es wurden noch keine Arbeiten ausgew&auml;hlt!',
		'dialog.tab.work.nothingSelected.2':'Hierf&uuml;r musst du eine Arbeit &ouml;ffnen und diese hinzuf&uuml;gen.',
		'dialog.tab.work.tableHeader.work':'Arbeit',
		'dialog.tab.work.tableHeader.points':'Arbeitspunkte',
		'dialog.tab.work.tableHeader.money':'Lohn',
		'dialog.tab.work.tableHeader.experience':'Erfahrung',
		'dialog.tab.work.tableHeader.luck':'Gl&uuml;ck',
		'dialog.tab.work.tableHeader.motivation':'Motivation',
		
		'dialog.tab.configuration.actual':'aktuell',
		'dialog.tab.configuration.btnDelete.popup':'Liste l&ouml;schen',
		'dialog.tab.configuration.btnRename.popup':'Liste umbenennen',
		'dialog.tab.configuration.btnNew.popup':'Neue Liste erstellen',
	
		'select.option.minutes':'m',
		'select.option.hours':'h',
		
		'btnOk.label':'Ok',
		'btnAdd.popup':'Zum Motivations-Check hinzuf&uuml;gen',
		'btnCenter.popup':'<b>Wegzeit:</b> %1h',
		'btnDelete.popup':'Arbeit aus dieser Liste l&ouml;schen',
		
		'sortIcon.popup.money':'Nach <b>Lohn</b> sortieren',
		'sortIcon.popup.luck':'Nach <b>Gl&uuml;ck</b> sortieren',
		'sortIcon.popup.experience':'Nach <b>Erfahrung</b> sortieren',
		'sortIcon.popup.motivation':'Nach <b>Motivation</b> sortieren',
		
		'visibleIcon.popup.money':'<b>Lohn</b> ein-/ausblenden',
		'visibleIcon.popup.luck':'<b>Gl&uuml;ck</b> ein-/ausblenden',
		'visibleIcon.popup.experience':'<b>Erfahrung</b> ein-/ausblenden',
		'visibleIcon.popup.motivation':'<b>Motivation</b> ein-/ausblenden',
		
		'jobImage.popup':'Arbeit: <b>%1</b><br />Arbeitspunkte: <b>%2</b>',
	
		'message.error.unableToDeleteCurrentList':'Die aktuelle Liste kann nicht gel&ouml;scht werden.',
		'message.deleteList':'Liste %1 l%F6schen?',
		'message.newName':'Neuer Name der Liste:',
		'message.addedWork':'Arbeit hinzugef&uuml;gt.',
		'message.deleteFromList':'%1 aus dieser Liste l%F6schen?',
		'message.listLoaded':'%1 wurde geladen.',
		'message.listDeleted':'%1 wurde gel&ouml;scht.',
		'message.listRenamed':'Liste wurde umbenannt.',
		'message.listCreated':'Liste wurde erstellt.',
		'message.error.nameAlreadyDefined': 'Der Name %1 wird bereits verwendet.',
		
//		'author':'Autor:'
	};
	res['ru'] = {
		'dialog.closeAll.popup':'Закрыть все окна',
		'dialog.minimize.popup':'Свернуть окно',
		'dialog.close.popup':'Закрыть окно',

		'dialog.tab.work.titel':'Работы',
		'dialog.tab.about.titel':'О скрипте',
		'dialog.tab.work.nothingSelected.1':'Не выбрана ни одна работа!',
		'dialog.tab.work.nothingSelected.2':'Вам нужно открыть работу и добавить её.',
		'dialog.tab.work.tableHeader.work':'Work',
		'dialog.tab.work.tableHeader.points':'Очки труда',
		'dialog.tab.work.tableHeader.money':'Заработок',
		'dialog.tab.work.tableHeader.experience':'Опыт',
		'dialog.tab.work.tableHeader.luck':'Удача',
		'dialog.tab.work.tableHeader.motivation':'Мотивация',
		
		'dialog.tab.configuration.actual':'текущий',
		'dialog.tab.configuration.btnDelete.popup':'Удалить список',
		'dialog.tab.configuration.btnRename.popup':'Переименовать список',
		'dialog.tab.configuration.btnNew.popup':'Создать список',
	
		'select.option.minutes':'м',
		'select.option.hours':'ч',
		
		'btnOk.label':'Ok',
		'btnAdd.popup':'Добавить работу',
		'btnCenter.popup':'<b>Расстояние:</b> %1',
		'btnDelete.popup':'Удалить работу из списка',
		
		'sortIcon.popup.money':'Сортировать по <b>заработку</b>',
		'sortIcon.popup.luck':'Сортировать по <b>удаче</b>',
		'sortIcon.popup.experience':'Сортировать по <b>опыту</b>',
		'sortIcon.popup.motivation':'Сортировать по <b>мотивации</b>',
		
		'visibleIcon.popup.money':'Показать /скрыть <b>заработок</b>',
		'visibleIcon.popup.luck':'Показать /скрыть <b>удачу</b>',
		'visibleIcon.popup.experience':'Показать /скрыть <b>опыт</b>',
		'visibleIcon.popup.motivation':'Показать /скрыть <b>мотивацию</b>',
		
		'jobImage.popup':'Работа: <b>%1</b><br />Очки труда: <b>%2</b>',
	
		'message.error.unableToDeleteCurrentList':'Не удаётся удалить текущий список.',
		'message.deleteList':'Удалить список %1?',
		'message.newName':'Новое имя:',
		'message.addedWork':'Работа добавлена.',
		'message.deleteFromList':'Удалить %1 из списка?',
		'message.listLoaded':'Загружен %1.',
		'message.listDeleted':'Удален %1.',
		'message.listRenamed':'Список переименован.',
		'message.listCreated':'Список создан.',
		'message.error.nameAlreadyDefined': 'Имя %1 уже используется.',
		
//		'author':'Переводчик: <b>Enfo</b>. Автор:'
	};	
	return (res[lang] != null ? res[lang] : res['en']);
}

//var moFunctions = ['init', 'addMotivationButton', 'openMotivationWindow',
//					'setAktListe', 'showTab',
var moFunctions = ['init', 'openMotivationWindow',
					'getJsParam', 'setTrigger', 'lo', 'addSortIcon', 'addVisibleIcon', 'getJobImageDiv', 
					'getCookie', 'setCookie', 'addJobRow', 'getLanguage', 'durationChanged', 
					'getJobCoords', 'reloadWindow', 'setAddButton', 
					'setAktListe',
					'setColumnVisibility', 'getColumnVisibility', 'isColumnVisible', 'changeColumnVisibility', 
					'addListe', 'deleteListe',
					'getMoCheckVersion', 'isMinVersion',
					'getString', 'getJobInfoFromServer', 'getAllJobInfoFromServer', 'readJobInfo', 
					'sortArbeiten', 'changeSortOrder', 
					'doConfiguration', 
					'addJob', 'deleteJob']; //, 'getAuthor'

var moCheck_script = document.createElement('script');
moCheck_script.type='text/javascript';
moCheck_script.text =  'if(window.MoCheck == undefined) {\n';
moCheck_script.text += '  window.MoCheck = new Object();\n';

for (var i = 0; i< moFunctions.length; i++) {
	var moFunction = '  MoCheck.'+moFunctions[i];
	moCheck_script.text +=  moFunction + ' = ' + eval(moFunction.toString()) + '\n';
};
moCheck_script.text += '}';
moCheck_script.text += '  MoCheck.init();\n';
document.body.appendChild(moCheck_script);



/********************************
** Monkey Updater ***************
********************************/
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today=new Date();GM_setValue('muUpdateParam_116',String(today));}function CheckForUpdate(){var lastupdatecheck=GM_getValue('muUpdateParam_116','never');var updateURL='http://www.monkeyupdater.com/scripts/updater.php?id=116&version='+getMoCheckVersion();var today=new Date();var one_day=24*60*60*1000;if(lastupdatecheck!='never'){today=today.getTime();var lastupdatecheck=new Date(lastupdatecheck).getTime();var interval=(today-lastupdatecheck)/one_day;if(interval>=1){update(updateURL);}}else{update(updateURL);}}CheckForUpdate();

// скорость лошадей = ОКРУГЛ(100/(100+%);4)

//====================================== BEST ITEMS ====================================

var menu_pk_s3 = document.createElement("div");
menu_pk_s3.id="menu_pk_s3";
menu_pk_s3.innerHTML = '<a id=\"_menu_pk_s3\" title=\"Открыть окно настроек сундучка-переодевалки\" href=\"javascript:PK_S3.show_window_settings(false);void(0);\"></a>';
addGlobalStyle('#menu_pk_s3 { background:url(data:image/png;base64,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%3D); }');

addGlobalStyle('.bug_mini { width:35px; height:35px; background:url(data:image/png;base64,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); }');
addGlobalStyle('#window_pereodevalka_setting_title {background:url(data:image/png;base64,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%3D); background-repeat:no-repeat; background-position: center top;}');
addGlobalStyle('#window_pereodevalka_informer_title {background:url(data:image/png;base64,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); background-repeat:no-repeat; background-position: center top;}');
addGlobalStyle('#window_pereodevalka_rezult_title {background:url(data:image/png;base64,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%3D%3D); background-repeat:no-repeat; background-position: center top;}');
addGlobalStyle('.bug_mini_red { width:35px; height:35px; background:url(data:image/png;base64,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); }');

    // добавляем меню "Лево" под "Багаж"

var menu_inventory = document.getElementById('menu_inventory');
if (menu_inventory) {
    menu_inventory.parentNode.insertBefore(menu_pk_s3, menu_inventory.nextSibling);
}

var pk_s3_code='';
var pk_s3_body, pk_s3_script, pk_s3_style, pk_s3_head; 
pk_s3_body = document.getElementsByTagName('body')[0];
pk_s3_script = document.createElement('script');
pk_s3_script.type = 'text/javascript';


PK_S3 = new Object();

PK_S3.init = function(){

    PK_S3.types = ['head', 'body', 'foot', 'belt', 'neck', 'pants', 'animal', 'right_arm', 'left_arm', 'yield'];
    PK_S3.types_name = ['Головной убор', 'Одежда', 'Обувь', 'Пояс', 'Шейная повязка', 'Штаны', 'Верховое животное', 'Дуэльное оружие', 'Фортовое оружие', 'Продукт'];
    PK_S3.nabory=['set_farmer', 'set_mexican', 'set_indian', 'set_quackery', 'set_pilgrim_male', 'set_pilgrim_female', 'set_gentleman', 'set_dancer', 'fireworker_set', 'gold_set', 'greenhorn_set', 'set_sleeper', 'season_set'];
    PK_S3.skills = ['build', 'punch', 'tough', 'endurance', 'health', 'ride', 'reflex', 'dodge', 'hide', 'swim', 'aim', 'shot', 'pitfall', 'finger_dexterity', 'repair', 'leadership', 'tactic', 'trade', 'animal', 'appearance'];
    PK_S3.skillsi = {build: 0, punch:1, tough:2, endurance:3, health:4, ride:5, reflex:6, dodge:7, hide:8, swim:9, aim:10, shot:11, pitfall:12, finger_dexterity:13, repair:14, leadership:15, tactic:16, trade:17, animal:18, appearance:19}
    PK_S3.attributes = ['strength', 'flexibility', 'dexterity', 'charisma'];
    PK_S3.skill2atr = {build:'strength', punch:'strength', tough:'strength', endurance:'strength', health:'strength',ride:'flexibility', reflex:'flexibility', dodge:'flexibility', hide:'flexibility', swim:'flexibility',aim:'dexterity', shot:'dexterity', pitfall:'dexterity', finger_dexterity:'dexterity', repair:'dexterity', leadership:'charisma', tactic:'charisma', trade:'charisma', animal:'charisma', appearance:'charisma'};
    PK_S3.informer = '';
    PK_S3.rezultat = '';
    PK_S3.fort_affects = ['defense', 'offense', 'damage'];
    PK_S3.vsego_s_TO = 10;
    
    
    PK_S3.bonus = {};
    PK_S3.bonus.speed = (Character.characterClass != 'duelist') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.money = (PremiumBoni.hasBonus('money')) ? 1.5 : 1.0;
    PK_S3.bonus.drop = (Character.characterClass != 'adventurer') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.life = (Character.characterClass != 'soldier') ? 10 : (PremiumBoni.hasBonus('character')) ? 20 : 15;
    PK_S3.bonus.exp = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.build = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.weapon = (Character.characterClass != 'soldier') ? 0 : (PremiumBoni.hasBonus('character')) ? 6 : 3;
    PK_S3.bonus.leader = (Character.characterClass != 'soldier') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.5 : 1.25;

    
    PK_S3.items = [];
    PK_S3.raboty = [];
    PK_S3.komplekty = {};
    
    PK_S3.raboty.max = 127;
    PK_S3.raboty.build = 199;
    PK_S3.raboty.moving = 200;
    PK_S3.raboty.health = 201;
    PK_S3.raboty.energy = 202;
    PK_S3.raboty.fort_min = 301;
    PK_S3.raboty.fort_max = 400;
    PK_S3.raboty.fort_middle = 304;
    PK_S3.raboty.duel_min = 401;
    PK_S3.raboty.duel_max = 500;
    //PK_S3.raboty.surprise = 999;
    

    PK_S3.rekurs = {};
    PK_S3.rekurs.max_count = 2000;
    PK_S3.rekurs.time = 0;
    PK_S3.rekurs.working = 1024;
    PK_S3.rekurs.delay = 32;
    PK_S3.rekurs.itteration = 0;
    PK_S3.rekurs.overflow = 5;

    PK_S3.vyvod = {};
    PK_S3.vyvod.type = 'name';
    PK_S3.vyvod.negativ = false;
    PK_S3.vyvod.nativ = false;
    PK_S3.vyvod.to = 0;
//    PK_S3.vyvod.type_old = 'nothing';
    PK_S3.cookies = {};
    PK_S3.cookies.save = [];


    PK_S3.progress = {};
    PK_S3.progress.percent = 0;
    PK_S3.progress.id = 0;
    PK_S3.progress.array_mask = [];
    var temp_progress_summ = 0;
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    for (var i = 0; i <= max_mask / 2; ++i){
	PK_S3.progress.array_mask[i] = 0;
	for (var j = i + 1; j < max_mask; ++j){
	    if (!(i&j)){
		++temp_progress_summ;
	    }
	}
	PK_S3.progress.array_mask[i] = temp_progress_summ;
    }
    for (var i = 0; i <= max_mask / 2; ++i){
	PK_S3.progress.array_mask[i] /= temp_progress_summ;
    }

    PK_S3.text_info = '';
    

    PK_S3.odevalo4ka = {};
    PK_S3.odevalo4ka.items = [];
    PK_S3.odevalo4ka.wait_inventory = 2000;
    PK_S3.odevalo4ka.wait_carry = 1000;
    PK_S3.odevalo4ka.repeat = 10;
    PK_S3.odevalo4ka.count = 0;
    PK_S3.odevalo4ka.bagazh = false;
    
    PK_S3.forty = {};
    PK_S3.forty.ves = {aim:1, dodge:1, leadership:1, skill:1};
    PK_S3.forty.is_zero = true;

    
    PK_S3.items[0] = {item_id:0, nshort:'nothing', name:'заглушка', type:'zaty4ka', level:0, price:0, image:'/images/items/unknown.png?1', image_mini:'/images/items/unknown.png?1', set:{}, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:7}, sub_type:'hand'};
    PK_S3.items[1] = {item_id:1, nshort:'clayjug', name:'Разбитый глиняный кувшин', type:'right_arm', level:1, price:16, image:'/images/items/right_arm/clayjug.png?1', image_mini:'/images/items/right_arm/mini/clayjug.png?1', set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:7}, sub_type:'hand'};
    PK_S3.items[2] = {item_id:2, nshort:'winebottle', name:'Разбитая винная бутылка', type:'right_arm', level:5, price:26, image:'/images/items/right_arm/winebottle.png?1', image_mini:'/images/items/right_arm/mini/winebottle.png?1', set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:2, damage_max:10}, sub_type:'hand'};
    PK_S3.items[3] = {item_id:3, nshort:'whiskeybottle', name:'Разбитая бутылка виски', type:'right_arm', level:7, price:40, image:'/images/items/right_arm/whiskeybottle.png?1', image_mini:'/images/items/right_arm/mini/whiskeybottle.png?1', set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:3, damage_max:13}, sub_type:'hand'};
PK_S3.items[4] = {item_id:4, nshort:'rotty_club', name:'Гнилая дубинка', type:'right_arm', level:7, price:26, image:'/images/items/right_arm/rotty_club.png?1', image_mini:'/images/items/right_arm/mini/rotty_club.png?1', set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:3, damage_max:9}, sub_type:'hand'};
    PK_S3.items[5] = {item_id:5, nshort:'club', name:'Дубинка', type:'right_arm', level:10, price:63, image:'/images/items/right_arm/club.png?1', image_mini:'/images/items/right_arm/mini/club.png?1', set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:6, damage_max:12}, sub_type:'hand'};
    PK_S3.items[6] = {item_id:6, nshort:'nail_club', name:'Дубинка с шипом', type:'right_arm', level:13, price:125, image:'/images/items/right_arm/nail_club.png?1', image_mini:'/images/items/right_arm/mini/nail_club.png?1', set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:8, damage_max:16}, sub_type:'hand'};
    PK_S3.items[7] = {item_id:7, nshort:'rusty_razor', name:'Ржавая бритва', type:'right_arm', level:12, price:64, image:'/images/items/right_arm/rusty_razor.png?1', image_mini:'/images/items/right_arm/mini/rusty_razor.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:7, damage_max:11}, sub_type:'hand'};
    PK_S3.items[8] = {item_id:8, nshort:'razor', name:'Бритва', type:'right_arm', level:15, price:146, image:'/images/items/right_arm/razor.png?1', image_mini:'/images/items/right_arm/mini/razor.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:11, damage_max:15}, sub_type:'hand'};
    PK_S3.items[9] = {item_id:9, nshort:'sharp_razor', name:'Острая бритва', type:'right_arm', level:18, price:354, image:'/images/items/right_arm/sharp_razor.png?1', image_mini:'/images/items/right_arm/mini/sharp_razor.png?1', bonus:{skills:{aim:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:14, damage_max:20}, sub_type:'hand'};
    PK_S3.items[10] = {item_id:10, nshort:'figaros_razor', name:'Бритва Фигаро', type:'right_arm', level:25, price:1740, image:'/images/items/right_arm/figaros_razor.png?1', image_mini:'/images/items/right_arm/mini/figaros_razor.png?1', bonus:{skills:{finger_dexterity:3, aim:3}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:32, damage_max:48}, sub_type:'hand'};
    PK_S3.items[11] = {item_id:11, nshort:'rusty_skewer', name:'Ржавый кинжал', type:'right_arm', level:17, price:122, image:'/images/items/right_arm/rusty_skewer.png?1', image_mini:'/images/items/right_arm/mini/rusty_skewer.png?1', set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:7, damage_max:17}, sub_type:'hand'};
    PK_S3.items[12] = {item_id:12, nshort:'skewer', name:'Кинжал', type:'right_arm', level:20, price:384, image:'/images/items/right_arm/skewer.png?1', image_mini:'/images/items/right_arm/mini/skewer.png?1', bonus:{skills:{punch:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:13, damage_max:23}, sub_type:'hand'};
    PK_S3.items[13] = {item_id:13, nshort:'sharp_skewer', name:'Острый кинжал', type:'right_arm', level:23, price:554, image:'/images/items/right_arm/sharp_skewer.png?1', image_mini:'/images/items/right_arm/mini/sharp_skewer.png?1', bonus:{skills:{punch:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:18, damage_max:28}, sub_type:'hand'};
    PK_S3.items[14] = {item_id:14, nshort:'codys_skewer', name:'Кинжал Коди', type:'right_arm', level:30, price:2600, image:'/images/items/right_arm/codys_skewer.png?1', image_mini:'/images/items/right_arm/mini/codys_skewer.png?1', bonus:{skills:{health:4, punch:3}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:42, damage_max:60}, sub_type:'hand'};
    PK_S3.items[15] = {item_id:15, nshort:'rusty_bowie', name:'Ржавый нож', type:'right_arm', level:27, price:450, image:'/images/items/right_arm/rusty_bowie.png?1', image_mini:'/images/items/right_arm/mini/rusty_bowie.png?1', bonus:{skills:{appearance:1}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:16, damage_max:24}, sub_type:'hand'};
    PK_S3.items[16] = {item_id:16, nshort:'bowie', name:'Нож', type:'right_arm', level:30, price:850, image:'/images/items/right_arm/bowie.png?1', image_mini:'/images/items/right_arm/mini/bowie.png?1', bonus:{skills:{appearance:2}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:22, damage_max:34}, sub_type:'hand'};
    PK_S3.items[17] = {item_id:17, nshort:'sharp_bowie', name:'Острый нож', type:'right_arm', level:33, price:1220, image:'/images/items/right_arm/sharp_bowie.png?1', image_mini:'/images/items/right_arm/mini/sharp_bowie.png?1', bonus:{skills:{appearance:2}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:32, damage_max:40}, sub_type:'hand'};
    PK_S3.items[18] = {item_id:18, nshort:'bowies_knife', name:'Нож Бови', type:'right_arm', level:40, price:4600, image:'/images/items/right_arm/bowies_knife.png?1', image_mini:'/images/items/right_arm/mini/bowies_knife.png?1', bonus:{skills:{appearance:4, pitfall:5}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:68, damage_max:80}, sub_type:'hand'};
    PK_S3.items[19] = {item_id:19, nshort:'rusty_foil', name:'Ржавая рапира', type:'right_arm', level:32, price:730, image:'/images/items/right_arm/rusty_foil.png?1', image_mini:'/images/items/right_arm/mini/rusty_foil.png?1', bonus:{skills:{tactic:2}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:18, damage_max:32}, sub_type:'hand'};
    PK_S3.items[20] = {item_id:20, nshort:'foil', name:'Рапира', type:'right_arm', level:35, price:1134, image:'/images/items/right_arm/foil.png?1', image_mini:'/images/items/right_arm/mini/foil.png?1', bonus:{skills:{tactic:2}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:24, damage_max:44}, sub_type:'hand'};
    PK_S3.items[21] = {item_id:21, nshort:'sharp_foil', name:'Острая рапира', type:'right_arm', level:38, price:1655, image:'/images/items/right_arm/sharp_foil.png?1', image_mini:'/images/items/right_arm/mini/sharp_foil.png?1', bonus:{skills:{tactic:3}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:30, damage_max:54}, sub_type:'hand'};
    PK_S3.items[22] = {item_id:22, nshort:'athos_foil', name:'Рапира Атоса', type:'right_arm', level:45, price:5775, image:'/images/items/right_arm/athos_foil.png?1', image_mini:'/images/items/right_arm/mini/athos_foil.png?1', bonus:{skills:{finger_dexterity:5, endurance:6}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:68, damage_max:100}, sub_type:'hand'};
    PK_S3.items[23] = {item_id:23, nshort:'rusty_machete', name:'Ржавый мачете', type:'right_arm', level:37, price:940, image:'/images/items/right_arm/rusty_machete.png?1', image_mini:'/images/items/right_arm/mini/rusty_machete.png?1', bonus:{skills:{tough:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:5, damage_max:55}, sub_type:'hand'};
    PK_S3.items[24] = {item_id:24, nshort:'machete', name:'Мачете', type:'right_arm', level:40, price:1560, image:'/images/items/right_arm/machete.png?1', image_mini:'/images/items/right_arm/mini/machete.png?1', bonus:{skills:{tough:3}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:10, damage_max:70}, sub_type:'hand'};
    PK_S3.items[25] = {item_id:25, nshort:'sharp_machete', name:'Острый мачете', type:'right_arm', level:43, price:2150, image:'/images/items/right_arm/sharp_machete.png?1', image_mini:'/images/items/right_arm/mini/sharp_machete.png?1', bonus:{skills:{tough:3}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:15, damage_max:85}, sub_type:'hand'};
    PK_S3.items[26] = {item_id:26, nshort:'nats_machete', name:'Мачете Ната', type:'right_arm', level:50, price:6750, image:'/images/items/right_arm/nats_machete.png?1', image_mini:'/images/items/right_arm/mini/nats_machete.png?1', bonus:{skills:{leadership:6, tough:6}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:20, damage_max:163}, sub_type:'hand'};
    PK_S3.items[27] = {item_id:27, nshort:'rusty_conquistador', name:'Ржавый меч конкистадора', type:'right_arm', level:47, price:1710, image:'/images/items/right_arm/rusty_conquistador.png?1', image_mini:'/images/items/right_arm/mini/rusty_conquistador.png?1', bonus:{skills:{reflex:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:37, damage_max:49}, sub_type:'hand'};
    PK_S3.items[28] = {item_id:28, nshort:'conquistador', name:'Меч конкистадора', type:'right_arm', level:50, price:2560, image:'/images/items/right_arm/conquistador.png?1', image_mini:'/images/items/right_arm/mini/conquistador.png?1', bonus:{skills:{reflex:4}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:48, damage_max:60}, sub_type:'hand'};
    PK_S3.items[29] = {item_id:29, nshort:'sharp_conquistador', name:'Острый меч конкистадора', type:'right_arm', level:53, price:3370, image:'/images/items/right_arm/sharp_conquistador.png?1', image_mini:'/images/items/right_arm/mini/sharp_conquistador.png?1', bonus:{skills:{reflex:5}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:54, damage_max:74}, sub_type:'hand'};
    PK_S3.items[30] = {item_id:30, nshort:'henandos_conquistador', name:'Меч Эрнандо', type:'right_arm', level:50, price:8700, image:'/images/items/right_arm/henandos_conquistador.png?1', image_mini:'/images/items/right_arm/mini/henandos_conquistador.png?1', bonus:{skills:{trade:6, reflex:7}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:95, damage_max:125}, sub_type:'hand'};
    PK_S3.items[31] = {item_id:31, nshort:'rusty_tomahawk', name:'Ржавый Томагавк', type:'right_arm', level:57, price:2900, image:'/images/items/right_arm/rusty_tomahawk.png?1', image_mini:'/images/items/right_arm/mini/rusty_tomahawk.png?1', bonus:{skills:{hide:2, dodge:3}}, set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:43, damage_max:71}, sub_type:'hand'};
    PK_S3.items[32] = {item_id:32, nshort:'tomahawk', name:'Томагавк', type:'right_arm', level:60, price:3800, image:'/images/items/right_arm/tomahawk.png?1', image_mini:'/images/items/right_arm/mini/tomahawk.png?1', bonus:{skills:{hide:3, dodge:3}}, set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:50, damage_max:88}, sub_type:'hand'};
    PK_S3.items[33] = {item_id:33, nshort:'sharp_tomahawk', name:'Острый томагавк', type:'right_arm', level:63, price:4900, image:'/images/items/right_arm/sharp_tomahawk.png?1', image_mini:'/images/items/right_arm/mini/sharp_tomahawk.png?1', bonus:{skills:{hide:3, dodge:3}}, set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:65, damage_max:95}, sub_type:'hand'};
    PK_S3.items[34] = {item_id:34, nshort:'taschunkas_tomahawk', name:'Томагавк Ташунки', type:'right_arm', level:70, price:10100, image:'/images/items/right_arm/taschunkas_tomahawk.png?1', image_mini:'/images/items/right_arm/mini/taschunkas_tomahawk.png?1', bonus:{skills:{swim:7, hide:3, dodge:5}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:100, damage_max:140}, sub_type:'hand'};
    PK_S3.items[35] = {item_id:35, nshort:'rusty_axe', name:'Ржавый топор лесоруба', type:'right_arm', level:62, price:3400, image:'/images/items/right_arm/rusty_axe.png?1', image_mini:'/images/items/right_arm/mini/rusty_axe.png?1', bonus:{skills:{punch:4}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:20, damage_max:112}, sub_type:'hand'};
    PK_S3.items[36] = {item_id:36, nshort:'axe', name:'Топор лесоруба', type:'right_arm', level:65, price:4400, image:'/images/items/right_arm/axe.png?1', image_mini:'/images/items/right_arm/mini/axe.png?1', bonus:{skills:{punch:5}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:25, damage_max:127}, sub_type:'hand'};
    PK_S3.items[37] = {item_id:37, nshort:'sharp_axe', name:'Острый топор лесоруба', type:'right_arm', level:68, price:5600, image:'/images/items/right_arm/sharp_axe.png?1', image_mini:'/images/items/right_arm/mini/sharp_axe.png?1', bonus:{skills:{punch:6}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:30, damage_max:144}, sub_type:'hand'};
    PK_S3.items[38] = {item_id:38, nshort:'boones_axe', name:'Топор Буна', type:'right_arm', level:75, price:10200, image:'/images/items/right_arm/boones_axe.png?1', image_mini:'/images/items/right_arm/mini/boones_axe.png?1', bonus:{skills:{punch:8, build:8}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:35, damage_max:205}, sub_type:'hand'};
    PK_S3.items[39] = {item_id:39, nshort:'rusty_sabre', name:'Ржавая кавалерийская сабля', type:'right_arm', level:67, price:4200, image:'/images/items/right_arm/rusty_sabre.png?1', image_mini:'/images/items/right_arm/mini/rusty_sabre.png?1', bonus:{skills:{tactic:5}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:64, damage_max:84}, sub_type:'hand'};
    PK_S3.items[40] = {item_id:40, nshort:'sabre', name:'Кавалерийская сабля', type:'right_arm', level:70, price:5230, image:'/images/items/right_arm/sabre.png?1', image_mini:'/images/items/right_arm/mini/sabre.png?1', bonus:{skills:{tactic:6}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:75, damage_max:93}, sub_type:'hand'};
    PK_S3.items[41] = {item_id:41, nshort:'sharp_sabre', name:'Острая кавалерийская сабля', type:'right_arm', level:73, price:6350, image:'/images/items/right_arm/sharp_sabre.png?1', image_mini:'/images/items/right_arm/mini/sharp_sabre.png?1', bonus:{skills:{tactic:6}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:85, damage_max:105}, sub_type:'hand'};
    PK_S3.items[42] = {item_id:42, nshort:'grants_sabre', name:'Сабля генерала Гранта', type:'right_arm', level:80, price:10800, image:'/images/items/right_arm/grants_sabre.png?1', image_mini:'/images/items/right_arm/mini/grants_sabre.png?1', bonus:{skills:{tactic:9, ride:9}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:110, damage_max:134}, sub_type:'hand'};
    PK_S3.items[43] = {item_id:43, nshort:'screwdriver', name:'Отвёртка', type:'right_arm', level:10, price:114, image:'/images/items/right_arm/screwdriver.png?1', image_mini:'/images/items/right_arm/mini/screwdriver.png?1', characterClass:'worker', bonus:{skills:{finger_dexterity:1}}, set:{}, sellable:true, damage:{damage_min:4, damage_max:14}, sub_type:'hand'};
    PK_S3.items[44] = {item_id:44, nshort:'spanner', name:'Гаечный ключ', type:'right_arm', level:21, price:628, image:'/images/items/right_arm/spanner.png?1', image_mini:'/images/items/right_arm/mini/spanner.png?1', characterClass:'worker', bonus:{skills:{build:2}}, set:{}, sellable:true, damage:{damage_min:20, damage_max:24}, sub_type:'hand'};
    PK_S3.items[45] = {item_id:45, nshort:'crowbar', name:'Фомка', type:'right_arm', level:36, price:1594, image:'/images/items/right_arm/crowbar.png?1', image_mini:'/images/items/right_arm/mini/crowbar.png?1', characterClass:'worker', bonus:{skills:{repair:3}}, set:{}, sellable:true, damage:{damage_min:30, damage_max:46}, sub_type:'hand'};
    PK_S3.items[46] = {item_id:46, nshort:'whips', name:'Кнут', type:'right_arm', level:30, price:594, image:'/images/items/right_arm/whips.png?1', image_mini:'/images/items/right_arm/mini/whips.png?1', characterClass:'adventurer', bonus:{skills:{reflex:5}}, set:{}, sellable:true, damage:{damage_min:30, damage_max:46}, sub_type:'hand'};
    PK_S3.items[47] = {item_id:47, nshort:'pillow', name:'Подушка', type:'right_arm', level:45, price:450, image:'/images/items/right_arm/pillow.png?1', image_mini:'/images/items/right_arm/mini/pillow.png?1', set:{key:'set_sleeper', name:'Набор сони'}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:0, damage_max:1}, sub_type:'hand'};
    PK_S3.items[48] = {item_id:48, nshort:'bowie_xmas', name:'Рождественский нож', type:'right_arm', level:1, price:512, image:'/images/items/right_arm/bowie_xmas.png?1', image_mini:'/images/items/right_arm/mini/bowie_xmas.png?1', bonus:{skills:{appearance:2}}, set:{}, traderlevel:100, auctionable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:2}, sub_type:'hand'};

    PK_S3.items[50] = {item_id:50, nshort:'goldensable', name:'Золотая сабля', type:'right_arm', level:70, price:22500, image:'/images/items/right_arm/goldensable.png?1', image_mini:'/images/items/right_arm/mini/goldensable.png?1', bonus:{skills:{aim:4, punch:8}}, set:{key:'gold_set', name:'Золотой набор'}, traderlevel:100, tradeable:true, damage:{damage_min:101, damage_max:149}, sub_type:'hand'};
    PK_S3.items[51] = {item_id:51, nshort:'fakegoldensable', name:'Дубликат золотой сабли', type:'right_arm', level:80, price:10500, image:'/images/items/right_arm/fakegoldensable.png?1', image_mini:'/images/items/right_arm/mini/fakegoldensable.png?1', bonus:{skills:{aim:2, punch:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:81, damage_max:119}, sub_type:'hand'};
    PK_S3.items[52] = {item_id:52, nshort:'greenhorn_axe', name:'Топор следопыта', type:'right_arm', level:6, price:550, image:'/images/items/right_arm/greenhorn_axe.png?1', image_mini:'/images/items/right_arm/mini/greenhorn_axe.png?1', bonus:{skills:{punch:1}}, set:{key:'greenhorn_set', name:'Набор чечако'}, sellable:true, damage:{damage_min:6, damage_max:14}, sub_type:'hand'};
    PK_S3.items[53] = {item_id:53, nshort:'xmas_rod', name:'Розга', type:'right_arm', level:0, price:250, image:'/images/items/right_arm/xmas_rod.png?1', image_mini:'/images/items/right_arm/mini/xmas_rod.png?1', bonus:{skills:{appearance:-2, aim:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true, damage:{damage_min:1, damage_max:12}, sub_type:'hand'};

    PK_S3.items[55] = {item_id:55, nshort:'bouquet', name:'Букет', type:'right_arm', level:1, price:22, image:'/images/items/right_arm/bouquet.png?1', image_mini:'/images/items/right_arm/mini/bouquet.png?1', set:{}, sellable:true, damage:{damage_min:0, damage_max:0}, sub_type:'hand'};
    PK_S3.items[56] = {item_id:56, nshort:'golden_tomahawk', name:'Золотой томагавк', type:'right_arm', level:70, price:11750, image:'/images/items/right_arm/golden_tomahawk.png?1', image_mini:'/images/items/right_arm/mini/golden_tomahawk.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, auctionable:true, tradeable:true, sellable:true, damage:{damage_min:100, damage_max:200}, sub_type:'hand'};
    PK_S3.items[57] = {item_id:57, nshort:'hacketts_pickaxe', name:'Кирка Хэккета', type:'right_arm', level:10, price:75, image:'/images/items/right_arm/hacketts_pickaxe.png?1', image_mini:'/images/items/right_arm/mini/hacketts_pickaxe.png?1', bonus:{skills:{punch:2, build:1}}, set:{}, damage:{damage_min:8, damage_max:20}, sub_type:'hand'};
    PK_S3.items[58] = {item_id:58, nshort:'collector_saber', name:'Сабля коллекционера', type:'right_arm', level:100, price:0, image:'/images/items/right_arm/collector_saber.png?1', image_mini:'/images/items/right_arm/mini/collector_saber.png?1', bonus:{skills:{animal:15, hide:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Набор коллекционера'}, damage:{damage_min:75, damage_max:175}, sub_type:'hand'};
    PK_S3.items[59] = {item_id:59, nshort:'sam_hawkens_knive', name:'Нож Сэма Хоукена', type:'right_arm', level:70, price:10000, image:'/images/items/right_arm/sam_hawkens_knive.png?1', image_mini:'/images/items/right_arm/mini/sam_hawkens_knive.png?1', bonus:{skills:{trade:20}, attributes:{}, fortbattle:{offense:1, defense:1}, fortbattlesector:{damage:1, offense:1, defense:1}}, set:{}, traderlevel:100, tradeable:true, damage:{damage_min:110, damage_max:140}, sub_type:'hand'};
    PK_S3.items[60] = {item_id:60, nshort:'vargas_sabre', name:'Сабля Эмилио Варгаса', type:'right_arm', level:50, price:1500, image:'/images/items/right_arm/vargas_sabre.png?1', image_mini:'/images/items/right_arm/mini/vargas_sabre.png?1', bonus:{skills:{tactic:5, dodge:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true, damage:{damage_min:54, damage_max:74}, sub_type:'hand'};

    PK_S3.items[62] = {item_id:62, nshort:'healers_tomahawk', name:'Томагавк целителя', type:'right_arm', level:70, price:10000, image:'/images/items/right_arm/healers_tomahawk.png?1', image_mini:'/images/items/right_arm/mini/healers_tomahawk.png?1', bonus:{skills:{trade:4, dodge:4, health:6}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true, damage:{damage_min:95, damage_max:135}, sub_type:'hand'};
    PK_S3.items[63] = {item_id:63, nshort:'bunny_carot', name:'Морковка', type:'right_arm', level:1, price:0, image:'/images/items/right_arm/bunny_carot.png?1', image_mini:'/images/items/right_arm/mini/bunny_carot.png?1', bonus:{skills:{animal:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'bunny_set', name:'Костюм зайца'}, damage:{damage_min:3, damage_max:5}, sub_type:'hand'};

    PK_S3.items[100] = {item_id:100, nshort:'stone_left', name:'Камень', type:'left_arm', level:1, price:0, image:'/images/items/left_arm/stone_left.png?1', image_mini:'/images/items/left_arm/mini/stone_left.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true, damage:{damage_min:50, damage_max:110}}; 
    PK_S3.items[101] = {item_id:101, nshort:'bow_rusty', name:'Трухлявый лук', type:'left_arm', level:5, price:400, image:'/images/items/left_arm/bow_rusty.png?1', image_mini:'/images/items/left_arm/mini/bow_rusty.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:50, damage_max:130}};
    PK_S3.items[102] = {item_id:102, nshort:'bow_normal', name:'Лук', type:'left_arm', level:10, price:650, image:'/images/items/left_arm/bow_normal.png?1', image_mini:'/images/items/left_arm/mini/bow_normal.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:70, damage_max:150}};
    PK_S3.items[103] = {item_id:103, nshort:'bow_best', name:'Точный лук', type:'left_arm', level:13, price:1275, image:'/images/items/left_arm/bow_best.png?1', image_mini:'/images/items/left_arm/mini/bow_best.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:100, damage_max:188}};
    PK_S3.items[104] = {item_id:104, nshort:'crossbow_rusty', name:'Трухлявый арбалет', type:'left_arm', level:10, price:520, image:'/images/items/left_arm/crossbow_rusty.png?1', image_mini:'/images/items/left_arm/mini/crossbow_rusty.png?1', set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:75, damage_max:129}};
    PK_S3.items[105] = {item_id:105, nshort:'crossbow_normal', name:'Арбалет', type:'left_arm', level:20, price:755, image:'/images/items/left_arm/crossbow_normal.png?1', image_mini:'/images/items/left_arm/mini/crossbow_normal.png?1', set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:90, damage_max:150}};
    PK_S3.items[106] = {item_id:106, nshort:'crossbow_best', name:'Точный арбалет', type:'left_arm', level:23, price:1600, image:'/images/items/left_arm/crossbow_best.png?1', image_mini:'/images/items/left_arm/mini/crossbow_best.png?1', set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:120, damage_max:192}};
    PK_S3.items[107] = {item_id:107, nshort:'arkebuse_rusty', name:'Ржавая пищаль', type:'left_arm', level:18, price:684, image:'/images/items/left_arm/arkebuse_rusty.png?1', image_mini:'/images/items/left_arm/mini/arkebuse_rusty.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:80, damage_max:160}};
    PK_S3.items[108] = {item_id:108, nshort:'arkebuse_normal', name:'Пищаль', type:'left_arm', level:30, price:1070, image:'/images/items/left_arm/arkebuse_normal.png?1', image_mini:'/images/items/left_arm/mini/arkebuse_normal.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:90, damage_max:190}};
    PK_S3.items[109] = {item_id:109, nshort:'arkebuse_best', name:'Точная пищаль', type:'left_arm', level:33, price:2444, image:'/images/items/left_arm/arkebuse_best.png?1', image_mini:'/images/items/left_arm/mini/arkebuse_best.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:112, damage_max:232}};
    PK_S3.items[110] = {item_id:110, nshort:'blunderbuss_rusty', name:'Ржавое охотничье ружьё', type:'left_arm', level:20, price:775, image:'/images/items/left_arm/blunderbuss_rusty.png?1', image_mini:'/images/items/left_arm/mini/blunderbuss_rusty.png?1', set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:256}};
    PK_S3.items[111] = {item_id:111, nshort:'blunderbuss_normal', name:'Охотничье ружьё', type:'left_arm', level:35, price:1300, image:'/images/items/left_arm/blunderbuss_normal.png?1', image_mini:'/images/items/left_arm/mini/blunderbuss_normal.png?1', set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:300}};
    PK_S3.items[112] = {item_id:112, nshort:'blunderbuss_best', name:'Точное охотничье ружьё', type:'left_arm', level:38, price:2950, image:'/images/items/left_arm/blunderbuss_best.png?1', image_mini:'/images/items/left_arm/mini/blunderbuss_best.png?1', set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:360}};
    PK_S3.items[113] = {item_id:113, nshort:'musket_rusty', name:'Ржавый мушкет', type:'left_arm', level:25, price:920, image:'/images/items/left_arm/musket_rusty.png?1', image_mini:'/images/items/left_arm/mini/musket_rusty.png?1', set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:83, damage_max:193}};
    PK_S3.items[114] = {item_id:114, nshort:'musket_normal', name:'Мушкет', type:'left_arm', level:40, price:1580, image:'/images/items/left_arm/musket_normal.png?1', image_mini:'/images/items/left_arm/mini/musket_normal.png?1', set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:100, damage_max:220}};
    PK_S3.items[115] = {item_id:115, nshort:'musket_best', name:'Точный мушкет', type:'left_arm', level:43, price:3850, image:'/images/items/left_arm/musket_best.png?1', image_mini:'/images/items/left_arm/mini/musket_best.png?1', set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:126, damage_max:266}};
    PK_S3.items[116] = {item_id:116, nshort:'flint_rusty', name:'Ржавый дробовик', type:'left_arm', level:35, price:1350, image:'/images/items/left_arm/flint_rusty.png?1', image_mini:'/images/items/left_arm/mini/flint_rusty.png?1', set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:120, damage_max:192}};
    PK_S3.items[117] = {item_id:117, nshort:'flint_normal', name:'Дробовик', type:'left_arm', level:50, price:2440, image:'/images/items/left_arm/flint_normal.png?1', image_mini:'/images/items/left_arm/mini/flint_normal.png?1', set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:135, damage_max:225}};
    PK_S3.items[118] = {item_id:118, nshort:'flint_best', name:'Точный дробовик', type:'left_arm', level:53, price:6300, image:'/images/items/left_arm/flint_best.png?1', image_mini:'/images/items/left_arm/mini/flint_best.png?1', set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:168, damage_max:268}};
    PK_S3.items[119] = {item_id:119, nshort:'shotgun_rusty', name:'Ржавая винтовка', type:'left_arm', level:40, price:1600, image:'/images/items/left_arm/shotgun_rusty.png?1', image_mini:'/images/items/left_arm/mini/shotgun_rusty.png?1', set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:242}};
    PK_S3.items[120] = {item_id:120, nshort:'shotgun_normal', name:'Винтовка', type:'left_arm', level:55, price:3000, image:'/images/items/left_arm/shotgun_normal.png?1', image_mini:'/images/items/left_arm/mini/shotgun_normal.png?1', set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:380}};
    PK_S3.items[121] = {item_id:121, nshort:'shotgun_best', name:'Точная винтовка', type:'left_arm', level:58, price:7000, image:'/images/items/left_arm/shotgun_best.png?1', image_mini:'/images/items/left_arm/mini/shotgun_best.png?1', set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:444}};
    PK_S3.items[122] = {item_id:122, nshort:'percussion_rusty', name:'Ржавый карабин', type:'left_arm', level:45, price:2000, image:'/images/items/left_arm/percussion_rusty.png?1', image_mini:'/images/items/left_arm/mini/percussion_rusty.png?1', set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:126, damage_max:226}};
    PK_S3.items[123] = {item_id:123, nshort:'percussion_normal', name:'Карабин', type:'left_arm', level:60, price:3800, image:'/images/items/left_arm/percussion_normal.png?1', image_mini:'/images/items/left_arm/mini/percussion_normal.png?1', set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:150, damage_max:250}};
    PK_S3.items[124] = {item_id:124, nshort:'percussion_best', name:'Точный карабин', type:'left_arm', level:63, price:8800, image:'/images/items/left_arm/percussion_best.png?1', image_mini:'/images/items/left_arm/mini/percussion_best.png?1', set:{}, traderlevel:12, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:172, damage_max:292}};
    PK_S3.items[125] = {item_id:125, nshort:'breechloader_rusty', name:'Ржавая казнозарядка', type:'left_arm', level:55, price:3150, image:'/images/items/left_arm/breechloader_rusty.png?1', image_mini:'/images/items/left_arm/mini/breechloader_rusty.png?1', set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:160, damage_max:232}};
    PK_S3.items[126] = {item_id:126, nshort:'breechloader_normal', name:'Казнозарядка', type:'left_arm', level:70, price:6000, image:'/images/items/left_arm/breechloader_normal.png?1', image_mini:'/images/items/left_arm/mini/breechloader_normal.png?1', set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:190, damage_max:250}};
    PK_S3.items[127] = {item_id:127, nshort:'breechloader_best', name:'Точная казнозарядка', type:'left_arm', level:73, price:12600, image:'/images/items/left_arm/breechloader_best.png?1', image_mini:'/images/items/left_arm/mini/breechloader_best.png?1', set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:200, damage_max:296}};
    PK_S3.items[128] = {item_id:128, nshort:'winchester_rusty', name:'Ржавый винчестер', type:'left_arm', level:60, price:3900, image:'/images/items/left_arm/winchester_rusty.png?1', image_mini:'/images/items/left_arm/mini/winchester_rusty.png?1', set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:160, damage_max:252}};
    PK_S3.items[129] = {item_id:129, nshort:'winchester_normal', name:'Винчестер', type:'left_arm', level:75, price:7600, image:'/images/items/left_arm/winchester_normal.png?1', image_mini:'/images/items/left_arm/mini/winchester_normal.png?1', set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:180, damage_max:280}};
    PK_S3.items[130] = {item_id:130, nshort:'winchester_best', name:'Точный винчестер', type:'left_arm', level:78, price:15400, image:'/images/items/left_arm/winchester_best.png?1', image_mini:'/images/items/left_arm/mini/winchester_best.png?1', set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:200, damage_max:312}};

    PK_S3.items[132] = {item_id:132, nshort:'bear', name:'Медвежонок', type:'left_arm', level:45, price:2600, image:'/images/items/left_arm/bear.png?1', image_mini:'/images/items/left_arm/mini/bear.png?1', set:{key:'set_sleeper', name:'Набор сони'}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:0, damage_max:1}};
    PK_S3.items[133] = {item_id:133, nshort:'muzzleloader_bowie', name:'Дульнозарядное ружьё Бови', type:'left_arm', level:30, price:1480, image:'/images/items/left_arm/muzzleloader_bowie.png?1', image_mini:'/images/items/left_arm/mini/muzzleloader_bowie.png?1', set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:145, damage_max:155}};
    PK_S3.items[134] = {item_id:134, nshort:'golden_rifle', name:'Дубликат золотого винчестера', type:'left_arm', level:75, price:11480, image:'/images/items/left_arm/golden_rifle.png?1', image_mini:'/images/items/left_arm/mini/golden_rifle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true, damage:{damage_min:192, damage_max:308}};
    PK_S3.items[135] = {item_id:135, nshort:'elephantgun', name:'Ружьё на слона', type:'left_arm', level:40, price:12480, image:'/images/items/left_arm/elephantgun.png?1', image_mini:'/images/items/left_arm/mini/elephantgun.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true, damage:{damage_min:1, damage_max:400}};
    PK_S3.items[136] = {item_id:136, nshort:'golden_rifle', name:'Золотой винчестер', type:'left_arm', level:75, price:65480, image:'/images/items/left_arm/golden_rifle.png?1', image_mini:'/images/items/left_arm/mini/golden_rifle.png?1', bonus:{attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{offense:3, defense:3}, fortbattlesector:{damage:15, offense:2, defense:2}}, set:{key:'gold_set', name:'Золотой набор'}, sellable:true, damage:{damage_min:232, damage_max:348}};
    PK_S3.items[137] = {item_id:137, nshort:'deathsythe', name:'Коса Смерти', type:'left_arm', level:50, price:17400, image:'/images/items/left_arm/deathsythe.png?1', image_mini:'/images/items/left_arm/mini/deathsythe.png?1', bonus:{attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:'season_set', name:'Праздничный наряд'}, sellable:true, damage:{damage_min:42, damage_max:158}};
    
    PK_S3.items[139] = {item_id:139, nshort:'high_wall', name:'Винчестер Хай-Волл 1885', type:'left_arm', level:70, price:13400, image:'/images/items/left_arm/high_wall.png?1', image_mini:'/images/items/left_arm/mini/high_wall.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, auctionable:true, tradeable:true, sellable:true, damage:{damage_min:200, damage_max:400}};
    PK_S3.items[140] = {item_id:140, nshort:'collector_rifle', name:'Ружьё коллекционера', type:'left_arm', level:100, price:0, image:'/images/items/left_arm/collector_rifle.png?1', image_mini:'/images/items/left_arm/mini/collector_rifle.png?1', bonus:{skills:{repair:15, health:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Набор коллекционера'}, traderlevel:100, tradeable:true, damage:{damage_min:100, damage_max:300}};

    PK_S3.items[200] = {item_id:200, nshort:'band_red', name:'Красная бандана', type:'head', level:1, price:4, image:'/images/items/head/band_red.png?1', image_mini:'/images/items/head/mini/band_red.png?1', bonus:{skills:{trade:1, tough:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[201] = {item_id:201, nshort:'band_green', name:'Зелёная бандана', type:'head', level:2, price:4, image:'/images/items/head/band_green.png?1', image_mini:'/images/items/head/mini/band_green.png?1', bonus:{skills:{trade:1, dodge:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[202] = {item_id:202, nshort:'band_blue', name:'Синяя бандана', type:'head', level:2, price:4, image:'/images/items/head/band_blue.png?1', image_mini:'/images/items/head/mini/band_blue.png?1', bonus:{skills:{trade:1, finger_dexterity:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[203] = {item_id:203, nshort:'band_yellow', name:'Жёлтая бандана', type:'head', level:2, price:4, image:'/images/items/head/band_yellow.png?1', image_mini:'/images/items/head/mini/band_yellow.png?1', bonus:{skills:{trade:2}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[204] = {item_id:204, nshort:'band_brown', name:'Коричневая бандана', type:'head', level:3, price:18, image:'/images/items/head/band_brown.png?1', image_mini:'/images/items/head/mini/band_brown.png?1', bonus:{skills:{trade:1, swim:1, health:2}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[205] = {item_id:205, nshort:'band_black', name:'Чёрная бандана', type:'head', level:3, price:18, image:'/images/items/head/band_black.png?1', image_mini:'/images/items/head/mini/band_black.png?1', bonus:{skills:{trade:2, repair:2}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[206] = {item_id:206, nshort:'slouch_cap_grey', name:'Серая кепка', type:'head', level:3, price:46, image:'/images/items/head/slouch_cap_grey.png?1', image_mini:'/images/items/head/mini/slouch_cap_grey.png?1', bonus:{skills:{tough:5}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[207] = {item_id:207, nshort:'slouch_cap_brown', name:'Коричневая кепка', type:'head', level:5, price:112, image:'/images/items/head/slouch_cap_brown.png?1', image_mini:'/images/items/head/mini/slouch_cap_brown.png?1', bonus:{skills:{ride:3, tough:6}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[208] = {item_id:208, nshort:'slouch_cap_black', name:'Чёрная кепка', type:'head', level:5, price:112, image:'/images/items/head/slouch_cap_black.png?1', image_mini:'/images/items/head/mini/slouch_cap_black.png?1', bonus:{skills:{leadership:3, pitfall:3, tough:3}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[209] = {item_id:209, nshort:'slouch_cap_fine', name:'Знатная кепка', type:'head', level:6, price:520, image:'/images/items/head/slouch_cap_fine.png?1', image_mini:'/images/items/head/mini/slouch_cap_fine.png?1', bonus:{skills:{tactic:4, aim:4, reflex:4, tough:6}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[210] = {item_id:210, nshort:'cap_grey', name:'Серая шапка', type:'head', level:4, price:90, image:'/images/items/head/cap_grey.png?1', image_mini:'/images/items/head/mini/cap_grey.png?1', bonus:{skills:{swim:8}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[211] = {item_id:211, nshort:'cap_red', name:'Красная шапка', type:'head', level:5, price:175, image:'/images/items/head/cap_red.png?1', image_mini:'/images/items/head/mini/cap_red.png?1', bonus:{skills:{swim:6, endurance:5}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[212] = {item_id:212, nshort:'cap_green', name:'Зелёная шапка', type:'head', level:5, price:175, image:'/images/items/head/cap_green.png?1', image_mini:'/images/items/head/mini/cap_green.png?1', bonus:{skills:{swim:6}, attributes:{flexibility:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[213] = {item_id:213, nshort:'cap_blue', name:'Синяя шапка', type:'head', level:5, price:175, image:'/images/items/head/cap_blue.png?1', image_mini:'/images/items/head/mini/cap_blue.png?1', bonus:{skills:{pitfall:5, swim:6}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};    
    PK_S3.items[214] = {item_id:214, nshort:'cap_yellow', name:'Жёлтая шапка', type:'head', level:5, price:175, image:'/images/items/head/cap_yellow.png?1', image_mini:'/images/items/head/mini/cap_yellow.png?1', bonus:{skills:{appearance:5, swim:6}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[215] = {item_id:215, nshort:'cap_brown', name:'Коричневая шапка', type:'head', level:6, price:300, image:'/images/items/head/cap_brown.png?1', image_mini:'/images/items/head/mini/cap_brown.png?1', bonus:{skills:{swim:10, tough:4}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[216] = {item_id:216, nshort:'cap_black', name:'Чёрная шапка', type:'head', level:6, price:300, image:'/images/items/head/cap_black.png?1', image_mini:'/images/items/head/mini/cap_black.png?1', bonus:{skills:{tactic:4, finger_dexterity:4, swim:6}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[217] = {item_id:217, nshort:'cap_fine', name:'Знатная шапка', type:'head', level:8, price:1100, image:'/images/items/head/cap_fine.png?1', image_mini:'/images/items/head/mini/cap_fine.png?1', bonus:{skills:{animal:5, shot:5, swim:10, tough:5}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[218] = {item_id:218, nshort:'slouch_hat_grey', name:'Серая панама', type:'head', level:7, price:220, image:'/images/items/head/slouch_hat_grey.png?1', image_mini:'/images/items/head/mini/slouch_hat_grey.png?1', bonus:{skills:{pitfall:12}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[219] = {item_id:219, nshort:'slouch_hat_brown', name:'Коричневая панама', type:'head', level:9, price:520, image:'/images/items/head/slouch_hat_brown.png?1', image_mini:'/images/items/head/mini/slouch_hat_brown.png?1', bonus:{skills:{pitfall:9, dodge:4, punch:5}}, set:{key:'set_farmer', name:'Набор фермера'}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[220] = {item_id:220, nshort:'slouch_hat_black', name:'Чёрная панама', type:'head', level:9, price:520, image:'/images/items/head/slouch_hat_black.png?1', image_mini:'/images/items/head/mini/slouch_hat_black.png?1', bonus:{skills:{tactic:4, pitfall:9}, attributes:{dexterity:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[221] = {item_id:221, nshort:'slouch_hat_fine', name:'Знатная панама', type:'head', level:12, price:1920, image:'/images/items/head/slouch_hat_fine.png?1', image_mini:'/images/items/head/mini/slouch_hat_fine.png?1', bonus:{skills:{leadership:6, pitfall:10, reflex:6, endurance:6}, attributes:{dexterity:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[222] = {item_id:222, nshort:'bowler_grey', name:'Серый котелок', type:'head', level:10, price:420, image:'/images/items/head/bowler_grey.png?1', image_mini:'/images/items/head/mini/bowler_grey.png?1', bonus:{skills:{trade:11}, attributes:{charisma:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[223] = {item_id:223, nshort:'bowler_brown', name:'Коричневый котелок', type:'head', level:12, price:808, image:'/images/items/head/bowler_brown.png?1', image_mini:'/images/items/head/mini/bowler_brown.png?1', bonus:{skills:{trade:11, reflex:5, build:6}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[224] = {item_id:224, nshort:'bowler_black', name:'Чёрный котелок', type:'head', level:12, price:808, image:'/images/items/head/bowler_black.png?1', image_mini:'/images/items/head/mini/bowler_black.png?1', bonus:{skills:{trade:11, shot:6}, attributes:{charisma:1}}, set:{key:'set_quackery', name:'Набор знахаря'}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[225] = {item_id:225, nshort:'bowler_fine', name:'Знатный котелок', type:'head', level:15, price:1850, image:'/images/items/head/bowler_fine.png?1', image_mini:'/images/items/head/mini/bowler_fine.png?1', bonus:{skills:{trade:11, repair:5, ride:5, tough:6}, attributes:{charisma:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[226] = {item_id:226, nshort:'cloth_hat_grey', name:'Шляпа из серого фетра', type:'head', level:14, price:655, image:'/images/items/head/cloth_hat_grey.png?1', image_mini:'/images/items/head/mini/cloth_hat_grey.png?1', bonus:{skills:{aim:10, health:10}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[227] = {item_id:227, nshort:'cloth_hat_brown', name:'Шляпа из коричневого фетра', type:'head', level:20, price:1270, image:'/images/items/head/cloth_hat_brown.png?1', image_mini:'/images/items/head/mini/cloth_hat_brown.png?1', bonus:{skills:{aim:7, swim:7, health:13}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[228] = {item_id:228, nshort:'cloth_hat_black', name:'Шляпа из чёрного фетра', type:'head', level:20, price:1270, image:'/images/items/head/cloth_hat_black.png?1', image_mini:'/images/items/head/mini/cloth_hat_black.png?1', bonus:{skills:{appearance:7, aim:13, health:7}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[229] = {item_id:229, nshort:'cloth_hat_fine', name:'Знатная фетровая шляпа', type:'head', level:22, price:3900, image:'/images/items/head/cloth_hat_fine.png?1', image_mini:'/images/items/head/mini/cloth_hat_fine.png?1', bonus:{skills:{tactic:8, aim:9, dodge:8, health:9}, attributes:{dexterity:1, strength:1}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[230] = {item_id:230, nshort:'cylinder_grey', name:'Серый цилиндр', type:'head', level:18, price:1270, image:'/images/items/head/cylinder_grey.png?1', image_mini:'/images/items/head/mini/cylinder_grey.png?1', bonus:{skills:{leadership:14, finger_dexterity:13}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[231] = {item_id:231, nshort:'cylinder_red', name:'Красный цилиндр', type:'head', level:24, price:1900, image:'/images/items/head/cylinder_red.png?1', image_mini:'/images/items/head/mini/cylinder_red.png?1', bonus:{skills:{leadership:10, finger_dexterity:9, punch:8}, attributes:{strength:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[232] = {item_id:232, nshort:'cylinder_green', name:'Зелёный цилиндр', type:'head', level:24, price:1900, image:'/images/items/head/cylinder_green.png?1', image_mini:'/images/items/head/mini/cylinder_green.png?1', bonus:{skills:{leadership:10, finger_dexterity:9, hide:8}, attributes:{flexibility:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[233] = {item_id:233, nshort:'cylinder_blue', name:'Синий цилиндр', type:'head', level:24, price:1900, image:'/images/items/head/cylinder_blue.png?1', image_mini:'/images/items/head/mini/cylinder_blue.png?1', bonus:{skills:{leadership:10, finger_dexterity:12}, attributes:{dexterity:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[234] = {item_id:234, nshort:'cylinder_yellow', name:'Жёлтый цилиндр', type:'head', level:24, price:1900, image:'/images/items/head/cylinder_yellow.png?1', image_mini:'/images/items/head/mini/cylinder_yellow.png?1', bonus:{skills:{leadership:13, finger_dexterity:9}, attributes:{charisma:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[235] = {item_id:235, nshort:'cylinder_brown', name:'Коричневый цилиндр', type:'head', level:25, price:2700, image:'/images/items/head/cylinder_brown.png?1', image_mini:'/images/items/head/mini/cylinder_brown.png?1', bonus:{skills:{leadership:10, finger_dexterity:9, ride:9, health:8}}, set:{key:'set_gentleman', name:'Набор джентльмена'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[236] = {item_id:236, nshort:'cylinder_black', name:'Чёрный цилиндр', type:'head', level:25, price:2700, image:'/images/items/head/cylinder_black.png?1', image_mini:'/images/items/head/mini/cylinder_black.png?1', bonus:{skills:{leadership:13, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[237] = {item_id:237, nshort:'cylinder_fine', name:'Цилиндр Линкольна', type:'head', level:27, price:5400, image:'/images/items/head/cylinder_fine.png?1', image_mini:'/images/items/head/mini/cylinder_fine.png?1', bonus:{skills:{leadership:13, finger_dexterity:12, ride:8, build:9}, attributes:{charisma:1, dexterity:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[238] = {item_id:238, nshort:'leather_hat_grey', name:'Серая шляпа', type:'head', level:24, price:2000, image:'/images/items/head/leather_hat_grey.png?1', image_mini:'/images/items/head/mini/leather_hat_grey.png?1', bonus:{skills:{animal:11, reflex:12}, attributes:{charisma:1, flexibility:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[239] = {item_id:239, nshort:'leather_hat_brown', name:'Коричневая шляпа', type:'head', level:28, price:3500, image:'/images/items/head/leather_hat_brown.png?1', image_mini:'/images/items/head/mini/leather_hat_brown.png?1', bonus:{skills:{animal:11, reflex:12, punch:10}, attributes:{flexibility:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[240] = {item_id:240, nshort:'leather_hat_black', name:'Чёрная шляпа', type:'head', level:28, price:3500, image:'/images/items/head/leather_hat_black.png?1', image_mini:'/images/items/head/mini/leather_hat_black.png?1', bonus:{skills:{animal:11, repair:10, reflex:12}, attributes:{charisma:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[241] = {item_id:241, nshort:'leather_hat_fine', name:'Знатная шляпа', type:'head', level:30, price:4100, image:'/images/items/head/leather_hat_fine.png?1', image_mini:'/images/items/head/mini/leather_hat_fine.png?1', bonus:{skills:{animal:14, aim:8, reflex:15, tough:9}, attributes:{charisma:1, flexibility:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[242] = {item_id:242, nshort:'stetson_grey', name:'Серый стетсон', type:'head', level:30, price:2555, image:'/images/items/head/stetson_grey.png?1', image_mini:'/images/items/head/mini/stetson_grey.png?1', bonus:{skills:{finger_dexterity:14, health:13}, attributes:{dexterity:1, strength:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[243] = {item_id:243, nshort:'stetson_brown', name:'Коричневый стетсон', type:'head', level:33, price:4500, image:'/images/items/head/stetson_brown.png?1', image_mini:'/images/items/head/mini/stetson_brown.png?1', bonus:{skills:{finger_dexterity:13, dodge:12, health:13}, attributes:{strength:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[244] = {item_id:244, nshort:'stetson_black', name:'Чёрный стетсон', type:'head', level:33, price:4500, image:'/images/items/head/stetson_black.png?1', image_mini:'/images/items/head/mini/stetson_black.png?1', bonus:{skills:{leadership:12, finger_dexterity:13, health:13}, attributes:{dexterity:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[245] = {item_id:245, nshort:'stetson_fine', name:'Знатный стетсон', type:'head', level:36, price:7100, image:'/images/items/head/stetson_fine.png?1', image_mini:'/images/items/head/mini/stetson_fine.png?1', bonus:{skills:{trade:9, finger_dexterity:16, swim:8, health:16}, attributes:{dexterity:1, strength:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[246] = {item_id:246, nshort:'xmas_hat', name:'Рождественский колпак', type:'head', level:1, price:50, image:'/images/items/head/xmas_hat.png?1', image_mini:'/images/items/head/mini/xmas_hat.png?1', set:{}, sellable:true};
    PK_S3.items[247] = {item_id:247, nshort:'southcap', name:'Фуражка', type:'head', level:20, price:800, image:'/images/items/head/southcap.png?1', image_mini:'/images/items/head/mini/southcap.png?1', characterClass:'soldier', bonus:{skills:{pitfall:5, punch:11}}, set:{}, sellable:true};
    PK_S3.items[248] = {item_id:248, nshort:'adventurerhat', name:'Шляпа авантюриста', type:'head', level:22, price:2980, image:'/images/items/head/adventurerhat.png?1', image_mini:'/images/items/head/mini/adventurerhat.png?1', characterClass:'adventurer', bonus:{skills:{hide:6, ride:8, tough:10}, attributes:{dexterity:3}}, set:{}, sellable:true};
    PK_S3.items[249] = {item_id:249, nshort:'fedora_black', name:'Шляпа дуэлянта', type:'head', level:22, price:1700, image:'/images/items/head/fedora_black.png?1', image_mini:'/images/items/head/mini/fedora_black.png?1', characterClass:'duelist', bonus:{skills:{shot:10, aim:6}, attributes:{charisma:3}}, set:{}, sellable:true};
    PK_S3.items[250] = {item_id:250, nshort:'feather_hat_brown', name:'Шляпа трудяги', type:'head', level:18, price:1460, image:'/images/items/head/feather_hat_brown.png?1', image_mini:'/images/items/head/mini/feather_hat_brown.png?1', characterClass:'worker', bonus:{skills:{dodge:5, reflex:4, endurance:3, tough:2}, attributes:{flexibility:3}}, set:{}, sellable:true};

    PK_S3.items[253] = {item_id:253, nshort:'indian_hat', name:'Индейское оперение', type:'head', level:51, price:3200, image:'/images/items/head/indian_hat.png?1', image_mini:'/images/items/head/mini/indian_hat.png?1', bonus:{skills:{appearance:11, leadership:12}, attributes:{charisma:2}}, set:{key:'set_indian', name:'Набор индейца'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[254] = {item_id:254, nshort:'mexican_sombrero', name:'Сомбреро', type:'head', level:30, price:1270, image:'/images/items/head/mexican_sombrero.png?1', image_mini:'/images/items/head/mini/mexican_sombrero.png?1', bonus:{skills:{shot:6, health:6, tough:10}}, set:{key:'set_mexican', name:'Набор мексиканца'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[256] = {item_id:256, nshort:'pilger_cap', name:'Монашеский чепец', type:'head', level:37, price:1270, image:'/images/items/head/pilger_cap.png?1', image_mini:'/images/items/head/mini/pilger_cap.png?1', characterSex:'female', bonus:{skills:{leadership:6, repair:6, endurance:10}}, set:{key:'set_pilgrim_female', name:'Набор монашки'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[257] = {item_id:257, nshort:'pilger_hat', name:'Шляпа пастора', type:'head', level:37, price:1270, image:'/images/items/head/pilger_hat.png?1', image_mini:'/images/items/head/mini/pilger_hat.png?1', characterSex:'male', bonus:{skills:{trade:6, repair:6, health:10}}, set:{key:'set_pilgrim_male', name:'Набор проповедника'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[258] = {item_id:258, nshort:'cylinder_xmas', name:'Шляпа снеговика', type:'head', level:30, price:2412, image:'/images/items/head/cylinder_xmas.png?1', image_mini:'/images/items/head/mini/cylinder_xmas.png?1', bonus:{attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Праздничный наряд'}, traderlevel:100, tradeable:true, sellable:true};
    PK_S3.items[259] = {item_id:259, nshort:'dancer_hat', name:'Перо', type:'head', level:42, price:2500, image:'/images/items/head/dancer_hat.png?1', image_mini:'/images/items/head/mini/dancer_hat.png?1', characterSex:'female', bonus:{skills:{tactic:10, pitfall:8, aim:9}, attributes:{flexibility:1}}, set:{key:'set_dancer', name:'Набор танцовщицы'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[261] = {item_id:261, nshort:'sleep_cap', name:'Ночной колпак', type:'head', level:45, price:1200, image:'/images/items/head/sleep_cap.png?1', image_mini:'/images/items/head/mini/sleep_cap.png?1', set:{key:'set_sleeper', name:'Набор сони'}, auctionable:true, dropable:true, sellable:true};
    PK_S3.items[262] = {item_id:262, nshort:'greenhorn_hat', name:'Подобранная шляпа', type:'head', level:4, price:515, image:'/images/items/head/greenhorn_hat.png?1', image_mini:'/images/items/head/mini/greenhorn_hat.png?1', bonus:{skills:{trade:3, tactic:3, pitfall:2}, attributes:{flexibility:1}}, set:{key:'greenhorn_set', name:'Набор чечако'}, sellable:true};
    PK_S3.items[263] = {item_id:263, nshort:'yang_hat', name:'Шляпа Янга', type:'head', level:1, price:1000, image:'/images/items/head/yang_hat.png?1', image_mini:'/images/items/head/mini/yang_hat.png?1', bonus:{skills:{appearance:2, finger_dexterity:2}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true};
    PK_S3.items[264] = {item_id:264, nshort:'collector_hat', name:'Шляпа коллекционера', type:'head', level:100, price:0, image:'/images/items/head/collector_hat.png?1', image_mini:'/images/items/head/mini/collector_hat.png?1', bonus:{skills:{finger_dexterity:15, endurance:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Набор коллекционера'}, traderlevel:66, tradeable:true};
    PK_S3.items[265] = {item_id:265, nshort:'bunny_hat', name:'Заячьи уши', type:'head', level:1, price:0, image:'/images/items/head/bunny_hat.png?1', image_mini:'/images/items/head/mini/bunny_hat.png?1', bonus:{skills:{animal:2}, attributes:{flexibility:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'bunny_set', name:'Костюм зайца'}, traderlevel:66, tradeable:true};

PK_S3.items[299] = {item_id:299, nshort:'band_grey', name:'Серая бандана', type:'head', level:1, price:2, image:'/images/items/head/band_grey.png?1', image_mini:'/images/items/head/mini/band_grey.png?1', bonus:{skills:{trade:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[300] = {item_id:300, nshort:'tatter_grey', name:'Серые лохмотья', type:'body', level:1, price:2, image:'/images/items/body/tatter_grey.png?1', image_mini:'/images/items/body/mini/tatter_grey.png?1', bonus:{skills:{pitfall:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[301] = {item_id:301, nshort:'tatter_red', name:'Красные лохмотья', type:'body', level:1, price:12, image:'/images/items/body/tatter_red.png?1', image_mini:'/images/items/body/mini/tatter_red.png?1', bonus:{skills:{pitfall:1, build:2}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[302] = {item_id:302, nshort:'tatter_green', name:'Зелёные лохмотья', type:'body', level:1, price:12, image:'/images/items/body/tatter_green.png?1', image_mini:'/images/items/body/mini/tatter_green.png?1', bonus:{skills:{pitfall:1, ride:2}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[303] = {item_id:303, nshort:'tatter_blue', name:'Синие лохмотья', type:'body', level:1, price:12, image:'/images/items/body/tatter_blue.png?1', image_mini:'/images/items/body/mini/tatter_blue.png?1', bonus:{skills:{pitfall:3}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[304] = {item_id:304, nshort:'tatter_yellow', name:'Жёлтые лохмотья', type:'body', level:1, price:12, image:'/images/items/body/tatter_yellow.png?1', image_mini:'/images/items/body/mini/tatter_yellow.png?1', bonus:{skills:{pitfall:1, leadership:2}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[305] = {item_id:305, nshort:'tatter_brown', name:'Коричневые лохмотья', type:'body', level:2, price:38, image:'/images/items/body/tatter_brown.png?1', image_mini:'/images/items/body/mini/tatter_brown.png?1', bonus:{skills:{pitfall:1, reflex:2, punch:2}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[306] = {item_id:306, nshort:'tatter_black', name:'Чёрные лохмотья', type:'body', level:2, price:38, image:'/images/items/body/tatter_black.png?1', image_mini:'/images/items/body/mini/tatter_black.png?1', bonus:{skills:{pitfall:3, tactic:2}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[307] = {item_id:307, nshort:'poncho_grey', name:'Серое пончо', type:'body', level:3, price:38, image:'/images/items/body/poncho_grey.png?1', image_mini:'/images/items/body/mini/poncho_grey.png?1', bonus:{skills:{dodge:5}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[308] = {item_id:308, nshort:'poncho_red', name:'Красное пончо', type:'body', level:4, price:80, image:'/images/items/body/poncho_red.png?1', image_mini:'/images/items/body/mini/poncho_red.png?1', bonus:{skills:{dodge:3, tough:4}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[309] = {item_id:309, nshort:'poncho_green', name:'Зелёное пончо', type:'body', level:4, price:80, image:'/images/items/body/poncho_green.png?1', image_mini:'/images/items/body/mini/poncho_green.png?1', bonus:{skills:{dodge:7}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[310] = {item_id:310, nshort:'poncho_blue', name:'Синее пончо', type:'body', level:4, price:80, image:'/images/items/body/poncho_blue.png?1', image_mini:'/images/items/body/mini/poncho_blue.png?1', bonus:{skills:{aim:4, dodge:3}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[311] = {item_id:311, nshort:'poncho_yellow', name:'Жёлтое пончо', type:'body', level:4, price:80, image:'/images/items/body/poncho_yellow.png?1', image_mini:'/images/items/body/mini/poncho_yellow.png?1', bonus:{skills:{trade:4, dodge:3}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[312] = {item_id:312, nshort:'poncho_brown', name:'Коричневое пончо', type:'body', level:5, price:174, image:'/images/items/body/poncho_brown.png?1', image_mini:'/images/items/body/mini/poncho_brown.png?1', bonus:{skills:{dodge:6, endurance:4}}, set:{key:'set_mexican', name:'Набор мексиканца'}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[313] = {item_id:313, nshort:'poncho_black', name:'Чёрное пончо', type:'body', level:5, price:174, image:'/images/items/body/poncho_black.png?1', image_mini:'/images/items/body/mini/poncho_black.png?1', bonus:{skills:{animal:4, shot:3, dodge:3}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[314] = {item_id:314, nshort:'poncho_fine', name:'Пончо Клинта', type:'body', level:6, price:800, image:'/images/items/body/poncho_fine.png?1', image_mini:'/images/items/body/mini/poncho_fine.png?1', bonus:{skills:{appearance:4, pitfall:4, dodge:7, build:5}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[315] = {item_id:315, nshort:'clothes_grey', name:'Серый костюм', type:'body', level:7, price:138, image:'/images/items/body/clothes_grey.png?1', image_mini:'/images/items/body/mini/clothes_grey.png?1', bonus:{skills:{leadership:9}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[316] = {item_id:316, nshort:'clothes_red', name:'Красный костюм', type:'body', level:8, price:260, image:'/images/items/body/clothes_red.png?1', image_mini:'/images/items/body/mini/clothes_red.png?1', bonus:{skills:{leadership:6, health:6}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[317] = {item_id:317, nshort:'clothes_green', name:'Зелёный костюм', type:'body', level:14, price:260, image:'/images/items/body/clothes_green.png?1', image_mini:'/images/items/body/mini/clothes_green.png?1', bonus:{skills:{leadership:6, hide:6}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[318] = {item_id:318, nshort:'clothes_blue', name:'Синий костюм', type:'body', level:8, price:260, image:'/images/items/body/clothes_blue.png?1', image_mini:'/images/items/body/mini/clothes_blue.png?1', bonus:{skills:{leadership:6, finger_dexterity:6}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[319] = {item_id:319, nshort:'clothes_yellow', name:'Жёлтый костюм', type:'body', level:8, price:260, image:'/images/items/body/clothes_yellow.png?1', image_mini:'/images/items/body/mini/clothes_yellow.png?1', bonus:{skills:{leadership:7}, attributes:{charisma:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[320] = {item_id:320, nshort:'clothes_brown', name:'Коричневый костюм', type:'body', level:8, price:425, image:'/images/items/body/clothes_brown.png?1', image_mini:'/images/items/body/mini/clothes_brown.png?1', bonus:{skills:{leadership:6, swim:5, build:4}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[321] = {item_id:321, nshort:'clothes_black', name:'Чёрный костюм', type:'body', level:8, price:425, image:'/images/items/body/clothes_black.png?1', image_mini:'/images/items/body/mini/clothes_black.png?1', bonus:{skills:{leadership:10, repair:5}}, set:{key:'set_farmer', name:'Набор фермера'}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[322] = {item_id:322, nshort:'clothes_fine', name:'Воскресный костюм', type:'body', level:10, price:1650, image:'/images/items/body/clothes_fine.png?1', image_mini:'/images/items/body/mini/clothes_fine.png?1', bonus:{skills:{leadership:6, finger_dexterity:5, reflex:6, endurance:6}, attributes:{charisma:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[323] = {item_id:323, nshort:'shirt_grey', name:'Серая рубашка', type:'body', level:12, price:310, image:'/images/items/body/shirt_grey.png?1', image_mini:'/images/items/body/mini/shirt_grey.png?1', bonus:{skills:{appearance:13}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[324] = {item_id:324, nshort:'shirt_red', name:'Красная рубашка', type:'body', level:13, price:560, image:'/images/items/body/shirt_red.png?1', image_mini:'/images/items/body/mini/shirt_red.png?1', bonus:{skills:{appearance:9, health:8}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[325] = {item_id:325, nshort:'shirt_green', name:'Зелёная рубашка', type:'body', level:13, price:560, image:'/images/items/body/shirt_green.png?1', image_mini:'/images/items/body/mini/shirt_green.png?1', bonus:{skills:{appearance:9, ride:8}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[326] = {item_id:326, nshort:'shirt_blue', name:'Синяя рубашка', type:'body', level:13, price:560, image:'/images/items/body/shirt_blue.png?1', image_mini:'/images/items/body/mini/shirt_blue.png?1', bonus:{skills:{appearance:9, aim:8}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[327] = {item_id:327, nshort:'shirt_yellow', name:'Жёлтая рубашка', type:'body', level:13, price:560, image:'/images/items/body/shirt_yellow.png?1', image_mini:'/images/items/body/mini/shirt_yellow.png?1', bonus:{skills:{appearance:13}, attributes:{charisma:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[328] = {item_id:328, nshort:'shirt_brown', name:'Коричневая рубашка', type:'body', level:14, price:800, image:'/images/items/body/shirt_brown.png?1', image_mini:'/images/items/body/mini/shirt_brown.png?1', bonus:{skills:{appearance:9, reflex:6, endurance:5}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[329] = {item_id:329, nshort:'shirt_black', name:'Чёрная рубашка', type:'body', level:14, price:800, image:'/images/items/body/shirt_black.png?1', image_mini:'/images/items/body/mini/shirt_black.png?1', bonus:{skills:{appearance:9, pitfall:6}, attributes:{charisma:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[330] = {item_id:330, nshort:'shirt_fine', name:'Знатная рубашка', type:'body', level:15, price:1305, image:'/images/items/body/shirt_fine.png?1', image_mini:'/images/items/body/mini/shirt_fine.png?1', bonus:{skills:{appearance:10, shot:7, ride:7, punch:6}, attributes:{charisma:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[331] = {item_id:331, nshort:'plaid_shirt_grey', name:'Серая клетчатая рубашка', type:'body', level:15, price:560, image:'/images/items/body/plaid_shirt_grey.png?1', image_mini:'/images/items/body/mini/plaid_shirt_grey.png?1', bonus:{skills:{punch:12}, attributes:{strength:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[332] = {item_id:332, nshort:'plaid_shirt_red', name:'Красная клетчатая рубашка', type:'body', level:16, price:800, image:'/images/items/body/plaid_shirt_red.png?1', image_mini:'/images/items/body/mini/plaid_shirt_red.png?1', bonus:{skills:{punch:15}, attributes:{strength:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[333] = {item_id:333, nshort:'plaid_shirt_green', name:'Зелёная клетчатая рубашка', type:'body', level:16, price:800, image:'/images/items/body/plaid_shirt_green.png?1', image_mini:'/images/items/body/mini/plaid_shirt_green.png?1', bonus:{skills:{swim:9, punch:11}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[334] = {item_id:334, nshort:'plaid_shirt_blue', name:'Синяя клетчатая рубашка', type:'body', level:16, price:800, image:'/images/items/body/plaid_shirt_blue.png?1', image_mini:'/images/items/body/mini/plaid_shirt_blue.png?1', bonus:{skills:{shot:9, punch:11}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[335] = {item_id:335, nshort:'plaid_shirt_yellow', name:'Жёлтая клетчатая рубашка', type:'body', level:16, price:800, image:'/images/items/body/plaid_shirt_yellow.png?1', image_mini:'/images/items/body/mini/plaid_shirt_yellow.png?1', bonus:{skills:{tactic:9, punch:11}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[336] = {item_id:336, nshort:'plaid_shirt_brown', name:'Коричневая клетчатая рубашка', type:'body', level:17, price:1200, image:'/images/items/body/plaid_shirt_brown.png?1', image_mini:'/images/items/body/mini/plaid_shirt_brown.png?1', bonus:{skills:{ride:7, punch:12}, attributes:{strength:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[337] = {item_id:337, nshort:'plaid_shirt_black', name:'Чёрная клетчатая рубашка', type:'body', level:17, price:1200, image:'/images/items/body/plaid_shirt_black.png?1', image_mini:'/images/items/body/mini/plaid_shirt_black.png?1', bonus:{skills:{tactic:7, repair:6, punch:11}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[338] = {item_id:338, nshort:'plaid_shirt_fine', name:'Рубаха лесоруба', type:'body', level:19, price:3900, image:'/images/items/body/plaid_shirt_fine.png?1', image_mini:'/images/items/body/mini/plaid_shirt_fine.png?1', bonus:{skills:{animal:8, pitfall:7, hide:8, punch:13}, attributes:{strength:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[339] = {item_id:339, nshort:'vest_grey', name:'Серая жилетка', type:'body', level:16, price:900, image:'/images/items/body/vest_grey.png?1', image_mini:'/images/items/body/mini/vest_grey.png?1', bonus:{skills:{shot:10, reflex:11}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[340] = {item_id:340, nshort:'vest_brown', name:'Коричневая жилетка', type:'body', level:20, price:1800, image:'/images/items/body/vest_brown.png?1', image_mini:'/images/items/body/mini/vest_brown.png?1', bonus:{skills:{shot:7, reflex:9, health:8}, attributes:{flexibility:1}}, set:{key:'set_quackery', name:'Набор знахаря'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[341] = {item_id:341, nshort:'vest_black', name:'Чёрная жилетка', type:'body', level:20, price:1800, image:'/images/items/body/vest_black.png?1', image_mini:'/images/items/body/mini/vest_black.png?1', bonus:{skills:{leadership:8, shot:9, reflex:7}, attributes:{dexterity:1}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[342] = {item_id:342, nshort:'vest_fine', name:'Знатная жилетка', type:'body', level:20, price:5200, image:'/images/items/body/vest_fine.png?1', image_mini:'/images/items/body/mini/vest_fine.png?1', bonus:{skills:{trade:8, shot:10, reflex:10, endurance:9}, attributes:{dexterity:1, flexibility:1}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[343] = {item_id:343, nshort:'coat_grey', name:'Серая куртка', type:'body', level:20, price:1300, image:'/images/items/body/coat_grey.png?1', image_mini:'/images/items/body/mini/coat_grey.png?1', bonus:{skills:{pitfall:12, build:13}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[344] = {item_id:344, nshort:'coat_red', name:'Красная куртка', type:'body', level:20, price:2000, image:'/images/items/body/coat_red.png?1', image_mini:'/images/items/body/mini/coat_red.png?1', bonus:{skills:{pitfall:8, build:12}, attributes:{strength:2}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[345] = {item_id:345, nshort:'coat_green', name:'Зелёная куртка', type:'body', level:20, price:2000, image:'/images/items/body/coat_green.png?1', image_mini:'/images/items/body/mini/coat_green.png?1', bonus:{skills:{pitfall:8, hide:8, build:9}, attributes:{flexibility:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[346] = {item_id:346, nshort:'coat_blue', name:'Синяя куртка', type:'body', level:20, price:2000, image:'/images/items/body/coat_blue.png?1', image_mini:'/images/items/body/mini/coat_blue.png?1', bonus:{skills:{pitfall:11, build:9}, attributes:{dexterity:2}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[347] = {item_id:347, nshort:'coat_yellow', name:'Жёлтая куртка', type:'body', level:20, price:2000, image:'/images/items/body/coat_yellow.png?1', image_mini:'/images/items/body/mini/coat_yellow.png?1', bonus:{skills:{leadership:8, pitfall:8, build:9}, attributes:{charisma:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[348] = {item_id:348, nshort:'coat_brown', name:'Коричневая куртка', type:'body', level:21, price:2500, image:'/images/items/body/coat_brown.png?1', image_mini:'/images/items/body/mini/coat_brown.png?1', bonus:{skills:{pitfall:8, swim:9, build:12}, attributes:{strength:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[349] = {item_id:349, nshort:'coat_black', name:'Чёрная куртка', type:'body', level:21, price:2500, image:'/images/items/body/coat_black.png?1', image_mini:'/images/items/body/mini/coat_black.png?1', bonus:{skills:{animal:9, pitfall:11, build:9}, attributes:{dexterity:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[350] = {item_id:350, nshort:'coat_fine', name:'Знатная куртка', type:'body', level:22, price:6300, image:'/images/items/body/coat_fine.png?1', image_mini:'/images/items/body/mini/coat_fine.png?1', bonus:{skills:{appearance:9, pitfall:11, dodge:9, build:12}, attributes:{dexterity:1, strength:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[351] = {item_id:351, nshort:'jacket_grey', name:'Серый пиджак', type:'body', level:20, price:1850, image:'/images/items/body/jacket_grey.png?1', image_mini:'/images/items/body/mini/jacket_grey.png?1', bonus:{skills:{trade:10, reflex:9}, attributes:{charisma:1, flexibility:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[352] = {item_id:352, nshort:'jacket_brown', name:'Коричневый пиджак', type:'body', level:25, price:3500, image:'/images/items/body/jacket_brown.png?1', image_mini:'/images/items/body/mini/jacket_brown.png?1', bonus:{skills:{trade:10, reflex:9, tough:10}, attributes:{flexibility:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[353] = {item_id:353, nshort:'jacket_black', name:'Чёрный пиджак', type:'body', level:25, price:3500, image:'/images/items/body/jacket_black.png?1', image_mini:'/images/items/body/mini/jacket_black.png?1', bonus:{skills:{trade:10, aim:10, reflex:9}, attributes:{charisma:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[354] = {item_id:354, nshort:'jacket_fine', name:'Знатный пиджак', type:'body', level:27, price:7200, image:'/images/items/body/jacket_fine.png?1', image_mini:'/images/items/body/mini/jacket_fine.png?1', bonus:{skills:{trade:13, aim:9, reflex:13, punch:9}, attributes:{charisma:1, flexibility:1}}, set:{key:'set_gentleman', name:'Набор джентльмена'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[355] = {item_id:355, nshort:'leather_coat_grey', name:'Серая кожанка', type:'body', level:25, price:2700, image:'/images/items/body/leather_coat_grey.png?1', image_mini:'/images/items/body/mini/leather_coat_grey.png?1', bonus:{skills:{hide:12, tough:13}, attributes:{flexibility:1, strength:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[356] = {item_id:356, nshort:'leather_coat_brown', name:'Коричневая кожанка', type:'body', level:28, price:5000, image:'/images/items/body/leather_coat_brown.png?1', image_mini:'/images/items/body/mini/leather_coat_brown.png?1', bonus:{skills:{hide:13, tough:13}, attributes:{flexibility:2, strength:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[357] = {item_id:357, nshort:'leather_coat_black', name:'Чёрная кожанка', type:'body', level:28, price:5000, image:'/images/items/body/leather_coat_black.png?1', image_mini:'/images/items/body/mini/leather_coat_black.png?1', bonus:{skills:{leadership:11, repair:12, hide:11, tough:12}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[358] = {item_id:358, nshort:'leather_coat_fine', name:'Знатная кожанка', type:'body', level:30, price:9000, image:'/images/items/body/leather_coat_fine.png?1', image_mini:'/images/items/body/mini/leather_coat_fine.png?1', bonus:{skills:{appearance:10, finger_dexterity:9, hide:15, tough:16}, attributes:{flexibility:1, strength:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[359] = {item_id:359, nshort:'greatcoat_grey', name:'Серое пальто', type:'body', level:33, price:3500, image:'/images/items/body/greatcoat_grey.png?1', image_mini:'/images/items/body/mini/greatcoat_grey.png?1', bonus:{skills:{tactic:15, shot:14}, attributes:{charisma:1, dexterity:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[360] = {item_id:360, nshort:'greatcoat_brown', name:'Коричневое пальто', type:'body', level:40, price:6280, image:'/images/items/body/greatcoat_brown.png?1', image_mini:'/images/items/body/mini/greatcoat_brown.png?1', bonus:{skills:{tactic:13, shot:13, ride:13, health:12}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[361] = {item_id:361, nshort:'greatcoat_fine', name:'Знатное пальто', type:'body', level:45, price:9500, image:'/images/items/body/greatcoat_fine.png?1', image_mini:'/images/items/body/mini/greatcoat_fine.png?1', bonus:{skills:{tactic:17, shot:16, ride:9, endurance:9}, attributes:{charisma:1, dexterity:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[362] = {item_id:362, nshort:'uniform', name:'Форма', type:'body', level:20, price:800, image:'/images/items/body/uniform.png?1', image_mini:'/images/items/body/mini/uniform.png?1', characterClass:'soldier', bonus:{skills:{appearance:2, hide:4}, attributes:{charisma:2}}, set:{}};
    PK_S3.items[363] = {item_id:363, nshort:'uniform_burned', name:'Палёная форма', type:'body', level:20, price:80, image:'/images/items/body/uniform_burned.png?1', image_mini:'/images/items/body/mini/uniform_burned.png?1', characterClass:'soldier', bonus:{skills:{appearance:-2, hide:4}, attributes:{charisma:2}}, set:{}};
    PK_S3.items[364] = {item_id:364, nshort:'greatcoat_black', name:'Чёрное пальто', type:'body', level:40, price:6280, image:'/images/items/body/greatcoat_black.png?1', image_mini:'/images/items/body/mini/greatcoat_black.png?1', bonus:{skills:{tactic:16, shot:15}, attributes:{charisma:2, dexterity:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[365] = {item_id:365, nshort:'adventurerjacket', name:'Жакет авантюриста', type:'body', level:40, price:0, image:'/images/items/body/adventurerjacket.png?1', image_mini:'/images/items/body/mini/adventurerjacket.png?1', characterClass:'adventurer', bonus:{skills:{hide:4, ride:10, tough:9}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[366] = {item_id:366, nshort:'vest_leather_brown', name:'Жилетка дуэлянта', type:'body', level:14, price:0, image:'/images/items/body/vest_leather_brown.png?1', image_mini:'/images/items/body/mini/vest_leather_brown.png?1', characterClass:'duelist', bonus:{skills:{dodge:8, reflex:7, punch:5}}, set:{}};
    PK_S3.items[367] = {item_id:367, nshort:'shirt_canvas', name:'Жакет трудяги', type:'body', level:8, price:425, image:'/images/items/body/shirt_canvas.png?1', image_mini:'/images/items/body/mini/shirt_canvas.png?1', characterClass:'worker', bonus:{skills:{animal:3, dodge:2}, attributes:{strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[368] = {item_id:368, nshort:'dancer_dress', name:'Платье танцовщицы', type:'body', level:45, price:7500, image:'/images/items/body/dancer_dress.png?1', image_mini:'/images/items/body/mini/dancer_dress.png?1', characterSex:'female', bonus:{skills:{animal:10, finger_dexterity:11, shot:8, endurance:8}, attributes:{charisma:2}}, set:{key:'set_dancer', name:'Набор танцовщицы'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[369] = {item_id:369, nshort:'indian_jacket', name:'Индейское платье', type:'body', level:55, price:7500, image:'/images/items/body/indian_jacket.png?1', image_mini:'/images/items/body/mini/indian_jacket.png?1', bonus:{skills:{pitfall:8, hide:9, punch:8}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_indian', name:'Набор индейца'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[372] = {item_id:372, nshort:'pilger_dress', name:'Платье монашки', type:'body', level:38, price:2500, image:'/images/items/body/pilger_dress.png?1', image_mini:'/images/items/body/mini/pilger_dress.png?1', characterSex:'female', bonus:{skills:{dodge:10, build:8}, attributes:{strength:2}}, set:{key:'set_pilgrim_female', name:'Набор монашки'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[373] = {item_id:373, nshort:'pilger_jacket', name:'Рубаха пастора', type:'body', level:38, price:2500, image:'/images/items/body/pilger_jacket.png?1', image_mini:'/images/items/body/mini/pilger_jacket.png?1', characterSex:'male', bonus:{skills:{hide:10, build:8}, attributes:{dexterity:2}}, set:{key:'set_pilgrim_male', name:'Набор проповедника'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};

PK_S3.items[375] = {item_id:375, nshort:'night_shirt', name:'Ночная рубашка', type:'body', level:45, price:1500, image:'/images/items/body/night_shirt.png?1', image_mini:'/images/items/body/mini/night_shirt.png?1', set:{key:'set_sleeper', name:'Набор сони'}, auctionable:true, dropable:true, sellable:true};

    PK_S3.items[400] = {item_id:400, nshort:'ripped_shoes_grey', name:'Серые стоптанные башмаки', type:'foot', level:1, price:4, image:'/images/items/foot/ripped_shoes_grey.png?1', image_mini:'/images/items/foot/mini/ripped_shoes_grey.png?1', bonus:{skills:{repair:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[401] = {item_id:401, nshort:'ripped_shoes_brown', name:'Коричневые стоптанные башмаки', type:'foot', level:3, price:30, image:'/images/items/foot/ripped_shoes_brown.png?1', image_mini:'/images/items/foot/mini/ripped_shoes_brown.png?1', bonus:{skills:{swim:4, build:4}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[402] = {item_id:402, nshort:'ripped_shoes_black', name:'Чёрные стоптанные башмаки', type:'foot', level:3, price:30, image:'/images/items/foot/ripped_shoes_black.png?1', image_mini:'/images/items/foot/mini/ripped_shoes_black.png?1', bonus:{skills:{leadership:4, repair:4}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[403] = {item_id:403, nshort:'light_grey', name:'Серые матерчатые ботинки', type:'foot', level:5, price:70, image:'/images/items/foot/light_grey.png?1', image_mini:'/images/items/foot/mini/light_grey.png?1', bonus:{skills:{endurance:5}, attributes:{strength:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[404] = {item_id:404, nshort:'light_brown', name:'Коричневые матерчатые ботинки', type:'foot', level:9, price:170, image:'/images/items/foot/light_brown.png?1', image_mini:'/images/items/foot/mini/light_brown.png?1', bonus:{skills:{hide:5, endurance:3}, attributes:{strength:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[405] = {item_id:405, nshort:'light_black', name:'Чёрные матерчатые ботинки', type:'foot', level:9, price:170, image:'/images/items/foot/light_black.png?1', image_mini:'/images/items/foot/mini/light_black.png?1', bonus:{skills:{trade:5, shot:5, endurance:3}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[406] = {item_id:406, nshort:'light_fine', name:'Знатные матерчатые ботинки', type:'foot', level:11, price:1500, image:'/images/items/foot/light_fine.png?1', image_mini:'/images/items/foot/mini/light_fine.png?1', bonus:{skills:{appearance:6, pitfall:6, reflex:6, endurance:4}, attributes:{strength:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[407] = {item_id:407, nshort:'working_grey', name:'Серые рабочие ботинки', type:'foot', level:9, price:660, image:'/images/items/foot/working_grey.png?1', image_mini:'/images/items/foot/mini/working_grey.png?1', bonus:{skills:{pitfall:12}, attributes:{dexterity:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[408] = {item_id:408, nshort:'working_brown', name:'Коричневые рабочие ботинки', type:'foot', level:13, price:1200, image:'/images/items/foot/working_brown.png?1', image_mini:'/images/items/foot/mini/working_brown.png?1', bonus:{skills:{pitfall:8, ride:7, endurance:7}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[409] = {item_id:409, nshort:'working_black', name:'Чёрные рабочие ботинки', type:'foot', level:13, price:1200, image:'/images/items/foot/working_black.png?1', image_mini:'/images/items/foot/mini/working_black.png?1', bonus:{skills:{tactic:7, pitfall:10}, attributes:{dexterity:1}}, set:{key:'set_farmer', name:'Набор фермера'}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[410] = {item_id:410, nshort:'working_fine', name:'Знатные рабочие ботинки', type:'foot', level:15, price:4300, image:'/images/items/foot/working_fine.png?1', image_mini:'/images/items/foot/mini/working_fine.png?1', bonus:{skills:{trade:8, pitfall:11, dodge:8, punch:8}, attributes:{dexterity:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[411] = {item_id:411, nshort:'spur_grey', name:'Серые ботинки со шпорами', type:'foot', level:14, price:1400, image:'/images/items/foot/spur_grey.png?1', image_mini:'/images/items/foot/mini/spur_grey.png?1', bonus:{skills:{animal:7, shot:7}, attributes:{charisma:1, dexterity:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[412] = {item_id:412, nshort:'spur_brown', name:'Коричневые ботинки со шпорами', type:'foot', level:17, price:2450, image:'/images/items/foot/spur_brown.png?1', image_mini:'/images/items/foot/mini/spur_brown.png?1', bonus:{skills:{animal:7, shot:6, reflex:9, tough:9}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[413] = {item_id:413, nshort:'spur_black', name:'Чёрные ботинки со шпорами', type:'foot', level:17, price:2450, image:'/images/items/foot/spur_black.png?1', image_mini:'/images/items/foot/mini/spur_black.png?1', bonus:{skills:{animal:10, shot:9}, attributes:{charisma:1, dexterity:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[414] = {item_id:414, nshort:'spur_fine', name:'Знатные ботинки со шпорами', type:'foot', level:20, price:6230, image:'/images/items/foot/spur_fine.png?1', image_mini:'/images/items/foot/mini/spur_fine.png?1', bonus:{skills:{animal:11, shot:10, swim:8, health:8}, attributes:{charisma:1, dexterity:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[415] = {item_id:415, nshort:'boots_grey', name:'Серые сапоги', type:'foot', level:16, price:3000, image:'/images/items/foot/boots_grey.png?1', image_mini:'/images/items/foot/mini/boots_grey.png?1', bonus:{skills:{tactic:12, shot:12}, attributes:{charisma:1, dexterity:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[416] = {item_id:416, nshort:'boots_brown', name:'Коричневые сапоги', type:'foot', level:20, price:5100, image:'/images/items/foot/boots_brown.png?1', image_mini:'/images/items/foot/mini/boots_brown.png?1', bonus:{skills:{tactic:10, shot:9, dodge:12, tough:12}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[417] = {item_id:417, nshort:'boots_black', name:'Чёрные сапоги', type:'foot', level:20, price:5100, image:'/images/items/foot/boots_black.png?1', image_mini:'/images/items/foot/mini/boots_black.png?1', bonus:{skills:{tactic:12, shot:11}, attributes:{charisma:2, dexterity:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[418] = {item_id:418, nshort:'boots_fine', name:'Знатные сапоги', type:'foot', level:22, price:8870, image:'/images/items/foot/boots_fine.png?1', image_mini:'/images/items/foot/mini/boots_fine.png?1', bonus:{skills:{tactic:10, shot:9, hide:8, endurance:8}, attributes:{charisma:2, dexterity:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[419] = {item_id:419, nshort:'rider_grey', name:'Серые ковбойские сапоги', type:'foot', level:30, price:2600, image:'/images/items/foot/rider_grey.png?1', image_mini:'/images/items/foot/mini/rider_grey.png?1', bonus:{skills:{ride:15, punch:14}, attributes:{flexibility:1, strength:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[420] = {item_id:420, nshort:'rider_brown', name:'Коричневые ковбойские сапоги', type:'foot', level:33, price:6200, image:'/images/items/foot/rider_brown.png?1', image_mini:'/images/items/foot/mini/rider_brown.png?1', bonus:{skills:{ride:14, punch:13}, attributes:{flexibility:2, strength:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[421] = {item_id:421, nshort:'rider_black', name:'Чёрные ковбойские сапоги', type:'foot', level:33, price:6200, image:'/images/items/foot/rider_black.png?1', image_mini:'/images/items/foot/mini/rider_black.png?1', bonus:{skills:{animal:14, pitfall:13}, attributes:{charisma:2, dexterity:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[422] = {item_id:422, nshort:'rider_fine', name:'Знатные ковбойские сапоги', type:'foot', level:35, price:9500, image:'/images/items/foot/rider_fine.png?1', image_mini:'/images/items/foot/mini/rider_fine.png?1', bonus:{skills:{appearance:8, aim:8, ride:11, punch:10}, attributes:{flexibility:2, strength:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[423] = {item_id:423, nshort:'soldier_boots', name:'Солдатские сапоги', type:'foot', level:30, price:5500, image:'/images/items/foot/soldier_boots.png?1', image_mini:'/images/items/foot/mini/soldier_boots.png?1', characterClass:'soldier', bonus:{skills:{tactic:9, ride:12, health:12, tough:10}}, set:{}, sellable:true};

    PK_S3.items[425] = {item_id:425, nshort:'lace-up_shoes_brown', name:'Башмаки дуэлянта', type:'foot', level:13, price:1290, image:'/images/items/foot/lace-up_shoes_brown.png?1', image_mini:'/images/items/foot/mini/lace-up_shoes_brown.png?1', characterClass:'duelist', bonus:{skills:{appearance:4, shot:4, aim:5}, attributes:{dexterity:2}}, set:{}, sellable:true};
    PK_S3.items[426] = {item_id:426, nshort:'pilgrim_shoes_brown', name:'Ботинки трудяги', type:'foot', level:15, price:1530, image:'/images/items/foot/pilgrim_shoes_brown.png?1', image_mini:'/images/items/foot/mini/pilgrim_shoes_brown.png?1', characterClass:'worker', bonus:{skills:{repair:6, punch:6, build:4}, attributes:{strength:2}}, set:{}, sellable:true};
    PK_S3.items[427] = {item_id:427, nshort:'gentleman_shoes', name:'Знатные башмаки', type:'foot', level:45, price:5600, image:'/images/items/foot/gentleman_shoes.png?1', image_mini:'/images/items/foot/mini/gentleman_shoes.png?1', characterSex:'male', bonus:{skills:{appearance:8, reflex:9}, attributes:{dexterity:2, strength:2}}, set:{key:'set_gentleman', name:'Набор джентльмена'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[428] = {item_id:428, nshort:'mexican_shoes', name:'Сандалии', type:'foot', level:28, price:2650, image:'/images/items/foot/mexican_shoes.png?1', image_mini:'/images/items/foot/mini/mexican_shoes.png?1', bonus:{skills:{animal:7, aim:6, dodge:8, health:8}}, set:{key:'set_mexican', name:'Набор мексиканца'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[429] = {item_id:429, nshort:'mokassins', name:'Мокасины', type:'foot', level:45, price:5600, image:'/images/items/foot/mokassins.png?1', image_mini:'/images/items/foot/mini/mokassins.png?1', bonus:{skills:{tactic:9, hide:9, endurance:9}, attributes:{flexibility:2}}, set:{key:'set_indian', name:'Набор индейца'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[431] = {item_id:431, nshort:'pilger_boots', name:'Монашеские туфли', type:'foot', level:39, price:2600, image:'/images/items/foot/pilger_boots.png?1', image_mini:'/images/items/foot/mini/pilger_boots.png?1', characterSex:'female', bonus:{skills:{finger_dexterity:8, shot:8, hide:6, build:7}}, set:{key:'set_pilgrim_female', name:'Набор монашки'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[432] = {item_id:432, nshort:'pilger_shoes', name:'Туфли монаха', type:'foot', level:39, price:2600, image:'/images/items/foot/pilger_shoes.png?1', image_mini:'/images/items/foot/mini/pilger_shoes.png?1', characterSex:'male', bonus:{skills:{leadership:8, reflex:8, tough:6, build:7}}, set:{key:'set_pilgrim_male', name:'Набор проповедника'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[433] = {item_id:433, nshort:'dancer_boots', name:'Сапожки на каблуках', type:'foot', level:41, price:4000, image:'/images/items/foot/dancer_boots.png?1', image_mini:'/images/items/foot/mini/dancer_boots.png?1', characterSex:'female', bonus:{skills:{repair:8, aim:9}, attributes:{charisma:1, dexterity:2}}, set:{key:'set_dancer', name:'Набор танцовщицы'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[435] = {item_id:435, nshort:'quackery_shoes', name:'Знахарские башмаки', type:'foot', level:45, price:5600, image:'/images/items/foot/quackery_shoes.png?1', image_mini:'/images/items/foot/mini/quackery_shoes.png?1', bonus:{skills:{trade:9, swim:9, ride:9}, attributes:{flexibility:2}}, set:{key:'set_quackery', name:'Набор знахаря'}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[436] = {item_id:436, nshort:'slippers', name:'Тапочки', type:'foot', level:45, price:2000, image:'/images/items/foot/slippers.png?1', image_mini:'/images/items/foot/mini/slippers.png?1', set:{key:'set_sleeper', name:'Набор сони'}, auctionable:true, dropable:true, sellable:true};
    PK_S3.items[437] = {item_id:437, nshort:'thanksgiving_boots', name:'Сапоги со Дня благодарения', type:'foot', level:30, price:4600, image:'/images/items/foot/thanksgiving_boots.png?1', image_mini:'/images/items/foot/mini/thanksgiving_boots.png?1', bonus:{skills:{hide:6, tough:12}, attributes:{dexterity:2}}, set:{key:'season_set', name:'Праздничный наряд'}, traderlevel:99, tradeable:true, sellable:true};
    PK_S3.items[438] = {item_id:438, nshort:'greenhorn_shoes', name:'Башмаки на новенького', type:'foot', level:6, price:460, image:'/images/items/foot/greenhorn_shoes.png?1', image_mini:'/images/items/foot/mini/greenhorn_shoes.png?1', bonus:{skills:{finger_dexterity:3, reflex:6}, attributes:{dexterity:1}}, set:{key:'greenhorn_set', name:'Набор чечако'}, sellable:true};
    PK_S3.items[439] = {item_id:439, nshort:'collector_shoes', name:'Сапоги коллекционера', type:'foot', level:100, price:0, image:'/images/items/foot/collector_shoes.png?1', image_mini:'/images/items/foot/mini/collector_shoes.png?1', bonus:{skills:{pitfall:15, tough:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Набор коллекционера'}, traderlevel:99, tradeable:true};
    PK_S3.items[440] = {item_id:440, nshort:'bunny_shoes', name:'Заячьи тапки', type:'foot', level:1, price:0, image:'/images/items/foot/bunny_shoes.png?1', image_mini:'/images/items/foot/mini/bunny_shoes.png?1', bonus:{skills:{animal:2}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'bunny_set', name:'Костюм зайца'}, traderlevel:99, tradeable:true};

PK_S3.items[500] = {item_id:500, nshort:'neckband_grey', name:'Серый шарф', type:'neck', level:0, price:10, image:'/images/items/neck/neckband_grey.png?1', image_mini:'images/items/neck/neckband_grey.png?1', bonus:{skills:{swim:2}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[501] = {item_id:501, nshort:'neckband_red', name:'Красный шарф', type:'neck', level:0, price:14, image:'/images/items/neck/neckband_red.png?1', image_mini:'images/items/neck/neckband_red.png?1', bonus:{skills:{swim:2, build:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[502] = {item_id:502, nshort:'neckband_green', name:'Зелёный шарф', type:'neck', level:0, price:14, image:'/images/items/neck/neckband_green.png?1', image_mini:'images/items/neck/neckband_green.png?1', bonus:{skills:{swim:3}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[503] = {item_id:503, nshort:'neckband_blue', name:'Синий шарф', type:'neck', level:0, price:14, image:'/images/items/neck/neckband_blue.png?1', image_mini:'images/items/neck/neckband_blue.png?1', bonus:{skills:{swim:2, aim:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[504] = {item_id:504, nshort:'neckband_yellow', name:'Жёлтый шарф', type:'neck', level:0, price:14, image:'/images/items/neck/neckband_yellow.png?1', image_mini:'images/items/neck/neckband_yellow.png?1', bonus:{skills:{swim:2, appearance:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[505] = {item_id:505, nshort:'neckband_brown', name:'Коричневый шарф', type:'neck', level:0, price:20, image:'/images/items/neck/neckband_brown.png?1', image_mini:'images/items/neck/neckband_brown.png?1', bonus:{skills:{swim:3, health:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[506] = {item_id:506, nshort:'neckband_black', name:'Чёрный шарф', type:'neck', level:0, price:20, image:'/images/items/neck/neckband_black.png?1', image_mini:'images/items/neck/neckband_black.png?1', bonus:{skills:{swim:2, tactic:1, shot:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[507] = {item_id:507, nshort:'indian_chain_grey', name:'Серое индейское ожерелье', type:'neck', level:0, price:35, image:'/images/items/neck/indian_chain_grey.png?1', image_mini:'images/items/neck/indian_chain_grey.png?1', bonus:{skills:{animal:5}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[508] = {item_id:508, nshort:'indian_chain_red', name:'Красное индейское ожерелье', type:'neck', level:0, price:75, image:'/images/items/neck/indian_chain_red.png?1', image_mini:'images/items/neck/indian_chain_red.png?1', bonus:{skills:{animal:5, endurance:2}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[509] = {item_id:509, nshort:'indian_chain_green', name:'Зелёное индейское ожерелье', type:'neck', level:0, price:75, image:'/images/items/neck/indian_chain_green.png?1', image_mini:'images/items/neck/indian_chain_green.png?1', bonus:{skills:{animal:5, ride:2}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[510] = {item_id:510, nshort:'indian_chain_blue', name:'Синее индейское ожерелье', type:'neck', level:0, price:75, image:'/images/items/neck/indian_chain_blue.png?1', image_mini:'images/items/neck/indian_chain_blue.png?1', bonus:{skills:{animal:5, finger_dexterity:2}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[511] = {item_id:511, nshort:'indian_chain_yellow', name:'Жёлтое индейское ожерелье', type:'neck', level:0, price:75, image:'/images/items/neck/indian_chain_yellow.png?1', image_mini:'images/items/neck/indian_chain_yellow.png?1', bonus:{skills:{animal:7}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[512] = {item_id:512, nshort:'indian_chain_fine', name:'Золотое индейское ожерелье', type:'neck', level:0, price:660, image:'/images/items/neck/indian_chain_fine.png?1', image_mini:'images/items/neck/indian_chain_fine.png?1', bonus:{skills:{animal:8, pitfall:3, hide:4, punch:4}}, set:{key:'set_indian', name:'Набор индейца'}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[513] = {item_id:513, nshort:'loop_grey', name:'Серая повязка', type:'neck', level:0, price:125, image:'/images/items/neck/loop_grey.png?1', image_mini:'images/items/neck/loop_grey.png?1', bonus:{skills:{shot:9}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[514] = {item_id:514, nshort:'loop_red', name:'Красная повязка', type:'neck', level:0, price:240, image:'/images/items/neck/loop_red.png?1', image_mini:'images/items/neck/loop_red.png?1', bonus:{skills:{shot:8, health:4}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[515] = {item_id:515, nshort:'loop_green', name:'Зелёная повязка', type:'neck', level:0, price:240, image:'/images/items/neck/loop_green.png?1', image_mini:'images/items/neck/loop_green.png?1', bonus:{skills:{shot:8, swim:4}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[516] = {item_id:516, nshort:'loop_blue', name:'Синяя повязка', type:'neck', level:0, price:240, image:'/images/items/neck/loop_blue.png?1', image_mini:'images/items/neck/loop_blue.png?1', bonus:{skills:{shot:12}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[517] = {item_id:517, nshort:'loop_yellow', name:'Жёлтая повязка', type:'neck', level:0, price:240, image:'/images/items/neck/loop_yellow.png?1', image_mini:'images/items/neck/loop_yellow.png?1', bonus:{skills:{trade:4, shot:8}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[518] = {item_id:518, nshort:'loop_brown', name:'Коричневая повязка', type:'neck', level:0, price:385, image:'/images/items/neck/loop_brown.png?1', image_mini:'images/items/neck/loop_brown.png?1', bonus:{skills:{shot:8, dodge:4, endurance:3}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[519] = {item_id:519, nshort:'loop_black', name:'Чёрная повязка', type:'neck', level:0, price:385, image:'/images/items/neck/loop_black.png?1', image_mini:'images/items/neck/loop_black.png?1', bonus:{skills:{appearance:3, shot:11}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[520] = {item_id:520, nshort:'fly_grey', name:'Серая бабочка', type:'neck', level:0, price:282, image:'/images/items/neck/fly_grey.png?1', image_mini:'images/items/neck/fly_grey.png?1', bonus:{skills:{build:13}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[521] = {item_id:521, nshort:'fly_red', name:'Красная бабочка', type:'neck', level:0, price:446, image:'/images/items/neck/fly_red.png?1', image_mini:'images/items/neck/fly_red.png?1', bonus:{skills:{build:11}, attributes:{strength:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[522] = {item_id:522, nshort:'fly_green', name:'Зелёная бабочка', type:'neck', level:0, price:446, image:'/images/items/neck/fly_green.png?1', image_mini:'images/items/neck/fly_green.png?1', bonus:{skills:{ride:6, build:11}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[523] = {item_id:523, nshort:'fly_blue', name:'Синяя бабочка', type:'neck', level:0, price:446, image:'/images/items/neck/fly_blue.png?1', image_mini:'images/items/neck/fly_blue.png?1', bonus:{skills:{aim:6, build:11}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[524] = {item_id:524, nshort:'fly_yellow', name:'Жёлтая бабочка', type:'neck', level:0, price:446, image:'/images/items/neck/fly_yellow.png?1', image_mini:'images/items/neck/fly_yellow.png?1', bonus:{skills:{animal:6, build:11}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[525] = {item_id:525, nshort:'fly_brown', name:'Коричневая бабочка', type:'neck', level:0, price:650, image:'/images/items/neck/fly_brown.png?1', image_mini:'images/items/neck/fly_brown.png?1', bonus:{skills:{hide:4, build:10}, attributes:{strength:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[526] = {item_id:526, nshort:'fly_black', name:'Чёрная бабочка', type:'neck', level:0, price:650, image:'/images/items/neck/fly_black.png?1', image_mini:'images/items/neck/fly_black.png?1', bonus:{skills:{trade:4, pitfall:4, build:11}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[527] = {item_id:527, nshort:'fly_fine', name:'Знатная бабочка', type:'neck', level:0, price:2200, image:'/images/items/neck/fly_fine.png?1', image_mini:'images/items/neck/fly_fine.png?1', bonus:{skills:{tactic:5, repair:6, dodge:6, build:11}, attributes:{strength:1}}, set:{key:'set_quackery', name:'Набор знахаря'}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[528] = {item_id:528, nshort:'cross_bronze', name:'Железный крест', type:'neck', level:0, price:730, image:'/images/items/neck/cross_bronze.png?1', image_mini:'images/items/neck/cross_bronze.png?1', bonus:{attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{key:'set_pilgrim_female', name:'Набор монашки'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[529] = {item_id:529, nshort:'cross_silver', name:'Серебряный крест', type:'neck', level:0, price:1200, image:'/images/items/neck/cross_silver.png?1', image_mini:'images/items/neck/cross_silver.png?1', bonus:{attributes:{charisma:1, dexterity:1, flexibility:2, strength:1}}, set:{key:'set_pilgrim_male', name:'Набор проповедника'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[530] = {item_id:530, nshort:'cross_gold', name:'Золотой крест', type:'neck', level:0, price:3400, image:'/images/items/neck/cross_gold.png?1', image_mini:'images/items/neck/cross_gold.png?1', bonus:{attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[531] = {item_id:531, nshort:'cravat_grey', name:'Серый галстук', type:'neck', level:0, price:820, image:'/images/items/neck/cravat_grey.png?1', image_mini:'images/items/neck/cravat_grey.png?1', bonus:{skills:{leadership:11, health:10}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[532] = {item_id:532, nshort:'cravat_red', name:'Красный галстук', type:'neck', level:0, price:1205, image:'/images/items/neck/cravat_red.png?1', image_mini:'images/items/neck/cravat_red.png?1', bonus:{skills:{leadership:8, health:7}, attributes:{strength:2}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[533] = {item_id:533, nshort:'cravat_green', name:'Зелёный галстук', type:'neck', level:0, price:1205, image:'/images/items/neck/cravat_green.png?1', image_mini:'images/items/neck/cravat_green.png?1', bonus:{skills:{leadership:8, reflex:9, health:8}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[534] = {item_id:534, nshort:'cravat_blue', name:'Синий галстук', type:'neck', level:0, price:1205, image:'/images/items/neck/cravat_blue.png?1', image_mini:'images/items/neck/cravat_blue.png?1', bonus:{skills:{leadership:8, shot:9, health:8}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[535] = {item_id:535, nshort:'cravat_yellow', name:'Жёлтый галстук', type:'neck', level:0, price:1205, image:'/images/items/neck/cravat_yellow.png?1', image_mini:'images/items/neck/cravat_yellow.png?1', bonus:{skills:{leadership:7, health:8}, attributes:{charisma:2}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[536] = {item_id:536, nshort:'cravat_brown', name:'Коричневый галстук', type:'neck', level:0, price:1500, image:'/images/items/neck/cravat_brown.png?1', image_mini:'images/items/neck/cravat_brown.png?1', bonus:{skills:{leadership:8, dodge:6, health:9}, attributes:{strength:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[537] = {item_id:537, nshort:'cravat_black', name:'Чёрный галстук', type:'neck', level:0, price:1500, image:'/images/items/neck/cravat_black.png?1', image_mini:'images/items/neck/cravat_black.png?1', bonus:{skills:{leadership:9, finger_dexterity:6, health:8}, attributes:{charisma:1}}, set:{key:'set_gentleman', name:'Набор джентльмена'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[538] = {item_id:538, nshort:'cravat_fine', name:'Знатный галстук', type:'neck', level:0, price:4400, image:'/images/items/neck/cravat_fine.png?1', image_mini:'images/items/neck/cravat_fine.png?1', bonus:{skills:{leadership:10, pitfall:7, swim:8, health:10}, attributes:{charisma:1, strength:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[539] = {item_id:539, nshort:'bullet_metal', name:'Свинцовая пуля', type:'neck', level:0, price:1800, image:'/images/items/neck/bullet_metal.png?1', image_mini:'images/items/neck/bullet_metal.png?1', bonus:{attributes:{charisma:1, dexterity:1, flexibility:2, strength:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[540] = {item_id:540, nshort:'bullet_silver', name:'Серебряная пуля', type:'neck', level:0, price:3350, image:'/images/items/neck/bullet_silver.png?1', image_mini:'images/items/neck/bullet_silver.png?1', bonus:{attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[541] = {item_id:541, nshort:'bullet_gold', name:'Золотая пуля', type:'neck', level:0, price:6750, image:'/images/items/neck/bullet_gold.png?1', image_mini:'images/items/neck/bullet_gold.png?1', bonus:{attributes:{charisma:2, dexterity:3, flexibility:3, strength:3}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[542] = {item_id:542, nshort:'kerchief_grey', name:'Серый платок', type:'neck', level:0, price:2500, image:'/images/items/neck/kerchief_grey.png?1', image_mini:'images/items/neck/kerchief_grey.png?1', bonus:{skills:{appearance:12, finger_dexterity:13}, attributes:{charisma:1, dexterity:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[543] = {item_id:543, nshort:'kerchief_red', name:'Красный платок', type:'neck', level:0, price:3400, image:'/images/items/neck/kerchief_red.png?1', image_mini:'images/items/neck/kerchief_red.png?1', bonus:{skills:{appearance:13, finger_dexterity:13, build:14}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[544] = {item_id:544, nshort:'kerchief_green', name:'Зелёный платок', type:'neck', level:0, price:3400, image:'/images/items/neck/kerchief_green.png?1', image_mini:'images/items/neck/kerchief_green.png?1', bonus:{skills:{appearance:13, finger_dexterity:13, ride:14}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[545] = {item_id:545, nshort:'kerchief_blue', name:'Синий платок', type:'neck', level:0, price:3400, image:'/images/items/neck/kerchief_blue.png?1', image_mini:'images/items/neck/kerchief_blue.png?1', bonus:{skills:{appearance:13, finger_dexterity:12}, attributes:{dexterity:3}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[546] = {item_id:546, nshort:'kerchief_yellow', name:'Жёлтый платок', type:'neck', level:0, price:3400, image:'/images/items/neck/kerchief_yellow.png?1', image_mini:'images/items/neck/kerchief_yellow.png?1', bonus:{skills:{appearance:12, finger_dexterity:13}, attributes:{charisma:3}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[547] = {item_id:547, nshort:'kerchief_brown', name:'Коричневый платок', type:'neck', level:0, price:4360, image:'/images/items/neck/kerchief_brown.png?1', image_mini:'images/items/neck/kerchief_brown.png?1', bonus:{skills:{appearance:13, finger_dexterity:13, hide:9, punch:10}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[548] = {item_id:548, nshort:'kerchief_black', name:'Чёрный платок', type:'neck', level:0, price:4360, image:'/images/items/neck/kerchief_black.png?1', image_mini:'images/items/neck/kerchief_black.png?1', bonus:{skills:{appearance:12, finger_dexterity:13}, attributes:{charisma:2, dexterity:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[549] = {item_id:549, nshort:'bullchain_metal', name:'Железный бизон', type:'neck', level:0, price:2400, image:'/images/items/neck/bullchain_metal.png?1', image_mini:'images/items/neck/bullchain_metal.png?1', bonus:{attributes:{charisma:1, dexterity:2, flexibility:2, strength:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[550] = {item_id:550, nshort:'bullchain_silver', name:'Серебряный бизон', type:'neck', level:0, price:4490, image:'/images/items/neck/bullchain_silver.png?1', image_mini:'images/items/neck/bullchain_silver.png?1', bonus:{attributes:{charisma:3, dexterity:2, flexibility:2, strength:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[551] = {item_id:551, nshort:'bullchain_gold', name:'Золотой бизон', type:'neck', level:0, price:8300, image:'/images/items/neck/bullchain_gold.png?1', image_mini:'images/items/neck/bullchain_gold.png?1', bonus:{attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[552] = {item_id:552, nshort:'talisman', name:'Талисман', type:'neck', level:0, price:1000, image:'/images/items/neck/talisman.png?1', image_mini:'images/items/neck/talisman.png?1', set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[553] = {item_id:553, nshort:'stonechain', name:'Каменный медальон', type:'neck', level:0, price:1000, image:'/images/items/neck/stonechain.png?1', image_mini:'images/items/neck/stonechain.png?1', set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[554] = {item_id:554, nshort:'southcross', name:'Медаль за мужество', type:'neck', level:0, price:650, image:'/images/items/neck/southcross.png?1', image_mini:'images/items/neck/southcross.png?1', characterClass:'soldier', bonus:{skills:{appearance:7, tactic:8, ride:4}}, set:{}, traderlevel:11, tradeable:true, sellable:true};
    PK_S3.items[555] = {item_id:555, nshort:'aztecchains', name:'Ожерелье ацтеков', type:'neck', level:0, price:1200, image:'/images/items/neck/aztecchains.png?1', image_mini:'images/items/neck/aztecchains.png?1', characterClass:'adventurer', bonus:{skills:{hide:9, ride:10, tough:8}}, set:{}, sellable:true};
    PK_S3.items[556] = {item_id:556, nshort:'arrowhead', name:'Наконечник стрелы', type:'neck', level:0, price:1150, image:'/images/items/neck/arrowhead.png?1', image_mini:'images/items/neck/arrowhead.png?1', characterClass:'duelist', bonus:{skills:{shot:7, aim:7}}, set:{}, sellable:true};
    PK_S3.items[557] = {item_id:557, nshort:'bone_necklace', name:'Костяное ожерелье', type:'neck', level:0, price:1700, image:'/images/items/neck/bone_necklace.png?1', image_mini:'images/items/neck/bone_necklace.png?1', characterClass:'worker', bonus:{skills:{appearance:3}, attributes:{strength:5}}, set:{}, sellable:true};

    PK_S3.items[561] = {item_id:561, nshort:'mexican_neck', name:'Мексиканский шарф', type:'neck', level:28, price:600, image:'/images/items/neck/mexican_neck.png?1', image_mini:'images/items/neck/mexican_neck.png?1', bonus:{skills:{punch:17}}, set:{key:'set_mexican', name:'Набор мексиканца'}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[566] = {item_id:566, nshort:'dancer_chain', name:'Жемчужное ожерелье', type:'neck', level:43, price:1800, image:'/images/items/neck/dancer_chain.png?1', image_mini:'images/items/neck/dancer_chain.png?1', characterSex:'female', bonus:{skills:{trade:9, leadership:8, pitfall:6}, attributes:{charisma:1}}, set:{key:'set_dancer', name:'Набор танцовщицы'}, auctionable:true, dropable:true, sellable:true};
    PK_S3.items[567] = {item_id:567, nshort:'amulett', name:'Сердечный амулет', type:'neck', level:30, price:2412, image:'/images/items/neck/amulett.png?1', image_mini:'images/items/neck/amulett.png?1', bonus:{skills:{appearance:15, animal:15, trade:15, leadership:15}}, set:{key:'season_set', name:'Праздничный наряд'}, traderlevel:100, tradeable:true, sellable:true};
    PK_S3.items[568] = {item_id:568, nshort:'teethchain', name:'Талисман от вурдалака', type:'neck', level:40, price:2012, image:'/images/items/neck/teethchain.png?1', image_mini:'images/items/neck/teethchain.png?1', bonus:{skills:{tactic:4, leadership:8, hide:4}, attributes:{charisma:3}}, set:{}, traderlevel:100, tradeable:true, sellable:true};
    PK_S3.items[569] = {item_id:569, nshort:'greenhorn_neck', name:'Платок от пыли', type:'neck', level:1, price:350, image:'/images/items/neck/greenhorn_neck.png?1', image_mini:'images/items/neck/greenhorn_neck.png?1', bonus:{skills:{hide:1, endurance:2}}, set:{key:'greenhorn_set', name:'Набор чечако'}, sellable:true};
    PK_S3.items[570] = {item_id:570, nshort:'xmas_schal', name:'Тёплый шарф', type:'neck', level:1, price:2010, image:'/images/items/neck/xmas_schal.png?1', image_mini:'images/items/neck/xmas_schal.png?1', bonus:{attributes:{charisma:1}}, set:{}, traderlevel:66, auctionable:true, tradeable:true, sellable:true};
    PK_S3.items[571] = {item_id:571, nshort:'geronimo_headband', name:'Бандана Джеронимо', type:'head', level:1, price:100, image:'/images/items/head/geronimo_headband.png?1', image_mini:'/images/items/head/mini/geronimo_headband.png?1', bonus:{skills:{tactic:10, leadership:10, health:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, auctionable:true, tradeable:true, sellable:true};
    PK_S3.items[572] = {item_id:572, nshort:'scalp', name:'Скальп', type:'neck', level:1, price:10, image:'/images/items/neck/scalp.png?1', image_mini:'images/items/neck/scalp.png?1', bonus:{skills:{leadership:10, hide:10, endurance:10}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true, sellable:true};
    PK_S3.items[573] = {item_id:573, nshort:'alienskin', name:'Кулон Покахонтас', type:'neck', level:1, price:1000, image:'/images/items/neck/alienskin.png?1', image_mini:'images/items/neck/alienskin.png?1', bonus:{skills:{appearance:2, endurance:2}, attributes:{strength:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true, sellable:true};
    PK_S3.items[574] = {item_id:574, nshort:'neckband_golddigger', name:'Платок золотоискателя', type:'neck', level:10, price:35, image:'/images/items/neck/neckband_golddigger.png?1', image_mini:'images/items/neck/neckband_golddigger.png?1', bonus:{skills:{trade:1, endurance:1, tough:1}}, set:{}, dropable:true, sellable:true};
    PK_S3.items[575] = {item_id:575, nshort:'collector_neck', name:'Ожерелье коллекционера', type:'neck', level:100, price:0, image:'/images/items/neck/collector_neck.png?1', image_mini:'images/items/neck/collector_neck.png?1', bonus:{skills:{tactic:15, ride:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Набор коллекционера'}, dropable:true};
    PK_S3.items[576] = {item_id:576, nshort:'roalstad_scarf', name:'Шаль Марии Роальстед', type:'neck', level:90, price:500, image:'/images/items/neck/roalstad_scarf.png?1', image_mini:'images/items/neck/roalstad_scarf.png?1', bonus:{skills:{appearance:12, trade:12, ride:16}, attributes:{charisma:3}, fortbattle:{defense:5}, fortbattlesector:{}}, set:{}, sellable:true};

    PK_S3.items[600] = {item_id:600, nshort:'donkey', name:'Осёл', type:'animal', level:1, price:250, image:'/images/items/animal/donkey.png?1', image_mini:'/images/items/animal/mini/donkey.png?1', speed:0.8, set:{key:'set_mexican', name:'Набор мексиканца'}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[601] = {item_id:601, nshort:'pony', name:'Пони', type:'animal', level:1, price:500, image:'/images/items/animal/pony.png?1', image_mini:'/images/items/animal/mini/pony.png?1', speed:0.666, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[602] = {item_id:602, nshort:'mustang', name:'Мустанг', type:'animal', level:1, price:850, image:'/images/items/animal/mustang.png?1', image_mini:'/images/items/animal/mini/mustang.png?1', speed:0.571, set:{key:'set_indian', name:'Набор индейца'}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[603] = {item_id:603, nshort:'berber', name:'Рысак', type:'animal', level:1, price:1250, image:'/images/items/animal/berber.png?1', image_mini:'/images/items/animal/mini/berber.png?1', speed:0.5, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[604] = {item_id:604, nshort:'araber', name:'Арабский скакун', type:'animal', level:1, price:2000, image:'/images/items/animal/araber.png?1', image_mini:'/images/items/animal/mini/araber.png?1', speed:0.444, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[605] = {item_id:605, nshort:'quarter', name:'Кватерхорс', type:'animal', level:1, price:2800, image:'/images/items/animal/quarter.png?1', image_mini:'/images/items/animal/mini/quarter.png?1', speed:0.4, bonus:{}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[606] = {item_id:606, nshort:'charriot', name:'Тележка', type:'animal', level:1, price:1500, image:'/images/items/animal/charriot.png?1', image_mini:'/images/items/animal/mini/charriot.png?1', speed:0.909, set:{}, traderlevel:66, auctionable:true, tradeable:true, sellable:true};
    PK_S3.items[607] = {item_id:607, nshort:'young_stallion', name:'Жеребёнок', type:'animal', level:1, price:250, image:'/images/items/animal/young_stallion.png?1', image_mini:'/images/items/animal/mini/young_stallion.png?1', speed:0.8, set:{key:'greenhorn_set', name:'Набор чечако'}, traderlevel:66, tradeable:true, sellable:true};
    PK_S3.items[608] = {item_id:608, nshort:'xmas_rudolph', name:'Северный олень', type:'animal', level:1, price:250, image:'/images/items/animal/xmas_rudolph.png?1', image_mini:'/images/items/animal/mini/xmas_rudolph.png?1', speed:0.8, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, auctionable:true, tradeable:true, sellable:true};
    PK_S3.items[609] = {item_id:609, nshort:'xmas_slide', name:'Рождественские сани', type:'animal', level:1, price:550, image:'/images/items/animal/xmas_slide.png?1', image_mini:'/images/items/animal/mini/xmas_slide.png?1', speed:0.8, set:{key:'season_set', name:'Праздничный наряд'}, traderlevel:66, tradeable:true, sellable:true};
    PK_S3.items[610] = {item_id:610, nshort:'golden_donkey', name:'Африканский осёл', type:'animal', level:1, price:15050, image:'/images/items/animal/golden_donkey.png?1', image_mini:'/images/items/animal/mini/golden_donkey.png?1', speed:0.4, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true};
    PK_S3.items[611] = {item_id:611, nshort:'camel', name:'Верблюд', type:'animal', level:100, price:10000, image:'/images/items/animal/camel.png?1', image_mini:'/images/items/animal/mini/camel.png?1', speed:0.4, bonus:{skills:{appearance:15, swim:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Набор коллекционера'}, traderlevel:66, tradeable:true};
    PK_S3.items[612] = {item_id:612, nshort:'elephant', name:'Слон', type:'animal', level:1, price:75050, image:'/images/items/animal/elephant.png?1', image_mini:'/images/items/animal/mini/elephant.png?1', speed:0.4, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true, sellable:true};
    PK_S3.items[613] = {item_id:613, nshort:'ostrich', name:'Страус', type:'animal', level:1, price:5050, image:'/images/items/animal/ostrich.png?1', image_mini:'/images/items/animal/mini/ostrich.png?1', speed:0.4, bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true};
    PK_S3.items[614] = {item_id:614, nshort:'turtle', name:'Черепаха', type:'animal', level:1, price:50, image:'/images/items/animal/turtle.png?1', image_mini:'/images/items/animal/mini/turtle.png?1', speed:0.909, set:{}, traderlevel:66, tradeable:true};
    PK_S3.items[615] = {item_id:615, nshort:'bison', name:'Бизон', type:'animal', level:1, price:500, image:'/images/items/animal/bison.png?1', image_mini:'/images/items/animal/mini/bison.png?1', speed:0.666, bonus:{skills:{tough:2}}, set:{}, traderlevel:66, tradeable:true};


PK_S3.items[700] = {item_id:700, nshort:'ham', name:'Свинина', type:'yield', level:0, price:10, image:'/images/items/yield/ham.png?1', image_mini:'images/items/yield/ham.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[701] = {item_id:701, nshort:'cereals', name:'Зерно', type:'yield', level:0, price:3, image:'/images/items/yield/cereals.png?1', image_mini:'images/items/yield/cereals.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[702] = {item_id:702, nshort:'tabacco', name:'Табак', type:'yield', level:0, price:5, image:'/images/items/yield/tabacco.png?1', image_mini:'images/items/yield/tabacco.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[703] = {item_id:703, nshort:'sugar', name:'Сахар', type:'yield', level:0, price:8, image:'/images/items/yield/sugar.png?1', image_mini:'images/items/yield/sugar.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[704] = {item_id:704, nshort:'cotton', name:'Хлопок', type:'yield', level:0, price:6, image:'/images/items/yield/cotton.png?1', image_mini:'images/items/yield/cotton.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[705] = {item_id:705, nshort:'trout', name:'Форель', type:'yield', level:0, price:4, image:'/images/items/yield/trout.png?1', image_mini:'images/items/yield/trout.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[706] = {item_id:706, nshort:'berrys', name:'Ягоды', type:'yield', level:0, price:4, image:'/images/items/yield/berrys.png?1', image_mini:'images/items/yield/berrys.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[707] = {item_id:707, nshort:'shearings', name:'Шерсть', type:'yield', level:0, price:8, image:'/images/items/yield/shearings.png?1', image_mini:'images/items/yield/shearings.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[708] = {item_id:708, nshort:'copper_pyrites', name:'Пирит', type:'yield', level:0, price:16, image:'/images/items/yield/copper_pyrites.png?1', image_mini:'images/items/yield/copper_pyrites.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[709] = {item_id:709, nshort:'turkey', name:'Индейка', type:'yield', level:0, price:14, image:'/images/items/yield/turkey.png?1', image_mini:'images/items/yield/turkey.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[710] = {item_id:710, nshort:'beef', name:'Говяжий бифштекс', type:'yield', level:0, price:24, image:'/images/items/yield/beef.png?1', image_mini:'images/items/yield/beef.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[711] = {item_id:711, nshort:'planks', name:'Дерево', type:'yield', level:0, price:16, image:'/images/items/yield/planks.png?1', image_mini:'images/items/yield/planks.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[712] = {item_id:712, nshort:'leather', name:'Кожа', type:'yield', level:0, price:16, image:'/images/items/yield/leather.png?1', image_mini:'images/items/yield/leather.png?1', set:{}, auctionable:true, sellable:true};

PK_S3.items[714] = {item_id:714, nshort:'beaver', name:'Бобровый мех', type:'yield', level:0, price:36, image:'/images/items/yield/beaver.png?1', image_mini:'images/items/yield/beaver.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[715] = {item_id:715, nshort:'fabric', name:'Рулон сукна', type:'yield', level:0, price:22, image:'/images/items/yield/fabric.png?1', image_mini:'images/items/yield/fabric.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[716] = {item_id:716, nshort:'stone', name:'Камни', type:'yield', level:0, price:10, image:'/images/items/yield/stone.png?1', image_mini:'images/items/yield/stone.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[717] = {item_id:717, nshort:'grund', name:'Лосось', type:'yield', level:0, price:14, image:'/images/items/yield/grund.png?1', image_mini:'images/items/yield/grund.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[718] = {item_id:718, nshort:'coyote', name:'Зуб койота', type:'yield', level:0, price:42, image:'/images/items/yield/coyote.png?1', image_mini:'images/items/yield/coyote.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[719] = {item_id:719, nshort:'cigar', name:'Сигары', type:'yield', level:0, price:24, image:'/images/items/yield/cigar.png?1', image_mini:'images/items/yield/cigar.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[720] = {item_id:720, nshort:'gems', name:'Полудрагоценные камни', type:'yield', level:0, price:70, image:'/images/items/yield/gems.png?1', image_mini:'images/items/yield/gems.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[721] = {item_id:721, nshort:'coal', name:'Уголь', type:'yield', level:0, price:20, image:'/images/items/yield/coal.png?1', image_mini:'images/items/yield/coal.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[722] = {item_id:722, nshort:'meal', name:'Горячая закуска', type:'yield', level:0, price:14, image:'/images/items/yield/meal.png?1', image_mini:'images/items/yield/meal.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[723] = {item_id:723, nshort:'ring', name:'Кольцо', type:'yield', level:0, price:160, image:'/images/items/yield/ring.png?1', image_mini:'images/items/yield/ring.png?1', set:{key:'set_pilgrim_female', name:'Набор монашки'}, auctionable:true, sellable:true};
PK_S3.items[724] = {item_id:724, nshort:'buffalo', name:'Шкура бизона', type:'yield', level:0, price:40, image:'/images/items/yield/buffalo.png?1', image_mini:'images/items/yield/buffalo.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[725] = {item_id:725, nshort:'silver', name:'Серебро', type:'yield', level:0, price:200, image:'/images/items/yield/silver.png?1', image_mini:'images/items/yield/silver.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[726] = {item_id:726, nshort:'indiangold', name:'Золото ацтеков', type:'yield', level:0, price:290, image:'/images/items/yield/indiangold.png?1', image_mini:'images/items/yield/indiangold.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[727] = {item_id:727, nshort:'medal', name:'Медаль за отвагу', type:'yield', level:0, price:500, image:'/images/items/yield/medal.png?1', image_mini:'images/items/yield/medal.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[728] = {item_id:728, nshort:'watch', name:'Карманные часы', type:'yield', level:0, price:210, image:'/images/items/yield/watch.png?1', image_mini:'images/items/yield/watch.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[729] = {item_id:729, nshort:'stolen_goods', name:'Контрабандный товар', type:'yield', level:0, price:110, image:'/images/items/yield/stolen_goods.png?1', image_mini:'images/items/yield/stolen_goods.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[730] = {item_id:730, nshort:'necklet', name:'Украшения', type:'yield', level:0, price:230, image:'/images/items/yield/necklet.png?1', image_mini:'images/items/yield/necklet.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[731] = {item_id:731, nshort:'grizzly', name:'Трофей', type:'yield', level:0, price:150, image:'/images/items/yield/grizzly.png?1', image_mini:'images/items/yield/grizzly.png?1', set:{}, auctionable:true, sellable:true};

PK_S3.items[733] = {item_id:733, nshort:'packet', name:'Пакет', type:'yield', level:0, price:32, image:'/images/items/yield/packet.png?1', image_mini:'images/items/yield/packet.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[734] = {item_id:734, nshort:'slicer', name:'Рубанок', type:'yield', level:0, price:44, image:'/images/items/yield/slicer.png?1', image_mini:'images/items/yield/slicer.png?1', set:{}, auctionable:true, sellable:true};

PK_S3.items[736] = {item_id:736, nshort:'spade', name:'Лопата', type:'yield', level:0, price:40, image:'/images/items/yield/spade.png?1', image_mini:'images/items/yield/spade.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[737] = {item_id:737, nshort:'dynamite', name:'Динамит', type:'yield', level:0, price:80, image:'/images/items/yield/dynamite.png?1', image_mini:'images/items/yield/dynamite.png?1', set:{}, auctionable:true, sellable:true};

PK_S3.items[739] = {item_id:739, nshort:'fence', name:'Колючая проволока', type:'yield', level:0, price:36, image:'/images/items/yield/fence.png?1', image_mini:'images/items/yield/fence.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[740] = {item_id:740, nshort:'horn', name:'Коровий рог', type:'yield', level:0, price:78, image:'/images/items/yield/horn.png?1', image_mini:'images/items/yield/horn.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[741] = {item_id:741, nshort:'pitcher', name:'Кувшин', type:'yield', level:0, price:24, image:'/images/items/yield/pitcher.png?1', image_mini:'images/items/yield/pitcher.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[742] = {item_id:742, nshort:'saw', name:'Пила', type:'yield', level:0, price:40, image:'/images/items/yield/saw.png?1', image_mini:'images/items/yield/saw.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[743] = {item_id:743, nshort:'poster', name:'Плакат', type:'yield', level:0, price:4, image:'/images/items/yield/poster.png?1', image_mini:'images/items/yield/poster.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[744] = {item_id:744, nshort:'newspaper', name:'Газета', type:'yield', level:0, price:6, image:'/images/items/yield/newspaper.png?1', image_mini:'images/items/yield/newspaper.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[745] = {item_id:745, nshort:'flour', name:'Мука', type:'yield', level:0, price:5, image:'/images/items/yield/flour.png?1', image_mini:'images/items/yield/flour.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[746] = {item_id:746, nshort:'beans', name:'Фасоль', type:'yield', level:0, price:6, image:'/images/items/yield/beans.png?1', image_mini:'images/items/yield/beans.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[747] = {item_id:747, nshort:'hammer', name:'Молоток', type:'yield', level:0, price:22, image:'/images/items/yield/hammer.png?1', image_mini:'images/items/yield/hammer.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[748] = {item_id:748, nshort:'corn', name:'Кукуруза', type:'yield', level:0, price:4, image:'/images/items/yield/corn.png?1', image_mini:'images/items/yield/corn.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[749] = {item_id:749, nshort:'rope', name:'Лассо', type:'yield', level:0, price:32, image:'/images/items/yield/rope.png?1', image_mini:'images/items/yield/rope.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[750] = {item_id:750, nshort:'nippers', name:'Наручники', type:'yield', level:0, price:58, image:'/images/items/yield/nippers.png?1', image_mini:'images/items/yield/nippers.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[751] = {item_id:751, nshort:'pipe', name:'Трубка мира', type:'yield', level:0, price:72, image:'/images/items/yield/pipe.png?1', image_mini:'images/items/yield/pipe.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[752] = {item_id:752, nshort:'oil', name:'Нефть', type:'yield', level:0, price:76, image:'/images/items/yield/oil.png?1', image_mini:'images/items/yield/oil.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[753] = {item_id:753, nshort:'pick', name:'Кирка', type:'yield', level:0, price:44, image:'/images/items/yield/pick.png?1', image_mini:'images/items/yield/pick.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[754] = {item_id:754, nshort:'horseshoe', name:'Подкова', type:'yield', level:0, price:30, image:'/images/items/yield/horseshoe.png?1', image_mini:'images/items/yield/horseshoe.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[755] = {item_id:755, nshort:'flag', name:'Флажок', type:'yield', level:0, price:32, image:'/images/items/yield/flag.png?1', image_mini:'images/items/yield/flag.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[756] = {item_id:756, nshort:'toolbox', name:'Ящик с инструментами', type:'yield', level:0, price:110, image:'/images/items/yield/toolbox.png?1', image_mini:'images/items/yield/toolbox.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[757] = {item_id:757, nshort:'feather', name:'Перо ворона', type:'yield', level:0, price:8, image:'/images/items/yield/feather.png?1', image_mini:'images/items/yield/feather.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[758] = {item_id:758, nshort:'flag_north', name:'Союзный флаг', type:'yield', level:0, price:86, image:'/images/items/yield/flag_north.png?1', image_mini:'images/items/yield/flag_north.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[759] = {item_id:759, nshort:'ticket', name:'Железнодорожный билет', type:'yield', level:0, price:34, image:'/images/items/yield/ticket.png?1', image_mini:'images/items/yield/ticket.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[760] = {item_id:760, nshort:'map', name:'Карта', type:'yield', level:0, price:32, image:'/images/items/yield/map.png?1', image_mini:'images/items/yield/map.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[761] = {item_id:761, nshort:'sledgehammer', name:'Кувалда', type:'yield', level:0, price:52, image:'/images/items/yield/sledgehammer.png?1', image_mini:'images/items/yield/sledgehammer.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[762] = {item_id:762, nshort:'flag_south', name:'Флаг конфедерации', type:'yield', level:0, price:86, image:'/images/items/yield/flag_south.png?1', image_mini:'images/items/yield/flag_south.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[763] = {item_id:763, nshort:'wolf', name:'Браслет из зубов', type:'yield', level:0, price:44, image:'/images/items/yield/wolf.png?1', image_mini:'images/items/yield/wolf.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[764] = {item_id:764, nshort:'shackle', name:'Кандалы', type:'yield', level:0, price:62, image:'/images/items/yield/shackle.png?1', image_mini:'images/items/yield/shackle.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[765] = {item_id:765, nshort:'sickle', name:'Серп', type:'yield', level:0, price:44, image:'/images/items/yield/sickle.png?1', image_mini:'images/items/yield/sickle.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[766] = {item_id:766, nshort:'water', name:'Стакан воды', type:'yield', level:0, price:6, image:'/images/items/yield/water.png?1', image_mini:'images/items/yield/water.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[767] = {item_id:767, nshort:'string', name:'Катушка проволоки', type:'yield', level:0, price:34, image:'/images/items/yield/string.png?1', image_mini:'images/items/yield/string.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[768] = {item_id:768, nshort:'hymnal', name:'Псалтырь', type:'yield', level:0, price:48, image:'/images/items/yield/hymnal.png?1', image_mini:'images/items/yield/hymnal.png?1', set:{key:'set_pilgrim_male', name:'Набор проповедника'}, auctionable:true, sellable:true};
PK_S3.items[769] = {item_id:769, nshort:'empty_bottle', name:'Пустая бутылка', type:'yield', level:0, price:2, image:'/images/items/yield/empty_bottle.png?1', image_mini:'images/items/yield/empty_bottle.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[770] = {item_id:770, nshort:'beer', name:'Пиво', type:'yield', level:0, price:0, image:'/images/items/yield/beer.png?1', image_mini:'images/items/yield/beer.png?1', set:{}};
PK_S3.items[771] = {item_id:771, nshort:'trap', name:'Капкан на бобра', type:'yield', level:0, price:50, image:'/images/items/yield/trap.png?1', image_mini:'images/items/yield/trap.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[772] = {item_id:772, nshort:'falcon', name:'Золотой сокол', type:'yield', level:0, price:0, image:'/images/items/yield/falcon.png?1', image_mini:'images/items/yield/falcon.png?1', set:{}, sellable:true};
    PK_S3.items[773] = {item_id:773, nshort:'paper1', name:'Обрывок (I часть)', type:'yield', level:0, price:1400, image:'/images/items/yield/paper1.png?1', image_mini:'images/items/yield/paper1.png?1', set:{}, auctionable:true, dropable:true, sellable:true};
PK_S3.items[774] = {item_id:774, nshort:'paper2', name:'Обрывок (II часть)', type:'yield', level:0, price:590, image:'/images/items/yield/paper2.png?1', image_mini:'images/items/yield/paper2.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[775] = {item_id:775, nshort:'paper3', name:'Обрывок (III часть)', type:'yield', level:0, price:590, image:'/images/items/yield/paper3.png?1', image_mini:'images/items/yield/paper3.png?1', set:{}, sellable:true};
    PK_S3.items[776] = {item_id:776, nshort:'kates_ring', name:'Кольцо Кейт', type:'yield', level:0, price:1000, image:'/images/items/yield/kates_ring.png?1', image_mini:'images/items/yield/kates_ring.png?1', set:{}};
    PK_S3.items[777] = {item_id:777, nshort:'brush', name:'Щётка для лошади', type:'yield', level:0, price:16, image:'/images/items/yield/brush.png?1', image_mini:'images/items/yield/brush.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};

PK_S3.items[778] = {item_id:778, nshort:'cooking_pot', name:'Кастрюля', type:'yield', level:0, price:22, image:'/images/items/yield/cooking_pot.png?1', image_mini:'images/items/yield/cooking_pot.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[779] = {item_id:779, nshort:'post_horn', name:'Почтовый рожок', type:'yield', level:0, price:60, image:'/images/items/yield/post_horn.png?1', image_mini:'images/items/yield/post_horn.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[780] = {item_id:780, nshort:'rounds', name:'Патроны', type:'yield', level:0, price:50, image:'/images/items/yield/rounds.png?1', image_mini:'images/items/yield/rounds.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[781] = {item_id:781, nshort:'documents', name:'Документы', type:'yield', level:0, price:120, image:'/images/items/yield/documents.png?1', image_mini:'images/items/yield/documents.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[782] = {item_id:782, nshort:'angle', name:'Удочка', type:'yield', level:0, price:42, image:'/images/items/yield/angle.png?1', image_mini:'images/items/yield/angle.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[783] = {item_id:783, nshort:'gold_sculpture', name:'Золотая статуэтка', type:'yield', level:0, price:144, image:'/images/items/yield/gold_sculpture.png?1', image_mini:'images/items/yield/gold_sculpture.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[784] = {item_id:784, nshort:'nails', name:'Гвозди', type:'yield', level:0, price:8, image:'/images/items/yield/nails.png?1', image_mini:'images/items/yield/nails.png?1', set:{}, auctionable:true, sellable:true};

PK_S3.items[786] = {item_id:786, nshort:'picture', name:'Картина', type:'yield', level:0, price:340, image:'/images/items/yield/picture.png?1', image_mini:'images/items/yield/picture.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[787] = {item_id:787, nshort:'saddle', name:'Седло', type:'yield', level:0, price:80, image:'/images/items/yield/saddle.png?1', image_mini:'images/items/yield/saddle.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[788] = {item_id:788, nshort:'bell', name:'Корабельный колокол', type:'yield', level:0, price:130, image:'/images/items/yield/bell.png?1', image_mini:'images/items/yield/bell.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[789] = {item_id:789, nshort:'coin', name:'Монета', type:'yield', level:0, price:2, image:'/images/items/yield/coin.png?1', image_mini:'images/items/yield/coin.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[790] = {item_id:790, nshort:'iron', name:'Железо', type:'yield', level:0, price:36, image:'/images/items/yield/iron.png?1', image_mini:'images/items/yield/iron.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[791] = {item_id:791, nshort:'orange', name:'Апельсины', type:'yield', level:0, price:8, image:'/images/items/yield/orange.png?1', image_mini:'images/items/yield/orange.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[792] = {item_id:792, nshort:'tequila', name:'Текила', type:'yield', level:0, price:24, image:'/images/items/yield/tequila.png?1', image_mini:'images/items/yield/tequila.png?1', set:{key:'set_mexican', name:'Набор мексиканца'}, auctionable:true, sellable:true};
PK_S3.items[793] = {item_id:793, nshort:'tomato', name:'Помидор', type:'yield', level:0, price:6, image:'/images/items/yield/tomato.png?1', image_mini:'images/items/yield/tomato.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[794] = {item_id:794, nshort:'potion', name:'Эликсир', type:'yield', level:0, price:360, image:'/images/items/yield/potion.png?1', image_mini:'images/items/yield/potion.png?1', set:{key:'set_quackery', name:'Набор знахаря'}, auctionable:true, sellable:true};
PK_S3.items[795] = {item_id:795, nshort:'peg', name:'Колышек', type:'yield', level:0, price:15, image:'/images/items/yield/peg.png?1', image_mini:'images/items/yield/peg.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[796] = {item_id:796, nshort:'brush_shoe', name:'Обувная щётка', type:'yield', level:0, price:14, image:'/images/items/yield/brush_shoe.png?1', image_mini:'images/items/yield/brush_shoe.png?1', set:{}, sellable:true};
PK_S3.items[797] = {item_id:797, nshort:'pitchfork', name:'Вилы', type:'yield', level:0, price:32, image:'/images/items/yield/pitchfork.png?1', image_mini:'images/items/yield/pitchfork.png?1', set:{key:'set_farmer', name:'Набор фермера'}, auctionable:true, sellable:true};

    PK_S3.items[800] = {item_id:800, nshort:'stone_pebble', name:'Галька', type:'right_arm', level:2, price:15, image:'/images/items/right_arm/stone_pebble.png?1', image_mini:'/images/items/right_arm/mini/stone_pebble.png?1', set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:7}, sub_type:'shot'};
    PK_S3.items[801] = {item_id:801, nshort:'stone_flint', name:'Кремень', type:'right_arm', level:5, price:26, image:'/images/items/right_arm/stone_flint.png?1', image_mini:'/images/items/right_arm/mini/stone_flint.png?1', set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:11}, sub_type:'shot'};
    PK_S3.items[802] = {item_id:802, nshort:'stone_granite', name:'Гранит', type:'right_arm', level:8, price:46, image:'/images/items/right_arm/stone_granite.png?1', image_mini:'/images/items/right_arm/mini/stone_granite.png?1', set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:1, damage_max:15}, sub_type:'shot'};
    PK_S3.items[803] = {item_id:803, nshort:'crutch_rusty', name:'Потрёпанная рогатка', type:'right_arm', level:7, price:26, image:'/images/items/right_arm/crutch_rusty.png?1', image_mini:'/images/items/right_arm/mini/crutch_rusty.png?1', set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:4, damage_max:8}, sub_type:'shot'};
    PK_S3.items[804] = {item_id:804, nshort:'crutch', name:'Рогатка', type:'right_arm', level:10, price:63, image:'/images/items/right_arm/crutch.png?1', image_mini:'/images/items/right_arm/mini/crutch.png?1', set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:6, damage_max:12}, sub_type:'shot'};
    PK_S3.items[805] = {item_id:805, nshort:'crutch_accurate', name:'Точная рогатка', type:'right_arm', level:13, price:148, image:'/images/items/right_arm/crutch_accurate.png?1', image_mini:'/images/items/right_arm/mini/crutch_accurate.png?1', set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:9, damage_max:17}, sub_type:'shot'};
    PK_S3.items[806] = {item_id:806, nshort:'crutch_huckeberry', name:'Рогатка Гека Финна', type:'right_arm', level:20, price:1360, image:'/images/items/right_arm/crutch_huckeberry.png?1', image_mini:'/images/items/right_arm/mini/crutch_huckeberry.png?1', bonus:{skills:{swim:3, ride:3}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:20, damage_max:40}, sub_type:'shot'};
   
    PK_S3.items[807] = {item_id:807, nshort:'leadshot_rusty', name:'Ржавый кремнёвый пистолет', type:'right_arm', level:17, price:124, image:'/images/items/right_arm/leadshot_rusty.png?1', image_mini:'/images/items/right_arm/mini/leadshot_rusty.png?1', set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:5, damage_max:19}, sub_type:'shot'};
    PK_S3.items[808] = {item_id:808, nshort:'leadshot', name:'Кремнёвый пистолет', type:'right_arm', level:20, price:384, image:'/images/items/right_arm/leadshot.png?1', image_mini:'/images/items/right_arm/mini/leadshot.png?1', bonus:{skills:{tough:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:8, damage_max:28}, sub_type:'shot'};
    PK_S3.items[809] = {item_id:809, nshort:'leadshot_accurate', name:'Точный кремнёвый пистолет', type:'right_arm', level:23, price:550, image:'/images/items/right_arm/leadshot_accurate.png?1', image_mini:'/images/items/right_arm/mini/leadshot_accurate.png?1', bonus:{skills:{tough:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:10, damage_max:36}, sub_type:'shot'};
    PK_S3.items[810] = {item_id:810, nshort:'leadshot_granmonts', name:'Пистолет Гранмонта', type:'right_arm', level:30, price:2680, image:'/images/items/right_arm/leadshot_granmonts.png?1', image_mini:'/images/items/right_arm/mini/leadshot_granmonts.png?1', bonus:{skills:{finger_dexterity:4, tough:3}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:15, damage_max:89}, sub_type:'shot'};
    
    PK_S3.items[811] = {item_id:811, nshort:'muzzleloader_rusty', name:'Ржавое дульнозарядное ружьё', type:'right_arm', level:22, price:326, image:'/images/items/right_arm/muzzleloader_rusty.png?1', image_mini:'/images/items/right_arm/mini/muzzleloader_rusty.png?1', bonus:{skills:{aim:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:10, damage_max:22}, sub_type:'shot'};
    PK_S3.items[812] = {item_id:812, nshort:'muzzleloader', name:'Дульнозарядное ружьё', type:'right_arm', level:25, price:545, image:'/images/items/right_arm/muzzleloader.png?1', image_mini:'/images/items/right_arm/mini/muzzleloader.png?1', bonus:{skills:{aim:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:15, damage_max:31}, sub_type:'shot'};    
    PK_S3.items[813] = {item_id:813, nshort:'muzzleloader_accurate', name:'Точное дульнозарядное ружьё', type:'right_arm', level:28, price:940, image:'/images/items/right_arm/muzzleloader_accurate.png?1', image_mini:'/images/items/right_arm/mini/muzzleloader_accurate.png?1', bonus:{skills:{aim:2}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:24, damage_max:36}, sub_type:'shot'};
    PK_S3.items[814] = {item_id:814, nshort:'muzzleloader_drake', name:'Дульнозарядное ружьё Дрейка', type:'right_arm', level:35, price:3580, image:'/images/items/right_arm/muzzleloader_drake.png?1', image_mini:'/images/items/right_arm/mini/muzzleloader_drake.png?1', bonus:{skills:{aim:4, swim:4}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:47, damage_max:79}, sub_type:'shot'};

    PK_S3.items[815] = {item_id:815, nshort:'deringer_rusty', name:'Ржавый дерринджер', type:'right_arm', level:32, price:730, image:'/images/items/right_arm/deringer_rusty.png?1', image_mini:'/images/items/right_arm/mini/deringer_rusty.png?1', bonus:{skills:{reflex:2}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:18, damage_max:32}, sub_type:'shot'};
    PK_S3.items[816] = {item_id:816, nshort:'deringer', name:'Дерринджер', type:'right_arm', level:35, price:1280, image:'/images/items/right_arm/deringer.png?1', image_mini:'/images/items/right_arm/mini/deringer.png?1', bonus:{skills:{reflex:2}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:29, damage_max:45}, sub_type:'shot'};
    PK_S3.items[817] = {item_id:817, nshort:'deringer_accurate', name:'Точный дерринджер', type:'right_arm', level:38, price:1655, image:'/images/items/right_arm/deringer_accurate.png?1', image_mini:'/images/items/right_arm/mini/deringer_accurate.png?1', bonus:{skills:{reflex:3}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:30, damage_max:54}, sub_type:'shot'};
    PK_S3.items[818] = {item_id:818, nshort:'deringer_bellestar', name:'Дерринджер Белль Старр', type:'right_arm', level:45, price:5500, image:'/images/items/right_arm/deringer_bellestar.png?1', image_mini:'/images/items/right_arm/mini/deringer_bellestar.png?1', bonus:{skills:{hide:4, reflex:5}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:71, damage_max:97}, sub_type:'shot'};
    
    PK_S3.items[819] = {item_id:819, nshort:'pepperbox_rusty', name:'Ржавый многоствольный револьвер', type:'right_arm', level:37, price:940, image:'/images/items/right_arm/pepperbox_rusty.png?1', image_mini:'/images/items/right_arm/mini/pepperbox_rusty.png?1', bonus:{skills:{dodge:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:13, damage_max:47}, sub_type:'shot'};
    PK_S3.items[820] = {item_id:820, nshort:'pepperbox', name:'Многоствольный револьвер', type:'right_arm', level:40, price:1440, image:'/images/items/right_arm/pepperbox.png?1', image_mini:'/images/items/right_arm/mini/pepperbox.png?1', bonus:{skills:{dodge:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:23, damage_max:57}, sub_type:'shot'};
    PK_S3.items[821] = {item_id:821, nshort:'pepperbox_accurate', name:'Точный многоствольный револьвер', type:'right_arm', level:43, price:2150, image:'/images/items/right_arm/pepperbox_accurate.png?1', image_mini:'/images/items/right_arm/mini/pepperbox_accurate.png?1', bonus:{skills:{dodge:3}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:27, damage_max:73}, sub_type:'shot'};
    PK_S3.items[822] = {item_id:822, nshort:'pepperbox_allen', name:'Многоствольный револьвер Аллена', type:'right_arm', level:50, price:6850, image:'/images/items/right_arm/pepperbox_allen.png?1', image_mini:'/images/items/right_arm/mini/pepperbox_allen.png?1', bonus:{skills:{leadership:6, aim:5}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:33, damage_max:153}, sub_type:'shot'};
    
    PK_S3.items[823] = {item_id:823, nshort:'smith_rusty', name:'Ржавый Смит-Вессон №1', type:'right_arm', level:47, price:1650, image:'/images/items/right_arm/smith_rusty.png?1', image_mini:'/images/items/right_arm/mini/smith_rusty.png?1', bonus:{skills:{shot:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:38, damage_max:46}, sub_type:'shot'};
    PK_S3.items[824] = {item_id:824, nshort:'smith', name:'Смит-Вессон №1', type:'right_arm', level:50, price:2350, image:'/images/items/right_arm/smith.png?1', image_mini:'/images/items/right_arm/mini/smith.png?1', bonus:{skills:{shot:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:49, damage_max:57}, sub_type:'shot'};
    PK_S3.items[825] = {item_id:825, nshort:'smith_accurate', name:'Точный Смит-Вессон №1', type:'right_arm', level:53, price:3180, image:'/images/items/right_arm/smith_accurate.png?1', image_mini:'/images/items/right_arm/mini/smith_accurate.png?1', bonus:{skills:{shot:4}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:60, damage_max:66}, sub_type:'shot'};
    PK_S3.items[826] = {item_id:826, nshort:'smith_younger', name:'Револьвер Янгерса', type:'right_arm', level:60, price:8700, image:'/images/items/right_arm/smith_younger.png?1', image_mini:'/images/items/right_arm/mini/smith_younger.png?1', bonus:{skills:{pitfall:7, shot:6}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:105, damage_max:125}, sub_type:'shot'};

    PK_S3.items[827] = {item_id:827, nshort:'remington_rusty', name:'Ржавый армейский револьвер', type:'right_arm', level:52, price:2150, image:'/images/items/right_arm/remington_rusty.png?1', image_mini:'/images/items/right_arm/mini/remington_rusty.png?1', bonus:{skills:{tough:3}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:41, damage_max:59}, sub_type:'shot'};
    PK_S3.items[828] = {item_id:828, nshort:'remington', name:'Армейский револьвер', type:'right_arm', level:55, price:2950, image:'/images/items/right_arm/remington.png?1', image_mini:'/images/items/right_arm/mini/remington.png?1', bonus:{skills:{tough:4}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:49, damage_max:71}, sub_type:'shot'};
    PK_S3.items[829] = {item_id:829, nshort:'remington_accurate', name:'Точный армейский револьвер', type:'right_arm', level:58, price:3940, image:'/images/items/right_arm/remington_accurate.png?1', image_mini:'/images/items/right_arm/mini/remington_accurate.png?1', bonus:{skills:{tough:5}}, set:{}, traderlevel:11, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:63, damage_max:79}, sub_type:'shot'};
    PK_S3.items[830] = {item_id:830, nshort:'remington_ike', name:'Армейский револьвер Айка', type:'right_arm', level:65, price:9400, image:'/images/items/right_arm/remington_ike.png?1', image_mini:'/images/items/right_arm/mini/remington_ike.png?1', bonus:{skills:{endurance:7, tough:7}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:97, damage_max:133}, sub_type:'shot'};
    
    PK_S3.items[831] = {item_id:831, nshort:'peacemaker_rusty', name:'Ржавый кольт Миротворец', type:'right_arm', level:62, price:3380, image:'/images/items/right_arm/peacemaker_rusty.png?1', image_mini:'/images/items/right_arm/mini/peacemaker_rusty.png?1', bonus:{skills:{appearance:4}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:45, damage_max:85}, sub_type:'shot'};
    PK_S3.items[832] = {item_id:832, nshort:'peacemaker', name:'Кольт Миротворец', type:'right_arm', level:65, price:4570, image:'/images/items/right_arm/peacemaker.png?1', image_mini:'/images/items/right_arm/mini/peacemaker.png?1', bonus:{skills:{appearance:5}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:55, damage_max:99}, sub_type:'shot'};
    PK_S3.items[833] = {item_id:833, nshort:'peacemaker_accurate', name:'Точный кольт Миротворец', type:'right_arm', level:68, price:5400, image:'/images/items/right_arm/peacemaker_accurate.png?1', image_mini:'/images/items/right_arm/mini/peacemaker_accurate.png?1', bonus:{skills:{appearance:6}}, set:{}, traderlevel:13, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:60, damage_max:112}, sub_type:'shot'};
    PK_S3.items[834] = {item_id:834, nshort:'peacemaker_billy', name:'Кольт Миротворец Билли', type:'right_arm', level:75, price:10300, image:'/images/items/right_arm/peacemaker_billy.png?1', image_mini:'/images/items/right_arm/mini/peacemaker_billy.png?1', bonus:{skills:{appearance:7, health:8}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:79, damage_max:163}, sub_type:'shot'};

    PK_S3.items[835] = {item_id:835, nshort:'schofield_rusty', name:'Ржавый Скофилд', type:'right_arm', level:67, price:4250, image:'/images/items/right_arm/schofield_rusty.png?1', image_mini:'/images/items/right_arm/mini/schofield_rusty.png?1', bonus:{skills:{tactic:5}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:60, damage_max:90}, sub_type:'shot'};
    PK_S3.items[836] = {item_id:836, nshort:'schofield', name:'Скофилд', type:'right_arm', level:70, price:5230, image:'/images/items/right_arm/schofield.png?1', image_mini:'/images/items/right_arm/mini/schofield.png?1', bonus:{skills:{tactic:6}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:69, damage_max:99}, sub_type:'shot'};
    PK_S3.items[837] = {item_id:837, nshort:'schofield_accurate', name:'Точный Скофилд', type:'right_arm', level:73, price:6400, image:'/images/items/right_arm/schofield_accurate.png?1', image_mini:'/images/items/right_arm/mini/schofield_accurate.png?1', bonus:{skills:{tactic:7}}, set:{}, traderlevel:14, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:79, damage_max:111}, sub_type:'shot'};
    PK_S3.items[838] = {item_id:838, nshort:'schofield_jessejames', name:'Скофилд Джесси Джеймса', type:'right_arm', level:80, price:10600, image:'/images/items/right_arm/schofield_jessejames.png?1', image_mini:'/images/items/right_arm/mini/schofield_jessejames.png?1', bonus:{skills:{trade:8, tactic:8}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:96, damage_max:148}, sub_type:'shot'};

    PK_S3.items[839] = {item_id:839, nshort:'buntline_rusty', name:'Ржавый Бантлайн', type:'right_arm', level:72, price:5375, image:'/images/items/right_arm/buntline_rusty.png?1', image_mini:'/images/items/right_arm/mini/buntline_rusty.png?1', bonus:{skills:{reflex:7}}, set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:77, damage_max:91}, sub_type:'shot'};
    PK_S3.items[840] = {item_id:840, nshort:'buntline', name:'Бантлайн', type:'right_arm', level:75, price:6250, image:'/images/items/right_arm/buntline.png?1', image_mini:'/images/items/right_arm/mini/buntline.png?1', bonus:{skills:{reflex:7}}, set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:87, damage_max:99}, sub_type:'shot'};
    PK_S3.items[841] = {item_id:841, nshort:'buntline_accurate', name:'Точный Бантлайн', type:'right_arm', level:78, price:7250, image:'/images/items/right_arm/buntline_accurate.png?1', image_mini:'/images/items/right_arm/mini/buntline_accurate.png?1', bonus:{skills:{reflex:7}}, set:{}, traderlevel:15, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:89, damage_max:115}, sub_type:'shot'};
    PK_S3.items[842] = {item_id:842, nshort:'buntline_wyattearp', name:'Бантлайн Уайатта Эрпа', type:'right_arm', level:85, price:11200, image:'/images/items/right_arm/buntline_wyattearp.png?1', image_mini:'/images/items/right_arm/mini/buntline_wyattearp.png?1', bonus:{skills:{tactic:7, aim:4, reflex:4, health:4}}, set:{}, auctionable:true, dropable:true, sellable:true, damage:{damage_min:124, damage_max:126}, sub_type:'shot'};
    
    PK_S3.items[843] = {item_id:843, nshort:'boomerang', name:'Бумеранг', type:'right_arm', level:8, price:126, image:'/images/items/right_arm/boomerang.png?1', image_mini:'/images/items/right_arm/mini/boomerang.png?1', characterClass:'duelist', bonus:{skills:{reflex:1}}, set:{}, sellable:true, damage:{damage_min:1, damage_max:17}, sub_type:'shot'};
    PK_S3.items[844] = {item_id:844, nshort:'throwing_knives', name:'Метательные ножи', type:'right_arm', level:33, price:1152, image:'/images/items/right_arm/throwing_knives.png?1', image_mini:'/images/items/right_arm/mini/throwing_knives.png?1', characterClass:'duelist', bonus:{skills:{hide:3}}, set:{}, sellable:true, damage:{damage_min:2, damage_max:66}, sub_type:'shot'};
    PK_S3.items[845] = {item_id:845, nshort:'sawed_off', name:'Обрез', type:'right_arm', level:51, price:2940, image:'/images/items/right_arm/sawed_off.png?1', image_mini:'/images/items/right_arm/mini/sawed_off.png?1', characterClass:'duelist', bonus:{skills:{appearance:3, shot:2}}, set:{}, sellable:true, damage:{damage_min:20, damage_max:88}, sub_type:'shot'};
PK_S3.items[846] = {item_id:846, nshort:'trompet', name:'Труба', type:'right_arm', level:20, price:1200, image:'/images/items/right_arm/trompet.png?1', image_mini:'/images/items/right_arm/mini/trompet.png?1', characterClass:'soldier', bonus:{attributes:{charisma:6}}, set:{}, sellable:true, damage:{damage_min:7, damage_max:14}, sub_type:'shot'};

    PK_S3.items[854] = {item_id:854, nshort:'elixier', name:'Кислота', type:'right_arm', level:42, price:1500, image:'/images/items/right_arm/elixier.png?1', image_mini:'/images/items/right_arm/mini/elixier.png?1', bonus:{skills:{appearance:2}}, set:{key:'set_quackery', name:'Набор знахаря'}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:4, damage_max:80}, sub_type:'shot'};
    PK_S3.items[855] = {item_id:855, nshort:'smith_xmas', name:'Ледяной револьвер', type:'right_arm', level:1, price:500, image:'/images/items/right_arm/smith_xmas.png?1', image_mini:'/images/items/right_arm/mini/smith_xmas.png?1', set:{}, traderlevel:100, auctionable:true, tradeable:true, sellable:true, damage:{damage_min:0, damage_max:1}, sub_type:'shot'};
    PK_S3.items[856] = {item_id:856, nshort:'smells_like_eggspirit', name:'Тухлые яйца', type:'right_arm', level:45, price:2500, image:'/images/items/right_arm/smells_like_eggspirit.png?1', image_mini:'/images/items/right_arm/mini/smells_like_eggspirit.png?1', set:{key:'season_set', name:'Праздничный наряд'}, sellable:true, damage:{damage_min:36, damage_max:49}, sub_type:'shot'};
    PK_S3.items[857] = {item_id:857, nshort:'fakegolden_gun', name:'Дубликат золотого кольта', type:'right_arm', level:80, price:10500, image:'/images/items/right_arm/fakegolden_gun.png?1', image_mini:'/images/items/right_arm/mini/fakegolden_gun.png?1', bonus:{skills:{shot:5, aim:2}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, auctionable:true, dropable:true, tradeable:true, sellable:true, damage:{damage_min:81, damage_max:119}, sub_type:'shot'};
    PK_S3.items[858] = {item_id:858, nshort:'golden_gun', name:'Золотой кольт', type:'right_arm', level:70, price:22500, image:'/images/items/right_arm/golden_gun.png?1', image_mini:'/images/items/right_arm/mini/golden_gun.png?1', bonus:{skills:{shot:8, aim:4}}, set:{key:'gold_set', name:'Золотой набор'}, traderlevel:100, tradeable:true, damage:{damage_min:101, damage_max:149}, sub_type:'shot'};
    PK_S3.items[859] = {item_id:859, nshort:'greenhorn_gun', name:'Детская праща', type:'right_arm', level:6, price:550, image:'/images/items/right_arm/greenhorn_gun.png?1', image_mini:'/images/items/right_arm/mini/greenhorn_gun.png?1', bonus:{skills:{shot:1}}, set:{key:'greenhorn_set', name:'Набор чечако'}, sellable:true, damage:{damage_min:6, damage_max:14}, sub_type:'shot'};

    PK_S3.items[861] = {item_id:861, nshort:'computerbild_promo_gun', name:'Револьвер Буффало Билла', type:'right_arm', level:10, price:750, image:'/images/items/right_arm/computerbild_promo_gun.png?1', image_mini:'/images/items/right_arm/mini/computerbild_promo_gun.png?1', bonus:{skills:{}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, tradeable:true, damage:{damage_min:10, damage_max:20}, sub_type:'shot'};
    PK_S3.items[862] = {item_id:862, nshort:'howdah_pistol', name:'Хаудах', type:'right_arm', level:70, price:11750, image:'/images/items/right_arm/howdah_pistol.png?1', image_mini:'/images/items/right_arm/mini/howdah_pistol.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:100, auctionable:true, tradeable:true, sellable:true, damage:{damage_min:100, damage_max:200}, sub_type:'shot'};
    PK_S3.items[863] = {item_id:863, nshort:'collector_gun', name:'Револьвер коллекционера', type:'right_arm', level:100, price:0, image:'/images/items/right_arm/collector_gun.png?1', image_mini:'/images/items/right_arm/mini/collector_gun.png?1', bonus:{skills:{trade:15, reflex:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Набор коллекционера'}, traderlevel:100, tradeable:true, damage:{damage_min:75, damage_max:175}, sub_type:'shot'};
    PK_S3.items[864] = {item_id:864, nshort:'hackett_shotgun', name:'Обрез Хэккета', type:'right_arm', level:50, price:1500, image:'/images/items/right_arm/hackett_shotgun.png?1', image_mini:'/images/items/right_arm/mini/hackett_shotgun.png?1', bonus:{skills:{shot:2, tough:5}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true, damage:{damage_min:54, damage_max:74}, sub_type:'shot'};

    PK_S3.items[866] = {item_id:866, nshort:'peacemaker_stranger', name:'Кольт путника', type:'right_arm', level:70, price:10000, image:'/images/items/right_arm/peacemaker_stranger.png?1', image_mini:'/images/items/right_arm/mini/peacemaker_stranger.png?1', bonus:{skills:{appearance:6, tactic:4, shot:4}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true, damage:{damage_min:70, damage_max:160}, sub_type:'shot'};
    PK_S3.items[867] = {item_id:867, nshort:'old_bible', name:'Старая Библия', type:'right_arm', level:85, price:0, image:'/images/items/right_arm/old_bible.png?1', image_mini:'/images/items/right_arm/mini/old_bible.png?1', bonus:{skills:{appearance:15}, attributes:{strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, damage:{damage_min:0, damage_max:0}, sub_type:'shot'};
    PK_S3.items[868] = {item_id:868, nshort:'old_bible_bullet_hole', name:'Старая насквозь простреленная Библия', type:'right_arm', level:85, price:1, image:'/images/items/right_arm/old_bible_bullet_hole.png?1', image_mini:'/images/items/right_arm/mini/old_bible_bullet_hole.png?1', bonus:{skills:{appearance:15, tough:5}, attributes:{strength:3}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true, damage:{damage_min:0, damage_max:0}, sub_type:'shot'};
    PK_S3.items[869] = {item_id:869, nshort:'bannisters_colt', name:'Кольт Баннистера', type:'right_arm', level:65, price:2300, image:'/images/items/right_arm/bannisters_colt.png?1', image_mini:'/images/items/right_arm/mini/bannisters_colt.png?1', bonus:{skills:{appearance:5, trade:8, tough:2}, attributes:{dexterity:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true, damage:{damage_min:48, damage_max:88}, sub_type:'shot'};

    PK_S3.items[999] = {item_id:999, nshort:'surprise', name:'Сюрприз', type:'yield', level:0, price:0, image:'/images/items/unknown.png?1', image_mini:'/images/items/unknown.png?1', set:{}};

    PK_S3.items[1364] = {item_id:1364, nshort:'uniform_perfect', name:'Форма', type:'body', level:20, price:0, image:'/images/items/body/uniform_perfect.png?1', image_mini:'/images/items/body/mini/uniform_perfect.png?1', characterClass:'soldier', bonus:{skills:{appearance:3, hide:4}, attributes:{charisma:2}}, set:{}};
    
    PK_S3.items[1701] = {item_id:1701, nshort:'arrow', name:'Стрелы', type:'yield', level:0, price:5, image:'/images/items/yield/arrow.png?1', image_mini:'images/items/yield/arrow.png?1', set:{}};
PK_S3.items[1702] = {item_id:1702, nshort:'compass', name:'Компас', type:'yield', level:0, price:380, image:'/images/items/yield/compass.png?1', image_mini:'images/items/yield/compass.png?1', bonus:{skills:{ride:3}}, set:{}};
PK_S3.items[1703] = {item_id:1703, nshort:'lamp', name:'Лампа', type:'yield', level:0, price:80, image:'/images/items/yield/lamp.png?1', image_mini:'images/items/yield/lamp.png?1', set:{}};

    PK_S3.items[1706] = {item_id:1706, nshort:'letter', name:'Письмо', type:'yield', level:0, price:1, image:'/images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', set:{}};

PK_S3.items[1708] = {item_id:1708, nshort:'whiskey', name:'Виски', type:'yield', level:0, price:10, image:'/images/items/yield/whiskey.png?1', image_mini:'images/items/yield/whiskey.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1709] = {item_id:1709, nshort:'gold', name:'Сокровища индейцев', type:'yield', level:0, price:0, image:'/images/items/yield/gold.png?1', image_mini:'images/items/yield/gold.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

PK_S3.items[1710] = {item_id:1710, nshort:'key1', name:'Первый ключ', type:'yield', level:0, price:42, image:'/images/items/yield/key1.png?1', image_mini:'images/items/yield/key1.png?1', set:{}, sellable:true};
    PK_S3.items[1711] = {item_id:1711, nshort:'key2', name:'Второй ключ', type:'yield', level:0, price:46, image:'/images/items/yield/key2.png?1', image_mini:'images/items/yield/key2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1712] = {item_id:1712, nshort:'key3', name:'Третий ключ', type:'yield', level:0, price:7500, image:'/images/items/yield/key3.png?1', image_mini:'images/items/yield/key3.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1713] = {item_id:1713, nshort:'easteregg', name:'Пасхальное яйцо', type:'yield', level:0, price:20, image:'/images/items/yield/easteregg.png?1', image_mini:'images/items/yield/easteregg.png?1', set:{}, sellable:true};

    PK_S3.items[1715] = {item_id:1715, nshort:'cane', name:'Трость', type:'yield', level:42, price:2800, image:'/images/items/yield/cane.png?1', image_mini:'images/items/yield/cane.png?1', characterSex:'male', bonus:{attributes:{charisma:2}}, set:{key:'set_gentleman', name:'Набор джентльмена'}, auctionable:true, dropable:true, sellable:true};
    PK_S3.items[1716] = {item_id:1716, nshort:'letter', name:'Личное письмо', type:'yield', level:0, price:2, image:'/images/items/yield/letter.png?1', image_mini:'images/items/yield/letter.png?1', set:{}};
    PK_S3.items[1717] = {item_id:1717, nshort:'chamber_pot', name:'Ночной горшок', type:'yield', level:0, price:750, image:'/images/items/yield/chamber_pot.png?1', image_mini:'images/items/yield/chamber_pot.png?1', set:{key:'set_sleeper', name:'Набор сони'}, auctionable:true, dropable:true, sellable:true};

    PK_S3.items[1733] = {item_id:1733, nshort:'henrys_packet', name:'Посылка Генри', type:'yield', level:0, price:32, image:'/images/items/yield/henrys_packet.png?1', image_mini:'images/items/yield/henrys_packet.png?1', set:{}};

    PK_S3.items[1740] = {item_id:1740, nshort:'dice', name:'Кости', type:'yield', level:0, price:66, image:'/images/items/yield/dice.png?1', image_mini:'images/items/yield/dice.png?1', bonus:{skills:{finger_dexterity:1}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[1750] = {item_id:1750, nshort:'ponytail', name:'Коса', type:'yield', level:0, price:0, image:'/images/items/yield/ponytail.png?1', image_mini:'images/items/yield/ponytail.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1751] = {item_id:1751, nshort:'ruby', name:'Рубин', type:'yield', level:0, price:66, image:'/images/items/yield/ruby.png?1', image_mini:'images/items/yield/ruby.png?1', set:{}};
PK_S3.items[1752] = {item_id:1752, nshort:'egg1', name:'Первое яйцо', type:'yield', level:0, price:4, image:'/images/items/yield/egg1.png?1', image_mini:'images/items/yield/egg1.png?1', set:{}};
PK_S3.items[1753] = {item_id:1753, nshort:'egg2', name:'Второе яйцо', type:'yield', level:0, price:4, image:'/images/items/yield/egg2.png?1', image_mini:'images/items/yield/egg2.png?1', set:{}};
PK_S3.items[1754] = {item_id:1754, nshort:'egg3', name:'Третье яйцо', type:'yield', level:0, price:4, image:'/images/items/yield/egg3.png?1', image_mini:'images/items/yield/egg3.png?1', set:{}};
    PK_S3.items[1755] = {item_id:1755, nshort:'bag', name:'Мешок с добычей', type:'yield', level:0, price:2000, image:'/images/items/yield/bag.png?1', image_mini:'images/items/yield/bag.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1756] = {item_id:1756, nshort:'mask', name:'Маска', type:'yield', level:0, price:200, image:'/images/items/yield/mask.png?1', image_mini:'images/items/yield/mask.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1757] = {item_id:1757, nshort:'dfprocket1', name:'Прототип', type:'yield', level:0, price:1, image:'/images/items/yield/dfprocket1.png?1', image_mini:'images/items/yield/dfprocket1.png?1', set:{}};
PK_S3.items[1758] = {item_id:1758, nshort:'hgfrocket2', name:'Брак', type:'yield', level:0, price:1, image:'/images/items/yield/hgfrocket2.png?1', image_mini:'images/items/yield/hgfrocket2.png?1', set:{}};
    PK_S3.items[1759] = {item_id:1759, nshort:'dfgrocket1a', name:'Фейерверк', type:'yield', level:0, price:2700, image:'/images/items/yield/dfgrocket1a.png?1', image_mini:'images/items/yield/dfgrocket1a.png?1', bonus:{attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'season_set', name:'Праздничный наряд'}, sellable:true};
    PK_S3.items[1760] = {item_id:1760, nshort:'bucket', name:'Пустое ведро', type:'yield', level:0, price:20, image:'/images/items/yield/bucket.png?1', image_mini:'images/items/yield/bucket.png?1', set:{}};
    PK_S3.items[1761] = {item_id:1761, nshort:'bucket_full', name:'Полное ведро', type:'yield', level:0, price:21, image:'/images/items/yield/bucket_full.png?1', image_mini:'images/items/yield/bucket_full.png?1', set:{}};
    PK_S3.items[1762] = {item_id:1762, nshort:'bucket_fire', name:'Ведро', type:'yield', level:0, price:25, image:'/images/items/yield/bucket_fire.png?1', image_mini:'images/items/yield/bucket_fire.png?1', set:{key:'fireworker_set', name:'Набор пожарного'}};
PK_S3.items[1763] = {item_id:1763, nshort:'threekeynote', name:'Листок с тремя ключами…', type:'yield', level:0, price:2, image:'/images/items/yield/threekeynote.png?1', image_mini:'images/items/yield/threekeynote.png?1', set:{}};
    PK_S3.items[1764] = {item_id:1764, nshort:'treasuremap', name:'План!', type:'yield', level:0, price:5543, image:'/images/items/yield/treasuremap.png?1', image_mini:'images/items/yield/treasuremap.png?1', set:{}};
PK_S3.items[1765] = {item_id:1765, nshort:'treasurebox', name:'Сундук с сокровищами', type:'yield', level:0, price:23402, image:'/images/items/yield/treasurebox.png?1', image_mini:'images/items/yield/treasurebox.png?1', set:{}};
    PK_S3.items[1766] = {item_id:1766, nshort:'mudball', name:'Ком грязи', type:'yield', level:0, price:1, image:'/images/items/yield/mudball.png?1', image_mini:'images/items/yield/mudball.png?1', set:{}, auctionable:true};
    PK_S3.items[1767] = {item_id:1767, nshort:'muditem', name:'Нечто грязное', type:'yield', level:0, price:10, image:'/images/items/yield/muditem.png?1', image_mini:'images/items/yield/muditem.png?1', set:{}};
    PK_S3.items[1768] = {item_id:1768, nshort:'dustgun', name:'Пыльный револьвер', type:'yield', level:0, price:100, image:'/images/items/yield/dustgun.png?1', image_mini:'images/items/yield/dustgun.png?1', set:{}};
    PK_S3.items[1769] = {item_id:1769, nshort:'goldgun', name:'Золотой револьвер', type:'yield', level:0, price:100, image:'/images/items/yield/goldgun.png?1', image_mini:'images/items/yield/goldgun.png?1', set:{}};
    PK_S3.items[1770] = {item_id:1770, nshort:'bloodycloth', name:'Окровавленный лоскут', type:'yield', level:0, price:1, image:'/images/items/yield/bloodycloth.png?1', image_mini:'images/items/yield/bloodycloth.png?1', set:{}};
    PK_S3.items[1771] = {item_id:1771, nshort:'photo', name:'Старая фотография', type:'yield', level:0, price:1, image:'/images/items/yield/photo.png?1', image_mini:'images/items/yield/photo.png?1', set:{}};
    PK_S3.items[1772] = {item_id:1772, nshort:'umbrella', name:'Зонтик', type:'yield', level:42, price:2800, image:'/images/items/yield/umbrella.png?1', image_mini:'images/items/yield/umbrella.png?1', characterSex:'female', bonus:{skills:{trade:8, finger_dexterity:6, endurance:10}, attributes:{strength:1}}, set:{key:'set_dancer', name:'Набор танцовщицы'}, auctionable:true, dropable:true, sellable:true};
    PK_S3.items[1773] = {item_id:1773, nshort:'testament', name:'Завещание', type:'yield', level:0, price:1, image:'/images/items/yield/testament.png?1', image_mini:'images/items/yield/testament.png?1', set:{}};
    PK_S3.items[1774] = {item_id:1774, nshort:'engagementring', name:'Кольцо', type:'yield', level:0, price:1, image:'/images/items/yield/engagementring.png?1', image_mini:'images/items/yield/engagementring.png?1', set:{}};
PK_S3.items[1775] = {item_id:1775, nshort:'birthcertificate', name:'Свидетельство о рождении', type:'yield', level:0, price:1, image:'/images/items/yield/birthcertificate.png?1', image_mini:'images/items/yield/birthcertificate.png?1', set:{}};
PK_S3.items[1776] = {item_id:1776, nshort:'darkplans', name:'Коварные планы', type:'yield', level:0, price:1, image:'/images/items/yield/darkplans.png?1', image_mini:'images/items/yield/darkplans.png?1', set:{}};
PK_S3.items[1777] = {item_id:1777, nshort:'docreport', name:'Врачебное свидетельство', type:'yield', level:0, price:1, image:'/images/items/yield/docreport.png?1', image_mini:'images/items/yield/docreport.png?1', set:{}};
    PK_S3.items[1778] = {item_id:1778, nshort:'brandingiron', name:'Гнутое тавро', type:'yield', level:0, price:1, image:'/images/items/yield/brandingiron.png?1', image_mini:'images/items/yield/brandingiron.png?1', set:{}};
PK_S3.items[1779] = {item_id:1779, nshort:'cardpiece1', name:'Первая часть карты', type:'yield', level:0, price:1, image:'/images/items/yield/cardpiece1.png?1', image_mini:'images/items/yield/cardpiece1.png?1', set:{}};
PK_S3.items[1780] = {item_id:1780, nshort:'cardpiece2', name:'Вторая часть карты', type:'yield', level:0, price:1, image:'/images/items/yield/cardpiece2.png?1', image_mini:'images/items/yield/cardpiece2.png?1', set:{}};
PK_S3.items[1781] = {item_id:1781, nshort:'cardpiece3', name:'Третья часть карты', type:'yield', level:0, price:1, image:'/images/items/yield/cardpiece3.png?1', image_mini:'images/items/yield/cardpiece3.png?1', set:{}};
    PK_S3.items[1782] = {item_id:1782, nshort:'cardpiece4', name:'Четвёртая часть карты', type:'yield', level:0, price:1, image:'/images/items/yield/cardpiece4.png?1', image_mini:'images/items/yield/cardpiece4.png?1', set:{}};
PK_S3.items[1783] = {item_id:1783, nshort:'cardcomplete', name:'Полная карта', type:'yield', level:0, price:1, image:'/images/items/yield/cardcomplete.png?1', image_mini:'images/items/yield/cardcomplete.png?1', set:{}};
PK_S3.items[1784] = {item_id:1784, nshort:'itemlist', name:'Список вещей', type:'yield', level:0, price:1, image:'/images/items/yield/itemlist.png?1', image_mini:'images/items/yield/itemlist.png?1', set:{}};
PK_S3.items[1785] = {item_id:1785, nshort:'torch', name:'Факел', type:'yield', level:0, price:1, image:'/images/items/yield/torch.png?1', image_mini:'images/items/yield/torch.png?1', set:{}};
PK_S3.items[1786] = {item_id:1786, nshort:'bagpack', name:'Рюкзак', type:'yield', level:0, price:1, image:'/images/items/yield/bagpack.png?1', image_mini:'images/items/yield/bagpack.png?1', set:{}};
    PK_S3.items[1787] = {item_id:1787, nshort:'ashes', name:'Пепел', type:'yield', level:0, price:1, image:'/images/items/yield/ashes.png?1', image_mini:'images/items/yield/ashes.png?1', set:{}, sellable:true};
    PK_S3.items[1788] = {item_id:1788, nshort:'gravel', name:'Гравий', type:'yield', level:0, price:10, image:'/images/items/yield/gravel.png?1', image_mini:'images/items/yield/gravel.png?1', set:{}, sellable:true};
    PK_S3.items[1789] = {item_id:1789, nshort:'brokenshovel', name:'Сломанная лопата', type:'yield', level:0, price:50, image:'/images/items/yield/brokenshovel.png?1', image_mini:'images/items/yield/brokenshovel.png?1', set:{}, sellable:true};
PK_S3.items[1790] = {item_id:1790, nshort:'treeboat', name:'Выдолбленный ствол дерева', type:'yield', level:0, price:50, image:'/images/items/yield/treeboat.png?1', image_mini:'images/items/yield/treeboat.png?1', set:{}};
    PK_S3.items[1791] = {item_id:1791, nshort:'golddust', name:'Золотая пыль', type:'yield', level:0, price:100, image:'/images/items/yield/golddust.png?1', image_mini:'images/items/yield/golddust.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1792] = {item_id:1792, nshort:'goldnugget', name:'Золотая монета', type:'yield', level:0, price:5000, image:'/images/items/yield/goldnugget.png?1', image_mini:'images/items/yield/goldnugget.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1793] = {item_id:1793, nshort:'bendmetall', name:'Гнутая, замызганная железяка', type:'yield', level:0, price:1, image:'/images/items/yield/bendmetall.png?1', image_mini:'images/items/yield/bendmetall.png?1', set:{}, auctionable:true};
    PK_S3.items[1794] = {item_id:1794, nshort:'dirtymetall', name:'Грязная железяка', type:'yield', level:0, price:10, image:'/images/items/yield/dirtymetall.png?1', image_mini:'images/items/yield/dirtymetall.png?1', set:{}};
    PK_S3.items[1795] = {item_id:1795, nshort:'goldblade', name:'Отмытый золотой клинок', type:'yield', level:0, price:100, image:'/images/items/yield/goldblade.png?1', image_mini:'images/items/yield/goldblade.png?1', set:{}};
    PK_S3.items[1796] = {item_id:1796, nshort:'sharpgoldblade', name:'Острый клинок', type:'yield', level:0, price:100, image:'/images/items/yield/sharpgoldblade.png?1', image_mini:'images/items/yield/sharpgoldblade.png?1', set:{}};
    PK_S3.items[1797] = {item_id:1797, nshort:'sheriffpaper', name:'Рапорт шерифа', type:'yield', level:0, price:10, image:'/images/items/yield/sheriffpaper.png?1', image_mini:'images/items/yield/sheriffpaper.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[1799] = {item_id:1799, nshort:'crystallball', name:'Хрустальный шар', type:'yield', level:0, price:10000, image:'/images/items/yield/crystallball.png?1', image_mini:'images/items/yield/crystallball.png?1', set:{}};
    PK_S3.items[1800] = {item_id:1800, nshort:'toadblood', name:'Кровь жабы', type:'yield', level:0, price:10, image:'/images/items/yield/toadblood.png?1', image_mini:'images/items/yield/toadblood.png?1', set:{}};
    PK_S3.items[1801] = {item_id:1801, nshort:'coyoteheart', name:'Сердце койота', type:'yield', level:0, price:10, image:'/images/items/yield/coyoteheart.png?1', image_mini:'images/items/yield/coyoteheart.png?1', set:{}};
    PK_S3.items[1802] = {item_id:1802, nshort:'phantomdrawing', name:'Портрет', type:'yield', level:0, price:10, image:'/images/items/yield/phantomdrawing.png?1', image_mini:'images/items/yield/phantomdrawing.png?1', set:{}};
    PK_S3.items[1803] = {item_id:1803, nshort:'candyorange', name:'Апельсин в сахаре', type:'yield', level:0, price:10, image:'/images/items/yield/candyorange.png?1', image_mini:'images/items/yield/candyorange.png?1', set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1804] = {item_id:1804, nshort:'smellingfish', name:'Тухлая рыба', type:'yield', level:0, price:0, image:'/images/items/yield/smellingfish.png?1', image_mini:'images/items/yield/smellingfish.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1805] = {item_id:1805, nshort:'needleandthreat', name:'Иголка с ниткой', type:'yield', level:0, price:5, image:'/images/items/yield/needleandthreat.png?1', image_mini:'images/items/yield/needleandthreat.png?1', set:{}};
    PK_S3.items[1806] = {item_id:1806, nshort:'cottonbale', name:'Тюк хлопка', type:'yield', level:0, price:15, image:'/images/items/yield/cottonbale.png?1', image_mini:'images/items/yield/cottonbale.png?1', set:{}};
    PK_S3.items[1807] = {item_id:1807, nshort:'sock', name:'Испорченные шпоры', type:'yield', level:0, price:0, image:'/images/items/yield/sock.png?1', image_mini:'images/items/yield/sock.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
PK_S3.items[1808] = {item_id:1808, nshort:'potatoe', name:'Картошка', type:'yield', level:0, price:5, image:'/images/items/yield/potatoe.png?1', image_mini:'images/items/yield/potatoe.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1809] = {item_id:1809, nshort:'hay', name:'Сено', type:'yield', level:0, price:5, image:'/images/items/yield/hay.png?1', image_mini:'images/items/yield/hay.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1810] = {item_id:1810, nshort:'pumpkin', name:'Тыква', type:'yield', level:0, price:25, image:'/images/items/yield/pumpkin.png?1', image_mini:'images/items/yield/pumpkin.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1811] = {item_id:1811, nshort:'blueberries', name:'Черника', type:'yield', level:0, price:15, image:'/images/items/yield/blueberries.png?1', image_mini:'images/items/yield/blueberries.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1812] = {item_id:1812, nshort:'pit', name:'Косточка', type:'yield', level:0, price:1, image:'/images/items/yield/pit.png?1', image_mini:'images/items/yield/pit.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1813] = {item_id:1813, nshort:'eagle_feather', name:'Перо орла', type:'yield', level:0, price:35, image:'/images/items/yield/eagle_feather.png?1', image_mini:'images/items/yield/eagle_feather.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1814] = {item_id:1814, nshort:'lotus', name:'Цветок лотоса', type:'yield', level:0, price:45, image:'/images/items/yield/lotus.png?1', image_mini:'images/items/yield/lotus.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1815] = {item_id:1815, nshort:'crabmeat', name:'Мясо краба', type:'yield', level:0, price:12, image:'/images/items/yield/crabmeat.png?1', image_mini:'images/items/yield/crabmeat.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1816] = {item_id:1816, nshort:'chalk', name:'Мел', type:'yield', level:0, price:2, image:'/images/items/yield/chalk.png?1', image_mini:'images/items/yield/chalk.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1817] = {item_id:1817, nshort:'sheriffstar', name:'Шерифская звезда', type:'yield', level:0, price:50, image:'/images/items/yield/sheriffstar.png?1', image_mini:'images/items/yield/sheriffstar.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1818] = {item_id:1818, nshort:'sulfurstone', name:'Серная порода', type:'yield', level:0, price:25, image:'/images/items/yield/sulfurstone.png?1', image_mini:'images/items/yield/sulfurstone.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1819] = {item_id:1819, nshort:'pokergame', name:'Колода для покера', type:'yield', level:0, price:150, image:'/images/items/yield/pokergame.png?1', image_mini:'images/items/yield/pokergame.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1820] = {item_id:1820, nshort:'snakehide', name:'Змеиная кожа', type:'yield', level:0, price:27, image:'/images/items/yield/snakehide.png?1', image_mini:'images/items/yield/snakehide.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1821] = {item_id:1821, nshort:'salpetersalt', name:'Селитра', type:'yield', level:0, price:13, image:'/images/items/yield/salpetersalt.png?1', image_mini:'images/items/yield/salpetersalt.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1822] = {item_id:1822, nshort:'cigaretts', name:'Сигареты', type:'yield', level:0, price:3, image:'/images/items/yield/cigaretts.png?1', image_mini:'images/items/yield/cigaretts.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1823] = {item_id:1823, nshort:'rodeo_trophy', name:'Кубок родео', type:'yield', level:0, price:75, image:'/images/items/yield/rodeo_trophy.png?1', image_mini:'images/items/yield/rodeo_trophy.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1824] = {item_id:1824, nshort:'cougar_hide', name:'Шкура пумы', type:'yield', level:0, price:55, image:'/images/items/yield/cougar_hide.png?1', image_mini:'images/items/yield/cougar_hide.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1825] = {item_id:1825, nshort:'indigo', name:'Индигофера', type:'yield', level:0, price:65, image:'/images/items/yield/indigo.png?1', image_mini:'images/items/yield/indigo.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1826] = {item_id:1826, nshort:'rum', name:'Ром', type:'yield', level:0, price:7, image:'/images/items/yield/rum.png?1', image_mini:'images/items/yield/rum.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1827] = {item_id:1827, nshort:'lead', name:'Свинец', type:'yield', level:0, price:27, image:'/images/items/yield/lead.png?1', image_mini:'images/items/yield/lead.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1828] = {item_id:1828, nshort:'uncut_ruby', name:'Рубин', type:'yield', level:0, price:75, image:'/images/items/yield/uncut_ruby.png?1', image_mini:'images/items/yield/uncut_ruby.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1829] = {item_id:1829, nshort:'uncut_emerald', name:'Изумруд', type:'yield', level:0, price:55, image:'/images/items/yield/uncut_emerald.png?1', image_mini:'images/items/yield/uncut_emerald.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1830] = {item_id:1830, nshort:'uncut_diamond', name:'Алмаз', type:'yield', level:0, price:100, image:'/images/items/yield/uncut_diamond.png?1', image_mini:'images/items/yield/uncut_diamond.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1831] = {item_id:1831, nshort:'woodcross', name:'Деревянный крест', type:'yield', level:0, price:3, image:'/images/items/yield/woodcross.png?1', image_mini:'images/items/yield/woodcross.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1832] = {item_id:1832, nshort:'metall_chip', name:'Железная фишка', type:'yield', level:0, price:50, image:'/images/items/yield/metall_chip.png?1', image_mini:'images/items/yield/metall_chip.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1833] = {item_id:1833, nshort:'death_warrant', name:'Смертный приговор', type:'yield', level:0, price:5, image:'/images/items/yield/death_warrant.png?1', image_mini:'images/items/yield/death_warrant.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1834] = {item_id:1834, nshort:'peaceflower', name:'Цветок мира', type:'yield', level:0, price:1, image:'/images/items/yield/peaceflower.png?1', image_mini:'images/items/yield/peaceflower.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1835] = {item_id:1835, nshort:'rose', name:'Роза', type:'yield', level:0, price:10, image:'/images/items/yield/rose.png?1', image_mini:'images/items/yield/rose.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1836] = {item_id:1836, nshort:'marriage_certificate', name:'Свидетельство о браке', type:'yield', level:0, price:2, image:'/images/items/yield/marriage_certificate.png?1', image_mini:'images/items/yield/marriage_certificate.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1837] = {item_id:1837, nshort:'printing_plate', name:'Клише', type:'yield', level:0, price:150, image:'/images/items/yield/printing_plate.png?1', image_mini:'images/items/yield/printing_plate.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1838] = {item_id:1838, nshort:'wolf_geislein', name:'Волк со вздувшимся брюхом', type:'yield', level:0, price:3, image:'/images/items/yield/wolf_geislein.png?1', image_mini:'images/items/yield/wolf_geislein.png?1', set:{}};
    PK_S3.items[1839] = {item_id:1839, nshort:'geislein', name:'Козлёнок', type:'yield', level:0, price:75, image:'/images/items/yield/geislein.png?1', image_mini:'images/items/yield/geislein.png?1', set:{}};
    PK_S3.items[1840] = {item_id:1840, nshort:'bunny', name:'Кролик', type:'yield', level:0, price:75, image:'/images/items/yield/bunny.png?1', image_mini:'images/items/yield/bunny.png?1', set:{}};
    PK_S3.items[1841] = {item_id:1841, nshort:'elefant', name:'Слон', type:'yield', level:0, price:75, image:'/images/items/yield/elefant.png?1', image_mini:'images/items/yield/elefant.png?1', set:{}};
    PK_S3.items[1842] = {item_id:1842, nshort:'lion', name:'Лев', type:'yield', level:0, price:75, image:'/images/items/yield/lion.png?1', image_mini:'images/items/yield/lion.png?1', set:{}};
    PK_S3.items[1843] = {item_id:1843, nshort:'brownbear', name:'Гризли', type:'yield', level:0, price:50, image:'/images/items/yield/brownbear.png?1', image_mini:'images/items/yield/brownbear.png?1', set:{}};
    PK_S3.items[1844] = {item_id:1844, nshort:'wolf2', name:'Волк', type:'yield', level:0, price:25, image:'/images/items/yield/wolf2.png?1', image_mini:'images/items/yield/wolf2.png?1', set:{}};
    PK_S3.items[1845] = {item_id:1845, nshort:'snake', name:'Змея', type:'yield', level:0, price:10, image:'/images/items/yield/snake.png?1', image_mini:'images/items/yield/snake.png?1', set:{}};
    PK_S3.items[1846] = {item_id:1846, nshort:'dwarfpony', name:'Шетлендский пони', type:'yield', level:0, price:35, image:'/images/items/yield/dwarfpony.png?1', image_mini:'images/items/yield/dwarfpony.png?1', set:{}};
    PK_S3.items[1847] = {item_id:1847, nshort:'eagle', name:'Орёл', type:'yield', level:0, price:350, image:'/images/items/yield/eagle.png?1', image_mini:'images/items/yield/eagle.png?1', set:{}};
    PK_S3.items[1848] = {item_id:1848, nshort:'cougar', name:'Пума', type:'yield', level:0, price:250, image:'/images/items/yield/cougar.png?1', image_mini:'images/items/yield/cougar.png?1', set:{}};
    PK_S3.items[1849] = {item_id:1849, nshort:'sheriff_helper', name:'Шерифская звезда', type:'yield', level:0, price:1, image:'/images/items/yield/sheriff_helper.png?1', image_mini:'images/items/yield/sheriff_helper.png?1', set:{}};
    PK_S3.items[1850] = {item_id:1850, nshort:'animal_card', name:'Карта леса', type:'yield', level:0, price:1, image:'/images/items/yield/animal_card.png?1', image_mini:'images/items/yield/animal_card.png?1', set:{}};    PK_S3.items[1851] = {item_id:1851, nshort:'elixir_bear', name:'Зелье Медведя', type:'yield', level:0, price:1, image:'/images/items/yield/elixir_bear.png?1', image_mini:'images/items/yield/elixir_bear.png?1', set:{}};
    PK_S3.items[1852] = {item_id:1852, nshort:'elixir_cougar', name:'Зелье Пумы', type:'yield', level:0, price:1, image:'/images/items/yield/elixir_cougar.png?1', image_mini:'images/items/yield/elixir_cougar.png?1', set:{}};
    PK_S3.items[1853] = {item_id:1853, nshort:'elixir_eagle', name:'Зелье Орла', type:'yield', level:0, price:1, image:'/images/items/yield/elixir_eagle.png?1', image_mini:'images/items/yield/elixir_eagle.png?1', set:{}};
    PK_S3.items[1854] = {item_id:1854, nshort:'elixir_snake', name:'Зелье Змеи', type:'yield', level:0, price:1, image:'/images/items/yield/elixir_snake.png?1', image_mini:'images/items/yield/elixir_snake.png?1', set:{}};
PK_S3.items[1855] = {item_id:1855, nshort:'charcoal', name:'Древесный уголь', type:'yield', level:0, price:31, image:'/images/items/yield/charcoal.png?1', image_mini:'images/items/yield/charcoal.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1856] = {item_id:1856, nshort:'waterjar', name:'Наполненный водой кувшин', type:'yield', level:0, price:30, image:'/images/items/yield/waterjar.png?1', image_mini:'images/items/yield/waterjar.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1857] = {item_id:1857, nshort:'fieldbottle', name:'Фляга', type:'yield', level:0, price:130, image:'/images/items/yield/fieldbottle.png?1', image_mini:'images/items/yield/fieldbottle.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1858] = {item_id:1858, nshort:'workingknife', name:'Рабочий нож', type:'yield', level:0, price:120, image:'/images/items/yield/workingknife.png?1', image_mini:'images/items/yield/workingknife.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1859] = {item_id:1859, nshort:'cookingpan', name:'Сковорода', type:'yield', level:0, price:74, image:'/images/items/yield/cookingpan.png?1', image_mini:'images/items/yield/cookingpan.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1860] = {item_id:1860, nshort:'cuttingwood', name:'Разделочная доска', type:'yield', level:0, price:56, image:'/images/items/yield/cuttingwood.png?1', image_mini:'images/items/yield/cuttingwood.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1861] = {item_id:1861, nshort:'flint', name:'Огниво', type:'yield', level:0, price:32, image:'/images/items/yield/flint.png?1', image_mini:'images/items/yield/flint.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1863] = {item_id:1863, nshort:'beansandbacon', name:'Тушёные бобы с беконом', type:'yield', level:0, price:133, image:'/images/items/yield/beansandbacon.png?1', image_mini:'images/items/yield/beansandbacon.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1864] = {item_id:1864, nshort:'marmelade', name:'Джем', type:'yield', level:0, price:130, image:'/images/items/yield/marmelade.png?1', image_mini:'images/items/yield/marmelade.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1865] = {item_id:1865, nshort:'mash', name:'Сусло', type:'yield', level:0, price:90, image:'/images/items/yield/mash.png?1', image_mini:'images/items/yield/mash.png?1', set:{}, sellable:true};
    PK_S3.items[1866] = {item_id:1866, nshort:'dough', name:'Тесто', type:'yield', level:0, price:41, image:'/images/items/yield/dough.png?1', image_mini:'images/items/yield/dough.png?1', set:{}, sellable:true};
    PK_S3.items[1867] = {item_id:1867, nshort:'seasonedsteak', name:'Стейк в маринаде', type:'yield', level:0, price:115, image:'/images/items/yield/seasonedsteak.png?1', image_mini:'images/items/yield/seasonedsteak.png?1', set:{}, sellable:true};
PK_S3.items[1868] = {item_id:1868, nshort:'licor', name:'Ягодный ликёр', type:'yield', level:0, price:264, image:'/images/items/yield/licor.png?1', image_mini:'images/items/yield/licor.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1869] = {item_id:1869, nshort:'cake', name:'Торт', type:'yield', level:0, price:83, image:'/images/items/yield/cake.png?1', image_mini:'images/items/yield/cake.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1870] = {item_id:1870, nshort:'fishfond', name:'Рыбный бульон', type:'yield', level:0, price:42, image:'/images/items/yield/fishfond.png?1', image_mini:'images/items/yield/fishfond.png?1', set:{}, sellable:true};
    PK_S3.items[1871] = {item_id:1871, nshort:'grilled_turkey', name:'Жареная индейка', type:'yield', level:0, price:91, image:'/images/items/yield/grilled_turkey.png?1', image_mini:'images/items/yield/grilled_turkey.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1872] = {item_id:1872, nshort:'fishsoup', name:'Уха', type:'yield', level:0, price:130, image:'/images/items/yield/fishsoup.png?1', image_mini:'images/items/yield/fishsoup.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1873] = {item_id:1873, nshort:'veggiepun', name:'Овощные пельмени', type:'yield', level:0, price:256, image:'/images/items/yield/veggiepun.png?1', image_mini:'images/items/yield/veggiepun.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1874] = {item_id:1874, nshort:'meatloaf', name:'Фарш', type:'yield', level:0, price:244, image:'/images/items/yield/meatloaf.png?1', image_mini:'images/items/yield/meatloaf.png?1', set:{}, sellable:true};
    PK_S3.items[1875] = {item_id:1875, nshort:'fishonastick', name:'Запечённая рыба', type:'yield', level:0, price:74, image:'/images/items/yield/fishonastick.png?1', image_mini:'images/items/yield/fishonastick.png?1', set:{}, sellable:true};
    PK_S3.items[1876] = {item_id:1876, nshort:'parfumsmoke', name:'Ладан', type:'yield', level:0, price:54, image:'/images/items/yield/parfumsmoke.png?1', image_mini:'images/items/yield/parfumsmoke.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1877] = {item_id:1877, nshort:'sauce', name:'Соус', type:'yield', level:0, price:131, image:'/images/items/yield/sauce.png?1', image_mini:'images/items/yield/sauce.png?1', set:{}, sellable:true};
    PK_S3.items[1878] = {item_id:1878, nshort:'paperfish', name:'Копчёная рыба', type:'yield', level:0, price:84, image:'/images/items/yield/paperfish.png?1', image_mini:'images/items/yield/paperfish.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
PK_S3.items[1879] = {item_id:1879, nshort:'gentlemendinner', name:'Обед джентльмена', type:'yield', level:0, price:188, image:'/images/items/yield/gentlemendinner.png?1', image_mini:'images/items/yield/gentlemendinner.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1880] = {item_id:1880, nshort:'gum', name:'Смола', type:'yield', level:0, price:64, image:'/images/items/yield/gum.png?1', image_mini:'images/items/yield/gum.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1881] = {item_id:1881, nshort:'sulfur', name:'Сера', type:'yield', level:0, price:47, image:'/images/items/yield/sulfur.png?1', image_mini:'images/items/yield/sulfur.png?1', set:{}, sellable:true};
PK_S3.items[1882] = {item_id:1882, nshort:'pipecleaner', name:'Ёршик', type:'yield', level:0, price:190, image:'/images/items/yield/pipecleaner.png?1', image_mini:'images/items/yield/pipecleaner.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1883] = {item_id:1883, nshort:'stomach', name:'Белая микстура', type:'yield', level:0, price:48, image:'/images/items/yield/stomach.png?1', image_mini:'images/items/yield/stomach.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1884] = {item_id:1884, nshort:'sulfuracid', name:'Серная кислота', type:'yield', level:0, price:79, image:'/images/items/yield/sulfuracid.png?1', image_mini:'images/items/yield/sulfuracid.png?1', set:{}, sellable:true};
    PK_S3.items[1885] = {item_id:1885, nshort:'ink', name:'Чернила', type:'yield', level:0, price:164, image:'/images/items/yield/ink.png?1', image_mini:'images/items/yield/ink.png?1', set:{}, sellable:true};
    PK_S3.items[1886] = {item_id:1886, nshort:'petroleum', name:'Керосин', type:'yield', level:0, price:215, image:'/images/items/yield/petroleum.png?1', image_mini:'images/items/yield/petroleum.png?1', set:{}, sellable:true};
    PK_S3.items[1887] = {item_id:1887, nshort:'fetish', name:'Идол', type:'yield', level:0, price:288, image:'/images/items/yield/fetish.png?1', image_mini:'images/items/yield/fetish.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1888] = {item_id:1888, nshort:'destillate', name:'Дистиллят', type:'yield', level:0, price:470, image:'/images/items/yield/destillate.png?1', image_mini:'images/items/yield/destillate.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1889] = {item_id:1889, nshort:'firewater', name:'Самогон', type:'yield', level:0, price:135, image:'/images/items/yield/firewater.png?1', image_mini:'images/items/yield/firewater.png?1', set:{}, sellable:true};
PK_S3.items[1890] = {item_id:1890, nshort:'tea', name:'Чай', type:'yield', level:0, price:72, image:'/images/items/yield/tea.png?1', image_mini:'images/items/yield/tea.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1891] = {item_id:1891, nshort:'chewtabaco', name:'Жевательный табак', type:'yield', level:0, price:179, image:'/images/items/yield/chewtabaco.png?1', image_mini:'images/items/yield/chewtabaco.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1892] = {item_id:1892, nshort:'fruitlicor', name:'Фруктовый ликёр', type:'yield', level:0, price:124, image:'/images/items/yield/fruitlicor.png?1', image_mini:'images/items/yield/fruitlicor.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1893] = {item_id:1893, nshort:'battery', name:'Гальванический элемент', type:'yield', level:0, price:180, image:'/images/items/yield/battery.png?1', image_mini:'images/items/yield/battery.png?1', set:{}, sellable:true};
    PK_S3.items[1894] = {item_id:1894, nshort:'lye', name:'Щёлок', type:'yield', level:0, price:139, image:'/images/items/yield/lye.png?1', image_mini:'images/items/yield/lye.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1895] = {item_id:1895, nshort:'herbbrew', name:'Травяной ликёр', type:'yield', level:0, price:122, image:'/images/items/yield/herbbrew.png?1', image_mini:'images/items/yield/herbbrew.png?1', set:{}, sellable:true};
    PK_S3.items[1896] = {item_id:1896, nshort:'rec_paper', name:'Макулатура', type:'yield', level:0, price:126, image:'/images/items/yield/rec_paper.png?1', image_mini:'images/items/yield/rec_paper.png?1', set:{}, sellable:true};
    PK_S3.items[1897] = {item_id:1897, nshort:'mathdraw', name:'Циркуль', type:'yield', level:0, price:83, image:'/images/items/yield/mathdraw.png?1', image_mini:'images/items/yield/mathdraw.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1898] = {item_id:1898, nshort:'rosewater', name:'Розовая вода', type:'yield', level:0, price:83, image:'/images/items/yield/rosewater.png?1', image_mini:'images/items/yield/rosewater.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1899] = {item_id:1899, nshort:'hotiron', name:'Расплавленное железо', type:'yield', level:0, price:72, image:'/images/items/yield/hotiron.png?1', image_mini:'images/items/yield/hotiron.png?1', set:{}, sellable:true};
PK_S3.items[1900] = {item_id:1900, nshort:'bajonett', name:'Штык', type:'yield', level:0, price:154, image:'/images/items/yield/bajonett.png?1', image_mini:'images/items/yield/bajonett.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1901] = {item_id:1901, nshort:'weightstone', name:'Грузило', type:'yield', level:0, price:108, image:'/images/items/yield/weightstone.png?1', image_mini:'images/items/yield/weightstone.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1902] = {item_id:1902, nshort:'steel', name:'Стальная заготовка', type:'yield', level:0, price:142, image:'/images/items/yield/steel.png?1', image_mini:'images/items/yield/steel.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1903] = {item_id:1903, nshort:'liquid_lead', name:'Расплавленный свинец', type:'yield', level:0, price:134, image:'/images/items/yield/liquid_lead.png?1', image_mini:'images/items/yield/liquid_lead.png?1', set:{}, sellable:true};
    PK_S3.items[1904] = {item_id:1904, nshort:'forge', name:'Наковальня', type:'yield', level:0, price:246, image:'/images/items/yield/forge.png?1', image_mini:'images/items/yield/forge.png?1', set:{}, sellable:true};
    PK_S3.items[1905] = {item_id:1905, nshort:'lead_figure', name:'Свинцовая статуэтка', type:'yield', level:0, price:219, image:'/images/items/yield/lead_figure.png?1', image_mini:'images/items/yield/lead_figure.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1906] = {item_id:1906, nshort:'hot_marbel', name:'Горячий мраморный шарик', type:'yield', level:0, price:164, image:'/images/items/yield/hot_marbel.png?1', image_mini:'images/items/yield/hot_marbel.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};

    PK_S3.items[1907] = {item_id:1907, nshort:'rivets', name:'Заклёпки', type:'yield', level:0, price:46, image:'/images/items/yield/rivets.png?1', image_mini:'images/items/yield/rivets.png?1', set:{}, sellable:true};
    PK_S3.items[1908] = {item_id:1908, nshort:'handprotection', name:'Эфес', type:'yield', level:0, price:144, image:'/images/items/yield/handprotection.png?1', image_mini:'images/items/yield/handprotection.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1909] = {item_id:1909, nshort:'coolingpackage', name:'Мокрый платок', type:'yield', level:0, price:62, image:'/images/items/yield/coolingpackage.png?1', image_mini:'images/items/yield/coolingpackage.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1910] = {item_id:1910, nshort:'weaponchain', name:'Оружейная цепь', type:'yield', level:0, price:78, image:'/images/items/yield/weaponchain.png?1', image_mini:'images/items/yield/weaponchain.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1911] = {item_id:1911, nshort:'weapon_handle', name:'Рукоять', type:'yield', level:0, price:206, image:'/images/items/yield/weapon_handle.png?1', image_mini:'images/items/yield/weapon_handle.png?1', set:{}, sellable:true};
    PK_S3.items[1912] = {item_id:1912, nshort:'revolverform', name:'Литейная форма для револьвера', type:'yield', level:0, price:174, image:'/images/items/yield/revolverform.png?1', image_mini:'images/items/yield/revolverform.png?1', set:{}, sellable:true};
    PK_S3.items[1913] = {item_id:1913, nshort:'steelblade', name:'Стальное лезвие', type:'yield', level:0, price:234, image:'/images/items/yield/steelblade.png?1', image_mini:'images/items/yield/steelblade.png?1', set:{}, sellable:true};
    PK_S3.items[1914] = {item_id:1914, nshort:'weapon_custom', name:'Украшения', type:'yield', level:0, price:100, image:'/images/items/yield/weapon_custom.png?1', image_mini:'images/items/yield/weapon_custom.png?1', set:{}, sellable:true};
    PK_S3.items[1915] = {item_id:1915, nshort:'druse', name:'Жеода', type:'yield', level:0, price:112, image:'/images/items/yield/druse.png?1', image_mini:'images/items/yield/druse.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1916] = {item_id:1916, nshort:'polishstone', name:'Полировочный камень', type:'yield', level:0, price:252, image:'/images/items/yield/polishstone.png?1', image_mini:'images/items/yield/polishstone.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1917] = {item_id:1917, nshort:'leatherband', name:'Кожаный ремешок', type:'yield', level:0, price:60, image:'/images/items/yield/leatherband.png?1', image_mini:'images/items/yield/leatherband.png?1', set:{}, sellable:true};
PK_S3.items[1918] = {item_id:1918, nshort:'horseshoe_equip', name:'Набивка подков', type:'yield', level:0, price:68, image:'/images/items/yield/horseshoe_equip.png?1', image_mini:'images/items/yield/horseshoe_equip.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1919] = {item_id:1919, nshort:'powerfood', name:'Комбикорм', type:'yield', level:0, price:32, image:'/images/items/yield/powerfood.png?1', image_mini:'images/items/yield/powerfood.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1920] = {item_id:1920, nshort:'naked_saddle', name:'Разобранное седло', type:'yield', level:0, price:256, image:'/images/items/yield/naked_saddle.png?1', image_mini:'images/items/yield/naked_saddle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[1921] = {item_id:1921, nshort:'fillmaterial', name:'Наполнитель', type:'yield', level:0, price:52, image:'/images/items/yield/fillmaterial.png?1', image_mini:'images/items/yield/fillmaterial.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[1922] = {item_id:1922, nshort:'leatherskin', name:'Кожаный чехол', type:'yield', level:0, price:107, image:'/images/items/yield/leatherskin.png?1', image_mini:'images/items/yield/leatherskin.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[1923] = {item_id:1923, nshort:'branding_iron', name:'Клеймо', type:'yield', level:0, price:220, image:'/images/items/yield/branding_iron.png?1', image_mini:'images/items/yield/branding_iron.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1924] = {item_id:1924, nshort:'notworking_compass', name:'Неработающий компас', type:'yield', level:0, price:304, image:'/images/items/yield/notworking_compass.png?1', image_mini:'images/items/yield/notworking_compass.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1925] = {item_id:1925, nshort:'ironstep', name:'Стремена', type:'yield', level:0, price:220, image:'/images/items/yield/ironstep.png?1', image_mini:'images/items/yield/ironstep.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    
PK_S3.items[1927] = {item_id:1927, nshort:'harnish', name:'Уздечка Элама Харниша', type:'yield', level:0, price:154, image:'/images/items/yield/harnish.png?1', image_mini:'images/items/yield/harnish.png?1', set:{}, auctionable:true, sellable:true};

    PK_S3.items[1933] = {item_id:1933, nshort:'aimwater', name:'Эликсир меткости', type:'yield', level:0, price:600, image:'/images/items/yield/aimwater.png?1', image_mini:'images/items/yield/aimwater.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1934] = {item_id:1934, nshort:'gem_knob', name:'Украшенная драгоценными камнями лука седла', type:'yield', level:0, price:194, image:'/images/items/yield/gem_knob.png?1', image_mini:'images/items/yield/gem_knob.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1935] = {item_id:1935, nshort:'fixed_spade', name:'Лопата со склеенным черенком', type:'yield', level:0, price:15, image:'/images/items/yield/fixed_spade.png?1', image_mini:'images/items/yield/fixed_spade.png?1', set:{}};
    PK_S3.items[1936] = {item_id:1936, nshort:'money_bag', name:'Бумажник', type:'yield', level:0, price:25, image:'/images/items/yield/money_bag.png?1', image_mini:'images/items/yield/money_bag.png?1', set:{}};
PK_S3.items[1937] = {item_id:1937, nshort:'travelbag', name:'Ранец путешественника', type:'yield', level:0, price:22, image:'/images/items/yield/travelbag.png?1', image_mini:'images/items/yield/travelbag.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1938] = {item_id:1938, nshort:'sharpweapon', name:'Заточка оружия', type:'yield', level:0, price:16, image:'/images/items/yield/sharpweapon.png?1', image_mini:'images/items/yield/sharpweapon.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1939] = {item_id:1939, nshort:'filtercigaretts', name:'Сигареты с фильтром', type:'yield', level:0, price:29, image:'/images/items/yield/filtercigaretts.png?1', image_mini:'images/items/yield/filtercigaretts.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[1940] = {item_id:1940, nshort:'cake_piece', name:'Шоколадное пирожное с вишней', type:'yield', level:0, price:17, image:'/images/items/yield/cake_piece.png?1', image_mini:'images/items/yield/cake_piece.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1941] = {item_id:1941, nshort:'tomato_mash', name:'Томатное пюре', type:'yield', level:0, price:6, image:'/images/items/yield/tomato_mash.png?1', image_mini:'images/items/yield/tomato_mash.png?1', set:{}, sellable:true};
    PK_S3.items[1942] = {item_id:1942, nshort:'tomato_sauce', name:'Томатный соус', type:'yield', level:0, price:15, image:'/images/items/yield/tomato_sauce.png?1', image_mini:'images/items/yield/tomato_sauce.png?1', set:{}, sellable:true};
PK_S3.items[1943] = {item_id:1943, nshort:'baked_beans', name:'Бобы в томатном соусе', type:'yield', level:0, price:50, image:'/images/items/yield/baked_beans.png?1', image_mini:'images/items/yield/baked_beans.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1944] = {item_id:1944, nshort:'raw_pyrit', name:'Очищенный пирит', type:'yield', level:0, price:16, image:'/images/items/yield/raw_pyrit.png?1', image_mini:'images/items/yield/raw_pyrit.png?1', set:{}, sellable:true};
    PK_S3.items[1945] = {item_id:1945, nshort:'pyritsun', name:'Пиритовый доллар', type:'yield', level:0, price:20, image:'/images/items/yield/pyritsun.png?1', image_mini:'images/items/yield/pyritsun.png?1', set:{}, sellable:true};
PK_S3.items[1946] = {item_id:1946, nshort:'pyrit_amulett', name:'Пиритовый амулет', type:'yield', level:0, price:50, image:'/images/items/yield/pyrit_amulett.png?1', image_mini:'images/items/yield/pyrit_amulett.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1947] = {item_id:1947, nshort:'graphit', name:'Графит', type:'yield', level:0, price:20, image:'/images/items/yield/graphit.png?1', image_mini:'images/items/yield/graphit.png?1', set:{}, sellable:true};
    PK_S3.items[1948] = {item_id:1948, nshort:'graphitpulver', name:'Графитовый порошок', type:'yield', level:0, price:25, image:'/images/items/yield/graphitpulver.png?1', image_mini:'images/items/yield/graphitpulver.png?1', set:{}, sellable:true};
PK_S3.items[1949] = {item_id:1949, nshort:'graphit_glue', name:'Графитовая смазка', type:'yield', level:0, price:50, image:'/images/items/yield/graphit_glue.png?1', image_mini:'images/items/yield/graphit_glue.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1950] = {item_id:1950, nshort:'workedleather', name:'Дублёная кожа', type:'yield', level:0, price:16, image:'/images/items/yield/workedleather.png?1', image_mini:'images/items/yield/workedleather.png?1', set:{}, sellable:true};
    PK_S3.items[1951] = {item_id:1951, nshort:'leathersac', name:'Кожаный мешок', type:'yield', level:0, price:25, image:'/images/items/yield/leathersac.png?1', image_mini:'images/items/yield/leathersac.png?1', set:{}, sellable:true};
PK_S3.items[1952] = {item_id:1952, nshort:'foodsac', name:'Мешок с зерном', type:'yield', level:0, price:50, image:'/images/items/yield/foodsac.png?1', image_mini:'images/items/yield/foodsac.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1953] = {item_id:1953, nshort:'simple_bow', name:'Лук', type:'yield', level:0, price:50, image:'/images/items/yield/simple_bow.png?1', image_mini:'images/items/yield/simple_bow.png?1', set:{}};
    PK_S3.items[1954] = {item_id:1954, nshort:'simple_rifle', name:'Оружие', type:'yield', level:0, price:50, image:'/images/items/yield/simple_rifle.png?1', image_mini:'images/items/yield/simple_rifle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1955] = {item_id:1955, nshort:'scalp_yield', name:'Скальп', type:'yield', level:1, price:10, image:'/images/items/yield/scalp_yield.png?1', image_mini:'images/items/yield/scalp_yield.png?1', bonus:{skills:{leadership:5, hide:7, endurance:7}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:66, tradeable:true, sellable:true};
    PK_S3.items[1956] = {item_id:1956, nshort:'totem_snake', name:'Тотем Змеи', type:'yield', level:1, price:10, image:'/images/items/yield/totem_snake.png?1', image_mini:'images/items/yield/totem_snake.png?1', set:{}};
    PK_S3.items[1957] = {item_id:1957, nshort:'totem_cougart', name:'Тотем Пумы', type:'yield', level:1, price:10, image:'/images/items/yield/totem_cougart.png?1', image_mini:'images/items/yield/totem_cougart.png?1', set:{}, auctionable:false, dropable:false, tradeable:false, sellable:false};
    PK_S3.items[1958] = {item_id:1958, nshort:'totem_eagle', name:'Тотем Орла', type:'yield', level:1, price:10, image:'/images/items/yield/totem_eagle.png?1', image_mini:'images/items/yield/totem_eagle.png?1', set:{}};
    PK_S3.items[1959] = {item_id:1959, nshort:'totem_bear', name:'Тотем Медведя', type:'yield', level:1, price:10, image:'/images/items/yield/totem_bear.png?1', image_mini:'images/items/yield/totem_bear.png?1', set:{}};
    PK_S3.items[1960] = {item_id:1960, nshort:'leatherbag', name:'Кожаная сумка', type:'yield', level:0, price:39, image:'/images/items/yield/leatherbag.png?1', image_mini:'images/items/yield/leatherbag.png?1', set:{}};
    PK_S3.items[1961] = {item_id:1961, nshort:'leatherpouch', name:'Кожаная саква', type:'yield', level:0, price:93, image:'/images/items/yield/leatherpouch.png?1', image_mini:'images/items/yield/leatherpouch.png?1', set:{}};    PK_S3.items[1862] = {item_id:1862, nshort:'cornflour', name:'Кукурузная мука', type:'yield', level:0, price:20, image:'/images/items/yield/cornflour.png?1', image_mini:'images/items/yield/cornflour.png?1', set:{}, sellable:true};
    PK_S3.items[1962] = {item_id:1962, nshort:'salt', name:'Соль', type:'yield', level:0, price:55, image:'/images/items/yield/salt.png?1', image_mini:'images/items/yield/salt.png?1', set:{}};
    PK_S3.items[1963] = {item_id:1963, nshort:'fertilizer', name:'Удобрение', type:'yield', level:0, price:49, image:'/images/items/yield/fertilizer.png?1', image_mini:'images/items/yield/fertilizer.png?1', set:{}};
    PK_S3.items[1964] = {item_id:1964, nshort:'tin', name:'Оловянная коробка', type:'yield', level:0, price:110, image:'/images/items/yield/tin.png?1', image_mini:'images/items/yield/tin.png?1', set:{}};
    PK_S3.items[1965] = {item_id:1965, nshort:'old_letters', name:'Старые письма', type:'yield', level:0, price:1, image:'/images/items/yield/old_letters.png?1', image_mini:'images/items/yield/old_letters.png?1', set:{}};
    PK_S3.items[1966] = {item_id:1966, nshort:'ownership_certification', name:'Право собственности на ферму', type:'yield', level:0, price:30, image:'/images/items/yield/ownership_certification.png?1', image_mini:'images/items/yield/ownership_certification.png?1', set:{}};
    PK_S3.items[1967] = {item_id:1967, nshort:'bag_of_vittles', name:'Заплечный узелок', type:'yield', level:0, price:93, image:'/images/items/yield/bag_of_vittles.png?1', image_mini:'images/items/yield/bag_of_vittles.png?1', set:{}};
    PK_S3.items[1968] = {item_id:1968, nshort:'horse_tonic', name:'Конский тоник', type:'yield', level:0, price:69, image:'/images/items/yield/horse_tonic.png?1', image_mini:'images/items/yield/horse_tonic.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1969] = {item_id:1969, nshort:'12_years_old_whiskey', name:'Виски двенадцатилетней выдержки', type:'yield', level:0, price:62, image:'/images/items/yield/12_years_old_whiskey.png?1', image_mini:'images/items/yield/12_years_old_whiskey.png?1', set:{}, auctionable:true};
    PK_S3.items[1970] = {item_id:1970, nshort:'cherry_cake', name:'Вишнёвый торт', type:'yield', level:0, price:39, image:'/images/items/yield/cherry_cake.png?1', image_mini:'images/items/yield/cherry_cake.png?1', set:{}, auctionable:true};
    PK_S3.items[1971] = {item_id:1971, nshort:'tabacopipe', name:'Набитая трубка', type:'yield', level:0, price:99, image:'/images/items/yield/tabacopipe.png?1', image_mini:'images/items/yield/tabacopipe.png?1', set:{}};
    PK_S3.items[1972] = {item_id:1972, nshort:'harmonica', name:'Губная гармошка', type:'yield', level:0, price:10, image:'/images/items/yield/harmonica.png?1', image_mini:'images/items/yield/harmonica.png?1', bonus:{skills:{finger_dexterity:8}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1973] = {item_id:1973, nshort:'juniper_brew', name:'Джин', type:'yield', level:0, price:7, image:'/images/items/yield/juniper_brew.png?1', image_mini:'images/items/yield/juniper_brew.png?1', set:{}};
    PK_S3.items[1974] = {item_id:1974, nshort:'lifeelixir', name:'Эликсир здоровья', type:'yield', level:0, price:7, image:'/images/items/yield/lifeelixir.png?1', image_mini:'images/items/yield/lifeelixir.png?1', set:{}};
    PK_S3.items[1975] = {item_id:1975, nshort:'productchest_1', name:'Рюкзак дезертира', type:'yield', level:0, price:7, image:'/images/items/yield/productchest_1.png?1', image_mini:'images/items/yield/productchest_1.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1976] = {item_id:1976, nshort:'productchest_2', name:'Саквояж Эла Майо', type:'yield', level:0, price:7, image:'/images/items/yield/productchest_2.png?1', image_mini:'images/items/yield/productchest_2.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1977] = {item_id:1977, nshort:'reset_potion', name:'Зелёный эликсир амнезии', type:'yield', level:0, price:10, image:'/images/items/yield/reset_potion.png?1', image_mini:'images/items/yield/reset_potion.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:99, tradeable:true, sellable:true};
    PK_S3.items[1978] = {item_id:1978, nshort:'skill_reset_potion', name:'Синий эликсир амнезии', type:'yield', level:0, price:10, image:'/images/items/yield/skill_reset_potion.png?1', image_mini:'images/items/yield/skill_reset_potion.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:99, tradeable:true, sellable:true};
    PK_S3.items[1979] = {item_id:1979, nshort:'att_reset_potion', name:'Фиолетовый эликсир амнезии', type:'yield', level:0, price:10, image:'/images/items/yield/att_reset_potion.png?1', image_mini:'images/items/yield/att_reset_potion.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:99, tradeable:true, sellable:true};
    PK_S3.items[1980] = {item_id:1980, nshort:'dried_meat', name:'Вяленое мясо', type:'yield', level:0, price:83, image:'/images/items/yield/dried_meat.png?1', image_mini:'images/items/yield/dried_meat.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1981] = {item_id:1981, nshort:'gulash', name:'Гуляш', type:'yield', level:0, price:278, image:'/images/items/yield/gulash.png?1', image_mini:'images/items/yield/gulash.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};

    PK_S3.items[1983] = {item_id:1983, nshort:'snake_oil', name:'Панацея', type:'yield', level:0, price:191, image:'/images/items/yield/snake_oil.png?1', image_mini:'images/items/yield/snake_oil.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1984] = {item_id:1984, nshort:'hair_tonic', name:'Лосьон для волос', type:'yield', level:0, price:630, image:'/images/items/yield/hair_tonic.png?1', image_mini:'images/items/yield/hair_tonic.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};

    PK_S3.items[1985] = {item_id:1985, nshort:'fine_spirits', name:'Изысканный ликёр', type:'yield', level:0, price:281, image:'/images/items/yield/fine_spirits.png?1', image_mini:'images/items/yield/fine_spirits.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};

    PK_S3.items[1989] = {item_id:1989, nshort:'rustprove_bolts', name:'Нержавеющие болты', type:'yield', level:0, price:282, image:'/images/items/yield/rustprove_bolts.png?1', image_mini:'images/items/yield/rustprove_bolts.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[1990] = {item_id:1990, nshort:'silvered_flask', name:'Карманная фляжка', type:'yield', level:0, price:618, image:'/images/items/yield/silvered_flask.png?1', image_mini:'images/items/yield/silvered_flask.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1991] = {item_id:1991, nshort:'modern_armor', name:'Крепкая броня', type:'yield', level:0, price:436, image:'/images/items/yield/modern_armor.png?1', image_mini:'images/items/yield/modern_armor.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};
    PK_S3.items[1992] = {item_id:1992, nshort:'old_newspaper', name:'Старая газета', type:'yield', level:0, price:1, image:'/images/items/yield/old_newspaper.png?1', image_mini:'images/items/yield/old_newspaper.png?1', set:{}};
    PK_S3.items[1993] = {item_id:1993, nshort:'bearer_bond_stack', name:'Пачка облигаций', type:'yield', level:0, price:20000, image:'/images/items/yield/bearer_bond_stack.png?1', image_mini:'images/items/yield/bearer_bond_stack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[1994] = {item_id:1994, nshort:'lamb_meat', name:'Баранина', type:'yield', level:0, price:25, image:'/images/items/yield/lamb_meat.png?1', image_mini:'images/items/yield/lamb_meat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1995] = {item_id:1995, nshort:'buffalo_meat', name:'Мясо бизона', type:'yield', level:0, price:20, image:'/images/items/yield/buffalo_meat.png?1', image_mini:'images/items/yield/buffalo_meat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1996] = {item_id:1996, nshort:'loaf_bread', name:'Буханка хлеба', type:'yield', level:0, price:8, image:'/images/items/yield/loaf_bread.png?1', image_mini:'images/items/yield/loaf_bread.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1997] = {item_id:1997, nshort:'thanksgiving_turkey', name:'Запечённая индейка', type:'yield', level:0, price:1, image:'/images/items/yield/thanksgiving_turkey.png?1', image_mini:'images/items/yield/thanksgiving_turkey.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[1998] = {item_id:1998, nshort:'christmas_stollen', name:'Кекс', type:'yield', level:0, price:1, image:'/images/items/yield/christmas_stollen.png?1', image_mini:'images/items/yield/christmas_stollen.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[2000] = {item_id:2000, nshort:'habanero_chilis', name:'Перец Хабанеро', type:'yield', level:0, price:200, image:'/images/items/yield/habanero_chilis.png?1', image_mini:'images/items/yield/habanero_chilis.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};

    PK_S3.items[2003] = {item_id:2003, nshort:'cobra_fangs', name:'Зуб кобры', type:'yield', level:0, price:200, image:'/images/items/yield/cobra_fangs.png?1', image_mini:'images/items/yield/cobra_fangs.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};

    PK_S3.items[2006] = {item_id:2006, nshort:'cossack_saddle_blanket', name:'Чепрак седла', type:'yield', level:0, price:200, image:'/images/items/yield/cossack_saddle_blanket.png?1', image_mini:'images/items/yield/cossack_saddle_blanket.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};

    PK_S3.items[2008] = {item_id:2008, nshort:'watchmaker_tools', name:'Инструменты часовщика', type:'yield', level:0, price:500, image:'/images/items/yield/watchmaker_tools.png?1', image_mini:'images/items/yield/watchmaker_tools.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[2009] = {item_id:2009, nshort:'gilded_cogs', name:'Позолоченные шестерёнки', type:'yield', level:0, price:200, image:'/images/items/yield/gilded_cogs.png?1', image_mini:'images/items/yield/gilded_cogs.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, sellable:true};

    PK_S3.items[2100] = {item_id:2100, nshort:'low_work_manual', name:'Записки Джона Айлиффа', type:'yield', level:20, price:0, image:'/images/items/yield/low_work_manual.png?1', image_mini:'images/items/yield/low_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2101] = {item_id:2101, nshort:'low_detail_work_manual', name:'Записки Леви Страусса', type:'yield', level:20, price:0, image:'/images/items/yield/low_detail_work_manual.png?1', image_mini:'images/items/yield/low_detail_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2102] = {item_id:2102, nshort:'medium_work_manual', name:'Записки Джеймса Бриджера', type:'yield', level:50, price:0, image:'/images/items/yield/medium_work_manual.png?1', image_mini:'images/items/yield/medium_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[2104] = {item_id:2104, nshort:'high_work_manual', name:'Записки Джедедайя Смита', type:'yield', level:75, price:0, image:'/images/items/yield/high_work_manual.png?1', image_mini:'images/items/yield/high_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2105] = {item_id:2105, nshort:'high_detail_work_manual', name:'Записки Томаса Фицпатрика', type:'yield', level:75, price:0, image:'/images/items/yield/high_detail_work_manual.png?1', image_mini:'images/items/yield/high_detail_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2106] = {item_id:2106, nshort:'weak_low_fort_damage', name:'Мерцающее масло', type:'yield', level:0, price:0, image:'/images/items/yield/weak_low_fort_damage.png?1', image_mini:'images/items/yield/weak_low_fort_damage.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[2110] = {item_id:2110, nshort:'weak_low_fort_bonus', name:'Прочный приклад', type:'yield', level:0, price:0, image:'/images/items/yield/weak_low_fort_bonus.png?1', image_mini:'images/items/yield/weak_low_fort_bonus.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[2114] = {item_id:2114, nshort:'weak_high_fort_bonus', name:'Удлинённое дуло', type:'yield', level:0, price:0, image:'/images/items/yield/weak_high_fort_bonus.png?1', image_mini:'images/items/yield/weak_high_fort_bonus.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[2116] = {item_id:2116, nshort:'lifejuice', name:'Живительный сок', type:'yield', level:0, price:0, image:'/images/items/yield/lifejuice.png?1', image_mini:'images/items/yield/lifejuice.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2117] = {item_id:2117, nshort:'liquidlife', name:'Живая вода', type:'yield', level:0, price:0, image:'/images/items/yield/liquidlife.png?1', image_mini:'images/items/yield/liquidlife.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2118] = {item_id:2118, nshort:'very_low_detail_work_manual', name:'Записки Сэма Бреннена', type:'yield', level:10, price:0, image:'/images/items/yield/very_low_detail_work_manual.png?1', image_mini:'images/items/yield/very_low_detail_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2119] = {item_id:2119, nshort:'weak_very_low_fort_damage', name:'Жирное масло', type:'yield', level:0, price:0, image:'/images/items/yield/weak_very_low_fort_damage.png?1', image_mini:'images/items/yield/weak_very_low_fort_damage.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[2121] = {item_id:2121, nshort:'weak_very_low_fort_bonus', name:'Улучшенный прицел', type:'yield', level:0, price:0, image:'/images/items/yield/weak_very_low_fort_bonus.png?1', image_mini:'images/items/yield/weak_very_low_fort_bonus.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[2126] = {item_id:2126, nshort:'very_low_work_manual', name:'Записки Джеймса Маршалла', type:'yield', level:10, price:0, image:'/images/items/yield/very_low_work_manual.png?1', image_mini:'images/items/yield/very_low_work_manual.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[2128] = {item_id:2128, nshort:'coffee', name:'Кофе', type:'yield', level:0, price:0, image:'/images/items/yield/coffee.png?1', image_mini:'images/items/yield/coffee.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2129] = {item_id:2129, nshort:'guarana', name:'Гуарана', type:'yield', level:0, price:0, image:'/images/items/yield/guarana.png?1', image_mini:'images/items/yield/guarana.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2130] = {item_id:2130, nshort:'mate_tea', name:'Чай мате', type:'yield', level:0, price:0, image:'/images/items/yield/mate_tea.png?1', image_mini:'images/items/yield/mate_tea.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[2135] = {item_id:2135, nshort:'weak_fast_movement', name:'Порошок скорости', type:'yield', level:0, price:0, image:'/images/items/yield/weak_fast_movement.png?1', image_mini:'images/items/yield/weak_fast_movement.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2136] = {item_id:2136, nshort:'yellow_letter', name:'Зелёное письмо', type:'yield', level:0, price:0, image:'/images/items/yield/yellow_letter.png?1', image_mini:'images/items/yield/yellow_letter.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2137] = {item_id:2137, nshort:'red_letter', name:'Красное письмо', type:'yield', level:0, price:0, image:'/images/items/yield/red_letter.png?1', image_mini:'images/items/yield/red_letter.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[2144] = {item_id:2144, nshort:'bunny_egg', name:'Яйцо пасхального зайца', type:'yield', level:0, price:0, image:'/images/items/yield/bunny_egg.png?1', image_mini:'images/items/yield/bunny_egg.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2145] = {item_id:2145, nshort:'fitzburn_recommendation', name:'Рекомендательное письмо', type:'yield', level:0, price:0, image:'/images/items/yield/fitzburn_recommendation.png?1', image_mini:'images/items/yield/fitzburn_recommendation.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2146] = {item_id:2146, nshort:'bible_quote', name:'Записка', type:'yield', level:0, price:0, image:'/images/items/yield/bible_quote.png?1', image_mini:'images/items/yield/bible_quote.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2147] = {item_id:2147, nshort:'small_powder_box', name:'Жестянка с порошком', type:'yield', level:0, price:0, image:'/images/items/yield/small_powder_box.png?1', image_mini:'images/items/yield/small_powder_box.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[2148] = {item_id:2148, nshort:'letter_to_seaver', name:'Письмо отцу Сиверу', type:'yield', level:0, price:0, image:'/images/items/yield/letter_to_seaver.png?1', image_mini:'images/items/yield/letter_to_seaver.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

PK_S3.items[10000] = {item_id:10000, nshort:'shredded_grey', name:'Серые рваные штаны', type:'pants', level:1, price:10, image:'/images/items/pants/shredded_grey.png?1', image_mini:'/images/items/pants/mini/shredded_grey.png?1', bonus:{skills:{ride:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10001] = {item_id:10001, nshort:'shredded_yellow', name:'Жёлтые рваные штаны', type:'pants', level:1, price:35, image:'/images/items/pants/shredded_yellow.png?1', image_mini:'/images/items/pants/mini/shredded_yellow.png?1', bonus:{skills:{tactic:1, leadership:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[10002] = {item_id:10002, nshort:'shredded_blue', name:'Синие рваные штаны', type:'pants', level:2, price:55, image:'/images/items/pants/shredded_blue.png?1', image_mini:'/images/items/pants/mini/shredded_blue.png?1', bonus:{skills:{animal:2, ride:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10003] = {item_id:10003, nshort:'shredded_green', name:'Зелёные рваные штаны', type:'pants', level:2, price:65, image:'/images/items/pants/shredded_green.png?1', image_mini:'/images/items/pants/mini/shredded_green.png?1', bonus:{skills:{swim:1, punch:2, build:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10004] = {item_id:10004, nshort:'shredded_brown', name:'Коричневые рваные штаны', type:'pants', level:3, price:95, image:'/images/items/pants/shredded_brown.png?1', image_mini:'/images/items/pants/mini/shredded_brown.png?1', bonus:{skills:{appearance:1, leadership:1}, attributes:{charisma:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[10005] = {item_id:10005, nshort:'shredded_black', name:'Чёрные рваные штаны', type:'pants', level:3, price:95, image:'/images/items/pants/shredded_black.png?1', image_mini:'/images/items/pants/mini/shredded_black.png?1', bonus:{skills:{pitfall:1, endurance:1}, attributes:{strength:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10006] = {item_id:10006, nshort:'shredded_p1', name:'Знатные рваные штаны', type:'pants', level:4, price:290, image:'/images/items/pants/shredded_p1.png?1', image_mini:'/images/items/pants/mini/shredded_p1.png?1', bonus:{skills:{hide:1, reflex:1, ride:3}, attributes:{flexibility:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10007] = {item_id:10007, nshort:'shredded_fine', name:'Рваные штаны Джима', type:'pants', level:6, price:420, image:'/images/items/pants/shredded_fine.png?1', image_mini:'/images/items/pants/mini/shredded_fine.png?1', bonus:{skills:{repair:3, finger_dexterity:3, endurance:3, build:6}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10010] = {item_id:10010, nshort:'shorts_grey', name:'Серые шорты', type:'pants', level:7, price:232, image:'/images/items/pants/shorts_grey.png?1', image_mini:'/images/items/pants/mini/shorts_grey.png?1', bonus:{skills:{tactic:3, swim:3, ride:4}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10011] = {item_id:10011, nshort:'shorts_yellow', name:'Жёлтые шорты', type:'pants', level:8, price:430, image:'/images/items/pants/shorts_yellow.png?1', image_mini:'/images/items/pants/mini/shorts_yellow.png?1', bonus:{skills:{leadership:5, hide:7}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10012] = {item_id:10012, nshort:'shorts_blue', name:'Синие шорты', type:'pants', level:8, price:430, image:'/images/items/pants/shorts_blue.png?1', image_mini:'/images/items/pants/mini/shorts_blue.png?1', bonus:{skills:{animal:6, trade:2, ride:5}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10013] = {item_id:10013, nshort:'shorts_green', name:'Зелёные шорты', type:'pants', level:8, price:430, image:'/images/items/pants/shorts_green.png?1', image_mini:'/images/items/pants/mini/shorts_green.png?1', bonus:{skills:{repair:5, punch:4, build:5}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10014] = {item_id:10014, nshort:'shorts_brown', name:'Коричневые шорты', type:'pants', level:9, price:470, image:'/images/items/pants/shorts_brown.png?1', image_mini:'/images/items/pants/mini/shorts_brown.png?1', bonus:{skills:{pitfall:5, shot:3, endurance:3}, attributes:{strength:1}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10015] = {item_id:10015, nshort:'shorts_black', name:'Чёрные шорты', type:'pants', level:9, price:480, image:'/images/items/pants/shorts_black.png?1', image_mini:'/images/items/pants/mini/shorts_black.png?1', bonus:{skills:{trade:4, leadership:6}, attributes:{charisma:1}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10016] = {item_id:10016, nshort:'shorts_p1', name:'Знатные шорты', type:'pants', level:10, price:1280, image:'/images/items/pants/shorts_p1.png?1', image_mini:'/images/items/pants/mini/shorts_p1.png?1', bonus:{skills:{appearance:6, finger_dexterity:8, reflex:5, tough:4}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10017] = {item_id:10017, nshort:'shorts_fine', name:'Шорты Фрэнка Батлера', type:'pants', level:12, price:1460, image:'/images/items/pants/shorts_fine.png?1', image_mini:'/images/items/pants/mini/shorts_fine.png?1', bonus:{skills:{shot:8, aim:7, dodge:7, health:6}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10020] = {item_id:10020, nshort:'puritan_grey', name:'Серые прямые штаны', type:'pants', level:12, price:360, image:'/images/items/pants/puritan_grey.png?1', image_mini:'/images/items/pants/mini/puritan_grey.png?1', bonus:{skills:{hide:2, ride:5, punch:4}, attributes:{strength:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10021] = {item_id:10021, nshort:'puritan_yellow', name:'Жёлтые прямые штаны', type:'pants', level:13, price:600, image:'/images/items/pants/puritan_yellow.png?1', image_mini:'/images/items/pants/mini/puritan_yellow.png?1', bonus:{skills:{hide:6, reflex:5}, attributes:{dexterity:1, flexibility:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10022] = {item_id:10022, nshort:'puritan_blue', name:'Синие прямые штаны', type:'pants', level:13, price:640, image:'/images/items/pants/puritan_blue.png?1', image_mini:'/images/items/pants/mini/puritan_blue.png?1', bonus:{skills:{pitfall:4, swim:10}, attributes:{strength:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10023] = {item_id:10023, nshort:'puritan_green', name:'Зелёные прямые штаны', type:'pants', level:13, price:630, image:'/images/items/pants/puritan_green.png?1', image_mini:'/images/items/pants/mini/puritan_green.png?1', bonus:{skills:{leadership:7, endurance:5, build:8}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10024] = {item_id:10024, nshort:'puritan_brown', name:'Коричневые прямые штаны', type:'pants', level:14, price:650, image:'/images/items/pants/puritan_brown.png?1', image_mini:'/images/items/pants/mini/puritan_brown.png?1', bonus:{skills:{tactic:8, finger_dexterity:7, tough:6}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10025] = {item_id:10025, nshort:'puritan_black', name:'Чёрные прямые штаны', type:'pants', level:14, price:670, image:'/images/items/pants/puritan_black.png?1', image_mini:'/images/items/pants/mini/puritan_black.png?1', bonus:{skills:{animal:9, trade:5, shot:7}}, set:{key:'set_farmer', name:'Набор фермера'}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10026] = {item_id:10026, nshort:'puritan_p1', name:'Знатные прямые штаны', type:'pants', level:15, price:1680, image:'/images/items/pants/puritan_p1.png?1', image_mini:'/images/items/pants/mini/puritan_p1.png?1', bonus:{skills:{pitfall:5, reflex:9}, attributes:{dexterity:1, strength:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10027] = {item_id:10027, nshort:'puritan_fine', name:'Прямые штаны Гека Финна', type:'pants', level:16, price:1800, image:'/images/items/pants/puritan_fine.png?1', image_mini:'/images/items/pants/mini/puritan_fine.png?1', bonus:{skills:{repair:6, finger_dexterity:6, swim:8, build:12}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10030] = {item_id:10030, nshort:'shortscheck_grey', name:'Серые бриджи', type:'pants', level:16, price:610, image:'/images/items/pants/shortscheck_grey.png?1', image_mini:'/images/items/pants/mini/shortscheck_grey.png?1', bonus:{skills:{endurance:10, punch:7}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10031] = {item_id:10031, nshort:'shortscheck_yellow', name:'Жёлтые бриджи', type:'pants', level:17, price:1520, image:'/images/items/pants/shortscheck_yellow.png?1', image_mini:'/images/items/pants/mini/shortscheck_yellow.png?1', bonus:{skills:{repair:10, pitfall:8}, attributes:{dexterity:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10032] = {item_id:10032, nshort:'shortscheck_blue', name:'Синие бриджи', type:'pants', level:17, price:1560, image:'/images/items/pants/shortscheck_blue.png?1', image_mini:'/images/items/pants/mini/shortscheck_blue.png?1', bonus:{attributes:{charisma:2, dexterity:3, flexibility:1, strength:3}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10033] = {item_id:10033, nshort:'shortscheck_green', name:'Зелёные бриджи', type:'pants', level:17, price:1520, image:'/images/items/pants/shortscheck_green.png?1', image_mini:'/images/items/pants/mini/shortscheck_green.png?1', bonus:{skills:{hide:10, tough:8}, attributes:{charisma:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10034] = {item_id:10034, nshort:'shortscheck_brown', name:'Коричневые бриджи', type:'pants', level:18, price:1620, image:'/images/items/pants/shortscheck_brown.png?1', image_mini:'/images/items/pants/mini/shortscheck_brown.png?1', bonus:{skills:{shot:10, aim:7, dodge:9}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10035] = {item_id:10035, nshort:'shortscheck_black', name:'Чёрные бриджи', type:'pants', level:18, price:1660, image:'/images/items/pants/shortscheck_black.png?1', image_mini:'/images/items/pants/mini/shortscheck_black.png?1', bonus:{skills:{appearance:9, trade:10, tactic:8}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10036] = {item_id:10036, nshort:'shortscheck_p1', name:'Знатные бриджи', type:'pants', level:19, price:2880, image:'/images/items/pants/shortscheck_p1.png?1', image_mini:'/images/items/pants/mini/shortscheck_p1.png?1', bonus:{skills:{repair:10, finger_dexterity:10, pitfall:9, shot:8}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10037] = {item_id:10037, nshort:'shortscheck_fine', name:'Бриджи Вашингтона Ирвинга', type:'pants', level:20, price:3120, image:'/images/items/pants/shortscheck_fine.png?1', image_mini:'/images/items/pants/mini/shortscheck_fine.png?1', bonus:{skills:{leadership:8, swim:10, reflex:9, ride:12}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10040] = {item_id:10040, nshort:'check_grey', name:'Серые клетчатые штаны', type:'pants', level:20, price:690, image:'/images/items/pants/check_grey.png?1', image_mini:'/images/items/pants/mini/check_grey.png?1', bonus:{skills:{hide:8, reflex:5, endurance:5}, attributes:{strength:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10041] = {item_id:10041, nshort:'check_yellow', name:'Жёлтые клетчатые штаны', type:'pants', level:21, price:1720, image:'/images/items/pants/check_yellow.png?1', image_mini:'/images/items/pants/mini/check_yellow.png?1', bonus:{skills:{tough:7, punch:8}, attributes:{dexterity:2, strength:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10042] = {item_id:10042, nshort:'check_blue', name:'Синие клетчатые штаны', type:'pants', level:21, price:1760, image:'/images/items/pants/check_blue.png?1', image_mini:'/images/items/pants/mini/check_blue.png?1', bonus:{skills:{pitfall:8, swim:6, build:10}, attributes:{flexibility:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10043] = {item_id:10043, nshort:'check_green', name:'Зелёные клетчатые штаны', type:'pants', level:21, price:1780, image:'/images/items/pants/check_green.png?1', image_mini:'/images/items/pants/mini/check_green.png?1', bonus:{skills:{appearance:7, health:8, punch:6}, attributes:{strength:2}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10044] = {item_id:10044, nshort:'check_brown', name:'Коричневые клетчатые штаны', type:'pants', level:22, price:1840, image:'/images/items/pants/check_brown.png?1', image_mini:'/images/items/pants/mini/check_brown.png?1', bonus:{skills:{shot:8, hide:6, ride:8}, attributes:{flexibility:2}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10045] = {item_id:10045, nshort:'check_black', name:'Чёрные клетчатые штаны', type:'pants', level:22, price:1880, image:'/images/items/pants/check_black.png?1', image_mini:'/images/items/pants/mini/check_black.png?1', bonus:{skills:{repair:10, finger_dexterity:10}, attributes:{flexibility:2}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10046] = {item_id:10046, nshort:'check_p1', name:'Знатные клетчатые штаны', type:'pants', level:24, price:3540, image:'/images/items/pants/check_p1.png?1', image_mini:'/images/items/pants/mini/check_p1.png?1', bonus:{skills:{appearance:12, animal:10, trade:12, tactic:12}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10047] = {item_id:10047, nshort:'check_fine', name:'Клетчатые штаны Анни Окли', type:'pants', level:25, price:3630, image:'/images/items/pants/check_fine.png?1', image_mini:'/images/items/pants/mini/check_fine.png?1', bonus:{skills:{shot:12, aim:14, dodge:10, health:9}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10050] = {item_id:10050, nshort:'fur_grey', name:'Серые меховые штаны', type:'pants', level:25, price:1230, image:'/images/items/pants/fur_grey.png?1', image_mini:'/images/items/pants/mini/fur_grey.png?1', bonus:{skills:{shot:7, hide:8, reflex:8}, attributes:{dexterity:1}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10051] = {item_id:10051, nshort:'fur_yellow', name:'Жёлтые меховые штаны', type:'pants', level:26, price:3000, image:'/images/items/pants/fur_yellow.png?1', image_mini:'/images/items/pants/mini/fur_yellow.png?1', bonus:{skills:{endurance:8, punch:8, build:9}, attributes:{strength:2}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10052] = {item_id:10052, nshort:'fur_blue', name:'Синие меховые штаны', type:'pants', level:26, price:3060, image:'/images/items/pants/fur_blue.png?1', image_mini:'/images/items/pants/mini/fur_blue.png?1', bonus:{skills:{animal:8, pitfall:14, hide:10}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10053] = {item_id:10053, nshort:'fur_green', name:'Зелёные меховые штаны', type:'pants', level:26, price:3000, image:'/images/items/pants/fur_green.png?1', image_mini:'/images/items/pants/mini/fur_green.png?1', bonus:{skills:{appearance:16}, attributes:{charisma:3}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10054] = {item_id:10054, nshort:'fur_brown', name:'Коричневые меховые штаны', type:'pants', level:27, price:3090, image:'/images/items/pants/fur_brown.png?1', image_mini:'/images/items/pants/mini/fur_brown.png?1', bonus:{skills:{tactic:14, leadership:11, finger_dexterity:7}}, set:{key:'set_mexican', name:'Набор мексиканца'}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10055] = {item_id:10055, nshort:'fur_black', name:'Чёрные меховые штаны', type:'pants', level:27, price:3120, image:'/images/items/pants/fur_black.png?1', image_mini:'/images/items/pants/mini/fur_black.png?1', bonus:{skills:{trade:17, endurance:12}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10056] = {item_id:10056, nshort:'fur_p1', name:'Знатные меховые штаны', type:'pants', level:30, price:4725, image:'/images/items/pants/fur_p1.png?1', image_mini:'/images/items/pants/mini/fur_p1.png?1', bonus:{skills:{repair:10, swim:15, ride:15, tough:10}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10057] = {item_id:10057, nshort:'fur_fine', name:'Шайеннские меховые штаны', type:'pants', level:32, price:5075, image:'/images/items/pants/fur_fine.png?1', image_mini:'/images/items/pants/mini/fur_fine.png?1', bonus:{skills:{shot:19, dodge:15}, attributes:{charisma:2}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10060] = {item_id:10060, nshort:'dungarees_grey', name:'Серый комбинезон', type:'pants', level:31, price:1395, image:'/images/items/pants/dungarees_grey.png?1', image_mini:'/images/items/pants/mini/dungarees_grey.png?1', bonus:{skills:{pitfall:15}, attributes:{dexterity:2, strength:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10061] = {item_id:10061, nshort:'dungarees_yellow', name:'Жёлтый комбинезон', type:'pants', level:32, price:3360, image:'/images/items/pants/dungarees_yellow.png?1', image_mini:'/images/items/pants/mini/dungarees_yellow.png?1', bonus:{skills:{repair:12, finger_dexterity:10, reflex:14}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10062] = {item_id:10062, nshort:'dungarees_blue', name:'Синий комбинезон', type:'pants', level:32, price:3420, image:'/images/items/pants/dungarees_blue.png?1', image_mini:'/images/items/pants/mini/dungarees_blue.png?1', bonus:{skills:{ride:15, punch:9, build:12}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10063] = {item_id:10063, nshort:'dungarees_green', name:'Зелёный комбинезон', type:'pants', level:32, price:3420, image:'/images/items/pants/dungarees_green.png?1', image_mini:'/images/items/pants/mini/dungarees_green.png?1', bonus:{skills:{swim:14, endurance:12, tough:11}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10064] = {item_id:10064, nshort:'dungarees_brown', name:'Коричневый комбинезон', type:'pants', level:33, price:3510, image:'/images/items/pants/dungarees_brown.png?1', image_mini:'/images/items/pants/mini/dungarees_brown.png?1', bonus:{skills:{shot:15, hide:15}, attributes:{dexterity:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10065] = {item_id:10065, nshort:'dungarees_black', name:'Чёрный комбинезон', type:'pants', level:33, price:3540, image:'/images/items/pants/dungarees_black.png?1', image_mini:'/images/items/pants/mini/dungarees_black.png?1', bonus:{skills:{trade:14, tactic:10, leadership:14}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10066] = {item_id:10066, nshort:'dungarees_p1', name:'Знатный комбинезон', type:'pants', level:35, price:5250, image:'/images/items/pants/dungarees_p1.png?1', image_mini:'/images/items/pants/mini/dungarees_p1.png?1', bonus:{skills:{appearance:15, animal:15}, attributes:{charisma:3, dexterity:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10067] = {item_id:10067, nshort:'dungarees_fine', name:'Комбинезон Боба-строителя', type:'pants', level:38, price:5775, image:'/images/items/pants/dungarees_fine.png?1', image_mini:'/images/items/pants/mini/dungarees_fine.png?1', bonus:{skills:{endurance:17, punch:17, build:17}, attributes:{strength:1}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10070] = {item_id:10070, nshort:'fine_grey', name:'Серые холщовые штаны', type:'pants', level:37, price:1470, image:'/images/items/pants/fine_grey.png?1', image_mini:'/images/items/pants/mini/fine_grey.png?1', bonus:{skills:{trade:10, leadership:11}, attributes:{charisma:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10071] = {item_id:10071, nshort:'fine_yellow', name:'Жёлтые холщовые штаны', type:'pants', level:38, price:3600, image:'/images/items/pants/fine_yellow.png?1', image_mini:'/images/items/pants/mini/fine_yellow.png?1', bonus:{skills:{animal:19, pitfall:7, ride:10}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10072] = {item_id:10072, nshort:'fine_blue', name:'Синие холщовые штаны', type:'pants', level:38, price:3570, image:'/images/items/pants/fine_blue.png?1', image_mini:'/images/items/pants/mini/fine_blue.png?1', bonus:{skills:{repair:7, swim:15, hide:15}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10073] = {item_id:10073, nshort:'fine_green', name:'Зелёные холщовые штаны', type:'pants', level:38, price:3570, image:'/images/items/pants/fine_green.png?1', image_mini:'/images/items/pants/mini/fine_green.png?1', bonus:{skills:{appearance:17, tactic:17}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10074] = {item_id:10074, nshort:'fine_brown', name:'Коричневые холщовые штаны', type:'pants', level:40, price:3630, image:'/images/items/pants/fine_brown.png?1', image_mini:'/images/items/pants/mini/fine_brown.png?1', bonus:{skills:{reflex:19}, attributes:{dexterity:3, flexibility:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10075] = {item_id:10075, nshort:'fine_black', name:'Чёрные холщовые штаны', type:'pants', level:40, price:3450, image:'/images/items/pants/fine_black.png?1', image_mini:'/images/items/pants/mini/fine_black.png?1', bonus:{skills:{dodge:9, health:8, endurance:15}, attributes:{strength:1}}, set:{key:'set_gentleman', name:'Набор джентльмена'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10076] = {item_id:10076, nshort:'fine_p1', name:'Знатные холщовые штаны', type:'pants', level:45, price:5775, image:'/images/items/pants/fine_p1.png?1', image_mini:'/images/items/pants/mini/fine_p1.png?1', bonus:{skills:{finger_dexterity:12, shot:12, tough:15, punch:12}, attributes:{dexterity:1, strength:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10077] = {item_id:10077, nshort:'fine_fine', name:'Холщовые штаны Бэта Мастерсона', type:'pants', level:48, price:6300, image:'/images/items/pants/fine_fine.png?1', image_mini:'/images/items/pants/mini/fine_fine.png?1', bonus:{skills:{pitfall:18, hide:18}, attributes:{dexterity:3, flexibility:2}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10080] = {item_id:10080, nshort:'breeches_grey', name:'Серые брюки', type:'pants', level:41, price:2020, image:'/images/items/pants/breeches_grey.png?1', image_mini:'/images/items/pants/mini/breeches_grey.png?1', bonus:{skills:{finger_dexterity:7, pitfall:14}, attributes:{flexibility:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10081] = {item_id:10081, nshort:'breeches_yellow', name:'Жёлтые брюки', type:'pants', level:42, price:5000, image:'/images/items/pants/breeches_yellow.png?1', image_mini:'/images/items/pants/mini/breeches_yellow.png?1', bonus:{skills:{leadership:12, repair:17}, attributes:{charisma:1, dexterity:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10082] = {item_id:10082, nshort:'breeches_blue', name:'Синие брюки', type:'pants', level:42, price:5040, image:'/images/items/pants/breeches_blue.png?1', image_mini:'/images/items/pants/mini/breeches_blue.png?1', bonus:{skills:{appearance:9, trade:12, tactic:12}, attributes:{flexibility:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10083] = {item_id:10083, nshort:'breeches_green', name:'Зелёные брюки', type:'pants', level:42, price:5040, image:'/images/items/pants/breeches_green.png?1', image_mini:'/images/items/pants/mini/breeches_green.png?1', bonus:{skills:{endurance:11, tough:6, punch:12}, attributes:{charisma:1, strength:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10084] = {item_id:10084, nshort:'breeches_brown', name:'Коричневые брюки', type:'pants', level:44, price:5240, image:'/images/items/pants/breeches_brown.png?1', image_mini:'/images/items/pants/mini/breeches_brown.png?1', bonus:{skills:{repair:14, finger_dexterity:6, shot:10}, attributes:{dexterity:2, flexibility:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10085] = {item_id:10085, nshort:'breeches_black', name:'Чёрные брюки', type:'pants', level:44, price:5240, image:'/images/items/pants/breeches_black.png?1', image_mini:'/images/items/pants/mini/breeches_black.png?1', bonus:{skills:{hide:14, reflex:14}, attributes:{dexterity:1, flexibility:2}}, set:{key:'set_quackery', name:'Набор знахаря'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10086] = {item_id:10086, nshort:'breeches_p1', name:'Знатные брюки', type:'pants', level:50, price:7965, image:'/images/items/pants/breeches_p1.png?1', image_mini:'/images/items/pants/mini/breeches_p1.png?1', bonus:{skills:{animal:15, ride:15, build:15}, attributes:{charisma:2, strength:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10087] = {item_id:10087, nshort:'breeches_fine', name:'Брюки Гармоники', type:'pants', level:52, price:8100, image:'/images/items/pants/breeches_fine.png?1', image_mini:'/images/items/pants/mini/breeches_fine.png?1', bonus:{skills:{shot:15, aim:10, dodge:18, health:10}, attributes:{charisma:1, dexterity:2}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10090] = {item_id:10090, nshort:'indian_grey', name:'Серые индейские штаны', type:'pants', level:51, price:3330, image:'/images/items/pants/indian_grey.png?1', image_mini:'/images/items/pants/mini/indian_grey.png?1', bonus:{skills:{tough:5, build:15}, attributes:{strength:3}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10091] = {item_id:10091, nshort:'indian_yellow', name:'Жёлтые индейские штаны', type:'pants', level:52, price:7000, image:'/images/items/pants/indian_yellow.png?1', image_mini:'/images/items/pants/mini/indian_yellow.png?1', bonus:{skills:{endurance:14, punch:14}, attributes:{dexterity:2, strength:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10092] = {item_id:10092, nshort:'indian_blue', name:'Синие индейские штаны', type:'pants', level:52, price:7000, image:'/images/items/pants/indian_blue.png?1', image_mini:'/images/items/pants/mini/indian_blue.png?1', bonus:{skills:{repair:12, finger_dexterity:14, pitfall:12}, attributes:{flexibility:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10093] = {item_id:10093, nshort:'indian_green', name:'Зелёные индейские штаны', type:'pants', level:52, price:7000, image:'/images/items/pants/indian_green.png?1', image_mini:'/images/items/pants/mini/indian_green.png?1', bonus:{skills:{swim:20, hide:12, reflex:12}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10094] = {item_id:10094, nshort:'indian_brown', name:'Коричневые индейские штаны', type:'pants', level:55, price:7150, image:'/images/items/pants/indian_brown.png?1', image_mini:'/images/items/pants/mini/indian_brown.png?1', bonus:{skills:{shot:15, dodge:10, health:10}, attributes:{dexterity:2, flexibility:1}}, set:{key:'set_indian', name:'Набор индейца'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10095] = {item_id:10095, nshort:'indian_black', name:'Чёрные индейские штаны', type:'pants', level:55, price:7300, image:'/images/items/pants/indian_black.png?1', image_mini:'/images/items/pants/mini/indian_black.png?1', bonus:{skills:{animal:10, tactic:14, ride:15}, attributes:{charisma:2}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10096] = {item_id:10096, nshort:'indian_p1', name:'Знатные индейские штаны', type:'pants', level:60, price:11100, image:'/images/items/pants/indian_p1.png?1', image_mini:'/images/items/pants/mini/indian_p1.png?1', bonus:{skills:{appearance:17, trade:15, leadership:17}, attributes:{charisma:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10097] = {item_id:10097, nshort:'indian_fine', name:'Штаны Сакагавеи', type:'pants', level:70, price:13320, image:'/images/items/pants/indian_fine.png?1', image_mini:'/images/items/pants/mini/indian_fine.png?1', bonus:{skills:{animal:18, pitfall:18, hide:18, ride:18}, attributes:{dexterity:2, flexibility:2}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10100] = {item_id:10100, nshort:'chapsrough_grey', name:'Серые чапсы', type:'pants', level:54, price:4095, image:'/images/items/pants/chapsrough_grey.png?1', image_mini:'/images/items/pants/mini/chapsrough_grey.png?1', bonus:{skills:{tough:15, punch:15}, attributes:{strength:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10101] = {item_id:10101, nshort:'chapsrough_yellow', name:'Жёлтые чапсы', type:'pants', level:56, price:8085, image:'/images/items/pants/chapsrough_yellow.png?1', image_mini:'/images/items/pants/mini/chapsrough_yellow.png?1', bonus:{skills:{aim:15, health:18, punch:15}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10102] = {item_id:10102, nshort:'chapsrough_blue', name:'Синие чапсы', type:'pants', level:56, price:8085, image:'/images/items/pants/chapsrough_blue.png?1', image_mini:'/images/items/pants/mini/chapsrough_blue.png?1', bonus:{skills:{repair:17, endurance:14, build:17}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10103] = {item_id:10103, nshort:'chapsrough_green', name:'Зелёные чапсы', type:'pants', level:56, price:8085, image:'/images/items/pants/chapsrough_green.png?1', image_mini:'/images/items/pants/mini/chapsrough_green.png?1', bonus:{skills:{animal:15, pitfall:15}, attributes:{charisma:2, dexterity:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10104] = {item_id:10104, nshort:'chapsrough_brown', name:'Коричневые чапсы', type:'pants', level:59, price:8470, image:'/images/items/pants/chapsrough_brown.png?1', image_mini:'/images/items/pants/mini/chapsrough_brown.png?1', bonus:{skills:{finger_dexterity:14, hide:14, ride:15}, attributes:{flexibility:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10105] = {item_id:10105, nshort:'chapsrough_black', name:'Чёрные чапсы', type:'pants', level:59, price:8470, image:'/images/items/pants/chapsrough_black.png?1', image_mini:'/images/items/pants/mini/chapsrough_black.png?1', bonus:{skills:{appearance:14, trade:14, shot:15}, attributes:{charisma:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10106] = {item_id:10106, nshort:'chapsrough_p1', name:'Знатные чапсы', type:'pants', level:65, price:12610, image:'/images/items/pants/chapsrough_p1.png?1', image_mini:'/images/items/pants/mini/chapsrough_p1.png?1', bonus:{skills:{tactic:17, leadership:17, swim:13, reflex:13}, attributes:{strength:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10107] = {item_id:10107, nshort:'chapsrough_fine', name:'Чапсы Билли Кида', type:'pants', level:66, price:13195, image:'/images/items/pants/chapsrough_fine.png?1', image_mini:'/images/items/pants/mini/chapsrough_fine.png?1', bonus:{skills:{dodge:20, health:20}, attributes:{charisma:3, dexterity:3}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true}; 

    PK_S3.items[10110] = {item_id:10110, nshort:'cavalry_grey', name:'Серые солдатские штаны', type:'pants', level:61, price:5160, image:'/images/items/pants/cavalry_grey.png?1', image_mini:'/images/items/pants/mini/cavalry_grey.png?1', bonus:{skills:{animal:15, swim:12, reflex:15}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10111] = {item_id:10111, nshort:'cavalry_yellow', name:'Жёлтые солдатские штаны', type:'pants', level:63, price:9660, image:'/images/items/pants/cavalry_yellow.png?1', image_mini:'/images/items/pants/mini/cavalry_yellow.png?1', bonus:{skills:{shot:19, ride:20}, attributes:{dexterity:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10112] = {item_id:10112, nshort:'cavalry_blue', name:'Синие солдатские штаны', type:'pants', level:63, price:9600, image:'/images/items/pants/cavalry_blue.png?1', image_mini:'/images/items/pants/mini/cavalry_blue.png?1', bonus:{skills:{pitfall:17, hide:18, endurance:18}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10113] = {item_id:10113, nshort:'cavalry_green', name:'Зелёные солдатские штаны', type:'pants', level:63, price:9540, image:'/images/items/pants/cavalry_green.png?1', image_mini:'/images/items/pants/mini/cavalry_green.png?1', bonus:{skills:{trade:15, leadership:15, finger_dexterity:15}, attributes:{charisma:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10114] = {item_id:10114, nshort:'cavalry_brown', name:'Коричневые солдатские штаны', type:'pants', level:65, price:9720, image:'/images/items/pants/cavalry_brown.png?1', image_mini:'/images/items/pants/mini/cavalry_brown.png?1', bonus:{skills:{tough:18, punch:18}, attributes:{strength:3}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10115] = {item_id:10115, nshort:'cavalry_black', name:'Чёрные солдатские штаны', type:'pants', level:65, price:10020, image:'/images/items/pants/cavalry_black.png?1', image_mini:'/images/items/pants/mini/cavalry_black.png?1', bonus:{skills:{repair:15, build:17}, attributes:{dexterity:2, strength:3}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10116] = {item_id:10116, nshort:'cavalry_p1', name:'Знатные солдатские штаны', type:'pants', level:75, price:15120, image:'/images/items/pants/cavalry_p1.png?1', image_mini:'/images/items/pants/mini/cavalry_p1.png?1', bonus:{skills:{appearance:15, aim:15, dodge:15}, attributes:{charisma:3, dexterity:3, flexibility:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10117] = {item_id:10117, nshort:'cavalry_fine', name:'Солдатские штаны Джорджа Крука', type:'pants', level:85, price:16100, image:'/images/items/pants/cavalry_fine.png?1', image_mini:'/images/items/pants/mini/cavalry_fine.png?1', bonus:{skills:{tactic:23, reflex:15, health:15}, attributes:{charisma:3, strength:3}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10120] = {item_id:10120, nshort:'jeans_grey', name:'Серые джинсы', type:'pants', level:71, price:7590, image:'/images/items/pants/jeans_grey.png?1', image_mini:'/images/items/pants/mini/jeans_grey.png?1', bonus:{skills:{tactic:15, shot:15}, attributes:{charisma:2, dexterity:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10121] = {item_id:10121, nshort:'jeans_yellow', name:'Жёлтые джинсы', type:'pants', level:74, price:11180, image:'/images/items/pants/jeans_yellow.png?1', image_mini:'/images/items/pants/mini/jeans_yellow.png?1', bonus:{skills:{swim:16, endurance:17, punch:16}, attributes:{strength:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10122] = {item_id:10122, nshort:'jeans_blue', name:'Синие джинсы', type:'pants', level:74, price:11180, image:'/images/items/pants/jeans_blue.png?1', image_mini:'/images/items/pants/mini/jeans_blue.png?1', bonus:{skills:{repair:16, tough:16, build:17}, attributes:{flexibility:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10123] = {item_id:10123, nshort:'jeans_green', name:'Зелёные джинсы', type:'pants', level:74, price:11180, image:'/images/items/pants/jeans_green.png?1', image_mini:'/images/items/pants/mini/jeans_green.png?1', bonus:{skills:{pitfall:16, ride:17, health:16}, attributes:{dexterity:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10124] = {item_id:10124, nshort:'jeans_brown', name:'Коричневые джинсы', type:'pants', level:79, price:12350, image:'/images/items/pants/jeans_brown.png?1', image_mini:'/images/items/pants/mini/jeans_brown.png?1', bonus:{skills:{appearance:16, aim:17, dodge:16}, attributes:{charisma:2, dexterity:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10125] = {item_id:10125, nshort:'jeans_black', name:'Чёрные джинсы', type:'pants', level:79, price:12350, image:'/images/items/pants/jeans_black.png?1', image_mini:'/images/items/pants/mini/jeans_black.png?1', bonus:{skills:{tactic:17, leadership:16, finger_dexterity:16}, attributes:{flexibility:2, strength:2}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10126] = {item_id:10126, nshort:'jeans_p1', name:'Знатные джинсы', type:'pants', level:90, price:18900, image:'/images/items/pants/jeans_p1.png?1', image_mini:'/images/items/pants/mini/jeans_p1.png?1', bonus:{skills:{appearance:20, animal:18, trade:20, hide:20}, attributes:{charisma:3, flexibility:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10127] = {item_id:10127, nshort:'jeans_fine', name:'Джинсы Пэта Гаррета', type:'pants', level:99, price:20700, image:'/images/items/pants/jeans_fine.png?1', image_mini:'/images/items/pants/mini/jeans_fine.png?1', bonus:{skills:{repair:22, shot:20, dodge:24, ride:20}, attributes:{dexterity:3, flexibility:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10130] = {item_id:10130, nshort:'leather_grey', name:'Серые кожаные штаны', type:'pants', level:76, price:8880, image:'/images/items/pants/leather_grey.png?1', image_mini:'/images/items/pants/mini/leather_grey.png?1', bonus:{skills:{aim:28}, attributes:{strength:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10131] = {item_id:10131, nshort:'leather_yellow', name:'Жёлтые кожаные штаны', type:'pants', level:80, price:13650, image:'/images/items/pants/leather_yellow.png?1', image_mini:'/images/items/pants/mini/leather_yellow.png?1', bonus:{skills:{health:18, tough:20}, attributes:{strength:4}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10132] = {item_id:10132, nshort:'leather_blue', name:'Синие кожаные штаны', type:'pants', level:80, price:13650, image:'/images/items/pants/leather_blue.png?1', image_mini:'/images/items/pants/mini/leather_blue.png?1', bonus:{skills:{finger_dexterity:18, swim:20}, attributes:{flexibility:4}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10133] = {item_id:10133, nshort:'leather_green', name:'Зелёные кожаные штаны', type:'pants', level:80, price:13650, image:'/images/items/pants/leather_green.png?1', image_mini:'/images/items/pants/mini/leather_green.png?1', bonus:{skills:{reflex:18, build:20}, attributes:{dexterity:4}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10134] = {item_id:10134, nshort:'leather_brown', name:'Коричневые кожаные штаны', type:'pants', level:85, price:14625, image:'/images/items/pants/leather_brown.png?1', image_mini:'/images/items/pants/mini/leather_brown.png?1', bonus:{skills:{aim:17, dodge:17, punch:17}, attributes:{dexterity:2, strength:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10135] = {item_id:10135, nshort:'leather_black', name:'Чёрные кожаные штаны', type:'pants', level:85, price:14625, image:'/images/items/pants/leather_black.png?1', image_mini:'/images/items/pants/mini/leather_black.png?1', bonus:{skills:{pitfall:17, hide:17, endurance:17}, attributes:{dexterity:2, flexibility:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10136] = {item_id:10136, nshort:'leather_p1', name:'Знатные кожаные штаны', type:'pants', level:95, price:20400, image:'/images/items/pants/leather_p1.png?1', image_mini:'/images/items/pants/mini/leather_p1.png?1', bonus:{skills:{animal:20, tactic:20, repair:20}, attributes:{flexibility:4, strength:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10137] = {item_id:10137, nshort:'leather_fine', name:'Кожаные штаны Кочайза', type:'pants', level:100, price:21680, image:'/images/items/pants/leather_fine.png?1', image_mini:'/images/items/pants/mini/leather_fine.png?1', bonus:{skills:{appearance:15, trade:20, leadership:20, shot:16}, attributes:{charisma:4, flexibility:4}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10140] = {item_id:10140, nshort:'chapsfine_grey', name:'Серые мягкие чапсы', type:'pants', level:84, price:11625, image:'/images/items/pants/chapsfine_grey.png?1', image_mini:'/images/items/pants/mini/chapsfine_grey.png?1', bonus:{skills:{finger_dexterity:17, reflex:17}, attributes:{charisma:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10141] = {item_id:10141, nshort:'chapsfine_yellow', name:'Жёлтые мягкие чапсы', type:'pants', level:88, price:16660, image:'/images/items/pants/chapsfine_yellow.png?1', image_mini:'/images/items/pants/mini/chapsfine_yellow.png?1', bonus:{skills:{leadership:20, swim:24, tough:20}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10142] = {item_id:10142, nshort:'chapsfine_blue', name:'Синие мягкие чапсы', type:'pants', level:88, price:17000, image:'/images/items/pants/chapsfine_blue.png?1', image_mini:'/images/items/pants/mini/chapsfine_blue.png?1', bonus:{skills:{aim:26, health:20}, attributes:{flexibility:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10143] = {item_id:10143, nshort:'chapsfine_green', name:'Зелёные мягкие чапсы', type:'pants', level:88, price:17000, image:'/images/items/pants/chapsfine_green.png?1', image_mini:'/images/items/pants/mini/chapsfine_green.png?1', bonus:{skills:{animal:19, trade:20}, attributes:{charisma:3, flexibility:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10144] = {item_id:10144, nshort:'chapsfine_brown', name:'Коричневые мягкие чапсы', type:'pants', level:94, price:18105, image:'/images/items/pants/chapsfine_brown.png?1', image_mini:'/images/items/pants/mini/chapsfine_brown.png?1', bonus:{skills:{appearance:11, punch:20, build:20}, attributes:{charisma:1, flexibility:1, strength:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10145] = {item_id:10145, nshort:'chapsfine_black', name:'Чёрные мягкие чапсы', type:'pants', level:94, price:18360, image:'/images/items/pants/chapsfine_black.png?1', image_mini:'/images/items/pants/mini/chapsfine_black.png?1', bonus:{skills:{trade:15, finger_dexterity:20, swim:13, tough:20}, attributes:{charisma:2, flexibility:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10146] = {item_id:10146, nshort:'chapsfine_p1', name:'Знатные мягкие чапсы', type:'pants', level:99, price:23310, image:'/images/items/pants/chapsfine_p1.png?1', image_mini:'/images/items/pants/mini/chapsfine_p1.png?1', bonus:{skills:{leadership:25, aim:20, dodge:20, ride:20}, attributes:{charisma:1, dexterity:2, flexibility:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10147] = {item_id:10147, nshort:'chapsfine_fine', name:'Мягкие чапсы Буффало Билла', type:'pants', level:110, price:25920, image:'/images/items/pants/chapsfine_fine.png?1', image_mini:'/images/items/pants/mini/chapsfine_fine.png?1', bonus:{skills:{pitfall:18, reflex:20, endurance:20, tough:20}, attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[10148] = {item_id:10148, nshort:'greenhorn_pants', name:'Рейтузы', type:'pants', level:1, price:259, image:'/images/items/pants/greenhorn_pants.png?1', image_mini:'/images/items/pants/mini/greenhorn_pants.png?1', bonus:{skills:{swim:3, ride:3}}, set:{key:'greenhorn_set', name:'Набор чечако'}, sellable:true};
    PK_S3.items[10149] = {item_id:10149, nshort:'undergarn', name:'Пеньюар', type:'pants', level:40, price:3450, image:'/images/items/pants/undergarn.png?1', image_mini:'/images/items/pants/mini/undergarn.png?1', bonus:{skills:{aim:9, hide:15, health:8}, attributes:{charisma:1}}, set:{key:'set_dancer', name:'Набор танцовщицы'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[10150] = {item_id:10150, nshort:'collector_pants', name:'Штаны коллекционера', type:'pants', level:100, price:0, image:'/images/items/pants/collector_pants.png?1', image_mini:'/images/items/pants/mini/collector_pants.png?1', bonus:{skills:{leadership:15, dodge:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Набор коллекционера'}, traderlevel:99, tradeable:true};

PK_S3.items[11000] = {item_id:11000, nshort:'cotton_grey', name:'Серый шерстяной пояс', type:'belt', level:1, price:10, image:'/images/items/belt/cotton_grey.png?1', image_mini:'/images/items/belt/mini/cotton_grey.png?1', bonus:{skills:{endurance:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[11001] = {item_id:11001, nshort:'cotton_yellow', name:'Жёлтый шерстяной пояс', type:'belt', level:2, price:35, image:'/images/items/belt/cotton_yellow.png?1', image_mini:'/images/items/belt/mini/cotton_yellow.png?1', bonus:{skills:{pitfall:1, swim:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[11002] = {item_id:11002, nshort:'cotton_blue', name:'Синий шерстяной пояс', type:'belt', level:3, price:45, image:'/images/items/belt/cotton_blue.png?1', image_mini:'/images/items/belt/mini/cotton_blue.png?1', bonus:{skills:{reflex:1, ride:1, punch:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
PK_S3.items[11003] = {item_id:11003, nshort:'cotton_green', name:'Зелёный шерстяной пояс', type:'belt', level:3, price:45, image:'/images/items/belt/cotton_green.png?1', image_mini:'/images/items/belt/mini/cotton_green.png?1', bonus:{skills:{repair:1, tough:1, build:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11004] = {item_id:11004, nshort:'cotton_brown', name:'Коричневый шерстяной пояс', type:'belt', level:4, price:60, image:'/images/items/belt/cotton_brown.png?1', image_mini:'/images/items/belt/mini/cotton_brown.png?1', bonus:{attributes:{flexibility:1}}, set:{}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11005] = {item_id:11005, nshort:'cotton_black', name:'Чёрный шерстяной пояс', type:'belt', level:4, price:60, image:'/images/items/belt/cotton_black.png?1', image_mini:'/images/items/belt/mini/cotton_black.png?1', bonus:{attributes:{dexterity:1}}, set:{key:'set_farmer', name:'Набор фермера'}, traderlevel:1, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11006] = {item_id:11006, nshort:'cotton_p1', name:'Знатный шерстяной пояс', type:'belt', level:5, price:250, image:'/images/items/belt/cotton_p1.png?1', image_mini:'/images/items/belt/mini/cotton_p1.png?1', bonus:{skills:{appearance:1, aim:1, dodge:2}, attributes:{charisma:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11007] = {item_id:11007, nshort:'cotton_fine', name:'Шерстяной пояс Джона Баттерфилда', type:'belt', level:8, price:390, image:'/images/items/belt/cotton_fine.png?1', image_mini:'/images/items/belt/mini/cotton_fine.png?1', bonus:{skills:{repair:2, build:3}, attributes:{charisma:1, strength:1}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11010] = {item_id:11010, nshort:'check_grey_belt', name:'Серый в клеточку пояс', type:'belt', level:7, price:142, image:'/images/items/belt/check_grey_belt.png?1', image_mini:'/images/items/belt/mini/check_grey_belt.png?1', bonus:{skills:{shot:1, health:1}, attributes:{dexterity:1}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11011] = {item_id:11011, nshort:'check_yellow_belt', name:'Жёлтый в клеточку пояс', type:'belt', level:8, price:290, image:'/images/items/belt/check_yellow_belt.png?1', image_mini:'/images/items/belt/mini/check_yellow_belt.png?1', bonus:{skills:{finger_dexterity:3, hide:1, reflex:1}, attributes:{charisma:1}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11012] = {item_id:11012, nshort:'check_blue_belt', name:'Синий в клеточку пояс', type:'belt', level:9, price:310, image:'/images/items/belt/check_blue_belt.png?1', image_mini:'/images/items/belt/mini/check_blue_belt.png?1', bonus:{skills:{animal:4, swim:3, ride:3}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11013] = {item_id:11013, nshort:'check_green_belt', name:'Зелёный в клеточку пояс', type:'belt', level:10, price:370, image:'/images/items/belt/check_green_belt.png?1', image_mini:'/images/items/belt/mini/check_green_belt.png?1', bonus:{skills:{appearance:3, trade:4}, attributes:{charisma:1}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11014] = {item_id:11014, nshort:'check_brown_belt', name:'Коричневый в клеточку пояс', type:'belt', level:11, price:390, image:'/images/items/belt/check_brown_belt.png?1', image_mini:'/images/items/belt/mini/check_brown_belt.png?1', bonus:{skills:{tactic:5, leadership:6}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11015] = {item_id:11015, nshort:'check_black_belt', name:'Чёрный в клеточку пояс', type:'belt', level:11, price:390, image:'/images/items/belt/check_black_belt.png?1', image_mini:'/images/items/belt/mini/check_black_belt.png?1', bonus:{skills:{pitfall:6, hide:5}}, set:{}, traderlevel:2, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11016] = {item_id:11016, nshort:'check_p1_belt', name:'Знатный пояс в клетку', type:'belt', level:12, price:1160, image:'/images/items/belt/check_p1_belt.png?1', image_mini:'/images/items/belt/mini/check_p1_belt.png?1', bonus:{skills:{aim:6, punch:7}, attributes:{strength:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11017] = {item_id:11017, nshort:'check_fine_belt', name:'Клетчатый пояс Неда Бантлайна', type:'belt', level:15, price:1280, image:'/images/items/belt/check_fine_belt.png?1', image_mini:'/images/items/belt/mini/check_fine_belt.png?1', bonus:{skills:{appearance:3, shot:7, aim:6}, attributes:{dexterity:1}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11020] = {item_id:11020, nshort:'fine_grey_belt', name:'Серый кожаный ремень', type:'belt', level:12, price:210, image:'/images/items/belt/fine_grey_belt.png?1', image_mini:'/images/items/belt/mini/fine_grey_belt.png?1', bonus:{skills:{tough:7}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11021] = {item_id:11021, nshort:'fine_yellow_belt', name:'Жёлтый кожаный ремень', type:'belt', level:14, price:450, image:'/images/items/belt/fine_yellow_belt.png?1', image_mini:'/images/items/belt/mini/fine_yellow_belt.png?1', bonus:{skills:{swim:3, health:5, endurance:6}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11022] = {item_id:11022, nshort:'fine_blue_belt', name:'Синий кожаный ремень', type:'belt', level:14, price:440, image:'/images/items/belt/fine_blue_belt.png?1', image_mini:'/images/items/belt/mini/fine_blue_belt.png?1', bonus:{skills:{dodge:5, reflex:4}, attributes:{dexterity:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11023] = {item_id:11023, nshort:'fine_green_belt', name:'Зелёный кожаный ремень', type:'belt', level:15, price:480, image:'/images/items/belt/fine_green_belt.png?1', image_mini:'/images/items/belt/mini/fine_green_belt.png?1', bonus:{skills:{trade:6, leadership:4}, attributes:{charisma:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11024] = {item_id:11024, nshort:'fine_brown_belt', name:'Коричневый кожаный ремень', type:'belt', level:15, price:480, image:'/images/items/belt/fine_brown_belt.png?1', image_mini:'/images/items/belt/mini/fine_brown_belt.png?1', bonus:{skills:{finger_dexterity:4, shot:6}, attributes:{strength:1}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11025] = {item_id:11025, nshort:'fine_black_belt', name:'Чёрный кожаный ремень', type:'belt', level:17, price:540, image:'/images/items/belt/fine_black_belt.png?1', image_mini:'/images/items/belt/mini/fine_black_belt.png?1', bonus:{skills:{animal:6, tactic:6, ride:6}}, set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11026] = {item_id:11026, nshort:'fine_p1_belt', name:'Знатный кожаный ремень', type:'belt', level:17, price:1300, image:'/images/items/belt/fine_p1_belt.png?1', image_mini:'/images/items/belt/mini/fine_p1_belt.png?1', bonus:{skills:{appearance:6, leadership:7, punch:8}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11027] = {item_id:11027, nshort:'fine_fine_belt', name:'Ремень Томаса Бентона', type:'belt', level:20, price:1620, image:'/images/items/belt/fine_fine_belt.png?1', image_mini:'/images/items/belt/mini/fine_fine_belt.png?1', bonus:{skills:{repair:8, build:9}, attributes:{dexterity:1, strength:1}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11030] = {item_id:11030, nshort:'buckle_grey', name:'Серый пояс с пряжкой', type:'belt', level:18, price:420, image:'/images/items/belt/buckle_grey.png?1', image_mini:'/images/items/belt/mini/buckle_grey.png?1', bonus:{attributes:{dexterity:2, flexibility:2}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11031] = {item_id:11031, nshort:'buckle_yellow', name:'Жёлтый пояс с пряжкой', type:'belt', level:20, price:1160, image:'/images/items/belt/buckle_yellow.png?1', image_mini:'/images/items/belt/mini/buckle_yellow.png?1', bonus:{skills:{repair:7, endurance:6}, attributes:{strength:1}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11032] = {item_id:11032, nshort:'buckle_blue', name:'Синий пояс с пряжкой', type:'belt', level:20, price:1140, image:'/images/items/belt/buckle_blue.png?1', image_mini:'/images/items/belt/mini/buckle_blue.png?1', bonus:{skills:{appearance:9, tactic:7}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11033] = {item_id:11033, nshort:'buckle_green', name:'Зелёный пояс с пряжкой', type:'belt', level:22, price:1340, image:'/images/items/belt/buckle_green.png?1', image_mini:'/images/items/belt/mini/buckle_green.png?1', bonus:{skills:{shot:9, dodge:10}}, set:{}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11034] = {item_id:11034, nshort:'buckle_brown', name:'Коричневый пояс с пряжкой', type:'belt', level:22, price:1340, image:'/images/items/belt/buckle_brown.png?1', image_mini:'/images/items/belt/mini/buckle_brown.png?1', bonus:{skills:{aim:9, punch:10}}, set:{key:'set_pilgrim_male', name:'Набор проповедника'}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11035] = {item_id:11035, nshort:'buckle_black', name:'Чёрный пояс с пряжкой', type:'belt', level:24, price:1520, image:'/images/items/belt/buckle_black.png?1', image_mini:'/images/items/belt/mini/buckle_black.png?1', bonus:{skills:{repair:4, finger_dexterity:10}, attributes:{flexibility:2}}, set:{key:'set_pilgrim_female', name:'Набор монашки'}, traderlevel:4, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11036] = {item_id:11036, nshort:'buckle_p1', name:'Знатный пояс с пряжкой', type:'belt', level:25, price:2700, image:'/images/items/belt/buckle_p1.png?1', image_mini:'/images/items/belt/mini/buckle_p1.png?1', bonus:{skills:{trade:10, tactic:10, reflex:10}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11037] = {item_id:11037, nshort:'buckle_fine', name:'Пояс с пряжкой Чарльза Гуднайта', type:'belt', level:27, price:3000, image:'/images/items/belt/buckle_fine.png?1', image_mini:'/images/items/belt/mini/buckle_fine.png?1', bonus:{skills:{trade:10, leadership:10, tough:10, build:10}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11040] = {item_id:11040, nshort:'bull_grey', name:'Серый пояс с бизоном', type:'belt', level:23, price:490, image:'/images/items/belt/bull_grey.png?1', image_mini:'/images/items/belt/mini/bull_grey.png?1', bonus:{skills:{hide:7, endurance:7}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11041] = {item_id:11041, nshort:'bull_yellow', name:'Жёлтый пояс с бизоном', type:'belt', level:24, price:1360, image:'/images/items/belt/bull_yellow.png?1', image_mini:'/images/items/belt/mini/bull_yellow.png?1', bonus:{skills:{pitfall:14}, attributes:{strength:1}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11042] = {item_id:11042, nshort:'bull_blue', name:'Синий пояс с бизоном', type:'belt', level:24, price:1320, image:'/images/items/belt/bull_blue.png?1', image_mini:'/images/items/belt/mini/bull_blue.png?1', bonus:{skills:{ride:2, build:15}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11043] = {item_id:11043, nshort:'bull_green', name:'Зелёный пояс с бизоном', type:'belt', level:26, price:1400, image:'/images/items/belt/bull_green.png?1', image_mini:'/images/items/belt/mini/bull_green.png?1', bonus:{skills:{appearance:7, animal:8, repair:8}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11044] = {item_id:11044, nshort:'bull_brown', name:'Коричневый пояс с бизоном', type:'belt', level:27, price:1500, image:'/images/items/belt/bull_brown.png?1', image_mini:'/images/items/belt/mini/bull_brown.png?1', bonus:{skills:{leadership:7, health:7, tough:10}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11045] = {item_id:11045, nshort:'bull_black', name:'Чёрный пояс с бизоном', type:'belt', level:27, price:1540, image:'/images/items/belt/bull_black.png?1', image_mini:'/images/items/belt/mini/bull_black.png?1', bonus:{skills:{tactic:7, shot:8}, attributes:{flexibility:2}}, set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11046] = {item_id:11046, nshort:'bull_p1', name:'Знатный пояс с бизоном', type:'belt', level:28, price:2940, image:'/images/items/belt/bull_p1.png?1', image_mini:'/images/items/belt/mini/bull_p1.png?1', bonus:{skills:{appearance:8, trade:8}, attributes:{charisma:2, dexterity:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11047] = {item_id:11047, nshort:'bull_fine', name:'Пояс с бизоном Билла Хикока', type:'belt', level:30, price:3210, image:'/images/items/belt/bull_fine.png?1', image_mini:'/images/items/belt/mini/bull_fine.png?1', bonus:{skills:{animal:5, swim:10, hide:10, ride:10}, attributes:{strength:1}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11050] = {item_id:11050, nshort:'studs_grey', name:'Серый клёпаный ремень', type:'belt', level:27, price:780, image:'/images/items/belt/studs_grey.png?1', image_mini:'/images/items/belt/mini/studs_grey.png?1', bonus:{skills:{reflex:4, health:10}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11051] = {item_id:11051, nshort:'studs_yellow', name:'Жёлтый клёпаный ремень', type:'belt', level:28, price:2220, image:'/images/items/belt/studs_yellow.png?1', image_mini:'/images/items/belt/mini/studs_yellow.png?1', bonus:{skills:{finger_dexterity:11, swim:10}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11052] = {item_id:11052, nshort:'studs_blue', name:'Синий клёпаный ремень', type:'belt', level:28, price:2100, image:'/images/items/belt/studs_blue.png?1', image_mini:'/images/items/belt/mini/studs_blue.png?1', bonus:{skills:{aim:7, dodge:7}, attributes:{dexterity:1, flexibility:1}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11053] = {item_id:11053, nshort:'studs_green', name:'Зелёный клёпаный ремень', type:'belt', level:30, price:2280, image:'/images/items/belt/studs_green.png?1', image_mini:'/images/items/belt/mini/studs_green.png?1', bonus:{skills:{endurance:19}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11054] = {item_id:11054, nshort:'studs_brown', name:'Коричневый клёпаный ремень', type:'belt', level:30, price:2340, image:'/images/items/belt/studs_brown.png?1', image_mini:'/images/items/belt/mini/studs_brown.png?1', bonus:{skills:{tough:10, punch:12}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11055] = {item_id:11055, nshort:'studs_black', name:'Чёрный клёпаный ремень', type:'belt', level:31, price:2430, image:'/images/items/belt/studs_black.png?1', image_mini:'/images/items/belt/mini/studs_black.png?1', bonus:{skills:{reflex:12, ride:11}}, set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11056] = {item_id:11056, nshort:'studs_p1', name:'Знатный клёпаный ремень', type:'belt', level:32, price:3640, image:'/images/items/belt/studs_p1.png?1', image_mini:'/images/items/belt/mini/studs_p1.png?1', bonus:{skills:{animal:12, pitfall:12, hide:10}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11057] = {item_id:11057, nshort:'studs_fine', name:'Клёпаный ремень Сэма Хьюстона', type:'belt', level:35, price:3990, image:'/images/items/belt/studs_fine.png?1', image_mini:'/images/items/belt/mini/studs_fine.png?1', bonus:{skills:{shot:11, aim:11, ride:12, punch:11}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11060] = {item_id:11060, nshort:'horse_grey', name:'Серый пояс с лошадью', type:'belt', level:31, price:840, image:'/images/items/belt/horse_grey.png?1', image_mini:'/images/items/belt/mini/horse_grey.png?1', bonus:{skills:{dodge:8}, attributes:{dexterity:2}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11061] = {item_id:11061, nshort:'horse_yellow', name:'Жёлтый пояс с лошадью', type:'belt', level:33, price:2430, image:'/images/items/belt/horse_yellow.png?1', image_mini:'/images/items/belt/mini/horse_yellow.png?1', bonus:{attributes:{charisma:2, dexterity:3, flexibility:2, strength:3}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11062] = {item_id:11062, nshort:'horse_blue', name:'Синий пояс с лошадью', type:'belt', level:33, price:2370, image:'/images/items/belt/horse_blue.png?1', image_mini:'/images/items/belt/mini/horse_blue.png?1', bonus:{skills:{swim:4}, attributes:{charisma:3, flexibility:3}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11063] = {item_id:11063, nshort:'horse_green', name:'Зелёный пояс с лошадью', type:'belt', level:35, price:2520, image:'/images/items/belt/horse_green.png?1', image_mini:'/images/items/belt/mini/horse_green.png?1', bonus:{skills:{finger_dexterity:9, health:8}, attributes:{charisma:2}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11064] = {item_id:11064, nshort:'horse_brown', name:'Коричневый пояс с лошадью', type:'belt', level:35, price:2520, image:'/images/items/belt/horse_brown.png?1', image_mini:'/images/items/belt/mini/horse_brown.png?1', bonus:{skills:{pitfall:5, hide:6}, attributes:{flexibility:1, strength:3}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11065] = {item_id:11065, nshort:'horse_black', name:'Чёрный пояс с лошадью', type:'belt', level:36, price:2640, image:'/images/items/belt/horse_black.png?1', image_mini:'/images/items/belt/mini/horse_black.png?1', bonus:{skills:{repair:10, swim:9}, attributes:{flexibility:1, strength:1}}, set:{}, traderlevel:7, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11066] = {item_id:11066, nshort:'horse_p1', name:'Знатный пояс с лошадью', type:'belt', level:37, price:3395, image:'/images/items/belt/horse_p1.png?1', image_mini:'/images/items/belt/mini/horse_p1.png?1', bonus:{skills:{tactic:5, leadership:6, tough:12}, attributes:{charisma:1, strength:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11067] = {item_id:11067, nshort:'horse_fine', name:'Пояс Сета Буллока с лошадью', type:'belt', level:40, price:4130, image:'/images/items/belt/horse_fine.png?1', image_mini:'/images/items/belt/mini/horse_fine.png?1', bonus:{skills:{dodge:8, reflex:8, health:9}, attributes:{dexterity:2, strength:2}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11070] = {item_id:11070, nshort:'eagle_grey', name:'Серый пояс с орлом', type:'belt', level:37, price:885, image:'/images/items/belt/eagle_grey.png?1', image_mini:'/images/items/belt/mini/eagle_grey.png?1', bonus:{skills:{animal:5, pitfall:7, build:7}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11071] = {item_id:11071, nshort:'eagle_yellow', name:'Жёлтый пояс с орлом', type:'belt', level:38, price:2310, image:'/images/items/belt/eagle_yellow.png?1', image_mini:'/images/items/belt/mini/eagle_yellow.png?1', bonus:{skills:{hide:11, endurance:11}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11072] = {item_id:11072, nshort:'eagle_blue', name:'Синий пояс с орлом', type:'belt', level:38, price:2460, image:'/images/items/belt/eagle_blue.png?1', image_mini:'/images/items/belt/mini/eagle_blue.png?1', bonus:{skills:{tactic:10, finger_dexterity:13}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11073] = {item_id:11073, nshort:'eagle_green', name:'Зелёный пояс с орлом', type:'belt', level:42, price:2730, image:'/images/items/belt/eagle_green.png?1', image_mini:'/images/items/belt/mini/eagle_green.png?1', bonus:{skills:{leadership:10, repair:10}, attributes:{charisma:1, flexibility:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11074] = {item_id:11074, nshort:'eagle_brown', name:'Коричневый пояс с орлом', type:'belt', level:42, price:2730, image:'/images/items/belt/eagle_brown.png?1', image_mini:'/images/items/belt/mini/eagle_brown.png?1', bonus:{skills:{animal:10, swim:10}, attributes:{charisma:1, flexibility:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11075] = {item_id:11075, nshort:'eagle_black', name:'Чёрный пояс с орлом', type:'belt', level:45, price:2940, image:'/images/items/belt/eagle_black.png?1', image_mini:'/images/items/belt/mini/eagle_black.png?1', bonus:{skills:{appearance:13, trade:12, build:5}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11076] = {item_id:11076, nshort:'eagle_p1', name:'Знатный пояс с орлом', type:'belt', level:45, price:4200, image:'/images/items/belt/eagle_p1.png?1', image_mini:'/images/items/belt/mini/eagle_p1.png?1', bonus:{skills:{aim:10, dodge:10, reflex:10}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11077] = {item_id:11077, nshort:'eagle_fine', name:'Пояс Аля Сверенгена с орлом', type:'belt', level:48, price:4235, image:'/images/items/belt/eagle_fine.png?1', image_mini:'/images/items/belt/mini/eagle_fine.png?1', bonus:{skills:{pitfall:15, shot:8, ride:15}}, set:{key:'set_gentleman', name:'Набор джентльмена'}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11080] = {item_id:11080, nshort:'ammo_grey', name:'Серый патронташ', type:'belt', level:44, price:1300, image:'/images/items/belt/ammo_grey.png?1', image_mini:'/images/items/belt/mini/ammo_grey.png?1', bonus:{skills:{punch:11}, attributes:{dexterity:1, strength:1}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11081] = {item_id:11081, nshort:'ammo_yellow', name:'Жёлтый патронташ', type:'belt', level:47, price:3600, image:'/images/items/belt/ammo_yellow.png?1', image_mini:'/images/items/belt/mini/ammo_yellow.png?1', bonus:{skills:{repair:10, tough:10, build:10}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11082] = {item_id:11082, nshort:'ammo_blue', name:'Синий патронташ', type:'belt', level:47, price:3600, image:'/images/items/belt/ammo_blue.png?1', image_mini:'/images/items/belt/mini/ammo_blue.png?1', bonus:{skills:{leadership:10, finger_dexterity:10, endurance:10}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11083] = {item_id:11083, nshort:'ammo_green', name:'Зелёный патронташ', type:'belt', level:48, price:3600, image:'/images/items/belt/ammo_green.png?1', image_mini:'/images/items/belt/mini/ammo_green.png?1', bonus:{skills:{animal:10, trade:10, tactic:10}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11084] = {item_id:11084, nshort:'ammo_brown', name:'Коричневый патронташ', type:'belt', level:49, price:4000, image:'/images/items/belt/ammo_brown.png?1', image_mini:'/images/items/belt/mini/ammo_brown.png?1', bonus:{skills:{appearance:10, shot:10, hide:10, reflex:10}}, set:{}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11085] = {item_id:11085, nshort:'ammo_black', name:'Чёрный патронташ', type:'belt', level:49, price:4120, image:'/images/items/belt/ammo_black.png?1', image_mini:'/images/items/belt/mini/ammo_black.png?1', bonus:{skills:{swim:10, health:10}, attributes:{dexterity:1, strength:2}}, set:{key:'set_quackery', name:'Набор знахаря'}, traderlevel:8, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11086] = {item_id:11086, nshort:'ammo_p1', name:'Знатный патронташ', type:'belt', level:52, price:5805, image:'/images/items/belt/ammo_p1.png?1', image_mini:'/images/items/belt/mini/ammo_p1.png?1', bonus:{skills:{aim:15}, attributes:{charisma:3, dexterity:1, flexibility:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11087] = {item_id:11087, nshort:'ammo_fine', name:'Патронташ Джейн-катастрофы', type:'belt', level:57, price:6750, image:'/images/items/belt/ammo_fine.png?1', image_mini:'/images/items/belt/mini/ammo_fine.png?1', bonus:{skills:{aim:10, health:10, punch:10}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[11090] = {item_id:11090, nshort:'flag_germany', name:'Немецкий ремень', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_germany.png?1', image_mini:'/images/items/belt/mini/flag_germany.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};

    PK_S3.items[11092] = {item_id:11092, nshort:'flag_italy', name:'Итальянский ремень', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_italy.png?1', image_mini:'/images/items/belt/mini/flag_italy.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};

    PK_S3.items[11095] = {item_id:11095, nshort:'flag_portugal', name:'Португальский ремень', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_portugal.png?1', image_mini:'/images/items/belt/mini/flag_portugal.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};
    PK_S3.items[11096] = {item_id:11096, nshort:'flag_russia', name:'Русский ремень', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_russia.png?1', image_mini:'/images/items/belt/mini/flag_russia.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};

    PK_S3.items[11098] = {item_id:11098, nshort:'flag_sweden', name:'Шведский ремень', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_sweden.png?1', image_mini:'/images/items/belt/mini/flag_sweden.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};

    PK_S3.items[11101] = {item_id:11101, nshort:'inno_belt', name:'Ремень InnoGames', type:'belt', level:55, price:16500, image:'/images/items/belt/inno_belt.png?1', image_mini:'/images/items/belt/mini/inno_belt.png?1', bonus:{skills:{}, attributes:{charisma:10, dexterity:10, flexibility:10, strength:10}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, auctionable:true, tradeable:true, sellable:true};
    PK_S3.items[11102] = {item_id:11102, nshort:'skull_grey', name:'Серый пояс с черепом', type:'belt', level:57, price:4500, image:'/images/items/belt/skull_grey.png?1', image_mini:'/images/items/belt/mini/skull_grey.png?1', bonus:{skills:{punch:5, build:15}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11103] = {item_id:11103, nshort:'skull_yellow', name:'Жёлтый пояс с черепом', type:'belt', level:60, price:6825, image:'/images/items/belt/skull_yellow.png?1', image_mini:'/images/items/belt/mini/skull_yellow.png?1', bonus:{skills:{repair:15, tough:15}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11104] = {item_id:11104, nshort:'skull_blue', name:'Синий пояс с черепом', type:'belt', level:60, price:6825, image:'/images/items/belt/skull_blue.png?1', image_mini:'/images/items/belt/mini/skull_blue.png?1', bonus:{skills:{pitfall:15, endurance:15}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11105] = {item_id:11105, nshort:'skull_green', name:'Зелёный пояс с черепом', type:'belt', level:65, price:7605, image:'/images/items/belt/skull_green.png?1', image_mini:'/images/items/belt/mini/skull_green.png?1', bonus:{skills:{tactic:15, finger_dexterity:15}, attributes:{flexibility:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11106] = {item_id:11106, nshort:'skull_brown', name:'Коричневый пояс с черепом', type:'belt', level:65, price:7605, image:'/images/items/belt/skull_brown.png?1', image_mini:'/images/items/belt/mini/skull_brown.png?1', bonus:{skills:{animal:15, health:15}, attributes:{dexterity:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11107] = {item_id:11107, nshort:'skull_black', name:'Чёрный пояс с черепом', type:'belt', level:70, price:8190, image:'/images/items/belt/skull_black.png?1', image_mini:'/images/items/belt/mini/skull_black.png?1', bonus:{skills:{appearance:15, trade:15}, attributes:{charisma:1, strength:1}}, set:{}, traderlevel:9, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11108] = {item_id:11108, nshort:'skull_p1', name:'Знатный пояс с черепом', type:'belt', level:70, price:11550, image:'/images/items/belt/skull_p1.png?1', image_mini:'/images/items/belt/mini/skull_p1.png?1', bonus:{skills:{leadership:15, shot:15, ride:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11109] = {item_id:11109, nshort:'skull_fine', name:'Пояс Билли Кида с черепом', type:'belt', level:80, price:12600, image:'/images/items/belt/skull_fine.png?1', image_mini:'/images/items/belt/mini/skull_fine.png?1', bonus:{attributes:{charisma:6, dexterity:6, flexibility:6, strength:6}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
    
    PK_S3.items[11110] = {item_id:11110, nshort:'pistols_grey', name:'Серый пояс с пистолетами', type:'belt', level:75, price:7350, image:'/images/items/belt/pistols_grey.png?1', image_mini:'/images/items/belt/mini/pistols_grey.png?1', bonus:{skills:{swim:15, reflex:15}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11111] = {item_id:11111, nshort:'pistols_yellow', name:'Жёлтый пояс с пистолетами', type:'belt', level:85, price:10575, image:'/images/items/belt/pistols_yellow.png?1', image_mini:'/images/items/belt/mini/pistols_yellow.png?1', bonus:{attributes:{charisma:4, dexterity:5, flexibility:4, strength:5}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11112] = {item_id:11112, nshort:'pistols_blue', name:'Синий пояс с пистолетами', type:'belt', level:90, price:10875, image:'/images/items/belt/pistols_blue.png?1', image_mini:'/images/items/belt/mini/pistols_blue.png?1', bonus:{skills:{hide:15, dodge:25}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11113] = {item_id:11113, nshort:'pistols_green', name:'Зелёный пояс с пистолетами', type:'belt', level:95, price:12825, image:'/images/items/belt/pistols_green.png?1', image_mini:'/images/items/belt/mini/pistols_green.png?1', bonus:{attributes:{charisma:6, dexterity:5, flexibility:6, strength:5}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11114] = {item_id:11114, nshort:'pistols_brown', name:'Коричневый пояс с пистолетами', type:'belt', level:100, price:12375, image:'/images/items/belt/pistols_brown.png?1', image_mini:'/images/items/belt/mini/pistols_brown.png?1', bonus:{skills:{repair:15, finger_dexterity:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11115] = {item_id:11115, nshort:'pistols_black', name:'Чёрный пояс с пистолетами', type:'belt', level:105, price:13500, image:'/images/items/belt/pistols_black.png?1', image_mini:'/images/items/belt/mini/pistols_black.png?1', bonus:{skills:{appearance:15, shot:15, reflex:15, punch:15}, attributes:{charisma:1, dexterity:1, flexibility:1, strength:1}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11116] = {item_id:11116, nshort:'pistols_p1', name:'Знатный пояс с пистолетами', type:'belt', level:110, price:19200, image:'/images/items/belt/pistols_p1.png?1', image_mini:'/images/items/belt/mini/pistols_p1.png?1', bonus:{skills:{tactic:15, leadership:15, endurance:15, build:15}, attributes:{charisma:3, dexterity:3, flexibility:3, strength:3}}, set:{}, traderlevel:10, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11117] = {item_id:11117, nshort:'pistols_fine', name:'Пояс Уильяма Тильгмана с пистолетами', type:'belt', level:115, price:21600, image:'/images/items/belt/pistols_fine.png?1', image_mini:'/images/items/belt/mini/pistols_fine.png?1', bonus:{skills:{dodge:15, ride:15, health:15, tough:15}, attributes:{charisma:4, dexterity:4, flexibility:4, strength:4}}, set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11118] = {item_id:11118, nshort:'greenhorn_belt', name:'Кожаный ремешок', type:'belt', level:4, price:375, image:'/images/items/belt/greenhorn_belt.png?1', image_mini:'/images/items/belt/mini/greenhorn_belt.png?1', bonus:{skills:{leadership:2, shot:3, build:3}}, set:{key:'greenhorn_set', name:'Набор чечако'}, sellable:true};

    PK_S3.items[11121] = {item_id:11121, nshort:'flag_ukraine', name:'Украинский ремень', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_ukraine.png?1', image_mini:'/images/items/belt/mini/flag_ukraine.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};

    PK_S3.items[11123] = {item_id:11123, nshort:'flag_netherland', name:'Нидерландский ремень', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_netherland.png?1', image_mini:'/images/items/belt/mini/flag_netherland.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};

    PK_S3.items[11129] = {item_id:11129, nshort:'flag_greece', name:'Греческий ремень', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_greece.png?1', image_mini:'/images/items/belt/mini/flag_greece.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};

    PK_S3.items[11131] = {item_id:11131, nshort:'flag_turkey', name:'Турецкий ремень', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_turkey.png?1', image_mini:'/images/items/belt/mini/flag_turkey.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};

    PK_S3.items[11136] = {item_id:11136, nshort:'flag_confederacy', name:'Ремень конфедерации', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_confederacy.png?1', image_mini:'/images/items/belt/mini/flag_confederacy.png?1', bonus:{skills:{}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{}, traderlevel:20, tradeable:true, sellable:true};
    PK_S3.items[11137] = {item_id:11137, nshort:'flag_indian', name:'Индейский ремень', type:'belt', level:55, price:3000, image:'/images/items/belt/flag_indian.png?1', image_mini:'/images/items/belt/mini/flag_indian.png?1', bonus:{attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}}, set:{key:'set_indian', name:'Набор индейца'}, traderlevel:20, tradeable:true, sellable:true};
    PK_S3.items[11138] = {item_id:11138, nshort:'adah_belt', name:'Пояс Ады Менкен', type:'belt', level:48, price:4235, image:'/images/items/belt/adah_belt.png?1', image_mini:'/images/items/belt/mini/adah_belt.png?1', bonus:{skills:{animal:15, trade:15, swim:8}}, set:{key:'set_dancer', name:'Набор танцовщицы'}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[11139] = {item_id:11139, nshort:'collector_belt', name:'Пояс коллекционера', type:'belt', level:100, price:0, image:'/images/items/belt/collector_belt.png?1', image_mini:'/images/items/belt/mini/collector_belt.png?1', bonus:{skills:{aim:15, build:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Набор коллекционера'}, traderlevel:99, tradeable:true};
    PK_S3.items[11140] = {item_id:11140, nshort:'bunny_belt', name:'Пасхальный ремень', type:'belt', level:1, price:0, image:'/images/items/belt/bunny_belt.png?1', image_mini:'/images/items/belt/mini/bunny_belt.png?1', bonus:{skills:{animal:2}, attributes:{dexterity:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'bunny_set', name:'Костюм зайца'}, traderlevel:99, tradeable:true};

    PK_S3.items[12700] = {item_id:12700, nshort:'adventcal', name:'Рождественский календарь', type:'yield', level:0, price:10, image:'/images/items/yield/adventcal.png?1', image_mini:'images/items/yield/adventcal.png?1', set:{}};
    PK_S3.items[12701] = {item_id:12701, nshort:'xmas_licorice', name:'Лакрица', type:'yield', level:0, price:15, image:'/images/items/yield/xmas_licorice.png?1', image_mini:'images/items/yield/xmas_licorice.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12702] = {item_id:12702, nshort:'xmas_oat', name:'Овёс', type:'yield', level:0, price:32, image:'/images/items/yield/xmas_oat.png?1', image_mini:'images/items/yield/xmas_oat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12703] = {item_id:12703, nshort:'xmas_cracker', name:'Хлопушка', type:'yield', level:0, price:27, image:'/images/items/yield/xmas_cracker.png?1', image_mini:'images/items/yield/xmas_cracker.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12704] = {item_id:12704, nshort:'xmas_lebkuchen', name:'Пряник', type:'yield', level:0, price:31, image:'/images/items/yield/xmas_lebkuchen.png?1', image_mini:'images/items/yield/xmas_lebkuchen.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12705] = {item_id:12705, nshort:'xmas_cookie', name:'Шоколадное печенье', type:'yield', level:0, price:29, image:'/images/items/yield/xmas_cookie.png?1', image_mini:'images/items/yield/xmas_cookie.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12706] = {item_id:12706, nshort:'xmas_potato', name:'Марципановая картошка', type:'yield', level:0, price:39, image:'/images/items/yield/xmas_potato.png?1', image_mini:'images/items/yield/xmas_potato.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12707] = {item_id:12707, nshort:'xmas_coal', name:'Уголёк', type:'yield', level:0, price:2, image:'/images/items/yield/xmas_coal.png?1', image_mini:'images/items/yield/xmas_coal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12708] = {item_id:12708, nshort:'xmas_sphere', name:'Стеклянный шарик', type:'yield', level:0, price:35, image:'/images/items/yield/xmas_sphere.png?1', image_mini:'images/items/yield/xmas_sphere.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
PK_S3.items[12709] = {item_id:12709, nshort:'xmas_present', name:'Подарок', type:'yield', level:0, price:39, image:'/images/items/yield/xmas_present.png?1', image_mini:'images/items/yield/xmas_present.png?1', set:{}, auctionable:true, sellable:true};
PK_S3.items[12710] = {item_id:12710, nshort:'xmas_present_mid', name:'Красивый подарок', type:'yield', level:0, price:39, image:'/images/items/yield/xmas_present_mid.png?1', image_mini:'images/items/yield/xmas_present_mid.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[12711] = {item_id:12711, nshort:'xmas_present_high', name:'Подарок', type:'yield', level:0, price:39, image:'/images/items/yield/xmas_present_high.png?1', image_mini:'images/items/yield/xmas_present_high.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12712] = {item_id:12712, nshort:'xmas_keks', name:'Печенье', type:'yield', level:0, price:35, image:'/images/items/yield/xmas_keks.png?1', image_mini:'images/items/yield/xmas_keks.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[12713] = {item_id:12713, nshort:'xmas_bag', name:'Мешочек с шариками', type:'yield', level:0, price:330, image:'/images/items/yield/xmas_bag.png?1', image_mini:'images/items/yield/xmas_bag.png?1', bonus:{skills:{finger_dexterity:5}}, set:{}, auctionable:true, sellable:true};

    PK_S3.items[13701] = {item_id:13701, nshort:'promo_tomato', name:'Сочный помидор', type:'yield', level:0, price:15, image:'/images/items/yield/promo_tomato.png?1', image_mini:'images/items/yield/promo_tomato.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[13702] = {item_id:13702, nshort:'promo_horseshoe', name:'Знатная подкова', type:'yield', level:0, price:32, image:'/images/items/yield/promo_horseshoe.png?1', image_mini:'images/items/yield/promo_horseshoe.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[13703] = {item_id:13703, nshort:'promo_cigaretts', name:'Самокрутки', type:'yield', level:0, price:27, image:'/images/items/yield/promo_cigaretts.png?1', image_mini:'images/items/yield/promo_cigaretts.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[13704] = {item_id:13704, nshort:'promo_whiskey', name:'Бодрящий напиток', type:'yield', level:0, price:31, image:'/images/items/yield/promo_whiskey.png?1', image_mini:'images/items/yield/promo_whiskey.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[13705] = {item_id:13705, nshort:'promo_meal', name:'Тушёные бобы', type:'yield', level:0, price:29, image:'/images/items/yield/promo_meal.png?1', image_mini:'images/items/yield/promo_meal.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};
    PK_S3.items[13706] = {item_id:13706, nshort:'promo_orange', name:'Спелый апельсин', type:'yield', level:0, price:39, image:'/images/items/yield/promo_orange.png?1', image_mini:'images/items/yield/promo_orange.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, sellable:true};

    PK_S3.items[13711] = {item_id:13711, nshort:'computerbild_promo_bag', name:'Саквояж Буффало Билла', type:'yield', level:0, price:0, image:'/images/items/yield/computerbild_promo_bag.png?1', image_mini:'images/items/yield/computerbild_promo_bag.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[16100] = {item_id:16100, nshort:'fb_aidkit', name:'Аптечка', type:'yield', level:0, price:590, image:'/images/items/yield/fb_aidkit.png?1', image_mini:'images/items/yield/fb_aidkit.png?1', set:{}, auctionable:true, sellable:true};

    PK_S3.items[17000] = {item_id:17000, nshort:'fb_chest_wooden', name:'Сундук рядового', type:'yield', level:0, price:0, image:'/images/items/yield/fb_chest_wooden.png?1', image_mini:'images/items/yield/fb_chest_wooden.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true};
    PK_S3.items[17001] = {item_id:17001, nshort:'fb_chest_iron', name:'Сундук капитана', type:'yield', level:0, price:0, image:'/images/items/yield/fb_chest_iron.png?1', image_mini:'images/items/yield/fb_chest_iron.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true};
    PK_S3.items[17002] = {item_id:17002, nshort:'fb_chest_steel', name:'Сундук генерала', type:'yield', level:0, price:0, image:'/images/items/yield/fb_chest_steel.png?1', image_mini:'images/items/yield/fb_chest_steel.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true};
    PK_S3.items[17003] = {item_id:17003, nshort:'premiumchest', name:'Сундук Варланга', type:'yield', level:0, price:7, image:'/images/items/yield/premiumchest.png?1', image_mini:'images/items/yield/premiumchest.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[17004] = {item_id:17004, nshort:'xmas_repeat', name:'Рождественский подарок', type:'yield', level:0, price:7, image:'/images/items/yield/xmas_repeat.png?1', image_mini:'images/items/yield/xmas_repeat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[17020] = {item_id:17020, nshort:'clean_sand', name:'Чистый песок', type:'yield', level:0, price:1, image:'/images/items/yield/clean_sand.png?1', image_mini:'images/items/yield/clean_sand.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[17021] = {item_id:17021, nshort:'hot_granit', name:'Раскалённый гранит', type:'yield', level:0, price:1, image:'/images/items/yield/hot_granit.png?1', image_mini:'images/items/yield/hot_granit.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[17022] = {item_id:17022, nshort:'metall_ring', name:'Железный обруч', type:'yield', level:0, price:1, image:'/images/items/yield/metall_ring.png?1', image_mini:'images/items/yield/metall_ring.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[17023] = {item_id:17023, nshort:'clear_water', name:'Отфильтрованная вода', type:'yield', level:0, price:1, image:'/images/items/yield/clear_water.png?1', image_mini:'images/items/yield/clear_water.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[17024] = {item_id:17024, nshort:'clear_glas', name:'Остывшее стекло', type:'yield', level:0, price:0, image:'/images/items/yield/clear_glas.png?1', image_mini:'images/items/yield/clear_glas.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[17025] = {item_id:17025, nshort:'polished_glas', name:'Линза', type:'yield', level:0, price:0, image:'/images/items/yield/polished_glas.png?1', image_mini:'images/items/yield/polished_glas.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[17026] = {item_id:17026, nshort:'lense', name:'Лупа', type:'yield', level:0, price:0, image:'/images/items/yield/lense.png?1', image_mini:'images/items/yield/lense.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};
    PK_S3.items[17027] = {item_id:17027, nshort:'liquid_glas', name:'Расплавленное стекло', type:'yield', level:0, price:1, image:'/images/items/yield/liquid_glas.png?1', image_mini:'images/items/yield/liquid_glas.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}};

    PK_S3.items[20003] = {item_id:20003, nshort:'beansandbacon_recipe', name:'Повар: Тушёные бобы с беконом (50)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20004] = {item_id:20004, nshort:'marmelade_recipe', name:'Повар: Джем (50)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20005] = {item_id:20005, nshort:'mash_recipe', name:'Повар: Сусло (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20006] = {item_id:20006, nshort:'dough_recipe', name:'Повар: Тесто (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20007] = {item_id:20007, nshort:'steakseasoning_recipe', name:'Повар: Стейк в маринаде (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20008] = {item_id:20008, nshort:'licor_recipe', name:'Повар: Ягодный ликёр (150)', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20009] = {item_id:20009, nshort:'cake_recipe', name:'Повар: Торт (150)', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20010] = {item_id:20010, nshort:'fishfond_recipe', name:'Повар: Рыбный бульон (150)', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20011] = {item_id:20011, nshort:'turkey_recipe', name:'Повар: Жареная индейка (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20012] = {item_id:20012, nshort:'fishsoup_recipe', name:'Повар: Уха (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20013] = {item_id:20013, nshort:'veggiepun_recipe', name:'Повар: Овощные пельмени (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20014] = {item_id:20014, nshort:'meatloaf_recipe', name:'Повар: Фарш (300)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20015] = {item_id:20015, nshort:'fishonastick_recipe', name:'Повар: Запечённая рыба (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20016] = {item_id:20016, nshort:'parfumsmoke_recipe', name:'Повар: Ладан (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20017] = {item_id:20017, nshort:'sauce_recipe', name:'Повар: Сливочный соус (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20018] = {item_id:20018, nshort:'paperfish_recipe', name:'Повар: Копчёная рыба (400)', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20019] = {item_id:20019, nshort:'gentlemen_recipe', name:'Повар: Обед джентльмена (450)', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, traderlevel:20, auctionable:true, tradeable:true, sellable:true};

    PK_S3.items[20023] = {item_id:20023, nshort:'pipecleaner_recipe', name:'Знахарь: Ёршик (50)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20024] = {item_id:20024, nshort:'stomach_recipe', name:'Знахарь: Лекарство от гастрита (50)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20025] = {item_id:20025, nshort:'sulfuracid_recipe', name:'Знахарь: Серная кислота (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20026] = {item_id:20026, nshort:'ink_recipe', name:'Знахарь: Чернила (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20027] = {item_id:20027, nshort:'petroleum_recipe', name:'Знахарь: Керосин (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20028] = {item_id:20028, nshort:'fetish_recipe', name:'Знахарь: Идол (150)', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20029] = {item_id:20029, nshort:'destillate_recipe', name:'Знахарь: Дистилляты (150)', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20030] = {item_id:20030, nshort:'firewater_recipe', name:'Знахарь: Самогон (150)', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20031] = {item_id:20031, nshort:'tea_recipe', name:'Знахарь: Чай из ягод (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20032] = {item_id:20032, nshort:'chewtabaco_recipe', name:'Знахарь: Жевательный табак (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20033] = {item_id:20033, nshort:'fruitlicor_recipe', name:'Знахарь: Фруктовый ликёр (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20034] = {item_id:20034, nshort:'battery_recipe', name:'Знахарь: Гальванический элемент (300)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20035] = {item_id:20035, nshort:'lye_recipe', name:'Знахарь: Щёлок (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20036] = {item_id:20036, nshort:'herbbrew_recipe', name:'Знахарь: Травяной ликёр (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20037] = {item_id:20037, nshort:'paper_recipe', name:'Знахарь: Сбор макулатуры (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20038] = {item_id:20038, nshort:'mathdraw_recipe', name:'Знахарь: Циркуль (400)', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20039] = {item_id:20039, nshort:'rosewater_recipe', name:'Знахарь: Розовая вода (450)', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, traderlevel:20, auctionable:true, tradeable:true, sellable:true};

    PK_S3.items[20043] = {item_id:20043, nshort:'bajonett_recipe', name:'Кузнец: Штык (50)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20044] = {item_id:20044, nshort:'weightstone_recipe', name:'Кузнец: Грузило (50)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20045] = {item_id:20045, nshort:'steel_recipe', name:'Кузнец: Стальная заготовка (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20046] = {item_id:20046, nshort:'liquid_lead_recipe', name:'Кузнец: Плавление свинца (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20047] = {item_id:20047, nshort:'forge_recipe', name:'Кузнец: Наковальня (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20048] = {item_id:20048, nshort:'leadfigure_recipe', name:'Кузнец: Статуэтка из свинца (150)', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20049] = {item_id:20049, nshort:'marble_recipe', name:'Кузнец: Мраморный шарик (150)', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20050] = {item_id:20050, nshort:'rivets_recipe', name:'Кузнец: Заклёпки (150)', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20051] = {item_id:20051, nshort:'gripprotection_recipe', name:'Кузнец: Эфес (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20052] = {item_id:20052, nshort:'coolingpackage_recipe', name:'Кузнец: Охлаждение стрелкового оружия (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20053] = {item_id:20053, nshort:'weaponchain_recipe', name:'Кузнец: Оружейная цепь (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20054] = {item_id:20054, nshort:'handle_recipe', name:'Кузнец: Рукоять (300)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20055] = {item_id:20055, nshort:'revolverform_recipe', name:'Кузнец: Литейная форма для револьвера (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20056] = {item_id:20056, nshort:'steelblade_recipe', name:'Кузнец: Стальное лезвие (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20057] = {item_id:20057, nshort:'customize_recipe', name:'Кузнец: Побрякушки для оружия (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20058] = {item_id:20058, nshort:'druse_recipe', name:'Кузнец: Распилка жеоды (400)', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20059] = {item_id:20059, nshort:'polishstone_recipe', name:'Кузнец: Полировочный камень (450)', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, traderlevel:20, auctionable:true, tradeable:true, sellable:true};

    PK_S3.items[20063] = {item_id:20063, nshort:'horseshoe_recipe', name:'Шорник: Набивка подков (50)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20064] = {item_id:20064, nshort:'energyfood_recipe', name:'Шорник: Комбикорм (50)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:3, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20065] = {item_id:20065, nshort:'naked_saddle_recipe', name:'Шорник: Потрошение седла (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20066] = {item_id:20066, nshort:'fillmaterial_recipe', name:'Шорник: Наполнитель (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20067] = {item_id:20067, nshort:'leatherskin_recipe', name:'Шорник: Кожаный чехол (100)', type:'recipe', level:1, price:500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20068] = {item_id:20068, nshort:'brandingiron_recipe', name:'Шорник: Клеймо (150)', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20069] = {item_id:20069, nshort:'notworking_compass_recipe', name:'Шорник: Компас (150)', type:'recipe', level:1, price:750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20070] = {item_id:20070, nshort:'ironstep_recipe', name:'Шорник: Стремена (150)', type:'recipe', level:1, price:1750, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20071] = {item_id:20071, nshort:'spores_recipe', name:'Шорник: Шпоры (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20072] = {item_id:20072, nshort:'harnish_recipe', name:'Шорник: Уздечка (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20073] = {item_id:20073, nshort:'fieldcamp_recipe', name:'Шорник: Спальный мешок (250)', type:'recipe', level:1, price:2250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:5, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20074] = {item_id:20074, nshort:'horse_cloth_recipe', name:'Шорник: Попона (300)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20075] = {item_id:20075, nshort:'custom_leather_recipe', name:'Шорник: Побрякушки для кожаных изделий (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20076] = {item_id:20076, nshort:'charriotpiece_recipe', name:'Шорник: Деталь для дилижанса (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20077] = {item_id:20077, nshort:'wagonwheel_recipe', name:'Шорник: Колесо (350)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:6, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20078] = {item_id:20078, nshort:'aimwater_recipe', name:'Шорник: Эликсир меткости (400)', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:20, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20079] = {item_id:20079, nshort:'gemsaddle_recipe', name:'Шорник: Украшение седла (450)', type:'recipe', level:1, price:3500, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', set:{}, traderlevel:20, auctionable:true, tradeable:true, sellable:true};

    PK_S3.items[20096] = {item_id:20096, nshort:'dried_meat_recipe', name:'Повар: Вяленое мясо (500)', type:'recipe', level:1, price:250, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20097] = {item_id:20097, nshort:'gulash_recipe', name:'Повар: Гуляш (525)', type:'recipe', level:1, price:2500, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', set:{}, auctionable:true, dropable:true, tradeable:true, sellable:true};
    PK_S3.items[20098] = {item_id:20098, nshort:'spare_ribs_recipe', name:'Повар: Говяжьи рёбрышки (550)', type:'recipe', level:1, price:5000, image:'images/items/recipe/recipe_cook.png?1', image_mini:'images/items/recipe/recipe_cook.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, tradeable:true, sellable:true};

    PK_S3.items[20101] = {item_id:20101, nshort:'snake_oil_recipe', name:'Знахарь: Панацея (500)', type:'recipe', level:1, price:250, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', set:{}, auctionable:true, dropable:true, sellable:true};

    PK_S3.items[20103] = {item_id:20103, nshort:'fine_spirits_recipe', name:'Знахарь: Изысканный ликёр (550)', type:'recipe', level:1, price:5000, image:'images/items/recipe/recipe_quack.png?1', image_mini:'images/items/recipe/recipe_quack.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, sellable:true};

    PK_S3.items[20106] = {item_id:20106, nshort:'fine_leather_polish_recipe', name:'Шорник: Лосьон для кожи (500)', type:'recipe', level:1, price:250, image:'images/items/recipe/recipe_sattle.png?1', image_mini:'images/items/recipe/recipe_sattle.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{}, auctionable:true, dropable:true, sellable:true};
    
    PK_S3.items[20111] = {item_id:20111, nshort:'rustprove_bolts_recipe', name:'Кузнец: Нержавеющие болты (500)', type:'recipe', level:1, price:250, image:'images/items/recipe/recipe_smith.png?1', image_mini:'images/items/recipe/recipe_smith.png?1', set:{}, auctionable:true, dropable:true, sellable:true};
    
    PK_S3.items[40000] = {item_id:40000, nshort:'greenhorn_poncho', name:'Шерстяное пончо', type:'body', level:1, price:125, image:'/images/items/body/greenhorn_poncho.png?1', image_mini:'/images/items/body/mini/greenhorn_poncho.png?1', bonus:{skills:{appearance:3, tough:3}}, set:{key:'greenhorn_set', name:'Набор чечако'}, dropable:true, sellable:true};
    PK_S3.items[40001] = {item_id:40001, nshort:'vest_golddigger', name:'Жилетка золотоискателя', type:'body', level:10, price:50, image:'/images/items/body/vest_golddigger.png?1', image_mini:'/images/items/body/mini/vest_golddigger.png?1', bonus:{skills:{swim:1, endurance:1, tough:4}}, set:{}, dropable:true, sellable:true};
    PK_S3.items[40002] = {item_id:40002, nshort:'collector_jacket', name:'Жакет коллекционера', type:'body', level:100, price:0, image:'/images/items/body/collector_jacket.png?1', image_mini:'/images/items/body/mini/collector_jacket.png?1', bonus:{skills:{shot:15, punch:15}, attributes:{charisma:2, dexterity:2, flexibility:2, strength:2}, fortbattle:{}, fortbattlesector:{}}, set:{key:'collector_set', name:'Набор коллекционера'}};
    PK_S3.items[40003] = {item_id:40003, nshort:'bunny_dress', name:'Заячья шубка', type:'body', level:1, price:0, image:'/images/items/body/bunny_dress.png?1', image_mini:'/images/items/body/mini/bunny_dress.png?1', bonus:{skills:{animal:2}, attributes:{charisma:1}, fortbattle:{}, fortbattlesector:{}}, set:{key:'bunny_set', name:'Костюм зайца'}};

    PK_S3.items[185147] = {item_id:185147, nshort:'magic_wand', name:'Волшебная палочка Гермионы', type:'right_arm', level:1, price:0, image:'/images/items/right_arm/magic_wand.png?1', image_mini:'/images/items/right_arm/mini/magic_wand.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Набор мага'}, damage:{damage_min:1, damage_max:1}, sub_type:'hand'};
    PK_S3.items[185148] = {item_id:185148, nshort:'slim_belt', name:'Кушак', type:'belt', level:1, price:0, image:'/images/items/belt/slim_belt.png?1', image_mini:'/images/items/belt/mini/slim_belt.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Набор мага'}, traderlevel:99, tradeable:true};
    PK_S3.items[185149] = {item_id:185149, nshort:'dude_jacket', name:'Халат Обломова', type:'body', level:1, price:0, image:'/images/items/body/dude_jacket.png?1', image_mini:'/images/items/body/mini/dude_jacket.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Набор мага'}};
    PK_S3.items[185150] = {item_id:185150, nshort:'wooden_shoes', name:'Шлёпанцы Бабы-Яги', type:'foot', level:1, price:0, image:'/images/items/foot/wooden_shoes.png?1', image_mini:'/images/items/foot/mini/wooden_shoes.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Набор мага'}, traderlevel:99, tradeable:true};
    PK_S3.items[185151] = {item_id:185151, nshort:'fake_beard', name:'Борода молодого Хоттабыча', type:'neck', level:1, price:0, image:'/images/items/neck/fake_beard.png?1', image_mini:'images/items/neck/fake_beard.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Набор мага'}};
    PK_S3.items[185152] = {item_id:185152, nshort:'magician_hat', name:'Шляпа папы Карло', type:'head', level:1, price:0, image:'/images/items/head/magician_hat.png?1', image_mini:'/images/items/head/mini/magician_hat.png?1', bonus:{skills:{}, attributes:{}, fortbattle:{}, fortbattlesector:{}}, set:{key:'wooden_magician_set', name:'Набор мага'}, traderlevel:66, tradeable:true};

    PK_S3.items[185200] = {item_id:185200, nshort:'easter_11_egg1', name:'Пасхальное яйцо', type:'yield', level:0, price:15, image:'/images/items/yield/easter_11_egg1.png?1', image_mini:'images/items/yield/easter_11_egg1.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[185201] = {item_id:185201, nshort:'easter_11_egg2', name:'Пасхальное яйцо', type:'yield', level:0, price:32, image:'/images/items/yield/easter_11_egg2.png?1', image_mini:'images/items/yield/easter_11_egg2.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[185202] = {item_id:185202, nshort:'easter_11_egg3', name:'Пасхальное яйцо', type:'yield', level:0, price:27, image:'/images/items/yield/easter_11_egg3.png?1', image_mini:'images/items/yield/easter_11_egg3.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[185203] = {item_id:185203, nshort:'easter_11_egg4', name:'Пасхальное яйцо', type:'yield', level:0, price:31, image:'/images/items/yield/easter_11_egg4.png?1', image_mini:'images/items/yield/easter_11_egg4.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[185204] = {item_id:185204, nshort:'easter_11_egg5', name:'Пасхальное яйцо', type:'yield', level:0, price:29, image:'/images/items/yield/easter_11_egg5.png?1', image_mini:'images/items/yield/easter_11_egg5.png?1', set:{}, auctionable:true, sellable:true};
    PK_S3.items[185205] = {item_id:185205, nshort:'easter_11_egg6', name:'Пасхальное яйцо', type:'yield', level:0, price:39, image:'/images/items/yield/easter_11_egg6.png?1', image_mini:'images/items/yield/easter_11_egg6.png?1', set:{}, auctionable:true, sellable:true};
    
    for (var i in PK_S3.items){
	if (isNaN(i)) continue;
	if (!PK_S3.items[i].bonus) {PK_S3.items[i].bonus = {};}
	if (!PK_S3.items[i].bonus.skills) {PK_S3.items[i].bonus.skills = {};}
	if (!PK_S3.items[i].bonus.attributes) {PK_S3.items[i].bonus.attributes = {};}
	if (!PK_S3.items[i].bonus.fortbattle) {PK_S3.items[i].bonus.fortbattle = {};}
	if (!PK_S3.items[i].bonus.fortbattlesector) {PK_S3.items[i].bonus.fortbattlesector = {};}
    }

    
    PK_S3.raboty[1] = {rus_name:'Выпас свиней', name:'swine', malus:2, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:1, vezenie:0, boom:1, produkty:{700:20}}};
    PK_S3.raboty[2] = {rus_name:'Присмотр за полем', name:'scarecrow', malus:1, navyki:{build:1,shot:1,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:1, opyt:3, vezenie:2, boom:20, produkty:{757:20}}};
    PK_S3.raboty[3] = {rus_name:'Расклейка плакатов', name:'wanted', malus:1, navyki:{endurance:1,ride:1,hide:1,finger_dexterity:1,pitfall:1}, resultaty:{dengi:2, opyt:3, vezenie:0, boom:10, produkty:{743:40}}};
    PK_S3.raboty[4] = {rus_name:'Сбор табака', name:'tabacco', malus:1, navyki:{tough:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:2, produkty:{702:100}}};
    PK_S3.raboty[5] = {rus_name:'Сбор хлопка', name:'cotton', malus:2, navyki:{tough:1,endurance:1,finger_dexterity:1,leadership:1,trade:1}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:3, produkty:{704:50}}};
    PK_S3.raboty[6] = {rus_name:'Сбор сахарного тростника', name:'sugar', malus:4, navyki:{punch:1,tough:1,finger_dexterity:1,repair:1,trade:1}, resultaty:{dengi:5, opyt:2, vezenie:4, boom:1, produkty:{703:100}}};
    PK_S3.raboty[7] = {rus_name:'Рыбалка', name:'angle', malus:3, navyki:{hide:1,swim:3,repair:1}, resultaty:{dengi:1, opyt:0, vezenie:6, boom:2, produkty:{705:60, 782:3}}};
    PK_S3.raboty[8] = {rus_name:'Жатва', name:'cereal', malus:11, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:2, opyt:6, vezenie:2, boom:4, produkty:{701:55}}};
    PK_S3.raboty[9] = {rus_name:'Сбор ягод', name:'berry', malus:16, navyki:{tough:2,hide:1,finger_dexterity:2}, resultaty:{dengi:2, opyt:6, vezenie:5, boom:6, produkty:{706:45}}};
    PK_S3.raboty[10] = {rus_name:'Выпас овец', name:'sheeps', malus:12, navyki:{tough:1,endurance:1,leadership:1,animal:2}, resultaty:{dengi:3, opyt:5, vezenie:0, boom:2, produkty:{707:25}}};
    PK_S3.raboty[11] = {rus_name:'Продажа прессы', name:'newspaper', malus:9, navyki:{ride:2,trade:2,appearance:1}, resultaty:{dengi:6, opyt:1, vezenie:2, boom:1, produkty:{744:60}}};
    PK_S3.raboty[12] = {rus_name:'Сенокос', name:'cut', malus:22, navyki:{punch:1,ride:1,finger_dexterity:1,animal:2}, resultaty:{dengi:5, opyt:7, vezenie:3, boom:3, produkty:{765:5}}};
    PK_S3.raboty[13] = {rus_name:'Помол зерна', name:'grinding', malus:25, navyki:{punch:1,tough:1,endurance:1,ride:1,finger_dexterity:1}, resultaty:{dengi:11, opyt:7, vezenie:0, boom:5, produkty:{745:40}}};
    PK_S3.raboty[14] = {rus_name:'Сбор кукурузы', name:'corn', malus:23, navyki:{finger_dexterity:1,tactic:1,trade:1,animal:1,appearance:1}, resultaty:{dengi:4, opyt:7, vezenie:8, boom:5, produkty:{748:25}}};
    PK_S3.raboty[15] = {rus_name:'Сбор фасоли', name:'beans', malus:23, navyki:{endurance:1,finger_dexterity:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:9, opyt:7, vezenie:4, boom:5, produkty:{746:40}}};
    PK_S3.raboty[16] = {rus_name:'Охрана форта', name:'fort_guard', malus:25, navyki:{reflex:1,shot:1,leadership:1,appearance:2}, resultaty:{dengi:3, opyt:9, vezenie:2, boom:7, produkty:{758:2}}};
    PK_S3.raboty[17] = {rus_name:'Дубление кожи', name:'tanning', malus:40, navyki:{tough:1,endurance:1,swim:1,finger_dexterity:1,trade:1}, resultaty:{dengi:12, opyt:15, vezenie:5, boom:18, produkty:{712:15}}};
    PK_S3.raboty[18] = {rus_name:'Поиск золота', name:'digging', malus:31, navyki:{tough:1,reflex:1,swim:1,trade:2}, resultaty:{dengi:11, opyt:3, vezenie:5, boom:7, produkty:{708:17, 1791:1}}};
    PK_S3.raboty[19] = {rus_name:'Захоронение', name:'grave', malus:76, navyki:{build:1,punch:1,tough:1,endurance:1,ride:1}, resultaty:{dengi:16, opyt:12, vezenie:22, boom:9, produkty:{736:8}}};
    PK_S3.raboty[20] = {rus_name:'Охота на индейку', name:'turkey', malus:43, navyki:{reflex:1,hide:2,shot:1,pitfall:1}, resultaty:{dengi:3, opyt:14, vezenie:7, boom:21, produkty:{709:13}}};
    PK_S3.raboty[21] = {rus_name:'Строительство железной дороги', name:'rail', malus:45, navyki:{build:2,endurance:1,repair:1,leadership:1}, resultaty:{dengi:10, opyt:18, vezenie:5, boom:10, produkty:{766:25}}};
    PK_S3.raboty[22] = {rus_name:'Выпас коров', name:'cow', malus:39, navyki:{ride:2,reflex:1,tactic:1,animal:1}, resultaty:{dengi:5, opyt:17, vezenie:0, boom:11, produkty:{710:15}}};
    PK_S3.raboty[23] = {rus_name:'Ремонт забора', name:'fence', malus:36, navyki:{finger_dexterity:1,repair:2,animal:2}, resultaty:{dengi:7, opyt:11, vezenie:5, boom:6, produkty:{747:11}}};
    PK_S3.raboty[24] = {rus_name:'Лесопилка', name:'saw', malus:64, navyki:{reflex:2,finger_dexterity:2,trade:1}, resultaty:{dengi:23, opyt:12, vezenie:6, boom:32, produkty:{742:10}}};
    PK_S3.raboty[25] = {rus_name:'Выработка камня', name:'stone', malus:53, navyki:{punch:3,endurance:1,reflex:1}, resultaty:{dengi:17, opyt:8, vezenie:9, boom:33, produkty:{716:22}}};
    PK_S3.raboty[26] = {rus_name:'Спрямление русла', name:'straighten', malus:85, navyki:{build:1,swim:3,tactic:1}, resultaty:{dengi:8, opyt:22, vezenie:15, boom:12, produkty:{795:5}}};
    PK_S3.raboty[27] = {rus_name:'Лесоповал', name:'wood', malus:48, navyki:{punch:2,endurance:1,reflex:1,appearance:1}, resultaty:{dengi:18, opyt:5, vezenie:2, boom:21, produkty:{711:25}}};
    PK_S3.raboty[28] = {rus_name:'Орошение', name:'irrigation', malus:45, navyki:{build:1,ride:1,repair:1,leadership:1,tactic:1}, resultaty:{dengi:7, opyt:13, vezenie:15, boom:6, produkty:{736:6}}};
    PK_S3.raboty[29] = {rus_name:'Клеймение скота', name:'brand', malus:50, navyki:{ride:1,reflex:1,pitfall:1,animal:2}, resultaty:{dengi:8, opyt:25, vezenie:0, boom:35, produkty:{740:13}}};
    PK_S3.raboty[30] = {rus_name:'Ограждение пастбища', name:'wire', malus:58, navyki:{build:1,finger_dexterity:2,pitfall:1,animal:1}, resultaty:{dengi:17, opyt:13, vezenie:6, boom:0, produkty:{739:10}}};
    PK_S3.raboty[31] = {rus_name:'Прорыв плотины', name:'dam', malus:54, navyki:{swim:2,tactic:2,animal:1}, resultaty:{dengi:4, opyt:18, vezenie:9, boom:41, produkty:{714:5}}};
    PK_S3.raboty[32] = {rus_name:'Добыча самоцветов', name:'gems', malus:75, navyki:{swim:2,finger_dexterity:1,trade:2}, resultaty:{dengi:25, opyt:7, vezenie:8, boom:4, produkty:{720:8}}};
    PK_S3.raboty[33] = {rus_name:'Разметка приисков', name:'claim', malus:57, navyki:{build:1,endurance:1,swim:1,trade:1,appearance:1}, resultaty:{dengi:31, opyt:4, vezenie:4, boom:29, produkty:{755:25}}};
    PK_S3.raboty[34] = {rus_name:'Ремонт повозок', name:'chuck_wagon', malus:134, navyki:{ride:1,repair:2,leadership:1,trade:1}, resultaty:{dengi:5, opyt:23, vezenie:42, boom:11, produkty:{722:15}}};
    PK_S3.raboty[35] = {rus_name:'Объездка лошадей', name:'break_in', malus:72, navyki:{ride:2,reflex:1,pitfall:1,animal:1}, resultaty:{dengi:13, opyt:32, vezenie:10, boom:52, produkty:{787:5}}};
    PK_S3.raboty[36] = {rus_name:'Торговля', name:'trade', malus:85, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:15, opyt:3, vezenie:25, boom:12, produkty:{715:13, 774:1}}};
    PK_S3.raboty[37] = {rus_name:'Прокладка телеграфной линии', name:'mast', malus:75, navyki:{build:2,punch:1,swim:1,repair:1}, resultaty:{dengi:21, opyt:25, vezenie:3, boom:14, produkty:{767:14}}};
    PK_S3.raboty[38] = {rus_name:'Рытьё колодца', name:'spring', malus:103, navyki:{build:1,endurance:1,swim:1,leadership:1,tactic:1}, resultaty:{dengi:9, opyt:33, vezenie:23, boom:19, produkty:{741:10}}};
    PK_S3.raboty[39] = {rus_name:'Охота на бобра', name:'beaver', malus:120, navyki:{hide:2,pitfall:3}, resultaty:{dengi:32, opyt:17, vezenie:6, boom:21, produkty:{714:17, 771:13}}};
    PK_S3.raboty[40] = {rus_name:'Добыча угля', name:'coal', malus:86, navyki:{punch:2,reflex:1,finger_dexterity:1,trade:1}, resultaty:{dengi:30, opyt:14, vezenie:0, boom:13, produkty:{721:37}}};
    PK_S3.raboty[41] = {rus_name:'Типография', name:'print', malus:83, navyki:{tough:1,endurance:1,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:30, opyt:20, vezenie:5, boom:7, produkty:{744:40}}};
    PK_S3.raboty[42] = {rus_name:'Рыбная ловля', name:'fishing', malus:91, navyki:{swim:2,pitfall:2,leadership:1}, resultaty:{dengi:6, opyt:23, vezenie:23, boom:38, produkty:{717:15, 705:5}}};
    PK_S3.raboty[43] = {rus_name:'Строительство вокзала', name:'trainstation', malus:113, navyki:{build:2,finger_dexterity:1,repair:1,leadership:1}, resultaty:{dengi:12, opyt:47, vezenie:7, boom:15, produkty:{759:7}}};
    PK_S3.raboty[44] = {rus_name:'Строительство ветряной мельницы', name:'windmeel', malus:164, navyki:{build:1,endurance:1,ride:1,leadership:1,tactic:1}, resultaty:{dengi:42, opyt:43, vezenie:6, boom:18, produkty:{756:5}}};
    PK_S3.raboty[45] = {rus_name:'Рекогносцировка', name:'explore', malus:112, navyki:{endurance:1,shot:1,ride:1,swim:1,leadership:1}, resultaty:{dengi:1, opyt:45, vezenie:22, boom:37, produkty:{760:15}}};
    PK_S3.raboty[46] = {rus_name:'Сплав леса', name:'float', malus:138, navyki:{reflex:1,swim:3,tactic:1}, resultaty:{dengi:23, opyt:45, vezenie:0, boom:52, produkty:{711:30}}};
    PK_S3.raboty[47] = {rus_name:'Строительство моста', name:'bridge', malus:108, navyki:{build:1,endurance:1,swim:2,repair:1}, resultaty:{dengi:17, opyt:33, vezenie:18, boom:53, produkty:{761:8}}};
    PK_S3.raboty[48] = {rus_name:'Отлов лошадей', name:'springe', malus:135, navyki:{endurance:1,ride:2,animal:2}, resultaty:{dengi:29, opyt:45, vezenie:0, boom:42, produkty:{749:22}}};
    PK_S3.raboty[49] = {rus_name:'Изготовление гробов', name:'coffin', malus:119, navyki:{build:1,reflex:1,repair:2,appearance:1}, resultaty:{dengi:42, opyt:8, vezenie:15, boom:20, produkty:{734:25}}};
    PK_S3.raboty[50] = {rus_name:'Доставка амуниции', name:'dynamite', malus:145, navyki:{ride:1,reflex:1,shot:1,finger_dexterity:1,appearance:1}, resultaty:{dengi:23, opyt:12, vezenie:64, boom:93, produkty:{737:5}}};
    PK_S3.raboty[51] = {rus_name:'Охота на койотов', name:'coyote', malus:141, navyki:{endurance:2,shot:1,pitfall:1,hide:1}, resultaty:{dengi:15, opyt:43, vezenie:26, boom:45, produkty:{718:6}}};
    PK_S3.raboty[52] = {rus_name:'Охота на бизона', name:'buffalo', malus:179, navyki:{ride:1,pitfall:1,leadership:1,tactic:1,animal:1}, resultaty:{dengi:24, opyt:62, vezenie:0, boom:72, produkty:{724:14}}};
    PK_S3.raboty[53] = {rus_name:'Строительство особняка', name:'fort', malus:225, navyki:{build:1,pitfall:1,repair:1,leadership:2}, resultaty:{dengi:33, opyt:71, vezenie:17, boom:35, produkty:{762:3}}};
    PK_S3.raboty[54] = {rus_name:'Торговля с индейцами', name:'indians', malus:224, navyki:{pitfall:1,trade:2,appearance:2}, resultaty:{dengi:11, opyt:14, vezenie:63, boom:34, produkty:{719:13}}};
    PK_S3.raboty[55] = {rus_name:'Вырубка леса', name:'clearing', malus:179, navyki:{punch:2,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:62, opyt:8, vezenie:9, boom:16, produkty:{711:65}}};
    PK_S3.raboty[56] = {rus_name:'Добыча серебра', name:'silver', malus:194, navyki:{punch:1,tough:1,finger_dexterity:1,trade:2}, resultaty:{dengi:76, opyt:8, vezenie:0, boom:32, produkty:{725:17}}};
    PK_S3.raboty[57] = {rus_name:'Охрана дилижанса', name:'diligence_guard', malus:404, navyki:{ride:1,shot:1,repair:1,leadership:2}, resultaty:{dengi:34, opyt:77, vezenie:45, boom:43, produkty:{780:12}}};
    PK_S3.raboty[58] = {rus_name:'Охота на волков', name:'wolf', malus:208, navyki:{hide:2,pitfall:2,animal:1}, resultaty:{dengi:21, opyt:63, vezenie:15, boom:67, produkty:{763:11}}};
    PK_S3.raboty[59] = {rus_name:'Охрана каравана', name:'track', malus:213, navyki:{hide:2,leadership:2,tactic:1}, resultaty:{dengi:10, opyt:60, vezenie:30, boom:33, produkty:{778:12}}};
    PK_S3.raboty[60] = {rus_name:'Конокрадство', name:'ox', malus:238, navyki:{reflex:1,hide:1,pitfall:2,animal:1}, resultaty:{dengi:64, opyt:34, vezenie:18, boom:43, produkty:{787:13}}};
    PK_S3.raboty[61] = {rus_name:'Охрана тюрьмы', name:'guard', malus:222, navyki:{punch:1,reflex:1,shot:1,appearance:2}, resultaty:{dengi:25, opyt:35, vezenie:38, boom:4, produkty:{750:1}}};
    PK_S3.raboty[62] = {rus_name:'Миссионерство', name:'bible', malus:236, navyki:{tough:1,ride:1,trade:1,appearance:2}, resultaty:{dengi:5, opyt:61, vezenie:52, boom:77, produkty:{768:1}}};
    PK_S3.raboty[63] = {rus_name:'Пони-экспресс', name:'ponyexpress', malus:226, navyki:{endurance:1,ride:2,shot:1,animal:1}, resultaty:{dengi:15, opyt:45, vezenie:51, boom:44, produkty:{779:5}}};
    PK_S3.raboty[64] = {rus_name:'Торговля оружием с индейцами', name:'weapons', malus:258, navyki:{hide:1,shot:1,repair:1,trade:2}, resultaty:{dengi:15, opyt:35, vezenie:72, boom:82, produkty:{783:4}}};
    PK_S3.raboty[65] = {rus_name:'Мародёрство', name:'dead', malus:266, navyki:{tough:1,hide:1,finger_dexterity:2,repair:1}, resultaty:{dengi:14, opyt:14, vezenie:90, boom:34, produkty:{774:1,723:1}}};
    PK_S3.raboty[66] = {rus_name:'Охота на гризли', name:'grizzly', malus:281, navyki:{hide:1,shot:1,pitfall:2,animal:1}, resultaty:{dengi:25, opyt:78, vezenie:35, boom:71, produkty:{731:3}}};
    PK_S3.raboty[67] = {rus_name:'Добыча нефти', name:'oil', malus:295, navyki:{build:1,tough:1,endurance:1,leadership:1,trade:1}, resultaty:{dengi:83, opyt:25, vezenie:20, boom:7, produkty:{752:25}}};
    PK_S3.raboty[68] = {rus_name:'Поиски клада', name:'treasure_hunting', malus:294, navyki:{hide:2,repair:2,tactic:1}, resultaty:{dengi:20, opyt:20, vezenie:83, boom:24, produkty:{726:1}}};
    PK_S3.raboty[69] = {rus_name:'Служба в армии', name:'army', malus:299, navyki:{endurance:1,swim:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:55, opyt:76, vezenie:17, boom:35, produkty:{727:2}}};
    PK_S3.raboty[70] = {rus_name:'Мелкое воровство', name:'steal', malus:372, navyki:{reflex:1,hide:1,shot:1,pitfall:1,finger_dexterity:1}, resultaty:{dengi:48, opyt:50, vezenie:74, boom:66, produkty:{728:4}}};
    PK_S3.raboty[71] = {rus_name:'Служба наёмником', name:'mercenary', malus:332, navyki:{tough:1,swim:1,shot:1,repair:1,appearance:1}, resultaty:{dengi:92, opyt:52, vezenie:23, boom:65, produkty:{1708:85}}};
    PK_S3.raboty[72] = {rus_name:'Преследование бандитов', name:'bandits', malus:385, navyki:{tough:1,endurance:1,hide:1,leadership:1,tactic:1}, resultaty:{dengi:28, opyt:75, vezenie:85, boom:83, produkty:{729:5}}};
    PK_S3.raboty[73] = {rus_name:'Налёт', name:'aggression', malus:422, navyki:{hide:2,pitfall:1,tactic:1,appearance:1}, resultaty:{dengi:78, opyt:27, vezenie:78, boom:86, produkty:{730:13,774:1}}};
    PK_S3.raboty[74] = {rus_name:'Нападение на дилижанс', name:'diligence_aggression', malus:476, navyki:{shot:1,pitfall:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:43, opyt:73, vezenie:95, boom:67, produkty:{733:15}}};
    PK_S3.raboty[75] = {rus_name:'Охота за преступниками', name:'bounty', malus:426, navyki:{punch:1,endurance:1,shot:1,pitfall:1,appearance:1}, resultaty:{dengi:92, opyt:32, vezenie:79, boom:72, produkty:{1756:25}}};
    PK_S3.raboty[76] = {rus_name:'Перевозка заключённых', name:'captured', malus:438, navyki:{endurance:1,reflex:1,hide:1,tactic:2}, resultaty:{dengi:23, opyt:69, vezenie:85, boom:44, produkty:{764:4}}};
    PK_S3.raboty[77] = {rus_name:'Нападение на поезд', name:'train', malus:506, navyki:{endurance:1,hide:1,shot:1,pitfall:1,trade:1}, resultaty:{dengi:67, opyt:87, vezenie:92, boom:96, produkty:{1755:1}}};
    PK_S3.raboty[78] = {rus_name:'Кража со взломом', name:'burglary', malus:518, navyki:{endurance:1,hide:2,tactic:1,trade:1}, resultaty:{dengi:80, opyt:34, vezenie:81, boom:26, produkty:{786:12}}};
    PK_S3.raboty[79] = {rus_name:'Знахарство', name:'quackery', malus:316, navyki:{hide:1,shot:1,pitfall:1,trade:1,appearance:1}, resultaty:{dengi:65, opyt:50, vezenie:52, boom:67, produkty:{794:9}}};
    PK_S3.raboty[80] = {rus_name:'Парламентёрство', name:'peace', malus:367, navyki:{endurance:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:33, opyt:68, vezenie:76, boom:44, produkty:{751:8}}};
    PK_S3.raboty[82] = {rus_name:'Речные перевозки', name:'ship', malus:348, navyki:{punch:1,swim:2,leadership:2}, resultaty:{dengi:82, opyt:35, vezenie:15, boom:14, produkty:{788:12}}};
    PK_S3.raboty[83] = {rus_name:'Контрабанда', name:'smuggle', malus:411, navyki:{hide:1,swim:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:62, opyt:45, vezenie:83, boom:56, produkty:{729:22}}};
    PK_S3.raboty[84] = {rus_name:'Строительство ранчо', name:'ranch', malus:221, navyki:{build:2,endurance:1,ride:1,animal:1}, resultaty:{dengi:28, opyt:61, vezenie:17, boom:24, produkty:{784:45}}};
    PK_S3.raboty[85] = {rus_name:'Добыча железа', name:'iron', malus:177, navyki:{build:1,punch:1,reflex:1,finger_dexterity:1,repair:1}, resultaty:{dengi:52, opyt:32, vezenie:15, boom:29, produkty:{790:38, 753:2}}};
    PK_S3.raboty[86] = {rus_name:'Сбор агавы', name:'agave', malus:153, navyki:{punch:1,tough:2,endurance:1,finger_dexterity:1}, resultaty:{dengi:25, opyt:42, vezenie:12, boom:27, produkty:{792:12}}};
    PK_S3.raboty[87] = {rus_name:'Сбор помидоров', name:'tomato', malus:43, navyki:{ride:1,finger_dexterity:1,leadership:1,tactic:1,trade:1}, resultaty:{dengi:13, opyt:12, vezenie:7, boom:11, produkty:{793:33}}};
    PK_S3.raboty[88] = {rus_name:'Набивка подков', name:'horseshoe', malus:93, navyki:{punch:1,ride:2,animal:2}, resultaty:{dengi:14, opyt:28, vezenie:9, boom:23, produkty:{754:22}}};
    PK_S3.raboty[90] = {rus_name:'Тушение пожара', name:'fire', malus:229, navyki:{build:1,tough:1,reflex:1,leadership:1,tactic:1}, resultaty:{dengi:15, opyt:41, vezenie:65, boom:45, produkty:{781:2}}};
    PK_S3.raboty[91] = {rus_name:'Сбор апельсинов', name:'orange', malus:67, navyki:{endurance:1,reflex:1,pitfall:1,repair:1,tactic:1}, resultaty:{dengi:14, opyt:25, vezenie:10, boom:21, produkty:{791:25}}};
    PK_S3.raboty[92] = {rus_name:'Чистка хлева', name:'muck_out', malus:8, navyki:{tough:1,ride:1,repair:1,animal:2}, resultaty:{dengi:4, opyt:5, vezenie:2, boom:6, produkty:{797:5}}};
    PK_S3.raboty[93] = {rus_name:'Чистка обуви', name:'shoes', malus:1, navyki:{hide:1,pitfall:1,finger_dexterity:1,trade:1,appearance:1}, resultaty:{dengi:3, opyt:2, vezenie:3, boom:2, produkty:{789:35}}};

    PK_S3.raboty[94] = {rus_name:'Крепление шпор', name:'socks_darn', malus:1, navyki:{tough:2,endurance:1,finger_dexterity:2}, resultaty:{dengi:1, opyt:4, vezenie:0, boom:2, produkty:{1807:75}}};
    PK_S3.raboty[95] = {rus_name:'Уборка картошки', name:'potatoe', malus:113, navyki:{tough:2,endurance:2,finger_dexterity:1}, resultaty:{dengi:8, opyt:53, vezenie:5, boom:5, produkty:{1808:75}}};
    PK_S3.raboty[96] = {rus_name:'Кормление скота', name:'feed_animal', malus:147, navyki:{punch:1,tough:1,leadership:1,animal:2}, resultaty:{dengi:17, opyt:60, vezenie:10, boom:20, produkty:{1809:50}}};
    PK_S3.raboty[97] = {rus_name:'Сбор тыквы', name:'pumpkin', malus:175, navyki:{punch:2,tough:1,endurance:1,tactic:1}, resultaty:{dengi:45, opyt:45, vezenie:10, boom:10, produkty:{1810:60}}};
    PK_S3.raboty[98] = {rus_name:'Сбор черники', name:'blueberries', malus:200, navyki:{punch:1,tough:1,ride:2,finger_dexterity:1}, resultaty:{dengi:52, opyt:35, vezenie:35, boom:15, produkty:{1811:65}}};
    PK_S3.raboty[99] = {rus_name:'Озеленение', name:'plant_trees', malus:226, navyki:{build:2,ride:1,finger_dexterity:1,tactic:1}, resultaty:{dengi:34, opyt:25, vezenie:54, boom:25, produkty:{1812:30}}};
    PK_S3.raboty[100] = {rus_name:'Сбор орлиных перьев', name:'gather_feathers', malus:276, navyki:{finger_dexterity:1, repair:2,tactic:1,trade:1}, resultaty:{dengi:47, opyt:23, vezenie:60, boom:15, produkty:{1813:20}}};
    PK_S3.raboty[101] = {rus_name:'Сбор лотоса', name:'lotus_gathering', malus:351, navyki:{tough:1,swim:2,finger_dexterity:1,repair:1}, resultaty:{dengi:54, opyt:45, vezenie:35, boom:20, produkty:{1814:15}}};
    PK_S3.raboty[102] = {rus_name:'Ловля крабов', name:'crab_hunting', malus:376, navyki:{tough:1,reflex:1,swim:2,finger_dexterity:1}, resultaty:{dengi:67, opyt:56, vezenie:35, boom:12, produkty:{1815:10}}};
    PK_S3.raboty[103] = {rus_name:'Преподавание', name:'teaching', malus:401, navyki:{endurance:1,pitfall:1,leadership:1,appearance:2}, resultaty:{dengi:54, opyt:79, vezenie:5, boom:23, produkty:{1816:25}}};
    PK_S3.raboty[104] = {rus_name:'Служба шерифом', name:'sheriff_work', malus:411, navyki:{reflex:1,shot:2,leadership:1,appearance:1}, resultaty:{dengi:67, opyt:76, vezenie:56, boom:45, produkty:{1817:50}}};
    PK_S3.raboty[105] = {rus_name:'Добыча серы', name:'sulfur_gathering', malus:421, navyki:{punch:2,reflex:2,repair:1}, resultaty:{dengi:76, opyt:34, vezenie:78, boom:32, produkty:{1818:10}}};
    PK_S3.raboty[106] = {rus_name:'Сплав по бурному потоку', name:'wildwater', malus:426, navyki:{reflex:2,swim:2,tactic:1}, resultaty:{dengi:84, opyt:74, vezenie:30, boom:57, produkty:{999:25}}};
    PK_S3.raboty[107] = {rus_name:'Шулерство', name:'gambler', malus:431, navyki:{reflex:1,hide:1,shot:1,trade:1,appearance:1}, resultaty:{dengi:67, opyt:57, vezenie:69, boom:63, produkty:{1819:25}}};
    PK_S3.raboty[108] = {rus_name:'Отлов гремучих змей', name:'rattlesnake', malus:441, navyki:{reflex:2,hide:1,pitfall:1,animal:1}, resultaty:{dengi:72, opyt:46, vezenie:71, boom:73, produkty:{1820:15}}};
    PK_S3.raboty[109] = {rus_name:'Добыча селитры', name:'salpeter_gathering', malus:451, navyki:{tough:2,endurance:1,finger_dexterity:1,repair:1}, resultaty:{dengi:62, opyt:53, vezenie:58, boom:27, produkty:{1821:35}}};
    PK_S3.raboty[110] = {rus_name:'Перегонка лошадей', name:'horse_transport', malus:451, navyki:{ride:2,leadership:1,animal:2}, resultaty:{dengi:66, opyt:82, vezenie:69, boom:48, produkty:{1822:10}}};
    PK_S3.raboty[111] = {rus_name:'Организация родео', name:'rodeo', malus:500, navyki:{endurance:1,ride:2,pitfall:1,animal:1}, resultaty:{dengi:76, opyt:56, vezenie:69, boom:78, produkty:{1823:5}}};
    PK_S3.raboty[112] = {rus_name:'Коммивояжёрство', name:'travelling_salesman', malus:501, navyki:{tough:1,pitfall:1,trade:2,appearance:1}, resultaty:{dengi:59, opyt:46, vezenie:97, boom:67, produkty:{999:7}}};
    PK_S3.raboty[113] = {rus_name:'Брачный аферист', name:'con_artist', malus:521, navyki:{endurance:1,pitfall:1,tactic:1,trade:1,appearance:1}, resultaty:{dengi:78, opyt:89, vezenie:35, boom:83, produkty:{1836:2}}};
    PK_S3.raboty[114] = {rus_name:'Охота на пуму', name:'cougar', malus:541, navyki:{shot:2,pitfall:1,tactic:1,animal:1}, resultaty:{dengi:46, opyt:89, vezenie:39, boom:93, produkty:{1824:20}}};
    PK_S3.raboty[115] = {rus_name:'Сбор индигоферы', name:'indigo_gathering', malus:591, navyki:{reflex:1,finger_dexterity:2,tactic:1,trade:1}, resultaty:{dengi:87, opyt:73, vezenie:29, boom:69, produkty:{1825:5}}};
    PK_S3.raboty[116] = {rus_name:'Доставка спиртного', name:'alcohol', malus:601, navyki:{ride:1,hide:2,shot:1,leadership:1}, resultaty:{dengi:74, opyt:91, vezenie:34, boom:56, produkty:{1826:50}}};
    PK_S3.raboty[117] = {rus_name:'Добыча свинца', name:'lead_gathering', malus:621, navyki:{punch:1,finger_dexterity:1,repair:2,leadership:1}, resultaty:{dengi:89, opyt:72, vezenie:22, boom:72, produkty:{1827:30}}};
    PK_S3.raboty[118] = {rus_name:'Поиск редких самоцветов', name:'gem_gathering', malus:641, navyki:{punch:2,endurance:1,shot:1,repair:1}, resultaty:{dengi:91, opyt:78, vezenie:23, boom:77, produkty:{721:45, 1828:2, 1829:1, 1830:2}}};
    PK_S3.raboty[119] = {rus_name:'Сооружение миссии', name:'mission', malus:571, navyki:{build:2,punch:1,endurance:1,repair:1}, resultaty:{dengi:92, opyt:82, vezenie:54, boom:38, produkty:{1831:3}}};
    PK_S3.raboty[120] = {rus_name:'Строительство казино', name:'casino', malus:651, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:78, opyt:92, vezenie:23, boom:45, produkty:{1832:10}}};
    PK_S3.raboty[121] = {rus_name:'Служба шерифом округа', name:'marshall', malus:701, navyki:{ride:1,shot:2,pitfall:1,appearance:1}, resultaty:{dengi:87, opyt:90, vezenie:60, boom:94, produkty:{1833:1}}};
    PK_S3.raboty[122] = {rus_name:'Борьба с бандитизмом', name:'shatter_gang', malus:726, navyki:{endurance:1,hide:2,pitfall:1,tactic:1}, resultaty:{dengi:84, opyt:70, vezenie:89, boom:99, produkty:{999:10}}};
    PK_S3.raboty[123] = {rus_name:'Ограбление банка', name:'bankrobbery', malus:741, navyki:{hide:2,pitfall:1,leadership:1,trade:1}, resultaty:{dengi:93, opyt:84, vezenie:30, boom:89, produkty:{1837:1}}};
    PK_S3.raboty[124] = {rus_name:'Освобождение рабов', name:'free_slaves', malus:751, navyki:{swim:1,shot:1,leadership:1,tactic:1,appearance:1}, resultaty:{dengi:84, opyt:93, vezenie:28, boom:92, produkty:{1834:5}}};
    PK_S3.raboty[125] = {rus_name:'Выступление в шоу Буффало Билла', name:'buffelo_bill', malus:801, navyki:{ride:1,shot:1,animal:1,appearance:2}, resultaty:{dengi:92, opyt:94, vezenie:65, boom:70, produkty:{1835:5}}};
    PK_S3.raboty[126] = {rus_name:'Строительство частокола', name:'build_palisade', malus:301, navyki:{build:1,punch:1,endurance:1,repair:1,leadership:1}, resultaty:{dengi:33, opyt:65, vezenie:20, boom:30, produkty:{742:4, 747:5, 761:6, 765:5}}};

    PK_S3.raboty[PK_S3.raboty.build] = {rus_name:'!Строительство города/форта', name:'build', malus:0, navyki:{build:3,repair:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};
    PK_S3.raboty[PK_S3.raboty.moving] = {rus_name:'!Передвижение', name:'moving', malus:0, navyki:{ride:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};
    PK_S3.raboty[PK_S3.raboty.health] = {rus_name:'!СОН-жизнь', name:'health', malus:0, navyki:{health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};
    PK_S3.raboty[PK_S3.raboty.energy] = {rus_name:'!СОН-энергия', name:'energy', malus:0, navyki:{health:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};
//
    PK_S3.raboty[301] = {rus_name:'Форт. Атака', name:'attack', malus:0, navyki:{aim:.5,dodge:.5,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[302] = {rus_name:'Форт. Атака (меткость)', name:'attack', malus:0, navyki:{aim:1,dodge:.001,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[303] = {rus_name:'Форт. Атака (уворот)', name:'attack', malus:0, navyki:{aim:.001,dodge:1,endurance:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[304] = {rus_name:'Форт. Защита', name:'defend', malus:0, navyki:{aim:.5,dodge:.5,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};
    PK_S3.raboty[305] = {rus_name:'Форт. Защита (меткость)', name:'defend', malus:0, navyki:{aim:1,dodge:.001,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};
    PK_S3.raboty[306] = {rus_name:'Форт. Защита (уворот)', name:'defend', malus:0, navyki:{aim:.001,dodge:1,hide:1,leadership:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:50, produkty:{}}};
//    
    PK_S3.raboty[401] = {rus_name:'!Стрелок-стрелок атака', name:'sh_vs_sh_at', malus:0, navyki:{aim:1, dodge:1, shot:1, reflex:1, appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[402] = {rus_name:'!Стрелок-стрелок защита', name:'sh_vs_sh_de', malus:0, navyki:{aim:1, dodge:1, shot:1, reflex:1, tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[403] = {rus_name:'!Стрелок-ударник атака', name:'sh_vs_me_at', malus:0, navyki:{aim:1, dodge:1, shot:1, tough:1, appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[404] = {rus_name:'!Стрелок-ударник защита', name:'sh_vs_me_de', malus:0, navyki:{aim:1, dodge:1, shot:1, tough:1, tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[405] = {rus_name:'!Стрелок-все защита', name:'sh_vs_al_de', malus:0, navyki:{aim:1, dodge:1, shot:1, tough:0.75, reflex:0.75}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[406] = {rus_name:'!Ударник-стрелок атака', name:'me_vs_sh_at', malus:0, navyki:{aim:1, dodge:1, punch:1, reflex:1, appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[407] = {rus_name:'!Ударник-стрелок защита', name:'me_vs_sh_de', malus:0, navyki:{aim:1, dodge:1, punch:1, reflex:1, tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[408] = {rus_name:'!Ударник-ударник атака', name:'me_vs_me_at', malus:0, navyki:{aim:1, dodge:1, punch:1, tough:1, appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[409] = {rus_name:'!Ударник-ударник защита', name:'me_vs_me_de', malus:0, navyki:{aim:1, dodge:1, punch:1, tough:1, tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[410] = {rus_name:'!Ударник-все защита', name:'me_vs_al_de', malus:0, navyki:{aim:1, dodge:1, punch:1, tough:0.75, reflex:0.75}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
//
    PK_S3.raboty[421] = {rus_name:'Блеф, меткость', name:'duel421', malus:0, navyki:{appearance:1, aim:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[422] = {rus_name:'Блеф, меткость, стрельба', name:'duel422', malus:0, navyki:{aim:1,shot:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[423] = {rus_name:'Блеф, меткость, удар', name:'duel423', malus:0, navyki:{aim:1,punch:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[424] = {rus_name:'Блеф, меткость, уворот', name:'duel424', malus:0, navyki:{aim:1,dodge:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[425] = {rus_name:'Блеф, меткость, уворот, стрельба', name:'duel425', malus:0, navyki:{aim:1,dodge:1,appearance:1, shot:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[426] = {rus_name:'Блеф, уворот', name:'duel426', malus:0, navyki:{dodge:1,appearance:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[427] = {rus_name:'Тактика, уворот', name:'duel427', malus:0, navyki:{dodge:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[428] = {rus_name:'Тактика, меткость, уворот', name:'duel428', malus:0, navyki:{aim:1,dodge:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[429] = {rus_name:'Тактика, меткость, уворот, стрельба', name:'duel429', malus:0, navyki:{aim:1,dodge:1,tactic:1, shot:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[430] = {rus_name:'Стрельба, меткость', name:'duel430', malus:0, navyki:{aim:1,shot:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[431] = {rus_name:'Стрельба, уворот', name:'duel431', malus:0, navyki:{dodge:1,shot:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[432] = {rus_name:'Удар, меткость', name:'duel432', malus:0, navyki:{aim:1,punch:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[433] = {rus_name:'Удар, реакция', name:'duel433', malus:0, navyki:{punch:1,reflex:1,tough:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[434] = {rus_name:'Удар, стойкость', name:'duel434', malus:0, navyki:{punch:1,reflex:0.25,tough:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[435] = {rus_name:'Удар, меткость, реакция', name:'duel435', malus:0, navyki:{aim:1,punch:1,reflex:1,tough:0.25}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[436] = {rus_name:'Удар, меткость, стойкость', name:'duel436', malus:0, navyki:{aim:1,punch:1,reflex:0.25,tough:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[437] = {rus_name:'Меткость, реакция', name:'duel437', malus:0, navyki:{aim:1,reflex:1,tough:0.5}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[438] = {rus_name:'Меткость, стойкость', name:'duel438', malus:0, navyki:{aim:1,reflex:0.25,tough:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[439] = {rus_name:'Меткость, уворот', name:'duel439', malus:0, navyki:{aim:1,dodge:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[440] = {rus_name:'Блеф, меткость, уворот, удар', name:'duel440', malus:0, navyki:{aim:1,dodge:1,appearance:1, punch:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[441] = {rus_name:'Блеф, уворот, стрельба', name:'duel441', malus:0, navyki:{dodge:1,appearance:1, shot:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[442] = {rus_name:'Блеф, уворот, удар', name:'duel442', malus:0, navyki:{dodge:1,appearance:1, punch:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[443] = {rus_name:'Тактика, меткость, уворот, удар', name:'duel443', malus:0, navyki:{aim:1,dodge:1,tactic:1, punch:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[444] = {rus_name:'Тактика, меткость', name:'duel444', malus:0, navyki:{aim:1,tactic:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
    PK_S3.raboty[445] = {rus_name:'Удар, уворот', name:'duel445', malus:0, navyki:{dodge:1,punch:1}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:100, produkty:{}}};
//
    PK_S3.komplekty.max = 9;
    PK_S3.komplekty.set_farmer=[];
    PK_S3.komplekty.set_farmer[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[2] = {bonus:{attributes:{flexibility:1, strength:1}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[2].raboty[8]=10;PK_S3.komplekty.set_farmer[2].raboty[12]=10;PK_S3.komplekty.set_farmer[2].raboty[13]=10;
    PK_S3.komplekty.set_farmer[3] = {bonus:{attributes:{flexibility:1, strength:1, dexterity:1, charisma:1}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[3].raboty[8]=10;PK_S3.komplekty.set_farmer[3].raboty[12]=10;PK_S3.komplekty.set_farmer[3].raboty[13]=10;
    PK_S3.komplekty.set_farmer[3].raboty[88]=20;PK_S3.komplekty.set_farmer[3].raboty[30]=20;PK_S3.komplekty.set_farmer[3].raboty[22]=20;
    PK_S3.komplekty.set_farmer[4] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[4].raboty[8]=10;PK_S3.komplekty.set_farmer[4].raboty[12]=10;PK_S3.komplekty.set_farmer[4].raboty[13]=10;
    PK_S3.komplekty.set_farmer[4].raboty[88]=20;PK_S3.komplekty.set_farmer[4].raboty[30]=20;PK_S3.komplekty.set_farmer[4].raboty[22]=20;
    PK_S3.komplekty.set_farmer[4].raboty[48]=40;PK_S3.komplekty.set_farmer[4].raboty[84]=40;PK_S3.komplekty.set_farmer[4].raboty[44]=40;
    PK_S3.komplekty.set_farmer[5] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[5].raboty[8]=10;PK_S3.komplekty.set_farmer[5].raboty[12]=10;PK_S3.komplekty.set_farmer[5].raboty[13]=10;
    PK_S3.komplekty.set_farmer[5].raboty[88]=20;PK_S3.komplekty.set_farmer[5].raboty[30]=20;PK_S3.komplekty.set_farmer[5].raboty[22]=20;
    PK_S3.komplekty.set_farmer[5].raboty[48]=40;PK_S3.komplekty.set_farmer[5].raboty[84]=40;PK_S3.komplekty.set_farmer[5].raboty[44]=40;PK_S3.komplekty.set_farmer[5].raboty[95]=40;
    PK_S3.komplekty.set_farmer[6] = {bonus:{attributes:{flexibility:2, strength:2, dexterity:2, charisma:2}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[6].raboty[8]=10;PK_S3.komplekty.set_farmer[6].raboty[12]=10;PK_S3.komplekty.set_farmer[6].raboty[13]=10;
    PK_S3.komplekty.set_farmer[6].raboty[88]=20;PK_S3.komplekty.set_farmer[6].raboty[30]=20;PK_S3.komplekty.set_farmer[6].raboty[22]=20;
    PK_S3.komplekty.set_farmer[6].raboty[48]=40;PK_S3.komplekty.set_farmer[6].raboty[84]=40;PK_S3.komplekty.set_farmer[6].raboty[44]=40;PK_S3.komplekty.set_farmer[6].raboty[95]=40;PK_S3.komplekty.set_farmer[6].raboty[110]=40;
    PK_S3.komplekty.set_farmer[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_farmer[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_indian=[];
    PK_S3.komplekty.set_indian[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_indian[2] = {bonus:{attributes:{flexibility:2}, skills:{hide:8}}, speed:(1 / 1.15), raboty:[]};
    PK_S3.komplekty.set_indian[2].raboty[51]=30;
    PK_S3.komplekty.set_indian[3] = {bonus:{attributes:{flexibility:5}, skills:{hide:8, swim:8}}, speed:(1 / 1.3), raboty:[]};
    PK_S3.komplekty.set_indian[3].raboty[51]=30;PK_S3.komplekty.set_indian[3].raboty[52]=40;
    PK_S3.komplekty.set_indian[4] = {bonus:{attributes:{flexibility:8}, skills:{hide:8, swim:8, pitfall:8}}, speed:(1 / 1.45), raboty:[]};
    PK_S3.komplekty.set_indian[4].raboty[51]=30;PK_S3.komplekty.set_indian[4].raboty[52]=40;PK_S3.komplekty.set_indian[4].raboty[58]=50;
    PK_S3.komplekty.set_indian[5] = {bonus:{attributes:{flexibility:12}, skills:{hide:8, swim:8, pitfall:8, animal:8}}, speed:(1 / 1.6), raboty:[]};
    PK_S3.komplekty.set_indian[5].raboty[51]=30;PK_S3.komplekty.set_indian[5].raboty[52]=40;PK_S3.komplekty.set_indian[5].raboty[58]=50;PK_S3.komplekty.set_indian[5].raboty[66]=60;
    PK_S3.komplekty.set_indian[6] = {bonus:{attributes:{flexibility:16}, skills:{hide:8, swim:8, pitfall:8, animal:8, shot:8}}, speed:(1 / 1.75), raboty:[]};
    PK_S3.komplekty.set_indian[6].raboty[51]=30;PK_S3.komplekty.set_indian[6].raboty[52]=40;PK_S3.komplekty.set_indian[6].raboty[58]=50;PK_S3.komplekty.set_indian[6].raboty[66]=60;PK_S3.komplekty.set_indian[6].raboty[114]=70;
    PK_S3.komplekty.set_indian[7] = {bonus:{attributes:{flexibility:21}, skills:{tough:8, hide:8, swim:8, pitfall:8, animal:8, shot:8}}, speed:(1 / 1.9), raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_indian[7].raboty[i]=25};PK_S3.komplekty.set_indian[7].raboty[PK_S3.raboty.build]=25;
    PK_S3.komplekty.set_indian[7].raboty[51]+=30;PK_S3.komplekty.set_indian[7].raboty[52]+=40;PK_S3.komplekty.set_indian[7].raboty[58]+=50;PK_S3.komplekty.set_indian[7].raboty[66]+=60;PK_S3.komplekty.set_indian[7].raboty[114]+=70;
    PK_S3.komplekty.set_indian[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_indian[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_mexican=[];
    PK_S3.komplekty.set_mexican[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_mexican[2] = {bonus:{attributes:{strength:1}, skills:{}}, speed:(1 / 1.12), raboty:[]};
    PK_S3.komplekty.set_mexican[3] = {bonus:{attributes:{strength:2}, skills:{}}, speed:(1 / 1.24), raboty:[]};
    PK_S3.komplekty.set_mexican[3].raboty[86]=60;
    PK_S3.komplekty.set_mexican[4] = {bonus:{attributes:{strength:4}, skills:{}}, speed:(1 / 1.36), raboty:[]};
    PK_S3.komplekty.set_mexican[4].raboty[86]=60;PK_S3.komplekty.set_mexican[4].raboty[67]=70;
    PK_S3.komplekty.set_mexican[5] = {bonus:{attributes:{strength:6}, skills:{}}, speed:(1 / 1.48), raboty:[]};
    PK_S3.komplekty.set_mexican[5].raboty[86]=60;PK_S3.komplekty.set_mexican[5].raboty[67]=70;PK_S3.komplekty.set_mexican[5].raboty[83]=80;
    PK_S3.komplekty.set_mexican[6] = {bonus:{attributes:{strength:9}, skills:{}}, speed:(1 / 1.6), raboty:[]};
    PK_S3.komplekty.set_mexican[6].raboty[86]=60;PK_S3.komplekty.set_mexican[6].raboty[67]=70;PK_S3.komplekty.set_mexican[6].raboty[83]=80;PK_S3.komplekty.set_mexican[6].raboty[50]=90;
    PK_S3.komplekty.set_mexican[7] = {bonus:{attributes:{strength:12}, skills:{}}, speed:(1 / 1.72), raboty:[]};
    PK_S3.komplekty.set_mexican[7].raboty[86]=60;PK_S3.komplekty.set_mexican[7].raboty[67]=70;PK_S3.komplekty.set_mexican[7].raboty[83]=80;PK_S3.komplekty.set_mexican[7].raboty[50]=90;PK_S3.komplekty.set_mexican[7].raboty[115]=100;
    PK_S3.komplekty.set_mexican[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_mexican[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_quackery=[];
    PK_S3.komplekty.set_quackery[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_quackery[2] = {bonus:{attributes:{dexterity:1}, skills:{endurance:5, trade:5}}, raboty:[]};
    PK_S3.komplekty.set_quackery[2].raboty[79]=30;
    PK_S3.komplekty.set_quackery[3] = {bonus:{attributes:{dexterity:2}, skills:{endurance:10, trade:10}}, raboty:[]};
    PK_S3.komplekty.set_quackery[3].raboty[79]=60;
    PK_S3.komplekty.set_quackery[4] = {bonus:{attributes:{dexterity:4}, skills:{endurance:15, trade:15}}, raboty:[]};
    PK_S3.komplekty.set_quackery[4].raboty[79]=90;
    PK_S3.komplekty.set_quackery[5] = {bonus:{attributes:{dexterity:6}, skills:{endurance:20, trade:20}}, raboty:[]};
    PK_S3.komplekty.set_quackery[5].raboty[79]=120;
    PK_S3.komplekty.set_quackery[6] = {bonus:{attributes:{dexterity:9}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18}}, raboty:[]};
    PK_S3.komplekty.set_quackery[6].raboty[79]=120;
    PK_S3.komplekty.set_quackery[7] = {bonus:{attributes:{dexterity:12}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18, tactic:18, appearance:18, dodge:18}}, raboty:[]};
    PK_S3.komplekty.set_quackery[7].raboty[79]=120;PK_S3.komplekty.set_quackery[7].raboty[113]=50;
    PK_S3.komplekty.set_quackery[8] = {bonus:{attributes:{dexterity:16}, skills:{endurance:20, trade:20, reflex:18, tough:18, aim:18, shot:18, tactic:18, appearance:18, dodge:18}}, speed:0.6667, raboty:[]};
    PK_S3.komplekty.set_quackery[8].raboty[79]=120;PK_S3.komplekty.set_quackery[8].raboty[113]=100;
    PK_S3.komplekty.set_quackery[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_pilgrim_male=[];
    PK_S3.komplekty.set_pilgrim_male[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[2].raboty[PK_S3.raboty.build]=5;
    PK_S3.komplekty.set_pilgrim_male[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[3].raboty[PK_S3.raboty.build]=15;
    PK_S3.komplekty.set_pilgrim_male[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[4].raboty[PK_S3.raboty.build]=30;
    PK_S3.komplekty.set_pilgrim_male[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[5].raboty[PK_S3.raboty.build]=50;PK_S3.komplekty.set_pilgrim_male[5].raboty[62]=150;
    PK_S3.komplekty.set_pilgrim_male[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[6].raboty[PK_S3.raboty.build]=75;PK_S3.komplekty.set_pilgrim_male[6].raboty[62]=150;PK_S3.komplekty.set_pilgrim_male[6].raboty[119]=175;
    PK_S3.komplekty.set_pilgrim_male[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_male[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_pilgrim_female=[];
    PK_S3.komplekty.set_pilgrim_female[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[2].raboty[PK_S3.raboty.build]=5;
    PK_S3.komplekty.set_pilgrim_female[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[3].raboty[PK_S3.raboty.build]=15;
    PK_S3.komplekty.set_pilgrim_female[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[4].raboty[PK_S3.raboty.build]=30;
    PK_S3.komplekty.set_pilgrim_female[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[5].raboty[PK_S3.raboty.build]=50;PK_S3.komplekty.set_pilgrim_female[5].raboty[62]=150;
    PK_S3.komplekty.set_pilgrim_female[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[6].raboty[PK_S3.raboty.build]=75;PK_S3.komplekty.set_pilgrim_female[6].raboty[62]=150;PK_S3.komplekty.set_pilgrim_female[6].raboty[119]=175;
    PK_S3.komplekty.set_pilgrim_female[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_pilgrim_female[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_gentleman=[];
    PK_S3.komplekty.set_gentleman[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_gentleman[2] = {bonus:{attributes:{charisma:1}, skills:{appearance:8}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[2].raboty[i]=5};PK_S3.komplekty.set_gentleman[2].raboty[PK_S3.raboty.build]=5;
    PK_S3.komplekty.set_gentleman[3] = {bonus:{attributes:{charisma:3}, skills:{appearance:8, leadership:8}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[3].raboty[i]=15};PK_S3.komplekty.set_gentleman[3].raboty[PK_S3.raboty.build]=15;
    PK_S3.komplekty.set_gentleman[4] = {bonus:{attributes:{charisma:6}, skills:{appearance:8, leadership:8, trade:8}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[4].raboty[i]=30};PK_S3.komplekty.set_gentleman[4].raboty[PK_S3.raboty.build]=30;
    PK_S3.komplekty.set_gentleman[5] = {bonus:{attributes:{charisma:10}, skills:{appearance:16, leadership:8, trade:8}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[5].raboty[i]=50};PK_S3.komplekty.set_gentleman[5].raboty[PK_S3.raboty.build]=50;
    PK_S3.komplekty.set_gentleman[6] = {bonus:{attributes:{charisma:15}, skills:{appearance:25, leadership:8, trade:8}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[6].raboty[i]=75};PK_S3.komplekty.set_gentleman[6].raboty[PK_S3.raboty.build]=75;
    PK_S3.komplekty.set_gentleman[7] = {bonus:{attributes:{charisma:20}, skills:{appearance:25, leadership:8, trade:20}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_gentleman[7].raboty[i]=100};PK_S3.komplekty.set_gentleman[7].raboty[PK_S3.raboty.build]=100;
    PK_S3.komplekty.set_gentleman[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_gentleman[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.set_dancer=[];
    PK_S3.komplekty.set_dancer[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_dancer[2] = {bonus:{attributes:{charisma:2}, skills:{appearance:10}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[2].raboty[i]=5};PK_S3.komplekty.set_dancer[2].raboty[PK_S3.raboty.build]=5;
    PK_S3.komplekty.set_dancer[3] = {bonus:{attributes:{charisma:5}, skills:{appearance:10, animal:10}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[3].raboty[i]=15};PK_S3.komplekty.set_dancer[3].raboty[PK_S3.raboty.build]=15;
    PK_S3.komplekty.set_dancer[4] = {bonus:{attributes:{charisma:9}, skills:{appearance:10, animal:10, finger_dexterity:12}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[4].raboty[i]=30};PK_S3.komplekty.set_dancer[4].raboty[PK_S3.raboty.build]=30;
    PK_S3.komplekty.set_dancer[5] = {bonus:{attributes:{charisma:11},skills:{endurance :6, appearance:16, animal:10, finger_dexterity:12}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[5].raboty[i]=50};PK_S3.komplekty.set_dancer[5].raboty[PK_S3.raboty.build]=50;
    PK_S3.komplekty.set_dancer[6] = {bonus:{attributes:{charisma:15},skills:{endurance :6, appearance:25, animal:10, finger_dexterity:12}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[6].raboty[i]=75};PK_S3.komplekty.set_dancer[6].raboty[PK_S3.raboty.build]=75;
    PK_S3.komplekty.set_dancer[7] = {bonus:{attributes:{charisma:20},skills:{endurance :18, appearance:25, animal:10, finger_dexterity:12}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.set_dancer[7].raboty[i]=100};PK_S3.komplekty.set_dancer[7].raboty[PK_S3.raboty.build]=100;
    PK_S3.komplekty.set_dancer[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_dancer[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.fireworker_set=[];
    PK_S3.komplekty.fireworker_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[1].raboty[90]=15;
    PK_S3.komplekty.fireworker_set[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.fireworker_set[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.gold_set=[];
    PK_S3.komplekty.gold_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[2] = {bonus:{attributes:{}, skills:{health:10}}, speed:(1 / 1.2), raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.gold_set[2].raboty[i]=25};PK_S3.komplekty.gold_set[2].raboty[PK_S3.raboty.build]=25;
    PK_S3.komplekty.gold_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.gold_set[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};

    PK_S3.komplekty.greenhorn_set=[];
    PK_S3.komplekty.greenhorn_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[2].raboty[6]=10;
    PK_S3.komplekty.greenhorn_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[3].raboty[6]=10;PK_S3.komplekty.greenhorn_set[3].raboty[27]=40;
    PK_S3.komplekty.greenhorn_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[4].raboty[6]=10;PK_S3.komplekty.greenhorn_set[4].raboty[27]=40;PK_S3.komplekty.greenhorn_set[4].raboty[17]=25;
    PK_S3.komplekty.greenhorn_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[5].raboty[6]=10;PK_S3.komplekty.greenhorn_set[5].raboty[27]=40;PK_S3.komplekty.greenhorn_set[5].raboty[17]=25;PK_S3.komplekty.greenhorn_set[5].raboty[20]=20;
    PK_S3.komplekty.greenhorn_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.greenhorn_set[6].raboty[6]=10;PK_S3.komplekty.greenhorn_set[6].raboty[27]=40;PK_S3.komplekty.greenhorn_set[6].raboty[17]=25;PK_S3.komplekty.greenhorn_set[6].raboty[20]=20;PK_S3.komplekty.greenhorn_set[6].raboty[22]=30;
    PK_S3.komplekty.greenhorn_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.greenhorn_set[7].raboty[i]=5};PK_S3.komplekty.greenhorn_set[7].raboty[PK_S3.raboty.build]=5;
    PK_S3.komplekty.greenhorn_set[7].raboty[6]+=10;PK_S3.komplekty.greenhorn_set[7].raboty[27]+=40;PK_S3.komplekty.greenhorn_set[7].raboty[17]+=25;PK_S3.komplekty.greenhorn_set[7].raboty[20]+=20;PK_S3.komplekty.greenhorn_set[7].raboty[22]+=30;
    PK_S3.komplekty.greenhorn_set[8] = {bonus:{attributes:{strength:1, charisma:1}, skills:{}}, speed:(1 / 1.2), raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.greenhorn_set[8].raboty[i]=15};PK_S3.komplekty.greenhorn_set[8].raboty[PK_S3.raboty.build]=15;
    PK_S3.komplekty.greenhorn_set[8].raboty[6]+=10;PK_S3.komplekty.greenhorn_set[8].raboty[27]+=40;PK_S3.komplekty.greenhorn_set[8].raboty[17]+=25;PK_S3.komplekty.greenhorn_set[8].raboty[20]+=20;PK_S3.komplekty.greenhorn_set[8].raboty[22]+=30;
    PK_S3.komplekty.greenhorn_set[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
 
    PK_S3.komplekty.set_sleeper = [];  
    PK_S3.komplekty.set_sleeper[1] = {regeneration: 1.0, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[2] = {regeneration: 1.06, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[3] = {regeneration: 1.08, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[4] = {regeneration: 1.12, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[5] = {regeneration: 1.18, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[6] = {regeneration: 1.25, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[7] = {regeneration: 0, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[8] = {regeneration: 0, bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.set_sleeper[9] = {regeneration: 0, bonus:{attributes:{}, skills:{}}, raboty:[]};
    
    PK_S3.komplekty.collector_set = [];  
    PK_S3.komplekty.collector_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.collector_set[9] = {regeneration: 1.20, bonus:{attributes:{}, skills:{}}, speed:(1 / 1.5), raboty:[]};
    for (var i=1;i<PK_S3.raboty.max;++i) {PK_S3.komplekty.collector_set[9].raboty[i]=15};PK_S3.komplekty.collector_set[9].raboty[PK_S3.raboty.build]=15;
    
    PK_S3.komplekty.season_set = [];  
    PK_S3.komplekty.season_set[1] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[2] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[3] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[4] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[5] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[6] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[7] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[8] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    PK_S3.komplekty.season_set[9] = {bonus:{attributes:{}, skills:{}}, raboty:[]};
    
    PK_S3.my_name_is();
/*    
    var al='';
    var it = [];
    var hou = 4 * 6;
    for (var i = 0; i < PK_S3.raboty.max; ++i){
	if (!PK_S3.raboty[i]) continue;
	for (j in PK_S3.raboty[i].resultaty.produkty){
	    if (j==999) continue;
	    var val = PK_S3.raboty[i].resultaty.produkty[j] * hou / 100;
	    if (!it[j] || (it[j].value<val)){
		it[j] = {value:val, name:PK_S3.items[j].name};
	    }
	}
    }
    
    for (var i = 0; i < it.length; ++i){
	if (!it[i]) continue;
	al += it[i].name += '\t' + it[i].value + '\n';
    }
    alert (al);
 */

    PK_S3.setJSHTML = AjaxWindow.setJSHTML;
    AjaxWindow.setJSHTML = function(div,content) {
	PK_S3.setJSHTML(div,content);
	if (div&&(div.id.indexOf('window_job')!=-1)){
	    var tmp = document.createElement('div');
	    tmp.innerHTML = content;
	    var h2 = tmp.getElementsByTagName('h2')[0];
	    var name = h2.textContent;
	    var jd = div.getElementsByClassName('jobDetails');
	    if (jd) jd = jd[0];
	    if (!jd) return;
	    var divb = new Element ('div', {'style':'text-align:center; margin: -15px 0px 0px;'});
	    var span = document.createElement('span');
	    var html = '<a class="button_wrap button" style="padding: 0px 5px;" href="#" onClick="PK_S3.equip_motivation(\''+name+'\')">' + '<span class="button_left"></span><span class="button_middle">Одеться</span><span class="button_right"></span></a>';
	    span.innerHTML = html;
	    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
		if (PK_S3.cookies.save[i].name == name){
		    divb.appendChild(span);
		    break;
		}
	    }
	    var span = document.createElement('span');
	    var html = '<a class="button_wrap button" style="padding: 0px 5px;"  href="#" onClick="PK_S3.four_init(\''+name+'\')">' + '<span class="button_left"></span><span class="button_middle">Расчёт</span><span class="button_right"></span></a>';
	    span.innerHTML = html;
	    divb.appendChild(span);
	    jd.appendChild(divb);
	}
    }
    
     
    if (Wear && Wear.open){
	PK_S3.wear_open = Wear.open;
	Wear.open = function (){
	    PK_S3.wear_open();
	    setTimeout(PK_S3.spam_bagazh,PK_S3.odevalo4ka.wait_inventory);
	}
    }

};

PK_S3.fort_bonus = function (value){
    return isNaN(value) ? .5 : .5 + Math.pow(value, .4);
}

PK_S3.apply_fort_bonus_lead = function (bonus){
    var value = bonus - .5;
    value = Math.pow(value, 2.5);
    value *= PK_S3.bonus.leader;
    return PK_S3.fort_bonus(value);
}

PK_S3.qsort = function(arr, li, ri, key){
    if ((li+1)>=ri) return;
    var tmp;
    if (ri-li<15){
	for (var ii=li+1;ii<ri;++ii){
	    var tmp = arr[ii];
	    jj=ii-1;
	    while((jj>=li)&&(arr[jj][key]>tmp[key])){
		arr[jj+1]=arr[jj];
		--jj;
	    }
	    arr[jj+1]=tmp;
	}
    }
    else{
	var mi=parseInt((li+ri)/2,10);
	if (arr[li][key]>arr[ri-1][key]){
	    tmp=arr[li];
	    arr[li]=arr[ri-1];
	    arr[ri-1]=tmp;
	}
	if (arr[li][key]>arr[mi][key]){
	    tmp=arr[li];
	    arr[li]=arr[mi];
	    arr[mi]=tmp;
	}
	if (arr[mi][key]>arr[ri-1][key]){
	    tmp=arr[mi];
	    arr[mi]=arr[ri-1];
	    arr[ri-1]=tmp;
	}
	var em=arr[mi][key];
	var cl=li;
	var cr=ri-1;
	while(cl<cr){
	    while((cl<ri)&&(arr[cl][key]<=em)) ++cl;
	    while((cr>li)&&(arr[cr][key]>=em)) --cr;
	    if (cl<cr){
		tmp=arr[cl];
		arr[cl]=arr[cr];
		arr[cr]=tmp;
	    }
	}
	if (cr < ri -1){
	    PK_S3.qsort(arr,li,cr+1,key);
	}
	PK_S3.qsort(arr,cl,ri,key);
    }
};

PK_S3.bsort = function (arr, key){
    var left = 0;
    var right = arr.length - 1;
    var last = 0;
    while (left < right){
	for (var i = left; i < right; ++i){
	    if (arr[i][key] > arr[i+1][key]){
		var tmp = arr[i];
		arr[i] = arr[i+1];
		arr[i+1]=tmp;
		last = i;
	    }
	}
	right = last;
	for (var i = right; i > left; --i){
	    if (arr[i][key] < arr[i-1][key]){
		var tmp = arr[i];
		arr[i] = arr[i-1];
		arr[i-1]=tmp;
		last = i;
	    }
	}
	left = last;
    }
}

PK_S3.input_select_rdf = function(){
    var sl;
    var i1 = j1 = 4;
    var str_id = 'pk_s3_select_rab'
    for (var i = 0; i < 4; ++i){
	for (var j = 0; j < 3; ++j){
	    sl = document.getElementById(str_id+'_'+'rdfo'[i]+'onv'[j]);
	    if (sl.checked){
		i1 = i; j1 = j;
		break;
	    }
	}
    }
    sl = document.getElementById(str_id);
    sl.innerHTML = '';
    var ind_beg;
    var ind_end
    if (i1 == 0){
	ind_beg = 1; ind_end = PK_S3.raboty.fort_min;
    }
    else if (i1 == 1){
	ind_beg = PK_S3.raboty.duel_min; ind_end = PK_S3.raboty.duel_max;
    }
    else if (i1 == 2){
	ind_beg = PK_S3.raboty.fort_min; ind_end = PK_S3.raboty.fort_max;
    }
    else{
	ind_beg = ind_end = 0; j1 = 0;
    }
    if (j1 == 2) {
	ind_beg = ind_end = 0;
    }
    var srab = [];
    srab[0]={id:0, name:'Выберите работу, дуэль, форт'};
    var opt = document.createElement('option');
    opt.value = 0;
    var txt = '';
    if ((i1 == 3)){
	txt = 'Выбран спец. перебор';
    }
    else if (j1 == 2){
	txt = 'Выбраны все ';
	if (i1 == 0){
	    txt += 'работы';
	}
	else if (i1 == 1){
	    txt += 'дуэльные типажи';
	}
	else if (i1 == 2){
	    txt += 'фортовые варианты'
	}
    }
    else if (i1 == 4){
	txt = 'Выбран конструктор навыков';
    }
    else{
	txt = 'Выберите ';
	if (i1 == 0) txt += 'работу';
	if (i1 == 1) txt += ' дуэльный типаж';
	if (i1 == 2) txt += ' экипировку бойца';
    }
    opt.textContent = txt;
    opt.disabled = true;
    opt.selected = true;
    sl.appendChild(opt);

    if ((j1 == 0)||(j1 == 2)||(i1 == 3)){
	sl.size = 1;
	sl.multiple = null;
	sl.style.height = '25px';
    }
    else{
	sl.size = 5;
	sl.multiple = true;
	sl.style.height = '125px';
    }
    
    j = 1;
    for (var i = ind_beg; i < ind_end; ++i){
	if (PK_S3.raboty[i]&&(!PK_S3.raboty[i].except)){
	    srab[j]={id:i, name:PK_S3.raboty[i].rus_name};
	    ++j;
	}
    }
    PK_S3.qsort(srab, 1, j, 'name');
    for (var i = 1; i < j; ++i){
	var opt = document.createElement('option');
	opt.value = srab[i].id;
	opt.textContent = srab[i].name;
	sl.appendChild(opt);
    }
 
    var elem = document.getElementById('pk_s3_select_konstr_en');
    if (elem){
	for (var i=0;i<20;++i){
	    var el = document.getElementById('pk_s3_select_konstr_s'+i);
	    if (elem.checked) {el.disabled=false}
	    else {el.value = null;el.disabled=true;}
	}
	for (var i=0;i<4;++i){
	    var el = document.getElementById('pk_s3_select_konstr_a'+i);
	    if (elem.checked) {el.disabled=false}
	    else {el.value = null;el.disabled=true;}
	}
    }
}

PK_S3.running_bar = function(){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', PK_S3.progress.percent);
	if (++PK_S3.progress.percent > 100) PK_S3.progress.percent = 0;
    }
    else{
	clearInterval(PK_S3.progress.id);
    }
}

PK_S3.minimize_window_settings = function(){
    AjaxWindow.toggleSize('pereodevalka_setting');
    setTimeout(PK_S3.minimize_window_settings2, 100);
}

PK_S3.minimize_window_settings2 = function(){
    var bar = $('window_bar_pereodevalka_setting');
    if (!bar){
        setTimeout(PK_S3.minimize_window_settings2, 100);
	return;
    }
    bar.firstChild.firstChild.nextSibling.innerHTML='Переодевалка';
}

PK_S3.show_window_settings = function(init){
    var name = 'pereodevalka_setting';
    //var group = 'inventory';
    var group = 'inventory_new';
    var window_div = $('window_' + name);
    
    if (!window_div){
	window_div = new Element('div',{'id':'window_' + name,'class':'window css_inventory'});
	AjaxWindow.windows[name] = window_div;
	window_div.injectInside('windows');
	window_div.centerLeft();
    }
    else{
	AjaxWindow.maximize (name);
	if (init){
	    window_div.innerHTML = '';
	}
	else{
	    return;
	}
    }
    AjaxWindow.bringToTop(window_div);

    var xhtml = '';
    xhtml += '<div class="window_borders">';
    xhtml += '  <h2 id="window_' + name + '_title" class="window_title"> </h2>';
    xhtml += '	<a class="window_refresh" href="javascript:PK_S3.show_window_settings(true);void(0)" title="<b>Обновить окно</b>"></a>'
    xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall" title="<b>Закрыть все окна</b>"></a>';
    //xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + name + '\', \'' + group + '\');" class="window_minimize" title="<b>Свернуть окно</b>"></a>';
    xhtml += '  <a href="javascript:PK_S3.minimize_window_settings();" class="window_minimize" title="<b>Свернуть окно</b>"></a>';
    xhtml += '  <a href="javascript:AjaxWindow.close(\'' + name + '\');" class="window_close" title="<b>Закрыть окно</b>"></a>';
    xhtml += '  <div id="window_' + name + '_content" class="window_content">';
    xhtml += '    	<table class="shadow_table" style="margin-left:6px; width:100%; height:390px">';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_top_left"></td>';
    xhtml += '    			<td class="border_shadow_top"></td>';
    xhtml += '    			<td class="edge_shadow_top_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="border_shadow_left"></td>';
    xhtml += '    			<td class="shadow_content">';
    xhtml += '    				<div style="overflow:none; width: 675px; height:390px; position: relative;" id="pk_s3_settings">';
    xhtml += '    				</div>';
    xhtml += '    			</td>';
    xhtml += '    			<td class="border_shadow_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_bottom_left"></td>';
    xhtml += '    			<td class="border_shadow_bottom"></td>';
    xhtml += '    			<td class="edge_shadow_bottom_right"></td>';
    xhtml += '	 		</tr>';
    xhtml += '	 	</table>';
    xhtml += '	</div>';
    xhtml += '</div>';
    window_div.setHTML(xhtml);
    
    //перезагрузка, иногда не срабатывало в инит()
    PK_S3.bonus.speed = (Character.characterClass != 'duelist') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.money = (PremiumBoni.hasBonus('money')) ? 1.5 : 1.0;
    PK_S3.bonus.drop = (Character.characterClass != 'adventurer') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.life = (Character.characterClass != 'soldier') ? 10 : (PremiumBoni.hasBonus('character')) ? 20 : 15;
    PK_S3.bonus.exp = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.build = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.weapon = (Character.characterClass != 'soldier') ? 0 : (PremiumBoni.hasBonus('character')) ? 6 : 3;
    PK_S3.bonus.leader = (Character.characterClass != 'soldier') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.5 : 1.25;

	
    var window_title_div = $('window_' + name + '_title');
    window_div.makeDraggable({handle:window_title_div});
    window_title_div.addEvent('dblclick',function(){
				window_div.centerLeft();
				window_div.setStyle('top',133);
				});
    window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
    window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));

    var div_left = new Element('div', {'style':'margin: 0; height: 390px; width: 240px; float: left;'});
    var div_sel = new Element('div', {'style':'height: 140px; width: 240px;'});

    var spis = new Element('select',{'id':'pk_s3_select_rab','size':'1','style':'background-color:#e8dab3; font-size: 12px; margin: 5px 1px 5px 5px; width:235px; height:25px'});
    spis.multiple = null;
    div_sel.appendChild(spis);
    div_left.appendChild(div_sel);
    
    var div_zakup = new Element('div', {'style':'height: 175px; width: 240px; border-bottom: 1px solid #321; border-right: 1px solid #321;'});
    var div_zakup_zag = new Element ('div', {'style':'clear: both; font-weight:bold; text-align:center;', 'title':'Поищем из всего, что встречается на просторах Запада!'});
    div_zakup_zag.textContent = 'Отсутвующие (пока) вещи:';
    div_zakup.appendChild(div_zakup_zag);
    
    var div = new Element ('div', {'title':'Верхний лимит суммарной стоимости закупаемых вещей.'});
    var img = new Element('span', {'style':'width:23px; height:23px; background-image:url(http://www.the-west.ru/images/job/danger.png); float:left; margin: 2px 5px 2px 5px;', 'title':'Внимание! может сильно замедлить поиск.'});
    div.appendChild(img);
    var inp = new Element ('input', {'id':'pk_s3_select_baks_n', 'type':'text', 'size':'6', 'value':'0','style':'background-color:#e8dab3; margin: 2px 5px 2px 0px;'});
    inp.addEventListener('change',function () {this.value = parseInt(this.value); if (isNaN(this.value)) this.value=0; if (this.value < 0) this.value=0;}, false);
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Есть $ на магазины';
    div.appendChild(span);
    div_zakup.appendChild(div);

    var div = new Element ('div', {'title':'Закупка из магазинов на любую сумму.'});
    var inp = new Element ('input', {'id':'pk_s3_select_baks_inf', 'type':'checkbox', 'style':'margin: 3px 5px 3px 0px;'});
    inp.addEventListener('change', function () {var bks = $('pk_s3_select_baks_n'); if (this.checked) { bks.value = 0; bks.disabled=true;} else {bks.disabled=false;} }, false);
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Покупаем любые у торговцев';
    div.appendChild(span);
    div_zakup.appendChild(div);

    var div = new Element ('div', {'title':'Закупка всех немагазинных с аукциона по номинальной стоимости.'});
    var inp = new Element ('input', {'id':'pk_s3_select_auction', 'type':'checkbox', 'style':'margin: 3px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Аукционные, кроме магазинных';
    div.appendChild(span);
    div_zakup.appendChild(div);

/*
    var div = new Element ('div', {'title':'Подбор любого немагазинного дропа. Стоимость считается нулевой.'});
    var inp = new Element ('input', {'id':'pk_s3_select_drop', 'type':'checkbox', 'style':'margin: 3px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Любой дроп, кроме магазинных';
    div.appendChild(span);
    div_zakup.appendChild(div);
*/
    var div = new Element ('div', {'title':'Уникальные квестовые вещи. Стоимость считается нулевой.'});
    var inp = new Element ('input', {'id':'pk_s3_select_unique', 'type':'checkbox', 'style':'margin: 3px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Уникальные вещи';
    div.appendChild(span);
    div_zakup.appendChild(div);

    var div = new Element ('div', {'title':'Приоритет праздничному набору.'});
    var inp = new Element ('input', {'id':'pk_s3_select_season', 'type':'checkbox', 'style':'margin: 3px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Приоритет на удачу';
    div.appendChild(span);
    div_zakup.appendChild(div);

//    div_left.appendChild(div_zakup);    

    var div = new Element('div', {'title':'Подсчитываем для персонажа с указанным уровнем.'});
    var inp = new Element ('input', {'id':'pk_s3_select_level',  'type':'text', 'value':Character.level?Character.level:0, 'size':'3', 'style':'background-color:#e8dab3; margin: 3px 5px; width: 30px;'});
    inp.addEventListener('change',function () {this.value = parseInt(this.value); if (isNaN(this.value)) this.value=1; if (this.value < 1) this.value=1;}, false);
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Подсчёт для уровня';
    div.appendChild(span);
    div_zakup.appendChild(div);
    div_left.appendChild(div_zakup);    

//    var div_slots_zag = new Element ('div', {'style':'float:right; clear: both; font-weight:bold; text-align:center;'});
//    div_slots_zag.textContent = 'Вещи из слотов экипировки:';
//    div_left.appendChild(div_slots_zag);
    
    var div = document.createElement('div');
    div.style.borderTop = '1px solid #321';
    div.style.borderRight = '1px solid #321';
    div.style.marginTop = '10px';
    div.style.clear = 'both';
    // <span id="submit_delete_reports"><a href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">Удалить</span><span class="button_right"></span><span style="clear: both;"></span></a></span>
    var span = document.createElement('span');
    span.id = 'pk_s3_poehali';
    span.style.margin = '10px 5px';
    var text = 'Поехали';
    span.innerHTML = '<a href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">'+text+'</span><span class="button_right"></span><span style="clear: both;"></span></a>';
    span.addEventListener('click',PK_S3.second_init, false);
    div.appendChild (span);
    var span = document.createElement('span');
    span.id = 'pk_s3_prosto_veshi';
    span.style.margin = '10px 5px';
    var text = 'Без наборов';
    span.innerHTML = '<a href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">'+text+'</span><span class="button_right"></span><span style="clear: both;"></span></a>';
    span.addEventListener('click',PK_S3.second_init, false);
    div.appendChild (span);
    div_left.appendChild(div);
    
    var div = new Element('div', {'id':'pk_s3_sprogress'});
    var percent = new Element ('progress', {'id':'pk_s3_progress_bar', 'style':'margin: 5px; width:208px', 'max':100, 'value':1});
    div.appendChild(percent);
    div_left.appendChild(div);

    var div_top = new Element('div', {'style':'margin: 0; height: 390px; width:425px; float: left;'});
    var div_right = new Element('div',{'style':'clear:left; margin:0; padding:0, border:0'})

    var form_sel = document.createElement('form');
    form_sel.id = 'pk_s3_form_select';
    
    var div_sel_rab = new Element ('div', {'style':'height: 80px; width: 140px; float:left;  margin: 5px 0px;'});
    var div_sel_rab_zag = new Element ('div', {'style':'clear: both; font-weight:bold; text-align:center;'});
    div_sel_rab_zag.textContent = 'Работы:';
    div_sel_rab.appendChild(div_sel_rab_zag);

    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_ro', 'name':'pk_s3_raboty_radio', 'type':'radio', 'checked':'true', 'style':'margin: 2px 2px 2px 15px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Одна работа';
    div.appendChild(span);
    div_sel_rab.appendChild(div);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_rn', 'name':'pk_s3_raboty_radio','type':'radio', 'style':'margin: 2px 2px 2px 15px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Несколько работ';
    div.appendChild(span);
    div_sel_rab.appendChild(div);

    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_rv', 'name':'pk_s3_raboty_radio','type':'radio', 'style':'margin: 2px 2px 2px 15px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Все работы';
    div.appendChild(span);
    div_sel_rab.appendChild(div);

    form_sel.appendChild(div_sel_rab);

    var div_sel_duel = new Element ('div', {'style':'height: 80px; width: 140px;  margin: 5px 0px; float:left;'});
    var div_sel_duel_zag = new Element ('div', {'style':'clear: both; font-weight:bold; text-align:center;'});
    div_sel_duel_zag.textContent = 'Дуэли:';
    div_sel_duel.appendChild(div_sel_duel_zag);

    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_do', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Один типаж';
    div.appendChild(span);
    div_sel_duel.appendChild(div);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_dn', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Несколько типажей';
    div.appendChild(span);
    div_sel_duel.appendChild(div);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_dv', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Все типажи';
    div.appendChild(span);
    div_sel_duel.appendChild(div);

    
    form_sel.appendChild(div_sel_duel);

    var div_sel_fort = new Element ('div', {'style':'height: 80px; width: 140px; margin: 5px 0px; float:left;'});
    var div_sel_fort_zag = new Element ('div', {'style':'clear: both; font-weight:bold; text-align:center;'});
    div_sel_fort_zag.textContent = 'Форты:';
    div_sel_fort.appendChild(div_sel_fort_zag);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_fo', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Один вариант';
    div.appendChild(span);
    div_sel_fort.appendChild(div);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_fn', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Несколько';
    div.appendChild(span);
    div_sel_fort.appendChild(div);
    
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_fv', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 2px 2px 2px 5px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Все варианты';
    div.appendChild(span);
    div_sel_fort.appendChild(div);
    form_sel.appendChild(div_sel_fort);
    form_sel.appendChild(div_right);

    var div_sel_dop = new Element ('div', {'style':'height: 80px; width: 250px; padding: 1px 0px; float:left; border-bottom: 1px solid #321; border-right: 1px solid #321; border-left: 1px solid #321;'});

    var attribs = ['Сила (3+ навыка)', 'Ловкость (3+ навыка)', 'Сноровка (3+ навыка)', 'Шарм (3+ навыка)']
    var skills = ['Строительство', 'Удар', 'Стойкость', 'Выносливость', 'Здоровье', 'Верховая езда', 'Реакция', 'Увёртливость', 'Маскировка', 'Плаванье', 'Меткость', 'Стрельба', 'Установка ловушек', 'Проворство', 'Ремонт', 'Руководство', 'Тактика', 'Торговля', 'Обращение с животными', 'Блеф'];
    var skills_color = ['#ff9999', '#99ff99', '#9999ff', '#ffff99'];
    var div = new Element('div', {'title':'Все работы с выбранным навыком. Для аттрибутов - три навыка в работе.'});
    var inp = new Element ('input', {'id':'pk_s3_select_rab_oo', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 5px 2px 0px 2px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Навык';
    div.appendChild(span);
    var sel = new Element ('select', {'id':'pk_s3_select_nav','size':'1','style':'background-color:#e8dab3; font-size: 12px; width:185px; height:22px'})
    sel.addEventListener('change', function() {var elem = document.getElementById('pk_s3_select_rab_oo');elem.checked = true;}, false);
    var opt = new Element ('option', {'value':'0', 'selected':'true', 'disabled':'true'});
    opt.textContent = 'Выберите навык (для работ)';
    sel.appendChild(opt);
    for (var j = 0; j < 4; ++j)
    {
	var style = 'background-color: ' + skills_color[j];
	var opt = new Element ('option', {'value':100+j, 'style':style})
	opt.style.fontWeight = 'bold';
	opt.textContent = attribs[j];
	sel.appendChild(opt);
	for (var i = 0; i < 5; ++i){
	    var opt = new Element ('option', {'value':(j*5+i), 'style':style});
	    opt.textContent = skills[j*5+i];
	    sel.appendChild(opt);
	}
    }

    div.appendChild(sel);

    div_sel_dop.appendChild(div);
    
    var div = new Element('div', {'title':'Все работы, на которых дают выбранный продукт (сюрпризы не реализованы).'});
    var inp = new Element ('input', {'id':'pk_s3_select_rab_on', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 5px 2px 0px 2px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Прод.';
    div.appendChild(span);
    var sel = new Element ('select', {'id':'pk_s3_select_product','size':'1','style':'background-color:#e8dab3; font-size: 12px; width:185px; height:22px; margin: 0 0 0 3px'})
    sel.addEventListener('change', function() {var elem = document.getElementById('pk_s3_select_rab_on');elem.checked = true;}, false);
    var opt = new Element ('option', {'value':'0', 'selected':'true', 'disabled':'true'});
    opt.textContent = 'Выберите получаемый предмет';
    sel.appendChild(opt);
    var drop = [];
    for (var i = 1; i < PK_S3.raboty.max; ++i){
	if (!PK_S3.raboty[i]) continue;
	for (var j in PK_S3.raboty[i].resultaty.produkty){
	    if (isNaN(j)||(j==0)) continue;
	    drop.push({id:j, name:PK_S3.items[j].name});
	}
    }
    PK_S3.qsort(drop, 0, drop.length, 'name');
    for (var i = 1; i < drop.length; ++i){
	if (drop[i].id == drop[i-1].id){
	    drop.splice(i,1);
	    --i;
	}
    }
    for (var i = 0; i < drop.length; ++i){
	var opt = new Element ('option', {'value':drop[i].id})
	opt.textContent = drop[i].name;
	sel.appendChild(opt);
    }
    div.appendChild(sel);

    div_sel_dop.appendChild(div);
    
    var div = new Element('div', {'title':'Поиск вещей, которые не применяются ни на одной из рассчитываемых (не спрятанных) работах/дуэлях/фортах'});
    var inp = new Element ('input', {'id':'pk_s3_select_rab_ov', 'name':'pk_s3_raboty_radio', 'type':'radio', 'style':'margin: 5px 2px 0px 2px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Поиск ненужных вещей';
    div.appendChild(span);
    div_sel_dop.appendChild(div);
    

/*
    var div = document.createElement('div');
    var inp = new Element ('input', {'id':'pk_s3_select_rab_ov', 'name':'pk_s3_raboty_radio', 'disabled':'true', 'type':'radio', 'style':'margin: 2px 2px 2px 2px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = 'Квест';
    div.appendChild(span);
    var sel = new Element ('select', {'id':'pk_s3_select_quest', 'size':'1', 'disabled':'true', 'style':'background-color:#e8dab3; font-size: 12px; width:185px; height:25px; margin: 0 0 0 4px;'})
    sel.addEventListener('change', function() {var elem = document.getElementById('pk_s3_select_rab_ov');elem.checked = true;}, false);
    var opt = new Element ('option', {'value':'0', 'selected':'true', 'disabled':'true'});
    opt.textContent = 'Выберите задание';
    sel.appendChild(opt);
    var opt = new Element ('option', {'value':'1'});
    opt.textContent = 'Убить три мауса';
    sel.appendChild(opt);
    div.appendChild(sel);
    div_sel_dop.appendChild(div);
*/    
    
    form_sel.appendChild(div_sel_dop);

    var div_sel_hp = new Element ('div', {'style':'height: 80px; padding: 3px 0px; float:left; text-align:center; width:160px;'});
    var div = new Element('div', {title:'Будет найден <b>фортовый набор</b> со здоровьем не меньше заданного.'});
    var span = document.createElement('span');
    span.textContent = 'Здоровье для форта:';
    div.appendChild(span);
    var aprox_hp = 90 + Character.level * 10 + Character.skills.health * PK_S3.bonus.life + Math.round(Character.level * .25 * PK_S3.bonus.life);
    var inp = new Element ('input', {'id':'pk_s3_select_hp', 'type':'text', 'value':aprox_hp, 'size':'5', 'style':'background-color:#e8dab3; margin: 2px 2px 2px 5px;'});
    inp.addEventListener('change',function () {this.value = parseInt(this.value); if (isNaN(this.value)) this.value=0; if (this.value < 0) this.value=0;}, false);
    div.appendChild(inp);
    div_sel_hp.appendChild(div);
    
    var div = document.createElement('div');
    var div_zag = new Element ('div', {'style':'clear: both; font-weight:bold; text-align:right; border-top: 1px solid #321'});
    div_zag.textContent = 'Конструктор навыков:';
    div.appendChild(div_zag);
    var inp = new Element ('input', {'id':'pk_s3_select_konstr_en', 'type':'radio', 'name':'pk_s3_raboty_radio', 'style':'margin: 2px 7px 2px 2px;'});
    div.appendChild(inp);
    var span = document.createElement('span');
    span.textContent = '"Сложность:"';
    div.appendChild(span);
    var inp = new Element ('input', {'id':'pk_s3_select_konstr_to', 'type':'text', 'value':0, 'size':'3', 'style':'background-color:#e8dab3; margin: 2px 0px 2px 2px; width: 25px;'});
    inp.addEventListener('change',function () {this.value = parseInt(this.value); if (isNaN(this.value)) this.value=0; if (this.value < 0) this.value=0;}, false);
    div.appendChild(inp);
    div_sel_hp.appendChild(div);
 
    var div_right = new Element('div',{'style':'clear:left; margin:0; padding:0, border:0'})
   
    form_sel.appendChild(div_sel_hp);
    form_sel.appendChild(div_right);

    form_sel.addEventListener('change',PK_S3.input_select_rdf, false);

    div_top.appendChild(form_sel);

    var div_slots = new Element ('div', {'style':'float: left; width: 170px;'});
    //var name_slots=['Головной убор', 'Шейная повязка', 'Одежда', 'Пояс', 'Штаны', 'Обувь', 'Дуэльное оружие', 'Фортовое оружие', 'Верховое животное', 'Продукт'];
    /*
     <select style="margin:0px 5px 0px 2px; width:40px;" id="pk_s3_select_slot_8"><option value="0">----</option><option value="100">из экипировки</option><option value="505">Жеребёнок</option></select><span>Верховое животное</span></div>
    */
    for (var i = 0; i < 10; ++i){
	var div = document.createElement('div');
	var id = 'pk_s3_select_slot_'+i;
	//var inp = new Element ('input', {'id':id, 'type':'checkbox', 'style':'margin: 2px 5px 2px 2px;'});
	//div.appendChild (inp);
	var sel = new Element ('select', {'id':id, 'style':'background-color:#e8dab3; width:40px; height:19px; margin:1px 5px 1px 1px;'});
	var opt = document.createElement('option');
	opt.value = 0;
	opt.textContent = '-----';
	sel.appendChild(opt);
	var opt = document.createElement('option');
	opt.value = 99;
	opt.textContent = '(пустой слот)';
	sel.appendChild(opt);
	var opt = document.createElement('option');
	opt.value = 98;
	opt.textContent = '(из экипировки)';
	sel.appendChild(opt);
	var typ = PK_S3.types[i]
	if (typ != 'yield'){
	    for (var j in PK_S3.items){
		if (isNaN(j)) continue;
		var obj = PK_S3.items[j];
		if (typ != obj.type) continue;
		var is_shop = obj.tradeable && obj.traderlevel && (obj.traderlevel <= 15);
		var is_set = obj.set && obj.set.key;
		var opt = document.createElement('option');
		opt.value = j;
		opt.textContent = obj.name;
		if (!is_shop){
		    opt.style.fontWeight = 'bold';
		}
		if (is_set){
		    opt.style.fontStyle = 'italic';
		}
		sel.appendChild(opt);
	    }
	}
	else{
	    for (var j in PK_S3.items){
		if (isNaN(j)) continue;
		var obj = PK_S3.items[j];
		if (typ != obj.type) continue;
		var is_set = obj.set && obj.set.key;
		if (!is_set) continue;
		var opt = document.createElement('option');
		opt.value = j;
		opt.textContent = obj.name;
		sel.appendChild(opt);
	    }
	}
	div.appendChild (sel);
	var span = document.createElement('span');
	span.textContent = PK_S3.types_name[i];
	div.appendChild(span);
	div_slots.appendChild(div);
    }
    div_top.appendChild(div_slots);

    var skills2 = ['стр ', 'удар', 'стой', 'вын ', 'здор', 'верх', 'реак', 'увёр', 'маск', 'плав', 'метк', 'стр ', 'лов ', 'пров', 'рем ', 'рук ', 'такт', 'торг', 'жив ', 'блеф'];
    var attrib2 = ['сила', 'ловк', 'снор', 'шарм'];
    var skills_color2 = ['#900','#060','#009','#660']
    var div_konstr1 = new Element ('div', {'style':'float: left; width: 250px; font-family: monospace; border-left: 1px solid #321'});
    for (var j = 0; j < 4; ++j){
	var div = document.createElement('div');
	var span1 = document.createElement('span');
	span1.style.color = skills_color2[j];
	span1.style.fontWeight = 'bold';
	var id = 'pk_s3_select_konstr_a'+(j*1);
	var inp = new Element ('input', {'id':id, 'type':'text', 'size':'2', 'style': 'margin: 1px 2px 1px 10px; width: 25px;', 'disabled':'true'});
	inp.addEventListener('change',function () {this.value = parseFloat(this.value); if (isNaN(this.value)) this.value=0; if (this.value < 0) this.value=0; if (this.value > 5) this.value=5;}, false);
	span1.appendChild(inp);
	var span = document.createElement('span');
	span.textContent = attrib2[j];
	span1.appendChild(span);
	div.appendChild(span1);
	for (var i = 0; i < 5; ++i){
	    var span1 = document.createElement('span');
	    span1.style.color = skills_color2[j];
	    var id = 'pk_s3_select_konstr_s'+(j*5+i);
	    var inp = new Element ('input', {'id':id, 'type':'text', 'size':'2', 'style': 'margin: 1px 2px 1px 10px; width: 25px;', 'disabled':'true'});
	    inp.addEventListener('change',function () {this.value = parseFloat(this.value); if (isNaN(this.value)) this.value=0; if (this.value < 0) this.value=0; if (this.value > 5) this.value=5;}, false);
	    span1.appendChild(inp);
	    var span = document.createElement('span');
	    span.textContent = skills2[j*5+i];
	    span1.appendChild(span);
	    div.appendChild(span1);
	}
	div_konstr1.appendChild(div);
    }
    div_top.appendChild(div_konstr1);
    
    
    var div_right = new Element('div',{'style':'clear:left; margin:0; padding:0, border:0'})

    var wind = document.getElementById('pk_s3_settings');
    wind.appendChild(div_left);
    wind.appendChild(div_top);
    wind.appendChild(div_right);
    PK_S3.input_select_rdf();
    //PK_S3.progress.id = setInterval(PK_S3.running_bar, 594);
};

PK_S3.minimize_window_informer = function(){
    AjaxWindow.toggleSize('pereodevalka_informer');
    setTimeout(PK_S3.minimize_window_informer2, 100);
};

PK_S3.minimize_window_informer2 = function(){
    var bar = $('window_bar_pereodevalka_informer');
    if (!bar){
        setTimeout(PK_S3.minimize_window_informer2, 100);
	return;
    }
    bar.firstChild.firstChild.nextSibling.innerHTML='Информация';
};


PK_S3.show_window_informer = function (){
    var name = 'pereodevalka_informer';
    var group = 'messages';
    var window_div = $('window_' + name);
    
    if (!window_div){
	window_div = new Element('div',{'id':'window_' + name,'class':'window css_messages'});
	AjaxWindow.windows[name] = window_div;
	window_div.injectInside('windows');
	window_div.centerLeft();
    }
    else{
	AjaxWindow.maximize (name);
	window_div.innerHTML = '';
    }
    AjaxWindow.bringToTop(window_div);

    var xhtml = '';
    xhtml += '<div class="window_borders">';
    xhtml += '  <h2 id="window_' + name + '_title" class="window_title"> </h2>';
    xhtml += '	<a class="window_refresh" href="javascript:AjaxWindow.close(\'' + name + '\'); PK_S3.show_window_informer();void(0)" title="<b>Обновить окно</b>"></a>'
    xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall" title="<b>Закрыть все окна</b>"></a>';
    //xhtml += '  <a href="javascript:AjaxWindow.toggleSize(\'' + name + '\', \'' + group + '\');" class="window_minimize" title="<b>Свернуть окно</b>"></a>';
    xhtml += '  <a href="javascript:PK_S3.minimize_window_informer();" class="window_minimize" title="<b>Свернуть окно</b>"></a>';
    xhtml += '  <a href="javascript:AjaxWindow.close(\'' + name + '\');" class="window_close" title="<b>Закрыть окно</b>"></a>';
    xhtml += '  <div id="window_' + name + '_content" class="window_content">';
    xhtml += '    	<table class="shadow_table" style="margin-left:6px; width:100%; height:390px">';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_top_left"></td>';
    xhtml += '    			<td class="border_shadow_top"></td>';
    xhtml += '    			<td class="edge_shadow_top_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="border_shadow_left"></td>';
    xhtml += '    			<td class="shadow_content">';
    xhtml += '    				<div style="overflow:none; width: 675px; height:390px; position: relative;" id="pk_s3_informer">';
    xhtml += '    				</div>';
    xhtml += '    			</td>';
    xhtml += '    			<td class="border_shadow_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_bottom_left"></td>';
    xhtml += '    			<td class="border_shadow_bottom"></td>';
    xhtml += '    			<td class="edge_shadow_bottom_right"></td>';
    xhtml += '	 		</tr>';
    xhtml += '	 	</table>';
    xhtml += '	</div>';
    xhtml += '</div>';
    window_div.setHTML(xhtml);
	
    var window_title_div = $('window_' + name + '_title');
    window_div.makeDraggable({handle:window_title_div});
    window_title_div.addEvent('dblclick',function(){
				window_div.centerLeft();
				window_div.setStyle('top',133);
				});
    window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
    window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));

    var wind = document.getElementById('pk_s3_informer');
    var text = new Element ('textarea',{'style':'clear:left; margin:5px; width:661px; height:373px;', 'readonly':'true'});
    text.value = (PK_S3.informer);
    wind.appendChild(text);
};

PK_S3.sortirovka_rabot = function (type, old_type){
    var otse4to = $('pk_s3_sortirovka_valueto').value;
    var vy4islennoe = $('pk_s3_sortirovka_native').checked;
    // resultaty:{dengi:87, opyt:73, vezenie:29, boom:69,
    var array = [];
    var tmp_node = ['name', 'opyt', 'dengi', 'vezenie', 'boom', 'to', 'malus'];
    for (nod in tmp_node){
	if (isNaN(nod)) continue;
	var elem = $('pk_s3_sortirovka_'+tmp_node[nod]);
	if (elem){
	    elem.style.backgroundColor = '';
	}
    };
    var elem = $('pk_s3_sortirovka_'+type);
    if (type != old_type){
	elem.style.backgroundColor = '#6c6';
	PK_S3.vyvod.negativ = true;;
    }
    else{
	if (PK_S3.vyvod.negativ){
	    elem.style.backgroundColor = '#c66';
	}
	else{
	    elem.style.backgroundColor = '#6c6';
	}
	PK_S3.vyvod.negativ = !PK_S3.vyvod.negativ;
    }
    for (var ir = 0; ir < PK_S3.setting.porabotaem.length; ++ir){
	if (!PK_S3.resultaty[ir]) continue;
	if (PK_S3.resultaty[ir].TO < otse4to) continue;
	var val = 0;
	switch (type){
	case 'name':
	    val = PK_S3.raboty[ir].rus_name;
	    break;
	case 'malus':
	    val = PK_S3.raboty[ir].malus;
	    break;
	case 'to':
	    val = PK_S3.resultaty[ir].TO;
	    break;
	default:
	    if (vy4islennoe){
		val = PK_S3.resultaty[ir][type];
	    }
	    else{
		val = PK_S3.raboty[ir].resultaty[type];
	    }
	};
	if (PK_S3.vyvod.negativ&&(type!='name'))	val = -val;
	array.push ({val:val, ind:ir});
    }
    PK_S3.qsort(array, 0, array.length, 'val');
    PK_S3.vyvod.type = type;
    if (PK_S3.setting.knopka == 'poehali'){
	PK_S3.print_raboty(array);
    }
    else{
	alert ('бе-бе-бе, воть!');
    }
};

PK_S3.print_raboty_to = function (arr){
    main = $('pk_s3_rezultaten_arbeiten0');
    if (!main) return;
    main.innerHTML = '';
    for (var i = 0; i < arr.length; ++i){
	var div0 = new Element('div', {'style':'width:650px; height:138px; border-bottom: 1px solid #321; clear:both; padding-top:5px;'});
	var divI = new Element ('div', {'style':'float:left; width:260px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divI.style.width = '250px';
	}
	var divIo = new Element ('div', {'style':'float:left; width:27px; height:81px;'});
	var tmp_div = new Element ('div', {'style':'float:left; padding: 2px;'});
	var aa0 = new Element ('a', {'href':'javascript:PK_S3.equip_items_save('+arr[i].ind+')'});
	var img0 = new Element ('img', {'style':'width:23px; height:23px; background:url(../img.php?type=menu&amp;dummy) -104px -126px; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Сохранить комплект...'});
	aa0.appendChild(img0);
	tmp_div.appendChild(aa0);
	var aa1 = new Element ('a', {'href':'javascript:PK_S3.equip_items_delete('+arr[i].ind+')'});
	var img1 = new Element ('img', {'style':'width:23px; height:23px; background:url(../img.php?type=menu&amp;dummy) -129px -101px; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Удалить комплект'});
	aa1.appendChild(img1)
	tmp_div.appendChild(aa1);
	var aa2 = new Element ('a', {'href':'javascript:PK_S3.except_raboty('+arr[i].ind+', true)'});
	var img2 = new Element ('img', {'style':'width:23px; height:23px; background:url(/images/window/window2_buttons.png) 0px -20px; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Скрыть работу'});
	aa2.appendChild(img2)
	tmp_div.appendChild(aa2);
	divIo.appendChild(tmp_div);
	divI.appendChild(divIo);
	var divIa = new Element ('div', {'style':'float:left;'});
	divIa1 = new Element ('div', {'style':'heigth:20px; font-weight:bold;'});
	var tname = PK_S3.raboty[arr[i].ind].rus_name;
	if (tname.length > 28) tname = tname.slice(0,25) + '...';
	divIa1.textContent = tname;
	divIa.appendChild(divIa1);
	var divIa2 = new Element('div');
	var divIa2i = new Element ('div', {'style':'float:left'});
	var src = '';
	if (arr[i].ind <= PK_S3.raboty.max){
	    src = '/images/jobs/'+PK_S3.raboty[arr[i].ind].name+'.png';
	    var img0 = new Element ('img', {'src':'/images/jobs/'+PK_S3.raboty[arr[i].ind].name+'.png', 'title':PK_S3.raboty[arr[i].ind].rus_name, 'alt':PK_S3.raboty[arr[i].ind].rus_name});
	}
	else if ((arr[i].ind == PK_S3.raboty.health)||(arr[i].ind == PK_S3.raboty.energy)){
	    src = '/images/jobs/mini/sleep.png';
	}
	else if (arr[i].ind == PK_S3.raboty.moving){
	    src = '/images/jobs/mini/walk.png';
	}
	else if (arr[i].ind == PK_S3.raboty.build){
	    src = '/images/jobs/build.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_middle)){
	    src = '/images/fort/battle/button_attack.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_middle) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    src = '/images/fort/battle/button_defend.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.duel_min) && (arr[i].ind < PK_S3.raboty.duel_max)){
	    src = '/images/jobs/duell.png';
	}
	else{
	    src = '/images/skill/skill_pure.png';
	}
	var title = PK_S3.raboty[arr[i].ind].rus_name + '<hr />Кликнуть, чтобы одеть выбранные вещи';
	var img0 = new Element ('img', {'src':src, 'title':title, 'alt':title, 'style':'width:63px; height:63px;'});
	var aa = new Element('a', {'href':'javascript:PK_S3.equip_adds('+arr[i].ind+');void(0);'});
	aa.appendChild(img0);
	divIa2i.appendChild(aa);
	divIa2.appendChild(divIa2i);
	var divIa2ii = new Element ('div', {'style':'float:left;'});
	divIa2ii.innerHTML=' ';
	var dob = 0;
	for (var iii in PK_S3.raboty[arr[i].ind].resultaty.produkty){
	    ++dob;
	    if (isNaN(iii)) continue;
	    var tmp_div = new Element('div', {'style':'float:left; padding: 10px 2px 0px 2px; text-align:center;'});
	    var img = new Element ('img', {'src':PK_S3.items[iii].image_mini, 'title':PK_S3.items[iii].name, 'alt':PK_S3.items[iii].name, 'class':'bug_mini', 'style':'clear:both; display:block'});
	    tmp_div.appendChild(img);
	    //divIa2ii.appendChild(img);
	    span = new Element ('span');
	    var val = Math.round(PK_S3.raboty[arr[i].ind].resultaty.produkty[iii] * PK_S3.bonus.money)
	    span.textContent = '' + ((val>100)?100:val) + '%';
	    if (PK_S3.bonus.money > 1.0){
		span.style.color = '#287f10';
		span.style.fontWeight = 'bold';
	    }
	    tmp_div.appendChild(span);
	    divIa2ii.appendChild(tmp_div);
	}
	if (dob == 0){
	    var tmp_div = new Element('div', {'style':'float:left; padding: 10px 2px 0px 2px; text-align:center;'});
	    var img = new Element ('img', {'src':'/images/transparent.png', 'title':'', 'alt':'', 'class':'bug_mini', 'style':'clear:both; display:block'});
	    tmp_div.appendChild(img);
	    //divIa2ii.appendChild(img);
	    divIa2ii.appendChild(tmp_div);
	}
	divIa2ii.appendChild(tmp_div);
	divIa2.appendChild(divIa2ii);
	divIa.appendChild(divIa2);
	divI.appendChild(divIa);
	if (arr[i].ind <= PK_S3.raboty.max){
	    var divIb = new Element('div', {'style':'clear:both;'});
	    var divIb1 = new Element('div', {'style':'width:110px; float:left;', 'title':'Заработок'});
	    var img0 = new Element('img', {'src':'/images/job/dollar.png', 'style':'float:left;'});
	    divIb1.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.dengi*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.dengi+'%';
	    bar.appendChild(bar_perc);
	    divIb1.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = PK_S3.resultaty[arr[i].ind].dengi + '$';
	    divIb1.appendChild(span);
	    divIb.appendChild(divIb1);

	    var divIb3 = new Element('div', {'style':'float:left;', 'title':'Удача'});
	    var img0 = new Element('img', {'src':'/images/job/luck.png', 'style':'float:left;'});
	    divIb3.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.vezenie*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.vezenie+'%';
	    bar.appendChild(bar_perc);
	    divIb3.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = Math.round(PK_S3.resultaty[arr[i].ind].vezenie/3)+' - ' + PK_S3.resultaty[arr[i].ind].vezenie + ' ($)';
	    divIb3.appendChild(span);
	    divIb.appendChild(divIb3);

	    var divIb2 = new Element('div', {'style':'width:110px; float:left;', 'title':'Опыт'});
	    var img0 = new Element('img', {'src':'/images/job/experience.png', 'style':'float:left;'});
	    divIb2.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.opyt*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.opyt+'%';
	    bar.appendChild(bar_perc);
	    divIb2.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = PK_S3.resultaty[arr[i].ind].opyt + ' XP';
	    divIb2.appendChild(span);
	    divIb.appendChild(divIb2);

	    var divIb4 = new Element('div', {'style':'float:left;', 'title':'Опасность'});
	    var img0 = new Element('img', {'src':'/images/job/danger.png', 'style':'float:left;'});
	    divIb4.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.boom*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.boom+'%';
	    bar.appendChild(bar_perc);
	    divIb4.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent =  PK_S3.resultaty[arr[i].ind].boom + ' !';
	    divIb4.appendChild(span);
	    divIb.appendChild(divIb4);

	    divI.appendChild(divIb);
	}
	div0.appendChild(divI);
	var divII = new Element('div', {'style':'width:390px; float:left;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divII.style.width = '400px';
	}
	var divIIa = new Element ('div', {'style':'clear:both;'});
	var divIIa1 = new Element ('div', {'style':'float:left; width:105px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divIIa1.style.width = '115px';
	}
	var tmp_div = new Element ('span', {'style':'float:left; width:47px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.style.width = '57px';
	}
	var title = 'Бонус своих навыков';
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Бонус верховой езды';
	}
	else if ((arr[i].ind == PK_S3.raboty.energy)||(arr[i].ind == PK_S3.raboty.health)){
	    title = 'Свой навык здоровья';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    title = 'Атака';
	}
	tmp_div.innerHTML = '<img src="images/task_points/plus.png" width="20" height="20" title="'+title+'" /> '+PK_S3.resultaty[arr[i].ind].selfTO;
	if ((arr[i].ind < PK_S3.raboty.max)&&(PK_S3.resultaty[arr[i].ind].selfTO > PK_S3.raboty[arr[i].ind].malus)){
	    tmp_div.style.color = "#060";
	    tmp_div.style.fontWeight = "bold";
	}
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; clear:right; width:58px;'});
	var title = 'Бонус экипировки';
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Бонус к скорости';
	}
	else if ((arr[i].ind == PK_S3.raboty.energy)||(arr[i].ind == PK_S3.raboty.health)){
	    title = 'Бонус к навыку здоровья';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    title = 'Защита';
	}
	tmp_div.innerHTML = '<img src="images/task_points/plus.png" width="20" height="20" title="'+title+'" /> '+PK_S3.resultaty[arr[i].ind].bonus;
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; width:47px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.style.width = '57px';
	}
	tmp_div.innerHTML = '<img src="images/task_points/minus.png" width="20" height="20" title="Сложность работы" /> '+PK_S3.raboty[arr[i].ind].malus;
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; clear:right; width:58px;'});
	var title = 'Трудовых очков';
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Итоговая скорость';
	}
	else if (arr[i].ind == PK_S3.raboty.energy){
	    title = 'Процент регенерации';
	}
	else if (arr[i].ind == PK_S3.raboty.health){
	    title = 'Итоговое здоровье'
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    title = 'Значение выбранного бонуса';
	}
	var t0 = PK_S3.resultaty[arr[i].ind].TO;
	tmp_div.innerHTML = '<img src="images/task_points/equal.png" width="20" height="20" title="'+title+'" /> <b>'+t0+'</b>';
	if (t0 < 0){
	    tmp_div.style.color = "maroon";
	}
	if ((arr[i].ind < PK_S3.raboty.max)&&(PK_S3.resultaty[arr[i].ind].TO > 0)){
	    tmp_div.style.color = "#00c";
	}
	divIIa1.appendChild(tmp_div);
	divIIa.appendChild(divIIa1);
	var divIIa2 = new Element ('div', {'style':'float:left; width: 285px;'})
	for (var s in PK_S3.raboty[arr[i].ind].navyki){
	    for (var j = 0; j < PK_S3.raboty[arr[i].ind].navyki[s]; ++j){
		// skill_box skill_flexibility img0
		if (PK_S3.skill2atr[s]){
		    var clas = 'skill_box skill_' + PK_S3.skill2atr[s] + ' img' + (PK_S3.skillsi[s] % 5);
		    var id = 'skill_'+s;
		    var span1 = new Element('span', {'class':clas, 'title':'<b>'+Character.skill_titles[s]+':</b> '+PK_S3.resultaty[arr[i].ind].skills[s]});
		    span1.innerHTML = '<span class="skill_value">'+PK_S3.resultaty[arr[i].ind].skills[s]+'</span>';
		    
		    divIIa2.appendChild(span1);
		}
		else{ // характеристика из конструктора
		    // class="skill_box skill_circle_flexibility"
		    var clas = 'skill_box skill_circle_'+s;
		    var span1 = new Element('span', {'class':clas, 'title':Character.attribute_titles[s]+': '+PK_S3.resultaty[arr[i].ind].skills[s]});
		    span1.innerHTML = '<span class="skill_value">'+PK_S3.resultaty[arr[i].ind].skills[s]+'</span>';
		    divIIa2.appendChild(span1);
		}
	    }
	}
	divIIa.appendChild(divIIa2);
	divII.appendChild(divIIa);
	var divIIb = new Element('div', {'style':'clear:both; padding-top: 15px;'});
	var no_item_fort = true;
	for (var j = 0; j < PK_S3.types.length; ++j){
	    var div1 = new Element('div', {'style':'float:left; width:39px;'});
	    var iID = PK_S3.resultaty[arr[i].ind].items[PK_S3.types[j]];
	    if (iID&&(iID>0)){
		if ((PK_S3.types[j]!='animal')&&(PK_S3.types[j]!='left_arm')){
		    no_item_fort = false;
		}
		var iobj = PK_S3.items[iID];
		var title = '<b>' + iobj.name + '</b><hr />';
		var is_f = true;
		for (var a in iobj.bonus.attributes){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += '<b>' + Character.attribute_titles[a] + ':' + iobj.bonus.attributes[a] + '</b>';
		}
		for (var s in iobj.bonus.skills){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += Character.skill_titles[s] + ':' + iobj.bonus.skills[s];
		}
		if (iobj.speed){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += 'скорость: '+Math.round(100/iobj.speed)+'%';
		}
		if ((iobj.type == 'left_arm')||(iobj.type == 'right_arm')){
		    if (!is_f){
			title += '<br />';
		    }
		    title += 'урон: ' + iobj.damage.damage_min + ' - ' + iobj.damage.damage_max + ' (' + parseInt((iobj.damage.damage_min + iobj.damage.damage_max)/2, 10) + ' cp.)';
		};
		title += '<hr />';
		if (iobj.set.key){
		    title += iobj.set.name +'<hr />';
		};
		title += 'уровень: ' + (iobj.level ? iobj.level : '0') + '<br />';
		title += 'цена: ' + iobj.price + '$';
		title += '<hr />Кликнуть, чтобы одеть предмет'
		var aa = new Element ('a', {'href':'javascript:PK_S3.equip_add('+iID+');void(0);'});
		var classi = (PK_S3.svoi_veschi[iID]) ? 'bug_mini' : 'bug_mini_red';
		var img = new Element ('img', {'src':iobj.image_mini, 'class':classi, 'title':title});
		aa.appendChild(img);
		div1.appendChild(aa);
		if ((arr[i].ind < PK_S3.raboty.fort_min)||(arr[i].ind >= PK_S3.raboty.fort_max)){
		    var podp = new Element ('div', {'style':'text-align:center;'});
		    podp.textContent = PK_S3.resultaty[arr[i].ind].itemsto[PK_S3.types[j]];
		    div1.appendChild(podp);
		}
	    }
	    divIIb.appendChild(div1);
	}
	if (no_item_fort){
	    var div1 = new Element('div', {'style':'font-weight:bold;'});
	    div1.textContent = 'Слишком большое значение здоровья. Нет ни одного набора удовлетворяющего требованию!';
	    divIIb.appendChild(div1);
	}
	divII.appendChild(divIIb);
	div0.appendChild(divII);
	main.appendChild(div0);
    }
}

PK_S3.vyvod_nenuzhnykh_items = function (){
    var wind = $('pk_s3_rezultaten_arbeiten');
    wind.innerHTML = '';
    var text = new Element ('div',{'style':'margin:2px; width:675px; height:385px; overflow-y:scroll; overflow-x:none;', 'id':'pk_s3_rezultaten_arbeiten1'});
    for (var i in PK_S3.svoi_veschi){
	if (isNaN(i)) continue;
	if (!PK_S3.ispolzuemye[i]){
	    obj = PK_S3.items[i];
	    if ((obj.type == 'yield')||(obj.type == 'recipe')) continue;
	    var div1 = new Element('div', {'style':'float:left; width:39px;'});
	    var title = '<b>' + obj.name + '</b><hr />';
	    var is_f = true;
	    for (var a in obj.bonus.attributes){
		if (!is_f){
		    title += '<br />';
		}
		else{
		    is_f = false;
		}
		title += '<b>' + Character.attribute_titles[a] + ':' + obj.bonus.attributes[a] + '</b>';
	    }
	    for (var s in obj.bonus.skills){
		if (!is_f){
		    title += '<br />';
		}
		else{
		    is_f = false;
		}
		title += Character.skill_titles[s] + ':' + obj.bonus.skills[s];
	    }
	    if (obj.speed){
		if (!is_f){
		    title += '<br />';
		}
		else{
		    is_f = false;
		}
		title += 'скорость: '+Math.round(100/obj.speed)+'%';
	    }
	    if ((obj.type == 'left_arm')||(obj.type == 'right_arm')){
		if (!is_f){
		    title += '<br />';
		}
		title += 'урон: ' + obj.damage.damage_min + ' - ' + obj.damage.damage_max + ' (' + parseInt((obj.damage.damage_min + obj.damage.damage_max)/2, 10) + ' cp.)';
	    };
	    title += '<hr />';
	    if (obj.set.key){
		title += obj.set.name +'<hr />';
	    };
	    title += 'уровень: ' + (obj.level ? obj.level : '0') + '<br />';
	    title += 'цена: ' + obj.price + '$';
	    var simple = false;
	    if (obj.tradeable && obj.traderlevel && (obj.traderlevel <= 15)) simple = true;
	    if (obj.set && obj.set.key) simple = false;
	    if (obj.characterClass) simple = false;
	    var classi = (simple) ? 'bug_mini' : 'bug_mini_red';
	    var img = new Element ('img', {'src':obj.image_mini, 'class':classi, 'title':title});
	    div1.appendChild(img);
	    text.appendChild(div1);
	}
    }
    wind.appendChild(text);
}

PK_S3.print_raboty = function (arr){
    var main = $('pk_s3_rezultaten_arbeiten0');
    if (!main) return;
    main.innerHTML = '';
    for (var i = 0; i < arr.length; ++i){
	var div0 = new Element('div', {'style':'width:650px; height:138px; border-bottom: 1px solid #321; clear:both; padding-top:5px;'});
	var divI = new Element ('div', {'style':'float:left; width:260px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divI.style.width = '250px';
	}
	var divIo = new Element ('div', {'style':'float:left; width:27px; height:81px;'});
	var tmp_div = new Element ('div', {'style':'float:left; padding: 2px;'});
	var aa0 = new Element ('a', {'href':'javascript:PK_S3.equip_items_save('+arr[i].ind+')'});
	var img0 = new Element ('img', {'style':'width:23px; height:23px; background:url("../images/window/messages/icons.png") repeat scroll -217px -2px transparent; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Сохранить комплект...'});
	aa0.appendChild(img0);
	tmp_div.appendChild(aa0);
	var aa1 = new Element ('a', {'href':'javascript:PK_S3.equip_items_delete('+arr[i].ind+')'});
	var img1 = new Element ('img', {'style':'width:23px; height:23px; background:url("../images/window/messages/icons.png") repeat scroll -265px -2px transparent; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Удалить комплект'});
	aa1.appendChild(img1)
	tmp_div.appendChild(aa1);
	var aa2 = new Element ('a', {'href':'javascript:PK_S3.except_raboty('+arr[i].ind+', true)'});
	var img2 = new Element ('img', {'style':'width:23px; height:23px; background:url("../images/window/messages/icons.png") repeat scroll -241px -2px transparent; display:block; margin: 2px;', 'src':'/images/transparent.png', 'title':'Скрыть работу'});
	aa2.appendChild(img2)
	tmp_div.appendChild(aa2);
	divIo.appendChild(tmp_div);
	divI.appendChild(divIo);
	var divIa = new Element ('div', {'style':'float:left;'});
	divIa1 = new Element ('div', {'style':'heigth:20px; font-weight:bold;'});
	var tname = PK_S3.raboty[arr[i].ind].rus_name;
	if (tname.length > 28) tname = tname.slice(0,25) + '...';
	divIa1.textContent = tname;
	divIa.appendChild(divIa1);
	var divIa2 = new Element('div');
	var divIa2i = new Element ('div', {'style':'float:left'});
	var src = '';
	if (arr[i].ind <= PK_S3.raboty.max){
	    src = '/images/jobs/'+PK_S3.raboty[arr[i].ind].name+'.png';
	}
	else if ((arr[i].ind == PK_S3.raboty.health)||(arr[i].ind == PK_S3.raboty.energy)){
	    src = '/images/jobs/sleep.png';
	}
	else if (arr[i].ind == PK_S3.raboty.moving){
	    src = '/images/jobs/walk.png';
	}
	else if (arr[i].ind == PK_S3.raboty.build){
	    src = '/images/jobs/build.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_middle)){
	    src = '/images/fort/battle/button_attack.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_middle) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    src = '/images/fort/battle/button_defend.png';
	}
	else if ((arr[i].ind >= PK_S3.raboty.duel_min) && (arr[i].ind < PK_S3.raboty.duel_max)){
	    src = '/images/jobs/duell.png';
	}
	else{
	    src = '/images/skill/skill_pure.jpg';
	}
	var title = PK_S3.raboty[arr[i].ind].rus_name + '<hr />Кликнуть, чтобы одеть выбранные вещи';
	var img0 = new Element ('img', {'src':src, 'title':title, 'alt':title, 'style':'width:63px; height:63px;'});
	var aa = new Element('a', {'href':'javascript:PK_S3.equip_adds('+arr[i].ind+');void(0);'});
	aa.appendChild(img0);
	divIa2i.appendChild(aa);
	divIa2.appendChild(divIa2i);
	var divIa2ii = new Element ('div', {'style':'float:left;'});
	divIa2ii.innerHTML=' ';
	var dob = 0;
	for (var iii in PK_S3.raboty[arr[i].ind].resultaty.produkty){
	    ++dob;
	    if (isNaN(iii)) continue;
	    var tmp_div = new Element('div', {'style':'float:left; padding: 10px 2px 0px 2px; text-align:center;'});
	    var img = new Element ('img', {'src':PK_S3.items[iii].image_mini, 'title':PK_S3.items[iii].name, 'alt':PK_S3.items[iii].name, 'class':'bug_mini', 'style':'clear:both; display:block'});
	    tmp_div.appendChild(img);
	    //divIa2ii.appendChild(img);
	    span = new Element ('span');
	    var val = Math.round(PK_S3.raboty[arr[i].ind].resultaty.produkty[iii] * PK_S3.bonus.money * PK_S3.bonus.drop)
	    span.textContent = '' + ((val>100)?100:val) + '%';
	    if (PK_S3.bonus.money > 1.0){
		span.style.color = '#287f10';
		span.style.fontWeight = 'bold';
	    }
	    tmp_div.appendChild(span);
	    divIa2ii.appendChild(tmp_div);
	}
	if (dob == 0){
	    var tmp_div = new Element('div', {'style':'float:left; padding: 10px 2px 0px 2px; text-align:center;'});
	    var img = new Element ('img', {'src':'/images/transparent.png', 'title':'', 'alt':'', 'class':'bug_mini', 'style':'clear:both; display:block'});
	    tmp_div.appendChild(img);
	    //divIa2ii.appendChild(img);
	    divIa2ii.appendChild(tmp_div);
	}
	divIa2ii.appendChild(tmp_div);
	divIa2.appendChild(divIa2ii);
	divIa.appendChild(divIa2);
	divI.appendChild(divIa);
	if (arr[i].ind <= PK_S3.raboty.max){
	    var divIb = new Element('div', {'style':'clear:both;'});
	    var divIb1 = new Element('div', {'style':'width:110px; float:left;', 'title':'Заработок'});
	    var img0 = new Element('img', {'src':'/images/job/dollar.png', 'style':'float:left;'});
	    divIb1.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.dengi*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.dengi+'%';
	    bar.appendChild(bar_perc);
	    divIb1.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = PK_S3.resultaty[arr[i].ind].dengi + '$';
	    divIb1.appendChild(span);
	    divIb.appendChild(divIb1);

	    var divIb3 = new Element('div', {'style':'float:left;', 'title':'Удача'});
	    var img0 = new Element('img', {'src':'/images/job/luck.png', 'style':'float:left;'});
	    divIb3.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.vezenie*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.vezenie+'%';
	    bar.appendChild(bar_perc);
	    divIb3.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = Math.round(PK_S3.resultaty[arr[i].ind].vezenie/3)+' - ' + PK_S3.resultaty[arr[i].ind].vezenie + ' ($)';
	    divIb3.appendChild(span);
	    divIb.appendChild(divIb3);

	    var divIb2 = new Element('div', {'style':'width:110px; float:left;', 'title':'Опыт'});
	    var img0 = new Element('img', {'src':'/images/job/experience.png', 'style':'float:left;'});
	    divIb2.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.opyt*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.opyt+'%';
	    bar.appendChild(bar_perc);
	    divIb2.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent = PK_S3.resultaty[arr[i].ind].opyt + ' XP';
	    divIb2.appendChild(span);
	    divIb.appendChild(divIb2);

	    var divIb4 = new Element('div', {'style':'float:left;', 'title':'Опасность'});
	    var img0 = new Element('img', {'src':'/images/job/danger.png', 'style':'float:left;'});
	    divIb4.appendChild(img0);
	    var bar = new Element('div', {'class':'bar', 'style':'width:26px; border:1px solid black; float:left;'})
	    var bar_fill = new Element('div', {'class':'bar_fill', 'style':'width:'+Math.round(PK_S3.raboty[arr[i].ind].resultaty.boom*.25)+'px;'})
	    bar.appendChild(bar_fill);
	    var bar_perc = new Element('div', {'class':'bar_perc', 'style':'width:25px;'});
	    bar_perc.textContent = PK_S3.raboty[arr[i].ind].resultaty.boom+'%';
	    bar.appendChild(bar_perc);
	    divIb4.appendChild(bar);
	    var span = new Element('div', {'style':'float:left; font-weight:bold; margin: 2px 0px 0px 5px;'});
	    span.textContent =  PK_S3.resultaty[arr[i].ind].boom + ' !';
	    divIb4.appendChild(span);
	    divIb.appendChild(divIb4);

	    divI.appendChild(divIb);
	}
	div0.appendChild(divI);
	var divII = new Element('div', {'style':'width:390px; float:left;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divII.style.width = '400px';
	}
	var divIIa = new Element ('div', {'style':'clear:both;'});
	var divIIa1 = new Element ('div', {'style':'float:left; width:105px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    divIIa1.style.width = '115px';
	}
	var tmp_div = new Element ('span', {'style':'float:left; width:47px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.style.width = '57px';
	}
	var title = 'Бонус своих навыков';
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Бонус верховой езды';
	}
	else if ((arr[i].ind == PK_S3.raboty.energy)||(arr[i].ind == PK_S3.raboty.health)){
	    title = 'Свой навык здоровья';
	}
	if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.innerHTML = '<img src="images/fort/battle/attacker_primary.png" title="Атака" /> '+PK_S3.resultaty[arr[i].ind].selfTO;
	}
	else{
	    tmp_div.innerHTML = '<img src="images/task_points/plus.png" width="20" height="20" title="'+title+'" /> '+PK_S3.resultaty[arr[i].ind].selfTO;
	}
	if ((arr[i].ind < PK_S3.raboty.max)&&(PK_S3.resultaty[arr[i].ind].selfTO > PK_S3.raboty[arr[i].ind].malus)){
	    tmp_div.style.color = "#060";
	    tmp_div.style.fontWeight = "bold";
	}
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; clear:right; width:58px;'});
	var title = 'Бонус экипировки';
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Бонус к скорости';
	}
	else if ((arr[i].ind == PK_S3.raboty.energy)||(arr[i].ind == PK_S3.raboty.health)){
	    title = 'Бонус к навыку здоровья';
	}
	if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.innerHTML = '<img src="images/fort/battle/defender_primary.png" title="Защита" /> '+PK_S3.resultaty[arr[i].ind].bonus;
	}
	else{
	    tmp_div.innerHTML = '<img src="images/task_points/plus.png" width="20" height="20" title="'+title+'" /> '+PK_S3.resultaty[arr[i].ind].bonus;
	}
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; width:47px;'});
	if ((arr[i].ind >= PK_S3.raboty.fort_min)&&(arr[i].ind < PK_S3.raboty.fort_max)){
	    tmp_div.style.width = '57px';
	}
	tmp_div.innerHTML = '<img src="images/task_points/minus.png" width="20" height="20" title="Сложность работы" /> '+PK_S3.raboty[arr[i].ind].malus;
	divIIa1.appendChild(tmp_div);
	var tmp_div = new Element ('span', {'style':'float:left; clear:right; width:58px;'});
	var title = 'Трудовых очков';
	var t0 = PK_S3.resultaty[arr[i].ind].TO;
	if (arr[i].ind == PK_S3.raboty.moving){
	    title = 'Итоговая скорость';
	    t0 += '%';
	}
	else if (arr[i].ind == PK_S3.raboty.energy){
	    title = 'Процент регенерации';
	    t0 += '%';
	}
	else if (arr[i].ind == PK_S3.raboty.health){
	    title = 'Итоговое здоровье'
	}
	else if ((arr[i].ind >= PK_S3.raboty.fort_min) && (arr[i].ind < PK_S3.raboty.fort_max)){
	    title = 'Значение выбранного бонуса';
	}
	tmp_div.innerHTML = '<img src="images/task_points/equal.png" width="20" height="20" title="'+title+'" /> <b>'+t0+'</b>';
	if (t0 < 0){
	    tmp_div.style.color = "maroon";
	}
	if ((arr[i].ind < PK_S3.raboty.max)&&(PK_S3.resultaty[arr[i].ind].TO > 0)){
	    tmp_div.style.color = "#00c";
	}
	divIIa1.appendChild(tmp_div);
	divIIa.appendChild(divIIa1);
	var divIIa2 = new Element ('div', {'style':'float:left; width: 285px;'})
	for (var s in PK_S3.raboty[arr[i].ind].navyki){
	    for (var j = 0; j < PK_S3.raboty[arr[i].ind].navyki[s]; ++j){
		// skill_box skill_flexibility img0
		if (PK_S3.skill2atr[s]){
		    var clas = 'skill_box skill_' + PK_S3.skill2atr[s] + ' img' + (PK_S3.skillsi[s] % 5);
		    var id = 'skill_'+s;
		    var span1 = new Element('span', {'class':clas, 'title':'<b>'+Character.skill_titles[s]+':</b> '+PK_S3.resultaty[arr[i].ind].skills[s]});
		    span1.innerHTML = '<span class="skill_value">'+PK_S3.resultaty[arr[i].ind].skills[s]+'</span>';
		    
		    divIIa2.appendChild(span1);
		}
		else{ // характеристика из конструктора
		    // class="skill_box skill_circle_flexibility"
		    var clas = 'skill_box skill_circle_'+s;
		    var span1 = new Element('span', {'class':clas, 'title':Character.attribute_titles[s]+': '+PK_S3.resultaty[arr[i].ind].skills[s]});
		    span1.innerHTML = '<span class="skill_value">'+PK_S3.resultaty[arr[i].ind].skills[s]+'</span>';
		    divIIa2.appendChild(span1);
		}
	    }
	}
	divIIa.appendChild(divIIa2);
	divII.appendChild(divIIa);
	var divIIb = new Element('div', {'style':'clear:both; padding-top: 15px;'});
	var no_item_fort = true;
	for (var j = 0; j < PK_S3.types.length; ++j){
	    var div1 = new Element('div', {'style':'float:left; width:39px;'});
	    var iID = PK_S3.resultaty[arr[i].ind].items[PK_S3.types[j]];
	    if (iID&&(iID>0)){
		if ((PK_S3.types[j]!='animal')&&(PK_S3.types[j]!='left_arm')){
		    no_item_fort = false;
		}
		var iobj = PK_S3.items[iID];
		var title = '<b>' + iobj.name + '</b><hr />';
		var is_f = true;
		for (var a in iobj.bonus.attributes){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += '<b>' + Character.attribute_titles[a] + ':' + iobj.bonus.attributes[a] + '</b>';
		}
		for (var s in iobj.bonus.skills){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += Character.skill_titles[s] + ':' + iobj.bonus.skills[s];
		}
		if (iobj.speed){
		    if (!is_f){
			title += '<br />';
		    }
		    else{
			is_f = false;
		    }
		    title += 'скорость: '+Math.round(100/iobj.speed)+'%';
		}
		if ((iobj.type == 'left_arm')||(iobj.type == 'right_arm')){
		    if (!is_f){
			title += '<br />';
		    }
		    title += 'урон: ' + iobj.damage.damage_min + ' - ' + iobj.damage.damage_max + ' (' + parseInt((iobj.damage.damage_min + iobj.damage.damage_max)/2, 10) + ' cp.)';
		};
		title += '<hr />';
		if (iobj.set.key){
		    title += iobj.set.name +'<hr />';
		};
		title += 'уровень: ' + (iobj.level ? iobj.level : '0') + '<br />';
		title += 'цена: ' + iobj.price + '$';
		title += '<hr />Кликнуть, чтобы одеть предмет'
		var aa = new Element ('a', {'href':'javascript:PK_S3.equip_add('+iID+');void(0);'});
		var classi = (PK_S3.svoi_veschi[iID]) ? 'bug_mini' : 'bug_mini_red';
		var img = new Element ('img', {'src':iobj.image_mini, 'class':classi, 'title':title});
		aa.appendChild(img);
		div1.appendChild(aa);
		if ((arr[i].ind < PK_S3.raboty.fort_min)||(arr[i].ind >= PK_S3.raboty.fort_max)){
		    var podp = new Element ('div', {'style':'text-align:center;'});
		    podp.textContent = PK_S3.resultaty[arr[i].ind].itemsto[PK_S3.types[j]];
		    div1.appendChild(podp);
		}
	    }
	    divIIb.appendChild(div1);
	}
	if (no_item_fort){
	    var div1 = new Element('div', {'style':'font-weight:bold;'});
	    div1.textContent = 'Слишком большое значение здоровья. Нет ни одного набора удовлетворяющего требованию!';
	    divIIb.appendChild(div1);
	}
	divII.appendChild(divIIb);
	div0.appendChild(divII);
	main.appendChild(div0);
    }
}

PK_S3.minimize_window_rezult = function(){
    AjaxWindow.toggleSize('pereodevalka_rezult');
    setTimeout(PK_S3.minimize_window_rezult2, 100);
};

PK_S3.minimize_window_rezult2 = function(){
    var bar = $('window_bar_pereodevalka_rezult');
    if (!bar){
        setTimeout(PK_S3.minimize_window_rezult2, 100);
	return;
    }
    bar.firstChild.firstChild.nextSibling.innerHTML='Результаты';
};


PK_S3.show_window_rezultat = function (){
    var name = 'pereodevalka_rezult';
    var group = 'work';
    var window_div = $('window_' + name);
    
    if (!window_div){
	window_div = new Element('div',{'id':'window_' + name,'class':'window css_work'});
	AjaxWindow.windows[name] = window_div;
	window_div.injectInside('windows');
	window_div.centerLeft();
    }
    else{
	AjaxWindow.maximize (name);
	window_div.innerHTML = '';
    }
    AjaxWindow.bringToTop(window_div);

    var xhtml = '';
    xhtml += '<div class="window_borders">';
    xhtml += '  <h2 id="window_' + name + '_title" class="window_title"> </h2>';
    xhtml += '	<a class="window_refresh" href="javascript:AjaxWindow.close(\'' + name + '\'); PK_S3.show_window_rezultat();void(0)" title="<b>Обновить окно</b>"></a>'
    xhtml += '  <a href="javascript:AjaxWindow.closeAll();" class="window_closeall" title="<b>Закрыть все окна</b>"></a>';
    xhtml += '  <a href="javascript:PK_S3.minimize_window_rezult();" class="window_minimize" title="<b>Свернуть окно</b>"></a>';
    xhtml += '  <a href="javascript:AjaxWindow.close(\'' + name + '\');" class="window_close" title="<b>Закрыть окно</b>"></a>';
    xhtml += '  <div id="window_' + name + '_content" class="window_content">';
    xhtml += '    	<table class="shadow_table" style="margin-left:6px; width:100%; height:390px">';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_top_left"></td>';
    xhtml += '    			<td class="border_shadow_top"></td>';
    xhtml += '    			<td class="edge_shadow_top_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="border_shadow_left"></td>';
    xhtml += '    			<td class="shadow_content">';
    xhtml += '    				<div style="overflow:none; width: 675px; height:390px; position: relative;" id="pk_s3_rezultaten_arbeiten">';
    xhtml += '    				</div>';
    xhtml += '    			</td>';
    xhtml += '    			<td class="border_shadow_right"></td>';
    xhtml += '    		</tr>';
    xhtml += '    		<tr>';
    xhtml += '    			<td class="edge_shadow_bottom_left"></td>';
    xhtml += '    			<td class="border_shadow_bottom"></td>';
    xhtml += '    			<td class="edge_shadow_bottom_right"></td>';
    xhtml += '	 		</tr>';
    xhtml += '	 	</table>';
    xhtml += '	</div>';
    xhtml += '</div>';
    window_div.setHTML(xhtml);
	
    var window_title_div = $('window_' + name + '_title');
    window_div.makeDraggable({handle:window_title_div});
    window_title_div.addEvent('dblclick',function(){
				window_div.centerLeft();
				window_div.setStyle('top',133);
				});
    window_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));
    window_title_div.addEvent('mousedown',AjaxWindow.bringToTop.bind(AjaxWindow,[window_div]));

    if (PK_S3.activity == 'nenuzhnoe'){
	PK_S3.vyvod_nenuzhnykh_items();
	return;
    }
    var wind = document.getElementById('pk_s3_rezultaten_arbeiten');
    var sortir = new Element('div', {'style':'padding: 2px; width:670px; height: 28px; border-bottom: 2px solid #321;'});
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;'});
    span.textContent = 'Способ сортировки: ';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_name'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'name\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/work.png\" title=\"Название\" /></a>'
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_opyt'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'opyt\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/experience.png\" title=\"Опыт\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_dengi'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'dengi\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/dollar.png\" title=\"Заработок\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_vezenie'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'vezenie\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/luck.png\" title=\"Удача\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_boom'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'boom\', PK_S3.vyvod.type)"><img src=\"images/job/danger.png\" width="20" height="20" title=\"Опасность\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_to'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'to\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/workpoints.png\" title=\"Трудовые очки\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-right: 2px solid #321; float:left; height:20px;', 'id':'pk_s3_sortirovka_malus'});
    span.innerHTML = '<a href="javascript:PK_S3.sortirovka_rabot(\'malus\', PK_S3.vyvod.type)"><img src=\"../images/work/icons/malus.png\" title=\"Требования\" /></a>';
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-left: 2px solid #321; float:right; height:20px;'});
    var inp = new Element ('input', {'id':'pk_s3_sortirovka_native', 'title':'Учитывать эффект от текущих ТО', 'type':'checkbox', 'checked':'true', 'style':'margin: 5px 5px 5px 0px;'});
    inp.addEventListener('change',function () {PK_S3.sortirovka_rabot(PK_S3.vyvod.type);}, false);
    span.appendChild(inp);
    sortir.appendChild(span);
    var span = new Element('div', {'style':'padding: 3px; border-left: 2px solid #321; float:right; height:20px;'});
    var valueto = (PK_S3.activity=='alljob')? 0 : -999;
    var inp = new Element ('input', {'id':'pk_s3_sortirovka_valueto', 'type':'text', 'size':'3', 'value':valueto, 'title':'Отсекать с ТО, меньше чем:', 'style':'background-color:#e8dab3; margin: 0px 5px;'});
    inp.addEventListener('change',function () {this.value = parseInt(this.value); if (isNaN(this.value)) this.value=0; PK_S3.sortirovka_rabot(PK_S3.vyvod.type);}, false);
    span.appendChild(inp);
    sortir.appendChild(span);
    
    var span = new Element('div', {'style':'padding: 3px; border-left: 2px solid #321; float:right; height:21px; width:80px;'});
    var sel = new Element ('select', {'id':'restore_except_raboty','style':'background-color:#e8dab3; margin: 0px 1px; width: 50px; height:21px;'})
    var opt = new Element ('option', {'value':0});
    opt.textContent = '----';
    sel.appendChild(opt);
    for (var i = 1; i < 999; ++i){
	if (PK_S3.raboty[i] && PK_S3.raboty[i].except){
	    var opt = new Element ('option', {'value':i});
	    opt.textContent = PK_S3.raboty[i].rus_name;
	    sel.appendChild(opt);
	}
    }
    span.appendChild(sel);
    var img = new Element ('img', {'style':'width:23px; height:23px; background:url("../images/window/messages/icons.png") -25px -4px; display:inline; margin: 0px 2px;', 'src':'/images/transparent.png', 'title':'Восстановить работу'});
    img.addEventListener('click',function () {var sel = $('restore_except_raboty'); var ind = parseInt(sel.value, 10); if (ind > 0) PK_S3.except_raboty(ind, false);}, false);
    span.appendChild(img)

    sortir.appendChild(span);
    wind.appendChild(sortir);

    var text = new Element ('div',{'style':'margin:2px; width:675px; height:350px; overflow-y:scroll; overflow-x:none;', 'id':'pk_s3_rezultaten_arbeiten0'});
    text.value = (PK_S3.rezultat);
    wind.appendChild(text);

    PK_S3.sortirovka_rabot('name');
  
};


PK_S3.four_init = function (name){
    PK_S3.tekushaya_rabota = 0;
    PK_S3.resultaty = [];

    
    PK_S3.bonus.speed = (Character.characterClass != 'duelist') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.money = (PremiumBoni.hasBonus('money')) ? 1.5 : 1.0;
    PK_S3.bonus.life = (Character.characterClass != 'soldier') ? 10 : (PremiumBoni.hasBonus('character')) ? 20 : 15;
    PK_S3.bonus.exp = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.build = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.weapon = (Character.characterClass != 'soldier') ? 0 : (PremiumBoni.hasBonus('character')) ? 6 : 3;

    PK_S3.setting = {};
    PK_S3.setting.knopka = 'poehali';
    PK_S3.setting.bablo = 0;
    PK_S3.setting.is_millioner = false;
    PK_S3.setting.is_auction = false;
    PK_S3.setting.is_drop = false;
    PK_S3.setting.is_luck = false;
    PK_S3.setting.is_unique = false;
    PK_S3.setting.level = Character.level
    PK_S3.setting.slots = {};
    var slot_id = 'pk_s3_select_slot_';
    for (var i = 0; i < PK_S3.types.length; ++i){
	PK_S3.setting.slots[i] = 0;
	PK_S3.setting.slots[PK_S3.types[i]] = PK_S3.setting.slots[i];
    }

    var hp = 0;
    PK_S3.setting.min_health = (hp - 90 - Character.level * 10 - Character.skills.health * PK_S3.bonus.life) / PK_S3.bonus.life;
    PK_S3.setting.porabotaem = [];
    PK_S3.setting.s4itaem_rabot = 0;
    PK_S3.setting.sej4as_rabota = 0;

    for (var ind = PK_S3.raboty.max - 1; ind > 0; --ind){
        if (PK_S3.raboty[ind]){
	    if ((PK_S3.raboty[ind].rus_name == name)||(PK_S3.raboty[ind].orig_name == name)){
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
		break;
	    }
	}
    }
    var minimap_job = $('minimap_job_id');
    if (minimap_job){
	minimap_job.value = ind;
    }
    PK_S3.activity = 'onejob';
    PK_S3.rezultat = '';
    PK_S3.is_show_inventory = null;
    setTimeout(PK_S3.waiting_inventory, PK_S3.rekurs.delay);
}

PK_S3.second_init = function (){
    //clearInterval(PK_S3.progress.id);
    PK_S3.tekushaya_rabota = 0;
    PK_S3.resultaty = [];
    PK_S3.ispolzuemye = [];
    
    PK_S3.bonus.speed = (Character.characterClass != 'duelist') ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.2 : 1.1;
    PK_S3.bonus.money = (PremiumBoni.hasBonus('money')) ? 1.5 : 1.0;
    PK_S3.bonus.life = (Character.characterClass != 'soldier') ? 10 : (PremiumBoni.hasBonus('character')) ? 20 : 15;
    PK_S3.bonus.exp = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.build = (Character.characterClass) != 'worker' ? 1.0 : (PremiumBoni.hasBonus('character')) ? 1.1 : 1.05;
    PK_S3.bonus.weapon = (Character.characterClass != 'soldier') ? 0 : (PremiumBoni.hasBonus('character')) ? 6 : 3;

    PK_S3.setting = {};
    PK_S3.setting.knopka = (this.id == 'pk_s3_poehali') ? 'poehali' : 'to';
    PK_S3.setting.bablo = parseInt(document.getElementById('pk_s3_select_baks_n').value,10);
    PK_S3.setting.is_millioner = document.getElementById('pk_s3_select_baks_inf').checked;
    PK_S3.setting.is_auction = document.getElementById('pk_s3_select_auction').checked;
    //PK_S3.setting.is_drop = document.getElementById('pk_s3_select_drop').checked;
    PK_S3.setting.is_unique = document.getElementById('pk_s3_select_unique').checked;
    PK_S3.setting.is_luck = document.getElementById('pk_s3_select_season').checked;
    PK_S3.setting.level = parseInt(document.getElementById('pk_s3_select_level').value,10);
    if (PK_S3.setting.level<=0) PK_S3.setting.level = Character.level
    PK_S3.setting.slots = {};
    var slot_id = 'pk_s3_select_slot_';
    for (var i = 0; i < PK_S3.types.length; ++i){
	elc = document.getElementById(slot_id + i);
	PK_S3.setting.slots[i] = parseInt(elc.value, 10);;
	PK_S3.setting.slots[PK_S3.types[i]] = PK_S3.setting.slots[i];
    }

    var hp = parseInt(document.getElementById('pk_s3_select_hp').value,10);
    PK_S3.setting.min_health = (hp - 90 - Character.level * 10 - Character.skills.health * PK_S3.bonus.life) / PK_S3.bonus.life;
    PK_S3.setting.porabotaem = [];
    PK_S3.setting.s4itaem_rabot = 0;
    PK_S3.setting.sej4as_rabota = 0;
    
    var els = document.getElementById('pk_s3_select_rab');
    var el = document.getElementById('pk_s3_select_rab_ro');
    if (el.checked){
	var ind = parseInt(els.value, 10);
	PK_S3.setting.porabotaem[ind] = true;
	++PK_S3.setting.s4itaem_rabot;
	PK_S3.activity = 'onejob';
	var minimap_job = $('minimap_job_id');
	if (minimap_job){
	    minimap_job.value = ind;
	}
    }
    el = document.getElementById('pk_s3_select_rab_rn');
    if (el.checked){
	for (var i = 0; i < els.options.length; ++i){
	    if (els.options[i] && els.options[i].selected){
		var ind = parseInt(els.options[i].value, 10)
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'morejob';
    }
    el = document.getElementById('pk_s3_select_rab_rv');
    if (el.checked){
	for (var ind = 0; ind < PK_S3.raboty.max; ++ind){
	    if (PK_S3.raboty[ind]&&(!PK_S3.raboty[ind].except)){
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	if (!PK_S3.raboty[PK_S3.raboty.build].except){
	    PK_S3.setting.porabotaem[PK_S3.raboty.build] = true;
	    ++PK_S3.setting.s4itaem_rabot;
	}
	if (!PK_S3.raboty[PK_S3.raboty.energy].except){
	    PK_S3.setting.porabotaem[PK_S3.raboty.energy] = true;
	    ++PK_S3.setting.s4itaem_rabot;
	}
	if (!PK_S3.raboty[PK_S3.raboty.health].except){
	    PK_S3.setting.porabotaem[PK_S3.raboty.health] = true;
	    ++PK_S3.setting.s4itaem_rabot;
	}
	if (!PK_S3.raboty[PK_S3.raboty.moving].except){
	    PK_S3.setting.porabotaem[PK_S3.raboty.moving] = true;
	    ++PK_S3.setting.s4itaem_rabot;
	}
	PK_S3.activity = 'alljob';
    }
    var el = document.getElementById('pk_s3_select_rab_do');
    if (el.checked){
	var ind = parseInt(els.value, 10);
	PK_S3.setting.porabotaem[ind] = true;
	++PK_S3.setting.s4itaem_rabot;
	PK_S3.activity = 'oneduel';
    }
    el = document.getElementById('pk_s3_select_rab_dn');
    if (el.checked){
	for (var i = 0; i < els.options.length; ++i){
	    if (els.options[i] && els.options[i].selected){
		var ind = parseInt(els.options[i].value, 10)
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'moreduel';
    }
    el = document.getElementById('pk_s3_select_rab_dv');
    if (el.checked){
	for (var ind = PK_S3.raboty.duel_min; ind < PK_S3.raboty.duel_max; ++ind){
	    if (PK_S3.raboty[ind]&&(!PK_S3.raboty[ind].except)){
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'allduel';
    }
    var el = document.getElementById('pk_s3_select_rab_fo');
    if (el.checked){
	var ind = parseInt(els.value, 10);
	PK_S3.setting.porabotaem[ind] = true;
	++PK_S3.setting.s4itaem_rabot;
	PK_S3.activity = 'onefort';
    }
    el = document.getElementById('pk_s3_select_rab_fn');
    if (el.checked){
	for (var i = 0; i < els.options.length; ++i){
	    if (els.options[i] && els.options[i].selected){
		var ind = parseInt(els.options[i].value, 10)
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'morefort';
    }
    el = document.getElementById('pk_s3_select_rab_fv');
    if (el.checked){
	for (var ind = PK_S3.raboty.fort_min; ind < PK_S3.raboty.fort_max; ++ind){
	    if (PK_S3.raboty[ind]&&(!PK_S3.raboty[ind].except)){
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'allfort';
    }
    var el = document.getElementById('pk_s3_select_rab_oo');
    if (el.checked){
	var el1 = document.getElementById('pk_s3_select_nav');
	var ind = parseInt(el1.value, 10);
	if (ind < 100){ // навык
	    var nav = PK_S3.skills[ind]
	    for (var is = 1; is < PK_S3.raboty.max; ++is){
		if (!PK_S3.raboty[is]) continue;
		for (var ind1 in PK_S3.raboty[is].navyki){
		    if (ind1 == nav){
			PK_S3.setting.porabotaem[is] = true;
			++PK_S3.setting.s4itaem_rabot;
		    }
		}
	    }
	    for (var ind1 in PK_S3.raboty[PK_S3.raboty.build]){
		if (ind1 == nav){
		    PK_S3.setting.porabotaem[PK_S3.raboty.build] = true;
		    ++PK_S3.setting.s4itaem_rabot;
		}
	    }
	    if (nav == 'ride'){
		PK_S3.setting.porabotaem[PK_S3.raboty.moving] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	else{
	    var atr = PK_S3.attributes[ind - 100];
	    var navs = Character.skill_names[atr].toString().split(',');
	    navb = {};
	    for (var i = 0; i < navs.length; ++i){
		navb[navs[i]] = true;
	    }
	    for (var ia = 1; ia < PK_S3.raboty.max; ++ia){
		if (!PK_S3.raboty[ia]) continue;
		var count = 0;
		for (var ind1 in PK_S3.raboty[ia].navyki){
		    if (navb[ind1]){
			count += PK_S3.raboty[ia].navyki[ind1];
		    }
		}
		if (count >= 3){
		    PK_S3.setting.porabotaem[ia] = true;
		    ++PK_S3.setting.s4itaem_rabot;
		}
	    }
	    if (atr=='strength'){
		PK_S3.setting.porabotaem[PK_S3.raboty.build] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'skill';
    }
    var el = document.getElementById('pk_s3_select_rab_on');
    if (el.checked){
	var el1 = document.getElementById('pk_s3_select_product');
	var ind = parseInt(el1.value, 10);
	for (var id = 0; id < PK_S3.raboty.max; ++id){
	    if (!PK_S3.raboty[id]) continue;
	    
	    for (var ind1 in PK_S3.raboty[id].resultaty.produkty){
		if (ind == ind1){
		    PK_S3.setting.porabotaem[id] = true;
		    ++PK_S3.setting.s4itaem_rabot;
		    var minimap_job = $('minimap_job_id');
		    if (minimap_job){
			minimap_job.value = id;
		    }
		}
	    }
	}
	PK_S3.activity = 'produkt';
    }
    var el = document.getElementById('pk_s3_select_rab_ov');
    if (el.checked){
	for (var ind = 0; ind < 999; ++ind){
	    if (PK_S3.raboty[ind]&&(!PK_S3.raboty[ind].except)){
		PK_S3.setting.porabotaem[ind] = true;
		++PK_S3.setting.s4itaem_rabot;
	    }
	}
	PK_S3.activity = 'nenuzhnoe';
    }
    var el = document.getElementById('pk_s3_select_konstr_en');
    if (el.checked){
	PK_S3.raboty[999] = {rus_name:'Конструктор', name:'constructor', malus:0, navyki:{}, resultaty:{dengi:0, opyt:0, vezenie:0, boom:0, produkty:{}}};
	var el1 = document.getElementById('pk_s3_select_konstr_to');
	PK_S3.raboty[999].malus = parseInt (el1.value, 10);
	for (var j = 0; j < 4; ++j){
	    var el2 = document.getElementById('pk_s3_select_konstr_a'+j);
	    var val = parseFloat(el2.value, 10);
	    if (val > 0){
		PK_S3.raboty[999].navyki[PK_S3.attributes[j]] = val;
	    }
	}
	for (var i = 0; i < 20; ++i){
	    var el2 = document.getElementById('pk_s3_select_konstr_s'+i);
	    var val = parseFloat(el2.value, 10);
	    if (val > 0){
		PK_S3.raboty[999].navyki[PK_S3.skills[i]] = val;
	    }
	}
	PK_S3.setting.porabotaem[999]=true;
	++PK_S3.setting.s4itaem_rabot;
	PK_S3.activity = 'construct';
    }
    if (PK_S3.setting.porabotaem.length == 0) PK_S3.setting.porabotaem[0] = true;
    PK_S3.rezultat = '';
    PK_S3.is_show_inventory = null;
    setTimeout(PK_S3.waiting_inventory, PK_S3.rekurs.delay);
    
}

PK_S3.waiting_inventory = function (){
    if (PK_S3.text_info == '') PK_S3.restore_text_message();
    if ((wman.getById(Wear.uid)) && (Bag.loaded)){
	var sl='';
	for (var i in Wear.wear) sl+=i;
	if ((sl=='')&&(PK_S3.is_show_inventory < 18)){
	    setTimeout(PK_S3.waiting_inventory, 1000);
	    return;
	}
	PK_S3.parsing_inventory();
	return;
    }
    if (!PK_S3.is_show_inventory){
	PK_S3.is_show_inventory = 0;
	Wear.open();
	PK_S3.show_text_message('Ожидаем открытие багажа...',2000);
	setTimeout(function () {el = $('window_pereodevalka_setting'); if (el) AjaxWindow.bringToTop(el);}, 333);
    }
    if (PK_S3.is_show_inventory++ < 20){
	setTimeout(PK_S3.waiting_inventory, 1000);
    }
    else{
	PK_S3.show_popup_message ('error', 'Предварительно откройте окно багажа');
    }
};

PK_S3.show_popup_message = function (state, str){
    new HumanMessage(str, {type: state});
}

PK_S3.show_text_message = function (str, delay){
    if (PK_S3.text_info == ''){
	PK_S3.restore_text_message();
    }
    var current_task = $('current_task_box_text');
    if (!current_task) return;
    current_task.textContent = str;
    setTimeout (PK_S3.restore_text_message, delay);
}

PK_S3.restore_text_message = function (){
    var current_task = $('current_task_box_text');
    if (!current_task) return;
    if (PK_S3.text_info==''){
	PK_S3.text_info = current_task.innerHTML;
    }
    else{
	current_task.innerHTML = PK_S3.text_info;
	PK_S3.text_info = '';
    }
}

PK_S3.compare_item = function (obj){
    var cID = obj.item_id;
    var opisv = false;
    if (!PK_S3.items[cID]){return {err:false, mis:true, opis:false}; }
    if (!PK_S3.items[cID].item_id) {return {err:false, mis:true, opis:false}; }
    if (cID != PK_S3.items[cID].item_id) {return {err:true, mis:false, opis:false}; }
    if (!PK_S3.items[cID].type) {return {err:false, mis:true, opis:false}; }
    if (obj.type != PK_S3.items[cID].type) {return {err:true, mis:false, opis:false}; }
    if ((obj.level != PK_S3.items[cID].level)&&(obj.level)&&(PK_S3.items[cID].level)) {return {err:true, mis:false, opis:false}; }
    if ((obj.price != PK_S3.items[cID].price)&&(obj.price)&&(PK_S3.items[cID].price)) {return {err:true, mis:false, opis:false}; }
    if (obj.characterClass != PK_S3.items[cID].characterClass) {return {err:true, mis:false, opis:false}; }
    if (obj.characterSex != PK_S3.items[cID].characterSex) {return {err:true, mis:false, opis:false}; }
    if (!obj.speed){
	if (PK_S3.items[cID].speed)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].speed)	return {err:false, mis:true, opis:false};
	if (obj.speed!=PK_S3.items[cID].speed)	return {err:true, mis:false, opis:false};
    }
    for (var i = PK_S3.skills.length - 1; i >= 0; --i){
	var skill_name = PK_S3.skills[i];
	if (obj.bonus.skills[skill_name]&&PK_S3.items[cID].bonus.skills[skill_name]){
	    if (obj.bonus.skills[skill_name]!=PK_S3.items[cID].bonus.skills[skill_name])	return {err:true, mis:false, opis:false};
	}
	else if (obj.bonus.skills[skill_name])	    return {err:false, mis:true, opis:false};
	else if (PK_S3.items[cID].bonus.skills[skill_name])    return {err:true, mis:false, opis:false};	
    }
    for (var i = PK_S3.attributes.length - 1; i >= 0; --i){
	var attribute_name = PK_S3.attributes[i];
	if (obj.bonus.attributes[attribute_name]&&PK_S3.items[cID].bonus.attributes[attribute_name]){
	    if (obj.bonus.attributes[attribute_name]!=PK_S3.items[cID].bonus.attributes[attribute_name])	return {err:true, mis:false, opis:false};
	}
	else if (obj.bonus.attributes[attribute_name])	    return {err:false, mis:true, opis:false};
	else if (PK_S3.items[cID].bonus.attributes[attribute_name])    return {err:true, mis:false, opis:false};
    }

    if (obj.bonus.fortbattle){
	if (!PK_S3.items[cID].bonus.fortbattle)	return {err:false, mis:true, opis:false};
	for (var i = PK_S3.fort_affects.length - 1; i >= 0; --i){
	    if (obj.bonus.fortbattle[PK_S3.fort_affects[i]]){
		if (!PK_S3.items[cID].bonus.fortbattle[PK_S3.fort_affects[i]])	return {err:false, mis:true, opis:false};
		if (obj.bonus.fortbattle[PK_S3.fort_affects[i]] != PK_S3.items[cID].bonus.fortbattle[PK_S3.fort_affects[i]])	return {err:true, mis:false, opis:false};
	    }
	    else{
		if (PK_S3.items[cID].bonus.fortbattle[PK_S3.fort_affects[i]])	return {err:true, mis:false, opis:false};
	    }
	}
    }
    else{
	if (PK_S3.items[cID].bonus.fortbattle)	return {err:true, mis:false, opis:false};
    }
    for (var i = PK_S3.fort_affects.length - 1; i >= 0; --i){
	if (obj.bonus.fortbattlesector[PK_S3.fort_affects[i]]){
	    if (!PK_S3.items[cID].bonus.fortbattlesector[PK_S3.fort_affects[i]])	return {err:false, mis:true, opis:false};
	    if (obj.bonus.fortbattlesector[PK_S3.fort_affects[i]] != PK_S3.items[cID].bonus.fortbattlesector[PK_S3.fort_affects[i]])	return {err:true, mis:false, opis:false};
	}
	else{
	    if (PK_S3.items[cID].bonus.fortbattlesector[PK_S3.fort_affects[i]])	return {err:true, mis:false, opis:false};
	}
    }
    if (!obj.set){
	if (PK_S3.items[cID].set.key)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].set.key)	return {err:false, mis:true, opis:false};
	if (obj.set.key!=PK_S3.items[cID].set.key)	return {err:true, mis:false, opis:false};
	if (PK_S3.vyvod.region=='ru'){
	    if (obj.set.name!=PK_S3.items[cID].set.name)	opisv=true;
	}
    }
    if (!obj.damage){
	if (PK_S3.items[cID].damage)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].damage)	return {err:false, mis:true, opis:false};
	if (obj.damage.damage_min!=PK_S3.items[cID].damage.damage_min)	return {err:true, mis:false, opis:false};
	if (obj.damage.damage_max!=PK_S3.items[cID].damage.damage_max)	return {err:true, mis:false, opis:false};
    }
    if (!obj.traderlevel){
	if (PK_S3.items[cID].traderlevel)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].traderlevel)	return {err:false, mis:true, opis:false};
	if (obj.traderlevel!=PK_S3.items[cID].traderlevel)	return {err:true, mis:false, opis:false};
    }
    if (!obj.auctionable){
	if (PK_S3.items[cID].auctionable)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].auctionable)	return {err:false, mis:true, opis:false};
    }
    if (!obj.dropable){
	if (PK_S3.items[cID].dropable)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].dropable)	return {err:false, mis:true, opis:false};
    }
    
    if (!obj.tradeable){
	if (PK_S3.items[cID].tradeable)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].tradeable)	return {err:false, mis:true, opis:false};
    }
    
    if (!obj.sellable){
	if (PK_S3.items[cID].sellable)	return {err:true, mis:false, opis:false};
    }
    else{
	if (!PK_S3.items[cID].sellable)	return {err:false, mis:true, opis:false};
    }
//sub_type
    if (!obj.sub_type){
	if (PK_S3.items[cID].sub_type)	return {err:true, mis:false, opis:false};
    }
    else{
	if (obj.sub_type!=PK_S3.items[cID].sub_type)	return {err:true, mis:false, opis:false};
    }
    if (obj.short != PK_S3.items[cID].nshort)	opisv = true;
    if (PK_S3.vyvod.region=='ru'){
	if (obj.name != PK_S3.items[cID].name)	opisv = true;
    }
    if (obj.image != PK_S3.items[cID].image)	opisv = true;
    if (obj.image_mini != PK_S3.items[cID].image_mini)	opisv = true;
    return {err:false, mis:false, opis:opisv};
};

PK_S3.assign_item = function (obj){
    var cID = obj.item_id;
    PK_S3.items[cID] = {item_id:obj.item_id, nshort:obj.short, name:obj.name, type:obj.type, level:obj.level, price:obj.price, image:obj.image, image_mini:obj.image_mini, characterClass:obj.characterClass, characterSex:obj.characterSex, speed:obj.speed, bonus:obj.bonus, set:obj.set, traderlevel:obj.traderlevel, auctionable:obj.auctionable, dropable:obj.dropable, tradeable:obj.tradeable, sellable:obj.sellable};
    if (!PK_S3.items[cID].bonus)	PK_S3.items[cID].bonus	= {};
    if (!PK_S3.items[cID].bonus.skills)	PK_S3.items[cID].bonus.skills = {};
    if (!PK_S3.items[cID].bonus.attributes)	PK_S3.items[cID].bonus.attributes = {};
    if (!PK_S3.items[cID].bonus.fortbattle)	PK_S3.items[cID].bonus.fortbattle = {};
    if (!PK_S3.items[cID].bonus.fortbattlesector)	PK_S3.items[cID].bonus.fortbattlesector = {};
    if (!PK_S3.items[cID].set)	PK_S3.items[cID].set = {key:null, name:null};
    if (obj.damage)	PK_S3.items[cID].damage = obj.damage;
    if (obj.sub_type)	PK_S3.items[cID].sub_type = obj.sub_type;
};

PK_S3.print_item = function (cID){
    var str='';
    obj = PK_S3.items[cID];
    str += '    PK_S3.items['+cID+'] = {item_id:'+cID+', nshort:\''+obj.nshort;
    var cl = (obj.level) ? obj.level : '0'
    str += '\', name:\'' + obj.name + '\', type:\''+obj.type+'\', level:'+cl;
    var cp = obj.price ? obj.price : 0;
    str += ', price:'+cp+', image:\''+obj.image+'\', image_mini:\''+obj.image_mini+'\'';
    if (obj.characterClass) str += ', characterClass:\''+ obj.characterClass + '\'';
    if (obj.characterSex) str += ', characterSex:\'' + obj.characterSex + '\'';
    if (obj.speed) str += ', speed:' + obj.speed;
    str += ', bonus:{skills:{';

    var ss = false;
    for (var i = PK_S3.skills.length - 1; i >= 0; --i){
	if (obj.bonus.skills[PK_S3.skills[i]]){
	    if (ss){
		str += ', ';
	    }
	    else ss = true;
	    str += PK_S3.skills[i]+':'+obj.bonus.skills[PK_S3.skills[i]];
	}
    }
    str += '}, attributes:{';
    var aa = false;
    for (var i = PK_S3.attributes.length - 1; i >= 0; --i){
	if (obj.bonus.attributes[PK_S3.attributes[i]]){
	    if (aa){
		str += ', ';
	    }
	    else aa = true;
	    str += PK_S3.attributes[i]+':'+obj.bonus.attributes[PK_S3.attributes[i]];
	}
    }
    str += '}, fortbattle:{';
    var fb = false;
    for (var i = PK_S3.fort_affects.length - 1; i >= 0; --i){
	if (obj.bonus.fortbattle[PK_S3.fort_affects[i]]){
	    if (fb){
		str += ', ';
	    }
	    else fb = true;
	    str += PK_S3.fort_affects[i]+':'+obj.bonus.fortbattle[PK_S3.fort_affects[i]];
	}
    }
    str += '}, fortbattlesector:{';
    var fb = false;
    for (var i = PK_S3.fort_affects.length - 1; i >= 0; --i){
	if (obj.bonus.fortbattlesector[PK_S3.fort_affects[i]]){
	    if (fb){
		str += ', ';
	    }
	    else fb = true;
	    str += PK_S3.fort_affects[i]+':'+obj.bonus.fortbattlesector[PK_S3.fort_affects[i]];
	}
    }
    str += '}}, set:{'
    if (obj.set.key) {
	str += 'key:\'' + obj.set.key + '\', name:\'' + obj.set.name + '\'';
    }
    str += '}';
    if (obj.traderlevel) str += ', traderlevel:' + obj.traderlevel;
    if (obj.auctionable) str += ', auctionable:' + obj.auctionable;
    if (obj.dropable) str += ', dropable:' + obj.dropable;
    if (obj.tradeable) str += ', tradeable:' + obj.tradeable;
    if (obj.sellable) str += ', sellable:' + obj.sellable;
    if (obj.damage){
	str += ', damage:{damage_min:' + obj.damage.damage_min + ', damage_max:' + obj.damage.damage_max + '}';
    }
    if (obj.sub_type){
	str += ', sub_type:\'' + obj.sub_type +'\'';
    }
    str += '};\n';
    return str;
}

PK_S3.parsing_inventory = function (){
    var bagazh = Bag.items;
    var odezhda = Wear.wear;
    PK_S3.svoi_veschi = [];
    PK_S3.vozmozhnye_veschi = [];
    PK_S3.nado_veschi = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	var typ = PK_S3.types[i];
	for (var vv in bagazh[typ]){
	    if (!bagazh[typ][vv].obj) continue;
	    var compar = PK_S3.compare_item(bagazh[typ][vv].obj);
	    if (compar.err||compar.mis||compar.opis){
	        PK_S3.assign_item(bagazh[typ][vv].obj);
	        PK_S3.informer += compar.err ? 'Информация о предмете неверна:\n' : compar.mis ? 'Отсутвует/неполное описание предмета:\n' : 'Неверное наименование предмета:\n'
	        PK_S3.informer += PK_S3.print_item(bagazh[typ][vv].obj.item_id) + '\n';
	    }
	    PK_S3.svoi_veschi[bagazh[typ][vv].obj.item_id] = true;
	}
    }
    for (var i = 0; i < PK_S3.types.length; ++i){
	if (odezhda[PK_S3.types[i]]){
	    var compar = PK_S3.compare_item(odezhda[PK_S3.types[i]].obj);
	    if (compar.err||compar.mis||compar.opis){
		PK_S3.assign_item(odezhda[PK_S3.types[i]].obj);
		PK_S3.informer += compar.err ? 'Информация о предмете неверна:\n' : compar.mis ? 'Отсутвует/неполное описание предмета:\n' : 'Неверное наименование предмета:\n'
		PK_S3.informer += PK_S3.print_item(odezhda[PK_S3.types[i]].obj.item_id) + '\n';
	    }
	    PK_S3.svoi_veschi[odezhda[PK_S3.types[i]].obj.item_id] = true;
	    if (PK_S3.setting.slots[i] == 98){// забинден предмет из экипировки.
		PK_S3.setting.slots[i] = odezhda[PK_S3.types[i]].obj.item_id;
		PK_S3.setting.slots[PK_S3.types[i]] = odezhda[PK_S3.types[i]].obj.item_id;
	    }
	}
	else{
	    if (PK_S3.setting.slots[i] == 98){// забинден пустой слот из экипировки
		PK_S3.setting.slots[i] = 99;
		PK_S3.setting.slots[PK_S3.types[i]] = 99;
	    }
	}
    }
    if (PK_S3.informer != ''){
	PK_S3.show_window_informer();
    }
    PK_S3.otbor_vozmozhnyh()
};

PK_S3.otbor_vozmozhnyh = function (){
    for (var id in PK_S3.items){
	if (isNaN(id)) continue;
	var obj = PK_S3.items[id];
	// 0 - перебор, 99 - пустота, 98 - экипировка
	// отсекаем рецепты, и прочий крафт - там undefined
	if (PK_S3.setting.slots[obj.type] != 0) continue; 
	if (obj.characterClass&&(obj.characterClass != Character.characterClass)) continue;
	if (obj.characterSex&&(obj.characterSex != Character.characterSex)) continue;
	var lvl = PK_S3.setting.level;
	if ((obj.type=='left_arm')||(obj.type=='right_arm')) lvl += PK_S3.bonus.weapon;
	if (obj.level&&(obj.level>lvl)) continue;
	var add = false;
	if (!PK_S3.svoi_veschi[id]){// предмета в рюкзаке/экипировке нет. проверка на покупку/нахождение
	    var is_shop = obj.tradeable && obj.traderlevel && (obj.traderlevel <= 15);
	    if (is_shop){	// торгуется в магазинах
		if (PK_S3.setting.is_millioner){
		    add = true;
		}
		else if (PK_S3.setting.bablo >= obj.price){
		    add = true;
		}
	    }
	    if (PK_S3.setting.is_auction){
		if (obj.auctionable && !is_shop){
		    if (PK_S3.setting.is_millioner){
			add = true
		    }
		    else if (PK_S3.setting.bablo >= obj.price){
			add = true;
		    }
		}
	    }
	    if (PK_S3.setting.is_drop){	// удача, удача и ещё раз удача :)
		if (obj.dropable&& !is_shop){
		    add = true;
		}
	    }
	    if (PK_S3.setting.is_unique && !is_shop && !obj.auctionable && !obj.dropable){
		add = true;
	    }
	}
	else{	// своя вещь
	    add = true; 
	}
	if (add) PK_S3.vozmozhnye_veschi[id] = true;
    }
    // проверяем "бинды" экипировки/вещей
    for (var i = 0; i < 10; ++i){
	if (PK_S3.setting.slots[i] != 0){
	    if (PK_S3.setting.slots[i] == 99) continue;
	    PK_S3.vozmozhnye_veschi[PK_S3.setting.slots[i]] = true;
	    PK_S3.nado_veschi[PK_S3.setting.slots[i]] = true;
	}
    }
    if (PK_S3.setting.knopka=='poehali'){
	setTimeout(PK_S3.otbor_nuzhnykh, PK_S3.rekurs.delay);
    }
    else{
	setTimeout(PK_S3.prostoj_otbor_to, PK_S3.rekurs.delay);
    }
}

PK_S3.summa_to = function (bonus, navyki){
    var to = 0;
    for (var num_index in navyki){
	if (bonus.skills[num_index]){
	    to += bonus.skills[num_index] * navyki[num_index];
	}
	if (PK_S3.skill2atr[num_index] && bonus.attributes[PK_S3.skill2atr[num_index]]){
	    to+=bonus.attributes[PK_S3.skill2atr[num_index]] * navyki[num_index];
	}
	if (bonus.attributes[num_index]){
	    to += bonus.attributes[num_index] * navyki[num_index];
	}
    }
    return to;
};

PK_S3.summa_to2 = function (bonus, navyki){
    var to = 0;
    for (var num_index in navyki){
	if (bonus.skills[num_index]){
	    to += bonus.skills[num_index] * navyki[num_index];
	}
	else if (bonus.attributes[num_index]){
	    to += bonus.attributes[num_index] * navyki[num_index];
	}
    }
    
    return to;
}

PK_S3.cena_pods4eta = function(obj){
    var cID = obj.item_id;
    if (PK_S3.svoi_veschi[cID]) return 0;
    if (PK_S3.nado_veschi[cID]) return 0;
    var is_shop = obj.tradeable && obj.traderlevel && (obj.traderlevel <= 15);
    if (is_shop && PK_S3.setting.is_millioner)	return 0;
    if (obj.auctionable && !is_shop && PK_S3.setting.is_auction){
	if (PK_S3.setting.is_millioner){
	    return 0;
	}
    }
    if (obj.dropable &&  !is_shop && PK_S3.setting.is_drop)	return 0;
    if (PK_S3.setting.is_unique && !is_shop && !obj.auctionable && !obj.dropable) return 0;
    return obj.price;
}

PK_S3.prostoj_otbor_to = function(){
    for (var irabota in PK_S3.setting.porabotaem){
	if (isNaN(irabota))	continue;
	if (!PK_S3.setting.porabotaem[irabota])	continue;
	PK_S3.setting.porabotaem[irabota] = false;
	++PK_S3.setting.sej4as_rabota;
	if (irabota==0) {PK_S3.show_popup_message('error', 'Сначала выберите работу, дуэль, форт, конструктор или спец. перебор'); setTimeout(PK_S3.otbor_nuzhnykh, 100);continue};
	PK_S3.tekushaya_rabota = irabota;
	var crabota = PK_S3.raboty[irabota];
	var is_duel = ((irabota >= PK_S3.raboty.duel_min)&&(irabota < PK_S3.raboty.duel_max)) ? true : false;
	var hand_shot = Character.skills.punch - Character.skills.shot;
	if (is_duel){
	    if (crabota.navyki.punch){
		hand_shot = 100;
	    }
	    else if (crabota.navyki.shot){
		hand_shot = -100;
	    }
	}
	if (PK_S3.vyborka_to){
	    PK_S3.vyborka_to = null;
	}
	PK_S3.vyborka_to = [];
	for (var i = 0; i < PK_S3.types.length; ++i){
	    PK_S3.vyborka_to[PK_S3.types[i]] = [];
	    PK_S3.vyborka_to[PK_S3.types[i]].push ({bonus:0, id:0});
	}
	for (var i in PK_S3.vozmozhnye_veschi){
	    if (isNaN(i)) continue;
	    var cID = i;
	    var vesch = PK_S3.items[cID];
	    var ochki = PK_S3.summa_to(vesch.bonus, crabota.navyki);
	    if (is_duel&&(vesch.type=='right_arm')){
		ochki += (vesch.damage.damage_min + vesch.damage.damage_max)/2;
		if (vesch.sub_type=='hand'){
		    ochki += hand_shot;
		}
		if (vesch.sub_type=='shot'){
		    ochki -= hand_shot;
		}
	    }
	    if ((ochki > 0)){
		for (var ind = PK_S3.vyborka_to[vesch.type].length; ind > 0; --ind){
		    if (PK_S3.vyborka_to[vesch.type][ind-1].bonus < ochki){
			if (PK_S3.vyborka_to[vesch.type].length == ind){
			    PK_S3.vyborka_to[vesch.type].push ({bonus: ochki, id: cID});
			}
			else{
			    PK_S3.vyborka_to[vesch.type].splice (ind, 0, {bonus: ochki, id: cID})
			}
			break;
		    }
		}
		if ((ind == 0)&&(PK_S3.vyborka_to[vesch.type].length < PK_S3.vsego_s_TO)){
		    PK_S3.vyborka_to[vesch.type].unshift ({bonus:ochki, id: cID})
		}
		else if (PK_S3.vyborka_to[vesch.type].length > PK_S3.vsego_s_TO){
		    PK_S3.vyborka_to[vesch.type].shift();
		}
	    }
	}
	for (var j = 0; is_duel && (j < PK_S3.vyborka_to.right_arm.length); ++j){
	    PK_S3.vyborka_to.right_arm[j].bonus -= (vesch.damage.damage_min + vesch.damage.damage_max)/2;
	    if (vesch.sub_type=='hand'){
		PK_S3.vyborka_to.right_arm[j].bonus -= hand_shot;
	    }
	    if (vesch.sub_type=='shot'){
		PK_S3.vyborka_to.right_arm[j].bonus += hand_shot;
	    }
	}
	PK_S3.podgotavlivaem_rezultat_to();
    }
    PK_S3.vyvod_prostyh_rabot();
}

PK_S3.otbor_nuzhnykh = function(){
    for (var irabota in PK_S3.setting.porabotaem){
	if (isNaN(irabota))	continue;
	if (!PK_S3.setting.porabotaem[irabota])	continue;
	PK_S3.setting.porabotaem[irabota] = false;
	++PK_S3.setting.sej4as_rabota;
	if (irabota==0) {PK_S3.show_popup_message('error', 'Сначала выберите работу, дуэль, форт, конструктор или спец. перебор'); setTimeout(PK_S3.otbor_nuzhnykh, 100);continue};
	if (irabota == PK_S3.raboty.moving){
	    PK_S3.otbor_nuzhnykh_moving();
	    return;
	}
	if (irabota == PK_S3.raboty.energy){
	    PK_S3.otbor_nuzhnykh_sleep();
	    return;
	}
	if ((irabota >= PK_S3.raboty.fort_min)&&(irabota < PK_S3.raboty.fort_max)){
	    PK_S3.otbor_nuzhnykh_fort(irabota);
	    return;
	}

	PK_S3.tekushaya_rabota = irabota;
	var crabota = PK_S3.raboty[irabota];
	var is_duel = ((irabota >= PK_S3.raboty.duel_min)&&(irabota < PK_S3.raboty.duel_max)) ? true : false;
	var hand_shot = Character.skills.punch - Character.skills.shot;
	if (is_duel){
	    if (crabota.navyki.punch){
		hand_shot = 100;
	    }
	    else if (crabota.navyki.shot){
		hand_shot = -100;
	    }
	}
	if (PK_S3.vyborka) PK_S3.vyborka = null;
	PK_S3.vyborka = [];
	for (var i = 0; i < PK_S3.types.length; ++i){
	    PK_S3.vyborka[PK_S3.types[i]] = [];
	    for (var j = 0; j < PK_S3.nabory.length; ++j){
		PK_S3.vyborka[PK_S3.types[i]][PK_S3.nabory[j]] = null;
	    }
	    PK_S3.vyborka[PK_S3.types[i]]['simple'] = [];
	    PK_S3.vyborka[PK_S3.types[i]].simple[0] = {bonus: 0, price: 0, id: 0}
	}
	for (var i in PK_S3.vozmozhnye_veschi){
	    if (isNaN(i)) continue;
	    var cID = i;
	    var vesch = PK_S3.items[cID];
	    var ochki = PK_S3.summa_to(vesch.bonus, crabota.navyki);
	    if (is_duel&&(vesch.type=='right_arm')){
		ochki += (vesch.damage.damage_min + vesch.damage.damage_max)/2;
		if (vesch.sub_type=='hand'){
		    ochki += hand_shot;
		}
		if (vesch.sub_type=='shot'){
		    ochki -= hand_shot;
		}
	    }
	    var cena = PK_S3.cena_pods4eta(vesch);
	    if (vesch.set.key){
		if (!PK_S3.vyborka[vesch.type][vesch.set.key] || (PK_S3.vyborka[vesch.type][vesch.set.key].bonus <= ochki)){
		    PK_S3.vyborka[vesch.type][vesch.set.key] = {bonus: ochki, price: cena, id: cID};
		}
	    }
	    if (vesch.type=='animal'){
		if (PK_S3.vyborka.animal.simple.length > 0){
		    aID = PK_S3.vyborka.animal.simple[0].id;
		    if ((PK_S3.items[aID].speed > vesch.speed)&&(PK_S3.vyborka.animal.simple[0].bonus <= ochki)){
			PK_S3.vyborka.animal.simple[0] = {bonus: ochki, price:cena, id:cID}
		    }
		}
	    }
	    if ((ochki > 0)){
		var add = true;
		for (var ii = PK_S3.vyborka[vesch.type].simple.length - 1; ii >= 0 ; --ii){
		    if ((PK_S3.vyborka[vesch.type].simple[ii].bonus >= ochki) && (PK_S3.vyborka[vesch.type].simple[ii].price <= cena)){
			add = false; break;
		    }
		    if ((PK_S3.vyborka[vesch.type].simple[ii].bonus <= ochki) && (PK_S3.vyborka[vesch.type].simple[ii].price >= cena)){
			PK_S3.vyborka[vesch.type].simple.splice(ii,1);
			continue;
		    }
		}
		if (add) PK_S3.vyborka[vesch.type].simple.push( {bonus:ochki, price:cena, id: cID});
	    }
	}
	PK_S3.nabory_dlya_raboty = {};
	for (var i = 0; i < PK_S3.nabory.length; ++i){
	    PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]] = [];
	    for (var j = 1; j <= PK_S3.komplekty.max; ++j){
		var kompl = PK_S3.komplekty[PK_S3.nabory[i]][j];
		var tok = PK_S3.summa_to (kompl.bonus, crabota.navyki)
		if (kompl.raboty[irabota])
		    tok += kompl.raboty[irabota];
		PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]][j] = tok;
	    }
	}
	if (PK_S3.setting.is_luck){
	    for (var l = 0; l < PK_S3.types.length; ++l){
		//PK_S3.vyborka[PK_S3.types[i]][PK_S3.nabory[j]] = null
		if (PK_S3.vyborka[PK_S3.types[l]]['season_set']){
		    for (var j = 0; j < PK_S3.nabory.length; ++j){
			if (PK_S3.nabory[j] != 'season_set'){
			    PK_S3.vyborka[PK_S3.types[l]][PK_S3.nabory[j]] = null;
			}
			PK_S3.vyborka[PK_S3.types[l]]['simple'] = [];
			PK_S3.vyborka[PK_S3.types[l]].simple[0] = {bonus: 0, price: 0, id: 0}
		    }
		}
	    }
	}
	setTimeout(PK_S3.otsev_nenuzhnykh, PK_S3.rekurs.delay);
	return;
    }
    PK_S3.vyvod_prostyh_rabot();
};

PK_S3.otbor_nuzhnykh_fort = function (frab){
    PK_S3.tekushaya_rabota = frab;
    var frabota = PK_S3.raboty[frab];
    if (PK_S3.forty.is_zero){ // первая итерация для этого фортового обсчёта
	PK_S3.forty.max_value = 0;
	PK_S3.forty.old_value = 0;
	PK_S3.resultaty[frab] = {};
	var aim = Character.skills.aim;
	var leadership = Character.skills.leadership;
	var dodge = Character.skills.dodge;
	var skill = frabota.navyki.endurance ? Character.skills.endurance : Character.skills.hide;
	var sum =  aim + leadership + skill + dodge + 1;
	PK_S3.forty.ves.aim = (sum - aim)/sum;
	PK_S3.forty.ves.leadership = (sum - leadership)/sum;
	PK_S3.forty.ves.skill = (sum - skill)/sum;
	PK_S3.forty.ves.dodge = (sum - dodge)/sum;
	if (frabota.navyki.aim < 0.1){
	    PK_S3.forty.ves.aim = 0.001;
	}
	else if (frabota.navyki.dodge < 0.1){
	    PK_S3.forty.ves.dodge = 0.001;
	}
	PK_S3.forty.is_zero = false;
    }
    var zz = {aim:PK_S3.forty.ves.aim, dodge:PK_S3.forty.ves.dodge, leadership:PK_S3.forty.ves.leadership};
    if (frabota.navyki.endurance){
	zz.endurance = PK_S3.forty.ves.skill;
    }
    else{
	zz.hide = PK_S3.forty.ves.skill;
    };
    
    PK_S3.vyborka = null;
    PK_S3.vyborka = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	PK_S3.vyborka[PK_S3.types[i]] = [];
	for (var j = 0; j < PK_S3.nabory.length; ++j){
	    PK_S3.vyborka[PK_S3.types[i]][PK_S3.nabory[j]] = null;
	}
	PK_S3.vyborka[PK_S3.types[i]]['simple'] = [];
	PK_S3.vyborka[PK_S3.types[i]].simple[0] = {bonus:0, health:0, price:0, id:0}
    }
    for (var f in PK_S3.vozmozhnye_veschi){
	if (isNaN(f)) continue;
	var fID = f;
	var bronya = PK_S3.items[fID];
	var bonus = PK_S3.summa_to(bronya.bonus, zz)
	var health = PK_S3.summa_to (bronya.bonus, {health:1});
	if (bronya.type == 'left_arm'){
	    bonus += (bronya.damage.damage_min + bronya.damage.damage_max) / 2;
	}
	
	var cena = PK_S3.cena_pods4eta(bronya);

	if (bronya.set.key){
	    if (!PK_S3.vyborka[bronya.type][bronya.set.key] || (PK_S3.vyborka[bronya.type][bronya.set.key].bonus <= bonus)){
		PK_S3.vyborka[bronya.type][bronya.set.key] = {bonus:bonus, health:health, price:cena, id:fID};
	    }
	}
	if (bonus+health > 0){
	    var add = true;
	    for (var ff = PK_S3.vyborka[bronya.type].simple.length - 1; ff >= 0 ; --ff){
		var tmp = PK_S3.vyborka[bronya.type].simple[ff];
		if ((tmp.bonus >= bonus) && (tmp.health >= health) && (tmp.price <= cena)){
		    add = false; break;
		}
		if ((tmp.bonus <= bonus) && (tmp.health <= health) && (tmp.price >= cena)){
		    PK_S3.vyborka[bronya.type].simple.splice(ff,1);
		    continue;
		}
	    }
	    if (add) PK_S3.vyborka[bronya.type].simple.push( {bonus:bonus, health:health, price:cena, id:fID});
	}
	else if ((bonus < 0)||(health < 0)){
	    alert ('error fort sum, health');
	}
    }
    PK_S3.nabory_dlya_raboty = {};
    for (var i = 0; i < PK_S3.nabory.length; ++i){
	PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]] = [];
	for (var j = 1; j <= PK_S3.komplekty.max; ++j){
	    var kompl = PK_S3.komplekty[PK_S3.nabory[i]][j];
	    var bonus = PK_S3.summa_to (kompl.bonus, zz);
	    var health = PK_S3.summa_to (kompl.bonus, {health:1});
	    PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]][j] = {bonus:bonus, health:health};
	}
    }
    setTimeout(PK_S3.otsev_nenuzhnykh_fort, PK_S3.rekurs.delay);
    return;
}

PK_S3.otbor_nuzhnykh_moving = function (){
    var Imove = PK_S3.raboty.moving;
    PK_S3.tekushaya_rabota = Imove;
    var mrabota = PK_S3.raboty[Imove];
    if (PK_S3.vyborka) PK_S3.vyborka = null;
    PK_S3.vyborka = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	PK_S3.vyborka[PK_S3.types[i]] = [];
	for (var j = 0; j < PK_S3.nabory.length; ++j){
	    PK_S3.vyborka[PK_S3.types[i]][PK_S3.nabory[j]] = null;
	}
	PK_S3.vyborka[PK_S3.types[i]]['simple'] = [];
	PK_S3.vyborka[PK_S3.types[i]].simple[0] = {ride: 0, speed: 1.0, price: 0, id: 0}
    }

    for (var r in PK_S3.vozmozhnye_veschi){
	if (isNaN(r)) continue;
	var mID = r;
	var popona = PK_S3.items[mID];
	var ride = PK_S3.summa_to(popona.bonus, mrabota.navyki);
	var speed = popona.speed ? popona.speed : 1.0;
	var cena = PK_S3.cena_pods4eta(popona);

	if (popona.set.key){
	    if (!PK_S3.vyborka[popona.type][popona.set.key] || (PK_S3.vyborka[popona.type][popona.set.key].ride <= ride)){
		PK_S3.vyborka[popona.type][popona.set.key] = {ride: ride, speed: speed, price: cena, id: mID};
	    }
	}
	if ((ride > 0)||(speed < 1.0)){
	    var add = true;
	    for (var ir = PK_S3.vyborka[popona.type].simple.length - 1; ir >= 0 ; --ir){
		if ((PK_S3.vyborka[popona.type].simple[ir].ride >= ride) && (PK_S3.vyborka[popona.type].simple[ir].price <= cena) && (PK_S3.vyborka[popona.type].simple[ir].speed <= speed)){
		    add = false; break;
		}
		if ((PK_S3.vyborka[popona.type].simple[ir].ride <= ride) && (PK_S3.vyborka[popona.type].simple[ir].price >= cena) && (PK_S3.vyborka[popona.type].simple[ir].speed >= speed)){
		    PK_S3.vyborka[popona.type].simple.splice(ir,1);
		    continue;
		}
	    }
	    if (add) PK_S3.vyborka[popona.type].simple.push( {ride: ride, speed: speed, price: cena, id: mID});
	}
    }
    PK_S3.nabory_dlya_raboty = {};
    for (var i = 0; i < PK_S3.nabory.length; ++i){
	PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]] = [];
	for (var j = 1; j <= PK_S3.komplekty.max; ++j){
	    var kompl = PK_S3.komplekty[PK_S3.nabory[i]][j];
	    var rik = PK_S3.summa_to (kompl.bonus, mrabota.navyki)
	    var spk = kompl.speed ? (1 / kompl.speed) - 1 : 0.0;
	    PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]][j] = {ride: rik, speed: spk};
	}
    }
    setTimeout(PK_S3.otsev_nenuzhnykh_moving, PK_S3.rekurs.delay);
}

PK_S3.otbor_nuzhnykh_sleep = function(){
    PK_S3.tekushaya_rabota = PK_S3.raboty.energy;
    var srabota = PK_S3.raboty[PK_S3.raboty.energy];
    if (PK_S3.vyborka) PK_S3.vyborka = null;
    PK_S3.vyborka = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	PK_S3.vyborka[PK_S3.types[i]] = [];
	for (var j = 0; j < PK_S3.nabory.length; ++j){
	    PK_S3.vyborka[PK_S3.types[i]][PK_S3.nabory[j]] = null;
	}
	PK_S3.vyborka[PK_S3.types[i]].simple = [];
	PK_S3.vyborka[PK_S3.types[i]].simple[0] = {heal: 0, regen: 1.0, price: 0, id: 0};
    }

    for (var s in PK_S3.vozmozhnye_veschi){
	if (isNaN(s)) continue;
	var sID = s;
	var krovatka = PK_S3.items[sID];
	var heal = PK_S3.summa_to(krovatka.bonus, srabota.navyki);
	var regen = krovatka.regeneration ? krovatka.regeneration : 1.0;
	var cena = PK_S3.cena_pods4eta(krovatka);
	if (krovatka.set.key){
	    if (!PK_S3.vyborka[krovatka.type][krovatka.set.key] || (PK_S3.vyborka[krovatka.type][krovatka.set.key].heal <= heal)){
		PK_S3.vyborka[krovatka.type][krovatka.set.key] = {heal: heal, regen: regen, price: cena, id: sID};
	    }
	}
	if ((heal > 0)||(regen > 1.0)){
	    var add = true;
	    for (var is = PK_S3.vyborka[krovatka.type].simple.length - 1; is >= 0 ; --is){
		if ((PK_S3.vyborka[krovatka.type].simple[is].heal >= heal) && (PK_S3.vyborka[krovatka.type].simple[is].price <= cena) && (PK_S3.vyborka[krovatka.type].simple[is].regen >= regen)){
		    add = false; break;
		}
		if ((PK_S3.vyborka[krovatka.type].simple[is].heal <= heal) && (PK_S3.vyborka[krovatka.type].simple[is].price >= cena) && (PK_S3.vyborka[krovatka.type].simple[is].regen <= regen)){
		    PK_S3.vyborka[krovatka.type].simple.splice(is,1);
		    continue;
		}
	    }
	    if (add) PK_S3.vyborka[krovatka.type].simple.push( {heal: heal, regen: regen, price: cena, id: sID});
	}
    }
    PK_S3.nabory_dlya_raboty = {};
    for (var i = 0; i < PK_S3.nabory.length; ++i){
	PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]] = [];
	for (var j = 1; j <= PK_S3.komplekty.max; ++j){
	    var kompl = PK_S3.komplekty[PK_S3.nabory[i]][j];
	    var hek = PK_S3.summa_to (kompl.bonus, srabota.navyki)
	    var rek = kompl.regeneration ? kompl.regeneration : 1.0;
	    PK_S3.nabory_dlya_raboty[PK_S3.nabory[i]][j] = {heal: hek, regen: rek};
	}
    }
    setTimeout(PK_S3.otsev_nenuzhnykh_sleep, PK_S3.rekurs.delay);
};

PK_S3.otsev_nenuzhnykh = function(){
    PK_S3.so4etaniya = [];
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;;
    for (var i = 0; i <= max_mask; ++i)
	PK_S3.so4etaniya[i] = [];
    var mask = 0;
    var ivyb = [];
    var t0 = 0;
    for (var t = 0; t < PK_S3.types.length; ++t)
	ivyb[t] = 0;
    var itype = 0;
    var potra4eno = 0;
    while (itype >= 0){
	if (itype == PK_S3.types.length){
	    --itype;
	    ivyb[itype]++;
	    continue;
	}
	if (ivyb[itype] == PK_S3.vyborka[PK_S3.types[itype]].simple.length){
	    ivyb[itype] = 0;
	    --itype;
	    if (itype >= 0) ++ivyb[itype];
	    continue;
	}
	var vesch = PK_S3.vyborka[PK_S3.types[itype]].simple[ivyb[itype]];
	potra4eno = vesch.price;
	t0 = vesch.bonus;
	mask = Math.pow(2, itype);
	    var add = true;
	    for (var ii = PK_S3.so4etaniya[mask].length - 1; ii >= 0; --ii){
		if ((PK_S3.so4etaniya[mask][ii].bonus >= t0) && (PK_S3.so4etaniya[mask][ii].price <= potra4eno)){
		    add = false; break;
		}
		if ((PK_S3.so4etaniya[mask][ii].bonus <= t0) && (PK_S3.so4etaniya[mask][ii].price >= potra4eno)){
		    PK_S3.so4etaniya[mask].splice(ii,1);
		    continue;
		}
	    }
	    if (add){
		PK_S3.so4etaniya[mask].push( {bonus:t0, price:potra4eno});
		var l = PK_S3.so4etaniya[mask].length - 1;
		PK_S3.so4etaniya[mask][l].ids = [];
		PK_S3.so4etaniya[mask][l].ids[0] = vesch.id;
		PK_S3.so4etaniya[mask][l].sets = 0;
	    }
	++itype;
    }

    var qkompl = 0;
    for (var k = 0; k < PK_S3.nabory.length; ++k){
	var nabor_name = PK_S3.nabory[k];
	var mask = 0;
	var ivyb = [];
	var t0 = 0;
	var IDs = [];
	for (var t = 0; t < PK_S3.types.length; ++t)
	    ivyb[t] = 0;
	var itype = 0;
	var potra4eno = 0;
	while (itype >= 0){
	    if (itype == PK_S3.types.length){
		--itype;
		ivyb[itype]++;
		continue;
	    }
	    if (ivyb[itype] > 1){
		ivyb[itype] = 0;
		--itype;
		if (itype >= 0) ++ivyb[itype]; // нет уверенности в javascript'ном if(--itype>=0) :)
		continue;
	    }
	    if (ivyb[itype]==0){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var vesch = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno += vesch.price;
		    if (qkompl > 0) t0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl];
		    ++qkompl;
		    t0 += vesch.bonus;
		    t0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl];
		    mask += Math.pow(2, itype);
		    IDs.push(vesch.id);
		    if ((potra4eno <= PK_S3.setting.bablo) && ((t0 > 0) || (nabor_name == 'season_set'))){
			var add = true;
			for (var iii = PK_S3.so4etaniya[mask].length - 1; iii >= 0 ; --iii){
			    if ((PK_S3.so4etaniya[mask][iii].bonus >= t0) && (PK_S3.so4etaniya[mask][iii].price <= potra4eno)){
				add = false; break;
			    }
			    if ((PK_S3.so4etaniya[mask][iii].bonus <= t0) && (PK_S3.so4etaniya[mask][iii].price >= potra4eno)){
				PK_S3.so4etaniya[mask].splice(iii,1);
				continue;
			    }
			}
			if (add){
			    PK_S3.so4etaniya[mask].push( {bonus:t0, price:potra4eno});
			    var l = PK_S3.so4etaniya[mask].length - 1;
			    PK_S3.so4etaniya[mask][l].ids = [];
			    for (var j = 0; j < IDs.length; ++j)
				PK_S3.so4etaniya[mask][l].ids.push(IDs[j]);
			    PK_S3.so4etaniya[mask][l].sets = Math.pow(2, k);
			}
		    } // конец проверки на добавление
		} // вещь из набора в данный слот существовала
		++itype;
	    }
	    else if (ivyb[itype]==1){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var vesch = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno -= vesch.price;
		    t0 -= vesch.bonus;
		    t0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl];
		    --qkompl;
		    if (qkompl > 0) t0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl];
		    mask -= Math.pow(2, itype);
		    IDs.pop ();
		} // подчищаем ранее плюсанутые свойства.
		++itype;
	    }
	    else{
		alert ('error');
		break;
	    }
	}
    } // просмотрели все наборы.
    PK_S3.rekurs.mask = -1;
    PK_S3.rekurs.index_mask = -1;
    PK_S3.rekurs.count = PK_S3.rekurs.max_count;
    var date = new Date();
    PK_S3.rekurs.time = date.getTime();
    setTimeout (PK_S3.polnyj_perebor, PK_S3.rekurs.delay);
}

PK_S3.otsev_nenuzhnykh_fort = function(){
    PK_S3.so4etaniya = [];
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;;
    for (var i = 0; i <= max_mask; ++i)
	PK_S3.so4etaniya[i] = [];
    var mask = 0;
    var ivyb = [];
    var t0 = 0;
    for (var t = 0; t < PK_S3.types.length; ++t)
	ivyb[t] = 0;
    var itype = 0;
    var potra4eno = 0;
    while (itype >= 0){
	if (itype == PK_S3.types.length){
	    --itype;
	    ivyb[itype]++;
	    continue;
	}
	if (ivyb[itype] == PK_S3.vyborka[PK_S3.types[itype]].simple.length){
	    ivyb[itype] = 0;
	    --itype;
	    if (itype >= 0) ++ivyb[itype];
	    continue;
	}
	var bronya = PK_S3.vyborka[PK_S3.types[itype]].simple[ivyb[itype]];
	var potra4eno = bronya.price;
	var b0 = bronya.bonus;
	var h0 = bronya.health;
	
	mask = Math.pow(2, itype);
	    var add = true;
	    for (var ii = PK_S3.so4etaniya[mask].length - 1; ii >= 0; --ii){
		var tmp = PK_S3.so4etaniya[mask][ii];
		if ((tmp.bonus >= b0) && (tmp.health >= h0) && (tmp.price <= potra4eno)){
		    add = false; break;
		}
		if ((tmp.bonus <= b0) && (tmp.health <= h0) && (tmp.price >= potra4eno)){
		    PK_S3.so4etaniya[mask].splice(ii,1);
		    continue;
		}
	    }
	    if (add){
		PK_S3.so4etaniya[mask].push( {bonus:b0, health:h0, price:potra4eno});
		var l = PK_S3.so4etaniya[mask].length - 1;
		PK_S3.so4etaniya[mask][l].ids = [];
		PK_S3.so4etaniya[mask][l].ids[0] = bronya.id;
		PK_S3.so4etaniya[mask][l].sets = 0;
	    }
	++itype;
    }
    var qkompl = 0;
    for (var k = 0; k < PK_S3.nabory.length; ++k){
	var mask = 0;
	var ivyb = [];
	var potra4eno = 0;
	var b0 = 0;
	var IDs = [];
	for (var t = 0; t < PK_S3.types.length; ++t)
	    ivyb[t] = 0;
	var itype = 0;
	var potra4eno = 0;
	while (itype >= 0){
	    if (itype == PK_S3.types.length){
		--itype;
		ivyb[itype]++;
		continue;
	    }
	    if (ivyb[itype] > 1){
		ivyb[itype] = 0;
		--itype;
		if (itype >= 0) ++ivyb[itype]; // нет уверенности в javascript'ном if(--itype>=0) :)
		continue;
	    }
	    if (ivyb[itype]==0){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var bronya = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno += bronya.price;
		    if (qkompl > 0){
			b0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].bonus;
			h0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].health;
		    }
		    b0 += bronya.bonus;
		    h0 += bronya.health;
		    
		    ++qkompl;
		    b0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].bonus;
		    h0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].health;
		    mask += Math.pow(2, itype);
		    IDs.push(bronya.id);
		    if ((potra4eno <= PK_S3.setting.bablo) && ((b0 > 0)||(h0 > 0))){
			var add = true;
			for (var iii = PK_S3.so4etaniya[mask].length - 1; iii >= 0 ; --iii){
			    var tmp = PK_S3.so4etaniya[mask][iii];
			    if ((tmp.bonus >= b0) && (tmp.health >= h0) && (tmp.price <= potra4eno)){
				add = false; break;
			    }
			    if ((tmp.bonus <= b0) && (tmp.health <= h0) && (tmp.price >= potra4eno)){
				PK_S3.so4etaniya[mask].splice(iii,1);
				continue;
			    }
			}
			if (add){
			    PK_S3.so4etaniya[mask].push( {bonus:b0, health:h0, price:potra4eno});
			    var l = PK_S3.so4etaniya[mask].length - 1;
			    PK_S3.so4etaniya[mask][l].ids = [];
			    for (var j = 0; j < IDs.length; ++j)
				PK_S3.so4etaniya[mask][l].ids.push(IDs[j]);
			    PK_S3.so4etaniya[mask][l].sets = Math.pow(2, k);
			}
		    } // конец проверки на добавление
		} // вещь из набора в данный слот существовала
		++itype;
	    }
	    else if (ivyb[itype]==1){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var bronya = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno -= bronya.price;
		    b0 -= bronya.bonus;
		    h0 -= bronya.health;
		    
		    b0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].bonus;
		    h0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].health;
		    --qkompl;
		    if (qkompl > 0) {
			b0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].bonus;
			h0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].health;
		    }
		    mask -= Math.pow(2, itype);
		    IDs.pop ();
		} // подчищаем ранее плюсанутые свойства.
		++itype;
	    }
	    else{
		alert ('error');
		break;
	    }
	}
    } // просмотрели все наборы.
    PK_S3.rekurs.mask = -1;
    PK_S3.rekurs.index_mask = -1;
    PK_S3.rekurs.count = PK_S3.rekurs.max_count;
    var date = new Date();
    PK_S3.rekurs.time = date.getTime();
    setTimeout (PK_S3.polnyj_perebor_fort, PK_S3.rekurs.delay);
}


PK_S3.otsev_nenuzhnykh_moving = function() {
    PK_S3.so4etaniya = [];
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;;
    for (var im = 0; im <= max_mask; ++im)
	PK_S3.so4etaniya[im] = [];
    var mask = 0;
    var ivyb = [];
    var r0 = 0;
    var s0 = 1.0;
    for (var t = 0; t < PK_S3.types.length; ++t)
	ivyb[t] = 0;
    var itype = 0;
    var potra4eno = 0;
    while (itype >= 0){
	if (itype == PK_S3.types.length){
	    --itype;
	    ivyb[itype]++;
	    continue;
	}
	if (ivyb[itype] == PK_S3.vyborka[PK_S3.types[itype]].simple.length){
	    ivyb[itype] = 0;
	    --itype;
	    if (itype >= 0) ++ivyb[itype];
	    continue;
	}
	var popona = PK_S3.vyborka[PK_S3.types[itype]].simple[ivyb[itype]];
	potra4eno = popona.price;
	r0 = popona.ride;
	s0 = popona.speed;
	mask = Math.pow(2, itype);
	var add = true;
	for (var ir = PK_S3.so4etaniya[mask].length - 1; ir >= 0; --ir){
	    if ((PK_S3.so4etaniya[mask][ir].ride >= r0) && (PK_S3.so4etaniya[mask][ir].price <= potra4eno) && (PK_S3.so4etaniya[mask][ir].speed <= s0)){
		add = false; break;
	    }
	    if ((PK_S3.so4etaniya[mask][ir].ride <= r0) && (PK_S3.so4etaniya[mask][ir].price >= potra4eno) && (PK_S3.so4etaniya[mask][ir].speed >= s0)){
		PK_S3.so4etaniya[mask].splice(ir,1);
		continue;
	    }
	}
	if (add){
	    PK_S3.so4etaniya[mask].push( {ride: r0, speed: s0, kompl: 0, price:potra4eno});
	    var l = PK_S3.so4etaniya[mask].length - 1;
	    PK_S3.so4etaniya[mask][l].ids = [];
	    PK_S3.so4etaniya[mask][l].ids[0] = popona.id;
	    PK_S3.so4etaniya[mask][l].sets = 0;
	}
	++itype;
    }

    var qkompl = 0;
    for (var k = 0; k < PK_S3.nabory.length; ++k){
	var mask = 0;
	var ivyb = [];
	var r0 = 0;
	var s0 = 1.0;
	var k0 = 0;
	var IDs = [];
	for (var t = 0; t < PK_S3.types.length; ++t)
	    ivyb[t] = 0;
	var itype = 0;
	var potra4eno = 0;
	while (itype >= 0){
	    if (itype == PK_S3.types.length){
		--itype;
		ivyb[itype]++;
		continue;
	    }
	    if (ivyb[itype] > 1){
		ivyb[itype] = 0;
		--itype;
		if (itype >= 0) ++ivyb[itype]; // нет уверенности в javascript'ном if(--itype>=0) :)
		continue;
	    }
	    if (ivyb[itype]==0){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var popona = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno += popona.price;
		    if (qkompl > 0) r0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].ride;
		    if (qkompl > 0) k0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].speed;
		    ++qkompl;
		    r0 += popona.ride;
		    s0 *= popona.speed;
		    r0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].ride;
		    k0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].speed;
		    mask += Math.pow(2, itype);
		    IDs.push(popona.id);
		    if ((potra4eno <= PK_S3.setting.bablo) && ((r0 > 0)||(k0 > 0)||(s0 < 1.0))){
			    var add = true;
			    for (var iir = PK_S3.so4etaniya[mask].length - 1; iir >= 0 ; --iir){
				var rtmp = PK_S3.so4etaniya[mask][iir];
				if ((rtmp.ride >= r0) && (rtmp.kompl >= k0) && (rtmp.price <= potra4eno) && (rtmp.speed <= s0)){
				    add = false; break;
				}
				if ((rtmp.ride <= r0) && (rtmp.kompl <= k0) && (rtmp.price >= potra4eno) && (rtmp.speed >= s0)){
				    PK_S3.so4etaniya[mask].splice(iir,1);
				    continue;
				}
			    }
			    if (add){
				PK_S3.so4etaniya[mask].push( {ride: r0, speed: s0, kompl: k0, price:potra4eno});
				var l = PK_S3.so4etaniya[mask].length - 1;
				PK_S3.so4etaniya[mask][l].ids = [];
				for (var j = 0; j < IDs.length; ++j)
				    PK_S3.so4etaniya[mask][l].ids.push(IDs[j]);
				PK_S3.so4etaniya[mask][l].sets = Math.pow(2, k);
			    }
		    } // конец проверки на добавление
		} // вещь из набора в данный слот существовала
		++itype;
	    }
	    else if (ivyb[itype]==1){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var popona = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno -= popona.price;
		    r0 -= popona.ride;
		    s0 /= popona.speed;
		    r0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].ride;
		    k0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].speed;
		    --qkompl;
		    if (qkompl > 0) r0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].ride;
		    if (qkompl > 0) k0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].speed;
		    mask -= Math.pow(2, itype);
		    IDs.pop ();
		} // подчищаем ранее плюсанутые свойства.
		++itype;
	    }
	    else{
		alert ('error');
		break;
	    }
	}
    } // просмотрели все наборы.
    PK_S3.rekurs.mask = -1;
    PK_S3.rekurs.index_mask = -1;
    PK_S3.rekurs.count = PK_S3.rekurs.max_count;
    var date = new Date();
    PK_S3.rekurs.time = date.getTime();
    setTimeout (PK_S3.polnyj_perebor_moving, PK_S3.rekurs.delay);
}

PK_S3.otsev_nenuzhnykh_sleep = function() {
    PK_S3.so4etaniya = [];
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;;
    for (var is = 0; is <= max_mask; ++is)
	PK_S3.so4etaniya[is] = [];
    var mask = 0;
    var ivyb = [];
    var h0 = 0;
    var r0 = 1.0;
    for (var t = 0; t < PK_S3.types.length; ++t)
	ivyb[t] = 0;
    var itype = 0;
    var potra4eno = 0;
    while (itype >= 0){
	if (itype == PK_S3.types.length){
	    --itype;
	    ivyb[itype]++;
	    continue;
	}
	if (ivyb[itype] == PK_S3.vyborka[PK_S3.types[itype]].simple.length){
	    ivyb[itype] = 0;
	    --itype;
	    if (itype >= 0) ++ivyb[itype];
	    continue;
	}
	var krovatka = PK_S3.vyborka[PK_S3.types[itype]].simple[ivyb[itype]];
	potra4eno = krovatka.price;
	h0 = krovatka.heal;
	r0 = krovatka.regen;
	mask = Math.pow(2, itype);
	var add = true;
	for (var is = PK_S3.so4etaniya[mask].length - 1; is >= 0; --is){
	    if (PK_S3.so4etaniya[mask][is].regen > r0){
		add = false; break;
	    }
	    if (PK_S3.so4etaniya[mask][is].regen < r0){
		PK_S3.so4etaniya[mask].splice(is,1);
		continue;
	    }
	    if ((PK_S3.so4etaniya[mask][is].heal >= h0) && (PK_S3.so4etaniya[mask][is].price <= potra4eno)){
		add = false; break;
	    }
	    if ((PK_S3.so4etaniya[mask][is].heal <= h0) && (PK_S3.so4etaniya[mask][is].price >= potra4eno)){
		PK_S3.so4etaniya[mask].splice(is,1);
		continue;
	    }
	}
	if (add){
	    PK_S3.so4etaniya[mask].push( {heal: h0, regen: r0, price:potra4eno});
	    var l = PK_S3.so4etaniya[mask].length - 1;
	    PK_S3.so4etaniya[mask][l].ids = [];
	    PK_S3.so4etaniya[mask][l].ids[0] = krovatka.id;
	    PK_S3.so4etaniya[mask][l].sets = 0;
	}
	++itype;
    }

    var qkompl = 0;
    for (var k = 0; k < PK_S3.nabory.length; ++k){
	var mask = 0;
	var ivyb = [];
	var h0 = 0;
	var r0 = 1.0;
	var IDs = [];
	for (var t = 0; t < PK_S3.types.length; ++t)
	    ivyb[t] = 0;
	var itype = 0;
	var potra4eno = 0;
	while (itype >= 0){
	    if (itype == PK_S3.types.length){
		--itype;
		ivyb[itype]++;
		continue;
	    }
	    if (ivyb[itype] > 1){
		ivyb[itype] = 0;
		--itype;
		if (itype >= 0) ++ivyb[itype]; // нет уверенности в javascript'ном if(--itype>=0) :)
		continue;
	    }
	    if (ivyb[itype]==0){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var krovatka = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno += krovatka.price;
		    if (qkompl > 0) h0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].heal;
		    if (qkompl > 0) r0 /= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].regen;
		    ++qkompl;
		    h0 += krovatka.heal;
		    r0 *= krovatka.regen;
		    h0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].heal;
		    r0 *= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].regen;
		    mask += Math.pow(2, itype);
		    IDs.push(krovatka.id);
		    if ((qkompl > 1) && (potra4eno <= PK_S3.setting.bablo)){
			var add = true;
			for (var iis = PK_S3.so4etaniya[mask].length - 1; iis >= 0 ; --iis){
			    if (PK_S3.so4etaniya[mask][iis].regen > r0){
				add = false; break;
			    }
			    if (PK_S3.so4etaniya[mask][iis].regen < r0){
				PK_S3.so4etaniya[mask].splice(iis,1);
				continue;
			    }
			    if ((PK_S3.so4etaniya[mask][iis].heal >= h0) && (PK_S3.so4etaniya[mask][iis].price <= potra4eno)){
				add = false; break;
			    }
			    if ((PK_S3.so4etaniya[mask][iis].heal <= h0) && (PK_S3.so4etaniya[mask][iis].price >= potra4eno)){
				PK_S3.so4etaniya[mask].splice(iis,1);
				continue;
			    }
			}
			if (add){
			    PK_S3.so4etaniya[mask].push( {heal: h0, regen: r0, price:potra4eno});
			    var l = PK_S3.so4etaniya[mask].length - 1;
			    PK_S3.so4etaniya[mask][l].ids = [];
			    for (var j = 0; j < IDs.length; ++j)
				PK_S3.so4etaniya[mask][l].ids.push(IDs[j]);
			    PK_S3.so4etaniya[mask][l].sets = Math.pow(2, k);
		        }
		    } // конец проверки на добавление
		} // вещь из набора в данный слот существовала
		++itype;
	    }
	    else if (ivyb[itype]==1){
		if (PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]]){
		    var krovatka = PK_S3.vyborka[PK_S3.types[itype]][PK_S3.nabory[k]];
		    potra4eno -= krovatka.price;
		    h0 -= krovatka.heal;
		    r0 /= krovatka.regen;
		    h0 -= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].heal;
		    r0 /= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].regen;
		    --qkompl;
		    if (qkompl > 0) h0 += PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].heal;
		    if (qkompl > 0) r0 *= PK_S3.nabory_dlya_raboty[PK_S3.nabory[k]][qkompl].regen;
		    mask -= Math.pow(2, itype);
		    IDs.pop ();
		} // подчищаем ранее плюсанутые свойства.
		++itype;
	    }
	    else{
		alert ('error');
		break;
	    }
	}
    } // просмотрели все наборы.
    PK_S3.rekurs.mask = -1;
    PK_S3.rekurs.index_mask = -1;
    PK_S3.rekurs.count = PK_S3.rekurs.max_count;
    var date = new Date();
    PK_S3.rekurs.time = date.getTime();
    setTimeout (PK_S3.polnyj_perebor_sleep, PK_S3.rekurs.delay);
}


PK_S3.polnyj_perebor = function(){
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = (PK_S3.rekurs.mask>0)?PK_S3.progress.array_mask[PK_S3.rekurs.mask]:0;
    fval = 100 * (fval + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }

    var infinity = true;
    while (infinity){
	var date = new Date();
	if (PK_S3.rekurs.time + PK_S3.rekurs.working < date.getTime()){
	    PK_S3.rekurs.time = date.getTime() + PK_S3.rekurs.delay;
	    setTimeout (PK_S3.polnyj_perebor, PK_S3.rekurs.delay);
	    return;
	}
	if (PK_S3.rekurs.mask > max_mask / 2){
	    var izmeneniya = false;
	    for (var m7 = 0; m7 < max_mask; ++m7){
	        for (var i7 = PK_S3.so4etaniya[m7].length - 1; i7>= 0; --i7){
		    if (!PK_S3.so4etaniya[m7][i7].ispolz){
			PK_S3.so4etaniya[m7][i7].old = true;
		    }
		    else{
		        PK_S3.so4etaniya[m7][i7].ispolz = false;
		        izmeneniya = true;
		    }
		}
	    }
	    if (!izmeneniya) infinity = false;
//	    PK_S3.rekurs.count -= 50;
	    PK_S3.rekurs.mask = -1;
	    PK_S3.rekurs.index_mask = -1;
	    continue;
	}
	if (PK_S3.rekurs.index_mask < 0){
	    // пора переходить на следущую маску;
	    ++PK_S3.rekurs.mask;
	    PK_S3.rekurs.index_mask = PK_S3.so4etaniya[PK_S3.rekurs.mask].length - 1;
	    continue;
	}
	var m1 = PK_S3.rekurs.mask;
	var i1 = PK_S3.rekurs.index_mask;
	var old1 = PK_S3.so4etaniya[m1][i1].old;
        var bon1 = PK_S3.so4etaniya[m1][i1].bonus;
	var cen1 = PK_S3.so4etaniya[m1][i1].price;
	var sets1 = PK_S3.so4etaniya[m1][i1].sets;
        for (var m2 = m1 + 1; m2 < max_mask; ++m2){
	    if (m1&m2) continue;
	    var m3 = m1 + m2;
	    for (var i2 = PK_S3.so4etaniya[m2].length - 1; i2 >= 0; --i2){
		if (old1&&PK_S3.so4etaniya[m2][i2].old) continue;
		sets2 = PK_S3.so4etaniya[m2][i2].sets;
		if (sets1&sets2) continue;
		var bonus = bon1 + PK_S3.so4etaniya[m2][i2].bonus;
		var cena = cen1 + PK_S3.so4etaniya[m2][i2].price;
		if (cena <= PK_S3.setting.bablo){
		    var add = true;
		    for (var ii = PK_S3.so4etaniya[m3].length - 1; ii >= 0; --ii){
		        if ((PK_S3.so4etaniya[m3][ii].bonus >= bonus) && (PK_S3.so4etaniya[m3][ii].price <= cena)){
			    add = false; break;
		        }
			if ((PK_S3.so4etaniya[m3][ii].bonus <= bonus) && (PK_S3.so4etaniya[m3][ii].price >= cena)){
			    PK_S3.so4etaniya[m3].splice(ii,1);
			    continue;
			}
		    }
		    if (add){
			PK_S3.so4etaniya[m3].push( {bonus:bonus, price:cena});
			var l = PK_S3.so4etaniya[m3].length - 1;
			PK_S3.so4etaniya[m3][l].ids = [];
			for (var j1 = 0; j1 < PK_S3.so4etaniya[m1][i1].ids.length; ++j1){
			    PK_S3.so4etaniya[m3][l].ids.push(PK_S3.so4etaniya[m1][i1].ids[j1]);
			}
			for (var j2 = 0; j2 < PK_S3.so4etaniya[m2][i2].ids.length; ++j2){
			    PK_S3.so4etaniya[m3][l].ids.push(PK_S3.so4etaniya[m2][i2].ids[j2]);
			}
			PK_S3.so4etaniya[m3][l].sets = sets1 + sets2;
			PK_S3.so4etaniya[m3][l].ispolz = true;
			PK_S3.so4etaniya[m1][i1].ispolz = true;
			PK_S3.so4etaniya[m2][i2].ispolz = true;
			PK_S3.so4etaniya[m3][l].old = false;
			PK_S3.so4etaniya[m1][i1].old = false;
			PK_S3.so4etaniya[m2][i2].old = false;
		    }
		}
	    }
	}
	--PK_S3.rekurs.index_mask;
    }
    PK_S3.podgotavlivaem_rezultat();
}

PK_S3.polnyj_perebor_fort = function(){
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = (PK_S3.rekurs.mask>0)?PK_S3.progress.array_mask[PK_S3.rekurs.mask]:0;
    fval = 100 * (fval + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }

    var infinity = true;
    while (infinity){
	var date = new Date();
	if (PK_S3.rekurs.time + PK_S3.rekurs.working < date.getTime()){
	    var date1 = new Date();
	    PK_S3.rekurs.time = date1.getTime() + PK_S3.rekurs.delay;
	    setTimeout (PK_S3.polnyj_perebor_fort, PK_S3.rekurs.delay);
	    return;
	}
	if (PK_S3.rekurs.mask > max_mask / 2){
	    var izmeneniya = false;
	    for (var mf = 0; mf < max_mask; ++mf){
	        for (var ix = PK_S3.so4etaniya[mf].length - 1; ix>= 0; --ix){
		    if (!PK_S3.so4etaniya[mf][ix].ispolz){
			PK_S3.so4etaniya[mf][ix].old = true;
		    }
		    else{
		        PK_S3.so4etaniya[mf][ix].ispolz = false;
		        izmeneniya = true;
		    }
		}
	    }
	    if (!izmeneniya) infinity = false;
//	    PK_S3.rekurs.count -= 50;
	    PK_S3.rekurs.mask = -1;
	    PK_S3.rekurs.index_mask = -1;
	    continue;
	}
	if (PK_S3.rekurs.index_mask < 0){
	    // пора переходить на следущую маску;
	    ++PK_S3.rekurs.mask;
	    PK_S3.rekurs.index_mask = PK_S3.so4etaniya[PK_S3.rekurs.mask].length - 1;
	    continue;
	}
	var m1 = PK_S3.rekurs.mask;
	var i1 = PK_S3.rekurs.index_mask;
	var old1 = PK_S3.so4etaniya[m1][i1].old
        var bonus1 = PK_S3.so4etaniya[m1][i1].bonus;
        var health1 = PK_S3.so4etaniya[m1][i1].health;
	var cen1 = PK_S3.so4etaniya[m1][i1].price;
	var sets1 = PK_S3.so4etaniya[m1][i1].sets;
        for (var m2 = m1 + 1; m2 < max_mask; ++m2){
	    if (m1&m2) continue;
	    var m3 = m1 + m2;
	    for (var i2 = PK_S3.so4etaniya[m2].length - 1; i2 >= 0; --i2){
		if (old1&&PK_S3.so4etaniya[m2][i2].old) continue;
		sets2 = PK_S3.so4etaniya[m2][i2].sets;
		if (sets1&sets2) continue;
		var bonus = bonus1 + PK_S3.so4etaniya[m2][i2].bonus;
		var health = health1 + PK_S3.so4etaniya[m2][i2].health;
		var cena = cen1 + PK_S3.so4etaniya[m2][i2].price;
		if (cena <= PK_S3.setting.bablo){
		    var add = true;
		    for (var ii = PK_S3.so4etaniya[m3].length - 1; ii >= 0; --ii){
			    var tmp = PK_S3.so4etaniya[m3][ii];
			    if ((tmp.bonus >= bonus) && (tmp.health >= health) && (tmp.price <= cena)){
				add = false; break;
			    }
			    if ((tmp.bonus <= bonus) && (tmp.health <= health) && (tmp.price >= cena)){
				PK_S3.so4etaniya[m3].splice(ii,1);
				continue;
			    }
		    }
		    if (add){
			PK_S3.so4etaniya[m3].push({bonus:bonus, health:health, price:cena});
			var l = PK_S3.so4etaniya[m3].length - 1;
			PK_S3.so4etaniya[m3][l].ids = [];
			for (var j1 = 0; j1 < PK_S3.so4etaniya[m1][i1].ids.length; ++j1){
			    PK_S3.so4etaniya[m3][l].ids.push(PK_S3.so4etaniya[m1][i1].ids[j1]);
			}
			for (var j2 = 0; j2 < PK_S3.so4etaniya[m2][i2].ids.length; ++j2){
			    PK_S3.so4etaniya[m3][l].ids.push(PK_S3.so4etaniya[m2][i2].ids[j2]);
			}
			PK_S3.so4etaniya[m3][l].sets = sets1 + sets2;
			PK_S3.so4etaniya[m3][l].ispolz = true;
			PK_S3.so4etaniya[m1][i1].ispolz = true;
			PK_S3.so4etaniya[m2][i2].ispolz = true;
			PK_S3.so4etaniya[m3][l].old = false;
			PK_S3.so4etaniya[m1][i1].old = false;
			PK_S3.so4etaniya[m2][i2].old = false;
		    }
		}
	    }
	}
	--PK_S3.rekurs.index_mask;
    }
    PK_S3.podgotavlivaem_rezultat_fort();
}

PK_S3.polnyj_perebor_moving = function(){
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = (PK_S3.rekurs.mask>0)?PK_S3.progress.array_mask[PK_S3.rekurs.mask]:0;
    fval = 100 * (fval + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }

    var infinity = true;
    while (infinity){
	var date = new Date();
	if (PK_S3.rekurs.time + PK_S3.rekurs.working < date.getTime()){
	    PK_S3.rekurs.time = date.getTime() + PK_S3.rekurs.delay;
	    setTimeout (PK_S3.polnyj_perebor_moving, PK_S3.rekurs.delay);
	    return;
	}

	if (PK_S3.rekurs.mask > max_mask / 2){
	    var izmeneniya = false;
	    for (var m6 = 0; m6 < max_mask; ++m6){
	        for (var i6 = PK_S3.so4etaniya[m6].length - 1; i6>= 0; --i6){
		    if (!PK_S3.so4etaniya[m6][i6].ispolz){
			PK_S3.so4etaniya[m6][i6].old = true;
		    }
		    else{
		        PK_S3.so4etaniya[m6][i6].ispolz = false;
		        izmeneniya = true;
		    }
		}
	    }
	    if (!izmeneniya) infinity = false;
//	    PK_S3.rekurs.count -= 50;
	    PK_S3.rekurs.mask = -1;
	    PK_S3.rekurs.index_mask = -1;
	    continue;
	}
	if (PK_S3.rekurs.index_mask < 0){
	    // пора переходить на следущую маску;
	    ++PK_S3.rekurs.mask;
	    PK_S3.rekurs.index_mask = PK_S3.so4etaniya[PK_S3.rekurs.mask].length - 1;
	    continue;
	}
	if (PK_S3.so4etaniya[PK_S3.rekurs.mask][PK_S3.rekurs.index_mask].old){
	    --PK_S3.rekurs.index_mask;
	    continue;
	}
	var mr1 = PK_S3.rekurs.mask;
	var ir1 = PK_S3.rekurs.index_mask;
	var old1 = PK_S3.so4etaniya[mr1][ir1].old
        var rid1 = PK_S3.so4etaniya[mr1][ir1].ride;
	var spe1 = PK_S3.so4etaniya[mr1][ir1].speed;
	var kom1 = PK_S3.so4etaniya[mr1][ir1].kompl;
	var cen1 = PK_S3.so4etaniya[mr1][ir1].price;
	var sets1 = PK_S3.so4etaniya[mr1][ir1].sets;
        for (var mr2 = mr1 + 1; mr2 < max_mask; ++mr2){
	    if (mr1&mr2) continue;
	    var mr3 = mr1 + mr2;
	    for (var ir2 = PK_S3.so4etaniya[mr2].length - 1; ir2 >= 0; --ir2){
		if (old1||PK_S3.so4etaniya[mr2][ir2].old) continue;
		sets2 = PK_S3.so4etaniya[mr2][ir2].sets;
		if (sets1&sets2) continue;
		var ride = rid1 + PK_S3.so4etaniya[mr2][ir2].ride;
		var speed = spe1 * PK_S3.so4etaniya[mr2][ir2].speed;
		var kompl = kom1 + PK_S3.so4etaniya[mr2][ir2].kompl;
		var cena = cen1 + PK_S3.so4etaniya[mr2][ir2].price;
		if (cena <= PK_S3.setting.bablo){
		    var add = true;
		    for (var ii = PK_S3.so4etaniya[mr3].length - 1; ii >= 0; --ii){
		        if ((PK_S3.so4etaniya[mr3][ii].ride >= ride) && (PK_S3.so4etaniya[mr3][ii].kompl >= kompl) && (PK_S3.so4etaniya[mr3][ii].price <= cena) && (PK_S3.so4etaniya[mr3][ii].speed <= speed)){
			    add = false; break;
		        }
			if ((PK_S3.so4etaniya[mr3][ii].ride <= ride) && (PK_S3.so4etaniya[mr3][ii].kompl <= kompl) && (PK_S3.so4etaniya[mr3][ii].price >= cena) && (PK_S3.so4etaniya[mr3][ii].speed >= speed)){
			    PK_S3.so4etaniya[mr3].splice(ii,1);
			    continue;
			}
		    }
		    if (add){
			PK_S3.so4etaniya[mr3].push( {ride: ride, speed: speed, kompl: kompl, price:cena});
			var l = PK_S3.so4etaniya[mr3].length - 1;
			PK_S3.so4etaniya[mr3][l].ids = [];
			for (var j1 = 0; j1 < PK_S3.so4etaniya[mr1][ir1].ids.length; ++j1){
			    PK_S3.so4etaniya[mr3][l].ids.push(PK_S3.so4etaniya[mr1][ir1].ids[j1]);
			}
			for (var j2 = 0; j2 < PK_S3.so4etaniya[mr2][ir2].ids.length; ++j2){
			    PK_S3.so4etaniya[mr3][l].ids.push(PK_S3.so4etaniya[mr2][ir2].ids[j2]);
			}
			PK_S3.so4etaniya[mr3][l].sets = sets1 + sets2;
			PK_S3.so4etaniya[mr3][l].ispolz = true;
			PK_S3.so4etaniya[mr1][ir1].ispolz = true;
			PK_S3.so4etaniya[mr2][ir2].ispolz = true;
			PK_S3.so4etaniya[mr3][l].old = false;
			PK_S3.so4etaniya[mr1][ir1].old = false;
			PK_S3.so4etaniya[mr2][ir2].old = false;
		    }
		}
	    }
	}
	--PK_S3.rekurs.index_mask;
    }
    PK_S3.podgotavlivaem_rezultat_moving();
}

PK_S3.polnyj_perebor_sleep = function(){
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = (PK_S3.rekurs.mask>0)?PK_S3.progress.array_mask[PK_S3.rekurs.mask]:0;
    fval = 100 * (fval + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }

    var infinity = true;
    while (infinity){
	var date = new Date();
	if (PK_S3.rekurs.time + PK_S3.rekurs.working < date.getTime()){
	    PK_S3.rekurs.time = date.getTime() + PK_S3.rekurs.delay;
	    setTimeout (PK_S3.polnyj_perebor_sleep, PK_S3.rekurs.delay);
	    return;
	}
	if (PK_S3.rekurs.mask > max_mask / 2){
	    var izmeneniya = false;
	    for (var m8 = 0; m8 < max_mask; ++m8){
	        for (var i8 = PK_S3.so4etaniya[m8].length - 1; i8>= 0; --i8){
		    if (!PK_S3.so4etaniya[m8][i8].ispolz){
			PK_S3.so4etaniya[m8][i8].old = true;
		    }
		    else{
		        PK_S3.so4etaniya[m8][i8].ispolz = false;
		        izmeneniya = true;
		    }
		}
	    }
	    if (!izmeneniya) infinity = false;
	    PK_S3.rekurs.mask = -1;
	    PK_S3.rekurs.index_mask = -1;
	}
	if (PK_S3.rekurs.index_mask < 0){
	    // пора переходить на следущую маску;
	    ++PK_S3.rekurs.mask;
	    PK_S3.rekurs.index_mask = PK_S3.so4etaniya[PK_S3.rekurs.mask].length - 1;
	    continue;
	}
	var ms1 = PK_S3.rekurs.mask;
	var is1 = PK_S3.rekurs.index_mask;
	var old1 = PK_S3.so4etaniya[ms1][is1].old
        var hea1 = PK_S3.so4etaniya[ms1][is1].heal;
	var reg1 = PK_S3.so4etaniya[ms1][is1].regen;
	var cen1 = PK_S3.so4etaniya[ms1][is1].price;
	var sets1 = PK_S3.so4etaniya[ms1][is1].sets;
        for (var ms2 = ms1 + 1; ms2 < max_mask; ++ms2){
	    if (ms1&ms2) continue;
	    var ms3 = ms1 + ms2;
	    for (var is2 = PK_S3.so4etaniya[ms2].length - 1; is2 >= 0; --is2){
		if (old1&&PK_S3.so4etaniya[ms2][is2].old) continue;
		sets2 = PK_S3.so4etaniya[ms2][is2].sets;
		if (sets1&sets2) continue;
		var heal = hea1 + PK_S3.so4etaniya[ms2][is2].heal;
		var regen = reg1 * PK_S3.so4etaniya[ms2][is2].regen;
		var cena = cen1 + PK_S3.so4etaniya[ms2][is2].price;
		if (cena <= PK_S3.setting.bablo){
		    var add = true;
		    for (var ii = PK_S3.so4etaniya[ms3].length - 1; ii >= 0; --ii){
			if (PK_S3.so4etaniya[ms3][ii].regen > regen){
			    add = false; break;
			}
			if (PK_S3.so4etaniya[ms3][ii].regen < regen){
			    PK_S3.so4etaniya[ms3].splice(ii,1);
			    continue;
			}
		        if ((PK_S3.so4etaniya[ms3][ii].heal >= heal) && (PK_S3.so4etaniya[ms3][ii].price <= cena)){
			    add = false; break;
		        }
			if ((PK_S3.so4etaniya[ms3][ii].heal <= heal) && (PK_S3.so4etaniya[ms3][ii].price >= cena)){
			    PK_S3.so4etaniya[ms3].splice(ii,1);
			    continue;
			}
		    }
		    if (add){
			PK_S3.so4etaniya[ms3].push( {heal: heal, regen: regen, price:cena});
			var l = PK_S3.so4etaniya[ms3].length - 1;
			PK_S3.so4etaniya[ms3][l].ids = [];
			for (var j1 = 0; j1 < PK_S3.so4etaniya[ms1][is1].ids.length; ++j1){
			    PK_S3.so4etaniya[ms3][l].ids.push(PK_S3.so4etaniya[ms1][is1].ids[j1]);
			}
			for (var j2 = 0; j2 < PK_S3.so4etaniya[ms2][is2].ids.length; ++j2){
			    PK_S3.so4etaniya[ms3][l].ids.push(PK_S3.so4etaniya[ms2][is2].ids[j2]);
			}
			PK_S3.so4etaniya[ms3][l].sets = sets1 + sets2;
			PK_S3.so4etaniya[ms3][l].ispolz = true;
			PK_S3.so4etaniya[ms1][is1].ispolz = true;
			PK_S3.so4etaniya[ms2][is2].ispolz = true;
			PK_S3.so4etaniya[ms3][l].old = false;
			PK_S3.so4etaniya[ms1][is1].old = false;
			PK_S3.so4etaniya[ms2][is2].old = false;
		    }
		}
	    }
	}
	--PK_S3.rekurs.index_mask;
    }
    PK_S3.podgotavlivaem_rezultat_sleep();
}

PK_S3.podgotavlivaem_rezultat_to = function (){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', parseInt((0.99 + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot * 100, 10));
    }
    var irab = PK_S3.tekushaya_rabota;


    PK_S3.resultaty[irab] = {};
    PK_S3.resultaty[irab].bonus = 0;
    PK_S3.resultaty[irab].selfTO = Math.floor(PK_S3.summa_to2(Character, PK_S3.raboty[irab].navyki));
    PK_S3.resultaty[irab].TO = PK_S3.resultaty[irab].bonus + PK_S3.resultaty[irab].selfTO - PK_S3.raboty[irab].malus;
    if (irab == PK_S3.raboty.health){
	PK_S3.resultaty[irab].TO = 90 + Character.level * 10 + PK_S3.resultaty[irab].TO * PK_S3.bonus.life;
    }
	
    var val = Math.round((((0.9 * PK_S3.raboty[irab].resultaty.dengi + 5) * Math.pow(PK_S3.resultaty[irab].TO + 1, 0.2))) * 2 * PK_S3.bonus.money);
    PK_S3.resultaty[irab].dengi = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
    val = Math.round(PK_S3.raboty[irab].resultaty.opyt * 2 * PK_S3.bonus.exp);
    PK_S3.resultaty[irab].opyt = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
    val = Math.round((((0.9 * PK_S3.raboty[irab].resultaty.vezenie + 5) * Math.pow(PK_S3.resultaty[irab].TO + 1, 0.2))) * 15 * PK_S3.bonus.money);
    PK_S3.resultaty[irab].vezenie = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
    // vezmin = vezmax / 3.   vez_sred = (min+max)/2 = vezmin*2/3;
    val = Math.round((8*Math.pow(PK_S3.raboty[irab].resultaty.boom, 1.35)) / (PK_S3.resultaty[irab].TO + 4));
    PK_S3.resultaty[irab].boom = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 99999 : val;

    PK_S3.resultaty[irab].items = [];
    PK_S3.resultaty[irab].itemsto = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	var t = PK_S3.types[i];
	PK_S3.resultaty[irab].items[t] = [];
	PK_S3.resultaty[irab].itemsto[t] = [];
	for (var j = 0; j < PK_S3.vyborka_to[t].length; ++j){
	    PK_S3.resultaty[irab].items[t][j] = PK_S3.vyborka_to[t][j].id;
	    PK_S3.resultaty[irab].itemsto[t][j] = PK_S3.vyborka_to[t][j].bonus;
	}
    }

    PK_S3.resultaty[irab].skills = {};
    for (var s in PK_S3.raboty[irab].navyki){
	var sk = (Character.skills[s]||(Character.skills[s]==0)) ? Character.skills[s] : Character.attributes[s];
	PK_S3.resultaty[irab].skills[s] = sk;
    }

    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = 100 * PK_S3.setting.sej4as_rabota / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }
    //setTimeout (PK_S3.prostoj_otbor_to, PK_S3.rekurs.delay);
};

PK_S3.podgotavlivaem_rezultat = function (){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', parseInt((0.99 + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot * 100, 10));
    }
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var max_index = -1;
    var max_value = -1;
    var irab = PK_S3.tekushaya_rabota;
    for (var i = PK_S3.so4etaniya[max_mask].length - 1; i >= 0; --i){
	if (PK_S3.so4etaniya[max_mask][i].bonus > max_value){
	    max_value = PK_S3.so4etaniya[max_mask][i].bonus;
	    max_index = i;
	}
    }
    if (max_index >= 0){
	
	var is_duel = ((irab >= PK_S3.raboty.duel_min)&&(irab < PK_S3.raboty.duel_max)) ? true : false;
	var hand_shot = Character.skills.punch - Character.skills.shot;
	if (is_duel){
	    if (PK_S3.raboty[irab].navyki.punch){
		hand_shot = 100;
	    }
	    else if (PK_S3.raboty[irab].navyki.shot){
		hand_shot = -100;
	    }
	}
	for (var i = PK_S3.so4etaniya[max_mask][max_index].ids.length - 1; i >= 0; --i){
	    cID = PK_S3.so4etaniya[max_mask][max_index].ids[i];
	    if (cID > 0){
		var vesch = PK_S3.items[cID];
		var ochki = 0; //PK_S3.summa_to(vesch.bonus, PK_S3.raboty[irab].navyki);
		if (is_duel&&(vesch.type=='right_arm')){
		    ochki += (vesch.damage.damage_min + vesch.damage.damage_max)/2;
		    if (vesch.sub_type=='hand'){
			ochki += hand_shot;
		    }
		    if (vesch.sub_type=='shot'){
			ochki -= hand_shot;
		    }
		    PK_S3.so4etaniya[max_mask][max_index].bonus -= ochki;
		}
	    }
	}

        PK_S3.resultaty[irab] = {};
	PK_S3.resultaty[irab].bonus = Math.floor(PK_S3.so4etaniya[max_mask][max_index].bonus);
	PK_S3.resultaty[irab].selfTO = Math.floor(PK_S3.summa_to2(Character, PK_S3.raboty[irab].navyki));
	PK_S3.resultaty[irab].TO = PK_S3.resultaty[irab].bonus + PK_S3.resultaty[irab].selfTO - PK_S3.raboty[irab].malus;
	
	if ((irab == PK_S3.raboty.build)&&(PK_S3.bonus.build)){
	    PK_S3.resultaty[irab].TO *= PK_S3.bonus.build;
	}
	if (irab == PK_S3.raboty.health){
	    PK_S3.resultaty[irab].TO = 90 + Character.level * 10 + PK_S3.resultaty[irab].TO * PK_S3.bonus.life;
	}
	var val = Math.round((((0.9 * PK_S3.raboty[irab].resultaty.dengi + 5) * Math.pow(PK_S3.resultaty[irab].TO + 1, 0.2))) * 2 * PK_S3.bonus.money);
	PK_S3.resultaty[irab].dengi = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
	val = Math.round(PK_S3.raboty[irab].resultaty.opyt * 2 * PK_S3.bonus.exp);
	PK_S3.resultaty[irab].opyt = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
	val = Math.round((((0.9 * PK_S3.raboty[irab].resultaty.vezenie + 5) * Math.pow(PK_S3.resultaty[irab].TO + 1, 0.2))) * 15 * PK_S3.bonus.money);
	PK_S3.resultaty[irab].vezenie = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 0 : val;
	// vezmin = vezmax / 3.   vez_sred = (min+max)/2 = vezmin*2/3;
	val = Math.round((8*Math.pow(PK_S3.raboty[irab].resultaty.boom, 1.35)) / (PK_S3.resultaty[irab].TO + 4));
	PK_S3.resultaty[irab].boom = (isNaN(val)||(val < 0)||(PK_S3.resultaty[irab].TO < 0)) ? 99999 : val;
	PK_S3.resultaty[irab].sets = PK_S3.so4etaniya[max_mask][max_index].sets;
	PK_S3.resultaty[irab].items = [];
	PK_S3.resultaty[irab].itemsto = [];
	for (var i = PK_S3.so4etaniya[max_mask][max_index].ids.length - 1; i >= 0; --i){
	    cID = PK_S3.so4etaniya[max_mask][max_index].ids[i];
	    if (cID > 0){
		PK_S3.resultaty[irab].items[PK_S3.items[cID].type] = cID;
		PK_S3.resultaty[irab].itemsto[PK_S3.items[cID].type] = PK_S3.summa_to(PK_S3.items[cID].bonus, PK_S3.raboty[irab].navyki);
	    }
	}
	if (PK_S3.setting.is_luck){
	    for (var i = 0; i < PK_S3.types.length; ++i){
		var vyb = PK_S3.vyborka[PK_S3.types[i]]['season_set']
		if (vyb){
		    PK_S3.resultaty[irab].items[PK_S3.types[i]] = vyb.id;
		    PK_S3.resultaty[irab].itemsto[PK_S3.types[i]] = vyb.bonus;
		}
	    }
	}
	if (!PK_S3.resultaty[irab].items.animal){
	    PK_S3.resultaty[irab].itemsto.animal = 0;
	    for (var i = 605; i >= 600; --i){
		if (PK_S3.vozmozhnye_veschi[i]){
		    PK_S3.resultaty[irab].items.animal = i;
		    break;
		}
	    }
	    if (!PK_S3.resultaty[irab].items.animal && PK_S3.vozmozhnye_veschi[607]) PK_S3.resultaty[irab].items.animal = 607;
	    if (!PK_S3.resultaty[irab].items.animal && PK_S3.vozmozhnye_veschi[609]) PK_S3.resultaty[irab].items.animal = 609;
	    if (!PK_S3.resultaty[irab].items.animal && PK_S3.vozmozhnye_veschi[614]) PK_S3.resultaty[irab].items.animal = 614;
	}
	if (!PK_S3.resultaty[irab].items.animal){
	    PK_S3.resultaty[irab].itemsto.animal = 0;
	}
	else{
	    PK_S3.resultaty[irab].itemsto.animal = PK_S3.summa_to(PK_S3.items[PK_S3.resultaty[irab].items.animal].bonus, PK_S3.raboty[irab].navyki);
	};
	if (PK_S3.activity == 'nenuzhnoe'){
	    for (var i = 0; i < PK_S3.types.length; ++i){
		if (PK_S3.resultaty[irab].items[PK_S3.types[i]]){
		    PK_S3.ispolzuemye[PK_S3.resultaty[irab].items[PK_S3.types[i]]] = true;
		}
	    }
	}
	PK_S3.resultaty[irab].skills = {};
	var kompl = [];
	for (var i = 0; i < PK_S3.nabory.length; ++i){
	    kompl[i] = 0;
	    for (var j = 0; j < PK_S3.types.length; ++j){
		var cID = PK_S3.resultaty[irab].items[PK_S3.types[j]];
		if (cID&&(cID>0)&&(PK_S3.items[cID].set.key==PK_S3.nabory[i])){
		    ++kompl[i];
		}
	    }
	}
	for (var s in PK_S3.raboty[irab].navyki){
	    var sk = (Character.skills[s]||(Character.skills[s]==0)) ? Character.skills[s] : Character.attributes[s];
	    var z = {};
	    z[s] = 1;
	    for (var i = 0; i < PK_S3.types.length; ++i){
		var cID = PK_S3.resultaty[irab].items[PK_S3.types[i]];
		if (cID&&(cID>0)){
		    sk += PK_S3.summa_to(PK_S3.items[cID].bonus, z);
		}
	    }
	    for (var k = 0; k < PK_S3.nabory.length; ++k){
		if (kompl[k]>0){
		    sk += PK_S3.summa_to(PK_S3.komplekty[PK_S3.nabory[k]][kompl[k]].bonus, z);
		}
	    }
	    PK_S3.resultaty[irab].skills[s] = sk;
	}
    }
    else{
	alert ('error d\'t find max set');
    }

    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = 100 * PK_S3.setting.sej4as_rabota / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }
    setTimeout (PK_S3.otbor_nuzhnykh, PK_S3.rekurs.delay);
};

PK_S3.podgotavlivaem_rezultat_fort = function(){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', parseInt((100 * PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot, 10));
    }
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    for (var i = PK_S3.so4etaniya[max_mask].length - 1; i >= 0; --i){
	if (PK_S3.so4etaniya[max_mask][i].health < PK_S3.setting.min_health){
	    PK_S3.so4etaniya[max_mask].splice(i,1);
	}
    }
    var frab = PK_S3.tekushaya_rabota
    var frabota = PK_S3.raboty[frab];
    var max_value = 0;
    var max_index = -1;
    var dmg = 0;
    for (var i = PK_S3.so4etaniya[max_mask].length - 1; i >= 0; --i){
	var aim = Character.skills.aim;
	var dodge = Character.skills.dodge;
	var leadership = Character.skills.leadership;
	var skill = 0;
	if (frabota.navyki.endurance){
	    skill += Character.skills.endurance;
	}
	else{
	    skill += Character.skills.hide;
	}
	kompl = {};
	for (var j = PK_S3.so4etaniya[max_mask][i].ids.length - 1; j >= 0; --j){
	    var fID = PK_S3.so4etaniya[max_mask][i].ids[j];
	    if (fID && (fID > 0)){
		var bron = PK_S3.items[fID];
		if (bron.type == 'left_arm'){
		    var dmg_c = bron.damage.damage_min + bron.damage.damage_max;
		    if (dmg_c < dmg) continue;
		    dmg = dmg_c;
		}
		aim += PK_S3.summa_to(bron.bonus, {aim:1});
		dodge += PK_S3.summa_to(bron.bonus, {dodge:1});
		leadership += PK_S3.summa_to(bron.bonus, {leadership:1});
		if (frabota.navyki.endurance){
		    skill+= PK_S3.summa_to(bron.bonus, {endurance:1});
		}
		else{
		    skill+= PK_S3.summa_to(bron.bonus, {hide:1});
		}
		if (bron.set.key){
		    if (kompl[bron.set.key]){
			++kompl[bron.set.key]
		    }
		    else{
			kompl[bron.set.key] = 1;
		    }
		}
	    }
	}
	for (var j = 0; j < PK_S3.nabory.length; ++j){
	    if (kompl[PK_S3.nabory[j]]){
		var kbonus = PK_S3.komplekty[PK_S3.nabory[j]][kompl[PK_S3.nabory[j]]].bonus
		aim += PK_S3.summa_to(kbonus, {aim:1});
		dodge += PK_S3.summa_to(kbonus, {dodge:1});
		leadership += PK_S3.summa_to(kbonus, {leadership:1});
		if (frabota.navyki.endurance){
		    skill += PK_S3.summa_to(kbonus, {endurance:1});
		}
		else{
		    skill += PK_S3.summa_to(kbonus, {hide:1});
		}
	    }
	}
	var f_a = PK_S3.fort_bonus(aim);
	var f_d = PK_S3.fort_bonus(dodge);
	var f_s = PK_S3.fort_bonus(skill);
	var f_l = PK_S3.fort_bonus(leadership);
	var value = f_a * frabota.navyki.aim + f_d * frabota.navyki.dodge + f_s + f_l;
	if (value > max_value){
	    max_value = value;
	    max_index = i;
	    // попытка сделать навыки более "ровными"
	    var delit = 4;
	    if (frabota.navyki.aim < 0.1){
		aim = 0;
		delit = 3;
	    }
	    if ((frabota.navyki.dodge < 0.1)){
		dodge = 0;
		delit = 3;
	    }
	    var sum = aim + dodge + skill + leadership;
	    var sa = sum / delit;
	    var d_aim = sa - Character.skills.aim;
	    if (d_aim <= 0) d_aim = 0.001;
	    if (frabota.navyki.aim < 0.1){
		d_aim = 0.001;
	    }
	    var d_dodge = sa - Character.skills.dodge;
	    if (d_dodge <= 0) d_dodge = 0.001;
	    if ((frabota.navyki.dodge < 0.1)){
		d_dodge = 0.001;
	    }
	    var d_leadership = sa - Character.skills.leadership;
	    if (d_leadership <= 0) d_leadership = 0.001;
	    
	    if (frabota.navyki.endurance){
		var d_skill = sa - Character.skills.endurance;
	    }
	    else{
		var d_skill = sa - Character.skills.hide;
	    }
	    if (d_skill <= 0) d_skill = 0.001;

	    var d_sum = d_aim + d_dodge + d_skill + d_leadership;
	    // окончание попытки.
	    
	    PK_S3.forty.ves.aim = d_aim / d_sum;
	    PK_S3.forty.ves.dodge = d_dodge / d_sum;
	    PK_S3.forty.ves.leadership = d_leadership / d_sum;
	    PK_S3.forty.ves.skill = d_skill / d_sum;
	    PK_S3.forty.items = [];
	    for (var f = PK_S3.so4etaniya[max_mask][max_index].ids.length - 1; f >= 0; --f){
		PK_S3.forty.items[f] = PK_S3.so4etaniya[max_mask][max_index].ids[f];
	    }
	    PK_S3.forty.old_attack = 23.5 + f_a + f_s + PK_S3.apply_fort_bonus_lead(f_l);
	    PK_S3.forty.old_defense = 8.5 + f_d + f_s + PK_S3.apply_fort_bonus_lead(f_l);
	}
	
    }
    if (max_index >= 0){
	var next = false;
	if (PK_S3.forty.max_value < max_value){
	    PK_S3.forty.max_value = max_value;
	    PK_S3.resultaty[frab].items = [];
	    for (var f = PK_S3.forty.items.length - 1; f >= 0; --f){
		fID = PK_S3.forty.items[f];
		if (fID > 0){
		    PK_S3.resultaty[frab].items[PK_S3.items[fID].type] = fID;
		}
	    }
	    if (!PK_S3.resultaty[frab].items.animal){
		for (var ff = 605; ff >= 600; --ff){
		    if (PK_S3.vozmozhnye_veschi[ff]){
		        PK_S3.resultaty[frab].items.animal = ff;
		        break;
		    }
		}
		if (!PK_S3.resultaty[frab].items.animal && PK_S3.vozmozhnye_veschi[607]) PK_S3.resultaty[frab].items.animal = 607;
		if (!PK_S3.resultaty[frab].items.animal && PK_S3.vozmozhnye_veschi[609]) PK_S3.resultaty[frab].items.animal = 609;
		if (!PK_S3.resultaty[frab].items.animal && PK_S3.vozmozhnye_veschi[614]) PK_S3.resultaty[frab].items.animal = 614;
	    }
	    PK_S3.forty.attack = PK_S3.forty.old_attack;
	    PK_S3.forty.defense = PK_S3.forty.old_defense;
	    next = true;
	}
	else if (PK_S3.forty.old_value < max_value){
	    PK_S3.forty.old_value = max_value;
	    next = true;
	}
	if (PK_S3.forty.old_value == PK_S3.forty.max_value){
	    next = false;
	}
	if (next){
	    PK_S3.otbor_nuzhnykh_fort(frab);
	    return;
	}
    }
    // вещи хранятся в результатах.
    PK_S3.resultaty[frab].dengi = 0;
    PK_S3.resultaty[frab].opyt = 0;
    PK_S3.resultaty[frab].vezenie = 0;
    PK_S3.resultaty[frab].boom = 0;


    if (PK_S3.forty.max_value <= 0){
	var aim = Character.skills.aim;
	var dodge = Character.skills.dodge;
	var leadership = Character.skills.leadership;
	var skill = 0;
	if (frabota.navyki.endurance){
	    skill += Character.skills.endurance;
	}
	else{
	    skill += Character.skills.hide;
	}
	PK_S3.resultaty[frab].items = [];
	var f_a = PK_S3.fort_bonus(aim);
	var f_d = PK_S3.fort_bonus(dodge);
	var f_s = PK_S3.fort_bonus(skill);
	var f_l = PK_S3.fort_bonus(leadership);
	PK_S3.forty.attack = 23.5 + f_a + f_s + PK_S3.apply_fort_bonus_lead(f_l);
	PK_S3.forty.defense = 8.5 + f_a + f_s + PK_S3.apply_fort_bonus_lead(f_l);
	PK_S3.forty.max_value = 0;
    }
    
    PK_S3.resultaty[frab].skills = {};
    var kompl = [];
    for (var i = 0; i < PK_S3.nabory.length; ++i){
	kompl[i] = 0;
	for (var j = 0; j < PK_S3.types.length; ++j){
	    var cID = PK_S3.resultaty[frab].items[PK_S3.types[j]];
	    if (cID&&(cID>0)&&(PK_S3.items[cID].set.key==PK_S3.nabory[i])){
		++kompl[i];
	    }
	}
    }
    var hnav = frabota.navyki;
    hnav.health = 1;
    for (var s in hnav){
	var sk = Character.skills[s];
	var z = {};
	z[s] = 1;
	for (var i = 0; i < PK_S3.types.length; ++i){
	    var cID = PK_S3.resultaty[frab].items[PK_S3.types[i]];
	    if (cID&&(cID>0)){
		sk += PK_S3.summa_to(PK_S3.items[cID].bonus, z);
	    }
	}
	for (var k = 0; k < PK_S3.nabory.length; ++k){
	    if (kompl[k]>0){
		sk += PK_S3.summa_to(PK_S3.komplekty[PK_S3.nabory[k]][kompl[k]].bonus, z);
	    }
        }
	PK_S3.resultaty[frab].skills[s] = sk;
    }
    PK_S3.resultaty[frab].selfTO = Math.round(PK_S3.forty.attack*100)/100;
    PK_S3.resultaty[frab].bonus = Math.round(PK_S3.forty.defense*100)/100;
    PK_S3.resultaty[frab].TO = Math.round(PK_S3.forty.max_value*100)/100;
    PK_S3.forty.ves = {aim:1, dodge:1, leadership:1, skill:1};
    PK_S3.forty.is_zero = true;


    if (PK_S3.activity == 'nenuzhnoe'){
        for (var i = 0; i < PK_S3.types.length; ++i){
	    if (PK_S3.resultaty[frab].items[PK_S3.types[i]]){
		PK_S3.ispolzuemye[PK_S3.resultaty[frab].items[PK_S3.types[i]]] = true;
	    }
	}
    }

    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = 100 * PK_S3.setting.sej4as_rabota / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }
    setTimeout (PK_S3.otbor_nuzhnykh, PK_S3.rekurs.delay);
}

PK_S3.podgotavlivaem_rezultat_moving = function (){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', parseInt((0.99 + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot * 100, 10));
    }
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var max_index = -1;
    var max_value = 0;
    var max_zver = 0;
    var irab = PK_S3.raboty.moving;
    var iRide = Character.skills.ride;
    for (var i = PK_S3.so4etaniya[max_mask].length - 1; i >= 0; --i){
	aID = 0;
	for (var j = PK_S3.so4etaniya[max_mask][i].ids.length; j >= 0; --j){
	    var cID = PK_S3.so4etaniya[max_mask][i].ids[j];
	    if ((cID >= 600)&&(cID < 700)){
		aID = cID;
	    }
	}
	var skorost = 100;
	if (aID){
	    //var skor_zverya = PK_S3.items[aID].speed;
	    //var skor_bonusov = PK_S3.so4etaniya[max_mask][i].speed / skor_zverya; // невероятная (пока?) скорость на других предметах
	    //skorost = 100 / skor_zverya + iRide + PK_S3.so4etaniya[max_mask][i].ride;
	    //skorost /= skor_bonusov;
	    skorost = 100 / PK_S3.so4etaniya[max_mask][i].speed + iRide + PK_S3.so4etaniya[max_mask][i].ride;
	    skorost *= (1 + PK_S3.so4etaniya[max_mask][i].kompl);
	}
	else{	// пеший идиот
	    skorost = 100 / PK_S3.so4etaniya[max_mask][i].speed * (1 + PK_S3.so4etaniya[max_mask][i].kompl);
	}
	if (skorost > max_value){
	    max_value = skorost;
	    max_index = i;
	    max_zver = aID;
	}
    }
    if (max_index >= 0){
	max_value *= PK_S3.bonus.speed;
        PK_S3.resultaty[irab] = {};
	PK_S3.resultaty[irab].bonus = Math.round(100 * (1 + PK_S3.so4etaniya[max_mask][max_index].kompl))+'%';
	PK_S3.resultaty[irab].selfTO = PK_S3.so4etaniya[max_mask][max_index].ride + iRide; //Character.skills
	PK_S3.resultaty[irab].TO = Math.round(max_value);
	PK_S3.resultaty[irab].sets = PK_S3.so4etaniya[max_mask][max_index].sets;
	PK_S3.resultaty[irab].items = [];
	PK_S3.resultaty[irab].itemsto = [];
	for (var i = PK_S3.so4etaniya[max_mask][max_index].ids.length - 1; i >= 0; --i){
	    cID = PK_S3.so4etaniya[max_mask][max_index].ids[i];
	    if (cID > 0){
		PK_S3.resultaty[irab].items[PK_S3.items[cID].type] = cID;
		PK_S3.resultaty[irab].itemsto[PK_S3.items[cID].type] = PK_S3.summa_to(PK_S3.items[cID].bonus, PK_S3.raboty[irab].navyki);
	    }
	}
	if (PK_S3.resultaty[irab].items.animal){
	    PK_S3.resultaty[irab].itemsto.animal = Math.round(100 / PK_S3.items[PK_S3.resultaty[irab].items.animal].speed) + '%';
	}
	PK_S3.resultaty[irab].skills = {};
	PK_S3.resultaty[irab].skills.ride = PK_S3.so4etaniya[max_mask][max_index].ride + iRide;
	PK_S3.resultaty[irab].dengi = 0;
	PK_S3.resultaty[irab].opyt = 0;
	PK_S3.resultaty[irab].vezenie = 0;
	PK_S3.resultaty[irab].boom = 99999;

        if (PK_S3.activity == 'nenuzhnoe'){
            for (var i = 0; i < PK_S3.types.length; ++i){
		if (PK_S3.resultaty[irab].items[PK_S3.types[i]]){
		    PK_S3.ispolzuemye[PK_S3.resultaty[irab].items[PK_S3.types[i]]] = true;
		}
	    }
	}
    }
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = 100 * PK_S3.setting.sej4as_rabota / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }
    setTimeout (PK_S3.otbor_nuzhnykh, PK_S3.rekurs.delay);
}


PK_S3.podgotavlivaem_rezultat_sleep = function (){
    var progress = $('pk_s3_progress_bar');
    if (progress){
	progress.setAttribute ('value', parseInt((0.99 + PK_S3.setting.sej4as_rabota - 1) / PK_S3.setting.s4itaem_rabot * 100, 10));
    }
    var max_mask = Math.pow(2, PK_S3.types.length) - 1;
    var max_index = -1;
    var max_value = 0;
    var max_value2 = 0;
    var irab = PK_S3.raboty.energy;
    var iHealth = Character.skills.health;
//    var baseHP = 90 + Character.level * 10 + iHealth * PK_S3.bonus.life;
    for (var i = PK_S3.so4etaniya[max_mask].length - 1; i >= 0; --i){
	var regeneration = PK_S3.so4etaniya[max_mask][i].regen;
	var health = PK_S3.so4etaniya[max_mask][i].heal;
	if (regeneration > max_value){
	    max_value = regeneration;
	    max_value2 = health;
	    max_index = i;
	}
	else if ((regeneration == max_value) && (health > max_value2)){
	    max_value = regeneration;
	    max_value2 = health;
	    max_index = i;
	}
    }
    if (max_index >= 0){
        PK_S3.resultaty[irab] = {};
	PK_S3.resultaty[irab].bonus = PK_S3.so4etaniya[max_mask][max_index].heal;
	PK_S3.resultaty[irab].selfTO = iHealth; //Character.skills
	PK_S3.resultaty[irab].TO = Math.round(max_value*10000)/100;
	PK_S3.resultaty[irab].sets = PK_S3.so4etaniya[max_mask][max_index].sets;
	PK_S3.resultaty[irab].items = [];
	PK_S3.resultaty[irab].itemsto = [];
	for (var i = PK_S3.so4etaniya[max_mask][max_index].ids.length - 1; i >= 0; --i){
	    cID = PK_S3.so4etaniya[max_mask][max_index].ids[i];
	    if (cID > 0){
		PK_S3.resultaty[irab].items[PK_S3.items[cID].type] = cID;
		PK_S3.resultaty[irab].itemsto[PK_S3.items[cID].type] = PK_S3.summa_to(PK_S3.items[cID].bonus, {health:1});
	    }
	}
 	if (!PK_S3.resultaty[irab].items.animal){
	    for (var i = 605; i >= 600; --i){
		if (PK_S3.vozmozhnye_veschi[i]){
		    PK_S3.resultaty[irab].items.animal = i;
		    break;
		}
	    }
	    if (!PK_S3.resultaty[irab].items.animal && PK_S3.vozmozhnye_veschi[607]) PK_S3.resultaty[irab].items.animal = 607;
	    if (!PK_S3.resultaty[irab].items.animal && PK_S3.vozmozhnye_veschi[609]) PK_S3.resultaty[irab].items.animal = 609;
	    if (!PK_S3.resultaty[irab].items.animal && PK_S3.vozmozhnye_veschi[614]) PK_S3.resultaty[irab].items.animal = 614;
	    if (PK_S3.resultaty[irab].items.animal){
		PK_S3.resultaty[irab].itemsto.animal = 0;
	    }
	}
	PK_S3.resultaty[irab].skills = {};
	PK_S3.resultaty[irab].skills.health = PK_S3.so4etaniya[max_mask][max_index].heal + iHealth;
	PK_S3.resultaty[irab].dengi = 0;
	PK_S3.resultaty[irab].opyt = 0;
	PK_S3.resultaty[irab].vezenie = 0;
	PK_S3.resultaty[irab].boom = 99999;

        if (PK_S3.activity == 'nenuzhnoe'){
            for (var i = 0; i < PK_S3.types.length; ++i){
		if (PK_S3.resultaty[irab].items[PK_S3.types[i]]){
		    PK_S3.ispolzuemye[PK_S3.resultaty[irab].items[PK_S3.types[i]]] = true;
		}
	    }
	}

   }
    var progress = $('pk_s3_progress_bar');
    var current_task = $('current_task_box_text');
    var fval = 100 * PK_S3.setting.sej4as_rabota / PK_S3.setting.s4itaem_rabot;
    if (progress){
	progress.setAttribute ('value', parseInt(fval, 10));
    }
    if (current_task){
	var sx = new Array(parseInt(fval/3.3, 10)).join('#');
	var ss = new Array(parseInt(31 - fval/3.3, 10)).join('=');
	var sv = '|'+sx+ss+'|';
	current_task.textContent = sv;
    }
    setTimeout (PK_S3.otbor_nuzhnykh, PK_S3.rekurs.delay);
}


PK_S3.vyvod_prostyh_rabot = function (){
    setTimeout(PK_S3.restore_text_message, 2000);
    PK_S3.show_window_rezultat();
}

PK_S3.equip_adds = function(rabota_id){
    for (var i = 0; i < PK_S3.types.length; ++i){// PK_S3.resultaty[rabota_id].items.length;++i){
	var qID = PK_S3.resultaty[rabota_id].items[PK_S3.types[i]];
	if (qID){
	    PK_S3.odevalo4ka.items.push(qID);
	}
    }
    if ((rabota_id > 0)&&(rabota_id < PK_S3.raboty.max)){
	var minimap_job = $('minimap_job_id');
	if (minimap_job){
	    minimap_job.value = rabota_id;
	}
    }
    setTimeout(PK_S3.equip_start,PK_S3.rekurs.delay);
    return;
}

PK_S3.equip_add = function(item_id) {
    PK_S3.odevalo4ka.items.push(item_id);
    setTimeout(PK_S3.equip_start,PK_S3.rekurs.delay);
    return;
}

PK_S3.equip_start = function(){
    PK_S3.odevalo4ka.count = 0;
    if ((!wman.getById(Wear.uid)) || (!(Bag.loaded))){
	Wear.open();
	PK_S3.odevalo4ka.bagazh = true;
	PK_S3.show_text_message ('Ожидаем открытия багажа...', 5000);
    }
    setTimeout(PK_S3.equip_wait_bagazh, 10);
}

PK_S3.equip_wait_bagazh = function(){
    if (++PK_S3.odevalo4ka.count > PK_S3.odevalo4ka.repeat){
	PK_S3.show_text_message ('Не удалось открыть окно багажа!', 5000);
	return;
    }
    if ((!wman.getById(Wear.uid)) || (!(Bag.loaded))){
	setTimeout(PK_S3.equip_wait_bagazh, PK_S3.odevalo4ka.wait_inventory);
	return;
    }
    PK_S3.odevalo4ka.count = 0;
    PK_S3.equip_carring();
}

PK_S3.equip_carring = function(){
    if (PK_S3.odevalo4ka.items.length == 0){
	if (Character.characterSex == 'male'){
	    PK_S3.show_text_message ('Ты оделся!', 5000);
	}
	else{
	    PK_S3.show_text_message ('Ты оделась!', 5000);
	}
	return;
    }
    PK_S3.show_text_message ('Одеваемся!', 1000);
    var eID = PK_S3.odevalo4ka.items[0];
    var type = (PK_S3.items[eID]) ? PK_S3.items[eID].type : ' ';
    if ((type==' ')||Wear.wear[type]){
	if ((type==' ')||(Wear.wear[type].obj.item_id == eID)){
	    //уже одето, выплёвываем из очереди
	    PK_S3.odevalo4ka.items.shift();
	    PK_S3.odevalo4ka.count = 0;
	    PK_S3.equip_carring();
	    return;
	}
    }
    var bag = Bag;
    var wear = Wear;
    var he_find = 0;
    for (var t = 0; (he_find == 0) && (t < PK_S3.types.length); ++t){
	var bag_type = bag.items[PK_S3.types[t]];
	for (var ii in bag_type){
	    if (bag_type[ii].obj.item_id == eID){
	       he_find = bag_type[ii];
	       break;
	    }
	}
    }
    if (he_find == 0){
	//не нашли такое, выплёвываем
	PK_S3.odevalo4ka.items.shift();
	PK_S3.equip_wait_bagazh();
	return;
    }
    wear.carry(he_find);
    PK_S3.odevalo4ka.count = 0;
    setTimeout(PK_S3.equip_wait_carry,PK_S3.odevalo4ka.wait_carry)
}

PK_S3.equip_wait_carry = function() {
    if (++PK_S3.odevalo4ka.count > PK_S3.odevalo4ka.repeat){
	// одеть не удалось, материмся и отказываемся от этой вещи
	PK_S3.show_text_message ('Вещь: '+PK_S3.items[PK_S3.odevalo4ka.items[0]].name+' надеть не удалось!', 3000);
	PK_S3.odevalo4ka.items.shift();
	PK_S3.equip_carring();
	return;
    }
    var eID = PK_S3.odevalo4ka.items[0];
    var type = PK_S3.items[eID].type;
    
    if (Wear.wear[type]&&(Wear.wear[type].obj.item_id == eID)){
	PK_S3.equip_carring();
	return;
    }
    setTimeout(PK_S3.equip_wait_carry,PK_S3.odevalo4ka.wait_carry);
}

PK_S3.equip_items_save = function(irabot){
    ind = PK_S3.cookies.save.length;
    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
	if (PK_S3.cookies.save[i].name == PK_S3.raboty[irabot].rus_name){
	    ind = i;
	    break;
	}
    }
    PK_S3.cookies.save[ind] = {};
    PK_S3.cookies.save[ind].name = PK_S3.raboty[irabot].rus_name;
    PK_S3.cookies.save[ind].ids = [];
    for (var i = 0; i < PK_S3.types.length; ++i){
	if (PK_S3.resultaty[irabot].items[PK_S3.types[i]]){
	    PK_S3.cookies.save[ind].ids.push (PK_S3.resultaty[irabot].items[PK_S3.types[i]]);
	}
    }
    PK_S3.save_nabory();
    PK_S3.spam_bagazh_option();
}

PK_S3.equip_items_delete = function(irabot){
    name = PK_S3.raboty[irabot].rus_name;
    for (var i = PK_S3.cookies.save.length - 1; i >= 0; --i){
	if (PK_S3.cookies.save[i].name == name){
	    PK_S3.cookies.save.splice(i,1);
	}
    }
    PK_S3.save_nabory();
    PK_S3.spam_bagazh_option();
}

PK_S3.my_name_is = function (){
    if (Character&&Character.name){
	PK_S3.cookies.name = location.host.substr(0,4)+Character.name;
	PK_S3.vyvod.region = location.host.substr(0,2);
	setTimeout(PK_S3.load_nabory, 1000);
	setTimeout(PK_S3.load_raboty, 2000);
	setTimeout(PK_S3.check_raboty, 3000);
    }
    else{
	setTimeout(PK_S3.my_name_is, 1000);
    }
};

PK_S3.check_raboty = function (){
    if (!window.JobList) return;
    if (PK_S3.vyvod.region=='ru'){
	for (var i = 1; i < PK_S3.raboty.max; ++i){
	    if (JobList[i]&&JobList[i].name && (JobList[i].name != PK_S3.raboty[i].rus_name)){
	        PK_S3.informer += 'Неверная работа. Старое название: "'+PK_S3.raboty[i].rus_name+'", новое название: "'+JobList[i].name+'"\n';
	        PK_S3.raboty[i].rus_name = JobList[i].name;
	    }
	}
    }
    else{
	for (var i = 1; i < PK_S3.raboty.max; ++i){
	    if (JobList[i]){
		PK_S3.raboty[i].orig_name = JobList[i].name;
	    }
	}
    }
}

PK_S3.except_raboty = function (id, value){
    if (PK_S3.raboty[id]){
	PK_S3.raboty[id].except = value;
    }
    PK_S3.save_raboty();
}


PK_S3.set_cookie = function (name, value){
    expires = new Date();
    expires.setTime(expires.getTime() + (1000 * 60 * 60 * 24 * 180));
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + expires.toGMTString();
}

PK_S3.get_cookie = function (name) {
    var cookie = " " + document.cookie;
    var search = " " + escape(name) + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if (cookie.length > 0) {
	offset = cookie.indexOf(search);
	if (offset != -1) {
	    offset += search.length;
	    end = cookie.indexOf(";", offset)
	    if (end == -1) {
		end = cookie.length;
	    }
	    setStr = unescape(cookie.substring(offset, end));
	}
    }
    return(setStr);
};

PK_S3.save_nabory = function (){
    PK_S3.bsort(PK_S3.cookies.save, 'name');
    var str = '';
    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
	str += (str=='')?'':'@';
	str += PK_S3.cookies.save[i].name + '~';
	var str2 = '';
	for (var j = 0; j < PK_S3.cookies.save[i].ids.length; ++j){
	    str2+= (str2=='') ? '' : ',';
	    str2+= PK_S3.cookies.save[i].ids[j];
	}
	str += str2;
    }
    PK_S3.set_cookie(PK_S3.cookies.name, str);

    PK_S3.show_text_message ('Наборы сохранены', 1500);    
}

PK_S3.save_raboty = function (){
    var str = '';
    for (var i = 1; i < 999; ++i){
	if (!PK_S3.raboty[i]) continue;
	if (PK_S3.raboty[i].except){
	    str += (str=='')?'':',';
	    str += i;
	}
    }
    PK_S3.set_cookie(PK_S3.cookies.name+'r', str);
};

PK_S3.load_nabory = function (){
    var str = PK_S3.get_cookie(PK_S3.cookies.name);
    PK_S3.cookies.save = [];
    if (!str||(str=='')||(str.length==0)) return;
    var ar1 = str.split('@');
    for (var i = 0; i < ar1.length; ++i){
	if (ar1[i].length == 0) continue;
	PK_S3.cookies.save[i] = {};
	var ar2 = ar1[i].split('~');
	PK_S3.cookies.save[i].name = ar2[0];
	PK_S3.cookies.save[i].ids = [];
	if (!ar2[1]) continue;
	var ar3 = ar2[1].split(',');
	for (var j = 0; j < ar3.length; ++j){
	    PK_S3.cookies.save[i].ids.push (ar3[j]);
	}
    }
    var izbytok = false;
    for (var i = PK_S3.cookies.save.length - 1; i >= 0; --i){
	if (!PK_S3.cookies.save[i]){
	    PK_S3.cookies.save.splice(i,1);
	}
    }
    PK_S3.bsort(PK_S3.cookies.save, 'name');
    for (var i = PK_S3.cookies.save.length - 1; i > 0; --i){
	    if (PK_S3.cookies.save[i].name == PK_S3.cookies.save[i-1].name){
		PK_S3.cookies.save.splice(i,1);
		izbytok = true;
	}
    }
    if (izbytok) PK_S3.save_nabory();
}

PK_S3.load_raboty = function (){
    var str = PK_S3.get_cookie(PK_S3.cookies.name+'r');
    if (!str||(str=='')||(str.length==0)) return;
    var ar = str.split(',');
    for (var i = 0; i < ar.length; ++i){
	if (PK_S3.raboty[ar[i]]) PK_S3.raboty[ar[i]].except = true;
    }
}


PK_S3.equip_motivation = function (job_name){
    PK_S3.load_nabory();
    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
	if (PK_S3.cookies.save[i].name==job_name){
	    if (!PK_S3.cookies.save[i].ids) return;
	    for (var j = 0; j < PK_S3.types.length; ++j){
		var qID = PK_S3.cookies.save[i].ids[j]
		if (qID){
		    PK_S3.odevalo4ka.items.push(qID);
		}
	    }
	    setTimeout(PK_S3.equip_start,PK_S3.rekurs.delay);
	    return;
	}
    }
    PK_S3.show_text_message ('Нет сохранённого комплекта', 3000);
};

PK_S3.equip_add2 = function (){
    var elem = $('pk_s3_odevalo4ka_select2');
    if (!elem) return;
    var ind = elem.value - 1;
    if (!PK_S3.cookies.save[ind]) return;
    for (var i = 0; i < PK_S3.types.length; ++i){
	var qID = PK_S3.cookies.save[ind].ids[i]
	if (qID){
	    PK_S3.odevalo4ka.items.push(qID);
	}
    }
    setTimeout(PK_S3.equip_start,PK_S3.rekurs.delay);
    return;
}

PK_S3.equip_add3 = function (){
    var elem = $('pk_s3_odevalo4ka_select3');
    if (!elem) return;
    var ind = elem.value - 1;
    if (!PK_S3.cookies.save[ind]) return;
    for (var i = 0; i < PK_S3.types.length; ++i){
	var qID = PK_S3.cookies.save[ind].ids[i]
	if (qID){
	    PK_S3.odevalo4ka.items.push(qID);
	}
    }
    setTimeout(PK_S3.equip_start,PK_S3.rekurs.delay);
    return;
}

PK_S3.equip_save = function (){
    var inp = $('pk_s3_odevalo4ka_input');
    if (!inp) return;
    var name = inp.value;
    var ind = PK_S3.cookies.save.length;
    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
	if (PK_S3.cookies.save[i].name == name){
	    ind = i;
	    break;
	}
    }
    PK_S3.cookies.save[ind] = {};
    PK_S3.cookies.save[ind].name = name;
    PK_S3.cookies.save[ind].ids = [];
    for (var itype = 0; itype < PK_S3.types.length; ++itype){
	var type = PK_S3.types[itype];
	if (Wear.wear[type]){
	    PK_S3.cookies.save[ind].ids.push (Wear.wear[type].obj.item_id);
	}
    }
    inp.value = '';
    PK_S3.save_nabory();
    PK_S3.spam_bagazh_option();
}

PK_S3.equip_del = function (){
    var elem = $('pk_s3_odevalo4ka_select2');
    if (!elem) return;
    var ind = elem.value - 1;
    PK_S3.cookies.save.splice(ind,1);
    PK_S3.save_nabory();
    PK_S3.spam_bagazh_option();
}

PK_S3.spam_bagazh_option = function (){
    var elem2 = $('pk_s3_odevalo4ka_select2');
    var elem3 = $('pk_s3_odevalo4ka_select3')
    while (elem2 && elem2.firstChild){
	elem2.removeChild(elem2.firstChild);
    }
    while (elem3 && elem3.firstChild){
	elem3.removeChild(elem3.firstChild);
    }
    for (var i = 0; i < PK_S3.cookies.save.length; ++i){
	var opt = new Element ('option', {'value':(i+1)});
	opt.textContent = PK_S3.cookies.save[i].name;
	if (elem2) elem2.appendChild(opt);
	if (elem3) elem3.appendChild(opt);
    }
}

PK_S3.spam_bagazh = function(){
    var wear_wind = $('wear_drop')
    if (!wear_wind) return;
    if ($('pk_s3_odevalo4ka_all')) return;
    wear_wind = wear_wind.parentNode;
    PK_S3.load_nabory();
    var all = new Element ('div', {'id':'pk_s3_odevalo4ka_all', 'style':'float: left; padding: 1px 0px; position: relative; left: -5px; top: -47px;'});
    var span = new Element ('div', {'style':'cursor:pointer; font-weight:bold; color:white; padding: 0px 5px; display:inline; font-size:11px;'});
    span.textContent = 'удалить';
    span.addEventListener('click', PK_S3.equip_del, false);
    all.appendChild(span);
    var sel = new Element ('select', {'id':'pk_s3_odevalo4ka_select2', 'style':'width: 125px; background-color:#e8dab3; font-size:11px; height:18px;'});
    all.appendChild(sel);
    var span = new Element ('div', {'style':'cursor:pointer; font-weight:bold; color:white; padding: 0px 5px; display:inline; font-size:11px;'});
    span.textContent = 'надеть';
    span.addEventListener('click', PK_S3.equip_add2, false);
    all.appendChild(span);
    wear_wind.appendChild(all);

    var all2 = new Element ('div', {'id':'pk_s3_odevalo4ka_all2', 'style':'float:left; padding: 1px 0px; position: relative; left: -5px; top: -47px;'});
    var span = new Element ('div', {'style':'cursor:pointer; font-weight:bold; color: white; padding: 0px 5px; display:inline; font-size:11px;'});
    span.textContent = 'сохранить';
    span.addEventListener('click', PK_S3.equip_save, false);
    all2.appendChild(span);
    var inp = new Element ('input', {'id':'pk_s3_odevalo4ka_input', 'type':'text', 'value':'Новый набор', 'style':'width: 150px; background-color:#e8dab3; font-size:11px; height:13px;'});
    all2.appendChild(inp);
    wear_wind.appendChild(all2);

    PK_S3.spam_bagazh_option();
}

var PK_S3funs = ['init','qsort','bsort','input_select_rdf', 'show_window_settings', 'minimize_window_settings', 'minimize_window_settings2', 'show_window_informer',
		 'minimize_window_informer', 'minimize_window_informer2', 'running_bar', 'summa_to', 'summa_to2', 'fort_bonus', 'apply_fort_bonus_lead', 'show_popup_message', 'second_init',
		 'waiting_inventory', 'compare_item', 'assign_item', 'print_item', 'parsing_inventory', 'cena_pods4eta', 'otbor_vozmozhnyh', 'otbor_nuzhnykh',
		 'otbor_nuzhnykh_fort', 'otbor_nuzhnykh_moving', 'otbor_nuzhnykh_sleep', 'otsev_nenuzhnykh', 'otsev_nenuzhnykh_fort', 'otsev_nenuzhnykh_moving',
		 'otsev_nenuzhnykh_sleep', 'polnyj_perebor', 'polnyj_perebor_fort', 'polnyj_perebor_moving', 'polnyj_perebor_sleep', 'podgotavlivaem_rezultat',
		 'podgotavlivaem_rezultat_fort', 'podgotavlivaem_rezultat_moving', 'podgotavlivaem_rezultat_sleep', 'sortirovka_rabot', 'print_raboty', 'vyvod_prostyh_rabot',
		 'show_window_rezultat', 'minimize_window_rezult', 'minimize_window_rezult2', 'equip_start', 'equip_wait_bagazh', 'equip_carring', 'equip_wait_carry', 'equip_add',
		 'equip_adds', 'my_name_is', 'set_cookie', 'get_cookie', 'spam_bagazh', 'spam_bagazh_option', 'load_nabory', 'save_nabory', 'equip_add2', 'equip_add3', 'equip_del',
		 'equip_save', 'equip_items_save', 'equip_items_delete', 'equip_motivation', 'four_init', 'restore_text_message', 'show_text_message', 'prostoj_otbor_to',
		 'podgotavlivaem_rezultat_to', 'check_raboty', 'except_raboty', 'load_raboty', 'save_raboty', 'vyvod_nenuzhnykh_items'];

pk_s3_code += 'if (window.PK_S3 == undefined){ window.PK_S3 = new Object();';
for (var i = 0; i < PK_S3funs.length; ++i){
    var PK_S3fun = 'PK_S3.'+PK_S3funs[i];
    //if (i<3) alert(eval(PK_S3fun.toString()));
    pk_s3_code += PK_S3fun + ' = ' + eval(PK_S3fun.toString()) + '\n';
};

pk_s3_code += '};\n	PK_S3.init();';
//pk_s3_code += " window.addEventListener('load', PK_S3.init, false);\n}";
pk_s3_script.innerHTML = pk_s3_code;
pk_s3_body.appendChild(pk_s3_script);

//aWindow.addEventListener('load', PK_S3.init, false);

// ================== ФУКЦИЙ ИСПРАВЛЕННЫЕ == КОНЕЦ ==================
/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_77', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_77', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=77&version=2.1.0';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();


// Рынок
//======================================================

var dyMarketHelperGeneral = (function () {
	"use strict";
	var SCRIPT_VERSION = "1.2.8.4",
		SCRIPT_WEBSITE = "http://userscripts.org/scripts/show/119454",
		PREFIX = "dyMarketHelper";
	return {
		getVersion: function () {
			return SCRIPT_VERSION;
		},
		getWebsite: function () {
			return SCRIPT_WEBSITE;
		},
		getPrefix: function () {
			return PREFIX;
		}
	};
}());

var dyMarketHelperCode = function (currentVersion, scriptWebsite) {
	"use strict";
	/*global window, document, alert, jQuery, WMap, wman, pos, console, TheWestApi, dyMarketHelper, AjaxWindow, Market, Ajax*/
	var lastPageParsed = -1,
		townInfo = [],
		townCoords = [],
		townIndex = 0,
		townCoordsIndex = 0,
		townIdToIndex = {},
		currentLocationXY = "",
		prefix = "dyMarketHelper",
		scriptName = "The-west market helper",
		scriptAuthor = "darkyndy",
		marketHelperTab = null,
		marketHelperTabContent = null,
		marketHelperTabLoader = null,
		$mapEl = null,
		$filtersEl = null,
		$townsEl = null,
		$helpEl = null,
		mapWidth = 761,
		mapHeight = 137,
		debug = false,
		gameUrl = "http://" + window.location.hostname + "/game.php",
		marketItemsPerPage = 11,
		lastMarketOfferId = 0,
		isVersionWithNewMarket = true,
		marketHelperTabReopenEventInProgress = false,
		scriptIconSrc = "data:image/png;base64," +
			"iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAK" +
			"T2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AU" +
			"kSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXX" +
			"Pues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgAB" +
			"eNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAt" +
			"AGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3" +
			"AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dX" +
			"Lh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+" +
			"5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk" +
			"5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd" +
			"0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA" +
			"4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzA" +
			"BhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/ph" +
			"CJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5" +
			"h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+" +
			"Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhM" +
			"WE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQ" +
			"AkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+Io" +
			"UspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdp" +
			"r+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZ" +
			"D5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61Mb" +
			"U2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY" +
			"/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllir" +
			"SKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79u" +
			"p+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6Vh" +
			"lWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1" +
			"mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lO" +
			"k06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7Ry" +
			"FDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3I" +
			"veRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+B" +
			"Z7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/" +
			"0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5p" +
			"DoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5q" +
			"PNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIs" +
			"OpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5" +
			"hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQ" +
			"rAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9" +
			"rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1d" +
			"T1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aX" +
			"Dm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7" +
			"vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3S" +
			"PVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKa" +
			"RptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO" +
			"32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21" +
			"e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfV" +
			"P1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i" +
			"/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8" +
			"IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADq" +
			"YAAAOpgAABdvkl/FRgAACWNJREFUWMONV0lsHGkVfrVXdfXm3e3YEy9xZkLsAApChGUUgZgDIJA4" +
			"DVwGODKCEwdunJBACLiBEIvEZYQAcQGhGSExGkCAxEhAPBEzcWwntuOlF/dWS1fXxvf+qnY6mUVj" +
			"6Xd1V9f/v+9973tLSWmakiRJ9A5/8lUi9bBSsU2TqlGQXIuT+Dq2zWPfXEoUylJaT1P5yLCUf+D+" +
			"PW2Qdh70eh72hlgJVpqvN/1J7wCAb2oLC6Vy4Cbvj9L0eU1Tb5qGZlfKRdI1VdZURU7ShKIoTgZB" +
			"mPT6vhTH8WkYJS9quvrTNA32DMPtHRzQMAeQvFsA8tzcnJUEzuUwoW/puvLpC/NTCgxLtm3CuEaq" +
			"opAsSxQlCcEoDYchDcOIfH9I3Z4bn3Uc3Ip+aVrmj3o9H4T03JyRR9h4KwDyxMREKUnCT6oy/aw2" +
			"N1Wam52Qq2WbpiYqVCxaZBk68Rb2Po4TCqMMgOMOqO/65OHq+gM6bXTiXt/bIZm+HoaDW82m18b5" +
			"w3EQjwNQqtUqjAdfMjT9u+srNX16qkq1+SmaniyTAq91VSVJxm7sS5KUIniPEFAI7wOAGAyGuIKF" +
			"vkcugDQ7/bR+2u0mSfK1Tt972ff91jiIcQDy9PS0HQ/9zyF+v7hy+QltbmaCLi7OkWUZVMBCyOF1" +
			"em6QFwQJMCTAwAgAJRQEQ/L8AIz41Hd8BpM+OG52IYDnOh3vVc/zzkYg1DHBqXEcbCqa8uP11Qva" +
			"PIyvLtdg2BTGheE4izcbGgGXZIVS3MvckcCSLPbouk4QLSmII+5J2F85Oe380LaN5wCAjfewInVM" +
			"dBNh4H1vsTZtz0xX6InFWbJMUxzG8BI2kmbayS8CgIwvsqKSqvF3mYQ4GJwskwXBChAsWEWRhkF4" +
			"sdGMvlIsFr/vOA4L0hUAlpZIdxz345apf3B2pirVZifJNA0A0IXxFGKTcSCrPok5kyJ4nLKA+GB4" +
			"CW0YGpYuwIjnWCNRQgbOkPAMY56fnVQQkmfx0x8AoItbgQAwHNplkPmNxYVppYocZ6/ZuNAGdsqy" +
			"KqglHJwi1koIIQ4DwIgF7QYM15td2j88EYAYNYPmUIVhTNNTZSoVCxTh8+REyTj0m8/atr3rum5f" +
			"AEgSrQYnrlVKtjRZKcJ7xA9qZy9U/MAG2DsF9xhACLW7HsANQuBLQLNG9w9O6I07+yJMIkPyK4cj" +
			"Wlukpy4vISt8qlaLcqPV/WgcRguuS3WZAcRh+Iky8tyAcErIczYuchJecyiKpSLVG1164Vcv0Qu/" +
			"fokaZz0qV8qIsZGJTVdxcIk2N9beVHX5k4rzTAiZw2QKgapzmqEtG4ZRzACk9KFquaCaJiocRMNe" +
			"s4h0A+lXtOn4tEU7ew+o3e1Tp9Onl195FUXmTIAolApkFix65pkb9J6ra1QplzLzufe8WBMqWJIh" +
			"Ug2f2Umwcw0hsoWruqo8oWnKuWIZBBCSXbLp6KRJ29sH9N+tO+detTs9emN7HxpRaGV1QRx8B8+8" +
			"dvsudQDyPFvGuUizXGcwnF0Q9QKeKwgA8HaGaTf0jAGDC4/Nxlu0vXNAW1vb5+nH6ucPt25ti+KD" +
			"Mkv7+yfUheGtW3fz3wnsFKnT7ot9olyjOsYCGMKqa8AiTXBkBACgkTjeKEIipoVCQRjf2TsUhkYu" +
			"bG6ui8NvARB7uQVWRkVJ3KNMeBvQwlNXVuj27R3aem0HmZCV6AQVFDWJZNYY6EtTJVMb4LRwY5lz" +
			"XYWgDo7qdP/+iTh01CU2Ni7R1StrwggbzQw+BDPiewM6ePLJZVpcmKEpCNNFKV6oTQkA3DdEZqN8" +
			"K5KE7hiTmlGbHmHvdT7gPuisNzpIqfvncdzcWKf19YtUq01yvRVNJwPxkHIGUa7YtLa2RBO4Hj+o" +
			"w2hAG1eWyceVu2UcRdCYhs8xqkTahf0kD4FyC0g/hbaqSAo3mIxWNn5t8xKtrNTQiktUP25y+4Jn" +
			"RVpdXRRgOxBkKmJu082nr8N4ger1M/IcF00pgteRaF4sWH6Oi5vrDVCpaC9GDRQATEP6c6frfpOR" +
			"ovdDjAaUnZG/UJuhCdSIVqMlPGFUpjWgKgx++MY1+uvf/i1Y+MiN9yIFC9RsdqjXcyhAN2TKTTUF" +
			"E3FeV1QxO6Bd9xCSI0mKfAEAETmMgmi33XbWi4UuzaIXXH/fZVH/ubW2mm0aBDgQ7Zcr3ACKDgDG" +
			"RlH57Gc+JgaTADFu1FuodoGgnls1942+j2opZ+WZC1aj0QcDwR3HGzShTSfrBS2nrZULPz88any7" +
			"ZFsK++77HuqDJlJoiCejKA8NehEDQWcj1Rug9svZYILfhzyMhJH4zBqxEkxIUlaAuBpicEXP6ESD" +
			"YPgXPFOHmQzAseN4FwqFF9Gpvlxvnl1OklgawksMoKIwidELnY2vrAuEVfAmUkTKBBjns0IMMKkA" +
			"mpKTaqKcc5vm4nN43MJw4vyn3/PuAgAPJd5oHhhGrnuilszvHBy1fqJpus6CYc+5OGH6FX1eTD5R" +
			"BoK73agwMSuAJ4wK8eajGoeQRWdZFmE2pJP6Wb/neH/yg+CAOPXRzuQcQHzquk7gDv+OdPkB6kDC" +
			"gvP8bLTyoQOOqbAsZck5mgmTOH0kFQUbSTY/MO2Fgg3vYto9OBm2O/3f9vvO62DqKJ+IhupY0xo2" +
			"+/36tFz5TZp4F3b3T7948cKsyB2ml6nkmXDklSTGLzGHPUxbsSgbXjXufJaYCXfvHUfNZvf3rXbn" +
			"X4NBuItdDaafJ5tHhlLunFiVqbK1Ylr2F8yC8fzC3KSKIUVSVCkro2IOzInI/48Y4A7KqcblnJ89" +
			"bfbo8EHdPWt3f9dsd//pecH/8Pi9nH4GEI8DyCVFmMNQVwqFpULJfBqHfbVctFdr85NyqWiKFxJ+" +
			"SsrDwQITwLiLQisxQsLxRhdNQPl2p+/+sdfr34bnd7FjFHtfzHWQzuPvBeMgikVdnzFt45JhWjcN" +
			"U/s8puMlZqOMyQlDhaQr2dzAIQijKO10HX45CfuOd+B5/isYx1/3vMEeYr6P806wOiy8kfG3ezMa" +
			"geBwWFjVQkGbtSx7CdPRRTj7AehgGa+GU2jhZT4CAu1BkN0oie9hXNtzHe90EA6PUfNP8nhzyvXz" +
			"d4F4/B3x7d4NRyBYZloOpIzZr4LnKxBZWVXlEgYYE99VAECfQdWJYz+RJAc5zgrv5svLvR5/U35X" +
			"b8ePs8HLeGxpOcgk94w9DMbWcIzut3xF/z/eYZ2kteOZVQAAAABJRU5ErkJggg==",
		collectIconF = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDoAABSCAABFVgAADqXAAAXb9daH5AAAACnSURBVHjaYvhPIWAYOgZsWtB35PPH96fINmBqZfidaXUpl9ENId6A0sAnNRGGvyZVJ17+/PHdKRQD1kwuOzu1POTB1DLseFKR35OGWNNfeb6a/zPc1X9NqIAb8oHh/////6eVhzzI99P6n+2tgRt7afzP8FD7n+6u9j/dXe1XurvawWQvRXnqGECqF9Ld1Y/NbMnx+f///3tKAvEDfaOR4oQ0eDMTYACH+3HwkQYZCQAAAABJRU5ErkJggg%3D%3D",
		collectIconSrc = "data:image/png;base64," +
				"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAAsTAAALEwEAmpwYAAAB" +
				"HElEQVR4nJWSwY6CMBCGp9ga9AK8gN58BxITOfOiHrl5IOHAG/AI6AESL40REminnT10lxhl1/U7" +
				"dTrzd2b+lBERfAJ/vbLW9n0PAEII3/ffC7quy7IMAHa7XRzH7wVENI4jACDia9b71+APsMeljTF5" +
				"njdNY4wBAMbYer1O0zSKovkOi8XicDhMaSHEfr9/rH7u4Ljf70VR3G63JEm22+3zTERkjLler1JK" +
				"+kFKeT6frbUu7Pu+bVutNRF5AKCUKsuyqqrplTAMN5sNY8yFdV2fTqeu68DZSkSIiIjW2llnjDGI" +
				"6IbnAICISqnL5XI8HmcFWuvpzJ05QRAMwzBbDQCc89Vq5Xnet0tE5Bb6TeBYLpeMsRlb/+bjr/EF" +
				"KZOnkChfTOoAAAAASUVORK5CYII=";
	/**
	 * Get custom style
	 */
	function getStyle() {
		var customStyle = ".tw2gui_window." + prefix + " {" +
			"height: 655px;" +
			"}" +
			".tw2gui_window." + prefix + " div.tw2gui_window_inset {" +
			"background: transparent url(/images/window/premium/premium_buy_bg.jpg) no-repeat;" +
			"}" +
			"#" + prefix + "Map {" +
			"width: " + mapWidth + "px;" +
			"height: " + mapHeight + "px;" +
			"border: 0;" +
			"position: relative;" +
			"background: #847a3c;" +
			"margin: 0 12px;" +
			"}" +
			"#" + prefix + "Filters {" +
			"width: " + mapWidth + "px;" +
			"height: 50px;" +
			"border: 0;" +
			"position: relative;" +
			"margin: 5px 12px;" +
			"}" +
			"#" + prefix + "Filters input, #" + prefix + "Filters label {" +
			"cursor: pointer;" +
			"}" +
			"#" + prefix + "Towns {" +
			"width: " + mapWidth + "px;" +
			"height: 320px;" +
			"border: 0;" +
			"position: relative;" +
			"margin: 0 12px;" +
			"overflow: auto;" +
			"}" +
			"." + prefix + "Square {" +
			"width: 75px;" +
			"height: 33px;" +
			"float:left;" +
			"border: 1px solid #000;" +
			"border-left: 0;" +
			"border-top: 0;" +
			"position: relative;" +
			"}" +
			"." + prefix + "Square.top {" +
			"border-top: 1px solid #000;" +
			"}" +
			"." + prefix + "Square.left {" +
			"border-left: 1px solid #000;" +
			"}" +
			"." + prefix + "Clear {" +
			"clear: both;" +
			"}" +
			"#" + prefix + "Message, ." + prefix + "Message {" +
			"text-align: center;" +
			"font-weight: bold;" +
			"text-style: italic;" +
			"}" +
			"." + prefix + "Town {" +
			"position: absolute;" +
			"z-index: 9;" +
			"top: 0;" +
			"right: 0;" +
			"width: 7px;" +
			"height: 7px;" +
			"line-height: 7px;" +
			"font-size: 5px;" +
			"background: #F00;" +
			"cursor: pointer;" +
			"text-align: center;" +
			"}" +
			"." + prefix + "Town.hover {" +
			"z-index: 10;" +
			"width: 5px;" +
			"height: 5px;" +
			"border: 2px solid #000;" +
			"}" +
			"." + prefix + "LocationRow {" +
			"width: 365px;" +
			"float: left;" +
			"margin: 4px 5px 0 0;" +
			"border-bottom: 2px solid #000;" +
			"}" +
			"." + prefix + "LocationTownRow {" +
			"height: 16px;" +
			"line-height: 16px;" +
			"float: left;" +
			"}" +
			"." + prefix + "LocationName {" +
			"cursor: pointer;" +
			"float: left;" +
			"}" +
			"." + prefix + "LocationCollect {" +
			"cursor: pointer;" +
			"float: left;" +
			"background: transparent url(" + collectIconSrc + ") no-repeat;" +
			"width: 16px;" +
			"height: 16px;" +
			"margin-right: 3px;" +
			"}" +
			"." + prefix + "locationFrboard {" +
			"cursor: pointer;" +
			"float: left;" +
			"background: transparent url(" + collectIconF + ") no-repeat;" +
			"width: 16px;" +
			"height: 16px;" +
			"margin-right: 3px;" +
			"}" +
			"." + prefix + "LocationItemsRow {" +
			"float: left;" +
			"margin: 3px 0 3px 0;" +
			"}" +
			"." + prefix + "TownCenter {" +
			"cursor: pointer;" +
			"margin-right: 3px;" +
			"background: transparent url(images/icons/center.png) no-repeat;" +
			"width: 16px;" +
			"height: 16px;" +
			"float: left;" +
			"}" +
			"." + prefix + "ItemBlock {" +
			"float: left;" +
			"border: 1px solid transparent;" +
			"}" +
			"." + prefix + "ItemBlock." + prefix + "ItemPurchaseProgress {" +
			"border: 1px solid #F00;" +
			"}" +
			/* Filter town with purchased items */
			"#" + prefix + "Map." + prefix + "FilterPurchaseProgress ." + prefix + "Town ," +
			"#" + prefix + "Map." + prefix + "FilterPurchaseFinish ." + prefix + "Town ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseProgress ." + prefix + "LocationRow ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseFinish ." + prefix + "LocationRow {" +
			"display: none;" +
			"}" +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseProgress ." + prefix + "TownPurchaseProgress ." + prefix + "ItemBlock ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseFinish ." + prefix + "TownPurchaseFinish ." + prefix + "ItemBlock {" +
			"display: none;" +
			"}" +
			/* Filter town with purchased items - progress state*/
			"#" + prefix + "Map." + prefix + "FilterPurchaseProgress ." + prefix + "TownPurchaseProgress ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseProgress ." + prefix + "TownPurchaseProgress ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseProgress ." + prefix + "TownPurchaseProgress ." + prefix + "ItemPurchaseProgress {" +
			"display: block;" +
			"}" +
			/* Filter town with purchased items - finish state*/
			"#" + prefix + "Map." + prefix + "FilterPurchaseFinish ." + prefix + "TownPurchaseFinish ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseFinish ." + prefix + "TownPurchaseFinish ," +
			"#" + prefix + "Towns." + prefix + "FilterPurchaseFinish ." + prefix + "TownPurchaseFinish ." + prefix + "ItemPurchaseFinish {" +
			"display: block;" +
			"}" +
			/* end filters */
			"." + prefix + "BagItemSmall .bag_item_count {" +
			"background: transparent url(/images/inventory/bag_small.png) no-repeat;" +
			"position: absolute;" +
			"width: 31px;" +
			"height: 25px;" +
			"left: 3px;" +
			"bottom: 0px;" +
			"color: white;" +
			"font-weight: bold;" +
			"z-index: 2;" +
			"overflow: hidden;" +
			"opacity: 0.7;" +
			"}" +
			"." + prefix + "BagItemSmall .bag_item_count > p {" +
			"text-align: center;" +
			"font-size: 14px;" +
			"line-height: 19px;" +
			"padding: 0 3px 0 0;" +
			"margin: 3px 3px 0 0;" +
			"}" +
			"#" + prefix + "HelpContent {" +
			"margin: 0 12px;" +
			"}" +
			"." + prefix + "Current {" +
			"background: #FF8000;" +
			"}";
		return customStyle;
	}
	/**
	 * Insert custom style
	 */
	function insertStyle() {
		var head = document.getElementsByTagName("head")[0],
			style;
		if (!head) {
			return;
		}
		style = document.createElement("style");
		style.setAttribute("type", "text/css");
		style.textContent = getStyle();
		head.appendChild(style);
	}
	/**
	 * Modify The-west base functions
	 */
	function modifyBaseFunction(Obj, objMethod, objString) {
		//TODO:
		var func  = "",
			modifyIdentifier = objString + "-" + objMethod,
			modifyWasMade = true,
			customChange = false;
		try {
			if (!Obj) {
				return;
			}
			if (modifyIdentifier === "Market-prepareTraderControl") {
				customChange = true;
				func = Obj.prototype[objMethod].toString();
				func = func.replace("n>1&&false", "n > 1");
				Obj.prototype[objMethod] = eval("(" + func + ")");
			} else {
				modifyWasMade = false;
			}
			if (modifyWasMade && !customChange) {
				Obj[objMethod] = eval("(" + func + ")");
			}
		} catch (ex) {
			console.log("modifyBaseFunction error");
		}
	}
	/**
	 * Start loading
	 */
	function startLoading() {
		marketHelperTabContent.toggle(false);
		marketHelperTabLoader.toggle(true);
	}
	/**
	 * End loading
	 */
	function endLoading() {
		marketHelperTabContent.toggle(true);
		marketHelperTabLoader.toggle(false);
	}
	/**
	 * Initialize market parameters
	 */
	function initializeParams() {
//======++++=======
		var initTown = {"name": "текущее местоположение", "x": 0, "y": 0, "extraClass": prefix + "Current", "id": "currentLocation"},	initCoordsX = 0, initCoordsY = 0; //current location
//======++++=======
		lastPageParsed = -1;
		townInfo = [];
		townCoords = [];
		townIndex = 0;
		townCoordsIndex = 0;
		townIdToIndex = {};
		initCoordsX = pos.x;
		initCoordsY = pos.y;
		initTown.x = initCoordsX;
		initTown.y = initCoordsY;
		townInfo[townIndex] = initTown;
		currentLocationXY = initCoordsX + "_" + initCoordsY;
		//townCoords[townIndex] = currentLocationXY;
		townIndex = townIndex + 1;
		lastMarketOfferId = 0;
	}
	function getAjaxUrl(actionName) {
		var finalUrl = gameUrl,
			actionParam = "mode";
		if (isVersionWithNewMarket) {
			actionParam = "action";
		}
		switch (actionName) {
			case "fetch_bids":
				finalUrl = finalUrl + "?window=building_market&" + actionParam +"=fetch_bids"
			break;
		}
		if (isVersionWithNewMarket) {
			finalUrl = finalUrl + "&h=" + h;
		}
		return finalUrl;
	}
	/**
	 * Set heading message
	 */
	function setMessage(msg) {
		msg = msg || "";
		jQuery("#" + prefix + "Message").html(msg);
	}
	/**
	 * Create help tab content
	 */
	function createTabHelpContent() {
		var $helpContent = jQuery("#" + prefix + "HelpContent"),
			helpContentHtml = "";
		if ($helpContent.length === 0) {
			helpContentHtml = '<b>General</b><br/>' +
				'Version: ' + currentVersion + '<br/>' +
				'Website: <a href="' + scriptWebsite + '" target="_blank" title="' + scriptWebsite + ', open in new tab">' + scriptWebsite + '</a><br/>' +
				'<br/>';
			$helpContent = jQuery("<div>")
				.attr({"id": prefix + "HelpContent"})
				.css({"display": "none"})
				.html(helpContentHtml);
			marketHelperTabContent.append($helpContent);
		}
	}
	/**
	 * Market Helper, main window, tab click
	 */
	function marketHelperTabClick(tabObj, tabId) {
		var displayHelpData = false;
		if (tabId === prefix) {
//======++++=======
			setMessage("города, где Вы должны собрать купленные вещи"); //towns from where you need to collect purchased items
//======++++=======
		} else {
			displayHelpData = true;
			setMessage("Help");
		}
		jQuery("#" + prefix + "Map").toggle(!displayHelpData);
		jQuery("#" + prefix + "Filters").toggle(!displayHelpData);
		jQuery("#" + prefix + "Towns").toggle(!displayHelpData);
		jQuery("#" + prefix + "HelpContent").toggle(displayHelpData);
		marketHelperTab.activateTab(tabId);
	}
	/**
	 * Build popup window
	 */
	function buildWindow() {
		var html = '<h2 id="' + prefix + 'Message">Loading</h2><br/>',
//======++++=======
			tabName = "Покупки на рынке", $marketHelperTab = null; //Market purchase
//======++++=======
		marketHelperTab = wman.open(prefix).setMiniTitle(tabName).setSize(840, 655)
			.addTab(tabName, prefix, marketHelperTabClick)
//======++++=======
			.addTab("Помощь", prefix + "Help", marketHelperTabClick); //Help
//======++++=======
		$marketHelperTab = jQuery(marketHelperTab.divMain);
		marketHelperTabContent = $marketHelperTab.find(".tw2gui_window_content_pane");
		marketHelperTabLoader = $marketHelperTab.find(".tw2gui_window_pane div.loader");
		marketHelperTabContent.append(html);
		startLoading();
	}
	/**
	 * Functions to be executed at reload for market helper tab
	 */
	function marketHelperTabReopenEvent() {
		if (!marketHelperTabReopenEventInProgress) {
			marketHelperTabReopenEventInProgress = true;
			initializeParams();
			buildWindow();
			getPurchase();
		}
	}
	/**
	 * Attach event for reopen market helper window
	 */
	function marketHelperTabReopen() {
		//console.log("marketHelperTabReopen");
		var tabIdReg = "^" + prefix + "$";
		wman.registerReopenHandler(tabIdReg, function () {
			marketHelperTabReopenEvent();
	    });
	}
	/**
	 * Get town info
	 */
	function getTownInfo() {
		return townInfo;
	}
	/**
	 * Get market helper tab
	 */
	function getMarketHelperTab() {
		return marketHelperTab;
	}
	/**
	 * Get HTML for clear element
	 */
	function getClearHtml() {
		var clearHtml = '<div class="' + prefix + 'Clear"></div>';
		return clearHtml;
	}
	/**
	 * Test if player is at specified location
	 */
	function isPlayerAtLocation(locationX, locationY) {
		var currentX = parseInt(pos.x, 10),
			currentY = parseInt(pos.y, 10),
			isAtLocation = false;
		if (currentX === locationX && currentY === locationY) {
			isAtLocation = true;
		}
		return isAtLocation;
	}
	/**
	 * Callback function executed after all purchased items ware collected
	 */
	function afterCollectAllPurchasedItems($townPurchasedItemsTabClose) {
		$townPurchasedItemsTabClose.trigger("click");
		//reload market purchase
		marketHelperTabReopenEvent();
	}
	/**
	 * Function executed after collect all was clicked for purchased items
	 */
	function collectAllPurchasedItems(locationId, townPurchasedItemsTab) {
		var $townPurchasedItemsTab = null,
			$townPurchasedItemsTabClose = null,
			$townPurchasedItemsTabLoad = null;
		if (townPurchasedItemsTab) {
			if (locationId > 0) {
				$townPurchasedItemsTab = jQuery(townPurchasedItemsTab.divMain);
				//close window
				$townPurchasedItemsTabClose = $townPurchasedItemsTab.find(".tw2gui_window_buttons_close");
				$townPurchasedItemsTab.find(".tw2gui_window_pane div.loader").toggle(true);
				Ajax.remoteCall('building_market', 'fetch_all', {
					townId: locationId
				}, function (data) {
					var hasError = false;
					if (data) {
						if (data.error && data.error === true) {
							hasError = true;
						}
					}
					if (hasError) {
						alert(data.msg);
					}
					afterCollectAllPurchasedItems($townPurchasedItemsTabClose);
				});
			}
		}
	}
	/**
	 * Paint town purchased items
	 */
	function paintTownPurchasedItems(location, $container, bigSizeItems, displayHeadingInfo, townPurchasedItemsTab) {
		var contentHtml = "",
			locationName = location.name,
			locationId = parseInt(location.id, 10),
			locationX = location.x,
			locationY = location.y,
			locationItems = {},
			locationItem = {},
			itemId = 0,
			$itemBlock = null,
			itemBlockHtml = "",
			itemBlockCssClass = "",
			$itemCollect = null,
			itemCollectHtml = "",
			marketOfferIdsForItem = [],
			marketOfferIdsForItemLength = 0,
			marketOfferIds = [],
			marketOfferIdsLength = 0,
			playerAtLocation = false,
			divClear = getClearHtml(),
			i = 0,
			locationItemCount = 0,
			locationItemCountInAuction = 0,
			locationItemCountToCollect = 0,
			locationItemTitle = '',
			itemCountHtml = '',
			$townPurchasedItemsTab = null,
			$townPurchasedItemsTabClose = null,
			hasItemPurchaseFinish = false,
			hasItemPurchaseProgress = false,
			hasTownPurchaseFinish = false,
			hasTownPurchaseProgress = false,
			townPurchaseFlags = {};
		bigSizeItems = bigSizeItems || false;
		displayHeadingInfo = displayHeadingInfo || false;
		if (location.items) {
			locationItems = location.items;
			playerAtLocation = isPlayerAtLocation(locationX, locationY);
			if (displayHeadingInfo) {
				//set HTML for heading
				if (playerAtLocation) {
					//purchase all
//Collect all
					itemCollectHtml = '<a class="button_wrap button" href="javascript:void(0);">' +
						'<span class="button_left"></span>' +
						'<span class="button_middle">Забрать всё</span>' +
						'<span class="button_right"></span>' +
						'<span style="clear: both;"></a></span>';
				} else {
//======++++=======
					itemCollectHtml = "Чтобы собрать все вещи, Вы должны быть в " + locationName + " городе"; //To collect all items you need to be in : town
//======++++=======
				}
				$itemCollect = jQuery("<div>")
					.html(itemCollectHtml);
				$container.append(divClear).append($itemCollect).append(divClear);
			}
			//parse all items for location
			for (itemId in locationItems) {
				itemId = parseInt(itemId, 10);
				if (!isNaN(itemId) && itemId > 0) {
					hasItemPurchaseFinish = false;
					hasItemPurchaseProgress = false;
					locationItem = locationItems[itemId];
					locationItemCount = locationItem.count;
					locationItemCountInAuction = locationItem.countItemInAuction;
					locationItemCountToCollect = locationItemCount - locationItemCountInAuction;
					if (locationItemCountToCollect > 0) {
						hasItemPurchaseFinish = true;
					}
					if (locationItemCountInAuction > 0) {
						hasItemPurchaseProgress = true;
					}
					locationItemTitle = locationItem.name;
//======++++=======
//You can collect
//are still in auction
					locationItemTitle = locationItemTitle + '<br/> Вы можете забрать ' + locationItemCountToCollect + ', ' +
						locationItemCountInAuction + ' находятся еще на аукционе';
//======++++=======
					itemCountHtml = '<div class="bag_item_count" style="cursor: default; "><p>' + locationItemCount + '</p></div>';
					if (bigSizeItems) {
						itemBlockHtml = '<span class="bag_item"><div class="bag_item yield auctionable">' +
							'<img src="' + locationItem.image + '" alt="' + locationItem.name + '" title="' + locationItemTitle + '" style="max-height: 73px;" />' +
							itemCountHtml +
							'</div></span>';
					} else {
						itemBlockHtml = '<div class="popup_yield_image ' + prefix + 'BagItemSmall">' +
							'<img src="' + locationItem.image_micro + '" alt="' + locationItem.name + '" title="' + locationItemTitle + '" style="max-height: 43px;" />' +
							itemCountHtml +
							'</div>';
					}
					itemBlockHtml = itemBlockHtml + divClear;
					if (playerAtLocation) {
						marketOfferIdsForItem = locationItem.marketOfferIds;
						marketOfferIdsForItemLength = marketOfferIdsForItem.length;
						if (marketOfferIdsForItemLength > 0) {
							for (i = 0; i < marketOfferIdsForItemLength; i = i + 1) {
								marketOfferIds.push(marketOfferIdsForItem[i]);
							}
						}
					}
					itemBlockCssClass = prefix + "ItemBlock";
					//add under auction specific class 
					if (hasItemPurchaseProgress) {
						itemBlockCssClass = itemBlockCssClass + " " + prefix + "ItemPurchaseProgress";
					}
					if (hasItemPurchaseFinish) {
						itemBlockCssClass = itemBlockCssClass + " " + prefix + "ItemPurchaseFinish";
					}
					$itemBlock = jQuery("<div>")
						.attr({"class": itemBlockCssClass})
						.html(itemBlockHtml);
					$container.append($itemBlock);
				}
				if (!hasTownPurchaseProgress && hasItemPurchaseProgress) {
					hasTownPurchaseProgress = true;
				}
				if (!hasTownPurchaseFinish && hasItemPurchaseFinish) {
					hasTownPurchaseFinish = true;
				}
			}
			if (playerAtLocation && displayHeadingInfo) {
				marketOfferIdsLength = marketOfferIds.length;
				if (marketOfferIdsLength > 0) {
					$itemCollect.click(function () {
						collectAllPurchasedItems(locationId, townPurchasedItemsTab);
					});
				}
			}
		}
		townPurchaseFlags = {
			hasTownPurchaseProgress: hasTownPurchaseProgress,
			hasTownPurchaseFinish: hasTownPurchaseFinish
		};
		return townPurchaseFlags;
	}
	/**
	 * Town purchase items window
	 */
	function townPurchasedItemsWindow(location) {
		var townPurchasedItemsTab = null,
			$townPurchasedItemsTab = null,
			townPurchasedItemsTabContent,
			locationName = location.name,
			locationId = parseInt(location.id, 10),
			tabIdentifier = "",
			$tabHeader = null,
			$tabHtml = null;
		tabIdentifier = prefix + locationId + "Items";
		townPurchasedItemsTab = wman.open(tabIdentifier + " nominimize noreload").setMiniTitle(locationName)
			.addTab(locationName, tabIdentifier, function () {});
		$townPurchasedItemsTab = jQuery(townPurchasedItemsTab.divMain);
		townPurchasedItemsTabContent = $townPurchasedItemsTab.find(".tw2gui_window_content_pane");
//======++++=======
		$tabHeader = jQuery("<h2>").attr({"class": prefix + "Message"}).html("Вещи, куплены в " + locationName); //Items to be purchased from
//======++++=======
		$tabHtml = jQuery("<div>").css({"margin": "5px", "overflow": "auto", "height": "355px"});
		paintTownPurchasedItems(location, $tabHtml, true, true, townPurchasedItemsTab);
		townPurchasedItemsTabContent.append($tabHeader).append($tabHtml);
	}
	/**
	 * Paint location
	 */
	function paintTown(location) {
		var x,
			y,
			$townEl,
			townStyle = "",
			setClass = "",
			locationX = 0,
			locationY = 0,
			locationId = "",
			locationName = "",
			$locationRow = null,
			$locationTownRow = null,
			$locationTown = null,
			$locationFrboard = null,
			$locationTownCenter = null,
			$locationCollect = null,
			baseId = prefix + "Location",
			baseLocationId = "",
			$locationItems = null,
			townPurchaseFlags = {};
		locationX = location.x;
		locationY = location.y;
		locationId = parseInt(location.id, 10);
		if (isNaN(locationId) || locationId < 0) {
			locationId = 0;
		}
		locationName = location.name;
		baseLocationId = baseId + locationId;
		x = Math.round(locationX / 1000 * parseInt(mapWidth, 10) - 3);
		y = Math.round(locationY / 1000 * parseInt(mapHeight, 10) - 3);
		townStyle = "top: " + y + "px;right: " + x + "px;";
		setClass = prefix + "Town";
		if (location.extraClass) {
			setClass = setClass + " " + location.extraClass;
		}
		$townEl = jQuery("<div>")
			.attr({"id": baseLocationId + "OnMap", "class": setClass, "style": townStyle, "title": "В центр карты: " + locationName})
			.click(function () {
				WMap.scroll_map_to_pos(locationX, locationY); //Center map on
			});
		$mapEl.append($townEl);
		//append town to towns list
		$locationRow = jQuery("<div>")
			.attr({"id": baseLocationId + "Row", "class": baseId + "Row"});
		$locationItems = jQuery("<div>")
			.attr({"id": baseLocationId + "ItemsRow", "class": baseId + "ItemsRow"});
		$locationTownRow = jQuery("<div>")
			.attr({"id": baseLocationId + "TownRow", "class": baseId + "TownRow"});
		$locationTownCenter = jQuery("<div>")
			.attr({"class": prefix + "TownCenter", "title": "В центр карты: " + locationName})
			.click(function () {
				WMap.scroll_map_to_pos(locationX, locationY); //Center map on
			});
		$locationTown = jQuery("<div>")
			.attr({"id": baseLocationId, "class": baseId + "Name"})
			.html(locationName)
			.hover(
				function () {
					jQuery("#" + baseLocationId + "OnMap").addClass("hover");
				},
				function () {
					jQuery("#" + baseLocationId + "OnMap").removeClass("hover");
				}
			);
//==================+++
		$locationFrboard = jQuery("<div>")
			.attr({"class": prefix + "locationFrboard"})
			.hover(
				function () {
					jQuery("#" + baseLocationId + "OnMap").addClass("hover");
				},
				function () {
					jQuery("#" + baseLocationId + "OnMap").removeClass("hover");
				}
			);
//==================+++
		$locationCollect = jQuery("<div>")
			.attr({"class": baseId + "Collect", "title": "Щелкните, чтобы видеть вещи, которые могут быть собраны из " + locationName})
			.click(function () {
				townPurchasedItemsWindow(location); //Click to see items that can be collected from
			});
		if (location.itemsCount && location.itemsCount > 0) {
			$locationTown
				.attr({"title": "Открыть город " + locationName})
				.click(function () {
					var townLocation = null; //Open town
					if (locationId > 0) {
						townLocation = {"town_id": locationId};
					}
					AjaxWindow.show("town", townLocation, locationX + "_" + locationY);
				});
//==================+++
			$locationFrboard
				.attr({"title": "Указатель к " + locationName})
				.click(function () {
					var FrboardLocation = null; //Open town
					if (locationId > 0) {
						FrboardLocation = {"town_id": locationId};
					}
					AjaxWindow.show("fingerboard", FrboardLocation, locationX + "_" + locationY);
				});
//==================+++
			townPurchaseFlags = paintTownPurchasedItems(location, $locationItems, false, false, null);
			if (townPurchaseFlags.hasTownPurchaseProgress) {
				$townEl.addClass(prefix + "TownPurchaseProgress");
				$locationRow.addClass(prefix + "TownPurchaseProgress");
			}
			if (townPurchaseFlags.hasTownPurchaseFinish) {
				$townEl.addClass(prefix + "TownPurchaseFinish");
				$locationRow.addClass(prefix + "TownPurchaseFinish");
			}
		} else {
			//no items to collect from here
			$locationCollect.css({"display": "none"});
		}
		$locationTownRow.append($locationFrboard).append($locationTownCenter).append($locationCollect).append($locationTown);
		$locationRow.append($locationTownRow).append(getClearHtml()).append($locationItems);
		$townsEl.append($locationRow);
	}
	/**
	 * Create HTML block
	 */
	function createHtmlBlock(blockId, emptyBlock) {
		var $block = jQuery("#" + prefix + blockId);
		emptyBlock = emptyBlock || true;
		if ($block.length === 0) {
			$block = jQuery("<div>")
				.attr({"id": prefix + blockId});
		}
		if (emptyBlock) {
			$block.html("");
		}
		return $block;
	}
	/**
	 * Populate filters block
	 */
	function populateFiltersBlock($filters) {
		var filtersHtml = '',
			divClear = getClearHtml(),
			$purchasedItemsAll = null,
			purchasedItemsAllLabel = '',
			$purchasedItemsFinish = null,
			purchasedItemsFinishLabel = '',
			$purchasedItemsProgress = null,
			purchasedItemsProgressLabel = '';
		$filters.html("");
//======++++=======
		filtersHtml = "Купленные вещи: "; //Purchased items:
//======++++=======
		//all
		$purchasedItemsAll = jQuery("<input>")
			.attr({"type": "radio", "name": prefix + "PurchasedItemsFilter", "id": prefix + "PurchasedItemsFilterAll", "checked": "checked"})
			.click(function () {
				$mapEl.removeClass();
				$townsEl.removeClass();
			});
		purchasedItemsAllLabel = '<label for="' + prefix + 'PurchasedItemsFilterAll" ' +
//======++++=======
			'title="Покажите все города и вещи">Все</label>'; //Show all towns and items >< All
//======++++=======
		//finish
		$purchasedItemsFinish = jQuery("<input>")
			.attr({"type": "radio", "name": prefix + "PurchasedItemsFilter", "id": prefix + "PurchasedItemsFilterFinish"})
			.click(function () {
				$mapEl.removeClass().addClass(prefix + "FilterPurchaseFinish");
				$townsEl.removeClass().addClass(prefix + "FilterPurchaseFinish");
			});
		purchasedItemsFinishLabel = '<label for="' + prefix + 'PurchasedItemsFilterFinish" ' +
//======++++=======
			'title="Покажите только города и вещи, что Вы можете забрать сейчас">Закончено</label>'; //Show only towns and items that you can collect now >< Finished
//======++++=======
		//progress
		$purchasedItemsProgress = jQuery("<input>")
			.attr({"type": "radio", "name": prefix + "PurchasedItemsFilter", "id": prefix + "PurchasedItemsFilterProgress"})
			.click(function () {
				$mapEl.removeClass().addClass(prefix + "FilterPurchaseProgress");
				$townsEl.removeClass().addClass(prefix + "FilterPurchaseProgress");
			});
		purchasedItemsProgressLabel = '<label for="' + prefix + 'PurchasedItemsFilterProgress" ' +
//======++++=======
			'title="Покажите только города и вещи, где Вы сделали ставки и аукцион не закончен">Не закончено</label>'; //Show only towns and items from where you have placed bids and auction didn\'t finished >< Progress
//======++++=======
		$filters.append(divClear).append(filtersHtml)
			.append($purchasedItemsAll).append(purchasedItemsAllLabel)
			.append($purchasedItemsFinish).append(purchasedItemsFinishLabel)
			.append($purchasedItemsProgress).append(purchasedItemsProgressLabel)
			.append(divClear);
		return $filters;
	}
	/**
	 * Plot market purchase data
	 */
	function plotData() {
		var i = 0,
			j = 0,
			otherClass = [],
			$map,
			$filters = null,
			$towns,
			$square,
			clearHtml = getClearHtml();
//======++++=======
		setMessage("города, где Вы должны собрать купленные вещи"); //towns from where you need to collect purchased items
//======++++=======
		$map = createHtmlBlock("Map");
		$filters = createHtmlBlock("Filters", false);
		$filters = populateFiltersBlock($filters);
		$towns = createHtmlBlock("Towns");
		for (j = 1; j < 5; j = j + 1) {
			for (i = 1; i < 11; i = i + 1) {
				otherClass = [];
				if (i === 1) {
					otherClass.push("left");
				}
				if (j === 1) {
					otherClass.push("top");
				}
				otherClass.push(prefix + "Square");
				otherClass = otherClass.join(" ");
				$square = jQuery("<div>").attr({"id": prefix + "Square" + i + "_" + j, "class": otherClass});
				$map.append($square);
			}
			$map.append(clearHtml);
		}
		marketHelperTabContent.append($map).append($filters).append($towns);
		$mapEl = jQuery("#" + prefix + "Map");
		$filtersEl = jQuery("#" + prefix + "Filters");
		$townsEl = jQuery("#" + prefix + "Towns");
		for (i = 0; i < townIndex; i = i + 1) {
			paintTown(townInfo[i]);
			if (i % 2 === 1) {
				$townsEl.append(clearHtml);
			}
		}
		createTabHelpContent();
		endLoading();
		marketHelperTabReopenEventInProgress = false;
	}
	/**
	 * Set townIndex for townId
	 */
	function setTownIndexForId(townId, townIndex) {
		townIdToIndex[townId] = townIndex;
	}
	/**
	 * Get townIndex based on townId
	 */
	function getTownIndexForId(townId) {
		return townIdToIndex[townId];
	}
	/**
	 * Check if auction for item is in progress
	 */
	function isAuctionInProgress(itemData) {
		var auctionInProgress = false,
			auctionEndIn = 0,
			currentBid = 0,
			maxPrice = 0;
		auctionEndIn = parseInt(itemData.auction_ends_in, 10);
		if (auctionEndIn > 0) {
			maxPrice = parseInt(itemData.max_price, 10);
			if (isNaN(maxPrice)) {
				auctionInProgress = true;
			} else {
				currentBid = parseInt(itemData.current_bid, 10);
				if (currentBid < maxPrice) {
					auctionInProgress = true;
				}
			}
		}
		return auctionInProgress;
	}
	/**
	 * Test if market offer wasn't added to town purchased items
	 */
	function testUniqueMarketOfferId(usedTownIndex, thisItemId, thisMarketOfferId) {
		var isUnique = true,
			thisMarketOfferIds = [];
		if (townInfo[usedTownIndex]) {
			if (townInfo[usedTownIndex].items[thisItemId]) {
				if (townInfo[usedTownIndex].items[thisItemId].marketOfferIds) {
					thisMarketOfferIds = townInfo[usedTownIndex].items[thisItemId].marketOfferIds;
					if (thisMarketOfferIds.indexOf(thisMarketOfferId) > -1) {
						isUnique = false;
					}
				}
			}
		}
		return isUnique;
	}
	/**
	 * Add purchased item to town
	 */
	function addPurchaseItemToTown(purchaseData, itemsData) {
		var itemCount = 1,
			usedTownIndex = 0,
			marketTownId = 0,
			itemData = {},
			thisItemId = 0,
			townItems = {},
			townItemsCount = 0,
			oldItemCount = 0,
			townData = {},
			oldItemInAuction = 0,
			addCountItemInAuction = 0,
			isItemInAuction = false,
			thisMarketOfferId = 0,
			marketOfferIdUnique = false;
		marketTownId = purchaseData.market_town_id;
		usedTownIndex = getTownIndexForId(marketTownId);
		if (townInfo[usedTownIndex]) {
			townData = townInfo[usedTownIndex];
			townItems = townData.items;
			thisItemId = purchaseData.item_id;
			thisMarketOfferId = purchaseData.market_offer_id;
			marketOfferIdUnique = testUniqueMarketOfferId(usedTownIndex, thisItemId, thisMarketOfferId);
			itemCount = parseInt(purchaseData.item_count, 10);
			if (thisMarketOfferId) {
				if (townItems[thisItemId]) {
					itemData = townItems[thisItemId];
					oldItemCount = itemData.count;
					oldItemInAuction = itemData.countItemInAuction;
					itemCount = oldItemCount + itemCount;
				} else {
					if (isVersionWithNewMarket) {
						itemData = Object.create(ItemManager.get(thisItemId));
					} else {
						if (itemsData[thisItemId]) {
							itemData = Object.create(itemsData[thisItemId]);
						} else {
							return;
						}
					}
					itemData.marketOfferIds = [];
				}
				isItemInAuction = isAuctionInProgress(purchaseData);
				if (isItemInAuction) {
					addCountItemInAuction = 1;
				}
				itemData.countItemInAuction = oldItemInAuction + addCountItemInAuction;
				itemData.count = itemCount;
				itemData.marketOfferIds.push(thisMarketOfferId);
				townItemsCount = townData.itemsCount + itemCount - oldItemCount;
				townInfo[usedTownIndex].items[thisItemId] = itemData;
				townInfo[usedTownIndex].itemsCount = townItemsCount;
			}
		}
	}
	/**
	 * Filter response from AJAX
	 */
	function filterMarketPurchaseResponse(data, itemsData) {
		var dataLength = data.length,
			i = 0,
			marketTownId = "",
			marketTownName = "",
			marketTownX = "",
			marketTownY = "",
			marketTownCoords = "",
			purchaseData = {},
			isCurrentLocation = false,
			useTownIndex = 0,
			startParseFrom = 0,
			firstMarketOfferId = 0;
		if (dataLength === marketItemsPerPage) {
			if (lastMarketOfferId !== 0) {
				firstMarketOfferId = data[0].market_offer_id;
				if (firstMarketOfferId === lastMarketOfferId) {
					startParseFrom = 1;
				}
			}
			lastMarketOfferId = firstMarketOfferId = data[10].market_offer_id;
		}
		for (i = startParseFrom; i < dataLength; i = i + 1) {
			purchaseData = data[i];
			marketTownId = purchaseData.market_town_id;
			marketTownName = purchaseData.market_town_name;
			marketTownX = purchaseData.market_town_x;
			marketTownY = purchaseData.market_town_y;
			marketTownCoords = marketTownX + "_" + marketTownY;
			isCurrentLocation = false;
			useTownIndex = townIndex;
			if (currentLocationXY === marketTownCoords) {
				isCurrentLocation = true;
				useTownIndex = 0;
			}
			if (townCoords.indexOf(marketTownCoords) === -1) {
				//town isn't added in the list of towns
				if (marketTownName === null) {
					marketTownName = "ghost town";
				}
				if (isCurrentLocation) {
					townInfo[useTownIndex].name = townInfo[0].name + " (" + marketTownName + ")";
				} else {
					townInfo[useTownIndex] = {"name": marketTownName, "x": marketTownX, "y": marketTownY};
				}
				townInfo[useTownIndex].id = marketTownId;
				townInfo[useTownIndex].items = {};
				townInfo[useTownIndex].itemsCount = 0;
				townCoords[townCoordsIndex] = marketTownCoords;
				setTownIndexForId(marketTownId, useTownIndex);
				if (!isCurrentLocation) {
					townIndex = townIndex + 1;
				}
				townCoordsIndex = townCoordsIndex + 1;
			}
			//add purchase item to town info
			addPurchaseItemToTown(purchaseData, itemsData);
		}
	}
	/**
	 * Parse market purchase response
	 */
	function parseResponse(data, isPurchase) {
		var itemsData = {},
			itemsAtPage = 0,
			endOfMarketRequests = true;
		isPurchase = isPurchase || true;
		if (data) {
			if (data.msg) {
				if (data.msg.item_info) {
					itemsData = data.msg.item_info;
				}
				if (data.msg.search_result) {
					itemsAtPage = data.msg.search_result.length;
					if (itemsAtPage > 0) {
						if (isPurchase) {
							//parse market purchase
							filterMarketPurchaseResponse(data.msg.search_result, itemsData);
							if (!isVersionWithNewMarket && itemsAtPage === marketItemsPerPage) {
								endOfMarketRequests = false;
								getPurchase();
							}
						} else {
							//parse market sell
						}
					}
				} else {
					console.log(" cannot get data.msg.search_result");
				}
			} else {
				console.log(" cannot get data.msg");
			}
		} else {
			console.log(" cannot get data");
		}
		if (endOfMarketRequests) {
			if (isPurchase) {
				//end of market purchase
				plotData();
			} else {
				//end of market sell
			}
		}
	}
	/**
	 * Get purchase data
	 */
	function getPurchase() {
		lastPageParsed = lastPageParsed + 1;
		jQuery.ajax({
			url: getAjaxUrl("fetch_bids"),
			type: "POST",
			data: {page: lastPageParsed},
			dataType: "json",
			success: function (data) {
				//console.log(data);
				parseResponse(data, true);
			}
		});
	}
	/**
	 * Calculate
	 */
	function calculate() {
		if (marketHelperTabReopenEventInProgress) {
			alert("Market Helper is loading, please wait");
		} else {
			marketHelperTabReopenEventInProgress = true; 
			initializeParams();
			buildWindow();
			marketHelperTabReopen();
			if (!debug) {
				getPurchase();
			}
		}
	}
	/**
	 * Add market helper icon/button
	 */
//======++++=======
//	function addButton() {
//		var $scriptButton = jQuery("#" + prefix + "Button");
//		if ($scriptButton.length === 0) {
//			$scriptButton = jQuery("<img>")
//				.attr({"src": scriptIconSrc, "id": prefix + "Button", "alt": scriptName,
//					"title": scriptName, "style": "position:absolute;left:310px;top:10px;cursor:pointer;"});
//			jQuery('#footer_minimap_icon').parent().after($scriptButton);
//		}
//		$scriptButton.unbind().click(function () {
//			dyMarketHelper.calculate();
//		});
//	}
//======++++=======
	/**
	 * Register script with the-west
	 */
	function registerScript() {
		var minVersion = "1.35",
			maxVersion = "1.35";
		if (TheWestApi) {
			TheWestApi.register(prefix, scriptName, minVersion, maxVersion, scriptAuthor, scriptWebsite);
		}
	}
	/**
	 * Callback function to prompt user for update
	 */
	function updateCallback(currentVersion, latestVersion) {
		var autoUpdateTab = null,
			autoUpdateTabContent,
			updatePrefix = prefix + "Updater",
			$updateHtml = null,
			$updateHeader = null,
			contentHtml = "";
		autoUpdateTab = wman.open(updatePrefix + " nominimize noreload").setMiniTitle("Market Helper update")
			.addTab("MH updater", updatePrefix, function () {});
		autoUpdateTabContent = jQuery(autoUpdateTab.divMain).find(".tw2gui_window_content_pane");
		$updateHeader = jQuery("<h2>").attr({"class": prefix + "Message"}).html("Market helper - new version available");
		contentHtml = 'You are using version: ' + currentVersion + '<br/>' +
			'Latest version is: ' + latestVersion + '<br/>' +
			'Please visit <a href="' + scriptWebsite + '" target="_blank">' + scriptWebsite + '</a> ' +
			'and update to the latest version.<br/>' +
			'After update refresh this page, or click on the link: ' +
			'<a href="' + gameUrl + '">' + gameUrl + '</a>';
		$updateHtml = jQuery("<div>").css({"margin": "5px"}).html(contentHtml);
		autoUpdateTabContent.append($updateHeader).append($updateHtml);
	}
	/**
	 * Check if game version is 1.34
	 */
	function checkVersionWithNewMarket() {
		if (TheWestApi && TheWestApi.version) {
//			if (TheWestApi.version === "1.34" || TheWestApi.version === "1.35") {
//				isVersionWithNewMarket = true;
//			} else {
//				isVersionWithNewMarket = false;
//			}
			insertStyle();
			addButton();
		} else {
			window.setTimeout(function () { checkVersionWithNewMarket(); }, 100);
		}
	}
	/**
	 * Initialize script
	 */
	function init(waitCounter) {
		waitCounter = waitCounter || 0;
		if (waitCounter < 10) {
			waitCounter = waitCounter + 1;
			if (typeof jQuery === "undefined") {
				window.setTimeout(function () { init(waitCounter); }, 100);
			} else {
				checkVersionWithNewMarket();
				//comment register script, TheWestApi not working properly
				//registerScript();
			}
		}
	}
	//public
	return {
		calculate: calculate,
		init: init,
		updateCallback: updateCallback,
		getTownInfo: getTownInfo,
		getMarketHelperTab: getMarketHelperTab,
		modifyBaseFunction: modifyBaseFunction,
		newMarketVersion: function () {return isVersionWithNewMarket;}
	};
};

/**
 * Greasemonkey base support
 * @copyright      2009, 2010 James Campos
 * @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
 */
/*global localStorage, GM_addStyle, GM_deleteValue, GM_getValue, GM_log, GM_setValue, console */
if (typeof GM_deleteValue === "undefined") {
	GM_addStyle = function (css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	};
	GM_deleteValue = function (name) {
		localStorage.removeItem(name);
	};
	GM_getValue = function (name, defaultValue) {
		var value = localStorage.getItem(name),
			type = "";
		if (!value) {
			return defaultValue;
		}
		type = value[0];
		value = value.substring(1);
		switch (type) {
		case 'b':
			return value == "true";
		case 'n':
			return Number(value);
		default:
			return value;
		}
	};
	GM_log = function (message) {
		console.log(message);
	};
	GM_setValue = function (name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	};
}

/**
 * Auto update
 */
var dyAutoUpdate = (function () {
	"use strict";
	/*global ActiveXObject, XMLHttpRequest, dyMarketHelperGeneral, GM_xmlhttpRequest, GM_addStyle, GM_deleteValue, GM_getValue, GM_setValue, GM_log, navigator*/
	var updateAvailable = false,
		currentVersion = dyMarketHelperGeneral.getVersion(),
		prefix = "",
		latestVersion = "0",
		alwaysCheck = false,
		checkAfterDays = 1;
	function getUpdateAvailable() {
		return updateAvailable;
	}
	function getCurrentVersion() {
		return currentVersion;
	}
	function getLatestVersion() {
		return latestVersion;
	}
	function runUpdateScript() {
		var dyMarketHelperUpdateJsString = "dyMarketHelperUpdate_js",
			dyMarketHelperUpdateJs = null,
			dyMarketHelperUpdateString = "if (dyMarketHelper) { dyMarketHelper.updateCallback('" + currentVersion + "', '" + latestVersion + "'); }";
		dyMarketHelperUpdateJs = document.getElementById(dyMarketHelperUpdateJsString);
		if (!dyMarketHelperUpdateJs) {
			dyMarketHelperUpdateJs = document.createElement("SCRIPT");
			dyMarketHelperUpdateJs.setAttribute("id", dyMarketHelperUpdateJsString);
			dyMarketHelperUpdateJs.innerHTML = dyMarketHelperUpdateString;
			document.getElementsByTagName("body")[0].appendChild(dyMarketHelperUpdateJs);
		} else {
			dyMarketHelperUpdateJs.innerHTML = dyMarketHelperUpdateString;
		}
	}
	/**
	 * Transform version string to number
	 */
	function versionToNumber(versionString) {
		var versionNumber = 0;
		versionNumber = versionString.replace(/\./g, "");
		versionNumber = parseInt(versionNumber, 10);
		if (isNaN(versionNumber) || versionNumber < 0) {
			versionNumber = 0;
		}
		return versionNumber;
	}
	/**
	 * Check for update
	 */
	function parseUrlResponse(data) {
		var currentVersionNumber = 0,
			latestVersionNumber = 0,
			versionReg = /Version:<\/b>\s*([0-9\.]+)/;
		currentVersionNumber = versionToNumber(currentVersion);
		latestVersion = data.match(versionReg)[1];
		latestVersionNumber = versionToNumber(latestVersion);
		if (latestVersionNumber > 0 && currentVersionNumber < latestVersionNumber) {
			updateAvailable = true;
			runUpdateScript();
		}
	}
	function errorAtXhr() {
		//loadScript();
	}
	/**
	 * Greasemonkey AJAX
	 */
	function doGreasemonkeyAjax(reqMethod, reqUrl, reqData, successFn, errorFn) {
		GM_xmlhttpRequest({
			method: reqMethod,
			url: reqUrl,
			headers: {
				"User-Agent": navigator.userAgent,
				"Referer": document.location
			},
			onload: function (responseDetails) {
				if (successFn) {
					successFn(responseDetails.responseText);
				}
			}
		});
	}
	/**
	 * XHR
	 */
	function doAjax(reqMethod, reqUrl, reqData, successFn, errorFn) {
		var xhr = null,
			aSync = true,
			noCache = true,
			concatString = "?";
		try {
			xhr = new XMLHttpRequest(); //FireFox, Safari, Chrome, Opera ...
		} catch (e) {
			//console.log(e.message);
			try {
				xhr = new ActiveXObject('Msxml2.XMLHTTP'); //IE
			} catch (e2) {
				//console.log(e2.message);
				try {
					xhr = new ActiveXObject('Microsoft.XMLHTTP'); //IE
				} catch (e3) {
					//console.log(e3.message);
					//XMLHttpRequest not supported
				}
			}
		}
		if (xhr) {
			xhr.onreadystatechange  = function () {
				if (xhr.readyState  === 4) {
					if (xhr.status  === 200) {
						//XHR request is ok
						//xhr.responseText;
						if (successFn) {
							successFn(xhr.responseText);
						}
					} else {
						//ERROR
						if (errorFn) {
							errorFn(xhr.status);
						}
					}
				}
			};
			try {
				if (noCache === true) {
					reqUrl = reqUrl + "?" + (new Date()).getTime();
					concatString = "&";
				}
				if (reqMethod.toUpperCase() === "GET") {
					reqUrl = reqUrl + concatString + reqData;
					reqData = null;
				}
				xhr.open(reqMethod, reqUrl, aSync);
				try {
					xhr.send(reqData);
				} catch (eS) {
					//we have error when sending request
					console.log(eS.message);
				}
			} catch (eL) {
				//we have error when loading request
				console.log(eL.message);
			}
		} else {
			//cannot execute request
		}
	}
	/**
	 * XHR request
	 */
	function doRequest(reqMethod, reqUrl, reqData, successFn, errorFn) {
		if (GM_xmlhttpRequest) {
			doGreasemonkeyAjax(reqMethod, reqUrl, reqData, successFn, errorFn);
		} else {
			doAjax(reqMethod, reqUrl, reqData, successFn, errorFn);
		}
	}
	/**
	 * Test for update script
	 */
	function testUpdate() {
		var executeRequest = false,
			lastUpdateTime = 0,
			currentTime = 0,
			maxDiference = 0,
			checkDifference = 0;
		if (alwaysCheck) {
			executeRequest = true;
		} else {
			lastUpdateTime = parseInt(GM_getValue(prefix + "LastCheck", 0), 10);
			currentTime = (new Date()).getTime();
			checkDifference = currentTime - lastUpdateTime;
			maxDiference = checkAfterDays * 24 * 60 * 60 * 1000;
			if (checkDifference >= maxDiference) {
				GM_setValue(prefix + "LastCheck", currentTime);
				executeRequest = true;
			}
		}
		if (executeRequest) {
			doRequest("GET", dyMarketHelperGeneral.getWebsite(), "", parseUrlResponse, errorAtXhr);
		}
	}
	/**
	 * Initialize auto-update
	 */
	function init(appPrefix) {
		prefix = appPrefix;
		testUpdate();
	}
	//public
	return {
		init: init,
		errorAtXhr: errorAtXhr,
		doRequest: doRequest,
		getUpdateAvailable: getUpdateAvailable,
		getCurrentVersion: getCurrentVersion,
		getLatestVersion: getLatestVersion
	};
}());

/**
 * add MarketHelper script
 */
function loadMarketHelperScript() {
	"use strict";
	/*global document, dyMarketHelperGeneral*/
	var dyMarketHelperJsString = "dyMarketHelper_js",
		dyMarketHelperJs = null,
		currentVersion = dyMarketHelperGeneral.getVersion(),
		scriptWebsite = dyMarketHelperGeneral.getWebsite(),
		dyMarketHelperString = "",
		dyMarketHelperParams = "";
	dyMarketHelperParams = "'" + currentVersion + "', '" + scriptWebsite + "'";
	dyMarketHelperString = "var dyMarketHelper = (" + dyMarketHelperCode.toString() + "(" + dyMarketHelperParams + "));dyMarketHelper.init();";
	dyMarketHelperJs = document.getElementById(dyMarketHelperJsString);
	if (!dyMarketHelperJs) {
		dyMarketHelperJs = document.createElement("SCRIPT");
		dyMarketHelperJs.setAttribute("id", dyMarketHelperJsString);
		dyMarketHelperJs.innerHTML = dyMarketHelperString;
		document.getElementsByTagName("body")[0].appendChild(dyMarketHelperJs);
	} else {
		dyMarketHelperJs.innerHTML = dyMarketHelperString;
	}
}
//init script
if (location.href.indexOf(".the-west.") !== -1 && location.href.indexOf("game.php") !== -1) {
	loadMarketHelperScript();
	//check for updates
	dyAutoUpdate.init(dyMarketHelperGeneral.getPrefix());
}

