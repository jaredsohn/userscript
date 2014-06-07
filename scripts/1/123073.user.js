// ==UserScript==
// @name           fake3594
// @version        3.59.5
// @description    mixi版 ブラウザ三国志の武将イラストをイラストに置き換えるスクリプトです。色々勝手に使ってます。ごめんなさい。さらに使ってます。ごめんなさい。
// @icon           http://lh4.googleusercontent.com/-1Za_1ijAyEs/TpbGSkz3qXI/AAAAAAAABU4/mGdlRLDciHU/s135/icon_fake3gokushi.png
// @include        http://*.3gokushi.jp/*
// @run-at         document-end
// ==/UserScript==
( function(){
//----更新履歴----
// ver3.59.4: 改造版作成

var illust = {
		"1001" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOTjzPNBOI/AAAAAAAAAeI/VUky4-2pRUw/1001_R.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUZsPKcEI/AAAAAAAAAkQ/EoEJ0mfmvhE/mini1001_R.png"},
		"1002" : {big : "http://lh5.ggpht.com/_HPClofEapTw/TW3z5t7d-fI/AAAAAAAAANk/AGdToVzXfwk/rin_sr.png",	small : "http://lh5.ggpht.com/_HPClofEapTw/TW30E6W4TnI/AAAAAAAAAN0/ncDs4377B4A/rin_sr_mini.png"},
		"1003" : {big : "http://lh6.ggpht.com/_HPClofEapTw/TTDQSO1d94I/AAAAAAAAAJg/FIqnrpe2oZY/ririsu-small_sr.png",	small : "http://lh3.ggpht.com/_HPClofEapTw/TTDQSV1hVlI/AAAAAAAAAJo/QWvGrX-u3_k/totyuu2.png"},
		"1004" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TQ4rHOodi7I/AAAAAAAAAUg/G_FOiBcmf7I/rio3.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TQ4rNCjuBFI/AAAAAAAAAUk/owUv3_8N0NM/minirio.png"},
		"1005" : {big : "http://lh3.ggpht.com/_HPClofEapTw/TPky6B6ty0I/AAAAAAAAAFU/kzngiaezkjg/seiba-.png",	small : "http://lh5.ggpht.com/_HPClofEapTw/TPk0Om5FM5I/AAAAAAAAAFk/pmY78FoWlKM/seeiba-mini.png"},
		"1006" : {big : "http://lh4.ggpht.com/-G2K0fPichOc/Tk_By-OxNFI/AAAAAAAABGk/VZ2lusVzgCQ/menma3.png",	small : "http://lh5.ggpht.com/-jOCQDo3kp5o/Tk_CfQ7IrhI/AAAAAAAABHY/tWulODUy8E8/minimennma3.png"},
		"1007" : {big : "http://lh4.ggpht.com/-ZwDhoHqtnEE/Tk-e9Sinc7I/AAAAAAAABFU/9t8Eaw7DkRE/1007.png",small : "http://lh3.ggpht.com/-g4BbPV4GGz0/Tk-e82CEfxI/AAAAAAAABFQ/bDOKFRSZdvA/mini1007.png"},
		"1008" : {big : "http://lh4.ggpht.com/_HPClofEapTw/TW4LFe6sNCI/AAAAAAAAAOo/Gh8kBJ3Qxxc/rin_r.png",	small : "http://lh3.ggpht.com/_HPClofEapTw/TW4K62wxw-I/AAAAAAAAAOY/rSRRX-VA4iE/rin_r_mini.png"},
		"1009" : {big : "http://lh3.ggpht.com/_HPClofEapTw/TW3z-k7HYSI/AAAAAAAAANs/jugwhCwOud8/rin_uc.png",	small : "http://lh3.ggpht.com/_HPClofEapTw/TW30I5Km-vI/AAAAAAAAAN8/7yAQIYOpPX4/rin_uc_mini.png"},
		"1010" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TcP5lfmavDI/AAAAAAAAA9g/J-BlcNPn-xY/ririsu3.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TcP5pllBgrI/AAAAAAAAA9s/tcIrYWTQMQA/miniririsu3.png"},
		"1011" : {big : "http://lh5.ggpht.com/_HPClofEapTw/TTDQSGuo3oI/AAAAAAAAAJc/4Jecmeouh78/ririsu_sr.png",	small : "http://lh6.ggpht.com/_HPClofEapTw/TTDQSVN8trI/AAAAAAAAAJk/jhNX9UgAP3A/totyuu.png"},
		"1012" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TQ4rG48rhLI/AAAAAAAAAUc/Lj1m1gqc5Y4/rio2.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TQ4rNG4Z4SI/AAAAAAAAAUo/4dCz-wHRhqE/minirio1.png"},
		"1013" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TQ4rGwPOFcI/AAAAAAAAAUY/Ag5qqsKjNME/rio1.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TQ4rNHf1yWI/AAAAAAAAAUs/IQS_tb1IFO4/minirio4.png"},
		"1014" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPkTMpR3SeI/AAAAAAAAAGo/n5aCMQXaV6E/renakowa1.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TPl_BwwZ09I/AAAAAAAAAKY/l8YyJ4m09EQ/minirena3.png"},
		"1015" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TT7f1xuy4kI/AAAAAAAAAqw/ioLH5M4nXbQ/sou2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TT7f5wAohjI/AAAAAAAAAq0/V3GRRBM9rdI/minisou1.png"},
		"1016" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOTrp2QYNI/AAAAAAAAAfA/3vrP11RJYEU/1016_R.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUfPg3DvI/AAAAAAAAAlI/mTA_Zn_uf1w/mini1016_R.png"},
		"1017" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPeXiU0CICI/AAAAAAAAACY/w4yJJ1Ae0zI/1017_UC.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TQ8qiLSK6LI/AAAAAAAAAXQ/CioW-lvZdkA/miniika2.png"},
		"1018" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPeXitbR66I/AAAAAAAAACc/H5m92BxNULs/1018_C.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPezPwZUQHI/AAAAAAAAADc/loot9TiHCL4/minika.png"},
		"1019" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TT2QuQb2EbI/AAAAAAAAApI/R8rJxejg4SY/kanariya2.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TT2Q2rHBJQI/AAAAAAAAApc/pGr7_AGgHRc/s120/minikanariya1.png"},
		"1020" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TTxgnmJKWAI/AAAAAAAAAoo/F9Ynd9wyHLI/kanariya1.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TTxg1q4iFOI/AAAAAAAAAow/1_i2WGvAq-A/minikanariya1.png"},
		"1021" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TPkA0-ytULI/AAAAAAAAAF8/K87cIg1gTb0/sinku2.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TPj_BAA3KEI/AAAAAAAAAFY/HXSARnC41Zg/minisinku.png"},
		"1022" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TQ8o4mxvu4I/AAAAAAAAAXA/f1FNwXKE2lQ/arin2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TQ8oyvYE4fI/AAAAAAAAAWw/d7H8sJkJVuw/miniarin2.png"},
		"1023" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TPkKzQDdiNI/AAAAAAAAAGg/a61CkaVoiNU/azunyan.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPj_BeS5D6I/AAAAAAAAAFg/fjtKC86Tnao/miniazunyann3.png"},
		"1024" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TPj_uEpIGqI/AAAAAAAAAFs/hbPGKv5MgkU/azunyan2.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPj_BeS5D6I/AAAAAAAAAFg/fjtKC86Tnao/miniazunyann3.png"},
		"1025" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TRBvLEywZBI/AAAAAAAAAYc/iuwMBTvii7w/tomitake1.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPmAHN81SjI/AAAAAAAAALk/WvinqNB1Xk0/miniabe.png"},
		"1026" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TT2RDgDn37I/AAAAAAAAApo/p1v8BVZzDMY/tomitake1.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPmAHN81SjI/AAAAAAAAALk/WvinqNB1Xk0/miniabe.png"},
		"1027" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TPkKyxuBLLI/AAAAAAAAAGU/CETg1V89pVo/yoko1.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TPkgJ1VDf_I/AAAAAAAAAHM/pB4puWhnEDY/miniyouko2.png"},
		"1028" : {big : "http://lh4.ggpht.com/-Zkr2iHqTJnw/Tgctrnom_bI/AAAAAAAABA8/KZkn9O3gShk/kansui1.png",	small : "http://lh4.ggpht.com/-oMSPMdLV2bE/Tgct01fhdEI/AAAAAAAABBA/iHUPSwy53Oo/minikansui1.png"},
		"1029" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPlNnZWAniI/AAAAAAAAAH4/1AwMsAZHeX4/ui2.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPlNnMx1w8I/AAAAAAAAAH0/kz8fCMBsLOk/miniui2.png"},
		"1030" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TPlNnZ2SvZI/AAAAAAAAAH8/nT_5oMWTKo4/ui1.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TPlNnADaV7I/AAAAAAAAAHw/MhQfJF4oCmk/miniui1.png"},
		"1031" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTtQaU9_I/AAAAAAAAAfM/bEer_ktQ-hc/1031_UC.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUgUSpuxI/AAAAAAAAAlU/goeUvT_rnMs/mini1031_UC.png"},
		"1032" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOTtgYMJJI/AAAAAAAAAfQ/FRRVLnTgP2s/1032_C.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUghWGsKI/AAAAAAAAAlY/IuvDlq4ZzcE/mini1032_C.png"},
		"1033" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TPeXEtsHkKI/AAAAAAAAACM/KPzKz87blFE/1033_UC.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TRBvSgbBNII/AAAAAAAAAYk/o6vUE4HN78M/minihoro2.png"},
		"1034" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TPeXE6l1I-I/AAAAAAAAACQ/KcWCiwnoG7s/1034_C.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TRG4NFC3CVI/AAAAAAAAAao/3NJSkD4bhbo/minihoro3.png"},
		"1035" : {big : "http://lh6.ggpht.com/_HPClofEapTw/TPmiibjHSjI/AAAAAAAAAIw/euutfR_NOm8/eureka_sr2.png",	small : "http://lh5.ggpht.com/_HPClofEapTw/TPmiiZiKw9I/AAAAAAAAAIs/Z7ya6Y82o0g/eureka_sr2.png"},
		"1036" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPeYuYxuXII/AAAAAAAAACk/0biB5fgMcNM/1036_R.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TPkTNs4YRLI/AAAAAAAAAGw/ylpreHcKsWY/minirena1"},
		"1037" : {big : "http://lh5.ggpht.com/-O4Cfe8iAoVQ/Tk-dXMXdbLI/AAAAAAAABFA/ghX-fYaB7kM/1037.png", 	small : "http://lh3.ggpht.com/_HPClofEapTw/TPk1Ri63FFI/AAAAAAAAAF0/ixPv_FlLQ0A/mini.png"},
		"1038" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOTuxMdFrI/AAAAAAAAAfY/DP1C9wHa_bw/1038_R.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUhU5dlJI/AAAAAAAAAlg/d7TMD6EQMeg/mini1038_R.png"},
		"1039" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TT2QunX2SmI/AAAAAAAAApM/D1UO7BXpBzc/suiseiseki1.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TT2Q2g3psXI/AAAAAAAAApk/zQzJKpLiV3E/minisuiseiseki2.png"},
		"1040" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TT2QuqMDf2I/AAAAAAAAApQ/3q_Q-BYVYyA/suiseiseki2.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TT2Q2uczyHI/AAAAAAAAApg/oYK5RAZ8d4U/minisuiseiseki1.png"},
		"1041" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TPovHxwDlWI/AAAAAAAAAMg/S9wOtBTx2XU/wakaran.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TPl_nolk9gI/AAAAAAAAAK4/7QMK26aTqzs/gosurori.png"},
		"1042" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOTwgtvNOI/AAAAAAAAAfk/5BrZIT30sZ8/1042_R.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUinPWvMI/AAAAAAAAAls/4N-ffu3Bemw/mini1042_R.png"},
		"1043" : {big : "http://lh6.ggpht.com/-1HAobhTKEzA/Tk_Bya4Bk4I/AAAAAAAABGk/l23LKJnVGW8/menma1.png",	small : "http://lh5.ggpht.com/-M0MGa2f-Nk8/Tk_B2r7bJcI/AAAAAAAABHA/hQto3SVVCtE/minimenma1.png"},
		"1046" : {big : "http://lh4.ggpht.com/_HPClofEapTw/TPmiOxobQrI/AAAAAAAAAIM/vyA5hEWPzgU/eureka_ur.png",	small : "http://lh5.ggpht.com/_HPClofEapTw/TPmiO8o0tDI/AAAAAAAAAIU/Gj-WfCcNiew/eureka_ur_mini.png"},
		"1047" : {big : "http://lh6.ggpht.com/_HPClofEapTw/TW4LJKFrmoI/AAAAAAAAAOw/xMD1U1bRT-M/rin_ur.png",	small : "http://lh4.ggpht.com/_HPClofEapTw/TW4LAJeZMiI/AAAAAAAAAOg/8kx3hZzSlTY/rin_ur_mini.png"},
		"1048" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TcP5lBGWaQI/AAAAAAAAA9U/G7nZfJqQko8/ririsu2.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TcP5pWCsrrI/AAAAAAAAA9o/9zpbF-mqThs/miniririsu2.png"},
		"1049" : {big : "http://lh6.ggpht.com/_HPClofEapTw/TPlCYAYAMOI/AAAAAAAAAGM/mw88HgfAgu8/seiba-ur.png", 	small : "http://lh4.ggpht.com/_HPClofEapTw/TPlCYLh-j1I/AAAAAAAAAGI/izv3otyKnAo/tamesi.png"},
		"1050" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TPffLHSVIwI/AAAAAAAAAEk/dwfyHTK4KC8/pazetto1.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TPffLBnI28I/AAAAAAAAAEo/JmPvntxdD3I/pazetto2.png"},
		"1051" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOTzmEUYlI/AAAAAAAAAf8/LwDGPF2Oq0A/1051_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUk5_-HgI/AAAAAAAAAmE/nteIqBu6E1A/mini1051_UR.png"},
		"1052" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOT0ZPd5wI/AAAAAAAAAgA/cRk5eGUqWH0/1052_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUldgnLoI/AAAAAAAAAmI/nzKXDcxGW9I/mini1052_SR.png"},
		"1053" : {big : "http://lh3.ggpht.com/_HPClofEapTw/TUdKcgzxvKI/AAAAAAAAAMk/YlYRH7eBcLQ/aneki_r.png",	small : "http://lh6.ggpht.com/_HPClofEapTw/TUdKcpmEHxI/AAAAAAAAAMo/1CkRObpcAlM/aneki_sr_mini.png"},
		"1054" : {big : "http://lh3.ggpht.com/-ccRTVVCODBw/TrFWR1-iFOI/AAAAAAAABJ4/2Q_nKrTSnFE/s315/miosgi02.png",	small : "http://lh4.ggpht.com/-Sq6hx-2UrvM/TrFWWgv4nRI/AAAAAAAABKU/8-DazuV0gMs/s120/minimiosgi02.png"},
		"1055" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TRBu1M_dPFI/AAAAAAAAAXw/56vEVPxgt1g/abe2.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPmAHN81SjI/AAAAAAAAALk/WvinqNB1Xk0/miniabe.png"},
		"1056" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TRB1ufTpXTI/AAAAAAAAAZ8/qIZUq6h32LE/rio5.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TRBvSnL2SBI/AAAAAAAAAYo/22pPJamLVno/miniroi4.png"},
		"1057" : {big : "http://lh5.ggpht.com/_HPClofEapTw/TX6_YurMJ_I/AAAAAAAAAPw/aJUCSDYteKw/ren_sr.png",	small : "http://lh4.ggpht.com/_HPClofEapTw/TX6_ci3DE_I/AAAAAAAAAP0/9wSUrk45uh8/ren_sr_mini.png"},
		"1058" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TQ8o4n9e4-I/AAAAAAAAAW8/qTPT12lcf14/arin1.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TQ8oyvYE4fI/AAAAAAAAAWw/d7H8sJkJVuw/miniarin2.png"},
		"1059" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TT7f1pr-gNI/AAAAAAAAAqs/G3EwsmRZlw8/sou1.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TT7f51zP1tI/AAAAAAAAAq4/H19wpOz12bU/minisou2.png"},
		"1060" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMclNXrDMgI/AAAAAAAAArQ/X_Wm3lC4XBk/1060_R.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMclQKmrAcI/AAAAAAAAArs/qqwEEDWxPto/mini1060_R.png"},
		"1061" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TcP5lFkuCWI/AAAAAAAAA9c/oJDnjvcOSA8/gosulolli2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TcP5pfDV3JI/AAAAAAAAA9k/rMOeWUcUQos/minigosulolli2.png"},
		"1062" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TVfQ_q_QOFI/AAAAAAAAAvc/fyUvpcvWr50/eureka01.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TVfRYd6-jKI/AAAAAAAAAwE/40cAD5Js0y8/minieureka01.png"},
		"1063" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TPfZuRBE4FI/AAAAAAAAAEc/LsGAagYYN0Q/seiba2.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPfZudMukxI/AAAAAAAAAEY/bD_X3_Cf9x8/seiba.png"},
		"1066" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TPTMrqeil9I/AAAAAAAAAuY/zNS7FATf_1Q/1066_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TPTMulgZL2I/AAAAAAAAAuo/wDgYMve-Ln8/mini1066_SR.png"},
		"1067" : {big : "http://lh5.ggpht.com/-iWdIYjpE9w4/TrFWR-3sSAI/AAAAAAAABJ4/j_jyO_ZfLPU/s315/miosgi01.png",	small : "http://lh6.ggpht.com/-QGy4smxpcJY/TrFWWxHVKCI/AAAAAAAABKU/XnUb6M6HpzA/s120/minimiosgi01.png"},
		"1068" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TcP_4UByW2I/AAAAAAAAA98/dKu31ciJsBI/sinku2.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TcQALpiYcgI/AAAAAAAAA-E/G_QIpbl8gqY/minisinku2.png"},
		"1069" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TaxZHpl4aBI/AAAAAAAAA2w/CFwpGFw8XCg/bety1.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TaxZLOs1oNI/AAAAAAAAA24/WQWYtkhZKXc/minibety1.png"},
		"1070" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TarvdiwIgOI/AAAAAAAAA0Y/Dng9P6t4JcU/madoka2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TartuyqAtMI/AAAAAAAAA0I/Dn3mkAPHPcQ/minimadoka1.png"},
		"1071" : {big : "http://lh6.ggpht.com/-jyJkxZx3WTg/Tp5FE6tMo2I/AAAAAAAAATg/KKfyuMIvuh4/s315/atene_sr.png",		small : "http://lh3.ggpht.com/-7uqC0yVXFpA/Tp5FFcKfnaI/AAAAAAAAATo/65VoDzq4kpU/s120/atena_sr_mini.png"},
		"1072" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TcP_4SBJLMI/AAAAAAAAA-A/4a0dNDjK1QM/suiseiseki3.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TcQALkHKlwI/AAAAAAAAA-I/cQRzPwSE1k4/minisuiseiseki3.png"},
		"1073" : {big : "http://lh5.ggpht.com/-oy6ZjUdhZ5U/Tk-szW34CpI/AAAAAAAABF0/mn3k4oYlklU/okasi2.png",	small : "http://lh3.ggpht.com/-VoAUkOJgQSY/Tk-tttPZrZI/AAAAAAAABGM/T4ZwIY-l77U/miniokasi2.png"},
		"1074" : {big : "http://lh4.ggpht.com/-CypcoPJ5bU8/Tk5-B37W1sI/AAAAAAAABDU/4_0a6BBRs58/miku12.png",	small : "http://lh5.ggpht.com/-POJIk2AxYKQ/Tk5-b7a3yrI/AAAAAAAABEA/6CSZdrshyd0/minimiku12.png"},
		"1075" : {big : "http://lh5.ggpht.com/-aCxeKQlsq1o/Tk-sy1TuSKI/AAAAAAAABF0/wTpvYqnNKFQ/okasi1.png",	small : "http://lh5.ggpht.com/-Yg_QrSPJUxw/Tk-ttgSDW9I/AAAAAAAABGM/RkxImUgMOB0/miniokasi1.png"},
		"1076" : {big : "http://lh6.ggpht.com/-m6rRQRD4PEw/Tk5-DABbLJI/AAAAAAAABDU/u6m2j2ouYMU/siesta410.png",	small : "http://lh4.ggpht.com/-ft-FJZsLtiM/Tk5-cEKVQqI/AAAAAAAABEA/kGP0QfHthPY/minisiesta410.png"},
		"1078" : {big : "http://lh4.ggpht.com/-WyqrWTLFpVo/Tk_ByS9vG5I/AAAAAAAABGk/WfW3hVcJ7g4/menma2.png",	small : "http://lh3.ggpht.com/-DTuhJ09bMbw/Tk_B2Al3THI/AAAAAAAABHA/vveEI4iV1_Y/minimenma2.png"},
		"1079" : {big : "http://lh4.ggpht.com/-MV8a_CZb590/TlJVrGMNanI/AAAAAAAABH4/A7IhTVTBx70/ririsu5.png",	small : "http://lh6.ggpht.com/-_zE63dV6YVI/TlJVtp0Bo7I/AAAAAAAABIU/x0rdiPC7xDM/miniririsu5.png"},
		"1080" : {big : "http://lh4.ggpht.com/-_10MJygpLrg/Tk5-CF0R2_I/AAAAAAAABDU/ZX8W1ZkbHIQ/miku14.png",	small : "http://lh6.ggpht.com/-vBGryoAyh24/Tk5-buRlC7I/AAAAAAAABEA/GEEUx28S1fU/minimiku14.png"},
		"1081" : {big : "http://lh5.ggpht.com/-U_0pq5Zwlxs/Tk5-DyWf6hI/AAAAAAAABDU/eDx_KDmtnrE/tori1.png",	small : "http://lh6.ggpht.com/-KUAtN8zF38Y/Tk5-cHzXHZI/AAAAAAAABEA/fwLxzCPj2Yk/minitori1.png"},
		"1082" : {big : "http://lh6.ggpht.com/-BflooXGTdg0/Tc7DHu31WtI/AAAAAAAAA-w/Nxvd2Pg8NCA/hige1.png",	small : "http://lh4.ggpht.com/-F1cFOw662xs/Tc7B-OCJSrI/AAAAAAAAA-g/WFreBgjTHXA/minihige1.png"},
		"1083" : {big : "http://lh6.ggpht.com/-3X2a7vCJLM0/TosdCqEE6VI/AAAAAAAAASA/YuFeUISIb84/s315/rin_ur2.png",	small : "http://lh4.ggpht.com/-Tz4AGdgEtJI/Tosc6MmMZsI/AAAAAAAAAR8/EH3K4BCpj58/s120/rin_ur2_mini.png"},
		"1084" : {big : "http://lh3.ggpht.com/-qOrLiTLqmxw/TxFsG2nimrI/AAAAAAAABMc/kw-DqgDIqC4/s315/hatunemiku8.png",	small : "http://lh5.ggpht.com/-BB2Ly2q8cXU/TxFr_l7FaYI/AAAAAAAABLo/MKQdG5j9SDA/s120/minihatunemiku8.png"},
		"1085" : {big : "http://lh4.ggpht.com/-79rxaQeaWJ4/TxFsHtPkVxI/AAAAAAAABMo/0vjbjzQWMEY/s315/mikuabura1.png",	small : "http://lh5.ggpht.com/-oM4FYnnRJwY/TxFr-3DwjDI/AAAAAAAABLg/eGX-oHXUd9M/s120/minimikuabura1.png"},
		"1087" : {big : "http://lh5.ggpht.com/-lI1KmdMp1TE/TxA9mQvXOOI/AAAAAAAABK0/fym9Oxh0GPE/s315/tellmiku1.png",	small : "http://lh4.ggpht.com/-pwR5VXMNp9w/TxA9rd0aTNI/AAAAAAAABLI/o_b7heXYDdM/s120/minitellmiku1.png"},
		"1090" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TcP5lfmavDI/AAAAAAAAA9g/J-BlcNPn-xY/ririsu3.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TcP5pllBgrI/AAAAAAAAA9s/tcIrYWTQMQA/miniririsu3.png"},
		"1091" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TQ4rG48rhLI/AAAAAAAAAUc/Lj1m1gqc5Y4/rio2.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TQ4rNG4Z4SI/AAAAAAAAAUo/4dCz-wHRhqE/minirio1.png"},
		"1093" : {big : "http://lh4.ggpht.com/-8na-lhQto5s/TxFsGydvs8I/AAAAAAAABMg/ooRymKeN8OY/s315/hatunemiku7.png",	small : "http://lh6.ggpht.com/-Cv96P4v1bMo/TxFsBswqbvI/AAAAAAAABL4/JCZ5WIje5lE/s120/minihatunemiku7.png"},
		"2001" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TasTOkt-0BI/AAAAAAAAA1Y/HTW72hcGzZ4/anemone_sr.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TasTSGvtSaI/AAAAAAAAA1c/k4ISsjOvXCY/minianemone_sr.png"},
		"2002" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPlfxFGxNyI/AAAAAAAAAIk/kw0zexfi_t0/nadeko2.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TPl_dLKTCJI/AAAAAAAAAKo/FRpCuWNRqvg/mininadeko2.png"},
		"2003" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT2nAuPJI/AAAAAAAAAgQ/BHxDBk7_PRI/2003_R.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUm9CVPnI/AAAAAAAAAmY/wNNEzgPQN0c/mini2003_R.png"},
		"2004" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOT3MuFcHI/AAAAAAAAAgU/9andcUo_Fug/2004_R.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUnSnr2DI/AAAAAAAAAmc/-CFW_Sh3jDk/mini2004_R.png"},
		"2005" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/Ta7Q0Iv1F6I/AAAAAAAAA5A/LorWEvDvyAc/siki02.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/Ta7Q3qOOEcI/AAAAAAAAA5I/GYEHtWyN_Hg/minisiki02.png"},
		"2006" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TQ4rG9HDw1I/AAAAAAAAAUU/blCN3tTvJq4/kennsinn3.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPl_nlnfTOI/AAAAAAAAAK8/kBs3xgFrhlI/daredakore2.png"},
		"2007" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT4Y531RI/AAAAAAAAAgc/LkXCCJL5P9w/2007_R.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUoWHegRI/AAAAAAAAAmk/u5RraMejyko/mini2007_R.png"},
		"2008" : {big : "http://lh4.ggpht.com/_HPClofEapTw/TTOM6e0jNrI/AAAAAAAAAK0/kUE0pIqqfY0/anemone_r.png",	small : "http://lh6.ggpht.com/_HPClofEapTw/TTOimRNlUpI/AAAAAAAAALg/8unbbaZ-yRM/anemone_uc_mini.png"},
		"2009" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT5Xq38AI/AAAAAAAAAgk/158hAqL6SZ0/2009_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUpQy-fzI/AAAAAAAAAms/O5R5g_l_i34/mini2009_UC.png"},
		"2010" : {big : "http://lh4.ggpht.com/-lqy-cSutjRc/Tk-dWL1wbCI/AAAAAAAABEs/8Gh_TMB7GUM/2010.png",	small : "http://lh3.ggpht.com/-1JqhJwoAm0g/Tk-dW90I0DI/AAAAAAAABE8/yl-T80vDGWY/mini2010.png"},
		"2011" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TVfQ_iy0c9I/AAAAAAAAAvY/X3AIP3NZRCE/archar1.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TVfRYVIIWYI/AAAAAAAAAwA/H2djDElTxak/miniarchar1.png"},
		"2012" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPeYuayixxI/AAAAAAAAACo/Zta4Z489FyM/2052_UC.png",	small : "http://lh4.ggpht.com/_HPClofEapTw/TPg7nATPlSI/AAAAAAAAACE/vgDobUvkT8A/horo.png"},
		"2013" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT7kK2vLI/AAAAAAAAAg0/mrc7lCCEGY0/2013_R.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUqrh59rI/AAAAAAAAAm8/dqNv1iLuyog/mini2013_R.png"},
		"2014" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TQDX5eYu3dI/AAAAAAAAARs/2xkRLGEBb28/amenonaka.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TQDoZwBR_JI/AAAAAAAAATk/KMhFCcGiE-A/miniamenonaka.png"},
		"2015" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TPfhYMVUYQI/AAAAAAAAAEw/J--OP4ouhqE/pazetto3.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPfhYLJbXOI/AAAAAAAAAE0/SrhXueJtb5c/pazetto4.png"},
		"2016" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TPki4LkwKXI/AAAAAAAAAHY/NmZitI-KFcU/kirinjisann.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TPl_dUYLxeI/AAAAAAAAAK0/O3nppk8_SXI/minikirinjisann.png"},
		"2017" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TUQb_Qj252I/AAAAAAAAAsQ/fXP_wxnPr4k/brs2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TUQcOg1nDCI/AAAAAAAAAsw/s6S3Ws31S8E/minibrs1.png"},
		"2018" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TUQb_ahW-5I/AAAAAAAAAsM/qd9M9Lb7FWw/brs1.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TUQcOlOz5_I/AAAAAAAAAs0/uK0_x-Kh0zI/minibrs2.png"},
		"2019" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TPftWXExAzI/AAAAAAAAAFM/hGKU-rvKQSU/DAREDAKORE.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TQDO30Y4BaI/AAAAAAAAAQs/HxFrQZ1rLVE/minikensin.png"},
		"2020" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TRBvLYRn1lI/AAAAAAAAAYg/ZJ3kfb16W1k/zennsen1.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TRG4rQPEPBI/AAAAAAAAAcA/ks04jWl7yhU/miniyuippe3.png"},
		"2021" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TRG41gY1wMI/AAAAAAAAAcU/6DSq8i0zI70/yurippe3.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TRG4rq0vvKI/AAAAAAAAAcE/atY4WFpi4SI/miniyurippe1.png"},
		"2022" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TPo29fYe54I/AAAAAAAAAOE/dYNx3LQIU1I/sinobu2.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TPl_oO9hs5I/AAAAAAAAALI/GLg-IewZlqg/minisinobu.png"},
		"2023" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TPl54ovs_AI/AAAAAAAAAJ4/sVLtcByTVbY/sinobu2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TPovtDpbhbI/AAAAAAAAANI/unwurJ4xGtM/minisinobu4.png"},
		"2024" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TRRP6dd1kBI/AAAAAAAAAg8/ZvMsBBrGYU4/humohhu2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TRRPqaJ40xI/AAAAAAAAAgI/Vk7bS3zA9qQ/minihumohhu2.png"},
		"2025" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TRRP6An83EI/AAAAAAAAAg4/DvhAuqrWoHQ/humohhu1.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TRRPfsCWXJI/AAAAAAAAAgE/20GEdS3aBMk/minihumohhu1.png"},
		"2026" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TRBvGE6Q0yI/AAAAAAAAAYE/JLjqVEII7_I/sakuya2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TRG4cGTAElI/AAAAAAAAAbU/qn-DqRZk74k/minisakuya1.png"},
		"2027" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TPj_uTKs6II/AAAAAAAAAFw/O5CfW__8JBk/akiha.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TRPNxrwozsI/AAAAAAAAAfI/oJAjtAgc9fI/miniageha1.png"},
		"2028" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TQ8o4uKHiiI/AAAAAAAAAXE/E2osihHnF6k/JK1.png",		small : "http://lh3.ggpht.com/_b0a214_YjEE/TQ8oyuuVRtI/AAAAAAAAAW0/LqOTUXNGrfc/minijk1.png"},
		"2029" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TVfRfbI6JeI/AAAAAAAAAwY/-nj6z66n7yE/yotuba1.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TVfRrgjaD_I/AAAAAAAAAw4/R0sb89XeKpw/miniyotuba2.png"},
		"2030" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TVfRfR1kRtI/AAAAAAAAAwc/1a2ZW-IJs0I/yotuba2.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TVfRrVmb89I/AAAAAAAAAw0/j1M8c_Z1BK4/miniyotuba1.png"},
		"2031" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TRBvGBiRr5I/AAAAAAAAAYI/sZzNtV-k5b4/satoko1.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TRBvTIFQW1I/AAAAAAAAAY0/Mwt4bHe_9dY/minisatoko2.png"},
		"2032" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TRBvGZEHbBI/AAAAAAAAAYQ/n66XT_5Nv6M/satoko3.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TRBvSzltGXI/AAAAAAAAAYw/P_3mbwasysw/minisatoko1.png"},
		"2033" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TRG4XeKX0PI/AAAAAAAAAbE/HCS6_snpoiI/mion4.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TRG4NYdPYFI/AAAAAAAAAaw/8liDEwKMkHU/minimion3.png"},
		"2034" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TRG4XKcSyQI/AAAAAAAAAa8/MFCi3ULsrcU/mion2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TRG4NYdPYFI/AAAAAAAAAaw/8liDEwKMkHU/minimion3.png"},
		"2035" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TUGKxANtWmI/AAAAAAAAArk/aOPN54Psoj0/suigintou1.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TUGK06yo58I/AAAAAAAAArs/SZBsru1JQ5w/minisuigintou1.png"},
		"2036" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TUGKxBa_pSI/AAAAAAAAAro/syTI4lsGiWU/suigintou2.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TUGK1ByaVPI/AAAAAAAAArw/Jkf2O9Sgs3A/minisuigintou2.png"},
		"2037" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TRG4kj53uzI/AAAAAAAAAbk/NHVERTKuUkA/rikako3.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TRG4NSVXFII/AAAAAAAAAa0/z3bDWHIwfBg/minirikako1.png"},
		"2038" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TRG4kX_2hAI/AAAAAAAAAbg/k86ohXPhTcE/rikako2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TRG4b-YVDeI/AAAAAAAAAbM/BsMyCaAdRyM/minirikako2.png"},
		"2039" : {big : "http://lh5.ggpht.com/_HPClofEapTw/TTOimGphUoI/AAAAAAAAALc/6zggUbN6Pzw/anemone_r.png",	small : "http://lh4.ggpht.com/_HPClofEapTw/TTOimYm3MAI/AAAAAAAAALk/s5pvgsucwPw/anemone_r_mini.png"},
		"2040" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOT-z_rl_I/AAAAAAAAAhM/5Bynmocie9A/2040_R.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUs00ameI/AAAAAAAAAnU/ha2mWWgdDPo/mini2040_R.png"},
		"2041" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOT_YdDjDI/AAAAAAAAAhQ/c9d9LWPmM2E/2041_UC.png",small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUtddSUBI/AAAAAAAAAnY/HiRLs-nC288/mini2041_UC.png"},
		"2042" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUADKHm7I/AAAAAAAAAhU/-kPbv6KIi0k/2042_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUtpBa67I/AAAAAAAAAnc/bWIDzS4lmQA/mini2042_SR.png"},
		"2043" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUAg3SXII/AAAAAAAAAhY/xziFNFnuKcQ/2043_R.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUtz1XQtI/AAAAAAAAAng/8T_Zl-csUdE/mini2043_R.png"},
		"2044" : {big : "http://lh6.ggpht.com/-8VWszswrba4/Tk-dWzmfLEI/AAAAAAAABE4/43HyfSrfXVc/2044.png",	small : "http://lh3.ggpht.com/-k3CGH8WZ3gY/Tk-dWhIhpgI/AAAAAAAABEw/vGgrGDkSJHY/mini2044.png"},
		"2045" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TRG4k8TLNxI/AAAAAAAAAbs/pGaNFhR3VxM/sion1.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TRBviLuADhI/AAAAAAAAAY8/OdQjZvBctI4/minision1.png"},
		"2046" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TRBvGsI1uGI/AAAAAAAAAYU/-Xnpoe8zXLA/sion2.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TRG4cZgKBEI/AAAAAAAAAbc/UFi06E7elb4/minision2.png"},
		"2047" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TPlfw2BP7sI/AAAAAAAAAIg/TUQb6c9b4_Y/nadeko1.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TPmGNhrBH7I/AAAAAAAAAMY/OiGFahthkpk/mininadeko3.png"},
		"2048" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TT2QuWWdsDI/AAAAAAAAApA/vzQB2M_7i4A/bara1.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TT2Q2p9c8WI/AAAAAAAAApY/owwjecOxEkY/minibara2.png"},
		"2049" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TRRP6glcPqI/AAAAAAAAAhA/33v-3V4OTWI/miku2.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TRG4NLfvWYI/AAAAAAAAAas/4Fb7ToWaYwI/minimiku1.png"},
		"2050" : {big : "http://lh6.ggpht.com/-ot8eKfU5d5Y/Tk-dW_fre5I/AAAAAAAABE0/-F0503MIIVo/2050.png", small : "http://lh4.ggpht.com/_b0a214_YjEE/TPovtLQpAvI/AAAAAAAAANE/_DPA93sGM2w/minimiku1.png"},
		"2051" : {big : "http://lh3.ggpht.com/_HPClofEapTw/TTOM6tPBF9I/AAAAAAAAAK8/36mEHL1PWk0/anemone_ur.png",	small : "http://lh6.ggpht.com/_HPClofEapTw/TTOM1CFmubI/AAAAAAAAAKo/CsIE-_SO6sA/anemone_ur_mini.png"},
		"2052" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/Ta7Q0Ha36SI/AAAAAAAAA48/U8OOybEFVFo/siki04.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/Ta7Q3yKsW6I/AAAAAAAAA5Q/8rcw2bFGmHc/minisiki04.png"},
		"2056" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TQDXuJSSxhI/AAAAAAAAARM/_hNDq-OUgFs/sakuya1.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TRG4cGjJvQI/AAAAAAAAAbY/7DAuNV_g9A0/minisakuya2.png"},
		"2057" : {big : "http://lh3.ggpht.com/_HPClofEapTw/TPmLKwXmJ2I/AAAAAAAAAHc/1gCpx1RT8ig/bazetto_r.png",small : "http://lh6.ggpht.com/_HPClofEapTw/TPmLK3jxNoI/AAAAAAAAAHg/UbI6R3Mr-Kk/bg_card_rmini.png"},
		"2058" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUDzN_u0I/AAAAAAAAAhw/WBMTVPcbT6w/2058_UR.png",small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUwMBPK4I/AAAAAAAAAn4/1dnFtQvaadY/mini2058_UR.png"},
		"2059" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TQC_db79Y9I/AAAAAAAAAQM/EfMbClvOIqY/kensin.png",small : "http://lh6.ggpht.com/_b0a214_YjEE/TQ5H-mJpmBI/AAAAAAAAAV0/UxUTHrkiv_U/minikennsin2.png"},
		"2060" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUEUoTQhI/AAAAAAAAAh0/Nx94dnJ3AxI/2060_UR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUwmn1WkI/AAAAAAAAAn8/Zr3x0TOpNNE/mini2060_UR.png"},
		"2061" : {big : "http://lh4.ggpht.com/-2zQv_SHTzCo/TlJ1KnjPuKI/AAAAAAAABIw/UJX0ZqJ1E9Y/madoka1.png",	small : "http://lh3.ggpht.com/-1AsLeEA5018/TlJ1OZifzNI/AAAAAAAABJI/6Evtvrvxo10/minimadoka1.png"},
		"2062" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMfJ2_rxPqI/AAAAAAAAAsI/SFTgXjGlbYo/2062_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMfJ3rB4lPI/AAAAAAAAAsM/_1Z5bjlIrm0/mini2062_SR.png"},
		"2063" : {big : "http://lh6.ggpht.com/_HPClofEapTw/TPmGuA-Am3I/AAAAAAAAAHI/phPdPgylgDE/a-tya-_ur.png",	small : "http://lh6.ggpht.com/_HPClofEapTw/TPmGud47AdI/AAAAAAAAAHM/55Ng-9S05A0/a-tya-_ur.png"},
		"2064" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMclOIUhKhI/AAAAAAAAArY/nh6ljVEYgYU/2064_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMclQi1chCI/AAAAAAAAAr0/TpoTLKXmXkc/mini2064_SR.png"},
		"2065" : {big : "http://lh3.ggpht.com/-HfPxDEIOyRw/TlJ1KPNIfyI/AAAAAAAABIw/52pMwtv31-4/homura1.png",	small : "http://lh4.ggpht.com/-bWBahAGkt18/TlJ1N7Iuu4I/AAAAAAAABJI/xIjE0mSPAvE/minihomura1.png"},
		"2067" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/Ta7QzwQTXSI/AAAAAAAAA40/nTPtr95AVQw/siki01.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/Ta7Q362QQ1I/AAAAAAAAA5M/zKvTPPnY4UQ/minisiki01.png"},
		"2068" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TPTMtuxkAoI/AAAAAAAAAug/PAgEz3n4JN0/2068_R.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TPTMvLEjUzI/AAAAAAAAAuw/IEcW3eXmVMo/mini2068_R.png"},
		"2070" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TVfRAGCLoiI/AAAAAAAAAvo/a28wvw-o-NU/haruna1.png",		small : "http://lh3.ggpht.com/_b0a214_YjEE/TVfRYwPgYjI/AAAAAAAAAwQ/afhfBGEnO6M/miniharuna1.png"},
		"2072" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TT7JZoler9I/AAAAAAAAAqg/F8sITzw13Y4/bara3.png",		small : "http://lh6.ggpht.com/_b0a214_YjEE/TT2Q2g9mZzI/AAAAAAAAApU/8Rudnsq9hoc/minibara1.png"},
		"2073" : {big : "http://lh6.ggpht.com/-owGvOZCNy6A/TlJ1KSwqYzI/AAAAAAAABIw/i_s4bC7d96Q/sayaka1.png",		small : "http://lh4.ggpht.com/-xfaCTdJNgOU/TlJ1NRpkr4I/AAAAAAAABJI/XAe4UYB-CuI/minisayaka1.png"},
		"2076" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TPevUi9OoMI/AAAAAAAAADQ/6VEZVe0F-Mo/UCharuhi.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TPmAHRXivhI/AAAAAAAAALo/ZXXPC4xpaYY/miniharuhi1toumei.png"},
		"2077" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/Ta7Qz3sjRZI/AAAAAAAAA44/3gZeUz7QYfU/siki03.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/Ta7Q3hJrg0I/AAAAAAAAA5E/R5SXKO8vOpU/minisiki03.png"},
		"2095" : {big : "http://lh4.ggpht.com/-T4dE9QouBw0/TxFsG6XDifI/AAAAAAAABMk/4mBl3JvLueM/s315/unzenane1.png",		small : "http://lh4.ggpht.com/-BWEPP4gALV0/TxFsAa_ZcyI/AAAAAAAABL0/0ejOgcLuu0M/s120/miniunzenane1.png"},
		"3001" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUE8XBbCI/AAAAAAAAAh4/T2S2RryZeyM/3001_R.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUxFpHtXI/AAAAAAAAAoA/JyVGuBNDGTw/mini3001_R.png"},
		"3002" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUFTN6BfI/AAAAAAAAAh8/_kBwD-M37II/3002_SR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUxRs0CDI/AAAAAAAAAoE/CK8SjMl10I8/mini3002_SR.png"},
		"3003" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUF4jNx3I/AAAAAAAAAiA/GHpS4yOCJTc/3003_SR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUxgrtLLI/AAAAAAAAAoI/mjmKI1A9ysU/mini3003_SR.png"},
		"3004" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUGpyhbJI/AAAAAAAAAiI/pwh8m-n6xk8/3004_SR.png",	small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUyHMsUkI/AAAAAAAAAoM/GDocWTbUO1s/mini3004_SR.png"},
		"3005" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUHKnmmPI/AAAAAAAAAiM/HyFoOKGjVXs/3005_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUyQp9thI/AAAAAAAAAoQ/WGpLkEnCUTA/mini3005_R.png"},
		"3006" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUHhLRrAI/AAAAAAAAAiQ/_87_K2ekffs/3006_SR.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUy5TkMCI/AAAAAAAAAoU/gWHjhTRA3Xc/mini3006_SR.png"},
		"3007" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TasBHFRKvOI/AAAAAAAAA00/9IQ02RT0R4s/siro2.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TasBLRz8kUI/AAAAAAAAA08/DNiArIzJ3_0/minisiro02.png"},
		"3008" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUI-PUYpI/AAAAAAAAAiY/fwjxIkiT4sY/3008_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUzXjSFKI/AAAAAAAAAoc/eN12DsTZsRA/mini3008_UC.png"},
		"3009" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUJd_COlI/AAAAAAAAAic/_DwWJjfSXFM/3009_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUz6kshkI/AAAAAAAAAok/bpf45fRytaQ/mini3009_UC.png"},
		"3010" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUKHLewMI/AAAAAAAAAig/SMLVns-S_M8/3010_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU0I--MXI/AAAAAAAAAoo/MRnKwxr5bE4/mini3010_R.png"},
		"3011" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TRJsdH1XYRI/AAAAAAAAAd8/HP-fbIjCPGA/taiga1.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TRG4rXcgn8I/AAAAAAAAAb4/4Z_ZWhttK7E/minitaiga2.png"},
		"3012" : {big : "http://lh4.ggpht.com/-u558eptu9rY/To1ijhMQIAI/AAAAAAAAASU/OYAYoIeX1YE/s315/rizumu_c.png",		small : "http://lh6.ggpht.com/-OnvQhNcF4D4/To1ikpU-tYI/AAAAAAAAASY/PzSQQpDkXUo/s120/rizumu_c_mini.png"},
		"3013" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUKTw0TXI/AAAAAAAAAik/ar7bs7onxZA/3013_UC.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU0gQoHbI/AAAAAAAAAos/qkbbgWV241I/mini3013_UC.png"},
		"3014" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TRG4kh4Ef0I/AAAAAAAAAbo/-Na73sLPlOc/satoko4.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TRBvh4spkpI/AAAAAAAAAY4/3aUDlrgBSR8/minisatoko3.png"},
		"3015" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TVfQ_2PH2qI/AAAAAAAAAvg/3RtEgp5ygfA/hankok1.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TVfRYtSauqI/AAAAAAAAAwM/qRdDyyBokCc/minihankoku1.png"},
		"3016" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TVfQ_2iDhYI/AAAAAAAAAvk/dOtMu8qulKg/hankok2.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TVfRYpJjmbI/AAAAAAAAAwI/2v0rRxZN8w0/minihankok2.png"},
		"3017" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TRRPvdGBgKI/AAAAAAAAAgc/0yFSWUPxA4k/cc1.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TRRPfclREBI/AAAAAAAAAf4/NPlD7oSonEU/minicc2.png"},
		"3018" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TRRPvUn1qPI/AAAAAAAAAgg/u3HQ6kov5nM/cc2.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TRRPfcA0EBI/AAAAAAAAAf8/BpGtbPbGLs4/minicc3.png"},
		"3019" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPkKzMTNvrI/AAAAAAAAAGc/Ix3GFvk-GxE/konatatoumei.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TRRcyBWV1xI/AAAAAAAAAj8/zHOu2fOmfeA/minikonata2.png"},
		"3020" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TRRc1dZG2ZI/AAAAAAAAAkA/zZdO1b_-O20/konata2.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TRRcxza_UFI/AAAAAAAAAj4/Kwh6nqSPRFU/minikonata1.png"},
		"3021" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TRG41YHxsxI/AAAAAAAAAcM/GXnwhkwYvJU/taiga2.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TRG4rQ8Yd0I/AAAAAAAAAb8/BPvLaOJb6Z8/minitaiga3.png"},
		"3022" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TRG41nAJpcI/AAAAAAAAAcQ/ka67Uot1aMM/taiga3.png",	small : "http://lh6.ggpht.com/_b0a214_YjEE/TRReGj_zNyI/AAAAAAAAAkY/2YsNZlQyl7U/minitaiga4.png"},
		"3023" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TUQcHahV1iI/AAAAAAAAAso/wT_bQipGle0/tatikoma2.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TUQcXADI68I/AAAAAAAAAtM/WLpdJmiASL0/minitatikoma2.png"},
		"3024" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TUQcHR5a-bI/AAAAAAAAAsk/D3DUhcm8-Dg/tatikoma1.png",	small : "http://lh3.ggpht.com/_b0a214_YjEE/TUQcXJSmekI/AAAAAAAAAtI/KHjPriQoBBs/minitatikoma1.png"},
		"3025" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TQC_d7TxUcI/AAAAAAAAAQY/gs8EBJ9gctY/hitagi3.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TQC_S7dp_tI/AAAAAAAAAQA/OwVYH2n4ZwM/minihitagi1.png"},
		"3026" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TQC_jRbuyAI/AAAAAAAAAQg/P2DAuvjK1Oc/hitagi2.png",		small : "http://lh6.ggpht.com/_b0a214_YjEE/TQC_S3Sq3dI/AAAAAAAAAQE/kuoWAst16ME/minihitagi.png"},
		"3027" : {big : "http://lh5.ggpht.com/-0jUxFDKVBhw/Tk5-DYalHQI/AAAAAAAABDU/NgFYOQ7jJWg/sheriru2.png",	small : "http://lh6.ggpht.com/-9Un3bJj0HBU/Tk5-b2oIFBI/AAAAAAAABEA/R1XAsJYAO-0/minisheriru2.png"},
		"3028" : {big : "http://lh5.ggpht.com/-MYReq4LitE4/Tk5-DHYmfdI/AAAAAAAABDU/gx6RPaF9CxI/sheriru1.png",	small : "http://lh6.ggpht.com/-vUs5-64_YlU/Tk5_ifzmWvI/AAAAAAAABEY/vLU5JaFNchQ/minisheriru1.png"},
		"3029" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TRRQJgpXO0I/AAAAAAAAAhY/YHgPgiDFs6w/tessa3.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TRRPzRWOBdI/AAAAAAAAAgw/OIq4eN5UorI/minitessa2.png"},
		"3030" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TRRQJTUBfVI/AAAAAAAAAhQ/3Gp5m6RE0AU/tessa1.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TRRPqyIc7JI/AAAAAAAAAgY/k3OC00Ved2k/minitessa1.png"},
		"3033" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TVfRPZxdj0I/AAAAAAAAAvw/BAagI0Y-oPg/kuroneko2.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TVfRmlPq7KI/AAAAAAAAAwk/HkFKdzxBHbY/minikuroneko2.png"},
		"3034" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TQ5IHOrgYSI/AAAAAAAAAWA/jGRiKbtReVE/kirino3.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TQ5H-rsAddI/AAAAAAAAAVs/of8EuE6hASg/minikirino2.png"},
		"3035" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TQ5IHfdFzoI/AAAAAAAAAWE/RKAcDevjo7w/kirino2.png",		small : "http://lh3.ggpht.com/_b0a214_YjEE/TQ5H-r1iDsI/AAAAAAAAAVw/ARjvuxmA1ok/minikirino.png"},
		"3036" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TcAnr19GfXI/AAAAAAAAA7o/Rvr4pzom0zc/simuka3.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TcACSyaxy2I/AAAAAAAAA68/q9QPhE0ZS_o/minisimuka3.png"},
		"3037" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUK0iKPxI/AAAAAAAAAio/XHlWKwcpPT4/3037_R.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU1JhNQRI/AAAAAAAAAow/rG8tE91YbqE/mini3037_R.png"},
		"3038" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TUQb_pe2cVI/AAAAAAAAAsU/NkGkRoZmE5g/deadm1.png",	small : "http://lh4.ggpht.com/_b0a214_YjEE/TUQcOviB10I/AAAAAAAAAs4/IVm19TEXIzk/minideadm1.png"},
		"3039" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TUQb_uI2WtI/AAAAAAAAAsY/ZMEH9323zYI/deadm2.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TUQcOnc209I/AAAAAAAAAs8/feqAByMXzCY/minideadm2.png"},
		"3040" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUMmuuX_I/AAAAAAAAAi0/f5LNr9Ariu0/3040_SR.png",	small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU1xFvjlI/AAAAAAAAAo8/59xtscohVzg/mini3040_SR.png"},
		"3041" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUNNVsfNI/AAAAAAAAAi4/9txKnxGWVww/3041_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU2fLpLEI/AAAAAAAAApA/mSjeqEnRTZE/mini3041_R.png"},
		"3042" : {big : "http://lh3.ggpht.com/_HPClofEapTw/TPl9Epv3VEI/AAAAAAAAAGg/akEplBckEAo/rannsa-_r.png",		small : "http://lh5.ggpht.com/_HPClofEapTw/TPl9FoVZ_TI/AAAAAAAAAGk/vxzKx_CHRps/rannsa-.png"},
		"3043" : {big : "http://lh5.ggpht.com/_HPClofEapTw/TPkwBLCnsNI/AAAAAAAAAFE/qKAE5S1GEfc/rancer.png",	small : "http://lh4.ggpht.com/_HPClofEapTw/TPkwBPimdzI/AAAAAAAAAFI/OYx9-6nnlfI/rannsa-_uc.png"},
		"3044" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TVfRPCVHrYI/AAAAAAAAAvs/ujeYmog9EhI/kuroneko1.png",	small : "http://lh5.ggpht.com/_b0a214_YjEE/TVfRmpr78MI/AAAAAAAAAwg/-ZtK8A1nXLw/minikuroneko1.png"},
		"3045" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUPedOOLI/AAAAAAAAAjE/EUHsCSjvDq4/3045_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU3SagEjI/AAAAAAAAApM/AE1foRBnRQs/mini3045_UR.png"},
		"3046" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUP1m0hXI/AAAAAAAAAjI/2W__LjCsmMQ/3046_UR.png",	small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU3__uZiI/AAAAAAAAApQ/-RbT0aP40b4/mini3046_UR.png"},
		"3047" : {big : "http://lh3.ggpht.com/-aiCMRsTk9eY/To1_V8YOL7I/AAAAAAAAASo/AC1xzORs0qA/s315/kumagawa_ur.png",	small : "http://lh3.ggpht.com/-24L4uUjfbT0/To1_YJyty3I/AAAAAAAAASs/UPTYbCAfVBg/s120/kumagawa_ur_mini.png"},
		"3048" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TcAhVbAykqI/AAAAAAAAA7Q/lbwrFGydLqg/simuka5.png",		small : "http://lh3.ggpht.com/_b0a214_YjEE/TcAhQVWhtrI/AAAAAAAAA7I/9fApaYwBCT8/minisimuka5.png"},
		"3049" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUQoZ9_BI/AAAAAAAAAjM/TCW49xfIhFI/3049_UC.png",	small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOU4DefQaI/AAAAAAAAApU/ki2KGE6P6qw/mini3049_UC.png"},
		"3050" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TQC_dgqPTII/AAAAAAAAAQU/rt6kyZwGhic/hitagiclub1.png",		small : "http://lh3.ggpht.com/_b0a214_YjEE/TQC_Sm5wtQI/AAAAAAAAAP8/S829y7pOT24/minihitagi2.png"},
		"3051" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMO7tOarDJI/AAAAAAAAAqw/6EEX5twV9WY/3051_R.png",		small : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMO7uzlkjxI/AAAAAAAAArA/ohAxTztAKog/mini3051_R.png"},
		"3052" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOURLLbAmI/AAAAAAAAAjQ/rCRS8YqS8jI/3052_UC.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU4sXrtrI/AAAAAAAAApY/Z4L62QotKAg/mini3052_UC.png"},
		"3053" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TasBHAzL7lI/AAAAAAAAA0w/wOZf0MSAc_A/siro3.png",		small : "http://lh6.ggpht.com/_b0a214_YjEE/TasBLQ6RD-I/AAAAAAAAA04/KsTTJ3JImaE/minisiro03.png"},
		"3054" : {big : "http://lh3.ggpht.com/_HPClofEapTw/TPmEHbnoi1I/AAAAAAAAAG4/FT-fPctJBzY/rannsa-_sr.png",		small : "http://lh5.ggpht.com/_HPClofEapTw/TPmEHFBbwXI/AAAAAAAAAG0/xXpjT29JQ9k/rannsa-mini.png"},
		"3059" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TcAhVQNNSwI/AAAAAAAAA7U/Wquzu4yq2JQ/simuka4.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TcAhQm5RS3I/AAAAAAAAA7M/ljaaylsqeEk/minisimuka4.png"},
		"3062" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TardIqcfaDI/AAAAAAAAAzU/RwGQZ69iJhU/siro1.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TarfqTtBkTI/AAAAAAAAAzg/H6_yJDUnvfM/minisiro1.png"},
		"4001" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOURs2A_-I/AAAAAAAAAjU/HjxiQ5uiu4s/4001_SR.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU42ODRZI/AAAAAAAAApc/od_rxp7662w/mini4001_SR.png"},
		"4002" : {big : "http://lh4.ggpht.com/-54s8hUD6wH0/TgSW-DonCoI/AAAAAAAABAI/-LJsE9yJ_xM/kousaka1.png",		small : "http://lh3.ggpht.com/-cOApJRJCbHo/TgSXEIvGWqI/AAAAAAAABAM/UVvQh_v40gk/minikousaka1.png"},
		"4003" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/Ta1-orl8UuI/AAAAAAAAA3o/5tjbR63wAEk/sayonalion.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/Ta1-rpmk4yI/AAAAAAAAA30/jTSAeI7QOVw/minisayonalion.png"},
		"4004" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/Tar3jkdaqpI/AAAAAAAAA0o/UJ9xY0paGg8/maya02.png",		small : "http://lh3.ggpht.com/_b0a214_YjEE/Tarux9BhgcI/AAAAAAAAA0U/-2EIPX77VLY/minimaya1.png"},
		"4005" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUT_9oPHI/AAAAAAAAAjk/ILQoV2KyYkU/4005_R.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU6TwZASI/AAAAAAAAAps/MV25G6DoYQk/mini4005_R.png"},
		"4006" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TVfRPUgc0LI/AAAAAAAAAv0/-bpPMuK8QXg/motoko3.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TUQcW7kNaBI/AAAAAAAAAtA/Xeh66T5v61Q/minimotoko1.png"},
		"4007" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TUQcHAQGvNI/AAAAAAAAAsc/MLr0MthvTww/motoko1.png",		small : "http://lh6.ggpht.com/_b0a214_YjEE/TUQcXHg5CHI/AAAAAAAAAtE/HPuCP15wzvc/minimotoko2.png"},
		"4008" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/TQDXuXxQrFI/AAAAAAAAARU/-NhuBVn0otg/remiria1.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TQDX0zwNpvI/AAAAAAAAARc/JywLkaLNNPM/miniremiria1.png"},
		"4009" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TQDXuJS-Q4I/AAAAAAAAARQ/jWTpKQ6g-1o/remiria2.png",		small : "http://lh3.ggpht.com/_b0a214_YjEE/TQDe5T9Z6wI/AAAAAAAAAS0/p6zB7ngZDSU/miniremiri2.png"},
		"4010" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPeY7fyW9HI/AAAAAAAAAC4/Q4ySgeBOOgY/4010_UC.png",		small : "http://lh6.ggpht.com/_b0a214_YjEE/TQDnKTMYLNI/AAAAAAAAATQ/64EmxYWxF7Y/minimion2.png"},
		"4011" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TPeY7vgvo5I/AAAAAAAAAC8/WlvEGXe9jLE/4011_C.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TQDnKbu_Y-I/AAAAAAAAATU/WPEPZND9iwI/minimion1.png"},
		"4012" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TTwyA_wn_KI/AAAAAAAAAmQ/7SMKaAEwCbA/mari1.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TTwyLo-OnLI/AAAAAAAAAmk/rk5xk5wlMD0/minimari1.png"},
		"4013" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TTxMd2Q89YI/AAAAAAAAAnw/KzZ8Q25idUI/mari3.png",		small : "http://lh6.ggpht.com/_b0a214_YjEE/TTwyLmQLZTI/AAAAAAAAAmo/YP8QWis5aBQ/minimari2.png"},
		"4014" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TQDO-TzpPYI/AAAAAAAAAQ4/E0r1p1OgJjU/jigen.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TRB1yAlT9VI/AAAAAAAAAaE/vpCviJVQ9uw/minikouso2.png"},
		"4015" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TQDXt2__nPI/AAAAAAAAARI/Eb_zHOYVbno/totoro.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TRB1xzi9D1I/AAAAAAAAAaA/_Wl359UUeJ8/minikouso1.png"},
		"4016" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TQDXuT3yFYI/AAAAAAAAARY/ntSLJ1DgkKQ/meido1.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TQDX1EAHdlI/AAAAAAAAARg/pQYVD8Aydwo/minimeido1.png"},
		"4017" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TQDX5ewJEdI/AAAAAAAAARo/vTfvnore1uM/gothlolli1.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TQDX1FtLCnI/AAAAAAAAARk/4LJ5FfZtlck/minigothlolli1.png"},
		"4018" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TTwycEJiYCI/AAAAAAAAAnE/wQWYcl9dVs8/rei1.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TTwyf5w8EJI/AAAAAAAAAnY/h0rSIe73OoY/minirei3.png"},
		"4019" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TTwycLJQOgI/AAAAAAAAAnI/INjD_wyitC0/rei2.png",			small : "http://lh4.ggpht.com/_b0a214_YjEE/TTwyf7uUdoI/AAAAAAAAAnU/ByOzGylL_Ck/minirei2.png"},
		"4020" : {big : "http://gyazo.com/7552f1325093812fdb61697099cb87a1.png",						small : "http://cache.gyazo.com/ca26eb961ff4d9ce8c746e1d2003a5e6.png"},
		"4021" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPmFKHhZCAI/AAAAAAAAAME/gSXl95VkrCE/nagato1.png",		small : "http://lh6.ggpht.com/_b0a214_YjEE/TPl-1wzFrQI/AAAAAAAAAKM/3uDn7bXyQT0/mininagato3.png"},
		"4022" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TTwyAixqU2I/AAAAAAAAAmI/riDsSSE-YxA/asuka2.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TTwyLeZiudI/AAAAAAAAAmc/eTgoarfBjzo/miniasuka2.png"},
		"4023" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TTwyAbzWqoI/AAAAAAAAAmE/ygfYMy6xCU8/asuka1.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TTwyLeJWBQI/AAAAAAAAAmg/AyjFF9rZzQg/miniasuka3.png"},
		"4025" : {big : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOUVhhQZgI/AAAAAAAAAjw/7uBDTSIniTM/4025_SR.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU7boBMmI/AAAAAAAAAp4/TpbJ2vLp0Ec/mini4025_SR.png"},
		"4026" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TcP5lAHhLDI/AAAAAAAAA9Y/Rw1II2m09Q4/kyube2.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/TcP5pdng7YI/AAAAAAAAA9w/4q_q6pFE_rU/minikyube2.png"},
		"4027" : {big : "http://lh6.ggpht.com/_b0a214_YjEE/Ta2IEOAIIrI/AAAAAAAAA4E/6nTfN7My26c/watagasi1.png",		small : "http://lh6.ggpht.com/_b0a214_YjEE/Ta2IJIgoNSI/AAAAAAAAA4I/YSzSSzWY7G8/miniwatagasi1.png"},
		"4028" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TPmFKLbaU6I/AAAAAAAAAMI/4cda36O1CsE/nagato2.png",		small : "http://lh6.ggpht.com/_b0a214_YjEE/TPl-17QFjrI/AAAAAAAAAKE/IOIPZ-Q4uYQ/mininagato5.png"},
		"4029" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOUXLFtWWI/AAAAAAAAAj8/s7mdZ1Mmm_Y/4029_R.png",		small : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOU8opmvtI/AAAAAAAAAqE/lXW6QioN0Fc/mini4029_R.png"},
		"4031" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUXki26vI/AAAAAAAAAkA/9n6xySMfx7U/4031_UR.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMOU82SqcSI/AAAAAAAAAqI/N8qwCxdkLq4/mini4031_UR.png"},
		"4032" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/Ta2NF9ysIHI/AAAAAAAAA4g/H-P0IMyh2Rk/maya41.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/Ta2NC6cvwMI/AAAAAAAAA4c/tagQlqBeNKw/minimaya41.png"},
		"4033" : {big : "http://lh4.ggpht.com/_yaaM6-lAuRY/TMOUYprSnDI/AAAAAAAAAkI/WMViNWiDtKQ/4033_SR.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU9_n_ygI/AAAAAAAAAqQ/qnL2hv_k6fw/mini4033_SR.png"},
		"4034" : {big : "http://lh3.ggpht.com/_yaaM6-lAuRY/TMOUZEb3lSI/AAAAAAAAAkM/AhNcNQB3uIg/4034_SR.png",		small : "http://lh6.ggpht.com/_yaaM6-lAuRY/TMOU-MOyyAI/AAAAAAAAAqU/LeBHfLemvNQ/mini4034_SR.png"},
		"4035" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/TPeYukvtFiI/AAAAAAAAACw/Jcy1if3OdP4/4035_SR.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TPeYu-wVmEI/AAAAAAAAAC0/QxKmxRiupQ8/mini4020_UC.png"},
		"4036" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TVfRfUejViI/AAAAAAAAAwU/miAtq2u8210/ozeu1.png",		small : "http://lh3.ggpht.com/_b0a214_YjEE/TVfRmyWsRUI/AAAAAAAAAww/sAYyhJS2MQ8/miniozeu1.png"},
		"4037" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TcAzcXxjeaI/AAAAAAAAA8E/kyPjmc_1zoI/habest1.png",		small : "http://lh6.ggpht.com/_b0a214_YjEE/TcA0_PHZhhI/AAAAAAAAA8U/1eVLZzk_rTo/minihabest1.png"},
		"4038" : {big : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMclPU4sQJI/AAAAAAAAArk/JQH-rSkS4x8/4038_UC.png",		small : "http://lh5.ggpht.com/_yaaM6-lAuRY/TMclRv5Tt9I/AAAAAAAAAsA/rbN9wqBy4Zw/mini4038_UC.png"},
		"4044" : {big : "http://lh6.ggpht.com/-UlZ7cnR7nOI/TgctrmlsmgI/AAAAAAAABA4/9VDH_7pRXkI/batou2.png",		small : "http://lh6.ggpht.com/-ddQLYify9L8/Tgct06OrOjI/AAAAAAAABBE/t0SZ-xgrc-o/minibatou2.png"},
		"4046" : {big : "http://lh3.ggpht.com/_b0a214_YjEE/Tarh2Wof0OI/AAAAAAAAAzs/5kov0s5049c/maya3.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/Tartq9o2VnI/AAAAAAAAA0E/Wnvb771c6Ug/maya31.png"},
		"4047" : {big : "http://lh4.ggpht.com/_b0a214_YjEE/TbAmerz113I/AAAAAAAAA6A/duEOgv-sklQ/toko1.png",		small : "http://lh4.ggpht.com/_b0a214_YjEE/TbAkB7Ds6wI/AAAAAAAAA50/eqnrWDXAYQE/minitoko1.png"},
		"4048" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/TcAssUWbc3I/AAAAAAAAA70/FxNotOnMaeY/hiei1.png",		small : "http://lh3.ggpht.com/_b0a214_YjEE/TcAswttQKZI/AAAAAAAAA74/E86Ha3zS1q4/minihiei1.png"},
		"4050" : {big : "http://lh5.ggpht.com/_b0a214_YjEE/Ta1-oal6EWI/AAAAAAAAA3g/V8Ha627pTw4/arigatousagi2.png",		small : "http://lh5.ggpht.com/_b0a214_YjEE/Ta1-rfSCdrI/AAAAAAAAA34/Q08PXQ43w14/miniarigatousagi2.png"},
		"4052" : {big : "http://lh6.ggpht.com/-OhhxCZc8efU/Tk5-B9Dob7I/AAAAAAAABDU/iOHvXwWXi8I/miku11.png",		small : "http://lh3.ggpht.com/-sru3qWcR7HU/Tk5-cOxwS3I/AAAAAAAABEA/6itQy7nbp6M/minimiku11.png"},
		"4069" : {big : "http://lh3.ggpht.com/-9ZPeukh_Ee8/T56aSRH3ddI/AAAAAAAABRM/C2ZG63j3JSc/s315/nekomi01.png",	small : "http://lh4.ggpht.com/-1JJo4u0hYT8/T56Z1IrhsjI/AAAAAAAABQw/PKGUkCMV4F0/s120/mininekomi01.png"},
		"4071" : {big : "http://lh4.ggpht.com/-FNFvS71lto4/T56dBqXHZdI/AAAAAAAABR4/eOMiklkOWmY/s315/shiranui2.png",	small : "http://lh3.ggpht.com/-YWiQvhXIVmM/T56ZzHCkPjI/AAAAAAAABQg/06P5tgSo1BQ/s120/minishiranui2.png"},
		"4074" : {big : "http://lh6.ggpht.com/-G-uG_j6xD1s/T56aSfMqsUI/AAAAAAAABRc/Vl1vgKVREcE/s315/shiranui1.png",	small : "http://lh3.ggpht.com/-SSR2E3g8o-0/T56aDbkzCTI/AAAAAAAABRA/kI0Hxbnc2PM/s120/minishiranui1.png"},
		"4057" : {big : "http://lh3.ggpht.com/-yNwygasgQvk/TxFsHwvSH5I/AAAAAAAABNE/WEiaoY04DvE/s315/kuma1.png",	small : "http://lh3.ggpht.com/-7EGLDrJxbes/TxFsBrdTM1I/AAAAAAAABMA/b5mv0sryYIs/s120/minikuma1.png"}
};
	// 武将図鑑を置き換え
	if (location.pathname == '/card/busyobook_card.php') {

		var zukan = {
			"劉備" : "真名は桃香（とうか）。蜀漢の君主で、関羽・張飛とは義姉妹。中山靖王劉勝の末裔である証の宝剣「靖王伝家」を携え、世を救うために立ち上がる。限りない優しさと懐の大きさを持つが、極彩色の天然ボケタイプ。",
			"関羽" : "真名は愛紗（あいしゃ）。大陸中にその名を馳せる蜀の武神。理想家で、力の無い人々が平和に暮らせる世の中を作るために日々奮闘している。性格は生真面目で堅物。艶やかな黒髪をなびかせて青龍偃月刀を振るうその姿から「美髪公」の二

つ名で呼ばれる。",
			"張飛" : "真名は鈴々（りんりん）。ちびっ子だが自分の背丈より大きな丈八蛇矛を振るう万夫不当の豪傑。戦場以外では、近所の子供と駆け回って遊んだり、虫取りに興じていたりなど、年相応の一面を持つ。",
			"馬超" : "真名は翠（すい）。西涼の太守、馬騰の娘。曹操によって涼州を滅ぼされ一族が離散したため、劉備を頼り蜀軍の一員となる。その槍捌きは白銀の流星と謳われる「西涼の錦馬超」。",
			"黄忠" : "真名は紫苑（しおん）。弓の神・曲張に例えられるほどの腕前を持つ弓の名手。将軍として兵を率いるだけでなく、蜀軍の兵站管理も担当する。未亡人で、亡夫との間に一人娘の璃々がいる。",
			"趙雲" : "真名は星（せい）。文武両道に長けた蜀の武将。関羽・張飛に匹敵するほどの武勇の持ち主で、その槍捌きは「神槍」と称えられる。常に冷静沈着で何事にも動じない精神の持ち主。メンマが大好物。",
			"諸葛亮" : "真名は朱里（しゅり）。「伏竜」と称さられる、蜀軍の主に内政面を担当する軍師。「策、神に勝り、謀ごと、鬼を討つ」とまで言われるほどの策略家。女子校の水鏡女学院で育ったため、男性が少し苦手。慌てると「はわわ」と口走るところから「はわ

わ軍師」と呼ばれている。",
			"龐統" : "真名は雛里（ひなり）。「鳳雛」と称せられる、蜀軍の主に軍事面を担当する軍師。「不敗の魔女っ子」と呼ばれる戦術の天才。かなり内気でおどおどしており、恥ずかしいと大きな帽子で顔を隠す癖がある。慌てると「あわわ」と口走るところから「あわわ

軍師」と呼ばれている。",
			"馬岱" : "真名は蒲公英（たんぽぽ）。馬超の従妹。従姉である馬超を、お姉さまと慕い尊敬している。天性の悪戯好きで、よく魏延をからかっている。なにかにつけて、決め台詞の「ここにいるぞ～！」の声をあげながら登場する。",
			"魏延" : "真名は焔耶（えんや）。五虎将に次ぐ実力を持つ蜀の猛将。当初は敵対していたが、劉備に一目惚れしたことがきっかけで幕下に加わることになる。自らの武勇に自信を持ち、強気な発言をしたり、他人をバカにしたりしているが、実は打たれ弱いタイ

プ。犬が大の苦手。",
			"厳顔" : "真名は桔梗（ききょう）。無類の酒好きな豪快な武将。黄忠と共に蜀の若い武将の相談役として面倒を見ている。戦が好きで、戦いでは弓が武器なのに率先して前に出るタイプ。",
			"曹操" : "真名は華琳（かりん）。誇り高き魏の王。戦乱の世を、自らの手で再興することに天命を見出している。才気煥発で誇り高く、他者からの妬みを受ける事も多いが、歯牙にも掛けず自らの信念を貫く。美しい者には目が無く、美少女を手篭にするのが

趣味。",
			"夏侯惇" : "真名は春蘭（しゅんらん）。曹操の片腕の武人。夏侯淵の双子の姉。身も心も曹操に捧げており、曹操に敵対する者は誰であろうと許さない。激情家で猪突猛進で、天然バカの体育会系。",
			"夏侯淵" : "真名は秋蘭（しゅうらん）。曹操の片腕の武人。夏侯惇の双子の妹。姉と共に身も心も曹操に捧げている。性格は姉とは違い、常に冷静沈着。とかく暴走する姉を、クールに補佐する。",
			"荀彧" : "真名は桂花（けいふぁ）。魏の筆頭軍師。曹操の王としての器、天運、才能に惚れ込み、己の全てを捧げて仕えている。バカな人間が何よりも大嫌いで、夏侯惇の事を野蛮人と蔑んでいる。",
			"許褚" : "真名は季衣（きい）。親友の典韋と共に曹操の親衛隊を務める。小柄な体格から想像できない怪力の持ち主で、巨大な鉄球を軽々と振りまわす。曹操の事は好きだが、それと同じくらいに夏侯惇を慕っている。",
			"典韋" : "真名は流琉（りり）。親友の許緒と共に曹操の親衛隊を務める。許緒と二人でよく食べ歩きをするが、食べるのが大好きな許緒と違って料理を作る方が好き。相方のフォロー役という立場が似てるせいか、夏侯淵を尊敬し憧れている。",
			"張遼" : "真名は霞（しあ）。董卓軍の客将であったが、後に魏の騎兵部隊を率いる将軍となる。武と義を重んじ侠気に満ちた性格で、自らの武技を披露する事の喜びを見出す武将。関羽の戦いぶりに惚れ込み、武器も関羽の青龍偃月刀を模した飛龍偃

月刀を使用する。",
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