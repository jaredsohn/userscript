// ==UserScript==
// @name                Nukezone Launch Missile Button
// @namespace           noes
// @description         Makes you think twice before pressing that button
// @include             http://www.nukezone.nu/attack.asp?Action=Step3
// ==/UserScript==

if (document.body.innerHTML.search('Launch Missile') != -1)
{
	inputs = document.getElementsByTagName('input');
	for (var i=0;i<inputs.length;i++)
	{
		var input = inputs[i];
		if (input.getAttribute('value') == 'Attack' && input.getAttribute('name') == 'Go')
		{
			input.setAttribute('src', 'http://img21.imageshack.us/img21/1852/buttonc.jpg');
			input.setAttribute('class', '');
			input.setAttribute('type', 'image');
			var br = document.createElement('br');
			var br2 = document.createElement('br');
			input.parentNode.insertBefore(br, input.nextSibling);
			input.parentNode.insertBefore(br2, input.nextSibling);
			inputs[i+1].setAttribute('value', 'I\'m scared');
			break;
		}
	}
}