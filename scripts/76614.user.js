// ==UserScript==
// @name           eRepublik Emoticons
// @namespace      http://www.erepublik.com/*
// @description    eRepublik Emoticons
// @author		   megalomaniac
// @include        http://www.erepublik.com/*
// ==/UserScript==
	
	
	//if (document.getElementById('newspaper_id').value!=81) {
		// emoticons list
		var fag=' <img src="http://i.imgur.com/NsrY1.gif" onclick="document.getElementById(\'article_comment\').value+=\':fag:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var sisi=' <img src="http://i.imgur.com/Ko1LZ.gif" onclick="document.getElementById(\'article_comment\').value+=\':sisi:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var snob=' <img src="http://i.imgur.com/6h6Ge.gif" onclick="document.getElementById(\'article_comment\').value+=\':snob:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var look=' <img src="http://i.imgur.com/qJmfF.gif" onclick="document.getElementById(\'article_comment\').value+=\':look:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var facepalm=' <img src="http://i.imgur.com/UAuMG.gif" onclick="document.getElementById(\'article_comment\').value+=\':facepalm:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var asd=' <img src="http://i.imgur.com/HswDx.gif" onclick="document.getElementById(\'article_comment\').value+=\':asd:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var rotfl=' <img src="http://i.imgur.com/x2W9h.gif" onclick="document.getElementById(\'article_comment\').value+=\':rotfl:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var uhm=' <img src="http://i.imgur.com/gbtXE.gif" onclick="document.getElementById(\'article_comment\').value+=\':uhm:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var rulez=' <img src="http://i.imgur.com/fceHs.gif" onclick="document.getElementById(\'article_comment\').value+=\':rulez:\';document.getElementById(\'article_comment\').focus();"></img> ';
		//2
		var lul=' <img src="http://i.imgur.com/j2zwx.gif" onclick="document.getElementById(\'article_comment\').value+=\':lul:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var awesome=' <img src="http://i.imgur.com/1cvz5.gif" onclick="document.getElementById(\'article_comment\').value+=\':awesome:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var caffe=' <img src="http://i.imgur.com/0np2G.gif" onclick="document.getElementById(\'article_comment\').value+=\':caffe:\';document.getElementById(\'article_comment\').focus();"></img> ';
		var vojo=' <img src="http://i.imgur.com/BJRxj.gif" onclick="document.getElementById(\'article_comment\').value+=\':vojo:\';document.getElementById(\'article_comment\').focus();"></img> ';

		var aid='';
		var aryClassElements = getElementsByClassName( 'smallholder', document.body );
		for ( var i = 0; i < aryClassElements.length; i++ ) {
				aid=aryClassElements[i].innerHTML;
				//----- emoticons
				aid=aid.replace(/:fag:/g,'<img src="http://i.imgur.com/NsrY1.gif"></img>')
				aid=aid.replace(/:sisi:/g,'<img src="http://i.imgur.com/Ko1LZ.gif"></img>')
				aid=aid.replace(/:snob:/g,'<img src="http://i.imgur.com/6h6Ge.gif"></img>')
				aid=aid.replace(/:uhlol:/g,'<img src="http://i.imgur.com/IzFX2.gif"></img>') //*
				aid=aid.replace(/:facepalm:/g,'<img src="http://i.imgur.com/UAuMG.gif"></img>')
				aid=aid.replace(/:rulez:/g,'<img src="http://i.imgur.com/fceHs.gif"></img>')
				aid=aid.replace(/:look:/g,'<img src="http://i.imgur.com/qJmfF.gif"></img>')
				aid=aid.replace(/:rotfl:/g,'<img src="http://i.imgur.com/x2W9h.gif"></img>')
				aid=aid.replace(/:uhm:/g,'<img src="http://i.imgur.com/gbtXE.gif"></img>')
				aid=aid.replace(/:asd:/g,'<img src="http://i.imgur.com/HswDx.gif"></img>')
				//2
				aid=aid.replace(/:lul:/g,'<img src="http://i.imgur.com/j2zwx.gif"></img>')
				aid=aid.replace(/:awesome:/g,'<img src="http://i.imgur.com/1cvz5.png"></img>')
				aid=aid.replace(/:caffe:/g,'<img src="http://i.imgur.com/0np2G.gif"></img>')
				aid=aid.replace(/:vojo:/g,'<img src="http://i.imgur.com/BJRxj.gif"></img>')		
				aid=aid.replace(/:facecin:/g,'<img src="http://i.imgur.com/INFDw.gif"></img>') //*
				//-----
				aryClassElements[i].innerHTML=aid;
		}
		
		var aryClassElements = getElementsByClassName( 'padded', document.body );
		for ( var i = 0; i < aryClassElements.length; i++ ) {
			if (i>0) {
				aid=aryClassElements[i].innerHTML;
				//----- EN
				aid=aid.replace('Your comment','Your comment | Emoticons:' + fag + sisi + snob + look + facepalm + asd + rotfl + uhm + rulez + lul + awesome + caffe + vojo)
				//----- IT
				aid=aid.replace('Il tuo commento','Il tuo commento | Emoticons:' + fag + sisi + snob + look + facepalm + asd + rotfl + uhm + rulez + lul + awesome + caffe + vojo)
				//----- ES
				aid=aid.replace('Tu comentario','Tu comentario | Emoticons:' + fag + sisi + snob + look + facepalm + asd + rotfl + uhm + rulez + lul + awesome + caffe + vojo)
				
				aryClassElements[i].innerHTML=aid;
			} 
		}
		
		//document.getElementById('logo').innerHTML="<a href=http://www.erepublik.com/en title=eRepublik – Online Strategy Game><img src=http://i.imgur.com/pQLeK.gif></img></a>";

	//}

function getElementsByClassName( strClassName, obj ) {
    var ar = arguments[2] || new Array();
    var re = new RegExp("\\b" + strClassName + "\\b", "g");

    if ( re.test(obj.className) ) {
        ar.push( obj );
    }
    for ( var i = 0; i < obj.childNodes.length; i++ )
        getElementsByClassName( strClassName, obj.childNodes[i], ar );
    
    return ar;
}
