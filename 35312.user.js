// ==UserScript==
// @name forum.inosmi.ru - Personal bookmark panel and Filtering
// @namespace http://inosmi.ru/
// @description - Hold links on last 10 posted messages in pop-up window
// @description - Auto track this treads
// @description (fixes forum problem - keep page offset for posted mess in topic)
// @description (also - you freely can bookmark any forum page)
// @include	http://forum.inosmi.ru/*
// @include	http://inosmi.ru/*
// @include	http://www.inosmi.ru/*
// ==/UserScript==

// Author: greenapelsin
// License: GPL == You can freely change/modify this script, untill it working :)
// Version 0.26
// объединение с фильтром сообщений - в разработке


// --- BEGIN EXECUTION ---

if (document.location.toString().match('inosmi.ru')) {  // для 'оптимизации' оперы 

const ino_debug =true;
var isFF = /firefox/.test(navigator.userAgent.toLowerCase());
var isOpera = /opera/.test(navigator.userAgent.toLowerCase());

var log;
if (ino_debug) {
		if (isOpera) {  log = function(msg) {  opera.postError("inosmi : " + msg);  } } 
			else { log = function(msg) { GM_log("inosmi : " + msg); } }
	} 
else { log = function(msg) { } }

var logError;
if (isOpera) { logError = function(msg) { opera.postError("inosmi ERROR: " + msg);  } } 
	else { logError = function(msg) { GM_log("inosmi ERROR: " + msg); }	}

log('INOSMI - Start at ' +document.location.toString() );

// ч.0 - Общие ресурсы и переменные
const inosmiLogo = 'data:image/gif;base64,' +
		'R0lGODlhHAAbANUAAP+sdP+jZv+vef/8+v+QRv/Hov/07P90F/+KPP9pBf93HP+YU//Fnv/69v/Cmf95' +
		'IP+ma/+5i//x6P/u4/+bWP/s3/+2hv+gYf+SSv+eXf98Jf/m1f+VT/+xff+/lP+pb//p2v9uDv+0gv/g' +
		'zP+FM//38f9xE/+8kP/Yvv+IOP/NrP9/Kv/j0f/Kp/9rCf////9mAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAcABsAAAb/QJhwSCwaja+jcjlMMp9F' +
		'p9KFCVgxCaa0qGk1XmBwiaFQboeCwWsjCqQClsqrATieYYzXZGEyXiQvEUhFHS8jBx8vFEYPGy8QUUQa' +
		'AxMHMBwVCEcPBg1lTUQFLwtCByQHBxkAJEQBLw5EUiEDIEMALyoGYQJDCRIGWUJSHC8WtmAsAg5qmkIe' +
		'L80wUgKKxyhDIi8nQxAvGaBCES8Ex7xCGC8FQxQvdcJo1UK37jAE6dze4JfFx/T26s6g6ZtVS167If+E' +
		'+AKmD4YoUjDmIbwHwxWshpMmlCHggJyQFQ4uwODkKRYhQ5aUNHoUqUiePUf+BBpkJM2LChYCLAgQQU6D' +
		'Hg92VDIoEQaMATJmmCRAYCVAtKRQokqTGvUOVSRBAAA7';
const buttPlus = 'data:image/gif;base64,' +
		'R0lGODlhKAAoAOf/AAAJTgoNYA0QPwARbQgOeBESWQcZXAAXiA8YYBMZUBcaSwsZggUcfwsXoBYeSRga' +
		'cAYfehIebhIalh0dZQodnyIfRyAeXBogYxEfihgiXxIfkhYkWiEhWQAhvCUfaxgeqhoqPhwlbx0esxkr' +
		'RB8nXigkZAwlrRcqYCImahcoeBMnjykmWiInZRUqbx4jnhsrWiAofhsqhhIvbx0vUhgkzyYsXR4nqRwu' +
		'aiYsZCIxXx4vgCItryoviCAvqjUvcDMxZSYsxiU0eiQylx00njA0bS8zfh83hiY0kiE4eis2dCI0pjU3' +
		'XS45bCc7cS43jDY6WTU6aCc4uDA4vzI6rTA/gjo7lTNCaDI/kTo+hTNAizA/pSVCvjlDfC5HhC1IfjlD' +
		'nDdDoy9Es0REeD1HeDVIjzNIm0hHij1Gu0NMdUNLlklPcEFJyUFOoTtPrkZPkEpQgEZSekdNqUBRmD5T' +
		'i0RShj9QqUdRi0VOslBOkk1Rh0pPvEpUokpSxUJWw1VVpk5bhE1deVtTulhbklFcnkxct01eqU9gkFRc' +
		'rE5cvlBinVZftVlhnVpilllliVxlqFlpkmBnq2NlxFdoymNntWpou2dsnltvqmVqxF9tuFpuw19xo2lu' +
		's3BwkXJttWN0nWxwrnB0gmR2lmpxwnVypnBw0Gdz02l2snN3kWR2znV5n2x5xmh9snJ5vmp+pXR6uXh6' +
		'ynR/uXp/snuCln6B3n6ExHiF0IGD1YOFzYWGwXqJx32Kw4mJq4aLtH+OtImPoY2Mu4WN2oqOwoWO44SX' +
		'tpSUtpGS25GWwYyV2pCYuJWZtIic1Y2dxZCcz5Cgso+hwJKhupueyJ2lrZyf9aih7amlw5uo5Kiov6Kp' +
		'1pauzJ6q3p+r06Wrx6urzqatz6iq/7Cr462s6rGxyKuzyK6y5bC01Kq206213aK6z7a7wai69rq827TA' +
		'zrbA8rvC67PK4cTL0b/L6MXK7cHK/MrK4tLO7cjV1svR+9HV5c3Y+dfa8dzg/+Dg+Nbk/9/q/+Ds+v//' +
		'/yH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAP8ALAAAAAAoACgAAAj+AP8JHEiwoMGDCBMi9OcOW6g/' +
		'VmbMsPLH0zV7CjMSzIcMTo4bWLDgGTTIDRUuOHC8gaZPI0J9xqBscMMKk61Zs2wBu8XzEy1BNeB06+eS' +
		'ID5GGcioEiVK2KVLlChN2rTpkytarhZxOVEJY9FlCpAcevVqUhYPE0pYsMCBhFsSeWDlciWnSItxLp01' +
		'IZPJqZMCGaBw8kVu3jx1yU6pcSCAyyZVir4UqZbRGRMqqCSBeYBAELd8C8s1UlDg0CxED4pkSxhvA99S' +
		'QgZkMUZUozYuE+KQigQjCb6D+hgFUSTpCAQ57ApG8wVKlq91BeMlCvElUpwilWoTNFaATSktAwr+pSsY' +
		'rsYKBSscqAFNsJ0gBHEkGUmwrGA/LiniIJI9viAvA5sUU4wZJHBjED1NQIAIGyiMURAz8IHBQwTM8GNQ' +
		'MBMI4400fhhwzUHQRBADIWkAsNpAbqRwhxABLGKhQdm0AIwwtuxRQnIHOTJAHXUEMMhA9qRwhBYMhPDh' +
		'Qb04sEo1x7iRQDcIpRPDEWDAkII8AinDgBJTMOBGPAhpM8MquuRixwvwINSPHANoMcQAxwikiQRAiLCA' +
		'JgOhE000zTBTjSEbDHJMLVxs4Ak2zjjzTDP1DBQKBD30sIAlAhnSAA0iYNCLQNQ8MQMII5xwwwskOAKM' +
		'KmUYIMOqLcjwAiD+jf7jSww7mHBAIgJ10UAHDcRQjkCp/BBLL72sskojj5iiiiRaCOFmGGfo8cUF9f0j' +
		'Dg822DqHQFQ0IIIEOrgjUCU+gHPNNcoos0wvrKCiR6RRRLGGFGvoEYAxAsEjBAUULOCFQFlI8AEGQYj7' +
		'zydFTMMMM2XmUoskfOzQgAk77BDvGWAAAI1A7exLAQP//lOGBDaoIMM5AuFSRCejVMLIImm0cYbEDUig' +
		'gQpCCAFGEQkkI1A2KrjgAgN0CHSIBDuo0MIwAo0jxgoVRM0CBBpsEYUNGgzQwglcn/CCGu8IlAsGPSgB' +
		'gSECYaJBDypE0MpA9FATTjjcjKPIEGecoUT+DDK0cs7f5Wxzz0CQENDDEBF4IhA4BEyxdxcvGqSMEW20' +
		'8QUSORhskD1XYDBFDAggI5A9PAyhhBAhnGjQMkkUskcZVMyA8kHKwDCEFjqQkKZAm6hwRhgP4HrQMk1g' +
		'QkgcV2Twq0H+zAEBGHGEAAdB46jYxxEtaHPQMEyoUop1FxxZkC8ZfLFgzwTpYwcMiCCSgu4GPcPEIZEE' +
		'UkUJ5hiEDghIHJ8CFAbRxgXqgAhCIIAO6iiIONTAAg88YAJQmEdBtvGEGhSCEE5AAC8OookstEEShAhB' +
		'HhJIkHckgxe/IAY6CvINLERAEZdoQwoW0RKD4IMLZSAEKvaAAiJszCXixrCAByIRCTZkAQVYQog56JAE' +
		'SLBiE0nIwByy8ZuD5MMZcHgBF0zBikHUYAk/TAg5xiCGRcjFEUhoQRMA4QtxlKMc3eiFIZjABC4kokyJ' +
		'YMISrOESc0DhDYwwBSxgYQk7MCEHNahBSm6QhEEswhW5+AQXblADahTlH/1IRQ3GYKxB0mITkKBKKFnB' +
		'ClrQYhE4IIEpvHLJf5BjMTlgBCxYYQtbkIUnpbRDAhTwhmXUsJUDiUcqlqAAH2AhDXhwgxmSQAQBQCEV' +
		'29gHMBGCD3PwghF0eMMb0NCIXYRDgtMMZysDAgA7';
const inosmiBan = 'data:image/png;base64,' +
		'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' +
		'/M8AHKFdi6GBx9sAAAAASUVORK5CYII=';
		
var inosmiGood = 'data:image/png;base64,' +
		'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' +
		'cLk9MBsAAAAASUVORK5CYII=';

var inosmiBad = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lD' +
		'Q1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQ' +
		'SoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfA' +
		'CAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH' +
		'/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBb' +
		'lCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7' +
		'AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKB' +
		'NA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl' +
		'7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7i' +
		'JIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k' +
		'4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAA' +
		'XkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv' +
		'1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRR' +
		'IkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQ' +
		'crQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXA' +
		'CTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPE' +
		'NyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJA' +
		'caT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgX' +
		'aPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZ' +
		'D5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2ep' +
		'O6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2q' +
		'qaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau' +
		'7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6fe' +
		'eb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYP' +
		'jGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFos' +
		'tqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuu' +
		'tm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPj' +
		'thPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofc' +
		'n8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw3' +
		'3jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5' +
		'QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz' +
		'30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7' +
		'F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgq' +
		'TXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+' +
		'xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2' +
		'pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWF' +
		'fevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaq' +
		'l+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7' +
		'vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRS' +
		'j9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtb' +
		'Ylu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh' +
		'0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L15' +
		'8Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89Hc' +
		'R/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfy' +
		'l5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz' +
		'/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAhVJREFUeNrM' +
		'l+FtwkAMhT9ODIDEAEmlDJBOUNiAZgIyAe0EERuUCWCClA1IJyADRCo3AFJG6I/6qDlRNSlJi3/BKXfP' +
		'fj7b7wY0tDyIQmAGPAAxEHqfHIASeAO2ia0OTc4dNACeABkwoZ0VwDKxVfErB/IgGgFriVpbKYdb+Y0w' +
		'EoiTsff9FkgTW9WNHciDKAZ2wEiWamAFbH6iVlI1Bxbe/mliq/JHB/Igmkvkzl6EyroN/8JgBjyp5TSx' +
		'1eZbByTyvfL62d/Q1i4EdK+ZGHgevyva7i9R9ksn/MDuHKNGfbdW4GlX4AByVip/R5oRo0rN3faXa2n/' +
		'xomN3CeAmWCeGMgUPUv6s6VgnDCNlI1rMqu2t70lC66cASZ5EIXGazQb+jeNMTPS2wHKpv37ShYOqoM+' +
		'DFXrPOvZx8+yjDvCLcfnqS3k7HiopppV4BPgVZXltVYfg+hx/DWYHFZovCHjbNEhuKv9xSUswz+bdkDn' +
		'e6XqtZMUqPI7wxqKkgllngMwtlVxDKK7Hi+hwzoMJR+hr3hkQ9ET8w6rNKLhAGLpir2aYDhm34xIJmfz' +
		'P7h3GmM7EK92QsvZrO4heq05isRWU6OmlKvXrMfoM9VflqcyFOnsUvEkMqrr6OdKH26dXNd9IFW1vxYZ' +
		'1RV4rFRQrdTRlwOS96nat++CCTljr5am+o7dliy/iYfJTTzNbuJx+lfP848BAMOG839CdvQ+AAAAAElF' +
		'TkSuQmCC';

var inosmiDown = 'data:image/png;base64,' +
		'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' +
		'AAQ2QjpPuyOEAAAAAElFTkSuQmCC';
		
var inosmiUp = 'data:image/png;base64,' +
		'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';



var isFF = /firefox/.test(navigator.userAgent.toLowerCase());
var your_name=readCookie('mvnforum.membername'); // имя на форуме
//alert ('Большой Брат помнит и приветствует тебя ['+your_name+']');


// ч. 1 - Закладки
const inosmiMaxBookMrx=15;  //макс кол-во закладок
var inosmiBookmarks = new Array();
inosmiReadBookmarks(); // загрузить сохранённое ранее
inosmiInsertFloatPanel(); // добавить панели и кнопки на страницу
if  (inosmiBookmarks[0]==1) {inosmiAutoTrack();} // если включено авто слежение
inosmiCheckIfPost(); //проверка, был ли оставлен коммент
	// fix # problem - не реализовано
	//if (document.location.toString().match('#') { // only if '#' present in adress bar
	//	insertTransitionLink(); } // не реализовано, 

// ч 2. Фильрация сообщений
// Separate user name by |,
// if occure | in the end or || in middle, this like add "empty" user name == to collaps all messages
// значения "по умолчанию", свои хранятся отдельно
var InosmiBanned = new Array();
var userRaitings = new Array();
inosmiReadBanned(); // загрузить сохранённое ранее
var inosmi_ignore_users = 'agent|gromowerzec|arunas|Marat|Petrow|Novod|zilgenshuher|'+
			'Masiania|voloh|NovodvorskayaVI|Liberator|Netbork|kvint|ealekhin|j8kb7|SEVA_XIV|SIVANOV|' + 
			'venmik|limit4ik|eedd|svobodofil|Me_Mikey|odessite|Pugovkin_Kosmopolitikys|Dutche|UIUIiIUIU|'+
			'G_Kasparov|SVINTYS|prawednick|soldier|Jaguar|svetilnick';
var spamLinx="republic.com.ua|oboz.freetzi.com|upyachka"; // оранжевый спам
var markShit ="Erlik|CroN|Wadsley|FBM934214|Geoid"; //  ) 
var markGood ="ilya|Radonezh|Autodophe|guard"; // 
var inosmi_mark_users = 'greenapelsin|InoModerator'; // :)  Галантерейщик и кардинал - это сила!
unsafeWindow.manageComments = manageComments;
filter_inosmi_forum();

}
// --- END EXECUTION ---


