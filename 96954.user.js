// ==UserScript==
// @name           ixaCacheSelectDungeon
// @namespace      http://www.motionbros.com/
// @include        http://*.sengokuixa.jp/facility/dungeon.php
// @description    cache dungeaon select & auto set top unit & focus submit button.
// @version        0.2
// ==/UserScript==
// 
// @userscriptorg   http://userscripts.org/scripts/show/96954

(function() {
    var dungeon_list    = document.getElementsByName('dungeon_select') ;
    var unit_list       = document.getElementsByName('unit_select') ;
    
    setEvent() ;
    setDungeon() ;
    unit_list[0].checked = true ;
    setFocus() ;
    
    function cacheDungeonNumber(event){
        for( var i = 0 ; i < dungeon_list.length ; i ++ ){
            if( dungeon_list[i].checked === true ){
                GM_log( 'cache ' + dungeon_list[i].value ) ;
                GM_setValue( 'dungeon_number', dungeon_list[i].value ) ;
                return ;
            }
        }
    }
    
    // set Event
    function setEvent(){
        for( var i = 0 ; i < dungeon_list.length ; i ++ ){
            GM_log( 'setEvent ' + i ) ;
            var v = dungeon_list[i].value ;
            dungeon_list[i].addEventListener('click', function(e) {
                cacheDungeonNumber(e);
            }, true) ;
        }
    }
    
    // set dungeon by cach
    function setDungeon(){
        var dungeon_number  = GM_getValue( 'dungeon_number', 0 ) ;
        for( var i = 0 ; i < dungeon_list.length ; i ++ ){
            if( dungeon_number === dungeon_list[i].value ){
                dungeon_list[i].checked = true ;
                return ;
            }
        }
    }
    
    // set focus
    function setFocus(){
        var div_list        = document.getElementsByTagName('div') ;
        for( var i = 0 ; i < div_list.length ; i ++ ){
            if( div_list[i].className === "btnarea" ){
                div_list[i].getElementsByTagName('a')[0].focus() ;
                return ;
            }
        }
    }
})();
