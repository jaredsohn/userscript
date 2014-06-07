// ==UserScript==
// @name          BBC AOD Add Ram Link
// @description	  Adds a direct "ram" link under the title on LHS of BBC radio iPlayer pages.
// @namespace     tag:rswarbrick@gmail.com,2008-01-01:BBCAddRam
// @include       http://www.bbc.co.uk/radio/aod/*/aod.shtml*

//by Rupert Swarbrick
// ==/UserScript==

(function() {
  var ramurl = "";

  var embeds = document.getElementsByTagName('embed');
  if( embeds.length > 0 ) {
    var attrs = embeds[0].attributes;
    for( var i = 0; i < attrs.length; i++ ) {
      if( attrs[i].name == "src" ) {
        ramurl = attrs[i].value;
      }
    }
  }

  if( ramurl != "" ) {

    ramurl = "http://www.bbc.co.uk"+ramurl;

    var titlebr = document.getElementById('showtitle').getElementsByTagName('br')[0];
    var ggldiv = document.createElement('div');

    ggldiv.setAttribute('style',
                        'text-align: right; padding-right: 10px;');
    ggldiv.innerHTML =
      '<div id="ramdiv"><a style="color: #EF017D;" href="'
      +ramurl
      +'">Standalone RAM Link</a></div>';
    titlebr.parentNode.insertBefore(ggldiv,titlebr.nextSibling);
  }

})();