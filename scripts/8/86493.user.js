// ==UserScript==
// @name           eRepublik HKGOLDEN Icons
// @namespace      http://www.erepublik.com/*
// @description    Base on "eRepublik Emoticons"
// @author		   Roger Chan
// @include        http://www.erepublik.com/*
// ==/UserScript==	
	
	//if (document.getElementById('newspaper_id').value!=81) {
		// emoticons list
		var ange=' <img src="http://imgur.com/NXkMo.gif" onclick="document.getElementById(\'article_comment\').value+=\'[ange]\';document.getElementById(\'article_comment\').focus();"></img> ';
		var agree=' <img src="http://imgur.com/1Rzue.gif" onclick="document.getElementById(\'article_comment\').value+=\':[agree]\';document.getElementById(\'article_comment\').focus();"></img> ';
		var smile=' <img src="http://imgur.com/CDT4U.gif" onclick="document.getElementById(\'article_comment\').value+=\':[smile]\';document.getElementById(\'article_comment\').focus();"></img> ';
		var rabbit=' <img src="http://imgur.com/DZUCk.gif" onclick="document.getElementById(\'article_comment\').value+=\'[rabbit]\';document.getElementById(\'article_comment\').focus();"></img> ';
		var ass=' <img src="http://imgur.com/NBEAS.gif" onclick="document.getElementById(\'article_comment\').value+=\'[ass]\';document.getElementById(\'article_comment\').focus();"></img> ';
		var sosad=' <img src="http://imgur.com/YKBNQ.gif" onclick="document.getElementById(\'article_comment\').value+=\'[sosad]\';document.getElementById(\'article_comment\').focus();"></img> ';
		var hoho=' <img src="http://imgur.com/25uYX.gif" onclick="document.getElementById(\'article_comment\').value+=\'hoho\';document.getElementById(\'article_comment\').focus();"></img> ';
		var mooncake=' <img src="http://imgur.com/LFH2Q.gif" onclick="document.getElementById(\'article_comment\').value+=\'[mooncake]\';document.getElementById(\'article_comment\').focus();"></img> ';
		var kill=' <img src="http://imgur.com/0kIKM.gif" onclick="document.getElementById(\'article_comment\').value+=\'[kill]\';document.getElementById(\'article_comment\').focus();"></img> ';
		//2
		var bye=' <img src="http://imgur.com/kgYKp.gif" onclick="document.getElementById(\'article_comment\').value+=\'[bye]\';document.getElementById(\'article_comment\').focus();"></img> ';
		var banghead=' <img src="http://imgur.com/iwgD7.gif" onclick="document.getElementById(\'article_comment\').value+=\'banghead\';document.getElementById(\'article_comment\').focus();"></img> ';
		var bouncer=' <img src="http://imgur.com/kTKav.gif" onclick="document.getElementById(\'article_comment\').value+=\'[bouncer]\';document.getElementById(\'article_comment\').focus();"></img> ';
		var yipes=' <img src="http://imgur.com/KXG5b.gif" onclick="document.getElementById(\'article_comment\').value+=\'[yipes]\';document.getElementById(\'article_comment\').focus();"></img> ';
                var bomb=' <img src="http://imgur.com/DoUwy.gif" onclick="document.getElementById(\'article_comment\').value+=\'[bomb]\';document.getElementById(\'article_comment\').focus();"></img> ';
                var offtopic=' <img src="http://imgur.com/sDoUk.gif" onclick="document.getElementById(\'article_comment\').value+=\'[offtopic]\';document.getElementById(\'article_comment\').focus();"></img> ';
                var play=' <img src="http://imgur.com/31w6B.gif" onclick="document.getElementById(\'article_comment\').value+=\'[play]\';document.getElementById(\'article_comment\').focus();"></img> ';
                var :o) =' <img src="http://imgur.com/J82Yg.gif" onclick="document.getElementById(\'article_comment\').value+=\':o)\';document.getElementById(\'article_comment\').focus();"></img> ';		                  
                
                var aid='';
		var aryClassElements = getElementsByClassName( 'smallholder', document.body );
		for ( var i = 0; i < aryClassElements.length; i++ ) {
				aid=aryClassElements[i].innerHTML;
				//----- emoticons
				aid=aid.replace(/[ange]/g,'<img src="http://imgur.com/NXkMo.gif"></img>')
				aid=aid.replace(/[angre]/g,'<img src="http://imgur.com/1Rzue.gif"></img>')
				aid=aid.replace(/[smile]/g,'<img src="http://imgur.com/CDT4U.gif"></img>')
				aid=aid.replace(/[rabbit]/g,'<img src="http://imgur.com/DZUCk.gif"></img>') //*
				aid=aid.replace(/[ass]/g,'<img src="http://imgur.com/NBEAS.gif"></img>')
				aid=aid.replace(/[sosad]/g,'<img src="http://imgur.com/YKBNQ.gif"></img>')
				aid=aid.replace(/[hoho]/g,'<img src="http://imgur.com/25uYX.gif"></img>')
				aid=aid.replace(/[mooncake]/g,'<img src="http://imgur.com/LFH2Q.gif"></img>')
				aid=aid.replace(/[kill]/g,'<img src="http://imgur.com/0kIKM.gif"></img>')
				//2
				aid=aid.replace(/[bye]/g,'<img src="http://imgur.com/kgYKp.gif"></img>')
				aid=aid.replace(/[banghead]/g,'<img src="http://imgur.com/iwgD7.gif"></img>')
				aid=aid.replace(/[bouncer]/g,'<img src="http://imgur.com/kTKav.gif"></img>')
				aid=aid.replace(/[yipes]/g,'<img src="http://imgur.com/KXG5b.gif"></img>')		
				aid=aid.replace(/[bomb]/g,'<img src="http://imgur.com/DoUwy.gif"></img>')
                                aid=aid.replace(/[offtopic]/g,'<img src="http://imgur.com/sDoUk.gif"></img>')
                                aid=aid.replace(/[play]/g,'<img src="http://imgur.com/31w6B.gif"></img>')
                                aid=aid.replace(/:o)/g,'<img src="http://imgur.com/J82Yg.gif"></img>') //*
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
				aryClassElements[i].innerHTML=aid;
			} 
		}
		
		document.getElementById('logo').innerHTML="<a href=http://www.erepublik.com/en title=eRepublik – Online Strategy Game><img src=http://i.imgur.com/pQLeK.gif></img></a>";

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