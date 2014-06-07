// ==UserScript==
// @name		Nextdoc Fragensammlung Interface
// @namespace	fragensammlung@nextdoc
// @include		file:///*
// @include		http://www.nextdoc.at/node*
// @include		http://www.nextdoc.at/fragensammlung*
// @include		http://notepad.cc/*
// @require		http://code.jquery.com/jquery-1.9.1.min.js
// @require		https://jquery-json.googlecode.com/files/jquery.json-2.2.js	   
// @require		https://raw.github.com/brandonaaron/livequery/master/jquery.livequery.js
// @grant		GM_getValue
// @grant		GM_setValue
// @version		2.1
// ==/UserScript==

// damit Greasemonkey offline files erkennt, in "about:config" (in die adressleiste eingeben) nach "greasemonkey.fileIsGreaseable" suchen und auf "true" setzen (per doppelklick)


$(document).ready(main);

function main() {

	// http://hungred.com/how-to/tutorial-create-simple-vibrate-effect-form-box-jquery/
	// adapted for horizontal buzz only, added topPos = 0;
	// A minor modification by Kishore Nallan (kishore.nc [(at)] gmail . com)
	// See Line 47
	/**
	 * Vibrate 1.0
	 *
	 * Makes an element vibrate
	 *
	 * Usage: jQuery('#my-annoying-ad').vibrate();
	 *
	 * @class vibrate
	 * @param {Object} conf, custom config-object
	 *
	 * Copyright (c) 2008 Andreas Lagerkvist (andreaslagerkvist.com)
	 * Released under a GNU General Public License v3 (http://creativecommons.org/licenses/by/3.0/)
	 */
	jQuery.fn.vibrate = function (conf) {
		var config = jQuery.extend({
			speed: 30,
			duration: 2000,
			frequency: 10000,
			spread: 3
		}, conf);
		return this.each(function () {
			var t = jQuery(this);
			var vibrate = function () {
					var topPos = Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);
					topPos = 0;
					var leftPos = Math.floor(Math.random() * config.spread) - ((config.spread - 1) / 2);
					var rotate = Math.floor(Math.random() * config.spread - (config.spread - 1) / 2); // cheers to erik@birdy.nu for the rotation-idea
					t.css({
						position: 'relative',
						left: leftPos + 'px',
						top: topPos + 'px',
						WebkitTransform: 'rotate(' + rotate + 'deg)'
					});
				};
			var doVibration = function () {
					var vibrationInterval = setInterval(vibrate, config.speed);
					var stopVibration = function () {
							clearInterval(vibrationInterval);
							t.css({
								position: 'static'
							});
						};
					setTimeout(stopVibration, config.duration);
				};
			/*
			Mofication by Kishore - I am commenting out the following line as it calls the vibration function repeatedly.
			We need to call it only once. So, instead I make a call to doVibration() directly.
			*/
			//setInterval(doVibration, config.frequency);
			doVibration();
		});
	};

	vibrate_conf = {
		frequency: 5000,
		spread: 5,
		duration: 600
	};

/*!
* jQuery.selection - jQuery Plugin
*
* Copyright (c) 2010-2012 IWASAKI Koji (@madapaja).
* http://blog.madapaja.net/
* Under The MIT License
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function($, win, doc) {
	/**
* 要素の文字列選択状態を取得します
*
* @param {Element} element 対象要素
* @return {Object} return
* @return {String} return.text 選択されている文字列
* @return {Integer} return.start 選択開始位置
* @return {Integer} return.end 選択終了位置
*/
	var _getCaretInfo = function(element){
		var res = {
			text: '',
			start: 0,
			end: 0
		};

		if (!element.value) {
			/* 値がない、もしくは空文字列 */
			return res;
		}

		try {
			if (win.getSelection) {
				/* IE 以外 */
				res.start = element.selectionStart;
				res.end = element.selectionEnd;
				res.text = element.value.slice(res.start, res.end);
			} else if (doc.selection) {
				/* for IE */
				element.focus();

				var range = doc.selection.createRange(),
					range2 = doc.body.createTextRange(),
					tmpLength;

				res.text = range.text;

				try {
					range2.moveToElementText(element);
					range2.setEndPoint('StartToStart', range);
				} catch (e) {
					range2 = element.createTextRange();
					range2.setEndPoint('StartToStart', range);
				}

				res.start = element.value.length - range2.text.length;
				res.end = res.start + range.text.length;
			}
		} catch (e) {
			/* あきらめる */
		}

		return res;
	};

	/**
* 要素に対するキャレット操作
* @type {Object}
*/
	var _CaretOperation = {
		/**
* 要素のキャレット位置を取得します
*
* @param {Element} element 対象要素
* @return {Object} return
* @return {Integer} return.start 選択開始位置
* @return {Integer} return.end 選択終了位置
*/
		getPos: function(element) {
			var tmp = _getCaretInfo(element);
			return {start: tmp.start, end: tmp.end};
		},

		/**
* 要素のキャレット位置を設定します
*
* @param {Element} element 対象要素
* @param {Object} toRange 設定するキャレット位置
* @param {Integer} toRange.start 選択開始位置
* @param {Integer} toRange.end 選択終了位置
* @param {String} caret キャレットモード "keep" | "start" | "end" のいずれか
*/
		setPos: function(element, toRange, caret) {
			caret = this._caretMode(caret);

			if (caret == 'start') {
				toRange.end = toRange.start;
			} else if (caret == 'end') {
				toRange.start = toRange.end;
			}

			element.focus();
			try {
				if (element.createTextRange) {
					var range = element.createTextRange();

					if (win.navigator.userAgent.toLowerCase().indexOf("msie") >= 0) {
						toRange.start = element.value.substr(0, toRange.start).replace(/\r/g, '').length;
						toRange.end = element.value.substr(0, toRange.end).replace(/\r/g, '').length;
					}

					range.collapse(true);
					range.moveStart('character', toRange.start);
					range.moveEnd('character', toRange.end - toRange.start);

					range.select();
				} else if (element.setSelectionRange) {
					element.setSelectionRange(toRange.start, toRange.end);
				}
			} catch (e) {
				/* あきらめる */
			}
		},

		/**
* 要素内の選択文字列を取得します
*
* @param {Element} element 対象要素
* @return {String} return 選択文字列
*/
		getText: function(element) {
			return _getCaretInfo(element).text;
		},

		/**
* キャレットモードを選択します
*
* @param {String} caret キャレットモード
* @return {String} return "keep" | "start" | "end" のいずれか
*/
		_caretMode: function(caret) {
			caret = caret || "keep";
			if (caret == false) {
				caret = 'end';
			}

			switch (caret) {
				case 'keep':
				case 'start':
				case 'end':
					break;

				default:
					caret = 'keep';
			}

			return caret;
		},

		/**
* 選択文字列を置き換えます
*
* @param {Element} element 対象要素
* @param {String} text 置き換える文字列
* @param {String} caret キャレットモード "keep" | "start" | "end" のいずれか
*/
		replace: function(element, text, caret) {
			var tmp = _getCaretInfo(element),
				orig = element.value,
				pos = $(element).scrollTop(),
				range = {start: tmp.start, end: tmp.start + text.length};

			element.value = orig.substr(0, tmp.start) + text + orig.substr(tmp.end);

			$(element).scrollTop(pos);
			this.setPos(element, range, caret);
		},

		/**
* 文字列を選択文字列の前に挿入します
*
* @param {Element} element 対象要素
* @param {String} text 挿入文字列
* @param {String} caret キャレットモード "keep" | "start" | "end" のいずれか
*/
		insertBefore: function(element, text, caret) {
			var tmp = _getCaretInfo(element),
				orig = element.value,
				pos = $(element).scrollTop(),
				range = {start: tmp.start + text.length, end: tmp.end + text.length};

			element.value = orig.substr(0, tmp.start) + text + orig.substr(tmp.start);

			$(element).scrollTop(pos);
			this.setPos(element, range, caret);
		},

		/**
* 文字列を選択文字列の後に挿入します
*
* @param {Element} element 対象要素
* @param {String} text 挿入文字列
* @param {String} caret キャレットモード "keep" | "start" | "end" のいずれか
*/
		insertAfter: function(element, text, caret) {
			var tmp = _getCaretInfo(element),
				orig = element.value,
				pos = $(element).scrollTop(),
				range = {start: tmp.start, end: tmp.end};

			element.value = orig.substr(0, tmp.end) + text + orig.substr(tmp.end);

			$(element).scrollTop(pos);
			this.setPos(element, range, caret);
		}
	};

	/* jQuery.selection を追加 */
	$.extend({
		/**
* ウィンドウの選択されている文字列を取得
*
* @param {String} mode 選択モード "text" | "html" のいずれか
* @return {String} return
*/
		selection: function(mode) {
			var getText = ((mode || 'text').toLowerCase() == 'text');

			try {
				if (win.getSelection) {
					if (getText) {
						// get text
						return win.getSelection().toString();
					} else {
						// get html
						var sel = win.getSelection(), range;

						if (sel.getRangeAt) {
							range = sel.getRangeAt(0);
						} else {
							range = doc.createRange();
							range.setStart(sel.anchorNode, sel.anchorOffset);
							range.setEnd(sel.focusNode, sel.focusOffset);
						}

						return $('<div></div>').append(range.cloneContents()).html();
					}
				} else if (doc.selection) {
					if (getText) {
						// get text
						return doc.selection.createRange().text;
					} else {
						// get html
						return doc.selection.createRange().htmlText;
					}
				}
			} catch (e) {
				/* あきらめる */
			}

			return '';
		}
	});

	/* selection を追加 */
	$.fn.extend({
		selection: function(mode, opts) {
			opts = opts || {};

			switch (mode) {
				/**
* selection('getPos')
* キャレット位置を取得します
*
* @return {Object} return
* @return {Integer} return.start 選択開始位置
* @return {Integer} return.end 選択終了位置
*/
				case 'getPos':
					return _CaretOperation.getPos(this[0]);
					break;

				/**
* selection('setPos', opts)
* キャレット位置を設定します
*
* @param {Integer} opts.start 選択開始位置
* @param {Integer} opts.end 選択終了位置
*/
				case 'setPos':
					return this.each(function() {
						_CaretOperation.setPos(this, opts);
					});
					break;

				/**
* selection('replace', opts)
* 選択文字列を置き換えます
*
* @param {String} opts.text 置き換える文字列
* @param {String} opts.caret キャレットモード "keep" | "start" | "end" のいずれか
*/
				case 'replace':
					return this.each(function() {
						_CaretOperation.replace(this, opts.text, opts.caret);
					});
					break;

				/**
* selection('insert', opts)
* 選択文字列の前、もしくは後に文字列を挿入えます
*
* @param {String} opts.text 挿入文字列
* @param {String} opts.caret キャレットモード "keep" | "start" | "end" のいずれか
* @param {String} opts.mode 挿入モード "before" | "after" のいずれか
*/
				case 'insert':
					return this.each(function() {
						if (opts.mode == 'before') {
							_CaretOperation.insertBefore(this, opts.text, opts.caret);
						} else {
							_CaretOperation.insertAfter(this, opts.text, opts.caret);
						}
					});

					break;

				/**
* selection('get')
* 選択されている文字列を取得
*
* @return {String} return
*/
				case 'get':
				default:
					return _CaretOperation.getText(this[0]);
					break;
			}

			return this;
		}
	});
})(jQuery, window, window.document);
	
	jonathan = {
	'BeiderDemenzvomAlzheimertypisteinNeurotransmittersystembeson':	'<p>Alzheimerdemenz ist die häufigste Form (60-80%), hat neuropathologisch Tau-Protein und Beta- Amyloidablagerungen (auch im Liquor). Der ACh-Gehalt ist um 30-75% vermindert und bei 30-80% gibt es Neuronenverlust im Nucl. Basalis Meynert. Risikofaktoren sind Alter, Genetik (<10%), Apolipoprotein E, f:m 2:1, diverse cardiovaskuläre Erkrankungen. Klinik sind Gedächtnis und Denkstörungen beim bewusstseinsklaren Pat., ein schleichend progredienter Verlauf, Funktionseinbußen (Familie, sozial, Beruf) und Symptome > 6 Monate. Neben der Störung des episodischen Neugedächtnisses gibt es noch Sprachstörung (Verarmung an Inhalt bis zum Mutismus), Apraxie (zuerst beim Kochen, Autofahren, dann Anziehen,..) und andere kognitive Probleme sowie psychomotorische Unruhe, Depression und Verwirrtheit. Diagnostik mit MMSE, Papier-Bleistift-Tests, CCT/MRT (Ausschluss von Läsionen!), SPECT (zuerst Hypometabolismus, dann Minderperfusion temporo-parietal). </p><p><b>DD:</b>  sind Mild Cognitive Impairment (Vorstufe bei 15%), Depressionen (25% Pseudodemenz), Verwirrtheit (kommt akut und wird rasch schlechter), sekundäre Demenz (hirnorganische Schädigung, iatrogen, Alkohol,…). </p><p><b>Therapie:</b> zuerst Cholinesterasehemmer (MMSE 10-26, aber auch <10 nicht absetzen), dann Memantin (Glutamatrezeptorantagonist, MMSE 11-19) dann Nootropika (Verbessern Metabolismus im Gehirn) wie Cerebrolysin und Ginkgo biloba. Jede Therapie (außer bei NW) min 3 Monate probieren, Kombinationstherapie möglich. Cholinesterasehemmer und Memantin wirken auch bei Verhaltensauffälligkeiten, psychotischen Symptomen und Exazerbationen (Risperidon erst spät geben), eine ev. Depressio mit SSRIs, Agitiertheit vorsichtig! mit Benzos. Ferner auch nicht-medikamentöse Therapien und Schulung der Angehörigen.</p>',
	'Beieinem74jhrigenPatiententretenseitmehralseinemJahrzunehmen':	'<p>Wird vor allem im Frühstadium verwendet (regionaler Hypometabolismus), im fortgeschrittenem Stadium Minderperfusion temporo-parietal im SPECT.</p>',
	'DiehufigsteDemenzformistdieAlzheimerdemenzWelchesistdiezweit':	'<p>Alzheimer-Demenz 60-80%, Vaskuläre Demenz 10-25%, Lewy-Körperchen-Demenz 7-20%; viele Mischformen. Vorstufe = Mild Cognitive Impairment (MMSE>26) → 15% haben Demenz innerhalb eines Jahres. 25% der mit Demenz zugewiesenen Patienten haben eine depressive Pseudodemenz.</p>',
	'DieVerteilungderHufigkeitderverschiedenenDemenzformenkannsob':	'<p>DD der Demenzformen: normaler Status → Alzheimer, Pyramidenbahnzeichen/Demenz/Spastik → Vaskuläre Demenz, Parkinsonoid → Lewy-Body-Demenz; Frontalzeichen → Frontale Demenz (Pick)</p>',
	'Ein63jhrigerPatientwirdwegenzunehmenderGedchtnisstrungkognit':	'<p>Ist eine frontale Demenz, tritt zwischen 40-60a auf, nach 10a ist der Pat. tot, familiär gehäuft; hat Verhaltensstörungen und Vergröberung des Sozialverhaltens sowie Persönlichkeitsveränderungen (kommen erst spät bei Alzheimer-Demenz). </p><p><b>Therapie:</b> kausal nicht möglich, SSRIs gegen affektive Symptome.</p>',
	'BeiderKontrolluntersuchungberichteteine60jhrigePatientindies':	'<p>Bradykinese + Ruhetremor und/oder Rigor und/oder Haltungsinstabilität = Parkinson. 1-2% >60a,</p>',
	'Beieinem56jhrigenPatientenwirdklinischeinbilateralesParkinso':	'<p>Im Beta-CIT SPECT (oder FP-CIT SPECT) werden die Dopamintransporter im Striatum spezifisch markiert und damit die Dichte der dopaminergen, Nervenendigungen gemessen. Das Ausmaß der Minderspeicherungen korreliert mit dem Schweregrad des klinischen Bildes.</p>',
	'Beieinem64jhrigenPatientenmitgeringlinksbetontemRuhetremorHy':	'<p>Äquivalenztyp → alles etwa gleich ausgeprägt; tremordominanter Typ → Ruhetremor!, akinetisch- rigider Typ → vor allem verringertes Mitschwingen der Arme, vornübergebeugte Haltung, Sturzgefahr.</p>',
	'Beieinem64jhrigenPatientenwurdeeinbeginnendeslinksbetontesPa':	'<p>Durch den Rigor kommt es zu schmerzhaften Bewegungseinschränkungen und Muskelverspannungen die oft als Rückenschmerzen bzw rheumatische Beschwerden behandelt werden. Auch eine zuerst auftretende Depressio und der halbseitige Beginn führen zunächst auf die falsche Spur.</p>',
	'BeieinerdenovoParkinsonpatientinzeigtsichinderklinischenUnte':	'<p>Oder Ruhetremor, Bradykinese, Vornübergebeugte Haltung, schmalbasig,…</p>',
	'BeijngerenParkinsonpatientenwerdenalsErsteinstellungDopaminA':	'<p>In der Langzeittherapie mit L-DOPA kommts nämlich zu Dyskinesien und fluktuierender OFF- Symptomatik bzw wearing off. Deshalb L-DOPA mit Decarboxylase-Hemmer geben, damit es peripher weniger abgebaut wird → wirkt besser → weniger L-DOPA nötig → längere Zeit bis zu den NW. SIP6-Fragen 2007-2010 4 4</p>',
	'Ein82jhrigerPatientmitbekanntemParkinsonsyndromseit15Jahrenl':	'<p>DOPA-Psychosen treten bei 10-30% der Pat auf. Ferner gibt’s Übelkeit, Erbrechen, Orthostase, Schwindel, Harndrang, Herzrhythmusstörungen, Wirkverlust tritt nach 3-4 Jahren ein und macht dann das wearing- off.</p>',
	'Ein82jhrigerPatientmitParkinsonsyndromseit15Jahrenleidetunte':	'<p>Man kann es in vielen Einzeldosen geben, weil es nur 2h HWZ hat. Da die Dystonien immer bei sinkenden DOPA-Spiegeln auftreten kann man sie damit genauso wie das wearing-off verbessern. Die Dyskinesien treten bei zu hohen Spiegeln auf!</p>',
	'EinAssistenzarztberichtetderPrimariaberdieSymptomeeines60jhr':	'<p>Haltungsinstabilität, Psychose, Demenz, Depressio, gestörte Stellreflexe, Hypomimie/Amimie (Masken/Salbengesicht), Dysarthrie,…</p>',
	'EineneudiagnostizierteParkinsonpatientinfragtSienachderUrsac':	'<p>Degeneration der dopaminergen Neurone der pars compacta der Substantia nigra.</p>',
	'Eine34jhrigePatientinkommtwegenZitternsbeiderHndeinIhreOrdin':	'<p>Morbus Wilson kann nämlich jede Art von Tremor machen sowie Bradykinese, Rigor, Dysarthrie und PSYCHIATRISCHE Symptome</p>',
	'Ein23jhrigerMannkommtwegenUnsicherheitbeimGehenindieAmbulanz':	'<p>3:100000 → häufigste erbliche Ataxie, autosomal rezessiv (gesunde Überträger). Mutation im Frataxin- Gen mit gehäuften GAA-Repeats (gesund 6-9, krank ab 35 meist 90-2000, je mehr desto schlimmer.) Symptomatik beginnt zwischen 8-15a (spätestens 25a) mit Stand-/Gangataxie mit Intentionskomponente und Verlust der Tiefensensibilität, später OE → Dysarthrie → Dysphagie →Atrophien; nach 11a Rollstuhl, nach 35a tot; Friedreich- Hohlfuß, 20% D.M., 70% obstruktive CMP</p>',
	'Beieinem8jhrigenKnabenwurdeeineAbsencenepilepsiemittypischem':	'<p>Die Epilepsie des Schulalters ist die Absence-Epilepsie, bei der 100% Absencen haben und 10-15% auch einen Absencen-Status erreichen. Therapie ist Valproat und in weiterer Linie Ethosuximid, Lamotrigin und Benzos. 65% der Pat sind langfristig anfallsfrei.</p>',
	'Ein20jhrigerPatientleidetseitmehrerenJahrenaneinermesialenTe':	'<p>Fokal = am Temporallappen, komplex = mit Bewusstseinsstörung; Kauen und Schmatzen = temporal; Therapie wäre primär Carbamazepin; die mesiale Temporallappenepilepsie ist die häufigste aller E.-Formen und basiert auf einer mesialen temporalen Sklerose (Hippokampussklerose); oft gab es früher komplexe Fieberkrämpfe bei den Pat, und sie manifestiert sich dann später ohne Fieber. Nach anfangs guter Therapierbarkeit werden 50-80% refraktär. Auren gibt es bei 90% der Anfälle und 60% sind sekundär generalisiert tonisch-klonisch.</p>',
	'Ein24jhrigerPatientmiteinerjahrelangmedikamentsintraktablenm':	'<p>Um eine Epilepsiechirurgie bekommen zu dürfen braucht man medikamentöse Therapieresistenz (zwei Monotherapien bis zur max. tolerierten Dosis und eine Polytherapie) und eine operativ behandelbare E.-Form. Präoperativ braucht man Video-EEG-Monitoring, neuropsychologische Tests, MRT (optional PET u.a.). Sind die inkonklusiv braucht man intrakraniell platzierte Elektroden für eine exakte Abklärung.</p>',
	'Ein25jhrigerPatientwurdebeieinemepileptischenAnfallbeobachte':	'<p>Partiell = fokal, komplex = Bewusstseinsstörung. Grand Mal hat tonisch-klonische Komponente. Partiell hat psychomotorische Anfälle.</p>',
	'Ein65jhrigerPatienterleidetausvollerGesundheiteinenrechtshir':	'<p>Symptomatisch = mesiale + läsionelle → es gibt im MRT ein sichtbares Korrelat. Kryptogen → es wird eine Läsion vermutet. Idiopathisch sind nur die familiäre mesiale und die autosomal dominante laterale Temporallappenepilepsie.</p>',
	'EinJournalistausIhremBekanntenkreissollberdieEpilepsieerkran':	'<p>Hier die Daten aus dem Zeiler: Die Inzidenz liegt bei 24-53/100000 für eine Epilepsie und bei 26- 70/100000 für den ersten unprovozierten Anfall. Die Prävalenz liegt bei 500-900/100000 (rechnet man das in Prozent um und nimmt die Mitte, kommt man genau auf 0,7%)</p>',
	'EinneudiagnostizierterEpilepsiepatientsollaufCarbamazepinein':	'<p>65% anfallsfrei und später kann die Therapie abgesetzt werden. 35% chronisch, davon 20% längere Zeit anfallsfrei. Prognostisch schlecht: niedriges Alter bei 1.Anfall (besonders schlecht <1a), symptomatische E., strukturelle Läsion, hohe Anzahl von Anfällen. Mortalität ist 2-3x die von Gesunden.</p>',
	'EinePatientinmitmehrerenintracerebralenMetastaseneinesBronch':	'<p>Status epilepticus gilt ab 30min mit durchgehender Aktivität oder mehreren Anfällen ohne, dass der Pat. das Bewusstsein wieder erlangt. Ab 30min werden neuronale Schäden erwartet. In der Klinik spätestens nach 5 Min diagnostizieren und therapieren, weil frühere Therapie besser wirkt. Unterschied zu generalisierten klonisch- tonischen Anfällen: dauern selten > 2min. </p><p><b>Therapie:</b> Benzos iv. wenn möglich, sonst i.m./rektal(im Notfall); dann Glucose und Thiamin i.v.. CAVE: Benzos wirken nur in 80% d. Fälle und man muss sobald sie wirken Phenytoin oder Valproat dazugeben, weil sonst 50% ein Anfallsrezidiv nach 20-30min bekommen. Reicht das auch nicht geht’s ab auf die Intensiv und es gibt Intubation + Barbiturate sowie ein EEG-Monitoring.</p>',
	'Ein65jhrigerPatienterleidetausvollerGesundheiteineneinmalige':	'<p>Als E. gilt es erst, wenn wiederholte, nicht-provozierte Anfälle auftreten. Risiko dafür: 33% beim Erwachsenen und 42-54% beim Kind.</p>',
	'Eine34jhrigePatientinmitbekannterEpilepsieerleideteinenGrand':	'<p>(Zeit selbst hinzugefügt, weil im Originaldokument nicht lesbar; es kann eigentlich nur eine halbe Minute gemeint sein). Ein Grand-Mal beginnt mit Aura, dann Initialschrei, tonische Phase, dann klonische Phase 1- 2min, Bewusstseinsstörung für ca. 10min, dann Terminalschlaf.</p>',
	'Ein55jhrigerPatientistaufMarcoumareingestelltErerwachteheute':	'<p>Versorgt Hüftbeuger und Kniestrecker → Stiegensteigen unmöglich.</p>',
	'Ein40jhrigerPatientklagtseiteinemMotorradunfallbereineSchwch':	'<p>Ist die häufigste periphere Nervenläsion in Friedenszeiten. N.ulnaris versorgt auch die ganzen Mm. Interossei, deshalb kann er seine Finger nicht spreizen. Um das sensible Versorgungsgebiet zu finden, braucht man sich nur hinter dem „narrischen Bein“ am medialen Oberarm hineinzuschnipsen und man spürt ganz genau im Versorgungsgebiet des Ulnaris ein Kribbeln. Traumatisch bei Ellenbogenluxation</p>',
	'Eine55jhrigePatientinhatseiteinemAufenthaltanderIntensivstat':	'<p>Ausfall führt zur Fallhand, weil man die Hand nicht mehr Strecken kann und man spürt auch nichts mehr am Handrücken. Ursachen sind HumerusSCHAFTfraktur, Drucklähmung (Krückenlähmung, Schlaflähmung, durch Lagerung in Narkose), Parkbanklähmung (Kopf liegt beim Schlafen am Oberarm). Spezialform ist das Supinatorsyndrom, das durch Hypertrophie des M.supinator passiert → partielle Fallhand ulnarseitig</p>',
	'Beieiner37jhrigenPatientinfindetsicheineSchwchefrdasBeugende':	'<p>Pronatoren und Fingerbeuger 1-3 fallen aus → Schwurhand, außerdem kann der Daumen nicht opponiert werden, Thenaratrophie (Affenhand). Ursachen sind eine distale Humerusfraktur, Paralysie des amants (Lähmung der Liebenden) durch Kopf des Partners auf der Innenseite des Oberarms, Druckläsion in der Hohlhand durch Werkzeuggebrauch, Suizidversuche am Handgelenk; Ist auch der Betroffene des Karpaltunnelsyndroms → das Retinaculum flexorum wird dem Nerven zu eng. Ursachen: entzündlich, traumatisch, Repetitive Strain Injury (z.B. Sekretärinnen), Schwangerschaft</p>',
	'Eine33jhrigePatientinmitkomplikationsloserSchwangerschaftent':	'<p>Ödem im Karpaltunnel → wird zu eng → CTS → nächtliche Schiene OP ab Stadium II - Taubheitsgefühl indiziert. Tinel-Hoffmann-Zeichen → Dysästhesie durch Beklopfen des Karpaltunnels. Hat nächtliche bis zur Schulter ausstrahlende Schmerzen. Komplikation ist die Thenaratrophie.</p>',
	'Eine43jhrigePatientinhatseit3WochenheftigeSchmerzeninderrech':	'<p>Es ist ja auch nur der distale Anteil des Medianus betroffen.</p>',
	'Beieiner46jhrigenPatientintratenvor2TagenheftigeRckenschmerz':	'<p>Heftige, ausstrahlende Schmerzen sprechen mal für eine radikuläre Symptomatik, die Schwäche beim Hinaufsteigen auf einen Sessel für Kniestrecker (L4) und das Ganze ist natürlich ipsilateral. </p><p><b>DD:</b>  N.femoralis – der hätte aber Schmerzen im Verlauf des Nerven und nicht im Rücken.</p>',
	'Beieiner50jhrigenPatientintratenvor4TagenheftigeRckenschmerz':	'<p>Zehenheber, Lasegue, Schmerzen Unterschenkelaußenseite; Fersengang sollte eingeschränkt/unmöglich sein</p>',
	'Beieinem38jhrigenPatientenmitchronischerLumbagoinderAnamnese':	'<p>Kein Zehenspitzengang möglich = S1; man könnte auch sagen, dass die Plantarflexion ausgefallen ist, ASR abgeschwächt, Lasegue positiv.</p>',
	'Beieinem45jhrigenPatientenmitchronischemHalswirbelsulenschme':	'<p>An der Hand: Daumen = C6, 2-4 = C7, Kleinfinger = C8; Am Arm: C5 = deltoideus, C6 = biceps, C7 = Trizeps, C8 = kleine Handmuskeln + Triceps</p>',
	'EinPatientkommtwegenaufsteigenderdistalbetonterSchwchebeider':	'<p>PNP kommt meist durch chronische Schädigung bei Diabetikern und Alkoholikern, Vit B1/6/12-Mangel, Malresorption oder toxisch (Schwermetalle). Die nächsthäufigsten sind AIDP (Guillain-Barré = GBS), CIDP, Polyradiculitis nach Borreliose.</p>',
	'Ein46jhrigerPatiententwickeltenebenDyssthesieninnerhalbvon2T':	'<p>Eine Polyradiculitis ist meist ein GBS, oder nach Borrelieninfektion oder seltener auch viral. Wenn wir eine CIDP vermuten, dann auch Glucocorticoide und ev. Immunsuppression. Mit IVIG und Plasmapherese (oder ev. Immunapherese) ist man, auf der sichereren Seiten.</p>',
	'Eine38jhrigePatientinzeigteineinnerhalbvonStundenaufsteigend':	'<p>Dramatische Verlaufsform eines GBS. Liquorbefund mit exzessiv erhöhtem Eiweiß (und ev. minimal Lymphozyten) kann auch erst nach 1-2 Wochen auftreten → ev.Kontrollpunktion.</p>',
	'Eine71jhrigePatientinwurdewegenaufsteigenderschlafferTetrapa':	'<p>Autoimmun = GBS, tritt häufig 2-10d nach durchgemachter Infektion des G-I-Trakt oder Respirationstrakt auf.</p>',
	'Eine62jhrigePatientinwirdwegeneineraufsteigendenschlaffenPar':	'<p>Wegen der möglichen vegetativen Entgleisung der Herzfrequenz und der Ateminsuffizienz.</p>',
	'BeieinerPatientinbestehteineSyringomyeliemitdissozierterSens':	'<p>Eine Syringomyelie ist eine Höhlenbildung meist im HWS/oberen BWS-Bereich und schädigt die Commissura alba, wo die Fasern für Schmerz und Temperatur kreuzen. Hinterstränge bleiben intakt → In der Höhe der Schädigung beidseits Temp/Schmerz aufgehoben.</p>',
	'Eineschwangere17jhrigePatientinmitarteriellerHypertonieundPr':	'<p>Hypertonie + Proteinurie > 0,3g/d = Präeklampsie(>5g + Endorganschäden = schwere Form); kommen tonisch-klonische Anfälle dazu ist es Eklampsie. Die muss aber nicht auftreten und kann auch ohne Präeklampsie auftreten. </p><p><b>Therapie:</b> Behandlung der Hypertonie (alpha-Methyl-Dopa, Dihydralazin, Labetolol); bei Eklampsie Mg++ iv 1-3g, wenn es nicht ausreicht Diazepam 10-20mg langsam i.v. → rasche Entbindung weil Mortalität 5% für Mutter und 50% für Kind!</p>',
	'Eine29jhrigePatientinmitproblemloserSchwangerschaftohneRisik':	'<p>Bei Schwangeren eigentlich kein CT nur MRT – auch akut – diese Pat. hat aber schon entbunden, deshalb natürlich CT; Heparin, ASS nur bis 150 mg und nur im 2./3.Trimenon. Bei einer SAB OP des Aneurysmas schon während der Schwangerschaft. Sinusvenenthrombose ist typischerweise im Puerperium</p>',
	'BeieinemakutenMultipleSkleroseSchubeiner28jhrigenPatientinko':	'<p>Kann nach 2-3 Wochen wiederholt werden; im schweren Schub ev. auch Plasmapherese.</p>',
	'DieimmunmodulativeTherapiemitBetainterferonoderGlatirameraze':	'<p>Klar – was soll eine MS-Prophylaxe sonst machen; laut Zeiler wird die Schubrate um ein Drittel reduziert und es gibt einen geringen positiven Effekt auf die neurologische Behinderung der Patienten. SIP6-Fragen 2007-2010 10 10</p>',
	'DiewichtigstenErgebnissefrdieDiagnoseeinerMultiplenSklerosen':	'<p>für die primär progrediente MS(15%) braucht man eine kontinuierliche klinische Verschlechterung über mindestens ein Jahr. Für die schubhafte MS eine Dissemination in Raum und Zeit (sonst gilt sie anfangs als CIS = klinisch isoliertes Syndrom, außer der Liquor ist auch pathologisch); Im Liquor erwarten wir uns oligoklonale Banden und/oder einen erhöhten IgG-Index und/oder lymphzytäre Pleozytose</p>',
	'Ein45jhrigerPatientmitbekannterMultiplerSklerosegibtinderAna':	'<p>Anfangs sind Sehstörung häufig und man sucht die Neuritis Nervi optici („Patient sieht nichts, Arzt auch nicht“) → man sieht einen Schleier; bei Störungen der Augenmotilität (Doppelbilder!) ist an die internukleäre Ophthalmoplegie zu denken – ist neben Funktionsstörung von Sensibilität, Motorik, und Blase ebenfalls häufig.</p>',
	'Eine37jhrigeMultipleSklerosePatientinklagtbereineBlasenstrun':	'<p>Oder auch Dranginkontinenz → Inkontinenz wenn nicht rasch genug am Klo und eine häufige, aber spät diagnostizierte Sache bei MS-Patienten.</p>',
	'EinePatientinmitschubfrmigerMultiplerSklerosekanndenimmunmod':	'<p>Oder wenn das auch versagt Natalizumab (Tysabri)</p>',
	'EinePatientinmitVerdachtsdiagnoseeinerschubfrmigverlaufenden':	'<p>Also LP + MRT (mit KM)</p>',
	'EinePatientinmitVerdachtsdiagnoseeinerschubfrmigverlaufenden':	'<p>Damit man die verschieden alten Herde sehen kann.</p>',
	'BeimEintreffendesNotarzthubschrauberswarder25jhrigePatientan':	'<p>SHT leicht: bis 15min bewusstlos, Amnesie bis 1h, GCS 13-15; mittelschwer bis 6h, Amnesie bis 24h, GCS 9-12; schwer über 6 Stunden, Amnesie >24h, GCS unter 9 SIP6-Fragen 2007-2010 11 11</p>',
	'Ein20jhrigerPatientkommt4MonatenacheinemMotorradunfallmitsch':	'<p>Nach einem mittleren/schweren SHT gibt’s posttraumatisches Hirnödem, Epiduralhämatom (bei Antikoagulierten, Alkoholikern, Gerinnungsstörungen), akutes Subduralhämatom, SAB (kann bei Kindern und Alten das einzige Symptom des Traumas sein), intrazerebrales Hämatom (auch sekundär durch mehrere kleine Einblutungen = > hohe Mortalität weil bei Alten+Antikoagulierten) und den hier gefragen Hydrocephalus (H. occlusus nach Schädigung des Ventrikelsystems, H. aresorptivus nach SAB, Normaldruck-H. Wochen und Monate nach schwerem SHT); Ebenfalls steigt auch die Chance auf Epilepsie – 5% bei Hirnverletzung, 35% bei offener Hirnverletzung (gegenüber ~1% bei der Normalbevölkerung)</p>',
	'Ein35jhrigerPatientzeigt3MonatenacheinemschwerenSchdelhirntr':	'<p>Tritt nach Blutung/Meningitis oder degenerativ im höheren Lebensalter auf und hat erweiterte Ventrikel bei normalen äußeren Liquorräumen. Therapie mit LP bei der 30-40ml abgelassen werden; entweder Shunt oder intermittierende LPs alle 3-4 Monate.</p>',
	'Eine18jhrigePatientinwirdnacheinemschwerenAutounfallmitGCS5g':	'<p>Wachkoma = offene Augen, keine Blickfixation, Streckhaltung der Beine, Beuge/Streckhaltung der Arme, orale Automatismen, Störung von Atmung/Temperatur/Kreislaufregulation, Infektanfälligkeit; Tod durch Komplikationen wie Thrombosen/Infekte binnen 2-5a.</p>',
	'Eine28jhrigePatientinerlitteinenAutounfallundhateineRissquet':	'<p>Und aufnehmen tun wir sie natürlich auch.</p>',
	'Ein34jhrigerPatientistbeimRadfahrenohneHelmgestrztundhateine':	'<p>Gibt es Risikofaktoren ist eigentlich ein CT anzudenken.</p>',
	'Eine40jhrigePatientinwirdnacheinemReitunfallinderUnfallambul':	'<p>Schonung und vor allem Bettruhe sind aber nur bedingt sinnvoll und können den Verlauf verlängern.</p>',
	'Ein25jhrigerPatientwirdnacheinemschwerenAutounfallmitGCSGlas':	'<p>Atemstillstand, Koma, weite starre Pupillen, Ausfall des Kornealreflexes, fehlende Reaktion auf Schmerzreize; Hirntod bestätigt durch Nulllinien-EEG, intrazerebralen Perfusionsstillstand in der Angiographie;</p>',
	'Ein26jhrigerPatientklagtseitTagenberSchmerzattackenimGesicht':	'<p></p><p><b>DD:</b>  Trigeminusneuralgie → attackenartig, einschießend, wie Blitz, extrem starker Schmerz</p>',
	'Ein56jhrigerPatientberichtetberwieeinBlitzeinschieendeSchmer':	'<p>Ist First-Line-Therapie und wird bis ans erträgliche Maximum an NW therapiert. Danach Gapapentin, Lamotrigin, Oxcarbazepin. GLOA (ganglionäre lokale Opioid-Analgesie) und später minimal-invasive Thermokoagulation/Mikrokompression d. Ganglion Gasseri oder operativ mikrovaskuläre Dekompression.</p>',
	'Ein34jhrigersoporserPatientmitMeningismusundstarkenKopfschme':	'<p>Das Wichtige in der Frage ist „Ein … SOPORÖSER Patient…“. Quantitative Bewusstseinsstörungen: Benommenheit(verlangsamt) → Somnolenz (schläfrig) → Sopor (schwer erweckbar) → Koma.</p>',
	'Ein45jhrigerPatientklagtseitdenAbendstundenberpltzlichaufget':	'<p>Mit dem CT bewiesen, ansonsten könnte man auch eine LP machen und blutigen Liquor finden.</p>',
	'Ein40jhrigerPatientklagtseitdenAbendstundenberpltzlichaufget':	'<p>Meningismus muss nicht sein, aber „Kopfschmerz wie noch nie“, Donnerschlagkopfschmerz, peitschenschlagartig → SAB</p>',
	'Eine53jhrigePatientinerlitteineSubarachnoidalblutungmitpltzl':	'<p>25% sterben binnen 24h, 25% in 4 Wochen – meist an einer Rezidivblutung. Im Verlauf haben 30% eine Rezidivblutung, 10-20% Gefäßspasmen (vor allem Tag 4-10), 25% Hydrozephalus (occlusus oder Normaldruck-H.), Epi-Anfälle gibt’s dann auch noch.</p>',
	'Ein35jhrigerPatientwurdewegendesVerdachtsaufSubarachnoidalbl':	'<p>Deshalb sollen die Patienten auch 24h möglichst nur liegen.</p>',
	'Ein36jhrigerPatientkommtwegenzunehmenderKopfschmerzenbelkeit':	'<p>Hirndruckzeichen, erweiterte Liquorräume sprechen für einen Hydrocephalus → ist der 4.Ventrikel nicht betroffen liegt ein Aquäduktverschluss nahe (=Hydrocephalus occlusus internus) kann u.a. als Komplikation von bakterieller Meningitis und bei Pinealom auftreten.</p>',
	'Eine19jhrigebergewichtigePatientinkommtwegenseitTagenzunehme':	'<p>Ist eine Ausschlussdiagnose bei jungen adipösen Frauen und in bis zu 50%. Gehäuft bei Schwangeren und oraler Kontrazeption. Symptome sind meist holokrane Kopfschmerzen + intermittierende Sehstörungen, ev Visusverlust und Gesichtsfeldeinschränkung, dazu Schwindel, Erbrechen, beidseitige Stauungspapille; </p><p><b>Therapie:</b> wiederholte LP bis zu 50ml → dauerhafte Besserung, ev. Shunt; meist komplette Remission, 10-20% behalten die Visusbeeinträchtigung.</p>',
	'Beieiner36jhrigenPatientinmithemikranenKopfschmerzattackenmi':	'<p>Risikofaktoren familiär 50%, psychische Belastung, Erwartungsangst, Stress, Klimaeinflüsse, Genussmittel, Schlafmangel; einfache Migräne (ohne Aura), klassische mit Aura, komplizierte mit neurologischen Ausfällen; </p><p><b>Therapie:</b> Reizabschirmung (Schlaf), akut Domperidon od. Metoclopramid, NSAR (ASS, Ibuprofen, Naproxen), Triptane (Serotoninrezeptoragonisten; Sumatriptan, Zolmitriptan → Vasokonstriktion im ZNS, müssen wegen schnellem Abbaus in 30% nochmal gegeben werden); Prophylaxe: Entspannungsverfahren, Reiz-Meidung, beta-Blocker (Propanolol, Metoprolol) oder Kalziumantagonist (Flunarizin) oder Antiepileptika (Topiramat, Valproat, Gabapentin), Antidepressiva; Wirkeintritt der Prophylaxe erst nach 2-4 Wochen, es soll eine Anfallsreduktion von min 50% erreicht werden!</p>',
	'Ein58jhrigerPatientkommtwegenseit3WochenzunehmenderKopfschme':	'<p>Alter Patient, kein Trauma, langsam zunehmender Kopfschmerz und Paresen → Tu.</p>',
	'Eine35jhrigePatientinwirdmitKopfschmerzenundbeginnenderBewus':	'<p>Eine Virus-PCR wäre auch gut, würde aber zu lange dauern. </p><p><b>Therapie:</b> Acyclovir für 3 Wochen i.v. und natürlich wird sie aufgenommen.</p>',
	'Eine50jhrigePatientinwirdmitheftigenKopfschmerzenhohemFieber':	'<p>Dabei handelt es sich natürlich um eine bakterielle Meningitis.</p>',
	'BeiwelcherderfolgendenSymptomkombinationendenkenSiesofortane':	'<p>TIA oder PRIND.</p>',
	'DerPatientdermglicherweiseintravenslysiertwerdensollist70Jah':	'<p>Wenn Zeitpunkt erinnerlich und <3h (in der vorderen Zirkulation, vertebrobasilär auch länger) → Lyse.</p>',
	'Ein64jhrigerPatientkommtwegenderTriasGangstrungkognitiverAbb':	'<p>Normaldruckhydrocephalus = H. communicans = Missverhältnis von Produktion und Abfluss. Klinik: Trias: progrediente Demenz, Gangapraxie, Blasenentleerungsstörung. Diagnose mittels CT/MR mit Erweiterung der inneren Liquorräume, Therapie mittels LP.</p>',
	'Ein77jhrigerPatientmitakuterHemiplegielinkssoporserBewusstse':	'<p>KI für Lyse: Schlaganfall, Trauma, OP innerhalb der letzten 3 Mo, nicht sanierte intrakranielle Blutung, ZNS-Läsion mit hohem Blutungsrisiko. Was genau die Hypodensität da macht ist mir nicht klar – vielleicht steht die für einen alten Infarkt bzw für eine alte Blutung? Leider sagen sie ja auch nicht dazu, ob das ein CT mit oder ohne KM war.</p>',
	'Ein60jhrigerPatientberichtetbereinepltzlichaufgetreteneSchwc':	'<p>UE einseitig  + geringe Parese der ipsilateralen OE → A.c. anterior der anderen Seite; 5% aller Infarkte</p>',
	'Ein60jhrigerPatientberichtetbereinepltzlichaufgetreteneUnges':	'<p>OE li = A.c. media re, zentrale Facialisparese ipsilateral; 65% aller Infarkte</p>',
	'BeiderAufnahmeberichtetdie64jhrigePatientinmitmultiplenvasku':	'<p>Homonyme Hemianopsie zur Gegenseite (sie sieht rechts nichts → Läsion links), meist nicht reversibel, wenn beidseits → kortikale Blindheit. Das fiese: den rechten Bereich des Gesichtsfeldes decken die linken Anteile der Netzhaut ab, damit ist das Gefäßproblem eigentlich auf der gleichen Seite wie der Ausfall.</p>',
	'EinInsultimVersorgungsgebietderArteriacerebelliinferiorposte':	'<p>15% aller infarkte sind infratentoriell (=vertebrobasilär); typischerweise gekreuzte Symptomatik mit ipsilateralen Hirnnerven und Extremitäten kontralateral. Ein Insult in der A.cerebelli inferior posterior (=PICA) führt zum Wallenbergsyndrom mit ipsilateralem Drehschwindel (Spontannystagmus), Hornersyndrom, Heiserkeit, Dysarthrie, Gaumensegelparese (Kulissenphänomen), Trigeminushypästhesie SOWIE kontralaterale Sensibilitätsstörungen am Körper.</p>',
	'Eine56jhrigePatientinmitmultiplenInsultenleidetseit15Jahrena':	'<p>Vorhofflimmern als Emboliequelle.</p>',
	'EinPatientmitakutemrechtshirnigenischmischenInsultwirddurchu':	'<p>Es gibt also Thromben im Herz und vielleicht auch noch ein Vorhofflimmern als Emboliequelle.</p>',
	'Ein66jhrigerPatientkommtmitderAnamnesezuIhnenindieOrdination':	'<p>Wichtig ist hier die KLINISCHE Untersuchung – MR, CT usw sind natürlich wichtig aber keine klinischen Untersuchungen, stehen jedoch bestimmt in den Antwortmöglichkeiten.</p>',
	'Eine43jhrigePatientinkommtwegenDoppelbildernundeinerwechseln':	'<p>Myasthenia Gravis betrifft die motorische Endplatte und mach eine gesteigerte Ermüdbarkeit der quergestreiften Skelettmuskulatur unter Belastung; 3-10/100000; >90% haben ACh-Rezeptor-Ak, 60-85% Veränderungen des Thymus; Letalität 10-20%; tritt oft zuerst an den Augenmuskeln auf und hat ein/beidseitige Ptose; Myasthene Krise bei betroffener Atemmuskulatur; wird in Schwangerschaft schlechter, dafür nachher besser; Diagnostik mittels EMG-Ermüdungstest (repetitive Stimulation mit 3/Sekunde), Tensilon-Test (Besserung der Symptome durch Edrophoniumchlorid), Labor → ACh-R-Ak, Thymushyperplasie im Thorax-CT (Röntgen); </p><p><b>Therapie:</b> Cholinesterasehemmer (viele Einzeldosen oder Retardpräparat), Immunsuppression (Prednison dann Azathioprin od. Ciclosporin A), in der myasthenen Krise Neostigmin oder Pyridostigmin, wenn schwer IVIG, Plasmapherese; Thymektomie bei Pat <40a; Komplikationen: schlechter bei Fieber, Stress, Muskelrelaxantien, cholinerge Krise (Therapie mit Atropin), Tod durch Atemlähmung</p>',
	'Eine38jhrigePatientinkommtwegenDoppelbildernundeinerSchlucks':	'<p>Interessant ist bestimmt auch das Thorax-CT für die Suche nach dem Thymus/Thymom – ein erster Schritt ist aber wohl die Blutabnahme. Und ein EMG mit repetitiver Stimulation darf natürlich auch nicht fehlen.</p>',
	'Eine44jhrigePatientinkommtwegenabnormerErmdbarkeitderMuskula':	'<p>Immunsuppression Cortison → Azathioprin, ev. OP</p>',
	'Eine63jhrigePatientinkommtwegenbeidseitigemunwillkrlichenAug':	'<p>Blepharospasmus ist eine Dystonie und die therapiert man mit lokalem Botox.</p>',
	'Ein53jhrigerCellistkommtwegendystonenMuskelspasmendieinletzt':	'<p>aktionsinduzierte Extremitätendystonie vor allem beim Schreiben, Musizieren, Sport (Golferkrampf oder „the yips“) → Botox unter EMG-Kontrolle</p>',
	'Eine25jhrigePatientinkommtwegenabnormerMdigkeitdiehufigunter':	'<p>Im Gegensatz zu den typischen Schlafanfällen in Vorlesungen nach dem Mittagessen fühlen sich Narkoleptiker nachher ausgeschlafen. Hypnagoge Handlungen (durch traumartige Erlebnisse beim Einschlafen), Störungen des Nachtschlafs; Kataplexie ist der affektive Tonusverlust der Haltemuskulatur ohne Bewusstseinstrübung für wenige Sekunden bis einige Minuten durch unerwartete affektive Stimuli. Therapie ist nur symptomatisch mit rechtzeitigem Schlafen und meiden monotoner Tätigkeiten möglich; erste Wahl: Modafinil ev. L- Dopa/Weckamine, Trizyklika</p>',
	'Eine45jhrigePatientinwirdwegenEinschlafstrungenanIhreOrdinat':	'<p>Es kann durch Eisenmangel, Magnesiummangel bedingt sein. Außerdem wird es häufiger bei Niereninsuffizienz, peripheren Neuro/Myelopathien (z.b. MS) und bei diversen Pharmaka (u.a. Dopaminantagonisten)</p>',
	'Eine35jhrigePatientinstelltsichwegenunwillkrlichenKopfdrehbe':	'<p>Heißt dystoner Schiefhals oder zervikale Dystonie oder torticollis spasmodicus (torticollis → Drehung, laterocollis = Seitneigung, Antero/Retrocollis = Vor/Rückneigung). Einzige DD ist der muskuläre Schiefhals, meist nach Geburtstrauma und anschließender Fibrosierung des Sternocleidomastoideus. Der entsteht aber nicht schleichend und lässt sich nicht durch „sensorische Trickbewegungen“ (Berühren von Kinn/Wange) kurzfristig verbessern. Verlauf des torticollis ist chronisch	 SIP6-Fragen 2007-2010 20 20 PSYCHIATRIE Verwendet hab ich Vorlesungs- und Lernunterlagen sowie eigene Mitschriften und ganz selten das Block20-Buch. CAVE: Die Fragen werden eindeutig aus den VO-Unterlagen gestellt, die Lernunterlagen sind oft etwas anders (aber nicht zwingender Weise falsch).</p>',
	'Siehabeneine37jhrigePatientindieaneiner2Phaseeinerrezidivier':	'<p>Medikamentöse Therapie der Depression:   Präparatwahl nach Nebenwirkungsspektrum 	 langsames Einschleichen 	zeitverzögertes Ansprechen → Präparatwechsel erst nach 3-4 Wochen 	 ev.Kombitherapie CAVE: MAO-I und SSRI   Augmentation: Kombi mit für sich nicht AD wirksamen Substanzen: Lithium, SD-Hormon, Moodstabilizer, Antipsychotika, Modasomil, Amphetamine 	Erhaltungstherapie 4-6 Monate, Rezidivprophylaxe nach zweiter, spätestens dritter Episode 	 Langzeittherapie ab 2 depressiven Episoden innerhalb von 5 Jahren   Rückfallwahrscheinlichkeit: 1.Ep: 60%, 2.Ep: 70%, 3.Ep: 90%</p>',
	'Eine73jhrigeFraustelltsichbeimAllgemeinmedizinermitseitetwae':	'<p>Weiterbehandlung für mindestens 4-6 Monate</p>',
	'Ein50jhrigerMannwirdinBegleitungseinerGattinvonderRettungind':	'<p>Therapie mit Elektrokrampftherapie; </p><p><b>DD:</b>  -)Katatone Symptome → hätte motorische Hemmung und Gegenhaltung, ev. Mutismus, Echolalie; </p><p><b>Therapie:</b> Benzos -)dissoziative Störung mit Verlust der Kontrolle von Bewegungen, Erinnerungen, Identität</p>',
	'Ein87jhrigePatientinleidetseit2MonatenanSymptomenderDepressi':	'<p>SSRI-NW: Übelkeit, Unruhe, Libidoverlust → die ersten zwei vor allem in der Anfangsphase</p>',
	'ImRahmenderExplorationeinerPatientinberichtetdieseIhnenvonst':	'<p>Hohes Risiko, weil konkreter Plan und schon das Gift gekauft.</p>',
	'Ein55jhrigerMannwirdvonseinenAngehrigenandieAmbulanzeinerint':	'<p>Hochrisikopatient = alter Mann + konkreter Plan; Amtsarzt, damit man ihn nach dem Unterbringungsgesetz aufnehmen kann</p>',
	'EinPatientderseit1998aneinerrezidivierendendepressivenStrung':	'<p>Risikofaktoren für Suizid: vergangene Suizidversuche, „harte Suizidmethoden“, Depressio/Suchterkrankung/Psychose, Familienanamnese, chronische Erkrankung, Vereinsamung, Alter, männliches Geschlecht,… SIP6-Fragen 2007-2010 22 22</p>',
	'Eine32jhrigePatientinleidetaneinertypischenHerbstWinterDepre':	'<p>In den Lernunterlagen nur als SAD (Saisonal abhängige Depression) zu finden. Ist auch der Grund für ein nicht-organische Hypersomnie.</p>',
	'Eine75jhrigePatientinwendetsichanihrenpraktischenArztBisvore':	'<p>organische Durchuntersuchung wäre aber auch angebracht!</p>',
	'EinePatientinkontaktiertihrenpraktischenArztdasieseitzweiWoc':	'<p>Klassisch für die Depression</p>',
	'WielangemssendieSymptomevorhandenseinumdieKriterieneinerDepr':	'<p>Mindestens 2 Wo; min 2 der Hauptsymptome: Depressive Verstimmung, Freudlosigkeit, Antriebsverminderung; min 2 Nebensymptome: Verminderte Konzentration/Aufmerksamkeit, vermin. Selbstwertgefühl/Selbstvertrauen, Wertlosigkeit/Schuldgefühle, Agitiertheit/Hemmung, Suizidgedanken, Schlafstörungen, Appetitverlust</p>',
	'WelchesderfolgendenAntidepressivawirktsedierend':				'<p>Mirtazapin ist ein NaSSA und macht mehr NA + 5HT. NW: Sedierung, Gewichtszunahme</p>',
	'Einbislanggesunder55jhrigerMannerfhrtausdemFernsehendasssein':	'<p>beginnt während oder kurz nach dem Ereignis, dauert 2d bis 4 Wo, max. Intensität 3d, weniger Intensität nach 3-4d; emotionale Taubheit, eingeschränkte Wahrnehmung, dissoziative Amnesie</p>',
	'EinSoldatkehrtnachAbdienenseinerZeitalsUNBeobachterauseinerP':	'<p>Flashbacks, Träume, Leiden, Gefühle als ob sich das Ereignis sich wiederholen würde. Anhaltend Vermeidung, Ein- und Durchschlafstörung, Konzentrationsprobleme, erhöhte Aufmerksamkeit, Schreckreaktionen</p>',
	'Ein60jhrigerMannkonsultiertseinenHausarztwegenseitJahrenbest':	'<p>Somatisierung: Psychologischer Stress steht in zeitlichem Zusammenhang mit dem Auftreten körperlicher Beschwerden; traumatische Erlebnisse; Kindheit?; Angst-Vermeidung-Modell: Schmerz wird SIP6-Fragen 2007-2010 24 24 katastrophiert durch neg. Affekt oder bedrohliche Krankheitsinfo; Dekonditionierungszyklus Schmerz   weniger Bewegung   Abbau 	mehr Schmerz chronisch: mind. 6 Monate, nicht hinreichend körperlich erklärbar Therapie mit Drei-Stufen-Modell: subjektives Krankheitsverständnis (feeling understood), psychosomatisches Krankheitsverständnis (changing), Zusammenhang zwischen körperlichen Sympt. und psychsozialem Hintergrund</p>',
	'Eine55jhrigeFraukonsultiertihrenHausarztwegenseitJahrenbeste':	'<p>AD allgemein TZA, SNRI, Trazodon, SSRI (in dieser Reihenfolge in der VO-Unterlage B15)</p>',
	'WelchederfolgendenDiagnosengehrtnichtzumKapitelF4denNeurotis':	'<p>Dazu gehören Akute Belastungsreaktion, Posttraumatische Belastungsstörung, Anpassungsstörung und anhaltende posttraumatische Persönlichkeitsstörung</p>',
	'EinePatientindiedieAmbulanzeinespsychiatrischenKrankenhauses':	'<p></p><p><b>DD:</b>  irgendwas organisches; Depression</p>',
	'Sieseheneine35jhrigePatientinmitVerdauungsstrungenundSchmerz':	'<p>typisch organbezogene Symptome: cardiovaskulär, gastro-intestinal, respiratorisch und urogenital z.b. Herzneurose, Hyperventilationssyndrom, Colon irritabile (B15)</p>',
	'Ein45jhrigerBeamterwirdbeiseinemHausarztvorstelligweilerkran':	'<p>F43.2; durch emotionale Belastungen, die geringer als ein Trauma sind aber eine vulnerable Persönlichkeit treffen; gibt es mit Angst, Depression oder auch Störung des Sozialverhaltens; Siehe VO und Lernunterlage B13; </p><p><b>Therapie:</b> Psychotherapie, Stützung, Coaching, Beratung und symptomorientiert medikamentös</p>',
	'Ein25jhrigerMannsuchteineOrdinationaufundwillimHinblickaufAI':	'<p>Definition nach C9: >6 Monate Angst 1-2 schwere körperliche Erkrankungen zu haben, immer wieder um med. Behandlungen/Untersuchungen ersuchen, Akzeptanz der Mitteilung keine ausreichende körperliche Ursache gefunden zu haben hält nur kurz an.</p>',
	'Eine48jhrigePatientinwirdvompraktischenArztwegenchronischerS':	'<p>Primär: Klassifikation, Sekundär: Beschreibung, Tertiär: Bewertung → 1 – Rückenschmerz, 2- ziehend seit Stunden, 3 – mörderische Schmerzen</p>',
	'InwelchernHirnregionenfindensichUnterschiedezwischenZwangspa':	'<p>Zwangsstörungen haben eine Überaktivierung thalamokortikaler Basalganglienschleifen, bei einem Teil der Zwangspatienten kommt es zu einer Enthemmung im Bereich der Basalganglien;</p>',
	'Ein22jhrigerPatienthatwegenzunehmenderZwangssymptomedasGymna':	'<p>bei milder OCD zunächst Kognitive Verhaltenstherapie, dann KVT+SSRI; bei schwerer zuerst SSRI, dann KVT+SSRI; präpubertär immer zuerst KVT; SSRIs brauchen 6 Wochen, bis sie anschlagen; bei Nicht-Ansprechen nach 12 Wochen anderes SSRI oder Clomipramin oder Kombination von beidem. Bei wenig Einsicht: Antipsychotika</p>',
	'DerPatientkommtabstinentnacheinerAlkoholEntwhnungskurzumprak':	'<p>Lesch-Typ  Entzug  Rückfallprophylaxe Anticraving CAVE	Betreuungsart I: Alkoholallergie  Benzo+ Acamprosat Acamprosat	Dopaminagonist	Allgemeinmed.  + Selbsthilfe II:  Angst,  Alkohol  als Therapie Tiaprid, Trazodon, Doxepin Acamprosat, Moclobemid Benzo, GHB  Psychotherapeut III:	Depression,	 starre Wertigkeiten,  hohes soziales Gewissen GHB	AD,	 Carbamazepin, Naltrexon,  Topiramat, GHB (im Rückfall)	  Psychiater  + Allgemeinmed. IV:  Vorgeschädigtes Gehirn, Gewöhnung GHB, Carbamazepin Nootropika,	Naltrexon, Atyp. NL, GHB   Sozialarbeiter  + Selbsthilfe</p>',
	'DerPatientkommtmiteinemdepressivenSyndromundAngststrungenmit':	'<p>Bei Lesch II Tiaprid, Trazodon, Doxepin; KEINE Benzos, GHB</p>',
	'EinAlkoholabhngigermitepileptischenAnfllenauchauerhalbdesEnt':	'<p>Keine Ahnung, wo das stehen soll; in B3 findet man nur: I: stützende Psychotherapie (Alkoholproblematik!), II: Ich-Stärkung, keine Selbsthilfe; III: Ich-Lockerung, PT spät und keine Selbsthilfe und IV: Stützende Gespräche, sozialtherapeutisch und Einübung von Rückfallgegenstrategien</p>',
	'EinPatientberichtetdasserbereitseinDeliriumTremenshatteWenne':	'<p>Typ I hat 3D-Tremor und schweren Entzug mit Delirium Tremens und Anfällen → Benzos!</p>',
	'EinPatientkommtmitBluthochdruckindieOrdinationerklagtberstar':	'<p>   Sensitivität	 Spezifität	 Normalisierung in Abstinenz  Atemalk  100	100	 Stunden  >=2,5 Promille: chron. Missbrauch Ethylglucuronid	 100  100  Tage	  MCV & GGT	 63	 80	 1-10 Wochen  GGT >1,3x oberer Normwert; GOT>GPT; MCV>95: Verdacht, >98 Missbrauch! %CDT;	65	96	2-4 Wochen	>=2,6%	SIP6-Fragen 2007-2010 28 28</p>',
	'WelchederfolgendenSymptomeknnenalsFolgeeinesAlkoholentzugsau':	'<p>ferner Grand Mal Anfälle(20% bei Typ I !), Delirium tremens, motorische Unruhe, fallweise Durchgangssyndrome</p>',
	'Eine24jhrigePatientinhatvoreinerWocheeineTochtergeborenNunsc':	'<p>Innerhalb der ersten 4 Wochen (6 Wochen in der Geburtshilfe) spricht man von Wochenbett/Post- Partum; 10-15% haben eine Depression, 1-5% eine PTSD, 1% Mutter-Kind-Beziehungsstörung und 1 Promille eine Psychose; VO-Unterlage B16 geht deutlich schneller als Lernunterlage B16</p>',
	'Eine26jhrigeFrauhatvordreiTageneinBabybekommenSeiteinemTagis':	'<p>Beginnt 2-4 Tage postpartum und hält maximal 10 Tage an; bei 50-80% der Frauen, keine Behandlung notwendig; CAVE schwerer Blues ~ Depression</p>',
	'Eine19jhrigeFrauleidetseit2JahrenanwiederkehrendenEssanfllen':	'<p>Essattacken (über 3 Mo min 2x/Wo) mit selbst induziertem Erbrechen, Missbrauch von Laxantien, Diuretika, SD-Hormon und Insulin</p>',
	'Eine22jhrigePatientinleidetbereitsseit6JahrenaneinerAnorexia':	'<p>Wichtig ist auch die Hypokaliämie, und die Amenorrhoe sowie der Libidoverlust bei Männern; diese alle sind jedoch reversibel!; 10-Jahresletalität 5,6%, Chronifizierung bei 20%; Stationäre Aufnahme bei BMI <13; </p><p><b>Therapie:</b> Psychotherapie und SSRI als Rückfallprophylaxe</p>',
	'Eine22jhrigePatientindieaneinerBulimianervosaleidetstehterst':	'<p>ferner Selbstbehandlung, ambulante Psychotherapie/Tagesklinik/Stationär   KVT; SSRIs wirken nach einer Woche und reduzieren Anfälle um 40-90% auch bei nicht-depressiven; aber 3-4x Dosis der depressiven und 6- 12m Therapie SIP6-Fragen 2007-2010 31 31</p>',
	'Eineknapp18jhrigeFraukommtmitIhrerMutterindiePraxisDieMutter':	'<p>weiters Hypertrophie der Speicheldrüsen, Zahnschäden; die Kallusbildung ist an der Rückseite der Finger und heißt „Russell sign“</p>',
	'Ein27jhrigerMannkommtindiepsychiatrischeNotfallambulanzErlei':	'<p>Er ist ernstlich selbst- und eventuell fremdgefährdend → Einweisung nach dem Unterbringungsgesetz.</p>',
	'Eine19jhrigeFrauschildertimErstgesprchdasssiesichseit2Jahren':	'<p>Studien gibt es nur für die Dialektisch-Behaviorale Therapie und die Psychoanalytische Therapie; Ansonsten ist bei Persönlichkeitsstörungen generell die Psychodynamische Therapie und die Kognitive Therapie empfohlen (B14 VO); Pharmakotherapie mit Olanzapin, Quetiapin ferner Carbamazepin und Valproat und SSRIs</p>',
	'Eine45jhrigePatientinkommtmiteinerberweisungvomAllgemeinmedi':	'<p>Man darf es laut WHO Abhängigkeitssyndrom nennen wenn im letzten Jahr drei oder mehr der folgenden Kriterien erfüllt wurden: Verminderte Kontrollfähigkeit, Substanzgebrauch um Entzugssymptome zu lindern, körperliche Entzugsbeschwerden, Toleranzentwicklung, ein eingeengtes Verhaltensmuster im Umgang mit der Substanz, Vernachlässigung anderer Vergnügen und anhaltender Konsum trotz Nachweis eindeutig schädlicher Folgen.</p>',
	'WelcheSymptomesindbeieinemKokainabususzubeobachten':			'<p>Kokain ist psychomotorisch aktivierend, weil Dopamin, NA und 5HT nicht mehr aus dem synaptischen Spalt abtransportiert werden → Hyperaktivität, gefühlte Leistungssteigerung, Appetitlosigkeit, verringerte Müdigkeit und Schlaflosigkeit, erhöhte Libido, Vasokonstriktion (Hypertonie!) und Tachycardie; ev Euphorie, Angst, Irritation zuletzt Krampfanfälle; Im Entzug spielts dann die psychische Symptomatik genau umgekehrt: vermehrtes Schlafbedürfnis, Unlust, Dysphorie, Depression, Müdigkeit und gesteigertes Hungergefühl</p>',
	'Ein19jhrigerMannleidetseitwenigenMonatenunterInitiativemange':	'<p>Organisches muss immer (am besten am Anfang!) ausgeschlossen werden. In dem Alter würd ich auch mal den Konsum von Cannabis und anderen lustigen Substanzen unter die Lupe nehmen.</p>',
	'Eine43jhrigePatientinhatindenletzten5Monatencirca8kgabgenomm':	'<p>Ein Wahn hat subjektive Gewissheit + Unkorrigierbarkeit + Unmöglichkeit des Inhalts (nicht bei Verfolgung und Eifersucht); Mögliche Wahninhalte: Beeinträchtigung/Verfolgung, Beziehung/Eifersucht/Liebes, Schuldwahn, Verarmungswahn, hypochondrischer Wahn und Größenwahn(A2-A4); der nihilistische Wahn kommt nur einmal in B16 bei einer depressiven jungen Mutter vor.</p>',
	'WelcherderfolgendenPunkteistbeiPatientInneninErregungszustnd':	'<p>zunächst Abstand halten (Hat der Pat. Waffen?) und rechtzeitig Polizei anfordern, Exploration nicht alleine!, körperliche Fixierung und Medikation mehrfach ankündigen, pro Extremität ein Helfer (2 Arme + 2 Beine + 1 Kopf = 5), Injektionen vorher aufziehen; bis zum Eintritt der Sedierung weiter Festhalten</p>',
	'Eine25jhrigePatientinmiteinerseit9MonatenbekanntenPsychoseau':	'<p>Schizophrenie hat drei therapeutische Ansätze – Pharmakotherapie, Psychotherapeutische Interventionen und Psychosoziale Therapien: Handlungsorientiert, Einbezug des sozialen Umfeld, Empowerment → Also umständlich formuliert Ergotherapie, Arbeitstherapie usw.</p>',
	'WelcheRollespieltemotionalesberengagementderUmweltHighExpres':	'<p>HEE stehen für emotionales Überengagement, Gereiztheit und häufige kritische Kommentare der Angehörigen und erhöhen allesamt die Rückfallwahrscheinlichkeit um mehr als das Doppelte→ Angehörige müssen Kommunikationstil anpassen.</p>',
	'EinPatientliegtmutistischaufeinerakutpsychiatrischenStationS':	'<p>Die möglichen Therapien sind vielfältig – man möchte immerhin den psychiatrischen Notfall verhindern. </p><p><b>DD:</b>	 ist hier das maligne neuroleptische Syndrom; seine Therapie ist NL absetzen, Benzos geben und symptomatisch- intensivmedizinisch.</p>',
	'EinPatientliegtmutistischaufeinerakutpsychiatrischenStationS':	'<p>Entsteht durch Blockade subcorticaler striataler Dopamin D2 Rezeptoren durch NL und ist von der perniziösen Anämie zu unterscheiden; ein Unterschied sind die Bewusstseinsminderung und der Rigor, der eher beim MNS auftritt.</p>',
	'Ein58jhrigerPatientwirdwegeneinerchronischenSchizophreniesei':	'<p>NW von klassischen Neuroleptika sind ua. EPS: Parkinson, Frühdyskinesien, Akathisie, Spätdyskinesie (durch D2 Blockade) und auch ein Prolactin-Anstieg; Ach-Blockade → Verwirrtheit, Delir, Mundtrockenheit; NA- Blockade → RR-Abfall, Orthostase, Schwindel, Schläfrigkeit; H1-Blockade Gewichtszunahme, Schläfrigkeit; Neue haben weniger EPS.</p>',
	'AufgrundvonWirkungenderPsychopharmakawurdenHypothesendarbera':	'<p>Depression wäre Serotonin 	 SIP6-Fragen 2007-2010 34 34</p>',
	'Der33jhrigeHerrWmitSchizophrenieleidetvorallemunterAntriebsl':	'<p>Interessant – pharmakologisch wäre Clozapin (leider Agranulozytosen bei 1-5%); ansonsten natürliche alle neuen Neuroleptika wie Olanzapin, Quetiapin, Risperidon, Ziprasidon,…; Ansonsten ist natürlich die Psychotherapeutische Intervention wichtig und auch die psychosoziale Reha.</p>',
	'Ein19jhrigerMannleidetseitMonatenunterKonzentrationsstrungen':	'<p>Er hat Plus- und Minus-Symptome – also Zusätze zum normalen Seelenleben (Stimmen,…) und Verluste (Antriebslosigkeit, sozialer Rückzug,…)</p>',
	'Ein37jhrigerMannmiteineranamnestischbekanntenSchizophreniewi':	'<p>Wenn er auch Neuroleptika hätte, müsste man an einem Malignes NL-Syndrom denken.</p>',
	'Eine23jhrigeFrauleidetseitMonatenunterEnergielosigkeitAngstv':	'<p>Plus- und Minussymptome!</p>',
	'Eine26jhrigeFrauleidetanSchizophrenieundistverunsichertbezgl':	'<p>Fehlinfos führen zu einer typischen Therapieverzögerung von 4 Jahren: gespaltene Persönlichkeit, unheilbar, unbehandelbar, Gefährlichkeit</p>',
	'EinePatientinleidetanSchizophrenieSiewirdmitklassischenNeuro':	'<p>Ein-Jahres-Rückfallraten 80% Placebo, 20% NL; B5/B6</p>',
	'EineFraudereneineiigeZwillingsschwesteraneinerSchizophreniel':	'<p>aus A8: eineiige 48%, Kind zweier Schizophrener 46%, ein Elternteil 13%, zweieiige 17%, ein Elternteil + Geschwister 17%, Geschwister 10%</p>',
	'EineFraudereneineiigeZwillingsschwesteraneinerbipolarenaffek':	'<p>aus A8: eineiig 73%, beide Eltern 61%, zweieiig 14%, Kinder 11%, Geschwister 9,4%</p>',
	'WiehochistdieLebenszeitprvalenzderSchizophrenie':				'<p>ausgehend von der Normalbevölkerung gibt es folgende Lebenszeitprävalenzen: Depression 15%, Angststörung 15%, Zwangsstörung 2,5%, Sucht: Nikotin 19%, Alk 5/10% f/m, illegale Substanzen 1,6/2,5%, Panikstörung 2,5%, Sozialphobie 2-3%, ; Schizo beginnt zwischen 15 und 30, bei Männern früher</p>',
	'FolgendepsychopathologischenBegriffepassengutindastypischeBi':	'<p>Affektlabilität gehört zu den nicht-kognitiven Symptomen der organischen Psychosen (B1/2). Nach Faustregel gibt es drei Verlaufsformen, die zu je ein Drittel auftreten. Phasenhaft (wird zwischendurch ganz gesund), schubhaft (Schizophrenes Residuum) und prozesshaft (chronisch, fortschreitend). In der Residualphase hat man vor allem Minussymptome wie Mangel an Motivation, Antrieb, Interesse und Energie; B5/B6</p>',
	'Ein81jhrigerLehrerkommtinBegleitungderEhefrauindieAllgemeinp':	'<p>Nicht wirklich behandelbar: Alzheimer Demenz, Pick-Demenz, Vaskuläre Demenz, Parkinson-Demenz; Behandelbar: Morbus Wilson, Neurosyphilis, B1-Mangel (Alk!), B12-Mangel → die Frage ist halt wieviel besser die Demenz davon wird.</p>',
	'Ein84jhrigeralleinlebenderMannwirdwegenDemenzverdachtandieGe':	'<p>Beeinträchtigung durch die Störung, nicht nur im Delir dement, > 6 Monate Weitere aus der Reihe Orientierungsstörung, Konzentrationsstörung, Sprachstörung, Planen und Organisieren vermindert, Aufmerksamkeitsverlust, Apraxie, Agnosie, Akalkulie</p>',
	'Eine80jhrigeFrauverstirbtnachjahrelangemDemenzverlaufimPfleg':	'<p>Mit 80 sind 60% Alzheimer, 15% Alzheimer + Lewy-Body; 10% vaskulär und 10% gemischt; CAVE: Alzheimer-Demenz gibt’s erst ab 65, davor </p><p><b>DD:</b>	Depressio, Parkinson, Pick, M.Wilson, Hypothyreose,…</p>',
	'Eine87jhrigealleinlebendeDamewirdvompraktischenArztwegendesV':	'<p>>6 Monate und eine organische Ursache fehlen da noch in den Kriterien und es darf nicht nur im Delir auftreten</p>',
	'WelchesderfolgendenSymptomegehrtzudennichtkognitivenDemenzSy':	'<p>Aggressivität, Angst, Agitation, Schlaf-Wach-Rhythmus-Störung, Wahn, Halluzinationen, Misstrauen, Depressivität, Apathie, Hypersexualität; Also auf deutsch: der gemeine alte Mann, der depressive Grantscherben, die verwirrte Oma, die Oma, die im Pflegeheim ständig „bestohlen“ wird und dann noch die Hypersexualität</p>',
	'WelchederfolgendenSymptomegehrtnichtzurPanikattacke':			'<p>Cardiovaskulär, Respiratorisch, Vegetativ, Neurologisch Dazugehört Tachycardie, Palpitationen, Beklemmung/Brustschmerz, Schwindelgefühl, Atemnot, Erstickungsgefühle, Schwitzen, Hitzewallungen, Übelkeit, Derealisation, Parästhesien, Zittern/Beben; also im Prinzip ein akutes Coronarsyndrom ohne coronare Probleme</p>',
	'AbwelchemIQWertsprichtmanvoneinerleichtenIntelligenzminderun':	'<p>Normal 80-120, Durchschnitt 100; 50-69 leichte IM Debilität (80%), 35-49 mittelgradige IM Imbezilität (12%), 20-34 schwere IM, <20 schwerste IM Idiotie; Der lieb gemeinte Depp hat mehr im Hirn als der französische Imbecile und beim Idiot ist Hopfen und Malz verloren. SIP6-Fragen 2007-2010 37 37</p>',
	'DasVierfelderschemaderKinderundJugendpsychiatriestellteintio':	'<p>Körperlichkeit, Intellektualität, Emotionalität, Sozialisation → KIES</p>',
	'DieAdoleszenzisteineZeitdesFragensundSuchensWelchederfolgend':	'<p>Laut B21/B22 sind nur drei Themen für Jugendliche interessant: Identität - Wie bin ich selbst? Wie wirke ich auf andere; Identifikation – Wonach soll ich mich orientieren?; Intimität – Wieviel Distanz brauche ich von meinen Eltern um „atmen“ zu können?; Wenn ich ein 4.Thema hinzufügen müsste wäre es wohl Sex.</p>',
	'DurchwelchederfolgendenFaktorenbzwKrankheitenentstehenStrung':	'<p>In B21/B22 gibt es keine anderen möglichen Antworten. Die Frage kam auch schon in mehreren SIPs vor.</p>',
	'Ein14jhrigerKnabewirdambulantvorstelligAuffallendisteineEcho':	'<p>Qualitative Auffälligkeit der gegenseitigen sozialen Interaktion, Tiefgreifende Auffälligkeiten der Kommunikation und der Sprache, repetitives, restriktives und stereotypes Verhalten; B20</p>',
	'Ein4jhrigesMdchenkommtindieAmbulanzAuffallendisteinsehrklein':	'<p>Sistieren des Kopfwachstums zwischen 5m und 4a, Verlust von erlernten Funktionen (Kommunikation, sozial), Gangstörung, stereotype Handbewegung, fast nur Mädchen</p>',
	'Ein31jhrigerPatientberichtetim25Lebensjahrundim28Lebensjahru':	'<p>Klingt nach einer Hypomanen Phase</p>',
	'Eine83jhrigealleinlebendeFrauerhieltalsSchlafmedikationvonih':	'<p>Das klingt ganz nach einer paradoxen Benzowirkung.</p>',
	'Ein65jhrigerMannwurdeeinerCholezystektomieunterzogenInderdar':	'<p>Nach C6: Bewusstseinsstörung (Aufmerksamkeit), Kognitionsstörung (Halluzination/Wahn), plötzlicher Beginn + Schwankungen, Grunderkrankung (cerebral/systemisch), psychomotorische Störung (mehr/weniger/schwankend), Störung des Schlaf-Wach-Rhythmus Therapie mit Antipsychotika, Benzos nur zweite Wahl, ev. Sitzwache/Schutzfixierung; außerdem Therapie der Grunderkrankung, Medikation überprüfen, Monitoring, Struktur in den (Tages)ablauf bringen → orientierungsfördernde Maßnahme (B23/B24)</p>',
	'EinbekannterEpileptikerdersichwegeneineraktuellenschwerendep':	'<p>min 2 generalisierte Anfälle ohne Wiedererlangen des Bewusstseins; Therapie mit Lorezepam → Phenytoin → Valproat → Phenobarbital → Narkose! (C3)</p>',
	'EinPatientbentigtPsychotherapieundpsychopharmakologischeBeha':	'<p>Einstellung auf Psychopharmaka macht immer der Psychiater</p>',
	'EinPatientrandaliertimWartezimmerderpsychiatrischenAmbulanzu':	'<p>Bei sowas ist es wichtig rechtzeitig die Polizei/ den Sicherheitsdienst rechtzeitig zu rufen, einen Helfer pro Extremität zu holen und nicht alleine mit dem Patienten reden. SIP6-Fragen 2007-2010 39 39</p>',
	'PsychopharmakawerdennachIndikationsgruppeneingeteiltInwelche':	'<p>Wirkt nur bei Kranken, Wirkmechanismus nicht genau bekannt.</p>',
	'SiehabeneinenPatientenmiteinerbipolarenStrungzubehandelndera':	'<p>akut 1,0-1,2 mmol; prophylaktisch 0,6-0,8 mmol, toxisch ab 1,6mmol – bei alten schon früher neurotoxisch; NW: Tremor, Polyurie und Polydipsie, Gewichtszunahme; KI: Nierenfunktionsstörung und schwere Herz- Kreislauf-Erkrankungen, beim Stillen und ev. In der Schwangerschaft</p>',
	'EinePatientininihrerOrdinationgibtinderAnamneseansienehmefol':	'<p>früher Therapie der Manie</p>',
	'SieseheninihrerallgemeinmedizinischenOrdinationeine22jhrigeP':	'<p>Mögliche Antworten wären wohl eine stationäre Aufnahme, Überweisung an die Psych, körperliche Untersuchung, Elektrolytsubstitution; aber am Anfang steht ja immer die Anamnese und für den BMI erfragt man Größe und Gewicht – oder stellt den Patienten auf die Waage und unters Maßband → also einfache, günstige, nicht invasive Maßnahmen zuerst</p>',
	'WasgehrtnichtzudenAufgabenvonAngehrigenrunden':				'<p>Information durch Experten, Erfahrungsaustausch, neue soziale Kontakte, Trauerarbeit, Befreiung von Schuldgefühlen, Lernen, dass es auch ein eigenes Leben gibt; also im Prinzip alles, was man am besten ohne den SIP6-Fragen 2007-2010 40 40 Patienten macht; Der Erfolg davon sind die typischen Wirkfaktoren von Selbsthilfe – man ist nicht allein, man lernt von einander, man vereinsamt nicht, Schuldgefühle werden weniger</p>',
	'WelchesderfolgendenSymptomegehrtnichtzumbasalenposttraumatis':	'<p>Kindheitstraumata haben 4 Merkmale: -)wiederkehrende, sich aufdrängende Erinnerung -)repetitive Verhaltensweisen -)traumaspezifische Ängste -)veränderte Einstellung zu Menschen, Leben und Zukunft </p><p><b>Diagnose:</b>	 Exploration, Flash-Backs?, Dissoziation?, pschische Beeinträchtigung?, Ressourcensuche, beim akuten KEINE Leistungsdiagnostik </p><p><b>Therapie:</b> Stabilisierung, Traumabearbeitung, Integration des Traumas in die Lebensgeschichte VO-Unterlage C12</p>',
	'WasisteinpsychischesTraumavomTYPIInachLeonoreTerr':			'<p>Typ I = einmal, Typ II = zwei oder mehr Traumata in einem bestimmten Zeitraum</p>',
	'WelchesRezeptorsystembeeinflussenklassischeNeuroleptikahaupt':	'<p>Außerdem Histamin, ACH, NA und die neueren auch Serotonin.</p>',
	'Ein10MonatealtesKleinkindhatseit2TagenAtemnotDasnachfolgende':	'<p>Ich nehme an, man sollte da nicht zu kompliziert denken. Andere Antwortmöglichkeiten könnten wohl was wir Tachycardie, Zyanose oder auch schlechtes Blutgas oder ein Auskultationsbefund sein. Tachypnoe ist eben ein Syndrom respiratorischer Erkrankungen. Laut „ambulante-pädiatrie-koller.pdf“ spricht Tachypnoe für Pneumonie, Bronchiolitis, obstruktive Bronchitis.</p>',
	'Beieinem2jhrigenBubenbestehenseiteinigenWochenHustensowieAte':	'<p>Wird oft verkannt als Pneumonie o.ä.; wichtig ist hier das plötzliche Einsetzen.</p>',
	'EinFrhgeborenesausder250SchwangerschaftswochezeigtnachderGeb':	'<p>Surfactant hält nicht besonders lange und wird in den frühen Schwangerschaftswochen in einer weniger funktionsfähigen Form produziert. </p><p><b>DD:</b>  Lungenhypoplasie → da würde die Beatmung wohl gar nicht funktionieren geschweige denn mit dem CPAP. Ein idiopathischer Pneu wäre wohl auch akuter und eine Pneumonie dauert etwas länger.</p>',
	'Ein3jhrigesMdchenleidetseiteinigenStundenunterhohemFieberund':	'<p>Hohes Fieber, atemabhängige Schmerzen, Atemnot und dann noch beschränkt auf den linken Unterlappen → Pneumonie. Eigentlich sollte bei pleuraler Reizung auch ein Husten dabei sein. Ist die Pleura nicht betroffen, hustet man nicht oder zumindest nicht wegen der Pneumonie.</p>',
	'Ein3jhrigesMdchenwirdinNotarztbegleitungwegenAtemnotundhohem':	'<p>Inspiratorischer Stridor heißt das Problem ist in den oberen Atemwegen in der Nähe des Larynx. Kommt die kloßige Sprache und die Schluckstörung/Speichfluss dazu → Epiglottitis. Nicht mit dem Spatel reinfahren, Intubieren, dann AB. (und vorher natürlich eine Sedierung und Analgesie). Eine E. hat ferner einen akuten Beginn und hohes Fieber und wird durch Hämophilus Influenzae B verursacht → seit der Impfung kaum noch Fälle.</p>',
	'Ein4MonatealterSuglingleidetseit5TagenanSchnupfenHustenundzu':	'<p>Je leiser das Atemgeräusch desto schlimmer ists. Am meisten zwischen 1-4 Monaten, ab 1a kaum noch. Symptome: Nasenflügeln, Einziehungen, Hypoxämie, Stridor, pfeifende AG (oder leise AG), Tachypnoe, ev. SIP6-Fragen 2007-2010 42 42 Schaukelatmung. </p><p><b>Therapie:</b> nicht mit AB sondern O2, Nase frei halten, parenterale Ernährung; ev Betamimetika, Steroide</p>',
	'Ein14jhrigerBubprsentiertsichmitdenfolgendenSymptomenundAnam':	'<p>Das kommt dankenswerterweise in den Skripten nicht vor. Pschyrembel sagt: Lymphknotenschwellung, Kompression anderer Organe, bei Erstmanifestation meist schon nodaler Befall. Die Duale Reihe sagt m:f 3:1, 0,8/100000 bis 15a, stets hochmalign im Kindesalter, wegen des schnellen Wachstums oft Notfallsymptomatik und sonst kurze Anamnese. DD bzw andere Antwortmöglichkeiten TBC, EBV, M.Hodgkin(langsamere Klinik, beste Prognose aller Malignome, B-Symptomatik – Fieber, Nachtschweiß, Gewichtsverlust), andere Malignome bzw je nach Lokalisation.</p>',
	'WasistdieTherapiederWahlbeidercommunityaquiredpneumoniabeiei':	'<p>bis 6 Monate stationäre Therapie (i.v.), bis ins Kleinkindalter Augmentin, Cephalosporine, ab Schulkindalter Makrolide, Cephalosporine, Augmentin (sowohl oral als auch i.v.). Da der AZ gut ist und das Kind nicht mehr ganz klein, kann es auch mit oraler Antibiose daheim behandeln.</p>',
	'WassindKardinalsymptomedesAtemnotsyndromsbeimFrhgeborenen':	'<p>Tachypnoe ist logisch; Nasenflügeln weil Kinder Nasenatmer sind; Einziehungen weil die Atmungsbewegungen größer sind, als sich die Lunge ausdehnen kann und der Unterdruck dann Einziehungen bewirkt; exspiratorisches Stöhnen ist ein Zeichen eines selbstgemachten PEEP und hört sich schlimmer an, als es ist; Zyanose ist das Ergebnis der ineffizienten Atmung. In den anderen Antwortmöglichkeiten steht wohl Surfactantmangel, Lungenhypoplasie, Pneu, Pneumonie – die aber allesamt keine Kardinalsymptome sind sondern Erkrankungen.</p>',
	'Ein2jhrigesKindwirdwegeneinesLungenversagensbeiSepsisbeatmet':	'<p>Mit logischem Denken erkennt man, dass man bei der Beatmung nicht wach sein möchte – auch nicht als Kind.</p>',
	'BeieinemVolksschulkinddasbislangimmerwiederkehrenderespirato':	'<p>Fremdkörper könnten einem da auch einfallen, wobei das Volksschulalter und die wiederkehrende Symptomatik dagegen sprechen. Bei fieberhaften Infekten der Atemwege mit anhaltendem Husten und mittel- bis grobblasigen RGs oft Fehldiagnose Pneumonie → in Wirklichkeit chronisch obstruktive Bronchitis oder akut exazerbiertes Asthma. (aus „ambulante-pädiatrie-koller.pdf“)</p>',
	'WasistdiehufigsteUrsacheeinerLungenverschattungimThoraxRntge':	'<p>Fremdkörper rangiert auch weit oben – genau Angaben hab ich leider nicht gefunden.</p>',
	'BeiwelcherderfolgendenInfektionskrankheitenistkeineHerdenimm':	'<p>Laut „impfungen-maurer.pdf“ geht das nicht bei Tetanus, Influenza, FSME, Tollwut, Pneumokokken. Man braucht für Herdenimmunität nämlich eine Krankheit, die nur den Menschen befällt. CAVE: es gibt Herdeneffekte bei der Influenza – sprich wenn sich alle impfen lassen, profitieren die davon, die man nicht impfen darf/kann.</p>',
	'AbwelchemLebensalteristdieImpfunggegenRotavirusallgemeinempf':	'<p>ab vollendeter 6.Woche bis 6.Monat 2-3x Schluckimpfung.</p>',
	'WelcherImpfabstandistbeiImmunisierungmiteinemTotimpfstoffzue':	'<p>CAVE: Aber nicht als Mischimpfung!</p>',
	'WieoftmussnachvollstndigerImmunisierung2xMMRMasernMumpsRteln':	'<p>MMR im 13. und 20-24.Monat sowie nachholen wenn nicht zwei Mal geimpft und Krankheit nicht durchgemacht. Beim Erwachsenen können beide Impfungen im Abstand von 4 Wochen nachgeholt werden; speziell von 15-30a wichtig, weil mangelhafte Durchimpfung (Quelle: Impfplan 2011)</p>',
	'WelchederfolgendenAussagentrifftaufdenvesicoureteralenReflux':	'<p>Das wichtige sind vor allem die aufsteigenden Harnwegsinfekte. Man kann ihn in mehrere Grade einteilen, aber nur mit MCU; im US kann man höhergradige Infekte sehen.</p>',
	'WelcheErkrankungmanifestiertsichniealsnephrotischesSyndrom':	'<p>Pyelonephritis ist im Grunde ein hochfieberhafter Harnwegsinfekt mit Flankenschmerz. Ein nephrotisches Syndrom hat große Proteinurie, Hypalbuminämie und Hyperlipidämie sowie meist generalisiertes Ödem. 90% sind idiopathisch, davon 77% Minimal-Change-Glomerulonephritis.</p>',
	'EineMinimalChangeNephropathieisteineUrsachefreinnephrotische':	'<p>Vorwiegend 3a-6a, lageabhängie Ödeme, wenig Urin, Thrombosen, vergrößerte Leber; CAVE: Infektneigung → Peritonitis!; elektronenmikroskopisch sichtbare Podozytenschädigung (Pschyrembel)</p>',
	'Beieinem3JahrealtenKindinreduziertemAllgemeinzustandwerdenim':	'<p>In den anderen Antwortmöglichkeiten steht bestimmt das akute Nierenversagen (wegen des hohen Krea). HUS häufig durch EHEC (oder Shigellen) → mit Diarrhoe(typisches) oder Autoimmun(atypisches); hat Nierenversagen, hämolytische Anämie, Thrombopenie, Verbrauchskoagulopathie. Unser Patient hat ein Nierenversagen, ein niedriges Hb, niedrige Thrombos usw. Therpaie mit Plasmapherese, Plasmaaustausch mit Fresh Frozen Plasma, Dialyse, ev. Erys, Humanalbumin. SIP6-Fragen 2007-2010 44 44</p>',
	'Ein5MonatealterSuglingwirdwegendesVerdachtsaufmotorischeEntw':	'<p>Floppy infant = neuromuskuläre Erkrankung; Verlust von Meilensteinen, Faszikulieren der Zunge, Einziehungen (neuropaediatrie-seidl.pdf); Exitus binnen 12 Monaten durch respiratorisches Versagen. Typ I lernt nicht sitzen, Typ II lernt sitzen aber nicht gehen, Typ III lernt gehen.</p>',
	'WiewirddieZliakiebehandelt':									'<p>Also kein Weizen, Gerste, Roggen, Dinkel, Grünkern, Kamut, (Hafer?) Auch bei asymptomatischer Zöliakie muss Diät gehalten werden, sonst gibt’s u.a. Lymphome. Diagnostik (funktioniert nur, wenn momentan auch Gluten in der Ernährung ist) über endomysiale IgA, T-Transglutaminase IgA, Anti-Gliadin-Ak (IgA, IgG) → Screening von Risikopopulationen. 1:1000; Kann sich auch als Wachstumsstörung mit Aufholwachstum bei passender Diät; Teebeutelgesäß</p>',
	'WelchederfolgendenErkrankungenistnichtimsterreichischenNeuge':	'<p>Dafür 34 andere und im Gegensatz zu Deutschland wird in .at auch nach der Cystischen Fibrose gescreent.</p>',
	'ImAltervonwenigenMonatenflltbeieinemKindeinepsychomotorische':	'<p>1:6000, mentale Retardierung, Hyperaktivität, keine Akut-Verläufe; wichtig: Therapie der maternalen PKU präkonzeptionell</p>',
	'WelchederfolgendenTherapienwirdbeiPhenylketonurieangewendet':	'<p>Und weil man ohne Protein nicht leben kann bekommt man Aminosäuremischungen ohne Phenylalanin.</p>',
	'WelcheNahrungdarfeinemKindmitGalaktosmienichtgegebenwerden':	'<p>Bzw alles wo Lactose drin vorkommt (weil Lactose aus Galaktose + Glukose besteht)</p>',
	'WelchesSymptomfindetmannichtbeiderklassischenGalaktosmie':		'<p>beim Galaktokinasedefekt gibt es nur Katarakte (bereits ab der 3.-5.Lebenswoche); bei der Galaktosämie steht das akute Leberversagen in den ersten Lebenstagen mit Hepatomegalie, Ikterus, Gerinnungsstörung, Hautblutungen; bei protrahiertem Verlauf Entwicklungsverzögerung, Leberzirrhose, Katarakte unterschiedlich stark retardierte Sprachentwicklung</p>',
	'WasistbeieinerneonatalenHyperammonimiediewahrscheinlichsteDi':	'<p>Ferner Organoazidopathien, Leberversagen, Transiente Hyperammonämie; </p><p><b>Therapie:</b> Stop der Eiweiß- Zufuhr, Glucose 10mg/min/kgKG, Proteinzufuhr 0,5mg/kgKG, NH3-Entgiftung (Na-Benzoat, Diurese, Hämodialyse, KEINE Peritonealdialyse)</p>',
	'WelchesSymptomkommtbeiderDiagnoseeinerMitochondropathieamhuf':	'<p>Werden nur maternal vererbt, Lactat entsteht weil oxidative Phosphorylierung behindert wird. Dazu gibt’s durch die Laktaterhöhung gratis die metabolische Azidose → Laktatacidose: pH <7,3, Laktat >2,7mM (25mg/dl), Urin Laktat >20µm/kg/d, Liquor Laktat erhöht SIP6-Fragen 2007-2010 45 45</p>',
	'DieHeilungschancenfrKindermitakuterlymphatischerLeukmieliege':	'<p>Laut meiner Mitschrift in der VO: ALL 80, AML 60%, Non-Hogkin-Lymphom 80-90%, Hodgkin-Lymphom 90%. Die Infos im Block16-Buch sollen angeblich ausreichen.</p>',
	'DieamhufigstenauftretendenMalignomebeiKindernsind':			'<p>34% Leukämie, 17% ZNS-Tumore (häufigster solider Tumor), 12% Lymphome; 8% Neuroblastom (häufigster solider, extracranieller)</p>',
	'HypoallergeneNahrungensindindiziertbeiallenSuglingen':			'<p>Laut Dualer Reihe zahlt sich hypoallergene Milch aus, wenn nicht gestillt werden kann und die Eltern atopiebelastet sind.</p>',
	'Ein14jhrigerKnabewirdwegenKleinwuchsvorgestelltdieKrpergreli':	'<p>Scheinbare Wachstumsstörung, Ziellänge im Normbereich; verzögerte Pubertätsentwicklung, Längenprognose im Normbereich</p>',
	'ZurBeurteilungeinesKleinwuchsesistsindfolgenderParameterrele':	'<p>Größe der Eltern, Wachstumsgeschwindigkeit, Pubertätsentwicklung</p>',
	'DasMarfanSyndromisteinegenetischbedingteErkrankungmitGrowuch':	'<p>1:4000 (autosomal dominant), Mutation in Fibrillin Gen, Herz: Aortenwurzeldilatation/-dissektion, Mitralklappenprolaps, Auge: Linsenektopie, Myopie, Skelett: Trichterbrust, überstreckbare Gelenke, Großwuchs</p>',
	'BeiderkonstitutionellenEntwicklungsverzgerungKEVistfolgendeA':	'<p>Verspätete Pubertät, Längenprognose im Normbereich, Ziellänge im Normbereich</p>',
	'WodurcherfolgtdieDiagnoseeinesWachstumshormonmangels':			'<p>Dokumentation der Wachstumsstörung, Serum IGF-1, IGFBP-3 vermindert, verminderte Stimulierbarkeit von WH im Stimulationstest, Ausschluss anderer Ursachen, MRT Hypophyse/Hypothalamus</p>',
	'Beieinem5jhrigenMdchenkommteszurAusbildungeinerBrustentwickl':	'<p>Normale Pubertas Präcox: idiopathisch/ZNS-Störung führt zum pubertären Gonadotropinmuster und damit zu Östradiol/Testosteron. Th: GnRH-Antagonist; bei der Pseudo-Pubertas präcox sind die Steroide nicht vom Hypothalamus gesteuert sondern aus Tumoren oder autonomen Ovarialzysten.</p>',
	'FolgendeSymptomesindtypischfreinenkongenitalenHypothyreoidis':	'<p>Adaptationsstörung; Dysgenesien (60-80%), Agenesien (20-30%), Synthesestörung (10%); 1:4000; Therapie mit L-Thyroxin. Erworbene HT bei Hashimotothyreoiditis (f>m, Pubertät, meist latent nicht manifest)</p>',
	'BeimAdrenoGenitalenSyndromAGSbedingteinEnzymdefekteineStrung':	'<p>90% haben den 21-Hydroxylase-Mangel, der Rest hat 11-Beta-Hydroxylase- oder 3-Beta-HSD-Mangel, Egal welches davon für zu Virilisierung und NNR-Insuffizienz und bei schweren Formen zu lebensbedrohlichem Salzverlust (Addisonkrise) in den ersten 2-3 Lebenswochen. 1:12000, Therapie mit Gluco/Mineralocorticoiden und plastischer Chirurgie gegen die Virilisierung</p>',
	'WelchehormonelleStrungzeigtdasDiGeorgeSyndromnebenangeborene':	'<p>Deletion auf 22q11; hat T-Zell-Defekt, Thymushypoplasie, Herzfehler, Hypokalzämie, Fischmund, Mikrognathie, faziale Dysmorphien; heißt auch CATCH22 für Cardiac abnormality, Abnormal facies, Thymic hypoplasia, Cleft palate, Hypocalcemia, 22nd chromosome; Therapie der Hypokalziämie, im schweren Fall Knochenmarkstransplantation für die Immunschwäche</p>',
	'Ein12jhrigesMdchenwirdmitakuterKetoazidoseeingeliefertEszeig':	'<p>Diagnostik ist wie bei älteren Diabetikern, OGTT; Es gibt Enuresis, schlechtes Gedeihen, Dehydratation, Bewusstseinseinschränkung. Therapieziel: Vermeidung von Stoffwechsel-Entgleisungen und normale Entwicklung; möglichst niedriges HbA1c mit gleichzeitig möglichst wenig Hypos (80-120mg/dl nüchtern, 140-180 postprandial, HbA1c 6-7,5%); Hypo gilt ab <60mg/dl</p>',
	'EinKindmitneumanifestiertemDiabetesmellitusTyplundKetoazidos':	'<p>isotone Kochsalzlösung nicht mit Natriumsubstitution verwechseln!</p>',
	'FolgendeSymptomesindtypischfreineneonataleHypoglykmieausgeno':	'<p>Zittern, Tachycardie, Unruhe, Schmerzen oder dann schon neuroglykopenische Symptome (sollte eigentlich erst um die 40mg/dl Auftreten, wenn der GLUT1 im Gehirn nicht mehr gesättigt werden kann) müde, schläfrig, matt, verhaltensauffällig, Schwierigkeiten beim Sprechen/Denken, Doppelbilder, Bewusstlosigkeit, Krampfanfälle. Also im Prinzip alles was man sich vorstellen kann AUßER einer Hautmanifestation.</p>',
	'WelchesSymptomistnichttypischfrdieErstmanifestationeinesDiab':	'<p>Ist ein Hyposymptom und Typ1-Diabetiker kommen wenn dann mit einer Hyperglykämie in die Diabetesambulanz.</p>',
	'WelcheanatomischenFaktorenbegnstigendasAuftretenrespiratoris':	'<p>Risikofaktor Kontakt mit anderen Kranken (Kindergarten, Spielplatz,…) SIP6-Fragen 2007-2010 47 47 Nach „das infektanfällige Kind“ müssten das die Nasenatmung, die disproportional engen peripheren Atemwege und die Durchlassfähigkeit gegenüber den zentralen Atemwegen sein.</p>',
	'EinenichtimmuneSchwangerehatinder12SchwangerschaftswocheKont':	'<p>Typisch ist die Gregg-Trias mit Innenohrschwerhörigkeit, Katarakt und Herzfehlbildungen. Darum Impfung checken, speziell in der Altersgruppe 15-30.</p>',
	'WelchedernachfolgendenDiagnosenistkeinetypischeKomplikationi':	'<p>Masern haben 20% Komplikationsrate, 6 Monate Nestschutz, dann lebenslange Immunität Verlauf: infektiös von 3d vor bis 4d nach Exanthemausbruch, 8-12d Inkubationszeit; beginnt mit Prodromalstadium 4- 5d (hohes Fieber, Schnupfen, Kojunktivitis, Koplik-Flecken + Enanthem), Fieberabfall → Exanthemstadium (14-15d postinfektiös mit erneutem Fieberanstieg, makulopapulöses Exanthem) Komplikationen: Riesenzell-Pneumonie, Otitis media, Krupp, Keratitis, Appendizitis, Hepatitis, Myocarditis; 0,05-0,1% akute Masernencephalitis (15-25% letal, 30% Defektheilung), SSPE: 1:10000 (meist 7a nach Erkrankung, Letalität 100% nach 3-5a) Diagnostik: Masern IgM, PCR, EEG, Therapie symptomatisch (AB bei Superinfektion) → MMR-Impfung 2x! trivalent oder tetravalent (inkl. Varizellen)</p>',
	'WelcheInfektionskrankheitkannbeiAufnahmederTtigkeitaufeinerP':	'<p>Ist eine Rarität und nur bei stillenden Müttern mit FSME-Infektion; bei Tollwut geht’s nur durch Organtransplantation</p>',
	'Ein3JahrealtesKindfiebertber39CtrotzantibiotischerTherapiemi':	'<p>Dran denken bei hohen Entzündungszeichen, Fieber >5d (>7d bei <6Mo alt), + 2 Hauptsymptome, v.a. im frühen Säuglings/Kleinkindalter 3Mo bis 5a, m:f 3:2, selbstlimitierende systemische Vaskulitis, 1-3 Mo; braucht Fieber >5d und 4 Hauptsymptome (Auschluss der DD): bilaterale konjunktivale Injektion, orale Entzündung, Veränderungen der distalen Extremitäten, exanthem an Stamm/proximalen Extremitäten, Vergrößerung der zervikalen LK; Nebensymptome: cardiovaskulär!, Uveitis, Urethritis, Meningitis, Arthritis; Komplikation: Koronaraneurysma, MyocarditisDiagnostik: BB, BSG, CRP, GOT/GPT, Troponin-T, Urinstatus, Herzecho, EKG; ev. cardiologische Langzeitbetreuung; </p><p><b>Therapie:</b> IVIG! (innerhalb 10d), ASS 80-100mg/kg/d p.o. bis 48h nach Abfiebern., dann bis 6-8Wo nach Krankheitsbeginn 5mg/kg/d;  SIP6-Fragen 2007-2010 48 48</p>',
	'Ein3jhrigesKindwirdwegenseit2TagenbestehenderPetechienvomKin':	'<p>Petechien → Thrombozyten betroffen; ITP: 2-6a, gesundes Kind, Infekt vor einigen Wochen, akuter Beginn, thrombozytäre Blutungen, selbstlimitiert (>80%!); </p><p><b>DD:</b>	 Knochen/Gelenksschmerzen, Bauchschmerzen, Abgeschlagenheit, Infektanfälligkeit → Leukämie, aplast. Anämie; Diagnostik: isolierte Thrombopenie (<20G/l), ev. Knochenmarkspunktion; </p><p><b>Therapie:</b> (wenn signifikante Blutung) Kortison 2-4mg/kg/d für 1 Woche, IVIG</p>',
	'Ein3jhrigesKindwirdmit40CFiebersomnolenteingeliefertImBereic':	'<p>Hohes Fieber >39°C + Petechien + reduzierter AZ = Meningokokkensepsis (aus Vo Allgemeinpädiatrie)</p>',
	'Ein4jhrigerBubmitbekannterHIVInfektionwirdwegenseiteinemMona':	'<p>CMV-Retinitis heißt AIDS; kann auch Pneumonie machen (bei Neugeborenen) bis zur 12.Woche oder eine virale Vasculitis; Behandlung mit Foscarnet, Ganciclovir. perinatale Übertragung 25% bei unbehandelter Mutter, 2% wenn Mutter und Kind behandelt. Diagnostik: Viruskultur mit 2 Wo/1Mo/3Mo/6Mo, bzw PCR; asymptomatisch bei Geburt, milde/mittelschwere/schwer Form. Mild: Gedeihstörung, Lymphadenopathie, rezidivierende Infekte der oberen Atemwege; Mittelschwer: Fieber >1Monat, Candidiasis >2 Mo, HSV, CMV, schwere bakt. Infekte; Schwer = AIDS: definiert durch: bakteriell (>1 schwere in 2a, Tbc, atyp. Mycobakt), Pilz (pulmonal, extrapulmonal), Parasiten, HIV- SIP6-Fragen 2007-2010 49 49 Encephalopathie, Kachexie (wasting syndrom); </p><p><b>Therapie:</b> Antiretrovirale Mehrfachtherapie, Therapie der opportunistischen Erkrankungen, Impfungen (normal + Pneumokokken, Influenza)</p>',
	'DerstatistischhufigsteangeboreneImmundefektinderwestlichenWe':	'<p>haben meist keine Symptome, bei IgG-Mangel gibt’s Pneumonien, bei CVID rezidiverende bakt. Infekte, Autoimmunerkrankungen, Gastritis und Pyodermien</p>',
	'Ein12jhrigesMdchenmitFieber389CundblutigemDurchfallkommtindi':	'<p>Pat. Ist in gutem Zustand und keine Risikogruppe → Supportivtherapie kann man auch daheim machen! Typhus gibt’s in .at nur noch eingeschleppt(Salate, Eis, Wasser im Urlaub), ist lebensgefährlich (30% unbehandelt tot, 1% mit bester Behandlung); Symptome: gleichmäßig hohes Fieber um 40°C, Kopfschmerz, Husten, Bauchweh, Myalgie, Diarrhoe (ab Woche 3), Roseolen (ab Woche 2), Obstipation, Erbrechen, Splenomegalie; Diagnostik: Blutkultur/Stuhlkultur, Serologie;	 Komplikation: Elektrolytentgleisung, Dehydratation, Perforation mit Peritonitis, Milzruptur, Sepsis, CHOLEZYSTITIS!(kolonialisieren Gallensteine → Dauerausscheider!) …; </p><p><b>Therapie:</b> supportiv (E-Lyte, Flüssigkeit, NSAR); AB(Ceph. 3G, Ciprofloxacin) nur bei <3Mon oder Immunsuppresion, Sichelzellanämie, schwerer Verlauf; sonst führen AB zu verlängerter Bakterienausscheidung; Impfung!(infektionskrankheiten-hermon.pdf)</p>',
	'Ein2jhrigesMdchenwirdmiteinemExanthemandenStreckseitenderExt':	'<p>1,4:10000, 2-8a m>f, Entzündung dermaler Venen (häufig + Niere, GIT, Gelenke ZNS), postinfektiös (Streptokokken, Parvo B19); 1-2 Wochen nach Infekt akute Purpua (nicht wegdrückbare Maculae, palpabel, Arthralgien, kolikartige Bauchschmerzen (80%!), 40% Rezidive; Komplikationen: Niere 70% (Proteinurie, mikroskopische Hämaturie, bis zu 35% Glomerulonephritis); Diagnostik: Hautbiopsie, Verlaufskontrollen (Niere!); </p><p><b>Therapie:</b> bei Haut keine Therapie, NSAR, orale Glucocorticoide (Organbeteiligung)</p>',
	'Ein7MonatealterSuglingwirdmiteinerraschenZunahmedesKopfumfan':	'<p>Hydrocephalus! Symptome: Kopfumfangszunahme, vorgewölbte Fontanelle, Klaffende Nähte (gesprungener Topf), Sonnenuntergangsphänomen, Hirndrucksymptome; </p><p><b>Therapie:</b> Shunt</p>',
	'EinFrhgeborenesausder245SchwangerschaftswocheaufIhrerStation':	'<p>Multifaktoriell bedingt (Minderperfusion/Hypoxie), primäre/sekundäre Infektionen, Häufig bei Ductus arteriosus apertus; Schädigung der Darmschleimhaut → eindringen toxinbildender Bakterien in die Darmwand; Diagnostik: Abdomen leer, </p><p><b>Therapie:</b> konservativ – enterale Ernährung beenden, Entlastung von Magen/Darm, AB; chirurgisch (Entlastungsdrain, Darmresektion, Enterostomie), Komplikationen: Bridenileus → OP, Kurzdarmsyndrom → Maldigestion</p>',
	'EinFrhgeborenesder28Schwangerschaftswochezeigtunmittelbarpos':	'<p>parenteral, enteral, stillen, Formelnahrung, hypoallergen,…</p>',
	'EinSuglingwirdauseinembrennendenHausgerettetObwohlerkeinedir':	'<p>ab 10% CO-Hb Kopfschmerz, ab 30% Schwindel, Brechreiz, ab 40% Bewusstlosigkeit, Krämpfe, ab 60% Atemlähmung. Klinisch hellrote (kirschrote) Hautfarbe. </p><p><b>Therapie:</b> 100% O2, Behandlung Azidose/Hirnödem; CAVE: Spätschäden sind bei kleineren Kindern möglich!</p>',
	'AnderIntensivstationwirdeinKindnachschweremSchdelhirntraumab':	'<p>SHT durch Wickeltisch, Schütteltrauma, häusliche/Verkehrs-/Sportunfälle; Erhöhte Vulnerabilität durch Ak/Dezelerationstrauma; CPP = MAP – ICP = 70-20 = 50. Laut Tertialbuch Notfallmedizin wird ab 20 mmHg therapiert. Allerdings ist durch den hohen MAP der CPP noch in Ordnung – bzw laut Trittenwein genau grenzwertig (er soll über 50 mmHg liegen) (paediatrische-intensivmedizin-teil-ii-trittenwein.pdf); Mögliche </p><p><b>Therapie:</b> Katecholamie für RR-rauf, 30°-Lagerung, Normo (Hypo)thermie, Barbiturate, Mannitol, Ventrikeldrainage (intensivmedizinische-therapie-golej.pdf) Betreffend die Psychologie und die folgenden Fragen empfehle ich dringend, dass ihr euch die zwei Dokumente „vorlesung- klinische-psychologie.pdf“ und „praktikum-klinische-psychologie.pdf“ durchlest. Da stehen Unmengen möglicher Fragen drin und man kann es nicht wirklich zusammenfassen. Leider sind das meiste die „eh-logisch-Geschichten“ ähnlich Block 20 – leider weiß man nie vorher, was die anderen Antwortmöglichkeiten sind. Immerhin scheinen die Psychologen die meisten möglichen SIP-Fragen fett bzw unterstrichen oder andersfärbig markiert zu haben. Die üblichen Listen, die sich schön mit den „Was gehört dazu, ausgenommen“-Fragen prüfen lassen, sind natürlich auch dabei.</p>',
	'FolgendeFaktorengehrenzudenmglichenrisikoerhhendenFaktorenfr':	'<p>Asphyxie, Infekt, Fehl/Missbildungen, ev protrahierte Geburt fällt mir da akut ein. Wenn die Frage aus der klinischen Psychologie kommt, dann sind es prä/peri/postnatale Faktoren (Frühgeburt, Krampfanfälle), schlechte Ernährung/Substanzabusus der Mutter, schwieriges Temperament des Kindes.</p>',
	'Ein8jhrigesKindbentigteineBlutabnahmeWieknnenSieesambestenzu':	'<p>Oder „nicht überreden, sondern mit Argumenten überzeugen!“ wie die Psychologen sagen.</p>',
	'Ein10jhrigesKindwirdmitderDiagnoseAsthmakonfrontiertWelcheKr':	'<p>Alles, was ich zu dem Thema finde ist, dass laut Psychologie mit dem Alter des Kindes die Anzahl an Organen steigt die es auseinander halten kann.</p>',
	'WasgehrtnichtzudenPhasendertraumatischenKrise':				'<p>Schock, Reaktion, Bearbeitung, Neuorientierung; CAVE: nicht mit den Sterbephasen verwechseln. Definition der traum. Krise: kann im Augenblick nicht bewältigt werden, weil mit den bisher erworbenen Fähigkeiten und erprobten Hilfsmitteln der Patient trotzdem überfordert ist.</p>',
	'WasgehrtnichtzumInterventionsspektrumderKlinischenPsychologi':	'<p>Aufgaben sind psychologische Diagnostik + Interventionen, Beratung, Behandlung, Begleitung SIP6-Fragen 2007-2010 52 52</p>',
	'WasistkeinepsychologischeIntervention':						'<p>Erziehungsberatung, Elterntraining, Spieltherapie, Familientherapie; sozial: Familienhelferin, MOKI (mobile Kinderkrankenschwester), Frühförderung, Finanzielle Hilfen, Obsorge (praktikum-klinische-psychologie.pdf) oder Beratung im Umgang mit somat/psych Erkrankungen/Beeinträchtigungen, Schullaufbahnberatung, Erziehungsberatung, Paar- und Familienberatung.</p>',
	'WelcherBereichwirddurchdiepsychologischeDiagnostiknichtabged':	'<p>Entwicklungsdiagnostik, Leistungdiagnostik, Teilleistungs-& neuropsychologische Diagnostik, Persönlichkeitsdiagnostik, Interaktions/Familiendiagnostik, Ressourcendiagnostik.	  SIP6-Fragen 2007-2010 53 53 GYNÄKOLOGIE Da sich einige Fragen nicht mit den Vorlesungsunterlagen beantworten lassen, habe ich zur Dualen Reihe – Gynäkologie gegriffen und einige Infos von dort hinzugefügt. Die exemplarischen Prüfungsfragen in den Vorlesungs-PDFs decken sich großteils mit SIP-Fragen → unbedingt ansehen, manche wurden noch nicht gestellt.</p>',
	'WielangedauertimDurchschnittdieErffnungsperiodebeiMultiparae':	'<p>Eröffnungsperiode = Zeit vom Geburtsbeginn (Wehenbeginn) bis zur vollständigen Öffnung des Muttermundes. Laut Skriptum (12 – die normale Geburt) dauerts 8,6h bei Nulliparae und 5,3h bei Multipara. Laut Dualer Reihe sinds 8 bzw 4 Stunden.</p>',
	'UmdiemtterlicheMilchproduktionderBrustpostpartumbesonderszus':	'<p>täglich 3-4h → Oxytocin-Ausschüttung und Milchbildung, dann gibt’s nach 3-4d Milch.</p>',
	'EineWchnerinentwickeltam3TagnacheinerSpontangeburtmitDammris':	'<p>Die Endometritis als Diagnose steht hier außer Frage. Dammriss I: Scheidenschleimhautriss, II: Riss bis M.sphincter ani externus, III: inkl Sphincter, IV: inkl Rektum- Schleimhaut; I/II werden im Kreissaal versorgt, III/IV im OP; auch mediane/laterale Episiotomie können höhergradigen Dammriss nicht verhindern, treten aber nur bei besonders schneller Geburt auf.</p>',
	'ImRahmenderWochenbettvisiteberichteteineWchnerinkurznachderG':	'<p>treten vor allem bei Mehrgebärenden auf und sind Zeichen einer lokalen Kontraktion zur Blutstillung und Rückbildung des Uterus und können mehrere Tage dauern.</p>',
	'ImRahmenderWochenbettvisitestellenSiebeieinerWchnerinamzweit':	'<p>Ist ein Uterotonikum (genauso wie Ergotamin) und soll den schlaffen Uterus als Grundlage der Postpartalen Hämorrhagie verhindern.</p>',
	'SiediagnostizierenbeieinerPatientinnachderGeburteineUterusat':	'<p>Uterotonika - Oxytocin/Methylergometrin/Ergotamin; Sulpostron (nicht mi Oxytocin); Weiters Erykonzentrate, PGE1-Analoga in Einlage, Transexamsäure und andere blutstillende Maßnahmen wie Massage des Fundus (Hamilton-Handgriff) SIP6-Fragen 2007-2010 54 54</p>',
	'FallsbeieinervaginalenGeburtohneDammschnitteineAnsthesiedurc':	'<p>Verfahren der Wahl laut „12-die normale Geburt“ ist die Periduralanästhesie (mit 80% komplette Analgesie); die Spinale wirkt rasch und vollkommen und kürzer und hat geringere Dosierungen; bzw prinzipiell die Leitungsanästhesie, Geburtserleichterung Peridural/Spinalanästhesie; idealer Zeitpunkt für die PDA ist bei ~3cm Bei der Sectio nimmt man eine Spinalanästhesie.</p>',
	'FrdieFragederGeburtseinleitungimFallederTerminberschreitungi':	'<p>Genauer gesagt durch die Scheitel-Steiß-Länge (SSL) im 1.Trimenon. Nur beim gesicherten Geburtstermin ist eine Übertragung bis SSW42 erlaubt.</p>',
	'SiehabenwhrendderGeburtbeieinerPatientineineSchulterdystokie':	'<p>Überstrecken der Beine der Gebärenden → Hochnehmen in Steinschnittlage (ev. Wiederholung) → Symphyse hebelt sich über kindliche Schulter Schulterdystokie Risiko-Faktoren, >4000g (je schwerer desto mehr), DM, Adipositas der Mutter, Terminüberschreitung. Maßnahmen bei der Schulterdystokie sind: Tokolyse, große Episiotomie und McRobert’s Manöver; ferner suprasymphysärer Druck + Schütteln oder Zurückdrängen des Kopfes + Notsectio, Symphysiotomie. Komplikationen: 39% Plexusläsion, bis zu 15% Mortalität, hypoxische Hirnschäden, Geburtsverletzungen</p>',
	'ZudengefrchtetenKomplikationennacheinerSectiogehrt':			'<p>Eine primäre Sectio war vor Beginn der Eröffnungswehen, eine sekundäre danach. Komplikationen inkludieren Wundheilungsstörungen, ein höheres Thrombose-Embolie-Risiko, eine schlechtere Mutter-Kind- Beziehung und ein schlechteres Auspressen der Thoraxhöhle beim Kind. Endometritis steht allerdings nicht gesondert in den Lernunterlagen als gefürchtete Komplikation. (Die Unterlagen zur Sectio findet man in 12-die normale Geburt ab Seite 85)</p>',
	'WelcheanatomischenStrukturendurchtrennenSienichtbeieinerSect':	'<p>Durchtrennt werden Cutis, Subcutis, Faszie, Fruchtblase und nicht Harnblase, Ligamente usw. CAVE: laut MUW wird das Blasenperitoneum nicht durchtrennt, laut Dualer Reihe wird es zumindest eröffnet.</p>',
	'EinToxicShockSyndromisteineseltenepostpartaleKomplikationMit':	'<p>Heißt scheinbar auch Tamponkrankheit und kommt im Studium bestimmt vor – im Tertial Gynäkologie zumindest nicht im Skript.</p>',
	'EinePatientinwirdmitderDiagnoseschwerePreklampsiestationrauf':	'<p>Ist eine hypertensive Erkrankung (mild >140/90, schwer >170/110) mit Proteinurie (mild >0,3g/24h, schwer >5g/24h) mit höherem Risiko für Erstgebärende und ältere sowie alle die entweder selber(33-65%) oder in der Familie (22-39%) eine Eklampsie haben. Erhöhtes Risiko auch bei Mehrlingsschwangerschaft, „Notching“ in der placentaren Perfusion (=erhöhter Gefäßwiderstand), Hb >13, DM; </p><p><b>Therapie:</b> Antihypertensiv mit Methyldopa/Urapidil (1.Wahl), Metoprolol (2.Wahl) und Nifedipin (3.Wahl); Anfallsprophylaxe mit Mg+-Sulfat 4g iv + Erhaltungsdosis und im Krampfanfall Diazepam. Therapieziel: RR <160/100 (Schonung, Arbeitsfreistellung, normales fetales Wachstum, normale Laborparameter) SIP6-Fragen 2007-2010 55 55 Präeklampsie (erst ab 20.SSW sonst ist es eine chronische Hypertonie): RR, Proteinurie, Ödeme; +zentrale Symptome = Eklampsie; HELLP: Hämolyse, Elevated liver enzyms, low platelets</p>',
	'BeieinerPatientinkommteszueinerstarkenpostpartalenBlutungWas':	'<p>Ursachen: Geburtsverletzung, Uterusatonie, Plazentaretention (incarcerata – Ausstoßung behindert/adhaerens – Wehenschwäche) → Crede Handgriff zur manuellen Plazentalösung, Inversio uteri (geburtshilflicher Notfall! → Reposition); 500ml sind die Obergrenze</p>',
	'Eine17jhrigeFraukommtzuIhnenindieOrdinationSieberichtetdassi':	'<p>Ein Distraktor ist wohl der Sport; für eine Amenorrhoe braucht man laut Kinder-Block <17% KFA, für einen regelmäßigen Zyklus >22% KFA. Und nur zu den fruchtbaren Tagen verhüten hat jetzt auch nicht den besten Pearl-Index.</p>',
	'Eine35jhrigeFrauistim3MonatschwangerundkommtzurMutterKindPas':	'<p>Laut „10-normale Schwangerschaft“ wird abgeraten von: Weichkäse, Pasteten, ungekochtem Fleisch (Salami), rohen Muscheln, Fischen mit viel Quecksilber, Leber, Koffein >300mg/Tag (das sind immerhin 4 Espressos).</p>',
	'EinePatientinmchtewissenwarumesinihrerSchwangerschaftzueiner':	'<p>Sicher ist nur die Bestimmung der SSL im 1.Trimenon.</p>',
	'EinePatientinkommtinder30SchwangerschaftswocheindieAmbulanzu':	'<p>Gestationsdiabetes ist erstmals in der Schwangerschaft aufgetretene/diagnostizierte Glukosetoleranzstörung. oGTT nüchtern/1h/2h >90/180/155mg/dl. Folgen für Kind: Fehlbildungen (Herz, Niere), Frühgeburt, Makrosomie, Schulterdystokie, Fruchttod,… Wiederholungsrisiko für Mutter: 50%, 50% haben Diabetes innerhalb von 5a, durch körperliche Betätigung/Diät wird es in 30-50% verhindert. </p><p><b>Therapie:</b> Diät: 3 Haupt/3 Zwischenmahlzeiten, 4x tgl. BZ-Messung nü, 1h pp) → BZ-Einstellung nüchtern/1h <90mg/<130mg/dl. Insulintherapie, wenn Diät + Bewegung nicht fürs Erreichen der Ziele genügen. KEINE Terminüberschreitungen – idealerweise Einleitung/Sectio von 38.SSW bis Geburtstermin. Diabetes gibt es in der VO-Unterlage „10-normale Schwangerschaft“</p>',
	'Eine25jhrigeFrauleidetseitihrem18LebensjahrunterzyklischenUn':	'<p>E. ist versprengtes Endometrium(-ähnliches) Gewebe und eine häufige Ursache für sekundäre Dysmenorrhoe – 6-8% Inzidenz mit oft progredientem Verlauf; Symptome: Dysmenorrhoe zu Beginn periovulatorisch und später dann prämenstruell , Dyspareunie(=Sex-Schmerzen), Sterilität; Diagnostik über die Bildgebung, CA 125 und eine histologische Sicherung mit Laparoskopie. Therapie mit Gestagenen, Östrogen-Gestagen-Kombo, Danazol, GnRH-Analoga (hemmen LH/FSH) für 4-6 Mo; OP (Entfernung sichtbarer Herde, Verwachsungslösung, Refertilisierung); (aus „2-Beckenschmerz“)</p>',
	'WasverstehtmanunterdemBegriffSchokoladeCyste':					'<p>Ist eine funktionelle Ovar-Zyste mit dunkelbraun-roter Blutmasse von 3-6cm und macht zyklische Schmerzen.</p>',
	'AnwelcherderfolgendenenLokalisationentretenEndometrioseherde':	'<p>Peritoneum, Ovar (Schokoladenzyste), Ligamente des kleinen Beckens, Adenomyosis uteri, Extragenital (Darm, Blase)  Die nächsten Fragen beschäftigen sich mit dem Brustkrebs. Das Thema ist zwar recht umfangreich, aber ich empfehle stark die 4 passenden PDFs zu lesen, obwohl es einige hundert Folien sind. Daraus ergeben sich einfach Unmengen an Fragen und es ist eigentlich gut erklärt. (6b, 7, 8, 9a)</p>',
	'WelcherdieserFaktorenkanndasRisikoaufeinMammakarzinomreduzie':	'<p>Lebenszeitrisiko in .at ist 1/8-10, je älter desto wahrscheinlicher. Zwischen 45a-70a, 4800 Neuerkrankungen/Jahr; 75% brusterhaltende OP (in .at >80%) SIP6-Fragen 2007-2010 58 58 Positiv: späte Menarche, frühe Menopause, Stillen > 12Monate, min 2 Schwangerschaften, Schwangerschaft vor 30; 4h Sport/Woche senkt um 40% Negativ: Gegenteile von oben; Alkoholkonsum (je mehr desto schlimmer),</p>',
	'AbwelchemLebensalterwerdenimRahmendesScreeningprogrammesrege':	'<p>CAVE – das ist eine Maßnahme der Früherkennung, keine Vorsorgeuntersuchung; ab 40 alle 2a, ab 50 jedes Jahr Kommt in der Triple-Diagnostik klinische Untersuchung (Inspektion, Palpation, Risikoanamnese) + Mammographie + Ultraschall + ev. Corebiopsie; je fettreicher die Brust, desto besser ist die Mammographie – idealerweise am 6.-12. Zyklustag untersuchen; Tumoren sehen aus wie Herdbefund, Strukturunruhe, Gewebsasymmetrie, Mikrokalzifikation; Mammographie hat aber niedrige Spezifität und langsam wachsende Läsionen kann man nur im Verlauf beurteilen (senkt falsch Positive bis zu 50%); MR-Mammographie bei dichter Brust, Narbe vs Rezidiv, Brustimplantat, Fibrose nach Strahlenbehandlung; BIRADS: 0 = n.b., 1=normal, 2 = sicher gutartig, 3 = >98% gutartig → Followup nach 6 Mo, 4 = mlgw. malign →Nadelbiopsie + Verlauf, 5= >95% malign, 6 = histologisch verifiziertes Ca</p>',
	'AufwelchemChromosomistdasBrustkrebsgenBRCA1lokalisiert':		'<p>Genauer: 17q. Männer haben wenn dann BRCA 2, das sitzt auf Nr.13q</p>',
	'BeiwelcherfamilirenAnamnesesolltemansicheinerGendiagnostikhi':	'<p>Nur 5-10% von Mamma/Ovar-Ca sind erblich. 250-450 Fälle/a bzw 1/500 der Bevölkerung; bezahlt wird von der Kasse die genetische Untersuchung (5000-7000€) bei BK bis 35, min 2 BK bis 50, min 3 BK bis 60, 2 OK oder 1 OK + 1 BK bis 50 oder wenn ein Mann und eine Frau betroffen sind. Die die BRCA1 haben, haben 60-80% BK/53% OK bis 70a und vorwiegend junges Erkrankungsalter. Dann beginnt die Früherkennung schon ab 18, die MG ab 25, die Vagsono + OK-Marker ab 35. Man kann sogar eine prophylaktische Brust(10% Restrisiko) und Ovar-Entfernung(1% Restrisiko) vornehmen</p>',
	'WelchegutartigenBrustvernderungenhabendashchsteRisikozurEntw':	'<p>aus Skriptum „7-klinik benigner…“ Gering erhöhtes Risiko bei mittelstarker Hyperplasie, Sklerosierender Adenose und radialen Narben → Review, Biopsie, ev. OP Höheres Risiko (RR2.0-5,0) bei atypischer lobulärer und duktaler Hyperplasie (höher in prämenopausalen Frauen) → Histo + OP</p>',
	'WelchesMammabiopsieverfahrenergibtnureinzytologischesErgebni':	'<p>es gibt Feinnadel, Core, US-gezielt(gut >5mm), stereotaktisch MG-gestützt, MRT-gestützt(komplex, nur wenn nur im MR sichtbar), Mammotom(vakuumgestützt, bis zu 20 Gewebszylinder → entfernt kleine Läsionen komplett und markiert mit Metallclip)</p>',
	'75allerMammakarzinomewerdenbrusterhaltendoperiertWannistjedo':	'<p>multizentrisch heißt Läsionen in mehreren Quadranten, multifokal wären mehrere in einem Quadranten</p>',
	'AlsKontraindikationzueinerbrusterhaltendenoperativenTherapie':	'<p>KI sind lokal fortgeschrittenes Ca, keine freien Resektionsränder, exulzerierendes MammaCa sowie die relativen Brust/Tumorgröße, multizentrisch, bilateral, zentral, Ablehnung der adjuvanten Radiatio</p>',
	'WannisteinevollstndigeaxillreLymphknotenentfernungnotwendigB':	'<p>bis 0,2mm → isolierte Tumorzellen, bis 2mm Mikrometastase, darüber Makrometastase</p>',
	'WelcherMuskelwirdbeieinerkrpereigenenBrustrekonstruktionzumB':	'<p>Wenn Implantat, dann hinter den Brustmuskel; Prothesenverlust <10%, Infektionsgefahr nach CHT,</p>',
	'Eine61jhrigeFraumithormonrezeptorpositivenMammakarzinomerhlt':	'<p>adjuvante CHT mit Anthrazyklinen, Taxanen (neoadjuvant für Downstaging/sizing, immer bei großen Tumoren, lokal fortgeschrittenem Ca), palliativ auch CHT einzeln/Kombo; Hormontherapie prämenopausal (LHRH-Antagonist, Tamoxifen(Thromboembolien, Endometriumhyperplasie/-Ca); postmenopausal mit Tamoxifen(Thromboembolien!) und Aromataseinhibitoren (Osteoporose, Muskel/Gelenksbeschwerden); GnRH-Analoga (Lebensqualität, Osteoporose, Sexualstörung, Amenorrhoe, Wechselbeschwerden) Therapie der CHT-Beschwerden mit Antiemetika, G-CSF (Knochenschmerzen!), EPO (ev. Erys), Bisphosphonate, lokale Antimykotika, psychologische Betreuung. Radiatio: postop bei brusterhaltend und ev. bei Mastektomie (4+ LK, Infiltration Haut/Muskel, nicht R0); als Brachy oder Teletherapie, 4-6 Wochen nach OP bzw nach Chemo (die Strahlentherapeuten haben gesagt noch später), fraktionierte Behandlung, Spätfolgen: Verfestigung/Verkleinerung der Brust, Hautveränderungen, Lungenfibrose, Kardial (speziell in Kombo mit Anthracyklinen), Lymphabflussstörung; alleinige Bestrahlung bei multimorbiden, sehr alten, OP-Ablehnung, Haut/Muskel-Infiltrat, hat 30% Rezidiv/Progredienz</p>',
	'FolgendeFaktorensindwichtigfrdiePrognoseeinesMammakarzinomsa':	'<p>Prognosefaktoren sind Alter, Tumorgröße(je mehr desto schlechter), Lymphknotenbefall(je mehr desto schlechter), Histo, Hormonrezeptorstatus(besseres ÜL und weniger Rezidive), Her2-neu(schlechter), Lymphgefäßstatus</p>',
	'FolgendeNachsorgeUntersuchungwirdroutinemignacheinemMammakar':	'<p>jährliche Mammographie unabhängig vom Alter SIP6-Fragen 2007-2010 60 60 Nachsorge mindestens 10a (jährliche Progressionsrate von 2-8% bis zum 10.Jahr); körperliche + psychische + soziale Rehabilitation; primäres Ziel ist die Frühdiagnostik von Lokalrezidiv/kontralateral/Zweitkarzinom; Bei 64-91%  Metastasen symptomatisch →  chronische (rheumatische) Rücken/Knochenschmerzen, Lymphödem, Halsumfang, Beschwerden in der Brust, neurologische Symptome [das waren gerade die spezifischen Symptome] Kopfschmerzen, Wesensveränderung, Konzentrationsschwäche, Husten, Dyspnoe, Appetitlosigkeit, Gewichtsabnahme, Müdigkeit, Schwäche; Im Umkehrschluss kann bei symptomlosen Patientinnen aber auf alles außer Anamnese und klinische Untersuchung verzichtet werden! Früherkennung von Fernmetas keinen Überlebensvorteil.</p>',
	'WelcheKontrolluntersuchungistroutinemigbeiderNachsorgedesMam':	'<p>Ist veraltet, weil bis zu 30% falsch positiv und steigende Tumormarker keine Indikation für die Therapie darstellen, weil keine Relevanz für Krankheitsverlauf.</p>',
	'BeieinervonIhnenmitbetreutenBrustkrebspatientinisteszumAuftr':	'<p>Prinzipiell nicht falsch aber mit Knochenmetastasen zu gefährlich Bisphosphonate, Schmerzmittel, Absetzen von G-CSF (wenn sie genügend Neutros hat)</p>',
	'BeihormonsensitivenMammakarzinomenistfolgendeendokrineTherap':	'<p>Sprich die Pille – sei es nun zur Kontrazeption oder zu Reduktion von perimenopausalen Beschwerden. Außerdem macht die Hormonersatztherapie schon alleine eine deutliche Zunahme der MammaCa-Rate (26%!) – speziell gefährdet sind die mit Östrogen und insbesondere die mit Östrogen-Progesteron-Therapie. 10 Jahre nach letzter Einnahme relativiert sich das Risiko.</p>',
	'Eine30jhrigeFrauistfamilirbelastetmitOvarialkarzinominderFam':	'<p>Epidemiologie: 15/100000, 1-2% Lebenszeitrisiko. 5-Jahres-Überleben 32% (weil symptomarmer Verlauf und 70% in fortgeschrittenem Stadium entdeckt) → höchste Mortalität aller Genitaltumore; 60% Epithelial/stromal, 30% Keimzelltumoren (junge Frauen, einseitig, meist reife Teratome=Dermoidzyste), 8% Stromatumoren. Risikofaktoren: Alter, Familie, 5-10% genetisch (BRCA1/2, HNPCC, Lynch-Syndrom); können serös/muzinös/endometroid sein; Dysgerminom während Schwangerschaft; </p><p><b>Therapie:</b> HE mit Adnexexstirpation + pelvine und paraaortale LK., ab IIb erweitert radikal, ab IIIb inkl Scheide, ab IV nur Debulking</p>',
	'WassinddietypischenBeschwerdenbeieinemfortgeschrittenenOvari':	'<p>+ ev Akutes Abdomen durch Torsion, vaginale Blutung, pubertas praecox</p>',
	'WasistdasKardinalsymptomdesEndometriumkarzinoms':				'<p>bei 90%! - Andere sind übelriechender, blutiger Ausfluss, Unterbauchschmerz, Gewichtsverlust, Stuhl/Harn-Beschwerden Ist das häufigste Genital-Ca, 5-Jahres-Überleben 85%, ~63-65a → frühes klinisches Symptom ist die Postmenopausenblutung (bei 90%!); ensteht durch langen Östrogeneinfluss (späte Menopause, Adipositas, Östrogentherapie); Endometriumhyperplasie mit Atypien einfach 8%/komplex 30% Entartungsrisiko →HE; kein Screening – PAP IIIG; Diagnose über HSK + Cur, Therapie ist die Totaloperation mit Erweiterung</p>',
	'WelchesistkeinFrhsymptomeinesVulvakarzinoms':					'<p>keine/unspezifische Frühsymptome. Jucken, Schmerzen, Blutungen, Wundgefühl, Dyspareunie, später Dysurie, Hämaturie 3-5% der Malignome des weibl. Genitaltrakts; Gipfel: 65a, ensteht aus Lichen sclerosus; metastasiert in lokale Lymphknoten, Biopsie + Histo, CT/MRT</p>',
	'WelchesprimrediagnostischeVerfahrenwendenSiebeiBeckentumoren':	'<p>Wichtig ist hier primär – Lymphknotenstaging braucht CT/MRT.</p>',
	'WasistdiehufigsteUrsachederanovulatorischendysfunktionellenu':	'<p>macht Oligo-/Amenorrhoe, Anovulation, azyklische Durchbruchsblutungen. abnorme uterine Blutungen organisch (Schwangerschaft, Neoplasie, Infekt, systemisch – vonWillebrandt-Syndrom, Trauma) oder dysfunktionell (DUB)(an/ovulatorisch 20/80%); ovulatorisch regelmäßige Blutung, normale Hormone, durch Endometrium-Störung; anovulatorisch gestörte Hormonachse – vor allem Perimenarche/Perimenopause; Diagnostik über Anamnese, BB, gyn, vag-US, Mikrobio, PAP, beta-HCG, HSK; Therapie der DUB: ov: Tranexamsäure, NSAR; anov: Gestagene, wenn kein Kinderwunsch: Gestagen-Östrogen- Kombo, GnRH-Analoga, Danazol, oder chirurgisch mit HSK oder Ballonkatheter, Thermoablation, Kryo, Bipolares Netz</p>',
	'WasistdieTherapiedererstenWahlbeideranovulatorischendysfunkt':	'<p>Gestagene</p>',
	'WasistdieTherapiedererstenWahlbeidernichtakutenovulatorische':	'<p>Hemmt die Fibrinolyse und damit die Auflösung von Gerinnseln. NW: allergische Reaktion, erhöhtes Risiko bei Thromboseneigung/Vorhofflimmern</p>',
	'WasverstehtmanunterdemBegriffMetrorrhagie':					'<p>Alle Begriffe laut „1-Vaginalblutungen“: Eumenorrhoe, Hypomenorrhoe, Brachymenorrhoe: Blutungsdauer < 3 Tage, Hypermenorrhoe, Menorrhagie: sehr starke und lange Blutung, Metrorrhagie: Zwischenblutungen, Polymenorrhoe: Intervall < 25 Tage, Oligomenorrhoe: Zyklusdauer > 35 Tage, Mittelblutung, Azyklische Dauerblutung, Prä-u. postmenstruelles Spotting, Primäre u. sekundäre Amenorrhoe</p>',
	'EinejungeMutterimWochenbettistbesorgtdaihr4TagealterSuglinga':	'<p>ensteht durch postpartalen Hormonentzug; die so genannte Hexenmilch entsteht durch eine Brustdrüsenhypertrophie bei m+f Neugeborenen und ist genauso wenig therapiebedürftig.</p>',
	'BeiwelcherdieserErkrankungenisteineTherapiemitoralerKontraze':	'<p>Leider kommt das gar nicht in unseren Lernunterlagen vor. Darum hier aus der Dualen Reihe/von universimed die absoluten KI für orale KZ: Thrombosen, Hypertonie >160/95, schwere Raucherinnen, Adipositas, Hormon-abhängige Tumoren, unklare Blutungen, größere OPs; Diaphragma nicht bei Deszensus uteri; Pessare nicht bei jungen/Kinderwunsch; Spirale nur mit Vorsicht bei Jugendlichen (wegen Infekt), Extrauteringravidität,</p>',
	'WelchekontrazeptiveManahmeistbeiFrauenmithormonrezeptorposit':	'<p>Wird auch bei alten Raucherinnen empfohlen. Kondome/Sterilisation ist da natürlich genauso möglich.</p>',
	'berwelchenMechanismusisteineLevonorgestrelfreisetzendeSpiral':	'<p>Das ist übrigens auch in einer „Pille danach“ drin.	 SIP6-Fragen 2007-2010 63 63</p>',
	'Ein10jhrigesMdchenwirdvonseinenbesorgtenElternineinekindergy':	'<p>Häufig bei Kindern: Fremdkörper, Trauma, Misshandlung, Vulvovaginits, Lichen sclerosus, Pubertas Praecox, Ovarial-Tu, Exogene Östrogene</p>',
	'Eine62jhrigePatientinkommtzuIhnenindieurogynkologischeAmbula':	'<p>Ich nehme an, wir machen gar keine Colos an der Uro-Gyn? Und es ist keine erste Untersuchung – da kommen wohl doch erst die Finger, Instrumente und der Ultraschall zum Einsatz. Laut „6a-weibliche Harninkontinenz…“ gehört die anale Inkontinenz, Rektumprolaps und die Obstipation in unseren Aufgabenbereich. Anale Inkontinenz bei 7%, gibt es durch Medikamente, Trauma (Geburt!), neurologische Erkrankungen; Diagnostik digital rektal, Haemoccult, gyn-Untersuchung, Tasten von Sphincter Kontinuität/Tonus, Sphinktermanometrie; Therapie der Ursache mit Laxans/Obstipans/OP. Rektumprolaps: ist selten, kann inkarzerieren und braucht OP; Obstipation 10-20% (normal 3x/d bis 3x/Wo); </p><p><b>Therapie:</b> Flüssigkeit, Ballaststoff, Diät, Bewegung, regelmäßige Mahlzeit, Laxantien</p>',
	'Eine34JahrealteFrausuchtSiewegeneinesHarnverlustesbeikrperli':	'<p>Stressinkontinenz = Belastungsinkontinenz → durch insuffizienten Verschluss (v.a. bei vaginaler Geburt, chronische Überlastung der Beckenbodenmuskulatur) → Therapie Beckenbodentraining, Östrogentherapie, Pessar, OP (u.a. TVT = Schlingenoperation); Überaktive Blase (overactive bladder) = Dranginkontinenz, Mischinkontinenz → durch unkontrollierte Detrusoraktivität/verfrühten Harndrang (durch HWI, Radiozystitis, Östrogenmangel, Anatomische Anomalie, Fremdkörper,..) → </p><p><b>Therapie:</b> Miktionsprotokoll, Blasentraining, medikamentös, Elektrostimulation; Diagnostik: Anamnese, klinischer Provokationstest, Urinanalyse, Sono, Zystometrie, Uroflow, Zystoskopie SIP6-Fragen 2007-2010 64 64</p>',
	'Eine46jhrigePatientindievor6WochenwegenihrerHarninkontinenze':	'<p>Ursachen Neurogen, Obstipation, Prolaps, Postoperativ → macht Blasenentleerungsstörung, Schmerzen, HWI → Therapie mit Entspannungsübungen, Miktionstraining, Sedativa, ev. OP</p>',
	'berwelchenderfolgendenRezeptorenentfaltetProgesteronzentraln':	'<p>Progesteron = Steroidhormon, wird in Gelbkörper, Plazenta und NNR gebilde und macht sekretorische Umwandlung des Endometriums, Verschluss des Muttermundes und Spinnbarkeit des Zervixschleims, erhöht die Temp um 0,4-0,6°C. Also im ZNS beeinflusst es die Temp-Regulation im Hypothalamus – anscheinend über GABA. Das Ganze kommt nicht in den Lernunterlagen vor und ist auch in der Dualen Reihe nicht drin.</p>',
	'DurchwelcheRhythmikderpulsatilenGnRHFreisetzungwirddieFollik':	'<p>Dekapeptid mit kurzer t/2 von 2-4min → nicht im Serum messbar. Ultradianer Rhythmus 60-200min aus dem Nucleus Arcuatus; <1 Puls/h → FSH rauf, LH runter (Follikelphase); 1 Puls/h → FSH rauf, LH rauf (Ovuation), 2-5 Pulse/h FSH runter, LH runter (Amenorrhoe); wird von Dopamin, 5HT, endogenen Opiaten gehemmt und NA stimuliert</p>',
	'Beieiner42jhrigenFrauPara3wirdeinDeszensusdiagnostiziertEsli':	'<p>Ist nicht ganz klar im Skript „6a-weibliche Harninkontinenz“; Die Blase liegt aber an der Vorderwand der Scheide und eine Zele ist eine Organausstülpung → Zystozele (oder ev. Zystourethrozele); Eine Douglas- SIP6-Fragen 2007-2010 65 65 Zele/Enterozele kommt vom hinteren Scheidengewölbe, eine Rektozele von der Rektumvorderwand. Descensus uteri/vaginae gibt es als Partialprolaps (bis vor den Introitus) und Totalprolaps mit einer kompletten Ausstülpung vor die Vulvaebene. Therapie gibt’s nur wenn, das ganze symptomatisch ist und ist meist ein Pessar.</p>',
	'Eine22JahrealtePatientindieunterseitJahrenbestehenderDysmeno':	'<p>Angeblich erhöht es die Effizienz, wenn wir uns mit der Patientin verstehen und sie uns deshalb vertraut. Im Gespräch entfallen nur 7% auf den Inhalt, 38% auf den Tonfall und 55% auf nonverbale Signale. Skriptum „14-mit Zyklusstörungen assoziierte mentale Probleme“</p>',
	'Eine38jhrigebislanggesundePatientinstelltsichinIhrerPraxismi':	'<p>Die gibt es nämlich nur im Wochenbett (=Puerperium) SIP6-Fragen 2007-2010 66 66</p>',
	'EineauseinergewaltttigenFamilieentstammendeHIVnegativenormal':	'<p>Ist eine VIN1 durch HPV 6/11, macht wie alle Präkanzerosen an der Vulva Pruritus, Brennen, Nässen, Dyspareunie; einziger angegebener Risikofaktor ist das Rauchen. → Biopsie → Therapie mit Laser oder Exzision als Skinning Vulvektomie.</p>',
	'WaskannalsRisikofaktorfreinePlazentapraeviaausgeschlossenwer':	'<p>Cur, Sectio, Multiparität, Mehrlingsschwangerschaft, fetale Erythroblastose, Raucherinnen.</p>',
	'WelchedergenanntenAufflligkeitengibtkeineInformationberdasAu':	'<p>Fetale Mangelversorgung = IUGR (Intrauterine growth restriction) = SGA (Small for gestational age) Das Ausmaß der Versorgungsstörung beginnt mit der verlangsamten Wachstumsrate (weniger subcutanes Fett), asymmetrisches Körperwachstum (reduziertes Abdomen), dann eine Kreislaufumverteilung mit Drosselung der peripheren Organversorgung (Oligohydramnion), Reduktion der physischen Aktivität. In der Dopplersonographie kann man die Aa. Uterinae als Risikoeinschätzung, die A.umbilicalis für die Versorgungsstörung, die A.cerebri media für die Zentralisierung und den Ductus Venosus für die Dekompensation/Entbindungsindikation verwenden. Am besten sollte man aber Doppler + CTG verwenden. Siehe „11- Erkrankungen in der Schwangerschaft“.</p>',
	'Beieinem3jhrigenMdchenmitkongenitalerEsotropieistnacheinerSc':	'<p>Amblyopie erkennt man an der einseitigen Visusminderung, die nicht voll durch morphologische Befunde des Auges erklärt werden kann. Schielamblyopie entsteht bei 90% der schielenden Kinder durch Unterdrücken des schielenden Auges um die Doppelbilder zu verhindern. Therapie je nach Ursache; korrekte Brille im 1.LJ, Pflasterokklusion des gesunden Auges; frühe Katarakt-OP, Hämangiom-Behandlung,…; Je früher therapiert, desto besser der Visus [6.3-2]</p>',
	'Ein5jhrigesKindistwegenzunehmenderDekompensationeinerExophor':	'<p>Bei Strabismus divergens steht im Augenskriptum als Therapie Korrektur der Fehlsichtigkeit, Prismen, Orthoptische Schulung, Schieloperation; Die Exophorie kann durch schlechte Fusion, Alkohol und Nervosität stärker werden. </p><p><b>Therapie:</b> Optimale Brille, Bifokalgläser, orthoptische Übungen, evtl. Prismen, selten Schiel-OP</p>',
	'Im2LebensmonatwirdbeieinemKindeinekongenitaleEsotropiemitein':	'<p>Schiel-OP im 1.LJ, 2-3LJ = kosmetisch, 6-11 LJ fast nicht mehr behandelbar</p>',
	'MitderMuttereineszweijhrigenKindesmitMikrostrabismusamrechte':	'<p>Mikrostrabismus = 0,5-5° führt unbehandelt zur Amblyopie (Schwachsichtigkeit); Diagnose über den Simultanen Prismen-Abdecktest (normale Sehbedingungen, ein Auge abgedeckt, vor das andere kommen Prismen);</p>',
	'Beieinem82jhrigenMannistseit7JahreneinOffenwinkelglaukombeid':	'<p>Glaukom-Management; Druck alle drei Monate, Gesichtsfeldkontrolle alle sechs Monate; Tagesdruckkurve ist besser als ein Einzelwert</p>',
	'Beieiner68jhrigenFrauistseit4JahreneinPseudoexfoliationsglau':	'<p>Hat einen aggressiven Verlauf und höhere Augendruckwerte und ist deutlich asymmetrisch; Therapie ist gleich wie beim primären Offenwinkelglaukom (häufigstes), aber mit mehr OPs. Patientin ist schon ziemlich austherapiert und außerdem ist das Glaukom unter Therapie progredient → OP! Therapie beim Glaukom soll <21mmHg und eine Senkung von min 20% erreichen. Dafür gibt’s Betablocker 2x/d → 15-25%; Carboanhydrasehemmer 2x/d → 15-20%; Alpha2-Agonist 2x/d → 15-25%; Prostaglandinanaloga 1x/d →25-35%; Lasertrabekuloplastik (kleine Löcher reinschießen) hält 1-5a; Trabekulektotomie (macht Sickerkissen) → senkt auf 12-15mmHg im Schnitt, braucht aber perioperativ Zytostatika, damit es keine Wundheilung gibt; Trabekulotomie (Einriss von Schlemm-Kanal und Kammerwinkel); bei Kongenitalem Glaukom! – komplikationsarm; Drainage mit künstlich filtrierendem Shunt.</p>',
	'Beieiner68jhrigenAsthmatikerinistseit4JahreneinOffenwinkelgl':	'<p>Sie hat schon alle Agtt, die sie kriegen kann (BB fallen aus, weil sie Asthmatikerin ist) und der Druck klettert trotzdem.</p>',
	'Eine75jhrigePatientinwirdamFreitagAbendwegeneinesIleuseinera':	'<p>Glaukomanfall würde ich sagen. </p><p><b>Therapie:</b> Diamox 500mg iv (CAVE: Sulfonamidallergie!), Timolol 0,5% Agtt., Pilokarpin 1-2% Agtt (nur bei reagenter Pupille), 1-2g/kg KG Mannit i.v.; nach Anfall: Iridotomie</p>',
	'BeieinerPatientinistseit4MonateneineHyperthyreosemitendokrin':	'<p>Da kommt der Druck allerdings von außen und nicht von innen.</p>',
	'Eine42jhrigeFraukommtzurGesundenuntersuchungindieallgemeinrz':	'<p>Risikofaktoren: Augendruck, Familienanamnese, Alter (0-40: 0,5%, >40: 1,5-3%; 40-60: 0,5-1%, 70-80a: 3-5%), Durchblutungsstörung</p>',
	'Ein3MonatealtesbishergesundesMdchenwirdwegenAugenrtungundTrn':	'<p>Trübe, große HH + Rötung, Tränenfluss = kongenitales Glaukom; Diagnose, Inspektion in Kurznarkose; </p><p><b>Therapie:</b> immer primär chirurgisch</p>',
	'Ein32jhrigerPatientkommtindieAugenambulanzundbeklagtseitgest':	'<p>Egal ob 32 oder 45, akut aufgetreten, Fremdkörpergefühl, Photophobie, Schmerzen und einseitig → Hornhautläsion; Dazu dann noch Blepharospasmus (Lidkrampf), Lidschwellung und konjunktivale Injektion und wir haben alle Symptome laut Skript „oberflächliches Trauma“. </p><p><b>Therapie:</b> Epithelialisationsfördernde Augensalben (Vit A, AB) KEINE Kortikosteroide!</p>',
	'BeieinemPatientenkameszueinerleichtenAugenverletzungmiteinem':	'<p>„Nach Abheilung“ und „Augenschmerzen morgens“ sind der Schlüssel zu dieser Frage. Durch Störung der Verankerung der Basalzellen auf der Bowman-Membran neuerliches Abtreten nach Abheilung; Bedingt durch alte Verletzung oder familiäre Disposition; Symptome: In der Früh stärkste Beschwerden, weil da Epithel weggerissen wird. </p><p><b>Therapie:</b> Tränenersatzmittel und Augensalbe nachts; ev weiche Kontaktlinse (Verbandlinse), Epithelabrasio, Excimer-Laser</p>',
	'Ein26jhrigerPatientklagtberBrennenamrechtenAugeDieSpaltlampe':	'<p>Typisch für Herpes ist die die fluorescinpositive dendritische Figur und die (im Seitenvergleich) verringerte Sensibilität. +ev. einseitige Schmerzen und Herpesbläschen auf der umliegenden Haut; Das Auge ist nach den Lippen der zweithäufigste Ort für eine HSV1-Manifestation (Rezidive bei 36% in 5a und 63% in 20a → ein Drittel längerfristig, zwei Drittel auf Lebenszeit); </p><p><b>Therapie:</b> Epithelabtragung im Ulkusbereich. 5x/d Acyclovir-Augensalbe + ev systemisch antiviral und topisch AB</p>',
	'Eine17jhrigePatientinleidetseit3Tagenuntereinemerheblichgert':	'<p>Konjunktivitis ist sehr häufig und entweder infektiös, allergisch oder durch Reize (UV, Rauch). Bei ersteren machen Bakterien(Staph, Strept, Enterobakterien,..) ein eitriges Sekret, virale (Adenoviren!) massiv wäßrig/seröses Sekret und Follikel. </p><p><b>Therapie:</b> je nach Ursache bakteriell – lokal (+ev.syst) AB, viral abschwellende Agtt, Pilz antimykotika, allergisch → antiallergica + benetzende Agtt </p><p><b>DD:</b>	 (dendritische) Keratitis, Subkonjunktivale Blutung, Akutes Glaukom, Iridozyklitis, Iritis, Fremdkörper Chemose ist ein Ödem der Bindehaut; gemischte Injektion wäre ein Hinweis auf Keratitis/Iridozyklitis wie z.B. Keratokonjunctivitis Epidemica: Adenoviren machen Sekret + Karunkelschwellung + nach einer Woche subepitheliale Herde, die den Visus beeinträchtigen; </p><p><b>Therapie:</b> Antiviral lokal + ev. systemisch</p>',
	'Eine24jhrigePatientinkommtmitheftigenSchmerzenundeinemmassiv':	'<p>weiche Kontaktlinsen → bakterielles Ulcus! Außerdem hat sie auch eitriges Sekret und eine Hornhautläsion. </p><p><b>Diagnose:</b>  Schmerzen, Lichtscheu, rotes Auge, Sehverschlechterung; Anfärbung mit Fluorescein, häufig Begleit-Iritis (Tyndall-Phänomen = Zellen in der Vorderkammer); bei seitenungleicher Hornhautsensibilität → Herpes, Pilz →Satellitendefekt; </p><p><b>Therapie:</b> AB lokal alle 30min!, therapeutische Mydriasis; bei anderer Ursache antiviral, antimykotisch,…; Abheilung meist mit Hornhautnarbe → Sehverschlechterung</p>',
	'EinPatientwarbeischnemWetterimHochgebirgeschifahrenundhatdab':	'<p>Fluorescein-positiv, kleinste Trübungen (Mikroerosionen, Ödem der tiefen Epithelschichten), Blepharospasmus (akute Erblindung) durch Schweißen/Schnee; </p><p><b>Therapie:</b> Augensalben, Verband, Aufklärung</p>',
	'Eine73jhrigePatientinklagtberSandkorngefhlundBrennenbeiderAu':	'<p>Subjektiv trockenes Auge, Augenbrennen, Fremdkörpergefühl, Rotes Auge und Lichtüberempfindlichkeit, Fremdkörpergefühl, erhöhte Blinzelfrequenz; </p><p><b>Diagnose:</b>	 Fluoresceinfärbung + Schirmertest (<10mm/5min); </p><p><b>Therapie:</b> symptomatisch mit befeuchtenden Augentropfen und je nach Grunderkrankung; Grunderkrankungen: Hormonell (Klimakterium), Immunologisch (Sjögren), allergisch, Entzündlich, neurologisch (Facialisparese), toxisch, medikamentös (Psychopharmaka, Beta-Blocker,..), mechanische Reizung (Kontaktlinsen, Klimaanlage,…)</p>',
	'WelchederangefhrtenAugenerkrankungengiltalsgefhrlichsteverle':	'<p>Deshalb ist die Primärversorgung am Unfallort wichtig → Spülen!; Lauge ist schlimmer als Säure, Säure kann aber auch in die Tiefe gehen; Bei Laugenverletzung erscheint das Auge weniger stark geschädigt, als es ist; je ischämier die Limbusgefäße, desto schwerer die Verletzung. Probleme bei der Heilung durch Zerstörung der am Limbus gelegenen Hornhautstammzellen. </p><p><b>Therapie:</b> Möglichst viel vom Agens entfernen, Oberlid ektropionieren und Partikel entfernen, dann schnell zu Augenarzt/Ambulanz; Der macht Spülung und Pflege sowie Abtragung der Nekrosen und Bindehautinzision um das toxische Ödem rauszulassen.</p>',
	'Ein70jhrigerursprnglichnormalsichtigerPatientbemerktaneinemA':	'<p>Myopisierung (Fernvisus stärker betroffen), manche können wieder ohne Brille lesen (second sight); zwei Brennpunkte führen zu monokularen Doppelbildern. Brunescens kommt in den Lernunterlagen nicht vor und heißt nur, dass die Katarakt braun aussieht; das könnte wohl auch die Farbsättigung beeinträchtigen. Kataraktformen: Cataracta nuclearis: Fernvisus <Nahvisus, „second sight“, Doppelbilder Cataracta corticalis: Blendungsphänomen durch unregelmäßige Lichtstreuung am Rand Cataracta subcapsularis posterior (also hinten in der Linse): Nahvisus stärker betroffen (bei Miosis Lichteinfall eher hinten mittig in der Linse) Mature Cataract: völlig getrübte, weiße Linse Kongenitale Cataract: Leukokorie; → </p><p><b>DD:</b>	Retinoblastom, Frühgeborenen Retinopathie</p>',
	'Eine67jhrigePatientinkommtmitVisusreduktionauf03amlinkenAuge':	'<p>Die Standard-OP ist die extrakapsuläre Methode, wo der Linsenkapselsack stehen bleibt. Bei der intrakapsulären Methode nimmt man diesen auch mit. Prinzipiell sollte man wohl immer die Standard-OP machen – in unseren Lernunterlagen steht nichts über eine Indikation für die intrakapsuläre Methode; logisch wäre ein mechanischer Defekt der Kapsel. Lehrbücher sprechen dazu „bei subluxierter Linse“ oder in Entwicklungsländern, weil die OP wesentlich billiger ist.</p>',
	'Ein2MonatealtesKindleidetaneinseitigerEntzndungdeslinkenAuge':	'<p>Augentränen, eitrige Sekretion, Lidschwellung mit Entzündung + Periorbitale Schmerzen (wenn akut) und Verkrustung der Augenlider → Tränensackentzündung. </p><p><b>DD:</b>	Dakryostenose, Hordeolum Alles mit „Dacryo“ im Namen hat was mit Tränen zu tun. Dacryocystitis betrifft den Tränensack, -adenitis die Drüse und die Stenose die Tränenwege. Ersteres ist eine bakterielle Infektion vor allem bei Kleinkindern (angeboren) oder durch entzündliche Veränderungen der Tränenwegschleimhaut (erworben). Abstrich für Keimspektrum, Tränenwege nicht durchgängig. </p><p><b>Therapie:</b> AB lokal oder oral(erworbene Form), im Anschluss ev. Tränenwegschirurgie. Bei angeborenem Problem Überdrückspülung zum Öffnen der Hasner’schen Membran.</p>',
	'Ein40jhrigerPatienthatseit7MonateneinepostsaccaleTrnenwegsst':	'<p>Dauerndes Tränenträufeln → conjunctivale Reizung mit Sekretbildung; </p><p><b>DD:</b>  Verletzung des Tränengangs, Dakryocystitis, Keratokonjunctivitis Sicca (mit Epiphora (=Weinen) durch Reiz); </p><p><b>Therapie:</b> Dilatation der Tränenwege; Laserrekanalisation der Tränenwege + Silikonintubation; Dacryocystorhinostomie (=DCR = Verbindung Tränensack – Nasenraum); 90% Heilung; bei präsakkaler Stenose nur 60-70%</p>',
	'BeiwelcherTrnenwegserkrankungisteineTrnenwegsdilatationmitBa':	'<p>Von Ballonkatheter steht zwar nichts in den Skripten, aber Dilatation ist der erste/einfachste chirurgische Schritt bei der Tränenwegsstenose</p>',
	'EinhufigesSymptombeiderfeuchtenFormderaltersbezogenenMakulad':	'<p>Feuchte Form hat Pigment-Epithelabhebung, chorioidale Neovaskularisation (durch Löcher in der Bruch- Membran proliferieren Gefäße in die Netzhaut →Flüssigkeit, Blutung) und klassische CNV (subretinale leicht erhabene Veränderungen + Flüssigkeit + Blutung + Lipidablagerung); </p><p><b>Therapie:</b> Anti-VEGF intravitreal; meist mehrere Injektionen notwendig; rascher Verlauf bis hin zur völligen Auslöschung des zentralen Gesichtsfeldes</p>',
	'BeiwelcherErkrankungtretenMetamorphopsienVerzerrtsehenderLin':	'<p>neovaskulär = feucht = CNV(chorioidale Neovaskularisation); </p><p><b>DD:</b>  epiretinale Gliose(nach Glaskörperabhebung), zystoides Makulaödem und Retinopathia centralis serosa (idiopathisch-Stressassoziiert, TypA- Persönlichkeit, 20-45a, f:m 1:10); Die Metamorphopsien sind bedingt durch das retinale Ödem → das sollte es nur bei der feuchten Form geben.</p>',
	'Eine73jhrigePatientinzeigtdasklinischeBilddertrockenenFormde':	'<p>Klinik: zirkuläre, gelbweißlich erscheinende scharf begrenzte Areale mit Atropie des Pigmentepithels, größere Gefäße der Chorioidea deutlich sichtbar, Netzhaut nicht verdickt, kein Ödem; Hat Drusen am Anfang häufigste Form, langsamer progredienter Verlauf</p>',
	'WelcheAngabeistfrdienichtexsudativeMakuladegenerationkorrekt':	'<p>trocken = nichtexsudativ; Anfang = Drusen, Endstadium = geographische/areoläre Atrophie</p>',
	'WasgehrtnichtzudentherapeutischenStrategienbeideraltersbezog':	'<p>Zyklophotokoagulation ist die Zerstörung des Ziliarkörpers bei primärem Offenwinkelglaukom. Therapie der trockenen AMD: Nahrungsmittelergänzungen wie Lutein zur Stabilisation des Pigmentepithels; feuchte Form: Anti-VEGF intravitreal, mehrfach. Zu den chirurgischen Therapien (kommen im Skriptum nicht vor) für die feuchte Form zählt die Laserkoagulation der Gefäßschlingen (wenn weit genug von Fovea entfernt), Photodynamische Therapie (Porphyrin-Farbstoffe i.v., sammeln sich in Gefäßen der CNV und nachher mit Laserlicht bestrahlen) → geht auch unter der Fovea, Subretinale Chirurgie (entfernen der CNV durch kleines Netzhautloch → stabilisiert, kann nicht verbessern), Netzhautrotation (experimentell)</p>',
	'Ein55jhrigerPatientsuchtdieAugenambulanzaufVorzweiTagenhater':	'<p>Lichtblitze, Schatte, schwarze Punkte → Warnsymptome (mouches volantes, Rußregen), Sehverschlechterung; am häufigsten rissbedingt (rhegmatogen); Lichtblitze sind durch Glaskörperzug, Mouche volantes durch Kollagenfasern bei der hinteren Glaskörperabhebung und Rußregen durch Erys im Glaskörper bedingt (spezifischtes Symptom); Ist die Netzhautabhebung manifest → peripheres Skotom (=Schatten/Schleier/Vorhang) das bis zur Makula fortschreitet. Ursachen: rhegmatogen nach hinterer GK-Abhebung → Flüssigkeit geht durch Loch unter Retina; Traktiv durch präretinale Zugkräfte; exsudativ durch Zusammenbruch der Blut-Retina-Schranke oder tumorbedingt durch Transsudat aus Tumorgefäß SIP6-Fragen 2007-2010 74 74</p>',
	'FolgendeSymptomesindtypischbeirhegmatogenerrissbedingterNetz':	'<p>Flimmerskotom gehört zur Migräne</p>',
	'WasgehthufigeinerrhegmatogenenrissbedingtenNetzhautablsungvo':	'<p>DD zur alleinigen GK-Abhebung ist denkbar einfach→ Netzhaut ist dort überall anliegend</p>',
	'WiewirdeinerhegmatogenerissbedingteAblatioretinaemitBedrohun':	'<p>Im Skriptum wird bei Therapie nicht nach der Art der Ablatio unterschieden; bei Netzhautdefekt ohne Abhebung Kryo/Laser direkt neben Defekt; bei ausgedehnterem Defekt: eindellende OP (Plombe) + Kryo/Laser oder Vitrektomie (ersetzen mit Gas/Silikonöl oder Kombination der beiden OPs.</p>',
	'BeieinemDiabetikerwirdeineproliferativediabetischeRetinopath':	'<p>reduziert das Risiko eines schweren Sehverlusts um 50%; bei fokalem Makulaödem = fokale LK, bei diffusem Makulaödem = Grid LK; medikamentös: Antioxidantien, Triamcinolon, Proteinkinase C Inhibitoren, Somatostatinanaloga, VEGF-Inhibitoren (Lucentis!)</p>',
	'DietypischeSymptomatikfreinenretinalenZentralarterienverschl':	'<p>Zentralarterienverschluss → Ischämische Retinopathie mit sofortigem Visusverlust; ensteht durch Embolie/Thrombose; Netzhaut überlebt 60-90min; </p><p><b>Therapie:</b> Senkung des Augendrucks + Durchblutungsförderung + Bulbusmassage → Fragmentierung/Weiterwandern des Embolus.</p>',
	'ZuwelcherschwerenSptkomplikationkannesnacheinemretinalenZent':	'<p>Rubeosis Iridis ist durch VEGF bedingte Gefäßeinsprießung mit Vorderkammerblutung und Sekundärglaukom. Therapie mit VEGF-Ak + Therapie der Grundkrankheit. Zentralvenenverschluss macht Ischämie, Neovaskularisationen, Netzhautödem, intraretinale Blutungen,…; </p><p><b>Therapie:</b> Konservativ, ev. Glaukomtherapie; bei Neovaskularisation nach 3-6Mo Laserkoagulation</p>',
	'Eine50jhrigePatientinmitFacialispareseweisteindeutlichesLids':	'<p>am häufigsten durch Parese des M.orbicularis oculi (vom facialis innerviert); Komplikation = Austrocknung; Therapie mit Uhrglasverband, Lokaltherapie, Salbenverband; chirurgisch mit Tarsorrhapie, wenn permanent Goldgewicht in Oberlid und OP des Ektropium paralyticum des Unterlids.</p>',
	'Eine80jhrigePatientinhateinausgeprgtesEntropiumdeslinkenUnte':	'<p>Trichiasis = scheuern der Wimpern am Auge. Beim Entropium gibt es nur chirurgische Therapie – je nach Ursache.</p>',
	'WelcheistdieoperativeTherapieeinersenilenPtoseDehiszenzderAp':	'<p>Ptosechirurgie je nach Levatorfunktion. 15mm = normal, >10mm gut, >7mm mäßig, >5 schlecht, <4 fehlend. Bei guter Funktion quasi eine Raffung; bei schlechter Funktion Verbindung zwischen Oberlid-Tarsus und Augenbraue. CAVE: Bellphänomen (Auge rollt nach außen oben beim Schließen) muss überprüft werden. Wenn nicht vorhanden, OP nicht so ausgiebig, damit bei einem möglichen postoperativen Lagophthalmus keine Keratitis entsteht. SIP6-Fragen 2007-2010 75 75</p>',
	'EinPatientkommtmiteinemLidrandtumor5x6mmderseit6Monatenauffl':	'<p>Meist Basaliom → Excision im Gesunden (>2mm Sicherheitsabstand) → Lokalrezidive möglich</p>',
	'WelcheBehandlungistbeieinemgroenAderhautMelanom10mmindiziert':	'<p>Das übliche Spektrum von Chemotherapie und Strahlentherapie; bei großen Tumoren Auge raus. Genaue Richtlinien kamen bei uns vor.</p>',
	'BeiUntersuchungenbeiVerdachtaufeineBulbusverletzungachtetman':	'<p>Visus, Motilität, Bindehaut, Hornhaut, Sklera, Vorderkammer/Iris/Kammerwinkel, Augendruck, Fundus… - also eigentlich alles außer dem Lidschluss</p>',
	'Ein29jhrigerMannmitbekanntemMBechterewkommtzumAugenarztwegen':	'<p>DD der Iritis/Iridozyklitis sind (Epi)skleritis, Chorioretinitis, akutes Glaukom</p>',
	'WelchesSymptomistnichtfreineIridozyklitistypisch':				'<p>Wir wollen sogar eine therapeutische Mydriase erreichen → Miose ist typisch. </p><p><b>Diagnose:</b>  Lichtüberempfindlichkeit, Rotes Auge, Schmerzen, Miose!, Sehen von schwarzen Punkten, Sehverschlechterung, vermehrtes Blinzeln, Halosehen um eine Lichtquelle; akut Stunden bis Tage und meist einseitig, chronisch (rezidivierend) wenig Symptome aber Cataracta und Maculaödem; Ursache: immunologisch (HLA B27 – Bechterew, Crohn, Colitis ulzerosa, Psoriasis; Polyarthritis oder nach Streptokokkeninfekt), 30% idiopathisch, infektiös, traumatisch; Sonderform bei Heterochromiezyklitis Fuchs, HIV-Therapie,…; Komplikation: Synechien (bis hin zur einbetonierten Iris – Iris bombee), Glaukom, Katarakt, Makulaödem </p><p><b>Therapie:</b> lokale Steroide, NSAR, Mydriatika (gegen hintere Synechien) ev Drucksenkung; bei heftigem Verlauf: systemisch Steroide, NSAR, Grunderkrankung behandeln!; bei chronischem Verlauf Dauer-Basistherapie mit Immunsuppression; Katarakt-OP erst nach drei Monaten Reizfreiheit; YAG-Laser-Iridotomie bei Synechien</p>',
	'WelchederfolgendenErkrankungenistkeineUrsacheeinerIridozykli':	'<p>Hier könnten Bechterew, Crohn , Colitis Ulcerosa, irgendwelche Arthritiden oder Infektionen als andere Antwortmöglichkeiten stehen. Bei M.Wilson (der nicht in den Lernunterlagen vorkommt) sieht man den bräunlich grünen so genannten Kayser-Fleischer-Kornealring der durch Kupferablagerung zustande kommt.</p>',
	'Ein55jhrigerPatientbemerktseitmehrerenMonateneineschmerzlose':	'<p>Bindehautduplikatur, die von nasal Richtung Hornhaut-Zentrum wächst.→ macht Sehverschlechterung (Astigmatismus), Benetzungsstörung, Fremdkörpergefühl; ev. chirurgische Entfernung + Bestrahlung + Zytostatika (bei Rezidiven); in schweren Fällen Hornhauttransplantation.</p>',
	'EinPatientsiehtinderFerneunscharfMiteinemsphrischenZerstreuu':	'<p>Wichtig ist hier: „sieht in der Ferne unscharf“ → kurzsichtig </p>',
	'BeieinemPatientenwelchereineeinseitigeSehstrungangibtfindens':	'<p>Afferent N.opticus, efferent N.oculomotorius Parese</p>',
	'SieuntersucheneinenPatientenmitAnisokorieEsstelltsichherausd':	'<p>Horner-Syndrom hat Miosis, Ptosis und Hebung des Unterlids (→scheinbarer Enophthalmus) durch Sympathicus-Läsion. Diagnose durch Cocain-Lösung in den Bindesack</p>',
	'BeieinerRoutineuntersuchungwirdeineFarbdiskriminationschwche':	'<p>Unterschiede gibt es bei Farbbenennung, Symmetrie, Stabilität über die Zeit, Häufigkeit,… Erwerben kann man sich eine Farbsinnstörung mit der fokalen/Grid-Lasertherapie bei diabetischer Retinopathie. Ferner mit Amblyopie, Intoxikationen, Medikamentennebenwirkungen, nutritiven Problemen. Testen tut man sie über die Ishihara-Tafeln, D15-Panel, Nagel Anomaloskop (auch die Farbsinnstörung kommt im Skriptum nicht vor sondern nur in der Lernunterlage „neuroophthalmologische-symptom-reitner.pdf“ ab Seite 19)</p>',
	'BeiwelchenklinischenSymptomenhabenSie4TagenacheinerAugenoper':	'<p>Laut VO-Unterlage: Hypopyon, Photophobie, tiefer Augenschmerz, akute Visusminderung, Lid- + Bindehautrötung und –schwellung; Erreger nach OP: Staph, Bacillus spp, Strept, gramnegative, Pilze; endogen: Pilze> Strept, gramneg, Staph,…; </p><p><b>Therapie:</b> AB systemisch, intravitreal, Topisch, Entzündungshemmung, chirurgisch, Erregernachweis (+gezielte Therapie) Laut Skriptum sind die Symptome zunehmend tiefer Augenschmerz, Visusminderung, Kopfschmerzen, Lidödem</p>',
	'BeiwelcherderangefhrtenErkrankungenistdasAuftreteneinerSkler':	'<p>Eine (Epi)skleritis tritt typischerweise sektorförmig als Dreieck auf, mit der Spitze am Hornhautlimbus und der Basis Richtung hinterem Augenpol. Es gibt Abstufungen von schmerzlos bis zu Fremdkörpergefühl; Sehvermögen ist normal – außer bei der posterioren Skleritis. Selten beidseitig, Auge kann bei Rezidiven wechseln. Ist die Sklera betroffen, heftiger Verlauf – bei posteriorer Form sogar Schwellung der Aderhaut bis hin zur Netzhautabhebung. Beide sind assoziiert mit autoimmunologischen/rheumatischen Erkrankungen (Bechterew, Vaskulitis, Wegener, Arthritis,..), die Episkleritis auch mit Infekten. </p><p><b>Therapie:</b> Grunderkrankung! + lokale Steroide/NSAR, bei Skleritis + systemische Steroide + ev. Immunsuppression. </p><p><b>DD:</b>  zwischen den beiden Formen mit Phenylephrin-Test: 5 Minuten nach Trophen Phenylephrin sieht man die Episkleritis nicht mehr, die Skleritis schon.</p>',
	'ZudentypischenSymptomeneinerEpiskleritisgehrten':				'<p>Rotes Auge, Fremdkörpergefühl, Augentränen, okuläre Schmerzen (bei Skleritis stark!), ev. Druckschmerz SIP6-Fragen 2007-2010 77 77</p>',
	'Ein24jhrigerPatientklagtbereinelangsamezunehmendeSehverschle':	'<p>Beginnt in der Pubertät, 50-230/100000, langsam fortschreitender irregulärer Astigmatismus = Vorwölbung der Hornhaut → floppy eye-lid. Therapie anfangs harte Kontaktlinsen, die der Patient später ständig verliert → Hornhauttransplantat (oder perforierende Keratoplastik).</p>',
	'Eine77jhrigePatientinklagtberlangsamzunehmendeSehverschlecht':	'<p>Die Zahl der Endothelzellen sinkt <500/mm² und die Hornhaut wird nicht mehr ausreichend dehydriert → Stromaödem → Anordnung nicht mehr regelmäßig → Trübung der Hornhaut. Später auch Epithelblasenbildung. Ist die häufigste Hornhautdystrophie, tritt >50a auf und f:m = 2,5:1</p>',
	'VomFacharztzugewiesenkommteineMuttermitihrem14TagealtenSugli':	'<p>Neugeborenenkonjunktivitis nach 2-3d: Gonoblenorrhoe, nach 4-5d: Herpeskonj., nach 7d Chlamydien (ev. mit großen perlmuttartig glänzenden Follikeln)</p>',
	'WelcheErkrankungwirdnichtalsUveitisbezeichnet':				'<p>Laut Skriptum werden die anderen Antwortmöglichkeiten folgende sein: Skleritis, Episkleritis, Iridozyklitis, Iritis, Chorioretinitis</p>',
	'WoranmussbeimPhnomenderLeukokorieweiesAufleuchtenderPupilleb':	'<p></p><p><b>DD:</b>  Katarakt, Frühgeborenenretinopathie,…	  SIP6-Fragen 2007-2010 78 78 HNO Als Lernunterlage hab ich hier in neben Mitschriften aus der VO in erster Linie die Mitschrift aus dem Powerday 2011 verwendet sowie das vom Grasl am Ende des Tertials zu Verfügung gestellt Skript über die HNO-Webambulanz-Fälle.</p>',
	'Beieinem41jhrigenManntrittzweiWochennacheinemgrippalenInfekt':	'<p>Akuter, heftiger Schwindel OHNE Hörstürz + Spontannystagmus zur gesunden Seite nach einem Virusinfekt = Vestibularisausfall;  Antwortmöglichkeiten: „Akuter Vestibularisausfall – rechts“ → dann wäre der Nystagmus zur kranken Seite; Morbus Menière(Schwindel, einseitiger Hörverlust, Tinnitus); Lagerungsschwindel(lagerungsabhängig und dauert nur Sekunden), Zervikalsyndrom (Irritation der Muskel und Gelenksrezeptoren mit Schwindel, Nystagmus, Innenohrschwerhörigkeit, Tinnitus)</p>',
	'Ein25jhrigerMountainbikerfielbeieinemschwerenSturzaufdenKopf':	'<p></p><p><b>Diagnose:</b>	 Dix-Hallpike-Test; </p><p><b>Therapie:</b> Epley-Manöver</p>',
	'EinPatientwirdwegeneinereinseitigenfluktuierendenHrverminder':	'<p>Gefahndet wird hier nach dem M.Meniere und seinem TrommelFELLbefund. Am Anfang von Meniere (Hydrops des häutigen Labyrinths) findet man eine fluktuierende Tieftonschwerhörigkeit und bald attackenartigen Schwindel.</p>',
	'Eine45jhrigeFraukommtmitderRettungindieHNONotfallsambulanzSi':	'<p>Zeigt uns den Nystagmus und auch das klingt nach Meniere!</p>',
	'EineltereFraudiegerinnungshemmmendeMedikamenteeinnimmtleidet':	'<p>Außerdem Drain + Kompressionsverband!</p>',
	'Beieinem58jhrigenAlkoholikerwirdeinzerfallenderTumordesOroph':	'<p>Inoperabel aufgrund der Lage und hat schon alles Mögliche infiltriert.</p>',
	'Ein50jhrigerMannbemerktevoreinerWochebeimRasiereneinenKnoten':	'<p>Einseitige derbe Parotisschwellung; epithelial, sehr langsam wachsend und indolent, außerdem wir der N.facialis nicht infiltriert (</p><p><b>DD:</b>  Karzinom); Immer OP und Entfernung weit im Gesunden, weil man sonst die Streuung nicht mitnimmt und Rezidive hat.</p>',
	'Ein65jhrigerMannstarkerRauchermitHeiserkeitseit4Monatenwirdz':	'<p>Tumore der Glottis(Stimmbandebene) machen rasch Symptome und werden deshalb früh entdeckt → Mikrolaryngoskopie.</p>',
	'Beieinem67jhrigenschwerenRaucherwirdeinKehlkopfkarzinomdiagn':	'<p>Heiserkeit ist im Larynx ein heißer Tipp; Wenn sichs über den kompletten Larynx ausbreitet nennt man es transglottisches LarynxCa.</p>',
	'BeieinemPatientenmiteinemstenosierendenLarynxkarzinomsollein':	'<p>Wenn keine Zeit mehr ist → Coniotomie, sonst immer Tracheotomie. Dabei wird zischen dem Schildknorpel und dem Ringknorpel durch das Lig.conicum durchgeschnitten (ev. mit Spezialtrokar). Danach kommt dann die Tracheotomie</p>',
	'Ein45jhrigerPatientmiteinemeinseitigenschmerzendenUlcusimTon':	'<p>Andere Optionen werden wohl Antibiotika-Resistenz, Candidainfekt usw sein.	So wie ich das sehe, sollte ein typisches HNO-Antibiotikum (Augmentin) das Ulcus zumindest verbessern, weshalb nach 7d (Grasl sagt 10d) ohne Therapieerfolg eine Biopsie genommen werden sollte.</p>',
	'Ein78jhrigerPatientdergeradeeineChemotherapiealsBehandlungei':	'<p>Die Therapie verkürzt ev. den Zoster und verringt das Risiko der Post-Zoster-Neuralgie; viel wichtiger wird dem Patienten aber die Analgetika-Therapie sein!</p>',
	'EinPatienterleidetimRahmeneinerHerpeszosteroticusErkrankunge':	'<p>Augenlider schließen nicht mehr → Auge muss feucht gehalten werden → Uhrglasverband. Außerdem Virustatika, Analgetika, Cortison</p>',
	'Eine56jhrigePatientinmitklinischenZeicheneinesVestibularisau':	'<p>Eigentlich gehören da Analgetika und Cortison auch noch dazu.</p>',
	'BeieinemKleinkindmitschmerzbedingtererschwerterNahrungsaufna':	'<p>Bedingt durch Coxsackie A-Viren. Gibt’s auch Bläschen an Hand und Fuß nennt mans Hand-Fuß-Mund- Krankheit.</p>',
	'Ein23jhrigerPatientkommtindieHNOAmbulanzwegenbehinderterNase':	'<p>Anatomie der Nase überprüfen!</p>',
	'Ein27jhrigerPatientkommtindieHNOAmbulanzunderkundigtsichnach':	'<p>FESS = Functional Endoscopic Sinus Surgery</p>',
	'Ein50jhrigerFernfahrerstarkerRaucherwurdevor6Wochenwegeneine':	'<p>Ganz wichtig laut Grasl: Biopsie + Histologie (nicht nur Biopsie)</p>',
	'Ein34jhrigerManngehtzumHNOArztdaerimAnschlussaneinenSchnupfe':	'<p>(Pan)-Sinusitis und mit der Rhinoskopie sucht man sich die Eiterstraßen.</p>',
	'Eine43jhrigeFraukommtindieHNOAmbulanzwegenseit2Tagenanhalten':	'<p>Also Sinusitis ist klar, maxillaris et frontalis weil Stirn und Wange betroffen sind. In der anterioren (und posterioren!) Rhinoscopie sowie im Rachen sieht man Eiterstraßen; wenn nicht dann vorher Abschwellen mit alpha- Sympathomimetika; SIP6-Fragen 2007-2010 81 81 Schmerzverteilung: Maxillaris → Wange (ev. Haut + Trigeminus II berührungsempfindlich); Ethmoidalis →medialer Augenwinkel/Nasenwurzel (CAVE: Ptose, Orbitaphlegmone); Frontalis → starker Stirnkopfschmerz (+Berührungs- und Klopfempfindlichkeit); Sphenoidalis →uncharakteristische Druckgefühle und Schmerzen in der Mitte des Schädel mit Ausstrahlung in Hinterkopf/Schläfe</p>',
	'EinEnglischlehrerentwickeltimLaufeeinesviralenInfektesderobe':	'<p>Laryngitis acuta → Stimmschonung und ev. Inhalieren</p>',
	'EinstarkerRauchergehtwegenseit3WochenanhaltenderHeiserkeitzu':	'<p></p><p><b>DD:</b>  Papillomatose; HPV-bedingt; Entfernung in direkter Laryngoskopie (Laser!) Biopsie + Histo ist bestimmt nicht falsch; </p><p><b>DD:</b>  Stimmlippenknöten (Phonationsknötchen), heisere, raue, nicht belastbare Stimme; </p><p><b>Therapie:</b> Stimmschonung + richtige Stimmtechnik + Jobwechsel; bei harten Knötchen chir.Abtragung</p>',
	'InwelchemAnteilderMundhhleistderMundbodenzusuchenundwasmussd':	'<p>Dort sieht man dann die Speicheldrüsen im Bereich der Plica sublingualis</p>',
	'WelcheUntersuchungmussvorderStapediusReflexPrfungdurchgefhrt':	'<p>Leider finde ich das nirgendwo dezitiert, aber ich nehme an es liegt daran, dass nach Auslösung des Stapediusreflexes die Messung nicht mehr stimmt – man hört ja durch die Entkopplung um einiges leiser.</p>',
	'Eine45jhrigeFraukommtinderNachtindieHNONotfallambulanzSiekan':	'<p>Therapie → Inzision in Narkose + Patientin einbläuen, dass sie diesmal die Antibiotika fertig nimmt.</p>',
	'Beieinem5jhrigenMdchenmiteinemchronischenPaukenergussbeidsei':	'<p>Das Warum ist eigentlich, dass wegen den -30 bis -40dB die Sprachentwicklung beim Kind gestört wird</p>',
	'Ein4jhrigesKindhochfieberndwirdinderNachtvondenElternindieHN':	'<p>Ist eine Komplikation der akuten Otitis media, die nach zwei bis drei Wochen nicht ausgeheilt ist. </p><p><b>Diagnose:</b>	Druckschmerz am Mastoid,  Senkung der hinteren oberen Gehörgangswand</p>',
	'Ein17JhrigerkommtdreiTagenacheinemBadeaufenthaltindieHNOAmbu':	'<p>Könnte Cerumen obturans sein, das Tut aber eigentlich nicht weh. Deshalb ist es wohl eine Badeotitis durch verunreinigtes Wasser; Synonyme wären Otitis externa diffusa oder Gehörgangsekzem. Therapie laut Grasl: o  Reinigen, desinfizieren, lokale AB am besten über ein Streiferl, auf welches die AB getropft werden o	 Bei Pilz Antimykotika (in .at nur Fußpilztropfen verfügbar → Pat. Aufklären) o	 Vermeidung von Wassereintritt</p>',
	'Eine42jhrigeFraukommtwegenAbklrungeinerschonseiteinigenMonat':	'<p>f>m, 20-40a, familiär; zunehmende (einseitige) Schwerhörigkeit, Ohrensausen (tief) (im Lärm wird besser gehört); Knochenleitung-Luftleitungsdifferenz, kein Stapediusreflex, ev. zusätzlich Innenohrschwerhörigkeit; Therapie → OP, ev Hörgerät; wenn Innenohr nicht betroffen → Stapesplastik. Rinne positiv schließt Schallleitungsstörung aus (weil Luftleitung>Knochenleitung) Weber lateralisiert zum besseren Innenohr oder bei Schallleitungsstörung zum erkrankten Ohr</p>',
	'Ein50jhrigerMannkommtwegeneinerschonseitJahrenbestehendenHrv':	'<p>Geringgradig 20-40dB; mittelgradig 40-60dB, hochgradig 60-80dB; das müsste so stimmen, aber ich finde keine sichere Quelle</p>',
	'EinPatientwirdaneinerHNOAbteilungwegenseiteinemTagpltzlichau':	'<p>Auslöser unbekannt oder Infekt, Stress, Vasculär, toxisch, autoimmun </p><p><b>Diagnose:</b>  im Tonaudiogramm vorwiegend hohe/mittlere Frequenzen bis hin zur Ertaubung, Weber lateralisiert ins gesunde Ohr!; je früher desto besser die Heilungschancen – am besten <24h auf die HNO; Rezidive! </p><p><b>Therapie:</b> 10d i.v. peripher-vasodilatatorisch und Vit B, später oral weitermachen; kein Nikotin, Alk, Kaffee, Stress (Katecholaminausschüttung!), ferner Glucocortidoide</p>',
	'EinArbeiterineinemStahlwerkderniemalseinenLrmschutzgetragenh':	'<p>Ab 85 dB Lärmtrauma, typischerweise bei 4 KHz oder Abfall der Kurve im Hochtonbereich</p>',
	'Ein7jhrigerKnabewirdwegenstarkerSchluckschmerzenbeidseitsund':	'<p>kloßige Sprache gäbe es auch bei Adenoiden + rezidivierenden Entzündungen, Peritonsillarabszess, Oropharynxtumor</p>',
	'Ein10jhrigerKnabekommtinBegleitungseinesVaterszumHNOFacharzt':	'<p>Die Inspektion der Kieferwinkellymphknoten gehört auf alle Fälle zum HNO-Status. Bei Tonsillitis, Adenoiden, Tumoren u.a. können sie vergrößert sein.</p>',
	'EinerwachsenerMannentwickeltbeidseitseineschmerzhaftenichtei':	'<p>Durch Paramoxyviren mit langer Inkubationszeit von 17-21d, schmerzhafte Schwellung der Parotis ohne Eiterung/Fieber. Komplikationen: Meningitis, Orchitis, Pankreatitis, Schwerhörigkeit/Taubheit; </p><p><b>Therapie:</b> NSAR und bei Hodenschmerzen Cortison.</p>',
	'EinJugendlichermithohemFieberundmassiverSchwellungderHalslym':	'<p>Sichern könnte man die Diagnose auch über das typische Ampicillin-Exanthem (welches KEINE Penicillin- Allergie ist), aber das ist nicht lege artis.</p>',
	'Beieiner45jhrigenPatientinwurdeeineRezidivStrumektomiedurchg':	'<p>einseitiger Recurrens – Heiserkeit, beidseitig – Atemnot; Wenn akuteres Geschehen, dann Koniotomie; da aber nur Stridor und keine Atemnot ist, geht sich die Tracheotomie aus</p>',
	'Ein30jhrigerMannhatbeieinemRaufhandeleinenSchlaginsMittelges':	'<p>Fraktur des Nasenbeins; Brillenhämatom durch Fraktur der Lamina papyracea wodurch ein Hämatom in die Orbita gelangt.</p>',
	'Ein3jhrigerKnabewirdvonseinerMutterbeimHNOArztvorgestelltSei':	'<p>Steckt ein Fremdkörper im Ohr, muss man aufs Trommelfell aufpassen und ihn bei Kindern ev. in Narkose entfernen. In der Nase werden kleinere Fremdkörper von den Nasenhaaren aufgehalten; größere sieht man mit der Rhinoskopie – ev erst nach abschwellenden Nasentropfen; man findet Kugeln, Perlen, Münzen, Erbsen, Papier. Zunächst wird die Nasenatmung behindert, dann gibt’s einseitigen Schnupfen mit fötidem Sekret und Kopfschmerzen. Ist das ganzen jahrelang drinnen gibt’s Kalkablagerungen drum herum – Rhinolith. Im Hypopharynx sieht man die Fremdkörper am besten in einer seitlichen Halsaufnahme. Im Mundboden machen Fremdkörper Abszesse, im Ösophagus zu Schluckstörungen, in Trachea/Kehlkopf ab Glottis → Husten. Notfalls muss man sie, egal wo sie sind, Endoskopisch oder auch in Narkose entfernen.</p>',
	'Ein6jhrigerKnabemitFieber397CwirdmitderRettungwegenmassivemi':	'<p>Bei Kindern durch Hämophilus Influenzae → stationäre Aufnahme für AB-Therapie und dann Prophylaxe mit Impfung. CAVE: Erstickungsanfälle durch Endoskopie</p>',
	'EinPatientbetrittdenUntersuchungsraumderHNOPraxisundberichte':	'<p>Mit Ohrläppchen = Erysipel (greift auch auf Wange über), ohne = Perichondritis → nur Knorpel ist betroffen</p>',
	'EinPatientmiteinergertetenSchwellungimNaseneingangwelcheheft':	'<p>Stationäre Therapie und nicht dran manipulieren, sonst kanns zur Sinusvenenthrombose kommen!</p>',
	'Eine15jhrigekommtmitihrerMutterzumHNOArztdasieschonseitJahre':	'<p>Sie ist zu jung!</p>',
	'Eine18jhrigePatientinkommtzumHNOArztwegenwssrigerRhinitisund':	'<p>Sprich spezielle Allergiediagnostik. Andere Antwort-optionen inkludieren wohl „unspezifische IgE“ (Atopiker), diverse Kontaktallergien und ihre Tests</p>',
	'Eine40jhrigePatientinverwendetseitMonatentglichmehrmalsabsch':	'<p>Sie ist abhängig von den abschwellenden alpha-Sympathomimetika. Privinismus kommt vom alten Medikament „Privin“ (Naphazolin) und bezieht sich auf die reaktive Hyperämie beim Absetzen gemeinsam mit einer eventuellen Rhinitis medicamentosa.</p>',
	'Eine82jhrigePatientinlebtimAltersheimSeiteinpaarMonatenhatsi':	'<p>Diagnostik über Schluckröntgen mit KM. Wenn Fistel zur Trachea vermutet, wasserlösliches KM nehmen! Abtragung entweder endo-ösophageal oder vom Hals her (Recurrens schützen!)</p>',
	'Eine87jhrigePatientinmiteinseitigerindenletztenTagenwiederho':	'<p>Epistaxis-Fragen genau lesen. Erstversorgung: Kopf nach vorn (sonst rinnt Blut in Rachen), Nasenflügel zusammendrücken, ev kühlender Lappen auf Stirn/Nacken (ist angenehm, aber nicht therapeutisch). Wenn stark blutet ab an die HNO-Ambulanz</p>',
	'EineMutterwirdinderNachtum3UhrFrhausdemSchlafgerissenweilihr':	'<p>Oder auch Pseudokrupp. Ödem des lockeren, subglottischen Bindegewebes führt zur inspiratorischem Stridor, bellendem Husten, Atemnot. </p><p><b>Therapie:</b> Stationäre AB + Cortison; bei drohender Erstickung intubieren mit schleimhautschonenden Tuben. </p><p><b>DD:</b>  Fremdkörper, spastische Bronchitis(=obstruktive Bronchitis → exspiratorischer Stridor), Diphterie (echter Krupp)</p>',
	'Siediagnostizierenbeieinem7jhrigenKindScharlachundverordnenP':	'<p>Oder auch Komplikationen genannt – allen voran die Nephritis, Endo/Myocarditis und die Poststreptokokken-Arthritis</p>',
	'WelchesistnachderPalpationdasbildgebendeVerfahrenderWahlwenn':	'<p>Warum mit Strahlenbelastung/hohen Kosten wenn es auch ohne geht.</p>',
	'Ein25jhrigerPatientmiteinerca5x3x2cmgroenweichenfluktuierend':	'<p>Am Hals sieht man mit dem Schall echt gut und kann zum Beispiel die Durchblutung von Zysten darstellen.		SIP6-Fragen 2007-2010 88 88 DERMATOLOGIE Meine geheimen Informationen zu diesem Stoff stammen aus dem Powerday für die SIP6 ;), dem blauen nicht-offiziellen Derma-Buch, den Lernunterlagen von der Derma-Homepage und im äußersten Fall aus Duale Reihe Dermatologie.</p>',
	'DerNachweiseinerKontaktallergieerfolgtdurch':					'<p>Epikutantest weist mit Allergen-beschichteten Pflastern TypIV-Allergien nach und gilt als positiv wenn Rötung/Juckreiz/Schwellung auftreten. Reaktion wird nach 24/48/72h abgelesen. Prick-Test → TypI: Testlösungen auf Haut, mit Lanzette durch Tropfen stechen, Ablesen nach 20-30min; (inkl Positiv- (Histamin) und Negativkontrolle (NaCl)); Juckreiz, Rötung, Quaddeln → positiver Test → weitere Allergiediagnostik Intrakutan-Test → TypI: Testlösung mit spez. Nadel intradermal injiziert, Positivkontrolle Hist, Neg-Kon Nacl, ablesen nach 20-30min. Intrakutan ist Prick-Test für schwache Allergene wie Hausstaubmilbe, Schimmelpilzsporen Intradermal-Test: Wie Intrakutantest, aber TypIV-Allergie (z.b. Medikament) → nach 24-48h Ekzem. Provokationstest: spezielle Fragestellung (Arzneimittel/Nahrung) → Zielorgan wird direkt ausgesetzt und organspezifische Reaktion = positiv (z.b. Nase betroffen → Nasenspray → positiv wenn Pat niest). CAVE: starke Reaktionen/Anaphylaxis; EINDEUTIGE Aussage (pos/neg) Serologisch: Spezifische IgE; Befunde nur in Zusammenschau mit der Klinik</p>',
	'EinejungeFrauhatsichamHandrckeneinHennaTattoomachenlassenNun':	'<p>häufigster Ekzemtyp; durch Haptene (kleine reaktionsfreudige Moleküle) ausgelöste, T-Zell-vermittelte Immunantwort → TypIV; Klinik: Erythem, Ödem, Infiltration, Bläschen und Papeln; mglw auch Umgebungsreaktion und Streuung; Epikutantest ist der wichtigste Test, Routine-Testreihe, berufliche Exposition; Test erst 3 Wochen nach der Ekzemphase → Allergieausweis!; häufigste Kontaktallergie Nickel (Duale Reihe Derma)</p>',
	'Beieinem15jhrigenPatientenfindensichimBereichderStirnandenWa':	'<p>85% der Bevölkerung, m>f, 10% haben noch Läsionen mit 25; In Gesicht, Brust und Rücken (m!); Erkrankung des Infundibulum des Haarfollikels, hormonelle(androgene) Stimulation der Talgproduktion + Hyperkeratose →Talgretention → Ausweitung des Infundibulums + Follikelostien = Comedo (offen-weiß/geschlossen- schwarz). Keimproliferation in den Komedonen → Neutrophile → Eiter → klinisch Pusteln → Platzen → heftige Entzündung. Manchmal Zystenbildung/Abszedierung durch Befall tiefer Follikelanteile. Akneformen: Akne comedonica: offene/geschlossene Komedonen, kaum Entzündung, keine Pusteln Akne papulopustulosa: buntes Bild mit Komedonen, Pusteln, Entzündung (Papeln) Akne nodulocystica und Akne conglobata: Komedonen, Pusteln, Entzündung + zystisch/abszedierend/fistulierend + Narben Akne fulminans: perakutes Auftreten mit Schmerzen + Fieber </p><p><b>Therapie:</b> topische Retinoide + AB (topisch Erythromycin/Clindamycin, systemisch Tetracycline), antiandrogen nur bei Frauen Also zur Unterscheidung der Formen der A.vulgaris einfach an den Namen halten – gibt’s nur Komedonen – A. comedonica, gibt’s auch pusteln – A.papulopustulos, gibt’s Narben – A. conglobata und gibt’s Schmerzen und Fieber – A. fulminans</p>',
	'Ein19jhrigerPatientkommtwegenanRckenDekolletundGesichtbesteh':	'<p>Gesicht + Brust + Rücken + Mann = Akne; mit Narben → Akne conglobata</p>',
	'Eine54jhrigePatientinprsentiertsichmitsymmetrischemErythemim':	'<p></p><p><b>DD:</b>  ACLE, SCLE, CCLE, SLE (akut, subakut, chronisch kutaner und systemischer Lupus erythematodes) Alle kutanen Lupusformen können bei systemischer Beteiligung auftreten; CCLE meist isolierter Hautbefall, ACLE meist systemisch (mit späteren CCLE-Läsionen); CCLE = häufigste kutane Form, bei Sonnenexposition, keine ANAs!; auf lange Sicht Vernarbungen und Mutilation! SCLE = schuppende erythematöse Plaques, UV-getriggert aber auch disseminiert; mglw Ro/La-Ak und Organbeteiligung ACLE = zentrofaziale Rötung im Laufe der Zeit CCLE-Läsionen, Erytheme an Fingerstreckseiten; fast immer Organbeteiligung </p><p><b>Therapie:</b> isoliert kutan mit Sonnenschutz, Cortison-Creme/Salbe; in schweren Fällen systemisch Cortison/Chloroquin/Thalidomid; systemisch mit Cortison, Immunsuppression</p>',
	'Beieiner25jhrigenPatientinbestehtseiteinigenWocheneinsymmetr':	'<p>ACLE, aber systemische Beteiligung deshalb heißts SLE SIP6-Fragen 2007-2010 90 90</p>',
	'Eine20jhrigePatientinprsentiertsichmitscharfbegrenztenerythe':	'<p>Die Erythrosquamösen Papel, die in Plaques übergehen kann = Psoriasis vulgaris (rötlich Herde mit silbrig weißer Schuppung). Hautblutungen nach Ablösen der Hautschuppen = Auspitzphänomen; TypI (70%) hat vor 30.LJ Manifestationen und schwere Formen; TypII ist das genaue Gegenteil; Betroffen sind die Streckseiten der Extremitäten, Sakralregion und behaarter Kopf, häufig Rima ani (außer P. inversa, die ist axillär, inguinal, submammär=intertriginöse Areale); Juckreiz bei Exazerbationen!</p>',
	'Ein20jhrigerPatientprsentiertsichmitgeneralisiertenstammbeto':	'<p>Streptokokkeninfekte triggern über molecular mimicri disseminierte Herde: initial punktförmig(P.punctata), dann Tropfengröße(P.guttata), dann Münzgröße(P.nummularis). Chronisches Stadium mit großen Plaques = P.geographica. Weitere Trigger: psychischer Stress, mech.Reizung, Medikamente (Betablocker, Lithium, Interferon, Chloroquin); Besserung in den Sommermonaten</p>',
	'WelchederfolgendenHauterscheinungenistkeineManifestationsfor':	'<p>Erythrosquamöse Papeln die in Plaques übergehen = P.vulgaris Scharf begrenzte erythematöse Plaques (ohne Schuppung!) in intertriginösen Arealen = P.inversa Onynchopathie von Nagelmatrix (Tüpfelnägel, Krümelnägel, Leukonychie) / Nagelbett (Ölflecken, Splitterblutungen, subunguale Hyperkeratose = Nagelpsoriasis (bei 30-50% der Psoriatiker, kann auch einzeln vorkommen) Rötung, Schuppung, Erosionen überall auf der Haut = Psoriatische Erythrodermie Pusteln (lokalisiert/generalisiert) = P.pustulosa Gelenksbeteilung bei P.vulgaris mit Befall periartikulärer Strukturen = P.arthropathica; HLA B27!</p>',
	'WienenntmandieInduktionvonPsoriasisherdendurchexternemechani':	'<p></p><p><b>DD:</b>  Auspitzphänomen → punktförmige Hautblutung nach Ablösen der Schuppen</p>',
	'ViraleInfektionenwelchedieMundschleimhautbetreffensind':		'<p>Coxsackie-Viren, nur auf Gaumenbögen, Uvula und Tonsillen beschränkt mit kleinen Bläschen; </p><p><b>DD:</b>  Hand-Fuß-Mund-Krankheit → hat neben Mund auch Läsionen auch an Hand- und Fußflächen</p>',
	'InderAmbulanzstelltsicheine21jhrigePatientinwegenHautvernder':	'<p>Im Endeffekt weist man mit dem Tzanck-Test immer so genannte Tzanck-Zellen, also mehrkernige Riesenzellen nach. Sieht man diese ist die Läsion entweder HSV oder VZV oder Pemphigus Vulgaris oder CMV. Je nach Literatur/Fragen heißt das „ballonierte Keratinozyten die mitunter zu mehrkernigen Riesenzellen verschmelzen“ oder auch „abgerundete Keratinozyten (=Akantholyse) am Blasengrund“ oder auch „vereinzelt vielkernige Epidermalzellen“ disseminierte Vesikel auf erythematösem Grund + Schmerz → Herpes! Genital = HSV2</p>',
	'Eine22jhrigeSchwangereim1Trimenonhatvor2TagenihrenGrovaterbe':	'<p>Herpes Zoster ist eine endogene Reaktivierung der Varicella Zoster Viren (VZV) und kann nur nach abgelaufener VZV-Infektion (einseitig, meist beschränkt auf ein Dermatom) auftreten. Trifft es den 1. Trigeminusast → Zoster ophtalmicus mit Konjunktivitis, Keratitis und ev. Facialisparese. Zoster hat immer Schmerz; teilweise vor Ausbruch neuralgische Schmerzen und nach Abheilen die Post-Zoster-Neuralgie. Darum Analgetika + systemisch Acyclovir + ev. lokale Therapie gegen bakterielle Superinfektionen. Zoster hat man normalerweise nur einmal im Leben. Bei Immundefizienten kann es auch zum generalisierten Zoster kommen. Die können auch nekrotisierende Formen mit schlechter Abheilung und neuerlicher Virämie mit Organbeteiligung haben.</p>',
	'Ein8jhrigerPatientprsentiertsichmitgeneralisiertenPapelnundB':	'<p>Verschieden Stufen des Exanthems gleichzeitig = Varicellen! Pruritus, Fieber, beginnt im Gesicht und befällt das ganze Integument sowie die Schleimhäute. Inkubationszeit = 2-3Wochen; meist komplikationslos. Bei Erwachsenen/Immundefizienten: Varicellen-Pneumonie oder ZNS-Befall.</p>',
	'Ein53jhrigerPatientprsentiertsichmitgruppiertenundkonfluiere':	'<p>53 = alt = immundefizient + streng einseitig + Schmerz = Zoster. Da ich annehme, dass HSV1/2 in den anderen Antwortmöglichkeiten drinnen stehen ist der Tzanck-Test allerdings eine nutzlose Info.</p>',
	'Eine23jhrigePatientinmitbekannteratopischerDermatitisprsenti':	'<p>Ist eine herpetische Superinfektion der betroffenen Hautareale bei atopischer Dermatitis; Aufreten multipler Bläschen, die bald platzen und wie ausgestanzt wirkende Ulcera hinterlassen.  SIP6-Fragen 2007-2010 93 93</p>',
	'WelcheTherapieistbeieinemPatientenmitNeurosyphilisdurchzufhr':	'<p>Das heißt alle 4h!; danach gehört noch 2,4 ME i.m. Benzathin-Penicillin G Retarpen 3x mit 1 Woche Abstand; Treponema Pallidum teilt sich nur alle 30h und muss deshalb mit einem Retard-Präparat sehr lange behandelt werden. Für eine Frühsyphilis 1x Retarpen, bei einer Spätsyphilis die obigen 3x Retarpen. Die 1x Retarpen kann man auch durch Doxycyclin 100mg 1-0-1 i.v. für 14d oder Erythromycin 500mg 1-1-1-1 für 14d oral ersetzen. Statt 3x Retarpen wären es dann 30d für Doxycyclin oder Erythromycin mit der gleichen Dosis. CAVE: bei Retarpen gibt’s bis zu 12h heftige systemische Reaktion mit hohem Fieber + Grippe; deshalb 30-60min vor Therapie Hochdosis-Cortison Therapieerfolg: >=4-facher Titerabfall nach 6 Monaten Therapieversagen: =<2-facher Titerabfall nach 6 Monaten Reinfektion: plötzlicher Titeranstieg In der Schwangerschaft KEIN Doxycyclin, bei Erythromycin bekommt der Fötus nicht genug Therapie; bei Lues connata 150.000 IE/d i.v. über 14d;</p>',
	'WelcherProzentsatzvonPatientenmitunbehandelterSyphilisentwic':	'<p>Lues III gibt’s in drei Formen: benign, Neurosyphilis und Cardiovaskulär Benign: Syphilide und Gummen an der Haut, schmerzlos, Gummen im Knochen möglich Cardiovaskulär: Granulome in der Gefäßwand → Aneurysmen/Stenosen der Koronarien, 70-90% Mortalität Neurosyph: Meningitis, obliterierende Endangitis, Parenchymdegeneration; häufig asymptomatisch; bei 10-30% tabes dorsalis → spinale Schmerzkrisen durch Entmarkung; progressive Paralyse, bei meningitischer Komponente Hirnnervenausfälle, ischämische Insulte</p>',
	'WielautetIhreDiagnosebeifolgenderBefundkonstellationderSyphi':	'<p>VDRL pos (=<1:8), TPHA pos, 19S-IgM-FTA-ABS neg → klinisch bland VDRL korreliert mit Krankheitsaktivität und ist nicht-spezifisch, kommt nach 4-6 Wochen und sinkt im Latenzstadium IgM kommen 3 Wochen nach der Infektion, hohe Spezifität = Goldstandard für Bestätigung einer Infektion, vor allem bei Frühsyphilis und Lues connata TPHA=TPPA ist ein spezifischer Nachweis, 2-3 Wo nach Infektion positiv und bleibt es lebenslang als Seronarbe</p>',
	'WielautetIhreDiagnosebeifolgenderBefundkonstellationderSyphi':	'<p>VDRL neg, TPHA pos/neg, 19S-IgM-FTA-ABS pos Ist noch zu früh für VDRL und entspricht dem Primärstadium – etwa einem Ulcus an der Glans Penis. In dem Ulcus findet man dann Treponema Pallidum, welches man sich in der Dunkelfeldmikroskopie direkt ansehen kann.</p>',
	'WasistdieTherapiederWahlbeieinerFrhsyphilis':					'<p>Alternativ Doxycyclin für 14d 100mg 1-0-1 i.v. oder Erythromycin 500mg 1-1-1-1 oral für 14d	 SIP6-Fragen 2007-2010 94 94</p>',
	'BeieinemPatientenmitDysurieundeitrigemgenitalenAusflusszeige':	'<p>Man macht den direkten Erregernachweis mit dem Mikroskop und am besten auch gleich eine Kultur für ev. AB-Resistenz und die bei bis zu 45% auftretenden Koinfektionen mit anderen STD – vor allem Chlamydien. Die machen dann die post-gonorrhoeische-Urethritis und könnten ein Rezidiv vortäuschen. Bei Männern ist die Gonorrhoe bei 90% symptomatisch bei Frauen nur bei 50% → Untersuchung der Partner(innen). Wenn nicht behandelt bei 3% hohes Fieber + Arthritis.</p>',
	'WelcheTherapieerhlteinPatientbeieinerunkompliziertenGonorrho':	'<p>bei komplizierten Verläufen Ceftriaxon (Rocephin) 250mg i.m. als Einzeldosis</p>',
	'Beieiner37jhrigenPatientinbestehenkonfluierendegeneralisiert':	'<p>Chronische schuppende Hauterkrankung geht von den Haarfollikeln aus. Charakteristisch sind Inseln nicht befallener Haut und geblich/orange Hornschicht auf den Handflächen. Also in dieser Frage alle Punkte: schuppend, orangerot, Inseln, follikulär</p>',
	'EinjungerMannkommtinIhreSprechstundedaihmamoberenStammeinesy':	'<p>= Tinea versicolor. Pilzinfektion mit Malassezia in der hinteren Schweißfurche, wo viel Talg ist. Pilz ernährt sich von Fett und bleibt dort. Infektionen führen je nach Pilz-Untertyp zur Pigmentierung oder – wie hier – Depigmentierung. Unter UV-Licht wechseln die Läsionen die Farbe, deshalb heißt er versicolor. Selten gibt es Juckreiz </p><p><b>DD:</b>	Pityriasis rosea beginnt mit der singulären Heroldplaque am Stamm und hat später ein stammbetontes Exanthem entlang der Spaltlinien der Haut; bei mildem Juckreiz Cortison-Cremes/Salben</p>',
	'EinPatientimmittlerenLebensalterkommtinIhreHaarsprechstunded':	'<p>jedes Alter, beide Geschlechter (wahrscheinlich) bedingt durch zytotoxische T-Zellen eine Autoimmunerkrankung; Schädigung der Matrixzellen, alle Haare gehen synchron in die Katagen/Telogenphase und brechen, sobald sie aus der Haut rauskommen sofort ab → Alopezie. Bei längerer Krankheitsdauer permanente Alopezie; Therapie mit Diphencypron, das eine allergische Kontaktdermatitis auslöst und die zytotoxischen T-Zellen verdrängen soll. Cortison systemisch wirkt zwar, macht aber Rezidive.</p>',
	'Ein34jhrigerPatientprsentiertsichmitstarkemgeneralisiertemJu':	'<p>Durch Krätzmilbe verursachte Läsionen mit quälendem Juckreiz, vorwiegend interdigital, genital, perimammilär und beim Nabel. Mehrere mm lange Striche mit einer kleinen Papel am Ende (Milbe!), daneben Papeln und Knoten mit Schuppen und Krusten. Bei Immundefizienten das gesamte Integument (Skabies norvegica). Diagnose mit Abschaben oder Auflichtmikroskopie. </p><p><b>Therapie:</b> 5% Permethincreme vor dem Schlafen gehen, in der Früh abwaschen. Juckreiz kann nach Behandlung noch bleiben.</p>',
	'Ein9jhrigesKindprsentiertsichmitmultiplenkleinen5mmhautfarbe':	'<p>Man sieht zwei Dellwarzen (Mollusca Contagiosa) oder auch „multiple, kleine zentral eingesunkene, hautfarbene Papeln“. Darin befinden sich virusbefallene Keratinozyten, die sich bei Fingerdruck breiartig entleeren. Therapie → Abkratzen mit einem scharfen Löffel. Alternativ verläuft die Erkrankung nach einigen Monaten selbstlimitierend. CAVE: Immundefiziente → Ausbreitung!</p>',
	'Beieiner34jhrigenPatientinbestehenseitMonatenrtlichePapelnun':	'<p>Multisystemerkrankung mit Hauterscheinungen oft am Beginn, SLE-ähnlich. Periorbitales fliederfarbenes Erythem (heliotropes Erythem), generalisierte Erytheme mit Teleangiektasien, Streckseiten der Finger und Handrücken (Gottron-Zeichen), spät kutane Verkalkungen. Ferner Muskelschwäche/- schmerz in Becken/Schultergürtel → Aldolase, CK, ev ANA. </p><p><b>Diagnose:</b>	 Klinik, Histo, Muskelbiopsie, EMG, MRT Becken/Schulter; </p><p><b>Therapie:</b> Grunderkrankung (beim Erwachsenen als Paraneoplasie!), Glucocorticoide + Azathioprin</p>',
	'EinPatientmittlerenAlterswirdIhnenvonseinemHausarztzugewiese':	'<p>Oder Aldolase, Histo, ANA, Muskelbiopsie, EMG</p>',
	'EinPatientbemerktseiteinigenWochendasvermehrteAuftretenvonEr':	'<p>Desmoglein-1 → P.foliaceus; Defekt liegt in höheren Schichten →kurzlebige, oberflächliche Blasen Desmoglein-3 →P.vulgaris; Defekt liegt tiefer, schlaffen, großflächige Blasen die Erosionen hinterlassen ABER in der Schleimhaut ist Desmoglein anders verteilt – D3 schützt gegen den D1-Defekt → P.vulgaris ist an Schleimhaut, P.foliaceus nicht! Diagnose über Biopsie + Histo + Immunfloureszenz; beide Erkrankungen verlaufen schubhaft P.foliaceus hat die günstigere Prognose; Therapie bei P.foliaceus systemische Glucocorticoide + Azathioprin; P.erythematosus, P.seborrhoicus und Fogo selvagem gehören auch dazu Th: bei P.vulgaris ein hoch dosierter Kortikosteroid-Stoß + Azathioprin weil es auch Flüssigkeitsverlust, Superinfektionen und Therapienebenwirkungen und damit komplizierteren Verlauf gibt. Zum P.vulgaris gehört auch noch das Nikolski-Zeichen (Blase wird bei Fingerdruck größer); P.vegetans ist eine chronische vegetierende Form des P.vulgaris.</p>',
	'Eine60jhrigePatientinwirdvorstelligmitgroenurtikariellenentz':	'<p>Bullöses Pemphigoid → höheres Lebensalter bedingt durch Auto-Ak gegen Kollagen Typ XVII (Hemidesmosomen) ; Klinik: multiple urtikarielle Plaques die konfluieren mit vereinzelten, prallen Blasen. Diagnose mittels Histo + direkte Immunfloureszenz: junktionale Spaltbildung der Basalmembran + IgG/Komplementablagerung; Nikolski II positiv (Blasen lassen sich verschieben; Typ I heißt Blasen lassen sich auf scheinbar gesunder Haut erzeugen)</p>',
	'Beieinem17jhrigenPatientenderseitfrherKindheitaneinerEpileps':	'<p>NF1: Chromosom 17, NF2 Chromosom 22 (sehr viel seltener), autosomal dominant vererbt. Beide haben scharf begrenzte multiple Cafe-au-lait-Flecken (>6 Stück mit min 1,5cm). Bei NF1 zusätzlich kutane weiche hautfarbene/hellbraune Papeln/Knoten → Neurofibrome; Segmentale NF: durch Mosaik nur umschriebene Areale betroffen; CAVE: neurologisch, ophthalmologisch (Lisch-Knötchen) und Skelettfehlbildungen. NFII bilaterale Akustikusneurinome und Haut gering befallen. Also für die Frage: Neurologisch, Neurofibrome und Cafe-au-lait-Flecken →NF1</p>',
	'Ein15jhrigesMdchenstelltsichinderAmbulanzaufgrundneuaufgetre':	'<p>Neurofibrome, C-a-l-Flecken → NF</p>',
	'Eine27jhrigePatientinprsentiertsichmitmehrerenweichenkutanen':	'<p>Neurofibrome und genügend C-a-l-Flecken	 SIP6-Fragen 2007-2010 98 98</p>',
	'Eine45jhrigePatientinklagtberjuckendegruppiertstehendeflache':	'<p>lichenoid heißt konfluierende Gruppen – in diesem Fall Papeln. Lichen (ruber) planus hat starken Juckreiz, kommt vorwiegend an Beugeseiten vor und ist eine chronische Entzündung. Eine generalisierte Form gibt’s auch noch. Die Klinik beginnt mit einer hellroten Macula und geht schnell in eine livide Papel über, die gruppiert und dann zu Plaques konfluiert. Typisch sind die „Wickham-Streifen“, also hyperkeratotische weiße Grenzlinien. 	bullöser Lichen planus → schnelle Entzündung → Vesikel statt Papel   Atropher Lichen planus → chronischer Verlauf mit fibröser Verdickung und Verstreichen der Rete-Leisten 	Hypertropher/verrucöser L.p. → extensives Kratzen → hyperkeratotische Papeln/Knoten → Streckseiten der Unterschenkel 	Lichen planopilaris → befällt Haarfollikel → vernarbende Alopezie → systemische Therapie 	Nägel mitbetroffen → Zerstörung der Nagelmatrix → Anonychie → systemische Therapie   Mundschleimhaut betroffen → weiße Papeln → Plaques mit „farnkrautartiger Zeichnung“ selten auch genital 	 Erosiver L.p. → schmerzhafte Ulzera an den Fußsohlen </p><p><b>Therapie:</b> topische Kortikosteroide; bei generalisiertem/Nagel/Haar-Lichen Schmalband-UVB oder PUVA, Retinoide und Chloroquin systemisch; ev. Thalidomid oder Cyclosporin</p>',
	'Ein35jhrigerPatientprsentiertsichmitgruppiertangeordnetenfla':	'<p>Laut Klassifikation des „blauen Buches“ wären da einige Lichenformen gleichzeitig – mit Lichen ruber planus als Antwort sind wir da gut bedient. Außerdem hat Tschachler das als typisches Beispiel für Lichen gebracht.</p>',
	'SieseheninderAmbulanzeinenPatientenmitmultiplenpolygonalenhe':	'<p>Lichen ruber planus – genauer der hypertrophe/verrucöse L.p. SIP6-Fragen 2007-2010 99 99</p>',
	'Beieinem32jhrigenPatientenbestehteinvoretwazweiWochenerstmal':	'<p>aus dem Derma-Powerday Gutartige Wucherung der Haut (histologisch ist es eine Gefäßwucherung) Kann man gefahrlos wegkratzen </p><p><b>DD:</b>  Kaposi-Sarkom, Angiosarkom, noduläres Melanom, dunkelrotes Neurofibrom (gestiehlt)</p>',
	'Beieinem38jhrigenPatientenbestehenseitmehrerenWocheneineunsc':	'<p>Symmetrisch gelb-braun-schwarz pigmentierte, papuloverruköse Hyperplasie der Epidermis; Spätstadium: Baumrindenartig lichenifiziert. Vor allem in Intertrigines (feuchte Hautbereiche) also Axillen, Inguinal, Hals + papillomatöse Veränderung der Mundschleimhaut. CAVE: Grunderkrankung in fast 100% eine viszerale Neoplasie, vor allem AdenoCa des Magens.</p>',
	'Beieinem51jhrigenPatientenbestehenseiteinerWochezahlreichekl':	'<p>starker Juckreiz, ausgeprägte (klare) Blasenbildung von Fingerseitenkanten, Handflächen und Fußsohlen → (sub)akute Ekzeme; toxisch, allergisch oder atopisch; </p><p><b>Therapie:</b> oraler Cortisonstoß dann PUVA, Pflege. </p><p><b>DD:</b>	Psoriasis palmoplantaris (gelbbräunliche Pusteln); Skabies (Striche mit Milbenhügel); mechanisch ausgelöste Blasen (Wandern, Gartenarbeit); Bullöses Pemphigoid (hat auch Körperherde)</p>',
	'Der5jhrigeLukaswirdIhnenvonseinerMutteraufgrundsichausbreite':	'<p>kleinblasig → Streptokokken trüber Bläscheninhalt, goldgelbe Krusten, häufigst bei Kleinkindern; großblasig → Staphylokokken (klare Blasen und mit Krusten bedeckte Erosion → systemische AB</p>',
	'DerhistologischeBefundzeigtLentigomalignaintotoexzidiertWelc':	'<p>Eigentlich ist Lentigo Maligna ein In-Situ-Melanom und sollte alle 6 Monate nachkontrolliert werden. Es tritt auf jeden Fall bei älteren Menschen (m:f=2:1) an chronisch UV-exponierten Arealen auf und wächst über Jahre bis Jahrzehnte.</p>',
	'EinPatientleidetseitJahrenuntersymptomlosenhypopigmentierten':	'<p>Poliose = Weißfärbung von Haaren, aber nicht das Kopfhaar.</p>',
	'DieTherapiederausgedehntenVitiligoerfolgtdurch':				'<p>Oder auch PUVA genannt. Also UVA + Photosensitizer. Bei weniger ausgedehnten Formen entweder spontane Rückbildung/Besserung oder Auftragen von wasserfester Schminke. CAVE: Befalle Haut ist extrem UV- sensibel.</p>',
	'Ein18jhrigerPatientprsentiertsichmiteinemgeneralisiertenmorb':	'<p>Ist total häufig, weil man bei Tonsillitis oft Amoxicillin verschrieben bekommt. Blöd dass dem Hausarzt die generalisierte Lymphknotenschwellung und die Hepatosplenomegalie nicht aufgefallen ist. In Anbetracht der Fragestellung rechne ich mit den anderen Antwortmöglichkeiten: Masern, Penicillinallergie, Fixes AZME (kommt lokationsspezifisch im selben Areal wie beim ersten Mal vor)</p>',
	'Ein46jhrigerPatientprsentiertsichmitscharfumschriebenembrunl':	'<p></p><p><b>DD:</b>  Candida-Intertrigo (Pilzbefund!), Psoriasis inversa(hat keine/wenige Schuppen und juckt!), Interdigitalmykose (Pilzbefund!); Wood-Licht = UV-Licht; Bedingt durch Corynebakterium minutissimum, ein normaler Hautkeim und befällt vor allem intertriginöse Areale und die Zwischenzehenräume. Therapie mit antiseptischer Seife.</p>',
	'Ein54jhrigerPatientprsentiertsichmiteinerschmerzhaftenstrang':	'<p></p><p><b>DD:</b>  Erysipel (Allgemeinsymptome – Schüttelfrost), Erythema nodosum (schubweiser Verlauf + multiple Veränderungen.</p>',
	'Ein58jhrigerPatientmitbekannteralkoholischerHepatopathieprse':	'<p>Unser Patient hat alle Symptome und die häufigste Grunderkrankung: Alkoholische Hepatopathie (weiters Medikament, Eisenoverload, Östrogene) Ätiologie: Defizienz der Uroporphyrogen-Decarboxylase → Akkumulation von Porphyrinen in Stuhl, Harn (Nachweis!) → Hypertrichose, Hyperpigmentierung bei UV-Kontakt (Gesicht + Haare), Verletzlichkeit und diffuse Rötung am Handrücken + Blasenbildung mit narbiger Abheilung. Th: Alkoholkarenz, Medikamente weglassen, Aderlass</p>',
	'Ein67jhrigerPatientprsentiertsichmiteinemca5mmimDurchmesserh':	'<p>häufigste bösartige epitheliale Neoplasie; infiltrativ und lokal destruierend, aber in der Regel keine Metastasen → semimaligne; wächst in UV-exponierten Arealen bei älteren Menschen, nur an behaarten Körperregionen → Gesicht. Langsames Wachstum, beginnt mit Basaliomknötchen, welches bald zentral ulzeriert und SIP6-Fragen 2007-2010 102 102 pigmentiert oder unpigmentiert sein kann. </p><p><b>Therapie:</b> chirurgisch, wenn inoperabel Bestrahlung und bei oberflächlichen Varianten Kryotherapie.</p>',
	'EinjungerMannstelltsichinderAmbulanzaufgrundvonHautvernderun':	'<p>Target lesions = EEM; EEM<Stevens-Johnson-Syndrom(SJS)<Toxische epidermale Nekrolyse (TEN) EEM oft ausgelöst durch HSV (ev. auch bei SJS); Irisläsionen = Schießscheibenläsionen = Target lesions = sich peripher ausbreitende, runde, erythematöse Plaques → an der Peripherie konzentrische Ringe. + Lippen + Mundschleimhaut + Konjunktivitis. Th: spontane Abheilung/topisch; ev Acyclovir oder Acyclovirprophylaxe bei häufigem Vorkommen SJS = EEM + Blasenbildung und Areale mit diffuser Rötung und Schwellung + intensivere Schleimhautbeteiligung; Th: systemische Glucocorticoide TEN = ausgelöst durch Medikamente (Sulfonamide, Antikonvulsiva, NSAR) großflächige düsterrote bis livide Erytheme großflächiger Epidermisablösung (>30% der Körperoberfläche; Nikolski-Positiv) + Schleimhaut! + ev. Organbefall. Th: Auslöser absetzen!, Systemische Glucocorticoide + Immunglobulin-Mix (=IVIG?) + Supportive Maßnahmen; trotzdem 30% Letalität!</p>',
	'Eine17jhrigePatientinprsentiertsichmiteinerdsterrotlividenVe':	'<p>Beginnt als eitrige Entzündung des Nagelwalls (Paronychie), die einschmilzt und die ventrale Seite mitbefällt. </p><p><b>Therapie:</b> AB systemisch + chirurgische Inzision</p>',
	'Eine36jhrigePatientinprsentiertsichmitsubkutanenuerstschmerz':	'<p>Entzündung der bindegewebigen Septen im subkutanen Fett. Sehr schmerzhaft und vorwiegend an Streckseiten der Unterschenkel (Unterarm); durch Streptokokken, Yersinien, Tbc oder Medikamente oder nicht- infektiöse Systemerkrankung (Sarkoidose); Th: Ursache beseitigen, Kompressionsstrümpfe, NSAR.</p>',
	'Eine38jhrigePatientinprsentiertsichmitschubweiseinnerhalbwen':	'<p>Syn: leukozytoklastische Vaskulitis; Immunkomplexe in Gefäßwand → Neutrophile → Schädigung der Gefäßwand; Klinik ist die palpable Purpura (rötlich-livide Papeln) + Infarkte der Epidermis darüber → Blasen mit grauem Blasendach. Ursache bakteriell, viral, medikamentös, systemisch; schubhafter Verlauf, der nach einigen Wochen ausheilt, wenn Ursache weg ist. Purpura Schönlein Hennoch = Unterform mit Nierenbeteiligung durch IgA-Immunkomplexe bei Kindern/Jugendlichen nach Streptokokkeninfekt </p><p><b>Therapie:</b> Ursache beseitigen + Cortison </p><p><b>DD:</b>	systemische Vaskulitis wie z.B. Wegener</p>',
	'Eine60jhrigePatientinprsentiertsichmitdeutlicherRtungundpapu':	'<p>Tritt häufig bei mittlerem/höherem Alter zentrofazial auf und ist chronisch progredient und stadienhaft. Stadium teleangiectaticum → Flush bei Alk und Temperaturschwankungen der mit der Zeit als lividrotes Erythem persistiert. Dann Stadium papulosum und papulopustulosum → entzündliche Papeln und Pusteln die abheilen oder zu Knoten werden → Rhinophym (Männer!) </p><p><b>Therapie:</b> milde Form mit Metronidazol/Erythromycin + Sonnenschutz + Alk/Hitze meiden; mittlere/schwere Form mit Tetrazyklinen – rezidiviert beim Absetzen + ev systemische Retinoide. Rhinophym nur chirurgische Dekortikation</p>',
	'Eine65jhrigePatientinprsentiertsichmiteinerbeidseitsaxillrbe':	'<p>häufigste Manifestation der häufigen Candidamykose insbesondere bei adipösen Patienten (feuchwarmes Klima); Zuerst Pusteln, dann große Erosionen + einzelne Satellitenpusteln; Andere Formen: Windeldermatitis, Interdigitalmykose, Onynchomykose, Mundsoor (abwischbare, weiße Plaques), Vulvovaginitis, Balanitis; Nachweis mittels KOH (Kalilauge) im Nativbefund oder Pilzkultur. Therapie lokal oder bei schweren Fällen systemisch mit Flukonazol</p>',
	'EinealteDamekommtinIhreSprechstundedasieimGesichtundandenHan':	'<p>Ist die häufigste Form des häufigsten Neoplasmas – dem PlattenepithelCa. In chronisch UV-exponierten Arealen; 25% der Mitteleuropäer mindestens 1 a.K. im Leben; Wächst lange oberflächlich. </p><p><b>Therapie:</b> Kryotherapie, lokale CHT mit 5-FU, Photodynamische Therapie, lokale Immuntherapie (Imiquimod), Exzision</p>',
	'EinePatientinstelltsichaufgrundvonFluorvaginalisinIhrerSprec':	'<p>pH >4,7, positiver Amintest (Fischgeruch bei Vaginalsekret + KOH), Clue Cells, vermehrtes/verändertes dünnflüssiges graues Vaginalsekret</p>',
	'SiewerdenzueinemvierjhrigenKindmithohemFieberErbrechenHalsun':	'<p>Vorwiegend Kinder; zuerst Rachenraum-Infekt, dann 48h später kleinpapulöses Exanthem mit perioraler Aussparung; danach Immunität; CAVE Streptokokken-assoziierte Komplikationen (Arthritis, Nephritis, Endokarditis) SIP6-Fragen 2007-2010 105 105 </p><p><b>DD:</b>  Ampicillin-Exanthem bei EBV-Infekt, Wundscharlach (geht von infizierte Wunde aus)</p>',
	'ZweiWochennacheinemZeckenstichtrittanderEinstichstelleeinsym':	'<p>Borreliose, selten mit Satellitenläsionen</p>'
	};
	
	ausgearbeitet = {
	'BeiderklinischenUntersuchungder33jhrigenPatientininderNotlal':		'<p> Unterscheidung zentrale vs. Periphere Parese: Zentral: 1. Motoneuron = Pyramidenbahn, Kraft abgeschwächt, Tonus spastisch gesteigert (in chron. Phase, kann initial abgeschwächt sein), Reflexe gesteigert (chronisch, initial abgeschwächt), Pyramidenbahzeichen vorhanden (Babinsky…) Peripher: 2. Motoneuron = alpha-Motoneuron, Kraft abgeschwächt, Tonus schlaff, Reflexe abgeschwächt bis erloschen, Pyramidenbahnzeichen negativ Quelle: Vorlesung Prof. Müller </p>',
	'BeieinerPatientinbestehteineSyringomyeliemitdissozierterSens':		'<p> Quelle: Klinische Neurologie II Zeiler Syringomyelie: über mehrere Segmente reichende Höhlenbildung im Rückenmark, meistens im Bereich der Hinterhörner. Im Bereich der medulla oblongata und Pons: Syringobulbie. Ursache: geburtstraumen, störungen der emyrogenese. Liqourabflussstörung 4. Ventrikel (Arnold Chiari), nach	 Meningitis Läsionsmuster: Läsion der sympathischen Innervation(neuropathische Schmerzen), des Tractus spinothalamicus (Schmerz und temperatur), Läsion der Vorderhornganglienzellen(periphere Paresen, Faszikulationen, Muskelatrophien), Läsion der Pyramidenbahn (zentrale Paresen)	Häufig: Verbrennungen an den Fingern, die nicht bemerkt werden Diagnostik: MRT Therapie: <li>symptomatische Therapie(Analgetika, Spastik, Heilgymnastik)				  <li>Shunt bei Dandy Walker Malformation				  <li>OP bei Arnold Chiari </p><hr/><p> Als Syringomyelie bezeichnet man eine über mehrer Segmente reichende spalt- oder röhrenförmige Höhlenbildung im Rückenmark, die meist im Bereich der Hinterhörner lokalisiert ist und sich nach ventral bis zur Commissura anterior ausdenhnt.	Sie führt oft erst im Erwachsenenalter zu fassbaren klinischen Symptomen im Sinne einer zentralen intramedullären Läsion. Häufiges Initialsymptom sind bohrende, ziehende oder brennende Dauerschmerzen im Sinne einer Zervikobrachialgie. Anfangs wird die dissoziierte Empfindungsstörung u.U. nicht als störend empfunden, sondern im Sinne einer ‚Schmerzunempfindlichkeit’ interpretiert. Im weiteren Verlauf kommt es zu schmerzlosen Verbrennungen im Bereich der oberen Extremitäten. Quelle: Klinische Neurologie II Seite 578ff Erklärung: Schmerz und Temperaturfasern verlaufen im Rückenmark in den Hintersträngen </p>',
	'BeiderAufnahmeberichtetdie64jhrigePatientinmitmultiplenvasku':		'<p> gleichsinnige, d.h. nur rechte oder linke Gesichtsfeldabschnitte beider Augen betreffende H.; bei Sehbahnschäden jenseits des Chiasmas (d.h. im Tractus opticus, in der Radiatio optica, im Sehzentrum der Hirnrinde) Quelle: www.gesundheit.de/roche </p>',
	'Eine28jhrigePatientinkommtwegenheftigerKopfschmerzenundParst':		'<p> Quelle: Klinische Neurologie II Zeiler Migräne Kopfschmerz: trigemino vaskuläre Pathologie – Dilatation der Duragefäße verursacht Schmerzen mit oder ohne Aura: bei aura häufig Flimmerskotome einseitig, pochend, klopfender Kopfschmerz mit starker Intensität wichtig: Aura zugleich oder 60min vorher Komplikationen : Status migraenosus (über 72h) , persisitierende Aura (über 1 Woche)	 2 bei Aura mind., 5 ohne Aura (4 – 72h) bei typischer Lokalisation und Qualität, körperl. Aktivität verschlimmert, Übelkeit Erbrechen, Photo-Phonophobie Therapie: <li>Reizabschirmung, <li>Ibuprofen, <li>Diclofenac, <li>Acetylsalicylsäure <li>Triptane <p>Wichtig: weniger als 10 Tage/Monat (cave: Analgetika-assoziierter Kopfschmerz) Prophylaxe: Propanolol, Flunarizin </p><hr/><p> Migräne: anfallsweise, funktionelle (vasomotorisch bzw. angioneurotisch bedingte?), sich periodisch wiederholende, meist halbseitige (= Hemicrania) Kopfschmerzen. Einteilung: als einfache M. (common migraine) ohne begleitende neurologischen Funktionsstörungen, als klassische M. (classical migraine) mit begleitenden kurz dauernden neurologischen Funktionsstörungen, z.B. visuellen (Flimmerskotom, Gesichtsfeldeinschränkungen), sensorischen, motorischen u. Sprachstörungen sowie mit vegetativen Reiz- u. Ausfallserscheinungen, sämtlich evtl. von Übelkeit u. Brechreiz begleitet, und als „migraine accompagnée“ (complicated migraine) mit neurologischen Störungen (Par- u. Anästhesien, Paresen, aphasische Störungen), die die eigentliche Kopfschmerz-Symptomatik überdauern. Gelegentlich nur einzelne der erwähnten Symptome als sog. Migräneäquivalent. Pathogen.: Es scheinen biogene Amine (z.B. Serotonin) u. die Thrombozytenfunktion eine Rolle zu spielen. Quelle: www.gesundheit.de/roche </p>',
	'EinePatientinkommtwegenunklarenlngerbestehendenKopfschmerzen':		'<p> B-Symptome bei malignen Erkrankungen: Gewischtsverlust, Fieber, Nachtschweiß Bewußtseinsverlust bei Hinrtumoren aufgrund des verdrängenden Wachstums </p>',
	'EinPatientkommtwegenaufsteigenderdistalbetonterSchwchebeider':		'<p> Quelle: Neurologie II Zeiler Differentierung 1) Gullain Barre Syndrom und 2)Chronisch Inflammatorische demyelinisierende Polyradikuloneuropathie Ad1 GBS: Auto AK gegen Myelin assoziiertes Glykoprotein Klinik: nach GI oder respiratorischen Infekt Paresen distal (meist die Beine), Sensstörungen, Hirnnerven (Bulbärparalyse) bis zu Atemfunktionsstörungen, RR Schwankungen und Herzrythmusstörungen Diagnostik: Liqour: sehr hohe Protein Konzentration, Zellzahl normal = dissoziierter Liquor. Sensible und motorische NLS verlangsamt und Leitungsblöcke! Therapie: <li>Plasmapherese				  <li>Über 5 Tage i.v. Immunglobuline (0,4g/kgKG)				   <li>Intensive Überwachung Ad2 CIDP Entwicklung ähnlicher Symptomatik über Monate und Jahre , keine Hirnnerven und Ateminsuff. , milderer Verlauf, Fluktuationen Diagnostik: <li>NLS verlangsamt						<li>Liquor: Proteine hoch					  <li>Nervenbiopsat: demyelinisierte fasern Therapie: Plasmapheresen, IG, und auch (im gegensatz zu GBS) Glucocorticoide! </p><hr/><p> Polyneuropathie: (zB diabet. Polyneuropathie, Alkohol Polyneuropathie)  langsame Entwicklung Poylyradikulitis: (zB Guillain Barre) schnelle Progression Quelle: Klinische Neurologie II Seite 433ff </p>',
	'DieVerteilungderHufigkeitderverschiedenenDemenzformenkannsob':		'<p> Quelle: Neurologie II Zeiler Klinische Unterscheidung: Alzheimer: schleichend progredienter Verlauf, Gedächtnisbeeinträchtigungen, Aphasie, Apraxie, Agnosie, Funktionseinbußen in sozialen Bereichen, klare Bewusstseinslage, länger als 6 Monate, häufig Verhaltensstörungen später Vaskuläre Demenz: schrittweise progredientes dementielles Syndrom mit sozialer beeinträchtigung, ischämische infarkte (Anamnese, Status, CCT, MRT), TIA, neurologische herdzeichen, Fluktuationen, relativ rasche Verschlechterung, vaskuläre Risikofaktoren Lewy Body Demenz: Kombination Parkinson Symptome und progressive Demenz, frontal exekutive Ausfälle, Halluzinationen, Wahn, zu Beginn kein wesentlicher Gedächtnisverlust </p><hr/><p> Alzheimer (60-80%), vaskulär (10-25%), Lewy-Körperchen (7-20%) Quelle: Klinische Neurologie II Seite 203 </p>',
	'Ein73jhrigerPatientkommtinIhreOrdinationundmeinterleideunter':		'<p> Der Mini-Mental-Status-Test wurde 1975 von Folstein und Kollegen entwickelt, um ein für den klinischen Alltag geeignetes Screening-Verfahren zur Feststellung kognitiver Defizite zu bieten. Seit seiner Einführung in den klinischen Alltag hat er sich als zuverlässiges Hilfsmittel zur Erstbeurteilung eines Patienten wie auch zur Verlaufskontrolle erwiesen. Dadurch ist er inzwischen das meistverwendete Instrument bei der Diagnose und Behandlung von Demenz und Alzheimer. Quelle: Wikipedia </p>',
	'Eine62jhrigePatientinkommtwegenVergesslichkeitundApathiezurA':		'<p> Quelle: Neurologie II Zeiler DD Demenzerkrankungen: MCI (mild cognitive impairement): unspez. Gedächtnisprobleme, fast alle älteren Personen, nicht wirklich objektivierbar im MMSE Depressionen: Pseudodemenz, wichtigste DD, Aufmerksamkeits und Konzentrationsstörungen,  Delirante Verwirrtheit: akute Manifestation, rasche Entwicklung, fluktuierender Tagesverlauf, kognitive Defizite mit Bewusstseinsverlust, Aufmerksamkeitsund Wahrnehmungsstörungen, psychomotorische Unruhe, Schlaf-/Wachrythmus gestört – Test: 6 Ziffern nachsprechen lassen (im Delir nicht möglich) </p><hr/><p> Der Mini-Mental-Status-Test wurde 1975 von Folstein und Kollegen entwickelt, um ein für den klinischen Alltag geeignetes Screening-Verfahren zur Feststellung kognitiver Defizite zu bieten. Seit seiner Einführung in den klinischen Alltag hat er sich als zuverlässiges Hilfsmittel zur Erstbeurteilung eines Patienten wie auch zur Verlaufskontrolle erwiesen. Dadurch ist er inzwischen das meistverwendete Instrument bei der Diagnose und Behandlung von Demenz und Alzheimer. Quelle: Wikipedia </p><hr/><p> Absolut relevant zu DD Delir: Bewußtseinsstörung und akutes Auftreten, DD Depression: klagen über kog. Verlust. </p>',
	'Eine56jhrigePatientinmitmultiplenInsultenleidetseit15Jahrena':		'<p> Quelle: Neurologie II Zeiler Risikofaktoren des Ischämisch bedingten Schlaganfalles Nicht beeinflussbar: Genetik, Rasse, Geschlecht, Lebensalter, Wetterbedingungen Vermeidbare Risikofaltoren: Zigarettenrauchen, Alkoholkonsum, Konsum illegaler Drogen, orale kontrazeptiva, Adipositas, physische Inaktivität Behandelbare Risikofaktoren: art. Hypertonie, kardiale Erkrankungen, Diab.mell, Hyperlipidämie, erhöhter Hämatokrit, hämatologische Erkrankungen, Koagulopathien, Hyperfibrinogenämien, Hyperhomocysteinämie </p><hr/><p> Vaskuläre Risikofaktoren: Rauchen, Hypercholesterinämie, Hypertonie, Diabetes </p>',
	'Ein77jhrigerPatientmitakuterHemiplegielinkssoporserBewusstse':		'<p> Quelle: Neurologie II Zeiler Spricht für Einblutung ins Infarktareal KI Trombolyse: Anamnese: SHT in den letzten 3 Monaten, neurochirurgische Eingriffe, ZNS Läsionen mit hohem Blutungsrisiko, diverse andere Blutungen, Lumbalpunktionen in den letzten 10 Tagen, Entbindung in den letzen 10 Tagen, schlaganfall in den letzten 3 Monaten, größere OP in den letzten 3 Monaten Begleiterkrankungen: hämorraghische Diathese, schwere Lebererkrankung, Ö-Varitzen, akute nekr. Pankreatitis, Malignom mit höherem Blutungsrisiko, bakt. Endokarditis, Perikarditis, SS, Stillzeit Aktueller klinischer Zustand: unter 18 über 80, manifeste erhebliche Blutung, geringfügige neurolog. Ausfälle, deutlich spontane Besserung, besonders schwere neurolog. Ausfälle, Epianfall, ausgedehntes Infartareal im CCT, SAB, unkontrollierbare Hypertonie (größer 185/110), Glucose unter 50 über 400 </p><hr/><p> Hypodensität weißt auf Blutung hin, was eine absolute Kontaindikation für eine Lysetherpie darstellt </p>',
	'Eine43jhrigerPatientwirdnacheinemFrontalzusammenstobewusstlo':		'<p> Quelle: U.M.Illievich, Universitätsklinik für Anästhesie </p><p> </p><hr/><p> Basismanagement: <li> Normotension - Hypotension vermeiden <li> Euvolämie - Hypovolämie vermeiden <li> ZVD 10-12mmHg, PCWP 14-16mmHg <li> optimierte Lagerung (venöser Abfluß opt.) <li> ausreichende Oxygenierung, Normoventilation – Hyperkapnie vermeiden <li> ausreichende Sedierung/Analgesierung <li> Hypoosmolarität vermeiden <li> Normothermie - Fieber vermeiden <li> Liquorzirkulationsstörungen beheben <li> Antikonvulsiva - bei supratentoriellen Läsionen kausale Therapie (beheben der Ursache) Adaptierung der Basistherapie: <li>	Beatmung adaptieren (Hyperventilation) <li>	 Osmolarität erhöhen (max.320mosmol/dl) <li>  Sedierung vertiefen - ev. Barbituratsedierung <li>   Hypothermie pharmakologische Therapie: <li>	Osmodiuretika <li>	TRIS chirurgische Therapie: <li>  Liquordrainage <li>  Entlastungskraniotomien	Quelle: Tertiale Notfall und Intensivmedizin </p>',
	'Beieinem64jhrigenPatientenwurdeeinbeginnendeslinksbetontesPa':		'<p> Währen die klassiche, voll ausgeprägte Parkinson-Symptomatik auch vom Laien scheinbar leicht erkennbar ist, kann sich die Erkrankung am Beginn eher uncharakteristisch äußern. In diesem Zusammenhang sind besonders folgende Beschwerden zu nennen: ein depressives Syndrom mit ‚Antriebsstörung’, rheumatische Beschwerden (schmerzhafte Bewegungseinschränkung in einem oder mehreren Gelenken) Quelle: Klinische Neurologie II Seite 163 </p>',
	'EinAssistenzarztberichtetderPrimariaberdieSymptomeeines60jhr':		'<p> Quelle: Neurologie II Zeiler Hoen und Yahr Klassifikation I Hemiparkinson II bilateraler Parkinson III +axiale Symptome + Beeinträchtigung der Halte und Stellreflexe IV ausgeprägte Behinderung, aber selbsständig mobil V immobiler Pat </p><hr/><p> Hoen und Yahr Stadien: Stadium 0 Keine Anzeichen der Erkrankung. Stadium 1 Einseitige Erkrankung. Stadium 1.5 Einseitige und axiale Beteiligung. Stadium 2 Beidseitige Erkrankung ohne Gleichgewichtsstörung. Stadium 2.5 Leichte beidseitige Erkrankung mit Ausgleich beim Zugtest. Stadium 3 Leichte bis mäßige beidseitige Erkrankung: leichte Haltungsinstabilität; körperlich unabhängig. Stadium 4 Starke Behinderung; kann noch ohne Hilfe laufen oder stehen. Stadium 5 Ohne Hilfe an den Rollstuhl gefesselt oder bettlägerig. Quelle: Internet </p><p> Faszikulationen sind nicht parkinsontypisch. Faszikulationen sind eher typisch für Läsionen der motorischen Vorderhorn-Ganglienzelle bzw. der proximalen Abschnitte des peripheren motorischen Neurons. Quelle: Klinische Neurologie I Seite 44 </p>',
	'Ein45jhrigerPatientmitbekannterMultiplerSklerosegibtinderAna':		'<p> Quelle: Neurologie II Zeiler Häufige Symptome der MS: alles was möglich ist im ZNS kommt auch vor, besonderer Verdacht, dass es sich nicht um MS handelt bei Fehlen von: (abgesehen von Dissemination in raum und zeit von der Symptomatik und den typischen T2 hyperintensen Läsionen) <li>Augensymptomen <li>Besserung bei jungen Pat. <li>sensibler Symptomatik <li>Blasenstörung(v.a.imparativer  Harndrang) trotz beträchtlicher motorischer Defizite. </p><hr/><p> Häufige Symptome bei MS: Sehstörungen (Retrobulbärneuritis) Sensibilitätsstörungen Motorische Störungen Blasenfunktionsstörungen Vermehrte Erschöpfbarkeit Depression Kognitive Störungen Störungen der Augenmotilität (zB Doppelbilder, internukleäre Ophtalmoplegie) Spastische Paresen Ataxie Bulbäre Symptome Quelle: Klinische Neurologie II Seite 153 </p>',
	'DiewichtigstenErgebnissefrdieDiagnoseeinerMultiplenSklerosen':		'<p> Quelle: Neurologie II Zeiler MRT Kriterien: T2 gewichtete hyperintense längsovale periventrikuläre Läsionen Zumindest 1 Gadolinium pos. Oder 9 T2 gewichtete Läsionen 1oder mehr infratentorielle Läsionen 1oder mehr juxtakortikale Läsionen 3 oder mehr periventrikuläre Läsionen Liquorbefund: Oligoklonale Banden Erhöhter IgG Index Lymphozytäre Pleozytose unter 50/3 Zellen </p><hr/><p> Diagnose der MS (Kriterien nach McDonald): Wichtige Parameter: Anzahl der Schübe, objektive klinische Evidenz für Läsionen, MRT und Liquor als Zusatzuntersuchung Quelle: Klinische Neurologie II Seite 155 </p>',
	'Ein25jhrigerPatientwurdebeieinemepileptischenAnfallbeobachte':		'<p> Quelle: Neurologie II Zeiler Fokale Anfälle mit komplexer Symptomatik zeigen keine wesentlichen motorischen Entäußerungen, wenn dann bei temporalen Anfällen oral alimentäre Automatismen (Kauen, Schmatzen, Schlucken, Zähneknirschen), Handautomatismen (Nesteln, Wischen, Gestikulieren), Kopf und Augendeviationen, bei frontalen Anfällen hysterisch, bizarr und teilw. Sexuell anmutende Automatismen und Vokalisationen Grand Mal Anfälle zeigen die typisch zuerst tonische Phase mit Initialschrei und kompletter Verkrampfung, anschließend kommt es zu klonischen Zuckungen mit Atemöffnungsgeräusch, Secessus und Zungenbiss, im Anschluss folgt Bewusstlosigkeit und Pat schlafen häufig ein </p><hr/><p> Bei einem ‚Grand Mal’ Anfall (generalisierter tonisch-klonische Anfall) kommt es im Gegensatz zu partiellen fokalen Anfällen zu motorischen Symptomen im gesamten Körperbereich. Quelle: Klinische Neurologie II Seite 310 ff </p>',
	'EinneudiagnostizierterEpilepsiepatientsollaufCarbamazepinein':		'<p> Mit der initial angestrebten Monotherapie kann bei 40-50% der Patienten Anfallsfreiheit erzielt werden. Bei Nichtansprechen soll auf eine alternative Monotherapie umgestellt werden, womit sich bei ca. 15% der Patienten eine befriedigende Anfallskontrolle erreichen lässt.  Quelle: Klinische Neurologie II Seite 340 </p>',
	'Ein58jhrigerPatientkommtwegenseit3WochenzunehmenderKopfschme':		'<p> Kopfschmerzen und Übelkeit deuten auf einen gesteigerten Hirndruck hin. Gesteigerte Sehnenreflexe und Hemiparese links deuten auf ein Zentrales Geschehen in der rechten Hemisphäre hin. Keine Meningismus gibt einen Hinweis, dass es sich nicht um ein entzündliches Geschehen handelt à Tumorverdacht </p>',
	'Ein35jhrigerPatientwurdewegendesVerdachtsaufSubarachnoidalbl':		'<p> Quelle: Neurologie II Zeiler Kopfschmerz hervorgerufen durch Liquorunterdruck innerhalb von 24 bis 48h nach einer Lumbalpunktion . Dumpfer, drückender Schmerz abhängig von der Körperposition (d.h.im Liegen deutlich besser). Zusätzlich: Nackensteifigkeit, Tinnitus, Hypakusis, Photophobie, Übelkeit (1 Symptom mind.) Darum: 24h Bettruhe für Pat nach Lumbalpunktion Möglichkeit: epiduraler blood patch </p><hr/><p> Durch die Punktion kommt es zu einer Liquorumverteilung von intrakranial in Richtung spinal, der dadurch entstehende intrakraniale Unterdruck sorgt für postpunktionellen Kopfschmerz. </p>',
	'Beieinem38jhrigenPatientenmitchronischerLumbagoinderAnamnese':		'<p> Quelle: Unterlagen für die Neuroseminare </p>',
	'Eine43jhrigePatientinhatseit3WochenheftigeSchmerzeninderrech':		'<p> Zum Nachweis bzw. Ausschluss eines CTS ist eine Nervenleitgeschwindigkeit-Messung zu veranlassen. Charakteristische Befunde sind eine Verlängerung der distalen Latenz sowie eine Verlangsamung der sensiblen antidromen Nervenleitgeschwindigkeit. Quelle: Klinische Neurologie I Seite 239 </p>',
	'Ein40jhrigerPatientklagtseitdenAbendstundenberpltzlichaufget':		'<p> Bei manchen Patienten mit spontaner SAB treten perakut (‚peitschenschlagartige’) Kopfschmerzen auf, die sich von allfälligen Kopfschmerzen aus früherer Zeit unterscheiden (‚Kopfschmerzen wie noch nie’).	 </p><p> SAB Symptome: <li>Donnerschlagkopfschmerz <li>Nackensteife <li>Übelkeit <li>Erbrechen <li>Bewusstseinsstörung </p><p> Diagnose: CCT, Lumbalpunktion Quelle: Klinische Neurologie II Seite 94 ff </p>',
	'Ein64jhrigerPatientkommtwegenderTriasGangstrungkognitiverAbb':		'<p> Normaldruckhydrocephalus Symptome: Trias: Gangstörung, Blasenstörung, Demenz à bei Patienten meist zwischen 50 und 70 Quelle: klinische Neurologie II	Seite 306 </p>',
	'Eine45jhrigePatientinkommtwegenEinschlafstrungeninIhreOrdina':		'<p> RLS Symptomatik: Unangenehme Dysästhesien oder Parästhesien im Bereich der Beine, seltener der Arme, die durch Bewegung gebessert werden, und eine motorische Unruhe auslösen. Abends und Nachts sind die Symptome deutlich ausgeprägter als zu anderen Tageszeiten.  </p><p> Therapie: Medikamente absetzen die RLS auslösen oder verstärken können, falls keine Ursache gefunden wird stehen Dopaminergika an erster Stelle der medikamentösen RLS-Therapie Quelle: klinische Neurologie II Seite 362 ff </p>',
	'Ein43jhrigerPatientkommtwegenZitternbeiderHndeinIhreOrdinati':		'<p> Bei 60% der Patienten mit essentiellem Tremor besteht eine positive Familienanamnese Quelle: klinische Neurologie II Seite 181 </p>',
	'Ein60jhrigerPatientkommtmiteinembeinbetontenzentralenHemisyn':		'<p> </p><p> Prädilektionsstellen für Meningeome im intrakraniellen Bereich sind u.a. die Olfaktoriusrinne, das Tuberculum Sellae, der mediale und er laterale Keilbeiflügel, der Kleinhirnbrückenwinkel, die Falx und die Strukturen über der Konvexität. Selten finden sich auch intraventrikuläre Meningeome in einem Seitenventrikel. Meningeome wachen in der Regel langsam. Quelle: Klinische Neurologie II Seite 270f </p>',
	'Ein38jhrigePatientinkommtwegenDoppelbildernundeinerSchluckst':		'<p> Diagnostik der Myastenia gravis: Bei über 90% der Patienten sind im Serum - für Myastenie spezifische – Antikörper gegen Acetycholin-Rezeptoren nachweisbar. Tensilontest Repetitive Nervenstimulation (Abgrenzung Myastenia gravis gg. Lambert Eaton Syndr.) CT- und/oder MRT des Mediastinums Quelle: klinische Neurologie II Seite 475 </p>',
	'Eine29jhrigePatientinmitproblemloserSchwangerschaftohneRisik':		'<p> Im Zusammenhang mit einer Schwangerschaft ist die Inzidenz intrakranieller Sinus- und Venenthrombose beträchtlich erhöht, meistens erfolgt die klinische Manifestation jedoch erst im Puerperium in den ersten wenigen Wochen nach der Entbindung. Die Vorgangsweise bei der Diagnostik wie auch bei der Therapie unterscheiden sich nicht von jener außerhalb einer Gravidität, abgesehen davon, dass bei noch intakter Schwangerschaft orale Antikoagulantien keinefalls eingesetzt werden dürfen. Quelle: Klinische Neurologie II Seite 554 </p><p> </p><p>	 </p>',
	'Ein40jhrigerPatientklagtseiteinemMotorradunfallbereineSchwch':		'<p> Quelle: http://www.akh-consilium.at/daten/nervenlaehmungen.htm Ulnarisläsion (sog. Sulcus-ulnaris-Syndrom) Ursache - Knöcherne Veränderungen des Sulcus ulnaris, z. B. als Traumafolge, bei Gelenkerkrankungen, bei chronischer Epikondylitis, zu seichter Sulcus ulnaris mit Druckexposition des Nerven, luxierender N. ulnaris Symptome -Sensibilitätsstörungen der Finger 4 und 5, atrophische Lähmung der Mm. interossei und des M. adductor pollicis (Spatia interossea eingesunken, Fingerspreizen kraftlos, Adduktion des gestreckten Daumens nicht möglich, Signe du Journal, Fromentzeichen positiv) </p><p> </p>',
	'Eine28jhrigePatientinkommtwegenFieberundKopfschmerzenmitleic':		'Quellen: Zeiler: Klinische Neurologie I, 1.Auflage, S. 287			 Zeiler: Klinische Neurologie II, 2. Auflage, S. 130-131, 107 Messgrößen des Liquors – Normalwerte: Zellzahl: 0/3 – 12/3 Gesamtprotein-Konzentration: 20-45mg/dl Glukose-Konzentration: 50-80% des Blutzuckerspiegels Laktat-Konzentration: lumbal <2,1mmol/l; ventrikulär <3,4mmol/l akute lymphozytäre Meningitis durch verschiedenste virale Erreger Symptome: gleich wie bei akuter bakterieller Meningitis (Kopfschmerzen, Übelkeit, Brechreiz, Erbrechen, Nackensteife, Fieber), der Verlauf ist jedoch im Allgemeinen weit weniger dramatisch. Der Großteil ist nur subfebril. Oft liegt ein nur gering ausgeprägter endlagiger Meningismus vor.	 Liquor: wasserklar, nur selten leicht trüb.		 zunächst mäßig- bis mittelgradig ausgeprägte Pleozytose (Zellzahl 50/3-1000/3) im weiteren Verlauf gering erhöhte Zellzahl (20/3-50/3) </p><p> bei bakterieller Meningitis: ausgeprägte Pleozytose: 2000/3-30000/3 </p>',
	'WasbedeuteteineerhhteVulnerabilittimVulnerabilittsStressMode':		' Quelle: vorlesungsunterlagen_a16_a17_a18_sozialpsychiatrie </p>',
	'WelcheRollespieltemotionalesberengagementderUmweltHighExpres':		'<p> Low expressed emotions: 21% Rückfälle in 3 Monaten, 27% in 24 Monaten High expressed emotions: 48% Rückfälle in 3 Monaten, 66% in 24 Monaten Quelle: vorlesungsunterlagen_b5_b6_schizophrene_stoerungen Folie 38 </p><hr/><p> Überprotektion durch Eltern, Ärgerliche Reaktion , wenig Verständnis für Krankheit </p>',
	'Eine19jhrigeFrauschildertimErstgesprchdasssiesichseit2Jahren':		'<p> Durch Einflussnahme auf die unbewusste Psychodynamik wird eine Veränderung des Erlebens und Verhaltens erwirkt. Dabei ist der Manifestation des Unbewussten in der Patient- Therapeutenbeziehung besonderes Interesse gewidmet. Verdrängte Konflikte und unbewältigte Belastungen bilden die Basis der neurotischen Persönlichkeitsentwicklung. Verdrängte Konflikte füren entweder zu Reifungsstörungen und Entwicklungsdefiziten, oder sie führen zu neurotischen Konfliktfixierungen. Psychoanalyse bewirkt eine Nachreifung der Persöhnlichkeit bzw. eine Normalisierung der Persöhnlichkeitsstruktur. Quelle: vorlesungsunterlagen_a13_a14_psychotherapie Folie 22-23 </p>',
	'Eine32jhrigePatientinleidetaneinertypischenHebstWinterDepres':		'<p> Therapie der Depression: Behandlung der organischen Grundkrankheit Antidepressiva Lichttherapie EKT Psychotherapie Schlafentzug Quelle: vorlesungsunterlagen_b7-9_affektivestoerungen Folie 71 </p>',
	'Siehabeneine37jhrigePatientindieaneinerPhaseeinerrezidiviere':		'<p> Therapie der Depression: Akutbehandlung Erhaltungstherapie 3-6 Monate Rezidiv-/Phasenprophylaxe ab 3 Episoden Quelle: vorlesungsunterlagen_b7-9_affektivestoerungen Folie 69 </p><p> </p><hr/><p> Erhaltungstherapie 3-6 Monate à Je nach Unterlage auch 8-12 Monate Rezidiv-/Phasenprophylaxe ab 3 Episoden à oder ab 2 innerhalb von 5 Jahren </p>',
	'Ein58jhrigerPatientwirdwegeneinerchronischenSchizophreniesei':		'<p> Klassische Neuroleptika wie Haoperidol haben extrapyramidale Nebenwirkungen: </p><p> Nebenwirkungen Haloperidol: Spätdyskinesien (Schluck- und Schlundkrämpfe, „kloßige“ Sprache, dystone Bewegungen) Müdigkeitserscheinungen	Bewegungsunruhe Sitzunruhe EPS (Extra-Pyramidale-Störungen) Hypotonie (insbesondere bei bestehendem Volumenmangel) Orthostatische Dysregulationen Erregungsleitungsstörungen (AV-Block, Schenkelblock) Paradoxe Hypotonie nach Adrenalingabe Sprachstörungen Quelle: wikipedia.org, vorlesungsunterlagen_a12_biologische_therapieverfahren Folie 6-8 </p><hr/><p> EPS (Extra-Pyramidale-Störungen) à Da gehören die Spätdyskinesien dazu und Frühdyskinesien (Rofacial7, Schluckkrämpfe, Akathasie, Parkinsonoid) Sprachstörungen à Hypothermie, Hyperprolakinnämie </p>',
	'WelcherderfolgendenFaktorenspieltfrdieKlassifikationderDepre':		'<p> Je nach Dauer und Häufigkeit der Episoden spricht man von	‚depressiven Episoden’ = F32.- ‚rezidivierender depressiver Störung’ = F33.- ‚anhaltender affektiver Störung’ = F34.- Quelle:	ICD-10 online	  http://www.dimdi.de/static/de/klassi/diagnosen/icd10/htmlgm2008/fr-icd.htm </p><hr/><p> mind. 2 Wochen </p>',
	'AufgrundvonWirkungenderPsychopharmakawurdenHypothesendarbera':		'<p> Da bei Psychosen (Schizophrenie, etc.) Neuroleptika die am dopaminergen System angreifen gute Wirkung zeigen (Chlorpromazin, Haloperidol etc.). Quelle: vorlesungsunterlagen_b5_b6_schizophrene_stoerungen Folie 30-32 </p>',
	'NebenbiologischenTherapieverfahrenwiePharmakotherapieSchlafe':		'<p> Soziotherapie: Alle Interventionen die sich der Gestaltung des sozialen, zeitlichen und räumlichen Kontextes bedienen. Quelle: vorlesungsunterlagen_a16_a17_a18_sozialpsychiatrie Folie 1, 11-14, 80-81 </p>',
	'Ein84jhrigeralleinlebenderMannwirdwegenDemenzverdachtandieGe':		'<p> Kognitive Symptome bei Demenz: Störung des Kurz- und Langzeitgedächtnis Schwierigkeiten sich zu orientieren (zeitl., örtl., situativ, zur Person) Konzentrationsstörungen Sprachstörungen Abstraktionsvermögen, Aufmerksamkeit vermindert Planen und Organisieren vermindert Apraxie, Agnosie, Akalkulie Quelle: vorlesungsunterlagen_b23_b24_gerontopsychiatrie Folie 31ff </p><hr/><p> Kognitive Symptome bei Demenz: Gedächnisstörung ist ein Muss für die Diagnose; die weiteren sind fakultativ; Ausschluss ist Bewußtsseinstörung </p>',
	'Ein80jhrigerPatientkommtimSommerinBegleitungderTochterzumArz':		'<p> Depression: Kernsymptome à gedrückte oder traurige Stimmung die meiste Zeit des Tages, Interessensverlust oder Freudlosigkeit an Aktivitäten die normalerweise angenehm sind, verminderter Antrieb und gesteigerte Ermüdbarkeit Weitere Symptome à vermindertes Selbstvertrauen/Selbstwertgefühl, Selbstvorwürfe und Schuldgefühle, vermindertes Denken-/Konzentrationsvermögen, psychomotorische Hemmung und Unruhe, Schlafstörungen, verminderter Appetit und Gewichtsverlust, wiederkehrende Gedanken von Tod und Suizidgedanken oder Suizidhandlungen Mind. 4 Symptome wobei 2 Kernsymptome, Mind. über 2 Wochen </p><p> Quelle: vorlesungsunterlagen_b23_b24_gerontopsychiatrie Folie 5-7 </p><hr/><p> Innerlich unruhig: typisch für Altersdepression, kann auch oft statt Trauigkeit dysphorisch sein </p>',
	'Eine88jhrigeFraumusstenacheinerSchenkelhalsfrakturoperiertwe':		'<p> Kennzeichnend für das Delirium ist die Agitation und eine Bewusstseins-Trübung. Weitere Symptome sind Herabsetzung des abstrakten Denkvermögens, ein reduziertes Kurzzeitgedächtnis, und Desorientierung, das heißt der Betroffene ist nicht richtig orientiert, was Ort, Zeit, seine eigene Person oder Situation betreffen kann.	 Beim voll ausgeprägten Delirium kommen noch weitere Symptome, wie optische Halluzinationen, Wahnvorstellungen, motorische Unruhe und nestelnde Bewegungen sowie eine Störung des Schlaf-Wach-Rhythmus hinzu. Des Weiteren können affektive Störungen wie Depression, Angst aber auch Euphorie oder Reizbarkeit auftreten. Der Beginn dieser akuten Störung ist plötzlich, die Symptomatik fluktuiert jedoch im Tagesverlauf. Die Ursachen des Deliriums sind sehr vielfältig. Es stellt eine mehr oder weniger einheitliche Reaktion auf viele mögliche Ursachen dar, welches Infektionskrankheiten, Hirntumoren, Vergiftungen durch Drogen und Medikamente, starker Flüssigkeitsmangel und viele andere sein können. Die häufigste Ursache des Deliriums ist der Alkoholentzug bei Alkoholismus. Man spricht dann von einem Alkoholentzugsdelirium Delirium tremens. Quelle: wikipedia.org </p><hr/><p> Kennzeichnend für das Delirium ist: (Agitation muss nicht sein) 1 Bewußtseinsstörung 2 Störungen der kognitiven Funktionen 3 Psychomotorische Unruhe 4 Störung des Schlaf-Wach-Rythmus 5 Akut 6 Hinweise auf organischen Ursprung </p>',
	'Ein87jhrigePatientinleidetseit2MonatenanSymptomenderDepressi':		'<p> Die häufigsten Nebenwirkungen betreffen den Magen-Darm-Trakt: Appetitlosigkeit, Übelkeit, Erbrechen und Durchfall. Gegen die Übelkeit kann Metoclopramid gegeben werden. Weitere häufige Nebenwirkungen, die oft zum Therapieabbruch führen (mangelnde Compliance), sind sexuelle Funktionsstörungen (Nachlassen der Potenz, Ejakulationsstörungen, Orgasmusschwierigkeiten). Unter einer Dauertherapie können sich die sexuellen Funktionen aber wieder normalisieren. Die meisten SSRIs sind antriebssteigernd. Besonders zu Beginn der Therapie kann es daher zu Nervosität, Erregung und Schlafstörungen kommen. Im Gegensatz zu den älteren trizyklischen Antidepressiva haben SSRIs keine anticholinergen Nebenwirkungen Quelle: wikipedia.org </p><p> </p><hr/><p> Gegen Unruhe und Angst à benzos </p>',
	'WasbewirkenAcetylcholinesteraseInhibitorenAChEIimRahmeneiner':		'<p> Acetylcholinesterase Inhibitoren sind die am besten etablierte Therapie bei leichter oder mittelschwerer Alzheimerdemenz. Patienten bleiben oft über 1 Jahr lang kognitiv stabil. Es kommt auch häufig zu einer Reduktion der BPSD (Behavioral and Psychological Symptoms of Dementia) und zu einer Verbesserung der Alltagsfähigkiet. Quelle: vorlesungsunterlagen_b23_b24_gerontopsychiatrie Folie 58 </p>',
	'Ein37jhrigerMannmiteineranamnestischbekanntenSchizophreniewi':		'<p> Therapie der ersten Wahl bei katatonem Zustandsbild sind hochdosierte Bezodiazepine. Quelle: vorlesungsunterlagen_c5_bewusstlos Folie 17 </p>',
	'WiehochistdieLebenszeitprvalenzderSchizophrenie':					'<p> Das Erkrankungsrisiko für Schizophrenie liegt bei 15, für monozygote Zwillinge ist das Erkrankungsrisiko bei einem erkrankten Zwilling bei 48%, bei 1° erkrankten Verwandten bei 11% und bei 2° erkrankten Verwandten bei 4% Quelle: vorlesungsunterlagen_a8_aetiologie_pathogenese Folie 7 </p>',
	'Eine26jhrigeFrauleidetanSchizophrenieundistverunsichertbezgl':		'<p> Symptome der Schizophrenie: Grundsymptome (nur diese relevant): formale Denkstörungen (Gedankenabreißen, Sperrung, Entgleisung, Inkohärenz), Affektstörungen (Affektdissoziazion, Parathymie) Akzessorische Symptome (können vorkommen, müssen nicht): Halluzinationen, Wahnideen, motorische Symptome Plus Symptome (es kommt etwas zum normalen Seelenerleben dazu): Haluzinationen, Wahnideen Minus Symptome (es fehlt etwas, das im normalen Seelenleben vorhanden ist): Antriebsverminderung, Affektverflachung Quelle: vorlesungsunterlagen_b5_b6_schizophrene_stoerungen Folie 11-12 </p><hr/><p> Eigentlich komisch das die den Bleuler reingeschrieben haben. </p><p> ICD: Wahn, Halluzinationen, Ich Erlebnisstörung, Katatone Symptome, negative Symptome und das ganze 1 Monat </p>',
	'Ein30jhrigerPatientmitSchizophrenieleidetvorallemunterNegati':		'<p> Die Pharmakologische Therapie mit Neuroleptika hilft vorrangig gegen die Positiv-Sypmtomatik. Allerdings kann es dadurch vermehrt zu sozialem Rückzug kommen. Es ist daher Psychosoziale Intervention ein entscheidender Bestandteil der Therapie bei Schizophrenie. Quelle: vorlesungsunterlagen_b5_b6_schizophrene_stoerungen Folie 45ff </p>',
	'Eine19jhrigeFrauleidetseit2JahrenanwiederkehrendenEssanfllen':		'<p> Anorexia nervose (ICD-10: F50.0): Gewichtsverlust oder fehlende Gewichtszunahme BMI 17,5 kg/m² oder weniger der Gewichtsverlust ist selbst herbeigeführt die Selbstwahrnehmung ist gestört (Gefühl zu fett zu sein, Angst vor dem Zunehmen) Amenorrhoe bei Frauen Restriktiver und bulimischer Typ Wachstumshemmung bei Beginn der Erkrankung vor der Pubertät Quelle: vorlesungsunterlagen_b17_essstoerungen Folie 4 </p>',
	'WasgehrtnichtzudenAufgabenvonAngehrigenrundenFamilientherapi':		'<p> Angehörigenrunden-Aufgaben: Info durch Experten Erfahrungsaustausch Neue soziale Konatkte knüpfen Trauerarbeit leisten Befreien von Schuldgefühlen Lernen, dass es auch ein eigenes Leben, unabhängig vom Kranken gibt Quelle: vorlesungsunterlagen_a16_a17_a18_sozialpsychiatrie Folie 25 </p>',
	'WielangemssendieSymptomevorhandenseinumdieKriterieneinerDepr':		'<p> Depression: Kernsymptome à gedrückte oder traurige Stimmung die meiste Zeit des Tages, Interessensverlust oder Freudlosigkeit an Aktivitäten die normalerweise angenehm sind, verminderter Antrieb und gesteigerte Ermüdbarkeit </p><p> Weitere Symptome à vermindertes Selbstvertrauen/Selbstwertgefühl, Selbstvorwürfe und Schuldgefühle, vermindertes Denken-/Konzentrationsvermögen, psychomotorische Hemmung und Unruhe, Schlafstörungen, verminderter Appetit und Gewichtsverlust, wiederkehrende Gedanken von Tod und Suizidgedanken oder Suizidhandlungen Mind. 4 Symptome wobei 2 Kernsymptome, Mind. über 2 Wochen Quelle: vorlesungsunterlagen_b23_b24_gerontopsychiatrie Folie 5-7 </p>',
	'Eine25JahrealteFrauhatvor6WocheneinBabybekommenSchonnachderG':		'<p> Zeichen für Mutter-Kind-Beziehungsstörung: Möchte Schwangerschaft rückgängig machen Feindseeligkeit dem Kind gegenüber Fühlt sich besser wenn sie nicht beim Kind ist Fluchtversuche Wunsch nach Adoptiion Wunsch dass das Kind gestohlen wird oder an plötzlichem Kindstod verstirbt Quelle: vorlesungsunterlagen_b16_postpartale_stoerungen Folie 13 </p>',
	'EinPatientkommtmitBluthochdruckindieOrdinationerklagtberstar':		'<p> Biologische Marker zur Erkennung von Alkoholmissbrauch: Atemalkohol: Sens. 100% Spez. 100% aber Normalisierung nach Stunden der Abstinenz GGT, MCV: Sens. 63% Spez. 89% Normalisierung nach 1-10 Wochen CDT: Sens. 65% Spez. 96% Normalisierung nach 2-4 Wochen Quelle: vorlesungsunterlagen_b3_alkohol Folie 6 </p>',
	'EinPatientkommtmitSchlafstrungenundeinerDepressionberdieletz':		'<p> Entzugsbehandlung nach Lesch-Typologie: Typ 1: Benzidiazepine, Acamprosat Typ 2: Tiaprid, Trazodon, Doxepin CAVE: Benzodiazepine, GHB Typ 3: GHB Typ 4: GHB und Carbamazepin </p><p> Rückfallprophylaxe: Typ 1: Acamprosat, Disulfiram oder Cyanamid CAVE: D1-Antagonisten Typ 2: Acamprosat, Moclobemid CAVE: Benzodiazepine, GHB Typ 3: Antidepressiva, Carbamazepin, Naltrexon, Topiramat (Kombi möglich) GHB im Rückfall </p><p> Typ 4: Nootropika, Naltrexon, atypische Neuroleptika (Kombi oft notwendig) GHB als Substitution Quelle: vorlesungsunterlagen_b3_alkohol Folie 16-17 </p>',
	'Ein22jhrigerPatienthatwegenzunehmenderZwangssymptomedasGymna':		'<p> Therapie der Zwangsstörung „Von medikamentöser Seite haben sich die selektiven Serotonin Wiederaufnahmehemmer (SSRI: Citalopram, Fluoxetin, Fluvoxamin, Paroxetin, Sertralin) als Mittel der 1. Wahl herauskristallisiert. Die Wirklatenz ist gegenüber der Depression auf etwa 6 Wochen verlängert, eine Behandlung der 1. Wahl sollte über 12 Wochen gehen.“ Quelle: Vorlesungsunterlange (Text): B12 Zwangsstörung (Martin Aigner): S. 2 </p>',
	'Eine48jhrigePatientinwirdvompraktischenArztwegenchronischerS':		'<p> Typische Symptome bei Dissoziativen und Somatoformen Störungen: Jahrelanges Bestehen Häufige somatische Untersuchungen (‚Doctor Shopping’) Geringe Akzeptank eines Psychosozialen Erklärungsmodels Hypochondrische Ängste Quelle: vorlesungsunterlagen_b15_diss_som Folie 12 </p><hr/><p> </p><p> Das wäre jetzt aber eine somatoforme Schmerzstörung, dissoziative haben meist eine neurologische Symptomatik </p>',
	'Eine48jhrigePatientinwirdvompraktischenArztwegenchronischerS':		'<p> Primär klassifikatorische Schmerzbegriffe: ‚Ich habe Rückenschmerzen’ Sekundär beschreibende Schmerzbegriffe: ‚Ich habe seit Stunden starke, ziehende Rückenschmerzen’ Tertiär bewertende Schmerzbegriffe: ‚Meine wahnsinnigen Rückenschmerzen kamen ohne Vorwarnung. Sie sind einfach mörderisch.’ Quelle: vorlesungsunterlagen_c9_somatisierung_-_hypochondrie Folie 20 </p>',
	'WiewirdTraumalautWHOICD10definiertTraumatasindkurzoderlangan':		'<p> Quelle: vorlesungsunterlagen_c12_trauma Folie 3-4 </p>',
	'Ein25jhrigerMannkommtinBegleitungseinesVatersmiteinerberweis':		'<p> Ähnlicher Fall Quelle: vorlesungsunterlagen_c10_belastungen Folie 4-6 </p>',
	'EinPatientbentigtPsychotherapieundpsychopharmakologischeBeha':		'<p> Nur ein Arzt (Facharzt für Psychiatrie) ist berechtigt eine pharmakologische Therapie anzubieten. </p><p> </p><p>	</p>',
	'Ein14jhrigerKnabewirdwegenKleinwuchsvorgestelltdieKrpergreli':		'<p> Konstitutionelle Entwicklungsverzögerung (KEV) häufigste Ursache für ein verspätetes Eintreten der Pubertät ist eine familiär auftretende Normvariante mit niedrig-normaler Wachstumsgeschwindigkeit in der Kindheit und verspätetem </p><p> Pubertätsbeginn. Ein Kind mit KEV ist in der Regel für seine Familie zu klein („Zielgröße“). Geburtslänge und Geburtsgewicht sind normal. Das Knochenalter ist retardiert. Quelle: Speer, Gahr: Pädiatrie, 2. Auflage, S. 896-897 </p>',
	'Ein9MonatealtesMdchenmachtdieersteInfektionmitHSVHerpesSimpl':		'<p> Gingivostomatitis Häufigste Erstmanifestation der HSV Infektion Alter: typ. 10 Monate – 3 Jahre Klinik: Vesikeln auf Lippen, MundSH, Gaumen, Zunge, hohes Fieber, schlechter AZ Dauer: bis 2 Wochen Therapie: sympt., ev. Aciclovir Quelle: Vorlesungsunterlagen: Dr. Nadja Haiden: Infektionskrankheiten: S. 18 </p>',
	'HypoallergeneNahrungensindindiziertbeiallenSuglingenderenElt':		'<p> Antigenreduzierte Säuglingsnahrungen „Für nicht oder nicht voll gestillte Säuglinge mit familiärer Allergiebelastung kann die Verwendung einer antigenreduzierten Säuglingsnahrung auf der Basis eine Eiweißhydrolysates (sog. hypoallergene oder HA-Nahrungen) das Risiko einer Allergiemanifestation vermindern. Günstig beeinflusst werden vor allem die Häufigkeit ekzematöser Hautveränderungen.“ Quelle: Speer, Pädiatrie, 2. Auflage, S. 92 </p>',
	'DerstatistischhufigsteangeboreneImmundefektinderwestlichenWe':		'„Der selektive IgA-Mangel ist der häufigste Immundefekt. Er ist durch eine Verminderung des Serum-IgA <0,05g/l (bei Erwachsenen) definiert.“ Häufigkeit 1:400 bis 1:300. „abzugrenzen sind Pat. mit IgA-Serumwerten unter dem 2-SD-Bereich der Altersnorm, aber über 0,5g/l: man spricht on einem „partiellen IgA-Mangel“. Diesem Befund kommt kein Krankheitswert zu.	 „Personen mit IgA-Mangel können gesund sein. Man findet in dieser Gruppe aber gehäuft Pat. mit rezidivierenden respiratorischen Infekten einschließlich Bronchiektasien, mit Zeichen von Atopie, gastrointestinalen Symptomen und Autoimmunerkrankungen.“ Quelle: Speer, Pädiatrie, 2. Auflage, S,. 377 </p>',
	'BeiwelcherderfolgendenInfektionskrankheitenistkeineHerdenimm':		'<p> Herdenimmunität ist beschränkt auf Krankheiten bei denen nur der Mensch empfänglich ist. Erzielbar z.B. bei: Röteln, Mumps, Diphtherie, Windpocken, Keuchhusten, Masern, Polio, Pocken KEINE Herdenimmunität bei: Tetanus, FSME, Tollwut, Influenza Quelle: VO-Unterlagen „Impfungen-Impfplan“ Prof. Mauerer S. 6,9,11 </p>',
	'DerBeginnderallgemeinempfohlenenImpfunggegenRotavirusinfekti':		'<p> </p><p>  Quelle: VO-Unterlagen, „Impfungen-Impfplan“ Prof. Mauerer S. 15 </p>',
	'EinFrhgeborenesausder250SchwangerschaftswochezeigtnachGeburt':		'Vorlesungsunterlagen Kinder/Gyn: </p><p> Surfactantproduktion findet intrauterin erst um die 35.SSW statt. Bei Kindern die vor der 35.SSW auf die Welt kommen, sollte man intrauerin eine Lungereifung mittels Corticosteroide (Bethamethason 2x12mg/48h oder Dexamethason 4x6mg/24h) durchfürhren. Die Lungenreifung ist spätestens nach 48h abgeschlossen und der Effekt hält ca. 5Wochen an. Kommt es in der Zeit nicht zur Geburt sollte man max. einmal die Reifung wiederholen. </p><p> In ca. 10% besteht bei Kinder die vor der 26.SSW auf die Welt kommen eine Lungenhypoplasie. </p>',
	'WelchesistkeinFrhsymptomeinesVulvakarzinomsVaginalerDeszensu':		'<p> Quelle: 14_Tertiale_gyn_onkologie2.ppt, 15_Tertiale_gyn_onkologie3.ppt </p><p> Das Vulva-Ca. hat einen etwa 5%-Anteil an allen gynäkologischen Malignomen, Inzidenz steigend (am häufigsten ist das Cervix-Ca. mit etwa 35%). </p><p> Es existieren keine bzw. unspezifische Frühsymptome, z.B. Jucken mit Kratzdefekten, Schmerzen, Wundgefühl, Blutungen, Dyspareunie, uncharakteristische Knoten, Ulzera, therapieresistente ekzematiode Veränderungen </p><p> Spätere Klinik: blumenkohlartig vorwachsender Tumor, beidseitiger Vulvabefall durch Abklatschmetastasen, Dysurie bzw. Hämaturie bei Urethra- oder Blasenbefall </p>',
	'WodurchistdasOvarialkarzinomnichtgekennzeichnetGeringsteMort':		'<p> Quelle: 16_Tertiale_gyn_onkologie4.ppt </p><p> Das Ovarial-Ca. hat die höchste Mortalität aller Genitalkarzinome. </p>',
	'Beieiner42jhrigenFrauPara3wirdeinDescensusdiagnostiziertEsli':		'<p> Quelle: Pschyrembel, 260. Aufl. </p><p> Beim Descensus uteri et vaginae wird eine Senkung des vorderen Kompartiments als Zystozele bezeichnet, eine des hinteren als Rektozele. </p>',
	'WasistdasKardinalsymptomdesEndometriumkarzinomsPostmenopausa':		'<p> Quelle: 17_Tertiale_gyn_onkologie5.ppt </p><p> Das Endometrium-Ca. tritt vorwiegend im Alter (> 60. LJ) in Form eines Endometrioiden Adenokarzinoms (80% der Endometriumkarzinome) auf. </p><p> In 90% der Fälle treten postmenopausale Blutungen auf, weitere häufige Symptome sind übel riechender Ausfluss sowie häufig mit Tumoren allgemein assozierte Beschwerden (Schmerzen, Gewichtsverlust, durch Infiltration bedingte Probleme). </p>',
	'EineKchinverliertseiteinigenMonatenimmerspontanundunwillkrli':		'<p> Quelle: 18_Tertiale_inkontinenz_prolaps1.ppt </p><p> </p><p> Die Harninkontinenz lässt sich ätiologisch einteilen in: <li>) Stressinkontinenz (Belastungsinkontinenz durch Insuffizienz des Verschlusses (Sphinkteren, Bandapparat) bei normaler Blase) <li>) Dranginkontinenz (normaler Verschluss, überaktive Blase) <li>) Mischinkontinenz (Kombination von Stress- und Dranginkontinenz) <li>) Selternere Formen (Fisteln, neurogene Ursachen, …) </p>',
	'Eine29jhrigePatientinGravida:0NullohnewesentlicheVorerkranku':		'<p> Quelle: MSD Manual - 239 / Endometriose - Symptomatik	 Die klinischen Befunde sind Schmerzen und Resistenzen im kleinen Becken, Menstruationsstörungen und Infertilität. Einige Frauen mit starker Endometriose sind asymptomatisch, während andere mit einer leichten Form stark beeinträchtigende Schmerzen haben. Es kann zu Kohabitationsbeschwerden und an der Mittellinie lokalisierten Unterbauchschmerzen vor und während der Regel kommen, vor allem auch nach mehreren Jahren schmerzfreier Perioden. Diese Dysmenorrhö ist ein wichtiger Hinweis für die Diagnose. Herde im Dickdarm oder in der Blase können Schmerzen beim Stuhlgang, Völlegefühl, Blutungen aus dem Rektum während der Menstruation oder suprapubische Schmerzen beim Wasserlassen verursachen. Endometrioseimplantate auf Ovar oder Adnexen können sich zu einem Endometriom (einer > 2-3 cm großen zystischen Geschwulst an einem Ovar) auswachsen oder zu Verwachsungen der Adnexe mit Ausbildung eines Konglomerats führen. Gelegentlich verursacht die Ruptur oder ein Leck eines Endometrioms akute Schmerzen im Unterbauch. </p><p> Die Untersuchung des kleinen Beckens kann einen unauffälligen Befund oder - seltener - sichtbare Herde auf der Vulva, der Zervix oder in der Vagina, am Nabel oder an Operationsnarben ergeben. Der Uterus kann retrovertiert und fixiert sein, die Ovarien können vergrößert sein. Manchmal sind Knötchen im Douglas-Raum tastbar. </p>',
	'WelcheOvarialtumoresindimKindesalteramhufigstenKeimzelltumor':		'<p> Quelle: Bühling, Friedmann: Intensivkurs Gynäkologie und Geburtshilfe, Urban & Fischer	  Keimzelltumoren sind mit einem Anteil von 25% an allen Ovarialtumoren die zweithäufigste Gruppe hinter den epithelialen Ovarialtumoren (ca. 70% aller Ovarialtumore). Sie leiten sich von embryonalen Keimzellen ab, nur etwa 5% davon sind maligne. Mit nahezu ausschließlicher Manifestation im Kindes- und Jugendalter sind sie als altersspezifisches Ovarialmalignom dieser Lebensperiode anzusehen. </p>',
	'WasverstehtmanunterdemBegriffSchokoladeCysteEineEndometriose':		'<p> Quelle: Pschyrembel, 260. Aufl.; MSD-Manual </p><p> </p><p> </p><p> Als „Schokoladenzyste“ werden allg. (nicht nur gynäkologisch) Blutabbauprodukte enthaltende Zysten bezeichnet. Gynäkologisch entstehen diese oft durch Endometriose und Abkapselung. </p>',
	'WelchesprimrediagnostischeVerfahrenwendenSiebeiBeckentumoren':		'<p> Quelle: 09_Tertiale_benigne_beckentumore1.ppt </p><p> Die Diagnostik von Beckentumoren erfolgt primär klinisch und sonografisch (gynäkologisch transvaginal), erst sekundär mittels MR- oder CT-Verfahren. </p>',
	'EineerstgebrendePatientinkommtinder32SSWindiegeburtshilflich':		'<p> Quelle: Bühling, Friedmann: Intensivkurs Gynäkologie und Geburtshilfe, Urban & Fischer	  Die Häufigkeit diabetesassoziierter Komplikationen (bei der Schwangeren z.B. Harnwegsinfektanfälligkeit, Hypertonie, Präeklampsie, höhere Sectio-Rate, Retino- und Nephropathie; beim Kind z.B. Fehlbildungen, Makrosomie, Placentopathia diabetica und Fruchttod) nimmt bei Schwangeren mit steigenden Blutzuckerwerten (auch im „Normalbereich“) zu. Somit ist eine frühzeitige Insulintherapie mit engmaschigen Kontrollen sinnvoll. CAVE: Sulfonylharnstoffe sind in der Schwangerschaft kontraindiziert! </p>',
	'EinePatientinmchtewissenwarumesinihrerSchwangerschaftzueiner':		'<p> Quelle: Bühling, Friedmann: Intensivkurs Gynäkologie und Geburtshilfe, Urban & Fischer	  Die häufigste Ursache für eine „Übertragung“ ist eine fehlerhafte Berechnung des Geburtstermins. Eine echte Übertragung liegt bei einem Gestationsalter von 294 Tagen (10 Lunarmonate + 14 Tage) vor. Ätiologisch liegt meist eine fehlende Erregbarkeit der Uterusmuskulatur zugrunde, das Resultat ist letztlich Plazentainsuffizienz. </p>',
	'WelcheTherapieistbeieinerausgeprgtenfetalenMangelversorgungi':		'<p> Quelle: Bühling, Friedmann: Intensivkurs Gynäkologie und Geburtshilfe, Urban & Fischer	  Ab abgeschlossener 24. Schwangerschaftswoche ist der Fetus theoretisch lebensfähig (etwas 50% Überleben). Im dritten Trimenon ist das wesentliche Ziel daher die Vermeidung kindlicher Komplikationen. </p><p> </p>',
	'DieserologischeUntersuchungaufRtelnantikrperinderSchwangersc':		'<p> Quelle: Bühling, Friedmann: Intensivkurs Gynäkologie und Geburtshilfe, Urban & Fischer	  Nach gängigen Richtlinien liegt sichere Immunität ohne Notwendigkeit der Auffrischung bei einem Hämagglutinationshemmtest-Titer > 1:32 vor, keine relevante Immunität bei einem Titer < 1:8, dazwischen wird ein IgG-AK-Nachweis mittels ELISA geführt. (Obige Angabe ermöglicht also im Grunde genommen keine schlüssige Argumentation in die eine oder andere Richtung, vielleicht findet sich auf irgendwelchen Folien eine für SIP-Zwecke praktikablere Darstellung.) </p>',
	'WielangedauertimDurchschnittdieErffnungsperiodebeiMultiparae':		'<p> Quelle: Bühling, Friedmann: Intensivkurs Gynäkologie und Geburtshilfe, Urban & Fischer	  Die Eröffnungsperiode ist definiert als der Zeitraum vom Einsetzen regelmäßiger, muttermundwirksamer Wehen bis zur vollständigen Eröffnung des Muttermundes (ca. 10 cm). </p><p> Bei Erstgebärenden dauert die Eröffnungsperiode 6 bis 9 Stunden; der äußere Muttermund öffnet sich erst, wenn die Zervix ganz verstrichen ist. </p><p> Bei Mehrgebärenden dauert die Eröffnungsperiode 3 bis 7 Stunden; die Verkürzung der Zervix und Eröffnung des äußeren Muttermundes finden gleichzeitig statt. </p>',
	'WasknnenSiealsassoziierteKomplikationnacheinerSectiocaesarea':		'Quelle: Bühling, Friedmann: Intensivkurs Gynäkologie und Geburtshilfe, Urban & Fischer	  Bei der Section caesarea kommt es in weniger als 0,5% der Fälle zu Blutungen, Gerinnungsstörungen, Verletzung angrenzender Organe (z.B. Harnblase, Ureteren), Thrombose, (Fruchtwasser-)Embolie, Narkosezwischenfall. In ca. 10% der Fälle kommt es im Wochenbett zu Wundinfektionen und/oder Wundheilungsstörungen. </p>',
	'WarumisteswichtigeinemehrgebrendeSchwangerezufragenobsieinde':		'<p> Quelle: Bühling, Friedmann: Intensivkurs Gynäkologie und Geburtshilfe, Urban & Fischer	  In der Schwangerschaft auftretende Probleme tendieren zur Wiederholung. Daher sollte die Geburtshilfliche Anamnese folgende Komponenten umfassen: </p><p> 1) Schwangerschaft: Anzahl vorangegangener Schwangerschaften und deren Ausgang, Anzahl Geburten, alle Komplikationen während der Schwangerschaft 2) Geburtsverlauf: Geburtsmodus, Kindsgewicht, alle peripartalen Komplikationen und postpartalen Probleme </p>',
	'WelchewirdalseffizientesteTherapiebeiKnochenmetastasierungun':		'<p> Quelle: MSD-Manual	  Neben Ca und VitD sind Bisphosphonate die Tx der Wahl bei Osteoporose und Knochenmetastasierung. </p><p> Bisphosphonate hemmen die osteoklastenvermittelte Knochenresorption. Die Therapie beispielsweise mit 10 mg Alendronat pro Tag senkt das Frakturrisiko in Wirbelsäule und Hüfte bei postmenopausalen Frauen mit Osteoporose und steigert die Knochendichte über mindestens 4 Jahre konstanter Therapie. </p>',
	'AbwelchemLebensalterwerdenimRahmendesScreeningprogrammesrege':		'<p> Quelle: Richtlinie der ACO-Arbeitsgemeinschaft für Chirurgische Onkologie der Österreichischen Gesellschaft für Chirurgie </p><p> 1) Brustselbstuntersuchung der Frau: ab dem 25. Lebensjahr monatlich (postmenstruell) 2) Ärztliche Tastuntersuchung: ab dem 25. Lebensjahr einmal jährlich 3) Mammographie	  a) 30. - 35. Lebensjahr: Ausgangsmammographie		b) 40. - 70. Lebensjahr: jährlich	  c) ab dem 70. Lebensjahr: alle zwei Jahre </p>',
	'WelcheszustzlicheOrgannebenderMammahatbeiMutationdesBrustkre':		'<p> Quelle: OMIM-Datenbank http://www.ncbi.nlm.nih.gov/entrez/dispomim.cgi?id=113705 </p><p> BRCA1 wird prädisponierend für Mamma- und Ovarialtumore, bestimmte Tumore des Peritoneums sowie ev. Prostata-Ca. </p><p> Quelle: Vorlesungsfolien Teresa Wagner: „Erblicher Brust- und Eierstockkrebs“ </p><p> Bis zum 70. LJ erkranken 85% der BRCA1-Trägerinnen an Brustkrebst, und 53% an Eierstockkrebs. </p>',
	'DieBrustselbstuntersuchungsolltemonatlichambestenzuwelchemZe':		'Quelle: Vorlesungsfolien Sonja Vogl: „Diagnostik des Mammakarzinoms“ </p><p> Idealerweise wird die palpatorische Untersuchung der Mamma zwischen dem 6. und 12. Zyklustag (follikuläre Phase) durchgeführt, in der die Dichte der Brustdrüse geringer ist als an den anderen Tagen. </p>',
	'WelchesMammabiopsieverfahrenergibtnureinzytologischesErgebni':		'<p> Quelle: Vorlesungsfolien Sonja Vogl: „Diagnostik des Mammakarzinoms“ </p><p> Radiologische Mamma-Biopsiemethoden sind: <li>) Mammotomie <li>) US-gezielte Biopsie <li>) MR-gestützte Biopsie <li>) Feinnadel-Aspirationszytologie (FNAC) </p>',
	'WasisteineIndikationzurbrusterhaltendenOperationTumorlateral':		'<p> Vorlesungsunterlagen Meduni/Dr.LASS: </p><p> Kontraindikation zur Brusterhaltende OP: Absolut: <li> lokal fortgeschrittendes CA <li> keine freien Resektionsränder (anzustreben 0,5-1,0cm im Gesunden) <li> inflammatorisches CA Relative: <li> Tumorgröße/Brustgröße <li> Multizentrisches CA <li> Bilaterales Ca <li> Ablehnung der adjunvanten Strahlentherapie </p>',
	'DieStrahlentherapiederBrustoderAxillabeimMammakarzinomistind':		'<p> Vorlesungsunterlagen Meduni/Dr.LASS: </p><p> <li> Immer wenn brusterhaltend operiert wird! Post Ablatio: <li> Wenn 4 oder mehr Lymphknoten befallen sind <li> Invasion in Muskulatur oder Faszie <li> Non in sano Resektion </p><p> Durchführung: ambulant zumeist ca. 25 Tage ev. + Boost ev. Brachytherapie </p><p> Die bestrahlte Region ist vor mechanischen, thermischen und chemischen Reizen zu schützen </p><p> </p><p> </p><p> •Strahlentherapie ist kein Ersatz für insuffiziente OP !!! </p>',
	'berwelchenderfolgendenRezeptorenentfaltetProgesteronzentraln':		'Quelle: Vorlesungsfolien Johannes Huber: „Science – Women’s Health“ </p><p> Folgende Substanzklassen greifen neben GABA am GABA-Rezeptor an: Barbiturate, Benzodiazepine und Progesteron-Metaboliten. </p>',
	'WasistdiehufigsteUrsachederanovulatorischendysfunktionellenu':		'<p> Quelle: Vorlesungsfolien Meduni/ Dr. Lass </p><p> Dysfunktionelle uterine Blutugen = DUB (Synoym. Menorraghie und Metrorraghie) </p><p> Definition: Abnorme Blutungen (Normal: Dauer 4-6d und ca. 30ml/d Blutverlust) „Schwere, verlängerte oder zu häufige uterine Blutungen, die nicht durch Schwangerschaft, deren Komplikationen, Erkrankungen des kleinen Beckens oder systemische Erkrankungen bedingt sind und durch mehrere, konsekutive Zyklen persistieren“ (Rubin und Crossignani 1990) </p><p> Ursache: 1.	 Organische </p><p> <li>  Schwangerschaft,	<li>  Abortus <li>	Verletzunge <li>  Malignom (Endometrium-CA, Uterussarkom)  <li>	 Leiomyom <li>	EUG	 </p><p> 2.	 Systemische <li>  Blutgerinnungsstörungen (angeboren ,Medikante, Leberschaden) </p><p> Bei Nichtorganischer Ursache: Unterscheidung Ovulatorisch/Anovulatorisch (Messung von Progesteron am 20.-22. Zyklustag) </p><p> Ovulatorische  <li>	 Hypothalamus-Adenohypophysen-Ovar-Achse ist normal <li>  Normale Steroidprofile <li>  Normale Gonadotropinprofile (LH, FSH) </p><p> <li>  Charakteristisch: 90% des Blutverlustes in den ersten 3 Tagen  Ursache: Hypothese: lokale Vasokonstriktion gestört  <li>	 Verminderte Endothelin-Produktion bei Frauen mit ovulat. DUB <li>	Vermehrte Produktion von PGE2, vermehrte Expression von PGE2-Rezeptoren bei Frauen mit ovulat. DUB	  </p><p> Anovulatorische <li>	Hypothalamus-Adenohypophysen-Ovar-Achse ist gestört Ursache: Hypothese: erhöhte Konzentration von nicht-antagonisiertem Östrogen  <li>	Zu viel Östrogen – zu wenig Progesteron	 <li>  Verstärkte Endometriumproliferation	<li>  Endometriumhyperplasie  <li>	Venenerweiterung  Bei: <li>	 PCOS (= häufigste Ursache anovulatorischer DUB) <li>  Typisch: Beginn/Ende der reproduktiven Lebensphase (Perimenarche, Perimenopause) </p><p> Therapie Nicht akute, rezidivierende uterine Blutungen	<li>  Organische, systemische Ursachen ausschliessen  <li>	Serum-Progesteron Tag 20-22 des Zyklus <li>	 ovulatorisch/anovulatorisch  </p><p> Ovulatorische DUB <li>  Serum-Progesteron >9 nmol/L <li>	Tranexamsäure  <li>	 Alternativ: NSARs (fraglich)  </p><p> Anovulatorische DUB <li>	 Serum-Progesteron <9 nmol/L <li>  Zyklische Progesteronsubstitution  <li>	12.-25. Zyklustag  </p><p> Ovulatorische/Anovulatorische DUB <li>  Levonorgestrel-IUD <li>	Reduktion des Blutverlustes nach 12 Monaten um 90% <li>	 Orale Kontrazeptiva (derzeit noch nicht Standard) Akute DUB <li>  Transfusion <li>	 Curettage Medikamentös: <li>  Östrogen/Progesteron <li>  Ethinylöstradiol/NETA (Primosiston) <li>	Konjugierte Östrogene i.v. + Progesteron  </p><p> </p>',
	'Eine28JahrealteFraudieseit10JahrenunterchronischemUnterbauch':		'<p> Vorlesungsunterlagen Meduni/Dr.LASS: </p><p> Def. Chronischer Schmerz: <li> Länger als 6 Monate </p><p> </p><p> Diagnostik: <li> Anamnese (Zyklusabhängig, Dysmenorrhoe….) <li> Untersuchung (Vulva, Vagina, Portio, Schmerzhaftigkeit bei Untersuchung) <li> Sono (Zysten? Echoarm, homogen…) Einzig sichere Methode: Pelviskopie, Laparoskopie </p><p> Möglich Ursachen für chronische Unterbauchschmerzen: <li> Endometriose <li> Chron. fkt. Zysten <li> Ovarian remant Syndrom <li> Atyp. Zykl. Schmerzen <li> Mittelschmerz (um den Eisprung herum, verschwindet aber schnell wieder) <li> Adenomyosis <li> Asherman’s Syndrom (post Curettage (zu viel curetiert bis auf’s Endometrium) zusammenkleben der Uterusflächen <li> Endometriumpolypen <li> Uterine Anomalien (Uterus bicornus,…) <li> Pelvic congestion syndrom (Krampfadern im kleinen Becken, hier vor allem Dyspareunie) </p><p> Hier würde ich, aufgrund der Dauer und des Alters als erstes auf Endometriose tippen! </p>Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 126-7. </p><p> Erosio: Abschilferung des HH-Epithels. Ursache meist mechan. Einwirkungen. Bes. schmerzhaft (Endigungen der HH-Nerven liegen frei und werden gereizt). Th.: desinfizierende oder antibiotische AS, ev. Augenverband, bei dem das Lid geschlossen bleibt. </p>',
	'EineMuttersuchtmitihrem14TagealtenSuglingderohneKomplikation':		'<p> Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 97-9 </p><p> </p><p> Ophthalmia neonatorum (Neugeborenenkonjunktivitis). Gonokokken und P. aeruginosa sind die gefährlichsten Erreger. Auch häufig: Chlamydien und HSV. Für Gonoblenorrhö typisch: besonders starke Eiteransammlung; gefährlich deshalb, weil sie ein HH-Ulcus hervorruft, das die HH schnell perforieren kann. Chlamydienblenorrhö: In Mitteleuropa häufig (Besiedelung der Geburtswege mit C. trachomatis). Mukopurulenter Verlauf, weit weniger gefährlich. Th.: Erythromycin-AS. </p><hr/><p> Beginn der Erkrankung – Gonokokken-Infekt.: 1.-3. LT; Staph. + Pseudomonas: 4.-5. LT; HSV: 5.-7. LT; Chlamydien: 5.-14. LT. </p>',
	'Eine80jhrigePatientinhateinausgeprgtesEntropiumdeslinkenUnte':		'<p> Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 67-8. </p><p> Entropium senile: Erschlaffung des Aufhängeapparates des UL im Alter. Schleifen der Wimpern bewirkt Irritation der Binde- und Hornhaut. Schmerzhafte Defekte des HH-Epithels. Th.: OP </p>',
	'Eine35jhrigePatientinhateineakuteDacryocystitislinksmitSchwe':		'<p> Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 83 </p><p> Akute Entzündung des Tränensackes. Häufig Abflussstörung und Besiedelung mit Bakterien (insb. Pneumokokken) hervorgerufen. Aus dem Tränensack lässt sich Eiter ausdrücken. Als Th. steht hier system. AB-Th. + lokal desinfizierende, feuchte Umschläge.  </p>',
	'Im2LebensmonatwirdbeieinemKindeinekongenitaleEsotropiemitein':		'<p> Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 402-11. </p><p> Frühkindliches Schielen tritt innerhalb der ersten 6 LM auf. Behandlung: Bei fühkindlichem Schielen muss in den ersten 5 LJ (Zeit der Plastizität des Schielens) zuerst die Amblyopie-Gefahr vermieden werden (Okklusionsbehandlung). Die Schieloperation erfolgt erst im Vorschulalter. Eine Vorverlegung des OP-Zeitpunktes auf die Wochen unmittelbar nach Beginn des Schielens verbessert das funktionelle Ergebnis nicht! Nur beim normosensorischen Spätschielen (Schielbeginn nach Ausbildung der Binokularfunktion, d.h. nach dem ersten LJ) sollte eine Operation so bald wie möglich erfolgen. </p>',
	'BeieinemPatientenwelchereineeinseitigeSehstrungangibtfindens':		'<p> Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 185 </p><p> Krankheiten mit afferenter Pupillenstörung: großflächige NH-Schäden, ausgeprägte Makuladegeneration, fortgeschrittene glaukomatöse Papillenatrophie, Durchblutungsstörungen und Verletzungen des Sehnervs, Abriss des Sehnervs, Tumoren mit Kompression des Sehnervs oder des Chiasmas (Hypophyse, Keilbeinflügelmenigeom), Entzündungen des Sehnervs (Papillitis, Retrobulbärneuritis) </p>',
	'BeiUntersuchungenbeiVerdachtaufeineBulbusverletzungachtetman':		'Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 452-3. </p><p> Orientierende Untersuchung bei Bulbusverletzungen: Palpation des Bulbus (Augeninnendruck), Inspektion der Conjuctiva (Einblutung, Riss, Fremdkörper), Inspektion der HH (penetrierende oder perforierende Verletzung – Irisprolaps, Schnittverletzung – veränderter HH-Reflex, FK), Inspektion der Vorderkammer (Entrundung der Pupille, Vorderkammerblutung, Irisverziehung, Linsentrübung), Fundusspiegelung (Prellung der NH, Blutung der NH, Glaskörperblutung, Aderhautamotio, -blutung oder –ruptur, NH-Ablösung, intraokularer FK). Prüfung der afferenten und efferenten Pupillenbahn, Prüfung auf Tränenwegsverletzungen, Prüfung der Bulbusmotilität (Orbitabodenfraktur, Hämatom eines Augenmuskels, Orbitahämatom, Abriss der Trochlea des M. obliquus sup., Läsion eines okulomotorischen Hirnnervs). </p>',
	'BeiwelcherderangefhrtenErkrankungenistdasAuftreteneinerSkler':		'<p> Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 153 </p><p> Entzündungen der Sklera sind fast immer auf ein lokales oder generalisiertes Immungeschehen zurückzuführen, bakterielle oder virale Entzündungen sind selten. Die Hälfte aller schwer verlaufenden Skleritiden werden durch autoimmunologische Allgemeinerkrankungen hervorgerufen, insb. rheumatoide Arthritis, Polymyositis, Dermatomyositis, M. Bechterew, Vaskulitis, M. Wegener, SLE </p><p> </p>',
	'Eine73jhrigePatientinzeigtdasklinischeBilddertrockenenFormde':		'<p> Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 265 </p><p> Trockene Form der AMD: Atrophie des Pigmentepithels und der sensorischen NH steht im Vordergrund. Feuchte Form der AMD: subretinale Exsudation aus der Choriokapillaris und Einwachsen pathologischer chorioidaler Gefäße unter die NH. </p>',
	'Ein55jhrigerPatientsuchtdieAugenambulanzaufVorzweiTagenhater':		'<p> Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 232 </p><p> Ablatio retinae: Abhebung der NH vom sensorischen Pigmentepithel. Sympt.: Lichtblitze (in der Peripherie des Gesichtsfeldes) durch Glaskörperzug und Einriss der NH. Kurz danach: Schwarm von schwarzen Mücken oder Rußflocken als Schatten von Glaskörperblutung, die bei der Rissbildung der NH entsteht. Wenn sich nach der Rissbildung die NH ablöst, bemerkt der Pat. einen Schatten in der Peripherie (von unten aufsteigend – Ablation oben, oder senkender Vorhand – Ablatio unten). </p>',
	'DerPatientwarbeischnemWetterimHochgebirgeSchifahrenundhatdab':		'<p> Quelle: Grehn, Augenheilkunde, 29. Aufl., S.  </p><p> Eigentlich müsste Keratitis photoelectrica dort stehen: Bei der Keratitis photoelectrica kommt es, aufgelöst durch UV-Strahlung, zu einer Lockerung der Epithelhaftung und kleinsten Erosionen, die äußerst schmerzhaft sind. Sie tritt auf beim Schweißen und bei Aufenthalt in den Bergen und im Schnee. Symptome beginnen mit 3-8- stündiger Latenz: unerträgliche Schmerzen an beiden Augen, Tränen, Augenrötung und Lidkrampf. </p><p> Ursache der Keratitis superficialis punctata ist hingegen die gestörte Benetzung durch Tränenmangel oder falsche Zusammensetzung des Tränenfilms! </p>',
	'WelchesSymptomistnichtfreineIridozyklitistypischMydriase':			'<p> Quelle: Grehn, Augenheilkunde, 29. Aufl., S. 196 </p><p> </p><p> Befunde bei Iridozyklitis sind: ziliare Injektion, Reizmiosis, Farbänderung und verwaschene Struktur der Iris, Präzipitate (Eiweißablagerungen) an der HH-Rückseite, Tyndall-Effekt, hintere Synechien, Napfkucheniris (Iris bombée), entzündl. Pseudoptosis, Linsentrübung, Veränderungen des Augeninnendrucks, Hypopyon. </p>',
	'Eine45jhrigeFraukommtmitderRettungindieHNONotfallsambulanzSi':		'Quelle: Hals-, Nasen- und Ohrenheilkunde in Frage und Antwort: 15 </p><p> Die Frenzel-Brille ist das wichtigste Hilfsmittel der Nystagmusdiagnostik. Sie hebt durch konkave Gläser (+15 dpt) die optisches Fixation auf. Durch Beleuchtung der Augen werden dem Untersucher Spontan-, Lage- und agerunsnystagmen deutlich. </p>',
	'EineMutterwirdinderNachtum3UhrFrhausdemSchlafgerissenweilihr':		' Quelle: Hals-, Nasen- und Ohrenheilkunde in Frage und Antwort: 153 </p><p> </p><p> Die akute subglottische Laryngitis (auch Pseudokrupp genannt) ist eine viral bedingte Schleimhautschwellung unterhalb der Glottisebene. Erscheinungsbild ist eine hochrote und verdickte Epiglottis. Typische Symptome sind ein trockener, bellender Husten mit inspiratorischen Stridor, der bei entzündlicher Mitbeteiligung der Stimmlippen auch eine exspiratorische Komponente bekommt und dann mit einer heiseren Stimme verbunden ist. Abhängig von der Schwere der Atemwegsobstruktion kann es zu Zyanose und Atemnot kommen, ein Ersticken droht aber selten (im Gegensatz zur akuten Epiglottitis). </p>',
	'WelcherProzentsatzvonPatientenmitunbehandelterSyphilisentwic':		'Quelle: Fritsch,  Dermatologie Venerologie, 2. Auflage, ab S.865			Auch Vorlesung Fr Prof Gesau (nur Stadien) 15.11.07 </p><p>	 <li> Frühsyphilis (infektiös, <1-2 J.): Primärstadium (L I) bis ca. 11. Wo, Ulkus, reg.Lymphadenitis												 Sekundärstad.(L II) ab 7.Wo bis 1-2 J., gen. LK-Schwellung,																			Exantheme, lokale Papeln, rezidivierend													Frühlatenzen während L II (zwischen den Rezidiven) <li> Spätsyphilis (nicht infektiös, >1-2 J.): Spätlatenz (bis zu L III oder permanent oder Heilung)													Tertiärstadium(L III) bei Nichtbehandlung ca. 30% (Oslo-				 u. Tuskegee-Studie):  Organmanifestationen Haut, Knochen, Herz, ZNS,...: benigne				  Spätsyphilis 15,8%, Neurolues 6,3%, Cardiovasculär 10,4%, Spontanheilung 67,5%					 </p>',
	'WelcheklinischeKonsequenzergibtsichwennbeiderUntersuchungein':		'<p> Quelle: Seminar Onkologie (Melanom) 20.11.07 ( weiß nicht wer) </p><p> Am AKH wird bei einem Melanom eine Lk-Biopsie ab einer Eindringtiefe von 1 mm  gemacht: Beim Primärtumor wird gammastrahlendes Material eingespritzt und und mit einer Gamma- Kamera die Lymphwege verfolgt bis zum Lk mit dem höchsten Ausschlag (Sentinel-Lk). Dieser	 wird biopsiert – nur wenn befallen, werden alle nachfolgenden Lk der Region entfernt (früher wurden z.B. bei einer Melanomexzision am Arm sofort alle Axilla-Lk entfernt). Die Maßnahme hat jedoch keinen Einfluss auf das Überleben, ist aber ein Infogewinn für	Prognose und Nachbehandlung, und dem Pat. bleibt ein überflüssiger Eingriff erspart. </p><p> </p>',
	'BeieinemPatientenmitDysurieundeitrigemgenitalenAusflusszeige':		'<p> Quelle: Vorlesung Fr. Prof: Gesau 15.11.07 </p><p> Gonorrhoe zeigt intrazelluläre (in Leukozyten) gram-neg. Diplokokken ( gram-pos. Diplo- kokken sind nicht von Neisseria gonorrhoeae). Wenn nach Behandlung (z.B. mit Cefixim) immer noch >5 Leukozyten/HPF	im urethralen (oder zervikalen oder vaginalen) Abstrich	 sind, liegt eine NGU (Non-Gonokokken-Urethritis) vor, häufig durch Chlamydien u.a. verursacht. Bei Frauen mit >15 Leuko/HPF  im (zervikalen) Abstrich handelt es sich um eine mukopurulente Zervizitis – meist durch Chlamydia trachomatis verursacht - ,finden sich zusätzlich  gram-neg. Diplokokken in Leukozyten, spricht man von Gonokokkenzervizitis (alles dringend behandlungspflichtig wegen mögl. aufsteigendender Infekte à Infertilitätsgefahr). Bei Vd. auf Gonorrhoe ist die Anlage einer Kultur verpflichtend, N.gonorrhoeae bildet graue, rauchige Striche. Mit Kultur kann auch Resistenz bestimmt werden (Antibiogramm). </p>',
	'WielautetIhreDiagnosebeifolgenderBefundkonstellationderSyphi':		'<p> Quelle: Fritsch,  Dermatologie Venerologie, 2. Auflage, ab S.879			Pschyrembel, Klin. Wörterbuch, 259. Auflage, S.1626 (Defin. L.latens) </p><p> <li>VDRL (Venereal Disease Research Laboratory Test) ist ein unspezifischer Test zur Therapie-		  und  Aktivitätskontrolle der Lues (Abfall der Lipoid-Ak). Bei rechtzeitiger Therapie			der Frühsyphilis sinkt der Titer rasch ab (2 Stufen = Therapieerfolg). War die Therapie			 nicht	rechtzeitig, bleibt die Reaktivität = Titer ein Jahr nach Therapieende auf 1:8 oder			 mehr, die Infektion ist immer noch - hier latent - vorhanden (neuerliche Behandlung). <li>TPHA (Trep. pallidum Hämagglut.test) ist ein Screening-Test für Lues, der auf IgM- und auf		   IgG-Ak reagiert und nur aussagt (ab der 4.Wo), ob Pat. Lues hat oder hatte. Sagt			  nichts über den Behandlungserfolg aus, kann auch nach erfolgreicher Therapie			lebenslang bestehen bleiben = „Seronarbe“. <li>19S-IgM-FTA-ABS ist ein Fluoreszenzmikroskop-Absorptionstest für treponemenspezifische		   IgM-Ak, die	spätestens ein Jahr nach Therapieende nicht mehr		   nachweisbar sind, aber ein neg. Test eine Latenz nicht ausschließt. <li>Lues latens seropositiva: „ca. 2 J. p.i. klingen alle klin. Erscheinungen i.d.R. folgenlos ab, die			Syphilis ist nur mehr serologisch nachweisbar. Rezidive sind aber möglich (meist			spärliche Hauterscheinungen, dabei aber große Einzelherde, Ringformen, ...). Es muss		   wahrscheinlich nur bei einem Teil der Pat. mit Syphilis latens (ca. 30%) und Spät-			manifestationen gerechnet werden.“			 </p>',
	'WelcheTherapieerhlteinPatientbeieinerunkompliziertenGonorrho':		'<p> Quelle: Vorlesung Fr. Prof. Gesau 15.11.07 </p><p> Am AKH wird Einmalgabe Cefixim (Oral-Cephalosporin Grp.3) verabreicht. Vorteil: oral. </p><p> Auch möglich: Ceftriaxon od. Cefotaxim (Parenteral-Cephalosporine Grp.3a),  2.Wahl: Ciprofloxacin (Fluorchinolon Grp.II) aber nicht bei SS,  bei SS Azithromycin (Makrolid) </p>',
	'WasistdieTherapiederWahlbeieinerNGUNichtGonokokkenurethritis':		'<p> Quelle: Vorlesung Fr. Prof. Gesau 15.11.07 </p><p> Photosensitivitätserhöhung (wie bei allen Tetracyclinen) à Photodermatosen, daher keine Sonnenbäder Kontraindikation: SS !, (auch Kinder unter 9a) </p>',
	'DerhistologischeBefundzeigtLentigomalignaintotoexzidiertWelc':		'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 134 </p><p> Lentigo-maligna = in-situ Melanom! Nachsorge im Stadium I ( alle Primärtu. mit Eindringtiefe < 1mm und Melanome mit Eindringtiefe bis 2mm ohne Ulceration und Clark Level < IV): Untersuchung der Haut alle 6 Monate + US d. regionären LK 1x/a. </p><hr/><p> Quelle: Fritsch,  Dermatologie Venerologie, 2. Auflage, S. 647 u.635			AKH – Consilium, Melanom-Nachsorge </p><p> Klinische Untersuchung (Melanom-Nachsorge) Fritsch: Stadium 0: keine Angaben, St.I: halbjährlich, ab St.II: vierteljährlich, St.IV: individuell AKH-Cons.: klin. U. unabhängig vom Risiko und Tumordicke:				  1.-3.J.: vierteljährlich, 4.-10.J.: halbjährlich, >11.J.: jährlich (Unterschiede schon bei Labor, Thorax-Rö., Lk-Sono) Die sachliche Richtigkeit der Antwort ist eigentlich fraglich </p>',
	'EinePatientinkommtnachPrimrexzisioneinersuspektenpigmentiert':		'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 134 </p><p> Melanome mit Eindringtiefe > 1mm: radioakt. Sentinelmarkierung + Entfernung. LK-Meta.: Entf. d. restl. LK dieser Region in 2. Sitzung. Bei chirurg. Entf. je nach Eindringtiefe Sicherheitsabstand 1-2cm. </p>',
	'EinPatientkommtnachPrimrexzisioneinersuspektenpigmentiertenL':		'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 134 </p><p> Lentigo-maligna = in-situ Melanom! Nachsorge im Stadium I ( alle Primärtu. mit Eindringtiefe < 1mm und Melanome mit Eindringtiefe bis 2mm ohne Ulceration und Clark Level < IV): Untersuchung der Haut alle 6 Monate + US d. regionären LK 1x/a. </p><hr/><p> Quelle: Fritsch,  Dermatologie Venerologie, 2. Auflage, S. 647 u.635			AKH – Consilium, Melanom-Nachsorge </p><p> Klinische Untersuchung (Melanom-Nachsorge) Fritsch: Stadium 0: keine Angaben, St.I: halbjährlich, ab St.II: vierteljährlich, St.IV: individuell AKH-Cons.: klin. U. unabhängig vom Risiko und Tumordicke:				  1.-3.J.: vierteljährlich, 4.-10.J.: halbjährlich, >11.J.: jährlich (Unterschiede schon bei Labor, Thorax-Rö., Lk-Sono) Die sachliche Richtigkeit der Antwort ist eigentlich fraglich </p>',
	'Eine60jhrigePatientinwirdvorstelligmitgroenurtikariellenentz':		'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 97-8. </p><p> Blasenbildende Autoimmunerkrankungen: Unterscheidung nach der Lokalisation der Spaltbildung. Epidermale Blasen = Pemphigus-Gruppe, junktionale Blasen = Phemphigoid- Gruppe, subepidermale Blasen = Dermatitis herpetiformis, Epidermolysis bullosa aquisita. Bullöses Pemphigoid: Junktionale Spaltbildung im Bereich der Basalmembran. Erkrankung des höheren Lebensalters (juvenile Form = selten!), Auto-AK gegen Bestandteile der Hemidesmosomen (Kollagen Typ XVII) multiple urtikarielle Plaques, konfluieren tw., an manchen Stellen entstehen auf diesen pralle Blasen. </p><p> </p><hr/><p> Quelle: Fritsch,	 Dermatologie Venerologie, 2. Auflage, S. 471 </p><p> Therapie BP: komb. systemisch Kortikosteroid- und Azathioprintherapie					   (60-100 mg Methylprednisolon/Tag p.o., schnellerer logarithmischer Abbau als						 bei Pemphigus) </p><p> 161 Ein Patient bemerkt seit einigen Wochen das vermehrte Auftreten von Erosionen an   der	Mundschleimhaut	 sowie	seit  einigen  Tagen  das  zusätzliche	Auftreten  von schlaffen  Blasen  am  Rumpfund	an	beiden	Armen.	Die	 histologische	und immunhistologische Aufarbeitung einer Hautbiopsie zeigt intraepidermale suprabasale Spaltbildung.  Eine	 serologische  Untersuchung	 zeigt	ein	 positives	Ergebnis  für Antikörper gegen Desmoglein-1 und Desmoglein-3. Welche Diagnose stellen Sie? Pemphigus vulgaris </p><hr/><p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 97 </p><p> Pemphigus-Gruppe: P. foliaceus (Desmoglein-1-Auto-AK, Spaltbildung in höheren Schichten d. Epidermins), P. vulgaris (Desmoglein-3-Auto-AK, Spaltbildung in tieferen Schichten). Desmoglein = Bestandteil der Desmosomen. </p><p> An der Schleimhaut: Desmoglein 3 kann eine Beeinträchtigung des Zell-Zell-Kontaktes durch Auto-AK gegen Desmoglein-1 kompensieren, nicht aber umgekehrt. D.h. an der SH kann nur der P. vulgaris in Erscheinung treten! </p><hr/><p> Quelle: Fritsch,	Dermatologie Venerologie, 2. Auflage, S. 465 </p><p> Therapie PV: komb. systemische Kortikosteroid- und andere Immunsuppressiva					   (hohe Anfangsdosis: 1-2 mg/kgKG Methylprednisolon p.o. bis Nikolskizeichen					   negativ, dann logarithmischer Abbau; zusätzlich Azathioprin bis zu einem Jahr					  nach Rezidivfreiheit). Zusätzlich pflegerische Lokaltherapie (lokale					   Kortikosteroide aber wirkungslos) </p>',
	'Eine25jhrigePatientinprsentiertsichmiteinemgeneralisiertente':		'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 98, 85 </p><p> Nikolsky-Zeichen pos.: Erweiterung der Blase in die umgebende Haut auf tangentialen Druck mit dem Finger. TEN = Teil eines Spektrums eines Reaktionsmusters der dermo-epidermalen Junktionszone. Erythema exsudativum multiforme = leichteste Form, Stevens-Johnson Syndrom = mittlere Form, TEN = schwerste Form. TEN-Auslöser: vorangegangene Infektionskrankheiten, Medikamtente (v.a. Sulfonamide). T-Zell vermittelte zytotox. Reaktion mit Nekrose der Keratinozyten, lymphozytäres Infiltrat im Bereich der dermo-epidermalen Junktionszone mit vakuoliger Degeneration des Basalzelllagers. Klinik der TEN: großflächige, düsterrote/livide Erytheme, bald großflächige Ablösung der Epidermis. TEn, wenn > 30 % der Haut befallen, SH immer mitbetroffen! </p><hr/><p> Quelle: Fritsch,	Dermatologie Venerologie, 2. Auflage, S. 224 </p><p> Therapie TEN: TEN ist lebensgefährlich u. daher ein dermatologischer Notfall (uU auch SJS).					   Erkennen/Elimination der auslös. Ursache (Medikament, Infekt),						Überwachung/Korrektur der vitalen Blutparameter,					   system. Kortikosteroide (80-120 mg Methylprednisolon/Tag, p.o. wenn mögl,)						und wegen der dadurch erhöhten Superinfekt.gefahr prophylaktisch AB						  (i.d.R. Penizillin + Ampizillin und penizillinaseresist. Penizillin).						  Neu: hochdosierte Immunglobuline i.v. (Apoptoseunterbrechung).  Pflegemaßnahmen ähnlich wie bei Verbrennungen. </p>',
	'Eine40jhrigePatientinberichtetberseitmehrerenWochenzunehmend':		'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 103 </p><p> Typ. Hautmanifestationen: periorbitales, fliederfarbenes Erythem, generalisierte Erytheme mit Teleangiektasien + Pigmentverschiebung, lichenoide Papeln und Erytheme an Streckseiten der Finger + Handrücken (Grotton-Zeichen) sowie kutane Verkalkungen. Befall der Skelettmuskulatur: in erster Linie Schulter- und Beckenmuskeln (Muskelschwäche und <li>schmerzen), auch Larynx (Heiserkeit). Auch Befall d. Ösophagus, des Herzens oder des Zwerchfells </p><hr/><p> Quelle: Fritsch,  Dermatologie Venerologie, 2. Auflage, S. 499 f </p><p> Therapie DM: system. Kortikosteroide, Anfangsdosis mind. 1 mg/kgKG 2-6 Wo lang, dann						langsame Reduktion, Behandlung 6-12 Monate.	 In 30% der Fälle steroid-					   induzierte Myopathie möglich und daher Kombination mit Azathioprin.					   Plasmapherese, i.v. Immunglobuline.		25-75% sind assoziiert mit internen Neoplasien. Werden diese entsprechend behandelt,	  kommt es zum Stillstand der DM. Bei Tumorrezidiv exazerbiert auch DM wieder. </p>',
	'DieTherapiederausgedehntenVitiligoerfolgtdurch:Photochemothe':		'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 116 </p><p> Prognose der Vitiligo v.a. durch den natürlichen Ksankheitsverlauf bestimmt. Therapeut. Interventionen sind beschränkt. In manchen Fällen ist die PUVA-Therapie wirksam. Repigmentierung erfolgt durch Einwanderung von Melanozyten aus dem infundibulären Anteil des Haarfollikels. </p>',
	'DerNachweiseinerKontaktallergieerfolgtdurch':						'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 52 </p><p> Kontaktallergie = Typ IV-Allergie. Nachweis durch Epikutantest (Aufkleben von speziell beschichteten Pflastern auf den Rücken, ablesen nach 24, 48 und 72 h). </p><p> weitere Allergietests: Prick-Test (Nachweis einer Typ I-Allergie. Testlösungen werden auf die Haut aufgetropft, durch den Tropfen wird die Haut oberflächlich eingeritzt, Ablesung nach 20 bis 30 min.) Intrakutan-Test (Nachweis von Typ I-Allergie. Die Testlösung wird direkt mit einer Nadel intradermal injiziert. V.a. bei „schwachen“ Allergenen – Hausstaubmilbe, Schimmelpilzsporen. Empfindlicher als Prick-Test) Intradermal-Test (Nachweis von Typ IV-Allergie, z.B. Medikament. Durchführung wie Intrakutentest, Ablesung nach 24-48 h). </p>',
	'Ein18jhrigerPatientprsentiertsichmiteinemgeneralisiertenmorb':		'<p> Quelle: Moll, Ingrid. (2005). Dermatologie, 6.Aufl. S.146 Def.: stammbetontes makulo-papulöses Exanthem , das nach einer charakt. Latenzzeit von 7-10 Tagen auftritt.Zu einem späteren zeitpunkt tritt es nicht mehr auf und es handelt sich auch nicht um eine Penicillinallergie. Therapie: Absetzen des AB, Menthol zur Ruckreizbekämpfung ev. Oder Zinkschüttelmixtur. Bei stärkerem Auftreten ev. Mit externen Steroiden. </p>',
	'Ein53jhrigerPatientprsentiertsichmitgruppiertenundkonfluiere':		'<p> Quelle:Moll, Ingrid. (2005). Dermatologie, 6.Aufl. S.215 Synonym Gürtelrose Def: 2.Erkrankung durch VZV mit halb oder beidseitigem Befall eines oder mehrerer Hautsegmente, die durch schmerzhaft und gruppiert stehende Bläschen auf gerötetem Grund gekennzeichnet ist.Gipfel zwischen dem 50. Und 70.LJ Uncharakteristische Prodromi: Abgeschlagenheit, Müdigkeit, neuraligiforme Schmerzen. Herpetiforme Bläschen nach 2- 3 Tagen, davor leicht erhabenes, umschriebenes Erythem. Nach 2- 7 Tagen Eintrübung des Inhaltes und gelbliche Verkrustung. Dann Austrocknung und Abheilung in 2 -3 Wochen unter häufiger Narbenbildung.	Komplikationen: Postzoster Neuralgien Therapie: virustatische mit Famvir, Aciclovir innerhalb von 72h Bei immunsuppremierten Aciclovir i.v. für 7-10 Tage Neuralgien: Carbamazepin, Analgetika </p>',
	'ViraleInfektionenwelchedieMundschleimhautbetreffensind':			'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 71 </p><p> Hand-foot-mouth disease und Herpangina: Durch Coxsackie- oder Enteroviren verursacht, schmerzhafte Erosionen und Ulcera an der MSH (davor stecknadelkopfgroße, kurzlebige Bläschen) </p>',
	'Ein8jhrigerPatientprsentiertsichmitgeneralisiertenPapelnundB':		'<p> Quelle:Moll, Ingrid. (2005). Dermatologie, 6.Aufl. S.214 Durch VZV verursachtes vesikuläres Exanthem der Haut und der Schleimhäute, das vermehrt im Kindesalter auftritt. Erstinfektion des VZV – Reaktivierung = Herpes zoster  </p><p> Mensch ist die einzige Infektionsquelle. Übertragungsmodus ist Tröpfchen-oder Schmierinfektion. IKZ: 12-21 Tage Zuerst vereinzelt stehende rote Maculae, die dann zu Papeln und später zu hirsekorngroßen Bläschen werden. Nach Tagen platzen die Bläschen und trocken darauf hin ein und verkrusten. Immer mehrere Generationen aufeinmal am Körper sichtbar. Auch harter Gaumen und Wangenschleimhaut betroffen. Mäßiger bis starker Juckreiz. Allgemeinbefinden gut. Narbenlose Abheilung binnen 2-3 Wochen.  Komplikationen: bakt. Superinfektion. Im Erwachsenenalter bei disseminiertem Befall Varizellenpneumonie.	 Therapie: Symptomatisch gegen Juckreiz. Schwere Verlaufsformen antivirale Therapie. </p>',
	'Ein46jhrigerPatientprsentiertsichmitscharfumschriebenembrunl':		'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 68 </p><p> Erythrasma: Infektion mit Corynebacterium minutissimum, Manifestation i.d.R. in den intertriginösen Arealen oder interdigital (v.a. in Zehenzwischenräumen). Klinik: flaches, scharf begrenztes, rotes/rotbraunes Areal mit feinlamellärer Schuppung. Nachweis: Corynebakterien produzieren ein Pigment, das bei Bestrahlung mit UV-Licht (dem Wood-Licht) in abgedunkeltem Raum korallenrot fluoresziert. DD: Candida-Intertrigo, Psoriasis inversa. Th.: antiseptische Seifen. </p>',
	'SiewerdenzueinemvierjhrigenKindmithohemFieberErbrechenHalsun':		'Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 66 </p><p> Klinik Scharlach: Mit Auftreten von Tonsillits/Pharyngitis kommt es zu Allgemeinsymptomen (Fieber, Schüttelfrost). Ca. 48 h danach tritt ein im Gesicht beginnendes, sich rasch über das gesamte Integument ausdehnendes, kleinpapulöses Exanthem auf. Die Papeln haben eine raue Oberfläche – reibpapierartiger Tasteindruck. Die Perioralregion bleibt ausgespart! Die Zunge ist gerötet und die weißlichen Papillen treten verstärkt hervor. DD: Ampicillinexanthem nach EBV- Infektion. Th.: Penicillin </p><p> Allgemein: Scharlach = exanthematische Erkrankung aufgrund hämatogener Ausschwemmung eines durch meistens b-hämolysierende A-Streptokokken produziertes Toxin. Ausgangspunkt i.d.R. lokale Streptokokkeninfektion des Rachenraums, seltener eine Infektion einer HAutwunde (Wundscharlach). Nach durchgemachter Infektion besteht Immunität gegen das Toxin! </p><p> </p>',
	'Eine20jhrigePatientinprsentiertsichmitscharfbegrenztenerythe':		'<p> Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 104-5 </p><p> Epidemiologisch zwei Psoriasis-Typen: I: häufiger (ca. 70 %), frühes Manifestationsalter (< 30a), fam. gehäuft, schwererer Verlauf. II: fehlende fam. Häufung, späteres Auftreten, leichterer Verlauf. Psoriasis vulgaris = häufigste Variante. Typ. erythro-squamöse Plaques (rötl. Herde mit silbriger Schuppung, Psoriasis punctata, guttata) = Primäreffloreszenz. Klin. Zeichen: Kerzentropfphänomen (Ähnlichkeit abgelöster Schuppen mit Kerzenwachs), Auspitzphänomen (punktförmige Hautblutungen nach Ablösen der Schuppen). Bei Psoriasis ist die gesamte Haut und nicht nur die klinisch manifesten Lokalisationen erkrankt – durch mechan. Manipulation können typ. Effloreszenzen auch in scheinbar unbefallener Haut ausgelöst werden: Köbner- Phänomen. Nagelveränderungen (Tüpfelnägel, Ölflecken, Krümelnägel) kommen bei 30-50 % der Psoriatiker vor. </p>',
	'Eine27jhrigePatientinprsentiertsichmitmehrerenweichenkutanen':		'Quelle: Kittler, Riedl. Dermatologie und Venerologie, 2. Aufl, S. 123-4. </p><p> NF I (Mb. Recklinghausen) vs. NF II (seltener, mit bilat. Akustikusneurinomen ass.). Das für NF I verantwortliche Gen codiert für das Tu-suppressorgen Neurofibromin. Der Gendefekt bei NF II betrifft ebenfalls ein Tu.suppressorgen: Merlin. Bei beiden Formen finden sich auf der Haut multiple Cafe-au-lait-Flecken als wichtiges dignost. Kriterium. Diese scharf begrenzten hellbraunen Flecken können gelegentl. auch beim Gesunden auftreten. Wenn mehr als 6 Flecken mit einem Durchmesser von > 1.5 cmvorhanden sind, ist NF sehr wahrscheinlich. Bei NF I außerdem multiple kutane Neurofibrome, die als hautfarbene oder hellbraune weiche Papeln und Knoten imponieren. Neben der Hautsymptomatik finden sich auch neurologische (z.B. Epilepsie) und ophthalmologische Auffälligkeiten (Lisch-Knötchen der Iris) und Skelettfehlbildungen. </p>',
	};
	 
 


	// gespeicherte Variablen auslesen
	pos_neg = GM_getValue('pos_neg');
	pos_neg = pos_neg || true;
	//console.log('pos_neg: ' + pos_neg);

	// Zustand speichern (eventuell erstmalig)
	GM_setValue('pos_neg', pos_neg);
	
	// gespeicherte Variablen auslesen
	overwrite_offline = GM_getValue('overwrite_offline');
	overwrite_offline = overwrite_offline || false;
	//console.log('overwrite_offline: ' + overwrite_offline);

	// Zustand speichern (eventuell erstmalig)
	GM_setValue('overwrite_offline', overwrite_offline);
	
	// gespeicherte Variablen auslesen
	offline_date = GM_getValue('offline_date');
	offline_date = (offline_date ? new Date(offline_date) : new Date(0));
	//console.log('offline_date: ' + offline_date);

	// Zustand speichern (eventuell erstmalig)
	GM_setValue('offline_date', offline_date+'');
	
	// gespeicherte Variablen auslesen
	user_name = GM_getValue('user_name');
	user_name = user_name || "fragensammler"+Math.floor(Math.random()*10000+1000);
	//console.log('user_name: ' + user_name+'');

	// Zustand speichern (eventuell erstmalig)
	GM_setValue('user_name', user_name+'');

	// Standardvariablen setzen
	default_questions = {};
	default_questions = $.toJSON(default_questions);

	// gespeicherte Variablen auslesen
	// questions = false;
	questions = GM_getValue('questions');
	questions = questions || default_questions;
	questions = $.evalJSON(questions);
	//console.log('questions: ' + $.toJSON(questions));

	// Standardvariablen setzen
	default_doubles = {};
	default_doubles = $.toJSON(default_doubles);

	// gespeicherte Variablen auslesen
	// questions = false;
	doubles = GM_getValue('doubles');
	doubles = doubles || default_doubles;
	doubles = $.evalJSON(doubles);
	//console.log('doubles: ' + $.toJSON(doubles));

	// Zustand speichern (eventuell erstmalig)
	GM_setValue('questions', $.toJSON(questions));
	////console.log(questions);
 
  if(document.location.hostname != "notepad.cc" && (document.location.pathname == "/fragensammlung" || document.location.protocol=="file:") ){
   
   if(document.location.protocol=="file:"){
		// damit man nicht unabsichltich wieder online geht
		$('.pager').hide();
   }
   
   
	// gelernte Fragen werden ausgegraut
	css = "\n\
		.front-anonymous #front-bottom-wrapper #content-front { width: auto !important;} \n\
		DIV#sidebar-second.column.sidebar {float: left; clear: both;} \n\
		DIV.field-items, .show-answer, .comments-number a, .pager { font-size:1.8em !important; line-height: 1.3em !important;} \n\
		#header-inner, #main-inner, #footer-inner { width: auto !important; float: none !important; padding-left: 0 !important; } \n\
		#block-block-22 { position: static !important; } \n\
		#sidebar-first {position: relative; left: 100px; height: 20 px; width: 100%; } \n\
		#sidebar-first #block-nextdoc-user-nextdoc-user-menu-block .content li, div.item-list.clearfix { clear: none; } \n\
		#sidebar-first #block-nextdoc-user-nextdoc-user-menu-block .content li, #main { width: 100% !important; } \n\
		#content, #content .block { width: 100% !important; } \n\
		#page-wrapper {min-width: 0 !important;} \n\
		#content-area .content-social-links {transform: scale(2);  position: relative; right: 50px; background-color: transparent;} \n\
		.answers .answer { background-color: transparent; } \n\
		.doppelt, .disabled, .view-quizes .views-row:first-child .prev_link, .view-quizes .views-row:last-child .next_link { text-decoration: line-through !important; } \n\
		.view-quizes .views-row { margin: 1em 0; } \n\
		.view-quizes .views-row .content.clearfix { padding: 1em; } \n\
		.view-quizes .views-row .high_link { background-position: -192px -23px; } \n\
		.view-quizes .views-row .grey_link { background-position: -174px -23px; } \n\
		.view-quizes .views-row .high_link:hover { background-position: -192px -43px; } \n\
		.view-quizes .views-row .grey_link:hover { background-position: -174px -43px; } \n\
		.view-quizes .views-row.disliked .high_link { background-position: -192px -4px; } \n\
		.view-quizes .views-row.liked .grey_link { background-position: -173px -4px; } \n\
		#header-wrapper, #main-wrapper, #main-bg, #footer-wrapper {min-width: 0 !important;} \n\
	";
	pos_neg_css = "\t\t."+(pos_neg ? "dis" : "")+"liked { background-color: Khaki; } \n\t\t."+(pos_neg ? "" : "dis")+"liked { background-color: lightgrey; } \n";
	// so ist es unabhäng von Greasemonkey's GM_addStyle(css);
	style = $('<style type="text/css"></style>');
	style.text(css+pos_neg_css);
	$('head').append(style);
	
	$('.quiz-links').prepend($("<a style='margin-right: 1.5em;'>Invertieren</a>").click(function(){
		pos_neg = !pos_neg;
		GM_setValue('pos_neg', pos_neg);
		//console.log('pos_neg: ' + pos_neg);
		pos_neg_css = "\t\t."+(pos_neg ? "dis" : "")+"liked { background-color: Khaki; } \n\t\t."+(pos_neg ? "" : "dis")+"liked { background-color: lightgrey; } \n";
		style.text(css+pos_neg_css);
	}));

	$('.quiz-links').prepend($("<a id='user_name' target='_blank' href='http://notepad.cc/"+user_name+"'>Auf Notepad.cc Speichern</a>"));
	
	$('.quiz-links').prepend($("<input type='text' style='margin-right: 1.5em;' value='"+user_name+"' />").change(function(){
		user_name = $(this).val();
		$('#user_name').attr('href', 'http://notepad.cc/'+user_name);
			//console.log('user_name: ' + user_name+'');

			 // Zustand speichern (eventuell erstmalig)
		  GM_setValue('user_name', user_name+'');
	}));
   
   $('.quiz-links').prepend($("<input name='overwrite_offline' type='checkbox' "+(overwrite_offline?" ckecked='checked":"")+" style='margin-right:0em;'></input><label for='overwrite_offline' style='margin-right: 1.5em;'>Overwrite offline</label>").change(function(){
		overwrite_offline = $(this).is(':checked');
		
		  //console.log('overwrite_offline: ' + overwrite_offline+'');

		  // Zustand speichern (eventuell erstmalig)
		  GM_setValue('overwrite_offline', overwrite_offline);
	}));
   
	changelike = function(e){
		////console.log(this,arguments);
		likeordislike = $(this).attr('class').split('-').reverse()[0]+'d';
		theotherone = (likeordislike == 'liked' ? 'disliked' : 'liked');
		high_or_grey = (likeordislike == 'liked' ? '.grey_link' : '.high_link');
		number = $(this).parents('div.views-row').find('div:first').attr('id').split('-')[1];
		//console.log(number);
		if($(this).text().trim()=='Bewertung rückgängig machen'){
			if(typeof questions[number] == "undefined" && overwrite_offline){
				$(this).parents('div.views-row').addClass(likeordislike);
				//console.log(likeordislike);
				questions[number] = likeordislike == 'liked';
			}
		}
		else {
			if(overwrite_offline){
				//console.log('un'+likeordislike);
				$(this).parents('div.views-row').removeClass(likeordislike);
				delete questions[number];
			}
		}
		
				
			// Zustand für alle speichern
			GM_setValue('questions', $.toJSON(questions));
			questions = GM_getValue('questions');
			questions = $.evalJSON(questions);
			//console.log('gespeichert:', questions[number + '']);
	};
	
	if(document.location.protocol!="file:"){
		$('.button-dislike, .button-like').bind('DOMSubtreeModified',changelike);
	}
	else {
		$('.button-report a, .flag-node-follow a, .button-dislike a, .button-like a').attr('target', '_blank');
	}
  

	number_link = [];
	grey_link = [];
	high_link = [];
	next_link = [];
	prev_link = [];
	foll_link = []; //following
	past_link = [];
	answer_comments_link = [];
	keywords = [];
	
	
	$('.view-quizes .views-row').each(function(){
		number = $(this).find('div:first').attr('id').split('-')[1];
		if(doubles[number] == true || $(this).find('div.comment-wrapper div.content').filter(function(){
				return $(this).text().trim().toLowerCase()=="doppelt";
			}).length
			> 0
		){
			console.log(number, 'doppelt');
			$(this).addClass('doppelt');
			doubles[number] = true;
		}
	});
	
	GM_setValue('doubles', $.toJSON(doubles));
	//console.log(doubles);
	
	$('.view-quizes .views-row').each(function(){
		
		number = $(this).find('div:first').attr('id').split('-')[1];
		$(this).prepend($('<a name="'+number+'"/>'));
		
		questions = GM_getValue('questions');
		questions = $.evalJSON(questions);
		
		if(questions[number] == true){
			$(this).removeClass('disliked').addClass('liked');
		}
		else if (questions[number] == false) {
			$(this).removeClass('liked').addClass('disliked');
		}
		if(document.location.protocol!="file:" && typeof questions[number] == "undefined" || overwrite_offline ){
			if($(this).find('.button-like:contains(Bewertung rückgängig machen)').length>0){questions[number]=true;$(this).removeClass('disliked').addClass('liked');}
			else if($(this).find('.button-dislike:contains(Bewertung rückgängig machen)').length>0){questions[number]=false;$(this).removeClass('liked').addClass('disliked');}
		}
		GM_setValue('questions', $.toJSON(questions));
	   
		// Link, der die Frage zum Bildschirmoberrand bringt 
		number_link[number] = $('<a class="number_link field field-name-field-exams-term-ref field-type-taxonomy-term-reference field-label-hidden clearfix" href="#'+number+'">Frage Nummer '+number+'</a>');
		number_link[number].data('number', number);
		number_link[number].click(function (evt) {
			number = $(this).data('number');
			active = number;
			$('html, body').stop().animate({
				scrollTop: $('[name='+number+']').offset().top
			}, 600, function () {
				document.title = document.title.replace(/(Fragensammlung) (\| nextdoc)(.*)/, '$1 #' + number);
				document.location = '#' + number;
				
			});
			evt.preventDefault();
		});

		grey_link[number] = $('<a class="grey_link content-social-button" title="#" href="#'+number+'">ausgrauen</a>');
		grey_link[number].data('number', number);
		grey_link[number].click(function (evt) {
			number = $(this).data('number');
			
			// gespeicherte Variablen auslesen
			// hier wird jedes Mal ausgelesen,
			// sodass auch in mehreren Tabs gearbeitet werden kann!
			questions = GM_getValue('questions');
			questions = $.evalJSON(questions);
			// zustand ändern
			////console.log('vorher:', questions[number + '']);
			if(questions[number + '']==true){
				delete questions[number + ''];
				$(this).parents('div.views-row').removeClass('liked').removeClass('disliked');
			}
			else {
				questions[number + ''] = true;
				 $(this).parents('div.views-row').removeClass('disliked').addClass('liked');
			}
			////console.log('nachher:', questions[number + '']);
			
			// Zustand für alle speichern
			GM_setValue('questions', $.toJSON(questions));
			questions = GM_getValue('questions');
			questions = $.evalJSON(questions);
			////console.log('gespeichert:', questions[number + '']);
			
			GM_setValue('offline_date', new Date()+'');

			//number_link[number].click();
				 evt.preventDefault();
		});

		high_link[number] = $('<a class="high_link content-social-button" title="enter" href="#'+number+'">hervorheben</a>');
		high_link[number].data('number', number);
		high_link[number].click(function (evt) {
			number = $(this).data('number');
			
			// gespeicherte Variablen auslesen
			// hier wird jedes Mal ausgelesen,
			// sodass auch in mehreren Tabs gearbeitet werden kann!
			questions = GM_getValue('questions');
			questions = $.evalJSON(questions);
			// zustand ändern
			////console.log('vorher:', questions[number + '']);
			if(questions[number + '']==false){
				delete questions[number + ''];
				$(this).parents('div.views-row').removeClass('liked').removeClass('disliked');
			}
			else {
				questions[number + ''] = false;
				 $(this).parents('div.views-row').removeClass('liked').addClass('disliked');
			}
			////console.log('nachher:', questions[number + '']);
			
			// Zustand für alle speichern
			GM_setValue('questions', $.toJSON(questions));
			questions = GM_getValue('questions');
			questions = $.evalJSON(questions);
			////console.log('gespeichert:', questions[number + '']);
			
			GM_setValue('offline_date', new Date()+'');

			//number_link[number].click();
				 evt.preventDefault();
			
		});

		prev = $(this).prev();
		next = $(this).next();
	   
		prev_link[number] = $('<a title="a ←" class="prev_link number_link field field-name-field-exams-term-ref field-type-taxonomy-term-reference field-label-hidden clearfix">vorige</a>');
		
		if(prev.length>0 && $(prev).find('div:first').length > 0){
			prev_number = $(prev).find('div:first').attr('id').split('-')[1];
			prev_link[number].attr('href', '#' + prev_number);
			prev_link[number].data('prev_number', prev_number);
			prev_link[number].click(function (evt) {
				prev_number = $(this).data('prev_number');
				if (prev_number != 'undefined') {
					$(number_link[prev_number]).click();
				}
			});
		}
		else {
			prev_link[number].addClass('disabled');
			prev_link[number].click(function (evt) {
				$(this).vibrate(vibrate_conf).addClass("disabled");
			});
		}
/*
		next_link[number] = $('<a title="s →" class="next_link number_link field field-name-field-exams-term-ref field-type-taxonomy-term-reference field-label-hidden clearfix">nächste</a>');
		
		if(next.length>0 && $(next).find('div:first').length > 0){
			next_number = $(next).find('div:first').attr('id').split('-')[1];
			next_link[number].attr('href', '#' + next_number);
			next_link[number].data('next_number', next_number);
			next_link[number].click(function (evt) {
				next_number = $(this).data('next_number');
				if (next_number != 'undefined') {
					$(number_link[next_number]).click();
				}
			});
		}
		else {
			next_link[number].addClass('disabled');
			next_link[number].click(function (evt) {
				$(this).vibrate(vibrate_conf).addClass("disabled");
			});
		}*/
		
		prev_link[number] = $('<a title="a ←" class="prev_link number_link field field-name-field-exams-term-ref field-type-taxonomy-term-reference field-label-hidden clearfix">vorige</a>');
		prev_link[number].click(function (evt) {
			prev = $(this).parents(".views-row").prev();
			if (prev.length>0) {
				prev_number = $(prev).find('div:first').attr('id').split('-')[1];
				$(number_link[prev_number]).click();
			}
			else
			{
				
				$(this).vibrate(vibrate_conf).addClass("disabled");
			}
		});
		
		next_link[number] = $('<a title="s →" class="next_link number_link field field-name-field-exams-term-ref field-type-taxonomy-term-reference field-label-hidden clearfix">nächste</a>');
		next_link[number].click(function (evt) {
			next = $(this).parents(".views-row").next();
			if (next.length>0) {
				next_number = $(next).find('div:first').attr('id').split('-')[1];
				$(number_link[next_number]).click();
			}
			else
			{
				
				$(this).vibrate(vibrate_conf).addClass("disabled");
			}
		});

		past_link[number] = $('<a title="d" class="past_link number_link field field-name-field-exams-term-ref field-type-taxonomy-term-reference field-label-hidden clearfix">zurück</a>');
		past_link[number].click(function (evt) {
			past = $(this).parents(".views-row").prevAll(':not(.'+(pos_neg ? "" : "dis")+'liked,.doppelt):first');
			if (past.length>0) {
				past_number = $(past).find('div:first').attr('id').split('-')[1];
				$(number_link[past_number]).click();
			}
			else
			{
				
				$(this).vibrate(vibrate_conf).addClass("disabled");
			}
		});


		 foll_link[number] = $('<a title="f" class="foll_link number_link field field-name-field-exams-term-ref field-type-taxonomy-term-reference field-label-hidden clearfix">weiter</a>');
		 foll_link[number].click(function (evt) {
			foll = $(this).parents(".views-row").nextAll(':not(.'+(pos_neg ? "" : "dis")+'liked,.doppelt):first');
			if (foll.length>0) {
				foll_number = $(foll).find('div:first').attr('id').split('-')[1];
				$(number_link[foll_number]).click();
			}
			else
			{
				
				$(this).vibrate(vibrate_conf).addClass("disabled");
			}
		});
		
		answer_comments_link[number] = $('<a title="space" class="answer_comments_link number_link field field-name-field-exams-term-ref field-type-taxonomy-term-reference field-label-hidden clearfix"> A&K</a>').click(function (evt) {
			target = $(this).parents('.views-row');

			if (target.find('.answer').is(':hidden') || target.find('.comment-wrapper').is(':hidden')) {
				target.find('.show-answer a').text(target.find('.show-answer a').text().replace('einblenden', 'ausblenden'));
				target.find('.answer').show('slide');
				target.find('.comment-wrapper').show('slide');
			} else {
				target.find('.answer').hide('slide');
				target.find('.show-answer a').text(target.find('.show-answer a').text().replace('ausblenden', 'einblenden'));
				target.find('.comment-wrapper').hide('slide');
			}
			evt.preventDefault();
		});

		words = $(this).find('.query').text().replace(/ä/ig,"a").replace(/ö/ig,"o").replace(/ü/ig,"u").replace(/\w*ß\w*/, '').replace(/\s+/g, ' ').trim().split(/\W+/).sort(function(a,b){return b.length-a.length}).splice(0,3).join(' ').substring(0,128);
		keywords[number] = $('<a class="keywords number_link field field-name-field-exams-term-ref field-type-taxonomy-term-reference field-label-hidden clearfix" target="_blank"> keywords</a>').attr('href', 'http://www.nextdoc.at/suche/?type[]=quiz_question&s='+words);
		
		$(this).find('.quiz-category')
		.append(number_link[number])
		.append($('<a class="number_link field field-name-field-exams-term-ref field-type-taxonomy-term-reference field-label-hidden clearfix" href="http://www.nextdoc.at/node/'+number+'" target="_blank">Kommentarseite</a>'))
		.append(prev_link[number])
		.append(next_link[number])
		.append(past_link[number])
		.append(foll_link[number])
		.append(answer_comments_link[number])
		.append(keywords[number]);
		
		$(this).find('.content-social-links')
		.prepend(high_link[number])
		.prepend(grey_link[number]);

		
		// Script Kommentare werden entfernt solange dabei die seite verlassen wird!
		$(this).find('form').remove();
		
		text = $(this).find('.query').text().trim().replace(/[^A-Za-z0-9]/g, '').substring(0,60);
		////console.log(text);
		
		post_jonathan = jonathan[text];
		////console.log(post_jonathan);
		
		if(typeof post_jonathan != "undefined"){
			post_jonathan += '<p><small>(Jonathan 2011)</small></p>';
			$(this).find('.comment-wrapper').append('<div typeof="sioc:Post sioct:Comment" about="/comment/867100#comment-867100" class="comment comment-new comment-by-viewer even even clearfix content"><div class="avatar-wrapper"><a ><img width="55" height="55" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRrueuUISfG2qyCTGLfAlR-tbjnNJn-qucjlx5jVKAgVUgjLrHg" typeof="foaf:Image" class="avatar"></a><a ><span class="avatar-name"><strong>Jonathan</strong><br>Script</span></a></div>'+post_jonathan+'</div>');
			if($(this).find('.comments-number').length==0){
				$(this).find('.quiz-category').append('<span class="comments-number"><a>Kommentare: 0</a></span>');
			}
			if($(this).find('.plusone').length==0){
				$(this).find('.comments-number a').append('<small class="plusone">0</small>');
			}
			$(this).find('.plusone').text('+'+($(this).find('.plusone').text()*1+1));
		} else {
			console.log('not found in "jonathan"');
		}
	   
	   

		$(this).find('.comments-number a, .button-comment a').removeAttr('onclick').click(function(event){
			$(this).parents('.view-quizes .views-row').find('.comment-wrapper').toggle('vslide');
			event.preventDefault();
	   });
	  
		showtheanswer = $(this).find('.show-answer a');
		showtheanswer.before(showtheanswer.clone());
		showtheanswer.remove();
		
	  $(this).find('.show-answer a').click(function(event){
			$(this).parents('.view-quizes .views-row').find('.answer').toggle('slide');
			$(this).text($(this).text().replace('einblenden', 'XXX').replace('ausblenden', 'einblenden').replace('XXX', 'ausblenden'));
			event.preventDefault();
	   });

	   
		//text = $(this).find('.query').text().trim().replace(/[^A-Za-z0-9]/g, '').substring(0,60);
		post_ausgearbeitet = ausgearbeitet[text];
		if(typeof post_ausgearbeitet != "undefined"){
			////console.log(post_ausgearbeitet);
			post_ausgearbeitet += '<p><small>(MV, GL, CM, GA, JH, IE, IEy, WH, SP, HR 2007)</small></p>';
			$(this).find('.comment-wrapper').append('<div typeof="sioc:Post sioct:Comment" about="/comment/867100#comment-867100" class="comment comment-new comment-by-viewer even even clearfix content"><div class="avatar-wrapper"><a ><img width="55" height="55" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRrueuUISfG2qyCTGLfAlR-tbjnNJn-qucjlx5jVKAgVUgjLrHg" typeof="foaf:Image" class="avatar"></a><a ><span class="avatar-name"><strong>MV et al.</strong><br>Script</span></a></div>'+post_ausgearbeitet+'</div>');
			if($(this).find('.comments-number').length==0){
				$(this).find('.quiz-category').append('<span class="comments-number"><a>Kommentare: 0</a></span>');
			}
			if($(this).find('.plusone').length==0){
				$(this).find('.comments-number a').append('<small class="plusone">0</small>');
			}
			$(this).find('.plusone').text('+'+($(this).find('.plusone').text()*1+1));
		} else {
			console.log('not found in "ausgearbeitet"');
		}
	});
	
	
		$('body').keydown(function (evt) {
		if($(':focus').length==0&&!evt.ctrlKey&&!evt.altKey){
			////console.log(evt.keyCode);
		
		// Um herauszufinden, welche Taste welchen keycode hat:
		// http://www.mediaevent.de/javascript/Extras-Javascript-Keycodes.html
		/* if (evt.keyCode == "72") { // h
			$(answer_link[active]).click();
						evt.preventDefault();
		} else if (evt.keyCode == "85") { // u
			$(comments_link[active]).click();
						evt.preventDefault();
		} else*/ if (evt.keyCode == "163") { // #
			$(grey_link[active]).click();
						evt.preventDefault();
		} else if (evt.keyCode == "13") { // enter
			$(high_link[active]).click();
						evt.preventDefault();
		} else if (evt.keyCode == "32") { //space
			$(answer_comments_link[active]).click();
						evt.preventDefault();
		} else if (evt.keyCode == "65" || evt.keyCode == "37") { // a ← 
			$(prev_link[active]).click();
						evt.preventDefault();
		} else if (evt.keyCode == "83" || evt.keyCode == "39") { // s →
			$(next_link[active]).click();
						evt.preventDefault();
		} else if (evt.keyCode == "68") { // d
			$(past_link[active]).click();
						evt.preventDefault();
		} else if (evt.keyCode == "70") { // f
			$(foll_link[active]).click();
						evt.preventDefault();
		}
		}
	});
	
	if (document.location.hash == "") {
		if ($('.view-quizes .views-row:not(.liked):first').length > 0) {
			// gehe zur ersten unbeantworteten Frage
			active = $('.view-quizes .views-row:not(.liked):first').find('div:first').attr('id').split('-')[1];
		} else {
			// gehe zum letzten element
			active = $('.view-quizes .views-row:last').find('div:first').attr('id').split('-')[1];
		}
	} else {
		// gehe zum Element, welches über die URL angepeilt wurde
		active = document.location.hash.substring(1);
	}
	if( number_link[active].length ){
		number_link[active].click();
	}
   
   

   }
   else if(document.location.hostname == "notepad.cc"){
			////console.log('questions: ' + $.toJSON(questions));
			
			////console.log($('#contents').val().split('\n\n').reverse()[0], $('#contents').val().split('\n\n').reverse()[0].split(' = ')[0].trim());
			
			online_date = $('#contents').val().split('\n\n').reverse()[0].split(' = ')[0].trim();
			online_date = (online_date == '' ? new Date(0) : new Date(online_date) );
			////console.log(online_date, offline_date);
			
			if(offline_date > online_date){
				$('#contents').val($('#contents').val() + '\n\n' + offline_date + ' = ' + $.toJSON(questions));
				alert('mindestens eine eingabe im Textfeld machen, damit der Text gespeichert wird.');
			}
			else {
				alert('letzte version ist bereits gesichert');
			}
			
			$('body').keydown(function (evt) {
		if(evt.altKey && evt.keyCode == "74"){ // j
			   $('#laden').click();
		}});
			
			$('#controls').prepend($('<input id="laden" type="button" value="Markierten Text laden">').click(function(evt){
				load = $('#contents').val().substring($('#contents')[0].selectionStart, $('#contents')[0].selectionEnd).split(' = ').reverse()[0];
				offline_date = $('#contents').val().substring($('#contents')[0].selectionStart, $('#contents')[0].selectionEnd).split(' = ').reverse()[1];
				load_this = $.parseJSON(load);
				if(typeof load_this == 'object'){
					questions = $.toJSON(load_this);
					GM_setValue('questions', questions+'');
					GM_setValue('offline_date', offline_date+'');
					
					alert('geladen');
					////console.log(questions);
				}
				evt.preventDefault();
			}));
	}
	else {
		text = $('.query').text().trim().replace(/[^A-Za-z0-9]/g, '').substring(0,60);
		////console.log(text);
		
		post_jonathan = jonathan[text];
		//console.log(post_jonathan);
		
		if(typeof post_jonathan != "undefined"){
			post_jonathan += '<p><small>(Jonathan 2011)</small></p>';
			$('.quiz-category').append($('<a class="comments-number" style="margin-right:1.5em;">Jonathan</a>').click(function(){
				$('#cke_contents_edit-comment-body-und-0-value iframe').contents().find('body').html(post_jonathan);
			}));
	   } else {
			////console.log('not found in "jonathan"');
	   }
	   
		//text = $('.query').text().trim().replace(/[^A-Za-z0-9]/g, '').substring(0,60);
		post_ausgearbeitet = ausgearbeitet[text];
		//console.log(post_ausgearbeitet);
		
		if(typeof post_ausgearbeitet != "undefined"){
			post_ausgearbeitet += '<p><small>(MV, GL, CM, GA, JH, IE, IEy, WH, SP, HR 2007)</small></p>';
			$('.quiz-category').append($('<a class="comments-number" style="margin-right:1.5em;">MV et al.</a>').click(function(){
				$('#cke_contents_edit-comment-body-und-0-value iframe').contents().find('body').html(post_ausgearbeitet);
			}));
		} else {
			console.log('not found in "ausgearbeitet"');
		}	
	}
}