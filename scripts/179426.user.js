// ==UserScript==
// @name          prettify
// @description   prettify makes the web look better when you want to look closely.
// @run-at        document-start
// @version       0.2.1
// @updateURL     https://userscripts.org/scripts/source/179426.meta.js
// @downloadURL   https://userscripts.org/scripts/source/179426.user.js
// ==/UserScript==

function prettify() {

	var wind = window,
	dotsplitlocationhost = wind.location.host.split('.'),
	doc = document,
	images = doc.images,
	imagesNum = images.length;

	// Use the SVG version of Wikimedia Foundation project logos
	if(dotsplitlocationhost[1] == 'wikipedia' && dotsplitlocationhost[2] == 'org'){
		var servers = {
				wikipedia: {
					en: 'b3',
					de: '9e',
					fr: 'd1',
					pl: 'db',
					it: '90',
					ja: '1f',
					nl: 'd3',
					es: '1e',
					pt: '7f',
					ru: '77',
					sv: '94',
					zh: {
						0: 'a0',
						hans: '36',
						yue: '34',
						min: {
							nan: 'cc'
							},
						classical: '06'
						},
					no: '43',
					ca: '41',
					fi: '8d',
					uk: '1f',
					cs: '3a',
					hu: '48',
					tr: '83',
					ro: '55',
					ko: '67',
					eo: '03',
					da: 'b8',
					ar: 'bb',
					id: '57',
					vo: 'd8',
					vi: 'fb',
					sk: '90',
					sr: '41',
					lt: 'ca',
					he: '42',
					bg: 'ed',
					fa: 'fb',
					sl: '72',
					hr: 'fb',
					et: '8f',
					ms: 'f7',
					new: '6f',
					th: '9d',
					simple: '95',
					gl: 'de',
					nn: 'f2',
					eu: '9a',
					hi: 'b6',
					ht: '70',
					el: '6c',
					te: '29',
					ceb: 'd3',
					mk: '97',
					la: 'a0',
					ka: '2b',
					br: 'a2',
					az: '53',
					sh: 'dc',
					bs: '2a',
					lb: '67',
					is: 'a9',
					mr: '0e',
					cy: 'fb',
					lv: 'a5',
					jv: '57',
					sq: 'b7',
					tl: '0f',
					bpy: '06',
					pms: 'c2',
					be: {
						0: '0f',
						x: {
							old: '7e'
							}
						},
					war: '82',
					ta: '80',
					bn: 'e5',
					oc: '55',
					an: '7f',
					io: '76',
					sw: '70',
					scn: '82',
					fy: 'f0',
					qu: '57',
					af: '19',
					su: 'b0',
					gu: '01',
					ast: '5b',
					nap: 'b4',
					ur: '33',
					ku: 'b0',
					bat: {
						smg: '3e'
						},
					ml: 'e6',
					wa: '10',
					cv: '5b',
					lmo: '4c',
					ksh: 'd1',
					ga: 'f8',
					tg: '27',
					roa: {
						tara: '87',
						rup: '17'
						},
					hy: '28',
					vec: 'e6',
					kn: 'e1',
					gd: '92',
					uz: 'c1',
					yi: '95',
					pam: '8a',
					yo: 'b0',
					mi: '32',
					kk: '34',
					als: 'b3',
					sah: '5a',
					nah: 'c1',
					li: '3d',
					glk: '4d',
					tt: '09',
					hsb: '2f',
					co: '10',
					arz: '0a',
					os: '4d',
					ia: '96',
					gan: '19',
					bcl: '06',
					mn: '27',
					fiu: {
						vro: '1e'
						},
					nds: {
						0: 'b8',
						nl: '3d'
						},
					vls: '66',
					pnb: 'a0',
					fo: '6f',
					tk: '6d',
					sa: '2b',
					am: '50',
					dv: 'c5',
					ne: '7e',
					nrm: 'ef',
					pag: '25',
					rm: 'bc',
					bar: 'a4',
					gv: 'be',
					map: {
						bms: '54'
						},
					wuu: '64',
					my: '97',
					sco: '7e',
					diq: 'bc',
					se: 'fe',
					fur: '73',
					lij: 'f2',
					si: 'f5',
					ug: 'f1',
					nov: 'f2',
					mt: '48',
					bh: '42',
					mzn: 'fc',
					csb: '72',
					ilo: '9c',
					pi: '77',
					lad: '98',
					km: '9a',
					sc: '47',
					mg: '4d',
					frp: '7a',
					ang: 'b2',
					kw: '77',
					hif: 'e7',
					pdc: '0d',
					haw: 'f4',
					ckb: '67',
					szl: '24',
					bo: 'e3',
					pa: '58',
					ps: '0b',
					ie: 'c3',
					hak: 'fe',
					kv: '65',
					to: '55',
					crh: 'c6',
					stq: 'a6',
					myv: '02',
					gn: '86',
					ln: 'fe',
					ace: '53',
					mhr: 'b4',
					nv: 'e0',
					ky: '92',
					ext: '2b',
					arc: '43',
					jbo: 'ee',
					wo: '3c',
					cbk: {
						zam: '74'
						},
					ty: 'a6',
					tpi: '8d',
					eml: 'd5',
					kab: '22',
					so: '7e',
					xal: '48',
					zea: 'be',
					srn: 'ef',
					pap: '40'
				}
			},
			lang = dotsplitlocationhost[0],
			hyphensplitlang = lang.split('-'),
			site = dotsplitlocationhost[1],
			server;
		if(hyphensplitlang[2]) server = servers[site][hyphensplitlang[0]][hyphensplitlang[1]][hyphensplitlang[2]];
		else if(hyphensplitlang[1]) server = servers[site][hyphensplitlang[0]][hyphensplitlang[1]];
		else server = servers[site][lang];
		if(typeof server == 'object') server = server[0];
		if(lang == 'www' && site == 'wikipedia') doc.querySelector('.central-featured-logo-inner img').setAttribute('src', 'http://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg');
		if(server && site == 'wikipedia') doc.querySelector('#p-logo a').style.backgroundImage = ['url(http://upload.wikimedia.org/wikipedia/commons/', server[0], '/', server, '/Wikipedia-logo-v2-', lang, '.svg)'].join();
	}

	if(window.location.host == 'commons.wikimedia.org') {
		var logo = doc.querySelector('#p-logo a');
		logo.style.backgroundImage = 'url(http://upload.wikimedia.org/wikipedia/commons/4/41/Commons-logo-en.svg)';
		logo.style.backgroundSize = '135px 155px';
	}

	// Replace MediaWiki thumbnails with full size images
	if(doc.querySelector('body.mediawiki')) {
		var imgs = doc.querySelectorAll('body.mediawiki #content img, body.mediawiki #WikiaMainContent img'),
			img, src;
			for(var i=0;i<imgs.length;i++){
				img = imgs[i];
				src = img.src;
				if(src.indexOf('/thumb/') != -1) {
					src = src.replace('/thumb/', '/');
					src = src.substr(0, src.lastIndexOf('/'));
					img.src = src;
				}
			}
	}
	
	// Replace Steam Store 'capsules' with full size headers
	
	if(wind.location.host == 'store.steampowered.com' || wind.location.host == 'steamcommunity.com') {
		var imgSrc, i;
		for(i=0; i<imagesNum; i++) {
			imgSrc = images[i].src;
			if(imgSrc.search(/(capsule|header)_[0-9]*x[0-9]*/) != -1) images[i].src = imgSrc.replace(/(capsule|header)_[0-9]*x[0-9]*/, 'header');
		};
	}
	
}

prettify();

new MutationObserver(prettify).observe(document.documentElement, {childList: true});