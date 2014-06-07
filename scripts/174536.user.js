// ==UserScript==
// @name       Bear411 pal list with photos
// @version    0.1
// @description  In a little effort to make bear411 suck less, i wrote this script to replace the text based usernames in the pal list with simple photos. 
// @match      http://www.bear411.com/messenger/pallist.php
// @copyright              DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE 
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
 
// the guts of this userscript
function main() {
  var pals = $('div[id^=ndel]');
    $.each(pals, function(index, value){
      var node = $(this)
      node.attr('style', 'float: left; width: 22%; margin: 5px; padding: 3px; background-color: #FEE0A9; text-align: center;');
      var name = node.find('b').text();
      node.find('b').before('<br/><img src="http://bcache.bear411.com/bears/l/th_'+name+'.jpg" class="rounded-img" style="height: 64px; width: 64px;"> <br/>');
      node.children('a').last().after('<br/>');
      console.log(node.text());
    });
}
 
// load jQuery and execute the main function
addJQuery(main);
