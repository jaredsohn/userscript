// ==UserScript==
// @name        Смайлопак для YouBrony.ru
// @description Смайлопак для YouBrony.ru Переделал- CubexX.
// @match       http://youbrony.tk/*
// @include     http://youbrony.tk/*
// @version     0.2
// @author      CubexX
// ==/UserScript==
/* За основу взят смайлопак Табуна. Создатели: RainDash, eeyupbrony */
/* Ничего лишнего. :3 */
/* Special For YouBrony  */
(function(document, fn) {
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = '(' + fn + ')(window, window.document, window.jQuery);';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
})(document, function(window, document, $) {
    var meta = {
            url: 'http://userscripts.org/scripts/source/310192.user.js',
            version: '0.2'
        },
        smiles=[];

    /* SMILES */
    /* 
    Структура пака:
    smiles.push({
        id:'Код пака для браузера',
        title:'Название для людей',
        icon:'http://ссылка.на/иконку',
        smiles: [
            {url:'http://ссылка.на/смайл', w:ширина, h:высота},
            {url:'http://ссылка.на/смайл', w:ширина, h:высота},
            ...
        ]
    });
    */

        // Анимационные и маленькие
smiles.push({id:'anim_and_small',title:'Анимационные и маленькие',icon:'http://s1.hostingkartinok.com/uploads/images/2012/01/e56f4f7319af364586607d13d507d7a8.gif',smiles: [

{url:'', w:50, h:50},	
{url:'http://files.everypony.ru/smiles/anim_and_small/22.gif', w:50, h:50},
{url:'http://files.everypony.ru/smiles/anim_and_small/37.gif', w:50, h:50},
{url:'http://files.everypony.ru/smiles/anim_and_small/21.gif', w:50, h:50},
{url:'http://files.everypony.ru/smiles/anim_and_small/19.gif', w:50, h:50},
{url:'http://files.everypony.ru/smiles/anim_and_small/24.gif', w:50, h:50},
{url:'http://files.everypony.ru/smiles/anim_and_small/20.gif', w:50, h:50},
{url:'http://files.everypony.ru/smiles/anim_and_small/194.gif', w:50, h:50},

]});
smiles.push({id:'twilight',title:'Твайлайт',icon:'http://img600.imageshack.us/img600/7213/vectortwilightsparklesm.png',smiles: [

{url:'http://files.everypony.ru/smiles/twilight/219.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/twilight/510.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/twilight/120.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/twilight/108.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/twilight/276.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/twilight/137.gif', w:70, h:70},

]});
smiles.push({id:'rarity',title:'Рэрити',icon:'http://img696.imageshack.us/img696/9466/happyraritybynictendod3.png',smiles: [
	
{url:'http://files.everypony.ru/smiles/rarity/6.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rarity/180.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rarity/108.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rarity/248.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rarity/87.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rarity/76.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rarity/26.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rarity/110.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rarity/147.gif', w:70, h:70},

]});
smiles.push({id:'fluttershy',title:'Флаттершай',icon:'http://img36.imageshack.us/img36/4434/2flat6.png',smiles: [

{url:'http://files.everypony.ru/smiles/fluttershy/20.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/fluttershy/13.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/fluttershy/82.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/fluttershy/356.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/fluttershy/123.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/fluttershy/4.gif', w:70, h:70},

]});
smiles.push({id:'rainbow_dash',title:'Рэйнбоу Дэш',icon:'http://img600.imageshack.us/img600/5019/maythebestpetwinbysuper.png',smiles: [

{url:'http://files.everypony.ru/smiles/rainbow_dash/103.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rainbow_dash/330.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rainbow_dash/275.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rainbow_dash/304.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rainbow_dash/565.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rainbow_dash/464.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/rainbow_dash/664.gif', w:70, h:70},

]});
smiles.push({id:'applejack',title:'Эпплджек',icon:'http://img861.imageshack.us/img861/8295/applejackhonestybyatomi.png',smiles: [

{url:'http://files.everypony.ru/smiles/applejack/77.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/applejack/53.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/applejack/96.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/applejack/103.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/applejack/244.gif', w:70, h:70},

]});
smiles.push({id:'pinkie_pie',title:'Пинки Пай',icon:'http://s1.hostingkartinok.com/uploads/images/2012/02/53a353530c1aef2d7a53073d321303cf.png',smiles: [

{url:'http://files.everypony.ru/smiles/pinkie_pie/120.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/mems/82.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/pinkie_pie/613.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/pinkie_pie/275.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/pinkie_pie/145.gif', w:70, h:70},

]});
smiles.push({id:'cmc',title:'Меткоискатели',icon:'http://img577.imageshack.us/img577/5416/cmclogobyalicehumansacr.png',smiles: [
/* Special For YouBrony */
{url:'http://img266.imageshack.us/img266/6096/blum1.png', w:70, h:70},
{url:'http://s1.hostingkartinok.com/uploads/images/2012/02/baba74fd24ec11e664ee55a772a79bc1.png', w:70, h:70},
{url:'http://s1.hostingkartinok.com/uploads/images/2012/04/4954add1d4fd2a874651d2ca388ac82a.png', w:70, h:70},
{url:'http://s1.hostingkartinok.com/uploads/images/2012/01/4606f18a4bcd3cb709860f8aa3a5c9d2.png', w:70, h:70},
{url:'http://img-fotki.yandex.ru/get/6403/59841979.6c/0_71011_c06ab3a2_XS', w:70, h:70},
{url:'http://s1.hostingkartinok.com/uploads/images/2012/01/07192b2ed4d8390f773f97f339d1b442.png', w:70, h:70},


]});
smiles.push({id:'princess',title:'Аликорны',icon:'http://s1.hostingkartinok.com/uploads/images/2012/02/bdd552d239d47c62426b4a29bf42fe98.png',smiles: [

{url:'http://s1.hostingkartinok.com/uploads/images/2012/04/d1c1fa29a753d9166d95bfa83d306fe4.png', w:70, h:70},
{url:'http://img193.imageshack.us/img193/2501/clst2.png', w:70, h:70},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.13/0_69bce_f391681f_XS', w:70, h:70},
{url:'http://img-fotki.yandex.ru/get/6307/59841979.17/0_6a564_cdfb1abb_XS', w:70, h:70},
{url:'http://s1.hostingkartinok.com/uploads/images/2012/01/13b85516fd0a8bb3699aa8438699a80f.png', w:70, h:70},
{url:'http://s1.hostingkartinok.com/uploads/images/2012/03/d74b4a22131fb0d74b54990728619fb9.png', w:70, h:70},
{url:'http://img-fotki.yandex.ru/get/5304/59841979.49/0_6eace_55d84fa7_XS', w:70, h:70},
{url:'http://img-fotki.yandex.ru/get/5414/59841979.0/0_68ee6_5f22e7d_XS', w:70, h:70},

]});
smiles.push({id:'other_ponies',title:'Другие пони',icon:'http://img638.imageshack.us/img638/9177/6517a352c07d41fcc55329e.png',smiles: [

{url:'http://files.everypony.ru/smiles/other_ponies/225.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/87.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/339.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/224.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/307.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/53.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/159.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/769.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/0.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/40.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/327.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/199.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/320.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other_ponies/590.gif', w:70, h:70},

]});
	
smiles.push({id:'spike',title:'Спайк',icon:'http://img266.imageshack.us/img266/2269/2spik2.png',smiles: [

{url:'http://files.everypony.ru/smiles/spike/103.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/spike/49.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/spike/82.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/spike/28.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/spike/14.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/spike/75.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/spike/105.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/spike/37.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/spike/36.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/spike/31.gif', w:70, h:70},


]});
smiles.push({id:'not_pony',title:'Не пони',icon:'http://img692.imageshack.us/img692/2347/2dscr4y.png',smiles: [

{url:'http://files.everypony.ru/smiles/not_pony/103.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/22.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/110.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/10.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/147.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/13.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/174.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/87.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/11.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/58.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/76.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/not_pony/3.gif', w:70, h:70},

]});
smiles.push({id:'group',title:'Групповые',icon:'http://img545.imageshack.us/img545/1471/minebykurokaji11d4ajq29.png',smiles: [

{url:'http://files.everypony.ru/smiles/group/103.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/group/93.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/group/82.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/group/67.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/group/53.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/group/66.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/group/15.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/group/26.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/group/87.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/group/105.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/group/141.gif', w:70, h:70},

]});
smiles.push({id:'other',title:'Разное',icon:'http://img69.imageshack.us/img69/8136/tomtherockordiamondbyax.png',smiles: [

{url:'http://files.everypony.ru/smiles/other/22.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other/33.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other/0.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other/29.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other/47.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other/78.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other/30.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other/6.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other/48.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other/38.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/other/81.gif', w:70, h:70},

]});
smiles.push({id:'big',title:'Большие',icon:'http://img855.imageshack.us/img855/1720/120pxmlpfr008.png',smiles: [

{url:'http://files.everypony.ru/smiles/big/93.gif', w:100, h:100},
{url:'http://files.everypony.ru/smiles/big/159.gif', w:150, h:100},
{url:'http://files.everypony.ru/smiles/big/137.gif', w:150, h:100},
{url:'http://files.everypony.ru/smiles/big/53.gif', w:100, h:100},
{url:'http://files.everypony.ru/smiles/big/4.gif', w:120, h:75},
{url:'http://img-fotki.yandex.ru/get/6112/59841979.32/0_6c5f2_7b854dbe_orig', w:200, h:140},
{url:'http://s1.hostingkartinok.com/uploads/images/2012/04/a8cc920f9b510d743e4c725bf0f5cd18.png', w:100, h:100},

]});
smiles.push({id:'big_anim',title:'Большие анимации',icon:'http://i31.fastpic.ru/big/2012/0407/65/5d9a3572280fdee61cfc2a42c0191d65.gif',smiles: [

{url:'http://files.everypony.ru/smiles/big_anim/219.gif', w:150, h:150},
{url:'http://files.everypony.ru/smiles/big_anim/159.gif', w:150, h:132},
{url:'http://files.everypony.ru/smiles/big_anim/108.gif', w:120, h:120},
{url:'http://files.everypony.ru/smiles/big_anim/180.gif', w:160, h:150},
{url:'http://files.everypony.ru/smiles/big_anim/142.gif', w:219, h:150},

]});
smiles.push({id:'clapping',title:'Хлопающие пони',icon:'http://s1.hostingkartinok.com/uploads/images/2012/01/0cc15ebfec61cb15af822984be8bd5c0.gif',smiles: [

{url:'http://files.everypony.ru/smiles/clapping/10.gif', w:150, h:150},
{url:'http://files.everypony.ru/smiles/clapping/6.gif', w:150, h:150},
{url:'http://files.everypony.ru/smiles/clapping/13.gif', w:150, h:150},
{url:'http://files.everypony.ru/smiles/clapping/0.gif', w:150, h:150},
{url:'http://files.everypony.ru/smiles/clapping/4.gif', w:150, h:150},
{url:'http://files.everypony.ru/smiles/clapping/21.gif', w:150, h:150},
{url:'http://files.everypony.ru/smiles/clapping/25.gif', w:150, h:150},
{url:'http://files.everypony.ru/smiles/clapping/15.gif', w:150, h:150},

]});
smiles.push({id:'mems',title:'Мемы',icon:'http://img210.imageshack.us/img210/5362/awesome1e.png',smiles: [

{url:'http://files.everypony.ru/smiles/mems/404.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/mems/4.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/mems/65.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/mems/18.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/mems/259.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/mems/386.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/mems/101.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/mems/34.gif', w:70, h:70},
{url:'http://files.everypony.ru/smiles/mems/10.gif', w:70, h:70},
/* Special For YouBrony */
]});
smiles.push({id:'stamps',title:'Печати',icon:'http://savepic.su/1437589.png',smiles: [
{url:'http://2.bp.blogspot.com/-JQhLULYstPE/Tz4n3vxWqKI/AAAAAAAAfWA/2TuLEm-9gAU/s1600/1.png', w:150, h:150},
{url:'http://4.bp.blogspot.com/-TdmMvzAuov4/Tz4n45yHW4I/AAAAAAAAfWY/GSV9HN2FWkI/s1600/4.png', w:150, h:150},
{url:'http://2.bp.blogspot.com/-ZMnmkgMcAno/Tz4n5OIlbOI/AAAAAAAAfWg/IrpFpAn9ltU/s1600/5.png', w:150, h:150},
{url:'http://4.bp.blogspot.com/-7Fav00BNHFA/Tz4n4dWVsRI/AAAAAAAAfWQ/KE2bG1nq11o/s1600/3.png', w:150, h:150},
{url:'http://fc09.deviantart.net/fs70/f/2011/340/9/b/20_percent_cooler_package_sticker_by_hopeira9-d4ic8pk.png', w:150, h:150},
{url:'http://2.bp.blogspot.com/-NT9_y6h31ow/Tz4n33oQeBI/AAAAAAAAfWI/9NgowWIsJyA/s1600/2.png', w:150, h:150},
{url:'http://4.bp.blogspot.com/-lDVfyZvVoak/Tz4n5nB_a1I/AAAAAAAAfWo/bL1EpSaY76M/s1600/6.png', w:150, h:150},
{url:'http://fc08.deviantart.net/fs70/f/2011/345/f/a/the_great_and_powerful_trixie_approved_by_ambris-d4ivli5.png', w:150, h:150},
{url:'http://4.bp.blogspot.com/-zFaR9WGRJF8/Tz4n62kbiSI/AAAAAAAAfXA/32VsQXRyRtw/s1600/9.png', w:150, h:150},
{url:'http://s1.hostingkartinok.com/uploads/images/2012/03/f5b96001ff53952029c11db8355ebae4.png', w:150, h:150},
{url:'http://s1.hostingkartinok.com/uploads/images/2012/02/09f12b2dcad5ee22f9d8c44a68c10c28.png', w:150, h:150},
{url:'http://fc02.deviantart.net/fs70/f/2012/063/9/b/scootaloo_approved_by_ambris-d4rj4ad.png', w:150, h:150},
{url:'http://s1.hostingkartinok.com/uploads/images/2012/03/9d95a1c3a06fb7dffbb5f91299cf5517.png', w:150, h:150},
{url:'http://fc05.deviantart.net/fs71/f/2012/057/f/a/princess_luna_approved_by_ambris-d4r3ibw.png', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6401/59841979.86/0_72294_6c720638_M', w:150, h:150},
{url:'http://3.bp.blogspot.com/-V2oM574NBRo/Tz4n6Ov2NJI/AAAAAAAAfWw/UxL15V22Tu0/s1600/7.png', w:150, h:150},
{url:'http://dl.dropbox.com/u/40349001/MCaD_Approved.png', w:150, h:150},
{url:'http://fc00.deviantart.net/fs71/f/2012/057/e/5/gummy_approved_by_ambris-d4qv6ii.png', w:150, h:150},
{url:'http://fc09.deviantart.net/fs71/f/2012/075/f/b/pinkie_approved_by_9qsm78-d4szsdr.png', w:150, h:150},
{url:'http://fc00.deviantart.net/fs71/f/2012/077/4/c/smiling_pinkie_pie_approved_stamp_by_9qsm78-d4t0t3y.png', w:150, h:150},
{url:'http://i.neoseeker.com/mgv/60953-Shadow%20of%20Death/953/85/rainbow_dash_seal_of_approval_by_lemonyhoovesd3d8vey_display.png', w:150, h:150},
{url:'http://mylittlefacewhen.com/media/f/rsz/mlfw1244_small.png', w:150, h:150},
{url:'http://fc09.deviantart.net/fs70/f/2011/333/5/d/twilight___badge_by_zobe-d4hn2y5.png', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/40/59841979.38/0_6cebe_1fbd7613_orig', w:150, h:150},
{url:'http://fc01.deviantart.net/fs71/f/2011/333/d/7/rarity___badge_by_zobe-d4ho27o.png', w:150, h:150},
{url:'http://fc08.deviantart.net/fs70/f/2011/332/7/f/fluttershy___badge_by_zobe-d4hl3ej.png', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6114/59841979.69/0_70d07_937c1f32_XL', w:150, h:150},
{url:'http://fc04.deviantart.net/fs71/f/2011/332/5/0/rainbow_dash___badge_by_zobe-d4hivqy.png', w:150, h:150},
{url:'http://fc05.deviantart.net/fs71/f/2011/344/4/8/applejack___badge_by_zobe-d4ioun0.png', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6114/59841979.69/0_70d5f_92746bce_XL', w:150, h:150},
{url:'http://fc06.deviantart.net/fs71/f/2011/332/f/4/pinkie_pie___badge_by_zobe-d4hhc7u.png', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/8/59841979.37/0_6cd80_734dd9b4_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6214/59841979.45/0_6dff5_d0345ce4_L', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/5807/59841979.68/0_70d06_84501261_XL', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/54/59841979.38/0_6cec5_6ea2bfd1_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/51/59841979.38/0_6cec4_b3552fa3_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/40/59841979.37/0_6cde9_3a957d0d_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6/59841979.37/0_6cde8_70bb51aa_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/54/59841979.37/0_6cd7f_82532d66_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6213/59841979.36/0_6c7ea_d6dc263e_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/55/59841979.38/0_6cec6_18e94432_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6/59841979.37/0_6cde7_a7393c5f_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/5702/59841979.47/0_6e27b_89648d11_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/42/59841979.3b/0_6d5dc_8df67b1a_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/9/59841979.38/0_6cebf_f170e964_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/9/59841979.38/0_6ce11_443e62de_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6313/59841979.38/0_6cec0_ba1a6490_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/8/59841979.38/0_6cec2_dd48eb7a_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6113/59841979.37/0_6cd81_8096376e_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/5706/59841979.6d/0_71213_24ca106b_XL', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6113/59841979.3a/0_6d5d6_8ce0aae9_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/6112/59841979.36/0_6c7e9_1d0d1b15_orig', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/5110/59841979.47/0_6e278_f05c6969_XL', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/5304/59841979.47/0_6e279_b0e2238_XL', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/5303/59841979.47/0_6e27a_57d88405_XL', w:150, h:150},
{url:'http://img-fotki.yandex.ru/get/5803/59841979.4e/0_6ee9a_8615d952_L', w:150, h:150},
]});
smiles.push({id:'alphabet',title:'Алфавит',icon:'http://i28.fastpic.ru/big/2012/0407/e1/f70ec45f14c9b559973ca59d2bb320e1.png',smiles: [
{url:'http://img-fotki.yandex.ru/get/6500/59841979.79/0_718da_458f3cba_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6501/59841979.79/0_718c9_aa98c012_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.7a/0_718f5_4b9a53a8_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.f/0_694e3_43466dca_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.21/0_6a958_86b2bc22_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6109/59841979.f/0_694de_5a9943ff_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.11/0_6956e_7ec9b709_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6212/59841979.29/0_6b429_d3978031_-1-L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6503/59841979.7a/0_718f0_4c526b4c_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6408/59841979.b5/0_7697b_313f952b_-1-L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.78/0_718b3_fe35aa34_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.79/0_718dd_ec2b7407_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6403/59841979.79/0_718ce_6af12908_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.7a/0_718fc_adf515c0_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6403/59841979.79/0_718d1_2bae2a34_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6108/59841979.10/0_694fb_621fcd77_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.10/0_694fc_a8c9ea83_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.79/0_718cc_69c35a24_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6401/59841979.79/0_718d8_766652cc_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.10/0_694f0_29baf9ac_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.11/0_69561_6e5bf18a_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6501/59841979.79/0_718b9_c4d971bf_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6300/59841979.f/0_694e0_d05a4c47_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6403/59841979.79/0_718cf_41d5c485_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.10/0_694e4_e0c781d1_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6401/59841979.7d/0_71aac_989846b3_orig', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6401/59841979.79/0_718c7_a86fe966_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.10/0_69508_50f31be2_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6404/59841979.79/0_718bf_130ecd28_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.79/0_718db_501cd435_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6211/59841979.19/0_6a60e_d8daee99_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6403/59841979.6c/0_71036_7a4ef1c0_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6110/59841979.15/0_69ccf_dcc33d68_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6403/59841979.83/0_721cb_e0c454d5_orig', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.12/0_69742_871044fc_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6600/59841979.7a/0_718f9_d7c459a1_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.7a/0_718ff_52c1b4f6_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6502/59841979.7a/0_718e9_edca37db_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6502/59841979.7a/0_718f8_d2d4f3d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6503/59841979.79/0_718b8_6a1f44fc_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6404/59841979.79/0_718d5_7066e2ec_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/5414/59841979.d/0_6940f_81b433ce_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6211/59841979.18/0_6a5f7_2e28ab1c_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6300/59841979.11/0_6955d_92b25ebc_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.10/0_694f4_d1a9d8ad_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6109/59841979.11/0_69546_a292b37_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6508/59841979.a0/0_7496c_b07ec017_orig', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6108/59841979.11/0_69559_46f36e27_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/55/59841979.39/0_6d064_e0d5088e_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/5111/59841979.45/0_6dfbf_4b89bf9d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/5702/59841979.45/0_6dfbd_9bbcdb41_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/5802/59841979.45/0_6dfbe_a1837e38_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.11/0_69562_d4dfc269_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6404/59841979.79/0_718e2_6841d70b_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6503/59841979.79/0_718df_823249a4_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6501/59841979.79/0_718d6_6720b1dc_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6501/59841979.79/0_718c5_a756c8f5_M', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6308/59841979.16/0_69cfa_8ce88312_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.10/0_694f9_a5a5caad_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6300/59841979.f/0_694e2_dcd82600_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.12/0_6973f_669e2bdb_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6111/59841979.21/0_6a957_8a55c864_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6109/59841979.10/0_694fa_b0396f1_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.10/0_694f1_88acce4c_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6108/59841979.10/0_694e8_51a2c91b_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6111/59841979.18/0_6a60d_1bab3ee5_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6603/59841979.7a/0_718fa_8de8485d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/5702/59841979.46/0_6e228_28f62af3_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6310/59841979.26/0_6b128_e4880517_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6108/59841979.10/0_694ed_ad0c8f2b_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.10/0_694e5_a0f94526_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6111/59841979.23/0_6aeb7_2209175c_-1-L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6600/59841979.79/0_718e7_7e6d3bca_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6403/59841979.7a/0_718eb_184b4df0_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.21/0_6a973_3f5647cb_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.10/0_69509_7784693_orig', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6305/59841979.15/0_69cd0_ec46987a_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.79/0_718de_c60dda5d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6401/59841979.79/0_718ba_615c7fe0_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6501/59841979.7a/0_718fb_9068b678_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.11/0_69556_6c8b5d77_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.11/0_6955a_e0fcec94_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6403/59841979.79/0_718e0_c4f562db_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.7a/0_71901_bbff4349_M', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6214/59841979.3c/0_6d6c5_43ff2a65_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.17/0_6a05c_fe26acbe_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.11/0_6956b_45c276d8_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.7a/0_71904_52d52235_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6110/59841979.18/0_6a608_8732a6fb_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6404/59841979.6d/0_71218_43158253_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6307/59841979.17/0_6a051_8c1dcd29_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/5701/59841979.4a/0_6eb07_9c04ffff_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.79/0_718d9_51e42278_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6600/59841979.79/0_718d2_29e51577_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.79/0_718c3_3102614f_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.79/0_718e4_545763f5_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.21/0_6a919_d15bda07_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.79/0_718dc_c3781725_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.7a/0_71903_da36271a_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6603/59841979.79/0_718e5_5fe27749_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6208/59841979.f/0_694e1_f052145_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6109/59841979.10/0_69501_ce986262_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6305/59841979.16/0_6a03d_c3420eda_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.10/0_69506_23f81738_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.11/0_6956d_830f7056_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6502/59841979.7f/0_71f8a_52417fce_orig', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.10/0_694fd_479e755e_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.10/0_694f6_1283d499_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6109/59841979.10/0_694ec_e8194da5_M', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6108/59841979.10/0_694ff_5d18d14c_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6208/59841979.12/0_697b3_f9627265_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6305/59841979.22/0_6a980_476f8858_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.15/0_69c64_69cbb4ee_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.11/0_69548_af039ff8_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6108/59841979.10/0_694e9_4dcd8b20_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.11/0_69547_660a3228_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6500/59841979.79/0_718d4_773765b9_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.79/0_718bc_d6cfdc44_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.79/0_718bb_4b0529c_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6503/59841979.79/0_718c1_373d7c65_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6300/59841979.10/0_69507_daee35de_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6208/59841979.11/0_69574_a7d9ded2_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.11/0_6956f_fed86b87_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6210/59841979.17/0_6a050_99701f60_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.11/0_6955e_e8d5b8d9_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.79/0_718e1_8b9519dd_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.7a/0_718f4_41e31a82_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6405/59841979.7a/0_718ee_31dd764d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6501/59841979.7a/0_718ef_c9ae5a20_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.7a/0_718f1_1e7efadb_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.10/0_69503_ba3efb61_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.10/0_694ef_3b5ae790_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6113/59841979.38/0_6cf12_236dfe12_orig', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.f/0_694df_ca60d9e2_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.12/0_69741_b180839d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.11/0_69567_fd1002ab_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6306/59841979.21/0_6a972_5560d43b_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6109/59841979.10/0_694f3_d85d7a84_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6113/59841979.36/0_6ccb9_a50aaf7d_orig', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.16/0_6a002_bd07816b_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/2814/59841979.39/0_6cf1e_22e7bb0f_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6306/59841979.16/0_6a006_73abc2ac_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6502/59841979.79/0_718cb_c1ca8be5_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6300/59841979.23/0_6ae9f_b6db3164_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6208/59841979.12/0_69735_eb1490fe_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.11/0_69575_a9febda1_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6109/59841979.12/0_697b2_8538bfbc_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6401/59841979.7a/0_718f6_f4c59e33_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6602/59841979.78/0_718ab_27c8dcb_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6501/59841979.78/0_718a9_44b51eef_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6602/59841979.7a/0_71905_917fc8f8_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/5109/59841979.46/0_6e238_d8547eb7_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.78/0_718b2_8508ffad_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6404/59841979.79/0_718cd_9371da2c_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.11/0_6952c_453a6976_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6507/59841979.ab/0_75d92_2d2ccac2_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6602/59841979.7a/0_718f7_f95ad4f6_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.12/0_698b0_df5145cb_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.12/0_6973d_df58fd27_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.78/0_718ae_595bbe0b_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.78/0_718b4_938b13c0_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.7a/0_718e8_5ed9364b_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6404/59841979.78/0_718ac_7f39b4a_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.10/0_69502_426a825a_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.79/0_718d0_17acf5d8_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.11/0_6954a_57dfa78a_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6305/59841979.17/0_6a052_efddc22b_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6600/59841979.78/0_718b0_9a23d3d0_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.7f/0_71f88_b17458_orig', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/5801/59841979.46/0_6e22d_b8c0082_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6308/59841979.22/0_6a981_5b00c764_-1-L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6409/59841979.ab/0_75d93_d58c9d17_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6500/59841979.79/0_718c8_d95f7312_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6405/59841979.7a/0_718ea_4eb62401_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6208/59841979.14/0_69c63_d2167b67_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6300/59841979.14/0_69c5b_22c1e41e_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.78/0_718ad_d6733b4d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6405/59841979.79/0_718ca_6d71fcc1_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.11/0_6955f_899cee7f_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.10/0_69504_1c000956_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6600/59841979.79/0_718c2_414e401f_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6502/59841979.78/0_718aa_de79de8_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.12/0_6973e_541beeec_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6501/59841979.78/0_718af_c9dc112a_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6306/59841979.16/0_6a00d_ecef0bd4_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6108/59841979.10/0_69505_d80989cf_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6108/59841979.f/0_694dd_d899f94d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.78/0_718a5_e3a162ab_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6501/59841979.9e/0_7487f_83492d07_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.10/0_694f2_16fbd5c1_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6208/59841979.11/0_69554_12e447a6_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6602/59841979.78/0_718b1_4b80293d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6403/59841979.79/0_718d7_331878af_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6208/59841979.10/0_694e7_bf12a6ee_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6404/59841979.79/0_718be_1f1d9b97_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6404/59841979.7a/0_718ed_83ef9afb_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6401/59841979.7a/0_718f3_15e8bd94_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6506/59841979.a0/0_7496b_e282ca0e_M', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6208/59841979.11/0_69571_b09cc174_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6306/59841979.15/0_69cce_b3ab0a8a_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6300/59841979.15/0_69cda_d02d9c3a_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.11/0_6955b_83abd4a9_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.10/0_694e6_d789f03_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.79/0_718bd_2f3b4577_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.10/0_694ea_44c73510_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6404/59841979.79/0_718c0_5a7edc28_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.10/0_694fe_1932e6d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/5801/59841979.46/0_6e234_497eb69d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6500/59841979.7a/0_71902_da45c097_L', w:200, h:200}, /* Special For YouBrony */
{url:'http://img-fotki.yandex.ru/get/6503/59841979.78/0_718a4_2c829e4d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.16/0_6a003_e6e65dcf_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/5106/59841979.3c/0_6d67a_e90338c8_orig', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.10/0_694f5_969c8fe_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.12/0_698b3_4540423c_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.12/0_698b2_1494e40e_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6307/59841979.18/0_6a60c_38f51490_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6503/59841979.79/0_718e3_afc3f18d_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6303/59841979.10/0_694f7_cd1cb696_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6401/59841979.7a/0_718fd_5765f24f_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6403/59841979.7a/0_71900_7c6c762_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6502/59841979.79/0_718c4_ae47e907_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.10/0_694f8_36d82d15_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6503/59841979.78/0_718a8_b4529643_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.78/0_718a7_dd8e7fd_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6503/59841979.7a/0_718ec_4f660e32_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6402/59841979.7a/0_718fe_831aca8e_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6603/59841979.79/0_718d3_be2e7790_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6307/59841979.21/0_6a95e_adc10cb6_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6302/59841979.11/0_6957a_a7825cc_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6301/59841979.10/0_694eb_1fc83dd5_M', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6300/59841979.11/0_6954b_35ee63d6_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6211/59841979.29/0_6b370_466ce1a6_-1-L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6306/59841979.24/0_6afcb_1311a815_-1-L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6404/59841979.79/0_718e6_57c72428_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6601/59841979.78/0_718a6_b8075e50_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.79/0_718c6_8fd372a0_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6210/59841979.21/0_6a94c_27f19ab1_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.18/0_6a60b_ebb94dd4_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6400/59841979.7a/0_718f2_30ef69ed_L', w:200, h:200},
{url:'http://img-fotki.yandex.ru/get/6109/59841979.11/0_69563_7cb99d53_L', w:300, h:300},
{url:'http://img-fotki.yandex.ru/get/6209/59841979.11/0_69564_47da0818_L', w:300, h:300},
{url:'http://img-fotki.yandex.ru/get/6304/59841979.11/0_69565_83c2bafd_L', w:300, h:300},
{url:'http://img-fotki.yandex.ru/get/6108/59841979.11/0_69566_978bef88_L', w:300, h:300},
]});
    
smiles.push({id:'smiles',title:'Смайлики',icon:'http://spaces.ru/i/01_Smile1.gif',smiles: [

{url:'http://spaces.ru/i/01_Smile1.gif', w:20, h:20},
{url:'http://spaces.ru/i/07_sad.gif', w:20, h:24},
{url:'http://spaces.ru/i/33_cofe.gif', w:29, h:30},
{url:'http://spaces.ru/i/08_cool.gif', w:20, h:20},
{url:'http://spaces.ru/i/05_skeptik.gif', w:20, h:20},
{url:'http://spaces.ru/i/fu.gif', w:20, h:20},
{url:'http://spaces.ru/i/ura.gif', w:28, h:30},
{url:'http://spaces.ru/i/06_blink.gif', w:20, h:20},
{url:'http://spaces.ru/i/03_lol.gif', w:20, h:20},
{url:'http://spaces.ru/i/08_cool.gif', w:20, h:20},
{url:'http://spaces.ru/i/idiot.gif', w:20, h:27},
{url:'http://spaces.ru/i/nark.gif', w:33, h:28},
{url:'http://spaces.ru/i/facepalm.gif', w:21, h:26},
{url:'http://spaces.ru/i/nenado.gif', w:25, h:25},
{url:'http://spaces.ru/i/yy.gif', w:59, h:24},
{url:'http://spaces.ru/i/tost.gif', w:26, h:23},
{url:'http://spaces.ru/i/google.gif', w:52, h:54},

]});


    /* Special For YouBrony */
    // для не столько быстрого, сколько удобного доступа к пакам по id
    var packs_by_id = {};
    smiles.forEach(function(pack) {
        packs_by_id[pack.id] = pack;
    });
    
    // кеш DIV'ов со смайлами по id пака
    var block_cache = {};
    
    var create_block = function(id) {
        // в чувствительном к производительности месте пришлось от jQuery отказаться
        var imgTemplate = document.createElement('img'),
            img,
            block = document.createElement('div');

        block.className = 'emoticon-block';
        
        packs_by_id[id].smiles.forEach(function(smile) {
            img = imgTemplate.cloneNode(false);
            img.width = smile.w;
            img.height = smile.h;
            block.appendChild(img);

            // хак для уменьшения лага: оказалось, что проставление url'а картинке - длительный процесс
            // и выгоднее отложить его для скорейшего появления блока
            setTimeout((function(e, url) {
                return function() { e.src = url };
            })(img, smile.url), 0);
        });
        // пихаем в кэш
        block_cache[id] = block;

        $(block).delegate('IMG', 'click', on_emoticon_click);

        return block;
    };
    
    var on_show_pack_click = function() {
        var self = $(this),
            footer = self.closest('.markItUpFooter'),
            id = self.data('id'),
            block = block_cache[id];

        if(block && $(block).is(":visible")) {
            $(block).hide();
            $('.hide-emoticon-block', footer).hide();
        } else {
            if(!block) {
                block = create_block(id);
                // и добавляем в футер
                footer.append(block);
            }
            // скрываем видимый сейчас блок, если есть
            $('.emoticon-block', footer).hide();
            // показываем наш
            $(block).show();
            // показываем кнопку "Скрыть"
            $('.hide-emoticon-block', footer).show();
        }

        return false;
    };
    
    var on_show_all_button_click = function() {
        var self = $(this),
            footer = self.closest('.markItUpFooter');

        // если у нас уже показано больше одного пака - значит показаны все
        // т.к. они только по одному или все сразу отображаются
        // в таком случае их надо все скрыть
        if($('.emoticon-block:visible', footer).length > 1) {
            $('.emoticon-block', footer).hide();
            $('.hide-emoticon-block', footer).hide();
        } else {
            smiles.forEach(function(pack) {
                var block = block_cache[pack.id] || create_block(pack.id);
                footer.append(block);
                $(block).show();
            });
            // показываем кнопку "Скрыть"
            $('.hide-emoticon-block', footer).show();
        }
/* Special For YouBrony */
        return false;
    };
    
    var on_hide_pack_button_click = function() {
        var self = $(this),
            footer = self.closest('.markItUpFooter');

        $('.emoticon-block', footer).hide();
        self.hide();

        return false;
    };
    
    var on_emoticon_click = function() {
        var ta = $('TEXTAREA', $(this).closest('.markItUpContainer'))[0],
            s = ta.selectionStart,
            e = ta.selectionEnd,
            text = ta.value.substr(s, e-s).replace(/"/g, "&quot;"),
            tmp = this.cloneNode(false),
            html;
            
        tmp.alt = tmp.title = text;
        html = $('<DIV>').append(tmp).html();

        ta.value = ta.value.substr(0, s) + html + ta.value.substr(e);
        ta.selectionStart = ta.selectionEnd = s + html.length;

        ta.focus();

        return false;
    };
    
    var init_smile_pack = function(){
        var footer=$('.markItUpFooter') /* все футеры (вообще-то один, но это не важно) */;
                         /* Special For YouBrony */
        $('HEAD').append(
        '<style type="text/css">'+
        /* стили для футера */
        '   .markItUpFooter { -moz-box-sizing:border-box; box-sizing:border-box; width: 95%; }'+
        '   .reply .markItUpFooter { width: 98%; }'+
        /* раскраска панели внутри футера и блока смайлов */
        '   .emoticon-panel { background: #EAEAEA; border-bottom: solid 1px #D1D1D1; padding: 2px 4px 0 4px; }' +
        '   .emoticon-block { background: #FCFCFC; border-bottom: solid 1px #D1D1D1; padding-top: 4px; }' +
        /* картинки на панели и в блоке */
        '   .emoticon-panel IMG { cursor: pointer; margin: 2px; }'+
        '   .emoticon-block IMG { cursor: pointer; margin: 2px; }'+
        /* ссылка "закрыть" */
        '   .emoticon-panel A.hide-emoticon-block { display:none; float:right; }' +
        /* и панельку ресайза перекрасим, чтобы смотрелась с нашей рядом */
        '   .markItUpResizeHandle { background-color: #EAEAEA }' +
        /* и первую картинку: показать все выделим чуток */
        '</style>');
        
        

        if(footer.length > 0){
            var smiles_panel = $('<DIV>');

            smiles_panel.addClass('emoticon-panel');
            
            // Фиктивный пак "Все" ТОРМОЗА!!!
            smiles_panel.append(
                $('<IMG>')
                .attr('src', 'http://s1.hostingkartinok.com/uploads/images/2012/01/e9b3c2a14df172f70c9d8402652e9727.png')
                .attr('alt', 'Все')
                .attr('title', 'Все')
                .css('margin-right', '20px')
                .click(on_show_all_button_click)
            );

            // напихаем кнопочек на панель
            smiles.forEach(function(pack) {
                smiles_panel.append(
                    $('<IMG>')
                    .attr('src', pack.icon)
                    .attr('alt', pack.title)
                    .attr('title', pack.title)
                    .data('id', pack.id)
                    .click(on_show_pack_click)
                );
            });
            
            // и запихнём ссылку "Скрыть"
            smiles_panel.append(
                $('<A>')
                .attr('href', '#')
                .addClass('hide-emoticon-block')
                .click(on_hide_pack_button_click)
                // .css('padding-top', $('.markItUpResizeHandle', footer).length > 0 ? 3 : 7 ) // КСС крч
                .text('Скрыть')
            );
            // За основу взять смайлопак табуна
            // положим панель в footer
            footer.append(smiles_panel);
        }
    };

    $(function() {
        // Здесь просиходит магия:
        // - во-первых, проверяем, нет ли в window переменной meta
        // - если нет - инициализируем смайлопак и проставляем эту переменную
        // - также проверяем, не пора ли обновляться, если пора: грузим скрипт 
        //   с исходного сайта.
        // - если переменная уже есть - значит мы и есть тот скрипт, подгруженный
        //   с исходного сайта. Тогда нам надо проверить, та ли стоит версия, что 
        //   прописана у нас, и если нет - обновиться
        if(!window.tabun_smilepack_info) {
            window.tabun_smilepack_info = meta;

            // Начало обычной работы смайлопака
            init_smile_pack();
/* Special For YouBrony */

            //
            // начало механизма автообновления
            //
            // проверяем, поддерживает ли браузер localStorage: без него - никак
            if(window.localStorage) {
                // если поддерживает - начинаем
                var now = new Date().getTime(),
                    last_update_check_key = "tabun-smile-pack-last-update-check",
                    last_update_check = localStorage[last_update_check_key],
                    interval = 1000*60*60*24 /* один день */;


                if (!last_update_check || now - parseInt(last_update_check) > interval) {
                    localStorage[last_update_check_key] = '' + now;

                    var script = document.createElement('script');
                    script.setAttribute("type", "text/javascript");
                    script.setAttribute("src", meta.url + "?now=" + now);
                    document.body.appendChild(script); // run the script
                    //document.body.removeChild(script); // clean up: не даёт работать, значит - нафиг
                }
            }
        } else {
            // обновление
            if(window.tabun_smilepack_info.version != meta.version) {
                if(confirm("Доступно обновление смайлопака: \n\nТекущая версия: " + window.tabun_smilepack_info.version + "\nНовая версия: " + meta.version + "\n\nОбновить?")) {
                    if($.browser.opera) {
                        $('<DIV>')
                            .css({
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                textAlign: 'center',
                                background: '#FFF',
                                borderBottom: '2px solid Silver',
                                width: '100%',
                                height: '60px',
                                lineHeight: '30px',
                                zIndex: 10000
                            })
                            .html('Придётся обновить смайлопак вручную: опера не умеет это делать автоматически.<br/>Скачайте файл по ссылке: <a href="' + meta.url + '">' + meta.url + '</a>')
                            .appendTo('BODY');
                        //$('BODY').html('Придётся обновить смайлопак вручную: опера не умеет это делать автоматически.<br/>Скачайте файл по ссылке: <a href="' + meta.url + '">' + meta.url + '</a>');
                    } else {
                        window.location.href = meta.url;
                    }
                }
            }
  /* Special For YouBrony */      }
    });
});