// ч1. Закладки --------------------------------------------------------
function inosmiCheckIfPost(){ // проверка - был ли только что оставлен коммент,
	// var prevPage = history.previous; // доступ не не разрешён :(, делаем по-другому
	if (!document.location.toString().match('lastpage=yes')) {return;} 
	//если lastpage и последний комментарий свой - будем считать, то это оно
	if (your_name!=null) { // username из кукисов
		var ino_users_div = $x(".//div[@class='memberName']");
		var comms = ino_users_div.snapshotLength;
		// автор последнего коммента
		if (comms>0) { // если есть комменты
			var lastComm = ino_users_div.snapshotItem(comms-1);
			var lastCommAuthor = $xFirst(".//a[1]", lastComm).textContent; 
			//alert ('>'+lastCommAuthor+'--'+your_name+'<');
			if (lastCommAuthor==your_name) { inosmiBookmark(); }
		}
	}
}

function inosmiInsertFloatPanel() { // вставка всех доп элементов на страницу
//add right button panel
addGlobalStyle('div#inosmiRPan { position: fixed; right: 0; top: 10%; display: block; ' +
	'background: transparent; width: 33px; height: 104px;  z-index: 100001;}');
var inosmiRPan = document.createElement("div");
inosmiRPan.setAttribute("id", "inosmiRPan");

//add button for show/hide bookmrk's pannel
addGlobalStyle('img#inosmiButt1 { filter:alpha(opacity=50); -moz-opacity:.50; width: 32px; height: 32px; }');
addGlobalStyle('img#inosmiButt1:hover { filter:alpha(opacity=100); -moz-opacity:1; cursor: pointer; }');
var inosmiButt1 = document.createElement("img");
inosmiButt1.setAttribute("id", "inosmiButt1");
inosmiButt1.src = inosmiLogo;
inosmiButt1.title = 'Панель закладок'
		// !!! :) в Опере клик на изображение не вешается ! делаю через ссылку
		var a1=document.createElement("a");
		a1.appendChild(inosmiButt1);
		a1.addEventListener('click', showHideInosmiPanel, true);
		inosmiRPan.appendChild(a1);

//add button "+" for bookmarking
addGlobalStyle('img#inosmiButt2 { filter:alpha(opacity=50); -moz-opacity:.50; width: 32px; height: 32px; }');
addGlobalStyle('img#inosmiButt2:hover { filter:alpha(opacity=100); -moz-opacity:1; cursor: pointer; }');
var inosmiButt2 = document.createElement("img");
inosmiButt2.setAttribute("id", "inosmiButt2");
inosmiButt2.src =  buttPlus;
inosmiButt2.title = 'Добавить в закладки';

	var a2=document.createElement("a");
	a2.appendChild(inosmiButt2);
	a2.addEventListener('click', inosmiBookmark, true);
	inosmiRPan.appendChild(a2);

document.body.appendChild(inosmiRPan); // добавить панель к документу

//add info panel - пока не показывая
addGlobalStyle('div#inosmiInfopanel {background: LightYellow; filter:alpha(opacity=80); -moz-opacity:.80; ' +
	'position: fixed; right: 35; top: 8%; display: none; width: 500px; height: auto; ' +
	'border: 2px solid gray; padding:3px; z-index: 100001;' +
	'text-align: left; color:DarkSlateGray; font-family: verdana; font-size: 11px;'+
	'-moz-border-radius: 0.7em !important;'+   // закругление,  только для ФФ
	'}');
var inosmiInfopanel = document.createElement("div");
inosmiInfopanel.setAttribute("id", "inosmiInfopanel");
document.body.appendChild(inosmiInfopanel);

inosmiFillInfopanel(); // заполнить закладки
}// end function inosmiInsertFloatPanel()


