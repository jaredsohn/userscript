// ==UserScript==
// @name           IkariamDistanceCalc
// @namespace      IkariamDistanceCalc
// @description    Calculates and displays the travel time required from spy and each ship for the displaying island.
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php*view=island*
// @include        http://s*.ikariam.*/index.php*view=worldmap_iso*
// @include        http://s*.ikariam.*/*?*
// @include        http://s*.ikariam.*/
// @include        http://s*.ikariam.*/index.php
// @include        http://www.ika-world.com/suche.php?view=suche_stadt&land=en&tool=ikaSearch
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @require        http://userscripts.org/scripts/source/62718.user.js
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==
// 



var current={};
current.city={};
function parseCoords(coords){
	var match = /\[(\d+):(\d+)\]/.exec( coords );
	return {x: match[1]-0, y:match[2]-0};
}
var image = {
	"jurneytime" : "data:image/gif;base64,R0lGODlhIAAUANU8AGTcL23eM6eab7XvVbJvJaDqS4VWH8+aPG4qCn5pT5foR9z0i1XYKKfsTn7iO4bkP4/mQ1zaK+Xo6k3XJLFkFpB6X9PDZI5BCb5rF+GgMeHInUzWKa/tUvrist3xt27bSci2ipdDDkHUHtO7k/Laq8jDrvv326zohkfVIbvwWNHPwq3pf33gS9nZl6XabvfVSO/v8DvSHN/gnOjYfuaqOlVCLXbgNykcDMPyXL2yj/a9P////////wAAAAAAAAAAACH5BAEAADwALAAAAAAgABQAAAb/QJ5wSCzydMikMnmg6YzQoVNHo2UOlBACcaFQDLdolJCpWrGX7QVDINTEQ89QULvZ73h7DQQX2lZDGgkCOYWGhXQjfX4BLHIdFTuSOxKVEioqNR2LPDYBAAAnJjkCk5OVFQlCCzitAxwNBQoQDw6eoAwfMgIWMxa/FaQJJKuur7GztbcRDBMbLoW+BwIJFZvFxsi0tp/MziIfLTkaFTWKRKzZstvLzSgiMRsgMzUCRukpx+vK3e7gpTNy1CM2BJ++ZNxwOYMmKaDAPQXV7UvILFwJGDtmzDhQKEENDZw6dRNVouGMDG06quLkyRGPDiUzniRgwEChGgT7/AkEcAaNJAM0awo810eOkCVIl4QUUiXJTwxauGD4EmbplBdUDkBVwwZMEAA7",
	"transport" : "data:image/gif;base64,R0lGODlhIQAoANU/ANTKq8W7nP36xy0fFjwrIBQKB6iUeqWbiIBDG20QBlg/LaFRIW1ZRo1RK93ClUc0JpZnR45KHbSgfmlBLvXPnIh9aDAGA8eGXn9kTK1ZJaxsRosQBJhcOKaGaFdPQqx8WZd8XnBkVZWEclUrGIVZP6GNdZInFHpxYMKZdLxbLZyQgLaSbP/+5m89GdmTY8+nfeywfaoXBH1vWJpzU4dxVpQ5JbAuGJBvU8h+Xc9wOPrmsE4LBLSokHFLNuPbt////yH5BAEAAD8ALAAAAAAhACgAAAb/wJ9wSBQCQL6icskkliSHplTKCxFUgKmWGDgFRjzedusL+QCj30E8lp7EAYLPx0u2lxWRUa5m34kHJ0MAfD88WX9CASFEhCoGFTIqGCEVfloAZkYqDAMMGBAAADUwc2M+J0k8DAwTHz46KTEULCg4AqcVAQeVEiYxNhQCOjYxAj44dlOoHj0JFywsLzHAOgIvG9ABDspMPpYiGxsmAtEp4hfDJuRn3UqBiAgmzwLH4jXCFxsOAisBUjRoDCmRIIEJawI0iEOhw8EGDQmjNPlQykjBBCjqOSjIAYCOdQI+GLhURIIOPy0KRtDBskZBky51fDD0b4kPGDrmBHBW0AEF/x0aduwAAaDBDgcgfgQgSWSFDgklXHAQugOFzw9CaezcAVXIGiYGKIhFYVTojAABOuywgIHHhKGIaC45YKADhh49qJLgIQHEWgwGRoyowIWpjxKBJvR4K7SHBAMYLFhgUGHAA4lDvnK5gUExXqo9SlRgIJmBBwsPRBkwgOhATSEdPuFVoAB0JAWSH5CAoOGCi98fsgCoM2RFj2aLa6/tIaNTgec9NPS+QP3ChwAANCvNMaIHicVCLXjwQOD58wG7efv+veIFBQc1fWj4/p0x6gEKREB+UKDHhw8QfLfYAyHoR9wPHHDACisjDPBcByyxxIMC+NFGAAEPXMiACI+xAf9BBi0o5kGGBTwQwE/lOEBAhStiaBkKL8CAgn4/+JBBCgs08J0CD0xAFw8OOHBCAfg9wOMADl4RxiJJ/QBABhnkyAGAgBlwgAoVeEDkihk50AGFIvBwQAcaQDCEDxAssEAEDXBww5iryVAekf1ZowMNA0yAAQM9ZKBBSQtAiQACeahQQggOYhDbAzDU88KFPTzQQAoGKCFflGuSIEOWNPykAwUgdDCMA1oO0EMODcRVxApqRpngCDO058CnKzgggQgeKDBpBk0y4UADgWaAQAuDttBCDxBw0ACwKeCIwATuLAHCAs5GYK21g2bbgmAtMMVEAGkO2kAEg17L5rINSPARBw/JQlDCcB3cAMEM9ErQTRAAOw==",
	"spy" : "data:image/gif;base64,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",
	"ship_ram" : "data:image/gif;base64,R0lGODlhPAAwANUAANFxWtDJs3FKNvru0v///q2pmax0S4xpT4xDGqiUdXRfTCIKA65XJ89qK1AmFL0AAHE1FLZkLFEyI2U8KunexOPYrsa1jppUJpSGc//+5YZKIriyouWGWpiTh818TIR2ZbSDU/mMO51bOf1GScO8qf28ve7itYlUN3lBG5ZLH5ZTQKOekKhfQlpGNviHav+rTv+Tl9LFntGla0ccBpRnPvrMZKJSIcmUX4xRKfyscnxFMKSAYNvWx7eigp6hl/brvCH5BAEAAD8ALAAAAAA8ADAAAAb/wJ9wSCwaibHdcclsOp+/ng5KrVox06WpYLJ6oR9dZVjp9T6fg6L7bS8PkERPke7wNgRCzM0vWgQLGAF4eYUEAX18Jj0nCneGkAQUiU0WFkYmOy0bGxSRn2OURAkyMi81l0IWCgcYJJ+wBCSiQzERDS8vISYAB42EsbCItD8VDQgMDTkwNh8FGxnBwWy0DQwINyUj2jwBFNHR0pCzxDsN2SMD2y4UAxnv4eJ5GcRCCdr4Iy4D/PDw8nrq9dhG0AUMBvz6+YsXi5woCwwkqNAGA8YDBwEGtFO4MBYPYiAa2Jgh4YbFFhISUFi5MqG7hTAn0fLgIMUxBRAktEBxoluA/wA8eLDkCDPDMFEiFsxAECGCBhQIEEAg8bPqz6AtXSbMsIGYgQULJiCLINVBIJ9WrQplSUHogFSiGoCtGdWs0h0BSOjdy1dvVb9dvY6cAWHChBkOIEA4kLfvXk4FIhdYsaJAj3rmLkggSUMqhBmMOYkeHXlFh9MYPigAUc9CiggnJkjQAMHBjBmunpGebLoDhtQKFBD2kCAUpRMIGmhwwHzGBBqSo1PunVp1CwEJPr+2kASumx0potIwcIIGCBmTS/f2jSY4KxwpQJRFEYKFihOJEjBIASGCjBsGGDAdatbpdMCBN3iAw3goKMZcCMQpkQgNDOx3AQsGHJDADjsYQP/DCQboAJYEHgowwQ013PChBgjYFEIIN+SQACXg2WADAgaAAEKAATIQAQ0CCACkBM/pEkIDDbz4YgMCsOABC8bxsQNUTi2oo44GXOCjCBpoYIAHZEUlZgpkSmDmB7T0IIEDTIUnwpUg1IYADslY8xQKeCqmGJETzCjKBw704JoNTc1pwA404AABCjqkIAADNkZ6waQXGDZBC6KYoIAAbFSggwMoRHAjAqHamYJYY4pJqqUKUBKDAn4KAShOGjR1QYs+ImnhBRFASqkGhp3AwWV89CBAlAJIMIYFk+JwAQ5dajCpj01VWyEDwMo2gQcheEeFCa0QUcEErdbyqQM2QAr/7Z1QkcliVBMI8GlKBoRgQAwmRMnEH7FGIQCxQsQwgQMYiNCrpM+ui+fC8cYmggcVWHACAC5wICETGAiwxxAYTBClFB6r0qEIF5CZQqThRWVDvCyIIAIHBiTgsgEu5HADNURoegASDpTLsQ4+YxJxAgdoYPLJhrGgtArJMdmCCCG8wEGQGF7C7yjk5qxAn1bEQDQOok6ggtIQIIPDDyZ8wIB9wubgggE/JLCxEAekVISJc3+RxAQ63HfjBNSYIK8KT3LgAc6eOjB3DPYdoG8bFQTZKAp5FzPBCTro8DLAFuiA6RA9cAAAAJX3kYAACjz+wwexxSsC3EK0gOYQOwAgLzoG9Tgxromo9zuECQaMDgDAuTNhggWqB8zC6CyUXvwXO4h+AM7Pu2EBCxdXb0UQADs=",
	"ship_ballista" : "data:image/gif;base64,R0lGODlhPAAqANUAAI9PLfaLiHdINaIHBqKMbSIMBflhYv7//92ZX6lXJmVcWv0AAJ11UIhFHVQpFnA5GLl9UW89LHRnz8pqLbCtsYOS+yIGVtbKorekgtABAXJ3/3YICeXZrplmPsrHxJdSxrFlNj4bDAMHkIuPku/kt145KfnNyIRbP7tXUYtwXfY9Pq3Aw5xRIsi6laE+VZydp6SZkpmus9Hk6f2pn0MALOF8PkA0ONkaNf/mh3V7f/4cGd/X2MDS4kRAafbu7/brvCH5BAEAAD8ALAAAAAA8ACoAAAb/wJ9wSCwahRxF68hsOp/QX0/Uu0Sv2CjJJur2KNmw+EdKOUo0S9fywLQw43iRg+kMUiuTbqGSxSwqB0tycS0EMAYLCzozBweJOo4bMx6EYi0JkY4BigsBm4sHPBkmlk4tCBATIEk3ioGOM52fj3wHIy5WpkYkCQksDQ0YFR+dBo4HnIomjnuNBi4ku0UXCcENCBoVFa6KjY6JoQcmigc+KtNFGA0PDTDa2xKdCz7Ie56OKvgGuuk/BB06tIBXQVu3BcdiKdIkK1KAfukgIJjYQ0JBDSI2zNvho+O9RuQWyAgwyJ9EBB0ECKgoIsSDeQF4eJChz5MMD4p4PPQn5CSD/xOpCJQQcEJRhgwoVlBYgeJoUgpHmXLg+aPDiRPBOkCAIGDoUacrXsRwMWAAihgjMgyggILqj59XGwjowKKEgxBfkcZ48aJB2RMjUgxwAYOBW4AMOjQ40QFAAwcF8qJ4MWJE2Q0KckTAnKKkPwwgGAA4E8FxCLxH74zIkWODawUKXgtwi+HEAwd3S5wwjbos6xwCXDvoYaNACAVMOACEmCXBhMchHEQQAOBBiA2pH/zeQMO4DQIcpiK5gOEngPMCmGMhAMBahIAC7hYYoHYAbAU2QnRgEAxCizcpMHASBABEkIJ4cWDgAAsTJHDXacZtMMAGDggAQQTG4aDhCSVolf9KSgjMMEMqnoVxQQopdJAACAlEF4JxJUx3lVYlFFAABD9FINFo0TlgVVcEEJIiDD+0oGJ0CQCwX0ABMcAAZCFEIOVQF75oHG64QeBGeBggIE0UF0RwAhxCEICbcyDsh6NVJwgwnUpSRgBCgR0gAIJLDj7wQAI11LDKl1CcMB2Cb7GTJAssMAkAnCqV4KgDAKSZCocC1IDABA2y00AHV2AQQQmAlnkXO4gu6qaUcGIZggAgnCGRn34C00AE7ZTYBIeeXXCCAiQwYF2FizbAAghpXsVggys656cvvrCg5wMA+HcFAUEKQQIGKVjBAZwP2OVLA8w260uDt+nZHqK/sMP/ag0sJDBRCxdwEOoRtQ1CgABLXGCXA8/+0u4v3zYrq2Pn6Sklog40gKmfmIJAAJlEnEjkD7WRKRQcHURwF6Ltchxus9c4RquUGCh3wckXEGDDmBztMAQJBKQgzb0nSMMBikJcoJIAewL8sb8hnzdrBIshMQgGh1CAjCAUn7BECyqlIEQKAnx5L5nrJNlOMP/6K6uedgnQgGFIYOvBATsojYwH1JLRWNVvRVBtbdW+TAA7WOL27G0u8tvAeWQL0QIyPuxAeCX/FAgHJgBYUVsJtlrLHzt736b31n93UDcHjnTkeeE7TMyA1D+ckECQLUyAwmxPcCBax38LHbIvmhMxbPgOuO/gAQUUjAARBgmcIAQDNYBwAqFOuN6e1xyj+0vdP1ygu1J8vQDxEP9RDAEKAFx/BcwAdNw8yOARwXv1MMxre/Gky1Fb+M1fcy2gL/SePhRuTEPeTyFbQR4ZLYBB5NySPEKlrAXIK0IQAAA7",
	"ship_flamethrower" : "data:image/gif;base64,R0lGODlhPAArANUAAFUnEnFEMPWcXP/y8ocbCq1aJbOli6WMbWkyFWk7KPpgYGJlnZlvT3FcSfsBASwXD1YxItRoKhYKCLN1UYhDG5KY3MSzjJpTJbthKXoBAMgOCNfMpUgfC4ZKJZRMIKlOHv8wMH9JMv2NjuSHR+/kt4NYOuPXrP++vFxLNjc1eT4iFp9XPvW9bo1iQnmA0axhRId3X4dTKXk+Gv/jiKJjN83Am5FPNT0vLdiQg9KzqPYXFbUzI9ra2IB+rBkTOPbrvCH5BAEAAD8ALAAAAAA8ACsAAAb/wJ9wSBQeNsWkcslsOoUCQe1XQz6vWOwomnNVegZrdkz+bU/eijd1m5bfzphhofYufg0JTAzvC2s9aXZCJDcPPil3fnAbahV1CzUGDTcqKg8SDyaLb4A9gQs+EqOkpDckPxacYwefn6UPDxwcKhAJIQcWITsHq1cTCws9C7IAMhQdNsohARAwOg4OOr5OGxgyKA0LNzElJcwJCRDjACYW0Q4G1Ew1ER8fHQEABBrj9gAAs5s70RPrSxY+XPBQAJ0DAioQKJSBIJ8JEjB26PD3L8kBBBgAxOAXTUMCAhkyAGgIoMSKFy8mTEBVkQgDDhQQyOCATgOCkCEBPABgA6UN/5UtirCkRgMfwwQfOt7EmY9DggABwiXoRYgHCBxuVtEowGFkzHkIQOLsim/cJRVUf1gVcQIEDxwbhsKh4W7n0Q4UxIq8ZcOsJbRCeChQMMDBgMEDQCjAIZeVOwwJ8MkMuyOCh1tRAUD4+wBCDauEHZw4oSPxhBYKRKh6wwADhgIhIMjAsIXFhKjhNlvC9MDACQciBugYbViEBhgoYLxYvImMhQIFKLxgYWEGCwETEsgIh0CcinwNeIgwTJr4AOOkHjQ4QGFH4ysxCnzAIGCEuxEhuD99KsNGjraEKQDCYcVpMMoDl0iA1gHvPcHAQBFEuAUNToVgYQAh2OABAzwAR/9acCAMqIAGD9yw32aZpDWGBR7M9sEIM8yQHQQIQJVhhisckIEBGijQIYgaoIACVOFEBQEAAfCRRQsUQOcBfQIckN1INtoQgAoS3MBBCAxowIMOGjQgJIbfgCNOg0+Y0CQC81EQQW0HRAYBhkRaMqcMPWhAQQMBeAPOOE9dUIKKWRwQnTFsQseCdQw0hBlUuI3TZ5ni2JNABwwc0AAMaDoBAwSysInBBR9EsCgLDCRA0AXMQBoVM/ZsBgBeGChJBgwPwNACdA2R+oEHEQjAwgikQieQDa2Kox1DDySwQk8FrObcDSiwdEAHmAAArAcYUbDqr7Mg4K0HHcTQAQKXBID/UjInqZPFBgw0kNUPMEgAAUHINPTaBdAV4AEmB46kUywq3LLCSQdP8AKhSpgAw1REWPBAtalsBUAmsw3kwUAk4TMLBwQ7JdUKCpNsg7tKWFCCDQ0QQQIDKEj7gwGXJKAQBjRo3IEHPLeIQFdNfsCBLUUie/DBKA9hAgMMhNDyEDAEQGgDDxyw9M6u8VvAQDLsTC6w7jRUi1ThhJDSC1swoAoJBzDQQsx/NC1vxBCg0NwPG8DAb88aX5DzBfxaplA+RFeaQE/4qRCAAS3ADAMhB9AQAgpEOByCzETUAEMM/ALuuecYcKvQQh1sRvSzlvTpNEsGMB3A40MYUALs1RzQh4LXOm8sw+4MsXlBVA/ndwunzcHLQAkNFM8ADUmWUUMLvDO0OwUxgczBBVtYQAKfc4rRdqoot01DApiTUcMB5nZwDEnHNPnmCBDNDfXrQ1jQwmnJ+2IC45xr7QEFDLkABp7wMqahIGnrMIftvCYDGlCECRsoQbwa0Kl/KLB8SaiB0zDYkicEAQA7",
	"ship_catapult" : "data:image/gif;base64,R0lGODlhPAAtANUAABUOC8ezj4tONf/68WxfTch4UXZNN69YI6yUdK5rSlEzJPqGOu58M7ViLJJuUPKKVf4SE/+caKuhlmsyEdzOqZRJHOjbr82rezklGcRjJ2Y9K1RNPcuZZ6BTI4g7D/LivtDCnN5+NuqecoN1ZoteRZ6HacI2K+NuTO+8g7ZaQ9x3LN2EWvqeSMN1ONttLriGYbqkfv+7S3xEH75nLtNyNJ55XZ1XOsptLc1iSM9/aEI9MdNhG/97f/9QUf+oqvbrvCH5BAEAAD8ALAAAAAA8AC0AAAb/wJ9wSCQiFpeicslsOp+/Q6dBgVqvWCFDFQpkv+Biw7bwhs/ZV+NmRrufgdkNJLRQqu/88HObgS40DAsMLkl6eS2CLAyCLi4MBYdvDgsqNTAwHAk0GQwPH5JnMDIAeD8BIC0uCyygoV8XMiQfOFUwHxQqrK2vWRweFzw9AxAOdRcvDBx1MC90vUwwFR8QPtQjFkUgCCQaGAbL0EsBMD4QAz0QOgY5IBQcBhoKGPQKBc/iRCDmA+YkChMEpDBRoJ4GAd4MvMinj5+5FBt0zKNnw4YGGwkKJKBHAl++HD4G8IAgQIfJdRY1rFj54EGEBAAwLGR4aqQJAhs2GCBAYMIE/w0HV0QYOlQDgFkMQUAwkdMBCRkTSsCoUeJCNw0FiEZYYS8EBwofLLg6BMIFDho3ZGAAoIHEBRQoxMJQQNdA1qEPDGCYUOEAjRY1wo7jcMHjExlTFjQgMKIq3AsONGyQEECeAg0GANhYgQCBtwk3GKRIgXTICxaoY4SDQsFBiwMqHnCA0RnnCBADBnwocVlBTAUCOLi7YINvAU01EDizcODRqhgwsBQIUcHDDRYvdEj48CEAgho8wzMmsK6A0AgcJCAoIGLBgeSjBHnIsOABFhiOZsiosIMBCgTk0YOBDhuIx5MONjwgwge56fbCCjbAYEEDIRAigwwNNICFBX3A1v9CBwfswEICOtRDYIHiCVADCSkw2OAAL+RAggcV0LBAB1M0IEAWMMyAQY0t3FAdFwkgQBtOOq0gQgE2BDBAAB2g0OAHEigQj08ZZLjAAghkwdsEazQA2w0eTKBCDBFcQNsIMuBQAAkY3DYABZuBIMEIaxGo14+MGHOFBRZREMAa3hyQgQozVNBBfyygwMEEGAhggA4jjCDBkxVsAMCmbeXUky4dmPIEDAKMMIRnGswgZgU3hPBaBX2FEMIBFXjD2AgRbaorAQhsk4AgDZBwRQ0C4FODBpjMoMIBdDnChZB8HWCoDASEsMANHXhDjwNvRcDIFh10+QQINpSwhw0GZPP/wwcITdDBDX0cyoh+7sLrggqMDLLlAyHgy8gNUhhWBAwJFDtEAAKYO8SxI7xLQwiqStucrDPY0AGsil4MYgYZOMJJBxeOVQQFCeCQAj4vkGAKoDJU8YEDB2yBlsQdu9pCCzN04JMAFUE6wYUaXGjqEgiccIIAZoCQQA1EBGCDn0OAIEAgKvTRwAxycMxxBwJ0bcDX8wTdNQFLUFCA0X5aULLCQiAgQHREv+sIvDfcvKoMQGGWd9A4wj0wDgvgADcMOODA9gcFq9tECX11/HAINGQow2UH5X1ZBUwXgbjRCajrAA42PEP4CVBDAcNTimIN7wHy7C3PhaIKkcAJhgtBmq4NwgrxAu0ngyEoAiUAX0I3XxcvAMiZE1GCA8+UgIMA4pptdAp+64FAAzTo7EEKAhTJhNrP4wGD0SfYELseat/bQQIrFPCAIUXYkELyLxR+QvLQDNoC+0StYJg7QiBZ4VIgLpqMgAQ2uMtQvqKEAKRggALLRwkOkgCXbKWAQ3AeDhwgMpoIYTcGEMBK0qUECxjJg06wwAGzEQQAOw==",
	"ship_steamboat" : "data:image/gif;base64,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",
	"ship_mortar" : "data:image/gif;base64,R0lGODlhPAAwANUAAP///45rUQkDAmg2GFAyJLFbJ1MoEMi5lKaSdGE5JpFGHfDJjqhuTMpjRSYVDc5sK72siOPXrJVeRtvQqcmNZoVIJLVaQ3RdSZeGaXlFM5tWJOuocKlOHYRAGf7mpatnOsujd3pFIodJN4ZXP//8vPDmvWhHNvWXRuGBNbCCXzsjG/ipW2w/K4xSJXY6F9DFoJhMN5d7XkIZBKNUPVs8L7Ogf+vgs8eAUZZPHX1POPC8gPzZm/7wsKBcKfyUafbrvCH5BAEAAD8ALAAAAAA8ADAAAAb/wJ9wSCwWIcakcslsKgMTp3RKJYpqv0ipyu3+IIfI5XAoRbxoaQRQOkwAgFd6znzB73K6vri+w217gUIvCG4TUYKCCFiJiS8zCWeNgQwsKoiTdBEuDhhDbQgYkplUBwkEEBABATQEKg4qJjWYpEs2EiatBAQsFR8PGgk0OSNIQlu1fDk5JhooJycoKAwjzDQ0xhQjIyDJRAHVIxIjua3XCQMtQhg+DgIE3d4/KTgVOboJISwGAx3pWSIs3MghgYK8GicMCMCBY8AABQodGJjYAUQAGCISZMhxwRsEEwwUGuDgwkAHAQ4SUAghI4QEFhlYuFLhKVmPajIEqFDgQoaL/105UgyQwYzAqZl5av3qAYuGi6EDcu1KwEKEBBoqsqbcAAIQKQwFHkwzMVHAgBsbdmzIQEAEDHK7CFD4YOABiBpgvAaCwKACBxQPBvACsUPHhqsEMsRMkIPBjRGtZDxgIEJBhhqj6ExgkCKHi78rFlC4YECihKkzHbgzkSLFiBs6QIh4ekVPCQUtKDBw0eHBCRzu3olgm1VrUwEmICzQwaMNAxgwJDBghKaABhcfKEhwgUOaOxYaiatGmUOFgPMEMCzgQcJDAAwYfN948UIvlb4DGFKg4LnACV4TGUUVTJAFd54AOezAwwIZ9NCZBNJgFEMVE1xAQAcc4NBBdkJxsP8CBQSgpFpx7sgggwPpLeDBijsw4JMJJoTQQgQv0MJECa4hkQJE6QzAgA4xFLACDxgcaKAAFaSgogc8eLDDkwukUFUGCkxIRQ0SIDDECyz0Y90AFax3wgok7GCCkRcw1+STOzDZpAc6fDBDBQFkxkQNAcTglQ0x1HlACxxUYAAOLjDgAQnskaDDBRAo2B4PbzrpaAQfhFBBAUktcQAC4ySFJ3UTVECAlx1UVOYGSz7gmw4qkuAqojuswFALOHzQRAQMWGBBAEMc8B4REIyAAQI9KGCsAU8ZYOIAJWHIQVhj6qDDCihYpwEOPWipBI4NNCBCTS8wAMUQEYCTxwEjQCT/w7UttHBtB08x24ECHNT7bAH1VOAPMkbUYEEDu24BwQwWaCsEAiMYfHCX9OJbwcMM9aBBBfHG69BE/CjcqwTdjnBAFhxXQN3AAdgXgQQSTFCDuxzAWyq83Gkgcwsh1NzlADJaWQQC3X4rRAwzwMDrDwfkCoPGNcygc7k90Pzwwy5EXaqxFbQrcQ85KDGC0EJAAJ0JcnCr68fkopxp1yNcPbGllr48dQUssGDMEidbMIC2IHTrbU0/4Hj0nTHEgAEjNmAQdy9wC0ODfUYMPMPQ4XZrwQhR2HBDz2R38cIF5wzIAr9JIBBDHino2sAM2vorOehe1NB5TFMM3O3jQuAKUXC3Os9RwgVxL2NjEhEENLkxCBDcM3V71GCCCCPkrsQEiln5ggQWwKBryZlgkIPzTpSu6wyXJcO4Exz/O8MF48vDxAS6WlCb+lzE0Dzr8BcRBAA7",
	"ship_submarine" : "data:image/gif;base64,R0lGODlhPAAoANUAAOnespNVNdVuLKxaKOt0L4dvVwABCEwzKVdSTy4pKHdYRs12UM3CmmY0FbCRaqqfgLxiKpiNc21mWndxZ2A7KXxLNGpKOKpmRoxHHcuNXIt9Z1QrEoReSDc6QP2ueaVQH715WdmOZHlCKK9yVPuZaN6CUstmJ3hSPltCNrdnQWxBLzQdD/6ENPvZgEJDSKReP8u0gHQ9HUEnG7mlf/drJiQrM6KAWr9bIad0RX04EMF3QaJuU5VjRxcWHPSjV/brvCH5BAEAAD8ALAAAAAA8ACgAAAb/wJ9wSBwCAMVk4WRjJJ/QqFQIk0iczwgnVfKEFMipeEzsIKAaVyC1APUMErJ8CnCdk4xOQrVOGAx3c4JFEhMRD0kTegcqFW8GEYOSQgAICFZDDAwtGjU9DwoUfgmTk3UdHXE/GhcZIRw1CTA/AAUTYaWDEQkJYQMBIhUBJxYBPLi5UgAaHCcKzyc8CHpIDgQBKsEqMjIvs8lSDNEc5AoxHyd2VgwYAT0HIiYBGw06M+BSBeQcPCciHx8wVOCxQwEEExYM9KBg4kaMGAN00ML3pNk+CgMEEKBBIAQIBCg+vFAoA2ADDBggzJDwABk+ABacNUtpgkAJEBlAuEAV88A5/xEhc+S4ZyWCy1wMDjhToOKGgIYgAoy4gKJGBxcuDlQQgEEpBRwZCiAqNAELuAconsUw8TQFCBAjMg5AcfUqChE6HMCY4CBDBhsafkwYfFRSzBMNbpgwcWFH1AEZTcy9ilXCDh829jrw4CFDYAmBSwGIgEICBQUyMCzmwVoEow8CYg+wgPUqAhst9E7Q4MCBBgShJ1mgEJjRgRU5Biw9YOBAAAEQDjLmgQorggK5W8zggIMfCLOCIkT6gUIFBRn0LKRl3gPDi/KwF0hVUN1MgQw8bGSYUGDBgnu5LGPeCg1UwJQ7CQTAnE86RAXCBQHQVZ0dlpiRAhs2gCOOeSowFf+DPyn40UMFb2VwQU0CRIgKKrEcMMALL1ywwAjgTTKDCjiesMEGOUBwgkIVjCDkACYcRIA8KPgE0Ae/BBAjGw6AA8ADVD5gwY7DUGDMDjxAUAEFIkAQGwEC0MACRyHs8IKTMS6QIUVCiENPOzEF4I4BKmAwJgssEEAAZ5xlUAGML7RRWC4zULABjijY+UeCT8WmUQgkAFrCDXa2CQKcRDjQoQUYpPBGDwGQuRgEDQYQggcL0ODqAIMW+iantJBDAQY8HHAAbBoJMMBbF3hkgquu3hDrAojQKgQHFjQQQwUYQHaQAG7hlMEAfvrpKjoxXqAsFQwU0ICzGDA5AASNjfD0IFsaaWuCCJl+8y0tEZy3QbQD8LPDDthK2q4JGPARQAHzEsFBBzUQiEFM5GQkaZGxfVDgMAUDYA0ByumxKAUWVKDYYr1GN0ADjVCg7JQapHDDDXya8IILCVggs8crr8yuCRJTcN6hpWiw2246mHlNBOE2kyeRDQ2wpMRBhhBCAVCPEOVZCAymQQkBgMdMszGUuyRKDWxwgropCFOpB8mC4/NueIgHZgzjxj2uzuU1wkUXJPAsyAM1FgHADDagJHgMOqugQVLwFtrF1AUnAQADMxTAIXFCRNBxIy+UkHfjdLh0QgU4NgIC45yTAQA0BWgQAQxBAAA7"
};
var gamedata = {
	speed:{
		"transport":[60,0],
		"spy":[240,5],
		"ship_ram":[30,0],
		"ship_ballista":[30,0],
		"ship_flamethrower":[40,0],
		"ship_catapult":[30,0],
		"ship_steamboat":[30,0],
		"ship_mortar":[20,0],
		"ship_submarine":[40,0]
	}
}

