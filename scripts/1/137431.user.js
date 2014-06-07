// ==UserScript==
// @name nCore || dereferer eltávolítása
// @namespace created by gala 
// @description Ez eltávolítja a url tagokból a http://dereferer.org/? részt! Akit ez mindig is zavart azt most már nem fogja. A scriptet csak saját felelősségre használjátok
// @include http://ncore.cc/*
// @include http://ncore.nu/*
// @include https://ncore.cc/*
// @include https://ncore.nu/*
// ==/UserScript==
$("a.bb-url").each(function() {
var id = $(this).attr("href").replace("http://dereferer.org/?", "");
$(this).attr("href", id);
});
