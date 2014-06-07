scr_meta=<><![CDATA[
// ==UserScript==
// @name			SU Visitor Icons
// @version			2.2
// @namespace		http://www.foresthippy.com
// @description		ForestHippy
// @include			http://*.stumbleupon.com/home/
// @include			http://*.stumbleupon.com/friends/*
// @include			http://*.stumbleupon.com/fans/*
// @include			http://*.stumbleupon.com/subscriptions/*
// @include			http://*.stumbleupon.com/
// @include			http://*.stumbleupon.com/archive/*
// @include			http://*.stumbleupon.com/favorites/*
// @include			http://*.stumbleupon.com/tag/*
// @include			http://*.stumbleupon.com/discoveries/*
// @exclude			http://www.stumbleupon.com/*
// @license			http://www.opensource.org/licenses/gpl-2.0.php
// ==/UserScript==
]]></>.toString();

var imgFan = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wEAAAAAAAAAAAAAAACoiGD/+vbyAP8B/wAFBQoAWnylAQAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAqIdb/wL//QAUGyMA/Pr6APr6+ADy7+4A' +
		'WnylAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAXGRwAPk9dAO3q5gDu7OYABgYI' +
		'AA4REgC5n37/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAABwXGAANFB4ASl91AEJW' +
		'bwDw7egAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAP369gAD' +
		'BQsAERcdAD5PXwACBQsA1cvEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAD9/f8A' +
		'AgMGAPv58wD9+/cACw0OAPjy6gAKDhIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAA' +
		'APv7/QACBQkA+/fvAPz48QD8+vYA7t3WADdLYwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAA' +
		'AAAAAAAACAcNAAMEBwAKEyMABAoUANbLwQAICxIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAABAAAAAAAAAAAAAAAA3bqb/+bs4wAAAAAALDhCAPTe1wAdRGkBAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAIAAAAAAAAAAAAAAAC29ioAIA8HADdBUAANDA8A3/8WAEev3P8AAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAQAAAAA+qNf/Fg4LAPgNDgB5G+4AEQcDAMH1DQCl8AsAEQcGAFL+6wBhMRYBAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAABWqrW/6YfKQArBAAAAvn6AAAAAAAH//0A7Pv/ACAKBwACBAMAGQMAACoH' +
		'/gB7KAMBAAAAAAAAAAAAAAAAAAAAAATK9P8ALQAAABn//gAABQUA/v/+AAD+AwAQBAAAAP8AAAD6/QDl' +
		'/v8AEv4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtz3/wAM9vsA/vr9AP35+wD/+v0A/vv9AP74/AD++PwA' +
		'/vn8AP75/ADd8vwASb31/wAAAAAAAAAAAAAAAAAAAAAEB/0AAP7t8gD+EwoA//0AAAAAAAAAAAAAAP//' +
		'AAAAAAD4+f0A/vj6AAMOCQD4+v0AAAAAAAAAAAAAAAAAAAAAAAQa//wAC/f0AA39CAAAAAAAAAAAAP/+' +
		'AAAAAP8AAAABAADx9wAA+fIADAkEAP/9AAAAAAAAAAAAAAAAAAAAAAAAIYPJLl1w26kAAAAASUVORK5C' +
		'YII=';

var imgFFan = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wEAAAAAAAAAAAAAAACoiGD/+vbyAP8B/wAFBQoAWnylAdmaIAEn' +
		'ZuD/15gfUAAAAJAAAAB+KWjhogAAAAAAAAAAAgAAAAAAAAAAqIdb/wL++AAcIykAGRwkAA4REgCmhFv/' +
		'J2bg/wAAAAAKDgNdFyAHHwoOA1oAAAAAAAAAAAAAAAABAAAAAAAAAAC/oHf/KTU+AMO2rAD9/PoAEhQa' +
		'APr6+AAFChEAIPuh7RIaBhMSGgUA8On7AOvj+uv8+/+9AgIAwwIAAAAAAAAAABwXGAANFB4ASl91AEJW' +
		'bwDw7egAAAAAAAAAAAAhMAoTFCMH/wECAP8SHwf7IjAKFQ8VBUz8+v8BBAAAAAAAAAAAAAAAAP369gAD' +
		'BQsAERcdAD5PXwACBQsA1cvEAOzk+/cUHAAJBQ0D/P31/gXt5fr28Oj6fS5v45UCAAAAAAAAAAD9/f8A' +
		'AgMGAPv58wD37+QACw0OAAH67QAKDhIA/Pr+1P//AAAABQED/v7/APz6/9zbyvahAAAAAAIAAAAAAAAA' +
		'APv7/QACBQkA+/fvAPz48QD8+vYA7t3WAA/kgiQCAwEg7eT6AODI9QDr4voAAgMBGC1CDRcAAAAAAgAA' +
		'AAAAAAAACAcNAAMEBwAKEyMABAoUANbLwQAICxIA/v7/JPHr+9Tt5vpdIVzeAu7n+lXw6fvV+/n+KgAA' +
		'AAABAAAAAAAAAAAAAAAA3bqb/+bs4wAAAAAALDhCAPTe1wAdRGkBAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAIAAAAAAAAAAAAAAAC29ioAIA8HADdBUAANDA8A3/8WAEev3P8AAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAQAAAAA+qNf/Fg4LAPgNDgB5G+4AEQcDAMH1DQCl8AsAEQcGAFL+6wBhMRYBAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAABWqrW/6YfKQArBAAAAvn6AAAAAAAH//0A7Pv/ACAKBwACBAMAGQMAACoH' +
		'/gB7KAMBAAAAAAAAAAAAAAAAAAAAAATK9P8ALQAAABn//gAABQUA/v/+AAD+AwAQBAAAAP8AAAD6/QDl' +
		'/v8AEv4BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtz3/wAM9vsA/vr9AP35+wD/+v0A/vv9AP74/AD++PwA' +
		'/vn8AP75/ADd8vwASb31/wAAAAAAAAAAAAAAAAAAAAAEB/0AAP7t8gD+EwoA//0AAAAAAAAAAAAAAP//' +
		'AAAAAAD4+f0A/vj6AAMOCQD4+v0AAAAAAAAAAAAAAAAAAAAAAAQa//wAC/f0AA39CAAAAAAAAAAAAP/+' +
		'AAAAAP8AAAABAADx9wAA+fIADAkEAP/9AAAAAAAAAAAAAAAAAAAAAAAA560lrMoXelkAAAAASUVORK5C' +
		'YII=';

