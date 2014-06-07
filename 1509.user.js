// ==UserScript==
// @name          User Script Icon
// @namespace     http://mozilla.wikicities.com/
// @include       *
// @exclude       http://dunck.us/collab/GreaseMonkeyUserScripts*
// @exclude       http://www.dunck.us/collab/GreaseMonkeyUserScripts*
// @exclude       http://userscript*.org/*
// @exclude       http://www.userscript*.org/*
// @exclude       http://greasemonkey.com/*
// @exclude       http://www.greasemonkey.com/*
// @description	  Adds a small greasemonkey icon on every users script link (.user.js)
// ==/UserScript==

(function() {
  var links = document.links;
  for(i = 0; i < links.length; i++) {
    link = links[i];
    if(link.href.match(/\.user\.js$/)) {
      link.style.backgroundImage = 'url(data:image/png;base64,' +
        'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D%2BPAAAAFXR' +
        'FWHRDcmVhdGlvbiBUaW1lAAfVCAoDCCj7wfNCAAAAB3RJTUUH1QgK' +
        'AwwSjKAMhAAAAAlwSFlzAAAK8AAACvABQqw0mAAAAwBQTFRFAAAAJ' +
        'SAiJyEkWE1Ve2JifWVldmlwe2tymjQAmzcAnDcAnzwAoT8AqDoAqT' +
        'wApUkOrEUArEgAsUYAtUwAq1ctrVkzrFo0vmo4gmtqunldvXxixFA' +
        'AxFEAz1UAz1YA0VcA0lYA1l0H3mkbwXFDzXpLzXtLkH2J64VH7odM' +
        'noqVr42PtJKRvJmYv6WwwJybyKOk2bGz27W23rW08qaI%2FayH%2F' +
        '7WP4re2972v%2F8Ct%2F8W59MbF%2F8rA%2F8vA%2BMnI%2F9XB%2' +
        'F9HN%2F9fU%2F9rX%2F%2BTi%2F%2BXr%2F%2Bnu%2F%2Bny%2F%2' +
        'B34%2F%2FHz%2F%2FL0%2F%2FD8AAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
        'AAAAAAAAAAAAApnQ8LQAAAAF0Uk5TAEDm2GYAAABrSURBVHjaY2Bg' +
        'YOCWluFmAAMhVR4uFWEQS8zGzd7c01KKgUFB0FXbwFDLRUCWQZ7Ti' +
        'ZGVhcmRQ46BgVfcXV%2FPQ5kPqNbY2cHMyNHZGsg0VZOwstVhtgMy' +
        'RUx02dg1LfhBpkkqqmsoiTIwAAA%2FcwsdS3f4YQAAAABJRU5ErkJ' +
        'ggg%3D%3D)';
      link.style.backgroundColor = 'buttonFace';
      link.style.backgroundPosition = '2px center';
      link.style.backgroundRepeat = 'no-repeat';
      link.style.color = 'buttonText';
      link.style.textDecoration = 'none';
      link.style.paddingLeft = '14px';
      link.style.paddingRight = '.5em';
      link.style.border = '1px solid #aaa';
      link.style.MozBorderRadius = '1em';
    }
  }
})();

