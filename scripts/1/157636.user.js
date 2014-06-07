// ==UserScript==
// @name        mazda-favicon-system-tagging
// @namespace   be.tung
// @description Replaces Mazda icon with colored variant for DEV/TST/ACP systems.
// @include     https://moa.mazdaeur.com/*
// @include     http://mwas1.mme.mazdaeur.com/*
// @include     https://mappsacc.mazdaeur.com/*
// @include     http://mappsacc.mle.mazdaeur.com/*
// @version     1
// ==/UserScript==

mazda_blue = 'data:image/gif;base64,' +
'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' +
'Rvjhc/qoCfwHTHjN+4QrMSIAAAAASUVORK5CYII=';

mazda_red = 'data:image/gif;base64,' +
'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB90BGhUQE7QhCQ4AAAZGSURBVFjD' +
'7Zd7VJR1HsY/w8zocBlEVMYmDJfr6smOGsXFDkMJmQqdRUoO1eq2Lq4QCi6rbFGKqBzEwA0UhC2y' +
'2krTvGUcQJDLKl5KkBouSgTCDLcRaCxmBmZg9g//AI8kaJ7jP33Pef95z/d9n+e83+f5/p5XYA4J' +
'MfMQy4KHXL8TEE20se29XASI0BuMDJvNCARmLIQmMJuwsrRiypkShDe6EWo0iOtrHwyB/tCVtCxQ' +
'oP2pn67LtajUzfT0dNPT041u4GcYBswgFAqwsrRENlPGrLkezFkRjLtGizQ3e1wCgrFcMDRjBhf+' +
'shmVWsPZ8pNU15xHLLJA8aw/f/TwwGH6dOzs7JBYWiEQWDBkGkSr1dLV1Y2yvo7/VVRgMOgIXBxI' +
'WPjreMTHTJxAR9b7fF3wHefOlpB/6gAOMnveTnibsIOf39Nsi6KiSU1No/HaVWJitxAcHI61RIt8' +
'/drb+oSJc+Ykjr6R2TOZ7KwMSooO8PySJRw6+Dneu1LuWVwu31xi1SQRTU95syMpHs0NAzIHD2wj' +
'wrD5+quxXXA1ZQ8vPPc4IkEXcXHxHDWbmBkZ+ZtUvlfVzMeffMK5s8dwkIlRKusx+CnuJFAYGU9L' +
'Sy8LPedRUlLM2r9HPTCrBQYs5/CRUjyfdKG87CQ5FlZ3umDyZDsarirJP9XCsqAQZDI4G5eEo6M9' +
'szdG3xewOnM/7e03kWOL11NTKS8rJT+/FJ2+kKUnjuMe/89bX6A5LRN/Pw9OFx5jefAKIiJWoVRW' +
'4+M9F7X6Zz5bGYEyadeEgau37KRg3Vvo9JbMm+dKZ3sV4a+sJCxsNY5OnrS2XqegoHBkBIMmE0aj' +
'ieqqSwiFQvLyPuXJhZ4sWxZAa8s5nvWfT7/OyH9fiqAxdc+vAn+XuJ3di/5En3Yybu5OlBQf4MUX' +
'F+Pl5cPhL47yjCIIhWI5EomEkjNFIwSkUhuamprp7FTx0ssrKSw6zfLgEC5f/p5XXl2Dj9dCThzN' +
'RWo7zLnKahqSM+4Az4+IIfeDfCQSGw5/kcYzPo8TFRVDc0sbq/68msrKSl57LRxXVzemTJlO0w+N' +
'IxqQR0VQ90Y0er0eZ2cXAvbtJQD48ZtLXLlSQ2FhEcdOFrM3+0Oe9lzIgGENtns/Qh69GoAribvY' +
'FZOA1FbMl0fSeMzRiXXrovH3V/CEtTVTk3dCSgqXE3YikzkhtbXHZOwbIdCe9SGmmm9vLQbhiDOd' +
'4+JwBlYAhrV/o9htDjn7c0lNTUQslvBXwDh3Lnv+nYf2JzUyh1nk5uQRnPc+1FTfukYvHZERu6ki' +
'JBIJvxhHuaCuthHjoDUCgZDuLs2Y85VUVBBUUUGQGLI3beWrU0dZ8M671P+gQn0hg6UvKIiNjUUW' +
'ue5XNTJgGMBoHGRwoB+z2TxCoK/vBtpfxEgkVqjUbTBJfFeVRxYeQ+e3lKvXGlGpOrGWDrOjtwfh' +
'XcABhs0m+vp66e3VYD9NOlqEYtSq6zjNdqWq6lv6V4SOa7XQkKUMC8y0Xq/lzfh4hBrNuM8YTUOo' +
'Wzvo6OjA28t7hIC7uwsXL+Tj6OhMZ0cnlx6dNe7LZm/cwMBAP4/IZ+KdOv6OuJaSil4v5nTpecCI' +
'n0Jx+2m4Zto0rjW08piTCz09Kgosx88qTe+mc/OmlgVJ28bt3RcYjFD0KFnZW3F3lXPEZL6dQO32' +
'Hfgu8uGzT4/T1z/ATHsbArLSH8hZUJecwtZt2Ugkkzh+Yh+lRWV4JiffmQdSfXx5b08q1TVK6us1' +
'yOU2uG3e+JvAVZnZpKV/wNCQmIOH0ln/RiTvVF0Z+zjefL6Sf725hSXPL8bJyRKDXkRLevZ9gzft' +
'3kdZeS02UntOHP8PYS+H3gY+ZipeX3qGTZveIjAwAGVdGcND9xec+0PD6e3Vc/HiGQ4dzGDbtgQy' +
'Ve0Ty4QAyqTt7M/dT0ODEl9fXxZ5K3Dz8EBqIWDGxliGZjjQuXU3QqGQaRkpWNzooi1hO709fXyv' +
'rKG8rJi6+lp8vJ5mw4YY/hD3j4mH0tHVkp5OcXExTT82oWprQ6c3YMaM0EKElZU1Zszo+/UMDA4i' +
'FlsgtbXFUS5n/vz5BKlUSCoq7j0V360Mfn50hYSg0+kwGm8tdJFIhI2NDY/k5CCur7+nUQl+/zl9' +
'2AT+D3L3jGeq6TpyAAAAAElFTkSuQmCC';

mazda_green = 'data:image/gif;base64,' +
'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' +
'02dN4P+eRItbuSHgDQAAAABJRU5ErkJggg==';

var full = window.location.host;
var parts = full.split('.');

if (parts[0] === 'moa' || parts[0] == 'mwas1' || parts[0] == 'defrltas003') {
  url = mazda_blue;
} else if (parts[0] == 'mappsacc') {
  url = mazda_red;
} else if (parts[0] == 'localhost' || parts[0] == '127') {
  url = mazda_green;
} else {
  return;
}

var newFv = document.createElement('link');
newFv.rel = 'icon';
newFv.type = 'image/png';
newFv.href = url;

try {   
  document.getElementsByTagName('head')[0].appendChild(newFv);
}
catch(e) { }



