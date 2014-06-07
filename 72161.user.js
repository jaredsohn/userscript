// ==UserScript==
// @name           Twitter mobile setting for Russia
// @namespace      http://blog.laptev.info
// @include        https://twitter.com/devices
// @include        http://twitter.com/devices
// @version	1.1
// ==/UserScript==

var country = document.getElementById('device_country_code');
var option11 =  document.createElement('option');
	option11.text = 'Россия';
	option11.value = '+7'; 
country.appendChild(option11); 