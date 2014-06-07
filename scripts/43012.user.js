// ==UserScript==
// @name           deny_rakuten_travel_mail
// @namespace      http://aeg.jugem.jp/rakutentravel/
// @include        https://*.travel.rakuten.co.jp/portal/my/present_top.oubo_chk*
// @include        https://*.travel.rakuten.co.jp/portal/my/present_top.oubo?*
// ==/UserScript==

(
function() {
    var password="";

        var getInputElementsByName = function(searchName) {
	var classElements = new Array();
	var allElements = document.getElementsByTagName("input");
	for (i = 0, j = 0; i < allElements.length; i++) {
	    if (allElements[i].name == searchName) {
		classElements[j] = allElements[i];
		j++;
	    }
	}
	return classElements;
    }
    
   function inputPassword() {
      if (password !=""){
          var passBtn = getInputElementsByName("p")[0];
	  passBtn.value = password;
      }
   }
   function checkOutCheckBox() {
       GM_log("checkOutCheckBox");
      var nodes = document.evaluate(
         "//input[@type='checkbox'] [@name='f_present_flg' or @name='f_leisure_flg']",
         document.documentElement,
         null,
         XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
         null
      );

      for (var i = 0; i < nodes.snapshotLength; i++) {
         var z = nodes.snapshotItem(i);
         z.checked = false;
         try {
            z.parentNode.style.color = '#FF0000';
            z.parentNode.style.backgroundColor = '#DDD999';
         } catch(e) { GM_log(e); }
      }
   }

  var url = document.location.href;

    if (url.match(/top\.oubo_chk.*/)) {
	checkOutCheckBox();
    } else {
	inputPassword();
    }
}

)();

