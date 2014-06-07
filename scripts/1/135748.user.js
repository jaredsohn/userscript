// ==UserScript==
// @name         WMOCN-Plus
// @namespace    http://www.airmio.com/
// @version      0.3
// @description  将 wmo.178.com 中鼠标指向技能的英文说明替换为中文说明
// @match        http://wmo.178.com/*
// @match        http://www.wowmeteronline.com/*
// ==/UserScript==


(function(func){
    // inject func
    var el = document.createElement('script');
    el.innerHTML = '(' + func.toString() + ')()'; console.log(el);
    document.body.appendChild(el); // run the script
})(function(){

    document.getElementById('combathead').setAttribute('style','margin-top: -160px');
    document.getElementById('combatnav').setAttribute('style','margin-top: -160px');
    
    // fix armofy link
    var armoryLink = document.querySelectorAll('a[href^="http://cn.battle.net"]');
    for(var i = armoryLink.length; i--; ){
        armoryLink[i].href = armoryLink[i].href.replace('cn.battle.net','www.battlenet.com.cn')
    }


    /**
     * Inject translation
     */
    if(!$WowheadPower){
        return;
    }

    function inject(script) {
        var el = document.createElement('script');
        el.setAttribute("type", "application/javascript");
        el.setAttribute("src", script);
        document.body.appendChild(el); // run the script
        document.body.removeChild(el); // clean up
        }

    window.$178DB = {
        'spells':{},
        'regstSpell': function(cnSpellObj){
            var currentSpell = $178DB.spells[cnSpellObj['id']];
            //replace en tips with cn tips
            currentSpell[2]['tooltip_enus'] = cnSpellObj['tip'];
            //call the origin register
            origReg.apply($WowheadPower,currentSpell);
        }
    };

    var origReg = $WowheadPower.registerSpell;
    $WowheadPower.registerSpell = function (id,zero,spellObj) {
        var cnSpellJs = 'http://db.178.com/wow/cn/a/spell/{id}.js'.replace('{id}',id);
        $178DB['spells'][id] = [id,zero,spellObj];
        // OK, It's your turn now
        inject(cnSpellJs);
    };
    
});