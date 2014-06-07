// ==UserScript==
// @name           localized stackoverflow timestamps
// @namespace      stackoverflow
// @description    Converts relative timestamps on StackOverflow to absolute, localized timestamps. See more documentation at: http://meta.stackoverflow.com/questions/12635/
// @include       http://stackoverflow.com/*
// @include       http://meta.stackoverflow.com/*
// @include       http://superuser.com/*
// @include       http://meta.superuser.com/*
// @include       http://serverfault.com/*
// @include       http://meta.serverfault.com/*
// @include       http://askubuntu.com/*
// @include       http://meta.askubuntu.com/*
// @include       http://answers.onstartups.com/*
// @include       http://meta.answers.onstartups.com/*
// @include       http://nothingtoinstall.com/*
// @include       http://meta.nothingtoinstall.com/*
// @include       http://seasonedadvice.com/*
// @include       http://meta.seasonedadvice.com/*
// @include       http://crossvalidated.com/*
// @include       http://askdifferent.com/*
// @include       http://meta.crossvalidated.com/*
// @include       http://stackapps.com/*
// @include       http://*.stackexchange.com/*
// @exclude       http://chat.stackexchange.com/*
// @exclude       http://api.*.stackexchange.com/*
// @exclude       http://data.stackexchange.com/*
// @exclude       http://area51.stackexchange.com/*
// ==/UserScript==

(function() {
  
  function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
  }; 
  
  with_jquery(function($) {
    //NOTE: Could be more efficient.  Need Jeff to fix this bug first:
    //  http://meta.stackoverflow.com/questions/12640/
    $("span.relativetime").each(updateTS);
    $("span.comment-date>span").each(updateTS);
    
    //pads number with leading 0 if needed
    function padNum(num) { return num < 10 ? "0"+num : num; }
    
    function updateTS() {
      var utcTimestamp = $(this).attr("title");
      var matches = utcTimestamp.match(/^([\d]{4})-([\d]{2})-([\d]{2}) ([\d]{2}):([\d]{2}):([\d]{2}) ?(?:Z|UTC|GMT(?:[+\-]00:?00))$/);
      
      if(matches == null)
        return;
      
      var date = new Date(
        Date.UTC(
          parseInt(matches[1], 10),
          parseInt(matches[2], 10) - 1,
          parseInt(matches[3], 10),
          parseInt(matches[4], 10),
          parseInt(matches[5], 10),
          parseInt(matches[6], 10)
        )
      );
      
      var newTimestamp = date.getFullYear() + "-"
                       + padNum(date.getMonth() + 1) + "-"
                       + padNum(date.getDate()) + " "
                       + padNum(date.getHours()) + ":"
                       + padNum(date.getMinutes()) + ":"
                       + padNum(date.getSeconds());
      
      
      $(this).attr("title", newTimestamp);
      if($(this).text().search(/(?:min|sec)s? ago/) == -1)
        $(this).text(newTimestamp);
    };
    
  });
})();
