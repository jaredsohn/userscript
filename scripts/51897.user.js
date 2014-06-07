// ==UserScript==
// @name	antropomoorfico 2
// @namespace  	antropomorfico 2
// @description	antropomorfico 2 script
// @include    	http://s12.ikariam.es/index.php*
// @include        http://s*.ikariam.*/index.php
// @include        http://s*.ikariam.*/index.php*view=island*
// @include        http://s*.ikariam.*/index.php*view=worldmap_iso*

// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// ==/UserScript==
// 
// Version 1.0   - Initial version
// Version 1.1   - BugFix : Works when selecting town (from town navigation) that don't belong to player. 
//                          Only if you have selected to see the coords on town navigation from options.
// Version 1.15  - Feature: Small visual change. Changing the cursor when viewing the travel times.
// Version 1.2   - HotFix : Better way to extract coordinations.
// Version 1.3   - Feature: Added spy's travel time.
// Version 1.4   - Feature: Works in World View.
//                 Feature: Visual Changes.
//
// ---------------
// Thanks to oliezekat, Drew Dupont & MT0 for suggestions and improvements.


var current={};
current.city={};
function parseCoords(coords){
	var match = /\[(\d+):(\d+)\]/.exec( coords );
	return {x: match[1]-0, y:match[2]-0};
}
var image = {
	"jurneytime" : "data:image/gif;base64,R0lGODlhIAAUANU8AGTcL23eM6eab7XvVbJvJaDqS4VWH8+aPG4qCn5pT5foR9z0i1XYKKfsTn7iO4bkP4/mQ1zaK+Xo6k3XJLFkFpB6X9PDZI5BCb5rF+GgMeHInUzWKa/tUvrist3xt27bSci2ipdDDkHUHtO7k/Laq8jDrvv326zohkfVIbvwWNHPwq3pf33gS9nZl6XabvfVSO/v8DvSHN/gnOjYfuaqOlVCLXbgNykcDMPyXL2yj/a9P////////wAAAAAAAAAAACH5BAEAADwALAAAAAAgABQAAAb/QJ5wSCzydMikMnmg6YzQoVNHo2UOlBACcaFQDLdolJCpWrGX7QVDINTEQ89QULvZ73h7DQQX2lZDGgkCOYWGhXQjfX4BLHIdFTuSOxKVEioqNR2LPDYBAAAnJjkCk5OVFQlCCzitAxwNBQoQDw6eoAwfMgIWMxa/FaQJJKuur7GztbcRDBMbLoW+BwIJFZvFxsi0tp/MziIfLTkaFTWKRKzZstvLzSgiMRsgMzUCRukpx+vK3e7gpTNy1CM2BJ++ZNxwOYMmKaDAPQXV7UvILFwJGDtmzDhQKEENDZw6dRNVouGMDG06quLkyRGPDiUzniRgwEChGgT7/AkEcAaNJAM0awo810eOkCVIl4QUUiXJTwxauGD4EmbplBdUDkBVwwZMEAA7",
	"transport" : "data:image/gif;base64,R0lGODlhIQAoANU/ANTKq8W7nP36xy0fFjwrIBQKB6iUeqWbiIBDG20QBlg/LaFRIW1ZRo1RK93ClUc0JpZnR45KHbSgfmlBLvXPnIh9aDAGA8eGXn9kTK1ZJaxsRosQBJhcOKaGaFdPQqx8WZd8XnBkVZWEclUrGIVZP6GNdZInFHpxYMKZdLxbLZyQgLaSbP/+5m89GdmTY8+nfeywfaoXBH1vWJpzU4dxVpQ5JbAuGJBvU8h+Xc9wOPrmsE4LBLSokHFLNuPbt////yH5BAEAAD8ALAAAAAAhACgAAAb/wJ9wSBQCQL6icskkliSHplTKCxFUgKmWGDgFRjzedusL+QCj30E8lp7EAYLPx0u2lxWRUa5m34kHJ0MAfD88WX9CASFEhCoGFTIqGCEVfloAZkYqDAMMGBAAADUwc2M+J0k8DAwTHz46KTEULCg4AqcVAQeVEiYxNhQCOjYxAj44dlOoHj0JFywsLzHAOgIvG9ABDspMPpYiGxsmAtEp4hfDJuRn3UqBiAgmzwLH4jXCFxsOAisBUjRoDCmRIIEJawI0iEOhw8EGDQmjNPlQykjBBCjqOSjIAYCOdQI+GLhURIIOPy0KRtDBskZBky51fDD0b4kPGDrmBHBW0AEF/x0aduwAAaDBDgcgfgQgSWSFDgklXHAQugOFzw9CaezcAVXIGiYGKIhFYVTojAABOuywgIHHhKGIaC45YKADhh49qJLgIQHEWgwGRoyowIWpjxKBJvR4K7SHBAMYLFhgUGHAA4lDvnK5gUExXqo9SlRgIJmBBwsPRBkwgOhATSEdPuFVoAB0JAWSH5CAoOGCi98fsgCoM2RFj2aLa6/tIaNTgec9NPS+QP3ChwAANCvNMaIHicVCLXjwQOD58wG7efv+veIFBQc1fWj4/p0x6gEKREB+UKDHhw8QfLfYAyHoR9wPHHDACisjDPBcByyxxIMC+NFGAAEPXMiACI+xAf9BBi0o5kGGBTwQwE/lOEBAhStiaBkKL8CAgn4/+JBBCgs08J0CD0xAFw8OOHBCAfg9wOMADl4RxiJJ/QBABhnkyAGAgBlwgAoVeEDkihk50AGFIvBwQAcaQDCEDxAssEAEDXBww5iryVAekf1ZowMNA0yAAQM9ZKBBSQtAiQACeahQQggOYhDbAzDU88KFPTzQQAoGKCFflGuSIEOWNPykAwUgdDCMA1oO0EMODcRVxApqRpngCDO058CnKzgggQgeKDBpBk0y4UADgWaAQAuDttBCDxBw0ACwKeCIwATuLAHCAs5GYK21g2bbgmAtMMVEAGkO2kAEg17L5rINSPARBw/JQlDCcB3cAMEM9ErQTRAAOw==",
	"spy" : "data:image/gif;base64,R0lGODlheABkAOZ/ABQZKCs0VgYFB3N5iURTiIZ3czI7TMm7uP/XjDlGdiIqQ5lmRjZCbXqClGZZVYtXOkhSaVlWWKeZliszQ7qrqB0kOhgdL2k5KVAoHTQ9UBshNZmJhTtFWiQsOVg3JcaJXCAUDkxWb0JNZFNBPCQrRzIiGEVLWjlDVTk2O1lieJGatX5JMzE7YzZAVCkjJLR5UlFLSRslSFNaaqFqSGpJNem1e0syJM+QX6d2ViMpNVdlhD1JXmNqemJAK0tEQ6+ioKSSjCw1RnxrZTopIxAUIy84SmtmaId/gEMsH0M7OadwTTtLhB8mPnJDLEBNf5CAeXNiWCowPo1fQxwhKmRxnnlROCMuVoaJk7OLdbyAV09efCAmMH9waycwQDwyLyYuOygxUFo/MFswIZ6QjQ8WMEQhFWxzgztATDdCV0I+QlFSWSMeHiYuSyEoQCsrMBQdOgwOFldRUF9SS9uiarWflWBbXDQvL6B+ahggPR8nNZxuWq5zUCIqOS83RomQpQAAACH5BAEAAH8ALAAAAAB4AGQAAAf/gH+Cg4SFhoeIiYqGDVRUfouRkpOUlZaUVARLm0sJCU5Ul6KjpKWIVJsEqgROTgkMLAyhprS1toaaq6ytnq8MViG3wsOXKqmrra6eDMwsVhDE0dKHDcfIysywLNsxwdPfxCoJuqq8vtrbAQExDeDutktO5ObN2yzq6jFs7/ykrvPY7OEbGOBNin4IKRH4JK9cwHQE8cXgkLCiIh0sksmjBzEiPhIxLIo0xIyhxlcdPaoD84bHyJcYPWl0pU0lQZbQXorcxsAkzZQrwYCJGCODTotmrJRM5usePqFQhRIkweRoRRFWYjX8+TSq14EsB1hFaCVARlYMMmRwKpSN27ds/6IObDmW34AYAV6BISIARAkvfcCwIUG4MFyvYPDIqPsuRYx7FgRI7lvGRhQFbZgwaaNAgeG4Ud8sZgzO2d7JfUH4tZEDjwYNFTRzJuw2dE7S0vyQYAMAdd81INaUcAHAggXYFdrM3g0XD0Xc0njEYALH9xo4cIYMJwKgOGzZnt8SxqMAurQQMSKj9luixBAkQ4hwP14hNhPPhQm3eWM+Gpg2fE0GR3tI2IAEEi7IVxx9sXHW2YMKkCFWf7egR91679nggQ1rKLjgcchptplyEbpEYS1+6GNBdZOBMISGHiDhYXcfImffZhGOdqIpLJDQBgAsTlZCgUh0SOORC74WIv9nZNy24yhmqNibde91yB2SNBoHYoMKvNHCk6Xow4QFU65XgpFIyndlkt9x9sYEYI6SAh5saGBBgL6BAAeWah5p3GtcVoBHnKLEoAATdgYpGYtYNqoloDiSQMYVhFYSwhttVKABkHCsMYQXoF5H5oJIagkipJyxQYaJlUpSJxOaAuBCDw/MMMMDHHZn6q6n2sglG3gY0OokZNRXgQVT2NADDVU88AANa+i6q5K+GgseSOUNu0gKZCBngQseVLHAC0o84IG01FZbn4gjLseftopkAIAGmQKAxAJ72KpEvvH9aey67LarnIO7kWEGvIm0YUEFXa7xwAI9hEFDxFV4QcT/ljcOPDCEEO6Gx5cIH9KtchYgMUMWL3xwQxYzQDtfmxpr3HFnhSkwaMiFDFBsZhb08MEHC0hRhbhSuDDFxTCTuDHN+RlGRjs4DwLByHgAQMMNQC+wAA3uuWHxvPbJzHHT+QUb9SAtAJDcnUhI8cILOCjxQg9ruDGCHRcnByGJmDnINAkPbna2IH2orTAcwbW3hqeWoSAHDN1pwETNMYv9oHJMvHv2F2ozMWV1IFxswRYTpOGAA3jD1oZ+AbeOuYgGD57HwhoQoZpqi2/RQRRB+AAFFHKsUex9gGca27/I/0sEqzgXd6xq7ZUAwhS6T2CA71wIAbnkqx9aX7rgK0mE/444520B9GdOn8MXQRhgegFPcJEEEcR7/xqvj9pZ+3NRIw0A9MCZQg5yEIUiZMAHDijABjZQABSQwTP2sxP+dkWEPpxtAHB4DREQpxoX9KEDBCxCCxwghAKMAQhAaOAbWKcpCU7QOPM6mxkyuKK+dMoABhhgATMQhwKgUAIoFEIO9OEjWN3vhTA8mwyIsKkgTSEDRchBByZQhOsJAQh0oAMQNxCHCrilM5lpoQunRYSzmeBiG5wMANTSgSkWoQ8oqMMGfvADII7hCWlgwheLZ8QxnooIB8OZGuBwJ9RUMANtnEAQ+uCFOBxBAhSoIwq5MAEFCKYwYTzinzRogqiZgP+QioKD9aQYhAmcwQFx4MIY6FjHBTpgdW4hDGb6mD87dSFqZ+AOi6oDhy8YoAPse6MQnqBACdARCBsgZhoqwBzAeU9TtTxO1CYgH0UJ4AuI7IIBJ+CAH1BgDGOQgATGwEAuQAEFzKTc92ppp6hFQT6TWQMMYKDNKWaAA0WAgQQOcIBIijOZCuRCDhh2OSOaSklkwCV2BIACNQwiCl2IQh9aIIIiJOEIP+AnPykQSS0+AQYLGxGsWkimP0YtAtcsxBHyoMh7imACXjDCIymg0X7+YANCkIMLFmaf79nJOxpkHrwEYAgZKKCULdiBCKJghwgYoZislMAGuOAAGCTBO8b/OqKuXkOGTuJsCzkLAgcUyQERiMANdoBBHYxgBC4c4a0FEEId4gADH1gMUCQdFYgAICycuaEQSV1qETgAgRO4IK11SKxiExuBCMSBrj6IFqC0Oh8y9XVwf9hBBrSwgy4YQKl9WIMdfBABxj72tI6FrMV6BUMFrYh8UUsBG7SgAw504QRK7QAAttDQ0i52sY71QRIkqyQYAkBNcMDsHxowAQjoQAcnmAAHdrCDLVAvCgY4gQk4YAI1REAN4DXBGdKAAi8k6FTGTWMcMKsCNHCAtjpoQRSm24IpXLcPg22BCHfQAgNw4ARBAKF191Rc42xwDR64A2a1YFYtaCEEBuiC/1KDsNtE3pMD7dsBGu55gj50gQ85OBrS7KQgGzxACnoYXAMgIAII0BYCQZBwdYmwvt1lF5/+5UALTtDhIHyhjVM47p3GFwEbiCtog4MAdUUQggdPoAsc4MAU4CDF9U2UA1C8sFqq+OQodGALxwWrIDxQKyUsAAtR88ME1IIGpdq2Azue8vp0WIQTQLEIbW7BBPoAxQn4OcSXfUITZrCHPZg5agPggwGqaIAWZADEQahvL7vQxi9EoQX6DcIJQiCCL0zA0UF4YwcssINBSOEBhTb0AqLWAA0UIdSlLMKXu9CCLYjyyV34cQb02+gWkxXAIoyCBUzwAy7QQAqpVsIMpP9gxhbEuAiv/sIWupCBKS/azz82ABpwOF0IvHoH+BRhHyxwBiPYoAkLmIESlC0FGmC2AQ1wCQ9ykIeIHrfRi5yAL7FchB2EAAIZ6AN1+5sBA/BhCyXoQYzCFbRlKZcQRNhCiAEwBW3jUN+f3TZhd5BdCISAv4v+8hB6gIT2GNkDI3j4IK4Ahy1Yl3q7BrUvRaBZirbAlx6HABqKoO8cuEAMTVD4hmCg8kEMAAB5+EIeJI7pEzg7CmdgsVrATcUdsBifUYC6EarQhAt4wN1FHwQPRvfjPMC5BVEOAtT/zeYOf5bTOyiCl736Byg8IeyEMEOFv7C+DKDhBBj25b8d7ej/DAA+BJw2wATyQHe8F8IMFpDiF/jgWTTs+Jd94PSGC54BEUyX5jgMQuMdL3YN8AGYOcBvC9ybAU//273hhgAEprsDO2fgIKQvhAxO/wW+qwXTO58ik90b9z54XMOAd7RQcy8DlvZe0cBvQR/4EASz0p7nLda5AQxfhEDmfhANsEBEO6DoXaMh+H2YLm7jPoEdyIDTzj5BFyb0faNTevLbXz0aPshhpVZ0AmhgVrMXaRkANfVHCDLwYeanYxPQAbglQjRXSm0me3FXBCJwgIdwBeyzaxo2ATmQAYXVbyJQSutnVi3QBReIgYUgBGGQBknwgihgNAYgAgBGUR4WgJ/H/wF8YBQqOAhIgAErUAUr0AQeID1DQHMcoG070Ad8Rl301QH804M0UAYY4AEX0AMXUAYCkAZ/kAJq0GgZ4Fm9FmUy4H09iAUPcAEYsIZlUAYgQFSDUAIoMIdnwGNWZ4Y9+AdD2HVicAFNoIVrQAgg4AFNQAOGOAJD4AN5SAh64CwX8IgYYAOqUQggUAZicIkY4IYYsIiCQAdzUAMfMAOPeAF9YQiDeAGXeAErsAJQwIl/UAMIEIugeAGTaAhD0IdNsIpD6Ip/gAM3UAM1MAdZIAYggAhJgAGP2HWomHKcKARlsAIPsAJiYAeKUAaqqItiYAO8+AeI6AWR4AEz8DZZwCUyHrCNlBAGM/AzN7AyYGeOkeAF4DiOL7ACzOiOkVCJkFgCjBEIADs=",
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
		"ship_ram":[40,0],
		"ship_ballista":[30,0],
		"ship_flamethrower":[33,0],
		"ship_catapult":[26,0],
		"ship_steamboat":[38,0],
		"ship_mortar":[24,0],
		"ship_submarine":[32,0]
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
	
	$("div#breadcrumbs [class=island]").eq(0).after("<span id='ikariamdistancecalc' style='cursor:help;'>&nbsp;<img src='"+image["jurneytime"]+"' width='22px'><div class='tooltip' style='display: none;background-color:#F1D7AD;border-color:#BE8D53;border-style:solid;border-width:4px 1px 1px;color:#542C0F;padding:0 8px;'></div></span>");
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
		holder.children("div[class=tooltip]").append("<div style='padding:3px 0;"+((first)?"":"border-top:1px dotted #BE8D53;")+"'><img src='"+image[unit]+"' width='30px' style='padding-right:10px;'>"+unsafeWindow.getTimestring(distanceCalc(gamedata.speed[unit][0],current.city.coords,island_coords,gamedata.speed[unit][1])*60*1000,3," ","",true,true)+"</div>");
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
// @name           antropomorfico 2
// @namespace      antropomorfico 2
// @description    script de antropomorfico
// @version        v0.2.8.007
// @include        http://*.ikariam.*/*

//                 2009/01/17
// ==/UserScript==

var baseDivCreated = false;
var gameServer = top.location.host;
var gameServerParts = gameServer.split(".");
var subDomain = gameServerParts[1];
var domain = gameServerParts[2];

var post = {
    score: "score",
 military: "army_score_main",
     gold: "trader_score_secondary" };
     
var updateCounter =0;
var scoreTypes = {
    0: "score", 
    1: "military", 
    2: "gold",
    3: "allyscore",
    4: "allymembers",
};

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

String.prototype.TrimHTML = function() { return this.replace(/(<[^>]*>)/g, ""); }

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

function requestAlliance(allyId, onload) {
    GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + gameServer + '/index.php',
        data:"view=allyPage&allyId=" + allyId, 
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
    scoreElement.setAttribute("class", "dynamic");
    var scoreDiv = <>
    	<h3 style="margin-left:-5px;margin-right:-2px;" class="header">{lang['inline']}</h3>
        <li style="margin: 2px 10px;font-size:12px" id="ally_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['allyscore']}: </span>
            <div id="allyscore">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="ally_members" class="ally">
            <span style="float:left;" class="textLabel">{lang['allymembers']}: </span>
            <div id="allymembers">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="total_score" class="ally">
            <span style="float:left;" class="textLabel">{lang['score']}: </span>
            <div id="score">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="army_score_main" class="ally">
            <span style="float:left;" class="textLabel">{lang['military']}: </span>
            <div id="military">{lang['unknown']}</div>
        </li>
        <li style="margin: 2px 10px;font-size:12px" id="trader_score_secondary" class="ally">
            <span style="float:left;" class="textLabel">{lang['gold']}: </span>
            <div id="gold">{lang['unknown']}</div>
        </li>
    </>;
    
    scoreElement.innerHTML = scoreDiv;
    
    // get container for Island view
    var informationContainer = document.getElementById('infocontainer');
    if (!informationContainer) { 
        informationContainer = document.getElementById('information'); 
    }
    
    //var allyClass = getElementsByClass(informationContainer, "ally") 
    
    //insertAfter(scoreElement, allyClass[0]);
    insertAfter(scoreElement, informationContainer);
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
    var pname = getElementsByClass(hiddenDiv, "name", false);
    for (var e = 0; e < pname.length; e++) {
        if (pname[e].innerHTML == playerName) {
            var totalScore = score[e].innerHTML;
        }
    }
    document.body.removeChild(hiddenDiv);

    if (type == "gold") {
        if (totalScore) { 
            if (totalScore.indexOf(",") != -1) {
                gold = parseInt(totalScore.replace(/,/g, ""),10);
            } else {
                gold = parseInt(totalScore.replace(/[.]/g, ""),10);
            }
            lootable = Math.round(townLevel * (townLevel - 1) / 10000 * gold);
            totalScore += " ("+ fmtNumber(lootable) + " " + lang["loot"] +")";
        } else {
            totalScore = "0";
        }
    }
    GM_setValue(type, totalScore);
    document.getElementById(type).innerHTML = totalScore;
}

function updateAllyDetails(divId, responseText) {
    var hiddenDiv = document.createElement("div");
    hiddenDiv.setAttribute("style", "display: none;");
    document.body.appendChild(hiddenDiv);
    hiddenDiv.innerHTML = responseText;
    var allyTable = getElementsByClass(hiddenDiv, 'content', false);

    var members = parseInt(allyTable[1].childNodes[1].childNodes[1].childNodes[2].childNodes[2].innerHTML, 10);
    var posScore = allyTable[1].childNodes[1].childNodes[1].childNodes[6].childNodes[2].innerHTML;

    if (/([0-9]+)\s\((.+)\)/.exec(posScore)!=null) {
    	allRank = RegExp.$1;
    	posScore = RegExp.$2;
    }
    document.body.removeChild(hiddenDiv);
    
    var strScore = posScore + " (" + allRank + ")";
    document.getElementById("allyscore").innerHTML = strScore;
    GM_setValue("allyscore", strScore);
    document.getElementById("allymembers").innerHTML = members;
    GM_setValue("allymembers", members);
//    GM_setValue(divId, (posScore + " (" + members + ")"));
//    document.getElementById(divId).innerHTML =  (posScore + " (" + members + ")");
}

function cityInformation() {
    if (!document.getElementById("inlinescore")) {
        createBaseDiv();
    }
    else {
    	document.getElementById('ally_score').style.display = "block";
    	document.getElementById('ally_members').style.display = "block";
    }
    // Get the language
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
    //var actions = document.getElementById("actions");
    //if (actions) {
    //    textSpans = getElementsByClass(actions, "disabled", true);
    //    for (var cnt = 0; cnt < textSpans.length;cnt++) {
    //        //textSpans[cnt].style.display = "none";
    //    }
    //}
    
    
    // Removes the report player link, again causes a fliker
    //var reportPlayer = getElementsByClass(document, "reportPlayer");
    //reportPlayer[0].style.display = "none";
    
    updateScore("score", lang.fetch);
    updateScore("military", lang.fetch);
    updateScore("gold", lang.fetch);
    updateScore("allyscore", lang.fetch); 
    updateScore("allymembers", lang.fetch);
	
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
    
    // Get the players alliance id for alliance check
    listParts = getElementsByClass(document,"ally", false)[0].innerHTML;
    if (/allyId=([0-9]+)/.exec(listParts) != null) {
    	var allyId = RegExp.$1;
    } else {
        var allyId = -1;
        GM_setValue("allyscore", "-");
        GM_setValue("allymembers", "-");
    }
    
    var checkedTime = (new Date().getTime() - (1000*60*10));
    if (playerName != GM_getValue("lastPlayerCheck") || GM_getValue("lastCheckedTimestamp") < checkedTime || GM_getValue("lastServerCheck") != gameServer) {

        if (playerScore > -1) {
            updateScore('score', fmtNumber(playerScore));
        } else {
            requestScore(playerName, 'score', function(responseDetails) {
                updateDetails('score', playerName, townLevel, responseDetails.responseText);
            });
        }
        
        requestScore(playerName, 'military', function(responseDetails) {
            updateDetails('military', playerName, townLevel, responseDetails.responseText);
        });
        requestScore(playerName, 'gold', function(responseDetails) {
            updateDetails('gold', playerName, townLevel, responseDetails.responseText);
        });
        
        if (allyId != -1) {
            requestAlliance(allyId, function(responseDetails) {
                updateAllyDetails('allyscore', responseDetails.responseText);
            });
        } else {
            updateScore("allyscore", "-")
            updateScore("allymembers", "-")
            document.getElementById('ally_score').style.display = "none";
            document.getElementById('ally_members').style.display = "none";
        }
        
        
        GM_setValue("lastCheckedTimestamp", new Date().getTime() + "");
        GM_setValue("lastPlayerCheck", playerName);
        GM_setValue("lastServerCheck", gameServer);
    } else {
        for(key in scoreTypes) {
            var type = scoreTypes[key];
            if (type == "allyscore" && GM_getValue(type) == "-") {
                document.getElementById('ally_score').style.display = "none";
            }
            if (type == "allymembers" && GM_getValue(type) == "-") {
            	document.getElementById('ally_members').style.display = "none";
            }
            document.getElementById(type).innerHTML = GM_getValue(type);
        }
    }
}

function defineLanguage(langTDL) {
    switch (langTDL) {
        case "pe":
            language = { inline:"Inline Score",
            fetch:"Recopilando...",
            unknown:"Desconocido",
            allyscore:"Puntaje alianza",
            allymembers:"Nº de miembros",
            score:"Puntaje de jugador",
            military:"Puntaje de tropas",
            gold:"Oro",
            loot:"de botín" };
            break;
        case "es":
            language = { inline:"Inline Score",
            fetch:"Buscando...",
            unknown:"Desconocido",
            allyscore:"Puntos alianza",
            allymembers:"Miembros alianza",
            score:"Puntos",
            military:"Tropas",
            gold:"Oro",
            loot:"botín" };
            break;
        case "fr":
            language = { inline:"Inline Score",
            fetch:"Rapportant...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Points",
            military:"Troupes",
            gold:"Or",
            loot:"butin" };
            break;
        case "gr":
            language = { inline:"Inline Score",
            fetch:"ανάκτηση...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Βαθμολογία",
            military:"Στρατεύματα",
            gold:"Χρυσός",
            loot:"loot" };
            break;
        case "de":
            language = { inline:"Inline Score",
            fetch:"Laden...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Gesamtpunkte",
            military:"Generäle",
            gold:"Goldbestand",
            loot:"loot" };
            break;
        case "tr":
            language = { inline:"Inline Score",
            fetch:"Yukleniyor...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Toplam Puan",
            military:"Askeri Puan",
            gold:"Altin Puani",
            loot:"loot" };
            break;
        case "cz":
            language = { inline:"Inline Score",
            fetch: "nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score: "Celkové skóre",
            military: "Vojenské skóre",
            gold: "Zlatá zásoba",
            loot:"loot" };
            break;
        case "sk":
            language = { inline:"Inline Score",
            fetch:"nahrávam...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Celkové Skóre",
            military:"Vojenské skóre",
            gold:"Zlatá zásoba",
            loot:"loot" };
            break;
        case "tw":
            language = { inline:"積分資訊",
            fetch:"讀取中...",
            unknown:"無法得知",
            allyscore:"聯盟分數",
            allymembers:"聯盟成員",
            score:"總積分",
            military:"戰爭將軍",
            gold:"黃金存量",
            loot:"搶" };
            break;
        case "cn": 
            language = { inline:"排名", 
            fetch:"获取中...", 
            unknown:"无法获取", 
            allyscore:"联盟总分", 
            allymembers:"联盟成员", 
            score:"总分", 
            military:"战争元帅", 
            gold:"黄金储备", 
            loot:"抢" }; 
            break;
        case "hu":
            language = { inline:"Inline Score",
            fetch:"Töltés...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Összpontszám",
            military:"Katonai pont",
            gold:"Arany",
            loot:"loot" };
            break;
        case "se":
            language = { inline:"Inline Score",
            fetch:"hämtar...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Totalpoäng",
            military:"Generalspoäng",
            gold:"Guldmängd",
            loot:"loot" };
            break;
        case "pl":
            language = { inline:"Inline Score",
            fetch:"Ładowanie...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Całkowity Wynik",
            military:"Generałowie",
            gold:"Zapas Złota",
            loot:"loot" };
            break;
        case "ro":
            language = { inline:"Inline Score",
            fetch:"Incarc...",
            unknown:"Necunoscut",
            allyscore:"Scor Alianta",
            allymembers:"Ally Members",
            score:"Scor Total",
            military:"Scor Armata",
            gold:"Scor Aur",
            loot:"loot" };
            break;
        case "il":
            language = { inline:"Inline Score",
            fetch:"טוען...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"ניקוד",
            military:"כח צבאי",
            gold:"זהב",
            loot:"loot" };
            break;
        case "ikariam":
            if (subDomain == "fi") {
                language = { inline:"Inline Score",
                fetch:"haetaan...",
                unknown:"Unknown",
                allyscore:"Ally Score",
                allymembers:"Ally Members",
                score:"Kokonaispisteet",
                military:"Sotilaspisteet",
                gold:"Kulta",
                loot:"loot" };
            }
            if (subDomain == "ae") {
                language = { inline:"Inline Score",
                fetch:"يجلب...",
                unknown:"Unknown",
                allyscore:"نقاط التحالف",
                allymembers:"Ally Members",
                score:"المجموع الكلي",
                military:"النقاط العسكريه",
                gold:"الذهب",
                loot:"loot" };
            }
            if (subDomain == "ba") {
                language = { inline:"Inline Score",
                fetch:"dohvati...",
                unknown:"nemoguce",
                allyscore:"Bodovi Saveza",
                allymembers:"Ally Members",
                score:"Ukupni Rezultat",
                military:"Vojska",
                gold:"Zlato",
                loot:"loot" };
            }
            break;
        default:
            language = { inline:"Inline Score",
            fetch:"Fetching...",
            unknown:"Unknown",
            allyscore:"Ally Score",
            allymembers:"Ally Members",
            score:"Total Score",
            military:"Military Score",
            gold:"Gold Score",
            loot:"loot" };
            break;
    }
    return language;
}



function init() {
    lang = defineLanguage(domain);
    
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

init();




// ==/UserScript==

/*
This project is inspired by these scripts (or parts of them) to design Triumphal Arch :
Ikariam Multi-Page Combat Report Viewer
http://userscripts.org/scripts/show/45439
Ikariam Attack Counter (for 0.3.0)
http://userscripts.org/scripts/show/45285
Ikariam Attack Counter (for 0.2.8)
http://userscripts.org/scripts/show/31603
*/

if (!TriumphalArch)	var TriumphalArch = {};

TriumphalArch =
	{
	DOM:		 {},
	Ikariam:	 {},
	DB:			 {},
	Str:		 {},
	Handlers:	 {},
	Log:		 {},
	HomePage:	 'http://userscripts.org/scripts/show/47093',
	Version:	 112
	};

TriumphalArch.Init = function()
	{
	this.DOM.Init(this);
	this.Str.Init(this);
	this.Ikariam.Init(this);
	this.DB.Init(this);
	this.Handlers.Init(this);
	this.Log.Init(this);
	
	if (this.Ikariam.View() == 'militaryAdvisorCombatReports')
		{
		this.ViewIsCombatReports();
		}
	else if (this.Ikariam.View() == 'militaryAdvisorReportView')
		{
		if (this.Ikariam.Fetch_CombatId() != 0)
			{
			this.ViewIsCombatReport();
			}
		else if (this.Ikariam.Fetch_DetailedCombatId() != 0)
			{
			this.ViewIsDetailedCombatReport();
			}
		}
	else if (this.Ikariam.View() == 'militaryAdvisorMilitaryMovements')
		{
		
		}
	else if (this.Ikariam.View() == 'island')
		{
		this.ViewIsIsland();
		}
	else if (this.Ikariam.View() == 'worldmap_iso')
		{
		this.ViewIsWorldMap();
		}
	};
	
TriumphalArch.PreProcessing = function()
	{
	this.DB.Load();
	this.DB.Load_Texts();
	this.DB.Load_Filters();
	
	this.Ikariam.Fetch_CurrentPlayerCities(this.DB.Cities);
	
	this.DB.Load_Stats();
	this.Merge_Old_CombatReports();
	
	this.Fetch_CombatReports_Cities(this.DB.Cities);
	this.DB.Generate_CitiesNames(this.DB.Cities);
	};
	
TriumphalArch.Merge_Old_CombatReports = function()
	{
	var crTimeLimit = new Date();
	crTimeLimit.setTime(crTimeLimit.getTime() -
		this.Ikariam.CombatReport_MaxTime() -
		(crTimeLimit.getTimezoneOffset()*60*1000) -
		(1000*60*60*24));
	
	crNotTimed	 = 0;
	crOld		 = 0;
	crNoId		 = 0;
	crRecent	 = 0;
	crDel		 = 0;
	var CombatId;
	for (CombatId in this.DB.CombatReports)
		{
		var crTime = this.DB.CombatReports[CombatId].time;
		
		if ((crTime == undefined) || (crTime == 0))
			{
			// May delete it
			crNotTimed++;
			}
		else if (crTime <= crTimeLimit.getTime())
			{
			// Old
			crOld++;
			
			var crCityId = this.DB.CombatReports[CombatId].tcityid;
			if ((crCityId == undefined) || (crCityId == 0))
				{
				// Unknown city
				crNoId++;
				
				if (delete this.DB.CombatReports[CombatId]) crDel++;
				}
			else
				{
				this.DB.Insert_CombatReport_Stats(crCityId, this.DB.CombatReports[CombatId]);
				
				if (delete this.DB.CombatReports[CombatId]) crDel++;
				}
			}
		else
			{
			// recent
			crRecent++;
			}
		}
	
	if (crDel > 0)
		{
		this.DB.Save_Stats();
		this.DB.Save_CombatReports();
		}
	
	this.Log.Add(crNotTimed+' CR without time, '+crOld+' old CR ('+crNoId+' without city ID) => '+crDel+' CR deleted, and '+crRecent+' recents CR.');
	};
	
TriumphalArch.Fetch_CombatReports_Cities = function(database)
	{
	var CombatId;
	for (CombatId in this.DB.CombatReports)
		{
		if (this.DB.CombatReports[CombatId].confirmed != true) continue;
		
		var CityName = this.DB.CombatReports[CombatId].tcityname;
		if ((CityName == undefined) || (CityName == '') || (CityName == 'Polis')) continue;
		
		var CityId = this.DB.CombatReports[CombatId].tcityid;
		if ((CityId == undefined) || (CityId == 0)) continue;
		
		if (database[CityId] == undefined)
			{
			//this.Log.Add('Registered city['+CityId+']: "'+CityName+'"');
			database[CityId] = new this.Ikariam.City_Object();
			database[CityId].id = CityId;
			database[CityId].name = CityName;
			}
		if (database[CityId].knownTime > this.DB.CombatReports[CombatId].time)	database[CityId].knownTime = this.DB.CombatReports[CombatId].time;
		}
	};
	
TriumphalArch.ViewIsCombatReport = function()
	{
	this.Log.Add('View is CR: '+this.Ikariam.Fetch_CombatId());
	
	this.PreProcessing();
	
	this.Ikariam.Fetch_CombatReport(this.DB.CombatReports);
	
	this.DB.Save();
	};
	
TriumphalArch.ViewIsDetailedCombatReport = function()
	{
	this.Log.Add('View is CR: '+this.Ikariam.Fetch_CombatId());
	
	this.PreProcessing();
	
	this.Ikariam.Fetch_DetailedCombatReport(this.DB.CombatReports);
	
	this.DB.Save();
	};
	
TriumphalArch.ViewIsCombatReports = function()
	{
	this.PreProcessing();
	
	this.Ikariam.Fetch_CombatReports(this.DB.CombatReports);
	
	this.DB.Generate_Stats();
	
	this.Set_Common_Styles();
	this.Set_CombatReports_Styles();
	this.Insert_CombatReports_Header();
	if (this.Ikariam.CombatReports_StartValue() == 0)
		{
		this.Insert_Next_CombatReports(0);
		}
	else
		{
		this.Insert_CombatReports_Stats();
		}
	this.Insert_Footer();
	this.Handlers.Attach_CombatReports_Events();
	
	this.DB.Save();
	};
	
TriumphalArch.ViewIsWorldMap = function()
	{
	this.PreProcessing();
	
	this.DB.Generate_Stats();
	
	this.Set_Common_Styles();
	//this.Set_WorldMap_Styles();
	//this.Insert_WorldMap_IslandsInfos();
	};
	
TriumphalArch.ViewIsIsland = function()
	{
	this.PreProcessing();
	
	this.DB.Generate_Stats();
	
	this.Set_Common_Styles();
	this.Set_Island_Styles();
	this.Insert_Island_CitiesInfos();
	};
	
TriumphalArch.Insert_Island_CitiesInfos = function()
	{
	var CitiesInfos = this.DOM.Get_Nodes("//div[@id='mainview']/ul[@id='cities']/li/ul[contains(@class,'cityinfo')]");
	if (CitiesInfos != null)
		{
		var bashTimeLimit = new Date();
		bashTimeLimit.setTime(bashTimeLimit.getTime() -
					this.Ikariam.Bash_Delay() -
					(bashTimeLimit.getTimezoneOffset()*60*1000));
		
		var crTimeLimit = new Date();
		crTimeLimit.setTime(crTimeLimit.getTime() -
			this.Ikariam.CombatReport_MaxTime() -
			(crTimeLimit.getTimezoneOffset()*60*1000));
		
		// Create ordered (by date) array of combat report's indexes under bash delay
		//var CRs = this.DB.Get_TimeOrdered_CombatReportsIds(bashTimeLimit);
		var CRs = this.DB.Get_TimeOrdered_CombatReportsIds(crTimeLimit);
		
		function FetchDestinationCityId(sHTML)
			{
			var CityId = 0;
			var resReg = /[\?&]{1}destinationCityId=([0-9]+)[\&\"]{1}/i.exec(sHTML);
			if (resReg != null)
				{
				CityId = parseInt(resReg[1]);
				}
			return CityId;
			}

		for (var i = 0; i < CitiesInfos.snapshotLength; i++)
			{
			var ul = CitiesInfos.snapshotItem(i);
			var lis = ul.getElementsByTagName("li");
			var cityName = this.Str.Trim(lis[0].childNodes[1].textContent);
			
			var cityId = 0;
			var cityLocation = ul.parentNode;
			var ulActions = cityLocation.getElementsByTagName("ul")[1];
			var lisActions = ulActions.getElementsByTagName("li");
			for (var k = 0; k < lisActions.length; k++)
				{
				var liAction = lisActions[k];
				cityId = FetchDestinationCityId(this.Str.UnAmp(liAction.innerHTML));
				if (cityId != 0)
					{
					// Found
					break;
					}
				}
			
			var crWon = '?';
			var crLost = '?';
			var crBash = '?';
			var CityStats = this.DB.Get_CityStats(cityId, cityName);
			if (CityStats != null)
				{
				crWon = CityStats.won;
				crLost = CityStats.lost;
				crBash = CityStats.bash;

				if (CityStats.own == true)
					{
					crBash = '-';
					}
					
				this.Log.Add('CityStats['+cityId+',"'+cityName+'"]: navyWon='+CityStats.navyWon+', navyLost='+CityStats.navyLost+', plunders='+CityStats.plunders+'');
				}
			if ((cityId != 0) && (this.DB.Cities[cityId] != undefined) && (this.DB.Cities[cityId].own == true))
				{
				crBash = '-';
				}
				
			var BashClass = "taBash";
			if ((crBash == '?') || (crBash == '-'))
				{
				// No more class
				}
			else if (crBash >= 6)
				{
				BashClass += " taRed";
				}
			else if (crBash >= 5)
				{
				BashClass += " taOrange";
				}
			else
				{
				BashClass += " taGreen";
				}
				
			var LastBattles = '';
			var BattlesNbr = 0;
			for (var j = 0; j < CRs.length; j++)
				{
				var CombatId = CRs[j];
				if ((cityId != 0) && (this.DB.CombatReports[CombatId].tcityid != undefined) && (this.DB.CombatReports[CombatId].tcityid != 0) && (this.DB.CombatReports[CombatId].tcityid != cityId))
					{
					
					}
				else if (cityName == this.DB.CombatReports[CombatId].tcityname)
					{
					var CombatTime = new Date(this.DB.CombatReports[CombatId].time);
					var BattleClass = '';
					if (this.DB.CombatReports[CombatId].running == true) BattleClass = 'running';
					if (this.DB.CombatReports[CombatId].won == true) BattleClass = 'won';
					if (this.DB.CombatReports[CombatId].lost == true) BattleClass = 'lost';
					if (this.DB.CombatReports[CombatId].navy == true) BattleClass += ' navy';
					if (this.DB.CombatReports[CombatId].new == true) BattleClass += ' new';
					
					var crLoot = '';
					if ((this.DB.CombatReports[CombatId].own == true) || (this.DB.CombatReports[CombatId].isAttacked == true))
						{
						// ignore
						}
					else if (this.DB.CombatReports[CombatId].loot != undefined)
						{
						var ResType;
						for (ResType in this.DB.CombatReports[CombatId].loot)
							{
							var ResValue = this.DB.CombatReports[CombatId].loot[ResType];
							var ResIcon = '<img src="'+this.Ikariam.Get_ResourceIcon_ImgSrc(ResType)+'"'+
									' title="'+this.Str.FormatBigNumber(ResValue)+' '+this.DB.Get_Text(ResType)+'"/>';
									
							crLoot += ResIcon;
							if (ResValue > 500) crLoot += ResIcon;
							if (ResValue > 2000) crLoot += ResIcon;
							if (ResValue > 5000) crLoot += ResIcon;
							if (ResValue > 10000) crLoot += ResIcon;
							}
						}
						
					var crConfirmed = '';
					if (this.DB.CombatReports[CombatId].confirmed != true)
						{
						crConfirmed = '<sup class="taUnConfirmed">*</sup>';
						}
					
					LastBattles += '<li class="'+BattleClass+'">'+
							'<a href="/index.php?view=militaryAdvisorReportView&combatId='+CombatId+'">'+
							this.Ikariam.Get_CombatReport_DateTime(CombatTime)+
							crConfirmed+
							'</a>'+
							' '+crLoot+
							'</li>';
							
					BattlesNbr++;
					if (BattlesNbr >= 6) break;
					}
				}
			
			if (LastBattles != '')
				{
				LastBattles = 
						'<span class="textLabel">'+this.DB.Get_Text('Battles')+': </span>'+
						'<ul>'+
						LastBattles+
						'</ul>';
				}
						
			ul.innerHTML = ul.innerHTML +
				'<li class="name taStats" title="'+this.DB.Get_Text('BattlesWLB')+'">'+
				'<span class="textLabel"><nobr>'+this.DB.Get_Text('WLB')+': </nobr></span>'+
				crWon+' / '+crLost+' / <span class="'+BashClass+'">'+crBash+'</span>'+
				'</li>'+
				'<li class="name taLastBattles">'+
				LastBattles+
				'</li>';
			}
		}
	};
	
TriumphalArch.Insert_CombatReports_Header = function()
	{
	var Operations = this.DOM.Get_Nodes("//table[contains(@class,'operations')]");
	if (Operations != null)
		{
		var node = Operations.snapshotItem(0);
		var HeaderSubject = '';
		if (this.Ikariam.CombatReports_StartValue() == 0)
			{
			HeaderSubject = this.DB.Get_Text('BattlesXXXhrs',24);
			}
		else
			{
			HeaderSubject = this.DB.Get_Text('Battles');
			}
		node.innerHTML = 
				'<thead class="taHeader"><tr>\n' + 
				'<th class="empty"></th>\n' +
				'<th class="empty"></th>\n' +
				'<th class="date empty"></th>\n' +
				'<th class="subject">'+HeaderSubject+'</th>\n' +
				'<th class="empty"></th>\n' +
				'<th nowrap colspan=3 title="'+this.DB.Get_Text('BattlesWLB')+'">'+this.DB.Get_Text('WonLostBash')+'</th>\n' +
				'<th nowrap class="taLoots">'+this.DB.Get_Text('Loots')+'</th>\n' +
				'<th class="empty"></th>\n' +
				'</tr></thead>'+
				node.innerHTML;
		}
	};
	
TriumphalArch.Insert_Next_CombatReports = function(numMax)
	{
	if (numMax == undefined) numMax = 10;
	
	var Subjects = this.DOM.Get_Nodes("//table[contains(@class,'operations')]/tbody/tr/td[contains(@class,'subject')]");
	if (Subjects != null)
		{
		var lastSubject = Subjects.snapshotItem(Subjects.snapshotLength - 1);
		var lastCR = lastSubject.parentNode;
		var Operations = this.DOM.Get_First_Node("//table[contains(@class,'operations')]/tbody");
		
		var bashTimeLimit = new Date();
		bashTimeLimit.setTime(bashTimeLimit.getTime() -
					this.Ikariam.Bash_Delay() -
					(bashTimeLimit.getTimezoneOffset()*60*1000));
		
		// Create ordered (by date) array of combat report's indexes under bash delay
		var CRs = this.DB.Get_TimeOrdered_CombatReportsIds(bashTimeLimit);
		
		var NumAdded = 0;
		for (var j = Subjects.snapshotLength; j < CRs.length; j++)
			{
			if (NumAdded >= numMax) break;
			
			var CombatId = CRs[j];
			var CombatTime = new Date(this.DB.CombatReports[CombatId].time);
			
			// this.Log.Add("Insert combat report: "+CombatId);
			var tr = document.createElement('tr');
			tr.setAttribute("combatid", CombatId);
			
			var td = document.createElement('td');
			td.setAttribute("class", "empty");
			tr.appendChild(td);
			
			// Checkbox
			var td = document.createElement('td');
			td.innerHTML = '<input type="checkbox" name="combatId[' + CombatId + ']" value="1" />';
			tr.appendChild(td);
			
			// Date
			var td = document.createElement('td');
			td.setAttribute("class", "date");
			td.innerHTML = this.Ikariam.Get_CombatReport_DateTime(CombatTime);
			tr.appendChild(td);
			
			// Title
			var td = document.createElement('td');
			var SubjectClass = "subject";
			if (this.DB.CombatReports[CombatId].new == true) SubjectClass += ' new';
			if (this.DB.CombatReports[CombatId].won == true)
				{
				SubjectClass += ' won';
				}
			else if (this.DB.CombatReports[CombatId].lost == true)
				{
				SubjectClass += ' lost';
				}
			else if (this.DB.CombatReports[CombatId].running == true)
				{
				SubjectClass += ' running';
				}
			td.setAttribute("class", SubjectClass);
			td.innerHTML = '<a href="/index.php?view=militaryAdvisorReportView&combatId=' +
						CombatId +
						'" title="' + this.DB.CombatReports[CombatId].title + '">' +
						this.DB.CombatReports[CombatId].title +
						'</a>';
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.setAttribute("class", "empty");
			tr.appendChild(td);
			
			lastCR = Operations.insertBefore(tr, lastCR.nextSibling);
			NumAdded++;
			}
		
		// Footer
		var taNextCR = document.getElementById("taNextCR");
		if (taNextCR == null)
			{
			var tr = document.createElement('tr');
			tr.setAttribute("class", 'taNextCR');
			
			var td = document.createElement('td');
			td.setAttribute("class", "empty");
			td.setAttribute("colspan", "3");
			tr.appendChild(td);
			
			var taNextCR = document.createElement('td');
			taNextCR.id = 'taNextCR';
			taNextCR.innerHTML = '<span id="taRangeNextCR"></span> | <a id="taButtonNextCR" href="javascript://void(0);"></a>'+
								'<br/>'+
								this.DB.Get_Text('UnConfirmedCR','*');
			tr.appendChild(taNextCR);
			
			var td = document.createElement('td');
			td.setAttribute("class", "empty");
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.id = 'taSumWon';
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.id = 'taSumLost';
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.id = 'taSumBash';
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.id = 'taSumLoots';
			tr.appendChild(td);
			
			var td = document.createElement('td');
			td.setAttribute("class", "empty");
			tr.appendChild(td);
			
			Operations.insertBefore(tr, lastCR.nextSibling);
			}
		
		if (NumAdded < (CRs.length - Subjects.snapshotLength))
			{
			var taRangeNextCR = document.getElementById("taRangeNextCR");
			taRangeNextCR.innerHTML = '1-'+(NumAdded+Subjects.snapshotLength)+' / '+(CRs.length);
			var taButtonNextCR = document.getElementById("taButtonNextCR");
			taButtonNextCR.innerHTML = this.DB.Get_Text('NextXXXCR', (CRs.length - Subjects.snapshotLength - NumAdded));
			}
		else
			{
			taNextCR.innerHTML = '1-'+(NumAdded+Subjects.snapshotLength)+' / '+Math.max(CRs.length,(NumAdded+Subjects.snapshotLength))+' | '+this.DB.Get_Text('NoMoreCR')+
								'<br/>'+
								this.DB.Get_Text('UnConfirmedCR','*');
			}
		
		}
	
	this.Insert_CombatReports_Stats();
	};
	
TriumphalArch.Insert_CombatReports_Stats = function()
	{
	//this.Log.Add("Insert stats about battles");
	
	var Subjects = this.DOM.Get_Nodes("//table[contains(@class,'operations')]/tbody/tr/td[contains(@class,'subject')]");
	if (Subjects != null)
		{
		var sumWon = 0;
		var sumLost = 0;
		var sumLoots	 = {};
		sumLoots.wood	 = 0;
		sumLoots.wine	 = 0;
		sumLoots.marble	 = 0;
		sumLoots.glass	 = 0;
		sumLoots.sulfur	 = 0;
		
		var setAlt = false;
		for (var i=0; i < Subjects.snapshotLength; i++)
			{
			var Subject = Subjects.snapshotItem(i);
			var tr = Subjects.snapshotItem(i).parentNode;
			if (setAlt == true)
				{
				this.DOM.Add_ClassName(tr, 'alt');
				setAlt = false;
				}
			else
				{
				this.DOM.Remove_ClassName(tr, 'alt');
				setAlt = true;
				}
			
			var CombatId = tr.getAttribute('combatid');
			if ((CombatId == null) || (CombatId == '') || (CombatId == 0) || (this.DB.CombatReports[CombatId] == undefined)) continue;
			
			if (this.DB.CombatReports[CombatId].won == true)
				{
				sumWon++;
				}
			else if (this.DB.CombatReports[CombatId].lost == true)
				{
				sumLost++;
				}
				
			var crLoot = '';
			if ((this.DB.CombatReports[CombatId].own == true) || (this.DB.CombatReports[CombatId].isAttacked == true))
				{
				// Ignore
				}
			else if (this.DB.CombatReports[CombatId].loot != undefined)
				{
				var ResType;
				for (ResType in this.DB.CombatReports[CombatId].loot)
					{
					var ResValue = this.DB.CombatReports[CombatId].loot[ResType];
					var ResIcon = '<img src="'+this.Ikariam.Get_ResourceIcon_ImgSrc(ResType)+'"'+
							' title="'+this.Str.FormatBigNumber(ResValue)+' '+this.DB.Get_Text(ResType)+'"/>';
							
					crLoot += ResIcon;
					if (ResValue > 500) crLoot += ResIcon;
					if (ResValue > 2000) crLoot += ResIcon;
					if (ResValue > 5000) crLoot += ResIcon;
					if (ResValue > 10000) crLoot += ResIcon;
					
					sumLoots[ResType] = sumLoots[ResType] + parseInt(ResValue);
					}
				}
			
			if (this.DOM.Has_ClassName(tr, 'taStats') == false)
				{
				var tds = tr.getElementsByTagName("td");
				var alinks = tds[3].getElementsByTagName("a");
				if (this.DB.CombatReports[CombatId].confirmed != true)
					{
					alinks[0].innerHTML = this.Str.Trim(alinks[0].innerHTML) + '<sup class="taUnConfirmed">*</sup>';
					}
				else if (this.DB.CombatReports[CombatId].own == true)
					{
					
					}
				else if ((this.DB.CombatReports[CombatId].tplayername != undefined) && (this.DB.CombatReports[CombatId].tplayername != ''))
					{
					alinks[0].innerHTML = this.Str.Trim(alinks[0].innerHTML) + ' ('+this.DB.CombatReports[CombatId].tplayername+')';
					}
				
				if (this.DB.CombatReports[CombatId].navy == true)
					{
					this.DOM.Add_ClassName(tr, 'taNavy');
					}
					
				var cityName = this.DB.CombatReports[CombatId].tcityname;
				var cityId = this.DB.CombatReports[CombatId].tcityid;
				
				var crWon = '?';
				var crLost = '?';
				var crBash = '?';
				var CityStats = this.DB.Get_CityStats(cityId, cityName);
				if (CityStats != null)
					{
					crWon = CityStats.won;
					crLost = CityStats.lost;
					if ((this.DB.CombatReports[CombatId].own == true) || (this.DB.CombatReports[CombatId].isAttacked == true))
						{
						crBash = '-';
						}
					else crBash = CityStats.bash;
					}
					
				var BashClass = "taBash";
				if ((crBash == '?') || (crBash == '-'))
					{
					// No more class
					}
				else if (crBash >= 6)
					{
					BashClass += " taRed";
					}
				else if (crBash >= 5)
					{
					BashClass += " taOrange";
					}
				else
					{
					BashClass += " taGreen";
					}
				
				tr.innerHTML = tr.innerHTML +
						'<td class="taWon" nowrap>'+
							crWon+
							'&nbsp;</td>\n' +
						'<td class="taLost" nowrap>'+
							crLost+
							'&nbsp;</td>\n' +
						'<td class="'+BashClass+'" nowrap>'+
							crBash+
							'&nbsp;</td>\n' +
						'<td class="taLoot" nowrap>'+crLoot+'</td>\n'+
						'<td class="empty"></td>\n';
						
				this.DOM.Add_ClassName(tr, 'taStats');
				}
			}
		
		var taSumWon = document.getElementById("taSumWon");
		if (taSumWon != null)
			{
			taSumWon.innerHTML = sumWon+'&nbsp;';
			}
		
		var taSumLost = document.getElementById("taSumLost");
		if (taSumLost != null)
			{
			taSumLost.innerHTML = sumLost+'&nbsp;';
			}
			
		var taSumLoots = document.getElementById("taSumLoots");
		if (taSumLoots != null)
			{
			var sumLootsHTML = '';
			var ResType;
			for (ResType in sumLoots)
				{
				var ResIcon = '<img class="'+ResType+'" src="'+this.Ikariam.Get_ResourceIcon_ImgSrc(ResType)+'" />';
				sumLootsHTML += '<span title="'+this.Str.FormatBigNumber(sumLoots[ResType])+' '+this.DB.Get_Text(ResType)+'">'+this.Str.FormatBigNumber(sumLoots[ResType])+' '+ResIcon+'</span><br>';
				}
			taSumLoots.innerHTML = sumLootsHTML;
			}
		}
	};
	
TriumphalArch.Set_Common_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	.taGreen { color: green; }
	.taRed { color: red; font-weight: bold;}
	.taOrange { color: orange; font-weight: bold;}
	
	p.taFooter { margin-bottom: 10px; font-size: 11px;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};
	
TriumphalArch.Set_Island_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	li.taStats {clear: both}
	li.taStats .textLabel {width: auto !important; min-width: 80px; }
	li.taLastBattles .textLabel {width: auto !important;}
	li.taLastBattles ul { clear: both;}
	li.taLastBattles ul li { font-weight: normal; margin: 0px !important; line-height: 15px !important; height: 15px; padding-top: 3px; padding-bottom: 3px; padding-left: 33px !important; padding-right: 10px !important; border-bottom: 1px solid #F6EBBC;}
	li.taLastBattles ul li { background-image: url(skin/characters/military/x40_y40/y40_swordsman_faceright.gif); background-position: -3px -4px; background-repeat: no-repeat; }
	li.taLastBattles ul li.navy { background-image: url(skin/characters/fleet/40x40/ship_ballista_r_40x40.gif);background-position: -3px -7px;}
	li.taLastBattles ul li.won a {color: green;}
	li.taLastBattles ul li.lost a {color: red;}
	li.taLastBattles ul li.new a {font-weight: bold;}
	li.taLastBattles ul li img {max-height: 11px; margin: 0px !important; margin-top: 4px !important; margin-right: -8px !important; display: inline !important;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};
	
TriumphalArch.Set_CombatReports_Styles = function()
	{
	// define CSS 
	var default_style = <><![CDATA[
	table.operations {margin-bottom: 0px !important;}
	table.operations {background-color: #FAEAC6;}
	
	table.operations thead tr th.subject {text-align: left;}
	table.operations thead tr th.taLoots {text-align: center; border-width: 1px; border-color: #FDF1D4; border-left-style: solid;}
	
	table.operations tbody tr.taStats {background-color: #FDF7DD;}
	table.operations tbody tr.alt {background-color: #FDF1D4;}
	
	table.operations tbody tr.taStats td.subject { background-image: url(skin/characters/military/x40_y40/y40_swordsman_faceright.gif); background-position: 0px -4px; background-repeat: no-repeat; padding-left: 40px !important; border-bottom: 1px solid #FDF1D4;}
	table.operations tbody tr.taNavy td.subject { background-image: url(skin/characters/fleet/40x40/ship_ballista_r_40x40.gif);background-position: 0px -6px;}
	table.operations tbody tr.taStats td.running { background-image: url(skin/advisors/military/bang_soldier.gif); background-position: 0px -4px;}
	table.operations tbody tr.taNavy td.running { background-image: url(skin/advisors/military/bang_ship.gif);background-position: 0px -1px;}
	
	table.operations tbody tr.taStats td.taWon,
	table.operations tbody tr.taStats td.taLost,
	table.operations tbody tr.taStats td.taBash {text-align: right; }
	table.operations tbody tr.taStats td.taLost,
	table.operations tbody tr.taStats td.taBash {border-width: 1px; border-color: #FAEAC6; }
	table.operations tbody tr.taStats td.taLost { border-left-style: solid; border-right-style: solid;}
	table.operations tbody tr.taStats td.taBash { border-right-style: solid;}
	table.operations tbody tr.taStats td.taLoot {text-align: left; padding-right: 10px !important; }
	table.operations tbody tr.taStats td.taLoot img {max-height: 13px; margin-right: -8px;}
	
	table.operations td.empty { width: auto !important; padding: 0px !important;}
	
	#taNextCR { color: #CB9B6A; font-size: 11px;}
	#taNextCR a { font-weight: bold;}
	#taSumWon,
	#taSumLost,
	#taSumBash {color: #CB9B6A;text-align: right; border-width: 1px; border-color: #FDF1D4; border-right-style: solid; }
	#taSumLoots {text-align: right; color: #CB9B6A; font-size: 9px;}
	#taSumLoots img { min-width: 13px; max-height: 9px;}
	]]></>.toXMLString();
	GM_addStyle(default_style);
	};
	


TriumphalArch.Insert_Footer = function()
	{
	var formElt = document.getElementById('mainview');
	formElt.innerHTML = formElt.innerHTML + '<p class="taFooter" style="text-align: right;"> <a target="_blank" href="'+this.HomePage+'"><b></b></a> (<i>v. '+this.Version+'</i>)</p>';

	if (this.DB.hasFilters() != true)
		{
		formElt.innerHTML = formElt.innerHTML + '<p class="taFooter" style="text-align: left;"><span style="color: red;">Not support <b>'+this.Ikariam.Host()+'</b> with <b>'+this.Ikariam.Language()+'</b> language</span> ; some features disabled. <i>Check updates or help us</i>...</p>';
		}
	};
	
TriumphalArch.DB =
	{
	_Parent: null,
	Prefix:				 null,
	Filters:			 null,
	_hasFilters:		 false,
	Texts:				 null,
	_hasTexts:			 false,
	CombatReports:		 {},
	Stats:				 {},
	Cities:				 {},
	CitiesNames:		 {},
	Options:			 {}
	};
	
TriumphalArch.DB.Init = function(parent, host)
	{
	this._Parent = parent;
	if (host == undefined) host = this._Parent.Ikariam.Host();
	
	var prefix = host;
	prefix = prefix.replace('.ikariam.', '-');
	prefix = prefix.replace('.', '-');
	this.Prefix = prefix;
	};

TriumphalArch.DB.Load_Texts = function(lang)
	{
	var Texts = {};
	if (lang == undefined) lang = this._Parent.Ikariam.Language();
	
	/*
	%1, %2,  and %3 are magical keywords to insert data into localized texts
	*/

	// ikariam.org
	Texts['en']					 = {};
	Texts['en'].DIR				 = ''; // Leave blank or set rtl for Right-to-Left languages
	Texts['en'].BattleFor		 = "Battle for %1"; // %1=city name
	Texts['en'].SeaBattleNear	 = "Sea battle near %1"; // %1=city name
	Texts['en'].Battles			 = "Battles";
	Texts['en'].BattlesXXXhrs	 = "Battles while last %1hrs"; // %1=elapsed hours
	Texts['en'].WonLostBash		 = "won / lost / bash"; // Set short-names if too long
	Texts['en'].NoMoreCR		 = "no more recents combat reports.";
	Texts['en'].NextXXXCR		 = "next %1 recents combat reports..."; // %1=number
	Texts['en'].BattlesWLB		 = "Battles: Won / Lost / Bash";
	Texts['en'].WLB				 = "W. / L. / Bash"; // Set abbreviate letters
	Texts['en'].UnConfirmedCR	 = "(%1) combat report not confirmed."; // %1=asterisk symbol
	Texts['en'].Loots			 = "Loots";
	Texts['en'].wood			 = "wood";
	Texts['en'].wine			 = "wine";
	Texts['en'].marble			 = "marble";
	Texts['en'].glass			 = "crystal";
	Texts['en'].sulfur			 = "sulphur";
	
	// ikariam.de by simon.thesorcerer
	Texts['de']					 = {};
	Texts['de'].BattleFor		 = "Schlacht um %1";
	Texts['de'].SeaBattleNear	 = "Seekampf vor %1";
	Texts['de'].Battles			 = "Schlachten";
	Texts['de'].BattlesXXXhrs	 = "Schlachten innerhalb der letzten %1 Stunden";
	Texts['de'].WonLostBash		 = "Gewonnen / Verloren / Bash";
	Texts['de'].NoMoreCR		 = "Keine weiteren Kampfberichte in den letzten 24 Stunden";
	Texts['de'].NextXXXCR		 = "Noch %1 weitere Kampfberichte in den letzten 24 Stunden...";
	Texts['de'].BattlesWLB		 = "Schlachten: Gewonnen / Verloren / Bash";
	Texts['de'].WLB				 = "G. / V. / Bash";
	Texts['de'].UnConfirmedCR	 = "(%1) Kampfbericht nicht bestätigt.";
	Texts['de'].Loots			 = "Beute";
	Texts['de'].wood			 = "Baumaterial";
	Texts['de'].wine			 = "Wein";
	Texts['de'].marble			 = "Marmor";
	Texts['de'].glass			 = "Kristallglas";
	Texts['de'].sulfur			 = "Schwefel";
	
	// ikariam.es, ar.ikariam.com by 0sama
	Texts['es']					 = {};
	Texts['es'].BattleFor		 = "Batalla en %1";
	Texts['es'].SeaBattleNear	 = "Batalla marítima frente a %1";
	Texts['es'].Battles			 = "Batallas";
	Texts['es'].BattlesXXXhrs	 = "Batallas en las últimas %1hrs";
	Texts['es'].WonLostBash		 = "Gan / Perd / Empa";
	Texts['es'].NoMoreCR		 = "No hay más informes de guerra recientes";
	Texts['es'].NextXXXCR		 = "Siguientes %1 informes de guerra...";
	Texts['es'].BattlesWLB		 = "Batallas: Gan / Perd / Empa";
	Texts['es'].WLB				 = "G. / P. / Empa";
	Texts['es'].UnConfirmedCR	 = "(%1) informes de guerra no confirmados.";
	Texts['es'].Loots			 = "Botín";
	
	// ikariam.fr
	Texts['fr']					 = {};
	Texts['fr'].BattleFor		 = "Bataille de %1";
	Texts['fr'].SeaBattleNear	 = "Bataille navale de %1";
	Texts['fr'].Battles			 = "Batailles";
	Texts['fr'].BattlesXXXhrs	 = "Dernières batailles depuis %1h";
	Texts['fr'].WonLostBash		 = "vict. / déf. / bash";
	Texts['fr'].NoMoreCR		 = "pas d'autres rapports de combat récents.";
	Texts['fr'].NextXXXCR		 = "%1 autre rapports de combat récents...";
	Texts['fr'].BattlesWLB		 = "Batailles: Victoires / Défaites / Bash";
	Texts['fr'].WLB				 = "V. / D. / Bash";
	Texts['fr'].UnConfirmedCR	 = "(%1) rapport de combat non-confirmé."; 
	Texts['fr'].Loots			 = "Butins";
	Texts['fr'].wood			 = "bois";
	Texts['fr'].wine			 = "vin";
	Texts['fr'].marble			 = "marbre";
	Texts['fr'].glass			 = "cristal";
	Texts['fr'].sulfur			 = "soufre";

	// ae.ikariam.com
	Texts['ae']					 = {};
	Texts['ae'].DIR				 = 'rtl';
	Texts['ae'].WonLostBash		 = "bash / lost / won"; 
	Texts['ae'].BattlesWLB		 = "Battles: Bash / Lost / Won";
	Texts['ae'].WLB				 = "Bash / L. / W."; 
	
	// ikariam.it by maumau321
	Texts['it']					 = {};
	Texts['it'].BattleFor		 = "Battaglia per %1";
	Texts['it'].SeaBattleNear	 = "Battaglia navale vicino a %1";
	Texts['it'].Battles			 = "Battaglie";
	Texts['it'].BattlesXXXhrs	 = "Battaglie nelle ultime %1 ore";
	Texts['it'].WonLostBash		 = "vinte / perse / bash";
	Texts['it'].NoMoreCR		 = "nessun combattimento recente.";
	Texts['it'].NextXXXCR		 = "prossimi %1 report di combattimento...";
	Texts['it'].BattlesWLB		 = "Battaglie: Vinte / Perse / Bash";
	Texts['it'].WLB				 = "V. / P. / Bash";

	// ikariam.nl by Londo
	Texts['nl']					 = {};
	Texts['nl'].BattleFor		 = "Gevecht voor %1";
	Texts['nl'].SeaBattleNear	 = "Zeegevecht bij %1";
	Texts['nl'].Battles			 = "Gevechten";
	Texts['nl'].BattlesXXXhrs	 = "Gevechten van de laaste %1 uur";
	Texts['nl'].WonLostBash		 = "win. / verl. / herh.";
	Texts['nl'].BattlesWLB		 = "Gevechten: Winnaar / Verliezer / Herhalingen";
	Texts['nl'].WLB				 = "W. / V. / Herh.";
	
	// ikariam.pl by Sihulagen
	Texts['pl']					 = {};
	Texts['pl'].BattleFor		 = "Bitwa pod %1";
	Texts['pl'].SeaBattleNear	 = "Bitwa morska w pobliżu %1"; 
	Texts['pl'].Battles			 = "Bitwa";
	Texts['pl'].BattlesXXXhrs	 = "Bitwy z ostatnich %1hrs"; 
	Texts['pl'].WonLostBash		 = "wygrane / przegrane / bash";
	Texts['pl'].NoMoreCR		 = "Brak więcej raportów.";
	Texts['pl'].NextXXXCR		 = "next %1 najnowsze raporty wojenne..."; 
	Texts['pl'].BattlesWLB		 = "Bitwa: Wygrane / Przegrane / Bash";
	Texts['pl'].WLB				 = "W. / P. / Bash";
	Texts['pl'].UnConfirmedCR	 = "(%1) Niepotwierdzone raporty."; 
	Texts['pl'].Loots			 = "Łupy";
	
	// ikariam.com.br by  RaphaelPH    
	Texts['br']					 = {};
	Texts['br'].DIR				 = '';
	Texts['br'].BattleFor		 = "Batalha por #%1";
	Texts['br'].SeaBattleNear	 = "Batalha no mar perto de %1";
	Texts['br'].Battles			 = "Batalhas";
	Texts['br'].BattlesXXXhrs	 = "Batalhas nas últimas %1hrs";
	Texts['br'].WonLostBash		 = "Vit. / Der. / Bash";
	Texts['br'].NoMoreCR		 = "Sem relatório de combate recente.";
	Texts['br'].NextXXXCR		 = "Próximo(s) %1 relatório(s) de combate recente...";
	Texts['br'].BattlesWLB		 = "Batalhas: Vit. / Der. / Bash";
	Texts['br'].WLB				 = "V. / D. / Bash";
	Texts['br'].UnConfirmedCR	 = "(%1) relatório(s) de combate não confirmado(s).";
	Texts['br'].Loots			 = "Saques";
	Texts['br'].wood			 = "madeira";
	Texts['br'].wine			 = "vinho";
	Texts['br'].marble			 = "mármore";
	Texts['br'].glass			 = "cristal";
	Texts['br'].sulfur			 = "enxofre";
	
	// ikariam.com.pt
	Texts['pt']					 = {};
	Texts['pt'].BattleFor		 = "Batalha por %1";
	Texts['pt'].SeaBattleNear	 = "Batalha no mar perto de %1";
	Texts['pt'].Battles			 = "Batalhas";
	Texts['pt'].BattlesXXXhrs	 = "Batalhas nas últimas %1hrs";
	Texts['pt'].WonLostBash		 = "Vit. / Der. / Bash"; 
	Texts['pt'].NoMoreCR		 = "Sem relatório(s) de combate recente.";
	Texts['pt'].NextXXXCR		 = "Próximo(s) %1 relatório(s) de combate recente...";
	Texts['pt'].BattlesWLB		 = "Batalhas: Vit / Der / Sur";
	Texts['pt'].WLB				 = "V. / D. / Bash"; 
	Texts['pt'].UnConfirmedCR	 = "(%1) relatório(s) de combate não confirmado(s).";
	Texts['pt'].Loots			 = "Saques";
	Texts['pt'].wood			 = "madeira";
	Texts['pt'].wine			 = "vinho";
	Texts['pt'].marble			 = "mármore";
	Texts['pt'].glass			 = "cristal";
	Texts['pt'].sulfur			 = "enxofre";
	
	// ikariam.ru by Гуляка
	Texts['ru']					 = {}; 
	Texts['ru'].BattleFor		 = "Битва за %1"; 
	Texts['ru'].SeaBattleNear	 = "Морское сражение под %1";
	
	// ikariam.vn by Minh Truong & fansipang
	Texts['vn']					 = {};
	Texts['vn'].BattleFor		 = "Trận chiến tại %1";
	Texts['vn'].SeaBattleNear	 = "Thủy chiến tại %1";
	Texts['vn'].Battles			 = "Trận chiến";
	Texts['vn'].BattlesXXXhrs	 = "Các trận chiến trong vòng %1 giờ";
	Texts['vn'].WonLostBash		 = "Thắng / Thua / Bash";
	Texts['vn'].NoMoreCR		 = "không còn trận chiến nào trong ngày.";
	Texts['vn'].NextXXXCR		 = "%1 trận chiến kế tiếp...";
	Texts['vn'].BattlesWLB		 = "Các trận chiến: Thắng / Thua / Bash";
	Texts['vn'].WLB				 = "Thắng/Thua/Bash"; 
	Texts['vn'].UnConfirmedCR	 = "(%1) thông báo trận chiến chưa được xác nhận.";
	Texts['vn'].Loots			 = "Chiến lợi phẩm";
	Texts['vn'].wood			 = "Gỗ";
	Texts['vn'].wine			 = "Nho";
	Texts['vn'].marble			 = "Cẩm thạch";
	Texts['vn'].glass			 = "Thủy tinh";
	Texts['vn'].sulfur			 = "Lưu huỳnh";
	
	// ikariam.ro by xiss
	Texts['ro']					 = {};	
	Texts['ro'].BattleFor		 = "Batalie pentru %1";
	Texts['ro'].SeaBattleNear	 = "Lupta pe mare pe aproape %1";
	Texts['ro'].Battles			 = "Lupte";
	Texts['ro'].BattlesXXXhrs	 = "Lupte in ultimele %1ore";
	Texts['ro'].WonLostBash		 = "Victorii / Infrangeri / bash";
	Texts['ro'].NoMoreCR		 = "nu mai sunt rapoarte recente.";
	Texts['ro'].NextXXXCR		 = "urmatoarele %1 rapoarte de lupta recente...";
	Texts['ro'].BattlesWLB		 = "Lupte: Victorii / Infrangeri / Bash";
	Texts['ro'].WLB				 = "V. / I. / Bash";
	Texts['ro'].UnConfirmedCR	 = "(%1) raportul nu a fost confirmat.";
	Texts['ro'].Loots			 = "Bunuri";
	Texts['ro'].wood			 = "lemn";
	Texts['ro'].wine			 = "vin";
	Texts['ro'].marble			 = "marmura";
	Texts['ro'].glass			 = "cristal";
	Texts['ro'].sulfur			 = "sulf";
	
	// ikariam.bg by samkijot
	Texts['bg']					 = {};
	Texts['bg'].BattleFor		 = "Битка за %1";
	Texts['bg'].SeaBattleNear	 = "Морска битка за %1";
	Texts['bg'].Battles			 = "Битки";
	Texts['bg'].BattlesXXXhrs	 = "За последните %1 часа";
	Texts['bg'].WonLostBash		 = "победа / загуба / башинг";
	Texts['bg'].NoMoreCR		 = "Няма нови доклади.";
	Texts['bg'].NextXXXCR		 = "Следващ %1 доклад ...";
	Texts['bg'].BattlesWLB		 = "Битки: Победа / Загуба / Башинг";
	Texts['bg'].WLB				 = "П. / З. / Башинг";
	Texts['bg'].UnConfirmedCR	 = "(%1) непотвърден доклад.";
	Texts['bg'].Loots			 = "Заграбено"
	Texts['bg'].wood			 = "Дърво";
	Texts['bg'].wine			 = "Вино";
	Texts['bg'].marble			 = "Мрамор";
	Texts['bg'].glass			 = "Кристал";
	Texts['bg'].sulfur			 = "Сяра";
	
	// ikariam.gr by panoz
	Texts['gr']					 = {};
	Texts['gr'].BattleFor		 = "Μάχη για %1";
	Texts['gr'].SeaBattleNear	 = "Ναυμαχία κοντά στην %1";
	
	// ikariam.rs by shobra
	Texts['rs']					 = {};
	Texts['rs'].DIR				 = '';
	Texts['rs'].BattleFor		 = "Борба за %1";
	Texts['rs'].SeaBattleNear	 = "Поморска битка поред %1";
	Texts['rs'].Battles			 = "Борбе";
	Texts['rs'].BattlesXXXhrs	 = "Борбе током последњих %1ч";
	Texts['rs'].WonLostBash		 = "доб. / изг. / баш.";
	Texts['rs'].NoMoreCR		 = "Нема више недавних извештаја.";
	Texts['rs'].NextXXXCR		 = "Следећих %1 недавних извештаја...";
	Texts['rs'].BattlesWLB		 = "Борбе: Добијене / Изгубљене / Башинг";
	Texts['rs'].WLB				 = "Д. / И. / Башинг";
	Texts['rs'].UnConfirmedCR	 = "(%1) извештај није потврђен.";
	Texts['rs'].Loots			 = "Плен";
	Texts['rs'].wood			 = "дрво";
	Texts['rs'].wine			 = "вино";
	Texts['rs'].marble			 = "мермер";
	Texts['rs'].glass			 = "кристал";
	Texts['rs'].sulfur			 = "сумпор";
	
	// ikariam.net by  c0sm0    
	Texts['tr']					 = {};
	Texts['tr'].DIR				 = '';
	Texts['tr'].BattleFor		 = "%1 şehri için savaş";
	Texts['tr'].SeaBattleNear	 = "%1 şehri sularında deniz muharebesi";
	Texts['tr'].Battles			 = "Savaşlar";
	Texts['tr'].BattlesXXXhrs	 = "Son %1 saatin savaş raporları";
	Texts['tr'].WonLostBash		 = "Zafer / Yenlg / Sefer";
	Texts['tr'].NoMoreCR		 = "başka savaş raporu yok.";
	Texts['tr'].NextXXXCR		 = "sıradaki %1 savaş raporu...";
	Texts['tr'].BattlesWLB		 = "Savaşlar: Zafer / Yenilgi / Sefer";
	Texts['tr'].WLB				 = "Z. / Y. / Sefer";
	Texts['tr'].UnConfirmedCR	 = "(%1) onaylanmamış savaş raporları.";
	Texts['tr'].Loots			 = "ganimet";
	Texts['tr'].wood			 = "odun";
	Texts['tr'].wine			 = "üzüm";
	Texts['tr'].marble			 = "mermer";
	Texts['tr'].glass			 = "kristal";
	Texts['tr'].sulfur			 = "sülfür";
	
	// ikariam.hu by Sracz66 
	Texts['hu']					 = {};
	Texts['hu'].BattleFor		 = "Csata ezért: %1";
	Texts['hu'].SeaBattleNear	 = "Tengeri csata: %1";
	Texts['hu'].Battles			 = "Csaták";
	Texts['hu'].BattlesXXXhrs	 = "Csaták az elmúlt %1 órában";
	Texts['hu'].WonLostBash		 = "gy. / v. / Z!"; 
	Texts['hu'].NoMoreCR		 = "Nincs több friss jelentés.";
	Texts['hu'].NextXXXCR		 = "Következő %1 legfrissebb jelentés...";
	Texts['hu'].BattlesWLB		 = "Csaták: Gy. / V. / Zúzás"; 
	Texts['hu'].WLB				 = "Gy. / V. / Zúzás"; 
	Texts['hu'].UnConfirmedCR	 = "(%1) olvasatlan jelentés."; 
	Texts['hu'].Loots			 = "Fosztások";
	Texts['hu'].wood			 = "fa";
	Texts['hu'].wine			 = "bor";
	Texts['hu'].marble			 = "márvány";
	Texts['hu'].glass			 = "kristály";
	Texts['hu'].sulfur			 = "kén";
	
	// ikariam.tw by robertliu
	Texts['tw']					 = {};
	Texts['tw'].DIR				 = ''; 
	Texts['tw'].BattleFor		 = "%1 之戰"; 
	Texts['tw'].SeaBattleNear	 = "%1 海域的海戰"; 
	Texts['tw'].Battles			 = "戰鬥";
	Texts['tw'].BattlesXXXhrs	 = "最近 %1 小時的戰鬥"; 
	Texts['tw'].WonLostBash		 = "勝利 / 失敗 / 濫攻";
	Texts['tw'].NoMoreCR		 = "沒有更多戰鬥報告.";
	Texts['tw'].NextXXXCR		 = "下 %1 個戰鬥報告..."; 
	Texts['tw'].BattlesWLB		 = "戰鬥: 勝利 / 失敗 / 濫攻";
	Texts['tw'].WLB				 = "勝 / 負 / 濫攻"; 
	Texts['tw'].UnConfirmedCR	 = "(%1) 戰鬥報告尚未確認."; 
	Texts['tw'].Loots			 = "戰利品";
	Texts['tw'].wood			 = "木材";
	Texts['tw'].wine			 = "葡萄酒";
	Texts['tw'].marble			 = "大理石";
	Texts['tw'].glass			 = "水晶";
	Texts['tw'].sulfur			 = "硫磺";

	// ikariam.com.ua by dizzy
	Texts['ua']					 = {};
	Texts['ua'].BattleFor		 = "Битва за %1";
	Texts['ua'].SeaBattleNear	 = "Морська битва під %1";
	Texts['ua'].Battles			 = "Битва";
	Texts['ua'].BattlesXXXhrs	 = "Битви з останніх %1 год";
	Texts['ua'].WonLostBash		 = "виграні / програні / баш";
	Texts['ua'].NoMoreCR		 = "Немає більше звітів.";
	Texts['ua'].NextXXXCR		 = "Наступні %1 найновші військові рапорти...";
	Texts['ua'].BattlesWLB		 = "Битви: Виграні / Програні / Баш";
	Texts['ua'].WLB				 = "В. / П. / Баш";
	Texts['ua'].UnConfirmedCR	 = "(%1) Непідтверджені звіти.";
	Texts['ua'].Loots			 = "Награбовано"
	Texts['ua'].wood			 = "Дерево";
	Texts['ua'].wine			 = "Вино";
	Texts['ua'].marble			 = "Мармур";
	Texts['ua'].glass			 = "Кришталь";
	Texts['ua'].sulfur			 = "Сірка"; 

	// ba.ikariam.com by Bianced
	Texts['yu']					 = {};
	Texts['yu'].DIR				 = '';
	Texts['yu'].BattleFor		 = "Bitka za %1";
	Texts['yu'].SeaBattleNear	 = "Pomorska bitka za %1";
	Texts['yu'].Battles			 = "Bitke";
	Texts['yu'].BattlesXXXhrs	 = "Bitke u zadnjih %1sata";
	Texts['yu'].WonLostBash		 = "dob. / izg. / bash.";
	Texts['yu'].NoMoreCR		 = "Nema više nedavnih izvještaja.";
	Texts['yu'].NextXXXCR		 = "Slijedećih %1 nedavnih izvještaja...";
	Texts['yu'].BattlesWLB		 = "Borbe: Dobivene / Izgubljene / Bashin";
	Texts['yu'].WLB				 = "D. / I. / Bashing";
	Texts['yu'].UnConfirmedCR	 = "(%1) izvještaj nije potvrđen.";
	Texts['yu'].Loots			 = "Plijen";
	Texts['yu'].wood			 = "drvo";
	Texts['yu'].wine			 = "vino";
	Texts['yu'].marble			 = "mramor";
	Texts['yu'].glass			 = "kristal";
	Texts['yu'].sulfur			 = "sumpor";

	/* Aliased languages */
	
	// ikariam.com.br
	//Texts['br'] = Texts['pt']; // Some differences
	
	// Espanol (not sure)
	Texts['ar'] = Texts['es'];
	Texts['mx'] = Texts['es'];
	Texts['cl'] = Texts['es'];
	Texts['co'] = Texts['es'];
	Texts['ve'] = Texts['es'];
	Texts['pe'] = Texts['es'];

	// ikariam.com
	Texts['us'] = Texts['en'];
	
	if ((lang != undefined) && (lang != '') && (Texts[lang] != undefined))
		{
		this.Texts = Texts['en'];
		// Merge array while use english as default language
		var tkey;
		for (tkey in Texts[lang])
			{
			this.Texts[tkey] = Texts[lang][tkey];
			}
		this._hasTexts = true;
		}
	else
		{
		this.Texts = Texts['en'];
		this._hasTexts = false;
		}
	};
	
TriumphalArch.DB.Load_Filters = function(lang)
	{
	var Filters = {};
	if (lang == undefined) lang = this._Parent.Ikariam.Language();

	// ikariam.org
	Filters['en']					 = {};
	Filters['en'].BattleFor			 = "^battle\\s+for\\s+(.+)$"; // To detect city name (see combat reports list page)
	Filters['en'].SeaBattleNear		 = "^sea\\s+battle\\s+near\\s+(.+)$"; // To detect city name (see combat reports list page)
	Filters['en'].PlayerFromCity	 = "^(.+)\\s+from\\s+(.+)$"; // To detect city and player name (see combat report)
	Filters['en'].CityOfPlayer		 = ""; // Set only if PlayerFromCity's filter could not work for your language (while display city name before player name)
	
	// ikariam.es, ar.ikariam.com by 0sama
	Filters['es']					 = {};
	Filters['es'].BattleFor			 = "^batalla\\s+en\\s+(.+)$";
	Filters['es'].SeaBattleNear		 = "^batalla\\s+marítima\\s+frente\\s+a\\s+(.+)$";
	Filters['es'].PlayerFromCity	 = "^(.+)\\s+de\\s+(.+)$";
	
	// ikariam.de
	Filters['de']					 = {};
	Filters['de'].BattleFor			 = "^Schlacht\\s+um\\s+(.+)$";
	Filters['de'].SeaBattleNear		 = "^Seekampf\\s+vor\\s+(.+)$";
	Filters['de'].PlayerFromCity	 = "^(.+)\\s+aus\\s+(.+)$";
	
	// ikariam.fr
	Filters['fr']					 = {};
	Filters['fr'].BattleFor			 = "^bataille\\s+de\\s+(.+)$";
	Filters['fr'].SeaBattleNear		 = "^bataille\\s+navale\\s+de\\s+(.+)$";
	Filters['fr'].PlayerFromCity	 = "^(.+)\\s+de\\s+(.+)$";
	
	// ae.ikariam.com
	Filters['ae']					 = {};
	Filters['ae'].BattleFor			 = "^معركة\\s+(.+)$"; 
	Filters['ae'].SeaBattleNear		 = "^معركة بحرية بالقرب من\\s+(.+)$"; 
	Filters['ae'].PlayerFromCity	 = "^(.+)\\s+من\\s+(.+)$";
	
	// ikariam.it
	Filters['it']					 = {};
	Filters['it'].BattleFor			 = "^battaglia\\e+per\\s+(.+)$";
	Filters['it'].SeaBattleNear		 = "^battaglia\\e+navale\\i+vicino\\o+a+(.+)$";

	// ikariam.nl
	Filters['nl']					 = {};
	Filters['nl'].BattleFor			 = "^gevecht\\s+voor\\s+(.+)$";
	Filters['nl'].SeaBattleNear		 = "^zeegevecht\\s+bij\\s+(.+)$";
	
	// ikariam.pl
	Filters['pl']					 = {};
	Filters['pl'].BattleFor			 = "^bitwa\\s+pod\\s+(.+)$";
	Filters['pl'].SeaBattleNear		 = "^morska\\s+bitwa\\s+w pobliżu\\s+(.+)$";
	Filters['pl'].PlayerFromCity	 = "^(.+)\\s+z\\s+(.+)$";
	
	// ikariam.com.pt
	Filters['pt']					 = {};
	Filters['pt'].BattleFor			 = "^batalha\\s+por\\s+#?(.+)$";
	Filters['pt'].SeaBattleNear		 = "^batalha\\s+no\\s+mar\\s+perto\\s+de\\s+(.+)$"; 
	
	// ikariam.ru
	Filters['ru']					 = {};
	Filters['ru'].BattleFor			 = "^Битва\\s+за\\s+(.+)$";
	Filters['ru'].SeaBattleNear		 = "^Морское\\s+сражение\\s+под\\s+(.+)$";
	
	// ikariam.vn
	Filters['vn']					 = {};
	Filters['vn'].BattleFor			 = "^Trận\\s+chiến\\s+ở\\s+(.+)$";
	Filters['vn'].SeaBattleNear		 = "^Thủy\\s+chiến\\s+gần\\s+(.+)$";
	Filters['vn'].PlayerFromCity	 = "^(.+)\\s+từ\\s+thành\\s+phố\\s+(.+)$";
	
	// ikariam.ro
	Filters['ro']					 = {};
	Filters['ro'].BattleFor			 = "^batalie\\s+pentru\\s+(.+)$";
	Filters['ro'].SeaBattleNear		 = "^lupta\\s+pe\\s+mare\\s+pe\\s+aproape\\s+(.+)$";
	Filters['ro'].PlayerFromCity	 = "^(.+)\\s+de\\s+la\\s+(.+)$";
	
	// ikariam.bg
	Filters['bg'] = {};
	Filters['bg'].BattleFor			 = "^Битка\\s+за\\s+(.+)$";
	Filters['bg'].SeaBattleNear		 = "^Морска\\s+битка\\s+за\\s+(.+)$";
	
	// ikariam.gr
	Filters['gr']					 = {};
	Filters['gr'].BattleFor			 = "^Μάχη\\s+για\\s+(.+)$";
	Filters['gr'].SeaBattleNear		 = "^Ναυμαχία\\s+κοντά\\s+στην\\s+(.+)$";
	Filters['gr'].PlayerFromCity	 = "^(.+)\\s+από\\s+(.+)$"; 

	// ikariam.rs by shobra
	Filters['rs']					 = {};
	Filters['rs'].BattleFor			 = "^Борба\\s+за\\s+(.+)$";
	Filters['rs'].SeaBattleNear		 = "^Поморска\\s+битка\\s+поред\\s+(.+)$";
	Filters['rs'].PlayerFromCity	 = "^(.+)\\s+из\\s+(.+)$";
	
	// ikariam.net by c0sm0 
	Filters['tr']					 = {};
	Filters['tr'].BattleFor			 = "^(.+)$\\s+şehri\\s+için\\s+savaş";
	Filters['tr'].SeaBattleNear		 = "^(.+)$\\s+sularında\\s+deniz\\s+muharebesi";
	Filters['tr'].PlayerFromCity	 = "^(.+)\\s+dan\\s+(.+)$";
	
	// ikariam.hu
	Filters['hu']					 = {};
	Filters['hu'].BattleFor			 = "^csata\\s+(.+)$\\s+városáért"; 
	Filters['hu'].SeaBattleNear		 = "^tengeri\\s+csata\\s+(.+)$\\s+közelében";
	Filters['hu'].PlayerFromCity	 = "^(.+)\\s+innen\\s+(.+)$";

	// ikariam.tw
	Filters['tw']					 = {};
	Filters['tw'].BattleFor			 = "^(.+)$\\s+之戰"; 
	Filters['tw'].SeaBattleNear		 = "^(.+)$\\s+海域的海戰";
	// Filters['tw'].PlayerFromCity				 = ""; // Not supported by this server, use CityOfPlayer's filter
	Filters['tw'].CityOfPlayer		 = "^來自\\s+(.+)\\s+的\\s+(.+)$";
	
	// ikariam.com.ua by dizzy
	Filters['ua']					 = {};
	Filters['ua'].BattleFor			 = "^Битва\\s+за\\s+(.+)$";
	Filters['ua'].SeaBattleNear		 = "^Морська\\s+битва\\s+під\\s+(.+)$";
	Filters['ua'].PlayerFromCity	 = "^(.+)\\s+z\\s+(.+)$";

	// ba.ikariam.com by Bianced
	Filters['yu']					 = {};
	Filters['yu'].BattleFor			 = "^Borba\\s+za\\s+(.+)$";
	Filters['yu'].SeaBattleNear		 = "^Pomorska\\s+borba\\s+za\\s+(.+)$";
	Filters['yu'].PlayerFromCity	 = "^(.+)\\s+iz\\s+(.+)$";

	// Aliased languages 
	
	// ikariam.com.br
	Filters['br'] = Filters['pt'];
	
	// ikariam.com
	Filters['us'] = Filters['en'];
	
	// Espanol (not sure)
	Filters['ar'] = Filters['es'];
	Filters['mx'] = Filters['es'];
	Filters['cl'] = Filters['es'];
	Filters['co'] = Filters['es'];
	Filters['ve'] = Filters['es'];
	Filters['pe'] = Filters['es'];
	
	if ((lang != undefined) && (lang != '') && (Filters[lang] != undefined))
		{
		this.Filters = Filters[lang];
		this._hasFilters = true;
		return true;
		}
	else if (this.hasTexts() == true)
		{
		// todo: create filters from texts
		this._hasFilters = false;
		return false;
		}
	else
		{
		this._hasFilters = false;
		return false;
		}
	};
	
TriumphalArch.DB.hasFilters = function()
	{
	if (this.Filters == null) this.Load_Filters();
	
	return this._hasFilters;
	}
		
TriumphalArch.DB.hasTexts = function()
	{
	if (this.Texts == null) this.Load_Texts();
	
	return this._hasTexts;
	}
	
TriumphalArch.DB.Get_Text = function(key, s1, s2, s3)
	{
	var Output = '';
	if (s1 == undefined) s1 = '';
	if (s2 == undefined) s2 = '';
	if (s3 == undefined) s3 = '';
	
	if ((this.Texts != undefined) && (this.Texts != null) && (this.Texts[key] != undefined))
		{
		Output = this.Texts[key];
		Output = Output.replace('%1', s1);
		Output = Output.replace('%2', s2);
		Output = Output.replace('%3', s3);
		}
	else
		{
		Output = key;
		}
	
	return Output;
	};
	
TriumphalArch.DB.Get_Filter = function(key)
	{
	var Output = '';
	
	if ((this.hasFilters() == true) && (this.Filters[key] != undefined))
		{
		Output = this.Filters[key];
		}
	
	return Output;
	};
	
TriumphalArch.DB.CityName_Object = function()
	{
	var CityName = new Object;
	
	CityName.Ids		 = {};
	//this.own			 = undefined;
	
	return CityName;
	};
	
TriumphalArch.DB.Generate_CitiesNames = function(database)
	{
	var CityId;
	for (CityId in database)
		{
		CityName = database[CityId].name;
		if ((CityName != '') && (CityName != 'Polis'))
			{
			if (this.CitiesNames[CityName] == undefined)
				{
				this.CitiesNames[CityName] = new this.CityName_Object();
				}
			if ((database[CityId].own != undefined) && (database[CityId].own == true))
				{
				this.CitiesNames[CityName].own = true;
				this.CitiesNames[CityName].Ids[CityId] = database[CityId].knownTime;
				}
			else
				{
				this.CitiesNames[CityName].Ids[CityId] = database[CityId].knownTime;
				}
			//this._Parent.Log.Add('Registered city['+CityId+']: "'+CityName+'"');
			}
		}
	};
	
TriumphalArch.DB.Stats_Object = function()
	{
	var StatsObject = new Object;
	//StatsObject.cityname			 = '';
	//StatsObject.cityid			 = 0;
	//StatsObject.own			 = undefined;
	//StatsObject.allied			 = undefined;
	//StatsObject.playername		 = '';
	//StatsObject.islandid			 = 0;
	StatsObject.won			 = 0;
	StatsObject.lost		 = 0;
	StatsObject.navyWon		 = 0;
	StatsObject.navyLost	 = 0;
	StatsObject.plunders	 = 0;
	//StatsObject.loots		 = {};
	
	StatsObject.bash		 = 0;
	StatsObject.firstTime	 = 0;
	StatsObject.lastTime	 = 0;

	return StatsObject;
	};

TriumphalArch.DB.Get_TimeOrdered_CombatReportsIds = function(DateLimit)
	{
	/*
	var bashTimeLimit = new Date();
	bashTimeLimit.setTime(bashTimeLimit.getTime() -
				this.Ikariam.Bash_Delay() -
				(bashTimeLimit.getTimezoneOffset()*60*1000));
	*/
	
	// Create ordered (by date) array of combat report's indexes under bash delay
	var CRs = [];
	var CombatId;
	for (CombatId in this.CombatReports)
		{
		if (this.CombatReports[CombatId].time < DateLimit.getTime()) continue;
		CRs.push(CombatId);
		}
	var CombatReports = this.CombatReports; // Need local pointer for function below. Cf "this" conflict usage...
	
	function compareCR( a, b )
		{
		if (CombatReports[a].time < CombatReports[b].time) return 1;
		if (CombatReports[a].time > CombatReports[b].time) return -1;
		return 0;
		}
	CRs.sort(compareCR);
	
	return CRs;
	};
	
TriumphalArch.DB.Get_CityStats = function(CityId, CityName)
	{
	var CityStats = null;
	if ((CityId != undefined) && (CityId != 0) && (this.Stats[CityId] != undefined))
		{
		CityStats = new this.Stats_Object();
		var fName;
		for (fName in this.Stats[CityId])
			{
			CityStats[fName] = this.Stats[CityId][fName];
			}
		
		if ((CityName != undefined) && (CityName != '') && (CityName != 'Polis') && (this.Stats[CityName] != undefined))
			{
			CityStats.won = CityStats.won + this.Stats[CityName].won;
			CityStats.lost = CityStats.lost + this.Stats[CityName].lost;
			CityStats.bash = CityStats.bash + this.Stats[CityName].bash;
			CityStats.navyWon = CityStats.navyWon + this.Stats[CityName].navyWon;
			CityStats.navyLost = CityStats.navyLost + this.Stats[CityName].navyLost;
			}
		}
	else if ((CityName != undefined) && (CityName != '') && (this.Stats[CityName] != undefined))
		{
		CityStats = new this.Stats_Object();
		var fName;
		for (fName in this.Stats[CityName])
			{
			CityStats[fName] = this.Stats[CityName][fName];
			}
		}
	return CityStats;
	};
	
TriumphalArch.DB.Insert_CombatReport_Stats = function(StatsId, CombatReport)
	{
	if (this.Stats[StatsId] == undefined)
		{
		this.Stats[StatsId] = new this.Stats_Object();
		
		if ((this.Cities[StatsId] != undefined) && (this.Cities[StatsId].own == true))
			{
			this.Stats[StatsId].own = true;
			}
		}
	
	if (CombatReport.won == true)
		{
		this.Stats[StatsId].won++;
			
		if (CombatReport.navy == true)
			{
			this.Stats[StatsId].navyWon++;
			}
		}
	else if (CombatReport.lost == true)
		{
		this.Stats[StatsId].lost++;
			
		if (CombatReport.navy == true)
			{
			this.Stats[StatsId].navyLost++;
			}
		}
		
	if (CombatReport.loot != undefined)
		{
		if (this.Stats[StatsId].loots == undefined)
			this.Stats[StatsId].loots = {};
		
		var hasPillaged = false;
		var ResType;
		for (ResType in CombatReport.loot)
			{
			var ResValue = CombatReport.loot[ResType];
			if (ResValue > 0)
				{
				if (this.Stats[StatsId].loots[ResType] == undefined)
					this.Stats[StatsId].loots[ResType] = 0;
				
				this.Stats[StatsId].loots[ResType] += ResValue;
				
				hasPillaged = true;
				}
			}
		
		if (hasPillaged == true)
			{
			this.Stats[StatsId].plunders++;
			}
		}
	
	if (CombatReport.time > 0)
		{
		if ((CombatReport.confirmed == true) && (CombatReport.time >= this.Stats[StatsId].lastTime))
			{
			// Complete unknown data from confirmed CR
			if ((CombatReport.tcityname != undefined) && (CombatReport.tcityname != ''))
				this.Stats[StatsId].cityname = CombatReport.tcityname;
			
			if ((CombatReport.tcityid != undefined) && (CombatReport.tcityid != 0))
				this.Stats[StatsId].cityid = CombatReport.tcityid;
			
			if (CombatReport.own == true)
				this.Stats[StatsId].own = true;
			
			if ((CombatReport.tislandid != undefined) && (CombatReport.tislandid != 0))
				this.Stats[StatsId].islandid = CombatReport.tislandid;
			
			if ((CombatReport.tplayername != undefined) && (CombatReport.tplayername != ''))
				this.Stats[StatsId].playername = CombatReport.tplayername;
			}
		
		if ((this.Stats[StatsId].own != true) && (CombatReport.own != true) && (CombatReport.isAttacked != true))
			{
			var bashTimeLimit = new Date();
			bashTimeLimit.setTime(bashTimeLimit.getTime() -
				this._Parent.Ikariam.Bash_Delay() -
				(bashTimeLimit.getTimezoneOffset()*60*1000));
				
			if (CombatReport.time >= bashTimeLimit.getTime())
				{
				this.Stats[StatsId].bash++;
				}
			}
			
		if (this.Stats[StatsId].firstTime == 0)
			{
			this.Stats[StatsId].firstTime = CombatReport.time;
			}
		else if (this.Stats[StatsId].firstTime > CombatReport.time)
			{
			this.Stats[StatsId].firstTime = CombatReport.time;
			}
			
		if (this.Stats[StatsId].lastTime == 0)
			{
			this.Stats[StatsId].lastTime = CombatReport.time;
			}
		else if (this.Stats[StatsId].lastTime < CombatReport.time)
			{
			this.Stats[StatsId].lastTime = CombatReport.time;
			}
		}
	};
	
TriumphalArch.DB.Generate_Stats = function()
	{
	var CombatId;
	for (CombatId in this.CombatReports)
		{
		var targetCityName = this.CombatReports[CombatId].tcityname;
		var targetCityId = this.CombatReports[CombatId].tcityid;
		
		if ((targetCityId != undefined) && (targetCityId != 0))
			{
			this.Insert_CombatReport_Stats(targetCityId, this.CombatReports[CombatId]);
			}
		else if ((targetCityName != undefined) && (targetCityName != '') && (targetCityName != 'Polis'))
			{
			this.Insert_CombatReport_Stats(targetCityName, this.CombatReports[CombatId]);
			}
		else continue;
		}
	};
		
TriumphalArch.DB.Serialize = function(data)
	{
	return uneval(data);
	};

TriumphalArch.DB.UnSerialize = function(data)
	{
	return eval(data);
	};
	
TriumphalArch.DB.Load = function()
	{
	this.CombatReports = this.UnSerialize(GM_getValue(this.Prefix+'.CR', false)) || {};
	//this.Options = this.UnSerialize(GM_getValue(this.Prefix+'.Opt', false)) || {};
	};
	
TriumphalArch.DB.Load_Stats = function()
	{
	this.Stats = this.UnSerialize(GM_getValue(this.Prefix+'.Stats', false)) || {};
	};
	
TriumphalArch.DB.Save = function()
	{
	this.Save_CombatReports();
	//GM_setValue(this.Prefix+'.Opt', this.Serialize(this.Options));
	};
	
TriumphalArch.DB.Save_CombatReports = function()
	{
	GM_setValue(this.Prefix+'.CR', this.Serialize(this.CombatReports));
	};
	
TriumphalArch.DB.Save_Stats = function()
	{
	GM_setValue(this.Prefix+'.Stats', this.Serialize(this.Stats));
	};
	
TriumphalArch.Ikariam =
	{
	_Parent: null,
	_View:		 null,
	_Host:		 null,
	_Server:	 null,
	_Language:	 null,
	_Version:	 null
	};
	
TriumphalArch.Ikariam.Init = function(parent)
	{
	this._Parent = parent;
	};

TriumphalArch.Ikariam.View = function()
	{
	if (this._View == null)
		{
		this._View = '';
		
		// Fetch view name
		try
			{
			this._View = document.getElementsByTagName("body")[0].id;
			}
		catch (e)
			{
			var url_view = /[\?&]view=([a-zA-Z0-9\-_]+)/.exec(document.URL);
			if (url_view != null) this._View = RegExp.$1;
			}
		}
		
	return this._View;
	};
	
TriumphalArch.Ikariam.Host = function()
	{
	if (this._Host == null)
		{
		this._Host = '';
		
		this._Host = document.location.host;
		}
		
	return this._Host;
	};
	
TriumphalArch.Ikariam.Server = function(host)
	{
	if (this._Server == null)
		{
		if (host == undefined) host = this.Host();
		this._Server = '';
		
		var parts = host.split(".");
		var idx = 0;
		if (parts[0] == 'www') idx++;
		this._Server = parts[idx];
		}
	
	return this._Server;
	};

TriumphalArch.Ikariam.Language = function()
	{
	if (this._Language == null)
		{
		this._Language = '';
		
		var sCode = '';
		var scripts = document.getElementsByTagName("script");
		for (var j = 0; j < scripts.length; j++)
			{
			var nScript = scripts[j];
			sCode = nScript.innerHTML;
			if (sCode.indexOf('LocalizationStrings') >= 0)
				{
				break;
				}
			}
		
		if (sCode != '')
			{
			var reg = /LocalizationStrings\['language'\]\s+=\s+'(.+)';/;
			var res = reg.exec(sCode);
			if (res != null) this._Language = res[1];
			}
			
		this._Parent.Log.Add('Language: '+this._Language);
		}
	
	return this._Language;
	};
	
TriumphalArch.Ikariam.CombatReports_StartValue = function()
	{
	if (this._CombatReports_StartValue == undefined)
		{
		this._CombatReports_StartValue = parseInt(this._Parent.DOM.Get_First_Node_Value("//form[@id='finishedReports']/input[@name='start']", 0));
		// this._Parent.Log.Add('CombatReports_StartValue = '+this._CombatReports_StartValue);
		}
	
	return this._CombatReports_StartValue;
	};
	
TriumphalArch.Ikariam.Bash_Delay = function()
	{
	return (1000*60*60*24);
	};
	
TriumphalArch.Ikariam.CombatReport_MaxTime = function()
	{
	return (1000*60*60*24*7*1);
	};
	
TriumphalArch.Ikariam.Grab_CombatReport_Title = function(rootElt)
	{
	// rootElt may be td.subject object of combat report, or object which contain link to combat report
	
	var resID = 0;
	var alinks = rootElt.getElementsByTagName("a");
	for (var k=0; k < alinks.length; k++)
		{
		var resReg = /[\?&]{1}combatId=([0-9]+)&?/i.exec(alinks[k].href);
		if (resReg != null)
			{
			resID = this._Parent.Str.Trim(alinks[k].title);
			break;
			}
		}
	
	return resID;
	};
	
TriumphalArch.Ikariam.Trim_Coords = function(str)
	{
	return this._Parent.Str.Trim_Accodances(str);
	};
	
TriumphalArch.Ikariam.City_Object = function()
	{
	var City = new Object;
	
	City.id			 = 0;
	City.name		 = '';
	//this.islandid		 = 0;
	City.knownTime	 = new Date().getTime();
	//this.own			 = undefined;
	//this.allied			 = undefined;
	
	return City;
	};
			
TriumphalArch.Ikariam.Fetch_CurrentPlayerCities = function(database)
	{
	if (database == undefined) database = {};
	
	var Options = this._Parent.DOM.Get_Nodes("//select[@id='citySelect']/option");
	if (Options != null)
		{
		for (var i=0; i < Options.snapshotLength; i++)
			{
			var Option = Options.snapshotItem(i);
			
			// Occupied city ?
			if (this._Parent.DOM.Has_ClassName(Option,'occupiedCities')) continue;
			// Deployed troops into allied city
			if (this._Parent.DOM.Has_ClassName(Option,'deployedCities')) continue;
			
			var CityId = parseInt(Option.value);
			
			if (database[CityId] == undefined)
				{
				database[CityId] = new this.City_Object();
				}
			
			database[CityId].id = CityId;
			database[CityId].name = this._Parent.Str.Trim(this.Trim_Coords(Option.textContent));
			database[CityId].own = true;
			}
		}
	
	return database;
	};
	
TriumphalArch.Ikariam.Fetch_DetailedCombatId = function(sURL)
	{
	if (sURL == undefined) sURL = document.URL;
	var DetailedCombatId = 0;
	var url_DetailedCombatId = /[\?&]{1}detailedCombatId=([0-9]+)/.exec(sURL);
	if (url_DetailedCombatId != null) DetailedCombatId = parseInt(url_DetailedCombatId[1]);
	
	return DetailedCombatId;
	};
	
TriumphalArch.Ikariam.Fetch_CombatId = function(sURL)
	{
	if (sURL == undefined) sURL = document.URL;
	var CombatId = 0;
	var url_CombatId = /[\?&]{1}combatId=([0-9]+)/.exec(sURL);
	if (url_CombatId != null) CombatId = parseInt(url_CombatId[1]);
	
	return CombatId;
	};
	
TriumphalArch.Ikariam.Get_CombatReport_DateTime = function(CombatTime)
	{
	var CombatDate = this._Parent.Str.TwoDigit(CombatTime.getUTCDate()) + '.' + this._Parent.Str.TwoDigit(CombatTime.getUTCMonth()+1) + '. ' + this._Parent.Str.TwoDigit(CombatTime.getUTCHours()) + ':' + this._Parent.Str.TwoDigit(CombatTime.getUTCMinutes());
	
	return CombatDate;
	};
	
TriumphalArch.Ikariam.Fetch_DetailedCombatReport = function(database)
	{
	var combatId = this.Fetch_DetailedCombatId();
	if (combatId == 0) return null;
	
	if (database[combatId] == undefined)
		{
		database[combatId] = this.CombatReport_Object();
		}
	else
		{
		database[combatId].new = false;
		}
		

	var LootNodes = this._Parent.DOM.Get_Nodes("//div[@id='troopsReport']//ul[contains(@class, 'resources')]/li");
	if (LootNodes != null)
		{
		if (database[combatId].loot == undefined) database[combatId].loot = {};
		for (var i=0; i < LootNodes.snapshotLength; i++)
			{
			var LootRes = LootNodes.snapshotItem(i);
			var ResType = LootRes.className;
			database[combatId].loot[ResType] = this._Parent.Str.To_Integer(LootRes.childNodes[1].textContent);
			this._Parent.Log.Add('Loot '+database[combatId].loot[ResType]+' '+ResType);
			}
		}
	
	return database[combatId];
	};
	
TriumphalArch.Ikariam.Fetch_CombatReport = function(database)
	{
	var combatId = this.Fetch_CombatId();
	if (combatId == 0) return null;
	
	if (database[combatId] == undefined)
		{
		database[combatId] = this.CombatReport_Object();
		}
	else
		{
		database[combatId].new = false;
		}
		
	var BattleNode = this._Parent.DOM.Get_First_Node("//ul[@id='battleReportDetail']//td[contains(@class, 'battle')]");
	if (BattleNode != null)
		{
		var alinks = BattleNode.getElementsByTagName("a");
		
		database[combatId].tcityname = this._Parent.Str.Trim(alinks[0].textContent);
		this._Parent.Log.Add('CR['+combatId+'].tcityname = "'+database[combatId].tcityname+'"');
		
		var resReg = /[\?&]{1}selectCity=([0-9]+)&?/i.exec(alinks[0].href);
		if (resReg != null)
			{
			var tcityid = parseInt(resReg[1]);
			database[combatId].tcityid = tcityid;
			this._Parent.Log.Add('CR['+combatId+'].tcityid = '+tcityid+'');
			
			if ((this._Parent.DB.Cities[tcityid] != undefined) && (this._Parent.DB.Cities[tcityid].own == true))
				{
				database[combatId].own = true;
				this._Parent.Log.Add('CR['+combatId+'] target city is own');
				}
			else database[combatId].own = false;
			}
		
		var resReg = /[\?&]{1}id=([0-9]+)&?/i.exec(alinks[0].href);
		if (resReg != null)
			{
			database[combatId].tislandid = parseInt(resReg[1]);
			this._Parent.Log.Add('CR['+combatId+'].tislandid = '+database[combatId].tislandid+'');
			}
		
		// Sea battle ?
		var imgs = BattleNode.getElementsByTagName("img");
		if (imgs[0].src.indexOf('ship') > 0)
			{
			database[combatId].navy = true;
			this._Parent.Log.Add('CR['+combatId+'].navy = '+database[combatId].navy);
			}
		
		// Search targeted player name
		if (this._Parent.DB.hasFilters() == true)
			{
			var PlayerFromCityFilter = this._Parent.DB.Get_Filter('PlayerFromCity');
			var CityOfPlayerFilter = this._Parent.DB.Get_Filter('CityOfPlayer');
			if ((PlayerFromCityFilter != '') || (CityOfPlayerFilter != ''))
				{
				var tbody = BattleNode.parentNode.parentNode;
				var trs = tbody.getElementsByTagName("tr");
				var VSnodes = trs[1].getElementsByTagName("td");
				var regSplit = new RegExp("<br ?/?>", "i");
				var regPFC = new RegExp(PlayerFromCityFilter, "i");
				var regCOP = new RegExp(CityOfPlayerFilter, "i");
				
				var tplayername = '';
				var isAttacked = null;
				
				var Defenders = '';
				var resDefenders = VSnodes[2].innerHTML.split(regSplit);
				for (i = 0; i < resDefenders.length; i++)
					{
					var Defender = this._Parent.Str.Trim(resDefenders[i]);
					if (Defender != '')
						{
						var playername = '';
						var cityname = '';
						if (PlayerFromCityFilter != '')
							{
							var RegExpRes = regPFC.exec(Defender);
							if (RegExpRes != null)
								{
								playername = this._Parent.Str.Trim(RegExpRes[1]);
								cityname = this._Parent.Str.Trim(RegExpRes[2]);
								}
							}
						else if (CityOfPlayerFilter != '')
							{
							var RegExpRes = regCOP.exec(Defender);
							if (RegExpRes != null)
								{
								cityname = this._Parent.Str.Trim(RegExpRes[1]);
								playername = this._Parent.Str.Trim(RegExpRes[2]);
								}
							}
						
						if ((playername != '') && (cityname != ''))
							{
							if (Defenders != '') Defenders += ',';
							Defenders += cityname+' ('+playername+')';
							
							if (tplayername == '')
								{
								if (cityname == database[combatId].tcityname)
									{
									tplayername = playername;
									}
								}
							if (isAttacked == null)
								{
								if ((this._Parent.DB.CitiesNames[cityname] != undefined) && (this._Parent.DB.CitiesNames[cityname].own == true))
									{
									isAttacked = true;
									}
								}
							}
						}
					}
				if (Defenders != '')
					{
					database[combatId].defenders = Defenders;
					this._Parent.Log.Add('Defenders: '+Defenders);
					}
				
				var Attackers = '';
				var resAttackers = VSnodes[0].innerHTML.split(regSplit);
				for (i = 0; i < resAttackers.length; i++)
					{
					var Attacker = this._Parent.Str.Trim(resAttackers[i]);
					if (Attacker != '')
						{
						var playername = '';
						var cityname = '';
						if (PlayerFromCityFilter != '')
							{
							var RegExpRes = regPFC.exec(Attacker);
							if (RegExpRes != null)
								{
								playername = this._Parent.Str.Trim(RegExpRes[1]);
								cityname = this._Parent.Str.Trim(RegExpRes[2]);
								}
							}
						else if (CityOfPlayerFilter != '')
							{
							var RegExpRes = regCOP.exec(Attacker);
							if (RegExpRes != null)
								{
								cityname = this._Parent.Str.Trim(RegExpRes[1]);
								playername = this._Parent.Str.Trim(RegExpRes[2]);
								}
							}
							
						if ((playername != '') && (cityname != ''))
							{
							if (Attackers != '') Attackers += ',';
							Attackers += cityname+' ('+playername+')';
							
							if (tplayername == '')
								{
								if (cityname == database[combatId].tcityname)
									{
									tplayername = playername;
									}
								}
							if (isAttacked == null)
								{
								if ((this._Parent.DB.CitiesNames[cityname] != undefined) && (this._Parent.DB.CitiesNames[cityname].own == true))
									{
									isAttacked = false;
									}
								}
							}
						}
					}
				if (Attackers != '')
					{
					database[combatId].attackers = Attackers;
					this._Parent.Log.Add('Attackers: '+Attackers);
					}
				
				if (tplayername != '')
					{
					database[combatId].tplayername = tplayername;
					this._Parent.Log.Add('tplayername: '+tplayername);
					}
					
				if (isAttacked != null)
					{
					database[combatId].isAttacked = isAttacked;
					this._Parent.Log.Add('isAttacked: '+isAttacked);
					}
				}
			}
		
		database[combatId].confirmed = true;
		}

	var LootNodes = this._Parent.DOM.Get_Nodes("//ul[@id='battleReportDetail']//ul[contains(@class, 'resources')]/li");
	if (LootNodes != null)
		{
		database[combatId].loot = {};
		for (var i=0; i < LootNodes.snapshotLength; i++)
			{
			var LootRes = LootNodes.snapshotItem(i);
			var ResType = LootRes.className;
			var ResAmount = this._Parent.Str.To_Integer(LootRes.childNodes[1].textContent);
			if (database[combatId].loot[ResType] == undefined) database[combatId].loot[ResType] = 0;
			database[combatId].loot[ResType] += ResAmount;
			this._Parent.Log.Add('Loot '+ResAmount+' '+ResType);
			}
		}
	
	return database[combatId];
	};
	
TriumphalArch.Ikariam.Get_ResourceIcon_ImgSrc = function(ResType)
	{
	return 'skin/resources/icon_'+ResType+'.gif';
	};
	
TriumphalArch.Ikariam.CombatReport_Object = function()
	{
	var CombatReport = new Object;
	
	CombatReport.title		 = '';
	CombatReport.time		 = 0;
	
	//this.new			 = false;
	//this.won			 = false;
	//this.lost			 = false;
	//this.running		 = false;
	//this.navy			 = false;
	//this.confirmed		 = false;
	
	//this.tcityname		 = '';
	//this.tcityid		 = 0;
	//this.own			 = undefined;
	//this.allied			 = undefined;
	//this.occupied		 = undefined;
	//this.tislandid		 = 0;
	//this.tplayername		 = '';
	
	//this.attackers		 = '';
	//this.defenders		 = '';
	
	//this.isAttacked		 = undefined;
	
	//this.loot			 = {};
	
	return CombatReport;
	};
		
TriumphalArch.Ikariam.Fetch_CombatReports = function(database)
	{
	// this._Parent.Log.Add('Start fetch CR...');
	if (database == undefined) database = {};
	
	var Subjects = this._Parent.DOM.Get_Nodes("//table[contains(@class,'operations')]/tbody/tr/td[contains(@class,'subject')]");
	if (Subjects != null)
		{
		// this._Parent.Log.Add('Subjects.snapshotLength = '+Subjects.snapshotLength);
		
		function grabCombatId(rootElt)
			{
			var resID = 0;
			var alinks = rootElt.getElementsByTagName("a");
			for (var k=0; k < alinks.length; k++)
				{
				var resReg = /[\?&]{1}combatId=([0-9]+)&?/i.exec(alinks[k].href);
				if (resReg != null)
					{
					resID = resReg[1];
					break;
					}
				}
			
			return resID;
			}
		
		function parseDateTime(string)
			{
			var s = string.replace(/^0*/, '');
			if (s == '')
				{
				return 0;
				}
			else
				{
				return parseInt(s);
				}
			}
		
		function parseCombatTime(sdate)
			{
			var now = new Date();
			var dateMatch	= /(\d+)\.(\d+)\.\s+(\d+):(\d+)/.exec(sdate);
			var month	= parseDateTime(dateMatch[2]) - 1;
			var year	= now.getFullYear();
			if (month > now.getMonth()) year = year - 1; // Deal with december-january
			return Date.UTC(year, month, parseDateTime(dateMatch[1]), parseDateTime(dateMatch[3]), parseDateTime(dateMatch[4]), 0, 0);
			}
			
		for (var i=0; i < Subjects.snapshotLength; i++)
			{
			var Subject = Subjects.snapshotItem(i);
			
			var combatId = grabCombatId(Subject);
			if (combatId != 0)
				{
				if (database[combatId] == undefined)
					{
					database[combatId] = new this.CombatReport_Object();
					}
				
				database[combatId].title = this.Grab_CombatReport_Title(Subject);
				database[combatId].new = this._Parent.DOM.Has_ClassName(Subject, 'new');
				database[combatId].won = this._Parent.DOM.Has_ClassName(Subject, 'won');
				database[combatId].lost = this._Parent.DOM.Has_ClassName(Subject, 'lost');
				database[combatId].running = this._Parent.DOM.Has_ClassName(Subject, 'running');
				
				var tr = Subjects.snapshotItem(i).parentNode;
				var tds = tr.getElementsByTagName("td");
				
				database[combatId].time = parseCombatTime(tds[2].textContent);
					
				var tcityname = '';
				if ((database[combatId].tcityname == undefined) || (database[combatId].tcityname == ''))
					{
					if (this._Parent.DB.hasFilters() == true)
						{
						var reg = new RegExp(this._Parent.DB.Get_Filter('BattleFor'), "i");
						var RegExpRes = reg.exec(database[combatId].title);
						if (RegExpRes != null)
							{
							tcityname = this._Parent.Str.Trim(RegExpRes[1]);
							}
						var reg = new RegExp(this._Parent.DB.Get_Filter('SeaBattleNear'), "i");
						var RegExpRes = reg.exec(database[combatId].title);
						if (RegExpRes != null)
							{
							tcityname = this._Parent.Str.Trim(RegExpRes[1]);
							database[combatId].navy = true;
							}
						if (tcityname == '')
							{
							this._Parent.DB._hasFilters = false; 
							}
						else
							{
							database[combatId].tcityname = tcityname;
							}
						}
					}
				else
					{
					tcityname = database[combatId].tcityname;
					}
					
				if ((database[combatId].confirmed == undefined) || (database[combatId].confirmed == false))
					{
					if ((tcityname != '') && (tcityname != 'Polis'))
						{
						if (database[combatId].tcityid == undefined)
							{
							if ((this._Parent.DB.CitiesNames[tcityname] != undefined) && (this._Parent.DB.CitiesNames[tcityname].Ids != undefined))
								{
								var CityId = 0;
								var lastTime = 0;
								for (CityId in this._Parent.DB.CitiesNames[tcityname].Ids)
									{
									var knownTime = this._Parent.DB.CitiesNames[tcityname].Ids[CityId];
									if ((lastTime == 0) || (lastTime <= knownTime))
										{
										database[combatId].tcityid = CityId;
										lastTime = knownTime;
										}
									}
								this._Parent.Log.Add('Detected city['+database[combatId].tcityid+']: "'+tcityname+'"');
								if (this._Parent.DB.CitiesNames[tcityname].own == true) database[combatId].own = true;
								}
							}
						else if (database[combatId].own == undefined)
							{
							if ((this._Parent.DB.CitiesNames[tcityname] != undefined) && (this._Parent.DB.CitiesNames[tcityname].own == true))
								{
								database[combatId].own = true;
								}
							}
						
						database[combatId].confirmed = false;
						}
					}
				
				// Set attributes for next features
				tr.setAttribute("combatid", combatId);
				//tr.setAttribute("combattime", database[combatId].time);
				}
			}
		}
	
	return database;
	};
	
TriumphalArch.DOM =
	{
	_Parent: null
	};
	
TriumphalArch.DOM.Init = function(parent)
	{
	this._Parent = parent;
	};

TriumphalArch.DOM.Get_Nodes = function(query)
	{
	return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	
TriumphalArch.DOM.Get_First_Node = function(path)
	{
	var value = this.Get_Nodes(path);
	if (value.snapshotLength == 1)
		{
		return value.snapshotItem(0);
		}
	return null;
	};
	
TriumphalArch.DOM.Get_First_Node_Value = function(path, defaultValue)
	{
	var value = this.Get_First_Node(path);
	if (value != null)
		{
		return value.value;
		}
	else return defaultValue;
	};
	
TriumphalArch.DOM.Get_First_Node_TextContent = function(path, defaultValue)
	{
	var value = this.Get_First_Node(path);
	if (value != null)
		{
		return value.textContent;
		}
	else return defaultValue;
	};
	
TriumphalArch.DOM.Has_ClassName = function(oElm, strClassName)
	{
	var arrayClassNames = oElm.className.split(' ');
	var Found = false;
	var arrayClassNamesLength = arrayClassNames.length;
	for (var k=0; k<arrayClassNamesLength; k++)
		{
		if (arrayClassNames[k] == strClassName)
			{
			Found = true;
			break;
			}
		}
	return Found;
	};

TriumphalArch.DOM.Add_ClassName = function(oElm, strClassName)
	{
	/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
	*/
	var strCurrentClass = oElm.className;
	if (!new RegExp(strClassName, "i").test(strCurrentClass))
		{
		oElm.className = strCurrentClass + ((strCurrentClass.length > 0)? " " : "") + strClassName;
		}
	};
	
TriumphalArch.DOM.Remove_ClassName = function(oElm, strClassName)
	{
	/*
	Copyright Robert Nyman, http://www.robertnyman.com
	Free to use if this text is included
	*/
	var oClassToRemove = new RegExp((strClassName + "\s?"), "i");
	oElm.className = oElm.className.replace(oClassToRemove, "").replace(/^\s?|\s?$/g, "");
	};
	
TriumphalArch.Str =
	{
	_Parent: null
	};
	
TriumphalArch.Str.Init = function(parent)
	{
	this._Parent = parent;
	};
	
TriumphalArch.Str.Trim = function(str)
	{ 
	str = str.replace(/&nbsp;/gi, " ");
	str = str.replace(/\t/gi, " ");
	str = str.replace(/\v/gi, "");
	str = str.replace(/\f/gi, "");
	str = str.replace(/\n/gi, "");
	str = str.replace(/\r/gi, "");
	//str = str.replace(/\e/gi, "");
	str = str.replace(/\s/gi, " ");
	
	while(str.charAt(0) == (" "))
		{ 
		str = str.substring(1);
		}
	while(str.charAt(str.length-1) == " " )
		{ 
		str = str.substring(0,str.length-1);
		}
	return str;
	};

// Replace &amp; HTML entities
TriumphalArch.Str.UnAmp = function(str)
	{
	str = str.replace(/&amp;/gi, "&");
	
	return str;
	};
	
TriumphalArch.Str.Trim_Brackets = function(str)
	{
	str = str.replace(/\(.+\)/gi, "");
	
	return str;
	};
	
TriumphalArch.Str.Trim_Accodances = function(str)
	{
	str = str.replace(/\[.+\]/gi, "");
	
	return str;
	};
	
TriumphalArch.Str.TwoDigit = function(val)
	{
	val = parseInt(val);
	if (val == 0)
		{
		val = "00";
		}
	else if (val < 10)
		{
		return "0"+val;
		}
	return val;
	};
	
TriumphalArch.Str.FormatBigNumber = function(num, alwaysShowSign)
	{
	var s = ""+num;
	if (num == undefined || s == "NaN")
		{
		return "-";
		}
	if (num == "?")
		{
		return num;
		}
		
	var negative = "";
	if (s.substring(0, 1) == "-")
		{
		negative = "-";
		s = s.substring(1);
		}
	else if (alwaysShowSign == true)
		{
		negative = "+";
		}
		
	var i = s.length-3;
	while (i > 0)
		{
		s = s.substring(0, i) + "." + s.substring(i);
		i -= 3;
		}
	return negative + s;
	};
	
TriumphalArch.Str.To_Integer = function(str, defaultValue)
	{
	// Support signed integers
	var temp = ""+str;
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp);
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN")))
		{
		return defaultValue;
		}
	return temp;
	};

TriumphalArch.Handlers =
	{
	_Parent: null
	};
	
TriumphalArch.Handlers.Init = function(parent)
	{
	this._Parent = parent;
	};
	
TriumphalArch.Handlers.Attach_CombatReports_Events = function()
	{
	var taButtonNextCR = document.getElementById("taButtonNextCR");
	if (taButtonNextCR != null)
		taButtonNextCR.addEventListener('click', TriumphalArch.Handlers.taButtonNextCR_Click_Event, false);
	};
	
TriumphalArch.Handlers.taButtonNextCR_Click_Event = function(e)
	{
	TriumphalArch.Insert_Next_CombatReports();
	}
	
TriumphalArch.Log =
	{
	_Parent: null,
	_Enabled: false
	};
	
TriumphalArch.Log.Init = function(parent)
	{
	this._Parent = parent;
	};
	
TriumphalArch.Log.Add = function(msg)
	{
	if (this._Enabled == true)
		{
		GM_log(msg);
		}
	};
	
TriumphalArch.Init();