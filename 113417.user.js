// ==UserScript==
// @name           maou3gokushiplus
// @version        0.1.1
// @namespace      http://userscripts.org/scripts/show/113417
// @description    mixi版 ブラウザ三国志の武将イラストを某ゲームのイラストに置き換えるスクリプトです。色々勝手に使ってます。ごめんなさい。
// @icon           http://lh3.googleusercontent.com/-L3IDGst3c0U/TpbGacE_RUI/AAAAAAAABU4/x1eFfqHiYCs/s135/icon_maou3gokushi.png
// @include        http://*.3gokushi.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){
//----更新履歴----
// ver0.0.0: userscript.orgに管理情報を作成
// ver0.0.1: 試運用アップ
// ver0.1.0: AutoPatchWork/AutoPagerize対応 + アイコン追加
// ver0.1.1: おっさん３匹(アルベルト、ノア、ベルトラス)も無理やり追加

	//create hash map, kanji
	var cardnames = {
		"徐庶"			: "ﾘｭｱﾅ",
		"じょしょ"		: "りゅあな",
		"関平"			: "カグヤ",
		"かんぺい"		: "かぐや",
		"簡雍"			: "ﾕｰﾒﾘｱ",
		"かんよう"		: "ゆーめりあ",
		"馬謖"			: "ネム",
		"ばしょく"		: "ねむ",
		"沙摩柯"		: "ニム",
		"しゃまか"		: "にむ",
		"姜維"			: "ｴｳﾞｧﾝ",
		"きょうい"		: "えう゛ぁん",
		"黄月英"		: "マリア",
		"こうげつえい"	: "まりあ",
		"司馬懿"		: "ｾﾝｼｱ",
		"しばい"		: "せんしあ",
		"曹仁"			: "ｻｰｼｬ",
		"そうじん"		: "さーしゃ",
		"蔡瑁"			: "ﾌｨﾙﾐﾘｱ",
		"さいぼう"		: "ふぃるみりあ",
		"曹真"			: "優希",
		"そうしん"		: "ゆうき",
		"甄姫"			: "ジーナ",
		"しんき"		: "じーな",
		"諸葛瑾"		: "ノム",
		"しょかつきん"	: "のむ",
		"韓当"			: "チマ",
		"かんとう"		: "ちま",
		"孫翊"			: "ｸｰﾃﾞﾙｶ",
		"そんよく"		: "くーでるか",
		"祖茂"			: "コトネ",
		"そも"			: "ことね",
		"太史慈"		: "エスト",
		"たいしじ"		: "えすと",
		"魯粛"			: "ｾｼﾘｰ",
		"ろしゅく"		: "せしりー",
		"張紘"			: "ﾃﾞｨｰﾈ",
		"ちょうこう"	: "でぃーね",
		"孔融"			: "ｱﾝｼﾞｪﾘｶ",
		"こうゆう"		: "あんじぇりか",
		"曹昂"			: "ｱﾘｯｻ",
		"そうこう"		: "ありっさ",
		"華歆"			: "ｱﾙﾍﾞﾙﾄ",
		"かきん"		: "あるべると",
		"雷銅"			: "ノア",
		"らいどう"		: "のあ",
		"闞沢"			: "ﾍﾞﾙﾄﾗｽ",
		"かんたく"		: "べるとらす",
	};
	var illust = {
		"1014" : {big : "http://lh5.ggpht.com/-wUW0PZc9tbE/TnbrhFtOZZI/AAAAAAAABMs/bpAu2OMAE2k/1014_UC.png",	small : "http://lh4.ggpht.com/-FvUFO3SkSeA/Tnbr8Y0QmFI/AAAAAAAABP8/DzuAiHaipxE/mini1014_UC.png"},
		"1022" : {big : "http://lh3.ggpht.com/-DCEYrFRLLRc/TnbrhxX5tZI/AAAAAAAABMw/NR8XN8yBX70/1022_UC.png",	small : "http://lh4.ggpht.com/-nhYM2ukhfr4/Tnbr8oMHBEI/AAAAAAAABQA/_mTUFbj4wCk/mini1022_UC.png"},
		"1025" : {big : "http://lh3.ggpht.com/-5ic2P0IQyz4/Tnbriha-PXI/AAAAAAAABM0/BoBC1o6fC1I/1025_UC.png",	small : "http://lh5.ggpht.com/-QTZjJhBxTxc/Tnbr80ibDDI/AAAAAAAABQE/_NQi_WYLRMk/mini1025_UC.png"},
		"1026" : {big : "http://lh5.ggpht.com/-MuLlSG_WkJ8/Tnbri12n-YI/AAAAAAAABM4/aVDqv37zJ8M/1026_C.png",		small : "http://lh4.ggpht.com/-RpkaVK3JLxo/Tnbr9GKBV4I/AAAAAAAABQI/dFnYnAMqwlQ/mini1026_C.png"},
		"1027" : {big : "http://lh4.ggpht.com/-_LoLkLzCBK0/TnbrjHBdXeI/AAAAAAAABM8/R1qPY9tG57g/1027_UC.png",	small : "http://lh4.ggpht.com/-o8-w7pQioto/Tnbr9dqYAAI/AAAAAAAABQM/RoH9eJum4QY/mini1027_UC.png"},
		"1028" : {big : "http://lh5.ggpht.com/-RcCDMPgEw34/TnbrjdQNXUI/AAAAAAAABNA/CCpML_JXpfM/1028_C.png",		small : "http://lh5.ggpht.com/-yM_G9vMJxMo/Tnbr9gAUCuI/AAAAAAAABQQ/66HDw3i1G7E/mini1028_C.png"},
		"1029" : {big : "http://lh6.ggpht.com/-8sB-Z-nbM10/Tw7h-lJBlHI/AAAAAAAABcA/1QHMsOWdJgQ/1029_UC.png",	small : "http://lh3.ggpht.com/-wY_vSChxk6A/Tw7iFZz3fZI/AAAAAAAABdM/qAUDU9w6E9g/mini1029_UC.png"},
		"1030" : {big : "http://lh5.ggpht.com/-oUG4oce7ENY/Tw7h_LdKNhI/AAAAAAAABcE/RWlnlEbHwlc/1030_C.png",		small : "http://lh5.ggpht.com/-0miEqsqGsOk/Tw7iGKOy5qI/AAAAAAAABdU/PYr60j4Y2kQ/mini1030_C.png"},
		"1033" : {big : "http://lh3.ggpht.com/-zZsBagZMuMU/Tnbrj2R1ykI/AAAAAAAABNE/S4c2l3Bv9yk/1033_UC.png",	small : "http://lh5.ggpht.com/-E6tM1DFLrIg/Tnbr9tU4DII/AAAAAAAABQU/-tJfRdtOKOk/mini1033_UC.png"},
		"1034" : {big : "http://lh3.ggpht.com/--DlGpgIevec/TnbrkNqwPoI/AAAAAAAABNI/GZXYBiUeL38/1034_C.png",		small : "http://lh6.ggpht.com/-32ydS-TK0qU/Tnbr-OifJjI/AAAAAAAABQY/Ed-BfcN-BBU/mini1034_C.png"},
		"1036" : {big : "http://lh3.ggpht.com/--bj7yeqQ6_U/TnbrkeVLi6I/AAAAAAAABNM/OUlIBxtSg6g/1036_R.png",		small : "http://lh6.ggpht.com/-YTj8Lc88GtY/Tnbr-Tg6T7I/AAAAAAAABQc/_DgSFN68V5o/mini1036_R.png"},
		"1041" : {big : "http://lh6.ggpht.com/-rSoXjn3TlUQ/Tnbrk4i4BJI/AAAAAAAABNQ/dR5lVeACmFc/1041_SR.png",	small : "http://lh3.ggpht.com/-oSl4heRIG-s/Tnbr-r6isSI/AAAAAAAABQg/MhM8AqIOnQg/mini1041_SR.png"},
		"1053" : {big : "http://lh5.ggpht.com/-7Uub1jWnVMg/TnbrlKhKF-I/AAAAAAAABNU/waQy37FFOmc/1053_SR.png",	small : "http://lh6.ggpht.com/-6qaEPho6OO8/Tnbr--XsMQI/AAAAAAAABQk/zXccyp_wYtU/mini1053_SR.png"},
		"1055" : {big : "http://lh6.ggpht.com/-dcCZnfdMKCg/TnbrlrvV-iI/AAAAAAAABNY/0pLun3M1njU/1055_R.png",		small : "http://lh5.ggpht.com/--t57dl3fVzE/Tnbr_H-Cc8I/AAAAAAAABQo/x4owE1R7cbo/mini1055_R.png"},
		"1058" : {big : "http://lh4.ggpht.com/-NwEsqnmrqMQ/Tnbrl4-G4TI/AAAAAAAABNc/EGg7YPDsCQw/1058_C.png",		small : "http://lh6.ggpht.com/-C3kDr_EQzYU/Tnbr_XvyQZI/AAAAAAAABQs/2kjTeR8rcUE/mini1058_C.png"},
		"1061" : {big : "http://lh5.ggpht.com/-aKSNYSXA7as/TnbrmRDRxlI/AAAAAAAABNg/Z6Sosb_-l5Y/1061_UR.png",	small : "http://lh6.ggpht.com/-K76MgVoZ1Q0/Tnbr_Rc-KXI/AAAAAAAABQw/xnzVLvKnlgY/mini1061_UR.png"},
		"1076" : {big : "http://lh4.ggpht.com/-25oou821UtA/TnbrmvBDueI/AAAAAAAABNk/edVrn08Laac/1076_R.png",		small : "http://lh6.ggpht.com/-sKYGdeXO2Zo/Tnbr_h51ztI/AAAAAAAABQ0/pGPEGbBnJh4/mini1076_R.png"},
		"1082" : {big : "http://lh4.ggpht.com/-i7abQGEby-s/Tnbrm4QmqdI/AAAAAAAABNo/kHuqL7aNc5I/1082_R.png",		small : "http://lh5.ggpht.com/-ke7h2PoPX3E/Tnbr_9I7L1I/AAAAAAAABQ4/UG9e7qWluaw/mini1082_R.png"},
		"1084" : {big : "http://lh5.ggpht.com/-hH2ZCei9bl4/TnbrncVNi3I/AAAAAAAABNs/2-hp6LKCKMU/1084_SR.png",	small : "http://lh5.ggpht.com/-1W2bVxS-DU8/TnbsAKzW0GI/AAAAAAAABQ8/oig5sA7mKQw/mini1084_SR.png"},
		"1088" : {big : "http://lh6.ggpht.com/-Bq4hStoGH4U/Tw7h_i1NMDI/AAAAAAAABcM/8Zxe6JjRZBE/1088_R.png",		small : "http://lh3.ggpht.com/-seHtXfzpR_0/Tw7iGn9GRtI/AAAAAAAABdc/mKsGikDjQdo/mini1088_R.png"},
		"1093" : {big : "http://lh3.ggpht.com/-bZrfGUkwyEM/Tw7iAeA7DTI/AAAAAAAABcU/Rz9lLMxNz0A/1093_SR.png",	small : "http://lh4.ggpht.com/-U_C776A7ACI/Tw7iHBchD5I/AAAAAAAABdg/BCFxou4leRk/mini1093_SR.png"},
		"2002" : {big : "http://lh6.ggpht.com/-Mnut-f_FQnw/Tnbrnmp5O0I/AAAAAAAABNw/BomyQtOw-S0/2002_SR.png",	small : "http://lh5.ggpht.com/-AwfOFwNcIKI/TnbsAsWgSDI/AAAAAAAABRA/aA0ICGkSX2U/mini2002_SR.png"},
		"2014" : {big : "http://lh6.ggpht.com/-Lwkfv94BGIs/TnbroKrfBYI/AAAAAAAABN0/tcqLSMWOOl0/2014_UC.png",	small : "http://lh3.ggpht.com/-b4xlwb5U8Mg/TnbsAiCaz5I/AAAAAAAABRE/pYlDFys2EN4/mini2014_UC.png"},
		"2015" : {big : "http://lh6.ggpht.com/-4QDZp6ErRXY/TnbrofkSocI/AAAAAAAABN4/-3AxRUZq7Nk/2015_C.png",		small : "http://lh5.ggpht.com/-Rt0OPFajnQI/TnbsBH7qLmI/AAAAAAAABRI/Dpqw48YkmP8/mini2015_C.png"},
		"2020" : {big : "http://lh5.ggpht.com/-8BAV_WvUj9c/Tnbro_ev5fI/AAAAAAAABN8/4DqVwM5b4QI/2020_UC.png",	small : "http://lh4.ggpht.com/-2rmXqMW-Jz8/TnbsBXtIVeI/AAAAAAAABRM/VajveyMnqFg/mini2020_UC.png"},
		"2021" : {big : "http://lh6.ggpht.com/-TnQrOkCfewY/TnbrpZJS4NI/AAAAAAAABOA/cqrFuPRShaI/2021_C.png",		small : "http://lh3.ggpht.com/-BZJYl8gRnKE/TnbsBre-2JI/AAAAAAAABRQ/gETpC1nguZg/mini2021_C.png"},
		"2026" : {big : "http://lh4.ggpht.com/-ws0PHZmg1do/TnbrpqUnaZI/AAAAAAAABOE/XiQ0On554jc/2026_UC.png",	small : "http://lh5.ggpht.com/-Opj6rPGD1pM/TnbsBzunVaI/AAAAAAAABRU/DD-pZEUqhnw/mini2026_UC.png"},
		"2029" : {big : "http://lh3.ggpht.com/-y0mMfQNyxnU/Tw7iBBCQcGI/AAAAAAAABcc/pTZkNa-r6rc/2029_UC.png",	small : "http://lh3.ggpht.com/-acnZ_9spqIY/Tw7iHxix9-I/AAAAAAAABdw/2HpbAjlV8pQ/mini2029_UC.png"},
		"2030" : {big : "http://lh4.ggpht.com/-98uKBSsetpI/Tw7iBynuaLI/AAAAAAAABck/ZHQoxK6zQ30/2030_C.png",		small : "http://lh6.ggpht.com/-voEmNa5lDXY/Tw7iIpl520I/AAAAAAAABd0/gtcQdyHWV4c/mini2030_C.png"},
		"2033" : {big : "http://lh5.ggpht.com/-XJlhKWVUb3E/TnbrpzDj1sI/AAAAAAAABOI/tJzJWeQiacQ/2033_UC.png",	small : "http://lh4.ggpht.com/-nYRuqPaNMOw/TnbsCAFFSbI/AAAAAAAABRY/FuSG3XT5uhg/mini2033_UC.png"},
		"2034" : {big : "http://lh6.ggpht.com/-oeC9JsAMVJg/TnbrqM7LwaI/AAAAAAAABOM/a_X56h8nC1A/2034_C.png",		small : "http://lh5.ggpht.com/-zcitzWg2oT4/TnbsCagJhdI/AAAAAAAABRc/7S54SPX0IjQ/mini2034_C.png"},
		"2047" : {big : "http://lh3.ggpht.com/--L3mZcZJPIU/TnbrqgSuSkI/AAAAAAAABOQ/drRqO31dzaA/2047_R.png",		small : "http://lh5.ggpht.com/-149N-hmcTpI/TnbsChQoGNI/AAAAAAAABRg/lvCB0HNyDyk/mini2047_R.png"},
		"2048" : {big : "http://lh6.ggpht.com/-JFSZXFQPJ0E/TnbrqzCc22I/AAAAAAAABOU/tu0QNR1PZe4/2048_R.png",		small : "http://lh4.ggpht.com/-8WDUWAcltJE/TnbsC9i-YzI/AAAAAAAABRk/nmng14P4Fe4/mini2048_R.png"},
		"2056" : {big : "http://lh5.ggpht.com/-dhd5RsFEzl4/TnbrrL6i5KI/AAAAAAAABOY/24tp7xChsRs/2056_C.png",		small : "http://lh3.ggpht.com/-ZiJStWcT-Fc/TnbsDFIcEpI/AAAAAAAABRo/5PyESoDrcTQ/mini2056_C.png"},
		"2057" : {big : "http://lh4.ggpht.com/-_2FCBM33Ees/TnbrrsArj2I/AAAAAAAABOc/R_9DUQjYyU4/2057_R.png",		small : "http://lh6.ggpht.com/-E9uLb9vMBOs/TnbsDYgq0yI/AAAAAAAABRs/N4TlV0YEctc/mini2057_R.png"},
		"2065" : {big : "http://lh5.ggpht.com/-QYVsJ-BIgj4/Tnbrr4P7yPI/AAAAAAAABOg/E2sU6u6LmRc/2065_UR.png",	small : "http://lh3.ggpht.com/-4aAyikzxBiU/TnbsDhAaF-I/AAAAAAAABRw/6PtKIbEDlAg/mini2065_UR.png"},
		"2072" : {big : "http://lh5.ggpht.com/-12XZVHE4C1c/TnbrseUp6tI/AAAAAAAABOk/-26jJCXr_s8/2072_SR.png",	small : "http://lh4.ggpht.com/-JhzwtN9mN9E/TnbsDwdCHXI/AAAAAAAABR0/_C1nb0gKeS8/mini2072_SR.png"},
		"2083" : {big : "http://lh6.ggpht.com/-eifbuIuU0jo/Tnbrsj-59TI/AAAAAAAABOo/7SulIo-ttVU/2083_UR.png",	small : "http://lh6.ggpht.com/-HCbI_Pzzp7w/TnbsECPTs1I/AAAAAAAABR4/9_ECqBLgtew/mini2083_UR.png"},
		"2100" : {big : "http://lh6.ggpht.com/-3KwZNRYvlmM/Tw7iCUAa2UI/AAAAAAAABcs/ctubbrJe-j8/2100_UR.png",	small : "http://lh6.ggpht.com/-HDB-65Vi_Rw/Tw7iJYfCyWI/AAAAAAAABeA/dYhAQCYp4G8/mini2100_UR.png"},
		"3014" : {big : "http://lh4.ggpht.com/-UnA8seDF198/Tnbrs4JagdI/AAAAAAAABOs/mNJhmkWKrZI/3014_UC.png",	small : "http://lh3.ggpht.com/-GVwaWx7CfXA/TnbsEbwv9oI/AAAAAAAABR8/-pXWzRCOR9E/mini3014_UC.png"},
		"3017" : {big : "http://lh5.ggpht.com/-ldQaE8WBvzY/TnbrtSmtQCI/AAAAAAAABOw/1Jj_CW6M-eE/3017_UC.png",	small : "http://lh4.ggpht.com/-nnBbpAKr5Oc/TnbsEmMjwCI/AAAAAAAABSA/exBb2GiOaLM/mini3017_UC.png"},
		"3018" : {big : "http://lh5.ggpht.com/-AU-U9KdngXk/Tnbrto_MGWI/AAAAAAAABO0/vmPS2fCcQWg/3018_C.png",		small : "http://lh5.ggpht.com/-Ji2yseqfmqQ/TnbsE-NbsrI/AAAAAAAABSE/GCJR_DvTRm8/mini3018_C.png"},
		"3021" : {big : "http://lh6.ggpht.com/-V-EsBcUWGgM/Tw7iC8isQpI/AAAAAAAABc4/9hb_Ba1UToY/3021_UC.png",	small : "http://lh3.ggpht.com/-53IePDMIHH0/Tw7iKdgDB8I/AAAAAAAABeE/Llvx3Xo-wm4/mini3021_UC.png"},
		"3022" : {big : "http://lh5.ggpht.com/-BTa0QMFui_w/Tw7iD2gfz4I/AAAAAAAABc8/rk0U7jaakPo/3022_C.png",		small : "http://lh3.ggpht.com/-9yEjlLUvQOw/Tw7iMJtEx6I/AAAAAAAABeQ/5RXOJ0ZrDWE/mini3022_C.png"},
		"3025" : {big : "http://lh6.ggpht.com/-kT4EAurVA9w/TnbrtyDwI0I/AAAAAAAABO4/Br24d3BMR1M/3025_UC.png",	small : "http://lh5.ggpht.com/-aaiTme1K954/TnbsFClu9-I/AAAAAAAABSI/CjJzX5IE3d8/mini3025_UC.png"},
		"3026" : {big : "http://lh4.ggpht.com/-DCFXcEp-5bo/TnbruMZFuiI/AAAAAAAABO8/y3wTXsX7T0E/3026_C.png",		small : "http://lh3.ggpht.com/-f5s3oBiEQUI/TnbsFUXzsoI/AAAAAAAABSM/P0q6UI2BwQM/mini3026_C.png"},
		"3029" : {big : "http://lh3.ggpht.com/-L25jFVIYO60/TnbrugSiqDI/AAAAAAAABPA/mmLhpZ9bJm0/3029_UC.png",	small : "http://lh3.ggpht.com/-1BPyUI17vSM/TnbsFXO_BlI/AAAAAAAABSQ/guPo2GB89q0/mini3029_UC.png"},
		"3030" : {big : "http://lh4.ggpht.com/-XqJZiUD70lA/TnbrvG91B2I/AAAAAAAABPE/S0C9SkHh4Oc/3030_C.png",		small : "http://lh5.ggpht.com/-VVIcvaFUTkc/TnbsF6_n_DI/AAAAAAAABSU/gdoqrX4u7eQ/mini3030_C.png"},
		"3034" : {big : "http://lh4.ggpht.com/-DxBk-gVS_nA/TnbrwAfRmrI/AAAAAAAABPI/nqNt3sf5fJc/3034_R.png",		small : "http://lh6.ggpht.com/-Lbcfjfb-guo/TnbsFx6EONI/AAAAAAAABSY/-dnomT5TDvY/mini3034_R.png"},
		"3035" : {big : "http://lh6.ggpht.com/-7H3d4ra2nag/TnbrxPZHEkI/AAAAAAAABPM/7t2DiYPIjgs/3035_UC.png",	small : "http://lh5.ggpht.com/-rpLqrrTchXo/TnbsGEyybRI/AAAAAAAABSc/H3pZqBRqK54/mini3035_UC.png"},
		"3036" : {big : "http://lh6.ggpht.com/-v5D77JQbKIs/TnbryGGPQXI/AAAAAAAABPQ/6sjT1Pw5DaE/3036_R.png",		small : "http://lh6.ggpht.com/-FL501SThvw0/TnbsGWrGWlI/AAAAAAAABSg/lolFvwB4ers/mini3036_R.png"},
		"3048" : {big : "http://lh4.ggpht.com/-GZxDQbpjtaA/TnbrzCBFmvI/AAAAAAAABPU/tuYzYEpINhI/3048_SR.png",	small : "http://lh4.ggpht.com/-lVZ8keMjmTY/TnbsGt-T2XI/AAAAAAAABSk/kYFBy9vLKcA/mini3048_SR.png"},
		"3050" : {big : "http://lh3.ggpht.com/-3BT3FL7nG9s/Tnbrz78dp_I/AAAAAAAABPY/ckal7Q6TOnQ/3050_R.png",		small : "http://lh4.ggpht.com/-Ye-IJEhW6lQ/TnbsG2HmMsI/AAAAAAAABSo/7YGYI2cFByY/mini3050_R.png"},
		"3059" : {big : "http://lh4.ggpht.com/-WoKR0wHmcJQ/Tnbr1RCQ7WI/AAAAAAAABPc/bH6Q6eZ0CVc/3059_UC.png",	small : "http://lh3.ggpht.com/-8URa8gwllCk/TnbsHbV7VCI/AAAAAAAABSs/9VFAEHk7JkU/mini3059_UC.png"},
		"3061" : {big : "http://lh5.ggpht.com/-tv_koycYxms/Tnbr1x6_khI/AAAAAAAABPg/U0VPrZHgvWU/3061_R.png",		small : "http://lh6.ggpht.com/-VAkQCxusuZU/TnbsHka92mI/AAAAAAAABSw/dYuhnWynmHE/mini3061_R.png"},
		"3068" : {big : "http://lh6.ggpht.com/-htYhwtZbvHY/Tnbr2-f0HeI/AAAAAAAABPk/lo8qJUf-IW0/3068_UR.png",	small : "http://lh6.ggpht.com/-AL8qgSHTvwE/TnbsH_bsfoI/AAAAAAAABS0/nqxTWhsZ9KY/mini3068_UR.png"},
		"3069" : {big : "http://lh6.ggpht.com/-tlFlXp9eVxA/Tnbr4NcPe6I/AAAAAAAABPo/WoeYY_gn8Jk/3069_SR.png",	small : "http://lh3.ggpht.com/-ImUScu5gB3w/TnbsH_BBwfI/AAAAAAAABS4/Ojsw6Q79avQ/mini3069_SR.png"},
		"3072" : {big : "http://lh4.ggpht.com/-Yycbcwtkrvs/Tnbr40PaMTI/AAAAAAAABPs/hcUz60vD8tQ/3072_R.png",		small : "http://lh3.ggpht.com/-4eHCnq1fDcM/TnbsIcBHfkI/AAAAAAAABS8/YKPdYqSd3t0/mini3072_R.png"},
		"3076" : {big : "http://lh5.ggpht.com/-zT40zJFLBDk/Tnbr6OTeuWI/AAAAAAAABPw/wnOud3JMGyA/3076_SR.png",	small : "http://lh3.ggpht.com/-ZHPJiJDYv-Y/TnbsIhS6ctI/AAAAAAAABTA/pYQgkO6N24M/mini3076_SR.png"},
		"3084" : {big : "http://lh4.ggpht.com/-yuXlXgJWI6s/Tw7iEUQsVqI/AAAAAAAABdI/mZspsCISU60/3084_UC.png",	small : "http://lh6.ggpht.com/-GBCdQZM1_8g/Tw7iMtkJkFI/AAAAAAAABeU/EbIQHgwi1c8/mini3084_UC.png"},
		"4012" : {big : "http://lh4.ggpht.com/-6cDzu7GJW2s/Tnbr6_uuedI/AAAAAAAABP0/fkbZJnpt1uU/4012_UC.png",	small : "http://lh6.ggpht.com/-7zZhjxWnnzA/TnbsI12YpKI/AAAAAAAABTE/jRXZqaGqkUM/mini4012_UC.png"},
		"4013" : {big : "http://lh4.ggpht.com/-XC3JueAFx-s/Tnbr76NOO_I/AAAAAAAABP4/cqYxWF0J8Zs/4013_C.png",		small : "http://lh6.ggpht.com/-fgk95fh5RyQ/TnbsJJtDp8I/AAAAAAAABTI/xx1j_zD6Gy4/mini4013_C.png"}
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
				if(himeK != null)
					front[i].innerHTML = himeK;
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
