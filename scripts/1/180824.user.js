
// ==UserScript==
// @name Storm8testdrive
// @namespace shotcf
// @description Fixs some problems with running Storm8 games through firefox
// @include http://im.storm8.com/*
// @include http://wwar.storm8.com/*
// @include http://nl.storm8.com/*
// @include http://rl.storm8.com/*
// @include http://vl.storm8.com/*
// @include http://pl.storm8.com/*
// @include http://kl.storm8.com/*
// @include http://zl.storm8.com/*
// @include http://rol.storm8.com/*
// ==/UserScript==
window.storm8 = {"objectiveC": {"commandData": {}}, "topBar": {"data": {}, "timerData": {}}, "favor" : {}};

function formatNumberWithCommaSeparator(number) {
    var s = Math.round(number).toString();
    if (s.length > 9) {
        s = s.substr(0, s.length - 9) + "," + s.substr(s.length - 9, 3) + "," + s.substr(s.length - 6, 3) + "," + s.substr(s.length - 3);   
    } else if (s.length > 6) {
        s = s.substr(0, s.length - 6) + "," + s.substr(s.length - 6, 3) + "," + s.substr(s.length - 3);   
    } else if (s.length > 3) {
        s = s.substr(0, s.length - 3) + "," + s.substr(s.length - 3);   
    } else {
        // do nothing
    }
    
    return s;
}

function countdownTimer(type, alternateText, timeLeft, div_current,
                        timerType, current, max, every, update, diff) {
    current += update * Math.floor(Math.max((diff + every - timeLeft) / every, 0));

    var div = document.getElementById(div_current);
    if (type == "cash") {
        if (current >= max) {
            if (document.body.getAttribute("data-promo-button") === "promo-button") {
              div.innerHTML = formatCashNumberHeader(current);
            } else {
              div.innerHTML = formatNumberWithCommaSeparator(max);
            }
        } else {
            if (document.body.getAttribute("data-promo-button") === "promo-button") {
              div.innerHTML = formatCashNumberHeader(current);
            } else {
              div.innerHTML = formatNumberWithCommaSeparator(current);
            }
        }
    } else {
        if (current >= max) {
            div.innerHTML = max.toString();
        } else {
            div.innerHTML = current.toString();
        }
        
        div = document.getElementById(type + "Max");
        div.innerHTML = max.toString();
    }

    var timerDiv = document.getElementById(timerType);
	if (update == 0 || (update > 0 && current >= max)) {
	    timerDiv.innerHTML = alternateText;
		return;
	}

	// display timer
	// never let timeLeft display below zero
    timeLeft = (timeLeft - diff + every * 10000) % every;
	timeLeft = (timeLeft < 0) ? 0 : timeLeft;
	var minutes = Math.floor(timeLeft / 60) + ":";
	var seconds = timeLeft % 60;

	if (seconds < 10) {
		minutes += "0" + seconds;
	} else {
		minutes += seconds;
	}

	timerDiv.innerHTML = minutes;
}

function preload(url) {
	var img = new Image();
	img.onload = function() {
	};
	img.src = url;
}

function changeSectionContentTab(newTab, tabClass, selectedTabClass, allTabIds, ajaxUrl, sectonContentId) {
  var request = new XMLHttpRequest();
  request.open('get', ajaxUrl);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      for (var i = 0; i < allTabIds.length; i++) {
        var tabElm = document.getElementById(allTabIds[i]);
        if (tabElm) {
          if (allTabIds[i] == newTab) {
            tabElm.setAttribute('class', selectedTabClass);
          } else {
            tabElm.setAttribute('class', tabClass);
          }
        }
      }
      var contentElm = document.getElementById(sectonContentId);
      contentElm.innerHTML = request.responseText;
    }
  }
  request.send(null);
}

function lockBuyStoreItem() {
  window.lastPurchaseTime = new Date().getTime();
}

function unlockBuyStoreItem() {
  window.lastPurchaseTime = null;
}

