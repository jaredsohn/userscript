// ==UserScript==
// @name	Greasemonkey API Test
// @namespace	inge.org.uk/userscripts
// @description	Checks what Greasemonkey functionality is available in your browser.
// @include	http://userscripts.org/scripts/show/113181
// @resource	resourceScript http://inge.org.uk/userscripts/greasemonkey_api_test.user.js
// @resource	resourceIcon	http://inge.org.uk/userscripts/tick.png
// @version	0.1.0
// @copyright	2011, James Inge (http://inge.org.uk/userscripts)
// @license	MIT License; http://www.opensource.org/licenses/mit-license.php
// @attribution	Function Icon Set (http://wefunction.com/2008/07/function-free-icon-set/)
// ==/UserScript==

var iconTickSrc="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAB3RJTUUH2wkPFA8xLDcjMgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAARnQU1BAACxjwv8YQUAAAKfSURBVHjapZNLSFRRGMf%2F5955OU42Uz4mEVEj6IFESrlQSXJhtAh8jImLoIVBS4kWOrs2baONRLWoiMSVVNBCxYREbGEElcSEWSCNTPN%2B3Me595zOuYNFD9t04Nvc%2B%2F3%2B3%2F9833eA%2Fzzk9w%2Ftt%2BFvqq%2BJNIda%2BgIef6PNOM3q2fX1xIfZuUhpTqTwXQUGn9T2nmw48SBcpdYbdhwmy4NxBW4EQVgtPqXSK8vxlyPLw%2Fjyh0DkaXioq%2BnoY1t576K8KEAOmwGWDJuDivCRMDS9Nr66%2Bbp76aLx8YdA5wwazx9qf0fcsQATDrmAJWjbcEAZpgxLANwPZh5Ym8q8PYVh2IoUaAs3TyjujYCsKoNKUCRLyLA4NAPQiioMypEzitBZou0s2TcgWSlADJ4aShsmipRBE0nUkiLMAXSDoyc0ibHDM6C6B8USx9dvaTBKI45A90OEVdWq1gWU0zlSBQY92YJEliMp4nQwioHWKPZW1kHTfMjnhStTuKPmMSngUlzwMsZgWcRp1hFvP6503se9V%2BMI%2BsIYOh5FLLWG6MI5ZLSMczVb5Ilm%2BBwB6IjrJqGKm7st8XODrSKhbWKs4xYIIQ48OS%2FhtChQhuV0VEKcUSpLl6BT07NMqbTFsV3Ywo2VfiS1LcSSa5gQcLqUdipb1g6swuVxLZQdiJPRrZsVamWPSQugQuRzKYZr82eQ07KObelMbKQYb3lnKioqC4aRvPvLIvXP1kwHFHIhKyA5BQmVLZdtcydZQdC%2FHyVX7vLiaOGO5NQdgbq%2B0jPi9h%2BsUqtbqdgiXdzpp2UX9niDYhIhK6%2Bkxl%2BMFqd2fUy904HBKjV4VeXeDm47ewIbTDN48bmupK8vjtA3%2F3yNO6frEUIKdzcQH6HIm5uy2X%2FL%2Bw65tHx5vOIy1wAAAABJRU5ErkJggg%3D%3D";
var iconTick = "<img title='Pass' width='16' height='16' src='"+iconTickSrc+"' alt='Pass' />";
var iconCrossSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAEZ0FNQQAAsY58%2B1GTAAAAIGNIUk0AAHolAACAgwAA%2Bf8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIaSURBVHjapJPNaxNRFMV%2F82Yy%2BehgPhrbaqRqS0sRYgqp2blwIQhqwYUIohI3Cm76J7gVRagr1y61ErQlIOpCUKwVC91YKIK6SNu0krQxTTLpfDwXJjLGusqFB%2B%2Fexz33ct45ipSSbkLQZSjT4b9yHbgBZIF0q1YEHgN3WncAprZ%2Fb655mhNATlNFJtYXY%2F%2BhOD6%2Fj53t2kDx%2B%2FpUvWZec6W8BLzyTtQ8k3MBvy%2BTPDFK3LCQjS0cx6Y3HmIgMcLX5WJ0Y%2FXHrOPKNLDcyUFWU0UmmUrQq2yiJUYxd0zqmyVMN0AoMcTBuEI0ZgSA%2B3uReDUa9hOWW2jJUxy995zhh2%2FRJiY5%2Fug9Y3efEBlLoQsb4Aww2AmQDgehWWuw%2BGwBc62AMZok9WAGPRqntDDPp9w7LNtu9yW9ACqgq4pkV6r066u8uZlFug6KT8e1dnl55SJDgy6K%2BufXg14AB%2FhWb4JpWojhcU7PzKIIFem6CJ%2FO2bk8Wo%2BBrrjtvn9IfFqu2jSlTmTiJFrIYOvzErmJYzQ3Cuj7woigQbUBwIoXoC2kmFCUld5IMG6WGhw%2Bf4HC6xeMHJEUqn30OBZf1ooEQwKzaZ8D8m0htTcou1JOliuNsoj4KX2Yo%2F8AVG2BoW5QlWVChuruWs5tIL%2BXkADmHVcOVX6a0xW4vF6ydM%2FbInAL%2BNjpBa0jrwDXW2ccMIAlYOe%2FZurWzr8GAGVrwmQcelBKAAAAAElFTkSuQmCC";
var iconCross = "<img title='Fail' width='16' height='16' src='"+iconCrossSrc+"' alt='Fail' />";
var iconInfoSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89%2BbN%2FrXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz%2FSMBAPh%2BPDwrIsAHvgABeNMLCADATZvAMByH%2Fw%2FqQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf%2BbTAICd%2BJl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA%2Fg88wAAKCRFRHgg%2FP9eM4Ors7ONo62Dl8t6r8G%2FyJiYuP%2B5c%2BrcEAAAOF0ftH%2BLC%2BzGoA7BoBt%2FqIl7gRoXgugdfeLZrIPQLUAoOnaV%2FNw%2BH48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl%2FAV%2F1s%2BX48%2FPf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H%2FLcL%2F%2Fwd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s%2BwM%2B3zUAsGo%2BAXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93%2F%2B8%2F%2FUegJQCAZkmScQAAXkQkLlTKsz%2FHCAAARKCBKrBBG%2FTBGCzABhzBBdzBC%2FxgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD%2FphCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8%2BQ8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8%2BxdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR%2BcQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI%2BksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG%2BQh8lsKnWJAcaT4U%2BIoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr%2Bh0uhHdlR5Ol9BX0svpR%2BiX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK%2BYTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI%2BpXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q%2FpH5Z%2FYkGWcNMw09DpFGgsV%2FjvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY%2FR27iz2qqaE5QzNKM1ezUvOUZj8H45hx%2BJx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4%2FOBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up%2B6Ynr5egJ5Mb6feeb3n%2Bhx9L%2F1U%2FW36p%2FVHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm%2Beb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw%2B6TvZN9un2N%2FT0HDYfZDqsdWh1%2Bc7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc%2BLpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26%2FuNu5p7ofcn8w0nymeWTNz0MPIQ%2BBR5dE%2FC5%2BVMGvfrH5PQ0%2BBZ7XnIy9jL5FXrdewt6V3qvdh7xc%2B9j5yn%2BM%2B4zw33jLeWV%2FMN8C3yLfLT8Nvnl%2BF30N%2FI%2F9k%2F3r%2F0QCngCUBZwOJgUGBWwL7%2BHp8Ib%2BOPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo%2Bqi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt%2F87fOH4p3iC%2BN7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi%2FRNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z%2Bpn5mZ2y6xlhbL%2BxW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a%2FzYnKOZarnivN7cyzytuQN5zvn%2F%2FtEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1%2B1dT1gvWd%2B1YfqGnRs%2BFYmKrhTbF5cVf9go3HjlG4dvyr%2BZ3JS0qavEuWTPZtJm6ebeLZ5bDpaql%2BaXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO%2FPLi8ZafJzs07P1SkVPRU%2BlQ27tLdtWHX%2BG7R7ht7vPY07NXbW7z3%2FT7JvttVAVVN1WbVZftJ%2B7P3P66Jqun4lvttXa1ObXHtxwPSA%2F0HIw6217nU1R3SPVRSj9Yr60cOxx%2B%2B%2Fp3vdy0NNg1VjZzG4iNwRHnk6fcJ3%2FceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w%2B0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb%2B%2B6EHTh0kX%2Fi%2Bc7vDvOXPK4dPKy2%2BUTV7hXmq86X23qdOo8%2FpPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb%2F1tWeOT3dvfN6b%2FfF9%2FXfFt1%2Bcif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v%2B3Njv3H9qwHeg89HcR%2FcGhYPP%2FpH1jw9DBY%2BZj8uGDYbrnjg%2BOTniP3L96fynQ89kzyaeF%2F6i%2FsuuFxYvfvjV69fO0ZjRoZfyl5O%2FbXyl%2FerA6xmv28bCxh6%2ByXgzMV70VvvtwXfcdx3vo98PT%2BR8IH8o%2F2j5sfVT0Kf7kxmTk%2F8EA5jz%2FGMzLdsAAAAEZ0FNQQAAsY58%2B1GTAAAAIGNIUk0AAHolAACAgwAA%2Bf8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJVSURBVHjapNNLSFRhGMbx%2F%2Fed75xxxmYcHacb3lLDbo4EEWSElYuQqEC6LKMgWxQuwlpECeUmiVoE0SIIym6EErSIFkHgNgQhIhAj05JK1HHUmTPn9rUIAlEx6Fm%2Bz8tv9witNf8T9a4zumxpB%2BG%2BrCtjc5nMOdOSQ0sCAHs6biwqXl7vurC2WLSWbm1i%2BP3bXu3bqaUAudTxblt7vKw82VW5ezfbD6YwLXOb4%2BgT%2FwxU11bc0vZkpGxzEpUfZUdLsyiIFNwDjBWB%2B%2Bc7qkqi3smNexuYTecYH%2F5M5ZYoRYniuOfL7hWB6po1TyIxw0jU1vCqb4Cehx%2FB%2B8LOI3uFZcn2INClywJPL11uChuzjZuaN6Olz%2BjoBPN5D2EMEV%2BtqNpaawqhni0LlJVFH6yvjWGVNCC9N1ihAMvSYPxAZl7TcGAfypL7PVfvWgT0Xu1sU3quuiK1jmB%2BAJEboTThU5KQYOfw7DFUfpBUY500LfPhAuDu2Y7QuqRxs7w6hE8hzs9%2B7DQcatG0HgYnDW4W7PF%2BNtTFCYVVjeuKM3%2BByvLCO0o4sVgUcuMfcGYcgiy8eK55%2FMgllxY4s%2BBkHOZHBqmvj0srJG%2B7ri5QgBWPeKeTxS7ZGQGZGWQIvDyEC1Zhmhb2dAbf8QlsCOxfhI08RTFz1dQ0PUoIeUr7jqFzGq9ojlBcYxaDWQjH6r4h1R%2FMy4E7A%2FkpTfb7HAmpSAujRU3Muv1CRcamJ4yomBRCiJUXGARa60A7SuW%2FKj%2Fg09Er16oAo7fzorfgUctlkeNd3Qrwfw8AgADksO12ay4AAAAASUVORK5CYII%3D";
var iconInfo = "<img width='16' height='16' src='"+iconInfoSrc+"' alt='Info' />";


