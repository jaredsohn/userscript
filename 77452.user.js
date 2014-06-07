// ==UserScript==
// @name           More Evil
// @namespace      http://userscripts.org/scripts/show/77452
// @include        http://www.tomscott.com/evil/
// ==/UserScript==

var script = document.createElement('script');
script.innerHTML = 'function parseNumber(num) {         \
  var digits = num.toString().replace(/[^0-9]/g, \'\'); \
  var parsed = \'\';                                    \
  if (digits.match(/^0[127]\\d{9}$/)) {                 \
    parsed += \'(\' + digits.substr(0,5) + \') \';      \
    parsed += digits.substr(6);                         \
  }                                                     \
  if (digits.match(/^[2-9]\\d{9}$/)) {                  \
    parsed += \'(\' + digits.substr(0,3) + \') \';      \
    parsed += digits.substr(3,3) + \'-\';               \
    parsed += digits.substr(6);                         \
  }                                                     \
  if (digits.match(/^1[2-9]\\d{9}$/)) {                 \
    parsed += \'1 (\' + digits.substr(1,3) + \') \';    \
    parsed += digits.substr(4,3) + \'-\';               \
    parsed += digits.substr(7);                         \
  }                                                     \
  if (digits.match(/^[2-9]\\d{6}$/)) {                  \
    parsed += digits.substr(0,3) + \'-\';               \
    parsed += digits.substr(3);                         \
  }                                                     \
  if (parsed.length == 0) { parsed = num; }             \
  return parsed;                                        \
}';
document.getElementsByTagName('head')[0].appendChild(script); 