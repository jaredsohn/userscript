// ==UserScript==
// @name         K._Emo
// @namespace    http://vn-icefox.net/
// @version      2.5
// @description  Beautiful Emoticons and Smiley Icon Packs for CAB
// @copyright    2013+, K.
// @include      http://cab.vn/c/*
// @icon         http://eemoticons.net/Upload/Cool%20Face%203/victory.png
// @downloadURL  http://userscripts.org/scripts/source/183615.user.js
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at       document-end
// @grant        none
// ==/UserScript==
var bv_i = 32;
/**
 * This jQuery plugin displays pagination links inside the selected elements. *
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 1.2
 */
jQuery.fn.pagination = function (b, a) {
	a = jQuery.extend({
		items_per_page: bv_i,
		num_display_entries: 4,
		current_page: 0,
		num_edge_entries: 1,
		link_to: "javascript:;",
		prev_text: "<<",
		next_text: ">>",
		ellipse_text: "...",
		prev_show_always: !0,
		next_show_always: !0,
		callback: function () {
			return !1
		}
	}, a || {});
	return this.each(function () {
		function g() {
			var d = Math.ceil(a.num_display_entries / 2),
				c = Math.ceil(b / a.items_per_page),
				g = c - a.num_display_entries,
				g = e > d ? Math.max(Math.min(e - d, g), 0) : 0,
				d = e > d ? Math.min(e + d, c) : Math.min(a.num_display_entries, c);
			return [g, d]
		}

		function c(b, c) {
			e = b;
			f();
			var g = a.callback(b, h);
			g || (c.stopPropagation ? c.stopPropagation() : c.cancelBubble = !0);
			return g
		}

		function f() {
			h.empty();
			var d = g(),
				f = Math.ceil(b / a.items_per_page),
				m = function (a) {
					return function (b) {
						return c(a, b)
					}
				}, l = function (b, c) {
					b = 0 > b ? 0 : b < f ? b : f - 1;
					c = jQuery.extend({
						text: b + 1,
						classes: ""
					}, c || {});
					var d = b == e ? jQuery("<span class='current'>" + c.text + "</span>") : jQuery("<a>" + c.text + "</a>").bind("click", m(b)).attr("href", a.link_to.replace(/__id__/, b));
					c.classes && d.addClass(c.classes);
					h.append(d)
				};
			a.prev_text && (0 < e || a.prev_show_always) && l(e - 1, {
				text: a.prev_text,
				classes: "prev"
			});
			if (0 < d[0] && 0 < a.num_edge_entries) {
				for (var n = Math.min(a.num_edge_entries, d[0]), k = 0; k < n; k++) l(k);
				a.num_edge_entries < d[0] && a.ellipse_text && jQuery("<span>" + a.ellipse_text + "</span>").appendTo(h)
			}
			for (k = d[0]; k < d[1]; k++) l(k);
			if (d[1] < f && 0 < a.num_edge_entries)
				for (f - a.num_edge_entries > d[1] && a.ellipse_text && jQuery("<span>" + a.ellipse_text + "</span>").appendTo(h), k = Math.max(f - a.num_edge_entries, d[1]); k < f; k++) l(k);
			a.next_text &&
				(e < f - 1 || a.next_show_always) && l(e + 1, {
				text: a.next_text,
				classes: "next"
			})
		}
		var e = a.current_page;
		b = !b || 0 > b ? 1 : b;
		a.items_per_page = !a.items_per_page || 0 > a.items_per_page ? 1 : a.items_per_page;
		var h = jQuery(this);
		this.selectPage = function (a) {
			c(a)
		};
		this.prevPage = function () {
			return 0 < e ? (c(e - 1), !0) : !1
		};
		this.nextPage = function () {
			return e < Math.ceil(b / a.items_per_page) - 1 ? (c(e + 1), !0) : !1
		};
		f();
		a.callback(e, this)
	})
};
/**
 * bv_Emo
 * Copyright(c) 2013 Zzbaivong
 */
