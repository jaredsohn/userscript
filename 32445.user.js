// ==UserScript==

	// @name		ibluele
	// @description		ibluele Theme for iGoogle
	// @version		1.0.0
	// @date		2007-11-28
	// @source		http://userscripts.org/scripts/show/38546
	// @identifier		http://userscripts.org/scripts/source/38546.user.js

	// @author		metapsyche
	// @namespace		http://userscripts.org/users/38546

	// @include		http://www.google.com/ig

	// @exclude		http://*.google.*/custom*
	// @exclude		http://www.google.com/cse
        // @exclude		http://mail.google.com/mail/*


// ==/UserScript==
var SCRIPT = {
	name:		"ibluele",
//	namespace:	"http://userscripts.org/users/?????",
	description:	"ibluele Theme for iGoogle",
//	source:		"http://userscripts.org/scripts/show/?????",
//	identifier:	"http://userscripts.org/scripts/source/?????.user.js",
	version:	"1.0.0",
	date: (new Date( 2007,11,28 )).valueOf()
};


// Change Log:
	// Version 1.0.0	Initial Release



// To Do:
	// Add Theme Background


var ibluele; 

function iblueleize() { ibluele =


// General Google Page Enhancements
	/* page bg */			"BODY   {background-color:#0ff !important; color:#fff;}" +
	/* google bar */		"DIV#gbar .gbard {background-color: #0ff;}" +
	/* google bar */		"DIV#gbar, #guser, #gbarc {background-color: #0ff;}" +
	/* google bar.table*/		"DIV#gbar tabke {background-color: #0ff;}" +
	/* search input */		"INPUT[type='text'], INPUT[name='q']   { background: #0ff !important;}" +
	/* tabs */			".selectedtab { background-color: #0ff;}" +
	/* module bg */			".modboxin, .modboxin IFRAME HTML BODY   { background-color:#0ff !important; }"
};

// SAVE THE PLANET!!!
iblueleize();
