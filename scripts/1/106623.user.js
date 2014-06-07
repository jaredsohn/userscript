// --------------------------------------------------------------------
//
// Redirection
// Copyright (c) 2010-2011, JellyTime
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Redirection
// @description   Script pour rediriger depuis la dial vers ma propre box
// @include       http://goldensunworld.free.fr/v3/dialbox_pop.php*
// @include       http://goldensunworld.free.fr/v3/dialbox_pop.php?dialbox=send&size=3
// @include       http://goldensunworld.free.fr/v3/dialbox_pop.php?dialbox&size=3
// @author        Krabby
// @contributor   Ta reum
// ==/UserScript==



function redir () {
window.location.replace("http://kyav.legtux.org/GSW/dialbox.html");
clearInterval (jvcid) 
}

jvcid = setInterval (redir,0)