function inosmiBookmark(){ // save current page in bookmarks
	inosmiReadBookmarks(); // перечитать, на случай если изменилось в другом окне
	var pageName = document.title;
	pageName=pageName.replace('Форум ИноСМИ.Ru - Просмотр темы - ','Ф> ');
	pageName=pageName.replace('ИноСМИ.Ru | ','Т: ');
	var pageAddr = document.location.toString(); 
	pageAddr=pageAddr.replace('#lastpost',''); // удаляем якорь на последний пост
	if (pageAddr.match('lastpage=yes')) { //  если в сылке есть lastpage - заменить на смещение
		var currPage = $xFirst('.//span[@class="pagerCurrent"]');
		if (currPage) {var offset = 'offset=' + parseInt(currPage.textContent-1)*10;}
			else {var offset ='offset=0';}
		pageAddr=pageAddr.replace('lastpage=yes',offset);
		//alert ('offset ' +offset +'  page name== '+pageAddr);
	}
	var isInBookmarks = inosmiSeekTopic(pageAddr, pageName); // проверка, есть ли тема уже в закладках

//	if (inosmiBookmarks.length==1) {}
	if  (isInBookmarks!=0){ // обновить тему
		inosmiRenew(pageAddr, pageName);
	} 
	else { // новая тема - сдвигаем закладки в конец
		var i=inosmiBookmarks.length+1;
		i=(i<inosmiMaxBookMrx*2?i:inosmiMaxBookMrx*2);
		for (; i>1;i--)	{ inosmiBookmarks[i]=inosmiBookmarks[i-2];}
		inosmiBookmarks[1]=pageAddr; inosmiBookmarks[2]=pageName; 
	}
	inosmiStoreBookmarks(); // сохранить
	inosmiFillInfopanel(); // отобразить новые данные
} // end function inosmiBookmark()

