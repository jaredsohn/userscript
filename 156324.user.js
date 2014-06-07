// ==UserScript==
// @name     	WoP2013
// @description	Update WoP to 2013
// @include  	http://worldofpool.de/shedule.php*
// @include  	http://www.worldofpool.de/shedule.php*
// @require  	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version  	1.0
// @grant 	 	none
// ==/UserScript==

var form = $('select[name="year"]');

form.empty();
form.append('<option value="2013">2013</option>');
form.append('<option value="2014">2014</option>');