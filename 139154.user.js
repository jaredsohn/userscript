// ==UserScript==
// @name           Flickr Conversation Backup
// @namespace      http://www.flickr.com/alesadam
// @description    This Greasemonkey script / Chrome extension allows to make a backup copy of Flickr conversations.
// @creator        Aleas Dam (http://flickr.com/alesadam/)
// @date           15/06/2012
// @version        1.5
// @modified	   Aug. 22, 2013
//
// @include        http://www.flickr.com/groups/*/discuss*
// @match          http://www.flickr.com/groups/*/discuss*
//
// @downloadURL	   https://userscripts.org/scripts/source/139154.user.js
// @updateURL	   https://userscripts.org/scripts/source/139154.meta.js
//
// @grant	   GM_getValue
// @grant	   GM_setValue
// @grant	   GM_deleteValue
// @grant	   GM_listValues
// @grant	   GM_log
// @grant	   GM_addStyle
// @run-at	   document-end
// ==/UserScript==
//

(function () {
var FCBversion = "1.5";

var debug = false; //document.location.href.match('api');

var images = {
    error: 'http://l.yimg.com/g/images/icon_error_x_small.png',
    success: 'http://l.yimg.com/g/images/icon_check_small.png',
    updating: 'http://www.flickr.com/images/pulser2.gif',
    backup: 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAK'	+
	'T2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AU'	+
	'kSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXX'	+
	'Pues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgAB'	+
	'eNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAt'	+
	'AGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3'	+
	'AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dX'	+
	'Lh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+'	+
	'5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk'	+
	'5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd'	+
	'0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA'	+
	'4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzA'	+
	'BhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/ph'	+
	'CJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5'	+
	'h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+'	+
	'Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhM'	+
	'WE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQ'	+
	'AkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+Io'	+
	'UspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdp'	+
	'r+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZ'	+
	'D5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61Mb'	+
	'U2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY'	+
	'/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllir'	+
	'SKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79u'	+
	'p+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6Vh'	+
	'lWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1'	+
	'mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lO'	+
	'k06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7Ry'	+
	'FDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3I'	+
	'veRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+B'	+
	'Z7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/'	+
	'0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5p'	+
	'DoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5q'	+
	'PNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIs'	+
	'OpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5'	+
	'hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQ'	+
	'rAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9'	+
	'rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1d'	+
	'T1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aX'	+
	'Dm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7'	+
	'vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3S'	+
	'PVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKa'	+
	'RptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO'	+
	'32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21'	+
	'e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfV'	+
	'P1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i'	+
	'/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8'	+
	'IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACA'	+
	'gwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMSSURBVHjaRJJPTFxVFMZ/5943zAAzQCGF'	+
	'lmJJCwkmokUMGq1xY11YrTWpbsQm3dbUTXdGVya6c1mjceFOE0Nq/BdN2qRpoyaKNhQi2gKLgsA8'	+
	'FB5TkJn35t57XPCnu7M4J9/vfN8nqoqqAjA7O/eIMfJcLpd7Isuyw6pq8vn8YpbVf3PeXX1wYOCX'	+
	'3V0AEQFV5c6dmYFbk5NfLS0v+2q1qs459d6r916dc1qr1bRcjvXW5NS1yT+mH1dVJiamUFVkZmb2'	+
	'ocXlpRs9h3raGxpyOO/REBA1YIEAxgjWWlSVu/N301Kx9fljxwavAcjY5S+vd3cffMYai3MBawUR'	+
	'QQRAAEV1m9SKIFHEwvz83MunX+oHiJK15Ml97R1s/beJNQZjLGINRmTnHFDFq6JBKTQ1oqp9uz5E'	+
	'1Wq1/s9KnHPOYa0lshHWGsQYtj0C1YAPSvCeaq1KpVLZc9K0tbVKHK8QguK8xzmHcw7vPc4HfAgE'	+
	'FwjeYaxlZTmmudi8l0RUq9WkVCySZSn7OzpoKDSSy0WIsYjZeSModVfn/JV23upfxbsgewRNxaKu'	+
	'riXE5Zi1JKFW3WJtLSFLq9TrKZUk4V5lnfNX2pHhXt6fHqJQyO8RGINE/X1HiOMVbvz4E2IjDnR1'	+
	'Uq+lVDe3aGlp4eLPD9B0agiAtt59XLx+6H6ZLn340aoxpr25uQkRQxyXMZEhrTlQ5ZPkBE0vDoFA'	+
	'bTGhtJSAQGU+Ye6Dx0TeuPDm1RdOnnz2m2+/QzCcO/c6XV1dlMsxr13Ocb8NYIZ76bu9sC2tMFOp'	+
	'I2NjY2em//zr0/7+/lKapZQXyxSaCqSpA6MU8nnSNOXjf09ghg/Td3uBs0enLoyOjl4CkBBC1/j4'	+
	'+Kufff7F24o58MqZ03Tu7+TexjohQKlUorKecPbrRuTRbYLv33n4CPC3iLgIWB0ZGRkbHBxc+P3m'	+
	'zVNLi4tPra2u9mxsbuVDUFpbi1mWpiv4vqO76MCSiDhVJdoZ4sbGxh+ePn78V6C7Xq8f9M61Koi1'	+
	'dqOhoSF+d2LyvbqQIXgRyXZT+H8Ahg+W9NfaIEkAAAAASUVORK5CYII=',
	diff: 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wHDBASK5mwP78AAAKfSURBVDjL' +
	'bZPPaxRnGMc/78w7M7uzM9nZNDOr6YpbK0i0BmxxBfVQQ39BKVTQo/Q/EIooXrwJuQiKJ6GX4sWb' +
	'x/ZgKdQiaEoRLx6kEoiNFLKNO5txJzs7+z4eYnLQfa7P83ye5/vwfRRHzn/fOX7q+u64HjEhjDHm' +
	'/qMnv6cvnpzj6e3Nd/O6c/zU9V+vLrQ3i2JSPwp4cLh35uzii7vAnfcAu+N6pJTi77+WsCwLx3Eo' +
	'igLbtimKgoOHDpE0E1D21KQBGsBzHVqtFo7WiAhepUI+GOC6Ln6lggK+/ebLa4u79lzdbny9lvZ/' +
	'W/rzkgbQ2ibtvUKhaO1p4bouNb+KpT1A2H9gjp8OEMBnwTbgQ9eZ0d85NzWAbVkEtQDLUvTTFGOE' +
	'5q4m6/93ef78H3zfJ89zqtXqW3maTucoQbMxpQGUUvh+lWI0IggCso0MgEZU5+N9+xARXNelHJco' +
	'FPV6Hc91t24gIqAU3W4XYwwb/T6j0YgwDLG1TbfbxfNckqSJ1jbGGKKojtb2NgAQmJmZQSmFiJAk' +
	'CRtZRqVSoRFFFMWQbKPPqCwRY9jMc+bm5rYABkEQBoMBxhi01iwvLxOGIVNhiFLg+/6WhLJkPB7j' +
	'+z5KqbcAATFCnucURYHneYgIYRgyHA7ppSkighiD4zg7PtnbboOA/q+bpq8HedQ5dmzHHMNhwcvV' +
	'VTzP44PpaWq1GmVZMjs7C4DneQCICPrxwz8ufH7ZuhFPhzu/YETpK187lUYjotfrkec5lmWxvr7O' +
	'eDym3W6TJAnIltXfi0W++mH+lx9/nj/8CSsrKzvWjuOYIAiI4xhba56dvpXpSYASk/27+pKFhQXi' +
	'pDnxyQb5Jvlamk3c4CInvU+nPrqz98T8F2tmcs3sK53dW7p/4Q2pHQVoREA4zgAAAABJRU5ErkJg' +
	'gg==',
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
	    'RK5CYII=',
	save: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	    '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wHGAYVLmFLQv0AAAIpSURBVDjL' +
	    'fZI9axRRFIafO7Mzs5PdrIpCNpsErLRREIm2QlAQFMTCQmutRLCzESz8AfaCf0D0H4hFIIoSCwsL' +
	    'xWAdjRs2uzt35n4di1k3MeBeuFxOcZ77vuc9Cli9tHZ1/eKF88ObN647EWaeNMvk7r37rfZ8++fG' +
	    '+pvTDeBcb+lk3u0t5WfOnGU81v9tFgksLi6QZhnWug5AA2Aw2CP4QJykdI5lMxVUDrwPKFXXDQDv' +
	    'HdZ5dnZ2KfQMBUHoLS/hvSOaEBoA1lisc5TGUhk7w4KgK4vz/hDAGpz1ECfMzaczLRS6wluHRP8A' +
	    'LMY7+r/7lGU1U0G318N7R5BDgE8fPtLK8+mAlFIopZBJIyKICKPRiCzLKYrRPsB5y/b2L169fE1R' +
	    '1EOM4hilFEgdn/eBVmsOFMRJgg9+H2BMLTuEwIvnz/j67TtaF1y5vAaiQEGaJjx4+IitrR84Z/HO' +
	    'HUzBgFJ4X1MfP3lKnrdZ7HaJ4wgRIUtTkiRBKYVzDncQYIyZbtre3gAlQvAerYvpAK01lKXGGFN/' +
	    'NNn5aYx/LehCo3WJ9YHReDzN2/sMZx2mqhAEH8IU8F4XI5Ikw1oj/d2+unP7FlnWpNSaKKothBCo' +
	    'qnKiVjBVGQE0VlfXvmxuvr12pNM5tbyyEjY23sWdTqeZpVFzMBikURTFIhKcc+740Va+cKLdGA6H' +
	    'pa3sZwDVbDYpyxIRiYAcmJvcHEiBGBDAAhooJu/YGOP+ALBcRcHQ86q8AAAAAElFTkSuQmCC',
	edit: 'data:image/png;base64,' +
	    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	    '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wHGAYYJto+tIIAAAGNSURBVDjL' +
	    'nZO9bhNBEMd/s3uXyFEIFU+ATsGSP0DbxwUtoDyEH4AUfDSkpQzvQEOEJWT8BHQhHXGUbChcJkXs' +
	    'Gsu3t0uB7lg7x+dII61G//nt7OwM/KcNh0MApAwMBoPXrVbrpfeeEMJvk6fTKb1eTwCSMuicm2dZ' +
	    'Rp7niAhKKUSk8hACIQScczjnKlgSk0tReY6tBCVJgtb63wExRET+DPDeo5SqhcS2pCgbWHqapoxP' +
	    'x1hrl+K/BMQiAUajEfNvc5rN5t8DvPeICEfHx1xfz/Dek+d5VZ33vh4gIj+Tjz5zYb+SZXcxxlQ3' +
	    'x0+sbSIhcHIyxp5b7j/o0u12KYqiamYI4UZjFcDe0z201uHL+JTpbMa95jbtdpuiKKqby9JXJ1U9' +
	    'f/aCgzcHpGvrD68ur7i1uYExpkqu86VvBTg8fP9Ja72ztbWJMebG0Kz6ZDKh0+n82IXdR0/eXZyf' +
	    '7SycG+3vv3q8WCwq4eo+xOMcV7DdWFvf+PBxeNtae0cppes2MJ7ARqOR9vv9twDfAcT5/9mRCKJw' +
	    'AAAAAElFTkSuQmCC'
};

var scriptNumber = 139154;
var feedbackThreadId = '72157630043191704';

// Greased MooTools inline for lack of @require support in Chrome

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

var Native = function(options){
	options = options || {};
	var name = options.name;
	var legacy = options.legacy;
	var protect = options.protect;
	var methods = options.implement;
	var generics = options.generics;
	var initialize = options.initialize;
	var afterImplement = options.afterImplement || function(){};
	var object = initialize || legacy;
	generics = generics !== false;

	object.constructor = Native;
	object.$family = {name: 'native'};
	if (legacy && initialize) object.prototype = legacy.prototype;
	if (!object.prototype) object.prototype = {};
	object.prototype.constructor = object;

	if (name){
		var family = name.toLowerCase();
		object.prototype.$family = {name: family};
		Native.typize(object, family);
	}

	var add = function(obj, name, method, force){
		if (!protect || force || !obj.prototype[name]) obj.prototype[name] = method;
		if (generics) Native.genericize(obj, name, protect);
		afterImplement.call(obj, name, method);
		return obj;
	};

	object.alias = function(a1, a2, a3){
		if (typeof a1 == 'string'){
			var pa1 = this.prototype[a1];
			if ((a1 = pa1)) return add(this, a2, a1, a3);
		}
		for (var a in a1) this.alias(a, a1[a], a2);
		return this;
	};

	object.implement = function(a1, a2, a3){
		if (typeof a1 == 'string') return add(this, a1, a2, a3);
		for (var p in a1) add(this, p, a1[p], a2);
		return this;
	};

	if (methods) object.implement(methods);

	return object;
};

Native.genericize = function(object, property, check){
	if ((!check || !object[property]) && typeof object.prototype[property] == 'function') object[property] = function(){
		var args = Array.prototype.slice.call(arguments);
		return object.prototype[property].apply(args.shift(), args);
	};
};

Native.implement = function(objects, properties){
	for (var i = 0, l = objects.length; i < l; i++) objects[i].implement(properties);
};

Native.typize = function(object, family){
	if (!object.type) object.type = function(item){
		return ($type(item) === family);
	};
};

(function(){
	var natives = {'Array': Array, 'Date': Date, 'Function': Function, 'Number': Number, 'RegExp': RegExp, 'String': String};
	for (var n in natives) new Native({name: n, initialize: natives[n], protect: true});

	var types = {'boolean': Boolean, 'native': Native, 'object': Object};
	for (var t in types) Native.typize(types[t], t);

	var generics = {
		'Array': ["concat", "indexOf", "join", "lastIndexOf", "pop", "push", "reverse", "shift", "slice", "sort", "splice", "toString", "unshift", "valueOf"],
		'String': ["charAt", "charCodeAt", "concat", "indexOf", "lastIndexOf", "match", "replace", "search", "slice", "split", "substr", "substring", "toLowerCase", "toUpperCase", "valueOf"]
	};
	for (var g in generics){
		for (var i = generics[g].length; i--;) Native.genericize(natives[g], generics[g][i], true);
	}
})();

var Hash = new Native({

	name: 'Hash',

	initialize: function(object){
		if ($type(object) == 'hash') object = $unlink(object.getClean());
		for (var key in object) this[key] = object[key];
		return this;
	}

});

Hash.implement({

	forEach: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key)) fn.call(bind, this[key], key, this);
		}
	},

	getClean: function(){
		var clean = {};
		for (var key in this){
			if (this.hasOwnProperty(key)) clean[key] = this[key];
		}
		return clean;
	},

	getLength: function(){
		var length = 0;
		for (var key in this){
			if (this.hasOwnProperty(key)) length++;
		}
		return length;
	}

});

Hash.alias('forEach', 'each');

Array.implement({

	forEach: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++) fn.call(bind, this[i], i, this);
	}

});

Array.alias('forEach', 'each');

function $A(iterable){
	if (iterable.item){
		var l = iterable.length, array = new Array(l);
		while (l--) array[l] = iterable[l];
		return array;
	}
	return Array.prototype.slice.call(iterable);
};

function $arguments(i){
	return function(){
		return arguments[i];
	};
};

function $chk(obj){
	return !!(obj || obj === 0);
};

function $clear(timer){
	clearTimeout(timer);
	clearInterval(timer);
	return null;
};

function $defined(obj){
	return (obj != undefined);
};

function $each(iterable, fn, bind){
	var type = $type(iterable);
	((type == 'arguments' || type == 'collection' || type == 'array') ? Array : Hash).each(iterable, fn, bind);
};

function $empty(){};

function $extend(original, extended){
	for (var key in (extended || {})) original[key] = extended[key];
	return original;
};

function $H(object){
	return new Hash(object);
};

function $lambda(value){
	return ($type(value) == 'function') ? value : function(){
		return value;
	};
};

function $merge(){
	var args = Array.slice(arguments);
	args.unshift({});
	return $mixin.apply(null, args);
};

function $mixin(mix){
	for (var i = 1, l = arguments.length; i < l; i++){
		var object = arguments[i];
		if ($type(object) != 'object') continue;
		for (var key in object){
			var op = object[key], mp = mix[key];
			mix[key] = (mp && $type(op) == 'object' && $type(mp) == 'object') ? $mixin(mp, op) : $unlink(op);
		}
	}
	return mix;
};

function $pick(){
	for (var i = 0, l = arguments.length; i < l; i++){
		if (arguments[i] != undefined) return arguments[i];
	}
	return null;
};

function $random(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
};

function $splat(obj){
	var type = $type(obj);
	return (type) ? ((type != 'array' && type != 'arguments') ? [obj] : obj) : [];
};

var $time = Date.now || function(){
	return +new Date;
};

function $try(){
	for (var i = 0, l = arguments.length; i < l; i++){
		try {
			return arguments[i]();
		} catch(e){}
	}
	return null;
};

function $type(obj){
	if (obj == undefined) return false;
	if (obj.$family) return (obj.$family.name == 'number' && !isFinite(obj)) ? false : obj.$family.name;
	if (obj.nodeName){
		switch (obj.nodeType){
			case 1: return 'element';
			case 3: return (/\S/).test(obj.nodeValue) ? 'textnode' : 'whitespace';
		}
	} else if (typeof obj.length == 'number'){
		if (obj.callee) return 'arguments';
		else if (obj.item) return 'collection';
	}
	return typeof obj;
};

function $unlink(object){
	var unlinked;
	switch ($type(object)){
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

	Engine: {name: 'unknown', version: 0},

	Platform: {name: (window.orientation != undefined) ? 'ipod' : (navigator.platform.match(/mac|win|linux/i) || ['other'])[0].toLowerCase()},

	Features: {xpath: !!(document.evaluate), air: !!(window.runtime), query: !!(document.querySelector)},

	Plugins: {},

	Engines: {

		presto: function(){
			return (!window.opera) ? false : ((arguments.callee.caller) ? 960 : ((document.getElementsByClassName) ? 950 : 925));
		},

		trident: function(){
			return (!window.ActiveXObject) ? false : ((window.XMLHttpRequest) ? ((document.querySelectorAll) ? 6 : 5) : 4);
		},

		webkit: function(){
			return (navigator.taintEnabled) ? false : ((Browser.Features.xpath) ? ((Browser.Features.query) ? 525 : 420) : 419);
		},

		gecko: function(){
			return (!document.getBoxObjectFor && window.mozInnerScreenX == null) ? false : ((document.getElementsByClassName) ? 19 : 18);
		}

	}

}, Browser || {});

Browser.Platform[Browser.Platform.name] = true;

Browser.detect = function(){

	for (var engine in this.Engines){
		var version = this.Engines[engine]();
		if (version){
			this.Engine = {name: engine, version: version};
			this.Engine[engine] = this.Engine[engine + version] = true;
			break;
		}
	}

	return {name: engine, version: version};

};

Browser.detect();

Browser.Request = function(){
	return $try(function(){
		return new XMLHttpRequest();
	}, function(){
		return new ActiveXObject('MSXML2.XMLHTTP');
	}, function(){
		return new ActiveXObject('Microsoft.XMLHTTP');
	});
};

Browser.Features.xhr = !!(Browser.Request());

Browser.Plugins.Flash = (function(){
	var version = ($try(function(){
		return navigator.plugins['Shockwave Flash'].description;
	}, function(){
		return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
	}) || '0 r0').match(/\d+/g);
	return {version: parseInt(version[0] || 0 + '.' + version[1], 10) || 0, build: parseInt(version[2], 10) || 0};
})();

function $exec(text){
	if (!text) return text;
	if (window.execScript){
		window.execScript(text);
	} else {
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script[(Browser.Engine.webkit && Browser.Engine.version < 420) ? 'innerText' : 'text'] = text;
		document.head.appendChild(script);
		document.head.removeChild(script);
	}
	return text;
};

Native.UID = 1;

var $uid = (Browser.Engine.trident) ? function(item){
	return (item.uid || (item.uid = [Native.UID++]))[0];
} : function(item){
	return item.uid || (item.uid = Native.UID++);
};

