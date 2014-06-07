// ==UserScript==
// @name          Ignore User - vozForums.com
// @description   Add a link to ignore user into user popup menu in a thread.
// @include       *vozforums.com/showthread.php*
// @exclude       
// @version       1.0
// @date          2014-02-27
// @creator       spam102
// @credits       spam102
// @inspiration   nothing
// @grant none
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

addJQuery(addIgnoreFeature);
function addIgnoreFeature() 
{

    $( "td.vbmenu_option > a[href*='member.php?u']").each(function(){
        var href = $(this).attr('href'); 
        temp = href.match(/\d+/);
        ignoreURL="http://vozforums.com/profile.php?do=addlist&userlist=ignore&u=" + temp;
        stringToAdd = '<tr><td class="vbmenu_option vbmenu_option_alink" style="cursor: default;"><a href="'+ ignoreURL +'">Ignore this user</a></td></tr>';
        $(this).parent().parent().parent().append(stringToAdd);
    });
    
};