var imgFMutual = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANmaIAEA' +
		'AAAA15gfUNeYH+DXmB9eAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAqIhgAQAAAAAAAAAA' +
		'J2bg/6aEWwEKDgNdFyAHHwoOA1oAAAAAAAAAAAAAAAABAAAAAAAAAACoiWGw+PPvRQIEBAoEBAccAQID' +
		'5Pj27/oGBwwFNBfG7hIaBhMSGgUA8On7AOvj+uv8+/+9AgIAwwEAAAAAq4tfSwsLDLQCBAcA/vz9/vX0' +
		'8QIQERH++vv+AgICAQD8+egASUTY/wL7+gABBgL8+/T9Beng+vTv5/p4BAAAAAAlICH6Gy08APT2+ADj' +
		'2tMCFhIQACc+UALp5eMAz76tAAgMFgDr6ekBGBnr/P31/gXt5fr28Oj6fS5v45UEAAAAAAgGBwD//fsA' +
		'FhogABUbIgDn0L0AAAD+AB0lLwAODw4A9PT3AADw0wAABQED/v7/APz6/9zbyvahAAAAAAIAAAAA+fn8' +
		'AAIDCAD38+gA/vnxAPn49wACAwcA9OvcAAoLCgD+8Nr++u/zAODI9QDr4voAAgMBGC1CDRcAAAAAAgAA' +
		'AAAFBAoFBAcMAAoRHQDu6+kAA/8HAAYMEv8LEh0A1cm+AAP27vDy5uldIVzeAu7n+lXw6fvV+/n+KgAA' +
		'AAABAAAAAAAAAADTtp+z8ezYTBgjKwAJ/P0A9+TjAOUA+QAxP0wA9b2zxRlfhjwAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAIAAAAASafVm4kBQy4eLkAADP8SAOC0xAAjpp8AOQ4cAAzHyAAYn507/lo1wQAAAAD/bEsB' +
		'AAAAAAAAAAAAAAAAAV6p1OyoIisTKPz7AAv59ADGcRUA/xQZAAD59wABBAQAAPXzAP8UGP8BCgwBABge' +
		'7QGTtBQAAAAAAAAAAAAAAAAEt/D/CTUAAAAMAwIAAwIEAOYABgAaBQYAAAUGAAD//gAABggAAPz7AQDt' +
		'6gD/AAEM/zMFGwHN++UAAAAAAAAAAATr+AAAKO31APoHAwAD+PsA9Pf3AAD18gAA/f0AAAAAAAD+/QAB' +
		'//4A/Pj4AAT59wcAAQF9AAAAaAAAAAAAAAAABCD//PcL8vIABxIOAAT+/QAB/gAK9wEFAAEGCAAAAP4A' +
		'AAAAAAT38/br9/wAGQX7AQD5+vUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAQLHwAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsK4hbL5BBKkAAAAASUVORK5C' +
		'YII=';

