////////////////////////////////////////////////////////////////////////////////
// ==UserScript==
// @name           Greasemungo PM Flags
// @description    Popmundo: Show a flag icon for each language when sending a PM. (2008-04-24)
// @namespace      kenmooda@gmail.com
// @include        http://*.popmundo.com/Common/CharacterDetails.asp?action=SendMessage&*
// ==/UserScript==
////////////////////////////////////////////////////////////////////////////////
//
//    Greasemungo PM Flags
//    Copyright (C) 2007, 2008  Tommi Rautava
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
////////////////////////////////////////////////////////////////////////////////
    
    
FLAGS_ONLY = false;

////////////////////////////////////////////////////////////////////////////////
var flagsByCountry = {
    // Translations (in ID number order)
	'Svenska': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGwSURBVHjaYmRwbmSAgb919Qz/GICIuayU4dc/hl+/' +
		'GH79YfjxC8H4/QsggFiA6qpzPYHkv3//GZW/Mfz7+5/hb26J35+////8/QdEv//+BZH/QIxNuZMBAogF' +
		'bPT/J++//f33n+Hno///fzP8/3v/9effQEV//gIV/frz9xeQ/fuvrDA3A8MvgABiAZr87x8DUPWfn6wQ' +
		'1f///WJh/PHtD9MvsJ5fYPT7H1Az0Lm/AAKI8e9BBkalMoZfQLP/MPz/8//fbxD6Dyb//QIjMOP/b0Z2' +
		'+U97DwIEEAvDHwaQqSAVMA3/f0G1IVSDGAz//gCVAAQQ0EkM/0Hq/gBFgUJIGpBIsAgj0Od/GAACiJFB' +
		'vzirLOD+m4/AoNjq3gu26pf52pLff/6A/PCD6dcfYPj8+/Pnr7IY39nWSQABxMLw488fkIf+/v7zD2bY' +
		'r19A1aAg+gcM/98Mf/8w/vvDBETsDAxPAAKIBRgpQKWS/NzAAGFgk2YABtS/37JCPKCwB7r531+gOX//' +
		'/gOhf6BIBQggRgbJZHhEvp2zFhgGQIeKptsygELjFwz9A3OBJANAgAEA3Ll5iCfmAhAAAAAASUVORK5C' +
		'YII=',
	'English': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHzSURBVHjaYkxOP8IAB//+Mfz7w8Dwi4HhP5CcJb/n' +
		'/7evb16/APL/gRFQDiAAw3JuAgAIBEDQ/iswEERjGzBQLEru97ll0g0+3HvqMn1SpqlqGsZMsZsIe0SI' +
		'CA5gt5a/AGIEarCPtFh+6N/ffwxA9OvP/7//QYwff/6fZahmePeB4dNHhi+fGb59Y4zyvHHmCEAAAW3Y' +
		'DzQYaJJ93a+vX79aVf58//69fvEPlpIfnz59+vDhw7t37968efP3b/SXL59OnjwIEEAsDP+YgY53b2b8' +
		'9++/awvLn98MDi2cVxl+/vl6mituCtBghi9f/v/48e/XL86krj9XzwEEEENy8g6gu22rfn78+NGs5Ofr' +
		'16+ZC58+fvyYwX8rxOxXr169fPny+fPn1//93bJlBUAAsQADZMEBxj9/GBxb2P/9+S/R8u3vzxuyaX8Z' +
		'Hv3j8/YGms3w8ycQARmi2eE37t4ACCDGR4/uSkrKAS35B3TT////wADOgLOBIaXIyjBlwxKAAGKRXjCB' +
		'0SOEaeu+/y9fMnz4AHQxCP348R/o+l+//sMZQBNLEvif3AcIIMZbty7Ly6t9ZmXl+fXj/38GoHH/UcGf' +
		'P79//BBiYHjy9+8/oUkNAAHEwt1V/vI/KBY/QSISFqM/GBg+MzB8A6PfYC5EFiDAABqgW776MP0rAAAA' +
		'AElFTkSuQmCC',
	'Deutsch': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGzSURBVHjaYvTxcWb4+53h3z8GZpZff/79+v3n/7/f' +
		'DAz/GHAAgABi+f37e3FxOZD1Dwz+/v3z9y+E/AMFv3//+Qumfv9et241QACxMDExAVWfOHkJJAEW/gUE' +
		'P0EQDn78+AHE/gFOQJUAAcQiy8Ag8O+fLFj1n1+/QDp+/gQioK7fP378+vkDqOH39x9A/RJ/gE5lAAhA' +
		'YhzcAACCQBDkgRXRjP034R0IaDTZTFZn0DItot37S94KLOINerEcI7aKHAHE8v/3r/9//zIA1f36/R+o' +
		'4tevf1ANYNVA9P07RD9IJQMDQACxADHD3z8Ig4GMHz+AqqHagKp//fwLVA0U//v7LwMDQACx/LZiYFD7' +
		'/5/53/+///79BqK/EMZ/UPACSYa/v/8DyX9A0oTxx2EGgABi+a/H8F/m339BoCoQ+g8kgRaCQvgPJJiB' +
		'YmAuw39hxn+uDAABxMLwi+E/0PusRkwMvxhBGoDkH4b/v/+D2EDyz///QB1/QLb8+sP0lQEggFh+vGXY' +
		'M2/SP6A2Zoaf30Ex/J+PgekHwz9gQDAz/P0FYrAyMfz7wcDAzPDtFwNAgAEAd3SIyRitX1gAAAAASUVO' +
		'RK5CYII=',
	'Italiano': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE2SURBVHjaYmSYyMDwgwEE/jEw/GF4mvT0HyqQUlX9' +
		'B5aEIIAAYmH4wlDtWg1SDwT//0lKSv7/D+T9/w+nYmL+//79/88fIPll0yaAAGJhYAGJP/n69O+/v0CA' +
		'UAcHt2////ULqJpRVhZoA0AAsQCtAZoMVP0HiP7+RlcNBEDVYA0Mv38DNQAEEMj8vwx//wCt/AdC/zEB' +
		'kgagYoAAYgF6FGj277+///wlpAEoz8AAEEAgDX/BZv/69wuoB48GRrCTAAKICajh9//fv/6CVP/++wu7' +
		'BrDxQFf/YWAACCCwk0BKf0MQdg1/gBqAPv0L9ANAALEAY+33vz+S3JIgb/z5C45CBkZGRgY4UFICKQUj' +
		'oJMAAoiRoZSB4RMojkHx/YPhbNVZoM3AOISQQPUK9vaQOIYAgAADAC5Wd4RRwnKfAAAAAElFTkSuQmCC',
	'Français': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGzSURBVHjaYiyeepkBBv79+Zfnx/f379+fP38CyT9/' +
		'/jAyMiq5GP77wvDnJ8MfoAIGBoAAYgGqC7STApL///3/9++/pCTv////Qdz/QO4/IMna0vf/z+9/v379' +
		'//37bUUTQACBNDD8Z/j87fffvyAVX79+/Q8GQDbQeKA9fM+e/Pv18/+vnwzCIkBLAAKQOAY5AIAwCEv4' +
		'/4PddNUm3ji0QJyxW3rgzE0iLfqDGr2oYuu0l54AYvnz5x9Q6d+/QPQfyAQqAin9B3EOyG1A1UDj//36' +
		'zfjr1y8GBoAAFI9BDgAwCMIw+P8Ho3GDO6XQ0l4MN8b2kUwYaLszqgKM/KHcDXwBxAJUD3TJ779A8h9Q' +
		'5D8SAHoARP36+Rfo41+/mcA2AAQQy49ff0Cu//MPpAeI/0FdA1QNYYNVA/3wmwEYVgwMAAHE8uPHH5Bq' +
		'oD1//gJJLADoJKDS378Z//wFhhJAALF8A3rizz8uTmYg788fJkj4QOKREQyYxSWBhjEC/fcXZANAALF8' +
		'+/anbcHlHz9+ffvx58uPX9KckkCn/gby/wLd8uvHjx96k+cD1UGiGQgAAgwA7q17ZpsMdUQAAAAASUVO' +
		'RK5CYII=',
	'Español': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFnSURBVHjaYvzPgAD/UNlYEUAAmuTYAAAQhAEYqF/z' +
		'Fbe50RZ1cMmS9TLi0pJLRjZohAMTGFUN9HdnHgEE1sDw//+Tp0ClINW/f0NIKPoFJH/9//ULyGaUlQXa' +
		'ABBALAx/Gf4zAt31F4i+ffj3/cN/XrFfzOx//v///f//LzACM/79ZmD8/e8TA0AAMYHdDVT958vXP38n' +
		'MDB0s3x94/Tj5y+YahhiAKLfQKUAAcQEdtJfoDHMF2L+vPzDmFXLelf551tGFOOhev4A/QgQQExgHwAd' +
		'8IdFT/Wz6j+GhlpmXSOW/2z///8Eq/sJ18Dw/zdQA0AAMQExxJjjdy9x2/76EfLz4MXdP/i+wsyGkkA3' +
		'Aw3984cBIIAYfzIwMKel/bt3jwEaLNAwgZIQxp/fDH/+MqqovL14ESCAWICeZvr9h0FSEhSgwBgAygFD' +
		'EMT+wwAhgQgc4kAEVAwQQIxfUSMSTxxDAECAAQAJWke8v4u1tAAAAABJRU5ErkJggg==',
	'Norwegian': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGSSURBVHjaYnzIAAVy//9zRV36skTnATPzPwaGf2BB' +
		'COMPEgkQQCxAUcHaaiD5////ngQpRkZG4aLC/3//MPz58x+Efv//DSL/Acnfv+9u2AQQQCxgg/7/e/IU' +
		'SL18/weo7c+DB0AVDL+BioCqgejXv1+//v/6zSwrC7QBIIDAGv4CVf0F0f9ADvn/5xfI1F8gpSDVQD2/' +
		'QCTT799AVwEEEIvM379AZ0Cc9Aeo8/9/gbUb/mMDQGUanz4BBBAjc/D5/mTpF+9///0HdvO/f0BtQA6I' +
		'/AMk//3+CxIHikgJss7OOQ0QQIx///6FGP+f4X/JgmfdcZL/cQAmJqb3798DBBDLPWZmkdysP/fuC2zY' +
		'9BvspLd21v9+gXzMAPLub6g3fv9hUVa6evocQACxAL35HxxkQKUgZ/3//+8nRMUvkCBIJ4jxD+iQP8DA' +
		'ZgAIILCGP3+YJEEuEeUDBRqzjCzTX1DAM4CDn/nPH5Dqv3//gR0PEECMV2FRqPD+vaDeibcXzK4JC/+B' +
		'xTEkghlgJBAABBgA9J5akqVspaUAAAAASUVORK5CYII=',
	'Dansk': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGBSURBVHjaYvzIwPCPAQqADIG/f/+9evVBUvIfmIuM' +
		'/oDVAAQQC5DFUV0NVv4PiBgZGZl4eblLiv99/fb/z5//v38zgEkg+9/v3y83bQIIIBawtv//njxl+Pv3' +
		'PxABwd+/f+8//PflM0jdr9//f//6/+sXUDWTrCzQdIAALM1BDgBADAFA/f+PSahm9+YwuAc4X3ev7cSi' +
		'Hz0ts0EjEVgBOBpzGwAAEAQS99/WDkgU7e95IWi+NuQ7VE03KHz7KiRykwKvAGIE2g90938wgBj//x/Q' +
		'Rob/GICRienjhw8AAcTCAJdjAEOwvv/YACPIqH8AAcTyipmZNyvr7/37IFf9+sW1a9f/jx+/+Pr9+/wJ' +
		'4h6IB4CyLEpKT86dAwggsA2QgAO6FUhCLPv1k+HnT6ggUMMfYOD+BXoV6AeAAAJ5+v/vP0ySkmBj/oIC' +
		'mZkZGIIMX74wQoL/zx+mv2DVf0GyAAHE+BQchZCIBCKxt2//PHr0xtAQLghJB5BoZmJgAAgwAAauWfWi' +
		'VmegAAAAAElFTkSuQmCC',
	'Suomi': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF7SURBVHjaYnz6+jMDFDBJu5xg+PWPgYfp6jIDLg6G' +
		'P/8YGP5BwR8w+eHTF4AAYmFiYJAQ4QEq////f2uZxr////7+ZdBQEgByIYLI4NqdXwABxPIPbDhE+tmb' +
		'n0BT//799x8bYGRk/PXnH0AAsfwDqvgHNez3XyD7358//4Ek0ARk1Qz//zGANQAEECOD8cH2EpWnb34B' +
		'Df71+/+fv0BtQHf9+/XnP1Dnb5Ag0Ih/v/7+kxFhX9WwGyAABXRsAwAIw0CQgv3nDbwV+DSuzpLlvSr2' +
		'Dk5XN5lUYFOXDqPh3TmhvgBiYfj3B2QlyFCwarAiIADqB9r57y8Q/gNjkAJgqAEEEOPt++/lZHj/gR0d' +
		'13EXaCoQra1X+Yfqc6AngZ4+fv4BQACxMLH8Y2YEcoACDBDVQARWgYZAAOg1gAACOukfPMjFBVnBHgAZ' +
		'xoACGOF6AAKIBejoOw/eQCJyVvFRBoZfwCiPtPzPwwWM6X9A/Ace2/8YPn35AhBgAOvHaZyBALjqAAAA' +
		'AElFTkSuQmCC',
	'Nederlands': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFXSURBVHjaYvzPgAD/UNlYEUAAkuTgCAAIBgJggq5V' +
		'oAs1qM0vdzmMz362vezjokxPGimkEQ5WoAQEKuK71zwCCKyB4c//J8+BShn+/vv/+w/D399AEox+//8F' +
		'JH/9/wUU+cUoKw20ASCAWBhEDf/LyDOw84BU//kDtgGI/oARmAHRDJQSFwVqAAggxo8fP/Ly8oKc9P8/' +
		'AxjiAoyMjA8ePAAIIJZ///5BVIM0MOBWDpRlZPzz5w9AALH8gyvCbz7QBrCJAAHEyKDYX15r/+j1199/' +
		'/v35++/Xn7+///77DST/wMl/f4Dk378K4jx7O2cABBALw7NP77/+ev3xB0gOpOHfr99AdX9/gTVASKCG' +
		'P//+8XCyMjC8AwggFoZfIHWSwpwQk4CW/AYjsKlA8u+ff////v33998/YPgBnQQQQIzAaGNg+AVGf5AY' +
		'f5BE/oCjGEIyAQQYAGvKZ4C6+xXRAAAAAElFTkSuQmCC',
	'Português': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG8SURBVHjaYmSIZGD4wgAF/xgYWBj+boQysSKAAGJh' +
		'+MRQnVoNUgEE///9ZfzLoPiX4e8fxj9/mP/8Yfr9+/+fP/9h5JdNmwACiIWBCaj4/5P3T7mY/xoJ/9UR' +
		'/v0n8O+f17/Zlv/+//73/1+////+9f/XL6BqRllZoA0AAcQCNvv/339/C03+8v/8w7bk7+/vv/+7/P4S' +
		'95ur+xdY9W+IBobfv4EaAAKICeiuv////vnz58PX3xxb/7BlN3/K7Ph1WoSR/fcfhl//f4KN/wW1BGg6' +
		'QAAxMfxi+PP37++/v1kYfn//+usnE+cHCbWfTKz/mH7+ZgUpQmj48wdoA0AAsQA1/P0HZP458/qXqvNf' +
		'jdnVItxy3wNvApUIvwPb8BvqJEawkwACiIXhDwPQ+F9/f+2890dY6/cnrycCb++z3frNfOwX01eEagZg' +
		'KAHdzcAAEEAgG4DGA/W8+fO79+Rvdt5f2+b++sP+m+kdWDVEwx+gBmBY/wX6ASCAWBi+Mfz+80eSX/L3' +
		'n99AzwBDm0H2NwtQHS/QapDBIPT3LwQBnQQQQIwMxgwM7xgYfjAArQKRTAyvP2OPYwgACDAAjtdGduN8' +
		'tIgAAAAASUVORK5CYII=',
	'Russian': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE2SURBVHjaYvz69T8DAvz79w9CQVj/0MCffwwAAcQC' +
		'lObiAin6/x+okxHMgPCAbOb//5n+I4EXL74ABBALxGSwagTjPzbAyMgItAQggBg9Pf9nZPx//x7kjL9/' +
		'///9C2QAyf9//qCQQCQkxFhY+BEggFi2b/+nq8v46BEDSPQ3w+8//3//BqFfv9BJeXmQEwACCOSkP38Y' +
		'gHy4Bog0RN0vIOMXVOTPH6Cv/gEEEEgDxFKgHEgDXCmGDUAE1AAQQCybGZg1f/d8//XsH0jTn3+///z7' +
		'9RtE/v4NZfz68xfI/vOX+4/0ZoZFAAHE4gYMvD+3/v2+h91wCANo9Z+/jH9VxBkYAAKIBRg9TL//MEhK' +
		'AuWAogxgZzGC2CCfgUggAoYdGAEVAwQQ41egu5AQAyoXTQoIAAIMAD+JZR7YOGEWAAAAAElFTkSuQmCC',
	'Chinese': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFqSURBVHjaYrzOwPAPjJgYQEDAleHVbhADIvgHLPgH' +
		'iQ0QQCxAlkR9NW8sw+cV/1gV/7Gb/hV4+vfzhj8Mv/78//Pn/+/f/8AkhH1t0yaAAAJp4I37zyz2lDfu' +
		'79uqv/++/WYz+cuq/vvLxt8gdb+A5K9/v34B2SyyskBLAAII5JAva/7/+/z367a/f3/8ZuT9+//Pr78v' +
		'QUrB6n4CSSj6/RuoASCAWEDO/fD3ddEfhv9/OE3/sKj8/n7k9/fDQNUIs/+DVf8HawAIIJCT/v38C3Hr' +
		'95N/GDh/f94AVvT7N8RUBpjxQAVADQABBNLw/y/Ifwy/f/399ufTOpDBEPf8g5sN0QBEDAwAAQTWABEC' +
		'hgOSA9BVA00E2wAQQCANQBbEif/AzoCqgLkbbBYwWP/+//sXqBYggFhAkfL7D7OkJFCOCSj65zfUeFjw' +
		'g8z++/ffX5AGoGKAAGI8jhSRyIw/SJH9D4aAYQoQYAA6rnMw1jU2vQAAAABJRU5ErkJggg==',
	'Türkçe': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF+SURBVHjaYvzPgAD/UNlYEUAAmuTYBgAYhIEgJJmb' +
		'oZgtHbaJKNK8TvozM8LIllwagEY4sIFV1UD/3swngMAaGBn/P3kCVApS7ebG8O/f/x07/n/6BFL36/f/' +
		'37/+//oFZDPKygJtAAggkIb/YINBqqOjGUxNQeqUlf93dIDV/QLpAWtg+P0bqAEggJhA7gaqBtqoqMjg' +
		'5PR/+vT/SUn/N2z4//Xr/+XL//Pwgu2BWgJUCxBATCAn/fgJEnVx/Q+05NgxkNzp0/9XrPgvJPR/zZr/' +
		'ZmZQDX/+AE0HCCCQhv9//4D89OQxMMT+a2uDnKGm9v/SJZCrHj36v28fRAPESQABxALEjGBLGRYv/s/H' +
		'97+oCOQYIIiM/P/ly/9Fi6CO+QMy9A8DA0AAgTQwg4MMaMD/rq7/vr7/WVlBrv/8GeROiAf+ADWAQgXo' +
		'HIAAAmlg+v+fQVISbMxfhpMngToZhYUZ+PkZwAaDEDgMgQioGCCAGL+iRiSeOIYAgAADAO/XO1xGA79v' +
		'AAAAAElFTkSuQmCC',
	'Serbian': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFn' +
		'ZVJlYWR5ccllPAAAAUlJREFUeNp0UE1Lw0AQnW02AcVcRPyoWqnYnHvy6FVRf4GIR/+BHoI3wb9RRKFX' +
		'ERSP1aMgCIWCVARRlKKhlTQimp1xNpuEgvjYHWZm572ZHfEMgMlRmTMYwp+8eAQY294AIj5IpAiUdgCT' +
		'ENNkmnmtn8iYRZA+mw/M7qAcXysqpLfLDzfq6j6kYbQdb5at1B0J4yRrjQy7O/MA1GncmExaPeBLr+Qv' +
		'zi1df3eBVLAM7dUaq5b93dHai9blUYGn1d+pzri3xZLkgBQCKnbkxGTl/BTi+KfVAjLroIwDkFyZNORq' +
		'TXhvXEXHdW7tFKcAykY4JWQQURTlQXNlvXKwzwJ3/l714owy6L0gOo7T6/VEv98XQhjCV/v+6fAIFU5v' +
		'bQ55C6bUVLO1LCsMQ8Ek27ZhAHobiHlo/EKhwFYTgiDABOYtn+E//AowAFh4/jzczTSYAAAAAElFTkSu' +
		'QmCC',
	'Eesti': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAE/SURBVHjaYmRw3s8AB/8YGH79Y/gDRr/+gNhA9OMP' +
		'mP2H4cc/ht9/AAJQKMcEAIAwDMB2YAV5U4ArNOCqa8v25MrqdnJPVsim3JlS0cU2MAoy6JvvCyAWiNFP' +
		'3gPFQaqB1N+/IBIo/fsPiPz1598vIPf3P1lhdgaGPwABxAJ0xj+QkUCDQaYCVf8CGQlSDVIHJP+A9Pz+' +
		'B9QMdPEfgABiYdjv+Ne07M+jR3+A4DcIQsCvX2ACRoGE5OUZGA4CBBDISX/+/AVy4Rqg0sjKwTRQHqgY' +
		'IIBAGv7+BSn+9fsXzHyQAmSz4UYAFQMEEOPTp0/FxcX///8P5PzHDUBKGRkvXLgAEEAs/4BeBislqAEc' +
		'9P8AAgikAa4aHoFAwxhQAJD7H6IBIIBAGh48eACyBwyBnvkHBhAGxKP/YADIBggwANQufux425lWAAAA' +
		'AElFTkSuQmCC',
	'Hrvatski': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGeSURBVHjaYvzPgAD/UNlYEUAAsYAkq6uBxP9//xiB' +
		'FBPT/3////398//vP6bfv5h+//7/589/GPll5UqAAAJrYPj//8lThr9/gQgoWhra80f+/587//8o/Jtc' +
		'kfj/96//v34BxRllZYE2AAQQE9js/3DVv//+7VqU3cvxccLclMkcH37//glS/QuqB6gBIICAyv7+AwMg' +
		'4++fv9+/f/994cIvR8efZ878MDP79OnTt2/fvn79+uXLFyD5/PlzgACCagApBgOg9C8HB4jq7ydOfPj4' +
		'EaL68+fPQB1Pnz4FCCCQBojq33+ADvoNlAapNjUFqv6mpfX+/XuIaqBVQMbjx48BAoiRIfxwe7zS0w8/' +
		'f//9/+fvv99//31+fGPZ+jqgi3286tkkNYAif/79+/P3v6wg+4qsAwABxMLw6w+Q/xukFKqBWUw1KmUZ' +
		'kMEK5v7+8+/Pf6AUMJyBcfYPIICAGoAG/BfhYQWqBnoHGBBAEiQNYoPIv2DV/4AkWANAADEyuO5k+POP' +
		'4ccfoFVAzSDyB4wBRH/A7L/wiGYACDAAOJ12JTMlJgUAAAAASUVORK5CYII=',
	'Português (Brasil)': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHjSURBVHjaYmRIZkCAfwwMf2DkLzCCMyDoBwNAALEA' +
		'lTVGN/5nYPj//x8Q/P3/9++/vzZa31gY/mw5z/Tn3x8g98+f37///fn99/eq2lUAAQTS8J/h/7NPz/9C' +
		'5P79WRj89f9/zv//fztLvPVezPzrz+8/f3//+vtLhl8GaANAAIE1/P8PVA1U6qn7NVTqb1XVpAv/JH7/' +
		'+a/848XmtpBlj39PO8gM1PP7z2+gqwACiAnoYpC9TF9nB34NVf5z4XpoZJbEjJKfWaEfL7KLlbaURKj8' +
		'Opj08RfIVb+BNgAEEBPQW1L8P+b6/mb6//s/w+/+nc4F0/9P2cj65xdHc+p/QR39//9/AdHJ9A/60l8Y' +
		'vjIABBAT0JYH75jStv75zwCSMBY8BXTMxXv/21ezfHj9X5/3BESDy5JfBy7/ZuBnAAggkA1//vx594kp' +
		'aCnLloe/smLaVT9/ff3y/+/P/w+u/+JuW7fhwS/tSayPXrOycrEyfGQACCAWoA1//oOCDIgm72fu4vy6' +
		'b4LD/9/S/3///s9+S28yy+9/LEAf//kLChVgCAEEEEjD7z9/JHgkQeHwD8gUjV79O9r6CzPLv6lr1OUF' +
		'wWH9Fxjcv//9BcYoA0AAMTI4ImIROUYRMf2XARkABBgA8kMvQf3q+24AAAAASUVORK5CYII=',
	'Español (Latinoamericano)': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGMSURBVHjaYow8/v/LHwYI+Mfw7xcQ/2EACvz68+/P' +
		'v38//gBFQAjE+POPjYkBIIBYPv1hSFWEqP7//z/jv/9ABsO/f////mf8+4/5LwPT33//wVwQyj32BSCA' +
		'WH78Yfj9j+H97/8gpf8ZQBJAS/7///MPjEBcKFuYnZHh1z+AAGKpl32jKSYM1PMfaMt/kDYgBBoJAmA+' +
		'hAkkWRkZRLXfAAQQizrvP2E2BrBisFog/X3v3y+bgYYycXv+53D7DwOMjAxmwgwAAcQE8S5UDEL/2PPv' +
		'3/3/f+/9/7b9PzIA+e0fQACxIKtmgOhgs2P48QYYTv85nJHVMwId9u8fQACxXPv4T4v3/6+/IB0w57r+' +
		'53L5B5L+/+8rVPW/fwxsLP+PvvkLEEAsWbeFSpkZXn4HhgMDPED+wkPpHzSUgEEnwcnQeUQQIIBYmP79' +
		'Y2RgEmWHBuhfYMiCdDICGX9A4Qt0NwM4TkB+APoCIIAYjbd+ffcLGpE/QAio+h9ILSjOwegPGAHjExj/' +
		'bAwAAQYA9gFw522GQWAAAAAASUVORK5CYII=',
	'Lietuviu': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGOSURBVHjaYvx9lYHhDwMc/PvD8A9EgRCEDSShbCBi' +
		'YgAIIBagaiapZqCa////Mvz/x8zwl/n/P4b/f/7DEVDh/99ABsO/358urwQIIBYWJgYGRqCCZ4wgDSAV' +
		'DP//QqSB6sDo1/9/v4GIkVUaaC5AALFc+sIg9evP719AM/5CjPz37zfYYJCif/9//YMw/v1iZf91/hUD' +
		'QACx6O9hKHP9/ujLlz9///z59+f3v98g9Pf3LxD569ffXyA2mJTn4z+4gAEggFgYfjD8+fcXyAeqBmkA' +
		'KQVJA7X9AmlAaAOayPCFASCAWIDO+vv/z5//f4DqgEJgG34BjYdoA5EQ9v/fQARUDBBALGtbGXT///7+' +
		'EKgGpAto1r8/EGVglRDyL1DxH075P5suMgAEEIsZAwP/mz9/X4KMAEr///XrP8gCMAMu8uf3/z9/WTj/' +
		'ejAwAAQQyy+gk4BmS0oCpRn+/AXJARkg9h8gyQgkge79+5fx798/f//+YGAACCDG2+CI/gcj/6FyGZDE' +
		'gQgYZwABBgAlIndD8dLdmQAAAABJRU5ErkJggg==',
	
	// Other languages (in alphabetical order)
	'Català': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFn' +
		'ZVJlYWR5ccllPAAAATBJREFUeNpUkU1LA0EMhpNViqWtVYrFj4OnulCoFNSbF3+Gtn9UvBSxoHgR9eRB' +
		'D1Xbgyu0Ckt3MhMzMzvtGsLLSxieTBKkhxMIwczGmKJqrcUsVGJVqtQ5de8NsGbQwMTWKGaFTABqhb1X' +
		'6uYVJ/295v5Z3kJIWgFZZXKpJDOmTAyUK/O7F0zvu3TYguW3BK883mUmaqxmCLXZYITj3m5j7QgKgTTP' +
		'2Rac5U2kQ6U6e3zD39tO6aAB/4PNEs/G4qUC0fr7cIKfFzubpXbxdUSp6xDYwWOt/vM0wumwzd1mYbMW' +
		'bMIAxjexY6gI6slVgh/n21vlOAzsYY7qNpNXSIHRXN1In8f4fR1Hx3FgEwek+72si4Rt78PaACWXU/wa' +
		'tPyN/SH9dRfqT+69GHn5J8AAeJhkjAZrdt8AAAAASUVORK5CYII=',
	'Español (Mexico)': 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29m' +
		'dHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHQSURBVHjaYmSI52ZgYmGAgD9/XvbdY2Jg+vfvH5AH' +
		'JP/8+PFKUREkA+SCEUAAAZUyNUZ3MjAw/vv399ff30KCwkyMTAwM/4EAqO7/79+sOQUM//7/+/sHyL41' +
		'bxZAAIHN/s/w7NOrv//+fv/9C6SO8T8C/Pv/694DEPX7N7OUJNAGgABiAdkM1A+0HWjIvz//wWbfu3IA' +
		'6B5ZDWtmoNrfv8CO+8P05zfQYQABxMTw78/f/0CFf//8/fsbaO///49vnnhz/8Lqia13zu8EOuv/r1//' +
		'fv/+9+v3v99/gDYABBALw69fIOP//gGqBuoBamATEPvCxMclpy0grf4faP2fP2AH/AEygDYABBATA5Dx' +
		'D2Q2EAGNAmrYd/boUw4hQQP9XacO/gM6CWzD/z8gBPQvQAABNTAAnQ6x4RfQ0wz/nUyd/315C7TN2coD' +
		'qP/vr9//wU76D1TEwAAQQEAnMQCdD7bh9y+gH/79FxIQjfSMhQbSr1//QUHHAAyX/3//ATUABBBIw+9/' +
		'f8R5hIEavv3+ycjICLQXQoIYTEyscrKgkAcG5Z/fQE8DBBAjgy04Gn+Ao/EDw8VtF9mY2IDe+wcGv758' +
		'eWZrywRWAvYAA0CAAQD6o1TwTGkEKQAAAABJRU5ErkJggg==',
};

