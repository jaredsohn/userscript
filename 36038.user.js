// ==UserScript==
// @name           Entensity Classic Icons
// @namespace      http://userscripts.org/users/70608
// @description    Replace SA-ugly icons with classic E icons
// @include        http://forums.entensity.net/index.php
// @include	   http://forums.entensity.net/forumdisplay.php?f=48
// ==/UserScript==

var EFnewIcon = 'data:image/gif;base64,R0lGODlhFAAUAOYAAJucnu/w8omLjt3f4kpTXaKrtKCpsqCosJaYmpKUlurs7ubo6p+gofP09XiA'+
'h3mAhmhuc3Z/hs3W3XJ3e3+Dhnt/gsbLz9PX2s/T1o2QkuHk5nR/hXZ7fsrP0naCiIOHidfb3bK8'+
'wK+6vvf4+KOkpHd/fbG4tG5yb3F0cX2Bd6Cjm66ypqmro3x/b6Chkf//0aSklPv7+f37yaCfiqCf'+
'jK6tnPr1vfbur7OwnPLnoKylf725ori0nuXQcOnXf+7fkMO+p97DVuHJYqqcY6Sbcqiedc7IsNPN'+
'teDbx+rn2pR/NqWTVaqYWsnDrNnTvPLu4KqGGaaJLbWXOpR/OaWOQrqfTaWORa2VSa+XS7KaTbWc'+
'T6uUS7eeUbmgU8Wxccy5f9XHm9jKnt3TsqV+CbGQLb2kWsy3eunizu7n1Pn38fb07/Ty7QIBAP//'+
'/wAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5'+
'BAEAAG8ALAAAAAAUABQAAAf/gG+Cb26FhoeIg4RtjBKNjm0SkhKFgmxpT2hoTyExMSEmmiYhDw5u'+
'hGpnYWZmYWcia2c6Q60rIhGFI0lgUWO+v8BSYEkkhQ1IXmNBQj0+Pzk3NjIvY15IDIUBTmXKzM7Q'+
'0tRlTgCFCkdd3cDAZF1HCIULRlzq62NQX1xGCYUaTVrdmj2LNqaKGC1NMhQaACRLwG8EDWYBIqAQ'+
'iB1Y6q3Dh2XHh0IXeFzRuI7MFR4UCmHAseXhwHBjtuCoUKhDDSYuwU0bw6QGh0IWWBTpZe+XlCIs'+
'JhQq4CEFkSVTlFChIpWKlSVEYKA45cbAgQ0lXNBo0WLGjLI0XKg4wUZQIQJwEAlAgAB3rty5pwYh'+
'2ntIUSAAOw==';

var EFoldIcon = 'data:image/gif;base64,R0lGODlhFAAUAPcAAPLy8/Dw8ZiZm+jp6+bn6ZKUl93f4tHT1p6jqoKFidfa3svO0sPGykpTXqCl'+
'q7G1uldibk9ZZEpTXWRwfWhxe2pzfZukroqRmUxXYk1YY1JdaGp3hG16h19pc15ocmNtd2hyfG12'+
'f2t0fXB5gnyEjH6GjmVrcZ+osZCXnpyjqp2jqaGnrayxtqqvtLO4vcHFycDEyI2Qk9PW2dHU19DT'+
'1s3Q0/L09uTm6Nnb3Z6foPn6+/T19lZibU9aZFllcGNwfG99ilhjbXuHkmZweYOPmm54gXF7hJml'+
'sJejrp6qtXN8hKezvoKLk4GKkoiRmY6Xn2l3g2JtdqSxvHd/hnZ+hWpwdZefppSco5OboqqwtaWr'+
'sHaAiICKkn6IkHV+hY6XnpefpXB1ecvU23l+gomNkIWJjMPIzL/EyN/k6M/T1unt8K+9x4ONlLbD'+
'zGVscWduc2Ztcr/K0sjS2cXP1sPN1MrU28nT2r7EyNTc4XZ7fnyBhMbLznJ4e+zu7wQFBfv8/P//'+
'//n5+QMDAwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAIQALAAAAAAUABQA'+
'AAj/AAkJJDSooMGDCAcSErQDAIA5gf7UkdOQzhw5YgoK9DMAx4EDOJYECLAkycckS6hMGbSQQI0H'+
'DhC0YHCEBgMiQhw8QCLFS8E+M1gM6YGhqNGiGkiwmJGj4A0YKCKsaRPHDh40amzoANQBBQwBBQ24'+
'KIFhatWrWbcGKeGiQEEFWZSUbXP0KAUlWWIUlKFlxNy6RTNcGKGFTME0K4rMPYvVBgYPKoqsKFNw'+
'QYoQi602fqwiRIoEBfeAEfEXsGARYPQUNHOlQmnAFCpcGVPwBRbFZjWnBRSkCJY8Bc9c2SKVqm6t'+
'XLdc4VPwjhUmQwEjJcHESpiCJ4Bs6GLEB4QoUXhENfkAwkiXL1UEETxhgQMUJ2wm/ODC5UcTNk6e'+
'vPEjsKCE/xKYYEIDDQhYoBtwqDcQQgwepFBAADs=';