var imgFSub = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wEAAAAAAAAAAAAAAACoiGD/+vbyAP8B/wAFBQoAWnylAdmaIAEn' +
		'ZuD/15gfUAAAAJAAAAB+KWjhogAAAAAAAAAAAgAAAAAAAAAAqIdb/wL++AAcIykAGRwkAA4REgCmhFv/' +
		'J2bg/wAAAAAKDgNdFyAHHwoOA1oAAAAAAAAAAAAAAAABAAAAAAAAAAC/oHf/KTU+AMO2rAD9/PoAEhQa' +
		'APr6+AAFChEAIPuh7RIaBhMSGgUA8On7AOvj+uv8+/+9AgIAwwIAAAAAAAAAABwXGAANFB4ASl91AEJW' +
		'bwDw7egAAAAAAAAAAAAhMAoTFCMH/wECAP8SHwf7IjAKFQ8VBUz8+v8BBAAAAAAAAAAAAAAAAP369gAD' +
		'BQsAERcdAD5PXwACBQsA1cvEAOzk+/cUHAAJBQ0D/P31/gXt5fr28Oj6fS5v45UCAAAAAAAAAAD9/f8A' +
		'AgMGAPv58wD37+QACw0OAAH67QAKDhIA/Pr+1P//AAAABQED/v7/APz6/9zbyvahAAAAAAIAAAAAAAAA' +
		'APv7/QACBQkA+/fvAPz48QD8+vYA7t3WAA/kgiQCAwEg7eT6AODI9QDr4voAAgMBGC1CDRcAAAAAAgAA' +
		'AAAAAAAACAcNAAMEBwAKEyMABAoUANbLwQAICxIA/v7/JPHr+9Tt5vpdIVzeAu7n+lXw6fvV+/n+KgAA' +
		'AAABAAAAAAAAAAAAAAAA3bqb/+bs4wAAAAAALDhCAPTe1wAdRGkBAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAD/Qxn/47WF//rnzv/86s///1gy//8vAP8AAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAQAAAAD0LAD/Cw0NAAANEAAAOUUAAA0QAADk3gAA2M8AAA0QAAASFQABmbwBAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAB/y8A/wAICwAAERQAAPf1AAAAAAAAAAAAAPf1AAATFwAABQYAAAoMAAAU' +
		'GQABlLUBAAAAAAAAAAAAAAAAAAAAAATf+QAAIRQOAAAEBQAADRAAAP/+AAD+/gAACgwAAAAAAAD7+gAA' +
		'7usAAAUHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAun8AAAA+/kAAPz7AAD49wAA+fkAAPr5AAD49gAA+PYA' +
		'APj2AAD49QAA5uAA/z8U/wAAAAAAAAAAAAAAAAAAAAAE/wAAAPjv7gAIAQIAAPz7AAAAAAAAAAAAAP7+' +
		'AAAAAAAA+PUA+Pz+AAgMDQAA+PUAAAAAAAAAAAAAAAAAAAAAAAIIAQAA+P4AAAAAAAAABAUAAAQFAAAD' +
		'AwAABQUAAAUFAPL7/gDw/QAAAP7+AAD+/gAAAAAAAAAAAAAAAAAAAAAA9hYPuHKm6EoAAAAASUVORK5C' +
		'YII=';

var imgMutual = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqIhgAQAAAAAAAAAA' +
		'AAAAAKaEWwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAACoiWGw+PPvRQIEBAoEBAccAQID' +
		'5Pj28PYGBwwHW32mBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAq4tfSwsLDLQCBAcA/vz9/vX0' +
		'8QIQERH++vv+AgICAv/y8e/fGyc1LzxQa/QAAAAAAAAAAAAAAAAAAAAABAAAAAAlICH6Gy08APT2+ADj' +
		'2tMCFhIQACc+UALp5eMAz76tAQoMDyL18Oo8AAAAuAAAAAAAAAAAAAAAAAAAAAAEAAAAAAgGBwD//fsA' +
		'FhogABUbIgDn0L0AAAD+AB0lLwAODw4A9PT3ANzTzf0AAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAA+fn8' +
		'AAIDCAD38+gA/vnxAPn49wACAwcA9OvcAAoLCgD+8uXnChIa3wAAAAAAAAAAAAAAAAAAAAAAAAAAAgAA' +
		'AAAFBAoFBAcMAAoRHQDu6+kAA/8HAAYMEv8LEh0A1cm+AAb9/9I8TWLcAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAABAAAAAAAAAADTtp+z8ezYTBgjKwAJ/P0A9+TjAOUA+QAxP0wA9b2zxRlfhjwAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAIAAAAASafVm4kBQy4eLkAADP8SAOC0xAAjpp8AOQ4cAAzHyAAYn507/lo1wQAAAAD/bEsB' +
		'AAAAAAAAAAAAAAAAAV6p1OyoIisTKPz7AAv59ADGcRUA/xQZAAD59wABBAQAAPXzAP8UGP8BCgwBABge' +
		'7QGTtBQAAAAAAAAAAAAAAAAEt/D/CTUAAAAMAwIAAwIEAOYABgAaBQYAAAUGAAD//gAABggAAPz7AQDt' +
		'6gD/AAEM/zMFGwHN++UAAAAAAAAAAATr+AAAKO31APoHAwAD+PsA9Pf3AAD18gAA/f0AAAAAAAD+/QAB' +
		'//4A/Pj4AAT59wcAAQF9AAAAaAAAAAAAAAAABCD//PcL8vIABxIOAAT+/QAB/gAK9wEFAAEGCAAAAP4A' +
		'AAAAAAT38/br9/wAGQX7AQD5+vUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAQLHwAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3SXVCLTp1c4AAAAASUVORK5C' +
		'YII=';

