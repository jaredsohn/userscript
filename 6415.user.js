// ==UserScript==
// @name           Google Reader for wider screens
// @namespace      http://wtw.tw/scripts/
// @description    Changes the maximum width of Google Reader items, for better viewing on wider screens with higher resolutions.
// @include        *.google.*
// ==/UserScript==

function setRuleStyle(sClassName, sRule) {
  var sheets = document.styleSheets;
  var rules;
  var styleObj;
  for (i = 0; i < sheets.length; i++) {
    rules = sheets[i].cssRules || sheets[i].rules;
    for (var j = 0; j < rules.length; j++) {
      if (rules[j].selectorText && rules[j].selectorText.indexOf(sClassName) != -1) {
        styleObj = rules[j].style.cssText = sRule
        break;
      }
    }
  }
}

if (location.hostname.match(/\.google\.(com|ad|ae|com.af|com.ag|com.ai|am|it.ao|com.ar|as|at|com.au|az|ba|com.bd|be|bg|com.bh|bi|com.bn|com.bo|com.br|bs|co.bw|com.by|com.bz|ca|cd|cg|ch|ci|co.ck|cl|cn|com.co|co.cr|com.cu|cz|de|dj|dk|dm|com.do|dz|com.ec|ee|com.eg|es|com.et|fi|com.fj|fm|fr|ge|gg|com.gh|com.gi|gl|gm|gp|gr|com.gt|gy|com.hk|hn|hr|ht|hu|co.id|ie|co.il|im|co.in|is|it|je|com.jm|jo|co.jp|co.ke|com.kh|ki|kg|co.kr|com.kw|kz|la|li|lk|co.ls|lt|lu|lv|com.ly|co.ma|md|mn|ms|com.mt|mu|mv|mw|com.mx|com.my|co.mz|com.na|com.nf|com.ng|com.ni|nl|no|com.np|nr|nu|co.nz|com.om|com.pa|com.pe|com.ph|com.pk|pl|pn|com.pr|pt|com.py|com.qa|ro|ru|rw|com.sa|com.sb|sc|se|com.sg|sh|si|sk|com.sl|sn|sm|st|com.sv|co.th|com.tj|tk|tl|tm|to|com.tr|tt|com.tw|co.tz|com.ua|co.ug|co.uk|com.uy|co.uz|com.vc|co.ve|vg|co.vi|com.vn|vu|ws|rs|co.za|co.zm|co.zw|cat)$/))
	setRuleStyle(".entry .entry-body, .entry .entry-title", "max-width: 100%;"); 