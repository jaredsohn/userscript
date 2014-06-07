                                             
// ==UserScript==
// @name           Emoplurk
// @based_on	   Plurk Smile (version 8.1201)
// @namespace      semurl
// @description    Easy to insert custom smile.
// @include        http://www.plurk.com/*
 
// ==/UserScript==
 
// ==About==
// author: Uchari Mae
 
 
// ********** Main Script ***********
var smileData = [];
 


smileData.push([
	'<IMG SRC="" width=05 ALT="5">',
	'http://s416.photobucket.com/albums/pp247/lenynha-oliveira/EmoticonsPlurk/EmoAmarelinhos/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif',
        '010.gif','011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif',
        '019.gif','020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif',
        '028.gif','029.gif','030.gif','031.gif','032.gif','033.gif','034.gif','035.gif','036.gif',
        '037.gif','038.gif','039.gif','040.gif','041.gif','042.gif','043.gif','044.gif','045.gif',
        '046.gif','047.gif','048.gif','049.gif','051.gif','052.gif','053.gif','054.gif','055.gif',
        '056.gif','057.gif','065.gif','066.gif','067.gif','068.gif','070.gif','071.gif','072.gif','073.gif','074.gif',
        '075.gif','076.gif','077.gif','078.gif','079.gif','080.gif','081.gif','082.gif','083.gif',
        '084.gif','085.gif','086.gif','087.gif','088.gif','089.gif','090.gif','091.gif','092.gif',
        '093.gif','094.gif','095.gif','096.gif','097.gif','099.gif','100.gif','101.gif','102.gif',
        '103.gif','104.gif','105.gif','106.gif','107.gif','108.gif','109.gif','110.gif','111.gif',
        '112.gif','113.gif','114.gif','115.gif','116.gif','117.gif','118.gif','119.gif','120.gif',
        '121.gif','122.gif','123.gif','124.gif','125.gif','126.gif','127.gif','128.gif','130.gif',
        '058.gif','059.gif','060.gif','061.gif','062.gif','063.gif','064.gif']
]);


smileData.push([
	'<IMG SRC="" width=05 ALT="6">',
	'http://',
	[                      'g.imagehost.org/0076/c1.gif','f.imagehost.org/0921/c2.gif','f.imagehost.org/0590/c3_10.gif',
'f.imagehost.org/0255/c4.gif','f.imagehost.org/0228/c5.gif','f.imagehost.org/0164/c6.gif',
'f.imagehost.org/0172/c7.gif','g.imagehost.org/0665/c8.gif','g.imagehost.org/0393/c9.gif',
'g.imagehost.org/0427/leit.gif','g.imagehost.org/0575/MamegomaHappy.gif',
'f.imagehost.org/0912/MamegomaInLove.gif',
'f.imagehost.org/0997/MamegomaLaugh.gif','f.imagehost.org/0194/MamegomaShocked.gif',
'f.imagehost.org/0438/MamegomaSleep.gif',
'f.imagehost.org/0172/MamegomaWtf.gif','f.imagehost.org/0238/th_morri.gif',
'f.imagehost.org/0369/kao_blush.gif','g.imagehost.org/0958/kao_cheering.gif',
'f.imagehost.org/0908/kao_confused.gif','f.imagehost.org/0557/kao_cool.gif',
'f.imagehost.org/0707/kao_cry.gif','f.imagehost.org/0253/kao_kiss.gif',
'f.imagehost.org/0344/kao_laughing.gif','g.imagehost.org/0851/kao_love.gif',
'g.imagehost.org/0806/kao_mad.gif','f.imagehost.org/0999/kao_mouth_shut.gif',
'f.imagehost.org/0846/kao_sad.gif','f.imagehost.org/0901/kao_shocked.gif',
'f.imagehost.org/0392/kao_sweat.gif','g.imagehost.org/0178/kao_wink.gif',
'g.imagehost.org/0888/Ahh_1.png','g.imagehost.org/0038/amused.gif','f.imagehost.org/0036/bar.gif',
'g.imagehost.org/0582/imessenger_emo_banana_40.gif','g.imagehost.org/0027/iaa.gif',
'f.imagehost.org/0029/imessenger_emo_banana_41.gif','g.imagehost.org/0803/imessenger_emo_banana_44.gif',
'g.imagehost.org/0615/imessenger_emo_banana_74.gif','g.imagehost.org/0464/imessenger_emo_banana_79.gif',
'g.imagehost.org/0953/imessenger_emo_banana_82.gif','g.imagehost.org/0604/th_Good_night_by_viskot.gif',
'g.imagehost.org/0604/th_confused_by_Freesong.gif','f.imagehost.org/0877/th_yaay.gif',
]
]);

 


