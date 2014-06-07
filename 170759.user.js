// ==UserScript==
// @name           Rift - Seelenplaner Skillsearch
// @description    Adds an input field at the bootom to search each skill for the given text.
// @namespace      none
// @include        http://seelenplaner.telara.net/*
// ==/UserScript==

var $ = unsafeWindow.$;
var div = document.createElement( 'div' );
div.id = 'gm_area';
var input = document.createElement( 'input' );
input.addEventListener( 'keyup', function(evt) {
    var el = evt.target;
    if( el.value.length < 2 ) {
        $('gm_output').innerHTML = '';
        return;
    }
    var search = new RegExp( '('+el.value+')', 'gi' );
    var soulData = unsafeWindow.soulPlanner.soulData;
    var lang = $('language_selection').value;
    var souls = [ 'cleric', 'mage', 'rogue', 'warrior' ];
    if( $( 'gm_currentonly' ).checked ) {
        souls = [ $('calling_selection').value ];
    }
    var result = [];
    for( var iSoul = 0; iSoul < souls.length; iSoul++ ) {
        var data = soulData[ souls[ iSoul ] ].souls;
        unsafeWindow.Object.each(data, function( soul ) {
            unsafeWindow.Object.each( soul.abilities, function( skill ) {
                var bFound = false;
                unsafeWindow.Object.each( skill.l10n[lang], function( skilltext ) {
                    if( ! search.test( skilltext ) || bFound )
                        return;

                    bFound = true;
                    result.push( { "skill": skill, "soul": soul, "calling": souls[ iSoul ], "type": "ra" } );
                });
            });
            unsafeWindow.Object.each( soul.traits, function( skill ) {
                var bFound = false;
                unsafeWindow.Object.each( skill.l10n[lang], function( skilltext ) {
                    if( ! search.test( skilltext ) || bFound )
                        return;

                    bFound = true;
                    result.push( { "skill": skill, "soul": soul, "calling": souls[ iSoul ], "type": "ba" } );
                });
            });
        });
    }

    
    var txt = '';
    var soul_named = {};
    var bNamed = false;
    for( var iSoul = 0; iSoul < result.length; iSoul++ ) {
        if( typeof soul_named[ result[ iSoul ].soul.id ] == 'undefined' ) {
            soul_named[ result[ iSoul ].soul.id ] = 1;
            if( bNamed ) {
                txt += '</fieldset>';
            }
            txt += '<fieldset style="border: 2px outset yellow; padding: 5px"><legend style="color: orange">'+result[ iSoul ].soul.l10n[lang].name+(result[ iSoul ].soul.pvp ? ' (PvP)' : '')+'</legend>';
            bNamed = true;
        }
        skill = result[ iSoul ].skill;
        txt += '<h4>'+String(skill.l10n[lang].name).replace( search, '<span style="color:red">$1</span>' )+' ('+( skill.reqs.pre_ability_amount ? skill.reqs.pre_ability_amount : skill.reqs.total_sp )+')</h4>';
        var posx = 0;
        var posy = 0;
        var n = parseInt( result[ iSoul ].soul.id, 10 );
        if( result[ iSoul ].type == "ra" ) {
            var b = parseInt( skill.pos, 10 );
            posx = -((n - 1 - (Math.floor((n - 1) / 9) * 9)) * 30);
            posy = -((b - 1) * 30);
        } else {
            var m = parseInt( skill.pos[1], 10 );
            var l = parseInt( skill.pos[0], 10 );
            posx = -(((n - 1 - (Math.floor((n - 1) / 9) * 9)) * 160) + ((m - 1) * 40));
            posy = -(320 - ((l - 1) * 40));
        }
        txt += '<div class="'+result[ iSoul ].calling+'"><div class="'+result[ iSoul ].type+'_icon" style="background-position:'+posx+'px '+posy+'px"></div></div>';
        if( skill.max_range ) {
            txt += '<p style="margin:0;color:gray">'+Math.floor(skill.max_range)+'m</p>';
        }
        if( skill.cast_time ) {
            txt += '<p style="margin:0;color:gray">Cast: '+skill.cast_time+'</p>';
        }
        if( skill.cooldown ) {
            txt += '<p style="margin:0;color:gray">Cooldown: '+Math.floor(skill.cooldown)+' Sek</p>';
        }
        if( skill.cost_mana ) {
            txt += '<p style="margin:0;color:gray">Cost: '+skill.cost_mana+' Mana</p>';
        }
        if( skill.cost_energy ) {
            txt += '<p style="margin:0;color:gray">Cost: '+skill.cost_energy+' Energie</p>';
        }
        txt += '<p>'+String(skill.l10n[lang].description).replace( search, '<span style="color:red">$1</span>' )+'</p>';
    }
    if( txt.length > 0 ) {
        txt += '</fieldset>';
    }
    $('gm_output').innerHTML = txt;
}, false );
div.appendChild( input );
input = document.createElement( 'input' );
input.type = 'checkbox';
input.id = 'gm_currentonly';
input.checked = true;
div.appendChild( input );
var label = document.createElement( 'label' );
label.htmlFor = 'gm_currentonly';
label.innerHTML = 'Nur aktuelle Klasse';
div.appendChild( label );
var output = document.createElement( 'div' );
output.id = 'gm_output';
div.appendChild( output );
document.body.appendChild( div );

var moveClassName = function() {
    document.getElementById('soul_area').className = document.body.className;
    document.body.className = '';
};

window.setTimeout( moveClassName, 100 );
document.getElementById('calling_selection').addEventListener( 'change', function(evt) {
    window.setTimeout( moveClassName, 100 );
}, false );
