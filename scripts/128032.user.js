// ==UserScript==
// @name           LambLongs: Battle Script
// @author         A Spooky-Assed Ghost
// @description    Attacks everything, forever.
// @version        1.0.7
// @icon           http://i.imgur.com/bdLGq.png
// @namespace      http://userscripts.org/users/171410
// @include        http://www.goatlings.com/battle_1player.php*
// @include        http://www.goatlings.com/battling_1p.php*
// @include        http://www.goatlings.com/battle_1p_end.php*
// @include        http://www.goatlings.com/battle_1p.pro.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
var boners = '';
var initial=true;
var currentFile = window.location.href.split('.com/')[1].split('?')[0];
var turncount = GM_getValue('turncount', 0);
var weaponlist = ['Bow Of Cupid', 'Ruby Wand', 'Cutie Rod', 'Love Potion', 'Stinky Parfum', 'Cobra Mirror', 'Goat Horn Dagger', 'Laser', 'Water Balloon', 'Water Gun', 'Tornado Bottle', 'Sleeping Powder', 'Attack Rattle', 'Hero Sword', 'Revolver', 'Pink Popper', 'Orange Popper', 'Teal Popper', 'Green Popper', 'Blue Popper', 'Flutter Wand IV', 'Flutter Wand III', 'Flutter Wand II', 'Flutter Wand I', 'Dark Ice Fury', 'Earth Ice Fury', 'Love Ice Fury', 'Gold Ice Fury', 'Blue Ice Fury', 'Stab Crystal Sword', 'Burn Crystal Sword', 'Ice Crystal Sword'];
var currentweapon = GM_getValue('currentweapon', 0);

function doMain(){
    if(initial){
        initial=false;
    }else{
        if(currentFile == 'battle_1p.pro.php'){
            window.location.href = 'http://www.goatlings.com/battle_1player.php';
        }else if(currentFile == 'battle_1player.php'){
            boners = $("a:contains('Challenge')");
            if(boners && boners.length){
                window.location.href = boners[0].href;
            }else{
                window.document.forms[1].elements.namedItem("usepet").selectedIndex = 0;
                window.document.getElementsByTagName('form')[1].submit();
            }
        }else if(currentFile == 'battling_1p.php'){
            boners = $("a:contains('here')");
            if(boners && boners.length){
                GM_setValue('turncount',0);
                window.location.href = boners[0].href;
            }else if(turncount>=0){
                GM_setValue('turncount',turncount+1);
                for(var i=currentweapon;i<=weaponlist.length;i=i+1){
                    boners = $("a:contains('"+weaponlist[i]+"')");
                    if(boners && boners.length){
                        GM_setValue('currentweapon',i);
                        window.location.href = boners[0].href;
                    }
                }
                if(i>=weaponlist.length){
                    window.document.forms[1].elements.namedItem("use_attack").selectedIndex = 1;
                    window.document.getElementsByTagName('form')[1].submit();
                }
            }
        }else if(currentFile == 'battle_1p_end.php'){
            boners = $("a:contains('Back to the battle center.')");
            if(boners && boners.length){
                window.location.href = boners[0].href;
            }
        }
    }
    setTimeout(doMain,1);
}
doMain();