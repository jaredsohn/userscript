// ==UserScript==
// @name © By:Mr.Happy
// @namespace     Anonymous User
// @description  ©  By: Mr.Happy
// @include        http://ae*.tribalwars.aeâ*
// @include        http://en*.tribalwars.net/*
// @include        http://en*.ds.ignames.net/*
// @include        http://nl*.tribalwars.nl/*
// @include        http://cs*.divokekmeny.cz/*
// @include        http://sv*.tribalwars.se/*
// @include        http://s*.tribalwars.es/*
// @include        http://s*.tribalwars.fr/*
// @include        http://s*.tribalwars.it/*
// @include        http://pl*.plemiona.pl/*
// @include	   http://en*.ds.ignames.net/*
// ==/UserScript==

/*
DS Smilies-BB-Codes-List

(c) by C1B1SE
         info@c1b1.de
         http://c1b1.de

You may change string values if it's necessary for your language area.
Do not republish, use in other scripts, change or reproduce this code nor a part of this code without permission from C1B1SE.

This script may be forbidden in some language areas.
Please look in the respective forum for further information!
I won't take responsibility.
*/

var smilies = new Array(
'http://vb.arablocale.net/smile/images/001.gif',
'http://vb.arablocale.net/smile/images/006.gif',
'http://vb.arablocale.net/smile/images/011.gif',
'http://vb.arablocale.net/smile/images/016.gif',
'http://vb.arablocale.net/smile/images/021.gif',
'http://vb.arablocale.net/smile/images/026.gif',
'http://vb.arablocale.net/smile/images/031.gif',
'http://vb.arablocale.net/smile/images/036.gif',
'http://vb.arablocale.net/smile/images/041.gif',
'http://vb.arablocale.net/smile/images/046.gif',
'http://vb.arablocale.net/smile/images/023.gif',
'http://vb.arablocale.net/smile/images/025.gif',
'http://vb.arablocale.net/smile/images/024.gif',
'http://vb.arablocale.net/smile/images/058.gif',
'http://vb.arablocale.net/smile/images/057.gif',
'http://vb.arablocale.net/smile/images/043.gif',
'http://vb.arablocale.net/smile/images/083.gif',
'http://vb.arablocale.net/smile/images/065.gif',
'http://vb.arablocale.net/smile/images/084.gif',
'http://vb.arablocale.net/smile/images/090.gif',
'http://vb.arablocale.net/smile/images/094.gif',
'http://vb.arablocale.net/smile/images/103.gif',
'http://vb.arablocale.net/smile/images/110.gif',
'http://vb.arablocale.net/smile/images/095.gif',
'http://vb.arablocale.net/smile/images/108.gif',
'http://vb.arablocale.net/smile/images/086.gif',
'http://vb.arablocale.net/smile/images/113.gif',
'http://vb.arablocale.net/smile/images/115.gif',
'http://vb.arablocale.net/smile/images/114.gif',
'http://vb.arablocale.net/smile/images/133.gif',
'http://vb.arablocale.net/smile/images/130.gif',
'http://vb.arablocale.net/smile/images/144.gif',
'http://vb.arablocale.net/smile/images/188.gif',
'http://vb.arablocale.net/smile/images/224.gif',
'http://vb.arablocale.net/smile/images/223.gif',
'http://vb.arablocale.net/smile/images/454.gif',
'http://vb.arablocale.net/smile/images/433.gif',
'http://vb.arablocale.net/smile/images/480.gif',
'http://vb.arablocale.net/smile/images/472.gif',
'http://vb.arablocale.net/smile/images/467.gif',
'http://vb.arablocale.net/smile/images/484.gif',
'http://vb.arablocale.net/smile/images/488.gif',
'http://vb.arablocale.net/smile/images/519.gif',
'http://vb.arablocale.net/smile/images/535.gif',
'http://vb.arablocale.net/smile/images/622.gif',
'http://vb.arablocale.net/smile/images/621.gif',
'http://vb.arablocale.net/smile/images/634.gif',
'http://vb.arablocale.net/smile/images/670.gif',
'http://vb.arablocale.net/smile/images/675.gif',
'http://vb.arablocale.net/smile/images/680.gif',
'http://vb.arablocale.net/smile/images/685.gif',
'http://vb.arablocale.net/smile/images/690.gif',
'http://vb.arablocale.net/smile/images/695.gif',
'http://vb.arablocale.net/smile/images/669.gif',
'http://vb.arablocale.net/smile/images/674.gif',
'http://vb.arablocale.net/smile/images/679.gif',
'http://vb.arablocale.net/smile/images/698.gif',
'http://vb.arablocale.net/smile/images/702.gif',
'http://vb.arablocale.net/smile/images/712.gif',
'http://vb.arablocale.net/smile/images/691.gif',
'http://vb.arablocale.net/smile/images/726.gif',
'http://vb.arablocale.net/smile/images/731.gif',
'http://vb.arablocale.net/smile/images/736.gif',
'http://vb.arablocale.net/smile/images/741.gif',
'http://vb.arablocale.net/smile/images/746.gif',
'http://vb.arablocale.net/smile/images/751.gif',
'http://vb.arablocale.net/smile/images/767.gif',
'http://vb.arablocale.net/smile/images/765.gif',
'http://vb.arablocale.net/smile/images/790.gif',
'http://vb.arablocale.net/smile/images/904.gif',
'http://vb.arablocale.net/smile/images/928.gif',
'http://galaxie-net.com/smileys/msn/007.gif',
'http://www.zwatla.com/emo/2007/gros-emoticones-002/065.gif',
'http://www.zwatla.com/emo/2007/gros-emoticones-002/019.gif',
'http://www.zwatla.com/emo/2007/gros-emoticones-002/009.gif',
'http://www.zwatla.com/emo/2007/gros-emoticones-002/617.gif',
'http://www.zwatla.com/emo/2007/gros-emoticones-002/382.gif',
'http://www.zwatla.com/emo/2007/gros-emoticones-002/377.gif',
'http://www.zwatla.com/emo/2007/gros-emoticones-002/372.gif',
'http://www.zwatla.com/emo/2007/gros-emoticones-002/041.gif',
'http://www.zwatla.com/emo/2007/gros-emoticones-002/338.gif',
'http://www.zwatla.com/emo/2007/gros-emoticones-002/337.gif',
'http://www.planete-smiley.com/smiley/3d/c228.gif',
'http://www.planete-smiley.com/smiley/3d/c226.gif',
'http://www.planete-smiley.com/smiley/3d/c223.gif',
'http://www.planete-smiley.com/smiley/3d/c040.gif',
'http://www.ruedusmiley.com/emoticones%20geants/emoticones%203d%20(18).gif',
'http://www.planete-smiley.com/smiley/3d/c101.gif',
'http://www.planete-smiley.com/smiley/3d/c106.gif',
'http://www.planete-smiley.com/smiley/3d/c107.gif',
'http://www.planete-smiley.com/smiley/3d/c109.gif',
'http://www.planete-smiley.com/smiley/3d/c105.gif',
'http://www.planete-smiley.com/smiley/3d/c245.gif',
'http://www.planete-smiley.com/smiley/3d/c115.gif',
'http://www.planete-smiley.com/smiley/3d/c116.gif',
'http://www.planete-smiley.com/smiley/3d/c139.gif',
'http://www.planete-smiley.com/smiley/3d/c165.gif',
'http://www.planete-smiley.com/smiley/3d/c164.gif',
'http://www.planete-smiley.com/smiley/3d/c182.gif',
'http://www.ruedusmiley.com/emoticones%20geants/emoticones%203d%20(66).gif',
'http://www.planete-smiley.com/smiley/3d/c054.gif',
'http://www.planete-smiley.com/smiley/3d/c203.gif',
'http://www.stci.qc.ca/smilies/smilies%20(134).gif',
'http://www.stci.qc.ca/smilies/smilies%20(14).gif',
'http://www.stci.qc.ca/smilies/smilies%20(12).gif',
'http://www.stci.qc.ca/smilies/smilies%20(117).gif',
'http://www.stci.qc.ca/smilies/smilies%20(115).gif',
'http://www.planete-smiley.com/smiley/3d/c002.gif',
'http://www.planete-smiley.com/smiley/3d/c014.gif',
'http://www.planete-smiley.com/smiley/3d/c015.gif',
'http://www.planete-smiley.com/smiley/3d/c010.gif',
'http://www.planete-smiley.com/smiley/3d/c004.gif',
'http://www.planete-smiley.com/smiley/3d/c038.gif',
'http://www.planete-smiley.com/smiley/3d/c059.gif',
'http://www.planete-smiley.com/smiley/3d/c074.gif',
'http://www.planete-smiley.com/smiley/3d/c075.gif',
'http://www.planete-smiley.com/smiley/3d/c066.gif',
'http://ae1.tribalwars.ae/graphic/unit/unit_heavy_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_marcher_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_light_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_spy_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_ram_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_catapult_60.png?1', 
'http://ae1.tribalwars.ae/graphic/unit/unit_snob_60.png?1'
'http://ae1.tribalwars.ae/graphic/unit/unit_archer_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_axe_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_sword_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_spear_60.png?1',
'http://www.stci.qc.ca/smilies/smilies%20(144).gif',
'http://www.bh30.com/vb3/images/ns/About_To_Cry.gif',
'http://www.bh30.com/vb3/images/ns/Angel.gif',
'http://www.bh30.com/vb3/images/ns/Angry_2.gif',
'http://www.bh30.com/vb3/images/ns/Angry_1.gif',
'http://www.bh30.com/vb3/images/ns/Angry_3.gif',
'http://www.bh30.com/vb3/images/ns/Soldier.gif',
'http://www.bh30.com/vb3/images/ns/Angry_4.gif',
'http://www.bh30.com/vb3/images/ns/Asking.gif',
'http://www.bh30.com/vb3/images/ns/Beaten.gif',
'http://www.bh30.com/vb3/images/ns/Being_Funny.gif',
'http://www.bh30.com/vb3/images/ns/Sleep.gif',
'http://www.bh30.com/vb3/images/ns/Bomb.gif',
'http://www.bh30.com/vb3/images/ns/Boss.gif',
'http://www.bh30.com/vb3/images/ns/Boy.gif',
'http://www.bh30.com/vb3/images/ns/Bye.gif',
'http://www.bh30.com/vb3/images/ns/Cry_1.gif',
'http://www.bh30.com/vb3/images/ns/Cry_2.gif',
'http://www.bh30.com/vb3/images/ns/Fighter.gif',
'http://www.bh30.com/vb3/images/ns/Hypno.gif',
'http://www.bh30.com/vb3/images/ns/Hello.gif',
'http://www.bh30.com/vb3/images/ns/Laught_1.gif',
'http://www.bh30.com/vb3/images/ns/Money.gif',
'http://www.bh30.com/vb3/images/ns/Magnify.gif',
'http://www.bh30.com/vb3/images/ns/Phone.gif',
'http://www.bh30.com/vb3/images/ns/Scream.gif',
'http://www.bh30.com/vb3/images/ns/Moon.gif',
'http://www.bh30.com/vb3/images/ns/Tongue.gif',
'http://www.bh30.com/vb3/images/ns/Yell.gif',
'http://www.bh30.com/vb3/images/ns/Slapped.gif',
'http://www.bh30.com/vb3/images/ns/Ok.gif',
'http://www.bh30.com/vb3/images/ns/In_Love.gif',
'http://www.bh30.com/vb3/images/ns/Thinking.gif',
'http://www.hostk.info/upload/uploads/hostk12978768211.gif',
'http://www.hostk.info/upload/uploads/hostk12978768212.jpg',
'http://www.hostk.info/upload/uploads/hostk12978768213.jpg',
'http://www.hostk.info/upload/uploads/hostk12979581182.jpg',
'http://www.hostk.info/upload/uploads/hostk12979581184.gif',
'http://www.hostk.info/upload/uploads/hostk12979581183.jpg',
'http://www.hostk.info/upload/uploads/hostk12978768224.jpg',
'http://www.hostk.info/upload/uploads/hostk12978696041.gif',
'http://www.hostk.info/upload/uploads/hostk12978696052.gif',
'http://www.hostk.info/upload/uploads/hostk12978696053.gif',
'http://www.hostk.info/upload/uploads/hostk12978696064.gif',
'http://www.hostk.info/upload/uploads/hostk12978696065.gif',
'http://www.hostk.info/upload/uploads/hostk12978696076.gif',
'http://www.hostk.info/upload/uploads/hostk12978696087.gif',
'http://www.hostk.info/upload/uploads/hostk12978696088.gif',
'http://www.hostk.info/upload/uploads/hostk12978696089.gif',
'http://www.hostk.info/upload/uploads/hostk129786960910.gif',
'http://www.hostk.info/upload/uploads/hostk129786960911.gif',
'http://www.hostk.info/upload/uploads/hostk129786960912.gif',
'http://www.hostk.info/upload/uploads/hostk129786960913.gif',
'http://www.hostk.info/upload/uploads/hostk129786961014.gif',
'http://www.hostk.info/upload/uploads/hostk129786961015.gif'
'http://www.plapl.com/images/img/besmllah.gif',
'http://www.plapl.com/images/smilies/1.gif',
'http://www.plapl.com/images/smilies/2.gif',
'http://www.plapl.com/images/smilies/3.gif',
'http://www.plapl.com/images/smilies/4.gif',
'http://www.plapl.com/images/smilies/5.gif',
'http://www.plapl.com/images/smilies/6.gif',
'http://www.plapl.com/images/smilies/7.gif',
'http://www.plapl.com/images/smilies/8.gif',
'http://www.plapl.com/images/smilies/9.gif'
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
'staemme.de/images/phpbb_smilies/icon_surprised.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_evil.gif',
'staemme.de/images/phpbb_smilies/icon_neutral.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_sad.gif',
'http://forum.die-staemme.de/images/phpbb_smilies/icon_cry.gif',
http://twbbcodes.pytalhost.com/images/smileys/em16.gif'',
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
'http://smilles.m7shsh.com/data/media/8/A6rb.Com_86.gif',
'http://www.plapl.com/up/smile/plapl (1).gif',
'http://www.plapl.com/up/smile/plapl (3).gif',
'http://www.plapl.com/up/smile/plapl (2).gif',
'http://www.plapl.com/up/smile/plapl (4).gif',
'http://www.plapl.com/up/smile/plapl (5).gif',
'http://www.plapl.com/up/smile/plapl (6).gif',
'http://www.plapl.com/up/smile/plapl (7).gif',
'http://www.plapl.com/up/smile/plapl (8).gif',
'http://www.plapl.com/up/smile/plapl (9).gif',
'http://www.plapl.com/up/smile/plapl (10).gif',
'http://www.plapl.com/up/smile/plapl (11).gif',
'http://www.plapl.com/up/smile/plapl (12).gif',
'http://www.plapl.com/up/smile/plapl (13).gif',
'http://www.plapl.com/up/smile/plapl (14).gif',
'http://www.plapl.com/up/smile/plapl (15).gif',
'http://www.plapl.com/up/smile/plapl (16).gif',
'http://www.plapl.com/up/smile/plapl (17).gif',
'http://www.plapl.com/up/smile/plapl (18).gif',
'http://www.plapl.com/up/smile/plapl (19).gif',
'http://www.plapl.com/up/smile/plapl (20).gif',
'http://www.plapl.com/up/smile/plapl (21).gif',
'http://www.plapl.com/up/smile/plapl (22).gif',
'http://www.plapl.com/up/smile/plapl (23).gif',
'http://www.plapl.com/up/smile/plapl (24).gif',
'http://www.plapl.com/up/smile/plapl (25).gif',
'http://www.plapl.com/up/smile/plapl (26).gif',
'http://www.plapl.com/up/smile/plapl (27).gif',
'http://www.plapl.com/up/smile/plapl (28).gif',
'http://www.plapl.com/up/smile/plapl (29).gif',
'http://www.plapl.com/up/smile/plapl (30).gif',
'http://www.plapl.com/up/smile/plapl (31).gif',
'http://www.plapl.com/up/smile/plapl (32).gif',
'http://www.plapl.com/up/smile/plapl (33).gif',
'http://www.plapl.com/up/smile/plapl (34).gif',
'http://www.plapl.com/up/smile/plapl (35).gif',
'http://www.plapl.com/up/smile/plapl (36).gif',
'http://www.plapl.com/up/smile/plapl (37).gif',
'http://www.plapl.com/up/smile/plapl (38).gif',
'http://www.plapl.com/up/smile/plapl (39).gif',
'http://www.plapl.com/up/smile/plapl (40).gif',
'http://www.plapl.com/up/smile/plapl (41).gif',
'http://www.plapl.com/up/smile/plapl (42).gif',
'http://www.plapl.com/up/smile/plapl (43).gif',
'http://www.plapl.com/up/smile/plapl (44).gif',
'http://www.plapl.com/up/smile/plapl (45).gif',
'http://www.plapl.com/up/smile/plapl (46).gif',
'http://www.plapl.com/up/smile/plapl (47).gif',
'http://www.plapl.com/up/smile/plapl (48).gif',
'http://www.plapl.com/up/smile/plapl (49).gif',
'http://www.plapl.com/up/smile/plapl (50).gif',
'http://www.plapl.com/up/smile/plapl (51).gif',
'http://www.plapl.com/up/smile/plapl (52).gif',
'http://www.plapl.com/up/smile/plapl (53).gif',
'http://www.plapl.com/up/smile/plapl (54).gif',
'http://www.plapl.com/up/smile/plapl (55).gif',
'http://www.plapl.com/up/smile/plapl (56).gif',
'http://www.plapl.com/up/smile/plapl (57).gif',
'http://www.plapl.com/up/smile/plapl (58).gif',
'http://www.plapl.com/up/smile/plapl (59).gif',
'http://www.plapl.com/up/smile/plapl (60).gif',
'http://www.plapl.com/up/smile/plapl (61).gif',
'http://www.plapl.com/up/smile/plapl (62).gif',
'http://www.plapl.com/up/smile/plapl (63).gif',
'http://www.plapl.com/up/smile/plapl (64).gif',
'http://www.plapl.com/up/smile/plapl (65).gif',
'http://www.plapl.com/up/smile/plapl (66).gif',
'http://www.plapl.com/up/smile/plapl (67).gif',
'http://www.plapl.com/up/smile/plapl (68).gif',
'http://www.plapl.com/up/smile/plapl (69).gif',
'http://www.plapl.com/up/smile/plapl (70).gif',
'http://www.plapl.com/up/smile/plapl (72).gif',
'http://www.plapl.com/up/smile/plapl (71).gif',
'http://www.plapl.com/up/smile/plapl (73).gif',
'http://www.plapl.com/up/smile/plapl (74).gif',
'http://www.plapl.com/up/smile/plapl (75).gif',
'http://www.plapl.com/up/smile/plapl (76).gif',
'http://www.plapl.com/up/smile/plapl (77).gif',
'http://www.plapl.com/up/smile/plapl (78).gif',
'http://www.plapl.com/up/smile/plapl (79).gif',
'http://www.plapl.com/up/smile/plapl (80).gif',
'http://www.plapl.com/up/smile/plapl (81).gif',
'http://www.plapl.com/up/smile/plapl (82).gif',
'http://www.plapl.com/up/smile/plapl (83).gif',
'http://www.plapl.com/up/smile/plapl (84).gif',
'http://www.plapl.com/up/smile/plapl (85).gif',
'http://www.plapl.com/up/smile/plapl (86).gif',
'http://www.plapl.com/up/smile/plapl (87).gif',
'http://www.plapl.com/up/smile/plapl (88).gif',
'http://www.plapl.com/up/smile/plapl (89).gif',
'http://www.plapl.com/up/smile/plapl (90).gif',
'http://www.plapl.com/up/smile/plapl (91).gif',
'http://www.plapl.com/up/smile/plapl (92).gif',
'http://www.plapl.com/up/smile/plapl (93).gif',
'http://www.plapl.com/up/smile/plapl (94).gif',
'http://www.plapl.com/up/smile/plapl (95).gif',
'http://www.plapl.com/up/smile/plapl (96).gif',
'http://www.plapl.com/up/smile/plapl (97).gif',
'http://www.plapl.com/up/smile/plapl (98).gif',
'http://www.plapl.com/up/smile/plapl (99).gif',
'http://www.plapl.com/up/smile/plapl (100).gif',
'http://www.plapl.com/up/smile/plapl (101).gif',
'http://www.plapl.com/up/smile/plapl (102).gif',
'http://www.plapl.com/up/smile/plapl (103).gif',
'http://www.plapl.com/up/smile/plapl (104).gif',
'http://www.plapl.com/up/smile/plapl (105).gif',
'http://www.plapl.com/up/smile/plapl (106).gif',
'http://www.plapl.com/up/smile/plapl (107).gif',
'http://www.plapl.com/up/smile/plapl (108).gif',
'http://www.plapl.com/up/smile/plapl (109).gif',
'http://www.plapl.com/up/smile/plapl (110).gif',
'http://www.plapl.com/up/smile/plapl (112).gif',
'http://www.plapl.com/up/smile/plapl (111).gif',
'http://www.plapl.com/up/smile/plapl (113).gif',
'http://www.plapl.com/up/smile/plapl (114).gif',
'http://www.plapl.com/up/smile/plapl (115).gif',
'http://www.plapl.com/up/smile/plapl (116).gif',
'http://www.plapl.com/up/smile/plapl (117).gif',
'http://www.plapl.com/up/smile/plapl (118).gif',
'http://www.plapl.com/up/smile/plapl (119).gif',
'http://www.plapl.com/up/smile/plapl (120).gif',
'http://www.plapl.com/up/smile/plapl (121).gif',
'http://www.plapl.com/up/smile/plapl (122).gif',
'http://www.plapl.com/up/smile/plapl (123).gif',
'http://www.plapl.com/up/smile/plapl (124).gif',
'http://www.plapl.com/up/smile/plapl (125).gif',
'http://www.plapl.com/up/smile/plapl (126).gif',
'http://www.plapl.com/up/smile/plapl (127).gif',
'http://www.plapl.com/up/smile/plapl (128).gif',
'http://www.plapl.com/up/smile/plapl (129).gif',
'http://www.plapl.com/up/smile/plapl (130).gif',
'http://www.plapl.com/up/smile/plapl (131).gif',
'http://www.plapl.com/up/smile/plapl (132).gif',
'http://www.plapl.com/up/smile/plapl (133).gif',
'http://www.plapl.com/up/smile/plapl (134).gif',
'http://www.plapl.com/up/smile/plapl (135).gif',
'http://www.plapl.com/up/smile/plapl (136).gif',
'http://www.plapl.com/up/smile/plapl (137).gif',
'http://www.plapl.com/up/smile/plapl (138).gif',
'http://www.plapl.com/up/smile/plapl (139).gif',
'http://www.plapl.com/up/smile/plapl (140).gif',
'http://www.plapl.com/up/smile/plapl (141).gif',
'http://www.plapl.com/up/smile/plapl (142).gif',
'http://www.plapl.com/up/smile/plapl (143).gif',
'http://www.plapl.com/up/smile/plapl (145).gif',
'http://www.plapl.com/up/smile/plapl (146).gif',
'http://www.plapl.com/up/smile/plapl (147).gif',
'http://www.plapl.com/up/smile/plapl (148).gif',
'http://www.plapl.com/up/smile/plapl (149).gif',
'http://www.plapl.com/up/smile/plapl (150).gif',
'http://www.plapl.com/up/smile/plapl (151).gif',
'http://www.plapl.com/up/smile/plapl (152).gif',
'http://www.plapl.com/up/smile/plapl (153).gif',
'http://www.plapl.com/up/smile/plapl (154).gif',
'http://www.plapl.com/up/smile/plapl (155).gif',
'http://www.plapl.com/up/smile/plapl (156).gif',
'http://www.plapl.com/up/smile/plapl (157).gif',
'http://www.plapl.com/up/smile/plapl (158).gif',
'http://www.plapl.com/up/smile/plapl (159).gif',
'http://www.plapl.com/up/smile/plapl (160).gif',
'http://www.plapl.com/up/smile/plapl (161).gif',
'http://www.plapl.com/up/smile/plapl (162).gif',
'http://www.plapl.com/up/smile/plapl (163).gif',
'http://www.plapl.com/up/smile/plapl (164).gif',
'http://www.plapl.com/up/smile/plapl (165).gif',
'http://www.plapl.com/up/smile/plapl (166).gif',
'http://www.plapl.com/up/smile/plapl (167).gif',
'http://www.plapl.com/up/smile/plapl (168).gif',
'http://www.plapl.com/up/smile/plapl (169).gif',
'http://www.plapl.com/up/smile/plapl (170).gif',
'http://www.plapl.com/up/smile/plapl (171).gif',
'http://www.plapl.com/up/smile/plapl (172).gif',
'http://www.plapl.com/up/smile/plapl (173).gif',
'http://www.plapl.com/up/smile/plapl (174).gif',
'http://www.plapl.com/up/smile/plapl (175).gif',
'http://www.plapl.com/up/smile/plapl (176).gif',
'http://www.plapl.com/up/smile/plapl (178).gif',
'http://www.plapl.com/up/smile/plapl (179).gif',
'http://www.plapl.com/up/smile/plapl (180).gif',
'http://www.plapl.com/up/smile/plapl (181).gif',
'http://www.plapl.com/up/smile/plapl (182).gif',
'http://www.plapl.com/up/smile/plapl (183).gif',
'http://www.plapl.com/up/smile/plapl (184).gif',
'http://www.plapl.com/up/smile/plapl (185).gif',
'http://www.plapl.com/up/smile/plapl (186).gif',
'http://www.plapl.com/up/smile/plapl (187).gif',
'http://www.plapl.com/up/smile/plapl (188).gif',
'http://www.plapl.com/up/smile/plapl (189).gif',
'http://www.plapl.com/up/smile/plapl (190).gif',
'http://www.plapl.com/up/smile/plapl (191).gif',
'http://www.plapl.com/up/smile/plapl (192).gif',
'http://www.plapl.com/up/smile/plapl (193).gif',
'http://www.plapl.com/up/smile/plapl (194).gif',
'http://www.plapl.com/up/smile/plapl (195).gif',
'http://www.plapl.com/up/smile/plapl (196).gif',
'http://www.plapl.com/up/smile/plapl (197).gif',
'http://www.plapl.com/up/smile/plapl (198).gif',
'http://www.plapl.com/up/smile/plapl (199).gif',
'http://www.plapl.com/up/smile/plapl (200).gif',
'http://www.plapl.com/up/smile/plapl (201).gif',
'http://www.plapl.com/up/smile/plapl (202).gif',
'http://www.plapl.com/up/smile/plapl (203).gif',
'http://www.plapl.com/up/smile/plapl (204).gif',
'http://www.plapl.com/up/smile/plapl (205).gif',
'http://www.plapl.com/up/smile/plapl (206).gif',
'http://www.plapl.com/up/smile/plapl (207).gif',
'http://www.plapl.com/up/smile/plapl (208).gif',
'http://www.plapl.com/up/smile/plapl (209).gif',
'http://www.plapl.com/up/smile/plapl (210).gif',
'http://www.plapl.com/up/smile/plapl (211).gif',
'http://www.plapl.com/up/smile/plapl (212).gif',
'http://www.plapl.com/up/smile/plapl (213).gif',
'http://www.plapl.com/up/smile/plapl (214).gif',
'http://www.plapl.com/up/smile/plapl (215).gif',
'http://www.plapl.com/up/smile/plapl (216).gif',
'http://www.plapl.com/up/smile/plapl (217).gif',
'http://www.plapl.com/up/smile/plapl (218).gif',
'http://www.plapl.com/up/smile/plapl (219).gif',
'http://www.plapl.com/up/smile/plapl (220).gif',
'http://www.plapl.com/up/smile/plapl (221).gif',
'http://www.plapl.com/up/smile/plapl (222).gif',
'http://www.plapl.com/up/smile/plapl (223).gif',
'http://www.plapl.com/up/smile/plapl (224).gif',
'http://www.plapl.com/up/smile/plapl (225).gif',
'http://www.plapl.com/up/smile/plapl (226).gif',
'http://www.plapl.com/up/smile/plapl (227).gif',
'http://www.plapl.com/up/smile/plapl (228).gif',
'http://www.plapl.com/up/smile/plapl (229).gif',
'http://www.plapl.com/up/smile/plapl (230).gif',
'http://www.plapl.com/up/smile/plapl (231).gif',
'http://www.plapl.com/up/smile/plapl (232).gif',
'http://www.plapl.com/up/smile/plapl (233).gif',
'http://www.plapl.com/up/smile/plapl (234).gif',
'http://www.plapl.com/up/smile/plapl (235).gif',
'http://www.plapl.com/up/smile/plapl (236).gif',
'http://www.plapl.com/up/smile/plapl (237).gif',
'http://www.plapl.com/up/smile/plapl (238).gif',
'http://www.plapl.com/up/smile/plapl (239).gif',
'http://www.plapl.com/up/smile/plapl (240).gif',
'http://www.plapl.com/up/smile/plapl (241).gif',
'http://www.plapl.com/up/smile/plapl (242).gif',
'http://www.plapl.com/up/smile/plapl (243).gif',
'http://www.plapl.com/up/smile/plapl (244).gif',
'http://www.plapl.com/up/smile/plapl (245).gif',
'http://www.plapl.com/up/smile/plapl (246).gif',
'http://www.plapl.com/up/smile/plapl (247).gif',
'http://www.plapl.com/up/smile/plapl (151).gif',
'http://www.plapl.com/up/smile/plapl (248).gif',
'http://www.plapl.com/up/smile/plapl (249).gif',
'http://www.plapl.com/up/smile/plapl (250).gif',
'http://www.plapl.com/up/smile/plapl (251).gif',
'http://www.plapl.com/up/smile/plapl (252).gif',
'http://www.plapl.com/up/smile/plapl (253).gif',
'http://www.plapl.com/up/smile/plapl (254).gif',
'http://www.plapl.com/up/smile/plapl (255).gif',
'http://www.plapl.com/up/smile/plapl (256).gif',
'http://www.plapl.com/up/smile/plapl (257).gif',
'http://www.plapl.com/up/smile/plapl (258).gif',
'http://www.plapl.com/up/smile/plapl (259).gif',
'http://www.plapl.com/up/smile/plapl (260).gif',
'http://www.plapl.com/up/smile/plapl (261).gif',
'http://www.plapl.com/up/smile/plapl (262).gif',
'http://www.plapl.com/up/smile/plapl (263).gif',
'http://www.plapl.com/up/smile/plapl (264).gif',
'http://www.plapl.com/up/smile/plapl (265).gif',
'http://www.plapl.com/up/smile/plapl (266).gif',
'http://www.plapl.com/up/smile/plapl (267).gif',
'http://www.plapl.com/up/smile/plapl (268).gif',
'http://www.plapl.com/up/smile/plapl (269).gif',
'http://www.plapl.com/up/smile/plapl (270).gif',
'http://www.plapl.com/up/smile/plapl (271).gif',
'http://www.plapl.com/up/smile/plapl (272).gif',
'http://www.plapl.com/up/smile/plapl (273).gif',
'http://www.plapl.com/up/smile/plapl (274).gif',
'http://www.plapl.com/up/smile/plapl (275).gif',
'http://www.plapl.com/up/smile/plapl (276).gif',
'http://www.plapl.com/up/smile/plapl (277).gif',
'http://www.plapl.com/up/smile/plapl (278).gif',
'http://www.plapl.com/up/smile/plapl (279).gif',
'http://www.plapl.com/up/smile/plapl (280).gif',
'http://www.plapl.com/up/smile/plapl (281).gif',
'http://www.plapl.com/up/smile/plapl (282).gif',
'http://www.plapl.com/up/smile/plapl (283).gif',
'http://www.plapl.com/up/smile/plapl (284).gif',
'http://www.plapl.com/up/smile/plapl (285).gif',
'http://www.plapl.com/up/smile/plapl (286).gif',
'http://www.plapl.com/up/smile/plapl (287).gif',
'http://www.plapl.com/up/smile/plapl (288).gif',
'http://www.plapl.com/up/smile/plapl (289).gif',
'http://www.plapl.com/up/smile/plapl (290).gif',
'http://www.plapl.com/up/smile/plapl (291).gif',
'http://www.plapl.com/up/smile/plapl (292).gif',
'http://www.plapl.com/up/smile/plapl (293).gif',
'http://www.plapl.com/up/smile/plapl (294).gif',
'http://www.plapl.com/up/smile/plapl (295).gif',
'http://www.plapl.com/up/smile/plapl (296).gif',
'http://www.plapl.com/up/smile/plapl (297).gif',
'http://www.plapl.com/up/smile/plapl (298).gif',
'http://www.plapl.com/up/smile/plapl (299).gif',
'http://www.plapl.com/up/smile/plapl (300).gif',
'http://www.plapl.com/up/smile/plapl (301).gif',
'http://www.plapl.com/up/smile/plapl (302).gif',
'http://www.plapl.com/up/smile/plapl (303).gif',
'http://www.plapl.com/up/smile/plapl (304).gif',
'http://www.plapl.com/up/smile/plapl (305).gif',
'http://www.plapl.com/up/smile/plapl (306).gif',
'http://www.plapl.com/up/smile/plapl (307).gif',
'http://www.plapl.com/up/smile/plapl (308).gif',
'http://www.plapl.com/up/smile/plapl (309).gif',
'http://www.plapl.com/up/smile/plapl (310).gif',
'http://www.plapl.com/up/smile/plapl (311).gif',
'http://www.plapl.com/up/smile/plapl (312).gif',
'http://www.plapl.com/up/smile/plapl (313).gif',
'http://www.plapl.com/up/smile/plapl (314).gif',
'http://www.plapl.com/up/smile/plapl (315).gif',
'http://www.plapl.com/up/smile/plapl (316).gif',
'http://www.plapl.com/up/smile/plapl (317).gif',
'http://www.plapl.com/up/smile/plapl (318).gif',
'http://www.plapl.com/up/smile/plapl (319).gif',
'http://www.plapl.com/up/smile/plapl (320).gif',
'http://www.plapl.com/up/smile/plapl (321).gif',
'http://www.plapl.com/up/smile/plapl (322).gif',
'http://www.plapl.com/up/smile/plapl (323).gif',
'http://www.plapl.com/up/smile/plapl (324).gif',
'http://www.plapl.com/up/smile/plapl (325).gif',
'http://www.plapl.com/up/smile/plapl (326).gif',
'http://www.plapl.com/up/smile/plapl (327).gif',
'http://www.plapl.com/up/smile/plapl (328).gif',
'http://www.plapl.com/up/smile/plapl (329).gif',
'http://www.plapl.com/up/smile/plapl (330).gif',
'http://www.plapl.com/up/smile/plapl (331).gif',
'http://www.plapl.com/up/smile/plapl (334).gif',
'http://www.plapl.com/up/smile/plapl (335).gif',
'http://www.plapl.com/up/smile/plapl (336).gif',
'http://www.plapl.com/up/smile/plapl (337).gif',
'http://www.plapl.com/up/smile/plapl (338).gif',
'http://www.plapl.com/up/smile/plapl (339).gif',
'http://www.plapl.com/up/smile/plapl (340).gif',
'http://www.plapl.com/up/smile/plapl (341).gif',
'http://www.plapl.com/up/smile/plapl (342).gif',
'http://www.plapl.com/up/smile/plapl (343).gif',
'http://www.plapl.com/up/smile/plapl (344).gif',
'http://www.plapl.com/up/smile/plapl (345).gif',
'http://www.plapl.com/up/smile/plapl (346).gif',
'http://www.plapl.com/up/smile/plapl (347).gif',
'http://www.plapl.com/up/smile/plapl (348).gif',
'http://www.plapl.com/up/smile/plapl (349).gif',
'http://www.plapl.com/up/smile/plapl (350).gif',
'http://www.plapl.com/up/smile/plapl (351).gif',
'http://www.plapl.com/up/smile/plapl (352).gif',
'http://www.plapl.com/up/smile/plapl (353).gif',
'http://www.plapl.com/up/smile/plapl (356).gif',
'http://www.plapl.com/up/smile/plapl (354).gif',
'http://www.plapl.com/up/smile/plapl (355).gif',
'http://www.plapl.com/up/smile/plapl (357).gif',
'http://www.plapl.com/up/smile/plapl (358).gif',
'http://www.plapl.com/up/smile/plapl (358).gif',
'http://www.plapl.com/up/smile/plapl (359).gif',
'http://www.plapl.com/up/smile/plapl (360).gif',
'http://www.plapl.com/up/smile/plapl (361).gif',
'http://www.plapl.com/up/smile/plapl (362).gif',
'http://www.plapl.com/up/smile/plapl (363).gif',
'http://www.plapl.com/up/smile/plapl (367).gif',
'http://www.plapl.com/up/smile/plapl (368).gif',
'http://www.plapl.com/up/smile/plapl (369).gif',
'http://www.plapl.com/up/smile/plapl (370).gif',
'http://www.plapl.com/up/smile/plapl (371).gif',
'http://www.plapl.com/up/smile/plapl (372).gif',
'http://www.plapl.com/up/smile/plapl (373).gif',
'http://www.plapl.com/up/smile/plapl (374).gif',
'http://www.plapl.com/up/smile/plapl (375).gif',
'http://www.plapl.com/up/smile/plapl (376).gif',
'http://www.plapl.com/up/smile/plapl (377).gif',
'http://www.plapl.com/up/smile/plapl (378).gif',
'http://www.plapl.com/up/smile/plapl (379).gif',
'http://www.plapl.com/up/smile/plapl (380).gif',
'http://www.plapl.com/up/smile/plapl (381).gif',
'http://www.plapl.com/up/smile/plapl (382).gif',
'http://www.plapl.com/up/smile/plapl (383).gif',
'http://www.plapl.com/up/smile/plapl (384).gif',
'http://www.plapl.com/up/smile/plapl (385).gif',
'http://www.plapl.com/up/smile/plapl (386).gif',
'http://www.plapl.com/up/smile/plapl (387).gif',
'http://www.plapl.com/up/smile/plapl (388).gif',
'http://www.plapl.com/up/smile/plapl (389).gif',
'http://www.plapl.com/up/smile/plapl (390).gif',
'http://www.plapl.com/up/smile/plapl (391).gif',
'http://www.plapl.com/up/smile/plapl (392).gif',
'http://www.plapl.com/up/smile/plapl (393).gif',
'http://www.plapl.com/up/smile/plapl (394).gif',
'http://www.plapl.com/up/smile/plapl (395).gif',
'http://www.plapl.com/up/smile/plapl (396).gif',
'http://www.plapl.com/up/smile/plapl (397).gif',
'http://www.plapl.com/up/smile/plapl (398).gif',
'http://www.plapl.com/up/smile/plapl (399).gif',
'http://www.plapl.com/up/smile/plapl (400).gif',
'http://www.plapl.com/up/smile/plapl (401).gif',
'http://www.plapl.com/up/smile/plapl (402).gif',
'http://www.plapl.com/up/smile/plapl (403).gif',
'http://www.plapl.com/up/smile/plapl (404).gif',
'http://www.plapl.com/up/smile/plapl (405).gif',
'http://www.plapl.com/up/smile/plapl (406).gif',
'http://www.plapl.com/up/smile/plapl (407).gif',
'http://www.plapl.com/up/smile/plapl (408).gif',
'http://www.plapl.com/up/smile/plapl (409).gif',
'http://www.plapl.com/up/smile/plapl (410).gif',
'http://www.plapl.com/up/smile/plapl (411).gif',
'http://www.plapl.com/up/smile/plapl (412).gif',
'http://www.plapl.com/up/smile/plapl (413).gif',
'http://www.plapl.com/up/smile/plapl (414).gif',
'http://www.plapl.com/up/smile/plapl (415).gif',
'http://www.plapl.com/up/smile/plapl (416).gif',
'http://www.plapl.com/up/smile/plapl (417).gif',
'http://www.plapl.com/up/smile/plapl (418).gif',
'http://www.plapl.com/up/smile/plapl (419).gif',
'http://www.plapl.com/up/smile/plapl (420).gif',
'http://www.plapl.com/up/smile/plapl (421).gif',
'http://www.plapl.com/up/smile/plapl (422).gif',
'http://www.plapl.com/up/smile/plapl (423).gif',
'http://www.plapl.com/up/smile/plapl (424).gif',
'http://www.plapl.com/up/smile/plapl (425).gif',
'http://www.plapl.com/up/smile/plapl (426).gif',
'http://www.plapl.com/up/smile/plapl (427).gif',
'http://www.plapl.com/up/smile/plapl (428).gif',
'http://www.plapl.com/up/smile/plapl (429).gif',
'http://www.plapl.com/up/smile/plapl (430).gif',
'http://www.plapl.com/up/smile/plapl (431).gif',
'http://www.plapl.com/up/smile/plapl (432).gif',
'http://www.plapl.com/up/smile/plapl (433).gif',
'http://www.plapl.com/up/smile/plapl (434).gif',
'http://www.plapl.com/up/smile/plapl (435).gif',
'http://www.plapl.com/up/smile/plapl (436).gif',
'http://www.plapl.com/up/smile/plapl (437).gif',
'http://www.plapl.com/up/smile/plapl (438).gif',
'http://www.plapl.com/up/smile/plapl (439).gif',
'http://www.plapl.com/up/smile/plapl (441).gif',
'http://www.plapl.com/up/smile/plapl (440).gif',
'http://www.plapl.com/up/smile/plapl (442).gif',
'http://www.plapl.com/up/smile/plapl (443).gif',
'http://www.plapl.com/up/smile/plapl (444).gif',
'http://www.plapl.com/up/smile/plapl (445).gif',
'http://www.plapl.com/up/smile/plapl (446).gif',
'http://www.plapl.com/up/smile/plapl (447).gif',
'http://www.plapl.com/up/smile/plapl (448).gif',
'http://www.plapl.com/up/smile/plapl (449).gif',
'http://www.plapl.com/up/smile/plapl (450).gif',
'http://www.plapl.com/up/smile/plapl (451).gif',
'http://www.plapl.com/up/smile/plapl (452).gif',
'http://www.plapl.com/up/smile/plapl (453).gif',
'http://www.plapl.com/up/smile/plapl (454).gif',
'http://www.plapl.com/up/smile/plapl (455).gif',
'http://www.plapl.com/up/smile/plapl (456).gif',
'http://www.plapl.com/up/smile/plapl (457).gif',
'http://www.plapl.com/up/smile/plapl (458).gif',
'http://www.plapl.com/up/smile/plapl (459).gif');


