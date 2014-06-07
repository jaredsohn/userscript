// ==UserScript==
// @name        Campfire iPhone UI
// @namespace   http://fluidapp.com
// @description After setting the User Agent to iPhone, this will tweak the Campfire UI so you can get the nice compact iPhone UI in Fluid.
// @include     *
// @author      M@ McCray (http://www.mattmccray.com)
// ==/UserScript==

(function () {
    if (window.fluid) {
      if(window.Iphone) {
        Iphone.hideToolbar = function() {}
        Iphone.isFixedLayout = function() { return true; }
        
        Iphone.layout = function() {
          document.body.writeAttribute("orientation", "portrait");
          document.body.writeAttribute("keyboard", "hidden");
          
          var visibleHeight = document.viewport.getHeight();//456;
          var visibleWidth = document.viewport.getWidth() - 25;
          var authorColumnWidth = Position.cumulativeOffset($('chat').getElementsByTagName('td')[1])[0];
          var messageColumnWidth = visibleWidth - (authorColumnWidth + 5);
          
          Iphone.setBodyHeight(visibleHeight);
          $$('table.chat').each(function(elem){
            elem.setStyle('width: '+ visibleWidth +'px !important;' )
          })
          var stylesheet = $A(document.styleSheets).last();
          var rules = stylesheet.cssRules || stylesheet.rules;
          var style = rules[rules.length - 1].style;
          if (style) style.width = messageColumnWidth +'px !important';
          $('input').style.width = visibleWidth - 60 + 'px';

          if (Iphone.visibleHeight != visibleHeight) {
            document.fire("iphone:layoutChanged", { 
              orientation: "protrait",
              keyboardVisible: false,
              visibleHeight: visibleHeight 
            });
          }
        }
        
        Iphone.layout();
        
        Event.observe(window, 'resize', function(){
          Iphone.layout();
        });
      }
    }
})();