// ==UserScript==
// @name       CivClicker AUTO Clicker
// @author     Deathy
// @namespace  http://
// @version    0.1
// @description  Auto Clicks - Food,Stone and Wood
// @match      http://dhmholley.co.uk/civclicker.html
// @copyright  2014+, Deathy
// ==/UserScript==

//Ask if the user wants to cheat - 
var answer = prompt("Do you wish to enable auto clicker", "Yes or No");
//If yes continue.
if(answer.toLowerCase() == "yes")
{
    alert("Auto Clicker enabled!");
    //Continuously loop
    setInterval(function() {
        //Increase of the resources.
        increment(food);
        increment(wood);
        increment(stone);        
    },1); //loops ever 0.001 second.
}
//Basicly Done. (Auto Clicker)