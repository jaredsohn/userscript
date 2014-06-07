// ==UserScript==
// @name           fake3gokushiExtra
// @version        0.0.1
// @namespace      http://userscripts.org/scripts/show/123044
// @description    mixi版 ブラウザ三国志の武将イラストを某ゲームのイラストに置き換えるスクリプトです。色々勝手に使ってます。ごめんなさい。
// @icon           http://lh5.googleusercontent.com/-Jd9rSkx0dcY/Tw-J86sihAI/AAAAAAAABe8/miUSLtG542Q/s135/script_icon.png
// @include        http://*.3gokushi.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){
//----更新履歴----
// ver0.0.0: userscript.orgに管理情報を作成
// ver0.0.1: 試運用アップ

	//create hash map, kanji
	var cardnames = {
		"徐庶"	: "リュアナ",
		"じょしょ"	: "りゅあな",
		"関平"	: "カグヤ",
		"かんぺい"	: "かぐや",
		"簡雍"	: "ユーメリア",
		"かんよう"	: "ゆーめりあ",
		"馬謖"	: "ネム",
		"ばしょく"	: "ねむ",
		"沙摩柯"	: "ニム",
		"しゃまか"	: "にむ",
		"姜維"	: "エヴァン",
		"きょうい"	: "えう゛ぁん",
		"黄月英"	: "マリア",
		"こうげつえい"	: "まりあ",
		"司馬懿"	: "センシア",
		"しばい"	: "せんしあ",
		"曹仁"	: "サーシャ",
		"そうじん"	: "さーしゃ",
		"蔡瑁"	: "フィルミリア",
		"さいぼう"	: "ふぃるみりあ",
		"曹真"	: "優希",
		"そうしん"	: "ゆうき",
		"甄姫"	: "ジーナ",
		"しんき"	: "じーな",
		"諸葛瑾"	: "ノム",
		"しょかつきん"	: "のむ",
		"韓当"	: "チマ",
		"かんとう"	: "ちま",
		"孫翊"	: "クーデルカ",
		"そんよく"	: "くーでるか",
		"祖茂"	: "コトネ",
		"そも"	: "ことね",
		"太史慈"	: "エスト",
		"たいしじ"	: "えすと",
		"魯粛"	: "セシリー",
		"ろしゅく"	: "せしりー",
		"張紘"	: "ディーネ",
		"ちょうこう"	: "でぃーね",
		"孔融"	: "アンジェリカ",
		"こうゆう"	: "あんじぇりか",
		"曹昂"	: "アリッサ",
		"そうこう"	: "ありっさ",
		"祝融"	: "吉音",
		"しゅくゆう"	: "よしね",
		"劉表"	: "詠美",
		"りゅうひょう"	: "えいみ",
		"孫堅"	: "朱金",
		"そんけん"	: "あかね",
		"程普"	: "平良",
		"ていふ"	: "たいら",
		"伊籍"	: "鼎",
		"いせき"	: "かなえ",
		"郭汜"	: "雪那",
		"かくし"	: "せつな",
		"張郃"	: "十兵衛",
		"ちょうこう"	: "じゅうべえ",
		"曹洪"	: "シオン",
		"そうこう"	: "しおん",
		"劉焉"	: "輝",
		"りゅうえん"	: "てる",
		"貂蝉"	: "山吹",
		"ちょうせん"	: "やまぶき",
		"朱霊"	: "伊都",
		"しゅれい"	: "いと",
		"張魯"	: "真留",
		"ちょうろ"	: "まる",
		"文聘"	: "はじめ",
		"ぶんぺい"	: "はじめ",
		"卞夫人"	: "光姫",
		"べんふじん"	: "みつき",
		"蒋欽"	: "信乃",
		"しょうきん"	: "しの",
		"牛輔"	: "結花",
		"ぎゅうほ"	: "ゆか",
		"蘇飛"	: "由佳里",
		"そひ"	: "ゆかり",
		"周倉"	: "往水",
		"しゅうそう"	: "いくみ",
		"蔡琰"	: "文",
		"さいえん"	: "あや",
		"徐晃"	: "想",
		"じょこう"	: "おもい",
		"李傕"	: "つばめ",
		"りかく"	: "つばめ",
		"華歆"	: "唯",
		"かきん"	: "ゆい",
		"雷銅"	: "桃子",
		"らいどう"	: "ももこ",
		"闞沢"	: "かなう",
		"かんたく"	: "かなう",
		"張昭"	: "平和",
		"ちょうしょう"	: "のどか",
		"法正"	: "由真",
		"ほうせい"	: "ゆま",

	};
	var illust = {
		"1014" : {big : "http://lh3.ggpht.com/-c-LiWXHbLK4/Tw-c6ghZanI/AAAAAAAABfU/8wHifunie70/1014_UC.png",	small : "http://lh6.ggpht.com/-voXCk35qjqM/Tw-eNjXgqtI/AAAAAAAABuU/Jv66ykA_vww/mini1014_UC.png"},
		"1021" : {big : "http://lh4.ggpht.com/-dvREIiJYGKg/Tw-c7Cz0s_I/AAAAAAAABfY/eg8XNzZXPLA/1021_UC.png",	small : "http://lh3.ggpht.com/-x9VpQl62_4I/Tw-eORA-E5I/AAAAAAAABug/yokZ31gT0cU/mini1021_UC.png"},
		"1022" : {big : "http://lh4.ggpht.com/-fD8tfoNxveE/Tw-c77MBrbI/AAAAAAAABfg/qErd5aXU7Y8/1022_UC.png",	small : "http://lh5.ggpht.com/-2O-Qbph-0K4/Tw-ePghnAQI/AAAAAAAABuo/lr7ne5nMnKE/mini1022_UC.png"},
		"1023" : {big : "http://lh5.ggpht.com/-RpDsvgBXWCE/Tw-c8dBcZHI/AAAAAAAABfo/ig8IFcfK62k/1023_UC.png",	small : "http://lh5.ggpht.com/-jFvRseElqdM/Tw-eP03q0DI/AAAAAAAABuw/eNZjCkXM17k/mini1023_UC.png"},
		"1024" : {big : "http://lh5.ggpht.com/-UtDR_6voaTI/Tw-c9ANJXyI/AAAAAAAABfw/m2OYrT_tR2M/1024_C.png",		small : "http://lh4.ggpht.com/--QuLDOeztAo/Tw-eQQ6XAgI/AAAAAAAABu8/_s8lby2bhO4/mini1024_C.png"},
		"1025" : {big : "http://lh6.ggpht.com/-cVDbvqpsfZY/Tw-c9yJ3u6I/AAAAAAAABf4/Eh9fsM4s6xM/1025_UC.png",	small : "http://lh5.ggpht.com/-sin73TLjldk/Tw-eRgTf79I/AAAAAAAABvA/NTCckKMitho/mini1025_UC.png"},
		"1026" : {big : "http://lh4.ggpht.com/-HHGsH4rE6Sc/Tw-c-SDjCII/AAAAAAAABgA/NnMjR9wWqDA/1026_C.png",		small : "http://lh5.ggpht.com/-j5Ldij5cFJw/Tw-eRw_GzMI/AAAAAAAABvI/9iHrJpKXYIo/mini1026_C.png"},
		"1027" : {big : "http://lh6.ggpht.com/-s5qV6vW1c-Q/Tw-c-387vZI/AAAAAAAABgI/RFuoKDaYrhg/1027_UC.png",	small : "http://lh5.ggpht.com/-8CAZwvE6aww/Tw-eSoUjlxI/AAAAAAAABvU/AbJYqU3Aabc/mini1027_UC.png"},
		"1028" : {big : "http://lh4.ggpht.com/-7Crms4bSbck/TxDWvABPn4I/AAAAAAAAB98/pHiwurSg3sU/1028_C.png",		small : "http://lh3.ggpht.com/-oedcRecEP60/TxDWvskoweI/AAAAAAAAB-A/HeCZ7LGcUm4/mini1028_C.png"},
		"1029" : {big : "http://lh3.ggpht.com/-n2tZZZkvNFs/Tw-dAlJtEFI/AAAAAAAABgY/nlfs1de0cjg/1029_UC.png",	small : "http://lh4.ggpht.com/-34tGBBoZZac/Tw-eT4QhpsI/AAAAAAAABvg/8OMYYlHEiI0/mini1029_UC.png"},
		"1030" : {big : "http://lh5.ggpht.com/-NQ3GyNutm7g/Tw-dBLd98-I/AAAAAAAABgg/IvWFMjDi3EQ/1030_C.png",		small : "http://lh3.ggpht.com/-52S1797x6xk/Tw-eUqmFOuI/AAAAAAAABvk/MFgZz6-Otmg/mini1030_C.png"},
		"1033" : {big : "http://lh3.ggpht.com/-n2nds0Rbe-8/Tw-dBytM41I/AAAAAAAABgo/9Dbw5mke2Gg/1033_UC.png",	small : "http://lh4.ggpht.com/-TH5bxCobYk4/Tw-eUyY9GeI/AAAAAAAABvw/bH7Sz-xpJLo/mini1033_UC.png"},
		"1034" : {big : "http://lh4.ggpht.com/-QJDGznC2T0M/Tw-dCpYq1ZI/AAAAAAAABgw/MwSLIsfJB8k/1034_C.png",		small : "http://lh4.ggpht.com/-IP6aaOg3Y7s/Tw-eV45dXAI/AAAAAAAABv0/ziUVADJF3-s/mini1034_C.png"},
		"1036" : {big : "http://lh4.ggpht.com/-r1MM31fXTkM/Tw-dDEMcokI/AAAAAAAABg4/XpvucEWnuA8/1036_R.png",		small : "http://lh3.ggpht.com/-mOAjrMZFkJc/Tw-eWSluaTI/AAAAAAAABv4/IBV8UgLWdyM/mini1036_R.png"},
		"1041" : {big : "http://lh6.ggpht.com/-n_fIZrxjKGs/Tw-dDxQvdVI/AAAAAAAABhA/w8yPrSdGl7I/1041_SR.png",	small : "http://lh3.ggpht.com/-Hl62JvTAvMY/Tw-eWup130I/AAAAAAAABwE/PtxADgFyX8w/mini1041_SR.png"},
		"1053" : {big : "http://lh3.ggpht.com/-E7KdwxSHKec/Tw-dEcxauoI/AAAAAAAABhI/e2NYzDhZgws/1053_SR.png",	small : "http://lh5.ggpht.com/-l5mvJb5OoUQ/Tw-eXAAhMcI/AAAAAAAABwI/YxzkN7hhJz0/mini1053_SR.png"},
		"1055" : {big : "http://lh6.ggpht.com/-ncivb0MbC6k/Tw-dE4IXO0I/AAAAAAAABhQ/Qo-5L7fux3c/1055_R.png",		small : "http://lh3.ggpht.com/-ChKxBCzKsUs/Tw-eXl3RG7I/AAAAAAAABwQ/NdDLfXC2eQI/mini1055_R.png"},
		"1058" : {big : "http://lh3.ggpht.com/-ABSn1OgFHuE/Tw-dFRXiWFI/AAAAAAAABhY/6CsCluliC30/1058_C.png",		small : "http://lh3.ggpht.com/-0J8vlbU0FR8/Tw-eYJPHm5I/AAAAAAAABwc/_hZiQR9C6BQ/mini1058_C.png"},
		"1061" : {big : "http://lh5.ggpht.com/-y4FDxh1gju8/Tw-dGn5rnFI/AAAAAAAABhg/6ffEaeQ3rU8/1061_UR.png",	small : "http://lh4.ggpht.com/-SgZIay6Vv34/Tw-eYpGmGaI/AAAAAAAABwg/_EK6oW9odz8/mini1061_UR.png"},
		"1068" : {big : "http://lh4.ggpht.com/-GNU4FTSw7Js/Tw-dHJVgteI/AAAAAAAABho/TXcQ6Cvnpv4/1068_R.png",		small : "http://lh3.ggpht.com/-pkJim0m8KMw/Tw-eZBPLMoI/AAAAAAAABwo/YhGwxOxsp1A/mini1068_R.png"},
		"1069" : {big : "http://lh3.ggpht.com/-VR4yERdgMaY/Tw-dHsw1wVI/AAAAAAAABhw/qWU5Dlhbwz0/1069_R.png",		small : "http://lh4.ggpht.com/-di8LR6CMCUQ/Tw-eZs-yLtI/AAAAAAAABw0/LQMXXkQaejw/mini1069_R.png"},
		"1076" : {big : "http://lh6.ggpht.com/-MXGNxfJVA6o/Tw-dIC22fwI/AAAAAAAABh4/cN-C9_Px0R4/1076_R.png",		small : "http://lh4.ggpht.com/-U0gRz4Du1Bk/Tw-eakNKT6I/AAAAAAAABw8/l8HmJezs6Jo/mini1076_R.png"},
		"1081" : {big : "http://lh6.ggpht.com/-T8WR5oPPbj0/Tw-dIwPT1fI/AAAAAAAABiA/pxfG20GXa_o/1081_SR.png",	small : "http://lh6.ggpht.com/--qL0H7cMO6w/Tw-ebAYCPdI/AAAAAAAABxE/wNK0JTcFDwo/mini1081_SR.png"},
		"1082" : {big : "http://lh4.ggpht.com/-H7s3zmebLu8/Tw-dJV0fPzI/AAAAAAAABiI/K730muVAOO0/1082_R.png",		small : "http://lh3.ggpht.com/-aQaOMXJoEkA/Tw-eb-4QfPI/AAAAAAAABxM/dCzAf1kE7N0/mini1082_R.png"},
		"1084" : {big : "http://lh6.ggpht.com/-SNUkj4_1dHQ/Tw-dKWptORI/AAAAAAAABiQ/RCTPeCvl5ME/1084_SR.png",	small : "http://lh4.ggpht.com/-LU_6Tig6Jg8/Tw-ecgHu9jI/AAAAAAAABxU/sQU8yR3RoIc/mini1084_SR.png"},
		"1088" : {big : "http://lh5.ggpht.com/-C6lpFRTaSsg/Tw-dKwP6igI/AAAAAAAABiY/LVvS8bD9WCo/1088_R.png",		small : "http://lh6.ggpht.com/-PWQCIw4XYcg/Tw-edHjmhHI/AAAAAAAABxc/G1iMq04e4i8/mini1088_R.png"},
		"1093" : {big : "http://lh6.ggpht.com/-dliG73fDVsU/Tw-dLjbYjVI/AAAAAAAABig/7RufygGQSHM/1093_SR.png",	small : "http://lh4.ggpht.com/-HKmlpRRFfNM/Tw-edVPzsvI/AAAAAAAABxg/TBBu4RphE5E/mini1093_SR.png"},
		"2002" : {big : "http://lh5.ggpht.com/-2TsUnI47Ark/Tw-dMIZZIFI/AAAAAAAABio/f2wgfn1-Ilo/2002_SR.png",	small : "http://lh3.ggpht.com/-8M1U0krmbSY/Tw-edyJ8ulI/AAAAAAAABxo/NWBJNMMfxaQ/mini2002_SR.png"},
		"2006" : {big : "http://lh4.ggpht.com/-HXKSCUWiSfg/Tw-dMnkuz9I/AAAAAAAABiw/w9WlfErSyqE/2006_R.png",		small : "http://lh5.ggpht.com/-iUBESLIg9yc/Tw-eevvjU4I/AAAAAAAABx0/6IxnNw5pFYQ/mini2006_R.png"},
		"2014" : {big : "http://lh5.ggpht.com/-6VjvjzjcGZQ/Tw-dNXbwLDI/AAAAAAAABi4/oTcDUvxCWdI/2014_UC.png",	small : "http://lh5.ggpht.com/-h3D3bwLcKc4/Tw-efJJ1rjI/AAAAAAAABx8/DE-X9PaScBw/mini2014_UC.png"},
		"2015" : {big : "http://lh5.ggpht.com/-I328HET2y4c/Tw-dOeOED4I/AAAAAAAABjA/r5eoRUo4xr0/2015_C.png",		small : "http://lh4.ggpht.com/-F2l6Gvfqlu4/Tw-efoFmQjI/AAAAAAAAByE/9BODPzSvldY/mini2015_C.png"},
		"2016" : {big : "http://lh4.ggpht.com/-lz3uQM3CoBE/Tw-dOrKGYXI/AAAAAAAABjI/-LdQV5OJrS0/2016_UC.png",	small : "http://lh5.ggpht.com/-d_l0fMq09Lc/Tw-egMd9t6I/AAAAAAAAByM/b5EiX-4eAfY/mini2016_UC.png"},
		"2019" : {big : "http://lh4.ggpht.com/-FgKtqFDw1qc/Tw-dPGS4bwI/AAAAAAAABjQ/_v1KeIEt2D8/2019_UC.png",	small : "http://lh5.ggpht.com/-p1CoKltGOXM/Tw-eg_5CSmI/AAAAAAAAByQ/FA0H_Yc0Wlk/mini2019_UC.png"},
		"2020" : {big : "http://lh3.ggpht.com/-1U95s8zGLrs/Tw-dPhx9q0I/AAAAAAAABjc/V1Mgrp7SoXQ/2020_UC.png",	small : "http://lh3.ggpht.com/-74qU3mTdDps/Tw-ehOJfK9I/AAAAAAAAByY/XjsSWR6zeAE/mini2020_UC.png"},
		"2021" : {big : "http://lh6.ggpht.com/-1iy-f09GE_Y/Tw-dQvyQjkI/AAAAAAAABjg/yiukz7dzxec/2021_C.png",		small : "http://lh3.ggpht.com/-Zm3x-vsMkAA/Tw-ehp5RrUI/AAAAAAAAByg/3Mw5VOJrE5A/mini2021_C.png"},
		"2022" : {big : "http://lh6.ggpht.com/-NAmLL-siIHc/Tw-dRZ3xNsI/AAAAAAAABjo/VYSEDXwefmk/2022_UC.png",	small : "http://lh4.ggpht.com/-ox2lE-q4d0c/Tw-eiDZ4c_I/AAAAAAAABys/jYsUWlSoHnI/mini2022_UC.png"},
		"2023" : {big : "http://lh5.ggpht.com/-zRlBPjTpcSg/Tw-dR262_9I/AAAAAAAABjw/0GvqBQjeg2s/2023_C.png",		small : "http://lh4.ggpht.com/-mFBh9YRAWkM/Tw-ejBHM-1I/AAAAAAAABy0/e8aEiHnT__8/mini2023_C.png"},
		"2024" : {big : "http://lh4.ggpht.com/-BGuyBTfsKOk/Tw-dSuiGjwI/AAAAAAAABj4/OQr65qaGkOE/2024_UC.png",	small : "http://lh5.ggpht.com/-OXPbnIb07pw/Tw-ejgv3fBI/AAAAAAAABy8/K3-HkLciApQ/mini2024_UC.png"},
		"2025" : {big : "http://lh6.ggpht.com/-7lYZfhd4PYY/Tw-dTTSljVI/AAAAAAAABkA/KblGu9_zooE/2025_C.png",		small : "http://lh6.ggpht.com/-tYoICYcKUWA/Tw-ekXuJd-I/AAAAAAAABzE/4nTxcUwqTf4/mini2025_C.png"},
		"2026" : {big : "http://lh6.ggpht.com/-5c55IHAN__o/Tw-dT7DjOyI/AAAAAAAABkI/aZBFhmHgex0/2026_UC.png",	small : "http://lh3.ggpht.com/-n1g2hYtU35w/Tw-ek3zMdeI/AAAAAAAABzQ/kEEc8X76y_8/mini2026_UC.png"},
		"2029" : {big : "http://lh4.ggpht.com/-BbK116c8-D0/Tw-dUoVaqUI/AAAAAAAABkQ/8LHlpsXJ7YQ/2029_UC.png",	small : "http://lh6.ggpht.com/-rULbhS1dh7k/Tw-emBjedsI/AAAAAAAABzU/lDIiiLMsnbg/mini2029_UC.png"},
		"2030" : {big : "http://lh3.ggpht.com/-6TjzptWRzF0/Tw-dVGMzjoI/AAAAAAAABkc/O6Jkr3tqZNY/2030_C.png",		small : "http://lh4.ggpht.com/-k73mliAxIA8/Tw-emueWQxI/AAAAAAAABzc/CjHIL-8bt4Y/mini2030_C.png"},
		"2031" : {big : "http://lh6.ggpht.com/-zSDS06aiq7g/Tw-dWON2OHI/AAAAAAAABkg/JxrysPTSAmU/2031_UC.png",	small : "http://lh5.ggpht.com/-DieJsSMwREg/Tw-enCR9Y9I/AAAAAAAABzk/swbf6ImoOPY/mini2031_UC.png"},
		"2032" : {big : "http://lh3.ggpht.com/-i4d6dhXK1yQ/Tw-dWoTlwmI/AAAAAAAABko/hTp0gl4kazc/2032_C.png",		small : "http://lh4.ggpht.com/-h2oQFBAV83Q/Tw-ensLWHvI/AAAAAAAABzo/W4pLGL9LiQc/mini2032_C.png"},
		"2033" : {big : "http://lh4.ggpht.com/-8u2e7gr8_4o/Tw-dXQnTp8I/AAAAAAAABkw/e-N8ucY3ilk/2033_UC.png",	small : "http://lh4.ggpht.com/-ZE2V1iOY7NM/Tw-eoE6YLqI/AAAAAAAABzw/o-7CBGQKr5w/mini2033_UC.png"},
		"2034" : {big : "http://lh6.ggpht.com/-l4rOobKOg7Q/Tw-dXzTbLQI/AAAAAAAABk0/X5L1U2_EdWM/2034_C.png",		small : "http://lh3.ggpht.com/-ALSiCxjk9og/Tw-eodK64pI/AAAAAAAABz4/bcMcLrbwYsQ/mini2034_C.png"},
		"2045" : {big : "http://lh6.ggpht.com/-qBd5nBbpbV4/Tw-dYb4pyPI/AAAAAAAABk8/pr_y8sFJpcM/2045_UC.png",	small : "http://lh3.ggpht.com/-5pcMTVVhqSw/Tw-eo5W8q4I/AAAAAAAAB0A/cZZJ1H1JSIQ/mini2045_UC.png"},
		"2046" : {big : "http://lh5.ggpht.com/-_osX6B8qQM0/Tw-dYwgaz8I/AAAAAAAABlE/LMOPjHWZW3g/2046_C.png",		small : "http://lh3.ggpht.com/-Vlv5IOxjC80/Tw-epgWNvgI/AAAAAAAAB0M/20EkGbmCBww/mini2046_C.png"},
		"2047" : {big : "http://lh5.ggpht.com/-ezansyMfjcA/Tw-dZcH0gvI/AAAAAAAABlM/T5VM9iiENfQ/2047_R.png",		small : "http://lh6.ggpht.com/-mKjUMCgQZ2g/Tw-eqJ62_nI/AAAAAAAAB0Q/BtGeby6EBUo/mini2047_R.png"},
		"2048" : {big : "http://lh5.ggpht.com/-r1vs-WfJygo/Tw-dah9zq5I/AAAAAAAABlU/OYLO1QBSeEU/2048_R.png",		small : "http://lh3.ggpht.com/-C6SRPFJVHKk/Tw-erL-D1xI/AAAAAAAAB0Y/_9efgGgIw8I/mini2048_R.png"},
		"2056" : {big : "http://lh4.ggpht.com/-wv9cNXYarlY/Tw-dbCRUsMI/AAAAAAAABlc/5O0Z1qsWylg/2056_C.png",		small : "http://lh6.ggpht.com/-Hf4KDHvCjoc/Tw-erafJ_SI/AAAAAAAAB0k/be5LIMXLbmg/mini2056_C.png"},
		"2057" : {big : "http://lh4.ggpht.com/-d9gyUnpG0CU/Tw-db8rlUVI/AAAAAAAABlo/w147gEtSVls/2057_R.png",		small : "http://lh3.ggpht.com/-caQjuwWjORE/Tw-esEEnKqI/AAAAAAAAB0s/kkpvegWHoiI/mini2057_R.png"},
		"2059" : {big : "http://lh4.ggpht.com/-zyMj5veSb1A/Tw-dcl1--mI/AAAAAAAABls/ezaXwb-CSMU/2059_SR.png",	small : "http://lh6.ggpht.com/-KXgU8rQpwe0/Tw-etC5CFOI/AAAAAAAAB00/NK3CBNVTRnk/mini2059_SR.png"},
		"2061" : {big : "http://lh4.ggpht.com/-54gMYyorDGE/Tw-ddH-QEmI/AAAAAAAABl4/umFPpM8IegQ/2061_R.png",		small : "http://lh4.ggpht.com/-Cnyiq3WKbwA/Tw-euO84EBI/AAAAAAAAB04/XtJ1m4gkySM/mini2061_R.png"},
		"2065" : {big : "http://lh6.ggpht.com/-DyVHLXTemMg/Tw-deJfGrvI/AAAAAAAABmE/XL5bvpy9da0/2065_UR.png",	small : "http://lh5.ggpht.com/-YDXDUtmuy-0/Tw-euacQOPI/AAAAAAAAB08/BWn2xEQd9GM/mini2065_UR.png"},
		"2072" : {big : "http://lh6.ggpht.com/-BjyzXOiLg9o/Tw-dfV45K0I/AAAAAAAABmI/1vQMDHtR2Dc/2072_SR.png",	small : "http://lh3.ggpht.com/-zOC-5yjD25Q/Tw-eujE9yKI/AAAAAAAAB1M/g2y7zcJ6_94/mini2072_SR.png"},
		"2080" : {big : "http://lh5.ggpht.com/-ZkcbKGX1Pv8/Tw-df7k-nTI/AAAAAAAABmQ/JnFATUlRlgo/2080_R.png",		small : "http://lh5.ggpht.com/-e8rfubzy_3Q/Tw-ewvpHj4I/AAAAAAAAB1Q/Db4eI6J9pEU/mini2080_R.png"},
		"2082" : {big : "http://lh3.ggpht.com/-h0HzyN73BYk/Tw-dgQ9KFlI/AAAAAAAABmY/YgViU7TO_5A/2082_SR.png",	small : "http://lh3.ggpht.com/-4O1u22cIkrI/Tw-ew2EYqNI/AAAAAAAAB1U/yVIESQsKyyM/mini2082_SR.png"},
		"2083" : {big : "http://lh6.ggpht.com/-7_YTfOeZGLg/Tw-dhHeiCbI/AAAAAAAABmg/K3blKt0BZBY/2083_UR.png",	small : "http://lh3.ggpht.com/-G3u4zb1Yvzs/Tw-exZ_SlpI/AAAAAAAAB1c/eLXgsA0RZfQ/mini2083_UR.png"},
		"2090" : {big : "http://lh5.ggpht.com/-ddUoL3kL0lE/Tw-dhrO7-NI/AAAAAAAABmk/U-Ue4Tj73ww/2090_R.png",		small : "http://lh4.ggpht.com/-IyEEZPIdAq0/Tw-exnsCLGI/AAAAAAAAB1o/7ShENle3BO0/mini2090_R.png"},
		"2100" : {big : "http://lh3.ggpht.com/-zdUTMumrLdI/Tw-diPhzYrI/AAAAAAAABms/CT83xDPC9p8/2100_UR.png",	small : "http://lh5.ggpht.com/-H98nA5iRmJA/Tw-eyzGWNrI/AAAAAAAAB1w/vBZ3gtsPnpQ/mini2100_UR.png"},
		"3011" : {big : "http://lh3.ggpht.com/-9ivkLO1YjOE/Tw-di1gEDfI/AAAAAAAABm0/J2G4GWTCCbE/3011_UC.png",	small : "http://lh6.ggpht.com/-RiI2H9SAWvY/Tw-eztEUIrI/AAAAAAAAB10/expmi0gTylc/mini3011_UC.png"},
		"3012" : {big : "http://lh3.ggpht.com/-gKuwiTAJiSQ/Tw-djW5uLrI/AAAAAAAABnA/rcbi73VPS_I/3012_C.png",		small : "http://lh3.ggpht.com/-STpo4TBgh_Y/Tw-e0AGfFyI/AAAAAAAAB14/d8RZ0Dmopfg/mini3012_C.png"},
		"3014" : {big : "http://lh5.ggpht.com/-LtfKPQWZG_g/Tw-dkYlwTzI/AAAAAAAABnE/bgoN7lWn-HM/3014_UC.png",	small : "http://lh5.ggpht.com/-sPxG1PvVq94/Tw-e0bxUXJI/AAAAAAAAB2A/HTnKTAdsZlg/mini3014_UC.png"},
		"3017" : {big : "http://lh6.ggpht.com/-lt0UEfG89vI/Tw-dkq80iTI/AAAAAAAABnM/AijQVk-3tUk/3017_UC.png",	small : "http://lh5.ggpht.com/-lOw9-XwoVL0/Tw-e0o1PJNI/AAAAAAAAB2E/aJx5oO1q3Vc/mini3017_UC.png"},
		"3018" : {big : "http://lh6.ggpht.com/-whwwKk8N5mY/Tw-dld4d3eI/AAAAAAAABnU/-94EwWG4vjk/3018_C.png",		small : "http://lh5.ggpht.com/-YRjfVhgEspY/Tw-k6Cvd3YI/AAAAAAAAB9w/uXPXu9THY-c/mini3018_C.png"},
		"3019" : {big : "http://lh3.ggpht.com/-ZaCNzbhrIrU/Tw-dl9YU3EI/AAAAAAAABnY/OBJk59vxorM/3019_UC.png",	small : "http://lh3.ggpht.com/-yDNHH4oTZBA/Tw-e27jErrI/AAAAAAAAB2g/9ovYIEDFXDg/mini3019_UC.png"},
		"3020" : {big : "http://lh3.ggpht.com/-lpsCJ297mNw/Tw-dmRdGGTI/AAAAAAAABnk/RNelUOZUuxs/3020_C.png",		small : "http://lh3.ggpht.com/-da-a5hYYI3c/Tw-e39JoKcI/AAAAAAAAB2k/YGtzzVt4u4c/mini3020_C.png"},
		"3021" : {big : "http://lh4.ggpht.com/-vKES6EpWV_4/Tw-dnEngOTI/AAAAAAAABns/2gCSx8_fkmo/3021_UC.png",	small : "http://lh6.ggpht.com/-2R5Ai3aa9Vg/Tw-e4MYeSHI/AAAAAAAAB2s/SKGBdHiviEo/mini3021_UC.png"},
		"3022" : {big : "http://lh6.ggpht.com/-LZpU-5i5NX0/Tw-dneqlteI/AAAAAAAABn0/WRHkNDC3KUM/3022_C.png",		small : "http://lh3.ggpht.com/-psi9DIcpwyA/Tw-e4rSNr2I/AAAAAAAAB20/A6_9M3l812M/mini3022_C.png"},
		"3023" : {big : "http://lh3.ggpht.com/-cMqP8C0F9iY/Tw-doL9TLEI/AAAAAAAABn8/BLx-O_pRHns/3023_UC.png",	small : "http://lh6.ggpht.com/-rRITBYtTCTQ/Tw-e5Ex6y2I/AAAAAAAAB28/SDg9ZLpyZyY/mini3023_UC.png"},
		"3024" : {big : "http://lh4.ggpht.com/-rVdhT11iOiw/Tw-do_pNVmI/AAAAAAAABoE/jH6JuMDBPhk/3024_C.png",		small : "http://lh4.ggpht.com/-vEUQ8qL9gzc/Tw-e5mgyvoI/AAAAAAAAB3I/oKMxph9LmjY/mini3024_C.png"},
		"3025" : {big : "http://lh6.ggpht.com/-n2fiKQkAzNo/Tw-dprhsieI/AAAAAAAABoQ/QV5XSjH_tFo/3025_UC.png",	small : "http://lh5.ggpht.com/-pNRYjIKQk28/Tw-e6n7j7SI/AAAAAAAAB3Q/oPJQDTWqtIk/mini3025_UC.png"},
		"3026" : {big : "http://lh3.ggpht.com/-N3OKBAgZNKo/Tw-dq928c6I/AAAAAAAABoY/KMlB4Xu7GvA/3026_C.png",		small : "http://lh4.ggpht.com/-f1oU6ejZYb0/Tw-e7Ns0N3I/AAAAAAAAB3U/VX78wIoyVyY/mini3026_C.png"},
		"3029" : {big : "http://lh5.ggpht.com/-uew3QORdRnM/Tw-drrbLIkI/AAAAAAAABog/2t0RY1l5aOM/3029_UC.png",	small : "http://lh6.ggpht.com/-hYNVp7k0l4g/Tw-e75hHfbI/AAAAAAAAB3k/oN9EAwSVQH8/mini3029_UC.png"},
		"3030" : {big : "http://lh3.ggpht.com/-8Vs3KMeEfvo/Tw-dsKnXazI/AAAAAAAABoo/DUVHJGmL26g/3030_C.png",		small : "http://lh4.ggpht.com/-2S47EgCseGg/Tw-e8xUp3NI/AAAAAAAAB3o/YAE8gTEmCf8/mini3030_C.png"},
		"3033" : {big : "http://lh3.ggpht.com/-5576wvY9Fac/Tw-dswx4F3I/AAAAAAAABo0/NW1ibgoRJEE/3033_R.png",		small : "http://lh3.ggpht.com/-Z7FZYucUsAI/Tw-e9H8TanI/AAAAAAAAB3s/ncBoetZPGbA/mini3033_R.png"},
		"3034" : {big : "http://lh3.ggpht.com/-X_r9bTjPTWM/Tw-dt_9E94I/AAAAAAAABo8/8FLJGG-mlNU/3034_R.png",		small : "http://lh3.ggpht.com/-TryRwZWlrnE/Tw-e9lk9ZnI/AAAAAAAAB30/-p_c3kqfbwo/mini3034_R.png"},
		"3035" : {big : "http://lh5.ggpht.com/-UCx3wVj382k/Tw-du8b-a2I/AAAAAAAABpA/DbXraweSJG4/3035_UC.png",	small : "http://lh5.ggpht.com/-8LJKyMJGNGY/Tw-e-HkdP7I/AAAAAAAAB4E/YsBDuhQSi4Y/mini3035_UC.png"},
		"3036" : {big : "http://lh4.ggpht.com/-LFkHafQEk-U/Tw-dvswOuwI/AAAAAAAABpI/9f7yi6F17BM/3036_R.png",		small : "http://lh4.ggpht.com/-hBETHCpnUto/Tw-e_FSsRUI/AAAAAAAAB4I/lvsQh7aG7LM/mini3036_R.png"},
		"3044" : {big : "http://lh3.ggpht.com/-0ECt8Wme2Bg/Tw-dwGUj9fI/AAAAAAAABpQ/BYEs7Nt7kDg/3044_UR.png",	small : "http://lh6.ggpht.com/-E4vR9berKdw/Tw-e_mwk54I/AAAAAAAAB4U/jOalWfvIuu4/mini3044_UR.png"},
		"3048" : {big : "http://lh5.ggpht.com/-SuCFWFm7dKE/Tw-dwlCrVMI/AAAAAAAABpU/aZ1p8s5wrLg/3048_SR.png",	small : "http://lh3.ggpht.com/-47b44XGJuQc/Tw-fA_awhnI/AAAAAAAAB4Y/d1wGLLRIP_c/mini3048_SR.png"},
		"3050" : {big : "http://lh6.ggpht.com/-Udq8hrmAUZY/Tw-dxJFOJlI/AAAAAAAABpc/opCmVmOeQ68/3050_R.png",		small : "http://lh6.ggpht.com/-iz5lpuqs3G8/Tw-fBGfivvI/AAAAAAAAB4g/oyl_jaoE6Dg/mini3050_R.png"},
		"3059" : {big : "http://lh5.ggpht.com/-fDsQaX0qFlQ/Tw-dx6gKioI/AAAAAAAABpk/4J2UZIX1BvA/3059_UC.png",	small : "http://lh5.ggpht.com/-dO3rDLkGyvg/Tw-fCMDlUdI/AAAAAAAAB4o/abzbYwRJUbY/mini3059_UC.png"},
		"3060" : {big : "http://lh4.ggpht.com/-oC6HDY3odgo/Tw-dypH6n4I/AAAAAAAABpw/SLcv__-hc6w/3060_UR.png",	small : "http://lh4.ggpht.com/-oq5r75-4JLw/Tw-fC2l9RRI/AAAAAAAAB4w/pt06IsVKy6k/mini3060_UR.png"},
		"3061" : {big : "http://lh5.ggpht.com/--BaV8wX_8fY/Tw-dzYXwMBI/AAAAAAAABp4/L7k86AbawJ0/3061_R.png",		small : "http://lh5.ggpht.com/-nlt-6NI2iJg/Tw-fDAw1ECI/AAAAAAAAB40/-j2Oay2VxOU/mini3061_R.png"},
		"3063" : {big : "http://lh4.ggpht.com/-LN8hwNF_O8o/Tw-dz469oEI/AAAAAAAABqA/I2swTUviI08/3063_R.png",		small : "http://lh4.ggpht.com/-qSJwaEW-FuQ/Tw-fDeiHKZI/AAAAAAAAB5A/m8B63y-cc64/mini3063_R.png"},
		"3068" : {big : "http://lh6.ggpht.com/-rMRk6udnXx8/Tw-d0c4Z4NI/AAAAAAAABqI/SpCib2pLZwQ/3068_UR.png",	small : "http://lh4.ggpht.com/-WX3wlOhdwzE/Tw-fEF8U3aI/AAAAAAAAB5I/vkfMOI6OCho/mini3068_UR.png"},
		"3069" : {big : "http://lh4.ggpht.com/-DGBDPOl62jY/Tw-d0_DhwHI/AAAAAAAABqQ/B48134i28rs/3069_SR.png",	small : "http://lh6.ggpht.com/-KmG5L4XqqmA/Tw-fEhOMSTI/AAAAAAAAB5Q/2vljjfQk5pA/mini3069_SR.png"},
		"3070" : {big : "http://lh3.ggpht.com/-RLsevbO69mA/Tw-d1swlScI/AAAAAAAABqY/FUUT4QWppm8/3070_UC.png",	small : "http://lh5.ggpht.com/-EGUASCNTIB0/Tw-fFQJIlKI/AAAAAAAAB5Y/WQSRXHbk_wY/mini3070_UC.png"},
		"3072" : {big : "http://lh6.ggpht.com/-osAHvgPDZSU/Tw-d2gvweSI/AAAAAAAABqk/rrezoG5h-zg/3072_R.png",		small : "http://lh3.ggpht.com/-QHfpe6-GDcE/Tw-fF5q8UKI/AAAAAAAAB5g/TyLSAkFWZig/mini3072_R.png"},
		"3074" : {big : "http://lh4.ggpht.com/-ysAnDR66OMM/Tw-d4Oeg4hI/AAAAAAAABqo/L1N1vDeZPqA/3074_SR.png",	small : "http://lh3.ggpht.com/-b-mxzWdbB6M/Tw-fGZAGaWI/AAAAAAAAB5o/RZPsWOEOszE/mini3074_SR.png"},
		"3076" : {big : "http://lh3.ggpht.com/-bnW5VsRDAr8/Tw-d4gANscI/AAAAAAAABqs/jCgFMAD7cRg/3076_SR.png",	small : "http://lh5.ggpht.com/-TxGxMjcHpj0/Tw-fGyqGT4I/AAAAAAAAB5w/5vlyWQ2NleE/mini3076_SR.png"},
		"3084" : {big : "http://lh4.ggpht.com/-5p2iVzNRw1k/Tw-d5AGEuXI/AAAAAAAABq8/d5fhtOdfpV0/3084_UC.png",	small : "http://lh3.ggpht.com/-FZ1D83gVtMw/Tw-fHiddt_I/AAAAAAAAB54/ZmtQdVhuClk/mini3084_UC.png"},
		"3085" : {big : "http://lh6.ggpht.com/-TYGVZcPM81U/Tw-d65aHP0I/AAAAAAAABrA/y67rWW675dg/3085_SR.png",	small : "http://lh5.ggpht.com/-gEBND0BEiuU/Tw-fH_yqlgI/AAAAAAAAB6A/s0Fdqhba108/mini3085_SR.png"},
		"4008" : {big : "http://lh6.ggpht.com/-bkpuNOfen9w/Tw-d7UUFUZI/AAAAAAAABrI/8hnKQuKkfGA/4008_UC.png",	small : "http://lh6.ggpht.com/-wyCek4BBCyI/Tw-fIthwd3I/AAAAAAAAB6E/MiuNw95qZhM/mini4008_UC.png"},
		"4009" : {big : "http://lh3.ggpht.com/-np2EIGwvNIo/Tw-d8WviITI/AAAAAAAABrU/SZoI6U2qs9s/4009_C.png",		small : "http://lh3.ggpht.com/-YbJjwg0EUqE/Tw-fJKojnWI/AAAAAAAAB6Q/FWJubRNVmVM/mini4009_C.png"},
		"4010" : {big : "http://lh6.ggpht.com/-07UM6eCjHKk/Tw-d87aLQgI/AAAAAAAABrY/19nKqyYtW8w/4010_UC.png",	small : "http://lh6.ggpht.com/-6LCQIkcH1T0/Tw-fJsvE40I/AAAAAAAAB6Y/c-EmEiaR6IY/mini4010_UC.png"},
		"4011" : {big : "http://lh4.ggpht.com/-ZcW-Ivd09Qs/Tw-d9bVbKQI/AAAAAAAABrg/6AuTVVXy9iY/4011_C.png",		small : "http://lh5.ggpht.com/-vv1mjMCKaKs/Tw-fKJ85HhI/AAAAAAAAB6g/YzaFe--Qcwc/mini4011_C.png"},
		"4012" : {big : "http://lh4.ggpht.com/-aEgYSwnEluI/Tw-d9-dRl-I/AAAAAAAABro/d85OeMazPJE/4012_UC.png",	small : "http://lh3.ggpht.com/-D1duRpkV7dw/Tw-fKrqtUWI/AAAAAAAAB6k/EQRPaIk2w08/mini4012_UC.png"},
		"4013" : {big : "http://lh4.ggpht.com/-ROU-EhFsh-c/Tw-d-dYv4fI/AAAAAAAABrs/QnIdfS4e94s/4013_C.png",		small : "http://lh5.ggpht.com/-Fq1wTxf4gWE/Tw-fK-Guk9I/AAAAAAAAB6s/7FIcJc6HKc8/mini4013_C.png"},
		"4016" : {big : "http://lh3.ggpht.com/-C3PNmC2MME0/Tw-d-0x0HCI/AAAAAAAABr0/8YbYGM48dNU/4016_UC.png",	small : "http://lh5.ggpht.com/-EGTYTi9dwfU/Tw-fLejEtKI/AAAAAAAAB64/Lr9V5pNAfxo/mini4016_UC.png"},
		"4017" : {big : "http://lh5.ggpht.com/-rfQlXBKMVqA/Tw-d_ZhYyCI/AAAAAAAABr8/b8f5VODo9WE/4017_C.png",		small : "http://lh4.ggpht.com/-iOejHsv4aZo/Tw-fMIkADtI/AAAAAAAAB68/9c3ey1-hCUs/mini4017_C.png"},
		"4018" : {big : "http://lh5.ggpht.com/-uVeqTHWcc68/Tw-eAHERfII/AAAAAAAABsI/Dc2IVUNTStM/4018_UC.png",	small : "http://lh3.ggpht.com/-bK7g519SPdA/Tw-fMbqiylI/AAAAAAAAB7E/nQDhLr61BaU/mini4018_UC.png"},
		"4019" : {big : "http://lh6.ggpht.com/-7k_2EAPmE6o/Tw-eAsTQmiI/AAAAAAAABsM/niYb0j6ckhs/4019_C.png",		small : "http://lh6.ggpht.com/-neocDdhm9qU/Tw-fM3M3iCI/AAAAAAAAB7M/XTv-OZG5Z3E/mini4019_C.png"},
		"4020" : {big : "http://lh3.ggpht.com/-aSkRwrhmen8/Tw-eBJArNGI/AAAAAAAABsY/uHrdSvo9ZZc/4020_UC.png",	small : "http://lh6.ggpht.com/-PsN0uCYsCGk/Tw-fNup88PI/AAAAAAAAB7Y/YA1YW8vL5ng/mini4020_UC.png"},
		"4021" : {big : "http://lh5.ggpht.com/-QxC0o31tA04/Tw-eB6XSSuI/AAAAAAAABsc/4SM5W-Pr30g/4021_C.png",		small : "http://lh3.ggpht.com/-k-1WgJ9Nc_o/Tw-fOTWWnvI/AAAAAAAAB7c/QBk5j6H4hkI/mini4021_C.png"},
		"4022" : {big : "http://lh3.ggpht.com/-ucQ3hZQIxZs/Tw-eCWYCR2I/AAAAAAAABsk/gH_YRKczwds/4022_UC.png",	small : "http://lh5.ggpht.com/-gVEE38n7L6o/Tw-fO0Yib-I/AAAAAAAAB7o/_eKf0LVU4Q8/mini4022_UC.png"},
		"4023" : {big : "http://lh4.ggpht.com/-PkdQwULVQaM/Tw-eC4uRXfI/AAAAAAAABss/uzHkacgAftU/4023_C.png",		small : "http://lh3.ggpht.com/-XXvLtxxCEeg/Tw-fP-SoPSI/AAAAAAAAB7s/dxnuZZqzxK8/mini4023_C.png"},
		"4024" : {big : "http://lh5.ggpht.com/-3VNBgcNSD6g/Tw-eDU40slI/AAAAAAAABs0/pvNeNUjBR3U/4024_SR.png",	small : "http://lh4.ggpht.com/--OwgobHV1_s/Tw-fQA9AF0I/AAAAAAAAB74/1ava4KPXxBY/mini4024_SR.png"},
		"4028" : {big : "http://lh3.ggpht.com/-0HeVXF-HOMA/Tw-eD1Q4MzI/AAAAAAAABs8/YGPxNQHTz14/4028_R.png",		small : "http://lh3.ggpht.com/-yJNKYbVFqt0/Tw-fRMVD05I/AAAAAAAAB78/DuclBtBQ2po/mini4028_R.png"},
		"4030" : {big : "http://lh5.ggpht.com/-xtM747_YqvM/Tw-eEv0PIGI/AAAAAAAABtE/XEFCRUZClLs/4030_R.png",		small : "http://lh5.ggpht.com/-vUmX1GQIkPk/Tw-fRjADXoI/AAAAAAAAB8A/mbq9ooT9GkM/mini4030_R.png"},
		"4035" : {big : "http://lh4.ggpht.com/-YLCdqNzykhY/Tw-eFFqc_lI/AAAAAAAABtU/l0fpwBGqWRc/4035_SR.png",	small : "http://lh5.ggpht.com/-KHU32TLqP0M/Tw-fRw5C4cI/AAAAAAAAB8I/hJ2Zp_rjLeg/mini4035_SR.png"},
		"4036" : {big : "http://lh3.ggpht.com/-Gj69DdGcyhk/Tw-eGmClhEI/AAAAAAAABtY/e4UQtA0ZHHg/4036_R.png",		small : "http://lh5.ggpht.com/-8dhDdG97rDI/Tw-fSWe8mBI/AAAAAAAAB8U/xzdtUQSpOUM/mini4036_R.png"},
		"4037" : {big : "http://lh5.ggpht.com/-9nmyldzPa0k/Tw-eHDiNnsI/AAAAAAAABtk/qbLez5nkP0Y/4037_R.png",		small : "http://lh4.ggpht.com/-4ge5b3q1H5s/Tw-fTDGgMsI/AAAAAAAAB8Y/ghY3fe5jcQA/mini4037_R.png"},
		"4040" : {big : "http://lh5.ggpht.com/-vS8DLVyqaJg/Tw-eIQLwhrI/AAAAAAAABto/BestJ6L3BQM/4040_UR.png",	small : "http://lh4.ggpht.com/-ab62y5Vd6Dg/Tw-fTSyviII/AAAAAAAAB8g/jEpmXv_LyKQ/mini4040_UR.png"},
		"4049" : {big : "http://lh3.ggpht.com/-dKMX73oFq_A/Tw-eI_6ISNI/AAAAAAAABts/CJ6Xw4gwRHQ/4049_SR.png",	small : "http://lh5.ggpht.com/-mCOkFh3rQBI/Tw-fUDJdfRI/AAAAAAAAB8o/wv2x9jNpLTY/mini4049_SR.png"},
		"4054" : {big : "http://lh3.ggpht.com/-49Tq73C4yhk/Tw-eJQkuviI/AAAAAAAABtw/WSVh6bPJSFw/4054_SR.png",	small : "http://lh5.ggpht.com/-kZbX9QZzwA0/Tw-fU_TS3xI/AAAAAAAAB84/rg99RQH5Qho/mini4054_SR.png"},
		"4058" : {big : "http://lh3.ggpht.com/-k0yvssmrUSw/Tw-eJhKtU9I/AAAAAAAABt8/_F_z85bu1W4/4058_UR.png",	small : "http://lh4.ggpht.com/-fu7xRQU_kro/Tw-fV1Xh_wI/AAAAAAAAB88/wsFyhXjMYh4/mini4058_UR.png"},
		"4062" : {big : "http://lh6.ggpht.com/-CIIns-7D3lg/Tw-eMtaEbFI/AAAAAAAABuI/O0Ga1McOFMA/4062_R.png",		small : "http://lh5.ggpht.com/-Mhvm2rck958/Tw-fWdv0SfI/AAAAAAAAB9A/05tV0Yv3qTk/mini4062_R.png"},
		"4066" : {big : "http://lh3.ggpht.com/-V87K9laI3cg/Tw-eNe7uWFI/AAAAAAAABuM/NPty5_7WWBs/4066_UR.png",	small : "http://lh6.ggpht.com/-CO73oKjPRJM/Tw-fW64TLwI/AAAAAAAAB9I/yc3PcyX27nI/mini4066_UR.png"}
	};

	var modFunc = function () {

		var cards;
		var front;
		var back1;
		var back2;
		var himeK;
		var himeH;
		var length;
		var i;

		var url = location.href;
		//php file name
		var filename = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));

		//text to change differs depending on the php file
		front = document.getElementsByClassName("name");
		back1 = document.getElementsByClassName("name1");
		back2 = document.getElementsByClassName("name2");
		length = front.length;
		if(length != 0){
			for(i = 0; i < length; i++){
				//hime kanji
				himeK = cardnames[front[i].innerHTML];
				//hime hiragana
				if(back1[i] != null)
					himeH = cardnames[back2[i].innerHTML];
				else
					himeH = null;
				if(himeK != null) {
					front[i].innerHTML = himeK;
					if (himeK.length >= 4) { front[i].style.fontSize = '1.3em' }
					if (himeK.length >= 5) { front[i].style.fontSize = '0.9em'; front[i].style.paddingTop = '3px'; }
					if (himeK.length >= 6) { front[i].style.fontSize = '0.8em'; front[i].style.paddingTop = '4px'; }
				}
				if(himeK != null && himeH != null){
					back1[i].innerHTML = himeK;
					back2[i].innerHTML = himeH;
				}
			}
		}
		
		//file, detail view
		cards = document.getElementsByClassName("statusParameter1");
		length = cards.length;
		if(length != 0){
			for(i = 0; i < length; i++){
				front = cards[i].getElementsByTagName("td");
				himeK = cardnames[front[2].innerHTML];
				if(himeK != null)
					front[2].innerHTML = himeK;
			}
		}
		
		//supplaments, etc.
		front = document.getElementsByClassName("thickbox");
		length = front.length;
		if(length != 0){
			for(i = 0; i < length; i++){
				himeK = cardnames[front[i].innerHTML];
				if(himeK != null)
					front[i].innerHTML = himeK;
			}
		}
		
		//history
		if(filename == "busyodas_history"){
			//busyoudasu rireki
			front = document.getElementsByClassName("center");
			length = front.length;
			for(i = 0; i < length; i += 6){
				himeK = cardnames[front[i+2].innerHTML];
				if(himeK != null)
					front[i+2].innerHTML = himeK;
			}
		}
		else if(filename == "union_history"){
			//gousei rireki
			front = document.getElementsByClassName("center");
			length = front.length;
			for(i = 0; i < length; i += 6){
				himeK = front[i+3].innerHTML;
				//busyou lvl
				himeH = himeK.substring(himeK.indexOf(" "));
				himeK = cardnames[himeK.substring(0, himeK.indexOf(" "))];
				if(himeK != null)
					front[i+3].innerHTML = himeK + himeH;
			}
		}
		
		//reports
		if(filename == "detail"){
			cards = document.getElementsByClassName("tables")
			length = cards.length;
			if(length == 4 || length == 3){
				//syupei
				cards = cards[1].getElementsByTagName("td");
				length = cards.length - 1;
				himeK = cards[length].innerHTML;
				//find busyou name, himeH as temp var
				himeH = himeK.substring(himeK.indexOf("参戦した武将:") + 7, himeK.indexOf("["));
				himeK = cardnames[himeH];
				if(himeK != null)
					cards[length].innerHTML = cards[length].innerHTML.replace(himeH, himeK);
			}
			else if(length == 6){
				//duel report
				cards = cards[5].getElementsByTagName("td");
				length = cards.length - 1;
				himeK = cards[length].innerHTML;
				//find busyou name, himeH as temp var
				himeH = himeK.substring(himeK.indexOf("デュエルデッキ：") + 8, himeK.indexOf("</p>"));
				himeH = himeH.split("、");
				for(i = 0; i < 5; i++){
					himeH[i] = himeH[i].substring(0, himeH[i].indexOf("("))
					himeK = cardnames[himeH[i]];
					if(himeK != null)
						cards[length].innerHTML = cards[length].innerHTML.replace(himeH[i], himeK);																				
				}
			}
			else{
				//letter from unei
				cards = document.getElementsByClassName("notice");
				if(cards != null){
					cards = document.getElementsByClassName("commonTables");
					cards = cards[0].getElementsByTagName("td");
					himeH = cards[4].innerHTML;
					himeH = himeH.substring(himeH.indexOf("武将名：") + 4, himeH.indexOf("　", himeH.indexOf(":")));
					himeK = cardnames[himeH];
					if(himeK != null)
						cards[4].innerHTML = cards[4].innerHTML.replace(himeH, himeK);
				}
			}
		}


		var elements = document.getElementsByClassName('illust');
		for (i = 0; i < elements.length; i++) {
			// 大イラストの置き換え
			if (elements[i].nodeName == 'IMG') {
				var imgname = elements[i].src.substring(elements[i].src.lastIndexOf("/") + 1).substring(0, 4);
				if (illust[imgname] != undefined && illust[imgname] != null) {
					elements[i].src = illust[imgname].big;
				}
			}
			// サムネイルの置き換え
			if (elements[i].nodeName == 'TD' || elements[i].nodeName == 'DIV') {
				var img = elements[i].getElementsByTagName('img')[0];
				var imgname = img.src.substring(img.src.lastIndexOf("/") + 1).substring(0, 4);
				if (illust[imgname] != undefined && illust[imgname] != null) {
					img.src = illust[imgname].small;
				}
			}
		}

		// 小イラストの置き換え
		var minielements = document.getElementsByClassName('illustMini');
		for (i = 0; i < minielements.length; i++) {
			var img = minielements[i].getElementsByTagName('img')[0];
			var imgname = img.src.substring(img.src.lastIndexOf("/") + 1).substring(0,4);
			if (illust[imgname] != undefined && illust[imgname] != null) {
				img.src = illust[imgname].small;
			}
		}
	};

	// document-endタイミングで置き換え実行
	modFunc();

	// [Chrome Extension] AutoPatchWork(https://chrome.google.com/extensions/detail/aeolcjbaammbkgaiagooljfdepnjmkfd)を使って
	// 次ページを自動読込した場合も置き換え実行
	addEventListener('AutoPatchWork.pageloaded', function() {
		modFunc();
	}, false);

	// [Chrome/FireFox/Safari Extension] AutoPagerize(http://autopagerize.net/)を使って
	// 次ページを自動読込した場合も置き換え実行
	addEventListener('GM_AutoPagerizeNextPageLoaded', function() {
		modFunc();
	}, false);

}) ();
