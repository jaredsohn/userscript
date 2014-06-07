// ==UserScript==
// @name            PolskiBus: reservation calendar link adder
// @description     Add calendar link to PolskiBus reservations
// @namespace       http://sepczuk.com/
// @version         0.01
// @include         http://www.polskibus.com/ecard/voucher/*
// @match           http://www.polskibus.com/ecard/voucher/*
// @copyright       2012, Damian Sepczuk
// @downloadURL     https://userscripts.org/scripts/source/138944.user.js
// @updateURL       https://userscripts.org/scripts/source/138944.meta.js
// ==/UserScript==

function mainWrapper(){
    function main(){
//---------------------------------------------------------------------------------------------------------------------
$('.journey').each(function(){
   function prefixWith0ifNeeded(n) {
	   return ('0'+n).substr(-2);
   }
   function getLocalYYYYMMDDfromDate(d) {
	   return ''+d.getFullYear()+prefixWith0ifNeeded(d.getMonth()+1)+prefixWith0ifNeeded(d.getDate());
   }
   var e = $(this);
   var rNumber = e.find('.number').text();
   var _headers = e.find('strong');
   var description = _headers[1].nextSibling.nodeValue;
   var d = new Date(_headers[2].nextSibling.nodeValue);
   
   var dateStart = getLocalYYYYMMDDfromDate(d);
   
   var nextDay = new Date(d);
   nextDay.setDate(nextDay.getDate()+1);
   nextDay = getLocalYYYYMMDDfromDate(nextDay);

   var timeStart = _headers[4].nextSibling.nodeValue;
   var timeEnd = _headers[5].nextSibling.nodeValue;
   
   var price = _headers[6].nextSibling.nodeValue + ' + ' +
               _headers[7].nextSibling.nodeValue;
   
   var dateEnd = (timeStart > timeEnd)?nextDay:dateStart;
   
   var departCity = description.substr(0, description.indexOf(','));
   
   var calendarUrl = 'http://www.google.com/calendar/event?action=TEMPLATE'
        + '&text=' + encodeURIComponent('Polski Bus, ' + rNumber)
		+ '&dates=' + dateStart + 'T' + timeStart + '00/' + dateEnd + 'T' + timeEnd + '00'
		+ '&sprop=' + encodeURIComponent('website:www.polskibus.com')
		+ '&details=' + encodeURIComponent(description + "\n\nCost: " + price)
		+ '&location=' + departCity
		+ '&trp=true'
   e.append(  '<div style="margin-top: 5px">'
            +     '<a href="' + calendarUrl + '" target="_blank">'
			+         '<img src="//www.google.com/calendar/images/ext/gc_button6.gif" border="0">'
			+     '</a>'
			+ '</div>')
   //console.log(calendarUrl)
});
//---------------------------------------------------------------------------------------------------------------------
    };

    main();
};


if (!document.xmlVersion) {
    var script = document.createElement('script');
    script.appendChild(document.createTextNode('('+ mainWrapper +')();'));
    document.documentElement.appendChild(script);
}