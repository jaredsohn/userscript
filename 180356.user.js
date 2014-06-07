// ==UserScript==
// @name        DobrijZmej RSI Russian [ship-specs]
// @namespace   https://robertsspaceindustries.com
// @description Руссификация страницы параметров кораблей игры Star Citizen
// @include     https://robertsspaceindustries.com/ship-specs*
// @version     1
// @grant       none
// ==/UserScript==
$.fn.zmejReplace = function(strFrom, strTo){
   if($(this).size()){
      return($(this).html($(this).html().replace(strFrom, strTo)));
   }
}

$.fn.zmejIfHtml = function(strIf, strTo){
   if($(this).size()){
      if($(this).html().indexOf(strIf) >= 0){
         return($(this).html(strTo));
      }
   }
}


   $("*").each(function(i,elem){
      if($(elem).css("font-family").toLowerCase().indexOf('electrolize') >= 0){
         $(elem).css("font-family", "Verdana,Arial,Tahoma");
      }
   });

   $(document).ready(function(){

      // Параметры кораблей
   if(window.location.toString().toLowerCase().indexOf('/ship-specs') >= 0){
      $("div#ship-specs-heading h1.document-title").html("Параметры кораблей"); 
      $("div#ship-specs-heading p.disclaimer").html("<strong>ПРЕДУПРЕЖДЕНИЕ:</strong> Это параметры, которые мы написали для себя на бумаге. Некоторые из них, скорее всего, изменятся в ходе создания 3D модели и непосредственно при балансировке игры в ближайшие 24 месяца. Тем не менее, они должны дать общее представление о возможностях и свойствах кораблей во вселенной Star Citizen."); 
      $("div#appheader a#compareitems span.holobtn-top").html("СРАВНИТЬ ВЫБРАННЫЕ"); 
      $("div#appheader a#resetships span.holobtn-top").html("ВОССТАНОВИТЬ СПИСОК"); 
      $("div#slidercontainer a.shipcompare span.trans-02s").html("СРАВНИТЬ"); 
      $("a.showvariants span.text").html("ПОКАЗАТЬ<BR />ВАРИАНТЫ"); 
      $("a.showvariants span.text-hide").html("СКРЫТЬ<BR />ВАРИАНТЫ"); 
      $("div#statsheadings a.statbox:nth(0) p").html("МОДЕЛЬ"); 
      $("div#statsheadings a.statbox:nth(1) p").html("ПРОИЗВОДИТЕЛЬ"); 
      $("div#statsheadings div.statbox p").each(function(i,elem){
         $(elem).zmejReplace('DESCRIPTION', 'ОПИСАНИЕ'); 
      });
      $("div#statsheadings a#measurementbtn p").html("ГАБАРИТЫ И ВЕС"); 
      $("div#statsheadings a#orderbylength p").html("ДЛИННА"); 
      $("div#statsheadings a#orderbybeam p").html("ШИРИНА"); 
      $("div#statsheadings a#orderbyheight p").html("ВЫСОТА"); 
      $("div#statsheadings a#orderbymass p").html("ВЕС БЕЗ ГРУЗА"); 
      $("div.measurementcontainer div.statbox p").each(function(i,elem){
         $(elem).zmejReplace(' m', ' м'); 
         $(elem).zmejReplace(' Kg', ' Кг'); 
      });

      $("div#statsheadings a#structuralbtn p").html("КОМПОНЕНТЫ"); 
      $("div#statsheadings div.structuralcontainer a.statbox p").each(function(i,elem){
         $(elem).zmejReplace('CARGO CAPACITY (TONNES)', 'ГРУЗОВОЙ ОТСЕК (ТОНН)'); 
         $(elem).zmejReplace('MAX CREW', 'ЭКИПАЖ'); 
         $(elem).zmejReplace('UPGRADE SPACE', 'РАСШИРЕНИЕ'); 
         $(elem).zmejReplace('MAX POWER PLANT SIZE', 'РАЗМЕР ЭНЕРГОУСТАНОВКИ'); 
      });
      $("div#statsheadings div.structuralcontainer div.statbox p").each(function(i,elem){
         $(elem).zmejReplace('FACTORY POWER PLANT', 'ЭНЕРГОУСТАНОВКА'); 
         $(elem).zmejReplace('MAX ENGINE (PRIMARY THRUSTER)', 'РАЗМЕР ДВИГАТЕЛЯ (МАРШЕВОГО)'); 
         $(elem).zmejReplace('FACTORY ENGINE', 'ДВИГАТЕЛЬ'); 
         $(elem).zmejReplace('FACTORY MANEUVERING THRUSTERS', 'МАНЕВРОВЫЕ ДВИГАТЕЛИ'); 
         $(elem).zmejReplace('MANEUVERING THRUSTERS', 'РАЗМЕР МАНЕВРОВЫХ ДВИГАТЕЛЕЙ'); 
         $(elem).zmejReplace('SHIELD', 'ЩИТЫ'); 
      });
      $("div.structuralcontainer div.statbox p").each(function(i,elem){
         $(elem).zmejReplace('Coming Soon', 'Скоро Будет'); 
         $(elem).zmejReplace('Coming soon', 'Скоро будет'); 
         $(elem).zmejReplace('Unknown', 'Неизвестно'); 
         $(elem).zmejReplace('1 tonne', '1 тонна'); 
         $(elem).zmejReplace('2 tonnes', '2 тонны'); 
         $(elem).zmejReplace('3 tonnes', '3 тонны'); 
         $(elem).zmejReplace('4 tonnes', '4 тонны'); 
         $(elem).zmejReplace(' tonnes', ' тонн'); 
         $(elem).zmejReplace('1 person', '1 человек'); 
         $(elem).zmejReplace('2 persons', '2 человека'); 
         $(elem).zmejReplace('3 persons', '3 человека'); 
         $(elem).zmejReplace('4 persons', '4 человека'); 
         $(elem).zmejReplace(' persons', ' человек'); 
         $(elem).zmejReplace('11 slots', '11 слотов'); 
         $(elem).zmejReplace('12 slots', '12 слотов'); 
         $(elem).zmejReplace('13 slots', '13 слотов'); 
         $(elem).zmejReplace('14 slots', '14 слотов'); 
         $(elem).zmejReplace('15 slots', '15 слотов'); 
         $(elem).zmejReplace('16 slots', '16 слотов'); 
         $(elem).zmejReplace('17 slots', '17 слотов'); 
         $(elem).zmejReplace('18 slots', '18 слотов'); 
         $(elem).zmejReplace('19 slots', '19 слотов'); 
         $(elem).zmejReplace('20 slots', '20 слотов'); 
         $(elem).zmejReplace('1 slot', '1 слот'); 
         $(elem).zmejReplace('2 slots', '2 слота'); 
         $(elem).zmejReplace('3 slots', '3 слота'); 
         $(elem).zmejReplace('4 slots', '4 слота'); 
         $(elem).zmejReplace(' slots', ' слотов'); 
      });

      $("div#statsheadings a#hardpointsbtn p").html("УЗЛЫ ПОДВЕСКИ"); 
      $("div.hardpointscontainer div.statbox p").each(function(i,elem){
         $(elem).zmejReplace('CLASS-', 'КЛАСС-'); 
         $(elem).zmejReplace(' additional available)', ' доступно дополнительно)'); 
         $(elem).zmejReplace(' available)', ' доступно)'); 
         $(elem).zmejReplace('ADDITIONAL EQUIPMENT', 'ДОПОЛНИТЕЛЬНОЕ ОБОРУДОВАНИЕ'); 
      });
      $("div.hardpointscontainer div.statbox p").each(function(i,elem){
         $(elem).zmejReplace('None', 'Нет'); 
      });

      $("div#shipscontainer div.ship:nth(0) div.description p").zmejIfHtml('The Aurora is the modern day descendant of', '"Аврора" является современным потомком космолёта X-7 компании RSI, который использовался для тестирования первого прыжкового двигателя. Имея утилитарный внешний вид, "Аврора" - идеальный корабль для новичка: нехватку стиля она компенсирует возможностями обновления модулей.');
      $("div#shipscontainer div.ship:nth(1) div.description p").zmejIfHtml('Perhaps you\'re looking for something that offers', 'Возможно, вы ищете грузовик, который сможет себя защитить? "Аврора Marque" оснащена парой лазеров от Behring и высокопроизводительной системой охлаждения.');
      $("div#shipscontainer div.ship:nth(2) div.description p").zmejIfHtml('Customized for mercantile and trading excursions', '"Аврора Clipper", специально разработанная для перевозки товаров и организации торговых маршрутов - идеальный корабль как для начинающих предпринимателей, так и для опытных торговцев. Для большей грузоподъёмности были урезаны объём двигателя и уровень брони, но Clipper - это новая планка в торговле.');
      $("div#shipscontainer div.ship:nth(3) div.description p").zmejIfHtml('With a more robust shield generator', 'Более надёжный генератор щита и парочка дополнительных точек крепления орудий превращают модель "Legionnaire" в специализированный боевой истребитель, который сможет справиться с любыми препятствиями, которые Вселенная вам преподнесёт.');
      $("div#shipscontainer div.ship:nth(4) div.description p").zmejIfHtml('Be proud of your roots with the brand-new', 'С совершенно новой моделью "Авроры", Delux, вы сможете гордиться своим происхождением, ведь она построена для самых требовательных пилотов, которые умеют хранить память о своих предках. Серия LX использует патентованный кожаный салон, способный наполнить комфортом долгие путешествия в черной бездне.');
      $("div#shipscontainer div.ship:nth(5) div.description p").zmejIfHtml('If you\'re going to travel the stars... ', 'Если вы собрались к звёздам... сделайте это стильно. 300i - это ведущая модель в роскошной линейке от Origin Jumpworks. Гладкий серебряный убийца, каждый выстрел которого отправляет собственный силуэт как послание жертве.');
      $("div#shipscontainer div.ship:nth(6) div.description p").zmejIfHtml('Exploration is man\'s highest calling. Prepare', 'Исследование - это серьёзный вызов. Приготовьтесь изучать далёкие горизонты и самые сложные технологии человечества на 315p от ORIGIN. Он оборудован более надёжным энергогенератором, и нестандартным сканером, эксклюзивно разработанным компанией Chimera Communications.');
      $("div#shipscontainer div.ship:nth(7) div.description p").zmejIfHtml('Just because it\'s a rough galaxy ', 'Не нужно жертвовать комфортом только потому, что галактика полна грубости: 325a поможет вам победить в любом сражении. 352a оборудован усовершенствованной системой управления огнем и системой слежения за целью, разработанной специально для 325a компанией WillsOp.');
      $("div#shipscontainer div.ship:nth(8) div.description p").zmejIfHtml('The combination of a Gangleri BP 707 ', 'Сочетание силовой установки Gangleri BP 707 Standard и фюзеляжа от 300i, переработанного для возможности размещения ускорителей Hammer Propulsion HM 4.3 делает модель 350r самым быстрым кораблём из тех, которые вы сможете когда-либо купить.');
      $("div#shipscontainer div.ship:nth(9) div.description p").zmejIfHtml('If you want to get from point A to point B', 'Если вы хотите добраться из точки А в точку Б как можно быстрее и как можно более стильно, то похоже, вам нужен именно M50 от ORIGIN. Благодаря двигателям с нагнетателем и более легким орудиям, M50 поистине БЫСТР.');
      $("div#shipscontainer div.ship:nth(10) div.description p").zmejIfHtml('The UEE Navy\'s premier carrier-based fighter craft, ', 'Палубный истребитель ВМС ОЗИ F7A является фронтовым кораблем, предназначенным для выполнения боевых задач. И хотя он не предназначен для дальних полётов, он нанесёт свою часть урона врагу... и порцию концентрированного, мощного ответного огня.');
      $("div#shipscontainer div.ship:nth(11) div.description p").zmejIfHtml('To the enemy, it is a weapon never to be underestimated', 'Недооценивать его вооружение очень опасно для врага. Для союзников он просто спаситель. F7C Hornet настолько надёжный и многофункциональный истребитель, что стал лицом всего флота ОЗИ. F7C может стать основой, которая продемонстрирует возможность реализации любых ваших задач.');
      $("div#shipscontainer div.ship:nth(12) div.description p").zmejIfHtml('The Aegis Avenger has had a long and', 'Aegis Avenger долгое время использовался патрулями Агентства Защитника ОЗИ. Хотя модель Avenger достаточно старая, она оборудована прочным, надёжным корпусом, мощность двигателя оказалась больше ожидаемой, а носовые орудия гарантированно поселят страх в сердцах ваших противников.');
      $("div#shipscontainer div.ship:nth(13) div.description p").zmejIfHtml('Fast becoming the symbol of the Vanduul Race, ', 'Быстро ставший символом расы Vanduul, истребитель Scythe - основа каждого налета и цель каждого человеческого лётчика-истребителя. При огромном боезапасе, реальным преимуществом Scythe является его маневренность, которая обеспечивается двумя спаренными маршевыми двигателями и 12 маневровыми ускорителями.');
      $("div#shipscontainer div.ship:nth(14) div.description p").zmejIfHtml('Drake Interplanetary claims that the Cutlass', 'Drake Interplanetary утверждают, что Cutlass стоит очень дешево, а его обслуживание в отрядах внутрисистемной милиции очень удобно. Обьем грузового отсека выше среднего, а кресла RIO и отлельное крепление буксировочного устройства, по описанию компании, облегчают проведение поисково-спасательных операций.');
      $("div#shipscontainer div.ship:nth(15) div.description p").zmejIfHtml('The T8A Gladiator is the UEE Navy', 'T8A Gladiator – главный палубный торпедоносец флота ОЗИ и пикирующий бомбардировщик класса "космос-земля". Крайне прочный, Gladiator – весьма удачный и чрезвычайно модульный каркас бомбардировщика из когда-либо созданных.');
      $("div#shipscontainer div.ship:nth(16) div.description p").zmejIfHtml('Freelancers are used as long haul merchant', 'Модель Freelancer используется крупными корпорациями как дальнемагистральный торговый корабль, но кроме того, она весьма популярна у частных капитанов, которым больше нравится заниматься разведкой космоса на окраинах галактики.');
      $("div#shipscontainer div.ship:nth(17) div.description p").zmejIfHtml('Drake maintains that the Caterpillar, a sprawling', 'По заявлениям Drake, Caterpillar - широкий, модульный корабль, по габаритам не уступающий своему тезке. Он используется для законной торговли и продвинутых поисково-спасательных работ... и в конце концов, Caterpillar - злой близнец Freelancer.');
      $("div#shipscontainer div.ship:nth(18) div.description p").zmejIfHtml('The Retaliator is the United Earth Empire', 'Retaliator - это основной тяжелый бомбардировщик ОЗИ, способный к гиперпрыжкам, несмотря на возраст модели. Крупные формирования этих судов выполняют дальние ударные миссии в необычных местах на окраинах Империи.');
      $("div#shipscontainer div.ship:nth(19) div.description p").zmejIfHtml('The Constellation, a multi-person freighter', 'Constellation — грузовой корабль с экипажем в несколько человек, который является самым популярным кораблём в современной продуктовой линейке RSI. Constellation полюбился контрабандистами и торговцами за его модульность, мощность... и за его очень отличительные внешние черты.');
      $("div#shipscontainer div.ship:nth(20) div.description p").zmejIfHtml('The MISC Starfarer is the galaxy', 'MISC Starfarer — галактический топливный танкер. Модели Starfarer применяются как при добыче, так и при доставке топлива: их вместительные резервуары позволяют как собирать топливо с газовых гигантов и внесолнечных источников, так и доставлять горючее от станций переработки к местам продажи.');
      $("div#shipscontainer div.ship:nth(21) div.description p").zmejIfHtml('Larger than a bomber but smaller than a ship of the line', 'Больше, чем бомбардировщики, но меньше, чем линкоры, корветы занимают привлекательную позицию в пантеоне боевых кораблей. Конечно, их броня и вооружение уступают линейному крейсеру, но корветы более маневренны и легче поддаются модернизации.');
      $("div#shipscontainer div.ship:nth(22) div.description p").zmejIfHtml('A mark two "peacekeeper" variant developed for the UEE', 'В другом варианте "миротворца", разработанном ОЗИ для усиления патрулей, Idris-P лишен оружия, имеющего возможность вести стрельбу непосредственно по другим кораблям и верхней точки крепления орудий, зато имеет допольнительное грузовое пространство и высокую скорость.');
      $("div#shipscontainer div.ship:nth(23) div.description p").zmejIfHtml('Coming standard with the Constellation', 'Поставляемая вместе с Constellation, модель P-52 является универсальным истребителем ближнего боя, созданным для поддержки при проведении боевых операций и при разведке.');

   }
});
