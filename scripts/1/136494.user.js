// ==UserScript==
// @name        NoLike for douban
// @author   jnozsc
// @description Remove Like from douban timeline
// @include     http://www.douban.com/*
// @match       http://www.douban.com/*
// @version     1.4
// ==/UserScript==

function main($) {
  'use strict';
  jQuery.noConflict();

  // for old version
  var tlArray = $("#miniblog > ul >li").toArray();
  for(var i = 0;i < tlArray.length;i++){
    if((tlArray[i].className =='mbtr') && ((tlArray[i].innerHTML.indexOf("喜欢 ")!=-1) || (tlArray[i].innerHTML.indexOf("谈论 ")!=-1))){
      $(tlArray[i-1]).hide();
      $(tlArray[i]).hide();
    }
  }
  // for new version
  $('div[data-target-type="ilmen"]').hide();


}

function thirdParty($) {
  'use strict';
  jQuery.noConflict();

  // Put third-party non-jQuery functions here.  They'll be wrapped into the 
  // jQuery prototype in a moment.
  var sayHello = function (who) {
      alert('Hello ' + who + '!');
    }

  jQuery.extend({
    // If you have any non-jQuery functions, they need to be wrapped in here.
    sayHellow: function (who) {
      return sayHello('World');
    }

  });

  // Put third-party jQuery plugins, extensions, etc. here
}

!
function loader(i) {
  var script, requires = ['http://img3.douban.com/js/packed_jquery.min6301986802.js'],
    head = document.getElementsByTagName('head')[0],
    makeScript = function () {
      script = document.createElement('script');
      script.type = 'text/javascript';
    },
    loadLocal = function (fn) {
      makeScript();
      script.textContent = '(' + fn.toString() + ')(jQuery);';
      head.appendChild(script);
    };
  (function (i) {
    makeScript();
    script.src = requires[i];
    script.addEventListener('load', function () {
      ++i !== requires.length ? loader(i) : (loadLocal(thirdParty), loadLocal(main));
    }, true);
    head.appendChild(script);
  })(i || 0);
}();