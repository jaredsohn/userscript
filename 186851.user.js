// ==UserScript==
// @name       Dota-Trade. List inventory items and sort them by rank.
// @namespace  bolt
// @version    1.2
// @description  Creates a list below the site menu which shows your items and their rarity sorted by rank. Might show you your best common and your worst mythical:D Note that this was my first experience writing something in JS from scrath, so if you see any mistakes or you know a better way to do some of this stuff PLEASE send me a message.
// @include	   http://dota-trade.com/inventory 
// @include    http://dota-trade.com/users/*
// @copyright  2013, objv
// ==/UserScript==
var path = location.href.toString();
if (path == 'http://dota-trade.com/inventory')
{
	var rankclass = document.getElementsByClassName('rank');
	var nameclass = document.getElementsByClassName('name');
	var rarityclass = document.getElementsByClassName('r');
} else 
{
    var rankclass = inventory.getElementsByClassName('rank');
	var nameclass = inventory.getElementsByClassName('name');
	var rarityclass = inventory.getElementsByClassName('r');
}
var i = 0;
var so;
var div = document.getElementById('menu');
var itemarray = new Array();
var list = '';
function compare(a,b) 
{
  return b[0] - a[0];
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#ranklist {font-size: 12px; text-shadow: 1px 1px 1px black ! important; background-color:transparent; color:lightgray ! important; }');
addGlobalStyle('#ls { width: 27% ! important;}');
addGlobalStyle('#rs { width: 73% ! important;}');
addGlobalStyle('#wrap { width: 90% ! important;}');
addGlobalStyle('#ranklist a {font-size:12px ! important; display:inline ! important; height:auto ! important; line-height:normal ! important; padding:0px 0px 0px 0px ! important; background: transparent ! important; background-image:none ! important; background-image:none ! important; background-image:none ! important; background-image:none ! important; background-image:none ! important; border-top:0px ! important; border-bottom:0px ! important; color:lightgrey ! important; position:relative ! important; text-transform:none ! important; text-decoration:none ! important;}');
addGlobalStyle('#ranklist a:hover{color:transparent; background:transparent; background-image:none; background-image:none; background-image:none; background-image:none; background-image:none; border-left-color:#606060; border-top-color:#606060;}');
function getrankname()
{
	while(i<rankclass.length)
    {
        itemarray[i] = new Array();
        itemarray[i].push(rankclass[i].innerText);
        itemarray[i][0] = itemarray[i][0].substring(0, itemarray[i][0].length - 6);
        itemarray[i].push(nameclass[i].innerHTML);
        itemarray[i].push(rarityclass[i].className);
        i++;
    }
    rankclass.length = 0;
    nameclass.length = 0;
    rarityclass.length = 0;
    i=0;
    itemarray.sort(compare);
    while(i<itemarray.length)
    {
    so = ' <span class="' + itemarray[i][2] + '">&#9724; </span>';
	list = list + so + itemarray[i][0] + ' ' + itemarray[i][1] + '<br>';
    i++;
    }
    div.innerHTML = div.innerHTML + '<p id="ranklist">' + list + '</p>';
}
if (rankclass.length == nameclass.length && nameclass.length == rarityclass.length) getrankname(); //ABORT if one of the items doesn't have rank/name/rarity, just a precaution so things wouldn't get mixed up.