var Window = new Native({

	name: 'Window',

	legacy: (Browser.Engine.trident) ? null: window.Window,

	initialize: function(win){
		$uid(win);
		if (!win.Element){
			win.Element = $empty;
			if (Browser.Engine.webkit) win.document.createElement("iframe"); //fixes safari 2
			win.Element.prototype = (Browser.Engine.webkit) ? window["[[DOMElement.prototype]]"] : {};
		}
		win.document.window = win;
		return $extend(win, Window.Prototype);
	},

	afterImplement: function(property, value){
		window[property] = Window.Prototype[property] = value;
	}

});

Window.Prototype = {$family: {name: 'window'}};

new Window(window);

var Document = new Native({

	name: 'Document',

	legacy: (Browser.Engine.trident) ? null: window.Document,

	initialize: function(doc){
		$uid(doc);
		doc.head = doc.getElementsByTagName('head')[0];
		doc.html = doc.getElementsByTagName('html')[0];
		if (Browser.Engine.trident && Browser.Engine.version <= 4) $try(function(){
			doc.execCommand("BackgroundImageCache", false, true);
		});
		if (Browser.Engine.trident) doc.window.attachEvent('onunload', function(){
			doc.window.detachEvent('onunload', arguments.callee);
			doc.head = doc.html = doc.window = null;
		});
		return $extend(doc, Document.Prototype);
	},

	afterImplement: function(property, value){
		document[property] = Document.Prototype[property] = value;
	}

});

