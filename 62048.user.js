// ==UserScript==
// @name           AutoNBonlineRegister
// @namespace      http://twitter.com/rokudenashi
// @include        https://business.nikkeibp.co.jp/reguser/reguser3*
// @include        http://business.nikkeibp.co.jp/info/reguser/
// @include        http://business.nikkeibp.co.jp/*
// @description        Autoここから先は、日経ビジネスオンライン会員の方だけがご覧いただけますRegister
// ==/UserScript==

(function(){
setTimeout(function(){
console.log('AutoNBonlineRegister: start')

var w = this.unsafeWindow || window
var f=w.document.forms[0]
var e=f.elements
function select_radio(elements,name,number) {
	if (elements.namedItem(name).length)
		elements.namedItem(name)[number].click()
	else
		elements.namedItem(name).click()
}

if (w.location.href=='http://business.nikkeibp.co.jp/info/reguser/') {
	w.location='https://business.nikkeibp.co.jp/reguser/reguser3.jsp?MODE=NEW1'
} else if (w.location.href=='https://business.nikkeibp.co.jp/reguser/reguser3.jsp?MODE=NEW1') {
	e.namedItem('userid').value=new Date().getTime()
	e.namedItem('email').value=e.namedItem('userid').value+'@example.com'
	setTimeout(function(){f.submit()},1000)
	return
} else if (w.location.href=='https://business.nikkeibp.co.jp/reguser/reguser3.jsp?MODE=NEW1_CHK') {
	e.namedItem('password1').value=e.namedItem('password2').value='pass'+e.namedItem('userid').value
	e.namedItem('name1_1').value='日経'
	e.namedItem('name1_2').value='三郎'
	e.namedItem('name2_1').value='ニッケイ'
	e.namedItem('name2_2').value='サブロウ'

	e.namedItem('birthday1').selectedIndex=1
	e.namedItem('birthday2').selectedIndex=2
	e.namedItem('birthday3').selectedIndex=3
	select_radio(e,'gender',1)
	select_radio(e,'businessclassification',11)
	e.namedItem('affiliationsection').selectedIndex=1
	e.namedItem('executive').selectedIndex=2
	e.namedItem('employeesnumber').selectedIndex=3
	e.namedItem('annual_income').selectedIndex=4
	e.namedItem('S7').selectedIndex=2

	setTimeout(function(){f.submit()},1000)
	return
} else if (w.location.href=='https://business.nikkeibp.co.jp/reguser/reguser3.jsp?MODE=NEW2_CHK') {
	setTimeout(function(){f.submit()},1000)
} else if (w.location.href=='https://business.nikkeibp.co.jp/reguser/reguser3.jsp?MODE=NEW_EXEC') {
	setTimeout(function(){w.document.getElementsByName('b1')[0].onclick()},1000)
} else if (w.document.body.innerHTML.match(/■ここから先は、日経ビジネスオンライン会員の方だけがご覧いただけます。|次ページ以降は「日経ビジネスオンライン会員」\(無料\)の方および「日経ビジネス購読者限定サービス」の会員の方のみお読みいただけます。/)) {

	var regwin = w.open('https://business.nikkeibp.co.jp/reguser/reguser3.jsp?MODE=NEW1','AutoNBonlineRegister')
	if (regwin) {
		setTimeout(function(){regwin.close()},20*1000)
	} else {
		w.location='https://business.nikkeibp.co.jp/reguser/reguser3.jsp?MODE=NEW1'
	}
}

},1000)
})()