smileData.push([
	'<IMG SRC="" width=05 ALT="7">',
	'http://',
	[
                                            'f.imagehost.org/0694/01_1.gif','f.imagehost.org/0573/02.gif',
'f.imagehost.org/0714/03_6.gif','f.imagehost.org/0332/04_9.gif',
'f.imagehost.org/0584/015.gif','f.imagehost.org/0742/character11.gif',
'f.imagehost.org/0289/cool0019.gif','f.imagehost.org/0034/tn_36445_d9a5eb5a5e069d29997f822a9373bd08.gif',
'f.imagehost.org/0422/fighting0057.gif','f.imagehost.org/0807/04ho6.gif',
'f.imagehost.org/0148/1225.gif','f.imagehost.org/0158/Mini-Hello022.gif',
'f.imagehost.org/0643/anim_26.gif','f.imagehost.org/0366/bandaid-amarelo.gif',
'f.imagehost.org/0899/BunnyLoveBench.gif','f.imagehost.org/0097/camera2.gif',
'f.imagehost.org/0330/char19.gif','f.imagehost.org/0195/dataehora.gif',
'f.imagehost.org/0255/e1.gif','f.imagehost.org/0608/emo10.gif',
'f.imagehost.org/0465/MiniGifSapo04.gif','f.imagehost.org/0454/mouse.gif',
'f.imagehost.org/0248/onpu26.gif','f.imagehost.org/0134/pixel144-1.gif',
'f.imagehost.org/0233/senpuki02.gif','f.imagehost.org/0954/tv-pink.gif',
'g.imagehost.org/0613/bj.gif','g.imagehost.org/0884/1aaa.gif',
'g.imagehost.org/0840/1b.gif','g.imagehost.org/0117/briga.gif',
'g.imagehost.org/0392/bua.gif','g.imagehost.org/0849/by.gif',
'g.imagehost.org/0049/cons.gif','g.imagehost.org/0555/esc.gif',
'g.imagehost.org/0543/fluffy.gif','g.imagehost.org/0712/grrr.gif',
'g.imagehost.org/0540/palm.gif','g.imagehost.org/0436/ri.gif',
'g.imagehost.org/0824/rs.gif','g.imagehost.org/0787/smil.gif',
'g.imagehost.org/0753/th_030.gif','g.imagehost.org/0631/th_typerhappy.gif',
'g.imagehost.org/0747/th_Writing_emoticon_by_eburt.gif','g.imagehost.org/0785/uhu.gif',
'g.imagehost.org/0901/uhuu.gif','f.imagehost.org/0359/ahn3.gif','g.imagehost.org/0863/dan.gif',
'f.imagehost.org/0213/pil.gif','f.imagehost.org/0202/s22.gif','g.imagehost.org/0794/nhas2.gif',
'f.imagehost.org/0471/morri.gif','f.imagehost.org/0566/limp.gif','f.imagehost.org/0578/ler.gif',
'g.imagehost.org/0653/grrrr.gif','g.imagehost.org/0619/grr.gif','g.imagehost.org/0478/gn3.gif', 
'0978/swift_103.gif','0871/swift_104.gif','0072/swift_105.gif','0977/swift_106.gif',
'0379/swift_107.gif','0285/swift_108.gif','0680/swiftt.jpg',


	]


]);

smileData.push([
	'<IMG SRC="" width=05 ALT="8">',
	'http://e.imagehost.org/',
	[
		'0048/3TA.gif','0446/3W2.gif','0316/39q.gif','0493/5ec.gif','0796/5h7.gif','0195/5ns.gif',
'0097/5n3.gif','0005/5hw.gif','0399/5hx.gif','0802/5hs.gif', '0155/2I1.gif','0442/1ss.gif','0161/5dU.gif','0838/5eI.gif','0738/9AM.gif','0638/9AW.gif',
'0542/9B5.gif','0939/33H.gif','0342/gp.gif','0144/JE.gif','0815/Jp.gif',
'0023/39x.gif','0924/5gN.gif','0823/5mH.gif','0218/5gT.gif','0632/5nm.gif','0033/5hp.gif',
'0428/5mR.gif','0014/Hn.gif','0878/5gz.gif','0767/5mY.gif','0685/5g8.gif','0586/5hv.gif',
'0977/9AU.gif','0375/5ij.gif', '0950/bZ3.gif' ,'0960/ajv.gif','0983/84303rd.gif','0714/84305wt.gif',
'0624/79652rr.gif','0014/18927.gif','0422/18794.gif','0819/13389.gif','0615/13388.gif',
'0720/18620.gif','0065/bjk.gif','0257/74834wr.gif','0154/86.gif',
'0556/awz.gif','0800/bjy.gif','0626/cm.gif','0588/huh.gif','0027/dnk.gif','0771/th_268.gif','0764/ch.gif','0429/pnt.gif',
'0895/a34.gif','0030/buu.gif',
'0390/3_17.gif',
'0291/4_11.gif','0681/4V0.gif','0545/fl.gif',
'0002/buh.gif','0930/sl.gif','0389/22_1.gif','0409/5hH.gif','0091/5px.gif','0390/9AP.gif',
'0798/ha.gif','0804/nham.gif','0499/hi.gif','0098/hel.gif','0712/cb.gif','0861/ih.gif','0761/bbb.gif',
'0562/nha.gif','0972/pato.gif','0865/5pq.gif','0271/5pr.gif',
'0167/5ia.gif','0346/5nh.gif','0806/5mP.gif','0333/bmq.gif','0706/9AX.gif','0504/sh.gif',
'0206/ok_7.gif','0308/hnf.gif',
'0010/zmb.gif','0865/o.gif','0412/t.gif',
'0814/gg.gif','0524/bb.gif','0632/bb.gif','0433/il.gif','0467/Jt.gif',
'0339/hi.gif','0165/guit.gif','0057/zzz.gif','0964/5ht.gif','0660/no.gif','0260/brb.gif',
'0266/pic.gif',
'0073/hm.gif','0745/5gd.gif'

	]
]);


