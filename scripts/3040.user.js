// http-ipv4-to-ipv6 tunel script
// feel free to include and exclude addresses as you want
// version 0.1
//
// ==UserScript==
// @name	http-ipv4-to-ipv6 tunel script
// @namespace	http://www.schuetter.org/joerg/
// @description	Tunels the http via an ipv6-proxy at sixxs.org
// @include	http://www.google.com/*
// @include	http://www.google.de/*
// @include	http://*.sixxs.org/*
// @exclude	https://*
// ==/UserScript==
(function(){
  var url_array = location.href.split('/');
  var regex_port = /:\d+$/;
  var regex_ip = /^\d+\.\d+\.\d+\.\d+$/;
  var regex_ip_sixxs = /^\d+\.\d+\.\d+\.\d+\.sixxs\.org$/;
  var regex_sixxs = /\.sixxs\.org$/;
  if (url_array[0] == 'http:' && url_array[1] == '' && url_array[2].search(regex_ip_sixxs) != -1) {
    url_array[2] = url_array[2].replace('.sixxs.org', '');
    location.href = url_array.join('/');
  }
  else if (url_array[0] == 'http:' && url_array[1] == '' && url_array[2].search(regex_sixxs) == -1 && url_array[2].search(regex_port) == -1 && url_array[2].search(regex_ip) == -1) {
    url_array[2] = url_array[2] + '.sixxs.org';
    location.href = url_array.join('/');
  }
})();
