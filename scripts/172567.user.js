// ==UserScript==
// @name           Convert Jyutping to Yale
// @description    Converts Cantonese transcription into Yale
// @author         Your Name
// @include        http://*tatoeba.org/*
// @version        1.0
// ==/UserScript==

function normalize_tone_numbers(transcription) {
	var res = transcription;
	
	res = res.replace(/¹/g, '1');
	res = res.replace(/²/g, '2');
	res = res.replace(/³/g, '3');
	res = res.replace(/⁴/g, '4');
	res = res.replace(/⁵/g, '5');
	res = res.replace(/⁶/g, '6');
	
	return res;
}

function jyutping_to_yale(jyut) {
	var yale = jyut;
	
	yale = yale.replace(/aa([1-6¹²³⁴⁵⁶])/g, 'a$1');
	yale = yale.replace(/Jyu/g, 'Yu');
	yale = yale.replace(/jyu/g, 'yu');
	yale = yale.replace(/J/g, 'Y');
	yale = yale.replace(/j/g, 'y');
	yale = yale.replace(/C/g, 'Ch');
	yale = yale.replace(/c/g, 'ch');
	yale = yale.replace(/Z/g, 'J');
	yale = yale.replace(/z/g, 'j');
	yale = yale.replace(/Oe|Eo/g, 'Eu');
	yale = yale.replace(/oe|eo/g, 'eu');

	return yale;
}

var yale_vowels = {
	'a': ['a', 'à', 'á', 'ā'],
	'e': ['e', 'è', 'é', 'ē'],
	'i': ['i', 'ì', 'í', 'ī'],
	'o': ['o', 'ò', 'ó', 'ō'],
	'u': ['u', 'ù', 'ú', 'ū'],
	'A': ['A', 'À', 'Á', 'Ā'],
	'E': ['E', 'È', 'É', 'Ē'],
	'I': ['I', 'Ì', 'Í', 'Ī'],
	'O': ['O', 'Ò', 'Ó', 'Ō'],
	'U': ['U', 'Ù', 'Ú', 'Ū']
};

var syllabic_nasals = {
	'm': ['m', 'm̀', 'ḿ', 'm̄'],
	'ng': ['ng', 'ǹg', 'ńg', 'n̄g'],
	'M': ['M', 'M̀', 'Ḿ', 'M̄'],
	'Ng': ['Ng', 'Ǹg', 'Ńg', 'N̄g']
}

// Skipped tone is useful for CantoDict-like transcriptions such as naam4 yan4*2 → nàahmyán
// This simplified version DOESN’T insert apostrophes, since Tatoeba writes everything with a space
function yale_numbers_to_diacr_callback(match, syllable, skipped_tone, tone) {
	var tone_marks = [0, 3, 2, 0, 1, 2, 0];
	var mark = tone_marks[tone];
	
	var matched = syllable.match(/([^aeiouAEIOU]*)([aeiouAEIOU])([aeiouAEIOU]*)(.*)/);
	if (matched) {
		var marked_vowel = yale_vowels[matched[2]][mark];
		var last_part = (matched.length >= 5) ? matched[4] : '';
		
		return matched[1] + marked_vowel + matched[3] + (tone > 3 ? 'h' : '') + last_part;
	}
	else if (syllable in syllabic_nasals) {
		return syllabic_nasals[syllable][mark] + (tone > 3 ? 'h' : '');
	}
	else {
		return 'ERROR[' + match + ']';
	}
}

function yale_numtodia(yale) {
	return yale.replace(/([A-Za-z]*)([1-6\/*]+)?([1-6])/g, yale_numbers_to_diacr_callback);
}

function fix_tatoeba_ng4(yale) {
	return yale.replace(/\bng4/g, 'm4');
}

function jyutping_to_yalenum(jyut) {
	return yale_numtodia(fix_tatoeba_ng4(normalize_tone_numbers(jyutping_to_yale(jyut))));
}

function convert_romanisations(romanisations) {
	for (var i = 0; i < romanisations.length; i++) {
		romanisations[i].innerHTML =
	                  '<span style="font-family: \'DejaVu Serif\', \'Cambria\', \'Arial Unicode MS\';">'
                          + jyutping_to_yalenum(romanisations[i].innerHTML) + '</span>';
	}
}

function get_romanisations(sentences) {
	var romanisations = [];
	
	for (var i = 0; i < sentences.length; i++) {
		var found = sentences[i].getElementsByClassName('romanization');
		for (var j = 0; j < found.length; j++) {
			romanisations[romanisations.length] = found[j];
		}
	}
	
	return romanisations;
}

function filter_only_cantonese_sentences(sentences) {
	var cantonese = [];
	
	for (var i = 0; i < sentences.length; i++) {
		var imgs = sentences[i].getElementsByTagName('img');
		if (imgs && imgs.length >= 1) {
			for (var j = 0; j < imgs.length; j++) {
				if (imgs[j].src.match(/\/img\/flags\/yue.png/)) {
					cantonese[cantonese.length] = sentences[i];
					break;
				}
			}
		}
	}
	return cantonese;
}

function convert_cantonese() {
	convert_romanisations(get_romanisations(filter_only_cantonese_sentences(document.getElementsByClassName('sentence'))));
}

convert_cantonese();