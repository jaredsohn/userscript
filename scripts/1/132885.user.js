// ==UserScript==
// @name           JustBeenPaid! JBP JSS JSS-Tripler
// @description    New style and new features
// @namespace      http://userscripts.org/scripts/show/132885
// @author         Blues
// @include        *justbeenpaid.com*
// @include        *profitclicking.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/132885.meta.js
// @version        1.42
// ==/UserScript==

var version = 1.42;
var hostname = new String( window.location.hostname );
var path     = new String( window.location.pathname );
var href     = new String( window.location.href );

/* =============== FUNCTIONS ===============*/


	function addDays(myDate,days) {
		myDate = new Date(myDate);
		return new Date(myDate.getTime() + days*24*3600*1000);
	}
	function substractDays(myDate,days) {
		myDate = new Date(myDate);
		return new Date(myDate.getTime() - days*24*3600*1000);
	}
	function formatDate(date){
	    var month = date.getMonth()+1 ;
	    month     = (month <10) ?  "0" + month : month;
	    var day   = (date.getDate() < 10) ? "0" + date.getDate() : date.getDate();
		return	date.getFullYear() + "-" + month + "-" + day;
	}
	function inArray(needle, haystack) {
	    var length = haystack.length;
	    for(var i = 0; i < length; i++) {
	        if(haystack[i] == needle) return true;
	    }
	    return false;
	}
	String.prototype.contains = function(needle){ 
			haystack = new String( this );
			// console.log( "haystack: " + haystack );
			
			if(typeof needle === "object"){
				for(var text in needle ){			
					if(haystack.indexOf(needle[text]) > -1 ) {
					 	return true;
					}
				}
				return false;
			}else{
				return (haystack.indexOf(needle) > -1) ? true : false;	 
			}
	}

	function addZero(num){
		num = parseInt( num );
		return (num < 10) ? "0" + num : num;
	}
/* =============== END FUNCTIONS ===============*/