smileData.push([
	'<IMG SRC="" width=05 ALT="9">',
	'http://a.imagehost.org/',
	[
		'0725/BJ.gif','0510/000.gif','0680/sh.gif','0448/5eJ.gif',
'0844/rad.gif','0749/af.gif',
'0150/dudu.gif',
'0056/esc.gif','0952/cof.gif','0856/th_pant.gif',
'0226/tel.gif','0979/antie3.gif','0063/ahn.gif','0062/ball.gif','0357/th.gif','0717/preso.gif',
'0664/koko.gif','0570/pint.gif',
'0459/pcof.gif','0262/cat.gif','0975/bts.gif','0651/ahh.gif','0163/nho.gif',
'0241/pz.gif','0628/no.gif','0040/nha.gif','0364/yes.gif',
'0738/who.gif',
'0565/hah.gif','0422/ppc.gif','0325/scd.gif','0114/hot.gif','0429/shower.gif',
'0726/drool.gif','0530/hi.gif',
'0325/fiu.gif','0140/hebad.gif',
'0284/hrt.gif',
'0293/pap.gif','0622/turt.gif','0325/cpt.gif','0021/tv.gif','0209/emo.gif',
'0928/esc.gif','0236/bee.gif','0130/mario.gif','0535/dudu.gif','0264/ask.gif','0167/vaka.gif',
'0565/hap1.gif',
'0968/grr.gif','0870/fome.gif'

	]
]);

smileData.push([
	'<IMG SRC="" width=05 ALT="10">',
	'http://a.imagehost.org/',
	[
		'0957/uu.gif','0985/022.gif','0391/0498emo-messbrasil.gif',
'0790/3191emo-messbrasil.gif',
'0686/alegre_imess_1.gif','0089/hud.png',
'0990/3027emo-messbrasil.png',
'0611/3085emo-messbrasil.gif','0012/693emo-messbrasil.gif',
'0291/ban.gif',
'0040/okk.gif','0620/brushteeth.gif','0022/em42.gif','0927/em40.gif',
'0371/em56.gif','0269/em46.gif',
'0676/3839emo-messbrasil.gif','0076/3855emo-messbrasil.gif',
'0973/3854emo-messbrasil.gif','0674/em53.gif','0083/unsbye.gif',
'0072/th_098.gif','0618/wootbye.gif',
'0925/th_umbrella.gif','0830/smile.png','0239/heartsplash2_sm.gif','0853/heart.gif',
'0370/bebye.gif',
'0775/hohbye.gif',


'0333/5pf.gif','0052/1vu.gif',
 '0941/JF.gif','0657/MZ.gif','0052/Jm.gif',
'0844/Jv.gif','0044/14p.gif','0352/Jt.gif',
'0460/Jq.gif','0671/Jn.gif',
'0579/oo.gif',
'0332/dent.gif','0135/hi.gif',
'0853/5nG.gif','0759/5hu.gif', '0255/5mU.gif','0650/5ph.gif','0862/5po.gif',
'0256/iT.gif','0427/6fr.gif','0602/5pp.gif',
'0658/yeah.gif','0068/no1.gif'

	]
]);


smileData.push([
	'<IMG SRC="" width=05 ALT="11">',
	'http://a.imagehost.org/',
	[
		'0722/5ed.gif','0926/4yu.gif','0334/5hC.gif','0229/cry.gif',
'0630/5ib.gif','0038/pisc.gif',
'0435/AK.gif',
'0235/5hy.gif','0846/5mL.gif','0563/49I.gif',
'0450/j9.gif','0352/5nF.gif','0761/iT.gif','0162/oh.gif','0067/5pv.gif','0469/5hL.gif',
'0655/bua.gif','0562/bah.gif',
'0855/cry.gif','0740/mimi.gif','0873/fura.gif','0272/anjo.gif','0171/ic.gif',
'0883/kir.gif','0793/chuv.gif','0499/bye.gif','0901/057.gif',
'0564/ih.gif',

'0804/tomara.gif','0334/5gH.gif','0607/hohoh.gif','0429/1a.gif','0457/1b.gif',
'0861/1c.gif','0754/1d.gif',
'0665/1f.gif','0977/1e.gif',
'0372/1g.gif',
'0768/1h.gif','0125/1j.gif','0748/1l.gif','0050/1m.gif','0951/1n.gif',
'0850/1o.gif','0749/1p.gif','0149/1q.gif','0049/1r.gif','0424/1s.gif','0366/1t.gif',
'0811/4E.gif',
'0932/5mS.png','0338/15w.gif'

	]
]);

