// ==UserScript==
// @name          Test Script
// @description   Test
// @namespace     jimgodlike
// @include       http://*
// @require       http://userscripts.org/scripts/source/49700.user.js
// @require       http://userscripts.org/scripts/source/50018.user.js
// @version       1.0
// ==/UserScript==

  var lang = GM_config.gets('lang','en'); // get the language - or set it to 'en' if it was not yet stored
  var configStyle = <><![CDATA[
/* Remove the 40% wasted space to the left */
.indent40 {
  margin-left: auto !important;
}
]]></>.toString();
GM_config.init('Configuration for Personal Data',{
    name:    { section: ['Personal'], label: 'Name:', type: 'text', cols:50, default: 'John Doe' },
    age :    { label: 'Age:', type: 'int', default: 21 },
    gender:  { label: 'Gender:', type: 'radio', options:['Male','Female'], default: 'Male' },
    public:  { section: ['Profile'], label: 'Public Profile:', type: 'checkbox', default: false }
  },
  GM_config.eCSS, // to add your CSS - replace this with configStyle
  {
    open: function() {
      GM_config.addBorder(); // add a fancy border
      GM_config.resizeFrame('480px','360px'); // resize the config window
      GM_config.sections2tabs();
      GM_config.addTooltip(0,'Put your name here'); // add some tooltips
      GM_config.addTooltip(1,'How old are you today?');
      // GM_config.sections2tabs(); // convert the sections to tabs - but we didn't define any section
    },
    save: function() { location.reload(); } // reload the page when configuration was changed
  }
);

GM_config.open();