if(!href.contains(["profitclicking"])){



$('.triplerMain').attr("style","none")
$('table.report').parent().css('width', "100%");

if(href.contains("justbeenpaid.com/login.php") && !href.contains(["?","tripler","synergy"]) ){
	$('body').prepend("<div id='servertime' style='display:none;'/>");

	var streamUrl         = $('.flowAudioPlayerTiny').attr('href');
	var $dl               = $('.flowAudioPlayerTiny').parent().parent();
		$('dt', $dl).append(" - <a href=\"" + streamUrl + "\">Download now</a>");
    var msgboxObj         = {};
    var $messagebox       = $('.messagebox');
    msgboxObj.state       = localStorage['messageboxState'];
    msgboxObj.storedText  = localStorage['messageboxText'] || "";
    msgboxObj.currentText = $('.messagebox').text();
    msgboxObj.currentText = JSON.stringify(msgboxObj.currentText);
    $('.messageboxtitle:eq(0)').before("<div class='messageboxtitle' id='hideAnnouncements'>[HIDE ANNOUNCEMENTS]</div>");
	if( msgboxObj.state = "hidden") { $messagebox.hide(); }

	if( msgboxObj.storedText != msgboxObj.currentText) {
		localStorage['messageboxState'] = 'visible';
		$messagebox.show();
	}

	$('#hideAnnouncements').live('click', function (){
	       $messagebox.slideUp(1250);      
	       localStorage['messageboxText']  =  msgboxObj.currentText ;                   
	       localStorage['messageboxState'] =  'hidden';
	});
	
	$('table.report').parent().css('width', "1050");
	
}


if( href.contains( "tripler.justbeenpaid.com/login.php") && !href.contains( "?")  ){
  interval = (13*1000*60) + (1000 *Math.floor(Math.random()*666));
    GM_addStyle(' #toggleAutoBuy{ margin-right: 15px; } #autoBuyPercentage{ width: 25px; } ' +
    			'#changePercentage{ cursor: pointer; font-weight: bold; }'
    	);
    $('#changePercentage').live('click', function (){
    	localStorage['autoBuyPercentage'] = $('#autoBuyPercentage').val();
    }); 

    	settings  = {};
    	settings.autoBuyPercentage = localStorage['autoBuyPercentage'] || "100";
    	settings.autoBuyPercentage = parseFloat( settings.autoBuyPercentage / 100 );
    	settings.autoBuy           = localStorage['autoBuy'] || "false";
    	
    var $triplerForm      = $('form[action*="buyposition.php"]');
    var $ol               = $triplerForm.parent().parent();
    	$('b', $triplerForm).addClass('availableFunds');
    	settings.availableFunds    = $('.availableFunds').html() || "0";
    var autoBuyText      = "Turn Auto Purchasing ";
    	autoBuyText      += (settings.autoBuy == "true") ? "OFF" : "ON";
 	var html = 	"<li>" + 
					"<button id='toggleAutoBuy' class='navlink'>" + autoBuyText +  "</button>" + 
					"Spend: <input id='autoBuyPercentage' value=" + settings.autoBuyPercentage*100 + ">% on Triplers" + 
					"<span style='color: red;'' id='changePercentage'> [OK] </span>" + 
				"</li>";
    $ol.append(html);
    $('.availableFunds').parent().append('<span style="color: green;"> Last Update: <b id="lastUpdate"></b> </span>');
    	settings.toggleAutoBuy =  function (){ 
	        autoBuy = localStorage['autoBuy'] || "false";
	        autoBuy = localStorage['autoBuy'] = (autoBuy == "true") ? "false" : "true";
	    	var autoBuyText      = "Turn Auto Purchasing ";
	    	if(autoBuy == "true"){ 
	    		autoBuyText += "OFF";
	    		try{
	    		fundsChecker = window.setInterval(function(){ settings.getFunds(); }, interval );
	    		}
	    		catch(err){ console.log( err );
	    		}
	    	}else{
	    		autoBuyText += "ON";
	    		window.clearInterval(fundsChecker);
	    	};
	 		$('#toggleAutoBuy').text(autoBuyText);
    	 }
		settings.getFunds = function(){
			
			$('.availableFunds').load('/login.php form[action*="buyposition.php"] font b', function (){
				var html                = $('.availableFunds').text();
				console.log( html );
				settings.autoBuyPercentage = localStorage['autoBuyPercentage'] || "100";
    			settings.autoBuyPercentage = parseFloat( settings.autoBuyPercentage / 100 );
				settings.availableFunds = parseFloat( html.replace(/(available|\$|\s)/gi,"") );
				console.log( settings );
				
				if(!isNaN(settings.availableFunds)){
					if( (settings.availableFunds * settings.autoBuyPercentage ) >= 10) {
						console.log( new Date() );
						$triplerForm.submit();
    					
					}
				}
						var updateDate = new Date();
						$('#lastUpdate').text(addZero(updateDate.getHours()) + ":" + addZero(updateDate.getMinutes()) );

			});
		
		}
	if(settings.autoBuy == "true"){	

		settings.availableFunds      = parseFloat( settings.availableFunds.replace(/(available|\$|\s)/gi,"") );
		( (settings.availableFunds * settings.autoBuyPercentage ) >= 10) ? $triplerForm.submit() : null;
		var updateDate = new Date();
		$('#lastUpdate').text(addZero(updateDate.getHours()) + ":" + addZero(updateDate.getMinutes()));
		

		fundsChecker = window.setInterval(settings.getFunds, interval );
	}
	
    $('#toggleAutoBuy').live('click', settings.toggleAutoBuy );
}

if( href.contains('tripler.justbeenpaid.com/buyposition.php') ){
	var autoBuyPercentage = localStorage['autoBuyPercentage'] || "100";
    	autoBuyPercentage = parseFloat( autoBuyPercentage / 100 );
    var autoBuy           = localStorage['autoBuy'] || "false";
	var $noPositions = $('#no_positions');
	var $balanceDiv  = $('td div:contains("From Your JSS-Tripler Account")');
	$('strong, br', $balanceDiv).remove();
	var balance      = $balanceDiv.html();
	balance          = parseFloat( balance.replace(/(balance|\$|\(|\)|\:|\s)/gi,"") );
	var debug = {};
		debug.autoBuyPercentage = autoBuyPercentage;
		debug.autoBuy = autoBuy;
		debug.balance = balance;
		debug.canBuy  = false;
	if((balance*autoBuyPercentage >= 10) && (autoBuy == "true")) { 
		$noPositions.val( Math.floor((balance*autoBuyPercentage)/10) );
		debug.canBuy = true;
		if( autoBuyPercentage != 1){ localStorage['autoBuy'] = "false"; }
		$noPositions.parents('form').submit();
	}
	console.log( debug );
	
}
if( href.contains('tripler.justbeenpaid.com/buynewconfirm.php') ){
	window.setTimeout(function (){ $('form').submit();	}, 250);
}
 

 
var username = $('#username').val();

var logoImg = "http://static.justbeenpaid.nl/img/ads/logo-orange.png";

if(href.contains(["tripler","synergy"])){
	$('body').prepend('<div class="line" style="margin-bottom: 5px;"/><center><img src="' + logoImg + '"/></center>')
}

$('#logo, .navcenters, .page-peel-adjuster, #pagePeel').remove();
$('#worldclock').parent().remove();
$('[name=captcha]').focus();
$('tr, td').css('border', 'none').css('border-bottom', '2px dotted #d4d4d4');
$('a:contains("Hint")').parent().remove();


if(!href.contains( ["lockerz", "userscripts","google"])){
	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://justbeenpaid.yum.pl/version.txt",
	  onload: function(response) {
	  	if(version < parseFloat( response.responseText ) ){
	  		var update = confirm( "There\'s a new version available, do you want to do an update now?");
	  		if(update){
	  			window.location = "http://userscripts.org/scripts/show/132885";
	  		}
	  	}
	    
	  }
	});
}


