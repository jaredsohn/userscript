// ==UserScript==
// @name        to show yyyy-mm-dd at stackoverflow
// @include     http://stackoverflow.com/*
// @include     http://serverfault.com/*
// @include     http://superuser.com/*
// @include     http://meta.stackoverflow.com/*
// @include     http://meta.serverfault.com/*
// @include     http://meta.superuser.com/*
// @include     http://*.stackexchange.com/*
// @include     http://askubuntu.com/*
// @include     http://meta.askubuntu.com/*
// @include     http://answers.onstartups.com/*
// @include     http://meta.answers.onstartups.com/*
// @include     http://mathoverflow.net/*
// @include     http://area51.stackexchange.com/proposals/*
// ==/UserScript==
(function() {
  var adjustToView = function(input) {
    // you can custom here.
    return input.split(' ')[0];
  };

  var relativeToAbsolute = function(elements) {
    for(i=0; i<elements.length; i++) {
      var target = elements[i];
      var absolutetime = target.title;
      target.innerHTML = adjustToView(absolutetime);
    }
  };
  
  relativeToAbsolute(document.getElementsByClassName('relativetime'));
  relativeToAbsolute(document.getElementsByClassName('relativetime-clean'));
})();
