// ==UserScript==
// @name           Plemiona--BBCodes
// @namespace      http://www.tkdmatze.de/
// @description    Spolszczenie skryptu Staemme--BBCodes
// @include        *
// ==/UserScript==


var dorf_src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAADAFBMVEX///8AAAD/y5nMmGZm'+
'MgCZZTMyAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABX'+
'cQ9bAAABAHRSTlMA////////////////////////////////////////////////////////'+
'////////////////////////////////////////////////////////////////////////'+
'////////////////////////////////////////////////////////////////////////'+
'////////////////////////////////////////////////////////////////////////'+
'////////////////////////////////////////////////////////////////////Cpf0'+
'PAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAGxJREFUeJy10EESwCAIA0AGEv7/5GIUa6fTY9HT'+
'GkU1+608VORh4e4lVbhzPhFjPPZS0VaPGlzYWkFXUgdwNhvE1Xz3Uo84dCD2LWuCpiRgN9LY'+
'mP2SfVMgk6h9tXYg3ygemHk8U0dVXPj58xcpJgNE9ssL3AAAAABJRU5ErkJggg==';

var fett_src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAMAAABVlYYBAAADAFBMVEUAAAD///8AAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABn'+
'duxjAAABAHRSTlP/AP//////////////////////////////////////////////////////'+
'////////////////////////////////////////////////////////////////////////'+
'////////////////////////////////////////////////////////////////////////'+
'////////////////////////////////////////////////////////////////////////'+
'////////////////////////////////////////////////////////////////////rTvm'+
'KwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAACRJREFUeJxjYMQGGGgqygAFaGrBIghh8kRpYS4O'+
'95LgY+qLAgA1SQFqzJ2p+AAAAABJRU5ErkJggg==';



var kursiv_src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAMAAABVlYYBAAADAFBMVEWAgIAAAAD///8AAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADD'+
''+
'wkTZAAABAHRSTlP//wD/////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////Zg+Q'+
''+
'zwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAADpJREFUeJxjYMIGGGguyggCmGoZGRkw1TLAVaKa'+
''+
'wIApiqwUIYqsFC6KohQuiqIUKsqI7FgmeoQOYVEAsMADIlbhxh4AAAAASUVORK5CYII='+
'';

var unter_src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAMAAABVlYYBAAADAFBMVEWAgIAAAAD///8AAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADD'+
''+
'wkTZAAABAHRSTlP//wD/////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////Zg+Q'+
''+
'zwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAC9JREFUeJxjYMIGGGgqyggEEAJFLZgPFxwoUQYm'+
''+
'BgxRsGPhggT9xojpN6xqKREFAKdqAxNA+nhQAAAAAElFTkSuQmCC'+
'';



var bild_src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAMAAABVlYYBAAADAFBMVEXAwMCAgACAgID//wD/'+
''+
'//8AAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAd'+
''+
'5jX0AAABAHRSTlP///////8A////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////INhT'+
''+
'oQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAFdJREFUeJyl0NEKwCAIQFFz3f3/J5eOxDAGY9bT'+
''+
'4VKR3KeRj8o+S6+eVugCBe2lpTVqa1pbO6G2zzG5hcMbUJ0XsbeGigi5nWjjHOql78mh3gW/'+
''+
'/s6/Xx/nVgf4h9lWpwAAAABJRU5ErkJggg=='+
'';


var link_src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAMAAABVlYYBAAADAFBMVEUAAICQnbIAgIDB0u7A'+
''+
'wMCAgIAAgAD///8AAP8AAAD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABe'+
''+
'+MyDAAABAHRSTlP/////////////AP//////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////ZfPF'+
''+
'iwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAHpJREFUeJyF0AkOwyAMBEBD1sfy/wfX0FRAlKQr'+
''+
'gcSIw0baXeRFdeSiqhXHYdxUHV4sw0VVwxEZM100UIqYxdw8dByXKrt+2SJ27Xea1U3l1JDl'+
''+
'tcZUZqRPs4tcI2tmDnB2TPCXwac6lQBydv7Z227vTe7P7zU8/PpVP9E4DfWjvfTcAAAAAElF'+
''+
'TkSuQmCC'+
'';