var icon_smilies = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAACoFBM'+
'VEUAAACvsrfb0bHNwJS5ur7Zz7DJvJSusrbe1LStsbbKvJG4sAuyqgrVzK7c0rKvpwrQxJ7IuI/TyKKU'+
'jQfDs411bwns4Rm0rArf0xK0rAu3rwvNwZvFvA66si7e1J706Rje1LDRyJ7VzBHKwA7c0RTYzqC7snmz'+
'qgv79Brb0q779yva0Jnb0RHw6l9sZwmwqA3CuRCYkBfb0bDe1bDs53Lt5nP26xf78xweHQW2rXTXzRGn'+
'oA0ZGASRigyxqBCooAiRiiLNxJzc07Lw6lz68xv16Rbu4hXUyRMKCgOlng3SyRGbkwze1KyEfgm4sAys'+
'sLXf1a6im1359TTWzJ3y6y6fmA/r4BTm2xSnnhAjIgWyqg7OxQ+jmw0gHgWVjgu2rgyelQbd0hWBew7V'+
'yovr3xTn3BPJvxCSiw26sV/LwA67sg7k3Jr49DP89BqwqAqlnQeBexjy5xbMwYLZzhKwpxCclA/WzBHS'+
'yBHOxA/KwQ7GvA7Btw28tAzj2pqupwv17DKFfwiBexDJvxbJvIgKCQKspA+FfwzQxhDMww7Jvw7FvA3B'+
'uA28swzp3RSxqAppYwmHgAeFfRyimiTMv5HOwZfKu5K3rTCKhAy9tA7Hvg3DuQ3Atw28sw2zqgqYjwh0'+
'bgqXkAaPhzbGvRmzqVa1rAqblAqPiQ2/tg6+tgy6sguzrAq1rBGjmguTjAmJgQ2roWrGuYaclCOIggl/'+
'eQuhmgqvpgqRiQlybAuOiAuJgjHFuIu4rHOUjB2mnQmakgt4cgl1cAp9dgtzbQp2cAmWjwiTjAiHfyK5'+
'rn+7r3mSii6Rig+YkQaXjweVjQiUjQaTjAeIgRKRijy8sIGMhDLGuo24rXeimVGTizeNhS6TiziimVW3'+
'rHrIu5CGgAqupwy1rQpMLoSeAAAAAXRSTlMAQObYZgAAAWlJREFUeF5VzFOzK1EQgNG9xzOxk2Pbtm3b'+
'tm1b17Zt27b9V85k8nLzvXTXqq4GACP/C0JIYgBAAY7ohQswAHGKK8nE0dqe23AaQISdZsPOo0qrCeM6'+
'cyFFIakcpnln+Jouqy0sbTfaeFAId+np5WBXXhHr5Obiynf3F+qwsanZJ8TvVEBgUDAvNCxci3hEZFR0'+
'THZcfELiVHKKSJaOsyjNzGrPyc3LLygsKi4pFZV9krIorlRWVatrao3qG/78/dfS2iYmATTs6Ozq7unt'+
'6x8YHDIYUYyNG0IAicmD0zOzc/MLi0s8zcrq2gaCRWbTVqNt23fs3LWbp9mzd9/+AwzJInro8JGjx46f'+
'MDipOq04c/YcQ2vx/AX+xUuXVfwrV69dl924qUP01u07d+/df/Dw0eMnT5+hDOQQff7i5avXb96+e//h'+
'I4pqfxKb2T5/+frt+4+fv36zO8GiXLJFL4kcAwCjSb1oDKwDMvtwyB3q78QAAAAASUVORK5CYII=';

