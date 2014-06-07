// ==UserScript==
// @name          tribalwars - Smili es-BB-Codes-List-www.plapl.com
// @version       2.1-arabic
// @author        Samuel Essig (http://c1b1.de)
// @description   
// @namespace     c1b1.de
// @homepage      http://c1b1.de
// @copyright     2009, Samuel Essig (http://c1b1.de)

// @include       http://*.tribalwars.*/*forum.php*answer=true*
// @include       http://*.tribalwars.*/*forum.php*edit_post_id*
// @include       http://*.tribalwars.*/*forum.php*mode=new_thread*
// @include       http://*.tribalwars.*/*forum.php*mode=new_poll*

// @include       http://*.tribalwars.*/*screen=memo*

// @include       http://*.tribalwars.*/*screen=mail*mode=new*
// @include       http://*.tribalwars.*/*screen=mail*mode=view*

// @include       http://*.tribalwars.*/*screen=ally*mode=overview*
// @include       http://*.tribalwars.*/*screen=ally*mode=properties*

// @exclude       http://forum.tribalwars.*/*
// ==/UserScript==

/*

############## Distribution Information ##############

All content by c1b1.de
Do not distribute this script without this logo.

######################## Logo ########################
           ___   __       ___             __
  _____   <  /  / /_     <  /        ____/ /  ___
 / ___/   / /  / __ \    / /        / __  /  / _ \
/ /__    / /  / /_/ /   / /   _    / /_/ /  /  __/
\___/   /_/  /_.___/   /_/   (_)   \__,_/   \___/

######################################################

If you have any questions, comments,
ideas, etc, feel free to contact me
and I will do my best to respond.

         mail:info@c1b1.de

         skype:c1b1_se

         http://c1b1.de

####################### License ######################

Shared under the 'CC Attribution-Noncommercial-Share Alike 3.0 Germany' License:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/legalcode

English Summary of that license:
http://creativecommons.org/licenses/by-nc-sa/3.0/de/deed.en


##################### Description ####################


Funktioniert mit Firefox 3.5+ (GM 0.8+) und Opera 10+

Für Opera wird folgende Scriptversion empfohlen:
http://userscripts.org/scripts/version/39879/112353.user.js

Fügt ein Auswahlfeld im Internen Forum hinzu, damit man Smilies und Icons auswählen kann, außerdem die BB-Codes für Berichte und Code.
Seit Version 2 können Texte gespeicherter werden.


Screenshot:
http://c1b1se.c1.funpic.de/newhp_userscripts_screens/ds.smilies_bb-codes_0.png ( First Version )
http://s3.amazonaws.com/uso_ss/1407/large.png ( Version 1.7 )
http://s3.amazonaws.com/uso_ss/1406/large.png ( Version 1.7 )
http://s3.amazonaws.com/uso_ss/1405/large.png ( Version 1.8 )
http://s3.amazonaws.com/uso_ss/1408/large.png ( Version 1.8 )

*/
const ver = 2.1;

