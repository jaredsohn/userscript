// ==UserScript==
// @name           SSW.UpUp.us Healthifier
// @namespace      http://ssw.upup.us
// @description    One click health fill ups
// @include        http://www.secretsocietywars.com/index.php*
// ==/UserScript==
var cssStyle = (<r><![CDATA[
html {
	height:100%;
}
body {
	position:relative;
	min-height:99%;
}
div.prefOverlay {
	position:absolute;
	width:100%;
	left:0;
	top:0;
	height:100%;
	background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABISURBVHja7M8xEQAgDACxB%2F%2Beag0XDL3EQU41LXBbQkREREREREREREREREREREREREREREREREREREREREREREREROSPJ8AAG5MBI9WX8SAAAAAASUVORK5CYII%3D) repeat top left;
}
div.prefOverlay div.prefContent label {
	width:4em;
	height:1.3em;
	padding-top:4px;
	color:#444;
	font-weight:bold;
	vertical-align:bottom;
	float:left;
}
div.prefOverlay div.prefContent {
	color:#444;
	margin-bottom:5px;
}
div.prefOverlay div.pref {
	font-size:9pt;
	line-height:1.2em;
	position:absolute; 
	height:100px;
	width:230px;
	top:250px;
	margin:0 auto;
	right:0;
	left:0;
}
div.prefOverlay div.prefContent {
	padding:.5em 1em 1em 1em;
	background-color:white;
	-moz-border-radius-bottomleft:10px;
	-moz-border-radius-bottomright:10px;
}
div.prefOverlay div.closeIcon {
	border:2px solid white;
	-moz-border-radius-topright:10px;
	font-family:sans-serif;
	font-weight:bold;
	width:15px;
	font-size:8pt;
	text-align:center;
	cursor:pointer;
	float:right;
}
div.prefOverlay div.closeIcon:hover {
	background-color:red;
}
div.prefOverlay div.titleBar {
	font-weight:bold;
	font-size:9pt;
	padding:3px 3px 3px 8px;
	-moz-border-radius-topleft:10px;
	-moz-border-radius-topright:10px;
	height:1.4em;
text-align:center;
	position:relative;
	background-color:darkred;
	color:white;
}
div.loading div.loadingSpan {
	font-size:8pt;
	display:block;
	position:absolute;
	padding:0 4px;
	width:96%;
	bottom:8px;
	text-align:center;
	color:white;
	font-weight:bold;
	font-style:italic;
	font-family:verdana, arial, sans-serif;
}

div.loading {
	position:fixed;
	background: black url(data:image/gif;base64,R0lGODlhIAAgAPYAAAAAAP%2F%2F%2FwQEBBwcHCwsLCoqKhAQEAICAggICEZGRpKSkrq6urCwsHZ2digoKAoKCjg4OLKysvr6%2BuDg4B4eHhQUFGBgYFhYWAwMDHR0dOTk5MjIyERERCAgICQkJISEhMLCwtbW1tLS0lZWVoiIiPDw8Nzc3FRUVKioqBISEnh4eN7e3vLy8lJSUuLi4jY2Nujo6PT09NjY2Hp6ejw8PMDAwOzs7IqKimxsbG5ububm5nJyckhISM7OzkJCQmpqary8vCYmJlpaWj4%2BPjQ0NDIyMqSkpNra2nBwcICAgIyMjH5%2Bfvb29kBAQFBQUIKCgmhoaJaWlpSUlEpKSiIiIp6enkxMTE5OToaGhjAwMHx8fKampszMzDo6OhoaGgYGBg4ODhgYGNTU1JycnKCgoBYWFo6OjgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2BGkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIAAgAAAH%2F4AAgoOEhYaHiImKi4yNjQeGCCkCjoYpBDQFKYMCHDMElYQeKgw1DA1BkAg5QAmhghUfKxK0Jh8VBwcOPBWFFR0PiQIJILTGGwmQALmEKUtGTgiIDxYhxrUW0ocEGyUKBogIFyLXEiEnlIcVz9GIBwQMLNcMRMrqHsGJBiMLGjYuC4RgeFXoAAYPLVSQ2OEDHMFBCCBkIJGBwwAD6Rwx45QggoYSAF%2B8cmDBAoVBAxSUu5GvUYUnE0zscEhgQbkFvRxRMEJLQc4CDMoxyNkIA5QaC0YMBGCgwQRjLnBkbGSACBGHyxwo2GBiA4mTDwtS4HAigQOMYQ89eGEhBy97iZg2uoOAQsYEED82xSVigcZSdSRgGAMyJC6HGi42ZEPUAUUMYyFGKEOAQRtTEiVoRaGCqIKCzLRA%2BAAgoAiSJCdyYlABg0kJKUQLdtSgo8eMAbqMwCjRwwK4d0ZqGJkytdCDBDM%2BWOhwQJwMY0Y8CDrgoUkBy4gEVKiQD4GQI7RKRCcENxQB3bwt%2FE1LmsYMJSbZFxJggLujQAAh%2BQQACgABACwAAAAAIAAgAAAH%2F4AAgoOEgwcVVFQpB4WNjo4PEEkoKEsvD4%2BZjQI0RhoSEhpGEAKapgAVSxOgoBNJFaeFBg4EFQJBRkysoEZBsYIHDg0oDFhNREa7EiW9vwADJKsSOihOSdKgLq%2BCFRWMjwI8G7sTGTwoMKA2W0OlqUkDmQhCIcokFUVaDAwzBAjcUaI4yCTAyjhWK3JgQpAiBYJvAG4FKZWJgpJPEmAwgOBM3osnDCIoSIChYyMMBYYQCUKg1j%2BThDA4MbIAhQVbMAsdGBKhBKgNJyDGQgDBAgGKD35gK0ECk7MORkIogAXgAY6lTTt6iCKDRDwAB5r0lMBiQwuhpxB0MUoRgAEnVZxq3syJFgDKIQQM5NQk4IAADA%2Fq7nXLAQkUf6ceOOR7ZcGKI1GyCB6UwgKJESUfVVCQTsIRKE4dHbDSo0SNJhWjsJqAJHPEtmBHmJDAZUomDDhEMIGxIEGpAwWECCnQtoOSCEu%2BasYRRcoVvQA8SDGxIgoVQhVqmTqAgQJOsDx6gOrBY7LJISBAgRhivmOFHCFzUB2MvUiR%2BfQHBwIAIfkEAAoAAgAsAAAAACAAIAAAB%2F%2BAAIKDhIUAB4aJiokHFUVdQQ%2BLk4YHDksLNUYjFZSeABRPKxISJUAtkgcPGAieDwMFAwgCPkBMpBI6HwMYRBY4Jw4CixhOClsKPBUtXLilUQQnWyImGwovX4m0CyUlOgwJTRHOLk8XESW4LgpUiQYNOrgmOUEqR6QsEU4ZJs4SCxwQFUqRBAYuDRkMVLBghMGHLhWWxHO2ocWwQghOcIkhgQkIJ4gOKMQA4AGUe7hYAPFxsVAFFQt6RMgxQFEXFDbkfeigCEGFJi2GVBBoCMMVIz1CbLhBpJUhBBhCEu1ZwIkQHhSmCsJAQIiQAi09IZilrcmWEDKMQPhUSFW2QQa1VGggpUGLU7YAPEBxYmBQBRLpSim4y5YGil2DEFjg0m2DhbCfKnBoSqgCDiNGLNTEO%2BlACg8OOnEeTdoTBgNaSw86QADJEh%2BSKKUg4CU1oQ5RNMAACLnQgxw1lFCYBGEDKRNQYitKoQBGhCKTgmyBUeLj3QcUhg4ScEUKFNGKHjiJknkzAAwjoiQhQNQnSUoIKATpO8jBuCM53qsmVIBBiSM46LefIAZcoB57AxaCQXaEJUhaIAAh%2BQQACgADACwAAAAAIAAgAAAH%2F4AAgoOEhQcCB4WKi4yCBgRTTRSJjZWFDxdbG0BLBJSWlQdEDCUSEmIZFaCKCGAIgggtYqYSJVEOAhVFEEEPlgMtGRdBAghOIrS2BQQqDAtRLSmNFSobGj1JHQceYzC1GxYvWEemJRFTr4tFC7Q1CQAITQoLDBYePDW0EhpJqosvNZiY2mBF0IEKHSg8ENCihz5bHhhVUGCihIkoBBg1WVDKlIkZ%2FhQdeKHCyJImvhYN0NIjhgQYKDikW3TQQYWZigQ4yGGEgQIhQVLgXLUIQ5AuV3AsyXBlwCcwHQYMtXQAgoIeLkwAQeJvAI4tRloYIAqgAgkX%2BjZcACBgCoiXDLUyEiWQTx8MBfAshBjogywBhw%2FJADhAA8WEIwqCkA0SgYU%2BHUkEpeDRAAeRqY0e5GhpCgaDIYMQpDDwiaiHHQt6bIhyZSxZRge7OJlCAMNrUAdKK6pQIIxuRohAdViyQIEnS0GQJMA86MAVLqcspGyUYIEK17B9RNAB5MpMASlsEwJGRIClFC1ICAkp4EUDCyEFBQeFoMKDTwZUHInQ5fftQQ9YUANG%2F1VCAQcviFcgcP4tWGAgACH5BAAKAAQALAAAAAAgACAAAAf%2FgACCg4SFhoeIiQAYQURBD4qRhQ88UREKPBiSkgcFRjASMFFFB4OlmwgPpwc%2BGxKvQDwCAAgdRUGaiQcOFxZEkAcvESUSJQxdAgYJCgxRIxWJHVg9MlEQpRU%2FQGILFhUIQ1s6oQtWkIdDNa89FucVHBZN0Bg%2FMq8SKzPQhgdEwxIbTpwTdAqAgRxH7rl4MgBRCgsoIjToULAQAh4LSjApAUJILn4ViNAYUNFQBQsMNkTYQVHRgZKHBFR4YYUHgQEYYG4CmWDHEgsEEBR6uXMQghYoTGgQoYDAqQdELFjZt7ODEWKvTGRIAWCXAjEgLgyUBKHHvWJGOnSFsECCCxVcyHcScXWvRBQqgjwkqcFgitCdA6KMeyUGSS4BHXy8MFCUVoIqXEKASFKg4AEBOhEdMBAEQgsoP1oEmdWYEAICOaKgUGDBQc7ShYJgEfEKxgIhcQ8d6PDCS2YEFjYwuSeKAGlDHT4sQEK1kAEtg%2B%2BBsHK8EIEtExSoPZRiSfRXNaZUJ1Thwo1MhAS8Bs7lrA4jpBI9%2BJb%2BBVBBQZ70sFFCQwTcpT0AkROlCFAADlEYocAJze0kgH0OmFKBAwVQ8FFpAqgC24YcdhgIACH5BAAKAAUALAAAAAAgACAAAAf%2FgACCg4SFhoeIiYIHD1%2BKj4cYL0JTFAKQmAddRj1AOQOYkA9QJhIlW0QHgweqkAeXgw8WMqZGBKoHFC9EFa2IBl1XQbACRWYgDBYVAAcESgsRM0G%2BhQIJWyBJHoMIDlMQvQApSLQSG0IYiBgNExILPtSFFAolEhIrWsuHCC0RPQq3ElVoUIoFF2UCr1jo8kARAghSNtTAQgDWoQMIMFhM9IDAFR4OGobKxOrBg40jESEIcuXECwOEDmCogCAlAAEQonDpkQwmswpCZjQRGWrAk3amUEAQhGAIChkfQI0kgKKevR4nBhFQEAGKvlBBolhlAoIHtwJdpI5MIQSIDhgiyT50KBTP1QMPFqJE2VGkps1BAgb4GNGiCwECFVCmPBAkw4IeIG4wfFS3UAoLG%2BxJCJFkrkAeBPwCAFNg14AvBaLA0CwhwpDKN4cwyFCGGYUfDLiAUJCgSVXWC5rAZoxkCoYDFTBrnmDkwo0VmmFEIaDoQIqGOH9rlpGhRZUjOiZEuJAilAAeNVhLgIHFwZAdCpJM%2BQpJQJMITFjrmEGzQocK6aQUhBIuaBYDCC0Q9RcADzRhhAklwACCCp4tGMsLGUShxAUdKFZIIAAh%2BQQACgAGACwAAAAAIAAgAAAH%2F4AAgoOEhYaHiImKi4wCFR0pB4yTggUZChYVlIwIFhsaKBCSm4mdIiULNKMAGBQUD4wYYbCDBElGUJqCFRZSCk4pigZXWjwYgwgUBRUCggddDDAuRkTNiARGRwpBig8jIRISNTwIiQMqEUgDis8MLiZRRauGAg4cQdaJBk4kT8aLBwTMS%2FSAwgBapBIq7DaAgoGBACBOqiAkSpQfHlY9cABB16YHToDAkLABioFBA3ZEaSIxUYUMLsKViEJlUIoTOwi0RGTgBzgJLpR4ZFWhHKkDL6L0EIGixTFDAXcaegDhRw4eQwUJoOBjxBUCJxcJEIAgRQWEg%2BqpWMBlQ5QrYdEPpSiSoGPLCkh6lAinwQiNfIQqjDBSg0GODhAP0EARrnGIHBUOgPFSFAACDhFGlthgIVghBFNqxGgsQQMWBzRUGMEUpAKUnxJ0KOkAdQgD0hJWLJlixESJElxUELHQo%2FGED7QNeXhigonMBRYyyCC9oAUHIy5KwAAyIi4hBEOicJkQIgKUISR0kBZhYcAUKSiMWKCQCMPwGTmmuJqxgvSGFghgQEAXBETGDgYVpFDOAzwssFduUhAwSEALpWDBFhvUoMAQaC0kiH1XcNCBUYoEAgAh%2BQQACgAHACwAAAAAIAAgAAAH%2F4AAgoOEhYaHiImKi4wAB18HjZIADwQ%2BHZGTi0FPKFAVmotEKCEfA4QPBg%2BNj5mCFRZPPBiDFS0NLaCKAh0%2BA64CKRS0ggJDDCYMCQiKBhZbLcSICE5cEhsXq4kPTTtEzIkHBQoRJASuiBgV2ooIlgTshQcCCAIH6Lv26Q4%2BVl0UAkIdejAESwQgKHZ4wLfoAAYMAQEIIBJlhQQJJUTk0NXInYUcPkClsNDjoskIRBgiCoJFxJEtHBAM%2BODC5EUuHFQaOjBkwUUxPwxUaGDCpgQQTSI2JGBERwkQQh48uBKhhEkYChaySjEiCooMDu51QFJjAgwZDKZIa1SBSJcO4OB4nVCBRYUFHwUqKGV0z9CDCgVOfNgSBQeBvYUEVOigNxGCF1GOlIDBRUuHaUR2KMjwDVEKHEdsApkCjtABB1gkH1FQQGWFJzpsirBQIUUQAlRWCfDh8%2BICHqUJVchQ9CKTDSOCXJCC4kMTDAiGVMW4wEfwQQg4MNDBRMLqJiMWwJBgIsqLBx1UbDCxYYnWQ7aiRGBAggMBmia5WDCAoICFJRYQcJ1pFRDAQRMO2KZEbBf1AIUBACBQAQWNLSLAhZHA0kN3JUTAQzwCRVjAEkBwwYAFFIRoCC9XXBCSToQEAgA7AAAAAAAAAAAA) no-repeat center 10px;
	-moz-opacity:.8;
	width:200px;
	height:80px;
	top:250px;
	margin:0 auto;
	right:0;
	left:0;
	-moz-border-radius:10px;
}
]]></r>).toString();
GM_addStyle(cssStyle);