current.view=$("body").attr('id');
switch (current.view){
	case 'island':
		add_DistanceCalc_Island();
		break;
	case 'worldmap_iso':
		add_DistanceCalc_World();
		break;
}

function add_DistanceCalc_World(){
	add_DistanceCalc_init();
	if (!current.city.coords) return;
	clickIslandDefault=unsafeWindow.map.clickIsland;
	unsafeWindow.map.clickIsland=function(objId){
		clickIslandDefault(objId);
		island_coords = parseCoords($("[id="+objId+"]").attr("title"));
		add_DistanceCalc_changeContent(island_coords);
	}
	island_coords = parseCoords($("div#breadcrumbs a.island").html());
	add_DistanceCalc_changeContent(island_coords);
}
function add_DistanceCalc_Island(){	
	add_DistanceCalc_init();
	if (!current.city.coords) return;
	island_coords = parseCoords($("div#breadcrumbs span.island").html());
	add_DistanceCalc_changeContent(island_coords);
}
function add_DistanceCalc_init(){
	var list = $("select#citySelect option[class^=tradegood]");
	var coordsIn='title';
	if (list.length==0){
		list = $("select#citySelect option[class$=coords]");
		coordsIn='name';
		if (list.length==0){
			return;
		}
	}
	var selectedItem=null;
	list.each(function(){
		if (this.selected){
			selectedItem=this;
		}
	});
	if (selectedItem==null) return;
	switch (coordsIn){
		case 'title':
			city_coords=parseCoords(selectedItem.title);
			break;
		case 'name':
			city_coords=parseCoords(selectedItem.innerHTML);
			break;
	}
	current.city.coords=city_coords;
	
	$("div#breadcrumbs [class=island]").eq(0).after("<span id='ikariamdistancecalc' style='cursor:help;'>&nbsp;<img src='"+image["jurneytime"]+"' width='22px'><div class='tooltip' style='display: none;background-color:#F1D7AD;border-color:#BE8D53;border-style:solid;border-width:4px 1px 1px;color:#542C0F;padding:0 0px;'></div></span>");
	$("span#ikariamdistancecalc").mouseover(function (){$("span#ikariamdistancecalc").children("div[class=tooltip]").css('display','block');});
	$("span#ikariamdistancecalc").mouseout(function (){$("span#ikariamdistancecalc").children("div[class=tooltip]").css('display','none');});
}
function add_DistanceCalc_changeContent(island_coords){
	var holder = $("span#ikariamdistancecalc");
	holder.children("div[class=tooltip]").html("");
	var	unitsToCalc = ["transport","spy","ship_ram","ship_ballista","ship_flamethrower","ship_catapult","ship_steamboat","ship_mortar","ship_submarine"];
	var first=true;
	for (i in unitsToCalc){
		unit=unitsToCalc[i];
		holder.children("div[class=tooltip]").append("<div style='padding:3px 0;"+((first)?"":"border-top:1px dotted #BE8D53;")+"'><img src='"+image[unit]+"' width='25px' style='padding-right:0px;'>"+unsafeWindow.getTimestring(distanceCalc(gamedata.speed[unit][0],current.city.coords,island_coords,gamedata.speed[unit][1])*60*1000,3," ","",true,true)+"</div>");
		first=false;
	}
}
function distanceCalc(speed,cord1,cord2,min_time){
	if (cord1.x==cord2.x && cord1.y==cord2.y){
		time=1200/speed*0.5;
	}else{
		time=1200/speed*(Math.sqrt(Math.pow((cord2.x-cord1.x),2)+Math.pow((cord2.y-cord1.y),2)));
	}	
	return (time<min_time)?min_time:time;
}






