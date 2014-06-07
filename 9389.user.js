// ==UserScript==
// @name           key_search.1.1.js
// @namespace      perlnamehoge@gmail.com
// @discription    Google-Search-Result-Window operate only keyboard.
// @include        http://www.google.*/search*
// ==/UserScript==

(function () {
    var extend = function ( source, destination ) {
        for ( var i in destination ) {
            source[i] = destination[i];
        }
        return source;
    }
    extend(Function.prototype, {
        setSummary : function ( summary ) {
            if ( typeof this.summary == "undefined" )
               this.summary = summary || "";
            return this;
        },
        getSummary : function () {
            return ( this.summary )
                    ? this.summary
                    : "説明文はありません"
        },
        _bind : function () {
            var _self = arguments[0], _call = this;
            return function () {
                return _call.apply( _self );
            }        
        }
    });
    var $ = function ( id ) {
        if ( !this.cache ) this.cache = {};
        try {
          return this.cache[id] || (this.cache[id] = document.getElementById(id));
        } catch (e) {
          return document.getElementById(id);
        }
    }
    var $K = function ( key_code ) {
        return String.fromCharCode( key_code );
    }
    var get_url = function (step) {
        var url = (location.href.replace( /(start=)(\d+)/, "$1" + (function () {
            try {
                return Math.max( +((location.href.match(/start=(\d+)/)).pop()) + step, 0);
            } catch (e) {
                return 0;
            }
        })())).replace(/(#+)([1-9]{1}[0-9]{0,})/, function () {
               return ( step > 0 ) ? RegExp.$1.concat(1) : RegExp.$1.concat( Math.abs(step) );
        });
        return ( url.indexOf("start=", 0) == -1 && step > 0 )
               ? url.replace(/(search\?)/, "$1start=" + Math.abs( step ) + "&")
               : ( location.href == url )
                 ? url.substring(0, url.indexOf("#"))
                 : url
    }
    var get_num = function () {
        try {
            return +(location.href.match(/num=(\d+)/).pop());
        } catch (e) {
            return 10;
        }
    }
    var get_location_hash = function () {
        return +( location.hash.replace(/#/, "") ) || 1;
    }
    var isBottom = function () {
        var pos = gpos();
        parent.scrollBy(0, 1);
        return (gpos() == pos);
    }
    var gpos = function () {
        return document.body.scrollTop || document.documentElement.scrollTop;
    }
    var disable_input_box = function () {
        document.getElementsByTagName("form")["0"].setAttribute("id", "gform");
        var inputs = document.getElementsByTagName("input");
        for ( var i = 0; i < inputs.length; i++) {
            switch ( inputs[i].type ) {
               case "text" :
                    if ( !$("q") )
                        inputs[i].setAttribute("id", "q");
                    inputs[i].addEventListener("focus", function () {
                        config.disabled = true;
                    }, false);
                    inputs[i].addEventListener("blur", function () {
                        config.disabled = false;
                    }, false);
               break;
            }
        }
    }
    var add_focus_image = function () {
        var divs = document.getElementsByTagName("div");
        for ( var i = 0, j = 1; i < divs.length; i++) {
            if ( divs[i].className == "g" ) {
                var img = document.createElement("img");
                img.setAttribute("src", "http://mail.google.com/mail/images/chevron.gif");
                img.style.cssText = "-moz-opacity: 0.3; padding-right:10px;";
                img.setAttribute("id", j);
                divs[i].insertBefore(img, divs[i].firstChild);
                add_link_info.call( this, divs[i] , j);
                j++;
            }
        }
    }
    var add_link_info = function ( target, target_id ) {
        var _links  = target.getElementsByTagName("a");
        var _target = $( ( target_id ).toString() );
        for ( var i = 0, j = 1; i < _links.length; i++) {
            var link = _links[i].href;
            switch ( _links[i].className ) {
                case "l" :
                    _target.setAttribute("title", link );
                    _links[i].setAttribute("id", "title_" + target_id  );
                    _links[i].addEventListener("focus", function () {
                        this.style.cssText = "border: 1px solid #7777CC;";
                    }, false);
                    _links[i].addEventListener("blur", function () {
                        this.style.cssText = "";
                    }, false);
                    _links[i].addEventListener("click", function () {
                        var _old        = config.item_pos;
                        config.item_pos = this.id.replace(/title_/, "");
                        move_focus( _old, config.item_pos);
                        view_item();
                    }, false);
                break;
                case "fl" :
                    if ( link.match(/^(http:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\/search\?.*)/) ) {
                        _target.setAttribute("lang", link);
                    }
                    else if ( link.match(new RegExp("^(http://" + location.host + "/.*?)(related:.*)", "")) ) {
                        _target.setAttribute("alt", link);
                    }
                break;
            }
        }
    }
    var move_focus = function ( old, target ) {
        var filter = (function () {
            return {
                   up : function ( _css ) {
                      return _css.replace(/(0.3);/, "1;");
                   },
                   down : function ( _css ) {
                      return _css.replace(/(1);/, "0.3;");
                   }
            }
        })();
        if ( old && ( this._old = $( old.toString() )) ) {
            this._old.style.cssText = filter.down( this._old.style.cssText );
        }
        if ( target && (this._target = $( target.toString() )) ) {
            this._target.style.cssText = filter.up( this._target.style.cssText );
            $( "title_" + target ).focus();
        }
    }
    var add_event_handler = function () {
        document.addEventListener("keypress", function (e) {
            if ( config.disabled )
                 return false;
            if ( e.ctrlKey )
                 return false;
            if ( typeof key_map[ $K( e.which ) ] == "function" )
                 return key_map[ $K( e.which ) ](e);
            if ( typeof special_key_map[ e.which ] == "function" )
                 return special_key_map[ e.which ](e);
        }, false);
    }
    // initialize_function
    var ime_off = function () {
       var half  = gpos() + ( document.body.clientHeight / 2 );
       var input = document.createElement("input");
       input.setAttribute("type", "password");
       input.style.cssText = "width:0px; position:absolute; top:" + half + "px; left:0px;";
       document.body.appendChild(input);
       input.focus();
       var _t = setTimeout(function () {
          document.body.removeChild(input);
          clearTimeout( _t );
       }, 1);
    }
    var recover_position = function () {
       return setTimeout(function () {
           move_focus( 0 , get_location_hash() );
       }, 1);
    }
    // make config
    var config = {
        disabled : false,
        item_pos : get_location_hash(),
        interval : 300
    }
    // 
    var move_scroll_page = function (e) {
        if ( e.location_href = ( e.shiftKey && gpos() == 0 )
          ? get_url( -(get_num()) )
          : ( !e.shiftKey && isBottom() )
            ? get_url( get_num() )
            : false ) location.href = e.location_href;
    }
    var forward_item = function () {
        if ( config.item_pos == get_num() ) {
            if ( location.hash == "" ) location.hash = 1;
            location.href = get_url( get_num() );
        } else {
            if ( $( (config.item_pos + 1).toString() ) ) 
               move_focus( config.item_pos++, config.item_pos );
        }
    }.setSummary("アイテムのフォーカス位置を一つ下に進めます。もしもフォーカスの位置が一番下のアイテムにある状態でこの関数が実行されると、自動的に次のページへと移動します。移動後のフォーカス位置は先頭となります。");

    var backward_item = function () {
        if ( config.item_pos == 1 ) {
            if ( location.hash == "" ) location.hash = get_num();
            location.href = get_url( -(get_num()) );
        } else {
            move_focus( config.item_pos--, config.item_pos );
        }
    }.setSummary("アイテムのフォーカス位置を一つ上に進めます。もしもフォーカスの位置が一番先頭のアイテムにある状態でこの関数が実行されると、自動的に前のページへと移動します。移動後のフォーカス位置は末尾となります。");

    var forward_page = function () {
        return move_page.call( this, function () {
            location.hash = "#";
            location.href = get_url( get_num() * this.per );            
        }._bind(this));
    }.setSummary("検索結果ページを前に進めます。移動するページ数は押されたキーの回数によります。移動後のフォーカス位置はアイテムの先頭となります。");

    var backward_page = function () {
        return move_page.call( this, function () {
            location.hash = "#";
            location.href = get_url( -(get_num()) * this.per );
        }._bind(this));
    }.setSummary("検索結果ページを後ろに戻します。移動するページ数は押されたキーの回数によります。移動後のフォーカス位置はアイテムの先頭となります。");

    var move_page = function ( callback ) {
        if ( this.tid != undefined )
            clearTimeout( this.tid );
        if ( this.per == undefined ) {
            this.per = 1;
        } else {
            this.per++;
        }
        this.tid = setTimeout( callback, config.interval );
    }

    var view_item  = function () {
        post_to_google_bookmark();
        location.hash = config.item_pos;
        location.href = $(config.item_pos.toString()).title;
    }.setSummary("フォーカス位置にあるアイテムを同ウィンドウ内に開きます。");

    var forward_item_and_view = function () {
        forward_item();
        view_item();
    }.setSummary("アイテムのフォーカス位置を一つ進めた上で、フォーカス位置にあるアイテムを同ウィンドウ内に開きます");

    var backward_item_and_view = function () {
        backward_item();
        view_item();
    }.setSummary("アイテムのフォーカス位置を一つ戻した上で、フォーカス位置にあるアイテムを同ウィンドウ内に開きます");

    var view_item_other_window = function () {
        GM_openInTab( $(config.item_pos.toString()).title );
    }.setSummary("フォーカス位置にあるアイテムを新しいウィンドウにバックグラウンドで開きます。");

    var view_cache = function () {
        location.hash = config.item_pos;
        if ( this.cache = $( config.item_pos.toString() ).getAttribute("lang") ) {
            location.href = this.cache;
        }
    }.setSummary("フォーカス位置にあるアイテムのキャッシュページを同ウィンドウ内に開きます。");

    var view_related = function () {
        location.hash = config.item_pos;
        if ( this.related = $( config.item_pos.toString() ).getAttribute("alt") ) {
            location.href = this.related;
        }
    }.setSummary("フォーカス位置にあるアイテムに関連したページを同ウィンドウ内に開きます。");

    var post_to_google_bookmark = function () {
        var queryString = function ( params ) {
            if ( typeof params == "object" ) {
                var result = [];
                for ( var i in params ) {
                    result.push(
                        [
                         encodeURIComponent(i),
                         "=",
                         encodeURIComponent(params[i])
                        ].join("")
                    );
                }
                return result.join("&");
            } else {
                return "";
            }
        }
        var get_link = function () {
            return $( config.item_pos.toString() ).title;
        }
        var get_title = function () {
            return $( "title_" + config.item_pos ).innerHTML.replace(/<\/?[^>]+>/gi, '');
        }
        var get_label = function () {
            return (function () {
                var zero_fill = function ( elem ) {
                    return ( elem.toString().length == 1 ) ? "0" + elem : elem;
                }
                var trim = function ( str ) {
                    return str.replace(/^\s+|\s+$/g, "");
                }
                var get_keywords = function () {
                    return trim( $("q").value.replace(/\s+/g, ",") );
                }
                var get_date = function () {
                    var date = new Date();
                    return [
                        date.getFullYear()               + "\u5e74",
                        zero_fill( date.getMonth() + 1 ) + "\u6708",
                        zero_fill( date.getDate() )      + "\u65e5"
                    ].join("");
                }
                return [
                    get_date(),
                    ",AutoPost,",
                    get_keywords(),
                ].join("");        
            })();
        }
        GM_xmlhttpRequest({
                method : "post",
                url    : "http://www.google.com/bookmarks/mark",
                data   : queryString({
                    bkmk   : get_link(),
                    title  : get_title(),
                    labels : get_label()
                }),
                onload : function () {
                }
        });
    }.setSummary("フォーカス位置にあるアイテムの情報を「Google-Bookmark」へと保存します。送信される情報はアイテムの「タイトル」と「URL」、そして「日付」「検索語」「AutoPostという文字列」がタグ化されたものとなります。");

    var add_keyword = function () {
       if ( this.addword = prompt("追加するキーワード", "") ) {
          $("q").value = [
                          $("q").value,
                          " ",
                          this.addword
                         ].join("");
          $("gform").submit();
       }
    }.setSummary("検索語を一つ追加した上で再度検索します。検索語を入力するためのプロンプトが開きます。");

    var go_google_homepage = function () {
        location.href = "http://www.google.co.jp/";
    }.setSummary("Googleのトップページへと移動します。");

    var view_help = function () {
        var get_help_html = function () {
            var result = ["<ul>"];
            for ( var key_code in key_map ) {
                if ( typeof key_map[ key_code ] == "function" ) {
                   result.push([
                      "<li class='command_key'>",
                      "[ " + key_code + " ]",
                      "<li class='command_summary'>",
                      key_map[ key_code ].getSummary(),
                      "</li>"
                   ].join(""));
                }
            }
            result.push("</ul>");
            return result;
        }
        GM_addStyle(
              "body { margin-right : 30px; }"
            + ".command_key { font-weight: bold;  }"
            + ".command_summary { list-style-type : none; margin-top: 20px; padding-left:35px; }"
        );
        config.disabled         = true;
        location.hash           = config.item_pos;
        document.body.scrollTop = 0;
        document.body.innerHTML = get_help_html();
        document.addEventListener("keypress", function (e) {
           if ( e.which == 113 ) {
              location.reload();
           }
        }, false);
    }.setSummary("キーバインドの一覧ページを開きます。この関数を実行することによって表示されるページはJavaScriptにより動的に生成されています。ヘルプページを抜けるには[q]キーを押すか、ページをリロードしてください。");

    var view_feeling_lucky = function () {
       location.href = location.href.replace(/(\?)/, "$1btnI=1&");
    }.setSummary("今現在、検索しているキーワードのI'm Feeling Luckyを開きます。");

    // key_map
    var key_map = {
        l : forward_page,
        a : backward_page,
        n : forward_item,
        p : backward_item,
        N : forward_item_and_view,
        P : backward_item_and_view,
        v : view_item,
        o : view_item_other_window,
        k : view_cache,
        r : view_related,
        b : post_to_google_bookmark,
        A : add_keyword,
        G : go_google_homepage,
        F : view_feeling_lucky,
        h : view_help
    }
    // special_key_map
    var special_key_map = {
        13 : view_item,
        32 : move_scroll_page
    }
    // initialize_function
    var initialize = [
        add_focus_image,
        add_event_handler,
        disable_input_box,
        ime_off,
        recover_position
    ];
    return (function () {
        while ( typeof ( this.init = initialize.shift() ) == "function" ) {
              this.init();
        }
    })();
})();