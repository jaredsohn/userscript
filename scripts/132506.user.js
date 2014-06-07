// ==UserScript==
// @name           Google Translator Portuguese Mod
// @namespace      erikspen
// @description    Translates selected text into a tooltip with other websites available
// @include        http://*
// @include        https://*
// @include        file:///*
// @source         http://userscripts.org/scripts/show/132506
// @version        2.1
// ==/UserScript==
//Based on the script https://userscripts.org/scripts/show/36898 and Pier's Mod
//Many thanks to the original authors

const HREF_NO = 'javascript:void(0)';
var imgLookup, txtSel, currentURL, languagesGoogle, opentab=0;
var results_history=[];
var results_history_idx = -1;
var initialized = false;

//setup events
document.addEventListener('mouseup', showLookupIcon, false);
document.addEventListener('mousedown', mousedownCleaning, false);

//parsing of url's similar to GoldenDic's usage of GDWORD & GDISO1 (RFC2396) w/ additional GDLANG1 ("from" language) and GDLANG2 ("to" language)
//to allow swapping between the source/target. Also specified is the default substitution for the SPACE character in the query string.
var websites = [
		{name:'Google', ref:'Google|#|http://translate.google.com.br/translate_t?text=GDWORD&langpair=GDLNG1|GDLNG2|#|pt|#|en|#|+',
		 icon:'data:image/gif;base64,R0lGODlhFAAUANUAANbW1p+fn56enpqamtPT08/Pz7a2tqysrJmZmbi4uJycnNjY2Kqqqpubm8PDw9ra2tHR0dvb26mpqcHBwcDAwMbGxrm5ub+/v8XFxc3NzcfHx52dna2trcTExMzMzNnZ2d/f3+Dg4LKystfX16CgoJiYmOHh4QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAUABQAAAZrQJNwSCwaj8ikcslUehglxAHSNJSu2MvSURpQFoDEtaAklTBEMSf5iIKIgJIi+Sk1QsRFVykoZYgTJRJKFiUBZCYaAyUVSQABWBsNVyKOkAIGClcBHZYlAgRCIwBLB5+hTUIRDKiprq+wSkEAOw==',
		 elefilter:'.//span[@class="short_text"]', //will find the first instance of specified
		 wrapper:'div',//results of elefilter are placed in this wrapper
		 elehidefilter:'',//separate multiple hide filters with #20 and replace spaces with %20
		 no_result:'',//element to show when elefilter fails (optional)
		 related:''},//related websites (parsed with spaces)

		{name:'Examples', ref:'Glosbe|#|http://en.glosbe.com/GDLNG1/GDLNG2/GDWORD|#|pt|#|en|#|+',
		 icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTFDRjVBNTUwOTczMTFFMTlDNkJDQzI1NTU4RTlEMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTFDRjVBNTYwOTczMTFFMTlDNkJDQzI1NTU4RTlEMTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MUNGNUE1MzA5NzMxMUUxOUM2QkNDMjU1NThFOUQxOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MUNGNUE1NDA5NzMxMUUxOUM2QkNDMjU1NThFOUQxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PiRpPLwAAAKBSURBVHjajFNNSBtBFP5mdjfNWjWKKP6VkkIVjD1VLIFKYuil9CI0pJfkYInQmGrBU6EXrYV6MBbxJO3JHrUFEXq110JPvVgo9kcoTUSSJtlkk93sbmdGklorpR/7eMx7b773M28JGDo7O5+qqvqwVqvhJJgNbrcbuVwOp3F0dHTPMIx1wg9erzcTDoe76oGO4wg5C9yuaRonwO7uLqHcSAih1WpVOLiUSiWUy2VEo1GhT4qu63BsW2iXy3VRZvebbdtWK5UKIpEIent7BcHa2hrGx8extLR0ZiU8IUMfJxjp6OggnODZygpGR0cRn5qCREVxSKVS2Nvbg2kYCDLCTCaDB7OzdYIrnOCyx+NRisUiEtPT8Pv9UBQFleMAzM/PY2FhAYODg8JXBxsgV5d4mn5ZViRNKyEUCuH+zAwsy0L1OADfDg7Qw9ra399HMBhEgSXiQiWJuwc4wUBLSzPV9TJ2dnbwZHGRDwdN7An5QF9tbeHlxgYmJycxzSpMLS9DYwS+oSFks9kJ3oIqMTY+uGQyie7u7kaZPp/vj8HxCjji8TgSiYRojRP01MwaioWCcKbTafwLw8PDiMVi2NzcxOrqqrB9jEVjDqX0vyUQCAjNKneILMvv2RZe5Uuyvb3dyHR9bAye1lbxIo3NFN/vDeWDJW1tbXP5fD7JF7LukGXaQmSp3ayY39nROt2Gck7psy2rSIn0qHHpRsTfbBq1x6Zh3pZd8h31vKtw+mLxp/7csuwvapN77u3rd4ci2Qm/V5LoLcNx2sua/oLJXwMkBF2UShdYNyPs+KZBEJgYkVnWu7nD/I9sunDz04evn896gVD4Wj/7b9Ydx47VCX4JMACz7y1KPVizUQAAAABJRU5ErkJggg==',
		 title:'Examples of Human-Translated Sentences',
		 elefilter:'.//table[@class="tranlastionMemory"]',
		 wrapper:'table',
		 elehidefilter:'.//div[@class="source"]',
		 no_result:'.//nav',
		 related:'Linguee|#|http://www.linguee.com.br/portugues-ingles/search?source=auto&query=GDISO1'+
					'|#|pt|#|en|#|%20'+//substitution for GDLNG1/2 (portuguese), and GDLNG1/2 (english), and sub for the space character in the URL
					'|#|table|#|.//table[@class="result_table%20withquestions"]'+//wrapper, and elefilter
					'|#|.//td[@class="col_rating"]#20.//div[@class="source_url"]#20.//div[@class="source_url_spacer"]'+//elehidefilter
					'|#|.//no[@id="more"] '+//no_result
				'LingueePhrases|#|http://www.linguee.com.br/portugues-ingles/search?source=auto&query=GDISO1'+
					'|#|pt|#|en|#|%20'+
					'|#|table|#|.//div[@id="dictExamples"]'+
					'|#|.//td[@class="col_rating"]#20.//div[@class="source_url"]#20.//div[@class="source_url_spacer"]'+
					'|#|.//no[@id="more"] '+
				'GlosbePhrases|#|http://en.glosbe.com/GDLNG1/GDLNG2/GDWORD'+
					'|#|pt|#|en|#|%20'+
					'|#|div|#|.//div[@class="similarPhrasesContainer"]'+
					'|#|.//no[@id="more"]'+
					'|#|.//nav '+
				'babLa|#|http://pt.bab.la/dicionario/GDLNG1-GDLNG2/GDWORD'+
					'|#|portugues|#|ingles|#|-'+
					'|#|table|#|.//section[@class="section-block"][1]'+
					'|#|.//a[@class="tooltipLink"]#20.//ul[@class="nav%20result-entry-menu%20pull-right"]'+
					'|#|.//div[@class="babL"] '+
				'bablaPhrases|#|http://pt.bab.la/dicionario/GDLNG1-GDLNG2/GDWORD'+
					'|#|portugues|#|ingles|#|-'+
					'|#|table|#|.//section[@class="section-block"][3]'+
					'|#|.//a[@class="tooltipLink"]#20.//ul[@class="nav%20result-entry-menu%20pull-right"]'+
					'|#|.//section[@class="section-block"][2] '+
				'Tatoeba|#|http://tatoeba.org/eng/sentences/search?query=GDWORD&from=GDLNG1&to=GDLNG2'+
					'|#|por|#|eng|#|+'+
					'|#|table|#|.//div[@id="main_content"]'+
					'|#|.//div[@class="addTranslations"]#20.//ul[@class="menu"] '+
				//Working, but rarely gives good results
				//'MyMemory|#|http://mymemory.translated.net/s.php?q=GDWORD&sl=GDLNG1&tl=GDLNG2&sj=all'+
				//	'|#|pt-PT|#|en-GB|#|+'+
				//	'|#|table|#|.//span[@id="results2"][1]'+
				//	'|#|.//td[@class="dtl"]#20.//a[@class="ice"]#20.//span[@class="source"] '+
				'COMPARA|#|http://www.linguateca.pt/COMPARA/processa_pesquisa.php?simples=sim&concordancia=on&ps_palavra_port=%22GDISO1%22&accao=Pesquisar+de+GDLNG1+para+GDLNG2&ps_palavra_ing=%22GDISO1%22'+
					'|#|portugu%EAs|#|ingl%EAs|#|%22+%22'+
					'|#|table|#|.//table[@class="datatable"]'+
					'|#|.//td[@class="textdatatdsearch"] '+
				'FrazeIt|#|http://fraze.it/n_search.jsp?q=GDWORD&l=GDLNG1&t=0&sugg=off'+
					'|#|9|#||#|+'+
					'|#|div|#|.//div[@class="results"][1]'+
					'|#|.//div[@class="author"] '+
				'Informal_Ex|#|http://www.dicionarioinformal.com.br/exemplos/GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|table|#|.//td[@class="conteudo"]//table'+
					'|#|.//div[@class="votacao_definicao"]#20.//span[@class="subDefinicao"]#20.//p[@class="subTitulo"]#20.//div[@class="compartilhar"]#20.//div[@class="subTitulo"] '+
				'Google_Search_All|#|https://www.google.com.br/search?q=site%3Awww.linguee.com.br%2Fportugues-ingles+OR+site%3Aen.glosbe.com%2Fpt%2Fen+OR+site%3Apt.bab.la%2Fdicionario%2Fportugues-ingles+OR+site%3Atatoeba.org+OR+site%3Awww.wordreference.com%2Fpten+OR+site%3Amichaelis.uol.com.br%2Fmoderno%2Fingles+OR+site%3Awww.infopedia.pt%2Fportugues-ingles+OR+site%3Awww.dicionarioinformal.com.br+OR+site%3Awww.infopedia.pt%2Flingua-portuguesa+OR+site%3Awww.englishexperts.com.br%2Fforum%2Fcomo+OR+site%3Awww.priberam.pt+OR+site%3Awww.dicio.com.br+OR+site%3Awww.expressoesidiomaticas.com.br%2Fidiomaticas%2Flinguas_2_ingles+OR+site%3Awww.woxikon.com%2Fenglish-portuguese+OR+site%3Awww.estraviz.org+OR+site%3Ahttp%3A%2F%2Fwww.webdicionario.com+OR+site%3Adicionarioweb.com.br+OR+site%3Apt.wikipedia.org%2Fwiki+OR+site%3Aaulete.uol.com.br%2Fsite.php%3Fmdl%3Daulete_digital+GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@id="ires"]'+
					'|#|.//div[@class="esc%20slp"]#20.//button'},

		{name:'Translations', ref:'WordRef|#|http://www.wordreference.com/GDLNG1GDLNG2/GDWORD|#|pt|#|en|#|%20',
		 icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAPCAYAAADtc08vAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTFDRjVBNTEwOTczMTFFMTlDNkJDQzI1NTU4RTlEMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTFDRjVBNTIwOTczMTFFMTlDNkJDQzI1NTU4RTlEMTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5MUNGNUE0RjA5NzMxMUUxOUM2QkNDMjU1NThFOUQxOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5MUNGNUE1MDA5NzMxMUUxOUM2QkNDMjU1NThFOUQxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhURfS4AAAJsSURBVHjabFJNTBNBGH0zu+3WNoU0CAsISySoB4KJF8DEhohnzx64KAeuJk1UDJLGRg96MMjFv5iQSKKeTCQx8eAFAw1VTpyAEgQDUqAYKC273Z9xZktrm/IlszPf7Jv3vfneEMYYREQikVOyTAd8PuUuA1MpIdtHR/oDQoit+JSHjuOokkRTZt56qij+j9FoVBfniCAYGR0ep4QOhsN9Um/PZV8wGEQmk8HM7Hcjv7xC+2/e8gQCAWRzWczP/zTi8RnLsu23oyPR2+i7cGVt+P4dZts2K4ZYczA7PMywL/1X2WpyiaVSKbazs8NyuRyzLIs9ehxj4izleI3LBKUUxRCq8nkDvzfWsd3ShNWJCfArQNd1pNNpFyvLksBp7ilBUB6CoNAbBqunG7vvJrE6NlaBkWW5MIuPJEnVBA7jVfnsU9Dy/Bl+3RgA9ftxZnCwgoCWJyKEVJegQOXmXk1Dy9AQkrEYzJUVlBd1CSiVquQz5lSQhsJhwLaRm5s7ScFJBLz68RsR1/Gqqrs+XFysUFDVA7F2hxyCYeg413EenZ1dkE0LP/j/3DFBRRNFwr3HcnIJiUQCJrewtVVDd3cvLnZdQjw+i83NDYgyewsL3OJ8yblS916/eQG1sQHtHW0g3OeD/QN8nvrkAmtDNahvqMPf+nrovDfvP0y6BUsEmtaKsx3t8Ho9pavU1tagubnJBRaH/9U4nxnsuhDS23v/Cb6+nObfaXcjbxrYSq9nZMlDm063BcTen921rGWbTmOdFvR6lIo3Q/h73uIdV8v2DAJyj0u/5jDnumsVoVMc841784SnJQaOSf0TYACzdTy9abesMQAAAABJRU5ErkJggg==',
		 title:'Portuguese-English Dictionaries',
		 elefilter:'.//div[@id="articleWRD"]',
		 wrapper:'table',
		 elehidefilter:'.//a[@title="Report%20an%20error"] .//p[@class="wrcopyright"]',
		 no_result:'.//li[@id="link"]',
		 related:'Michaelis|#|http://michaelis.uol.com.br/moderno/ingles/index.php?lingua=GDLNG1-GDLNG2&palavra=GDISO1'+
					'|#|portugues|#|ingles|#|%20'+
					'|#|div|#|.//div[@id="tdcontents"][1]'+
					'|#|.//no[@id=more] '+
				'Infopedia|#|http://www.infopedia.pt/GDLNG1-GDLNG2/GDWORD'+
					'|#|portugues|#|ingles|#|%20'+
					'|#|div|#|.//span[@class="dolEntradaVverbete"][1]'+
					'|#|.//a[@class="LinkVerMais"]'+
					'|#|.//div[@id="divartigo"] '+
				'PONS|#|http://en.pons.eu/dict/search/results/?q=GDWORD&l=enpt&in=&lf=GDLANG1'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@class="results"][1]'+
					'|#|.//ul[@class="options"]#20.//td//ul#20.//div[@class="acapela"] '+
				'Reverso|#|http://dictionary.reverso.net/GDLNG1-GDLNG2/GDWORD'+
					'|#|portuguese|#|english|#|+'+
					'|#|div|#|.//div[@class="ldcomIN"][1]'+
					'|#|.//span[@class="nbsp1"]'+
					'|#|.//div[@class="alink2"] '+
				//The following three are working, but rarely give good results
				//'SensAgent|#|http://tradutor.sensagent.com/GDWORD/GDLNG1-GDLNG2/'+
				//	'|#|pt|#|en|#|%20'+
				//	'|#|div|#|.//div[@class="divTranslations"]'+
				//	'|#|.//no[@id="more"]'+
				//	'|#|.//div[@class="divNotFound"] '+
				//'LangToLang|#|http://www.langtolang.com/?selectFrom=GDLNG1&selectTo=GDLNG2&txtLang=GDWORD'+
				//	'|#|portuguese_brazil|#|english|#|+'+
				//	'|#|table|#|.//div[@id="mainContent"]//table[last()-3]'+
				//	'|#|.//no[@id="more"] '+//'|#|.//div[@id="userSuggestion"]#20.//td[@id="imagesForWordPanel"] '+
				//'Woxikon|#|http://www.woxikon.com/english-portuguese/GDWORD.php'+
				//	'|#|pt|#|en|#|%20'+
				//	'|#|table|#|.//table[@class="translationsTable"][1]'+
				//	'|#|.//span[@style="float:%20right;"]'+
				//	'|#|.//div[@class="container%20default"] '+
				'EnglishExperts|#|https://www.google.com.br/search?q=site%3Awww.englishexperts.com.br%2Fforum%2Fcomo+GDWORD&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:en-US:official&client=firefox-a'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@id="ires"]'+
					'|#|.//div[@class="esc%20slp"]#20.//button '+
				'Book:Dic.of.Informal.BrPt|#|http://books.google.com.br/books?ei=aMCuT_7WB42EtgfZtbGICQ&hl=pt-BR&id=__n8tBKIO-IC&dq=portuguese+idioms&q=GDWORD#v=snippet&q=GDWORD&f=false'+
					'|#|pt|#|en|#|+'},
	 
		{name:'Portuguese', ref:'Aulete|#|http://aulete.uol.com.br/site.php?mdl=aulete_digital&op=loadVerbete&pesquisa=1&palavra=GDISO1|#|pt|#|en|#|+',
		 icon:'data:image/png;base64,R0lGODlhFAAMAOYAACqhSkRerhubSvjsFgaRThOPRhcytCmZSACKUGrDLazTIhI4xR+eQxOQThyWQRqVPhSaQ+33BiyeRPT5BCWeRh6aRQGOTTpOmqXSISKcRSSeSBOYSiCeQiafQwqORSCdSBiQTR2YQgSOTgqWSyKbRR2XPgGOSiGcRCaXSf//AT6lQIKFhh6iOcjpBjxk0SGNQg+ZSE9xxmh8d47JMBmbPQGRUMHfGyg+uIjPI0RgnSCaSC9ez3p/hACKTaiymBiXRxiSPUFjqHfJKRY30iScQx2bUSaZR9r3BP/3BHTKHmqDslaI1iRItjldtgCURyeTRAiRRJKon/fsBcfNMfLjMWG6Oo64u//0Eeb0CheSQOv1C4CkrxqZRuLgJEusOoDQH1ezNe/4B5PJJV9wkSidSy2bTClOzTNRwN7UKqfYGwCJS+TNKYuQZ9HSKbLdFL7dGzmmPu3nGSaiPMHjDjJSqFm6Kz9VpsjzBvr+BN/xESGcRiOcRiOeRCOfRx2XQP//ACH5BAAAAAAALAAAAAAUAAwAAAfogEAVfoSEJQUeHgUlhX4lIQ4hABoUFBoCNRAJQiwiG5SgGg8aJ3wVIiJ1d1cDeUkjFlwZs3oPFEQjanBpUmwXFzxoc2AIBBUZJw4CJjpiWH9RLjFNBgZdEwoSCDBGL0UzWil/bWZBSltWOzJ/fxEKHSFZHxgR7FNDdHYBQUs+fykTbACA8GAZGQxhUoxZwOTMghtU8LxRYWEDCVs6CPTw4gYJmxx2VqxpUcWCCAEnLmogsYeLBSgJjgyIE+ELBAQ/MhDZk+FBHwZAOcCwQCMJDjlORnAACvTEkzIHokZFAaIBCBAopGoNBAA7',
		 title:'Portuguese Dictionaries',
		 elefilter:'.//div[@id="definicao_verbete_homologado"]',
		 wrapper:'table',
		 elehidefilter:'.//textarea[@id="copy"] .//div[@style="float:%20right;"] .//div[@style="float:right;"]',
		 no_result:'',
		 related:'Infopedia|#|http://www.infopedia.pt/lingua-portuguesa/GDWORD'+
					'|#|pt|#|en|#|%20'+
					'|#|div|#|.//div[@class="dolDivisaoCatgram"][1]'+
					'|#|.//no[@id="more"]'+
					'|#|.//div[@id="divartigo"] '+
				'Informal|#|http://www.dicionarioinformal.com.br/GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//td[@class="conteudo"][1]'+
					'|#|.//div[@class="votacao_definicao"]#20.//span[@class="subDefinicao"]#20.//p[@class="subTitulo"]#20.//div[@class="compartilhar"]#20.//div[@class="subTitulo"] '+
				'Priberam|#|http://www.priberam.pt/DLPO/default.aspx?pal=GDISO1'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//def'+
					'|#|.//no[@id="more"] '+
				'Michaelis|#|http://michaelis.uol.com.br/moderno/portugues/index.php?lingua=portugues-portugues&palavra=GDISO1'+
					'|#|portugues|#|ingles|#|%20'+
					'|#|div|#|.//div[@id="tdcontents"][1]'+
					'|#|.//no[@id=more] '+
				'Dicio|#|http://www.dicio.com.br/GDISO1'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//p[@id="significado"][1]'+
					'|#|.//no[@id="more"]'+
					'|#|.//p[@class="nao_encontrada"] '+
				'DicWeb|#|http://www.dicionarioweb.com.br/GDWORD.html'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@class="verbete"][1]'+
					'|#|.//no[@id="more"] '+
				'WebDic|#|http://www.webdicionario.com/GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@class="list"][1]'+
					'|#|.//div[@class="info%20rounded-2"] '+
				'Estravis|#|http://www.estraviz.org/GDWORD'+
					'|#|pt|#|en|#|_'+
					'|#|div|#|.//div[@id="resultado"][1]'+
					'|#|.//span[@class="etimologia"] '+
				'DicExpressoes|#|http://www.dicionariodeexpressoes.com.br/pesquisa.do?textoBusca=GDISO1'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@class="post_body_single"][1]'+
					'|#|.//no[@id="more"] '+
				'Forvo_Pronunciation|#|http://pt.forvo.com/word/GDWORD/#pt'+
					'|#|pt|#|en|#|_'+
					'|#|ul|#|.//div[@class="mainword"]//div//div//ul[1]'+
					'|#|.//div[@class="second_line%20clearfix"]#20.//li[@class="could"]#20.//span[@class="lang_xx"]'+
					'|#|.//div[@class="error"]'},

		{name:'English', ref:'MacMillan|#|http://www.macmillandictionary.com/search/british/direct/?q=GDWORD|#|pt|#|en|#|-',
		 icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAflJREFUeNpinDRzn5qN3uFDt16+YWBg+Pv339+KGN0rbVP+//2rW5tf0Hfy/2+mr99+yKpyOl3Ydt8njEWIn8f9zj639NC7j78eP//8739GVUUhNUNuhl8//ysKeZrJ/v7z10Zb2PTQTIY1XZO2Xmfad+f7XgkXxuUrVB6cjPVXef78JyMjA8PFuwyX7gAZj97+T2e9o3d4BWNp84K1NzubTjAB3fH0+fv6N3qP/ir9bW6ozNQCijB8/8zw/TuQ7r4/ndvN5mZgkpPXiis3Pv34+ZPh5t23//79Rwehof/9/NDEgMrOXHvJcrllgpoRN8PFOwy/fzP8+gUlgZI/f/5xcPj/69e/37//AUX+/mXRkN555gsOG2xt/5hZQMwF4r9///75++f3nz8nr75gSms82jfvQnT6zqvXPjC8e/srJQHo9P9fvwNtAHmG4f8zZ6dDc3bIyM2LTNlsbtfM9OPHH3FhtqUz3eXX9H+cOy9ZMB2o6t/Pn0DHMPz/b+2wXGTvPlPGFxdcD+mZyjP8+8MUE6sa7a/xo6Pykn1s4zdzIZ6///8zMGpKM2pKAB0jqy4UE7/msKat6Jw5mafrsxNtWZ6/fjvNLW29qv25pQd///n+5+/fxDDVbcc//P/zx/36m5Ub9zL8+7t66yEROcHK7q5bldMBAgwADcRBCuVLfoEAAAAASUVORK5CYII=',
		 title:'English Dictionaries',
		 elefilter:'.//div[@class="HOMOGRAPH"]',
		 wrapper:'div',
		 elehidefilter:'.//div[@id="helplinks-box"] .//div[@id="relatedentries"] .//div[@class="HEAD-INFO2"] .//div[@class="headbar"] .//div[@class="thessnippet"]',
		 no_result:'.//div[@id="contentpanel"]',
		 related://'Longman|#|http://www.ldoceonline.com/dictionary/GDWORD'+
					//'|#|pt|#|en|#|%20'+
					//'|#|div|#|.//div[@class="Entry"][1]'+
					//'|#|.//table[@id="headword"]#20.//table[@class="toolbar"]#20.//div[@class="dictionary-results-title"]'+
					//'|#|.//div[@class="contentText"] '+
				'TheFreeDict|#|http://www.thefreedictionary.com/GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@id="MainTxt"][1]'+
					'|#|.//no[@id="more"]'+
					'|#|.//td[@id="TDTotalBrowser"] '+
				'TheFreeDict-Idioms|#|http://idioms.thefreedictionary.com/GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@id="MainTxt"][1]'+
					'|#|.//no[@id="more"]'+
					'|#|.//td[@id="TDTotalBrowser"] '+
				'Oxford|#|http://oxforddictionaries.com/definition/GDWORD?region=us&q=GDWORD'+ //will not always work!!!
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@id="mainContent"][1]'+
					'|#|.//no[@id="more"] '+
				'ozdic|#|http://www.ozdic.com/collocation-dictionary/GDWORD'+
					'|#|pt|#|en|#|%20'+
					'|#|div|#|.//div[@class="item"]'+
					'|#|.//no[@id="more"] '+
				'Webster|#|http://www.merriam-webster.com/dictionary/GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@class="KonaBody"][1]'+
					'|#|.//div[@class="franklin-promo"]'+
					'|#|.//div[@class="spelling-help"] '+
				'Dictionary.com|#|http://dictionary.reference.com/browse/GDWORD?s=t'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@class="luna-Ent"][1]'+
					'|#|.//div[@id="fcrds"]#20.//div[@class="spl_unshd"]'+
					'|#|.//div[@class="nomlr"] '+
				'CambridgeUS|#|http://dictionary.cambridge.org/search/american-english/direct/?q=GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|span|#|.//span[@class="sense-body"][1]'+
					'|#|.//no[@id="more"]'+
					'|#|.//div[@id="cdo-spellcheck-container"] '+
				'Dictionarist|#|http://www.dictionarist.com/english-portuguese/GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|table|#|.//table[@class="Header"]'+
					'|#|.//no[@id="more"] '+
				'Definr|#|http://definr.com/GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//div[@id="meaning"][1]'+
					'|#|.//no[@id="more"] '+
				'Hyper|#|http://www.hyperdictionary.com/search.aspx?define=GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|table|#|.//table//table//table[2]'+
					'|#|.//no[@id="more"] '+
				'Wordnik|#|http://www.wordnik.com/words/GDWORD'+
					'|#|pt|#|en|#|%20'+
					'|#|div|#|.//ol[@class="definitions"]'+
					'|#|.//no[@id="more"]'+
					'|#|.//div[@class="definitions%20empty%20module"] '+
				'UrbanDic|#|http://www.urbandictionary.com/define.php?term=GDWORD'+
					'|#|pt|#|en|#|+'+
					'|#|table|#|.//table[@id="entries"]'+
					'|#|.//td[@class="tools"]#20.//div[@class="greenery"]#20.//div[@class="zazzle_links"]'+
					'|#|.//div[@id="not_defined_yet"] '+
				'subzin|#|http://www.subzin.com/search.php?q=%22GDWORD%22'+
					'|#|pt|#|en|#|+'+
					'|#|div|#|.//ul//ul'+
					'|#|.//no[@id="more"] '+
				'ExpressoesIdiomaticas|#|http://www.expressoesidiomaticas.com.br/idiomaticas/linguas_2_ingles/GDWORD.htm'+
					'|#|pt|#|en|#|+'+
					'|#|table|#|.//table[@id="tbcFrases"][1]'+
					'|#|.//no[@id="more"] '+
				'Forvo_Pronunciation|#|http://pt.forvo.com/word/GDWORD/#en'+
					'|#|pt|#|en|#|_'+
					'|#|div|#|.//div[@class="mainword"]//div//div//ul[1]'+
					'|#|.//div[@class="second_line%20clearfix"]#20.//li[@class="could"]#20.//span[@class="lang_xx"]'+
					'|#|.//div[@class="error"]'},
		{name:'',
		 icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAArRJREFUeNqUlTtMWmEUx/8XrvKQR2qwPgY1LiTtYNoNBw0oxi6GurmoiSExSrqUTRdbmXwNJcakg6Nb66A4NhriggyN0cVGxZiYiGBFUEGQfuc0mLag3J6EcMl3vh//87xSIpFAPB5/dXl5OZnNZm35fF6F/zBJkqBWq78bjcaPFovlm3RycvLi7OwsmMvlnun1enagTzqdxt3dHT+XMyGC/NI1NTVvZKHuA8F0Oh3W1tawubkJk8mE/v5+NDY2MlSJSgHVXFxcTMoiTDspW1lZwfj4ODtUVlbC5XJBq9Xy70wmU1YpnQthL1WCzJ6rq6t8IGRjeXkZDQ0N8Hq9ODo6QlVVFYelIHRJpm+iV1RU8MXFxUU0NzdjYGAAu7u72Nvbg9/vR1NTE1KpVDmleSkcDscErHp7e5uqBavViuHhYYYVrKWlBQsLC5zT6+vrp4BxBt7f31dTUejfh4aGEAqFijwJSkpJ/RPQuKqQ0NvbW0oqh0qh/2sHBwcYGRnhnFIRH8vpX01M1ezu7sb8/HxJ6PHxMcbGxhCJRB4tVNFUXF1doaOjA3NzczAYDEUXDg8PH6CllJYcM4La7XZMT0+Dclsq/MHBQVas0WjKA8loxh0OR0ml9fX1cLvd3K+yLCsDFpR2dnZiZmbmAVpXV4eJiQlMTU1xIXd2driHFQELSin82dlZHkWfz4fR0VE+6+npQTAYfBhRRcCC0vb2du7D9fV1eDwebGxsoLe3l/MZi8WgUv1GyaJKshIojZ3NZkNrayu2trawtLSEaDSKQCCAtrY29PX1kY9aFlPyQ9BfK4He3Nywkq6uLjidTuzv7/M4ip3Ka06wopKY2bfn5+dfaAcqWaZ/GlWY2iaZTHKuzWbzO7m2tvaryJH79PT0vVgOz5WsqRJr66d4BXwWK+/TLwEGANWKQFrivMnIAAAAAElFTkSuQmCC',
		 title:'Flashcard Editor',
		 wrapper:'frame'}
