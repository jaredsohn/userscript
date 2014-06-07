// ==UserScript==
// @name        Yahoo Groups
// @namespace   http://tech.dir.groups.yahoo.com/group/dita-users/messages
// @description Remove third column
// @include     http://tech.dir.groups.yahoo.com/group/dita-users/messages*
// @include     http://tech.dir.groups.yahoo.com/group/dita-users/message/*
// @version     1
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.js
// ==/UserScript==                                                      

this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function(){

  //$('td').remove();
  $(this).find("#yuhead-bd").remove();
  $(this).find("#ygrp-sponsored-links").parent().parent().remove();
});

