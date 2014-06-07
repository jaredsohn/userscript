
// ==UserScript==
// @name          سكربت الابتسامات الجديدة 2011  By: wise wizard and nagato pein
// @namespace     Anonymous User
// @description   سكربت الابتسامات في الرسائل و المنتدى الخاص بالقبيلة , By: nagato pein and wize wizard
// @include        http://ae*.tribalwars.ae/*
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
'http://smiles.a7bk-a.com/smile_albums/nervus/3_8_14.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/3_11_3.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/v9v9net_209.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/sm215.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/speaknoe.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/spying.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/victory.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/27.jpg',
'http://smiles.a7bk-a.com/smile_albums/nervus/26.jpg',
'http://smiles.a7bk-a.com/smile_albums/nervus/25.jpg',
'http://smiles.a7bk-a.com/smile_albums/nervus/51.jpg',
'http://smiles.a7bk-a.com/smile_albums/nervus/41.jpg',
'http://smiles.a7bk-a.com/smile_albums/nervus/2006-10-01-10_23_570254.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/3.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/024.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/116.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/2006-10-13-03_32_42n028.gif',
'http://smiles.a7bk-a.com/smile_albums/nervus/589.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface/v9v9net_190.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface/2e6c1f6e41.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface/6c3b1fedfd.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface/b9c7b09f99.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface/ad50e278b2.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface/4797187cdb.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface/a170dc82ce.gif',
'http://smiles.a7bk-a.com/smile_albums/jobs/2006-10-01-03_11_11m6asmilies-com.gif',
'http://smiles.a7bk-a.com/smile_albums/sad/11907554238980.gif',
'http://smiles.a7bk-a.com/smile_albums/sad/11920151408223.gif',
'http://smiles.a7bk-a.com/smile_albums/sad/v9v9net_187.gif',
'http://smiles.a7bk-a.com/smile_albums/sad/v9v9net_208.gif',
'http://smiles.a7bk-a.com/smile_albums/love/11885901588064.gif',
'http://smiles.a7bk-a.com/smile_albums/love/36_3_5.gif',
'http://smiles.a7bk-a.com/smile_albums/love/v9v9net_194.gif',
'http://smiles.a7bk-a.com/smile_albums/music/ec0f980a07.gif',
'http://smiles.a7bk-a.com/smile_albums/music/29f49aa703.gif',
'http://smiles.a7bk-a.com/smile_albums/music/10a7b9abde.gif',
'http://smiles.a7bk-a.com/smile_albums/music/11920153481625.gif',
'http://mre7.com/smile/m/images/1/n%20(29).gif',
'http://mre7.com/smile/m/images/1/n%20(29).gif',
'http://mre7.com/smile/m/images/1/n%20(38).gif',
'http://mre7.com/smile/m/images/1/n%20(68).gif',
'http://mre7.com/smile/m/images/1/n%20(34).gif',
'http://mre7.com/smile/m/images/1/n%20(5).gif',
'http://mre7.com/smile/m/images/1/n%20(17).gif',
'http://mre7.com/smile/m/images/1/n%20(25).gif',
'http://mre7.com/smile/m/images/1/n%20(50).gif',
'http://mre7.com/smile/m/images/1/n%20(28).gif',
'http://mre7.com/smile/m/images/1/n%20(59).gif',
'http://mre7.com/smile/m/images/1/n%20(58).gif',
'http://mre7.com/smile/m/images/1/n%20(36).gif',
'http://mre7.com/smile/l/images/1/c%20(36).gif',
'http://mre7.com/smile/l/images/1/c%20(58).gif',
'http://mre7.com/smile/l/images/1/c%20(4).gif',
'http://mre7.com/smile/l/images/1/c%20(12).gif',
'http://mre7.com/smile/l/images/1/c%20(107).gif',
'http://mre7.com/smile/l/images/1/c%20(118).gif',
'http://mre7.com/smile/l/images/1/c%20(42).gif',
'http://mre7.com/smile/l/images/1/c%20(77).gif',
'http://mre7.com/smile/l/images/1/c%20(50).gif',
'http://mre7.com/smile/l/images/1/c%20(75).gif',
'http://mre7.com/smile/l/images/1/c%20(22).gif',
'http://mre7.com/smile/l/images/1/c%20(113).gif',
'http://mre7.com/smile/l/images/1/c%20(80).gif',
'http://mre7.com/smile/l/images/1/c%20(57).gif',
'http://mre7.com/smile/l/images/1/c%20(44).gif',
'http://mre7.com/smile/l/images/1/c%20(90).gif',
'http://mre7.com/smile/l/images/1/c%20(121).gif',
'http://mre7.com/smile/l/images/1/c%20(72).gif',
'http://mre7.com/smile/l/images/1/c%20(122).gif',
'http://mre7.com/smile/l/images/1/c%20(3).gif ',   
'http://www.x333x.com/smiles/data/22/36_3_17[1].gif',
'http://www.x333x.com/smiles/data/22/36_1_17[1].gif',
'http://www.x333x.com/smiles/data/22/36_1_25[1].gif',
'http://www.x333x.com/smiles/data/22/36_1_19[1].gif',
'http://www.x333x.com/smiles/data/22/36_1_50[1].gif',
'http://www.x333x.com/smiles/data/22/36_7_5[1].gif',
'http://www.x333x.com/smiles/data/22/36_1_32v[1].gif',
'http://www.x333x.com/smiles/data/22/36_7_6[1].gif',
'http://www.x333x.com/smiles/data/22/36_1_22[1].gif',
'http://www.x333x.com/smiles/data/13/100.gif',
'http://www.x333x.com/smiles/data/13/079.gif',
'http://www.x333x.com/smiles/data/13/053.gif',
'http://vb.acmilanclub.com/images/smilies/biggrin.gif',
'http://vb.acmilanclub.com/images/smilies/Swaffff.gif',
'http://vb.acmilanclub.com/images/smilies/Tloool%20(122).gif',
'http://vb.acmilanclub.com/images/smilies/Tloool%20(77).gif',
'http://vb.acmilanclub.com/images/smilies/0001.gif',
'http://vb.acmilanclub.com/images/smilies/sm5.gif',
'http://vb.acmilanclub.com/images/smilies/Tloool%20(45).gif',
'http://vb.acmilanclub.com/images/smilies/Tloool%20(226).gif',
'http://vb.acmilanclub.com/images/smilies/(42.gif',
'http://vb.acmilanclub.com/images/smilies/53.gif',
'http://vb.acmilanclub.com/images/smilies/yahoo.gif',
'http://vb.acmilanclub.com/images/smilies/rayof.gif',
'http://vb.acmilanclub.com/images/smilies/nocomennt.gif',
'http://vb.acmilanclub.com/images/smilies/a025.gif',
'http://vb.acmilanclub.com/images/smilies/sm41.gif',
'http://vb.acmilanclub.com/images/smilies/Ta038.gif',
'http://vb.acmilanclub.com/images/smilies/icon6.gif',
'http://vb.acmilanclub.com/images/smilies/thumbdown.gif',
'http://vb.acmilanclub.com/images/smilies/Tloool%20(73).gif',
'http://vb.acmilanclub.com/images/smilies/Tloool%20(31).gif',
'http://vb.acmilanclub.com/images/smilies/sm128.gif',
'http://vb.acmilanclub.com/images/smilies/s77-Sm-045.gif',
'http://vb.acmilanclub.com/images/smilies/T076.gif',
'http://vb.acmilanclub.com/images/smilies/sm275.gif',
'http://vb.acmilanclub.com/images/smilies/s77-Sm-006.gif',
'http://vb.acmilanclub.com/images/smilies/Tloool%20(218).gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/041.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/043.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/022.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/020.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/017.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/SuN048.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/SuN019.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/SuN009.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/01f2fd6646.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/f835fab6ed.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/e87a6d2b29.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/edd12769b9.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/e87a6d2b29.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/c7c312680f.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/033673c155.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/51e8a27a09.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/21b7942762.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/17b2d3cdf9.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/392c4b6f86.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/79.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/64.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/40.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/59.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/34.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/6d60317de1.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/34.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/c664d0e461.png',
'http://smiles.a7bk-a.com/smile_albums/bigface2/b8715e244c.png',
'http://smiles.a7bk-a.com/smile_albums/bigface2/b58db67bf3.png',
'http://smiles.a7bk-a.com/smile_albums/bigface2/d106e0d190.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/273d7c69b9.png',
'http://smiles.a7bk-a.com/smile_albums/bigface2/14199959a6.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/a8a9fcd7e2.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/b42fc4aad2.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/9de13bfa3a.png',
'http://smiles.a7bk-a.com/smile_albums/bigface2/20df4f71ad.png',
'http://smiles.a7bk-a.com/smile_albums/bigface2/53cb28449f.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/0f81d67b88.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/1e54cc9faf.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/1bc1ba4961.png',
'http://smiles.a7bk-a.com/smile_albums/bigface2/1b1f24ca45.png',
'http://smiles.a7bk-a.com/smile_albums/bigface2/53.jpg',
'http://smiles.a7bk-a.com/smile_albums/bigface2/45.jpg',
'http://smiles.a7bk-a.com/smile_albums/bigface2/40.jpg',
'http://smiles.a7bk-a.com/smile_albums/bigface2/33.jpg',
'http://smiles.a7bk-a.com/smile_albums/bigface2/39.jpg',
'http://smiles.a7bk-a.com/smile_albums/bigface2/39cf794253.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/31.jpg',
'http://smiles.a7bk-a.com/smile_albums/bigface2/32f4aca94f.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/23.jpg',
'http://smiles.a7bk-a.com/smile_albums/bigface2/23db229747.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/24.jpg',
'http://smiles.a7bk-a.com/smile_albums/bigface2/8a76537185.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/6dd5964bfe.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/0cfe9f226c.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/00f669930c.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/0a810dc081.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/SuN041.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/smile.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/rolleyes.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/embarrassed.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/SuN038.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/chilled.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/what.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/612df309a5.gif',
'http://smiles.a7bk-a.com/smile_albums/bigface2/28ff074ebd.gif',
'http://ae1.tribalwars.ae/graphic/unit/unit_spear_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_sword_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_axe_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_archer_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_snob_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_ram_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_catapult_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_spy_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_light_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_marcher_60.png?1',
'http://ae1.tribalwars.ae/graphic/unit/unit_heavy_60.png?1');



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
    var url = prompt('اضهار التقرير على شكل ربط:','');
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
    var url = prompt('أاضهار التقرير على شكل صوره  :','');
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