var quote_src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAMAAABVlYYBAAADAFBMVEX///8AAAD///8AAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAk'+
''+
'n+yFAAABAHRSTlMA////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////Cpf0'+
''+
'PAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAEhJREFUeJylkFEKACAIQ9fuf+hSNBUKkob+PKZM'+
''+
'gZ5GlVOSsM4Umw8mrw2z0Kt3Fd68spiNva/euC1o3KABnVIlgdMfjj/70wQTpwEwX2aO3QAA'+
''+
'AABJRU5ErkJggg=='+
'';

var spieler_src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAADAFBMVEX///9/XCRGRkZIR0ZN'+
''+
'TU1KTlBIVV9WT0FUUk1TU1NRVVlUWVxaWlpbYWZoXUljY2NsbGxpbHBzc3N8enZ8fHxUepVv'+
''+
'f4wsjtgukNkwj9g3ldsokuQim/01meQ0nvI8pPFcgp5cl7Rshph2h5Vri6NwmrF5o6xFmtpU'+
''+
'lsVVntREn+FUoNdKo+VFp/FYqeZSrPNkn8tmo9FxqtVgrOZos+Zhu/14uul0vvR8we58x/uO'+
''+
'WQCSXQCVYgCZZQCcaQGcbAuYahOgbQGlcgClcwypdACpcw2tegCkdRGrehKqfh2xfQC9eQCi'+
''+
'eCanfCmrfSSifTOleziZfUWJfmeCfnbIegHVfQCvhR+0gQC5iAu0hxm8kBmvhiOuiTe6iym7'+
''+
'jTS+lia+mjmSiHOWjHijilqqjla0kEm6mVemj2GokWe8oGDBlB3YhwTWixPekAfdmRjKjiXG'+
''+
'myzHnjLInzPPmT/QljjRpB/HoDXFoznLojLKojjPqDbTqjXTrDjkhwDilAjtmxT/khzhnS7/'+
''+
'lSb8mTTjpBzlpibiozvuvjX6pz3Lm0rGmVDQmkPLq0bEoFrQoErIpmTGqHrYp2vVt33inVXl'+
''+
'qEf8pUX4rVr9s0v/uFL3tGr+zQX4xRT/0gn+0hL4zCn+1yX+2Tj/4yv/4T3hwUPv01D/xF37'+
''+
'2kv+31Dn1Gf/z2n/2HH+5Ub+5Vn+6Gb/6nj/8W7/83qCgoKEiIyIhoSKioqBkZ2NkZSUkY2S'+
''+
'kpKcmZGcnJyPn62Un6iZoKaTqbq/qYm0rJiioqKqqqquta+ns7K7tam1ubmLsc2Xs8iFveem'+
''+
'ucWzvMK8ybaGw+qFx/qay+6XzPua0PumxdWhze6m1vy82+m13Pyr4f+64/7DqILLsYHFs5fR'+
''+
'uo3UvpPBtaHPxo/WwZrZw5vGyb/Zx6Xm0qni07jn2b7/94n+9pT//6vDxMXR0tLS2dTE1uPC'+
''+
'3vTW3OHG5/3P9f/T7P3W9v7n28bt5dHy4sf26tT779rh7vjp9/z48ub+++v1/P79/f5WTj9V'+
''+
'PkyqAAABAHRSTlMA////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////////'+
''+
'////////////////////////////////////////////////////////////////////Cpf0'+
''+
'PAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAQlJREFUeJxjYMAPDh08iC60keeho62dD7LQLpbf'+
''+
'1uGVRRU1NkiCPN987dzcosoqqvzhYjs47tg4OrlbWVtbhcAFt/Bl2to5hj3fsH55NkIlUNDW'+
''+
'dsW6tWvm5CKZOd3bbsmaNcvmzA1FCG4JyJm3aNH8WXNW5yBbH5I9f/78BatDkcV+/T1dt3r1'+
''+
'+jWKCDH+tz/NpO6HhobGyKrD/fP2w9UrHySuay+9ZHFdCqbwwyeJDx+uSN1Y13T94hWoK5ne'+
''+
'SV25cePDp8NTmy5cuQZT+EHqw40bNy5aTmu4cgOqXeS83rkPH65fuHChafINk9NQMwWkTK59'+
''+
'AqltOqmJFJxiGrrysrKyOvvAgQwAJ7hxAigGkzQAAAAASUVORK5CYII='+
'';


