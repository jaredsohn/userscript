// ==UserScript==
// @name        DobrijZmej RSI Russian [voyager-direct]
// @namespace   https://robertsspaceindustries.com
// @description Руссификация игрового магазина игры Star Citizen
// @include     https://robertsspaceindustries.com/*
// @version     1
// @grant       none
// ==/UserScript==
$.fn.zmejReplace = function(strFrom, strTo){
   if($(this).size()){
      return($(this).html($(this).html().replace(strFrom, strTo)));
   }
}


   $("*").each(function(i,elem){
      if($(elem).css("font-family").toLowerCase().indexOf('electrolize') >= 0){
         $(elem).css("font-family", "Verdana,Arial,Tahoma");
      }
   });

   var vd_timerId = 0;
      // VOYAGER DIRECT список оборудования
   if(window.location.toString().toLowerCase().indexOf('/voyager-direct') >= 0){
      $(".sidebar li.title:nth(0)").zmejReplace('Hangar ', 'Ангар ');
      $(".sidebar h1").zmejReplace('Categories', 'Категории');
      $(".sidebar a[href='/voyager-direct/']").zmejReplace('Featured', 'Популярные');
      $(".sidebar li.title:nth(1)").zmejReplace('Weapons', 'Орудия');
      $(".sidebar a[href='/voyager-direct/hangar-decorations']").zmejReplace('Decorations', 'Декорации');
      $(".sidebar a[href='/voyager-direct/hangar-posters']").zmejReplace('Posters', 'Постеры');
      $(".sidebar a[href='/voyager-direct/hangar-buggies']").zmejReplace('Buggies', 'Багги');
      $(".control-bar a[href='#newest']").zmejReplace('Newest', 'Новые');
      $(".control-bar a[href='#price']").zmejReplace('Price', 'По цене');
      $(".control-bar a[href='#alpha']").zmejReplace('Name', 'По названию');
   };

      // VOYAGER DIRECT общие фразы
   if(window.location.toString().toLowerCase().indexOf('/store') >= 0){
      $("div.content span.holobtn-top").html('Добавить в корзину'); 
      $("div.content span.stock-level").zmejReplace('available', 'доступно'); 
      $("div.store-warning").each(function(i,elem){
         $(elem).zmejReplace('All sales are final', 'Все продажи окончательные'); 
         $(elem).zmejReplace('By authority of the CCB: No exchange, gifts or refunds.', 'Обратите внимание: Нельзя обменять, подарить или вернуть.'); 
      });
      $("div.item-specs-table div.stat p").each(function(i,elem){
         $(elem).zmejReplace('Type', 'Тип'); 
         $(elem).zmejReplace('Size', 'Размер'); 
         $(elem).zmejReplace('Manufacturer', 'Производитель'); 
         $(elem).zmejReplace('Whitley\'s Guide Rating', 'Рейтинг по Whitley'); 
         $(elem).zmejReplace('Suitable for', 'Подходит для'); 
         $(elem).zmejReplace('Laser cannon', 'Лазерное орудие'); 
         $(elem).zmejReplace('Laser repeater', 'Лазерный повторитель'); 
         $(elem).zmejReplace('Neutron cannon', 'Нейтронное орудие'); 
         $(elem).zmejReplace('Tractor beam', 'Силовой луч'); 
      });
   };
      // VOYAGER DIRECT По моделям
   if(window.location.toString().toLowerCase().indexOf('/store/262') >= 0){
      $("div.description div.content div.excerpt p").html('М3А Беринга является лазерной пушкой начального уровня. Орудие данной конфигурации наносит малый урон снарядами, при довольно низком темпе стрельбы. В качестве основного предложения в линейке оружия Беринга, она имеет низкое энергопотребление, но малую энергетическую эффективность. Это её основной недостаток, однако, из за низкой цены многие пилоты присматривают её для своих бюджетных кораблей.'); 
   };
   if(window.location.toString().toLowerCase().indexOf('/store/263') >= 0){
      $("div.description div.content div.excerpt p").html('M4A является лазерной пушкой Беринга второго уровня. Её размер побольше, а значит, ей требуется больше энергии для нанесения повышенного урона. Скорострельность и энергетическая эффективность сравнимы с моделью М3А.'); 
   };
   if(window.location.toString().toLowerCase().indexOf('/store/265') >= 0){
      $("div.description div.content div.excerpt p").html('Omnisky III это базовая модель в линии лазерных пушек компании A&R для малых кораблей, и имеет соответствующие скорострельность, урон и дальность среди других видов оружия в своем классе. В её конструкции применены компоненты среднего качества, что влечёт за собой повышенную энергетическую эффективность в сравнении с некоторыми, менее дорогими, конкурентами. '); 
   };
   if(window.location.toString().toLowerCase().indexOf('/store/266') >= 0){
      $("div.description div.content div.excerpt p").html('OmniSky VI это лазерная пушка среднего размера от компании A&R. Она может похвастаться большим уроном, дальностью и потреблением мощности, чем её младший брат, OmniSky III и использует многие из тех же компонентов, в результате чего является средней по энергоэффективности. '); 
   };
   if(window.location.toString().toLowerCase().indexOf('/store/267') >= 0){
      $("div.description div.content div.excerpt p").html('Представляя собой модель с трёхствольной последовательной стрельбой Klaus & Werner, CF-007 Bulldog repeater это многозарядный лазер, способный поддерживать высокоточную интенсивную стрельбу, и облаюающий низким уроном от снарядов. В целом он имеет довольно низкое энергопотребление, однако в нескольких обзорах его эффективность была указана как довольно низкая. Тем не менее, CF-007 остается фаворитом среди новых пилотов, оснащающих свой первый корабль.'); 
   };
   if(window.location.toString().toLowerCase().indexOf('/store/268') >= 0){
      $("div.description div.content div.excerpt p").html('CF-117 Badger - надежный, многозарядный лазер второго уровня. Увеличенная мощность (и соответствующие энергопотребление) делают его весомым противником в любом бою. Энергоэффективность, однако, по-прежнему остается проблемой моделей K&W. '); 
   };
   if(window.location.toString().toLowerCase().indexOf('/store/269') >= 0){
      $("div.description div.content div.excerpt p").html('MaxOx’s NN-13 Neutron Gun предоставляет повышенную энергетическую нагрузку в жертву скорости и энергоэффективности. Кто-то может поспорить о том, что важнее - скорость, интенсивность огня и дистанциии или убойная сила, но не в том случае, если вы можете выстрелить всего один раз. '); 
   };
   if(window.location.toString().toLowerCase().indexOf('/store/270') >= 0){
      $("div.description div.content div.excerpt p").html('Последнее пополнение от Greycat в их моделях силовых лучей является существенным дополнением к перечню. Кроме более эффективного процесса перетаскивания, эта модель не намного отличается от своих предшественников. Sure Grip можно настроить на захват и извлечение любых объектов - от фрагментов астероида до плавающих в космосе членов экипажа, но не забывайте о требованиях гарантии при эксплуатации Soft-Touch®Greycat.'); 
   };