//Longman search does not lead directly to results	 
	];
//TUTORIAL ON FILTERING ELEMENTS (XPATH SYNTAX):
//.//div[@class="hat"]   finds all items of type 'div' with the class name "hat"
//.//*[@class="foo"]'    all items with the class name "foo"
//.//*[@accesskey]'      finds any item with the accesskey attribute, regardless of its value
//.//img[contains(@src,"MZZZZZZZ")]'    images whose URL contains the string MZZZZZZZ
//.//img[@width="36"][@height="14"]'    images with width of 36 and height of 14
//.//p[@class="g"]//a'                  finds links contained in a paragraph whose class is g
//.//p[@class="block"][last()-1]		selects the next-to-last 'p' with class = "block"
//.//div[@class="hat"][1]   			finds the first matched item of type 'div' with the class name "hat"
////a[@target="_blank" and contains(@href, "maps.google.")]		combination of two filters using 'and'

function lookup(evt){//callback when mouse passes over tooltip icon

	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	var top = divLookup.style.top;
	var left = divLookup.style.left;

	//no text selected
	if(!txtSel || txtSel=="")
	{
		if(divDic = getId('divDic'))
			divDic.parentNode.removeChild(divDic);
		if(divLookup = getId('divLookup'))
			divLookup.parentNode.removeChild(divLookup);
		return;
	}
	
	//cleanup divs
	if(divDic = getId('divDic'))
	{
		divDic.parentNode.removeChild(divDic);
	}	
	divLookup.parentNode.removeChild(divLookup);
	
	//div container
	divDic = createElement('div', {id:'divDic', class:'divDic', style:'top:'+top+'; left:'+left+';'});
	divDic.addEventListener('mousedown', dragHandler, false);
	document.body.appendChild(divDic);
	//store query as attribute
	divDic.setAttribute('query', txtSel);
	divDic.setAttribute('fronttemp', getId('divDic').getAttribute('query'));
	divDic.setAttribute('backtemp', '');
	divDic.setAttribute('frontsave', '');
	divDic.setAttribute('backsave', '');
	
	var ul, li, sp, ta
	ul = divDic.appendChild(createElement('ul',{id:'sitelist', style:'list-style:none outside none;  padding:0pt 0px 0pt 0px; margin:3px 0px;'}));
	li = ul.appendChild(createElement('li',{class:'tab_gen'}));
	back_forward(li);
	
	li = ul.appendChild(createElement('li',{style:'display:inline; padding:0px; float:left; width:40%', class:'tab_gen'}));
	ta = li.appendChild(createElement('textarea',{id:'research', style:'float:left; width:100%; min-height:15px; height:17px; line-height:inherit; min-width:inherit; vertical-align:middle; cursor:default; word-wrap:break-word; padding:0px; margin:4px 0px; border-width:0px;'},null,divDic.getAttribute('query').toLowerCase()));
	ta.addEventListener('focus',function () { //highlight text upon focus
            getId('research').select();
	},false)
	
	//re-search using google
	li = ul.appendChild(createElement('li',{class:'tab_gen'}));
	a = li.appendChild(createElement('a', {title:'Google Translate', href:HREF_NO, class:'tab_a', style:'padding-left:5px;'}, null, ''));
	a.addEventListener('click',function () {
			getId('divDic').setAttribute('query', getId('research').value.replace(/\n.+/,''));
			internetLookup(0);
		},false)
	a.appendChild(createElement('img',{src:websites[0].icon, class:'tab_p0'}));
	
	//plus icon
	li = ul.appendChild(createElement('li',{class:'tab_gen'}));
	sp = li.appendChild(createElement('a', {title:'More Search Options', href:HREF_NO, class:'tab_a'}, 'click showsearchoptions false', ""));
	sp.appendChild(createElement('img',{class:'tab_p0', src:'data:image/gif;base64,R0lGODlhFAAUAPcAAISEhM7Ozu/v7////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ywAAAAAFAAUAAAIWgADCBxIsKBBAQgTKlyYUCDDhwsdQpwoceLDigsBAICIUaFGjgEgfrwY8uFIhhg1qly5sWFJhCxZKuyY8GTElxlbosTpUedNkT5n8rTokihJozuR3jTI1GBAAAA7'}));
	
	
	//options link
	li = ul.appendChild(createElement('li',{class:'tab_gen', style:'float:right; text-align:right; margin-right:2px;'}));
	sp = li.appendChild(createElement('a', {id:'optionsLink', title:'Options (see popout below)', href:HREF_NO, class:'tab_a'}, 'click options false', ""));
	sp.appendChild(createElement('img',{class:'tab_p0', src:'data:image/gif;base64,R0lGODlhFAAUANUAAN3d3dzc3Nvb29ra2tnZ2dfX19bW1tTU1NPT09LS0tDQ0MzMzMvLy8rKysnJycjIyMXFxcTExMLCwsDAwL29vbu7u7q6urm5ube3t7a2trS0tLOzs7KysrCwsK+vr6ysrKurq6qqqqmpqaioqKampqWlpaGhoZ+fn56enpubm5qampiYmJaWlpOTk5KSko6Ojo2NjYuLi4WFhYGBgXx8fHp6enh4eGpqamdnZ2VlZf///wAAAAAAAAAAAAAAAAAAACH5BAEHADoALAAAAAAUABQAAAbPQJ1wSCwaj8jkkLFaMZTCRkfIAgBYwk7j6Gg5ShhHIODAlLoO4ycCKEQ2hcImUgBEPsfTgWAgjPkEBydIHxQIAyY5OSYDCBR4RRIyFyMGJS5CLiUGIxcyEkQzAAkQAzZENgMQCQAzRDQTsQMyRDIDsRM0RBU2ISoKGZAfGQoqITYVRiwkEwYWTRYGEyRYRzMcDxQLVgsUDxyuRi4oAB4oLx4eLygeACiYRRo3KTUxKSAgKTE1KTcaRxtgCMEhQgQOITA2QNHBQRGHhRAjJgkCADs='}));
	
	//flashcard link
	var fnum = websites.length-1;
	li = ul.appendChild(createElement('li',{class:'tab_gen', style:'float:right; text-align:right; margin-right:2px;'}));
	sp = li.appendChild(createElement('a',{class:'tab_a', id:'label_'+fnum.toString(),title:websites[fnum].title},'click toggleTab false',""));
		sp.appendChild(createElement('img',{src:websites[fnum].icon, id:'label_'+fnum.toString(), class:'tab_p0'}));
		sp.innerHTML += websites[fnum].name;
	
	
	//tab categories (initially hidden and height = 1px)
	for(var i=1; i<websites.length-1; i++){
	    if (i==1){
	       li = ul.appendChild(createElement('li',{id:'tab_cat_'+i.toString(), class:'tab_li', style:'clear:left; visibility:hidden; height:1px;'}));
	    } else {
	       li = ul.appendChild(createElement('li',{id:'tab_cat_'+i.toString(), class:'tab_li', style:'visibility:hidden; height:1px;'}));
	    }
		sp = li.appendChild(createElement('a',{class:'tab_a', id:'label_'+i.toString(),title:websites[i].title},'click toggleTab false',""));
		sp.appendChild(createElement('img',{src:websites[i].icon, id:'label_'+i.toString(), class:'tab_pr5'}));
		sp.innerHTML += websites[i].name;
	}
	
	//results div container
	divDic.appendChild(createElement('div',{id:'categoryresults', style:'position:relative; padding:1px; margin:0px; width:inherit; display:block; clear:both;'},null,"")); //initially "empty"
	
	//initialize
	internetLookup(0); //initial google result
}

