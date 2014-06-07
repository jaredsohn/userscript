// ==UserScript==
// @name			331Alarm
// @author			kulker
// @namespace		kurtulus.ulker@gmail.com
// @include		    http://pertem.kkk.tsk.mil.tr/yedeksubay/AdayNoArama.aspx
// ==/UserScript==



	var headID = document.getElementsByTagName("head")[0];         
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = 'http://www.fotoizle.com/331.js';
	headID.appendChild(newScript);

