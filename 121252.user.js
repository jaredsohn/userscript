// ==UserScript==
// @name           fake3gokushi test
// @version        3.2.3
// @namespace      http://userscripts.org/scripts/show/87245
// @description    แก้ไขการ์ดสวย, map ยังไม่ได้
// @icon           http://lh4.googleusercontent.com/-1Za_1ijAyEs/TpbGSkz3qXI/AAAAAAAABU4/mGdlRLDciHU/s135/icon_fake3gokushi.png
// @include        http://*.sangokushi.in.th/*
// @run-at         document-end
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
// ver3.0.3: No.1062/2066/3058/4039を追加
// ver3.0.4: No.2070/2071/3062/4046/2069を追加
// ver3.0.5: No.3031/3032/3056/3057を追加
// ver3.0.6: No.2066/4001の画像を差し替え。No.2066は2chで指摘があったので。
// ver3.0.7: No.3066/4048/4042/2074/3064/1070を追加
// ver3.0.8: No.3066の画像を差し替え。0KmtSuTzサンクス。
// ver3.0.9: No.1016/1070の画像を差し替え。RよりUCを大切にしたいよね。
// ver3.0.10: No.3065/3067/4050/4047/1072/1073/2077/2076を追加
// ver3.0.11: No.1074/2078/4051/4052を追加
// ver3.0.12: No.1075/1078/4053を追加 
// ver3.0.13: No.1079/2084を追加 
// ver3.0.14: No.1083/2086/4055/4056を追加 
// ver3.0.15: No.2088/2089/2091を追加 
// ver3.0.16: "document-start"では読込前に実行されて正常動作しないため、"document-end"に変更 
// ver3.0.17: No.2092/2093を追加
// ver3.0.18: No.1086/2094/4059を追加 
// ver3.1.0: AutoPatchWork/AutoPagerize対応 + アイコン追加
// ver3.1.1: No.1089/1090/1091/2096/2097/2098/3078/3079/3080を追加 
// ver3.2.0: 武将図鑑(fakezukan3gokushi.user.js)をマージ。>>929に感謝！
// ver3.2.1: No.4060/1092/2099を追加 
// ver3.2.2: No.3081/3082/3083を追加 
// ver3.2.3: No.3087/4063/4064を追加 

	var illust = {
		"1001" : {big : "http://lh4.ggpht.com/-Ij0lTA4Xp4k/TUBV1zosOaI/AAAAAAAAAww/4fAT9WsnvKg/1001_R.png",		small : "http://lh4.ggpht.com/-1bFGHg9lH9M/TMOUZsPKcEI/AAAAAAAAAkQ/jHHy_0_pdXk/mini1001_R.png"},
		"1002" : {big : "http://lh5.ggpht.com/-7To95mWg9pY/TUBV2VA3OOI/AAAAAAAAAw0/Es5QRxubEF4/1002_SR.png",	small : "http://lh6.ggpht.com/-Wq519rEwwag/TMOUZ3ezkhI/AAAAAAAAAkU/Dl2VPTslxZ8/mini1002_SR.png"},
		"1003" : {big : "http://lh5.ggpht.com/-FAxU_xk8NxQ/TUBV3HYgLpI/AAAAAAAAAw4/45fpffEcEsE/1003_SR.png",	small : "http://lh4.ggpht.com/-EmwHZsLr2bU/TMOUaI_87xI/AAAAAAAAAkY/ERHTfMemMDw/mini1003_SR.png"},
		"1004" : {big : "http://lh4.ggpht.com/-4BVrJ4muA4Q/TUBV3lmJ5dI/AAAAAAAAAw8/SbHUT_9-IiE/1004_SR.png",	small : "http://lh4.ggpht.com/-2MxAe7gy2fY/TMOUaobSVkI/AAAAAAAAAkc/WK3r5V6e1a4/mini1004_SR.png"},
		"1005" : {big : "http://lh6.ggpht.com/-KTVKIONza_0/TUBV4NFVgBI/AAAAAAAAAxA/UDDtua4qu00/1005_R.png",		small : "http://lh3.ggpht.com/-FWP8p2Jd-Tc/TMOUa4eszrI/AAAAAAAAAkg/BCYpHwgiJ0o/mini1005_R.png"},
		"1006" : {big : "http://lh5.ggpht.com/-7hXoZoevUUs/TUBV49jBVvI/AAAAAAAAAxE/aTSxDMPO0nY/1006_SR.png",	small : "http://lh3.ggpht.com/--ph1yo4dSWQ/TMOUbRg6uYI/AAAAAAAAAkk/5xHzRYvOotk/mini1006_SR.png"},
		"1007" : {big : "http://lh5.ggpht.com/-XytgCa7FtRw/TUBV5RqnSKI/AAAAAAAAAxM/KgTDTeCwL4I/1007_UC.png",	small : "http://lh6.ggpht.com/-mMquGOfyOf4/TMOUbxQnr5I/AAAAAAAAAko/wgRqt4D9mQY/mini1007_UC.png"},
		"1008" : {big : "http://lh4.ggpht.com/-4gN6C98LEZA/TUBV59Y0OFI/AAAAAAAAAxQ/U50SNc55Gtk/1008_R.png",		small : "http://lh5.ggpht.com/-x1x3KAJ3FcI/TMOUcAsJrWI/AAAAAAAAAks/tEKEoWF1KAA/mini1008_R.png"},
		"1009" : {big : "http://lh3.ggpht.com/-hxxmdsa5PsQ/TUBV6SVtCaI/AAAAAAAAAxU/_TUf5mx-AMk/1009_UC.png",	small : "http://lh5.ggpht.com/-d71B00kfRa0/TMOUcikXd4I/AAAAAAAAAkw/IakzCXkJ4Ys/mini1009_UC.png"},
		"1010" : {big : "http://lh5.ggpht.com/-jUmeaBZAOic/TUBV7OcYKHI/AAAAAAAAAxY/uuGVkyJ7XI0/1010_UC.png",	small : "http://lh6.ggpht.com/-seZxrV0A92w/TMOUdNnmgKI/AAAAAAAAAk0/qgwQN9MUmkk/mini1010_UC.png"},
		"1011" : {big : "http://lh5.ggpht.com/-ymF9mcme2Cc/TUBV7s-CSYI/AAAAAAAAAxc/KS5938NOqN0/1011_R.png",		small : "http://lh6.ggpht.com/-GQST_X2ZCgs/TMOUdi88fSI/AAAAAAAAAk4/j-S_U8RWow4/mini1011_R.png"},
		"1012" : {big : "http://lh5.ggpht.com/-j0lcRLwgwgs/TUBV8AhUjrI/AAAAAAAAAxg/kZ9E1TFexso/1012_UC.png",	small : "http://lh3.ggpht.com/-x0LdhfqBuA8/TMOUd73E8WI/AAAAAAAAAk8/OOX7GzdlO1g/mini1012_UC.png"},
		"1013" : {big : "http://lh6.ggpht.com/-P0t1Oz3epDo/TUBV8ja__MI/AAAAAAAAAxk/8-b2x9ayzEY/1013_C.png",		small : "http://lh4.ggpht.com/-6qSNhvMhAow/TMOUeTyzoSI/AAAAAAAAAlA/bLQ3KATshJo/mini1013_C.png"},
		"1015" : {big : "http://lh5.ggpht.com/-pnEbE-P5qvI/TMOTrKz9fJI/AAAAAAAAAe8/wLBIf5OQm20/1015_UC.png",	small : "http://lh3.ggpht.com/-AQLrvHJr9GY/TMOUegz9BnI/AAAAAAAAAlE/HADVf2zTm3E/mini1015_UC.png"},
		"1016" : {big : "http://lh4.ggpht.com/-C0XXlaK_zyQ/TXmhd-TPHOI/AAAAAAAAA9s/X2WoEz_1fJw/1016_R.png",		small : "http://lh3.ggpht.com/-arJyGRs9gU4/TXmheuR7O9I/AAAAAAAAA90/moRy7E9Di78/mini1016_R.png"},
		"1019" : {big : "http://lh5.ggpht.com/-i9ZIDce_ycc/TMOTsDMJByI/AAAAAAAAAfE/dFvndpvHCJI/1019_UC.png",	small : "http://lh6.ggpht.com/-HC2h-nT62pI/TMOUfR1VSEI/AAAAAAAAAlM/Q_-1AHC3asY/mini1019_UC.png"},
		"1020" : {big : "http://lh4.ggpht.com/-P4_tdFzeEQ4/TMOTsrs6YII/AAAAAAAAAfI/GPQ0jSRWpYs/1020_C.png",		small : "http://lh6.ggpht.com/-JVsYM-hSWck/TMOUf15XzzI/AAAAAAAAAlQ/sUBi9Vsrtag/mini1020_C.png"},
		"1031" : {big : "http://lh5.ggpht.com/-kTK2fTh5t3s/TMOTtQaU9_I/AAAAAAAAAfM/ueVtf09OXMQ/1031_UC.png",	small : "http://lh6.ggpht.com/-iuz6R2_Jc_Y/TMOUgUSpuxI/AAAAAAAAAlU/NBfpcqMiDhk/mini1031_UC.png"},
		"1032" : {big : "http://lh6.ggpht.com/-joDtpvKfvUQ/TMOTtgYMJJI/AAAAAAAAAfQ/kEjvcYI1tLs/1032_C.png",		small : "http://lh4.ggpht.com/-29ltBq6JZYA/TMOUghWGsKI/AAAAAAAAAlY/8HTQR3MYfK4/mini1032_C.png"},
		"1035" : {big : "http://lh6.ggpht.com/-sTnmNCZ6Zq4/TMO7r-NLwTI/AAAAAAAAAqk/bGyoZl1-F-A/1035_SR.png",	small : "http://lh5.ggpht.com/-Qetv-BSBv7g/TMO7t9xSPTI/AAAAAAAAAq0/ldDfuTe1hX4/mini1035_SR.png"},
		"1037" : {big : "http://lh5.ggpht.com/-_LysnA8AD1M/TMOTuYz4nEI/AAAAAAAAAfU/XZRCTSsL4EI/1037_SR.png",	small : "http://lh3.ggpht.com/-i9JGmNPgtf0/TMOUhE23ECI/AAAAAAAAAlc/9c1BTxJ1r8I/mini1037_SR.png"},
		"1038" : {big : "http://lh4.ggpht.com/-vcNo4WPk580/TMOTuxMdFrI/AAAAAAAAAfY/po6JMoU70WE/1038_R.png",		small : "http://lh6.ggpht.com/-z2qIJP3LdTA/TMOUhU5dlJI/AAAAAAAAAlg/SF1u6fMnHcg/mini1038_R.png"},
		"1039" : {big : "http://lh5.ggpht.com/-x6Zfn6fPMaY/TMOTvWispQI/AAAAAAAAAfc/vxm1FUSf0b0/1039_UC.png",	small : "http://lh4.ggpht.com/-yTHR9rFC5bs/TMOUh0Gph6I/AAAAAAAAAlk/5MRCHimn4Pc/mini1039_UC.png"},
		"1040" : {big : "http://lh3.ggpht.com/-XdLOFTeg0UM/TMOTwDfzjrI/AAAAAAAAAfg/Wgcq4RArJOA/1040_C.png",		small : "http://lh3.ggpht.com/-CDSLPPQ9KaE/TMOUiEzn-yI/AAAAAAAAAlo/vykY9aJt7Qw/mini1040_C.png"},
		"1042" : {big : "http://lh5.ggpht.com/-yEZ6oIyka4U/TMOTwgtvNOI/AAAAAAAAAfk/7eHt87setkI/1042_R.png",		small : "http://lh4.ggpht.com/-DNuGvIcQ7tA/TMOUinPWvMI/AAAAAAAAAls/kidl63B0i78/mini1042_R.png"},
		"1043" : {big : "http://lh6.ggpht.com/-Hyvr4L0y8xM/TMOTxNZmVNI/AAAAAAAAAfo/HuyqLlJdsUM/1043_R.png",		small : "http://lh6.ggpht.com/-_3OwbdGjfws/TMOUjEXybwI/AAAAAAAAAlw/NucBRUwVyvI/mini1043_R.png"},
		"1046" : {big : "http://lh4.ggpht.com/-9ADLIIwUfy4/TMOTx7Dh-oI/AAAAAAAAAfs/TtkfFXXPmm0/1046_UR.png",	small : "http://lh5.ggpht.com/-WYdNCXnhGwo/TMOUjWkoo-I/AAAAAAAAAl0/T5PgkqOXCos/mini1046_UR.png"},
		"1047" : {big : "http://lh6.ggpht.com/-Pfzk9chkn-8/TMOTyb7RgFI/AAAAAAAAAfw/E_6FRKdzAo4/1047_UR.png",	small : "http://lh5.ggpht.com/-XKwE-rBeLgY/TMOUj5JSL-I/AAAAAAAAAl4/HILfg4C6GeA/mini1047_UR.png"},
		"1048" : {big : "http://lh5.ggpht.com/-yLH1ubhBAmQ/TMOTy6P-Z-I/AAAAAAAAAf0/k9LKOJxlkNU/1048_UR.png",	small : "http://lh3.ggpht.com/-mJedALDh1Eg/TMOUkMID6MI/AAAAAAAAAl8/ElXwRwijJIg/mini1048_UR.png"},
		"1049" : {big : "http://lh6.ggpht.com/-Ozu2k_4k-3g/TMOTzXAtIpI/AAAAAAAAAf4/Lr-6YksXeCY/1049_UR.png",	small : "http://lh5.ggpht.com/-tYmt8G5NuP0/TMOUkhNbjtI/AAAAAAAAAmA/sHejRl3Gpn0/mini1049_UR.png"},
		"1050" : {big : "http://lh6.ggpht.com/-Ve1EuCVg9g4/TMO7sR0NHCI/AAAAAAAAAqo/BapswH84iug/1050_UR.png",	small : "http://lh3.ggpht.com/-BD30lBn8R-4/TMO7uB87YDI/AAAAAAAAAq4/7cB8ExBONnI/mini1050_UR.png"},
		"1051" : {big : "http://lh6.ggpht.com/-ZJkSTNQkwOc/TMOTzmEUYlI/AAAAAAAAAf8/v0zNznVU6iY/1051_UR.png",	small : "http://lh5.ggpht.com/-a9BqjIghX2w/TMOUk5_-HgI/AAAAAAAAAmE/49hoSiRha8o/mini1051_UR.png"},
		"1052" : {big : "http://lh6.ggpht.com/-AIyfNgKwvSM/TMOT0ZPd5wI/AAAAAAAAAgA/Xsj-poch0H8/1052_SR.png",	small : "http://lh4.ggpht.com/-mICsYm40uqc/TMOUldgnLoI/AAAAAAAAAmI/Rpe_2kr8nlg/mini1052_SR.png"},
		"1056" : {big : "http://lh5.ggpht.com/-I6iE28vzAuw/TMOT04LC2hI/AAAAAAAAAgE/kONmpCjPqK4/1056_R.png",		small : "http://lh4.ggpht.com/-7fyzGny5hnw/TMOUlvKe_9I/AAAAAAAAAmM/7v0CBAIYAM8/mini1056_R.png"},
		"1057" : {big : "http://lh3.ggpht.com/-QqMV9R6KkCo/TMOT1mHFRSI/AAAAAAAAAgI/srSzJ3woTAU/1057_SR.png",	small : "http://lh3.ggpht.com/-Yidb5ZXLEqQ/TMOUmK_HvII/AAAAAAAAAmQ/X-1b-aPDGUI/mini1057_SR.png"},
		"1059" : {big : "http://lh3.ggpht.com/-5oj3UHm9OgU/TMclNDonneI/AAAAAAAAArM/hiivHEaRwFI/1059_C.png",		small : "http://lh4.ggpht.com/-92l3Dp4rNAY/TMclPnbOkgI/AAAAAAAAAro/eK3kQmm9JtM/mini1059_C.png"},
		"1060" : {big : "http://lh4.ggpht.com/-p3RvF88jWbM/TMclNXrDMgI/AAAAAAAAArQ/HjVam6tgx8A/1060_R.png",		small : "http://lh3.ggpht.com/-5B4FX8gh-qQ/TMclQKmrAcI/AAAAAAAAArs/okqCC0Jj-Vs/mini1060_R.png"},
		"1062" : {big : "http://lh4.ggpht.com/-dCQ-zWogBLo/TSE1EyPHYPI/AAAAAAAAAvI/1JhvKTaL10c/1062_UR.png",	small : "http://lh6.ggpht.com/-XNEXTBWQfIk/TSE1GzL1lfI/AAAAAAAAAvY/wxjub4Ty2_A/mini1062_UR.png"},
		"1063" : {big : "http://lh3.ggpht.com/-6vMEzjYOfgw/TPTMrGGWDKI/AAAAAAAAAuU/DcTY2UY3Ps0/1063_UC.png",	small : "http://lh6.ggpht.com/-LCs3a2qMsfE/TPTMuPE1raI/AAAAAAAAAuk/kknMyC3JCJ8/mini1063_UC.png"},
		"1066" : {big : "http://lh5.ggpht.com/-uUaOqiqWFS4/TPTMrqeil9I/AAAAAAAAAuY/oi7rDL4WO4w/1066_SR.png",	small : "http://lh4.ggpht.com/-gvtlma0k56c/TPTMulgZL2I/AAAAAAAAAuo/WYGa-9VpqKw/mini1066_SR.png"},
		"1070" : {big : "http://lh6.ggpht.com/-KjTZiRtjmDQ/TXmheA_EmGI/AAAAAAAAA9w/pHLxjchY3b8/1070_UC.png",	small : "http://lh3.ggpht.com/-mtsQKJSPQR8/TXmhfHP1C3I/AAAAAAAAA94/yb7iVnAwCXo/mini1070_UC.png"},
		"1072" : {big : "http://lh5.ggpht.com/-nJ33oAZ084Y/TZCCfaLzAoI/AAAAAAAABDA/M3BuIlhUA7I/1072_R.png",		small : "http://lh4.ggpht.com/-FOSbgWfttIc/TZCCi8kcvzI/AAAAAAAABDg/yrHkI3wTWN8/mini1072_R.png"},
		"1073" : {big : "http://lh5.ggpht.com/--WCoLqUI93o/TZCCf6RtwXI/AAAAAAAABDE/lTGLf_C6qy4/1073_R.png",		small : "http://lh6.ggpht.com/-Kx3w80aQ_WE/TZCCjDjlqbI/AAAAAAAABDk/ic-3MnNz-So/mini1073_R.png"},
		"1074" : {big : "http://lh3.ggpht.com/-SdJ6l9_1PiQ/TbbblCkoo_I/AAAAAAAABEo/qd6-FHBea98/1074_SR.png",	small : "http://lh6.ggpht.com/-OESwEl-h4GQ/TbbbmmcVKHI/AAAAAAAABE4/Gwu8S428Hw0/mini1074_SR.png"},
		"1075" : {big : "http://lh5.ggpht.com/-h6tXGT9NfwU/Tdp21CIGcDI/AAAAAAAABFM/hshCGB7CiOc/1075_UR.png",	small : "http://lh3.ggpht.com/-3DNvOljY5zY/Tdp22MPAMmI/AAAAAAAABFY/bNNxOQtYD-g/mini1075_UR.png"},
		"1078" : {big : "http://lh6.ggpht.com/-M3HC9hO3x4M/Tdp21RrmRRI/AAAAAAAABFQ/u6QYw7fnAaM/1078_UC.png",	small : "http://lh4.ggpht.com/-bBBkkw_CWuI/Tdp22cLAnLI/AAAAAAAABFc/XbOmJKlCVd8/mini1078_UC.png"},
		"1079" : {big : "http://lh6.ggpht.com/-1p7zy2KtkZ0/TgB9-3SKDhI/AAAAAAAABGE/YX-mzMj_o48/1079_UR.png",	small : "http://lh5.ggpht.com/-cPbWuVsascw/TgB9_v-2g-I/AAAAAAAABGM/amkXy3a3YdM/mini1079_UR.png"},
		"1083" : {big : "http://lh4.ggpht.com/-ur00WLogMBo/Ti4pAqXfBfI/AAAAAAAABJo/Ev18aYqyang/1083_UR.png",	small : "http://lh3.ggpht.com/-XjuSkLHkHD8/Ti4pCEgEJ9I/AAAAAAAABJ4/rziGfUDV9hc/mini1083_UR.png"},
		"1086" : {big : "http://lh6.ggpht.com/-RWVeZG3-F34/ToAEBd_46gI/AAAAAAAABTU/hTvjmwRcZfQ/1086_UR.png",	small : "http://lh4.ggpht.com/-sb1FEfS32MA/ToAEChI9YjI/AAAAAAAABTg/fKfGjL_4sV0/mini1086_UR.png"},
		"1089" : {big : "http://lh6.ggpht.com/-qILVjgVFc8U/Tp70KeQ-C_I/AAAAAAAABV0/glQ-pDpKp-o/1089_R.png",		small : "http://lh5.ggpht.com/-sPwoqVPfjOU/Tp70N0u_fFI/AAAAAAAABW4/FVootTTwUb8/mini1089_R.png"},
		"1090" : {big : "http://lh3.ggpht.com/-3rF8Q0TzDj8/Tp70K-lhCNI/AAAAAAAABV8/Iqp5joQ7qrI/1090_UC.png",	small : "http://lh4.ggpht.com/-g2jh9_v-264/Tp70ODMVZHI/AAAAAAAABXE/IPEqs1ZZCqA/mini1090_UC.png"},
		"1091" : {big : "http://lh5.ggpht.com/-pz73rlVQGeQ/Tp70LN9WziI/AAAAAAAABWE/VcWjrJwTZ38/1091_UC.png",	small : "http://lh6.ggpht.com/-MJ5wlVHQNO0/Tp70OScqt1I/AAAAAAAABXM/u4TgYp6ntWQ/mini1091_UC.png"},
		"1092" : {big : "http://lh6.ggpht.com/-9KhpXVo7n_8/Tqbwbqmh6uI/AAAAAAAABYQ/OjNPvJ9bcFc/1092_UR.png",	small : "http://lh4.ggpht.com/-eNqccGzVkrY/Tqbwdsr3nWI/AAAAAAAABYk/NAdU_-hgHHg/mini1092_UR.png"},
		"2001" : {big : "http://lh6.ggpht.com/-mFNChWHZN5w/TMOT2OaGcGI/AAAAAAAAAgM/96bjcFAf8GU/2001_SR.png",	small : "http://lh4.ggpht.com/-2z1BNsqW3vM/TMOUmtgqiuI/AAAAAAAAAmU/huw20LZX_Ho/mini2001_SR.png"},
		"2003" : {big : "http://lh4.ggpht.com/-aJb6-iJgPU8/TMOT2nAuPJI/AAAAAAAAAgQ/pDmeyKCvlaM/2003_R.png",		small : "http://lh4.ggpht.com/-SU2hN6fkAmc/TMOUm9CVPnI/AAAAAAAAAmY/_prrfywzROY/mini2003_R.png"},
		"2004" : {big : "http://lh5.ggpht.com/-dUqSWW1f5C8/TMOT3MuFcHI/AAAAAAAAAgU/C6VFdlUn8nI/2004_R.png",		small : "http://lh4.ggpht.com/--Pu5aAe54FU/TMOUnSnr2DI/AAAAAAAAAmc/78qiAf61ekM/mini2004_R.png"},
		"2005" : {big : "http://lh3.ggpht.com/-BbOHdFgAuZg/TMOT3sv1ZOI/AAAAAAAAAgY/DAMujnu0iEY/2005_SR.png",	small : "http://lh3.ggpht.com/-NxbtoOOLFgA/TMOUn9BwM_I/AAAAAAAAAmg/yQLWSnSQ40g/mini2005_SR.png"},
		"2007" : {big : "http://lh4.ggpht.com/-3wmFy0zRR3s/TMOT4Y531RI/AAAAAAAAAgc/DQrApnmoNy8/2007_R.png",		small : "http://lh3.ggpht.com/-NfOJm9RiaFU/TMOUoWHegRI/AAAAAAAAAmk/xuFDr-w8JEw/mini2007_R.png"},
		"2008" : {big : "http://lh6.ggpht.com/-YuobBvmtPBw/TMOT42VrEBI/AAAAAAAAAgg/AwWfKfHxPGw/2008_UC.png",	small : "http://lh5.ggpht.com/-KkoKQX6BuZk/TMOUouqjPvI/AAAAAAAAAmo/kxPg7x5zDec/mini2008_UC.png"},
		"2009" : {big : "http://lh4.ggpht.com/-9c_qs-mCi24/TMOT5Xq38AI/AAAAAAAAAgk/kZkETA6q_dg/2009_UC.png",	small : "http://lh3.ggpht.com/-s7Kzb96fIVc/TMOUpQy-fzI/AAAAAAAAAms/BrJmeuLBDGU/mini2009_UC.png"},
		"2010" : {big : "http://lh3.ggpht.com/-1fx-DP0ixs4/TMOT51qgBYI/AAAAAAAAAgo/d9hn0-ScZOw/2010_UC.png",	small : "http://lh3.ggpht.com/-RulkOxjas18/TMOUpq99ynI/AAAAAAAAAmw/95YkbrE3oeo/mini2010_UC.png"},
		"2011" : {big : "http://lh5.ggpht.com/-ICLrnqBYZiU/TMOT6WTolYI/AAAAAAAAAgs/Epowju_lPyM/2011_C.png",		small : "http://lh5.ggpht.com/-G1bkLcbesCw/TMOUp0Rys5I/AAAAAAAAAm0/CTVnqWzjhHY/mini2011_C.png"},
		"2012" : {big : "http://lh3.ggpht.com/-2QvSiWsB9wE/TMOT7KUH9DI/AAAAAAAAAgw/yTcWyE2uxcU/2012_UC.png",	small : "http://lh6.ggpht.com/-0YAU-Wiu8Z0/TMOUqGAOsyI/AAAAAAAAAm4/tINSbt_krZE/mini2012_UC.png"},
		"2013" : {big : "http://lh4.ggpht.com/-OcxmcZsZBMg/TMOT7kK2vLI/AAAAAAAAAg0/uLoTXOaqNZU/2013_R.png",		small : "http://lh3.ggpht.com/-GEZbI2yMDrA/TMOUqrh59rI/AAAAAAAAAm8/he25q8Olsag/mini2013_R.png"},
		"2017" : {big : "http://lh6.ggpht.com/-ciNP0vsNR6Y/TMOT8F2aAYI/AAAAAAAAAg4/ZIWeQkKpgPc/2017_UC.png",	small : "http://lh5.ggpht.com/-LuF9W3ynNuM/TMOUqzVycEI/AAAAAAAAAnA/yU-M5DxaTtk/mini2017_UC.png"},
		"2018" : {big : "http://lh4.ggpht.com/-yWyqlZmCNZI/TMOT8UOr3XI/AAAAAAAAAg8/D-iT8UeAapg/2018_C.png",		small : "http://lh3.ggpht.com/-deZjufkQvzA/TMOUrU4KK3I/AAAAAAAAAnE/X6k9Szl4pL8/mini2018_C.png"},
		"2035" : {big : "http://lh4.ggpht.com/-E8DEk7IKY34/TMOT9JeQVZI/AAAAAAAAAhA/pjetyDv48mc/2035_UC.png",	small : "http://lh3.ggpht.com/-JpAGlbhGM0k/TMOUrkrR1rI/AAAAAAAAAnI/bnGjiBNJmrw/mini2035_UC.png"},
		"2036" : {big : "http://lh5.ggpht.com/-nIsIf5TnP44/TMOT9phLIpI/AAAAAAAAAhE/ITOgStd0bvo/2036_C.png",		small : "http://lh6.ggpht.com/-FBeyK_NDFdU/TMOUsOIihAI/AAAAAAAAAnM/tiYzc_0F_cg/mini2036_C.png"},
		"2039" : {big : "http://lh5.ggpht.com/-3UTlS6ayRdc/TMOT-Qe0zJI/AAAAAAAAAhI/dZIdg0bm2AA/2039_R.png",		small : "http://lh4.ggpht.com/-BlXDwQouX00/TMOUsR2HNPI/AAAAAAAAAnQ/7Fi8FYQ5aTY/mini2039_R.png"},
		"2040" : {big : "http://lh6.ggpht.com/-DOVW-NPRIuo/TMOT-z_rl_I/AAAAAAAAAhM/ufNcVPPgGPk/2040_R.png",		small : "http://lh5.ggpht.com/-Yo1fPACUPyU/TMOUs00ameI/AAAAAAAAAnU/KbdA01d8ZDw/mini2040_R.png"},
		"2041" : {big : "http://lh4.ggpht.com/-UOC8xlAHpps/TMOT_YdDjDI/AAAAAAAAAhQ/lRfUBZJSa5A/2041_UC.png",	small : "http://lh3.ggpht.com/-9kQgZpCvt-E/TMOUtddSUBI/AAAAAAAAAnY/RcRoK5EO6Dg/mini2041_UC.png"},
		"2042" : {big : "http://lh3.ggpht.com/-y0vWdFVHkfc/TMOUADKHm7I/AAAAAAAAAhU/ubihZ0Qq94s/2042_SR.png",	small : "http://lh4.ggpht.com/-kuiXSzLJlT4/TMOUtpBa67I/AAAAAAAAAnc/4yptNL_pvUM/mini2042_SR.png"},
		"2043" : {big : "http://lh4.ggpht.com/-ndKY7_xxNOI/TMOUAg3SXII/AAAAAAAAAhY/kCKCwFgXHqk/2043_R.png",		small : "http://lh6.ggpht.com/-d5ui_92CTGs/TMOUtz1XQtI/AAAAAAAAAng/XwkWnoljfHE/mini2043_R.png"},
		"2044" : {big : "http://lh4.ggpht.com/-56ZErU7Zn2Y/TMOUBNGIRPI/AAAAAAAAAhc/BJ_rES56N1A/2044_R.png",		small : "http://lh3.ggpht.com/-ypUXsiC07hc/TMOUuTzakeI/AAAAAAAAAnk/KwLjTBh-ZZ8/mini2044_R.png"},
		"2049" : {big : "http://lh4.ggpht.com/-kbUk4h2zHy4/TMOUBpCurLI/AAAAAAAAAhg/A84tksA8kWI/2049_R.png",		small : "http://lh6.ggpht.com/-V-5MeoEY-xw/TMOUuynbhvI/AAAAAAAAAno/IWfzMKRGkO0/mini2049_R.png"},
		"2050" : {big : "http://lh4.ggpht.com/-fNwXKaxg0AQ/TMOUCF5IT3I/AAAAAAAAAhk/WK07kc3NgnQ/2050_UC.png",	small : "http://lh5.ggpht.com/-fb3LEAc4gys/TMOUveh4NWI/AAAAAAAAAns/jKivIXUAgAQ/mini2050_UC.png"},
		"2051" : {big : "http://lh6.ggpht.com/-W3MGYYZyEqs/TMOUC1fPBMI/AAAAAAAAAho/9O9X0F84j18/2051_UR.png",	small : "http://lh6.ggpht.com/-cBAxCatdleM/TMOUvqeQUFI/AAAAAAAAAnw/v4jkqFVbH7k/mini2051_UR.png"},
		"2052" : {big : "http://lh5.ggpht.com/-geKglraFHU4/TMOUDXAsq-I/AAAAAAAAAhs/CseltgUGAF8/2052_UR.png",	small : "http://lh5.ggpht.com/-f7jcdxbC1M4/TMOUvy-GhEI/AAAAAAAAAn0/_9fFKuXCK2M/mini2052_UR.png"},
		"2058" : {big : "http://lh6.ggpht.com/-EKFwSX0BDa8/TMOUDzN_u0I/AAAAAAAAAhw/qLz_SgwtsM0/2058_UR.png",	small : "http://lh3.ggpht.com/-tauTrc2mP7U/TMOUwMBPK4I/AAAAAAAAAn4/gH8gV7HHRZE/mini2058_UR.png"},
		"2060" : {big : "http://lh4.ggpht.com/-gPnfLio8P6U/TMOUEUoTQhI/AAAAAAAAAh0/mYEDb6h-K7Q/2060_UR.png",	small : "http://lh3.ggpht.com/-pKloDoPQP-4/TMOUwmn1WkI/AAAAAAAAAn8/wF47FFA2eg8/mini2060_UR.png"},
		"2062" : {big : "http://lh4.ggpht.com/-hH6m8U8Asyc/TMfJ2_rxPqI/AAAAAAAAAsI/7KSKo6RvvDw/2062_SR.png",	small : "http://lh6.ggpht.com/-OExOgPF_psc/TMfJ3rB4lPI/AAAAAAAAAsM/1fYkoek98_Y/mini2062_SR.png"},
		"2063" : {big : "http://lh6.ggpht.com/-HNm7K3MvOww/TMclN-HTk0I/AAAAAAAAArU/NVooLCquOpY/2063_UR.png",	small : "http://lh6.ggpht.com/-w9VSPeo0tYo/TMclQVTFQZI/AAAAAAAAArw/TfVusfo-BAM/mini2063_UR.png"},
		"2064" : {big : "http://lh5.ggpht.com/-sK4R7Eqmo7k/TMclOIUhKhI/AAAAAAAAArY/e57UHPgqleI/2064_SR.png",	small : "http://lh6.ggpht.com/-VgxmjdaPKlI/TMclQi1chCI/AAAAAAAAAr0/zCHoSzIFjwc/mini2064_SR.png"},
		"2066" : {big : "http://lh5.ggpht.com/-8Glkm9ym_vA/TVDfNPJQiRI/AAAAAAAAAyo/PQYFS-BA1zA/2066_UR.png",	small : "http://lh5.ggpht.com/-URZkBYugsY8/TVDfNqWOgxI/AAAAAAAAAy0/tdkTbdYSOrQ/mini2066_UR.png"},
		"2067" : {big : "http://lh5.ggpht.com/-ErReumiNtC4/TPTMslYyxXI/AAAAAAAAAuc/gZszdtTF_hk/2067_R.png",		small : "http://lh4.ggpht.com/-nN9aFylV8II/TPTMu2rIPyI/AAAAAAAAAus/Mco0hiY2u6w/mini2067_R.png"},
		"2068" : {big : "http://lh3.ggpht.com/-I91MTam9lTs/TPTMtuxkAoI/AAAAAAAAAug/dFmEqPSFKiU/2068_R.png",		small : "http://lh4.ggpht.com/-PSOebsa1ysg/TPTMvLEjUzI/AAAAAAAAAuw/aajzWlzcsnI/mini2068_R.png"},
		"2069" : {big : "http://lh6.ggpht.com/-lyaizpUrqhQ/TT9wv8Hj1tI/AAAAAAAAAwE/WcctHhf9YnE/2069_SR.png",	small : "http://lh4.ggpht.com/-BgiN6wTEmrQ/TT9wym0StTI/AAAAAAAAAwY/RDvv0OpawOE/mini2069_SR.png"},
		"2070" : {big : "http://lh4.ggpht.com/-FvCiLluCvDw/TT9wwdS7kfI/AAAAAAAAAwI/2ZIRz_zdN4k/2070_UC.png",	small : "http://lh3.ggpht.com/-r2lAH_Bd0OQ/TT9wy9k0A4I/AAAAAAAAAwc/ThUNDwz6pic/mini2070_UC.png"},
		"2071" : {big : "http://lh3.ggpht.com/-od86VIQ22VM/TT9wwys03KI/AAAAAAAAAwM/Bzn7_u7kQDM/2071_UR.png",	small : "http://lh5.ggpht.com/-N0cjPkJhinc/TT9wzOANviI/AAAAAAAAAwg/MrponatyFFs/mini2071_UR.png"},
		"2074" : {big : "http://lh5.ggpht.com/-UZ8bBtZ5nVY/TW3TyZv-9BI/AAAAAAAAA7k/oWifMVFHTxs/2074_R.png",		small : "http://lh6.ggpht.com/-3qcYnNTvqS4/TW3T04KFZDI/AAAAAAAAA78/O18-YshwK1M/mini2074_R.png"},
		"2076" : {big : "http://lh6.ggpht.com/-QANBigfzxmY/TZCCgAVxqtI/AAAAAAAABDI/vLYtlPCVt2Q/2076_UC.png",	small : "http://lh3.ggpht.com/-I8dx-BHw9Aw/TZCCjSSlHgI/AAAAAAAABDo/1sxBjnMU2Qc/mini2076_UC.png"},
		"2077" : {big : "http://lh3.ggpht.com/-u4foXjuJfQ4/TZCCgmDwZxI/AAAAAAAABDM/YhRfGNAag1U/2077_UC.png",	small : "http://lh3.ggpht.com/-YNUU_YaGeYU/TZCCjy8_GGI/AAAAAAAABDs/X5scvTFm8ms/mini2077_UC.png"},
		"2078" : {big : "http://lh6.ggpht.com/-bDICdryrQ0s/Tbbbllu1n3I/AAAAAAAABEs/QWJ6IsF3Q3w/2078_R.png",		small : "http://lh3.ggpht.com/-5RncC4HcYCw/Tbbbm_sNK7I/AAAAAAAABE8/QhMExooBWjg/mini2078_R.png"},
		"2084" : {big : "http://lh6.ggpht.com/-CD_aAYBnj28/TgB9_X-YOYI/AAAAAAAABGI/FnDGJfDUIDc/2084_SR.png",	small : "http://lh3.ggpht.com/-MswkfG776fc/TgB9_22PFfI/AAAAAAAABGQ/YABQmwf3Lbo/mini2084_SR.png"},
		"2086" : {big : "http://lh5.ggpht.com/-gQiX8zJNu50/Ti4pA3WL0YI/AAAAAAAABJs/91U33cCFglo/2086_SR.png",	small : "http://lh6.ggpht.com/-E5cp1E3mDLw/Ti4pCdT-eCI/AAAAAAAABJ8/KQ_aavGZi5A/mini2086_SR.png"},
		"2088" : {big : "http://lh3.ggpht.com/-W5GPapcZmA4/TkAJsCsGNfI/AAAAAAAABKM/Q9FtySyLJoc/2088_UR.png",	small : "http://lh4.ggpht.com/-wLg7mfEfim0/TkAJtfGqCJI/AAAAAAAABKY/MlDGk5mrZpQ/mini2088_UR.png"},
		"2089" : {big : "http://lh6.ggpht.com/-zzwpE8gva5A/TkAJskkvd8I/AAAAAAAABKQ/DfqIJh72gJg/2089_SR.png",	small : "http://lh5.ggpht.com/-cW0O6pRe2j0/TkAJtph-QgI/AAAAAAAABKc/NW0Q8L6YmG0/mini2089_SR.png"},
		"2091" : {big : "http://lh6.ggpht.com/-ytRjxYJ-Ta8/TkAJs7CqZrI/AAAAAAAABKU/uCU6SxoORkQ/2091_UC.png",	small : "http://lh3.ggpht.com/-TnK6J1-EFJs/TkAJt5APvjI/AAAAAAAABKg/9zAhSi20mNI/mini2091_UC.png"},
		"2092" : {big : "http://lh3.ggpht.com/-DE8C3haagc0/TlVoTVBc4dI/AAAAAAAABKo/Wf9bQiJMmH8/2092_UR.png",	small : "http://lh3.ggpht.com/-9paaT3F39nQ/TlVoUIv5NkI/AAAAAAAABKw/fzxJLOMjlQ8/mini2092_UR.png"},
		"2093" : {big : "http://lh5.ggpht.com/-t4WM5LCFEsM/TlVoTmAlv1I/AAAAAAAABKs/25qnl2BlkJ8/2093_SR.png",	small : "http://lh6.ggpht.com/-pCa_LjqQ3-k/TlVoUbOLXaI/AAAAAAAABK0/C-lD3T_do18/mini2093_SR.png"},
		"2094" : {big : "http://lh6.ggpht.com/-wMTjZB_dx1Y/ToAEB4DOqOI/AAAAAAAABTY/IvgiLzKlGzg/2094_UR.png",	small : "http://lh3.ggpht.com/-5UH5vSnIStU/ToAEC-CnCyI/AAAAAAAABTk/Th_A-8lF_0U/mini2094_UR.png"},
		"2096" : {big : "http://lh3.ggpht.com/-hhWI9J9j5rE/Tp70LpIuI_I/AAAAAAAABWM/XvRUZs_icps/2096_R.png",		small : "http://lh6.ggpht.com/-YUlcOMeLUtQ/Tp70OurB_WI/AAAAAAAABXU/230MPJszuBQ/mini2096_R.png"},
		"2097" : {big : "http://lh3.ggpht.com/-Dsm2vFSIs00/Tp70MEIYRSI/AAAAAAAABWU/QWPccspxphw/2097_UC.png",	small : "http://lh4.ggpht.com/-huFBmqykyvI/Tp70O1e6uSI/AAAAAAAABXc/TckZYPyfjL0/mini2097_UC.png"},
		"2098" : {big : "http://lh5.ggpht.com/-EPeWN1qqTpI/Tp70MRZNFzI/AAAAAAAABWc/O6rCghlwyMI/2098_UC.png",	small : "http://lh3.ggpht.com/-STkejNnsBeE/Tp70POSIlgI/AAAAAAAABXk/lm2WbNyvyv8/mini2098_UC.png"},
		"2099" : {big : "http://lh3.ggpht.com/-TjdAX_F-UUw/TqbwcNuQy-I/AAAAAAAABYU/AuUAZ3sUtcw/2099_SR.png",	small : "http://lh3.ggpht.com/-SRItuwFPwmg/TqbweUkzvkI/AAAAAAAABYs/4NDquJetCB8/mini2099_SR.png"},
		"3001" : {big : "http://lh4.ggpht.com/-LVYxV3G7ubA/TMOUE8XBbCI/AAAAAAAAAh4/jDx0mpIkrOw/3001_R.png",		small : "http://lh3.ggpht.com/-nvcyciDLYzQ/TMOUxFpHtXI/AAAAAAAAAoA/n2_0lF8ijyg/mini3001_R.png"},
		"3002" : {big : "http://lh3.ggpht.com/-MijYWAK6Hb8/TMOUFTN6BfI/AAAAAAAAAh8/y0Q2C9sVW4E/3002_SR.png",	small : "http://lh5.ggpht.com/-HsSi81b0_NY/TMOUxRs0CDI/AAAAAAAAAoE/y-fvMI1ErXQ/mini3002_SR.png"},
		"3003" : {big : "http://lh4.ggpht.com/-aVqtsl_ANBY/TMOUF4jNx3I/AAAAAAAAAiA/SAochOqhxVw/3003_SR.png",	small : "http://lh3.ggpht.com/-OF3WGe_fRz4/TMOUxgrtLLI/AAAAAAAAAoI/9Ynjp1OjEH0/mini3003_SR.png"},
		"3004" : {big : "http://lh3.ggpht.com/-iN6amrGftpU/TMOUGpyhbJI/AAAAAAAAAiI/dbB8Y-0m0OA/3004_SR.png",	small : "http://lh4.ggpht.com/-rnIb77im6cc/TMOUyHMsUkI/AAAAAAAAAoM/FLChu97t_y4/mini3004_SR.png"},
		"3005" : {big : "http://lh6.ggpht.com/-fP2wpVzcUg8/TMOUHKnmmPI/AAAAAAAAAiM/l4KI5iJZRQE/3005_R.png",		small : "http://lh6.ggpht.com/-BuFJb7NII4M/TMOUyQp9thI/AAAAAAAAAoQ/w1-YHs-YDjI/mini3005_R.png"},
		"3006" : {big : "http://lh3.ggpht.com/-Cas_K_cQ890/TMOUHhLRrAI/AAAAAAAAAiQ/NiHuGqp7rdQ/3006_SR.png",	small : "http://lh3.ggpht.com/-DJhtLQ9zQKg/TMOUy5TkMCI/AAAAAAAAAoU/EFQfGP_6LA4/mini3006_SR.png"},
		"3007" : {big : "http://lh6.ggpht.com/-tU6Fvilpp4s/TMOUIbDNZBI/AAAAAAAAAiU/oYDRF2WzHv0/3007_R.png",		small : "http://lh3.ggpht.com/-1zBimUVswk0/TMOUzKffVYI/AAAAAAAAAoY/08XmeBxHtcE/mini3007_R.png"},
		"3008" : {big : "http://lh3.ggpht.com/-6_1lWBgCkVU/TMOUI-PUYpI/AAAAAAAAAiY/r0lYYsg5UHA/3008_UC.png",	small : "http://lh3.ggpht.com/-QkkxXnwPUco/TMOUzXjSFKI/AAAAAAAAAoc/kovB_9HHTMg/mini3008_UC.png"},
		"3009" : {big : "http://lh3.ggpht.com/-yuaRA0hdiVw/TMOUJd_COlI/AAAAAAAAAic/j3K4kCt0m1o/3009_UC.png",	small : "http://lh3.ggpht.com/-NEVxUQoWxlM/TMOUz6kshkI/AAAAAAAAAok/d7vA6IFSZYY/mini3009_UC.png"},
		"3010" : {big : "http://lh6.ggpht.com/-YKh-2sPAxeQ/TMOUKHLewMI/AAAAAAAAAig/Jf7l4e61yTc/3010_R.png",		small : "http://lh6.ggpht.com/-NAwcp7IXHFA/TMOU0I--MXI/AAAAAAAAAoo/I1hdTQNwxsM/mini3010_R.png"},
		"3013" : {big : "http://lh5.ggpht.com/-zMjF2oq2EFc/TMOUKTw0TXI/AAAAAAAAAik/uhKEhrAum7U/3013_UC.png",	small : "http://lh6.ggpht.com/-AIUCvdT5tyw/TMOU0gQoHbI/AAAAAAAAAos/bPUGDwEH_KE/mini3013_UC.png"},
		"3026" : {big : "http://lh3.ggpht.com/-GorG_8cdLI0/TOjMZcBVB6I/AAAAAAAAAt8/SVBuAKgcnfM/3026_C.png",		small : "http://lh5.ggpht.com/-n0l7sSunK-4/TOjMZ2jBukI/AAAAAAAAAuA/TnwD9OXcr-c/mini3026_C.png"},
		"3031" : {big : "http://lh5.ggpht.com/-4eZX3bX_BWU/TUBXZDLQH4I/AAAAAAAAAxw/c5G-WhTsMuU/3031_R.png",		small : "http://lh6.ggpht.com/-fRrL7fO7u3w/TUBXbLW9ysI/AAAAAAAAAyA/C-tHHMOs5QU/mini3031_R.png"},
		"3032" : {big : "http://lh4.ggpht.com/-lIAmsd2p3iw/TUBXZoTttvI/AAAAAAAAAx0/tFHZPy7pkB4/3032_R.png",		small : "http://lh5.ggpht.com/-KoK5IXvdysU/TUBXbTyjspI/AAAAAAAAAyE/mTNa5a_os54/mini3032_R.png"},
		"3037" : {big : "http://lh5.ggpht.com/-l1-9QdFG5bk/TMOUK0iKPxI/AAAAAAAAAio/tAxl-misT1Y/3037_R.png",		small : "http://lh5.ggpht.com/-YOKKvaLQMzs/TMOU1JhNQRI/AAAAAAAAAow/KQVu1KvFESc/mini3037_R.png"},
		"3038" : {big : "http://lh6.ggpht.com/-Npha340QCO0/TMOULexVMqI/AAAAAAAAAis/X8zY9NNPGZ8/3038_UC.png",	small : "http://lh5.ggpht.com/-EqbKmGfgV5k/TMOU1Xy4MlI/AAAAAAAAAo0/Gc9aHY7dVdM/mini3038_UC.png"},
		"3039" : {big : "http://lh4.ggpht.com/-B-xHi9Gu_ig/TMOUL4TFfhI/AAAAAAAAAiw/RhyOA2yKj0I/3039_C.png",		small : "http://lh4.ggpht.com/-8Lq7sqP36CU/TMOU1iK2YYI/AAAAAAAAAo4/_ZoT_00yPd0/mini3039_C.png"},
		"3040" : {big : "http://lh4.ggpht.com/-ynSM39Zynpw/TMOUMmuuX_I/AAAAAAAAAi0/PFXJMb9M00A/3040_SR.png",	small : "http://lh6.ggpht.com/-Nnr_nohY5-M/TMOU1xFvjlI/AAAAAAAAAo8/dT1K1hCGCu8/mini3040_SR.png"},
		"3041" : {big : "http://lh4.ggpht.com/-x9HbCgMx1P4/TMOUNNVsfNI/AAAAAAAAAi4/zPsag1CuvwI/3041_R.png",		small : "http://lh6.ggpht.com/-0hJFkltJnsE/TMOU2fLpLEI/AAAAAAAAApA/Rz0K5V0DLYM/mini3041_R.png"},
		"3042" : {big : "http://lh4.ggpht.com/-5_52oj93cGs/TMOUNwrd0hI/AAAAAAAAAi8/_XIpmZ4HQBI/3042_R.png",		small : "http://lh5.ggpht.com/-Xia2s0OGnMo/TMOU2_XO_PI/AAAAAAAAApE/PWtzxvN6PJc/mini3042_R.png"},
		"3043" : {big : "http://lh3.ggpht.com/-4X7Tw1Dg2ms/TMOUOU6udXI/AAAAAAAAAjA/FffzjDC3iOY/3043_UC.png",	small : "http://lh6.ggpht.com/-nZf8oMrqkZ8/TMOU3CYK0dI/AAAAAAAAApI/C_mwbu0iBYU/mini3043_UC.png"},
		"3045" : {big : "http://lh3.ggpht.com/-jzsgxYqTCDg/TMOUPedOOLI/AAAAAAAAAjE/WhT3fgdF9FY/3045_UR.png",	small : "http://lh5.ggpht.com/-d9DgN-6KNzM/TMOU3SagEjI/AAAAAAAAApM/1aOYNsBeCoM/mini3045_UR.png"},
		"3046" : {big : "http://lh3.ggpht.com/-z4D2MsNgSi8/TMOUP1m0hXI/AAAAAAAAAjI/ZIQjJIejimE/3046_UR.png",	small : "http://lh5.ggpht.com/-QBl6DMNPIfw/TMOU3__uZiI/AAAAAAAAApQ/Wzfy0CGO3ts/mini3046_UR.png"},
		"3047" : {big : "http://lh3.ggpht.com/-b-zDXcYmwoE/TMO7sx_MhTI/AAAAAAAAAqs/s7FdawzHJJE/3047_UR.png",	small : "http://lh3.ggpht.com/-t9ECqhG0r6E/TMO7uk2RMbI/AAAAAAAAAq8/5UkhDkXZhmg/mini3047_UR.png"},
		"3049" : {big : "http://lh3.ggpht.com/-1M6Mz9a9TzU/TMOUQoZ9_BI/AAAAAAAAAjM/LjJ6QuYcy_E/3049_UC.png",	small : "http://lh3.ggpht.com/-taSkS87ilLw/TMOU4DefQaI/AAAAAAAAApU/J4JLkO-a5Lg/mini3049_UC.png"},
		"3051" : {big : "http://lh3.ggpht.com/-TFOOxvjJKeo/TMO7tOarDJI/AAAAAAAAAqw/RfZ7fjwmLlo/3051_R.png",		small : "http://lh3.ggpht.com/-0cCh_A5ztCA/TMO7uzlkjxI/AAAAAAAAArA/bTtfuUdUTJE/mini3051_R.png"},
		"3052" : {big : "http://lh3.ggpht.com/-8NffT6IZG2I/TMOURLLbAmI/AAAAAAAAAjQ/Wfey2KDy-Jg/3052_UC.png",	small : "http://lh5.ggpht.com/-Yf4E9xdKdOA/TMOU4sXrtrI/AAAAAAAAApY/_IuUt6Gc-JA/mini3052_UC.png"},
		"3053" : {big : "http://lh3.ggpht.com/-uTgde6Nw3eM/TMclOnUVmuI/AAAAAAAAArc/pOoENC71FVs/3053_UR.png",	small : "http://lh4.ggpht.com/-8kQDWknwpKc/TMclRJkg-KI/AAAAAAAAAr4/-5sgbHhLUrE/mini3053_UR.png"},
		"3054" : {big : "http://lh6.ggpht.com/-DVm9YUFfQa4/TMclO1AjeeI/AAAAAAAAArg/G5EV5wmQgyE/3054_SR.png",	small : "http://lh4.ggpht.com/-X0Y65vBOOYw/TMclRZnTrAI/AAAAAAAAAr8/nq3XEa6rYb4/mini3054_SR.png"},
		"3056" : {big : "http://lh5.ggpht.com/-MA_-i6yxU_4/TUBXaIPMHJI/AAAAAAAAAx4/iV3kyDOi7VU/3056_UR.png",	small : "http://lh4.ggpht.com/--euHdRVt6mY/TUBXb9yQkrI/AAAAAAAAAyI/VmlaQTwEBS8/mini3056_UR.png"},
		"3057" : {big : "http://lh5.ggpht.com/-vjss5dEfpX0/TUBXailKb_I/AAAAAAAAAx8/NcU8g79acfo/3057_UR.png",	small : "http://lh3.ggpht.com/-M8Rhkb4VLpA/TUBXcY7xReI/AAAAAAAAAyM/G0p2UxJV_wo/mini3057_UR.png"},
		"3058" : {big : "http://lh3.ggpht.com/-0pxkAYg06tk/TSE1FxEaCdI/AAAAAAAAAvQ/KjizN46LWX0/3058_UR.png",	small : "http://lh3.ggpht.com/-DSW96376Tfc/TSE1HW4UCPI/AAAAAAAAAvg/JQdRau-da_M/mini3058_UR.png"},
		"3062" : {big : "http://lh6.ggpht.com/-aHX8lR6Ahag/TT9wxxmDquI/AAAAAAAAAwQ/cTeNAhpKT0Y/3062_UC.png",	small : "http://lh6.ggpht.com/-S0H7LzqulHU/TT9wzovgP3I/AAAAAAAAAwk/mIzaSy1V2PU/mini3062_UC.png"},
		"3064" : {big : "http://lh5.ggpht.com/-c-Gnv1iQVVY/TW3Ty-i035I/AAAAAAAAA7o/P2BvGFtJt_M/3064_R.png",		small : "http://lh4.ggpht.com/-k5K3vL6b6_E/TW3T1FlyA0I/AAAAAAAAA8A/izks226-mw8/mini3064_R.png"},
		"3065" : {big : "http://lh5.ggpht.com/-TIjhYRvuTWc/TZCChGGo_QI/AAAAAAAABDQ/uH3mHF3Zp2k/3065_UR.png",	small : "http://lh5.ggpht.com/-ozaGASGEhhs/TZCCkF4YNwI/AAAAAAAABDw/afuHU1TLGqM/mini3065_UR.png"},
		"3066" : {big : "http://lh4.ggpht.com/-SzKmKmr-nqs/TW5YvoDXm3I/AAAAAAAAA8w/NWKKEuxD3uM/3066_UR.png",	small : "http://lh4.ggpht.com/-1qmtbnVCM7w/TW5YwI_9MQI/AAAAAAAAA80/k-xRd1LiecE/mini3066_UR.png"},
		"3067" : {big : "http://lh5.ggpht.com/-0oq9DyXmsGY/TZCChmRG8XI/AAAAAAAABDU/2RVqQUl1JLQ/3067_UR.png",	small : "http://lh3.ggpht.com/-YtH8Dq4b5KY/TZCCkRLt4oI/AAAAAAAABD0/Rh3J4Ldta7s/mini3067_UR.png"},
		"3078" : {big : "http://lh5.ggpht.com/-z_T8oyM-Npc/Tp70MwHnS9I/AAAAAAAABWk/x0Oae4Uaom8/3078_R.png",		small : "http://lh5.ggpht.com/-F-8WFZaHSjU/Tp70PetFrqI/AAAAAAAABXs/RAgjtiqhT48/mini3078_R.png"},
		"3079" : {big : "http://lh3.ggpht.com/-LuZq2Bo9Xdg/Tp70NT-De1I/AAAAAAAABWs/fjajiN1v0b8/3079_UC.png",	small : "http://lh5.ggpht.com/-X1HDBaq5BKE/Tp70Pmq8eaI/AAAAAAAABX0/tjzbw-WuG5g/mini3079_UC.png"},
		"3080" : {big : "http://lh4.ggpht.com/-mTQR7_p-K_M/Tp70NuAP6oI/AAAAAAAABW0/hefRxiMAimk/3080_UC.png",	small : "http://lh6.ggpht.com/-hLMSLSZir-A/Tp70P-0cnNI/AAAAAAAABX8/DB1vbLd_4X0/mini3080_UC.png"},
		"3081" : {big : "http://lh4.ggpht.com/-e9lQGOo4q1I/TrnKdOVqFlI/AAAAAAAABZE/iQAfgS7Jask/3081_UR.png",	small : "http://lh5.ggpht.com/-avoNc0UG0Ps/TrnKfabmv4I/AAAAAAAABZY/Mspr8MDFhKQ/mini3081_UR.png"},
		"3082" : {big : "http://lh4.ggpht.com/-rN-x8VDrazY/TrnKdiN4kTI/AAAAAAAABZI/-UJJT4ea0eU/3082_SR.png",	small : "http://lh4.ggpht.com/-0rX402sK2LM/TrnKfwq_PpI/AAAAAAAABZg/WXrIfST5bsQ/mini3082_SR.png"},
		"3083" : {big : "http://lh6.ggpht.com/-BFc6XaEQWF0/TrnKeEPMYNI/AAAAAAAABZQ/fm4YeprtrcI/3083_R.png",		small : "http://lh3.ggpht.com/-KBPt30ooorY/TrnKg4RmnII/AAAAAAAABZo/tOgexpuVEQY/mini3083_R.png"},
		"3087" : {big : "http://lh4.ggpht.com/-qzjK8ADzMGo/TspwUbLYNxI/AAAAAAAABZ4/r0_TV4ewizI/3087_UR.png",	small : "http://lh5.ggpht.com/-YeNbZ3_YPP8/TspwWHRCwoI/AAAAAAAABaQ/zXxNfLGaeWw/mini3087_UR.png"},
		"4001" : {big : "http://lh3.ggpht.com/-rPCGC0Bh1Fc/TVDfNfYhGFI/AAAAAAAAAys/oAhuRQLpZ6g/4001_SR.png",	small : "http://lh6.ggpht.com/-lzwENk0zJTY/TVDfNS309kI/AAAAAAAAAyw/o7wt9h6D9H0/mini4001_SR.png"},
		"4002" : {big : "http://lh3.ggpht.com/-W_U4yFEJO_w/TMOUSQRaowI/AAAAAAAAAjY/eWtvz4DjgpY/4002_R.png",		small : "http://lh5.ggpht.com/-UQ02qCvIsSE/TMOU5X1QQ2I/AAAAAAAAApg/hd71wP-QCsM/mini4002_R.png"},
		"4003" : {big : "http://lh3.ggpht.com/-x7NnM3JgJZw/TMOUS6P0fEI/AAAAAAAAAjc/-86F_ombfWA/4003_R.png",		small : "http://lh5.ggpht.com/-bFhMrBs54MY/TMOU5gR3uGI/AAAAAAAAApk/GprgvA1z1Tc/mini4003_R.png"},
		"4004" : {big : "http://lh5.ggpht.com/-UC0Xt7phUqc/TMOUTVFsIzI/AAAAAAAAAjg/II3Atly7DMQ/4004_R.png",		small : "http://lh5.ggpht.com/-DwOJrIsEEL8/TMOU5xFmbNI/AAAAAAAAApo/dHDqeM1d8oY/mini4004_R.png"},
		"4005" : {big : "http://lh3.ggpht.com/-gg06FKX2y7U/TMOUT_9oPHI/AAAAAAAAAjk/fE9Q2wyDl2A/4005_R.png",		small : "http://lh6.ggpht.com/-sFQNguvj5Eo/TMOU6TwZASI/AAAAAAAAAps/JvYbLu153VI/mini4005_R.png"},
		"4006" : {big : "http://lh3.ggpht.com/-FyRRZUULxmI/TMOUUkqxrZI/AAAAAAAAAjo/hbPU10vxNgY/4006_UC.png",	small : "http://lh4.ggpht.com/-5dbFOaq0U9Y/TMOU6pFCFWI/AAAAAAAAApw/iE3MhkdXs8A/mini4006_UC.png"},
		"4007" : {big : "http://lh6.ggpht.com/-HqKuRnEtZZw/TMOUVMCW3UI/AAAAAAAAAjs/I7Q0pRkjPP0/4007_C.png",		small : "http://lh4.ggpht.com/-zZ1bXt6hgok/TMOU67kpv5I/AAAAAAAAAp0/K0rzvCliT2M/mini4007_C.png"},
		"4025" : {big : "http://lh6.ggpht.com/-ue3GXe6VYhU/TMOUVhhQZgI/AAAAAAAAAjw/Yv9OIE3vXFY/4025_SR.png",	small : "http://lh6.ggpht.com/-eRrpaGiEWIc/TMOU7boBMmI/AAAAAAAAAp4/37zpxctxsrY/mini4025_SR.png"},
		"4026" : {big : "http://lh6.ggpht.com/-d0vd96hgy4U/TMOUWNKSqqI/AAAAAAAAAj0/ShsOJEG8Gp4/4026_R.png",		small : "http://lh4.ggpht.com/-bCy-k5N_bOU/TMOU7huScDI/AAAAAAAAAp8/U9iqGwANKew/mini4026_R.png"},
		"4027" : {big : "http://lh3.ggpht.com/-vDtqbTFiv4c/TMOUWnm5w0I/AAAAAAAAAj4/Bu3o1Jk0YTM/4027_UC.png",	small : "http://lh5.ggpht.com/-Gq7KiIlxyBQ/TMOU8EoFz6I/AAAAAAAAAqA/XqXqOJyx2H8/mini4027_UC.png"},
		"4029" : {big : "http://lh5.ggpht.com/-iZ7an7IwqJw/TMOUXLFtWWI/AAAAAAAAAj8/xrpOND9Db9k/4029_R.png",		small : "http://lh4.ggpht.com/-zZKgtvOromE/TMOU8opmvtI/AAAAAAAAAqE/y7_CR6YQiaA/mini4029_R.png"},
		"4031" : {big : "http://lh4.ggpht.com/-ggQonUkSp2g/TMOUXki26vI/AAAAAAAAAkA/MPykzDQ5qIc/4031_UR.png",	small : "http://lh5.ggpht.com/-g057mb26wuI/TMOU82SqcSI/AAAAAAAAAqI/tXaY5x8gKUw/mini4031_UR.png"},
		"4032" : {big : "http://lh5.ggpht.com/-oDiCoH0S4GY/TMOUYLSFpuI/AAAAAAAAAkE/tPmlskMoFBo/4032_SR.png",	small : "http://lh5.ggpht.com/-ATpTfZiGvJ4/TMOU9X-ULPI/AAAAAAAAAqM/aICJqXLSuoo/mini4032_SR.png"},
		"4033" : {big : "http://lh4.ggpht.com/-y1vHJL6eyUM/TMOUYprSnDI/AAAAAAAAAkI/TG2q8rtqAFE/4033_SR.png",	small : "http://lh6.ggpht.com/-hel0pFyOVq8/TMOU9_n_ygI/AAAAAAAAAqQ/VwxRGxb5k4g/mini4033_SR.png"},
		"4034" : {big : "http://lh3.ggpht.com/-BBLUVlJNN-I/TMOUZEb3lSI/AAAAAAAAAkM/Td501sGU6bo/4034_SR.png",	small : "http://lh6.ggpht.com/-nML-048INCI/TMOU-MOyyAI/AAAAAAAAAqU/0THXpe1PPBU/mini4034_SR.png"},
		"4038" : {big : "http://lh5.ggpht.com/-Tri4DBVSvuo/TMclPU4sQJI/AAAAAAAAArk/98Bq-Thq08E/4038_UC.png",	small : "http://lh5.ggpht.com/-3LUqSD-vxQ8/TMclRv5Tt9I/AAAAAAAAAsA/O9wriGDDBHY/mini4038_UC.png"},
		"4039" : {big : "http://lh5.ggpht.com/-nSd40N3yHX4/TSE1GVQmGFI/AAAAAAAAAvU/onDT_HtL79w/4039_UR.png",	small : "http://lh5.ggpht.com/-W6hIQyo7Cfw/TSE1H4-8fMI/AAAAAAAAAvk/wRPf-LA7GjQ/mini4039_UR.png"},
		"4042" : {big : "http://lh3.ggpht.com/-YxtLfx6S78Q/TW3TznofjBI/AAAAAAAAA7w/ub9ZbVI7F58/4042_SR.png",	small : "http://lh6.ggpht.com/--nNRKfWE9H4/TW3T1zS1NAI/AAAAAAAAA8I/pBQSHMlcCU4/mini4042_SR.png"},
		"4046" : {big : "http://lh4.ggpht.com/-2F1qPtMYiX4/TT9wyNTs4BI/AAAAAAAAAwU/dGNaHahxfSw/4046_UC.png",	small : "http://lh5.ggpht.com/-8fTiLKAoeqw/TT9wz1rKLaI/AAAAAAAAAwo/nHJxWucyu5w/mini4046_UC.png"},
		"4047" : {big : "http://lh3.ggpht.com/-_6b0I5nlXFw/TZCCiGASkKI/AAAAAAAABDY/2w55Uy5U6gg/4047_SR.png",	small : "http://lh4.ggpht.com/-u-_xhc4C1Rs/TZCCknJF8oI/AAAAAAAABD4/awQFYPosn2Y/mini4047_SR.png"},
		"4048" : {big : "http://lh4.ggpht.com/-Ua1c7kmbE_Q/TW3T0LKqBAI/AAAAAAAAA70/AmqXTG-w6U8/4048_SR.png",	small : "http://lh4.ggpht.com/-CUtV4_Sca10/TW3T2EOWkeI/AAAAAAAAA8M/IO2rlZ7DEN4/mini4048_SR.png"},
		"4050" : {big : "http://lh5.ggpht.com/-1aUHVy2cx8A/TZCCiaYThhI/AAAAAAAABDc/H0ylhZfXVN4/4050_SR.png",	small : "http://lh3.ggpht.com/-w_XSpOvtk5Y/TZCCk-dnqKI/AAAAAAAABD8/nxkS4UeSc60/mini4050_SR.png"},
		"4051" : {big : "http://lh4.ggpht.com/-fWdLakxRGmY/Tbbbl3e67II/AAAAAAAABEw/OYhBHDHMgfM/4051_UR.png",	small : "http://lh3.ggpht.com/-xqTnAa-A03g/TbbbnAlAPII/AAAAAAAABFA/FZCJL24YBWw/mini4051_UR.png"},
		"4052" : {big : "http://lh3.ggpht.com/-pDdAtOUiaj0/TbbbmfoveXI/AAAAAAAABE0/RO9fO-OqMlU/4052_R.png",		small : "http://lh4.ggpht.com/-hJfIO125Fxk/TbbbnlUfVrI/AAAAAAAABFE/YKcFUgg7XR8/mini4052_R.png"},
		"4053" : {big : "http://lh3.ggpht.com/-0UHrFqB2wgo/Tdp214RxijI/AAAAAAAABFU/U6QERIKs-n4/4053_UR.png",	small : "http://lh6.ggpht.com/-5r12h8jRtK8/Tdp22plxIwI/AAAAAAAABFg/eQKLN_XWlXQ/mini4053_UR.png"},
		"4055" : {big : "http://lh5.ggpht.com/-t5j_uxkBUUo/Ti4pBUala5I/AAAAAAAABJw/Na0lakZ8ix0/4055_UR.png",	small : "http://lh5.ggpht.com/-kO2YGVIfS98/Ti4pCkeIBhI/AAAAAAAABKA/h9muF4mF9Aw/mini4055_UR.png"},
		"4056" : {big : "http://lh5.ggpht.com/-tc70aUVdjYc/Ti4pB0XfnpI/AAAAAAAABJ0/h9lJQexYh88/4056_SR.png",	small : "http://lh6.ggpht.com/-SG-lJWzT8gs/Ti4pC81gvEI/AAAAAAAABKE/d9c01H_M7iQ/mini4056_SR.png"},
		"4059" : {big : "http://lh3.ggpht.com/-_HDOuV0cCzs/ToAECN6WNgI/AAAAAAAABTc/_zWu-El83-8/4059_R.png",		small : "http://lh3.ggpht.com/-k_ujaZsYUho/ToAEDJliZPI/AAAAAAAABTo/04iIBFrfQbk/mini4059_R.png"},
		"4060" : {big : "http://lh5.ggpht.com/-BdtTX_9ulhY/Tqbwch0QylI/AAAAAAAABYc/ddz7lMRr48I/4060_UR.png",	small : "http://lh3.ggpht.com/-gaMKP-vv5qk/Tqbwe2JJgKI/AAAAAAAABY0/r7LeU3aqCMg/mini4060_UR.png"},
		"4063" : {big : "http://lh6.ggpht.com/-qNAEp7X6Ix8/TspwUmc9roI/AAAAAAAABZ8/mW6lxnRJH_w/4063_R.png",		small : "http://lh3.ggpht.com/-OiNwhH_-N2g/TspwWu0q0KI/AAAAAAAABaU/9Zkw8-5oLXM/mini4063_R.png"},
		"4064" : {big : "http://lh4.ggpht.com/-PPo8pbYl7pY/TspwVEH9qSI/AAAAAAAABaI/QgmJlUepXbs/4064_R.png",		small : "http://lh3.ggpht.com/-S1PgP2M1W-E/TspwW9LpU8I/AAAAAAAABaY/uX1FpgZE1fM/mini4064_R.png"}
	};

	// 武将図鑑を置き換え
	if (location.pathname == '/card/busyobook_card.php') {

		var zukan = {
			"劉備" : "真名は桃香（とうか）。蜀漢の君主で、関羽・張飛とは義姉妹。中山靖王劉勝の末裔である証の宝剣「靖王伝家」を携え、世を救うために立ち上がる。限りない優しさと懐の大きさを持つが、極彩色の天然ボケタイプ。",
			"関羽" : "真名は愛紗（あいしゃ）。大陸中にその名を馳せる蜀の武神。理想家で、力の無い人々が平和に暮らせる世の中を作るために日々奮闘している。性格は生真面目で堅物。艶やかな黒髪をなびかせて青龍偃月刀を振るうその姿から「美髪公」の二つ名で呼ばれる。",
			"張飛" : "真名は鈴々（りんりん）。ちびっ子だが自分の背丈より大きな丈八蛇矛を振るう万夫不当の豪傑。戦場以外では、近所の子供と駆け回って遊んだり、虫取りに興じていたりなど、年相応の一面を持つ。",
			"馬超" : "真名は翠（すい）。西涼の太守、馬騰の娘。曹操によって涼州を滅ぼされ一族が離散したため、劉備を頼り蜀軍の一員となる。その槍捌きは白銀の流星と謳われる「西涼の錦馬超」。",
			"黄忠" : "真名は紫苑（しおん）。弓の神・曲張に例えられるほどの腕前を持つ弓の名手。将軍として兵を率いるだけでなく、蜀軍の兵站管理も担当する。未亡人で、亡夫との間に一人娘の璃々がいる。",
			"趙雲" : "真名は星（せい）。文武両道に長けた蜀の武将。関羽・張飛に匹敵するほどの武勇の持ち主で、その槍捌きは「神槍」と称えられる。常に冷静沈着で何事にも動じない精神の持ち主。メンマが大好物。",
			"諸葛亮" : "真名は朱里（しゅり）。「伏竜」と称さられる、蜀軍の主に内政面を担当する軍師。「策、神に勝り、謀ごと、鬼を討つ」とまで言われるほどの策略家。女子校の水鏡女学院で育ったため、男性が少し苦手。慌てると「はわわ」と口走るところから「はわわ軍師」と呼ばれている。",
			"龐統" : "真名は雛里（ひなり）。「鳳雛」と称せられる、蜀軍の主に軍事面を担当する軍師。「不敗の魔女っ子」と呼ばれる戦術の天才。かなり内気でおどおどしており、恥ずかしいと大きな帽子で顔を隠す癖がある。慌てると「あわわ」と口走るところから「あわわ軍師」と呼ばれている。",
			"馬岱" : "真名は蒲公英（たんぽぽ）。馬超の従妹。従姉である馬超を、お姉さまと慕い尊敬している。天性の悪戯好きで、よく魏延をからかっている。なにかにつけて、決め台詞の「ここにいるぞ～！」の声をあげながら登場する。",
			"魏延" : "真名は焔耶（えんや）。五虎将に次ぐ実力を持つ蜀の猛将。当初は敵対していたが、劉備に一目惚れしたことがきっかけで幕下に加わることになる。自らの武勇に自信を持ち、強気な発言をしたり、他人をバカにしたりしているが、実は打たれ弱いタイプ。犬が大の苦手。",
			"厳顔" : "真名は桔梗（ききょう）。無類の酒好きな豪快な武将。黄忠と共に蜀の若い武将の相談役として面倒を見ている。戦が好きで、戦いでは弓が武器なのに率先して前に出るタイプ。",
			"曹操" : "真名は華琳（かりん）。誇り高き魏の王。戦乱の世を、自らの手で再興することに天命を見出している。才気煥発で誇り高く、他者からの妬みを受ける事も多いが、歯牙にも掛けず自らの信念を貫く。美しい者には目が無く、美少女を手篭にするのが趣味。",
			"夏侯惇" : "真名は春蘭（しゅんらん）。曹操の片腕の武人。夏侯淵の双子の姉。身も心も曹操に捧げており、曹操に敵対する者は誰であろうと許さない。激情家で猪突猛進で、天然バカの体育会系。",
			"夏侯淵" : "真名は秋蘭（しゅうらん）。曹操の片腕の武人。夏侯惇の双子の妹。姉と共に身も心も曹操に捧げている。性格は姉とは違い、常に冷静沈着。とかく暴走する姉を、クールに補佐する。",
			"荀彧" : "真名は桂花（けいふぁ）。魏の筆頭軍師。曹操の王としての器、天運、才能に惚れ込み、己の全てを捧げて仕えている。バカな人間が何よりも大嫌いで、夏侯惇の事を野蛮人と蔑んでいる。",
			"許褚" : "真名は季衣（きい）。親友の典韋と共に曹操の親衛隊を務める。小柄な体格から想像できない怪力の持ち主で、巨大な鉄球を軽々と振りまわす。曹操の事は好きだが、それと同じくらいに夏侯惇を慕っている。",
			"典韋" : "真名は流琉（りり）。親友の許緒と共に曹操の親衛隊を務める。許緒と二人でよく食べ歩きをするが、食べるのが大好きな許緒と違って料理を作る方が好き。相方のフォロー役という立場が似てるせいか、夏侯淵を尊敬し憧れている。",
			"張遼" : "真名は霞（しあ）。董卓軍の客将であったが、後に魏の騎兵部隊を率いる将軍となる。武と義を重んじ侠気に満ちた性格で、自らの武技を披露する事の喜びを見出す武将。関羽の戦いぶりに惚れ込み、武器も関羽の青龍偃月刀を模した飛龍偃月刀を使用する。",
			"郭嘉" : "真名は稟（りん）。戦術能力に秀でる魏の軍師。歯に衣着せぬ物言いで、曹操に対しても言葉を選ばず諫言する。妄想癖があり、曹操から掛けられる言葉をエロ的に解釈しては鼻血を噴き出し気絶している。",
			"程昱" : "真名は風（ふう）。政戦両略に長ける魏の軍師。常にのんびりマイペースで、軍議の途中でも居眠りするほど。しかし策を提案する時は一切の感情を交えず、冷酷な献策をする。頭の上のぬいぐるみは「宝譿」という名前の相棒。",
			"楽進" : "真名は凪（なぎ）。魏の武官で元義勇軍の将。肉弾戦を得意とする。武骨で、女の子らしいことに興味が無いふりをしているが、実は憧れがあり、料理や裁縫などを常に練習していたりする。",
			"李典" : "真名は真桜（まおう）。魏の武官で元義勇軍の将。兵器調達官も兼ねている。発明が大好きで、自らの発明品であるドリル付き槍「螺旋槍」を武器に戦う。",
			"于禁" : "真名は沙和（さわ）。魏の武官で元義勇軍の将。新兵の訓練教官も兼ねており、可愛い声で聞くに堪えない罵声を浴びせて新兵をシゴいている。女の子らしい性格で、好きな事はオシャレとショッピング。",
			"孫権" : "真名は蓮華（れんふぁ）。姉・孫策が急逝したために若くして孫呉の王となる。孫策と比べると武勇では及ぶべくもないが、王としての器はむしろ上回ると期待されている。生真面目な性格で、常に呉の王らしくあれと自分に言い聞かせている。",
			"孫策" : "真名は雪蓮（しぇれん）。母・孫堅の遺志を継いだ孫呉の英雄王。普段は陽気で気さくな性格だが、敵対する人間に対しては容赦しない。戦場で血を見るとテンションが上がりすぎて、自分で自分を制御できなくなる性癖を持つ。",
			"孫尚香" : "真名は小蓮（しゃおれん）。孫策・孫権の妹。天真爛漫自由闊達な小悪魔的。好奇心が強く、何でも知りたがる元気娘。ホワイトタイガーの周々とパンダの善々をお供に連れている。",
			"陸遜" : "真名は穏（のん）。呉の副軍師。穏やかな性格で、のんびりした口調だが、実はかなりの切れ者。大の本好きで、素晴らしい書物に出会うと興奮して昂ぶってしまう性癖の持ち主。",
			"周瑜" : "真名は冥琳（めいりん）。孫呉の大軍師で、孫策とは幼なじみの親友同士。文官・武官を束ねる呉の柱石。「理」と「利」から物事を判断するリアリストだが、諧謔を解する能力もあり、以外に茶目っ気があったりもする。",
			"甘寧" : "真名は思春（ししゅん）。孫権の親衛隊長として、常にその傍らに控える忠臣。元は錦帆賊と呼ばれた江賊の頭領だった。寡黙で感情を表に出さないが、孫権の器の大きさに心服しており、孫権を陰から支え守っている。",
			"周泰" : "真名は明命（みんめい）。孫権の親衛隊副長。甘寧と共に孫権を支える忠臣。寡黙でクールな甘寧とは対照的に、はきはきと喋り朗らかな性格。生真面目で、寝食を忘れて職務をこなす。大の猫好き。",
			"呂蒙" : "真名は亞莎（あーしぇ）。呉の軍師見習い。元は呉の下級士官で武闘派だったが、軍師としての才能を見こまれ周瑜・陸遜の弟子となる。他者を威嚇するような鋭い目つきだが、実は目が悪いだけ。好物は胡麻団子。",
			"黄蓋" : "真名は祭（さい）。孫堅の代から孫家に仕える呉の宿将。孫呉の生き字引として、皆に一目置かれる存在。豪毅な性格だが、結構子供っぽく気分屋なところもある。",
			"大喬" : "江東の二喬と謳われる双子の姉妹の姉。大陸中、知らぬものはいないと言われるほどの美少女。孫策の恋人であったが、孫策亡き後はその遺言に従い、妹の小喬と共に周瑜に仕えることとなる。",
			"小喬" : "江東の二喬と謳われる双子の姉妹の妹。大陸中、知らぬものはいないと言われるほどの美少女。周瑜のペット兼メイドとして仕えている。姉の大喬に歪んだ愛情を持っており、姉を苛めることが大好き。",
			"袁紹" : "真名は麗羽（れいは）。河北四州を支配する四世三公の名門・袁家の当主。わがままで見栄っ張りな性格で、行き当たりばったりな思い付きで行動するため、周りの人間は振りまわされている。異常なまでに悪運が強い。",
			"文醜" : "真名は猪々子（いいしぇ）。袁紹軍の双璧の一人。やたらとはりきっては周囲をトラブルに巻き込んでいく。夢は一獲千金のギャンブラータイプ。何も考えていないようで、意外と状況を見て動いている。",
			"顔良" : "真名は斗詩（とし）。袁紹軍の双璧の一人。おっとりとした常識人で、いつも袁紹お嬢様のワガママと、ハリキリ屋である文醜の行き当たりばったりな行動に付き合わされている。",
			"公孫瓚" : "真名は白蓮（ぱいれん）。北方・幽州の弱小領主。賊退治でそこそこ名を上げ「白馬長史」と呼ばれたが、袁紹に領国を滅ぼされる。普通の剣を装備して、普通の鎧を身に纏い、普通の白馬に乗って颯爽と登場する、影の薄い普通の人。",
			"董卓" : "真名は月（ゆえ）。都を占拠し悪逆非道を働く奸賊と噂されるが、実際は陰謀により暴君に仕立て上げられただけで、本人は優しく儚げな少女。依存心が強い性格で、内罰的な一面を持つ。",
			"賈詡" : "真名は詠（えい）。董卓の幼なじみで董卓軍の軍師。冷血・冷徹で謀略に長ける策謀家。董卓のためなら、どんな残酷・卑怯な策も用いる。しかし仕掛ける策略は、いつも裏目に出る不運体質。",
			"呂布" : "真名は恋（れん）。三國無双の強さを誇る最強の武人。無口・無表情で何を考えているのかが分かりにくいキャラクター。だが本当は寂しがり屋で、捨てられた犬や猫を拾ってきては屋敷で飼っている。一番の親友はウェルシュコーギーのセキト。",
			"華雄" : "董卓軍の猛将。意外と部下からは慕われている。",
			"孟獲" : "真名は美以（みい）。未開の地・南蛮を治める大王。領土が増えれば美味しいものが沢山食べられ大勢の人に平伏されるから、という理由で蜀に攻め込もうとしたが、逆に攻められて敗退。七回敗れた後、劉備と仲良しになり仲間となる。",
			"于吉" : "左慈と共に洛陽で暗躍する神仙。傀儡と呼ぶ白装束の者達を操り、数々の武将を唆し歴史の裏で暗躍している。武闘派の左慈とは違い策略を好む性格。柔和な外見を持つが、冷酷な一面がある。",
//			"貂蝉" : "自称踊り子。マッチョな肉体に、ピンクのビキニパンツのみを着用したオカマ。なぜか大陸の様々な情報に詳しい事情通。異様な容姿にそぐわず、意外に常識人で面倒見が良い。",
			"張角" : "真名は天和（てんほう）。張三姉妹の長女。妹たちとアイドルユニット「数え役萬☆姉妹(しすたぁず)」として活躍する。ファンの暴走によって黄巾党の首領に祭り上げられるが、本人はいたってのんびり。",
			"袁術" : "真名は美羽（みう）名門・袁家の一族で、袁紹の従妹。張勲に甘やかされて育てられたため、ワガママでアホな子になった。好物はハチミツ水。",
//			"紀霊" : "真名は七乃（ななの）。袁術の側近兼世話役兼傅役。袁術が幼少の頃より仕えており、袁術を甘やかしまくって育てた。溺愛する袁術の為に、さまざまな悪だくみを行う。",
		};

		var cna = document.getElementsByClassName('name'); 
		var des = document.getElementsByClassName('description');
		var nam = document.getElementsByTagName('h3');
		var i;

		// 紹介文を置き換え
		for (i = 0; i < 1; i++) {
			var HimeZukan = zukan[cna[i].innerHTML];
			if (HimeZukan != null) {
				des[i].innerHTML = HimeZukan;
			}
		}

		// 原作にあわせて漢字を置き換え
		var names = {
			'龐統 （ほうとう）'       : '鳳統 （ほうとう）',
			'賈詡 （かく）'           : '賈駆 （かく）',
			'許褚 （きょちょ）'       : '許緒 （きょちょ）',
			'公孫瓚 （こうそんさん）' : '公孫賛 （こうそんさん）',
//			'紀霊 （きれい）'         : '張勲 （ちょうくん）'
		};
		for (i = 0; i < 1; i++) {
			var HimeName =  names[nam[i].innerHTML];
			if (HimeName != null) {   
				nam[i].innerHTML = HimeName;
			}
		}

		// (fake3gokushiやfakename3gokushiをさらにカスタマイズしている人向け)カードNo.指定で差し替え
		var sasikae = {
//			"4025" : {kijutsu : "真名は地和（ちーほう）。張三姉妹の次姉にして、天性のアジテーター。大陸一のカリスマアイドルになるためには手段を選ばない上昇志向の強い女の子。", namae : "張宝（ちょうほう）"},
//			"4052" : {kijutsu : "真名は人和（れんほう）。張三姉妹の末妹で影の実力者。アイドル活動だけでなくマネージングも担当し、金銭管理やスケジュール調整に優れた能力を見せる。", namae : "張梁（ちょうりょう）"},
		};

		var url = location.href;
		var key = 'card_number=';
		var cardno = url.substring(url.lastIndexOf(key) + key.length);

		for (i = 0; i < 1; i++) {
			if (sasikae[cardno] != null) {
				des[i].innerHTML = sasikae[cardno].kijutsu;
				nam[i].innerHTML = sasikae[cardno].namae;
			}
		}
	}

	var modFunc = function () {

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

	// イメージ: 水鏡先生を袁術先生に変更
	var teacher = document.getElementById('teacher');
	if (teacher != null) {
		var random = Math.floor(Math.random() * 6);	// 0～5までの乱数値
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