var smilies = new Array(
'http://www.alfaseeh.com/vb/images/smilies/slam.gif',
'http://www.plapl.com/images/img/besmllah.gif',
'http://www.plapl.com/images/smilies/1.gif',
'http://www.plapl.com/images/smilies/2.gif',
'http://www.plapl.com/images/smilies/3.gif',
'http://www.plapl.com/images/smilies/4.gif',
'http://www.plapl.com/images/smilies/5.gif',
'http://www.plapl.com/images/smilies/6.gif',
'http://www.plapl.com/images/smilies/7.gif',
'http://www.plapl.com/images/smilies/8.gif',
'http://www.plapl.com/images/smilies/9.gif',
'http://www.plapl.com/images/smilies/10.gif',
'http://www.plapl.com/images/smilies/11.gif',
'http://www.plapl.com/images/smilies/12.gif',
'http://www.plapl.com/images/smilies/13.gif',
'http://www.plapl.com/images/smilies/14.gif',
'http://www.plapl.com/images/smilies/15.gif',
'http://www.plapl.com/images/smilies/16.gif',
'http://www.plapl.com/images/smilies/17.gif',
'http://www.plapl.com/images/smilies/18.gif',
'http://www.plapl.com/images/smilies/19.gif',
'http://www.plapl.com/images/smilies/20.gif',
'http://www.plapl.com/images/smilies/21.gif',
'http://www.smiles.alqaly.com/smiles/13/43121b44bcd10e5ce38cbf5816a39a4d.gif',
'http://www.smiles.alqaly.com/smiles/13/fa015c58b98d23fa3b3bc5ce198c0a90.gif',
'http://www.smiles.alqaly.com/smiles/9/d3fb3e3cdb6ce564577c652c9ebf8ea1.gif',
'http://www.plapl.com/images/smilies/23.gif',
'http://www.plapl.com/images/smilies/24.gif',
'http://www.plapl.com/images/smilies/25.gif',
'http://www.plapl.com/images/smilies/26.gif',
'http://www.plapl.com/images/smilies/27.gif',
'http://www.plapl.com/images/smilies/28.gif',
'http://www.plapl.com/images/smilies/29.gif',
'http://www.plapl.com/images/smilies/30.gif',
'http://www.plapl.com/images/smilies/31.gif',
'http://www.plapl.com/images/smilies/32.gif',
'http://www.plapl.com/images/smilies/33.gif',
'http://www.plapl.com/images/smilies/34.gif',
'http://www.plapl.com/images/smilies/35.gif',
'http://www.plapl.com/images/smilies/36.gif',
'http://www.plapl.com/images/smilies/37.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_biggrin.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_smile.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_wink.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cool.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_razz.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_eek.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_surprised.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_twisted.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_evil.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_confused.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_neutral.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_sad.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cry.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_mrgreen.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em16.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em17.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em18.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em19.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em1500.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2100.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2200.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2300.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2400.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2700.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2700.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em2900.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em3000.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em3300.gif',
'http://twbbcodes.pytalhost.com/images/smileys/em3400.gif',
'http://c1b1.de/smile/happy.png',
'http://c1b1.de/smile/sad.png',
'http://c1b1.de/smile/angel.png',
'http://c1b1.de/smile/devil.png',
'http://plapl.com/images/icons/icon1.gif',
'http://plapl.com/images/icons/s14.gif',
'http://plapl.com/images/icons/s18.gif',
'http://plapl.com/images/icons/s1.gif',
'http://plapl.com/images/icons/s7.gif',
'http://plapl.com/images/icons/s15.gif',
'http://plapl.com/images/icons/s19.gif',
'http://plapl.com/images/icons/s10.gif',
'http://plapl.com/images/icons/s16.gif',
'http://ae1.tribalwars.ae/graphic/unit/unit_spear.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_sword.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_axe.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_archer.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_spy.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_light.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_marcher.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_heavy.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_ram.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_catapult.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_knight.png',
'http://ae1.tribalwars.ae/graphic/unit/unit_snob.png',
'http://ae1.tribalwars.ae/graphic/buildings/barracks.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/stable.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/main.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/farm.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/garage.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/snob.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/smith.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/place.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/statue.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/market.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/wood.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/stone.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/iron.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/storage.png?1',
'http://ae1.tribalwars.ae/graphic/buildings/wall.png?1',
'http://smilles.m7shsh.com/data/media/18/00db9337ef155724e7660a845faa4d96.gif',
'http://smilles.m7shsh.com/data/media/18/010.gif',
'http://smilles.m7shsh.com/data/media/18/85e442fc844ccce495d530dcae90afd6.gif',
'http://smilles.m7shsh.com/data/media/18/a69a75274604c24dc250db92cdeaa6b9.gif',
'http://smilles.m7shsh.com/data/media/18/e18e0b18f60eec83054c40305e5a1088.gif',
'http://smilles.m7shsh.com/data/media/18/6a26d86970d6bf5a0e8233f7544ef269.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_75.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_76.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_74.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_67.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_65.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_66.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_46.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_97.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_94.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_87.gif',
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_86.gif');

var ds_icons = new Array(

new Array(
'مباني',
'graphic/buildings/main.png',
'graphic/buildings/barracks.png',
'graphic/buildings/stable.png',
'graphic/buildings/garage.png',
'graphic/buildings/snob.png',
'graphic/buildings/smith.png',
'graphic/buildings/place.png',
'graphic/buildings/statue.png',
'graphic/buildings/church.png',
'graphic/buildings/market.png',
'graphic/buildings/wood.png',
'graphic/buildings/stone.png',
'graphic/buildings/iron.png',
'graphic/buildings/farm.png',
'graphic/buildings/storage.png',
'graphic/buildings/hide.png',
'graphic/buildings/wall.png'
),

new Array(
'قوات',
'graphic/unit/unit_archer.png',
'graphic/unit/unit_axe.png',
'graphic/unit/unit_catapult.png',
'graphic/unit/unit_heavy.png',
'graphic/unit/unit_knight.png',
'graphic/unit/unit_light.png',
'graphic/unit/unit_marcher.png',
'graphic/unit/unit_ram.png',
'graphic/unit/unit_snob.png',
'graphic/unit/unit_spear.png',
'graphic/unit/unit_spy.png',
'graphic/unit/unit_sword.png'
),

new Array(
'قوات حجم اكبر',
'graphic/unit_big/archer.png',
'graphic/unit_big/axe.png',
'graphic/unit_big/catapult.png',
'graphic/unit_big/heavy.png',
'graphic/unit_big/knight.png',
'graphic/unit_big/light.png',
'graphic/unit_big/marcher.png',
'graphic/unit_big/ram.png',
'graphic/unit_big/snob.png',
'graphic/unit_big/spear.png',
'graphic/unit_big/spy.png',
'graphic/unit_big/sword.png'
),


new Array(
'قرى',
'graphic/map/b1.png',
'graphic/map/b1_left.png',
'graphic/map/b2.png',
'graphic/map/b2_left.png',
'graphic/map/b3.png',
'graphic/map/b3_left.png',
'graphic/map/b4.png',
'graphic/map/b4_left.png',
'graphic/map/b5.png',
'graphic/map/b5_left.png',
'graphic/map/b6.png',
'graphic/map/b6_left.png'
),

new Array(
'مصادر و موارد',
'graphic/eisen.png',
'graphic/holz.png',
'graphic/lehm.png',
'graphic/res.png'
),

new Array(
'نقاط ملونه',
'graphic/dots/blue.png',
'graphic/dots/brown.png',
'graphic/dots/green.png',
'graphic/dots/grey.png',
'graphic/dots/red.png',
'graphic/dots/yellow.png'
),

new Array(
'اسهم و اتجهات',
'graphic/forwarded.png',
'graphic/group_jump.png',
'graphic/group_left.png',
'graphic/group_right.png',
'graphic/links2.png',
'graphic/rechts2.png',
'graphic/links.png',
'graphic/rechts.png',
'graphic/oben.png',
'graphic/unten.png',
'graphic/pfeil.png',
'graphic/villages.png',
'graphic/overview/up.png',
'graphic/overview/down.png',
'graphic/map/map_ne.png',
'graphic/map/map_nw.png',
'graphic/map/map_se.png',
'graphic/map/map_sw.png'
),

new Array(
'اشكال رسائل',
'graphic/answered_mail.png',
'graphic/deleted_mail.png',
'graphic/new_mail.png',
'graphic/read_mail.png'
),

new Array(
'ادوات التحالف',
'graphic/ally_rights/diplomacy.png',
'graphic/ally_rights/forum_mod.png',
'graphic/ally_rights/found.png',
'graphic/ally_rights/internal_forum.png',
'graphic/ally_rights/invite.png',
'graphic/ally_rights/lead.png',
'graphic/ally_rights/mass_mail.png'
),

new Array(
'اشكال من التقرير',
'graphic/ally_forum.png',
'graphic/face.png',
'graphic/gold.png',
'graphic/klee.png',
'graphic/rabe.png',
'graphic/rename.png',
'graphic/command/attack.png',
'graphic/command/back.png',
'graphic/command/cancel.png',
'graphic/command/return.png',
'graphic/command/support.png',
'graphic/unit/def.png',
'graphic/unit/def_archer.png',
'graphic/unit/def_cav.png',
'graphic/unit/speed.png',
'graphic/unit/att.png',
'graphic/forum/forum_admin_unread.png',
'graphic/forum/thread_close.png',
'graphic/forum/thread_closed_unread.png',
'graphic/forum/thread_delete.png',
'graphic/forum/thread_open.png',
'graphic/forum/thread_unread.png'
)

);


var icon_smilies = 'http://www.plapl.com/images/smilies/26.gif';

var icon_report_direct = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYFBMVEUAAACvsrebjHDXy7f5+Pausra0po2nmYC+s5qL\
e125ur7QxJ6WDArKvJHRv6rDEBCtsbbTyKLNwZvRgHLJvJTZl4rn3Na2Z1rVzK7t6OLIuI/Ds43Zz7DKu5Lb0bGssLVAcwUHAAAAAXRSTlMAQObYZgAAAKVJ\
REFUeF5tzdcOwzAIQFGG98ruHv//l8WtFNVyzhtXIACC/oOIOgDgpRMAH50R8NV5H8V2k501htvoiJViI3F/tJFTSl3Z1kdTxfY8DCdJhuwkMcboyJ7UNgzF\
EJUYNeA8k1HiuqREZRYIuK6e5FC2UiprJTFncp6t9+6cllzpb/SWvMl5W35xrNGRJ5aBOe+xg0dRy/eOxPvt2bjdA0AYdWMM8AFB7hjReYdZRgAAAABJRU5E\
rkJggg==';

var icon_report_link = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABIFBMVEUAAACbjHCvsrfJvJT5+PbXy7e0po2+s5qLe12n\
mYDKvJG5ur6tsbausrbb0bHRv6qWDArZz7DQxJ7DEBDRgHLZl4rNwZvn3NbTyKLDs43IuI+2Z1rt6OLVzK7Ku5KssLV1wtydqZxgosGVqKVXsVBq0eyBqZVf\
mJ26t5ZcndFtgnQsoD+J7vjAvpaKnomnqYlsoGJFWnEob3E8nbJPw+RQxeZKqdpIf8hSf5hsvENKUnkkR38xcaU2iMI5ic09ecc4Wbo1W48+hUxobH4lNoQf\
ZVohgFAudIAxUaksQagrQZo/WoSimotUX4cnY1IUfRwXgCglcl80Xpc8YKN1gZGrpJFqeIc/hVcymURAlXFVi7CCnai2r5JhyuhVlc9biqeITlZjAAAAAXRS\
TlMAQObYZgAAAPNJREFUeF5lzeNyBEEUgNG+bYy1jG3btu33f4t0MqnJbO3389QFQsYthTF2DUK4oy2DcNiWg7BXxITinHleVwkFMEoZ97z/yRQEpbTJVIFM\
NeK4YolDjmEoQFVoGsc+B/DzR1Xg1NZMggD86k8WIwl20U4Fgd/XMxxFkYtwBkIyJaVoBEl37+BElmGECUgFkk/1p0kyMDI0SYhFLUAC06NjjI1/fH5Na+1a\
zJuZnZtfWFxaXtHaKXB1bX1jc2t7Z7eMe/sHh0fHJ6dnWuMCzy8ur65vbu/uf2+Svx4en55fXt/eCbFYq3e2VK8ZhIzjtuQY9A0LLSCs0XdPPQAAAABJRU5E\
rkJggg==';

var icon_code = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkYLjfIjVsA\
AAKeSURBVDjLnZRLSFRhFMd/3zejTir2cqNYZDkKPibMR20isVJa9bAWCe0q2rSQamPhIre5L4g2QZsWhVFmiESJoab5GEYszUc6YabkjPNq5t6vxXWuDs5YeeAP3+N//t+5555zBED7\
m07lCwb5HxMIc61QpNls1NZUC/GstU3lZwewWiRSCrZiuq6IaDqzSzuQAFaLNC/i4deyl67uQUKhMLqu8PuDdHUPsuILoOuKqMZKIGgISik2RXtHNzcaW0hJSUJKwYfeYa5ebza/Kgql\
lCH4N+vpc1JRVrS2/+jEUWLHZkuJzasQ/ybY2++ksqx43QMjHC4vicv9q+DUtJv5H0tUlhuCXq+P0bFJDlcUx//7z1rbVOGeUMzhpct3cI19BUCLaASCIdLTU40S0XV8/iBpqTaENOLp\
f/8EAOdMMlaA3yFPjGDd6aNULTkAePr8Ldsz0jh18ggArzt68Hh81J0+ZvLX/DMNQS0SiRGsra4w148ev6T+/AkunKkC4MWrLo4fK6P+/AmTE/UXYjWHmqbFxeSUm5+Lyxw6aEfTNDxe\
H6Ofpyl15MXlC4QRYSQcipvgvk8udu/KICdrJ5FwiP5PLgAK83MS+liNvtTMg4bbD8z15Mw8kYjGrab7AMy6F7FaLTQ2PzRKREpamq/E9PSGsrFYpAn390Wys3abd7NzC+RkZ8Zw1ptS\
qxGut3t3jRe/zS3wrttJ082LHMjNxuP1c/JcIw3XzlJZVpCwbhMWdv/QONszUtm/LwuAwZEJpBQ4inITi23WegNDXygtyUMIY6QNDI9TWLAXmy05oaCZQ4VlAwaGJig9aI/dO+xxuVGY\
rZcpXCQlSaTFsrUBq2mEwzr+lFJjjre/6VQrgSBiawMbpSB9m43amuqkP9SuNod5SVyuAAAAAElFTkSuQmCC';

var icon_icons = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHGQkaKOydSuwA\
AAMgSURBVDjLnZRPaBxlGMZ/839md5P9Y3Y3TTZry9pNtJVqD4b2EDWH1JMnteCpXgpBBO2hooeCBW+CJ/UiVFDw4CEQClsVzCUWqlbBGpVgUvxTaNxm081kd2Z35pvxMO402yyCeU/D\
937P8z3zvs/7SgALi7UwJOT/hIQUf4eEJE2TU3OzirSwWAurYw6qIiPLEvuJIAjxRcBfjQwqgKrIcWKvFJ0w6ACgqAaB6A4kVRWZHceNCAcpO/7cZbJTZYRrs3njx+jQ/Qnf6/DL1Q8H\
koZhiDwoMfPaZazcNsK16drbWIUpAMxciaNTVc6+/PbgukpSpHB3vHi+Rv7403hff8x0/k8SBy0sEzbqw+juXbZEFsdp4PhJLLW1h7RP4cmzy/zhjDG5/hmPlZKMFrMcO1KlWjnIo1MV\
XjhdBiBhWpx//cJAlXKvGUEQYv9+g+bKAoaukc0Mc/ihKhMHyhQeSDOSL5LPZRgvejhdGVVP8+ZbH8XYXkNVgG5nGwBtaILnj9xFsXQeHC9SKpVI6QZWIo9xu8746G2efOJvbm342G0H\
4fsxNoqRSKHw/SjZFHzzm42m6qSSSVK6QS6bjq837Xs1Mw2d764vx1jh+0jSvwqFEACIts3E2BjPzu5waGKD8uF1tFwJgIcbdb692qC+2WI83+C9S9+zG9ubHhXA9yLjaumoR7bd5dUL\
Na4srQGQHjIBePfiU2w1nZjskclKjI0NHjFHr2QmhzGNFvWtJG+8Mg3AlaU1mrbbBzo3/wwrq00kORljezPd58OECyThy+UmS9c0DlVmmK/MANBuOTjOHdyO4NbNLSR5CNMw7puU+3z4\
6cWjAHS9Do7r0m45MZkf3FNyp5vEEwHTJ078t7EBDowWMNSAhCHT2kUqRNB3T1Nk5k6W+8kkaS/hmdPH+HX1JqlwMz7reB6+EDiuj9sRmIbO6to6vt/o/+VeDUOUvsSl98+BJPPS/DsU\
CyNksgUArq+4XPthk08+OIMsBwNXsrSwWAtHpJ/RNBlZUfa3YIXA8wLaxuPRHv/8i6/CHcdF2t/CJgwhZZmcmpuV/wER7Et6eXrxhgAAAABJRU5ErkJggg==';

var icon_convertCoords = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAA\
ABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAANiSURBVDhPnZVdaFtlGMd/5+Tkc2maNBubTWzW1JTQ6kDprhRBalFECU7GvBoDZTL1wiHb\
wEtBL3Y5ZFgmeDfGrLMbtEOddirKtBCUdjE2nTbFNetam6YfyUl6kuP7npK5kkLUB55zzvue//M/z/t8HWVwcFDZ2xmrres6/0UUlHtwE5MdLhefDl1oVT7/\
4msz3LbclEuzqU0xMws+tLWSzr8B2+1aU0KLyzRNVHXTffmsKP8cpc6w3d527NJeux9cf5Z3qctLd7gzlbZs1Zad1t3uduH3Omnb3dHAKW0azmGRCp37NcnN\
775k9Idf6B8YIBxaI/nHOhPfXCayy0Xi2DtEu2INpFsiXauZXDt3mrdef5uy02eRRQIKe8wcHaEeXko8TmK/n+yCTjo1xdgHx/htcmILqeWhJJJy+vIwzkWT\
pR4fLk8rj7QrREOtrBX+5NKFs+RWFXoDFdq8KgPPPkN+vpvs2EVqvQ/fI1VlIOdULxczScZv/MTRN14h2tvJyaGz9MTCBO0lC1yw7aTvyado3xMkFuvFMIq0\
BHfj69xHWV+1VIpaz3CpXKKnP86Jax9ze+E2gbCf886QBZKkmXmDB7w1Fh1xHnv6BTbKOmfO5/CGuqlVDUtl+BuqtSSAZaGFYoGqVuVD/z6LdCKVZfnmKJXZ\
7xn+0cGr7/7O0YSHGVEFp87kGBkPiN4RWZYXz0KacrGMYX2pSlEvUTUM8ht58jnRRZ1wONEnPL3Be9OHcczeFXGvcvBkBrc7iNu5SjozR3fkQVTZhwpVDnV1\
8ej0ogiWapFV1iv8lSxwfP9Brs9HOPBiP0euPm95WyyV0cuGcKBmrT0eFw7HZgVq9QzLFwMvH6J1PM251HUKqWU+OfUm7qAfnohjbGwa66UVqjUbNs3O/e0d\
DHgR+UUZGh4xO7zT1pekKKIN797Kkvp2BKp52nwOUUIt6MVVllYqvD8mjtUSR7PvELEu81A0zPHXniMeTDJTiKJ8duWqGfJMWWSyGmUnK6pqZSw7OYk5lxWG\
szidHSjtETy79nLgxM9i7earj/osu7rMrnShXLoyaoY9mS0vtlvYNNt221v2sivRzV42aQ5WlOYYya7JSVsRWWsmptFQsg0mkssafnJqy+Eo4/Z/RGbXK8aa\
+AV4/was4VDzReWIEgAAAABJRU5ErkJggg==';

var icon_usertexts = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAA\
ABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAMpSURBVDhPjVVNb9NAEH3rtWM7SZOmBTWqgKqBVAJa4ILEmQP8XCQuCA6cOKKWUyVKJShq\
y1cp+awTfy1vNm3iNgeYyNpde+ftm5k3GwXa6zdvzXA0kul/m4Ka7jUwqAQBnj976qgXL1+ZjdWoAKTgqC6y1ANMB8b4yLMOHB3CcXKugVF0CpMreOEavNLC\
1PfwdBGurFztTF/+PnXR+f0dWv1Af3gdnjnAWdpCUNpDkq9D4xvHFR76CzfWciyHM99BNJoAOs6M/uHPGn4ct7G+6iBzH6Lma7J6At98QH3xCZLBRyw2t5AM\
9xGrGlnPUmVI3zIsmtYajx63cWP1LhJTQ9Vvo1pvIks2EFaWGe4dVBYWObbwaX+frodTd6WYrquARmVYai7h8/EvvN9+h+OTDkqBRn15BX7god5Ygus6KFer\
AAGu2hwglIOS76Hb7SFg5eRRkhIW45JxXUzVxTcbcp7Pdps84xq4eesmxxyNpYZlkjE/mnslrAsz3Me6XzrHAsbj3myTYek9jfbGhgUseR4ialRg+mQdj8eo\
1WpoNHgQ4Yq+wLVJUbI0nQLmWYo0ybGzs4OvBwcWMM8ySLHqBDI8pLXesswNjyn6Cnmbw4wOF4/k0NEKw+GQXxQGHIMwRL/ft3m1OS6VbE4FoOgr3WNDTpPx\
jGGaIElzlCsVJEmCwA/Q63UJWmboEUG7uN1qne9Xl3zlpQUk8SkgW4CAIws2GAxsqL7vo0qZVHhItVzGSrOJXHpwEvTUV3p6TtgwGUP20Grfwf0HW2w5n2dQ\
sA5TwVHLnI9U12IWTNbzgMqlcDW+Hx/ZUMMgtBUXdmIT2bAclJr8rto8IHWYpgYxK392FvHicK18pE/FXeaka6tZkK/FFebzgNxsmFMpyrejI2QclbwjYHIu\
ryFzm1CPvc4fzC4vyeh5Dic9MCFfLUuBMtTqddzb3ERE2ezt7lKLOcbRwDLzXOYw7qPkkjnTU7RJp0RjeJ7oT+PawglOvmwjjkVjMVQ2YiFSVtpD6MacG4pd\
I1VnVAfDJ3MRfsJmkFtbOkrxLyCXy7HQppdO/ddCqlsN7V+A/gtSUG0hEZwMIwAAAABJRU5ErkJggg==';

Array.prototype.remove = function()
  {
  for(var i = 0,l = arguments.length; i < l; i++)
    {
    var x = this[arguments[i]];
    if (x)
      this.splice(x,1);
    }
  return this;
  }

const url = document.location.href;

const forum = url.indexOf('forum.php') != -1 && (url.indexOf('answer=true') != -1 || url.indexOf('mode=new_thread') != -1 || url.indexOf('edit_post_id') != -1 || url.indexOf('mode=new_poll') != -1);
const memo = url.indexOf('screen=memo') != -1;
const mail = url.indexOf('screen=mail') != -1 && (url.indexOf('mode=new') != -1 || url.indexOf('mode=view') != -1);
const ally = url.indexOf('screen=ally') != -1 && (url.indexOf('mode=overview') != -1 || url.indexOf('mode=properties') != -1);

const gm = typeof(GM_setValue) != 'undefined';

if(document.getElementById('message') || document.getElementById('intern') || document.getElementById('desc_text'))
  {
  // Host
  var root = 'http://' + document.location.host;

  // Div
  if(ally && document.getElementById('desc_text'))
    var mainDiv = document.getElementById('bb_row').getElementsByTagName('div')[0];
  else if(forum || memo || ally)
    var mainDiv = document.getElementsByTagName('form')[0].getElementsByTagName('div')[0];
  else if(mail)
    var mainDiv = document.getElementById('message').parentNode.parentNode.previousElementSibling.getElementsByTagName('div')[0];



  // Additional Style
  var css = '#bb_icons td a { display:none;  } #bb_icons img { max-width:40px; max-height:40px; } .tdbutton { color:DarkBlue; font-family:"Courier New"; text-decoration:underline; }';

  if (typeof GM_addStyle == "undefined")
    {
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
    }
  else
    {
    GM_addStyle(css);
    }

  // Add button method
  mainDiv.addButton = function(title,img,fct,node)
    {
    var a = document.createElement('a');
    a.setAttribute('title',title);
    a.setAttribute('href','#');
    a.addEventListener('click',fct,false);

    var div = document.createElement('div');
    div.setAttribute('style','float:left; background:url('+img+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

    a.appendChild(div);

    if(node)
      this.insertBefore(a,node);
    else
      this.insertBefore(a,document.getElementById('bb_sizes'));
    return this;
    }

  // Infotext
  var a = document.createElement('a');
  a.setAttribute('href','http://www.tvquran.com');
  a.setAttribute('title','Script Homepage: Updates, News, ... ');
  a.setAttribute('style','font-weight:bold; font-size:9pt; color:#0082BE; font-family:Broadway,Verdana,Arial; ');
  a.appendChild(document.createTextNode(' \n تعريب اخوكم الناري من اجل اعضاء ذي قار :)\n www.tribalwars.com (ver'+ver+')'));
  mainDiv.appendChild(a);

  // Remove original report button
  if(forum || memo || ally || mail)
    {
    mainDiv.removeChild(mainDiv.getElementsByTagName('a')[9]);
    }

  // Smilies' Box
  if(forum || memo)
    {
    var table = document.createElement('table');
    table.setAttribute('id','bb_smilies');
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:100; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 24px; left: 200px; ');

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.setAttribute('style','padding:2px;');

    for(var i = 0; i < smilies.length; i++)
      {
      var img = new Image();
      img.setAttribute('src',smilies[i]);
      img.setAttribute('style','vertical-align:middle; ');
      img.setAttribute('alt','[img]'+smilies[i]+'[/img]');

      var a = document.createElement('a');
      a.setAttribute('href','#');
      a.setAttribute('style','vertical-align:middle; ');
      a.addEventListener('click',function() {
        insert(this.title,'');
        toggle('bb_smilies');
        return false;
      },false);
      a.setAttribute('title','[img]'+smilies[i]+'[/img]');
      a.appendChild(img);

      td.appendChild(a);
      }

    tr.appendChild(td);
    table.appendChild(tr);
    mainDiv.appendChild(table);
    }

  // Icons' Box
  if(forum || memo)
    {
    var table = document.createElement('table');
    table.setAttribute('id','bb_icons');
    table.setAttribute('style','display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9 no-repeat url(http://c1b1.de/images/gm_logo.png) bottom right; top: 24px; left: 200px; ');

    for(var i = 0; i < ds_icons.length; i++)
      {
      var tr = document.createElement('tr');

      var td = document.createElement('td');
      td.style.fontSize = '7pt';
      td.style.cursor = 'pointer';
      td.appendChild(document.createTextNode(ds_icons[i][0]+':'));
      td.addEventListener('click',toggleLine,false);
      tr.appendChild(td);


      var td = document.createElement('td');
      td.setAttribute('style','padding:2px;');

      for(var x = 1; x < ds_icons[i].length; x++)
        {
        var img = new Image();
        img.setAttribute('src',ds_icons[i][x]);
        img.setAttribute('style','padding:1px; border:solid 1px black; -moz-border-radius:5px 0px;');
        img.setAttribute('alt','[img]'+ds_icons[i][x]+'[/img]');

        var a = document.createElement('a');
        a.setAttribute('href','#');
        a.setAttribute('style','padding:2px; margin-right:1px;  margin-bottom:2px; ');
        a.style.fontSize = '';
        a.addEventListener('click',function() {
          insert(this.title,'');
          toggle('bb_icons');
          return false;
        },false);
        a.setAttribute('title','[img]'+root+'/'+ds_icons[i][x]+'[/img]');
        a.appendChild(img);

        td.appendChild(a);
        }
      tr.appendChild(td);
      table.appendChild(tr);
      }

    mainDiv.appendChild(table);
    }

  // ##### Buttons #####

  // Code      [code]  [/code]
  if(forum || memo || mail || ally)
    {
    mainDiv.addButton('Code',icon_code,function() {
      insert('[code]','[/code]');
      return false;
      }
    ,mainDiv.getElementsByTagName('a')[4]);
    }

  // Icons
  if(forum || memo)
    {
    mainDiv.addButton('Icons',icon_icons,function() {
      toggle('bb_icons');
      return false;
      });
    }


  // Smilies
  if(forum || memo)
    {
    mainDiv.addButton('Smilies',icon_smilies,function() {
      toggle('bb_smilies');
      return false;
      });
    }

  // Report Direct     [report]  [/report]
  if(forum || memo || ally || mail)
    {
    mainDiv.addButton('ربط تقرير',icon_report_link,function() {
      var url = prompt('أدخل عنوان لهذا التقرير :','');
      if(url != '')
        {
        if(url.indexOf('=') != -1)
          {
          url = url.split('=').pop();
          insert('[report]'+url+'[/report]','');
          }
        else
          {
          url = url.split('/').pop();
          insert('[report]'+url+'[/report]','');
          }
        }
      else
        insert('[report]','[/report]');
      return false;
      });
    }

  // Report link      [report_display]  [/report_display]
  if(forum || memo || ally || mail)
    {
    mainDiv.addButton(' تظهر التقارير مباشرة(على شكل صوره(',icon_report_direct,function() {
      var url = prompt('أدخل عنوان لهذا التقرير :','');
      if(url != '')
        {
        if(url.indexOf('=') != -1)
          {
          url = url.split('=').pop();
          insert('[report_display]'+url+'[/report_display]','');
          }
        else
          {
          url = url.split('/').pop();
          insert('[report_display]'+url+'[/report_display]','');
          }
        }
      else
        insert('[report_display]','[/report_display]');
      return false;
      });
    }


  // Convert Coords to BB-Codes
  if(forum || memo || mail || ally)
    {
    mainDiv.addButton('تحويل الإحداثيات BB-Codes "قم بي تطليل كل النص الموجود صما اضعط ها  هون و هوه ريح يقوم بي تحويل الحدثيات الى روابط"',icon_convertCoords,function() {
      document.getElementById('message').value = document.getElementById('message').value.replace(/(\(\d{1,3}\|\d{1,3}\))(?!\[\/village\])/g,'[village]$1[/village]');
      document.getElementById('message').value = document.getElementById('message').value.replace(/(\d{1,3}\|\d{1,3})(?!.*\[\/village\])/g,'[village]($1)[/village]');
      return false;
      });
    }

  // User Texts
  if(gm && (forum || memo || mail || ally))
    {
    mainDiv.addButton('اده مفيده جدا لي من يقوم بي استخدم بعض النصوص بي كتره فقط قم بي كتابتها مره واحده فقط و قم بي حفضها ها  هون  مثل المقدمات الطويله و الردود المعتاده اترك لك التجربه ',icon_usertexts,function() {
      // User Texts' Box
      show_userTextsBox(mainDiv);
      toggle('user_texts');
      return false;
      });
    }

  }


  // User Texts' Box
  function show_userTextsBox(mainDiv)
    {
    if(document.getElementById('user_texts'))
      return;

    var div = document.createElement('div');
    div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 24px; left: 200px; ');
    div.setAttribute('id','user_texts');

    var table = document.createElement('table');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode('المواد الشخصية'));
    tr.appendChild(th);
    table.appendChild(tr);

    var texts = getTexts();
    for(var i = 0,len = texts.length; i < len; i++)
      {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(texts[i].name));
      td.addEventListener('click',function(i) { return function() {
        insert(texts[i].value,'');
        toggle('user_texts');
       } }(i),false);
      td.setAttribute('class','tdbutton');
      tr.appendChild(td);
      table.appendChild(tr);
      }

    if(len == 0)
      {
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      td.setAttribute('style','color:Silver; font-family:Courier,sans-serif; ');
      td.appendChild(document.createTextNode('حتى الآن لا يوجد إدخالات'));
      tr.appendChild(td);
      table.appendChild(tr);
      }


    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.appendChild(document.createTextNode('تحرير'));
    td.setAttribute('class','tdbutton');
    td.setAttribute('style','border-top:solid black 2px; ');
    td.addEventListener('click',function() {
      // User Texts Edit Box
      show_userTextsEditBox(mainDiv);

      toggle('user_texts');
      toggle('user_texts_edit');
      return false;
    },false);
    tr.appendChild(td);
    table.appendChild(tr);

    div.appendChild(table);

    mainDiv.appendChild(div);
    }

  // User Texts Edit Box
  function show_userTextsEditBox(mainDiv)
    {
    if(document.getElementById('user_texts_edit'))
      return;

    var div = document.createElement('div');
    div.setAttribute('style','overflow:auto; max-height:300px; display:none; clear:both; position:absolute; z-index:101; border: 2px solid #804000; background:#efe6c9; top: 24px; left: 200px; ');
    div.setAttribute('id','user_texts_edit');

    var table = document.createElement('table');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.setAttribute('colspan','4');
    th.appendChild(document.createTextNode('الشخصية تحرير النصوص'));
    tr.appendChild(th);
    table.appendChild(tr);

    var texts = getTexts();
    for(var i = 0,len = texts.length; i < len; i++)
      {
      var tr = document.createElement('tr');

      var td = document.createElement('td');
      td.appendChild(document.createTextNode(texts[i].name));

      tr.appendChild(td);

      var td = document.createElement('td');
      td.setAttribute('style','font-size:x-small; font-family:monospace;');
       var text = texts[i].value.substring(0,250);
        if(text != texts[i].value)
        text += '...';
         text = text.split('\n'); 
      /*
      for each(var value in text)
        {
        td.appendChild(document.createTextNode(value));
        td.appendChild(document.createElement('br'));
        }
      */

      for(var attr in text)
{
if(typeof(text[attr]) != 'function')
{
        }
        td.appendChild(document.createTextNode(text[attr]));
        td.appendChild(document.createElement('br'));
        }

      tr.appendChild(td);

      var td = document.createElement('td');
      td.setAttribute('class','tdbutton');
      td.setAttribute('title','Bearbeiten');
      td.appendChild(document.createTextNode('تعديل'));
      td.addEventListener('click',function(i) { return function() {
        var re = workWithEntry(texts,i);
        mainDiv.appendChild( re );
       } }(i),false);
      tr.appendChild(td);


      var td = document.createElement('td');
      td.setAttribute('class','tdbutton');
      td.setAttribute('title','Löschen');
      td.appendChild(document.createTextNode('حذف'));
      td.addEventListener('click',function(i) { return function() {
       var c = confirm('هل تريد  تاكيد الحذف ام لا');
       if(c)
         {
         texts.remove(i);
         setTexts(texts);
         if(document.getElementById('user_texts'))
           {
           document.getElementById('user_texts').parentNode.removeChild(document.getElementById('user_texts'));
           }
         if(document.getElementById('user_texts_edit'))
           {
           document.getElementById('user_texts_edit').parentNode.removeChild(document.getElementById('user_texts_edit'));
           }
         show_userTextsBox(mainDiv);
         show_userTextsEditBox(mainDiv);
         toggle('user_texts_edit');
         }

       } }(i),false);

      tr.appendChild(td);
      table.appendChild(tr);
      }

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode('جديد'));
    td.addEventListener('click',function() {
      var re = workWithEntry(texts);
      mainDiv.appendChild( re );
      return false;
    },false);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.setAttribute('colspan','3');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode('إغلاق'));
    td.addEventListener('click',function() {
      toggle('user_texts_edit');
      return false;
    },false);
    tr.appendChild(td);

    table.appendChild(tr);

    div.appendChild(table);

    mainDiv.appendChild(div);
    }

  // User Texts Edit Box - Work with Entry
  function workWithEntry(texts,n)
    {
    var texts = texts;
    if(typeof(n) != 'undefined')
      {
      var header = 'Persönlichen Text bearbeiten';
      var name = texts[n].name;
      var text = texts[n].value;
      }
    else
      {
      var header = 'نص جديد';
      var name = '';
      var text = '';
      }


    var table = document.createElement('table');
    table.setAttribute('id','user_texts_edit_entry');
    table.setAttribute('style','clear:both; position:absolute; z-index:121; border: 2px solid #804000; background:#efe6c9; top: 0px; left: -300px; ');

    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.setAttribute('colspan','2');

    th.appendChild(document.createTextNode(header));

    tr.appendChild(th);
    table.appendChild(tr);

    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.appendChild(document.createTextNode('العنوان '));
    tr.appendChild(td);

    var td = document.createElement('td');
    var input = document.createElement('input');
    input.setAttribute('type','text');
    input.setAttribute('value',name);
    input.setAttribute('size',64);
    input.setAttribute('id','UserText_Name');
    td.appendChild(input);
    tr.appendChild(td);

    table.appendChild(tr);


    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.appendChild(document.createTextNode('نص:'));
    tr.appendChild(td);

    var td = document.createElement('td');
    var textarea = document.createElement('textarea');
    textarea.setAttribute('cols','40');
    textarea.setAttribute('rows','12');
    textarea.setAttribute('id','UserText_Text');
    textarea.appendChild(document.createTextNode(text));
    td.appendChild(textarea);
    tr.appendChild(td);

    table.appendChild(tr);


    var tr = document.createElement('tr');

    var td = document.createElement('td');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode('حفض'));
    td.addEventListener('click',function() {
      var data = {
        'name' : document.getElementById('UserText_Name').value,
        'value' : document.getElementById('UserText_Text').value };

      if(typeof(n) != 'undefined')
        {
        texts[n] = data;
        }
      else
        {
        texts.push(data);
        }

      setTexts(texts);
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);


      if(document.getElementById('user_texts'))
        {
        document.getElementById('user_texts').parentNode.removeChild(document.getElementById('user_texts'));
        }
      if(document.getElementById('user_texts_edit'))
        {
        document.getElementById('user_texts_edit').parentNode.removeChild(document.getElementById('user_texts_edit'));
        }
      show_userTextsBox(mainDiv);

      return false;
    },false);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.setAttribute('class','tdbutton');
    td.appendChild(document.createTextNode('لغاء'));
    td.addEventListener('click',function() {
      this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
      return false;
    },false);
    tr.appendChild(td);

    table.appendChild(tr);

    return table;
    }


