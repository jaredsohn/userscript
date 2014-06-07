// ==UserScript==
// @name           Carrier Loader
// @namespace      http://unidomcorp.com
// @include        http://*.war-facts.com/carrier.php*
// @version        1.2
// ==/UserScript==

// Version 1.0 = Original version by ?
// Version 1.1 = small fixes & auto-reaload page when finished
// Version 1.2 = some fixes for Firefox 4+

function wrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}

var assignBtn = document.getElementsByName('addships')[0];
var shipSel = document.getElementsByName('ship')[0];

if (assignBtn && shipSel && shipSel.selectedIndex == 0) {
  // "serialize" form elements
  window.serialize = function(form) {
    var Elms = form.getElementsByTagName('*');
    var serialized = [];
    for (var i = 0; i < Elms.length; i++) {
      if (Elms[i].hasAttribute('name')) {
        switch(Elms[i].tagName.toLowerCase()) {
          case 'input':
            switch (Elms[i].type) {
              case 'radio':
                if (Elms[i].checked == true) {
                  serialized.push(Elms[i].name+'='+Elms[i].value);
                }
                break;
              default:
                serialized.push(Elms[i].name+'='+Elms[i].value);
            }
            break;
          case 'select':
            for (var o = 0; o < Elms[i].options.length; o++) {
              if (Elms[i].options[o].selected == true) {
                serialized.push(Elms[i].name+'='+form[n].value);
              }
            }
            break;
          case 'textarea':
            serialized.push(Elms[i].name+'='+Elms[i].options[o].value);
            break;
        }
      }
    }
    return serialized.join('&');
  }

  unsafeWindow.loadAllCarriers = wrap(function(form, repeat) {
    // We use repeat incase we get the "Blank Screen of Death"
    // Go no further if we're finished.
    if (shipSel.selectedIndex+1 == shipSel.options.length && !repeat) {
      var link = document.evaluate("//a/text()[contains(.,'<< Back')]/..",
          document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
      window.location.href = link.href;
      alert("We're Finished!");
      return;
    }

    // Advance ships by 1
    if (!repeat) {
      shipSel.options[shipSel.selectedIndex+1].selected = true;
      form.elements["ship"].value = shipSel.value;
    }

    // Setup parameters
    var method = 'POST';
    var action = form.action ? form.action : window.location.href;
    var params = serialize(form);

    GM_xmlhttpRequest({
      method: method,
      url: action,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        },
      data: params,
      onload: function(responseDetails) {
        if (responseDetails.responseText == '') { // Blank Screen of Death
          unsafeWindow.loadAllCarriers(form,true);
        } else {
          unsafeWindow.loadAllCarriers(form,false);
        }
      }
    });
  });

  // Load All button
  var loadAll = document.createElement('input');
  loadAll.setAttribute('type','button');
  loadAll.setAttribute('value','Load All');
  loadAll.setAttribute('onClick','loadAllCarriers(this.form,false)');
  assignBtn.parentNode.insertBefore(loadAll,assignBtn.nextSibling);
}