if( href.contains( "jss.cgi" )){
	$('#form1').submit();
}


$('#header, .menu, .report, .triplerMain, td:last, tr:last').each( function(){
      	var $this = $(this);
      	$this.css({
      		'border' : 'none'
      	});
	
		$('td, td, th', $this).css({
		  'border' : 'none'
		});
});

$('font:contains("SUPER, HIGH-SPEED ALERT!")').parent().remove();

if( $('#content:contains("OVERVIEW OF YOUR REFERRALS")').length ){
	var $tbl = $('#content table');
	$tbl.show();        
}



if( $('.faqtitle:contains("Your Current Referrals")').length ){
	   var $tbl = $('.faqtitle').siblings('table')[0];

	   $( 'tr', $tbl).eq(0).remove();
	   $( 'tr', $tbl).eq(0).css({
	   				
	   				 'color' : '#09F',
	   				 'font-weight' : 'bold',
	   				 'font-size' : '0.8em',
	   				 'background' : '#F8F8F8',
	   				 'border' : '5px solid #eee'
	});
}

$('#banner p img').remove();


if( $('.navlink').length ){
	
	if( href.contains( ["tripler","synergy"] )  ){
		null;
	}
	else{
		$('#menu').parent().remove();
		$('#header').remove();
		
		if(!$('input[name=captcha]').length ){
			$('body').append(
			'<div id="vMenu">' + 
			    '<ul>' +
			        '<li class="grey"><a href="#">Help</a>' + 
			        	'<ul>' +
							'<li><a href="/faqs">FAQ</a></li>' +
							'<li><a href="/general/glossary.php">Glossary</a></li>' +
							'<li><a href="/tutorials">Tutorials</a></li>' +
							'<li><a href="/general/help.php">How To Get Help</a></li>' +
							'<li><a href="/conference">Web Conferences</a></li>' +
							'<li><a href="http://marketing.justbeenpaid.com/">Marketing Websites</a></li>' +
						'</ul>' +
					'</li>' +	

			        '<li class="grey"><a href="#">General</a>' + 
			        	'<ul>' +
							'<li><a href="/general/about.php">About Us</a></li>' +
							'<li><a href="/general/testimonials.php">Testimonials</a></li>' +
							'<li><a href="/general/agreement.php">Member Agreement</a></li>' +
							'<li><a href="/general/privacy.php">Privacy Policy</a></li>' +
							'<li><a href="/general/spam.php">Spam Policy</a></li>' +
							'<li><a href="http://blog.justbeenpaid.com/">Blog / Top 20 Earners</a></li>' +
						'</ul>' +
					'</li>' +    
			        '<li class="blue"><a href="#">' + 
			        	'<form action="http://tripler.justbeenpaid.com/jss.cgi" method="post" target="_blank">' + 
							'<input name="username" type="hidden" id="username" value="' + username + '"/>' +
						'</form>JSS Tripler</a>' + 
					'</li>' + 
			        '<li class="blue"><a href="#">' + 
			        	'<form action="http://synergy.justbeenpaid.com/jss.cgi" method="post" target="_blank">' + 
							'<input name="username" type="hidden" id="username" value="' + username + '"/>' +
						'</form>JSS</a>' + 
					'</li>' +       
			        '<li><a href="/login.php">Home</a></li>' +
			        '<li><a href="/login.php?nav=eprofile">Profile</a>' + 
			        	'<ul>' +
							'<li><a href="/login.php?nav=modpwd">Change Password</a></li>' +
							'<li><a href="/login.php?nav=modcontactemail">Change Email</a></li>' +
							'<li><a href="/payprocessors.php">Manage Payment Processors</a></li>' +
						'</ul>' +
					'</li>' +
			        '<li><a href="/financial.php">Financial</a></li>' +
			        '<li><a href="/login.php?nav=referrals">Referrals</a></li>' +
			        '<li><a href="/marketing.php">Marketing</a>' +
			        	'<ul>' +
							'<li><a href="http://marketing.justbeenpaid.com/">Marketing Training</a></li>' +
							'<li><a href="/login.php?nav=referralurls">Your Affillate Web Sites</a></li>' +
							'<li><a href="/referralpagestats.php">Referral Page Statistics</a></li>' +
							'<li><a href="/login.php?nav=banners">Your Banners</a></li>' +
						'</ul>' +
					"</li>" + 
			        '<li><a href="/login.php?nav=jss">JSS Details</a></li>' +
			        '<li><a href="/login.php?nav=products">Products</a></li>' +
			        '<li><a href="http://te.justbeenpaid.com/">Traffic Exchange</a></li>' +
			        '<li><a href="/login.php?flow=logout">Log out</a></li>' +
			  	'</ul>' +
			'</div>'
	  );
		}
	}
}

