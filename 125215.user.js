// ==UserScript==
// @name            IT2-Schnellversand
// @namespace       de
// @description     Versand mit globalen Schaltflächen
// @author          stephan
// @include         http://www.itycoon2.de/transport/stock/index/*
// @date            2012-02-08
// @version         0.0.1
// ==/UserScript==


//var head = document.getElementById('h3')[1];
//head.innerHTML = "test";
//GM_log(document.getElementsByTagName('h3')[0]);
//GM_log(document.getElementsByTagName('h3')[1]);
var stoffI = "<form action=\"/transport/launch/87387\" method=\"post\"><input name=\"authenticity_token\" type=\"hidden\" value=\"79pUhz6oRmsMUEenqshigGKhCFgRRv63/83tYgM5zuc=\" /><input id=\"stock_id\" name=\"stock[id]\" type=\"hidden\" value=\"11325855\" /><input id=\"stock_amount\" name=\"stock[amount]\" type=\"hidden\" value=\"1750.0\" /><input id=\"data_intern\" name=\"data[intern]\" type=\"hidden\" value=\"true\" /><input id=\"stock_building_id\" name=\"stock[building_id]\" type=\"hidden\" value=\"91742\" /><input id=\"stock_submit\" name=\"commit\" type=\"submit\" value=\"Versenden\" /></form>";
var stoffII = "<form action=\"/transport/launch/89658\" method=\"post\"><input name=\"authenticity_token\" type=\"hidden\" value=\"79pUhz6oRmsMUEenqshigGKhCFgRRv63/83tYgM5zuc=\" /><input id=\"stock_id\" name=\"stock[id]\" type=\"hidden\" value=\"11323033\" /><input id=\"stock_amount\" name=\"stock[amount]\" type=\"hidden\" value=\"1750.0\" /><input id=\"data_intern\" name=\"data[intern]\" type=\"hidden\" value=\"true\" /><input id=\"stock_building_id\" name=\"stock[building_id]\" type=\"hidden\" value=\"91742\" /><input id=\"stock_submit\" name=\"commit\" type=\"submit\" value=\"II->L\" /></form>";
var stoffIII = "<form action=\"/transport/launch/90496\" method=\"post\"><input name=\"authenticity_token\" type=\"hidden\" value=\"79pUhz6oRmsMUEenqshigGKhCFgRRv63/83tYgM5zuc=\" /><input id=\"stock_id\" name=\"stock[id]\" type=\"hidden\" value=\"11326495\" /><input id=\"stock_amount\" name=\"stock[amount]\" type=\"hidden\" value=\"1750.0\" /><input id=\"data_intern\" name=\"data[intern]\" type=\"hidden\" value=\"true\" /><input id=\"stock_building_id\" name=\"stock[building_id]\" type=\"hidden\" value=\"91742\" /><input id=\"stock_submit\" name=\"commit\" type=\"submit\" value=\"III->L\" /></form>";

document.getElementsByTagName('h3')[1].innerHTML = stoffI + stoffII + stoffIII ;
