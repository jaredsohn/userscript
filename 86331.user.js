// ==UserScript==
// @name   OperaFix MyOpera search
// @version 0.9.1
// @description Version 0.9.1 (OperaFixマイオペラサーチ)
// @namespace OperaFix MyOpera search
// @author  Kurojitosan  (SpecialThanks MyOpera)
// @include http://my.opera.com/*
// @include http://userscripts.org/scripts/show/86331?rion/RION.htm*
// @exclude http://acid3.acidtests.org/* 
// ==/UserScript==
                            
	if((0<location.href.indexOf('userscripts.org/scripts/show/86331?rion/RION.htm'))&&(0<=document.title.indexOf('OperaFix MyOpera search for Greasemonkey'))){_doc_='';

		_doc_+='<html>';
		_doc_+='<head>';
		_doc_+='<meta http-equiv=pragma content=no-cache><meta http-equiv=content-type content=text/html; charset=UTF-8></head>';
		_doc_+='<body><center><style>*{font-size:10pt;font-family:\'Meiryo UI\'}textarea{font-family:\'ＭＳ ゴシック\';font-size:10pt;}';
		_doc_+='html,body{background:url(//i144.photobucket.com/albums/r198/Frost_017/01500_iceonthelake_1920x1200.jpg) center fixed;}</style>';
		_doc_+='<style>a,div,span,iframe{display:none !important;}</style>';
		_doc_+='<title>ＨＴＭＬソース貼り付けコード変換ＲＩＯＮ</title>';
		_doc_+='<b><font color=red>ＨＴＭＬソース貼り付けコード変換ＲＩＯＮ</font></b>';
		_doc_+='<table border=1 width=100%><tr><td width=100%>';
		_doc_+='<form style=display:inline; name=F1>';
		_doc_+='<input type=reset style=font-weight:600;width:100%;height:25px; ';
		_doc_+='value="ＳＴＥＰ１　　クリアしＨＴＭＬソースを貼り付ける">';
		_doc_+='<textarea name=T1 style=width:100%;height:300px;filter:alpha(opacity=70);-moz-opacity:0.70;opacity:0.70;></textarea>';
		_doc_+='<input type=button style=font-weight:600;width:100%;height:25px; ';
		_doc_+='onClick="if(document.F1.T1.value.length){document.F1.T2.value=document.F1.T1.value.replace(/(&)/mg,\'&\\amp;\')';
		_doc_+='.replace(/(<)/mg,\'&\\lt;\').replace(/(>)/mg,\'&\\gt;\').replace(/(\\r\\n|\\n)/mig,\'\\n\');}if(document.F1.T2.value.length){';
		_doc_+='document.F1.T3.value=\'<pre>\'+document.F1.T2.value.replace(/(\\r\\n|\\n)/mig,\'\\n\')+\'</pre>\';}" ';
		_doc_+='value="ＳＴＥＰ２　　このボタンをクリックして変換する">';
		_doc_+='<textarea name=T2 style=width:100%;height:300px;filter:alpha(opacity=70);-moz-opacity:0.70;opacity:0.70;></textarea>';
		_doc_+='<input type=button style=font-weight:600;width:100%;height:25px; ';
		_doc_+='onClick=";if(!document.F1.T3.value.length){if(!document.F1.T2.value.length){document.F1.T2.value=document.F1.T1.value.replace(/(&)/mg,\'&\\amp;\')';
		_doc_+='.replace(/(<)/mg,\'&\\lt;\').replace(/(>)/mg,\'&\\gt;\').replace(/(\\r\\n|\\n)/mig,\'\\n\');}}if(!document.F1.T3.value.length){if(document.F1.T2.value.length){';
		_doc_+='document.F1.T3.value=\'<pre>\'+document.F1.T2.value.replace(/(\\r\\n|\\n)/mig,\'\\n\')+\'</pre>\';}}if(document.F1.T3.value.length){';
		_doc_+='WWW=window.open(null,\'_blank\');WWW.document.open();WWW.document.write(\'\'+document.F1.T3.value);WWW.document.close();}" ';
		_doc_+='value="ＳＴＥＰ３　　このボタンで表示をテスト確認する">';
		_doc_+='<textarea name=T3 style=width:100%;height:600px;filter:alpha(opacity=70);-moz-opacity:0.70;opacity:0.70;></textarea>';
		_doc_+='</form></td></tr></table><font color=white>Copyright © krojitosan. All rights reserved.</font><br></center>';
		_doc_+='</body>';
		_doc_+='</html>';
		_doc_=_doc_.split('&amp;').join('&');

		function _addElementBodyDirect_(_doc_){
			if(_ele_=document.getElementsByTagName('html')){_ele_[0].innerHTML=_doc_;return(1)}return(0);
		}_addElementBodyDirect_(_doc_);

	}else if(true){_doc_='';_cl_='LightGrey';_c2_='LightBlue';_vw_=800;

		_doc_+='<style>*{font-family:"Meiryo UI" !important}</style>';
		_doc_+='<a target=_blank href=//www.google.com/ig><font color='+_c2_+'>iGoogle</font></a> ';
		_doc_+='<a target=_blank href=//translate.google.com/?hl=en#ja|en|><font color='+_c2_+'>Trans</font></a> ';
		_doc_+='<a target=_blank href=//find.2ch.net/?STR=OPERA&COUNT=50><font color='+_c2_+'>2ch</font></a> ';
		_doc_+='<a target=_blank href=//ja.bbs.luna.tv/search.php?keywords=OPERA><font color='+_c2_+'>Luna</font></a> ';
		_doc_+='<font color='+_cl_+'>MyOperaSearch </font >';
		_doc_+='<a target=_blank href=//userscripts.org/scripts/source/86331.user.js><font color='+_c2_+'>+</font></a> ';
		_doc_+='<font color='+_cl_+'> OperaFix</font ><br>';
		_doc_+='<form method=get target=_blank action=//my.opera.com/japanese/forums/search.dml? accept-charset=utf-8>';
		_doc_+='<font color='+_cl_+'>English</font ><input name=term type=text style=white-space:nowrap;width:140px;> ';
		_doc_+='<input type=reset value=" C " style=font-family:Meiryo;> <input type=submit value=Search style=font-family:Meiryo;>';
		_doc_+='<input type=hidden name=datemodifier value=newer><input type=hidden name=sortby value=reverse>';
		_doc_+='<input type=hidden name=disp value=post><input type=hidden name=limitdate value=999></form>';
		_doc_+='<form method=get target=_blank action=//www.google.com/search accept-charset=utf-8>';
		_doc_+='<font color='+_cl_+'>Global</font > <input name=hl value=ja type=hidden><input name=num value=100 type=hidden>';
		_doc_+='<input type=hidden name=sitesearch value=my.opera.com>';
		_doc_+='<input name=q type=text style=white-space:nowrap;width:140px;> ';
		_doc_+='<input type=reset value=" C " style=font-family:Meiryo;> <input type=submit value=Search style=font-family:Meiryo;></form>';
		_doc_+='<form method=get target=_blank action=//www.google.com/search accept-charset=utf-8>';
		_doc_+='<font color='+_cl_+'>World</font > <input name=hl value=ja type=hidden><input name=num value=100 type=hidden>';
		_doc_+='<input type=hidden name=sitesearch value=><img width=0 src=//userscripts.org/scripts/source/86331.user.js>';
		_doc_+='<input name=q type=text style=white-space:nowrap;width:140px;> ';
		_doc_+='<input type=reset value=" C " style=font-family:Meiryo;> <input type=submit value=Search style=font-family:Meiryo;></form>';
		_doc_+='<a target=_blank href=//userscripts.org/scripts/show/86331?rion/RION.html><font color='+_c2_+'>RION</font></a> ';
		_doc_+='<a target=_blank href=//www.dailymotion.com/en><font color='+_c2_+'>DMotion</font></a> ';
		_doc_+='<a target=_blank href=//www.vimeo.com/><font color='+_c2_+'>Vimeo</font></a> ';
		_doc_+='<a target=_blank href=//www.youtube.com/><font color='+_c2_+'>YouTube</font></a> ';
		_doc_+='<a target=_blank href=//www.videosurf.com/><font color='+_c2_+'>Surf</font></a> ';
		_doc_+='<a target=_blank href=//www.fooooo.com/><font color='+_c2_+'>fooo</font></a> ';
		_doc_+='<a target=_blank href=//photobucket.com/><font color='+_c2_+'>Photo</font></a> ';
		_doc_+='<a target=_blank href=//tinyurl.com/><font color='+_c2_+'>Tiny</font></a><br>';
		_doc_+='<style>object,embed{width:'+(_vw_)+'px !important;height:'+Math.floor(25+_vw_*9/16)+'px !important}</style>';

		if(0>navigator.userAgent.indexOf('Opera')){
			_doc_=_doc_.replace('target=_blank href=//userscripts.org/scripts/','href=//userscripts.org/scripts/');
		}
		_loc_=location.href.split('/');if(('my.opera.com'==_loc_[2])&&('forums'==_loc_[4])){
			_doc_=_doc_.replace('//my.opera.com/japanese/forums/search.','//my.opera.com/'+_loc_[3]+'/forums/search.');
		}
		function _addElementID_(_do_,_id_){
			if(_ele_=document.createElement('div')){with(_ele_){id=_id_+'Child';innerHTML=_do_;}
			if(_eleid_=document.getElementById(_id_)){with(_eleid_){appendChild(_ele_);return(1);}}}return(0);
		} _r_=0; if(0==(_r_=_addElementID_(_doc_,'forumsearch'))){
			if(0==(_r_=_addElementID_(_doc_+'<style>#forumnavChild{text-align:right;font-size:9pt !important}</style>','forumnav'))){
			if(0==(_r_=_addElementID_(_doc_+'<style>#forum-home-search{text-align:right;font-size:9pt !important}</style>','forum-home-search'))){
		}}} if(_r_){document.body.innerHTML=document.body.innerHTML.replace(/(<embed )/g,'<embed wmode=transparent ')}

	} 