smileData.push([
	'<IMG SRC="" width=05 ALT="12">',
	'http://',
	[
	'e.imagehost.org/0475/2_3.gif','e.imagehost.org/0382/64A.gif',
'e.imagehost.org/0285/bh.gif','e.imagehost.org/0691/bE3.gif','e.imagehost.org/0089/u7.gif',
		'e.imagehost.org/0293/u4.gif',
'e.imagehost.org/0513/bann_7.gif','e.imagehost.org/0373/u5.gif',
'plurk.cainanunes.com/creu1.gif',
		'plurk.cainanunes.com/creu2.gif',
'plurk.cainanunes.com/creu3.gif','plurk.cainanunes.com/creu4.gif',
'plurk.cainanunes.com/creu5.gif','plurk.cainanunes.com/Oo.gif',
'plurk.cainanunes.com/hohoho.gif',
	'plurk.cainanunes.com/nonono.gif ',
'plurk.cainanunes.com/apathetic.gif',
'plurk.cainanunes.com/coffee.gif','plurk.cainanunes.com/chimarrao.gif',
'plurk.cainanunes.com/beer.gif','plurk.cainanunes.com/draught_dark_beer.gif',
		'plurk.cainanunes.com/draught_beer.gif',
'plurk.cainanunes.com/white_wine.gif','plurk.cainanunes.com/blue_label.gif',
'plurk.cainanunes.com/green_label.gif','plurk.cainanunes.com/heart.gif',
'e.imagehost.org/0399/uhu.gif',
'e.imagehost.org/0212/pf.gif','e.imagehost.org/0606/bah1.gif',
'e.imagehost.org/0005/bua2.gif','e.imagehost.org/0119/u6.gif','e.imagehost.org/0191/bah.gif',
'e.imagehost.org/0091/pf.gif', 'e.imagehost.org/0483/xd_10.gif',
'e.imagehost.org/0902/hih.gif','e.imagehost.org/0598/lw.gif',
'e.imagehost.org/0234/lov.gif','e.imagehost.org/0532/huh1.gif','e.imagehost.org/0504/1rb.gif',
'a.imagehost.org/0902/174.gif','a.imagehost.org/0426/175.gif','a.imagehost.org/0820/17.gif',
'a.imagehost.org/0140/14_10.gif','a.imagehost.org/0234/11.gif','a.imagehost.org/0624/12.gif',
'a.imagehost.org/0936/13.gif','a.imagehost.org/0332/15.gif','a.imagehost.org/0727/16.gif',
'a.imagehost.org/0120/1_2.gif','a.imagehost.org/0059/179.gif',
'a.imagehost.org/0092/2_15.gif','a.imagehost.org/0496/3.gif'
	]
]);


smileData.push([
	'<IMG SRC="" width=05 ALT="13">',
	'http://a.imagehost.org/',
	[
		'0803/emoticon-0100-smile.gif',
'0203/emoticon-0101-sadsmile.gif','0021/emoticon-0102-bigsmile.gif',
'0419/emoticon-0103-cool.gif','0819/emoticon-0104-surprised.gif',
'0214/emoticon-0105-wink.gif',
'0124/emoticon-0106-crying.gif','0063/emoticon-0107-sweating.gif',
'0878/emoticon-0108-speechless.gif',
'0279/emoticon-0109-kiss.gif',
'0572/emoticon-0110-tongueout.gif',
'0973/emoticon-0111-blush.gif',
'0878/emoticon-0112-wondering.gif','0794/emoticon-0113-sleepy.gif',
'0181/emoticon-0114-dull.gif',
'0122/emoticon-0147-emo.gif','0744/emoticon-0116-evilgrin.gif',
'0548/emoticon-0117-talking.gif',
'0455/emoticon-0118-yawn.gif','0843/emoticon-0119-puke.gif',
'0745/emoticon-0120-doh.gif','0645/emoticon-0121-angry.gif',
'0559/emoticon-0122-itwasntme.gif',
'0110/emoticon-0124-worried.gif','0497/emoticon-0127-lipssealed.gif',
'0915/emoticon-0125-mmm.gif',
'0808/emoticon-0128-hi.gif',
'0612/emoticon-0141-whew.gif',
'0018/emoticon-0138-thinking.gif','0911/emoticon-0126-nerd.gif',
'0812/emoticon-0136-giggle.gif',
'0658/emoticon-0140-rofl.gif','0867/emoticon-0146-punch.gif','0278/emoticon-0145-shake.gif',
'0170/emoticon-0133-wait.gif','0972/emoticon-0175-drunk.gif',
'0882/emoticon-0137-clapping.gif',
'0573/emoticon-0178-rock.gif','0593/emoticon-0115-inlove.gif',
'0983/emoticon-0139-bow.gif','0039/emoticon-0182-poolparty.gif',
'0935/emoticon-0177-toivo.gif',
'0332/emoticon-0170-ninja.gif',
'0238/emoticon-0169-dance.gif',
'0645/emoticon-0165-muscle.gif','0036/emoticon-0180-bug.gif',
'0934/emoticon-0159-music.gif','0988/emoticon-0156-rain.gif',
'0347/emoticon-0134-bear.gif',
'0306/emoticon-0150-handshake.gif',
'0786/emoticon-0155-flower.gif','0713/emoticon-0151-skype.gif',
'0606/showerfap.gif','0272/Bathtime.gif','0662/sho_wer.gif','0564/shoower.gif',
'0466/shower_time.gif','0371/showerrr.gif',
'0273/sshhowers.gif','0171/sshower.gif','0562/1fwb43.gif','0201/1zckcus.gif', 
'0605/2a8rklw.gif','0014/2j0md68.gif','0412/2mnrz1f.gif','0809/2s0h8nl.gif','0716/2wexdfo.gif',
'0114/11gpxg1.gif','0011/15fri4k.gif','0312/21lnc4z.png','0219/25qzqqg.gif','0628/52be2v.gif','0510/282dvtc.gif',
'0922/2966h3.gif','0824/a9u4og.gif','0730/bhiptt.gif','0528/jrs9ip.gif','0427/k1e2j8.gif','0331/vpckua.gif',
'0733/w32.gif','0028/x1k080g.gif','0932/xcvwuc.gif','0326/2dmik3a.png',
'0300/2hnx8a1.gif','0205/2s9raee.gif','0610/2utp2yb.gif','0514/2zp18cg.gif','0905/5agtnr.gif','0807/24g4o6o.gif',
'0715/28bskdg.gif','0108/34yqjjn.gif',
'0014/156wmxy.gif','0913/353a3ye.gif','0317/e9bxu9.gif','0718/fjmcrt.gif',
'0523/jauyzb.gif','0928/rrjl2b.gif','0206/1z5ulau.gif','0342/2eanp1h.gif',
'0743/2ryswsi.gif','0443/23mpr9t.png','0824/34sqg3s.gif','0721/xm4w3b.gif','0030/4t991s.gif',
	]
]);



