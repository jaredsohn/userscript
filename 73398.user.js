// ==UserScript==
// @name            AprilFilter
// @namespace       skyboy@kongregate
// @author          skyboy
// @version         1.1.0
// @description     Enable the "pity the" fool's day filter.
// @include         http://www.kongregate.com/games/*/*
// @homepage        http://userscripts.org/scripts/show/73398
// ==/UserScript==
if (/^\/?games\/[^\/]+\/[^\/?]+(\?.*)?$/.test(window.location.pathname))
setTimeout(function() {
javascript:void(window.location.assign("javascript:void((function(){holodeck._extra_interpolation=true;holodeck.addIncomingMessageFilter(function(d,n){var b=d,a=$H({april:'pity the','\\\\bgreg\\\\b':'',badge:'pony',games:'BRAINZZZ',banhammer:'magic wand',retarded:'gifted',retard:'savant',gay:'merry',mod:'care bear',admin:'rainbow princess','chuck norris':'Mr. T',words:'coconuts',beer:'mana',booze:'potions',bacon:'tofu',cake:'pie',level:'one up',cookie:'pie',candy:'pie','ice cream':'pie',food:'OMNOMNOM',pickle:'flavor missile',rofl:'how droll!','your mom':'my mom','ur mom':'my mom',andrew:'leeeeeeroy jenkins',filter:'narwhal','kong\\\\b':'The Best Site EVAR',kongregate:'The Best Site EVAR',replac:'hallucinat'}),e=new RegExp('('+a.keys().join('|')+')','im');a.set('greg','Greg, all glory be His');a.set('kong','The Best Site EVAR');if(holodeck._extra_interpolation){n(b.gsub(e,function(f){return a.get(f[0].toLowerCase());}),n);}else{n(b,n);}})})())"));
}, 1250);