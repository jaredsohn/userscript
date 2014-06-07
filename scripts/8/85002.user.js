// ==UserScript==
// @name           NightClubber Next Events Pro v1
// @namespace      NightClubber
// @description    Enhancement NightClubber next event grid
// @include        http://www.nightclubber.com.ar/
// @include        http://www.nightclubber.com.ar/#*
// ==/UserScript==

/*** Helper objects ***/

function club()
{
	this.clubName = '';
	this.clubURLImage = '';
	this.filtered = false;
}

function ncEvent(list)
{
	var clubElement = list[0].firstChild;
	var eventElement = isolateAnchor(list[1].innerHTML).toElement();
	var eventRespElement = list[2].firstChild;
	var eventVisitedElement = list[3].firstChild;
	
	this.clubName = getClubName();
	this.clubUrlImage = getClubUrlImage();
	
	this.eventDate = getEventDate();
	this.eventName = getEventName(); 
	this.eventUrl = getEventUrl();
	this.eventResp = getEventResponses();
	this.eventVisit = getEventVisited();
	
	function isolateAnchor(str)
	{
		return str.substring(4, (str.length-6));
	}
	
	function getClubName()
	{
		if (clubElement != null)
		{
			return clubElement.title;
		}
	}
	
	function getClubUrlImage()
	{
		if (clubElement != null)
		{
			return clubElement.src;
		}
	}
	
	function getEventDate()
	{
		if (eventElement != null)
		{
			var texto = eventElement.innerHTML;
			
			return new Date().parseNC(texto);
		}
	}
	
	function getEventName()
	{
		if (eventElement != null)
		{
			var texto = eventElement.innerHTML;
			var sep1 = texto.indexOf("-", 1)+1;
			
			return trim(texto.substring(sep1, texto.length));
		}
	}
	
	function getEventUrl()
	{
		if (eventElement != null)
		{
			return eventElement.href;
		}
	}
	
	function getEventResponses()
	{
		if (eventRespElement != null)
		{
			return eventRespElement.innerHTML;
		}
	}
	
	function getEventVisited()
	{
		if (eventVisitedElement != null)
		{
			return eventVisitedElement.innerHTML;
		}
	}
}

/*** Prototypes *******/

String.prototype.toElement = function(){
	var t=document.createElement("div");
	t.innerHTML=this;
	
	return t.getElementsByTagName("*")[0];
}
Date.prototype.parseNC = function(str)
{
	var ret = null;
	
	var sep1 = str.indexOf(' ', 1);
	var sep2 = str.indexOf('-', 1);
	
	str = str.substring(sep1, sep2);
	
	var values = trim(str).split('.');
	
	if(values.length == 3)
	{
		var day = parseInt(values[0]); month = parseInt(values[1])-1; year = 0;
		
		if (values[0].substring(0, 1) == "0")
		{
			day = parseInt(
				values[0].substring(1, 2)
			);
		}
		
		if (values[1].substring(0, 1) == "0")
		{
			month = parseInt(
				values[1].substring(1, 2)
			)-1;
		}
		
		year = parseInt("20" + values[2]);
		
		ret = new Date();
		
		ret.setDate(day);
		ret.setMonth(month);
		ret.setFullYear(year);
	}
	
	return ret;
}
Array.prototype.containsClub = function (element) {
	for (var i = 0; i < this.length; i++){
		if (this[i].clubName == element.clubName){
			return true;
		}
	}
	
	return false;
}

/*** Helper functions */

function trim(str)
{
	return str.replace(/^\s*|\s*$/g,"");
}
function toGrayScale(imgObj){
	var canvas = document.createElement('canvas');
	
	var canvasContext = canvas.getContext('2d');
	
	var imgW = imgObj.width;
	var imgH = imgObj.height;
	
	canvas.width = imgW;
	canvas.height = imgH;
	
	canvasContext.drawImage(imgObj, 0, 0);
	
	var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);
	
	for(var y = 0; y < imgPixels.height; y++){
	     for(var x = 0; x < imgPixels.width; x++){
	          var i = (y * 4) * imgPixels.width + x * 4;
	          var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
	          imgPixels.data[i] = avg;
	          imgPixels.data[i + 1] = avg;
	          imgPixels.data[i + 2] = avg;
	     }
	}
	
	canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	
	return canvas.toDataURL();
}

function CreateFilterPopup(clubs)
{
	var content = '';
	
	clubs.forEach(function(current)
		{
			content += '<img border="0" filtered="false" onclick="return toggleDisplay(this);" title="' + current.clubName + '" src="' + current.clubURLImage + '" alt="">'
		});
	
	return '<div id="clubsFilter" class="club-filter displayNone"><h1>Clubs a filtrar (' + clubs.length + ')</h1>' + content + '</div>';
}

