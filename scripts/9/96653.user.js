// ==UserScript==
// @name           fake3gokushiRandom
// @version        0.0.1
// @namespace      http://userscripts.org/scripts/edit/96653
// @description    mixi版 ブラウザ三国志のイラストを、某ゲームのものにランダムに置き換えるスクリプトです。無理してます。ごめんなさい。
// @include        http://*.3gokushi.jp/*
// @run-at         document-start
// ==/UserScript==
( function(){
//----更新履歴----
// ver0.0.1: とりあえず初回分として作成

	/* 「袁術」用の画像テーブル */
	var listEnjutsu = new Array(
		{/* 00 */
			big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6IukU8SI/AAAAAAAAAz4/RxvNHm3_svA/enjutsu_000.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6JP1pyEI/AAAAAAAAAz8/py8pCRpDISg/enjutsu_000_R.png",
			UC  : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6JsWywrI/AAAAAAAAA0A/4XB69eu5zmk/enjutsu_000_UC.png"
		},
		{/* 01 */
			big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6J7ovr_I/AAAAAAAAA0E/-zV-3GHVTGI/enjutsu_001.png",
			R   : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6KHHq1jI/AAAAAAAAA0I/06F5Lv2TShY/enjutsu_001_R.png",
			UC  : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6Ko4CySI/AAAAAAAAA0M/VQ6qb5FwU48/enjutsu_001_UC.png"
		},
		{/* 02 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6ZNwX_-I/AAAAAAAAA0Q/hPekoZwm5lM/enjutsu_002.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6ZRqw3kI/AAAAAAAAA0U/jr4KIZovDTA/enjutsu_002_R.png",
			UC  : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6Z0fCxRI/AAAAAAAAA0Y/ySx2zqak-3w/enjutsu_002_UC.png"
		},
		{/* 03 */
			big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6aaxh7pI/AAAAAAAAA0c/i6BBQdmaYfw/enjutsu_003.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6azdyhxI/AAAAAAAAA0g/ub19i7bIayA/enjutsu_003_R.png",
			UC  : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6bcsyswI/AAAAAAAAA0k/i-RyrXS9_Bc/enjutsu_003_UC.png"
		},
		{/* 04 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6bxPUKHI/AAAAAAAAA0o/_aUduQ86FBc/enjutsu_004.png",
			R   : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6cYfflLI/AAAAAAAAA0s/Yyc5Eny9pkY/enjutsu_004_R.png",
			UC  : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6cpreo6I/AAAAAAAAA0w/hrUKOObQ-D8/enjutsu_004_UC.png"
		},
		{/* 05 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6iZAeA1I/AAAAAAAAA1k/8zkfT8HxK4g/enjutsu_009.png",
			R   : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6i8QDVdI/AAAAAAAAA1o/9xSu2th21ro/enjutsu_009_R.png",
			UC  : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6jAqQOTI/AAAAAAAAA1s/xc18PJUntP8/enjutsu_009_UC.png"
		},
		{/* 06 */
			big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6j7YCwSI/AAAAAAAAA1w/xleij7Ev3hw/enjutsu_010.png",
			R   : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6kCi46_I/AAAAAAAAA10/0k3bz5kN880/enjutsu_010_R.png",
			UC  : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6kjTFXwI/AAAAAAAAA14/ep1_bNjf0So/enjutsu_010_UC.png"
		},
		{/* 07 */
			big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6lP4tXxI/AAAAAAAAA18/l-O0jr5M1oo/enjutsu_011.png",
			R   : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6lrsxCJI/AAAAAAAAA2A/kF0ve3KBN-g/enjutsu_011_R.png",
			UC  : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6l534-YI/AAAAAAAAA2E/wEpt54DxLq4/enjutsu_011_UC.png"
		},
		{/* 08 */
			big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6mh5_H2I/AAAAAAAAA2I/wbJBP3JnqnQ/enjutsu_012.png",
			R   : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6mwBVTvI/AAAAAAAAA2M/_3Y372VBAvE/enjutsu_012_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6nRL5S3I/AAAAAAAAA2Q/JxoVjwtV1h4/enjutsu_012_UC.png"
		},
		{/* 09 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6r4zI4qI/AAAAAAAAA24/bRO3ZupkkfA/enjutsu_016.png",
			R   : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6sAuD2iI/AAAAAAAAA28/5P05DaCcgjI/enjutsu_016_R.png",
			UC  : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6skkuJTI/AAAAAAAAA3A/Frf4DS68DdI/enjutsu_016_UC.png"
		},
		{/* 10 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6tCH_onI/AAAAAAAAA3E/QDS966E_waA/enjutsu_017.png",
			R   : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6tXbG9xI/AAAAAAAAA3I/a1ESEdfCpfo/enjutsu_017_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6tpwUb8I/AAAAAAAAA3M/rrdnEKdOKfg/enjutsu_017_UC.png"
		},
		{/* 11 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6uOrzkII/AAAAAAAAA3Q/ItWmzBYWCfs/enjutsu_018.png",
			R   : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6uafG0PI/AAAAAAAAA3U/bM_uBaAW4zU/enjutsu_018_R.png",
			UC  : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6u0EFy6I/AAAAAAAAA3Y/izcxTkf3ckM/enjutsu_018_UC.png"
		},
		{/* 12 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6zdqOhyI/AAAAAAAAA4E/iGrv-lU-68A/enjutsu_022.png",
			R   : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6zhTaAOI/AAAAAAAAA4I/CpBk2kMelX8/enjutsu_022_R.png",
			UC  : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR60B7j0EI/AAAAAAAAA4M/U-1oLYR_zhY/enjutsu_022_UC.png"
		},
		{/* 13 */
			big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR60kH2-gI/AAAAAAAAA4Q/ZwwD9vvoYkw/enjutsu_023.png",
			R   : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6074LkmI/AAAAAAAAA4U/ctmWSZ0e8UM/enjutsu_023_R.png",
			UC  : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR61bHiyTI/AAAAAAAAA4Y/dkvh3XZ0pvg/enjutsu_023_UC.png"
		},
		{/* 14 */
			big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR61_D_0iI/AAAAAAAAA4c/7DnTWpnpsf8/enjutsu_024.png",
			R   : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR62ZlfjCI/AAAAAAAAA4g/dXHfFPIBwYA/enjutsu_024_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR62iJIlRI/AAAAAAAAA4k/9uQM--wHx8o/enjutsu_024_UC.png"
		},
		{/* 15 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR63A6P_3I/AAAAAAAAA4o/-VYkT3O0j4U/enjutsu_025.png",
			R   : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR63bLCdJI/AAAAAAAAA4s/mQAVHaKruVA/enjutsu_025_R.png",
			UC  : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR636sNSnI/AAAAAAAAA4w/irKGK0I8PIU/enjutsu_025_UC.png"
		},
		{/* 16 */
			big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR64ZcNisI/AAAAAAAAA40/FqYk4R5EDJw/enjutsu_026.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR64oS_2aI/AAAAAAAAA44/Pil-bR9DqaI/enjutsu_026_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR64wbjewI/AAAAAAAAA48/GqhK5xduq-8/enjutsu_026_UC.png"
		},
		{/* 17 */
			big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR65QaNVPI/AAAAAAAAA5A/rweDZAJebUE/enjutsu_027.png",
			R   : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR65ylNpfI/AAAAAAAAA5E/Vbl1QC2Dblk/enjutsu_027_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR66RkFVmI/AAAAAAAAA5I/rxRHD1jz7J8/enjutsu_027_UC.png"
		},
		{/* 18 */
			big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR66lX7gFI/AAAAAAAAA5M/PPfMvy4Vhrg/enjutsu_028.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR67Ia1TtI/AAAAAAAAA5Q/FUWMY9hTFoc/enjutsu_028_R.png",
			UC  : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR67Ug2-ZI/AAAAAAAAA5U/h1ChIgcaI58/enjutsu_028_UC.png"
		},
		{/* 19 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR671DA_HI/AAAAAAAAA5Y/PTIxKI7uJLw/enjutsu_029.png",
			R   : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR68cY1y9I/AAAAAAAAA5c/taLvLEPubmQ/enjutsu_029_R.png",
			UC  : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR684fYQfI/AAAAAAAAA5g/WhQLdInwGSY/enjutsu_029_UC.png"
		},
		{/* 20 */
			big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR69etNmNI/AAAAAAAAA5k/XoKxf7P9WNo/enjutsu_030.png",
			R   : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR69ui9NhI/AAAAAAAAA5o/KNiIXpd2-S8/enjutsu_030_R.png",
			UC  : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6-Q5UYOI/AAAAAAAAA5s/ErsnoBM-oBg/enjutsu_030_UC.png"
		},
		/*------- ↓これより下はコスプレ衣装バージョン↓ -------------------------------------------------*/
		{/* 21 */
			big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6dBmNkkI/AAAAAAAAA00/SNJmNe3iFnU/enjutsu_005.png",
			R   : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6dueFSUI/AAAAAAAAA04/mST5pfwlzfM/enjutsu_005_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6dxr_tXI/AAAAAAAAA08/rOWMs0f5CBg/enjutsu_005_UC.png"
		},
		{/* 22 */
			big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6efRoKFI/AAAAAAAAA1A/PibyGlyxwd4/enjutsu_006.png",
			R   : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6exFzyWI/AAAAAAAAA1E/_lCv56vxoPo/enjutsu_006_R.png",
			UC  : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6fHxB9xI/AAAAAAAAA1I/NQAtE5-vGlQ/enjutsu_006_UC.png"
		},
		{/* 23 */
			big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6fqfSboI/AAAAAAAAA1M/nsfbH_UC9r8/enjutsu_007.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6gMlJtqI/AAAAAAAAA1Q/IFxs7FuYHFA/enjutsu_007_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6gs7QMJI/AAAAAAAAA1U/MAFPTRNVXVI/enjutsu_007_UC.png"
		},
		{/* 24 */
			big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6hPHdxpI/AAAAAAAAA1Y/K20Q_XD6SGo/enjutsu_008.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6hfAUNUI/AAAAAAAAA1c/wG_a2AjxvGo/enjutsu_008_R.png",
			UC  : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6h6NapBI/AAAAAAAAA1g/HZleJGM5pEE/enjutsu_008_UC.png"
		},
		{/* 25 */
			big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6n2dl4uI/AAAAAAAAA2U/wtRKqcLxqoY/enjutsu_013.png",
			R   : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6oUcFr9I/AAAAAAAAA2Y/vSHjLW1ctsc/enjutsu_013_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6ori48tI/AAAAAAAAA2c/BHkOLYgDjqk/enjutsu_013_UC.png"
		},
		{/* 26 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6pZTy0JI/AAAAAAAAA2g/pRYUCYPgDKw/enjutsu_014.png",
			R   : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6pj219sI/AAAAAAAAA2k/d4fqvGpWB-E/enjutsu_014_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6p0ZjOxI/AAAAAAAAA2o/JHEPrf6eXkM/enjutsu_014_UC.png"
		},
		{/* 27 */
			big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6qc5QN7I/AAAAAAAAA2s/Geb8-YrAHA4/enjutsu_015.png",
			R   : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6qw0hFzI/AAAAAAAAA2w/Yj8HLikzCCs/enjutsu_015_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6rP_mh3I/AAAAAAAAA20/Vx17r_J03fc/enjutsu_015_UC.png"
		},
		{/* 28 */
			big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6vcU_UCI/AAAAAAAAA3c/P7CaEBJ1tOU/enjutsu_019.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6v-p6mvI/AAAAAAAAA3g/_0U3UUUYML0/enjutsu_019_R.png",
			UC  : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6wBnR7gI/AAAAAAAAA3k/knblLuzb76Y/enjutsu_019_UC.png"
		},
		{/* 29 */
			big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6wiu0C1I/AAAAAAAAA3o/HXgHPaqKDg4/enjutsu_020.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6xI4lcPI/AAAAAAAAA3s/FDTLHAY-u60/enjutsu_020_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6xmQQyXI/AAAAAAAAA30/kC0HbPNY9a0/enjutsu_020_UC.png"
		},
		{/* 30 */
			big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6yL9ISfI/AAAAAAAAA34/sfkzpTgOnjk/enjutsu_021.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR6yTSsAUI/AAAAAAAAA38/FoZcy9kPV_o/enjutsu_021_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR6ywezhMI/AAAAAAAAA4A/_XgQ3k4YrUE/enjutsu_021_UC.png"
		},
		{/* 31 */
			big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6-mzmWQI/AAAAAAAAA5w/sgvdjpQGNak/enjutsu_031.png",
			R   : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR6_Cw87dI/AAAAAAAAA50/HoBzdQEUh6o/enjutsu_031_R.png",
			UC  : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6_T8W_gI/AAAAAAAAA54/LdV7LzQjQ-o/enjutsu_031_UC.png"
		},
		{/* 32 */
			big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR6_zJELvI/AAAAAAAAA58/E7X_CdgQ-Do/enjutsu_032.png",
			R   : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR7ASZVVMI/AAAAAAAAA6A/kMjyv0fgTEg/enjutsu_032_R.png",
			UC  : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR7Agg7g7I/AAAAAAAAA6E/tzWqjIaA7VE/enjutsu_032_UC.png"
		},
		{/* 33 */
			big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR7BAWEZlI/AAAAAAAAA6I/9AxAYb9SE5U/enjutsu_033.png",
			R   : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR7BVDrryI/AAAAAAAAA6M/DdH3Izww-Vg/enjutsu_033_R.png",
			UC  : "http://lh4.ggpht.com/_yaaM6-lAuRY/TVR7B-XsTdI/AAAAAAAAA6Q/Xc8QYTvj1-M/enjutsu_033_UC.png"
		},
		{/* 34 */
			big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TVR7CdDDjHI/AAAAAAAAA6U/XnazO-MSwY8/enjutsu_034.png",
			R   : "http://lh6.ggpht.com/_yaaM6-lAuRY/TVR7Ckmj5oI/AAAAAAAAA6Y/Mm9s6Qrh72E/enjutsu_034_R.png",
			UC  : "http://lh3.ggpht.com/_yaaM6-lAuRY/TVR7C5h_sYI/AAAAAAAAA6c/eWLuC5v0SGU/enjutsu_034_UC.png"
		}
	);

	/* カードNOと画像テーブルの紐付け表 */
	var convertList = {
		4005 : { rare : "R",  list : listEnjutsu },	/* R袁術  ←┬どちらのカードも同じ画像テーブル(listEnjutsu)を使う */
		4038 : { rare : "UC", list : listEnjutsu },	/* UC袁術 ←┘ */
	};

	/* 捜索で見つかった要素の格納先 */
	var cards = {};

	/*------------*/
	/* 画像の捜索 */
	/*------------*/
	var elements = document.getElementsByClassName('illust');
	for (i = 0; i < elements.length; i++) {
		/* 大イラストの捜索 */
		if (elements[i].nodeName == 'IMG') {
			var cardno = elements[i].src.substring(elements[i].src.lastIndexOf("/") + 1).substring(0, 4);
			if (convertList[cardno] != undefined && convertList[cardno] != null) {
//				GM_log("found big image(No." + cardno + ")");
				if (cards[cardno] == null) {
					cards[cardno] = { big: new Array(), thumb: new Array(), mini: new Array() };
				}
				cards[cardno].big.push(elements[i]);
			}
		}
		/* サムネイルの捜索 */
		if (elements[i].nodeName == 'TD' || elements[i].nodeName == 'DIV') {
			var img = elements[i].getElementsByTagName('img')[0];
			var cardno = img.src.substring(img.src.lastIndexOf("/") + 1).substring(0, 4);
			if (cardno == "mini") {
				/* fake3gokushiを適用している場合はファイル名がmini～で始まるように変わっているので取り直し */
				cardno = img.src.substring(img.src.lastIndexOf("/") + 1).substring(4,8);
			}
			if (convertList[cardno] != undefined && convertList[cardno] != null) {
//				GM_log("found thumb image(No." + cardno + ")");
				if (cards[cardno] == null) {
					cards[cardno] = { big: new Array(), thumb: new Array(), mini: new Array() };
				}
				cards[cardno].thumb.push(img);
			}
		}
	}

	/* 小イラストの捜索 */
	var minielements = document.getElementsByClassName('illustMini');
	for (i = 0; i < minielements.length; i++) {
		var img = minielements[i].getElementsByTagName('img')[0];
		var cardno = img.src.substring(img.src.lastIndexOf("/") + 1).substring(0,4);
		if (cardno == "mini") {
			/* fake3gokushiを適用している場合はファイル名がmini～で始まるように変わっているので取り直し */
			cardno = img.src.substring(img.src.lastIndexOf("/") + 1).substring(4,8);
		}
//		GM_log("found illustMini cardno=" + cardno);
		if (convertList[cardno] != undefined && convertList[cardno] != null) {
//			GM_log("found mini image(No." + cardno + ")");
			if (cards[cardno] == null) {
				cards[cardno] = { big: new Array(), thumb: new Array(), mini: new Array() };
			}
			cards[cardno].mini.push(img);
		}
	}

	/*--------------------------------------------*/
	/* 大イラスト/サムネイル/小イラストの画像置換 */
	/*--------------------------------------------*/
	for (var cardno in cards) {

//		GM_log("[img change] No." + cardno);
//		GM_log("    big.length   = " + cards[cardno].big.length);
//		GM_log("    thumb.length = " + cards[cardno].thumb.length);
//		GM_log("    mini.length  = " + cards[cardno].mini.length);

		/* ※大イラストと小イラストの画像を合致させるため、無理矢理に１回のループで廻す */
		var max = Math.max(Math.max(cards[cardno].big.length, cards[cardno].thumb.length), cards[cardno].mini.length);
		for (var i = 0; i < max; i++) {

			/* 置き換わる画像はランダムに決定 */
			var index = Math.floor( Math.random() * convertList[cardno].list.length );
//			GM_log("    <random image> = No." + index);

			if (cards[cardno].big[i] != null && cards[cardno].big[i] != undefined) {
				cards[cardno].big[i].src = convertList[cardno].list[index].big;
			}
			if (cards[cardno].thumb[i] != null && cards[cardno].thumb[i] != undefined) {
				cards[cardno].thumb[i].src = convertList[cardno].list[index][convertList[cardno].rare];
			}
			if (cards[cardno].mini[i] != null && cards[cardno].mini[i] != undefined) {
				cards[cardno].mini[i].src = convertList[cardno].list[index][convertList[cardno].rare];
			}
		}
	}

}) ();
