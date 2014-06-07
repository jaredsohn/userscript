// ==UserScript==
// @name          Rapidshare-Uyar-Beni
// @namespace     By Shyhms
// @description	  downLoad hazirken haber veren script
// @include       *rapidshare.com/*
// ==/UserScript==

var filename = '';

function get_name(name)
{
  var temp = '';
  if(name.length >= 18)
  {
    var n1 = name.substr(0, 7);
    var n2 = name.substr(name.length-10, name.length-1);
    temp = n1 + '...' + n2;
  }
  else temp = name;
  return temp;
}

function namenssuche()
{
  var Ergebnis = document.URL.search(/rapidshare.de.+/);
  if (Ergebnis != -1)
  {
    for (var i = 0; i < document.getElementsByTagName("b").length; i++) {
      var anchor = document.getElementsByTagName("b")[i];
      if(i == 5) filename = anchor.innerHTML;
    }
  }
  else
  {
    for (var i = 0; i < document.getElementsByTagName("font").length; i++) {
      var anchor = document.getElementsByTagName("font")[i];
      if(i == 3) filename = anchor.innerHTML;
    }
  }

  if(filename != '')
  {
    filename = filename.replace(/http\:\/\/rapidshare\.com\/files/i, "");
    filename = filename.replace(/\/\d.+\//i, "");
    filename = get_name(filename);
  }    
}

function pruefen()
{
  if(unsafeWindow.c != null) 
  {
	if (unsafeWindow.c >= 1.0) 
	{
		if(filename != '') document.title='~' +  Math.round(unsafeWindow.c) + ' Kalan sure:) '+ filename;
		else document.title='Rapidshare: ~' +  Math.round(unsafeWindow.c) + ' Kalan sure:)';
		setTimeout(pruefen, 100);
	}
	else
	{
		document.title='Rapidshare haber vermez seyh_script haber verir: ';
		alert("\n    Download hazir!!!Buyursunlar...    \n");
	}
  }
}

freebuttons = document.evaluate("//input[@value='Free']", document, null,7, null); 
	
freebutton = freebuttons.snapshotItem(0);
if (freebuttons.snapshotLength == 1)
{
	freebutton.click();
}
else
{
  if(unsafeWindow.c != null) namenssuche();
  setTimeout(pruefen, 500);
}
