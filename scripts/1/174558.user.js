// ==UserScript==
// @name       Who dat prof?
// @namespace  
// @version    0.1
// @description  enter something useful
// @match      https://*/courses/php/*
// @match      http://*/courses/php/*
// @copyright  2012+, Metanephrines
// ==/UserScript==

var inputs = document.getElementsByTagName('input');
var textins = document.getElementsByTagName('textinput');
var message = "woo";
var i = 0;
var x=0;
var r;
var str;
var matchpos = document.title.search('Instructor Evaluation');
var readyStateCheckInterval;

function myFunction() {
	if (window.top === window.self && matchpos != -1) 
    { 
	r=confirm("Do you know this prof?");

	if (r==false)
	{
		for (i=0; i < inputs.length; i++)
		{

   			if (inputs[i].getAttribute('value') == 'a06')
   			{
				inputs[i].setAttribute('checked', 'checked');

    		}
   			if (inputs[i].getAttribute('id') == '51_51_a04')
   			{
			inputs[i].setAttribute('checked', 'checked');
			}
   			if (inputs[i].getAttribute('id') == '51_51_a04')
   			{
			inputs[i].setAttribute('checked', 'checked');
            }
		}
	}
	else {
		for (i=0; i < textins.length; i++)
		{
   			textins[i].value = 'n/a';
		}
		for (i=0; i < inputs.length; i++)
		{
			if (inputs[i].getAttribute('value') == 'a05')
   			{
				inputs[i].setAttribute('checked', 'checked');
			}
   			if (inputs[i].getAttribute('id') == '51_51_a04')
   			{
			inputs[i].setAttribute('checked', 'checked');
			}
		}
	}
	}
}

readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        myFunction();
        clearInterval(readyStateCheckInterval);
    }
}, 10);