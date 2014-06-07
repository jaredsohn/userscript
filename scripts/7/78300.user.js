// ==UserScript==
// @name           Formspring - Auto New Comment
// @namespace      Formspring - Auto New Comment
// @include        http://www.formspring.me/*
// ==/UserScript==


unsafeWindow.$("askForm").hide = function(){ document.getElementById("question").value = null; }
unsafeWindow.$("success").show = function(){ }