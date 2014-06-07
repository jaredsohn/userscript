// ==UserScript==
// @id             Highlight new series on VseTV.com
// @name           Highlight new series on VseTV.com
// @version        1.0
// @namespace      
// @author         php5engineer@gmail.com
// @description    Highlight new series on VseTV.com
// @include        http://www.vsetv.com/schedule_*
// @require		   http://code.jquery.com/jquery-1.9.0.min.js
// @run-at         document-end
// ==/UserScript==

// for example 
// Т/с "Виртуозы", 4 сезон, 1 с.

// the first episode, but not the first season
$(".prname2:contains(, 1 с.):not(:contains('1 сезон'))")
	.css('font-weight', 'bold')
	.children()
	.css('font-weight', 'bold')
	.after('first episode of the season')

$(".prname2:contains(, 1 сезон, 1 с.)")
	.css('font-weight', 'bold')
	.children()
	.css('font-weight', 'bold')
	.after('!!!new series!!!')
