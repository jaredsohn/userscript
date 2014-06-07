// ==UserScript==
// @name           New Flickr Discuss Post Notification
// @namespace      http://www.flickr.com/alesadam
// @description    Provides a visual indication of any new discussion posts in selected groups.
// @creator        Alesa Dam (http://flickr.com/alesadam/)
// @date           05/11/2010
// @version        4.3.2
// @icon	   https://lh6.googleusercontent.com/wEVJ8JTPu04GdQOUJNiTuD2fa9jh-vjfWfy86EqznSXvRa_uT8Rkc4uS6DkNJmv7ETf587_l1g=s128-h128-e365
// @modified       Oct 31, 2013
//
// @include        http://www.flickr.com/*
// @include        https://www.flickr.com/*
// @include	   https://secure.flickr.com/*
//
// @exclude        http://www.flickr.com/photos/organize*
// @downloadURL	   https://userscripts.org/scripts/source/76587.user.js
// @updateURL	   https://userscripts.org/scripts/source/76587.meta.js
//
// @grant	   GM_getValue
// @grant	   GM_setValue
// @grant	   GM_deleteValue
// @grant	   GM_listValues
// @grant	   GM_log
// @grant	   GM_addStyle
// ==/UserScript==
//
(function() {
	var NFDPNversion = "4.3.2";

	var debug = false; //document.location.href.match('api');
	var images = {
		plus: 'data:image/png;base64,' + 'R0lGODdhFAAUAPf/AAAAAIAAAACAAICAAAAAgIAAgACAgMDAwMDcwKbK8P/w1P/isf/Ujv/Ga/+4' + 'SP+qJf+qANySALl6AJZiAHNKAFAyAP/j1P/Hsf+rjv+Pa/9zSP9XJf9VANxJALk9AJYxAHMlAFAZ' + 'AP/U1P+xsf+Ojv9ra/9ISP8lJf4AANwAALkAAJYAAHMAAFAAAP/U4/+xx/+Oq/9rj/9Ic/8lV/8A' + 'VdwASbkAPZYAMXMAJVAAGf/U8P+x4v+O1P9rxv9IuP8lqv8AqtwAkrkAepYAYnMASlAAMv/U//+x' + '//+O//9r//9I//8l//4A/twA3LkAuZYAlnMAc1AAUPDU/+Kx/9SO/8Zr/7hI/6ol/6oA/5IA3HoA' + 'uWIAlkoAczIAUOPU/8ex/6uO/49r/3NI/1cl/1UA/0kA3D0AuTEAliUAcxkAUNTU/7Gx/46O/2tr' + '/0hI/yUl/wAA/gAA3AAAuQAAlgAAcwAAUNTj/7HH/46r/2uP/0hz/yVX/wBV/wBJ3AA9uQAxlgAl' + 'cwAZUNTw/7Hi/47U/2vG/0i4/yWq/wCq/wCS3AB6uQBilgBKcwAyUNT//7H//47//2v//0j//yX/' + '/wD+/gDc3AC5uQCWlgBzcwBQUNT/8LH/4o7/1Gv/xkj/uCX/qgD/qgDckgC5egCWYgBzSgBQMtT/' + '47H/x47/q2v/j0j/cyX/VwD/VQDcSQC5PQCWMQBzJQBQGdT/1LH/sY7/jmv/a0j/SCX/JQD+AADc' + 'AAC5AACWAABzAABQAOP/1Mf/sav/jo//a3P/SFf/JVX/AEncAD25ADGWACVzABlQAPD/1OL/sdT/' + 'jsb/a7j/SKr/Jar/AJLcAHq5AGKWAEpzADJQAP//1P//sf//jv//a///SP//Jf7+ANzcALm5AJaW' + 'AHNzAFBQAPLy8ubm5tra2s7OzsLCwra2tqqqqp6enpKSkoaGhnp6em5ubmJiYlZWVkpKSj4+PjIy' + 'MiYmJhoaGg4ODv/78KCgpICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAEAAAEALAAAAAAUABQA' + 'QAiRAAMIHHjOncGD5wYOdAdAl8OHul69gvgQgDuFAhnCkgjLIsaPARhGnOgRI0MAKFNufNUxZcqL' + 'JhtWhKmw4EGDDSXqsnjTXcGcEoMKFdqR5kIAK4uCjOmy5NKMTZ0+FalT6lKqJI1CjTpyZ1ScI4eK' + 'ZckTKayzaDmiRWvR5k2kHHneTBgzqVWQGtlqBekW4ceAADs=',
		minus: 'data:image/png;base64,' + 'R0lGODdhFAAUAPf/AAAAAIAAAACAAICAAAAAgIAAgACAgMDAwMDcwKbK8P/w1P/isf/Ujv/Ga/+4' + 'SP+qJf+qANySALl6AJZiAHNKAFAyAP/j1P/Hsf+rjv+Pa/9zSP9XJf9VANxJALk9AJYxAHMlAFAZ' + 'AP/U1P+xsf+Ojv9ra/9ISP8lJf4AANwAALkAAJYAAHMAAFAAAP/U4/+xx/+Oq/9rj/9Ic/8lV/8A' + 'VdwASbkAPZYAMXMAJVAAGf/U8P+x4v+O1P9rxv9IuP8lqv8AqtwAkrkAepYAYnMASlAAMv/U//+x' + '//+O//9r//9I//8l//4A/twA3LkAuZYAlnMAc1AAUPDU/+Kx/9SO/8Zr/7hI/6ol/6oA/5IA3HoA' + 'uWIAlkoAczIAUOPU/8ex/6uO/49r/3NI/1cl/1UA/0kA3D0AuTEAliUAcxkAUNTU/7Gx/46O/2tr' + '/0hI/yUl/wAA/gAA3AAAuQAAlgAAcwAAUNTj/7HH/46r/2uP/0hz/yVX/wBV/wBJ3AA9uQAxlgAl' + 'cwAZUNTw/7Hi/47U/2vG/0i4/yWq/wCq/wCS3AB6uQBilgBKcwAyUNT//7H//47//2v//0j//yX/' + '/wD+/gDc3AC5uQCWlgBzcwBQUNT/8LH/4o7/1Gv/xkj/uCX/qgD/qgDckgC5egCWYgBzSgBQMtT/' + '47H/x47/q2v/j0j/cyX/VwD/VQDcSQC5PQCWMQBzJQBQGdT/1LH/sY7/jmv/a0j/SCX/JQD+AADc' + 'AAC5AACWAABzAABQAOP/1Mf/sav/jo//a3P/SFf/JVX/AEncAD25ADGWACVzABlQAPD/1OL/sdT/' + 'jsb/a7j/SKr/Jar/AJLcAHq5AGKWAEpzADJQAP//1P//sf//jv//a///SP//Jf7+ANzcALm5AJaW' + 'AHNzAFBQAPLy8ubm5tra2s7OzsLCwra2tqqqqp6enpKSkoaGhnp6em5ubmJiYlZWVkpKSj4+PjIy' + 'MiYmJhoaGg4ODv/78KCgpICAgP8AAAD/AP//AAAA//8A/wD//////yH5BAEAAAEALAAAAAAUABQA' + 'AAhaAAMIHEiwoMGDCBMqXMiwocOH59xJnEix4sSIADJq3MhRo0QAMUKKHEkyBoCPMWqoXMmS5Y2T' + '7kC2nLny5ccbOHPq3GkzZsefG91FtEiU4rmHSJMqXcr0YUAAOw==',
		preferences: 'data: image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAAXNSR0IArs4c6QAAAAlwSFlzAAAL' +
			'EwAACxMBAJqcGAAAAAd0SU1FB9oJGQwyOwoRq7wAAABFaVRYdENvbW1lbnQAAAAAAENSRUFUT1I6' +
			'IGdkLWpwZWcgdjEuMCAodXNpbmcgSUpHIEpQRUcgdjYyKSwgcXVhbGl0eSA9IDk1ChrqswUAAAJr' +
			'SURBVCjPldI7TFNhGAbg7/t7zuGEcqlcCwIhgFwi1BBbJQGsImBUjCYmJhoZRB0UoyBu6MDgwqCD' +
			'xMtmSHCQGHEwRigGEyCCAwW52XIJlV5oKaW3U7D/Ob8DxjgZ+eb3e5f3QcYY7ObIf+b+9HKMMUSc' +
			'np6em/u+avcsLritC96JyaDHNZYHVg2I+Ucr7z/p1JWW7fxwiNjScre4pMagNzCSuO5XMxsXguEO' +
			'fvZq9LwLIpahzYe1jY/NH7Rp6YhIxsbGFazXGxqEmL2IakqBUuBZ583YQjduS0ATQaxYE0zv3hNC' +
			'EFGVnFKkoJExXPdSuzNqW9laXPId1w9Vd1fQU2gvXp6ImzGHwn1fLUfqatJSk7gB01RuwRlZ3hAE' +
			'lW+TLduoy7Wm5IWytFlZ2pz9B4SzFwKgmLd9zjvtBScbezFe05CZ05qWKvA8FwqxVUfUsbrW3jaJ' +
			'/r6OJh8hFIRA10vZF8D6Q/TNcAq3vSVZLTang+N41VYEpAgD2a8RvSW60y96n+VmsFcfhaYGSZcf' +
			'RQRRFSDp6bGKTAN+aWM9KIWDoIQAwz2vBwV15olrA/uMT7UZ2oPFNEqBEOATyohBnw2yB4ADwN8j' +
			'yez6JV1dVWxusq8gO+bWjXOPejieA0RIyihXjY72J2nmTf3dQHRAeAAFQDaWvq0snGLhGSZ928Nb' +
			'ZDkSiUhqETaEi6goCiIGg77m5tuDQ6LDmQmUu1zbde+KO14ETRxo4oBw8OC5UHv4Z4J+BBVFAQBE' +
			'BACv1zM/bx0wfRkf+VRdU3WsqvyHbda+ZHbbPnucK0XGztbWNvxb646rfxPE3fL+BTDrH9Nbcxyl' +
			'AAAAAElFTkSuQmCC',
		reload: 'data: image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABvUlEQVQ4jY1Sv2tTURg953z3ufqG' +
			'tItL0kEkYH0FsQ5Cn2vokOyVpE46Nd3EJb5F3Ay4OAhtXTsYu3VKupiCg4FCQPzBQ3TIlv/gOcQX' +
			'rq8heuAu33fP+c537kWWZciyDMtQqg3rpdrwnV/LeczJJC8RV7aH8Z96E0SLZGPyfrOXCwC4LFCq' +
			'fYhBdkjGFCASFAECJKcSKz+Pb09zngpWWyT7EmMzwpzmxzmDcwplOvA5cwcr2+cxib6klGKPwplM' +
			'ZTM2KUYkodwJWPl6tJ4CgJsrkXsS9icnm11/wtqD0RbFiCIIHAJIvhyspziaDfYEsD85uZsWg7TA' +
			'IhIJie7nNzenxf7SV1iGhSH6qD4ah9XH4/BfQq5YuP7woixjh0QdZKXYv5f8iABOAaSAt0JlZxSZ' +
			'0545tVxgsECji1c3Nnzy1vNfbQLNwdNrGznPd9CnGMoEOcI5hXeefH/mrhhcoKvmrC7HMsnGwhXM' +
			'lEh8KSPMBDmVZezIBAsMLhBk2j1tr/Z8gXmI397e6kocSLOvO3MiWCCYqSfT/dP26uHSEGXaJfmJ' +
			'5ODji7VG8fIi/PWM49fVVMYEyM7+hwwAvwFs8XsJYbrTnAAAAABJRU5ErkJggg==',
		convert: 'data: image/png;base64,' +
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABvUlEQVQ4jY1Sv2tTURg953z3ufqG' +
			'tItL0kEkYH0FsQ5Cn2vokOyVpE46Nd3EJb5F3Ay4OAhtXTsYu3VKupiCg4FCQPzBQ3TIlv/gOcQX' +
			'rq8heuAu33fP+c537kWWZciyDMtQqg3rpdrwnV/LeczJJC8RV7aH8Z96E0SLZGPyfrOXCwC4LFCq' +
			'fYhBdkjGFCASFAECJKcSKz+Pb09zngpWWyT7EmMzwpzmxzmDcwplOvA5cwcr2+cxib6klGKPwplM' +
			'ZTM2KUYkodwJWPl6tJ4CgJsrkXsS9icnm11/wtqD0RbFiCIIHAJIvhyspziaDfYEsD85uZsWg7TA' +
			'IhIJie7nNzenxf7SV1iGhSH6qD4ah9XH4/BfQq5YuP7woixjh0QdZKXYv5f8iABOAaSAt0JlZxSZ' +
			'0545tVxgsECji1c3Nnzy1vNfbQLNwdNrGznPd9CnGMoEOcI5hXeefH/mrhhcoKvmrC7HMsnGwhXM' +
			'lEh8KSPMBDmVZezIBAsMLhBk2j1tr/Z8gXmI397e6kocSLOvO3MiWCCYqSfT/dP26uHSEGXaJfmJ' +
			'5ODji7VG8fIi/PWM49fVVMYEyM7+hwwAvwFs8XsJYbrTnAAAAABJRU5ErkJggg==',
		mailicon: 'data: image/png;base64,' + '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' + 'Oft7ACkRghK6QQ6SAAAAAElFTkSuQmCC',
		color: 'data: image/png;base64,' + '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',
		remove: 'data: image/png;base64,' + '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' + 'HQD06SIbgukengAAAABJRU5ErkJggg==',
		lock: 'data: image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' + '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oGFwYbAwlN6f0AAAFpSURBVDjL' + '7ZG/SwJxGMaf+3rnDzKsTIKIBoW8pP6CtsAlaGiJoNkatCIwXcWgoYKGtixoDKJoEYIokBoiSKgs' + 'pCFKTRI10cw89e5tqvWO5p7thZcP7/t5gP9wWpa2IztrN4kHP2MAzxQ0FIZhl7g64/EEeS2AVObV' + 'b7V2obujY1NhxMqlsjeVzgQABJkWQDb9DOmzHN4/OgzM+3w+6asWfntJAQA0AcRBF+wDohA7O60D' + 'gN3hMNhdIgBA0wv5Yg6KItd/5uJ7oVoplbRJDIVC1Gopf68ptLxBRETx+CPl8vQbSSLyzflJ1YHd' + '9oSTWALZbAxMiSJ6fAsgifPLazQbFfULVmYttLfeQwY9iO5B1k5GC5McbXlBPM+TKkBvbKdMRKBR' + 'J6jPBsrtgvQCR3dLoAknSFXi2PgU9dsII0M1HFz0YnGa4SppRvWjiXiyoN6C2+3Ot5ktRkCAycRx' + 'sqyDTsdBVlqo1qTmN0cIoIXaqXQmAAAAAElFTkSuQmCC',
		down: 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACD0lEQVQ4ja2TT0hUYRTFf9/33jzf' + 'OM6kDqOjJBUYBkm1iQpcFLQJgsJWMbWLoha1ipbt22dR0sJNGLQMA0GCTNSysmyypBBRZxpzNGdM' + 'nffed1sY9G9qY3d57jnnwrn3KhFhI6U3pP4fBip6bqA7MLlGrQVlBIyBQBBjECNIEEAQIN8x/HUc' + 'EdpaN2fseHVLtLWypi26p5bBD1+x/AA8Hyn5mEAIJWLoiIN2HZTrYICYA8edIr19r57by81B6vXE' + 'zPjeoKYOhLmCByUfs+qBCBW1CttysNwwViyMCUHI87l+r39uOm8f1bkziYWlLTuPDQyN+TuSDpGw' + 'jbY1lq3RtkYDSgQlghghAnx+8MTkihUpuX84owHyF5KD+dls95Kv2V4fwrI1ohVKK1DrYQkQchQq' + 'Pc385Gzn2t1Dvb9sYaUrdepl//CzsGvTFLdRWoNWP9IOWYSzi8z0jwzbia3ny65xber9lRfp6dmm' + 'uEN8k4Wo9bZRmkipxKdHT+elqr69ePuAKWvg9Vzu+zL18eqbiWzQkqwg4moCUVRaUBgaZVXHThdu' + '7Z/5WfPHIa10nezMZOY7lkqK5gYH19Ho3CILmbk7hRv7en7nl73E5ZtHLo6OTT6uiznsrjZk0u9G' + 'nOS2s+W4djkQQMUbTrwdL415+WyVjje2L17bFZTl/esbo5fSB8UzbrGj9eFfB230nb8B9+jhZWYd' + 'CrIAAAAASUVORK5CYII=',
		up: 'data:image/png;base64,' + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB/ElEQVQ4jaVTTWsTURQ972OmDZOZ' + 'pEk6SVvbJqTYkhSFQqG4UKkVrHSjCPoDiqAbkYAKooi4cO3CjR8UseAvcCW4EMSiiwpBiKlUaRXb' + 'OsbQjFNn3rznoqCIjQZy4e7OPfecw71EKYV2irY1/T8C42z5iHnuzcF/YUgzC+aF1wN5rbMccOat' + 'EjFavzay0bKCeGmR0VA9GBkzzEMTps0ovd9MwY4EKhDXs/nYgURPDJNDBqaGozPxG0sXW7JgnlmY' + 'TvXFHpPBNAwI9MKDyQQqNSpWN9Vk7VLuWVOC6OkXfVas45U1PpSpfxeQ3xr4sVZHymIoDhpYXMey' + 'G2L8S2nA+ctCdPY51YmaS4zlMq6ugyi5vUFKOPUQK46Pgs1ylNE7O2fgB1fTe/unvEwcSoS/EVJB' + 'SYkVR8DbEtidZMeStz6d/4Og49TTw9251BVV2IXAVyC/0gSUVCBSIRQS1TUfFpfImPRm4vbnCQCg' + '5PiTnnzWnNtzdJiGAAglUGS7JQApJEIhIYWE64VYrvmYzkb0Yrf20L630cVP7rMfzezv701mCe5W' + 'XFQcCbkVQIY+FFMILB2UERCdAxpHOh7BiUIE9oKf//jOn+eRTl4uzS+9L452oVr9ioarQDgH0Rmo' + 'zkE0DURjIIwBjOFDI8Tlly7ergfwONtsesqtVtvf+BMch8Tnh4oYeAAAAABJRU5ErkJggg==',
		error: 'http://l.yimg.com/g/images/icon_error_x_small.png',
		ok: 'http://l.yimg.com/g/images/icon_check_small.png',
		updating: 'http://www.flickr.com/images/pulser2.gif',
		spaceout: 'http://l.yimg.com/g/images/spaceout.gif',
		spaceball: 'http://l.yimg.com/g/images/flickrmail/mail_icons_2.gif',
	paypal: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ' +
	    'bWFnZVJlYWR5ccllPAAAAulJREFUeNqUU1tIFGEU/mZ2VnfL1Ex3XV3HMRfTpFR00/IhoigtEVKI' +
	    'LlSGJfagSUUU9GL0WEFUDxElPQRSqNhDD0nZSkEXy8xuVOtlNHe9rbq2u9rOzPb/s4tpPnXgMMP8' +
	    '3/nO95/zDXP59r3s9BS+JclkFPAf0Tv4s98+OLyb403GlsINuYKsBOYPZUkCswDMctwSAj7JLODF' +
	    'q1YuwRgn+Ob88wedLz+itakdLMOAUmpYBjl5GSgq2YQwnW4RSbwhlmcDgQAkWZ7P+w+eoM8xgcio' +
	    'CMTEREKnC0dTiw2n665icmJqEZaUgpNkBbKiqIxzXh/E4XHUVJWhvHwz2jveI2vdamjDtDhw6ALu' +
	    'NjxCdU05GJZV8ZSEVUixTF5oOp0uzHhnYc1PRzPpWlVxEfUX7mDFcj3SUhPx+pMdbY/fqDOieFrL' +
	    'ylRBKL99FWGIjgRvNoIhM9i6LQ9HKnbBNelGZ7cdycZVaGxswwhRKYeUBxWEsufDDwi8UZVnta5B' +
	    '7al9sH8fwt6D9fD5ZlFXu4d0VCD2O1U8reWUQPAKkl/CgOhEaXEh/JKMY8cvQRxxgdOwyEiOx7Ur' +
	    'JzA99QvOGR9ijStDVwiAg7oFBTNuD8SxaWRmWWDr6Ebf8ARqK0uRvzETsWQbHbYu3Lj1EMVbchBn' +
	    'ilFrQBbNUQNROZ97euF2e3H2/E14ySCFuCikpJpw8sx1zPoV+EnHsp0FxA8FkFTTBYIKqF2onFhD' +
	    'NOrP7Ydz2AXHqAsl2wvQbuuGlvigqmoHkngD9BF61VwUHwxCQM1Ah5EoxENLLGuzNaOLDHNoYBRf' +
	    'BkZw9HARLOlJKlwJ+WVhECNJqm3p4LTE8lm5aUixJEAhzNnWdKzN5NWV/RtaTkNqJHDO0fH+NItF' +
	    'cHu88BAnrs9JXQL+KzkYYcSZEcv0eOcYGeCmpj2VT589bzCbTTxDvU1kzM3+BkvWRztryJMlP5Tk' +
	    'lxEWroVElNJvb4ccojg4Vv1HgAEAmtl7FxNc9+MAAAAASUVORK5CYII=',
	amazon: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAB' +
	    'y0lEQVQ4jY2TP2hTURjFf09zM1UbcGmID9xEFEyyCTo1b6uLxuCS1e4Fg4tuIlhczMMti0NwadOh' +
	    'o9DNf7wpCCYdDEL7njWgiU87NOBxeGmavryKB+5wv8t3vnPuuRdJaUnPJO3o/7Ez7klbkp4AD5jC' +
	    '9vY2jUaDz70elmVxc2mJarVKAlaRFExTe56n08YoFVu1Wi1JSYCkwXTl3vKyUsao5DjqdDqT/Xnb' +
	    'TiIYWJIGwPyhpiAI8H2f4XDIzzCk2WzSarUAGB0cxC0MZxR0u13li8UZCyljEhXMENypVJQyRvli' +
	    'Ub7vq+66/yQ4Fdd0KLdcLpPNZmm325OzMAxnc4gryBcKk4klxzmWSN11T7Dw259UPM9TzraVMkY5' +
	    '21bddVWuVLToOAq/B/rTeSl9WInWJIXNy/NcX4fMxaTHcoSt2zB3AdIZ+PQI7mqcwu5r6RXS+xUp' +
	    '9OMyj/BrV+qtST860tq52Dv40oJ3t6JJmRuw4IA5CwIsC/a2YG8Drq1H9f4buPpwaEkKgAUA+h58' +
	    'fAzfNqJGxv0Ac5eg8BxyJRiN0zBnvlqSngL3j3kddKH/FkbDiCFzBXKLSbeyiqLv/ELS/snmZ7A/' +
	    '7kn/BXFbL8ajtAhKAAAAAElFTkSuQmCC',
	bitcoin: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	    '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wHBg0ZNfsIC1AAAAIxSURBVDjL' +
	    'tZNPSJRRFMV/930z4zAzJuaYmqNBFlGQELaTaGnSplUU7oIUygShRZQxTBZFRJRCgotatKpV2MJt' +
	    'C+0fVOjGRUE0WYmWfyb7Rme+990Wps0Mtuws333nvvPOPVfYBO5AfUKRdsE0qfhZ4+tYOOy/kK5v' +
	    'buldKT1YHky0OzhDitQIGgBQxAOd8T17JtY7Pbppg49JwnVVDbcU5zSGEACqIAVvKDnBDpfp5/PS' +
	    'wypAYL1WG6+/qOKcXWvroMEYZmcbSAD1XHj/BISQ4nS7tnEe0skNBXqDimx0R1pEtgBQvZ9g2z0I' +
	    'RfFn3sJSGjt+pUCILmXnfjZWpeYzBiAbbUhukAFmJ7FTjxC16MIHzK52TGtfwb+lIhKPXgYw2knQ' +
	    'GHO81Fqn6Qj69RX+69v4U48J7DtR7Laak2seNMXD+MSK5hGOY+J7se48gaMPMNsP4r0ZKuET0wHK' +
	    'DO73Xxb+zjdYjjQcAt/ivbyJN9oJeRenurlYpOoyPeSMpPAdsU83KnUtBA73g3FwDnTitJyDQAT1' +
	    'c8UKVEYE1AD4i+5VRTMApJ+RH+nAzkxgtu5G7Qr23TDe8+sFZM2oZ68VBckdTNwRcXpAhMg2iNTg' +
	    '7DmGHe8vyaqqoncj3eneoiBlVvKXysOmyggduLOCO4udmyxOIqqofZhZyfdtuguaJLQaT3T56pwS' +
	    'oRkR84fnKzph1L9f9mN6WFLk/rlM6/h0gcp4bX0rQG7hy1hlikX+B34Dh8Le3aZfDNEAAAAASUVO' +
	    'RK5CYII='
	};

	var installPage = 'http://userscripts.org/scripts/show/76587';

// Greased MooTools
	/*
---

script: Core.js

description: The core of MooTools, contains all the base functions and the Native and Hash implementations. Required by all the other scripts.

license: MIT-style license.

copyright: Copyright (c) 2006-2008 [Valerio Proietti](http://mad4milk.net/).

authors: The MooTools production team (http://mootools.net/developers/)

inspiration:
- Class implementation inspired by [Base.js](http://dean.edwards.name/weblog/2006/03/base/) Copyright (c) 2006 Dean Edwards, [GNU Lesser General Public License](http://opensource.org/licenses/lgpl-license.php)
- Some functionality inspired by [Prototype.js](http://prototypejs.org) Copyright (c) 2005-2007 Sam Stephenson, [MIT License](http://opensource.org/licenses/mit-license.php)

provides: [MooTools, Native, Hash.base, Array.each, $util]

...
*/

	var MooTools = {
		'version': '1.2.5dev',
		'build': '168759f5904bfdaeafd6b1c0d1be16cd78b5d5c6'
	};

	var Native = function(options) {
		options = options || {};
		var name = options.name;
		var legacy = options.legacy;
		var protect = options.protect;
		var methods = options.implement;
		var generics = options.generics;
		var initialize = options.initialize;
		var afterImplement = options.afterImplement || function() {};
		var object = initialize || legacy;
		generics = generics !== false;

		object.constructor = Native;
		object.$family = { name: 'native' };
		if (legacy && initialize) object.prototype = legacy.prototype;
		if (!object.prototype) object.prototype = {};
		object.prototype.constructor = object;

		if (name) {
			var family = name.toLowerCase();
			object.prototype.$family = { name: family };
			Native.typize(object, family);
		}

		var add = function(obj, name, method, force) {
			if (!protect || force || ! obj.prototype[name]) obj.prototype[name] = method;
			if (generics) Native.genericize(obj, name, protect);
			afterImplement.call(obj, name, method);
			return obj;
		};

		object.alias = function(a1, a2, a3) {
			if (typeof a1 == 'string') {
				var pa1 = this.prototype[a1];
				if ((a1 = pa1)) return add(this, a2, a1, a3);
			}
			for (var a in a1) this.alias(a, a1[a], a2);
			return this;
		};

		object.implement = function(a1, a2, a3) {
			if (typeof a1 == 'string') return add(this, a1, a2, a3);
			for (var p in a1) add(this, p, a1[p], a2);
			return this;
		};

		if (methods) object.implement(methods);

		return object;
	};

	Native.genericize = function(object, property, check) {
		if ((!check || ! object[property]) && typeof object.prototype[property] == 'function') object[property] = function() {
			var args = Array.prototype.slice.call(arguments);
			return object.prototype[property].apply(args.shift(), args);
		};
	};

	Native.implement = function(objects, properties) {
		for (var i = 0, l = objects.length; i < l; i++) objects[i].implement(properties);
	};

	Native.typize = function(object, family) {
		if (!object.type) object.type = function(item) {
			return ($type(item) === family);
		};
	};

	(function() {
		var natives = { 'Array': Array, 'Date': Date, 'Function': Function, 'Number': Number, 'RegExp': RegExp, 'String': String };
		for (var n in natives) new Native({ name: n, initialize: natives[n], protect: true });

		var types = { 'boolean': Boolean, 'native': Native, 'object': Object };
		for (var t in types) Native.typize(types[t], t);

		var generics = {
			'Array': ["concat", "indexOf", "join", "lastIndexOf", "pop", "push", "reverse", "shift", "slice", "sort", "splice", "toString", "unshift", "valueOf"],
			'String': ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "match", "replace", "search", "slice", "split", "substr", "substring", "toLowerCase", "toUpperCase", "valueOf"]
		};
		for (var g in generics) {
			for (var i = generics[g].length; i--;) Native.genericize(natives[g], generics[g][i], true);
		}
	})();

	var Hash = new Native({

		name: 'Hash',

		initialize: function(object) {
			if ($type(object) == 'hash') object = $unlink(object.getClean());
			for (var key in object) this[key] = object[key];
			return this;
		}

	});

	Hash.implement({

		forEach: function(fn, bind) {
			for (var key in this) {
				if (this.hasOwnProperty(key)) fn.call(bind, this[key], key, this);
			}
		},

		getClean: function() {
			var clean = {};
			for (var key in this) {
				if (this.hasOwnProperty(key)) clean[key] = this[key];
			}
			return clean;
		},

		getLength: function() {
			var length = 0;
			for (var key in this) {
				if (this.hasOwnProperty(key)) length++;
			}
			return length;
		}

	});

	Hash.alias('forEach', 'each');

	Array.implement({

		forEach: function(fn, bind) {
			for (var i = 0, l = this.length; i < l; i++) fn.call(bind, this[i], i, this);
		}

	});

	Array.alias('forEach', 'each');

	function $A(iterable) {
		if (iterable.item) {
			var l = iterable.length, array = new Array(l);
			while (l--) array[l] = iterable[l];
			return array;
		}
		return Array.prototype.slice.call(iterable);
	};

	function $arguments(i) {
		return function() {
			return arguments[i];
		};
	};

	function $chk(obj) {
		return !! (obj || obj === 0);
	};

	function $clear(timer) {
		clearTimeout(timer);
		clearInterval(timer);
		return null;
	};

	function $defined(obj) {
		return (obj != undefined);
	};

	function $each(iterable, fn, bind) {
		var type = $type(iterable);
		((type == 'arguments' || type == 'collection' || type == 'array') ? Array: Hash).each(iterable, fn, bind);
	};

	function $empty() {};

	function $extend(original, extended) {
		for (var key in (extended || {})) original[key] = extended[key];
		return original;
	};

	function $H(object) {
		return new Hash(object);
	};

	function $lambda(value) {
		return ($type(value) == 'function') ? value: function() {
			return value;
		};
	};

	function $merge() {
		var args = Array.slice(arguments);
		args.unshift({});
		return $mixin.apply(null, args);
	};

	function $mixin(mix) {
		for (var i = 1, l = arguments.length; i < l; i++) {
			var object = arguments[i];
			if ($type(object) != 'object') continue;
			for (var key in object) {
				var op = object[key], mp = mix[key];
				mix[key] = (mp && $type(op) == 'object' && $type(mp) == 'object') ? $mixin(mp, op) : $unlink(op);
			}
		}
		return mix;
	};

	function $pick() {
		for (var i = 0, l = arguments.length; i < l; i++) {
			if (arguments[i] != undefined) return arguments[i];
		}
		return null;
	};

	function $random(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	};

	function $splat(obj) {
		var type = $type(obj);
		return (type) ? ((type != 'array' && type != 'arguments') ? [obj] : obj) : [];
	};

	var $time = Date.now || function() {
		return + new Date;
	};

	function $try() {
		for (var i = 0, l = arguments.length; i < l; i++) {
			try {
				return arguments[i]();
			} catch(e) {}
		}
		return null;
	};

	function $type(obj) {
		if (obj == undefined) return false;
		if (obj.$family) return (obj.$family.name == 'number' && ! isFinite(obj)) ? false: obj.$family.name;
		if (obj.nodeName) {
			switch (obj.nodeType) {
			case 1: return 'element';
			case 3: return (/\S/).test(obj.nodeValue) ? 'textnode': 'whitespace';
			}
		} else if (typeof obj.length == 'number') {
			if (obj.callee) return 'arguments';
			else if (obj.item) return 'collection';
		}
		return typeof obj;
	};

	function $unlink(object) {
		var unlinked;
		switch ($type(object)) {
		case 'object':
			unlinked = {};
			for (var p in object) unlinked[p] = $unlink(object[p]);
			break;
		case 'hash':
			unlinked = new Hash(object);
			break;
		case 'array':
			unlinked = [];
			for (var i = 0, l = object.length; i < l; i++) unlinked[i] = $unlink(object[i]);
			break;
		default: return object;
		}
		return unlinked;
	};

	/*
---

script: Browser.js

description: The Browser Core. Contains Browser initialization, Window and Document, and the Browser Hash.

license: MIT-style license.

requires: 
- /Native
- /$util

provides: [Browser, Window, Document, $exec]

...
*/

	var Browser = $merge({

		Engine: { name: 'unknown', version: 0 },

		Platform: { name: (window.orientation != undefined) ? 'ipod': (navigator.platform.match(/mac|win|linux/i) || ['other'])[0].toLowerCase() },

		Features: { xpath: !! (document.evaluate), air: !! (window.runtime), query: !! (document.querySelector) },

		Plugins: {},

		Engines: {

			presto: function() {
				return (!window.opera) ? false: ((arguments.callee.caller) ? 960: ((document.getElementsByClassName) ? 950: 925));
			},

			trident: function() {
				return (!window.ActiveXObject) ? false: ((window.XMLHttpRequest) ? ((document.querySelectorAll) ? 6: 5) : 4);
			},

			webkit: function() {
				return (navigator.taintEnabled) ? false: ((Browser.Features.xpath) ? ((Browser.Features.query) ? 525: 420) : 419);
			},

			gecko: function() {
				return (!document.getBoxObjectFor && window.mozInnerScreenX == null) ? false: ((document.getElementsByClassName) ? 19: 18);
			}

		}

	}, Browser || {});

	Browser.Platform[Browser.Platform.name] = true;

	Browser.detect = function() {

		for (var engine in this.Engines) {
			var version = this.Engines[engine]();
			if (version) {
				this.Engine = { name: engine, version: version };
				this.Engine[engine] = this.Engine[engine + version] = true;
				break;
			}
		}

		return { name: engine, version: version };

	};

	Browser.detect();

	Browser.Request = function() {
		return $try(function() {
			return new XMLHttpRequest();
		}, function() {
			return new ActiveXObject('MSXML2.XMLHTTP');
		}, function() {
			return new ActiveXObject('Microsoft.XMLHTTP');
		});
	};

	Browser.Features.xhr = !! (Browser.Request());

	Browser.Plugins.Flash = (function() {
		var version = ($try(function() {
			return navigator.plugins['Shockwave Flash'].description;
		}, function() {
			return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
		}) || '0 r0').match(/\d+/g);
		return { version: parseInt(version[0] || 0 + '.' + version[1], 10) || 0, build: parseInt(version[2], 10) || 0 };
	})();

	function $exec(text) {
		if (!text) return text;
		if (window.execScript) {
			window.execScript(text);
		} else {
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script[(Browser.Engine.webkit && Browser.Engine.version < 420) ? 'innerText': 'text'] = text;
			document.head.appendChild(script);
			document.head.removeChild(script);
		}
		return text;
	};

	Native.UID = 1;

	var $uid = (Browser.Engine.trident) ? function(item) {
		return (item.uid || (item.uid = [Native.UID++]))[0];
	}: function(item) {
		return item.uid || (item.uid = Native.UID++);
	};

	var Window = new Native({

		name: 'Window',

		legacy: (Browser.Engine.trident) ? null: window.Window,

		initialize: function(win) {
			$uid(win);
			if (!win.Element) {
				win.Element = $empty;
				if (Browser.Engine.webkit) win.document.createElement("iframe"); //fixes safari 2
				win.Element.prototype = (Browser.Engine.webkit) ? window["[[DOMElement.prototype]]"] : {};
			}
			win.document.window = win;
			return $extend(win, Window.Prototype);
		},

		afterImplement: function(property, value) {
			window[property] = Window.Prototype[property] = value;
		}

	});

	Window.Prototype = { $family: { name: 'window' } };

	new Window(window);

	var Document = new Native({

		name: 'Document',

		legacy: (Browser.Engine.trident) ? null: window.Document,

		initialize: function(doc) {
			$uid(doc);
			doc.head = doc.getElementsByTagName('head')[0];
			doc.html = doc.getElementsByTagName('html')[0];
			if (Browser.Engine.trident && Browser.Engine.version <= 4) $try(function() {
				doc.execCommand("BackgroundImageCache", false, true);
			});
			if (Browser.Engine.trident) doc.window.attachEvent('onunload', function() {
				doc.window.detachEvent('onunload', arguments.callee);
				doc.head = doc.html = doc.window = null;
			});
			return $extend(doc, Document.Prototype);
		},

		afterImplement: function(property, value) {
			document[property] = Document.Prototype[property] = value;
		}

	});

	Document.Prototype = { $family: { name: 'document' } };

	new Document(document);

	/*
---

script: Array.js

description: Contains Array Prototypes like each, contains, and erase.

license: MIT-style license.

requires:
- /$util
- /Array.each

provides: [Array]

...
*/

	Array.implement({

		every: function(fn, bind) {
			for (var i = 0, l = this.length; i < l; i++) {
				if (!fn.call(bind, this[i], i, this)) return false;
			}
			return true;
		},

		filter: function(fn, bind) {
			var results = [];
			for (var i = 0, l = this.length; i < l; i++) {
				if (fn.call(bind, this[i], i, this)) results.push(this[i]);
			}
			return results;
		},

		clean: function() {
			return this.filter($defined);
		},

		indexOf: function(item, from) {
			var len = this.length;
			for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
				if (this[i] === item) return i;
			}
			return - 1;
		},

		map: function(fn, bind) {
			var results = [];
			for (var i = 0, l = this.length; i < l; i++) results[i] = fn.call(bind, this[i], i, this);
			return results;
		},

		some: function(fn, bind) {
			for (var i = 0, l = this.length; i < l; i++) {
				if (fn.call(bind, this[i], i, this)) return true;
			}
			return false;
		},

		associate: function(keys) {
			var obj = {}, length = Math.min(this.length, keys.length);
			for (var i = 0; i < length; i++) obj[keys[i]] = this[i];
			return obj;
		},

		link: function(object) {
			var result = {};
			for (var i = 0, l = this.length; i < l; i++) {
				for (var key in object) {
					if (object[key](this[i])) {
						result[key] = this[i];
						delete object[key];
						break;
					}
				}
			}
			return result;
		},

		contains: function(item, from) {
			return this.indexOf(item, from) != - 1;
		},

		extend: function(array) {
			for (var i = 0, j = array.length; i < j; i++) this.push(array[i]);
			return this;
		},

		getLast: function() {
			return (this.length) ? this[this.length - 1] : null;
		},

		getRandom: function() {
			return (this.length) ? this[$random(0, this.length - 1)] : null;
		},

		include: function(item) {
			if (!this.contains(item)) this.push(item);
			return this;
		},

		combine: function(array) {
			for (var i = 0, l = array.length; i < l; i++) this.include(array[i]);
			return this;
		},

		erase: function(item) {
			for (var i = this.length; i--; i) {
				if (this[i] === item) this.splice(i, 1);
			}
			return this;
		},

		empty: function() {
			this.length = 0;
			return this;
		},

		flatten: function() {
			var array = [];
			for (var i = 0, l = this.length; i < l; i++) {
				var type = $type(this[i]);
				if (!type) continue;
				array = array.concat((type == 'array' || type == 'collection' || type == 'arguments') ? Array.flatten(this[i]) : this[i]);
			}
			return array;
		},

		hexToRgb: function(array) {
			if (this.length != 3) return null;
			var rgb = this.map(function(value) {
				if (value.length == 1) value += value;
				return value.toInt(16);
			});
			return (array) ? rgb: 'rgb(' + rgb + ')';
		},

		rgbToHex: function(array) {
			if (this.length < 3) return null;
			if (this.length == 4 && this[3] == 0 && ! array) return 'transparent';
			var hex = [];
			for (var i = 0; i < 3; i++) {
				var bit = (this[i] - 0).toString(16);
				hex.push((bit.length == 1) ? '0' + bit: bit);
			}
			return (array) ? hex: '#' + hex.join('');
		}

	});

	/*
---

script: String.js

description: Contains String Prototypes like camelCase, capitalize, test, and toInt.

license: MIT-style license.

requires:
- /Native

provides: [String]

...
*/

	String.implement({

		test: function(regex, params) {
			return ((typeof regex == 'string') ? new RegExp(regex, params) : regex).test(this);
		},

		contains: function(string, separator) {
			return (separator) ? (separator + this + separator).indexOf(separator + string + separator) > - 1: this.indexOf(string) > - 1;
		},

		trim: function() {
			return this.replace(/^\s+|\s+$/g, '');
		},

		clean: function() {
			return this.replace(/\s+/g, ' ').trim();
		},

		camelCase: function() {
			return this.replace(/-\D/g, function(match) {
				return match.charAt(1).toUpperCase();
			});
		},

		hyphenate: function() {
			return this.replace(/[A-Z]/g, function(match) {
				return ('-' + match.charAt(0).toLowerCase());
			});
		},

		capitalize: function() {
			return this.replace(/\b[a-z]/g, function(match) {
				return match.toUpperCase();
			});
		},

		escapeRegExp: function() {
			return this.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
		},

		toInt: function(base) {
			return parseInt(this, base || 10);
		},

		toFloat: function() {
			return parseFloat(this);
		},

		hexToRgb: function(array) {
			var hex = this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
			return (hex) ? hex.slice(1).hexToRgb(array) : null;
		},

		rgbToHex: function(array) {
			var rgb = this.match(/\d{1,3}/g);
			return (rgb) ? rgb.rgbToHex(array) : null;
		},

		stripScripts: function(option) {
			var scripts = '';
			var text = this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function() {
				scripts += arguments[1] + '\n';
				return '';
			});
			if (option === true) $exec(scripts);
			else if ($type(option) == 'function') option(scripts, text);
			return text;
		},

		substitute: function(object, regexp) {
			return this.replace(regexp || (/\\?\{([^{}]+)\}/g), function(match, name) {
				if (match.charAt(0) == '\\') return match.slice(1);
				return (object[name] != undefined) ? object[name] : '';
			});
		}

	});

	/*
---

script: Function.js

description: Contains Function Prototypes like create, bind, pass, and delay.

license: MIT-style license.

requires:
- /Native
- /$util

provides: [Function]

...
*/

	Function.implement({

		extend: function(properties) {
			for (var property in properties) this[property] = properties[property];
			return this;
		},

		create: function(options) {
			var self = this;
			options = options || {};
			return function(event) {
				var args = options.arguments;
				args = (args != undefined) ? $splat(args) : Array.slice(arguments, (options.event) ? 1: 0);
				if (options.event) args = [event || window.event].extend(args);
				var returns = function() {
					return self.apply(options.bind || null, args);
				};
				if (options.delay) return setTimeout(returns, options.delay);
				if (options.periodical) return setInterval(returns, options.periodical);
				if (options.attempt) return $try(returns);
				return returns();
			};
		},

		run: function(args, bind) {
			return this.apply(bind, $splat(args));
		},

		pass: function(args, bind) {
			return this.create({ bind: bind, arguments: args });
		},

		bind: function(bind, args) {
			return this.create({ bind: bind, arguments: args });
		},

		bindWithEvent: function(bind, args) {
			return this.create({ bind: bind, arguments: args, event: true });
		},

		attempt: function(args, bind) {
			return this.create({ bind: bind, arguments: args, attempt: true })();
		},

		delay: function(delay, bind, args) {
			return this.create({ bind: bind, arguments: args, delay: delay })();
		},

		periodical: function(periodical, bind, args) {
			return this.create({ bind: bind, arguments: args, periodical: periodical })();
		}

	});

	/*
---

script: Number.js

description: Contains Number Prototypes like limit, round, times, and ceil.

license: MIT-style license.

requires:
- /Native
- /$util

provides: [Number]

...
*/

	Number.implement({

		limit: function(min, max) {
			return Math.min(max, Math.max(min, this));
		},

		round: function(precision) {
			precision = Math.pow(10, precision || 0);
			return Math.round(this * precision) / precision;
		},

		times: function(fn, bind) {
			for (var i = 0; i < this; i++) fn.call(bind, i, this);
		},

		toFloat: function() {
			return parseFloat(this);
		},

		toInt: function(base) {
			return parseInt(this, base || 10);
		}

	});

	Number.alias('times', 'each');

	(function(math) {
		var methods = {};
		math.each(function(name) {
			if (!Number[name]) methods[name] = function() {
				return Math[name].apply(null, [this].concat($A(arguments)));
			};
		});
		Number.implement(methods);
	})(['abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'exp', 'floor', 'log', 'max', 'min', 'pow', 'sin', 'sqrt', 'tan']);

	/*
---

script: Hash.js

description: Contains Hash Prototypes. Provides a means for overcoming the JavaScript practical impossibility of extending native Objects.

license: MIT-style license.

requires:
- /Hash.base

provides: [Hash]

...
*/

	Hash.implement({

		has: Object.prototype.hasOwnProperty,

		keyOf: function(value) {
			for (var key in this) {
				if (this.hasOwnProperty(key) && this[key] === value) return key;
			}
			return null;
		},

		hasValue: function(value) {
			return (Hash.keyOf(this, value) !== null);
		},

		extend: function(properties) {
			Hash.each(properties || {}, function(value, key) {
				Hash.set(this, key, value);
			}, this);
			return this;
		},

		combine: function(properties) {
			Hash.each(properties || {}, function(value, key) {
				Hash.include(this, key, value);
			}, this);
			return this;
		},

		erase: function(key) {
			if (this.hasOwnProperty(key)) delete this[key];
			return this;
		},

		get: function(key) {
			return (this.hasOwnProperty(key)) ? this[key] : null;
		},

		set: function(key, value) {
			if (!this[key] || this.hasOwnProperty(key)) this[key] = value;
			return this;
		},

		empty: function() {
			Hash.each(this, function(value, key) {
				delete this[key];
			}, this);
			return this;
		},

		include: function(key, value) {
			if (this[key] == undefined) this[key] = value;
			return this;
		},

		map: function(fn, bind) {
			var results = new Hash;
			Hash.each(this, function(value, key) {
				results.set(key, fn.call(bind, value, key, this));
			}, this);
			return results;
		},

		filter: function(fn, bind) {
			var results = new Hash;
			Hash.each(this, function(value, key) {
				if (fn.call(bind, value, key, this)) results.set(key, value);
			}, this);
			return results;
		},

		every: function(fn, bind) {
			for (var key in this) {
				if (this.hasOwnProperty(key) && ! fn.call(bind, this[key], key)) return false;
			}
			return true;
		},

		some: function(fn, bind) {
			for (var key in this) {
				if (this.hasOwnProperty(key) && fn.call(bind, this[key], key)) return true;
			}
			return false;
		},

		getKeys: function() {
			var keys = [];
			Hash.each(this, function(value, key) {
				keys.push(key);
			});
			return keys;
		},

		getValues: function() {
			var values = [];
			Hash.each(this, function(value) {
				values.push(value);
			});
			return values;
		},

		toQueryString: function(base) {
			var queryString = [];
			Hash.each(this, function(value, key) {
				if (base) key = base + '[' + key + ']';
				var result;
				switch ($type(value)) {
				case 'object': result = Hash.toQueryString(value, key); break;
				case 'array':
					var qs = {};
					value.each(function(val, i) {
						qs[i] = val;
					});
					result = Hash.toQueryString(qs, key);
					break;
				default: result = key + '=' + encodeURIComponent(value);
				}
				if (value != undefined) queryString.push(result);
			});

			return queryString.join('&');
		}

	});

	Hash.alias({ keyOf: 'indexOf', hasValue: 'contains' });

	/*
---

script: Element.js

description: One of the most important items in MooTools. Contains the dollar function, the dollars function, and an handful of cross-browser, time-saver methods to let you easily work with HTML Elements.

license: MIT-style license.

requires:
- /Window
- /Document
- /Array
- /String
- /Function
- /Number
- /Hash

provides: [Element, Elements, $, $$, Iframe]

...
*/

	var Element = new Native({

		name: 'Element',

		legacy: window.Element,

		initialize: function(tag, props) {
			var konstructor = Element.Constructors.get(tag);
			if (konstructor) return konstructor(props);
			if (typeof tag == 'string') return document.newElement(tag, props);
			return document.id(tag).set(props);
		},

		afterImplement: function(key, value) {
			Element.Prototype[key] = value;
			if (Array[key]) return;
			Elements.implement(key, function() {
				var items = [], elements = true;
				for (var i = 0, j = this.length; i < j; i++) {
					var returns = this[i][key].apply(this[i], arguments);
					items.push(returns);
					if (elements) elements = ($type(returns) == 'element');
				}
				return (elements) ? new Elements(items) : items;
			});
		}

	});

	Element.Prototype = { $family: { name: 'element' } };

	Element.Constructors = new Hash;

	var IFrame = new Native({

		name: 'IFrame',

		generics: false,

		initialize: function() {
			var params = Array.link(arguments, { properties: Object.type, iframe: $defined });
			var props = params.properties || {};
			var iframe = document.id(params.iframe);
			var onload = props.onload || $empty;
			delete props.onload;
			props.id = props.name = $pick(props.id, props.name, iframe ? (iframe.id || iframe.name) : 'IFrame_' + $time());
			iframe = new Element(iframe || 'iframe', props);
			var onFrameLoad = function() {
				var host = $try(function() {
					return iframe.contentWindow.location.host;
				});
				if (!host || host == window.location.host) {
					var win = new Window(iframe.contentWindow);
					new Document(iframe.contentWindow.document);
					if (!win.Element.prototype) win.Element.prototype = {};
					$extend(win.Element.prototype, Element.Prototype);
				}
				onload.call(iframe.contentWindow, iframe.contentWindow.document);
			};
			var contentWindow = $try(function() {
				return iframe.contentWindow;
			});
			((contentWindow && contentWindow.document.body) || window.frames[props.id]) ? onFrameLoad() : iframe.addListener('load', onFrameLoad);
			return iframe;
		}

	});

	var Elements = new Native({

		initialize: function(elements, options) {
			options = $extend({ ddup: true, cash: true }, options);
			elements = elements || [];
			if (options.ddup || options.cash) {
				var uniques = {}, returned = [];
				for (var i = 0, l = elements.length; i < l; i++) {
					var el = document.id(elements[i], ! options.cash);
					if (options.ddup) {
						if (uniques[el.uid]) continue;
						uniques[el.uid] = true;
					}
					if (el) returned.push(el);
				}
				elements = returned;
			}
			return (options.cash) ? $extend(elements, this) : elements;
		}

	});

	Elements.implement({

		filter: function(filter, bind) {
			if (!filter) return this;
			return new Elements(Array.filter(this, (typeof filter == 'string') ? function(item) {
				return item.match(filter);
			}: filter, bind));
		}

	});

	Document.implement({

		newElement: function(tag, props) {
			if (Browser.Engine.trident && props) {
				['name', 'type', 'checked'].each(function(attribute) {
					if (!props[attribute]) return;
					tag += ' ' + attribute + '="' + props[attribute] + '"';
					if (attribute != 'checked') delete props[attribute];
				});
				tag = '<' + tag + '>';
			}
			return document.id(this.createElement(tag)).set(props);
		},

		newTextNode: function(text) {
			return this.createTextNode(text);
		},

		getDocument: function() {
			return this;
		},

		getWindow: function() {
			return this.window;
		},

		id: (function() {

			var types = {

				string: function(id, nocash, doc) {
					id = doc.getElementById(id);
					return (id) ? types.element(id, nocash) : null;
				},

				element: function(el, nocash) {
					$uid(el);
					if (!nocash && ! el.$family && ! (/^object|embed$/i).test(el.tagName)) {
						var proto = Element.Prototype;
						for (var p in proto) el[p] = proto[p];
					};
					return el;
				},

				object: function(obj, nocash, doc) {
					if (obj.toElement) return types.element(obj.toElement(doc), nocash);
					return null;
				}

			};

			types.textnode = types.whitespace = types.window = types.document = $arguments(0);

			return function(el, nocash, doc) {
				if (el && el.$family && el.uid) return el;
				var type = $type(el);
				return (types[type]) ? types[type](el, nocash, doc || document) : null;
			};

		})()

	});

	if (window.$ == null) Window.implement({
		$: function(el, nc) {
			return document.id(el, nc, this.document);
		}
	});

	Window.implement({

		$$: function(selector) {
			if (arguments.length == 1 && typeof selector == 'string') return this.document.getElements(selector);
			var elements = [];
			var args = Array.flatten(arguments);
			for (var i = 0, l = args.length; i < l; i++) {
				var item = args[i];
				switch ($type(item)) {
				case 'element': elements.push(item); break;
				case 'string': elements.extend(this.document.getElements(item, true));
				}
			}
			return new Elements(elements);
		},

		getDocument: function() {
			return this.document;
		},

		getWindow: function() {
			return this;
		}

	});

	Native.implement([Element, Document], {

		getElement: function(selector, nocash) {
			return document.id(this.getElements(selector, true)[0] || null, nocash);
		},

		getElements: function(tags, nocash) {
			tags = tags.split(',');
			var elements = [];
			var ddup = (tags.length > 1);
			tags.each(function(tag) {
				var partial = this.getElementsByTagName(tag.trim());
				(ddup) ? elements.extend(partial) : elements = partial;
			}, this);
			return new Elements(elements, { ddup: ddup, cash: ! nocash });
		}

	});

	(function() {

		var collected = {}, storage = {};
		var props = { input: 'checked', option: 'selected', textarea: (Browser.Engine.webkit && Browser.Engine.version < 420) ? 'innerHTML': 'value' };

		var get = function(uid) {
			return (storage[uid] || (storage[uid] = {}));
		};

		var clean = function(item, retain) {
			if (!item) return;
			var uid = item.uid;
			if (Browser.Engine.trident) {
				if (item.clearAttributes) {
					var clone = retain && item.cloneNode(false);
					item.clearAttributes();
					if (clone) item.mergeAttributes(clone);
				} else if (item.removeEvents) {
					item.removeEvents();
				}
				if ((/object/i).test(item.tagName)) {
					for (var p in item) {
						if (typeof item[p] == 'function') item[p] = $empty;
					}
					Element.dispose(item);
				}
			}
			if (!uid) return;
			collected[uid] = storage[uid] = null;
		};

		var purge = function() {
			Hash.each(collected, clean);
			if (Browser.Engine.trident) $A(document.getElementsByTagName('object')).each(clean);
			if (window.CollectGarbage) CollectGarbage();
			collected = storage = null;
		};

		var walk = function(element, walk, start, match, all, nocash) {
			var el = element[start || walk];
			var elements = [];
			while (el) {
				if (el.nodeType == 1 && (!match || Element.match(el, match))) {
					if (!all) return document.id(el, nocash);
					elements.push(el);
				}
				el = el[walk];
			}
			return (all) ? new Elements(elements, { ddup: false, cash: ! nocash }) : null;
		};

		var attributes = {
			'html': 'innerHTML',
			'class': 'className',
			'for': 'htmlFor',
			'defaultValue': 'defaultValue',
			'text': (Browser.Engine.trident || (Browser.Engine.webkit && Browser.Engine.version < 420)) ? 'innerText': 'textContent'
		};
		var bools = ['compact', 'nowrap', 'ismap', 'declare', 'noshade', 'checked', 'disabled', 'readonly', 'multiple', 'selected', 'noresize', 'defer'];
		var camels = ['value', 'type', 'defaultValue', 'accessKey', 'cellPadding', 'cellSpacing', 'colSpan', 'frameBorder', 'maxLength', 'readOnly', 'rowSpan', 'tabIndex', 'useMap'];

		bools = bools.associate(bools);

		Hash.extend(attributes, bools);
		Hash.extend(attributes, camels.associate(camels.map(String.toLowerCase)));

		var inserters = {

			before: function(context, element) {
				if (element.parentNode) element.parentNode.insertBefore(context, element);
			},

			after: function(context, element) {
				if (!element.parentNode) return;
				var next = element.nextSibling;
				(next) ? element.parentNode.insertBefore(context, next) : element.parentNode.appendChild(context);
			},

			bottom: function(context, element) {
				element.appendChild(context);
			},

			top: function(context, element) {
				var first = element.firstChild;
				(first) ? element.insertBefore(context, first) : element.appendChild(context);
			}

		};

		inserters.inside = inserters.bottom;

		Hash.each(inserters, function(inserter, where) {

			where = where.capitalize();

			Element.implement('inject' + where, function(el) {
				inserter(this, document.id(el, true));
				return this;
			});

			Element.implement('grab' + where, function(el) {
				inserter(document.id(el, true), this);
				return this;
			});

		});

		Element.implement({

			set: function(prop, value) {
				switch ($type(prop)) {
				case 'object':
					for (var p in prop) this.set(p, prop[p]);
					break;
				case 'string':
					var property = Element.Properties.get(prop);
					(property && property.set) ? property.set.apply(this, Array.slice(arguments, 1)) : this.setProperty(prop, value);
				}
				return this;
			},

			get: function(prop) {
				var property = Element.Properties.get(prop);
				return (property && property.get) ? property.get.apply(this, Array.slice(arguments, 1)) : this.getProperty(prop);
			},

			erase: function(prop) {
				var property = Element.Properties.get(prop);
				(property && property.erase) ? property.erase.apply(this) : this.removeProperty(prop);
				return this;
			},

			setProperty: function(attribute, value) {
				var key = attributes[attribute];
				if (value == undefined) return this.removeProperty(attribute);
				if (key && bools[attribute]) value = !! value;
				(key) ? this[key] = value: this.setAttribute(attribute, '' + value);
				return this;
			},

			setProperties: function(attributes) {
				for (var attribute in attributes) this.setProperty(attribute, attributes[attribute]);
				return this;
			},

			getProperty: function(attribute) {
				var key = attributes[attribute];
				var value = (key) ? this[key] : this.getAttribute(attribute, 2);
				return (bools[attribute]) ? !! value: (key) ? value: value || null;
			},

			getProperties: function() {
				var args = $A(arguments);
				return args.map(this.getProperty, this).associate(args);
			},

			removeProperty: function(attribute) {
				var key = attributes[attribute];
				(key) ? this[key] = (key && bools[attribute]) ? false: '': this.removeAttribute(attribute);
				return this;
			},

			removeProperties: function() {
				Array.each(arguments, this.removeProperty, this);
				return this;
			},

			hasClass: function(className) {
				return this.className.contains(className, ' ');
			},

			addClass: function(className) {
				if (!this.hasClass(className)) this.className = (this.className + ' ' + className).clean();
				return this;
			},

			removeClass: function(className) {
				this.className = this.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
				return this;
			},

			toggleClass: function(className) {
				return this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
			},

			adopt: function() {
				Array.flatten(arguments).each(function(element) {
					element = document.id(element, true);
					if (element) this.appendChild(element);
				}, this);
				return this;
			},

			appendText: function(text, where) {
				return this.grab(this.getDocument().newTextNode(text), where);
			},

			grab: function(el, where) {
				inserters[where || 'bottom'](document.id(el, true), this);
				return this;
			},

			inject: function(el, where) {
				inserters[where || 'bottom'](this, document.id(el, true));
				return this;
			},

			replaces: function(el) {
				el = document.id(el, true);
				el.parentNode.replaceChild(this, el);
				return this;
			},

			wraps: function(el, where) {
				el = document.id(el, true);
				return this.replaces(el).grab(el, where);
			},

			getPrevious: function(match, nocash) {
				return walk(this, 'previousSibling', null, match, false, nocash);
			},

			getAllPrevious: function(match, nocash) {
				return walk(this, 'previousSibling', null, match, true, nocash);
			},

			getNext: function(match, nocash) {
				return walk(this, 'nextSibling', null, match, false, nocash);
			},

			getAllNext: function(match, nocash) {
				return walk(this, 'nextSibling', null, match, true, nocash);
			},

			getFirst: function(match, nocash) {
				return walk(this, 'nextSibling', 'firstChild', match, false, nocash);
			},

			getLast: function(match, nocash) {
				return walk(this, 'previousSibling', 'lastChild', match, false, nocash);
			},

			getParent: function(match, nocash) {
				return walk(this, 'parentNode', null, match, false, nocash);
			},

			getParents: function(match, nocash) {
				return walk(this, 'parentNode', null, match, true, nocash);
			},

			getSiblings: function(match, nocash) {
				return this.getParent().getChildren(match, nocash).erase(this);
			},

			getChildren: function(match, nocash) {
				return walk(this, 'nextSibling', 'firstChild', match, true, nocash);
			},

			getWindow: function() {
				return this.ownerDocument.window;
			},

			getDocument: function() {
				return this.ownerDocument;
			},

			getElementById: function(id, nocash) {
				var el = this.ownerDocument.getElementById(id);
				if (!el) return null;
				for (var parent = el.parentNode; parent != this; parent = parent.parentNode) {
					if (!parent) return null;
				}
				return document.id(el, nocash);
			},

			getSelected: function() {
				return new Elements($A(this.options).filter(function(option) {
					return option.selected;
				}));
			},

			getComputedStyle: function(property) {
				if (this.currentStyle) return this.currentStyle[property.camelCase()];
				var computed = this.getDocument().defaultView.getComputedStyle(this, null);
				return (computed) ? computed.getPropertyValue([property.hyphenate()]) : null;
			},

			toQueryString: function() {
				var queryString = [];
				this.getElements('input, select, textarea', true).each(function(el) {
					if (!el.name || el.disabled || el.type == 'submit' || el.type == 'reset' || el.type == 'file') return;
					var value = (el.tagName.toLowerCase() == 'select') ? Element.getSelected(el).map(function(opt) {
						return opt.value;
					}) : ((el.type == 'radio' || el.type == 'checkbox') && ! el.checked) ? null: el.value;
					$splat(value).each(function(val) {
						if (typeof val != 'undefined') queryString.push(el.name + '=' + encodeURIComponent(val));
					});
				});
				return queryString.join('&');
			},

			clone: function(contents, keepid) {
				contents = contents !== false;
				var clone = this.cloneNode(contents);
				var clean = function(node, element) {
					if (!keepid) node.removeAttribute('id');
					if (Browser.Engine.trident) {
						node.clearAttributes();
						node.mergeAttributes(element);
						node.removeAttribute('uid');
						if (node.options) {
							var no = node.options, eo = element.options;
							for (var j = no.length; j--;) no[j].selected = eo[j].selected;
						}
					}
					var prop = props[element.tagName.toLowerCase()];
					if (prop && element[prop]) node[prop] = element[prop];
				};

				if (contents) {
					var ce = clone.getElementsByTagName('*'), te = this.getElementsByTagName('*');
					for (var i = ce.length; i--;) clean(ce[i], te[i]);
				}

				clean(clone, this);
				return document.id(clone);
			},

			destroy: function() {
				Element.empty(this);
				Element.dispose(this);
				clean(this, true);
				return null;
			},

			empty: function() {
				$A(this.childNodes).each(function(node) {
					Element.destroy(node);
				});
				return this;
			},

			dispose: function() {
				return (this.parentNode) ? this.parentNode.removeChild(this) : this;
			},

			hasChild: function(el) {
				el = document.id(el, true);
				if (!el) return false;
				if (Browser.Engine.webkit && Browser.Engine.version < 420) return $A(this.getElementsByTagName(el.tagName)).contains(el);
				return (this.contains) ? (this != el && this.contains(el)) : !! (this.compareDocumentPosition(el) & 16);
			},

			match: function(tag) {
				return (!tag || (tag == this) || (Element.get(this, 'tag') == tag));
			}

		});

		Native.implement([Element, Window, Document], {

			addListener: function(type, fn) {
				if (type == 'unload') {
					var old = fn, self = this;
					fn = function() {
						self.removeListener('unload', fn);
						old();
					};
				} else {
					collected[this.uid] = this;
				}
				if (this.addEventListener) this.addEventListener(type, fn, false);
				else this.attachEvent('on' + type, fn);
				return this;
			},

			removeListener: function(type, fn) {
				if (this.removeEventListener) this.removeEventListener(type, fn, false);
				else this.detachEvent('on' + type, fn);
				return this;
			},

			retrieve: function(property, dflt) {
				var storage = get(this.uid), prop = storage[property];
				if (dflt != undefined && prop == undefined) prop = storage[property] = dflt;
				return $pick(prop);
			},

			store: function(property, value) {
				var storage = get(this.uid);
				storage[property] = value;
				return this;
			},

			eliminate: function(property) {
				var storage = get(this.uid);
				delete storage[property];
				return this;
			}

		});

		window.addListener('unload', purge);

	})();

	Element.Properties = new Hash;

	Element.Properties.style = {

		set: function(style) {
			this.style.cssText = style;
		},

		get: function() {
			return this.style.cssText;
		},

		erase: function() {
			this.style.cssText = '';
		}

	};

	Element.Properties.tag = {

		get: function() {
			return this.tagName.toLowerCase();
		}

	};

	Element.Properties.html = (function() {
		var wrapper = document.createElement('div');

		var translations = {
			table: [1, '<table>', '</table>'],
			select: [1, '<select>', '</select>'],
			tbody: [2, '<table><tbody>', '</tbody></table>'],
			tr: [3, '<table><tbody><tr>', '</tr></tbody></table>']
		};
		translations.thead = translations.tfoot = translations.tbody;

		var html = {
			set: function() {
				var html = Array.flatten(arguments).join('');
				var wrap = Browser.Engine.trident && translations[this.get('tag')];
				if (wrap) {
					var first = wrapper;
					first.innerHTML = wrap[1] + html + wrap[2];
					for (var i = wrap[0]; i--;) first = first.firstChild;
					this.empty().adopt(first.childNodes);
				} else {
					this.innerHTML = html;
				}
			}
		};

		html.erase = html.set;

		return html;
	})();

	if (Browser.Engine.webkit && Browser.Engine.version < 420) Element.Properties.text = {
		get: function() {
			if (this.innerText) return this.innerText;
			var temp = this.ownerDocument.newElement('div', { html: this.innerHTML }).inject(this.ownerDocument.body);
			var text = temp.innerText;
			temp.destroy();
			return text;
		}
	};

	/*
---

script: Element.Style.js

description: Contains methods for interacting with the styles of Elements in a fashionable way.

license: MIT-style license.

requires:
- /Element

provides: [Element.Style]

...
*/

	Element.Properties.styles = { set: function(styles) {
			this.setStyles(styles);
	} };

	Element.Properties.opacity = {

		set: function(opacity, novisibility) {
			if (!novisibility) {
				if (opacity == 0) {
					if (this.style.visibility != 'hidden') this.style.visibility = 'hidden';
				} else {
					if (this.style.visibility != 'visible') this.style.visibility = 'visible';
				}
			}
			if (!this.currentStyle || ! this.currentStyle.hasLayout) this.style.zoom = 1;
			if (Browser.Engine.trident) this.style.filter = (opacity == 1) ? '': 'alpha(opacity=' + opacity * 100 + ')';
			this.style.opacity = opacity;
			this.store('opacity', opacity);
		},

		get: function() {
			return this.retrieve('opacity', 1);
		}

	};

	Element.implement({

		setOpacity: function(value) {
			return this.set('opacity', value, true);
		},

		getOpacity: function() {
			return this.get('opacity');
		},

		setStyle: function(property, value) {
			switch (property) {
			case 'opacity': return this.set('opacity', parseFloat(value));
			case 'float': property = (Browser.Engine.trident) ? 'styleFloat': 'cssFloat';
			}
			property = property.camelCase();
			if ($type(value) != 'string') {
				var map = (Element.Styles.get(property) || '@').split(' ');
				value = $splat(value).map(function(val, i) {
					if (!map[i]) return '';
					return ($type(val) == 'number') ? map[i].replace('@', Math.round(val)) : val;
				}).join(' ');
			} else if (value == String(Number(value))) {
				value = Math.round(value);
			}
			this.style[property] = value;
			return this;
		},

		getStyle: function(property) {
			switch (property) {
			case 'opacity': return this.get('opacity');
			case 'float': property = (Browser.Engine.trident) ? 'styleFloat': 'cssFloat';
			}
			property = property.camelCase();
			var result = this.style[property];
			if (!$chk(result)) {
				result = [];
				for (var style in Element.ShortStyles) {
					if (property != style) continue;
					for (var s in Element.ShortStyles[style]) result.push(this.getStyle(s));
					return result.join(' ');
				}
				result = this.getComputedStyle(property);
			}
			if (result) {
				result = String(result);
				var color = result.match(/rgba?\([\d\s,]+\)/);
				if (color) result = result.replace(color[0], color[0].rgbToHex());
			}
			if (Browser.Engine.presto || (Browser.Engine.trident && ! $chk(parseInt(result, 10)))) {
				if (property.test(/^(height|width)$/)) {
					var values = (property == 'width') ? ['left', 'right'] : ['top', 'bottom'], size = 0;
					values.each(function(value) {
						size += this.getStyle('border-' + value + '-width').toInt() + this.getStyle('padding-' + value).toInt();
					}, this);
					return this['offset' + property.capitalize()] - size + 'px';
				}
				if ((Browser.Engine.presto) && String(result).test('px')) return result;
				if (property.test(/(border(.+)Width|margin|padding)/)) return '0px';
			}
			return result;
		},

		setStyles: function(styles) {
			for (var style in styles) this.setStyle(style, styles[style]);
			return this;
		},

		getStyles: function() {
			var result = {};
			Array.flatten(arguments).each(function(key) {
				result[key] = this.getStyle(key);
			}, this);
			return result;
		}

	});

	Element.Styles = new Hash({
		left: '@px', top: '@px', bottom: '@px', right: '@px',
		width: '@px', height: '@px', maxWidth: '@px', maxHeight: '@px', minWidth: '@px', minHeight: '@px',
		backgroundColor: 'rgb(@, @, @)', backgroundPosition: '@px @px', color: 'rgb(@, @, @)',
		fontSize: '@px', letterSpacing: '@px', lineHeight: '@px', clip: 'rect(@px @px @px @px)',
		margin: '@px @px @px @px', padding: '@px @px @px @px', border: '@px @ rgb(@, @, @) @px @ rgb(@, @, @) @px @ rgb(@, @, @)',
		borderWidth: '@px @px @px @px', borderStyle: '@ @ @ @', borderColor: 'rgb(@, @, @) rgb(@, @, @) rgb(@, @, @) rgb(@, @, @)',
		zIndex: '@', 'zoom': '@', fontWeight: '@', textIndent: '@px', opacity: '@'
	});

	Element.ShortStyles = { margin: {}, padding: {}, border: {}, borderWidth: {}, borderStyle: {}, borderColor: {} };

	['Top', 'Right', 'Bottom', 'Left'].each(function(direction) {
		var Short = Element.ShortStyles;
		var All = Element.Styles;
		['margin', 'padding'].each(function(style) {
			var sd = style + direction;
			Short[style][sd] = All[sd] = '@px';
		});
		var bd = 'border' + direction;
		Short.border[bd] = All[bd] = '@px @ rgb(@, @, @)';
		var bdw = bd + 'Width', bds = bd + 'Style', bdc = bd + 'Color';
		Short[bd] = {};
		Short.borderWidth[bdw] = Short[bd][bdw] = All[bdw] = '@px';
		Short.borderStyle[bds] = Short[bd][bds] = All[bds] = '@';
		Short.borderColor[bdc] = Short[bd][bdc] = All[bdc] = 'rgb(@, @, @)';
	});

	/*
---

script: Element.Dimensions.js

description: Contains methods to work with size, scroll, or positioning of Elements and the window object.

license: MIT-style license.

credits:
- Element positioning based on the [qooxdoo](http://qooxdoo.org/) code and smart browser fixes, [LGPL License](http://www.gnu.org/licenses/lgpl.html).
- Viewport dimensions based on [YUI](http://developer.yahoo.com/yui/) code, [BSD License](http://developer.yahoo.com/yui/license.html).

requires:
- /Element

provides: [Element.Dimensions]

...
*/

	(function() {

		Element.implement({

			scrollTo: function(x, y) {
				if (isBody(this)) {
					this.getWindow().scrollTo(x, y);
				} else {
					this.scrollLeft = x;
					this.scrollTop = y;
				}
				return this;
			},

			getSize: function() {
				if (isBody(this)) return this.getWindow().getSize();
				return { x: this.offsetWidth, y: this.offsetHeight };
			},

			getScrollSize: function() {
				if (isBody(this)) return this.getWindow().getScrollSize();
				return { x: this.scrollWidth, y: this.scrollHeight };
			},

			getScroll: function() {
				if (isBody(this)) return this.getWindow().getScroll();
				return { x: this.scrollLeft, y: this.scrollTop };
			},

			getScrolls: function() {
				var element = this, position = { x: 0, y: 0 };
				while (element && ! isBody(element)) {
					position.x += element.scrollLeft;
					position.y += element.scrollTop;
					element = element.parentNode;
				}
				return position;
			},

			getOffsetParent: function() {
				var element = this;
				if (isBody(element)) return null;
				if (!Browser.Engine.trident) return element.offsetParent;
				while ((element = element.parentNode) && ! isBody(element)) {
					if (styleString(element, 'position') != 'static') return element;
				}
				return null;
			},

			getOffsets: function() {
				if (this.getBoundingClientRect) {
					var bound = this.getBoundingClientRect(),
					html = document.id(this.getDocument().documentElement),
					//htmlScroll = html.getScroll(),
					htmlScroll = { x: 0, y: 0 },
					elemScrolls = this.getScrolls(),
					elemScroll = this.getScroll(),
					isFixed = (styleString(this, 'position') == 'fixed');

					return {
						x: bound.left.toInt() + elemScrolls.x - elemScroll.x + ((isFixed) ? 0: htmlScroll.x) - html.clientLeft,
						y: bound.top.toInt() + elemScrolls.y - elemScroll.y + ((isFixed) ? 0: htmlScroll.y) - html.clientTop
					};
				}

				var element = this, position = { x: 0, y: 0 };
				if (isBody(this)) return position;

				while (element && ! isBody(element)) {
					position.x += element.offsetLeft;
					position.y += element.offsetTop;

					if (Browser.Engine.gecko) {
						if (!borderBox(element)) {
							position.x += leftBorder(element);
							position.y += topBorder(element);
						}
						var parent = element.parentNode;
						if (parent && styleString(parent, 'overflow') != 'visible') {
							position.x += leftBorder(parent);
							position.y += topBorder(parent);
						}
					} else if (element != this && Browser.Engine.webkit) {
						position.x += leftBorder(element);
						position.y += topBorder(element);
					}

					element = element.offsetParent;
				}
				if (Browser.Engine.gecko && ! borderBox(this)) {
					position.x -= leftBorder(this);
					position.y -= topBorder(this);
				}
				return position;
			},

			getPosition: function(relative) {
				if (isBody(this)) return { x: 0, y: 0 };
				var offset = this.getOffsets(),
				scroll = this.getScrolls();
				var position = {
					x: offset.x - scroll.x,
					y: offset.y - scroll.y
				};
				var relativePosition = (relative && (relative = document.id(relative))) ? relative.getPosition() : { x: 0, y: 0 };
				return { x: position.x - relativePosition.x, y: position.y - relativePosition.y };
			},

			getCoordinates: function(element) {
				if (isBody(this)) return this.getWindow().getCoordinates();
				var position = this.getPosition(element),
				size = this.getSize();
				var obj = {
					left: position.x,
					top: position.y,
					width: size.x,
					height: size.y
				};
				obj.right = obj.left + obj.width;
				obj.bottom = obj.top + obj.height;
				return obj;
			},

			computePosition: function(obj) {
				return {
					left: obj.x - styleNumber(this, 'margin-left'),
					top: obj.y - styleNumber(this, 'margin-top')
				};
			},

			setPosition: function(obj) {
				return this.setStyles(this.computePosition(obj));
			}

		});

		Native.implement([Document, Window], {

			getSize: function() {
				if (Browser.Engine.presto || Browser.Engine.webkit) {
					var win = this.getWindow();
					return { x: win.innerWidth, y: win.innerHeight };
				}
				var doc = getCompatElement(this);
				return { x: doc.clientWidth, y: doc.clientHeight };
			},

			getScroll: function() {
				var win = this.getWindow(), doc = getCompatElement(this);
				return { x: win.pageXOffset || doc.scrollLeft, y: win.pageYOffset || doc.scrollTop };
			},

			getScrollSize: function() {
				var doc = getCompatElement(this), min = this.getSize();
				return { x: Math.max(doc.scrollWidth, min.x), y: Math.max(doc.scrollHeight, min.y) };
			},

			getPosition: function() {
				return { x: 0, y: 0 };
			},

			getCoordinates: function() {
				var size = this.getSize();
				return { top: 0, left: 0, bottom: size.y, right: size.x, height: size.y, width: size.x };
			}

		});

		// private methods
		var styleString = Element.getComputedStyle;

		function styleNumber(element, style) {
			return styleString(element, style).toInt() || 0;
		};

		function borderBox(element) {
			return styleString(element, '-moz-box-sizing') == 'border-box';
		};

		function topBorder(element) {
			return styleNumber(element, 'border-top-width');
		};

		function leftBorder(element) {
			return styleNumber(element, 'border-left-width');
		};

		function isBody(element) {
			return (/^(?:body|html)$/i).test(element.tagName);
		};

		function getCompatElement(element) {
			var doc = element.getDocument();
			return (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html: doc.body;
		};

	})();

	//aliases
	Element.alias('setPosition', 'position'); //compatability
	Native.implement([Window, Document, Element], {

		getHeight: function() {
			return this.getSize().y;
		},

		getWidth: function() {
			return this.getSize().x;
		},

		getScrollTop: function() {
			return this.getScroll().y;
		},

		getScrollLeft: function() {
			return this.getScroll().x;
		},

		getScrollHeight: function() {
			return this.getScrollSize().y;
		},

		getScrollWidth: function() {
			return this.getScrollSize().x;
		},

		getTop: function() {
			return this.getPosition().y;
		},

		getLeft: function() {
			return this.getPosition().x;
		}

	});

	/*
---

script: Selectors.js

description: Adds advanced CSS-style querying capabilities for targeting HTML Elements. Includes pseudo selectors.

license: MIT-style license.

requires:
- /Element

provides: [Selectors]

...
*/

	Native.implement([Document, Element], {

		getElements: function(expression, nocash) {
			expression = expression.split(',');
			var items, local = {};
			for (var i = 0, l = expression.length; i < l; i++) {
				var selector = expression[i], elements = Selectors.Utils.search(this, selector, local);
				if (i != 0 && elements.item) elements = $A(elements);
				items = (i == 0) ? elements: (items.item) ? $A(items).concat(elements) : items.concat(elements);
			}
			return new Elements(items, { ddup: (expression.length > 1), cash: ! nocash });
		}

	});

	Element.implement({

		match: function(selector) {
			if (!selector || (selector == this)) return true;
			var tagid = Selectors.Utils.parseTagAndID(selector);
			var tag = tagid[0], id = tagid[1];
			if (!Selectors.Filters.byID(this, id) || ! Selectors.Filters.byTag(this, tag)) return false;
			var parsed = Selectors.Utils.parseSelector(selector);
			return (parsed) ? Selectors.Utils.filter(this, parsed, {}) : true;
		}

	});

	var Selectors = { Cache: { nth: {}, parsed: {} } };

	Selectors.RegExps = {
		id: (/#([\w-]+)/),
		tag: (/^(\w+|\*)/),
		quick: (/^(\w+|\*)$/),
		splitter: (/\s*([+>~\s])\s*([a-zA-Z#.*:\[])/g),
		combined: (/\.([\w-]+)|\[(\w+)(?:([!*^$~|]?=)(["']?)([^\4]*?)\4)?\]|:([\w-]+)(?:\(["']?(.*?)?["']?\)|$)/g)
	};

	Selectors.Utils = {

		chk: function(item, uniques) {
			if (!uniques) return true;
			var uid = $uid(item);
			if (!uniques[uid]) return uniques[uid] = true;
			return false;
		},

		parseNthArgument: function(argument) {
			if (Selectors.Cache.nth[argument]) return Selectors.Cache.nth[argument];
			var parsed = argument.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);
			if (!parsed) return false;
			var inta = parseInt(parsed[1], 10);
			var a = (inta || inta === 0) ? inta: 1;
			var special = parsed[2] || false;
			var b = parseInt(parsed[3], 10) || 0;
			if (a != 0) {
				b--;
				while (b < 1) b += a;
				while (b >= a) b -= a;
			} else {
				a = b;
				special = 'index';
			}
			switch (special) {
			case 'n': parsed = { a: a, b: b, special: 'n' }; break;
			case 'odd': parsed = { a: 2, b: 0, special: 'n' }; break;
			case 'even': parsed = { a: 2, b: 1, special: 'n' }; break;
			case 'first': parsed = { a: 0, special: 'index' }; break;
			case 'last': parsed = { special: 'last-child' }; break;
			case 'only': parsed = { special: 'only-child' }; break;
			default: parsed = { a: (a - 1), special: 'index' }; 
			}

			return Selectors.Cache.nth[argument] = parsed;
		},

		parseSelector: function(selector) {
			if (Selectors.Cache.parsed[selector]) return Selectors.Cache.parsed[selector];
			var m, parsed = { classes: [], pseudos: [], attributes: [] };
			while ((m = Selectors.RegExps.combined.exec(selector))) {
				var cn = m[1], an = m[2], ao = m[3], av = m[5], pn = m[6], pa = m[7];
				if (cn) {
					parsed.classes.push(cn);
				} else if (pn) {
					var parser = Selectors.Pseudo.get(pn);
					if (parser) parsed.pseudos.push({ parser: parser, argument: pa });
					else parsed.attributes.push({ name: pn, operator: '=', value: pa });
				} else if (an) {
					parsed.attributes.push({ name: an, operator: ao, value: av });
				}
			}
			if (!parsed.classes.length) delete parsed.classes;
			if (!parsed.attributes.length) delete parsed.attributes;
			if (!parsed.pseudos.length) delete parsed.pseudos;
			if (!parsed.classes && ! parsed.attributes && ! parsed.pseudos) parsed = null;
			return Selectors.Cache.parsed[selector] = parsed;
		},

		parseTagAndID: function(selector) {
			var tag = selector.match(Selectors.RegExps.tag);
			var id = selector.match(Selectors.RegExps.id);
			return [(tag) ? tag[1] : '*', (id) ? id[1] : false];
		},

		filter: function(item, parsed, local) {
			var i;
			if (parsed.classes) {
				for (i = parsed.classes.length; i--; i) {
					var cn = parsed.classes[i];
					if (!Selectors.Filters.byClass(item, cn)) return false;
				}
			}
			if (parsed.attributes) {
				for (i = parsed.attributes.length; i--; i) {
					var att = parsed.attributes[i];
					if (!Selectors.Filters.byAttribute(item, att.name, att.operator, att.value)) return false;
				}
			}
			if (parsed.pseudos) {
				for (i = parsed.pseudos.length; i--; i) {
					var psd = parsed.pseudos[i];
					if (!Selectors.Filters.byPseudo(item, psd.parser, psd.argument, local)) return false;
				}
			}
			return true;
		},

		getByTagAndID: function(ctx, tag, id) {
			if (id) {
				var item = (ctx.getElementById) ? ctx.getElementById(id, true) : Element.getElementById(ctx, id, true);
				return (item && Selectors.Filters.byTag(item, tag)) ? [item] : [];
			} else {
				return ctx.getElementsByTagName(tag);
			}
		},

		search: function(self, expression, local) {
			var splitters = [];

			var selectors = expression.trim().replace(Selectors.RegExps.splitter, function(m0, m1, m2) {
				splitters.push(m1);
				return ':)' + m2;
			}).split(':)');

			var items, filtered, item;

			for (var i = 0, l = selectors.length; i < l; i++) {

				var selector = selectors[i];

				if (i == 0 && Selectors.RegExps.quick.test(selector)) {
					items = self.getElementsByTagName(selector);
					continue;
				}

				var splitter = splitters[i - 1];

				var tagid = Selectors.Utils.parseTagAndID(selector);
				var tag = tagid[0], id = tagid[1];

				if (i == 0) {
					items = Selectors.Utils.getByTagAndID(self, tag, id);
				} else {
					var uniques = {}, found = [];
					for (var j = 0, k = items.length; j < k; j++) found = Selectors.Getters[splitter](found, items[j], tag, id, uniques);
					items = found;
				}

				var parsed = Selectors.Utils.parseSelector(selector);

				if (parsed) {
					filtered = [];
					for (var m = 0, n = items.length; m < n; m++) {
						item = items[m];
						if (Selectors.Utils.filter(item, parsed, local)) filtered.push(item);
					}
					items = filtered;
				}

			}

			return items;

		}

	};

	Selectors.Getters = {

		' ': function(found, self, tag, id, uniques) {
			var items = Selectors.Utils.getByTagAndID(self, tag, id);
			for (var i = 0, l = items.length; i < l; i++) {
				var item = items[i];
				if (Selectors.Utils.chk(item, uniques)) found.push(item);
			}
			return found;
		},

		'>': function(found, self, tag, id, uniques) {
			var children = Selectors.Utils.getByTagAndID(self, tag, id);
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i];
				if (child.parentNode == self && Selectors.Utils.chk(child, uniques)) found.push(child);
			}
			return found;
		},

		'+': function(found, self, tag, id, uniques) {
			while ((self = self.nextSibling)) {
				if (self.nodeType == 1) {
					if (Selectors.Utils.chk(self, uniques) && Selectors.Filters.byTag(self, tag) && Selectors.Filters.byID(self, id)) found.push(self);
					break;
				}
			}
			return found;
		},

		'~': function(found, self, tag, id, uniques) {
			while ((self = self.nextSibling)) {
				if (self.nodeType == 1) {
					if (!Selectors.Utils.chk(self, uniques)) break;
					if (Selectors.Filters.byTag(self, tag) && Selectors.Filters.byID(self, id)) found.push(self);
				}
			}
			return found;
		}

	};

	Selectors.Filters = {

		byTag: function(self, tag) {
			return (tag == '*' || (self.tagName && self.tagName.toLowerCase() == tag));
		},

		byID: function(self, id) {
			return (!id || (self.id && self.id == id));
		},

		byClass: function(self, klass) {
			return (self.className && self.className.contains && self.className.contains(klass, ' '));
		},

		byPseudo: function(self, parser, argument, local) {
			return parser.call(self, argument, local);
		},

		byAttribute: function(self, name, operator, value) {
			var result = Element.prototype.getProperty.call(self, name);
			if (!result) return (operator == '!=');
			if (!operator || value == undefined) return true;
			switch (operator) {
			case '=': return (result == value);
			case '*=': return (result.contains(value));
			case '^=': return (result.substr(0, value.length) == value);
			case '$=': return (result.substr(result.length - value.length) == value);
			case '!=': return (result != value);
			case '~=': return result.contains(value, ' ');
			case '|=': return result.contains(value, '-');
			}
			return false;
		}

	};

	Selectors.Pseudo = new Hash({

		// w3c pseudo selectors
		checked: function() {
			return this.checked;
		},

		empty: function() {
			return ! (this.innerText || this.textContent || '').length;
		},

		not: function(selector) {
			return ! Element.match(this, selector);
		},

		contains: function(text) {
			return (this.innerText || this.textContent || '').contains(text);
		},

		'first-child': function() {
			return Selectors.Pseudo.index.call(this, 0);
		},

		'last-child': function() {
			var element = this;
			while ((element = element.nextSibling)) {
				if (element.nodeType == 1) return false;
			}
			return true;
		},

		'only-child': function() {
			var prev = this;
			while ((prev = prev.previousSibling)) {
				if (prev.nodeType == 1) return false;
			}
			var next = this;
			while ((next = next.nextSibling)) {
				if (next.nodeType == 1) return false;
			}
			return true;
		},

		'nth-child': function(argument, local) {
			argument = (argument == undefined) ? 'n': argument;
			var parsed = Selectors.Utils.parseNthArgument(argument);
			if (parsed.special != 'n') return Selectors.Pseudo[parsed.special].call(this, parsed.a, local);
			var count = 0;
			local.positions = local.positions || {};
			var uid = $uid(this);
			if (!local.positions[uid]) {
				var self = this;
				while ((self = self.previousSibling)) {
					if (self.nodeType != 1) continue;
					count++;
					var position = local.positions[$uid(self)];
					if (position != undefined) {
						count = position + count;
						break;
					}
				}
				local.positions[uid] = count;
			}
			return (local.positions[uid] % parsed.a == parsed.b);
		},

		// custom pseudo selectors

		index: function(index) {
			var element = this, count = 0;
			while ((element = element.previousSibling)) {
				if (element.nodeType == 1 && ++count > index) return false;
			}
			return (count == index);
		},

		even: function(argument, local) {
			return Selectors.Pseudo['nth-child'].call(this, '2n+1', local);
		},

		odd: function(argument, local) {
			return Selectors.Pseudo['nth-child'].call(this, '2n', local);
		},

		selected: function() {
			return this.selected;
		},

		enabled: function() {
			return (this.disabled === false);
		}

	});

	/*
---

script: Event.js

description: Contains the Event Class, to make the event object cross-browser.

license: MIT-style license.

requires:
- /Window
- /Document
- /Hash
- /Array
- /Function
- /String

provides: [Event]

...
*/

	var Event = new Native({

		name: 'Event',

		initialize: function(event, win) {
			win = win || window;
			var doc = win.document;
			event = event || win.event;
			if (event.$extended) return event;
			this.$extended = true;
			var type = event.type;
			var target = event.target || event.srcElement;
			while (target && target.nodeType == 3) target = target.parentNode;

			if (type.test(/key/)) {
				var code = event.which || event.keyCode;
				var key = Event.Keys.keyOf(code);
				if (type == 'keydown') {
					var fKey = code - 111;
					if (fKey > 0 && fKey < 13) key = 'f' + fKey;
				}
				key = key || String.fromCharCode(code).toLowerCase();
			} else if (type.match(/(click|mouse|menu)/i)) {
				doc = (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html: doc.body;
				var page = {
					x: event.pageX || event.clientX + doc.scrollLeft,
					y: event.pageY || event.clientY + doc.scrollTop
				};
				var client = {
					x: (event.pageX) ? event.pageX - win.pageXOffset: event.clientX,
					y: (event.pageY) ? event.pageY - win.pageYOffset: event.clientY
				};
				if (type.match(/DOMMouseScroll|mousewheel/)) {
					var wheel = (event.wheelDelta) ? event.wheelDelta / 120: - (event.detail || 0) / 3;
				}
				var rightClick = (event.which == 3) || (event.button == 2);
				var related = null;
				if (type.match(/over|out/)) {
					switch (type) {
					case 'mouseover': related = event.relatedTarget || event.fromElement; break;
					case 'mouseout': related = event.relatedTarget || event.toElement;
					}
					if (! (function() {
						while (related && related.nodeType == 3) related = related.parentNode;
						return true;
					}).create({ attempt: Browser.Engine.gecko })()) related = false;
				}
			}

			return $extend(this, {
				event: event,
				type: type,

				page: page,
				client: client,
				rightClick: rightClick,

				wheel: wheel,

				relatedTarget: related,
				target: target,

				code: code,
				key: key,

				shift: event.shiftKey,
				control: event.ctrlKey,
				alt: event.altKey,
				meta: event.metaKey
			});
		}

	});

	Event.Keys = new Hash({
		'enter': 13,
		'up': 38,
		'down': 40,
		'left': 37,
		'right': 39,
		'esc': 27,
		'space': 32,
		'backspace': 8,
		'tab': 9,
		'delete': 46
	});

	Event.implement({

		stop: function() {
			return this.stopPropagation().preventDefault();
		},

		stopPropagation: function() {
			if (this.event.stopPropagation) this.event.stopPropagation();
			else this.event.cancelBubble = true;
			return this;
		},

		preventDefault: function() {
			if (this.event.preventDefault) this.event.preventDefault();
			else this.event.returnValue = false;
			return this;
		}

	});

	/*
---

script: Element.Event.js

description: Contains Element methods for dealing with events. This file also includes mouseenter and mouseleave custom Element Events.

license: MIT-style license.

requires: 
- /Element
- /Event

provides: [Element.Event]

...
*/

	Element.Properties.events = { set: function(events) {
			this.addEvents(events);
		} };

	Native.implement([Element, Window, Document], {

		addEvent: function(type, fn) {
			var events = this.retrieve('events', {});
			events[type] = events[type] || { 'keys': [], 'values': [] };
			if (events[type].keys.contains(fn)) return this;
			events[type].keys.push(fn);
			var realType = type, custom = Element.Events.get(type), condition = fn, self = this;
			if (custom) {
				if (custom.onAdd) custom.onAdd.call(this, fn);
				if (custom.condition) {
					condition = function(event) {
						if (custom.condition.call(this, event)) return fn.call(this, event);
						return true;
					};
				}
				realType = custom.base || realType;
			}
			var defn = function() {
				return fn.call(self);
			};
			var nativeEvent = Element.NativeEvents[realType];
			if (nativeEvent) {
				if (nativeEvent == 2) {
					defn = function(event) {
						event = new Event(event, self.getWindow());
						if (condition.call(self, event) === false) event.stop();
					};
				}
				this.addListener(realType, defn);
			}
			events[type].values.push(defn);
			return this;
		},

		removeEvent: function(type, fn) {
			var events = this.retrieve('events');
			if (!events || ! events[type]) return this;
			var pos = events[type].keys.indexOf(fn);
			if (pos == - 1) return this;
			events[type].keys.splice(pos, 1);
			var value = events[type].values.splice(pos, 1)[0];
			var custom = Element.Events.get(type);
			if (custom) {
				if (custom.onRemove) custom.onRemove.call(this, fn);
				type = custom.base || type;
			}
			return (Element.NativeEvents[type]) ? this.removeListener(type, value) : this;
		},

		addEvents: function(events) {
			for (var event in events) this.addEvent(event, events[event]);
			return this;
		},

		removeEvents: function(events) {
			var type;
			if ($type(events) == 'object') {
				for (type in events) this.removeEvent(type, events[type]);
				return this;
			}
			var attached = this.retrieve('events');
			if (!attached) return this;
			if (!events) {
				for (type in attached) this.removeEvents(type);
				this.eliminate('events');
			} else if (attached[events]) {
				while (attached[events].keys[0]) this.removeEvent(events, attached[events].keys[0]);
				attached[events] = null;
			}
			return this;
		},

		fireEvent: function(type, args, delay) {
			var events = this.retrieve('events');
			if (!events || ! events[type]) return this;
			events[type].keys.each(function(fn) {
				fn.create({ 'bind': this, 'delay': delay, 'arguments': args })();
			}, this);
			return this;
		},

		cloneEvents: function(from, type) {
			from = document.id(from);
			var fevents = from.retrieve('events');
			if (!fevents) return this;
			if (!type) {
				for (var evType in fevents) this.cloneEvents(from, evType);
			} else if (fevents[type]) {
				fevents[type].keys.each(function(fn) {
					this.addEvent(type, fn);
				}, this);
			}
			return this;
		}

	});

	Element.NativeEvents = {
		click: 2, dblclick: 2, mouseup: 2, mousedown: 2, contextmenu: 2, //mouse buttons
		mousewheel: 2, DOMMouseScroll: 2, //mouse wheel
		mouseover: 2, mouseout: 2, mousemove: 2, selectstart: 2, selectend: 2, //mouse movement
		keydown: 2, keypress: 2, keyup: 2, //keyboard
		focus: 2, blur: 2, change: 2, reset: 2, select: 2, submit: 2, //form elements
		load: 1, unload: 1, beforeunload: 2, resize: 1, move: 1, DOMContentLoaded: 1, readystatechange: 1, //window
		error: 1, abort: 1, scroll: 1 //misc
	};

	(function() {

		var $check = function(event) {
			var related = event.relatedTarget;
			if (related == undefined) return true;
			if (related === false) return false;
			return ($type(this) != 'document' && related != this && related.prefix != 'xul' && ! this.hasChild(related));
		};

		Element.Events = new Hash({

			mouseenter: {
				base: 'mouseover',
				condition: $check
			},

			mouseleave: {
				base: 'mouseout',
				condition: $check
			},

			mousewheel: {
				base: (Browser.Engine.gecko) ? 'DOMMouseScroll': 'mousewheel'
			}

		});

	})();

	/*
---

script: Class.js

description: Contains the Class Function for easily creating, extending, and implementing reusable Classes.

license: MIT-style license.

requires:
- /$util
- /Native
- /Array
- /String
- /Function
- /Number
- /Hash

provides: [Class]

...
*/

	function Class(params) {

		if (params instanceof Function) params = { initialize: params };

		var newClass = function() {
			Object.reset(this);
			if (newClass._prototyping) return this;
			this._current = $empty;
			var value = (this.initialize) ? this.initialize.apply(this, arguments) : this;
			delete this._current; delete this.caller;
			return value;
		}.extend(this);

		newClass.implement(params);

		newClass.constructor = Class;
		newClass.prototype.constructor = newClass;

		return newClass;

	};

	Function.prototype.protect = function() {
		this._protected = true;
		return this;
	};

	Object.reset = function(object, key) {

		if (key == null) {
			for (var p in object) Object.reset(object, p);
			return object;
		}

		delete object[key];

		switch ($type(object[key])) {
		case 'object':
			var F = function() {};
			F.prototype = object[key];
			var i = new F;
			object[key] = Object.reset(i);
			break;
		case 'array': object[key] = $unlink(object[key]); break;
		}

		return object;

	};

	new Native({ name: 'Class', initialize: Class }).extend({

		instantiate: function(F) {
			F._prototyping = true;
			var proto = new F;
			delete F._prototyping;
			return proto;
		},

		wrap: function(self, key, method) {
			if (method._origin) method = method._origin;

			return function() {
				if (method._protected && this._current == null) throw new Error('The method "' + key + '" cannot be called.');
				var caller = this.caller, current = this._current;
				this.caller = current; this._current = arguments.callee;
				var result = method.apply(this, arguments);
				this._current = current; this.caller = caller;
				return result;
			}.extend({ _owner: self, _origin: method, _name: key });

		}

	});

	Class.implement({

		implement: function(key, value) {

			if ($type(key) == 'object') {
				for (var p in key) this.implement(p, key[p]);
				return this;
			}

			var mutator = Class.Mutators[key];

			if (mutator) {
				value = mutator.call(this, value);
				if (value == null) return this;
			}

			var proto = this.prototype;

			switch ($type(value)) {

			case 'function':
				if (value._hidden) return this;
				proto[key] = Class.wrap(this, key, value);
				break;

			case 'object':
				var previous = proto[key];
				if ($type(previous) == 'object') $mixin(previous, value);
				else proto[key] = $unlink(value);
				break;

			case 'array':
				proto[key] = $unlink(value);
				break;

			default: proto[key] = value;

			}

			return this;

		}

	});

	Class.Mutators = {

		Extends: function(parent) {

			this.parent = parent;
			this.prototype = Class.instantiate(parent);

			this.implement('parent', function() {
				var name = this.caller._name, previous = this.caller._owner.parent.prototype[name];
				if (!previous) throw new Error('The method "' + name + '" has no parent.');
				return previous.apply(this, arguments);
			}.protect());

		},

		Implements: function(items) {
			$splat(items).each(function(item) {
				if (item instanceof Function) item = Class.instantiate(item);
				this.implement(item);
			}, this);

		}

	};

	/*
---

script: Class.Extras.js

description: Contains Utility Classes that can be implemented into your own Classes to ease the execution of many common tasks.

license: MIT-style license.

requires:
- /Class

provides: [Chain, Events, Options]

...
*/

	var Chain = new Class({

		$chain: [],

		chain: function() {
			this.$chain.extend(Array.flatten(arguments));
			return this;
		},

		callChain: function() {
			return (this.$chain.length) ? this.$chain.shift().apply(this, arguments) : false;
		},

		clearChain: function() {
			this.$chain.empty();
			return this;
		}

	});

	var Events = new Class({

		$events: {},

		addEvent: function(type, fn, internal) {
			type = Events.removeOn(type);
			if (fn != $empty) {
				this.$events[type] = this.$events[type] || [];
				this.$events[type].include(fn);
				if (internal) fn.internal = true;
			}
			return this;
		},

		addEvents: function(events) {
			for (var type in events) this.addEvent(type, events[type]);
			return this;
		},

		fireEvent: function(type, args, delay) {
			type = Events.removeOn(type);
			if (!this.$events || ! this.$events[type]) return this;
			this.$events[type].each(function(fn) {
				fn.create({ 'bind': this, 'delay': delay, 'arguments': args })();
			}, this);
			return this;
		},

		removeEvent: function(type, fn) {
			type = Events.removeOn(type);
			if (!this.$events[type]) return this;
			if (!fn.internal) this.$events[type].erase(fn);
			return this;
		},

		removeEvents: function(events) {
			var type;
			if ($type(events) == 'object') {
				for (type in events) this.removeEvent(type, events[type]);
				return this;
			}
			if (events) events = Events.removeOn(events);
			for (type in this.$events) {
				if (events && events != type) continue;
				var fns = this.$events[type];
				for (var i = fns.length; i--; i) this.removeEvent(type, fns[i]);
			}
			return this;
		}

	});

	Events.removeOn = function(string) {
		return string.replace(/^on([A-Z])/, function(full, first) {
			return first.toLowerCase();
		});
	};

	var Options = new Class({

		setOptions: function() {
			this.options = $merge.run([this.options].extend(arguments));
			if (!this.addEvent) return this;
			for (var option in this.options) {
				if ($type(this.options[option]) != 'function' || ! (/^on[A-Z]/).test(option)) continue;
				this.addEvent(option, this.options[option]);
				delete this.options[option];
			}
			return this;
		}

	});

	/*
---

script: Request.js

description: Powerful all purpose Request Class. Uses XMLHTTPRequest.

license: MIT-style license.

requires:
- /Element
- /Chain
- /Events
- /Options
- /Browser

provides: [Request]

...
*/

	var Request = new Class({

		Implements: [Chain, Events, Options],

		options: { /*
		onRequest: $empty,
		onComplete: $empty,
		onCancel: $empty,
		onSuccess: $empty,
		onFailure: $empty,
		onException: $empty,*/
			url: '',
			data: '',
			headers: {
				'X-Requested-With': 'XMLHttpRequest',
				'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
			},
			async: true,
			format: false,
			method: 'post',
			link: 'ignore',
			isSuccess: null,
			emulation: true,
			urlEncoded: true,
			encoding: 'utf-8',
			evalScripts: false,
			evalResponse: false,
			noCache: false
		},

		initialize: function(options) {
			this.xhr = new Browser.Request();
			this.setOptions(options);
			this.options.isSuccess = this.options.isSuccess || this.isSuccess;
			this.headers = new Hash(this.options.headers);
		},

		onStateChange: function() {
			if (this.xhr.readyState != 4 || ! this.running) return;
			this.running = false;
			this.status = 0;
			$try(function() {
				this.status = this.xhr.status;
			}.bind(this));
			this.xhr.onreadystatechange = $empty;
			if (this.options.isSuccess.call(this, this.status)) {
				this.response = { text: this.xhr.responseText, xml: this.xhr.responseXML };
				this.success(this.response.text, this.response.xml);
			} else {
				this.response = { text: null, xml: null };
				this.failure();
			}
		},

		isSuccess: function() {
			return ((this.status >= 200) && (this.status < 300));
		},

		processScripts: function(text) {
			if (this.options.evalResponse || (/(ecma|java)script/).test(this.getHeader('Content-type'))) return $exec(text);
			return text.stripScripts(this.options.evalScripts);
		},

		success: function(text, xml) {
			this.onSuccess(this.processScripts(text), xml);
		},

		onSuccess: function() {
			this.fireEvent('complete', arguments).fireEvent('success', arguments).callChain();
		},

		failure: function() {
			this.onFailure();
		},

		onFailure: function() {
			this.fireEvent('complete').fireEvent('failure', this.xhr);
		},

		setHeader: function(name, value) {
			this.headers.set(name, value);
			return this;
		},

		getHeader: function(name) {
			return $try(function() {
				return this.xhr.getResponseHeader(name);
			}.bind(this));
		},

		check: function() {
			if (!this.running) return true;
			switch (this.options.link) {
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(this.caller.bind(this, arguments)); return false;
			}
			return false;
		},

		send: function(options) {
			if (!this.check(options)) return this;
			this.running = true;

			var type = $type(options);
			if (type == 'string' || type == 'element') options = { data: options };

			var old = this.options;
			options = $extend({ data: old.data, url: old.url, method: old.method }, options);
			var data = options.data, url = String(options.url), method = options.method.toLowerCase();

			switch ($type(data)) {
			case 'element': data = document.id(data).toQueryString(); break;
			case 'object': case 'hash': data = Hash.toQueryString(data);
			}

			if (this.options.format) {
				var format = 'format=' + this.options.format;
				data = (data) ? format + '&' + data: format;
			}

			if (this.options.emulation && ! ['get', 'post'].contains(method)) {
				var _method = '_method=' + method;
				data = (data) ? _method + '&' + data: _method;
				method = 'post';
			}

			if (this.options.urlEncoded && method == 'post') {
				var encoding = (this.options.encoding) ? '; charset=' + this.options.encoding: '';
				this.headers.set('Content-type', 'application/x-www-form-urlencoded' + encoding);
			}

			if (this.options.noCache) {
				var noCache = 'noCache=' + new Date().getTime();
				data = (data) ? noCache + '&' + data: noCache;
			}

			var trimPosition = url.lastIndexOf('/');
			if (trimPosition > - 1 && (trimPosition = url.indexOf('#')) > - 1) url = url.substr(0, trimPosition);

			if (data && method == 'get') {
				url = url + (url.contains('?') ? '&': '?') + data;
				data = null;
			}

			this.xhr.open(method.toUpperCase(), url, this.options.async);

			this.xhr.onreadystatechange = this.onStateChange.bind(this);

			this.headers.each(function(value, key) {
				try {
					this.xhr.setRequestHeader(key, value);
				} catch(e) {
					this.fireEvent('exception', [key, value]);
				}
			}, this);

			this.fireEvent('request');
			this.xhr.send(data);
			if (!this.options.async) this.onStateChange();
			return this;
		},

		cancel: function() {
			if (!this.running) return this;
			this.running = false;
			this.xhr.abort();
			this.xhr.onreadystatechange = $empty;
			this.xhr = new Browser.Request();
			this.fireEvent('cancel');
			return this;
		}

	});

	(function() {

		var methods = {};
		['get', 'post', 'put', 'delete', 'GET', 'POST', 'PUT', 'DELETE'].each(function(method) {
			methods[method] = function() {
				var params = Array.link(arguments, { url: String.type, data: $defined });
				return this.send($extend(params, { method: method }));
			};
		});

		Request.implement(methods);

	})();

	Element.Properties.send = {

		set: function(options) {
			var send = this.retrieve('send');
			if (send) send.cancel();
			return this.eliminate('send').store('send:options', $extend({
				data: this, link: 'cancel', method: this.get('method') || 'post', url: this.get('action')
			}, options));
		},

		get: function(options) {
			if (options || ! this.retrieve('send')) {
				if (options || ! this.retrieve('send:options')) this.set('send', options);
				this.store('send', new Request(this.retrieve('send:options')));
			}
			return this.retrieve('send');
		}

	};

	Element.implement({

		send: function(url) {
			var sender = this.get('send');
			sender.send({ data: this, url: url || sender.options.url });
			return this;
		}

	});

	/*
---

script: Request.HTML.js

description: Extends the basic Request Class with additional methods for interacting with HTML responses.

license: MIT-style license.

requires:
- /Request
- /Element

provides: [Request.HTML]

...
*/

	Request.HTML = new Class({

		Extends: Request,

		options: {
			update: false,
			append: false,
			evalScripts: true,
			filter: false
		},

		processHTML: function(text) {
			var match = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
			text = (match) ? match[1] : text;

			var container = new Element('div');

			return $try(function() {
				var root = '<root>' + text + '</root>', doc;
				if (Browser.Engine.trident) {
					doc = new ActiveXObject('Microsoft.XMLDOM');
					doc.async = false;
					doc.loadXML(root);
				} else {
					doc = new DOMParser().parseFromString(root, 'text/xml');
				}
				root = doc.getElementsByTagName('root')[0];
				if (!root) return null;
				for (var i = 0, k = root.childNodes.length; i < k; i++) {
					var child = Element.clone(root.childNodes[i], true, true);
					if (child) container.grab(child);
				}
				return container;
			}) || container.set('html', text);
		},

		success: function(text) {
			var options = this.options, response = this.response;

			response.html = text.stripScripts(function(script) {
				response.javascript = script;
			});

			var temp = this.processHTML(response.html);

			response.tree = temp.childNodes;
			response.elements = temp.getElements('*');

			if (options.filter) response.tree = response.elements.filter(options.filter);
			if (options.update) document.id(options.update).empty().set('html', response.html);
			else if (options.append) document.id(options.append).adopt(temp.getChildren());
			if (options.evalScripts) $exec(response.javascript);

			this.onSuccess(response.tree, response.elements, response.html, response.javascript);
		}

	});

	Element.Properties.load = {

		set: function(options) {
			var load = this.retrieve('load');
			if (load) load.cancel();
			return this.eliminate('load').store('load:options', $extend({ data: this, link: 'cancel', update: this, method: 'get' }, options));
		},

		get: function(options) {
			if (options || ! this.retrieve('load')) {
				if (options || ! this.retrieve('load:options')) this.set('load', options);
				this.store('load', new Request.HTML(this.retrieve('load:options')));
			}
			return this.retrieve('load');
		}

	};

	Element.implement({

		load: function() {
			this.get('load').send(Array.link(arguments, { data: Object.type, url: String.type }));
			return this;
		}

	});

	/*
---

script: Fx.js

description: Contains the basic animation logic to be extended by all other Fx Classes.

license: MIT-style license.

requires:
- /Chain
- /Events
- /Options

provides: [Fx]

...
*/

	var Fx = new Class({

		Implements: [Chain, Events, Options],

		options: {
			/*
		onStart: $empty,
		onCancel: $empty,
		onComplete: $empty,
		*/
			fps: 50,
			unit: false,
			duration: 500,
			link: 'ignore'
		},

		initialize: function(options) {
			this.subject = this.subject || this;
			this.setOptions(options);
			this.options.duration = Fx.Durations[this.options.duration] || this.options.duration.toInt();
			var wait = this.options.wait;
			if (wait === false) this.options.link = 'cancel';
		},

		getTransition: function() {
			return function(p) {
				return - (Math.cos(Math.PI * p) - 1) / 2;
			};
		},

		step: function() {
			var time = $time();
			if (time < this.time + this.options.duration) {
				var delta = this.transition((time - this.time) / this.options.duration);
				this.set(this.compute(this.from, this.to, delta));
			} else {
				this.set(this.compute(this.from, this.to, 1));
				this.complete();
			}
		},

		set: function(now) {
			return now;
		},

		compute: function(from, to, delta) {
			return Fx.compute(from, to, delta);
		},

		check: function() {
			if (!this.timer) return true;
			switch (this.options.link) {
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(this.caller.bind(this, arguments)); return false;
			}
			return false;
		},

		start: function(from, to) {
			if (!this.check(from, to)) return this;
			this.from = from;
			this.to = to;
			this.time = 0;
			this.transition = this.getTransition();
			this.startTimer();
			this.onStart();
			return this;
		},

		complete: function() {
			if (this.stopTimer()) this.onComplete();
			return this;
		},

		cancel: function() {
			if (this.stopTimer()) this.onCancel();
			return this;
		},

		onStart: function() {
			this.fireEvent('start', this.subject);
		},

		onComplete: function() {
			this.fireEvent('complete', this.subject);
			if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
		},

		onCancel: function() {
			this.fireEvent('cancel', this.subject).clearChain();
		},

		pause: function() {
			this.stopTimer();
			return this;
		},

		resume: function() {
			this.startTimer();
			return this;
		},

		stopTimer: function() {
			if (!this.timer) return false;
			this.time = $time() - this.time;
			this.timer = $clear(this.timer);
			return true;
		},

		startTimer: function() {
			if (this.timer) return false;
			this.time = $time() - this.time;
			this.timer = this.step.periodical(Math.round(1000 / this.options.fps), this);
			return true;
		}

	});

	Fx.compute = function(from, to, delta) {
		return (to - from) * delta + from;
	};

	Fx.Durations = { 'short': 250, 'normal': 500, 'long': 1000 };

	/*
---

script: Fx.CSS.js

description: Contains the CSS animation logic. Used by Fx.Tween, Fx.Morph, Fx.Elements.

license: MIT-style license.

requires:
- /Fx
- /Element.Style

provides: [Fx.CSS]

...
*/

	Fx.CSS = new Class({

		Extends: Fx,

		//prepares the base from/to object
		prepare: function(element, property, values) {
			values = $splat(values);
			var values1 = values[1];
			if (!$chk(values1)) {
				values[1] = values[0];
				values[0] = element.getStyle(property);
			}
			var parsed = values.map(this.parse);
			return { from: parsed[0], to: parsed[1] };
		},

		//parses a value into an array
		parse: function(value) {
			value = $lambda(value)();
			value = (typeof value == 'string') ? value.split(' ') : $splat(value);
			return value.map(function(val) {
				val = String(val);
				var found = false;
				Fx.CSS.Parsers.each(function(parser, key) {
					if (found) return;
					var parsed = parser.parse(val);
					if ($chk(parsed)) found = { value: parsed, parser: parser };
				});
				found = found || { value: val, parser: Fx.CSS.Parsers.String };
				return found;
			});
		},

		//computes by a from and to prepared objects, using their parsers.
		compute: function(from, to, delta) {
			var computed = [];
			(Math.min(from.length, to.length)).times(function(i) {
				computed.push({ value: from[i].parser.compute(from[i].value, to[i].value, delta), parser: from[i].parser });
			});
			computed.$family = { name: 'fx:css:value' };
			return computed;
		},

		//serves the value as settable
		serve: function(value, unit) {
			if ($type(value) != 'fx:css:value') value = this.parse(value);
			var returned = [];
			value.each(function(bit) {
				returned = returned.concat(bit.parser.serve(bit.value, unit));
			});
			return returned;
		},

		//renders the change to an element
		render: function(element, property, value, unit) {
			element.setStyle(property, this.serve(value, unit));
		},

		//searches inside the page css to find the values for a selector
		search: function(selector) {
			if (Fx.CSS.Cache[selector]) return Fx.CSS.Cache[selector];
			var to = {};
			Array.each(document.styleSheets, function(sheet, j) {
				var href = sheet.href;
				if (href && href.contains('://') && ! href.contains(document.domain)) return;
				var rules = sheet.rules || sheet.cssRules;
				Array.each(rules, function(rule, i) {
					if (!rule.style) return;
					var selectorText = (rule.selectorText) ? rule.selectorText.replace(/^\w+/, function(m) {
						return m.toLowerCase();
					}) : null;
					if (!selectorText || ! selectorText.test('^' + selector + '$')) return;
					Element.Styles.each(function(value, style) {
						if (!rule.style[style] || Element.ShortStyles[style]) return;
						value = String(rule.style[style]);
						to[style] = (value.test(/^rgb/)) ? value.rgbToHex() : value;
					});
				});
			});
			return Fx.CSS.Cache[selector] = to;
		}

	});

	Fx.CSS.Cache = {};

	Fx.CSS.Parsers = new Hash({

		Color: {
			parse: function(value) {
				if (value.match(/^#[0-9a-f]{3,6}$/i)) return value.hexToRgb(true);
				return ((value = value.match(/(\d+),\s*(\d+),\s*(\d+)/))) ? [value[1], value[2], value[3]] : false;
			},
			compute: function(from, to, delta) {
				return from.map(function(value, i) {
					return Math.round(Fx.compute(from[i], to[i], delta));
				});
			},
			serve: function(value) {
				return value.map(Number);
			}
		},

		Number: {
			parse: parseFloat,
			compute: Fx.compute,
			serve: function(value, unit) {
				return (unit) ? value + unit: value;
			}
		},

		String: {
			parse: $lambda(false),
			compute: $arguments(1),
			serve: $arguments(0)
		}

	});

	/*
---

script: Fx.Tween.js

description: Formerly Fx.Style, effect to transition any CSS property for an element.

license: MIT-style license.

requires: 
- /Fx.CSS

provides: [Fx.Tween, Element.fade, Element.highlight]

...
*/

	Fx.Tween = new Class({

		Extends: Fx.CSS,

		initialize: function(element, options) {
			this.element = this.subject = document.id(element);
			this.parent(options);
		},

		set: function(property, now) {
			if (arguments.length == 1) {
				now = property;
				property = this.property || this.options.property;
			}
			this.render(this.element, property, now, this.options.unit);
			return this;
		},

		start: function(property, from, to) {
			if (!this.check(property, from, to)) return this;
			var args = Array.flatten(arguments);
			this.property = this.options.property || args.shift();
			var parsed = this.prepare(this.element, this.property, args);
			return this.parent(parsed.from, parsed.to);
		}

	});

	Element.Properties.tween = {

		set: function(options) {
			var tween = this.retrieve('tween');
			if (tween) tween.cancel();
			return this.eliminate('tween').store('tween:options', $extend({ link: 'cancel' }, options));
		},

		get: function(options) {
			if (options || ! this.retrieve('tween')) {
				if (options || ! this.retrieve('tween:options')) this.set('tween', options);
				this.store('tween', new Fx.Tween(this, this.retrieve('tween:options')));
			}
			return this.retrieve('tween');
		}

	};

	Element.implement({

		tween: function(property, from, to) {
			this.get('tween').start(arguments);
			return this;
		},

		fade: function(how) {
			var fade = this.get('tween'), o = 'opacity', toggle;
			how = $pick(how, 'toggle');
			switch (how) {
			case 'in': fade.start(o, 1); break;
			case 'out': fade.start(o, 0); break;
			case 'show': fade.set(o, 1); break;
			case 'hide': fade.set(o, 0); break;
			case 'toggle':
				var flag = this.retrieve('fade:flag', this.get('opacity') == 1);
				fade.start(o, (flag) ? 0: 1);
				this.store('fade:flag', ! flag);
				toggle = true;
				break;
			default: fade.start(o, arguments);
			}
			if (!toggle) this.eliminate('fade:flag');
			return this;
		},

		highlight: function(start, end) {
			if (!end) {
				end = this.retrieve('highlight:original', this.getStyle('background-color'));
				end = (end == 'transparent') ? '#fff': end;
			}
			var tween = this.get('tween');
			tween.start('background-color', start || '#ffff88', end).chain(function() {
				this.setStyle('background-color', this.retrieve('highlight:original'));
				tween.callChain();
			}.bind(this));
			return this;
		}

	});

	/*
---

script: Fx.Transitions.js

description: Contains a set of advanced transitions to be used with any of the Fx Classes.

license: MIT-style license.

credits:
- Easing Equations by Robert Penner, <http://www.robertpenner.com/easing/>, modified and optimized to be used with MooTools.

requires:
- /Fx

provides: [Fx.Transitions]

...
*/

	Fx.implement({

		getTransition: function() {
			var trans = this.options.transition || Fx.Transitions.Sine.easeInOut;
			if (typeof trans == 'string') {
				var data = trans.split(':');
				trans = Fx.Transitions;
				trans = trans[data[0]] || trans[data[0].capitalize()];
				if (data[1]) trans = trans['ease' + data[1].capitalize() + (data[2] ? data[2].capitalize() : '')];
			}
			return trans;
		}

	});

	Fx.Transition = function(transition, params) {
		params = $splat(params);
		return $extend(transition, {
			easeIn: function(pos) {
				return transition(pos, params);
			},
			easeOut: function(pos) {
				return 1 - transition(1 - pos, params);
			},
			easeInOut: function(pos) {
				return (pos <= 0.5) ? transition(2 * pos, params) / 2: (2 - transition(2 * (1 - pos), params)) / 2;
			}
		});
	};

	Fx.Transitions = new Hash({

		linear: $arguments(0)

	});

	Fx.Transitions.extend = function(transitions) {
		for (var transition in transitions) Fx.Transitions[transition] = new Fx.Transition(transitions[transition]);
	};

	Fx.Transitions.extend({

		Pow: function(p, x) {
			return Math.pow(p, x[0] || 6);
		},

		Expo: function(p) {
			return Math.pow(2, 8 * (p - 1));
		},

		Circ: function(p) {
			return 1 - Math.sin(Math.acos(p));
		},

		Sine: function(p) {
			return 1 - Math.sin((1 - p) * Math.PI / 2);
		},

		Back: function(p, x) {
			x = x[0] || 1.618;
			return Math.pow(p, 2) * ((x + 1) * p - x);
		},

		Bounce: function(p) {
			var value;
			for (var a = 0, b = 1; 1; a += b, b /= 2) {
				if (p >= (7 - 4 * a) / 11) {
					value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
					break;
				}
			}
			return value;
		},

		Elastic: function(p, x) {
			return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
		}

	});

	['Quad', 'Cubic', 'Quart', 'Quint'].each(function(transition, i) {
		Fx.Transitions[transition] = new Fx.Transition(function(p) {
			return Math.pow(p, [i + 2]);
		});
	});

	/*
---

script: Fx.Morph.js

description: Formerly Fx.Styles, effect to transition any number of CSS properties for an element using an object of rules, or CSS based selector rules.

license: MIT-style license.

requires:
- /Fx.CSS

provides: [Fx.Morph]

...
*/

	Fx.Morph = new Class({

		Extends: Fx.CSS,

		initialize: function(element, options) {
			this.element = this.subject = document.id(element);
			this.parent(options);
		},

		set: function(now) {
			if (typeof now == 'string') now = this.search(now);
			for (var p in now) this.render(this.element, p, now[p], this.options.unit);
			return this;
		},

		compute: function(from, to, delta) {
			var now = {};
			for (var p in from) now[p] = this.parent(from[p], to[p], delta);
			return now;
		},

		start: function(properties) {
			if (!this.check(properties)) return this;
			if (typeof properties == 'string') properties = this.search(properties);
			var from = {}, to = {};
			for (var p in properties) {
				var parsed = this.prepare(this.element, p, properties[p]);
				from[p] = parsed.from;
				to[p] = parsed.to;
			}
			return this.parent(from, to);
		}

	});

	Element.Properties.morph = {

		set: function(options) {
			var morph = this.retrieve('morph');
			if (morph) morph.cancel();
			return this.eliminate('morph').store('morph:options', $extend({ link: 'cancel' }, options));
		},

		get: function(options) {
			if (options || ! this.retrieve('morph')) {
				if (options || ! this.retrieve('morph:options')) this.set('morph', options);
				this.store('morph', new Fx.Morph(this, this.retrieve('morph:options')));
			}
			return this.retrieve('morph');
		}

	};

	Element.implement({

		morph: function(props) {
			this.get('morph').start(props);
			return this;
		}

	});

	/*
---

script: DomReady.js

description: Contains the custom event domready.

license: MIT-style license.

requires:
- /Element.Event

provides: [DomReady]

...
*/

	Element.Events.domready = {

		onAdd: function(fn) {
			if (Browser.loaded) fn.call(this);
		}

	};

	(function() {

		var domready = function() {
			if (Browser.loaded) return;
			Browser.loaded = true;
			window.fireEvent('domready');
			document.fireEvent('domready');
		};

		window.addEvent('load', domready);

		if (Browser.Engine.trident) {
			var temp = document.createElement('div');
			(function() { 
				($try(function() {
					temp.doScroll(); // Technique by Diego Perini
					return document.id(temp).inject(document.body).set('html', 'temp').dispose();
				})) ? domready() : arguments.callee.delay(50);
			})();
		} else if (Browser.Engine.webkit && Browser.Engine.version < 525) { 
			(function() { 
				(['loaded', 'complete'].contains(document.readyState)) ? domready() : arguments.callee.delay(50);
			})();
		} else {
			document.addEvent('DOMContentLoaded', domready);
		}

	})();

	/*
---

script: Cookie.js

description: Class for creating, reading, and deleting browser Cookies.

license: MIT-style license.

credits:
- Based on the functions by Peter-Paul Koch (http://quirksmode.org).

requires:
- /Options

provides: [Cookie]

...
*/

	var Cookie = new Class({

		Implements: Options,

		options: {
			path: false,
			domain: false,
			duration: false,
			secure: false,
			document: document
		},

		initialize: function(key, options) {
			this.key = key;
			this.setOptions(options);
		},

		write: function(value) {
			value = encodeURIComponent(value);
			if (this.options.domain) value += '; domain=' + this.options.domain;
			if (this.options.path) value += '; path=' + this.options.path;
			if (this.options.duration) {
				var date = new Date();
				date.setTime(date.getTime() + this.options.duration * 24 * 60 * 60 * 1000);
				value += '; expires=' + date.toGMTString();
			}
			if (this.options.secure) value += '; secure';
			this.options.document.cookie = this.key + '=' + value;
			return this;
		},

		read: function() {
			var value = this.options.document.cookie.match('(?:^|;)\\s*' + this.key.escapeRegExp() + '=([^;]*)');
			return (value) ? decodeURIComponent(value[1]) : null;
		},

		dispose: function() {
			new Cookie(this.key, $merge(this.options, { duration: - 1 })).write('');
			return this;
		}

	});

	Cookie.write = function(key, value, options) {
		return new Cookie(key, options).write(value);
	};

	Cookie.read = function(key) {
		return new Cookie(key).read();
	};

	Cookie.dispose = function(key, options) {
		return new Cookie(key, options).dispose();
	};

	/*
---

script: Swiff.js

description: Wrapper for embedding SWF movies. Supports External Interface Communication.

license: MIT-style license.

credits: 
- Flash detection & Internet Explorer + Flash Player 9 fix inspired by SWFObject.

requires:
- /Options
- /$util

provides: [Swiff]

...
*/

	var Swiff = new Class({

		Implements: [Options],

		options: {
			id: null,
			height: 1,
			width: 1,
			container: null,
			properties: {},
			params: {
				quality: 'high',
				allowScriptAccess: 'always',
				wMode: 'transparent',
				swLiveConnect: true
			},
			callBacks: {},
			vars: {}
		},

		toElement: function() {
			return this.object;
		},

		initialize: function(path, options) {
			this.instance = 'Swiff_' + $time();

			this.setOptions(options);
			options = this.options;
			var id = this.id = options.id || this.instance;
			var container = document.id(options.container);

			Swiff.CallBacks[this.instance] = {};

			var params = options.params, vars = options.vars, callBacks = options.callBacks;
			var properties = $extend({ height: options.height, width: options.width }, options.properties);

			var self = this;

			for (var callBack in callBacks) {
				Swiff.CallBacks[this.instance][callBack] = (function(option) {
					return function() {
						return option.apply(self.object, arguments);
					};
				})(callBacks[callBack]);
				vars[callBack] = 'Swiff.CallBacks.' + this.instance + '.' + callBack;
			}

			params.flashVars = Hash.toQueryString(vars);
			if (Browser.Engine.trident) {
				properties.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
				params.movie = path;
			} else {
				properties.type = 'application/x-shockwave-flash';
				properties.data = path;
			}
			var build = '<object id="' + id + '"';
			for (var property in properties) build += ' ' + property + '="' + properties[property] + '"';
			build += '>';
			for (var param in params) {
				if (params[param]) build += '<param name="' + param + '" value="' + params[param] + '" />';
			}
			build += '</object>';
			this.object = ((container) ? container.empty() : new Element('div')).set('html', build).firstChild;
		},

		replaces: function(element) {
			element = document.id(element, true);
			element.parentNode.replaceChild(this.toElement(), element);
			return this;
		},

		inject: function(element) {
			document.id(element, true).appendChild(this.toElement());
			return this;
		},

		remote: function() {
			return Swiff.remote.apply(Swiff, [this.toElement()].extend(arguments));
		}

	});

	Swiff.CallBacks = {};

	Swiff.remote = function(obj, fn) {
		var rs = obj.CallFunction('<invoke name="' + fn + '" returntype="javascript">' + __flash__argumentsToXML(arguments, 2) + '</invoke>');
		return eval(rs);
	};

// end Greased MooTools

	var preferences = undefined;

	// hack to circumvent 'bug' when overriding toString (and others):
	// https://mootools.lighthouseapp.com/projects/2706/tickets/651-classtostring-broken-on-122-big-regression
	['toString', 'toLocaleString', 'valueOf', 'toSource', 'watch', 'unwatch', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable'].each(function(method) {
		Class.Mutators[method] = $arguments(0);
	});

	var x11Colors = [ // http://www.w3.org/TR/2002/WD-css3-color-20020219/#x11-color
	'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenrod', 'DarkGray', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'Goldenrod', 'Gray', 'Green', 'GreenYellow', 'Honeydew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenrodYellow', 'LightGreen', 'LightGrey', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquamarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenrod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'Seashell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];

// Greasemonkey helpers and wrappers
	var getJSVariable = function(regex) {
		// Thanks to Vispillo for this compact code
		var retval;
		$$('script').each(function(script) {
			if (retval != undefined) {
				return;
			}
			var html = script.innerHTML;
			try {
				retval = html.match(regex)[1];
			} catch(e) {
			}
		});
		return retval;
	}

	GM_getGroupId = function() {
		var reMatch = /\"id\"[ :]+[\'\"]([^\'\"]+@\w\d{2})[\'\"]/;
		var groupId = getJSVariable(reMatch);
		if (!$chk(groupId)) {
			var rssFeeds = $$('a[href*=groups_discuss.gne]');
			if (rssFeeds.length > 0) {
				var groupFeed = rssFeeds[0];
				try {
					groupId = groupFeed.get('href').match(/(\d+@\w\d{2})/)[1];
				} catch(e) {
					// ignore
				}
			}
		}
		if (!$chk(groupId)) {
			var table = $('SubNav');
			if ($chk(table)) {
				try {
					var buddyHref = table.getElement('td.Buddy a').get('href');
					var groupId = buddyHref.match(/(\d+@\w\d{2})/)[1];
				} catch (e) {
					// ignore
				}
			}
		}
		if (!$chk(groupId)) {
			try {
				var inviteHref = document.getElement('a[href*=groups_invite_pre.gne]').get('href');
				groupId = inviteHref.match(/(\d+@\w\d{2})/)[1];
			} catch (e) {
				// ignore
			}
		}
		return groupId;
	}

	GM_getPhotostreamOwnerNsid = function() {
		var reMatch = /photostream_owner_nsid[ =]+\"([^\"]+)\"/;
		var retval = getJSVariable(reMatch);
		if (!$chk(retval)) {
			retval = getJSVariable(/\"?owner_nsid\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
		}
		return retval;
	}

	GM_getUserNsid = function () {
		var usernsid = getJSVariable(/[\"\']user[\"\'][ :]+{[^}]*\"nsid"[ :]+[\'\"]([^\'\"]+)[\'\"]/);
		if (!$chk(usernsid)) {
			GM_log("WARNING: nsid not found in JSON data");
			usernsid = getJSVariable(/global_nsid\s*=\s*\'([^\']+)\'/);
		}
		return usernsid;
	}

	GM_getMagisterLudi = function() {
		var reMatch = /global_magisterLudi[ =]+\'([^\']+)\'/;
		var retval = getJSVariable(reMatch);
		if (!$chk(retval)) {
			retval = getJSVariable(/\"?api_key\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
		}
		if (!$chk(retval)) { // new photo page
			retval = getJSVariable(/[\'\"]site_key[\'\"][ :]+[\'\"]([^\'\"]+)[\'\"]/);
		}
		return retval;
	}

	GM_getAuthHash = function() {
		var reMatch = /global_auth_hash[ =]+\'([^\']+)\'/;
		var retval = getJSVariable(reMatch);
		if (!$chk(retval)) {
			retval = getJSVariable(/\"?auth_hash\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
		}

		return retval;
	}

	GM_getCsrf = function () {
		return getJSVariable(/[\'\"]csrf[\'\"][ :]+[\'\"]([^\'\"]+)[\'\"]/);
	}

	GM_getAuthToken = function() {
		var reMatch = /global_auth_token[ =]+\'([^\']+)\'/;
		var retval = getJSVariable(reMatch);
		if (!$chk(retval)) {
			retval = getJSVariable(/\"?auth_token\"?[ :]+[\'\"]([^\'\"]+)[\'\"]/);
		}
		return retval;
	}

	if (Browser.Engine.presto) { // Opera
		var keyPrefix = 'NewFlickrDiscussPostNotification.';

		GM_log = function(message) {
			opera.postError('NFPN: ' + message);
		}

		GM_getValue = function(key, defValue) {
			var retval = window.localStorage.getItem(keyPrefix + key);
			if (!$chk(retval)) {
				return defValue;
			}
			return retval;
		}

		GM_setValue = function(key, value) {
			try {
				window.localStorage.setItem(keyPrefix + key, value);
			} catch(e) {
				GM_log("error setting value: " + e);
			}
		}

		GM_deleteValue = function(key) {
			try {
				window.localStorage.removeItem(keyPrefix + key);
			} catch(e) {
				GM_log("error removing value: " + e);
			}
		}

		GM_listKeys = function(regexp, callback) {
			var list = [];
			var reKey = new RegExp("^" + keyPrefix); // first, make sure we only use our own keys
			for (var i = 0, il = window.localStorage.length; i < il; i++) {
				// only use the script's own keys
				var key = window.localStorage.key(i);
				if (key.test(reKey)) {
					var unprefixedKey = key.replace(keyPrefix, '');
					if (regexp) {
						if (unprefixedKey.test(regexp)) {
							if (callback) {
								try {
									callback(unprefixedKey);
								} catch (e) {
									GM_log("ERROR running callback in GM_listKeys: " + e);
								}
							} else {
								list.push(unprefixedKey);
							}
						}
					} else {
						if (callback) {
							try {
								callback(unprefixedKey);
							} catch (e) {
								GM_log("ERROR running callback in GM_listKeys: " + e);
							}
						} else {
							list.push(unprefixedKey);
						}
					}
				}
			}
			return list;
		}

		GM_getObject = function(key) {
			var value = GM_getValue(key);
			if ($chk(value)) {
				try {
					return {
						value: JSON.parse(value),
						key_present: true
					};

				} catch(e) {
					var error = "error parsing (" + e + ") object '" + key + "': " + value;
					GM_log(error);
					return {
						value: null,
						key_present: true,
						error: error
					};
				}
			}
			return {
				value: null,
				key_present: false
			};
		}

		GM_storeObject = function(key, value) {
			GM_setValue(key, JSON.stringify(value));
		}

	} else { // firefox
		GM_getObject = function(key) {
			var strValue = GM_getValue(key);
			if ($chk(strValue)) {
				var value = eval('(' + strValue + ')');
			var debug = false; // key.match('canondslr') && key.match('72157632046041051');
			if (debug) {
				GM_log([ "retrieving " + key + ":",
					"\treplies = " + value.replies ].join('\n'));
			}
				return {
					value: value,
					key_present: true
				};
			}
			return {
				value: null,
				key_present: false
			}
		}

		GM_storeObject = function(key, value) {
			var debug = false; // key.match('canondslr') && key.match('72157632046041051');
			if (debug) {
				GM_log([ "storing " + key + ":",
					"\treplies = " + value.replies ].join('\n'));
			}
			GM_setValue(key, uneval(value));
		}

		GM_listKeys = function(regexp, callback) {
			var keys = GM_listValues();
			if (!$chk(keys)) return [];
			var list = [];
			for each(var key in keys) {
				if (regexp) {
					if (key.test(regexp)) {
						if (callback) {
							callback(key);
						} else {
							list.push(key);
						}
					}
				} else {
					if (callback) {
						callback(key);
					} else {
						list.push(key);
					}
				}
			};
			return list;
		}

	}
// end Greasemonkey helpers and wrappers

	// only run when the user is logged in
	var loggedIn = $chk(GM_getUserNsid());
	if (!loggedIn) {
		throw new Error("not logged in; aborting");
	}

	// the following api_key is reserved for this application
	// if you need an api_key for your own application, please request one at 
	// http://www.flickr.com/services/apps/create/apply/
	// if you request a Non-Commercial key, you'll get it instantly
	var api_key = 'f34fa6453715520a1a280fa8cee46ec4'; // the app's own key
	if (debug) GM_log("DEBUGGING");

// version check code
	function showUpdateNotification(data) {
		var onlineVersion = data.onlineVersion;
		var version = data.version;
		var beta = data.beta;

		var color = 'white';
		var updatespan = $('AlesaDams_updates_span');
		if (!$chk(updatespan)) {
		    updatespan = new Element('span', {
			id: 'AlesaDams_updates_span',
			// copied from Google++ userscript:
			styles: {
				'background': '#E0E0E0',
				padding: '2px 4px',
				display: 'block',
				'-moz-background-clip': 'border',
				'-moz-background-origin': 'padding',
				'-moz-background-inline-policy': 'continuous',
				position: 'fixed',
				opacity: '0.7',
				'z-index': 1011, // the lightbox layer is 1004 on the new photo page
				bottom: '5px',
				right: '5px',
				left: '5px'
			}
		    }).inject($(document).getElement("body"));
		} else {
			// make it darker if already created by another script:
			updatespan.setStyle('background', '#E0E0E0');
		}
		var bgColor = beta ? 'grey' : 'black';
		var updater = new Element('span', {
			styles: {
				background: bgColor + ' none repeat scroll 0% 0%',
				margin: '2px 5px',
				position: 'relative',
				'float': beta ? 'left' : 'right',
				opacity: beta ? '0.5' : ''
			}
		}).inject(updatespan);
		new Element('a', {
			html: 'New Flickr Post Notification: ' + (beta ? 'beta ' + version : onlineVersion + ' available'),
			href: installPage,
			target: '_blank',
			title: 'to the ' + (beta ? 'stable version' : '') + ' install page (opens in new tab)',
			styles: {
				'color': color,
				'text-decoration': 'none'
			}
		}).inject(updater);
		new Element('a', {
			html: beta ? ' (feedback)' : ' (Changes)',
			title: 'opens in new tab',
			href: 'http://www.flickr.com/groups/flickrhacks/discuss/72157623920770381/lastpage',
			styles: {
				'text-decoration': 'none'
			},
			target: '_blank'
		}).inject(updater);
	}

function getThreadInfo(data) {
        var threadId = data.threadId;
        var callback = data.callback;

        try {  
                new Request({
                        url: 'http://www.flickr.com',
                        onSuccess: function (responseText, responseXML) {
                                    try {
                                        var result;
                                        try {
                                            result = JSON.parse(responseText);
                                        } catch (e) {
                    				GM_log("error parsing JSON reply for thread " + threadId + " (" + e + "): '" + responseText);
		    				callback({ threadId: threadId, success: false, message: e });
						return;
                                        }
                                        if (result.stat === 'fail') {
                                                callback({ threadId: threadId, success: false, message: result.message });
                                        } else {
                                                callback({ threadId: threadId, success: true, groupId: result.replies.topic.group_id, message: result.replies.topic.message._content });
                                        }
                                    } catch (e) {
                                        GM_log("ERROR processing result: " + e);
                                        callback({ threadId: threadId, success: false, message: "ERROR processing result: " + e });
                                    }
                                },
                                onFailure: function (response) {
                                        GM_log("error: " + response.statusText);
                                        callback({ threadId: threadId, success: false, message: response.statusText });
                                }
                }).get('/services/rest', {
                        api_key: GM_getMagisterLudi(),
                        auth_hash: GM_getAuthHash(),
			csrf: GM_getCsrf(),
                        auth_token: GM_getAuthToken(),
                        format: 'json',
                        method: 'flickr.groups.discuss.replies.getList', // flickr.groups.discuss.topics.getInfo does not return group_id
                        nojsoncallback: 1,
                        topic_id: threadId,
			per_page: 1,
			page: 1
                });
        } catch (e) {
                callback({ threadId: threadId, success: false, message: 'Exception: ' + e });
        }
}

function checkVersion(version) {
try {
	var lastVersionCheckTime = GM_getValue("lastVersionCheckTime");
	var elapsedtime;
	var CPStartTime = new Date();
	if (lastVersionCheckTime !== undefined) {
		elapsedtime = CPStartTime.getTime() - lastVersionCheckTime;
	}
	if (!lastVersionCheckTime || elapsedtime / 1000 > 60 * 60 * 12) { //more then 12h ago
		getThreadInfo({ threadId: '72157623920770381', callback: function(retval) {
				var success = retval.success;
				var message = retval.message;
				if (!success) {
					GM_log("error getting version info: " + message);
					GM_deleteValue("onlineVersion");
					GM_deleteValue("lastVersionCheckTime");
					return;
				}
				var onlineVersion = message.split(/<i>current stable version:\s*/)[1].split(/<\/i>/)[0];
				GM_setValue("onlineVersion", onlineVersion);
				GM_setValue("lastVersionCheckTime", (new Date()).getTime().toString());
			}
		});
	}

	var onlineVersion = GM_getValue("onlineVersion");
	if ($chk(onlineVersion)) {
		var updateAvailable = false;
		var reVersionMatch = /(\d+)\.(\d+)\.(\d+)/;
		var onlineVersionParts = reVersionMatch.exec(onlineVersion);
		var currentVersionParts = reVersionMatch.exec(version);
		var onlineVersionMajor, onlineVersionMinor, onlineVersionBuild;
		//[ onlineVersion, onlineVersionMajor, onlineVersionMinor, onlineVersionBuild ] = onlineVersionParts; 'invalid left-hand side' in Chrome
		onlineVersionMajor = onlineVersionParts[1];
		onlineVersionMinor = onlineVersionParts[2];
		onlineVersionBuild = onlineVersionParts[3];
		var currentVersionMajor, currentVersionMinor, currentVersionBuild;
		//[ currentVersion, currentVersionMajor, currentVersionMinor, currentVersionBuild] = currentVersionParts;
		currentVersionMajor = currentVersionParts[1];
		currentVersionMinor = currentVersionParts[2];
		currentVersionBuild = currentVersionParts[3];
		// first check major: important update! => rewrite, flickr updates, greasemonkey updates
		if (parseInt(onlineVersionMajor, 10) > parseInt(currentVersionMajor, 10)) {
			updateAvailable = true;
		} else if (parseInt(onlineVersionMajor, 10) === parseInt(currentVersionMajor, 10)) { // we don't want to downgrade
			// minor version update => new functionality
			if (parseInt(onlineVersionMinor, 10) > parseInt(currentVersionMinor, 10)) {
				updateAvailable = true;
			} else if (parseInt(onlineVersionMinor, 10) === parseInt(currentVersionMinor, 10)) { // we don't want to downgrade
				// build version update => bugfixes
				if (parseInt(onlineVersionBuild, 10) > parseInt(currentVersionBuild, 10)) {
					updateAvailable = true;
				}
			}
		}
		if (updateAvailable) {
			showUpdateNotification({ onlineVersion: onlineVersion });
		} else if (version != onlineVersion) {
			showUpdateNotification({ version: version, beta: true });
		}
	}
} catch(e) {
	GM_log("checkVersion error: " + e);
}
}
// end version check code

	var NFPNPreferences = new Class({
		options: {
			gotoLastThreadPage: false, // on the FlickrNotifications envelopes
			gotoLastThreadPageLink: false, // on the Flickr Discuss thread links
			colorizeNewPosts: true,
			scrollToNewPosts: true,
			refreshButtonAsLast: false,
			reloadTimeout: 1 // in hours
		},
		initialize: function() {
			var storedGotoLastThreadPage = GM_getValue("NFPN.preference.gotoLastThreadPage");
			if (storedGotoLastThreadPage !== undefined) {
				this.options.gotoLastThreadPage = (storedGotoLastThreadPage === true || storedGotoLastThreadPage === "true"); // Google chrome trickery
			}
			var storedGotoLastThreadPageLink = GM_getValue("NFPN.preference.gotoLastThreadPageLink");
			if (storedGotoLastThreadPageLink !== undefined) {
				this.options.gotoLastThreadPageLink = (storedGotoLastThreadPageLink === true || storedGotoLastThreadPageLink === "true"); // Google chrome trickery
			}
			var storedColorizeNewPosts = GM_getValue("NFPN.preference.colorizeNewPosts");
			if (storedColorizeNewPosts !== undefined) {
				this.options.colorizeNewPosts = (storedColorizeNewPosts === true || storedColorizeNewPosts === "true");
			}
			var storedScrollToNewPosts = GM_getValue("NFPN.preference.scrollToNewPosts");
			if (storedScrollToNewPosts !== undefined) {
				this.options.scrollToNewPosts = (storedScrollToNewPosts === true || storedScrollToNewPosts === "true");
			}
			var storedRefreshButtonAsLast = GM_getValue("NFPN.preference.refreshButtonAsLast");
			if (storedRefreshButtonAsLast !== undefined) {
				this.options.refreshButtonAsLast = (storedRefreshButtonAsLast === true || storedRefreshButtonAsLast === "true");
			}
			this.options.reloadTimeout = parseInt(GM_getValue("NFPN.preference.reloadTimeout", 1));
		},
		gotoLastThreadPage: function() {
			return this.options.gotoLastThreadPage;
		},
		setGotoLastThreadPage: function(b) {
			if (b !== this.options.gotoLastThreadPage) {
				GM_setValue("NFPN.preference.gotoLastThreadPage", b);
				this.options.gotoLastThreadPage = b;
				return true;
			}
			return false;
		},
		gotoLastThreadPageLink: function() {
			return this.options.gotoLastThreadPageLink;
		},
		setGotoLastThreadPageLink: function(b) {
			if (b !== this.options.gotoLastThreadPageLink) {
				GM_setValue("NFPN.preference.gotoLastThreadPageLink", b);
				this.options.gotoLastThreadPageLink = b;
				return true;
			}
			return false;
		},
		colorizeNewPosts: function() {
			return this.options.colorizeNewPosts;
		},
		setColorizeNewPosts: function(b) {
			if (b !== this.options.colorizeNewPosts) {
				GM_setValue("NFPN.preference.colorizeNewPosts", b);
				this.options.colorizeNewPosts = b;
				return true;
			}
			return false;
		},
		scrollToNewPosts: function() {
			return this.options.scrollToNewPosts;
		},
		setScrollToNewPosts: function(b) {
			if (b !== this.options.scrollToNewPosts) {
				GM_setValue("NFPN.preference.scrollToNewPosts", b);
				this.options.scrollToNewPosts = b;
				return true;
			}
			return false;
		},
		refreshButtonAsLast: function() {
			return this.options.refreshButtonAsLast;
		},
		setRefreshButtonAsLast: function(b) {
			if (b !== this.options.refreshButtonAsLast) {
				GM_setValue("NFPN.preference.refreshButtonAsLast", b);
				this.options.refreshButtonAsLast = b;
				return true;
			}
			return false;
		},
		reloadTimeout: function() {
			var retval = this.options.reloadTimeout;
			try {
				retval = parseInt(retval, 10);
			} catch (e) {
				retval = 1;
			}
			if (retval < 1 || isNaN(retval)) {
				retval = 1;
			}
			return retval;
		},
		setReloadTimeout: function(t) {
			if (t !== this.options.reloadTimeout) {
				GM_setValue("NFPN.preference.reloadTimeout", t);
				this.options.reloadTimeout = t;
				return true;
			}
			return false;
		}
	});

	var preferencesInitData = {
		photo: {
			type: 'photo', // used in DOM id's => no funny characters!
			gm_keyPostfix: 'Photo', // to create /^selectedPhoto./
			headerTitle: 'Selected photos',
			identifier: 'photoId',
			newitems: 'newComments',
			items: 'comments',
			error: 'error',
			titleTemplate: {
				text: '%1 (by <i>%2</i>)',
				param1: 'title',
				param2: 'username'
			},
			text: 'photo', // to be inserted into 'remove this photo from ...'
			checkForNewCallback: checkForNewCommentsInPhotoPage,
			urlCreator: createPhotoPageURL
		},
		photostream: {
			type: 'photostream',
			gm_keyPostfix: 'Photostream',
			headerTitle: 'Selected photostreams',
			identifier: 'userNsid',
			newitems: 'newPhotos',
			items: 'photos',
			error: 'error',
			text: 'photostream',
			checkForNewCallback: checkForNewPhotosInPhotostream,
			urlCreator: createPhotostreamURL
		},
		thread: {
			type: 'thread',
			gm_keyPostfix: 'Thread',
			headerTitle: 'Selected threads',
			identifier: 'topic',
			newitems: 'newPosts',
			items: 'replies',
			error: 'error',
			titleTemplate: {
				text: '%1 (from group <i>%2</i>)',
				param1: 'title',
				param2: 'groupname'
			},
			text: 'thread',
			checkForNewCallback: apiCheckForNewPostsInThread,
			urlCreator: createThreadURL
		},
		group: {
			type: 'group',
			gm_keyPostfix: 'Group',
			headerTitle: 'Selected group discussion pages',
			identifier: 'groupname',
			newitems: 'newPosts',
			items: 'replies',
			error: 'invalidCount',
			text: 'discussion group',
			checkForNewCallback: apiCheckForNewPostsInGroup,
			urlCreator: createGroupURL
		},
		helpforum: {
			type: 'helpforum',
			gm_keyPostfix: 'Helpforum',
			headerTitle: 'Selected help forums',
			identifier: 'groupname',
			newitems: 'newPosts',
			items: 'replies',
			error: 'invalidCount',
			text: 'help forum',
			titleTemplate: {
				text: '%1 (in <i>%2</i>)',
				param1: 'title',
				param2: 'groupname'
			},
			checkForNewCallback: checkForNewPostsInHelpForum,
			urlCreator: createGroupURL
		},
		forumitem: {
			type: 'forumitem',
			gm_keyPostfix: 'Forumitem',
			headerTitle: 'Selected forum threads',
			identifier: 'topic',
			newitems: 'newPosts',
			items: 'replies',
			error: 'error',
			text: 'forum thread',
			checkForNewCallback: checkForNewPostsInForumThread,
			urlCreator: createThreadURL
		},
		groupmembers: {
			type: 'groupmembers',
			gm_keyPostfix: 'Groupmembers',
			headerTitle: 'Selected group member pages',
			identifier: 'groupId',
			newitems: 'newMembers',
			items: 'members',
			error: 'error',
			text: 'group members',
			checkForNewCallback: checkForNewMembersInGroup,
			urlCreator: createGroupMembersURL
		},
		grouppool: {
			type: 'grouppool',
			gm_keyPostfix: 'Grouppool',
			headerTitle: 'Selected group pools',
			identifier: 'groupId',
			newitems: 'newPhotos',
			items: 'photos',
			error: 'error',
			text: 'group pool',
			checkForNewCallback: checkForNewPhotosInGroupPool,
			urlCreator: createGroupPoolURL
		},
		reversedcontacts: {
			type: 'reversedcontacts',
			gm_keyPostfix: 'Reversedcontacts',
			headerTitle: 'Selected reversed contacts pages',
			identifier: 'userNsid',
			newitems: 'newContacts',
			items: 'members',
			error: 'error',
			text: 'reversed contact',
			checkForNewCallback: checkForNewReversedContacts,
			urlCreator: createReversedContactsURL
		},
		pendingitems: {
			type: 'pendingitems',
			gm_keyPostfix: 'Pendingitems',
			headerTitle: 'Selected pending items pages',
			identifier: 'groupname',
			newitems: 'newItems',
			items: 'items',
			error: 'error',
			text: 'pending items',
			checkForNewCallback: checkForPendingItems,
			urlCreator: createPendingItemsURL
		},
		app: {
			type: 'app',
			gm_keyPostfix: 'App',
			headerTitle: 'Selected applications',
			identifier: 'appId',
			newitems: 'newComments',
			items: 'comments',
			error: 'error',
			titleTemplate: {
				text: '%1 (by <i>%2</i>)',
				param1: 'title',
				param2: 'username'
			},
			text: 'app',
			checkForNewCallback: checkForNewAppComments,
			urlCreator: createAppURL
		},
		set: {
			type: 'set',
			gm_keyPostfix: 'Set',
			headerTitle: 'Selected sets',
			identifier: 'setId',
			newitems: 'newComments',
			items: 'comments',
			error: 'error',
			titleTemplate: {
				text: '%1 (by <i>%2</i>)',
				param1: 'title',
				param2: 'realname'
			},
			text: 'set',
			checkForNewCallback: checkForNewSetComments,
			urlCreator: createSetURL
		},
		pendingtestimonials: {
			type: 'pendingtestimonials',
			gm_keyPostfix: 'Pendingtestimonials',
			headerTitle: 'Pending testimonials',
			identifier: 'userNsid',
			newitems: 'newItems',
			items: 'items',
			error: 'error',
			text: 'pending testimonials',
			checkForNewCallback: checkForPendingTestimonials,
			urlCreator: createPendingTestimonialsURL
		},
		pendingmembers: {
			type: 'pendingmembers',
			gm_keyPostfix: 'Pendingmembers',
			headerTitle: 'Pending group member pages',
			identifier: 'groupId',
			newitems: 'newMembers',
			items: 'members',
			error: 'error',
			text: 'pending members',
			checkForNewCallback: checkForPendingMembers,
			urlCreator: createPendingMembersURL
		},
		favorites: {
			type: 'favorites',
			gm_keyPostfix: 'Favorites',
			headerTitle: 'Favorites',
			identifier: 'userNsid',
			newitems: 'newFavorites',
			items: 'favorites',
			error: 'error',
			text: 'favorites',
			checkForNewCallback: checkForNewUserFavorites,
			urlCreator: createUserFavoritesURL
		}
	};

	function applyPreferences() {
		// last thread page (envelopes)
		var gotoLastThreadPageCheckbox = $('NFPN.gotolastthreadpage');
		if ($chk(gotoLastThreadPageCheckbox)) {
			var gotoLastPage = $('NFPN.gotolastthreadpage').checked;
			var changed = preferences.setGotoLastThreadPage(gotoLastPage);
			if (changed) { // change links on the fly
				var anchors = [];
				// add/remove 'lastpage' from thread and forumitem urls
				anchors.combine($$('img[id^=NFPN.' + preferencesInitData.thread.gm_keyPostfix + ']').getParent('a'))
					.combine($$('span[id^=NFPN.' + preferencesInitData.thread.gm_keyPostfix + ']').getElement('a'));
				anchors.combine($$('img[id^=NFPN.' + preferencesInitData.forumitem.gm_keyPostfix + ']').getParent('a'))
					.combine($$('span[id^=NFPN.' + preferencesInitData.forumitem.gm_keyPostfix + ']').getElement('a'));
				anchors.each(function(anchor) {
					if ($chk(anchor)) {
						if (gotoLastPage) { // add '/lastpage'
							if (!anchor.get('href').match('lastpage')) anchor.set('href', anchor.get('href') + '/lastpage');
						} else { // remove '/lastpage'
							anchor.set('href', anchor.get('href').replace(/\/lastpage$/, ''));
						}
					}
				});
				// add/remove 'pageX' from photo urls
				anchors = [];
				anchors.combine($$('img[id^=NFPN.' + preferencesInitData.photo.gm_keyPostfix + '\.]').getParent('a'))
					.combine($$('span[id^=NFPN.' + preferencesInitData.photo.gm_keyPostfix + '\.]').getElement('a'));
				anchors.each(function(anchor) {
					if ($chk(anchor)) {
						try {
							var photoid = anchor.get('href').match(/.*flickr.com\/photos\/[^\/]+\/(\d+)/)[1];
							if (gotoLastPage) { // add '/pageX'
								var metaInfo = GM_getObject('selected' + preferencesInitData.photo.gm_keyPostfix + '.' + photoid);
								if (metaInfo.key_present) {
									var photoInfo = metaInfo.value;
									var page = Math.ceil(photoInfo.comments / 50);
									if (page > 1) {
										anchor.set('href', anchor.get('href') + 'page' + page + '/');
									}
								}
							} else { // remove '/pageX'
								anchor.set('href', anchor.get('href').replace(/page\d+\/$/, ''));
							}
						} catch(e) {
							GM_log("error: " + e);
						}
					}
				});
			}
		}

		// last thread page (Flickr Discuss links)
		var gotoLastThreadPageLinkCheckbox = $('NFPN.gotolastthreadpagelink');
		if ($chk(gotoLastThreadPageLinkCheckbox)) {
			var gotoLastPageLink = $('NFPN.gotolastthreadpagelink').checked;
			var changed = preferences.setGotoLastThreadPageLink(gotoLastPageLink);
			if (changed) { // change links on the fly
				if (document.location.href.test(/.*flickr.com\/groups\/[^\/]+\/discuss/)) { // only when on a group Discuss page
					var minusIcon; // only when a watch is defined on the group Discuss page
					minusIcon = $$('img[id^=NFPN.plusmin.icon.Group.]');
					if ($chk(minusIcon)) { // we are definitely on a group Discuss page
						if (('' + minusIcon.get('title')).test(/^remove/)) { // only when already watching
							try {
								getMain().getElement('table.TopicListing').getElements('tr').each(function (row,idx) {
									if (idx === 0) { return; } // title row
									if (gotoLastPageLink) {
										if (!row.getElement('a').get('href').match('lastpage'))
											row.getElement('a').set('href', row.getElement('a').get('href') + '/lastpage');
									} else {
										row.getElement('a').set('href', row.getElement('a').get('href').replace(/\/lastpage$/, ''));
									}
								});
							} catch (e) {
								GM_log("error updating links: " + e);
							}
						}
					}
				}
			}
		}

		var colorizeNewPostsCheckbox = $('NFPN.colorizenewposts');
		if ($chk(colorizeNewPostsCheckbox)) {
			var colorizeNewPosts = $('NFPN.colorizenewposts').checked;
			preferences.setColorizeNewPosts(colorizeNewPosts);
		}

		var scrollToNewPostsCheckbox = $('NFPN.scrolltonewposts');
		if ($chk(scrollToNewPostsCheckbox)) {
			var scrollToNewPosts = $('NFPN.scrolltonewposts').checked;
			preferences.setScrollToNewPosts(scrollToNewPosts);
		}

		var refreshButtonAsLastCheckbox = $('NFPN.refreshbuttonaslast');
		if ($chk(refreshButtonAsLastCheckbox)) {
			var refreshButtonAsLast = $('NFPN.refreshbuttonaslast').checked;
			preferences.setRefreshButtonAsLast(refreshButtonAsLast);
		}

		var reloadTimeoutInput = $('NFPN.reloadtimeout');
		if ($chk(reloadTimeoutInput)) {
			var reloadTimeout = reloadTimeoutInput.value;
			preferences.setReloadTimeout(reloadTimeout);
		}

		$each(preferencesInitData, function(initData) {
			// removals
			$$('img.NFPN-' + initData.type + '-remove').each(function(imgElement) {
				var id = imgElement.get('id').replace('NFPN.' + initData.type + '.remove.', '');
				// remove from data store
				GM_deleteValue('selected' + initData.gm_keyPostfix + '.' + id);
				// remove from screen
				try {
					resetPostsIcon(initData.gm_keyPostfix, id);
					$('NFPN.' + initData.gm_keyPostfix + '.' + id).getParent('a').dispose();
				} catch(e) {
					try { // if the item was only just added, it has no anchor parent (and no messagechunk)
						$('NFPN.' + initData.gm_keyPostfix + '.' + id).dispose();
					} catch(e) {
						GM_log(e);
					}
				}
			});
			// envelope colors
			$$('img.NFPN-' + initData.type + '-bgcolor').each(function(imgElement) {
				var id = imgElement.get('id').replace('NFPN.' + initData.type + '.bgColor.', '');
				var metaInfo = GM_getObject('selected' + initData.gm_keyPostfix + '.' + id);
				if (metaInfo.key_present) { // could have been removed
					var storedInfo = metaInfo.value;
					if (storedInfo) {
						var bgColor = imgElement.getAttribute("nfpncolor");
						if (bgColor !== storedInfo.bgColor) {
							storedInfo.bgColor = bgColor;
							GM_storeObject('selected' + initData.gm_keyPostfix + '.' + id, storedInfo);
							$('NFPN.' + initData.gm_keyPostfix + '.' + id).style.backgroundColor = bgColor;
						}
					} else {
						// nothing to do: should have been reported when opening the preferences dialog
					}
				}
			});
		});

		/*    if (somethingChanged) {
        window.location.reload();
    } else { */
		togglePreferencesDialog();
		/*    } */
	}

	function createColorCell(html, title, bgColor, selectedColor, colorName) {
		if (colorName === undefined) {
			colorName = bgColor;
		}
		var colorCell = new Element('td', {
			html: html,
			title: title,
			width: 17,
			height: 20,
			align: 'center',
			styles: {
				background: bgColor,
				cursor: 'pointer'
			},
			events: {
				click: function(evt) {
					// remove old checkmark
					this.getParent('table').getElements('img[src=' + images.ok + ']').dispose();
					// set new color
					this.getParent('div').getElement('img.nfpn-colorpicker').setAttribute('nfpncolor', colorName);
					this.getParent('div').getElement('img.nfpn-colorpicker').style.backgroundColor = colorName === 'none' ? '': bgColor;
					// put new checkmark
					new Element('img', { // known issue: click twice on a cell, and there's no checkmark?
						src: images.ok
					}).inject($(evt.target));
				}
			}
		})
		if (selectedColor === colorName) {
			new Element('img', {
				src: images.ok
			}).inject(colorCell);
		}
		return colorCell;
	}

	function createColorsTable(bgColor) {
		var colorsTable = new Element('table', {
			cellPadding: 0,
			cellSpacing: 1,
			styles: {
				display: 'inline',
			}
		});
		var colorsRow;
		x11Colors.each(function(color, idx) {
			if (idx === 35) {
				/*            colorCell = createColorCell('Flickr', 
                'same as Flickr background',
                $(document).getElement('body').getComputedStyle('background-color'),
                bgColor,
                'Flickr');
            colorCell.rowSpan = 4;
            colorCell.inject(colorsRow); */
				colorCell = createColorCell('none', 'don\'t use a background color', 'white', bgColor, 'none');
				colorCell.rowSpan = 4;
				colorCell.inject(colorsRow);
				if (bgColor === undefined || bgColor === null) {
					colorCell.adopt(new Element('img', {
						src: images.ok
					}));
				}
			}
			if ((idx % 35) === 0) {
				colorsRow = new Element('tr').inject(colorsTable);
			}

			createColorCell(' ', color, color, bgColor).inject(colorsRow);
		});
		return colorsTable;
	}

	function createRemoveIcon(id, title, removeClass) {
		return new Element('img', {
			src: images.remove,
			id: id,
			title: title,
			styles: {
				cursor: 'pointer'
			},
			events: {
				click: function(evt) {
					this.toggleClass(removeClass);
					if (this.hasClass(removeClass)) {
						this.getParent('div').setStyle('text-decoration', 'line-through');
					} else {
						this.getParent('div').setStyle('text-decoration', '');
					}
				}
			}
		});
	}

	function createBgColorIcon(id, title, selectedColor, colorClass) {
		return new Element('img', {
			src: images.color,
			id: id,
			title: title,
			styles: {
				cursor: 'pointer',
				backgroundColor: (selectedColor === undefined || selectedColor === 'none' ? '' :
					selectedColor === 'Flickr' ? $(document).getElement('body').getComputedStyle('background-color') :
					selectedColor)
			},
			'class': 'nfpn-colorpicker ' + colorClass,
			nfpncolor: selectedColor,
			events: {
				click: function(evt) {
					if (this.hasClass('showing')) {
						this.removeClass('showing');
						this.getParent().getElement('span.colortable').destroy();
					} else {
						this.addClass('showing');
						var bgColor = this.getAttribute('nfpncolor');
						var colorsTable = createColorsTable(bgColor);
						colorsTable.inject(new Element('span', {
							'class': 'colortable'
						}).inject(this.getParent('div')));
					}
				}
			}
		});
	}

GM_addStyle('div.NFPN-preferences-item { min-width: 300; float: left; display: inline; }');
	function togglePreferencesDialog(evt) {
		var preferencesDialog = $('NFPN.preferences');
		if ($chk(preferencesDialog)) {
			preferencesDialog.destroy();
		} else {
			// TODO: keep the Cancel and OK buttons on the screen

			var topline = evt.event.pageY < 50 ? evt.event.pageY: 50;
			var maxWidth = (window.innerWidth - 50 < 800 ? window.innerWidth - 50 : 800);
			var left = (window.innerWidth - maxWidth) / 2;
			var preferencesTable = new Element('div', {
				id: 'NFPN.preferences',
				styles: {
					overflow: 'auto',
					background: '#BFBFBF',
					'-moz-border-radius': '4px',
					'-webkit-border-radius': '4px',
					'-khtml-border-radius': '4px',
					'border-radius': '4px',
					border: 'grey solid 1px',
					padding: '2px 4px',
					zIndex: 1014,
					maxHeight: (window.innerHeight - topline - 20),
					maxWidth: maxWidth,
					minWidth: 640,
					position: 'fixed',
					opacity: '0.98',
					left: left + 'px', //evt.event.pageX,
					top: topline,
					display: 'block',
					visibility: 'visible',
					fontSize: '12px'
				}
			}).inject($(document).getElement('body'));
GM_addStyle('div.NFPN-preferences-comment { font-style: italic; float: left; max-width: ' + (preferencesTable.getStyle('maxWidth').match(/(\d+)/)[1] - 350) + 'px; vertical-align: top; padding-left: 10px; }');
			var gotoLastThreadPageCheckbox;
			var colorizeNewPostsCheckbox;
			var scrollToNewPostsCheckbox;
			var refreshButtonAsLastCheckbox;
			var reloadTimeoutInput;
			var header = new Element('div').inject(preferencesTable);
		new Element('span', {
                        title: 'consider a donation',
                        html: 'donate:',
                        styles: {
                                'float': 'left',
                                'font-style': 'italic',
                                'font-size': 'smaller',
                                'vertical-align': 'middle'
                        }
                }).adopt(
                        new Element('a', {
                                href: 'https://www.paypal.com/be/cgi-bin/webscr?cmd=_send-money&email=alesadam@ymail.com&amount_ccode=USD&payment_type=S',
                                title: 'donate with Paypal',
                                target: '_blank'
                        }).adopt(
                                new Element('img', { src: images.paypal, styles: { 'vertical-align': 'middle' } })
                        ),
                        new Element('a', {
                                href: 'http://www.amazon.co.uk/registry/wishlist/RWKOXV8NS09I/',
                                title: 'buy me something from my Amazon wishlist (UK)',
                                target: '_blank'
                        }).adopt(
                                new Element('img', { src: images.amazon, styles: { 'vertical-align': 'middle' } })
                        ),
                        new Element('a', {
                                href: 'http://www.amazon.com/gp/wishlist/2FWKY0A7NVSOJ/',
                                title: 'buy me something from my Amazon wishlist (US)',
                                target: '_blank'
                        }).adopt(
                                new Element('img', { src: images.amazon, styles: { 'vertical-align': 'middle' } })
                        ),
                        new Element('a', {
                                href: 'javascript:void(O);',
                                title: 'donate Bitcoins',
                                events: {
                                        click: function (evt) {
                                                // based on http://leo.bogert.de/2012/02/22/simple-bitcoin-donate-button/
                                                window.prompt ('Please copy-paste my Bitcoin address to your Bitcoin software - I cannot do it automatically.\nTo copy it, right-click the selected text and select \'Copy\'.\nThen right-click the address field in your Bitcoin software and select \'Paste\'.', '19DvtjDgiSx9991xVkXSYSovsSoreSGDC7');
                                        }
                                }
                        }).adopt(
                                new Element('img', { src: images.bitcoin, styles: { 'vertical-align': 'middle' } })
                        )
                ).inject(header);
			new Element('label', {
				id: 'NFPN.preferences_title',
				html: 'Flickr Notifications - Preferences',
				styles: {
					fontWeight: 'bold',
					width: (preferencesTable.getStyle('maxWidth').match(/(\d+)/)[1] - 50) + 'px',
					'float': 'center'
				},
				events: {
					'version': function(evt) {
						this.set('html', 'Flickr Notifications v' + evt.version + ' - Preferences');
					}
				}
			}).inject(header);
			getVersion('NFPN.preferences_title', 'version');
			new Element('a', {
				html: 'feedback thread',
				href: 'http://www.flickr.com/groups/flickrhacks/discuss/72157623920770381/',
				title: 'opens in new tab',
				target: '_blank',
				styles: {
					'float': 'right'
				}
			}).inject(header);
			new Element('hr').inject(preferencesTable);
			// go to last page (envelope)
			var gotoLastPagePreference = new Element('div', {
				align: 'left',
				styles: {
					clear: 'both'
					// float: left
				}
			}).inject(preferencesTable);
			gotoLastPagePreference.adopt(
			    new Element('div', {
				'class': 'NFPN-preferences-item'
			    }).adopt(
				gotoLastThreadPageCheckbox = new Element('input', {
					type: 'checkbox',
					id: 'NFPN.gotolastthreadpage'
				}),
				new Element('label', {
					'for': 'NFPN.gotolastthreadpage',
					html: 'go to the thread\'s last page (envelope)'
				})
			    ),
			    new Element('div', {
				'class': 'NFPN-preferences-comment',
				html: "The link on the envelopes take you to the first page of the thread. " +
					"<br>With this option set, the link will take you to the the last page of the thread." +
					"<br>Applicable for discussion threads, forum items, and photo pages (not group " +
					"<br>discussion pages, or group pools, ..)"
			    })
			);
			if (preferences.gotoLastThreadPage()) {
				gotoLastThreadPageCheckbox.set('checked', 'checked');
			}
			// go to last page (Flickr links)
			var gotoLastPageLinkPreference = new Element('div', {
				align: 'left',
				styles: {
					clear: 'both'
					// float: left
				}
			}).inject(preferencesTable);
			gotoLastPageLinkPreference.adopt(
			    new Element('div', {
				'class': 'NFPN-preferences-item'
			    }).adopt(
				new Element('input', {
					type: 'checkbox',
					id: 'NFPN.gotolastthreadpagelink'
				}),
				new Element('label', {
					'for': 'NFPN.gotolastthreadpagelink',
					html: 'go to the thread\'s last page (Flickr link)'
				})
			    ),
			    new Element('div', {
				'class': 'NFPN-preferences-comment',
				html: "For multipage threads, Flickr provides a link to the last page of that thread in the 'Latest' reply column " +
					"of the Discuss page. The links in the 'Title' column take you to the thread\'s first page" +
					"<br>With this option set, the link in the 'Title' column will take you to the the last page of the thread."
			    })
			);
			if (preferences.gotoLastThreadPageLink()) {
				$('NFPN.gotolastthreadpagelink').set('checked', 'checked');
			}

			var colorizeNewPostsPreference = new Element('div', {
				align: 'left',
				styles: {
					clear: 'both'
				}
			}).inject(preferencesTable);
			colorizeNewPostsPreference.adopt(
			    new Element('div', {
				'class': 'NFPN-preferences-item'
			    }).adopt(
				colorizeNewPostsCheckbox = new Element('input', {
					type: 'checkbox',
					id: 'NFPN.colorizenewposts'
				}),
				new Element('label', {
					'for': 'NFPN.colorizenewposts',
					html: 'colorize new posts'
				})
			    ),
			    new Element('div', {
				'class': 'NFPN-preferences-comment',
				html: "Colorizes new posts to easily find them." +
					"<br>Applicable for discussion threads, help forum items and photo pages."
			    })
			);
			if (preferences.colorizeNewPosts()) {
				colorizeNewPostsCheckbox.set('checked', 'checked');
			}

			var scrollToNewPostsPreference = new Element('div', {
				align: 'left',
				styles: {
					clear: 'both'
				}
			}).inject(preferencesTable);
			scrollToNewPostsPreference.adopt(
			    new Element('div', {
				'class': 'NFPN-preferences-item'
			    }).adopt(
				scrollToNewPostsCheckbox = new Element('input', {
					type: 'checkbox',
					id: 'NFPN.scrolltonewposts'
				}),
				new Element('label', {
					'for': 'NFPN.scrolltonewposts',
					html: 'scroll down to new posts'
				})
			    ),
			    new Element('div', {
				'class': 'NFPN-preferences-comment',
				html: "Scrolls a page down to the new posts." +
					"<br>Applicable for discussion threads and help forum items (and very dependent on script order)."
			    })
			);
			if (preferences.scrollToNewPosts()) {
				scrollToNewPostsCheckbox.set('checked', 'checked');
			}

			var refreshButtonAsLastPreference = new Element('div', {
				align: 'left',
				styles: {
					clear: 'both'
				}
			}).inject(preferencesTable);
			refreshButtonAsLastPreference.adopt(
			    new Element('div', {
				'class': 'NFPN-preferences-item'
			    }).adopt(
				refreshButtonAsLastCheckbox = new Element('input', {
					type: 'checkbox',
					id: 'NFPN.refreshbuttonaslast'
				}),
				new Element('label', {
					'for': 'NFPN.refreshbuttonaslast',
					html: 'move refresh button to the right'
				})
			    ),
			    new Element('div', {
				'class': 'NFPN-preferences-comment',
				html: "Moves the 'refresh' button to the right of the envelopes."
			    })
			);
			if (preferences.refreshButtonAsLast()) {
				refreshButtonAsLastCheckbox.set('checked', 'checked');
			}

			var reloadTimeoutPreference = new Element('div', {
				align: 'left',
				styles: {
					clear: 'both'
				}
			}).inject(preferencesTable);
			reloadTimeoutPreference.adopt(
			    new Element('div', {
				'class': 'NFPN-preferences-item'
			    }).adopt(
				new Element('label', {
					html: 'Reload timeout: '
				}),
				reloadTimeoutInput = new Element('input', {
					type: 'number',
					id: 'NFPN.reloadtimeout',
					value: preferences.reloadTimeout(),
					styles: {
						width: '40px'
					}
				}),
				new Element('label', {
					html: 'h'
				})
			    ),
			    new Element('div', {
				'class': 'NFPN-preferences-comment',
				html: "The reload button will change from light grey to red in the time specified (in hours)." +
					"After this timeout, the reload button will start to blink."
			    })
			);
			var keyValues = GM_listKeys();
			//keyValues.sort();
			$each(preferencesInitData, function(initData) {
				var headerPrinted = false;
				var reKey = new RegExp('^selected' + initData.gm_keyPostfix + '\\.');
				$each(keyValues, function(key) {
					if (key.test(reKey)) {
						var metaInfo = GM_getObject(key);
						if (metaInfo.key_present) { // it always is
							var storedInfo = metaInfo.value;
							if ($chk(storedInfo)) {
								if (!headerPrinted) {
									headerPrinted = true;
									var header = new Element('div', {
										html: initData.headerTitle + ' ',
										styles: {
											background: '#CFCFCF',
											textAlign: 'left',
											clear: 'both'
										}
									}).inject(preferencesTable);
									header.adopt(
									    new Element('img', {
										src: images.down,
										title: 'click to expand',
										styles: {
											height: 12,
											cursor: 'pointer'
										},
										events: {
											click: function(evt) {
												if (evt.target.title.match(/expand/)) {
													evt.target.src = images.up;
													evt.target.title = 'click to collapse';
													$$('div.NFPN-preference-' + initData.gm_keyPostfix).each(function(pref) {
														pref.style.display = 'block';
														pref.style.visibility = 'visible';
													});
												} else {
													evt.target.src = images.down;
													evt.target.title = 'click to expand';
													$$('div.NFPN-preference-' + initData.gm_keyPostfix).each(function(pref) {
														pref.style.display = 'none';
														pref.style.visibility = 'hidden';
													});
												}
											}
										}
									    })
									);
								} // headerPrinted
								var title = storedInfo.title + ' ';
								if ($chk(initData.titleTemplate)) {
									title = initData.titleTemplate.text
										.replace('%1', storedInfo[initData.titleTemplate.param1])
										.replace('%2', storedInfo[initData.titleTemplate.param2]) 
										+ ' ';
								}
								var itemPreferences = new Element('div', {
									'class': 'NFPN-preference-' + initData.gm_keyPostfix,
									styles: {
										textAlign: 'left',
										display: 'none',
										visibility: 'hidden',
										clear: 'both'
									}
								}).inject(preferencesTable);
								itemPreferences.adopt(
								    createRemoveIcon(
								    	'NFPN.' + initData.type + '.remove.' + storedInfo[initData.identifier],
									'remove this ' + initData.text + ' from your watch list',
									'NFPN-' + initData.type + '-remove'),
								    new Element('span', {
									html: ' '
								    }),
								    createBgColorIcon(
								    	'NFPN.' + initData.type + '.bgColor.' + storedInfo[initData.identifier],
									'choose a background color for this ' + initData.text + '\'s envelope',
									storedInfo.bgColor,
									'NFPN-' + initData.type + '-bgcolor'),
								    new Element('span', {
									html: ' '
								    }),
								    new Element('span', {
									html: title
								    })
								);
							} else {
								// would like to report missing object, but
								// missing too much information
							}
						}
					}
				});
			});

			preferencesTable.adopt(
			    new Element('div', {
				align: 'right'
			    }).adopt(
			    	new Element('button', {
					type: 'submit',
					html: 'OK',
					'class': 'Butt',
					events: {
						click: applyPreferences
					}
			    	}),
				document.createTextNode(' '),
				new Element('button', {
					type: 'submit',
					html: 'Cancel',
					'class': 'DeleteButt',
					events: {
						click: togglePreferencesDialog
					}
			    	})
			    )
			);

			preferencesTable.adopt(
				new Element('div', {
					styles: {
						'text-align': 'left'
					}
				}).adopt(
					new Element('img', {
						src: images.convert,
						id: 'NFPN.consistency.img',
						styles: {
							cursor: 'pointer'
						},
						events: {
							click: function (evt) {
								this.set('src', images.updating);
								var div = $('NFPN.consistency-problems');
								div.empty();
								keyValues = GM_listKeys('.*', function(key) {
									var listKey = false;
									var processed = false;
									var forced = false;
									if (key.toString().match('Object')) {
										listKey = true;
										processed = true;
									}
									// thread info for a selected group
									if (!processed && key.match(/.+\.http:\/\/www\.flickr\.com\/groups\/[^\/]+\/discuss\/\d+/)) {
										var groupname = key.match(/^(.+)\.http:\/\/www\.flickr\.com\/groups\/[^\/]+\/discuss\/\d+/)[1];
										listKey = !GM_getObject('selectedGroup.' + groupname).key_present;
										processed = true;
									}
									// same for selected forum
									if (!processed && key.match(/.+\.http:\/\/www\.flickr\.com\/help\/forum\/[^\/]+\/\d+/)) {
										var forumname = key.match(/^(.+)\.http:\/\/www\.flickr\.com\/help\/forum\/[^\/]+\/\d+/)[1];
										listKey = !GM_getObject('selectedHelpforum.' + forumname).key_present;
										processed = true;
									}
									// no longer used:
									if (!processed && (key.match(/^\w+\.lastChecked$/) || 
											 key.match(/^[\w\.]+\.(defaultC|c)heckDelays?$/) ||
											 key.match("NFPN.preference.compactEnvelopeStyle")
											)) {
										listKey = true;
										forced = true;
										processed = true;
									}
									// known, and used preferences:
									if (!processed && (key.match(/^NFPN\.preference\.colorizeNewPosts$/) ||
											   key.match(/^NFPN\.preference\.scrollToNewPosts$/) ||
											   key.match(/^NFPN\.preference\.gotoLastThreadPage$/) ||
											   key.match(/^NFPN\.preference\.gotoLastThreadPageLink$/) ||
											   key.match(/^NFPN\.preference\.refreshButtonAsLast$/) ||
											   key.match(/^NFPN\.preference\.reloadTimeout$/) ||
											   key.match(/^lastReloadTime$/) ||
											   key.match(/^lastVersionCheckTime$/) ||
											   key.match(/^onlineVersion$/) ||
											   key.match(/^version$/)
											)) {
										processed = true;
									}
									// known, and used selections:
									if (!processed && key.match(/^selected.+\..+/)) {
										processed = true;
										var gm_keyPostfix = key.match(/^selected(.+)\..+$/)[1];
										var initData = preferencesInitData[gm_keyPostfix.toLowerCase()];
										if (!$chk(initData)) {
											listKey = true;
											forced = true;
										} else if (initData.gm_keyPostfix != gm_keyPostfix) {
											listKey = true;
											forced = true;
										}
									}
									if (listKey || !processed) {
										div.adopt(
											new Element('br'),
											new Element('input', {
												type: 'checkbox',
												checked: forced,
												id: 'NFPN.consistency.' + key,
											}),
											new Element('label', {
												'for': 'NFPN.consistency.' + key,
												id: 'NFPN.consistency.' + key + '-label',
												html: key.toString()
											})
										);
									};
								});
								if ($$('input[id^=NFPN.consistency]').length == 0) {
									this.set('src', images.ok);
									return;
								}
								this.set('src', images.convert);
								new Element('button', {
									type: 'submit',
									html: 'Remove selected keys',
									'class': 'DeleteButt',
									styles: {
										display: 'block'
									},
									events: {
										click: function(evt) {
											$$('input[id^=NFPN.consistency]:checked').each(function (checkbox) {
												var key = checkbox.get('id').replace('NFPN.consistency.', '');
												GM_deleteValue(key);
												$(checkbox.get('id') + '-label').setStyle('text-decoration', 'line-through');
											});
										}
									}
								}).inject(div);
							}
						}
					}),
					new Element('span', {
						html: 'check data consistency',
						styles: {
							'padding-left': '5px',
							cursor: 'pointer'
						},
						events: {
							click: function (evt) {
								$('NFPN.consistency.img').fireEvent('click');
							}
						}
					})
				),
				new Element('div', {
					id: 'NFPN.consistency-problems',
					styles: {
						'text-align': 'left'
					}
				})
			);
		}
	}

	function addPreferencesMenuItem() {
		if (!$chk($('NFPN.envelopes'))) {
			var injectionPoint = $('global-nav');
			if (!$chk(injectionPoint) && document.location.href.match(/.*flickr.com\/photos\/[^\/]+\/\d+/)) {
				// create a global-nav on a photo page
				injectionPoint = new Element('div', {
					styles: {
						'background': '#E0E0E0',
						padding: '2px 4px',
						display: 'block',
						'-moz-background-clip': 'border',
						'-moz-background-origin': 'padding',
						'-moz-background-inline-policy': 'continuous',
						position: 'fixed',
						opacity: '0.9',
						'z-index': 1011, // the lightbox layer is 1004 on the new photo page
						top: '5px',
						right: '320px',
						left: '5px'
					}
				}).inject($$('body')[0]);
			}
			var injectionDirection = 'bottom';
			new Element('div', {
				id: 'NFPN.envelopes',
				styles: {
					'font-size': '10px ! important',
					'text-align': 'center',
					'background': 'rgba(150,150,150,0.8)',
					'margin-right': '5px'
				}
			}).inject(injectionPoint, injectionDirection);
		}
	// removed from Organize menu; using an icon now
		new Element('img', {
			title: 'Flickr Notifications Preferences',
			id: 'NFPN.preferences.icon',
			src: images.preferences,
			styles: {
				cursor: 'pointer',
				padding: '4px',
				'vertical-align': 'middle'
			},
			events: {
				click: function(evt) {
					togglePreferencesDialog(evt);
				}
			}
		}).inject($('NFPN.envelopes'), 'top');
	// add reload button now
		new Element('img', {
			title: 'Check for new items',
			id: 'NFPN.reload.icon',
			src: images.reload,
			styles: {
				cursor: 'pointer',
				padding: '4px',
				'vertical-align': 'middle',
			},
			events: {
				click: function (evt) {
					GM_log("reloading...");
					GM_setValue("lastReloadTime", (new Date()).getTime().toString());
					$$('img.NFPN-envelope-img').each(function(envelope) {
						if (!envelope.hasClass('needs-conversion')) {
							envelope.fireEvent('start-spinning');
						}
					});
					$$('img.NFPN-envelope-img').each(function(envelope) {
						envelope.fireEvent('run-check');
					});
					this.fireEvent('update-color');
				},
				'update-color': function (evt) {
					var lastReloadTime = GM_getValue("lastReloadTime");
					if (!$chk(lastReloadTime)) {
						lastReloadTime = new Date().getTime();
						GM_setValue("lastReloadTime", lastReloadTime.toString());
					}
					lastReloadTime = parseInt(lastReloadTime, 10);
					var now = new Date().getTime();
					var timeoutInterval = 1000 * 60 * 60 * preferences.reloadTimeout();
					var timePast = now - lastReloadTime;
					if (timePast >= timeoutInterval) { // start blinking
						if (!$chk(blinking)) {
							blinking = setInterval(blinkReloadButton, 1000);
							this.addClass('blinking-off');
						}
						return;
					}
					// if past this point, make sure to stop blinking
					if ($chk(blinking)) {
						clearInterval(blinking);
						blinking = undefined;
					}
					this.removeClass('blinking-on');
					this.removeClass('blinking-off');
					var colorIdx = parseInt((timePast / timeoutInterval) * whiteToRedGradient.length, 10);
					if (colorIdx >= whiteToRedGradient.length) {
						colorIdx = whiteToRedGradient.length - 1;
					}
					this.setStyle('background-color', whiteToRedGradient[colorIdx]);
				},
				'blink-again': function (evt) {
					if (this.hasClass('blinking-on')) {
						this.removeClass('blinking-on');
						this.addClass('blinking-off');
						this.setStyle('background-color', whiteToRedGradient[whiteToRedGradient.length - 1]);
					} else if (this.hasClass('blinking-off')) {
						this.addClass('blinking-on');
						this.removeClass('blinking-off');
						this.setStyle('background-color', whiteToRedGradient[0]);
					}
				}
			}
		}).inject($('NFPN.preferences.icon'), 'after');
		// change color depending on how long it has been since the last refresh
		updateReloadButtonColor();
		var intervalTimer = parseInt(preferences.reloadTimeout() * 60 * 60 * 1000 / whiteToRedGradient.length, 10);
		intervalTimer = parseInt(intervalTimer / 3, 10); // make it run smooth enough
		setInterval(updateReloadButtonColor, intervalTimer);
	}

	var whiteToRedGradient = [
		// in 16 shades of red:
		'#F0F0F0', '#F1E0E0', '#F2D0D0', '#F3C0C0', '#F4B0B0', '#F5A0A0', '#F69090', '#F78080', '#F87070', '#F96060', '#FA5050', '#FB4040', '#FC3030', '#FD2020', '#FE1010', '#FF0000'
	];

	var blinking = undefined;
	function updateReloadButtonColor() {
		$('NFPN.reload.icon').fireEvent('update-color');
	}
	function blinkReloadButton() {
		$('NFPN.reload.icon').fireEvent('blink-again');
	}

	function retrieveThreadsFromCache(groupname) {
		var retval = new Hash();
		var obsolete = new Array(); // do not delete while iterating: creates havoc!
		var reMatch = new RegExp("^" + groupname + "\\.");
		GM_listKeys(reMatch, function(key) {
			// inspect the key
			if (key.toString().match('Object')) { // typeof won't do it; key.match() neither
				// old bug => will result in double keys in data => 'ghost' new-replies
				GM_log("removing Object key '" + key + "'");
				obsolete.push(key);
				return;
			}
			var metaInfo = GM_getObject(key);
			if (metaInfo.key_present) { // always true :-)
				var threadInfo = metaInfo.value;
				if (threadInfo) {
					retval.set(threadInfo.topic, threadInfo);
				} else {
					GM_log("removing key '" + key + "'");
					obsolete.push(key); // clean up
				}
			}
		});
		obsolete.forEach(function (key) {
			GM_log("removing key '" + key + "' from storage");
			GM_deleteValue(key);
		});
		return retval;
	}

	function resolveUsername(userNsid, callback) {
		new Request({
			url: 'http://www.flickr.com',
			onSuccess: function(responseText, responseXML) {
				var result = JSON.parse(responseText);
				if (result.stat === 'fail') {
					GM_log("error reading user information: " + result.message);
					callback({ success: false, message: "error reading user information: " + result.message });
					return;
				}
				callback({ success: true, displayname: result.person.username._content, userpath: result.person.path_alias });
			},
			onFailure: function(response) {
				GM_log("failure reading user information: " + response.statusText);
				callback({ success: false, message: "failure reading user information: " + response.statusText });
			}
		}).get('/services/rest', {
			api_key: GM_getMagisterLudi(),
			auth_hash: GM_getAuthHash(),
			csrf: GM_getCsrf(),
			auth_token: GM_getAuthToken(),
			format: 'json',
			method: 'flickr.people.getInfo',
			nojsoncallback: 1,
			user_id: userNsid
		});
	}

	function getMain(element) {
		if (!$chk(element)) {
			element = document;
		}
		var main = element.getElement('*[id=Main]');
		if (!$chk(main)) main = element.getElement('*[id=main]');
		if (!$chk(main)) main = element.getElement('*[id=meta]');
		return main;
	}

GM_addStyle(".f-sprite { background-image: url('http://l.yimg.com/g/images/flickr-sprite.png.v4'); }\n" +
	            ".fs-icon_unread_bw { background-position: -812px -13px; }\n" + 
		    ".fs-icon_unread { background-position: -812px -53px; }");

GM_addStyle("a.NFPN-envelope:hover { background: #F0F0F0; }");
GM_addStyle("a.NFPN-envelope-hover { font-weight: bold; line-height: 10px; }");
GM_addStyle('.NFPN_hint { background-color: #FFE28A; }');

function createPostsIcon(data) {
	var prefix = data.prefix;
	var id = data.id;
	var url = data.url;
	var title = data.title;
	var bgColor = data.bgColor;
	var isStored = data.isStored;

	try {
		var postsAnchor = new Element('a', {
			id: 'NFPN.' + prefix + '.' + id + '.MessageAnchor',
			'class': 'NFPN-envelope',
			href: url,
			events: {
				mouseover: function (evt) {
					this.addClass('NFPN-envelope-hover');
				},
				mouseout: function (evt) {
					this.removeClass('NFPN-envelope-hover');
				}
			},
			styles: {
				position: 'relative'
			}
		}).inject(preferences.refreshButtonAsLast() ? $('NFPN.reload.icon') : $('NFPN.envelopes'),
		          preferences.refreshButtonAsLast() ? 'before' : 'bottom');

		var newPostsIcon = new Element('img', {
			'class': 'NFPN-envelope-img f-sprite fs-icon_unread_bw',
			id: 'NFPN.' + prefix + '.' + id,
			src: images.updating,
			title: title,
			alt: title, // also serves as a backup for resetPostsIcon
			height: 10,
			styles: {
				'font-size': '9px ! important',
				'background-color': (bgColor === undefined || bgColor === 'none' ?
					'' : bgColor === 'Flickr' ?
					$(document).getElement('body').getComputedStyle('background-color') :
					bgColor),
				'vertical-align': 'middle',
				width: '16px'
			},
			events: {
				'reset-count': function (evt) {
				    try {
					var compactMessageChunk = $(this.id + '.compactMessageChunk');
					if ($chk(compactMessageChunk)) {
						compactMessageChunk.destroy();
					}
					this.src = images.spaceout;
					//this.set('class', 'f-sprite fs-icon_unread_bw');
					this.removeClass('fs-icon_unread');
					this.addClass('fs-icon_unread_bw');
					this.set('height', 16);
					this.set('title', this.get('alt'));
				    } catch (e) {
					GM_log("error resetting envelope count: " + e);
				    }
				},
				'set-count': function (evt) {
				    try {
					var compactMessageChunk = $(this.id + '.compactMessageChunk');
					if (evt.newPosts > 0) {
						if ($chk(compactMessageChunk)) {
							compactMessageChunk.empty();
						} else {
							var anchor = this.getParent('a');
							compactMessageChunk = new Element('span', {
								id: this.id + '.compactMessageChunk',
								'class': 'NFPN-compact-message-chunk'
							}).inject(anchor);
						}
						this.src = images.spaceout;
						//this.set('class', 'f-sprite fs-icon_unread');
						this.removeClass('fs-icon_unread_bw');
						this.addClass('fs-icon_unread');
						this.set('height', 16);
						compactMessageChunk.set('html', evt.newPosts + (evt.returnedThreads === 'true' ? '+': ''));
						compactMessageChunk.set('title', this.get('alt') + ' (' + evt.newPosts + (evt.returnedThreads === 'true' ? '+': '') + ')');
						this.set('title', compactMessageChunk.get('title'));
					} else {
						this.fireEvent('reset-count');
					}
				    } catch (e) {
					GM_log("error setting envelope count: " + e);
				    }
				},
				'show-error': function (evt) {
					try {
						this.src = images.error;
						this.height = 16;
						this.title = this.title + " - " + evt;
					} catch(e) {
						GM_log("error notifying error: " + e + " (error was: " + evt + ")");
					}
				},
				'needs-conversion': function (evt) {
					this.src = images.convert;
					this.height = 16;
					this.title = this.title + " - click to convert to new version";
					this.addClass('needs-conversion');
				},
				'mark-locked': function (evt) {
					try {
						this.src = images.lock;
						this.height = 16;
						this.title = this.get('title') + " - (locked)";
					} catch(e) {
						GM_log("error showing lock: " + e);
					}
				},
				'start-spinning': function (evt) {
					this.src = images.updating;
					this.height = 10;
				},
				'run-check': function (evt) {
					if (this.hasClass('needs-conversion')) return;
					this.fireEvent('reset-count');
					var key =  this.id.replace('NFPN.','selected');
					var metaInfo = GM_getObject(key);
					if (!metaInfo.key_present) { // sanity check
						this.fireEvent('show-error', 'INTERNAL ERROR: created an envelope for a non-existing key!?');
						return;
					}
					var storedInfo = metaInfo.value;
					if (!$chk(storedInfo)) {
						this.fireEvent('show-error', 'INTERNAL ERROR: missing data!?');
						return;
					}
					this.setStyle('background-color', storedInfo.bgColor);
					var gm_keyPostfix = key.match(/selected([^\.]+)\..*$/)[1];
					var initData = preferencesInitData[gm_keyPostfix.toLowerCase()];
					if (!$chk(initData)) {
						this.fireEvent('show-error', 'INTERNAL ERROR: missing initData for keyPostfix=\'' + gm_keyPostfix + '\'');
						return;
					}
					this.fireEvent('start-spinning');
					
					try {
						initData.checkForNewCallback(storedInfo, this);
					} catch(e) {
						this.fireEvent('show-error', e);
					}
				}
			}
		}).inject(postsAnchor);

		if (!isStored) return newPostsIcon; // called from the + icon

		var key =  'selected' + prefix + '.' + id;
		var metaInfo = GM_getObject(key);
		if (!metaInfo.key_present) { // sanity check
			newPostsIcon.fireEvent('show-error', 'INTERNAL ERROR: created an envelope for a non-existing key!?');
			return newPostsIcon;
		}
		var storedInfo = metaInfo.value;
		if (!$chk(storedInfo)) {
			newPostsIcon.fireEvent('show-error', 'INTERNAL ERROR: missing data!?');
			return newPostsIcon;
		}
		var initData = preferencesInitData[prefix.toLowerCase()];
		if (!$chk(initData)) {
			newPostsIcon.fireEvent('show-error', 'INTERNAL ERROR: missing initData for keyPostfix=\'' + gm_keyPostfix + '\'');
			return newPostsIcon;
		}
		var title = prefix + ': ' + storedInfo.title + ' ';
		if ($chk(initData.titleTemplate)) {
			title = prefix + ': ' + initData.titleTemplate.text
				.replace('%1', storedInfo[initData.titleTemplate.param1])
				.replace('%2', storedInfo[initData.titleTemplate.param2])
				.replace(/<[^>]+>/g, '') // remove HTML markup
				+ ' ';
		}
		newPostsIcon.set('title', title);
		newPostsIcon.set('alt', title);

		return newPostsIcon;
	} catch(e) {
		GM_log("error creating mail icon");
	}
}

	function resetPostsIcon(gm_keyPostfix, id) {
		var newPostsIcon = $('NFPN.' + gm_keyPostfix + '.' + id);
		if ($chk(newPostsIcon)) {
			newPostsIcon.fireEvent('reset-count');
		}
		return newPostsIcon;
	}

GM_addStyle('span.NFPN-compact-message-chunk { z-index: 2; position: absolute; right: 0; top: 0; font-size: 10px; color: black; }');

	function notifyNewPosts(prefix, id, newPosts, returnedThreads) {
		var newPostsIcon = $('NFPN.' + prefix + '.' + id);
		if ($chk(newPostsIcon)) {
			newPostsIcon.fireEvent('set-count', { newPosts: newPosts, returnedThreads: returnedThreads });
		}
	}

	function notifyError(prefix, id, title) {
		var newPostsIcon = $('NFPN.' + prefix + '.' + id);
		if ($chk(newPostsIcon)) {
			newPostsIcon.fireEvent('show-error', title);
		}
	}

	function markThreadLocked(prefix, id) {
		var newPostsIcon = $('NFPN.' + prefix + '.' + id);
		if ($chk(newPostsIcon)) {
			newPostsIcon.fireEvent('mark-locked');
		}
	}

	function spinNewPostsIcon(prefix, id) {
		var newPostsIcon = $('NFPN.' + prefix + '.' + id);
		if ($chk(newPostsIcon)) {
			newPostsIcon.fireEvent('start-spinning');
		}
	}

	function reportMissingObject(data) {
		var type = data.type;
		var url = data.url;
		var key = data.key;
		var html = data.html ? data.html: url;

		if ($chk($('NFPN.envelopes'))) {
			var pinky = new Element('div', {
				styles: {
					backgroundColor: 'pink'
				},
				events: {
					'update-link': function (evt) {
						this.getElement('a').set('href', evt.url);
						this.getElement('a').set('html', evt.html ? evt.html : evt.url);
					}
				}
			}).inject($('NFPN.envelopes'), 'after');
			pinky.adopt(
			    new Element('span', {
				html: 'Error! found a key for a ' + type + ' for '
			    }),
			    new Element('a', {
				href: url,
				html: html ? html: '&lt;missing&gt;'
			    }),
			    new Element('span', {
				html: ' but no valid data '
			    }),
			    new Element('a', {
				href: '#',
				html: '(remove key)',
				events: {
					click: function(evt) {
						evt.preventDefault();
						GM_deleteValue(key);
						$(evt.target).getParent('div').dispose();
					}
				}
			    })
			);
			return pinky;

		} else {
			GM_log("error: no envelopes element for error reporting");
		}
	}

	function createGroupURL(groupInfo) {
		var helpforum = groupInfo.helpforum;
		var gm_keyPostfix = (helpforum ? "Helpforum" : "Group");
		var groupDiscussionURL = (helpforum ?
			"http://www.flickr.com/help/forum/" + groupInfo.groupname + "/" :
			"http://www.flickr.com/groups/" + groupInfo.groupname + "/discuss/");
		return { matchURL: groupDiscussionURL, linkURL: groupDiscussionURL };
	}

	function checkForNewPostsInHelpForum(forumInfo, newPostsIcon) {
		forumInfo.helpforum = true;
		var helpforum = forumInfo.helpforum;
		var gm_keyPostfix = "Helpforum";
		var groupDiscussionUrl = createGroupURL(forumInfo).matchURL;

		var debug = false; //forumInfo.groupname == 'central';
		if (debug) GM_log(["DEBUG: checking posts in forum " + forumInfo.groupname,
			"id=" + forumInfo[preferencesInitData.group.identifier],
			"URL=" + groupDiscussionUrl,
			"storedInfo.items=" + forumInfo['replies'],
			"storedInfo.newItems=" + forumInfo['newPosts']
		].join('\n'));
		newPostsIcon.getParent('a').set('href', groupDiscussionUrl);
		var data = {
			debug: debug,
			storedInfo: forumInfo,
			initData: preferencesInitData.helpforum,
			URL: groupDiscussionUrl,
			countItemsInPage: function(element, callback) {
				var storedThreads = retrieveThreadsFromCache(forumInfo.groupname);
				var groupNewPosts = 0;
				var returnedThreads = 'false';
				element.getElements('table.TopicListing').each(function(table) { // help forums use two tables
					table.getElements('tr').each(function(row, index) {
						if (index === 0) {
							return; // header
						}
						var columns = row.getElements('td');
						var threadAnchor = columns[0].getElement('a');
						var title = threadAnchor.textContent;
						var topic = threadAnchor.href;
						var replies = parseInt(columns[2].textContent.replace(/(\.|,)/g, ''), 10);
						var threadInfo = storedThreads.get(topic);
						if ($chk(threadInfo)) {
							if (threadInfo.returnedThread === 'true') {
								groupNewPosts += 1;
								returnedThreads = 'true';

							} else if (threadInfo.newTopic === 'true') {
								groupNewPosts += replies;
								groupNewPosts++; // also count the topic starter
								threadInfo.newPosts = replies + 1;
								threadInfo.replies = replies;
								GM_storeObject(forumInfo.groupname + '.' + topic, threadInfo);

							} else {
								if (threadInfo.replies < replies) {
									threadInfo.newPosts = (replies - threadInfo.replies);
									// don't store replies to keep a clean record
									groupNewPosts += threadInfo.newPosts;
									GM_storeObject(forumInfo.groupname + '.' + topic, threadInfo);

								} else if (replies < threadInfo.replies) { // someone deleted a comment; record
									returnedThreads = 'true';
									threadInfo.deletedItems = 'true';
									threadInfo.replies = replies; // reset - has no effect
									groupNewPosts++;
									GM_storeObject(forumInfo.groupname + '.' + topic, threadInfo);
								}
							}
							// do not attempt to update the envelope of this thread if it has its own envelope
						} else {
							// unknown in local storage, means we haven't seen it the last time
							// could be a thread that returned from pageX
							// or it could be a completely new topic
							// if we read the RSS feed, and it contains all the posts of this thread, it's new
							// (rss feed only contains 10 entries; if posts in thread > 10 => we can't check)
							// if there are no replies yet, it's also new
							if (replies === 0) { // new topic
								groupNewPosts++; // thread start
								// store as new: if it gets some replies, it would be considered a returned thread
								GM_storeObject(forumInfo.groupname + '.' + topic, {
									groupname: forumInfo.groupname,
									topic: topic,
									newPosts: replies + 1,
									replies: replies,
									title: title,
									newTopic: 'true'
								});
							} else {
								returnedThreads = 'true';
								groupNewPosts++;
							}
						}
					});
				});
				callback({ success: true, items: groupNewPosts, returnedThreads: returnedThreads });
			},
			updateInfo: function(element, forumInfo) {
				forumInfo.title = element.getElement('h1[id=Tertiary]').textContent.replace(/\n[^]*$/im, '');
			}
		};
		newSomethingHtmlCall(data);
	}

	function apiCheckForNewPostsInGroup(groupInfo, newPostsIcon) {
		var gm_keyPostfix = preferencesInitData.group.gm_keyPostfix;
		var groupDiscussionUrl = createGroupURL(groupInfo).matchURL;

		var debug = false; //groupInfo.groupname == 'canondslr';
		if (debug) GM_log(["DEBUG: checking posts in group " + groupInfo.groupname,
					"id=" + groupInfo[preferencesInitData.group.identifier],
					"URL=" + groupDiscussionUrl,
					"storedInfo.items=" + groupInfo['replies'],
					"storedInfo.newItems=" + groupInfo['newPosts']
				].join('\n'));
		newPostsIcon.getParent('a').set('href', groupDiscussionUrl);

		newSomethingApiCall({
			initData: preferencesInitData.group,
			storedInfo: groupInfo,
			itemsExtractor: function(result, groupInfo, callback) {
				var storedThreads = retrieveThreadsFromCache(groupInfo.groupname);
				var groupNewPosts = 0;
				var returnedThreads = 'false';
				result.topics.topic.each(function(topic) {
					var title = topic.subject;
					var replies = parseInt(topic.count_replies, 10);
					var topicId = topic.id;
					var topicUrl = 'http://www.flickr.com/groups/' + groupInfo.groupname + '/discuss/' + topicId + '/';
					var threadInfo = storedThreads.get(topicUrl);
					/*storedThreads.getKeys().some(function (key) {
						if (key.match(topicId)) {
							threadInfo = storedThreads.get(key);
							return true;
						}
						return false;
					});*/
					if ($chk(threadInfo)) {
						if (threadInfo.returnedThread === 'true') {
							groupNewPosts += 1;
							returnedThreads = 'true';

						} else if (threadInfo.newTopic === 'true') {
							groupNewPosts += replies;
							groupNewPosts++; // also count the topic starter
							threadInfo.newPosts = replies + 1;
							threadInfo.replies = replies;
							GM_storeObject(groupInfo.groupname + '.' + topicUrl, threadInfo);

						} else {
							if (threadInfo.replies < replies) {
								threadInfo.newPosts = (replies - threadInfo.replies);
								// don't store replies to keep a clean record
								groupNewPosts += threadInfo.newPosts;
								GM_storeObject(groupInfo.groupname + '.' + topicUrl, threadInfo);

							} else if (replies < threadInfo.replies) { // someone deleted a comment; record
								returnedThreads = 'true';
								threadInfo.deletedItems = 'true';
								threadInfo.replies = replies; // reset - has no effect
								groupNewPosts++;
								GM_storeObject(groupInfo.groupname + '.' + topicUrl, threadInfo);
							}
						}
						// do not attempt to update the envelope of this thread if it has its own envelope
					} else {
						// unknown in local storage, means we haven't seen it the last time
						// could be a thread that returned from pageX
						// or it could be a completely new topic
						// if we read the RSS feed, and it contains all the posts of this thread, it's new
						// (rss feed only contains 10 entries; if posts in thread > 10 => we can't check)
						// if there are no replies yet, it's also new
						if (replies === 0) { // new topic
							groupNewPosts++; // thread start
							// store as new: if it gets some replies, it would be considered a returned thread
							GM_storeObject(groupInfo.groupname + '.' + topicUrl, {
								groupname: groupInfo.groupname,
								topic: topicUrl,
								newPosts: replies + 1,
								replies: replies,
								title: title,
								newTopic: 'true'
							});
						} else {
							returnedThreads = 'true';
							groupNewPosts++;
						}
					}
				});
				callback({ success: true, items: groupNewPosts, returnedThreads: returnedThreads });
			},
			updateInfo: function(result, groupInfo) {
				var title = result.topics.name;
				groupInfo.title = title;
			},
			apiData: {
				api_key: GM_getMagisterLudi(),
				auth_hash: GM_getAuthHash(),
				csrf: GM_getCsrf(),
				auth_token: GM_getAuthToken(),
				format: 'json',
				method: 'flickr.groups.discuss.topics.getList',
				nojsoncallback: 1,
				group_id: groupInfo.groupId,
				page: 1,
				per_page: 20
			}
		});
	}

	function createThreadURL(threadInfo) {
		var helpforum = threadInfo.helpforum;
		var gm_keyPostfix = (helpforum ? preferencesInitData.forumitem.gm_keyPostfix : preferencesInitData.thread.gm_keyPostfix);
		var threadURL = (helpforum ?
			"http://www.flickr.com/help/forum/" + threadInfo.groupname + "/" + threadInfo.topic + "/" :
			"http://www.flickr.com/groups/" + threadInfo.groupname + "/discuss/" + threadInfo.topic + "/");
		return { matchURL: threadURL, linkURL: threadURL + (preferences.gotoLastThreadPage() ? '/lastpage' : '') };
	}

	function checkForNewPostsInForumThread(forumItemInfo, newPostsIcon) {
		forumItemInfo.helpforum = true;
		var threadURL = createThreadURL(forumItemInfo).matchURL;

		var data = {
			storedInfo: forumItemInfo,
			initData: preferencesInitData.forumitem,
			URL: threadURL,
			countItemsInPage: countPostsInThreadPage,
			updateInfo: function(element, forumItemInfo) {
				var title = readThreadTitleFromPage(element);
				var groupTitle = readGroupTitleFromPage(element);

				forumItemInfo.groupTitle = groupTitle;
				// title may have been changed
				forumItemInfo.title = title;
				forumItemInfo.locked = false;
				// closed?
				try {
					var focus = element.getElement('p.Locked');
					if ($chk(focus)) forumItemInfo.locked = true;
				} catch(e) {
					GM_log("error checking lock: " + e);
				}
			},
			updateIcon: function(forumItemInfo) {
				try {
					if (forumItemInfo.locked) markThreadLocked(preferencesInitData.forumitem.gm_keyPostfix, forumItemInfo.topic);
				} catch(e) {
					GM_log("error marking lock: " + e);
				}
			}
		};
		newSomethingHtmlCall(data);
	}

	function apiCheckForNewPostsInThread(threadInfo, newPostsIcon) {
		var threadURL = createThreadURL(threadInfo).matchURL;

		//if (threadInfo.locked) markThreadLocked(preferencesInitData.thread.gm_keyPostfix, threadInfo.topic);
		if (!$chk(threadInfo.groupId)) {
			// first fill in the missing groupId v4.0.3, and prior
			getThreadInfo({ threadId: threadInfo.topic, callback: function(retval) {
					var success = retval.success;
					var message = retval.message;
					if (!success) {
						GM_log("error getting thread info: " + message);
						threadInfo.error = true;
						threadInfo.errorMsg = message;
						GM_storeObject('selected' + preferencesInitData.thread.gm_keyPostfix + '.' + threadInfo[preferencesInitData.thread.identifier], threadInfo);
						notifyError(preferencesInitData.thread.gm_keyPostfix, threadInfo.topic, message);
						return;
					}
					threadInfo.groupId = retval.groupId;
					GM_storeObject('selected' + preferencesInitData.thread.gm_keyPostfix + '.' + threadInfo[preferencesInitData.thread.identifier], threadInfo);
					apiCheckForNewPostsInThread(threadInfo, newPostsIcon);
				}
			});
		} else {
			newSomethingApiCall({
				initData: preferencesInitData.thread,
				storedInfo: threadInfo,
				itemsExtractor: function(result, threadInfo, callback) {
					callback({ success: true, items: $chk(result.replies) && $chk(result.replies.topic) && $chk(result.replies.topic.total) ? result.replies.topic.total : 0 });
				},
				updateInfo: function(result, threadInfo) {
					var title = result.replies.topic.subject;
					// TODO: update group name; can be done async
					threadInfo.title = title;
					threadInfo.groupId = result.replies.topic.group_id;
					threadInfo.groupTitle = result.replies.topic.name;
					threadInfo.locked = result.replies.topic.is_locked == 1 || result.replies.topic.is_locked == '1';
					threadInfo.datelastpost = result.replies.topic.datelastpost;
				},
				updateIcon: function(threadInfo) {
					try {
						if (threadInfo.locked) markThreadLocked(preferencesInitData.thread.gm_keyPostfix, threadInfo.topic);
					} catch(e) {
						GM_log("error marking lock: " + e);
					}
				},
				apiData: {
					api_key: GM_getMagisterLudi(),
					auth_hash: GM_getAuthHash(),
					csrf: GM_getCsrf(),
					auth_token: GM_getAuthToken(),
					format: 'json',
					method: 'flickr.groups.discuss.replies.getList',
					nojsoncallback: 1,
					topic_id: threadInfo.topic,
					group_id: threadInfo.groupId,
					page: 1,
					per_page: 1
				}
			});
		}
	}

	function newSomethingHtmlCall(data) {
		var debug = data.debug;
		var URL = data.URL;
		var storedInfo = data.storedInfo;
		var initData = data.initData;
		var countItemsInPage = data.countItemsInPage;
		var updateInfo = data.updateInfo;
		var updateIcon = $chk(data.updateIcon) ? data.updateIcon: function() {};

		storedInfo[initData.error] = true;
		GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);

	    try {	
		new Request({
			url: URL,
			onSuccess: function(responseText, responseXML) {
				try {
					var tempDiv = new Element('div', {
						html: responseText.stripScripts()
					});
					var problem = tempDiv.getElement('p.Problem');
					if ($chk(problem)) {
						GM_log("error reading " + initData.items + " in " + initData.type + ": " + problem.get('html'));
						storedInfo.error = true;
						storedInfo.errorMsg = problem.get('html');
						GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
						notifyError(initData.gm_keyPostfix, storedInfo[initData.identifier], problem.get('html'));
						return;
					}
					// common with ApiCall
					countItemsInPage(tempDiv, function(countResult) {
						if (!countResult.success) {
							storedInfo.error = true;
							storedInfo.errorMsg = countResult.message;
							GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
							notifyError(initData.gm_keyPostfix, storedInfo[initData.identifier], countResult.message);
							return;
						}
						storedInfo.error = false;
						var items = countResult.items;

						var firstTime = initData.type != 'group' && storedInfo[initData.items] === undefined;
						var newsAvailable = firstTime ? 0: (items - storedInfo[initData.items]);
						if (items < storedInfo[initData.items]) { // removed items
							storedInfo[initData.items] = items;
						}
						if (initData.type == 'group' || initData.type == 'helpforum') {
							newsAvailable = items;
						} else {
							newsAvailable = items - storedInfo[initData.items];
						}

						if (!countResult.pending) {
							// don't overwrite the replies!
							storedInfo[initData.newitems] = newsAvailable;
						} else {
							storedInfo[initData.newitems] = items;
							storedInfo[initData.items] = 0;
							newsAvailable = items; // show all as new, for pending
						}
						storedInfo[initData.error] = false;

						updateInfo(tempDiv, storedInfo);

						GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
						notifyNewPosts(initData.gm_keyPostfix, storedInfo[initData.identifier], newsAvailable, countResult.returnedThreads);
						updateIcon(storedInfo);
					});
				} catch(e) {
					GM_log("exception in newSomethingHtmlCall: " + e);
					storedInfo.error = true;
					storedInfo.errorMsg = "exception in newSomethingHtmlCall: " + e;
					GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
					notifyError(initData.gm_keyPostfix, storedInfo[initData.identifier], "exception in newSomethingHtmlCall: " + e);
				}
			},
			onFailure: function(response) {
				try {
					GM_log("reading " + initData.gm_keyPostfix + "." + storedInfo[initData.identifier] + " failed: " + response.statusText);
					storedInfo.error = true;
					storedInfo.errorMsg = response.statusText;
					GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
					notifyError(initData.gm_keyPostfix, storedInfo[initData.identifier], response.statusText);
					// if UNSENT or OPEN, statusText could be empty
				} catch(e) {
					GM_log("error reading " + initData.type + ": " + e);
					notifyError(initData.gm_keyPostfix, storedInfo[initData.identifier], "failed: " + e);
				}
			},
			onException: function(headerName, value) {
				GM_log("exception!!!");
			},
			onCancel: function () {
				GM_log("canceled!!!");
			},
			onTimeout: function () {
				GM_log("timed out!!!");
			}
		}).get();
	    } catch (e) {
		GM_log("newSomethingHtmlCall failed: " + e);
		storedInfo.error = true;
		storedInfo.errorMsg = "Failed: " + e;
		GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
	    }
	}

	function newSomethingApiCall(data) {
		var initData = data.initData;
		var storedInfo = data.storedInfo;
		var itemsExtractor = data.itemsExtractor;
		var updateInfo = data.updateInfo;
		var updateIcon = $chk(data.updateIcon) ? data.updateIcon: function() {}

		storedInfo[initData.error] = true;
		GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);

		new Request({
			url: 'http://www.flickr.com',
			onSuccess: function(responseText, responseXML) {
				try {
					var result;
					try {
						result = JSON.parse(responseText);
					} catch(e) {
						result = eval('(' + responseText + ')');
					}
					if (result.stat === 'fail') {
						GM_log("error reading " + initData.gm_keyPostfix + " page: " + result.message);
						storedInfo.error = true;
						storedInfo.errorMsg = "error reading " + initData.gm_keyPostfix + " page: " + result.message;
						GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
						notifyError(initData.gm_keyPostfix, storedInfo[initData.identifier], result.message);
						return;
					}
					// common with HtmlCall
					itemsExtractor(result, storedInfo, function(countResult) {
						if (!countResult.success) {
							storedInfo.error = true;
							storedInfo.errorMsg = countResult.message;
							GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
							notifyError(initData.gm_keyPostfix, storedInfo[initData.identifier], countResult.message);
							return;
						}
						storedInfo.error = false;
						var items = countResult.items;

						var firstTime = initData.type != 'group' && storedInfo[initData.items] === undefined;
						var newsAvailable = firstTime ? 0: (items - storedInfo[initData.items]);
						if (items < storedInfo[initData.items]) { // removed items
							storedInfo[initData.items] = items;
						}
						if (initData.type == 'group' || initData.type == 'helpforum') {
							if (storedInfo[initData.items] == undefined) { // cleanup the data; not used, though
								storedInfo[initData.items] = 0;
							}
							newsAvailable = items;
						} else {
							newsAvailable = items - storedInfo[initData.items];
						}

						if (!countResult.pending) {
							// don't overwrite comments!, but remember the new comments
							storedInfo[initData.newitems] = newsAvailable;
						} else {
							storedInfo[initData.newitems] = items;
							storedInfo[initData.items] = 0;
							newsAvailable = items; // show all as new, for pending
						}
						storedInfo[initData.error] = false;

						updateInfo(result, storedInfo);

						GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
						notifyNewPosts(initData.gm_keyPostfix, storedInfo[initData.identifier], newsAvailable, countResult.returnedThreads);
						updateIcon(storedInfo);
					});
				} catch(e) {
					GM_log("exception in newSomethingApiCall: " + e);
					storedInfo.error = true;
					storedInfo.errorMsg = "exception in newSomethingApiCall: " + e;
					GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
					notifyError(initData.gm_keyPostfix, storedInfo[initData.identifier], "exception in newSomethingApiCall: " + e);
				}
			},
			onFailure: function(response) {
				try {
					GM_log("reading " + initData.gm_keyPostfix + "." + storedInfo[initData.identifier] + " failed: " + response.statusText);
					storedInfo.error = true;
					storedInfo.errorMsg = "reading failed: " + response.statusText;
					GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
					notifyError(initData.gm_keyPostfix, storedInfo[initData.identifier], "reading " + initData.gm_keyPostfix + "." + storedInfo[initData.identifier] + " failed: " + response.statusText);
				} catch(e) {
					GM_log("error reading " + initData.gm_keyPostfix + ": " + e);
					storedInfo.error = true;
					storedInfo.errorMsg = "error reading: " + e;
					GM_storeObject('selected' + initData.gm_keyPostfix + '.' + storedInfo[initData.identifier], storedInfo);
					notifyError(initData.gm_keyPostfix, storedInfo[initData.identifier], "error reading " + initData.gm_keyPostfix + "." + storedInfo[initData.identifier] + ": " + e);
				}
			}
		}).get('/services/rest', data.apiData);
	}

	function createPhotoPageURL(photoInfo) {
		var photoPageURL = "http://www.flickr.com/photos/" + 
			(photoInfo.ownerId ? photoInfo.ownerId: photoInfo.username) + "/" + photoInfo.photoId + "/";
		var linkURL = photoPageURL;
		if (preferences.gotoLastThreadPage()) {
			var page = Math.ceil(photoInfo.comments / 50);
			if (page > 1) {
				linkURL = photoPageURL + 'page' + page + '/';
			}
		}
		return { matchURL: photoPageURL, linkURL: linkURL };
	}

	function checkForNewCommentsInPhotoPage(photoInfo, newPostsIcon) {
		newSomethingApiCall({
			initData: preferencesInitData.photo,
			storedInfo: photoInfo,
			itemsExtractor: function(result, photoInfo, callback) {
				callback({ success: true, items: $chk(result.photo) && $chk(result.photo.comments) ? result.photo.comments._content : 0 });
			},
			updateInfo: function(result, photoInfo) {
				// title can have been changed
				photoInfo.title = result.photo.title._content;
				// store possibly empty owner id
				photoInfo.ownerId = result.photo.owner.nsid;
				// username may have been changed
				photoInfo.username = result.photo.owner.username;
			},
			apiData: {
				api_key: GM_getMagisterLudi(),
				auth_hash: GM_getAuthHash(),
				csrf: GM_getCsrf(),
				auth_token: GM_getAuthToken(),
				format: 'json',
				method: 'flickr.photos.getInfo',
				nojsoncallback: 1,
				photo_id: photoInfo.photoId
			}
		});
	}

	function createPhotostreamURL(streamInfo) {
		var streamURL = "http://www.flickr.com/photos/" + streamInfo.username + "/";
		return { matchURL: streamURL, linkURL: streamURL };
	}

	function checkForNewPhotosInPhotostream(streamInfo, newPostsIcon) {
		newSomethingApiCall({
			initData: preferencesInitData.photostream,
			storedInfo: streamInfo,
			itemsExtractor: function(result, streamInfo, callback) {
				callback({ success: true, items: $chk(result.person) && $chk(result.person.photos) && $chk(result.person.photos.count) ? result.person.photos.count._content : 0 });
			},
			updateInfo: function(result, streamInfo) {
				// display name can have been changed
				if (result.person.realname) {
					streamInfo.title = result.person.realname._content;
				}
				if (!$chk(streamInfo.title)) {
					streamInfo.title = result.person.username._content;
				}
				if (!$chk(streamInfo.title)) {
					streamInfo.title = streamInfo.username;
				}
			},
			apiData: {
				api_key: GM_getMagisterLudi(),
				auth_hash: GM_getAuthHash(),
				csrf: GM_getCsrf(),
				auth_token: GM_getAuthToken(),
				format: 'json',
				method: 'flickr.people.getInfo',
				nojsoncallback: 1,
				user_id: streamInfo.userNsid
			}
		});
	}

	function createGroupMembersURL(groupmembersInfo) {
		var membersURL = "http://www.flickr.com/groups_members.gne?id=" + groupmembersInfo.groupId;
		var matchURL = "http:\\/\\/www.flickr.com\\/groups_members.gne\\?id=" + groupmembersInfo.groupId;
		if ($chk(groupmembersInfo.groupname)) {
			matchURL = matchURL + "|" + "http:\\/\\/www.flickr.com\\/groups\\/" + groupmembersInfo.groupname + "\\/members\\/";
		}
		return { matchURL: matchURL, linkURL: membersURL };
	}

	function checkForNewMembersInGroup(groupmembersInfo, newPostsIcon) {
		newSomethingApiCall({
			initData: preferencesInitData.groupmembers,
			storedInfo: groupmembersInfo,
			itemsExtractor: function(result, groupmembersInfo, callback) {
				callback({ success: true, items: $chk(result.members) ? result.members.total : 0 });
			},
			updateInfo: function(result, groupmembersInfo) {
				// group title info not available in API result
				// updating group title on processGroupMembersPage
			},
			apiData: {
				api_key: GM_getMagisterLudi(),
				auth_hash: GM_getAuthHash(),
				csrf: GM_getCsrf(),
				auth_token: GM_getAuthToken(),
				format: 'json',
				method: 'flickr.groups.members.getList',
				nojsoncallback: 1,
				group_id: groupmembersInfo.groupId,
				//membertypes: 2, count all members: a new member could already have been promoted
				per_page: 1
			}
		});
	}

	function createGroupPoolURL(grouppoolInfo) {
		var poolURL = "http://www.flickr.com/groups/" + grouppoolInfo.groupname + "/pool/";
		return { matchURL: poolURL, linkURL: poolURL };
	}

	function checkForNewPhotosInGroupPool(grouppoolInfo, newPostsIcon) {
		newSomethingApiCall({
			initData: preferencesInitData.grouppool,
			storedInfo: grouppoolInfo,
			itemsExtractor: function(result, grouppoolInfo, callback) {
				callback({ success: true, items: $chk(result.photos) ? result.photos.total : 0 });
			},
			updateInfo: function(result, grouppoolInfo) {
				// group title not available in API result
				// updating title in processGroupPoolPage
			},
			apiData: {
				api_key: GM_getMagisterLudi(),
				auth_hash: GM_getAuthHash(),
				csrf: GM_getCsrf(),
				auth_token: GM_getAuthToken(),
				format: 'json',
				method: 'flickr.groups.pools.getPhotos',
				per_page: 1,
				nojsoncallback: 1,
				group_id: grouppoolInfo.groupId
			}
		});
	}

	function createReversedContactsURL(reversedContactsInfo) {
		var URL = "http://www.flickr.com/people/" + reversedContactsInfo.username + "/contacts/rev/";
		return { matchURL: URL, linkURL: URL };
	}

	function checkForNewReversedContacts(reversedContactsInfo, newPostsIcon) {
		var URL = createReversedContactsURL(reversedContactsInfo).matchURL;
		
		newSomethingHtmlCall({
			storedInfo: reversedContactsInfo,
			initData: preferencesInitData.reversedcontacts,
			URL: URL,
			countItemsInPage: countReversedContacts,
			updateInfo: function(element, reversedContactsInfo) {
			}
		});
	}

	function checkForPendingSomething(pendingSomethingInfo, callData) {
		var initData = callData.initData;
		var URL = callData.URL;
		var title = callData.title;
		var countPendingSomethingFunction = callData.countItems;
		var updatePendingSomethingInfoFunction = callData.updateInfo;

		newSomethingHtmlCall({
			storedInfo: pendingSomethingInfo,
			initData: initData,
			URL: URL,
			countItemsInPage: countPendingSomethingFunction,
			updateInfo: function(element, pendingSomethingInfo) {
				return updatePendingSomethingInfoFunction(element, pendingSomethingInfo);
			}
		});
	}

	function createPendingItemsURL(pendingItemsInfo) {
		var URL = "http://www.flickr.com/groups/" + pendingItemsInfo.groupname + "/admin/pending/";
		return { matchURL: URL, linkURL: URL };
	}

	function checkForPendingItems(pendingItemsInfo, newPostsIcon) {
		var title = 'Pending items: ' + pendingItemsInfo.title;
		var URL = createPendingItemsURL(pendingItemsInfo).matchURL;
		
		checkForPendingSomething(pendingItemsInfo, {
			initData: preferencesInitData.pendingitems,
			URL: URL,
			title: title,
			countItems: countPendingItems,
			updateInfo: function(element, pendingItemsInfo) {
				pendingItemsInfo.title = readGroupTitleFromPage(element);
			}
		});
	}

	function createPendingTestimonialsURL(pendingTestimonialsInfo) {
		var URL = "http://www.flickr.com/testimonials_manage.gne";
		return { matchURL: URL, linkURL: URL };
	}

	function checkForPendingTestimonials(pendingTestimonialsInfo, newPostsIcon) {
		var title = 'Pending testimonials';
		var URL = createPendingTestimonialsURL(pendingTestimonialsInfo).matchURL;
		
		checkForPendingSomething(pendingTestimonialsInfo, {
			initData: preferencesInitData.pendingtestimonials,
			URL: URL,
			title: title,
			countItems: countPendingTestimonials,
			updateInfo: function(element, pendingTestimonialsInfo) {
			}
		});
	}

	function createPendingMembersURL(pendingMembersInfo) {
		var URL = "http://www.flickr.com/groups_pending.gne?id=" + pendingMembersInfo.groupId;
		return { matchURL: URL, linkURL: URL };
	}

	function checkForPendingMembers(pendingMembersInfo, newPostsIcon) {
		var title = 'Pending members: ' + pendingMembersInfo.title;
		var URL = createPendingMembersURL(pendingMembersInfo).matchURL;
		
		checkForPendingSomething(pendingMembersInfo, {
			initData: preferencesInitData.pendingmembers,
			URL: URL,
			title: title,
			countItems: countPendingMembers,
			updateInfo: function(element, pendingMembersInfo) {
				var title = element.getElement('*[id=Tertiary]').getElements('a')[1].get('text');
				pendingMembersInfo.title = title;
			}
		});
	}

	function createAppURL(appInfo) {
		var URL = "http://www.flickr.com/services/apps/" + appInfo.appId + "/";
		return { matchURL: URL, linkURL: URL };
	}

	function checkForNewAppComments(appInfo, newPostsIcon) {
		var URL = createAppURL(appInfo).matchURL;
	
		newSomethingHtmlCall({
			storedInfo: appInfo,
			initData: preferencesInitData.app,
			URL: URL,
			countItemsInPage: countCommentsInAppPage,
			updateInfo: function(element, appInfo) {
				var title = element.getElement('h1').get('text');
				var username = element.getElement('*[id=ag-owner-attr]').getElement('b').get('html');
				appInfo.title = title;
				appInfo.username = username;
			}
		});
	}

	function createSetURL(setInfo) {
		var setURL = "http://www.flickr.com/photos/" + setInfo.username + "/sets/" + setInfo.setId + "/comments/";
		return { matchURL: setURL, linkURL: setURL };
	}

	function checkForNewSetComments(setInfo, newPostsIcon) {
		
		newSomethingApiCall({
			initData: preferencesInitData.set,
			storedInfo: setInfo,
			itemsExtractor: function(result, setInfo, callback) {
				callback({ success: true, items: ($chk(result.comments) && $chk(result.comments.comment) ? result.comments.comment.length : 0) });
			},
			updateInfo: function(result, setInfo) {
				// no set name, or username in API result
				// updating info on processSetPage
			},
			apiData: {
				api_key: GM_getMagisterLudi(),
				auth_hash: GM_getAuthHash(),
				csrf: GM_getCsrf(),
				auth_token: GM_getAuthToken(),
				format: 'json',
				method: 'flickr.photosets.comments.getList',
				per_page: 500,
				nojsoncallback: 1,
				photoset_id: setInfo.setId
			}
		});
		/* 'Set: ' + setInfo.title + '(by ' + setInfo.realname + ')', */
	}

	function createUserFavoritesURL(userInfo) {
		var favoritesURL = "http://www.flickr.com/photos/" + userInfo.userpath + "/favorites/";
		return { matchURL: favoritesURL, linkURL: favoritesURL };
	}

    function checkForNewUserFavorites(userInfo, newPostsIcon) {
	
	newSomethingApiCall({
		initData: preferencesInitData.favorites,
		storedInfo: userInfo,
		itemsExtractor: function(result, userInfo, callback) {
			callback({ success: true, items: $chk(result.photos) ? result.photos.total : 0 });
		},
		updateInfo: function(result, userInfo) {
			// no info in API result that we can use
		},
		apiData: {
			api_key: GM_getMagisterLudi(),
			auth_hash: GM_getAuthHash(),
			csrf: GM_getCsrf(),
			auth_token: GM_getAuthToken(),
			format: 'json',
			method: 'flickr.favorites.getList',
			per_page: 1,
			nojsoncallback: 1,
			user_id: userInfo.userNsid
		}
	});
    }

	var watchTypes = {
		group: {
			add: 'add this group\'s Discuss page to the Flickr Notifications watchlist',
			remove: 'remove this group\'s Discuss page from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.group.gm_keyPostfix,
			discussPage: true,
			id: undefined // groupname
		},
		helpforum: {
			add: 'add this help forum to the Flickr Notifications watchlist',
			remove: 'remove this help forum from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.helpforum.gm_keyPostfix,
			helpForum: true,
			id: undefined // groupname
		},
		thread: {
			add: 'add this thread to the Flickr Notifications watchlist',
			remove: 'remove this thread from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.thread.gm_keyPostfix,
			discussThread: true,
			id: undefined // topic
		},
		forumitem: {
			add: 'add this help item to the Flickr Notifications watchlist',
			remove: 'remove this help item from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.forumitem.gm_keyPostfix,
			forumItem: true,
			id: undefined // topic
		},
		photo: {
			add: 'add this photo to the Flickr Notifications watchlist',
			remove: 'remove this photo from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.photo.gm_keyPostfix,
			photoPage: true,
			id: undefined // photoId
		},
		photostream: {
			add: 'add this photostream to the Flickr Notifications watchlist',
			remove: 'remove this photostream from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.photostream.gm_keyPostfix,
			photoStream: true,
			id: undefined // username
		},
		groupmembers: {
			add: 'add this group\'s members page to the Flickr Notifications watchlist',
			remove: 'remove this group\'s members page from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.groupmembers.gm_keyPostfix,
			groupmembers: true,
			id: undefined // groupId
		},
		grouppool: {
			add: 'add this group\'s pool page to the Flickr Notifications watchlist',
			remove: 'remove this group\'s pool page from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.grouppool.gm_keyPostfix,
			grouppool: true,
			id: undefined // groupId
		},
		reversedcontacts: {
			add: 'add this reversed contacts page to the Flickr Notifications watchlist',
			remove: 'remove this reversed contacts page from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.reversedcontacts.gm_keyPostfix,
			reversedcontacts: true,
			id: undefined // usernsid
		},
		pendingitems: {
			add: 'add this group\'s pending items page to the Flickr Notifications watchlist',
			remove: 'remove this group\'s pending items page from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.pendingitems.gm_keyPostfix,
			pendingitems: true,
			id: undefined // groupname
		},
		app: {
			add: 'add this application page to the Flickr Notifications watchlist',
			remove: 'remove this application page from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.app.gm_keyPostfix,
			app: true,
			id: undefined // application id
		},
		set: {
			add: 'add this set to the Flickr Notifications watchlist',
			remove: 'remove this set from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.set.gm_keyPostfix,
			set: true,
			id: undefined // set id
		},
		pendingtestimonials: {
			add: 'add this testimonials page to the Flickr Notifications watchlist',
			remove: 'remove this testimonials page from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.pendingtestimonials.gm_keyPostfix,
			pendingtestimonials: true,
			id: undefined // usernsid
		},
		pendingmembers: {
			add: 'add this group\'s pending members page to the Flickr Notifications watchlist',
			remove: 'remove this group\'s pending members page from the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.pendingmembers.gm_keyPostfix,
			pendingmembers: true,
			id: undefined // group id
		},
		favorites: {
			add: 'add this user\'s favorites page to the Flickr Notifications watchlist',
			gm_keyPostfix: preferencesInitData.favorites.gm_keyPostfix,
			favorites: true,
			id: undefined // usernsid
		}
	};

	function addMinusIcon(watchType) {
		if ($chk($('NFPN.plusmin.icon.' + watchType.gm_keyPostfix + '.' + watchType.id))) { // already there
			return $('NFPN.plusmin.icon.' + watchType.gm_keyPostfix + '.' + watchType.id);
		}
		var icon = new Element('img', {
			src: images.minus,
			id: 'NFPN.plusmin.icon.' + watchType.gm_keyPostfix + '.' + watchType.id,
			height: '10px',
			styles: {
				cursor: 'pointer',
				'padding-left': '1px',
				'padding-right': '1px'
			},
			title: watchType.remove,
			events: {
				click: function() {
					GM_deleteValue('selected' + watchType.gm_keyPostfix + '.' + watchType.id);
					if (watchType.discussPage === true || watchType.helpForum === true) {
						// removeThreadsFromCache
						var groupname = watchType.id;
						var reMatch = new RegExp("^" + groupname + "\\.");
						var threadKeys = GM_listKeys(reMatch); // do not use the callback version => delete creates havoc
						$each(threadKeys, function(key) {
							GM_log("DEBUG: removing key '" + key + "'");
							GM_deleteValue(key);
						});
					}
					this.set('id', 'toberemoved');

					addPlusIcon(watchType).replaces($(this));

					// the following code could error out if we are on an item that has a key set, but with an invalid object
					resetPostsIcon(watchType.gm_keyPostfix, watchType.id).dispose();
				}
			}
		}).inject($('NFPN.envelopes'));
		return icon;
	}

	function addPlusIcon(watchType) {
		if ($chk($('NFPN.plusmin.icon.' + watchType.gm_keyPostfix + '.' + watchType.id))) { // already there
			return $('NFPN.plusmin.icon.' + watchType.gm_keyPostfix + '.' + watchType.id);
		}
		var icon = new Element('img', {
			src: images.plus,
			id: 'NFPN.plusmin.icon.' + watchType.gm_keyPostfix + '.' + watchType.id,
			height: '10px',
			styles: {
				cursor: 'pointer',
				'padding-left': '1px',
				'padding-right': '1px'
			},
			title: watchType.add,
			events: {
				click: function() {
					try {
						createPostsIcon({
							prefix: watchType.gm_keyPostfix,
							id: watchType.id,
							url: "javascript:void(0);",
							title: watchType.title,
							isStored: false
						});
						var newPostsIcon = $('NFPN.' + watchType.gm_keyPostfix + '.' + watchType.id);
						newPostsIcon.src = images.ok; // for some reason, the ok image is not shown
						newPostsIcon.height = 16;

						var processPageFunction = undefined;
						if (watchType.discussPage === true) {
							var groupId = GM_getGroupId();
							if (watchType.fromGroupPage) {
								GM_storeObject('selectedGroup.' + watchType.id, {
									groupname: watchType.id,
									groupId: groupId,
									title: watchType.title
								});
							} else {
								processPageFunction = processDiscussPage;
								var groupTitle = readGroupTitleFromPage();
								GM_storeObject('selectedGroup.' + watchType.id, {
									groupname: watchType.id,
									title: groupTitle,
									groupId: groupId
								});
								watchType.title = groupTitle;
							}

						} else if (watchType.helpForum === true) {
							processPageFunction = processHelpForumPage;
							var forumTitle = $('Tertiary').textContent.replace(/\n[^]*$/im, '');
							GM_storeObject('selectedHelpforum.' + watchType.id, {
								groupname: watchType.id,
								title: forumTitle
							});
							watchType.title = forumTitle;

						} else if (watchType.discussThread === true) {
							processPageFunction = processThreadPage;
							var threadTitle = readThreadTitleFromPage();
							var titleHeader = $('Tertiary');
							var groupTitle = readGroupTitleFromPage();
							countPostsInThreadPage($(document), function (count) {
								if (!count.success) {
									notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
									return;
								}
								var bgColor;
								var metaInfo = GM_getObject('selectedGroup.' + watchType.groupname);
								if (metaInfo.key_present) {
									var selectedGroup = metaInfo.value;
									if (selectedGroup) {
										bgColor = selectedGroup.bgColor;
									}
								}
								GM_storeObject('selectedThread.' + watchType.id, {
									topic: watchType.id,
									groupname: watchType.groupname,
									groupTitle: groupTitle,
									groupId: groupId,
									title: threadTitle,
									replies: count.items,
									bgColor: bgColor
								});
							});
							watchType.title = threadTitle;

						} else if (watchType.forumItem === true) {
							processPageFunction = processForumItemPage;
							var threadTitle = $('GoodStuff').getElement('h2').get('html');
							countPostsInThreadPage($(document), function(count) {
								if (!count.success) {
									notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
									return;
								}
								var forumTitle = getMain().getElements('h1 a')[1].textContent.replace(/\n[^]*$/im, '');
								GM_storeObject('selectedForumitem.' + watchType.id, {
									topic: watchType.id,
									groupTitle: forumTitle,
									groupname: watchType.groupname,
									title: threadTitle,
									replies: count.items
								});
							});
							watchType.title = threadTitle;

						} else if (watchType.photoPage === true) {
							processPageFunction = processPhotoPage;
							var main = getMain();
							if ($chk(main)) {
								var photoTitle = main.getElement('h1').get('html');
							} else {
								// new photo page
								photoTitle = $('content').getElement('span.photo-title').get('text');
							}
							countCommentsInPhotoPage(function (count) {
								if (!count.success) {
									notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
									return;
								}
								GM_storeObject('selectedPhoto.' + watchType.id, {
									photoId: watchType.id,
									username: watchType.username,
									title: photoTitle,
									comments: count.items
								});
							});
							watchType.title = photoTitle;
						} else if (watchType.photoStream === true) {
							processPageFunction = processPhotostreamPage;
							countPhotosInPhotostream(function (count) {
								if (!count.success) {
									notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
									return;
								}
								GM_storeObject('selectedPhotostream.' + watchType.id, {
									username: watchType.username,
									userNsid: watchType.id,
									title: watchType.username, // temporary
									photos: count.items
								});
							});
							watchType.title = watchType.username;

						} else if (watchType.groupmembers === true) {
							if (watchType.fromGroupPage) {
								var count = getMain().getElement('span.LinksNew');
								if ($chk(count)) { // oldLayout
									count = count.getElement('a[href*=members]').get('text');
								} else {
									count = getMain().getElement('div.group-members h1').get('text');
								}
								GM_storeObject('selectedGroupmembers.' + watchType.id, {
									groupId: watchType.id,
									title: watchType.title,
									members: parseInt(count.replace(/[^\d]/g, ''), 10)
								});
							} else {
								processPageFunction = processGroupMembersPage;
								countMembersInGroup(function (count) {
									if (!count.success) {
										notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
										return;
									}
									GM_storeObject('selectedGroupmembers.' + watchType.id, {
										groupId: watchType.id,
										title: watchType.title,
										members: count.items
									});
								});
							}

						} else if (watchType.grouppool === true) {
							var reGroupnameMatch = /.*flickr.com\/groups\/([^\/]*)\/?/;
							var groupname = reGroupnameMatch.exec(document.location.href)[1];
							if (watchType.fromGroupPage &&
								$chk($('span_see_all'))) { // old navigation bar
									var count = $('span_see_all').get('text');
									GM_storeObject('selectedGrouppool.' + watchType.id, {
										groupId: watchType.id,
										groupname: groupname,
										title: watchType.title,
										photos: parseInt(count.replace(/[^\d]/g, ''), 10)
									});
							} else { // new navigation bar => pool/ pages no longer exist => count photos on group page
								processPageFunction = watchType.fromGroupPage ? processGroupPage : processGroupPoolPage;
								countPhotosInGroupPage(function(count) {
									if (!count.success) {
										notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
										return;
									}
									GM_storeObject('selectedGrouppool.' + watchType.id, {
										groupId: watchType.id,
										groupname: groupname,
										title: watchType.title,
										photos: count.items
									});
								});
							}

						} else if (watchType.reversedcontacts === true) {
							processPageFunction = processReversedContactsPage;
							countReversedContacts($(document), function (count) {
								if (!count.success) {
									notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
									return;
								}
								var username = /www.flickr.com\/people\/([^\/]+)\/contacts\/rev/.exec(document.location.href)[1];
								GM_storeObject('selectedReversedcontacts.' + watchType.id, {
									userNsid: watchType.id,
									username: username,
									title: watchType.title,
									members: count.items
								});
							});

						} else if (watchType.pendingitems === true) {
							if (watchType.fromGroupPage) {
								GM_storeObject('selectedPendingitems.' + watchType.id, {
									groupname: watchType.id,
									title: watchType.title,
									items: 0
								});

							} else {
								processPageFunction = processPendingItemsPage;
								countPendingItems($(document), function (count) {
									if (!count.success) {
										notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
										return;
									}
									GM_storeObject('selectedPendingitems.' + watchType.id, {
										groupname: watchType.id,
										title: watchType.title,
										items: count.items
									});
								});
							}
						} else if (watchType.app=== true) {
							processPageFunction = processAppPage;
							countCommentsInAppPage($(document), function(count) {
								if (!count.success) {
									notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
									return;
								}
								GM_storeObject('selectedApp.' + watchType.id, {
									appId: watchType.id,
									username: watchType.username,
									title: watchType.title,
									comments: count.items
								});
							});
						} else if (watchType.set === true) {
							processPageFunction = processSetPage;
							countCommentsInSetPage($(document), function(count) {
								if (!count.success) {
									notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
									return;
								}
								GM_storeObject('selectedSet.' + watchType.id, {
									setId: watchType.id,
									username: watchType.username,
									realname: watchType.realname,
									title: watchType.title,
									comments: count.items
								});
							});

						} else if (watchType.pendingtestimonials === true) {
							processPageFunction = processPendingTestimonialsPage;
							countPendingTestimonials($(document), function (count) {
								if (!count.success) {
									notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
									return;
								}
								GM_storeObject('selectedPendingtestimonials.' + watchType.id, {
									userNsid: watchType.id,
									title: watchType.title,
									items: count.items
								});
							});

						} else if (watchType.pendingmembers === true) {
							if (watchType.fromGroupPage) {
								GM_storeObject('selectedPendingmembers.' + watchType.id, {
									groupId: watchType.id,
									title: watchType.title,
									items: 0
								});

							} else {
								processPageFunction = processPendingMembersPage;
								countPendingMembers($(document), function(count) {
									if (!count.success) {
										notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
										return;
									}
									GM_storeObject('selectedPendingmembers.' + watchType.id, {
										groupId: watchType.id,
										title: watchType.title,
										items: count.items
									});
								});
							}
					
						} else if (watchType.favorites === true) {
							processPageFunction = processFavoritesPage;
							var main = getMain();
							countFavoritesForUser(function (count) {
								if (!count.success) {
									notifyError(watchType.gm_keyPostfix, watchType.id, count.message);
									return;
								}
								GM_storeObject('selectedFavorites.' + watchType.id, {
									userNsid: watchType.id,
									userpath: watchType.userpath,
									title: watchType.title,
									favorites: count.items
								});
							});
						}

						// this.dispose();
						this.set('id', 'toberemoved');
						
						addMinusIcon(watchType).replaces($(this));

						if (processPageFunction) {
						try {
							processPageFunction();
						} catch(e) {
							notifyError(watchType.gm_keyPostfix, watchType.id, e);
						}
						}
					} catch(e) {
						this.set('src', images.error);
						this.set('title', this.get('alt') + ": " + e);
						this.removeEvent('click');
						var newPostsIcon = $('NFPN.' + watchType.gm_keyPostfix + '.' + watchType.id);
						if ($chk(newPostsIcon)) newPostsIcon.dispose();
						return;
					}
				}
			}
		}).inject($('NFPN.envelopes'));
		return icon;
	}

	function addPlusMinIconOnHelpforumPage(data) {
		var topic = data.topic;
		var groupname = data.groupname;
		var cell = data.cell;
		var watchType = watchTypes.forumitem;
		if ($chk($('NFPN.plusmin.icon.thread.' + topic))) { // already present
			return;
		}
		cell.setStyle('white-space','nowrap');

		var threadInfo = GM_getObject('selected' + watchType.gm_keyPostfix + '.' + topic);

		if ($chk(threadInfo) && threadInfo.key_present) {
			new Element('img', {
				src: images.minus,
				id: 'NFPN.plusmin.icon.thread.' + topic,
				height: '8px',
				styles: {
					cursor: 'pointer'
				},
				title: watchType.remove,
				events: {
					click: function(evt) {
						var target = $(evt.target);
						var topic = target.get('id').replace('NFPN.plusmin.icon.thread.', '');
						target.dispose();
						GM_deleteValue('selected' + watchType.gm_keyPostfix + '.' + topic);
						addPlusMinIconOnHelpforumPage(data);
						// the following code could error out if we are on an item that has a key set, but with an invalid object
						resetPostsIcon(watchType.gm_keyPostfix, topic).dispose();
					}
				}
			}).inject(cell, 'top');
		} else {
			new Element('img', {
				src: images.plus,
				id: 'NFPN.plusmin.icon.thread.' + topic,
				height: '8px',
				styles: {
					cursor: 'pointer'
				},
				title: watchType.add,
				events: {
					click: function() {
						var threadTitle = this.getParent('tr').getElements('td')[0].getElement('a').textContent;
						var replies = parseInt(this.getParent('tr').getElements('td')[2].textContent.match(/^(\d+)/)[1]);
						var groupTitle = $$('h1 a')[0].textContent;
						var groupname = document.location.href.match(/.*flickr.com\/help\/forum\/([^\/]*)/)[1];
						var bgColor;
						var metaInfo = GM_getObject('selectedHelpforum.' + groupname);
						if (metaInfo.key_present) {
							var selectedGroup = metaInfo.value;
							if (selectedGroup) {
								bgColor = selectedGroup.bgColor;
							}
						}

						GM_storeObject('selectedForumitem.' + topic, {
							topic: topic,
							groupname: groupname,
							groupTitle: groupTitle,
							groupId: GM_getGroupId(),
							title: threadTitle,
							replies: replies,
							bgColor: bgColor
						});
						watchType.title = threadTitle;

						this.dispose();
						createPostsIcon({
							prefix: watchType.gm_keyPostfix,
							id: topic,
							url: "javascript:void(0);",
							title: threadTitle,
							isStored: true
						});
						var newPostsIcon = $('NFPN.' + watchType.gm_keyPostfix + '.' + topic);
						newPostsIcon.src = images.ok;
						newPostsIcon.height = 16;
						addPlusMinIconOnHelpforumPage(data);
					}
				}
			}).inject(cell, 'top');
		}
	}

	function addPlusMinIconOnDiscussPage(data) {
		var topic = data.topic;
		var groupname = data.groupname;
		var cell = data.cell;
		var watchType = watchTypes.thread;
		if ($chk($('NFPN.plusmin.icon.thread.' + topic))) { // already present
			return;
		}
		var oldLayout = $chk(getMain().getElement('table.TopicListing'));
		if (oldLayout) cell.setStyle('white-space','nowrap');

		var threadInfo = GM_getObject('selected' + watchType.gm_keyPostfix + '.' + topic);

		if ($chk(threadInfo) && threadInfo.key_present) {
			new Element('img', {
				src: images.minus,
				id: 'NFPN.plusmin.icon.thread.' + topic,
				height: '8px',
				styles: {
					cursor: 'pointer'
				},
				title: watchType.remove,
				events: {
					click: function(evt) {
						var target = $(evt.target);
						var topic = target.get('id').replace('NFPN.plusmin.icon.thread.', '');
						target.dispose();
						GM_deleteValue('selected' + watchType.gm_keyPostfix + '.' + topic);
						addPlusMinIconOnDiscussPage(data);
						// the following code could error out if we are on an item that has a key set, but with an invalid object
						resetPostsIcon(watchType.gm_keyPostfix, topic).dispose();
					}
				}
			}).inject(cell, 'top');
		} else {
			new Element('img', {
				src: images.plus,
				id: 'NFPN.plusmin.icon.thread.' + topic,
				height: '8px',
				styles: {
					cursor: 'pointer'
				},
				title: watchType.add,
				events: {
					click: function() {
						var titleColumn = -1;
						try {
							var headers = this.getParent('table').getElement('tr').getElements('th,td');
							if (headers[0].get('html').match(/UCP-ng/)) {
								titleColumn = 1;
							} else {
								titleColumn = 0;
							}
							var threadTitle = this.getParent('tr').getElements('td')[titleColumn].getElement('a').textContent;
							var replies = parseInt(this.getParent('tr').getElements('td')[titleColumn + 2].textContent.match(/^(\d+)/)[1]);
						} catch (e) { // new group layout
							threadTitle = this.getParent('li').getElement('div h3 a').get('text').trim();
							replies = parseInt(this.getParent('li').getElement('span.reply-count').get('text').match(/(\d+)/)[1], 10);
						}
						var groupTitle = readGroupTitleFromPage();
						var groupname = document.location.href.match(/.*flickr.com\/groups\/([^\/]+)/)[1];
						var bgColor;
						var metaInfo = GM_getObject('selectedGroup.' + groupname);
						if (metaInfo.key_present) {
							var selectedGroup = metaInfo.value;
							if (selectedGroup) {
								bgColor = selectedGroup.bgColor;
							}
						}

						GM_storeObject('selectedThread.' + topic, {
							topic: topic,
							groupname: groupname,
							groupTitle: groupTitle,
							groupId: GM_getGroupId(),
							title: threadTitle,
							replies: replies,
							bgColor: bgColor
						});
						watchType.title = threadTitle;

						this.dispose();
						createPostsIcon({
							prefix: watchType.gm_keyPostfix,
							id: topic,
							url: "javascript:void(0);",
							title: threadTitle,
							isStored: true
						});
						var newPostsIcon = $('NFPN.' + watchType.gm_keyPostfix + '.' + topic);
						newPostsIcon.src = images.ok;
						newPostsIcon.height = 16;
						addPlusMinIconOnDiscussPage(data);
					}
				}
			}).inject(cell, 'top');
		}
	}

	function checkForNewPosts() {
		// insert the preferences icon first
		addPreferencesMenuItem();
		// loop the watched items
		var keys = GM_listKeys(); // we need them all
		$each(preferencesInitData, function(initData) {
			try {
				var debug = false; // initData.type === 'group';
				var needsSeparator = false;
				var reKey = new RegExp('^selected' + initData.gm_keyPostfix + '\\.');
				var now = new Date().getTime();
				// bug fix: we should not check on the type's lastChecked time, but on the item's lastChecked time
				GM_deleteValue(initData.gm_keyPostfix + ".lastChecked");
				keys.forEach(function(key) {
					if (key.match(reKey)) {
						var metaInfo = GM_getObject(key);
						if (metaInfo.key_present && $chk(metaInfo.value)) {
							var storedInfo = metaInfo.value;
							// there could be selectedSomething.undefined keys in there!
							//if (debug) GM_log("DEBUG: key=" + key.replace(reKey, ''));
							if (key.replace(reKey, '') != 'undefined' && $chk(storedInfo)) {
								var keyParts = key.match(/^selected([^\.]+)\.(.*)$/);
								var gm_keyPostfix = keyParts[1];
								var id = keyParts[2];
								var envelope = createPostsIcon({
									prefix: gm_keyPostfix,
									id: id,
									url: initData.urlCreator(storedInfo).linkURL,
									title: initData.gm_keyPostfix + ":" + storedInfo.title,
									bgColor: storedInfo.bgColor,
									isStored: true
								});
								if (key.match(/selectedGroup\./) && !$chk(storedInfo.groupId)) {
									envelope.fireEvent('needs-conversion');
								} else {
									if (storedInfo[initData.error] == true || storedInfo[initData.error] == 'true')  {
										envelope.fireEvent('show-error', storedInfo.errorMsg);
										setTimeout(function() {
											envelope.fireEvent('run-check');
										}, 500);
									} else {
										envelope.fireEvent('set-count', { newPosts: storedInfo[initData.newitems], returnedThreads: storedInfo.returnedThreads });
									}
									if (storedInfo.locked) {
										envelope.fireEvent('mark-locked');
									}
								}
								needsSeparator = true;
								return;
							}
						}
						var type = initData.type;
						var url;
						var html;
						var report = reportMissingObject({
							type: type,
							url: url,
							html: html,
							key: key
						});
						try {
							if (key.match(/selectedPhoto\./)) {
								var photoId = /selectedPhoto.(.*)/.exec(key)[1]; // NOT \d+ : could be 'undefined'
								if (photoId.match(/^\d+$/)) photoId = photoId.match(/^(\d+)$/)[1];
								report.fireEvent('update-link', { url: 'http://www.flickr.com/photo.gne?id=' + photoId });

							} else if (key.match(/selectedPhotostream\./)) {
								var userNsid = /selectedPhotostream\.(.*)/.exec(key)[1];
								resolveUsername(userNsid, function(user) {
									report.fireEvent('update-link', { url: 'http://www.flickr.com/photos/' + ($chk(user.displaypath) ? user.displaypath : userNsid) + '/' });
								});

							} else if (key.match(/selectedThread\./)) {
								threadId = /selectedThread\.(.*)/.exec(key)[1];
								// we need missing 'groupname' => use API
								if (metaInfo.key_present) {
									var threadInfo = metaInfo.value;
									url = "http://www.flickr.com/groups/" + threadInfo.groupname + "/discuss/" + threadInfo.topic + "/";
								} else {
									url = "http://www.flickr.com/"
								}
								report.fireEvent('update-link', { url: url });

							} else if (key.match(/selectedGroup\./)) {
								var groupname = /selectedGroup\.(.*)/.exec(key)[1];
								report.fireEvent('update-link', { url: 'http://www.flickr.com/groups/' + groupname + '/discuss/' });

							} else if (key.match(/selectedHelpforum\./)) {
								var groupname = /selectedHelpforum\.(.*)/.exec(key)[1];
								report.fireEvent('update-link', { url: 'http://www.flickr.com/help/forum/' + groupname + '/' });

							} else if (key.match(/selectedForumitem\./)) {
								var topicId = /selectedForumitem.(.*)/.exec(key)[1];
								// we don't have a group name, but all topics are available in all languages :)
								// default to 'en-us'
								report.fireEvent('update-link', { url: 'http://www.flickr.com/help/forum/en-us/' + topicId + '/' });

							} else if (key.match(/selectedGroupmembers\./)) {
								var groupid = /selectedGroupmembers\.(.*)/.exec(key)[1];
								report.fireEvent('update-link', { url: 'http://www.flickr.com/groups_members.gne?id=' + groupid });

							} else if (key.match(/selectedGrouppool\./)) {
								var groupname = /selectedGrouppool\.(.*)/.exec(key)[1];
								report.fireEvent('update-link', { url: 'http://www.flickr.com/groups/' + groupname + '/pool/' });

							} else if (key.match(/selectedReversedcontacts\./)) {
								var userNsid = /selectedReversedcontacts\.(.*)/.exec(key)[1];
								resolveUsername(userNsid, function(user) {
									report.fireEvent('update-link', { url: 'http://www.flickr.com/people/' + ($chk(user.displaypath) ? user.displaypath : userNsid) + '/contacts/rev/' });
								});

							} else if (key.match(/selectedPendingitems\./)) {
								var groupname = /selectedPendingitems\.(.*)/.exec(key)[1];
								report.fireEvent('update-link', { url: 'http://www.flickr.com/groups/' + groupname + '/admin/pending/' });

							} else if (key.match(/selectedApp\./)) {
								var appId = /selectedApp\.(.*)/.exec(key)[1];
								if (appId.match(/^\d+/)) {
									url = 'http://www.flickr.com/services/apps/' + appId + '/';
								}
								if (metaInfo.key_present) {
									var appInfo = metaInfo.value;
									if (url == undefined) {
										url = 'http://www.flickr.com/services/apps/' + appInfo.appId + '/'
									}
									html = initData.titleTemplate.text
										.replace('%1', appInfo.title)
										.replace('%2', appInfo.username);
								}
								if (url == undefined)
									url = 'http://www.flickr.com/services/apps/' + appId + '/';
								report.fireEvent('update-link',	{ url: url, html: html });

							} else if (key.match(/selectedSet\./)) {
								var setId = /selectedSet\.(.*)/.exec(key)[1];
								constructSetUrl(setId, function(retval) {
									if (retval.success) {
										report.fireEvent('update-link', { url: retval.url });
									}
								});

							} else if (key.match(/selectedPendingtestimonials\./)) {
								report.fireEvent('update-link', { url: 'http://www.flickr.com/testimonials_manage.gne' });

							} else if (key.match(/selectedPendingmembers\./)) {
								var groupid = /selectedPendingmembers\.(.*)/.exec(key)[1];
								report.fireEvent('update-link', { url: 'http://www.flickr.com/groups_pending.gne?id=' + groupid });

							} else if (key.match(/selectedFavorites\./)) {
								var userNsid = /selectedFavorites\.(.*)/.exec(key)[1];
								resolveUsername(userNsid, function(user) {
									report.fireEvent('update-link', { url: 'http://www.flickr.com/photos/' + ($chk(user.displaypath) ? user.displaypath : userNsid) + '/favorites/' });
								});
							}
						} catch(e) {
						}

					}
				});
				if (needsSeparator) {
					// separator
					new Element('span', {
						html: ' ',
						styles: {
							'border-right': '1px dotted #BABABA',
							margin: '0 1px 0 0px',
							padding: '0 0 0 0',
							width: 1
						}
					}).inject(preferences.refreshButtonAsLast() ? $('NFPN.reload.icon') : $('NFPN.envelopes'),
						  preferences.refreshButtonAsLast() ? 'before' : 'bottom');
					new Element('span', {
						html: ' ',
						styles: {
							margin: '0 0 0 1px',
							padding: '0 0 0 0',
							width: 1
						}
					}).inject(preferences.refreshButtonAsLast() ? $('NFPN.reload.icon') : $('NFPN.envelopes'),
						  preferences.refreshButtonAsLast() ? 'before' : 'bottom');
				}
			} catch(e) {
				GM_log("error in checkForNewPosts: " + e + " - " + initData.gm_keyPostfix);
			}
		});
	}

	function resetGroupEnvelopeCounts(groupname, gm_keyPostfix) {
		var metaInfo = GM_getObject('selected' + gm_keyPostfix + '.' + groupname);
		if (metaInfo.key_present // function should not be called otherwise
		&& ! $chk(metaInfo.value)) {
			return;
		}
		var selectedGroup = metaInfo.value;
		selectedGroup.invalidCount = 'true';
		// store as fast as possible
		GM_storeObject('selected' + gm_keyPostfix + '.' + groupname, selectedGroup);

		// update the envelope count for the group
		resetPostsIcon(gm_keyPostfix, groupname);
	}

	function markThreadAsRead(replyCell, groupname, threadInfo, topic, replies, title) {
		var gm_keyPostfix = preferencesInitData.group.gm_keyPostfix;
		var gm_keyPostfixThread = preferencesInitData.thread.gm_keyPostfix;
		// uncolorise
		replyCell.removeClass('NFPN_hint');
		replyCell.getElements('span.NFPN-some-new').dispose();

		// update thread info within this group
		if ($chk(threadInfo)) {
			threadInfo.replies = replies;
			threadInfo.newTopic = 'false';
			threadInfo.returnedThread = 'false';
			threadInfo.deletedItems = 'false';
			threadInfo.newPosts = 0;
			GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);
		} else {
			GM_storeObject(groupname + '.' + topic, {
				groupname: groupname,
				topic: topic,
				replies: replies,
				title: title
			});
		}

		resetGroupEnvelopeCounts(groupname, gm_keyPostfix);

		// reset the thread (envelope), if also watched
		var reTopicMatch = /.*flickr.com\/groups\/[^\/]*\/discuss\/(\d+)\//;
		var topicId = reTopicMatch.exec(topic)[1];
		var watchedThreadObject = GM_getObject('selected' + gm_keyPostfixThread + '.' + topicId);
		if (watchedThreadObject.key_present) {
			var watchedThread = watchedThreadObject.value;
			if (watchedThread) {
				watchedThread.replies = replies;
				watchedThread.title = title;
				watchedThread.newTopic = 'false';
				watchedThread.returnedThread = 'false';
				watchedThread.deletedItems = 'false';
				watchedThread.newPosts = 0;
				watchedThread.invalidCount = 'true'; // make sure to reread on next invocation
				GM_storeObject('selected' + gm_keyPostfixThread + '.' + topicId, watchedThread);
				resetPostsIcon(gm_keyPostfixThread, topicId);
			}
		}
	}

	function markForumitemAsRead(replyCell, groupname, threadInfo, topic, replies, title) {
		var gm_keyPostfix = preferencesInitData.helpforum.gm_keyPostfix;
		var gm_keyPostfixThread = preferencesInitData.forumitem.gm_keyPostfix;
		// uncolorise
		replyCell.removeClass('NFPN_hint');
		replyCell.getElements('span').dispose();

		// update thread info within this group
		if ($chk(threadInfo)) {
			threadInfo.replies = replies;
			threadInfo.newTopic = 'false';
			threadInfo.returnedThread = 'false';
			threadInfo.deletedItems = 'false';
			threadInfo.newPosts = 0;
			GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);
		} else {
			GM_storeObject(groupname + '.' + topic, {
				groupname: groupname,
				topic: topic,
				replies: replies,
				title: title
			});
		}

		resetGroupEnvelopeCounts(groupname, gm_keyPostfix);

		// reset the thread (envelope), if also watched
		var reTopicMatch = /.*flickr.com\/help\/forum\/[^\/]*\/(\d+)\//;
		var topicId = reTopicMatch.exec(topic)[1];
		var watchedThreadObject = GM_getObject('selected' + gm_keyPostfixThread + '.' + topicId);
		if (watchedThreadObject.key_present) {
			var watchedThread = watchedThreadObject.value;
			if (watchedThread) {
				watchedThread.replies = replies;
				watchedThread.title = title;
				watchedThread.newTopic = 'false';
				watchedThread.returnedThread = 'false';
				watchedThread.deletedItems = 'false';
				watchedThread.newPosts = 0;
				watchedThread.invalidCount = 'true'; // make sure to reread on next invocation
				GM_storeObject('selected' + gm_keyPostfixThread + '.' + topicId, watchedThread);
				resetPostsIcon(gm_keyPostfixThread, topicId);
			}
		}
	}

	function createMarkThreadAsReadEnvelope(data) {
		var element = data.element;
		var newPosts = data.newPosts;
		var groupname = data.groupname;
		var threadInfo = data.threadInfo;
		var topic = data.topic;
		var replies = data.replies;
		var title = data.title;
		var buttonClass = data.buttonClass;

		element.adopt(
		    new Element('span', {
			title: isNaN(newPosts) ? (newPosts === '?' ? 'posts deleted': 'some new') : newPosts + ' new',
			html: '(' + (isNaN(newPosts) ? newPosts: newPosts.toLocaleString()) + '&nbsp;new)',
			'class': 'NFPN-some-new'
		    }).adopt(
			new Element('img', {
				title: "Click to mark this thread as read",
				src: images.mailicon,
				'class': buttonClass,
				styles: {
					cursor: 'pointer',
					maxWidth: '12px'
				},
				events: {
					click: function(e) {
						markThreadAsRead(this.getParent('div.hd') || this.getParent('td'), groupname, threadInfo, topic, replies, title); // td: old group layout
					}
				}
			})
		    )
		);
		element.addClass('NFPN_hint');
		var oldLayout = $chk(getMain().getElement('table.TopicListing'));
		if (oldLayout) element.style.align = 'right';
	}

	function createMarkForumitemAsReadEnvelope(data) {
		var column = data.column;
		var newPosts = data.newPosts;
		var groupname = data.groupname;
		var threadInfo = data.threadInfo;
		var topic = data.topic;
		var replies = data.replies;
		var title = data.title;
		var buttonClass = data.buttonClass;

		column.adopt(
		    new Element('span', {
			title: isNaN(newPosts) ? (newPosts === '?' ? 'posts deleted': 'some new') : newPosts + ' new',
			html: '(' + (isNaN(newPosts) ? newPosts: newPosts.toLocaleString()) + '&nbsp;new)'
		    }).adopt(
			new Element('img', {
				title: "Click to mark this thread as read",
				src: images.mailicon,
				'class': buttonClass,
				styles: {
					cursor: 'pointer',
					maxWidth: 12
				},
				events: {
					click: function(e) {
						markForumitemAsRead(this.getParent('td'), groupname, threadInfo, topic, replies, title);
					}
				}
			})
		    )
		);
		column.addClass('NFPN_hint');
		column.style.align = 'right';
	}

	function processHelpForumPage() {
		try {
			var reGroupnameMatch = /.*flickr.com\/help\/forum\/([^\/]*)\//;
			var gm_keyPostfix = preferencesInitData.helpforum.gm_keyPostfix;
			var groupname = reGroupnameMatch.exec(document.location.href)[1];
			
			var metaInfo = GM_getObject('selected' + gm_keyPostfix + '.' + groupname);
			if (metaInfo.key_present) {
				var storedInfo = metaInfo.value;
				if ($chk(storedInfo)) {
					// sync number of unread posts on group's envelope
					storedInfo.newPosts = 0;
					var grouptitle = $('Tertiary').textContent.replace(/\n[^]*$/im, '');
					storedInfo.title = grouptitle;
					// read all rows
					// for every row, compare with the stored value
					// remove threads from cache that are no longer on the page
					var storedThreads = retrieveThreadsFromCache(groupname);
					var newlyAddedGroup = (storedThreads.getKeys().length === 0);
					try {
						getMain().getElements('table.TopicListing').each(function(table, tableIdx) { // helpforum has two tables
							table.getElements('tr').each(function(row, rowIdx) {
								var columns = row.getElements('th,td'); // Discuss page uses th, forum uses td
								if (rowIdx === 0) { // header
									// add 'mark all read' icon
									var repliesHeader = columns[2];
									repliesHeader.adopt(
									    new Element('img', {
										title: "Click to mark all threads as read",
										'class': 'NFPN-mark-all-button',
										src: images.mailicon,
										styles: {
											cursor: 'pointer',
											maxWidth: 12
										},
										events: {
											click: function(evt) {
												$$('img.NFPN-mark-as-read-button-' + tableIdx).each(function(button) {
													button.fireEvent('click');
												});
												resetGroupEnvelopeCounts(groupname, gm_keyPostfix);
											}
										}
									    })
									);
									return;
								} // end header
								//$$('span.New').dispose();
								var title = columns[0].getElement('a').textContent;
								var topic = columns[0].getElement('a').href.replace(/\/lastpage/g, '');
								var replies = parseInt(columns[2].textContent.replace(/(\.|,)/g, ''), 10);

								if (newlyAddedGroup) {
									GM_storeObject(groupname + '.' + topic, {
										groupname: groupname,
										topic: topic,
										replies: replies,
										title: title
									});
									return;
								}
								var threadInfo = storedThreads.get(topic);
								if ($chk(threadInfo)) {
									if (threadInfo.returnedThread === 'true' || threadInfo.deletedItems === 'true') {
										// new post(s): colorize
										storedInfo.newPosts += 1;
										storedInfo.returnedThreads = 'true';
										createMarkForumitemAsReadEnvelope({
											column: columns[2],
											newPosts: threadInfo.deletedItems === 'true' ? '?': 'x',
											groupname: groupname,
											threadInfo: threadInfo,
											topic: topic,
											replies: replies,
											title: title,
											buttonClass: 'NFPN-mark-as-read-button-' + tableIdx
										});

									} else if (threadInfo.replies < replies || threadInfo.newTopic === 'true') {
										// new posts: colorize
										var newPosts = (threadInfo.newTopic === 'true' ? replies + 1: replies - threadInfo.replies);
										threadInfo.newPosts = newPosts;
										storedInfo.newPosts += newPosts;
										GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);
										createMarkForumitemAsReadEnvelope({
											column: columns[2],
											newPosts: newPosts,
											groupname: groupname,
											threadInfo: threadInfo,
											topic: topic,
											replies: replies,
											title: title,
											buttonClass: 'NFPN-mark-as-read-button-' + tableIdx
										});

									} else if (threadInfo.replies > replies) { // someone deleted a comment; record
										// treat it as a returning thread
										storedInfo.returnedThreads = 'true';
										storedInfo.newPosts += 1;
										threadInfo.replies = replies;
										threadInfo.newPosts = 0;
										threadInfo.deletedItems = 'true';
										GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);
										createMarkForumitemAsReadEnvelope({
											column: columns[2],
											newPosts: '?',
											groupname: groupname,
											threadInfo: threadInfo,
											topic: topic,
											replies: replies,
											title: title,
											buttonClass: 'NFPN-mark-as-read-button-' + tableIdx
										});

									} else { // threadInfo.replies == replies => reset 'newPosts'
										threadInfo.newPosts = 0;
										GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);

									}

									storedThreads.erase(topic);

								} else {
									if (replies === 0) {
										// new topic: colorize
										createMarkForumitemAsReadEnvelope({
											column: columns[2],
											newPosts: 1,
											groupname: groupname,
											topic: topic,
											replies: 0,
											title: title,
											buttonClass: 'NFPN-mark-as-read-button-' + tableIdx
										});
										// and store
										GM_storeObject(groupname + '.' + topic, {
											groupname: groupname,
											topic: topic,
											replies: 0,
											newPosts: 1,
											title: title,
											newTopic: 'true'
										});
										storedInfo.newPosts += 1;
									} else {
										// could be a thread returning from pageX
										createMarkForumitemAsReadEnvelope({
											column: columns[2],
											newPosts: 'x',
											groupname: groupname,
											threadInfo: undefined,
											topic: topic,
											replies: replies,
											title: title,
											buttonClass: 'NFPN-mark-as-read-button-' + tableIdx
										});
										// in any case, don't store! => if not stored, this thread will not count as an extra 1+ on other pages!
										storedInfo.newPosts += 1;
										storedInfo.returnedThreads = 'true';
										GM_storeObject(groupname + '.' + topic, {
											groupname: groupname,
											topic: topic,
											replies: replies,
											newPosts: 0,
											title: title,
											returnedThread: 'true'
										});
									}
								}
							});
						});
						// those that are still in the hash, but have not been recognized, have fallen of the page
						storedThreads.getKeys().each(function(key) {
							GM_deleteValue(groupname + '.' + key);
						});
						// older versions didn't store the group id, needed in the request for RSS feed
						if ((!$chk(storedInfo.groupId) && ! $chk(storedInfo.privateGroup)) || ! $chk(storedInfo.title)) {
							var groupId = GM_getGroupId();
							var title = $('Tertiary').textContent.replace(/\n[^]*$/im, '');
							storedInfo.groupId = groupId;
							storedInfo.privateGroup = ! $chk(groupId);
							storedInfo.title = title;
						}
					} catch(e) {
						GM_log("error processing Discuss page: " + e);
					}
					GM_storeObject('selected' + gm_keyPostfix + '.' + groupname, storedInfo);
					notifyNewPosts(gm_keyPostfix, groupname, storedInfo.newPosts, storedInfo.returnedThreads);
				}
				watchTypes.helpforum.id = groupname;
				addMinusIcon(watchTypes.helpforum);
			} else {
				watchTypes.helpforum.id = groupname;
				addPlusIcon(watchTypes.helpforum);
			}
			getMain().getElements('table.TopicListing').each(function(table) { // helpforum has two tables
				table.getElements('tr').each(function(row, index) {
					if (index === 0) { // header
						return;
					}
					var columns = row.getElements('td');
					var title = columns[0].getElement('a').textContent;
					var topic = columns[0].getElement('a').href;
					var replies = parseInt(columns[2].textContent.replace(/(\.|,)/g, ''), 10);
					var topicId = topic.match(/.*flickr.com\/help\/forum\/[^\/]+\/(\d+)/)[1]; 
					// add +/- icon for each thread
					addPlusMinIconOnHelpforumPage({
						topic: topicId,
						groupname: groupname,
						cell: columns[2]
					});
					var gotoLastPageLink = preferences.gotoLastThreadPageLink();
					if (gotoLastPageLink) {
						try {
						    if (!columns[0].getElement('a').href.match(/\/lastpage/)) {
							columns[0].getElement('a').href = topic + '/lastpage';
						    }
						} catch (e) {
							GM_log("error updating links: " + e);
						}
					}
				});
			});
		} catch(e) {
			GM_log("unable to read forum name: " + e);
		}
	}

	function pimpDiscussThreadInList(data) {
		var row = data.row;
		var topic = data.topic;
		var replies = data.replies;
		var title = data.title;
		var threadInfo = data.threadInfo;
		var groupInfo = data.groupInfo;
		var groupname = groupInfo.groupname;

		if ($chk(threadInfo)) {
			if (threadInfo.returnedThread === 'true' || threadInfo.deletedItems === 'true') {
				// new post(s): colorize
				groupInfo.newPosts += 1;
				groupInfo.returnedThreads = 'true';
				createMarkThreadAsReadEnvelope({
					element: row.getElement('div.hd'),
					newPosts: threadInfo.deletedItems === 'true' ? '?': 'x',
					groupname: groupname,
					threadInfo: threadInfo,
					topic: topic,
					replies: replies,
					title: title,
					buttonClass: 'NFPN-mark-as-read-button'
				});

			} else if (threadInfo.replies < replies || threadInfo.newTopic === 'true') {
				// new posts: colorize
				var newPosts = (threadInfo.newTopic === 'true' ? replies + 1: replies - threadInfo.replies);
				threadInfo.newPosts = newPosts;
				groupInfo.newPosts += newPosts;
				GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);
				createMarkThreadAsReadEnvelope({
					element: row.getElement('div.hd'),
					newPosts: newPosts,
					groupname: groupname,
					threadInfo: threadInfo,
					topic: topic,
					replies: replies,
					title: title,
					buttonClass: 'NFPN-mark-as-read-button'
				});

			} else if (threadInfo.replies > replies) { // someone deleted a comment; record
				// treat it as a returning thread
				groupInfo.returnedThreads = 'true';
				groupInfo.newPosts += 1;
				threadInfo.replies = replies;
				threadInfo.newPosts = 0;
				threadInfo.deletedItems = 'true';
				GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);
				createMarkThreadAsReadEnvelope({
					element: row.getElement('div.hd'),
					newPosts: '?',
					groupname: groupname,
					threadInfo: threadInfo,
					topic: topic,
					replies: replies,
					title: title,
					buttonClass: 'NFPN-mark-as-read-button'
				});

			} else { // threadInfo.replies == replies => reset 'newPosts'
				threadInfo.newPosts = 0;
				GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);

			}


		} else {
			if (replies === 0) {
				// new topic: colorize
				createMarkThreadAsReadEnvelope({
					element: row.getElement('div.hd'),
					newPosts: 1,
					groupname: groupname,
					topic: topic,
					replies: 0,
					title: title,
					buttonClass: 'NFPN-mark-as-read-button'
				});
				// and store
				GM_storeObject(groupname + '.' + topic, {
					groupname: groupname,
					topic: topic,
					replies: 0,
					newPosts: 1,
					title: title,
					newTopic: 'true'
				});
				groupInfo.newPosts += 1;
			} else {
				// could be a thread returning from pageX
				createMarkThreadAsReadEnvelope({
					element: row.getElement('div.hd'),
					newPosts: 'x',
					groupname: groupname,
					threadInfo: undefined,
					topic: topic,
					replies: replies,
					title: title,
					buttonClass: 'NFPN-mark-as-read-button'
				});
				// in any case, don't store! => if not stored, this thread will not count as an extra 1+ on other pages!
				groupInfo.newPosts += 1;
				groupInfo.returnedThreads = 'true';
				GM_storeObject(groupname + '.' + topic, {
					groupname: groupname,
					topic: topic,
					replies: replies,
					newPosts: 0,
					title: title,
					returnedThread: 'true'
				});
			}
		}
	}

	function processDiscussPage() {
		try {
			var reGroupnameMatch = /.*flickr.com\/groups\/([^\/]*)\//;
			var gm_keyPostfix = preferencesInitData.group.gm_keyPostfix;

			var groupId = GM_getGroupId();
			if (!$chk(groupId)) {
				GM_log("ERROR: unable to convert group!!");
				return;
			}
			var groupname = reGroupnameMatch.exec(document.location.href)[1];
			var groupInfo = GM_getObject('selectedGroup.' + groupname);
			if (groupInfo.key_present && !$chk(groupInfo.value.groupId)) {
				groupInfo.value.groupId = groupId;
				GM_storeObject('selectedGroup.' + groupname, groupInfo.value);
			}
			var oldLayout = $chk(getMain().getElement('table.TopicListing'));
			if (oldLayout) {
				var titleColumn = getMain().getElement('table.TopicListing').getElement('tr').getElement('th,td').get('html').match(/UCP-ng/) ? 1: 0;
			}
			var metaInfo = GM_getObject('selected' + gm_keyPostfix + '.' + groupname);
			if (metaInfo.key_present) {
				var storedInfo = metaInfo.value;
				if ($chk(storedInfo)) {
					// sync number of unread posts on group's envelope
					storedInfo.newPosts = 0;
					var grouptitle = readGroupTitleFromPage();
					storedInfo.title = grouptitle;
					// read all rows
					// for every row, compare with the stored value
					// remove threads from cache that are no longer on the page
					var storedThreads = retrieveThreadsFromCache(groupname);
					var newlyAddedGroup = (storedThreads.getKeys().length === 0);
					try {
						var markAllButton = new Element('img', {
								title: "Click to mark all threads as read",
								'class': 'NFPN-mark-all-button',
								src: images.mailicon,
								styles: {
									cursor: 'pointer',
									maxWidth: '12px'
								},
								events: {
									click: function(evt) {
										$$('img.NFPN-mark-as-read-button').each(function(button) {
											button.fireEvent('click');
										});
										resetGroupEnvelopeCounts(groupname, gm_keyPostfix);
									}
								}
						});
						if (oldLayout) {
							var header = getMain().getElement('table.TopicListing').getElement('tr');
							// add 'mark all read' icon
							var repliesHeader = header.getElements('th')[titleColumn + 2];
							repliesHeader.adopt(markAllButton);
						} else {
							// add 'mark all read' icon
							$$('div.groups-header h2')[0].adopt(markAllButton);
							markAllButton.setStyles('{ margin-left: 10px; }');
						}
						var rows = oldLayout ? getMain().getElement('table.TopicListing').getElements('tr') :
									$$('ul.topic-list li');
							
						rows.each(function(row, rowIdx) {
							if (oldLayout) {
								if (rowIdx === 0) { // header
									return;
								} // end header
								var columns = row.getElements('td');
								var title = columns[titleColumn].getElement('a').textContent;
								var topic = columns[titleColumn].getElement('a').href.replace(/\/lastpage/g, '');
								var replies = parseInt(columns[titleColumn + 2].textContent.replace(/(\.|,)/g, ''), 10);
							} else {
								var title = row.getElement('a').get('text');
								var topic = row.getElement('a').get('href').replace(/\/lastpage.*/g, '').replace(/\/page\d+.*/g, '');
								if (!topic.match(/^http/)) topic = "http://www.flickr.com" + topic;
								if (!topic.match(/\/$/))   topic = topic + '/';
								var replies = parseInt(row.getElement('span.reply-count').get('text').replace(/(\.|,)/g, ''), 10);
							}

							if (newlyAddedGroup) {
								GM_storeObject(groupname + '.' + topic, {
									groupname: groupname,
									topic: topic,
									replies: replies,
									title: title
								});
								return;
							}
							var threadInfo = storedThreads.get(topic);
							if (!oldLayout) {
								pimpDiscussThreadInList({ row: row, topic: topic, replies: replies, title: title, threadInfo: threadInfo, groupInfo: storedInfo });
								storedThreads.erase(topic);
								return;
							}
							// old layout only:
							if ($chk(threadInfo)) {
								if (threadInfo.returnedThread === 'true' || threadInfo.deletedItems === 'true') {
									// new post(s): colorize
									storedInfo.newPosts += 1;
									storedInfo.returnedThreads = 'true';
									createMarkThreadAsReadEnvelope({
										element: oldLayout ? columns[titleColumn + 2] : row.getElement('div.hd'),
										newPosts: threadInfo.deletedItems === 'true' ? '?': 'x',
										groupname: groupname,
										threadInfo: threadInfo,
										topic: topic,
										replies: replies,
										title: title,
										buttonClass: 'NFPN-mark-as-read-button'
									});

								} else if (threadInfo.replies < replies || threadInfo.newTopic === 'true') {
									// new posts: colorize
									var newPosts = (threadInfo.newTopic === 'true' ? replies + 1: replies - threadInfo.replies);
									threadInfo.newPosts = newPosts;
									storedInfo.newPosts += newPosts;
									GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);
									createMarkThreadAsReadEnvelope({
										element: oldLayout ? columns[titleColumn + 2] : row.getElement('div.hd'),
										newPosts: newPosts,
										groupname: groupname,
										threadInfo: threadInfo,
										topic: topic,
										replies: replies,
										title: title,
										buttonClass: 'NFPN-mark-as-read-button'
									});

								} else if (threadInfo.replies > replies) { // someone deleted a comment; record
									// treat it as a returning thread
									storedInfo.returnedThreads = 'true';
									storedInfo.newPosts += 1;
									threadInfo.replies = replies;
									threadInfo.newPosts = 0;
									threadInfo.deletedItems = 'true';
									GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);
									createMarkThreadAsReadEnvelope({
										element: oldLayout ? columns[titleColumn + 2] : row.getElement('div.hd'),
										newPosts: '?',
										groupname: groupname,
										threadInfo: threadInfo,
										topic: topic,
										replies: replies,
										title: title,
										buttonClass: 'NFPN-mark-as-read-button'
									});

								} else { // threadInfo.replies == replies => reset 'newPosts'
									threadInfo.newPosts = 0;
									GM_storeObject(groupname + '.' + threadInfo.topic, threadInfo);

								}

								storedThreads.erase(topic);

							} else {
								if (replies === 0) {
									// new topic: colorize
									createMarkThreadAsReadEnvelope({
										element: oldLayout ? columns[titleColumn + 2] : row.getElement('div.hd'),
										newPosts: 1,
										groupname: groupname,
										topic: topic,
										replies: 0,
										title: title,
										buttonClass: 'NFPN-mark-as-read-button'
									});
									// and store
									GM_storeObject(groupname + '.' + topic, {
										groupname: groupname,
										topic: topic,
										replies: 0,
										newPosts: 1,
										title: title,
										newTopic: 'true'
									});
									storedInfo.newPosts += 1;
								} else {
									// could be a thread returning from pageX
									createMarkThreadAsReadEnvelope({
										element: oldLayout ? columns[titleColumn + 2] : row.getElement('div.hd'),
										newPosts: 'x',
										groupname: groupname,
										threadInfo: undefined,
										topic: topic,
										replies: replies,
										title: title,
										buttonClass: 'NFPN-mark-as-read-button'
									});
									// in any case, don't store! => if not stored, this thread will not count as an extra 1+ on other pages!
									storedInfo.newPosts += 1;
									storedInfo.returnedThreads = 'true';
									GM_storeObject(groupname + '.' + topic, {
										groupname: groupname,
										topic: topic,
										replies: replies,
										newPosts: 0,
										title: title,
										returnedThread: 'true'
									});
								}
							}
						});
						// those that are still in the hash, but have not been recognized, have fallen of the page
						storedThreads.getKeys().each(function(key) {
							GM_deleteValue(groupname + '.' + key);
						});
						// older versions didn't store the group id, needed in the request for RSS feed
						if ((!$chk(storedInfo.groupId) && ! $chk(storedInfo.privateGroup)) || ! $chk(storedInfo.title)) {
							var groupId = GM_getGroupId();
							var title = readGroupTitleFromPage();
							storedInfo.groupId = groupId;
							storedInfo.privateGroup = ! $chk(groupId);
							storedInfo.title = title;
						}
					} catch(e) {
						GM_log("error processing Discuss page: " + e);
					}
					GM_storeObject('selected' + gm_keyPostfix + '.' + groupname, storedInfo);
					notifyNewPosts(gm_keyPostfix, groupname, storedInfo.newPosts, storedInfo.returnedThreads);
				}
				watchTypes.group.id = groupname;
				addMinusIcon(watchTypes.group);
			} else {
				watchTypes.group.id = groupname;
				addPlusIcon(watchTypes.group);
			}
			var rows = oldLayout ? 
				getMain().getElement('table.TopicListing').getElements('tr') : 
				$$('ul.topic-list li');
			rows.each(function(row, index) {
				if (oldLayout) {
					if (index === 0) { // header
						return;
					}
					var columns = row.getElements('td');
					var title = columns[titleColumn].getElement('a').textContent;
					var topic = columns[titleColumn].getElement('a').href;
					var replies = parseInt(columns[titleColumn + 2].textContent.replace(/(\.|,)/g, ''), 10);
				} else {
					var title = row.getElement('a').get('text');
					var topic = row.getElement('a').get('href');
					var replies = parseInt(row.getElement('span.reply-count').get('text').replace(/(\.|,)/g, ''), 10);
				}

				var topicId = topic.match(/.*\/groups\/[^\/]+\/discuss\/(\d+)/)[1];
				// add +/- icon for each thread
				// TODO: add to pimpDiscussThread
				addPlusMinIconOnDiscussPage({
					topic: topicId,
					groupname: groupname,
					cell: oldLayout ? columns[titleColumn + 2] : row.getElement('div h3')
				});
				var gotoLastPageLink = preferences.gotoLastThreadPageLink();
				if (gotoLastPageLink && oldLayout) {
					try {
					    if (!columns[titleColumn].getElement('a').href.match(/\/lastpage/)) {
						columns[titleColumn].getElement('a').href = topic + '/lastpage';
					    }
					} catch (e) {
						GM_log("error updating links: " + e);
					}
				}
			});
		} catch(e) {
			GM_log("unable to read groupname: " + e);
		}
	}

	function countPostsInThreadPage(element, callback) {
		var replies = 0;
		var paginator = element.getElement('div.Paginator');
		if (!$chk(paginator) || paginator.length === 0) {
			// count the replies
			if (element.getElements('td.Said').length == 0) {
				callback({ success: false, message: "no posts found" });
			}
			replies = element.getElements('td.Said').length - 1; // not the challenge announcement
		} else {
			var results = element.getElement('div.Results');
			replies = results.get('html').match(/\([^\d]*\d+[^\d]+\d+[^\d]+([\d\.,]+)/)[1];
			//    (2001 to 2045 of 2,500
			replies = replies.replace(/(\.|,)/g, '');
			replies = parseInt(replies, 10);
		}
		callback({ success: true, items: replies });
	}

	function lastPageInDiscussionThread(helpforum) {
		if (document.location.href.test(/lastpage/)) {
			return true;
		}
		// if there is only 1 page, it's the last :-)
		var paginators = $$('div.Paginator');
		if (paginators.length === 0) {
			return true;
		}
		var paginator = paginators[0];
		if ($chk(paginator.getElement('span.AtEnd'))) {
			return true;
		}
		return false;
	}

	function scrollToPost(oldestUnreadPost) {
	    try {
		var position = oldestUnreadPost.getOffsets();
		var navbarOffset = 0;
		try {
			navbarOffset = parseInt($('global-nav').getComputedStyle('height'), 10);
		} catch (e) {
			GM_log("unable to compute nav-bar's height");
			navbarOffset = 0;
		}
		var envelopesOffset = 0;
		try {
			envelopesOffset = parseInt($('NFPN.envelopes').getComputedStyle('height'), 10);
		} catch (e) {
			GM_log("unable to compute envelopes' height");
			envelopesOffset = 0;
		}
		if (position.y > 10 || (navbarOffset > 0 && position.y > navbarOffset)) {
			$(window).scrollTo(0, position.y - 10 - navbarOffset - envelopesOffset);
		}
	    } catch(e) {
		GM_log("getTop() error: " + e);
	    }
	}

	function colorizeNewPostsInThreadPage(newPosts, helpforum) {
		if (newPosts && newPosts > 0) {
			// colorize the new posts (if on the last page)
			if ((preferences.colorizeNewPosts() || preferences.scrollToNewPosts()) && lastPageInDiscussionThread(helpforum)) {
				var replyElements = $('DiscussTopic').getElement('table.TopicReply').getElements('td.Who');
				var oldestUnreadPost;
				// colorize the unread ones
				replyElements.each(function(replyElement, idx) {
					if (idx < replyElements.length - newPosts) {
						return;
					}
					oldestUnreadPost = oldestUnreadPost || replyElement;
					if (preferences.colorizeNewPosts()) replyElement.addClass('NFPN_hint');
				});
				if (replyElements.length === newPosts - 1 && $$('div.Paginator').length === 0) { // also color the topic entry
					oldestUnreadPost = undefined; // reset
					if (preferences.colorizeNewPosts()) $('DiscussTopic').getElement('td.Who').addClass('NFPN_hint');
				}
				if (replyElements.length < newPosts && $$('div.Paginator').length > 0) { // also color the 'prev' button
					oldestUnreadPost = undefined; // reset
					if (preferences.colorizeNewPosts()) $$('a.Prev').setStyle('background-color', '#FFE28A'); // addClass('NFPN_hint') does not work, nor does setStyles({ .. })
				}
				if ($chk(oldestUnreadPost) && preferences.scrollToNewPosts()) {
					scrollToPost(oldestUnreadPost.getParent('tr'));
				}
			}
		}
	}

	function readThreadTitleFromPage(element) {
		var title = "No thread title found";
		if (!$chk(element)) {
			if ($chk($('GoodStuff'))) {
				title = $('GoodStuff').getElement('h2').get('html');
			} else if ($$('div.group-topic-detail-col h2').length > 0) {
				title = $$('div.group-topic-detail-col h2')[0].get('text').trim();
			}
		} else {
			if ($chk(element.getElement('td[id=GoodStuff]'))) {
				title = element.getElement('td[id=GoodStuff]').getElement('h2').get('html');
			} else if ($chk(element.getElement('div.group-topic-detail-col h2'))) {
				title = element.getElement('div.group-topic-detail-col h2').get('text').trim();
			}
		}
		return title;
	}

	function processThreadPage(helpforum) {
		if (document.location.href.match(/edit(?:\/)?$/)) {
			return;
		}
		try {
			var reGroupnameMatch = /.*flickr.com\/groups\/([^\/]+)\//;
			var reTopicMatch = /.*flickr.com\/groups\/[^\/]*\/discuss\/(\d+)/;
			var gm_keyPostfix = preferencesInitData.group.gm_keyPostfix;
			var gm_keyPostfixThread = preferencesInitData.thread.gm_keyPostfix;
			if (helpforum) {
				reGroupnameMatch = /.*flickr.com\/help\/forum\/([^\/]*)/;
				reTopicMatch = /.*flickr.com\/help\/forum\/[^\/]*\/(\d+)/;
				gm_keyPostfix = preferencesInitData.helpforum.gm_keyPostfix;
				gm_keyPostfixThread = preferencesInitData.forumitem.gm_keyPostfix;
			}
			var groupname = reGroupnameMatch.exec(document.location.href)[1];
			var topic = reTopicMatch.exec(document.location.href)[1];
			var threadMetaInfo = GM_getObject('selected' + gm_keyPostfixThread + '.' + topic);
			var groupMetaInfo = GM_getObject('selected' + gm_keyPostfix + '.' + groupname);

			if ((threadMetaInfo.key_present || groupMetaInfo.key_present) && lastPageInDiscussionThread(helpforum)) {
				var title = readThreadTitleFromPage();
				// thread, or group, is watched - update replies
				countPostsInThreadPage($(document), function(count) {
					if (!count.success) {
						notifyError(gm_keyPostfix, topic, count.message);
						return;
					}
					var newPostsOnThreadWatch = 0;
					// thread is watched
					if (threadMetaInfo.key_present) {
						var storedThreadInfo = threadMetaInfo.value;
						if ($chk(storedThreadInfo)) {
							// backporting data from older versions
							if (!$chk(storedThreadInfo.groupId)) {
								storedThreadInfo.groupId = GM_getGroupId();
							}
							newPostsOnThreadWatch = count.items - storedThreadInfo.replies;
							storedThreadInfo.replies = count.items;
							storedThreadInfo.newPosts = 0;
							storedThreadInfo.title = title;

							GM_storeObject('selected' + gm_keyPostfixThread + '.' + topic, storedThreadInfo);
							resetPostsIcon(gm_keyPostfixThread, storedThreadInfo.topic);
						} else {
							GM_log("ERROR: found a key without value!?");
						}
					}
					var newPostsOnGroupWatch = 0;
					// group is watched
					if (groupMetaInfo.key_present) {
						var storedGroupInfo = groupMetaInfo.value;
						if ($chk(storedGroupInfo)) {
							if (!$chk(storedGroupInfo.groupId)) {
								storedGroupInfo.groupId = GM_getGroupId();
								GM_storeObject('selected' + gm_keyPostfix + '.' + groupname, storedGroupInfo);
							}
							var url = helpforum ?
								document.location.href.match(/(.*flickr.com\/help\/forum\/[^\/]+\/\d+\/)/)[1] : // not the 'page3' part, or '#reply', or ...
								document.location.href.match(/(.*flickr.com\/groups\/[^\/]+\/discuss\/\d+(?:\/)?)/)[1]; // not the 'page3' part, or '#reply', or ...
							if (!url.match(/\/$/)) url = url + '/';
							var metaInfo = GM_getObject(groupname + '.' + url); // constructing this url could be errorprone
							// we found thread info within the group's data
							if (metaInfo.key_present) {
								var threadInfo = metaInfo.value;
								if ($chk(threadInfo)) {
									newPostsOnGroupWatch = count.items - threadInfo.replies + (threadInfo.newTopic == 'true' ? 1 : 0);
									threadInfo.returnedThread = 'false';
									threadInfo.deletedItems = 'false';
									threadInfo.newPosts = 0;
									threadInfo.replies = count.items;
									threadInfo.newTopic = 'false';
									GM_storeObject(groupname + '.' + url, threadInfo);
								}
							} else {
								GM_storeObject(groupname + '.' + url, {
									groupname: groupname,
									topic: url,
									replies: count.items,
									title: title,
									newTopic: count.items == 0 ? 'true' : 'false'
								});
							}

							$('NFPN.' + gm_keyPostfix + '.' + groupname).fireEvent('run-check');
						}
					}
					if (newPostsOnGroupWatch > 0 || newPostsOnThreadWatch > 0) {
						colorizeNewPostsInThreadPage(Math.max(newPostsOnGroupWatch, newPostsOnThreadWatch), helpforum);
					}
				});
			} // last page
			if (threadMetaInfo.key_present) {
				if (helpforum) {
					watchTypes.forumitem.id = topic;
					watchTypes.forumitem.groupname = groupname;
					addMinusIcon(watchTypes.forumitem);
				} else {
					watchTypes.thread.id = topic;
					watchTypes.thread.groupname = groupname;
					addMinusIcon(watchTypes.thread);
				}
			} else {
				if (helpforum) {
					watchTypes.forumitem.id = topic;
					watchTypes.forumitem.groupname = groupname;
					addPlusIcon(watchTypes.forumitem);
				} else {
					watchTypes.thread.id = topic;
					watchTypes.thread.groupname = groupname;
					addPlusIcon(watchTypes.thread);
				}
			}

			// group is watched
			if (groupMetaInfo.key_present) {
				if ($$('div.group-topics ul.topic-list li.topic div.hd').length > 0) {
					$$('div.group-topics ul.topic-list li.topic').each(function(row) {
						var title = row.getElement('a').get('text');
						var topic = row.getElement('a').get('href').replace(/\/lastpage.*/g, '').replace(/\/page\d+.*/g, '');
						if (!topic.match(/^http/)) topic = "http://www.flickr.com" + topic;
						if (!topic.match(/\/$/))   topic = topic + '/';
						var replies = parseInt(row.getElement('span.reply-count').get('text').replace(/(\.|,)/g, ''), 10);
						var threadInfo = GM_getObject(groupname + '.' + topic);
						pimpDiscussThreadInList({ row: row, topic: topic, replies: replies, title: title, threadInfo: threadInfo.key_present ? threadInfo.value : null, groupInfo: groupMetaInfo.value });
					});
					return;
				}
				// show number of new posts in the left column - oldLayout, and help forum
				$$('table.TopicListing tr td').each(function(threadCell) {
					if ($chk(threadCell.getElement('span.NFPN_hint'))) return; // only show it once
					var topicUrlAnchor = threadCell.getElement('a');
					if (!topicUrlAnchor) {
						return;
					}
					var topicUrlMatch = topicUrlAnchor.href.match(/.*\/groups\/[^\/]+\/discuss\/\d+\//); // drop pageX
					if (!topicUrlMatch && helpforum) {
						topicUrlMatch = topicUrlAnchor.href.match(/.*\/help\/forum\/[^\/]+\/\d+\//);
					}
					if (!topicUrlMatch) {
						return;
					}
					var topicUrl = topicUrlMatch[0];
					if (!topicUrl.match(/^http/)) topicUrl = "http://www.flickr.com" + topicUrl;
					var metaInfo = GM_getObject(groupname + '.' + topicUrl);
					if (metaInfo.key_present) {
						var threadInfo = metaInfo.value;
						if (threadInfo) {
							var insertionPoint = helpforum ? topicUrlAnchor : threadCell;
							if (threadInfo.returnedThread === 'true') {
								new Element('span', {
									'class': 'NFPN_hint',
									html: ' (x&nbsp;new)'
								}).inject(insertionPoint);
								insertionPoint.addClass('NFPN_hint');
							} else if (threadInfo.deletedItems === 'true') {
								new Element('span', {
									'class': 'NFPN_hint',
									html: ' (?&nbsp;new)'
								}).inject(insertionPoint);
								insertionPoint.addClass('NFPN_hint');
							} else if (threadInfo.newTopic === 'true') {
								new Element('span', {
									'class': 'NFPN_hint',
									html: ' (' + (threadInfo.replies + 1).toLocaleString() + '&nbsp;new)'
								}).inject(insertionPoint);
								insertionPoint.addClass('NFPN_hint');
							} else if (threadInfo.newPosts && threadInfo.newPosts > 0) {
								new Element('span', {
									'class': 'NFPN_hint',
									html: ' (' + threadInfo.newPosts.toLocaleString() + '&nbsp;new)'
								}).inject(insertionPoint);
								insertionPoint.addClass('NFPN_hint');
							}
						}
					} else {
						topicUrlAnchor.adopt(new Element('span', {
							'class': 'NFPN_hint',
							html: ' (x&nbsp;new)'
						}));
						topicUrlAnchor.addClass('NFPN_hint');
					}
				});
			}
		} catch(e) { // hiccups ??
			GM_log("error processing thread page: " + e);
		}
	}

	function processForumItemPage() {
		processThreadPage(true);
	}

	function lastPageInPhotoPage() {
		var lastpage = false;
		// if there is only 1 page, it's the last :-)
		var paginator = $$('div.Paginator');
		if (paginator.length === 0) {
			lastpage = true;
		} else {
			if ($chk(paginator.getElement('span.AtEnd'))) {
				lastpage = true;
			}
		}
		return lastpage;
	}

	function colorizeNewPostsInPhotoPage(newPosts) {
		// no longer applicable on photo pages
	}

	function countCommentsInPhotoPage(callback) {
		var comments = 0;
		var commentsButton = $('button-bar-comment');
		if ($chk(commentsButton)) {
			comments = parseInt(commentsButton.get('text', 10));
			callback({ success: true, items: comments });
			return;
		}
		// new photo page layout: when called, there is no comments button yet
		// => use the API
		var photoId = document.location.href.match(/.*flickr.com\/photos\/[^\/]+\/(\d+)/)[1];
		apiData = {
			api_key: GM_getMagisterLudi(),
			auth_hash: GM_getAuthHash(),
			csrf: GM_getCsrf(),
			auth_token: GM_getAuthToken(),
			format: 'json',
			method: 'flickr.photos.getInfo',
			nojsoncallback: 1,
			photo_id: photoId
		};
		new Request({
			url: 'http://www.flickr.com',
			onSuccess: function(responseText, responseXML) {
				var result = JSON.parse(responseText);
				if (result.stat === 'fail') {
					callback({ success: false, message: "error reading photo information: " + result.message });
					return;
				}
				callback({ success: true, items: $chk(result.photo) && $chk(result.photo.comments) ? result.photo.comments._content : 0 });
			},
			onFailure: function(response) {
				callback({ success: false, message: "failure reading photo information: " + response.statusText});
			}
		}).get('/services/rest', apiData);
	}

	function processSomethingPage(data) {
		var debug = data.debug;
		var initData = preferencesInitData[data.type];
		var watchType = watchTypes[data.type];
		var id = data.id;
		var colorizeFunction = $chk(data.colorizeFunction) ? data.colorizeFunction: function() {};
		var countItemsFunction = $chk(data.countItemsFunction) ? data.countItemsFunction: function(callback) { callback({ success: true, items: 0 }); };
		var lastPageFunction = $chk(data.lastPageFunction) ? data.lastPageFunction: function() { return true; };
		var updateInfo = $chk(data.updateInfo) ? data.updateInfo: function() {};
		var updateIcon = $chk(data.updateIcon) ? data.updateIcon: function() {};

		if (debug) GM_log("DEBUG: reading 'selected" + initData.gm_keyPostfix + '.' + id + "'");
		var metaInfo = GM_getObject('selected' + initData.gm_keyPostfix + '.' + id);
		if (metaInfo.key_present) {
			var storedInfo = metaInfo.value;
			if ($chk(storedInfo)) {
				if (debug) GM_log("DEBUG: using stored info");
				if (lastPageFunction()) { // reset numbers, only when reading the last page of the thread
					if (debug) GM_log("DEBUG: on last page");
					countItemsFunction(function(count) {
						if (!count.success) {
							notifyError(initData.gm_keyPostfix, id, count.message);
							return;
						}
						colorizeFunction(Math.max(storedInfo[initData.newitems], count.items - storedInfo[initData.items]));
						if (debug) GM_log(["DEBUG: storing",
							'selected' + initData.gm_keyPostfix + '.' + id,
							initData.items + ':' + count.items,
							initData.newitems + ':' + 0].join('\n'));
						if (count.pending) {
							storedInfo[initData.items] = 0;
							storedInfo[initData.newitems] = count.items;
						} else {
							storedInfo[initData.items] = count.items;
							storedInfo[initData.newitems] = 0;
						}
						updateInfo(storedInfo);
						GM_storeObject('selected' + initData.gm_keyPostfix + '.' + id, storedInfo);
						resetPostsIcon(initData.gm_keyPostfix, id);
						if (count.pending) {
							notifyNewPosts(initData.gm_keyPostfix, id, count.items);
						}
						updateIcon(storedInfo);
					});
				} else {
					if (storedInfo[initData.newitems] > 0) {
						notifyNewPosts(initData.gm_keyPostfix, id, storedInfo[initData.newItems]);
					} else {
						resetPostsIcon(initData.gm_keyPostfix, id);
					}
				}
			} else {
				notifyError(initData.gm_keyPostfix, id, "key present, but no data");
			}
			addMinusIcon(watchType);
		} else {
			addPlusIcon(watchType);
		}
	}

	function processPhotoPage() {
		var rePhotoMatch = /.*flickr.com\/photos\/([^\/]*)\/(\d+)/;
		var username = rePhotoMatch.exec(document.location.href)[1];
		var photoId = rePhotoMatch.exec(document.location.href)[2];

		watchTypes['photo'].id = photoId;
		watchTypes['photo'].username = username;

		processSomethingPage({
			type: 'photo',
			id: photoId,
			colorizeFunction: function(newComments) {
				colorizeNewPostsInPhotoPage(newComments);
			},
			countItemsFunction: countCommentsInPhotoPage,
			lastPageFunction: function() {
				return lastPageInPhotoPage();
			},
			updateInfo: function(storedInfo) {
				var main = getMain();
				if ($chk(main)) {
					var title = main.getElement('h1').get('html');
				} else { // new photo page
					title = $('content').getElement('span.photo-title').get('html');
				}
				storedInfo.title = title;
			}
		});
	}

	function countPhotosInPhotostream(callback) {
		var photos = 0;
		var paginator = $$('div.Paginator');
		if (!$chk(paginator) || paginator.length === 0) {
			// count the replies
			photos = $$('div.photo-display-item').length;
		} else {
			var results = $$('div.Results')[0];
			photos = results.get('html').match(/\(([\d\.,]+) [^\d]+\)/)[1];
			photos = parseInt(photos.replace(/(\.|,)/g, ''), 10);
		}
		callback({ success: true, items: photos });
	}

	function processPhotostreamPage() {
		try {
			var nsid = GM_getPhotostreamOwnerNsid();
			if (!$chk(nsid)) { // no photos yet
				var photostreamUrl = $('SubNav').getElement('td.Buddy a').get('href');
				var reNsidMatch = /.*\/(\d+@\w\d{2})/;
				if (photostreamUrl.match(reNsidMatch)) {
					nsid = reNsidMatch.exec(photostreamUrl)[1];
				} else {
					var buddyIcon = $('SubNav').getElement('td.Buddy a img');
					if ($chk(buddyIcon)) {
						var buddyIconUrl = buddyIcon.get('src');
						nsid = reNsidMatch.exec(buddyIconUrl)[1];
					}
				}
			}
			var rePhotostreamMatch = /.*flickr.com\/photos\/([^\/]*)\//;
			var username = rePhotostreamMatch.exec(document.location.href)[1];

			watchTypes.photostream.id = nsid;
			watchTypes.photostream.username = username;

			processSomethingPage({
				type: 'photostream',
				id: nsid,
				countItemsFunction: countPhotosInPhotostream,
				updateInfo: function(storedInfo) {
					storedInfo.username = username;
				}
			});

		} catch(e) {
			GM_log("error processing photostream page: " + e);
		}
	}

	function countMembersInGroup(callback) {
		var members = 0;
		$$('h2').get('html').each(function(count) { // 'count' contains 'admins(n)'
			try {
				var num = /\w+\s*\(\s*([\d\.,]+)\s*\)/.exec(count)[1];
				members += parseInt(num.replace(/(\.|,)/, ''), 10);
			} catch(e) {
				callback({ success: false, message: "error parsing count on members page: " + e });
			}
		});
		callback({ success: true, items: members });
	}

	function processGroupMembersPage() {
		var reGroupmembersMatch = /.*flickr.com\/\/?groups_members.gne.*id=(\d+@\w\d{2})/;
		if (reGroupmembersMatch.test(document.location.href)) {
			var groupId = reGroupmembersMatch.exec(document.location.href)[1];
		} else {
			var href = getMain().getElement('a[href*=groups_members_detail.gne]').href;
			reGroupmembersMatch = /groups_members_detail.gne.*id=(\d+\@\w\d{2})/;
			groupId = reGroupmembersMatch.exec(href)[1];
		}
		var groupname = readGroupTitleFromPage();

		watchTypes.groupmembers.id = groupId;
		watchTypes.groupmembers.title = groupname;

		processSomethingPage({
			type: 'groupmembers',
			id: groupId,
			countItemsFunction: countMembersInGroup,
			updateInfo: function(storedInfo) {
				storedInfo.title = groupname;
			}
		});
	}

	function countReversedContacts(element, callback) {
		var members = 0;
		var paginator = element.getElement('div.Paginator');
		if (!$chk(paginator) || paginator.length === 0) {
			// count the members
			members = element.getElements('td.contact-list-name').length;
		} else {
			var results = element.getElement('div.Results');
			members = results.get('html').match(/\(([\d\.,]+) [^\d]+\)/)[1];
			members = parseInt(members.replace(/(\.|,)/g, ''), 10);
		}
		callback({ success: true, items: members });
	}

	function processReversedContactsPage() {
		var userNsid = GM_getUserNsid();
		var title = 'Your reverse contacts';

		watchTypes.reversedcontacts.id = userNsid;
		watchTypes.reversedcontacts.title = title;

		processSomethingPage({
			type: 'reversedcontacts',
			id: userNsid,
			countItemsFunction: function(callback) {
				countReversedContacts($(document), callback);
			},
			updateInfo: function(storedInfo) {
				storedInfo.title = title;
			}
		});
	}

	function countPendingItems(element, callback) {
		var items = 0;
		var paginator = element.getElement('div.Paginator');
		if ($chk(paginator) && paginator.length > 0) {
			var results = element.getElement('div.Results');
			items = results.get('html').match(/\(([\d\.,]+) [^\d]+\)/)[1];
			items = parseInt(items.replace(/(\.|,)/g, ''), 10);
		} else {
			// count the items
			items = element.getElements('td.gPendPic').length;
		}
		callback({ success: true, items: items, pending: true });
	}

	function countPendingTestimonials(element, callback) {
		var items = 0;
		callback({ success: true, items: element.getElements('input[name*=approve]').length, pending: true });
	}

	function countPendingMembers(element, callback) {
		try {
			var items = element.getElement('td[id=GoodStuff]').getElement('h3').get('text'); //getElements('form').length;
		} catch(e) {
			items = 0;
		}
		callback({ success: true, items: parseInt(items, 10), pending: true });
	}

	function readGroupTitleFromPage(element) {
		
		var title = "Group title not found";
		if (!$chk(element)) {
			element = document;
		}
		if ($chk(element.getElement('*[id=cattington_outer]'))) {
			try {
				return element.getElement('*[id=cattington_outer]').getElement('h1 a').get('html');
			} catch (e) {
				return element.getElement('*[id=cattington_outer]').getElement('h1').get('html').trim();
			}
		}
		if ($chk(element.getElement('*[id=sg_group_title_bg]'))) {
			return  element.getElement('*[id=sg_group_title_bg]').get('html');
		}
		if (element.getElements('h1.group-title span').length > 0) {
			var titleSpan = element.getElement('h1.group-title span').clone();
			titleSpan.removeChild(titleSpan.getElement('a'));
			return titleSpan.get('text');
		}
		
		return element.getElement('div[id=Main]').getElement('h1').getElements('a')[1].get('html');
	}

	function processPendingItemsPage() {
		var reGroupnameMatch = /.*flickr.com\/groups\/([^\/]*)\//;
		var groupname = reGroupnameMatch.exec(document.location.href)[1];
		var title = readGroupTitleFromPage();

		watchTypes.pendingitems.id = groupname;
		watchTypes.pendingitems.title = title;

		processSomethingPage({
			type: 'pendingitems',
			id: groupname,
			countItemsFunction: function(callback) {
				countPendingItems($(document), callback);
			},
			updateInfo: function(storedInfo) {
				storedInfo.title = title;
			}
		});
	}
	function processPendingTestimonialsPage() {
		var userNsid = GM_getUserNsid();
		var title = 'Your testimonals';

		watchTypes.pendingtestimonials.id = userNsid;
		watchTypes.pendingtestimonials.title = title;

		processSomethingPage({
			type: 'pendingtestimonials',
			id: userNsid,
			countItemsFunction: function(callback) {
				countPendingTestimonials($(document), callback);
			},
			updateInfo: function(storedInfo) {
				storedInfo.title = title;
			}
		});
	}
	function processPendingMembersPage() {
		// TODO: check for p.Problem in processXXXPage functions!
		var reGroupIdMatch = /.*flickr.com\/groups_pending\.gne\?id=(\d+\@\w\d{2})/;
		var groupId = reGroupIdMatch.exec(document.location.href)[1];
		try {
			var title = $('Tertiary').getElements('a')[1].get('html');
		} catch (e) {
			if ($$('p.Problem').length > 0) {
				title = $$('p.Problem')[0].get('text');
			} else {
				title = e;
			}
		}

		watchTypes.pendingmembers.id = groupId;
		watchTypes.pendingmembers.title = title;

		processSomethingPage({
			type: 'pendingmembers',
			id: groupId,
			countItemsFunction: function(callback) {
				countPendingMembers($(document), callback);
			},
			updateInfo: function(storedInfo) {
				storedInfo.title = title;
			}
		});
	}

	function lastPageInAppPage() {
		var lastpage = false;
		// if there is only 1 page, it's the last :-)
		var paginator = $$('div.Paginator');
		if (paginator.length === 0) {
			lastpage = true;
		} else {
			if ($chk(paginator.getElement('span.AtEnd'))) {
				lastpage = true;
			}
		}
		return lastpage;
	}

	function colorizeNewPostsInAppPage(newPosts) {
		if (newPosts && newPosts > 0) {
			// colorize the new posts (if on the last page)
			if (preferences.colorizeNewPosts() && lastPageInAppPage()) {
				var replyElements = $('DiscussPhoto').getElements('div.comment-owner');
				// colorize the unread ones
				replyElements.each(function(replyElement, idx) {
					if (idx < replyElements.length - newPosts) {
						return;
					}
					replyElement.addClass('NFPN_hint');
				});
				if (replyElements.length < newPosts && $$('div.Paginator').length > 0) { // also color the 'prev' button
					$$('a.Prev').addClass('NFPN_hint');
				}
			}
		}
	}

	function countCommentsInAppPage(element, callback) {
		var comments = 0;
		var paginator = element.getElements('div.Paginator');
		if ($chk(paginator) && paginator.length > 0) {
			var results = element.getElement('div.Results');
			comments = results.get('html').match(/\(([\d\.,]+) [^\d]+\)/)[1];
			comments = parseInt(comments.replace(/(\.|,)/g, ''), 10);
		} else {
			// count the replies
			comments = element.getElements('.comment-block').length;
		}
		callback({ success: true, items: comments });
	}

	function processAppPage() {
		// TODO: remove trailing \/
		// some folks provide links within Flickr without the trailing /
		var reAppidMatch = /.*flickr.com\/services\/apps\/(\d+)\//;
		var appId = reAppidMatch.exec(document.location.href)[1];
		var title = getMain().getElement('h1').get('html');
		var username = $('ag-owner-attr').getElement('b').get('html');

		watchTypes.app.id = appId;
		watchTypes.app.username = username;
		watchTypes.app.title = title;

		processSomethingPage({
			type: 'app',
			id: appId,
			colorizeFunction: function(newComments) {
				colorizeNewPostsInAppPage(newComments);
			},
			countItemsFunction: function(callback) {
				countCommentsInAppPage($(document), callback);
			},
			lastPageFunction: function() {
				return lastPageInAppPage();
			},
			updateInfo: function(storedInfo) {
				storedInfo.username = username;
				storedInfo.title = title;
			}
		});
	}

	function lastPageInSetPage() {
		// TODO: check for a set with multiple page comments
		return lastPageInAppPage();
	}

	function constructSetUrl(setId, callback) {
		new Request({
			url: 'http://www.flickr.com',
			onSuccess: function(responseText, responseXML) {
				var result = JSON.parse(responseText);
				if (result.stat === 'fail') {
					callback({ success: false, message: "error reading set information: " + result.message });
					return;
				}
				var ownerid = result.photoset.owner;
				resolveUsername(ownerid, function (user) {
					if (!user.success) {
						callback(user);
					} else {
						var username = user.displaypath;
						callback({ success: true, url: 'http://www.flickr.com/photos/' + ($chk(username) ? username : ownerid) + '/sets/' + setId + '/comments/' });
					}
				});
			},
			onFailure: function(response) {
				callback({ success: false, message: "error constructing set url " + response.statusText });
			}
		}).get('/services/rest', {
			api_key: GM_getMagisterLudi(),
			auth_hash: GM_getAuthHash(),
			csrf: GM_getCsrf(),
			auth_token: GM_getAuthToken(),
			format: 'json',
			method: 'flickr.photosets.getInfo',
			nojsoncallback: 1,
			photoset_id: setId
		});
	}

	function colorizeNewPostsInSetPage(newPosts) {
		if (newPosts && newPosts > 0) {
			// colorize the new posts (if on the last page)
			if (preferences.colorizeNewPosts() && lastPageInSetPage()) {
				var replyElements = $('ViewSet').getElement('table.SetComments').getElements('td.Comment');
				// colorize the unread ones
				replyElements.each(function(replyElement, idx) {
					if (idx < replyElements.length - newPosts) {
						return;
					}
					replyElement.getParent('tr').getElement('td').addClass('NFPN_hint');
				});
				if (replyElements.length < newPosts && $$('div.Paginator').length > 0) { // also color the 'prev' button
					$$('a.Prev').addClass('NFPN_hint');
				}
			}
		}
	}

	function countCommentsInSetPage(element, callback) { // TODO: check for multipage comments
		var comments = 0;
		var paginator = element.getElements('div.Paginator');
		if ($chk(paginator) && paginator.length > 0) {
			var results = element.getElement('div.Results');
			comments = results.get('html').match(/\(([\d\.,]+) [^\d]+\)/)[1];
			comments = parseInt(comments.replace(/(\.|,)/g, ''), 10);
		} else {
			// count the replies
			comments = element.getElements('td.Comment').length;
		}
		callback({ success: true, items: comments });
	}

	function processSetPage() {
		var reSetidMatch = /.*flickr.com\/photos\/([^\/]+)\/sets\/(\d+)\/comments/;
		var matches = reSetidMatch.exec(document.location.href);
		var username = matches[1];
		var setId = matches[2];
		var title = getMain().getElement('h1').get('html').replace(/^\s*(.*)\s*$/, "$1"); // remove leading and trailing white-space
		var realname = $('setCrumbs').getElement('td.scTopCrumbShareBreadcrumbs').getElement('a').get('text');

		watchTypes.set.id = setId;
		watchTypes.set.username = username;
		watchTypes.set.title = title;

		processSomethingPage({
			type: 'set',
			id: setId,
			colorizeFunction: function(newComments) {
				colorizeNewPostsInSetPage(newComments);
			},
			countItemsFunction: function(callback) {
				countCommentsInSetPage($(document), callback);
			},
			lastPageFunction: function() {
				return lastPageInSetPage();
			},
			updateInfo: function(storedInfo) {
				storedInfo.username = username;
				storedInfo.realname = realname;
				storedInfo.title = title;
			}
		});
	}

	function countPhotosInGroupPage(callback) {
		var photos = 0;
		var paginator = $$('div.Paginator');
		if (!$chk(paginator) || paginator.length === 0) {
			// count the photos
			try {
				photos = $$('.pool-photo').length;
			} catch(e) {
				callback({ success: false, message: "no photos found" });
			}
		} else {
			var results = $$('div.Results')[0];
			photos = results.get('html').match(/\(([\d\.,]+) [^\d]+\)/)[1];
			photos = parseInt(photos.replace(/(\.|,)/g, ''), 10);
		}
		callback({ success: true, items: photos });
	}

	function processGroupPoolPage() {
		var title = readGroupTitleFromPage();
		var groupId = GM_getGroupId();

		watchTypes.grouppool.id = groupId;
		watchTypes.grouppool.title = title;

		processSomethingPage({
			type: 'grouppool',
			id: groupId,
			countItemsFunction: countPhotosInGroupPage,
			updateInfo: function(storedInfo) {
				storedInfo.title = title;
			}
		});
	}

function countFavoritesForUser(callback) {
	var userNsid = GM_getUserNsid();
	var favorites = 0;
	var apiData = {
		api_key: GM_getMagisterLudi(),
		auth_hash: GM_getAuthHash(),
		csrf: GM_getCsrf(),
		auth_token: GM_getAuthToken(),
		format: 'json',
		method: 'flickr.favorites.getList',
		per_page: 1,
		nojsoncallback: 1,
		user_id: userNsid
	}
	new Request({
		url: 'http://www.flickr.com',
		onSuccess: function(responseText, responseXML) {
			try {
				var result;
				try {
					result = JSON.parse(responseText);
				} catch(e) {
					try {
						result = eval('(' + responseText + ')');
					} catch (f) {
						GM_log("error parsing favorites for user: " + e);
						callback({ success: false, message: "error parsing favorites for user: " + e });
						return;
					}
				}
				if (result.stat === 'fail') {
					GM_log("error fetching user favorites: " + result.message);
					callback({ success: false, message: "error fetching user favorites: " + result.message });
					return;
				}
				favorites = result.photos.total;
				callback({ success: true, items: favorites });

			} catch(e) {
				GM_log("exception in countFavoritesForUser: " + e);
				callback({ success: false, message: "exception in countFavoritesForUser: " + e });
			}
		},
		onFailure: function(response) {
			try {
				callback({ success: false, message: "failure in countFavoritesForUser: " + response.statusText });
				GM_log("reading Favorites." + userNsid + " failed: " + response.statusText);
			} catch(e) {
				callback({ success: false, message: "exception in failure in countFavoritesForUser: " + e});
				GM_log("error reading Favorites : " + e);
			}
		}
	}).get('/services/rest', apiData);
}

function processFavoritesPage() {
	var userNsid = getMain().getElement('div.photo-display-item').get('data-fave-owner');

	var prefix = 'selected' + preferencesInitData.favorites.gm_keyPostfix;
	var favoritesInfo = GM_getObject(prefix + '.' + userNsid);
	if (favoritesInfo.key_present) {
		spinNewPostsIcon(prefix, userNsid);
		
		resolveUsername(userNsid, function(resolvedUsername) {
			var path = resolvedUsername.userpath;
			var userpath = $chk(path) ? path : userNsid;
			var displayname = resolvedUsername.displayname;

			processSomethingPage({
				type: 'favorites',
				id: userNsid,
				countItemsFunction: countFavoritesForUser,
				updateInfo: function(storedInfo) {
					storedInfo.userpath = userpath;
					storedInfo.title = displayname;
					GM_storeObject(prefix + '.' + userNsid);
					resetPostsIcon(prefix, userNsid);
				}
			});
		});
	}
}

function isGroupAdministratorOrModerator(userNsid, groupId, callback) {
	new Request({
		url: "http://www.flickr.com/",
		onFailure: function(response) {
			GM_log("failure reading members from group: " + response.statusText);
			return {
				administrator: false,
				moderator: false
			};
		},
		onSuccess: function(responseText, responseXML) {
			var result;
			try {
				result = JSON.parse(responseText);
			} catch(e) {
				result = eval('(' + responseText + ')');
			}
			if (result.stat === 'fail') {
				GM_log("failed reading members from group: " + result.code + " - " + result.message);
				return;
			}
			var retval = {
				administrator: false,
				moderator: false
			};
			var members = result.members;
			$each(members.member, function(member) {
				if (member.nsid === userNsid) {
					if (member.membertype == 3) { // moderator
						retval.moderator = true;
					} else if (member.membertype == 4) { // administrator
						retval.administrator = true;
					}
				}
			});
			callback(retval);
		}
	}).get("/services/rest", {
		api_key: GM_getMagisterLudi(),
		auth_hash: GM_getAuthHash(),
		csrf: GM_getCsrf(),
		auth_token: GM_getAuthToken(),
		format: 'json',
		nojsoncallback: 1,
		method: 'flickr.groups.members.getList',
		group_id: groupId,
		membertypes: '3,4',
		per_page: 500 // one page should be sufficient?
	});
}

function processGroupPage() { // a very special case
	var title = readGroupTitleFromPage();
	var groupId = GM_getGroupId();

	var reGroupnameMatch = /.*flickr.com\/groups\/([^\/]+)/;
	var groupname = reGroupnameMatch.exec(document.location.href)[1];

	watchTypes.group.id = groupname;

	watchTypes.groupmembers.id = groupId;
	
	watchTypes.grouppool.id = groupId;

	watchTypes.pendingitems.id = groupname;

	watchTypes.pendingmembers.id = groupId;

	var userNsid = GM_getUserNsid();
	
	isGroupAdministratorOrModerator(userNsid, groupId, function(admod) {
		[ { type: 'group', admod: false },
		  { type: 'pendingitems', admod: true },
		  { type: 'pendingmembers', admod: true },
		  { type: 'grouppool', admod: false },
		  { type: 'groupmembers', admod: false } ].forEach( function (wt) {
		  	var watchType = watchTypes[wt.type];
			watchType.title = watchType.gm_keyPostfix + ': ' + title;
			watchType.fromGroupPage = true;

			// add +/- icons for different group pages
			if (wt.admod) {
				if (!admod.administrator && !admod.moderator) {
					return;
				}
			}
			var gm_keyPostfix = watchType.gm_keyPostfix;
			var id = watchType.id;

			metaInfo = GM_getObject('selected' + gm_keyPostfix + '.' + id);

			if (metaInfo.key_present) {
				addMinusIcon(watchType);
			} else {
				addPlusIcon(watchType);
			}
		});
	});
	if ($chk($('global-nav'))) { // new navigation bar
		processGroupPoolPage();
	}
}

	if (window.name === 'Log page') {
		throw new Error("not processing log page");
	}

// version update info
function getVersion(callbackId, callbackEvent) {
	$(callbackId).fireEvent(callbackEvent, { version: NFDPNversion });
}

	new Element('span', {
		id: 'NFPN-updatenotifier',
		styles: {
			display: 'none',
			visibility: 'hidden'
		},
		events: {
			'checkversion': function (evt) {

				var lastVersion = GM_getValue("version");
				if ($chk(lastVersion) && lastVersion != evt.version) {
					// cleanup
					GM_deleteValue("version");
					GM_deleteValue("lastVersionCheckTime");
					GM_deleteValue("onlineVersion");
				}
				GM_setValue("version", evt.version);
				checkVersion(evt.version);
			}
		}
	}).inject($$('body')[0], 'bottom');
	getVersion('NFPN-updatenotifier', 'checkversion');
// end version update info

	preferences = new NFPNPreferences();

	// first call checkForNewPosts; it triggers the creation of the envelopes
	if (document.location.href.test('http://www.flickr.com') || document.location.href.test('https://www.flickr.com') || document.location.href.test('https://secure.flickr.com')) {
		checkForNewPosts();
	}

	if (document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/discuss\/\d+/)) {
		if (!document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/discuss\/\d+\/\d+\//) &&
		    !document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/discuss\/\d+\/#reply/)) {
			processThreadPage();
		}

	} else if (document.location.href.test(/www.flickr.com\/help\/forum\/[^\/]+\/\d+/)) {
		processForumItemPage();

	} else if (document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/discuss/)) {
		if (!document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/discuss\/\d+/) && 
		    !document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/discuss\/page\d+/)) {
			processDiscussPage();
		}

	} else if (document.location.href.test(/www.flickr.com\/help\/forum\/[^\/]+/)) {
		if (!document.location.href.test(/www.flickr.com\/help\/forum\/[^\/]+\/\?page=\d+/)) {
			processHelpForumPage();
		}

	} else if (document.location.href.test(/www.flickr.com\/photos\/[^\/]+\/\d+/)) {
		if (!document.location.href.test(/www.flickr.com\/photos\/[^\/]+\/\d+\/stats/) && 
		    !document.location.href.test(/www.flickr.com\/photos\/[^\/]+\/\d+\/groups/) &&
		    !document.location.href.test(/www.flickr.com\/photos\/[^\/]+\/\d+\/galleries/) &&
		    !document.location.href.test(/www.flickr.com\/photos\/[^\/]+\/\d+\/favorites/)) {
			processPhotoPage();
		}

		// skip ../photos/friends
	} else if (document.location.href.test(/www.flickr.com\/photos\/(friends|upload)/)) {
		// just skip
		// skip ../photos/username/stats
	} else if (document.location.href.test(/www.flickr.com\/photos\/[^\/]+\/(?:page\d+)?$/)) {
		if (!document.location.href.test(/www.flickr.com\/photos\/[^\/]+\/\d+/)) {
			processPhotostreamPage();
		}

	} else if (document.location.href.test(/www.flickr.com\/photos\/[^\/]+\/favorites/)) {
		processFavoritesPage();
	
	} else if (document.location.href.test(/www.flickr.com\/groups_members.gne.*(?!tab=)/) ||
		   document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/members\/$/)) {
		processGroupMembersPage();

	} else if (document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/pool\/(?!page)/)) {
		if (document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/pool\/\?donepending=1/)) {
			processPendingItemsPage();
		} else {
			if (!document.location.href.test(/\/pool\/tags\//) &&
			    !document.location.href.test(/donepending=1/)) {
				processGroupPoolPage();
			}
		}

	} else if (document.location.href.test(/www.flickr.com\/people\/[^\/]+\/contacts\/rev/)) {
		processReversedContactsPage();

	} else if (document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/admin\/pending\/?(?!page)/)) {
		processPendingItemsPage();

	} else if (document.location.href.test(/www.flickr.com\/services\/apps\/\d+/)) {
		if (!document.location.href.test(/www.flickr.com\/services\/apps\/\d+\/key/)) {
			processAppPage();
		}

	} else if (document.location.href.test(/www.flickr.com\/photos\/[^\/]+\/sets\/\d+\/comments/)) {
		processSetPage();

	} else if (document.location.href.test(/www.flickr.com\/testimonials_manage.gne/)) {
		processPendingTestimonialsPage();

	} else if (document.location.href.test(/www.flickr.com\/groups_pending.gne\?id=\d+\@\w\d{2}/)) {
		processPendingMembersPage();

	} else if (document.location.href.test(/www.flickr.com\/groups\/[^\/]+\/?$/)) {
		processGroupPage();

	}

})();

