// ==UserScript==
// @name		Mirkohelper
// @namespace		http://www.wykop.pl/ludzie/osael/
// @description		Niezbędnik każdego Mirka!
// @author		osael
// @version		1.6
// @grant		none
// @include		http://www.wykop.pl/mikroblog*
// @include		http://www.wykop.pl/wpis*
// @include		http://www.wykop.pl/tag*
// @include		http://www.wykop.pl/ludzie*
// @include		http://www.wykop.pl/dodatki*
// @run-at 		document-end
// ==/UserScript==
//Bazowane na kilku innych dodatkach.
//To jest mój pierwszy skrypt. Powiedz jeżeli coś jest nie tak jak powinno lub mogłobyć zrobione lepiej.
//Podziekowania dla @Ginden oraz @kasper93.

function main() {
    //------------ TU SIE DEFINIUJEMY ---------------------
    //( ͡° ͜ʖ ͡°)
    var MirkoEmotki = [
		'( \u0361\u00B0 \u035C\u0296 \u0361\u00B0)',
		'( \u0361\u00B0 \u0296\u032F \u0361\u00B0)',
		'( \u0361\u00BA \u035C\u0296\u0361\u00BA)',
		'( \u0361\u00B0( \u0361\u00B0 \u035C\u0296( \u0361\u00B0 \u035C\u0296 \u0361\u00B0)\u0296 \u0361\u00B0) \u0361\u00B0)',
		'(\u2310 \u0361\u25A0 \u035C\u0296 \u0361\u25A0)',
		'(\u30FB\u3078\u30FB)',
		'\u10DA(\u0CA0_\u0CA0 \u10DA)',
		'(\u2565\uFE4F\u2565)',
        '(\u256F\uFE35\u2570,)',
		
		'(\u0298\u203F\u0298)',
		'(\uFF61\u25D5\u203F\u203F\u25D5\uFF61)',
		'\u1559(\u21C0\u2038\u21BC\u2036)\u1557',
		'\u1566(\u00F2_\u00F3\u02C7)\u1564',
		'(\u270C \uFF9F \u2200 \uFF9F)\u261E',
		't(\u30C4)_/\u00AF',
		'\u25D5\u203F\u25D5',
        '(\uFF9F\uFF70\uFF9F)',
        '(>\u10DA)',
		'\uFD3E\u0361\u0E4F\u032F\u0361\u0E4F\uFD3F',
		'\u0CA0_\u0CA0',
		'\u0628_\u0628',
		'\u0295\u2022\u1D25\u2022\u0294',
		'\u1D98\u1D52\u1D25\u1D52\u1D85',
		'(\u2312(oo)\u2312)',
		'\u113D\u1F41\u020D \u032A \u0151\u1F40\u113F'
	];
	//Emotki proponowne przez mirki na #mirkohelper
	var MirkoEmotkiUsr = [
		'( \u0361\u20AC \u035C\u0296 \u0361\u20AC)',
		'( \u0361\u00B0 \u035C\u0296 \u0361\u00B0)\n( \u0361\u00B0 \u035C\u0296 \u0361\u00B0)\uFF89\u2310\u25A0-\u25A0\n(\u2310 \u0361\u25A0 \u035C\u0296 \u0361\u25A0)',
		'\u10DA(\u0301\u25C9\u25DE\u0C6A\u25DF\u25C9\u2035\u10DA)',
		'(\u3002\u30D8\u00B0)',
		'(\uFE36\uFE39\uFE3A)',
        '(\u2310 \u0361\u25A0 \u035F\u0296 \u0361\u25A0)',
		'(\u222A_\u222A)\uFF61\uFF61\uFF61zzz',
		'(\u1D54\u1D25\u1D54)',
		'\u30FD\u0F3C\u0E88\u0644\u035C\u0E88\u0F3D\uFF89',
		'(\u00AC\u203F\u00AC)',
		'(\uFF89\u00B4\u30EE\u00B4)\uFF89*:\uFF65\uFF9F\u2727',
		'\u30FE(\u2310\u25A0_\u25A0)\u30CE\u266A',
		'(\u0E07 \u2022\u0300_\u2022\u0301)\u0E07 ',
        '( \u0E07 \u0361\u00B0\u256D\u035C\u0296\u256E\u0361\u00B0 ) \u0E07',
        '(\u256F\u00B0\u25A1\u00B0\uFF09\u256F\uFE35 \u253B\u2501\u253B',
        '\u252C\u2500\u2500\u252C\u25E1\uFF89(\u00B0 -\u00B0\uFF89)'

	];
	var MirkoSmieszki = '';
	var MirkoSmieszkiusr = '';
	MirkoEmotki.forEach(function(el){
		MirkoSmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="'+el+'">'+el+'</a>';
	});
	MirkoEmotkiUsr.forEach(function(el){
		MirkoSmieszkiusr += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="'+el+'">'+el+'</a>';
	});
	//Skrypcik na wstawianie MirkoEmotki gdzie jest kursor
	jQuery.fn.extend({
        insertAtCaret: function(myValue){
            return this.each(function(i) {
                if (document.selection) {
                    //For browsers like Internet Explorer
                    this.focus();
                    var sel = document.selection.createRange();
                    sel.text = myValue;
                    this.focus();
                }
                else if (this.selectionStart || this.selectionStart == '0') {
                    //For browsers like Firefox and Webkit based
                    var startPos = this.selectionStart;
                    var endPos = this.selectionEnd;
                    var scrollTop = this.scrollTop;
                    this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
                    this.focus();
                    this.selectionStart = startPos + myValue.length;
                    this.selectionEnd = startPos + myValue.length;
                    this.scrollTop = scrollTop;
                } else {
                    this.value += myValue;
                    this.focus();
                }
            });
        }
    });
    //definiujemy zakladke HALP!
    var help = '';
    help += '<div class="clr wysiwygopt lheight25 "><a class="button iconpoint fleft tcenter" href="#" title="tekst pogrubiony"><span class="icon mini editb inlblk vtop">&nbsp;</span></a><a class="button iconpoint fleft tcenter" href="#" title="tekst pochylony"><span class="icon mini editi inlblk vtop">&nbsp;</span></a><a class="button iconpoint fleft tcenter" href="#" title="cytat"><span class="icon mini editquote inlblk vtop">&nbsp;</span></a><a href="#" class="button iconpoint fleft tcenter" title="spoiler"><span class="icon mini editspoiler inlblk vtop">&nbsp;</span></a><a href="#" class="button iconpoint fleft tcenter" title="kod"><span class="icon mini editcode inlblk vtop">&nbsp;</span></a><a class="button iconpoint fleft tcenter" href="#" title="link"><span class="icon mini editlink inlblk vtop">&nbsp;</span></a><a class="button iconpoint fleft tcenter" href="http://blog.imthy.com/2008/06/strikethrough-strikethrough-text.html" target="_blank" title="przekreślenie"><span class="icon mini editlink inlblk vtop" style="width: 18px; height: 14px; background: none !important; line-height: 16px !important;">l̶e̶l̶</span></a></div>';
    //GLOWNE OKIENKO MIRKOHELPERA
    function MirkoHelperBody (smieszki, smieszkiusr, help, selector, miejscenaprzycisk, pozycjalennego, pozycjaokienka, tryb, komciodata) {
        if (tryb == 1) {
            //strona glowna
            $(miejscenaprzycisk).append('<span '+pozycjalennego+'>|</span> <a href="#" id="mirkuj'+komciodata+'" title="MirkoHelper">( ͡° ͜ʖ ͡°)</a>');     
        } else {
            //reszta
            $(miejscenaprzycisk).append('<span id="mirkuj'+komciodata+'" '+pozycjalennego+'><a href="#" id="mirkuj'+komciodata+'" title="MirkoHelper">( ͡° ͜ʖ ͡°)</a></span>');   
        }
        var $selector = $(selector);
        $(miejscenaprzycisk).append('<div id="mirkohelper'+komciodata+'" class="bgfff abs" style="width: 460px; height: 85px;display: none; '+pozycjaokienka+'; border: 1px solid #999 !important; -webkit-box-shadow: 0px 0px 6px 4px rgba(128, 128, 128, .3); box-shadow: 0px 0px 6px 4px rgba(128, 128, 128, .3); z-index: 101;"><div id="mirki'+komciodata+'" style="border: 0px !important; padding: 0px !important; margin: 4px;" class="bgfff rel">'+ smieszki +'</div></div>');
        $(selector).append('<div id="mirkiusr'+komciodata+'" style="border: 0px !important; padding: 0px !important; margin: 4px; display: none;" class="bgfff rel">'+ smieszkiusr +'</div>');
        $(selector).append('<div id="halp'+komciodata+'" style="border: 0px !important; padding: 0px !important; margin: 4px; display: none;" class="bgfff rel">'+ help +'</div>');
        $(selector).prepend('<span class="abs" style="float: left; z-index: 101;  bottom: -4px; left: 3px; font-size: 9px;"><a href"#" id="halp'+komciodata+'">HALP!</a> <a href="#" id="moar'+komciodata+'">WINCYJ!</a></span>');
        $(selector).prepend('<a id="niemirkuj'+komciodata+'" style="z-index: 101; top: -12px; right: -12px;" class="abs icon mini closepreview tdnone" href="#" title="Zamknij MirkoHelper">&nbsp;</a>');
        $(selector).append('<span style="position: absolute; font-size: 9px; right: 3px; bottom: -3px;"><a href="http://www.wykop.pl/dodatki/pokaz/291/" target="_blank">MirkoHelper</a> by <a href="http://www.wykop.pl/ludzie/Osael/" target="_blank" title="( ͡° ͜ʖ ͡°) usuń konto">@osael</a></span>');   
    }
    //funkcja do obslugi okienka HALP!
    function helpus(pole, selector, tryb) {
		//tryb = 1 - potrzebne do mirkujKomcie
        $(selector+" div.wysiwygopt a.button").live("click", function(){
            var title = ($(this).attr("title"));
            if (title == 'tekst pogrubiony') {
                if (tryb == 1) { $('textarea', $(this).closest("li.aC")).insertAtCaret(' **tekst pogrubiony** '); 					} else { $(pole).insertAtCaret(' **tekst pogrubiony** '); }
            } else if (title == 'tekst pochylony') {
                if (tryb == 1) { $('textarea', $(this).closest("li.aC")).insertAtCaret(' _tekst pochylony_ '); 						} else { $(pole).insertAtCaret(' _tekst pochylony_ '); }
            } else if (title == 'cytat') {
                if (tryb == 1) { $('textarea', $(this).closest("li.aC")).insertAtCaret(' > Cytowany tekst... '); 					} else { $(pole).insertAtCaret(' > Cytowany tekst... '); }
            } else if (title == 'spoiler') {  
                if (tryb == 1) { $('textarea', $(this).closest("li.aC")).insertAtCaret(' ! USUŃ KONTO '); 							} else { $(pole).insertAtCaret(' ! USUŃ KONTO '); }
            } else if (title == 'kod') {
                if (tryb == 1) { $('textarea', $(this).closest("li.aC")).insertAtCaret(' `kod` '); 									} else { $(pole).insertAtCaret(' `kod` '); } 
            } else if (title == 'link') {
                if (tryb == 1) { $('textarea', $(this).closest("li.aC")).insertAtCaret(' [opis odnośnika](http://www.wykop.pl) '); 	} else { $(pole).insertAtCaret(' [opis odnośnika](http://www.wykop.pl) '); } 
            } else {
                $(selector).toggle();
                return true;
            }
            setTimeout(function(){$(selector).fadeToggle('fast');},0);	
            return false;  
        });
    }
    //Funkcja do wstawianie smieszka w pole
    function MirkoHelperSmieszkowanie(pole, selector, komcioData, tryb) {
		//tryb = 1 - potrzebne do mirkujKomcie
        //wstawianie smieszka w pole
        $("div#mirkohelper"+komcioData+" a.mirkosmieszek").live("click", function(){
            var smieszko = ($(this).attr("data-smieszek"));
            if (tryb == 1) {
                $(pole, $(this).closest("li.aC")).insertAtCaret(smieszko+" "); 
                $('li.aC[data-id='+komcioData+'] > div.marginbott10 > div#mirkohelper'+komcioData).fadeToggle('fast');    
            } else {
                $(pole).insertAtCaret(smieszko+" "); 
                $(selector).fadeToggle('fast');	
            }
            return false;
        });  
        
    }
    //Obsluga okienka
    function MirkoHelperSmieci(selector, komcioData) {
        //pokazanie mirkohelpera 
        $("a#mirkuj"+komcioData).live("click", function(){
            $(selector).toggle();
            return false;
        });
        //chowanie HALP! pokazywanie WINCYJ! i w ogóle dziwki, koks i lasery      
        $("a#halp"+komcioData).live("click", function(){
            if( $('div#mirki'+komcioData).is(':visible') ) {
                $('div#mirki'+komcioData).hide();
                $('div#mirkiusr'+komcioData).hide();
                $('div#halp'+komcioData).show();
            } else if ( $('div#mirkiusr'+komcioData).is(':visible') ) {
                $('div#mirkiusr'+komcioData).hide();
                $('div#mirki'+komcioData).hide();    
                $('div#halp'+komcioData).show();
            } else {
                $('div#halp'+komcioData).hide();
                $('div#mirki'+komcioData).show();
            }
            return false;
        });
        //niezle pojebane, nie? ale dziala! :D
        $("a#moar"+komcioData).live("click", function(){
            if( $('div#mirki'+komcioData).is(':visible') ) {
                $('div#mirki'+komcioData).hide();
                $('div#mirkiusr'+komcioData).show();
            } else if ( $('div#mirkiusr'+komcioData).is(':visible') ) {
                $('div#mirkiusr'+komcioData).hide();
                $('div#mirki'+komcioData).show();    
            } else {
                $('div#mirkiusr'+komcioData).show();
            }
            $('div#halp'+komcioData).hide();
            return false;
        });   
        //ukrycie mirkohelpera
        $("a#niemirkuj"+komcioData).live("click", function(){
            $(selector).fadeToggle('fast');
            return false;
        }); 
    }
    //Funkcja do mirkowania komentarzy
    function mirkujKomcie() {
        $("a.replyEntryComment").closest('li[data-type="entry"]').on("click","a.replyEntryComment", function(){
            if (!$(this).closest('li.aC').hasClass('zmirkowane')){
                var komcioData = $(this).closest('li.aC').attr('data-id');
                $(this).closest('li[data-type="entry"]').toggleClass("zmirkowane",true);
                MirkoHelperBody(MirkoSmieszki, MirkoSmieszkiusr, help, 'li.aC[data-id='+komcioData+'] > div.marginbott10 > div#mirkohelper'+komcioData, 'li.aC[data-id='+komcioData+'] > div.marginbott10', 'class="fright abs" style="left: 0px; bottom:0px; margin: 0 0 -20px 3px; z-index: 101;"', 'left:56px; margin-top:-30px;', 2, komcioData);
                MirkoHelperSmieci('div#mirkohelper'+komcioData, komcioData);
                MirkoHelperSmieszkowanie('textarea', 'div#mirkohelper'+komcioData, komcioData, 1);
                helpus('textarea', 'div#mirkohelper'+komcioData, 1);
                //odmirkowanie po wyslaniu komcia
                $("input[type='submit']").live("click",function(){
                    $("li.aC[data-id='"+komcioData+"']").toggleClass("zmirkowane",false);
                    $('div#mirkohelper'+komcioData+'').remove();
                    setTimeout(function(){$('span#mirkuj'+komcioData+'').remove();},600);
                });                
            }
        });
    }    
    
    //----------TU ZACZYNAMY MIRKOWANIE NA POWAZNIE-------------------
  
    if ( document.location.href.match('/wpis/')) {
        //----- EDYCJA WPISU
        if (document.location.href.match('/edytuj/') || document.location.href.match('/edytuj-komentarz/')) {
            MirkoHelperBody(MirkoSmieszki, MirkoSmieszkiusr, help, 'div#mirkohelper', 'fieldset.clr', 'class="abs fleft" style="top: 130px; left: 33px;"', 'top: 133px; left: 81px;', 0, '');
            MirkoHelperSmieci('div#mirkohelper', '');
            MirkoHelperSmieszkowanie('textarea', 'div#mirkohelper', '', 0);
            helpus('textarea', 'div#mirkohelper', 0);  
        } else {
        //----- STRONA WPISU
            MirkoHelperBody(MirkoSmieszki, MirkoSmieszkiusr, help, 'div#mirkohelper', 'div.ddUpload', 'class="abs fleft" style="top: 50px; left: 3px;"', 'top: 55px; left: 55px;' ,0, '');
            MirkoHelperSmieci('div#mirkohelper', '');
            MirkoHelperSmieszkowanie('textarea', 'div#mirkohelper', '', 0);
            helpus('textarea', 'div#mirkohelper', 0);   
        }
    } else if (document.location.href.match('/mikroblog/') || document.location.href.match('/tag/')) {
        //----- STRONA GŁÓWNA / TAG
        MirkoHelperBody(MirkoSmieszki, MirkoSmieszkiusr, help, 'div#mirkohelper', 'div.input-add p', 'class="c999 x-small marginright5 marginleft5"', 'margin: -65px 0 0 200px;', 1, '');
        MirkoHelperSmieci('div#mirkohelper', '');
        MirkoHelperSmieszkowanie('textarea[tabindex=1]', 'div#mirkohelper', '', 0);
        helpus('textarea[tabindex=1]', 'div#mirkohelper', 0);
        mirkujKomcie();

        //mirkuje komcie po załadowaniu nowych wpisów
        $(document).ajaxComplete(function() {
                mirkujKomcie();
            
        });             
    } else if (document.location.href.match('/ludzie/') || document.location.href.match('/dodatki/') ) {
        //----- PROFIL / DODATKI
        mirkujKomcie();
    }
}

if (typeof $ == 'undefined') {
	if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
		// Firefox
		var $ = unsafeWindow.jQuery;
		main();
	} else {
		// Chrome
		addJQuery(main);
	}
} else {
	// Opera >.>
	main();
}
//what is this i dont even
function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