var loadingPic = "data:image/gif;base64,R0lGODlhIAAgAPYAAAAAAP%2F%2F%2FwQEBBwcHCwsLCoqKhAQEAICAggICEZGRpKSkrq6urCwsHZ2digoKAoKCjg4OLKysvr6%2BuDg4B4eHhQUFGBgYFhYWAwMDHR0dOTk5MjIyERERCAgICQkJISEhMLCwtbW1tLS0lZWVoiIiPDw8Nzc3FRUVKioqBISEnh4eN7e3vLy8lJSUuLi4jY2Nujo6PT09NjY2Hp6ejw8PMDAwOzs7IqKimxsbG5ububm5nJyckhISM7OzkJCQmpqary8vCYmJlpaWj4%2BPjQ0NDIyMqSkpNra2nBwcICAgIyMjH5%2Bfvb29kBAQFBQUIKCgmhoaJaWlpSUlEpKSiIiIp6enkxMTE5OToaGhjAwMHx8fKampszMzDo6OhoaGgYGBg4ODhgYGNTU1JycnKCgoBYWFo6OjgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2BGkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAIAAgAAAH%2F4AAgoOEhYaHiImKi4yNjQeGCCkCjoYpBDQFKYMCHDMElYQeKgw1DA1BkAg5QAmhghUfKxK0Jh8VBwcOPBWFFR0PiQIJILTGGwmQALmEKUtGTgiIDxYhxrUW0ocEGyUKBogIFyLXEiEnlIcVz9GIBwQMLNcMRMrqHsGJBiMLGjYuC4RgeFXoAAYPLVSQ2OEDHMFBCCBkIJGBwwAD6Rwx45QggoYSAF%2B8cmDBAoVBAxSUu5GvUYUnE0zscEhgQbkFvRxRMEJLQc4CDMoxyNkIA5QaC0YMBGCgwQRjLnBkbGSACBGHyxwo2GBiA4mTDwtS4HAigQOMYQ89eGEhBy97iZg2uoOAQsYEED82xSVigcZSdSRgGAMyJC6HGi42ZEPUAUUMYyFGKEOAQRtTEiVoRaGCqIKCzLRA%2BAAgoAiSJCdyYlABg0kJKUQLdtSgo8eMAbqMwCjRwwK4d0ZqGJkytdCDBDM%2BWOhwQJwMY0Y8CDrgoUkBy4gEVKiQD4GQI7RKRCcENxQB3bwt%2FE1LmsYMJSbZFxJggLujQAAh%2BQQACgABACwAAAAAIAAgAAAH%2F4AAgoOEgwcVVFQpB4WNjo4PEEkoKEsvD4%2BZjQI0RhoSEhpGEAKapgAVSxOgoBNJFaeFBg4EFQJBRkysoEZBsYIHDg0oDFhNREa7EiW9vwADJKsSOihOSdKgLq%2BCFRWMjwI8G7sTGTwoMKA2W0OlqUkDmQhCIcokFUVaDAwzBAjcUaI4yCTAyjhWK3JgQpAiBYJvAG4FKZWJgpJPEmAwgOBM3osnDCIoSIChYyMMBYYQCUKg1j%2BThDA4MbIAhQVbMAsdGBKhBKgNJyDGQgDBAgGKD35gK0ECk7MORkIogAXgAY6lTTt6iCKDRDwAB5r0lMBiQwuhpxB0MUoRgAEnVZxq3syJFgDKIQQM5NQk4IAADA%2Fq7nXLAQkUf6ceOOR7ZcGKI1GyCB6UwgKJESUfVVCQTsIRKE4dHbDSo0SNJhWjsJqAJHPEtmBHmJDAZUomDDhEMIGxIEGpAwWECCnQtoOSCEu%2BasYRRcoVvQA8SDGxIgoVQhVqmTqAgQJOsDx6gOrBY7LJISBAgRhivmOFHCFzUB2MvUiR%2BfQHBwIAIfkEAAoAAgAsAAAAACAAIAAAB%2F%2BAAIKDhIUAB4aJiokHFUVdQQ%2BLk4YHDksLNUYjFZSeABRPKxISJUAtkgcPGAieDwMFAwgCPkBMpBI6HwMYRBY4Jw4CixhOClsKPBUtXLilUQQnWyImGwovX4m0CyUlOgwJTRHOLk8XESW4LgpUiQYNOrgmOUEqR6QsEU4ZJs4SCxwQFUqRBAYuDRkMVLBghMGHLhWWxHO2ocWwQghOcIkhgQkIJ4gOKMQA4AGUe7hYAPFxsVAFFQt6RMgxQFEXFDbkfeigCEGFJi2GVBBoCMMVIz1CbLhBpJUhBBhCEu1ZwIkQHhSmCsJAQIiQAi09IZilrcmWEDKMQPhUSFW2QQa1VGggpUGLU7YAPEBxYmBQBRLpSim4y5YGil2DEFjg0m2DhbCfKnBoSqgCDiNGLNTEO%2BlACg8OOnEeTdoTBgNaSw86QADJEh%2BSKKUg4CU1oQ5RNMAACLnQgxw1lFCYBGEDKRNQYitKoQBGhCKTgmyBUeLj3QcUhg4ScEUKFNGKHjiJknkzAAwjoiQhQNQnSUoIKATpO8jBuCM53qsmVIBBiSM46LefIAZcoB57AxaCQXaEJUhaIAAh%2BQQACgADACwAAAAAIAAgAAAH%2F4AAgoOEhQcCB4WKi4yCBgRTTRSJjZWFDxdbG0BLBJSWlQdEDCUSEmIZFaCKCGAIgggtYqYSJVEOAhVFEEEPlgMtGRdBAghOIrS2BQQqDAtRLSmNFSobGj1JHQceYzC1GxYvWEemJRFTr4tFC7Q1CQAITQoLDBYePDW0EhpJqosvNZiY2mBF0IEKHSg8ENCihz5bHhhVUGCihIkoBBg1WVDKlIkZ%2FhQdeKHCyJImvhYN0NIjhgQYKDikW3TQQYWZigQ4yGGEgQIhQVLgXLUIQ5AuV3AsyXBlwCcwHQYMtXQAgoIeLkwAQeJvAI4tRloYIAqgAgkX%2BjZcACBgCoiXDLUyEiWQTx8MBfAshBjogywBhw%2FJADhAA8WEIwqCkA0SgYU%2BHUkEpeDRAAeRqY0e5GhpCgaDIYMQpDDwiaiHHQt6bIhyZSxZRge7OJlCAMNrUAdKK6pQIIxuRohAdViyQIEnS0GQJMA86MAVLqcspGyUYIEK17B9RNAB5MpMASlsEwJGRIClFC1ICAkp4EUDCyEFBQeFoMKDTwZUHInQ5fftQQ9YUANG%2F1VCAQcviFcgcP4tWGAgACH5BAAKAAQALAAAAAAgACAAAAf%2FgACCg4SFhoeIiQAYQURBD4qRhQ88UREKPBiSkgcFRjASMFFFB4OlmwgPpwc%2BGxKvQDwCAAgdRUGaiQcOFxZEkAcvESUSJQxdAgYJCgxRIxWJHVg9MlEQpRU%2FQGILFhUIQ1s6oQtWkIdDNa89FucVHBZN0Bg%2FMq8SKzPQhgdEwxIbTpwTdAqAgRxH7rl4MgBRCgsoIjToULAQAh4LSjApAUJILn4ViNAYUNFQBQsMNkTYQVHRgZKHBFR4YYUHgQEYYG4CmWDHEgsEEBR6uXMQghYoTGgQoYDAqQdELFjZt7ODEWKvTGRIAWCXAjEgLgyUBKHHvWJGOnSFsECCCxVcyHcScXWvRBQqgjwkqcFgitCdA6KMeyUGSS4BHXy8MFCUVoIqXEKASFKg4AEBOhEdMBAEQgsoP1oEmdWYEAICOaKgUGDBQc7ShYJgEfEKxgIhcQ8d6PDCS2YEFjYwuSeKAGlDHT4sQEK1kAEtg%2B%2BBsHK8EIEtExSoPZRiSfRXNaZUJ1Thwo1MhAS8Bs7lrA4jpBI9%2BJb%2BBVBBQZ70sFFCQwTcpT0AkROlCFAADlEYocAJze0kgH0OmFKBAwVQ8FFpAqgC24YcdhgIACH5BAAKAAUALAAAAAAgACAAAAf%2FgACCg4SFhoeIiYIHD1%2BKj4cYL0JTFAKQmAddRj1AOQOYkA9QJhIlW0QHgweqkAeXgw8WMqZGBKoHFC9EFa2IBl1XQbACRWYgDBYVAAcESgsRM0G%2BhQIJWyBJHoMIDlMQvQApSLQSG0IYiBgNExILPtSFFAolEhIrWsuHCC0RPQq3ElVoUIoFF2UCr1jo8kARAghSNtTAQgDWoQMIMFhM9IDAFR4OGobKxOrBg40jESEIcuXECwOEDmCogCAlAAEQonDpkQwmswpCZjQRGWrAk3amUEAQhGAIChkfQI0kgKKevR4nBhFQEAGKvlBBolhlAoIHtwJdpI5MIQSIDhgiyT50KBTP1QMPFqJE2VGkps1BAgb4GNGiCwECFVCmPBAkw4IeIG4wfFS3UAoLG%2BxJCJFkrkAeBPwCAFNg14AvBaLA0CwhwpDKN4cwyFCGGYUfDLiAUJCgSVXWC5rAZoxkCoYDFTBrnmDkwo0VmmFEIaDoQIqGOH9rlpGhRZUjOiZEuJAilAAeNVhLgIHFwZAdCpJM%2BQpJQJMITFjrmEGzQocK6aQUhBIuaBYDCC0Q9RcADzRhhAklwACCCp4tGMsLGUShxAUdKFZIIAAh%2BQQACgAGACwAAAAAIAAgAAAH%2F4AAgoOEhYaHiImKi4wCFR0pB4yTggUZChYVlIwIFhsaKBCSm4mdIiULNKMAGBQUD4wYYbCDBElGUJqCFRZSCk4pigZXWjwYgwgUBRUCggddDDAuRkTNiARGRwpBig8jIRISNTwIiQMqEUgDis8MLiZRRauGAg4cQdaJBk4kT8aLBwTMS%2FSAwgBapBIq7DaAgoGBACBOqiAkSpQfHlY9cABB16YHToDAkLABioFBA3ZEaSIxUYUMLsKViEJlUIoTOwi0RGTgBzgJLpR4ZFWhHKkDL6L0EIGixTFDAXcaegDhRw4eQwUJoOBjxBUCJxcJEIAgRQWEg%2BqpWMBlQ5QrYdEPpSiSoGPLCkh6lAinwQiNfIQqjDBSg0GODhAP0EARrnGIHBUOgPFSFAACDhFGlthgIVghBFNqxGgsQQMWBzRUGMEUpAKUnxJ0KOkAdQgD0hJWLJlixESJElxUELHQo%2FGED7QNeXhigonMBRYyyCC9oAUHIy5KwAAyIi4hBEOicJkQIgKUISR0kBZhYcAUKSiMWKCQCMPwGTmmuJqxgvSGFghgQEAXBETGDgYVpFDOAzwssFduUhAwSEALpWDBFhvUoMAQaC0kiH1XcNCBUYoEAgAh%2BQQACgAHACwAAAAAIAAgAAAH%2F4AAgoOEhYaHiImKi4wAB18HjZIADwQ%2BHZGTi0FPKFAVmotEKCEfA4QPBg%2BNj5mCFRZPPBiDFS0NLaCKAh0%2BA64CKRS0ggJDDCYMCQiKBhZbLcSICE5cEhsXq4kPTTtEzIkHBQoRJASuiBgV2ooIlgTshQcCCAIH6Lv26Q4%2BVl0UAkIdejAESwQgKHZ4wLfoAAYMAQEIIBJlhQQJJUTk0NXInYUcPkClsNDjoskIRBgiCoJFxJEtHBAM%2BODC5EUuHFQaOjBkwUUxPwxUaGDCpgQQTSI2JGBERwkQQh48uBKhhEkYChaySjEiCooMDu51QFJjAgwZDKZIa1SBSJcO4OB4nVCBRYUFHwUqKGV0z9CDCgVOfNgSBQeBvYUEVOigNxGCF1GOlIDBRUuHaUR2KMjwDVEKHEdsApkCjtABB1gkH1FQQGWFJzpsirBQIUUQAlRWCfDh8%2BICHqUJVchQ9CKTDSOCXJCC4kMTDAiGVMW4wEfwQQg4MNDBRMLqJiMWwJBgIsqLBx1UbDCxYYnWQ7aiRGBAggMBmia5WDCAoICFJRYQcJ1pFRDAQRMO2KZEbBf1AIUBACBQAQWNLSLAhZHA0kN3JUTAQzwCRVjAEkBwwYAFFIRoCC9XXBCSToQEAgA7AAAAAAAAAAAA";
healthImg = find('.//img[contains(@src,"images/leftside/healthometer")]');
var prefPanel,loadingDiv, loadingSpan, textNode;
var enable_cache = GM_getValue("usecache");
var doing_retry = false;