var testSafeVar = 'TestingTesting123';  // Shouldn't be visible to content scripts
var s1 = document.createElement('script');
s1.type = 'text/javascript';
s1.innerHTML = 'var unsafeVarTest = "TestingTesting123";'; // Should be visible via unsafeWindow
document.documentElement.firstChild.appendChild(s1);

document.getElementById("content").innerHTML = "<h3>Greasemonkey API Test</h3>\
	<div id='summary'>\
		<b>Script Summary:</b> Checks what Greasemonkey functionality is available in your browser.<br/>\
		<b>Version:</b> 0.1.0<br/>\
		<b>Code:</b> Copyright	2011, James Inge. Reusable under the <a href='http://www.opensource.org/licenses/mit-license.php'>MIT License</a><br/><br/>\
	</div>\
	<h3>Test Results</h3>\
	<ul style='list-style-type:none;'><li>"+iconTick+" Userscript functionality detected</li></ul>\
	<h4>Storage</h4>\
	<ul id='storeResultList' style='list-style-type:none;'></ul>\
	<h4>Network Resources</h4>\
	<ul id='netResultList' style='list-style-type:none;'></ul>\
	<h4>Other</h4>\
	<ul id='resultList' style='list-style-type:none;'></ul>\
	<h3>Manual tests</h3>\
	<ul id='testList' style='list-style-type:none;'></ul>\
	<hr/>\
	<p>Function Icon Set from <a href='http://wefunction.com/2008/07/function-free-icon-set/'>http://wefunction.com/2008/07/function-free-icon-set/</a></p>";