smileData.push([
	'<IMG SRC="" width=05 ALT="14">',
    'http://www.mysmiley.net/imgs/smile/',
    [
        'confused/confused0004.gif','indifferent/indifferent0019.gif','animals/animal0002.gif',
'happy/happy0023.gif','innocent/innocent0001.gif','winking/winking0067.gif',
'animated/anim_64.gif',
'love/love0025.gif','love/love0046.gif',
        'love/love0044.gif','love/love0078.gif','rolleye/rolleye0006.gif',
'rolleye/rolleye0015.gif','rolleye/rolleye0017.gif','rolleye/rolleye.gif','cool/cool0007.gif',
        'cool/cool0043.gif','sad/sad0020.gif','sad/sad0016.gif','sad/sad0043.gif','sad/sad0047.gif',
'sad/sad0056.gif','sad/sad0100.gif','sad/sad0078.gif',
        'sad/sad0148.gif','sad/sad0122.gif','sign/sign0067.gif','sign/sign0059.gif',
'sign/sign0107.gif','sign/sign0117.gif','sign/sign0118.gif',
        'sign/sign0127.gif','sign/sign0120.gif','sign/sign0180.gif','sign/sign0189.gif',
'indifferent/indifferent0018.gif','sign/sign0201.gif','sign/sign0196.gif',
        'happy/happy0040.gif','happy/happy0038.gif','happy/happy0058.gif',
'happy/happy0029.gif','happy/happy0089.gif','happy/happy0206.gif','happy/happy0187.gif',
'happy/happy0168.gif','animals/animal0060.gif','animals/animal0036.gif',
'winking/winking0016.gif','winking/winking0063.gif','winking/winking0070.gif','sick/sick0002.gif',
'love/love0004.gif','angel/angel04.gif','love/love0033.gif','mad/mad0050.gif','indifferent/indifferent0008.gif',
'mad/mad0215.gif','angel/jesus.gif',
'mad/mad0217.gif','angel/cupid.gif',
'angel/bow2.gif','mad/mad0235.gif','angel/angeldevil.gif','mad/mad0270.gif','angel/angel02.gif',
'angel/beeangel.gif','angel/whiteangel.gif',
'characters/character0029.gif','characters/character0017.gif','happy/happy0099.gif',
'animated/anim_37.gif','characters/character0147.gif',
'characters/character0144.gif', 'happy/happy0124.gif','happy/happy0159.gif',
'happy/happy0098.gif','characters/character0201.gif','characters/character0203.gif',
'characters/character0178.gif','characters/character0164.gif','characters/character0163.gif',
'happy/happy0120.gif', 'happy/happy0133.gif','characters/character0205.gif','characters/character0242.gif',
'happy/happy0207.gif','happy/happy0175.gif','happy/happy0171.gif','happy/happy0173.gif',
'happy/happy0191.gif','happy/happy0190.gif','animals/animal0009.gif','animals/animal0048.gif',
'animals/animal0070.gif','happy/happy0206.gif','animals/animal0045.gif',
'happy/happy0178.gif','animated/anim_40.gif','animated/anim_44.gif',
'animated/anim_35.gif','animated/anim_48.gif','party/party0009.gif','tongue/tongue0007.gif'

    ]
]);

