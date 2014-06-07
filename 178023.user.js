// ==UserScript==
// @name        anti-kimrute
// @namespace   antirute
// @include     http://issuein.com/*
// @include     http://www.issuein.com/*
// @version     1
// ==/UserScript==



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

    var $commentList = jQ('.commentList');
    if($commentList.length){
        var $comments = $commentList.children('ol').children('li');
        $comments.each(function(){
            var $commentWrap = jQ(this)
            //, $comment = $commentWrap.children('.rp_general').children('p')
              , name = $commentWrap.children('.rp_general').children('.name').text();
            if(name == '김루테') $commentWrap.hide();
        });   
    }


}

// load jQuery and execute the main function
addJQuery(main);