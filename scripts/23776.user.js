// ==UserScript==
// @name couleur-lune-planetteliste.user.js
// @description couleur-lune-planetteliste.user.js
// @include http://*/*
// ==UserScript==

(function(){
  // REFERENCES: XPath (document.evaluate(...)) - http://www.w3.org/TR/xpath
  try {
    var fxColorMoonsBG = '#000000';
    var fxColorMoonsFG = '#80ffff';

    var obj = document.evaluate('//select[contains(@onchange,"haha(this)")]/option[contains(text(),"(")]',
                                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i=0; i<obj.snapshotLength; i++){
      var item = obj.snapshotItem(i);
      item.style.backgroundColor = fxColorMoonsBG;
      item.style.color = fxColorMoonsFG;
    }

  }catch(e){ alert('fxcolormoons:\n'+e+'\n'+(e.stack||'')); };

})();