function internetLookup(idx,jdx){//Sequence: internetLookup->extractResult->blackBoxResults

	if(jdx==null){
		var ws_url = parseHREF(websites[idx].ref.split('|#|'),idx);
	} else {
		var a = websites[idx].related.split(' ')[jdx];
		var ws_url = parseHREF(a.split('|#|'),idx);
	}
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: ws_url,
		onload: function(resp) {
			try{
				extractResult(idx,resp,ws_url,jdx);
			}catch(e){
				if (getId('categoryresults') != null)
					getId('categoryresults').innerHTML = e;
				GM_log(e);
			}
		}
	});
}

function extractResult(idx,resp,ws_url,jdx){
//This is the main function which 
//--extracts the desired element(s) from the site
//--deletes undesired elements
//--custom filters for a few websites to modify display of results
//--flashcard shortcut "pencil" links

//from indices, create the required variables, i.e., website name, display wrapper, and filters
if(jdx==null) {
	//by default, all variables created from specification of "idx" only...
	var name = websites[idx].ref.split('|#|')[0];
	var wrppr = websites[idx].wrapper;
	var elefilter = websites[idx].elefilter;
	var elehidefilter = websites[idx]. elehidefilter;
	var noresult = websites[idx].no_result;
} else {
	//else create variables from jdx...
	var a = websites[idx].related.split(' ')[jdx];
	var b = a.split('|#|');
	var name = b[0];
	var wrppr = (b[5]).replace(/\#20/ig,' '); //replace pretend SPACE character "#20"
	var elefilter = b[6];
	if(b.length>7){
		var elehidefilter = (b[7]).replace(/\#20/ig,' ');
	} else {
		var elehidefilter = null;
	}
	if(b.length>8){
		var noresult = b[8];
	} else {
		var noresult = null;
	}
}

	//select body and remove some tags
	try {
		var html = resp.responseText.match(/\<body[^\>]*\>([\s\S]+)\<\/body\>/)[1];
	} catch(e) {
		var html = resp.responseText;
	}
	html = html.replace(/\<script[^\<]+\<\/script\>/ig,'').replace(/\<img[^\>]*\>/ig,'');
	
	//append requested page
	var divExtract = getId('divExtract');
	if(divExtract){
		divExtract.parentNode.removeChild(divExtract);
	}
	divExtract = document.body.appendChild(createElement('div', {id:'divExtract', style:'display:none; visibility:hidden;'}, null, html));
	
	//make all links of class gootranslink
	var arrs = getTag('a',divExtract);
	for(var i=0; i<arrs.length; i++){
		arrs[i].setAttribute('target','_blank');
		arrs[i].setAttribute('class','gootranslink');
		if(arrs[i].getAttribute('href') != null){
		//and, fix href's to point to the external sites
			arrs[i].setAttribute('href',arrs[i].getAttribute('href').replace(/^\#/,resp.finalUrl+'#'));
			arrs[i].setAttribute('href',arrs[i].getAttribute('href').replace(/^[%A20\s]+/,''));
			arrs[i].setAttribute('href',arrs[i].getAttribute('href').replace(/^\//,resp.finalUrl.replace(/(^http\:\/\/[^\/]+)\/.*/,'$1/')));
			if(arrs[i].getAttribute('href').replace(/^http.*/,'') != ""){
				arrs[i].setAttribute('href',resp.finalUrl.replace(/\w+\/$/,'')+'/'+arrs[i].getAttribute('href'));
			}
		}
	}
 
	//gather info
	if(idx != 0){//this is for anything other than google...
	
		//remove any background colors
		arrs = getTag('div',divExtract)
		for(var i=0; i<arrs.length; i++){
			arrs[i].setAttribute('style','background-color: none');
		}
		arrs = getTag('span',divExtract)
		for(i=0; i<arrs.length; i++){
			arrs[i].setAttribute('style','background-color: none');
		}
	
		//create "divFiltered" to store filtered results
		var divFiltered = getId('divFiltered');
		if(divFiltered){
			divFiltered.parentNode.removeChild(divFiltered);
		}

		try {
		divFiltered = divExtract.appendChild(createElement(wrppr, {id:'divFiltered'}, null, ""));
		
		//element (result) filter
		if(elehidefilter != null) {
			var c = document.evaluate(elefilter.replace(/\%20/ig,' '), divExtract, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (c.snapshotLength > 0){
				//if element to be filtered exists, then copy to divFiltered
				for (i=0; i<c.snapshotLength; i++) {
					divFiltered.appendChild(c.snapshotItem(i));
				}
			} else {
				//if there are no results, look for alternative text to display based on "no_results" filter
				if (noresult != null && noresult != ''){
					var c = document.evaluate(noresult.replace(/\%20/ig,' '), divExtract, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
					if (c.snapshotLength > 0){
						divFiltered.innerHTML = 'No results found.<br>';
						divFiltered.appendChild(c.snapshotItem(0));
					}
				}
			}
		}
		
		//hide elements filter
		if(elehidefilter != null && elehidefilter != ''){
			var r = elehidefilter.split(' ');
			for(var i=0; i<r.length; i++){
				ehr(r[i].replace(/\%20/ig,' '), divFiltered);
			}
		}
		
		//CUSTOM filtering for certain websites:
		//  Unfortunately, to give the human-translated sentences a simple right-left table format,
		//  it is necessary to modify the content of some of the websites
		if(name == 'Tatoeba'){
			//create table element
			var tb = divFiltered.appendChild(createElement('table',{id:'divFil_temp'}));//div[@class="result-block"]//div//div//div[1]
			//find column 1 and column 2
			var col1 = document.evaluate('.//div[@class="sentences_set"]//div[1]//div', divFiltered, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var col2 = document.evaluate('.//div[@class="sentences_set"]//div[@class="translations"]', divFiltered, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (col1){
				//fill table with column 1 & 2 results
				for (var i = 0; i < col2.snapshotLength; i++) {
					var tr = tb.appendChild(createElement('tr'));
					tr.appendChild(createElement('td',null,null,col1.snapshotItem(i).innerHTML));
					tr.appendChild(createElement('td',null,null,col2.snapshotItem(i).innerHTML));
				}
				//replace divFiltered with only the table content
				divFiltered.innerHTML = getId('divFil_temp').innerHTML;
			}
		} else if (name == 'bablaPhrases'){
			//create table element
			var tb = divFiltered.appendChild(createElement('table',{id:'divFil_temp'}));//div[@class="result-block"]//div//div//div[1]
			//find column 1 and column 2
			var col1 = document.evaluate('.//div[@class="result-wrapper"]//div//div[1]', divFiltered, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var col2 = document.evaluate('.//div[@class="result-wrapper"]//div//div[2]', divFiltered, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (col1){
				//fill table with column 1 & 2 results
				for (var i = 0; i < col1.snapshotLength; i++) {
					var tr = tb.appendChild(createElement('tr'));
					tr.appendChild(createElement('td',null,null,col1.snapshotItem(i).innerHTML));
					tr.appendChild(createElement('td',null,null,col2.snapshotItem(i).innerHTML));
				}
				//replace divFiltered with only the table content
				divFiltered.innerHTML = getId('divFil_temp').innerHTML;
			}
		} else if (name == 'LingueePhrases'){
			//create table element
			var tb = divFiltered.appendChild(createElement('table',{id:'divFil_temp'}));
			//find column 1 and column 2
			var col1 = document.evaluate('.//div[@class="dictentry left"]', divFiltered, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			var col2 = document.evaluate('.//div[@class="dictentry right"]', divFiltered, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (col1){
				//fill table with column 1 & 2 results
				for (var i = 0; i < col1.snapshotLength; i++) {
					var tr = tb.appendChild(createElement('tr'));
					tr.appendChild(createElement('td',null,null,col1.snapshotItem(i).innerHTML));
					tr.appendChild(createElement('td',null,null,col2.snapshotItem(i).innerHTML));
				}
				//replace divFiltered with only the table content
				divFiltered.innerHTML = getId('divFil_temp').innerHTML;
			}
		} else if (name == 'babLa'){
			//must put collapsable content (hidden within a div) one level higher
			var collapse = document.evaluate('.//div[contains(@class,"collapse")]', divFiltered, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (collapse){
				for (var i = 0; i < collapse.snapshotLength; i++) {
					for (var j = 0; j < collapse.snapshotItem(i).childNodes.length; j++) {
						collapse.snapshotItem(i).parentNode.appendChild(collapse.snapshotItem(i).childNodes[j]);
					}
					collapse.snapshotItem(i).parentNode.removeChild(collapse.snapshotItem(i));
				}
				//next, create a table and fill with content, similar to above example
				var tb = divFiltered.appendChild(createElement('table',{id:'divFil_temp'}));
				var col1 = document.evaluate('.//div[@class="result-block"]//div//div//div[1]', divFiltered, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var col2 = document.evaluate('.//div[@class="result-block"]//div//div//div[2]', divFiltered, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				for (var i = 0; i < col1.snapshotLength; i++) {
					var tr = tb.appendChild(createElement('tr'));
					tr.appendChild(createElement('td',null,null,col1.snapshotItem(i).innerHTML));
					tr.appendChild(createElement('td',null,null,col2.snapshotItem(i).innerHTML));
				}
				divFiltered.innerHTML = getId('divFil_temp').innerHTML;
			}
		} else if (name == 'Forvo_Pronunciation'){
			//create a "Play" link for audio
			var links = document.evaluate('.//a', divFiltered, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < links.snapshotLength; i++) {
				if (links.snapshotItem(i).textContent.length == 0){
					var play = links.snapshotItem(i).getAttribute('onclick');
					links.snapshotItem(i).innerHTML = 'Play';
					links.snapshotItem(i).removeAttribute('onclick');
					links.snapshotItem(i).removeAttribute('rel');
					links.snapshotItem(i).removeAttribute('target');
					links.snapshotItem(i).setAttribute('href',HREF_NO);
					links.snapshotItem(i).setAttribute('ogg',play.match(/\'[^\']+\'/ig)[1].replace(/\'/ig,''));
					//when addForvoAudioCallback() function is called, clicking on "Play" creates an audio element
					//which uses the "ogg" attribute to define the link to the audio
				}
			}
		}
		
		} catch(e) {
			if (getId('lookup_results') != null)
				getId('lookup_results').innerHTML = 'No results. (error!)';
			GM_log(e);
		}
		
		//return filtered HTML as the translation (divFiltered -> lookup_results)
		if(divFiltered == null || divFiltered.innerHTML == "" || divFiltered.textContent.length==0) {
			if(getId('lookup_results') != null)
				getId('lookup_results').innerHTML = ""; //remove "Loading ..."
				getId('lookup_results').appendChild(createElement('p',null,null,"No results. (empty)"));
		} else {
			if(getId('lookup_results') != null){
				getId('lookup_results').innerHTML = ""; //remove "Loading ..."
				blackBoxResults('lookup_results', ws_url, wrppr, document.getElementById('divDic').getAttribute('query',2), divFiltered.innerHTML, name,'Search Results','450px');
				if (idx == 1){
					addPencilIcon2Examples();
					addPencilIcon2DictExs();
				} else {
					addPencilIcon2DictExs();
					addForvoAudioCallback();
				}
				divExtract.removeChild(divFiltered); //delete divFiltered
				divExtract.parentNode.removeChild(divExtract); //delete divExtract
			}
		}
	} else {//Google Translate
		//returns text content only
		var c = document.evaluate('.//span[@id="result_box"]', divExtract, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (c.snapshotLength>0){
			var translation = c.snapshotItem(0).textContent;
			getId('divDic').setAttribute('backtemp',translation);
		} else {
			var translation = 'error filtering google translation';
		}
		
		//look for dictionary entries
		ehr('.//h3', divExtract); //remove h3
		var c = document.evaluate('.//div[@id="gt-res-dict"]', divExtract, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (c.snapshotLength>0){
			var dict='';
			dict = c.snapshotItem(0).innerHTML;//.replace(/<\/div><div>/ig,', ').replace(/<li>/ig,'<li style="color:#3399FF;">').replace(/<div>/ig,'<li style="color:#A6A6A6;">');
		}
		getId('categoryresults').innerHTML = ""; //Remove "Loading..." message
		blackBoxResults('categoryresults', ws_url, 'div', document.getElementById('divDic').getAttribute('query',2), translation+dict, 'Google Translate','google','450px');
		divExtract.parentNode.removeChild(divExtract);// delete divExtract
	}
}

function blackBoxResults(parentname,srch_url,wrap,qry,trans,srch_name,ttext,mw){
	//create black blox
	if (parentname != null && getId(parentname) != null) {
		var bb = getId(parentname).appendChild(createElement('div',{class:'blackbox', id:'dict', style:'max-width:'+mw+';'}));
		//add link
		bb.appendChild(createElement('a',{title:ttext, class:'gootranslink', target:'_blank', href:srch_url, style:'font-size: 10px;'},null,'Results of "<span class="greensearchterm" style="display:inline;">'+(qry.match(/^[\s\S]{15}/) ? qry.match(/^[\s\S]{15}/)[0]+'...' : qry.match(/^[\s\S]+/)[0])+'</span>" from '+srch_name+':'));
		//add results
		bb.appendChild(createElement('br'));
		bb.appendChild(createElement(wrap,null,null,trans));
		if (srch_url != 'empty'){//save to results history
			results_history.push(bb.innerHTML);
			results_history_idx=-1;
		}
	}
}

function back_forward(elem_){//results history controls
//< | >
		var dv = elem_.appendChild(createElement('div',{style:'word-spacing:5px; float:left; text-align:left; margin:4px 5px; display:inline; width:inherit;'},null,""));
		var a = dv.appendChild(createElement('a', {title:'Previous Result', href:HREF_NO, style:'color: #008087;'}, null, '<'));
		a.addEventListener('click',function () {//prev
			if (results_history.length > 0){
				if(getId('dict')==null){
					blackBoxResults('categoryresults', 'empty', 'div', 'empty', 'empty', 'empty','Empty Results','450px');
				}
				if (results_history_idx == -1){
					results_history_idx = results_history.length-2;
				} else {
					results_history_idx = results_history_idx-1;
				}
				if (results_history_idx < 0){
					results_history_idx = results_history.length-1;
				}
				getId('dict').innerHTML = results_history[results_history_idx];
				//addPencilIcon2Examples();
				addPencilIcon2DictExs();
				addForvoAudioCallback();
			}
			},false)

		dv.appendChild(createElement('span',{style:'display:inline;'},null,' | '));
		a = dv.appendChild(createElement('a', {title:'Next Result', href:HREF_NO, style:'color: #008087;'}, null, '>'));
		a.addEventListener('click',function () {//next
			if (results_history.length > 0){
				if(getId('dict')==null){
					blackBoxResults('categoryresults', 'empty', 'div', 'empty', 'empty', 'empty','Empty Results','450px');
				}
				if (results_history_idx == -1){
					results_history_idx = 0;
				} else {
					results_history_idx = results_history_idx+1;
				}
				if (results_history_idx >= results_history.length){
					results_history_idx = 0;
				}
				getId('dict').innerHTML = results_history[results_history_idx];
				//addPencilIcon2Examples();
				addPencilIcon2DictExs();
				addForvoAudioCallback();
			}
			},false)

}

function populateTabContent(idx){//when tab icon is picked, creates tab content (UL list)
								 //Sequence: toggleTab->populateTabContent->hereLinkClicked->internetLookup...

	var tbl, ul, li, a, b, query = getId('divDic').getAttribute('query').replace(/\s+$/,'').replace(/^\s+/,'');
	
	//add "related" links
	a = (websites[idx].ref+" "+websites[idx].related).split(' ');
    ul = getId('categoryresults').appendChild(createElement('ul',{id:'tabsubcontent', style:'list-style:none outside none; padding:1px; margin:2px; max-width:340px; display:block; clear:both;'}));
	for(var i=0; i<a.length; i++){
		b = a[i].split('|#|');
		if(b.length>5) {
		    li = ul.appendChild(createElement('li',{class:'tab_li_sm', id:'clicked_'+idx.toString()+'_'+i.toString(), title:b[0]}, 'click hereLinkClicked false',""));
			li.appendChild(createElement('a',{class:'tab_a_sm', target:'_blank', id:'clicked_'+idx.toString()+'_'+i.toString(), title:b[0]}, 'click hereLinkClicked false',b[0]));
		} else if(i==0) {
		    li = ul.appendChild(createElement('li',{class:'tab_li_sm', id:'label_'+idx.toString()+'_'+i.toString(), title:'Default Search'},'click toggleTab false',""));
			li.appendChild(createElement('a',{class:'tab_a_sm',target:'_blank', id:'label_'+idx.toString()+'_'+i.toString(), title:'Default Search'},'click toggleTab false',b[0]));
		} else {
			li = ul.appendChild(createElement('li',{class:'tab_li_sm', id:'label_'+idx.toString()+'_'+i.toString(), title:'Default Search'},null,""));
			li.appendChild(createElement('a',{class:'tab_a_sm',target:'_blank', href:parseHREF(b,idx)},null,b[0]));
		
		}
		
	}
	
	getId('categoryresults').appendChild(createElement('span',{id:'lookup_results', style:'display:block; clear:both;'},null,"")); //initially empty
	internetLookup(idx);
}

function flashcardEditor(){

	if (getId('divDic').getAttribute('frontsave') == "" && getId('divDic').getAttribute('backsave') == ""){
		var front = getId('divDic').getAttribute('fronttemp').replace(/\s+$/,'').replace(/^\s+/,'');
		var back = getId('divDic').getAttribute('backtemp').replace(/\s+$/,'').replace(/^\s+/,'');
	} else {
		var front = getId('divDic').getAttribute('frontsave');
		var back = getId('divDic').getAttribute('backsave');
	}
	
	getId('categoryresults').innerHTML = ""; //zero-out the html
	var bb = getId('categoryresults').appendChild(createElement('div',{id:'dict', class:'blackbox', style:'background: linear-gradient(to bottom, rgba(200,200,200,0), rgba(200,200,200,1)), url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAC8CAIAAAAck6LaAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD2SURBVGhD7ZkxCsJQEET//W/kISzFxjJViGAhBERI9gCxGGYKwz7ZMgxx8mZcf8aW+IyEyIbKsY34gi9KwOAFXiRePpenP8OXKIWQyvf29occkSMpR8rFP6+FOqhTQIIXeIEXxYE2vNzn2Z9xnSZ/QiqPZfGHxmyTAL8WSgFe4EUBCV7gBV4UB9rw8lpXf0K7lL/UlULoXnxTSoHebZMjv1zY6ziBFCmiX+gXBRl4OQEvmc3jn3apzL1kfFHiwu+R6Bb9coJ+EZ8p30gxjATAC7woDrThxX9NWAqh063MRua/yi0FGrNNAvxa4IyM/yQiRfTLsWE70VzZrYAlkBUAAAAASUVORK5CYII=) repeat-x scroll center top #FFFFFF; max-width:450px;'},null,""));
	bb.appendChild(createElement('div',{style:'width:90%; float:center; text-align:center;'},null,'<b>Flashcard Editor</b>'));
	//bb.appendChild(createElement('br'));
	bb.appendChild(createElement('span',null,null,'Front:'));
	
	//prev | next
	var dv = bb.appendChild(createElement('div',{style:'word-spacing:5px; width:45%; float:right; text-align:right; margin-right:10px;'},null,""));
	var a = dv.appendChild(createElement('a', {title:'Previous Flashcard in Database', href:HREF_NO, class:"gootranslink"}, null, 'prev'));
	a.addEventListener('click',function () {//prev
			var flsh = GM_getValue('flashcards').split('\n');
			var idx = parseInt(getId('flashcardcount').innerHTML.replace(/\s\[/,"").replace(/\]\s/,""),10);
			if (isNaN(idx)) {
				idx = flsh.length-1;
			} else {
				idx = idx-1;
			}
			if (idx > 0) {
				getId('flashcardcount').innerHTML = ' ['+idx.toString()+'] ';
				getId('flashcardfront').value = flsh[idx].split('\t')[0].replace(/\<br\>/ig,'\n');
				getId('flashcardback').value = flsh[idx].split('\t')[1].replace(/\<br\>/ig,'\n');
			} else {
				getId('flashcardcount').innerHTML = ' [*] ';
				getId('flashcardfront').value = front;
				getId('flashcardback').value = back;
			}
		},false)
	dv.appendChild(createElement('span',{id:'flashcardcount'},null,' [*] '));
	a = dv.appendChild(createElement('a', {title:'Next Flashcard in Database', href:HREF_NO, class:"gootranslink"}, null, 'next'));
	a.addEventListener('click',function () {//next
			var flsh = GM_getValue('flashcards').split('\n');
			var idx = parseInt(getId('flashcardcount').innerHTML.replace(/\s\[/,"").replace(/\]\s/,""),10);
			if (isNaN(idx)) {
				idx = 1;
			} else {
				idx = idx+1;
			}
			if (idx > flsh.length-1){
				getId('flashcardcount').innerHTML = ' [*] ';
				getId('flashcardfront').value = front;
				getId('flashcardback').value = back;
			} else {
				getId('flashcardcount').innerHTML = ' ['+idx.toString()+'] ';
				getId('flashcardfront').value = flsh[idx].split('\t')[0].replace(/\<br\>/ig,'\n');
				getId('flashcardback').value = flsh[idx].split('\t')[1].replace(/\<br\>/ig,'\n');
			}
		},false)
	
	//frontside textarea
	bb.appendChild(createElement('textarea',{id:'flashcardfront', style:'width:90%; max-width:90%; min-height:72px; height:72px; background:none repeat scroll 0% 0% transparent; cursor:default; word-wrap:break-word; padding:5px; margin:5px;'},null,front));
		
	//re-search using google
	dv = bb.appendChild(createElement('div',{style:'width:90%; float:right; text-align:right; margin-right:10px;'}));
	a = dv.appendChild(createElement('a', {title:'Search using first line of "Front" text', href:HREF_NO, class:"gootranslink"}, null, 'Search'));
	a.addEventListener('click',function () {
			getId('divDic').setAttribute('query', getId('flashcardfront').value.replace(/\n.+/,''));
			internetLookup(0);
		},false)
	
	//backside textarea
	bb.appendChild(createElement('span',null,null,'<br>Back:'));
	bb.appendChild(createElement('textarea',{id:'flashcardback', style:'width:90%; max-width:90%; min-height:72px; height:72px; background:none repeat scroll 0% 0% transparent; cursor:default; word-wrap:break-word; padding:5px; margin:5px;'},null,back));

	//save changes
	dv = bb.appendChild(createElement('div',{style:'width:75%; float:left; text-align:left;'},null,""));
	a = dv.appendChild(createElement('a', {title:'Save Changes to Current Flashcard', href:HREF_NO, class:"gootranslink", style:'font-size:x-small;'}, null, 'save changes'));
	a.addEventListener('click',function () {//save changes
			var idx = parseInt(getId('flashcardcount').innerHTML.replace(/\s\[/,"").replace(/\]\s/,""),10);
			if (isNaN(idx)){
				//save current edits
				front = getId('flashcardfront').value;
				back = getId('flashcardback').value;
				getId('divDic').setAttribute('frontsave',getId('flashcardfront').value);
				getId('divDic').setAttribute('backsave',getId('flashcardback').value);
			} else {
				//save changes to saved flashcard
				var flsh = GM_getValue('flashcards').split('\n');
				GM_setValue('flashcards','');
				for (var i=1; i<flsh.length; i++) {
					if (i != idx) {
						GM_setValue('flashcards', GM_getValue('flashcards')+'\n'+flsh[i].replace(/\n/ig,'<br>'));
					} else {//save changes
						GM_setValue('flashcards', GM_getValue('flashcards')+'\n'+getId('flashcardfront').value.replace(/\n/ig,'<br>').replace(/\t/ig,' ')+'\t'+getId('flashcardback').value.replace(/\n/ig,'<br>').replace(/\t/ig,' '));
					}
				}
			}
		},false)
	
	//delete (saved cards only)
	dv.appendChild(createElement('span',null,null,' | '));
	a = dv.appendChild(createElement('a', {title:'Delete Saved Flashcard', href:HREF_NO, class:"gootranslink", style:'font-size:x-small;'}, null, 'remove'));
	a.addEventListener('click',function () {//save changes
			var idx = parseInt(getId('flashcardcount').innerHTML.replace(/\s\[/,"").replace(/\]\s/,""),10);
			if (!isNaN(idx)){
				var flsh = GM_getValue('flashcards').split('\n');
				GM_setValue('flashcards','');
				for (var i=1; i<flsh.length; i++) {
					if (i != idx) {
						GM_setValue('flashcards', GM_getValue('flashcards')+'\n'+flsh[i]);
					}
				}
				//Show previous card after deleting
				if (idx > 1){
					idx = idx-1;
					getId('flashcardcount').innerHTML = ' ['+idx.toString()+'] ';
				} else if(idx==1 && flsh.length>1) {
					idx = 2;
					getId('flashcardcount').innerHTML = ' [1] ';
				} else {
					getId('flashcardcount').innerHTML = ' [1] ';
					idx = 1;
				}
				if (flsh.length>0){
					getId('flashcardfront').value = flsh[idx].split('\t')[0];
					getId('flashcardback').value = flsh[idx].split('\t')[1];
				}
			}
		},false)
	
	//swap
	dv.appendChild(createElement('span',null,null,' | '));
	a = dv.appendChild(createElement('a', {title:'Swap Front/Back', href:HREF_NO, class:"gootranslink", style:'font-size:x-small;'}, null, 'swap'));
	a.addEventListener('click',function () {//swap
			var fs = getId('flashcardfront').value;
			getId('flashcardfront').value = getId('flashcardback').value;
			getId('flashcardback').value = fs;
		},false)
		
	//export
	dv.appendChild(createElement('span',null,null,' | '));
	dv.appendChild(createElement('span',{style:'font-size:x-small;'},null,'export: '));
	//view
	dv.appendChild(createElement('span',{style:'font-size:x-small;'},null,' | '));
	a = dv.appendChild(createElement('a', {title:'Copy & paste into text editor and save as UTF-8 for export to Anki)', href:HREF_NO, class:"gootranslink", style:'font-size:x-small;'}, null, 'view'));
	a.addEventListener('click',function () {
			var flsh = GM_getValue('flashcards').split('\n');
			var sp = getId('categoryresults').appendChild(createElement('span'));
			var tb = sp.appendChild(createElement('table'));
			for (var i=1; i<flsh.length; i++){
				tr = tb.appendChild(createElement('tr'));
				tr.appendChild(createElement('td',null,null,flsh[i].split('\t')[0].replace(/\<br\>/ig,'&lt;br&gt')));
				tr.appendChild(createElement('td',null,null,flsh[i].split('\t')[1].replace(/\<br\>/ig,'&lt;br&gt')));
			}
			document.body.innerHTML = sp.innerHTML;
			document.head.innerHTML = "";
		},false)
    //download
    if(GM_getValue('flashcards') == null){
        var cards = 'Nothing to export';
    } else {
        var cards = GM_getValue('flashcards');
    }
	dv.appendChild(createElement('span',{style:'font-size:x-small;'},null,' | '));
	a = dv.appendChild(createElement('a', {title:'Download Flashcards as Text File (exit and return to update recently added)', href:"data:application/octet-stream,"+encodeURIComponent(cards.replace(/^.+?\n/,'')), class:"gootranslink", style:'font-size:x-small;', download:'flashcards.csv'}, null, 'download'));
		
	//+Add
	dv = bb.appendChild(createElement('div',{style:'word-spacing:10px; width:15%; float:right; text-align:right; margin-right:10px;'}));
	a = dv.appendChild(createElement('a', {title:'Save Flashcard to Database', href:HREF_NO, class:"gootranslink"}, null, '+Add'));
	a.addEventListener('click',function () {
			GM_setValue('flashcards', GM_getValue('flashcards')+'\n'+getId('flashcardfront').value.replace(/\n/ig,'<br>').replace(/\t/ig,' ')+'\t'+getId('flashcardback').value.replace(/\n/ig,'<br>').replace(/\t/ig,' '));
		},false)
}

function toggleTab(evt){//Opens and Closes tab when tab label is clicked
	var idx = parseInt(evt.target.id.replace(/label_/,""),10);
	if (opentab == idx  && evt.target.getAttribute('title') != 'Default Search') {
		getId('categoryresults').innerHTML = ""; //zero-out the html
		//getId('label_'+idx.toString()).parentNode.setAttribute('style', 'display:inline;');
		opentab = 0;
	} else {
		opentab = idx;
		for (var i=1; i<websites.length-1; i++){
			     if (i==idx) {
				        getId('label_'+i.toString()).parentNode.setAttribute('class', 'tab_li_c');
			     } else {
				        getId('label_'+i.toString()).parentNode.setAttribute('class', 'tab_li');
			     }
		}
		
		if (idx == websites.length-1) {
			//flashcard editor
			flashcardEditor();
		} else {
			getId('categoryresults').innerHTML = ""; //zero-out the html
			populateTabContent(idx); //call function to populate data
		}
	}
}

function hereLinkClicked(evt){//When the "(here*)" for external sites is clicked, this function finds the indicies for calling "websites" array
	var idx = parseInt(evt.target.id.replace(/clicked_/,"").replace(/_.+/,""),10);
	var jdx = parseInt(evt.target.id.replace(/clicked_\d_/,""),10)-1;
	var rltd = websites[idx].related.split(' ');
	//cleanup
	getId('categoryresults').removeChild(getId('lookup_results')); //remove results span (containing previous blackbox results)
	getId('categoryresults').appendChild(createElement('span',{id:'lookup_results', style:'display:block; clear:both;'},null,'Loading... '+rltd[jdx].split('|#|')[0])); //create again, with msg
	internetLookup(idx,jdx);
}

function parseHREF(b,idx){//create url from query
	var q = trim(document.getElementById('divDic').getAttribute('query',2));
	if (idx != 0){
	   q = q.toLowerCase(); //if not Google Translate, change to lower case
	}
	var href_url = b[1].replace(/GDWORD/ig,encodeURIComponent(q)).replace(/\%20/ig, b[4]);
	href_url = href_url.replace(/GDISO1/ig,escape(q)).replace(/\%20/ig, b[4]);
	if(GM_getValue('from')=='enpt'){ //getId('optSelLangFrom').value
		href_url = href_url.replace('GDLNG1',b[3]).replace('GDLNG2',b[2]);
	} else {
		href_url = href_url.replace('GDLNG1',b[2]).replace('GDLNG2',b[3]);
	}
	return href_url;
}

function trim(str){
	return str.replace(/^\s+/,'').replace(/\s+$/,'');
}

function mousedownCleaning(evt){

	var divDic = getId('divDic');
	var divLookup = getId('divLookup');

	if(divDic)
	{
		if(!clickedInsideID(evt.target,'divDic')) {
			divDic.parentNode.removeChild(divDic);
			results_history = [];//remove results history
		}
	}	
	if(divLookup)
	{
		if(!clickedInsideID(evt.target,'divLookup'))
			divLookup.parentNode.removeChild(divLookup);			
			
	}
		
}

function showsearchoptions(evt){

    if (getId('tab_cat_1').style.visibility.toLowerCase() == 'hidden') {
        for(var i=1; i<websites.length-1; i++){
    	    getId('tab_cat_'+i.toString()).style.visibility = 'visible';
    	    getId('tab_cat_'+i.toString()).style.height = '18px';
    	 }
	 } else {
	     for(var i=1; i<websites.length-1; i++){
    	    getId('tab_cat_'+i.toString()).style.visibility = 'hidden';
    	    getId('tab_cat_'+i.toString()).style.height = '1px';
    	    getId('tab_cat_'+i.toString()).setAttribute('class','tab_li');
    	    if (getId('tabsubcontent')){
    	         getId('tabsubcontent').parentNode.removeChild(getId('tabsubcontent'));
    	    }
    	 }
    	 opentab = 0;
	 }
}

function showLookupIcon(evt){//google icon display

	if(!evt.ctrlKey && GM_getValue('ctrl'))//ctrl key
		return;
	
	if(evt.button == 2){
		mousedownCleaning(evt)
		return;
	}
	
	
	if(!initialized){
		images();
		css();	
		initialized = true;
	}
	
	var divDic = getId('divDic');
	var divLookup = getId('divLookup');
	var flashcardIcon = 0;
	
	//possible cleanup
	if(divDic) {
		//to prevent display of icon for text selected within divDic
		if(!clickedInsideID(evt.target,'divDic')){
			divDic.parentNode.removeChild(divDic);
		} else {
			if(clickedInsideID(evt.target,'dict') && !clickedInsideID(evt.target,'flashcardfront') && !clickedInsideID(evt.target,'flashcardback')){
				flashcardIcon = 1;
			} else {
				return;
			}
		}
	}

	//remove divLookup if exists
	if(divLookup)
	{
		if(!clickedInsideID(evt.target,'divLookup'))
			divLookup.parentNode.removeChild(divLookup);
		return
	}	
	txtSel = getSelection(evt);
	
	//exit if no text is selected
	if(!txtSel || txtSel=="")
	{
		if(divDic)
		{
			if(!clickedInsideID(evt.target,'divDic'))
				divDic.parentNode.removeChild(divDic);
		}
		if(divLookup)
		{	
			if(!clickedInsideID(evt.target,'divLookup'))
				divLookup.parentNode.removeChild(divLookup);
		}
		return;
	}
	
	if(!txtSel || txtSel=="")
	{
		if(divLookup)
		{	
			if(!clickedInsideID(evt.target,'divLookup'))
				divLookup.parentNode.removeChild(divLookup);
		}
		return;
	} else {
		
		var x = evt.clientX;
		var y = evt.clientY;
		divLookup = createElement('div', {id:'divLookup', style:'background: rgba(0, 0, 0, 0); color:#FFFFFF; position:absolute; top:'+(y+window.pageYOffset-25)+'px; left:'+(x+window.pageXOffset+10)+'px; padding:0px; width:30px; height:16px; z-index:999999999;'});
	
		if (flashcardIcon == 0) {
			divLookup.appendChild(imgLookup.cloneNode(false));
			divLookup.lastChild.addEventListener('mouseover', lookup, false);
		} else {
			//create text selection icon for flashcard
			if (txtSel != null && getId('divDic') != null) {
				if (getId('divDic').hasAttribute('query') && txtSel != getId('divDic').getAttribute('query')) {
					getId('divDic').setAttribute('currSel',txtSel);
					var fc = createElement('span',{style:'color:black;'},null,'<b>+</b>')
					fc.innerHTML += "<img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAASBJREFUGNNdjr9LAnEcht/PeT86OfqBGB6lLY4OUZAQQVAYJA1B/QeNtwfVZHNTm1v/QA2FmxIlNQTSVpQWElJZoGV6eV1+P013SM/88LwvMTOjD2YGEaF5f2K/lHJKz3Uwllx/pv8iALyXNliTl0gLxQEWuCtkHV/0Sp/lfWgjcbhv12g9OVD1MOxfyZW8ChGhfrkGfTQJ/j5DQC1BNRpoV694YtFSSAjBRITK6RZikwsQnQLAdXRqg/hpDsNMZ8DMkIiIi9kUolOr6LVyEM4Dvh4H0K52YaYz/lpgNlrbnFneUc4PLAyZOhrlABR9GuMru/5vAJBea5WguDlCwjBwsXeMj1YYkXnLL3nI+eIt5K5ALBKy57YPYSZSwf6Sxx/X9nxY3h9nJwAAAABJRU5ErkJggg==\" style=\" border:1px solid rgba(240,240,255,0.1); \" >";
					divLookup.appendChild(fc);
					divLookup.lastChild.addEventListener('mouseover', pencilIconTooltip, false);
				}
			}
		}
		document.body.appendChild(divLookup);
	}
}

function pencilIconTooltip(evt) {
	if (getId('divDic').hasAttribute('backtemp') && getId('divDic').hasAttribute('currSel')){
		if (getId('divDic').getAttribute('currSel').split('\t').length == 2){
			c = getId('divDic').getAttribute('currSel').split('\t');
			strg_to_flashcard(c[1],c[0]);
		} else {
			strg_to_flashcard(getId('divDic').getAttribute('currSel').replace(/\t/ig,'\n')," ");
		}
	}
	var divLookup = getId('divLookup');
	if (divLookup)
		divLookup.parentNode.removeChild(divLookup);
}

function addPencilIcon2Examples(){
	var trs = document.evaluate('.//tr', getId('dict'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i=trs.snapshotLength-1; i>=0; i--) {
		if (trs.snapshotItem(i).hasChildNodes && trs.snapshotItem(i).nodeName.toUpperCase() == 'TR'){
			var tds = document.evaluate('.//td', trs.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			if (tds){
				if (tds.snapshotLength == 2){//create 3rd column
					var tdn = trs.snapshotItem(i).appendChild(createElement('td',null,null,""));
					var sp = tdn.appendChild(createElement('span', {title:'Click to add Example to flashcard', href:HREF_NO, style:'position:relative; padding:5px; cursor:pointer;'}, 'click td2Flashcard false', ""));
					sp.appendChild(createElement('img',{style:'vertical-align:middle; padding:2px', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAASBJREFUGNNdjr9LAnEcht/PeT86OfqBGB6lLY4OUZAQQVAYJA1B/QeNtwfVZHNTm1v/QA2FmxIlNQTSVpQWElJZoGV6eV1+P013SM/88LwvMTOjD2YGEaF5f2K/lHJKz3Uwllx/pv8iALyXNliTl0gLxQEWuCtkHV/0Sp/lfWgjcbhv12g9OVD1MOxfyZW8ChGhfrkGfTQJ/j5DQC1BNRpoV694YtFSSAjBRITK6RZikwsQnQLAdXRqg/hpDsNMZ8DMkIiIi9kUolOr6LVyEM4Dvh4H0K52YaYz/lpgNlrbnFneUc4PLAyZOhrlABR9GuMru/5vAJBea5WguDlCwjBwsXeMj1YYkXnLL3nI+eIt5K5ALBKy57YPYSZSwf6Sxx/X9nxY3h9nJwAAAABJRU5ErkJggg=='}));
				} else if (tds.snapshotLength == 3){//replace 3rd column
					tds.snapshotItem(tds.snapshotLength-1).innerHTML = "";
					var sp = tds.snapshotItem(tds.snapshotLength-1).appendChild(createElement('span', {title:'Click to add Example to flashcard', href:HREF_NO, style:'position:relative; padding:5px; cursor:pointer;'}, 'click td2Flashcard false', ""));
					sp.appendChild(createElement('img',{style:'vertical-align:middle; padding:2px', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAASBJREFUGNNdjr9LAnEcht/PeT86OfqBGB6lLY4OUZAQQVAYJA1B/QeNtwfVZHNTm1v/QA2FmxIlNQTSVpQWElJZoGV6eV1+P013SM/88LwvMTOjD2YGEaF5f2K/lHJKz3Uwllx/pv8iALyXNliTl0gLxQEWuCtkHV/0Sp/lfWgjcbhv12g9OVD1MOxfyZW8ChGhfrkGfTQJ/j5DQC1BNRpoV694YtFSSAjBRITK6RZikwsQnQLAdXRqg/hpDsNMZ8DMkIiIi9kUolOr6LVyEM4Dvh4H0K52YaYz/lpgNlrbnFneUc4PLAyZOhrlABR9GuMru/5vAJBea5WguDlCwjBwsXeMj1YYkXnLL3nI+eIt5K5ALBKy57YPYSZSwf6Sxx/X9nxY3h9nJwAAAABJRU5ErkJggg=='}));
					
				}
			}
		}
	}
}

function addPencilIcon2DictExs(){//adds "pencil" shortcuts and remove foriegn classes and id's to avoid css confusion
	var ex = [
			{xpath:'.//span[@class="ex"]'},
			{xpath:'.//span[@class="eg"]'},
			{xpath:'.//em[@class="example"]'},
			{xpath:'.//span[@class="illustration"]'},
			{xpath:'.//span[@class="vi"]'},
			{xpath:'.//span[@class="ital-inline"]'},
			{xpath:'.//td[@class="ToEx"]'},
			{xpath:'.//p[@class="ExemploDefinicao"]'},
			{xpath:'.//div[@class="example"]'},
			{xpath:'.//td[@class="textoConcordanciador"]'},
			{xpath:'.//div[@class="qu_txt"]'},
			{xpath:'.//p[@class="EXAMPLE"]'}];
	for (var i=0; i<ex.length; i++){
		var exs = document.evaluate(ex[i].xpath, getId('dict'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (exs){
			for (var j=0; j<exs.snapshotLength; j++) {
				if (exs.snapshotItem(j).textContent.split(' ').length > 2){ //if more than 2 words, color in green
				    exs.snapshotItem(j).setAttribute('class','greensearchterm');
				    exs.snapshotItem(j).removeAttribute('id');
					var shortcut = exs.snapshotItem(j).appendChild(createElement('span', {title:'Click to add Example to flashcard', href:HREF_NO, style:'position:relative; padding:5px; cursor:pointer;'}, 'click ex2Flashcard false', ""));
					shortcut.appendChild(createElement('img',{style:'vertical-align:middle; padding:2px', src:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAJCAYAAAALpr0TAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAASBJREFUGNNdjr9LAnEcht/PeT86OfqBGB6lLY4OUZAQQVAYJA1B/QeNtwfVZHNTm1v/QA2FmxIlNQTSVpQWElJZoGV6eV1+P013SM/88LwvMTOjD2YGEaF5f2K/lHJKz3Uwllx/pv8iALyXNliTl0gLxQEWuCtkHV/0Sp/lfWgjcbhv12g9OVD1MOxfyZW8ChGhfrkGfTQJ/j5DQC1BNRpoV694YtFSSAjBRITK6RZikwsQnQLAdXRqg/hpDsNMZ8DMkIiIi9kUolOr6LVyEM4Dvh4H0K52YaYz/lpgNlrbnFneUc4PLAyZOhrlABR9GuMru/5vAJBea5WguDlCwjBwsXeMj1YYkXnLL3nI+eIt5K5ALBKy57YPYSZSwf6Sxx/X9nxY3h9nJwAAAABJRU5ErkJggg=='}));
				}
			}
		}
	}
	
	//customization of certain tags for certain websites
	var ex = [
			{xpath:'.//span[@class="dnidex"]'},
			{xpath:'.//div[@class="SENSE-NUM"]'},
			{xpath:'.//span[@class="iteration"]'}];
	for (var i=0; i<ex.length; i++){
		var exs = document.evaluate(ex[i].xpath, getId('dict'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (exs){
			for (var j=0; j<exs.snapshotLength; j++) {
			    exs.snapshotItem(j).setAttribute('class','specialformatting_'+i.toString());
			    exs.snapshotItem(j).setAttribute('id','specialformatting');
			}
		}
	}
	
	//Remove "class" and "id" of non-green elements (experimental)
	var exs = document.evaluate('.//*', getId('dict'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (exs){
    	for (var j=0; j<exs.snapshotLength; j++) {
    		if (exs.snapshotItem(j).getAttribute('class') != 'greensearchterm' && exs.snapshotItem(j).getAttribute('class') != 'gootranslink' && exs.snapshotItem(j).getAttribute('id') != 'specialformatting') {
    		    exs.snapshotItem(j).removeAttribute('class');
    		    exs.snapshotItem(j).removeAttribute('id');
    		} else {
    		    exs.snapshotItem(j).removeAttribute('id');
    		}
    	}
    }
}

function addForvoAudioCallback(){//add audio callback (Forvo)
	var alink = document.evaluate('.//a[@ogg]', getId('dict'), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < alink.snapshotLength; i++) {
		alink.snapshotItem(i).addEventListener('click',function () {//audio
		//<audio autoplay="true"><source src="http://www.forvo.com/player-oggHandler.php?path=ODk3Mjg1Ni8zOS84OTcyODU2XzM5XzE0NzQ4XzEub2dn=="></audio>
		var audio = this.parentNode.appendChild(createElement('audio',{autoplay:'true'}));
		audio.appendChild(createElement('source',{src:'http://www.forvo.com/player-oggHandler.php?path='+this.getAttribute('ogg')}));
		},false);
	}
}

function ex2Flashcard(evt){//callback when pencil icon (in green-colored dictionary examples) is clicked
	var node = evt.target.parentNode.parentNode;

	//write to flashcard variables
	strg_to_flashcard(node.textContent,"");
	evt.target.parentNode.removeChild(evt.target);//erase pencil icon
}

function td2Flashcard(evt){//callback when pencil (in Examples) icon is clicked
	var node = evt.target.parentNode; //loop outward until find node with 'td' elements
	for (var i=0; i<5; i++){
		var tds = document.evaluate('.//td', node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (tds && tds.snapshotLength > 1){
			break;
		} else {
			node = node.parentNode;
		}
		if (i==4)
			return;
	}
	//write to flashcard variables
	strg_to_flashcard(tds.snapshotItem(1).textContent,tds.snapshotItem(0).textContent);
	evt.target.parentNode.removeChild(evt.target);//erase pencil icon
}

function strg_to_flashcard(bn,fn){//controls whether to write to "backsave" or "backtemp", etc.
	if (bn != "") {
		if (getId('divDic').getAttribute('backsave') == "" && getId('divDic').getAttribute('frontsave') == ""){
			getId('divDic').setAttribute('backtemp', getId('divDic').getAttribute('backtemp')+'\n\n'+bn.replace(/\t/ig,'').replace(/^\s+/,'').replace(/\n\s+\n/ig,'').replace(/\s+/ig,' '));
		} else {
			getId('divDic').setAttribute('backsave', getId('divDic').getAttribute('backsave')+'\n\n'+bn.replace(/\t/ig,'').replace(/^\s+/,'').replace(/\n\s+\n/ig,'').replace(/\s+/ig,' '));
		}
	}
	
	if (fn != "") {
		if (getId('divDic').getAttribute('backsave') == "" && getId('divDic').getAttribute('frontsave') == ""){
			getId('divDic').setAttribute('fronttemp', getId('divDic').getAttribute('fronttemp')+'\n\n'+fn.replace(/\t/ig,'').replace(/^\s+/,'').replace(/\n\s+\n/ig,'').replace(/\s+/ig,' '));
		} else {
			getId('divDic').setAttribute('frontsave', getId('divDic').getAttribute('frontsave')+'\n\n'+fn.replace(/\t/ig,'').replace(/^\s+/,'').replace(/\n\s+\n/ig,'').replace(/\s+/ig,' '));
		}
	}
}


function getSelection(evt){

	var txt = null;
	//get selected text
	if(evt && evt.target.nodeName=='TEXTAREA')
	{ 
		 txt = evt.target.value.substr(evt.target.selectionStart, evt.target.selectionEnd - evt.target.selectionStart);  		
	}
	else if (window.getSelection)
	{
		txt = window.getSelection();
	}
	else if (document.getSelection)
	{
		txt = document.getSelection();
	}
	else if (document.selection)
	{
		txt = document.selection.createRange().text;
	}
	//txt = encodeURIComponent(txt);//toString().replace(/\n/ig, '%0D%0A');
	return txt;
}

function options(evt){//fo

	if(!languagesGoogle){
		languagesGoogle = '<option selected value="pten">Portuguese->English</option><option value="enpt">English->Portuguese</option>';
	}
		
	var divOptions = getId('divOpt');
	
	if(!divOptions)//show options
	{
		try {
		divOptions = createElement('div', {id:'divOpt', style:'position:relative; padding:5px;'});
		getId('divDic').appendChild(divOptions);
		getId('optionsLink').style.visibility = 'hidden';

		
		//from->to
		divOptions.appendChild(createElement('span', null, null,'From->To:'));
		divOptions.appendChild(createElement('select', {id:'optSelLangFrom'}, null, languagesGoogle));
		getId('optSelLangFrom').value = GM_getValue('from') ? GM_getValue('from') : "pten";
		getId('optSelLangFrom').addEventListener('change', null, false);
		
		//use ctrl 
		divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('input', {id:'checkCtrl', type:'checkbox'}));
		divOptions.appendChild(createElement('span', null, null,'Use Ctrl key'));
		getId('checkCtrl').checked = GM_getValue('ctrl');
		
		//save
		//divOptions.appendChild(createElement('br'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, style:'color: #008087;', class:"gootranslink"}, 'click saveOptions false', '<br>- SAVE -'));
		
		//cancel
		divOptions.appendChild(createElement('span', null, null,'&nbsp; &nbsp; &nbsp;'));
		divOptions.appendChild(createElement('a', {href:HREF_NO, style:'color: #008087;', class:"gootranslink"}, 'click options false', 'Cancel <br>'));
		}catch(e){
			if (getId('categoryresults') != null)
				getId('categoryresults').innerHTML = e;
		}

	}
	else//hide options
	{
		divOptions.parentNode.removeChild(divOptions);
		getId('optionsLink').style.visibility = 'visible';
	}
}

function saveOptions(evt){
	try {
	var from = getId('optSelLangFrom').value;
	var ctrl = getId('checkCtrl').checked;
	
	GM_setValue('from', from);
	GM_setValue('ctrl', ctrl);
	
	getId('divDic').removeChild(getId('divOpt'));
	getId('optionsLink').style.visibility = 'visible';
	
	internetLookup(0);
	}catch(e){
		if (getId('categoryresults') != null)
			getId('categoryresults').innerHTML = e;
	}
}

function css(){

	var style = createElement('style',{type:"text/css"},null,""+	
		
		//primary formatting for popup box and dictionary box
		'div.divDic {box-shadow: 0pt 0pt 12px 6px rgb(136, 136, 136); text-shadow:none; line-height:normal; background: black; color:#FFFFFF; position:absolute; min-width:250px; min-height:50px; max-width:450px; padding-left:5px;  padding-right:5px;  padding-bottom:0px;  padding-top:0px; font-size:small; text-align:left; z-index:999999999; border-width:2px; border-style:solid; border-radius:6px; width:auto;}'+
		'#divDic div.blackbox {background:white; padding:5px; border-width:2px; border-style:solid; border-radius:6px; margin:0px 0px 8px 0px; overflow-y:auto; overflow-x:hidden; font-size:small; overflow-y:auto; overflow-x:hidden; font-size:small; width:inherit; max-height:340px; border-color:#888888; color:#008087;}'+
		//tab image elements
		'#divDic img.tab_p0 {vertical-align:middle; padding:2px 3px 0px 3px; float:left; display:inline;}'+
		'#divDic img.tab_pr5 {vertical-align:middle; padding:3px 5px 0px 0px; float:left; display:inline;}'+
        //tab list-elements
		'#divDic li.tab_gen {line-height:100%; background:none; display:inline; margin:0px; padding:0px; float:left; vertical-align:middle;}'+
		'#divDic li.tab_li {border-top-right-radius:3px; border-top-left-radius:3px; line-height:100%; height:18px; float:left; display:inline; vertical-align:middle; padding:0px; margin:5px 0px 0px 0px; background-color:rgb(48,48,48); border-color:#888888 #888888 white #888888; border-style:solid; border-width:1px 1px 2px 1px;}'+
		'#divDic li.tab_li_c {border-top-right-radius:4px; border-top-left-radius:4px; line-height:100%; background:none; height:18px; float:left; display:inline; vertical-align:middle; padding:0px; margin:5px 0px 0px 0px; border-width:2px; border-style:solid solid none solid; border-color:white}'+
		'#divDic li.tab_li_sm {line-height:100%; background:none; float:left; display:inline; padding:0px; margin:0px;}'+
		//tab links
		'#divDic a.tab_a {border:none; padding-right:1px; padding-left:1px; display:block; vertical-align:middle; text-decoration:none; color:white;}'+
		'#divDic a.tab_a:hover {background-color:#101010;}'+
		'#divDic a.tab_a_sm {border:none; font-size:10px; padding-right:5px; padding-left:5px; display:block; text-decoration:none; color:white;}'+
		'#divDic a.tab_a_sm:hover {background-color:#707070;}'+
		//dictionary links
		'#dict a.gootranslink:link {color: #333366 !important; text-decoration: none;}'  +  
		'#dict a.gootranslink:visited {color: #333366 !important; text-decoration: none;}'+ 
		'#dict a.gootranslink:hover {color: #333366 !important; text-decoration: underline !important;}'  +
		'#dict a.gootranslink:active {color: #333366 !important; text-decoration: none;}' +
		//general formatting for dictionary elements
		'#dict div{ color: #27222b;}'+
		'#dict span { background: none; color: #27222b; display:inline;}'+
		'#dict table{  background: none; color: #27222b; font-size:13px; border: 1px solid none;}'+
		'#dict td{ background: none; border: 1px solid #ededed; cellpadding: 0; cellspacing: 0; color: #27222b;}'+
		'#dict tr{ background: none; border: 1px solid none; cellpadding: 0; cellspacing: 0;}'+
		//black text for certain dictionary elements
		'#dict p{background: none !important; color:#000000; font-size:12px;}'+
		'#dict h3{ background: none !important; color:#000000; font-size:13px; margin: 4px 4px 4px 4px;}'+
		'#dict h4{ background: none !important; color:#000000; font-size:13px; margin: 4px 4px 4px 4px;}'+
		'#dict h5{ background: none !important; color:#000000; font-size:13px; margin: 4px 4px 4px 4px;}'+
		'#dict ol{ background: none !important; color:#000000; font-size:11px;  margin-left: 3px; max-width:75%;}'+
		//grey2 text for certain dictionary elements
		'#dict h1{background: none !important; color: #7d7d7d; font-size:15px;}'+
		'#dict h2{background: none !important; color: #7d7d7d; font-size:14px;}'+
		'#dict i{color: #7d7d7d;}'+
		//blue-dark text for certain dictionary elements
		'#dict span:first-child {color: #003687;}'+
		'#dict em{color: #003687;}'+
		//blue-sky text for certain dictionary elements
		'#dict b{color: #008087;}'+
		'#dict abbr{color: #008087;}'+
		'#dict strong{color: #008087;}'+
		//Custom formatting for certain websites
		'#dict span.specialformatting_0{color: #008087;}'+ //dictionary.com
		'#dict  div.specialformatting_1{color: #008087;}'+ //MACM
		'#dict span.specialformatting_2{padding:5px;}'+ //oxford
		//green examples
		'#dict em.greensearchterm{color: #067000;}'+
		'#dict p.greensearchterm{color: #067000;}'+
		'#dict div.greensearchterm{color: #067000;}'+
		'#dict td.greensearchterm{color: #067000;}'+
		'#dict span.greensearchterm{color: #067000;}'

	);
	getTag('head')[0].appendChild(style);
}


function createElement(type, attrArray, evtListener, html)
{
	var node = document.createElement(type);

	for (var attr in attrArray) if (attrArray.hasOwnProperty(attr)){
		node.setAttribute(attr, attrArray[attr]);
	}

	if(evtListener){
		var a = evtListener.split(' ');
		node.addEventListener(a[0], eval(a[1]), eval(a[2]));
	} 
 
	if(html) 
		node.innerHTML = html;
	
	return node;
}

function getId(id, parent){
	if(!parent)
		return document.getElementById(id);
	return parent.getElementById(id);	
}

function getTag(name, parent){
	if(!parent)
		return document.getElementsByTagName(name);
	return parent.getElementsByTagName(name);
}

function ehr(p, context, doc) { //element hiding rule filter
	if (!context) 
		context = document;
	if (!doc) 
		doc = document;	
	elem = doc.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < elem.snapshotLength; i++) {
		elem.snapshotItem(i).parentNode.removeChild(elem.snapshotItem(i));
	}
}

/*
 * Drag and drop support adapted fom http://www.hunlock.com/blogs/Javascript_Drag_and_Drop
 */

var savedTarget=null;                           // The target layer (effectively vidPane)
var orgCursor=null;                             // The original mouse style so we can restore it
var dragOK=false;                               // True if we're allowed to move the element under mouse
var dragXoffset=0;                              // How much we've moved the element on the horozontal
var dragYoffset=0;                              // How much we've moved the element on the verticle

var didDrag=false;								//set to true when we do a drag
	
	
function moveHandler(e){
	if (e == null) return;// { e = window.event } 
	if ( e.button<=1 && dragOK ){
		savedTarget.style.left = e.clientX - dragXoffset + 'px';
		savedTarget.style.top = e.clientY - dragYoffset + 'px';
		return false;
	}
}

function dragCleanup(e) {
	document.removeEventListener('mousemove',moveHandler,false);
	document.removeEventListener('mouseup',dragCleanup,false);
	savedTarget.style.cursor=orgCursor;

	dragOK=false; //its been dragged now
	didDrag=true;
	
}

function dragHandler(e){

	var htype='-moz-grabbing';
	if (e == null) return;//{ e = window.event;}  // htype='move';} 
	var target = e.target;// != null ? e.target : e.srcElement;
	orgCursor=target.style.cursor;

	//if(target.nodeName!='DIV')
	//	return;
	if(clickedInsideID(target, 'dict')){
		return false;
	}
		//return;

	if (target = clickedInsideID(target, 'divDic')) {
		savedTarget=target;       
		target.style.cursor=htype;
		dragOK=true;
		dragXoffset = e.clientX-target.offsetLeft;
		dragYoffset = e.clientY-target.offsetTop;
		
		//set the left before removing the right
		target.style.left = e.clientX - dragXoffset + 'px';
		target.style.right = null;
		
		
		document.addEventListener('mousemove',moveHandler,false);
		document.addEventListener('mouseup',dragCleanup,false);
		return false;
	}
}

function clickedInsideID(target, id) {

	if (target != null && id != null) {
		if (target.getAttribute('id')==id)
			return getId(id);
	}
	
	if (target.parentNode) {
		while (target = target.parentNode) {
			try{
				if (target != null & id != null & target.getAttribute != null){
					if (target.getAttribute('id')==id)
						return getId(id);
				}
			}catch(e){
				if (getId('categoryresults') != null)
					getId('categoryresults').innerHTML = 'Error dragging object!<br>'+e;
			}
		}
	}
	
	return null;
}

//end drag code


/*
 * Images
 */
function images()
{
	imgLookup = createElement('img',{style:' border:1px solid rgba(50,50,255,0.3);'});
	imgLookup.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAIkSURBVHjafJPfS5NhFMc/m+9KF6lNZrhVuKRf6kUg3ghJt0IIQVZSN0Ip0U1G9B8IXtRFV9XVKIiaFwUD6SIqcGuji6C6GFQsWbh3YvrOV7e9bu+2p4unvdsbrnN1znnO+Z4f3/M4hBAY+XVBgxhGztLLZpHunhM0EYfz3+RoLMrL8KItalVNNAMQCsCzUIify8sApNUMgGUD3JyeagaA0mik1Qx+X48NqGY3naGQ+y0AviQSPHz0mNnbt/C2u5kLLrJ37K4VmNmBfLHAiunm17YJwMZFF0ptYccDRwBYeBHiaCBA4Nw11Mp/i9O1YOJsdFy9PEFazRD5EEOteGzVp31pZgNZDrkKu+9A38ryfilqS6rJ0D6NQXeOqqgw6mkjprkk3foaStksompbDAc9RC6Ns72p4fX5mdfkzABDPkPSmc1zoTPFPIMWuBNgOCjbPRPy03/yGN52N99ysGK6Aehv04muGLwp9gEw4jEx9DUJ4L9vY5LeB620tDgse9SzQ6Ui+KrBktYKwFTH9zqNQgjhupO0HOa9PpyTYQ6cHwPg7cBnvO1uSmbJitGNMlc+dZNc1+UIVV0eTVXP0HJdLjL76jUjHpOONoWPqyYzcYWZuMKTH7K7iYPZege1JACR02wjJecOMxNXiBbqtL47LTs+G+mUAAC7gewZ7pWL2t9lvVW3N+yn/Dff9iOdk2Gqz8cZeJoiXxL272calp66ccrxZwBv/uuqHYuQPQAAAABJRU5ErkJggg==';
}

// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {

    GM_addStyle = function(css) {
        var style = document.createElement('style');
        style.textContent = css;
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    GM_deleteValue = function(name) {
        localStorage.removeItem(name);
    }

    GM_getValue = function(name, defaultValue) {
      var value = localStorage[name];
      return value == null ? defaultValue : JSON.parse(value);
    }

    GM_log = function(message) {
        console.log(message);
    }

     GM_registerMenuCommand = function(name, funk) {
    //todo
    }

    GM_setValue = function(name, value) {
      localStorage[name] = JSON.stringify(value);
    }
}
