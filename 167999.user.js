// ==UserScript==
// @name		Mirkohelper
// @namespace	http://www.wykop.pl/ludzie/osael/
// @description	NiezbÄdnik kaĹźdego Mirka!
// @author		osael & bios
// @version		1.1
// @grant		none
// @include	http://www.wykop.pl/mikroblog*
// @include	http://www.wykop.pl/wpis*
// @include	http://www.wykop.pl/tag*
// @include	http://www.wykop.pl/ludzie*
// @include	http://www.wykop.pl/dodatki*
// @include http://zarabiam.com*
// @run-atdocument-end
// ==/UserScript==

//Bazowane na kilku innych dodatkach. 
//To jest mĂłj pierwszy skrypt. Powiedz jeĹźeli coĹ jest nie tak jak powinno lub mogĹobyÄ zrobione lepiej.

function main() {
    
    //( ÍĄÂ° ÍĘ ÍĄÂ°)
    var mirkosmieszki = '';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="( ÍĄÂ° ÍĘ ÍĄÂ°)">( ÍĄÂ° ÍĘ ÍĄÂ°)</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="( ÍĄÂ° ĘĚŻ ÍĄÂ°)">( ÍĄÂ° ĘĚŻ ÍĄÂ°)</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="( ÍĄÂş ÍĘÍĄÂş)">( ÍĄÂş ÍĘÍĄÂş)</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="( ÍĄÂ°( ÍĄÂ° ÍĘ( ÍĄÂ° ÍĘ ÍĄÂ°)Ę ÍĄÂ°) ÍĄÂ°)">( ÍĄÂ°( ÍĄÂ° ÍĘ( ÍĄÂ° ÍĘ ÍĄÂ°)Ę ÍĄÂ°) ÍĄÂ°)</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="á(ŕ˛ _ŕ˛ á)">á(ŕ˛ _ŕ˛ á)</a>';
    //mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 10px 15px 0" data-smieszek="(áŚËâŁËáŚ)">(áŚËâŁËáŚ)</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="(ăťă¸ăť)">(ăťă¸ăť)</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="(âĽďšâĽ)">(âĽďšâĽ)</a><br/>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="(âŻÂ°âĄÂ°ďźâŻď¸ľ âťââť">(âŻÂ°âĄÂ°ďźâŻď¸ľ âťââť</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="(ĘâżĘ)">(ĘâżĘ)</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="(ď˝Ąââżâżâď˝Ą)">(ď˝Ąââżâżâď˝Ą)</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="á(ââ¸âźâś)á">á(ââ¸âźâś)á</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="áŚ(Ă˛_ĂłË)á¤">áŚ(Ă˛_ĂłË)á¤</a><br/>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="(âďžâďž)â">(âďžâďž)â</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="t(ă)_/ÂŻ">t(ă)_/ÂŻ</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="ââżâ">ââżâ</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="Ęâ˘á´Ľâ˘Ę">Ęâ˘á´Ľâ˘Ę</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="áś áľá´Ľáľáś">áś áľá´Ľáľáś</a>';
    mirkosmieszki += '<a href="#" class="mirkosmieszek" style="padding: 0 5px 7px 5px; min-width: 30px; display: inline-block;" data-smieszek="ŕ˛ _ŕ˛ ">ŕ˛ _ŕ˛ </a>';

    function mirkujKomcie() {
              $("a.replyEntryComment").closest('li').on("click","a.replyEntryComment", function(){
                  if (!$(this).closest('li.aC').hasClass('zmirkowane')){
                          var komcioData = $(this).closest('li.aC').attr('data-id');
                          $(this).closest('li.aC').toggleClass("zmirkowane",true);
                          $('li.aC[data-id='+komcioData+'] > div.marginbott10').prepend('<span id="mirkuj_'+komcioData+'" class="fright abs" style="left: 0px; bottom:0px; margin: 0 0 -20px 3px; z-index: 101;"><a href="#" id="mirkujkomcia" data-id="'+komcioData+'" title="MirkoHelper">( ÍĄÂ° ÍĘ ÍĄÂ°)</a></span>');  
                          $('li.aC[data-id='+komcioData+'] > div.marginbott10').append('<div id="mirkohelperkomciowy_'+komcioData+'" class="bgfff abs" style="width: 400px; display: none; border: 1px solid #999 !important; -webkit-box-shadow: 0px 0px 6px 4px rgba(128, 128, 128, .3); box-shadow: 0px 0px 6px 4px rgba(128, 128, 128, .3); z-index: 101; left:56px; margin-top:-30px;"><div class="mirki" style="border: 0px !important; padding: 0px !important; margin: 4px; height: 70px" class="bgfff rel">'+ mirkosmieszki +'</span></div>');
                          $('li.aC[data-id='+komcioData+'] > div.marginbott10 > div#mirkohelperkomciowy_'+komcioData+'').prepend('<a id="niemirkujkomcia" data-id="'+komcioData+'" style="z-index: 101; top: -12px; right: -12px;" class="abs icon mini closepreview tdnone" href="#" title="Zamknij MirkoHelper">&nbsp;</a>');
                          $('li.aC[data-id='+komcioData+'] > div.marginbott10 > div#mirkohelperkomciowy_'+komcioData+'> div.mirki').append('<span style="position: absolute; width: 300px; font-size: 9px; margin: 10px 0px 0 30px;"><a href="http://www.wykop.pl/dodatki/pokaz/291/" target="_blank">MirkoHelper</a> by <a href="http://www.wykop.pl/ludzie/Osael/" target="_blank" title="( ÍĄÂ° ÍĘ ÍĄÂ°) usuĹ konto">@osael</a></span>'); 
                          $("a#mirkujkomcia[data-id='"+komcioData+"']").click(function(){
                              $('div#mirkohelperkomciowy_'+komcioData).toggle();
                              return false;
                          });
                          $("div#mirkohelperkomciowy_"+komcioData+" a.mirkosmieszek").click(function(){
                              var smieszko = ($(this).attr("data-smieszek"));
                              $('textarea', $(this).closest("li.aC")).val($('textarea', $(this).closest("li.aC")).val()+ smieszko);
                              $('div#mirkohelperkomciowy_'+komcioData+'').fadeToggle('fast');
                              return false;
                          });         
                          $("a#niemirkujkomcia[data-id='"+komcioData+"']").click(function(){
                              $('div#mirkohelperkomciowy_'+komcioData+'').fadeToggle('fast');
                              return false;
                          });
                          //odmirkowanie po wyslaniu komcia
                          $("input[type='submit']").live("click",function(){
                              $("li.aC[data-id='"+komcioData+"']").toggleClass("zmirkowane",false);
                              $('div#mirkohelperkomciowy_'+komcioData+'').remove();
                              setTimeout(function(){$('span#mirkuj_'+komcioData+'').remove();},600);
                          });
                  } 
            });     
    } 
    if ( document.location.href.indexOf('wpis') > -1 ) {
        //mirkowanie na stronie wpisu
            $('div.ddUpload').prepend('<span class="abs fleft" style="top: 50px; left: 3px;"><a href="#" id="mirkujkomcia" title="MirkoHelper">( ÍĄÂ° ÍĘ ÍĄÂ°)</a><span>');        
            $('div.ddUpload').append('<div id="mirkohelper" class="bgfff abs" style="width: 400px; display: none; top: 55px; left: 55px; border: 1px solid #999 !important; -webkit-box-shadow: 0px 0px 6px 4px rgba(128, 128, 128, .3); box-shadow: 0px 0px 6px 4px rgba(128, 128, 128, .3); z-index: 101;"><div id="mirki" style="border: 0px !important; padding: 0px !important; margin: 4px; height: 70px" class="bgfff rel">'+ mirkosmieszki +'</span></div>');
            $('div#mirkohelper').prepend('<a id="niemirkujkomcia" style="z-index: 101; top: -12px; right: -12px;" class="abs icon mini closepreview tdnone" href="#" title="Zamknij MirkoHelper">&nbsp;</a>');
            $('div#mirki').append('<span style="position: absolute; width: 300px; font-size: 9px; margin: 10px 0px 0 30px;"><a href="http://www.wykop.pl/dodatki/pokaz/291/" target="_blank">MirkoHelper</a> by <a href="http://www.wykop.pl/ludzie/Osael/" target="_blank" title="( ÍĄÂ° ÍĘ ÍĄÂ°) usuĹ konto">@osael</a></span>');
            $("a#mirkujkomcia").live("click", function(){
                $('div#mirkohelper').toggle();
                return false;
            });         
            $("#mirkohelper a.mirkosmieszek").live("click", function(){
                var smieszko = ($(this).attr("data-smieszek"));
                //tabindex do odpowiedzi na wpis
                $('textarea[tabindex=2]').val($('textarea[tabindex=2]').val()+ smieszko); 
                //tabindex4 do odpowiedzi na komentarz. samo textarea nie dziala
                $('textarea[tabindex=4]').val($('textarea[tabindex=4]').val()+ smieszko); 
                setTimeout(function(){$('div#mirkohelper').fadeToggle('fast');},0);	
                return false;
            });   
             //obsluga okienka
            $("a#niemirkujkomcia").live("click",function(){
                $('div#mirkohelper').fadeToggle('fast');
                return false;
            });
    } else if (document.location.href.indexOf('mikroblog') > -1 || document.location.href.indexOf('tag') > -1 ) {
        //mirkowanie wpisu na glownej mirkoblogu
            $('div.input-add p').append('<span class="c999 x-small marginright5 marginleft5">|</span> <a href="#" id="mirkuj" title="MirkoHelper">( ÍĄÂ° ÍĘ ÍĄÂ°)</a>');        
            $('div.input-add p').append('<div id="mirkohelper" class="bgfff abs" style="width: 400px; display: none; margin: -65px 0 0 200px; border: 1px solid #999 !important; -webkit-box-shadow: 0px 0px 6px 4px rgba(128, 128, 128, .3); box-shadow: 0px 0px 6px 4px rgba(128, 128, 128, .3); z-index: 101;"><div id="mirki" style="border: 0px !important; padding: 0px !important; margin: 4px; height: 70px" class="bgfff rel">'+ mirkosmieszki +'</span></div>');
            $('div#mirkohelper').prepend('<a id="niemirkuj" style="z-index: 101; top: -12px; right: -12px;" class="abs icon mini closepreview tdnone" href="#" title="Zamknij MirkoHelper">&nbsp;</a>');
            $('div#mirki').append('<span style="position: absolute; width: 300px; font-size: 9px; margin: 10px 0px 0 30px;"><a href="http://www.wykop.pl/dodatki/pokaz/291/" target="_blank">MirkoHelper</a> by <a href="http://www.wykop.pl/ludzie/Osael/" target="_blank" title="( ÍĄÂ° ÍĘ ÍĄÂ°) usuĹ konto">@osael</a></span>');
            $("#mirkuj").click(function(){
                $('div#mirkohelper').toggle();
                return false;
            });        
            $("#mirkohelper a.mirkosmieszek").click(function(){
                var smieszko = ($(this).attr("data-smieszek"));
                $('textarea[tabindex=1]').val($('textarea[tabindex=1]').val()+ smieszko); 
                $('div#mirkohelper').fadeToggle('fast');	
            });   
            $("#niemirkuj").click(function(){
                $('div#mirkohelper').fadeToggle('fast');
                return false;
            });
         //mirkowanie komentarzy na glownej -  aktywuje po kliknieciu 'odpowiedz'
            mirkujKomcie();
         //mirkowanie po klikniÄciu w belkÄ
            $('.cpointer').live("click", function(){
                mirkujKomcie();
            });
        
    } else if (document.location.href.indexOf('ludzie') > -1 || document.location.href.indexOf('dodatki') > -1 ) {
        //te 'dodatki' to na sile :P
        mirkujKomcie();

    }
}

//what is this i dont even
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.setAttribute("type", "text/javascript");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

if (window.addEventListener) {
    window.addEventListener('load', function() { addJQuery(main); }, false);
}