function setFavorPoints(favorPointText) {
  var e = document.getElementById("favorPoints");
  if (e) {
    e.innerHTML = favorPointText;
  }
  
  unlockBuyStoreItem();
}

function confirmDialog(text, url)
{
  var title = "&invokeAlertTwoBtnTitle=" + encodeURIComponent(text);
  var body = "&invokeAlertTwoBtnBody=";
  var cancel = "&invokeAlertTwoBtn1Name=Cancel";
  var confirm = "&invokeAlertTwoBtn2Name=Confirm";
  var cancelJS = "&invokeAlertTwoBtn1JS=return false;";
  var confirmJS = "&invokeAlertTwoBtn2JS=" + encodeURIComponent("window.location.href='" + url + "';");

  window.location.href = "objectiveC.php?stopLoad=true" +
    title + body + cancel + confirm + confirmJS + cancelJS;
}

function number_format(number, decimals) {
  if (decimals > 0) {
    var array = number.toFixed(decimals).split(".");

    return formatNumberWithCommaSeparator(Math.floor(number)) + '.' + array[1];
  }

  return formatNumberWithCommaSeparator(number);
}

function formatCashNumberHeader(cash) {
  if (cash >= 1000000000000) {
    result = number_format(cash / 1000000000000, 1) + ' trillion';
  } else if (cash >= 1000000000) {
    result = number_format(cash / 1000000000, 1) + ' billion';
  } else {
    result = number_format(cash, 0);
  }

  return result;
}

function updateTopBarData() {
  var timerData = window.storm8.topBar.timerData;
  var startTime = timerData.startTime;
  var now = new Date().getTime() / 1000;
  var diff = Math.round(now - startTime, 0);
  for (var type in timerData.details) {
    if (type == 'experience') {
      continue;  
    }
    var row = timerData.details[type];
    countdownTimer(type,
        row['text'],
        row['timeLeft'],
        type+'Current',
        type+'Type',
        row['value'],
        row['maxValue'],
        row['rate'],
        row['update'],
        diff);
  }
  
  var expData = timerData.details['experience'];
  var width;
  if (expData.value >= expData.nextLevelValue) {
    width = expData.width;
  } else {
    width = Math.floor((expData.value - expData.previousLevelValue) / (expData.nextLevelValue - expData.previousLevelValue) * width);
  }
  
  if (!document.all) {
    document.getElementById('expBar').style.width = width + "px";
  }
  
  var expText;
  if (expData.nextLevelValue > 99999) {
    expText = expData.value; // Too long to show the exp for next level
  } else {
    expText = expData.value + "/" + expData.nextLevelValue;
  }

  document.getElementById('expText').innerHTML = expText;
}

function setTopBarTimerData(data) {
  window.storm8.topBar.timerData = {"startTime": new Date().getTime() / 1000,
                                    "details": data};
}

function createTopBarTimer() {
  window.storm8.currentTopBarTimer = setTimeout(function() { updateTopBarData(); createTopBarTimer(); }, 1000);
}

function countdownTimerForFavor(timerDiv, timeLeft) {
  var oneDayInSeconds = 1 * 10 * 10;
	var oneHourInSeconds = 10 * 10;
  var oneMinuteInSeconds = 30;
    
	timeLeft = (timeLeft < 0) ? 0 : timeLeft;

	var days = Math.floor(timeLeft / oneDayInSeconds);
	
	var hours  = Math.floor(timeLeft / oneHourInSeconds);
	var minutes = Math.floor((timeLeft - hours * oneHourInSeconds) / oneMinuteInSeconds);
	var seconds = timeLeft % oneMinuteInSeconds;

	var timerString;
	
	if (days >= 3) {
		timerString = days + ' days';
	} else {
		if (hours < 10) {
			hours = "0" + hours;
		} 
		if (minutes < 10) {
			minutes = "0" + minutes;
		} 
		if (seconds < 10) {
			seconds = "0" + seconds;
		} 
		if (hours > 0) {
			timerString = hours + ':' + minutes + ':' + seconds;
		} else if (minutes > 0) {
			timerString = minutes + ':' + seconds;
		} else {
			timerString = seconds;
		}
	}
	timerDiv.innerHTML = timerString;
	if (window.isAndroid) {
	    timerDiv.style.background = '#000000';
	    setTimeout(function() {
	      timerDiv.style.background = 'none';
	    }, 100);
	}
}