function inosmiReadBookmarks(){
	if (isFF) {	// чисто для ФФ можно использовать вместо кукисов, список общий
			inosmiBookmarks = GM_getValue("inosmiMrx",'0').split('##');	
			}
	else {
	// вариант для Оперы и пр.- кукисы, не надёжный, и на форуме и сайте - отдельные списки !!
		var data = readCookie("inosmiMrx");  
		if (data==null) {data = '0';} else {data = unescape(data);}
		inosmiBookmarks = data.split('##');
		}
} // end function inosmiReadBookmarks()

function inosmiStoreBookmarks(){
	if (isFF) {		// для ФФ можно использовать вместо кукисов, список общий
						GM_setValue("inosmiMrx",inosmiBookmarks.join('##')); 
				}
	else 	{
		// вариант для Оперы и пр.- кукисы, но не надёжный, на форуме и сайте - отдельные списки !!
				createCookie("inosmiMrx",escape(inosmiBookmarks.join('##')),30); // хранить 30 дней
				}

} // end function inosmiStoreBookmarks()

function  inosmiRenew(pageAddr, pageName){ // обновить закладку
	var  bookmarkPos = inosmiSeekTopic(pageAddr, pageName); // найти её номер в массиве
	//alert('found '+bookmarkPos);
	if  (bookmarkPos==1) { inosmiBookmarks[1]=pageAddr; inosmiBookmarks[2]=pageName; return; }
	// сдвинуть закладки на 1 позицию вверх с bookmarkPos по первую
	if  (bookmarkPos!=0) {
		var i=bookmarkPos*2;
		for (; i>1;i--)	{ i
		inosmiBookmarks[i]=inosmiBookmarks[i-2]; 
		}
		// новая закладка будет на первой позиции
		inosmiBookmarks[1]=pageAddr; inosmiBookmarks[2]=pageName; 
	}
} // end function inosmiRenew