function addItem( list, html ) {
  var target = document.getElementById(list);
  if( list ) {
  	var li = document.createElement("li");
  	li.innerHTML = html;
  	target.appendChild(li);
  }
}

if( typeof GM_setValue != "undefined") {
	addItem("storeResultList", iconTick+" <strong>GM_setValue</strong> present");
} else {
	addItem("storeResultList", iconCross+" <strong>GM_setValue</strong> not present");
}

if( typeof GM_getValue != "undefined" ) {
	addItem("storeResultList", iconTick+" <strong>GM_getValue</strong> present");
} else {
	addItem("storeResultList", iconCross+" <strong>GM_getValue</strong> not present");
}

if( typeof GM_listValues != "undefined" ) {
	addItem("storeResultList", iconTick+" <strong>GM_listValues</strong> present");
} else {
	addItem("storeResultList", iconCross+" <strong>GM_listValues</strong> not present");
}

if( typeof GM_deleteValue != "undefined" ) {
	addItem("storeResultList", iconTick+" <strong>GM_deleteValue</strong> present");
} else {
	addItem("storeResultList", iconCross+" <strong>GM_deleteValue</strong> not present");
}

if( typeof GM_setValue != "undefined" && typeof GM_getValue != "undefined" && typeof GM_listValues != "undefined" && typeof GM_setValue != "undefined" ) {
	GM_setValue("transientValue", "ABCD1234");
	if( GM_getValue("transientValue", "") == "ABCD1234") {
		addItem("storeResultList", iconTick + " <strong>GM_setValue</strong> & <strong>GM_getValue</strong> function together as expected");
		var foundList = false;
		var myList = GM_listValues();
		for( var i = 0, j=myList.length; i<j; i++) {
			if( myList[i] == "transientValue" ) foundList = true;
		}
		if( foundList ) {
			addItem("storeResultList", iconTick + " <strong>GM_listValues</strong> functions as expected");		
		} else {
			addItem("storeResultList", iconCross + " <strong>GM_listValues</strong> does not function as expected");		
		}
		GM_deleteValue("transientValue");
		if( GM_getValue("transientValue", "unset") == "unset") {
			addItem("storeResultList", iconTick + " <strong>GM_deleteValue</strong> functions as expected");		
		} else {
			addItem("storeResultList", iconCross + " <strong>GM_deleteValue</strong> does not function as expected");		
		}
		if(GM_getValue("persistentValue", "") == "TestingTesting123") {
			addItem("storeResultList", iconTick + " <strong>GM_getValue</strong> successfully retrieved a value from a previous test session");
		} else {
			addItem("testList", iconInfo + " Reload the page to check whether <strong>GM_getValue</strong> can retrieve a value from a previous session. If you've already done this, it didn't work!");
			GM_setValue("persistentValue", "TestingTesting123");
		}
	} else {
		addItem("storeResultList", iconCross + " Couldn't set a record with <strong>GM_setValue</strong> then retrieve it with <strong>GM_getValue</strong>");
	}
}

