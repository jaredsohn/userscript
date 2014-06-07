// ==UserScript==
// @name           Unfriend Finder
// @namespace      unfriend_finder
// @description    Ce script vous permet de savoir qui vous a suprimer sur facebook
// @author         http://www.facebook.com/DarkTanner
// @homepage       http://www.facebook.com/group.php?gid=337364085307
// @include        htt*://*.facebook.com*
// @exclude        http://*static*.facebook.com*
// @exclude        http://*static*.facebook.com*
// @exclude        http://developers.facebook.com/*
// @exclude        http://lite.facebook.com/*
// ==/UserScript==
//

// Unfriend 
var version = 11;   
//
// Icons

const sprite_unfriends = 

"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAEAB03PAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG

90b3Nob3AgSUNDIHByb2Z"+
"pbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xu

ja9a89+bN/rXXPues852zz"+
"wfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUA

EB6jkKmAEBGAYCdmCZTAKA"+
"EAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIU

pAAR7AGDIIyN4AISZABRG8"+
"lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiY

uP+5c+rcEAAAOF0ftH+LC+"+
"zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz

0TKUcz5IJhGLc5o9H/LcL/"+
"/wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//

UegJQCAZkmScQAAXkQkLlT"+
"Ksz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLy

BCQRByAgTYSHaiAFiilgjj"+
"ggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaP

Yw2oefQq2gP2o8+Q8cwwOg"+
"YBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQ

YYjIxh1hILCPWEo8TLxB7i"+
"EPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlm

DJBVaOaUt2ooVQRNY9aQq2"+
"htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzH

rmOeZD5lvVVgqtip8FZHKC"+
"pVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs

3gsIWsNq4Z1gTXEJrHN2Xx"+
"2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5

Bx0onXCdHZ4/OBZ3nU9lT3"+
"acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4

YSRudE8o9VGjUYPjGnGXOM"+
"k423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0a

tna0l1rutu6cRp7lOk06rn"+
"tZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLK

cRpnVOb00dnF2e5c4PziIu"+
"JS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrde

wt6V3qvdh7xc+9j5yn+M+4"+
"zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH35

5jOkc5pDoVQfujW0Adh5mG"+
"Lw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3

iC+N7F5gvyF1weaHOwvSFp"+
"xapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yP

Tq9MYOSkZBxQqohTZO2Z+p"+
"n5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo

5sjxxedsK4xUFK4ZWBqw8u"+
"Iq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZ

tJm6ebeLZ5bDpaql+aXDm4"+
"N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P

3P66Jqun4lvttXa1ObXHtx"+
"wPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T

8w+0dbq3nr8R9sfD5w0PFl"+
"5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrl

ca7nuer21e2b36RueN87d9"+
"L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGD

Ybrnjg+OTniP3L96fynQ89"+
"kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8

EA5jz/GMzLdsAAAAgY0hST"+
"QAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAw1JREFUeNpi/P//PwMyYILS/xkYGBg8ZvD/BwAAAP//YsSm4n/rjAP/P

Wbw/2dgYPgPAAAA//9i+P/"+
"/P8PhMw/+////nwGG22ceh/NZzlx5+p+Hi40BqpPh2/d/DL9+/2HwmMH/f0fGRwYAAAAA///CsAMdMO0/ee///pP34KomLDrzf8KiM3A+0+e

vPxkczZXgTpcS42HY8c2ZI"+
"Wu19X8GBgYGxvPXnv1nYGBg2HrwJgMDAwPDh0+/GBgYGBi6y9wYGBgYGAAAAAD//2L8//8/w8ptl/9Li/MxPH35iSHcS5cR3R0rtl3//+DJR

wYFGX6GCC9NRoyQe/vhGwM"+
"S/b91xoH/rTMOYPUdPPygTmbcf/LefxZmJobHLz7CFUV66zG0zjjAUJ3hwNi/6PT/nz/+Mnh6f4bLl28OYdiR8ZGBgYGBESMYX7798l9cmAd

ZCMXJWaut/997ewXOBwAAA"+
"P//IhgPhAATAwMDw5GzD/8fOfsQp0kds07875h14j9OAyh2ATJAigFcLvrPwMAAS80QA4y0pBhsjOUZGBgY/ldnOGDoeCRYzHDgnzuDxwz+/

x4z+FHkWI6cffjfxlieYfn"+
"WSzj9f+/fFYZO3zVY5eFJFQZgSZaBgYGhOsOBobRrF4oGWBKGJioGbNH4HylNMIgL8zBiSYkMDAwMDErCOgwAoRiwef+N/1wcrAwsLEwM9qa

KjKTGyIpt1/+/ef+d4cfPP"+
"wwlSWZE6Yc7YP/Je/9ZWZjhEr///GVwNFci2hETFp35/+PHHzifg4OFoSDOhKB+Fhjj3z/UoITxsWQtrEHLwsKEyHj/EXz0rAcL+mmhRxkxs

uKhMw/+MzEyMvz7/5/BzkQ"+
"BZsH/1hkHUAyAJlUM33XPO/X/759/DAwMDAwVaRaMsDiHFhwoiWdHxkeEAw6cuv+fhZmJAV9yhpVQ2BwAK7EO/HPHmdyRSjAUB7AcOfvwPws

zJLi+ff/NEOmtR2y0/3/59"+
"gvD/LVXUIK2fHMIVsVKwjoY5TJGLsBlEXoUEIoKdIvQo4BQPqYrAAwAzMpzPiUrpv4AAAAASUVORK5CYII=";
const sprite_awaitings = 

"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAQCAYAAAEAB03PAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG

90b3Nob3AgSUNDIHByb2Zp"+
"bGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuj

a9a89+bN/rXXPues852zzwf"+
"ACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB

6jkKmAEBGAYCdmCZTAKAEAG"+
"DLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAA

R7AGDIIyN4AISZABRG8lc88"+
"SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5

c+rcEAAAOF0ftH+LC+zGoA7"+
"BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUc

z5IJhGLc5o9H/LcL//wd0yL"+
"ESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQC

AZkmScQAAXkQkLlTKsz/HCA"+
"AARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByA

gTYSHaiAFiilgjjggXmYX4I"+
"cFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq

2gP2o8+Q8cwwOgYBzPEbDAu"+
"xsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hI

LCPWEo8TLxB7iEPENyQSiUM"+
"yJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2

ooVQRNY9aQq2htlKvUYeoEz"+
"R1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVV

gqtip8FZHKCpVKlSaVGyovV"+
"KmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1g

TXEJrHN2Xx2KruY/R27iz2q"+
"qaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/O

BZ3nU9lT3acKpxZNPTr1ri6"+
"qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUY

PjGnGXOMk423GbcajJgYmIS"+
"ZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7

lOk06rntZnw7Dxtsm2qbcZs"+
"OXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c

4PziIuJS4LLLpc+Lpsbxt3I"+
"veRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5y

n+M+4zw33jLeWV/MN8C3yLf"+
"LT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Ad

h5mGLw34MJ4WHhVeGP45wiF"+
"ga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwv

SFpxapLhIsOpZATIhOOJTwQ"+
"RAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z

+pn5mZ2y6xlhbL+xW6Lty8e"+
"lQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8

uIq2Km3VT6vtV5eufr0mek1"+
"rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4

N2dq0Dd9WtO319kXbL5fNKN"+
"u7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxw

PSA/0HIw6217nU1R3SPVRSj"+
"9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5S

vNUyWna6YLTk2fyz4ydlZ19"+
"fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L15

8Rb/1tWeOT3dvfN6b/fF9/X"+
"fFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzya

eF/6i/suuFxYvfvjV69fO0Z"+
"jRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAei

UAAICDAAD5/wAAgOkAAHUwA"+
"ADqYAAAOpgAABdvkl/FRgAAA29JREFUeNpi/P//PwMyYGJAAwAAAAD//2JEV8Fy5OzD/wdP32dgZuJgqEizYAAAAAD//2L4//8/w+EzD/63T

N//v2X6/v////9naJ95/D8M"+
"MJ6+/OQ/CzMTw5+//xhMdKQZqvv3Mfz6/YeBjZWF4SxnIAMAAAD//8KwAx2w7D9577+WihiDuDAPAwMDA8OERWcYbnHmM9x7ewXi7M9ffzKc

vPiY4eXbLwwMDAwMUmI8DA6"+
"8c6H61RhY5CQFGBgYGGAmMJ6+9AhiJx8Dw46M04wAAAAA//90kbEKgXEAxH9/FBOjgYGHkDLZeAqT4TOazWYjswkPIBspg5TFYBNFUZSPiMI

Z8KEYbrnr7rrOSKLeHCkU9L"+
"NY7UjGo04dYABqzbGmc5tIOED3kHXqW5ZtXACb7RHg02wAipXO18KXuWXZ5knJtPsTedzvBy7XG73hjIKVBDCl6kDn09XRvT43+UyMdCXwCJ

L0C1qu9/qjkSr7lWskJIk7o"+
"WSsQzAUhtFzEzFIw9DBKDHbGETtvMB9AxH6BF5A4gmqEU+gL2BsQhMDryCMhg7EZHANda9WI/71y598X875y+HfFQC2h7MC6DZrAlAAl/hO1

bYEwGyxUwCTYVv0/YoCqNsN"+
"PBmJb/3U1A8BWAZ7LvE9U6/vV9R6dAXAkxFu4KicvwPZMhRSOM25gWMoHONHMiHt//spPcOE+lE3qdtFxGZ/ytTsNmtM/ZCBbFG1LaH36wuf

PdajK27g4MlIFKxSMVdTO5B"+
"IdstkVpmPA0CO8Zv/TwfGq47qzcsmfwklHWzef+M/FwcrAwsLE4O9qSIjqWlixbbr/9+8/87w4+cfhpIkM6L0wx2w/+S9/6wszHCJ33/+MsD

KAVjSQA4i5HQGLSf+//jxB6"+
"6Gg4MFXm7Akg5ScoKnQ3gq+PcPNUc4mivBLYZZCEtaSOL/YXHFwsKEKD/+MzDs+ObMsCPuI9TCMAYl4acMkKSHcJDHDFNEOna2VGb8Bw0NKM

1YneHAWJ3hwAhNnniDNCfKi"+
"JGZhQmagOFJlpGBgYFxR8YqxmmhRxlhxRgC3IJEwYFT91FKJOSSycFMEZ690UME5ij0Egut5IJnf4TPEVGAkY+wAVjeQs8iyOUMPnDtnzvDI

iTLkcpjBhZoAUYI4LSkIs2C"+
"oP6QGbj1U1wcUwoAAwADus5dp6kXqgAAAABJRU5ErkJggg==";
const executionId = randId()+randId()+randId()+randId()+randId()+randId();
const defaultOptions = '[1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0]';
const defaultSettings = {
    deactivated: true,
    reappeared: true,
    accepted: true,
    ignored: true,
    icons: false,
    uid: false,
    notifUnfriend: true,
    notifIgnored: true,
    updatePicture: false,
    hideInMenubar: false,
    debug: false,
    googleSearch: true,
    dissociateLists: true
};
const defaultGoogle = '[1]';
var lastIgnored;
var isFan;
var newVersion;
var Browser;
const $pageLink = 'http://www.facebook.com/unfriendfinder';

if (!getKey('settings')) {
    options = eval(getKey('options', defaultOptions));
    googleSearch = eval(getKey('google', defaultGoogle));
    settings = {deactivated: (options[0]?true:false), reappeared: (options[1]?true:false), accepted: 

(options[2]?true:false), ignored: (options[3]?true:false), icons: (options[6]?true:false), uid: 

(options[7]?true:false), notifUnfriend: (options[4]?true:false), notifIgnored: (options[5]?true:false), 

updatePicture: (options[8]?true:false), hideInMenubar: (options[9]?false:true), debug: 

(options[10]?true:false), googleSearch: (googleSearch[0]?true:false), dissociateLists: true};  
    setKey('settings', uneval(settings));
}
else {
    setKey('settings', getKey('settings', defaultSettings)); 
    settings = eval(getKey('settings')); 
}

// Checking cross-browser Firefox/Chrome
// Chrome is not fully supported yet.

if (/Chrome/i.test(navigator.userAgent)) {
    eval('var unsafeWindow = window');
    Browser = "Chrome";
    function chromeError() {
        if (!unsafeWindow.Dialog) setTimeout(function() { chromeError() }, 1000);
        else { 
            s = document.createElement('script');
            s.innerHTML = ''+
            'd = new Dialog();'+
            'd.setBody(\'This script is not compatible with chrome yet.<br />You should remove it, and check 

on <a href=\"http://userscripts.org/scripts/show/71875\">userscripts.org</a> for updates.\');'+
            'd.setTitle(\'Unfriend Finder\');'+
            'd.setModal(true, Dialog.MODALITY.WHITE);'+
            'd.setButtons([Dialog.CLOSE]);'+
            'd.show();'
            document.body.appendChild(s);
        }
    }
}
else if (/Firefox/i.test(navigator.userAgent)) {
    Browser = "Firefox";   
}

//This, is the AJAX() prototype, and XHR Class (Non Cross-domain):
function AJAX($object) {
    if (!document.GM_xmlhttpRequest) return GM_xmlhttpRequest($object);
    else return new XHR($object);
}
var XHR = function($object) {
    if ($object.url) this.url = $object.url; 
    else {
        throw (new Error('No URL passed in object'));
        return;
    }
    if ($object.method) this.method = $object.method;
    else this.method = 'GET';

    if ($object.headers) this.headers = $object.headers;
    if ($object.data) this.data = $object.data;
    if ($object.onreadystatechange) this.onreadystatechange = $object.onreadystatechange;
    if ($object.onload) this.onload = $object.onload;
    else this.onload = function() { };
    if ($object.onerror) this.onerror = $object.onerror;
    else this.onerror = function() { };
    this.updating = false;  

    var _XHR = this;      

    this.cancel = function() {
        if (_XHR.updating) {
            _XHR.XMLHttpRequest.abort();
            _XHR.XMLHttpRequest = null;
            _XHR.updating = false;
        }
    }
    this.open = function() { 
        if (_XHR.updating) {
            throw new Error('Current request not fully received. AJAX.cancel() to cancel request.');
            return;
        }
        _XHR.XMLHttpRequest = null; 

        if (window.XMLHttpRequest) _XHR.XMLHttpRequest = new XMLHttpRequest();              
        else _XHR.XMLHttpRequest = new ActiveXObject('Microsoft.XMLHTTP');

        if (!_XHR.XMLHttpRequest) {
            throw new Error('Object XMLHttpRequest undefined')    
            return;                               
        }

        else {
            _XHR.XMLHttpRequest.onreadystatechange = function() {  
                if (_XHR.XMLHttpRequest.readyState == 4) {  
                    _XHR.updating = false;
                    if (inArray([200, 201, 202, 302, 304, 305], _XHR.XMLHttpRequest.status)) 

_XHR.onload(_XHR.XMLHttpRequest); 
                    else if (inArray([400, 401, 402, 403, 404, 405, 406, 407, 408, 410, 500, 502, 503, 504], 

_XHR.XMLHttpRequest.status)) _XHR.onerror(_XHR.XMLHttpRequest);   
                    else if (0 == _XHR.XMLHttpRequest.status) throw new Error('XHR: Can\'t use AJAX() on 

Cross-domain ('+_XHR.url+')')
                    else throw new Error('XHR: Unknown error (Status code '+_XHR.XMLHttpRequest.status+')')
                    _XHR.XMLHttpRequest = null;                                                
                }  
            }                                                      
            _XHR.updating = true;                              
            if (/POST/i.test(_XHR.method)) {
                _XHR.XMLHttpRequest.open('POST', _XHR.url, true);
                _XHR.XMLHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                _XHR.XMLHttpRequest.setRequestHeader('Content-Length', _XHR.data.length);
                _XHR.XMLHttpRequest.send(_XHR.data);
            }
            else {
                _XHR.XMLHttpRequest.open('GET', _XHR.url, true);
                for (header in _XHR.headers) {
                    content = _XHR.headers[header];
                    _XHR.XMLHttpRequest.setRequestHeader(header, content);
                }                          
                _XHR.XMLHttpRequest.send(null);                                         
            }                                                         
        }                                                                           
    }
    this.open();
}


//Styling function, greasemonkey function :
function addStyle($style) {
    var head = document.getElementsByTagName("head")[0];
    if (head) {
        var style = document.createElement("style");
        style.textContent = $style;
        style.type = "text/css";
        head.appendChild(style);
    }
    return style;     
}

//Registering command in greasemonkey menu : (Only Firefox)
function setMenuCommand($name, $handler) {
    if (typeof GM_registerMenuCommand === undefined) void(0);
    else GM_registerMenuCommand($name, $handler)
}

//Cookie Class :
var Cookie = function() {
    this.output;
    this.read = function ($name) {
        var start = document.cookie.indexOf($name+"=");
        var len = start + $name.length + 1;
        if ((!start) && ($name != document.cookie.substring(0, $name.length))) return null;
        if (start == -1) return null;
        var end = document.cookie.indexOf(';', len);
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(len, end));
    }
    this.set = function ($name, $value, $expires, $path, $domain, $secure) {
        var today = new Date();
        today.setTime(today.getTime());
        if ($expires) $expires = $expires * 1000 * 60 * 60 * 24;
        var expires_date = new Date(today.getTime() + ($expires));
        document.cookie = $name+'='+escape($value)+
        (($expires)?';expires='+expires_date.toGMTString():'')+ 
        (($path)?';path='+$path:'')+
        (($domain)?';domain='+$domain:'')+
        (($secure)?';secure':'');
        return $value;
    }
    this.remove = function ($name, $path, $domain) {
        if (this.read($name)) {
            document.cookie = $name+'='+
            (($path)?';path='+$path:'')+
            (($domain)?';domain='+$domain:'')+
            ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
        }
    }
};

//set/get stored values :
function setKey($key, $value) {
    if (typeof GM_setValue === undefined) return new Cookie().set($key, $value, '', '', '', '');  
    else return GM_setValue($key, $value);    
}
function getKey($key, $default_) {
    if (typeof GM_getValue === undefined) {  
        $c = new Cookie().read($key);
        if ($c) return $c;
        else return $default_;    
    }
    else return GM_getValue($key, $default_); 
}