var regionalLanguagesMap = {
	'Português, Brasil': 'Português (Brasil)',
	'Español, Latinoamericano': 'Español (Latinoamericano)',	
	'Español, Mexico': 'Español (Mexico)',

	// Italiano
	'Portoghese, Brasile': 'Portoghese (Brasile)',
	'Spagnolo, America latina': 'Spagnolo (America latina)',
	'Spagnolo, Messico': 'Spagnolo (Messico)',
};

var translationMap = {
	// Italiano
	'Svedese': 'Svenska',
	'Inglese': 'English',
	'Tedesco': 'Deutsch',
	//'Italiano': 'Italiano',
	'Francese': 'Français',
	'Spagnolo': 'Español',
	'Norvegese': 'Norwegian',
	'Danese': 'Dansk',
	'Finlandese': 'Suomi',
	'Olandese': 'Nederlands',
	'Portoghese': 'Português',
	'Russo': 'Russian',
	'Cinese': 'Chinese',
	'Turco': 'Türkçe',
	//'Serbian': 'Serbian',
	//'Magyar': 'Magyar',
	'Estone': 'Eesti',
	//'Hrvatski': 'Hrvatski',
	'Portoghese (Brasile)': 'Português (Brasil)',
	'Spagnolo (America latina)': 'Español (Latinoamericano)',
	'Lietuvių': 'Lietuviu',
	'Spagnolo, Messico': 'Español (Mexico)',
};

