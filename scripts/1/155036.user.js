// ==UserScript==
// @name       Ask Bot
// @namespace  askbot
// @version    0.1
// @description  enter something useful
// @match      http://ask.fm/*
// @copyright  2012+, Mariano Córdoba
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}
function main() {
    var preguntas = [
        '¿Te consideras una persona feliz?',
        '¿Que pensas de los anonimos?',
        '¿Qué tal la pasaste en navidad? ¿Tenes planes para año nuevo?',
        '¿Crees que la navidad es una fiesta comercial más que religiosa?',
        '¿Cúal es tu banda favorita?'
    ];
    
    var flag = 0;
    var vlinks = new Array();
    if(typeof localStorage.vlinks != 'undefined') {
    	vlinks = localStorage.getItem('vlinks').split(',');    
    }
    var ulinks = new Array();
    jQ('.link-blue').each(function() {
        if(!jQ(this).attr('href').match(/http/) && !jQ(this).attr('href').match(/people/)) {
            ulinks.push(jQ(this).attr('href').substr(1,jQ(this).attr('href').length - 1));
        }
    });
    if(ulinks.length == 0) {
        ulinks[0] = '/people/';
    }
    ulinks = jQ.unique(ulinks);
    for(var i in ulinks) {
        flag = 0;
        for(var h in vlinks) {
            if(vlinks[h] == ulinks[i]) {
             	flag = 1;   
            }
        }
        if(flag == 0) {
            //jQ('#profile-input').val(ulinks[i] + ' - ' + ulinks[i].match(/people/) + ' - ' + ulinks.length);
            if(ulinks[i].match(/people/) == null) {
                vlinks.push(ulinks[i]);
                localStorage.setItem('vlinks', vlinks);
                jQ('#profile-input').val(preguntas[Math.floor(Math.random()*5)]);
                jQ('#question_force_anonymous').click();
                jQ('.link-green').click();
                jQ('#question_submit').click();
                setTimeout(function() {
                     window.location.href = 'http://ask.fm/' + ulinks[i];
                }, 30000);
            } else {
                window.location.href = 'http://ask.fm/' + vlinks[Math.floor(Math.random()*vlinks.length-1)];
            }
            break;
        }
    }
}
addJQuery(main);