function updateOnList(){
      $(".more-info").zmejReplace('More Info', 'Подробнее');
      $("div.product-item div.type").zmejReplace('In-Game', 'В игре');
      $("div.js-filter-product-id-35[data-id='262'] div.description").html('М3А Беринга является лазерной пушкой начального уровня. Орудие данной конфигурации наносит малый урон снарядами, при довольно низком темпе стрельбы. В качестве основного предложения в линейке оружия Беринга, она имеет низкое энергопотребление, но малую энергетическую эффективность. Это её основной недостаток, однако...'); 
      $("div.js-filter-product-id-35[data-id='263'] div.description").html('M4A является лазерной пушкой Беринга второго уровня. Её размер побольше, а значит, ей требуется больше энергии для нанесения повышенного урона. Скорострельность и энергетическая эффективность сравнимы с моделью М3А.'); 
      $("div.js-filter-product-id-36[data-id='265'] div.description").html('Omnisky III это базовая модель в линии лазерных пушек компании A&R для малых кораблей, и имеет соответствующие скорострельность, урон и дальность среди других видов оружия в своем классе. В её конструкции применены компоненты среднего качества, что влечёт за собой повышенную энергетическую эффективность в сравнении с некоторыми, менее...'); 
      $("div.js-filter-product-id-36[data-id='266'] div.description").html('OmniSky VI это лазерная пушка среднего размера от компании A&R. Она может похвастаться большим уроном, дальностью и потреблением мощности, чем её младший брат, OmniSky III и использует многие из тех же компонентов, в результате чего является средней по энергоэффективности.'); 
      $("div.js-filter-product-id-37[data-id='267'] div.description").html('Представляя собой модель с трёхствольной последовательной стрельбой Klaus & Werner, CF-007 Bulldog repeater это многозарядный лазер, способный поддерживать высокоточную интенсивную стрельбу, и облаюающий низким уроном от снарядов. В целом он имеет довольно низкое энергопотребление, однако в нескольких обзорах...'); 
      $("div.js-filter-product-id-37[data-id='268'] div.description").html('CF-117 Badger - надежный, многозарядный лазер второго уровня. Увеличенная мощность (и соответствующие энергопотребление) делают его весомым противником в любом бою. Энергоэффективность, однако, по-прежнему остается проблемой моделей K&W.'); 
      $("div.js-filter-product-id-38[data-id='269'] div.description").html('MaxOx’s NN-13 Neutron Gun предоставляет повышенную энергетическую нагрузку в жертву скорости и энергоэффективности. Кто-то может поспорить о том, что важнее - скорость, интенсивность огня и дистанциии или убойная сила, но не в том случае, если вы можете выстрелить всего один раз. '); 
      $("div.js-filter-product-id-39[data-id='270'] div.description").html('Последнее пополнение от Greycat в их моделях силовых лучей является существенным дополнением к перечню. Кроме более эффективного процесса перетаскивания, эта модель не намного отличается от своих предшественников. Sure Grip можно настроить на захват и извлечение любых объектов - от фрагментов астероида до...'); 
      clearTimeout(vd_timerId);
}


  if(window.location.toString().toLowerCase().indexOf('/voyager-direct') >= 0){
         // обновим описание пушек после клика мышкой
      updateOnList();
         // встроим перехватчик события
      $('.products-container').bind('DOMNodeInserted', function(event) {
         //alert("!!!");
         clearTimeout(vd_timerId);
         vd_timerId = setTimeout(updateOnList, 500);
      });
   } 