// ==UserScript==
// @name          mma restyle
// @namespace     http://userscripts.org/users/60108
// @description	  
// @include       http://*reddit.com/r/MMA/*
// @include       http://*reddit.com/r/MMA/
// @include       http://*reddit.com/r/MMA
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// // ==/UserScript==

css = "";
css += "#header {\n";
css += "    background-color: #646464;\n";
css += "    border-bottom: 1px solid #646464;\n";
css += "}\n";
css += "\n";
css += ".side {\n";
css += "    padding: 10px 10px 0 20px;\n";
css += "    border-top-left-radius: 15px;";
css += "    background-color: #FAFAFA;";
css += "}\n";
css += "\n";
css += "#sr-header-area {";
css += "    margin-bottom: 15px;";
css ++ "}";
css += ".content {";
css += "    background-color: white;";
css += "    border-right: 1px solid #646464;";
css += "    border-top: 1px solid #646464;";
css += "    border-top-right-radius: 15px;";
css += "    margin: -1px 345px 0 0;";
css += "    padding-left: 5px;";
css += "    padding-top: 15px;";
css += "    background-color: #FAFAFA;";
css += "}";
css += "";
css += "body {";
css += "    background-color: #646464;";
css += "}";
css += "";
css += ".keyHighlight {";
css += "    margin-right: 15px;";
css += "}";
css += ".tabmenu li a {";
css += "    border-top-left-radius: 5px;";
css += "    border-top-right-radius: 5px;";
css += "}";

$("<style type='text/css'>" + css + "</style>").appendTo("head");





