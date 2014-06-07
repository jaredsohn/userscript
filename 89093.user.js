// OnBux Manager
// version 0.9
// 2010-08-09
// Copyright (c) 2010, DTWPT
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "OnBux Manager", and click Uninstall.
// ==UserScript==
// @name           OnBux Manager
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/45988.user.js
// @namespace      www.onbux.dtwpt.com
// @description    Gestor de informa??oo no onbux
// @include        http://www.onbux.com/rented*
// @include        http://www.onbux.com/direct*
// ==/UserScript==

USP.theScriptName = 'Onbux Manager - RO';
USP.init({theName:'member', theText:'Tip de Membru?', 
          theValues:['Pioneer','Standard','Golden','Ultimate'], theDefault:'Standard'},
          {theName:'lang', theText:'Lingua?', 
          theValues:['RO','EN'], theDefault:'RO'},
          {theName:'reciclagem', theText:'Calculati profit cu costuri de reciclare?', theDefault:false},
          {theName:'renovar', theText:'Calculati profit cu reinoire?', theDefault:false},
          {theName:'trenovar', theText:'Reinoire:', theDefault:30}

    );
GM_registerMenuCommand('Preferences for ~'+USP.theScriptName+'~', USP.invoke);

if (USP.getValue('lang')=='undefined'){
	USP.invoke
}
var onbuxLangStrings = {
// -> Scriptul ruleaza in limba Romane si Engleza
  EN : {
    'noClicks': 'No clicks',
    'today': 'Today',
    'yesterday': 'Yesterday',
    'Standard': '[Standard',
    'Pioneer': '[Pionner',
    'Golden': '[Golden',
    'Ultimate': '[Ultimate',
    'clickedtoday': 'Clicked Today:',
    'clickedyesterday': 'Clicked Yesterday:',
    'neverclicked': 'Never Clicked:',
    'tclicks': 'Total clicks:',
    'average': 'Clicks Average',
    'profit': 'Profit',
    'timeago': 'Days ago',
  },

  RO : {
    'noClicks': 'Fara clickuri',
    'today': 'Azi',
    'yesterday': 'Ieri',
    'Standard': '[Standard',
    'Pioneer': '[Pionner',
    'Golden': '[Golden',
    'Ultimate': '[Ultimate',
    'clickedtoday': 'Click-uri azi:',
    'clickedyesterday': 'Click-uri ieri',
    'neverclicked': 'Nici un click:',
    'tclicks': 'Total clic-uri:',
    'average': 'AVG click-uri',
    'profit': 'Profit',
    'timeago': 'Zile in urma'
  }
};


    var totalclicks=0;
    var totaltoday=0;
    var totalyesterday=0;
    var totalnever=0;
    var totalavg=0;
    var count=0;
    
    
function localString(key,text) 
{
  var string;
  var language = USP.getValue('lang');
  
  if('undefined' !== typeof onbuxLangStrings[language]) {
    string = onbuxLangStrings[language][key]; 
  }
  else if('undefined' !== typeof onbuxLangStrings['en']) 
  {
    GM_log('Error getting language string. Defaulting to English.\nRequested key: '+key); 
    string = onbuxLangStrings[language][key]; 
  }
  else {
    GM_log('Error getting language string.\nRequested key: '+key); 
    return key;
  }
  
  if (text) {
    string = string.replace('%s', text); 
  }
  
  return string;
}    
    