var icon_report_direct = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAYFBMVEUAAACvsrebjHDXy7f5+Pausra0po2nmYC+s5qL'+
'e125ur7QxJ6WDArKvJHRv6rDEBCtsbbTyKLNwZvRgHLJvJTZl4rn3Na2Z1rVzK7t6OLIuI/Ds43Zz7DKu5Lb0bGssLVAcwUHAAAAAXRSTlMAQObYZgAAAKVJ'+
'REFUeF5tzdcOwzAIQFGG98ruHv//l8WtFNVyzhtXIACC/oOIOgDgpRMAH50R8NV5H8V2k501htvoiJViI3F/tJFTSl3Z1kdTxfY8DCdJhuwkMcboyJ7UNgzF'+
'EJUYNeA8k1HiuqREZRYIuK6e5FC2UiprJTFncp6t9+6cllzpb/SWvMl5W35xrNGRJ5aBOe+xg0dRy/eOxPvt2bjdA0AYdWMM8AFB7hjReYdZRgAAAABJRU5E'+
'rkJggg==';

var icon_report_link = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAACXBIWXMAAAsTAAALEwEAmpwYAAABIFBMVEUAAACbjHCvsrfJvJT5+PbXy7e0po2+s5qLe12n'+
'mYDKvJG5ur6tsbausrbb0bHRv6qWDArZz7DQxJ7DEBDRgHLZl4rNwZvn3NbTyKLDs43IuI+2Z1rt6OLVzK7Ku5KssLV1wtydqZxgosGVqKVXsVBq0eyBqZVf'+
'mJ26t5ZcndFtgnQsoD+J7vjAvpaKnomnqYlsoGJFWnEob3E8nbJPw+RQxeZKqdpIf8hSf5hsvENKUnkkR38xcaU2iMI5ic09ecc4Wbo1W48+hUxobH4lNoQf'+
'ZVohgFAudIAxUaksQagrQZo/WoSimotUX4cnY1IUfRwXgCglcl80Xpc8YKN1gZGrpJFqeIc/hVcymURAlXFVi7CCnai2r5JhyuhVlc9biqeITlZjAAAAAXRS'+
'TlMAQObYZgAAAPNJREFUeF5lzeNyBEEUgNG+bYy1jG3btu33f4t0MqnJbO3389QFQsYthTF2DUK4oy2DcNiWg7BXxITinHleVwkFMEoZ97z/yRQEpbTJVIFM'+
'NeK4YolDjmEoQFVoGsc+B/DzR1Xg1NZMggD86k8WIwl20U4Fgd/XMxxFkYtwBkIyJaVoBEl37+BElmGECUgFkk/1p0kyMDI0SYhFLUAC06NjjI1/fH5Na+1a'+
'zJuZnZtfWFxaXtHaKXB1bX1jc2t7Z7eMe/sHh0fHJ6dnWuMCzy8ur65vbu/uf2+Svx4en55fXt/eCbFYq3e2VK8ZhIzjtuQY9A0LLSCs0XdPPQAAAABJRU5E'+
'rkJggg==';