Document.Prototype = {$family: {name: 'document'}};

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

	every: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if (!fn.call(bind, this[i], i, this)) return false;
		}
		return true;
	},

	filter: function(fn, bind){
		var results = [];
		for (var i = 0, l = this.length; i < l; i++){
			if (fn.call(bind, this[i], i, this)) results.push(this[i]);
		}
		return results;
	},

	clean: function(){
		return this.filter($defined);
	},

	indexOf: function(item, from){
		var len = this.length;
		for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++){
			if (this[i] === item) return i;
		}
		return -1;
	},

	map: function(fn, bind){
		var results = [];
		for (var i = 0, l = this.length; i < l; i++) results[i] = fn.call(bind, this[i], i, this);
		return results;
	},

	some: function(fn, bind){
		for (var i = 0, l = this.length; i < l; i++){
			if (fn.call(bind, this[i], i, this)) return true;
		}
		return false;
	},

	associate: function(keys){
		var obj = {}, length = Math.min(this.length, keys.length);
		for (var i = 0; i < length; i++) obj[keys[i]] = this[i];
		return obj;
	},

	link: function(object){
		var result = {};
		for (var i = 0, l = this.length; i < l; i++){
			for (var key in object){
				if (object[key](this[i])){
					result[key] = this[i];
					delete object[key];
					break;
				}
			}
		}
		return result;
	},

	contains: function(item, from){
		return this.indexOf(item, from) != -1;
	},

	extend: function(array){
		for (var i = 0, j = array.length; i < j; i++) this.push(array[i]);
		return this;
	},
	
	getLast: function(){
		return (this.length) ? this[this.length - 1] : null;
	},

	getRandom: function(){
		return (this.length) ? this[$random(0, this.length - 1)] : null;
	},

	include: function(item){
		if (!this.contains(item)) this.push(item);
		return this;
	},

	combine: function(array){
		for (var i = 0, l = array.length; i < l; i++) this.include(array[i]);
		return this;
	},

	erase: function(item){
		for (var i = this.length; i--; i){
			if (this[i] === item) this.splice(i, 1);
		}
		return this;
	},

	empty: function(){
		this.length = 0;
		return this;
	},

	flatten: function(){
		var array = [];
		for (var i = 0, l = this.length; i < l; i++){
			var type = $type(this[i]);
			if (!type) continue;
			array = array.concat((type == 'array' || type == 'collection' || type == 'arguments') ? Array.flatten(this[i]) : this[i]);
		}
		return array;
	},

	hexToRgb: function(array){
		if (this.length != 3) return null;
		var rgb = this.map(function(value){
			if (value.length == 1) value += value;
			return value.toInt(16);
		});
		return (array) ? rgb : 'rgb(' + rgb + ')';
	},

	rgbToHex: function(array){
		if (this.length < 3) return null;
		if (this.length == 4 && this[3] == 0 && !array) return 'transparent';
		var hex = [];
		for (var i = 0; i < 3; i++){
			var bit = (this[i] - 0).toString(16);
			hex.push((bit.length == 1) ? '0' + bit : bit);
		}
		return (array) ? hex : '#' + hex.join('');
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

	test: function(regex, params){
		return ((typeof regex == 'string') ? new RegExp(regex, params) : regex).test(this);
	},

	contains: function(string, separator){
		return (separator) ? (separator + this + separator).indexOf(separator + string + separator) > -1 : this.indexOf(string) > -1;
	},

	trim: function(){
		return this.replace(/^\s+|\s+$/g, '');
	},

	clean: function(){
		return this.replace(/\s+/g, ' ').trim();
	},

	camelCase: function(){
		return this.replace(/-\D/g, function(match){
			return match.charAt(1).toUpperCase();
		});
	},

	hyphenate: function(){
		return this.replace(/[A-Z]/g, function(match){
			return ('-' + match.charAt(0).toLowerCase());
		});
	},

	capitalize: function(){
		return this.replace(/\b[a-z]/g, function(match){
			return match.toUpperCase();
		});
	},

	escapeRegExp: function(){
		return this.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
	},

	toInt: function(base){
		return parseInt(this, base || 10);
	},

	toFloat: function(){
		return parseFloat(this);
	},

	hexToRgb: function(array){
		var hex = this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
		return (hex) ? hex.slice(1).hexToRgb(array) : null;
	},

	rgbToHex: function(array){
		var rgb = this.match(/\d{1,3}/g);
		return (rgb) ? rgb.rgbToHex(array) : null;
	},

	stripScripts: function(option){
		var scripts = '';
		var text = this.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, function(){
			scripts += arguments[1] + '\n';
			return '';
		});
		if (option === true) $exec(scripts);
		else if ($type(option) == 'function') option(scripts, text);
		return text;
	},

	substitute: function(object, regexp){
		return this.replace(regexp || (/\\?\{([^{}]+)\}/g), function(match, name){
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

	extend: function(properties){
		for (var property in properties) this[property] = properties[property];
		return this;
	},

	create: function(options){
		var self = this;
		options = options || {};
		return function(event){
			var args = options.arguments;
			args = (args != undefined) ? $splat(args) : Array.slice(arguments, (options.event) ? 1 : 0);
			if (options.event) args = [event || window.event].extend(args);
			var returns = function(){
				return self.apply(options.bind || null, args);
			};
			if (options.delay) return setTimeout(returns, options.delay);
			if (options.periodical) return setInterval(returns, options.periodical);
			if (options.attempt) return $try(returns);
			return returns();
		};
	},

	run: function(args, bind){
		return this.apply(bind, $splat(args));
	},

	pass: function(args, bind){
		return this.create({bind: bind, arguments: args});
	},

	bind: function(bind, args){
		return this.create({bind: bind, arguments: args});
	},

	bindWithEvent: function(bind, args){
		return this.create({bind: bind, arguments: args, event: true});
	},

	attempt: function(args, bind){
		return this.create({bind: bind, arguments: args, attempt: true})();
	},

	delay: function(delay, bind, args){
		return this.create({bind: bind, arguments: args, delay: delay})();
	},

	periodical: function(periodical, bind, args){
		return this.create({bind: bind, arguments: args, periodical: periodical})();
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

	limit: function(min, max){
		return Math.min(max, Math.max(min, this));
	},

	round: function(precision){
		precision = Math.pow(10, precision || 0);
		return Math.round(this * precision) / precision;
	},

	times: function(fn, bind){
		for (var i = 0; i < this; i++) fn.call(bind, i, this);
	},

	toFloat: function(){
		return parseFloat(this);
	},

	toInt: function(base){
		return parseInt(this, base || 10);
	}

});

Number.alias('times', 'each');

(function(math){
	var methods = {};
	math.each(function(name){
		if (!Number[name]) methods[name] = function(){
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

	keyOf: function(value){
		for (var key in this){
			if (this.hasOwnProperty(key) && this[key] === value) return key;
		}
		return null;
	},

	hasValue: function(value){
		return (Hash.keyOf(this, value) !== null);
	},

	extend: function(properties){
		Hash.each(properties || {}, function(value, key){
			Hash.set(this, key, value);
		}, this);
		return this;
	},

	combine: function(properties){
		Hash.each(properties || {}, function(value, key){
			Hash.include(this, key, value);
		}, this);
		return this;
	},

	erase: function(key){
		if (this.hasOwnProperty(key)) delete this[key];
		return this;
	},

	get: function(key){
		return (this.hasOwnProperty(key)) ? this[key] : null;
	},

	set: function(key, value){
		if (!this[key] || this.hasOwnProperty(key)) this[key] = value;
		return this;
	},

	empty: function(){
		Hash.each(this, function(value, key){
			delete this[key];
		}, this);
		return this;
	},

	include: function(key, value){
		if (this[key] == undefined) this[key] = value;
		return this;
	},

	map: function(fn, bind){
		var results = new Hash;
		Hash.each(this, function(value, key){
			results.set(key, fn.call(bind, value, key, this));
		}, this);
		return results;
	},

	filter: function(fn, bind){
		var results = new Hash;
		Hash.each(this, function(value, key){
			if (fn.call(bind, value, key, this)) results.set(key, value);
		}, this);
		return results;
	},

	every: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key) && !fn.call(bind, this[key], key)) return false;
		}
		return true;
	},

	some: function(fn, bind){
		for (var key in this){
			if (this.hasOwnProperty(key) && fn.call(bind, this[key], key)) return true;
		}
		return false;
	},

	getKeys: function(){
		var keys = [];
		Hash.each(this, function(value, key){
			keys.push(key);
		});
		return keys;
	},

	getValues: function(){
		var values = [];
		Hash.each(this, function(value){
			values.push(value);
		});
		return values;
	},

	toQueryString: function(base){
		var queryString = [];
		Hash.each(this, function(value, key){
			if (base) key = base + '[' + key + ']';
			var result;
			switch ($type(value)){
				case 'object': result = Hash.toQueryString(value, key); break;
				case 'array':
					var qs = {};
					value.each(function(val, i){
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

Hash.alias({keyOf: 'indexOf', hasValue: 'contains'});

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

	initialize: function(tag, props){
		var konstructor = Element.Constructors.get(tag);
		if (konstructor) return konstructor(props);
		if (typeof tag == 'string') return document.newElement(tag, props);
		return document.id(tag).set(props);
	},

	afterImplement: function(key, value){
		Element.Prototype[key] = value;
		if (Array[key]) return;
		Elements.implement(key, function(){
			var items = [], elements = true;
			for (var i = 0, j = this.length; i < j; i++){
				var returns = this[i][key].apply(this[i], arguments);
				items.push(returns);
				if (elements) elements = ($type(returns) == 'element');
			}
			return (elements) ? new Elements(items) : items;
		});
	}

});

Element.Prototype = {$family: {name: 'element'}};

Element.Constructors = new Hash;

var IFrame = new Native({

	name: 'IFrame',

	generics: false,

	initialize: function(){
		var params = Array.link(arguments, {properties: Object.type, iframe: $defined});
		var props = params.properties || {};
		var iframe = document.id(params.iframe);
		var onload = props.onload || $empty;
		delete props.onload;
		props.id = props.name = $pick(props.id, props.name, iframe ? (iframe.id || iframe.name) : 'IFrame_' + $time());
		iframe = new Element(iframe || 'iframe', props);
		var onFrameLoad = function(){
			var host = $try(function(){
				return iframe.contentWindow.location.host;
			});
			if (!host || host == window.location.host){
				var win = new Window(iframe.contentWindow);
				new Document(iframe.contentWindow.document);
				if(!win.Element.prototype) win.Element.prototype = {};
				$extend(win.Element.prototype, Element.Prototype);
			}
			onload.call(iframe.contentWindow, iframe.contentWindow.document);
		};
		var contentWindow = $try(function(){
			return iframe.contentWindow;
		});
		((contentWindow && contentWindow.document.body) || window.frames[props.id]) ? onFrameLoad() : iframe.addListener('load', onFrameLoad);
		return iframe;
	}

});

var Elements = new Native({

	initialize: function(elements, options){
		options = $extend({ddup: true, cash: true}, options);
		elements = elements || [];
		if (options.ddup || options.cash){
			var uniques = {}, returned = [];
			for (var i = 0, l = elements.length; i < l; i++){
				var el = document.id(elements[i], !options.cash);
				if (options.ddup){
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

	filter: function(filter, bind){
		if (!filter) return this;
		return new Elements(Array.filter(this, (typeof filter == 'string') ? function(item){
			return item.match(filter);
		} : filter, bind));
	}

});

Document.implement({

	newElement: function(tag, props){
		if (Browser.Engine.trident && props){
			['name', 'type', 'checked'].each(function(attribute){
				if (!props[attribute]) return;
				tag += ' ' + attribute + '="' + props[attribute] + '"';
				if (attribute != 'checked') delete props[attribute];
			});
			tag = '<' + tag + '>';
		}
		return document.id(this.createElement(tag)).set(props);
	},

	newTextNode: function(text){
		return this.createTextNode(text);
	},

	getDocument: function(){
		return this;
	},

	getWindow: function(){
		return this.window;
	},
	
	id: (function(){
		
		var types = {

			string: function(id, nocash, doc){
				id = doc.getElementById(id);
				return (id) ? types.element(id, nocash) : null;
			},
			
			element: function(el, nocash){
				$uid(el);
				if (!nocash && !el.$family && !(/^object|embed$/i).test(el.tagName)){
					var proto = Element.Prototype;
					for (var p in proto) el[p] = proto[p];
				};
				return el;
			},
			
			object: function(obj, nocash, doc){
				if (obj.toElement) return types.element(obj.toElement(doc), nocash);
				return null;
			}
			
		};

		types.textnode = types.whitespace = types.window = types.document = $arguments(0);
		
		return function(el, nocash, doc){
			if (el && el.$family && el.uid) return el;
			var type = $type(el);
			return (types[type]) ? types[type](el, nocash, doc || document) : null;
		};

	})()

});

if (window.$ == null) Window.implement({
	$: function(el, nc){
		return document.id(el, nc, this.document);
	}
});

Window.implement({

	$$: function(selector){
		if (arguments.length == 1 && typeof selector == 'string') return this.document.getElements(selector);
		var elements = [];
		var args = Array.flatten(arguments);
		for (var i = 0, l = args.length; i < l; i++){
			var item = args[i];
			switch ($type(item)){
				case 'element': elements.push(item); break;
				case 'string': elements.extend(this.document.getElements(item, true));
			}
		}
		return new Elements(elements);
	},

	getDocument: function(){
		return this.document;
	},

	getWindow: function(){
		return this;
	}

});

Native.implement([Element, Document], {

	getElement: function(selector, nocash){
		return document.id(this.getElements(selector, true)[0] || null, nocash);
	},

	getElements: function(tags, nocash){
		tags = tags.split(',');
		var elements = [];
		var ddup = (tags.length > 1);
		tags.each(function(tag){
			var partial = this.getElementsByTagName(tag.trim());
			(ddup) ? elements.extend(partial) : elements = partial;
		}, this);
		return new Elements(elements, {ddup: ddup, cash: !nocash});
	}

});

(function(){

var collected = {}, storage = {};
var props = {input: 'checked', option: 'selected', textarea: (Browser.Engine.webkit && Browser.Engine.version < 420) ? 'innerHTML' : 'value'};

var get = function(uid){
	return (storage[uid] || (storage[uid] = {}));
};

var clean = function(item, retain){
	if (!item) return;
	var uid = item.uid;
	if (Browser.Engine.trident){
		if (item.clearAttributes){
			var clone = retain && item.cloneNode(false);
			item.clearAttributes();
			if (clone) item.mergeAttributes(clone);
		} else if (item.removeEvents){
			item.removeEvents();
		}
		if ((/object/i).test(item.tagName)){
			for (var p in item){
				if (typeof item[p] == 'function') item[p] = $empty;
			}
			Element.dispose(item);
		}
	}	
	if (!uid) return;
	collected[uid] = storage[uid] = null;
};

var purge = function(){
	Hash.each(collected, clean);
	if (Browser.Engine.trident) $A(document.getElementsByTagName('object')).each(clean);
	if (window.CollectGarbage) CollectGarbage();
	collected = storage = null;
};

var walk = function(element, walk, start, match, all, nocash){
	var el = element[start || walk];
	var elements = [];
	while (el){
		if (el.nodeType == 1 && (!match || Element.match(el, match))){
			if (!all) return document.id(el, nocash);
			elements.push(el);
		}
		el = el[walk];
	}
	return (all) ? new Elements(elements, {ddup: false, cash: !nocash}) : null;
};

var attributes = {
	'html': 'innerHTML',
	'class': 'className',
	'for': 'htmlFor',
	'defaultValue': 'defaultValue',
	'text': (Browser.Engine.trident || (Browser.Engine.webkit && Browser.Engine.version < 420)) ? 'innerText' : 'textContent'
};
var bools = ['compact', 'nowrap', 'ismap', 'declare', 'noshade', 'checked', 'disabled', 'readonly', 'multiple', 'selected', 'noresize', 'defer'];
var camels = ['value', 'type', 'defaultValue', 'accessKey', 'cellPadding', 'cellSpacing', 'colSpan', 'frameBorder', 'maxLength', 'readOnly', 'rowSpan', 'tabIndex', 'useMap'];

bools = bools.associate(bools);

Hash.extend(attributes, bools);
Hash.extend(attributes, camels.associate(camels.map(String.toLowerCase)));

var inserters = {

	before: function(context, element){
		if (element.parentNode) element.parentNode.insertBefore(context, element);
	},

	after: function(context, element){
		if (!element.parentNode) return;
		var next = element.nextSibling;
		(next) ? element.parentNode.insertBefore(context, next) : element.parentNode.appendChild(context);
	},

	bottom: function(context, element){
		element.appendChild(context);
	},

	top: function(context, element){
		var first = element.firstChild;
		(first) ? element.insertBefore(context, first) : element.appendChild(context);
	}

};

inserters.inside = inserters.bottom;

Hash.each(inserters, function(inserter, where){

	where = where.capitalize();

	Element.implement('inject' + where, function(el){
		inserter(this, document.id(el, true));
		return this;
	});

	Element.implement('grab' + where, function(el){
		inserter(document.id(el, true), this);
		return this;
	});

});

Element.implement({

	set: function(prop, value){
		switch ($type(prop)){
			case 'object':
				for (var p in prop) this.set(p, prop[p]);
				break;
			case 'string':
				var property = Element.Properties.get(prop);
				(property && property.set) ? property.set.apply(this, Array.slice(arguments, 1)) : this.setProperty(prop, value);
		}
		return this;
	},

	get: function(prop){
		var property = Element.Properties.get(prop);
		return (property && property.get) ? property.get.apply(this, Array.slice(arguments, 1)) : this.getProperty(prop);
	},

	erase: function(prop){
		var property = Element.Properties.get(prop);
		(property && property.erase) ? property.erase.apply(this) : this.removeProperty(prop);
		return this;
	},

	setProperty: function(attribute, value){
		var key = attributes[attribute];
		if (value == undefined) return this.removeProperty(attribute);
		if (key && bools[attribute]) value = !!value;
		(key) ? this[key] = value : this.setAttribute(attribute, '' + value);
		return this;
	},

	setProperties: function(attributes){
		for (var attribute in attributes) this.setProperty(attribute, attributes[attribute]);
		return this;
	},

	getProperty: function(attribute){
		var key = attributes[attribute];
		var value = (key) ? this[key] : this.getAttribute(attribute, 2);
		return (bools[attribute]) ? !!value : (key) ? value : value || null;
	},

	getProperties: function(){
		var args = $A(arguments);
		return args.map(this.getProperty, this).associate(args);
	},

	removeProperty: function(attribute){
		var key = attributes[attribute];
		(key) ? this[key] = (key && bools[attribute]) ? false : '' : this.removeAttribute(attribute);
		return this;
	},

	removeProperties: function(){
		Array.each(arguments, this.removeProperty, this);
		return this;
	},

	hasClass: function(className){
		return this.className.contains(className, ' ');
	},

	addClass: function(className){
		if (!this.hasClass(className)) this.className = (this.className + ' ' + className).clean();
		return this;
	},

	removeClass: function(className){
		this.className = this.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
		return this;
	},

	toggleClass: function(className){
		return this.hasClass(className) ? this.removeClass(className) : this.addClass(className);
	},

	adopt: function(){
		Array.flatten(arguments).each(function(element){
			element = document.id(element, true);
			if (element) this.appendChild(element);
		}, this);
		return this;
	},

	appendText: function(text, where){
		return this.grab(this.getDocument().newTextNode(text), where);
	},

	grab: function(el, where){
		inserters[where || 'bottom'](document.id(el, true), this);
		return this;
	},

	inject: function(el, where){
		inserters[where || 'bottom'](this, document.id(el, true));
		return this;
	},

	replaces: function(el){
		el = document.id(el, true);
		el.parentNode.replaceChild(this, el);
		return this;
	},

	wraps: function(el, where){
		el = document.id(el, true);
		return this.replaces(el).grab(el, where);
	},

	getPrevious: function(match, nocash){
		return walk(this, 'previousSibling', null, match, false, nocash);
	},

	getAllPrevious: function(match, nocash){
		return walk(this, 'previousSibling', null, match, true, nocash);
	},

	getNext: function(match, nocash){
		return walk(this, 'nextSibling', null, match, false, nocash);
	},

	getAllNext: function(match, nocash){
		return walk(this, 'nextSibling', null, match, true, nocash);
	},

	getFirst: function(match, nocash){
		return walk(this, 'nextSibling', 'firstChild', match, false, nocash);
	},

	getLast: function(match, nocash){
		return walk(this, 'previousSibling', 'lastChild', match, false, nocash);
	},

	getParent: function(match, nocash){
		return walk(this, 'parentNode', null, match, false, nocash);
	},

	getParents: function(match, nocash){
		return walk(this, 'parentNode', null, match, true, nocash);
	},
	
	getSiblings: function(match, nocash){
		return this.getParent().getChildren(match, nocash).erase(this);
	},

	getChildren: function(match, nocash){
		return walk(this, 'nextSibling', 'firstChild', match, true, nocash);
	},

	getWindow: function(){
		return this.ownerDocument.window;
	},

	getDocument: function(){
		return this.ownerDocument;
	},

	getElementById: function(id, nocash){
		var el = this.ownerDocument.getElementById(id);
		if (!el) return null;
		for (var parent = el.parentNode; parent != this; parent = parent.parentNode){
			if (!parent) return null;
		}
		return document.id(el, nocash);
	},

	getSelected: function(){
		return new Elements($A(this.options).filter(function(option){
			return option.selected;
		}));
	},

	getComputedStyle: function(property){
		if (this.currentStyle) return this.currentStyle[property.camelCase()];
		var computed = this.getDocument().defaultView.getComputedStyle(this, null);
		return (computed) ? computed.getPropertyValue([property.hyphenate()]) : null;
	},

	toQueryString: function(){
		var queryString = [];
		this.getElements('input, select, textarea', true).each(function(el){
			if (!el.name || el.disabled || el.type == 'submit' || el.type == 'reset' || el.type == 'file') return;
			var value = (el.tagName.toLowerCase() == 'select') ? Element.getSelected(el).map(function(opt){
				return opt.value;
			}) : ((el.type == 'radio' || el.type == 'checkbox') && !el.checked) ? null : el.value;
			$splat(value).each(function(val){
				if (typeof val != 'undefined') queryString.push(el.name + '=' + encodeURIComponent(val));
			});
		});
		return queryString.join('&');
	},

	clone: function(contents, keepid){
		contents = contents !== false;
		var clone = this.cloneNode(contents);
		var clean = function(node, element){
			if (!keepid) node.removeAttribute('id');
			if (Browser.Engine.trident){
				node.clearAttributes();
				node.mergeAttributes(element);
				node.removeAttribute('uid');
				if (node.options){
					var no = node.options, eo = element.options;
					for (var j = no.length; j--;) no[j].selected = eo[j].selected;
				}
			}
			var prop = props[element.tagName.toLowerCase()];
			if (prop && element[prop]) node[prop] = element[prop];
		};

		if (contents){
			var ce = clone.getElementsByTagName('*'), te = this.getElementsByTagName('*');
			for (var i = ce.length; i--;) clean(ce[i], te[i]);
		}

		clean(clone, this);
		return document.id(clone);
	},

	destroy: function(){
		Element.empty(this);
		Element.dispose(this);
		clean(this, true);
		return null;
	},

	empty: function(){
		$A(this.childNodes).each(function(node){
			Element.destroy(node);
		});
		return this;
	},

	dispose: function(){
		return (this.parentNode) ? this.parentNode.removeChild(this) : this;
	},

	hasChild: function(el){
		el = document.id(el, true);
		if (!el) return false;
		if (Browser.Engine.webkit && Browser.Engine.version < 420) return $A(this.getElementsByTagName(el.tagName)).contains(el);
		return (this.contains) ? (this != el && this.contains(el)) : !!(this.compareDocumentPosition(el) & 16);
	},

	match: function(tag){
		return (!tag || (tag == this) || (Element.get(this, 'tag') == tag));
	}

});

Native.implement([Element, Window, Document], {

	addListener: function(type, fn){
		if (type == 'unload'){
			var old = fn, self = this;
			fn = function(){
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

	removeListener: function(type, fn){
		if (this.removeEventListener) this.removeEventListener(type, fn, false);
		else this.detachEvent('on' + type, fn);
		return this;
	},

	retrieve: function(property, dflt){
		var storage = get(this.uid), prop = storage[property];
		if (dflt != undefined && prop == undefined) prop = storage[property] = dflt;
		return $pick(prop);
	},

	store: function(property, value){
		var storage = get(this.uid);
		storage[property] = value;
		return this;
	},

	eliminate: function(property){
		var storage = get(this.uid);
		delete storage[property];
		return this;
	}

});

window.addListener('unload', purge);

})();

Element.Properties = new Hash;

Element.Properties.style = {

	set: function(style){
		this.style.cssText = style;
	},

	get: function(){
		return this.style.cssText;
	},

	erase: function(){
		this.style.cssText = '';
	}

};

Element.Properties.tag = {

	get: function(){
		return this.tagName.toLowerCase();
	}

};

Element.Properties.html = (function(){
	var wrapper = document.createElement('div');

	var translations = {
		table: [1, '<table>', '</table>'],
		select: [1, '<select>', '</select>'],
		tbody: [2, '<table><tbody>', '</tbody></table>'],
		tr: [3, '<table><tbody><tr>', '</tr></tbody></table>']
	};
	translations.thead = translations.tfoot = translations.tbody;

	var html = {
		set: function(){
			var html = Array.flatten(arguments).join('');
			var wrap = Browser.Engine.trident && translations[this.get('tag')];
			if (wrap){
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
	get: function(){
		if (this.innerText) return this.innerText;
		var temp = this.ownerDocument.newElement('div', {html: this.innerHTML}).inject(this.ownerDocument.body);
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

Element.Properties.styles = {set: function(styles){
	this.setStyles(styles);
}};

Element.Properties.opacity = {

	set: function(opacity, novisibility){
		if (!novisibility){
			if (opacity == 0){
				if (this.style.visibility != 'hidden') this.style.visibility = 'hidden';
			} else {
				if (this.style.visibility != 'visible') this.style.visibility = 'visible';
			}
		}
		if (!this.currentStyle || !this.currentStyle.hasLayout) this.style.zoom = 1;
		if (Browser.Engine.trident) this.style.filter = (opacity == 1) ? '' : 'alpha(opacity=' + opacity * 100 + ')';
		this.style.opacity = opacity;
		this.store('opacity', opacity);
	},

	get: function(){
		return this.retrieve('opacity', 1);
	}

};

Element.implement({

	setOpacity: function(value){
		return this.set('opacity', value, true);
	},

	getOpacity: function(){
		return this.get('opacity');
	},

	setStyle: function(property, value){
		switch (property){
			case 'opacity': return this.set('opacity', parseFloat(value));
			case 'float': property = (Browser.Engine.trident) ? 'styleFloat' : 'cssFloat';
		}
		property = property.camelCase();
		if ($type(value) != 'string'){
			var map = (Element.Styles.get(property) || '@').split(' ');
			value = $splat(value).map(function(val, i){
				if (!map[i]) return '';
				return ($type(val) == 'number') ? map[i].replace('@', Math.round(val)) : val;
			}).join(' ');
		} else if (value == String(Number(value))){
			value = Math.round(value);
		}
		this.style[property] = value;
		return this;
	},

	getStyle: function(property){
		switch (property){
			case 'opacity': return this.get('opacity');
			case 'float': property = (Browser.Engine.trident) ? 'styleFloat' : 'cssFloat';
		}
		property = property.camelCase();
		var result = this.style[property];
		if (!$chk(result)){
			result = [];
			for (var style in Element.ShortStyles){
				if (property != style) continue;
				for (var s in Element.ShortStyles[style]) result.push(this.getStyle(s));
				return result.join(' ');
			}
			result = this.getComputedStyle(property);
		}
		if (result){
			result = String(result);
			var color = result.match(/rgba?\([\d\s,]+\)/);
			if (color) result = result.replace(color[0], color[0].rgbToHex());
		}
		if (Browser.Engine.presto || (Browser.Engine.trident && !$chk(parseInt(result, 10)))){
			if (property.test(/^(height|width)$/)){
				var values = (property == 'width') ? ['left', 'right'] : ['top', 'bottom'], size = 0;
				values.each(function(value){
					size += this.getStyle('border-' + value + '-width').toInt() + this.getStyle('padding-' + value).toInt();
				}, this);
				return this['offset' + property.capitalize()] - size + 'px';
			}
			if ((Browser.Engine.presto) && String(result).test('px')) return result;
			if (property.test(/(border(.+)Width|margin|padding)/)) return '0px';
		}
		return result;
	},

	setStyles: function(styles){
		for (var style in styles) this.setStyle(style, styles[style]);
		return this;
	},

	getStyles: function(){
		var result = {};
		Array.flatten(arguments).each(function(key){
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

Element.ShortStyles = {margin: {}, padding: {}, border: {}, borderWidth: {}, borderStyle: {}, borderColor: {}};

['Top', 'Right', 'Bottom', 'Left'].each(function(direction){
	var Short = Element.ShortStyles;
	var All = Element.Styles;
	['margin', 'padding'].each(function(style){
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

(function(){

Element.implement({

	scrollTo: function(x, y){
		if (isBody(this)){
			this.getWindow().scrollTo(x, y);
		} else {
			this.scrollLeft = x;
			this.scrollTop = y;
		}
		return this;
	},

	getSize: function(){
		if (isBody(this)) return this.getWindow().getSize();
		return {x: this.offsetWidth, y: this.offsetHeight};
	},

	getScrollSize: function(){
		if (isBody(this)) return this.getWindow().getScrollSize();
		return {x: this.scrollWidth, y: this.scrollHeight};
	},

	getScroll: function(){
		if (isBody(this)) return this.getWindow().getScroll();
		return {x: this.scrollLeft, y: this.scrollTop};
	},

	getScrolls: function(){
		var element = this, position = {x: 0, y: 0};
		while (element && !isBody(element)){
			position.x += element.scrollLeft;
			position.y += element.scrollTop;
			element = element.parentNode;
		}
		return position;
	},

	getOffsetParent: function(){
		var element = this;
		if (isBody(element)) return null;
		if (!Browser.Engine.trident) return element.offsetParent;
		while ((element = element.parentNode) && !isBody(element)){
			if (styleString(element, 'position') != 'static') return element;
		}
		return null;
	},

	getOffsets: function(){
		if (this.getBoundingClientRect){
			var bound = this.getBoundingClientRect(),
				html = document.id(this.getDocument().documentElement),
				htmlScroll = html.getScroll(),
				elemScrolls = this.getScrolls(),
				elemScroll = this.getScroll(),
				isFixed = (styleString(this, 'position') == 'fixed');

			return {
				x: bound.left.toInt() + elemScrolls.x - elemScroll.x + ((isFixed) ? 0 : htmlScroll.x) - html.clientLeft,
				y: bound.top.toInt()  + elemScrolls.y - elemScroll.y + ((isFixed) ? 0 : htmlScroll.y) - html.clientTop
			};
		}

		var element = this, position = {x: 0, y: 0};
		if (isBody(this)) return position;

		while (element && !isBody(element)){
			position.x += element.offsetLeft;
			position.y += element.offsetTop;

			if (Browser.Engine.gecko){
				if (!borderBox(element)){
					position.x += leftBorder(element);
					position.y += topBorder(element);
				}
				var parent = element.parentNode;
				if (parent && styleString(parent, 'overflow') != 'visible'){
					position.x += leftBorder(parent);
					position.y += topBorder(parent);
				}
			} else if (element != this && Browser.Engine.webkit){
				position.x += leftBorder(element);
				position.y += topBorder(element);
			}

			element = element.offsetParent;
		}
		if (Browser.Engine.gecko && !borderBox(this)){
			position.x -= leftBorder(this);
			position.y -= topBorder(this);
		}
		return position;
	},

	getPosition: function(relative){
		if (isBody(this)) return {x: 0, y: 0};
		var offset = this.getOffsets(),
				scroll = this.getScrolls();
		var position = {
			x: offset.x - scroll.x,
			y: offset.y - scroll.y
		};
		var relativePosition = (relative && (relative = document.id(relative))) ? relative.getPosition() : {x: 0, y: 0};
		return {x: position.x - relativePosition.x, y: position.y - relativePosition.y};
	},

	getCoordinates: function(element){
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

	computePosition: function(obj){
		return {
			left: obj.x - styleNumber(this, 'margin-left'),
			top: obj.y - styleNumber(this, 'margin-top')
		};
	},

	setPosition: function(obj){
		return this.setStyles(this.computePosition(obj));
	}

});


Native.implement([Document, Window], {

	getSize: function(){
		if (Browser.Engine.presto || Browser.Engine.webkit){
			var win = this.getWindow();
			return {x: win.innerWidth, y: win.innerHeight};
		}
		var doc = getCompatElement(this);
		return {x: doc.clientWidth, y: doc.clientHeight};
	},

	getScroll: function(){
		var win = this.getWindow(), doc = getCompatElement(this);
		return {x: win.pageXOffset || doc.scrollLeft, y: win.pageYOffset || doc.scrollTop};
	},

	getScrollSize: function(){
		var doc = getCompatElement(this), min = this.getSize();
		return {x: Math.max(doc.scrollWidth, min.x), y: Math.max(doc.scrollHeight, min.y)};
	},

	getPosition: function(){
		return {x: 0, y: 0};
	},

	getCoordinates: function(){
		var size = this.getSize();
		return {top: 0, left: 0, bottom: size.y, right: size.x, height: size.y, width: size.x};
	}

});

// private methods

var styleString = Element.getComputedStyle;

function styleNumber(element, style){
	return styleString(element, style).toInt() || 0;
};

function borderBox(element){
	return styleString(element, '-moz-box-sizing') == 'border-box';
};

function topBorder(element){
	return styleNumber(element, 'border-top-width');
};

function leftBorder(element){
	return styleNumber(element, 'border-left-width');
};

function isBody(element){
	return (/^(?:body|html)$/i).test(element.tagName);
};

function getCompatElement(element){
	var doc = element.getDocument();
	return (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html : doc.body;
};

})();

//aliases
Element.alias('setPosition', 'position'); //compatability

Native.implement([Window, Document, Element], {

	getHeight: function(){
		return this.getSize().y;
	},

	getWidth: function(){
		return this.getSize().x;
	},

	getScrollTop: function(){
		return this.getScroll().y;
	},

	getScrollLeft: function(){
		return this.getScroll().x;
	},

	getScrollHeight: function(){
		return this.getScrollSize().y;
	},

	getScrollWidth: function(){
		return this.getScrollSize().x;
	},

	getTop: function(){
		return this.getPosition().y;
	},

	getLeft: function(){
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

	getElements: function(expression, nocash){
		expression = expression.split(',');
		var items, local = {};
		for (var i = 0, l = expression.length; i < l; i++){
			var selector = expression[i], elements = Selectors.Utils.search(this, selector, local);
			if (i != 0 && elements.item) elements = $A(elements);
			items = (i == 0) ? elements : (items.item) ? $A(items).concat(elements) : items.concat(elements);
		}
		return new Elements(items, {ddup: (expression.length > 1), cash: !nocash});
	}

});

Element.implement({

	match: function(selector){
		if (!selector || (selector == this)) return true;
		var tagid = Selectors.Utils.parseTagAndID(selector);
		var tag = tagid[0], id = tagid[1];
		if (!Selectors.Filters.byID(this, id) || !Selectors.Filters.byTag(this, tag)) return false;
		var parsed = Selectors.Utils.parseSelector(selector);
		return (parsed) ? Selectors.Utils.filter(this, parsed, {}) : true;
	}

});

var Selectors = {Cache: {nth: {}, parsed: {}}};

Selectors.RegExps = {
	id: (/#([\w-]+)/),
	tag: (/^(\w+|\*)/),
	quick: (/^(\w+|\*)$/),
	splitter: (/\s*([+>~\s])\s*([a-zA-Z#.*:\[])/g),
	combined: (/\.([\w-]+)|\[(\w+)(?:([!*^$~|]?=)(["']?)([^\4]*?)\4)?\]|:([\w-]+)(?:\(["']?(.*?)?["']?\)|$)/g)
};

Selectors.Utils = {

	chk: function(item, uniques){
		if (!uniques) return true;
		var uid = $uid(item);
		if (!uniques[uid]) return uniques[uid] = true;
		return false;
	},

	parseNthArgument: function(argument){
		if (Selectors.Cache.nth[argument]) return Selectors.Cache.nth[argument];
		var parsed = argument.match(/^([+-]?\d*)?([a-z]+)?([+-]?\d*)?$/);
		if (!parsed) return false;
		var inta = parseInt(parsed[1], 10);
		var a = (inta || inta === 0) ? inta : 1;
		var special = parsed[2] || false;
		var b = parseInt(parsed[3], 10) || 0;
		if (a != 0){
			b--;
			while (b < 1) b += a;
			while (b >= a) b -= a;
		} else {
			a = b;
			special = 'index';
		}
		switch (special){
			case 'n': parsed = {a: a, b: b, special: 'n'}; break;
			case 'odd': parsed = {a: 2, b: 0, special: 'n'}; break;
			case 'even': parsed = {a: 2, b: 1, special: 'n'}; break;
			case 'first': parsed = {a: 0, special: 'index'}; break;
			case 'last': parsed = {special: 'last-child'}; break;
			case 'only': parsed = {special: 'only-child'}; break;
			default: parsed = {a: (a - 1), special: 'index'};
		}

		return Selectors.Cache.nth[argument] = parsed;
	},

	parseSelector: function(selector){
		if (Selectors.Cache.parsed[selector]) return Selectors.Cache.parsed[selector];
		var m, parsed = {classes: [], pseudos: [], attributes: []};
		while ((m = Selectors.RegExps.combined.exec(selector))){
			var cn = m[1], an = m[2], ao = m[3], av = m[5], pn = m[6], pa = m[7];
			if (cn){
				parsed.classes.push(cn);
			} else if (pn){
				var parser = Selectors.Pseudo.get(pn);
				if (parser) parsed.pseudos.push({parser: parser, argument: pa});
				else parsed.attributes.push({name: pn, operator: '=', value: pa});
			} else if (an){
				parsed.attributes.push({name: an, operator: ao, value: av});
			}
		}
		if (!parsed.classes.length) delete parsed.classes;
		if (!parsed.attributes.length) delete parsed.attributes;
		if (!parsed.pseudos.length) delete parsed.pseudos;
		if (!parsed.classes && !parsed.attributes && !parsed.pseudos) parsed = null;
		return Selectors.Cache.parsed[selector] = parsed;
	},

	parseTagAndID: function(selector){
		var tag = selector.match(Selectors.RegExps.tag);
		var id = selector.match(Selectors.RegExps.id);
		return [(tag) ? tag[1] : '*', (id) ? id[1] : false];
	},

	filter: function(item, parsed, local){
		var i;
		if (parsed.classes){
			for (i = parsed.classes.length; i--; i){
				var cn = parsed.classes[i];
				if (!Selectors.Filters.byClass(item, cn)) return false;
			}
		}
		if (parsed.attributes){
			for (i = parsed.attributes.length; i--; i){
				var att = parsed.attributes[i];
				if (!Selectors.Filters.byAttribute(item, att.name, att.operator, att.value)) return false;
			}
		}
		if (parsed.pseudos){
			for (i = parsed.pseudos.length; i--; i){
				var psd = parsed.pseudos[i];
				if (!Selectors.Filters.byPseudo(item, psd.parser, psd.argument, local)) return false;
			}
		}
		return true;
	},

	getByTagAndID: function(ctx, tag, id){
		if (id){
			var item = (ctx.getElementById) ? ctx.getElementById(id, true) : Element.getElementById(ctx, id, true);
			return (item && Selectors.Filters.byTag(item, tag)) ? [item] : [];
		} else {
			return ctx.getElementsByTagName(tag);
		}
	},

	search: function(self, expression, local){
		var splitters = [];

		var selectors = expression.trim().replace(Selectors.RegExps.splitter, function(m0, m1, m2){
			splitters.push(m1);
			return ':)' + m2;
		}).split(':)');

		var items, filtered, item;

		for (var i = 0, l = selectors.length; i < l; i++){

			var selector = selectors[i];

			if (i == 0 && Selectors.RegExps.quick.test(selector)){
				items = self.getElementsByTagName(selector);
				continue;
			}

			var splitter = splitters[i - 1];

			var tagid = Selectors.Utils.parseTagAndID(selector);
			var tag = tagid[0], id = tagid[1];

			if (i == 0){
				items = Selectors.Utils.getByTagAndID(self, tag, id);
			} else {
				var uniques = {}, found = [];
				for (var j = 0, k = items.length; j < k; j++) found = Selectors.Getters[splitter](found, items[j], tag, id, uniques);
				items = found;
			}

			var parsed = Selectors.Utils.parseSelector(selector);

			if (parsed){
				filtered = [];
				for (var m = 0, n = items.length; m < n; m++){
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

	' ': function(found, self, tag, id, uniques){
		var items = Selectors.Utils.getByTagAndID(self, tag, id);
		for (var i = 0, l = items.length; i < l; i++){
			var item = items[i];
			if (Selectors.Utils.chk(item, uniques)) found.push(item);
		}
		return found;
	},

	'>': function(found, self, tag, id, uniques){
		var children = Selectors.Utils.getByTagAndID(self, tag, id);
		for (var i = 0, l = children.length; i < l; i++){
			var child = children[i];
			if (child.parentNode == self && Selectors.Utils.chk(child, uniques)) found.push(child);
		}
		return found;
	},

	'+': function(found, self, tag, id, uniques){
		while ((self = self.nextSibling)){
			if (self.nodeType == 1){
				if (Selectors.Utils.chk(self, uniques) && Selectors.Filters.byTag(self, tag) && Selectors.Filters.byID(self, id)) found.push(self);
				break;
			}
		}
		return found;
	},

	'~': function(found, self, tag, id, uniques){
		while ((self = self.nextSibling)){
			if (self.nodeType == 1){
				if (!Selectors.Utils.chk(self, uniques)) break;
				if (Selectors.Filters.byTag(self, tag) && Selectors.Filters.byID(self, id)) found.push(self);
			}
		}
		return found;
	}

};

Selectors.Filters = {

	byTag: function(self, tag){
		return (tag == '*' || (self.tagName && self.tagName.toLowerCase() == tag));
	},

	byID: function(self, id){
		return (!id || (self.id && self.id == id));
	},

	byClass: function(self, klass){
		return (self.className && self.className.contains && self.className.contains(klass, ' '));
	},

	byPseudo: function(self, parser, argument, local){
		return parser.call(self, argument, local);
	},

	byAttribute: function(self, name, operator, value){
		var result = Element.prototype.getProperty.call(self, name);
		if (!result) return (operator == '!=');
		if (!operator || value == undefined) return true;
		switch (operator){
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

	checked: function(){
		return this.checked;
	},
	
	empty: function(){
		return !(this.innerText || this.textContent || '').length;
	},

	not: function(selector){
		return !Element.match(this, selector);
	},

	contains: function(text){
		return (this.innerText || this.textContent || '').contains(text);
	},

	'first-child': function(){
		return Selectors.Pseudo.index.call(this, 0);
	},

	'last-child': function(){
		var element = this;
		while ((element = element.nextSibling)){
			if (element.nodeType == 1) return false;
		}
		return true;
	},

	'only-child': function(){
		var prev = this;
		while ((prev = prev.previousSibling)){
			if (prev.nodeType == 1) return false;
		}
		var next = this;
		while ((next = next.nextSibling)){
			if (next.nodeType == 1) return false;
		}
		return true;
	},

	'nth-child': function(argument, local){
		argument = (argument == undefined) ? 'n' : argument;
		var parsed = Selectors.Utils.parseNthArgument(argument);
		if (parsed.special != 'n') return Selectors.Pseudo[parsed.special].call(this, parsed.a, local);
		var count = 0;
		local.positions = local.positions || {};
		var uid = $uid(this);
		if (!local.positions[uid]){
			var self = this;
			while ((self = self.previousSibling)){
				if (self.nodeType != 1) continue;
				count ++;
				var position = local.positions[$uid(self)];
				if (position != undefined){
					count = position + count;
					break;
				}
			}
			local.positions[uid] = count;
		}
		return (local.positions[uid] % parsed.a == parsed.b);
	},

	// custom pseudo selectors

	index: function(index){
		var element = this, count = 0;
		while ((element = element.previousSibling)){
			if (element.nodeType == 1 && ++count > index) return false;
		}
		return (count == index);
	},

	even: function(argument, local){
		return Selectors.Pseudo['nth-child'].call(this, '2n+1', local);
	},

	odd: function(argument, local){
		return Selectors.Pseudo['nth-child'].call(this, '2n', local);
	},
	
	selected: function(){
		return this.selected;
	},
	
	enabled: function(){
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

	initialize: function(event, win){
		win = win || window;
		var doc = win.document;
		event = event || win.event;
		if (event.$extended) return event;
		this.$extended = true;
		var type = event.type;
		var target = event.target || event.srcElement;
		while (target && target.nodeType == 3) target = target.parentNode;

		if (type.test(/key/)){
			var code = event.which || event.keyCode;
			var key = Event.Keys.keyOf(code);
			if (type == 'keydown'){
				var fKey = code - 111;
				if (fKey > 0 && fKey < 13) key = 'f' + fKey;
			}
			key = key || String.fromCharCode(code).toLowerCase();
		} else if (type.match(/(click|mouse|menu)/i)){
			doc = (!doc.compatMode || doc.compatMode == 'CSS1Compat') ? doc.html : doc.body;
			var page = {
				x: event.pageX || event.clientX + doc.scrollLeft,
				y: event.pageY || event.clientY + doc.scrollTop
			};
			var client = {
				x: (event.pageX) ? event.pageX - win.pageXOffset : event.clientX,
				y: (event.pageY) ? event.pageY - win.pageYOffset : event.clientY
			};
			if (type.match(/DOMMouseScroll|mousewheel/)){
				var wheel = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
			}
			var rightClick = (event.which == 3) || (event.button == 2);
			var related = null;
			if (type.match(/over|out/)){
				switch (type){
					case 'mouseover': related = event.relatedTarget || event.fromElement; break;
					case 'mouseout': related = event.relatedTarget || event.toElement;
				}
				if (!(function(){
					while (related && related.nodeType == 3) related = related.parentNode;
					return true;
				}).create({attempt: Browser.Engine.gecko})()) related = false;
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

	stop: function(){
		return this.stopPropagation().preventDefault();
	},

	stopPropagation: function(){
		if (this.event.stopPropagation) this.event.stopPropagation();
		else this.event.cancelBubble = true;
		return this;
	},

	preventDefault: function(){
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

Element.Properties.events = {set: function(events){
	this.addEvents(events);
}};

Native.implement([Element, Window, Document], {

	addEvent: function(type, fn){
		var events = this.retrieve('events', {});
		events[type] = events[type] || {'keys': [], 'values': []};
		if (events[type].keys.contains(fn)) return this;
		events[type].keys.push(fn);
		var realType = type, custom = Element.Events.get(type), condition = fn, self = this;
		if (custom){
			if (custom.onAdd) custom.onAdd.call(this, fn);
			if (custom.condition){
				condition = function(event){
					if (custom.condition.call(this, event)) return fn.call(this, event);
					return true;
				};
			}
			realType = custom.base || realType;
		}
		var defn = function(){
			return fn.call(self);
		};
		var nativeEvent = Element.NativeEvents[realType];
		if (nativeEvent){
			if (nativeEvent == 2){
				defn = function(event){
					event = new Event(event, self.getWindow());
					if (condition.call(self, event) === false) event.stop();
				};
			}
			this.addListener(realType, defn);
		}
		events[type].values.push(defn);
		return this;
	},

	removeEvent: function(type, fn){
		var events = this.retrieve('events');
		if (!events || !events[type]) return this;
		var pos = events[type].keys.indexOf(fn);
		if (pos == -1) return this;
		events[type].keys.splice(pos, 1);
		var value = events[type].values.splice(pos, 1)[0];
		var custom = Element.Events.get(type);
		if (custom){
			if (custom.onRemove) custom.onRemove.call(this, fn);
			type = custom.base || type;
		}
		return (Element.NativeEvents[type]) ? this.removeListener(type, value) : this;
	},

	addEvents: function(events){
		for (var event in events) this.addEvent(event, events[event]);
		return this;
	},

	removeEvents: function(events){
		var type;
		if ($type(events) == 'object'){
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		var attached = this.retrieve('events');
		if (!attached) return this;
		if (!events){
			for (type in attached) this.removeEvents(type);
			this.eliminate('events');
		} else if (attached[events]){
			while (attached[events].keys[0]) this.removeEvent(events, attached[events].keys[0]);
			attached[events] = null;
		}
		return this;
	},

	fireEvent: function(type, args, delay){
		var events = this.retrieve('events');
		if (!events || !events[type]) return this;
		events[type].keys.each(function(fn){
			fn.create({'bind': this, 'delay': delay, 'arguments': args})();
		}, this);
		return this;
	},

	cloneEvents: function(from, type){
		from = document.id(from);
		var fevents = from.retrieve('events');
		if (!fevents) return this;
		if (!type){
			for (var evType in fevents) this.cloneEvents(from, evType);
		} else if (fevents[type]){
			fevents[type].keys.each(function(fn){
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

(function(){

var $check = function(event){
	var related = event.relatedTarget;
	if (related == undefined) return true;
	if (related === false) return false;
	return ($type(this) != 'document' && related != this && related.prefix != 'xul' && !this.hasChild(related));
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
		base: (Browser.Engine.gecko) ? 'DOMMouseScroll' : 'mousewheel'
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

function Class(params){
	
	if (params instanceof Function) params = {initialize: params};
	
	var newClass = function(){
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

Function.prototype.protect = function(){
	this._protected = true;
	return this;
};

Object.reset = function(object, key){
		
	if (key == null){
		for (var p in object) Object.reset(object, p);
		return object;
	}
	
	delete object[key];
	
	switch ($type(object[key])){
		case 'object':
			var F = function(){};
			F.prototype = object[key];
			var i = new F;
			object[key] = Object.reset(i);
		break;
		case 'array': object[key] = $unlink(object[key]); break;
	}
	
	return object;
	
};

new Native({name: 'Class', initialize: Class}).extend({

	instantiate: function(F){
		F._prototyping = true;
		var proto = new F;
		delete F._prototyping;
		return proto;
	},
	
	wrap: function(self, key, method){
		if (method._origin) method = method._origin;
		
		return function(){
			if (method._protected && this._current == null) throw new Error('The method "' + key + '" cannot be called.');
			var caller = this.caller, current = this._current;
			this.caller = current; this._current = arguments.callee;
			var result = method.apply(this, arguments);
			this._current = current; this.caller = caller;
			return result;
		}.extend({_owner: self, _origin: method, _name: key});

	}
	
});

Class.implement({
	
	implement: function(key, value){
		
		if ($type(key) == 'object'){
			for (var p in key) this.implement(p, key[p]);
			return this;
		}
		
		var mutator = Class.Mutators[key];
		
		if (mutator){
			value = mutator.call(this, value);
			if (value == null) return this;
		}
		
		var proto = this.prototype;

		switch ($type(value)){
			
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
	
	Extends: function(parent){

		this.parent = parent;
		this.prototype = Class.instantiate(parent);

		this.implement('parent', function(){
			var name = this.caller._name, previous = this.caller._owner.parent.prototype[name];
			if (!previous) throw new Error('The method "' + name + '" has no parent.');
			return previous.apply(this, arguments);
		}.protect());

	},

	Implements: function(items){
		$splat(items).each(function(item){
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

	chain: function(){
		this.$chain.extend(Array.flatten(arguments));
		return this;
	},

	callChain: function(){
		return (this.$chain.length) ? this.$chain.shift().apply(this, arguments) : false;
	},

	clearChain: function(){
		this.$chain.empty();
		return this;
	}

});

var Events = new Class({

	$events: {},

	addEvent: function(type, fn, internal){
		type = Events.removeOn(type);
		if (fn != $empty){
			this.$events[type] = this.$events[type] || [];
			this.$events[type].include(fn);
			if (internal) fn.internal = true;
		}
		return this;
	},

	addEvents: function(events){
		for (var type in events) this.addEvent(type, events[type]);
		return this;
	},

	fireEvent: function(type, args, delay){
		type = Events.removeOn(type);
		if (!this.$events || !this.$events[type]) return this;
		this.$events[type].each(function(fn){
			fn.create({'bind': this, 'delay': delay, 'arguments': args})();
		}, this);
		return this;
	},

	removeEvent: function(type, fn){
		type = Events.removeOn(type);
		if (!this.$events[type]) return this;
		if (!fn.internal) this.$events[type].erase(fn);
		return this;
	},

	removeEvents: function(events){
		var type;
		if ($type(events) == 'object'){
			for (type in events) this.removeEvent(type, events[type]);
			return this;
		}
		if (events) events = Events.removeOn(events);
		for (type in this.$events){
			if (events && events != type) continue;
			var fns = this.$events[type];
			for (var i = fns.length; i--; i) this.removeEvent(type, fns[i]);
		}
		return this;
	}

});

Events.removeOn = function(string){
	return string.replace(/^on([A-Z])/, function(full, first){
		return first.toLowerCase();
	});
};

var Options = new Class({

	setOptions: function(){
		this.options = $merge.run([this.options].extend(arguments));
		if (!this.addEvent) return this;
		for (var option in this.options){
			if ($type(this.options[option]) != 'function' || !(/^on[A-Z]/).test(option)) continue;
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

	options: {/*
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

	initialize: function(options){
		this.xhr = new Browser.Request();
		this.setOptions(options);
		this.options.isSuccess = this.options.isSuccess || this.isSuccess;
		this.headers = new Hash(this.options.headers);
	},

	onStateChange: function(){
		if (this.xhr.readyState != 4 || !this.running) return;
		this.running = false;
		this.status = 0;
		$try(function(){
			this.status = this.xhr.status;
		}.bind(this));
		this.xhr.onreadystatechange = $empty;
		if (this.options.isSuccess.call(this, this.status)){
			this.response = {text: this.xhr.responseText, xml: this.xhr.responseXML};
			this.success(this.response.text, this.response.xml);
		} else {
			this.response = {text: null, xml: null};
			this.failure();
		}
	},

	isSuccess: function(){
		return ((this.status >= 200) && (this.status < 300));
	},

	processScripts: function(text){
		if (this.options.evalResponse || (/(ecma|java)script/).test(this.getHeader('Content-type'))) return $exec(text);
		return text.stripScripts(this.options.evalScripts);
	},

	success: function(text, xml){
		this.onSuccess(this.processScripts(text), xml);
	},

	onSuccess: function(){
		this.fireEvent('complete', arguments).fireEvent('success', arguments).callChain();
	},

	failure: function(){
		this.onFailure();
	},

	onFailure: function(){
		this.fireEvent('complete').fireEvent('failure', this.xhr);
	},

	setHeader: function(name, value){
		this.headers.set(name, value);
		return this;
	},

	getHeader: function(name){
		return $try(function(){
			return this.xhr.getResponseHeader(name);
		}.bind(this));
	},

	check: function(){
		if (!this.running) return true;
		switch (this.options.link){
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(this.caller.bind(this, arguments)); return false;
		}
		return false;
	},

	send: function(options){
		if (!this.check(options)) return this;
		this.running = true;

		var type = $type(options);
		if (type == 'string' || type == 'element') options = {data: options};

		var old = this.options;
		options = $extend({data: old.data, url: old.url, method: old.method}, options);
		var data = options.data, url = String(options.url), method = options.method.toLowerCase();

		switch ($type(data)){
			case 'element': data = document.id(data).toQueryString(); break;
			case 'object': case 'hash': data = Hash.toQueryString(data);
		}

		if (this.options.format){
			var format = 'format=' + this.options.format;
			data = (data) ? format + '&' + data : format;
		}

		if (this.options.emulation && !['get', 'post'].contains(method)){
			var _method = '_method=' + method;
			data = (data) ? _method + '&' + data : _method;
			method = 'post';
		}

		if (this.options.urlEncoded && method == 'post'){
			var encoding = (this.options.encoding) ? '; charset=' + this.options.encoding : '';
			this.headers.set('Content-type', 'application/x-www-form-urlencoded' + encoding);
		}

		if (this.options.noCache){
			var noCache = 'noCache=' + new Date().getTime();
			data = (data) ? noCache + '&' + data : noCache;
		}

		var trimPosition = url.lastIndexOf('/');
		if (trimPosition > -1 && (trimPosition = url.indexOf('#')) > -1) url = url.substr(0, trimPosition);

		if (data && method == 'get'){
			url = url + (url.contains('?') ? '&' : '?') + data;
			data = null;
		}

		this.xhr.open(method.toUpperCase(), url, this.options.async);

		this.xhr.onreadystatechange = this.onStateChange.bind(this);

		this.headers.each(function(value, key){
			try {
				this.xhr.setRequestHeader(key, value);
			} catch (e){
				this.fireEvent('exception', [key, value]);
			}
		}, this);

		this.fireEvent('request');
		this.xhr.send(data);
		if (!this.options.async) this.onStateChange();
		return this;
	},

	cancel: function(){
		if (!this.running) return this;
		this.running = false;
		this.xhr.abort();
		this.xhr.onreadystatechange = $empty;
		this.xhr = new Browser.Request();
		this.fireEvent('cancel');
		return this;
	}

});

(function(){

var methods = {};
['get', 'post', 'put', 'delete', 'GET', 'POST', 'PUT', 'DELETE'].each(function(method){
	methods[method] = function(){
		var params = Array.link(arguments, {url: String.type, data: $defined});
		return this.send($extend(params, {method: method}));
	};
});

Request.implement(methods);

})();

Element.Properties.send = {

	set: function(options){
		var send = this.retrieve('send');
		if (send) send.cancel();
		return this.eliminate('send').store('send:options', $extend({
			data: this, link: 'cancel', method: this.get('method') || 'post', url: this.get('action')
		}, options));
	},

	get: function(options){
		if (options || !this.retrieve('send')){
			if (options || !this.retrieve('send:options')) this.set('send', options);
			this.store('send', new Request(this.retrieve('send:options')));
		}
		return this.retrieve('send');
	}

};

Element.implement({

	send: function(url){
		var sender = this.get('send');
		sender.send({data: this, url: url || sender.options.url});
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

	processHTML: function(text){
		var match = text.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
		text = (match) ? match[1] : text;

		var container = new Element('div');

		return $try(function(){
			var root = '<root>' + text + '</root>', doc;
			if (Browser.Engine.trident){
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = false;
				doc.loadXML(root);
			} else {
				doc = new DOMParser().parseFromString(root, 'text/xml');
			}
			root = doc.getElementsByTagName('root')[0];
			if (!root) return null;
			for (var i = 0, k = root.childNodes.length; i < k; i++){
				var child = Element.clone(root.childNodes[i], true, true);
				if (child) container.grab(child);
			}
			return container;
		}) || container.set('html', text);
	},

	success: function(text){
		var options = this.options, response = this.response;

		response.html = text.stripScripts(function(script){
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

	set: function(options){
		var load = this.retrieve('load');
		if (load) load.cancel();
		return this.eliminate('load').store('load:options', $extend({data: this, link: 'cancel', update: this, method: 'get'}, options));
	},

	get: function(options){
		if (options || ! this.retrieve('load')){
			if (options || !this.retrieve('load:options')) this.set('load', options);
			this.store('load', new Request.HTML(this.retrieve('load:options')));
		}
		return this.retrieve('load');
	}

};

Element.implement({

	load: function(){
		this.get('load').send(Array.link(arguments, {data: Object.type, url: String.type}));
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

	initialize: function(options){
		this.subject = this.subject || this;
		this.setOptions(options);
		this.options.duration = Fx.Durations[this.options.duration] || this.options.duration.toInt();
		var wait = this.options.wait;
		if (wait === false) this.options.link = 'cancel';
	},

	getTransition: function(){
		return function(p){
			return -(Math.cos(Math.PI * p) - 1) / 2;
		};
	},

	step: function(){
		var time = $time();
		if (time < this.time + this.options.duration){
			var delta = this.transition((time - this.time) / this.options.duration);
			this.set(this.compute(this.from, this.to, delta));
		} else {
			this.set(this.compute(this.from, this.to, 1));
			this.complete();
		}
	},

	set: function(now){
		return now;
	},

	compute: function(from, to, delta){
		return Fx.compute(from, to, delta);
	},

	check: function(){
		if (!this.timer) return true;
		switch (this.options.link){
			case 'cancel': this.cancel(); return true;
			case 'chain': this.chain(this.caller.bind(this, arguments)); return false;
		}
		return false;
	},

	start: function(from, to){
		if (!this.check(from, to)) return this;
		this.from = from;
		this.to = to;
		this.time = 0;
		this.transition = this.getTransition();
		this.startTimer();
		this.onStart();
		return this;
	},

	complete: function(){
		if (this.stopTimer()) this.onComplete();
		return this;
	},

	cancel: function(){
		if (this.stopTimer()) this.onCancel();
		return this;
	},

	onStart: function(){
		this.fireEvent('start', this.subject);
	},

	onComplete: function(){
		this.fireEvent('complete', this.subject);
		if (!this.callChain()) this.fireEvent('chainComplete', this.subject);
	},

	onCancel: function(){
		this.fireEvent('cancel', this.subject).clearChain();
	},

	pause: function(){
		this.stopTimer();
		return this;
	},

	resume: function(){
		this.startTimer();
		return this;
	},

	stopTimer: function(){
		if (!this.timer) return false;
		this.time = $time() - this.time;
		this.timer = $clear(this.timer);
		return true;
	},

	startTimer: function(){
		if (this.timer) return false;
		this.time = $time() - this.time;
		this.timer = this.step.periodical(Math.round(1000 / this.options.fps), this);
		return true;
	}

});

Fx.compute = function(from, to, delta){
	return (to - from) * delta + from;
};

Fx.Durations = {'short': 250, 'normal': 500, 'long': 1000};

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

	prepare: function(element, property, values){
		values = $splat(values);
		var values1 = values[1];
		if (!$chk(values1)){
			values[1] = values[0];
			values[0] = element.getStyle(property);
		}
		var parsed = values.map(this.parse);
		return {from: parsed[0], to: parsed[1]};
	},

	//parses a value into an array

	parse: function(value){
		value = $lambda(value)();
		value = (typeof value == 'string') ? value.split(' ') : $splat(value);
		return value.map(function(val){
			val = String(val);
			var found = false;
			Fx.CSS.Parsers.each(function(parser, key){
				if (found) return;
				var parsed = parser.parse(val);
				if ($chk(parsed)) found = {value: parsed, parser: parser};
			});
			found = found || {value: val, parser: Fx.CSS.Parsers.String};
			return found;
		});
	},

	//computes by a from and to prepared objects, using their parsers.

	compute: function(from, to, delta){
		var computed = [];
		(Math.min(from.length, to.length)).times(function(i){
			computed.push({value: from[i].parser.compute(from[i].value, to[i].value, delta), parser: from[i].parser});
		});
		computed.$family = {name: 'fx:css:value'};
		return computed;
	},

	//serves the value as settable

	serve: function(value, unit){
		if ($type(value) != 'fx:css:value') value = this.parse(value);
		var returned = [];
		value.each(function(bit){
			returned = returned.concat(bit.parser.serve(bit.value, unit));
		});
		return returned;
	},

	//renders the change to an element

	render: function(element, property, value, unit){
		element.setStyle(property, this.serve(value, unit));
	},

	//searches inside the page css to find the values for a selector

	search: function(selector){
		if (Fx.CSS.Cache[selector]) return Fx.CSS.Cache[selector];
		var to = {};
		Array.each(document.styleSheets, function(sheet, j){
			var href = sheet.href;
			if (href && href.contains('://') && !href.contains(document.domain)) return;
			var rules = sheet.rules || sheet.cssRules;
			Array.each(rules, function(rule, i){
				if (!rule.style) return;
				var selectorText = (rule.selectorText) ? rule.selectorText.replace(/^\w+/, function(m){
					return m.toLowerCase();
				}) : null;
				if (!selectorText || !selectorText.test('^' + selector + '$')) return;
				Element.Styles.each(function(value, style){
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
		parse: function(value){
			if (value.match(/^#[0-9a-f]{3,6}$/i)) return value.hexToRgb(true);
			return ((value = value.match(/(\d+),\s*(\d+),\s*(\d+)/))) ? [value[1], value[2], value[3]] : false;
		},
		compute: function(from, to, delta){
			return from.map(function(value, i){
				return Math.round(Fx.compute(from[i], to[i], delta));
			});
		},
		serve: function(value){
			return value.map(Number);
		}
	},

	Number: {
		parse: parseFloat,
		compute: Fx.compute,
		serve: function(value, unit){
			return (unit) ? value + unit : value;
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

	initialize: function(element, options){
		this.element = this.subject = document.id(element);
		this.parent(options);
	},

	set: function(property, now){
		if (arguments.length == 1){
			now = property;
			property = this.property || this.options.property;
		}
		this.render(this.element, property, now, this.options.unit);
		return this;
	},

	start: function(property, from, to){
		if (!this.check(property, from, to)) return this;
		var args = Array.flatten(arguments);
		this.property = this.options.property || args.shift();
		var parsed = this.prepare(this.element, this.property, args);
		return this.parent(parsed.from, parsed.to);
	}

});

Element.Properties.tween = {

	set: function(options){
		var tween = this.retrieve('tween');
		if (tween) tween.cancel();
		return this.eliminate('tween').store('tween:options', $extend({link: 'cancel'}, options));
	},

	get: function(options){
		if (options || !this.retrieve('tween')){
			if (options || !this.retrieve('tween:options')) this.set('tween', options);
			this.store('tween', new Fx.Tween(this, this.retrieve('tween:options')));
		}
		return this.retrieve('tween');
	}

};

Element.implement({

	tween: function(property, from, to){
		this.get('tween').start(arguments);
		return this;
	},

	fade: function(how){
		var fade = this.get('tween'), o = 'opacity', toggle;
		how = $pick(how, 'toggle');
		switch (how){
			case 'in': fade.start(o, 1); break;
			case 'out': fade.start(o, 0); break;
			case 'show': fade.set(o, 1); break;
			case 'hide': fade.set(o, 0); break;
			case 'toggle':
				var flag = this.retrieve('fade:flag', this.get('opacity') == 1);
				fade.start(o, (flag) ? 0 : 1);
				this.store('fade:flag', !flag);
				toggle = true;
			break;
			default: fade.start(o, arguments);
		}
		if (!toggle) this.eliminate('fade:flag');
		return this;
	},

	highlight: function(start, end){
		if (!end){
			end = this.retrieve('highlight:original', this.getStyle('background-color'));
			end = (end == 'transparent') ? '#fff' : end;
		}
		var tween = this.get('tween');
		tween.start('background-color', start || '#ffff88', end).chain(function(){
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

	getTransition: function(){
		var trans = this.options.transition || Fx.Transitions.Sine.easeInOut;
		if (typeof trans == 'string'){
			var data = trans.split(':');
			trans = Fx.Transitions;
			trans = trans[data[0]] || trans[data[0].capitalize()];
			if (data[1]) trans = trans['ease' + data[1].capitalize() + (data[2] ? data[2].capitalize() : '')];
		}
		return trans;
	}

});

Fx.Transition = function(transition, params){
	params = $splat(params);
	return $extend(transition, {
		easeIn: function(pos){
			return transition(pos, params);
		},
		easeOut: function(pos){
			return 1 - transition(1 - pos, params);
		},
		easeInOut: function(pos){
			return (pos <= 0.5) ? transition(2 * pos, params) / 2 : (2 - transition(2 * (1 - pos), params)) / 2;
		}
	});
};

Fx.Transitions = new Hash({

	linear: $arguments(0)

});

Fx.Transitions.extend = function(transitions){
	for (var transition in transitions) Fx.Transitions[transition] = new Fx.Transition(transitions[transition]);
};

Fx.Transitions.extend({

	Pow: function(p, x){
		return Math.pow(p, x[0] || 6);
	},

	Expo: function(p){
		return Math.pow(2, 8 * (p - 1));
	},

	Circ: function(p){
		return 1 - Math.sin(Math.acos(p));
	},

	Sine: function(p){
		return 1 - Math.sin((1 - p) * Math.PI / 2);
	},

	Back: function(p, x){
		x = x[0] || 1.618;
		return Math.pow(p, 2) * ((x + 1) * p - x);
	},

	Bounce: function(p){
		var value;
		for (var a = 0, b = 1; 1; a += b, b /= 2){
			if (p >= (7 - 4 * a) / 11){
				value = b * b - Math.pow((11 - 6 * a - 11 * p) / 4, 2);
				break;
			}
		}
		return value;
	},

	Elastic: function(p, x){
		return Math.pow(2, 10 * --p) * Math.cos(20 * p * Math.PI * (x[0] || 1) / 3);
	}

});

['Quad', 'Cubic', 'Quart', 'Quint'].each(function(transition, i){
	Fx.Transitions[transition] = new Fx.Transition(function(p){
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

	initialize: function(element, options){
		this.element = this.subject = document.id(element);
		this.parent(options);
	},

	set: function(now){
		if (typeof now == 'string') now = this.search(now);
		for (var p in now) this.render(this.element, p, now[p], this.options.unit);
		return this;
	},

	compute: function(from, to, delta){
		var now = {};
		for (var p in from) now[p] = this.parent(from[p], to[p], delta);
		return now;
	},

	start: function(properties){
		if (!this.check(properties)) return this;
		if (typeof properties == 'string') properties = this.search(properties);
		var from = {}, to = {};
		for (var p in properties){
			var parsed = this.prepare(this.element, p, properties[p]);
			from[p] = parsed.from;
			to[p] = parsed.to;
		}
		return this.parent(from, to);
	}

});

Element.Properties.morph = {

	set: function(options){
		var morph = this.retrieve('morph');
		if (morph) morph.cancel();
		return this.eliminate('morph').store('morph:options', $extend({link: 'cancel'}, options));
	},

	get: function(options){
		if (options || !this.retrieve('morph')){
			if (options || !this.retrieve('morph:options')) this.set('morph', options);
			this.store('morph', new Fx.Morph(this, this.retrieve('morph:options')));
		}
		return this.retrieve('morph');
	}

};

Element.implement({

	morph: function(props){
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

	onAdd: function(fn){
		if (Browser.loaded) fn.call(this);
	}

};

(function(){

	var domready = function(){
		if (Browser.loaded) return;
		Browser.loaded = true;
		window.fireEvent('domready');
		document.fireEvent('domready');
	};
	
	window.addEvent('load', domready);

	if (Browser.Engine.trident){
		var temp = document.createElement('div');
		(function(){
			($try(function(){
				temp.doScroll(); // Technique by Diego Perini
				return document.id(temp).inject(document.body).set('html', 'temp').dispose();
			})) ? domready() : arguments.callee.delay(50);
		})();
	} else if (Browser.Engine.webkit && Browser.Engine.version < 525){
		(function(){
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

	initialize: function(key, options){
		this.key = key;
		this.setOptions(options);
	},

	write: function(value){
		value = encodeURIComponent(value);
		if (this.options.domain) value += '; domain=' + this.options.domain;
		if (this.options.path) value += '; path=' + this.options.path;
		if (this.options.duration){
			var date = new Date();
			date.setTime(date.getTime() + this.options.duration * 24 * 60 * 60 * 1000);
			value += '; expires=' + date.toGMTString();
		}
		if (this.options.secure) value += '; secure';
		this.options.document.cookie = this.key + '=' + value;
		return this;
	},

	read: function(){
		var value = this.options.document.cookie.match('(?:^|;)\\s*' + this.key.escapeRegExp() + '=([^;]*)');
		return (value) ? decodeURIComponent(value[1]) : null;
	},

	dispose: function(){
		new Cookie(this.key, $merge(this.options, {duration: -1})).write('');
		return this;
	}

});

Cookie.write = function(key, value, options){
	return new Cookie(key, options).write(value);
};

Cookie.read = function(key){
	return new Cookie(key).read();
};

Cookie.dispose = function(key, options){
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

	toElement: function(){
		return this.object;
	},

	initialize: function(path, options){
		this.instance = 'Swiff_' + $time();

		this.setOptions(options);
		options = this.options;
		var id = this.id = options.id || this.instance;
		var container = document.id(options.container);

		Swiff.CallBacks[this.instance] = {};

		var params = options.params, vars = options.vars, callBacks = options.callBacks;
		var properties = $extend({height: options.height, width: options.width}, options.properties);

		var self = this;

		for (var callBack in callBacks){
			Swiff.CallBacks[this.instance][callBack] = (function(option){
				return function(){
					return option.apply(self.object, arguments);
				};
			})(callBacks[callBack]);
			vars[callBack] = 'Swiff.CallBacks.' + this.instance + '.' + callBack;
		}

		params.flashVars = Hash.toQueryString(vars);
		if (Browser.Engine.trident){
			properties.classid = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
			params.movie = path;
		} else {
			properties.type = 'application/x-shockwave-flash';
			properties.data = path;
		}
		var build = '<object id="' + id + '"';
		for (var property in properties) build += ' ' + property + '="' + properties[property] + '"';
		build += '>';
		for (var param in params){
			if (params[param]) build += '<param name="' + param + '" value="' + params[param] + '" />';
		}
		build += '</object>';
		this.object = ((container) ? container.empty() : new Element('div')).set('html', build).firstChild;
	},

	replaces: function(element){
		element = document.id(element, true);
		element.parentNode.replaceChild(this.toElement(), element);
		return this;
	},

	inject: function(element){
		document.id(element, true).appendChild(this.toElement());
		return this;
	},

	remote: function(){
		return Swiff.remote.apply(Swiff, [this.toElement()].extend(arguments));
	}

});

Swiff.CallBacks = {};

Swiff.remote = function(obj, fn){
	var rs = obj.CallFunction('<invoke name="' + fn + '" returntype="javascript">' + __flash__argumentsToXML(arguments, 2) + '</invoke>');
	return eval(rs);
};

// end Greased MooTools
//
// hack to circumvent 'bug' when overriding toString (and others):
// https://mootools.lighthouseapp.com/projects/2706/tickets/651-classtostring-broken-on-122-big-regression
['toString', 'toLocaleString', 'valueOf', 'toSource', 'watch', 'unwatch', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable'].each(function (method) {
	Class.Mutators[method] = $arguments(0);
});

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


    GM_getMagisterLudi = function () {
	return getJSVariable(/[\"\']api_key[\"\'][ :]+[\"\']([^\"\']+)[\"\']/);
    }

    GM_getAuthHash = function () {
	return getJSVariable(/[\"\']auth_hash[\"\'][ :]+[\"\']([^\"\']+)[\"\']/);
    }

    GM_getAuthToken = function () {
	return getJSVariable(/[\"\']auth_token[\"\'][ :]+[\"\']([^\"\']+)[\"\']/);
    }

var global_group_id = { found: false };

    GM_getGroupId = function(callback) {
    	if (global_group_id.found == true) {
		callback({ success: true, groupId: global_group_id });
		return;
	}
	var reMatch = /\"id\"[ :]+[\'\"]([^\'\"]+@\w\d{2})[\'\"]/;
	var pageGroupId = getJSVariable(reMatch);
	if (!$chk(pageGroupId)) {
		var rssFeeds = $$('a[href*=groups_discuss.gne]');
		if (rssFeeds.length > 0) {
			var groupFeed = rssFeeds[0];
			try {
				pageGroupId = groupFeed.get('href').match(/(\d+@\w\d{2})/)[1];
			} catch(e) {
				// ignore
			}
		}
	}
	if ($chk(pageGroupId)) {
		global_group_id = { found: true, id: pageGroupId };
		callback({ success: true, groupId: global_group_id });
		return;
	}
	global_group_id = { found: false, error: "not found in page" };

	// the surest way, but needs an extra API call, still necessary for private groups!
	new Request({
       		url: 'http://www.flickr.com',
       		onSuccess: function (responseText, responseXML) {
			var result;
			try {
			    result = JSON.parse(responseText);
			} catch (e) {
				try {
					result = eval('(' + responseText + ')');
				} catch (f) {
					GM_log("error parsing lookupGroup data: " + e);
					callback({ success: false, error: "error parsing lookupGroup data: " + e });
					return;
				}
			}
			if (result.stat === 'fail') {
				GM_log("failed API call: " + result.message);
				callback({ success: false, error: "failed API call: " + result.message });
				return;
			}
			global_group_id = { found: true, id: result.group.id };
			callback({ success: true, groupId: global_group_id });
		},
		onFailure: function (response) {
			global_group_id = { found: false, error: "failure requesting group_id: " + response.statusText };
			GM_log("failure requesting group_id: " + response.statusText);
			callback({ success: false, error: "failure requesting group_id: " + response.statusText });
		}
	}).get('/services/rest', {
	            api_key: GM_getMagisterLudi(),
	            auth_hash: GM_getAuthHash(),
	            auth_token: GM_getAuthToken(),
	            format: 'json',
	            method: 'flickr.urls.lookupGroup',
	            nojsoncallback: 1,
	            url: document.location.href
	});
    }


    GM_getUserNsid = function() {
	var reMatch = /global_nsid[ =]+\'([^\']+)\'/;
	var retval = getJSVariable(reMatch);
	if (!$chk(retval)) {
		reMatch = /\"nsid\"[ :]+\"([^\"]+)\"/;
		retval = getJSVariable(reMatch);
	}
	return retval;
    }


if (Browser.Engine.webkit || // Chrome, Safari
    Browser.Engine.presto) { // Opera

    var keyPrefix = 'FlickrConversationBackup.';

    GM_log = function (message) {
        if (Browser.Engine.webkit) {
            console.info("FCB: " + message);
        } else {
            opera.postError(message);
        }
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
        } catch (e) {
            GM_log("error setting value: " + e);
        }
    }

    GM_deleteValue = function(key) {
        try {
            window.localStorage.removeItem(keyPrefix + key);
        } catch (e) {
            GM_log("error removing value: " + e);
        }
    }

}

if (debug) GM_log("DEBUGGING");

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
		    background: '#E0E0E0',
		    padding: '2px 4px',
		    display: 'block',
		    '-moz-background-clip': 'border',
		    '-moz-background-origin': 'padding',
		    '-moz-background-inline-policy': 'continuous',
		    position: 'fixed',
		    opacity: '0.7',
		    'z-index': 1011,
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
        html: 'Flickr Conversation backup: ' + (beta ? 'beta ' + version : onlineVersion + ' available'),
        href: 'http://userscripts.org/scripts/show/' + scriptNumber,
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
        href: 'http://www.flickr.com/groups/flickrhacks/discuss/' + feedbackThreadId + '/lastpage',
        styles: {
            'text-decoration': 'none'
        },
        target: '_blank'
    }).inject(updater);
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
	getTopicInfo({ topicId: feedbackThreadId, groupId: null, callback: function (retval) {
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
	} });
    }

    var onlineVersion = GM_getValue("onlineVersion");
    if ($chk(onlineVersion)) {
        var updateAvailable = false;
        var reVersionMatch      = /(\d+)\.(\d+)/;
        var onlineVersionParts  = reVersionMatch.exec(onlineVersion);
        var currentVersionParts = reVersionMatch.exec(FCBversion);
        var onlineVersionMajor, onlineVersionMinor;
        //[ onlineVersion, onlineVersionMajor, onlineVersionMinor] = onlineVersionParts; 'invalid left-hand side' in Chrome
        onlineVersionMajor = onlineVersionParts[1];
        onlineVersionMinor = onlineVersionParts[2];
        var currentVersionMajor, currentVersionMinor;
        //[ currentVersion, currentVersionMajor, currentVersionMinor] = currentVersionParts;
        currentVersionMajor = currentVersionParts[1];
        currentVersionMinor = currentVersionParts[2];
        // first check major: important update! => rewrite, flickr updates, greasemonkey updates
        if (parseInt(onlineVersionMajor, 10) > parseInt(currentVersionMajor, 10)) {
            updateAvailable = true;
        } else if (parseInt(onlineVersionMajor, 10) === parseInt(currentVersionMajor, 10)) { // we don't want to downgrade
            // minor version update => new functionality
            if (parseInt(onlineVersionMinor, 10) > parseInt(currentVersionMinor, 10)) {
                updateAvailable = true;
            }
        }
        if (updateAvailable) {
            showUpdateNotification({ onlineVersion : onlineVersion });
        } else if (version != onlineVersion) {
		showUpdateNotification({ version: version, beta: true });
	}
    }
  } catch (e) {
    GM_log("checkVersion error: " + e);
  }
}

if (window.name === 'Log page') {
    return; //don't process log page
}

// cleanup storage
GM_deleteValue("version");

checkVersion(FCBversion);

// the real code

var seconds = null;
var ticker = null;

function startTimer() {
	seconds = 0;
	ticker = setInterval(function () {
		++seconds;
		var secs = seconds;
		var hrs = Math.floor( secs / 3600 );
		secs %= 3600;
		var mns = Math.floor( secs / 60 );
		secs %= 60;
		var pretty = (hrs > 0 ? ( hrs < 10 ? "0" : "" ) + hrs + 'h' : '') +
			     (mns > 0 || hrs > 0 ? ( mns < 10 ? "0" : "" ) + mns + 'm' : '') +
			     ( secs < 10 ? "0" : "" ) + secs + 's';
		document.getElementById('ticker').fireEvent('tick', pretty);
	}, 1000);
	//tick();
}

function stopTimer() {
	clearInterval(ticker);
	ticker = null;
}

function addHeader(data) {
	var element = data.element;
	var titleWidth = data.titleWidth;

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
        ).inject(element);
	new Element('label', {
			id: 'FCB-backupdialog_title',
			html: 'Flickr Conversation Backup v' + FCBversion,
			styles: {
				fontWeight: 'bold',
				width: titleWidth,
				'float': 'center'
			}
	}).inject(element);
	new Element('a', {
			html: 'feedback thread',
			href: 'http://www.flickr.com/groups/flickrhacks/discuss/' + feedbackThreadId + '/',
			title: 'opens in new tab',
			target: '_blank',
			styles: {
				'float': 'right'
			}
	}).inject(element);
}

function addThreadSummary(data) {
	var element = data.element;
	var topicId = data.topicId;

	var summaryList = new Element('ul', { styles: { clear: 'both' } }).inject(element);
	var item = new Element('li').inject(summaryList);
	new Element('span', { html: 'Group ID: ' }).inject(item);
	new Element('span', { id: 'FCB-thread-summary-groupid-' + topicId }).inject(item);
	new Element('img', { id: 'FCB-thread-summary-groupimg-' + topicId, src: images.updating, title: 'retrieving group info' }).inject(item);
	new Element('span').inject(item);
	new Element('span', { html: '&bull; Group name: ', styles: { 'margin-left': '20px' } }).inject(item);
	new Element('span', { id: 'FCB-thread-summary-groupname-' + topicId }).inject(item);
	item = new Element('li').inject(summaryList);
	new Element('span', { html: 'Topic ID: ' }).inject(item);
	new Element('span', { id: 'FCB-thread-summary-topicid-' + topicId }).inject(item);
	new Element('img', { id: 'FCB-thread-summary-threadimg-' + topicId, src: images.updating, title: 'retrieving topic info' }).inject(item);
	new Element('span', { html: '&bull; Title: ', styles: { 'margin-left': '20px' } }).inject(item);
	new Element('span', { id: 'FCB-thread-summary-title-' + topicId, styles: { 'font-weight': 'bold' } }).inject(item);
	item = new Element('li').inject(summaryList);
	new Element('span', { html: 'replies: ' }).inject(item);
	new Element('span', { html: ' ', id: 'FCB-thread-summary-count-' + topicId }).inject(item);
	new Element('span', { html: '&bull; Author: ', styles: { 'margin-left': '20px' } }).inject(item);
	new Element('span', { html: ' ', id: 'FCB-thread-summary-author-' + topicId }).inject(item);
	new Element('span', { id: 'FCB-thread-message-' + topicId, styles: { visibility: 'hidden', display: 'none' }}).inject(item);
}

function getTopicInfoThreadSummaryCallback(retval) {
	var success = retval.success;
	var message = retval.message;
	var topicId = retval.topicId;
	var groupId = retval.groupId;

	var img = $('FCB-thread-summary-threadimg-' + topicId);
	if (!success) {
		img.set('src', images.error);
		img.set('title', message);
		$('FCB-thread-summary-title-' + topicId).set('html', message);
		return;
	}
	img.destroy();
	var replies = retval.replyCount;
	var title = retval.title;
	var author = retval.authorName;
	$('FCB-thread-summary-topicid-' + topicId).set('html', topicId);
	$('FCB-thread-summary-title-' + topicId).set('html', title);
	$('FCB-thread-summary-count-' + topicId).set('html', replies);
	$('FCB-thread-summary-author-' + topicId).set('html', author);
	var content = $('FCB-thread-message-' + topicId);
	if ($chk(content)) content.set('html', message);
	$('FCB-dialog').fireEvent('update-new-title', 'Backup of ' + groupId + '-' + topicId + ' : ' + title);
	$('FCB-dialog').fireEvent('topic-info-read', topicId);
}

function getGroupInfoThreadSummaryCallback(retval) {
	var success = retval.success;
	var message = retval.message;
	var threadId = retval.threadId;
	var groupId = retval.groupId;

	var img = $('FCB-thread-summary-groupimg-' + threadId);
	if (!success) {
		img.set('src', images.error);
		img.set('title', message);
		$('FCB-thread-summary-groupname-' + threadId).set('html', message);
		$('FCB-thread-summary-groupname-' + threadId).setStyles({ 'font-weight': 'bold', color: 'red' });
		return;
	}
	img.destroy();
	$('FCB-thread-summary-groupid-' + threadId).set('html', groupId);
	$('FCB-thread-summary-groupname-' + threadId).set('html', retval.groupname);
	$('FCB-dialog').fireEvent('group-info-read', groupId);
}

function toggleConversationBackupDialog(data) {
	var groupId = data.groupId;
	var threadId = data.threadId;

	if (ticker != null) {
		stopTimer();
	}

	if (groupId && threadId) {
	    var backupDialog = $('FCB-dialog');
	    if ($chk(backupDialog)) {
		backupDialog.destroy();
	    } else {
		var maxWidth = (window.innerWidth - 50 < 800 ? window.innerWidth - 50 : 800);
		var left = (window.innerWidth - maxWidth) / 2;
		var backupDialog = new Element('div', {
			id: 'FCB-dialog',
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
				maxHeight: (window.innerHeight - 10),
				maxWidth: maxWidth,
				minWidth: 640,
				position: 'fixed',
				opacity: '0.98',
				left: left + 'px', //evt.event.pageX,
				top: 10,
				display: 'block',
				visibility: 'visible',
				fontSize: '12px',
				'text-align': 'left'
			},
			events: {
				'edit-new-title': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('edit-new-title', evt);
				},
				'update-new-title': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('update-new-title', evt);
				},
				'list-group-topics': function(evt) {
					this.getElements('*[id^=FCB]').fireEvent('list-group-topics', evt);
				},
				'create-new-thread': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('create-new-thread', evt);
				},
				'update-group-selection': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('update-group-selection', evt);
				},
				'update-topic-selection': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('update-topic-selection', evt);
				},
				'reset-new-title': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('reset-new-title', evt);
				},
				'done-backing-up': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('done-backing-up', evt);
				},
				'group-info-read': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('group-info-read', evt);
				},
				'topic-info-read': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('topic-info-read', evt);
				}
			}
		}).inject($(document).getElement('body'));
		var header = new Element('div', { styles: { 'text-align': 'center' } }).inject(backupDialog);
		addHeader({ element: header, titleWidth: (backupDialog.getStyle('maxWidth').match(/(\d+)/)[1] - 50) + 'px'});

		new Element('hr').inject(backupDialog);

		var closeButt = new Element('div', { styles: { width: '100%', 'text-align': 'justify'} }).inject(backupDialog);
		new Element('span', { html: 'Thread summary:', styles: { 'float': 'left' } }).inject(backupDialog);
		new Element('button', { html: 'Close', 'class': 'DeleteButt', styles: { 'float': 'right' }, events: { click: function (evt) { 
					toggleConversationBackupDialog({ groupId: groupId, threadId: threadId }); } } }).inject(closeButt);
		addThreadSummary({ element: backupDialog, topicId: threadId });

		var destinationTable = new Element('table').inject(backupDialog);
		var row = new Element('rw').inject(destinationTable);
		var groupListCell = new Element('td').inject(row);
		groupListCell.adopt(
			new Element('div', { html: 'Back up this topic to the following group (admin only):' }).adopt(
				new Element('img', { id: 'FCB-groupsfetch-' + threadId, src: images.updating, title: 'retrieving groups' })
			)
		);
		new Element('select', {
			id: 'FCB-group-select-' + threadId,
			size: 20,
			disabled: 'disabled',
			'class': 'need-group-info need-topic-info',
			styles: {
				'min-width': '300px'
			},
			events: {
				change: function (evt) {
					var selectedGroup = this.getSelected();
					if ($chk(selectedGroup) && selectedGroup.length > 0) {
						$('FCB-dialog').fireEvent('update-group-selection', selectedGroup[0].value);
					} else {
						$('FCB-dialog').fireEvent('update-group-selection', null);
					}
				},
				'group-info-read': function (evt) {
					this.removeClass('need-group-info');
					if (!this.hasClass('need-topic-info')) {
						this.set('disabled', false);
					}
				},
				'topic-info-read': function (evt) {
					this.removeClass('need-topic-info');
					if (!this.hasClass('need-group-info')) {
						this.set('disabled', false);
					}
				}
			}
		}).inject(groupListCell);
		$('FCB-group-select-' + threadId).adopt(new Element('optgroup', { label: 'retrieving...' }));
		
		var threadListCell = new Element('td').inject(row);
		new Element('input', {
			id: 'FCB-thread-create-' + threadId,
			type: 'radio',
			name: 'FCB-thread-target-' + threadId,
			checked: true,
			disabled: true,
			events: {
				'update-group-selection': function (evt) {
					this.set('disabled', evt == null);
				},
				'change': function (evt) {
					if (this.checked) {
						var threadSelect = $$('select[id^=FCB-topic-select-' + threadId+']');
						threadSelect.empty();
						threadSelect.set('id', 'FCB-topic-select-' + threadId);
						$('FCB-dialog').fireEvent('create-new-thread');
					} else {
						$('FCB-dialog').fireEvent('list-group-topics');
					}
				}
			}
		}).inject(threadListCell);
		new Element('label', { 'for': 'FCB-thread-create-' + threadId, html: 'create a new thread' }).inject(threadListCell);
		new Element('br').inject(threadListCell);
		new Element('input', {
			id: 'FCB-thread-reuse-' + threadId,
			type: 'radio',
			name: 'FCB-thread-target-' + threadId,
			checked: false,
			disabled: true,
			events: {
				'update-group-selection': function (evt) {
					this.set('disabled', evt == null);
					if (this.checked) {
						$('FCB-dialog').fireEvent('list-group-topics');
					} else {
						$('FCB-dialog').fireEvent('create-new-thread');
					}
				},
				'change': function (evt) {
					if (this.checked) {
						$('FCB-dialog').fireEvent('list-group-topics');
					} else {
						$('FCB-dialog').fireEvent('create-new-thread');
					}
				}
			}
		}).inject(threadListCell);
		new Element('label', { 'for': 'FCB-thread-reuse-' + threadId, html: 'reuse an existing Backup thread:' }).inject(threadListCell);
		new Element('br').inject(threadListCell);
		new Element('select', {
			id: 'FCB-topic-select-' + threadId,
			size: 15,
			styles: {
				'min-width': '300px'
			},
			events: {
				'list-group-topics': function (evt) {
					this.empty();
					var targetGroupId = $('FCB-group-select-' + threadId).getSelected()[0].get('value');
					this.adopt(new Element('optgroup', { label: 'searching in topics 1 - 100...' }));
					var topicsCallback = function (retval) {
							var success = retval.success;
							var message = retval.message;
							var threadId = retval.threadId;
							var targetGroupId = retval.groupId;
							var topics = retval.topics;
							var perPage = retval.perPage;
							var page = retval.page;

							var list = $('FCB-topic-select-' + threadId);
							if (!$chk(list)) {
								// already changed selection
								return;
							}
							list.getElements('optgroup').destroy();
							if (!success) {
								list.adopt(new Element('optgroup', { label: message, styles: { color: 'red' } }));
								return;
							}
							var groupId = global_group_id.id;
							topics.filter(function (topic) {
								return topic.subject.match('Backup of ' + groupId + '-' + threadId + ' : ');
							}).forEach(function(topic) {
								list.adopt(new Element('option', {
									value: topic.id,
									html: topic.subject
								}));
							});
							list.adopt(new Element('optgroup', {
								label: 'click to search in topics ' + (page * 100 + 1) + ' - ' + ((page + 1) * 100) + '..',
								events: {
									click: function (evt) {
										if (this.hasClass('retrieving')) return;
										this.set('class', 'retrieving');
										this.set('label', 'searching in topics ' + (page * 100 + 1) + ' - ' + ((page+1)*100) + '...');
										getGroupTopics({
											threadId: threadId,
											groupId: targetGroupId,
											perPage: perPage,
											page: page + 1,
											callback: topicsCallback
										});
									}
								}
							}));
					}
					getGroupTopics({ threadId: threadId, groupId: targetGroupId, perPage: 100, page: 1, callback: topicsCallback });
				},
				change: function (evt) {
					var selectedTopic = this.getSelected();
					if ($chk(selectedTopic) && selectedTopic.length > 0) {
						$('FCB-dialog').fireEvent('update-topic-selection', selectedTopic[0].get('html'));
					} else {
						$('FCB-dialog').fireEvent('update-topic-selection', null);
					}
				},
				'create-new-thread': function (evt) {
					this.empty();
				}
			}
		}).inject(threadListCell);
		new Element('br').inject(threadListCell);
		new Element('input', {
			id: 'FCB-use-referrers-' + threadId,
			type: 'checkbox',
			checked: true,
			events: {
				click: function (evt) {
					var referrersDate = $('FCB-use-referrers-date-' + threadId);
					referrersDate.set('checked', this.checked); // no dates if no referrers; on check, check both
					referrersDate.set('disabled', !this.checked);
					$('FCB-use-referrers-date-label-' + threadId).setStyles({ color: (this.checked ? '': 'grey') });
					$('FCB-dialog').fireEvent('reset-new-title', this.checked);
				},
				'create-new-thread': function (evt) {
					this.set('disabled', false);
					if (!this.checked) {
						this.click();
					}
				},
				'list-group-topics': function (evt) {
					if (!this.checked) {
						this.click();
					}
					this.set('disabled', true);
				}
			}
		}).inject(threadListCell);
		new Element('label', {
			'for': 'FCB-use-referrers-' + threadId,
			id: 'FCB-use-referrers-label-' + threadId,
			html: 'use referrers <i>(xxx wrote: ...)</i>',
			events: {
				'create-new-thread': function (evt) {
					this.setStyle('color', '');
				},
				'list-group-topics': function (evt) {
					this.setStyle('color', 'grey');
				}
			}
		 }).inject(threadListCell);
		new Element('br').inject(threadListCell);
		new Element('input', {
			id: 'FCB-use-referrers-date-' + threadId,
			type: 'checkbox',
			checked: true,
			styles: {
				'display': 'inline-block',
				'margin-left': '30px'
			}
		}).inject(threadListCell);
		new Element('label', { 'for': 'FCB-use-referrers-date-' + threadId, id: 'FCB-use-referrers-date-label-' + threadId,  html: 'include timestamp' }).inject(threadListCell);
		new Element('div', {
			id: 'FCB-new-title-label-' + threadId,
			styles: {
				display: 'block'
			},
			events: {
				'list-group-topics': function (evt) {
					this.set('html', 'Append to the thread titled:');
				},
				'create-new-thread': function (evt) {
					this.set('html', 'The new back up thread will be titled: ')
				}
			}
		}).inject(backupDialog);
		$('FCB-new-title-label-' + threadId).fireEvent('create-new-thread');
		var newTitleDiv = new Element('div', {
			id: 'FCB-newtitlediv-' + threadId,
		}).inject(backupDialog);
		new Element('span', {
			html: 'Backup of ..',
			id: 'FCB-new-title-' + threadId,
			styles: {
				'margin-left': '30px',
				'font-weight': 'bold'
			},
			events: {
				'update-new-title': function (evt) {
					this.set('html', evt);
					this.setStyles({ display: 'inline', visibility: 'visible' });
				},
				'edit-new-title': function (evt) {
					this.setStyles({ display: 'none', visibility: 'hidden' });
				},
				'reset-new-title': function (evt) {
					var useReferrers = evt;
					if (useReferrers) {
						this.set('html', 'Backup of ' + groupId + '-' + threadId + ' : ' + $('FCB-thread-summary-title-' + threadId).get('html'));
					} else {
						this.set('html', this.get('html').replace(/Backup of \d+@\w\d{2}\s*-\s*\d+\s*:\s*/i, ''));
					}
				},
				'list-group-topics': function (evt) {
					this.set('html', 'Backup of..');
					this.setStyles({ display: 'inline', visibility: 'visible' });
				},
				'create-new-thread': function (evt) {
					this.setStyles({ display: 'inline', visibility: 'visible' });
					this.fireEvent('reset-new-title', true);
				},
				'update-topic-selection': function (evt) {
					this.set('html', $chk(evt) ? evt : 'Backup of..');
				}
			}
		}).inject(newTitleDiv); 
		new Element('img', {
			src: images.edit,
			title: 'edit',
			id: 'FCB-new-title-edit-' + threadId,
			styles: {
				cursor: 'pointer',
				display: 'none',
				visibility: 'hidden'
			},
			events: {
				click: function (evt) {
					$('FCB-dialog').fireEvent('edit-new-title', $('FCB-new-title-' + threadId).get('html'));
				},
				'update-new-title': function (evt) {
					this.setStyles({ display: 'inline', visibility: 'visible' });
				},
				'edit-new-title': function (evt) {
					this.setStyles({ display: 'none', visibility: 'hidden' });
				},
				'list-group-topics': function (evt) {
					this.setStyles({ display: 'none', visibility: 'hidden' });
				},
				'create-new-thread': function (evt) {
					this.setStyles({ display: 'inline', visibility: 'visible' });
				}
			}
		}).inject(newTitleDiv);
		new Element('input', {
			type: 'text',
			id: 'FCB-new-title-input-' + threadId,
			styles: {
				width: '90%',
				visibility: 'hidden',
				display: 'none'
			},
			events: {
				'edit-new-title': function (evt) {
					this.setStyles({ display: 'inline', visibility: 'visible' });
					this.set('value', evt);
				},
				'update-new-title': function (evt) {
					this.setStyles({ display: 'none', visibility: 'hidden' });
				},
				'reset-new-title': function (evt) {
					var useReferrers = evt;
					if (useReferrers) {
						this.set('value', 'Backup of ' + groupId + '-' + threadId + ' : ' + this.get('value'));
					} else {
						this.set('value', this.get('value').replace(/Backup of \d+@\w\d{2}\s*-\s*\d+\s*:\s*/i, ''));
					}
				},
				'list-group-topics': function (evt) {
					this.setStyles({ display: 'none', visibility: 'hidden' });
				},
				'create-new-thread': function (evt) {
					this.setStyles({ display: 'none', visibility: 'hidden' });
				}
			}
		}).inject(newTitleDiv);
		new Element('img', {
			src: images.save,
			title: 'save',
			id: 'FCB-new-title-save-' + threadId,
			styles: {
				cursor: 'pointer',
				display: 'none',
				visibility: 'hidden'
			},
			events: {
				click: function (evt) {
					$('FCB-dialog').fireEvent('update-new-title', this.getParent().getElement('input').get('value'));
				},
				'edit-new-title': function (evt) {
					this.setStyles({ display: 'inline', visibility: 'visible' });
				},
				'update-new-title': function (evt) {
					this.setStyles({ display: 'none', visibility: 'hidden' });
				},
				'list-group-topics': function (evt) {
					this.setStyles({ display: 'none', visibility: 'hidden' });
				},
				'create-new-thread': function (evt) {
					this.setStyles({ display: 'none', visibility: 'hidden' });
				}
			}
		}).inject(newTitleDiv);
		GM_getGroupId(function (retval) {
			getTopicInfo({ topicId: threadId, groupId: retval.groupId.id, callback: getTopicInfoThreadSummaryCallback });
			getGroupInfo({ threadId: threadId, groupId: retval.groupId.id, callback: getGroupInfoThreadSummaryCallback });
			getAdminGroups({ threadId: threadId, callback: function (retval) {
					var success = retval.success;
					var message = retval.message;
					var threadId = retval.threadId;
					var groups = retval.groups;

					var groupsSelect = $('FCB-group-select-' + threadId);
					groupsSelect.empty();

					var img = $('FCB-groupsfetch-' + threadId);
					if (!success) {
						img.set('src', images.error);
						img.set('title', message);
						new Element('optgroup', { label: message, styles: { color: 'red', 'font-weight': 'bold' } }).inject(groupsSelect);
						return;
					}
					img.destroy();
					groupsSelect.empty();
					groups.filter(function (group) {
						return false || group.admin == 1 || group.admin == '1';
					}).sort(function (groupA, groupB) {
						return groupA.name.toLowerCase().localeCompare(groupB.name.toLowerCase());
					}).forEach(function (group) {
						groupsSelect.adopt(new Element('option', {
							value: group.nsid,
							html: group.name
						}));
					});
				}
			});
			new Element('br').inject(backupDialog);
			new Element('button', {
				html: 'SAVE',
				id: 'FCB-save-button-' + threadId,
				'class': 'CancelButt need-target-group',
				'title': 'select a target group',
				events: {
					click: function (evt) {
						if (this.hasClass('CancelButt')) {
							return;
						}
						this.removeClass('Butt');
						this.addClass('CancelButt');
						this.addClass('backing-up');
						new Element('i', { id: 'ticker', events: {
							tick: function (evt) {
								this.set('html', 'elapsed time: ' + evt);
							}
						    }
						}).inject(backupDialog);
						startTimer();

						new Element('br').inject(backupDialog);
						var groupId = global_group_id.id;
						var createNewTopic = $('FCB-thread-create-' + threadId).get('checked');
						var targetGroupId = $('FCB-group-select-' + threadId).getSelected()[0].get('value');
						var useReferrers = $('FCB-use-referrers-' + threadId).checked;
						var useReferrerTimestamp = $('FCB-use-referrers-date-' + threadId).checked;

						// creat an progress image for creating the thread, reading info ..
						new Element('img', { src: images.updating, title: 'processing..', id: 'FCB-bu-thread-img' }).inject(backupDialog);
						getTopicInfo({ topicId: threadId, groupId: targetGroupId, callback: function (retval) {
							var success = retval.success;
							var message = retval.message;
							var replyCount = retval.replyCount;
							var authorNsid = retval.authorNsid;
							var authorName = retval.authorName;
							var created = retval.created;
								
							if (!success) {
								var img = $('FCB-bu-thread-img');
								img.set('src', images.error);
								img.set('title', "error fetching topic info: " + message);
								$('FCB-dialog').fireEvent('done-backing-up');
								return;
							}
							// show backup thread name + link
							var newTitle = $('FCB-new-title-' + threadId).get('html');
							// we only have the name, no link yet
							new Element('a', {
								href: 'javascript:void(0)',
								html: newTitle,
								id: 'FCB-bu-thread-link',
								styles: {
									'text-decoration': 'none',
									color: 'black',
									cursor: 'default'
								},
								events: {
									'new-backup-href-available': function (evt) {
										this.set('href', evt);
										this.setStyles({ 'text-decoration': '', color: '', cursor: 'pointer' });
									}
								}
							}).inject(backupDialog);
							if (createNewTopic) {
								if (useReferrers) {
									message = '[http://www.flickr.com/people/' + authorNsid + '] <b>' + authorName + '</b>' +
										' <a href="http://www.flickr.com/groups/' + groupId + '/discuss/' + threadId + '/">wrote</a>' +
										(useReferrerTimestamp ? ' (' + (new Date(created*1000)) + ')' : '') +
										':<blockquote><i>' + message + '</i></blockquote>';
								}
								createThread({ targetGroupId: targetGroupId, title: newTitle, message: message, callback: function (retval) {
									var success = retval.success;
									var message = retval.message;
									var newThreadId = retval.newThreadId;
									
									var img = $('FCB-bu-thread-img');
									img.set('src', success ? images.success : images.error);
									img.set('title', success ? 'thread created ' + newThreadId : "error creating topic: " + message);
									if (!success) {
										$('FCB-dialog').fireEvent('done-backing-up');
										return;
									}
									$('FCB-bu-thread-link').fireEvent('new-backup-href-available', 'http://www.flickr.com/groups/' + targetGroupId + '/discuss/' + newThreadId + '/');
									copyTopicReplies({ sourceTopicId: threadId, targetTopicId: newThreadId, replyCount: replyCount, referrers: useReferrers, referrerTimestamp: useReferrerTimestamp, referrerGroupId: groupId });
								}});
							} else {
								var targetTopicId = $('FCB-topic-select-' + threadId).get('value');
								var href = 'http://www.flickr.com/groups/' + targetGroupId + '/discuss/' + targetTopicId + '/';
								$('FCB-bu-thread-link' ).fireEvent('new-backup-href-available', href);
								getTopicInfo({ topicId: targetTopicId, groupId: targetGroupId, callback: function (retval) {
									var success = retval.success;
									var message = retval.message;

									var img = $('FCB-bu-thread-img');
									img.set('src', success ? images.success : images.error);
									img.set('title', success ? 'target thread read' : "error reading topic: " + message);
									if (!success) {
										$('FCB-dialog').fireEvent('done-backing-up');
										return;
									}
									var backupReplyCount = retval.replyCount;
									if (backupReplyCount == 0) { // no replies yet
										copyTopicReplies({ sourceTopicId: threadId, targetTopicId: targetTopicId, replyCount: replyCount, referrers: useReferrers, referrerTimestamp: useReferrerTimestamp, referrerGroupId: groupId });
										return;
									}
									var lastBUReplyId = retval.lastreplyid;
									// var dateLastBUReply = retval.datelastpost; ==> keeps it even if that last post was deleted!
									getReplyInfo({ topicId: targetTopicId, replyId: lastBUReplyId, callback: function(retval) {
										var success = retval.success;
										var message = retval.message;
										var dateLastBUReply =  retval.datecreate;

										var img = $('FCB-bu-thread-img');
										img.set('src', success ? images.success : images.error);
										img.set('title', success ? 'target thread read' : "error fetching reply info: " + message);
										if (!success) {
											$('FCB-dialog').fireEvent('done-backing-up');
											return;
										}
										var lastReplyId = message.match(/href=[\'\"]http:\/\/www.flickr.com\/groups\/[^\/]+\/discuss\/\d+\/(\d+)/);
										if (!lastReplyId) {
											var img = $('FCB-bu-thread-img');
											img.set('src', images.error);
											img.set('title', "error extracting last reply id");
											$('FCB-dialog').fireEvent('done-backing-up');
											return;
										}
										lastReplyId = lastReplyId[1];
										copyTopicReplies({ sourceTopicId: threadId, targetTopicId: targetTopicId, replyCount: replyCount, referrers: useReferrers, referrerTimestamp: useReferrerTimestamp, referrerGroupId: groupId, newerThanThreadId: lastReplyId, newerThanDate: dateLastBUReply });
									}});
								}});
							}

						}});
					},
					'update-group-selection': function(evt) {
						if (evt == null) {
							this.addClass('need-target-group');
						} else {
							this.removeClass('need-target-group');
						}
						this.fireEvent('update-class');
					},
					'update-topic-selection': function (evt) {
						if (evt == null && $('FCB-thread-reuse-' + threadId).checked) {
							this.addClass('need-target-topic');
						} else {
							this.removeClass('need-target-topic');
						}
						this.fireEvent('update-class');
					},
					'edit-new-title': function (evt) {
						this.addClass('editing-title');
						this.fireEvent('update-class');
					},
					'update-new-title': function (evt) {
						this.removeClass('editing-title');
						this.fireEvent('update-class');
					},
					'list-group-topics': function (evt) {
						this.addClass('need-target-topic');
						this.fireEvent('update-class');
					},
					'create-new-thread': function (evt) {
						this.removeClass('need-target-topic');
						this.fireEvent('update-class');
					},
					'done-backing-up': function (evt) {
						stopTimer();
						this.removeClass('backing-up');
						this.fireEvent('update-class');
						if ($chk($('FCB-bu-thread-img'))) {
							$('FCB-bu-thread-img').set('id', '');
						}
						if ($chk($('FCB-bu-thread-link'))) {
							$('FCB-bu-thread-link').set('id', '');
						}
						if ($chk($('FCB-copying-img'))) {
							$('FCB-copying-img').set('id', '');
						}
						$$('span[id^=FCB-replycount]').set('id', '');
					},
					'update-class': function (evt) {
						if (this.hasClass('need-target-group') || this.hasClass('need-target-topic') || this.hasClass('editing-title') || this.hasClass('backing-up')) {
							this.removeClass('Butt');
							this.addClass('CancelButt');
						} else {
							this.removeClass('CancelButt');
							this.addClass('Butt');
						}
						this.set('title',
							this.hasClass('Butt') ? 'click to make backup' :
							this.hasClass('need-target-group') ? 'select a target group' :
							this.hasClass('need-target-topic') ? 'select a target topic' :
							this.hasClass('editing-title') ? 'save the new title' :
							this.hasClass('backing-up') ? 'backing up' : ''
						);
					}
				}	
			}).inject(backupDialog);
		});
	    }
	} else {
		// photo page backup, set comments backup, ..
	}
}

function getTopicInfo(data) {
	var topicId = data.topicId;
	var groupId = data.groupId;
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
					    try {
				                result = eval('(' + responseText + ')');
					    } catch (f) {
						callback({ topicId: topicId, groupId: groupId, success: false, message: "ERROR parsing topics.getInfo reply: " + e });
						return;
					    }
			                }
					if (result.stat === 'fail') {
						callback({ topicId: topicId, groupId: groupId, success: false, message: result.message });
						return;
					}
					callback({ topicId: topicId, groupId: groupId, success: true, title: result.topic.subject, replyCount: result.topic.count_replies, message: result.topic.message._content, authorNsid: result.topic.author, authorName: result.topic.authorname, created: result.topic.datecreate, datelastpost: result.topic.datelastpost, lastreplyid: result.topic.last_reply });
				    } catch (e) {
				    	GM_log("ERROR processing flickr.groups.discuss.topics.getInfo result: " + e);
					callback({ topicId: topicId, groupId: groupId, success: false, message: "ERROR processing flickr.groups.discuss.topics.getInfo result: " + e });
				    }
				},
				onFailure: function (response) {
					GM_log("error: " + response.statusText);
					callback({ topicId: topicId, groupId: groupId, success: false, message: response.statusText });
				}
    		}).get('/services/rest', {
			api_key: GM_getMagisterLudi(),
		        auth_hash: GM_getAuthHash(),
		        auth_token: GM_getAuthToken(),
		        format: 'json',
		        method: 'flickr.groups.discuss.topics.getInfo',
		        nojsoncallback: 1,
		        topic_id: topicId
		});
	} catch (e) {
		callback({ topicId: topicId, groupId: groupId, success: false, message: 'Exception: ' + e });
	}
}

function toggleConversationCompareDialog(data) {
// TODO: check groupId (src vs target)
	var groupId = data.groupId;
	var threadId = data.topicId;
	var sourceGroupId = data.sourceGroupId;
	var srcThreadId = data.sourceTopicId;

	if (ticker != null) {
		stopTimer();
	}

	if (!groupId || !threadId) { // enable compatibility with other dialog!   || !sourceGroupId || !srcThreadId) {
		return;
	}
	var backupDialog = $('FCB-dialog'); // use the same id: only one can be active
	if ($chk(backupDialog)) {
		backupDialog.destroy();
	} else {
		var maxWidth = (window.innerWidth - 50 < 800 ? window.innerWidth - 50 : 800);
		var left = (window.innerWidth - maxWidth) / 2;
		var backupDialog = new Element('div', {
			id: 'FCB-dialog',
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
				maxHeight: (window.innerHeight - 10),
				maxWidth: maxWidth,
				minWidth: 640,
				position: 'fixed',
				opacity: '0.98',
				left: left + 'px', //evt.event.pageX,
				top: 10,
				display: 'block',
				visibility: 'visible',
				fontSize: '12px',
				'text-align': 'left'
			},
			events: {
				'topic-info-read': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('topic-info-read', evt);
				},
				'group-info-read': function (evt) {
					this.getElements('*[id^=FCB]').fireEvent('group-info-read', evt);
				}
			}
		}).inject($(document).getElement('body'));
		var header = new Element('div', { styles: { 'text-align': 'center' } }).inject(backupDialog);
		addHeader({ element: header, titleWidth: (backupDialog.getStyle('maxWidth').match(/(\d+)/)[1] - 50) + 'px'});

		new Element('hr').inject(backupDialog);

		var closeButt = new Element('div', { styles: { width: '100%', 'text-align': 'justify'} }).inject(backupDialog);
		new Element('span', { html: 'Thread summary:', styles: { 'float': 'left' } }).inject(backupDialog);
		new Element('button', { html: 'Close', 'class': 'DeleteButt', styles: { 'float': 'right' }, events: { click: function (evt) { 
				toggleConversationCompareDialog({ groupId: groupId, topicId: threadId, sourceGroupId: sourceGroupId, sourceTopicId: srcThreadId }); } } }).inject(closeButt);
		addThreadSummary({ element: backupDialog, topicId: threadId });
		new Element('span', { html: 'Source thread summary:', styles: { 'display': 'block' } }).inject(backupDialog);
		addThreadSummary({ element: backupDialog, topicId: srcThreadId });
		getTopicInfo({ topicId: threadId, groupId: groupId, callback: getTopicInfoThreadSummaryCallback });
		getTopicInfo({ topicId: srcThreadId, groupId: sourceGroupId, callback: getTopicInfoThreadSummaryCallback });
		getGroupInfo({ threadId: threadId, groupId: groupId, callback: getGroupInfoThreadSummaryCallback });
		getGroupInfo({ threadId: srcThreadId, groupId: sourceGroupId, callback: getGroupInfoThreadSummaryCallback });
		new Element('button', {
			html: 'compare',
			'class': 'Butt need-source-group-info need-backup-group-info need-source-topic-info need-backup-topic-info',
			id: 'FCB-compare-button',
			styles: {
				visibility: 'hidden',
				display: 'none'
			},
			events: {
				click: function (evt) {
					if (this.hasClass('CancelButt')) return;
					this.removeClass('Butt');
					this.addClass('CancelButt');
					var progressSpan = new Element('span', { styles: { display: 'block' }}).inject(this, 'before');
					progressSpan.adopt(
						new Element('span', { html: 'comparing backup reply ' }),
						new Element('span', { html: '0', id: 'FCB-compare-backup-count-' + threadId }),
						new Element('span', { html: ' of ' }),
						new Element('span', { html: $('FCB-thread-summary-count-' + threadId).get('html') }),
						new Element('span', { html: ' with source reply ' }),
						new Element('span', { html: '0', id: 'FCB-compare-source-count-' + srcThreadId }),
						new Element('span', { html: ' of ' }),
						new Element('span', { html: $('FCB-thread-summary-count-' + srcThreadId).get('html') })
					);
					// first: compare OP!
					var compareList = $('FCB-compare-list-' + threadId);
					var OPdiff = new Element('div').inject(compareList);
					OPdiff.adopt(new Element('img', { src: images.updating }),
						new Element('span', { html: ' comparing OP..' })
					);
					var sourceTitle = $('FCB-thread-summary-title-' + srcThreadId);
					var backupTitle = $('FCB-thread-summary-title-' + threadId);
					var sourceOP = $('FCB-thread-message-' + srcThreadId);
					var backupOP = $('FCB-thread-message-' + threadId);
					if (sourceTitle != backupTitle) {
						OPdiff.adopt(new Element('span', { html: 'diff!!' }));
					}
					compareTopicReplies({
						backupTopicId: threadId,
						totalBackupReplies: $('FCB-thread-summary-count-' + threadId).get('html'),
						sourceTopicId: srcThreadId,
						totalSourceReplies: $('FCB-thread-summary-count-' + srcThreadId).get('html'),
						diffElement: $('FCB-compare-list-' + threadId)
					});
				},
				'topic-info-read': function (evt) {
					if (evt == srcThreadId) {
						this.removeClass('need-source-topic-info');
					} else if (evt == threadId) {
						this.removeClass('need-backup-topic-info');
					}
					this.fireEvent('update-class');
				},
				'group-info-read': function (evt) {
					if (groupId == sourceGroupId) { // special case!
						if (evt == sourceGroupId) {
							if (this.hasClass('need-source-group-info')) {
								this.removeClass('need-source-group-info');
							} else {
								this.removeClass('need-backup-group-info');
							}
							this.fireEvent('update-class');
							return;
						}
					}
					if (evt == sourceGroupId) {
						this.removeClass('need-source-group-info');
					} else if (evt == groupId) {
						this.removeClass('need-backup-group-info');
					}
					this.fireEvent('update-class');
				},
				'update-class': function (evt) {
					if (this.hasClass('need-source-group-info')) return;
					if (this.hasClass('need-source-topic-info')) return;
					if (this.hasClass('need-backup-group-info')) return;
					if (this.hasClass('need-backup-topic-info')) return;	
					if (this.hasClass('CancelButt')) return;
					this.click();
				}
			}
		}).inject(backupDialog);
		var currentHeight = 0;
		try {
			currentHeight = parseInt(backupDialog.getComputedStyle('height').match(/(\d+)/)[1], 10);
		} catch (e) {
			GM_log("unable to parse current height '" + backupDialog.getComputedStyle('height') + "'");
		}
		if (isNaN(currentHeight) || currentHeight <= 10) {
			currentHeight = 50; // make an educated guess :-)
		}
		new Element('div', {
			id: 'FCB-compare-list-' + threadId,
			styles: {
				overflow: 'auto',
				width: '100%',
				height: (window.innerHeight - 30 - currentHeight) + 'px'
			}
		}).inject(backupDialog);
	}
}

function compareTopicReplies(data) {
// TODO
	var backupTopicId = data.backupTopicId;
	var sourceTopicId = data.sourceTopicId;
	var diffElement = data.element;
	

	var totalBackupReplies = data.totalBackupReplies;
	var totalSourceReplies = data.totalSourceReplies;

	var backupReplies = data.backupReplies ? data.backupReplies : [];
	var sourceReplies = data.sourceReplies ? data.sourceReplies : [];

	var backupRepliesProcessed = data.backupRepliesProcessed ? data.backupRepliesProcessed : 0;
	var sourceRepliesProcessed = data.sourceRepliesProcessed ? data.sourceRepliesProcessed : 0;

	if (backupReplies.length == 0) { // read next batch
		getTopicReplies({ topicId: threadId, callback: function (retval) {
			var success = retval.success;
			if (!success) {
				var message = retval.message;
				$('FCB-compare-list-' + threadId).adopt(new Element('div').adopt(
					new Element('img', { src: images.error }),
					new Element('span', { html: ' topic ' + threadId + ': ' + message })
				));
				return;
			}
			var replies = retval.replies;
			var total = retval.total;
			var page = retval.page;
			var perPage = retval.perPage;
			replies.forEach(function (backupReply) {
				
			});
			// get next batch
		} });
	}
}

function getGroupInfo(data) {
	var threadId = data.threadId;
	var groupId = data.groupId;
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
			                    result = eval('(' + responseText + ')');
			                }
					if (result.stat === 'fail') {
						callback({ threadId: threadId, groupId: groupId, success: false, message: result.message });
					} else {
						callback({ threadId: threadId, groupId: groupId, success: true, groupname: result.group.name._content });
					}
				    } catch (e) {
				    	GM_log("ERROR processing flickr.groups.getInf oresult: " + e);
					callback({ threadId: threadId, groupId: groupId, success: false, message: "ERROR processing flickr.groups.getInfo result: " + e });
				    }
				},
				onFailure: function (response) {
					GM_log("error: " + response.statusText);
					callback({ threadId: threadId, groupId: groupId, success: false, message: response.statusText });
				}
    		}).get('/services/rest', {
			api_key: GM_getMagisterLudi(),
		        auth_hash: GM_getAuthHash(),
		        auth_token: GM_getAuthToken(),
		        format: 'json',
		        method: 'flickr.groups.getInfo',
		        nojsoncallback: 1,
		        group_id: groupId
		});
	} catch (e) {
		callback({ threadId: threadId, groupId: groupId, success: false, message: 'Exception: ' + e });
	}
}

function getAdminGroups(data) {
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
					    try {
			                    	result = eval('(' + responseText + ')');
					    } catch (f) {
						callback({ threadId: threadId, success: false, message: "error reading groups: " + e });
						return;
					    }
			                }
					if (result.stat === 'fail') {
						callback({ threadId: threadId, success: false, message: result.message });
					} else {
						callback({ threadId: threadId, success: true, groups: result.groups.group });
					}
				    } catch (e) {
				    	GM_log("ERROR processing flickr.people.getGroups result: " + e);
					callback({ threadId: threadId, success: false, message: "ERROR processing flickr.people.getGroups result: " + e });
				    }
				},
				onFailure: function (response) {
					GM_log("error: " + response.statusText);
					callback({ threadId: threadId, success: false, message: response.statusText });
				}
    		}).get('/services/rest', {
			api_key: GM_getMagisterLudi(),
		        auth_hash: GM_getAuthHash(),
		        auth_token: GM_getAuthToken(),
		        format: 'json',
		        method: 'flickr.people.getGroups',
		        nojsoncallback: 1,
		        user_id: GM_getUserNsid()
		});
	} catch (e) {
		callback({ threadId: threadId, success: false, message: 'Exception: ' + e });
	}
}

function getGroupTopics(data) {
	var threadId = data.threadId;
	var groupId = data.groupId;
	var perPage = data.perPage;
	var page = data.page;
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
			                    result = eval('(' + responseText + ')');
			                }
					if (result.stat === 'fail') {
						callback({ threadId: threadId, groupId: groupId, perPage: perPage, page: page, success: false, message: result.message });
					} else {
						if (!$chk(result.topics.topic) || result.topics.topic.length == 0) {
							callback({ threadId: threadId, groupId: groupId, perPage: perPage, page: page, success: false, message: "no topics found" });
						} else {
							callback({ threadId: threadId, groupId: groupId, perPage: perPage, page: page, success: true, topics: result.topics.topic });
						}
					}
				    } catch (e) {
				    	GM_log("ERROR processing flickr.groups.discuss.topics.getList result: " + e);
					callback({ threadId: threadId, groupId: groupId, perPage: perPage, page: page, success: false, message: "ERROR processing flickr.groups.discuss.topics.getList result: " + e });
				    }
				},
				onFailure: function (response) {
					GM_log("error: " + response.statusText);
					callback({ threadId: threadId, groupId: groupId, perPage: perPage, page: page, success: false, message: response.statusText });
				}
    		}).get('/services/rest', {
			api_key: GM_getMagisterLudi(),
		        auth_hash: GM_getAuthHash(),
		        auth_token: GM_getAuthToken(),
		        format: 'json',
		        method: 'flickr.groups.discuss.topics.getList',
			per_page: perPage,
			page: page,
		        nojsoncallback: 1,
		        group_id: groupId
		});
	} catch (e) {
		callback({ threadId: threadId, groupId: groupId, perPage: perPage, page: page, success: false, message: 'Exception: ' + e });
	}
}

function createThread(data) {
	var targetGroupId = data.targetGroupId;
	var title = data.title;
	var callback = data.callback;
	var message = data.message;

	try {
		new Request({
       			url: 'http://www.flickr.com',
       			onSuccess: function (responseText, responseXML) {
			        try {
			                var result;
			                try {
			                    result = JSON.parse(responseText);
			                } catch (e) {
			                    result = eval('(' + responseText + ')');
			                }
					if (result.stat === 'fail') {
						callback({ success: false, message: result.message });
					} else {
						callback({ success: true, newThreadId: result.topic.id });
					}
				} catch (e) {
				    	GM_log("ERROR processing flickr.groups.discuss.topics.add result: " + e);
					callback({ success: false, message: "ERROR processing flickr.groups.discuss.topics.add result: " + e });
				}
			},
			onFailure: function (response) {
				GM_log("error: " + response.statusText);
				callback({ success: false, message: response.statusText });
			}
    		}).post('/services/rest', {
			api_key: GM_getMagisterLudi(),
		        auth_hash: GM_getAuthHash(),
		        auth_token: GM_getAuthToken(),
		        format: 'json',
		        method: 'flickr.groups.discuss.topics.add',
		        nojsoncallback: 1,
		        group_id: targetGroupId,
			subject: title,
			message: message
		});
	} catch (e) {
		callback({ success: false, message: 'Exception: ' + e });
	}

}

function copyTopicReplies(data) {
	var sourceTopicId = data.sourceTopicId;
	//var targetTopicId = data.targetTopicId;
	var replyCount = data.replyCount;
	//var useReferrers = data.referrers;
	//var useReferrerTimestamp = data.referrerTimestamp;
	//var referrerGroupId = data.referrerGroupId; 
	var newerThanThreadId = data.newerThanThreadId;
	var newerThanDate = data.newerThanDate;

	var page = data.page ? data.page : 1;
	var perPage = data.perPage ? data.perPage : 100;
	var processed = data.processed ? data.processed : 0;

	var backupDialog = $('FCB-dialog');
	if (replyCount <= 0) {
		new Element('span', { html: '<br/>no replies to copy' }).inject(backupDialog);
		backupDialog.fireEvent('done-backing-up');
		return;
	}
	if (page <= 1) {
		new Element('span', { html: '<br/>copying reply ' }).inject(backupDialog);
		new Element('span', { id: 'FCB-replycount', html: '1' }).inject(backupDialog);
		new Element('span', { html: ' of ' + replyCount + ' '}).inject(backupDialog);
		new Element('img', { id: 'FCB-copying-img', src: images.updating }).inject(backupDialog);
	}
	getTopicReplies({ topicId: sourceTopicId, page: page, perPage: perPage, callback: function (retval) {
		var success = retval.success;
		var message = retval.message;
		if (!success) {
			var img = $('FCB-copying-img');
			img.set('src', images.error);
			img.set('title', "error reading replies: " + message);
			$('FCB-dialog').fireEvent('done-backing-up');
			return;
		}
		var topicReplies = retval.replies;
		if (newerThanDate && newerThanThreadId) {
			var encounteredLastBackupedReply = false;
			var replies = topicReplies.filter(function (reply) {
				if (encounteredLastBackupedReply) {
					return true;
				}
				if (reply.id == newerThanThreadId) {
					encounteredLastBackupedReply = true;
					return false;
				}
				return reply.datecreate >= newerThanDate;
			});
		} else {
			replies = topicReplies;
		}
		processed += (topicReplies.length - replies.length);
		data.processed = processed;
		$('FCB-replycount').set('html', processed);
		copyTopicReplyList({
			replies: replies,
			referrers: data.referrers,
			referrerTimestamp: data.referrerTimestamp,
			referrerGroupId: data.referrerGroupId,
			referrerTopicId: sourceTopicId,
			targetTopicId: data.targetTopicId,
			progressCallback: function (retval) {
				var count = processed + retval.count;
				data.processed = data.processed + 1;
				$('FCB-replycount').set('html', count);
			},
			closureCallback: function (retval) {
				var success = retval.success;
				var message = retval.message;
				var img = $('FCB-copying-img');
				if (!success) {
					img.set('src', images.error);
					img.set('title', "error copying reply: " + message);
					$('FCB-dialog').fireEvent('done-backing-up');
					return;
				}
				if (page * perPage > replyCount) {
					img.set('src', images.success);
					img.set('title', "done");
					$('FCB-dialog').fireEvent('done-backing-up');
					return;
				}
				// next page
				data.page = page + 1;
				copyTopicReplies(data);
			}
		});
	} });
}

function copyTopicReplyList(data) {
	var replies = data.replies;
	var idx = data.idx ? data.idx : 0;
	var referrers = data.referrers;
	var referrerTimestamp = data.referrerTimestamp;
	var referrerGroupId = data.referrerGroupId;
	var referrerTopicId = data.referrerTopicId;
	var targetTopicId = data.targetTopicId;
	var progressCallback = data.progressCallback;
	var closureCallback = data.closureCallback;
	var lastReplyDatecreate = data.lastReplyDatecreate ? data.lastReplyDatecreate : 0;
	
	if (replies.length <= 0) {
		closureCallback({ success: true });
		return;
	}
	progressCallback({ count: idx + 1 });
	copyTopicReply({
		reply: replies[idx],
		referrers: referrers,
		referrerTimestamp: referrerTimestamp,
		referrerGroupId: referrerGroupId,
		referrerTopicId: referrerTopicId,
		targetTopicId: targetTopicId,
		lastReplyDatecreate: lastReplyDatecreate,
		callback: function (retval) {
			var success = retval.success;
			var message = retval.message;
			if (!success) {
				closureCallback({ success: false, message: message });
				return;
			}
			if (idx + 1 < replies.length) { 
				data.idx = idx + 1;
				data.lastReplyDatecreate = retval.datecreate;
				copyTopicReplyList(data);
			} else {
				closureCallback({ success: true });
			}
		}
	});
}

function copyTopicReply(data) {
	var reply = data.reply;
	var referrers = data.referrers;
	var referrerTimestamp = data.referrerTimestamp;
	var referrerTopicId = data.referrerTopicId;
	var referrerGroupId = data.referrerGroupId;
	var targetTopicId = data.targetTopicId;
	var callback = data.callback;
	var lastReplyDatecreate = data.lastReplyDatecreate;

	var message = reply.message._content;
	if (referrers) {
		message = '[http://www.flickr.com/people/' + reply.author + '/] <b>' + reply.authorname + '</b> ' +
			  '<a href="http://www.flickr.com/groups/' + referrerGroupId + '/discuss/' + referrerTopicId + '/' + reply.id + '/">wrote</a>' +
			  (referrerTimestamp ? ' (' + (new Date(reply.datecreate*1000)) + ')' : '') +
			  ':<blockquote><i>' + message + '</i></blockquote>';
	}
	try {
		new Request({
       			url: 'http://www.flickr.com',
       			onSuccess: function (responseText, responseXML) {
			        try {
			                var result;
			                try {
			                    result = JSON.parse(responseText);
			                } catch (e) {
			                    result = eval('(' + responseText + ')');
			                }
					if (result.stat === 'fail') {
						callback({ success: false, message: result.message });
					} else {
						var replyId = result.reply.id;
						getReplyInfo({ topicId: targetTopicId, replyId: replyId, callback: function (retval) {
							var datecreate = retval.datecreate;
							if (!$chk(lastReplyDatecreate)) { // the first one
								callback({ success: true, replyId: replyId, datecreate: datecreate });
								return;
							};
							if (!(datecreate > lastReplyDatecreate)) { // the script was too fast copying; Flickr can't see which to place before the other
								// remove, and try again
GM_log("posted too fast; removing, and trying again");
								deleteTopicReply({ topicId: targetTopicId, replyId: replyId, callback: function (retval) {
									copyTopicReply(data);
								}});
							} else {
								callback({ success: true, replyId: replyId, datecreate: datecreate });
							}
						}});
					}
				} catch (e) {
				    	GM_log("ERROR processing result: flickr.groups.discuss.replies.add " + e);
					callback({ success: false, message: "ERROR processing flickr.groups.discuss.replies.add result: " + e });
				}
			},
			onFailure: function (response) {
				GM_log("AJAX failure adding reply: " + response.statusText);
				callback({ success: false, message: response.statusText });
			}
    		}).post('/services/rest', {
			api_key: GM_getMagisterLudi(),
		        auth_hash: GM_getAuthHash(),
		        auth_token: GM_getAuthToken(),
		        format: 'json',
		        method: 'flickr.groups.discuss.replies.add',
		        nojsoncallback: 1,
		        topic_id: targetTopicId,
			message: message
		});
	} catch (e) {
		callback({ success: false, message: 'Exception: ' + e });
	}
}

function deleteTopicReply(data) {
	var replyId = data.replyId;
	var topicId = data.topicId;
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
			                    result = eval('(' + responseText + ')');
			                }
					if (result.stat === 'fail') {
						callback({ success: false, message: result.message });
					} else {
						callback({ success: true });
					}
				} catch (e) {
				    	GM_log("ERROR processing result: flickr.groups.discuss.replies.delete " + e);
					callback({ success: false, message: "ERROR processing flickr.groups.discuss.replies.delete result: " + e });
				}
			},
			onFailure: function (response) {
				GM_log("AJAX failure deleting reply: " + response.statusText);
				callback({ success: false, message: response.statusText });
			}
    		}).post('/services/rest', {
			api_key: GM_getMagisterLudi(),
		        auth_hash: GM_getAuthHash(),
		        auth_token: GM_getAuthToken(),
		        format: 'json',
		        method: 'flickr.groups.discuss.replies.delete',
		        nojsoncallback: 1,
		        topic_id: topicId,
			reply_id: replyId
		});
	} catch (e) {
		callback({ success: false, message: 'Exception: ' + e });
	}
}

function getTopicReplies(data) {
	var topicId = data.topicId;
	var page = data.page ? data.page : 1;
	var perPage = data.perPage ? data.perPage : 100;
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
			                    result = eval('(' + responseText + ')');
			                }
					if (result.stat === 'fail') {
						callback({ success: false, message: result.message });
					} else {
						var replies = result.replies.reply;
						if (replies && replies.length > perPage) { // the last page may contain more than we asked for
							// reduce to the desired length
							while (replies.length > perPage) {
								replies.pop();
							}
						}
						callback({ replies: replies, total: result.replies.topic.total, page: page, perPage: perPage, success: true });
					}
				} catch (e) {
				    	GM_log("ERROR processing flickr.groups.discuss.replies.getList result: " + e);
					callback({ success: false, message: "ERROR processing flickr.groups.discuss.replies.getList result: " + e });
				}
			},
			onFailure: function (response) {
				GM_log("error: " + response.statusText);
				callback({ success: false, message: response.statusText });
			}
    		}).get('/services/rest', {
			api_key: GM_getMagisterLudi(),
		        auth_hash: GM_getAuthHash(),
		        auth_token: GM_getAuthToken(),
		        format: 'json',
		        method: 'flickr.groups.discuss.replies.getList',
		        nojsoncallback: 1,
		        topic_id: topicId,
			page: page,
			per_page: perPage
		});
	} catch (e) {
		callback({ success: false, message: 'Exception: ' + e });
	}
}

function getReplyInfo(data) {
	var topicId = data.topicId;
	var replyId = data.replyId;
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
			                    result = eval('(' + responseText + ')');
			                }
					if (result.stat === 'fail') {
						callback({ success: false, message: result.message });
					} else {
						callback({ success: true, message: result.reply.message._content, datecreate: result.reply.datecreate });
					}
				    } catch (e) {
				    	GM_log("ERROR processing flickr.groups.discuss.replies.getInfo result: " + e);
					callback({ success: false, message: "ERROR processing flickr.groups.discuss.replies.getInfo result: " + e });
				    }
				},
				onFailure: function (response) {
					GM_log("AJAX error fetching reply info: " + response.statusText);
					callback({ success: false, message: response.statusText });
				}
    		}).get('/services/rest', {
			api_key: GM_getMagisterLudi(),
		        auth_hash: GM_getAuthHash(),
		        auth_token: GM_getAuthToken(),
		        format: 'json',
		        method: 'flickr.groups.discuss.replies.getInfo',
		        nojsoncallback: 1,
		        topic_id: topicId,
			reply_id: replyId
		});
	} catch (e) {
		callback({ success: false, message: 'Exception: ' + e });
	}
}

GM_addStyle('img.fcb-discuss-page { height: 12px; cursor: pointer; padding-left: 5px; padding-right: 5px; display: inline; }');
GM_addStyle('img.fcb-thread-page { margin-left: 5px; margin-right: 5px; cursor: pointer; }');

if (document.location.href.match(/flickr.com\/groups\/[^\/]+\/discuss(?:\/page\d+|\/\?deleted=1)?\/?$/)) { // group Discuss page
    $$('ul.topic-list li').each(function (row) {
	new Element('img', {
		src: images.backup,
		title: 'make backup',
		'class': 'fcb-discuss-page',
		events: {
			click: function (evt) {
				GM_getGroupId(function (retval) {
					if (!retval.success) {
						this.set('src', images.error);
						this.set('title', 'unable to detect group_id: ' + retval.error);
						return;
					}
					// global_group_id is filled out
					if (!global_group_id.found) {
						this.set('src', images.error);
						this.set('title', 'unable to detect group_id: ' + global_group_id.error);
						return;
					}
					var threadId = row.getElement('a[href*=/groups/]').href.match(/.*\/groups\/[^\/]+\/discuss\/(\d+)/)[1];
					toggleConversationBackupDialog({ groupId: global_group_id.id, threadId: threadId });
				});
			}
		}
	}).inject(row.getElement('div.hd h3'),'top');
    });

} else if (document.location.href.match(/flickr.com\/groups\/[^\/]+\/discuss\/\d+/)) { // thread page
	var threadId = document.location.href.match(/.*flickr\.com\/groups\/[^\/]+\/discuss\/(\d+)/)[1];
	var backupImg = new Element('img', {
		src: images.backup,
		title: 'make backup',
		'class': 'fcb-thread-page',
		events: {
			click: function (evt) {
				GM_getGroupId(function (retval) {
					if (!retval.success) {
						this.set('src', images.error);
						this.set('title', 'unable to detect group_id: ' + retval.error);
						return;
					}
					// global_group_id is filled out
					if (!global_group_id.found) {
						this.set('src', images.error);
						this.set('title', 'unable to detect group_id: ' + global_group_id.error);
						return;
					}
					toggleConversationBackupDialog({ groupId: global_group_id.id, threadId: threadId });
				});
			}
		}
	}).inject($('main').getElement('div.group-topic-detail-col h2'), 'after');

// TODO: compare
	return;
	// is it a backup thread?
	var titleElement = $('main').getElement('div.group-topic-detail-col h2').clone();
	titleElement.getElements('*').dispose();
	var title = titleElement.get('text');
	var titleMatch = title.match(/Backup\s+of\s+(\d+@\w\d{2})\s*-\s*(\d+)/);
	if (!titleMatch) { // not a backup thread
		return;
	}
	var sourceGroupId = titleMatch[1];
	var sourceTopicId = titleMatch[2];
	new Element('img', {
		src: images.diff,
		title: 'compare with source',
		'class': 'fcb-thread-page',
		events: {
			click: function (evt) {
				var groupId = global_group_id.id;
				if (!groupId.found) {
					this.set('src', images.error);
					this.set('title', 'unable to detect group_id: ' + groupId.error);
					return;
				}
				toggleConversationCompareDialog({ groupId: groupId.groupId, topicId: threadId,
									sourceGroupId: sourceGroupId, sourceTopicId: sourceTopicId });
			}
		}
	}).inject(backupImg, 'after');	
}

})();

