// ==UserScript==
// @name          jSnow Killer
// @namespace     http://pioupioum.fr/
// @description   Remove "Snow Storm" effect added by jSnow script.
// @version       1.0
// @author        Mehdi Kabab
// @include http://*
// @include https://*
// ==/UserScript==
/*
# ***** BEGIN LICENSE BLOCK *****
# Copyright (C) 2009 Mehdi Kabab <http://pioupioum.fr/>.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
# ***** END LICENSE BLOCK ***** */
(function(){
	var $ = unsafeWindow.jQuery
	  , html = document.getElementsByTagName('html')[0]
	  , body = html.getElementsByTagName('body')[0]
	  , els, i, c;

	if ('function' == typeof $ && 'function' == typeof $.fn.jSnow)
	{
		if (!(html.style && 'hidden' === html.style.getPropertyValue('overflow-x') && 'scroll' === html.style.getPropertyValue('overflow-y')
		   && body.style && 'hidden' === body.style.getPropertyValue('overflow') && '100%' === body.style.getPropertyValue('height')
		))
		{
			return;
		}

		// Search in the first 3 div
		els = body.getElementsByTagName('div');
		c = (3 < els.length) ? 3 : els.length;
		for (i = 0; i < c; ++i)
		{
			// 8 flakes min, otherwise the Snow Storm effect is useless
			if (els[i].style && $('> *', els[i]).length === $('> span', els[i]).length)
			{
				$.fn.jSnow = function(){};
				body.removeChild(els[i]);
				break;
			}
		}
	}
})();
