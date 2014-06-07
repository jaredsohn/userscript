// ==UserScript==
// @name           RV Bulk Potions
// @namespace      http://userscripts.org/users/65879
// @description    Roguevampires use potions in bulk
// @include        http://www.roguevampires.net/inventory.php*
// @include        http://www.roguevampires.net/useitem.php*
// ==/UserScript==
var test_salt = '';

function RVBulk () {
	var bulk_return_mode = GM_getValue('bulk_return_mode', 0);
	var potions = { 
		'item335' : GM_getValue('item335', 0),
		'item336' : GM_getValue('item336', 0),
		'item337' : GM_getValue('item337', 0),
		'item338' : GM_getValue('item338', 0),
		'item339' : GM_getValue('item339', 0),
		'item340' : GM_getValue('item340', 0),
		'item341' : GM_getValue('item341', 0),
		'item342' : GM_getValue('item342', 0),
		'item343' : GM_getValue('item343', 0),
		'item344' : GM_getValue('item344', 0),
		'item345' : GM_getValue('item345', 0),
		'item253' : GM_getValue('item253', 0),
		'item347' : GM_getValue('item347', 0),
	};

	var potions_list = {  
		'Crimson Potion' : 'item335',
		'Ivory Potion'   : 'item336',
		'Lime Potion'    : 'item337',
		'Olive Potion'   : 'item338',
		'Purple Potion'  : 'item339',
		'Silver Potion'  : 'item340',
		'Snow Potion'    : 'item341',
		'Smoky Potion'   : 'item342',
		'Flamy Potion'   : 'item343',
		'Golden Potion'  : 'item344',
		'Brown Potion'   : 'item345',
		'Pint of Blood'  : 'item253',
		'Mini Blood Vial': 'item347',
	};

	var revert_potions_list = {  
		'item335' : 'Crimson Potion',
		'item336' : 'Ivory Potion',
		'item337' : 'Lime Potion',
		'item338' : 'Olive Potion',
		'item339' : 'Purple Potion',
		'item340' : 'Silver Potion',
		'item341' : 'Snow Potion',
		'item342' : 'Smoky Potion',
		'item343' : 'Flamy Potion',
		'item344' : 'Golden Potion',
		'item345' : 'Brown Potion',
		'item253' : 'Pint of Blood',
		'item347' : 'Mini Blood Vial',
	};

  this.confirm = function($id) {
    $vars = this.title.split("_");
    //console.log($vars);
    $quest = revert_potions_list[$id];
    var $answer = prompt('How many ' + $vars[0] + 's do you want to use ?', $vars[2]);
    if(($answer != null) && (parseInt($answer) >= 1) && (parseInt($answer) <= parseInt($vars[2]))) {
      items_left = parseInt($answer) - 1;
      GM_setValue($vars[3], items_left);
      GM_setValue('bulk_return_mode', 1);
      use_url = "http://www.roguevampires.net/useitem.php?itemid=" + ($vars[1] + test_salt);
      document.location = use_url;
    } else {
      //console.log('do nothing');
    }
  }

  this.init = function () {
		link = document.location.toString();
		if (link.match("useitem.php") && bulk_return_mode) {
      // if needs to return
      document.location = "http://www.roguevampires.net/inventory.php";
		} else {
      // if needs to use items or add links
      GM_setValue('bulk_return_mode', 0);
      
      var $doc_anchors = document.getElementsByTagName("a");
      
      // if still in use mode
      for (key in potions)  {
        if(potions[key] != 0) {
          $span = document.getElementById(key);
          $link = $span.childNodes[3].href;
          $str_link = $link.toString();
          $item_id_arr = $str_link.split('=');
          console.log('use it -> ' + $item_id_arr[1] + " times: " + potions[key]);
          GM_setValue(key, (parseInt(potions[key]) - 1));
          GM_setValue('bulk_return_mode', 1);
          use_url = "http://www.roguevampires.net/useitem.php?itemid=" + ($item_id_arr[1] + test_salt);
          document.location = use_url;
        }
      }
      
      
      //console.log($doc_anchors);
      for (ii = 0; ii <$doc_anchors.length; ii++){
        if(potions_list[$doc_anchors[ii].innerHTML]) {
          $span = document.getElementById(potions_list[$doc_anchors[ii].innerHTML]);
          $link = $span.childNodes[3].href;
          $str_link = $link.toString();
          $item_id_arr = $str_link.split('=');
          parent_html = $span.parentNode.innerHTML.toString();
          parent_2_parts = parent_html.split('<br');
          parent_part = parent_2_parts[0].toString();
          amount_arr = parent_part.split('&nbsp;x');
          amount = amount_arr[1].toString();
          $is_val = $doc_anchors[ii].innerHTML + "_" + $item_id_arr[1] + "_" + amount + "_" + potions_list[$doc_anchors[ii].innerHTML];
          //console.log($is_val);
          
          $bulk_link = document.createElement('a');
          $bulk_link.setAttribute('href', "#");
          $bulk_link.setAttribute('onclick', "return false;");
          $bulk_link.setAttribute('id', "bulk_"+$item_id_arr[1]);
          $bulk_link.setAttribute('title', $is_val);
          $bulk_link.setAttribute('style', "color:#990000");
          $bulk_link.innerHTML = "[Use Bulk]";
          $span.appendChild($bulk_link);
          
          document.getElementById("bulk_"+$item_id_arr[1]).addEventListener('click', this.confirm, true);
        }
      }
    }
  }
}

bulk = new RVBulk();
bulk.init();