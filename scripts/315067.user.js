// ==UserScript==
// @name        KG_ExactSpeed
// @namespace   http://klavogonki.alexzh.ru
// @description Выводит в результатах заезда скорость с точностью до сотых
// @author      voidmain
// @license     MIT
// @version     1.2
// @include     http://klavogonki.ru/g/*
// @grant       none
// @run-at      document-end 
// ==/UserScript==


function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
}

function main() {
    tplRating = new Template('\
<div><ins id=place#{id} class="place place#{place}">#{place} место</ins><ins id=rating_gained#{id}></ins></div> \
#{delresult}\
<div class=stats id=stats#{id}>\
<div><span class=bitmore><span class=bitmore>#{time}</span></span>#{time_decimal}</div>\
<div>\
<span class=bitmore><span class=bitmore>#{exact_speed}</span></span> <span id=znmin#{id}>зн/мин</span>\
</div>\
<div>#{errors_html}</div>\
</div>\
');
    Game.prototype.oldUpdateRaceRating = Game.prototype.updateRaceRating;
    Game.prototype.updateRaceRating = function() {
        for(var i=0;i<this.places.length;i++) {
            var player = this.players[this.places[i]];
            if($('rating'+this.places[i]).style.display == 'none') {
                var charsTotal = game.charsTotal;
                if(game.custom && game.params.mode == 'marathon')
                {
                    charsTotal = player.info.charsTotal;
                    player.info.time = '5:00';
                }
                player.info.exact_speed = (Math.floor(charsTotal * 6000000 / (player.info._finished - game.begintimeServer*1000))/100).toFixed(2);
            }
        }
        this.oldUpdateRaceRating();
    }
}

window.addEventListener("load", function() {
    // script injection
    exec(main);
}, false);