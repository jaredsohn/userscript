// ==UserScript==
// @name           fake3gokushi
// @version        3.0.2
// @namespace      http://userscripts.org/scripts/show/87245
// @description    mixi版 ブラウザ三国志の武将イラストを某ゲームのイラストに置き換えるスクリプトです。色々勝手に使ってます。ごめんなさい。
// @include         http://*.sangokushi.in.th/*
// @run-at         document-start
// ==/UserScript==
( function(){
//----更新履歴----
// ver1.0.0: 初回作成
// ver1.0.1: 何かカードを追加(忘れた)
// ver1.0.2: 何かカードを追加(忘れた)
// ver1.0.3: 何かカードを追加(忘れた)
// ver1.0.4: No.3052を追加
// ver1.0.5: No.1049/3046/2058を追加
// ver1.0.6: No.1048/1057/2060/3002を追加, No.4004を差替
// ver1.0.7: No.2051を追加
// ver2.0.0: pngファイルをアルファチャンネル付き画像に置き換え, ついでに立ち絵画像もいくつか変更
// ver2.0.1: No.1035/1050/3047/3051を追加
// ver2.0.2: No.1059/1060/2063/2064/3053/3054/4038を追加
// ver2.0.3: No.2062を追加
// ver3.0.0: プロフィールと水鏡先生を変更。だってムサいんだもん。
// ver3.0.1: 某所から要望があってNo.3026を変更
// ver3.0.2: No.1063/1066/2067/2068を追加

	var illust = {
		"1001" : {big : "http://loda.jp/browser3s/?id=518.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUZsPKcEI/AAAAAAAAAkQ/EoEJ0mfmvhE/mini1001_R.png"},
		"1002" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOTkiIB3wI/AAAAAAAAAeM/2vE9018si6I/1002_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUZ3ezkhI/AAAAAAAAAkU/O06jRXeTVY8/mini1002_SR.png"},
		"1003" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTlKzdB9I/AAAAAAAAAeQ/tpFPmDENwrA/1003_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUaI_87xI/AAAAAAAAAkY/WyUuJXm0rTw/mini1003_SR.png"},
		"1004" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOTlvx96AI/AAAAAAAAAeU/Irgpl43JDIk/1004_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUaobSVkI/AAAAAAAAAkc/mItLeFSQFj4/mini1004_SR.png"},
		"1005" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTmALJ8YI/AAAAAAAAAeY/VvB9QwN6CWM/1005_R.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUa4eszrI/AAAAAAAAAkg/IJPOkXo13yE/mini1005_R.png"},
		"1006" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTmmFTknI/AAAAAAAAAec/UyFRBbLjMe4/1006_SR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUbRg6uYI/AAAAAAAAAkk/GQO0eXXThHc/mini1006_SR.png"},
		"1007" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOTnWNJ10I/AAAAAAAAAeg/PGwMbRJxS4Y/1007_UC.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUbxQnr5I/AAAAAAAAAko/DTr0zqQYVX0/mini1007_UC.png"},
		"1008" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTn1WWp2I/AAAAAAAAAek/C_YmyyxTd84/1008_R.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUcAsJrWI/AAAAAAAAAks/FGwKQH06Fnk/mini1008_R.png"},
		"1009" : {big : "http://loda.jp/browser3s/?id=536.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUcikXd4I/AAAAAAAAAkw/Ut5kwBAOh3s/mini1009_UC.png"},
		"1010" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOTpLMbV5I/AAAAAAAAAes/TejrEnpfw3o/1010_UC.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUdNnmgKI/AAAAAAAAAk0/bKeGF9MPDwo/mini1010_UC.png"},
		"1011" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOTpk0SpEI/AAAAAAAAAew/GotVnyAglPk/1011_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUdi88fSI/AAAAAAAAAk4/fvtvBNQlBP4/mini1011_R.png"},
		"1012" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTqJs5DgI/AAAAAAAAAe0/mnVdW6LfqMc/1012_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUd73E8WI/AAAAAAAAAk8/mYVmgyfi7HU/mini1012_UC.png"},
		"1013" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOTqgwuavI/AAAAAAAAAe4/WG7RzdC5vsE/1013_C.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUeTyzoSI/AAAAAAAAAlA/wHm5eDDUU80/mini1013_C.png"},
		"1015" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTrKz9fJI/AAAAAAAAAe8/CzjgpvjUBQo/1015_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUegz9BnI/AAAAAAAAAlE/4BbojFiB1CY/mini1015_UC.png"},
		"1016" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOTrp2QYNI/AAAAAAAAAfA/3vrP11RJYEU/1016_R.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUfPg3DvI/AAAAAAAAAlI/mTA_Zn_uf1w/mini1016_R.png"},
		"1019" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTsDMJByI/AAAAAAAAAfE/nbdX6piT0fE/1019_UC.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUfR1VSEI/AAAAAAAAAlM/M2Qq5LwEuyQ/mini1019_UC.png"},
		"1020" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOTsrs6YII/AAAAAAAAAfI/tu8NLGV2fxI/1020_C.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUf15XzzI/AAAAAAAAAlQ/3190cF8t04E/mini1020_C.png"},
		"1026" : {big : "http://loda.jp/browser3s/?id=562.png"},
                "1031" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTtQaU9_I/AAAAAAAAAfM/bEer_ktQ-hc/1031_UC.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUgUSpuxI/AAAAAAAAAlU/goeUvT_rnMs/mini1031_UC.png"},
		"1032" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOTtgYMJJI/AAAAAAAAAfQ/FRRVLnTgP2s/1032_C.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUghWGsKI/AAAAAAAAAlY/IuvDlq4ZzcE/mini1032_C.png"},
		"1035" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMO7r-NLwTI/AAAAAAAAAqk/zhHtNU16zcI/1035_SR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMO7t9xSPTI/AAAAAAAAAq0/squoX-Cj4ZU/mini1035_SR.png"},
		"1037" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTuYz4nEI/AAAAAAAAAfU/rf-kO2Bszk4/1037_SR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUhE23ECI/AAAAAAAAAlc/oe-03lCqEFM/mini1037_SR.png"},
		"1038" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOTuxMdFrI/AAAAAAAAAfY/DP1C9wHa_bw/1038_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUhU5dlJI/AAAAAAAAAlg/d7TMD6EQMeg/mini1038_R.png"},
		"1039" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTvWispQI/AAAAAAAAAfc/h5HV9wHDoY0/1039_UC.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUh0Gph6I/AAAAAAAAAlk/c9bYTZlHHVk/mini1039_UC.png"},
		"1040" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOTwDfzjrI/AAAAAAAAAfg/sNJytpH3ci0/1040_C.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUiEzn-yI/AAAAAAAAAlo/q0tFJq2H8vY/mini1040_C.png"},
		"1042" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTwgtvNOI/AAAAAAAAAfk/5BrZIT30sZ8/1042_R.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUinPWvMI/AAAAAAAAAls/4N-ffu3Bemw/mini1042_R.png"},
		"1043" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOTxNZmVNI/AAAAAAAAAfo/02HRkgS01R4/1043_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUjEXybwI/AAAAAAAAAlw/JwkETl0TZZs/mini1043_R.png"},
		"1046" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOTx7Dh-oI/AAAAAAAAAfs/hRpjingdTXg/1046_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUjWkoo-I/AAAAAAAAAl0/KJ6wmNYDy9Q/mini1046_UR.png"},
		"1047" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOTyb7RgFI/AAAAAAAAAfw/BMHpsRJKc-w/1047_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUj5JSL-I/AAAAAAAAAl4/sWuGa8zcXdI/mini1047_UR.png"},
		"1048" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTy6P-Z-I/AAAAAAAAAf0/HreXU0rsY6o/1048_UR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUkMID6MI/AAAAAAAAAl8/zV5SEgUkVlE/mini1048_UR.png"},
		"1049" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOTzXAtIpI/AAAAAAAAAf4/jZ3RIheokno/1049_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUkhNbjtI/AAAAAAAAAmA/F9Poi_UG5wc/mini1049_UR.png"},
		"1050" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMO7sR0NHCI/AAAAAAAAAqo/QjiqYgzHhLE/1050_UR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMO7uB87YDI/AAAAAAAAAq4/4e3bJ-hx_rE/mini1050_UR.png"},
		"1051" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOTzmEUYlI/AAAAAAAAAf8/LwDGPF2Oq0A/1051_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUk5_-HgI/AAAAAAAAAmE/nteIqBu6E1A/mini1051_UR.png"},
		"1052" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOT0ZPd5wI/AAAAAAAAAgA/cRk5eGUqWH0/1052_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUldgnLoI/AAAAAAAAAmI/nzKXDcxGW9I/mini1052_SR.png"},
		"1056" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOT04LC2hI/AAAAAAAAAgE/_ARAPs2gk_s/1056_R.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUlvKe_9I/AAAAAAAAAmM/PXuvu2HiKHg/mini1056_R.png"},
		"1057" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOT1mHFRSI/AAAAAAAAAgI/FqHYik8plNg/1057_SR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUmK_HvII/AAAAAAAAAmQ/avhPB7xDvkE/mini1057_SR.png"},
		"1059" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMclNDonneI/AAAAAAAAArM/v5oOae5ndZE/1059_C.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMclPnbOkgI/AAAAAAAAAro/dTOZdbuDPr0/mini1059_C.png"},
		"1060" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMclNXrDMgI/AAAAAAAAArQ/X_Wm3lC4XBk/1060_R.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMclQKmrAcI/AAAAAAAAArs/qqwEEDWxPto/mini1060_R.png"},
		"1063" : {big : "http://loda.jp/browser3s/?id=460.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TPTMuPE1raI/AAAAAAAAAuk/IdFmFt4jSQg/mini1063_UC.png"},
		"1066" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TPTMrqeil9I/AAAAAAAAAuY/zNS7FATf_1Q/1066_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TPTMulgZL2I/AAAAAAAAAuo/wDgYMve-Ln8/mini1066_SR.png"},
		"2001" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOT2OaGcGI/AAAAAAAAAgM/pcOUXYr3CD0/2001_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUmtgqiuI/AAAAAAAAAmU/x2kq6bW2hyk/mini2001_SR.png"},
		"2003" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT2nAuPJI/AAAAAAAAAgQ/BHxDBk7_PRI/2003_R.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUm9CVPnI/AAAAAAAAAmY/wNNEzgPQN0c/mini2003_R.png"},
		"2004" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOT3MuFcHI/AAAAAAAAAgU/9andcUo_Fug/2004_R.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUnSnr2DI/AAAAAAAAAmc/-CFW_Sh3jDk/mini2004_R.png"},
		"2005" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOT3sv1ZOI/AAAAAAAAAgY/F222Vx64Bes/2005_SR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUn9BwM_I/AAAAAAAAAmg/s4d7AVJ79wo/mini2005_SR.png"},
		"2007" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT4Y531RI/AAAAAAAAAgc/LkXCCJL5P9w/2007_R.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUoWHegRI/AAAAAAAAAmk/u5RraMejyko/mini2007_R.png"},
		"2008" : {big : "http://loda.jp/browser3s/?id=516.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUouqjPvI/AAAAAAAAAmo/NYr0k7bYyig/mini2008_UC.png"},
		"2009" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT5Xq38AI/AAAAAAAAAgk/158hAqL6SZ0/2009_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUpQy-fzI/AAAAAAAAAms/O5R5g_l_i34/mini2009_UC.png"},
		"2010" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOT51qgBYI/AAAAAAAAAgo/PfnQIF0eXKU/2010_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUpq99ynI/AAAAAAAAAmw/21xjxh3hAWo/mini2010_UC.png"},
		"2011" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOT6WTolYI/AAAAAAAAAgs/CrWG9OLaIhU/2011_C.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUp0Rys5I/AAAAAAAAAm0/4TaCPk_UDQ0/mini2011_C.png"},
		"2012" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOT7KUH9DI/AAAAAAAAAgw/U3hBFi3gcAY/2012_UC.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUqGAOsyI/AAAAAAAAAm4/rfK7tWY6OhA/mini2012_UC.png"},
		"2013" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT7kK2vLI/AAAAAAAAAg0/mrc7lCCEGY0/2013_R.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUqrh59rI/AAAAAAAAAm8/dqNv1iLuyog/mini2013_R.png"},
		"2015" : {big : "http://loda.jp/browser3s/?id=339.png",		small : "http://loda.jp/browser3s/?id=351"},
                "2017" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOT8F2aAYI/AAAAAAAAAg4/MlOx4JnCn10/2017_UC.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUqzVycEI/AAAAAAAAAnA/JjDhklVrGSY/mini2017_UC.png"},
		"2018" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT8UOr3XI/AAAAAAAAAg8/Ak7E-LB45q0/2018_C.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUrU4KK3I/AAAAAAAAAnE/ydPeS3Z4XX4/mini2018_C.png"},
		"2074" : {big : "http://loda.jp/browser3s/?id=561.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUrkrR1rI/AAAAAAAAAnI/aX054cS8iJw/mini2035_UC.png"},
                "2035" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT9JeQVZI/AAAAAAAAAhA/egSC-SXk-iA/2035_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUrkrR1rI/AAAAAAAAAnI/aX054cS8iJw/mini2035_UC.png"},
		"2036" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOT9phLIpI/AAAAAAAAAhE/1aW4niPBi6g/2036_C.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUsOIihAI/AAAAAAAAAnM/57Fa-tOSTfE/mini2036_C.png"},
		"2039" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOT-Qe0zJI/AAAAAAAAAhI/C-XBVkakvyE/2039_R.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUsR2HNPI/AAAAAAAAAnQ/a3oG1R9q0ug/mini2039_R.png"},
		"2040" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOT-z_rl_I/AAAAAAAAAhM/5Bynmocie9A/2040_R.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUs00ameI/AAAAAAAAAnU/ha2mWWgdDPo/mini2040_R.png"},
		"2041" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT_YdDjDI/AAAAAAAAAhQ/c9d9LWPmM2E/2041_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUtddSUBI/AAAAAAAAAnY/HiRLs-nC288/mini2041_UC.png"},
		"2042" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUADKHm7I/AAAAAAAAAhU/-kPbv6KIi0k/2042_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUtpBa67I/AAAAAAAAAnc/bWIDzS4lmQA/mini2042_SR.png"},
		"2043" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUAg3SXII/AAAAAAAAAhY/xziFNFnuKcQ/2043_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUtz1XQtI/AAAAAAAAAng/8T_Zl-csUdE/mini2043_R.png"},
		"2044" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUBNGIRPI/AAAAAAAAAhc/eoHHzHcxwng/2044_R.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUuTzakeI/AAAAAAAAAnk/0XKN2danxg8/mini2044_R.png"},
		"2049" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUBpCurLI/AAAAAAAAAhg/OM7TXo7FnGE/2049_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUuynbhvI/AAAAAAAAAno/Rdsuc3cxQR0/mini2049_R.png"},
		"2050" : {big : "http://loda.jp/browser3s/?id=566.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUveh4NWI/AAAAAAAAAns/MJPXwWd_lXk/mini2050_UC.png"},
		"2051" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUC1fPBMI/AAAAAAAAAho/67W2ehr5954/2051_UR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUvqeQUFI/AAAAAAAAAnw/E9B4CVpA5Lc/mini2051_UR.png"},
		"2052" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUDXAsq-I/AAAAAAAAAhs/Dgi8FwVnjdY/2052_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUvy-GhEI/AAAAAAAAAn0/uy0m06pzUL4/mini2052_UR.png"},
		"2058" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUDzN_u0I/AAAAAAAAAhw/WBMTVPcbT6w/2058_UR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUwMBPK4I/AAAAAAAAAn4/1dnFtQvaadY/mini2058_UR.png"},
		"2060" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUEUoTQhI/AAAAAAAAAh0/Nx94dnJ3AxI/2060_UR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUwmn1WkI/AAAAAAAAAn8/Zr3x0TOpNNE/mini2060_UR.png"},
		"2062" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMfJ2_rxPqI/AAAAAAAAAsI/SFTgXjGlbYo/2062_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMfJ3rB4lPI/AAAAAAAAAsM/_1Z5bjlIrm0/mini2062_SR.png"},
		"2063" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMclN-HTk0I/AAAAAAAAArU/zGQXcbifg3s/2063_UR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMclQVTFQZI/AAAAAAAAArw/J5RAc72r_K0/mini2063_UR.png"},
		"2064" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMclOIUhKhI/AAAAAAAAArY/nh6ljVEYgYU/2064_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMclQi1chCI/AAAAAAAAAr0/TpoTLKXmXkc/mini2064_SR.png"},
		"2067" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TPTMslYyxXI/AAAAAAAAAuc/FaU4-N0fPeY/2067_R.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TPTMu2rIPyI/AAAAAAAAAus/Uo5Crpzl8sU/mini2067_R.png"},
		"2068" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TPTMtuxkAoI/AAAAAAAAAug/PAgEz3n4JN0/2068_R.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TPTMvLEjUzI/AAAAAAAAAuw/IEcW3eXmVMo/mini2068_R.png"},
		"3001" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUE8XBbCI/AAAAAAAAAh4/T2S2RryZeyM/3001_R.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUxFpHtXI/AAAAAAAAAoA/JyVGuBNDGTw/mini3001_R.png"},
		"3002" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUFTN6BfI/AAAAAAAAAh8/_kBwD-M37II/3002_SR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUxRs0CDI/AAAAAAAAAoE/CK8SjMl10I8/mini3002_SR.png"},
		"3003" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUF4jNx3I/AAAAAAAAAiA/GHpS4yOCJTc/3003_SR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUxgrtLLI/AAAAAAAAAoI/mjmKI1A9ysU/mini3003_SR.png"},
		"3004" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUGpyhbJI/AAAAAAAAAiI/pwh8m-n6xk8/3004_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUyHMsUkI/AAAAAAAAAoM/GDocWTbUO1s/mini3004_SR.png"},
		"3005" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUHKnmmPI/AAAAAAAAAiM/HyFoOKGjVXs/3005_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUyQp9thI/AAAAAAAAAoQ/WGpLkEnCUTA/mini3005_R.png"},
		"3006" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUHhLRrAI/AAAAAAAAAiQ/_87_K2ekffs/3006_SR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUy5TkMCI/AAAAAAAAAoU/gWHjhTRA3Xc/mini3006_SR.png"},
		"3007" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUIbDNZBI/AAAAAAAAAiU/UcGEGrFNr0s/3007_R.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUzKffVYI/AAAAAAAAAoY/SphRyTRX1p0/mini3007_R.png"},
		"3008" : {big : "http://loda.jp/browser3s/?id=517.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUzXjSFKI/AAAAAAAAAoc/eN12DsTZsRA/mini3008_UC.png"},
		"3009" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUJd_COlI/AAAAAAAAAic/_DwWJjfSXFM/3009_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUz6kshkI/AAAAAAAAAok/bpf45fRytaQ/mini3009_UC.png"},
		"3010" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUKHLewMI/AAAAAAAAAig/SMLVns-S_M8/3010_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU0I--MXI/AAAAAAAAAoo/MRnKwxr5bE4/mini3010_R.png"},
		"3013" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUKTw0TXI/AAAAAAAAAik/ar7bs7onxZA/3013_UC.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU0gQoHbI/AAAAAAAAAos/qkbbgWV241I/mini3013_UC.png"},
		"3026" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TOjMZcBVB6I/AAAAAAAAAt8/jrWoIECS23Y/3026_C.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TOjMZ2jBukI/AAAAAAAAAuA/-4hzc389ie8/mini3026_C.png"},
		"3037" : {big : "http://gyazo.com/cba61522e49fda22c1e18dd973d4d93f.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU1JhNQRI/AAAAAAAAAow/rG8tE91YbqE/mini3037_R.png"},
		"3038" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOULexVMqI/AAAAAAAAAis/PilaO4JIB1w/3038_UC.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU1Xy4MlI/AAAAAAAAAo0/atCkW21Gvxg/mini3038_UC.png"},
		"3039" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUL4TFfhI/AAAAAAAAAiw/NQSCYkRca4I/3039_C.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOU1iK2YYI/AAAAAAAAAo4/rKE5fnFfcpE/mini3039_C.png"},
		"3040" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUMmuuX_I/AAAAAAAAAi0/f5LNr9Ariu0/3040_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU1xFvjlI/AAAAAAAAAo8/59xtscohVzg/mini3040_SR.png"},
		"3041" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUNNVsfNI/AAAAAAAAAi4/9txKnxGWVww/3041_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU2fLpLEI/AAAAAAAAApA/mSjeqEnRTZE/mini3041_R.png"},
		"3042" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUNwrd0hI/AAAAAAAAAi8/onQ0zS8xZvA/3042_R.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU2_XO_PI/AAAAAAAAApE/e4dju_6Bzp8/mini3042_R.png"},
		"3043" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUOU6udXI/AAAAAAAAAjA/4A-h5D5der4/3043_UC.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU3CYK0dI/AAAAAAAAApI/6EjGy2PAays/mini3043_UC.png"},
		"3045" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUPedOOLI/AAAAAAAAAjE/EUHsCSjvDq4/3045_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU3SagEjI/AAAAAAAAApM/AE1foRBnRQs/mini3045_UR.png"},
		"3046" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUP1m0hXI/AAAAAAAAAjI/2W__LjCsmMQ/3046_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU3__uZiI/AAAAAAAAApQ/-RbT0aP40b4/mini3046_UR.png"},
		"3047" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMO7sx_MhTI/AAAAAAAAAqs/J7YY8n0vwPY/3047_UR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMO7uk2RMbI/AAAAAAAAAq8/6NXTGLsP4Mc/mini3047_UR.png"},
		"3049" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUQoZ9_BI/AAAAAAAAAjM/TCW49xfIhFI/3049_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOU4DefQaI/AAAAAAAAApU/ki2KGE6P6qw/mini3049_UC.png"},
		"3050" : {big : "http://loda.jp/browser3s/?id=493.png"},
                "3051" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMO7tOarDJI/AAAAAAAAAqw/6EEX5twV9WY/3051_R.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMO7uzlkjxI/AAAAAAAAArA/ohAxTztAKog/mini3051_R.png"},
		"3052" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOURLLbAmI/AAAAAAAAAjQ/rCRS8YqS8jI/3052_UC.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU4sXrtrI/AAAAAAAAApY/Z4L62QotKAg/mini3052_UC.png"},
		"3053" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMclOnUVmuI/AAAAAAAAArc/4YUPYy4yGJ4/3053_UR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMclRJkg-KI/AAAAAAAAAr4/sUmXKwiCQew/mini3053_UR.png"},
		"3054" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMclO1AjeeI/AAAAAAAAArg/4HiXwHtLj6s/3054_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMclRZnTrAI/AAAAAAAAAr8/NHpOawr0AhM/mini3054_SR.png"},
		"4001" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOURs2A_-I/AAAAAAAAAjU/HjxiQ5uiu4s/4001_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU42ODRZI/AAAAAAAAApc/od_rxp7662w/mini4001_SR.png"},
		"4002" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUSQRaowI/AAAAAAAAAjY/PviQTic8sWo/4002_R.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU5X1QQ2I/AAAAAAAAApg/nKgG0mV3M5Y/mini4002_R.png"},
		"4003" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUS6P0fEI/AAAAAAAAAjc/w2YOiFhvm1Q/4003_R.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU5gR3uGI/AAAAAAAAApk/774f-Wupx0k/mini4003_R.png"},
		"4004" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUTVFsIzI/AAAAAAAAAjg/vQTvr7I0Tz0/4004_R.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU5xFmbNI/AAAAAAAAApo/KH5B5dTf85s/mini4004_R.png"},
		"4005" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUT_9oPHI/AAAAAAAAAjk/ILQoV2KyYkU/4005_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU6TwZASI/AAAAAAAAAps/MV25G6DoYQk/mini4005_R.png"},
		"4006" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUUkqxrZI/AAAAAAAAAjo/HioXgXIpFTQ/4006_UC.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOU6pFCFWI/AAAAAAAAApw/8FdPCrVz3ps/mini4006_UC.png"},
		"4007" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUVMCW3UI/AAAAAAAAAjs/nSYje6H7ulQ/4007_C.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOU67kpv5I/AAAAAAAAAp0/G5RD4MiodXc/mini4007_C.png"},
		"4022" : {big : "http://loda.jp/browser3s/?id=510.png"},
                "4021" : {big : "http://loda.jp/browser3s/?id=569.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU7boBMmI/AAAAAAAAAp4/TpbJ2vLp0Ec/mini4021_SR.png"},
                "4025" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUVhhQZgI/AAAAAAAAAjw/7uBDTSIniTM/4025_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU7boBMmI/AAAAAAAAAp4/TpbJ2vLp0Ec/mini4025_SR.png"},
		"4026" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUWNKSqqI/AAAAAAAAAj0/e3ZOzvej95M/4026_R.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOU7huScDI/AAAAAAAAAp8/tBrUePToxiE/mini4026_R.png"},
		"4027" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUWnm5w0I/AAAAAAAAAj4/_gwkuNx6018/4027_UC.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU8EoFz6I/AAAAAAAAAqA/mn-RHRVuxBI/mini4027_UC.png"},
		"4029" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUXLFtWWI/AAAAAAAAAj8/s7mdZ1Mmm_Y/4029_R.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOU8opmvtI/AAAAAAAAAqE/lXW6QioN0Fc/mini4029_R.png"},
		"4031" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUXki26vI/AAAAAAAAAkA/9n6xySMfx7U/4031_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU82SqcSI/AAAAAAAAAqI/N8qwCxdkLq4/mini4031_UR.png"},
		"4032" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUYLSFpuI/AAAAAAAAAkE/VLjZpHataPQ/4032_SR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU9X-ULPI/AAAAAAAAAqM/QKDo_7vIXI0/mini4032_SR.png"},
		"4033" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUYprSnDI/AAAAAAAAAkI/WMViNWiDtKQ/4033_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU9_n_ygI/AAAAAAAAAqQ/qnL2hv_k6fw/mini4033_SR.png"},
		"4034" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUZEb3lSI/AAAAAAAAAkM/AhNcNQB3uIg/4034_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU-MOyyAI/AAAAAAAAAqU/LeBHfLemvNQ/mini4034_SR.png"},
		"4038" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMclPU4sQJI/AAAAAAAAArk/JQH-rSkS4x8/4038_UC.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMclRv5Tt9I/AAAAAAAAAsA/rbN9wqBy4Zw/mini4038_UC.png"}
	};

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

	// イメージ: 水鏡先生を袁術先生に変更
	var teacher = document.getElementById('teacher');
	if (teacher != null) {
		var random = Math.floor(Math.random() * 6);	// 0〜5までの乱数値
		switch (random) {
			case 0:		teacher.src = 'http://lh4.ggpht.com/_yaaM6-lAuRY/TNfkJ53VBtI/AAAAAAAAAtU/fO6qaKBfrXk/teacher_1.png';break;
			case 1:		teacher.src = 'http://lh4.ggpht.com/_yaaM6-lAuRY/TNfkJ4sFEnI/AAAAAAAAAtY/r-L-XnSGQm8/teacher_2.png';break;
			case 2:		teacher.src = 'http://lh4.ggpht.com/_yaaM6-lAuRY/TNfkKLdQJCI/AAAAAAAAAtc/kD8dw97xWxU/teacher_3.png';break;
			case 3:		teacher.src = 'http://lh3.ggpht.com/_yaaM6-lAuRY/TNfkKHSLDfI/AAAAAAAAAtg/wm0YlHobs-Y/teacher_4.png';break;
			case 4:		teacher.src = 'http://lh4.ggpht.com/_yaaM6-lAuRY/TNfkKP8Y7VI/AAAAAAAAAtk/I9rPMmSn2fs/teacher_5.png';break;
			case 5:		teacher.src = 'http://lh3.ggpht.com/_yaaM6-lAuRY/TNfkNVG2ypI/AAAAAAAAAto/Fw5oA8LMYWE/teacher_6.png';break;
		}
	}
	// 名札: "水鏡先生"を"袁術先生"に変更
	var teacher_name = document.getElementById('teacherName');
	if (teacher_name != null) {
		teacher_name.src = 'http://lh3.ggpht.com/_yaaM6-lAuRY/TNfkNpLhUyI/AAAAAAAAAts/fpXRp00rQv0/teacher_name.png';
	}

	// プロフィール背景画像を差し替え
	GM_addStyle('div#header_bottom #profileBtn a { background-image:url("http://lh3.ggpht.com/_yaaM6-lAuRY/TNfm_YvWZxI/AAAAAAAAAt0/jnHgWqKO96Q/profile.png") !important }');

}) ();
