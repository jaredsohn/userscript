// ==UserScript==
// @name        FormatedExperience
// @namespace   Tamozhnya1
// @description Удобный рпосмотр опыта
// @include     http://www.heroeswm.ru/home.php
// @include     http://www.heroeswm.ru/pl_info.php*
// @include       http://178.248.235.15/home.php
// @include       http://178.248.235.15/pl_info.php*
// @include       http://173.231.37.114/home.php
// @include       http://173.231.37.114/pl_info.php*
// @include       http://*freebsd-help.org/home.php
// @include       http://*freebsd-help.org/pl_info.php*
// @include       http://*heroes-wm.*/home.php
// @include       http://*heroes-wm.*/pl_info.php*
// @include       http://*hommkingdoms.info/home.php
// @include       http://*hommkingdoms.info/pl_info.php*
// @include       http://*hmmkingdoms.com/home.php
// @include       http://*hmmkingdoms.com/pl_info.php*
// @include       http://*герои.рф/home.php
// @include       http://*герои.рф/pl_info.php*
// @version     1
// ==/UserScript==

main();
function main() {
	var td;
	if(/home.php$/.test(location.href)) {
		var tds = document.body.querySelectorAll("td[width='55%']");
		for(var i = 0; i < tds.length; i++) {
			if(tds[i].innerHTML.indexOf(ustring("Боевой уровень")) > -1) {
				td = tds[i];
				break;
			}
		}
	}
	if(/pl_info.php/.test(location.href)) {
		var tds = document.body.querySelectorAll("td[colspan='2']");
			for(var i = 0; i < tds.length; i++) {
			if(tds[i].innerHTML.indexOf(ustring("Боевой уровень")) > -1) {
				td = tds[i];
				break;
			}
		}
	}
	if(!td) {
		return;
	}
	treatTD(td);
}
function treatTD(td){
	experienceRegExp = /\(\d+\)/g;
	var experienceFindResult = experienceRegExp.exec(td.innerHTML);
	if(experienceFindResult == null) {
		return;
	}
	var experienceSnippet = experienceFindResult[0];
	experienceValue = experienceSnippet.replace("(", "").replace(")", "");
	td.innerHTML = td.innerHTML.replace(experienceSnippet, "(" + to_number_format(experienceValue, 0) + ")");
	//alert(experienceValue)
	//alert(to_number_format(experienceValue, 0))
	experienceRegExp = />\+\d+</g;
	var experienceFindResult = experienceRegExp.exec(td.innerHTML);
	if(experienceFindResult == null) {
		return;
	}
	var experienceSnippet = experienceFindResult[0];
	experienceValue = experienceSnippet.replace(">+", "").replace("<", "");
	td.innerHTML = td.innerHTML.replace(experienceSnippet, ">+" + to_number_format(experienceValue, 0) + "<");
}
function to_number_format (p_string, p_dec) {

  if ( p_dec == undefined ) p_dec = 2;

  p_string = p_string.toString();

  if ( ! /^[-]?[0-9\s]*[.,]?\d*$/.test(p_string) ) return p_string;
  p_string = p_string.replace(/\s/g, '').replace(',', '.');

  var znak_pos = p_string.indexOf("-");
  var znak = ( znak_pos == -1 ) ? '' : '-';
  var point_pos = p_string.indexOf(".");
  var point = p_dec > 0 ? '.' : '';
  var dec = ( point_pos == -1 ) ? '' : p_string.substr( point_pos + 1 );
  var beg = ( point_pos == -1 ) ? p_string.substr(znak_pos == -1 ? 0 : znak_pos + 1)
   : p_string.substring ((znak_pos == -1 ? 0 : znak_pos + 1), point_pos);

  var dec_length = dec.length;
  if (dec_length > p_dec) dec = dec.substr(0, p_dec); //Удалим лишние цифры после запятой

  // Дорисуем недостающие нули после запятой
  if ( dec_length < p_dec )
    for ( var i = 1; i <= p_dec - dec_length; i++ ) dec += '0';

  var end = '';
  var l_len = beg.length;
    
  // Бежим по всей строке с конца
  for (var i = 1; i <= l_len; i++) {
    end = beg.substr(l_len - i, 1) + ((i % 3 == 1 && i > 3) ? ' ' : '') + end;
    beg = beg.substring(0, l_len - i);
  }

  //alert('znak='+znak+' end='+end+' point='+point+' dec='+dec);
  return znak + end + point + dec;
}
function uchar(s) {
	switch (s[0]) {case "А": return "\u0410"; case "Б": return "\u0411"; case "В": return "\u0412"; case "Г": return "\u0413"; case "Д": return "\u0414"; case "Е": return "\u0415"; case "Ж": return "\u0416"; case "З": return "\u0417"; case "И": return "\u0418"; case "Й": return "\u0419"; case "К": return "\u041a"; case "Л": return "\u041b"; case "М": return "\u041c"; case "Н": return "\u041d"; case "О": return "\u041e"; case "П": return "\u041f"; case "Р": return "\u0420"; case "С": return "\u0421"; case "Т": return "\u0422"; case "У": return "\u0423"; case "Ф": return "\u0424"; case "Х": return "\u0425"; case "Ц": return "\u0426"; case "Ч": return "\u0427"; case "Ш": return "\u0428"; case "Щ": return "\u0429"; case "Ъ": return "\u042a"; case "Ы": return "\u042b"; case "Ь": return "\u042c"; case "Э": return "\u042d"; case "Ю": return "\u042e"; case "Я": return "\u042f"; case "а": return "\u0430"; case "б": return "\u0431"; case "в": return "\u0432"; case "г": return "\u0433"; case "д": return "\u0434"; case "е": return "\u0435"; case "ж": return "\u0436"; case "з": return "\u0437"; case "и": return "\u0438"; case "й": return "\u0439"; case "к": return "\u043a"; case "л": return "\u043b"; case "м": return "\u043c"; case "н": return "\u043d"; case "о": return "\u043e"; case "п": return "\u043f"; case "р": return "\u0440"; case "с": return "\u0441"; case "т": return "\u0442"; case "у": return "\u0443"; case "ф": return "\u0444"; case "х": return "\u0445"; case "ц": return "\u0446"; case "ч": return "\u0447"; case "ш": return "\u0448"; case "щ": return "\u0449"; case "ъ": return "\u044a"; case "ы": return "\u044b"; case "ь": return "\u044c"; case "э": return "\u044d"; case "ю": return "\u044e"; case "я": return "\u044f"; case "Ё": return "\u0401"; case "ё": return "\u0451"; default: return s[0];}
}
function ustring(s) {
    s = String(s);
    var result = "";
    for (var i = 0; i < s.length; i++)
        result += uchar(s[i]);
    return result;
}
