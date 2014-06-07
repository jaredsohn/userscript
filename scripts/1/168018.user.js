// ==UserScript==
// @id             hackaday.com-55b5e6f0-c45b-4453-9dc8-c1c1bf655428@scriptish
// @name           hackaday_full
// @version        1.0
// @namespace      
// @author         johannes
// @description    Loads full post on hackaday
// @include        http://hackaday.com/
// @include        http://hackaday.com/page/*
// @run-at         document-end
// ==/UserScript==

//jQuery loader from Erik Vergobbi Vold & Tyler G. Hicks-Wright (http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script)
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}


// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.
  jQ(".post .entry-content").each(function(index,value){
    more = jQ(this).find('a.read_more').attr('href');
    jQ(this).load(more+' .entry-content');
  });
}

// load jQuery and execute the main function
addJQuery(main);