if( typeof GM_getResourceURL != "undefined" ) {
	addItem("netResultList", iconTick+" <strong>GM_getResourceURL</strong> present");
	var testResourceIcon = GM_getResourceURL("resourceIcon");
	addItem("testList", "<img src='"+testResourceIcon+"' width='16' height='16' alt='[F]' /> <strong>GM_getResourceURL</strong> works if you can see a tick next to this text, or fails if you just see an 'F'.");
} else {
	addItem("netResultList", iconCross+" <strong>GM_getResourceURL</strong> not present");
}

if( typeof GM_getResourceText != "undefined" ) {
// Value to find via @resource: testResourceScriptOK
	addItem("netResultList", iconTick+" <strong>GM_getResourceText</strong> present");
	var testResourceScript = GM_getResourceText("resourceScript");
	if( /testResourceScriptOK/.test(testResourceScript)) {
		addItem("netResultList", iconTick+" <strong>GM_getResourceText</strong> loads resource OK");
	} else {
		addItem("netResultList", iconCross+" <strong>GM_getResourceText</strong> resource load failed");
	}
} else {
	addItem("netResultList", iconCross+" <strong>GM_getResourceText</strong> not present");
}

if( typeof GM_xmlhttpRequest != "undefined" ) {
	addItem("netResultList", iconTick+" <strong>GM_xmlhttpRequest</strong> present");
	function XHRtest1pass(response) {
		if( response.status < 400) {
			addItem( "netResultList", iconTick + " cross-site XMLhttpRequest succeeded" );
		} else {
			addItem( "netResultList", iconCross + " cross-site XMLhttpRequest reported completion, but with a status code for failure. (" + response.status +")" );
		}
	}
	function XHRtest1fail(response) {
		if( response.status < 400) {
			addItem( "netResultList", iconCross + " cross-site XMLhttpRequest reported error, but gave success status code (" + response.status +")" );
		} else {
			addItem( "netResultList", iconInfo + " cross-site XMLhttpRequest failed, but gave valid status code (" + response.status +") (might not be a Greasemonkey issue)." );
		}
	}
	function XHRtest2pass(response) {
		if( response.status < 400) {
			addItem( "netResultList", iconTick + " same-site XMLhttpRequest succeeded" );
		} else {
			addItem( "netResultList", iconCross + " cross-site XMLhttpRequest reported completion, but with a status code for failure. (" + response.status +")" );
		}
	}

	function XHRtest2fail(response) {
		if( response.status < 400) {
			addItem( "netResultList", iconCross + " same-site XMLhttpRequest reported error, but gave success status code (" + response.status +")" );
		} else {
			addItem( "netResultList", iconInfo + " same-site XMLhttpRequest failed, but gave valid status code (" + response.status +") (might not be a Greasemonkey issue)." );
		}
	}

	// Test cross-site XHR
	GM_xmlhttpRequest({
		url: "http://inge.org.uk/userscripts/tick.png",
		method: "HEAD",
		onload: XHRtest1pass,
		onerror: XHRtest1fail
	});
	// Test same-site XHR
	GM_xmlhttpRequest({
		url: "http://userscripts.org/",
		method: "HEAD",
		onload: XHRtest2pass,
		onerror: XHRtest2fail
	});
} else {
	addItem("netResultList", iconCross+" <strong>GM_xmlhttpRequest</strong> not present");
}

if( typeof GM_addStyle != "undefined" ) {
	addItem("resultList", iconTick+" <strong>GM_addStyle</strong> present");
	addItem("testList", "<img id='testCSSgood' src='"+iconTickSrc+"' title='Pass' width='16' height='16' /><img src='"+iconCrossSrc+"' title='Fail' width='16' height='16' id='testCSSbad' /> <strong>GM_addStyle</strong> works if you can see a tick next to this text, or fails if you see a cross");
	document.getElementById('testCSSgood').style.display = "none";
	GM_addStyle("#testCSSgood{display:inline !important;}#testCSSbad{display:none;}");
} else {
	addItem("resultList", iconCross+" <strong>GM_addStyle</strong> not present");
}

