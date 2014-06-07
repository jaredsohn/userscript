// ==UserScript==
// @name       Wikipedia Game
// @namespace  http://flamescape.com/
// @version    0.2
// @description  Tool for playing the Wikipedia game
// @match      http://en.wikipedia.org/*
// @copyright  2012+, Flamescape
// ==/UserScript==

(function(w){

    var d = w.document;
    var $A = function(a){var b=[];for(var i=0;i<a.length;i++){b.push(a[i]);}return b;};
    var $$ = function(s,r){return $A((r || d).querySelectorAll(s));};
    var $1 = function(s,r){return (r || d).querySelector(s);};
    
    var moves = JSON.parse(GM_getValue('moves') || '[]');
    var saveMoves = function() {
        console.log(moves);
        GM_setValue('moves', JSON.stringify(moves));
    };
    
    var panel = $1('#mw-panel');
    while (panel.firstChild) {
        panel.removeChild(panel.firstChild);
    }
    panel.style.top = '0';
    
    panel.appendChild($1('#p-search'));
    $1('#simpleSearch').style.width = '150px';
    
    var reset = panel.appendChild(d.createElement('button'));
    
    var movesContainer = panel.appendChild(d.createElement('div'));
    
    reset.textContent = 'Reset ('+moves.length+' links)';
    reset.addEventListener('click', function() {
        moves = [];
        saveMoves();
        movesContainer.innerHTML = '';
        reset.textContent = 'Reset ('+moves.length+' links)';
    }, false);
    reset.style.marginBottom = '40px';
    
    panel.style.overflow = 'hidden';
    moves.forEach(function(m){
        var a = movesContainer.appendChild(d.createElement('a'));
        a.className = 'wiki-game';
        a.title = m.text + ' [' + m.timestamp + '] @ ' + m.x + ',' + m.y;
        a.textContent = m.text;
        a.href = m.href;
        a.style.fontSize = '10pt';
        a.style.whiteSpace = 'nowrap';
        
        movesContainer.appendChild(d.createElement('br'));
    });
    
    $1('#mw-head').style.display = 'none';
    $$('a').forEach(function(a){
        if (a.href) {
            if (a.getAttribute('href').substring(0,1) === '#' || a.getAttribute('href').substring(0,6) === '/wiki/' || a.className === 'wiki-game') {
                a.style.color = 'blue';
                a.style.fontWeight = 'bold';
                a.style.textDecoration = 'underline';
                a.addEventListener('click', function(e) {
                    
                    moves.push({
                        'timestamp': new Date(),
                        'href': a.href,
                        'text': a.textContent || '[No Text]',
                        'x': e.clientX,
                        'y': e.clientY,
                        'location': w.location.href
                    });
                    saveMoves();
                    
                }, false);
            } else {
                a.style.display = 'none';
            }
        }
    });

})(typeof unsafeWindow !== 'undefined' ? unsafeWindow : window);