var stamm_src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAADAFBMVEX///8AAACYMgD//svM'+
''+
'AAD/y5kiIiLd3d27u7tVVVUAEL8AgHcANGAA8asAyaAAAxAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
''+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
 
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
 
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
 
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADi'+
 
'kXA+AAABAHRSTlMA////////////////////////////////////////////////////////'+
 
'////////////////////////////////////////////////////////////////////////'+
 
'////////////////////////////////////////////////////////////////////////'+
 
'////////////////////////////////////////////////////////////////////////'+
'////////////////////////////////////////////////////////////////////Cpf0'+
'PAAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAIZJREFUeJx9kAsOBCEIQydQQO9/4aWImp1Ntokk'+
'Piu/5/knoV5EFYCqfDEShuNOpFfSzNfVKCyvtEOkqBVURNDVDL4yjoTVEp+cVoGOCLNieQIb'+
'Tl7LOTac4bbVMLt07+/GTFLVX7D75O8FZ8w90mqawV3O7KfOgbSCPIPf5TEdyH/2fDf/AU8r'+
'BHM72yeLAAAAAElFTkSuQmCC'+
'';


var sep_src = 'data:image/png;base64,'+
'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAUCAMAAACZDLzqAAAAAXNSR0IArs4c6QAAAARnQU1B'+
'AACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAA'+
'AwBQTFRFxcK439/fAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAbKhb4gAAABBJREFUGFdjYGRkYATjgacAG9oAZS554LsAAAAA'+
'SUVORK5CYII='+
'';


var sprache;
var FETT=0,KURSIV=1,UNTERSTRICHEN=2,BILD=3,LINK=4,ZITAT=5,DORF=6,SPIELER=7,STAMM=8,SCHRIFT_GR=9,SCHRIFT_FARB=10;
var deutsch = new Array("Fett","Kursiv","Unterstrichen","Bild","Link","Zitat","Dorf","Spieler","Stamm","Schriftgr&ouml;sse","Schriftfarbe");
var neederlands = new Array("Vet","Cursief","Onderstreept","plaatje","Link","Citeren","Dorp","Speler","Stam","Sizes","Colors");
var english = new Array("Fat","Italic","Underlined","Picture","Link","Quote","Village","Player","Ally","Sizes","Colors");
var turk= new Array("Kalin","Egik","Altcizgi","Resim","Link","Alinti","K&ouml;y","Oyuncu","Ittifak","Boyut","Renk");
var polish = new Array("Pogrubienie","Kursywa","Podkreslenie","Obrazek","Link","Cytuj","Wioska","Gracz","Plemie","Wielkosc","Kolory");



function BBCode(id,src,alt,pre,after){

//eigenschaften
this.id=id;
this.src=src;
this.alt=alt;
this.pre=pre;
this.after=after;

//methoden
this.showBB=showBB;
this.addAction=addAction;
this.klick=klick;

};

function showBB(){
	var zeile =   '<img id="'+this.id+'" src="'+this.src+'" alt="'+this.alt+'"></img>';
   return zeile;
};

function addAction(){
document.getElementById(''+this.id).addEventListener('click', buttonClick, false);
document.getElementById(''+this.id).addEventListener('mouseover', showDesc, false);
document.getElementById(''+this.id).addEventListener('mouseout', clearDesc, false);
};

function klick(e){
if (e.target.id==this.id) insert(this.pre,this.after);
};