var imgSub = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wEAAAAAAAAAAAAAAACoiGD/+vbyAP8B/wAFBQoAWnylAQAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAqIdb/wL//QAUGyMA/Pr6APr6+ADy7+4A' +
		'WnylAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAXGRwAPk9dAO3q5gDu7OYABgYI' +
		'AA4REgC5n37/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAABwXGAANFB4ASl91AEJW' +
		'bwDw7egAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAP369gAD' +
		'BQsAERcdAD5PXwACBQsA1cvEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAD9/f8A' +
		'AgMGAPv58wD9+/cACw0OAPjy6gAKDhIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAA' +
		'APv7/QACBQkA+/fvAPz48QD8+vYA7t3WADdLYwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAA' +
		'AAAAAAAACAcNAAMEBwAKEyMABAoUANbLwQAICxIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAABAAAAAAAAAAAAAAAA3bqb/+bs4wAAAAAALDhCAPTe1wAdRGkBAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAD/Qxn/47WF//rnzv/86s///1gy//8vAP8AAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAQAAAAD0LAD/Cw0NAAANEAAAOUUAAA0QAADk3gAA2M8AAA0QAAASFQABmbwBAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAB/y8A/wAICwAAERQAAPf1AAAAAAAAAAAAAPf1AAATFwAABQYAAAoMAAAU' +
		'GQABlLUBAAAAAAAAAAAAAAAAAAAAAATf+QAAIRQOAAAEBQAADRAAAP/+AAD+/gAACgwAAAAAAAD7+gAA' +
		'7usAAAUHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAun8AAAA+/kAAPz7AAD49wAA+fkAAPr5AAD49gAA+PYA' +
		'APj2AAD49QAA5uAA/z8U/wAAAAAAAAAAAAAAAAAAAAAE/wAAAPjv7gAIAQIAAPz7AAAAAAAAAAAAAP7+' +
		'AAAAAAAA+PUA+Pz+AAgMDQAA+PUAAAAAAAAAAAAAAAAAAAAAAAIIAQAA+P4AAAAAAAAABAUAAAQFAAAD' +
		'AwAABQUAAAUFAPL7/gDw/QAAAP7+AAD+/gAAAAAAAAAAAAAAAAAAAAAAL+yzOt2AzssAAAAASUVORK5C' +
		'YII=';

var imgFriend = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEgAA' +
		'CxIB0t1+/AAABBtJREFUOBEBEATv+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADXmB8AAAAA' +
		'ANeYH03anSAA15gfAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA15ceAAAA' +
		'AADWlx4W1ZUe/9aXHiwAAAAA15geAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAp' +
		'aeIAAAAAAP//AJwSGgYAAAAAlwAAAAApaOIAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAADLhxtABwkCTRgpCAAIDAM8y4gbSgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAA' +
		'ANaXH2MBAgBtBgcBIwECAQwYIgcACRAD//nz/QDm2/kB/v3/+Pv6/9r//v+1KmniegAAAAAAAAAAAgAA' +
		'AAAAAAAAAQEAuf/+/yUZIwgMITMK/wkOAwD//P8BBwsDASEzCv8bJwgI//4ALgEBALIAAAAAAAAAAAAA' +
		'AAACAAAAAAAAAAApaOHk+fb+MuPX9wD69P4BAP8AAAAAAAAA/wAA/Pf/AePW+AD7+f5FKWjiyAAAAAAA' +
		'AAAAAAAAAAIAAAAAAAAAANaXHgExc+TZ9vT9b+3k+gAAAwD+AQQB/wADAP/u5voA9vL8hi9w47zXmB8B' +
		'AAAAAAAAAAAAAAAAAgAAAAAAAAAAKmni/wAAAAADAwELCAwDAAD/AALv5PsB//z/AQgMAgACAwEHAAAA' +
		'AAAAAP8AAAAAAAAAAAAAAAACAAAAAAAAAADXmB8AAAAAAAMEASv38v0A28n18uTa96zbyvXw9fD9AAME' +
		'ASgAAAAAAP//AAAAAAAAAAAAAAAAAAIAAAAAAAAAAAD//wAAAAAAAgMBH+7n+pf7+f4uLm7jVf39/y3t' +
		'5PqTAgMBHwAAAAD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB66eo9+eslcAAAAASUVORK5C' +
		'YII=';
		
var imgListenOff = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wD/JSUAAAAAAP8WFgX/AwQCAAAAAAAAAAAAAAAAAAAAACeRGkUA' +
		'AAAAAAAAAC6WHwAAAAAAAAAAAAAAAAAAAAAAAQAAAAD/AAADADExgAD7++sB1NSSAAAAABKFDAr/Af8D' +
		'JhUbeQIBAbvHy9nAAJkA/wAAAAAAAAAAAAAAAAAAAAAE/xYWBQAbG34ALSx6APr7AvcC/iEocPO2HQQQ' +
		'HgkABAcXDxL6AwEBPP00/wDsKPHAAAAA/95x6QAAAAAAAAAAAAOA+PgAABERLAAUFEoAIiIAAgkLNULU' +
		'9STkQR7rFQwQCxsRFP8RCg0C8vj2JPT59trab+byAAAAAAAAAAAAAAAAA4H///+B6+vJeQL+EAMJCzQC' +
		'Hh0EGPMEHgzV4vu1Eu7e+AD9A/L39gDi7+m96PHu1BZLDwDvufUAAAAAAAAAAAADAAAAAAAAAACbhQT1' +
		'RtX2KBjzBB4AICEAHur+I0C+6MWSJe398fv3xMeL18H0p/j/77n1AAAAAAAAAAAAAAAAAAMAAAAACXwC' +
		'BisVHz7fPhvtDdbj+x/r/iMCJCUADgAIPTvK6vR6j9eHAOwAAKdMGwCt2vMAAAAAAAAAAAAAAAAAAwAA' +
		'AAAYThIPCAMEN/D29A/AGPbhRsTtxQ8ABz7/IyIBF/8MIoD9/Q2B6+u7rdrzAAAAAAAAAAAAAAAAACSQ' +
		'GAAEI5AYAN1w6O7kAO2RAAAAAAAAAAAeAAAA/vH/BgEEBHD/HR0FAfz8dekMAPVSXPjz/AkFBPv7+uzs' +
		'9fGt3HDo8QPvuPQAAAAAAAAAAAAAAAAAwT0aAKDi8wCB6+y7WBH7LxX8CSkAISABCv0DQCHq+ALoORnn' +
		'8/z58N3p5M/7wP79AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADeiKjb59vhFy5QK+QMpKYsBJCUAAODg' +
		'ANH52cRLTOh65WLlwwAAAAACAAAAAAAAAAAAAAAAJJEYAAAAAAA2myYwJg4ZRicXHQRLbv8FwAjeugDg' +
		'4AAAISAALgsqON2QD1IAAAAAAAAAAAMAAAAAAAAAAAAAAADuuPQALZYfFxwQFV4qGSABFAoO/woLDATX' +
		'MA7iHMneBhX4BxsCHR0EBAQGOIAAAO+A7u7LAwAAAAAAAAAAAAAAADWcIwD2+Pr4AQEBBQcEBRvw9/QB' +
		'4+/q8ej08PCcJfC3ZbDr7QUEBjcABwj+AO/uzgD9/MMEAAAAAAAAAAAAAAAA5u/vAOV17v3ZeuW8AwEB' +
		'APv+/T7i8OuiAf///eR17vEKAAC0/v0C3QEICBUAzMyBAQAA/AAAAAAAAAAAAAAAAAAAAAAAPp4sAAAA' +
		'AAAAAAAAKJIcTQAAAAAAAAAAAAAAAAAAAAD/BAQC/xgZBQAAAAD/KioAqJBBY6jxX5IAAAAASUVORK5C' +
		'YII=';

