// ==UserScript==
// @name           HayabusaHashTagIcon
// @namespace      http://mstssk.blogspot.com/
// @include        *://twitter.com/*
// ==/UserScript==

var icon = '<a class="hashflag" href="http://hayabusa.jaxa.jp/"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAPcAAAD3ABM2xVRwAAAAd0SU1FB9oGDQ0fI2W+VCsAAAJDSURBVCjPjZBdSFNxGMaf/9k5O5s7OueCObaGX5UunNOmKw2zXYQRRZTUZRBFOQUvIgiEKAiK9EJbOgsC06sMvCgv0rRErVSW4YWMWBY1axp9WDY3Nz1vF+GwL+p39V48zw/eB1hDkiYrcVe4GjurDncHynfUVwMQzOZt+BM8AIiqTCxFX2Ex/BKSZLE7Sy9NZGbZWUqyEtHIBxeAa4KgAQAIgoh4fAk8r8TycgzQppYnbEZTzXVnWQ/t3jtCe/bdp6PHCquJ4AQAIhmlZW78BS4na2NT2Fpwh/ILe8iS6Qm0tp27MOYboP6HPfQ6eOr2ajItzWht9gyTu6bFAwC80XSiSatz1XGcCJLjCM48uTEXanwemr14eXw8TF/mv4Hnp6uIoGIMGfVn+6ZsNjOlp+fVEmetZVJykdVgPDLGC3ppLtRxcP5TX/fgMEadJVrnwoIdMzN+mg29Z14vHKJm0JebayJdKo9IRMEeDLRfYWv+MAF4CwANjdyEWi0XVuwEBQJgCg5TdafvbjYY9GQ0iJAkkQXfDPkG+93FEFXmhCEldTt+DCbY2ztYZMqvoFtdaF2f3SvbSkZW8h1Dsq34MeXm3/y62mG/zvl0Uo0tBREAwNUW7G9o7u3SaiWOaEXBmALx2Bz8kwckAGGdfuvvAgBQig4WW/IhO69TlpI3yLIc4xhjJMtR9sJ/sii6OP1Mp6/E54/38C/0OXlt7wpKRslW/IjWGQ4dBwCVOgP/xa5KAgBYss97zRln2gBAnbTpp8x3SffSnQqwPkQAAAAASUVORK5CYII=" style="margin-left:1px;"/></a>'
,$ = unsafeWindow.$;
$("a[href$='%23hayabusa'],a[href$='%23Hayabusa'],a[href$='%23HAYABUSA']").livequery(function(){
    $(this).after(icon);
});