if(enable_cache == undefined) {
	enable_cache = true;
	GM_setValue("usecache", true);
}

//enable_cache = false;

if(healthImg) {
	var openEventListeners = new Array();
	var h_button;

	h_button = document.createElement('input');
	h_button.type = "button";
	h_button.style.visibility = "hidden";
	h_button.setAttribute("accesskey", "h");
	addEventListener(h_button, 'click', checkHealthItem, false);
	document.lastChild.insertBefore(h_button, document.lastChild.lastChild.nextSibling);

	addEventListener(window, 'unload', destroyEventListeners, false);
	healthImg.style.cursor="pointer";
	addEventListener(healthImg,'click',checkHealthItem,false);
	addEventListener(healthImg,'contextmenu',getPrefData,false);
	
	if((window.location.href.indexOf('/index.php?p=monsters&a=') > -1) || (window.location.href.indexOf('/index.php?p=quests') > -1) || /daily_maze$/.exec(window.location.href)) {
		GM_setValue("lastarea", window.location.href);
	}
}
function getPrefData(e) {
	if(loadingDiv) {
		document.body.removeChild(loadingDiv);
		loadingDiv = undefined;
	}
	showLoading("Reading Inventory");
	GM_get('/index.php?p=inventory&a=consumables',parseConsumables);
	GM_setValue("healthItemIds", "");
	e.preventDefault();
	e.stopPropagation();
	var itemNames = new Array();
	function parseConsumables(txt) {
		var jsArray = /var med_items = {\n((?:\s.*\n)*)\s*};/.exec(txt);
		if(jsArray) {
			jsArray=jsArray[1].split('\n');
			for(var i=0,l=jsArray.length;i<l;i++) {
				var str = jsArray[i];
				var r = /\s*\d+ : "(.*) \((\d+)\)"/.exec(str)
				if(r) {
					itemNames.push([r[1],r[2]]);
				}
			}
		}
		var specialConsumables=["Alien Gazing Ball"];
		var execString = specialConsumables.join("|");
		var reg=new RegExp("option value=\"\\d+\">("+execString+") \\((\\d+)\\)<\/option","g");
		while(y=reg.exec(txt)) {
			itemNames.push([y[1],y[2],true]);
		}
		itemNames.sort(sortByName);
		showPrefs(itemNames);
	}
}
function sortByName(a,b) {
	var x=a[0].toLowerCase();
	var y=b[0].toLowerCase();
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
function showLoading(string) {
	if(!loadingDiv) {
		loadingDiv = document.createElement('div');
		loadingDiv.className = "loading";
		
		loadingSpan = document.createElement('div');
		loadingSpan.className = "loadingSpan";
		if(!string)string="";
//		loadingSpan.appendChild(document.createTextNode(string));
		loadingSpan.appendChild(document.createElement('p'));
		loadingSpan.firstChild.innerHTML = string;
		
		loadingDiv.appendChild(loadingSpan);
		
		document.body.appendChild(loadingDiv);
	} else {
		updateLoading(string);
	}
	loadingDiv.style.display="block";
}
function updateLoading(str) {
//	loadingSpan.firstChild.nodeValue = str;

	loadingSpan.firstChild.innerHTML = str;
}

function hideLoading() {
	loadingDiv.style.display="none";
}


function showPrefs(array) {
	if(!prefPanel) {
		prefHolder = document.createElement('div');
		prefHolder.className = "prefOverlay";
		prefTitle = document.createElement('div');
		prefTitle.className = "titleBar";
		var closeIcon = document.createElement('div');
		closeIcon.appendChild(document.createTextNode('X'));
		closeIcon.className = "closeIcon";
		addEventListener(closeIcon,'click',hideOverlay,false);
		
		prefTitle.appendChild(closeIcon);
		prefTitle.appendChild(document.createTextNode('Change Health Item'));

		prefPanel = document.createElement('div');
		prefPanel.className="pref";
		prefPanel.appendChild(prefTitle);
		
		var prefContent = document.createElement('div');
		prefContent.className="prefContent";
		
		prefPanel.appendChild(prefContent);
		
		prefHolder.appendChild(prefPanel);
		
		prefLabel1 = document.createElement('label');
		prefLabel2 = document.createElement('label');
		prefLabel3 = document.createElement('label');
		
		prefLabel1.appendChild(document.createTextNode('Item 1:'));
		prefLabel2.appendChild(document.createTextNode('Item 2:'));
		prefLabel3.appendChild(document.createTextNode('Item 3:'));
		
		prefSelect1 = document.createElement('select');
		addEventListener(prefSelect1,'change',changeHealthItem,false);
		
		prefSelect2 = document.createElement('select');
		addEventListener(prefSelect2,'change',changeHealthItem,false);
		
		prefSelect3 = document.createElement('select');
		addEventListener(prefSelect3,'change',changeHealthItem,false);
		populateSelect(array);
		
		prefContent.appendChild(prefLabel1);
		prefContent.appendChild(prefSelect1);
		prefContent.appendChild(prefLabel2);
		prefContent.appendChild(prefSelect2);
		prefContent.appendChild(prefLabel3);
		prefContent.appendChild(prefSelect3);
		
		
		hideLoading();
		document.body.appendChild(prefHolder);
	} else {
		if(array.length!=0) {
			removeChildNodes(prefSelect1);
			removeChildNodes(prefSelect2);
			removeChildNodes(prefSelect3);

			populateSelect(array);
			
			hideLoading();
			showOverlay();
		}
	}
	if(array.length==0) {
		//no data
		var textNode = prefContent.appendChild(document.createTextNode('No restorers avalable'));
	} else {
		if(textNode)textNode.parentNode.removeChild(textNode);
	}
}
function populateSelect(array) {
	//var current=GM_getValue('healthItem','First Aid Kit');
	var selects=new Array(prefSelect1,prefSelect2,prefSelect3);

	var opth1 = document.createDocumentFragment();
		
	var current=eval(GM_getValue('healthItems','[]'));
	
	var firstOption = document.createElement('option');
	firstOption.text="------";
	firstOption.value=0;
	
	opth1.appendChild(firstOption);
	
	for(var i=0,l=array.length;i<l;i++) {
		var str=array[i][0];
		var num=array[i][1];
		var opt = document.createElement('option');
		opt.value=str;
		opt.text=str+" ("+num+")";
		if(array[i][2])opt.setAttribute('usable',1);
		opth1.appendChild(opt);
	}
	var opth2=opth1.cloneNode(true);
	var opth3=opth1.cloneNode(true);
	
	prefSelect1.appendChild(opth1);
	prefSelect2.appendChild(opth2);
	prefSelect3.appendChild(opth3);
	
	for(var x=0;x<3;x++) {
		var cur = current[x];
		for(var i=0,l=array.length;i<l;i++) {
			if(array[i][0]==cur) {
				selects[x].selectedIndex=i+1;
				break;
			}
		}
	}
}
function hideOverlay(e) {
	prefHolder.style.display="none";
}
function showOverlay(e) {
	prefHolder.style.display="block";
}
function changeHealthItem(e) {
	var selects = new Array(prefSelect1,prefSelect2,prefSelect3);
	var healthItems = new Array();
	var healthItemsUsable = new Array();
	
	for(var i=0,l=selects.length;i<l;i++) {
		var item=false;
		var usable=false;
		var sel=selects[i];
		if(sel.value!=0) {
			item=sel.value;
			usable=(sel.options[sel.selectedIndex].getAttribute('usable')==1);
		}
		healthItems.push(item);
		healthItemsUsable.push(usable);
	}
	GM_setValue('healthItems',healthItems.toSource());
	GM_setValue('healthItemsUsable',healthItemsUsable.toSource());
	//GM_log('health items: '+healthItems.toSource());

	//show some sort of verification;
}
function checkHealthItem(e) {
	if(healthImg.alt=="You are in perfect health") {
		alert('You are in perfect health.');
	} else {
		var id_cache = GM_getValue('healthItemIds', "");
		var item_ids = new Array();
		var split_cache;
		var items=eval(GM_getValue('healthItems', '["First Aid Kit"]'));
		var total_items = 0;
		var found_in_cache = 0;
		var turns_since_recheck;
		var recheck_turns_threshold;
		var recheck = false;

		if(loadingDiv) {
			document.body.removeChild(loadingDiv);
			loadingDiv = undefined;
		}

		turns_since_recheck = GM_getValue("turnsSinceRecheck", 0);
		turns_since_recheck++;
		recheck_turns_threshold = GM_getValue("recheckTurnsThreshold", 25);
		if(turns_since_recheck >= recheck_turns_threshold) {
			turns_since_recheck = 0;
			recheck = true;
		}
		GM_setValue("turnsSinceRecheck", turns_since_recheck);
		GM_setValue("recheckTurnsThreshold", recheck_turns_threshold);

		split_cache = id_cache.split(",");
		for(var i = 0; i < split_cache.length; i++) {
			var re;
		
			if(re = /^\s*(.*)=(\d+)\s*$/.exec(split_cache[i])) {
				item_ids[re[1]] = re[2];
			}
		}
		for(var i = 0; i < items.length; i++) {
			if(items[i]) { /* some of the items can be false, so we'll ignore those */
				total_items++;
				if(item_ids[items[i]]) {
					found_in_cache++;
				}
			}
		}
		if(enable_cache && (found_in_cache == total_items) && !recheck) { /* call fillHealth with some html of just the item ids */
			var html = "";
			for(var i = 0; i < items.length; i++) {
				html += 'option value="' + item_ids[items[i]] + '">' + items[i] + "\n";
				html += item_ids[items[i]] + ' : "' + items[i] + "\n";
			}
			showLoading("Got items from cache");
			fillHealth(html, true); /* second argument to indicate it's using cached values */
		}
		else {
			if(doing_retry) {
				showLoading("Rechecking Item Numbers");
			} else {
				showLoading("Getting Item Numbers");
			}
			GM_get('/index.php?p=inventory&a=consumables',fillHealth);
		}
	}
}
function fillHealth(txt) {
	//var itemNumber =  /([0-9]{1,11}) : "First Aid Kit/.exec(txt);
	healthItems=eval(GM_getValue('healthItems','["First Aid Kit"]'));
	healthUsable=eval(GM_getValue('healthItemsUsable','[false,false,false]'));

	var item_ids = new Array();
	var none_usable = false;
	var var_values = new Array();
	var invnum = 0;
	var post_string
	var find_multiple = false;
	var used_cache = (arguments.length == 2 ? true : false);
	
	if(!healthUsable[0] && !healthUsable[1] && !healthUsable[2]) {
		none_usable = true;
	}
	

	//prevent duplicates
	var usedNames = new Object();
	
	var searches = new Array();
	for(var i=0,l=Math.min(healthItems.length,3);i<l;i++) {
		var name = healthItems[i];
		var usable=healthUsable[i];
		if(!healthItems[i]) {
			searches.push(false);
		} else {
			if(usable) {
				var reg=new RegExp("option value=\"(\\d{1,11})\">"+name);	
			} else {
				var reg = new RegExp('([0-9]{1,11}) : "'+name);
			}
			searches.push(reg);
		}
	}
	
	var index=0;
	var resultsString = "Filling Health:";
	
	var itemName,currentSearch,usable;

	tryFill();
	//first fill
	
	function tryFill() {
		itemName=healthItems[index];
		usable=healthUsable[index];
		currentSearch=searches[index];

		if(index>=searches.length) {
			//GM_log("index>searches.length");
			if(none_usable) {
				var full_post = var_values.join("&") + "&action=Consume Item(s) >>>";

				if(var_values.length > 1) {
					updateLoading("Using " + var_values.length + " items");
				}

				none_usable = false; /* prevent this from running again */
				find_multiple = true;
				GM_post("/index.php?p=inventory&a=consume", full_post, parseFill);
				return;
			} else {
				done();
			}
			return;
		}
		if(!currentSearch) {
			//GM_log("false item");
			next();
			return;
		}
		if(usedNames[itemName]) {
			//GM_log("already did this one");
			next();
			return;
		} else {
			usedNames[itemName]=1;
		}
		var itemNumber = currentSearch.exec(txt);
		if(!itemNumber) {
			//GM_log("Item not found");
			resultsString+="\n"+itemName+" not found";
			next();
			return;
		}
		itemNumber=itemNumber[1];
		item_ids[itemName] = itemNumber;
		updateLoading("Using "+itemName);
		
		if(none_usable) {
			var_values.push("med_inv[" + invnum + "]="+itemNumber);
			invnum++;
			next();
		} else if(!usable) {
			GM_post("/index.php?p=inventory&a=consume","med_inv[0]="+itemNumber+"&action=Consume Item(s) >>>",parseFill);
		} else {
			GM_post("/index.php?p=inventory&a=use","inv[]="+itemNumber+"&action=Use It&qty=1",parseFill);
		}
	}
	function next(txt) {
		if(txt&&txt.indexOf('You are in perfect health')!=-1) {
			//GM_log('perfect health stop');
			done();
		} else {
			index++;
			tryFill();
		}
	}
	function done() {
//		hideLoading();
		if((enable_cache && !used_cache) || doing_retry) {
			var cs = new Array();
			
			for (var item in item_ids) {
				cs.push(item + "=" + item_ids[item]);
			}
			GM_setValue("healthItemIds", cs.join(", "));
		}
		updateLoading(resultsString);
//		showLoading(resultsString);
	}
	function parseFill(txt) {
		
		if(find_multiple) {
			var pos = 0;
			var results;
			var items_used = 0;
			var h;
			var mainforms;
			var hide_div = true;

			resultsString = "Healed\n";
			
			while(results = /Taking (\d+) (.*?)\.<br> (?:Poor you, )?Now you have ([\w,]+)\./i.exec(txt.substr(pos))) {
				var pos = txt.indexOf(results[0]) + 1;
				
				if(pos <= 0) { /* I don't think this will ever happen, but just in case */
					resultsString += "\n<br><br>Error: Could not parse results properly";
					break;
				}
				var usedNum = results[1];
				var what = results[2];
				var left = results[3];
				if(left=="none")left=0;
				//GM_log('success');
				resultsString+="\n<br><br>Used "+usedNum+" "+what+" ("+left+" remaining)\n";
				items_used++;
			}
			if(items_used == 0) {
				resultsString += "<br><br>No items used";
				h = 80
			} else {
				h = 50 + (items_used * 30); /* approximate */
			}
			updateHealth(txt);

			if(window.location.href == "http://www.secretsocietywars.com/index.php?p=monsters") {
				mainforms = document.evaluate('//td[@class="main"]//form', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				
				if(mainforms.snapshotLength == 0) {
					var lasturl = GM_getValue("lastarea");
					
					if(lasturl) {
						var s = "Accost Another Stranger";
						
						if(lasturl.indexOf('daily_maze') > -1) {
							s = "Go back to the Maze.";
						}
						resultsString += '<br><br><form action="' + lasturl + '" method="post"><input type="submit" name="submit" value="' + s + '" accesskey="m" style="-moz-opacity:1.0"></form>';
						h += 30;
						hide_div = false;
					}
				}
			}


			if((items_used == 0) && !doing_retry && enable_cache) { /* doing_retry is redundant since doing_retry implies !enable_cache */
				var current_health;
				var max_health;
				var recheck_threshold;
				var pattrs;
				
				recheck_threshold = GM_getValue("recheckHealthThreshold", 5);
				GM_setValue("recheckHealthThreshold", recheck_threshold);
				pattrs = document.evaluate('//td[@class="pattrR1"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if(pattrs.snapshotLength > 0) {
					var hp_cell = pattrs.snapshotItem(0);
					var re;
					
					if(re = /(\d+)&nbsp;\/&nbsp;(\d+)/.exec(hp_cell.innerHTML)) {
						var hp = re[1];
						var maxhp = re[2];
						
						if((maxhp - hp) >=  recheck_threshold) {
							doing_retry = true;
							enable_cache = false;

							checkHealthItem();
							/* should return to prevent the loadingDiv from changing */
							return;
						}
					}
				}
			}


			if(loadingDiv) {
				loadingDiv.style.background = "black";
				loadingDiv.style.height     = h + "px";
				if(items_used > 0) {
					loadingDiv.style.width    = "400px";
				}
				loadingDiv.style.verticalAlign = "top";
				if(hide_div) {
					loadingDiv.addEventListener('click', hideLoading, false);
				}
			}
			done();

			return;
		}
				
			
		if(!usable) {
			//GM_log('parsing unusable');
			//parsing different for health items vs. usable inventory
			var results = /Taking (\d+) (.*)\.<br> (?:Poor you, )?Now you have (\w+)\./i.exec(txt);
			if(results) {
				var usedNum = results[1];
				var what = results[2];
				var left = results[3];
				if(left=="none")left=0;
				updateHealth(txt);
				//GM_log('success');
				resultsString+='\nUsed '+usedNum+' '+what+' ('+left+' remaining)';
				next(txt);
			} else {
				if(txt.indexOf('(health limit)')!=-1) {
					//GM_log('health limit');
					resultsString+='\nCould not use '+itemName+' (health limit)';
				} else {
					//GM_log(txt);
					resultsString+="\n"+itemName+' unavailable.';
				}
				next();
			}
		} else {
			//usable menu.
			//GM_log('parsing usable');
			var results = /Taking (\d+) (.*)\.<br> (?:Poor you, )?Now you have (\w+)\./i.exec(txt);
			if(results) {
				var usedNum = results[1];
				var what = results[2];
				var left = results[3];
				if(left=="none")left=0;
				updateHealth(txt);
				resultsString+='\nUsed '+usedNum+' '+what+' ('+left+' remaining)';
				next(txt);
			} else {
				if(txt.indexOf('Tricky, but I thought of that')!=-1) {
					resultsString+='\n'+itemName+' unavailable.';
					next();
				} else if (txt.indexOf('to yourself more than once per day') !=-1) {
					resultsString+='\n'+itemName+' used up for the day.';
					next();
				} else if (txt.indexOf("You're not horny enough")!=-1) {
					resultsString+='\nCould not use '+itemName+' (not horny enough).';
					next();
			} else if (txt.indexOf("You are not attuned to its power at the moment")!=-1) {
					resultsString+='\n'+itemName+' used up for the day.';
					next();
				} else if (txt.indexOf("You use the "+itemName)!=-1) {
					//debug(txt);
					resultsString+='\nUsed '+itemName+' successfully.';
					updateHealth(txt);
					next(txt);
				} else {
					//debug(txt);
					resultsString+='\nUsing '+itemName+' failed.';
					next();
				}
			}
		}
	}
}
function debug(txt) {
	var tempDiv = document.createElement('div');
	tempDiv.style.border="2px dashed red";
	unsafeWindow.info = txt;
	var bodytxt = /<body\s*>([\s\S]+)<\/body>/i.exec(txt)[1];
	
	
	tempDiv.innerHTML = bodytxt;
	var scripts = tempDiv.getElementsByTagName('script');
	for(i=scripts.length-1;i>=0;i--) {
		scripts[i].parentNode.removeChild(scripts[i]);
	}
	GM_log('div html '+tempDiv.innerHTML);

	document.body.appendChild(tempDiv);
}

function updateHealth(txt) {
	var tempHolder=document.createElement('div');
	var new_health;
	var health_cell;
	var re;
	
	tempHolder.innerHTML = txt;
	//also change Health/HP table cells
	var newImg = find('.//img[contains(@src,"images/leftside/healthometer")]',tempHolder);
	if(newImg) {
		healthImg.src=newImg.src;
		healthImg.title=healthImg.alt=newImg.title;
		healthImg.alt=healthImg.alt=newImg.alt;
	}
	var healthXP = './/tr[td/img[contains(@src,"images/ic_health_10.gif")]]/td[2]'
	var oldHealthData = find(healthXP);
	var newHealthData = find(healthXP, tempHolder);
	if(oldHealthData && newHealthData) {
		oldHealthData.firstChild.nodeValue = newHealthData.firstChild.nodeValue;
	}
	if(re = /<td[^>]+class="pattrR1"[^>]*>\s*([^<]+)/i.exec(txt)) {
		new_health = re[1];
		if(health_cell = find('//td[@class="pattrR1"]', document)) {
			health_cell.innerHTML = new_health;
		}
	}
}

//Utility functions
function addEventListener(target, event, listener, capture) {
	openEventListeners.push( [target, event, listener, capture] );
	target.addEventListener(event, listener, capture);
}
function destroyEventListeners(event) {
	for (var i = 0, l=openEventListeners.length; i<l; i++)     {
		var rel = openEventListeners[i];
		rel[0].removeEventListener(rel[1], rel[2], rel[3]);
	}
	window.removeEventListener('unload', destroyEventListeners, false);
}

function GM_post( dest, vars, callback, external) {
	var theHost = (external)?"":document.location.host;
	if(GM_getValue('debug',false)){ 
		GM_log("dest " + dest);
		GM_log("var " + vars);
		GM_log("fn: "+callback.name);
		GM_log("caller "+GM_post.caller.name);
	}
	 GM_xmlhttpRequest({
	    method: 'POST',
	    url: 'http://'+theHost + dest,
	    headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: vars,
			onload:function(details) {
				if( typeof callback=='function' ){
					callback( details.responseText);
				}
			}
	});
}
function removeChildNodes(parent){
  while(parent.hasChildNodes()){
  	parent.removeChild(parent.lastChild)
	}
}
function GM_get( dest, callback, external) {
	var theHost = (external)?"":document.location.host;
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+ theHost + dest,
		onload:function(details) {
			if( typeof callback=='function' ){
				callback(details.responseText);
			}
		}
	});
}

function find(xp,location) {
	if(!location)location = document;
	var temp = document.evaluate(xp, location, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	return temp.singleNodeValue;
}