var imgListenOn = 'data:image/png;base64,' +
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAA' +
		'CxMBAJqcGAAABBtJREFUOBEBEATv+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACaRGogA' +
		'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGFChUJRAUP' +
		'HBAUrx1PFAPkEO3BANEA/wAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAABmIDyQXDhJ3DgkL' +
		'LAcDBQ0XDxIAAwIBef09/wDuMvOA3XDn/gAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAhjRY9IRQYth8S' +
		'GAsNCAkB/v8AABMMDv8BAAAE7fTyffT59rgAAADGAAAAAAAAAAAAAAAABAAAAAAAAAAADoQIGB4SFrEw' +
		'HCYMBwQEAOLv6vvp8+/2GvcSDwMCAwDr9PF97fL2xwAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAeEBdx' +
		'HhEXDwQDAgDW5+Do3+znkNvt5aosGSHeCAQFh9ms44bwufb/AAAAAAAAAAAAAAAAAAAAAAQAAAAABX8B' +
		'DBEKCzcLCAkC4e3p+tjp4ofZb+aSAAAAAPST94nbx+V88Ln2/gAAAAAAAAAAAAAAAAAAAAAAAAAABAAA' +
		'AAAXDBEa9fr4HtPm3gD7/PsC8fn2twAAAAAAAAAA9Pj4fPCf9v4AAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuLEgLlde7+AAAAABmJEBwaEBTDBQMDD/r7+9bs' +
		'9fFa4nTt4gIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwkLawAAAAAAAAAADQgKQCETGBouGyMR' +
		'DQkK/un08O4AAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADyeKm4JBQeSAAAAAiuUHVsmFhyBIBIY' +
		'Bvr7+/7x9vXK+YD99AAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAA2miZhIRIZi/v//AAMnwjqFw4RCyET' +
		'Ggj+//7/4/Dq9uTw7JAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAALZYfLhcOEZ4iFRoAAP///xQLDxME' +
		'AgQA7/fzAOPu6vrj7+tY7Hrz5AAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAD7/P3X7vXzkOXw6279/v4C' +
		'6PLu4vv+/fDy9/XY6fPvieFz684AAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAAFPiYr' +
		'ivv+/XDi8OsnAAD++OV07+IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
		'AAAAAAAAKJIcmgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw7lzcic3ZgAAAAASUVORK5C' +
		'YII=';
		