smileData.push([
	'<IMG SRC="" width=05 ALT="15">',
    'http://a.imagehost.org/',
    [
 
                                  '0834/swift_51.gif','0738/swift_52.gif','0740/swift_53.gif','0503/swift_55.gif',
'0800/swift_56.gif','0700/swift_57.gif',
'0094/swift_58.gif','0218/swift_54.gif','0172/swift_59.gif','0272/swift_60.gif', 
'0500/swift_61.gif','0295/swift_62.gif','0911/swift_63.gif','0016/swift_64.gif','0618/swift_65.gif',
'0624/swift_66.gif','0532/swift_67.gif','0934/swift_68.gif','0837/swift_69.gif','0730/swift_70.gif','0740/swift_71.gif',
'0843/swift_72.gif','0457/swift_73.gif','0462/swift_74.gif','0073/swift_75.gif','0468/swift_76.gif','0770/swift_77.gif',
'0873/swift_78.gif','0279/swift_79.gif','0094/swift_80.gif','0473/swift_81.gif',
'0382/swift_82.gif','0293/swift_83.gif','0585/swift_84.gif','0687/swift_85.gif','0591/swift_86.gif','0498/swift_87.gif',
'0899/swift_88.gif','0656/swift_89.gif',
'0052/swift_90.gif','0857/swift_91.gif','0754/swift_92.gif','0650/swift_93.gif',
'0453/swift_94.gif','0860/swift_95.gif','0255/swift_96.gif','0179/swift_97.gif',
'0471/swift_98.gif','0876/swift_99.gif','0772/swift_100.gif','0680/swift_101.gif','0582/swift_102.gif',
'0978/swift_103.gif','0871/swift_104.gif','0072/swift_105.gif','0977/swift_106.gif',
'0379/swift_107.gif','0285/swift_108.gif','0680/swiftt.jpg','0462/swift.gif','0058/swift0.png','0863/swift_2.gif','0667/swift_2.png',
'0569/swift_3.gif','0475/swift_3.png',
'0771/swift_4.gif','0170/swift_5.gif','0972/swift_6.gif','0876/swift_7.gif', 
'0790/swift_8.gif','0440/swift_10.gif','0537/swift_12.gif','0430/swift_13.gif','0341/swift_14.gif',
'0941/swift_15.gif','0833/swift_16.gif','0342/swift_17.gif','0856/swift_18.gif','0464/swift_19.gif','0074/swift_20.gif',
'0477/swift_21.gif','0980/swift_22.gif','0274/swift_24.gif','0841/swift_25.gif','0744/swift_26.gif','0150/swift_27.gif',
'0252/swift_28.gif','0751/swift_29.gif','0913/swift_9.gif','0604/swift_23.gif',
'0215/swift_30.gif','0610/swift_31.gif','0012/swift_32.gif','0413/swift_33.gif','0821/swift_34.gif','0619/swift_35.gif',
'0516/swift_36.gif','0911/swift_37.gif',
'0314/swift_38.gif','0122/swift_39.gif','0534/swift_40.gif','0921/swift_41.gif',
'0830/swift_42.gif','0728/swift_43.gif','0134/swift_44.gif','0527/swift_45.gif',
'0439/swift_46.gif','0236/swift_47.gif','0136/swift_48.gif','0041/swift_49.gif','0438/swift_50.gif',       

    ]
]);

smileData.push([
	'<IMG SRC="" width=05 ALT="16">',
    ' http://',
    [
        'mysmiley.net/imgs/smile/sign/sign0031.gif','mysmiley.net/imgs/smile/sign/sign0036.gif',
'mysmiley.net/imgs/smile/sign/sign0046.gif','mysmiley.net/imgs/smile/sign/sign0032.gif',
'mysmiley.net/imgs/smile/sign/sign0037.gif',
'mysmiley.net/imgs/smile/sign/sign0042.gif','mysmiley.net/imgs/smile/sign/sign0047.gif',
'mysmiley.net/imgs/smile/sign/sign0033.gif','mysmiley.net/imgs/smile/sign/sign0038.gif',
'mysmiley.net/imgs/smile/sign/sign0043.gif','mysmiley.net/imgs/smile/sign/sign0048.gif',
'mysmiley.net/imgs/smile/sign/sign0039.gif','mysmiley.net/imgs/smile/sign/sign0028.gif',
'mysmiley.net/imgs/smile/sign/sign0029.gif',
'mysmiley.net/imgs/smile/sign/sign0030.gif','mysmiley.net/imgs/smile/sign/sign0049.gif',
'mysmiley.net/imgs/smile/sign/sign0044.gif','mysmiley.net/imgs/smile/sign/sign0035.gif',
'mysmiley.net/imgs/smile/sign/sign0050.gif','mysmiley.net/imgs/smile/sign/sign0045.gif',
'mysmiley.net/imgs/smile/sign/sign0040.gif',
'mysmiley.net/imgs/smile/sign/sign0035.gif','mysmiley.net/imgs/smile/sign/sign.gif',
'mysmiley.net/imgs/smile/sign/sign0051.gif','a.imagehost.org/0829/BRB.gif',
'a.imagehost.org/0130/WTF.gif', 'mysmiley.net/imgs/smile/sign/sign0075.gif',
'mysmiley.net/imgs/smile/sign/sign0053.gif','mysmiley.net/imgs/smile/sign/sign0061.gif',
'mysmiley.net/imgs/smile/sign/sign0069.gif','mysmiley.net/imgs/smile/sign/sign0052.gif',
'mysmiley.net/imgs/smile/sign/sign0068.gif',
'mysmiley.net/imgs/smile/scared/scared0014.gif',
'mysmiley.net/imgs/smile/indifferent/indifferent0023.gif',
'mysmiley.net/imgs/smile/animated/anim_13.gif','mysmiley.net/imgs/smile/sign/sign0133.gif',
'mysmiley.net/imgs/smile/sign/sign0185.gif','mysmiley.net/imgs/smile/scared/scared0013.gif',
'mysmiley.net/imgs/smile/sign/sign0203.gif','mysmiley.net/imgs/smile/love/love0049.gif',
'mysmiley.net/imgs/smile/love/love0043.gif','mysmiley.net/imgs/smile/love/love0083.gif',
'mysmiley.net/imgs/smile/sad/sad0049.gif',
'mysmiley.net/imgs/smile/sad/sad0025.gif',
'mysmiley.net/imgs/smile/confused/confused0093.gif',
'mysmiley.net/imgs/smile/angel/angel05.gif',
'mysmiley.net/imgs/smile/confused/confused0085.gif',
'mysmiley.net/imgs/smile/confused/confused0081.gif',
'mysmiley.net/imgs/smile/sick/sick0012.gif',
'mysmiley.net/imgs/smile/sick/sick0001.gif','mysmiley.net/imgs/smile/party/party0037.gif',
'mysmiley.net/imgs/smile/party/party0052.gif'

    ]
]);