// ==UserScript==
// @name           Ikariam Search
// ==/UserScript==

ScriptUpdater.check(60601, "0.12");

Config.prefix = document.domain;
Config.scriptName = 'Buscador Ikariam';
Config.settings = {
	"Iconos de Busqueda":{
		html:'<p>Seleccione los sitios en que le gustaría ver los iconos de búsqueda.</p>',
		fields:{
			searchIconCrumbNavs:{
				type:'checkbox',
				label:'Catalejos',
				text:'mostrar icono catalejos.',
				value:true,
			},
			searchIconIslandPlayer:{
				type:'checkbox',
				label:'Jugador de Isla',
				text:'el nombre de jugador en la isla ve cuando una ciudad es seleccionada',
				value:true,
			},
			searchIconIslandAlly:{
				type:'checkbox',
				label:'Isla de Alianza',
				text:'el nombre de alianza en la isla se ve cuando una ciudad es seleccionada',
				value:true,
			},
			searchIconInbox:{
				type:'checkbox',
				label:'Bandeja Entrada',
				text:'al lado del remitente de la  <a href="/index.php?view=diplomacyAdvisor">bandeja de entrada</a>',
				value:true,
			},
			searchIconOutboxbox:{
				type:'checkbox',
				label:'Bandeja Salida',
				text:'al lado del remitente de la  <a href="/index.php?view=diplomacyAdvisorOutBox">bandeja de salida</a>',
				value:true,
			},
			searchIconTreaties:{
				type:'checkbox',
				label:'Museo',
				text:'al lado del remitente del <a href="/index.php?view=diplomacyAdvisorTreaty">museo</a>',
				value:true,
			}			
		}
	},
	"Acerca":{
		html:'<p><a href="' + 
				'</a>  <a href="" target="_blank"></a>\
				<p>Le deja buscar en juego islas, ciudades, jugadores, etc.  <a href="http://ika-world.com" target="_blank">www.ika-world.com</a>.</p>',	
		fields:{
                        debugMode:{
				type:'checkbox',
				label:'Modo de Ajuste',
				text:'muestra el tiempo de ejecución del script',
				value:false,
			}

			
		}
	}
};