if( typeof GM_registerMenuCommand != "undefined" ) {
	addItem("resultList", iconTick+" <strong>GM_registerMenuCommand</strong> present");
	addItem("testList", "<span id='menuTest'>"+iconInfo+" Choose 'API Test' from the Greasemonkey menu to confirm <strong>GM_registerMenuCommand</strong> works</span>");
	function apiMenuTest() {
		document.getElementById("menuTest").innerHTML=iconTick+" <strong>GM_registerMenuCommand</strong> functions properly";
	}
	GM_registerMenuCommand("API Test", apiMenuTest);
} else {
	addItem("resultList", iconCross+" <strong>GM_registerMenuCommand</strong> not present");
}

if( typeof GM_openInTab != "undefined") {
	addItem("resultList", iconTick+" <strong>GM_openInTab</strong> present");
	addItem("testList", iconInfo + " <strong>GM_openInTab</strong>: <a id='GM_openInTab_test'>Test</a> - this link should open in a new tab");
	var tabTest = "data:text/html;charset=utf-8;base64,PGh0bWw%2BPGhlYWQ%2BPHRpdGxlPkdyZWFzZW1vbmtleSBBUEkgVGVzdDwvdGl0bGU%2BPC9oZWFkPjxib2R5IHN0eWxlPSJmb250LWZhbWlseTogSGVsdmV0aWNhIE5ldWUsQXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7Ij48aDEgc3R5bGU9ImJhY2tncm91bmQ6ICMzMzM7Ym9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM5OTk7Y29sb3I6ICNmZmY7cGFkZGluZzogNHB4IDEwcHggNXB4O2ZvbnQtc2l6ZTogMS41ZW07bWFyZ2luLWJvdHRvbTogMWVtOyI%2BR01fb3BlbkluVGFiIFRlc3Q8L2gxPjxwPjxpbWcgc3JjPSdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUJBQUFBQVFDQVlBQUFBZjglMkY5aEFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFLVDJsRFExQlFhRzkwYjNOb2IzQWdTVU5ESUhCeWIyWnBiR1VBQUhqYW5WTm5WRlBwRmozMzN2UkNTNGlBbEV0dlVoVUlJRkpDaTRBVWtTWXFJUWtRU29naG9ka1ZVY0VSUlVVRUc4aWdpQU9Pam9DTUZWRXNESW9LMkFma0lhS09nNk9JaXNyNzRYdWphOWE4OSUyQmJOJTJGclhYUHVlczg1Mnp6d2ZBQ0F5V1NETlJOWUFNcVVJZUVlQ0R4OFRHNGVRdVFJRUtKSEFBRUFpelpDRnolMkZTTUJBUGglMkJQRHdySXNBSHZnQUJlTk1MQ0FEQVRadkFNQnlIJTJGdyUyRnFRcGxjQVlDRUFjQjBrVGhMQ0lBVUFFQjZqa0ttQUVCR0FZQ2RtQ1pUQUtBRUFHRExZMkxqQUZBdEFHQW5mJTJCYlRBSUNkJTJCSmw3QVFCYmxDRVZBYUNSQUNBVFpZaEVBR2c3QUt6UFZvcEZBRmd3QUJSbVM4UTVBTmd0QURCSlYyWklBTEMzQU1ET0VBdXlBQWdNQURCUmlJVXBBQVI3QUdESUl5TjRBSVNaQUJSRzhsYzg4U3V1RU9jcUFBQjRtYkk4dVNRNVJZRmJDQzF4QjFkWExoNG96a2tYS3hRMllRSmhta0F1d25tWkdUS0JOQSUyRmc4OHdBQUtDUkZSSGdnJTJGUDllTTRPcnM3T05vNjJEbDh0NnI4RyUyRnlKaVl1UCUyQjVjJTJCcmNFQUFBT0YwZnRIJTJCTEMlMkJ6R29BN0JvQnQlMkZxSWw3Z1JvWGd1Z2RmZUxacklQUUxVQW9PbmFWJTJGTnclMkJINDhQRVdoa0xuWjJlWGs1TmhLeEVKYlljcFhmZjVud2wlMkZBViUyRjFzJTJCWDQ4JTJGUGYxNEw3aUpJRXlYWUZIQlBqZ3dzejBUS1VjejVJSmhHTGM1bzlIJTJGTGNMJTJGJTJGd2QweUxFU1dLNVdDb1U0MUVTY1k1RW1venpNcVVpaVVLU0tjVWwwdjlrNHQ4cyUyQndNJTJCM3pVQXNHbyUyQkFYdVJMYWhkWXdQMlN5Y1FXSFRBNHZjQUFQSzdiOEhVS0FnRGdHaUQ0YzkzJTJGJTJCOCUyRiUyRlVlZ0pRQ0Faa21TY1FBQVhrUWtMbFRLc3olMkZIQ0FBQVJLQ0JLckJCRyUyRlRCR0N6QUJoekJCZHpCQyUyRnhnTm9SQ0pNVENRaEJDQ21TQUhISmdLYXlDUWlpR3piQWRLbUF2MUVBZE5NQlJhSWFUY0E0dXdsVzREajF3RCUyRnBoQ0o3QktMeUJDUVJCeUFnVFlTSGFpQUZpaWxnampnZ1htWVg0SWNGSUJCS0xKQ0RKaUJSUklrdVJOVWd4VW9wVUlGVklIZkk5Y2dJNWgxeEd1cEU3eUFBeWd2eUd2RWN4bElHeVVUM1VETFZEdWFnM0dvUkdvZ3ZRWkhReG1vOFdvSnZRY3JRYVBZdzJvZWZRcTJnUDJvOCUyQlE4Y3d3T2dZQnpQRWJEQXV4c05Dc1Rnc0NaTmp5N0VpckF5cnhocXdWcXdEdTRuMVk4JTJCeGR3UVNnVVhBQ1RZRWQwSWdZUjVCU0ZoTVdFN1lTS2dnSENRMEVkb0pOd2tEaEZIQ0p5S1RxRXUwSnJvUiUyQmNRWVlqSXhoMWhJTENQV0VvOFRMeEI3aUVQRU55UVNpVU15SjdtUUFrbXhwRlRTRXRKRzBtNVNJJTJCa3NxWnMwU0Jvams4bmFaR3V5QnptVUxDQXJ5SVhrbmVURDVEUGtHJTJCUWg4bHNLbldKQWNhVDRVJTJCSW9Vc3BxU2hubEVPVTA1UVpsbURKQlZhT2FVdDJvb1ZRUk5ZOWFRcTJodGxLdlVZZW9FelIxbWpuTmd4WkpTNld0b3BYVEdtZ1hhUGRwciUyQmgwdWhIZGxSNU9sOUJYMHN2cFIlMkJpWDZBUDBkd3dOaGhXRHg0aG5LQm1iR0FjWVp4bDNHSyUyQllUS1laMDRzWngxUXdOekhybU9lWkQ1bHZWVmdxdGlwOEZaSEtDcFZLbFNhVkd5b3ZWS21xcHFyZXFndFY4MVhMVkklMkJwWGxOOXJrWlZNMVBqcVFuVWxxdFZxcDFRNjFNYlUyZXBPNmlIcW1lb2IxUSUyRnBINVolMkZZa0dXY05NdzA5RHBGR2dzViUyRmp2TVlnQzJNWnMzZ3NJV3NOcTRaMWdUWEVKckhOMlh4MktydVklMkZSMjdpejJxcWFFNVF6TktNMWV6VXZPVVpqOEg0NWh4JTJCSngwVGdubktLZVg4MzZLM2hUdktlSXBHNlkwVExreFpWeHJxcGFYbGxpclNLdFJxMGZydlRhdTdhZWRwcjFGdTFuN2dRNUJ4MG9uWENkSFo0JTJGT0JaM25VOWxUM2FjS3B4Wk5QVHIxcmk2cWE2VWJvYnRFZDc5dXAlMkI2WW5yNWVnSjVNYjZmZWViM24lMkJoeDlMJTJGMVUlMkZXMzZwJTJGVkhERmdHc3d3a0J0c016aGc4eFRWeGJ6d2RMOGZiOFZGRFhjTkFRNlZobFdHWDRZU1J1ZEU4bzlWR2pVWVBqR25HWE9NazQyM0diY2FqSmdZbUlTWkxUZXBON3BwU1RibW1LYVk3VER0TXg4M016YUxOMXBrMW16MHgxekxubSUyQmViMTV2ZnQyQmFlRm9zdHFpMnVHVkpzdVJhcGxudXRyeHVoVm81V2FWWVZWcGRzMGF0bmEwbDFydXR1NmNScDdsT2swNnJudFpudzdEeHRzbTJxYmNac09YWUJ0dXV0bTIyZldGblloZG50OFd1dyUyQjZUdlpOOXVuMk4lMkZUMEhEWWZaRHFzZFdoMSUyQmM3UnlGRHBXT3Q2YXpwenVQMzNGOUpicEwyZFl6eERQMkRQanRoUExLY1JwblZPYjAwZG5GMmU1YzRQemlJdUpTNExMTHBjJTJCTHBzYnh0M0l2ZVJLZFBWeFhlRjYwdldkbTdPYnd1Mm8yNiUyRnVOdTVwN29mY244dzBueW1lV1ROejBNUElRJTJCQlI1ZEUlMkZDNSUyQlZNR3Zmckg1UFEwJTJCQlo3WG5JeTlqTDVGWHJkZXd0NlYzcXZkaDd4YyUyQjlqNXluJTJCTSUyQjR6dzMzakxlV1YlMkZNTjhDM3lMZkxUOE52bmwlMkJGMzBOJTJGSSUyRjlrJTJGM3IlMkYwUUNuZ0NVQlp3T0pnVUdCV3dMNyUyQkhwOEliJTJCT1B6cmJaZmF5MmUxQmpLQzVRUlZCajRLdGd1WEJyU0ZveU95UXJTSDM1NWpPa2M1cERvVlFmdWpXMEFkaDVtR0x3MzRNSjRXSGhWZUdQNDV3aUZnYTBUR1hOWGZSM0VOejMwVDZSSlpFM3B0bk1VODVyeTFLTlNvJTJCcWk1cVBObzN1alM2UDhZdVpsbk0xVmlkV0Vsc1N4dzVMaXF1Tm01c3Z0JTJGODdmT0g0cDNpQyUyQk43RjVndnlGMXdlYUhPd3ZTRnB4YXBMaElzT3BaQVRJaE9PSlR3UVJBcXFCYU1KZklUZHlXT0NubkNIY0puSWklMkZSTnRHSTJFTmNLaDVPOGtncVRYcVM3Skc4Tlhra3hUT2xMT1c1aENlcGtMeE1EVXpkbXpxZUZwcDJJRzB5UFRxOU1ZT1NrWkJ4UXFvaFRaTzJaJTJCcG41bVoyeTZ4bGhiTCUyQnhXNkx0eThlbFFmSmE3T1FyQVZaTFFxMlFxYm9WRm9vMXlvSHNtZGxWMmElMkZ6WW5LT1phcm5pdk43Y3l6eXR1UU41enZuJTJGJTJGdEVzSVM0WksycFlaTFZ5MGRXT2E5ckdvNXNqeHhlZHNLNHhVRks0WldCcXc4dUlxMkttM1ZUNnZ0VjVldWZyMG1lazFyZ1Y3QnlvTEJ0UUZyNnd0VkN1V0ZmZXZjMSUyQjFkVDFndldkJTJCMVlmcUduUnMlMkJGWW1LcmhUYkY1Y1ZmOWdvM0hqbEc0ZHZ5ciUyQlozSlMwcWF2RXVXVFBadEptNmViZUxaNWJEcGFxbCUyQmFYRG00TjJkcTBEZDlXdE8zMTlrWGJMNWZOS051N2c3WkR1YU8lMkZQTGk4WmFmSnpzMDdQMVNrVlBSVSUyQmxRMjd0TGR0V0hYJTJCRzdSN2h0N3ZQWTA3TlhiVzd6MyUyRlQ3SnZ0dFZBVlZOMVdiVlpmdEolMkI3UDNQNjZKcXVuNGx2dHRYYTFPYlhIdHh3UFNBJTJGMEhJdzYyMTduVTFSM1NQVlJTajlZcjYwY094eCUyQiUyQiUyRnAzdmR5ME5OZzFWalp6RzRpTndSSG5rNmZjSjMlMkZjZURUcmFkb3g3ck9FSDB4OTJIV2NkTDJwQ212S2FScHRUbXZ0YllsdTZUOHclMkIwZGJxM25yOFI5c2ZENXcwUEZsNVN2TlV5V25hNllMVGsyZnl6NHlkbFoxOWZpNzUzR0Rib3JaNzUyUE8zMm9QYiUyQiUyQjZFSFRoMGtYJTJGaSUyQmM3dkR2T1hQSzRkUEt5MiUyQlVUVjdoWG1xODZYMjNxZE9vOCUyRnBQVFQ4ZTduTHVhcnJsY2E3bnVlcjIxZTJiMzZSdWVOODdkOUwxNThSYiUyRjF0V2VPVDNkdmZONmIlMkZmRjklMkZYZkZ0MSUyQmNpZjl6c3U3MlhjbjdxMjhUN3hmOUVEdFFkbEQzWWZWUDF2JTJCM05qdjNIOXF3SGVnODlIY1IlMkZjR2hZUFAlMkZwSDFqdzlEQlklMkJaajh1R0RZYnJuamclMkJPVG5pUDNMOTZmeW5RODlrenlhZUYlMkY2aSUyRnN1dUZ4WXZmdmpWNjlmTzBaalJvWmZ5bDVPJTJGYlh5bCUyRmVyQTZ4bXYyOGJDeGg2JTJCeVhnek1WNzBWdnZ0d1hmY2R4M3ZvOThQVCUyQlI4SUg4byUyRjJqNXNmVlQwS2Y3a3htVGslMkY4RUE1anolMkZHTXpMZHNBQUFBRVowRk5RUUFBc1k1OCUyQjFHVEFBQUFJR05JVWswQUFIb2xBQUNBZ3dBQSUyQmY4QUFJRHBBQUIxTUFBQTZtQUFBRHFZQUFBWGI1SmZ4VVlBQUFKVlNVUkJWSGphcE5OTFNGUmhHTWJ4JTJGJTJGZWQ3NXh4eG1ZY0hhY2IzbExEYm80RUVXU0VsWXVRcUVDNkxLTWdXeFF1d2xwRUNlVW1pVm9FMFNJSXltNkVFclNJRmtIZ05nUWhJaEFqMDVKSzFISFVtVFBuOXJVSUFsRXg2Rm0lMkJ6OHR2OXdpdE5mOFQ5YTR6dW14cEIlMkJHJTJCckN0amM1bk1PZE9TUTBzQ0FIczZiaXdxWGw3dnVyQzJXTFNXYm0xaSUyQlAzYlh1M2JxYVVBdWRUeGJsdDd2S3c4MlZXNWV6ZmJENll3TFhPYjQlMkJnVCUyRnd4VTExYmMwdlprcEd4ekVwVWZaVWRMc3lpSUZOd0RqQldCJTJCJTJCYzdxa3FpM3NtTmV4dVlUZWNZSCUyRjVNNVpZb1JZbml1T2ZMN2hXQjZwbzFUeUl4dzBqVTF2Q3FiNENlaHglMkZCJTJCOExPSTN1RlpjbjJJTkNseXdKUEwxMXVDaHV6alp1YU42T2x6JTJCam9CUE41RDJFTUVWJTJCdHFOcGFhd3FobmkwTGxKVkZINnl2aldHVk5DQzlOMWloQU12U1lQeEFabDdUY0dBZnlwTDdQVmZ2V2dUMFh1MXNVM3F1dWlLMWptQiUyQkFKRWJvVFRoVTVLUVlPZnc3REZVZnBCVVk1MDBMZlBoQXVEdTJZN1F1cVJ4czd3NmhFOGh6czklMkI3RFFjYXRHMEhnWW5EVzRXN1BGJTJCTnRURkNZVlZqZXVLTTMlMkJCeXZMQ08wbzRzVmdVY3VNZmNHWWNnaXk4ZUs1NSUyRk1nbGx4WTRzJTJCQmtIT1pIQnFtdmowc3JKRyUyQjdyaTVRZ0JXUGVLZVR4UzdaR1FHWkdXUUl2RHlFQzFaaG1oYjJkQWJmOFFsc0NPeGZoSTA4UlRGejFkUTBQVW9JZVVyN2pxRnpHcTlvamxCY1l4YURXUWpINnI0aDFSJTJGTXk0RTdBJTJGa3BUZmI3SEFtcFNBdWpSVTNNdXYxQ1JjYW1KNHlvbUJSQ2lKVVhHQVJhNjBBN1N1VyUyRktqJTJGZzA5RXIxNm9Bbzdmem9yZmdVY3Rsa2VOZDNRcndmdzhBZ0FEa3NPMTJheTRBQUFBQVNVVk9SSzVDWUlJJTNEJyBoZWlnaHQ9JzE2JyB3aWR0aD0nMTYnIGFsdD0nSW5mbycgLz4gVGhpcyBwYWdlIHNob3VsZCBoYXZlIG9wZW5lZCBpbiBhIG5ldyB0YWIuPC9wPjwvYm9keT48L2h0bWw%2B";
	function openTabTest(e) {
		GM_openInTab(tabTest);
		return false;
	}
	var tabLink = document.getElementById('GM_openInTab_test')
	if(tabLink){
		tabLink.addEventListener("click", openTabTest, false);
	}
} else {
	addItem("resultList", iconCross+" <strong>GM_openInTab</strong> not present");
}