function getClubDistinct(eventos)
{
	var ret = new Array(); var e = 0;
	
	for (var i = 0; i < eventos.length; i++)
	{
		var toAdd = new club();
		
		toAdd.clubName = eventos[i].clubName;
		toAdd.clubURLImage = eventos[i].clubUrlImage;
		toAdd.filtered = false;
		
		if(!ret.containsClub(toAdd))
			ret[e++] = toAdd;
	}
	
	return ret;
}

function attachToHead(tag, sriptType, content)
{
	var pageHead = document.getElementsByTagName('head')[0];
	var newScript = document.createElement(tag);
	
	if (pageHead != null)
	{
		newScript.type = sriptType
		newScript.innerHTML = content;
		
		pageHead.appendChild(newScript);
	}
}

function styleSheet()
{
	return ".collapsed, .filtered, .displayNone { display: none; } .club-filter { position: absolute; padding: 0px; border: 1px solid #99CC33; background: #1E3042; width: 240px; } .club-filter h1 { background: #91C230 url(http://www.nightclubber.com.ar/foro/mainframe/gradients/gradient_thead.gif) repeat-x top left; font-size: 8pt; font-family: tahoma; padding: 4px; color: #1E3042; margin: 1px 1px 2px 1px; }  .club-filter img { margin: 2px; } .club-filtered { background: red; }";
}

function findPosX(obj)
{
  var curleft = 0;
  if(obj.offsetParent)
      while(1) 
      {
        curleft += obj.offsetLeft;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.x)
      curleft += obj.x;
  return curleft;
}

function findPosY(obj)
{
  var curtop = 0;
  if(obj.offsetParent)
      while(1)
      {
        curtop += obj.offsetTop;
        if(!obj.offsetParent)
          break;
        obj = obj.offsetParent;
      }
  else if(obj.y)
      curtop += obj.y;
  return curtop;
}

function hideClubFilter(e)
{
	var target = e ? e.target : event.srcElement;

	if (target.id != 'clubsFilter' && target.id !='filter-img' && target.parentNode.id != 'clubsFilter')
	{
		var element = document.getElementById('clubsFilter')
		
		if(!hasClass(element, 'displayNone'))
			addClass(element, 'displayNone');
	}
}

function filter()
{
	var clubsFilter = document.getElementById('clubsFilter');
	var tableBody = document.getElementById('collapseobj_module_11');
	
	if (clubsFilter != null && tableBody != null)
	{
		clubsFilter.style.left = (findPosX(tableBody) - 248) + 'px';
		clubsFilter.style.top = findPosY(tableBody) + 'px';
		
		removeClass(clubsFilter, 'displayNone');
	}
	
	return false;
}