$('.blue a').live('click', function (){
       $('form' ,$(this)).submit();                          
});


$('.grey li').addClass('grey');
$('.blue li').addClass('blue');

GM_addStyle( 
  "@import url(http://fonts.googleapis.com/css?family=Rosarivo);" +
  "html{ min-height: 100%;  }" +
  "body { height: 100%; font-family: 'Rosarivo', serif !important;margin:0; font-size: 0.8em; }" +
  "#vMenu .grey{ background: #606060; border: none; border-top: 1px solid #585858; }" + 
  "#vMenu .grey:hover{ background: #4f4f4f; }" +
  "#vMenu .blue{ background: #1a00d9; border: none; border-top: 1px solid #00d; }" + 
  "#vMenu .blue:hover{ background: #001799; }" + 
  "#vMenu{ font-size: 0.8em; width: 150px; position: absolute; left: 0; top: 10%; box-shadow: 2px 2px 9px #782320; }" + 
  "#vMenu li{ width: 150px; background: #AE332E;border-top: 1px solid #983740; padding: 15px; position: relative; }" +
  "#vMenu li:hover{ background: #a12f2a; }" +
  "#vMenu li a{ height: 100%; width: 100%; text-decoration: none;display: block;font-weight: bold;color: white;text-align: center; text-transform: uppercase; }" + 
  "#vMenu ul{list-style: none; margin: 0; padding: 0; text-shadow: 2px 2px 1px #333; }" + 
  "#vMenu ul ul{position: absolute;top:0;left:180px;visibility:hidden; } " + 
  "#vMenu ul ul li a{ font-size: 10px;  height: 18px; } " + 
  "#vMenu ul li:hover ul{ visibility:visible; }" +
  ".messagebox{ cursor: pointer; }" + 
  ".line {background: #FF6908; height: 7px; width: 100%; margin: 0; margin-bottom: 20px; padding: 0; position: absolute; top: 0; }" + 
  ".art-j16{ margin-left: 0; }" + 
  ".faqtitle{ border: 2px solid #ccc7cb; background: #ddd9dc; text-shadow: none; border-radius: 5px; font-weight: normal; color: #333; }" + 
  ".buttonRed{ padding: 10px 150px; box-shadow: none;  } " + 
  ".buttonRed:hover{ padding: 10px 150px; box-shadow: none;  } " + 
  ".navcenter a{ box-shadow: none; }" + 
  ".css3btn, .css3btn:hover { font-weight: bold; font-family: Verdana; font-size: 14px;color: #ffffff !important;padding: 10px 20px;" +
  "background: -moz-linear-gradient(top,#fcfcfc 0%,#54a800);" +
  "background: -webkit-gradient(linear, left top, left bottom, from(#fcfcfc),to(#54a800));" +
  "border-radius: 10px;-moz-border-radius: 10px;-webkit-border-radius: 10px;" +
  "border: 1px solid #3ead15;" +
  "-moz-box-shadow:0px 1px 3px rgba(018,002,018,0.5),inset 0px 0px 10px rgba(087,087,087,0.7);" +
  "-webkit-box-shadow:0px 1px 3px rgba(018,002,018,0.5),inset 0px 0px 10px rgba(087,087,087,0.7);" +
  "text-shadow:0px -1px 0px rgba(000,000,000,0.4),0px 1px 0px rgba(255,255,255,0.3); cursor: pointer;}" +
  "#calc-options { margin: 20px auto; }" + 
  "#calc-options .css3btn{ font-size: 12px; border: 1px solid #3EAD15; margin: 5px; padding: 5px 20px; cursor: pointer; }" + 
  "body { background-image: -moz-linear-gradient(bottom, #FFFFFF 0%, #DDD9DC 100%); background-repeat: no-repeat; background-attachment: fixed; }" +
  "div#content{ box-shadow: 0 0 5px #888888; }" + 
  "table.cAlign td{ font-size: 1.1em; } " + 
  "#GMcontrols{ margin: 10px; text-align: center; display: block; }" + 
  "#GMcontrols textarea{ display:block; margin: 10px auto; width: 100%; display: none;}" + 
  ".newCalc{ color: red; }" + 
  ".newCalc .note{font-size: 12px; color: black; }" + 
  ".navlink { -webkit-box-shadow: 1px 1px 1px #404040; -moz-box-shadow: 1px 1px 1px #404040; box-shadow: 1px 1px 1px #404040; }" + 
  "#Timer{ color: black; } .buttonBlue{ box-shadow: none; }" + 
  ".triplerMain{ width: 990px; margin: 0px auto; border: medium none; padding-bottom: 10px; box-shadow: none; }"
);

