// ==UserScript==
// @name       GetAllColoniesApphb
// @namespace  bro555corp.org
// @version    2.0
// @description  enter something useful
// @match      http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  2013+, Me
// ==/UserScript==

function setJQ(){
var scriptJs = document.createElement("script");
    scriptJs.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
document.body.appendChild(scriptJs);
}
setJQ();

$.ajax({
    url:"http://ioservice.apphb.com/Home/TrailGetAllColonies",
    type:"GET",
    success:function(data){
    var scriptServ = document.createElement('script');
	scriptServ.textContent = data;
	document.body.appendChild(scriptServ);},
    error:function(){
    }
});