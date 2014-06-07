// ==UserScript==
// @name           PenPal Guilt
// @namespace      KolCtH
// @include        http://*.kingdomofloathing.com/messages.php*
// @include        http://127.0.0.1:*/messages.php*
// @description		Hides pen pal messages so you don't feel so guilty about not answering them.
// ==/UserScript==

var smalls = Array.prototype.slice.call(document.querySelectorAll('td.small'))
var space = smalls[0].lastChild.textContent
smalls[0].lastChild.textContent = space.substr(0, space.length - 2)
var a = smalls[0].appendChild(document.createElement('a'))
a.href ='#'
a.textContent = '[Pen Pal]'
a.addEventListener('click', function (e)
{
	e.preventDefault()
	penPalLetters.forEach(function (p)
	{
		p.style.display = p.style.display == 'none' ? 'table-row' : 'none'
	})
}, false)
var penPalLetters = []
smalls.forEach(function (s)
{
	if (s.textContent.indexOf('Your Pen Pal') != -1)
	{
		s.parentNode.style.display = 'none'
		penPalLetters.push(s.parentNode)
	}
})

