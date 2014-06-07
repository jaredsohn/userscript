// ==UserScript==
// @name           Minecraft-Moscow Shop
// @version        1.4
// @namespace      GrAndAG
// @description    Minecraft-Moscow shop with groupping
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://www.minecraft-moscow.ru/cp/shop/
// @include        http://www.minecraft-moscow.ru/account/shop
// ==/UserScript==
//-----------------------------------------------------------------------------

var groupDef = {
  blocks : {
    name : "Блоки",
    ids  : [25, 26, 27, 28, 3, 2, 20, 21, 4, 99, 1, 148, 149, 150, 151, 100, 138, 164, 139, 173, 131, 140]
  },
  plants : {
    name : "Растения",
    ids  : [10, 11, 12, 13, 310]
  },
  rails : {
    name : "Рельсы",
    ids  : [117, 51, 50]
  },
  wool : {
    name : "Шерсть",
    ids  : [63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]
  },
  resources : {
    name : "Ресурсы",
    ids  : [187, 188, 183, 259, 253, 186, 274, 277, 256, 263, 211, 290, 306, 307, 308, 407]
  },
  tools : {
    name : "Инструменты",
    ids  : [195, 196, 197]
  },
  weapon : {
    name : "Оружие",
    ids  : [404, 181, 182]
  },
  food : {
    name : "Пища",
    ids  : [271, 302]
  },
  misc : {
    name : "Разное",
    ids  : [101, 127, 98, 97, 372, 386, 388, 391]
  },
  undefined : {
    name : "Не определено",
    ids  : []
  }
};
var ids;
var idSortedList;
var groups;

var rows;
var header;
var table;
var items;

//-----------------------------------------------------------------------------
function prepareData() {
  ids = new Array();
  groups = new Array();
  idSortedList = new Array();
  
  for (group in groupDef) {
    $.each(groupDef[group].ids, function(index, value) {
      ids[value] = group;
      idSortedList.push(value);
      groups.push(group);
    });
  }  
} 

//-----------------------------------------------------------------------------
function processShopTable() {
  table = $("table#shop");
  header = $("tr:first", table);
  rows = $("tr:gt(0)", table);

  items = new Array();
  
  var undef = 0;
  rows.each( function() {
    var id = $("input:hidden", this).attr("name");
    items[id] = this;
    //$(this).prepend("<td>"+id+"</td>");
    var group = "group-undefined";
    if (typeof(ids[id]) != 'undefined') {
      group = "group-" + ids[id];
    } else {
      undef++;
    }
    $(this).addClass("item-" + id + "-row").addClass(group);
  });
  return undef;
}

//-----------------------------------------------------------------------------
function addGroups(undef) {
  var html = "";
  html += '<div class="group-buttons" style="margin-top: 8px; margin-bottom: 4px;">Показывать: ';
  html += '<input type="button" name="button-all" class="button-group button-all" value="Все"> ';
  for (group in groupDef) {
    html += '<input type="button" name="button-' + group + '" class="button-group button-' + group + '" value="' + groupDef[group].name + '"> ';
  }
  html += '</div>';
  $(table).before(html);
  for (var groupButton in groupDef) {
    if ($(".group-" + groupButton).length > 0) {
      $(".button-" + groupButton).click( function(groupButton) { return function() {
        for (var group in groupDef) {
          if (group != groupButton) {
            $(".group-" + group).hide();
          } else {
            $(".group-" + group).show();
          }
        }
        $(".button-group").each( function() {this.style.fontWeight = "normal";});
        this.style.fontWeight = "bold";
      }}(groupButton), false);
    } else {
      $(".button-" + groupButton).hide();
    }
  }
  $(".button-all").click( function() {
    for (var group in groupDef) {
      $(".group-" + group).show();
    }
    $(".button-group").each( function() {this.style.fontWeight = "normal";});
    this.style.fontWeight = "bold";
  })[0].style.fontWeight = "bold";
}

//-----------------------------------------------------------------------------
function resortTShopTable() {
  $.each(idSortedList.reverse(), function(index, value) {
    if (typeof(items[value]) != 'undefined') {
      $(items[value]).insertAfter(header);
    }
  });
}

//-----------------------------------------------------------------------------
function main() {
  var hasUndefined;
  
  prepareData();
  hasUndefined = processShopTable();
  resortTShopTable();
  addGroups(hasUndefined);
}

//----------------------------------------------------------------------------
main();
//-----------------------------------------------------------------------------
