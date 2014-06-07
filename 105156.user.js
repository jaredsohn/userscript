// ==UserScript==
// @name           Kaskus Emoticons for eRepublik 
// @namespace      http://www.erepublik.com/*
// @description    eRepublik Emoticons
// @author	   Originally by megalomaniac, Modified by LordAeArc 
// @include        http://www.erepublik.com/*
// ==/UserScript==
	
	
	//if (document.getElementById('newspaper_id').value!=81) {
		// emoticons list
		var cendols=' <img src="http://static.kaskus.us/images/smilies/cendols.gif" onclick="document.getElementById(\'article_comment\').value+=\':cendols\';document.getElementById(\'article_comment\').focus();"></img> ';
		var batas=' <img src="http://static.kaskus.us/images/smilies/batas.gif" onclick="document.getElementById(\'article_comment\').value+=\':batas\';document.getElementById(\'article_comment\').focus();"></img> ';
		var iloveindonesias=' <img src="http://static.kaskus.us/images/smilies/iloveindonesias.gif" onclick="document.getElementById(\'article_comment\').value+=\':iloveindonesias\';document.getElementById(\'article_comment\').focus();"></img> ';
		var cekpms=' <img src="http://static.kaskus.us/images/smilies/cekpms.gif" onclick="document.getElementById(\'article_comment\').value+=\':cekpms\';document.getElementById(\'article_comment\').focus();"></img> ';
		var berdukas=' <img src="http://static.kaskus.us/images/smilies/berdukas.gif" onclick="document.getElementById(\'article_comment\').value+=\':berdukas\';document.getElementById(\'article_comment\').focus();"></img> ';
		var capedes=' <img src="http://static.kaskus.us/images/smilies/capedes.gif" onclick="document.getElementById(\'article_comment\').value+=\':capedes\';document.getElementById(\'article_comment\').focus();"></img> ';
		var bingungs=' <img src="http://static.kaskus.us/images/smilies/bingungs.gif" onclick="document.getElementById(\'article_comment\').value+=\':bingungs\';document.getElementById(\'article_comment\').focus();"></img> ';
		var mahos=' <img src="http://static.kaskus.us/images/smilies/mahos.gif" onclick="document.getElementById(\'article_comment\').value+=\':mahos\';document.getElementById(\'article_comment\').focus();"></img> ';
		var najiss=' <img src="http://static.kaskus.us/images/smilies/najiss.gif" onclick="document.getElementById(\'article_comment\').value+=\':najiss\';document.getElementById(\'article_comment\').focus();"></img> ';
		//2
		var malus=' <img src="http://static.kaskus.us/images/smilies/malus.gif" onclick="document.getElementById(\'article_comment\').value+=\':malus\';document.getElementById(\'article_comment\').focus();"></img> ';
		var ilovekaskuss=' <img src="http://static.kaskus.us/images/smilies/iluvkaskuss.gif" onclick="document.getElementById(\'article_comment\').value+=\':ilovekaskuss\';document.getElementById(\'article_comment\').focus();"></img> ';
		var kisss=' <img src="http://static.kaskus.us/images/smilies/kisss.gif" onclick="document.getElementById(\'article_comment\').value+=\':kisss\';document.getElementById(\'article_comment\').focus();"></img> ';
		var mads=' <img src="http://static.kaskus.us/images/smilies/mads.gif" onclick="document.getElementById(\'article_comment\').value+=\':mads\';document.getElementById(\'article_comment\').focus();"></img> ';
		var ngakaks=' <img src="http://static.kaskus.us/images/smilies/ngakaks.gif" onclick="document.getElementById(\'article_comment\').value+=\':ngakaks\';document.getElementById(\'article_comment\').focus();"></img> ';
		var sundulgans=' <img src="http://static.kaskus.us/images/smilies/sundulgans.gif" onclick="document.getElementById(\'article_comment\').value+=\':sundulgans\';document.getElementById(\'article_comment\').focus();"></img> ';
		var takuts=' <img src="http://static.kaskus.us/images/smilies/takuts.gif" onclick="document.getElementById(\'article_comment\').value+=\':takuts\';document.getElementById(\'article_comment\').focus();"></img> ';
		var senyum=' <img src="http://static.kaskus.us/images/smilies/sumbangan/15.gif" onclick="document.getElementById(\'article_comment\').value+=\':senyum\';document.getElementById(\'article_comment\').focus();"></img> ';
		var biggrin=' <img src="http://static.kaskus.us/images/smilies/sumbangan/14.gif" onclick="document.getElementById(\'article_comment\').value+=\':DD\';document.getElementById(\'article_comment\').focus();"></img> ';
                var kotaknya=' </br><div align="center" style="background:#F5F5FF; border: 1px solid #0B198C; padding:5px"> ' + cendols + batas + iloveindonesias + berdukas + capedes + bingungs + mahos + malus + kisss + mads + ngakaks + sundulgans + takuts + senyum + biggrin + ' <font size="3" face="verdana" color="black">[<a href="http://www.kaskus.us/misc.php?do=getsmilies&editorid=vB_Editor_001" target="blank" title="Showing 10 smilie(s) of 159 total.">More</a>]</font> </div> ';

		var aid='';
                var aryClassElements = getElementsByClassName( 'smallholder', document.body );
		for ( var i = 0; i < aryClassElements.length; i++ ) {
				aid=aryClassElements[i].innerHTML;
				//----- emoticons
				aid=aid.replace(/:cendols/g,'<img src="http://static.kaskus.us/images/smilies/cendols.gif"></img>')
				aid=aid.replace(/:batas/g,'<img src="http://static.kaskus.us/images/smilies/batas.gif"></img>')
				aid=aid.replace(/:iloveindonesias/g,'<img src="http://static.kaskus.us/images/smilies/iloveindonesias.gif"></img>')
				aid=aid.replace(/:cekpms/g,'<img src="http://static.kaskus.us/images/smilies/cekpms.gif"></img>') //*
				aid=aid.replace(/:berdukas/g,'<img src="http://static.kaskus.us/images/smilies/berdukas.gif"></img>')
				aid=aid.replace(/:capedes/g,'<img src="http://static.kaskus.us/images/smilies/capedes.gif"></img>')
				aid=aid.replace(/:bingungs/g,'<img src="http://static.kaskus.us/images/smilies/bingungs.gif"></img>')
				aid=aid.replace(/:mahos/g,'<img src="http://static.kaskus.us/images/smilies/mahos.gif"></img>')
				aid=aid.replace(/:najiss/g,'<img src="http://static.kaskus.us/images/smilies/najiss.gif"></img>')
				aid=aid.replace(/:malus/g,'<img src="http://static.kaskus.us/images/smilies/malus.gif"></img>')
				//2
				aid=aid.replace(/:ilovekaskuss/g,'<img src="http://static.kaskus.us/images/smilies/iluvkaskuss.gif"></img>')
				aid=aid.replace(/:kisss/g,'<img src="http://static.kaskus.us/images/smilies/kisss.gif"></img>')
				aid=aid.replace(/:mads/g,'<img src="http://static.kaskus.us/images/smilies/mads.gif"></img>')
				aid=aid.replace(/:ngakaks/g,'<img src="http://static.kaskus.us/images/smilies/ngakaks.gif"></img>')		
				aid=aid.replace(/:sundulgans/g,'<img src="http://static.kaskus.us/images/smilies/sundulgans.gif"></img>')
				aid=aid.replace(/:takuts/g,'<img src="http://static.kaskus.us/images/smilies/takuts.gif"></img>')
				aid=aid.replace(/:senyum/g,'<img src="http://static.kaskus.us/images/smilies/sumbangan/15.gif"></img>')
				aid=aid.replace(/:DD/g,'<img src="http://static.kaskus.us/images/smilies/sumbangan/14.gif"></img>')	 //*
				//-----
				aryClassElements[i].innerHTML=aid;
		}
		
		var aryClassElements = getElementsByClassName( 'padded', document.body );
		for ( var i = 0; i < aryClassElements.length; i++ ) {
			if (i>0) {
				aid=aryClassElements[i].innerHTML;
				//----- EN
				aid=aid.replace('Your comment','Your comment:' + kotaknya) 
				
				aryClassElements[i].innerHTML=aid;
			} 
		}
		
		//document.getElementById('logo').innerHTML="<a href=http://www.erepublik.com/en title=eRepublik – Online Strategy Game><img src=http://i785.photobucket.com/albums/yy131/djnand/Kaskus.png></img></a>";

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