IkaTools.init();

var IkaSearch = {
	init:function() {
		var startTime = new Date();
		if(document.location.toString().match(/ika-world/)) {
			IkaSearch.handleIkaWorld();	
		} else {
			IkaTools.addOptionsLink("Buscar");
			GM_addStyle('.ikaSearchIcon { opacity:.3; } .ikaSearchIcon:hover { opacity:1; }');
			
			unsafeWindow.IkaSearch = IkaSearch;
			var div = document.createElement('div');
			div.innerHTML = IkaSearch.formHtml;
			$('#mainview').append(div);
			var buttonClose = document.createElement('div');
			buttonClose.innerHTML = 'cerrar ventana';
			buttonClose.id = "ikaSearchButtonClose";
			buttonClose.setAttribute('style', 'display:none; position:absolute; top:0; padding-right:17px; right:0; background-color:#fff; padding:.5em 1em; font-weight:bold; z-index:25000; cursor:pointer; border:1px solid #563C2F; border-width:0 0 1px 1px;');
			buttonClose.addEventListener('click', IkaSearch.hideAll, false);
			$('#mainview').append(buttonClose);
			if(typeof(IkaSearch.views[IkaTools.getView()]) == 'function')
				IkaSearch.views[IkaTools.getView()]();
			var spn = document.createElement('div');
			spn.setAttribute('style', 'width:100px; float:right; text-align:right; margin-top:-2px; margin-right:25px;');
			
                        
                        // add world icon 
			
			// add search icon to crumb nav
			if(Config.get('searchIconCrumbNavs')) {
				var img = document.createElement('img');
				img.setAttribute('style', 'padding:5px; cursor:pointer; margin-top:-3px;');
				img.title = 'Abrir ventana de busqueda';
				img.src = IkaSearch.icons.magnifier;
				img.addEventListener('click', function() { IkaSearch.showForm(); }, false);
				spn.appendChild(img);
			}
			$('#breadcrumbs h3:first-child').before(spn);
			// create search results
			if($('#ikaSearchResults').size() == 0) {
				var resultBox = document.createElement('iframe');
				resultBox.name = "ikaSearchResults";
				resultBox.id = "ikaSearchResults";
				resultBox.src = "";
				resultBox.setAttribute('style', 'position:absolute; top:0; left:0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none; ');
				$('#mainview')[0].style.position = 'relative';
				$('#mainview').append(resultBox);
			}
		}
		if(Config.get('debugMode')) {
			IkaTools.config.debugMode = true;
			var endTime = new Date();
			IkaTools.debug('Search: ' + (endTime.getTime() - startTime.getTime()) + 'ms');
		}
	},
	drawWorldOverview:function() {
		var div = document.createElement('div');
			div.id = 'ikaSearchWorldWrapper';
			div.innerHTML = 'hello world';
			div.setAttribute('style', 'display:none; height:700px; position:absolute; top:0; background-color:#83C3FF; left:0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none;');
		$('#mainview').append(div);
		IkaSearch.worldWrapper = div;
		// search box
		var infoBox = document.createElement('div');
			infoBox.className = 'dynamic';
			infoBox.id = 'ikaSearchInfoBox';
			var html = '<h3 class="header">Busqueda en Mapamundi</h3><div class="content" style="padding:.5em 1em;">\
							<p style="padding-left:.8em;">Jugador: <input tyle="text" style="width:100px;" id="ikaSearchPlayerName"/></p>\
							<p>Alianza: <input tyle="text" style="width:100px;" id="ikaSearchAlliance"/></p>\
							<p style="text-align:center;"><input id="ikaSearchWorldSubmit" value="Buscar" class="button" style="width:75px; display:inline;"/></p>\
						</div><div class="footer"/>';
			infoBox.innerHTML = html;
		$('#breadcrumbs').after(infoBox);
		$('#ikaSearchPlayerName')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchAlliance')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchWorldSubmit')[0].addEventListener('keyup', IkaSearch.worldSearchKeyUp, false);
		$('#ikaSearchWorldSubmit')[0].addEventListener('click', IkaSearch.performWorldSearch, false);
		
		// load map data
		GM_xmlhttpRequest({method:"GET", url:"http://" + document.domain + "/index.php?action=WorldMap&function=getJSONArea&x_min=1&x_max=100&y_min=1&y_max=100",
		  headers:{
			"Accept":"text/txt",
			},
		  onload:function(details) {
			var islands = unsafeWindow.JSON.parse(details.responseText).data;
			islands.getByCoords = function(x, y) {
				return (typeof(this[x]) != 'undefined' && typeof(this[x][y]) != 'undefined') ? this[x][y] : false;
			}				
			// figure out where your cities are
			var ownIslands = {};
			var cities = IkaTools.getCities();
			for(var i = 0; i < cities.length; i++) {
				var islandId = IkaTools.cityGetIslandId(cities[i]);
				if(islandId)
					ownIslands[islandId] = true;
			}
			var table = document.createElement('table');
			table.id = 'ikaSearchWorldTable';
			table.setAttribute('style', 'width:700px; margin:auto; margin-top:25px;');
			table.border = 1;
			table.cellPadding = 0; 
			table.cellSpacing = 0;
			var html = '';
			for(var y = 1; y <= 100; y++) {
				html += '<tr>';
					for(var x = 1; x <= 100; x++) {
						var island = islands.getByCoords(x, y);
						if(island) {
							document.title = (island[2]);
							switch(island[2]) {
								case '1': var type = 'Wine'; break;
								case '2': var type = 'Marble'; break;
								case '3': var type = 'Crystal'; break;
								case '4': var type = 'Sulphur'; break;
							}
						}
						html += '<td id="ikaSearchIsland_' + island[0] + '" ' + 
									(island ? 'title="' + island[1] + ' [' + x + ',' + y + '] - ' + type + ' (' + island[7] + (island[7] == 1 ? ' city' : ' cities') + ')"' : '') +
									' class="' + (island ? 'island' : '') + (typeof(ownIslands[island[0]]) != 'undefined' ? ' own' : '') + '" '+
									'onclick="document.location = \'http://' + document.domain + '/index.php?view=island&id=' + island[0] + '\'"></td>';
					}
				html += '</tr>';
			}
			table.innerHTML = html;
			IkaSearch.worldWrapper.appendChild(table);	
			
		  }
		});
	},
	setServer:function() {
		var serverDomain = document.domain.toString().replace(/^s\d+\./, '');
		var server = parseInt(document.domain.match(/s(\d+)\./)[1]);
		$('#ikaSearchSelectServer option').each(function(i) {
			if(this.innerHTML == serverDomain)
				this.selected = true;
		});
		$('#ikaSearchServer')[0].selectedIndex = server - 1;
	},
	worldSearchKeyUp:function(e) {
		if(e.keyCode == 13) IkaSearch.performWorldSearch();
	},
	resetSearch:function() {
		$('#ikaSearchForm input').each(function() { this.value = ''; });
	},
	performSearch:function() {
		document.location = "#";
		IkaSearch.setServer();
		$('#ikaSearchForm')[0].submit();
		$('#ikaSearchButtonClose')[0].style.display = 'block';
		IkaSearch.showResults();
	},
	performWorldSearch:function() {
		try { $('#ikaSearchWorldSubmit')[0].blur(); } catch(e) { }
		$('#ikaSearchWorldWrapper td.island').each(function(i) {
			if(this.className == 'island')
				this.style.backgroundColor = '#967647';
			else if(this.className.match(/own/))
				this.style.backgroundColor = '#0000CC';
		});
		var data = 'land=en&welt=2&spieler=' + $('#ikaSearchPlayerName')[0].value + '&allianz=' + $('#ikaSearchAlliance')[0].value;
		IkaTools.getRemoteDocument('http://ika-world.com/search.php?view=suche_stadt', function(result) {
			try { var numPages = parseInt($('form', result)[0].innerHTML.match(/from\s+(\d+)\s+pages/)[1]); } catch(e) { var numPages = 1; }
			if(typeof($('table', result)[1]) != 'undefined') {
				$('tr', $('table', result)[1]).each(function(i) {
					try { var islId = this.innerHTML.match(/id=(\d+)/)[1]; } catch(e) { var islId = false; }
					if(islId) {
						try { $('#ikaSearchIsland_' + islId)[0].style.backgroundColor = "red"; } catch(e) {}
					}
				});
			}
			// draw additional pages
			for(var i = 2; i < 20 && i <= numPages; i++) {
				IkaSearch.getNextResultPage(i);
			}
		}, 'POST', data);
	},
	getNextResultPage:function(pageNum) {
		var data = 'land=en&welt=2&spieler=' + $('#ikaSearchPlayerName')[0].value + '&allianz=' + $('#ikaSearchAlliance')[0].value + '&seite=' + pageNum;
		IkaTools.getRemoteDocument('http://ika-world.com/search.php?view=suche_stadt', function(result) {
			if(typeof($('table', result)[1]) != 'undefined') {																					
				$('tr', $('table', result)[1]).each(function(i) {
					try { var islId = this.innerHTML.match(/id=(\d+)/)[1]; } catch(e) { var islId = false; }
					if(islId) {
						$('#ikaSearchIsland_' + islId)[0].style.backgroundColor = "red";
					}
				});
			}
		}, 'POST', data);
	},
	handleIkaWorld:function() {
		$('script').attr('src', '');
		GM_addStyle('\
			#navi, #header, #header-navi, forum table:first-child, input.submit { display:none; }\
			#main { width:600px !important; margin:40px 0 0 0 !important; }\
			script + div { display:none !important; }\
			td, th { padding-left:2px !important; padding-right:2px !important; }\
			table { width:650px !important; }\
		');
		$('table').attr('cellspacing', '0');
		$('form table:first-child')[0].style.display = 'none';
		$('script').each(function(i) {
			if(this.src.match(/bin-layer/))
				this.nextElementSibling.style.display = "none";
		});
		$('#main a').each(function(i) {
			if(this.href.match(/ikariam/))
				this.target = "_Parent";
		});
	},
	hideForm:function() {
		$('#ikaSearchForm')[0].style.display = 'none';
	},
	hideResults:function() {
		$('#ikaSearchResults')[0].style.display = 'none';
		$('#ikaSearchButtonClose')[0].style.display = 'none';
	},
	hideAll:function() {
		try { $('#ikaSearchWorldWrapper')[0].style.display = 'none'; } catch(e) {}
		try { $('#ikaSearchButtonClose')[0].style.display = 'none'; } catch(e) {}
		try { $('#ikaSearchForm')[0].style.display = 'none'; } catch(e) {}
		try { $('#ikaSearchResults')[0].style.display = 'none'; } catch(e) {}		
		try { $('#ikaSearchInfoBox')[0].style.display = 'none'; } catch(e) {}		
	},
	searchPlayer:function(playerName) {
		IkaSearch.resetSearch();
		$('#ikaSearchPlayerName').attr('value', playerName.replace(/&nbsp;/g, ' '));
		IkaSearch.performSearch();
	},
	searchAlliance:function(allianceName) {
		IkaSearch.resetSearch();
		$('#ikaSearchAllianceName').attr('value', allianceName);
		IkaSearch.performSearch();
	},
	showClose:function() {
		$('#ikaSearchButtonClose')[0].style.display = 'block';
	},
	showForm:function() {
		IkaSearch.hideAll();
		IkaSearch.setServer();
		$('#ikaSearchForm')[0].style.minHeight = $('#mainview')[0].clientHeight + 'px'; 
		$('#ikaSearchForm')[0].style.display = 'block';
		IkaSearch.showClose();
	},
	showResults:function() {
		IkaSearch.hideAll();
		$('#ikaSearchButtonClose')[0].style.display = 'block';
		$('#ikaSearchResults')[0].style.display = 'block'; 
		$('#ikaSearchResults')[0].style.height = $('#mainview')[0].clientHeight + 'px'; 
		IkaSearch.showClose();
	},
	showWorld:function() {
		IkaSearch.hideAll();
		IkaSearch.showClose();
		if(typeof(IkaSearch.worldWrapper) == 'undefined') {		
			IkaSearch.drawWorldOverview();			
			GM_addStyle('#ikaSearchWorldTable td { width:6px; height:6px; border:1px solid #83C3FF; }\
						#ikaSearchWorldTable td.island { background-color:#967647; cursor:pointer; }\
						#ikaSearchWorldTable td.own { background-color:#0000CC; }');
		}	
		IkaSearch.worldWrapper.style.display = 'block';
		$('#ikaSearchInfoBox')[0].style.display = 'block';
	},
	views:{
		diplomacyAdvisor:function() {
			if(Config.get('searchIconInbox')) {
				$('#messages tr.entry').each(function() {
					var playerName = $('td', this).eq(2).text().replace(/\s*$/, '');
					var a = document.createElement('a');
					a.href = 'javascript:IkaSearch.searchPlayer(\'' + playerName +'\')';
					a.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Busca la ciudad de este jugador"/>';
					$('a', $('td', this).eq(2)).append(a);
				});
			}
		},
		diplomacyAdvisorOutBox:function() {
			if(Config.get('searchIconOutboxbox')) {
				$('#deleteMessages tr.entry').each(function() {
					var playerName = $('td', this).eq(2).text().replace(/\s*$/, '');
					var a = document.createElement('a');
					a.href = 'javascript:IkaSearch.searchPlayer(\'' + playerName +'\')';
					a.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Busca la ciudad de este jugador"/>';
					$('a', $('td', this).eq(2)).append(a);
				});
			}
		},
		diplomacyAdvisorTreaty:function() {
			if(Config.get('searchIconTreaties')) {
				$('table#commercialTreaty tr').each(function(i) {
					if(i > 0) {								
						var playerName = $('td', this).eq(0).text().replace(/\s*$/, '').replace(/^\s*/, '');
						if(playerName != '' && !playerName.match(/\[.+\]/)) {
							var a = document.createElement('a');
							a.href = 'javascript:IkaSearch.searchPlayer(\'' + playerName +'\')';
							a.innerHTML = ' <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Search for this player\'s cities"/>';
							$('td', this).eq(0).append(a);
						}
					}
				});
			}
		},
		island:function() {
			// get cities on island
			var cities = {};
			if(Config.get('searchIconIslandPlayer')) {
				$('.owner').each(function() {					
					var playerName = this.innerHTML.match(/^\s*<span class="textLabel">.+?<\/span>\s*([^<]+)/)[1].replace(/\s/g, '');
					var a = document.createElement('a');
					a.innerHTML = '<img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Busca la ciudad de este jugador"/>';
					a.href = 'javascript:IkaSearch.searchPlayer("' + playerName +'")';
					if($('a.messageSend', this).size() > 0) 
						$('a.messageSend', this).before(a);
					else
						this.appendChild(a);	
				});
			}
			if(Config.get('searchIconIslandAlly')) {
				$('.ally').each(function() {
					try { var allyName = $('a', this)[0].innerHTML; } catch(e) { var allyName = false; }
					if(allyName) {
						var a = document.createElement('a');
						a.innerHTML = '<img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Busca las ciudades de esta alianza"/>';
						a.href = 'javascript:IkaSearch.searchAlliance("' + allyName +'")';					 
						$('a.messageSend', this).before(a);
					}
				});
			}
		},
		highscore:function() {
			$('.name').each(function() {
				var playerName = this.innerHTML;
				this.innerHTML += ' &nbsp; <a href="javascript:IkaSearch.searchPlayer(\'' + playerName +'\')"><img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Busca la ciudad de este jugador"/></a>';
			});
			$('.allytag').each(function() {
				try { var allyName = $('a.allyLink', this)[0].innerHTML; } catch(e) { var allyName = false; }
				if(allyName) {
					var a = document.createElement('a');
					a.innerHTML = ' &nbsp; <img class="ikaSearchIcon" src="'+IkaSearch.icons.magnifier+'" style="display:inline; margin:0 .2em;" title="Busca las ciudades de esta alianza"/>';
					a.href = 'javascript:IkaSearch.searchAlliance("' + allyName +'")';					 
					$('a.allyLink', this).after(a);
				}
			});
		},
		options:function() {
			
		},
	},
	icons:{
		magnifier:'data:image/gif;base64,R0lGODlhDwALANU6AIeHhwwMDCQkJA4ODhISEkBAQAgICBMTEy8vLw8PDygoKAUFBZubmykpKRQUFBsbGzU1NYGBgQEBAQsLCxAQEAoKChcXFwMDA+Li4oyMjKioqIODgxERESEhIX5+fomJiYqKiioqKn19fR8fHxYWFhwcHJ6enuDg4FhYWMPDw05OTjY2Nnx8fKampjg4ODMzM6mpqQkJCRgYGPDw8DQ0NNHR0ePj425ubg0NDQAAAP///wAAAAAAAAAAAAAAAAAAACH5BAEAADoALAAAAAAPAAsAAAZ/QJ1QAHEIdQYU4XjMwRTHgajD1AFyuQFIF7nkDBHmgoFI5HQTgAE3Oa4qr0PuUQioJI9AQYdzpSQQIx45CzU5OBw5DlgzAjkkGzkEGDkhhzlyHzkBWFc3WAQ4ORQsWBUtJjoMGjkZFDlmNjEDZ0w5JzkCFzINFgUNVTQIFiUKQQA7',
		world:'data:image/png;base64,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%3D',
	},
	formHtml:'<form style="display:none; position:absolute; top:0; background:url(/skin/layout/bg_stone.jpg); left:0; border:none; width:100%; z-index:20000; overflow-x: hidden; display:none;" id="ikaSearchForm" method="post" target="ikaSearchResults" action="http://www.ika-world.com/suche.php?view=suche_stadt&land=en&tool=ikaSearch" onsubmit="IkaSearch.hideForm(); IkaSearch.showResults()">\
					<table style="margin:50px auto;"><tr align="center"><td>Country</td><td colspan="2">\
					<select name="land" id="ikaSearchSelectServer" style="width: 200px;">\
					<option value="de">ikariam.de</option><option value="en">ikariam.org</option><option value="ae">ae.ikariam.com</option><option value="ar">ar.ikariam.com</option><option value="ba">ba.ikariam.com</option><option value="bg">ikariam.bg</option><option value="br">ikariam.com.br</option><option value="by">ikariam.by</option><option value="cl">cl.ikariam.com</option><option value="cn">ikariam.cn</option><option value="co">co.ikariam.com</option><option value="cz">ikariam.cz</option><option value="dk">ikariam.dk</option><option value="ee">ee.ikariam.com</option><option value="eg">eg.ikariam.org</option><option value="es">ikariam.es</option><option value="fi">fi.ikariam.com</option><option value="fr">ikariam.fr</option><option value="gr">ikariam.gr</option><option value="hr">hr.ikariam.org</option><option value="hk">ikariam.hk</option><option value="hu">ikariam.hu</option><option value="id">id.ikariam.com</option><option value="ih">ih.ikariam.org</option><option value="il">ikariam.co.il</option><option value="in">in.ikariam.org</option><option value="ir">ir.ikariam.com</option><option value="it">ikariam.it</option><option value="jp">jp.ikariam.org</option><option value="kr">ikariam.kr</option><option value="lt">ikariam.lt</option><option value="lv">ikariam.lv</option><option value="me">me.ikariam.org</option><option value="mx">ikariam.com.mx</option><option value="nl">ikariam.nl</option><option value="no">ikariam.no</option><option value="pe">ikariam.pe</option><option value="ph">ikariam.ph</option><option value="pk">ikariam.pk</option><option value="pl">ikariam.pl</option><option value="pt">ikariam.com.pt</option><option value="ro">ikariam.ro</option><option value="rs">ikariam.rs</option><option value="ru">ikariam.ru</option><option value="sa">sa.ikariam.org</option><option value="se">ikariam.se</option><option value="si">ikariam.si</option><option value="sk">ikariam.sk</option><option value="tr">ikariam.net</option><option value="tw">ikariam.tw</option><option value="ua">ikariam.com.ua</option><option value="us">ikariam.com</option><option value="ve">ikariam.com.ve</option><option value="vn">ikariam.vn</option>  \
				  </select>\
				</td>\
				<td>Maravilla</td>\
				<td colspan="2">\
				  <select name="wunder" style="width: 200px;">\
					<option selected="selected" value="0">-</option><option value="1">Fragua de Efesto</option><option value="2">Templo de Gaia</option><option value="3">Jardin de Dionisio</option><option value="4">Templo de Athenea</option><option value="5">Templo de Hermes</option><option value="6">Fortaleza de Ares</option><option value="7">Templo de Poseidon</option><option value="8">Coloso</option>      </select>\
				</td> 	\
			  </tr>  \
			  <tr align="center">\
				<td>Mundo</td>\
				<td colspan="2">	  \
				  <select name="welt" id="ikaSearchServer" style="width: 200px;">\
					<option selected="selected" value="1">Alpha</option><option value="2">Beta</option><option value="3">Gamma</option><option value="4">Delta</option><option value="5">Epsilon</option><option value="6">Zeta</option><option value="7">Eta</option><option value="8">Theta</option><option value="9">Iota</option><option value="10">Kappa</option><option value="11">Lambda</option><option value="12">My</option><option value="13">Ny</option><option value="14">Xi</option><option value="15">Omikron</option><option value="16">Pi</option><option value="99">Speedserver</option><option value="666">Test-Server</option>      </select>\
				</td>\
				<td/>\
				<td/>\
				<td/>\
			  </tr> \
			  <tr align="center">\
				<td>Nombre jugador</td>\
				<td colspan="2"><input type="text" value="" name="spieler" style="width: 200px;" id="ikaSearchPlayerName"/></td>  \
				<td>Alianza</td>\
				<td colspan="2"><input type="text" value="" name="allianz" style="width: 200px;" id="ikaSearchAllianceName"/></td>  \
			  </tr>	    \
			  <tr align="center">\
				<td>Nombre isla</td>\
				<td colspan="2"><input type="text" value="" name="insel_name" style="width: 200px;"/></td>  \
				<td>Nombre ciudad</td>\
				<td colspan="2"><input type="text" value="" name="stadt" style="width: 200px;"/></td>  \
			  </tr>  \
			  <tr> \
				<td>X</td>\
				<td>	  \
				  <select name="x_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="x" style="width: 100px;"/></td> \
				<td>X</td>\
				<td>	  \
				  <select name="x2_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="x2" style="width: 100px;"/></td> 	\
			  </tr>\
			  <tr> \
				<td>Y</td>\
				<td>\
				  <select name="y_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option> \
				  </select>\
				</td>\
				<td><input type="text" value="" name="y" style="width: 100px;"/></td> \
				<td>Y</td>\
				<td>\
				  <select name="y2_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option> 	  \
				  </select>\
				</td>\
				<td><input type="text" value="" name="y2" style="width: 100px;"/></td> \
			  </tr>\
			  <tr>\
				<td>Madera</td>\
				<td>\
				  <select name="holz_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="holz_level" style="width: 100px;"/></td> 	  	\
				<td>\
				  <select name="luxus">\
					<option selected="selected" value="0">Bienes de lujo</option><option value="1">Marmol</option><option value="2">Vino</option><option value="3">Cristal</option><option value="4">Azufre</option>      </select>	  \
				</td>\
				<td>\
				  <select name="luxus_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="luxusgut_level" style="width: 100px;"/></td>  \
			  </tr>			\
			  <tr>  	  \
				<td>Intendencia</td>\
				<td>\
				  <select name="rathaus_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
				<td><input type="text" value="" name="rathaus" style="width: 100px;"/></td>  	  \
				<td>Ciudades</td>\
				<td>\
				  <select name="besiedelt_sc" style="width: 100px;">\
					<option selected="selected" value="0">=</option><option value="1">></option><option value="2">>=</option><option value="3"><</option><option value="4"><=</option><option value="5">!=</option>      </select>\
				</td>\
			  <td><input type="text" value="" name="besiedelt" style="width: 100px;"/></td> \
			  </tr>  \
			  <tr>\
				<td>Coordenadas</td>\
				<td>X: <input type="text" value="0" name="x_start" maxlength="3" style="width: 50px;"/></td>\
				<td>Y: <input type="text" value="0" name="y_start" maxlength="3" style="width: 50px;"/></td>\
				<td>Estado</td>\
				<td><select name="xxx" style="width: 100px;"><option value="">=</option></select></td>\
				<td>\
				  <select name="status" style="width: 100px;">\
					<option selected="selected" value="0">Todo igual</option><option value="1">Normal</option><option value="2">Vacaciones</option><option value="3">Inactivo</option>       </select>\
				</td></tr><tr><td>1er orden</td><td>\
				  <select name="asc_desc_1" style="width: 100px;">\
					<option selected="selected" value="0">ASC</option><option value="1">DESC</option>      </select>\
				</td><td>\
				  <select name="sortierung_1" style="width: 100px;">\
					<option selected="selected" value="0">Jugador</option><option value="1">Alianza</option><option value="2">Estado</option><option value="3">Nombre de la ciudad</option><option value="4">Intendencia</option><option value="5">X</option><option value="6">Y</option><option value="7">Nombre de la isla</option><option value="8">Maravilla</option><option value="9">Madera</option><option value="10">Ciudades</option>       </select>\
				</td><td>2do orden</td><td>\
				  <select name="asc_desc_2" style="width: 100px;">\
					<option selected="selected" value="0">ASC</option><option value="1">DESC</option>      </select>\
				</td><td>\
				  <select name="sortierung_2" style="width: 100px;">\
					<option value="0">Jugador</option><option selected="selected" value="1">Alianza</option><option value="2">Estado</option><option value="3">Nombre ciudad</option><option value="4">Intendencia</option><option value="5">X</option><option value="6">Y</option><option value="7">Nombre de la isla</option><option value="8">Maravilla</option><option value="9">Madera</option><option value="10">Ciudades</option>      </select>\
				</td></tr><tr><td align="center" colspan="6"><input type="submit" value="Search" class="button"/></td></tr></table>			\
		</form>',
};

