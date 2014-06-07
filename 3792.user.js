// phonemap

// This file is licensed under the BSD-new license:
// http://www.opensource.org/licenses/bsd-license.php
//
// Comments/Questions: Les Papier at paperless@excite.com
//
// Built with: Open source and "Don't repeat yourself" principles in mind...
//
// Tested with: Firefox 1.5.01 (GM 0.6.4) and IE 6.x (Turnabout plug-in)

// ==UserScript==
// @name          phonemap
// @namespace     http://paperless.blogdrive.com
// @description   Lookup address of US phone number on a map, with a call option
// @include       *
// ==/UserScript==


(function ()
{

//patern for US phone numbers (only) with & without area code
var phoneRE = /(\s|\n|\.|;|:|>)?(\d{3}(-|\.|\s)\d{3}(-|\.)\d{4}|\(\d{3}\)(\s||)\d{3}(-|\.)\d{4}|(\s|\n|\.|;|:|>)\d{3}\-\d{4})/;
var DialDefault = '+1';				// set to US for Skype calling
var ACDefault = '207';				// set your own default area code for ###-#### phones
var GoogleMatchRE = /Phonebook results/ig;
var GoogleSearchUrl = 'http://www.google.com/search?q=';
var MapsUrl = 'http://maps.google.com/maps?li=';
var UrlParms = 'bwp&q=';				// Google search parms
var ExhcSearchUrl = 'http://www.telcodata.us/query/queryexchangexml.html?npa=';	// for echange lookups
//http://www.telcodata.us/query/queryexchangexml.html?npa=207&nxx=865
var Pics =
{
	upA: "data:image/gif;base64,R0lGODlhDwAPAPMAAKbK8ABgwCBgwACAwCCAwECAwGCAwICAwECgwGCgwICgwP//AP///wAAAAAAAAAAACH5BAUAAAwALAAAAAAPAA8AAARWkMlJazUpGytPKkQgEMVGKQihIkFLmFKiEsgStsWktAGR2AOXKcEjLI43QSLGCxyBrSWDGH2mRNJd64nswaiAcJgwyOmoLlWposgg3ogEjN1WKDj4SgQAOw==",
	downA: "data:image/gif;base64,R0lGODlhDwAPAPMAAKbK8ABgwCBgwACAwCCAwECAwGCAwICAwECgwGCgwICgwP//AP///wAAAAAAAAAAACH5BAUAAAwALAAAAAAPAA8AAARWkMlJa1UqYStNQiCSaJVREGigBuRUDAQgy2oyGURALDy/KpKEQIfoJVY2xjEA661YwaGul6t1qs1ENQCUFFY7BIqQvK7EKET3dhoSCokDh+EZGeb4SQQAOw==",
	lookup: "data:image/gif;base64,R0lGODlhDwAPAPMAAABgwCBgwACAwCCAwICAwICgwP//AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUAAAcALAAAAAAPAA8AAAQ58MhJKx0BhGEn+KDQfUZZAlxFGoWpUQRQtq3xenLN2gEFmq6eTwa0ESoxzelmATk7zQ9UJZ3irJ0IADs=",
	CellImg: "data:image/gif;base64,R0lGODlhDwAPAPMAAKbK8ABgwCBgwACAwCCAwECAwGCAwICAwGCgwICgwP//AP///wAAAAAAAAAAAAAAACH5BAUAAAsALAAAAAAPAA8AAARScMlJazUoGytNUUogEMVGGUQArkNJFSogywpBTGg8AzWRSAiBbtb7LRABQm2ptCGAtp6t6esUmiFmFdobKZOUg3K1EggqCYI3JTBazGY3Zy6JAAA7"
};

var nonIE = document.getElementById && !document.all;
var topelement = nonIE ? 'HTML' : 'BODY';
var mHeight = nonIE ? '45px' : '50px';
var openToggle=true;
var isdrag=false;
var x,y;
var dobj;


function movemouse(e)
{
  if (isdrag)
  {
    dobj.style.left = nonIE ? tx + e.clientX - x : tx + event.clientX - x;
    dobj.style.top  = nonIE ? ty + e.clientY - y : ty + event.clientY - y;
    return false;
  }
}

function stopmove(e)
{isdrag=false; return false;}

function selectmouse(e)
{
  var fobj = nonIE ? e.target : event.srcElement;
  while (fobj.tagName != topelement && fobj.id != 'phonePopZ') //e.target.id != 'PhoneMap'fobj.className != "dragme"
  {
    fobj = nonIE ? fobj.parentNode : fobj.parentElement;
  }
  if (fobj.id == 'phonePopZ')
  {
    isdrag = true;
    dobj = fobj;
    tx = parseInt(dobj.style.left+0);
    ty = parseInt(dobj.style.top+0);
    x = nonIE ? e.clientX : event.clientX;
    y = nonIE ? e.clientY : event.clientY;
    return false;
  }
}

function openclosePopup()
{
	  var m = document.getElementById('phonePopZ');
	  var oc =document.getElementById('OpenICgwP');
	  var p = document.getElementById('MapICgwP');
	  var c = document.getElementById('CallgwICgwP');
	  if (openToggle)
	  {
		  oc.src = Pics.upA; oc.title ='Close';
		  m.style.height = mHeight; m.style.backgroundColor = "#abc";
		  p.style.display = 'inline'; c.style.display = 'inline';
	  }
	  else
	  {
		  oc.src = Pics.downA; oc.title ='Open or Hold & Drag';
		  m.style.height = '14px'; m.style.backgroundColor = "#cfc";
		  p.style.display = 'none'; c.style.display = 'none';
  	  }
	  openToggle = !openToggle;
}

function closeit()
{
	var m = document.getElementById('phonePopZ'); m.style.height = '0px'; m.style.display = 'none';
}

function checkSelected(e)
{

	phone = nonIE ? e.target.id : e.srcElement.id;
	if (phone != 'MapICgwP')
		return;
	phone = (window.getSelection ? window.getSelection() : document.getSelection ? document.getSelection() : document.selection.createRange().text);
	var m = document.getElementById('MapICgwP');
	if (phone == '')
		 phone = m.title;						// check last selected phone again
	phoneRE.lastIndex = 0;
	var is = phoneRE.exec(' '+phone.toString().replace(/[\f\n\r\t\v]/g,''));
	if (is)
	{
		document.getElementById('phonePopZ').style.backgroundColor = "#cfc";
		document.getElementById('CallgwICgwP').style.display = 'none';
		var phoneOrig = is[0].replace(/^[\d\s\.]/,'');
		m.title = phoneOrig;
		mapPhone.lookupPhoneMap(phoneOrig);
	}
}

function annotate(phoneOrig, href)
{
	if (href)
	{
		document.getElementById('phonePopZ').style.backgroundColor = (href.split(',').length > 2)?"#cfc" : "#abc";
		document.getElementById('MapICgwP').title = phoneOrig+' : '+href.substr(href.indexOf('q=')+2).replace(/[\s+]/g,' ');
		skypePhone(phoneOrig, href);
		window.open(href,'','top=50,width=400,height=400,resizable=yes');
	}
}

function setupEvent(elm, fName)
{  if (window.getSelection)
  	elm.addEventListener('click', fName, true);
  else
  	elm.attachEvent('onclick', fName);		// IE handler
}

function menupop(title)
{
  var dd=document;
  var ww=window;
  while (parent.dd) dd=parent.dd;
  while (parent.ww) ww=parent.ww;
  var menu = dd.createElement("span");
  menu.id = "phonePopZ";
  menu.title = title;
  var winWidth= dd.body.clientWidth;
  var winHeight=(nonIE)?ww.innerHeight :(ww.document.documentElement && ww.document.documentElement.clientHeight)?ww.document.documentElement.clientHeight:ww.document.body.clientHeight;
	with (menu.style)
	{
		position  =  "absolute";  height = "14px"; width = nonIE? "15px" : "21px";
		backgroundColor = "#cfc"; padding = "2px";border = "1px solid green";
		top = Math.round(winHeight/2).toString()+"px";
		left = (winWidth-22).toString()+"px";		//dd.body.clientWidth
		opacity = "0.85"; filter = "alpha(opacity=90)";
	}

	if (nonIE)
	{
		menu.addEventListener('mousedown', selectmouse, false);
		menu.addEventListener('mousemove', movemouse, false);
		menu.addEventListener('mouseup', stopmove, false);
		menu.addEventListener('mouseout', stopmove, false);
		menu.addEventListener('dblclick', closeit, false);
	}
	  else
	{// IE handler
		menu.attachEvent('onmousedown', selectmouse);
		menu.attachEvent('onmousemove', movemouse);
		menu.attachEvent('onmouseup', stopmove);
		menu.attachEvent('onmouseout', stopmove);
		menu.attachEvent('ondblclick', closeit);
	}

  var openclose = dd.createElement("img");
  openclose.id = "OpenICgwP";
  openclose.src = Pics.downA;
  openclose.title="Open";
  with (openclose.style)
  	{ position = "absolute"; left = "2px"; top = "1px"; margin = "0px"; width = "14px"; border = "none"; cursor = "pointer"; }
  setupEvent(openclose, openclosePopup);
  menu.appendChild( openclose );

  var lookup = dd.createElement("a");
  var lookupImg = dd.createElement("img");
  lookupImg.src = Pics.lookup;
  lookupImg.style.border = "none";
  lookupImg.id = "MapICgwP";
  lookupImg.title="Lookup Selected Phone";
  lookup.appendChild(lookupImg);
  with (lookupImg.style)
  	{position = "absolute"; cursor = 'pointer'; left = "3px"; height = "16px"; top = "18px"; width = "14px"; border = "none"; display = 'none' }
  setupEvent(lookupImg, checkSelected);

  menu.appendChild(lookup);

  var call = dd.createElement("a");
  var callImg = dd.createElement("img");
  with (callImg.style)
  	{position = "absolute"; left = "2px"; width = "14px"; top = "33px"; margin = "0px";  border = "none"; display = 'none' }
  callImg.src = Pics.CellImg;
  callImg.id = "CallgwICgwP";
  callImg.title="Call";
  call.appendChild(callImg);
  call.href = "callto:";
  call.style.height = "12px";
  menu.appendChild( call );

  return menu;
}

function getPhone(phone)
{
	// Saving time looking up same phone number(s)
	var Cached = GM_getValue("phoneZ");
	if (!Cached)
		return null;
	var ix = Cached.indexOf(phone.replace(/[\-]/g, ''));
	if (ix == -1)
		return null;
	return Cached.substr(ix).split('|',2)[1];
}

function getExchange(phone)
{
	// Saving time looking up same exchange(s)
	var Cached = GM_getValue("phoneZ");
	if (!Cached)
		return null;
	var ix = Cached.indexOf(phone.substr(0,6));
	if (ix == -1)
		return null;
	Cached = Cached.substr(ix).split('|',2)[1].split(',');
	if (Cached.length > 2)
		return Cached[1]+','+Cached[2];
	return Cached.join(',');
}

function putPhone(phone, href)
{
	if (!href)
		return;

	var Cached = GM_getValue("phoneZ");
	if (Cached && Cached.length > 1000)				// Cache holds info on about 25 phones
	{	// remove some older phones
		 var cp = Cached.split('|');
		 cp.splice(0,10);
		 Cached = cp.join('|');
	}
	Cached = Cached + phone.replace(/[\-]/g, '') + '|' + href.substr(href.indexOf('q=')+2)+ '|';
	GM_setValue("phoneZ", Cached);
}

function skypePhone(phone, href)
{
	var c = document.getElementById('CallgwICgwP');
	c.style.display = 'inline';
	c.title = 'Call '+phone;
	if (href && href.indexOf('\t') > 0)
		c.title += ' (Cell)';
	c.parentNode.href='callto://' +DialDefault + formatUSTel(phone);
}

function formatUSTel(phoneOrig)
{
	var phone = phoneOrig.replace(/[^\d]/g, '');
	if (phone.length == 7)
		return ACDefault+'-'+phone.substr(0,3)+'-'+phone.substr(3,4)
	else
		return phone.substr(0,3)+'-'+phone.substr(3,3)+'-'+phone.substr(6,4);
}

var mapPhone =
{
	xpath: function(expr, doc) 			// mimics simple xpath processing that IE dosn't support
	{
	  var ret = [];
	  if (!expr)
		return ret;
	  if (!doc)
		doc = document;
	  var args = expr.replace(/[\.\[\]\/\(\)',]/g, "").split("@").join("=").split("=");
	  var items = doc.getElementsByTagName(args[0]);
	  for (var i = 0; i < items.length; ++i)
	  {
		if (args.length > 1)
		{	// check for attribute match
			for (var x = 0; x < items[i].attributes.length; x++)
				if (items[i].attributes[x].nodeName == args[1])
				{
					ret.push(items[i]); break; break;
				}
		}
		else
		  ret.push(items[i]);
	  }
	  return ret;
	},

	lookupPhoneMap: function(phoneOrig)
	{
		var phone = formatUSTel(phoneOrig);
		var ac = phone.substr(0,3);
		if (ac == '800' || ac == '888' || ac == '877' || ac == '866')
		{
			skypePhone(phoneOrig, null);
			return;
		}
		var href = getPhone(phone);

		// check if phone info is cached
		if (href)
		{
			annotate(phoneOrig, MapsUrl+UrlParms+href);
			return;
		}
		// get phone address from Google
		GM_xmlhttpRequest
		  (
		   {
			method:  'GET',
			url:     GoogleSearchUrl + encodeURIComponent(phone),
			onload:  function(results)
			{
			  if (!GoogleMatchRE.test(results.responseText) )
				mapPhone.lookupExchange(phoneOrig);
			  else
			  { // look for 1st http://maps.google.com/maps reference
				//turn the text into a dom object

				var doc = document.createElement('div');
				doc.innerHTML = results.responseText;
				var xpathVar = ".//a[@href]";
				var links = mapPhone.xpath(xpathVar, doc);
				if (links)
					for (var n in links)
					{
						var href = links[n].getAttribute('href');
						if (href.indexOf(MapsUrl) != -1)
						{
							 putPhone(phone, href);			// save time and cache phone info
							 annotate(phoneOrig, href);
							 break;
						}
					} // end for
			   } // end if
			 }
			}
		) // end GM_xmlhttpRequest
	},

	lookupExchange: function(phoneOrig)
	{
		var phone = formatUSTel(phoneOrig);
		var href = getExchange(phone);		// check if exchange info is cached
		if (href)
			annotate(phoneOrig, MapsUrl+UrlParms+href);
		else
		// get US town, state based on area code & exchange
		GM_xmlhttpRequest
		  (
		   {
			method:  'GET',
			url:     ExhcSearchUrl + phone.substr(0,3) +'&nxx='+phone.substr(4,3),
			onload:  function(results)
			{
				if (results.responseText.indexOf('<valid>YES') > 0)
				{
					//turn the text into a dom object and extract US town and state
					var doc = document.createElement('div');
					doc.innerHTML = results.responseText;
					var xpathVar = ".//englishname";
					var nodes = mapPhone.xpath(xpathVar, doc);
					if (nodes[0].firstChild == null)
					{	// try other name
						xpathVar = ".//ratecenter";
						nodes = mapPhone.xpath(xpathVar, doc);
					}
					var href = MapsUrl+UrlParms;
					if (nodes)
						href = href + nodes[0].firstChild.textContent.replace(/[\ ]/g, '+');
					xpathVar = ".//state";
					nodes = mapPhone.xpath(xpathVar, doc);
					if (nodes)
						href = href +',+' + nodes[0].firstChild.textContent;
					xpathVar = ".//companytype";
					nodes = mapPhone.xpath(xpathVar, doc);
					if (nodes && nodes[0].firstChild.textContent == 'WIRELESS')
						href = href + '\t';
					annotate(phoneOrig, href);
					putPhone(phone, href);
				} // end if
			 }
			}
		) // end GM_xmlhttpRequest
	}

} // end mapPhone


document.getElementsByTagName(topelement)[0].appendChild(menupop('Select a phone to map or Double Click to Exit'));


})();