// Copyright (c) 2008, Mike Wilt :: mikewilt [at] gmail.com
//
// ==UserScript==
// @name          Emoticons for Gmail
// @namespace     http://www.room117.com
// @description	  Converts text to emoticons in Gmail.
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

window.addEventListener('load', function() {  
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', function(gmail) {


/* ******************************************* */
/*											   */
/* Begin code after initiating function(gmail) */
/*											   */
/* ******************************************* */



/* Get pointer to Gmail's content window */
var win = window.top.document.getElementById('canvas_frame').contentWindow;


/* Embed emoticons as data files.

	Comment:
		
		- Conversion by: http://www.sveinbjorn.org/dataurlmaker
		- Suggest animating emoticons to mimic behavior of emoticons in google chat.  I.e., animate emoticon occasionally so
		  it seems like it's occasionally "looking" at the user
		- All known square Gmail emoticons are below.  Special thanks to tk @ http://tkhere.blogspot.com/2007/12/brand-new-google-chat-emoticons-no-one.html
		- Would like to offer options to display classic and circular emoticons 
	
*/
var smileSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAERUExURf/sgv/mZNWiKJ+fn//xn82UHP/1vP/52Q8PD//+9fziYP/yqf/ujP/zsvuhLv/tg29vb/ujM/27ceG2OuG2OfulMPukMtDBVvuiLP/seejCRP/jYbCdQ/uiMv27b/ujNKCOPZCBN+zISSAdDe/v7zAsE/uiM//vlfTVVeS8P7+yaf/58/DWW4+Pj//iYPy2NsCwTvDbYaCPPU9PT//48F9fX/uhMf/iYUA5GIByMfyzM/y3aJCEOv/47//sau/lrOjCRf/27MWHEv25bODOWv2/d7CiR/21NfukNPulNP/raf2+dnBkK/24Of24af/qZ/uiMPukM/uhLPukMP/jYv/lY//kYv/pZ//oZgAAAP///9XL2twAAADdSURBVHjaYtB2leULAAM+MyFbgABi8LbSM7JU0JGx8FE013cGCCAGQWnxSGU3fxcDG1XxUA+AAGKQCDPUsueNiFDnZQhnFAUIIIagkHBOZmYGBmZdzvDQYIAAAnL5ozgiubk5IlX4Q4MBAgjIlYwSMGVhETCOkgwNBgggkGIedraICDZ2HqBigAACcSMgQArIBQggEJdJA8RTYgVyAQIIaFE4FxOTiAirExfQIoAAYlALsQsPdxAW1gwP92L0BAggBiH3sNAwMAgN87UGCCAGEzl5sUAwEBP0cwQIMACMqSpH1j9VNgAAAABJRU5ErkJggg==';

var frownSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAERUExURf/yqf/52Z+fn//mZPuiMPDPUMKCDP/xn+yZLfukMm9vb//1vP/sef27cf/sav/qZ/uiLPulMP/jYQ8PD/ujMxAPBvuhLv/+9YB1NP/iYEA5GJCEOkA7GuS7PvyzM4B3Nf/tg/27b/DWW/24OdmoLf///29tZfziYPuhMfTVVeDOWt/f3//ujf21Nfy3aE9PT/uiM//iYSAcDPulNP24acCsSv2/d+/hj+jCRN/NY//raV9fX9C5T+/v7//27P/47//zsv/58/25bPukNI+Pj35RGPuiMv/48NC+VPy2NsCrSfujNP2+dt/ObMCwTt2vM//sgtGcI/ukM/uhLPukMP/jYv/lY//kYv/oZv/pZwAAAJcdjF4AAADgSURBVHjaYnA0cxPjcOVgYWER0+C1BwggBh85SVMjKSUbL6FwQ08ngABiEBGSF5Xm5/cTldHiC3MGCCAGgXAPXwaHiAhztSgJZkGAAGIIDo1kZGIKCGBy0bYMCwEIICBXQVU4ioFBOMpWJywEIICAXB5xLmt2di59cZ6wEIAAAikOYOSOiOBmDIgMCwEIIBA3QjYQCPwjgFyAAAJz2QItWFXYWIFcgAACWhQZwRoBBJrqkcyCAAHEYBDKFwkFVszGAAHEwKsbHhYOBmHhynoAAcTgrujNGQQGnCImdgABBgCrsypUrpVonQAAAABJRU5ErkJggg==';

var winkSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEFUExURc2UHP/mZP/sgv27cfuiLPulMPukMv/yqT85GPuhLp+fn/ziYP/nZNWiKOG2OgAAAP/oZf/seejCROG2OV9fX//52ezISb+tSvujM/uhMf2/d/2+dvukNP/tav/zsvuiM//reW9lK/y3aPuiMujCRcCyUPy2Nv27b//iYPf398+9W6+eRP24Of/1vFBJIP/sav/raf/xn+S8P//mYv24aWBWJUA5GP21NQ8PD//+9f/oZM+7UP/qcPDWW/ujNP/478WHEvDcYfulNP/iYWBVJf/tg//48P/27P/58/25bPyzM//jYf/nY//qZ/uiMPukM/uhLPukMP/jYv/lY//kYv/oZv/pZ+LNbCgAAADZSURBVHjaYvCQUub0AwNOSWZ7gABikPbSCPH29rZ1MTN1VvMECCAGCW9ZXxBw1ONXDZYBCCAGlpAwAWMfq1A5doUwRlaAAGIICArzAQImLi7RsOBAgAACcm0UOTi02fktNF2DAwECCMgV1BIXtzYUEbEUDA4ECCCQYgEentBQXVEmoGKAAAJxxULBQAjIBQggEJdBCMQTYwByAQIIZBE3L6+wMIMDN9AigABikA/SDwtT4eMzCgszYHQCCCAGZvOQ4BAwCA7RUQIIIAY3dTs2fzBgkzBxBwgwABKdKhi7plh9AAAAAElFTkSuQmCC';  

var devilSource ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABgUExURbpfX/9zMz8TAKsuJv+xj/+QX2JeXP9cD9eEX3sZB+I9BNNAAasrBdeiouNCAq8iEf9nH//Tv+bExMovCPv28/ZJAPdJAYYYCc0xCM4xB7RMSbQuHf9SAP9OAAAAAP///18l6fAAAAAgdFJOU/////////////////////////////////////////8AXFwb7QAAAM5JREFUeNpi4BWShwMhXoAAYpBiZpCCAgZmKYAAYmDm4uITFQMCUW4uLmaAAGJg4OKW45YFAiDFxQAQQAzywjJsckw8nExybOzC8gABxCAvySgiJ8fBIScnwighDxBAQK6ACBsbKysbm4iAhDxAAAG5MoyCLLKyLIKMMhLyAAEE4vLIggEPkAsQQCCuOI+orKwojziQCxBAIK6oOKc4EInKSMoDBBCDvISMrCwfNzefrCxQFiCAGOT5xWShQIxfHiCAGOR5maWhgJlXHiDAAEbuEBenC45XAAAAAElFTkSuQmCC';

var monkeySource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAMAAAAVBLyFAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABgUExURfLOrGpMOqysrIt0YX13cYl7cjQyMK+KcBEPDUZFRF9fX09OTdKsiks8L4NrVHNva+/AlNDQ0MDAwJKPjXdfSfbex+Dg4CAdGyolIPXx7T8+PYCAgOOgff///wAAAP///8RL88EAAAAgdFJOU/////////////////////////////////////////8AXFwb7QAAAQlJREFUeNpikAcBSSFpfmlhITBbHiCAGEAEE4ecnBSbHIe4IIgHEEAgIUE5OV4RdnYRXjk5kBhAADFICkuL8/GJMggIMIgyi3BIC8oDBBCDmJwcn4CsrCwDg6yspAAbB5s8QAAxcElw8DDIinOJSopzyQqwc4gzAQQQgxSzuLCApLg4PwuHlCSPtJyINEAAMUixi0tL84ozAgEHr7S0HKMwQAAxCEuIS7OJy4AAOwcnv5yEGEAAMcjzy3ExM8qBATsrt5yQPEAAAd0lxCHBCFYlw8jPISYvDxBAIKdySUlwAI3iBfpAGsgFCCCwh7jEOaWkpDi55bhAPIAAAgvJM0mBjOJmAnMAAgwAuqQUrWI2M2QAAAAASUVORK5CYII=';

var pigSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAMAAAD+MweGAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABgUExURV4qI7NiV+jj46ZVSqGgoMSRite1sYU/Nf/At7NxZ/WhldSDd5lLQNV6bebMyXdRTPfa1sp2auyUiOONgZJhWsFrXzEYFa+CfPGZjfn0882inOKCdP+nmwAAAP///////+YW6QoAAAAgdFJOU/////////////////////////////////////////8AXFwb7QAAAQxJREFUeNpikGeTkpLi45NilWIDsdjkAQKIgVVUSIaRQYyBl4eBnZlLhksKIIAYGLlkRBlk+UVkuPnFGBhlZAQBAohBkpObWURcgENGhoNPRFSQSxIggBjkBXiEOeTkJGUE5OQEuJj55AECCCQiI8Aky8IBxJIyvGzyAAHEIM/HKMPBJMbPKS7GIiAjLCUPEEBgERlOdmZmZnZxGZAIQAAxyDMxy3CzM0pLSzOyc8tws8kDBBCDvDyzBBcvO1CEnVdCRpRJHiCAgCKsosK8YDWCwkKc8vIAAQQUkRTnYecFivCyM3IKyMsDBBBQRF6SlZ0BaDIDDyNQQB4ggEAi8kD72NnZeVglQWyAAAMAzPQQTxPuQS4AAAAASUVORK5CYII=';

var heartSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABUUExURV8AAB8AAD8AAGBgYN8AAH8AABAQECAgIKCgoI8AAJ8AANDQ0HBwcJCQkPDw8K8AAA8AALCwsE8AAMDAwO8AAL8AAFBQUODg4EBAQAAAAP8AAP///9TcU7cAAAAcdFJOU////////////////////////////////////wAXsuLXAAAAvElEQVR42mKQBgNuYWFxEA0QQAzS0mISYuJskpLsfEAuQAAxSPMysTKwc0mxMDEDuQABxCAtxiLFIikiJcUvAeQCBBCDNLOolBQQSXGJAbkAAcQgLcwkBQIiAoJALkAAAY2SAMlJsYIkpQECCMjlEAJxGcEWAQQQkCsuCdItAbYfIICAXGlmBikpBg4wFyCAQFxxSRERNojrAAIIxJWW4OTkgXABAgjMFWaEGCQtDRBAYK60BMQgaWmAAAMAytsRJB281W8AAAAASUVORK5CYII=';

var brokenheartSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABgUExURf8fH5SUlD8AALy8vG8AAP/v7y8AAO/v79/f3x8AAGBgYP+6uoWAgA8AAODg4N8AALoAAK9fX/9/f1BQUF9fX38AADAwMK9PT88AAPff3yAgIEBAQJ8AAAAAAP8AAP///xWd8LYAAAAgdFJOU/////////////////////////////////////////8AXFwb7QAAALRJREFUeNpikJdn5GGUl5KVlZYHAoAAYpBn5mRik2YRkOHkAXIBAohBnktATkKWX05OBiQNEEAM8sJApqicnJwAiAsQQAzyHIJycgxALhsjkAsQQAxAzCrEzc0gIwYyCiCAQFwQYOVhBlEAAQTkcohIyktCRQECCCQrzcLNIM4O5gIEEIjLzCsnxwvhAgQQWK+UjAwXRDFAAIG5jExMzBAuQABBTJaSghoFEEAQLh8flAsQYAB/QRMdrGrZ2AAAAABJRU5ErkJggg==';

var mustacheSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEvUExURZCDOp+fn//52f/mZP/+9f/yqf/zsv///zAsE1BJIPv37/27cf/seRAPBm9vb/ujM/ulMP/oZkA5GPuhLvuiLP/xnw8PD/ukMiAdDf/ref/iYO/mtfuiMv/27L+8rNC9U//48LCdQ/DQUf/ujO/u5V9fX/24Of2/d/DWW4B0M/ulNIBgJf/47/uhMf/rafukNMCyUHRoUfyzM8CvTf/tg/uiM2BVJf/qZ/27b9DBVv/iYU9PT/24aZCEOvzjYfy3aNmpLu/v79/f36CSQMmRKujQo//qcJCBN3BkK8CwTv/jYf/sav21Nfy2Nv/ujWBWJY+Pj/2+duDOWv25bP/58//1vPDcYbu0nfujNP/vlf/sgtGcI/uiMPukM/uhLPukMP/jYv/lY//kYv/pZwAAABPrQjQAAADkSURBVHjaYghRlxGOAQNhXW4dgABiCDSS8hcy01AU8nC38g0GCCAGfi+DFM4w8yBPWw7LRH2AAGIQSUqWZGUTFIxkU05mFgAIIIa4hGQmRsaoKMYAFrfEeIAAAnJN2MVSWFnFUhz9EuMBAgjI5WHhUxUV5bNm4UmMBwggkOIoJmkG+VCmqOTEeIAAAnEZOFN4Uzg0jYFcgAACcXm1w1Wc5AwlgFyAAAJZ5BztysXO5cIAtAgggBhME7yT7Ryio6OVkvWYtQACiIHbJykxCQwSk9TsAQKIQcEiQjwWDMT5bWQBAgwAo9gtOceo5qUAAAAASUVORK5CYII=';

var rockoutSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAOCAMAAAAVBLyFAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABOUExURfPUUvDgw8WJG+C0N82UHOjBQu/NTfjw4fvgXeS6POHBhsWIEcmOFt25dvTo0tWpWPfaWNGhSdWhJ8mRKtinLPz48NGbIcKCDP/nY////0J+8hwAAAC5SURBVHjaYpCUlORjZJQEA0ZGdiAJEEAMkpLs4iziYDFeFh5BIAUQQGAhCQZhkJA4A4c4kAIIIAYQU0JCXBJBAwQQRIhNnImLiQkqBBBAECEhVg5xEQkxBrAQQABBhMTYJMSZGVg42UBCAAGEEBJnERMTAwkBBBBEiJlTQpxVQgJiFkAAQYQEuLnFxJhZIUIAAQR1BBAwwIQAAggoJMojAQdMQCGAAAKp4heHAy4gFyCAGCQxAECAAQAz/BRf4QQ5aQAAAABJRU5ErkJggg==';

var shockedSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD5UExURZ+fn0A5GP/52f/yqf/+9f/mZMCwTv27cf/sefulMPujM//1vPukMvuiLG9vbw8PD/uhLv/xn//zsrCdQ+DNWv/saqCTQf2/d//vleDPXfulNP24afuiM/uhMf/jYeDMWkA7GvyzM//iYNDBVmBYJ//raU9PT/21Nf/iYe/v7//tg/2+dv27b//qcP/refDcYf/27P/48P/ujXBmLf24Ofy2NuDOWl9fX/y3aP/////58//47/ukNPujNFBHHmBXJtC9U2BWJY+Pj//ujPuiMsCvTrCdRP25bP/sgvuiMPukM/uhLPukMP/jYv/lY//kYv/pZ//oZgAAAC9L+AEAAADWSURBVHjaYrASdxHwBAMBWXZrgABi0FZUcmRkFBZmtHPTMHUHCCAGLjllFTY2fTM2MQVJPxuAAGLg9Q/QYxYKDJQQcg5g5QQIIAZv3wAmBgYPDwYnFl0/H4AAAnK1LPmDmJn5gzSN/HwAAgjI5WDhMxcU5FNj4fDzAQggkGIPJu7AQG4mjwA/H4AAAnEDoQDIBQggKNc4SB7MBQggkEVArn2QA5DLygkQQAwyvqIBAQEirkBClVUKIIAY2NX9/fzBwM/fxAIggBgMdWx5vMCAh0vaACDAABpQKGnLv6HHAAAAAElFTkSuQmCC';

var grinSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFEUExURZ+fn//xp//99f/52P/mZEA5GPubH/Pn0ejPmv/0uu/NTf/ti/ufJvubIP/zsfugLPukLrCdQ/udIPujM//wnf/rgL+uS29vb//reP/pZg8PD/udIQAAAP/iYf/jYe/v7/uiMrCdROzTjf3Olv/47//581BHHvuaHf/refuhMfuXIfuhK/25bOTDd/ulNPujMP2+duzISfy3aE9PT/uiM//qbo+Pj/27cT86Gd/LWP/sar+vTODPXf2/d+vHR5+RP19fX/TXYOS+UujDTtyyT/TSUvzfXPyzM+/aXv24Of/sgejBQmBWJWBYJ//rafjcW9yxRf/sgP/uk/21NfuhKvDMTfy2NvueJ//iYPucIf/27P24adyxRvukNPjdW9DBVvy0Yv/tgvuZHP/nY+/fwvudJf/jYv/kYvuaHv/lY//pZ////1dP7uAAAADzSURBVHjaYlC1VeBPzVBPykjl1zRXAQggBgP3CB9WVkFBVjVF2TAdgABiEJaL97UW87AUs7ewyYwFCCAG7fQsCUa+5OQgPu4sFgGAAGJITZNkZmAQFWUwYzLN5AEIIIaMtMRsKRlGRikZee5MaYAAAnI1mMQdRETEjZkkMoUAAgjIzfJi5kxO5mQOlMwUAgggENfZxZuLyy4gJitTGiCAgEZlOWWzp6SkZOtmZfIABBBDSHqWP0c2ELAbAi0CCCAGkzSrrDillBQOxyw/Fj2AAGJICE7PTE93DXUDUp5GAAHEoKyVwZsaycbGG64vHB0FEGAAQKEtsZrJXOMAAAAASUVORK5CYII=';

var angrySource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD5UExUReDASP/mZA8PD//sgvujM/uhLv27cW9vb//sefukMv/yqfuiLP/+9fulMP/1vP/xn//52ebJT9OwPcegMptoCfyzM/uhMf/iYf/qZsCwTv/iYNq5Q/21NbCjSU9PT+DNWsCYK//tg/24af2+dvy2Np+QPfujNF9fX//rafuiMt/NYmBYJ//pZu/caf24Of27b/25bPuiMy8vLy8rE//48P/27O/YXPy3aP2/d+/v7//////ujfukNPulNP/sam9lK//58//47/DfZJ+bgvDcYf/pZf/nY7SIIPuiMPukM/uhLPukMP/jYv/jYf/oZv/lY//kYv/pZwAAAFxDcxUAAADXSURBVHjaYnCw0GT1AANWMTZHgABiUBaVCvAFgwBxFQOAAGJg8XWSlHAFAh0XWX8bgABi4A6QD1J1AwIzY21GXoAAYvDyCXQOCrLXCgoy0vX3BgggIFfRiimIi4spyNLa3xsggIBcDh52dX5+djkeDn9vgAACKWYW4PPz4xNgDvT3BgggENdPyB0IhP2AXIAAAnEZRNylBRVEhIFcgAACWhQoKOQHBAwMgYy8AAHEYOhjFwgFGoy2AAHEwCYT4B8ABv4BeuYAAcRgoq/G6QkGnCxKpgABBgC3bSk2up0NCAAAAABJRU5ErkJggg==';

var coolSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEjUExURdGcI/uhLPukMP/jYgA5aSA7S9C/VOjCRPTWVvziYACR8/27cfDQUQBAdf/savukMsCwTqCPPfuhLgCC3P/mZIByMfujM82UHMWHEhAuSPjcW//raf/tav27b//jYZCSWUA5GPy3aAAqUlBHHi+k8/uiLNmoLd2vM1BhUP/47//48ABWl9C5T//27P/58z9DQf/iYfulNKCfWv24OfujNP2+dv24aR+I0QB0xS86QdDBXkBVTx9qo2BYJy+s/wBPjBA9X/yzM/21NfukNODHVRAqRb2AMvuiM45sOvDcYf25bIB1NOzISf/iYAB70fuiMvulMP2/d/y2NvDYYNDDYPuhMUA7Gg+f/3/M///lY/uiMPukM//kYv/pZ//oZgAjRwCZ/9ViHQEAAADfSURBVHjaYtAL9BeKAgOhUG5NgABiMHX0FRQV1XFRUBY0CPICCCAGMTmZMFtvNk8BATa+SGeAAGKwjAcDSTDpChBADPEqEeEJCdosdiCKBSCAGPRtgDSXUrw5kPKLBwggBjcHiwQuew15XuEEYV4PgABiYAy2jpc0iosLYY1ntWICCCAGRuZYnzgwYI+NZAIIIBCXQV0qLo6TXRzIBQggBtWY2Dg1CQYGCXHOWJEAgABicGfmi43l4OHhiI2VFjEECCAGbqeYyBgwiIwxVgQIIAYtWRP+aDDgFzPTBQgwAJGbLHgHDPA0AAAAAElFTkSuQmCC';

var crySource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEyUExURf/mZP/savjcW/27cdmoLf/+9Zeliv/yqf/zsvuhLp+fn//jYfuiLPDPUPulMP/pZv/vlfukMj8/P/ujM/21NbuRMf/4zv2+dsCwTqCOPbCdQ/TVVf/iYLChR19ZOP25bPukNPyzM3BnLfziYPDcYYByMfy3aP/48J+VXDAsE8KCDP/tg//52P/serzJkPTkbvuiMw8PD02V2v/47//4zxAPBhAOBv24Of/sgqCSQf/pb7CkSf/qZ//rab+/v8/LsvuhMf24afulNP/58z85GP/27P2/d/27b5CEOuDHVf/iYfy2NrzHj/DbYeyZLSAdDezISeS7Pm9pSH9/f4+JaM/Pz9/UktPUhPujNPuiMtGcI/uiMP/nZPukM/uhLPukMP/oZv/jYv/lY//kYv/pZwAAANDiDlEAAADeSURBVHjaYnB2i+SM9osGAk4HZmOAAGIQV5RJVjWTlPLkTvbylgcIIAZhbmt/TQkbj1QlFcYkBYAAYuBJttTgEEiwChMylWXgAwgghrjEFNZgOwt2Li5736R4gAACcrVDU4XYTQxTWVOS4gECCMjV1XEJEeAIkhMDcgECCMjljwEDPR/+pHiAAALpTWCJAgI2o/CkeIAAAnEDtVgCeHlF2fST4gECCGhRCpN0AhAwKacw8AEEEINBImMKFNgyOAEEEAOzSHJSMhgkJZurAQQQg7p7hGAsGAgKO7oCBBgAq/owXwy6nN0AAAAASUVORK5CYII=';

var straightfaceSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADqUExURf/ujP/yqf/mZJ+fn8CwTvulMNGcI//1vG9vbw8PD//sgvuhLvuiLPukMv/xn//52aCOPf27cfujM//zsgAAAP/sef/+9f/48PyzM/DVW//ref/47/27b+/v719fX/y3aP/sav25bPuiMv/58/2+dvuiM//27P/tg/ukNODPXeDOWv2/d4+Pj//jYdC4Tv24af/vlU9PT/DcYZCEOtDBVvujNPy2NvulNEA5Gf/raf/ubPuhMf/vhf21Nf24OWBWJWBYJ0A7GkA5GMKCDPuiMPukM/uhLPukMP/jYv/lY//kYv/pZ//oZv///67j0aEAAADPSURBVHjaYlDWVuJ2AQNua0FpgABiUJHQs3ByEhBwcrKXNFMECCAGIV0TR2MWIy0WFgdNTw2AAGLg8fKWYhT28TEQZvBmYgUIIAY3D28xZmYuLmYdMStPd4AAAnLVfTlFGBk5RWRtPN0BAgjIFfXlkOPj4zD0FfV0BwggkGIGfnYfH3Z+Bm9Pd4AAAnF9oADIBQggEJfNGQzYgFyAAAJZBJdlYgUIIAZVDwVvKLBkMgcIIAZBWy9PLzDw9LKTBwggBnEZU15XMOAV0lcDCDAAddMmXN7wDnsAAAAASUVORK5CYII=';
	
var slantSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEjUExURfukMP/lY/27cf/mZPukMv/vnf/pb//4z//qZ//sgpCEOv/xn8CvTT8/P//reQAAAH9/f/DPUE9PT8mOFv/zsp+fn/uhLuG2OfuiLPujM8WHEnBoL//0s/y2NtC9U/DaYPulMPujNN/f3/y3aP/52b++tv3Rlv24Of/yqXBmLXBnLf/iYfTWVr+4j+/v7/yzM//58/21NUA6Gf/27PulNEA6Gv/iYP/48PzBcPuiMq1xIdWiKL+/v+zISfTXX9moLf/74v2/d//raf/+9cCwTuS7PvuhMfy6Y/24af/47/25bO/mtbCiR92vM/DcYd6QLoB1NP27b/2+dv/tav/saoBzMq+vr/jdW/uiM/uiMPukM/uhLP/jYv/jYf/kYv/pZ//oZpbB0BIAAADXSURBVHjaYjBwtBSLBAMxNyZPgABiCNI3i4sFgzhtWS+AAGKQjA3m4ODSCnDx85EO9QcIIAaJuPgEOVNNHvkEHi4jK4AAYoiOiU9IYOMW4UvglGFlAAggCFfERkAjQVVAzx0ggCBcZyF+XU4h/jA1gACCcB1Eeb35RHmVLAACCMQVd7VjZ2dL4FZhZQAIIBBX0FpK2FcwISGekQEggMAWJSTY2gtLicczKwAEEENETEg8GOiEOzGbAAQQA5NhHGMcGDDGqSsDBBCDeaAiSxQYsEh6GAMEGACN3i0okVHvOwAAAABJRU5ErkJggg==';
	
var tongueSource ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAELUExURf/+9f/sgv/52f/mZP/qZ/+Eke/hj/27cf/1vP57mf/Mcv///7+/v/ukMvulMPuhLv/sefujM/uiLP2+dk9PT6CSQP/reS8vL1BJIEA5GP/yqf/ujf27b9/f3//iYP/bbPuhMf/vlXBkK/91l//zso+DQvuiM8/In//tg//savyzM//27P21NZ+fnzAsE/ujNP24af/47/24OeG2Ofy3aP/48CAcDJCEOvy2Nv2/d//qcBAPBvDeZK+vr/25bODNWtDBVt/SiPykp29pSfDPUEA7Gv/rafuiMvukNP/iYfulNP/58+/v7//jYcKCDPuiMPukM/uhLPukMP/jYv/lY//kYv/pZ//oZgAAAMQt42kAAADYSURBVHjaYvC2dOf3BwN+BXZDgABiENaSUzKT9AWCUE8LO4AAYhD0dbA2Z2FhcdWTsAnxAAggBqHQMDEplfBwRXVne2Y+gABiCAwOY7KNEGXkkWWwCgkCCCAgV4NbN0LVMUKcWzokCCCAgFwBBh8eNrYIEQaBkCCAAAIpZmTiCA/nYGIMCwkCCCAQNxwKgFyAAAJxXfzAwBjIBQggkEVACS5OJ06uMGY+gABiUAvWDAMCVmVWeTdmL4AAYmDXCQ0JBYOQUCMTgABiMJXR5w0AA15BA22AAAMAByIrEhnk30cAAAAASUVORK5CYII=';
	
var cowbellSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAMAAAD+MweGAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABdUExURf3Vif3YTv7qxMDAwPvATf/68f/14oCAgP3gpuDg4P3QRPq2Ifu3K/zKa/zQevu6PjAwMPzMP/vBMCAgIHBwcP3al0BAQOjQpPDw8NmxZ/vFXPzJOvu6Jv/nY/////tdVCgAAAAfdFJOU////////////////////////////////////////wDNGXYQAAAAoUlEQVR42mKQQwcAAcQAY7CKMrCBGQABBBfhE2TkZwUxAAIIJsIrLSvLxQNiAQQQTIRFFghkQCyAAAKJiAGxDEhEmgnIAgggBjlOdmF2ZiQRgABikJNgFmDmZBMCiXBxAEUAAgikS0ROjkkaJMII4gEEENRkJBGAAIKKMDCCRGRZgEyAAIKKcHDLgIAUkAkQQHA3y4lLQmiAAGLA8ClAgAEAwS4YAMzaf1UAAAAASUVORK5CYII=';
	
var crabSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAMCAMAAADf/fSIAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABgUExURUxMTAwCAufn583Nzby8vOd+ficAAK2trXNzcx4eHj0PD+uZmfzv79ra2vjf3/fa2vO/v/C2tlosLPPAwLVYWONnZ+Nubvja2r+amu2hoeFiYiEAAN9YWLFYWOBYWP///03YHygAAAAgdFJOU/////////////////////////////////////////8AXFwb7QAAAPhJREFUeNpikCcMAAKIQV6CEcpklEASRxLlAQggBn4pNhYwh0Vaih+uBEUUIIAYBOVEpME8aVk5QbgaFFGAAGJglZNjYwZymKVl5Fjl5TmZ5Jk45eVZ5WQQogABBFIjwgXkccnKgdRwsMizcIDUIIkCBBCDpBzQIF55XqAGOW6gRgZ5BqAB3HJAg2CiAAHEwCMlJycrJC8E1CDFA9TJCYTy8iiiAAHEIA8xCGqMvDwDBwOI4kYSBQggBnlxkBZGkAZxkCQ7IzuIQhYFCCCgJmFROTkuGTlRYWCAycszMTKBaaCoDFQUIIBABvMJiMmJCfChxQBCFCDAANfjKFXIlU0ZAAAAAElFTkSuQmCC';
		
var winceSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADPUExURYB0M/DPUP/mZLChR/DaYP27ccKCDP/savulMPukMgAAAPujM/uiLPuhLjAsE7CgRvujNODNWv/48PTVVdmoLfyzM/y2NuS7PlBJIP25bPukNOjCRBAPBv2/d/27b/uiMvuhMd2vM//tavuiM2BXJv/586CSQP/27PulNPziYHBmLf24af/47/24OeDMWtC9U//iYMCvTfy3aP/raf/iYZCDOv21NfDbYf2+dtGcI/uiMPukM/uhLPukMP/jYv/jYf/qZ//lY//kYv/pZ//oZlkm5cIAAAC/SURBVHjaYlCVlee1AgNeBVYdgABisBA1cLIHAycTMUmAAGLgtldygAJ2RymAAGLgcXJ2gQJnJg6AAGKwsTNnMNUDcvgZmB1tAQIIyBVk4ONSY+Hj0gJyAQIIyHV2YVGR0JcxdHF2tAUIIDAXptfRFiCAwFxxSyBQBHEBAgjMZbOUZhRhYwRyAQIIbBEjSKmwJtAigABiULZjd4YCYyYNgABiYDVzcnQCA0cnXSOAAGIQkhPgtAYDTm5tdYAAAwAiriUWwcESZgAAAABJRU5ErkJggg==';

var kissSource = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEOUExURf/52Z+fn//mZP8PBv/yqf/+9dC/VP/xn+DHVf8AAP91NDAsE/27cW9vb/ulMF8AAP/zsrCdQ/uiLP/MWvujM/uhLv/jYYB1NA8PD//sefukMv+gRl9fX8CrSf/iYf+9U/ulNP/rafujNL8AAP9mLfy2NvuiM/////24Oa8AAP/27I+Pj//tg//vlf25bP+DOvuhMf/sav2/d9C6UPuiMv/ujPukNODPXfyzM+/v7/27b//47//48P/qcP/58//bYf9JIP/mtf+vTf/iYP21Nf/redDBVv2+dv/ujcCsSvy3aE9PT//NWv24af/1vP/sgvuiMPukM/uhLPukMP/jYv/lY//kYv/oZv/pZwAAAIXch10AAADiSURBVHjaYrAzMhENAANRAx5rgABicLdwNhaU5RDjEPSUU9UDCCAGETG3SG5xNjZx7kjzUDOAAGIQCotwZREID9cVMI1g4gMIIIagkAgGRkZ/f0ZtVtvQYIAAAnJ11CUiWVgkIi09QoMBAgjIlWTllWFn5/VmlQwNBgggkGJ/Bj8nYUcG/4jQYIAAAnHDw/U5mVXCw4FcgAACc+WZ+fk5pUFcgAACWRQu7KCsyQzkMvEBBBCDWohhRIQ9F5dPRIQikwJAADHwuISFhoFBaJiGF0AAMdhYKUkFgoGUiK8WQIABANT4KQqLhb2gAAAAAElFTkSuQmCC';


/* Function to replace text with emoticons

	Comments:
	
		- Emoticons that contain other emoticons must go first.  E.g., monkey -- :(|) -- also contains frown -- :( 
		- For some reason, some emoticons that appear as snippets in TL view are partially encapsulated by a span that looks
		  like this: <span dir=ltr"></span>.  The most egregious offenders (monkey, pig), have a temporary fix in place but I
		  believe the span is inserted around most instances of brackets or partheses.  Need to devise regexp to detect and
		  remove this span if it's breaking up and emoticon.  One problem is that (presumably) sometimes the dir=ltr tag is
		  necessary. How to remove only the tags that mess up the emoticon rendering? Perhaps check for existance of chars that
		  are contained in emoticons (:, (, ), etc.) and then investigate further to see if it's supposed to be an emoticon?
		- When showing a V.v.V (crab) as a snippet in TL view, Gmail strips out the periods.  Fix: look for VvV in addition to V.v.V
		- Consider using separate replaceText function for TL view to deal with snippets.
		- This function replaces matches with the given string, and then returns the edited string.  Would it be more efficient to test the string first using RegExp.test(string)?
		- Consider rewriting function using "for...in" syntax.  (I tried this approach initially and could not get it to work.)
		- Require white space to render emoticons?  I tried both ways and got false positives in both directions.  Prob. better to require white
		  spaces, or at least a white space on either side.  One problem is that if the emoticon is at the end of a row line, there's usually a <br>
		  tag right next to it which means there's no trailing white space.  I'm leery about using a more complex regexp b/c it could slow things down
		  but I will check with the experts in the regexp forum. 
		- Need to create special button to turn emoticon rendering on or off in case of false positives 
	
*/

	  function replaceText(textBlock) {		
		textBlock = textBlock.replace(/:\<span dir="ltr"\>\(\|\)\<\/span\>/g, "<img class='emoticon' src='" + monkeySource + "' />");	 // monkey snippet view- :(|)
		textBlock = textBlock.replace(/:\(\|\)/g, "<img class='emoticon' src='" + monkeySource + "' />");	 							// monkey- :(|)
		textBlock = textBlock.replace(/:<span dir="ltr"\>\(:\)\<\/span\>/g, "<img class='emoticon' src='" + pigSource + "' />");	 	// pig snippet view- :(:)
		textBlock = textBlock.replace(/:\(:\)/g, "<img class='emoticon' src='" + pigSource + "' />");	 								// pig- :(:)
		textBlock = textBlock.replace(/\}:-\)/g, "<img class='emoticon' src='" + devilSource + "' />");	 								// devil- }:-)
		textBlock = textBlock.replace(/:\)/g, "<img class='emoticon' src='" + smileSource + "' />"); 				// smile- :)
		textBlock = textBlock.replace(/:-\)/g, "<img class='emoticon' src='" + smileSource + "' />"); 				// smile- :-)
		textBlock = textBlock.replace(/;\)/g, "<img class='emoticon' src='" + winkSource + "' />"); 				// wink- ;)
		textBlock = textBlock.replace(/;-\)/g, "<img class='emoticon' src='" + winkSource + "' />"); 				// wink- ;-)
		textBlock = textBlock.replace(/:\(/g, "<img class='emoticon' src='" + frownSource + "' />"); 				// frown- :(
		textBlock = textBlock.replace(/:-\(/g, "<img class='emoticon' src='" + frownSource + "' />");	 			// frown- :-(
		textBlock = textBlock.replace(/\&lt;3/g, "<img class='emoticon' src='" + heartSource + "' />");	 			// heart-&lt;3
		textBlock = textBlock.replace(/&lt;\/3/g, "<img class='emoticon' src='" + brokenheartSource + "' />");		// brokenheart-&lt;/3
		textBlock = textBlock.replace(/&lt;\\3/g, "<img class='emoticon' src='" + brokenheartSource + "' />");		// brokenheart-&lt;\3
		textBlock = textBlock.replace(/:\{/g, "<img class='emoticon' src='" + mustacheSource + "' />");	 			// mustache- :{
		textBlock = textBlock.replace(/\\m\//g, "<img class='emoticon' src='" + rockoutSource + "' />");	 		// rockout- \m/	
		textBlock = textBlock.replace(/:-o/gi, "<img class='emoticon' src='" + shockedSource + "' />");	 			// shocked- :-o
		textBlock = textBlock.replace(/:D/g, "<img class='emoticon' src='" + grinSource + "' />");	 				// grin- :D
		textBlock = textBlock.replace(/=D/g, "<img class='emoticon' src='" + grinSource + "' />");	 				// grin- =D
		textBlock = textBlock.replace(/=\)/g, "<img class='emoticon' src='" + grinSource + "' />");	 				// grin- =)
		textBlock = textBlock.replace(/:-D/g, "<img class='emoticon' src='" + grinSource + "' />");					// grin- :-D
		textBlock = textBlock.replace(/x-\(/gi, "<img class='emoticon' src='" + angrySource + "' />");	 			// angry- x-(
		textBlock = textBlock.replace(/B-\)/g, "<img class='emoticon' src='" + coolSource + "' />");	 			// cool- B-)
		textBlock = textBlock.replace(/:'\(/g, "<img class='emoticon' src='" + crySource + "' />");	 				// cry- :'(
		textBlock = textBlock.replace(/:\|/g, "<img class='emoticon' src='" + straightfaceSource + "' />");	 		// straightface- :|
		textBlock = textBlock.replace(/:-\|/g, "<img class='emoticon' src='" + straightfaceSource + "' />");	 	// straightface- :-|
		textBlock = textBlock.replace(/:-\//g, "<img class='emoticon' src='" + slantSource + "' />");	 			// slant- :-/
		textBlock = textBlock.replace(/=\//g, "<img class='emoticon' src='" + slantSource + "' />");	 			// slant- =/
		textBlock = textBlock.replace(/:P/gi, "<img class='emoticon' src='" + tongueSource + "' />");	 			// tongue- :P or :p
		textBlock = textBlock.replace(/=P/g, "<img class='emoticon' src='" + tongueSource + "' />");				// tongue- =P
		textBlock = textBlock.replace(/:-P/gi, "<img class='emoticon' src='" + tongueSource + "' />");				// tongue- :-P or :-p
		textBlock = textBlock.replace(/\+\/'\\/g, "<img class='emoticon' src='" + cowbellSource + "' />");	 		// cowbell- +/'\
		textBlock = textBlock.replace(/V\.?v\.?V/g, "<img class='emoticon' src='" + crabSource + "' />");	 		// crab- V.v.V or VvV (tl snippets remove periods) 
		textBlock = textBlock.replace(/\&gt;\.\&lt;/g, "<img class='emoticon' src='" + winceSource + "' />");	 	// wince- >.<
		textBlock = textBlock.replace(/:-x/gi, "<img class='emoticon' src='" + kissSource + "' />");	 			// kiss- :-x
		textBlock = textBlock.replace(/:\*/g, "<img class='emoticon' src='" + kissSource + "' />");	 				// kiss- :*
		return textBlock;
		}



/* The addEmoticons function :)

	Commments:
		
		- Depending on view, find appropriate tags and call replaceText function for content inside each tag
		- See note below about recalling function again after a set interval of 20 seconds.  This fix is designed
		  to prevent emoticons from reverting to text after Google checks for new mail.
		  
*/
	  
      function addEmoticons() {
        
		// In Conversation View, render emoticons contained inside both snippets *and* the full message
		// Process message snippets and full messages with separate functions
		if (gmail.getActiveViewType() == 'cv') {
		
			var contentDivs = win.document.evaluate('//div[@class="ArwC7c ckChnd"]', win.document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var snippetDivs = win.document.evaluate('//div[@class="IUCKJe bWGucb"]', win.document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			
			if (contentDivs.snapshotLength > 0) {
			  for (var j = 0; j < contentDivs.snapshotLength; j++) {
				var contentDiv = contentDivs.snapshotItem(j).innerHTML;
				contentDiv = replaceText(contentDiv);
				contentDivs.snapshotItem(j).innerHTML = contentDiv;
			  }
			}
			if (snippetDivs.snapshotLength > 0) {
			  for (var j = 0; j < snippetDivs.snapshotLength; j++) {
				var snippetDiv = snippetDivs.snapshotItem(j).innerHTML;
				snippetDiv = replaceText(snippetDiv);
				snippetDivs.snapshotItem(j).innerHTML = snippetDiv;
			  }
			}
		  }
		
		// In Thread List view, render emoticons contained inside message snippets
		if (gmail.getActiveViewType() == 'tl') {
		 
		 var snippetDivsTL = win.document.evaluate('//span[@class="bEeVec"]', win.document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		 
		 if (snippetDivsTL.snapshotLength > 0) {	 
			  for (var j = 0; j < snippetDivsTL.snapshotLength; j++) {
				var snippetDivTL = snippetDivsTL.snapshotItem(j).innerHTML;
				snippetDivTL = replaceText(snippetDivTL);
				snippetDivsTL.snapshotItem(j).innerHTML = snippetDivTL;
			  }
			  // Recall function every 20 seconds in TL view view.  Keeps emoticons from reverting
			  // to text on subsequent auto refreshes by Gmail.  (I don't know how to detect when Gmail
			  // checks for new messages.  Obviously, after checking would be the ideal time to 
			  // re-run the script as opposed to a random interval.)  One potential improvement is to 
			  // (1) determine if any emoticons belong on the screen, (2) If not, don't do anything until
			  // the number of messages in the inbox changes. I suppose this solution still requires
			  // polling, but perhaps it is less process intensive?
			  //
			  // Some users may consider commenting the line below since most snippets in TL view do not contain emoticons
			  // I haven't experienced a performance hit with this setting on Vista with FF3.
			  var temp=setTimeout(addEmoticons, 20000);
			}
		 }
	  }


/* ********************************************* */
/* Instruct Gmail to add emoticons in three ways */
/* ********************************************* */
	  
	  /* First, add emoticons when the script first loads */
      addEmoticons();
	  
	  /* Second, add emoticons when the view changes either using mouse or keyboard shortcut 					 		 */
	  /* It *appears* that conducting a search or filtering by label also calls registerViewChangeCallback.				 */
	  /* However, registerViewChangeCallback is not called when Gmail auto-refreshes the inbox as far as I can tell		 */
	  gmail.registerViewChangeCallback(addEmoticons);
	  
	  /* Third, add emoticons when the user does something with the mouse but does not change view
	  		
			Comment:
				
				- The code below contains relatively "safe" setTimeouts...try adjusting the time if a certain function
				  is not working properly.  Lower the time if the transition from text to emoticon takes too long
				- Pressing tab then enter to send message won't trigger function if Gmail returns to CV view (i.e., if message has more than one reply) 
				
	  */
	  win.document.addEventListener(
		"mouseup",
    		function(event) {
			
				// In conversation view...
				if (gmail.getActiveViewType() == 'cv') {
					
					// ...user toggles a thread that contains individual messages
					// Is there a better way to check if user clicked on this bar?
					// Need to review to get all possible divs, spans, etc. that user might click on
					if (event.target.className=="ObUWHc rOkvff" || event.target.className=="zyVlgb XZlFIc" || event.target.className=="IUCKJe bWGucb"
						|| event.target.className=="EP8xU" || event.target.className=="i8p5Ld" || event.target.className=="XZlFIc" 
						|| event.target.className=="rziBod" || event.target.className=="xUReW" || event.target.parentNode.className=="xUReW") {
						
						// if the message is closed and needs to be loaded, look for tags like this 
						var loadingCheck = win.document.evaluate('//span[@class="IUCKJe bWGucb"]', win.document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

						// run if user is opening messages within a thread
						if (loadingCheck.snapshotLength > 0) {
							for (var j = 0; j < loadingCheck.snapshotLength; j++) {
								var temp=setTimeout(addEmoticons, 500);
								}
							}
						
						// if message is open and needs to be closed, look for tags like this
						var openCheck = win.document.evaluate('//div[@class="ArwC7c ckChnd"]', win.document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
						
						// run if user is closing messages within a thread 
						if (openCheck.snapshotLength > 0) {
							for (var j = 0; j < openCheck.snapshotLength; j++) {
								var temp=setTimeout(addEmoticons, 500);
								}
							}	
					}
					
					//Still in conversation view: if user clicks on expand/collapse all panel
					if (event.target.innerHTML=="Expand all" || event.target.innerHTML=="Collapse all") {
								var temp=setTimeout(addEmoticons, 500);
						}
					//Still in conversation view: if user sends a message. Use long timeout.
					if (event.target.parentNode.className == "LlWyA c1I77d" || event.target.parentNode.className == "CoUvaf c1I77d") {
								var temp=setTimeout(addEmoticons, 2500);
						}
				}
				// In Thread List: if user clicks on Refresh or uses the 'newer' / 'older' navigation call addEmoticons 
				else if (gmail.getActiveViewType() == 'tl' && (event.target.className=="DiWSpb" || event.target.className=="l73JSe")) {
						var temp=setTimeout(addEmoticons, 1000);
						}
				// Again, in Thread List: if user clicks on link for current page (i.e., clicks on Inbox while viewing inbox, etc.)
				else if (gmail.getActiveViewType() == 'tl' && event.target.getAttribute("href")) {
						if (event.target.getAttribute("href").substr(0,5) == 'https') {
							var temp=setTimeout(addEmoticons,500);
							}
						}
    		},
    	true);



/* ******************************************* */
/*                                             */
/* End code and close function(gmail)          */
/*                                             */
/* ******************************************* */

    });
  }
}, false);



/*

To do list:

1- Insert a  "menu" on compose page so user can click on emoticon to insert as text into document.  Add link to show/hide menu
2- Let user toggle addEmoticons function with special button.  I think this is the best
   defense against false positives.
3- Make find and replace regExp more efficient.  Find other ways to make code more efficient.
4- Solve <span dir=ltr"></span> issue in TL view rendering snippets
5- Incorporate mgmt tool into Settings page or alongside menu mentioned in #1.  E.g., "never run addEmoticons on messages from this sender"
6- Convert to standalone FF plug in 
7- Add options for classic and round smileys
8- Set variables at top of page so user can customize settings based on speed of his or her network
9- Determine when Gmail checks for new messages; then run addEmoticons 
10- Support for keyboard shortcuts that show/hide content but don't change page view
11- Let users incoproate their own emoticons
12- Once release is stable, reduce the amount of comments :-)
13- Run function if user presses "enter" to send message

*/


/*

Known issues:

1- Emoticons revert back to text when Gmail has checked for new messages. 10-second polling solution included above.
2- Long (I mean very long messages) or threads or pages with lots of emoticons and messages 'freeze' momentarily.  Improve regexp script to solve?
3- Sometimes emoticons don't render.  Usually this can be fixed by adjusting the length of the timeout.  Need to run script after
   certain key events.
4- Emoticons don't render if message is opened in a new window or if message is opened in print view

*/