setTimeout(function (){ if( $('div').size() > 25){ $('body').prepend('<div class="line"></div>'); } }, 3000 );

if( path.contains('calculator')){
	$('form h2').after('<h1 class="newCalc">Try out new calculator. It allows you to track your progress online.<p>For your convinience you can even fetch your JBP\'s account history.<p> To try it out <a href="http://www.justbeenpaid.yum.pl/calc.php">CLICK HERE!</a><p class="note"> [NOTE: It\'s not an official JBP Product]</p> </h1>');
}

$('[type=button], [type=submit], button').addClass('css3btn');



// console.clear();
if( href.contains("tripler") ){
	var $accMovements  = $('strong:contains("YOUR ACCOUNT MOVEMENTS")');
		$accMovements.after("<div id='GMcontrols'> <button id='showLog' style='display:none;'>Show log</button> <button id='autoFetch'>Auto Fetch</button> <textarea cols=20 rows=10></textarea> </div>")
	var $tmp           = $accMovements.parent();
	var $logNavigation = $("table", $tmp).eq(0);
	var $tblLog        = $("table", $tmp).eq(1);
		$tblLog.addClass("account-logs");
		$logNavigation.addClass('logControls');

		var LSJSON = localStorage['account-logs'] || "{}";
		var logObj = JSON.parse( LSJSON );

		logObj['transId'] = logObj['transId'] || [];
		logObj['entries'] = logObj['entries'] || 0;


	$("tr", $tblLog).each( function(index){
	        var $this = $(this);
	        var info = {};
	    	if(index == 0) {return;}
	    	//console.log( $("td", $(this)).text() );
	        
	        var dateTime  =   $('td', $this).eq(0).text();
	        var transId   =   $('td', $this).eq(1).text();
	        var transType =   $('td', $this).eq(2).text();
	        var amount    =   $('td', $this).eq(3).text();
			var date      =   dateTime.split(" ")[0];
	        var time      =   dateTime.split(" ")[1];	
	        var day       =   date.split("-")[2];
	        var hour      =   time.split(":")[0];
	        
	        if(transType.contains("Payment for New Position")){
				transType = "newPositions";
				return;
	        }
	        else if(transType.contains("Daily Earnings")){
				transType = "dailyEarnings";
				return;
	        }
	        else if(transType.contains("Commission from")){		
	        	transType = "commision";
				if(hour < 12){ date = formatDate(substractDays(date,1)); }
	        }
	        else if(transType.contains("Funding from JSS Account")){
				transType = "deposit";
				if(hour >= 12){ date = formatDate(addDays(date,1)); }
	        }
	        else if(transType.contains("Transfer to Main JSS Account")){
	        	transType = "costs";
	        	if(hour >= 12){ date = formatDate(addDays(date,1)); }
	        }
	        else if(transType.contains("PIF Money")){
				transType = "costs";  
			      	
	        }
	        else if(transType.contains("Pay It Forward Funding")){
				transType = "pifFund";
				return;
	        }


	        
	        transId = transId.split("-")[1];

	        info['date']      = date;
	        info['amount']    = amount.replace("$","");
	        info['transType'] = transType;
	        info['transId']   = transId;
	        
	        if( $.inArray( transId, logObj['transId'] ) == -1 ){
	        	logObj['entries']++;
	        	if((info['transType'] != "commision")){ logObj["transId"].push(transId) };
	        	logObj[ logObj['entries'] ] = info;
	        }

	        localStorage.setItem('account-logs', JSON.stringify(logObj) );
	});
}