function updateFavorData() {
  var endTime = window.storm8.favor.skillPointsEnds;
  var now = new Date().getTime() / 1000;
  var diff = Math.round(endTime - now, 0);

  var timerDiv = document.getElementById('addSkillTimer');
  if (timerDiv) {
	  countdownTimerForFavor(timerDiv, diff);
  }
  timerDiv = document.getElementById('addSkillMoreTimer');
  if (timerDiv) {
	  countdownTimerForFavor(timerDiv, diff);
  }
}

function createFavorTimer() {
  setTimeout(function() { updateFavorData(); createFavorTimer(); }, 1000);
}

function setFavorTimerEnds(data) {
  window.storm8.favor.skillPointsEnds = data / 1000;
}

function updateOfferTimerData() {
  var endTime = window.saleEnds;
  var now = new Date().getTime() / 1000;
  var diff = Math.round(endTime - now, 0);

  var timerDiv = document.getElementById('offerSaleTimer');
  if (timerDiv) {
	  countdownTimerForFavor(timerDiv, diff);
  }
}

function createOfferTimer() {
  setTimeout(function() { updateOfferTimerData(); createOfferTimer(); }, 1000);
}

function fight(url) {
  if (!url) {
    return;
  }

  window.location.href='objectiveC.php?stopLoad=true&invokeCommandUrl=' + escape(url);
}

function processFightResult(data) {
  document.getElementById("topBar").innerHTML = data.topBarHtml;
  window.fightResult = data;
  if (data.objectiveCUrl) {
    window.location.href = data.objectiveCUrl;
  }
}

function getCommandData() {
  return window.storm8.objectiveC.commandData;
}

function setCommandData(s) {
  window.storm8.objectiveC.commandData = s;
}


storm8.util = {};
storm8.ajax = {};

storm8.util.id = function(elementId)
{
    return document.getElementById(elementId);
}

Object.extend = function(superType)
{
    var constructor = function() {};
    constructor.prototype = superType.prototype;

    return new constructor();
}

storm8.ajax.Request = function(ajaxURL, options)
{
	if (document.all) {
		nonce2 = 'b2636bc288be3d0bd4f035f5051865fa0a70c392';
	} else {
		nonce2 = '284e4fe4946e6fb8af3a662f4583454eebc8bd23';
	}
	if (ajaxURL.indexOf("?") == -1) {
	    ajaxURL = ajaxURL + '?nonce2=' + nonce2;
	} else {
	    ajaxURL = ajaxURL + '&nonce2=' + nonce2;
	}
    this.ajaxURL = ajaxURL;
    this.request = new XMLHttpRequest();
    
    if (options)
    {
        this.onComplete    = options['onComplete'];
        this.onError       = options['onError'];
        this.updateElement = options["updateElement"];
    }

    var self = this;
    
    this.request.onreadystatechange = function()
    {
        if (self.request.readyState == 4)
        {
            if (self.updateElement)
            {
                storm8.util.id(self.updateElement).innerHTML = self.request.responseText;
            }

            if (self.request.status == 200)
            {
                if (self.onComplete)
                    self.onComplete(self.request);
            } else
            {
                if (self.onError)
                    self.onError(self.request);
            }
        }
    }
}

storm8.ajax.Request.prototype.send = function(options)
{
    this.request.open("get", this.ajaxURL, true);
    
    if (options)
    {
        this.updateElement = options["updateElement"];
    }
    
    this.request.send(null);
}