function  inosmiDeleteBM(BookMarkNom){ // удалить закладку № BookMarkNom
	// сдвигаем с BookMarkNom до конца вниз, массив обрезаем -2
	var all=inosmiBookmarks.length;
	for (var i=BookMarkNom*2-1; i<all-1;i++)	
			{ inosmiBookmarks[i]=inosmiBookmarks[i+2];}
	inosmiBookmarks.length=(all>2?all-2:1); //оставлять первый элемент
	inosmiStoreBookmarks(); // сохранить
	inosmiFillInfopanel(); // отобразить
} // end inosmiDeletBM


function inosmiSeekTopic(adres, title){ // ищет, есть ли уже подобная закладка , возвращает её номер или 0
	for (var i=1, count=1; i<inosmiBookmarks.length;i+=2) {
		if  (inosmiBookmarks[i]==adres) 		// проверка на совпадение полного адреса
			{	//alert("Ссылко "+count); 
				return (count);
			}
		if  (inosmiBookmarks[i+1]==title) { 	// проверка на совпадение по названию темы
			//alert("Имя "+count); 
			return (count);
			}
			count++;
	}
return (0); //не найдено
} // end function inosmiSeekTopic()

function inosmiFillInfopanel(){
	var inosmiInfopanel =$('inosmiInfopanel');
	inosmiInfopanel.innerHTML=' > '+your_name +'<br><br> '; // очистка
	//inosmiInfopanel.innerHTML+='array length = ' + inosmiBookmarks.length + '<br>';
	var count=1;
	if  (inosmiInfopanel) { 
	for (var i=1; i<inosmiBookmarks.length;i+=2)
		{ var BookMX = document.createElement('a');
		BookMX.id='inosmiBookX'+count;
		BookMX.textContent='[x]  ';
		BookMX.setAttribute('style','color: red');
		BookMX.setAttribute('inoBMX',count);
		BookMX.addEventListener('click', function () {inosmiDeleteBM(this.getAttribute('inoBMX'));}, true);
		inosmiInfopanel.appendChild(BookMX);
		
		var BookM = document.createElement('a');
		BookM.id='inosmiBook'+count;
		BookM.href=inosmiBookmarks[i];
		BookM.textContent=inosmiBookmarks[i+1];
		inosmiInfopanel.appendChild(BookM);
		
		var bR = document.createElement('br'); // перевод строки
		inosmiInfopanel.appendChild(bR);
		bR = document.createElement('br'); // ещё == пустая строка
		inosmiInfopanel.appendChild(bR);
		count++;
		} 

		var BookM = document.createElement('a');
		BookM.id='inosmiAutoFresh';
		if (inosmiBookmarks[0]==1) 	{ BookM.textContent='авто слежение включено - ON';}
		else		{ BookM.textContent='авто слежение выключено - OFF';}
		BookM.addEventListener('click', inosmiReversAuto, true);
		inosmiInfopanel.appendChild(BookM);
	}
} // end function inosmiFillInfopanel()

