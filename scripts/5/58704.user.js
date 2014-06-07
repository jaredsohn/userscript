// ==UserScript==
// @name           Hosting Image Corrector
// @description    Fixes a few images ;)
// @include        http://hosting.com/*
// @include        http://www.hosting.com/*
// ==/UserScript==

var hmslogo = 'data:image/gif;base64,'+
'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';

images = document.getElementsByTagName('img');

for(i = 0 ;i < images.length ; i++)
{
	if (images[i].src = '/images/top/logo.png')
	{
		images[i].src = hmslogo;
		i = images.length;
	}
}



var hms = 'data:image/png;base64,'+
'AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///zH///8xAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz+HZ/1uZftEkdlP6Q4lr1nytmJWRuqf4ibWi'+
'/6XHuPHR4tr/9Pj20wAAAAAAAAAAAAAAAAAAAAAAAAAA1OTd+hRrRv8PaEL/p8i5//P49v/+//7/'+
's8/D/w5oQf+kx7f/w9rQ/26jjdatzL//7PPwlQAAAAAAAAAAAAAAAFiVe/8EYjn/k7up///////x'+
'9/T/7/Xy/9Tk3f8JZT3/qcm7//b5+P8qeVf/kLqo/5a9rOnF29H8AAAAAAAAAABFi23/D2lD/9bl'+
'3///////kbqo/57Cs//1+ff/LHta/3Gmj//7/fz/SIxu/2Wfhv/u9PL/Q4hr18Xa0f8AAAAAtdDE'+
'/wxmQP/P4dr//////1CRdf9amH7//f79//z9/f///////////3usl/8ldlP//P38/9Lj3P8WbEf/'+
'4uzoz/r8+wZooYjse62Y//7//v9lnob/Lnxb//j7+v/c6eP/pse5//T49//I3dT/LHtZ//z9/P/5'+
'+/r/F21H/2Wehv8AAAAA+fv6CWmhiemmx7n/vtbM/xBpQ//o8e3/u9XK/wtmPv/D2tD/+Pr5/5S7'+
'q///////9/r5/yBzT/8eck7/AAAAAAAAAAD2+fgNqsq8xa7NwMc8hWb/x9zT/+nx7v8KZT//gbGc'+
'//7+/v/z+Pb//////6zLvv8MZ0D/Rott/wAAAAAAAAAAAAAAAAAAAADe6uX/qsq7xYy3pdWnyLn/'+
'JHZT/2Sfhf/4+vn/7vTx/5i+rv8UbEb/I3VR/9Xl3fIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy'+
'9/XB0eLb/7XRxP6xzsH/ncGx8Husl81knYXypsi60t/r5v8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACARAAAAMAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAA==';

var head = document.getElementsByTagName("head")[0];

function setIcon(url) {
	var links = head.getElementsByTagName("link");
	for (var i = 0; i < links.length; i++)
		if (links[i].type == "image/x-icon" && 
		   (links[i].rel == "shortcut icon" || links[i].rel=="icon") &&
		   links[i].href != url)
			head.removeChild(links[i]);
		else if(links[i].href == url)
			return;
	
	var newIcon = document.createElement("link");
	newIcon.type = "image/x-icon";
	newIcon.rel = "shortcut icon";
	newIcon.href = url;
	head.appendChild(newIcon);
}


setIcon(hms);