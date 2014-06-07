// ==UserScript==
// @name           Team Chat Test	
// @copyright      2013, thecjm55
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.9.13
// @include        http://pigskinempire.com/drafttracker.aspx
// @description    Embeds a mini chat into the homepage
// ==/UserScript==
 
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
 
// the guts of this userscript
function main() {
    var attach = document.getElementById('http://chatroll.com/embed/chat/empire-chat?name=empire-chat');   
    var chat_div = document.createElement('div');
    chat_div.innerHTML = '<iframe width="250px" height="500px" src="http://www.pigskinempire.com/chat.aspx?m=team" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" allowtransparency=true"></iframe>';
    chat_div.setAttribute('id','teamhat');
    
    $(chat_div).insertAfter(attach);
    
}
 
// load jQuery and execute the main function
addJQuery(main);