$('#showLog').live("click", function(event){
    var logObj         = JSON.parse( localStorage['account-logs']  ) || {};
    var tmpArr         = [];
    tmpArr['dates']    = [];
    tmpArr['types']    = [];
    tmpArr['dateType'] = [];
    tmpArr['trans']    = {};
    
    for(var i = 1; i <= logObj['entries'];  i++){
 
    	// date, amount, transType
        var logObjCurr = logObj[i];
        var currDate   = logObjCurr['date'];
        var transType  = logObjCurr['transType'];
		var amount     = logObjCurr['amount'].replace("-", "");
			amount     = parseFloat(amount);
		
        if( !inArray(transType, tmpArr['types']) ){
			tmpArr['trans'][transType]    = {};
			tmpArr['types'].push(transType);
			tmpArr['dateType'][transType] = [];
			tmpArr['trans'][transType]  = {};
		}

		if( !inArray(currDate, tmpArr['dateType'][transType]) ){
			tmpArr['dateType'][transType].push(currDate);
            tmpArr['trans'][transType][currDate] = amount;
		}else{
			tmpArr['trans'][transType][currDate] += amount;	
		}   
    }
    console.log( tmpArr['trans'] );
    
    var productionLog = JSON.stringify( tmpArr['trans'] );

    
	$('#GMcontrols textarea').val( productionLog ).slideDown(750).select();

});
var autoFetch = localStorage['autoFetch'] || 'no';

$('#autoFetch').live("click", function(event){
	localStorage['autoFetch'] = 'yes';
	localStorage.removeItem('account-logs');
	window.location = "http://tripler.justbeenpaid.com/login.php?nav=movetobeginning";
});

