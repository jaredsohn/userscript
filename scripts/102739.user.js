// ==UserScript==
// @name           Invasion Automation
// @namespace      KoLCtH
// @description    KoL UI Enhancement. Allows automation of Valhalla Skeleton Invasion
// @include        http://*.kingdomofloathing.com/choice.php*
// @include        http://127.0.0.1:*/choice.php*
// ==/UserScript==
var AUTOMATE = GM_getValue('AUTOMATE', false)
var pastChoices = JSON.parse(GM_getValue('pastChoices', '{}'))
var formNum = document.querySelector('[name="whichchoice"]')
if (formNum)
{
	var placement = document.forms[0].parentNode
	var pastChoice = pastChoices[formNum.value]
	for (var n = 0; n < document.forms.length; n++)
	{
		var button = document.forms[n].querySelector('.button')
		var val = button.previousSibling.value
		if (val == pastChoice)
			button.style.backgroundColor = 'lightblue'
		button.addEventListener('click', function (e)
		{
			pastChoices[formNum.value] = this.previousSibling.value
			GM_setValue('pastChoices', JSON.stringify(pastChoices))
		}, false)
	}
	if (pastChoice && AUTOMATE)
	{
		document.querySelector('[name="choiceform' + pastChoice + '"]').submit()
		return
	}
}
else 
{
	var again = document.querySelector('[href *= "invasion.php"]')
	if (!again)
		return
	var placement = again.parentNode
	if (AUTOMATE)
		location.href = again.href
}
placement.appendChild(document.createTextNode('Automate these adventures?'))
var check = placement.appendChild(document.createElement('input'))
check.type = 'checkbox'
check.checked = AUTOMATE
check.addEventListener('click', function ()
{
	GM_setValue('AUTOMATE', this.checked)
}, false)
