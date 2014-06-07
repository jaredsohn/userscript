// ==UserScript==
// @name           gwMyMarketX
// @namespace      http://userscripts.org/users/krychek
// @description    GanjaWars.ru - Ссылки на другеи объявления в списке своих объявлений
// @include        http://www.ganjawars.ru/market-l.php
// @author         Alex Krychek
// ==/UserScript==

(function() {
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('http://www.ganjawars.ru/market-l.php') >= 0) {
  var itemcodename = new Array();

// Оружие
  itemcodename.push([/^Colt 633$/i,'colt']);

// Транспорт
  itemcodename.push([/^Легкий рюкзак$/i,'backpack']);
  itemcodename.push([/^Велосипед$/i,'bike']);
  itemcodename.push([/^Шлюпка$/i,'boat1']);
  itemcodename.push([/^Катер$/i,'boat2']);
  itemcodename.push([/^Toyota Celica$/i,'celica']);
  itemcodename.push([/^GPS Навигатор$/i,'gps']);
  itemcodename.push([/^Камаз$/i,'kamaz']);
  itemcodename.push([/^Lexus GX470$/i,'lexus']);
  itemcodename.push([/^Мотоцикл$/i,'motobike']);
  itemcodename.push([/^Санки$/i,'ny_sanki']);
  itemcodename.push([/^Морской паром$/i,'parom']);
  itemcodename.push([/^Яхта$/i,'yacht1']);
  itemcodename.push([/^Вертолёт Apache$/i,'apache']);
  itemcodename.push([/^Вертолёт МИ-8$/i,'mi8']);
  itemcodename.push([/^Mercedes SLR$/i,'slr']);

// Другая амуниция
  itemcodename.push([/^Грибы$/i,'mushroom']);
  itemcodename.push([/^Травяной сбор$/i,'weedset']);
  itemcodename.push([/^Вяленая рыба$/i,'perch']);
  itemcodename.push([/^Родниковая вода$/i,'water']);
  itemcodename.push([/^Nokia 3310$/i,'nokia3310']);
  itemcodename.push([/^Ericsson T29$/i,'erict29']);
  itemcodename.push([/^Siemens ME45$/i,'sme45']);
  itemcodename.push([/^Nokia 8910$/i,'nokia8910']);
  itemcodename.push([/^Защитные очки$/i,'glasses1']);
  itemcodename.push([/^Sony T300$/i,'st300']);
  itemcodename.push([/^Nokia 7200$/i,'nokia7200']);
  itemcodename.push([/^Panasonic X11$/i,'px11']);
  itemcodename.push([/^Nokia 6110$/i,'nokia6110']);
  itemcodename.push([/^Nokia N82$/i,'n82']);
  itemcodename.push([/^Ментаты$/i,'mentats']);

// Гранаты
  itemcodename.push([/^Ганжа-кола$/i,'ganjacola']);
  itemcodename.push([/^Новогодний подарок [2006]$/i,'hny2006']);
  itemcodename.push([/^Ржавая граната RGD-5$/i,'old_rgd5']);
  itemcodename.push([/^РГД-5$/i,'rgd5']);
  itemcodename.push([/^Граната F-1$/i,'grenade_f1']);
  itemcodename.push([/^РГД-2$/i,'rgd2']);
  itemcodename.push([/^ОР-1Т$/i,'lightst']);
  itemcodename.push([/^ОР-1$/i,'lights']);
  itemcodename.push([/^РКГ-3$/i,'rkg3']);
  itemcodename.push([/^MDN$/i,'mdn']);
  itemcodename.push([/^РГД-2М$/i,'rgd2m']);
  itemcodename.push([/^РГО-1$/i,'rgo']);
  itemcodename.push([/^РГН$/i,'rgn']);
  itemcodename.push([/^EMP-IR$/i,'emp_ir']);
  itemcodename.push([/^Frag Grenade MK-3$/i,'fg3l']);
  itemcodename.push([/^M67$/i,'m67']);
  itemcodename.push([/^EMP-S$/i,'emp_s']);
  itemcodename.push([/^M14 Thermite$/i,'anm14']);
  itemcodename.push([/^M3$/i,'m3']);
  itemcodename.push([/^M34 Ph$/i,'m34ph']);
  itemcodename.push([/^HG-78$/i,'hg78']);
  itemcodename.push([/^HG-84$/i,'hg84']);
  itemcodename.push([/^Mk-6 Frag Grenade$/i,'fg6']);
  itemcodename.push([/^Новогодний подарок$/i,'hny']);
  itemcodename.push([/^Frag Grenade MKIII$/i,'fg3']);
  itemcodename.push([/^Бутылка с напалмом$/i,'item_napalm']);


  var tds = root.document.getElementsByTagName('table')[6].getElementsByTagName('td');
  var islnum=-1;

  for (var i=8, l=tds.length; i<l; i+=7) {
    switch (tds[i+5].innerHTML) {
      case '[G]': islnum=0; break;
      case '[Z]': islnum=1; break;
      case '[P]': islnum=4; break;
      default: islnum=-1;
    }
    for(var j=0; j<itemcodename.length; j++)
      if (itemcodename[j][0].test(tds[i].innerHTML))
        tds[i].innerHTML = '<B><A href="http://www.ganjawars.ru/market.php?buy=1&item_id=' + itemcodename[j][1] + '">' + tds[i].innerHTML + '</a></b> <A href="http://www.ganjawars.ru/market.php?stage=2&action_id=1&island=' + islnum + '&item_id=' + itemcodename[j][1] + '">' + tds[i+5].innerHTML + '</a>';
  }
}
})();