if(autoFetch == 'yes'){
	var $moveRight = $('.logControls td:eq(3) b').has('a');
	var $moveToEnd = $('.logControls td:eq(4) b').has('a');

	if( $moveRight.length){
		window.location = "http://tripler.justbeenpaid.com/login.php?nav=moveright";
	}

	if( !$moveToEnd.length){
		localStorage['autoFetch'] = 'no';
		setTimeout(function (){ $('#showLog').trigger('click'); }, 1250 );
		
	}
}

// PIF Money
// Funding from JSS Account
// Pay It Forward Funding
// Commission from Referral Purchase	
// Daily Earnings for Active Positions	
// Payment for New Position(s)

if( href.contains( "nav=referrals") ){
	try{ GM_addStyle(' #content td, #content tr{ border-style:none;  } #content table:last-of-type:not(.menu) tr:hover{ background:#f38311 !important; font-weight:bold !important;} '+
	 '#content table:not(.menu){ border-spacing: 0; -webkit-box-shadow: 1px 1px 1px 1px #8BCC0E, -1px -1px 1px 1px #8BCC0E;-moz-box-shadow: 1px 1px 1px 1px #8BCC0E, -1px -1px 1px 1px #8BCC0E;box-shadow: 1px 1px 1px 1px #8BCC0E, -1px -1px 1px 1px #8BCC0E; }'); }
	catch(err){console.log( err );}
	var $tbl = $('#content table').not('.menu');
	$tbl.attr('border', "0");
	$('tr:odd', $tbl).css( "background","#b4f23d");
	$('tr:even', $tbl).css( "background","#ebfccc");
	$('tr:eq(0)', $tbl).css( "background","#fff");
	$('td', $tbl).attr( "style","");
}



