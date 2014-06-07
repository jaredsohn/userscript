// ==UserScript==
// @name          FutonMoreReadable
// @namespace     knbknb.greasemonkey.org/
// @description   Make futon temp views more readable... by inserting more page breaks into the comment column of temp-view results, and other tricks.
// @include       http://*/docdb/_utils/*
// @include       http://*:5984/_utils/*
// ==/UserScript==
// Release 0.0.2 - Column width toggle, selectbox default = 50  items per page
// Release 0.0.1 - adapted code from other userscript. under construction
// 
// $Id: futonmorereadable.user.js 100 2010-06-30 22:04:38Z knut $
// Copyright 2010 knb
//

// Add jQuery
function importJs(url) {
    var script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
}
importJs('http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js');
//maybe use this in future release 
//importJs('http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.1/jquery-ui.js');
    
// Check if jQuery is loaded
function jQueryWait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(jQueryWait, 100);
    } else {
    	//some other userscript may manipulate slashdot page with jQuery, 
    	//so assign to this global var instead of $ variable
    	
        jQy = unsafeWindow.jQuery;
        main();
    }
}
jQueryWait();

// Here comes the main function, called by jQueryWait ;-)
function main() {
	jQy("#documents").parent().prepend('<div align="right" id="format">Format Listing:<span id="addbr"> Add BR</span>, <span id="thw">Toggle TH width</span></div>');
	//console.log("Hello firebug");
	
	//jQy("#format").hide();
	//jQy("#addbr, #thw").css('background-color', 'yellow').hide();
	//jQy(".run").click(function(){jQy("#format").show(); jQy("#addbr, #thw").show(); jQy("#addbr, #thw").css('background-color', 'yellow');} );
        jQy("dl dt.collapsed").each(function(){$(this).click();} );
	jQy("dd code").filter(function(){var h = $(this).html(); return /error|failure/.exec(h);}).each(function(){$(this).css('background-color','yellow');} );

	jQy("#addbr").click(function (){
		jQy("code.key, code.string").prepend("<br>");
		jQy("#addbr").css('background-color', 'tomato');
	});
	jQy("#thw").toggle(
			//function (){var k = "30%"; var v = "70%"; jQy("th.key, td.key").attr("width", k);jQy("th.value, td.value").attr("width", v);jQy(this).html("Toggle TH width, " + k);},
			function (){var k = "50%"; var v = "50%"; jQy("th.key, td.key").attr("width", k);jQy("th.value, td.value").attr("width", v);jQy(this).html("Toggle TH width, " + k);},
			function (){var k = "70%"; var v = "30%"; jQy("th.key, td.key").attr("width", k);jQy("th.value, td.value").attr("width", v);jQy(this).html("Toggle TH width, " + k);}			
	);
	jQy("#thw").click(function (){
	jQy("#thw").css('background-color', 'tomato');
	});
	
	jQy("select[id='perpage'] option:selected").attr("selected", false);
	jQy("select[id='perpage']").find("option[text='50']").each( 
	  function(){jQy(this).attr("selected", true);}
	);
}


