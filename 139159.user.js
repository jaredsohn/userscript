// ==UserScript==
// @name           	antinokyrent 3.2
// @namespace      
// @description  ghfhgjfghf  	
// @version			3.2
// ==/UserScript==

var dictionary = [
'блядь', 'блять','бля','мля','блеать',
'хуяс', 'нихуя', 'нахуя','хуй','хуе','хуя','хули','хуёво','хуё','хуи',
'пизд','писд','пистец', 'пестец', 'пезд',
'срач',
'говн',
'пидор','пидар',
'ебло','ебырь','ёбырь','ебать', 'заебись','заебок','ебись','ебок','ебуч', 'въёб', 'вьеб','ебан','ёбан','уёбок','уебок','ебал','ебнул','ёбнул','ебен','ебаш',
'(вы|за|пере|вь|въ|на|про)(ебу|еби)','^ебу|еби|ебет|ебёт$', '^[её]{1}бот[аы]$',
'еблан',
'fuck',
'гандон',
'залуп',
'елда',
'херня', 'хер',
'трахать', 'трахнул', 'трахни', 'трах',
'шлюх', 'шалав',
'сука', 'суки',
'д[ао]{1}лб[оа]{1}[ёе]{1}б',
'педрил'
];

var excludes = [
'(.*)([а-яё]{2})бля(.*)',

/*трах*/
'трахимед(.*)', '(.*)страх(.*)', '(.*)трахе(.*)', 'трахом(.*)', 'тетрах(.*)', 'трахит(.*)', 'трахомат(.*)', '(.*)питрах(.*)', '(.+)етрах(.*)',

/*хули*/
'хулига(.*)', 'хулитель(.*)', '(.*)хулить',

/*говн*/
'(.*)саговн(.*)','(.*)баговн(.*)',

/*пидар*/
'(.*)лапидар(.*)', 'скипидар(.*)',

/*ебок*/
'лежебок(.*)', 'хлебок(.*)', '(.*)гребок(.*)', '(.*)ребок(.*)', 'небок(.*)',

/*залуп*/
'залупить', 'залуплю', 'залупим', 'залупите', 'залупиш(.*)',

/*хер*/
'(.*)махер(.*)','(.*)херувим(.*)', '(.*)брехер(.*)', 'мохер(.*)', '(.*)[шм]{1}ахер(.*)', '(.*)херес(.*)', '(.*)шхер(.*)', 'хертел(.*)',

/*сука*/
'(.+)сук(.*)',

/*ебу*/
'(.*)[нлдбзчркт]{1}ебу(.*)'
];

//for(var i = 0; i < dictionary.length; i++) dictionary[i] = "(([^a-zа-яё0-9\s]|^)([а-яёa-z0-9]*)"+dictionary[i]+ "([а-яёa-z0-9]*)([^a-zа-яё0-9]|$))";
excludes = new RegExp(excludes.join('|'), 'i');
var rx = /([^a-zа-яё0-9]{0}|^)([a-zа-яё0-9]+)([^a-zа-яё0-9]{0}|$)/ig;//new RegExp(, 'ig');

function checkWord(str, p1, p2, offset, s) {
	var rus_replace_letters = {
		a: 'а',
		b: 'в',
		c: 'с',
		e: 'е',
		h: 'н',
		k: 'к',
		m: 'м',
		n: 'п',
		o: 'о',
		p: 'р',
		r: 'г',
		t: 'т',
		u: 'и',
		x: 'х',
		y: 'у'
	};
	
	var rus_to_eng_layout = {
		q: 'й',
		w: 'ц',
		e: 'у',
		r: 'к',
		t: 'е',
		y: 'н',
		u: 'г',
		i: 'ш',
		o: 'щ',
		p: 'з',
		'[': 'х', '{':'х',
		']': 'ъ', '}': 'ъ',
		a: 'ф',
		s: 'ы',
		d: 'в',
		f: 'а',
		g: 'п',
		h: 'р',
		j: 'о',
		k: 'л',
		l: 'д',
		';': 'ж', ':': 'ж',
		'\'': 'э', '"': 'э',
		z: 'я',
		x: 'ч',
		c: 'с',
		v: 'м',
		b: 'и',
		n: 'т',
		m: 'ь',
		',':'б','<': 'б',
		'.':'ю','>':'ю'
	};
	var words = [str.toLowerCase()];
	
	var rus_analog_word = ''; 
	for(var i = 0; i < str.length; i++) rus_analog_word = rus_analog_word + (rus_replace_letters[str.substr(i, 1).toLowerCase()]?rus_replace_letters[str.substr(i, 1).toLowerCase()]:str.substr(i, 1));
	var rus_to_eng_layout_word = ''; 
	for(var i = 0; i < str.length; i++) rus_to_eng_layout_word = rus_to_eng_layout_word + (rus_to_eng_layout[str.substr(i, 1).toLowerCase()]?rus_to_eng_layout[str.substr(i, 1).toLowerCase()]:str.substr(i, 1));
	words.push(rus_analog_word);
	words.push(rus_to_eng_layout_word);	
	
	for(var i = 0; i < words.length; i++) {
		var mat = false;
		for(var j = 0; j < dictionary.length; j++) {
			//var t = new RegExp("(([^a-zа-яё0-9]|^)([а-яёa-z0-9]*)"+dictionary[j]+ "([а-яёa-z0-9]*)([^a-zа-яё0-9]|$))", 'i');
			var t = new RegExp(dictionary[j], 'i');
			if(t.test(words[i])) { mat = true; j = dictionary.length; }
		}
		if(mat) {
			if(!excludes.test(words[i])) {
				return ' (вырезано) ';
			}
		}
	}
	//console.log(str);
	return str;
}


function walkNodes(node) {
	var els = node.childNodes;
	if(els) for(var i = 0; i < els.length; i++) {
		if(els[i].nodeType == 3) {
			var el = els[i];
			for(var j = 0; j < 2; j++) el.textContent = el.textContent.replace(rx,checkWord);
		} else {
			if(els[i].nodeName.toLowerCase() != 'textarea') walkNodes(els[i]);
		}
	}
}

if (rx.test(document.body.innerText)) walkNodes(document.body);