function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls))
	{
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

/*** Events ************/

function toggleDisplay(clubImg)
{
	var clubName = clubImg.title;
	var tableBody = document.getElementById('collapseobj_module_11');
	var filtered = false;
	
	if (tableBody != null)
	{
		var rows = tableBody.getElementsByTagName('tr');
		filtered = (clubImg.getAttribute('filtered') == 'true') ? true : false;
		
		for(var i = 0; i < rows.length; i++)
		{
			var currentRow = rows[i];
			
			if (currentRow.className != '')
			{
				var td = currentRow.getElementsByTagName('td')[0]
				var imgClub = td.innerHTML.toElement();
				
				if (imgClub.title == clubName)
				{
					if (filtered)
						removeClass(currentRow, 'filtered');
					else
						addClass(currentRow, 'filtered');
				}
			}
		}
		
		clubImg.setAttribute('filtered', 
			filtered ? false : true
		);
		
		filtered = !filtered;
		
		if (filtered){
			clubImg.original = clubImg.src;
			clubImg.src = toGrayScale(clubImg);
			addClass(clubImg, 'club-filtered');
		}else{
			clubImg.src = clubImg.original;
			clubImg.original = null;
			removeClass(clubImg, 'club-filtered');
		}
	}
}
function collapse(toCollapse, sender)
{
	var tableBody = document.getElementById('collapseobj_module_11');
	var display = "block"; var img_re = null;
	
	if (tableBody != null)
	{
		var rows = tableBody.getElementsByTagName('tr');
		var img = sender.firstChild;
		
		for (var rowIndex = 1; rowIndex < rows.length; rowIndex++)
		{
			var element = rows[rowIndex];
			
			if (hasClass(element, toCollapse))
			{
				if (hasClass(element, 'collapsed'))
					removeClass(element, 'collapsed');
				else{
					addClass(element, 'collapsed');
					display = "none";
				}
			}
		}
		
		if (display == "none")
		{
			img_re = new RegExp("\\.gif$");
			img.src = img.src.replace(img_re, '_collapsed.gif'); 			
		}
		else
		{
			img_re = new RegExp("_collapsed\\.gif$");
			img.src = img.src.replace(img_re, '.gif'); 
		}
	}
	
	return false;
}

/*** Table functions ***/

function CreateNewEventsTableWith(arrayEventos)
{
	var ret = '<tr>' + createFilterHead("width: 40px;") + 
		createHead("Eventos por Realizarse (" + arrayEventos.length + ")") + 
		createHead("Resp", "width: 28px;") + 
		createHead("Visitas", "width: 43px") + '</tr>';
	
	var prevDate = null;
	var others = [];
	
	for (var index = 0; index < arrayEventos.length; index++)
	{
		var currentNCEvent = arrayEventos[index];
		var eventDate = null;
		var today = new Date().format('dd/mm/yyyy');
		var tomorrow = new Date();
		
		if(currentNCEvent.eventDate == null)
		{
			others.push(currentNCEvent);
		}
		else
		{
			var ncEventDay = currentNCEvent.eventDate.format('dd/mm/yyyy');
			
			tomorrow.setDate(tomorrow.getDate() + 1);
			
			tomorrow = tomorrow.format('dd/mm/yyyy');
			
			if (ncEventDay == today)
				eventDate = "Hoy - " + ncEventDay;
			else if(ncEventDay == tomorrow)
				eventDate = "Mañana - " + ncEventDay;
			else
				eventDate = currentNCEvent.eventDate.format('dddd dd/mm/yyyy')
			
			var toCollapse = currentNCEvent.eventDate.format('dddd-dd')
			
			if (prevDate != eventDate)
			{
				ret += createDateRow(eventDate, toCollapse);
				prevDate = eventDate;
			}
			
			ret += createRow(currentNCEvent, toCollapse);
		}
	}
	
	if(others.length > 0)
	{
		ret += createDateRow('Otros eventos', 'otros');
		
		for (var index = 0; index < others.length; index++)
		{
			ret += createRow(others[index], 'otros');
		}
	}
	
	return ret;
}
function createDateRow(text, classToCollapse)
{	
	var collapseLink = '<a style="margin-left: 4px;" title="Ocultar/Mostrar eventos del d&iacute;a" onclick="return collapse(\'' + classToCollapse + '\', this)" href="#top">' + 
		'<img border="0" alt="" id="" src="http://www.nightclubber.com.ar/foro/mainframe/buttons/collapse_tcat.gif">' +
		'</a>';
	
	return '<tr><td class="thead">' + collapseLink + '</td><td colspan="3" class="thead">' + text + '</td></tr>';
}

function createFilterHead(style)
{
	var ret = "";
	var imgURL = "http://imgur.com/1KYbP.gif";
	
	ret = '<td class="thead" style="' + style + '">' +
		'<a style="margin: 4px 0pt 0pt 4px;" title="Ocultar/Mostrar clubs" onclick="return filter()" href="#top">' +
			'<img id="filter-img" src="' + imgURL + '" alt="Filtrar" border="0"/>' +
		'</a></td>';
	
	return ret;	
}

function createHead(text, style)
{
	var ret = "";
	
	if (style != null)
		ret = '<td class="thead" style="' + style + '">' + text + ' </td>';
	else
		ret = '<td class="thead">' + text + ' </td>';
	
	return ret;
}
function createRow(ncevent, addClass)
{
	var club = '<td class="alt2"><img border="0" title="'+ ncevent.clubName +'" src="'+ ncevent.clubUrlImage +'" alt=""/></td>';
	var ev = '<td class="alt1"><a title="" href="' + ncevent.eventUrl + '">' + ncevent.eventName + '</a></td>';
	var resp = '<td class="alt1" align="center"><span class="smallfont">' + ncevent.eventResp + '</span></td>';
	var visit = '<td class="alt2" align="center"><span class="smallfont">' + ncevent.eventVisit + '</span></td>';
	
	var ret = '<tr class="' + addClass + '">' + club + ev + resp + visit + '</tr>';
	
	return ret;
}

/*** Main *************/

function onload()
{
	attachToHead('script', 'text/javascript', 
		collapse + filter + addClass + hasClass + removeClass + findPosX + findPosY + hideClubFilter + toggleDisplay + 
		toGrayScale + 'String.prototype.toElement = ' + new String().toElement + ';' +
		'document.body.addEventListener("click", hideClubFilter, false );');
	
	attachToHead('style', 'text/css', styleSheet());
	
	var tableBody = document.getElementById('collapseobj_module_11');
	
	if (tableBody != null)
	{
		var rows = tableBody.getElementsByTagName('tr');
		var eventos = new Array(); var index = 0;
		
		for (var i = 1; i < rows.length; i++)
		{
			var ev = new ncEvent(
				rows[i].getElementsByTagName('td')
			);
			
			eventos[index++] = ev;
		}
		
		eventos.sort(function(a, b){
			var dateA=new Date(a.eventDate), dateB=new Date(b.eventDate)
			return dateA-dateB
		});
		
		clubs = getClubDistinct(eventos);
		
		tableBody.innerHTML = CreateNewEventsTableWith(eventos) + CreateFilterPopup(clubs);
	}
}

window.addEventListener("DOMContentLoaded", onload, false );


/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNames: [
		"Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab",
		"Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
	],
	monthNames: [
		"Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec",
		"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
	]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};