IkaSearch.init();









// ==UserScript==
// @name           Ikariam Military Cargo (Blank Canvas)


// @include        http://s*.ikariam.*/index.php?view=militaryAdvisorMilitaryMovements*

// ==/UserScript==

GM_addStyle('.resourcesOnBoard h5 { display:none; }\
			.resourcesOnBoard .unitBox { width:35px; float:left; margin-top:4px; text-align:center; }\
			.resourcesOnBoard .unitBox img { width:20px; }\
			.resourcesOnBoard .unitBox .iconSmall { padding-top:4px; }\
			.resourcesOnBoard .count { text-align:center; font-weight:normal; font-size:10px; }\
			.resourcesOnBoard .icon { text-align:center; }\
			tr.own td:first-child + td {  }');

var elems = document.getElementById('mainview').getElementsByTagName('div');
for(var i = 0; i < elems.length; i++) {
	if(elems[i].className == 'tooltip2' && elems[i].innerHTML.match(/count/)) {
		try {
			var src = elems[i].innerHTML;
			var target = elems[i].parentNode;
			target.wrappedJSObject.onmouseover = null;
			target.style.cursor = "auto";
			target.innerHTML = "";
			target.innerHTML += '<table class="resourcesOnBoard" style="width:275px;">' + src + '</table>';	
		} catch(e) {}
	}
}