function inosmiAutoTrack(){ //  авто слежение за посещением страниц в закладках
	var pageName = document.title;
	pageName=pageName.replace('Форум ИноСМИ.Ru - Просмотр темы - ','Ф> ');
	pageName=pageName.replace('ИноСМИ.Ru | ','Т: ');
	var pageAddr = document.location.toString();
	var isInBookmarks = inosmiSeekTopic(pageAddr, pageName); // проверка, есть ли тема уже в закладках
	if  (isInBookmarks!=0){ // если уже в закладках - обновить тему
		inosmiRenew(pageAddr, pageName);
		inosmiStoreBookmarks();
	} 
} //end function inosmiAutoTrack

function inosmiReversAuto(){ //поменять режим авто слежения за закладками
	var autoTrack=(inosmiBookmarks[0]==1?0:1); 
	inosmiReadBookmarks(); // получить свежие данные
	inosmiBookmarks[0]=autoTrack;
	inosmiStoreBookmarks();
	inosmiFillInfopanel();
} // end function inosmiReversAuto

function showHideInosmiPanel (){ //toggle infoPanel visibility
	var infPan =$('inosmiInfopanel');
	if (infPan){ if (infPan.style.display =='block') {infPan.style.display ='none';} else{
		inosmiReadBookmarks(); // получить свежие данные
		inosmiFillInfopanel();
		infPan.style.display ='block';} }
}// end function showHideInosmiPanel ()


