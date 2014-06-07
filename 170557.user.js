// ==UserScript==
// @name           Fix Google Search Options
// @description    Google検索ツールをサイドバーへ移して表示します
// @namespace      http://vogel.at.webry.info/
// @include        http://*.google.*/search?*
// @include        https://*.google.*/search?*
// @include        http://*.google.*/images?*
// @include        https://*.google.*/images?*
// @grant          none
// @version        1.2.0
// ==/UserScript==

(function() {

    //lr:検索範囲
    function get_form_lr(){

        var list = ['lang_ja', 'lang_en',''];
        var strlist = ['日本語のページ', '英語のページ','ウェブ全体'];

        var baseurl = document.location.href.replace(/lr=([^&]+)&?/, '');
        var current = (RegExp.$1)? RegExp.$1 : '';
        var generateOption = function(v) {
            var i;
            var valuestr;
            for( i = 0 ; i < list.length ; i++ ){
                if( v == list[i] ){
                    valuestr = strlist[i];
                }
            }
            return '<option value="' + v + '"' 
                 + ((v == current)? ' selected="1"' : '') + '>' + valuestr + '</option>';
        };
        var opts = list.map(generateOption).join("\n");

        var func =  "var baseurl = document.location.href.replace(/&+lr=([^&]+|)(&+|$)/, '&');" + 
                    "baseurl = baseurl.replace( /\\?lr=.+?&/ , '?' );" + 
                    "var url = baseurl.replace(/https*:\\/\\/www\\.google\\.co\\.jp\\/search\\?/, 'search?');" + 
                    "url = url + '&lr=' + this.options[ this.selectedIndex ].value;" + 
                    "location.href = url;";
        return '<select style="width:110px" size="3" name="lr2" onchange="' + func + '">' + opts + '</select>';

    }


    
    //検索期間
    function get_form_qdr(){

        var list = ['', 'qdr%3Ah','qdr%3Ad','qdr%3Aw','qdr%3Am','qdr%3Am3','qdr%3Ay','qdr%3Ay3',];
        var strlist = ['期間指定なし','1 時間以内','24 時間以内','1 週間以内','1 か月以内','3 か月以内','1 年以内','3 年以内'];

        var baseurl = document.location.href.replace(/tbs=([^&]+)&?/, '');
        var currenttbs = (RegExp.$1)? RegExp.$1 : '';

        currenttbs = currenttbs.replace(/\:/, '%3A');
        notqdr_tbs = currenttbs.replace(/,?(qdr%3A[^&^,]+)[&,]?/, '');

        var currentqdr;
        if( notqdr_tbs == currenttbs ){
            currentqdr = '';
        }else{
            currentqdr = RegExp.$1;
        }
        currentqdr = currentqdr.replace(/%2C.+/, '');
        currentqdr = currentqdr.replace(/,.+/, '');

        var generateOption = function(v) {
            var i;
            var valuestr;
            for( i = 0 ; i < list.length ; i++ ){
                if( v == list[i] ){
                    valuestr = strlist[i];
                }
            }
            var newtbs;
            if( currenttbs == '' ){
                if( v == '' ){
                    newtbs = '';
                }else{
                    newtbs = 'tbs=' + v;
                }
            }else{
                if( currentqdr == '' ){
                    if( v == '' ){
                        newtbs = 'tbs=' + currenttbs;
                    }else{
                        newtbs = 'tbs=' + currenttbs + ',' + v;
                    }
                }else{
                    if( v == '' ){
                        newtbs = 'tbs=' + notqdr_tbs;
                    }else{
                        newtbs = 'tbs=' + notqdr_tbs + ',' + v;
                    }
                }
            }
            newtbs = newtbs.replace( /tbs=,/ , 'tbs=');
            return '<option value="' + newtbs
                + ((v == currentqdr)? '" selected="1"' : '"') + '>' + valuestr + '</option>';
        };
        var opts = list.map(generateOption).join("\n");

        var func =  "var baseurl = document.location.href.replace(/&+tbs=([^&]+|)(&+|$)/, '&');" + 
                    "var url = baseurl.replace(/https*:\\/\\/www\\.google\\.co\\.jp\\/search\\?/, 'search?');" + 
                    "url = url + '&' + this.options[ this.selectedIndex ].value;" + 
                    "location.href = url;";

        return '<select style="width:110px" size="8" name="qdr2" onchange="' + func + '">' + opts + '</select>';

    }



    function get_form_iXX( regstr , argstr , list , strlist ){

        var baseurl = document.location.href.replace(/tbs=([^&]+)&?/, '');
        var currenttbs = (RegExp.$1)? RegExp.$1 : '';

        currenttbs = currenttbs.replace(/\:/g, '%3A');
        currenttbs = currenttbs.replace(/,,/, ',');
        notiXX_tbs = currenttbs.replace( regstr , '' );

        var currentiXX;
        if( notiXX_tbs == currenttbs ){
            currentiXX = '';
        }else{
            currentiXX = RegExp.$1;
        }
        currentiXX = currentiXX.replace(/%2C.+/, '');
        currentiXX = currentiXX.replace(/,.+/, '');

        var generateOption = function(v) {
            var i;
            var valuestr;
            for( i = 0 ; i < list.length ; i++ ){
                if( v == list[i] ){
                    valuestr = strlist[i];
                }
            }
            var newtbs;
            if( currenttbs == '' ){
                if( v == '' ){
                    newtbs = '';
                }else{
                    newtbs = 'tbs=' + v;
                }
            }else{
                if( currentiXX == '' ){
                    if( v == '' ){
                        newtbs = 'tbs=' + currenttbs;
                    }else{
                        newtbs = 'tbs=' + currenttbs + ',' + v;
                    }
                }else{
                    if( v == '' ){
                        newtbs = 'tbs=' + notiXX_tbs;
                    }else{
                        newtbs = 'tbs=' + notiXX_tbs + ',' + v;
                    }
                }
            }
            newtbs = newtbs.replace( /tbs=,/ , 'tbs=');
            return '<option value="' + newtbs
                + ((v == currentiXX)? '" selected="1"' : '"') + '>' + valuestr + '</option>';
        };
        var opts = list.map(generateOption).join("\n");

        var func =  "var baseurl = document.location.href.replace(/&+tbs=([^&]+|)(&+|$)/, '&');" + 
                    "var url = baseurl.replace(/https*:\\/\\/www\\.google\\.co\\.jp\\/search\\?/, 'search?');" + 
                    "url = url + '&' + this.options[ this.selectedIndex ].value;" + 
                    "location.href = url;";

        return '<select style="width:110px" size="' + list.length + '" name="' + argstr + '2" onchange="' + func + '">' + opts + '</select>';

    }

    function get_form_imagesearch( type ){
		var str = "" , bstr;
		if( type == 1 ){
			bstr = "<br><br>";
		}else{
			bstr = "<br>";
		}

		str = "<div style=\"position:fixed;margin-left:0px; margin-top:100px; display\"><form>" + 
				get_form_iXX( /(isz%3A[^&^,]+)[&]?/ , 'isz' , ['', 'isz%3Al','isz%3Am','isz%3Ai'],['すべてのサイズ','大','中','アイコンサイズ']) + 
				bstr + 
				get_form_iXX(/(ic%3A[^&^,]+)[&]?/ , 'ic' , ['', 'ic%3Acolor','ic%3Agray','ic%3Atrans'],['すべての色','フルカラー','白黒','透明']) + 
				bstr + 
				get_form_iXX(/(itp%3A[^&^,]+)[&]?/ , 'itp' , ['', 'itp%3Aface','itp%3Aphoto','itp%3Aclipart','itp%3Alineart','itp%3Aanimated'],['すべての種類','顔','写真','クリップアート','線画','アニメーション']) + 
				bstr + 
				get_form_iXX(/(qdr%3A[^&^,]+)[&]?/ , 'qdr' , ['', 'qdr%3Ah','qdr%3Ad','qdr%3Aw','qdr%3Am','qdr%3Am3','qdr%3Ay','qdr%3Ay3',],['期間指定なし','1 時間以内','24 時間以内','1 週間以内','1 か月以内','3 か月以内','1 年以内','3 年以内']) + 
				"</form></div>";
		return str;
    }


	if( document.URL.indexOf("sout=1") >=0 && ( document.URL.indexOf("tbm=isch") >= 0 || document.URL.indexOf("/images?") >=0 ) ){
		// https://www.google.co.jp/search?q=....&tbm=isch&sout=1
		// https://www.google.co.jp/images?q=....&sout=1
		// search with image search option for firefox
		// search with image search option for chrome
		// search with image search option for IE
		var style = document.createElement("style");
		style.setAttribute( "type" , "text/css" );
		style.appendChild( document.createTextNode("") );
		document.getElementsByTagName("head")[0].appendChild(style);
		style.sheet.insertRule("#tbd {display:none !important;}" , style.sheet.cssRules.length );
		style.sheet.insertRule("#leftnav div .q {display:none !important;}" , style.sheet.cssRules.length );
		with(document.getElementById('logo').parentNode) { innerHTML = innerHTML + get_form_imagesearch(1) };
	}else if( document.URL.indexOf("site=imghp") >=0 || document.URL.indexOf("tbm=isch") >= 0 ){
		// https://www.google.co.jp/search?q=....&tbm=isch
		// search with image search option for firefox
		// search with image search option for chrome
		// search with image search option for IE
		var style = document.createElement("style");
		style.setAttribute( "type" , "text/css" );
		style.appendChild( document.createTextNode("") );
		document.getElementsByTagName("head")[0].appendChild(style);
		style.sheet.insertRule("#center_col {margin-left:130px !important;}" , style.sheet.cssRules.length );
        with(document.getElementById('gbq1')) { innerHTML = innerHTML + get_form_imagesearch(0)};
    }else if( document.getElementById('logo') ){
		// https://www.google.co.jp/search?q=....
		// search for firefox
		with(document.getElementById('logo').parentNode) { innerHTML = innerHTML + "<div style=\"position:fixed;margin-left:0px; margin-top:100px; display\"><form>" + get_form_lr() + "<br><br>" + get_form_qdr() + "</form></div>"};
	}else if( document.getElementById('logocont') ){
		with(document.getElementById('logocont')) { innerHTML = innerHTML + "<div style=\"position:fixed;margin-left:0px; margin-top:100px; display\"><form>" + get_form_lr() + "<br><br>" + get_form_qdr() + "</form></div>"};
	}else if( document.getElementById('gbq1') && document.URL.indexOf("/images?") >=0 ){
		// https://www.google.co.jp/images?q=....
		// image search for firefox
		// image search for chrome
		// image search for IE
		var style = document.createElement("style");
		style.setAttribute( "type" , "text/css" );
		style.appendChild( document.createTextNode("") );
		document.getElementsByTagName("head")[0].appendChild(style);
		style.sheet.insertRule("#center_col {margin-left:130px !important;}" , style.sheet.cssRules.length );
		with(document.getElementById('gbq1')) { innerHTML = innerHTML + get_form_imagesearch(0)};
	}else if( document.getElementById('gbq1') ){
		// https://www.google.co.jp/search?q=....
		// search for chrome
		// search for IE
		with(document.getElementById('gbq1')) { innerHTML = innerHTML + "<div style=\"position:fixed;margin-left:0px; margin-top:100px; display\"><form>" + get_form_lr() + "<br><br>" + get_form_qdr() + "</form></div>"};
	}else{
	}
})();




