// ==UserScript==
// @name           Wykop - szczegóły oceny komentarza
// @namespace      wykopplus
// @description    Automatycznie pokazuje liczbę plusów / minusów
// @include        http://www.wykop.pl/*
// ==/UserScript==

$ = unsafeWindow.$;

var nbsp = String.fromCharCode(160);
$('h5 strong').bind('DOMSubtreeModified', function()
{
	var $data = ($this = $(this)).metadata();
	var ntext = this.firstChild.nodeValue;
	if($data.lastText != ntext)
	{
		$this.text($data.lastText = '(+' + $data.p + ' / -' + Math.abs($data.m) + ') ' +
			nbsp + ($data.t > 0 ? '+' : '') + parseInt($data.t)
		);
		$this.unbind('click').parents('li.comment')
			.find('.toggle-comment').css('right', 50 + $this.width() + 'px');
	}
}).trigger('DOMSubtreeModified');