function getTexts()
  {
  var gm = GM_getValue('usertexts');

  if(typeof(gm) == 'undefined' || gm == '' || !gm)
    return new Array();

  try
    {
    var ar = JSON.parse( gm );
    }
  catch(e)
    {
    return new Array();
    }
  return ar;
  }

function setTexts(ar)
  {
  var str = JSON.stringify(ar);
  GM_setValue('usertexts',str);
  }


function toggleLine(e)
  {
  var elist = this.nextSibling.getElementsByTagName('a');
  var n = elist[0].style.display=='inline'?'none':'inline';
  for(var i = 0; i < elist.length; i++)
    {
    elist[i].style.display = n;
    }
  }

function toggle(id)
  {
  var e = document.getElementById(id);
  if(e.style.display == 'block')
    e.style.display = 'none';
  else
    e.style.display = 'block';
  }


// Stolen Code:
// http://aktuell.de.selfhtml.org/artikel/javascript/bbcode/
function insert(aTag, eTag)
  {
  var input = document.getElementById('message');
  input.focus();
  if(typeof input.selectionStart != undefined)
    {
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var insText = input.value.substring(start, end);
    input.value = input.value.substr(0,start) + aTag + insText + eTag + input.value.substr(end);
    var pos;
    if(insText.length == 0)
      pos = start + aTag.length;
    else
      pos = start + aTag.length + insText.length + eTag.length;
    input.selectionStart = pos;
    input.selectionEnd = pos;
    }
  }