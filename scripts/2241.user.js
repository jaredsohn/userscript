// ==UserScript==
// @name           Gmail Colorizer
// @namespace      http://www.metamonkey.net/gmailcolorizer
// @description    Adds colors to Gmail according to label
// @include        http://gmail.google.com/*
// @include        https://gmail.google.com/*
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*

// ==/UserScript==

(function()
{

var _theInterval = null;
var _blnSetupComplete = false;
var _arrLabels = [];
var _arrColors = [];
var _arrDefaultColors = new Array
(
	"#ffc3c3", //red
	"#ffe8c3", //orange
	"#b5edbc", //green
	"#c3d9ff", //blue
	"#f0c3ff"  //purple	
);

function xpath(query) 
{
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function FindLabelIndex(inputHTML)
{	
	var intReturn = -1;
	for(var i=0;i<_arrLabels.length;i++)
	{
		var re = new RegExp("<span class=\"ct\">(^\\<)*(, )?" + _arrLabels[i] + "(^\\<)*</span>","gi");
		if(inputHTML.match(re))
		{
			intReturn = i;
			break;
		}
	}
	return intReturn;
}

function GetLabels()
{
	var allLabels = xpath("//div[@class='lk cs']");
	for(var i=0;i<allLabels.snapshotLength;i++)
	{
		if(allLabels.snapshotItem(i).id.match(/^sc_.+/i))
		{
			_arrLabels.push(allLabels.snapshotItem(i).id.replace(/^sc_/ig,''));
		}
	}
}

function SetupStyles(){
	var strStyle = '';
	for(var i=0;i<_arrLabels.length;i++)
	{
		strStyle += '.gm_label' + i + ' { background-color: ' + _arrColors[i % _arrColors.length] + '; }\n';	
	}
	addGlobalStyle(strStyle);
}

function GetColors(){
	var COLOR_KEY = 'Colors';
	var DELIMITER = ';';
	
	var strColors = GM_getValue(COLOR_KEY,'');
	if(strColors!='')
	{
		_arrColors = strColors.split(DELIMITER);
	}
	else
	{
		_arrColors = _arrDefaultColors;
		var strToSet = '';
		for(var i=0;i<_arrDefaultColors.length;i++)
		{
			if(i>0)
			{
				strToSet += DELIMITER;
			}
			strToSet += _arrDefaultColors[i];			
		}
		GM_setValue(COLOR_KEY,strToSet);
	}
}

function HandleColorization()
{
	var allRows, thisRow;
	allRows = xpath("//tr[normalize-space(@class)='rr'] | //tr[normalize-space(@class)='ur']");
	for (var i = 0; i < allRows.snapshotLength; i++) 
	{
		//ensure that things are set up (only executes once)
		DoSetup();
		
		//if this gmail page contains the relevant DOM objects, set a timer to catch newly created ones
		if(_theInterval==null)
		{
			_theInterval = setInterval(function(){ HandleColorization(); },1000);
		}
		
		thisRow = allRows.snapshotItem(i);			
		
		var childCells = xpath("//tr[normalize-space(@id)='" + thisRow.id + "']/td[5]");
		if(childCells.snapshotLength>0)
		{						
			var intLabelIndex = FindLabelIndex(childCells.snapshotItem(0).innerHTML);
			if(intLabelIndex!=-1)
			{
				var strClassName = "gm_label" + intLabelIndex;
				var re = new RegExp("\\s*gm_label\\d+\\s*","gi");
				thisRow.className = thisRow.className.replace(re,"");				
				thisRow.className += " " + strClassName;
			}			
		}		
	}
}

function DoSetup()
{
	if(!_blnSetupComplete)
	{	
		GetLabels();
		GetColors();
		SetupStyles();
		_blnSetupComplete = true;
	}
	
}

HandleColorization();

})();