var divCount = getElementsByClassName ('pdgTopXSm pdgBottomSm textNowrap textDisabled', 'div')[0];
var loginurl = divCount.childNodes[1].href;
var baseurl = loginurl.match (/http:\/\/[^.]*.stumbleupon.com\//);	

var homeurl = window.location.toString();

var gmFriends = GM_getValue (baseurl + 'friends', '');
var gmFans = GM_getValue (baseurl + 'fans', '');
var gmSubs = GM_getValue (baseurl + 'subs', '');
var gmNumFriends = GM_getValue (baseurl + 'numfriends', 0);
var gmNumFans = GM_getValue (baseurl + 'numfans', 0);
var gmActualNumFans = GM_getValue (baseurl + 'actualnumfans', 0);
//bugfix
if (gmActualNumFans > (gmNumFans + 50)) {
	gmActualNumFans = 0;
}
var gmNumSubs = GM_getValue (baseurl + 'numsubs', 0);
var gmUpdStarted = GM_getValue (baseurl + 'updstarted', true);
var gmCheckFreq = GM_getValue ('checkfreq', 0);
var gmListen = GM_getValue ('listen', true);
var listenPending = false;

if (gmCheckFreq == 0) {
	GM_setValue ('checkfreq', 300000); // 5 minute check interval
	gmCheckFreq = 300000;
}

var newVisitors = 0;

var friendsDone;
var fansDone;
var subsDone;

var latestVisitor = '';

// Main code


if (homeurl.search (/\/home\//i) > -1) {
	var divVis = document.getElementById ('divVisitors');
	var divCommand = document.createElement ('div');
	var divUpdate = document.createElement ('div');
	var linkUpdate = document.createElement ('a');
	var textUpdate = document.createElement ('span');
	var textNewVis = document.createElement ('span');
	textNewVis.className = 'textWarning';
	var tn = document.createTextNode ('Update friends/subscribers');
	var i;
	
	divCount.insertBefore (textNewVis, divCount.childNodes[7]);
	var listenToggle = document.createElement ('img');
	if (gmListen) {
		listenToggle.src = imgListenOn;
		listenToggle.title = 'Click to turn off dynamic visitor updates';
	} else {
		listenToggle.src = imgListenOff;
		listenToggle.title = 'Click to turn on dynamic visitor updates';
	}
	listenToggle.addEventListener ('click', toggleListen, false);
	listenToggle.style.marginLeft = '5px';
	divCount.insertBefore (listenToggle, textNewVis.nextSibling);
	
	linkUpdate.href = 'javascript:void(0)';
	linkUpdate.appendChild (tn);
	linkUpdate.addEventListener ('click', updateAllLists, false);
	divCommand.appendChild (linkUpdate);
	divCommand.style.height = '1.5em';
	divUpdate.appendChild (textUpdate);
	divUpdate.style.marginTop = '20px';
	divUpdate.style.height = '1.5em';
	divVis.parentNode.insertBefore (divUpdate, divVis);
	divVis.parentNode.insertBefore (divCommand, divUpdate);

	updateIcons ();
	updateNumbers ();
	if (gmListen && !listenPending) {
		window.setTimeout (updateVisitors, gmCheckFreq);
		listenPending = true;
	}
} else if (homeurl.search (/\/fans\//i) > -1 || homeurl.search (/\/friends\//i) > -1 || homeurl.search (/\/subscriptions\//i) > -1) {
	updateIcons ();
} else {
	var sidebar = getElementsByClassName ('sidebar', 'td')[0];
	if (sidebar && document.getElementsByName ('ftoken')[0] == undefined ) { // If ftoken is present the page is owned by user, so do not display subscription status
		var unrx = /http:\/\/([^.]*)./;
		var unameexec = unrx.exec(homeurl);
		if (unameexec) {
			var uname = unameexec[1];
			var tspan = document.createElement ('h3');
			tspan.style.clear = 'both';
			if (gmFans.search ('<' + uname + '>') > -1) {
				tspan.innerHTML = uname + ' is subscribed to you';
			} else {
				tspan.innerHTML = uname + ' is not subscribed to you';
			}
			sidebar.childNodes[1].appendChild (tspan);
		}
	}
}

function getElementsByClassName (cn, tn) {
	var el = new Array ();
	var i;
	var alltn = document.getElementsByTagName (tn);
	for (i=0; i<alltn.length; i++) {
		if (alltn[i].className == cn) {
			el.push (alltn[i]);
		}
	}
	return el;
}

function toggleListen () {
	if (gmListen) {
		GM_setValue ('listen', false);
		gmListen = false;
		listenToggle.src = imgListenOff;
		listenToggle.title = 'Click to turn on dynamic visitor updates';
	} else {
		GM_setValue ('listen', true);
		gmListen = true;
		listenToggle.src = imgListenOn;
		listenToggle.title = 'Click to turn off dynamic visitor updates';
		if (!listenPending) {
			updateVisitors ();
		}
	}
}

function fadeText (opacity) {
	textUpdate.style.opacity = opacity;
	if (opacity >= 0.0) {
		setTimeout (function () { fadeText (opacity - 0.1); }, 80);
	} else {
		textUpdate.textContent = '';
		textUpdate.style.opacity = 1;		
	}
}

function updateAllLists () {
	friendsDone = false;
	fansDone = false;
	subsDone = false;
	GM_setValue (baseurl + 'updstarted', true);
	GM_setValue (baseurl + 'numfriends', 0);
	GM_setValue (baseurl + 'numfans', 0);
	GM_setValue (baseurl + 'numsubs', 0);
	gmListen = false;
	
	linkUpdate.textContent = '';
	GM_log ('Full update');
	
	updateList ('/friends/all/', '', 'friends');
	updateList ('/fans/', '', 'fans');
	updateList ('/subscriptions/', '', 'subs');
}

function updateList (url, arr, gmvar) {	
	var xmlhttp=null;
	
	textUpdate.textContent = 'Opening ' + url;
	GM_log ('Opening ' + url);

	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}

	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=function () { 
			if (xmlhttp.readyState < 4) {
				textUpdate.textContent = 'Reading ' + url;
				GM_log ('Reading ' + url);				
			} else if (xmlhttp.readyState == 4) {
				GM_log ('Page read status: ' + xmlhttp.status);
				textUpdate.textContent = 'Processing ' + url;
				GM_log ('Processing ' + url);	
				var page = xmlhttp.responseText.toLowerCase();
				if (page != null) {
					var i, uname, unstr = '';
					var dlmatch = page.match (/<dl class="vcardLg"[\s\S]*?\/dl>/gi);
					if (dlmatch) {
						for (i=0; i<dlmatch.length; i++) {
							uname = /title="(\S*)\s/.exec (dlmatch[i])[1];
							if (uname) arr += '<' + uname + '>';
						}
					}
					
					var pnextmatch = /href="([^"]*?)" class="nextprev" id="paginationNext"/i.exec (page);
					if (pnextmatch != null) {
						var newurl = pnextmatch[1];
						GM_log ('Next page');
						updateList (newurl, arr, gmvar);
					} else {
						var arrlen = arr.split ('><').length;
						//GM_log (gmvar + ': ' + arr);
						//GM_log (gmvar + ': ' + arrlen); 
						
						if (gmvar == 'friends' && arrlen >= gmNumFriends) {
							GM_log ('Updated friends ok');
							logChanges (gmFriends, arr);
							friendsDone = true;
							gmFriends = arr;
							GM_setValue (baseurl + gmvar, arr);
							GM_setValue (baseurl + 'numfriends', gmNumFriends);
							textUpdate.textContent = 'Friends updated OK!'
						} else if (gmvar == 'fans' && (arrlen >= (gmNumFans-50) || arrlen >= (gmActualNumFans - 50))) { // SU Subscriber count is completely wrong - total fudge
							GM_log ('Updated fans ok');
							logChanges (gmFans, arr);
							fansDone = true;
							gmFans = arr;
							GM_setValue (baseurl + gmvar, arr);
							GM_setValue (baseurl + 'numfans', gmNumFans);
							GM_setValue (baseurl + 'actualnumfans', arrlen);
							textUpdate.textContent = 'Subscribers updated OK!'
						} else if (gmvar == 'subs' && arrlen >= gmNumSubs) { 
							GM_log ('Updated subs ok');
							logChanges (gmSubs, arr);
							subsDone = true;
							gmSubs = arr;
							GM_setValue (baseurl + gmvar, arr);
							GM_setValue (baseurl + 'numsubs', gmNumSubs);
							textUpdate.textContent = 'Subscriptions updated OK!'
						}
						if (friendsDone && fansDone && subsDone) {
							updateIcons ();
							textUpdate.textContent = 'All updated OK!';					
							linkUpdate.textContent = 'Update friends/subscribers';
							fadeText (1.0);
							GM_setValue (baseurl + 'updstarted', false);
							if (GM_getValue ('listen', false) && !gmListen) {
								gmListen = true;
								if (!listenPending) {
									window.setTimeout (updateVisitors, gmCheckFreq);
									listenPending = true;
								}
							}
						}
					}
				}		
			}
		};
		xmlhttp.open('GET',url,true);
		xmlhttp.send(null);
	}
}