// ч.2 Фильрация комментов ----------------------------------------------------------
function inosmiCommentGood (userID, userName){
alert ('Good  userID= ' +userID+'    userName ='+ userName);
}// end function inosmiCommentGood

function inosmiCommentBad (userID, userName){
alert ('Bad  userID= ' +userID+'    userName ='+ userName);
}// end function inosmiCommentBad

function inosmiCommentBan (userID, userName){
alert ('Ban  userID= ' +userID+'    userName ='+ userName);
}// end function inosmiCommentHide

function filter_inosmi_forum() {
 var ino_users_div = $x(".//div[@class='memberName']");
  for (var i=0; i<ino_users_div.snapshotLength; i++) 
 {	cUserDiv = ino_users_div.snapshotItem(i);
	// message header
	var messHead = cUserDiv.parentNode.parentNode;

	var userID=$xFirst(".//a[@class='memberName']",cUserDiv);

	var userNom= inosmiGetUID(userID.href);
	var userName = userID.textContent;
	
// add collapse/expand icon in left of header
	// cUserDiv.innerHTML = "<img src='http://inosmi.ru//i/in.gif'" +
//		"onclick='manageComments("+i+")' title='Скрыть' alt='-' id='mesIcn-"+i+"'>  " + cUserDiv.innerHTML; 
 
var upImg = document.createElement('img');
	upImg.src =inosmiUp;
	upImg.title = 'Свернуть';
	upImg.setAttribute("id", "collapseBtn-"+i);
	// !!! :) в Опере клик на изображение не вешается ! делаю через ссылку
		var a3=document.createElement("a");
		a3.appendChild(upImg);
		a3.setAttribute("commNomer", i);
		a3.setAttribute('userName',userName);
		a3.addEventListener('click',  function() {manageComments(this.getAttribute('commNomer'));}, true);
	cUserDiv.appendChild(a3);
 
 
	var BanImg = document.createElement('img');
	BanImg.src =inosmiBan;
	BanImg.title = 'Забанить';
		var a3=document.createElement("a");
		a3.appendChild(BanImg);
		a3.setAttribute("id", userNom);
		a3.setAttribute('userName',userName);
		a3.addEventListener('click',  function() {inosmiCommentBan(this.id, this.getAttribute('userName'));}, true);
	cUserDiv.appendChild(a3);

	var GoodImg = document.createElement('img');
	GoodImg.src =inosmiGood;
	GoodImg.title = 'Хорошо';
		var a3=document.createElement("a");
		a3.appendChild(GoodImg);
		a3.setAttribute("id", userNom);
		a3.setAttribute('userName',userName);
		a3.addEventListener('click',  function() {inosmiCommentGood(this.id, this.getAttribute('userName'));}, true);
	cUserDiv.appendChild(a3);
	
	var BadImg = document.createElement('img');
	BadImg.src =inosmiBad;
	BadImg.title = 'Плохо';
		var a3=document.createElement("a");
		a3.appendChild(BadImg);
		a3.setAttribute("id", userNom);
		a3.setAttribute('userName',userName);
		a3.addEventListener('click',  function() {inosmiCommentBad(this.id, this.getAttribute('userName'));}, true);
	cUserDiv.appendChild(a3);
	

	// whole message
	var messTable = messHead.parentNode;
	// message text 
	var messTx=$x(".//tr[@class='trow1' or @class='trow2']", messTable);
	if (messTx.snapshotLength)
	 {	// Текст комментария
		messTx.snapshotItem(0).id='ComTx-'+i;
		// спрятать строку [print] [link] [!!!] [Перейти наверх] [ответить] [цитировать] 
		messTx.snapshotItem(1).id='ComRepl-'+i;
		messTx.snapshotItem(1).style.display='none';
		// спрятать строку	Считаете содержание этого сообщения оскорбительным? 
		var Moderatorial=$xFirst(".//span[@class='panelBar']", messTable);
		Moderatorial.id='Moder-'+i;
		Moderatorial.style.display='none';

	 }

	var commAuthor =$xFirst(".//a[1]", cUserDiv); // comment author
	// alert(commAuthor.textContent);
	if  (commAuthor.textContent.match(inosmi_ignore_users)) // bad comment - collapse trolls
	 {	commAuthor.innerHTML ='<font style="color:black">' + commAuthor.innerHTML +'</font>';
		manageComments(i,'none');
	 }

	// if isBanned(userNom) {manageComments(i,'none');}
	
	if  (commAuthor.textContent.match(inosmi_mark_users))  // important comment :)
	 {	commAuthor.innerHTML ='<font style="color:red">' + commAuthor.innerHTML +'</font>';
	 }
	
	if  (commAuthor.textContent.match(markGood))  // to read
	 {	commAuthor.innerHTML ='<font style="color:gold">' + commAuthor.innerHTML +'</font>';
	 }
	 
	if  (commAuthor.textContent.match(markShit))  // 
	 {	commAuthor.innerHTML ='<font style="color:sienna">' + commAuthor.innerHTML +'</font>';
		manageComments(i,'none');
	 }
	 
	if  (commAuthor.textContent==your_name) // your comment
	 {	commAuthor.innerHTML ='<font style="color:blue">' + commAuthor.innerHTML +'</font>';
	 }

	 // check for spam links
	var messLinx=$x(".//a", messTx.snapshotItem(0)); // all linx in message
	for (var j=0; j<messLinx.snapshotLength; j++) {
		var currLink=messLinx.snapshotItem(j).href;
		var currLinkHost=currLink.split('/')[2];
		// спам-ссылки, или уже поработал ИноМодератор :) - ссылка на правила общения
		if ((currLink&&currLink=='http://inosmi.ru/forum/themes/help#rulers') || (currLinkHost&&currLinkHost.match(spamLinx))) // spamer
			{	commAuthor.innerHTML ='<font style="color:black">' + commAuthor.innerHTML +'</font>';
				manageComments(i,'none');
			}
		}
 
 } //for

 // выделение своих цитат (меня цитируют) - красным цветом
var all_quotas = $x(".//span[@class='genmed']");
for (var i=0; i<all_quotas.snapshotLength; i++) 
{ var qouta = all_quotas.snapshotItem(i);
	qoutaText=qouta.textContent;
	quotaAuthor=qoutaText.substring(0,qoutaText.indexOf(" "));
	if (quotaAuthor==your_name) 
	{ qouta.innerHTML = '<font style="color:red"><b>' + quotaAuthor +'</b></font> - меня цитируют!!!'; }
}// for

}// end  function filter_inosmi_forum()


