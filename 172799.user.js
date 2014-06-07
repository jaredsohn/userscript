// ==UserScript==
// @name        Topdesk Italic BG-color
// @namespace   http://userscripts.org/users/523394
// @description Change BG-color of new/overdue/changed incidents
// @include     
// @version     1
// @grant       none
// ==/UserScript==

//Background
	//document.body.style.backgroundImage = 'url(http://www.wallpaperlounge.eu/data/media/907/White_Wallpaper_27.jpg)';
	//document.body.style.backgroundPosition='0% 6%';

	
//when a ticket has past its target date

	//background change

		//use this for firefox and other browsers, except IE
		changecss('.overduealarm','background-color','rgba(255, 0, 0, .3)');

		//use this for IE
		//changecss('.overduealarm','filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=#4CFF0000,endColorstr=#4CFF0000)');

	//font change
	
		changecss('.overduealarm','color','black');
		//changecss('.overduealarm','font-weight','bold');

//when the ticket has been modified by someone else

	//background change

		//use this for firefox and other browsers, except IE
		changecss('.overduechanged','background-color','rgba(255, 242, 6, .3)');
	
		//use this for IE
		//changecss('.overduechanged','filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=#4CFFF206,endColorstr=#4CFFF206)');
	
	//font change
		changecss('.overduechanged','font-weight','bold');
		changecss('.overduechanged','color','red');

//for a new unassigned ticket

	//background change
	
		//use this for firefox and other browsers, except IE
		changecss('.overduenew','background-color','rgba(128, 255, 128, .3)');
		
		//use this for IE
		//changecss('.overduenew','filter','progid:DXImageTransform.Microsoft.gradient(startColorstr=#4C80FF80,endColorstr=#4C80FF80)');
		
	//font change	
		changecss('.overduenew','font-weight','normal');
		changecss('.overduenew','color','black');


//changecss script
		function changecss(theClass,element,value) {
		 var cssRules;
		 for (var S = 0; S < document.styleSheets.length; S++){
			  try{
			  	document.styleSheets[S].insertRule(theClass+' { '+element+': '+value+'; }',document.styleSheets[S][cssRules].length);
			  } catch(err){
			  		try{document.styleSheets[S].addRule(theClass,element+': '+value+';');
					}catch(err){
					 	try{
						    if (document.styleSheets[S]['rules']) {
							  cssRules = 'rules';
							 } else if (document.styleSheets[S]['cssRules']) {
							  cssRules = 'cssRules';
							 } else {
							  //no rules found... browser unknown
							 }
							  for (var R = 0; R < document.styleSheets[S][cssRules].length; R++) {
							   if (document.styleSheets[S][cssRules][R].selectorText == theClass) {
							    if(document.styleSheets[S][cssRules][R].style[element]){
							    document.styleSheets[S][cssRules][R].style[element] = value;
								break;
							    }
							   }
							  }
						  } catch (err){}
					}
			  }
		}
	}