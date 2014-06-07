// ==UserScript==
// @name        Zygote Body Nude Hack
// @namespace   zygoteBodyNudeHack
// @include     http://www.zygotebody.com/*
// @include     https://www.zygotebody.com/*
// @include     http://zygotebody.com/*
// @include     https://zygotebody.com/*
// @version     1
// ==/UserScript==

MODELS.__defineSetter__("adult_female.obj", function(newVal){this.femaleData = newVal; delete this.femaleData.urls['d60063ae.adult_female.utf8'];});

MODELS.__defineGetter__("adult_female.obj", function(){return this.femaleData;});

MODELS.__defineSetter__("adult_male.obj", function(newVal){this.maleData = newVal; delete this.maleData.urls['3c43a14d.adult_male.utf8'];});

MODELS.__defineGetter__("adult_male.obj", function(){return this.maleData;});
