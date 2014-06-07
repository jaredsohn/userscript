//
// ==UserScript==
// @name          BibleComUa_LanguageSwitcher
// @namespace     http://bible.com.ua/bible/
// @description   Allows hide or show needed translations
// @author        SkyManPHP
// @include       http://bible.com.ua/bible/*
// @version       1.2.34
// ==/UserScript==
//
 

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var lang_caption = $("<span>Переводы: </span>").css({
     color: "#3B5998",
     marginLeft:30
  });
  var lang_ru = $("<input/>").attr({
     name: "lang_ru",
     id: "lang_ru",
     type: "checkbox",
     checked: "checked"
  }).css({
     marginLeft: 10
  });
  var lang_ru_lbl = $("<label for='lang_ru' style='color:#4EA5CA'>Русский</span>");

  var lang_ua = $("<input/>").attr({
     name: "lang_ua",
     id: "lang_ua",
     type: "checkbox",
     checked: "checked"
  }).css({
     marginLeft: 10
  });
  var lang_ua_lbl = $("<label style='color:#4EA5CA' for='lang_ua'>УПО</span>");

  var lang_uk = $("<input/>").attr({
     name: "lang_uk",
     id: "lang_uk",
     type: "checkbox",
     checked: "checked"
  }).css({
     marginLeft: 10
  });
  var lang_uk_lbl = $("<label style='color:#4EA5CA' for='lang_uk'>King James Version</span>");

  $(".footermenu").css({
     width: 700
  })
  .append(lang_caption)
  .append(lang_ru).append(lang_ru_lbl)
  .append(lang_ua).append(lang_ua_lbl)
  .append(lang_uk).append(lang_uk_lbl);

  $(".footermenu input[type=checkbox]").live("click",function(){
     if ($(this).not(':checked')) {
       $(".maincontent p").each(function(){
           var txt_copy = $(this).html().split("<br>");
           if (txt_copy[2]) {
               var verse_id = $(this).find("a").attr("name");
               console.log("verse_id="+verse_id);

               txt_copy[0] = txt_copy[0].replace(verse_id + ". ", "");
               $(this).empty();
               $(this).append($("<a name='" +  + "'></a><span>" + verse_id + ". </span>"));

               if ($("lang_ru").is(":checked")) {
                 $(this).append($(txt_copy[0]));
               }

               if ($("lang_ua").is(":checked")) {
                 $(this).append($(txt_copy[1]));
               }

               if ($("lang_uk").is(":checked")) {
                 $(this).append($(txt_copy[2]));
               }
           }
       })
     }
  });
}

// load jQuery and execute the main function
addJQuery(main);