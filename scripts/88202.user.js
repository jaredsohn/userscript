// ==UserScript==
// @name           Absalon fix banner
// @description    Fix absalon.ku.dk banner scaling
// @author         Jacob Wejendorp
// @include        https://absalon.ku.dk/*
// @version        1.0
// ==/UserScript==


form = document.getElementById('form');
links = form.children.item(5);
links.style.background = "#900";
links.style.padding = "3px";
links.style.margin = "-3px";