function inosmiGetUID(userInfo){//из адреса юзера  получить номер
var userID = userInfo.substring(userInfo.indexOf('=')+1);
return userID;
} //end function inosmiGetUID


function manageComments (CommId, actionDo) {
	var mText=$('ComTx-'+CommId);
	var mRepl=$('ComRepl-'+CommId);
	var mModer=$('Moder-'+CommId);
	var mIcon=$('collapseBtn-'+CommId);
	if (!actionDo) 	 {	
		if (mText&&mText.style.display=='') {actionDo='none';} 
		else {actionDo='';}
	 }
	if(mIcon) 	  { 	
		if (actionDo=='') {mIcon.title='Скрыть';
									mIcon.src=inosmiUp;	} 
		else {mIcon.title='Показать';
				mIcon.src=inosmiDown;}
	  }
	if (mText) {mText.style.display=actionDo;}
	if (mRepl) {mRepl.style.display=actionDo;}
	if (mModer) {mModer.style.display=actionDo;} 
}

function inosmiReadBanned(){
	if (isFF) {	// чисто для ФФ можно использовать вместо кукисов, список общий
			inosmiBanned = GM_getValue("inosmiBanned",'0').split('##');	
			}
	else {
	// вариант для Оперы и пр.- кукисы, не надёжный
		var data = readCookie("inosmiBanned");  
		if (data==null) {data = '0';} else {data = unescape(data);}
		inosmiBanned = data.split('##');
		}
} // end function inosmiReadBanned()

function inosmiStoreBanned(){
	if (isFF) {		// для ФФ можно использовать вместо кукисов, список общий
						GM_setValue("inosmiBanned",inosmiBanned.join('##')); 
				}
	else 	{
		// вариант для Оперы и пр.- кукисы, но не надёжный, на форуме и сайте - отдельные списки !!
				createCookie("inosmiBanned",escape(inosmiBanned.join('##')),30); // хранить 30 дней
				}

} // end function inosmiStoreBanned()

function isBanned(userNom) {
return (false);
}


// ----- support functions
function addGlobalStyle(css) {
    var head, style;  head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function createCookie(name,value,days) {
	if (days) {		var date = new Date();
						date.setTime(date.getTime()+(days*24*60*60*1000));
						var expires = "; expires="+date.toGMTString();
					}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}
 
// -------- 'macros' --------
function $(id) {return document.getElementById(id);}
function $x(xpath, contextNode, resultType) {
	contextNode = contextNode || document.body;
	resultType = resultType || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	return document.evaluate(xpath, contextNode, null, resultType, null); }
function $xFirst(xpath, contextNode) {
	var xpr = $x(xpath, contextNode, XPathResult.FIRST_ORDERED_NODE_TYPE);
	return xpr.singleNodeValue; }


