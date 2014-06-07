// ==UserScript==
// @name           flags_wiki
// @namespace      martufone.info/gm
// @description    flags_wiki
// @grant          none
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==

(function() {
	
function xpath(path) {
        var res
        res = document.evaluate(
                path,
                window.document,
                null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, // unordered
                null)
        return res
}

// gif icons from famfamfam.com set

// see http://meta.wikimedia.org/wiki/List_of_Wikipedias
var flagsByLangCode = { 

// German
'de' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALANUAAPDcbqU/L/x1dfnrl6h9L7W1q6iGL/NHR5mLffWmVvayaZSUh6SkmWloaUpIOnhMS+0pKfblh518fHh4ePpmZvyyqfE8PJ13L/tsbPjlZfXhV0pKR+rTLO+SNu7YOoxlZfLcSPPgevKbRLOKL1hYWOuJJ/lgYLakL2k5OT8/OvZSUu8zM7q6sfdZWb1BMZuEL/zVpMq4r/KAcINbW+bNHeoeHmZJPOiCHe/gba2to5VycoCBgfvxopyckOjPIj8/LyH5BAAAAAAALAAAAAAQAAsAAAaHwI1j6Ej9jsikg8UsFHJQBqPXWyx+y91uMml4SaTNJoX42WISiU73+cwecBSq7KoIBBiKqaU6HCwrEDIBdXh6fH6AEIKEFXl7fX+BEDWDBDAKCgmbIiIdHSUlNwoBJzwZGRoaICAeHhwcPjQ4LycDtwMRuiG8AL4AFyPCIwQEBscvBBfKFxdBADs='>",

// English
'en' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALAMQAAP5RTlBlsQAUbZC20/mRjc3V6vg0NZhLaf39+xgrjrrP7b+ZtaGt1vyur+pgVfmFfGGDwYqZz/5jYnubxP/r6jxSrIUbN3GEx9vh9Kxhf+G+32RztcLE3dnd7f7+/////yH5BAAAAAAALAAAAAAQAAsAAAWBYKRMUNllWRcEFXRMTONhDOMRhBdF3IMMEEWj8Yl8JJLPpUH4MBIQRkTz+BwBR0qhckl0PNYwABv+eAoZAnLMNrjdAMu3/HGHEfhtJFCgJO11CwkBAhUMHw8EG3UGCBUIBA4RAgMeDxwXFx5jCCscCA4bEwcBCaYFFhYFAqwJAwkhADs='>",

// Spanish
'es' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALANUAAPxcXPpTU/X1Jfb2K/QtLfxjY+bmAP5yc/7+dvMWFv39APz8TOwAAPMAAP39bfLyE/7+Wvv7RfdLS/pERPQzM/k8PfDyQfT1O/1ra/96evdEROxoVfU7O+UAAPg2NvENDfb2MPPzGfkAAPT0H/j4NuAAAPn5PPXDsf39U/F+V+7fTu3gjfUhIezT1Pnx1vXq4ra7nezhQvj0S9/fAPLzVfTuV+xTUfxMTPK9sMDOqOCMUeSnSuvJS90AAP0AAP8AACH5BAAAAAAALAAAAAAQAAsAAAaFwJ/w5yv6RMiGksH4ZZ6ZwwGDKRQAgYCkmQF4s7fJpOKhELYKBARSU8kiERMJNBDIDGkILbVZWeR0AiMXeAgoJxstODFzdSMhhAoOCy46Ni8qgY8PkZM5PDswFo4hDw8gMyIFY2QEBCwsCQkfHwQlql9aGhocHBRmBD1KDUzFHcclJT3LQQA7'>",

// French
'fr' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALANUAAKqqqpqv2fHx8e1kVsTS7Vd7xenp6vSIft7e3viVjNTU1NgAALTF57zL6WaHzOpqXe7u7qG13ebm5uTk5O52arLD5aa53vN+cvf396q94e4JAHKS0uQAAOpXSfFwZMHP68/Pz/BqXMYAAK+/48wAAOxuYvN3a+lmWutdT+hSQ+ZNPvT09Lu7uxdHpfj4+LfI5+xeUOzr60Rsu+Li4p+fn2+P0aa54LOwsK6/5CxXsK7A5Ojo6O3t7evr6+zs7HOV0yH5BAAAAAAALAAAAAAQAAsAAAaLwJ/wt0EgFAoQSKPhOH+E6MeFqa5WicThwIG+GBWer2cwSC4mz2Gx+YB1kN7YnA5dFrVPBZeB8GIGOxIeIQMUCw4NfDYCfjxkhTCHDi8ZFhGNY4IDKB0lJAUvlwEQmhITnSkPoBURAQE+gaczHSkqJyIyI5YRYrISJQ8nA7k5xi0sLDcAADQkJCLRQQA7'>",

// Italian
'it' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALANUAAPdMTACFAOLi4t7e3uYAAPITE/lVVfT09PU9PewAAPIuLli6WQBXAPENDf7+/ly9XPMAAEOvQlS2VQB9AHvKewBlAFS5VPUlJfMZGU+2TwB2APMyMuAAAACJAMLCwvcxMUm0SfQfH/YrK3nIeXTGdOXl5QBvAACRAPQ2Nli8WM3NzfYsLMjIyEuzS/g3NzqqOmjCaPpcXPM1NfZERGC/Ydvb2/X19d0AAP39/fv7+/z8/Pb29vr6+vn5+fj4+Pf39yH5BAAAAAAALAAAAAAQAAsAAAaLwFOnEwiUBILBoAZpJhIBCmU0cuBwOl0uZjAAEh0K7bG4ank912cFIARGZAk2h/Z9RJeZm5SyZM49Pj94IQh7fi10gT87FyEYhhMkGSARdYw2jwUoBBMwlRGLOzYHGAUFGxwaMBERL4KjBwcFDQ0KHCZjCxKCmAcyGwoKNxoVFQwMKiwsHs0cHDfRQQA7'>",

// Japanese
'ja' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALANUAAPk7O/b29vj4+O/v79PT0+3t7evr6/cvL/g2NuXl5dfX1+fn5/YqKunp6d3d3dXV1dvb2/tGRt/f3/g1NfYrK/g0NPxVVdnZ2fk8POHj4vxLS/pISPUkJPf19fehofUqKvpBQffW1vR9ffT19f2qqtHR0fVVVfZbW/v8+/STk/27u/W7u/39/vmWlfqvr/zp6ft5efx+f/v7+/T09PHx8c/Pz/n5+fr6+vf39/z8/P39/fLy8vPz8/7+/vX19f///yH5BAAAAAAALAAAAAAQAAsAAAaLQJ9QyOPRBoOCobFIZHy/X2/K0uVysptNgJNApz2dKgZzbXEBnMMH1pE0ERCmhfYFIOzwyxIHIBAhPjM+CjxhOSF9CAcUKzM8Iw80VigvGwATBwwfITw7MwQ0WFktFZocIp47PAQDOTdaOB4nJik0OzS3NQVZNmcdHYKqOzVLTRkSDhAXCg8EJTXRQQA7'>",

// Dutch
'nl' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALANUAAAABdP7+/jRusgAhj/picxZYp/UAAPLy8vr6+vj4+Pb29v56iVqKw/1da0V7ujpytSpmrusAAGSSx/pCUftUZP11gwAAR/96hgAAWe7v7yFgq0J3tw1Rokt/vAAAPFCCv1SFwS9qrtHR0fk8Tf6CkdXV1ftqevcxQvg3Rz52uPxMWvVWavZabv8VMflXaP5ZZ3eezv6XpC5qsvYsPPv7+/pQX/5/j/htfvlIV/T19fxwgPX19fz8/P0AAPT09P8AACH5BAAAAAAALAAAAAAQAAsAAAaFwJ/w1ysWDUhkJPJbLC6Vis5kIhAaLkqNeWk0XloVbjJCnWa4SCtGsjmltyqBtbpFDoE8j0dDIBIJCjs+OyUZenx+gII+Bzkih3t9f4GDBwc+IgMwDCAfHQ4bDwIhEBAaGxYAEg4pozKnGgUFHBwhHqsMnZ+hrgKkELgAwxjFxRbIHsoeQQA7'>",

// Portuguese
'pt' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALANUAALa6Q1qbWvKtR/QtLO5zVvQcHPUyMpu0UWqlauipNflXVwA2AOHJNXSsdPUkJPU8POUAAPdLS0mRSfxjY1KVUj2HPesAAP1ra/ZERPITE/QAAMnIVPwAAPENDQAUAHuwe/k8Pfc3NuAAAHiueOqDdvXb1M7IT/nBUdnCPP1wcWmiXNbo+lORRfU8Nud4XPBBMEGRNO7d3e18TmCfYfM1KfRnTOLQV+66NvtTR/C4PUSORPpCQuppKubQ1N0AAABNACH5BAAAAAAALAAAAAAQAAsAAAaOwJ9wyClyNEiNxfL7fEajRupymUwU2AjzM1MdNicBbgcKGQba3yhgsxFqAkH57MBAfo3ARlbqEXItdAUPdw0UJjIxKy43LwMOBYMQCwgUBwAuJAwMj5EZIZMIEiwAKAkJPJAFGRkGIpQ6FRUwAzSqGR0dA68zAQEUFBEYGA8hZgMDPgsezMxLENAiIj7UQQA7'>",

// Chinese
'zh' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALANUAAKsAAO2TSLkAAOZhYd02NfvkXO6HedgyMu+YWdMTE+FFRc0AANsvL95AQNorK9YuLuFQUNglJeNYWOZYVvbPUdcgINENDd9KSulvbt1FRdYfH/rceOFOTto6Ot46OuBCQtUZGcIAAOhqavXMS+RdXZ4AANg2NuNKSdwxMeA/P+RSS+dcWeRPT+hmZv3zX+p/R/CbVPKld/W/ce2JUPGoUds9Pd48PO1/e+NUVOpyc+x5duVFANUAANMAAKEAAMcAACH5BAAAAAAALAAAAAAQAAsAAAaLQB6vJ9wtjovfLxQSCHi3jSG2kWFErQFJguMIehtXYQWjBBQfGwHluHwNBQSONnql145IBtDTTSYzIwF3DHkVDXw5OCwqAQ0eBIURGiAdAAsYLCcKj5F5lAkmPgsimymQkqAWB6MtCqeekyAJFhYPPj9aXBAXGQ01HSYHDw8lS01OAgDLAD4+JSU+QQA7'>",

// Russian
'ru' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALANUAAI2N+PLy/fQtLRgY8889aJyc/vz8/McnVvMWFjAw91VV/ePk7/pbW/xkZCor9oOD9yIi9fr6+vf39/hQUPo9PXR0/t7e6vb29pWV/NJHcOwAAPdERPU7O/MAAEpK/cMcTeUAAD8/9e/v+vM0NL4SRfENDQAA5kZG+0BA+jY29zs7+AAA/U9P/OAAAPg0NG9v/ezs9rMAAOjo8n199dxqjPpERHsAAMoyX/gAALGx/lBP/fUhId0AAP7+/vX1/////yH5BAAAAAAALAAAAAAQAAsAAAaGQJ9QGCiKRDCYTLZY+H6/nrRnqBoiEYnE8pxar1nJZevJFc6YNGD9eMwAplVFodB5TihVKuGAQEJxcyx3eXt9EAMqcS+DeHp8fgMDKSYxNBkZBAQ3NwcHHx8kJDc2OA01FBwuAgI7OwgIJSUCLaYMDBO5GxscHCMjrDwdwxrFxSDILS08zEEAOw=='>",

// Arabic
'ar' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEQALAKU0AABiMwRiNQNjNARjNQJkNQZkNxBmPSRxLx9xSiBxSilyTityUEF/QD+APzOBWTWBXjmDYUaAZEiBZkqFRE+GRD+IZlmOUVqOT1mLdVqMdmOMa2GNeWOPZ2OQemiQemeRfG6SYXCTZmyUbWyVbW2Vgm6VgWmaYHuRhl6cemqcYl+df2eedmWfg2WghHmcjXudjYmck32neISznYu4o////////////////////////////////////////////////yH5BAEKAD8ALAAAAAARAAsAAAZIQIBwSCwahwOC4GgsdGCbAnO4EE0OlJFiWvA0HJUH4xNgJkAoSIu1CiGYgVJKppqZSGWmhGOJXTQRU0IZLycuGIJDBgCLiY5BADs='>",

// Esperanto
'eo' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEQALAIQQAACZAA6fDiepJzCsMEi2SFO7U2fCZ5HTkZbVlpfVl83rzeb15u747vP68/3+/f7//v///////////////////////////////////////////////////////////////yH5BAEKAB8ALAAAAAARAAsAAAUqIAQ5YgKcaAqICAOZqvocwaDAMQothPHmKUhD+AOeCkikwMhsOp/QqDMEADs='>",

// Korean
'kr' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALANUAAHSa4aampNTU0/mIh3x8fFNqxftFRfvz82hnZ+Hn5fn5+cTExN7k4vX19dnZ2u3y8vzY2Onp6YqKisfU7crKyug+RsvS0Tdv2Nbb2vPz8+nv77u6u1dXV+/189HZ1+Pp6dff3dnh3+Xr6+ft7fL0+evx8NPZ2eju9K6wsNDX1WVuvqrE8N/f38Z5k8vRz/OxtdDQzfL19fX087Wdw6Os2drc3M/T0c/V0/7+/v39/fT09PLy8vf39/z8/PH39f///yH5BAAAAAAALAAAAAAQAAsAAAaeQJ9Q2Ok8HiXNSPRJMHy/n2Ohy+V6vd2GouA9fxEJoZaDQBQOBMHBC/lwDgnqMDAYBjsUYtEAvXERMS92FRUDGg46DRgdOFc9M4UqBS08OhkNHg9XETIrBQUXFzQRDjs6KQ89AgQBJACiACcBHBsZNyU9LAQIAjwTEzswHAgUOxYaPQoLKBE8PA0NEQEoO8dLTQwMISAYJh4pNhYWLkEAOw=='>",

// Piedmontese
'pms' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhDwALAKU+ANoDDdsEDb4MHUQsXXEhRkYsXDsvYvsAAfgBAzkwZDUxZ/0AAEYtXvkBAzowZLATKBY5dv4AAEMuXzcxZUgtXf8AAEQuX74QIboRI0UuXj4wY0REdUZEdTtJfTtKfixWjTtilURik0djlHJZf3JcgEVpmkdqm/9bW/9cXP9fX75vgL5zhOp3fed6gX+Xuv9/f/6Cgv+Cgv+Dgv+EhP6Gh/+Hh/+xsf+0tL7L3P/h4f/i4v/w8P/x8fn6+////////yH5BAEKAD8ALAAAAAAPAAsAAAZtQMhk6DB0QB5DYjiBSA6HyIMwcpEImAU0Y6l4NQHWpwWgeCuMbiXSWMB6tAXizNik7imUzXc74VMcJT6DhIWEJiE6ijo5Oz48OYs6IgNnXi8+M5YVBWpnMT41m2mbMqGjCheqFwIqOCsCqxcTQQA7'>",

// Simple English
'simple' : "&nbsp;<img src='data:image/gif;base64,R0lGODlhEAALAMQAAP5RTlBlsQAUbZC20/mRjc3V6vg0NZhLaf39+xgrjrrP7b+ZtaGt1vyur+pgVfmFfGGDwYqZz/5jYnubxP/r6jxSrIUbN3GEx9vh9Kxhf+G+32RztcLE3dnd7f7+/////yH5BAAAAAAALAAAAAAQAAsAAAWBYKRMUNllWRcEFXRMTONhDOMRhBdF3IMMEEWj8Yl8JJLPpUH4MBIQRkTz+BwBR0qhckl0PNYwABv+eAoZAnLMNrjdAMu3/HGHEfhtJFCgJO11CwkBAhUMHw8EG3UGCBUIBA4RAgMeDxwXFx5jCCscCA4bEwcBCaYFFhYFAqwJAwkhADs='>",

// see http://meta.wikimedia.org/wiki/List_of_Wikipedias
// add/remove (order doesn't matter) inline flags images as:
'language-code' : "&nbsp;<img src='data:image/_TYPE_;_ENCODING_,_DATA_'>",

}

// add/remove codes of your preferred/understood language (order matter, and the codes must be present in the above dictionary/map/hash)
var favLangCodes = new Array("it", "es", "pt", "en", "fr", "simple") 

// Nothing customizable fom here... just bugs :)
var theUL = xpath('//div[@id="p-lang"]/div[@class="body"]/ul').snapshotItem(0)
var firstLI = -1
for (var i in favLangCodes) { // ...
	var langCode = favLangCodes[i]
	for (var j in theUL.childNodes) {
		if (theUL.childNodes[j].nodeType == 1) {
			var res = theUL.childNodes[j].className.match(/interwiki-(..[^ ]*)( |$)/)
			if (res && firstLI == -1) {
				firstLI = theUL.childNodes[j]
			}
			if (res && langCode == res[1]) {
				var li = theUL.childNodes[j]
				if (firstLI != li) {
					theUL.removeChild(li);
					theUL.insertBefore(li, firstLI);
					li.innerHTML += flagsByLangCode[langCode]
				} else {
					li.innerHTML += flagsByLangCode[langCode]
				}
			}
		}
	}
}
})()

