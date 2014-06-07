// ==UserScript==
// @name           Kaskus Emoticons For ERepublik
// @namespace      http://www.erepublik.com/
// @description    eRepublik Emoticons
// @author	   LordAeArc 
// @co-author      aldy505
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// @include        http://static.erepublik.com/*
// @version	   1.0.0
// ==/UserScript==
/*
function getVersion() {
	if (!$.browser.mozilla) {
		return;
	}
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/show/105156',
		onload: function(responseDetails) {
			var currVersion = VERSION.replace(/\./gi, '');
			var newVersion = $(responseDetails.responseText).find('#summary').html().split('<b>Version:</b>')[1].replace(/^\s+|\s+$/g, '').split('\n')[0];
			var nVersion = newVersion.replace(/\./gi, '');
			if (parseFloat(nVersion) > parseFloat(currVersion)) {
				$('.versionHolder').html('<a title="Update available! New version: v ' + newVersion + '" href="http://userscripts.org/scripts/show/80226" target="_blank" style="color: #ff0000; font-weight: bold;">v ' + VERSION + '</a>');
			}
		}
	});
} */
	
	//if (document.getElementById('newspaper_id').value!=81) {
	//var =' <img src="" onclick="document.getElementById(\'article_comment\').value+=\':\';document.getElementById(\'article_comment\').focus();" /> ';
		// emoticons list
		var Yb=' <img src="http://static.kaskus.us/images/smilies/s_sm_peace.gif" onclick="document.getElementById(\'article_comment\').value+=\':Yb\';document.getElementById(\'article_comment\').focus();" /> ';
		var b=' <img src="http://static.kaskus.us/images/smilies/s_sm_smile.gif" onclick="document.getElementById(\'article_comment\').value+=\':)b\';document.getElementById(\'article_comment\').focus();" /> ';
		var bata=' <img src="http://static.kaskus.us/images/smilies/s_sm_batamerah.gif" onclick="document.getElementById(\'article_comment\').value+=\':bata\';document.getElementById(\'article_comment\').focus();" /> ';
		var cendolb=' <img src="http://static.kaskus.us/images/smilies/s_sm_cendol.gif" onclick="document.getElementById(\'article_comment\').value+=\':cendolb\';document.getElementById(\'article_comment\').focus();" /> '; 
		var cendols=' <img src="http://static.kaskus.us/images/smilies/cendols.gif" onclick="document.getElementById(\'article_comment\').value+=\':cendols\';document.getElementById(\'article_comment\').focus();" /> ';
		var batas=' <img src="http://static.kaskus.us/images/smilies/batas.gif" onclick="document.getElementById(\'article_comment\').value+=\':batas\';document.getElementById(\'article_comment\').focus();" /> ';
		var iloveindonesias=' <img src="http://static.kaskus.us/images/smilies/iloveindonesias.gif" onclick="document.getElementById(\'article_comment\').value+=\':iloveindonesias\';document.getElementById(\'article_comment\').focus();" /> ';
		var cekpms=' <img src="http://static.kaskus.us/images/smilies/cekpms.gif" onclick="document.getElementById(\'article_comment\').value+=\':cekpms\';document.getElementById(\'article_comment\').focus();" /> ';
		var berdukas=' <img src="http://static.kaskus.us/images/smilies/berdukas.gif" onclick="document.getElementById(\'article_comment\').value+=\':berdukas\';document.getElementById(\'article_comment\').focus();" /> ';
		var capedes=' <img src="http://static.kaskus.us/images/smilies/capedes.gif" onclick="document.getElementById(\'article_comment\').value+=\':capedes\';document.getElementById(\'article_comment\').focus();" /> ';
		var bingungs=' <img src="http://static.kaskus.us/images/smilies/bingungs.gif" onclick="document.getElementById(\'article_comment\').value+=\':bingungs\';document.getElementById(\'article_comment\').focus();" /> ';
		var mahos=' <img src="http://static.kaskus.us/images/smilies/mahos.gif" onclick="document.getElementById(\'article_comment\').value+=\':mahos\';document.getElementById(\'article_comment\').focus();" /> ';
		var najiss=' <img src="http://static.kaskus.us/images/smilies/najiss.gif" onclick="document.getElementById(\'article_comment\').value+=\':najiss\';document.getElementById(\'article_comment\').focus();" /> ';
		var malus=' <img src="http://static.kaskus.us/images/smilies/malus.gif" onclick="document.getElementById(\'article_comment\').value+=\':malus\';document.getElementById(\'article_comment\').focus();" /> ';
		var ilovekaskuss=' <img src="http://static.kaskus.us/images/smilies/iluvkaskuss.gif" onclick="document.getElementById(\'article_comment\').value+=\':ilovekaskuss\';document.getElementById(\'article_comment\').focus();" /> ';
		var kisss=' <img src="http://static.kaskus.us/images/smilies/kisss.gif" onclick="document.getElementById(\'article_comment\').value+=\':kisss\';document.getElementById(\'article_comment\').focus();" /> ';
		var mads=' <img src="http://static.kaskus.us/images/smilies/mads.gif" onclick="document.getElementById(\'article_comment\').value+=\':mads\';document.getElementById(\'article_comment\').focus();" /> ';
		var ngakaks=' <img src="http://static.kaskus.us/images/smilies/ngakaks.gif" onclick="document.getElementById(\'article_comment\').value+=\':ngakaks\';document.getElementById(\'article_comment\').focus();" /> ';
		var sundulgans=' <img src="http://static.kaskus.us/images/smilies/sundulgans.gif" onclick="document.getElementById(\'article_comment\').value+=\':sundulgans\';document.getElementById(\'article_comment\').focus();" /> ';
		var takuts=' <img src="http://static.kaskus.us/images/smilies/takuts.gif" onclick="document.getElementById(\'article_comment\').value+=\':takuts\';document.getElementById(\'article_comment\').focus();" /> ';
		var senyum=' <img src="http://static.kaskus.us/images/smilies/sumbangan/15.gif" onclick="document.getElementById(\'article_comment\').value+=\':)\';document.getElementById(\'article_comment\').focus();" /> ';
		var biggrin=' <img src="http://static.kaskus.us/images/smilies/sumbangan/14.gif" onclick="document.getElementById(\'article_comment\').value+=\':D\';document.getElementById(\'article_comment\').focus();" /> ';
        var kotaknya=' <br /><div align="center" style="background:#F5F5FF; border: 1px solid #0B198C; padding:5px"> ' + Yb + b + bata + cendolb + cendols + batas + iloveindonesias + berdukas + capedes + bingungs + mahos + malus + kisss + mads + ngakaks + sundulgans + takuts + senyum + biggrin + ' <a href="http://userscripts.org/scripts/discuss/105156" target="_blank" title="Give us suggestion!">Give us suggestion!</a></div> ';

		var aid='';
                var aryClassElements = getElementsByClassName( 'smallholder', document.body );
		for ( var i = 0; i < aryClassElements.length; i++ ) {
				aid=aryClassElements[i].innerHTML;
				//----- emoticons
				//aid=aid.replace(/:/g,'<img src="" />')
				aid=aid.replace(/:Yb/g,'<img src="http://static.kaskus.us/images/smilies/s_sm_peace.gif" />')
				aid=aid.replace(/:)b/g,'<img src="http://static.kaskus.us/images/smilies/s_sm_smile.gif" />')
				aid=aid.replace(/:bata/g,'<img src="http://static.kaskus.us/images/smilies/s_sm_batamerah.gif" />')
				aid=aid.replace(/:cendolb/g,'<img src="http://static.kaskus.us/images/smilies/s_sm_cendol.gif" />')
				aid=aid.replace(/:cendols/g,'<img src="http://static.kaskus.us/images/smilies/cendols.gif" />')
				aid=aid.replace(/:batas/g,'<img src="http://static.kaskus.us/images/smilies/batas.gif" />')
				aid=aid.replace(/:iloveindonesias/g,'<img src="http://static.kaskus.us/images/smilies/iloveindonesias.gif" />')
				aid=aid.replace(/:cekpms/g,'<img src="http://static.kaskus.us/images/smilies/cekpms.gif" />') //*
				aid=aid.replace(/:berdukas/g,'<img src="http://static.kaskus.us/images/smilies/berdukas.gif" />')
				aid=aid.replace(/:capedes/g,'<img src="http://static.kaskus.us/images/smilies/capedes.gif" />')
				aid=aid.replace(/:bingungs/g,'<img src="http://static.kaskus.us/images/smilies/bingungs.gif" />')
				aid=aid.replace(/:mahos/g,'<img src="http://static.kaskus.us/images/smilies/mahos.gif" />')
				aid=aid.replace(/:najiss/g,'<img src="http://static.kaskus.us/images/smilies/najiss.gif" />')
				aid=aid.replace(/:malus/g,'<img src="http://static.kaskus.us/images/smilies/malus.gif" />')
				aid=aid.replace(/:ilovekaskuss/g,'<img src="http://static.kaskus.us/images/smilies/iluvkaskuss.gif" />')
				aid=aid.replace(/:kisss/g,'<img src="http://static.kaskus.us/images/smilies/kisss.gif" />')
				aid=aid.replace(/:mads/g,'<img src="http://static.kaskus.us/images/smilies/mads.gif" />')
				aid=aid.replace(/:ngakaks/g,'<img src="http://static.kaskus.us/images/smilies/ngakaks.gif" />')		
				aid=aid.replace(/:sundulgans/g,'<img src="http://static.kaskus.us/images/smilies/sundulgans.gif" />')
				aid=aid.replace(/:takuts/g,'<img src="http://static.kaskus.us/images/smilies/takuts.gif" />')
				aid=aid.replace(/:)/g,'<img src="http://static.kaskus.us/images/smilies/sumbangan/15.gif" />')
				aid=aid.replace(/:D/g,'<img src="http://static.kaskus.us/images/smilies/sumbangan/14.gif" />')
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

