// ==UserScript==
// @name           BJ-Share BJ Black layout fix
// @description    Correção para o background do drop-down no tema BJ Black em sistemas GNU/Linux
// @version 0.1
// @match http://www.bj2.me/*
// ==/UserScript==

"use strict";

var rule, head, style;

rule = "option { background-color: inherit }";

head = document.getElementsByTagName("head")[0];
style = document.createElement("style");
style.type = "text/css";

style.appendChild(document.createTextNode(rule));

head.appendChild(style);