function logChanges (oldstr, newstr) {
	oldstr = oldstr.replace (/></g, ' ');
	oldstr = oldstr.replace (/</g, '');
	oldstr = oldstr.replace (/>/g, '');
	newstr = newstr.replace (/></g, ' ');
	newstr = newstr.replace (/</g, '');
	newstr = newstr.replace (/>/g, '');
	var oldarr = oldstr.split (' ');
	var newarr = newstr.split (' ');
	var n, o, f, found;
	
	for (o=0; o<oldarr.length; o++) {
		found = false;
		for (n=0; n<newarr.length; n++) {
			if (oldarr[o] == newarr[n]) {
				found = true;
				break;
			}
		}
		if (!found) {
			GM_log ('Removed ' + oldarr[o]);
		}
	}
	
	for (n=0; n<newarr.length; n++) {
		found = false;
		for (o=0; o<oldarr.length; o++) {
			if (oldarr[o] == newarr[n]) {
				found = true;
				break;
			}
		}
		if (!found) {
			GM_log ('Added ' + newarr[n]);
		}
	}
}	
	
	
function updateIcons () {
	var alldls = document.getElementsByTagName ('dl');
	var allimgs = document.getElementsByTagName ('img');
	var i, uname, icond, tn, img, temp;
	var isfriend, isfan, issub;
	
	// Remove friend/fan icons
	for (i=0; i<allimgs.length; i++) {
		temp = allimgs[i];
		if (temp.src == 'http://cdn.stumble-upon.com/images/icon_friends.gif' || temp.src == 'http://cdn.stumble-upon.com/images/icon_fan.gif' || temp.className == 'jdmicon') {
			temp.parentNode.removeChild (temp);
			i--; // Fudge because removechild removes array element
		} 
	}
	
	for (i=0; i<alldls.length; i++) {
		if (alldls[i].className == 'vcard clearfix' || alldls[i].className == 'vcardLg') {
			if (latestVisitor === '' && alldls[i].className == 'vcard clearfix') {
				latestVisitor = alldls[i].childNodes[1].textContent;
			}
			uname = '<' + alldls[i].childNodes[1].textContent.toLowerCase() + '>';
			icond = alldls[i].childNodes[3];
			if (icond == null) {
				icond = document.createElement ('dd');
				icond.className = 'flairs';
				alldls[i].appendChild (icond);
			}
			isfriend = false;
			isfan = false;
			issub = false;
			if (gmFriends.search(uname) > -1) {
				isfriend = true;
			}
			if (gmFans.search(uname) > -1) {
				isfan = true;
			}
			if (gmSubs.search(uname) > -1) {
				issub = true;
			}
			
			if (isfriend || isfan || issub) {
				img = document.createElement ('img');
				img.className = 'jdmicon';
				if (isfriend) {
					if (isfan) {
						if (issub) {
							img.src = imgFMutual;
							img.title = 'Mutual subscriber / Friend';
						} else {
							img.src = imgFFan;
							img.title = 'Subscriber / Friend';
						}
					} else {
						if (issub) {
							img.src = imgFSub;
							img.title = 'Subscription / Friend';
						} else {
							img.src = imgFriend;
							img.title = 'Friend';
						}
					}
				} else {
					if (isfan) {
						if (issub) {
							img.src = imgMutual;
							img.title = 'Mutual subscriber';
						} else {
							img.src = imgFan;
							img.title = 'Subscriber';
						}
					} else {
						if (issub) {
							img.src = imgSub;
							img.title = 'Subscription';
						} // Else WTF?
					}
				}
				
				icond.appendChild (img);
			}
		}
	}
}