if( href.contains( "synergy") && href.contains(['positions', "premium", "placements" ]) ){
	GM_addStyle(' .buyThisShit{ background: #09F;  } [class^="buyP"], #deleteAllPP{ cursor:pointer; color: red; margin-bottom: 10px; font-weight: bold; }' + 
	'table{ -webkit-box-shadow: none !important; -moz-box-shadow: none !important; box-shadow: none !important; } [class^="buyP"]{ color: #09F; }'+
	' #content div div { border: none !important; box-shadow: none !important; } #banner{ padding: 1px; }' + 
	'.matrixHint{ width: 100%; color: #09F; font-weight: bold; text-align: center; font-size:1.7em; text-shadow: -1px 0px 1px #999;  }'
	);

	function buyThisShit(arr){
		for(var spot in arr ){
			arr[spot].parent().addClass('buyThisShit');
		}
	}

	function checkSpot(you, spot){
		var ret = ( you == spot.text() ) ? true : false;
		return ret;
	}

	var $firstMatrix = $('div b:contains("Matrix")').eq(0).parent();
	console.log( $firstMatrix );
	
	$firstMatrix.before("<div class=\"matrixHint\">Spots marked in blue are the ones you should work on.<br>" + 
"Golden => Combo => Silver => Upline => Regular<br>Work on Matrices in that order, it will help you cycle faster and you'll save some $$$</div>");

	$('div b:contains("Matrix")').each(function(){
        var $this         = $(this);
        var $matrix       = $this.parent().next('table');
        	$('tr, td', $matrix).attr("style", "").css({  "text-align": "center", "padding":"5px", "border":"none !important", "box-shadow":"1px 1px 1px #ddd" });
        var $upline       = $('tr:eq(0) td:eq(5)', $matrix);
        var $you          = $('tr:eq(1) td:eq(5)', $matrix);
        var $spot1        = $('tr:eq(3) td:eq(6)', $matrix);
        var $spot2        = $('tr:eq(4) td:eq(6)', $matrix);
        var $spot3        = $('tr:eq(5) td:eq(6)', $matrix);
        var $spot4        = $('tr:eq(6) td:eq(6)', $matrix);
        var $spot5        = $('tr:eq(7) td:eq(6)', $matrix);
        var $spot6        = $('tr:eq(8) td:eq(6)', $matrix);
	    var you           = $you.text();
	    var matrix        = {};
	    	matrix.silver = false;
	    	matrix.upline = false;
	    	matrix.type   = "Regular";
	    	matrix.id     = $you.next().text();
	    	
	    	
	    	
 		

	    if( checkSpot(you, $spot1) && checkSpot(you, $spot2) ) { buyThisShit( [$spot3, $spot4, $spot5, $spot6] ); matrix.type = "Golden";}else{
		    if( you == $upline.text() ){ buyThisShit( [$spot1, $spot2] ); matrix.type = "Upline"; matrix.upline = true; }
		    if( checkSpot( you, $spot1)  ){ buyThisShit( [$spot3, $spot4] ); matrix.type = "Silver"; matrix.silver = true; }

		    matrix.type = ( matrix.silver && matrix.upline ) ? "Combo Upline & Silver" : matrix.type;
		    if( matrix.type == "Regular"){
		    	buyThisShit([$spot1, $spot2]);
		    }
		}
			$this.html("[" + matrix.type + " Matrix - " + matrix.id + "]<span class='buyPlacements'>[Buy Placements]</span><span class='buyPremiums'>[Buy Premiums]");

	});

		
	$('.buyPlacements, .buyPremiums').live('click', function (){
	    var $this       = $(this);                   
	    var $matrix     = $this.parent().parent().next('table');
	    var actionType  = ( this.className.contains("Placements") ) ? "placements" : "premium";
	    var searchFor   = ( actionType == "placements" ) ? "Buy Placement" : "Premium";
	    	successText = ( actionType == "placements") ? "Placement Pending Purchase by You" : "Pending Premium";
	    
	    $('.buyThisShit' ,$matrix).each( function(){
	    	var $link  = $('a:contains("' + searchFor + '")', $(this));
			var buyUrl = $link.attr('href');
			var $td    = $link.parent();
				$td.append(" <img src=\"http://i45.tinypic.com/bhznrd.gif\" />");
			if((buyUrl == "undefined") || buyUrl == undefined) { return true; }

			xhr = $.post(buyUrl, function (response){
				if( response.contains("temporarily recorded, pending your payment") ){
					var $td = $link.parent();
						$link.remove();
						$td.text(successText);
				}		   
			})
	    	
			xhr.complete(function (){
				window.setTimeout(function (){
					window.open("http://synergy.justbeenpaid.com/login.php?nav=" + actionType, actionType);
				}, 2250);
				localStorage['buyPP'] = "true";
			});
	    });

	    
	        
	});
}

if( href.contains([ "placement","premium"]) ){
	if(localStorage['buyPP'] == "true"){
		$('form[action*="buy"]').submit();
	}

	var $placementsTbl = $('td:contains("System Number")').parents('table');
	$placementsTbl.before('<span id="deleteAllPP">[Delete All]</span> ');
	//Your pending placement order has been deleted successfully!
	
	$('#deleteAllPP').live('click', function (){
	       var $this = $(this);
	       $('form[action*="delete"]').each( function(){
	       		console.log( $(this) );
	       		
	       		var $this  = $(this);
	            var pos    = $('[name=pos]', $this).val();
	            var nulval = $('[name=nulval]', $this).val();

	       		$this.append(" <img src=\"http://i45.tinypic.com/bhznrd.gif\" />");

	            $.post($this.attr("action"), { nulval: nulval, pos: pos}, function (response){
	             	if( response.contains("order has been deleted successfully!") ){
	             		$this.parent().parent().remove();
	             	}
	             });

	       });
	});
}

if( href.contains(["buyplacement","buypremium"]) ){
	if(localStorage['buyPP'] == "true"){
		$('form[action*="buyplacementconfirm.cgi"]').submit();
		$('form[action*="buypremiumconfirm.cgi"]').submit();
	}
}

if( href.contains(["buyplacementconfirm", "buypremiumconfirm"]) ){
	if(localStorage['buyPP'] == "true"){
		localStorage['buyPP'] = "false";
		$('form[action*="placementgood.php"]').submit();
		$('form[action*="premiumgood.php"]').submit();
	}
}


}