var newStyle = document.createElement("style");
newStyle.type = "text/css";
newStyle.innerHTML = '#bv_main *{box-sizing:border-box!important;-moz-box-sizing:border-box!important}#bv_main{background: #FFF;border:1px solid #DDD;border-width:1px 1px 0 0;bottom:-247px;float:left;left:-317px;position:fixed;transition:all .5s;-webkit-transition:all .5s;z-index:999;padding:10px!important}#bv_main > div{border-top:1px solid #0084FF;text-align:center;width:336px;padding:5px 0!important}#tab_emo{margin-left: 5px!important;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAWCAYAAADeiIy1AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAEsSURBVEhLrZTNscMgDIQpzaWkFErxKXX4/KpwCe+eA2FBKwRWnPhnZ3Ysy2Q/ZDwJ6aJijF8NXQJ5oZ98C2hPt4NYW9v+7ROxxz7rQyAbYk15fdYuaI6TaxtiDXn3vMIdiIHp9Z/WNVYvk1qfi8Zg1tDYVxABFZKDPRsgNIZ76kBbiEyzcQPiNwz5xR3IhoYQ3PoMCAo9pE0zTYtbj1NZ2eBRDbTkEJyBBD7/2oS2LmvEh0HrnHc84wqQGGHslQ2I2cu+CKo758dB60RlfQMx3NpTBSHgkQ+c9Z6xBmvl1f0CgRoIzrtcEFJekwkvlmd8jc4Z7Uk/bw1EUL5HqHWZ5CQEaqASUnfOMD03Amg5nyPq/oI2sNECPwqBFAQhQIGO+fyMOhDFwNHnldIb4Z9cT1dh2UIAAAAASUVORK5CYII=) no-repeat scroll right top transparent;height:30px;width:100%}#tab_emo li{display:inline;list-style:none outside none}#tab_emo a{color:#0084FF!important;display:inline-block;height:30px;line-height:30px;text-decoration:none;padding:0 10px!important}#tab_emo a.active{background:#0084FF;color:#FFF!important}#bv_emo,#bv_about{display:none}.bv_content{border-bottom:1px dashed #ECECEC;font-size:12px;height:184px;margin-bottom:10px!important;padding:5px 0!important}.bv_pag{display:inline-block;font-size:80%;height:26px;line-height:14px}.bv_pag a{color:#15B;background:#F8F0B3;text-decoration:none}.bv_pag a,.bv_pag span{display:block;float:left;margin-bottom:5px!important;margin-right:5px!important;padding:.3em .5em!important}.bv_emoticon{text-indent:-9999px}.bv_pag .current,.bv_pag a:hover{background:#26B;color:#FFF}.bv_pag .current.prev,.bv_pag .current.next{background:#B6B6B6}#tooltip{text-align:center;background-color:#FFF;border:2px solid #333;color:#131313;max-width:550px;padding:10px}#tooltip .header{background:#333;color:#FFF;margin-bottom:10px;padding:3px 7px}#bv_main .item{width:42px;height:42px;display:block;text-align:center;border:1px solid transparent;float:left;position:relative;padding:2px}#bv_main .item img{max-width:100%;max-height:100%;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto}#bv_main .item:hover{cursor:pointer;border-color:#333}';
document.getElementsByTagName("head")[0].appendChild(newStyle);
var data = {
	emoer: {
		r: "http://emoticoner.com/files/emoticons/",
		pinkmouse: {
			t: "Pink Hamster",
			u: "pink-mouse/",
			n: "afraid ak alarm big-eyes blood bored boxer butterfly cheeks cheerleader climb cockroach-killer cold corn cry cute dance devil dig digger dirty drive drum dummy dummy2 ears evil faint fall fickle football-player frightened give-up go-out goodbye graduation guitar gymnastic hard-love hidden house-fly ice-cube impact in-love jump kick kiss kneel laugh mouse-love move notice olympic police poor prisoner rain rolling run-away sad sayan scared scooter scroll-l scroll-r shower sleep sleeper sorceress stand stupid take-box tennis tin-tin touch water-skiing watermelon writer".split(" "),
			f: "-pink-mouse-emoticon.gif"
		},
		redcrab: {
			t: "Red crab",
			u: "red-crab/",
			n: "confused cry cute giddy happy hello laugh love-kiss love ops shy sleep surprised sword thinking tired tongue well-done".split(" "),
			f: "-red-crab-emoticon.gif"
		},
		yellowonion: {
			t: "Yellow onion",
			u: "yellow_onion_head/yellow-onion-head-emoticon-",
			n: "01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 51
		},
		yellowhairgirl: {
			t: "yellow hair girl",
			u: "yellow_hair_girl/yellow-hair-girl-emoticon-",
			n: "01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 25
		},
		raccoon: {
			t: "Raccoon",
			n: "3-2-1 abashed afraid angry-cry baby big-eyes bored bottle checks calp close-door close-hug cold confused crazy-dance cry-alone cry-dance cry cute-cry cute-dance cute cutey dance-2 dance destroyed disappear dont-know dreadful drink-tea eat electric enjoy entreat evil fake-dance fall-in-love fantazy fart feel-love fire frozen funny-dance fur gift goodbye green-leaf guffaw hahaha happy-ears happy hehe hi hit hot-bath hug in-love kiss kite laugh love-balloon love-heart love-rose mad ninja no nose olympic-flame push-up rain revolve rolling roses run-away run sad sasuke scared scary scratch scream shock shocked-2 shocked shut-up shy-dance shy singer sleep smile sneak snow-man sport-dance star-eyes strained sweat tears tedy thanks thumbs-up toilet tong tremor uneasy wating wave-dance weep why worry yell yes".split(" "),
			f: "-raccoon-emoticon.gif"
		},
		blacko: {
			t: "Blacko",
			u: "blacko/blacko-emoticon-",
			n: "01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 22
		},
		rice_ball: {
			t: "Rice ball",
			u: "rice_ball/rice-ball-smiley-",
			n: "01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 17
		},
		cutecat: {
			t: "Cute cat",
			u: "cute-cat/",
			n: "angry cry drop hungry in-love jgm ko laugh sad screaming sleep star-eyes surprised traveler".split(" "),
			f: "-cute-cat-emoticon.gif"
		},
		pinkcat: {
			t: "Pink cat",
			u: "pink-cat/",
			n: "bitter confused cry cute hit in-love jgm laugh-cute laugh muddy no pirate senseless shy sleep smile surprised tongue vortex worry".split(" "),
			f: "-pink-cat-emoticon.gif"
		},
		whitecloud: {
			t: "White cloud",
			u: "white-cloud/white-cloud-emoticon",
			e: 10
		},
		ugly_chick: {
			t: "Ugly chick",
			u: "ugly_chick/ugly-chick-smiley-",
			n: "01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 47
		},
		cheetah: {
			t: "Cheetah",
			u: "cheetah/",
			n: "bored catch-you clap cry dizzy evil frustrated giant goodbye happy happy-dance in-love loading ninja nose sad scary scream shocked shy sleep sleepy surprised tongue upset very-happy warrior wink worry".split(" "),
			f: "-cheetah-emoticon.gif"
		},
		eggy: {
			t: "Eggy",
			u: "eggy/",
			n: "angered angry arbitrator ashamed challenge confused controlled crazy cry crying dizzy embarrass enraged evil fantasy fly furious get-crazy gift haha9 happy Lollipop mad sad scared scary shout shy sick singer sleep sleepy smile strained surprise sweating tears tired toil tongue tools tremble very-happy worry".split(" "),
			f: "-eggy-emoticon.gif"
		},
		teacup: {
			t: "Tea cup",
			u: "tea-cup/tea-cup-emoticon-",
			n: "01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 29
		},
		mousegirl: {
			t: "Mouse girl",
			u: "mouse-girl/mouse-girl-emoticon-",
			n: "01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 61
		},
		tvbaby: {
			t: "Tv baby",
			u: "tv-baby/tv-baby-emoticon-",
			n: "01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 74
		},
		lupine: {
			t: "Lupine",
			u: "lupine/",
			n: "angel angry blush bomb boy cigarette coffee confused cool cry devil dont-know eat erm evil girl head-phones imac joking kiss kissed lol love macbook money nerd party pirate pizza rose rose-wilted sad scared sick silent sleep smile stop surprised thinking thumb-down thumb-up tongue vampire vicious wink".split(" "),
			f: "-lupine-emoticon.png"
		}
	},
	/* fbemo: {
		r: "http://dl.dropboxusercontent.com/u/126946313/smiley/",
		meep: {
			t: "Meep",
			u: "meep/meep",
			e: 32,
			f: ".png"
		},
		pusheen: {
			t: "Pusheen",
			u: "pusheen/pusheen",
			e: 42,
			f: ".png"
		},
		bun: {
			t: "Bun",
			u: "bun/bun",
			e: 40,
			f: ".png"
		},
		prickly: {
			t: "Prickly Pear",
			u: "prickly/prickly",
			e: 46,
			f: ".png"
		}
	}, */
	eemo: {
		r: "http://eemoticons.net/Upload/",
		rabbit: {
			t: "Rabbit",
			u: "Rabbit/th_",
			n: "10 100 101 102 103 104 105 107 108 11 110 112 113 114 115 116 117 118 119 12 120 121 122 123 124 125 126 127 13 14 15 16 17 18 2 20 21 22 23 24 25 26 27 28 3 30 31 32 33 34 35 36 37 38 39 4 40 42 43 44 45 46 47 48 49 5 50 51 52 53 54 55 56 57 58 59 6 60 61 62 63 64 65 66 67 68 69 7 70 71 72 73 74 75 76 77 78 79 8 80 81 82 83 84 9 92 93 94 95 96 97 98 99".split(" ")
		},
		cutesheep: {
			t: "Cute Sheep",
			u: "Cute Sheep/Cute Sheep Emoticon 0",
			n: "00 01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 20
		},
		leaf: {
			t: "Leaf",
			u: "Leaf/leaf",
			n: [""],
			b: 2,
			e: 21
		},
		yokiegirl: {
			t: "Yokie Girl",
			u: "Yokie Girl/",
			n: "000000;000001;000002;000003;000004;Yokie Girl 0000;Yokie Girl 0001;Yokie Girl 0002;Yokie Girl 0003;Yokie Girl 0004;Yokie Girl 0005;Yokie Girl 0006;Yokie Girl 0007;Yokie Girl 0008;Yokie Girl 0009;Yokie Girl 0010;Yokie Girl 0011;Yokie Girl 0012;Yokie Girl 0013;Yokie Girl 0014;Yokie Girl 0015;Yokie Girl 0016;Yokie Girl 0017;Yokie Girl 0018;Yokie Girl 0019;Yokie Girl 0020;Yokie Girl 0021;Yokie Girl 0022;Yokie Girl 0023;Yokie Girl 0024;Yokie Girl 0025;Yokie Girl 0026;Yokie Girl 0027;Yokie Girl 0028;Yokie Girl 0029;Yokie Girl 0030;Yokie Girl 0031;Yokie Girl 0032;Yokie Girl 0033;Yokie Girl 0035;Yokie Girl 0036;Yokie Girl 0037;Yokie Girl 0038;Yokie Girl 0039;Yokie Girl 0040;Yokie Girl 0041;Yokie Girl 0042;Yokie Girl 0043;Yokie Girl 0044;Yokie Girl 0045;Yokie Girl 0046;Yokie Girl 0047;Yokie Girl 0048;Yokie Girl 0049;Yokie Girl 0050;Yokie Girl 0051;Yokie Girl 0052;Yokie Girl 0053;Yokie Girl 0054;Yokie Girl 0055;Yokie Girl 0056;Yokie Girl 0057;Yokie Girl 0058;Yokie Girl 0059;Yokie Girl 0060;Yokie Girl 0061;Yokie Girl 0062;Yokie Girl 0063;Yokie Girl 0064;Yokie Girl 0065;Yokie Girl 0066;Yokie Girl 0067;Yokie Girl 0069;Yokie Girl 0070;Yokie Girl 0071;Yokie Girl 0072;Yokie Girl 0073;Yokie Girl 0074;Yokie Girl 0076;Yokie Girl 0077;Yokie Girl 0078;Yokie Girl 0079;Yokie Girl 0080;Yokie Girl 0081;Yokie Girl 0082;Yokie Girl 0083;Yokie Girl 0084;Yokie Girl 0085;Yokie Girl 0086;Yokie Girl 0087;Yokie Girl 0088;Yokie Girl 0090;Yokie Girl 0091;Yokie Girl 0092;Yokie Girl 0093;Yokie Girl 0094;Yokie Girl 0095;Yokie Girl 0096;Yokie Girl 0097;Yokie Girl 0099".split(";")
		},
		coolface1: {
			t: "Cool Face 1",
			u: "Cool Face 1/",
			n: "1cool_byebye 1cool_choler 1cool_dribble 1cool_look_down 2cool_after_boom 2cool_beated 2cool_burn_joss_stick 2cool_confident 2cool_go 2cool_hell_boy 2cool_misdoubt 2cool_sad 2cool_sexy_girl 3cool_adore 3cool_angry 3cool_embarrassed 3cool_nosebleed 3cool_shame 4cool_baffle 4cool_beauty 4cool_cold 4cool_confuse 4cool_doubt 4cool_hungry 4cool_oh 5cool_bad_smelly 5cool_beat_plaster 5cool_big_smile 5cool_ops 5cool_still_dreaming 5cool_sweat 6cool_ah 6cool_beat_brick 6cool_beat_shot 6cool_boss 6cool_smile 6cool_sure 6cool_surrender 6cool_what 7cool_extreme_sexy_girl 7cool_feel_good 7cool_spiderman 7cool_waaaht 8cool_amazed 8cool_cool 8cool_cry 8cool_matrix 8cool_rap 8cool_tire 9cool_canny 9cool_haha 9cool_pudency 9cool_sweet_kiss 9cool_too_sad".split(" ")
		},
		coolface3: {
			t: "Cool Face 3",
			u: "Cool Face 3/",
			n: "amazing anger bad_egg bad_smile beaten big_smile big_smile black_heart Cry cry electric_shock exciting eyes_droped Girl girl greedy grimace Haha haha happy horror money nothing nothing_to_say red_heart scorn secret_smile shame shocked super_man the_iron_man unhappy unhappy victory what".split(" "),
			f: ".png"
		},
		gunny: {
			t: "Gunny",
			u: "Gunny/",
			n: "000000;ga sleep;ga-baby;ga-bo-tay;ga-cam-dong;ga-cham-hoi;ga-chay;ga-cry;ga-dance;ga-danh-rang;ga-die;ga-dieu;ga-gian;ga-happy;ga-hoa-mat;ga-karaoke;ga-kenh-kieu;ga-le-luoi;ga-ngap;ga-ngu;ga-sac-mau;ga-sat-thu;ga-say-xin;ga-thap-nhang;ga-to-tinh".split(";")
		},
		kanade: {
			t: "Kanade Avatar",
			u: "Kanade Avatar/Kanade 0",
			n: "00 01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 61,
			f: ".jpg"
		},
		neko: {
			t: "Neko",
			u: "Neko/neko 0",
			n: "00 01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 56
		},
		alphabet: {
			t: "Alphabet",
			u: "Alphabet Colection/Alphabet Emoticons 0",
			n: "00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 55 56 57 58 59 60 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75".split(" ")
		},
		annebaby: {
			t: "Anne Baby",
			u: "Anne Baby/",
			n: "Anne Baby 000;Anne Baby 001;Anne Baby 002 (2);Anne Baby 003 (2);Anne Baby 004 (2);Anne Baby 005 (2);Anne Baby 006;Anne Baby 007;Anne Baby 008;Anne Baby 009;Anne Baby 010;Anne Baby 011;Anne Baby 012;Anne Baby 013;Anne Baby 014;Anne Baby 015;Anne Baby 019;Anne Baby 020;Anne Baby 022;Anne Baby 023 (2);Anne Baby 023;Anne Baby 027;Anne Baby 044;Anne Baby 092".split(";")
		},
		banana: {
			t: "Banana Girl",
			u: "Banana Girl/",
			n: "00 Banana Girl Emoticon 011;1 Banana Girl Emoticon 003;2 Banana Girl Emoticon 017;3 Banana Girl Emoticon 018;4 Banana Girl Emoticon 020;Banana Girl Emoticon 001;Banana Girl Emoticon 002;Banana Girl Emoticon 004;Banana Girl Emoticon 005;Banana Girl Emoticon 006;Banana Girl Emoticon 007;Banana Girl Emoticon 008;Banana Girl Emoticon 009;Banana Girl Emoticon 010;Banana Girl Emoticon 012;Banana Girl Emoticon 013;Banana Girl Emoticon 014;Banana Girl Emoticon 015;Banana Girl Emoticon 016;Banana Girl Emoticon 019;Banana Girl Emoticon 021;Banana Girl Emoticon 022;Banana Girl Emoticon 023;Banana Girl Emoticon 024;Banana Girl Emoticon 025".split(";"),
		},
		bigirl: {
			t: "Bi Girl",
			u: "Bi Girl/Bi Girl0",
			n: "00 01 02 03 04 05 06 07 08 09".split(" "),
			b: 10,
			e: 20
		},
		bigheadcat: {
			t: "Big Head Cat",
			u: "Big Head Cat/",
			n: "0 Big Head Cat 017;1 Big Head Cat 019;2 Big Head Cat 028;3 Big Head Cat 026;5 Big Head Cat 027;Big Head Cat 000;Big Head Cat 001;Big Head Cat 002;Big Head Cat 003;Big Head Cat 004;Big Head Cat 005;Big Head Cat 006;Big Head Cat 007;Big Head Cat 008;Big Head Cat 009;Big Head Cat 011;Big Head Cat 012;Big Head Cat 013;Big Head Cat 015;Big Head Cat 016;Big Head Cat 018;Big Head Cat 020;Big Head Cat 022;Big Head Cat 023;Big Head Cat 024".split(";")
		},
		cashmere: {
			t: "Cashmere Girl",
			u: "Cashmere Girl/",
			n: "00000 NhocCashmere001 NhocCashmere002 NhocCashmere003 NhocCashmere004 NhocCashmere005 NhocCashmere006 NhocCashmere007 NhocCashmere008 NhocCashmere009 NhocCashmere010 NhocCashmere011 NhocCashmere012 NhocCashmere015 NhocCashmere017 NhocCashmere018 NhocCashmere021 NhocCashmere022 NhocCashmere023 NhocCashmere024 NhocCashmere025 NhocCashmere026 NhocCashmere027 NhocCashmere028 NhocCashmere029 NhocCashmere031 NhocCashmere032 NhocCashmere033 NhocCashmere034 NhocCashmere035 NhocCashmere036 NhocCashmere038 NhocCashmere040 NhocCashmere041 NhocCashmere042 NhocCashmere043 NhocCashmere044 NhocCashmere046 NhocCashmere048 NhocCashmere049 NhocCashmere050 NhocCashmere051 NhocCashmere052 NhocCashmere053 NhocCashmere054 NhocCashmere055 NhocCashmere057 NhocCashmere058 NhocCashmere059 NhocCashmere060 NhocCashmere061 NhocCashmere062 NhocCashmere063 NhocCashmere066 NhocCashmere067 NhocCashmere068 NhocCashmere069 NhocCashmere071 NhocCashmere072 NhocCashmere073 NhocCashmere074 NhocCashmere077 NhocCashmere079 NhocCashmere080".split(" ")
		},
		catprincess: {
			t: "Cat Princess",
			u: "Cat Princess/",
			n: "1 Cat Princess 027;2 Cat Princess 024;3 Cat Princess 019;4 Cat Princess 031;5 Cat Princess 011;Cat Princess 001;Cat Princess 003;Cat Princess 005;Cat Princess 006;Cat Princess 007;Cat Princess 009;Cat Princess 015;Cat Princess 016;Cat Princess 017;Cat Princess 021;Cat Princess 023;Cat Princess 025;Cat Princess 026;Cat Princess 029;Cat Princess 030;Cat Princess 033;Cat Princess 037;Cat Princess 039;Cat Princess 2;Cat-Princess-000;Cat-Princess-002;Cat-Princess-004;Cat-Princess-008;Cat-Princess-010;Cat-Princess-012;Cat-Princess-013;Cat-Princess-014;Cat-Princess-018;Cat-Princess-020;Cat-Princess-022;Cat-Princess-028;Cat-Princess-034;Cat-Princess-035;Cat-Princess-038".split(";")
		},
		catstar: {
			t: "Cat Star",
			u: "Cat Star/",
			n: "0 00 01 02 03 04 05 06 07 08 10 11 12 13 14 15 16 17 18 19".split(" ")
		},
		coleqqgirl: {
			t: "Cole QQ Girl",
			u: "Cole QQ Girl/",
			n: "0000000;cole qq speed girl 000;cole qq speed girl 001;cole qq speed girl 002;cole qq speed girl 003;cole qq speed girl 004;cole qq speed girl 005;cole qq speed girl 006;cole qq speed girl 007;cole qq speed girl 008;cole qq speed girl 009;cole qq speed girl 010;cole qq speed girl 011;cole qq speed girl 012;cole qq speed girl 013;cole qq speed girl 014;cole qq speed girl 015;cole qq speed girl 016;cole qq speed girl 017;cole qq speed girl 018;cole qq speed girl 019;cole qq speed girl 020;cole qq speed girl 021;cole qq speed girl 022;cole qq speed girl 024;cole qq speed girl 025;cole qq speed girl 026;cole qq speed girl 027".split(";")
		},
		cutepig: {
			t: "Cute Pig",
			u: "Cute Pig/",
			n: "00000 th_1 th_10 th_11 th_12 th_13 th_14 th_15 th_16 th_17 th_18 th_19 th_2 th_20 th_21 th_22 th_23 th_24 th_25 th_26 th_28 th_29 th_3 th_30 th_31 th_32 th_33 th_34 th_35 th_4 th_5 th_6 th_7 th_8 th_9".split(" ")
		},
		jcdragon: {
			t: "Dragon Brothers",
			u: "Dragon Brothers/",
			n: "000000 jcdragon-@@ jcdragon-ahh jcdragon-awak jcdragon-bad jcdragon-bite jcdragon-bite-ebby jcdragon-com jcdragon-cool jcdragon-crazy jcdragon-cry jcdragon-drink jcdragon-drool jcdragon-eat jcdragon-err jcdragon-fall jcdragon-hehe jcdragon-hi jcdragon-hot jcdragon-hug jcdragon-huh jcdragon-huh-ebby jcdragon-idle jcdragon-kake jcdragon-keke jcdragon-lick jcdragon-lines jcdragon-lol jcdragon-mad jcdragon-mad-ebby jcdragon-man jcdragon-mos jcdragon-music jcdragon-nod jcdragon-nod-ebby jcdragon-pet jcdragon-pet2 jcdragon-poke jcdragon-pounce jcdragon-pray jcdragon-pu jcdragon-QQ jcdragon-scratch jcdragon-shock jcdragon-shock-ebby jcdragon-shy jcdragon-sleep jcdragon-sneeze jcdragon-spin jcdragon-spin1 jcdragon-spin2 jcdragon-stretch jcdragon-tail jcdragon-tail-fast jcdragon-tail-faster jcdragon-tea jcdragon-tired jcdragon-trick jcdragon-want jcdragon-xd jcdragon-xp jcdragon-yawn".split(" ")
		},
		eggemo: {
			t: "Egg Emo",
			u: "Egg Emo/",
			n: "Egg Emo 0001;Egg Emo 0002;Egg Emo 0005;Egg Emo 002;Egg Emo 003;Egg Emo 0037;Egg Emo 004;Egg Emo 005;Egg Emo 006;Egg Emo 012;Egg Emo 013;Egg Emo 014;Egg Emo 016;Egg Emo 017 (2);Egg Emo 017;Egg Emo 018;Egg Emo 020;Egg Emo 020a;Egg Emo 021;Egg Emo 022;Egg Emo 025;Egg Emo 026;Egg Emo 027;Egg Emo 028;Egg Emo 030;Egg Emo 032;Egg Emo 034;Egg Emo 035;Egg Emo 037;Egg Emo 038 (2);Egg Emo 039;Egg Emo 041;Egg Emo 042;Egg Emo 043;Egg Emo 046;Egg Emo-022;Egg-Emo-015;Egg-Emo-019;Egg-Emo-030;Egg-Emo-031;Egg-Emo-032;Egg-Emo-033;Egg-Emo-036;Egg-Emo-038".split(";")
		},
		heilicat: {
			t: "Heili Cat",
			u: "Heili Cat/Heili Cat 0",
			n: "00 01 02 03 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 45 46 47 51 52".split(" ")
		},
		nanasheep: {
			t: "Nana Sheep",
			u: "Nana Sheep/",
			n: "1 Nana Sheep 016;2 Nana Sheep 009;3 Nana Sheep 003;4 Nana Sheep 004;5 Nana Sheep 007;Nana Sheep 000;Nana Sheep 001;Nana Sheep 002;Nana Sheep 005;Nana Sheep 006;Nana Sheep 008;Nana Sheep 010;Nana Sheep 011;Nana Sheep 012;Nana Sheep 013;Nana Sheep 014;Nana Sheep 015;Nana Sheep 017;Nana Sheep 018;Nana Sheep 019".split(";")
		},
		ufo: {
			t: "UFO",
			u: "UFO/",
			n: "0000 1 10 11 12 13 14 15 16 17 18 19 2 20 21 22 23 24 25 26 43 44 45 46 47 48 49 5 50 51 52 53 54 55 57 58 59 6 60 61 7 8 9 main".split(" ")
		},
		teddybear: {
			t: "Teddy Bear",
			u: "Teddy Bear/",
			n: "00000 TeddyBear0 TeddyBear1 TeddyBear11 TeddyBear12 TeddyBear13 TeddyBear14 TeddyBear15 TeddyBear16 TeddyBear17 TeddyBear18 TeddyBear19 TeddyBear2 TeddyBear20 TeddyBear3 TeddyBear4 TeddyBear5 TeddyBear6 TeddyBear7 TeddyBear8 TeddyBear9".split(" ")
		},
		strawberrybaby: {
			t: "Strawberry Baby",
			u: "Strawberry Baby/Strawberry Baby 0",
			n: "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 44".split(" ")
		},
		orange: {
			t: "Orange",
			u: "Orange/orange",
			b: 1,
			e: 38
		},
		lunaonline: {
			t: "Luna Online",
			u: "Luna Online/",
			n: "01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45".split(" ")
		},
		loveicons: {
			t: "Love Icons",
			u: "Love Icons/Love icon",
			n: "000 002 003 004 005 006 007 008 009 010 011 012 013 014 015 016 017 018 019 020 021 022 023 024 025 026 027 028 029 030 031 033 034 035 036 037 038 039 040 041 042 043 044 045 046 047 048 049 050 051 052 053 054 056 057 058 059 060 061 062 063 064 065 066 067 068 069 070 071 072 073 074 075 076 077 078 079 080 081 082 083 084 085 086 087 088 089 090 091 092 093 094 095 096 097 098 099".split(" "),
			b: 100,
			e: 138
		}
	},
	umh: {
		r: "http://blog.uhm.vn/emo/",
		babysoldier: {
			t: "Baby Soldier",
			e: 122
		},
		binhsua: {
			t: "Milk Bottle",
			e: 173
		},
		bagiaxanh: {
			t: "Green Scarf",
			e: 57
		},
		banhbao: {
			t: "Dango",
			e: 55
		},
		bobototo: {
			t: "Bobo Toto",
			e: 97
		},
		bpopo: {
			t: "Cool Face 2",
			e: 87
		},
		caodo: {
			t: "Red Fox",
			e: 39
		},
		chikas: {
			t: "Chikas",
			e: 116
		},
		echxanh: {
			t: "Green Frog",
			e: 86
		},
		girlcatinh: {
			t: "Little Girl",
			e: 70
		},
		meoden: {
			t: "Black Cat",
			e: 22
		},
		meotrang: {
			t: "White Cat",
			e: 28
		},
		meemo: {
			t: "Meemo Rabbit",
			e: 47
		},
		panda: {
			t: "Panda",
			e: 93
		},
		kytu: {
			t: "Cute Characters",
			e: 102
		},
		heoden: {
			t: "HeyHey Pig",
			e: 110
		},
		heohong: {
			t: "BeyBey Pig",
			e: 35
		},
		heotron: {
			t: "Lovely Pig",
			e: 43
		},
		hamster: {
			t: "Hamster",
			e: 45
		},
		hodo: {
			t: "Bofu",
			e: 70
		},
		onion: {
			t: "Onion",
			e: 139
		},
		laluot: {
			t: "Tuzki Rabbit",
			e: 78
		},
		thotrang: {
			t: "White Rabbit",
			e: 60
		},
		vitcon: {
			t: "Cute Ducks",
			e: 29
		},
		yoyocici: {
			t: "YoYo CiCi",
			e: 210
		},
		yahoo: {
			t: "Yahoo",
			e: 79
		}
	}
}, bv_current, bv_url, bv_path, bv_type, bvE = {
		versionMinor: "",
		versionMajor: "",
		IE: "",
		IE7: "",
		OP: window.opera,
		FF: document.getElementById,
		NS: document.layers,
		offsetxpoint: -60,
		offsetypoint: 20,
		real_body: "",
		real_body: "",
		current_tooltip: "",
		get_item: function (a, b) {
			bvE.versionMinor = parseFloat(navigator.appVersion);
			bvE.versionMajor = parseInt(bvE.versionMinor);
			bvE.IE = document.all && !window.opera && 7 > bvE.versionMajor;
			bvE.IE7 = document.all && !window.opera && 7 <= bvE.versionMajor;
			if (bvE.IE) return b ? window.opener.document.all[a] : document.all[a];
			if (bvE.FF) return b ?
				window.opener.document.getElementById(a) : document.getElementById(a);
			if (bvE.NS) return b ? window.opener.document.layers[a] : document.layers[a]
		},
		show_tooltip: function (a, b, d) {
			var c = bvE.get_item("tooltip");
			b = '<img alt="bv_Emo" src="' + b + '" />';
			c || (c = document.createElement("div"), c.setAttribute("id", "tooltip"), document.body.appendChild(c));
			c.style.zIndex = 99999;
			c.style.position = "absolute";
			c.innerHTML = d ? '<p class="header">' + d + "</p><p>" + b + "</p>" : "<p>" + b + "</p>";
			c.style.visibility = "visible";
			a.onmousemove = bvE.move_tooltip;
			a.onmouseout = function () {
				c.style.visibility = "hidden"
			};
			document.getElementById("tooltip").onmouseover = function () {
				this.style.visibility = "hidden"
			}
		},
		move_tooltip: function (a) {
			bvE.real_body = document.compatMode && "BackCompat" != document.compatMode ? document.documentElement : document.body;
			bvE.real_body = document.documentElement ? document.documentElement : document.body;
			var b = bvE.IE ? event.clientX + bvE.real_body.scrollLeft : a.pageX,
				d = bvE.IE ? event.clientY + bvE.real_body.scrollTop : a.pageY,
				c = bvE.IE && !window.opera ? bvE.real_body.clientWidth -
					event.clientX - bvE.offsetxpoint : window.innerWidth - a.clientX - bvE.offsetxpoint - 20,
				e = bvE.IE && !window.opera ? bvE.real_body.clientHeight - event.clientY - bvE.offsetypoint : window.innerHeight - a.clientY - bvE.offsetypoint - 20,
				f = 0 > bvE.offsetxpoint ? -1 * bvE.offsetxpoint : -1E3;
			bvE.current_tooltip = bvE.get_item("tooltip");
			bvE.current_tooltip.style.left = c < bvE.current_tooltip.offsetWidth ? bvE.IE ? bvE.real_body.scrollLeft + event.clientX - bvE.current_tooltip.offsetWidth + "px" : window.pageXOffset + a.clientX - bvE.current_tooltip.offsetWidth +
				"px" : b < f ? "5px" : b + bvE.offsetxpoint + "px";
			bvE.current_tooltip.style.top = e < bvE.current_tooltip.offsetHeight ? bvE.IE ? bvE.real_body.scrollTop + event.clientY - bvE.current_tooltip.offsetHeight - bvE.offsetypoint + "px" : window.pageYOffset + a.clientY - bvE.current_tooltip.offsetHeight - bvE.offsetypoint + "px" : d + bvE.offsetypoint + "px"
		},
		create_emo: function (a, b) {
			var d = eval("data." + a + "." + b);
			$("#_emo").text(d.t);
			bv_url = eval("data." + a).r;
			bv_path = d.u;
			void 0 == bv_path && (bv_path = b + "/");
			var c = d.n;
			void 0 == c && (c = []);
			var e = d.b;
			void 0 ==
				e && (e = 1);
			var f = d.e,
				h = [];
			if (void 0 != f)
				for (var g = e; g <= f; g++) h[g - e] = g;
			bv_type = d.f;
			void 0 == bv_type && (bv_type = ".gif");
			bv_current = c.concat(h);
			$("#bv_emo .bv_pag").pagination(bv_current.length, {
				callback: bvE.bv_emo
			});
			$("#_emo").click()
		},
		create_list: function (a) {
			$.each(a, function (a, d) {
				$.each(this, function (c, e) {
					if ("r" != c) {
						var f = e.u;
						void 0 == f && (f = c + "/");
						var h = e.e;
						void 0 == h && (h = e.n[0]);
						var g = e.f;
						void 0 == g && (g = ".gif");
						f = encodeURI(d.r + f + h + g);
						$("#bv_list .bv_content").append('<div id="' + c + '" data-emo="' + a + '" class="item click_emo"><img alt="' +
							e.t + '" src="' + f + '" /></div>')
					}
				})
			})
		},
		bv_emo: function (a) {
			$("#bv_emo .bv_content").empty();
			for (var b = bv_i * a; b < bv_i * a + bv_i; b++)
				if (void 0 != bv_current[b]) {
					var d = encodeURI(bv_url + bv_path + bv_current[b] + bv_type);
					$("#bv_emo .bv_content").append('<div class="item"><img class="bv_emoticon" src="' + d + '" /></div>')
				}
		},
		bv_list: function (a) {
			a = bv_i * (a + 1);
			$("#bv_list .bv_content .item").hide();
			$("#bv_list .bv_content .item:lt(" + a + ")").show();
			$("#bv_list .bv_content .item:lt(" + (a - bv_i) + ")").hide()
		},
		start: function () {
			var a;
			bvE.create_list(data);
			$("#_list").addClass("active");
			$("#tab_emo a").click(function () {
				$("#tab_emo .active").removeClass();
				$(this).addClass("active");
				$("#bv_main > div").hide();
				$("#bv" + this.id).show()
			});
			if (-1 != document.cookie.indexOf("bv_emo_last")) {
				var b = document.cookie.match(/bv_emo_last\=([^\;]+)\;/)[1].split("|");
				bvE.create_emo(b[0], b[1]);
				$("#_emo").click()
			} else bvE.create_emo("umh", "yahoo");
			$(".click_emo").click(function () {
				document.cookie = "bv_emo_last=" + $(this).data("emo") + "|" + this.id + '; expires=Thu, 30 Dec 2099 12:00:00 GMT;" path=/';
				bvE.create_emo($(this).data("emo"), this.id)
			});
			$(window).on("keydown keyup", function (b) {
				a = b.ctrlKey
			});
			$(document).on("click", function () {
				$("#bv_main").css({
					left: -317,
					bottom: -247
				})
			});
			$("#bv_main").on("mouseover", "#bv_main .item", function () {
				var a = $("img", $(this))[0];
				bvE.show_tooltip(this, a.src, a.alt)
			}).on("mouseover click", function (a) {
				$("#bv_main").css({
					left: 0,
					bottom: 0
				});
				a.stopPropagation()
			}).on("click", "#bv_emo .item", function () {
				$("#comment").val($("#comment").val() + "![title](" + $("img", $(this))[0].src + ")").focus();
                a || $("#chatbox_footer form").submit()
			});
			$("#bv_list .bv_pag").pagination($("#bv_list img").length, {
				callback: bvE.bv_list
			})
		}
	};
$(function () {
    $("#comment").length && ($("body").append('<div id="bv_main"><ul id="tab_emo"><li><a id="_list"href="#categories">Danh s\u00e1ch</a></li><li><a id="_emo"href="#emoticons">Meep</a></li><li><a id="_about"href="#about">?</a></li></ul><div id="bv_list"><div class="bv_content"></div><div class="bv_pag"></div></div><div id="bv_emo"><div class="bv_content"></div><div class="bv_pag"></div></div><div id="bv_about"><div class="bv_content" style="text-align:justify"><span style="font-size: 24px; line-height: normal"><strong><font color="#ff3333">K._EmoforCAB</font></strong></span> <small>(version 2.5)</small><br><br><em>This emo make for CAB, integrated many different emoticon, inspired by the style and emo of baivong. Wish you happy to use it!<br>Chi ti\u1ebft xem t\u1ea1i: <a class="copyright" href="http://vn-icefox.net" target="_blank" alt="VnIceFox">VnIF</a></em></div><div class="bv_pag">Copyright \u00a9 2013 <strong>K. - <a href="http://cab.vn/p/K.">CAB.VN</a></strong>. All rights reserved.</div></div></div>'), bvE.start())
});