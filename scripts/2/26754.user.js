// ==UserScript==
// @name           Improved Google Calculator
// @namespace      http://trevorcreech.com/gcalc
// @description    Removes spaces from Google Calculator results so they can easily be copied back into GCalc.  Also puts the result back in the input box.
// @include        http://*.google.*/search?*
// @include        http://google.*/search?*
// ==/UserScript==
var isCalc = false;
var imgs = document.getElementsByTagName('img');
for(var i = 0; i < imgs.length; i++)
	if(imgs[i].src.substr(imgs[i].src.length - 12,12) == 'calc_img.gif')
	isCalc = true;

if(isCalc)
{
	var answer = '';
	var els = document.getElementsByTagName('font');
	for(var i = els.length - 1; i >= 0; i--)
	{
		if(els[i].size == '-2' && els[i].innerHTML == ' ')
		{
			els[i].parentNode.removeChild(els[i]);
		}
		else if(els[i].size == '+1')
			answerEl = els[i];
	}
	answerEl.innerHTML = answerEl.innerHTML.replace(/(\d)(&nbsp;| )(\d)/g,'$1$3'); //display on page

	answer = answerEl.innerHTML;
	answer = answer.replace(/×/,'*').replace(/<sup>/,'^');
	answer = answer.replace(/<.*?>/g, '').replace(/.*= /g, ''); //display in search box and title

	var inputs = document.getElementsByTagName('input');
	for(var i = 0; i < inputs.length; i++)
	{
		if(inputs[i].title == 'Search')
		{
			inputs[i].value = answer;
			inputs[i].focus();
			break;
		}
	}
	document.title = document.title.replace(/( - Google Search)/,' = ' + answer + "$1");
	
	
}