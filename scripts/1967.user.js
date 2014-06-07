// ==UserScript==
// @name           Search focus
// @namespace      http://home.wanadoo.nl/efx/focus/
// @description    Focus input on the search textfield
// ==/UserScript==
(function(){


GM_registerMenuCommand("Search Focus Options", options);

var o = 0;
var modeselect;

const HANDLERS_TABLE = {	
  // ';' - focus
  186: doFocus
};

if(GM_getValue('mode') == 0) doFocus();

if(GM_getValue('opts') == 1)
{
	options()	
}
else
{		
	window.addEventListener('keydown', keyHandler, false);
	window.addEventListener('keyup', releaser, false);
}

var isCtrl = false;
function releaser(event)
{
	if(event.which == 17) isCtrl=false; 
}
function keyHandler(event) 
{
	
  if (event.which == 17) isCtrl = true;  	
  if (event.which == 188 && isCtrl == true)
  {
  	doFocus();
  	return true;
  }	  	
	return false;
}

function options()
{
	if(o == 1)
	{
		alert("Options already open!");
	}
	else
	{
		o = 1;
		var elmInsertPoint = document.body;
		
		var elmD = document.createElement("div");
		elmD.setAttribute('style',"width:50%;position:fixed;color:blue;background:white;border:10px solid black;top:25%;left:25%");
		
		var opts = document.createElement("center");
		opts.innerHTML = "Search Focus Options";
		elmD.appendChild(opts);
		
		var modelabel = document.createElement("label");
		modelabel.innerHTML = "Search Focus Mode";		
		elmD.appendChild(modelabel);
		
		var modeselect = document.createElement("select");
		modeselect.name = "modeselect";
		
		var objopt;
			objopt = document.createElement("option");
			objopt.text = "Auto";
			objopt.value = "0";
		modeselect.options.add(objopt);
			objopt = document.createElement("option");
			objopt.text = "Keyboard";
			objopt.value = "1";
		modeselect.options.add(objopt);
		
		if(GM_getValue('mode') == 1) 	modeselect.value = "1";
		else													modeselect.value = "0";		
		elmD.appendChild(modeselect);		
		
		var savebutton = document.createElement("button");
		savebutton.innerHTML = "Save & Reload page";
		savebutton.addEventListener('click',saveopts,false);
		elmD.appendChild(savebutton);
		elmInsertPoint.insertBefore(elmD, elmInsertPoint.lastChild);
	}
}
function saveopts()
{	
	GM_setValue('opts', 1);
	modeselect = document.getElementsByName("modeselect")[0];
	
	GM_setValue('mode', modeselect.value);
			
	window.location.reload();
	o == 0;
	GM_setValue('opts', 0);

}
function runCommands(commands) {
	
  for (var i=0; i < commands.length; i++) {
    var command = commands[i];
 
    // A one second pause between commands seems to be enough for LAN/broadband
    // connections
    setTimeout(commands[i], 100 + 1000 * i);
  }
}


function doFocus() 
{
	
	var input = document.getElementsByTagName('input');
	if (input.length)
	{
		var pattern=/query|search|q|keywords|^for/i
		for (var i = 0; i < input.length; ++i)
		{
			if(pattern.test(input[i].name) && input[i].type=="text")
			{
				input[i].focus();
				return;
			}
		}
	}
}
})();