smileData.push([
	'<IMG SRC="" width=05 ALT="17">',
	'http://a.imagehost.org/',
	[
		'0080/hug.gif','0378/gnaw.gif','0285/luvbite.gif','0685/abra.gif',
'0096/flower.gif','0478/inluv.gif',
'0388/kiss2.gif','0792/squee.gif',
'0376/avoiding-eyecontact.gif','0611/heart.gif','0011/hugmeplz.gif','0406/loser.gif',
'0306/talktowall.gif','0215/manhug.gif','0619/luv.gif','0517/winknudge.gif',
'0154/badday.gif','0557/finger.gif','0471/luvpat.gif','0371/sheepish.gif','0765/bla.gif',
'0663/b54.gif','0465/b25.gif','0266/b18.gif',
'0270/th_juggle.gif','0551/wink.gif','0925/hi.gif',
'0323/kaku.gif','0736/kiss.gif','0647/yes.gif',
'0268/crau.gif','0011/gl2.gif','0606/gah.gif','0005/vei.gif','0406/tf.gif','0817/niver.gif',
'0221/bu.gif','0614/gaio.gif',
'0019/panic.gif','0732/nsei.gif','0965/sh.gif','0272/secret.gif','0664/pan1.gif','0569/crazy.gif',
'0959/byby.gif','0772/peru.gif','0988/th_mwahaha.gif','0687/gr.gif',
'0448/soap.gif','0493/sos.gif',
'0295/viol.gif','0081/musc.gif'

	]
]);

smileData.push([
	'<IMG SRC="" width=05 ALT="18">',
	'http://',
	[
		'a.imagehost.org/0885/verg.gif','a.imagehost.org/0677/th_bow-1.gif',
'a.imagehost.org/0292/dead.gif','a.imagehost.org/0665/fiu.gif',
'a.imagehost.org/0061/gr.gif','a.imagehost.org/0956/mr.gif',
'a.imagehost.org/0870/ok.gif','a.imagehost.org/0276/pam.gif',
'a.imagehost.org/0167/ui.gif','a.imagehost.org/0072/sorry.gif',
'www.mysmiley.net/imgs/smile/confused/confused0024.gif',
'mysmiley.net/imgs/smile/love/love0028.gif','mysmiley.net/imgs/smile/love/love0047.gif',
'mysmiley.net/imgs/smile/love/love0043.gif','mysmiley.net/imgs/smile/love/love0054.gif',
'mysmiley.net/imgs/smile/love/love0087.gif',
'mysmiley.net/imgs/smile/love/love0065.gif',
'mysmiley.net/imgs/smile/indifferent/indifferent0028.gif',
'a.imagehost.org/0248/blush.gif',
'a.imagehost.org/0783/th_adoration.gif','a.imagehost.org/0557/th_compassion.gif',
'a.imagehost.org/0950/th_glomp.gif','a.imagehost.org/0351/th_hungry.gif',
'a.imagehost.org/0257/th_handshake.gif',
'a.imagehost.org/0152/th_hump.gif','a.imagehost.org/0555/th_flirty.gif',
'a.imagehost.org/0956/th_happy-1.gif',
'a.imagehost.org/0527/th_lmao-1.gif',
'a.imagehost.org/0648/th_teevee.gif',
'a.imagehost.org/0552/th_reading.gif',
'a.imagehost.org/0452/th_sentimental.gif','a.imagehost.org/0351/th_slyfart.gif',
'a.imagehost.org/0160/th_strong.gif','a.imagehost.org/0564/th_cuddle.gif',
'a.imagehost.org/0963/th_sadness.gif','a.imagehost.org/0403/th_laughing-1.gif',
'a.imagehost.org/0190/th_drooling.gif','a.imagehost.org/0591/th_nod-1.gif',
'a.imagehost.org/0988/th_mwahaha.gif',
'a.imagehost.org/0398/th_licking.gif',
'a.imagehost.org/0793/th_helpful.gif',
'a.imagehost.org/0187/th_jealous.gif','a.imagehost.org/0597/th_typerhappy.gif',
'a.imagehost.org/0987/th_whisper.gif','a.imagehost.org/0822/th_wave.gif',
'a.imagehost.org/0610/th_meditate.gif','a.imagehost.org/0716/th_yawnstretch.gif',
'a.imagehost.org/0514/th_zeal.gif',
'a.imagehost.org/0414/th_omfg.gif','a.imagehost.org/0710/th_shakefist.gif',
'a.imagehost.org/0621/th_paranoid.gif','a.imagehost.org/0404/th_ohmygod.gif'
	]
]);


