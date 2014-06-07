// ==UserScript==
// @name           CRC RUR
// @description    chenge Us dollar to ru rubles on CRC.com
// @author         Виктор Виктор work4victor@mail.ru
// @version        0.4
// @history 0.1    17.07.12 - Начало
// @history 0.2    17.07.12 - Начало
// @history 0.3    18.07.12 - курс USD по cbr.ru
// @history 0.3    05.09.12 - считается по свежему курсу, исправлен баг с загрузкой jQuery
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "jQuery.noConflict();(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
var curs;
// Accepts a url and a callback function to run.
			function requestCrossDomain(site, callback) {
			 
				// If no url was passed, exit.
				if (!site) {
					alert('No site was passed.');
					return false;
				}
			 
				// Take the provided url, and add it to a YQL query. Make sure you encode it!
				var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=xml&callback=?';
			 
				// Request that YSQL string, and run a callback function.
				// Pass a defined function to prevent cache-busting.
				$.getJSON(yql, cbFunc);
			 
				function cbFunc(data) {
					// If we have something to work with...
					if (data.results[0]) {
						if (typeof callback === 'function') {
							callback(data);
						}
					}
					// Else, Maybe we requested a site that doesn't exist, and nothing returned.
					else throw new Error('Nothing returned from getJSON.');
				}
			}		

			function tdChange(cursn){
				
				$('td').each(function(i){
					if(typeof $(this) == "object"){
						if($(this).html().indexOf('$') > -1){
							$(this).html($(this).html().toString().replace(/\$([0-9.]+)/gi, function (str, p1, offset, s){ var pf = parseFloat(p1); var price = (pf * cursn).toFixed(2)+' руб.'; return '<abbr title=\'1 USD = '+(cursn).toFixed(2)+'\'>'+price+'</abbr>'}));
						}
					}
				});
			return true;
			}



if (document.location.host == 'www.chainreactioncycles.com'){

var currentTime = new Date();
var day = currentTime.getDate();
if(day.toString().length == 1){day = "0"+day;}
var month = currentTime.getMonth() + 1;
if(month.toString().length == 1){month = "0"+month;}
var year = currentTime.getFullYear();
var date_req = day + "/" + month + "/" + year;
var domain = 'http://www.cbr.ru/scripts/XML_daily.asp?date_req='+date_req;
	requestCrossDomain(domain,function(data){
		xml = data.results[0];
		$(xml).find("Valute").each(function(){
			if($(this).attr('ID')=='R01235') {
				curs = parseFloat($(this).find("Value").text().replace(',','.'));
				tdChange(curs);
				$('abbr').css('cursor','help');
				$('#NavTop_NavTopDisplayStyle3_LblTime').append(' Курс $ = '+curs); 
			}
		});
	});
}//if
		
	
}//main

addJQuery(main);