// ==UserScript==
// @name           EuroGamerIMG
// @namespace      http://eurogamer.it/*
// @description    Abilita i tag IMG e YOUTUBE e una selezione delle migliori emoticons di J4S sul forum di Eurogamer
// @include        http://www.eurogamer.it/*
// @author		   megalomaniac
// ==/UserScript==


		//====== SIGN
		var aid='';
		var aryClassElements = document.getElementsByClassName( 'sig' );
		for ( var i = 0; i < aryClassElements.length; i++ ) {
				aid=aryClassElements[i].innerHTML;
				//----- img		
				aid=aid.replace(/\[img]/g,'<div style="width:500px; overflow:auto;"><img src="http://')
				aid=aid.replace(/\[IMG]/g,'<div style="width:500px; overflow:auto;"><img src="http://')
				aid=aid.replace(/\[\/img]/g,'"></img></div>')
				aid=aid.replace(/\[\/IMG]/g,'"></img></div>') 
				//-----		
				aryClassElements[i].innerHTML=aid;
		}
		//====== MESSAGE
		var aid='';
		var aryClassElements = document.getElementsByClassName( 'message' );
		for ( var i = 0; i < aryClassElements.length; i++ ) {
				aid=aryClassElements[i].innerHTML;
				//----- scamone
				aid=aid.replace(/\[scamone]/g,'<font face="Comic Sans MS" size="5" color="#00FF99">')
				aid=aid.replace(/\[SCAMONE]/g,'<font face="Comic Sans MS" size="5" color="#FF6666">')
				aid=aid.replace(/\[\/scamone]/g,'</font>')
				aid=aid.replace(/\[\/SCAMONE]/g,'</font>') 
				//----- img		
				aid=aid.replace(/\[img]/g,'<div style="width:530px; overflow:auto;"><img src="http://')
				aid=aid.replace(/\[IMG]/g,'<div style="width:530px; overflow:auto;"><img src="http://')
				aid=aid.replace(/\[\/img]/g,'"></img></div>')
				aid=aid.replace(/\[\/IMG]/g,'"></img></div>') 
				//-----
				//----- youtube		
				aid=aid.replace(/\[youtube]/g,'<iframe title="YouTube video player" width="480" height="320" src="http://www.youtube.com/embed/')
				aid=aid.replace(/\[YOUTUBE]/g,'<iframe title="YouTube video player" width="480" height="320" src="http://www.youtube.com/embed/')
				aid=aid.replace(/\[\/youtube]/g,'" frameborder="0" allowfullscreen></iframe>')
				aid=aid.replace(/\[\/YOUTUBE]/g,'" frameborder="0" allowfullscreen></iframe>') 
				//-----		
				//-----	emoticons
				aid=aid.replace(/:fag:/g,'<img src="http://i.imgur.com/t15MY.gif"></img>');
				aid=aid.replace(/:sisi:/g,'<img src="http://i.imgur.com/5DHU8.gif"></img>');
				aid=aid.replace(/:snob:/g,'<img src="http://i.imgur.com/kZP7x.gif"></img>');
				aid=aid.replace(/:uhlol:/g,'<img src="http://i.imgur.com/KqhVk.gif"></img>');
				aid=aid.replace(/:facepalm:/g,'<img src="http://i.imgur.com/AIlI9.gif"></img>');
				aid=aid.replace(/:rulez:/g,'<img src="http://i.imgur.com/U0jFz.gif"></img>');
				aid=aid.replace(/:look:/g,'<img src="http://i.imgur.com/LfKMk.gif"></img>');
				aid=aid.replace(/:rotfl:/g,'<img src="http://i.imgur.com/gM8k3.gif"></img>');
				aid=aid.replace(/:uhm:/g,'<img src="http://i.imgur.com/F7hdu.gif"></img>');
				aid=aid.replace(/:asd:/g,'<img src="http://i.imgur.com/3oNsi.gif"></img>');
				aid=aid.replace(/:lul:/g,'<img src="http://i.imgur.com/kKfKn.gif"></img>');
				aid=aid.replace(/:awesome:/g,'<img src="http://i.imgur.com/lEnmQ.png"></img>');
				aid=aid.replace(/:caffe:/g,'<img src="http://i.imgur.com/YpNXJ.gif"></img>');
				aid=aid.replace(/:vojo:/g,'<img src="http://i.imgur.com/0GrOE.gif"></img>');
				aid=aid.replace(/:smugdance:/g,'<img src="http://i.imgur.com/Dld7K.gif"></img>');
                                aid=aid.replace(/:smugfc:/g,'<img src="http://i.imgur.com/HmSLt.gif"></img>');
				aid=aid.replace(/:smugahr:/g,'<img src="http://i.imgur.com/CI40x.gif"></img>');
                                aid=aid.replace(/:smugnono:/g,'<img src="http://i.imgur.com/041NC.gif"></img>');
				aid=aid.replace(/:smugperv:/g,'<img src="http://i.imgur.com/4WfcQ.gif"></img>');
				aid=aid.replace(/:smugyeah:/g,'<img src="http://i.imgur.com/m1yEc.gif"></img>');
				aid=aid.replace(/:smuglol:/g,'<img src="http://i.imgur.com/9gE2K.gif"></img>');
				aid=aid.replace(/:rotolul:/g,'<img src="http://i.imgur.com/oL7kU.gif"></img>');
				aid=aid.replace(/:smugvaivia:/g,'<img src="http://i.imgur.com/AwxBl.gif"></img>');
				aid=aid.replace(/:gums:/g,'<img src="http://i.imgur.com/Ji9K6.gif"></img>');
				aid=aid.replace(/:smugpapa:/g,'<img src="http://i.imgur.com/QTBUS.gif"></img>');
				aid=aid.replace(/:nono:/g,'<img src="http://i.imgur.com/yZ1rZ.gif"></img>');
				aid=aid.replace(/:alesisi:/g,'<img src="http://i.imgur.com/5yI12.gif"></img>');
				aid=aid.replace(/:pippotto:/g,'<img src="http://i.imgur.com/mYOFn.gif"></img>');
				aid=aid.replace(/:mad:/g,'<img src="http://i.imgur.com/wLg2r.gif"></img>');
				aid=aid.replace(/:tsk:/g,'<img src="http://i.imgur.com/B1EmO.gif"></img>');
				aid=aid.replace(/:sbav:/g,'<img src="http://i.imgur.com/gqKTV.gif"></img>');
				aid=aid.replace(/:lock:/g,'<img src="http://i.imgur.com/cJxpM.gif"></img>');
				aid=aid.replace(/:chebotta:/g,'<img src="http://i.imgur.com/28cEh.gif"></img>');
				aid=aid.replace(/:picchia:/g,'<img src="http://i.imgur.com/ihfUp.gif"></img>');
				aid=aid.replace(/:baci:/g,'<img src="http://i.imgur.com/nwbmh.gif"></img>');
				aid=aid.replace(/:piange:/g,'<img src="http://i.imgur.com/Q5zHJ.gif"></img>');
				aid=aid.replace(/:perche:/g,'<img src="http://i.imgur.com/VwabR.gif"></img>');
				aid=aid.replace(/:solo:/g,'<img src="http://i.imgur.com/xpyNq.gif"></img>');
				aid=aid.replace(/:blabla:/g,'<img src="http://i.imgur.com/mHGiC.gif"></img>');
				aid=aid.replace(/:bua:/g,'<img src="http://i.imgur.com/ozLmV.gif"></img>');
				aid=aid.replace(/:moan:/g,'<img src="http://i.imgur.com/XAa7H.gif"></img>');
				aid=aid.replace(/:o/g,'<img src="http://i.imgur.com/az0Dv.gif"></img>');
				aid=aid.replace(/:jfs3:/g,'<img src="http://i.imgur.com/uy33k.gif"></img>');
				aid=aid.replace(/:vendetta/g,'<img src="http://i.imgur.com/e3SNJ.gif"></img>');
				aid=aid.replace(/:\|/g,'<img src="http://i.imgur.com/1dST9.gif"></img>');
				aid=aid.replace(/:telodicevo:/g,'<img src="http://i.imgur.com/2BPpS.gif"></img>');
				aid=aid.replace(/:prostro:/g,'<img src="http://i.imgur.com/4Kujk.gif"></img>');
				aid=aid.replace(/:wtf:/g,'<img src="http://i.imgur.com/yn6wC.gif"></img>');
				aid=aid.replace(/:psychocaffag:/g,'<img src="http://i.imgur.com/syFYF.gif"></img>');
				aid=aid.replace(/:cryfag:/g,'<img src="http://i.imgur.com/A90mb.gif"></img>');
				aid=aid.replace(/:psycho2:/g,'<img src="http://i.imgur.com/MugMk.gif"></img>');
				aid=aid.replace(/:timifag:/g,'<img src="http://i.imgur.com/527Xn.gif"></img>');
				aid=aid.replace(/:birra:/g,'<img src="http://i.imgur.com/iaitI.gif"></img>');
				aid=aid.replace(/:smugbox:/g,'<img src="http://i.imgur.com/0Fyx2.gif"></img>');
				aid=aid.replace(/:smugignore:/g,'<img src="http://i.imgur.com/bBcQW.gif"></img>');
				aid=aid.replace(/:smugplauso:/g,'<img src="http://i.imgur.com/2XWMJ.gif"></img>');
				aid=aid.replace(/:smugciao:/g,'<img src="http://i.imgur.com/qpfOK.gif"></img>');
				aid=aid.replace(/:smugnonsifa:/g,'<img src="http://i.imgur.com/3pPkb.gif"></img>');
				aid=aid.replace(/:smugjfs:/g,'<img src="http://i.imgur.com/aQNNu.gif"></img>');
				aid=aid.replace(/:smugrandom:/g,'<img src="http://i.imgur.com/X875R.gif"></img>');
				aid=aid.replace(/:smugjump:/g,'<img src="http://i.imgur.com/OxnpN.gif"></img>');
				aid=aid.replace(/:smugmazza:/g,'<img src="http://i.imgur.com/7bXYN.gif"></img>');
				aid=aid.replace(/:smugcacca:/g,'<img src="http://i.imgur.com/oVsey.gif"></img>');
				aid=aid.replace(/:smugjuggler:/g,'<img src="http://i.imgur.com/ERtiX.gif"></img>');
				aid=aid.replace(/:smugdunno:/g,'<img src="http://i.imgur.com/YtwK6.gif"></img>');
				aid=aid.replace(/:smugupdown:/g,'<img src="http://i.imgur.com/mxgMh.gif"></img>');
				aid=aid.replace(/:smug:/g,'<img src="http://i.imgur.com/vHgJa.gif"></img>');
				aid=aid.replace(/:bravobravissimo:/g,'<img src="http://i.imgur.com/WSXBl.gif"></img>');
				aid=aid.replace(/:cheers:/g,'<img src="http://i.imgur.com/V2I8q.gif"></img>');
				aid=aid.replace(/:timido:/g,'<img src="http://i.imgur.com/L20XY.gif"></img>');
				aid=aid.replace(/:mmh?:/g,'<img src="http://i.imgur.com/oqiS6.gif"></img>');
				aid=aid.replace(/:boh:/g,'<img src="http://i.imgur.com/jowaS.gif"></img>');
				aid=aid.replace(/:smugdance2:/g,'<img src="http://i.imgur.com/NNgS5.gif"></img>');
				aid=aid.replace(/:smugspia:/g,'<img src="http://i.imgur.com/1oBo7.gif"></img>');
				aid=aid.replace(/:cattivo:/g,'<img src="http://i.imgur.com/pKhEg.gif"></img>');
				aid=aid.replace(/:teach:/g,'<img src="http://i.imgur.com/vtXUB.gif"></img>');
				aid=aid.replace(/:sm:/g,'<img src="http://i.imgur.com/GMMWJ.gif"></img>');
				aid=aid.replace(/:popcorn:/g,'<img src="http://i.imgur.com/iBi2C.gif"></img>');
				aid=aid.replace(/:consola:/g,'<img src="http://i.imgur.com/xaTE1.gif"></img>');
				aid=aid.replace(/:smugbidon:/g,'<img src="http://i.imgur.com/KUDQQ.gif"></img>');
				aid=aid.replace(/:smugmarocco:/g,'<img src="http://i.imgur.com/ffr03.gif"></img>');
				aid=aid.replace(/:tremo:/g,'<img src="http://i.imgur.com/e5I4O.gif"></img>');
				aid=aid.replace(/:smugivan:/g,'<img src="http://i.imgur.com/zVtHb.gif"></img>');
				aid=aid.replace(/:terrore:/g,'<img src="http://i.imgur.com/oWXI5.gif"></img>');
				aid=aid.replace(/:schiuma:/g,'<img src="http://i.imgur.com/hKCdp.gif"></img>');
				aid=aid.replace(/:smugfatina:/g,'<img src="http://i.imgur.com/olHes.gif"></img>');
				aid=aid.replace(/:smugapple:/g,'<img src="http://i.imgur.com/HlUr8.gif"></img>');
				aid=aid.replace(/:smugchef:/g,'<img src="http://i.imgur.com/DTob2.gif"></img>');
				aid=aid.replace(/:smugbicchiere:/g,'<img src="http://i.imgur.com/7h5vx.gif"></img>');
				aid=aid.replace(/:smugmoonwalk:/g,'<img src="http://i.imgur.com/ij2tL.gif"></img>');
				aid=aid.replace(/:uhoh:/g,'<img src="http://i.imgur.com/QALOR.gif"></img>');
				aid=aid.replace(/:smugsnob:/g,'<img src="http://i.imgur.com/7nMWL.gif"></img>');
				aid=aid.replace(/:smugcaffe:/g,'<img src="http://i.imgur.com/7aFH0.gif"></img>');
				aid=aid.replace(/:smugbioparco:/g,'<img src="http://i.imgur.com/Y4iaG.gif"></img>');
				aid=aid.replace(/:smugfattelotu:/g,'<img src="http://i.imgur.com/Mx3x4.gif"></img>');
				aid=aid.replace(/:smugkillwithfire:/g,'<img src="http://i.imgur.com/EiwE6.gif"></img>');
				aid=aid.replace(/:smugpiove:/g,'<img src="http://i.imgur.com/5zAHt.gif"></img>');
				aid=aid.replace(/:smugpuke:/g,'<img src="http://i.imgur.com/7j7CY.gif"></img>');
				aid=aid.replace(/:smuglalala:/g,'<img src="http://i.imgur.com/6DhTn.gif"></img>');
				aid=aid.replace(/:smugloal:/g,'<img src="http://i.imgur.com/jvGWl.gif"></img>');
				aid=aid.replace(/:smugvojo:/g,'<img src="http://i.imgur.com/xHV9F.gif"></img>');
				aid=aid.replace(/:isteric:/g,'<img src="http://i.imgur.com/vNMtw.gif"></img>');
				aid=aid.replace(/:smugpalm:/g,'<img src="http://i.imgur.com/3XF7w.gif"></img>');
				aid=aid.replace(/:smugbotta:/g,'<img src="http://i.imgur.com/0Sh4A.gif"></img>');
				aid=aid.replace(/:moglie:/g,'<img src="http://i.imgur.com/5typh.gif"></img>');
				aid=aid.replace(/:eek:/g,'<img src="http://i.imgur.com/J3d52.gif"></img>');
				aid=aid.replace(/:eek2:/g,'<img src="http://i.imgur.com/PFS3J.gif"></img>');
				aid=aid.replace(/:ciaociao:/g,'<img src="http://i.imgur.com/reqsQ.gif"></img>');
				aid=aid.replace(/:fucksmug:/g,'<img src="http://i.imgur.com/kpx1K.gif"></img>');
				aid=aid.replace(/:ivanisteric:/g,'<img src="http://i.imgur.com/7Waoz.gif"></img>');
				aid=aid.replace(/:lol:/g,'<img src="http://i.imgur.com/NIH3L.gif"></img>');
				aid=aid.replace(/:smugtafazzi:/g,'<img src="http://i.imgur.com/pyyuw.gif"></img>');
				aid=aid.replace(/:smugbusiness:/g,'<img src="http://i.imgur.com/Wo4nP.gif"></img>');
				aid=aid.replace(/:smugverme:/g,'<img src="http://i.imgur.com/wpMMl.gif"></img>');
				aid=aid.replace(/:smuggnam:/g,'<img src="http://i.imgur.com/b3b9y.gif"></img>');
				aid=aid.replace(/:smugjetpuke:/g,'<img src="http://i.imgur.com/gduou.gif"></img>');
				aid=aid.replace(/:smugrosica:/g,'<img src="http://i.imgur.com/po3Q0.gif"></img>');
				aid=aid.replace(/:smugrip:/g,'<img src="http://i.imgur.com/q3LP1.gif"></img>');
				aid=aid.replace(/:smugpunk:/g,'<img src="http://i.imgur.com/laild.gif"></img>');
				aid=aid.replace(/:smugymca:/g,'<img src="http://i.imgur.com/YDDi9.gif"></img>');
				aid=aid.replace(/:smugteacher:/g,'<img src="http://i.imgur.com/OtHOD.gif"></img>');
				aid=aid.replace(/:smugteach:/g,'<img src="http://i.imgur.com/tnExl.gif"></img>');
				//-----		
				aryClassElements[i].innerHTML=aid;
		}

		var aryClassElements = document.getElementsByClassName( 'italic');
		for ( var i = 0; i < aryClassElements.length; i++ ) {
				aryClassElements[i].innerHTML='Image';
				aryClassElements[i].href='javascript:format(\'img\')\;';
		}
		var aryClassElements = document.getElementsByClassName( 'underline');
		for ( var i = 0; i < aryClassElements.length; i++ ) {
				aryClassElements[i].innerHTML='YouTube';
				aryClassElements[i].href='javascript:format(\'youtube\')\;';
		}
		var aryClassElements = document.getElementsByTagName( 'img');
		for ( var i = 0; i < aryClassElements.length; i++ ) {
				if (aryClassElements[i].alt=='gabi.2437') {
					aryClassElements[i].src='http://i.imgur.com/nGKRl.gif';
				}
		}			
	//}