var EFlockIcon = 'data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAP////Ly8/Dw8ZiZm+jp6+bn6ZKUl93f4tHT1p6jqoKFidfa3svO0sPG'+
'ykpTXqClq7G1uldibk9ZZEpTXWRwfWpzfZukrkxXYlJdaGp3hG16h19pc212f2t0fXB5gnyEjH6G'+
'jmVrcZ+osZCXnpyjqqGnrayxtqqvtLO4vcHFycDEyI2Qk9PW2dHU19DT1s3Q0+Tm6Nnb3Z6foPT1'+
'9k9aZFllcG99inuHkmZweYOPmm54gXF7hJmlsJejrp6qtXN8hKezvoKLk4iRmWl3g6SxvHd/hnZ+'+
'hZefppSco5OboqqwtaWrsHaAiH6IkHV+hZefpXB1ecvU23l+gomNkIWJjMPIzL/EyN/k6M/T1unt'+
'8K+9x4ONlLbDzGVscWZtcr/K0sjS2cXP1sPN1MrU28nT2r7EyNTc4XZ7fnyBhMbLznJ4e+zu7wQF'+
'Bfv8/P//qf//0f/7j/Tyl//4ivr2mP/6pv35tf/zgPrvi/nwmPryuvPfcubVeP/vifrpiPnusdXC'+
'ZP/rhV5YOtu+TOrSaPfdcauaV8a0aeXSgs69dpuPX/jrtW9dHHZjIox4M4x6OpB/QfXZdJqISo5/'+
'Svrhh6eYYqGTYqmdcMG6n31fAVpEAXldCIJlDdarKYJsJZV8MH9rKsqpRcipR4JuLpiBOpJ9OI15'+
'OauTSY98PbadT/3dcaKMSZyIR7GaUpyJSf/gefHUdZ6MUaOTXsCtcb2rcdnFhMOyeKeegMCQAr2S'+
'EtirLHphGdesLeK0MuK2PJ2BLteuQZV9NZR9OOnGXuvFYPnTavTOaIp2O458R8SsatS+f7Oha8ay'+
'eMSyfvTgp9qsN6mJNO/EUuzBUtqyTeC4VMWkU8GnZ7ujZPTDUrOSSfn5+QMDA////wAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAANwALAAAAAAUABQA'+
'AAj/ALkJ5AagoMGDCAdy20ZDgAAx2tyQCdNwjJgwUgoKbFNARoIEMoIMGBDkx8cfQY4YAbDQAIwI'+
'EBSgcNDjhQMdOCBE8FHkSUE2Lk7kqIGhqNGiGUCccDGjYIwVJCZs6QKmzBksWpatCsCBxAoCBRGk'+
'CIFhatWrWpohSnQsRIoDBRksAVK2y9FKhAwBOmRqCYuCLZh8qFsU0yRYrm7JEoWKCZWCWUzsqFv1'+
'kiVgsVg50nVqVJWCDUp0oFxGkq1ee1Q9w8Wr1IKCaqB4IKyo1aBc0bBNU7YoWJqCVpJYIAwp1bBa'+
'zv7ogVOH1JSCKpRMNvtoljE7b+RYozNHGJqCV5I0apFKldE1aXni8MmG586nNQXNIBEytGijZL78'+
'BIpErU8hTlEUNMINGjjBgw0SgMJMJ5S8UgwxoeyyyTYEjXDBBkQMwUUFgiBDSzXQ/OKJJpm0IVBB'+
'FKRIgQgiPPAAiy968QWFAyFk40EKBQQAOw==';



var oldIcon = document.evaluate("//img[contains(@src,'old.gif')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var i = 0;
while ((fixoldIcon = oldIcon.snapshotItem(i)) != null) {
	fixoldIcon.setAttribute("src", EFoldIcon);
	i++;
}



var newIcon = document.evaluate("//img[contains(@src,'new.gif')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var j = 0;
while ((fixnewIcon = newIcon.snapshotItem(j)) != null) {
	fixnewIcon.setAttribute("src", EFnewIcon);
	j++;
}


var newlockIcon = document.evaluate("//img[contains(@src,'new_lock.gif')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var k = 0;
while ((fixnewlockIcon = newlockIcon.snapshotItem(k)) != null) {
	fixnewlockIcon.setAttribute("src", EFlockIcon);
	k++;
}


var oldlockIcon = document.evaluate("//img[contains(@src,'old_lock.gif')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var l = 0;
while ((fixoldlockIcon = oldlockIcon.snapshotItem(l)) != null) {
	fixoldlockIcon.setAttribute("src", EFlockIcon);
	l++;
}