smileData.push([
	'<IMG SRC="" width=05 ALT="19">',
	'http://',
	[
		'a.imagehost.org/0086/th_date.gif','a.imagehost.org/0873/please.gif',
'a.imagehost.org/0886/th_aroused.gif','a.imagehost.org/0841/th_lick.gif',
'a.imagehost.org/0279/th_squee_by_Synfull.gif',
'a.imagehost.org/0911/0625emo-messbrasil.gif',
'a.imagehost.org/0576/fail.gif','a.imagehost.org/0171/th_heartbreaker.gif',
'a.imagehost.org/0490/Asdf.png',
'a.imagehost.org/0894/sarcasticclap.gif','a.imagehost.org/0239/8D.gif',
'a.imagehost.org/0178/loveing.gif','a.imagehost.org/0618/hatelove.gif',
'a.imagehost.org/0520/Pat_Emote_by_eStunt.gif',
'a.imagehost.org/0416/nutkick.gif','a.imagehost.org/0718/thanks.gif',
'a.imagehost.org/0119/lovepoke.gif','a.imagehost.org/0511/giggle.gif',
'a.imagehost.org/0896/facepalm_2.gif',
'a.imagehost.org/0454/gif.gif','a.imagehost.org/0364/D.gif',
'a.imagehost.org/0259/Dry.png',
'a.imagehost.org/0657/fluffy.gif','a.imagehost.org/0575/dunlookatmelikethat.gif',
'a.imagehost.org/0968/lovedup.png',
'a.imagehost.org/0857/nosepoke.gif',
'a.imagehost.org/0515/C_by_Caeser1993.gif','a.imagehost.org/0564/th_strip.gif',
'a.imagehost.org/0884/fear.gif','a.imagehost.org/0852/aww.gif',
'a.imagehost.org/0844/avoiding-eyecontact.gif',
'a.imagehost.org/0243/animesweat.gif','a.imagehost.org/0140/hatsoff.gif',
'a.imagehost.org/0950/grumpy.gif','a.imagehost.org/0346/cheerleader.gif',
'a.imagehost.org/0750/kiss.gif','a.imagehost.org/0656/O_o.gif',
'a.imagehost.org/0148/th_boing.gif',
'a.imagehost.org/0216/th_comfort.gif',
'a.imagehost.org/0103/th_faint.gif','a.imagehost.org/0020/th_sneeze.gif',
'a.imagehost.org/0414/th_slap-1.gif','a.imagehost.org/0323/th_shh.gif',
'a.imagehost.org/0617/th_tunes-1.gif','a.imagehost.org/0717/th_threaten.gif',
'a.imagehost.org/0997/th_clone.gif','a.imagehost.org/0107/th_bye.gif',
'a.imagehost.org/0011/th_bonk.gif',
'a.imagehost.org/0908/th_crying.gif','a.imagehost.org/0808/th_dizzy.gif',
'a.imagehost.org/0712/th_dohtwo.gif','a.imagehost.org/0348/bucktooth2.gif'
]
]);




var isinit = false;
var currInput = null;
var rplreg = /\[(\d+) (\d+)\]/g;
var pageState = location.href.split('/')[3];
 
window.addEventListener('load', function()
{
    setTimeout(function()
    {
        var selImgs = document.getElementsByClassName('smily_holder');
 
        // bind key up event
        if(pageState == 'p')
            getById('input_permalink').addEventListener('keyup', replaceSmile, false);
        else
        {
            getById('input_big').addEventListener('keyup', replaceSmile, false);
            getById('input_small').addEventListener('keyup', replaceSmile, false);
        }
 
        // create tabs
        for(var i=0; i<selImgs.length; i++)
        {
            selImgs[i].setAttribute('ref', selImgs.length - i);
            selImgs[i].addEventListener('click', function()
            {
                isinit || setTimeout(init, 1000);
                currInput = pageState != 'p' ? this.getAttribute('ref') == 2 ? getById('input_big') : getById('input_small') : getById('input_permalink');
            }, false);
        }
    }, 2000);
}, false);
 
 
// init
function init()
{
    isinit = true;
    // init contents
    for(var i=0; i<smileData.length; i++)
    {
        addTab(i, smileData[i]);
    }
    // init css
    getById('emoticons_show').style.width  = '620px';
    getById('emoticons_show').style.height = '280px';
    getById('emoticons_show').style.overflow = 'auto';
}
 
function replaceSmile()
{
    if(rplreg.test(this.value))
        this.value = this.value.replace(rplreg, doReplace);
}
 
function doReplace(str, datid, smileid)
{
    arr = smileData[datid];
    if (typeof(arr) != 'undefined')
    {
        if(typeof(arr[2][smileid]) != 'undefined')
            str = ' ' + smileData[datid][1] + smileData[datid][2][smileid] + ' ';
    }
    return str;
}
 
function addTab(id, data)
{
    var myli = document.createElement('li');
    myli.className = 'emoticon_selecter';
    myli.innerHTML = '<a href="javascript:void 0;">'+data[0]+'</a>';
    myli.addEventListener('click', function()
    {
        addImages(this, id);
    }, false);
 
    getById('emoticons_tabs').getElementsByTagName('ul')[0].appendChild(myli);
}
 
function addImages(obj, ind)
{
    var showDiv = getById('emoticons_show');
    var lis = getById('emoticons_tabs').getElementsByTagName('li');
    for(var i=0; i<lis.length; i++)
        lis[i].className = 'emoticon_selecter';
 
    obj.className += ' current';
 
    var data = smileData[ind];
    var baseUrl = data[1];
    var str = '<div>';
    for(var i=0, dat = data[2], _url; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']" width=32 /></a>';
 
    }
    str += '</div>';
    showDiv.innerHTML = str;
 
    var imgs = showDiv.getElementsByTagName('img');
    for(var i=0; i<imgs.length; i++)
    {
        imgs[i].addEventListener('click', function()
        {
            currInput.value += ' ' + this.src + ' ';
            currInput.focus();
        }, false);
    }
}
 
function getById(oid)
{
    return document.getElementById(oid);
}