$(document).ready(function() {
	$('#master tr:first').append('<td class="dref">'+localString('profit')+'</td>');
    $('#master tr').each(function() {
    if (!this.rowIndex) return; // skip first row
    var refnumber = this.cells[0].innerHTML;
    var lclick = $(this).find("td").eq(4).html();
    var clicks = $(this).find("td").eq(5).html();
    var avg = $(this).find("td").eq(6).html();
    refnumber = parseFloat(refnumber);
var earned=0;
    
    if(refnumber>=0){
var local=location.href;
	if (local.match(/rented.*/)){    
	if (USP.getValue('member')=='Standard'){
        earned=clicks*0.005;
        if (USP.getValue('reciclagem')==true){
	    earned=earned-0.08;
        }
        if (USP.getValue('renovar')==true){
	    var rewew=0;
	    if (USP.getValue('trenovar')==30){
		    renew=Math.ceil((0.25*1));
		    earned=earned-renew;
	    }
	    if (USP.getValue('trenovar')==60){
		   renew=Math.ceil((0.25*2)-((0.25*2)*0.10));
		   earned=earned-renew;
	    }
	    if (USP.getValue('trenovar')==90){
		    renew=Math.ceil((0.25*3)-((0.25*3)*0.20));
		    earned=earned-renew;
	    }

    }

    }
    if (USP.getValue('member')=='Pioneer'){
        earned=clicks*0.005;
        if (USP.getValue('reciclagem')==true){
	    earned=earned-0.08;
        }
                if (USP.getValue('renovar')==true){
	    var rewew=0;
	    if (USP.getValue('trenovar')==30){
		    renew=Math.ceil((0.24*1));
		    earned=earned-renew;
	    }
	    if (USP.getValue('trenovar')==60){
		   renew=Math.ceil((0.24*2)-((0.24*2)*0.10));
		   earned=earned-renew;
	    }
	    if (USP.getValue('trenovar')==90){
		    renew=Math.ceil((0.24*3)-((0.24*3)*0.20));
		    earned=earned-renew;
	    }

    }
        
    }
    if (USP.getValue('member')=='Golden'){
        earned=clicks*0.01;
        if (USP.getValue('reciclagem')==true){
	    earned=earned-0.07;
        } 
                if (USP.getValue('renovar')==true){
	    var rewew=0;
	    if (USP.getValue('trenovar')==30){
		    renew=Math.ceil((0.20*1));
		    earned=earned-renew;
	    }
	    if (USP.getValue('trenovar')==60){
		   renew=Math.ceil((0.20*2)-((0.20*2)*0.10));
		   earned=earned-renew;
	    }
	    if (USP.getValue('trenovar')==90){
		    renew=Math.ceil((0.20*3)-((0.20*3)*0.20));
		    earned=earned-renew;
	    }

    }
    }
    if (USP.getValue('member')=='Ultimate'){
        earned=clicks*0.01;
        if (USP.getValue('reciclagem')==true){
	    earned=earned-0.05;
        } 
        if (USP.getValue('renovar')==true){
	    var rewew=0;
	    if (USP.getValue('trenovar')==30){
		    renew=Math.ceil((0.20*1));
		    earned=earned-renew;
	    }
	    if (USP.getValue('trenovar')==60){
		   renew=Math.ceil((0.20*2)-((0.20*2)*0.10));
		   earned=earned-renew;
	    }
	    if (USP.getValue('trenovar')==90){
		    renew=Math.ceil((0.20*3)-((0.20*3)*0.20));
		    earned=earned-renew;
	    }

    }   
    }

    if (USP.getValue('apagamento')==true){
	    
    }
	}else{
	if (USP.getValue('member')=='Standard'){
        earned=clicks*0.005;
    }
    if (USP.getValue('member')=='Pioneer'){
        earned=clicks*0.005;
    }
    if (USP.getValue('member')=='Golden'){
        earned=clicks*0.01;

    }
    if (USP.getValue('member')=='Ultimate'){
        earned=clicks*0.01;
    } 
		
	}	
	    
  earned = Math.round(earned*1000)/1000;  
if(earned<=0){
  $(this).append('<td style="color:red;">$'+ earned +'</td>');
}else{
  $(this).append('<td style="color:green;">$'+ earned +'</td>');
}
  clicks = parseFloat(clicks);
  avg = parseFloat(avg);
  //last click handler
  if(lclick=='No clicks yet')
  {
	  totalnever=totalnever+1;
  }
  if(lclick=='Today')
  {
	  totaltoday=totaltoday+1;
  }
    if(lclick=='Yesterday')
  {
	  totalyesterday=totalyesterday+1;
  }
  if(lclick=='No clicks yet')
  {
	var local=location.href;
	if (local.match(/direct.*/)){
		var noclick_date=$(this).find("td").eq(3).html();  
		
	}else{
		var noclick_date=$(this).find("td").eq(2).html();  
		
	}
	
	var myDate = new Date(noclick_date);
	var data=myDate.getTime();
	var today=new Date();
	var one_day=1000*60*60*24;
	var last_click=Math.ceil((today.getTime()-myDate.getTime())/(one_day));
	$(this).find("td").eq(4).html(last_click+ ' '+localString('timeago'));
  }else{
	  
   if(lclick=='Today')
   {
	   $(this).find("td").eq(4).html(localString('today'));
   
   }else{
	   if(lclick=='Yesterday')
   {
	   $(this).find("td").eq(4).html(localString('yesterday'));
   
   }else{   
	var lastclick_date=$(this).find("td").eq(4).html();  
	var myDate = new Date(lastclick_date);
	var data=myDate.getTime();
	var today=new Date();
	var one_day=1000*60*60*24;
	var last_click=Math.ceil((today.getTime()-myDate.getTime())/(one_day));
	$(this).find("td").eq(4).html(last_click+ ' '+localString('timeago'));
}}
}
  
  
  
  
  
  	   totalclicks=totalclicks+clicks;
       totalavg=totalavg+avg;
       count=count+1;
	 
    }else{
 var div="g"+realdiv;
    //Futuramente Info detalhada!


    }

    realdiv=refnumber-1;
    

   });
   var average=totalavg/count;
   average = Math.round(average*1000)/1000;
   $('#master tr:last').append('<td class="dref" colspan="9">'+localString('clickedtoday')+' '+totaltoday+' | '+localString('clickedyesterday')+' '+totalyesterday+' | '+localString('neverclicked')+' '+totalnever+' | '+localString('tclicks')+' '+ totalclicks +' | '+localString('average')+' '+ average +'</td>');

});
   
//copyright DTWPT 2010.
//Desenvolvido para uso exclusivo em onBUX LDta
//Criado e Desenvolvido por CEO da DTWPT
//Todos os Direitos reservados
//para mais informa??es e pedidos consultem a p?gina do forum!
//o script e totalmente freeware!
//Outras informa??es geral@dtwpt.com