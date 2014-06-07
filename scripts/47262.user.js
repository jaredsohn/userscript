// ==UserScript==
// @name           From the Pavilion - Numbered skills
// @namespace      fromthepavilion-numberedskills
// @include        http://www.fromthepavilion.org/*
// ==/UserScript==
// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://www.fromthepavilion.org/resource/jquery.1.2.6.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();



// All your GM code must be inside this function
function letsJQuery() {
    var setTypeForm = "200"; // future switches
    $("td.skills span.skillup").each(function(){
		switch($(this).text()){
			case 'atrocious': 	$(this).text('0'); break;
			case 'atroc':	 	$(this).text('0'); break;
			case 'dreadful': 	$(this).text('1'); break;
			case 'dread': 		$(this).text('1'); break;
			case 'poor': 		$(this).text('2'); break; //same for abbreviation
			case 'ordinary': 	$(this).text('3'); break;
			case 'ordin': 		$(this).text('3'); break;
			case 'average': 	$(this).text('4'); break;
			case 'avg': 		$(this).text('4'); break;
			case 'reasonable': 	$(this).text('5'); break;
			case 'reas': 		$(this).text('5'); break;
			case 'capable': 	$(this).text('6'); break;
			case 'capab': 		$(this).text('6'); break;
			case 'reliable': 	$(this).text('7'); break;
			case 'reli': 		$(this).text('7'); break;
			case 'accomplished': 	$(this).text('8'); break;
			case 'accom': 		$(this).text('8'); break;
			case 'expert': 		$(this).text('9'); break;
			case 'exprt': 		$(this).text('9'); break;
			case 'outstanding': 	$(this).text('10'); break;
			case 'outs': 		$(this).text('10'); break; 
			case 'spectacular': 	$(this).text('11'); break;
			case 'spect': 		$(this).text('11'); break;
			case 'exceptional': 	$(this).text('12'); break;
			case 'excep': 		$(this).text('12'); break;
			case 'world class': 	$(this).text('13'); break;
			case 'wclas': 		$(this).text('13'); break;
			case 'elite': 		$(this).text('14'); break; //same for abbreviation
			case 'legendary': 	$(this).text('15'); break; 
			case 'legen': 		$(this).text('15'); break; 
		}	
	});
	$("td.skills").each(function(){
		switch($(this).text()){
			case 'atrocious': 	$(this).text('0'); break;
			case 'atroc':	 	$(this).text('0'); break;
			case 'dreadful': 	$(this).text('1'); break;
			case 'dread': 		$(this).text('1'); break;
			case 'poor': 		$(this).text('2'); break; //same for abbreviation
			case 'ordinary': 	$(this).text('3'); break;
			case 'ordin': 		$(this).text('3'); break;
			case 'average': 	$(this).text('4'); break;
			case 'avg': 		$(this).text('4'); break;
			case 'reasonable': 	$(this).text('5'); break;
			case 'reas': 		$(this).text('5'); break;
			case 'capable': 	$(this).text('6'); break;
			case 'capab': 		$(this).text('6'); break;
			case 'reliable': 	$(this).text('7'); break;
			case 'reli': 		$(this).text('7'); break;
			case 'accomplished': 	$(this).text('8'); break;
			case 'accom': 		$(this).text('8'); break;
			case 'expert': 		$(this).text('9'); break;
			case 'exprt': 		$(this).text('9'); break;
			case 'outstanding': 	$(this).text('10'); break;
			case 'outs': 		$(this).text('10'); break; 
			case 'spectacular': 	$(this).text('11'); break;
			case 'spect': 		$(this).text('11'); break;
			case 'exceptional': 	$(this).text('12'); break;
			case 'excep': 		$(this).text('12'); break;
			case 'world class': 	$(this).text('13'); break;
			case 'wclas': 		$(this).text('13'); break;
			case 'elite': 		$(this).text('14'); break; //same for abbreviation
			case 'legendary': 	$(this).text('15'); break; 
			case 'legen': 		$(this).text('15'); break; 
		}	
	});
	$("td.fatigue").each(function(){
		switch($(this).text()){
			case 'clinically dead': $(this).text('0%'); break;
			case 'clin': 		$(this).text('0%'); break;
			case 'shattered': 	$(this).text('10%'); break;
			case 'shtrd': 		$(this).text('10%'); break;
			case 'exhausted': 	$(this).text('20%'); break;
			case 'exhau': 		$(this).text('20%'); break;
			case 'listless': 	$(this).text('30%'); break;
			case 'list': 		$(this).text('30%'); break;
			case 'weary': 		$(this).text('40%'); break; //same for abbreviation
			case 'moderate': 	$(this).text('50%'); break;
			case 'moder': 		$(this).text('50%'); break;
			case 'satisfactory': 	$(this).text('60%'); break;
			case 'satis': 		$(this).text('60%'); break;
			case 'passable': 	$(this).text('70%'); break;
			case 'pass': 		$(this).text('70%'); break;
			case 'energetic': 	$(this).text('80%'); break;
			case 'ener': 		$(this).text('80%'); break;
			case 'revived': 	$(this).text('90%'); break;
			case 'reviv': 		$(this).text('90%'); break;
			case 'rested': 		$(this).text('100%'); break;
			case 'rest': 		$(this).text('100%'); break;
		}	
	});
    if(setTypeForm == "200"){
        $("td.form").each(function(){
            switch($(this).text()){
                case 'atrocious': 	$(this).text('0%'); break;
                case 'atroc':	 	$(this).text('0%'); break;
                case 'dreadful': 	$(this).text('20%'); break;
                case 'dread': 		$(this).text('20%'); break;
                case 'poor': 		$(this).text('40%'); break;
                case 'ordinary': 	$(this).text('60%'); break;
                case 'ordin': 		$(this).text('60%'); break;
                case 'average': 	$(this).text('80%'); break;
                case 'avg': 		$(this).text('80%'); break;
                case 'reasonable': 	$(this).text('100%'); break;
                case 'reas': 		$(this).text('100%'); break;
                case 'capable': 	$(this).text('120%'); break;
                case 'capab': 		$(this).text('120%'); break;
                case 'reliable': 	$(this).text('140%'); break;
                case 'reli': 		$(this).text('140%'); break;
                case 'accomplished': 	$(this).text('160%'); break;
                case 'accom': 		$(this).text('160%'); break;
                case 'expert': 		$(this).text('180%'); break;
                case 'exprt': 		$(this).text('180%'); break;
                case 'outstanding': 	$(this).text('200%'); break;
                case 'outs': 		$(this).text('200%'); break; 
            }
        });
    } else {
        $("td.form").each(function(){
            switch($(this).text()){
                case 'atrocious': 	$(this).text('0'); break;
                case 'atroc':	 	$(this).text('0'); break;
                case 'dreadful': 	$(this).text('1'); break;
                case 'dread': 		$(this).text('1'); break;
                case 'poor': 		$(this).text('2'); break;
                case 'ordinary': 	$(this).text('3'); break;
                case 'ordin': 		$(this).text('3'); break;
                case 'average': 	$(this).text('4'); break;
                case 'avg': 		$(this).text('4'); break;
                case 'reasonable': 	$(this).text('5'); break;
                case 'reas': 		$(this).text('5'); break;
                case 'capable': 	$(this).text('6'); break;
                case 'capab': 		$(this).text('6'); break;
                case 'reliable': 	$(this).text('7'); break;
                case 'reli': 		$(this).text('7'); break;
                case 'accomplished': 	$(this).text('8'); break;
                case 'accom': 		$(this).text('8'); break;
                case 'expert': 		$(this).text('9'); break;
                case 'exprt': 		$(this).text('9'); break;
                case 'outstanding': 	$(this).text('10'); break;
                case 'outs': 		$(this).text('10'); break; 
            }
        });
    }
	$("td.skills").width("30px");
	$("td.fatigue").width("30px");
	$("td.form").width("30px");	
	$("table.wide").width("auto");
}
