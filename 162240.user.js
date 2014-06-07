// ==UserScript==
// @name       Gesca2VCalendar
// @namespace  http://userscripts.org/users/503736
// @version    0.3
// @description  El título ya vale
// @match      http://gesca.svb.lacaixa.es/browse/IOP-*
// @match      https://gesca.svb.lacaixa.es/browse/IOP-*
// @downloadURL http://userscripts.org/scripts/source/162240.user.js
// @updateURL http://userscripts.org/scripts/source/162240.meta.js
// @copyright  2013+, Yo!
// ==/UserScript==

	//Adapted from Andrea Giammarchi - http://webreflection.blogspot.com/2009/07/ecmascript-iso-date-for-every-browser.html
	Date.prototype.toISOString  = function(){
		        function t(i){return i<10?"0"+i:i;}
		        function h(i){return i.length<2?"00"+i:i.length<3?"0"+i:3<i.length?Math.round(i/Math.pow(10,i.length-3)):i;}
	            return "".concat(
	                this.getUTCFullYear(), "",
	                t(this.getUTCMonth() + 1), "",
	                t(this.getUTCDate()), "T",
	                t(this.getUTCHours()), "",
	                t(this.getUTCMinutes()), "",
	                t(this.getUTCSeconds()), "",
	                 "Z"
	            );
	};
	
var a=document.getElementById('tab1');
var i=0;
for (i=0;i<a.rows.length;i++){
  switch(parseInt(a.rows[i].id.split('_')[1],0)){
    case 10482:  // Desc
      var title=a.rows[i].children[1].textContent.trim();
      break;
    case 10150:  // Producte --> LOCATION
      var loc=a.rows[i].children[1].textContent.trim();
      break;
    case 10450:  // ExecTime
      var t=a.rows[i].children[1].textContent.trim();
      var bound=t.indexOf(' ');
      var d_date=t.slice(0,bound).split('/');
      var d_time=t.slice(bound+1,-1).split(':');
      var execTime=new Date(d_date[2],d_date[1]-1,d_date[0],d_time[0],d_time[1],0,0);
      break;      
    case 10480:  // Durada (split ('/')
      var durada=a.rows[i].children[1].textContent.trim().split('/')[0];
      durada=parseInt(durada.split(':')[0],0)*60+parseInt(durada.split(':')[1],0);
      var endTime=new Date(execTime.getTime() + durada*60000);
      break;
    case 10321: // Hostnames
      var hosts=a.rows[i].children[1].textContent.trim();
      break;
    }
}

switch(loc){
    case 'ARXIU DOCUMENTAL CORPORATIU':
        location='ITA';break;
    case 'BASE DE DADES NOVA INTRANET':
        location='ITA';break;
    case 'CAU':
        location='ITA';break;
    case 'DECISIÓN TIEMPO REAL ORACLE':
        location='ITA';break;
    case 'HARVEST':
        location='ITA';break;
    case 'IGA-ORACLE':
        location='ITA';break;
    case 'IGA-SAS':
        location='ITA';break;
    case 'IGA-WAS':
        location='ITA';break;
    case 'INTRANET-INFRASTRUCTURA':
        location='ITA';break;
    case 'INTRANET-ORACLE':
        location='ITA';break;
    case 'ORACLE CORP E':
        location='COR';break;
    case 'ORACLE CORP V':
        location='COR';break;
    case 'PERFORMANCE MONITORING':
        location='COR';break;
    case 'WAS CORPORATIU':
        location='ITA';break;
    case 'WAS CORPORATIU-INFRASTRUCTURA':
        location='ITA';break;
    case 'VALORS ICA CAIXA':
        location='TRE';break;
    case 'CAIFOR ICA':
        location='TRE';break;
    case 'INVERCAIXA ICA':
        location='TRE';break;
  default:
    location='UNK';break;
}

var IOP=document.title.split('#')[1].split(']')[0];
var vcsBody=a.parentNode.innerHTML;

gCalURL = 'https://www.google.com/calendar/event?action=TEMPLATE&text=' + encodeURIComponent(location + ' ' + IOP + ' ' + title) + '&dates=' + execTime.toISOString() + '/' + endTime.toISOString() + '&location=' + encodeURIComponent(hosts) + '&details=' + encodeURIComponent('More on ' + document.URL) + '&sprop=name:';
//window.alert(gCalURL);


var elemParent = document.getElementById('issueContent').children[1].children[0].children[0].children[0].children[0].children[0].children[0];

var injectGCalButton = function(){

		var td = document.createElement('td');
		//td.setAttribute("class","data");
		td.innerHTML = '<a href="' + gCalURL + '" target="_blank"><img src="//www.google.com/calendar/images/ext/gc_button6.gif" border=0></a>';
	
		elemParent.appendChild(td);
		
		//elemMoreInfo.appendChild(tr2.cloneNode(true));
	}();
	
