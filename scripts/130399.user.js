// ==UserScript==
// @name           NetPincer menu filter
// @namespace      https://userscripts.org/users/444814
// @description    Fiter menu items by shown ingredients
// @include        http://www.netpincer.hu/*/etlap
// @include        http://www.netpincer.hu/*/_etlap
// @grant          none
// ==/UserScript==

// http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function() {
  var whitelist, blacklist, items, allIngredients,
  $container,
  $whitelistContainer, $whitelist,
  $blacklistContainer, $blacklist,
  whitelist = [];
  blacklist = [];
  items = [];
  allIngredients = [];


  // Logic
  function applyFilters() {
    var i, j, ingredients;

    for (i = 0; i < items.length; i++) {
      items[i].show();

      ingredients = items[i].data('ingredients');

      // Apply whitelist
      for (j = 0; j < whitelist.length; j++) {
        if ($.inArray(whitelist[j], ingredients) == -1) {
          items[i].hide();
          break;
        }
      }

      // Apply blacklist
      for (j = 0; j < ingredients.length; j++) {
        if ($.inArray(ingredients[j], blacklist) > -1) {
          items[i].hide();
          break;
        }
      }
    }
  }


  // Create containers
  $container = $('<div class="gs-filter-container"><div class="filter-title">Hozzávalók</div></div>');
  $whitelistContainer = $('<div id="gs-filter-white-container"><span style="color: black">Csak amiben van</span><ul id="gs-filter-white" style="list-style-type: none"></ul></div>');
  $blacklistContainer = $('<div id="gs-filter-black-container" style="margin-top: 5px;"><span style="color: black">Csak amiben nincs</span><ul id="gs-filter-black" style="list-style-type: none"></ul></div>');
  $whitelist = $whitelistContainer.find('ul');
  $blacklist = $blacklistContainer.find('ul');

  $container.append($whitelistContainer);
  $container.append($blacklistContainer);

  $('div.assortment').after($container);


  // UI elements
  function filterItem(ingredient, list) {
    var $item, $remove;
    $item = $('<li style="padding-left: 7px">'+ingredient+'</li>');
    $remove = $('<span style="cursor:pointer">&cross;</span>').click(function() {
      $item.remove();
      list.splice($.inArray(ingredient, list), 1);
      applyFilters();
    });
    $item.prepend($remove);
    return $item;
  }

  function ingredientElement(ingredient) {
    var $item, $like, $dontlike;
    $item = $('<span style="margin-right:7px">'+ingredient+'</span>');
    $like = $('<span style="cursor:pointer">&#10003;</span>').click(function(e){
      addToList(ingredient, $whitelist, whitelist);
    });
    $dontlike = $('<span style="cursor:pointer">&cross;</span>').click(function(e){
      addToList(ingredient, $blacklist, blacklist);
    });
    $item.prepend($dontlike);
    $item.prepend($like);
    return $item;
  }


  // Initialization
  function addToList(ingredient, $list, list) {
    var i;
    if ($.inArray(ingredient, list) > -1) return;
    $list.append(filterItem(ingredient, list));
    list.push(ingredient);
    applyFilters();
  }

  $('.item-description').each(function() {
    var i, ingredients, current, $ingredientsContainer, $item;
    $ingredientsContainer = $(this);
    $item = $ingredientsContainer.closest('.item');
    ingredients = $ingredientsContainer.text().split(',');
    for (i = 0; i < ingredients.length; i++) {
      ingredients[i] = ingredients[i].trim();
      if ($.inArray(ingredients[i], allIngredients) == -1) {
        allIngredients.push(ingredients[i]);
      }
    }
    $item.data('ingredients', ingredients);
    items.push($item);

    $ingredientsContainer.text('').click(function(e){e.preventDefault();e.stopPropagation();});
    for (i = 0; i < ingredients.length; i++) {
      $ingredientsContainer.append(ingredientElement(ingredients[i]));
    }
  });
});