if ( rightpage() )
{

kasten=getTextArea();


if (kasten){
//bilder 



var butt = document.createElement("DIV");
var BBCodes = new Array(); 
BBCodes[0] = new BBCode('fett',fett_src,sprache[FETT],'[b]','[/b]');
BBCodes[BBCodes.length] = new BBCode('kursiv',kursiv_src,sprache[KURSIV],'[i]','[/i]');
BBCodes[BBCodes.length] = new BBCode('unterstrichen',unter_src,sprache[UNTERSTRICHEN],'[u]','[/u]');
BBCodes[BBCodes.length] = new BBCode('sep',sep_src,' ','','');
BBCodes[BBCodes.length] = new BBCode('bild',bild_src,sprache[BILD],'[img]','[/img]');
BBCodes[BBCodes.length] = new BBCode('link',link_src,sprache[LINK],'[url]','[/url]');
BBCodes[BBCodes.length] = new BBCode('quote',quote_src,sprache[ZITAT],'[quote]','[/quote]');
BBCodes[BBCodes.length] = new BBCode('sep',sep_src,' ','','');
BBCodes[BBCodes.length] = new BBCode('dorf',dorf_src,sprache[DORF],'[village](',')[/village]');
BBCodes[BBCodes.length] = new BBCode('spieler',spieler_src,sprache[SPIELER],'[player]','[/player]');
BBCodes[BBCodes.length] = new BBCode('stamm',stamm_src,sprache[STAMM],'[ally]','[/ally]');
BBCodes[BBCodes.length] = new BBCode('sep',sep_src,' ','','');


butt.innerHTML = '<div>';

for (var i=0; i< BBCodes.length;i++){
butt.innerHTML += BBCodes[i].showBB();

}


butt.innerHTML += '<select name="Kolor" id="farbe" alt="'+sprache[SCHRIFT_FARB]+'">'+
 '<option style="color: black; background-color: #FAFAFA" value="black">Standard</option>'+
 '<option style="color: white; background-color: #FAFAFA" value="white"  >Bialy</option>'+
 '<option style="color: yellow; background-color: #FAFAFA" value="yellow"  >Zolty</option>'+
 '<option style="color: orange; background-color: #FAFAFA" value="orange"  >Pomaranczowy</option>'+
 '<option style="color: red; background-color: #FAFAFA" value="red"  >Czerwony</option>'+
 '<option style="color: indigo; background-color: #FAFAFA" value="indigo"  >Indygo</option>'+
 '<option style="color: violet; background-color: #FAFAFA" value="violet"  >Fioletowy</option>'+
 '<option style="color: blue; background-color: #FAFAFA" value="blue"  >Niebieski</option>'+
 '<option style="color: darkblue; background-color: #FAFAFA" value="darkblue"  >Ciemno niebieski</option>'+
 '<option style="color: cyan; background-color: #FAFAFA" value="cyan"  >Cyan</option>'+
 '<option style="color: green; background-color: #FAFAFA" value="green"  >Zielony</option>'+
 '<option style="color: olive; background-color: #FAFAFA" value="olive"  >Oliwkowy</option>'+
 '<option style="color: brown; background-color: #FAFAFA" value="brown"  >Brazowy</option>'+
 '</select>';

butt.innerHTML += '<select name="Wielkosc" id="gross" alt="'+sprache[SCHRIFT_GR]+'">'+
 '<option value="7"  >Malutki</option>'+
 '<option value="9"  >Maly</option>'+
 '<option value="12" selected="selected"  >Normal</option>'+
 '<option value="18"  >Duzy</option>'+
 '<option value="24"  >Olbrzymi</option>'+
 '</select>';

butt.innerHTML += '<input type="text" id="bbdesc" disabled size="10" style="color:#000000; font-weight:bold"></input>';


butt.innerHTML += '</div>';

kasten.parentNode.insertBefore(butt,kasten);

for (var i=0; i< BBCodes.length;i++){
BBCodes[i].addAction();
}


document.getElementById('farbe').addEventListener('change', farbeChange, false);
document.getElementById('farbe').addEventListener('mouseover', showDesc, false);
document.getElementById('farbe').addEventListener('mouseout', clearDesc, false);
document.getElementById('gross').addEventListener('change', grossChange, false);
document.getElementById('gross').addEventListener('mouseover', showDesc, false);
document.getElementById('gross').addEventListener('mouseout', clearDesc, false);
}



}

