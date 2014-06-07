// ==UserScript==
// @name        CleanSymbaloo
// @namespace   CleanSymbaloo
// @description Symbaloo without all the clutter
// @include     http://www.symbaloo.com/
// @version     2
// @grand       GM_addStyle, GM_getValue, GM_setValue
// ==/UserScript==
(function() {
  var me = this;

  // export fields
  me.option_enabledVar         = "CleanSymbaloo.enabled";
  me.option_hideCenterPanelVar = "CleanSymbaloo.hideCenterPanel";
  me.option_verticalCenterVar  = "CleanSymbaloo.verticalCenter";
  me.isHidden = true;

  // export functions
  me.resized = resized;
  me.updateCenterPanelVisibility = updateCenterPanelVisibility;
  me.hide = hide;
  me.update = update;

  //
  var oldResized = window.onresize;
  window.onresize = function(evt) { if( typeof oldResize === 'function' ) oldResized(); resized(); };

  // init
  setDefaultOptions();
  createTriangleDiv();
  createOptionsPanel();
  update();



  function setDefaultOptions() {
    var defaults = {}
    defaults[option_enabledVar]         = true;
    defaults[option_hideCenterPanelVar] = false;
    defaults[option_verticalCenterVar]  = true;
    for(var optionVar in defaults) {
      GM_setValue( optionVar, GM_getValue( optionVar, defaults[optionVar]) );
    }
  }

  function resized() {
    var wrapper = document.getElementById('wrapper');
    if( wrapper ) {
      var isEnabled = GM_getValue( me.option_enabledVar,false);
      var isVCenter = GM_getValue(option_verticalCenterVar, false);
      var marginTop = Math.max(0,(unsafeWindow.innerHeight - wrapper.offsetHeight)/2);
      if( !isHidden || !isEnabled || !isVCenter ) marginTop = 0;
      wrapper.style.marginTop = marginTop + 'px';
    }
  }

  function update() {
    var isEnabled = GM_getValue( me.option_enabledVar,false);
    var isHidden = isEnabled && me.isHidden;

    var xpaths = [
      "//div[@id='dock']",
      "//div[@id='bgtabs']",
      "//div[@id='header']"
    ];
    for(var i=0; i<xpaths.length; i++) {
      var element = getNode(xpaths[i]);
      if( element ) {
        element.style.display = (isHidden ? 'none' : 'block');
        element.style.visibility = (isHidden ? 'hidden' : 'visible');
      }
    }
    getNode("//*[@id='cleanSymbalooOptionsPanel']").style.display = me.isHidden ? 'none' : 'block';

    me.updateCenterPanelVisibility();
    me.resized();
  }

  function hide(doHide) {
    me.isHidden = doHide;
    update();
  }

  function updateCenterPanelVisibility() {
    // Smarks are the tiles in the grid.
    // Now show or hide the big middle smark
    var container = getNode( "//div[div[contains(@class,'widget-inner-container')]]" );
    if( container ) {
      var isEnabled = GM_getValue( me.option_enabledVar,false);
      var hide = isEnabled && GM_getValue(option_hideCenterPanelVar, false);
      container.style.visibility = hide ? 'hidden' : 'visible';

      // Switch possibility to drag another
      // tile on top of the big middle smark
      var smarks = unsafeWindow.Smark.smarks;
      for(var key in smarks) {
        var smark=smarks[key];
        if(smark.size.x>1) {
          smark.position.x = Math.abs(smark.position.x) * (hide ? -1 : 1);
        }
      }
    }
  }

  function createTriangleDiv() {
    GM_addStyle(
    '#cleanSymbalooTriangle {' +
    '  position: absolute;' +
    '  top: 0px; right: 0px;' +
    '  border-style: solid;' +
    '  border-color: transparent rgb(255,123,0) transparent transparent;'+
    '  border-width: 0px 35px 35px 0px;'+
    '}'
    );
    var triangle = document.createElement('div');
    triangle.id = 'cleanSymbalooTriangle';
    triangle.setAttribute('title','click to show/hide clutter');
    triangle.addEventListener('click', function() {
      me.hide(!me.isHidden);
    },false);
    var container = unsafeWindow.document.getElementById('container');
    container.appendChild(triangle);
  }

  function createOptionsPanel() {
    GM_addStyle(
    '#cleanSymbalooOptionsPanel {' +
    '  position: absolute;' +
    '  top: 40px; right: 2px;' +
    '  padding: 5px;' +
    '  background-color: #ccc;' +
    '  border: 2px solid black;' +
    '  border-radius: 4px;'+
    '  z-index: 1000;' +
    '}'
    );
    var container = unsafeWindow.document.getElementById('container');
    var panel = document.createElement('div');
    panel.id = 'cleanSymbalooOptionsPanel';
    panel.innerHTML =
      '<input type="checkbox" id="csEnabled"' + (GM_getValue(me.option_enabledVar, false)?' checked':'') + '>' +
      '<label for="csEnabled"' +
      '>&nbsp;Enabled</label><br>' +

      '<input type="checkbox" id="csVerticalCenter"' + (GM_getValue(option_verticalCenterVar, false)?' checked':'') + '>' +
      '<label for="csVerticalCenter"' +
      '>&nbsp;Vertical center</label><br>' +

      '<input type="checkbox" id="csHideCenterPanel"' + (GM_getValue(option_hideCenterPanelVar, false)?' checked':'') + '>' +
      '<label for="csHideCenterPanel" ' +
             'title="The tiles under the center panel unfortunately cannot be occupied"' +
      '>&nbsp;Hide middle panel</label><br>' +

      '';
    var container = unsafeWindow.document.getElementById('container');
    container.appendChild(panel);

    var        enabledCheck = getNode("//*[@id='csEnabled']");
    var        hideBigCheck = getNode("//*[@id='csHideCenterPanel']");
    var verticalCenterCheck = getNode("//*[@id='csVerticalCenter']");

    enabledCheck.addEventListener('click',function() {
      var enabled = enabledCheck.checked ? true : false;
      GM_setValue( me.option_enabledVar, enabled );
      me.resized();
    },false);
    hideBigCheck.addEventListener('click',function() {
      var hide = hideBigCheck.checked ? true : false;
      GM_setValue( me.option_hideCenterPanelVar, hide );
      me.updateCenterPanelVisibility();
    },false);
    verticalCenterCheck.addEventListener('click',function() {
      var center = verticalCenterCheck.checked ? true : false;
      GM_setValue( me.option_verticalCenterVar, center );
      me.resized();
    },false);
  }

  // Returns the first result from the xpath query
  function getNode(xpath,context,doc) {
    if( !doc ) doc = document;
    if( !context ) context = doc;
    var result = doc.evaluate(xpath,context,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
    return result ? result.singleNodeValue : null;
  }
})();