if( typeof GM_log != "undefined" ) {
	addItem("resultList", iconTick+" <strong>GM_log</strong> present");
	addItem("testList", iconInfo + " <strong>GM_log</strong>: <a id='GM_log_test'>Test</a> - Clicking this link should give this message should appear in your browser's console: 'API Test: GM_log OK'");
	function logTest(e) {
		GM_log("API Test: GM_log OK" );
		return false;
	}
	var logLink = document.getElementById('GM_log_test')
	if(logLink){
		logLink.addEventListener("click", logTest, false);
	}
} else {
	addItem("resultList", iconCross+" <strong>GM_log</strong> not present");
}

if( typeof unsafeWindow != "undefined") {
	addItem("resultList", iconTick+" <strong>unsafeWindow</strong> present");
	try {
		if( unsafeWindow.unsafeVarTest == 'TestingTesting123' ) {
			addItem("resultList", iconTick+" <strong>unsafeWindow</strong> gives access to content variables");
		} else {
			addItem("resultList", iconCross+" <strong>unsafeWindow</strong> fails to give access to content variables");
		}
	} catch(e) {}
} else {
	addItem("resultList", iconCross+" <strong>unsafeWindow</strong> not present");
}

var varTestOK = iconTick +" script variables protected from page content";
var varTestBad = iconCross +" script variables exposed to page content";
var s2 = document.createElement('script');
s2.type = "text/javascript";
s2.innerHTML = 'var myLi = document.createElement("li");if(typeof testSafeVar == "undefined"){myLi.innerHTML = "'+varTestOK+'";}else{myLi.innerHTML = "'+varTestBad+'";}document.getElementById("resultList").appendChild(myLi);';
document.documentElement.firstChild.appendChild(s2);