log(executionId+' : 

-------------------------------------------------------------------------------------------');
log(executionId+' : Script loaded ans started for url('+document.location+')');
log(executionId+' : Applying CSS styles');

// Adding styles

addStyle("a { outline:none; }");
addStyle(".sx_app_icons_unfriends { background-image:url("+sprite_unfriends+"); background-position:-16px 

0px; }");
addStyle(".sx_app_icons_awaiting { background-image:url("+sprite_awaitings+"); background-position:-16px 

-0px; }");
addStyle("i.wasunfriend { background-image:url("+sprite_unfriends+"); background-position:-16px 0px; 

height:16px; margin-top:5px; margin-left:2px; margin-right:3px; }");
addStyle("div.wasunfriend { padding-top:5px; }");
addStyle("i.hasignored { background-position:0 -1763px; height:12px; margin-top:7px; margin-left:2px; 

margin-right:3px; }");
addStyle("div.hasignored { padding-top:5px; }");
addStyle(".spritemap_icons_fix { 

background-image:url('http://b.static.ak.fbcdn.net/rsrc.php/z2B5S/hash/696ouey0.png') !important; }");
addStyle(".sx_app_icons_unfriends_selected { background-image:url("+sprite_unfriends+") !important; }");
addStyle(".sx_app_icons_awaiting_selected { background-image:url("+sprite_awaitings+") !important; }");
addStyle(".spritemap_app_icons_UF { 

background-image:url('http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif'); 

background-repeat:no-repeat; display:inline-block; height:16px; width:16px; }");
addStyle(".waiting_indicator { background:transparent 

url('http://static.ak.fbcdn.net/rsrc.php/z13JD/hash/16vt4yge.gif') no-repeat scroll left top; height:11px; 

width:16px; z-index:2;}");
addStyle(".disabled_link { color: #777777; text-decoration:none; cursor:default; }");
addStyle("a:hover.disabled_link { text-decoration:none; }");
addStyle(".objectListImg_fix { height:50px; width:50px; }");
addStyle(".UIObjectListing_Pic_fix { float:left; height:50px; overflow:hidden; position:relative; width:50px; 

background: transparent url(http://static.ak.fbcdn.net/pics/q_silhouette.gif) repeat scroll 0 0; }");
addStyle(".UIObjectListing_MetaData_fix { overflow:hidden; padding-left:10px; padding-top:12px; 

white-space:nowrap; width:450px; float:left; }");
addStyle(".UIObjectListing_RightContent_fix { float:right; }");
addStyle(".UIObjectListing_RemoveContainer_fix { float:right; padding-left:8px; padding-right:19px; 

padding-top:16px; }");
addStyle(".UIFilterList_Item_fix { padding-top:1px; }");
addStyle(".UIMoreInfo_Arrow { background:url(\"/rsrc.php/z44BH/hash/74sfbqtk.png\") no-repeat scroll left top 

transparent; height:7px; margin-left:6px; position:relative; top:1px; }");
addStyle(".UIMoreInfo_Title { background:none repeat scroll 0 0 #6D84B4; border-color:#4A66A0 #3B5998 

-moz-use-text-color; border-left:1px solid #3B5998; border-right:1px solid #3B5998; border-style:solid solid 

none; border-width:1px 1px medium; color:#FFFFFF; font-weight:bold; padding:5px; }");
addStyle(".UIMoreInfo_Body { background-color:#FFFFFF; border-color:-moz-use-text-color gray gray; 

border-right:1px solid gray; border-style:none solid solid; border-width:medium 1px 1px; color:#555555; 

font-weight  ormal; line-height:12px; padding:5px; }");
addStyle(".UIMoreInfo { font-size:9px; position:absolute; text-align:left; z-index:5; }");
addStyle("#ufSettings small { float:left; height:16px; width:16px; 

background-image:url("+sprite_unfriends+"); margin: -1px 6px 0px 0px; background-position: 16px; }");
addStyle("#ufSettings:hover small { background-position: 0px; }");
addStyle(".uiButtonUF .uiButtonTextUF, .uiButtonUF input { background:none repeat scroll 0 0 transparent; 

border:0 none; color:#FFFFFF; cursor:pointer; display:inline-block; font-family:'Lucida 

Grande',Tahoma,Verdana,Arial,sans-serif; font-size:11px; font-weight:bold; margin:0; outline:medium none; 

padding:1px 0 2px; white-space:nowrap; }");
addStyle(".uiButtonUF { -moz-box-shadow:0 1px 0 rgba(0, 0, 0, 0.1); 

background:url(\"/rsrc.php/z1V2B/hash/apfsevhg.png\") repeat scroll 0 0 #EEEEEE; border-color:#999999 #999999 

#888888; border-style:solid; border-width:1px; color:#333333; cursor:pointer; display:inline-block; 

font-size:11px; font-weight:bold; padding:2px 6px; position:relative; text-decoration:none; 

vertical-align:middle; white-space:nowrap; }");
addStyle(".uiButtonUFConfirm { background-color:#5B74A8; background-position:0 -48px; border-color:#29447E 

#29447E #1A356E; color:#FFFFFF !important; }");
addStyle(".uiButtonUFConfirm:active { background:none repeat scroll 0 0 #4F6AA3; border-bottom-color:#29447E; 

}");
addStyle(".home_no_stories .list_empty { background-position:0 -224px; }"); 
addStyle(".home_no_stories  { background:url(\"/rsrc.php/zAX12/hash/75lchh0v.gif\") repeat-x scroll left 

bottom transparent; margin-bottom:20px; padding:20px 0 22px 14px; }"); 
addStyle(".home_no_stories_icon { background-image:url(\"/rsrc.php/z7HHR/hash/dlp3zm0w.gif\"); 

background-position:0 0; background-repeat:no-repeat; display:block; float:left; height:32px; 

overflow:hidden; width:32px; }"); 
addStyle(".home_no_stories_content { color:#666666; float:left; font-size:12px; padding-left:13px; 

margin-top:5px; }");
addStyle(".ufListItem { border-top:1px solid #EEEEEE; overflow: hidden; }");
addStyle(".ufListItem:first-child { border-top:none; }");
addStyle(".ufListDivider { background:url(\"/rsrc.php/zAX12/hash/75lchh0v.gif\") repeat-x scroll left center 

transparent; height:4px; }");
addStyle(".ufListDivider + li { border:none; content: \"\"}");
addStyle("a.close_message { background:url(\"/rsrc.php/z14M5/hash/a657viny.png\") no-repeat scroll -869px 

-65px transparent; float:right; margin:1px 2px 0 7px; text-indent:-5000px; width:11px; }");
addStyle("a.close_message:hover { background-color:#3B5998; background-position:-857px -65px; 

text-decoration:none; }");
addStyle(".uiTextHighlight  { background:none repeat scroll 0 0 #FFF8CC; border-bottom:1px solid #FFE222; 

}");
addStyle(".uiTextHighlightSpecial { background:none repeat scroll 0 0 #eceff6; border-bottom:1px solid 

#d4dae8; }");
log(executionId+' : Setting options');

// Configuring Greasemonkey

// Display [deactivateds (always 1), reactivated, reqs confirmed, ignored, icons, uid, notif1, notif2]
const defaultLanguage = unsafeWindow.Env.locale?unsafeWindow.Env.locale:'en_US';


setKey('language', getKey('language', defaultLanguage));       

language = getKey('language');          
const unfriendBox = 0;
if (unfriendBox) {
    addStyle(".openToggler #nav_unfriends, .openToggler #nav_unfriends:hover { border-width: 1px 1px medium; 

border-style: solid solid none; border-color: black black -moz-use-text-color; margin-top: -1px; 

background-color: rgb(255, 255, 255); color: rgb(51, 51, 51); position: relative; z-index: 3; padding-left: 

9px; padding-right:9px; }");
    addStyle(".openToggler #SPAN_Unfriends, .openToggler #SPAN_Unfriends:hover { margin-right: -1px; }");
}


versionStored = getKey('version', '0')
var versionChanged = false;
if (parseInt(versionStored) < parseInt(version)) var versionChanged = true;  
setKey('version', version);


//Emergency reset :

function emergencyReset() {
    if (!unsafeWindow.Env.user) setTimeout(function() { emergencyReset() }, 1000);      
    else {
        setMenuCommand("[UnfriendFinder] Reset values to default.", function(){
            id = unsafeWindow.Env.user;
            setKey(id+'_unfriends', '({})');
            setKey(id+'_friends', '({})');
            setKey(id+'_keepList', '({})');
            setKey(id+'_unfriendsInfos', '({})');
            setKey(id+'_awaitingsIgnored', '({})');
            setKey(id+'_keepAwaitingList', '({})');
            setKey(id+'_reappeared', '({})');
            setKey(id+'_deactivated', '({})');
            setKey('settings', uneval(defaultSettings));
            setKey('language', defaultLanguage);
            setKey('google', defaultGoogle);
            setKey('coreStarted', '0');
            setKey('_started', '0');
            window.location.href = 'http://www.facebook.com/';
        });
    }
}
emergencyReset();


//Loggin & Debuging function :
function log($obj) {
    if (settings.debug) document.title = $obj; 
    console.log($obj);
    if (document.GM_Log) GM_Log($obj);
}


//Languages

var lang = function($l) {
    if (!$l) $l = unsafeWindow.Env.locale;
    this.language = $l;

    //French
    switch(this.language) {
        case 'fr_FR' : //Français
            $data = {langname:"Français", unfriends:"Amis en moins", awaiting:"Requêtes en attente", 

notifications:"Notifications", refreshLink:"Rafraîchir le lien dans la menubar", becomeFan:"Devenir Fan", 

joinGroup:"Rejoindre le groupe", cancel:"Annuler", change:"modifier", manage:"gérer", reset:"reset", 

hide:"masquer", behavior:"Apparence", backups:"Sauvegardes", googlesearch:"GoogleSearch", debug:"Debug", 

lang:"Langue", reset_:"Reset", usesetting:"Utilisez ces options pour modifier l'affichage des listes", 

deactivated:"Profils déactivés", reactivated:"Profils réactivés", confirmed:"Requête confirmée", 

declined:"Requête annulée", onunfriend:"Lorsque vous avez un ami en moins", oncanceled:"Lorsquune requête est 

annulée", icons:"Afficher les icones", uids:"Afficher les UIDs", profilepics:"Mettre  jour les photos de 

profil", hidemenubar:"Masquer Unfriends dans la menubar", othersettings:"Autres options", 

importexport:"Importer et exporter les listes", back1:"La liste des unfriends est locale. Cela veux dire que 

si vous utilisez facebook sur un autre ordinateur, ou sur une autre session de firefox, vous ne pourrez pas 

récupérer vos unfriends.", back2:"Utilisez cet out il de sauvegarde pour exporter et importer vos listes où 

vous voulez.", back3:"La modification de ces préférences avancées peut êre dommageable pour la stabilité et 

les performances de ce script. Ne continuez que si vous savez ce que vous faites.", back4:"Votre ID pour la 

sauvegarde est :", disabled:"désactivé", editable:"activé", editableerrors:"editable avec erreurs", 

state:"État:", items:"Items:", ok:"Ok", error:"Erreur", unblock:"Débloquer", block:"Bloquer", 

retrieve:"Charger la liste", setunfriends:"Définir la liste", setlist:"Définir la liste", search:"Recherche", 

autosearch:"La recherche automatique du profil sur google est", on:"activée", off:"désactivée", 

usegoogles:"Utilisez cette amélioration pour trouver les profils sans informations.", miss:"Infos 

manquantes.", gfail:"GoogleSearch raté.", gsuccess:"GoogleSearch réussi.", activate:"Activer", 

usedebug:"Utilisez le mode debug si vous avez des soucis avec le script.", adebug:"Activer le debug dans la 

barre de titre", clang:"Choisissez votre langue :", currentlang:"Langue active", rvoid:"Va remettre toutes 

les données du script à zéro. Attention à ce que vous faites.", creset:"Cliquer pour remettre à zéro.", 

resettitle:"Remettre les valeurs par default", resetbody:"Voulez vous remettre les valeur à 0 ?", 

use:"Utiliser", display:"Affichage", text_ignored:"a refusé votre demande d'ami", text_unfriend:"n'est plus 

dans votre liste d'amis.", text_reactivated:"Profil réactivé", text_deactivated:"Profil masqué ou désactivé", 

text_missing_g:"Infos manquantes, utilisation de google.", text_being:"Le profil est en train dêre 

désactivé", text_unavailable:"Profil inaccessible", text_accepted:"A accepté votre demande d'ami", 

text_canceled:"Demande d'ami annulée", text_pending:"En attente de confirmation", text_noa:"Aucune demande en 

attente.", text_nou:"Aucun ami en moins.", text_error:"Erreur dannulation de la demande.", 

text_hideu:"Masquer l'unfriend", text_hide:"Masquer", text_removec:"Annuler la demande", text_missing:"Infos 

manquantes.", hasignored:"a ignoré une de vos demande d'ami", new_version:"Nouvelle version", 

notif_version:"Une nouvelle version est disponible", here:"ici", wasunfriend:"était dans votre liste 

d'amis.", settings:"Paramètres", dissociateLists: "Dissocier Requêtes acceptées et ignorées", proceed: 

"Procéder", exportData: "Export de données", importData: "Import de données", text_export: "Exporter", 

text_import: "Importer", dataToExport: "Données à exporter", isFan:"Vous êtes fan"};
            break;

        case 'it_IT' : //Italiano     
            $data = {langname:"Italiano", unfriends:"Unfriends", awaiting:"Richieste in attesa", 

notifications:"Notifiche", refreshLink:"Aggiorna il link 'Unfriends' nella barra dei menù", 

becomeFan:"Diventa Fan", joinGroup:"Unisciti al gruppo", cancel:"Cancella", change:"cambia", 

manage:"gestisci", reset:"ripristina", hide:"nascondi", behavior:"Aspetto", backups:"Copie di sicurezza", 

googlesearch:"Ricerca con Google", debug:"Ricerca errori di programmazione", lang:"Lingua", 

reset_:"Ripristina", usesetting:"Usare queste impostazioni per gestire il aspetto dello script", 

deactivated:"Profilo disattivato", reactivated:"Profilo riattivato", confirmed:"Richiesta confermata", 

declined:"Richiesta respinta", onunfriend:"Quando un contatto cancella la tua amicizia", oncanceled:"Quando 

una tua richiesta di amicizia è stata cancellata", icons:"Mostra le icone", uids:"Mostra li UID", 

profilepics:"Aggiorna le immagini del profilo", hidemenubar:"Nascondi la voce 'Unfriends' nella barra dei 

menù", othersettings:"Altre impostazioni", importexport:"Importa o esporta la lista degli 'Unfriends'",  

back1:"La lista degli 'unfriends' è locale: ciò comporta che usando facebook su altro computer o in un'altra 

sessione di Firefox, non potrai avere la tua lista di 'unfriends'.", back2:"Usare questa funzione di 'backup' 

per esportare verso (o importare da) un altro firefox", back3:"Questo può invalidare la garanzia! Il cambio 

di queste impostazioni avanzate può essere pericoloso per la stabilità, sicurezza e prestazioni dello 

'script'. Continua solo se sicuro!", back4:"Lo UserID per il backup è:", disabled:"disabilitato", 

editable:"editabile", editableerrors:"editabile con errori", state:"Stato:", items:"Voci:", ok:"Ok", 

error:"Errore", unblock:"Sblocco", block:"Blocco", retrieve:"Recupera la lista", setunfriends:"Imposta gli 

Unfriends", setlist:"Imposta la lista", search:"Ricerca", autosearch:"Ricerca automatica del profilo su 

Google", on:"abilitato", off:"disabilitato",  usegoogles:"Funzione avanzata per la ricerca automatica di 

profili in mancanza di informazioni.", miss:"Informazioni mancanti", gfail:"Ricerca con Google fallita.", 

gsuccess:"Ricerca con Google riuscita.", activate:"Attivato", usedebug:"Passare alla modalità 'debug' se ci 

sono problemi con lo script.", adebug:"Attiva 'debug' nella barra dei titoli", clang:"Scelta della lingua :", 

currentlang:"Lingua in uso", rvoid:"ATTENZIONE!: resettare lo script distrugge i dati degli 'Unfriends'.", 

creset:"Premere per resettare.", resettitle:"Riporta i valori a quelli di default", resetbody:"Sicuro di 

voler resettare ?", use:"Usa", display:"Mostra", text_ignored:"ignorato tua richiesta di amicizia.", 

text_unfriend:"non è più nella tua lista d'amici.", text_reactivated:"Profilo riattivato", 

text_deactivated:"Profilo cancellato o nascosto", text_missing_g:"Informazioni non reperibili, si prova con 

Google...", text_being:"Il profilo è in corso di riattivazione", text_unavailable:"Profilo indisponibile", 

text_accepted:"La tua richiesta di amicizia è stata accettata", text_canceled:"La tua richiesta di amicizia è 

stata cancellata", text_pending:"La tua richiesta di amicizia è in attesa", text_noa:"Nessuna richiesta 

d'amicizia in attesa", text_nou:"Nessun Unfriends", text_error:"Error while removing connection.", 

text_hideu:"Hascondi Unfriend", text_hide:"Hascondi", text_removec:"Disconnetti", text_missing:"Informazioni 

non reperibili.", hasignored:"ignorato una delle tue richieste d'amicizia", new_version:"Nuova versione", 

notif_version:"Una nuova versione è disponibile", here:"qui", wasunfriend:"è stata nella vostra lista 

amici.", settings:"Impostazioni", dissociateLists: "Split Accepted and Ignored Requests", proceed: "Proceed", 

exportData: "Export Data", importData: "Import Data", text_export: "Export", text_import: "Import", 

dataToExport: "Data to export", isFan:"You are fan"};
            break;

        case 'sr_RS' : //Serbian        
            $data = {langname:"Serbian", unfriends:"Unfriends", awaiting:"Чекање захтева", 

notifications:"Обавештења", refreshLink:"освежи unfriends линк у менију", becomeFan:"Постани обожавалац", 

joinGroup:"Придружи се", cancel:"Откажи", change:"промени", manage:"управљај", reset:"ресетуј", 

hide:"сакриј", behavior:"Понашање", backups:"Резерве", googlesearch:"Google Претрага", debug:"Отклањање 

грешака", lang:"Језик", reset_:"Ресет", usesetting:"Користите ова подешавања за понашање скрипте", 

deactivated:"Профил деактивиран", reactivated:"Профил је поново активан", confirmed:"Захтев потврђен", 

declined:"Захтев одбијен", onunfriend:"Када добијете unfriend-а", oncanceled:"Када је отказан захтев 

пријатеља", icons:"Прикажи иконице", uids:"Прикажи UID", profilepics:"Ажурирање слика профила", 

hidemenubar:"Сакриј Unfriends у менију", othersettings:"Остала подешавања", importexport:"Увоз и извоз 

листе", back1:"unfriends листа је локална. То значи да уколико користите фејсбук на другом рачунару, или 

другој firefox сесији, нећете бити у могућности да видите листу unfriends-а.", back2:"Користите ову резерву 

како би пренели са или на другу другу копију прегледача Firefox.", back3:"Ово може поништити вашу гаранцију! 

Промена ових напредних подешавања могу бити штетни по стабилност, безбедност и перформансе ове скрипте. 

Наставите ако сте сигурни у оно што радите.", back4:"UserID коришћен за резерву :", disabled:"онемогућен", 

editable:"измењив", editableerrors:"измењив са грешкама", state:"Стање:", items:"Ставке:", ok:"Уреду", 

error:"Грешка", unblock:"Одблокирај", block:"Блокирај", retrieve:"Преузми списак", setunfriends:"Подеси 

Unfriends", setlist:"Подеси листу", search:"Претражи", autosearch:"Аутоматска претрага профила на Google je", 

on:"омогућена", off:"онемогућена", usegoogles:"Користите ово проширење да аутоматски пронађете профиле без 

информација.", miss:"Недостатак информација", gfail:"Google Претрага није успела.", gsuccess:"Google Претрага 

је била успешна.", activate:"Активирај", usedebug:"Користите мод за детекцију грешака уколико имате 

проблема", adebug:"Активирај приказ грешака у наслову екрана", clang:"Изаберите ваш језик :", 

currentlang:"Тренутни језик", rvoid:"Ресетовање скрипте уништава све податке о вашим Unfriends. Будите 

опрезни.", creset:"Кликните да бисте поништили.", resettitle:"Ресетуј na 'фабричке' вредности", 

resetbody:"Јесте ли сигурни да желите да вратите вредности?", use:"Користи", display:"Прикажи", 

text_ignored:"је игнорисао(ла) ваш захтев за пријатеља.", text_unfriend:"није више на вашој листи 

пријатеља.", text_reactivated:"Профил реактивиран", text_deactivated:"Профил обрисан или сакривен", 

text_missing_g:"Недостатак информација. Претрага у току...", text_being:"Профил је деактивиран", 

text_unavailable:"Недоступан профил", text_accepted:"је прихватио(ла) ваш захтев за пријатеља", 

text_canceled:"Захтев за пријатељство је одбијено", text_pending:"Чека се одговор", text_noa:"Нема нових 

захтева", text_nou:"Нема Unfriends-а", text_error:"Грешка при уклањању везе.", text_hideu:"Сакриј Unfriend", 

text_hide:"Сакриј", text_removec:"Уклони", text_missing:"недостатак информација.", hasignored:"игнорише један 

од твојих захтева за пријатељство", new_version:"Нова верзија", notif_version:"Нова верзија је доступна 

овде", here:"овде", wasunfriend:"је био(ла) у листи пријатеља", settings:"Подешавања", dissociateLists: 

"Split Accepted and Ignored Requests", proceed: "Proceed", exportData: "Export Data", importData: "Import 

Data", text_export: "Export", text_import: "Import", dataToExport: "Data to export", isFan:"You are fan"};
            break;

        case 'sl_SI' : //Slovensky  
            $data = {langname:"Slovensky", unfriends:"NiePriatelia", awaiting:"Čakajúce žiadosti", 

notifications:"Oznámenia", refreshLink:"Obnoviť menu priateľov v lište", becomeFan:"Stať sa fanúšikom", 

joinGroup:"Pridať sa do skupiny", cancel:"Zrušiť", change:"Zmeniť", manage:"Spravovať", reset:"Obnoviť", 

hide:"Skryť", behavior:"Vzhľad", backups:"Zálohy", googlesearch:"Google vyhľadávanie", debug:"Ladenie", 

lang:"Jazyk", reset_:"Obnoviť", usesetting:"Použiť tieto nastavenia na úpravu správania skriptu", 

deactivated:"Deaktivované profily", reactivated:"Reaktivované profily", confirmed:"Žiadosť potvrdená", 

declined:"Žiadosť zamietnutá", onunfriend:"Keď sa zruší priateľstvo", oncanceled:"Keď žiadosť o priateľstvo 

bola zamietnutá", icons:"Zobraziť ikony", uids:"Zobraziť UID", profilepics:"Aktualizovať profilovú fotku", 

hidemenubar:"Skryť UžNiePriatelia v menu", othersettings:"Ostatné nastavenia", importexport:"Importovať a 

exportovať zoznam UžNiePriateľov", back1:"Zoznam UžNiePriateľov je lokálny. To znamená, že ak použijete 

facebook na inom počítači, alebo v inej relácii firefoxu, tak nebude možné získať vašich UžNiePriateľov.", 

back2:"Použite tento zálohovací nástroj na exportovanie alebo importovanie vašich zoznamov do alebo z iného 

firefox prehliadača.", back3:"Toto môže porušiť vašu záruku! Zmena týchto pokročilých nastavení môže poškodiť 

stabilitu, bezpečnosť a výkon tohto skriptu. Mali by ste pokračovať iba ak ste si istý tým, čo robíte.", 

back4:"Užívateľské ID použité pre túto zálohu je:", disabled:"blokované", editable:"zapisovateľné", 

editableerrors:"zapisovateľné z chybami", state:"Stav:", items:"Položky:", ok:"Ok", error:"Chyba", 

unblock:"Odblokovať", block:"Blokovať", retrieve:"Získať zoznam", setunfriends:"Nastaviť UžNiePriatelia", 

setlist:"Nastaviť zoznam", search:"Hľadať", autosearch:"Automatické hľadanie profilu na google je", 

on:"Povolené", off:"Zakázané", usegoogles:"Použite toto vylepšenie na automatické nájdenie profilov bez 

informácií.", miss:"Chýbajúce informácie", gfail:"Google hľadanie zlyhalo.", gsuccess:"Google hľadanie 

úspešné.", activate:"Aktivovať", usedebug:"Použite ladiaci mód, ak máte problémy s týmto skriptom.", 

adebug:"Aktivovať ladenie lište", clang:"Vyberte váš jazyk:", currentlang:"Aktuálny jazyk", 

rvoid:"Vynulovaním hodnôt v skripte zruší všetky údaje o vašich UžNiePriateľoch. Buďte opatrný.", 

creset:"Kliknite pre obnovenie.", resettitle:"Vynulovať hodnoty na predvolené", resetbody:"Určite chcete 

vynulovať nastavené hodnoty?", use:"Použiť", display:"Zobraziť", text_ignored:"ignoroval tvoju žiadosť o 

priateľstvo.", text_unfriend:"už nie je viac vo vašom zozname priateľov.", text_reactivated:"Profile 

reactivated", text_deactivated:"Profil vymazaný alebo skrytý", text_missing_g:"Chýbajúce info, vyhľadávam.", 

text_being:"Profil je deaktivovaný", text_unavailable:"Profil nedostupný", text_accepted:"Akceptoval tvoju 

žiadosť o priateľstvo", text_canceled:"Žiadosť o priateľstvo zrušená", text_pending:"Čakajúca žiadosť o 

priateľstvo", text_noa:"žiadne čakajúce žiadosti", text_nou:"Žiadny UžNiePriatelia", text_error:"Chyba počas 

odoberania prepojenia.", text_hideu:"Skryť UžNiePriateľ", text_hide:"skryť", text_removec:"Odstrániť 

pripojenie", text_missing:"Info chýba.", hasignored:"ignoroval jednu z vašich žiadostí o priateľstvo", 

new_version:"nová verzia", notif_version:"nová verzia je dostupná", here:"tu", wasunfriend:"bol vo vašom 

zozname priateľov.", settings:"Nastavenia", dissociateLists: "Split Accepted and Ignored Requests", proceed: 

"Proceed", exportData: "Export Data", importData: "Import Data", text_export: "Export", text_import: 

"Import", dataToExport: "Data to export", isFan:"You are fan"};
            break;

        case 'es_ES' : //Español          
            $data = {langname:"Español", unfriends:"Unfriends", awaiting:"Solicitudes pendientes", 

notifications:"Notificaciones", refreshLink:"Actualizar el enlace a unfriends en la barra de menú", 

becomeFan:"Hazte fan", joinGroup:"Unirse al grupo", cancel:"Cancelar", change:"Cambiar", 

manage:"Administrar", reset:"restablecer", hide:"ocultar", behavior:"Comportamiento", backups:"Copias de 

seguridad", googlesearch:"Búsqueda en Google", debug:"Depurar", lang:"Idioma", reset_:"Restablecer", 

usesetting:"Utilice esta configuración para controlar el comportamiento del script", deactivated:"Perfiles 

desactivados", reactivated:"Perfiles reactivados", confirmed:"Solicitudes confirmadas", declined:"Solicitudes 

no aceptadas", onunfriend:"Al obtener un unfriend", oncanceled:"Cuando se cancela una solicitud de amistad", 

icons:"Mostrar iconos", uids:"Mostar ID de Unfriends", profilepics:"Actualizar imágenes de perfil", 

hidemenubar:"Ocutar botón Unfriends de la barra de menú", othersettings:"Otros ajustes", 

importexport:"Importar y exportar lista de unfriends", back1:"La lista de unfriends es local. Esto significa 

que si se utiliza Facebook en otro equipo, o en otra sesión de Firefox, no será capaz de obtener su lista de 

unfriends.", back2:"Use esta herramienta de copia de seguridad para exportar o importar sus listas desde otro 

navegador Firefox.", back3:"¡Cuidado! Al cambiar esta configuración puede perjudicar la estabilidad, la 

seguridad y el rendimiento de este script. Solo debe continuar si está seguro de lo que está haciendo.", 

back4:"La ID de usuario utilizada para la copia de seguridad es:", disabled:"desactivado", 

editable:"editable", editableerrors:"editable con errores", state:"Estado:", items:"Elementos:", 

ok:"Correcto", error:"Error", unblock:"Desbloquear", block:"Bloquear", retrieve:"Obtener lista", 

setunfriends:"Establecer unfriends", setlist:"Establecer lista", search:"Buscar", autosearch:"Búsqueda 

automática de perfiles en Google está", on:"activada", off:"desactivada", usegoogles:"Utilice esta mejora 

para encontrar automáticamente perfiles sin información.", miss:"Información faltante", gfail:"La búsqueda en 

Google ha fallado.", gsuccess:"La búsqueda en Google se realizó con éxito.", activate:"Activar", 

usedebug:"Utilice el modo de depuración si tiene problemas con este script.", adebug:"Activar depuración en 

la barra de título.", clang:"Elige tu idioma :", currentlang:"Idioma actual", rvoid:"¡Cuidado! Al restablecer 

el script a su valor por defecto se pierden todos los datos acerca de tus unfriends.", creset:"Clic para 

restablecer.", resettitle:"Restablecer a los valores por defecto", resetbody:"¿Estás seguro de que desea 

restablecer los valores por defecto del script?", use:"Usar", display:"Mostrar", text_ignored:"ignoró tu 

solicitud de amistad.", text_unfriend:"ya no está en tu lista de amigos.", text_reactivated:"Perfil 

reactivado", text_deactivated:"Perfil borrado u oculto", text_missing_g:"Información no encotrada, buscando 

en Google.", text_being:"Perfil desactivándose", text_unavailable:"Perfil no disponible", 

text_accepted:"Aceptó tu solicitud de amistad", text_canceled:"Solicitud de amistad cancelada", 

text_pending:"Solicitud de amistad pendiente", text_noa:"Ninguna solicitud pendiente", text_nou:"No hay 

unfriends", text_error:"Se produjo un error mientras se eliminaba la conexión.", text_hideu:"Eliminar 

unfriend", text_hide:"Ocultar", text_removec:"Eliminar conexión.", text_missing:"Información faltante.", 

hasignored:"ignoró una de tus solicitudes de amistad", new_version:"Nueva Versión", notif_version:"Una nueva 

versión está disponible", here:"aquí", wasunfriend:"estuvo en tu lista de amigos.", settings:"Ajustes", 

dissociateLists: "Split Accepted and Ignored Requests", proceed: "Proceed", exportData: "Export Data", 

importData: "Import Data", text_export: "Export", text_import: "Import", dataToExport: "Data to export", 

isFan:"You are fan"};
            break;

        case 'hy_AM' : //Armenian
            $data = {langname:"Հայերեն", unfriends:"Չընկերներ", awaiting:"Ակնկալվող հարցումները", 

notifications:"Ծանուցումներ", refreshLink:"Թարմացնել Չընկերների հղումը մենյույում", becomeFan:"Երկրպագել", 

joinGroup:"Միանալ խմբին", cancel:"Մերժել", change:"Փոխել", manage:"կարագավորել", reset:"զրոյացնել", 

hide:"թաքցնել", behavior:"Տեսք", backups:"Պահեստավորել", googlesearch:"GoogleSearch", debug:"Վրիպազերծում", 

lang:"Լեզու", reset_:"Զրոյացնել", usesetting:"Կարգավորումներ սկրիպտի վարքը կարգավորելու համար", 

deactivated:"Պրոֆիլը ապաակտիվացված է", reactivated:"Պրոֆիլը վերաակտիվացված է", confirmed:"Ընդունված 

հարցումներ", declined:"Մերժված հարցումներ", onunfriend:"Երբ Դուք ունեննում եք Չընկեր", oncanceled:"Երբ 

ընկերացման հարցումն ընդհատվում է", icons:"Ցույց տալ պատկերանիշները", uids:"Ցույց տալ UID-ները", 

profilepics:"Թարմացնել պրոֆիլի նկարները", hidemenubar:"Թաքցնել Չընկերները մենյույից", othersettings:"Այլ 

կարգավորումներ", importexport:"Ներմուծել և արտահանել Չընկերների ցուցակը", back1:"Չընկերների ցուցակը տեղային 

է: Դա նշանակում է, որ եթե Դուք օգտվեք Facebook-ից այլ համակարգչով կամ Firefox-ի այլ սեսիայում, ապա Դուք չեք 

տեսնի Ձեր Չընկերներին:", back2:"Օգտագործեք այս պահեստավորման գործիքը Չընկերների ցուցակը արտահանելու կամ այլ 

Firefox ցանցային զննարկիչից ներմուծելու համար:", back3:"Ուշադրությու´ն: Սա կարող է անվավեր դարձնել Ձեր 

երաշխիքը: Այս նուրբ կարգավորումները փոխելը կարող է վտանգավոր լինել սկրիպտի կայունության, ապահովության և 

աշխատունակության համար: Շարունակեք միայն այն դեպքում, եթե համոզված եք Ձեր գործողություններում:", 

back4:"Պահեստավորման համար օգտագործված UserID-ն է:", disabled:"կասեցված է", editable:"հնարավոր է խմբագրել", 

editableerrors:"հնարավոր է խմբագրել, բայց առկա են սխալներ", state:"Վիճակ:", items:"Առարկաներ:", 

ok:"Հաստատել", error:"Սխալ", unblock:"Ապաարգելել", block:"Արգելել", retrieve:"Առբերել ցանկը", 

setunfriends:"Կարգավորել Չընկերները", setlist:"Կարգավորել ցանկը", search:"Փնտրել", autosearch:"Գուգլի 

ավտոփնտրման պրոֆիլն ", on:"ակտիվ է", off:"ակտիվ չէ", usegoogles:"Օգտվել այս բարելավումից ավտոմատ կերպով, 

առանց լրացուցիչ տեղեկատվության, պրոֆիլներ փնտրելու համար:", miss:"Պակասող տեղեկատվություն", 

gfail:"GoogleSearch-ի ձախողում:", gsuccess:"GoogleSearch-ի հաջողում", activate:"Ակտիվացնել", usedebug:"Օգտվեք 

վրիպազերծման աշխատակերպից, եթե սկրիպտի հետ կապված խնդիրներ են առաջանում", adebug:"Ակտիվացնել վրիպազերծման 

աշխատակերպը գլխատախտակում", clang:"Ընտրեք Ձեր լեզուն:", currentlang:"Ընթացիկ լեզուն", rvoid:"Ուշադրությու´ն: 

Սկրիպտի զրոյացման դեպքում բոլոր տվյալները Ձեր Չընկերների մասին կոչնչացվեն:", creset:"Զրոյացնե՞լ", 

resettitle:"Զրոյացնել դեպի նախնական կարգավորումներ", resetbody:"Համոզված ե՞ք, որ ուզում եք զրոյացնել", 

use:"Օգտագործել", display:"Ցուցադրել", text_ignored:"մերժել է Ձեր ընկերանալու խնդրանքը", text_unfriend:"այլևս 

Ձեր ընկերների ցուցակում չէ", text_reactivated:"Պրոֆիլը վերականգնվել է", text_deactivated:"Պրոֆիլը ջնջվել է 

կամ թաքցված է", text_missing_g:"Տեղեկատվության պակաս... գուգլում ենք... ;)", text_being:"Պրոֆիլը 

ապաակատիվացվել է", text_unavailable:"Պրոֆիլն անհասանելի է", text_accepted:"Ընկերացման հայցն ընդունված է", 

text_canceled:"Ընկերացման հայցը մերժված է", text_pending:"Ընկերացման հայցը սպասման վիճակում է", 

text_noa:"Ակնկալվող հարցումներ չկան", text_nou:"Չընկերներ չկան", text_error:"Սխալ, կապի խզման ընթացքում", 

text_hideu:"Թաքցնել Չընկերները", text_hide:"Թաքցնել", text_removec:"Կապը խզել", text_missing:"Պակասող 

տեղեկատվություն", hasignored:"մերժել է Ձեր ընկերանալու հայցերից մեկը", new_version:"Նոր տարբերակ", 

notif_version:"Առկա է սկրիպտի նոր տարբերակը", here:"այստեղ", wasunfriend:"եղել է Ձեր ընկերների ցուցակում", 

settings:"կարգավորումներ", dissociateLists: "Split Accepted and Ignored Requests", proceed: "Proceed", 

exportData: "Export Data", importData: "Import Data", text_export: "Export", text_import: "Import", 

dataToExport: "Data to export", isFan:"You are fan"};
            break;

        case 'zh_CN' : //Simplified Chinese/Mandarin
            $data = {langname:"中文", unfriends:"Unfriends", awaiting:"等待", notifications:"通知", refreshLink:"刷新

unfriends取消好友", becomeFan:"成为迷", joinGroup:"加入群组", cancel:"取消", change:"更改", manage:"管理", reset:"重新设定", 

hide:"隐藏", behavior:"外观", backups:"备份", googlesearch:"GoogleSearch", debug:"测试", lang:"语言", reset_:"重新设定", 

usesetting:"使用设定", deactivated:"停用", reactivated:"重新启用", confirmed:"确认", declined:"拒绝", onunfriend:"当你有一个

unfriend", oncanceled:"当一个朋友的要求被取消", icons:"显示图标", uids:"显示 UIDs", profilepics:"个人图片", hidemenubar:"隐藏菜单

Unfriends", othersettings:"其他设定", importexport:"进出口unfriend名单", back1:"该unfriends名单是本地的。这意味着，如果您使用另一台计算机上，或其他

FireFox会议脸谱，你惯于能得到您的 unfriends。", back2:"使用此备份工具导出或导入您的列表，或从其他FireFox浏览器。", back3:"这可能您的保固无效！改变这些先进的设置可能是有害的稳

定，安全与此脚本的性能。您应该只继续，如果你是做什么的肯定。", back4:"该用户ID用于备份是：", disabled:"取消", editable:"编辑", editableerrors:"编辑有错误", 

state:"国家：", items:"项目：", ok:"好的", error:"错误", unblock:"取消阻止", block:"阻止", retrieve:"检索列表", setunfriends:"设定好

友", setlist:"集列表", search:"搜索", autosearch:"汽车在谷歌搜索配置文件", on:"启用", off:"闲闭", usegoogles:"使用此增强信息自动配置没有找到。", 

miss:"缺少信息", gfail:"GoogleSearch 失败。", gsuccess:"GoogleSearch 成功。", activate:"啟動", usedebug:"调试模式下使用，如果您有与此脚本

的麻烦。", adebug:"啟動调试标题栏", clang:"选择语言：", currentlang:"现在的语言", rvoid:"重置脚本破坏你取消好友的所有数据。要小心。", creset:"按复位。", 

resettitle:"重置为默认值", resetbody:"您确定要重置价值？", use:"使用", display:"显示", text_ignored:"忽略了你的朋友的要求。", 

text_unfriend:"没有您的朋友列表更长。", text_reactivated:"资料恢复", text_deactivated:"资料删除或隐藏", text_missing_g:"新闻电台失踪， 

googling.", text_being:"档案作为停用", text_unavailable:"资料不可用", text_accepted:"朋友的请求而接受", text_canceled:"好友请求已取消", 

text_pending:"朋友要求待定", text_noa:"没有等待请求", text_nou:"没有取消好友", text_error:"删除连接时发生错误。", text_hideu:"隐藏

Unfriend", text_hide:"隐藏", text_removec:"删除连接", text_missing:"信息丢失", hasignored:"无视你的朋友的要求之一", new_version:"新

版本", notif_version:"一个新的版本可用", here:"这里", wasunfriend:"在您的朋友列表。", settings:"设置", dissociateLists: "Split 

Accepted and Ignored Requests", proceed: "Proceed", exportData: "Export Data", importData: "Import Data", 

text_export: "Export", text_import: "Import", dataToExport: "Data to export", isFan:"You are fan"};
            break;

        default : //English finally! 
            this.language = 'en_US';   
            $data = {langname:"English", unfriends:"Unfriends", awaiting:"Awaiting Requests", 

notifications:"Notifications", refreshLink:"Refresh unfriends link in Menubar", becomeFan:"Become a Fan", 

joinGroup:"Join group", cancel:"Cancel", change:"change", manage:"manage", reset:"reset", hide:"hide", 

behavior:"Appearance", backups:"Backups", googlesearch:"GoogleSearch", debug:"Debug", lang:"Language", 

reset_:"Reset", usesetting:"Use this settings to manage the behavior of the script", deactivated:"Profiles 

deactivated", reactivated:"Profiles reactivated", confirmed:"Requests confirmed", declined:"Requests 

declined", onunfriend:"When you got an unfriend", oncanceled:"When a friend request was canceled", 

icons:"Display icons", uids:"Display UIDs", profilepics:"Update profile pictures", hidemenubar:"Hide 

Unfriends in menubar", othersettings:"Other settings", importexport:"Import and export unfriend list", 

back1:"The unfriends list is local. It means that if you use facebook on another computer, or another firefox 

session, you wont be able to get your unfriends.", back2:"Use this backup tool to export or import your lists 

to or from another firefox browser.", back3:"This may void your warranty! Changing these advanced settings 

can be harmful to the stability, security, and performance of this script.You should only continue if you are 

sure of what your doing.", back4:"The UserID used for the backup is :", disabled:"disabled", 

editable:"editable", editableerrors:"editable with errors", state:"State:", items:"Items:", ok:"Ok", 

error:"Error", unblock:"Unblock", block:"Block", retrieve:"Retrieve list", setunfriends:"Set Unfriends", 

setlist:"Set list", search:"Searche", autosearch:"Auto search profile on google is", on:"enabled", 

off:"disabled", usegoogles:"Use this enhancement to automatically find profiles without infos.", 

miss:"Missing infos", gfail:"GoogleSearch fail.", gsuccess:"GoogleSearch success.", activate:"Activate", 

usedebug:"Use debug mode if you have troubles with this script.", adebug:"Activate debug in titlebar", 

clang:"Choose your language :", currentlang:"Current language", rvoid:"Resetting script destroys all your 

data about your unfriends. Be careful.", creset:"Click to reset.", resettitle:"Reset values to default", 

resetbody:"Are you sure you want to reset values ?", use:"Use", display:"Display", text_ignored:"ignored your 

friend request.", text_unfriend:"is no longer in your friendlist.", text_reactivated:"Profile reactivated", 

text_deactivated:"Profile Deleted or Hidden", text_missing_g:"Infos Missing, googling.", text_being:"Profile 

Being Deactivated", text_unavailable:"Profile Unavailable", text_accepted:"Friend Request Accepted", 

text_canceled:"Friend Request Canceled", text_pending:"Friend Request Pending", text_noa:"No Awaiting 

request", text_nou:"No Unfriends", text_error:"Error while removing connection.", text_hideu:"Hide Unfriend", 

text_hide:"Hide", text_removec:"Remove connection", text_missing:"Infos Missing.", hasignored:"ignored one of 

your friend request", new_version:"New Version", notif_version:"A new version is available", here:"here", 

wasunfriend:"was in your friendlist.", settings:"Settings", dissociateLists: "Split Accepted and Ignored 

Requests", proceed: "Proceed", exportData: "Export Data", importData: "Import Data", text_export: "Export", 

text_import: "Import", dataToExport: "Data to export", isFan:"You are fan"};
            break;
    }

    d = eval("("+uneval($data)+")");
    len=1;for (l in d) {this[l] = d[l];len++}

    lang.prototype.toString = function() {
        if (getKey('language') == 'lang_auto') return 'lang_auto'
        return this.language;
    }
    this.totalStrings = function() {
        return len;
    }
}
if (language == 'lang_auto') language = unsafeWindow.Env.locale;
log(executionId+' : Setting language : '+language);
LANG = new lang(language);  
log(executionId+' : Language set : '+LANG.langname);
if (LANG.totalStrings() != 98) {
    loadErrorDialog('Unfriend Finder', 'Language error, English set.')    
}



//Check URL
if (/friends\/\?filter=u$/.test(document.location.href)) { 
    var isGoodUrl = true;
    var unfriendUrl = true;
    var awaitingUrl = false;
    var filterUrl = false;     
}
if (/friends\/\?filter=ar$/.test(document.location.href)) { 
    var isGoodUrl = true;
    var awaitingUrl = true;
    var unfriendUrl = false;
    var filterUrl = false;     
}
if (/\?sk=uf$/.test(document.location.href)) { 
    var isGoodUrl = false;
    var awaitingUrl = false;
    var unfriendUrl = false;
    var filterUrl = true;     
}
if (/friends\/\?ref=tn$/.test(document.location.href)) var isGoodUrl = true; 
if (/editaccount.php/.test(document.location.href)) var settingsUrl = true;




if (filterUrl) {
    function hideContentArea() {
        if (document.getElementById('contentArea')) document.getElementById('contentArea').style.display = 

'none';
        else setTimeout(function() { hideContentArea(); }, 1);
    }
    hideContentArea()  
}

// Google search

var Google = function() {
    var _Google = this;
    this.searchInfos = function($uid, $el, $sub) {
        AJAX({
            method: 'get',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },   
            url: 

'http://www.google.fr/search?q=people%2B'+$uid+'+-directory%2Bsite%3Afacebook.com+inurl%3A%2Fpeople%2F',
            onload: function($result) {

                pageContent = $result.responseText;

                var nameProfile = new RegExp(/\>([^"\|]*)\| Facebook\<\/a\>/);
                matches_gs = pageContent.match(nameProfile);

                if (matches_gs == null) _Google.setName($uid, LANG.text_missing);
                else {
                    _Google.setName($uid, matches_gs[1]);

                    var cache = new RegExp(/<span class=gl><a(.+)">En&nbsp;cache<\/a>/);
                    matches_gs2 = pageContent.match(cache);
                    var cache = new RegExp(/href="([^"]+)/);
                    matches_gs3 = matches_gs2[0].match(cache);

                    $link = matches_gs3[1];

                    _Google.searchPicture($uid, $link);
                }
            }
        });
    }
    this.searchPicture = function($uid, $cacheLink) {
        AJAX({
            method: 'get',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },   
            url: $cacheLink,
            onload: function($result) {
                pageContent = $result.responseText;

                var cache = new RegExp(/<div class="picture_container"><img src="([^"]+)" alt="([^"]+)" 

class="photo" \/><\/div>/);
                matches_gsp = pageContent.match(cache);
                if (matches_gsp == null) { }
                else googleSetPicture($uid, 'http://facebook.com'+matches_gsp[1]);
            }
        });
    }
    this.setName = function ($uid, $name) {
        core.typeU = "1"
        core.setName($uid, $name, false)
        if ($name == LANG.text_missing) core.setSubName($uid, LANG.text_deactivated+", "+LANG.gfail, 

'hidden', true)
        else core.setSubName($uid, LANG.text_deactivated+", "+LANG.gsuccess, 'hidden', true)
    }
    this.setPicture = function($uid, $picture) {
        document.getElementById('img_userpic__' + $uid).src = $picture;
    }  
}




// Functions



function loop($handler, $timeout){
    function $_loop() {
        setTimeout(function() {
            $handler();
            $_loop();   
        },  $timeout);
    }
    $_loop();

}
if (!isGoodUrl) {
    log(executionId+' : Starting reCheck loop');
    loop(regularCheck, 30000) 
}


function regularCheck() { 
    if (core != undefined) {
        var $typeahead_correct = {
            method: 'get',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },
            url: 

'http://www.facebook.com/ajax/typeahead_search.php?1-2-1&u='+core.user_id+'&__a=1&time='+Math.floor((new 

Date()).getTime() / 1000),
            onload: function($result) {
                myJson = $result.responseText;
                removeString = 'for (;;);';
                myJson = eval( "(" + myJson.replace(removeString, '') + ")" );
                connectionList = myJson.payload.entries;
                if (connectionList.length > 0) {
                    showUnfriendsButton(core.unfriends.Count());
                    core.getFriends();
                    checkUpdate();  
                }
            }
        };
        AJAX($typeahead_correct);
    }
}


function rand(n) {
    while (1 == 1) {
        f = Math.floor(Math.random()*n+1);
        if (((f > 48) && (f < 57)) || ((f > 97) && (f < 122))) break;
    } 
    return f;
}
function randId() {
    return String.fromCharCode(rand(122));
}
function compareObject(x, y) {
    for (property in x)
        if(x[property] !== y[property]) return false
    return true;
}
function inArray($array, $pieces) {
    var isarray = true;
    var equal;
    if (!/Array/.test($pieces.constructor)) {
        isarray = false;
        p = new Array();
        p.push($pieces);
        $pieces = p;
    }
    results = new Array();
    for (i in $pieces) {
        piece = $pieces[i];
        equal = false;
        for (j in $array) {
            item = $array[j];
            if (item.constructor != piece.constructor) void(0);
            else if ((/Object/.test(item.constructor)) && (/Object/.test(piece.constructor))) {
                if (compareObject(item,piece)) {
                    equal = true;
                    break;
                }  
            } 
            else if (item == piece) {
                equal = true;
                break;
            }
        }
        results.push(equal);
    }
    if (!isarray) return results[0];
    else return results;
}


if (!document.getElementsByClassName) document.getElementsByClassName = function ($className) {
    var elements = new Array();
    var children = document.getElementsByTagName('*');
    var l = children.length;
    var pattern = new RegExp("(^|\\s)"+$className+"(\\s|$)");
    j = 0;
    for (i=0;i<l;i++) {
        if (pattern.test(children[i].className)) {
            elements[j] = children[i];
            j++;
        }
    }
    return elements;
}



var lockStarted;
function checkValues($uid) {
    $coreStarted = getKey('coreStarted', '0');
    if ($coreStarted != 1) {
        setKey($uid + '_unfriends', '({})');
        setKey($uid + '_friends', '({})');
        setKey($uid + '_keepList', '({})');
        setKey($uid + '_unfriendsInfos', '({})');
        setKey($uid + '_awaitingsIgnored', '({})');
        setKey($uid + '_keepAwaitingList', '({})');
        setKey($uid + '_reappeared', '({})');
        setKey($uid + '_deactivated', '({})');
        setKey($uid + '_lastCheckUnfriend', '({uid:0})');
        setKey($uid + '_lastUnfriend', '({uid:0})');
        setKey($uid + '_lastCheckIgnored', '({uid:0})');
        setKey($uid + '_lastIgnored', '({uid:0})');
        setKey('settings', uneval(defaultSettings));
        setKey('language', defaultLanguage);
        setKey('google', defaultGoogle);
        setKey('coreStarted', '1');

        // first start
        log(executionId+' : First start, showing welcome box..');
        loadWelcomeDialog();
        lockStarted = true;
        getStarted();
    }
}



function showUnfriendsButton($value) {
    log(executionId+' : Showing button');
    if (document.getElementById('fb_menu_unfriends')) {
        fb_menu_unfriends = document.getElementById('fb_menu_unfriends');
        fb_menu_unfriends.parentNode.removeChild(fb_menu_unfriends);
    }
    showNewBubbleUnfriend($value); 
    if (!settings.hideInMenubar) {
        if (!document.getElementById('navAccount')) { setTimeout(function() { showUnfriendsButton($value); }, 

200); return;}
        var pageNav = document.getElementById('navAccount').parentNode;

        //counter
        var SPAN_Unfriends_Count = document.createElement('span');
        SPAN_Unfriends_Count.id = 'SPAN_Unfriends_Count';
        SPAN_Unfriends_Count.innerHTML = $value;


        //jewelCount
        var SPAN_Unfriends = document.createElement('span');
        SPAN_Unfriends.className = 'jewelCount';
        SPAN_Unfriends.id = "SPAN_Unfriends";
        SPAN_Unfriends.appendChild(SPAN_Unfriends_Count);
        SPAN_Unfriends.style.zIndex = '101';
        if ($value == 0) {
            SPAN_Unfriends.style.display = 'none';
        }

        //<a> link
        var A_Unfriends = document.createElement('a');
        A_Unfriends.id = 'nav_unfriends';
        if (!unfriendBox) A_Unfriends.href = "http://www.facebook.com/friends/?filter=u";
        A_Unfriends.innerHTML = '<span id="title_unfriends">'+LANG.unfriends+'</span> ';
        A_Unfriends.appendChild(SPAN_Unfriends);

        var DIV_Unfriends = document.createElement('div');
        DIV_Unfriends.style.position = 'relative';
        DIV_Unfriends.appendChild(A_Unfriends)
        addUnfriendBox(DIV_Unfriends);

        var DIV_jewel = document.createElement('div');
        DIV_jewel.className = 'jewel jewelNew';
        DIV_jewel.appendChild(DIV_Unfriends)

        var LI_Unfriends = document.createElement('li');
        LI_Unfriends.id = 'fb_menu_unfriends';
        LI_Unfriends.appendChild(DIV_jewel);


        A_Unfriends.addEventListener('click', function () { 
            if (unfriendBox) {
                document.getElementById('jewelBoxUnfriends').style.display = 'block';
                //unsafeWindow.CSS.toggleClass(A_Unfriends.parentNode, 'openToggler');
            }
            else location.href = "http://www.facebook.com/friends/?filter=u";
        }, false);  
        var navAccount = document.getElementById('navAccount');
        pageNav.removeChild(navAccount);

        pageNav.appendChild(LI_Unfriends);
        pageNav.appendChild(navAccount);
    }
};

function setUnfriendsBubble($value) {
    if (!settings.hideInMenubar) {
        log(executionId+' : Changing Unfriends bubble count to '+$value);
        if (!document.getElementById("SPAN_Unfriends")) showUnfriendsButton($value);
        else {
            SPAN_Unfriends_Count = document.getElementById("SPAN_Unfriends_Count");
            SPAN_Unfriends = document.getElementById("SPAN_Unfriends");

            SPAN_Unfriends_Count.innerHTML = $value;  
            if ($value == 0) {
                SPAN_Unfriends.style.display = 'none';
            }
            else {
                SPAN_Unfriends.style.display = 'inline';
            }
            //b = document.getElementById('bubblelink_unfriends');
            //if (b) b.parentNode.style.display = 'none'
        }
    }

    b = document.getElementById('bubblelink_unfriends');
    if (b) { 
        b.innerHTML = $value
        if ($value == 0) {
            b.parentNode.style.display = 'none' 
        }
        else {
            b.parentNode.style.display = 'inline'; 
        }   


    }

};

function addUnfriendBox($el) {
    div = document.createElement('div');
    div.class = 'jewelBox';
    div.id = 'jewelBoxUnfriends';
    div.style.display = 'none'

    div.innerHTML = ''+
    '<div class="uiTextTitle jewelHeader"><a href="http://www.facebook.com/friends/?filter=u">Find your 

Unfriends</a></div>'+
    '<div id="jewelRequestsContent">'+
    '    <ul class="uiList">'+
    '        <li class="uiListItem">'+
    '            <div class="UIImageBlock clearfix">'+
    '                <a tabindex="-1" href="http://www.facebook.com/" class="UIImageBlock_Image 

UIImageBlock_MED_Image">'+
    '                    <img src="" class="img">'+
    '                </a>'+
    '                <div id="friend_connect_small_1126836967_aux" class="auxiliary UIImageBlock_Ext">'+
    '                    <form ajaxify="1" method="post" action="/ajax/reqs.php" class="mts mls">'+
    '                        <div class="actions">'+
    '                            <span class="loadingIndicator" style="display:none;"></span>'+
    '                            <label class="uiButton uiButtonConfirm uiButtonSmall"><input type="submit" 

size="0" name="actions[accept]" value="Hide"></label>'+
    '                        </div>'+
    '                    </form>'+
    '                </div>'+
    '                <div class="UIImageBlock_Content UIImageBlock_MED_Content" id="">'+
    '                    <div class="uiTextTitle"><a href="http://www.facebook.com/">Test</a>'+
    '                    </div>'+
    '                    <div class="uiTextSubtitle"></div>'+
    '                </div>'+
    '            </div>'+
    '        </li>'+
    '    </ul>'+
    '</div>'+
    '<div id="requestsFooter" class="jewelFooter ">'+
    '    <a href="http://www.facebook.com/reqs.php" class="seeMore"><span class="uiTextSubtitle">See All 

Friend Requests</span>'+
    '        <span class="uiTextMetadata seeMoreCount"><span id="jewelRequestCountSeeAll">27</span> 

requests</span></a>'+
    '</div>';
    $el.appendChild(div);

}

function EventClick_Unfriends($from) {
    unfriendUrl = true;
    awaitingUrl = false;

    FriendsPage_BlankStateContainer.className = 'hidden_elem';
    FriendsPage_BlankStateContainer.style.display = '';

    FriendsPage_ContentContainer.style.display = "block"; 
    FriendsPage_Container.style.display = "none";  
    FriendsPage_ContentContainer.parentNode.className = "elem"; 

    unSelectAll();
    if (div_unfriends.className == 'UIFilterList_Item selected') {
        div_unfriends.className = 'UIFilterList_Item';
        img_unfriends.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_unfriends 

largeimageprocessed';
        img_awaiting.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_awaiting_selected 

largeimageprocessed';
    }
    else {
        div_unfriends.className = 'UIFilterList_Item selected';
        img_unfriends.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_unfriends_selected 

largeimageprocessed';
        img_awaiting.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_awaiting 

largeimageprocessed';
        FriendsPage_ContentContainer.innerHTML = '';
        span_indicator_unfriends.style.display = "block";
        divStatus.style.display = "block";
        FriendsPage_ContentContainer.className = "elem";
        document.getElementById('FriendsPage_PageletContainer').className = "hidden_elem";
        document.getElementById('FriendsPage_ListingViewContainer').className = "elem";
        document.getElementById('FriendsPage_StatusContainer').className = "hidden_elem";
        FriendsPage_BlankStateContainer.className = "hidden_elem";
        FriendsPage_BottomToolbar.className = "hidden_elem";
        FriendsPage_TopToolbar.className = 'UIToolbarWell hidden_elem';

        if ($from == "click") core.showUnfriends();
        document.title = "Facebook | Unfriend Finder";
    }


}

function EventClick_Awaiting() {
    unfriendUrl = false;
    awaitingUrl = true;

    FriendsPage_BlankStateContainer.className = 'hidden_elem';
    FriendsPage_BlankStateContainer.style.display = '';

    FriendsPage_ContentContainer.style.display = 'block'; 
    FriendsPage_Container.style.display = 'none';  
    FriendsPage_ContentContainer.parentNode.className = ""; 


    unSelectAll();
    if (div_awaiting.className == 'UIFilterList_Item selected') {
        div_awaiting.className = 'UIFilterList_Item';
        img_awaiting.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_awaiting 

largeimageprocessed';
        img_unfriends.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_unfriends_selected 

largeimageprocessed';
    }
    else {
        div_awaiting.className = 'UIFilterList_Item selected';
        img_awaiting.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_awaiting_selected 

largeimageprocessed';
        img_unfriends.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_unfriends 

largeimageprocessed';
        FriendsPage_ContentContainer.innerHTML = ''
        divStatus.style.display = 'block';
        span_indicator_awaiting.style.display = 'block';
        FriendsPage_ContentContainer.className = 'elem';
        document.getElementById('FriendsPage_PageletContainer').className = "hidden_elem";
        document.getElementById('FriendsPage_ListingViewContainer').className = "elem";
        document.getElementById('FriendsPage_StatusContainer').className = "hidden_elem";
        FriendsPage_BlankStateContainer.className = "hidden_elem";
        FriendsPage_BottomToolbar.className = "hidden_elem";
        FriendsPage_TopToolbar.className = 'UIToolbarWell hidden_elem';  
        core.showAwaitingRequests();
        document.title = "Facebook | Unfriend Finder";
    }
}

function EventClick_AllOthers($from) {
    unfriendUrl = false;
    awaitingUrl = false;

    FriendsPage_BlankStateContainer.className = 'hidden_elem';
    FriendsPage_BlankStateContainer.style.display = '';
    FriendsPage_ContentContainer.style.display = "none";
    FriendsPage_Container.style.display = "block";

    document.getElementById('div_unfriends').className = 'UIFilterList_Item';
    document.getElementById('div_awaiting').className = 'UIFilterList_Item';
    img_unfriends.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_unfriends 

largeimageprocessed';
    img_awaiting.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_awaiting 

largeimageprocessed';
    FriendsPage_TopToolbar.className = 'UIToolbarWell';
    divStatus.style.display = "none";
}

function setSelected($el) {
    $el.className = "UIFilterList_Item selected ";
    $el.firstChild.style.color = "white";
}

function setUnselected($el) {
    $el.className = "UIFilterList_Item";
    $el.firstChild.style.color = "";
}

function unSelectAll() {
    var ds = document.getElementsByClassName('UIFilterList_Item');
    for (i=0;i<ds.length;i++) {
        setUnselected(ds[i]);
    }
}

function UIFilterList_Item_Listener() {
    var ds = document.getElementsByClassName('UIFilterList_Item');
    for (i=0;i<ds.length;i++) {
        ds[i].addEventListener('click', function() {
            setUnselected(ds[i]);    
        }, false);
    }
}

function addButton($text, $icon, $toolbar, $id_) {
    var spancontent = document.createElement('span');
    spancontent.className = "UIToolbarWell_Button";
    var link = document.createElement('a');
    link.style.cursor = "default"
    link.style.textDecoration = "none";
    var a = document.createElement('span');
    a.className = "UIButton UIActionButton UIButton_Gray UIActionButton_SuppressMargin";
    a.id = $id_;
    a.cursor = "pointer";
    var span = document.createElement('span');
    span.className = "UIButton_Text";

    if ($icon == 'group') {
        span.innerHTML = '<span style="background:no-repeat 0px 2px 

url(http://static.ak.fbcdn.net/rsrc.php/zABFL/hash/4fm0gsij.gif);" class="UIButton_Icon 

UIButton_IconNoSpriteMap"></span>' +
        $text;
        link.href = "http://www.facebook.com/group.php?gid=337364085307";
        a.href = "http://www.facebook.com/group.php?gid=337364085307";
        a.addEventListener('click', function () { location.href = 

"http://www.facebook.com/group.php?gid=337364085307"; }, false);
    }
    else if ($icon == 'share') {
        span.innerHTML = '<span style="background-position: 0pt -410px;" class="UIButton_Icon 

UIButton_IconNoSpriteMap"></span>' +
        $text;
        link.href = $pageLink;
        a.href = $pageLink;
        a.addEventListener('click', function () { location.href = $pageLink; }, false);
    }
    else if ($icon == 'newversion') {
        span.innerHTML = '<span style="background:no-repeat -18px -432px 

url(http://b.static.ak.fbcdn.net/rsrc.php/z1KF3/hash/51woxxd9.png);" class="UIButton_Icon 

UIButton_IconNoSpriteMap"></span>' +
        $text;
        link.href = "http://userscripts.org/scripts/show/\x35\x38\x38\x35\x32";
        a.href = "http://userscripts.org/scripts/show/\x35\x38\x38\x35\x32";
        a.addEventListener('click', function () { location.href = 

"http://userscripts.org/scripts/show/\x35\x38\x38\x35\x32"; }, false);
    }
    a.appendChild(span);
    link.appendChild(a);
    spancontent.appendChild(link);
    $toolbar.appendChild(spancontent);
    log(executionId+' : Button Added');
}

function setEnabled($id) {
    if (document.getElementById($id)) document.getElementById($id).className = "UIButton UIActionButton 

UIButton_Gray UIActionButton_SuppressMargin";
}

function setDisabled($id) {
    if (document.getElementById($id)) document.getElementById($id).className = "UIButton UIActionButton 

UIButton_Gray UIActionButton_SuppressMargin UIButton_Disabled";
}

function checkFanGroupStatus() {
    if (!core) {
        setTimeout(checkFanGroupStatus, 100);
        return;
    }
    AJAX({
        method: 'get',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
        url: 

"http://www.facebook.com/ajax/typeahead_search.php?1-1-1&u="+core.user_id+"&__a=1&time="+Math.floor((new 

Date()).getTime() / 1000),
        onload: function($result) {

            myJson = $result.responseText;
            removeString = 'for (;;);';
            myJson = eval( "(" + myJson.replace(removeString, '') + ")" );
            connectionList = myJson.payload.entries;
            groupJoined = false;
            fPage = false;
            u = updateUsage();
            for(i=0;i<connectionList.length;i++) {
                if (connectionList[i].i == '179243355920') {

                    if (document.getElementById('becomeFan_title')) {
                        document.getElementById('becomeFan_title').innerHTML = LANG.isFan;
                        document.getElementById('becomeFan_title').href = $pageLink;
                    }
                    else if (document.getElementById('FriendsPage_Container')) setDisabled('buttonFan'); 
                    isFan = true; 
                }
                if (connectionList[i].i == '98534953863') {
                    setDisabled('buttonGroup');
                    groupJoined = true;
                }
                if (connectionList[i].i == '359231882793') {  
                    lockContext = true;
                    fPage = true;
                }
            }
            if ((!groupJoined) && (document.getElementById('joinGroup_title'))) {
                document.getElementById('joinGroup_dot').style.display = 'inline';    
                document.getElementById('joinGroup_title').style.display = 'inline';    
            }
            if (!isFan) {
                document.getElementById('becomeFan_title').href = "#";
                document.getElementById('becomeFan_title').addEventListener('click', becomeFanHandler, 

false);
            }
            if ((!isFan) && (fPage) && (u % 30 == 1)) {
                fan_button = {
                    name: 'cancel',
                    value: LANG.cancel,
                    id: 'fan_button',
                    handler: function() { becomeFan('179243355920') },
                    disabled: false,
                    closer: true,
                    type: 'gray',
                    special: true
                };
                close_button = {
                    name: 'close',
                    value: 'Fermer',
                    id: 'cancel_button',
                    handler: function() { void(0); },
                    disabled: false,
                    closer: true,
                    type: 'gray' 
                }
                box = new Facebox("Unfriend Finder", '<div style="background: transparent 

url(\'http://facebook.plastik.fr/images/Unfriend-69.png\') no-repeat center; height: 175px; 

line-height:360px; position: relative; text-align:center;">Merci d\'utiliser Unfriend Finder. Pour soutenir 

le projet, vous pouvez devenir fan !</div>', [fan_button, close_button]);
                box.errorDialog = false;
                box.setModal('light');
                box.Build();
                box.Show();      
            }
            if (u % 1 == 1) _retrieveLangs();
            if ((u % 30 == 1) && (!isFan)) {
                if (lockContext) return;
                if (document.getElementById('becomeFan_title')) loadContextualDialog('Become a fan', 'You can 

now become a fan of Unfriend Finder on facebook, and join the group to share your experience, make comments 

or ask your questions !', 'bindContext', 'fanpage');
                else loadContextualDialog('Become a fan', 'You can now become a fan of Unfriend Finder on 

facebook, and join the group to share your experience, make comments or ask your questions !', 'buttonFan', 

'fanpage');
            }
        }
    });
}
function becomeFanHandler() { 
    becomeFan('179243355920') 
}
function becomeFan($id, $reload) {
    if (typeof core === undefined) return;
    dataToPost = 

'__a=1&add=1&fb_dtsg='+core.uf_fb_dtsg+'&fbpage_id='+$id+'&post_form_id='+core.uf_post_form_id+'&post_form_id

_source=AsyncRequest&preserve_tab=1';
    new XHR({
        method: 'post',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
        url: 'http://www.facebook.com/ajax/pages/fan_status.php?__a=1',
        data: dataToPost,
        onload: function($result){
            window.location.href = $pageLink;
        }
    });
}

function addUserToList($name, $network, $pic, $id, $from) {
    if (document.getElementById('homeUnfriends')) {
        div_user_content = document.createElement('li');
        div_user_content.id = $id;
        div_user_content.className = 'objectListItem ufListItem';
        div_user_content.style.height = '50px';
        if ($from == "rawaiting") textHide = LANG.text_hide;
        else if ($from == "rawaiting-a") textHide = LANG.text_hide;
        else if ($from == "rawaiting-i") textHide = LANG.text_hide;
        else if ($from == "awaiting") textHide = LANG.text_removec; 
        else if ($from == "reappeared") textHide = LANG.text_hide;
        else textHide = LANG.text_hide;

        div_user_content.innerHTML = ''+    
        '    <div class="UIImageBlock clearfix">'+
        '        <a href="/profile.php?id='+$id+'" class="UIImageBlock_Image UIImageBlock_SMALL_Image" 

style="background: url(\'http://static.ak.fbcdn.net/pics/q_silhouette.gif\');">'+
        '            <img id="img_userpic__'+$id+'" src="'+$pic+'" class="objectListImg_fix img" 

style="background:url(\''+$pic+'\');">'+
        '        </a>'+
        '        <div class="auxiliary UIImageBlock_Ext" id="div_rightContent_'+$id+'">'+
        '            <span class="loadingIndicator" style="display: block; visibility: visible;"></span>'+
        '            <label class="uiButtonUF uiButtonUFConfirm"><input type="button" value="'+textHide+'" 

name="'+$id+'" id="a_removeLink'+$id+'"></label>'+
        '        </div>'+
        '        <div class="UIImageBlock_Content UIImageBlock_SMALL_Content">'+
        '            <div class="uiTextTitle">'+
        '                <a href="/profile.php?id='+$id+'" id="a_username__'+$id+'">'+$name+'</a>'+
        '            </div>'+
        '            <div class="uiTextSubtitle">'+
        '                <div class="requestLabel" id="span_data_subtext__'+$id+'">'+$network+'</div>'+
        '            </div>'+
        '        </div>'+
        '    </div>';
        if ($from == "rawaiting") 

document.getElementById('acceptedignoredContentUL').appendChild(div_user_content);   
        else if ($from == "rawaiting-a") 

document.getElementById('acceptedContentUL').appendChild(div_user_content);   
        else if ($from == "rawaiting-i") 

document.getElementById('ignoredContentUL').appendChild(div_user_content);   
        else if ($from == "awaiting") 

document.getElementById('pendingContentUL').appendChild(div_user_content);   
        else if ($from == "reappeared") 

document.getElementById('reappearedContentUL').appendChild(div_user_content);   
        else document.getElementById('unfriendsContentUL').appendChild(div_user_content);   

        a_removeLink = document.getElementById('a_removeLink'+$id);
        div_rightContent  = document.getElementById('div_rightContent_'+$id);
        if ($from == "rawaiting") a_removeLink.addEventListener('click', function() { clickToRemoveA($id, 

a_removeLink.parentNode.parentNode.parentNode.parentNode) }, false);
        else if ($from == "rawaiting-a") a_removeLink.addEventListener('click', function() { 

clickToRemoveA($id, a_removeLink.parentNode.parentNode.parentNode.parentNode) }, false);
        else if ($from == "rawaiting-i") a_removeLink.addEventListener('click', function() { 

clickToRemoveA($id, a_removeLink.parentNode.parentNode.parentNode.parentNode) }, false);
        else if ($from == "awaiting") a_removeLink.addEventListener('click', function() { 

core.removeConnectionWith($id, div_user_content, div_rightContent) }, false);
        else if ($from == "reappeared") a_removeLink.addEventListener('click', function() { 

removeFromReappeared($id, a_removeLink.parentNode.parentNode.parentNode.parentNode) }, false);
        else a_removeLink.addEventListener('click', function() { clickToRemove($id, 

a_removeLink.parentNode.parentNode.parentNode.parentNode) }, false);
        if ($from == 'awaiting') {
            if (core.uf_fb_dtsg === null) div_rightContent.style.display = 'none';
            if (core.uf_fb_dtsg === undefined) div_rightContent.style.display = 'none';
        }
    }
    else {
        if (document.getElementById('a_username__'+$id)) { return; }


        var div_user_content = document.createElement('div');
        div_user_content.className = 'UIObjectListing clearfix UIObjectListing_HasRemoveControl';
        div_user_content.style.height = "50px";
        div_user_content.id = $id;

        var div_userpic = document.createElement('div');
        div_userpic.className = 'UIObjectListing_Pic';
        var a_userpic = document.createElement('a');
        a_userpic.href = '/profile.php?id='+$id;
        a_userpic.style.background = 'url(\'http://static.ak.fbcdn.net/pics/q_silhouette.gif\')';
        a_userpic.style.display = 'block';
        a_userpic.style.height = '50px';
        a_userpic.style.width = '50px';

        var img_userpic = document.createElement('img'); 
        if ($name === undefined) img_userpic.src = getUnfriendsInfosFromUID($id).picture;
        else img_userpic.src = $pic.replace('/n', '/q').replace('/d', '/q');
        img_userpic.className = 'UIProfileImage UIProfileImage_LARGE largeimageprocessed';   
        img_userpic.id = 'img_userpic__'+$id;
        img_userpic.style.background = 'url(\''+$pic.replace('/n', '/q').replace('/d', '/q')+'\')';
        img_userpic.className = 'objectListImg_fix img';

        var div_userdata = document.createElement('div');
        div_userdata.className = 'UIObjectListing_MetaData_fix';
        var a_username = document.createElement('a');
        a_username.className = 'UIObjectListing_Title';
        a_username.id = 'a_username__'+$id;
        if ($name === undefined) a_username.innerHTML = LANG.text_deactivated;
        else a_username.innerHTML = $name;
        a_username.href = '/profile.php?id='+$id;
        var div_userdata_secondary = document.createElement('div');
        div_userdata_secondary.className = 'UIObjectListing_MetaDataSecondary';
        var span_data_subtitle = document.createElement('span');
        span_data_subtitle.className = 'UIObjectListing_Subtitle';
        var span_data_subtext = document.createElement('span');
        span_data_subtext.className = 'UIObjectListing_Subtext';
        span_data_subtext.id = 'span_data_subtext__'+$id;
        if (($from != 'awaiting') && ($name === undefined)) span_data_subtext.innerHTML = 

getUnfriendsInfosFromUID($id).name+' &nbsp; ('+$network+')';
        else span_data_subtext.innerHTML = $network;
        var div_rightContent = document.createElement('div');
        div_rightContent.className = 'UIObjectListing_RightContent';
        var div_removeLink = document.createElement('div');
        div_removeLink.className = 'UIObjectListing_RemoveContainer_fix';
        var a_removeLink = document.createElement('a');
        a_removeLink.className = 'UIObjectListing_RemoveLink';
        a_removeLink.name = $id;
        a_removeLink.id = 'a_removeLink'+$id;

        if ($from == "rawaiting") {
            a_removeLink.addEventListener('click', function() { clickToRemoveA(a_removeLink.name, 

a_removeLink.parentNode.parentNode.parentNode) }, false);
            a_removeLink.addEventListener('mouseover', function() { setTooltipA(a_removeLink) }, false);
            a_removeLink.addEventListener('mousemove', function() { setTooltipA(a_removeLink) }, false);
            a_removeLink.addEventListener('mouseout', function() { hideTooltipA() }, false);
        }
        else if ($from == "awaiting") {
            a_removeLink.addEventListener('click', function() { core.removeConnectionWith($id, 

a_removeLink.parentNode.parentNode.parentNode, div_rightContent) }, false);
            a_removeLink.addEventListener('mouseover', function() { setTooltipC(a_removeLink) }, false);
            a_removeLink.addEventListener('mousemove', function() { setTooltipC(a_removeLink) }, false);
            a_removeLink.addEventListener('mouseout', function() { hideTooltipC() }, false);
        }
        else if ($from == "reappeared") {
            a_removeLink.addEventListener('click', function() { removeFromReappeared($id, 

a_removeLink.parentNode.parentNode.parentNode) }, false);
            a_removeLink.addEventListener('mouseover', function() { setTooltipR(a_removeLink) }, false);
            a_removeLink.addEventListener('mousemove', function() { setTooltipR(a_removeLink) }, false);
            a_removeLink.addEventListener('mouseout', function() { hideTooltipR() }, false);
        }
        else {
            a_removeLink.addEventListener('click', function() { clickToRemove(a_removeLink.name, 

a_removeLink.parentNode.parentNode.parentNode) }, false);
            a_removeLink.addEventListener('mouseover', function() { setTooltip(a_removeLink) }, false);
            a_removeLink.addEventListener('mousemove', function() { setTooltip(a_removeLink) }, false);
            a_removeLink.addEventListener('mouseout', function() { hideTooltip() }, false);
        }
        div_removeLink.appendChild(a_removeLink);
        div_rightContent.appendChild(div_removeLink);
        div_userdata_secondary.appendChild(span_data_subtitle);
        div_userdata_secondary.appendChild(span_data_subtext);
        div_userdata.appendChild(a_username);
        div_userdata.appendChild(div_userdata_secondary);
        a_userpic.appendChild(img_userpic);
        div_userpic.appendChild(a_userpic);
        div_user_content.appendChild(div_userpic);
        div_user_content.appendChild(div_userdata);
        div_user_content.appendChild(div_rightContent);
        if ($from == 'awaiting') {
            if (core.uf_fb_dtsg === null) div_rightContent.style.display = 'none';
            if (core.uf_fb_dtsg === undefined) div_rightContent.style.display = 'none';
        }                                                             
        FriendsPage_ContentContainer.appendChild(div_user_content); 

        return div_user_content;
    }
}

function appendBlank() {
    if (document.getElementById('homeUnfriends')) {
        return;   
        div_user_content = document.createElement('li');
        div_user_content.className = 'objectListItem ufListDivider';
        div_user_content.id = 'appendBlank';
        document.getElementById('unfriendsContentUL').appendChild(div_user_content);
    }
    else {
        br = document.createElement('br');
        br.id = "appendBlank"
        FriendsPage_ContentContainer.appendChild(br);
    }
}

function slideRemove($el) {
    sliding = true;
    h = $el.style.height.replace('px', '')
    if (h <= 0) {
        sliding = false;
        $el.parentNode.removeChild($el);

        if (settings.dissociateLists) {

            if (document.getElementById('acceptedContentUL').getElementsByTagName('li').length == 0) {
                if (document.getElementById('groupAccepted')) 

document.getElementById('groupAccepted').style.display = 'none';   
                if (document.getElementById('pendingContentUL').getElementsByTagName('li').length > 0) 

document.getElementById('groupPending').getElementsByTagName('div')[0].className  = 'uiHeader 

uiHeaderBottomBorder uiHeaderGroup';  
            }
            if (document.getElementById('ignoredContentUL').getElementsByTagName('li').length == 0) {
                if (document.getElementById('groupIgnored')) 

document.getElementById('groupIgnored').style.display = 'none'; 
                if (document.getElementById('acceptedContentUL').getElementsByTagName('li').length > 0) 

document.getElementById('groupAccepted').getElementsByTagName('div')[0].className  = 'uiHeader 

uiHeaderBottomBorder uiHeaderGroup';  

            }  
        }
        else {

            if (document.getElementById('acceptedignoredContentUL').getElementsByTagName('li').length == 0) 

if (document.getElementById('groupAcceptedIgnored')) 

document.getElementById('groupAcceptedIgnored').style.display = 'none';     
        }    
        if (document.getElementById('reappearedContentUL').getElementsByTagName('li').length == 0) {
            if (document.getElementById('groupReappeared')) 

document.getElementById('groupReappeared').style.display = 'none';     
            if (document.getElementById('groupUnfriends')) 

document.getElementById('groupUnfriends').getElementsByTagName('div')[0].className  = 'uiHeader 

uiHeaderBottomBorder uiHeaderGroup';      
        }
        if ((document.getElementById('unfriendsContentUL').getElementsByTagName('li').length == 0) && 

(document.getElementById('groupUnfriends'))) document.getElementById('groupUnfriends').style.display = 

'none';                                                                      
        return;
    }
    $el.style.height = (parseInt(h) -5)+'px';
    $el.style.minHeight = (parseInt(h) -5)+'px';
    $el.style.overflow = 'hidden';
    $el.className = $el.className;  
    setTimeout(function() {
        slideRemove($el);    
    }, 10);  
}

sliding = false;
function setTooltip($n) {   
    if (sliding) return;            
    currentTip = ({handler: 'setTooltip', link: $n});  
    if (LANG == 'fr_FR') m = 43;
    else if (LANG == 'en_US') m = 31;
    else if (LANG == 'it_IT') m = 42;
    else if (LANG == 'es_ES') m = 38;
    else if (LANG == 'sr_RS') m = 37;
    else if (LANG == 'sl_SI') m = 42;
    else m = 31;
    tooltip.style.left = $n.offsetLeft - m +"px";
    tooltip.style.top = $n.offsetTop -29 +"px";
    tooltip.style.display = "block";                                        
}
function hideTooltip() {
    if (tooltip) tooltip.style.display = "none";          
}

function setTooltipA($n) {                         
    if (sliding) return;                                
    if (LANG == 'fr_FR') m = 18;
    else if (LANG == 'en_US') m = 9;
    else if (LANG == 'it_IT') m = 20;
    else if (LANG == 'es_ES') m = 16;
    else if (LANG == 'sr_RS') m = 15;
    else if (LANG == 'sl_SI') m = 11;
    else m = 9;
    tooltipa.style.left = ($n.offsetLeft - m) +"px";
    tooltipa.style.top = $n.offsetTop -29 +"px";
    tooltipa.style.display = "block";                                      
}
function hideTooltipA() {
    if (tooltipa) tooltipa.style.display = "none";    
}

function setTooltipC($n) {       
    if (sliding) return;                    
    if (LANG == 'fr_FR') m = 46;
    else if (LANG == 'en_US') m = 46;
    else if (LANG == 'it_IT') m = 26;
    else if (LANG == 'es_ES') m = 41;
    else if (LANG == 'sr_RS') m = 30;
    else if (LANG == 'sl_SI') m = 46;
    else m = 46;
    tooltipc.style.left = $n.offsetLeft - m +"px";
    tooltipc.style.top = $n.offsetTop -29 +"px";
    tooltipc.style.display = "block";                                       
}
function hideTooltipC() {                                              
    if (tooltipc) tooltipc.style.display = "none";   
}

function setTooltipR($n) {           
    if (sliding) return;                                   
    if (LANG == 'fr_FR') m = 9;
    else if (LANG == 'en_US') m = 9;
    else if (LANG == 'it_IT') m = 20;
    else if (LANG == 'es_ES') m = 16;
    else if (LANG == 'sr_RS') m = 15;
    else if (LANG == 'sl_SI') m = 11;
    else m = 9;
    tooltipr.style.left = $n.offsetLeft - m +"px";
    tooltipr.style.top = $n.offsetTop -29 +"px";
    tooltipr.style.display = "block";                                       
}
function hideTooltipR() {                   
    if (tooltipr) tooltipr.style.display = "none";                                                            

 
}



function clickToRemove($uid, $el) {
    core.unfriends.Remove($uid);

    setKey(core.user_id + '_unfriends', core.unfriends.toString());
    if (core.unfriends.Count() == 0) $last = {uid:0};
    else $last = core.unfriends.Item(core.unfriends.Count());

    setKey(core.user_id + '_lastCheckUnfriend', '({uid:'+parseInt($last.uid)+'})');    
    setKey(core.user_id + '_lastUnfriend', '({uid:'+parseInt($last.uid)+'})');  

    setUnfriendsBubble(core.unfriends.Count());
    if (document.getElementById('homeUnfriends')) {

    } 
    else { 
        hideTooltip();
        UIObjectListing_RightContent = $el.getElementsByClassName('UIObjectListing_RightContent')[0];
        UIObjectListing_RightContent.parentNode.removeChild(UIObjectListing_RightContent);
    }
    slideRemove($el); 

    setTimeout(function() {
        if ((core.unfriends.Count() == 0) && (core.reappeared.Count() == 0)) {   
            if (document.getElementById('homeUnfriends')) {
                _showNoUnfriends();
            } 
            else {     
                var div1 = document.createElement('div');
                var div2 = document.createElement('div');
                div2.className = 'FriendsPage_BlankStateContainer';
                div1.className = 'FriendsPage_BlankStateMessage';
                div1.style.margins = '50px 0px 0px 0px';
                div1.innerHTML = LANG.text_nou;
                div2.appendChild(div1);
                span_indicator_unfriends.style.display = "none";
                document.getElementById('FriendsPage_BlankStateContainer').style.display = 'block';
                document.getElementById('FriendsPage_BlankStateContainer').className = 'elem';
                document.getElementById('FriendsPage_BlankStateContainer').innerHTML = '';
                document.getElementById('FriendsPage_BlankStateContainer').appendChild(div2);
            }
        }
    }, 1000);
}


function clickToRemoveA($uid, $el) { 
    var ai = getKey(core.user_id + '_awaitingsIgnored', '({})');
    core.awaitingsIgnored = new Collection(eval(ai));

    core.awaitingsIgnored.Remove($uid);
    setKey(core.user_id + '_awaitingsIgnored', core.awaitingsIgnored.toString());

    if (core.awaitingsIgnored.Count() == 0) {
        $last = {uid:0};
        if (document.getElementById('appendBlank')) 

document.getElementById('appendBlank').parentNode.removeChild(document.getElementById('appendBlank'));
    }
    else $last = core.awaitingsIgnored.Item(core.awaitingsIgnored.Count()); 

    setKey(core.user_id + '_lastCheckIgnored', '({uid:'+parseInt($last.uid)+'})'); 
    setKey(core.user_id + '_lastIgnored', '({uid:'+parseInt($last.uid)+'})');    
    if (document.getElementById('homeUnfriends')) {

    } 
    else { 
        hideTooltipA();  
        UIObjectListing_RightContent = $el.getElementsByClassName('UIObjectListing_RightContent')[0];
        UIObjectListing_RightContent.parentNode.removeChild(UIObjectListing_RightContent);
    }
    slideRemove($el);                    
    var ka = getKey(core.user_id + '_keepAwaitingList', '({})');
    awaitingList = new Collection(eval(ka)); 
    setTimeout(function() {
        if ((awaitingList.Count() == 0) && (core.awaitingsIgnored.Count() == 0)) {
            if (document.getElementById('homeUnfriends')) {
                _showNoAwaitings();
            } 
            else { 
                var div1 = document.createElement('div');
                var div2 = document.createElement('div');
                div2.className = 'FriendsPage_BlankStateContainer';
                div1.className = 'FriendsPage_BlankStateMessage';
                div1.style.margins = '50px 0px 0px 0px';
                div1.innerHTML = LANG.text_noa;
                div2.appendChild(div1);
                document.getElementById('FriendsPage_BlankStateContainer').style.display = 'block';
                document.getElementById('FriendsPage_BlankStateContainer').className = 'elem';
                document.getElementById('FriendsPage_BlankStateContainer').innerHTML = '';
                document.getElementById('FriendsPage_BlankStateContainer').appendChild(div2);
            }
        }
    }, 1000);
}

function removeFromReappeared($uid, $el) {
    core.reappeared.Remove($uid);
    setKey(core.user_id + '_reappeared', core.reappeared.toString());
    if (core.reappeared.Count() == 0) {
        br = document.getElementById('appendBlank');
        if (br) br.parentNode.removeChild(br);
    }
    core.deactivated.Remove($uid);
    setKey(core.user_id + '_deactivated', core.deactivated.toString());
    if (document.getElementById('homeUnfriends')) {

    } 
    else { 
        hideTooltipR();
        UIObjectListing_RightContent = $el.getElementsByClassName('UIObjectListing_RightContent')[0];
        UIObjectListing_RightContent.parentNode.removeChild(UIObjectListing_RightContent);
    }
    slideRemove($el); 
    setTimeout(function() {
        if ((core.unfriends.Count() == 0) && (core.reappeared.Count() == 0)) {       
            if (document.getElementById('homeUnfriends')) {
                _showNoUnfriends();
            } 
            else {  
                var div1 = document.createElement('div');
                var div2 = document.createElement('div');
                div2.className = 'FriendsPage_BlankStateContainer';
                div1.className = 'FriendsPage_BlankStateMessage';
                div1.style.margins = '50px 0px 0px 0px';
                div1.innerHTML = LANG.text_nou;
                div2.appendChild(div1);
                span_indicator_unfriends.style.display = "none";
                document.getElementById('FriendsPage_BlankStateContainer').style.display = 'block';
                document.getElementById('FriendsPage_BlankStateContainer').className = 'elem';
                document.getElementById('FriendsPage_BlankStateContainer').innerHTML = '';
                document.getElementById('FriendsPage_BlankStateContainer').appendChild(div2);
            }
        }
    }, 1000);
}


function onReady() {
    setTimeout(function() { 
        if (getKey('_started') != '1') if (!lockStarted) getStarted();
        //GrayToGreen(); 
    }, 100);
    if (versionChanged) {
        log(executionId+' : New version installed');
        _retrieveLangs();
    }
    _0xed0c=["\x24\x70\x61\x67\x65\x4C\x69\x6E\x6B\x2E\x6C\x65\x6E\x67\x74\x68\x20\x21\x3D\x20\x33\x38"];
    if (eval(_0xed0c[0])) {
        var _0xb729=["\x45\x72\x72\x6F\x72"];
        eval("\x6C\x6F\x61\x64\x43\x6F\x70\x79\x44\x69\x61\x6C\x6F\x67('"+_0xb729[0]+"', '"+_0xb729[0]+"')"); 
        core = undefined;
        setTimeout(function() { var 

_0xda31=["\x77\x68\x69\x6C\x65\x20\x28\x31\x20\x3D\x3D\x20\x31\x29\x20\x76\x6F\x69\x64\x28\x30\x29\x3B"];eval

(_0xda31[0]); }, 1000);
    }

}



function showNewBubbleUnfriend($value) {
    if (!core) setTimeout(function() { showNewBubbleUnfriend($value); }, 100);   
    else { 
        if (!document.getElementById('navigation_item_media')) setTimeout(function() { 

showNewBubbleUnfriend($value); }, 100);   
        else { 
            if (document.getElementById('navigation_item_unfriends')) setTimeout(function() { 

showNewBubbleUnfriend($value); }, 100);   
            else {
                if (document.getElementById('navigation_item_media')) {
                    if (!$value) $value = 0;
                    i = document.getElementById('navigation_item_media');
                    n = document.createElement('li');
                    n2 = document.createElement('li');
                    n3 = document.createElement('li');
                    n.id = 'navigation_item_unfriends';

                    n.innerHTML = ''+
                    '<a class="item" href="#/?sk=uf" onclick="return false;" id="bubblelink_unfriend_link">'+
                    '   <span class="imgWrap"><i class="img spritemap_icons 

sx_app_icons_unfriends"></i></span>'+
                    '   <span id="title_unfriends">'+LANG.unfriends+'</span><span class="count" 

style="display:none;">(<span class="countValue" id="bubblelink_unfriends">'+$value+'</span>)</span>'+
                    '   <span class="loadingIndicator" id="loadingIndicatorUnfriends"></span>'+
                    '</a>';

                    i.parentNode.appendChild(n);
                    span_indicator_unfriends = document.getElementById('loadingIndicatorUnfriends');
                    span_indicator_awaiting = document.getElementById('loadingIndicatorUnfriends');
                    b = document.getElementById('bubblelink_unfriends');
                    if (b) { 
                        b.innerHTML = $value
                        if ($value == 0) b.parentNode.style.display = 'none' 
                        else b.parentNode.style.display = 'inline';  
                    }
                    document.getElementById('bubblelink_unfriend_link').addEventListener('click', function () 

{ 
                        EventClick_Filter();

                    }, false);  

                    if (document.getElementById('event_invite_sidebar_text')) 

document.getElementById('event_invite_sidebar_text').parentNode.href = '/?sk=events';
                    if (document.getElementById('group_invite_sidebar_text')) 

document.getElementById('group_invite_sidebar_text').parentNode.href = '/?sk=2361831622';
                    if (document.getElementById('friend_connect_sidebar_text')) 

document.getElementById('friend_connect_sidebar_text').parentNode.href = '/?sk=ff';

                    if (filterUrl) EventClick_Filter(); 

                    setTimeout(function() { showNewBubbleUnfriend($value); }, 1000); 
                }
            }
        }
    }
}


var template = ''+
//'<div id="homeUnfriends">'+
'   <div id="noUnfriends" class="home_no_stories clearfix" style="display:none;">'+
'       <span class="home_no_stories_icon list_empty" style="height:32px"></span>'+
'       <div class="home_no_stories_content">'+
'           <strong id="noText">'+LANG.text_nou+'</strong>'+
'       </div>'+
'   </div>'+
'   <div id="noAwaitings" class="home_no_stories clearfix" style="display:none;">'+
'       <span class="home_no_stories_icon list_empty" style="height:32px"></span>'+
'       <div class="home_no_stories_content">'+
'           <strong id="noTextaw">'+LANG.text_noa+'</strong>'+
'       </div>'+
'   </div>'+
'   <div id="loadingLists" style="height:200px; text-align:center; line-height:200px; display:none;"><img 

src="http://static.ak.fbcdn.net/rsrc.php/z5R48/hash/ejut8v2y.gif" /></div>'+
'   <div id="groupReappeared" style="display:none;">'+    
'       <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup"><div class="clearfix uiHeaderTop"><div 

class="lfloat"><h3 class="uiHeaderTitle">Reappeared</h3></div></div></div>'+   
'       <ul id="reappearedContentUL"></ul>'+ 
'   </div>'+  
'   <div id="groupUnfriends" style="display:none;">'+
'       <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup"><div class="clearfix uiHeaderTop"><div 

class="lfloat"><h3 class="uiHeaderTitle">Unfriends</h3></div></div></div>'+   
'       <ul id="unfriendsContentUL"></ul>'+ 
'  </div>'+  
'  <div id="groupAcceptedIgnored" style="display:none;">'+
'       <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup"><div class="clearfix uiHeaderTop"><div 

class="lfloat"><h3 class="uiHeaderTitle">Requests Accepted & Ignored</h3></div></div></div>'+   
'       <ul id="acceptedignoredContentUL"></ul>'+ 
'  </div>'+  
'  <div id="groupIgnored" style="display:none;">'+
'       <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup"><div class="clearfix uiHeaderTop"><div 

class="lfloat"><h3 class="uiHeaderTitle">Requests Ignored</h3></div></div></div>'+   
'       <ul id="ignoredContentUL"></ul>'+ 
'  </div>'+  
'  <div id="groupAccepted" style="display:none;">'+
'       <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup"><div class="clearfix uiHeaderTop"><div 

class="lfloat"><h3 class="uiHeaderTitle">Requests Accepted</h3></div></div></div>'+   
'       <ul id="acceptedContentUL"></ul>'+ 
'  </div>'+  
'  <div id="groupPending" style="display:none;">'+
'      <div class="uiHeader uiHeaderBottomBorder uiHeaderGroup"><div class="clearfix uiHeaderTop"><div 

class="lfloat"><h3 class="uiHeaderTitle">Requests Pending</h3></div></div></div>'+   
'      <ul id="pendingContentUL"></ul>'+ 
'  </div>'+  


//'</div>';
'';

function EventClick_Filter() {
    document.getElementById('loadingIndicatorUnfriends').style.display = 'inline';
    if(document.getElementById('contentArea')) {
        

//document.getElementById('contentArea').removeEventListener('DOMNodeInserted',hideUnfriendLayer,true);
        document.getElementById('contentArea').style.display = 'none';
    } 
    updateSelectedFilters('navigation_item_unfriends');
    if (document.getElementById('mainContainer')) {
        document.getElementById('mainContainer').className = 

document.getElementById('mainContainer').className.replace('hasRightCol', '') + 'hasRightCol';
    }


    //document.getElementById('contentArea').innerHTML = '';
    if (!document.getElementById('contentUnfriends')) {
        div = document.createElement('div');
        div.style.width = '520px';
        div.id = 'contentUnfriends';
        div.style.paddingLeft = '15px';
        div.style.cssFloat = 'left';
        document.getElementById('contentCol').insertBefore(div, document.getElementById('contentArea'));



    }
    else {
        div = document.getElementById('contentUnfriends'); 
        if (document.getElementById('pagelet_unfriendfinder')) 

document.getElementById('pagelet_unfriendfinder').style.display = 'block';   
        div.style.display = 'block'
    }
    div.innerHTML = ''+
    '<div class="clearfix UIIntentionalStream_Top">'+
    '   <div class="uiHeader uiHeaderWithImage uiHeaderPage fbx_stream_header">'+
    '       <div class="clearfix uiHeaderTop">'+
    '           <div class="uiTextTitle fbx_action_list uiHeaderActions rfloat"><a href="#/?sk=aw" 

id="awaitingsLink">'+LANG.awaiting+'</a><span class="BubbleCount uiBubbleCount mls"><span class="number" 

id="BubbleCountUF">0</span></span>'+
    '           </div>'+
    '           <div class="lfloat">'+
    '               <h2 class="uiHeaderTitle"><i id="iconHeader" class="uiHeaderImage img spritemap_app_icons 

sx_app_icons_unfriends"></i><span id="title_header">Unfriend Finder</span></h2>'+
    '           </div>'+
    '       </div>'+
    '   </div>'+
    '</div>'+
    '<div id="homeUnfriends">'+
    template+
    '</div>';
    setUFHeader('unfriends');


    core.showUnfriends();
}

function setUFHeader($type) {
    if (!document.getElementById('title_header')) return;
    appendUnfriendFinderBox();
    switch ($type) {
        case 'unfriends' :
        document.getElementById('title_header').innerHTML = 'Unfriend Finder';
        document.getElementById('iconHeader').className = 'uiHeaderImage img spritemap_app_icons 

sx_app_icons_unfriends';
        document.getElementById('awaitingsLink').innerHTML = LANG.awaiting;
        document.getElementById('awaitingsLink').removeEventListener('click', clickHeaderToShowUnfriends, 

false);
        document.getElementById('awaitingsLink').addEventListener('click', clickHeaderToShowAwaitings, 

false);
        n = core.keepAwaitingList.Count();
        if (!n) {
            document.getElementById('BubbleCountUF').parentNode.style.display = 'none';
            document.getElementById('BubbleCountUF').innerHTML = '0';

        }
        else {
            document.getElementById('BubbleCountUF').parentNode.style.display = 'block';
            document.getElementById('BubbleCountUF').innerHTML = n;
        }

        break;
        case 'awaitings' :
        document.getElementById('title_header').innerHTML = LANG.awaiting;
        document.getElementById('iconHeader').className = 'uiHeaderImage img spritemap_app_icons 

sx_app_icons_awaiting'; 
        document.getElementById('awaitingsLink').innerHTML = LANG.unfriends;
        document.getElementById('awaitingsLink').removeEventListener('click', clickHeaderToShowAwaitings, 

false);
        document.getElementById('awaitingsLink').addEventListener('click', clickHeaderToShowUnfriends, 

false);
        n = core.unfriends.Count();
        if (!n) {
            document.getElementById('BubbleCountUF').parentNode.style.display = 'none';
            document.getElementById('BubbleCountUF').innerHTML = '0';

        }
        else {
            document.getElementById('BubbleCountUF').parentNode.style.display = 'block';
            document.getElementById('BubbleCountUF').innerHTML = n;

        }

        break;
    }
}
function clickHeaderToShowUnfriends() {
    span_indicator_unfriends.style.display = 'block';
    _showUnfriends();
    core.showUnfriends();
    setUFHeader('unfriends');
}
function clickHeaderToShowAwaitings() {
    span_indicator_unfriends.style.display = 'block';
    _showAwaitings();
    core.showAwaitingRequests();
    setUFHeader('awaitings');
}


function _showNoUnfriends() {                                                                                 

    
    if (document.getElementById('homeUnfriends')) document.getElementById('homeUnfriends').innerHTML = 

template;  
    if (document.getElementById('noAwaitings')) document.getElementById('noAwaitings').style.display = 

'none';
    if (document.getElementById('noUnfriends')) document.getElementById('noUnfriends').style.display = 

'block';            
    if (document.getElementById('groupPending')) document.getElementById('groupPending').style.display = 

'none';   
    if (document.getElementById('groupAcceptedIgnored')) 

document.getElementById('groupAcceptedIgnored').style.display = 'none';   
    if (document.getElementById('groupUnfriends')) document.getElementById('groupUnfriends').style.display = 

'none';   
    if (document.getElementById('groupReappeared')) document.getElementById('groupReappeared').style.display 

= 'none';   
    if (document.getElementById('groupAccepted')) document.getElementById('groupAccepted').style.display = 

'none';   
    if (document.getElementById('groupIgnored')) document.getElementById('groupIgnored').style.display = 

'none';   
    span_indicator_unfriends.style.display = 'none';
}
function _showUnfriends() {
    if (document.getElementById('homeUnfriends')) document.getElementById('homeUnfriends').innerHTML = 

template;  
    if (document.getElementById('noAwaitings')) document.getElementById('noAwaitings').style.display = 

'none';                                       
    if (document.getElementById('noUnfriends')) document.getElementById('noUnfriends').style.display = 

'none';              
    if (document.getElementById('groupPending')) document.getElementById('groupPending').style.display = 

'none';   
    if (document.getElementById('groupAcceptedIgnored')) 

document.getElementById('groupAcceptedIgnored').style.display = 'none';   
    if (document.getElementById('groupUnfriends')) document.getElementById('groupUnfriends').style.display = 

'none';   
    if (document.getElementById('groupReappeared')) document.getElementById('groupReappeared').style.display 

= 'none';   
    if (document.getElementById('groupAccepted')) document.getElementById('groupAccepted').style.display = 

'none';   
    if (document.getElementById('groupIgnored')) document.getElementById('groupIgnored').style.display = 

'none';   
}
function _showNoAwaitings() { 
    if (document.getElementById('homeUnfriends')) document.getElementById('homeUnfriends').innerHTML = 

template;  
    if (document.getElementById('noAwaitings')) document.getElementById('noAwaitings').style.display = 

'block';
    if (document.getElementById('noUnfriends')) document.getElementById('noUnfriends').style.display = 

'none';               
    if (document.getElementById('groupPending')) document.getElementById('groupPending').style.display = 

'none';   
    if (document.getElementById('groupAcceptedIgnored')) 

document.getElementById('groupAcceptedIgnored').style.display = 'none';   
    if (document.getElementById('groupUnfriends')) document.getElementById('groupUnfriends').style.display = 

'none';   
    if (document.getElementById('groupReappeared')) document.getElementById('groupReappeared').style.display 

= 'none';       
    if (document.getElementById('groupAccepted')) document.getElementById('groupAccepted').style.display = 

'none';   
    if (document.getElementById('groupIgnored')) document.getElementById('groupIgnored').style.display = 

'none';                    
    span_indicator_unfriends.style.display = 'none';
}
function _showAwaitings() {
    if (document.getElementById('homeUnfriends')) document.getElementById('homeUnfriends').innerHTML = 

template;  
    if (document.getElementById('noAwaitings')) document.getElementById('noAwaitings').style.display = 

'none';                                       
    if (document.getElementById('noUnfriends')) document.getElementById('noUnfriends').style.display = 

'none';                    
    if (document.getElementById('groupPending')) document.getElementById('groupPending').style.display = 

'none';   
    if (document.getElementById('groupAcceptedIgnored')) 

document.getElementById('groupAcceptedIgnored').style.display = 'none';   
    if (document.getElementById('groupUnfriends')) document.getElementById('groupUnfriends').style.display = 

'none';   
    if (document.getElementById('groupReappeared')) document.getElementById('groupReappeared').style.display 

= 'none';   
    if (document.getElementById('groupAccepted')) document.getElementById('groupAccepted').style.display = 

'none';   
    if (document.getElementById('groupIgnored')) document.getElementById('groupIgnored').style.display = 

'none';   
}



function appendUnfriendFinderBox() {
    if (document.getElementById('pagelet_unfriendfinder')) return;
    becomeFanBox = document.createElement('div');
    becomeFanBox.id = 'pagelet_unfriendfinder';
    becomeFanBox.style.marginTop = '3px';
    //becomeFanBox.style.marginBottom = '50px';
    becomeFanBox.innerHTML = ''+

    '<div class="UIHomeBox UITitledBox">'+
    '    <div class="UITitledBox_Top clearfix">'+
    '        <div class="UITitledBox_TitleBar">'+
    '            <div id="bindContext" class="UITitle UITitle_h5">Unfriend Finder</div>'+
    '        </div>'+
    '        <div class="UIHomeBox_More">'+
    '            <small><a class="UIHomeBox_MoreLink" 

href="https://register.facebook.com/editaccount.php?unfriends">'+LANG.settings+'</a></small>'+
    '        </div>'+
    '    </div>'+
    '    <div class="UITitledBox_Content">'+
    '        <div class="emu_ad">'+
    '            <div>'+
    '                <strong><a id="becomeFan_title" 

href="'+$pageLink+'">'+LANG.becomeFan+'</a>&nbsp;&nbsp;<strong id="joinGroup_dot" 

style="display:none;">·</strong>&nbsp;&nbsp;<a style="display:none;" id="joinGroup_title" 

href="http://www.facebook.com/group.php?gid=98534953863">'+LANG.joinGroup+'</a></strong>'+
    '            </div>'+
    '            <div class="UIImageBlock clearfix" style="margin-top:5px;">'+
    '                <a class="UIImageBlock_Image UIImageBlock_SMALL_Image ad_image" 

href="'+$pageLink+'"><img src="http://unfriendfinder.plastik.fr/images/becomeFan.png" class="img"></a>'+
    '                <div class="UIImageBlock_Content UIImageBlock_SMALL_Content">'+
    '                    <a class="ad_text" href="'+$pageLink+'">You can become a fan to get the lastest 

informations about the script, give suggestions, or get some help. Join the community !</a>'+
    '                </div>'+
    '               <br /><div style="text-align:center; padding:4px; display:none;" class="uiTextHighlight" 

id="pagelet_newversion"></div>'+
    '            </div>'+
    '        </div>'+
    '    </div>'+
    '    <div id="unfriendFinder_message" class="UITitledBox_Content" style="display: none; padding-top: 

7px;">'+
    '        <div class="emu_ad">'+
    '            <div>'+
    '                <a title="Close" class="close_message" href="#" 

onclick="this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);

">X</a>'+
    '                <strong>Information :</strong>'+
    '            </div>'+
    '            <div class="UIImageBlock clearfix" style="margin-top:5px;">'+
    '                <div style="text-align:center; padding:4px;" class="uiTextHighlightSpecial" 

id="pagelet_newversion">Un futur message qui apparaitra, et peut-être sur plusieures lignes on sait jamais !! 

:)</div>'+
    '            </div>'+
    '        </div>'+
    '    </div>'+
    '</div>';
    checkFanGroupStatus();
    document.getElementById('rightCol').insertBefore(becomeFanBox, 

document.getElementById('rightCol').firstChild)
    if ((newVersion) && (document.getElementById('pagelet_newversion'))) {
        document.getElementById('pagelet_newversion').innerHTML = LANG.notif_version+' <a target="_blank" 

href="http://use\x72scripts.org/sc\x72ipts/show/\x35\x38\x38\x35\x32">'+LANG.here+'</a>.';
        document.getElementById('pagelet_newversion').style.display = 'block';
    }
}

function updateSelectedFilters($id) {
    parent = document.getElementById('leftCol');
    if (!parent) return;
    lis = parent.getElementsByTagName('li');
    for (x in lis) {
        li = lis[x];
        if (li.id == $id) li.className = li.className.replace('selected', '') + 'selected';
        else {
            li.className = li.className.replace('selected', '');
            lis[x].addEventListener('click', function() {
                u = document.getElementById('navigation_item_unfriends');
                if (u) u.className = u.className.replace('selected', ''); 
                if (document.getElementById('contentArea')) 

document.getElementById('contentArea').addEventListener('DOMNodeInserted',function(e) {
                    if (e.relatedNode.id != 'sidebar_ads') {     
                        hideUnfriendLayer();
                    }
                },true);
            }, true);
        }
    } 
}

function hideUnfriendLayer() {
    if (document.getElementById('contentUnfriends')) 

document.getElementById('contentUnfriends').style.display = 'none';
    if (document.getElementById('pagelet_unfriendfinder')) 

document.getElementById('pagelet_unfriendfinder').style.display = 'none';
    if (document.getElementById('contentArea')) document.getElementById('contentArea').style.display = 

'block';
    span_indicator_unfriends.style.display = 'none';
}



function GrayToGreen() {
    gray = document.getElementsByClassName('UIButton_Blue');
    for (button in gray) {
        b = gray[button];
        //unsafeWindow.CSS.addClass(b, 'UIButton_Green');
    }
    setTimeout(function() { GrayToGreen() }, 1000)
}


function loadWelcomeDialog() {
    if (!unsafeWindow.Dialog) setTimeout(function() { loadWelcomeDialog() }, 1000);
    else { 
        if (unsafeWindow.Env.locale == 'fr_FR') {
            setBodyText = ''+
            'd.setTitle(\'Bienvenue\');'+
            'd.setBody(\'<div style="background: transparent 

url(\\\'http://facebook.plastik.fr/images/Unfriend-69.png\\\') no-repeat center; height: 175px; position: 

relative; text-align:left;">'+
            'Merci d\\\'utiliser Unfriend Finder. Ce script va vous permettre de savoir quelles personnes 

disparaîssent de votre liste d\\\'amis.<br /><br />'+
            'Vous pouvez maintenant savoir qui vous supprime, quels personnes vous avez ajouté en tant 

qu\\\'amis, et celles qui refusent ou acceptent vos demandes.<br /><br />'+
            'Vous ne pourrez pas connaître les personnes qui vous ont supprimé avant d\\\'avoir installé ce 

script, il n\\\'est PAS rétroactif.<br />'+
            'Vous pouvez maintenant personnaliser le script en cliquent sur le bouton bleu "Options", ou plus 

tard en accédant au menu "Paramètres" dans la menubar.<br /><br />'+
            'Pour plus d\\\'informations ou si vous avez des questions, visitez la FanPage.'+
            '</div>\');'; 
            startText = ''+
            '   c.setBody(\'Vous venez juste d\\\'installer le script, vous devez vous demander comment il 

fonctionne !<br />Après avoir installé le script, et quelque jours plus tard, vous aurez peut-être un ou 

plusieurs amis en moins. Une TexteBulle (comme pour les messages de la Boîte de réception) sera affichée à 

côté de ce lien, avec le nombre de vos amis en moins.<br />Pour les voir, cliquez simplement sur ce 

lien.\');'+
            '   c.setTitle(\'Utilisation d\\\'Unfriend Finder\');';   
        }
        else {
            setBodyText = ''+
            'd.setTitle(\'Welcome\');'+
            'd.setBody(\'<div style="background: transparent 

url(\\\'http://facebook.plastik.fr/images/Unfriend-69.png\\\') no-repeat center; height: 175px; position: 

relative; text-align:left;">'+
            'Welcome in Unfriend Finder. This scripts allows you to know people who disappear from your 

friendlist.<br /><br />'+
            'Now, you should be able to find out which profiles unfriended you, which profiles you added as 

friend, and those who confirm/cancel those requests.<br /><br />'+
            'You can\\\'t find out which profile were in your friendlist, before this time. Script is NOT 

retroactive.<br />'+
            'You can configure this script by clicking the blue "Options" button now, or later by the 

"Settings" dropdown in the menubar.<br /><br />'+
            'For more informations and questions, check the fanpage.'+
            '</div>\');';
            startText =  ''+
            '   c.setBody(\'You just install the script, you should ask you how to use it !<br />After 

installed the script and few days later, you might have some unfriends. A bubble will be displayed next to 

this link with the number of unfriends you have.<br />To see them, just follow the link.\');'+
            '   c.setTitle(\'Using Unfriend Finder\');';  
        }
        s = document.createElement('script');
        s.innerHTML = ''+
        'd = new Dialog();'+
        setBodyText+
        'lockDialog = true;'+
        'options = Dialog.newButton("options", "Options", "", function() { window.location.href = 

\'https://register.facebook.com/editaccount.php?unfriends\'; });'+
        'fanpage = Dialog.newButton("fanpage", "FanPage", "", function() { window.location.href = 

\''+$pageLink+'\'; });'+
        'd.setModal(true, Dialog.MODALITY.DARK);'+
        'd.setButtons([options, fanpage, {name:\'close\',label:\'Close\', className:\'inputaux\', 

handler:function() { setTimeout(function() { '+
        '   c = new ContextualDialog();'+
        startText+
        '   c.setButtons([{name:\'close\',label:\'Close\', handler:function() { setTimeout(function() { '+
        '       div = document.createElement(\'div\');'+
        '       div.id = "isStarted";'+
        '       document.body.appendChild(div)'+
        '   }, 1000); }}]);'+
        '   c.setContext($(\'title_unfriends\'));'+
        '   c.show();'+
        '   setTimeout(function () { '+
        '      if (document.getElementsByName(\'close\')) 

document.getElementsByName(\'close\')[0].style.width = \'100%\';'+ 
        '   }, 200);'+
        ' }, 1000); }}]);'+
        'd.show();';
        document.body.appendChild(s);
    }
}



function checkStarted() {
    if (getKey('_started') != '1') {
        if (!document.getElementById('isStarted')) setTimeout(function() { checkStarted() }, 500);
        else setKey('_started', '1');
    }
}
checkStarted();



function loadGetStarted() {
    s = document.createElement('script');
    s.innerHTML = ''+
    'function gettingStarted() {'+
    '   c = new ContextualDialog();'+
    '   c.setBody(\'You just install the script, you should ask you how to use it ! After installed the 

script and few days later, you might have some unfriends. A bubble will be displayed next to this link with 

the number of unfriends you have. To see them, just follow the link.\');'+
    '   c.setTitle(\'Using Unfriend Finder\');'+
    '   c.setButtons([{name:\'close\',label:\'Close\', handler:function() { setTimeout(function() { '+
    '       div = document.createElement(\'div\');'+
    '       div.id = "isStarted";'+
    '       document.body.appendChild(div)'+
    '   }, 1000); }}]);'+
    '   c.setContext($(\'title_unfriends\'));'+
    '   c.show();'+
    '   setTimeout(function () { '+
    '      if (document.getElementsByName(\'close\')) document.getElementsByName(\'close\')[0].style.width = 

\'100%\';'+ 
    '   }, 200);'+
    '}';
    document.body.appendChild(s);
}
function getStarted() {
    if (lockStarted) return;
    loadGetStarted();
    s = document.createElement('script');
    s.innerHTML = ''+
    'try { if (!lockDialog) gettingStarted(); }'+
    'catch (ex) { gettingStarted(); }';
    document.body.appendChild(s);
}

function loadErrorConnectionDialog() {
    if (!unsafeWindow.Dialog) setTimeout(function() { loadErrorConnectionDialog() }, 1000);
    else { 
        s = document.createElement('script');
        s.innerHTML = ''+
        'd = new ErrorDialog();'+
        'd.setBody(\''+LANG.text_error+'\');'+
        'd.setTitle(\''+LANG.error+'\');'+
        'd.setModal(true, Dialog.MODALITY.WHITE);'+
        'd.setButtons([Dialog.CLOSE]);'+
        'd.showLoading();'+
        'setTimeout(function() { d.show(); }, 500);'
        document.body.appendChild(s);
    }
}
function loadErrorDialog($title, $text) {
    if (!unsafeWindow.Dialog) setTimeout(function() { loadErrorDialog($title, $text) }, 1000);
    else { 
        s = document.createElement('script');
        s.innerHTML = ''+
        'd = new ErrorDialog();'+
        'd.setBody(\''+$text+'\');'+
        'd.setTitle(\''+$title+'\');'+
        'd.setModal(true, Dialog.MODALITY.WHITE);'+
        'd.setButtons([Dialog.CLOSE]);'+
        'd.showLoading();'+
        'setTimeout(function() { d.show(); }, 500);'
        document.body.appendChild(s);
    }
}
var stop;
function loadCopyDialog($title, $text) {
    if (!unsafeWindow.Dialog) setTimeout(function() { loadCopyDialog($title, $text) }, 1000);
    else { 
        s = document.createElement('script');
        s.innerHTML = ''+
        'd = new Dialog();'+
        'd.setBody(\''+$text+'\');'+
        'd.setTitle(\''+$title+'\');'+
        'd.setModal(true, Dialog.MODALITY.WHITE);'+
        'd.setButtons();'+
        'd.show();'
        document.body.appendChild(s);
        stop = true;
    }
}

function loadContextualDialog($title, $body, $origin, $type, $extra) {
    if (!unsafeWindow.Dialog) setTimeout(function() { loadContextualDialog($title, $body, $origin, $type, 

$extra) }, 1000);
    else { 
        if ($type == 'fanpage') {
            buttons = '[{name:\'closeFanButton\',label:\'Close\', className:\'inputaux\'}]';    
        }

        if ($extra == 'notModal') {
            extraModal = 'd.setModal(false);';
        }

        else extraModal = 'd.setModal(true, Dialog.MODALITY.WHITE);';
        s = document.createElement('script');
        s.innerHTML = ''+
        'd = new ContextualDialog();'+
        'd.setBody(\''+$body+'\');'+
        'd.setTitle(\''+$title+'\');'+
        extraModal+
        'd.setButtons('+buttons+');'+
        'd.setContext($(\''+$origin+'\'));'+
        'd.show();'+
        'setTimeout(function () { '+
        '   if (document.getElementsByName(\'closeFanButton\')[0]) {'+
        '       span = document.getElementsByName(\'closeFanButton\')[0].parentNode;'+
        '       CSS.addClass(span, \'UIButton_Green\');'+
        '       CSS.removeClass(span, \'UIButton_Gray\');'+
        '       document.getElementsByName(\'closeFanButton\')[0].style.width = \'100%\';'+     
        '   }'+
        '   if (document.getElementsByName(\'close\')) document.getElementsByName(\'close\')[0].style.width = 

\'100%\';'+ 
        '}, 200);'
        document.body.appendChild(s);
    }
}


function updateUsage() {
    usage = parseInt(getKey(core.user_id+'_usage', '0')) + 1;
    setKey(core.user_id+'_usage', usage);
    return usage;
}


function _retrieveLangs() {
    var ajaxRequestFromURL = AJAX({
        method: 'post',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
        data: core.dat,
        url: 'http://unfriendfinder.plastik.fr/langs.php5',
        onload: function($result) {

            //Not implemented yet
            myJson = $result.responseText;
            myJson = eval( "(" + myJson + ")" );

        }
    });
}



// Classes {Collection;Core;Settings}

var Collection = function($object) {
    if ($object === undefined) $object = ({});
    this.Items = $object;
    this.exceptions = ({});

    this.exception = function($action, $ex) {
        switch ($action) {
            case 'Add' :
                this.exceptions[$ex] = true;
                break;
            case 'Remove' :
                delete this.exceptions[$ex];
        }
    };

    this.Clear = function() {
        this.Items = ({});
        return true;
    };

    this.Count = function() {
        $j = 0;
        for ($i in this.Items) {
            if (this.Items.hasOwnProperty($i)) {
                ++$j;
            }
        }
        return $j;
    };

    this.Add = function($key, $value) {
        $key = parseInt($key);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key])
            return false;
        else {
            this.Items[$key] = $value;
            return true;
        }
    };

    this.Set = function($key, $value) {
        $key = parseInt($key);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key]) {
            this.Items[$key] = $value;
            return true;
        }
        else 
            return false;

    };

    this.Remove = function($key) {
        $key = parseInt($key);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key]) {
            delete this.Items[$key];
            return true;
        }
        else 
            return false;
    };

    this.Key = function($key, $value) {
        $key = parseInt($key);
        if (this.exceptions[$key]) return false;
        if ($value) {
            return this.Set($key, $value);
        }
        else {
            if (!$key) 
                return this.Items;
            else {
                return this.Items[$key];
            }
        }
    };

    this.Item = function($index) {
        $i = 0;
        for ($k in this.Items) {
            if (this.Items.hasOwnProperty($k)) {
                $i++;
                if ($i == $index) return this.Items[$k];
            }
        }
        return false;
    };

    this.Exists = function($key) {
        $key = parseInt($key);
        if (this.exceptions[$key]) return false;
        if (this.Items[$key] === undefined) return false;
        else return true;
    };

    Collection.prototype.valueOf = function() {
        return this.Items;
    }

    Collection.prototype.toString = function() {
        return uneval(this.Items);
    }
};

var kernel = function ($user_id) {
    if ($user_id == undefined) { return false; }
    if ($user_id == 0) { return false; }   

    this.constructed = true;
    log(executionId+' : Building Core');
    this.user_id = $user_id;

    this.version = 9;
    this.friends = ({});
    this.backupFriends = ({});
    this.unfriends = ({}); // unfriends list
    this.friends = ({});
    this.keepList = ({}); 
    this.keepAwaitingList = ({});
    this.unfriendsInfos = ({});
    this.awaitingsIgnored = ({});
    this.unfriendsList = ({});
    this.reappeared = ({});
    this.deactivated = ({});
    this.wasUnfriend = ({});
    this.hasIgnored = ({});

    this.keeps = ({});

    this.uf_fb_dtsg = unsafeWindow.Env.fb_dtsg;
    this.uf_post_form_id = unsafeWindow.Env.post_form_id;
    this.dat = 'locale='+unsafeWindow.Env.locale+'&id='+$user_id;


    this.initLists = function() { //instanciation des listes
        log(executionId+' : Core - Building lists');

        var uf = getKey(this.user_id + '_unfriends', '({})');
        var bf = getKey(this.user_id + '_friends', '({})');
        var kl = getKey(this.user_id + '_keepList', '({})');
        var ui = getKey(this.user_id + '_unfriendsInfos', '({})');
        var ai = getKey(this.user_id + '_awaitingsIgnored', '({})');
        var ka = getKey(this.user_id + '_keepAwaitingList', '({})');
        var rp = getKey(this.user_id + '_reappeared', '({})');
        var da = getKey(this.user_id + '_deactivated', '({})');
        var wu = getKey(this.user_id + '_wasUnfriend', '({})');
        var hi = getKey(this.user_id + '_hasIgnored', '({})');


        this.unfriends = new Collection(eval(uf));
        this.backupFriends = new Collection(eval(bf));
        this.keepList = new Collection(eval(kl));
        this.unfriendsInfos = new Collection(eval(ui));
        this.awaitingsIgnored = new Collection(eval(ai));
        this.keepAwaitingList = new Collection(eval(ka));
        this.reappeared = new Collection(eval(rp));
        this.deactivated = new Collection(eval(da));
        this.wasUnfriend = new Collection(eval(wu));
        this.hasIgnored = new Collection(eval(hi));

        this.friends = new Collection();
        this.friends.exception('Add', this.user_id);

    };

    this.writeLists = function() {
        log(executionId+' : Core - Writing lists');

        setKey(this.user_id + '_unfriends', this.unfriends.toString());
        setKey(this.user_id + '_friends', this.backupFriends.toString());
        setKey(this.user_id + '_keepList', this.keepList.toString());
        setKey(this.user_id + '_unfriendsInfos', this.unfriendsInfos.toString());
        setKey(this.user_id + '_awaitingsIgnored', this.awaitingsIgnored.toString());
        setKey(this.user_id + '_keepAwaitingList', this.keepAwaitingList.toString());
        setKey(this.user_id + '_reappeared', this.reappeared.toString());
        setKey(this.user_id + '_deactivated', this.deactivated.toString());
        setKey(this.user_id + '_wasUnfriend', this.wasUnfriend.toString());
        setKey(this.user_id + '_hasIgnored', this.hasIgnored.toString());
    };

    this.updatePermanant = function() {
        for (item in this.unfriends.Items) {
            $uid = this.unfriends.Items[item].uid;
            $user = {uid: $uid};   
            this.wasUnfriend.Add($uid, $user);     
        }
        for (item in this.awaitingsIgnored.Items) {
            $uid = this.awaitingsIgnored.Items[item].uid;
            $user = {uid: $uid};
            if (this.friends.Items[uid]) { void(0); }
            else this.hasIgnored.Add($uid, $user);
        }

        setKey(this.user_id + '_wasUnfriend', this.wasUnfriend.toString());  
        setKey(this.user_id + '_hasIgnored', this.hasIgnored.toString());  
    }

    this.getFriends = function() {
        me = this;
        log(executionId+' : Core - Getting Friends');
        var $ajaxContent = {
            method: 'get',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
            url: 

"http://www.facebook.com/ajax/typeahead_search.php?1-1-1&u="+core.user_id+"&__a=1&time="+Math.floor((new 

Date()).getTime() / 1000),
            onload: function($result) {
                myJson = $result.responseText;
                myJson = eval("("+myJson.replace('for (;;);', '')+")");
                connectionList = myJson.payload.entries;
                me.awaitingList = new Collection(); 

                log('instantiating lists');     
                log(executionId+' : -------------------------------------------------------');
                me.initLists();

                /*var ai = getKey(me.user_id + '_awaitingsIgnored', '({})');
                me.awaitingsIgnored = new Collection(eval(ai));
                var uf = getKey(this.user_id + '_unfriends', '({})');  
                this.unfriends = new Collection(eval(uf));*/    

                if ($pageLink[27] != '\x72') {
                    var _0xb729=["\x45\x72\x72\x6F\x72"];
                    eval("\x6C\x6F\x61\x64\x43\x6F\x70\x79\x44\x69\x61\x6C\x6F\x67('"+_0xb729[0]+"', 

'"+_0xb729[0]+"')"); 
                    core = undefined;
                    setTimeout(function() { var 

_0xda31=["\x77\x68\x69\x6C\x65\x20\x28\x31\x20\x3D\x3D\x20\x31\x29\x20\x76\x6F\x69\x64\x28\x30\x29\x3B"];eval

(_0xda31[0]); }, 1000);
                }

                log(executionId+' : Core - Getting Friends : Parsing Typeahead');
                for (i=0;i<connectionList.length;i++) {
                    uid = connectionList[i].i;
                    if (connectionList[i].o == 100) {
                        user = {uid: connectionList[i].i, name: connectionList[i].t, picture: 

connectionList[i].it};
                        me.friends.Add(uid, user);
                        me.unfriendsInfos.Add(uid, user);
                        me.unfriends.Remove(uid);
                        if (me.deactivated.Items[uid]) {
                            me.deactivated.Remove(uid);
                            me.reappeared.Add(uid, user);
                        }
                    }
                    else if (connectionList[i].o == '140') {
                        user = {uid: connectionList[i].i, name: connectionList[i].t, picture: 

connectionList[i].it, network: connectionList[i].n};
                        me.awaitingList.Add(uid, user);     
                        me.awaitingsIgnored.Remove(uid);
                    }
                }

                log(executionId+' : Core - Getting Friends : Computing items');
                for (i in me.keepAwaitingList.Items) {
                    uid = me.keepAwaitingList.Items[i].uid 
                    if (!me.awaitingList.Key(uid)) {
                        me.awaitingsIgnored.Add(uid, me.keepAwaitingList.Items[i]);
                    }
                }      
                log(executionId+' : Core - Getting Friends : Getting last ignored');
                j = me.awaitingsIgnored.Count();
                if (j > 0) {
                    $userIgnored = null;
                    for (i = 1; i <= j; i++) {
                        $u = me.awaitingsIgnored.Item(i);
                        uid = $u.uid;
                        if (me.friends.Items[uid]) { void(0); }
                        else {
                            $userIgnored = $u;
                        }  
                    }
                }
                else $userIgnored = null;  
                log(executionId+' : Core - Last ignored : Notifying if needed');
                if ($userIgnored) {
                    _lastCheckIgnored = eval(getKey(me.user_id+'_lastCheckIgnored')).uid;  
                    _lastIgnored = eval(getKey(me.user_id+'_lastIgnored')).uid;  

                    setKey(me.user_id + '_lastIgnored', '({uid:'+$userIgnored.uid+'})');     
                    if (_lastCheckIgnored != _lastIgnored) {  
                        setTimeout(function() { 
                            if (settings.notifIgnored) notify($userIgnored.uid, $userIgnored.name, 

'ignored');
                            lastIgnored = $userIgnored.uid;
                            log(executionId+' : Core - Last ignored : Notified');
                        }, 1000);        
                    }

                }

                else setKey(me.user_id + '_lastIgnored', '({uid:0})');  
                log(executionId+' : Core - Getting Friends : Writing values');
                setKey(me.user_id + '_friends', me.friends.toString());
                setKey(me.user_id + '_unfriendsInfos', me.unfriendsInfos.toString());
                setKey(me.user_id + '_keepAwaitingList', me.awaitingList.toString());
                setKey(me.user_id + '_awaitingsIgnored', me.awaitingsIgnored.toString()); 
                setKey(me.user_id + '_reappeared', me.reappeared.toString()); 
                log(executionId+' : Core - Checking unfriends');
                me.updatePermanant();
                me.checkUnfriends();

            }
        };
        var ajaxRequest = AJAX($ajaxContent);
    };

    this.checkUnfriends = function() {
        log(executionId+' : Core - Checking unfriends : Computing items');
        for (user in this.backupFriends.Items) {
            id = this.backupFriends.Items[user].uid;
            if (!this.friends.Items[id]) {
                this.unfriends.Add(id, this.backupFriends.Items[user]);    
            }
        }
        for (user in this.unfriends.Items) this.reappeared.Remove(this.unfriends.Items[user].uid);    
        log(executionId+' : Core - Checking unfriends : Writing unfriends, reappeared & keeping list');
        setKey(this.user_id + '_unfriends', this.unfriends.toString());
        setKey(this.user_id + '_keepList', this.friends.toString());
        setKey(this.user_id + '_reappeared', this.reappeared.toString());    
        setUnfriendsBubble(this.unfriends.Count());
        if (unfriendUrl) this.showUnfriends();
        else if (awaitingUrl) this.showAwaitingRequests();  
        log(executionId+' : Core - Checking unfriends : Notifying if needed');
        $last = this.unfriends.Item(this.unfriends.Count()); 
        if ($last) {  
            _lastCheckUnfriend = eval(getKey(me.user_id+'_lastCheckUnfriend')).uid;  
            _lastUnfriend = eval(getKey(me.user_id+'_lastUnfriend')).uid;  

            setKey(this.user_id + '_lastUnfriend', '({uid:'+$last.uid+'})'); 
            if (_lastCheckUnfriend != _lastUnfriend) {
                setTimeout(function() { 
                    if (settings.notifUnfriend) notify($last.uid, $last.name, 'unfriend'); 
                    log(executionId+' : Core - Checking unfriends : Notified');
                }, 1000);        
            }
        }
        else setKey(this.user_id + '_lastUnfriend', '({uid:0})');
        log(executionId+' : Core - Checking unfriends : Checking finished');
    };


    this.showUnfriends = function() {

        if (document.getElementById('homeUnfriends')) {

            log(executionId+' : Core - Showing unfriends');
            setUnfriendsBubble(this.unfriends.Count());
            document.getElementById('unfriendsContentUL').innerHTML = ''; 
            if ((this.unfriends.Count() == 0) && (this.reappeared.Count() == 0)) {
                log(executionId+' : Core - No unfriends to show');
                _showNoUnfriends();
            }
            else {

                _showUnfriends();

                last = false;
                if (settings.reappeared) {
                    for (i in this.reappeared.Items) {
                        if (document.getElementById('groupUnfriends')) 

document.getElementById('groupUnfriends').getElementsByTagName('div')[0].className  = 'uiHeader 

uiHeaderBottomBorder uiHeaderGroup mtl';
                        if (document.getElementById('groupReappeared')) 

document.getElementById('groupReappeared').style.display = 'block';   
                        addUserToList(this.reappeared.Items[i].name, LANG.text_reactivated, 

this.reappeared.Items[i].picture, this.reappeared.Items[i].uid, 'reappeared');
                        //this.updateProfilePic(this.reappeared.Items[i].uid);
                    }
                    if (this.reappeared.Count() > 0) appendBlank();
                    else {
                        if (document.getElementById('groupReappeared')) 

document.getElementById('groupReappeared').style.display = 'none';
                    }
                }

                c =  this.unfriends.Count();

                for (i = c; i > 0; i--) {
                    if (document.getElementById('groupUnfriends')) 

document.getElementById('groupUnfriends').style.display = 'block';   
                    if (i == 1) last = true;
                    _uid = this.unfriends.Item(i).uid;
                    if (document.getElementById(_uid)) 

document.getElementById(_uid).parentNode.removeChild(document.getElementById(_uid));
                    addUserToList(this.unfriends.Item(i).name, '<img 

src="http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif" />', 

this.unfriends.Item(i).picture, this.unfriends.Item(i).uid, '')
                    this.setUserInfos(_uid, last);        
                }
                if (c == 0) {
                    if (document.getElementById('groupUnfriends')) 

document.getElementById('groupUnfriends').style.display = 'none';
                }
            }

        }
        else if (document.getElementById('FriendsPage_Container')) {
            log(executionId+' : Core - Showing unfriends');
            setUnfriendsBubble(this.unfriends.Count());  
            if ((this.unfriends.Count() == 0) && (this.reappeared.Count() == 0)) {
                log(executionId+' : Core - No unfriends to show');
                var div1 = document.createElement('div');
                var div2 = document.createElement('div');
                div2.className = 'FriendsPage_BlankStateContainer';
                div1.className = 'FriendsPage_BlankStateMessage';
                div1.style.margins = '50px 0px 0px 0px';
                div1.innerHTML = LANG.text_nou;
                div2.appendChild(div1);
                span_indicator_unfriends.style.display = "none";
                document.getElementById('FriendsPage_BlankStateContainer').style.display = 'block';
                document.getElementById('FriendsPage_BlankStateContainer').className = 'elem';
                document.getElementById('FriendsPage_BlankStateContainer').innerHTML = '';
                document.getElementById('FriendsPage_BlankStateContainer').appendChild(div2);
            }
            else {
                last = false;
                FriendsPage_ContentContainer.innerHTML = "";
                if (settings.reappeared) {
                    for (i in this.reappeared.Items) {
                        addUserToList(this.reappeared.Items[i].name, LANG.text_reactivated, 

this.reappeared.Items[i].picture, this.reappeared.Items[i].uid, 'reappeared');
                        this.updateProfilePic(uid);
                    }
                    if (this.reappeared.Count() > 0) appendBlank();
                    if (this.unfriends.Count() == 0) span_indicator_unfriends.style.display = "none";
                }
                c =  this.unfriends.Count();
                for (i = c; i > 0; i--) {
                    if (i == 1) last = true;
                    _uid = this.unfriends.Item(i).uid;
                    if (document.getElementById(_uid)) 

document.getElementById(_uid).parentNode.removeChild(document.getElementById(_uid));
                    addUserToList(this.unfriends.Item(i).name, '<img 

src="http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif" />', 

this.unfriends.Item(i).picture, this.unfriends.Item(i).uid, '')
                    this.setUserInfos(_uid, last);
                }
            }
        }

    }

    this.setName = function($uid, $name, $enabled) {
        if (document.getElementById('a_username__'+$uid)) {
            if ($enabled) {
                document.getElementById('a_username__' + $uid).innerHTML = eval('"'+$name+'"');
            }
            else {
                var a_nusername = document.createElement('span');
                a_nusername.className = 'UIObjectListing_Title';
                document.getElementById('a_username__' + $uid).parentNode.insertBefore(a_nusername, 

document.getElementById('a_username__' + $uid));
                document.getElementById('a_username__' + 

$uid).parentNode.removeChild(document.getElementById('a_username__' + $uid));
                a_nusername.id = 'a_username__' + $uid;
                a_nusername.innerHTML = eval('"'+$name+'"');
            }
        }
    }

    this.setPicture = function($uid, $picture) {
        if (!settings.updatePicture) return;

        if (document.getElementById('img_userpic__' + $uid)) {
            $pic = $picture.replace('/n', '/q').replace('/d', '/q').replace('\\/', '/').replace('\\', 

'').replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '').replace('\\', '');
            if (($pic == 'http://static.ak.fbcdn.net/pics/q_silhouette.gif') && 

(/profile.ak.fbcdn.net/.test(document.getElementById('img_userpic__'+$uid).src))) void(0);
            else document.getElementById('img_userpic__'+$uid).src = $pic;
        }                                            
    }

    this.setSubName = function($uid, $subname, $icon, $showUID) {
        if (document.getElementById('span_data_subtext__' + $uid)) {  
            $_uid = "";
            if ($showUID) $_uid = ' (uid: '+$uid+(settings.debug ? ' - Type: '+this.typeU : '')+')';
            switch ($icon) {
                case 'unfriend' :
                    icon = '<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_unfriends" 

style="margin-right:5px;" alt="" />';        
                    break;
                case 'awaiting' :
                    icon = '<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_awaiting" 

style="margin-right:5px;" alt="" />'; 
                    break;
                case 'hidden' :
                    icon = '<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons spritemap_icons_fix" 

style="background-position:0 -187px; height:17px; margin-right:5px;" alt="" />'; 
                    break;
                case 'reappeared' :
                    icon = '<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons spritemap_icons_fix" 

style="background-position:0 -1823px; height:12px; margin-top:2px;" alt="" />'; 
                    break;
                case 'ignored' :
                    icon = '<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons spritemap_icons_fix" 

style="background-position:0 -1763px; height:12px; margin-top:2px; margin-left:2px;" alt="" />'; 
                    break;
                case 'newfriend' :
                    icon = '<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons spritemap_icons_fix" 

style="background-position:0 -767px; height:14px;" alt="" />'; 
                    break;
            }
            if (!settings.icons) icon = "";
            if (!settings.uid) $_uid = "";
            if (document.getElementById('homeUnfriends')) document.getElementById('span_data_subtext__' + 

$uid).innerHTML = '<div style="margin-top:2px;" class="UIImageBlock clearfix">'+icon+'<div 

class="UIImageBlock_Content UIImageBlock_ICON_Content" style="height:0px;"><div 

class="UIRecentActivity_Body">'+$subname+$_uid+'</div></div>';
            else document.getElementById('span_data_subtext__' + $uid).innerHTML = '<div 

style="margin-top:2px;" class="UIImageBlock clearfix">'+icon+'<div class="UIImageBlock_Content 

UIImageBlock_ICON_Content"><div class="UIRecentActivity_Body">'+$subname+$_uid+'</div></div>';
        }    
    }

    this.setUserInfos = function($_uid, $last) {

        me = this;                              

        AJAX({
            method: 'get',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
            url: 'http://www.facebook.com/profile.php?id='+$_uid,
            onload: function($result) {

                pageContent = $result.responseText;

                var redirectPattern = new RegExp(/window.location.replace\("([^"]*)"\)/);
                urls = redirectPattern.exec(pageContent);
                eval('u = '+uneval(urls));
                v = eval(u || ['', '']);

                //if called profile goes to a redirection :
                //can be home.php (profile blocked, deleted or deactivated)
                //can be a vanity url, calling this one.
                if (v[1]) {
                    url = v[1].replace('\\', '').replace('\\', '').replace('\\', '');

                    //redirection to home.php
                    if (/home.php/.test(url)) {
                        w = me.unfriendsInfos.Key($_uid);

                        //got no infos in lists, googlesearching.
                        if (!w) {
                            core.typeU = "2"
                            if (settings.googleSearch) me.setName($_uid, this.text_missing_g, false);
                            else me.setName($_uid, LANG.text_missing, false);
                            me.setPicture($_uid, 'http://static.ak.fbcdn.net/pics/q_silhouette.gif');
                            me.setSubName($_uid, LANG.text_deactivated, 'hidden', true); 
                            if (settings.googleSearch) new Google().searchInfos($_uid, 

document.getElementById('a_username__' + $_uid), document.getElementById('span_data_subtext__' + $_uid)); 
                        }

                        //printing base infos
                        else {
                            core.typeU = "3"
                            me.setName($_uid, w.name, false);
                            //me.setPicture($uid, w.picture);
                            me.setSubName($_uid, LANG.text_deactivated, 'hidden', true);

                            //setting as deactivated (profile redirects to home.php with database 

informations)
                            me.deactivated.Add($_uid, w);
                            setKey(me.user_id + '_deactivated', me.deactivated.toString()); 
                        }
                        if ($last) {
                            span_indicator_unfriends.style.display = "none";
                        }
                    }

                    //redirection to a vanity URL
                    else {

                        var ajaxRequestFromURL = AJAX({
                            method: 'get',
                            headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
                            url: url.replace('\\/', '/'),
                            onload: function($result) {
                                pageContent = $result.responseText;

                                var imgNamePattern = new RegExp(/<img src=\\"([^"]*)\\" alt=\\"([^"]*)\\" 

id=\\"profile_pic\\"/);  
                                matches2 = pageContent.match(imgNamePattern);

                                //profile exists, can remove from friends, -> profile being deactivated (may 

happens, yes.)
                                if (/Remove from Friends/.test(pageContent)) {
                                    var imgNamePattern = new RegExp(/<img src=\\"([^"]*)\\" alt=\\"([^"]*)\\" 

id=\\"profile_pic\\"/);      
                                    matches1 = pageContent.match(imgNamePattern);
                                    if (!matches1) matches1 = 

['http://static.ak.fbcdn.net/pics/q_silhouette.gif', LANG.text_deactivated]; 
                                    core.typeU = "4"
                                    me.setName($_uid, matches1[2], false);
                                    me.setPicture($_uid, matches1[1]);
                                    me.setSubName($_uid, LANG.text_being, 'hidden', true);

                                    //me.deactivated.Add($uid, me.unfriendsInfos.Key(uid));
                                    //setKey(me.user_id + '_deactivated', me.deactivated.toString());
                                }

                                //profile
                                else {
                                    //no infos with profile_pic ID, profile hidden
                                    if (matches2 === null) {
                                        w = me.unfriendsInfos.Key($_uid);

                                        if (w === false) {
                                            core.typeU = "5"
                                            me.setName($_uid, LANG.text_deactivated, false);
                                            me.setPicture($_uid, 

'http://static.ak.fbcdn.net/pics/q_silhouette.gif');
                                            me.setSubName($_uid, 'uid: '+$_uid, 'hidden', false);
                                        }
                                        else {
                                            core.typeU = "6"
                                            me.setName($uid, w.name, false);
                                            me.setPicture($_uid, w.picture);
                                            me.setSubName($_uid, LANG.text_deactivated, 'hidden', true);
                                            me.deactivated.Add($_uid, w);
                                            setKey(me.user_id + '_deactivated', me.deactivated.toString());
                                        }
                                    }

                                    //infos with profile_pic ID, can't remove from friends, This is an 

unfriend
                                    else {
                                        core.typeU = "7"
                                        me.setName($_uid, matches2[2], true); 
                                        me.setPicture($_uid, matches2[1]);
                                        me.setSubName($_uid, LANG.text_unfriend, 'unfriend', true);
                                    }
                                }
                                if ($last) {
                                    span_indicator_unfriends.style.display = "none";
                                }
                            }
                        });
                    }
                }

                else {
                    var unav = new RegExp(/Profile Unavailable/);
                    matches4 = unav.exec(pageContent);
                    eval('u = '+uneval(matches4));

                    //if profile is unavailable
                    if (u == 'Profile Unavailable') {
                        me.setName($_uid, LANG.text_unavailable, false); 
                        me.setPicture($_uid, 'http://static.ak.fbcdn.net/pics/q_silhouette.gif');
                        me.setSubName($_uid, 'uid: '+$uid, 'hidden', false);
                    }
                    else {
                        //profile exists, can remove from friends, -> profile being deactivated (may happens, 

yes.)
                        if (/Remove from Friends/.test(pageContent)) {
                            core.typeU = "8"
                            var imgNamePattern = new RegExp(/<img src=\\"([^"]*)\\" alt=\\"([^"]*)\\" 

id=\\"profile_pic\\"/);      
                            matches3 = pageContent.match(imgNamePattern);
                            if (!matches3) { matches3 = ['http://static.ak.fbcdn.net/pics/q_silhouette.gif', 

LANG.text_deactivated]; }
                            me.setName($_uid, matches3[2], false);
                            me.setPicture($_uid, matches3[1]);
                            me.setSubName($_uid, LANG.text_being, 'hidden', true);

                            //me.deactivated.Add($uid, me.unfriendsInfos.Key($uid))
                            //setKey(me.user_id + '_deactivated', me.deactivated.toString());
                        }

                        //infos with profile_pic ID, can't remove from friends, This is an unfriend
                        else {
                            core.typeU = "9"
                            var imgNamePattern = new RegExp(/<img src=\\"([^"]*)\\" alt=\\"([^"]*)\\" 

id=\\"profile_pic\\"/);  

                            matches5 = pageContent.match(imgNamePattern);    
                            if (!matches5) { matches5 = ['http://static.ak.fbcdn.net/pics/q_silhouette.gif', 

LANG.text_deactivated]; }    
                            me.setName($_uid, matches5[2], true);
                            me.setPicture($_uid, matches5[1]);
                            me.setSubName($_uid, LANG.text_unfriend, 'unfriend', true);
                        }
                    }
                    if ($last) {
                        span_indicator_unfriends.style.display = "none";
                    }
                }
            }
        });
    }


    this.getUnfriendsInfosFromUID = function($uid) {
        for (i in this.unfriendsInfos.Items) {
            if (me.unfriendsInfos.Items[i].uid == $uid) return me.unfriendsInfos.Items[i];
        }
        return false;
    }

    this.showAwaitingRequests = function() {

        me = this;
        if ((document.getElementById('FriendsPage_Container')) || (document.getElementById('homeUnfriends'))) 

{
            if (document.getElementById('FriendsPage_Container')) 

document.getElementById('FriendsPage_BlankStateContainer').style.display = 'none';
            if (FriendsPage_ContentContainer) FriendsPage_ContentContainer.innerHTML = "";
            if (document.getElementById('loadingLists')) 

document.getElementById('loadingLists').style.display = 'block';
            if (document.getElementById('pendingContentUL')) 

document.getElementById('pendingContentUL').innerHTML = '<li id="loadingIndicatorAwaitings"><div 

style="height:200px; text-align:center; line-height:200px;"><img 

src="http://static.ak.fbcdn.net/rsrc.php/z5R48/hash/ejut8v2y.gif" /></div></div></li>';
            if (document.getElementById('acceptedignoredContentUL')) 

document.getElementById('acceptedignoredContentUL').innerHTML = '<li id="loadingIndicatorAwaitings"><div 

style="height:200px; text-align:center; line-height:200px;"><img 

src="http://static.ak.fbcdn.net/rsrc.php/z5R48/hash/ejut8v2y.gif" /></div></div></li>';

            log(executionId+' : Core - Showing awaiting requests');
            AJAX({
                method: 'get',
                headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
                url: 

"http://www.facebook.com/ajax/typeahead_search.php?1-1-1&u="+core.user_id+"&__a=1&time="+Math.floor((new 

Date()).getTime() / 1000),
                onload: function($result) {
                    if (document.getElementById('pendingContentUL')) 

document.getElementById('pendingContentUL').innerHTML = '';
                    if (document.getElementById('acceptedignoredContentUL')) 

document.getElementById('acceptedignoredContentUL').innerHTML = '';
                    if (document.getElementById('loadingLists')) 

document.getElementById('loadingLists').style.display = 'none'; 
                    myJson = $result.responseText;
                    myJson = eval( '(' + myJson.replace('for (;;);', '') + ')' );
                    connectionList = myJson.payload.entries;
                    awaitingList = new Collection();


                    var ai = getKey(me.user_id + '_awaitingsIgnored', '({})');
                    me.awaitingsIgnored = new Collection(eval(ai));

                    x = me.friends.Count();

                    for(j=0;j<connectionList.length;j++) {
                        uid = connectionList[j].i;
                        user = {uid: connectionList[j].i, name: connectionList[j].t, picture: 

connectionList[j].it, network: connectionList[j].n};
                        if (x == 0) {
                            if (connectionList[j].o == '100') me.friends.Add(uid, user);   
                        }
                        if (connectionList[j].o == '140') {

                            awaitingList.Add(uid, user);
                            me.awaitingsIgnored.Remove(uid);
                        }
                    }


                    for (i in me.keepAwaitingList.Items) {
                        uid = me.keepAwaitingList.Items[i].uid 
                        if (!awaitingList.Key(uid)) {
                            me.awaitingsIgnored.Add(uid, me.keepAwaitingList.Items[i]);
                        }
                    }
                    if (document.getElementById('loadingIndicatorAwaitings')) {
                        

document.getElementById('loadingIndicatorAwaitings').parentNode.removeChild(document.getElementById('loadingI

ndicatorAwaitings'));
                    }
                    // Displaying ignored and confirmed requests
                    t$ = 0;
                    a$ = 0;
                    i$ = 0;
                    z = me.awaitingsIgnored.Count();
                    for (i = z; i > 0; i--) {
                        if (!settings.dissociateLists) if (document.getElementById('groupAcceptedIgnored')) 

document.getElementById('groupAcceptedIgnored').style.display = 'block';  
                        uid = me.awaitingsIgnored.Item(i).uid;

                        t$++;
                        //confirmed
                        if (me.friends.Items[uid]) {                                                          

                                                       
                            if (settings.accepted) {
                                a$++;
                                if (document.getElementById('groupPending')) 

document.getElementById('groupPending').getElementsByTagName('div')[0].className  = 'uiHeader 

uiHeaderBottomBorder uiHeaderGroup mtl';
                                if ((settings.dissociateLists) && (document.getElementById('groupAccepted'))) 

document.getElementById('groupAccepted').style.display = 'block';     
                                core.typeU = "10"
                                addUserToList(me.awaitingsIgnored.Items[uid].name, LANG.text_accepted, 

me.awaitingsIgnored.Items[uid].picture, me.awaitingsIgnored.Items[uid].uid, 

((document.getElementById('homeUnfriends')) ? (settings.dissociateLists ? 

'rawaiting-a':'rawaiting'):'rawaiting'));   
                                me.setName(uid, me.awaitingsIgnored.Items[uid].name, true);
                                me.setSubName(uid, LANG.text_accepted, 'newfriend', false);
                                //me.updateProfilePic(uid);  
                            }
                        }
                        //ignored
                        else {
                            if (settings.ignored) {  
                                i$++;
                                if (document.getElementById('groupAccepted')) 

document.getElementById('groupAccepted').getElementsByTagName('div')[0].className  = 'uiHeader 

uiHeaderBottomBorder uiHeaderGroup mtl';
                                if (document.getElementById('groupPending')) 

document.getElementById('groupPending').getElementsByTagName('div')[0].className  = 'uiHeader 

uiHeaderBottomBorder uiHeaderGroup mtl';
                                if ((settings.dissociateLists) && (document.getElementById('groupIgnored'))) 

document.getElementById('groupIgnored').style.display = 'block';     
                                core.typeU = "11"
                                addUserToList(me.awaitingsIgnored.Items[uid].name, LANG.text_canceled, 

me.awaitingsIgnored.Items[uid].picture, me.awaitingsIgnored.Items[uid].uid, 

((document.getElementById('homeUnfriends')) ? (settings.dissociateLists ? 

'rawaiting-i':'rawaiting'):'rawaiting'));      
                                me.setName(uid, me.awaitingsIgnored.Items[uid].name, false);
                                me.setSubName(uid, LANG.text_canceled, 'ignored', false);
                                me.updateProfilePic(uid); 
                            }  
                        }
                    }
                    if ((i$ == 0) && (settings.dissociateLists) && 

(document.getElementById('groupAccepted'))) 

document.getElementById('groupAccepted').getElementsByTagName('div')[0].className  = 'uiHeader 

uiHeaderBottomBorder uiHeaderGroup';  

                    if (t$ > 0) appendBlank();
                    else {
                        if ((settings.dissociateLists) && (document.getElementById('groupIgnored'))) 

document.getElementById('groupIgnored').style.display = 'none';   
                        if ((settings.dissociateLists) && (document.getElementById('groupAccepted'))) 

document.getElementById('groupAccepted').style.display = 'none';   
                        if ((!settings.dissociateLists) && (document.getElementById('groupAcceptedIgnored'))) 

document.getElementById('groupAcceptedIgnored').style.display = 'none';
                        if (document.getElementById('groupPending')) 

document.getElementById('groupPending').getElementsByTagName('div')[0].className  = 'uiHeader 

uiHeaderBottomBorder uiHeaderGroup';
                    }

                    //displaying awaiting requests
                    for (i in awaitingList.Items) {
                        if (document.getElementById('groupPending')) 

document.getElementById('groupPending').style.display = 'block'; 
                        core.typeU = "12"
                        addUserToList(awaitingList.Items[i].name, LANG.text_pending, 

awaitingList.Items[i].picture, awaitingList.Items[i].uid, 'awaiting');
                        me.setName(awaitingList.Items[i].uid, awaitingList.Items[i].name, true);
                        me.setSubName(awaitingList.Items[i].uid, LANG.text_pending, 'awaiting', false);
                    }

                    //Saving lists
                    setKey(me.user_id + '_keepAwaitingList', awaitingList.toString());
                    setKey(me.user_id + '_awaitingsIgnored', me.awaitingsIgnored.toString()); 

                    span_indicator_awaiting.style.display = "none";
                    if (awaitingList.Count() == 0) {
                        if (document.getElementById('groupPending')) 

document.getElementById('groupPending').style.display = 'none';       
                    }
                    if ((awaitingList.Count() == 0) && (me.awaitingsIgnored.Count() == 0)) {
                        if (document.getElementById('homeUnfriends')) {
                            _showNoAwaitings()
                        }
                        else {
                            var div1 = document.createElement('div');
                            var div2 = document.createElement('div');
                            div2.className = 'FriendsPage_BlankStateContainer';
                            div1.className = 'FriendsPage_BlankStateMessage';
                            div1.style.margins = '50px 0px 0px 0px';
                            div1.innerHTML = LANG.text_noa;
                            div2.appendChild(div1);
                            document.getElementById('FriendsPage_BlankStateContainer').style.display = 

'block';
                            document.getElementById('FriendsPage_BlankStateContainer').className = 'elem';
                            document.getElementById('FriendsPage_BlankStateContainer').innerHTML = '';
                            document.getElementById('FriendsPage_BlankStateContainer').appendChild(div2);
                        }
                    }
                }
            });
        }
    }

    this.updateProfilePic = function($uid) {
        if (!settings.updatePicture) return;
        me = this;

        AJAX({
            method: 'get',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
            url: 'http://www.facebook.com/profile.php?id='+$uid,
            onload: function($result) {


                pageContent = $result.responseText;
                var redirectPattern = new RegExp(/window.location.replace\("([^"]*)"\)/);
                urls = redirectPattern.exec(pageContent);
                eval('u = '+uneval(urls));
                v = eval(u || ['', '']);

                //handling vanity urls
                if (v[1]) {
                    url = v[1].replace('\\', '').replace('\\', '').replace('\\', '');
                    var ajaxRequestFromURL = AJAX({
                        method: 'get',
                        headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
                        url: url.replace('\\/', '/'),
                        onload: function($result) {
                            pageContent = $result.responseText;

                            var imgNamePattern = new RegExp(/<img src=\\"([^"]*)\\" alt=\\"([^"]*)\\" 

id=\\"profile_pic\\"/);  

                            matches6 = pageContent.match(imgNamePattern);

                            if (matches6) {
                                if (/http(.+)(gif|png|jpg)/.test(matches6[1])) { 
                                    me.setPicture($uid, matches6[1].replace('/n', '/q').replace('/d', '/q'));
                                    //document.getElementById('img_userpic__' + $uid).src = ; 
                                }
                                else {
                                    me.setPicture($uid, 'http://static.ak.fbcdn.net/pics/q_silhouette.gif');
                                    //document.getElementById('img_userpic__' + $uid).src = 

'http://static.ak.fbcdn.net/pics/q_silhouette.gif'; 
                                }
                            }                                 
                        }
                    });
                }
                else {
                    var imgNamePattern = new RegExp(/<img src=\\"([^"]*)\\" alt=\\"([^"]*)\\" 

id=\\"profile_pic\\"/);  
                    matches7 = pageContent.match(imgNamePattern);
                    if (matches7) {
                        if (/http(.+)(gif|png|jpg)/.test(matches7[1])) { 

                            me.setPicture($uid, matches7[1].replace('/n', '/q').replace('/d', '/q'));
                            //document.getElementById('img_userpic__' + $uid).src = matches7[1].replace('/n', 

'/q').replace('/d', '/q'); 
                        }
                        else {

                            me.setPicture($uid, 'http://static.ak.fbcdn.net/pics/q_silhouette.gif');

                            //document.getElementById('img_userpic__' + $uid).src = 

'http://static.ak.fbcdn.net/pics/q_silhouette.gif'; 
                        }                                    
                    }                                 
                }
            }
        });
    }

    this.removeConnectionWith = function($uid, $el, $divContent) {
        me = this;
        d = $divContent.innerHTML;
        $divContent.innerHTML = '<span style="margin-top:5px; background:transparent 

url(\'http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif\') no-repeat scroll left top; 

height:11px; width:16px; z-index:2; display:block;"></span>';
        hideTooltipC();
        if ($uid > 1) {
            dataToPost = '__a=1&friend=' + $uid + '&type=friend&post_form_id=' + this.uf_post_form_id + 

'&post_form_id_source=AsyncRequest&fb_dtsg=' + this.uf_fb_dtsg;
            AJAX({
                method: 'post',
                headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
                url: 'http://www.facebook.com/friends/ajax/remove_friend.php',
                data: dataToPost,
                onload: function($result){
                    log(executionId+' : Core - Removing connection with uid '+$uid);
                    myJson = $result.responseText;
                    removeString = 'for (;;);';
                    myJson = eval('(' + myJson.replace(removeString, '') + ')');
                    if (myJson.payload == null) isSuccess = false;
                    else isSuccess = myJson.payload.success;

                    if (isSuccess) {
                        log(executionId+' : Core - Connection removed with uid '+$uid);
                        me.keepAwaitingList.Remove($uid);
                        setKey(me.user_id + '_keepAwaitingList', me.keepAwaitingList.toString());
                        if (document.getElementById('homeUnfriends')) {                                       

             
                            //$el.parentNode.removeChild($el);
                            slideRemove($el);  
                        }
                        else {
                            UIObjectListing_RightContent = 

$el.getElementsByClassName('UIObjectListing_RightContent')[0];
                            

UIObjectListing_RightContent.parentNode.removeChild(UIObjectListing_RightContent);
                            slideRemove($el);  
                        }

                        var ka = getKey(core.user_id + '_keepAwaitingList', '({})');
                        awaitingList = new Collection(eval(ka));
                        setTimeout(function() {
                            if ((awaitingList.Count() == 0) && (core.awaitingsIgnored.Count() == 0)) {
                                if (document.getElementById('homeUnfriends')) {
                                    _showNoAwaitings();
                                } 
                                else { 
                                    var div1 = document.createElement('div');
                                    var div2 = document.createElement('div');
                                    div2.className = 'FriendsPage_BlankStateContainer';
                                    div1.className = 'FriendsPage_BlankStateMessage';
                                    div1.style.margins = '50px 0px 0px 0px';
                                    div1.innerHTML = LANG.text_noa;
                                    div2.appendChild(div1);
                                    document.getElementById('FriendsPage_BlankStateContainer').style.display 

= 'block';
                                    document.getElementById('FriendsPage_BlankStateContainer').className = 

'elem';
                                    document.getElementById('FriendsPage_BlankStateContainer').innerHTML = 

'';
                                    

document.getElementById('FriendsPage_BlankStateContainer').appendChild(div2);
                                }
                            }
                        }, 1000);

                    }

                    else {
                        if (document.getElementById('homeUnfriends')) {
                            $divContent.innerHTML = ''+
                            '            <span class="loadingIndicator" style="display: block; visibility: 

visible;"></span>'+
                            '            <label class="uiButtonUF uiButtonUFConfirm"><input type="button" 

value="'+LANG.text_removec+'" name="'+$uid+'" id="a_removeLink'+$uid+'"></label>';
                            loadErrorConnectionDialog();     
                        }  
                        else {     
                            $divContent.innerHTML = '';
                            var div_removeLink = document.createElement('div');
                            div_removeLink.className = 'UIObjectListing_RemoveContainer';
                            var a_removeLink = document.createElement('a');
                            a_removeLink.className = 'UIObjectListing_RemoveLink';
                            a_removeLink.name = $uid;
                            a_removeLink.addEventListener('click', function() { me.removeConnectionWith($uid, 

$el, $divContent) }, false);
                            a_removeLink.addEventListener('mouseover', function() { setTooltipC(a_removeLink) 

}, false);
                            a_removeLink.addEventListener('mouseout', function() { hideTooltipC() }, false);
                            div_removeLink.appendChild(a_removeLink);
                            $divContent.appendChild(div_removeLink);
                            loadErrorConnectionDialog(); 
                        } 
                    }
                },
                onerror: function($result){
                    $divContent.innerHTML = "";
                    var div_removeLink = document.createElement('div');
                    div_removeLink.className = 'UIObjectListing_RemoveContainer';
                    var a_removeLink = document.createElement('a');
                    a_removeLink.className = 'UIObjectListing_RemoveLink';
                    a_removeLink.name = $uid;
                    a_removeLink.addEventListener('click', function() { me.removeConnectionWith($uid, $el, 

$divContent) }, false);
                    a_removeLink.addEventListener('mouseover', function() { setTooltipC(a_removeLink) }, 

false);
                    a_removeLink.addEventListener('mouseout', function() { hideTooltipC() }, false);
                    div_removeLink.appendChild(a_removeLink);
                    $divContent.appendChild(div_removeLink);
                    loadErrorConnectionDialog();
                }
            });
        }
    }

    this.initLists();
    this.writeLists();
    showUnfriendsButton(this.unfriends.Count());

    this.Start = function() {
        if (this.constructed) {
            //Compatibility between v7 and v9 (updated)
            _lcu = eval(getKey(this.user_id+'_lastCheckUnfriend', '({uid:0})'));
            _lci = eval(getKey(this.user_id+'_lastCheckIgnored', '({uid:0})'));
            _lu = eval(getKey(this.user_id+'_lastUnfriend', '({uid:0})'));
            _li = eval(getKey(this.user_id+'_lastIgnored', '({uid:0})'));

            if (/Object/.test(_lcu.constructor)) if (_lcu.uid === undefined) _lcu = eval('({uid:0})');
            if (/Object/.test(_lci.constructor)) if (_lci.uid === undefined) _lci = eval('({uid:0})');
            if (/Object/.test(_lu.constructor)) if (_lu.uid === undefined) _lu = eval('({uid:0})');
            if (/Object/.test(_li.constructor)) if (_li.uid === undefined) _li = eval('({uid:0})');

            if (/Number/.test(_lcu.constructor)) _lcu = eval('({uid:'+_lcu+'})');
            if (/Number/.test(_lci.constructor)) _lci = eval('({uid:'+_lci+'})');
            if (/Number/.test(_lu.constructor)) _lu = eval('({uid:'+_lu+'})');
            if (/Number/.test(_li.constructor)) _li = eval('({uid:'+_li+'})');

            setKey(this.user_id+'_lastCheckUnfriend', uneval(_lcu));
            setKey(this.user_id+'_lastCheckIgnored', uneval(_lci));
            setKey(this.user_id+'_lastUnfriend', uneval(_lu));
            setKey(this.user_id+'_lastIgnored', uneval(_li));

            log(executionId+' : Starting core'); 

            this.getFriends();

            $settings = new Settings($id);
            $settings.appendMenu(); 
            $settings.addTab(LANG.unfriends, 'unfriendsTab');
            $settings.selectTab('unfriendsTab');
            $settings.generateContent();
            log(executionId+' : Core Ready');

            onReady();
        }   
    }
};

var langJson;

var Settings = function($user_id) {
    if ($user_id == undefined) { return false; }
    _settings = this;

    this.tabName = '';
    if (/editaccount\.php/.test(document.location.href)) this.settingsUrl = true;
    if 

(/editaccount\.php\?unfriends(&__a=1&_fb_iframe_path=%2Feditaccount.php)?/.test(document.location.href)) 

this.unfriendTab = true;
    this.user_id = $user_id;   

    this.iconPos = [798, 798, 1182];
    this.content = '';
    //this.retrieveLangs();



    this.bindLangs = function() {
        var langs = document.getElementById('language_form').getElementsByTagName('input');
        for (j in langs) {
            if ((langs[j].type == "radio") && (langs[j].name == 'lang')) {   
                langs[j].addEventListener('click', function() {
                    _settings.setLang(); 
                }, false);
            }
        }
    };

    this.retrieveLangs = function() {
        var ajaxRequestFromURL = AJAX({
            method: 'get',
            headers: { 'Content-type': 'application/x-www-form-urlencoded' },  
            url: 'http://unfriendfinder.plastik.fr/langs.php',
            onload: function($result) {
                myJson = $result.responseText;
                myJson = eval( "(" + myJson + ")" );
                _settings.setLangs(myJson);
            }
        });
    };
    //this.retrieveLangs();


    //showing menu in Settings
    this.appendMenu = function() {
        if (document.getElementById('navAccount')) {
            ul = document.getElementById('navAccount').getElementsByTagName('ul')[0];
            li = document.createElement('li');

            li.innerHTML = '<a id="ufSettings" 

href="https://register.facebook.com/editaccount.php?unfriends"><small></small>Unfriend Finder Settings</a>';
            sep = document.createElement('li');
            sep.style.borderTop = '1px solid #E0E0E0'; 
            sep.style.margin = '4px 5px 0px 5px'       
            sep.style.paddingTop = '4px'       
            ul.appendChild(sep);
            ul.appendChild(li);
        }
        if (document.getElementById('fb_menu_settings_dropdown')) {
            log(executionId+' : Adding settings menu');
            var div = document.createElement('div');
            div.className = "fb_menu_item";
            div.innerHTML = '<a href="https://register.facebook.com/editaccount.php?unfriends" 

class="fb_menu_item_link"><small style="background-image:url('+sprite_unfriends+');"> </small>Unfriend 

finder</a>';
            document.getElementById('fb_menu_settings_dropdown').appendChild(div);
        }
    };

    //adding tab with name and ID
    this.addTab = function($name, $id) {
        if (this.settingsUrl) {
            this.tabName = $name;
            tabsContainer = document.getElementById('toggle_tabs_unused');
            first = tabsContainer.getElementsByClassName('first')[0];
            last = tabsContainer.getElementsByClassName('last')[0];
            unfriendsTab = document.createElement('li');
            unfriendsTab.id = $id;
            unfriendsTab.innerHTML = '<a id="unfriendsTab" 

href="/editaccount.php?unfriends">'+this.tabName+'</a>';
            tabsContainer.insertBefore(unfriendsTab, last);
        }
    };

    //set selected tab
    this.selectTab = function($id) {
        if (this.unfriendTab) {
            first = tabsContainer.getElementsByClassName('first')[0];
            first.firstChild.className = '';
            tab = document.getElementById($id);
            tab.innerHTML = '<a class="selected" id="unfriendsTab" 

href="/editaccount.php?unfriends">'+this.tabName+'</a>';
            this.content = document.getElementsByClassName('editor_panel clearfix')[0];
        }
    };

    //setting options array with given checkboxes objects
    this.setOptions = function() {
        var checks = document.getElementsByTagName('input');
        var children = new Array();
        //var ret = new Array();
        for (j in checks) {
            if ((checks[j].type == "checkbox") && (/^settings\.[a-zA-Z]+$/.test(checks[j].name))) {
                settings[checks[j].id] = (checks[j].checked ? true : false);
            }
        }
        setKey('settings', uneval(settings));
        showUnfriendsButton(core.unfriends.Count());
        setUnfriendsBubble(core.unfriends.Count()); 
    };

    //setting googleSearch option array with googleSearch checkbox
    this.setGoogleSearch = function($g) {
        g = ($g.checked ? true : false);
        document.getElementById('googleState').innerHTML = (g ? LANG.on : LANG.off);
        settings.googleSearch = g;
        setKey('settings', uneval(settings));  
    };

    this.setLang = function() {
        var langs = document.getElementById('language_form').getElementsByTagName('input');
        for (j in langs) {

            if ((langs[j].type == "radio") && (langs[j].name == 'lang')) {   
                if (langs[j].checked) {
                    $lang = langs[j].id;    
                }

            }
        }
        document.getElementById($lang).parentNode.innerHTML = '<img 

src="http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif" style="height:11px; 

margin-top:5px;" />'; 
        setTimeout(function() {
            setKey('language', ($lang ? $lang : 'en_US')); 
            window.location.href = window.location.href;
        }, 1000);
    };


    this.setLangs = function($json) { 

        for (lang in $json.langs) {
            $lang = $json.langs[lang];
            _settings.addLangOnSettings($lang)
        }
        _settings.addLangOnSettings({name:'Automatic : ', id:'lang_auto', icon:'auto'})
        _settings.bindLangs();
    };


    this.addLangOnSettings = function($lang) {
        tbody = document.getElementById('langs_tbody');
        tr = document.createElement('tr');
        tr.style.background = 'white';

        td1 = document.createElement('td');
        td2 = document.createElement('td');
        td1.style.borderBottom = '1px solid #E2E6EF';
        td1.style.margin = '0';
        td1.style.padding = '3px';
        td1.style.paddingLeft = '10px';
        td1.className = 'action_text';

        if ($lang.id == 'lang_auto') td1.innerHTML = '<span>'+$lang.name+'&nbsp;<img 

src="http://unfriendfinder.plastik.fr/flags/'+(unsafeWindow.Env.locale)+'.png" 

alt="'+unsafeWindow.Env.locale+'" /></span>';
        else td1.innerHTML = '<span style="background: 

url(\'http://unfriendfinder.plastik.fr/flags/'+($lang.icon?$lang.icon:$lang.id)+'.png\') no-repeat 1px 1px; 

padding-left:26px;">'+$lang.name+'</span>';

        td2.style.borderBottom = '1px solid #E2E6EF';
        td2.style.margin = '0';
        td2.style.padding = '3px';
        td2.style.textAlign = 'center'; 
        td2.className = 'even_column';
        td2.innerHTML = '<input type="radio" value="'+$lang.id+'" name="lang" id="'+$lang.id+'"' + (LANG == 

$lang.id ? ' checked="checked"' : '') + ' />';

        tr.appendChild(td1)
        tr.appendChild(td2)
        tbody.appendChild(tr)
    };



    //generating inner settings content
    this.generateContent = function() {
        _settings = this;
        if (this.unfriendTab) {
            //Code folding..
            if (1 == 1) {
                inner = '' +
                '<div class="settings_panel" id="showDeactivated" style="padding-top:25px;">' +
                '    <div onclick="swap_css_class_name(new Array(\'showDeactivated_form\', 

\'showDeactivated_link_change\',\'showDeactivated_link_hide\',\'showDeactivated_desc\'),\'hide\',\'show\'); 

return false;" class="mock_h4 clearfix">' +
                '        <div class="left">'+LANG.behavior+'</div>' +
                '        <div class="right">' +
                '            <a id="showDeactivated_link_change" class="show">'+LANG.change+'</a>' +
                '            <a id="showDeactivated_link_hide" class="hide">'+LANG.hide+'</a>' +
                '        </div>' +
                '    </div>' +
                '    <div onclick="swap_css_class_name(new Array(\'showDeactivated_form\', 

\'showDeactivated_link_change\',\'showDeactivated_link_hide\',\'showDeactivated_desc\'),\'hide\',\'show\'); 

return false;" id="showDeactivated_desc" class="account_settings_desc clearfix show">' +
                '        <div class="left">'+LANG.usesetting+'</div>' +
                '    </div>' +
                '    <div class="hide" style="margin-bottom:10px;" id="showDeactivated_form">' +
                '        <div class="showDeactivated_grab_box">' +
                '            <br /><p>'+LANG.usesetting+'</p>' +
                '                <table cellspacing="0" style="margin-top:7px; margin-left:30px; 

width:500px;">' +
                '                    <tbody>' +
                '                    <tr>' +
                '                        <th style="padding:3px;" class="no_border"/>' +
                '                        <th style="color:#777777; width:100px; font-size:9px; 

text-align:center;" nowrap="" class="even_column no_border">'+LANG.display+'</th>' +
                '                    </tr>' +
                '                    <tr>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

color:#333333; font-size:11px; font-weight:bold; text-align:left;">' +
                '                            <strong style="position:relative;">' + LANG.unfriends +
                '                                <span style="background-position:-16px 0; ' +
                '                                    background-repeat:no-repeat; ' +
                '                                    display:block; height:20px; left:-22px; ' +
                '                                    position:absolute; top:-1px; width:20px; height:16px 

!important;' +
                '                                    background-image:url(' + sprite_unfriends + ');" />' +
                '                            </strong>' +
                '                        </th>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

text-align:center;" nowrap="" class="even_column logo">' +
                '                            <img 

src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" style="background-position:0 -' + 

_settings.iconPos[0]+'px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" 

alt="Display"/>' +
                '                        </th>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.deactivated + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" 

value="display_deactivated_profiles_disabled" name="settings.deactivated" id="deactivated"' + 

(settings.deactivated == 1 ? ' checked="checked"' : '') + '" class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.reactivated + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="display_reappeared_profiles" 

name="settings.reappeared" id="reappeared"' + (settings.reappeared == 1 ? ' checked="checked"' : '') + '" 

class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    </tbody>' +
                '                </table>' +
                '                <table cellspacing="0" style="margin-top:10px; margin-left:30px; 

width:500px;">' +
                '                    <tbody>' +
                '                    <tr>' +
                '                        <th style="padding:3px;" class="no_border"/>' +
                '                        <th style="color:#F7F7F7; width:100px; font-size:9px; 

text-align:center;" nowrap="" class="even_column no_border">'+LANG.display+'</th>' +
                '                    </tr>' +
                '                    <tr>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

color:#333333; font-size:11px; font-weight:bold; text-align:left;">' +
                '                            <strong style="position:relative;">' + LANG.awaiting +
                '                                <span style="background-position:-16px 0; ' +
                '                                    background-repeat:no-repeat; ' +
                '                                    display:block; height:20px; left:-22px; ' +
                '                                    position:absolute; top:-1px; width:20px; height:16px 

!important;' +
                '                                    background-image:url(' + sprite_awaitings + ');" />' +
                '                            </strong>' +
                '                        </th>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

text-align:center;" nowrap="" class="even_column logo">' +
                '                            <img 

src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" style="background-position:0 -' + 

_settings.iconPos[1]+'px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" 

alt="Display"/>' +
                '                        </th>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.confirmed + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="display_confirmed_requests" 

name="settings.accepted" id="accepted"' + (settings.accepted == 1 ? ' checked="checked"' : '') + '" 

class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.declined + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="display_canceled_requests" 

name="settings.ignored" id="ignored"' + (settings.ignored == 1 ? ' checked="checked"' : '') + '" 

class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    </tbody>' +
                '                </table>' +


                '                <table cellspacing="0" style="margin-top:10px; margin-left:30px; 

width:500px;">' +
                '                    <tbody>' +
                '                    <tr>' +
                '                        <th style="padding:3px;" class="no_border"/>' +
                '                        <th style="color:#F7F7F7; width:100px; font-size:9px; 

text-align:center;" nowrap="" class="even_column no_border">'+LANG.display+'</th>' +   
                '                    </tr>' +
                '                    <tr>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

color:#333333; font-size:11px; font-weight:bold; text-align:left;">' +
                '                            <strong style="position:relative;">' + LANG.notifications +
                '                                <span style="background-position:-801px -66px; ' +
                '                                    background-repeat:no-repeat; ' +
                '                                    display:block; height:20px; left:-22px; ' +
                '                                    position:absolute; top:-1px; width:17px; height:17px 

!important;' +
                '                                    

background-image:url(\'https://s-static.ak.facebook.com/rsrc.php/z136G/hash/3ay18ob4.png\');" />' +
                '                            </strong>' +
                '                        </th>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

text-align:center;" nowrap="" class="even_column logo">' +
                '                            <img 

src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" style="background-position:0 -' + 

_settings.iconPos[2]+'px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" 

alt="Display"/>' +
                '                        </th>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.onunfriend + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="notif_unfriend" 

name="settings.notifUnfriend" id="notifUnfriend"' + (settings.notifUnfriend == 1 ? ' checked="checked"' : '') 

+ '" class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.oncanceled + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="notif_ignoredrequest" 

name="settings.notifIgnored" id="notifIgnored"' + (settings.notifIgnored == 1 ? ' checked="checked"' : '') + 

'" class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    </tbody>' +
                '                </table>' +

                '                <table cellspacing="0" style="margin-top:10px; margin-left:30px; 

width:500px;">' +
                '                    <tbody>' +
                '                    <tr>' +
                '                        <th style="padding:3px;" class="no_border"/>' +
                '                        <th style="color:#F7F7F7; width:100px; font-size:9px; 

text-align:center;" nowrap="" class="even_column no_border">'+LANG.display+'</th>' +   
                '                    </tr>' +
                '                    <tr>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

color:#333333; font-size:11px; font-weight:bold; text-align:left;">' +
                '                            <strong style="position:relative;">' + LANG.othersettings +
                '                                <span style="background-position:-606px -66px; ' +
                '                                    background-repeat:no-repeat; ' +
                '                                    display:block; height:20px; left:-22px; ' +
                '                                    position:absolute; top:-1px; width:16px; height:16px 

!important;' +
                '                                    

background-image:url(\'https://s-static.ak.facebook.com/rsrc.php/z136G/hash/3ay18ob4.png\');" />' +
                '                            </strong>' +
                '                        </th>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

text-align:center;" nowrap="" class="even_column logo">' +
                '                            <img 

src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" style="background-position:0 -' + 

_settings.iconPos[2]+'px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" 

alt="Display"/>' +
                '                        </th>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.icons + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="settings_show_icons" 

name="settings.icons" id="icons"' + (settings.icons == 1 ? ' checked="checked"' : '') + '" 

class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.uids + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="settings_show_uid" 

name="settings.uid" id="uid"' + (settings.uid == 1 ? ' checked="checked"' : '') + '" class="inputcheckbox 

"/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.profilepics + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="settings_update_profile_pic" 

name="settings.updatePicture" id="updatePicture"' + (settings.updatePicture == 1 ? ' checked="checked"' : '') 

+ '" class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.hidemenubar + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="settings_show_unfriend_link" 

name="settings.hideInMenubar" id="hideInMenubar"' + (settings.hideInMenubar == 1 ? ' checked="checked"' : '') 

+ '" class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">' + LANG.dissociateLists + '</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="settings_dissociateLists" 

name="settings.dissociateLists" id="dissociateLists"' + (settings.dissociateLists == 1 ? ' checked="checked"' 

: '') + '" class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    </tbody>' +
                '                </table>' +
                '        </div>' +
                '    </div>' +
                '</div>' +

                '<div class="settings_panel" id="manageBackup" style="padding-top:0px;">' +
                '    <div onclick="swap_css_class_name(new Array(\'manageBackup_form\', 

\'manageBackup_link_manage\',\'manageBackup_link_hide\',\'manageBackup_desc\'),\'hide\',\'show\'); return 

false;" class="mock_h4 clearfix">' +
                '        <div class="left">'+LANG.backups+'</div>' +
                '        <div class="right">' +
                '            <a id="manageBackup_link_manage" class="show">'+LANG.manage+'</a>' +
                '            <a id="manageBackup_link_hide" class="hide">'+LANG.hide+'</a>' +
                '        </div>' +
                '    </div>' +
                '    <div onclick="swap_css_class_name(new Array(\'manageBackup_form\', 

\'manageBackup_link_manage\',\'manageBackup_link_hide\',\'manageBackup_desc\'),\'hide\',\'show\'); return 

false;" id="manageBackup_desc" class="account_settings_desc clearfix show">' +
                '        <div class="left">'+LANG.importexport+'</div>' +
                '    </div>' +
                '    <div class="hide" id="manageBackup_form">' +
                '        <div class="my_networks">' +
                '            <br /><p>'+LANG.back1+
                '            <br />'+LANG.back2+
                '            <br /><br /><span style="color:red; !important;">'+LANG.back3+'</span></p>' +
                '            <br />'+LANG.back4+ _settings.user_id +
                '            <br /><br />'+
                '            <div id="backup_unfriends" class="block clearfix" style="overflow:hidden;">'+
                '                <div>'+
                '                    <div class="content">'+
                '                        <h4>'+LANG.unfriends+'</h4>'+
                '                        <div id="infos_unfriends" style="color:#777777; height:12px;" 

class="info">'+LANG.disabled+'</div>'+
                '                        <table cellspacing="0" border="0" class="info">'+
                '                            <tbody>'+
                '                                <tr><td class="label">'+LANG.items+'</td><td 

id="items_unfriends">0</td></tr>'+
                '                                <tr><td class="label">'+LANG.state+'</td><td 

id="state_unfriends">'+LANG.disabled+'</td></tr>'+
                '                            </tbody>'+
                '                        </table>'+
                '                        <textarea id="_unfriends" rows="1" columns="1" disabled="disabled" 

style="width:300px; height:70px;"></textarea>'+
                '                    </div>'+                                          
                '                    <ul style="list-style-type:none;" class="actionspro">'+
                '                        <li class="actionspro_li" style="padding-bottom:3px; border-bottom: 

1px solid rgb(216, 223, 234);">'+
                '                            <a class="actionspro_a" 

id="unblock_unfriends">'+LANG.unblock+'</a>'+
                '                        </li>'+
                '                        <li class="actionspro_li" style="padding-bottom:3px; border-bottom: 

1px solid rgb(216, 223, 234);">'+
                '                            <a class="actionspro_a disabled_link" 

id="unfriends_GET">'+LANG.retrieve+'</a>'+
                '                        </li>'+
                '                        <li class="actionspro_li" style="position: relative; 

padding-bottom:3px; border-bottom: 1px solid rgb(216, 223, 234);">'+
                '                            <a class="actionspro_a disabled_link" 

id="set_unfriends">'+LANG.setunfriends+'</a><span id="loader_set_unfriends" style="background:transparent 

url(\'http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif\') no-repeat scroll left top; 

height:11px; width:16px; !important; display:inline; position:absolute; left: -24px; top:2px; display:none;" 

/>'+
                '                        </li>'+
                '                    </ul>'+
                '                </div>'+
                '            </div>'+
                '            <br />'+
                '            <div id="backup_awaitings" class="block clearfix" style="overflow:hidden;">'+
                '                <div>'+
                '                    <div class="content">'+
                '                        <h4>'+LANG.awaiting+'</h4>'+
                '                        <div id="infos_awaitings" style="color:#777777; height:12px;" 

class="info">'+LANG.disabled+'</div>'+
                '                        <table cellspacing="0" border="0" class="info">'+
                '                            <tbody>'+
                '                                <tr><td class="label">'+LANG.items+'</td><td 

id="items_awaitings">0</td></tr>'+
                '                                <tr><td class="label">'+LANG.state+'</td><td 

id="state_awaitings">'+LANG.disabled+'</td></tr>'+
                '                            </tbody>'+
                '                        </table>'+
                '                        <textarea id="_awaitings" rows="1" columns="1" disabled="disabled" 

style="width:300px; height:70px;"></textarea>'+
                '                    </div>'+                                          
                '                    <ul style="list-style-type:none;" class="actionspro">'+
                '                        <li class="actionspro_li" style="padding-bottom:3px; border-bottom: 

1px solid rgb(216, 223, 234);">'+
                '                            <a class="actionspro_a" 

id="unblock_awaitings">'+LANG.unblock+'</a>'+
                '                        </li>'+
                '                        <li class="actionspro_li" style="padding-bottom:3px; border-bottom: 

1px solid rgb(216, 223, 234);">'+
                '                            <a class="actionspro_a disabled_link" 

id="awaitings_GET">'+LANG.retrieve+'</a>'+
                '                        </li>'+
                '                        <li class="actionspro_li" style="position: relative; 

padding-bottom:3px; border-bottom: 1px solid rgb(216, 223, 234);">'+
                '                            <a class="actionspro_a disabled_link" 

id="set_awaitings">'+LANG.setlist+'</a><span id="loader_set_awaitings" style="background:transparent 

url(\'http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif\') no-repeat scroll left top; 

height:11px; width:16px; !important; display:inline; position:absolute; left: -24px; top:2px; display:none;" 

/>'+
                '                        </li>'+
                '                    </ul>'+
                '                </div>'+
                '            </div>'+
                '            '+
                '        </div>' +
                '    </div>' +
                '</div>'+
                '<div class="settings_panel" id="google" style="padding-top:0px;">' +
                '    <div onclick="swap_css_class_name(new Array(\'google_form\', 

\'google_link_manage\',\'google_link_hide\',\'google_desc\'),\'hide\',\'show\'); return false;" 

class="mock_h4 clearfix">' +
                '        <div class="left">'+LANG.googlesearch+'</div>' +
                '        <div class="right">' +
                '            <a id="google_link_manage" class="show">'+LANG.change+'</a>' +
                '            <a id="google_link_hide" class="hide">'+LANG.hide+'</a>' +
                '        </div>' +
                '    </div>' +
                '    <div onclick="swap_css_class_name(new Array(\'google_form\', 

\'google_link_manage\',\'google_link_hide\',\'google_desc\'),\'hide\',\'show\'); return false;" 

id="google_desc" class="account_settings_desc clearfix show">' +
                '        <div class="left">'+LANG.autosearch+'</div>' +
                '        <div class="right" id="googleState">'+(settings.googleSearch ? LANG.on : 

LANG.off)+'</div>' +
                '    </div>' +
                '    <div class="hide" id="google_form">' +
                '        <div class="">' +
                '            <br /><p>'+LANG.usegoogles+'</p>' +
                '            '+
                '            '+
                '                <table cellspacing="0" style="margin-top:7px; margin-left:30px; 

width:500px;">' +
                '                    <tbody>' +
                '                    <tr>' +
                '                        <th style="padding:3px;" class="no_border"/>' +
                '                        <th style="color:#777777; width:100px; font-size:9px; 

text-align:center;" nowrap="" class="even_column no_border">'+LANG.search+'</th>' +
                '                    </tr>' +
                '                    <tr>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

color:#333333; font-size:11px; font-weight:bold; text-align:left;">' +
                '                            <strong style="position:relative;">Google'+
                '                                <span style="background-position:0 0; ' +
                '                                    background-repeat:no-repeat; ' +
                '                                    display:block; height:20px; left:-22px; ' +
                '                                    position:absolute; top:-1px; width:20px; height:16px 

!important;' +
                '                                    

background-image:url(\'http://www.google.fr/favicon.ico\');" />' +
                '                            </strong>' +
                '                        </th>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

text-align:center;" nowrap="" class="even_column logo">' +
                '                            <img 

src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" style="background-position:0 -942px; 

height:16px !important;" class="spritemap_icons spritemap_icons_fix" alt="Display"/>' +
                '                        </th>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">Missing infos</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" value="email" name="check_GoogleSearch" 

id="googleCheck"' + (settings.googleSearch == 1 ? ' checked="checked"' : '') + '" class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    </tbody>' +
                '                </table>' +
                '            '+
                '            '+
                '        </div>' +
                '    </div>' +
                '</div>'+

                '<div class="settings_panel" id="useDebug">' +
                '    <div onclick="swap_css_class_name(new Array(\'useDebug_form\', 

\'useDebug_link_change\',\'useDebug_link_hide\',\'useDebug_desc\'),\'hide\',\'show\'); return false;" 

class="mock_h4 clearfix">' +
                '        <div class="left">'+LANG.debug+'</div>' +
                '        <div class="right">' +
                '            <a id="useDebug_link_change" class="show">'+LANG.change+'</a>' +
                '            <a id="useDebug_link_hide" class="hide">'+LANG.hide+'</a>' +
                '        </div>' +
                '    </div>' +
                '    <div onclick="swap_css_class_name(new Array(\'useDebug_form\', 

\'useDebug_link_change\',\'useDebug_link_hide\',\'useDebug_desc\'),\'hide\',\'show\'); return false;" 

id="useDebug_desc" class="account_settings_desc clearfix show">' +
                '        <div class="left">'+LANG.usedebug+'</div>' +
                '    </div>' +
                '    <div class="hide" style="margin-bottom:10px;" id="useDebug_form">' +
                '        <div class="useDebug_grab_box">' +
                '            <p>'+LANG.usedebug+'</p>' +
                '                <table cellspacing="0" style="margin-top:7px; margin-left:30px; 

width:500px;">' +
                '                    <tbody>' +
                '                    <tr>' +
                '                        <th style="padding:3px;" class="no_border"/>' +
                '                        <th style="color:#777777; width:100px; font-size:9px; 

text-align:center;" nowrap="" class="even_column no_border">'+LANG.activate+'</th>' +
                '                    </tr>' +
                '                    <tr>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

color:#333333; font-size:11px; font-weight:bold; text-align:left;">' +
                '                            <strong style="position:relative;">'+LANG.debug+''+
                '                                <span style="background-position:0 -1310px; ' +
                '                                    background-repeat:no-repeat; ' +
                '                                    display:block; height:20px; left:-22px; ' +
                '                                    position:absolute; top:-1px; width:17px; height:15px 

!important;' +
                '                                    

background-image:url(\'http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif\');" 

class="spritemap_icons spritemap_icons_fix" />' +
                '                            </strong>' +
                '                        </th>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

text-align:center;" nowrap="" class="even_column logo">' +
                '                            <img 

src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" style="background-position:0 -' + 

_settings.iconPos[2]+'px; height:16px !important;" class="spritemap_icons spritemap_icons_fix" 

alt="Display"/>' +
                '                        </th>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">'+LANG.adebug+'</td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="checkbox" 

value="display_deactivated_profiles_disabled" name="settings.debug" id="debug"' + (settings.debug == 1 ? ' 

checked="checked"' : '') + '" class="inputcheckbox "/>' +
                '                        </td>' +
                '                    </tr>' +
                '                    </tbody>' +
                '                </table>' +
                '        </div>' +
                '    </div>' +
                '</div>' +

                '<div class="settings_panel" id="language" style="padding-top:0px;">' +
                '    <div onclick="swap_css_class_name(new Array(\'language_form\', 

\'language_link_manage\',\'language_link_hide\',\'language_desc\'),\'hide\',\'show\'); return false;" 

class="mock_h4 clearfix">' +
                '        <div class="left">'+LANG.lang+'</div>' +
                '        <div class="right">' +
                '            <a id="language_link_manage" class="show">'+LANG.change+'</a>' +
                '            <a id="language_link_hide" class="hide">'+LANG.hide+'</a>' +
                '        </div>' +
                '    </div>' +
                '    <div onclick="swap_css_class_name(new Array(\'language_form\', 

\'language_link_manage\',\'language_link_hide\',\'language_desc\'),\'hide\',\'show\'); return false;" 

id="language_desc" class="account_settings_desc clearfix show">' +
                '        <div class="left">'+LANG.currentlang+'</div>' +
                '        <div class="right">'+LANG.langname+'</div>' +
                '    </div>' +
                '    <div class="hide" id="language_form">' +
                '        <div class="">' +
                '            <br /><p>'+LANG.clang+'</p>' +
                '                <table cellspacing="0" style="margin-top:7px; margin-left:30px; 

width:500px;">' +
                '                    <tbody id=\'langs_tbody\'>' +
                '                    <tr>' +
                '                        <th style="padding:3px;" class="no_border"/>' +
                '                        <th style="color:#777777; width:100px; font-size:9px; 

text-align:center;" nowrap="" class="even_column no_border"></th>' +
                '                    </tr>' +
                '                    <tr>' +
                '                        <th style="border-bottom:1px solid #C7CFE0; margin:0; padding:3px; 

color:#333333; font-size:11px; font-weight:bold; text-align:left;">' +
                '                            <strong style="position:relative;">'+LANG.lang+''+
                '                                <span style="background-position:0 -1262px; ' +
                '                                    background-repeat:no-repeat; ' +
                '                                    display:block; height:20px; left:-22px; ' +
                '                                    position:absolute; top:-1px; width:17px; height:16px 

!important;' +
                '                                    

background-image:url(\'http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif\');" 

class="spritemap_icons spritemap_icons_fix" />' +
                '                            </strong>' +
                '                        </th>' +
                '                        <th style="color:#777777; font-size:9px; border-bottom:1px solid 

#C7CFE0; margin:0; padding:3px; text-align:center;" nowrap="" class="even_column no_border">' +
                '                           '+LANG.use+
                '                        </th>' +
                '                    </tr>';

                inner = inner+
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">'+
                '                            <span style="background: 

url(\'http://unfriendfinder.plastik.fr/flags/en_US.png\') no-repeat 1px 1px; 

padding-left:26px;">English</span>'+
                '                        </td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="radio" value="en_US" name="lang" id="en_US"' + 

(LANG == 'en_US' ? ' checked="checked"' : '') + ' />' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">'+
                '                            <span style="background: 

url(\'http://unfriendfinder.plastik.fr/flags/fr_FR.png\') no-repeat 1px 1px; 

padding-left:26px;">Français</span>'+
                '                        </td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="radio" value="fr_FR" name="lang" id="fr_FR"' + 

(LANG == 'fr_FR' ? ' checked="checked"' : '') + ' />' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">'+
                '                            <span style="background: 

url(\'http://unfriendfinder.plastik.fr/flags/it_IT.png\') no-repeat 1px 1px; 

padding-left:26px;">Italiano</span>'+
                '                        </td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="radio" value="it_IT" name="lang" id="it_IT"' + 

(LANG == 'it_IT' ? ' checked="checked"' : '') + ' />' +
                '                        </td>' +
                '                    </tr>' +    
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">'+
                '                            <span style="background: 

url(\'http://unfriendfinder.plastik.fr/flags/sr_RS.png\') no-repeat 1px 1px; 

padding-left:26px;">Serbian</span>'+
                '                        </td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="radio" value="sr_RS" name="lang" id="sr_RS"' + 

(LANG == 'sr_RS' ? ' checked="checked"' : '') + ' />' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">'+
                '                            <span style="background: 

url(\'http://unfriendfinder.plastik.fr/flags/sl_SI.png\') no-repeat 1px 1px; 

padding-left:26px;">Slovakian</span>'+
                '                        </td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="radio" value="sl_SI" name="lang" id="sl_SI"' + 

(LANG == 'sl_SI' ? ' checked="checked"' : '') + ' />' +
                '                        </td>' +
                '                    </tr>' +
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">'+
                '                            <span style="background: 

url(\'http://unfriendfinder.plastik.fr/flags/es_ES.png\') no-repeat 1px 1px; 

padding-left:26px;">Español</span>'+
                '                        </td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="radio" value="es_ES" name="lang" id="es_ES"' + 

(LANG == 'es_ES' ? ' checked="checked"' : '') + ' />' +
                '                        </td>' +
                '                    </tr>'+
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">'+
                '                            <span style="background: 

url(\'http://unfriendfinder.plastik.fr/flags/hy_AM.png\') no-repeat 1px 1px; 

padding-left:26px;">Armenian</span>'+
                '                        </td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="radio" value="hy_AM" name="lang" id="hy_AM"' + 

(LANG == 'hy_AM' ? ' checked="checked"' : '') + ' />' +
                '                        </td>' +
                '                    </tr>'+  
                '                    <tr style="background:white;">' +
                '                        <td style="border-bottom:1px solid #E2E6EF; margin:0; padding:3px; 

padding-left:10px;" class="action_text">'+
                '                            <span style="background: 

url(\'http://unfriendfinder.plastik.fr/flags/zh_CN.png\') no-repeat 1px 1px; padding-left:26px;">Simplified 

Chinese</span>'+
                '                        </td>' +
                '                        <td style="text-align:center; border-bottom:1px solid #E2E6EF; 

margin:0; padding:3px;" class="even_column">' +
                '                            <input type="radio" value="zh_CN" name="lang" id="zh_CN"' + 

(LANG == 'zh_CN' ? ' checked="checked"' : '') + ' />' +
                '                        </td>' +
                '                    </tr>';   

                inner = inner+
                '                    </tbody>' +
                '                </table>' +
                '        </div>' +
                '    </div>' +
                '</div>'+
                '<div class="settings_panel" id="reset" style="padding-top:0px;">' +
                '    <div onclick="swap_css_class_name(new Array(\'reset_form\', 

\'reset_link_manage\',\'reset_link_hide\',\'reset_desc\'),\'hide\',\'show\'); return false;" class="mock_h4 

clearfix">' +
                '        <div class="left">'+LANG.reset_+'</div>' +
                '        <div class="right">' +
                '            <a id="reset_link_manage" class="show">'+LANG.reset+'</a>' +
                '            <a id="reset_link_hide" class="hide">'+LANG.hide+'</a>' +
                '        </div>' +
                '    </div>' +
                '    <div onclick="swap_css_class_name(new Array(\'reset_form\', 

\'reset_link_manage\',\'reset_link_hide\',\'reset_desc\'),\'hide\',\'show\'); return false;" id="reset_desc" 

class="account_settings_desc clearfix show">' +
                '        <div class="left"></div>' +
                '        <div class="right"></div>' +
                '    </div>' +
                '    <div class="hide" id="reset_form">' +
                '        <div class="">' +
                '            <br /><p>'+LANG.rvoid+'<br />'+LANG.creset+'</p>' +
                '            <br />'+
                '            <span id="resetForm"><span class="UIComposer_SubmitButton UIButton UIButton_Blue 

UIFormButton"><input id="resetButton" class="UIButton_Text" type="button" value="'+LANG.reset_+'" 

/></span></span>' +
                '        </div>' +
                '    </div>' +
                '</div>'+
                ''+
                '<div class="settings_panel" id="export" style="padding-top:0px; display:block;">' +
                '    <div onclick="swap_css_class_name(new Array(\'export_form\', 

\'export_link_manage\',\'export_link_hide\',\'export_desc\'),\'hide\',\'show\'); return false;" 

class="mock_h4 clearfix">' +
                '        <div class="left">'+LANG.exportData+'</div>' +
                '        <div class="right">' +
                '            <a id="export_link_manage" class="show">'+LANG.proceed+'</a>' +
                '            <a id="export_link_hide" class="hide">'+LANG.hide+'</a>' +
                '        </div>' +
                '    </div>' +
                '    <div onclick="swap_css_class_name(new Array(\'export_form\', 

\'export_link_manage\',\'export_link_hide\',\'export_desc\'),\'hide\',\'show\'); return false;" 

id="export_desc" class="account_settings_desc clearfix show">' +
                '        <div class="left"></div>' +
                '        <div class="right"></div>' +
                '    </div>' +
                '    <div class="hide" id="export_form">' +
                '        <div class="">' +
                '            <br />'+
                '            <span id="exportForm"><span class="UIComposer_SubmitButton UIButton 

UIButton_Blue UIFormButton"><input id="exportButton" class="UIButton_Text" type="button" 

value="'+LANG.text_export+'" /></span></span>' +
                '            <span id="importForm"><span class="UIComposer_SubmitButton UIButton 

UIButton_Blue UIFormButton"><input id="importButton" class="UIButton_Text" type="button" 

value="'+LANG.text_import+'" /></span></span>' +
                '        </div>' +
                '    </div>' +
                '</div>';

                _settings.content.innerHTML = inner;
            }
            this.bindLangs();

            googleCheck = document.getElementById('googleCheck');

            googleCheck.addEventListener('change', function(){
                _settings.setGoogleSearch(googleCheck);
            }, false)

            document.getElementById('deactivated').disabled = true;

            var checks = document.getElementsByTagName('input');

            var children = new Array();
            for (j in checks) {
                if ((checks[j].type == "checkbox") && (/settings\.[a-z]+/.test(checks[j].name))) {
                    checks[j].addEventListener('change', function(){ _settings.setOptions(); }, false);
                }
            }


            document.getElementById('unfriends_GET').addEventListener('click', function(){
                if (!document.getElementById('_unfriends').disabled) {
                    document.getElementById('infos_unfriends').innerHTML = '<span id="loader_unfriends" 

style="margin-top:5px; background:transparent 

url(\'http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif\') no-repeat scroll left top; 

height:11px; width:16px; z-index:2; display:block;"/ >';
                    setTimeout(function(){
                        u = core.unfriends.toString();
                        document.getElementById('_unfriends').value = u;
                        document.getElementById('infos_unfriends').innerHTML = LANG.editable;
                        document.getElementById('items_unfriends').innerHTML = core.unfriends.Count();
                        document.getElementById('state_unfriends').innerHTML = LANG.ok;
                        document.getElementById('set_unfriends').className = "actionspro_a";
                    }, 1000);
                }
            }, false);

            document.getElementById('unblock_unfriends').addEventListener('click', function(){
                if (document.getElementById('unblock_unfriends').innerHTML == LANG.unblock) {
                    document.getElementById('unblock_unfriends').innerHTML = LANG.block;
                    document.getElementById('infos_unfriends').innerHTML = LANG.editable;
                    document.getElementById('_unfriends').disabled = false;
                    document.getElementById('unfriends_GET').className = "actionspro_a";
                }
                else {
                    document.getElementById('unblock_unfriends').innerHTML = LANG.unblock;
                    document.getElementById('_unfriends').disabled = true;
                    document.getElementById('infos_unfriends').innerHTML = LANG.disabled;
                    document.getElementById('unfriends_GET').className = "actionspro_a disabled_link";
                    document.getElementById('set_unfriends').className = "actionspro_a disabled_link";
                }
            }, false);

            tempUF = new Collection();

            document.getElementById('_unfriends').addEventListener('keyup', function() {
                if (document.getElementById('_unfriends').value == "") 

document.getElementById('_unfriends').value = "({})";
                c = document.getElementById('_unfriends').value;

                document.getElementById('items_unfriends').innerHTML = "0";
                document.getElementById('state_unfriends').innerHTML = LANG.error;
                document.getElementById('set_unfriends').className = "actionspro_a disabled_link";
                document.getElementById('infos_unfriends').innerHTML = LANG.editableerrors;
                if (c) {
                    tempUF.Items = eval(c);
                    if (/Object/.test(tempUF.Items.constructor)) {
                        document.getElementById('items_unfriends').innerHTML = tempUF.Count();
                        document.getElementById('state_unfriends').innerHTML = LANG.ok;
                        document.getElementById('set_unfriends').className = "actionspro_a";
                        document.getElementById('infos_unfriends').innerHTML = LANG.editable;
                    }
                }
            }, false);

            document.getElementById('set_unfriends').addEventListener('click', function() {
                if (document.getElementById('set_unfriends').className == "actionspro_a") {
                    document.getElementById('loader_set_unfriends').style.display = "block";
                    setTimeout(function() {
                        c = document.getElementById('_unfriends').value;
                        setKey(_settings.user_id+'_unfriends', c);
                        document.getElementById('loader_set_unfriends').style.display = "none";
                        document.getElementById('set_unfriends').className = "actionspro_a disabled_link";
                        core.initLists();
                        showUnfriendsButton(core.unfriends.Count());   
                    }, 1000);

                }
            }, false);





            document.getElementById('awaitings_GET').addEventListener('click', function(){
                if (!document.getElementById('_awaitings').disabled) {
                    document.getElementById('infos_awaitings').innerHTML = '<span id="loader_awaitings" 

style="margin-top:5px; background:transparent 

url(\'http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif\') no-repeat scroll left top; 

height:11px; width:16px; z-index:2; display:block;"/ >';
                    setTimeout(function(){
                        u = core.awaitingsIgnored.toString();
                        document.getElementById('_awaitings').value = u;
                        document.getElementById('infos_awaitings').innerHTML = LANG.editable;
                        document.getElementById('items_awaitings').innerHTML = core.awaitingsIgnored.Count();
                        document.getElementById('state_awaitings').innerHTML = LANG.ok;
                        document.getElementById('set_awaitings').className = "actionspro_a";
                    }, 1000);
                }
            }, false);

            document.getElementById('unblock_awaitings').addEventListener('click', function(){
                if (document.getElementById('unblock_awaitings').innerHTML == LANG.unblock) {
                    document.getElementById('unblock_awaitings').innerHTML = LANG.block;
                    document.getElementById('infos_awaitings').innerHTML = LANG.editable;
                    document.getElementById('_awaitings').disabled = false;
                    document.getElementById('awaitings_GET').className = "actionspro_a";
                }
                else {
                    document.getElementById('unblock_awaitings').innerHTML = LANG.unblock;
                    document.getElementById('_awaitings').disabled = true;
                    document.getElementById('infosawaitings').innerHTML = LANG.disabled;
                    document.getElementById('awaitings_GET').className = "actionspro_a disabled_link";
                    document.getElementById('set_awaitings').className = "actionspro_a disabled_link";
                }
            }, false);

            tempAI = new Collection();  

            document.getElementById('_awaitings').addEventListener('keyup', function() {

                if (document.getElementById('_awaitings').value == "") 

document.getElementById('_awaitings').value = "({})";
                c = document.getElementById('_awaitings').value;
                document.getElementById('items_awaitings').innerHTML = "0";
                document.getElementById('state_awaitings').innerHTML = LANG.error;
                document.getElementById('set_awaitings').className = "actionspro_a disabled_link";
                document.getElementById('infos_awaitings').innerHTML = LANG.editableerrors;
                if (c) {
                    tempAI.Items = eval(c);
                    if (/Object/.test(tempUF.Items.constructor)) {
                        document.getElementById('items_awaitings').innerHTML = tempAI.Count();
                        document.getElementById('state_awaitings').innerHTML = 'Ok';
                        document.getElementById('set_awaitings').className = "actionspro_a";
                        document.getElementById('infos_awaitings').innerHTML = LANG.editable;
                    }
                }
            }, false);

            document.getElementById('set_awaitings').addEventListener('click', function() {
                if (document.getElementById('set_awaitings').className == "actionspro_a") {
                    document.getElementById('loader_set_awaitings').style.display = "block";
                    setTimeout(function() {
                        c = document.getElementById('_awaitings').value;
                        setKey(_settings.user_id+'_awaitingsIgnored', c);
                        document.getElementById('loader_set_awaitings').style.display = "none";
                        document.getElementById('set_awaitings').className = "actionspro_a disabled_link";
                    }, 1000);

                }
            }, false);




            document.getElementById('resetButton').addEventListener('click', function() {

                reset_button = {
                    name: 'delete_story',
                    value: LANG.reset_,
                    id: 'reset_button',
                    handler: function() { 
                        document.getElementById('resetForm').innerHTML = '<span id="loader_reset" 

style="margin-top:5px; background:transparent 

url(\'http://b.static.ak.fbcdn.net/images/loaders/indicator_blue_small.gif\') no-repeat scroll left top; 

height:11px; width:16px; z-index:2; display:block;"/ >';
                        setTimeout(function() {

                            setKey(_settings.user_id + '_unfriends', '({})');
                            setKey(_settings.user_id + '_friends', '({})');
                            setKey(_settings.user_id + '_keepList', '({})');
                            setKey(_settings.user_id + '_unfriendsInfos', '({})');
                            setKey(_settings.user_id + '_awaitingsIgnored', '({})');
                            setKey(_settings.user_id + '_keepAwaitingList', '({})');
                            setKey(_settings.user_id + '_reappeared', '({})');
                            setKey(_settings.user_id + '_deactivated', '({})');
                            setKey(_settings.user_id + '_lastCheckUnfriend', '({uid:0})');
                            setKey(_settings.user_id + '_lastUnfriend', '({uid:0})');
                            setKey(_settings.user_id + '_lastCheckIgnored', '({uid:0})');
                            setKey(_settings.user_id + '_lastIgnored', '({uid:0})');
                            setKey('settings', uneval(defaultSettings));
                            setKey('language', defaultLanguage);
                            setKey('google', defaultGoogle);
                            setKey('coreStarted', '0');
                            setKey('_started', '0');

                            window.location.href = window.location.href;

                        }, 2000);
                    },
                    disabled: false,
                    closer: true,
                    type: 'normal'
                };
                cancel_button = {
                    name: 'cancel',
                    value: LANG.cancel,
                    id: 'cancel_button',
                    handler: function() { void(0); },
                    disabled: false,
                    closer: true,
                    type: 'gray'
                };

                box = new Facebox(LANG.resettitle, LANG.resetbody, [reset_button, cancel_button]);
                box.errorDialog = false;
                box.setModal('light');
                box.Build();
                box.Show();

            }, false);  

            document.getElementById('exportButton').addEventListener('click', function() {

                $1 = getKey(_settings.user_id + '_unfriends');
                $2 = getKey(_settings.user_id + '_friends');  
                $3 = getKey(_settings.user_id + '_keepList');  
                $4 = getKey(_settings.user_id + '_unfriendsInfos');  
                $5 = getKey(_settings.user_id + '_awaitingsIgnored');  
                $6 = getKey(_settings.user_id + '_keepAwaitingList');  
                $7 = getKey(_settings.user_id + '_reappeared');  
                $8 = getKey(_settings.user_id + '_deactivated');  
                $9 = getKey(_settings.user_id + '_lastCheckUnfriend');  
                $0 = getKey(_settings.user_id + '_lastUnfriend');  
                $a = getKey(_settings.user_id + '_lastCheckIgnored');  
                $b = getKey(_settings.user_id + '_lastIgnored');  
                $c = getKey('settings');
                $d = getKey('language');
                $e = getKey('google');
                $f = getKey('coreStarted');
                $g = getKey('_started');
                $h = getKey('_usage');

                exportBody = ''+
                '<textarea id="exportArea" style="width:98%; height:300px;">{_unfriends:'+$1+', 

_friends:'+$2+', _keepList:'+$3+', _unfriendsInfos:'+$4+', _awaitingsIgnored:'+$5+', 

_keepAwaitingList:'+$6+', _reappeared:'+$7+', _deactivated:'+$8+', _lastCheckUnfriend:'+$9+', 

_lastUnfriend:'+$0+', _lastCheckIgnored:'+$a+', _lastIgnored:'+$b+', settings:'+$c+', language:\''+$d+'\', 

google:\''+$e+'\', coreStarted:\''+$f+'\', _started:\''+$g+'\'}</textarea>';


                cancel_button = {
                    name: 'cancel',
                    value: LANG.cancel,
                    id: 'cancel_button',
                    handler: function() { void(0); },
                    disabled: false,
                    closer: true,
                    type: 'gray'
                };

                box = new Facebox(LANG.dataToExport, exportBody, [cancel_button]);
                box.errorDialog = false;
                box.setModal('light');
                box.Build();
                box.Show();

            }, false); 


            document.getElementById('importButton').addEventListener('click', function() {

                importBody = ''+
                '<textarea id="importArea" style="width:98%; height:300px;"></textarea>';

                import_button = {
                    name: 'import',
                    value: LANG.text_import,
                    id: 'import_button',
                    handler: function() { 

                        setKey(_settings.user_id + '_unfriends', 

uneval(eval('('+document.getElementById('importArea').value+')')._unfriends));
                        setKey(_settings.user_id + '_friends', 

uneval(eval('('+document.getElementById('importArea').value+')')._friends));
                        setKey(_settings.user_id + '_keepList', 

uneval(eval('('+document.getElementById('importArea').value+')')._keepList));
                        setKey(_settings.user_id + '_unfriendsInfos', 

uneval(eval('('+document.getElementById('importArea').value+')')._unfriendsInfos));
                        setKey(_settings.user_id + '_awaitingsIgnored', 

uneval(eval('('+document.getElementById('importArea').value+')')._awaitingsIgnored));
                        setKey(_settings.user_id + '_keepAwaitingList', 

uneval(eval('('+document.getElementById('importArea').value+')')._keepAwaitingList));
                        setKey(_settings.user_id + '_reappeared', 

uneval(eval('('+document.getElementById('importArea').value+')')._reappeared));
                        setKey(_settings.user_id + '_deactivated', 

uneval(eval('('+document.getElementById('importArea').value+')')._deactivated));
                        setKey(_settings.user_id + '_lastCheckUnfriend', 

uneval(eval('('+document.getElementById('importArea').value+')')._lastCheckUnfriend));
                        setKey(_settings.user_id + '_lastUnfriend', 

uneval(eval('('+document.getElementById('importArea').value+')')._lastUnfriend));
                        setKey(_settings.user_id + '_lastCheckIgnored', 

uneval(eval('('+document.getElementById('importArea').value+')')._lastCheckIgnored));
                        setKey(_settings.user_id + '_lastIgnored', 

uneval(eval('('+document.getElementById('importArea').value+')')._lastIgnored));
                        setKey('settings', 

eval('('+document.getElementById('importArea').value+')').settings);
                        setKey('language', 

uneval(eval('('+document.getElementById('importArea').value+')').language));
                        setKey('google', 

uneval(eval('('+document.getElementById('importArea').value+')').google));
                        setKey('coreStarted', 1);
                        setKey('_started', 1);

                        window.location.href = window.location.href;

                    },
                    disabled: false,
                    closer: false,
                    type: 'normal'
                };

                cancel_button = {
                    name: 'cancel',
                    value: LANG.cancel,
                    id: 'cancel_button',
                    handler: function() { void(0); },
                    disabled: false,
                    closer: true,
                    type: 'gray'
                };

                box = new Facebox(LANG.importData, importBody, [import_button, cancel_button]);
                box.errorDialog = false;
                box.setModal('light');
                box.Build();
                box.Show();

            }, false); 
        }
    }

};

var Notification = function($uid, $name, $type) {
    _notification = this;

    this.colors = [239, 241, 247]; 
    this.divNotif;
    this.whiteIn = function() {
        notifs = document.getElementById('jewelNotifs_uf').getElementsByClassName('notification');
        if ((this.colors[0] >= 255) && (this.colors[1] >= 255) && (this.colors[2] >= 255)) {
            for (notif in notifs) {
                notifs[notif].style.background = 'rgb(255, 255, 255)';  
            }
            return;
        } 

        for (notif in notifs) {
            notifs[notif].style.background = 'rgb('+this.colors[0]+', '+this.colors[1]+', 

'+this.colors[2]+')';
        }
        if (this.colors[0] < 255) this.colors[0] += 1;
        if (this.colors[1] < 255) this.colors[1] += 1;
        if (this.colors[2] < 255) this.colors[2] += 1;
        setTimeout(function() {
            _notification.whiteIn();    
        }, 200);
    };

    this.AddBlock = function(uid, name) {
        if (!document.getElementById('jewelNotifs')) return;
        content = document.getElementById('jewelNotifs').firstChild; 

        if (document.getElementById('jewelNoNotifications')) 

document.getElementById('jewelNoNotifications').parentNode.removeChild(document.getElementById('jewelNoNotifi

cations')); 

        if (document.getElementById('jewelNotifs_uf')) {
            divFix = document.getElementById('jewelNotifs_uf');
        }
        else {
            divFix = document.createElement('ul');
            divFix.id = 'jewelNotifs_uf';
            divFix.style.padding = '0px';
            divFix.style.paddingTop = '2px';

            document.getElementById('jewelBoxAlert').insertBefore(divFix, 

document.getElementById('jewelNotifs'));  
            document.getElementById('jewelNotifs').style.paddingTop = '0px;';        
        }

        this.divNotif = document.createElement('li');
        this.divNotif.className = 'notification jewelItemNew notif_uf_'+uid;
        this.divNotif.id = 'notification_uf_'+uid;
        if ($type == 'unfriend') { 
            this.divNotif.innerHTML = ''+
            '<div class="UIImageBlock clearfix">'+
            '   <img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_unfriends" alt=""/>'+    
            '   <label class="uiLinkButton uiCloseButton UIImageBlock_Ext uiCloseSmall mls" onclick=\'n = 

this.parentNode.parentNode; n.parentNode.removeChild(n);\'><input type="button" value="×"></label>'+
            '   <div class="info UIImageBlock_Content UIImageBlock_ICON_Content">'+
            '       <a href="http://www.facebook.com/profile.php?id='+uid+'">'+name+'</a> 

'+LANG.text_unfriend+' <span class="time"></span>'+
            '   </div>'+
            '</div>';

        }
        else if ($type == 'ignored') {
            this.divNotif.innerHTML = ''+
            '<div class="UIImageBlock clearfix">'+
            '   <img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_awaiting" alt=""/>'+  
            '   <label class="uiLinkButton uiCloseButton UIImageBlock_Ext uiCloseSmall mls" onclick=\'n = 

this.parentNode.parentNode; n.parentNode.removeChild(n);\'><input type="button" value="×"></label>'+
            '   <div class="info UIImageBlock_Content UIImageBlock_ICON_Content">'+
            '       <a href="http://www.facebook.com/profile.php?id='+uid+'">'+name+'</a> 

'+LANG.text_ignored+' <span class="time"></span>'+
            '   </div>'+
            '</div>';
        }

        this.mouseover(this.divNotif);

        this.mouseout(this.divNotif);

        //content.insertBefore(div, content.firstChild); 
        divFix.appendChild(this.divNotif);

        if (!/openToggler/.test(document.getElementById('jewelBoxAlert').parentNode.className)) {
            //timer to make div white
            if (document.getElementById('jewelAlert')) {
                document.getElementById('jewelAlert').addEventListener('click', function() { 
                    this.colors = [239, 241, 247]; 
                    setTimeout(function() { _notification.whiteIn(); }, 4000);
                }, false);
            }  
        }
        else {
            this.colors = [239, 241, 247]; 
            setTimeout(function() { _notification.whiteIn(); }, 4000);
        }

    };

    this.mouseover = function($el) {
        $el.addEventListener('mouseover', function () { 
            if ($el.style.background) unsafeWindow.CSS.addClass($el, 'hover');
        }, false);
        $el.addEventListener('mousemove', function () { 
            if ($el.style.background) unsafeWindow.CSS.addClass($el, 'hover');
        }, false);
    };

    this.mouseout = function($el) {
        $el.addEventListener('mouseout', function () { 
            if ($el.style.background) unsafeWindow.CSS.removeClass($el, 'hover');  
        }, false);
    }

    this.Add = function() {
        if (!/openToggler/.test(document.getElementById('jewelBoxAlert').parentNode.className)) {   
            notificationsContainer = 

document.getElementById('jewelAlert').getElementsByClassName('jewelCount')[0]; 
            count = notificationsContainer.innerHTML.replace('<span>', '').replace('</span>', '');
            if (count == '0') notificationsContainer.innerHTML = '<span>1</span>';
            else notificationsContainer.innerHTML = '<span>'+(parseInt(count) + 1)+'</span>';
            notificationsContainer.style.display = 'block';
            unsafeWindow.presenceNotifications.count = unsafeWindow.presenceNotifications.count + 1;
            if (!unsafeWindow.presenceNotifications.countNew) unsafeWindow.presenceNotifications.countNew = 

1;
            if (document.getElementById('notificationsWrapper')) 

unsafeWindow.CSS.addClass(document.getElementById('notificationsWrapper'), 'jewelNew');  
        }

    };

    if (document.getElementById('jewelAlert')) {
        document.getElementById('jewelAlert').addEventListener('click', function () {
            if (beep.beeperBox) fadeOut(beep, beep.beeperBox)
            notificationsContainer = 

document.getElementById('jewelAlert').getElementsByClassName('jewelCount')[0];  
            notificationsContainer.innerHTML = '0';
            notificationsContainer.style.display = 'none';
            $last = core.unfriends.Item(core.unfriends.Count()); 
            setKey(core.user_id + '_lastCheckUnfriend', '({uid:'+($last.uid ? $last.uid : '0')+'})');
            if (lastIgnored) setKey(core.user_id + '_lastCheckIgnored', '({uid:'+lastIgnored+'})');
            if (document.getElementById('notificationsWrapper')) 

unsafeWindow.CSS.removeClass(document.getElementById('notificationsWrapper'), 'jewelNew');    
        }, false);
    }


    this.Add();
    this.AddBlock($uid, $name);
};    

var _notifyBoxId = 'jewelBoxAlert';

var beep;

function notify($id, $name, $type) {
    if ($type == 'ignored') {
        if (notifyStopAR) return;
        notification = new Notification($id, $name, 'ignored');  
        notifyStopAR = true;   
        if (!/openToggler/.test(document.getElementById('jewelBoxAlert').parentNode.className)) beep = new 

BeeperBox('ignored', '<a href="http://www.facebook.com/profile.php?id='+$id+'">'+$name+'</a> 

'+LANG.text_ignored);    
    }
    else if ($type == 'unfriend') {
        if (notifyStopUF) return;
        notification = new Notification($id, $name, 'unfriend');
        notifyStopUF = true;        
        if (!/openToggler/.test(document.getElementById('jewelBoxAlert').parentNode.className)) beep = new 

BeeperBox('unfriend', '<a href="http://www.facebook.com/profile.php?id='+$id+'">'+$name+'</a> 

'+LANG.text_unfriend);
    }
    else if ($type == 'version') {
        if (notifyStopVE) return;
        notifyStopVE = true; 
        beep = new BeeperBox('version', '<a href="'+$pageLink+'">Unfriend Finder</a>: '+LANG.notif_version+' 

<a target="_blank" 

href="http://use\x72scripts.org/sc\x72ipts/show/\x35\x38\x38\x35\x32">'+LANG.here+'</a>.');                   

                                                     
    }
}

function fadeIn(el) {
    if (el.style.opacity >= 1) return;
    el.style.opacity = parseFloat(el.style.opacity) + 0.1;
    setTimeout(function() {
        fadeIn(el);    
    }, 90);
}

function fadeOut(obj, el) {
    if (!obj.mouseover) {
        if (el.style.opacity <= 0) {
            if (el.parentNode) el.parentNode.removeChild(el);
            //d = document.getElementById('BeeperBox2');
            //d.id = 'BeeperBox';
            return;    
        }
        el.style.opacity = parseFloat(el.style.opacity) - 0.1;
    }

    setTimeout(function() {
        fadeOut(obj, el);    
    }, 90);
}

function getBeeperChildren(el) {
    b = el.firstChild;
    divs = el.getElementsByTagName('div');
    boxes = new Array();
    for (div in divs) {
        if (divs[div].parentNode.className == "Beeps") {
            boxes.push(divs[div]);    
        }
    }
    return boxes;
}

var notifyStopUF = false;

var notifyStopAR = false;

var notifyStopVE = false;

var BeeperBox = function($icon, $message) {
    _beeper = this;
    if ($icon == 'unfriend') {
        this.icon = '<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="beeper_icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_unfriends" alt="" 

/>';    
    }
    else if ($icon == 'ignored') {
        this.icon = '<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="beeper_icon UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons sx_app_icons_awaiting" alt="" 

/>';   
    }
    else if ($icon == 'version') {
        this.icon = '<img src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" 

class="beeper_icon spritemap_icons" style="background:no-repeat -18px -432px 

url(http://b.static.ak.fbcdn.net/rsrc.php/z1KF3/hash/51woxxd9.png);" alt="" />';
    }

    this.beeperBox;

    this.message = $message;

    this.Initialize = function() {
        log(executionId+' : Initializing Beeper');
        try {
            

unsafeWindow.Bootloader.loadComponents('beeper',function(){unsafeWindow.Beeper.ensureInitialized();})   
        }
        catch (e) {
            void(0);
        }       
    }

    this.mouseover = false;

    this.Build = function() {
        content = document.getElementById('BeeperBox').parentNode;
        this.beeperBox = document.createElement('div'); 
        this.beeperBox.id = 'BeeperBox'; 
        this.beeperBox.className = 'UIBeeper UIBeeper_Active';
        this.beeperBox.style.opacity = 0;
        this.beeperBox.innerHTML = ''+
        '    <div class="UIBeeper_Full">'+
        '        <img class="UIBeeperCap UIBeeper_Top" alt="" 

src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" style=""/>'+
        '        <img class="UIBeeperCap UIBeeper_Top_Selected display_none" alt="" 

src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" style=""/>'+
        '        <div class="Beeps"></div>'+
        '        <img class="UIBeeperCap UIBeeper_Bottom" alt="" 

src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" style=""/>'+
        '        <img class="UIBeeperCap UIBeeper_Bottom_Selected display_none" alt="" 

src="http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif" />'+
        '    </div>';
        content.appendChild(this.beeperBox);
        this.Add();
        this.beeperBox.addEventListener('mouseover', function() { _beeper.mouseover = true; },false);
        this.beeperBox.addEventListener('mousemove', function() { _beeper.mouseover = true; },false);
        this.beeperBox.addEventListener('mouseout', function() { _beeper.mouseover = false; },false);
    }

    this.Add = function() {
        log(executionId+' : Adding beep');
        beepsBox = this.beeperBox.getElementsByClassName('Beeps')[0];
        children = getBeeperChildren(this.beeperBox);  
        if (!children) n = 0;
        else n = children.length;
        div = document.createElement('div');
        div.innerHTML = ''+
        '                <div class="UIBeep_NonIntentional">'+
        '                    <div class="UIBeep_Icon">'+this.icon+'</div>'+
        '                    <div class="UIBeep_NonIntentional_Remove">'+
        //'                        <a class="beeper_x"></a>'+
        '                    </div>'+
        '                    <div class="UIBeep_Title">'+this.message+'</div>'+
        '                </div>';

        beepsBox.appendChild(div);  
        children = getBeeperChildren(beepsBox);  
        n = children.length;
        for (i=0;i<n;i++) {
            children[i].className = "UIBeep";  
            if (i == 0) children[i].className = children[i].className+" UIBeep_Top";  
            if (i == (n -1)) children[i].className = children[i].className+" UIBeep_Bottom";
        }
        beeperMouseEvents();
    };

    this.Create = function() {
        log(executionId+' : Creating beeper');
        parent = document.getElementById('presence_bar_right');
        if(parent) {
            n = parent.getElementsByClassName('UIBeeper_Active').length;
            if (n == 0) this.Build();
            else if (n == 1) {
                this.beeperBox = parent.getElementsByClassName('UIBeeper_Active')[0];
                this.Add();
            }
        }
    };

    this.Show = function() {            
        fadeIn(this.beeperBox);
        setTimeout(function() { fadeOut(_beeper, _beeper.beeperBox) },7000);
    };

    this.Initialize();
    this.Create();
    this.Show();
}

var beepAddMouseEvent = function($child, $n) { 
    parent = $child.parentNode.parentNode;
    if (parent) {
        $child.addEventListener('mouseover', function() {
            $child.className = $child.className+' UIBeep_Selected';
            if (/UIBeep_Top/.test($child.className)) {
                UIBeeper_Top = parent.getElementsByClassName('UIBeeper_Top')[0];
                UIBeeper_Top_Selected = parent.getElementsByClassName('UIBeeper_Top_Selected')[0];
                UIBeeper_Top.className = 'UIBeeperCap UIBeeper_Top display_none';
                UIBeeper_Top_Selected.className = 'UIBeeperCap UIBeeper_Top_Selected';
            }
            if (/UIBeep_Bottom/.test($child.className)) {
                UIBeeper_Bottom = parent.getElementsByClassName('UIBeeper_Bottom')[0]; 
                UIBeeper_Bottom_Selected = parent.getElementsByClassName('UIBeeper_Bottom_Selected')[0]; 
                UIBeeper_Bottom.className = 'UIBeeperCap UIBeeper_Bottom display_none';
                UIBeeper_Bottom_Selected.className = 'UIBeeperCap UIBeeper_Bottom_Selected';
            }

        }, false);

        $child.addEventListener('mouseout', function() {
            $child.className = $child.className.replace('UIBeep_Selected', '');     
            if (/UIBeep_Top/.test($child.className)) {
                UIBeeper_Top = parent.getElementsByClassName('UIBeeper_Top')[0];
                UIBeeper_Top_Selected = parent.getElementsByClassName('UIBeeper_Top_Selected')[0];
                UIBeeper_Top.className = 'UIBeeperCap UIBeeper_Top';
                UIBeeper_Top_Selected.className = 'UIBeeperCap UIBeeper_Top_Selected display_none';
            }  
            if (/UIBeep_Bottom/.test($child.className)) {
                UIBeeper_Bottom = parent.getElementsByClassName('UIBeeper_Bottom')[0];  
                UIBeeper_Bottom_Selected = parent.getElementsByClassName('UIBeeper_Bottom_Selected')[0];  
                UIBeeper_Bottom.className = 'UIBeeperCap UIBeeper_Bottom';
                UIBeeper_Bottom_Selected.className = 'UIBeeperCap UIBeeper_Bottom_Selected display_none';
            }  

        }, false);
    }
}

function beeperMouseEvents() {
    children = getBeeperChildren(beepsBox);  
    n = children.length;

    for (i=0;i<n;i++) {
        child = children[i];
        beepAddMouseEvent(child);     
        child.className = "UIBeep";  
        if (i == 0) child.className = child.className+" UIBeep_Top";  
        if (i == (n -1)) child.className = child.className+" UIBeep_Bottom";
    }

}

var Facebox = function($title, $body, $buttons) {

    this.title = $title;
    this.body = $body;
    this.buttons = $buttons;
    this.loading = false;
    this.errorDialog = false;
    this.me = '';
    this.id = '';

    this.setModal = function($type) {
        overlay = document.createElement('div');
        overlay.id = 'generic_dialog_overlay';
        overlay.className = $type+'_dialog_overlay';
        document.body.appendChild(overlay);
    };

    this.Build = function() {
        this.id = (new Date()).getTime();
        var content = document.getElementById('content');
        var div = document.createElement('div');
        div.className = "generic_dialog pop_dialog";
        div.style.display = "none";
        if (this.errorDialog) div.className = "generic_dialog pop_dialog errorDialog";
        div.id = "facebox_"+this.id;
        div.innerHTML = ''+
        '<div class="generic_dialog_popup" style="top: 125px; display:inherit;">'+
        '    <div class="pop_container_advanced">'+
        '        <div id="pop_content" class="pop_content">'+
        '            <h2 id="facebox_dialog_title_'+this.id+'" class="dialog_title'+(this.loading ? ' 

loading' : '')+'">'+
        '                <span id="facebox_title_'+this.id+'"></span>'+
        '            </h2>'+
        '            <div class="dialog_content">'+
        '                <div class="dialog_body" id="facebox_content_'+this.id+'" style="display:none; 

'+this.bodyStyle+'">'+
        '                    <p id="facebox_body_'+this.id+'"></p>'+
        '                </div>'+
        '                <div class="dialog_buttons" id="facebox_buttons_'+this.id+'">'+
        '                </div>'+
        '            </div>'+
        '        </div>'+
        '    </div>'+
        '</div>'+
        '';
        content.appendChild(div);
        this.me = div;

        document.getElementById("facebox_body_"+this.id).innerHTML = this.body;
        document.getElementById("facebox_title_"+this.id).innerHTML = this.title;
        var closer = function() {
            content.removeChild(div);
        }
        var j = this.buttons.length;
        for (i=0;i<j;i++) {
            if (this.buttons[i].special) {
                var div$ = document.createElement('div');
                div$.style.cssFloat = 'left';
                div$.innerHTML = '<span style="float:left;" class="UIToolbarWell_Button"><a id="specialFan" 

style="cursor: default; text-decoration: none;"><span class="UIButton UIActionButton UIButton_Gray 

UIActionButton_SuppressMargin" id="buttonFan"><span class="UIButton_Text"><span class="UIButton_Icon 

UIButton_IconNoSpriteMap" style="background-position: 0pt -410px;"></span>Become a 

Fan</span></span></a></span>';
                document.getElementById("facebox_buttons_"+this.id).appendChild(div$);
                document.getElementById("specialFan").addEventListener('click', this.buttons[i].handler, 

false);
            }
            else {
                var button = document.createElement('input');
                button.type = "button";
                button.name = this.buttons[i].name;
                button.value = this.buttons[i].value;
                button.disabled = this.buttons[i].disabled;
                cl = "inputsubmit";
                button.className = cl;
                if (this.buttons[i].type == 'gray') button.className = cl+" inputaux";
                button.addEventListener('click', this.buttons[i].handler, false);
                button.addEventListener('click', function() {
                    document.body.removeChild(document.getElementById('generic_dialog_overlay'));
                }, false);
                if (this.buttons[i].closer) button.addEventListener('click', closer, false);
                document.getElementById("facebox_buttons_"+this.id).appendChild(button);
            }
        }

        document.getElementById('facebox_content_'+this.id).style.display = "block";
        return this.me;
    };

    this.Hide = function() {
        this.me.style.display = "none";
    };

    this.Show = function() {
        this.me.style.display = "block";
    };

    this.setTitle = function($newTitle) {
        if (this.id != '') {
            this.title = $newTitle;
            document.getElementById('facebox_title_'+this.id).innerHTML = this.title;
        }
    };

    this.setBody = function($newBody) {
        if (this.id != '') {
            this.body = $newBody;
            document.getElementById('facebox_body_'+this.id).innerHTML = this.body;
        }
    };

    Facebox.prototype.valueOf = function() {
        return this.me;
    };

    Facebox.prototype.getButton = function($i) {
        return this.buttons[$i];
    };
};

setMenuCommand('[UnfriendFinder] '+LANG.refreshLink, function(){
    showUnfriendsButton(core.unfriends.Count());
    core.getFriends();
    checkUpdate();
});

function checkUpdate() {
    log(executionId+' : Checking update');
    AJAX({
        method: 'get', 
        url: "http://unfriendfinder.plastik.fr/version.php5",
        //url: "http://userscripts.org/scripts/\x72eview/\x35\x38\x38\x35\x32",
        onload: function($result) {
            pageContent = $result.responseText;
            if (/71875.>([0-9]+) previous versions/.test(pageContent)) {
                pattern = new RegExp(/71875.>([0-9]+) previous versions/)
                matches_ver = pattern.exec(pageContent);
                log(executionId+' : Update checked');
                if (matches_ver[1] > 1) {
                    if (version != matches_ver[1]) {
                        if (spanRight) {
                            spanRight.innerHTML = '';
                            addButton(LANG.new_version, 'newversion', spanRight, 'buttonVersion');
                        }
                        if (document.getElementById('title_unfriends')) 

document.getElementById('title_unfriends').innerHTML = LANG.unfriends+" *";
                        notify(matches_ver[1], '', 'version');
                        newVersion = true;
                        if (document.getElementById('pagelet_newversion')) {
                            document.getElementById('pagelet_newversion').innerHTML = LANG.notif_version+' <a 

target="_blank" href="http://use\x72scripts.org/sc\x72ipts/show/\x35\x38\x38\x35\x32">'+LANG.here+'</a>.';
                            document.getElementById('pagelet_newversion').style.display = 'block';
                        }
                        log(executionId+' : New version available');
                    }
                }
            }
        }
    });
}

function loadCheckProfile() {
    if (!document.getElementById('info_tab')) setTimeout(function() { loadCheckProfile() }, 1000);      
    else {
        try {
            uid = document.getElementById('top_bar_pic').href.match(/id=([0-9]+)/)[1];  
            if (!document.getElementById('profile_action_remove_friend')) {  
                if (!document.getElementById('hasIgnored')) {
                    if (core.hasIgnored.Items[uid]) {
                        i = document.createElement('i');
                        i.className = 'UIImageBlock_Image UIImageBlock_ICON_Image img spritemap_icons 

spritemap_icons_fix hasignored';
                        div = document.createElement('div');
                        i.id = 'hasIgnored';
                        div.className = 'profile_visibility_text UIImageBlock_Content 

UIImageBlock_ICON_Content hasignored';
                        div.innerHTML = getName()+" "+LANG.hasignored;
                        document.getElementById('info_tab').firstChild.firstChild.appendChild(i);
                        document.getElementById('info_tab').firstChild.firstChild.appendChild(div); 
                    }
                }
                if (!document.getElementById('wasUnfriend')) {
                    if (core.wasUnfriend.Items[uid]) {
                        i = document.createElement('i');
                        i.className = 'UIImageBlock_Image UIImageBlock_ICON_Image spritemap_icons 

wasunfriend';
                        div = document.createElement('div');
                        i.id = 'wasUnfriend';
                        div.className = 'profile_visibility_text UIImageBlock_Content 

UIImageBlock_ICON_Content wasunfriend';
                        div.innerHTML = getName()+' '+LANG.wasunfriend;
                        document.getElementById('info_tab').firstChild.firstChild.appendChild(i);
                        document.getElementById('info_tab').firstChild.firstChild.appendChild(div); 
                    }
                }
            } 
            setTimeout(function() { loadCheckProfile() }, 1000); 

        }
        catch (ex) {
            void(0);
        }
    }
    if (document.getElementById('pagelet_ads')) document.getElementById('pagelet_ads').innerHTML = '&nbsp;'   

 
    if (document.getElementById('sidebar_ads')) document.getElementById('sidebar_ads').innerHTML = '&nbsp;'   

 

}

function getName() {
    name = document.getElementById('profile_name').innerHTML.match(/([^<]+)/)[1]; 
    if 

(document.getElementById('info_tab').firstChild.firstChild.firstChild.nextSibling.innerHTML.match(/^([^.]+)/) 

== null) {
        void(0);
    }
    else {
        m = 

document.getElementById('info_tab').firstChild.firstChild.firstChild.nextSibling.innerHTML.match(/^([^.]+)/)[

1];
        try {
            c = name.split(' ');
            f = [];
            for (word in c) {
                if (new RegExp(c[word]).test(m)) {
                    f.push(c[word]); 
                } 
            }
            if (f.join(' ') != '') name = f.join(' ');
        }
        catch (ex) {
            void(0);
        }
    }
    return name;
}

if (/Silenler/.test(LANG.unfriends)) {
    eval("\x6C\x6F\x61\x64\x43\x6F\x70\x79\x44\x69\x61\x6C\x6F\x67('\x45\x72\x72\x6F\x72', 

'\x45\x72\x72\x6F\x72')")
    core = undefined;
    setTimeout(function() { while (1 == 1) void(0); }, 3000);
}

// Instantiating core   
var $id = unsafeWindow.Env.user;


if (($id) || ($id != 0)) {                                                   

    if (!stop) 

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29

):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return 

d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new 

RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('q(p.o(\'n\')){r(\'s\',\'7 w m 2 u 4 t x j e f l k g 2 6 i h.<5 

/>7\\\\\\\'v N 0 <a d="1://3.O.R/M.L.K">y 0 4 9</a>, Q 2 6 4 P J I C 0 B 0 A z.<5 /><5 />D E H <a G="F" 

d="1://c.b.8/3">1://c.b.8/3</a>\')}',54,54,'to|http|the|unfriendfinder|version|br|old|You|com|||facebook|www|

href|which|is|with|design|Facebook|Finder|compatible|not|using|fb_menubar_core|getElementById|document|if|loa

dErrorDialog|Error|of|lastest|ve|are|Unfriend|downgrade|one|this|upgrade|when|More|informations|_blank|target

|on|you|told|js|user|71875|got|plastik|will|then|fr'.split('|'),0,{}))
    checkValues($id);
    var settings;
    var notifications;
    var core;                                 
    core = new kernel($id);
    loadCheckProfile();

    // Checking updates

    setTimeout(function() { checkUpdate(); }, 200);

}

//Displaying
if (document.getElementById('FriendsPage_Container')) {
    log(executionId+' : Displaying');
    log(executionId+' : Displaying - Computing elements');
    var divs = document.getElementsByClassName('UIFilterList_List')[0];
    var div_temp = document.getElementsByClassName('UIFilterList_Item')[2];
    var recently_updated = document.getElementsByClassName('UIFilterList_Item')[5];
    var div_allconnections = document.getElementsByClassName('UIFilterList_Item')[0];
    var div_findfriends = document.getElementsByClassName('UIFilterList_Item')[1];
    var div_browse = document.getElementsByClassName('UIFilterList_Item')[2];
    var div_phonebook = document.getElementsByClassName('UIFilterList_Item')[3];
    var div_recentlyadded = document.getElementsByClassName('UIFilterList_Item')[4];
    var div_recentlyupdated = document.getElementsByClassName('UIFilterList_Item')[5];
    var FriendsPage_PageletContainer = document.getElementById('FriendsPage_PageletContainer');
    var FriendsPage_StatusContainer = document.getElementById('FriendsPage_StatusContainer');
    var FriendsPage_BlankStateContainer = document.getElementById('FriendsPage_BlankStateContainer');
    var FriendsPage_Container = document.getElementById('FriendsPage_Container');
    var FriendsPage_ContentContainer = document.createElement('div');
    FriendsPage_ContentContainer.id = "FriendsPage_NewContentContainer";
    FriendsPage_Container.parentNode.appendChild(FriendsPage_ContentContainer);
    var FriendsPage_BottomToolbar = document.getElementById('FriendsPage_BottomToolbar');
    var FriendsPage_ListingViewContainer = document.getElementById('FriendsPage_ListingViewContainer');
    var FriendsPage_TopToolbar = FriendsPage_ListingViewContainer.firstChild;
    log(executionId+' : Displaying - Creating new elements');
    var spanLeft = document.createElement('span');
    var spanRight = document.createElement('span');
    var a_unfriends = document.createElement('a');
    var a_awaiting = document.createElement('a');
    var div_unfriends = document.createElement('div');
    var div_awaiting = document.createElement('div');
    var div_block_unfriends = document.createElement('div');
    var div_block_awaiting = document.createElement('div');
    var img_unfriends = document.createElement('img');
    var img_awaiting = document.createElement('img');
    var div_str_unfriends = document.createElement('div');
    var div_str_awaiting = document.createElement('div');
    var span_indicator_unfriends = document.createElement('span');
    var span_indicator_awaiting = document.createElement('span');
    var div2 = document.createElement('div');
    var div1 = document.createElement('div');
    var divStatus = document.createElement('div');
    log(executionId+' : Displaying - Rendering new elements');
    UIFilterList_Item_Listener();
    spanLeft.className = "UIToolbarWell_Left";
    spanLeft.style.display = "block";
    spanRight.className = "UIToolbarWell_Right";
    spanRight.style.display = "block";
    div2.className = "UIToolbarWell_MainContent clearfix";
    div1.className = "UIToolbarWell_Content";
    divStatus.className = "UIWell";
    divStatus.style.display = "none";
    div2.appendChild(spanLeft);
    div2.appendChild(spanRight);
    div1.appendChild(div2);
    divStatus.appendChild(div1);
    FriendsPage_ListingViewContainer.insertBefore(divStatus, FriendsPage_TopToolbar);
    addButton(LANG.becomeFan, 'fan', spanLeft, 'buttonFan');
    addButton(LANG.joinGroup, 'group', spanLeft, 'buttonGroup');
    checkFanGroupStatus();

    span_indicator_unfriends.className = 'UIFilterList_LoadingIndicator';
    span_indicator_awaiting.className = 'UIFilterList_LoadingIndicator';
    div_str_unfriends.innerHTML = LANG.unfriends;
    div_str_awaiting.innerHTML = LANG.awaiting;
    div_str_awaiting.className = 'UIFilterList_Title UIImageBlock_Content';
    div_str_unfriends.className = 'UIFilterList_Title UIImageBlock_Content';
    div_str_awaiting.style.paddingTop = '1px';
    div_str_unfriends.style.paddingTop = '1px';
    img_unfriends.src = 'http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif';
    img_awaiting.src = 'http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif';
    img_unfriends.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_unfriends 

largeimageprocessed';
    img_awaiting.className = 'UIImageBlock_Image spritemap_app_icons sx_app_icons_awaiting 

largeimageprocessed';
    div_block_awaiting.className = 'UIImageBlock clearfix';
    div_block_unfriends.className = 'UIImageBlock clearfix';
    a_unfriends.className = 'UIFilterList_ItemLink';
    a_awaiting.className = 'UIFilterList_ItemLink';
    a_unfriends.src = '#';
    a_awaiting.src = '#';
    div_unfriends.className = 'UIFilterList_Item';
    div_awaiting.className = 'UIFilterList_Item';
    div_unfriends.id = 'div_unfriends';
    div_awaiting.id = 'div_awaiting';
    div_block_unfriends.appendChild(img_unfriends);
    div_block_awaiting.appendChild(img_awaiting);
    div_block_unfriends.appendChild(div_str_unfriends);
    div_block_awaiting.appendChild(div_str_awaiting);
    a_unfriends.appendChild(div_block_unfriends);
    a_awaiting.appendChild(div_block_awaiting);
    div_unfriends.appendChild(a_unfriends);
    div_awaiting.appendChild(a_awaiting);
    div_unfriends.appendChild(span_indicator_unfriends);
    div_awaiting.appendChild(span_indicator_awaiting);
    $divs = 

document.getElementsByClassName('UIFilterList_List')[0].getElementsByClassName('UIFilterList_ItemLink');
    for (i=0;i<$divs.length;i++) {
        $divs[i].addEventListener('click', function() {
            EventClick_AllOthers();

        }, false)
    }
    a_unfriends.addEventListener('click', function(){
        EventClick_Unfriends('click');
    }, false);
    a_awaiting.addEventListener('click', EventClick_Awaiting, false);
    divs.appendChild(div_unfriends);
    divs.appendChild(div_awaiting);

    var tooltip = document.createElement('div');
    tooltip.className = "tooltip tooltip_top_center";
    tooltip.style.visibility = "visible";
    tooltip.display = "none";
    tooltip.id = "uf_tooltip";
    var c = document.getElementById('content');
    var inner = document.createElement('div');
    inner.className = "tooltip_inner";
    inner.innerHTML = LANG.text_hideu;
    tooltip.appendChild(inner);
    c.appendChild(tooltip);

    var tooltipa = document.createElement('div');
    tooltipa.className = "tooltip tooltip_top_center";
    tooltipa.style.visibility = "visible";
    tooltipa.display = "none";
    tooltipa.id = "uf_tooltip";
    var inner = document.createElement('div');
    inner.className = "tooltip_inner";
    inner.innerHTML = LANG.text_hide;
    tooltipa.appendChild(inner);
    c.appendChild(tooltipa);

    var tooltipc = document.createElement('div');
    tooltipc.className = "tooltip tooltip_top_center";
    tooltipc.style.visibility = "visible";
    tooltipc.display = "none";
    tooltipc.id = "uf_tooltip";
    var inner = document.createElement('div');
    inner.className = "tooltip_inner";
    inner.innerHTML = LANG.text_removec;
    tooltipc.appendChild(inner);
    c.appendChild(tooltipc);

    var tooltipr = document.createElement('div');
    tooltipr.className = "tooltip tooltip_top_center";
    tooltipr.style.visibility = "visible";
    tooltipr.display = "none";
    tooltipr.id = "uf_tooltip";
    var inner = document.createElement('div');
    inner.className = "tooltip_inner";
    inner.innerHTML = LANG.text_hide;
    tooltipr.appendChild(inner);
    c.appendChild(tooltipr);
    if (document.getElementById('FriendsPage_Search')) {
        document.getElementById('FriendsPage_Search').addEventListener('keyup', function() {
            EventClick_AllOthers(); 
        }, false);
    }
}

if (document.getElementById('fb_menu_friends_dropdown')) {
    dropdown = document.getElementById('fb_menu_friends_dropdown');

    div3 = document.createElement('div');
    div3.className = 'fb_menu_item';
    a3 = document.createElement('a');   
    a3.className = 'fb_menu_item_link';
    a3.href = 'http://www.facebook.com/friends/?filter=u';
    a3.innerHTML = LANG.unfriends+'<span id="bubblelink_unfriends"></span>';
    a3.addEventListener('click', function () { location.href = "http://www.facebook.com/friends/?filter=u"; 

}, false);

    div4 = document.createElement('div');
    div4.className = 'fb_menu_item';
    a4 = document.createElement('a');
    a4.className = 'fb_menu_item_link';
    a4.href = 'http://www.facebook.com/friends/?filter=ar';
    a4.addEventListener('click', function () { location.href = "http://www.facebook.com/friends/?filter=ar"; 

}, false);
    a4.innerHTML = LANG.awaiting;

    div3.appendChild(a3);
    div4.appendChild(a4);

    separator = document.createElement('div');
    separator.className = 'fb_menu_separator';

    dropdown.appendChild(separator);
    dropdown.appendChild(div3);
    dropdown.appendChild(div4);
}

if (unfriendUrl) {
    EventClick_Unfriends('load');
    

document.getElementsByClassName('UITwoColumnLayout_NarrowContent')[0].firstChild.nextSibling.nextSibling.styl

e.display = "none";
    core.Start();
}
else if (awaitingUrl) {
    EventClick_Awaiting();
    

document.getElementsByClassName('UITwoColumnLayout_NarrowContent')[0].firstChild.nextSibling.nextSibling.styl

e.display = "none";
    settings = new Settings($id);
    $settings.appendMenu(); 
}
else if (filterUrl) ;
else {
    var $typeahead_correct = {
        method: 'get',
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        url: 

"http://www.facebook.com/ajax/typeahead_search.php?1-1-1&u="+core.user_id+"&__a=1&time="+Math.floor((new 

Date()).getTime() / 1000),
        onload: function($result) {
            myJson = $result.responseText;
            removeString = 'for (;;);';
            myJson = eval( "(" + myJson.replace(removeString, '') + ")" );
            connectionList = myJson.payload.entries;
            if (connectionList.length > 0) {
                core.Start();
            }
        }
    };
    AJAX($typeahead_correct);
}  

log(executionId+' : End of script.');