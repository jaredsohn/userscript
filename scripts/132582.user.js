// ==UserScript==
// @name            wykopHathor
// @description     Minusuje komentarze określonych userów na wykopie
// @version         20130420081259
// @author          opsomh
// @namespace       http://userscripts.org/users/465520/scripts
// @grant           none
// @include         http://www.wykop.pl/link/*
// ==/UserScript==
// @downloadURL     http://userscripts.org/scripts/source/132582.user.js
// @updateURL       http://userscripts.org/scripts/source/132582.meta.js

var main = function (){
    jQuery(function($){
        var noCHide = true, //nie ukrywaj wminusklikniętych komentarzy
        //bordowi = false, //Hathoruj bordowych - hardcore mode :P
        users = [ //userzy do zaminusowania
            //'wykopHathor',//nieaktywny
            'wykopHathor2'
        ],
        ramkaMinusa = true, //daj na false jeśli spowalnia
        sekund = 1000,
        clickTDelta = 5 * sekund,
        styles = [];

        //pokazuj zaminusowane komenty
        //$('li.minus.hidden').toggleClass('hidden');
        if(noCHide){
            $('head').append('<style id="noCHide" type="text/css">' +
                    'ul.comments>li.hidden a.toggle-comment{display:none !important;}' +
                    'ul.comments>li.hidden>blockquote>p, .hoverbox:hover .hoverup{display:block!important;}' +
                    '</style>');
        }

        /*if(bordowi){
            styles.push('header>a.color-2');
        }*/
        for(var i = 0, l = users.length; i < l; i++){
            styles.push('header>a[title="profil ' + users[i] + '"]');
        }

        var m = $(styles.join(', '), '#comments-list-entry').siblings('span.votes').find('a.minus');

        if(m.length){
            //progress
            $('<div id="wykopHathor" ' +
                    'style="display: block; position: fixed; z-index: 999; ' +
                    'top: 0px; right: 0px; width: 2px; background-color: red;">' +
                    '<div style="background-color: lime; height: 0px;"></div></div>'
                    ).css('height', 2 * m.length).appendTo('body');

            var mdis = m.not('.disabled');//nie kliknięte
            $('#wykopHathor>div').css('height', 2 * (m.length - mdis.length));//progress
            if(!mdis.length) return;

            if(ramkaMinusa) mdis.css('border', '1px solid red');//nie kliknięte w czerwoną ramkę

            //hack na alert o przekroczeniu limitu głosów
            var ts = JSON.parse(localStorage.getItem('_hathor_lock'));
            if(ts && (Date.now() - ts > 15 * 60 * sekund)){
                localStorage.removeItem('_hathor_lock');
            }

            var firstDelay = clickTDelta + Math.random() * clickTDelta;
            var curDelayTime = JSON.parse(localStorage.getItem('_hathor_delay'));
            if(curDelayTime && curDelayTime > Date.now()){
                localStorage.setItem('_hathor_delay', curDelayTime + firstDelay * mdis.length);
                firstDelay = firstDelay + curDelayTime - Date.now();
                console.log('HATHOR:', '_hathor_delay',
                        (new Date(curDelayTime)).toLocaleTimeString(),
                        (new Date(firstDelay + Date.now())).toLocaleTimeString(),
                        mdis.length);
            }else{
                localStorage.setItem('_hathor_delay', Date.now() + firstDelay * mdis.length)
            }

            window._hathor_alert = window.alert;
            window.alert = function(message){
                if(/^(?:Wyczerpałeś limit głosów|Sesja wygasła)/.test(message)){
                    console.log('HATHOR:', message);
                    localStorage.setItem('_hathor_lock', Date.now());
                    localStorage.removeItem('_hathor_delay');
                }else{
                    window._hathor_alert(message);
                }
            }
            console.log('HATHOR: alert replaced');

            $.fn.shift = Array.prototype.shift;
            setTimeout(function hathorClick(){
                if(localStorage.getItem('_hathor_lock')){
                    $('#wykopHathor').css('background-color', 'black');
                    console.log('HATHOR: timeout event aborted');
                    return;
                }
                var el = mdis.shift();
                $(el).trigger({type: 'click', originalEvent: ':)'}).filter(function(){
                    return ramkaMinusa;
                }).css('border', '1px solid green');//kliknięte w zieloną ramkę
                $('#wykopHathor>div').css('height', function(_, v){
                    return parseFloat(v) + 2;//progress++
                });

                if(!mdis.length){
                    console.log('HATHOR: finished');
                    return;
                }
                setTimeout(hathorClick, clickTDelta + Math.random() * clickTDelta);
            }, firstDelay);
        }
    });
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
