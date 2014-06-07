// ==UserScript==
// @name           Qual_info
// @namespace      virtonomica
// @version        1.31
// @description    Extended info
// @include        http://*virtonomic*.*/*/main/user/privat/persondata/knowledge
// @include        http://igra.aup.ru/*/main/user/privat/persondata/knowledge
// ==/UserScript==

var run = function() {
	var win = (typeof(unsafeWindow) != 'undefined' ? unsafeWindow : top.window);
   	$ = win.$;

	// get a string with the indicator of the success of growth
	// Kn  -  qual level
	// kv_up - qual growth
	function getOptimal( kn, kv_up){
		if ( isNaN(kv_up) ) {
			kv_up = 0;
			return "&nbsp;";
		}
		// maximum possible growth
		var max = Math.pow(kn, -0.57);
		max = Math.floor( max*1000)/1000;
		var ups = Math.floor( kv_up / max );

		return "<font color=darkblue>" + ups + "%</font>";
	}
	// turns to level up
	// exp - current qualification experience
	// up - current growth
	function getLastDays( exp,  up) {
		if ( isNaN(up) ) {
			return "&nbsp;";
		}
		var last = 100 - exp;
		var days = last / up;
		return Math.ceil( days);
	}	

   	//alert('RUN');
	var i = 0;
	// an array with information about the qualifications
	var know = new Array;
	i = 0;
	$("input", $("tr.odd") ).each(function() {
		 know[i] = $(this).attr('value');
		i++;
	});

	// change the color of growth
	$("tr.odd td:last-child").css("color","DeepPink");

	// looking for the current value of experience
	var i = 0;
	var k = 0;
	var exp = new Array;
	$( "tr.odd td" ).each(function() {
		var indx = i;	     	// column
		indx = indx%7;		// number of columns
		if ( indx == 5)  {
			//alert ( indx + " = " +$(this).text() );
			exp[ k ] = parseFloat( $(this).text() );
			k++;
		}
		i++;
	});

	i = 0;
	// an array with the data about the level of growth
	var up = new Array;
	$("tr.odd td:last-child").each(function() {
		up[i] = parseFloat(this.innerHTML);
		str = getOptimal( know[i], up[i] );
		$(this).parent().append( "<td>" + str + "");
		// сколько пересчетов до роста
		$(this).parent().append( "<td>" + getLastDays(  exp[ i ] , up[ i ] ) + "");
		i++;
	});

	$("tr.odd td:first-child").append("<br>");
	// change the background of rows in a table with parameters
	$("tr.odd").css("background-color", "Gainsboro");
	// change the color of the bars in the qualification
	$("input", $("tr.odd") ).css("background-color", "DimGray").css("color","gold");

}

if(typeof window.chrome != 'undefined') {
    var script = document.createElement("script");
    script.textContent = '(' + run.toString() + ')();';
    document.documentElement.appendChild(script);
} else {
    run();
}
