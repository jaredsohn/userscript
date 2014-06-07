// ==UserScript==
// @name	Pardus Smilies
// @namespace	Pardus Smilies in Messages
// @description Parses the Smilies and Trade Icons into messages (PM and AM)
// @include	*.pardus.at/messages_alliance.php*
// @include	*.pardus.at/messages_private.php*
// @version	1.0
// ==/UserScript==

function decodeString(str) {
    str = str.replace(/:jewels-uni:/g, "<img src='http://static.pardus.at/img/stdhq/chat/jewels_uni.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:jewels-emp:/g, "<img src='http://static.pardus.at/img/stdhq/chat/jewels_emp.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:jewels-fed:/g, "<img src='http://static.pardus.at/img/stdhq/chat/jewels_fed.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:bones:/g, "<img src='http://static.pardus.at/img/stdhq/chat/rashkir_bones.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:brains:/g, "<img src='http://static.pardus.at/img/stdhq/chat/keldon_brains.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:limbs:/g, "<img src='http://static.pardus.at/img/stdhq/chat/skaari_limbs.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:intestines:/g, "<img src='http://static.pardus.at/img/stdhq/chat/human_intestines.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:crystal:/g, "<img src='http://static.pardus.at/img/stdhq/chat/exotic_crystal.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:vip:/g, "<img src='http://static.pardus.at/img/stdhq/chat/vip.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:stimulator:/g, "<img src='http://static.pardus.at/img/stdhq/chat/neural_stimulator.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:drone:/g, "<img src='http://static.pardus.at/img/stdhq/chat/x993_repairdrone.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:xparts:/g, "<img src='http://static.pardus.at/img/stdhq/chat/cybernetic_x993_parts.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:leech:/g, "<img src='http://static.pardus.at/img/stdhq/chat/leech_baby.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:clods:/g, "<img src='http://static.pardus.at/img/stdhq/chat/nutrient_clods.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:bio:/g, "<img src='http://static.pardus.at/img/stdhq/chat/biowaste.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:radio:/g, "<img src='http://static.pardus.at/img/stdhq/chat/radioactive_cells.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:droids:/g, "<img src='http://static.pardus.at/img/stdhq/chat/droid_modules.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:optical:/g, "<img src='http://static.pardus.at/img/stdhq/chat/optical_components.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:bweapons:/g, "<img src='http://static.pardus.at/img/stdhq/chat/battleweapon_parts.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:weapons:/g, "<img src='http://static.pardus.at/img/stdhq/chat/weapons.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:water:/g, "<img src='http://static.pardus.at/img/stdhq/chat/water.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:slaves:/g, "<img src='http://static.pardus.at/img/stdhq/chat/slaves.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:robots:/g, "<img src='http://static.pardus.at/img/stdhq/chat/robots.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:plastics:/g, "<img src='http://static.pardus.at/img/stdhq/chat/plastics.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:package:/g, "<img src='http://static.pardus.at/img/stdhq/chat/package.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:ore:/g, "<img src='http://static.pardus.at/img/stdhq/chat/ore.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:metal:/g, "<img src='http://static.pardus.at/img/stdhq/chat/metal.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:med:/g, "<img src='http://static.pardus.at/img/stdhq/chat/med.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:liquor:/g, "<img src='http://static.pardus.at/img/stdhq/chat/liquor.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:gems:/g, "<img src='http://static.pardus.at/img/stdhq/chat/gems.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:gas:/g, "<img src='http://static.pardus.at/img/stdhq/chat/gas.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:fuel:/g, "<img src='http://static.pardus.at/img/stdhq/chat/fuel.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:food:/g, "<img src='http://static.pardus.at/img/stdhq/chat/food.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:explosives:/g, "<img src='http://static.pardus.at/img/stdhq/chat/explosives.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:energy:/g, "<img src='http://static.pardus.at/img/stdhq/chat/energy.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:embryos:/g, "<img src='http://static.pardus.at/img/stdhq/chat/embryos.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:ematter:/g, "<img src='http://static.pardus.at/img/stdhq/chat/ematter.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:electronics:/g, "<img src='http://static.pardus.at/img/stdhq/chat/electronics.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:drugs:/g, "<img src='http://static.pardus.at/img/stdhq/chat/drugs.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:candy:/g, "<img src='http://static.pardus.at/img/stdhq/chat/drugs.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:chem:/g, "<img src='http://static.pardus.at/img/stdhq/chat/chem.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:\$:/g, "<img src='http://static.pardus.at/img/stdhq/chat/credits_16x16.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:uni:/g, "<img src='http://static.pardus.at/img/stdhq/chat/union.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:emp:/g, "<img src='http://static.pardus.at/img/stdhq/chat/empire.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:fed:/g, "<img src='http://static.pardus.at/img/stdhq/chat/federation.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:eps:/g, "<img src='http://static.pardus.at/img/stdhq/chat/eps.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:tss:/g, "<img src='http://static.pardus.at/img/stdhq/chat/tss.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:\?:/g, "<img src='http://static.pardus.at/img/stdhq/chat/quest.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:!:/g, "<img src='http://static.pardus.at/img/stdhq/chat/excl.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:wub:/g, "<img src='http://static.pardus.at/img/stdhq/chat/wub.gif' style='vertical-align:middle' alt=''>");
    str = str.replace(/:wacko:/g, "<img src='http://static.pardus.at/img/stdhq/chat/wacko.gif' style='vertical-align:middle' alt=''>");
    str = str.replace(/:unsure:/g, "<img src='http://static.pardus.at/img/stdhq/chat/unsure.gif' style='vertical-align:middle' alt=''>");
    str = str.replace(/:rolleyes:/g, "<img src='http://static.pardus.at/img/stdhq/chat/rolleyes.gif' style='vertical-align:middle' alt=''>");
    str = str.replace(/:blink:/g, "<img src='http://static.pardus.at/img/stdhq/chat/blink.gif' style='vertical-align:middle' alt=''>");
    str = str.replace(/:yarr:/g, "<img src='http://static.pardus.at/img/stdhq/chat/yarr.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:ninja:/g, "<img src='http://static.pardus.at/img/stdhq/chat/ninja.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:o/g, "<img src='http://static.pardus.at/img/stdhq/chat/ohmy.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:mellow:/g, "<img src='http://static.pardus.at/img/stdhq/chat/mellow.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:huh:/g, "<img src='http://static.pardus.at/img/stdhq/chat/huh.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/\^_\^/g, "<img src='http://static.pardus.at/img/stdhq/chat/happy.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:dry:/g, "<img src='http://static.pardus.at/img/stdhq/chat/dry.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/-_-/g, "<img src='http://static.pardus.at/img/stdhq/chat/sleep.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:blush:/g, "<img src='http://static.pardus.at/img/stdhq/chat/blush.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:lol:/g, "<img src='http://static.pardus.at/img/stdhq/chat/laugh.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:angry:/g, "<img src='http://static.pardus.at/img/stdhq/chat/angry.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:P/g, "<img src='http://static.pardus.at/img/stdhq/chat/tongue.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/B\)/g, "<img src='http://static.pardus.at/img/stdhq/chat/cool.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:D/g, "<img src='http://static.pardus.at/img/stdhq/chat/biggrin.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/;\)/g, "<img src='http://static.pardus.at/img/stdhq/chat/wink.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:\(/g, "<img src='http://static.pardus.at/img/stdhq/chat/sad.png' style='vertical-align:middle' alt=''>");
    str = str.replace(/:\)/g, "<img src='http://static.pardus.at/img/stdhq/chat/smile.png' style='vertical-align:middle' alt=''>");
    return str;
}

var t = document.getElementsByClassName("tabstyle");
for (i=0;i < t.length;i++) { t[i].innerHTML = decodeString(t[i].innerHTML); }