if(document.getElementById('message'))
  {
  // Smilies' Box
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
  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].appendChild(table);

  // Smilies
  var a = document.createElement('a');
  a.setAttribute('title','Smilies');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    toggle('bb_smilies');
    return false;
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_smilies+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].insertBefore(a,document.getElementById('bb_sizes'));

  // Report Direct
  var a = document.createElement('a');
  a.setAttribute('title','Bericht verlinken');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    var url = prompt('ل_ل_â_ل_ل_ ل_â_ل_â_ل_â_ل_ ل_â_â_ ل_â_â_ ل_ل_لْ:','');
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
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_report_link+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].insertBefore(a,document.getElementById('bb_sizes'));

  // Report link
  var a = document.createElement('a');
  a.setAttribute('title','Bericht direkt anzeigen');
  a.setAttribute('href','#');
  a.addEventListener('click',function() {
    var url = prompt('لœل_ل_â_ل_ل_ ل_â_ل_â_ل_â_ل_ ل_â_â_ ل_â_â_ لوâ_ل_â_  :','');
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
  },false);

  var div = document.createElement('div');
  div.setAttribute('style','float:left; background:url('+icon_report_direct+') no-repeat 0px 0px; padding-left:0px; padding-bottom:0px; margin-right:4px; width:20px; height:20px; ');

  a.appendChild(div);

  document.getElementsByTagName('form')[0].getElementsByTagName('div')[0].insertBefore(a,document.getElementById('bb_sizes'));

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