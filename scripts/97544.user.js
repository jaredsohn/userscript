// ==UserScript==
// @name           EuroGamerFX
// @namespace      http://eurogamer.it/*
// @description    Funzioni di utilita per Eurogamer
// @include        http://www.eurogamer.it/*
// @author		   megalomaniac, haruki(modding)
// ==/UserScript==
		
	function runDaisy () {
		if(window.opera) {
			var docBody = document.getElementById('theTop');
			if (docBody == null)
			{
					setTimeout('runDaisy();', 1000);
					return;
			}
		}
		
		d = window.opera ? docBody : document;
		//====== SIGN
		var str='';
		var el = window.opera ? d.getElementsByClassName( 'sig' ) : d.getElementsByClassName( 'sig' );
		for ( var i = 0; i < el.length; i++ ) {
				str=el[i].innerHTML;
				//----- img		
				str=str.replace(/\[img\]([^\[\]<>]+)\[\/img\]/gi,'<div style="width:500px; overflow:auto;"><img src="http://$1" /></div>');
				//-----		
				el[i].innerHTML=str;
		}
		//====== MESSAGE
		el = window.opera ? d.getElementsByClassName( 'message' ) : d.getElementsByClassName( 'message' );
		for ( var i = 0; i < el.length; i++ ) {
				str=el[i].innerHTML;
				//----- img		
				str=str.replace(/\[img\]([^\[\]<>]+)\[\/img\]/gi,'<div style="width:500px; overflow:auto;"><img src="http://$1" /></div>');
				str=str.replace(/\[scamone\]([^\[\]]+)\[\/scamone\]/gi,'<font face="Comic Sans MS" size="5" color="#00FF99">$1</font>');
				//----- youtube
				str=str.replace(/\[youtube\]([^\[\]<>]+)\[\/youtube\]/gi,'<iframe title="YouTube video player" width="480" height="320" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
				//-----		
				//-----	emoticons
				str=str.replace(/:fag:/g,'<img src="http://i.imgur.com/NsrY1.gif"></img>');
				str=str.replace(/:sisi:/g,'<img src="http://i.imgur.com/Ko1LZ.gif"></img>');
				str=str.replace(/:snob:/g,'<img src="http://i.imgur.com/6h6Ge.gif"></img>');
				str=str.replace(/:uhlol:/g,'<img src="http://i.imgur.com/IzFX2.gif"></img>');
				str=str.replace(/:facepalm:/g,'<img src="http://i.imgur.com/UAuMG.gif"></img>');
				str=str.replace(/:rulez:/g,'<img src="http://i.imgur.com/fceHs.gif "></img>');
				str=str.replace(/:look:/g,'<img src="http://i.imgur.com/qJmfF.gif"></img>');
				str=str.replace(/:rotfl:/g,'<img src="http://i.imgur.com/x2W9h.gif"></img>');
				str=str.replace(/:uhm:/g,'<img src="http://i.imgur.com/gbtXE.gif"></img>');
				str=str.replace(/:asd:/g,'<img src="http://i.imgur.com/HswDx.gif"></img>');
				str=str.replace(/:lul:/g,'<img src="http://i.imgur.com/j2zwx.gif"></img>');
				str=str.replace(/:awesome:/g,'<img src="http://i.imgur.com/1cvz5.png "></img>');
				str=str.replace(/:caffe:/g,'<img src="http://i.imgur.com/0np2G.gif"></img>');
				str=str.replace(/:vojo:/g,'<img src="http://i.imgur.com/BJRxj.gif"></img>');
				str=str.replace(/:smugdance:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smugdance.gif"></img>');
				str=str.replace(/:smugfc:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/JrlVr.gif"></img>');
				str=str.replace(/:smughrr:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smugahr.gif"></img>');
				str=str.replace(/:smugnono:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smugnono.gif"></img>');
				str=str.replace(/:smugperv:/g,'<img src="http://i.imgur.com/cV9cg.gif"></img>');
				str=str.replace(/:smugyeah:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smugoyeah.gif"></img>');
				str=str.replace(/:smuglol:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/1sz95e.gif"></img>');
				str=str.replace(/:rotolul:/g,'<img src="http://www.just4spam.org/vb/images/smilies/rotolultu8.gif"></img>');
				str=str.replace(/:smugvaivia:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/vaivia.gif"></img>');
				str=str.replace(/:gums:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/60960021.gif"></img>');
				str=str.replace(/:smugpapa:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smugpapanonoalt1.gif"></img>');
				str=str.replace(/:nono:/g,'<img src="http://i.imgur.com/j4HMc.gif"></img>');
				str=str.replace(/:alesisi:/g,'<img src="http://j4s.mitsudomoe.us/forum/images/smilies/alesisi2bv.gif"></img>');
				str=str.replace(/:pippotto:/g,'<img src="http://j4s.mitsudomoe.us/forum/images/smilies/pippotto.gif"></img>');
				str=str.replace(/:mad:/g,'<img src="http://j4s.mitsudomoe.us/forum/images/smilies/icon_mad.gif"></img>');
				str=str.replace(/:tsk:/g,'<img src="http://i.imgur.com/hVi67.gif"></img>');
				str=str.replace(/:sbav:/g,'<img src="http://j4s.mitsudomoe.us/forum/images/smilies/sbav.gif"></img>');
				str=str.replace(/:lock:/g,'<img src="http://i.imgur.com/0JqW4.jpg"></img>');
				str=str.replace(/:chebotta:/g,'<img src="http://i.imgur.com/eAUsE.jpg"></img>');
				str=str.replace(/:picchia:/g,'<img src="http://i.imgur.com/GZVPF.jpg"></img>');
				str=str.replace(/:baci:/g,'<img src="http://i.imgur.com/H7KCP.jpg"></img>');
				str=str.replace(/:piange:/g,'<img src="http://i.imgur.com/HwPN7.jpg"></img>');
				str=str.replace(/:perche:/g,'<img src="http://i.imgur.com/I8fuk.jpg"></img>');
				str=str.replace(/:solo:/g,'<img src="http://i.imgur.com/kBGPt.jpg"></img>');
				str=str.replace(/:blabla:/g,'<img src="http://i.imgur.com/Dh3Da.jpg "></img>');
				str=str.replace(/:bua:/g,'<img src="http://i.imgur.com/MiddM.jpg "></img>');
				str=str.replace(/:moan:/g,'<img src="http://i.imgur.com/2O2Nj.jpg"></img>');
				str=str.replace(/:o/g,'<img src="http://i.imgur.com/Cc1wt.jpg "></img>');
				str=str.replace(/:jfs3:/g,'<img src="http://i.imgur.com/OIf5X.jpg"></img>');
				str=str.replace(/:vendetta/g,'<img src="http://i.imgur.com/O77tX.jpg "></img>');
				str=str.replace(/:\|/g,'<img src="http://i.imgur.com/NLHxp.jpg "></img>');
				str=str.replace(/:tstrodicevo:/g,'<img src="http://i.imgur.com/PAGH7.jpg"></img>');
				str=str.replace(/:prostro:/g,'<img src="http://i.imgur.com/YgP3I.jpg"></img>');
				str=str.replace(/:wtf:/g,'<img src="http://www.just4spam.org/vb/images/smilies/omfg.gif"></img>');
				str=str.replace(/:psychocaffag:/g,'<img src="http://www.just4spam.org/vb/images/smilies/psychocaffag.gif"></img>');
				str=str.replace(/:cryfag:/g,'<img src="http://www.just4spam.org/vb/images/smilies/fagcry.gif"></img>');
				str=str.replace(/:psycho2:/g,'<img src="http://www.just4spam.org/vb/images/smilies/psycho2.gif"></img>');
				str=str.replace(/:timifag:/g,'<img src="http://www.just4spam.org/vb/images/smilies/fagdita.gif "></img>');
				str=str.replace(/:birra:/g,'<img src="http://www.just4spam.org/vb/images/smilies/fagbirrasurpr.gif"></img>');
				str=str.replace(/:smugbox:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smubox.gif"></img>');
				str=str.replace(/:smugignore:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/ignore.gif"></img>');
				str=str.replace(/:smugplauso:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/2mri4cz.gif"></img>');
				str=str.replace(/:smugciao:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smugciaociao.gif"></img>');
				str=str.replace(/:smugnonsifa:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smugalt.gif"></img>');
				str=str.replace(/:smugjfs:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/14c8gp5.gif"></img>');
				str=str.replace(/:smugrandom:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/skizzsmug.gif"></img>');
				str=str.replace(/:smugjump:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smugjump.gif"></img>');
				str=str.replace(/:smugmazza:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smug_baseball.gif "></img>');
				str=str.replace(/:smugcacca:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/2n87nd3.gif"></img>');
				str=str.replace(/:smugjuggler:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/smug_juggler.gif"></img>');
				str=str.replace(/:smugdunno:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/dy4thu.gif"></img>');
				str=str.replace(/:smugupdown:/g,'<img src="http://www.just4spam.org/vb/images/smilies/smugghi/upedown.gif"></img>');
				str=str.replace(/:smug:/g,'<img src="http://i.imgur.com/Z0Fw9.gif"></img>');
				str=str.replace(/:bravobravissimo:/g,'<img src="http://j4s.mitsudomoe.us/forum/images/smilies/bravomd.gif"></img>');
				str=str.replace(/:cheers:/g,'<img src="http://i.imgur.com/LYZnB.jpg"></img>');
				str=str.replace(/:timido:/g,'<img src="http://i.imgur.com/kwCd9.jpg"></img>');
				str=str.replace(/:mmh?:/g,'<img src="http://i.imgur.com/ioUXB.jpg"></img>');
				str=str.replace(/:boh:/g,'<img src="http://i.imgur.com/iGHLI.jpg"></img>');
				str=str.replace(/:smugdance2:/g,'<img src="http://i.imgur.com/o9FdM.jpg"></img>');
				str=str.replace(/:smugspia:/g,'<img src="http://i.imgur.com/vijBQ.jpg"></img>');
				str=str.replace(/:cattivo:/g,'<img src="http://i.imgur.com/v2AYJ.jpg"></img>');
				str=str.replace(/:teach:/g,'<img src="http://i.imgur.com/uYfHe.jpg"></img>');
				str=str.replace(/:sm:/g,'<img src="http://i.imgur.com/sr0e4.jpg"></img>');
				str=str.replace(/:popcorn:/g,'<img src="http://i.imgur.com/SBfZr.jpg"></img>');
				str=str.replace(/:consola:/g,'<img src="http://i.imgur.com/RnsWF.jpg"></img>');
				str=str.replace(/:smugbidon:/g,'<img src="http://i.imgur.com/IXtCo.jpg"></img>');
				str=str.replace(/:smugmarocco:/g,'<img src="http://i.imgur.com/aULW5.jpg"></img>');
				str=str.replace(/:tremo:/g,'<img src="http://i.imgur.com/2WlzP.jpg"></img>');
				str=str.replace(/:smugivan:/g,'<img src="http://i.imgur.com/2SQz9.jpg"></img>');
				str=str.replace(/:terrore:/g,'<img src="http://i.imgur.com/0ZTpK.jpg"></img>');
				str=str.replace(/:schiuma:/g,'<img src="http://i.imgur.com/0wXJb.jpg"></img>');
				str=str.replace(/:smugfatina:/g,'<img src="http://i.imgur.com/smfUD.gif"></img>');
				str=str.replace(/:smugapple:/g,'<img src="http://i.imgur.com/5fyrM.gif"></img>');
				str=str.replace(/:smugchef:/g,'<img src="http://i.imgur.com/O9RxQ.gif"></img>');
				str=str.replace(/:smugbicchiere:/g,'<img src="http://i.imgur.com/OPdQX.gif"></img>');
				str=str.replace(/:smugmoonwalk:/g,'<img src="http://i.imgur.com/q1M4q.gif"></img>');
				str=str.replace(/:uhoh:/g,'<img src="http://i.imgur.com/JRVsO.jpg"></img>');
				str=str.replace(/:smugsnob:/g,'<img src="http://i.imgur.com/ygYIv.gif"></img>');
				str=str.replace(/:smugcaffe:/g,'<img src="http://i.imgur.com/8j6R8.gif"></img>');
				str=str.replace(/:smugbioparco:/g,'<img src="http://i.imgur.com/A06ri.gif"></img>');
				str=str.replace(/:smugfattstrotu:/g,'<img src="http://i.imgur.com/jLHvU.gif"></img>');
				str=str.replace(/:smugkillwithfire:/g,'<img src="http://i.imgur.com/RaQl2.gif"></img>');
				//-----		
				el[i].innerHTML=str;
		}
		if ( (el = document.getElementById('forum-toolbar')) != null ) {
			var a = document.createElement('a');
			a.href = "javascript:format(\'youtube\')\;";
			a.className = "spoiler";
			a.innerHTML = "Youtube";
			var li = document.createElement('li');
			li.appendChild(a);
			el.appendChild(li);
			a = document.createElement('a');
			a.href = "javascript:format(\'img\')\;";
			a.className = "spoiler";
			a.innerHTML = "image";
			li = document.createElement('li');
			li.appendChild(a);
			el.appendChild(li);
		}
		}
		
	runDaisy();