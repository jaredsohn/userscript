// ==UserScript==
// @name           Klavogonki: username in rank color
// @namespace      klavogonki
// @description	   Eye Candy
// @include        http://klavogonki.ru/*
// @author         Lexin
// @version        1.0
// ==/UserScript==

function main(){
    var e = $$('.user-block .name a')[0];
    var rank = $$('.user-block .name .title')[0].textContent;
    var rn = 0;
    
    switch (rank) {
        case 'Новичок': rn = 1; 
            break;
        case 'Любитель': rn = 2; 
            break;
        case 'Таксист': rn = 3; 
            break;
        case 'Профи': rn = 4; 
            break;
        case 'Гонщик': rn = 5; 
            break;
        case 'Маньяк': rn = 6; 
            break;
        case 'Супермен': rn = 7; 
            break;
        case 'Кибергонщик': rn = 8; 
            break;
        case 'Экстракибер': rn = 9; 
            break;
    }
    
    if (rn > 0) {
        e.addClassName('rang' + rn);
        e.setStyle({textShadow:  'white 0px 1px 0px, white 1px 0px 0px, white 0px -1px 0px, white -1px 0px 0px, white 0px 0px 10px, white 0px 0px 10px'});
    }
}

function contentEval(source) {
    
    if ('function' == typeof source) {
        source = '(' + source + ')();';
    }
    
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}

contentEval(main);