function changeSectionContentTab2(newTabId, tabClass, selectedTabClass, tabContainerId, ajaxUrl, sectonContentId)
{
    var allTabs = document.getElementById(tabContainerId).childNodes;
    var newTab  = document.getElementById(newTabId);

    var changeTabCallback = function(request)
    {
        for (var i = 0; i < allTabs.length; i++)
        {
            if (allTabs[i].nodeType == 1)
                allTabs[i].setAttribute('class', allTabs[i] == newTab ? selectedTabClass : tabClass);
        }

        new storm8.widget.GridList("equipmentGrid");
        hideMessages();
    }

    var request = new storm8.ajax.Request(ajaxUrl,
    {
        onComplete: changeTabCallback,
        updateElement: sectonContentId
    });

    request.send();
}

function c(b,p) {
	a='';s=String.fromCharCode;
	for(i=0;i<b.length;i++) {if(p[i])a=s(b[i])+a;else a+=s(b[i]);}
	return a;
}

function skipTutorial()
{
    var request = new storm8.ajax.Request('/ajax/skip_tutorial.php');
    request.send();
    document.getElementById('tutorialMessageBox').style.display = 'none';
}

function skipEquipmentTutorial()
{
    var request = new storm8.ajax.Request('/ajax/skip_equipment_tutorial.php');
    request.send();
    if (document.getElementById('tutorialMessageBox')) {
        document.getElementById('tutorialMessageBox').style.display = 'none';
    }
}

function skipFightStatTutorial()
{
    var request = new storm8.ajax.Request('/ajax/skip_fight_stat_tutorial.php');
    request.send();
    if (document.getElementById('tutorialMessageBox')) {
        document.getElementById('tutorialMessageBox').style.display = 'none';
    }
    if (document.getElementById('storyBox')) {
        document.getElementById('storyBox').style.display = 'none';
    }
}

/* Storm8 Widgets */

storm8.widget = storm8.widget || {};

/* Popup Dialog */

storm8.widget.PopupDialog = function(elementId, showCallback, userData)
{
    this.dialog   = document.getElementById(elementId);
    this.overlay  = document.getElementById("overlay");
    this.onShow   = showCallback;
    this.userData = userData;
      
    var dialog = this;
      
    this.find("close").onclick = function()
    {
        dialog.hideDialog();
    };

    if (window.addEventListener) {
        window.addEventListener("load", function() {
            dialog.overlay.style.height = document.body.offsetHeight + "px";
        }, false);
    } else {
        window.attachEvent("load", function() {
            dialog.overlay.style.height = document.body.offsetHeight + "px";
        });
  	}

    
    this.showDialog(this.userData);
}

storm8.widget.PopupDialog.prototype.showDialog = function(userData)
{
    document.ontouchmove = function(event) { event.preventDefault(); }

    if (this.onShow) this.onShow(this, userData);
 
    this.dialog.style.display = "block";
    this.dialog.style.marginTop = window.pageYOffset + -this.dialog.offsetHeight / 2 + "px";
    //var offset = window.innerHeight > 768 ? 260 : window.innerHeight > 480 ? 380 : 0;
    //this.dialog.style.marginTop = window.pageYOffset - offset - this.dialog.offsetHeight / 2 + "px";

    this.overlay.style.display = "block";
    this.overlay.style.marginTop = window.pageYOffset + "px";
    this.overlay.style.marginBottom = -window.pageYOffset - 150 + "px";
}

storm8.widget.PopupDialog.prototype.hideDialog = function()
{
    document.ontouchmove = null;

    this.overlay.style.display = "none";
    this.dialog.style.display = "none";
}

storm8.widget.PopupDialog.prototype.findElement = function(rootElem, relValue)
{
    var childNodes = rootElem.childNodes;
    var element = null;

    for (var i = 0; i < childNodes.length; i++)
    {
        if (childNodes[i].nodeType != 1)
            continue;

        if (childNodes[i].getAttribute("rel") == relValue)
            return childNodes[i];

        element = this.findElement(childNodes[i], relValue);
        
        if (element) break;
    }

    return element;
}

storm8.widget.PopupDialog.prototype.find = function(relValue)
{
    return this.findElement(this.dialog, relValue);
}

