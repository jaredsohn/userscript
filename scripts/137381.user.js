// ==UserScript==
// @name        Salary
// @namespace   Tamozhnya1
// @include     http://www.heroeswm.ru/home.php
// @include     http://www.heroeswm.ru/object-info.php*
// @include       http://*heroeswm.*/*
// @include       http://178.248.235.15/home.php
// @include       http://178.248.235.15/object-info.php*
// @include       http://173.231.37.114/home.php
// @include       http://173.231.37.114/object-info.php*
// @include       http://*freebsd-help.org/home.php
// @include       http://*freebsd-help.org/object-info.php*
// @include       http://*heroes-wm.*/home.php
// @include       http://*heroes-wm.*/object-info.php*
// @include       http://*hommkingdoms.info/home.php
// @include       http://*hommkingdoms.info/object-info.php*
// @include       http://*hmmkingdoms.com/home.php
// @include       http://*hmmkingdoms.com/object-info.php*
// @include       http://*герои.рф/home.php
// @include       http://*герои.рф/object-info.php*
// @version     1
// ==/UserScript==
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
main();
function main() {
	setK();
	if(/object-info.php/.test(location.href)) {
		var strSalary    = ustring("Зарплата: ");
		var tds = document.getElementsByTagName("td");
		for (var i = 0; i < tds.length; i++) {
			var td = tds[i];
			if(td.innerHTML == strSalary) {
			  var tdSalary = td;
			  break;
			}
		}
		var b = tdSalary.nextSibling.firstChild.firstChild.firstChild.firstChild.lastChild.firstChild;
		salary = parseInt(b.innerHTML);
		var k = parseFloat(GM_getValue(getNick(), "1.0"));
		b.innerHTML = b.innerHTML + " (" + (salary * k) + ")";
	}
}
function setK(){
	if(/home.php$/.test(location.href)) {
		var guildWorkersString = ustring("Гильдия Рабочих:");
		var indexOfGuildWorkers = document.body.innerHTML.indexOf(guildWorkersString);
		var guildWorkersValue = parseInt(trim(document.body.innerHTML.substr(indexOfGuildWorkers + 17, 2)));
		k = ["1.0", "1.1", "1.2", "1.4", "1.6", "1.8", "2.0", "2.2", "2.4", "2.6", "2.8", "3.0", "3.2"];
		GM_setValue(getNick(), k[guildWorkersValue]);
	}
}
function getNick() {
	var els = document.getElementsByTagName('embed');
	var nick = "";
	for( var i = 0; i < els.length; i++ ) {
		var el = els[i];
		if( el.src.match(/heart.swf/) ) {
			var vs = el.getAttribute("FlashVars").split('|') ;
			if (vs[3]) {
				nick = vs[3];
				break; 
			}
		}
	}
	return nick;
}
function uchar(s) {
	switch (s[0]) {case "А": return "\u0410"; case "Б": return "\u0411"; case "В": return "\u0412"; case "Г": return "\u0413"; case "Д": return "\u0414"; case "Е": return "\u0415"; case "Ж": return "\u0416"; case "З": return "\u0417"; case "И": return "\u0418"; case "Й": return "\u0419"; case "К": return "\u041a"; case "Л": return "\u041b"; case "М": return "\u041c"; case "Н": return "\u041d"; case "О": return "\u041e"; case "П": return "\u041f"; case "Р": return "\u0420"; case "С": return "\u0421"; case "Т": return "\u0422"; case "У": return "\u0423"; case "Ф": return "\u0424"; case "Х": return "\u0425"; case "Ц": return "\u0426"; case "Ч": return "\u0427"; case "Ш": return "\u0428"; case "Щ": return "\u0429"; case "Ъ": return "\u042a"; case "Ы": return "\u042b"; case "Ь": return "\u042c"; case "Э": return "\u042d"; case "Ю": return "\u042e"; case "Я": return "\u042f"; case "а": return "\u0430"; case "б": return "\u0431"; case "в": return "\u0432"; case "г": return "\u0433"; case "д": return "\u0434"; case "е": return "\u0435"; case "ж": return "\u0436"; case "з": return "\u0437"; case "и": return "\u0438"; case "й": return "\u0439"; case "к": return "\u043a"; case "л": return "\u043b"; case "м": return "\u043c"; case "н": return "\u043d"; case "о": return "\u043e"; case "п": return "\u043f"; case "р": return "\u0440"; case "с": return "\u0441"; case "т": return "\u0442"; case "у": return "\u0443"; case "ф": return "\u0444"; case "х": return "\u0445"; case "ц": return "\u0446"; case "ч": return "\u0447"; case "ш": return "\u0448"; case "щ": return "\u0449"; case "ъ": return "\u044a"; case "ы": return "\u044b"; case "ь": return "\u044c"; case "э": return "\u044d"; case "ю": return "\u044e"; case "я": return "\u044f"; case "Ё": return "\u0401"; case "ё": return "\u0451"; default: return s[0];}}
function ustring(s) {
    s = String(s);
    var result = "";
    for (var i = 0; i < s.length; i++)
        result += uchar(s[i]);
    return result;
}
function trim(string) {
	return string.replace(/(^\s+)|(\s+$)/g, "");
}
