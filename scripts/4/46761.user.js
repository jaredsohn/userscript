// ==UserScript==
// @name           Message Menager
// @namespace      http://userscripts.org/users/46761
// @author         salomone modify neiss
// @version	   0.4.0.5
// @description    Menadzer wiadomosci wersja PL
// @include        http://s*.ikariam.*/*view=diplomacyAdvisor*
// @include        http://s*.ikariam.*/*action=Diplomacy*
// @include        http://s*.ikariam.*/*view=sendAllyMessage*
// @include        http://s*.ikariam.*/index.php*
// @include        http://s*.ikariam.*/*view=sendMessage*
// @include        http://s*.ikariam.*/*view=options*
//
// @require        http://neiss.webpark.pl/helper_functions.js
// @require        http://neiss.webpark.pl/lang_data.js
// @require        http://neiss.webpark.pl/init_functions.js
// @require        http://neiss.webpark.pl/setup_gui_functions.js
// @require        http://neiss.webpark.pl/subject_transform_functi.js
// @require        http://neiss.webpark.pl/send_message_functions.js
// @require        http://neiss.webpark.pl/addressbook_functions.js
// ==/UserScript==
                
                
                if ( url.indexOf('view=diplomacyAdvisor') > 0  || url.indexOf('action=Diplomacy') > 0 || ( url.indexOf('index.php') > 0 && checkIsAnyMessageTableOnScreen() ) )	{		
                	if ( pagesToLoad > 1 ) 	{
                		extendMessageList();
                	}
                	else	{
                		manageMailBoxMessages2();
                	}
                }
                
                if ( url.indexOf('view=sendMessage') > 0 || url.indexOf('view=sendAllyMessage') > 0 )	{		
                	placeExtraFunctionBoxOnPage();
                }
                
                if ( url.indexOf('view=options') > 0  )	{		
                	generateMySetupBoxOnOptionsPage();
                }