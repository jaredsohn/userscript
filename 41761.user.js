// ==UserScript==
// @name           Friendstock AutoBoost (normal)
// @description    Auto boosting script. For Friend Stock normal server.
// @version        0.0.3
// @date           2009-02-04
// @creator        Vaidas Lazauskas
// @include        http://apps.facebook.com/friendstock/i/portfolio*
// @include        http://apps.facebook.com/friendstock/i/stocks?*data=portfolio*offset=*
// ==/UserScript==

var autoRefresh = false; //Keep turned off if you use friendstock helper (auto token getter), otherwise change this to true.
var app_root  = 'http://apps.facebook.com/friendstock/i/';
var delayInt = 2000; //Default 2000 - a 2 seconds. Used to determin delay between boosts.

//=============Do not edit below this line!====================================================================

var counter = 0;

var cookie = new Array();

if (!Array.prototype.push)
{
    Array.prototype.push = function(elem)
    {
        this[this.length] = elem;
    }
}

var EventManager =
{
    _registry: null,

    Initialise: function()
    {
        if (this._registry == null)
        {
            this._registry = [];
            EventManager.Add(window, "unload", this.CleanUp);
        }
    },

    Add: function(obj, type, fn, useCapture)
    {
        this.Initialise();

        // If a string was passed in, it's an id.
        if (typeof obj == "string")
            obj = document.getElementById(obj);
        if (obj == null || fn == null)
            return false;

        // Mozilla/W3C listeners?
        if (obj.addEventListener)
        {
            obj.addEventListener(type, fn, useCapture);
            this._registry.push({obj: obj, type: type, fn: fn, useCapture: useCapture});
            return true;
        }

        // IE-style listeners?
        if (obj.attachEvent && obj.attachEvent("on" + type, fn))
        {
            this._registry.push({obj: obj, type: type, fn: fn, useCapture: false});
            return true;
        }
        return false;
    },
};

Utilss = new Object();

Utilss.getElementsByXPath = function(expression, node){
  if (!node) { node = document; }
  else { alert("Nodas nurodytas"); }
  var result = new Array();
  var xpathResult;
  var nsResolver = node.createNSResolver( node.ownerDocument == null ? node.documentElement : node.ownerDocument.documentElement);
  xpathResult = node.evaluate(expression, node, nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  var node;
  while (node = xpathResult.iterateNext()){
    result.push(node);
  }
  return result;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function saveCookie()
{
	var str = cookie.join(',');
	createCookie("autoboostN", str, false);
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function getCookie()
{
	var str = readCookie("autoboostN");
	if (!str) { str = ""; }
	str.replace(/ /, "");
	while (str.indexOf(",,") >= 0)
	{
		str = str.replace(/,,/, ",");
	}
	if (str.charAt(0) == ',')
	{
		str = str.substring(1,str.length);
	}
	if (str.charAt(str.length - 1) == ',')
	{
		str = str.substring(0,str.length - 1);
	}
	cookie = str.split(',');
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function delCookie()
{
	eraseCookie("autoboostN");
}


var go_home = function go_home(){
  location.href = app_root + "portfolio";
}

var getBoostCount = function getBoostCount(){
	var boostz = Utilss.getElementsByXPath('//a[contains(@href, "i/tokens")]');
    if(boostz){
		tokens = boostz[0].parentNode.childNodes[4].text;
		return parseInt(tokens.match(/\d+/));
	}
	return 0;
}

var simulateClick = function simulateClick()
{
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent("click", true, true);
	var elem = Utilss.getElementsByXPath('//a[contains(@onclick, "boost_' + cookie[counter++] + '")]');
	if (elem.length > 0)
	{
		elem[0].dispatchEvent(evt);
	}
}

var autoboost = function autoboost(){
	var boosts = getBoostCount();
	var temp;
	var rand_no;
	if (boosts > 0)
	{
		for (var j = 0; j < cookie.length && j < boosts; j++)
		{
			rand_no = Math.floor((delayInt/2)*Math.random()) + delayInt;
			setTimeout(simulateClick, rand_no*j*2);
		}
		if (autoRefresh) setTimeout(go_home,2000000);
	}
}

function isAuto(userId)
{
	for (var i = 0; i < cookie.length; i++)
	{
		if (cookie[i] == userId) return i + 1;
	}
	return false;
}

function disableAuto(userId)
{
	var tmp = new Array();
	for (var j = 0; j < cookie.length; j++)
	{
		if (cookie[j] == userId) cookie[j] = "";
	}
	saveCookie();
	getCookie();
}

var addFunctions = function addFunctions()
{
	var trs = Utilss.getElementsByXPath('//tr/td/a/img[contains(@src, "profile.ak.facebook.com")]');
	var trtag;
	var tdtemp;
	var check;
	var userId;
	var arrIndex;
	var announce;
	for (var i = 0; i < trs.length; i++)
	{
		if (trs[i].width < 50)
		{
			trtag = trs[i].parentNode.parentNode.parentNode;
			userId = trs[i].parentNode.href.substring(trs[i].parentNode.href.indexOf('=')+1,trs[i].parentNode.href.length);
			tdtemp = document.createElement("TD");
			check = document.createElement("INPUT");
			check.type = "checkbox";
			check.id = userId;
			arrIndex = isAuto(userId);
			if (arrIndex)
			{
				check.checked = true;
				announce = document.createElement("B");
				announce.style.cssText = "color: rgb(50, 150, 50); font-size: 11px;";
				announce.appendChild(document.createTextNode(arrIndex));
			} else { announce = document.createElement("BR"); }
			EventManager.Add(check,'click',function(e) { 
				if (this.checked)
				{
					cookie.push(this.id);
					saveCookie();
					var sqNr = document.createElement("B");
					sqNr.style.cssText = "color: rgb(50, 150, 50); font-size: 11px;";
					sqNr.appendChild(document.createTextNode(isAuto(this.id)));
					if (this.parentNode.childNodes.length > 2)
					{
						this.parentNode.removeChild(this.parentNode.childNodes[2]);
						this.parentNode.removeChild(this.parentNode.childNodes[1]);
					}
					
					this.parentNode.appendChild(sqNr);
					this.parentNode.appendChild(document.createTextNode(" Autoboosting"));
				} else {
					disableAuto(this.id);
					if (this.parentNode.childNodes.length > 2)
					{
						this.parentNode.removeChild(this.parentNode.childNodes[2]);
						this.parentNode.removeChild(this.parentNode.childNodes[1]);
						this.parentNode.appendChild(document.createElement("BR"));
						this.parentNode.appendChild(document.createTextNode(" Autoboosting"));
					}
				}
			}, false); 
			tdtemp.appendChild(check);
			if (announce) { tdtemp.appendChild(announce); }
			tdtemp.appendChild(document.createTextNode(" Autoboosting"));
			tdtemp.style.backgroundColor = "rgb(238, 238, 255)";
			tdtemp.style.fontSize = "9px";
			trtag.appendChild(tdtemp);
		}
	}
	var tablas = trtag.parentNode.parentNode.parentNode;
	var divas = document.createElement("DIV");
	divas.style.cssText = "color: rgb(255, 50, 50); font-size: 9px; font-weight: bold;";
	divas.appendChild(document.createTextNode("NOTE: check for autoboosting is aplied ONLY for the first page of your portfolio!"));
	tablas.appendChild(divas);
}

function mainas()
{
	if (document.getElementById("try_again_button"))
	{
		setTimeout(window.location.reload(),1000);
	} else {
		getCookie();
		addFunctions();
		autoboost();
	}
}

mainas();