function xpathNode(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

var div1 = xpathNode("/html/body/table[3]/tbody/tr/td[1]/div[2]");
var text1 = div1.firstChild;
var target1 = div1.firstChild.nextSibling;

var res = text1.data.match(/^.*(messaggi in|:)\s+(.*)\./m);
if (res) {
	var langString = res[2];
	var data1 = text1.data.replace(langString +".", "");
	text1.data = data1;
	
	for (var lang in regionalLanguagesMap) {
		langString = langString.replace(lang, regionalLanguagesMap[lang]);
	}
	
	langArray = langString.split(", ");
	
	for (var i = 0; i < langArray.length; i++) {
		var s = langArray[i];
		var src1;
		
		if (translationMap[s]) {
			src1 = flagsByCountry[translationMap[s]];
		}
		else {
			src1 = flagsByCountry[s];
		}
		
		if (i > 0) {
			div1.insertBefore(document.createTextNode(', '), target1);
		}
		
		if (src1) {
			var img1 = document.createElement('img');
			img1.src = src1;
			img1.title = s;
			img1.alt = s;
			
			div1.insertBefore(img1, target1);
	
			if (!FLAGS_ONLY) {
				div1.insertBefore(document.createTextNode(' '+ s), target1);
			}
		}
		else {
			div1.insertBefore(document.createTextNode(s), target1);
		}
	}
	
	div1.insertBefore(document.createTextNode("."), target1);
}
else {
	GM_log("No match: text="+ text1 +", text.data="+ text1.data);
}
//EOF