function buttonClick(e) {
for (var i=0; i< BBCodes.length;i++){
BBCodes[i].klick(e);
}
}

function showDesc(e) {
if (e.target.alt)document.getElementById('bbdesc').value=e.target.alt;
else document.getElementById('bbdesc').value=e.target.name;

}


function clearDesc(e) {
document.getElementById('bbdesc').value='';
}


function rightpage(){
	if (  ( document.location.href.match(/die-staemme.de/)) && 
    	  (!document.location.href.match(/forum.die-staemme.de/))){
		sprache = deutsch;
		return true;
	}

	if (  ( document.location.href.match(/tribalwars.nl/)) && 
    	  (!document.location.href.match(/forum.tribalwars.nl/))){
		sprache = neederlands;
		return true;
	}
	if (  ( document.location.href.match(/tribalwars.net/)) && 
    	  (!document.location.href.match(/forum.tribalwars.net/))){
		sprache = english;
		return true;
	}

	if (  ( document.location.href.match(/klansavaslari.net/)) && 
    	  (!document.location.href.match(/forum.klansavaslari.net/))){
		sprache = turk;
		return true;
	}

	if (  ( document.location.href.match(/plemiona.pl/)) && 
    	  (!document.location.href.match(/forum.plemiona.pl/))){
		sprache = polish;
		return true;
	}

	if (  ( document.location.href.match(/ds.innogames.net/)) && 
    	  (!document.location.href.match(/forum.plemiona.pl/))){
		sprache = polish;
		return true;
	}



}

function getTextArea(){

var kasten;
kasten = document.getElementsByName("message")[0];

if (!kasten){
kasten = document.getElementsByName("text")[0];
}

if (!kasten){
kasten = document.getElementsByName("intern")[0];
}

if (!kasten){
kasten = document.getElementsByName("personal_text")[0];
}

if (!kasten){
kasten = document.getElementsByName("desc_text")[0];
}
if (!kasten){
kasten = document.getElementsByName("memo")[0];
}

return kasten;

}







function farbeChange(e){
	var farbe = document.getElementById("farbe");
	var efarbe = farbe.options[farbe.selectedIndex].value;
	insert("[color="+efarbe+"]","[/color]");
}

function grossChange(e){
	var size = document.getElementById("gross");
	var esize = size.options[size.selectedIndex].value;
	insert("[size="+esize+"]","[/size]");
}

function insert(aTag, eTag) {


var input=getTextArea();
  input.focus();
  /* f?r Internet Explorer */
  if(typeof document.selection != 'undefined') {
    /* Einf?gen des Formatierungscodes */
    var range = document.selection.createRange();
    var insText = range.text;
    range.text = aTag + insText + eTag;
    /* Anpassen der Cursorposition */
    range = document.selection.createRange();
    if (insText.length == 0) {
      range.move('character', -eTag.length);
    } else {
      range.moveStart('character', aTag.length + insText.length + eTag.length);      
    }
    range.select();
  }
  /* f?r neuere auf Gecko basierende Browser */
  else if(typeof input.selectionStart != 'undefined')
  {
    /* Einf?gen des Formatierungscodes */
    var start = input.selectionStart;
    var end = input.selectionEnd;
    var insText = input.value.substring(start, end);
    input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);
    /* Anpassen der Cursorposition */
    var pos;
    if (insText.length == 0) {
      pos = start + aTag.length;
    } else {
      pos = start + aTag.length + insText.length + eTag.length;
    }
    input.selectionStart = pos;
    input.selectionEnd = pos;
  }
  /* f?r die ?brigen Browser */
  else
  {
    /* Abfrage der Einf?geposition */
    var pos;
    var re = new RegExp('^[0-9]{0,3}$');
    while(!re.test(pos)) {
      pos = prompt("Einf?gen an Position (0.." + input.value.length + "):", "0");
    }
    if(pos > input.value.length) {
      pos = input.value.length;
    }
    /* Einf?gen des Formatierungscodes */
    var insText = window.prompt("Bitte geben Sie den zu formatierenden Text ein:");
    input.value = input.value.substr(0, pos) + aTag + insText + eTag + input.value.substr(pos);
  }
}
