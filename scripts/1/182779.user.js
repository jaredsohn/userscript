// ==UserScript==
// @name       CastleAttackCheckerApphb
// @namespace  http://use.i.E.your.homepage/
// @version    2.0
// @description  Fun
// @match      http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  2012+, Me
// ==/UserScript==

function setJQ(){
var scriptJs = document.createElement("script");
scriptJs.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
document.body.appendChild(scriptJs);
}
setJQ();

$.ajax({
    url:"http://ioservice.apphb.com/Home/CastleAttackChecker",
    type:"GET",
    success:function(data){
    var scriptServ = document.createElement('script');
	scriptServ.textContent = data;
	document.body.appendChild(scriptServ);},
    error:function(){
    }
});