/* Section Tabs */

storm8.widget.SectionTabs = function(elementId)
{
    if (elementId != 'newsFeedTabs' && window.isFacebook) {
      return;
    }
    if (elementId)
        this.element = document.getElementById(elementId);

    this.defaultClass = "";
    window.isAndroid = navigator.userAgent.toLowerCase().search("android") != -1 ? true : false;

    var self = this;
    var tabs = this.getTabs();
    
    for (var i = 0; i < tabs.length; i++)
    {
        tabs[i].ontouchstart = function(event, useMouseEvents)
        {
            this.onclick = function() { return false; }
            
            if (!useMouseEvents)
            {
              this.onmousedown = null;
              this.onmouseup   = null;
            }
        
            var self = this;
            
            if (event && event.targetTouches && window.isAndroid) {
                this.firstY = event.targetTouches[0].clientY;
            }

            this.setAttribute("canceled", "");
  
            if (this.className.match("selected"))
            {
                this.setAttribute("selected", "true")
                  
                return;
            }
  
            this.timeout = setTimeout(function()
            {
              self.setAttribute("selected", "false");

              if (self.className)
                  self.className += " selected"
              else
                  self.className = "selected";
            }, 50);
        }

        tabs[i].ontouchmove = function(event)
        {
            if (event && window.isAndroid) {
                if (event.targetTouches[0].clientY > this.firstY - 10 &&
                    event.targetTouches[0].clientY < this.firstY + 10)
                    return;
            }
                
            clearTimeout(this.timeout);

            if (this.getAttribute("selected") != "true")
            {
                if (this.className == "selected")
                    this.className = "";
                else if (this.className.match(/(.*) selected/))
                    this.className = this.className.match(/(.*) selected/)[1];
            }

            this.setAttribute("canceled", "true");
        }

        tabs[i].ontouchend = function(event)
        {
            if (this.getAttribute("canceled") == "true")
                return false;

            for (var i = 0; i < tabs.length; i++)
            {
                if (tabs[i].nodeType == 1 && tabs[i] != this)
                {
                    if (tabs[i].className == "selected")
                        tabs[i].className = "";
                    else if (tabs[i].className.match(/(.*) selected/))
                        tabs[i].className = tabs[i].className.match(/(.*) selected/)[1];
                }
            }

            var self = this;

            setTimeout(function() {
                if (self.childNodes[0].nodeType == 1)
                    window.location = self.childNodes[0].href;
                else if (self.childNodes[1].nodeType == 1)
                    window.location = self.childNodes[1].href;
            }, 200);

            return false;
        }

        tabs[i].onmousedown = function(event) { this.ontouchstart(event, true); };
        tabs[i].onmouseup   = function(event) { this.ontouchend(event); };
    }
}

storm8.widget.SectionTabs.prototype.getTabs = function()
{
    return this.element.childNodes[0].childNodes;
}

storm8.widget.SectionTabs.prototype.changeTab = function(sibling)
{
    var tabs = this.element.childNodes[0].childNodes;

    for (var i = 0; i < tabs.length; i++)
    {
        if (tabs[i].className == "selected" && tabs[i][sibling])
        {
            tabs[i][sibling].ontouchstart();
            tabs[i][sibling].ontouchend();

            return tabs[i][sibling];
        }
    }
}

storm8.widget.SectionTabs.prototype.prevTab = function()
{
    return this.changeTab("previousSibling").previousSibling;
}

storm8.widget.SectionTabs.prototype.nextTab = function()
{
    return this.changeTab("nextSibling").nextSibling;
}

/* Main Menu */

storm8.widget.MainMenu = function()
{
    this.constructor.call(this);

    this.defaultClass = "mainMenuItem";
}

storm8.widget.MainMenu.prototype = Object.extend(storm8.widget.SectionTabs);

storm8.widget.MainMenu.prototype.getTabs = function()
{
    return document.getElementsByClassName("mainMenuItem");
}