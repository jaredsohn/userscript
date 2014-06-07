scr_meta=<><![CDATA[
// ==UserScript==
// @name	xOxO
// @version	1.00
// @author	xD
// @namespace	xP
// @description	*yawn
// @include        http://*.orkut.*/*

// ==/UserScript==
]]></>;

addEventListener('load', function(event) {
function getTextArea(n) {
	return document.getElementsByTagName('textarea')[n];
}


function insertSmiley(){
	var image = this.getElementsByTagName('img')[0].getAttribute("src");
	getTextArea(this.getAttribute("gult")).focus();
	getTextArea(this.getAttribute("gult")).value += "<img src="+image+">";
}

function dip() {
	var smileyarr = new Array();	

smileyarr["smiley_112"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SJ-nt5e_UlI/AAAAAAAAAcc/fq8td1_d_Vk/1-chicote.gif";
smileyarr["smiley_111"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SJ-l6bItCZI/AAAAAAAAAcM/Y05jgS3Aj-Q/1-assi.gif";
smileyarr["smiley_110"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SJ9NPNJadFI/AAAAAAAAAbY/sb2kvNcraaE/1-stoned.gif";
smileyarr["smiley_109"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SJ9NPB9rtkI/AAAAAAAAAbQ/e28L4Q8DhUI/1-sigh.gif";
smileyarr["smiley_108"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SJ9NO-j-HzI/AAAAAAAAAbI/pn78e8XX0Jw/1-kucing_nosepick.gif";
smileyarr["smiley_107"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SJ9NO4uXq_I/AAAAAAAAAbA/E5yv6Eivtvs/1-hi.gif";
smileyarr["smiley_106"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SJ9NO4nwbiI/AAAAAAAAAa4/tt6pPQA6UBc/1-evil-smile.gif";
smileyarr["smiley_105"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SJuhKY3qt4I/AAAAAAAAAaQ/TKlAtTBuhGM/1-relax2.gif";
smileyarr["smiley_104"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SJT5FZ8du1I/AAAAAAAAAZo/lAKnztaJagY/1-good-job.gif";
smileyarr["smiley_103"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SJT4NM1vSNI/AAAAAAAAAZg/ReU-sLwKw2U/1-wtf.gif";
smileyarr["smiley_102"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SJT23VFBUDI/AAAAAAAAAZY/SDL9fx1q_fY/1-objection.gif";
smileyarr["smiley_101"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SJT0uSkbK7I/AAAAAAAAAZQ/WTLfs_W9erQ/1-not-listening.gif";
smileyarr["smiley_100"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SJT0ufTrGPI/AAAAAAAAAZI/kyUrw7H6huU/1-hmmm.gif";
smileyarr["smiley_99"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SJT0uN2iEzI/AAAAAAAAAZA/3mgdNqjEfXQ/1-happy.gif";
smileyarr["smiley_98"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SJTzoW3LwXI/AAAAAAAAAYo/Q6Rz1AeJph8/saya_gitu_lho.gif";
smileyarr["smiley_97"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SJTzoXTrbJI/AAAAAAAAAYg/zzs0lY1yvJw/ngebut.gif";
smileyarr["smiley_96"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SJTzodrZbVI/AAAAAAAAAYY/PCG_xAXhM8A/kucing_sakit.gif";
smileyarr["smiley_95"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SJTzkrwaUNI/AAAAAAAAAYI/VrNS55TCZI8/kucing_begadang.gif";
smileyarr["smiley_94"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SJTzkpFdAmI/AAAAAAAAAYA/gehDrt_fR0s/ketok_ketok.gif";
smileyarr["smiley_93"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SJTzkvC-fpI/AAAAAAAAAX4/z4Q3PTOp28g/gimana_yah.gif";
smileyarr["smiley_92"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SJTzkdfywfI/AAAAAAAAAXw/EnAKd-ES5KY/fallingasleep.gif";
smileyarr["smiley_91"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvUgBzC2xI/AAAAAAAAAU8/GUYSSIfOjcs/yawn.gif";
smileyarr["smiley_90"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvUf-GHJWI/AAAAAAAAAUs/wquj-gvmuWE/wtf2.gif";
smileyarr["smiley_89"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvUfz9wCQI/AAAAAAAAAUk/Ii8YFjed1iU/wow.gif";
smileyarr["smiley_88"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvUf9261hI/AAAAAAAAAUc/wPg7MOFx_R4/wow2.gif";
smileyarr["smiley_86"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvUX4bfXqI/AAAAAAAAAUU/1jsNFDiBATk/woa.gif";
smileyarr["smiley_85"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvUX5ddL9I/AAAAAAAAAUM/splv3Ztf264/whistling.gif";
smileyarr["smiley_84"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvUXyNWMkI/AAAAAAAAAUE/1SsXPI5hDVc/what.gif";
smileyarr["smiley_83"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvUX2x02bI/AAAAAAAAAT8/x-M4HXTxpX0/wet.gif";
smileyarr["smiley_82"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvUXmI6d4I/AAAAAAAAAT0/jKArY-0X10g/warning.gif";
smileyarr["smiley_81"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvUCYgyyaI/AAAAAAAAATs/YZnfGY3RAAQ/waiting.gif";
smileyarr["smiley_80"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvUCeNQseI/AAAAAAAAATk/DwXDYH4arNc/wait.gif";
smileyarr["smiley_79"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvUCJhmieI/AAAAAAAAATc/CjV-n-XFH8U/vomiting.gif";
smileyarr["smiley_78"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvUCFGYKLI/AAAAAAAAATU/fYDTyJ82I1M/victory.gif";
smileyarr["smiley_77"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvUBuAly0I/AAAAAAAAATM/h-BPJ69LeN4/uhuhuh.gif";
smileyarr["smiley_76"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvT5J-EQDI/AAAAAAAAATE/7G-x7QplU-w/tar.gif";
smileyarr["smiley_75"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvT44Xc-xI/AAAAAAAAAS8/Ho5-2vu_1vg/sweetdrop.gif";
smileyarr["smiley_74"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvT42bDvGI/AAAAAAAAAS0/OYNlrU1HE9E/sweating.gif";
smileyarr["smiley_73"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvT48Qs6YI/AAAAAAAAASs/HsWXPk6kdG0/super-sayan.gif";
smileyarr["smiley_72"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvT40k9DBI/AAAAAAAAASk/bU6u-tlJqiw/super.gif";
smileyarr["smiley_71"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvTvIyWs4I/AAAAAAAAASc/l42cIaaaI6w/studying.gif";
smileyarr["smiley_70"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvTvM6xkPI/AAAAAAAAASU/uXxzz8oxgoM/stress.gif";
smileyarr["smiley_69"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvTvDmIetI/AAAAAAAAASM/SwFr_Ix5Bj0/stoned.gif";
smileyarr["smiley_68"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvTvBN5kMI/AAAAAAAAASE/Wnw91kFCYuI/spa.gif";
smileyarr["smiley_67"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvTvGeEPpI/AAAAAAAAAR8/MqI4RUszsU4/smoking.gif";
smileyarr["smiley_66"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvTeqAvYxI/AAAAAAAAAR0/LKXMCK2CVR4/sleeping.gif";
smileyarr["smiley_65"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvTetkFUvI/AAAAAAAAARs/i-Ds1FvBHMQ/silence.gif";
smileyarr["smiley_63"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvTeglTyCI/AAAAAAAAARk/WNccJSKAVOQ/sigh.gif";
smileyarr["smiley_62"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvTerMXxYI/AAAAAAAAARc/NsPl8A7ZkxE/shy.gif";
smileyarr["smiley_61"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvTeXkRISI/AAAAAAAAARU/TRpXTEJ3oE4/shock.gif";
smileyarr["smiley_60"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvS1RCcUaI/AAAAAAAAARM/xissAQUVUG8/sexy.gif";
smileyarr["smiley_59"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvS1c_mRxI/AAAAAAAAAQ8/r-lklhMwJcE/running.gif";
smileyarr["smiley_58"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvS1Oj5cOI/AAAAAAAAAQ0/krJc5cNg-9U/robot.gif";
smileyarr["smiley_57"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvS1PPvlFI/AAAAAAAAAQs/E27DrBwvg58/relax.gif";
smileyarr["smiley_56"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvSgwlWXxI/AAAAAAAAAQk/5dROAlOmq_M/pointing.gif";
smileyarr["smiley_55"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvSgxEkqDI/AAAAAAAAAQc/KP2DPEl7IHw/relax2.gif";
smileyarr["smiley_54"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvSg2gO7jI/AAAAAAAAAQU/0hvFMfc4T_0/pff.gif";
smileyarr["smiley_53"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvSgpwUV1I/AAAAAAAAAQE/xUvpQD2VIBA/payup.gif";
smileyarr["smiley_52"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvRuut2v9I/AAAAAAAAAPs/i5Ebg4MgIBo/nonono.gif";
smileyarr["smiley_51"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvRuj1rHbI/AAAAAAAAAPc/WDFn9m5A19E/love.gif";
smileyarr["smiley_50"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvRjXfaGdI/AAAAAAAAAPU/wXtExJW_tdw/lonly.gif";
smileyarr["smiley_49"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvRjaEl5LI/AAAAAAAAAPM/Ns6Poaztgfs/lol.gif";
smileyarr["smiley_48"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvRjGNcxyI/AAAAAAAAAPE/oFqYfWoSK_k/lol2.gif";
smileyarr["smiley_47"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvRjMY9ciI/AAAAAAAAAO8/kNM-LknYp10/kick.gif";
smileyarr["smiley_46"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvRhvP3y2I/AAAAAAAAAO0/DxQPruKRBd8/innocent.gif";
smileyarr["smiley_45"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvRYhYxtSI/AAAAAAAAAOs/yvPqRq9_Bgg/info.gif";
smileyarr["smiley_44"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvRYagGCeI/AAAAAAAAAOk/E--3khlg180/ill.gif";
smileyarr["smiley_43"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvRYUmWyDI/AAAAAAAAAOc/QQ-LNJL2-Sc/hypnosis.gif";
smileyarr["smiley_42"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvRYd7IksI/AAAAAAAAAOU/yS0g2HmM6sk/hot.gif";
smileyarr["smiley_41"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvRLwwTplI/AAAAAAAAAOE/CEVFNaQpmjQ/hell-yes.gif";
smileyarr["smiley_40"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvRLyF058I/AAAAAAAAAN8/LoB4oTptz3E/hate.gif";
smileyarr["smiley_39"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvRL0sSTOI/AAAAAAAAAN0/fCWqkPNqlmQ/happy.gif";
smileyarr["smiley_38"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvRLwv89XI/AAAAAAAAANs/1MLCM07BpKs/good-luck.gif";
smileyarr["smiley_37"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvRGnHmLEI/AAAAAAAAANc/1npekxvr-D0/full.gif";
smileyarr["smiley_36"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvRGlnudaI/AAAAAAAAANU/eT_gaIgVzuE/frozen.gif";
smileyarr["smiley_35"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvRGswnBzI/AAAAAAAAANM/TDn9rnr0cVM/freezing.gif";
smileyarr["smiley_34"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvRGpKTQSI/AAAAAAAAANE/nOd-AtPqOXs/falling-asleep.gif";
smileyarr["smiley_33"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvRGjRbH9I/AAAAAAAAAM8/5um3vtamJeQ/expulsion.gif";
smileyarr["smiley_32"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvQ8Mtc7II/AAAAAAAAAMs/TosGDUqJy0k/embarrassed.gif";
smileyarr["smiley_31"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvQ8FfKaoI/AAAAAAAAAMk/kkXYC0p7IVA/embarrassed3.gif";
smileyarr["smiley_30"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvQ8OIJuXI/AAAAAAAAAMc/r4tVLj1kPcw/embarrassed2.gif";
smileyarr["smiley_29"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvQ75VD8tI/AAAAAAAAAMU/Rom-VpzN_SA/eating-me.gif";
smileyarr["smiley_28"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvQ25GoXvI/AAAAAAAAAMM/7qt4N3z0-cw/eaten-alive.gif";
smileyarr["smiley_27"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvQ2hOwCrI/AAAAAAAAALs/G-PJjWckNbY/desperate.gif";
smileyarr["smiley_26"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvQ2uup8FI/AAAAAAAAAL0/m9lnySwf4IY/dreaming.gif";
smileyarr["smiley_25"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvQINOfTTI/AAAAAAAAALk/xEnyTtWp-Xc/desperate2.gif";
smileyarr["smiley_24"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvQIOmTs_I/AAAAAAAAALc/hTapPzIH_30/depressed.gif";
smileyarr["smiley_23"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvQILG4mFI/AAAAAAAAALU/r4rPJKytx0U/depressed2.gif";
smileyarr["smiley_22"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvQH3uhOQI/AAAAAAAAALM/eq64llOq-FI/dead.gif";
smileyarr["smiley_21"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvQHwSW4VI/AAAAAAAAALE/FsALNUk2_mU/cute.gif";
smileyarr["smiley_20"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvP9f0LsKI/AAAAAAAAAK8/6NWCZh6Bq1A/cute2.gif";
smileyarr["smiley_19"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvP9bBZ5KI/AAAAAAAAAK0/q2CfzvsqBKw/crying.gif";
smileyarr["smiley_18"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvP9cQNGjI/AAAAAAAAAKs/L867XnQeYVM/crying3.gif";
smileyarr["smiley_17"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvP9MSyomI/AAAAAAAAAKk/Y9JhGEle7DY/crying2.gif";
smileyarr["smiley_16"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvP9J-PHBI/AAAAAAAAAKc/d1feVGjEdzI/cool.gif";
smileyarr["smiley_15"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvP3jZPnmI/AAAAAAAAAKU/1s45c-b43iM/confused.gif";
smileyarr["smiley_14"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvP3rMBDyI/AAAAAAAAAKM/ggbgSoAXNMY/cheer.gif";
smileyarr["smiley_13"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvP3hSjTRI/AAAAAAAAAKE/Gj5O30N0T2A/bye.gif";
smileyarr["smiley_12"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvP3qML8hI/AAAAAAAAAJ8/u8oetRupvYU/bye2.gif";
smileyarr["smiley_11"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvP3ix29NI/AAAAAAAAAJ0/LCA8q3tEabI/bsod.gif";
smileyarr["smiley_10"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvPqnDCdII/AAAAAAAAAJs/uuehvwpzSn0/blocked.gif";
smileyarr["smiley_09"]="http://lh3.ggpht.com/_E9R4_4PxDYg/SHvPqu4Nl0I/AAAAAAAAAJk/6-V0VXO0cB4/bleeding.gif";
smileyarr["smiley_08"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvPqkR8uyI/AAAAAAAAAJc/YJkTMfCbN5Y/beg.gif";
smileyarr["smiley_07"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvPqrXjLhI/AAAAAAAAAJU/ufcjotjRmZ8/beaten.gif";
smileyarr["smiley_06"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvPqumQ-SI/AAAAAAAAAJM/EqTGP7YdxwY/bad-atmosphere.gif";
smileyarr["smiley_05"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvPlQe97VI/AAAAAAAAAJE/dmqlqDdiLLw/angel.gif";
smileyarr["smiley_04"]="http://lh6.ggpht.com/_E9R4_4PxDYg/SHvPlM3WejI/AAAAAAAAAI8/FmdJ-ESrqB4/angel2.gif";
smileyarr["smiley_03"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvPlF1B9mI/AAAAAAAAAI0/PZO1SO-RjBM/ahaaah.gif";
smileyarr["smiley_02"]="http://lh5.ggpht.com/_E9R4_4PxDYg/SHvPlN1hnAI/AAAAAAAAAIs/XN6EQLPx5c0/admire.gif";
smileyarr["smiley_01"]="http://lh4.ggpht.com/_E9R4_4PxDYg/SHvPkxcVvMI/AAAAAAAAAIk/D9V5haUTHt4/admire2.gif";





	var tb = document.getElementsByTagName('textarea');
	for(i=0;i<tb.length;i++){
		text=tb[i];
		if (!text) return;
		c=text.parentNode;
		d=document.createElement("div");
		d.className="T";
		d.style.fontSize="11px";
		d.align="left";
		
	        
	    d.style.marginTop="10px";
		c.appendChild(d);
		
		for(title in smileyarr){
			mm=document.createElement("a");
			mm.href="javascript:;";
			mm.setAttribute("gult",i);
			mm.innerHTML="<img src='"+smileyarr[title]+"' title='"+title+"'>";
			mm.addEventListener("click", insertSmiley, true);
			d.appendChild(mm);
		}
	}	
}
dip();
}, false);