// ==UserScript==
// @name AllScoresInline
// ==/UserScript==

var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var lversion = "2.64";
var urlscript = "http://userscripts.org/scripts/show/63338";
ScriptUpdater.check(63338, '2.64');

var TotalView = GM_getValue('AllScoresInline_Control_TotalView', true);
var MilitaryView = GM_getValue('AllScoresInline_Control_MilitaryView', true);
var GoldView = GM_getValue('AllScoresInline_Control_GoldView', true);
var BuilderView = GM_getValue('AllScoresInline_Control_BuilderView', true);
var BuildingView = GM_getValue('AllScoresInline_Control_BuildingView', true);
var ResearchView = GM_getValue('AllScoresInline_Control_ResearchView', true);
var ResearcherView = GM_getValue('AllScoresInline_Control_ResearcherView', true);
var OffenseView = GM_getValue('AllScoresInline_Control_OffenseView', true);
var DefenseView = GM_getValue('AllScoresInline_Control_DefenseView', true);
var TradeView = GM_getValue('AllScoresInline_Control_TradeView', true);
var RankView = GM_getValue('AllScoresInline_Control_RankView', true);

var post = {
    score: "score",
    military: "army_score_main",
    gold: "trader_score_secondary",
    building_main:  "building_score_main",
    building_sec:  "building_score_secondary",
    research_main: "research_score_main",
    research_sec: "research_score_secondary",
    offense: "offense",
    defense: "defense",
    trade: "trade"};
    
var updateCounter =0;

var scoreTypes = {
    0: "score", 
    1: "military",
    2: "allyscore",		
    3: "gold",
    4: "building_main",
    5: "building_sec",
    6: "research_main",
    7: "research_sec",
    8: "offense",
    9: "defense",
   10: "trade"};

var scoreShown = false;

getElementsByClass = function(inElement, className, findIn) {
  var all = inElement.getElementsByTagName('*');
  var elements = [];
  for (var e = 0; e < all.length; e++) {
    if (findIn == true) {
        if (all[e].className.indexOf(className) > 0) {
            elements[elements.length] = all[e];
        }
    } else {
        if (all[e].className == className) {
            elements[elements.length] = all[e];
        }
    }
  }
  return elements;
};

// called using player name, score type, 
function requestScore(playerName, type, onload) {
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:"view=highscore&highscoreType=" + post[type] + "&searchUser=" + playerName,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
        },
        onload:onload
    });
}

function fmtNumber(n) {
  n += "";
  for (var i = (n.length - 3); i > 0; i -= 3) {
    n = n.slice(0, i) +","+ n.slice(i);
  }
  return n;
}

function createBaseDiv() {
    baseDivCreated = true;
    
    scoreElement = document.createElement("div");
    scoreElement.setAttribute("id", "inlinescore");
    
    /*var scoreDiv = */
	scoreElement.innerHTML += 
		"<li style=\"margin: 2px 10px;font-size:11px\" id=\"scores\" class=\"ally\">" + lang.scores + ":" + 
        "</li>";
	
	if (TotalView == true) {
	scoreElement.innerHTML += 		
		"<li style=\"margin: 2px 10px;font-size:11px\" id=\"total_score\" class=\"ally\">" +
			"<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.score + ":</span>" +
            "<div id=\"score\">" + lang.unknown + "</div>" +
	    "</li>";
	}
	if (MilitaryView == true) {
	scoreElement.innerHTML += 		
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"army_score_main\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.military + ":</span>" +
            "<div id=\"military_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (BuilderView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"building_score_main\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.building_main + ":</span>" +
            "<div id=\"building_main_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (BuildingView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"building_score_secondary\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.building_sec + ":</span>" +
            "<div id=\"building_sec_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (ResearcherView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"research_score_main\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.research_main + ":</span>" +
            "<div id=\"research_main_score\">" + lang.unknown + "</div>" +
        "</li>";
	
	}
	if (ResearchView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"research_score_secondary\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.research_sec + ":</span>" +
            "<div id=\"research_sec_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (OffenseView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"offense_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.offense + ":</span>" +
            "<div id=\"offense_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (DefenseView == true) {
	scoreElement.innerHTML += 
		"<li style=\"margin: 2px 10px;font-size:11px\" id=\"defense_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.defense + ":</span>" +
            "<div id=\"defense_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (TradeView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"trade_\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.trade + ":</span>" +
            "<div id=\"trade_score\">" + lang.unknown + "</div>" +
        "</li>";
	}
	if (GoldView == true) {
	scoreElement.innerHTML += 
        "<li style=\"margin: 2px 10px;font-size:11px\" id=\"trader_score_secondary\" class=\"ally\">" +
            "<span style=\"float:" + lang.float + ";\" class=\"textLabel\">" + lang.gold + ":</span>" +
            "<div id=\"gold_score\">" + lang.unknown + "</div>" +
        "</li>";
    }

    /*scoreElement.innerHTML = scoreDiv;*/
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) { 
        informationContainer = document.getElementById('information'); 
    }
    
    var allyClass = getElementsByClass(informationContainer, "ally") 
    
    insertAfter(scoreElement, allyClass[0]);
    scoreShown = true;
}