function updateNumbers () {
	var xmlhttp=null;
	var url = baseurl + 'friends/';
	var i, num;
	
	linkUpdate.textContent = '';
	textUpdate.textContent = 'Checking for changes...';
	GM_log ('Checking for changes');
	
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest();
	}

	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=function () { 
			if (xmlhttp.readyState < 4) {
			} else if (xmlhttp.readyState == 4) {
				var page = xmlhttp.responseText.toLowerCase();
				if (page != null) {
					var numexp = /<span class="textXSm textNoEm textUncolor">\([0-9]*\)<\/span>/ig;
					var numexpexec = /\(([0-9]*)\)/;
					var nummatch = page.match (numexp);
					var numexec;
					var newnums = Array (3);
					if (nummatch) {
						for (i=0; i<3; i++) {
							numexec = numexpexec.exec (nummatch[i]);
							newnums[i] = numexec[1];
						}
						GM_log ('SU reported friends: ' + newnums[0]);
						GM_log ('SU reported subs: ' + newnums[1]);
						GM_log ('SU reported fans: ' + newnums[2]);
						
						if (gmNumFriends != newnums[0] || gmNumSubs != newnums[1] || gmNumFans != newnums[2] || gmUpdStarted) {
							if (gmUpdStarted) {
								textUpdate.textContent = 'Restarting previous attempt...';
								GM_log ('Restarting previous attempt');
							} else {
								textUpdate.textContent = 'Changes detected...';
								GM_log ('Changes detected');
							}
							friendsDone = true;
							fansDone = true;
							subsDone = true;
							GM_setValue (baseurl + 'updstarted', true);
							if (gmNumFriends != newnums[0]) {
								gmNumFriends = Number(newnums[0]);
								friendsDone = false;
								GM_log ('Updating friends');
								updateList ('/friends/all/', '', 'friends');
							}
							if (gmNumSubs != newnums[1]) {
								gmNumSubs = Number(newnums[1]);
								subsDone = false;
								GM_log ('Updating subs');
								updateList ('/subscriptions/', '', 'subs');
							}
							if (gmNumFans != newnums[2]) {
								gmNumFans = Number(newnums[2]);
								fansDone = false;
								GM_log ('Updating fans');
								updateList ('/fans/', '', 'fans');
							}	
							if (friendsDone && fansDone && subsDone) {
								updateAllLists ();
							}
						} else {					
							linkUpdate.textContent = 'Update friends/subscribers';
							fadeText (1.0);
							GM_log ('No changes detected');
						}
					}
				}
			}
		};
		xmlhttp.open('GET',url,true);
		xmlhttp.send(null);
	}
}

function updateVisitors () {
	listenPending = false;
	if (gmListen) {
		var xmlhttp=null;
		var url = homeurl;
		var i, num;
		
		textUpdate.textContent = 'Checking for visitors...';
		GM_log ('Checking for visitors');
		
		if (window.XMLHttpRequest) {
			xmlhttp=new XMLHttpRequest();
		}

		if (xmlhttp!=null) {
			xmlhttp.onreadystatechange=function () { 
				if (xmlhttp.readyState < 4) {
				} else if (xmlhttp.readyState == 4) {
					var page = xmlhttp.responseText;
					if (page != null) {
						var dlexp = /<dl class="vcard clearfix"[\s\S]*?\/dl>/gi;
						var unameexp = /title="(\S*)\s/;
						var newvisdls = '';
						var i, uname, unstr = '';
						var dlmatch = page.match (dlexp);
						if (dlmatch) {
							for (i=0; i<dlmatch.length; i++) {
								uname = unameexp.exec (dlmatch[i])[1];
								if (uname) {
									if (uname != latestVisitor) {
										newvisdls += dlmatch[i];
										newVisitors ++;
									} else {
										break;
									}
								}
							}
						}
						if (newvisdls !== '') {
							var newvisdiv = document.createElement ('div');
							newvisdiv.innerHTML = newvisdls;
							divVis.insertBefore (newvisdiv, divVis.childNodes[3]);
							textNewVis.textContent = '+' + newVisitors;
							GM_log ('Added ' + newVisitors + ' visitors');
							latestVisitor = '';
							updateIcons ();
							window.setTimeout (updateNumbers, gmCheckFreq / 2);
						}
						if (gmListen && !listenPending) {
							window.setTimeout (updateVisitors, gmCheckFreq);
							listenPending = true;
						}
						fadeText (1.0);
					}
				}
			};
			xmlhttp.open('GET',url,true);
			xmlhttp.send(null);
		}
	}
}

//////////////////////////////////////////////
// Update Code:
// http://userscripts.org/scripts/show/38017
// by sizzlemctwizzle

CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '49972', // Script id on Userscripts.org
 days: 2, // Days to wait between update checks
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match('Uh-oh! The page could not be found!')) || (this.xname[1] != this.name) ) GM_setValue('updated', 'off');
      return false;
    }
    if ( (this.xversion > this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion > this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') CheckScriptForUpdate.check();
	
	
	
	
	
	
	
	
	
	
	
	
	
	