function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;

    //if the parents lastchild is the targetElement...
    if(parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function updateScore(type, score) {
    document.getElementById(type).innerHTML = score;
}

function updateDetails(type, playerName, townLevel, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: hidden;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var score = getElementsByClass(hiddenDiv, "score", false);
	var place = getElementsByClass(hiddenDiv, "place", false);
	var pname = getElementsByClass(hiddenDiv, "name", false);
    for (var e = 0; e < pname.length; e++) {
        if (pname[e].innerHTML == playerName) {
            var totalScore = score[e].innerHTML;
            var totalRank = place[e].innerHTML;
			if (RankView == true) {	
				totalScore += " (#"+totalRank+")";
			}
        }
    }
    document.body.removeChild(hiddenDiv);
    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore;
}

function cityInformation() {
    if (!document.getElementById("inlinescore")) {
        createBaseDiv();
    }
    // Get the lanugage
    lang = defineLanguage(domain);
    
    var playerScore = -1;
    // Remove the "points" information (as of 0.2.8), and get the value for later
    var infoContainer = document.getElementById("infocontainer");
    if (infoContainer) {
        var pointsLi = getElementsByClass(infoContainer, "name", false);
        if (pointsLi[1]) {
            playerScore = parseInt(pointsLi[1].innerHTML.split(/>/)[2].replace(/,/g, ""),10);
            pointsLi[1].style.display = "none";
        }
    }
    
    // Remove the disabled actions... looks messy when it happens
    var actions = document.getElementById("actions");
    if (actions) {
        textSpans = getElementsByClass(actions, "disabled", true);
        for (var cnt = 0; cnt < textSpans.length;cnt++) {
            //textSpans[cnt].style.display = "none";
        }
    }
    
    // Removes the report player link, again causes a fliker
    var reportPlayer = getElementsByClass(document, "reportPlayer");
    //reportPlayer[0].style.display = "none";

	if (TotalView == true) {
		updateScore("score", lang.fetch);
	}
	if (MilitaryView == true) {
		updateScore("military_score", lang.fetch);
	}
	if (GoldView == true) {
        updateScore("gold_score", lang.fetch);
	}
	if (BuilderView == true) {
        updateScore("building_main_score", lang.fetch);
	}
	if (BuildingView == true) {
        updateScore("building_sec_score", lang.fetch);
	}
	if (ResearcherView == true) {
        updateScore("research_main_score", lang.fetch);
	}
	if (ResearchView == true) {
        updateScore("research_sec_score", lang.fetch);
	}
	if (OffenseView == true) {
        updateScore("offense_score", lang.fetch);
	}
	if (DefenseView == true) {
        updateScore("defense_score", lang.fetch);
	}
	if (TradeView == true) {
        updateScore("trade_score", lang.fetch);
	}

    var listParts = "";
    // Get the players name
    listParts = getElementsByClass(document,"owner", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var playerName = listParts[2].replace(/^\s+|\s+$/g, ''); // trim up the Player Name// get the players name
    playerName = playerName.replace(/&nbsp;/g, " "); // replace any silly nubspaces!
    
    // Get the players town level for gold pillage data
    listParts = getElementsByClass(document,"citylevel", false)[0].innerHTML.split(">");
    listParts[2] = listParts[2].split("<")[0];
    var townLevel = parseInt(listParts[2].replace(/^\s+|\s+$/g, ''), 10); // trim up the town level
    
    var checkedTime = (new Date().getTime() - (1000*60*10));
    if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("lastCheckedTimestamp") < checkedTime || GM_getValue("lastServerCheck") != gameServer) {

		requestScore(playerName, 'score', function(responseDetails) {
            updateDetails('score', playerName, townLevel, responseDetails.responseText);
        });       
        requestScore(playerName, 'military', function(responseDetails) {
            updateDetails('military_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'gold', function(responseDetails) {
            updateDetails('gold_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'building_main', function(responseDetails) {
            updateDetails('building_main_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'building_sec', function(responseDetails) {
            updateDetails('building_sec_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'research_main', function(responseDetails) {
            updateDetails('research_main_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'research_sec', function(responseDetails) {
            updateDetails('research_sec_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'offense', function(responseDetails) {
            updateDetails('offense_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'defense', function(responseDetails) {
            updateDetails('defense_score', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'trade', function(responseDetails) {
            updateDetails('trade_score', playerName, townLevel, responseDetails.responseText);
        });
	
        GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for (var interation = 0;interation < 10; interation++) {
            var type = scoreTypes[interation];
            document.getElementById(type).innerHTML = GM_getValue(type);
        }
    }
}


function defineLanguage(langTDL) {
    switch (langTDL) {
        case "ar":
            language = {
            float:"left",
            scores:"Puntuaciones",
            fetch:"cargando...",
            unknown:"Desconocido",
            allyscore:"Puntos de Alianza",
            score:"Puntos Totales",
            military:"Generales",
            gold:"Reserva de Oro",
            building_main:  "Constructor",
            building_sec:  "Construcción",
            research_main: "Investigadores",
            research_sec: "Investigación",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            rank: "Mostrar posición"};
            break;
        case "bg":
            language = {
            float:"left",
            scores:"Точки",
            fetch:"Изтегляне...",
            unknown:"Няма информация",
            allyscore:"Съюзни точки",
            score:"Общ резултат",
            military:"Генерали",
            gold:"Злато",
            building_main: "Строители",
            building_sec: "Ниво сгради",
            research_main: "Учени",
            research_sec: "Нива на научните изследвания",
            offense: "Нападение",
            defense: "Защита",
            trade: "Търговия",
            rank: "Show rank"};
            break;
        case  "br":
            language = {
            float:"left",
            scores: "Pontuações",
            fetch: "Carregando...",
            unknown: "Desconhecido",
            allyscore: "Pontos da Aliança",
            score: "Pontos Totais",
            military: "Generais",
            gold: "Ouro",
            building_main: "Alvenaria",
            building_sec: "Contrução",
            research_main: "Cientistas",
            research_sec: "Pesquisa",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            rank: "Show rank"};
            break;
        case "by":
            language = {
            float:"left",
            scores:"Баллы",
            fetch:"Ищем...",
            unknown:"Неизвестно",
            allyscore:"Баллы альянса",
            score:"Общий счет",
            military:"Генералы",
            gold:"Золото",
            building_main:  "Строители",
            building_sec:  "Уровни зданий",
            research_main: "Ученые",
            research_sec: "Уровень исследований",
            offense: "Баллы атаки",
            defense: "Баллы защиты",
            trade: "Баллы торговли",
            rank: "Show rank"};
            break;
        case "cn":
            language = {
            float:"left",
            scores:"分數列表",
            fetch:"讀取中...",
            unknown:"未知",
            allyscore:"聯盟分數",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            building_main: "建築大師",
            building_sec: "建築等級",
            research_main: "科學巨人",
            research_sec: "研究等級",
            offense: "進攻分數",
            defense: "防禦分數",
            trade: "貿易分數",
            rank: "Show rank"};
            break; 
        case "cz":
            language = {
            float:"left",
            scores:"Scores",
            fetch: "nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score: "Celkové skóre",
            military: "Vojenské skóre",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            rank: "Show rank"};
            break;
        case "de":
            language = {
            float:"left",
            scores:"Punkte",
            fetch:"Laden...",
            unknown:"Unbekannt",
            allyscore:"Ally Punkte",
            score:"Gesamtpunkte",
            military:"Generäle",
            gold:"Goldbestand",
            building_main:  "Baumeister",
            building_sec:  "Gebäudestufen",
            research_main: "Forscher",
            research_sec: "Forschungslvl",
            offense: "Offensivpunkte",
            defense: "Defensivpunkte",
            trade: "Handelsscore",
            rank: "Show rank"};
            break;
        case "es":
            language = {
            float:"left",
            scores:"Puntuaciones",
            fetch:"cargando...",
            unknown:"Desconocido",
            allyscore:"Puntos de Alianza",
            score:"Puntos Totales",
            military:"Generales",
            gold:"Reserva de Oro",
            building_main:  "Constructor",
            building_sec:  "Construcción",
            research_main: "Investigadores",
            research_sec: "Investigación",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            rank: "Mostrar posición"};
            break;
        case "fr":
            language = {
            float:"left",
            scores:"Points",
            fetch:"Fetching...",
            unknown:"Inconnu",
            allyscore:"Alliance Points",
            score:"Total des points",
            military:"Généraux",
            gold:"Réserves d'or",
            building_main: "Constructeur",
            building_sec: "Bâtiments",
            research_main: "Science",
            research_sec: "Recherche",
            offense: "Attaque",
            defense: "Défense",
            trade: "Commerce",
            rank: "Show rank"};
            break;
        case "gr":
            language = {
            float:"left",
            scores:"Βαθμολογία",
            fetch:"ανάκτηση...",
            unknown:"Άγνωστο",
            allyscore:"Συμμαχία",
            score:"Βαθμολογία",
            military:"Στρατεύματα",
            gold:"Χρυσός",
            building_main:  "Οικοδόμοι",
            building_sec:  "Κτίρια",
            research_main: "Επιστήμονες",
            research_sec: "Έρευνες",
            offense: "Επίθεση",
            defense: "Άμυνα",
            trade: "Εμπόριο",
            rank: "Show rank"};
            break;
        case "hk":
            language = {
            float:"left",
            scores:"分數列表",
            fetch:"讀取中...",
            unknown:"未知",
            allyscore:"聯盟分數",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            building_main: "建築大師",
            building_sec: "建築等級",
            research_main: "科學巨人",
            research_sec: "研究等級",
            offense: "進攻分數",
            defense: "防禦分數",
            trade: "貿易分數",
            rank: "Show rank"};
            break; 
        case "hu":
            language = {
            float:"left",
            scores:"Pontok",
            fetch:"Töltés...",
            unknown:"Ismeretlen",
            allyscore:"Szövetség",
            score:"Összpontszám",
            military:"Katonai pont",
            gold:"Arany",
            building_main:  "Építők",
            building_sec:  "Épületek",
            research_main: "Tudósok",
            research_sec: "Fejlesztés",
            offense: "Támadás",
            defense: "Védelem",
            trade: "Kereskedelem",
            rank: "Show rank"};
            break;
        case "il":
            language = {
            float:"right",
            scores:"ניקוד",
            fetch:"טוען...",
            unknown:"לא ידוע",
            allyscore:"ניקוד הברית",
            score:"ניקוד כללי",
            military:"גנרלים",
            gold:"מלאי זהב",
            building_main:  "בונים מוסמכים",
            building_sec:  "שלבי בנייה",
            research_main: "מדענים",
            research_sec: "שלבי מחקר",
            offense: "נקודות התקפה",
            defense: "נקודות הגנה",
            trade: "ניקוד מסחר",
            rank: "הראה דרגה"};
            break;
        case "it":
            language = {
            float:"left",
            scores:"Punteggi",
            fetch:"Caricamento...",
            unknown:"Sconosciuto",
            allyscore:"Punti Alleanza",
            score:"Punteggio Totale",
            military:"Punteggio Militare",
            gold:"Tesoro",
            building_main: "Costruttori",
            building_sec: "Costruzioni",
            research_main: "Scienziati",
            research_sec: "Ricerche",
            offense: "Offensivo",
            defense: "Difensivo",
            trade: "Commercio",
            rank: "Show rank"};
            break;
       case "lv":
            language = {
            float:"left",
            scores:"Punkti",
            fetch:"Ielādē...",
            unknown:"Nezināms",
            allyscore:"Alianses Punkti",
            score:"Kopējie Punkti",
            military:"Ģenerāļi",
            gold:"Zelts",
            building_main:  "Celtnieki",
            building_sec:  "Celtniecība",
            research_main: "Zinātnieki",
            research_sec: "Pētniecība",
            offense: "Uzbrukums",
            defense: "Aizsardzība",
            trade: "Tirdzniecība",
            rank: "Parādīt pozīciju"};
            break;
        case "nl":
            language = {
            float:"left",
            scores:"Scores",
            fetch:"Ophalen...",
            unknown:"Onbekend",
            score:"Totale score",
            military:"Militaire Score",
            gold:"Voorraad goud",
            building_main:  "Meesterb.",
            building_sec:  "Gebouwniv.",
            research_main: "Wetenschapp.",
            research_sec: "Onderz.niv.",
            offense: "Aanvalspunten",
            defense: "Defensiepunten",
            trade: "Handelsscore",
            rank: "Rang zichtbaar"}; 
            break;
        case "net":
            language = {
            float:"left",
            scores:"Puan",
            fetch:"Bekleniyor...",
            unknown:"Bilinmeyen",
            allyscore:"İttifak Puanı",
            score:"Toplam Puan",
            military:"General Puanı",
            gold:"Altın Puanı",
            building_main: "Usta inşaatçılar",
            building_sec: "Bina Seviyeleri",
            research_main: "Bilim Adamları",
            research_sec: "Araştırma Seviyeleri",
            offense: "Saldırı",
            defense: "Savunma",
            trade: "Ticaret",
            rank: "Sırlamayı Göster"};
            break;
        case "pl":
            language = {
            float:"left",
            scores:"Wyniki",
            fetch:"Pobieranie...",
            unknown:"Nieznany",
            allyscore:"Sojusz",
            score:"Całkowity",
            military:"Generałowie",
            gold:"Złoto",
            building_main:  "Budowa",
            building_sec:  "Budynki",
            research_main: "Naukowcy",
            research_sec: "Badania",
            offense: "Ofensywa",
            defense: "Obrona",
            trade: "Handel",
            rank: "Pokaż ranking"};
            break;
        case  "pt":
            language = {
            float:"left",
            scores: "Pontuações",
            fetch: "Carregando...",
            unknown: "Desconhecido",
            allyscore: "Pontos da Aliança",
            score: "Pontos Totais",
            military: "Generais",
            gold: "Ouro",
            building_main: "Alvenaria",
            building_sec: "Contrução",
            research_main: "Cientistas",
            research_sec: "Pesquisa",
            offense: "Ofensivos",
            defense: "Defensivos",
            trade: "Comercial",
            rank: "Show rank"};
            break;
        case "ro":
            language = {
            float:"left",
            scores:"Scoruri",
            fetch:"Incarcare...",
            unknown:"Necunoscut",
            allyscore:"Scor Alianta",
            score:"Scor Total",
            military:"Generali",
            gold:"Stoc Aur",
            building_main:  "Constructori",
            building_sec:  "Cladiri",
            research_main: "Cercetatori",
            research_sec: "Cercetare",
            offense: "Atac",
            defense: "Aparare",
            trade: "Puncte Comert",
            rank: "Pozitie"};
            break;
        case "ru":
            language = {
            float:"left",
            scores:"Баллы",
            fetch:"Ищем...",
            unknown:"Неизвестно",
            allyscore:"Баллы альянса",
            score:"Общий счет",
            military:"Генералы",
            gold:"Золото",
            building_main:  "Строители",
            building_sec:  "Уровни зданий",
            research_main: "Ученые",
            research_sec: "Уровень исследований",
            offense: "Баллы атаки",
            defense: "Баллы защиты",
            trade: "Баллы торговли",
            rank: "Show rank"};
            break;
        case "sk":
            language = {
            float:"left",
            scores:"Scores",
            fetch:"nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Celkové Skóre",
            military:"Vojenské skóre",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            rank: "Show rank"};
            break;
        case "tr":
            language = {
            float:"left",
            scores:"Scores",
            fetch:"Yukleniyor...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            rank: "Show rank"};
            break;
        case "tw":
            language = {
            float:"left",
            scores:"分數列表",
            fetch:"讀取中...",
            unknown:"未知",
            allyscore:"聯盟分數",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            building_main: "建築大師",
            building_sec: "建築等級",
            research_main: "科學巨人",
            research_sec: "研究等級",
            offense: "進攻分數",
            defense: "防禦分數",
            trade: "貿易分數",
            rank: "Show rank"};
            break;
         case "ua":
            language = {
            float:"left",
            scores:"Бали",
            fetch:"Пошук...",
            unknown:"Невідомо",
            allyscore:"Бали альянсу",
            score:"Загальний рахунок",
            military:"Генерали",
            gold:"Запас золота",
            building_main:  "Будівельники",
            building_sec:  "Рівні будівель",
            research_main: "Вчені",
            research_sec: "Рівні дослідження",
            offense: "Наступальні бали",
            defense: "Бали захисту",
            trade: "Топ торгівлі",
            rank: "Show rank"};
            break; 
        case "vn":
            language = {
            float:"left",
            scores:"Scores", 
            fetch:"Đang tải...",
            unknown:"Không biết",
            allyscore:"Liên minh",
            score:"Tổng điểm",
            military:"Quân sự",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            rank: "Show rank"};
            break;
        case "ikariam":
            switch (subDomain) 
            {
                case "ae":
                    language = {
                    float:"right",
                    scores:"النقاط",
                    fetch:"جلب...",
                    unknown:"غير معروف",
                    allyscore:"نقاط الحلف",
                    score:"مجموع النقاط",
                    military:"الجنرالات",
                    gold:"نقاط الذهب",
                    building_main:  "معلم بناء",
                    building_sec:  "مستوى المباني",
                    research_main: "باحث",
                    research_sec: "مستوى الأبحاث",
                    offense: "نقاط الهجوم",
                    defense: "نقاط الدفاع",
                    trade: "ترتيب التجارة",
                    rank: "Show rank"};
                    break;
                case  "ar":
                    language = {
                    float:"left",
                    scores:"Puntuaciones",
                    fetch:"cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntos de Alianza",
                    score:"Puntos Totales",
                    military:"Generales",
                    gold:"Reserva de Oro",
                    building_main:  "Constructor",
                    building_sec:  "Construcción",
                    research_main: "Investigadores",
                    research_sec: "Investigación",
                    offense: "Ofensivos",
                    defense: "Defensivos",
                    trade: "Comercial",
                    rank: "Mostrar posición"};
                    break;
                case  "ba":
                    language = {
                    float:"left",
                    scores:"Bodovi",
                    fetch:"Privlacan...",
                    unknown:"Nepoznat",
                    allyscore:"Savezni Bodovi",
                    score:"Totalni Bodovi",
                    military:"Vojni Bodovi",
                    gold:"Zlatni Bodovi",
                    building_main: "Konstruktor",
                    building_sec: "Izgradnja",
                    research_main: "Nauka",
                    research_sec: "Istrazivanje",
                    offense: "Ofanziva",
                    defense: "Odbrana",
                    trade: "Trgovanje",
                    rank: "Show rank"};
                    break;
                case  "cl":
                    language = {
                    float:"left",
                    scores:"Puntuaciones",
                    fetch:"cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntos de Alianza",
                    score:"Puntos Totales",
                    military:"Generales",
                    gold:"Reserva de Oro",
                    building_main:  "Constructor",
                    building_sec:  "Construcción",
                    research_main: "Investigadores",
                    research_sec: "Investigación",
                    offense: "Ofensivos",
                    defense: "Defensivos",
                    trade: "Comercial",
                    rank: "Mostrar posición"};
                    break;
                case  "co":
                    language = {
                    float:"left",
                    scores:"Puntuaciones",
                    fetch:"cargando...",
                    unknown:"Desconocido",
                    allyscore:"Puntos de Alianza",
                    score:"Puntos Totales",
                    military:"Generales",
                    gold:"Reserva de Oro",
                    building_main:  "Constructor",
                    building_sec:  "Construcción",
                    research_main: "Investigadores",
                    research_sec: "Investigación",
                    offense: "Ofensivos",
                    defense: "Defensivos",
                    trade: "Comercial",
                    rank: "Show rank"};
                    break;
                case "fi":
                    language = {
                    float:"left",
                    scores:"Scores",
                    fetch:"haetaan...",
                    unknown:"Unknown",
                    allyscore:"Ally Score",
                    score:"Kokonaispisteet",
                    military:"Sotilaspisteet",
                    gold:"Gold Score",
                    building_main:  "Builder",
                    building_sec:  "Building",
                    research_main: "Science",
                    research_sec: "Research",
                    offense: "Offense",
                    defense: "Defense",
                    trade: "Trading",
                    rank: "Show rank"};
                    break;
                case "id":
                    language = {
                    float:"left",
                    scores:"Skor",
                    fetch:"Memuat...",
                    unknown:"Tidak diketahui",
                    allyscore:"Skor Sekutu",
                    score:"Total Skor",
                    military:"Skor Militer",
                    gold:"Skor Emas",
                    building_main:  "Pekerja",
                    building_sec:  "Membangun",
                    research_main: "Sains",
                    research_sec: "Penelitian",
                    offense: "Menyerang",
                    defense: "Bertahan",
                    trade: "Berdagang",
                    rank: "Show rank"};
                    break;
                case "ir":
                    language = {
                    float:"right",
                    scores:"امتیاز",
                    fetch:"در حال جستجو",
                    unknown:"نامعلوم",
                    allyscore:"امتیاز اتحاد",
                    score:"امتیاز کلی",
                    military:"امتیاز ژنرال",
                    gold:"طلا",
                    building_main:  "بناء",
                    building_sec:  "ساختمان",
                    research_main: "محقق",
                    research_sec: "تحقیق",
                    offense: "اهجومی",
                    defense: "دفاعی",
                    trade: "تجاری",
                    rank: "Show rank"};
                    break;
	    }
            break;
        default:
            language = {
            float:"left",
            scores:"Scores",
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            score:"Total Score",
            military:"Military Score",
            gold:"Gold Score",
            building_main:  "Builder",
            building_sec:  "Building",
            research_main: "Science",
            research_sec: "Research",
            offense: "Offense",
            defense: "Defense",
            trade: "Trading",
            rank: "Show rank"};
            break;
    }
    return language;
}

function init() {
    
    var linkElements = document.getElementsByTagName('a');
    for (var i = 0; i < linkElements.length; i++) {
        if (linkElements[i].id.search(/city_[0-9]*/) != -1) {
            linkElements[i].addEventListener('click', function() { window.setTimeout(cityInformation, 1); }, false);
        }
    }
        
    var informationDiv = document.getElementById('information');
    if (informationDiv) {
        var listElements = informationDiv.getElementsByTagName('li');
        if (listElements.length > 0) {
            cityInformation();
        }
    }
}
function setChekbox(idsave,id)	// control state of the checkbox
{
		var savevalue = GM_getValue(idsave,true);
		if (savevalue == false) document.getElementById(id).checked = false;
		else document.getElementById(id).checked = true;
}

function displayOnOptions_fn() {

		var ScoreOptions = document.createElement("div");
		ScoreOptions.setAttribute('id','optionAllScoresInline');
		ScoreOptions.innerHTML = 
			"<div class='contentBox01h'>" +
				"<h3 class='header'>"+
					"<span class='textLabel'>AllScoresInline Control v"+ lversion +" <a href='"+ urlscript +"' target='_blank'>(by Woeka and AnneDeGeus)</a></span> "+
				"</h3>"+
				"<div class='content'>" +
					"<table cellpadding='0' cellspacing='0'>"+
						"<tbody>"+
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.score +"</th>" +
								"<td><input type='checkbox' id='optionTotal'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.military +"</th>" +
								"<td><input type='checkbox' id='optionMilitary'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.gold +"</th>" +
								"<td><input type='checkbox' id='optionGold'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.building_main +"</th>" +
								"<td><input type='checkbox' id='optionBuilder'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.building_sec +"</th>" +
								"<td><input type='checkbox' id='optionBuilding'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.research_main +"</th>" +
								"<td><input type='checkbox' id='optionResearcher'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.research_sec +"</th>" +
								"<td><input type='checkbox' id='optionResearch'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.offense +"</th>" +
								"<td><input type='checkbox' id='optionOffense'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.defense +"</th>" +
								"<td><input type='checkbox' id='optionDefense'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.trade +"</th>" +
								"<td><input type='checkbox' id='optionTrade'></td>"+
							"</tr>" +
							"<tr>" +
								"<th id='AllScoresInline'>" + lang.rank +"</th>" +
								"<td><input type='checkbox' id='optionRank'></td>"+
							"</tr>" +
						"</tbody>"+
					"</table>" +
				"</div>" +
				/*"<div class='centerButton'>"+	
					"<span class='button'id='AllScoresInlineSave'>Save</span>"+	
				"</div>"+*/
                "<div class='footer'></div>" +
            "</div>";			

		document.getElementById("mainview").insertBefore(ScoreOptions, document.getElementById("vacationMode"));	

		document.getElementById('optionTotal').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_TotalView', document.getElementById('optionTotal').checked);},true);
		document.getElementById('optionMilitary').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_MilitaryView', document.getElementById('optionMilitary').checked);},true);
		document.getElementById('optionGold').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_GoldView', document.getElementById('optionGold').checked);},true);
		document.getElementById('optionBuilder').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_BuilderView', document.getElementById('optionBuilder').checked);},true);
		document.getElementById('optionBuilding').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_BuildingView', document.getElementById('optionBuilding').checked);},true);
		document.getElementById('optionResearch').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_ResearchView', document.getElementById('optionResearch').checked);},true);
		document.getElementById('optionResearcher').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_ResearcherView', document.getElementById('optionResearcher').checked);},true);
		document.getElementById('optionOffense').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_OffenseView', document.getElementById('optionOffense').checked);},true);
		document.getElementById('optionDefense').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_DefenseView', document.getElementById('optionDefense').checked);},true);
		document.getElementById('optionTrade').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_TradeView', document.getElementById('optionTrade').checked);},true);
		document.getElementById('optionRank').addEventListener('change',function(event){GM_setValue('AllScoresInline_Control_RankView', document.getElementById('optionRank').checked);},true);
		
		// controll state of chekbox
		setChekbox('AllScoresInline_Control_TotalView','optionTotal');
		setChekbox('AllScoresInline_Control_MilitaryView','optionMilitary');
		setChekbox('AllScoresInline_Control_GoldView','optionGold');
		setChekbox('AllScoresInline_Control_BuilderView','optionBuilder');
		setChekbox('AllScoresInline_Control_BuildingView','optionBuilding');
		setChekbox('AllScoresInline_Control_ResearchView','optionResearch');
		setChekbox('AllScoresInline_Control_ResearcherView','optionResearcher');
		setChekbox('AllScoresInline_Control_OffenseView','optionOffense');
		setChekbox('AllScoresInline_Control_DefenseView','optionDefense');
		setChekbox('AllScoresInline_Control_TradeView','optionTrade');
		setChekbox('AllScoresInline_Control_RankView','optionRank');
}

//start script
if (document.getElementById('options_changePass')) {
    lang = defineLanguage(domain);
	displayOnOptions_fn();
} else {
    lang = defineLanguage(domain);
	init();
}









