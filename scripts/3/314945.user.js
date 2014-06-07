// ==UserScript==
// @name        Amalib_TDU
// @namespace   https://twitter.com/akameco
// @description 東京電機大学の図書館とAmazonの検索をリンク
// @author      akameco
// @include     http://www.amazon.co.jp/*
// @include     http://lib.mrcl.dendai.ac.jp/*
// @include     https://lib.mrcl.dendai.ac.jp/*
// @version     1.00
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function () {

    /*
     * ユーティリティ関数
     */
    // エレメント作成
    let createElement = function(tag,attr,content) {
      let dom = document.createElement(tag);
      for (let key in attr) {
        dom.setAttribute(key,attr[key]);
      }
      if(content){
        dom.textContent = content;
      }
      return dom;
    };

    /*
     * amazon
     */
    let Amazon = {
      info: {
        _isbn: '',
        _title: '',
        _press: '',
        _response: '',
        _btAsinTitle: '',
        _res: null,
        setIsbn: function () {
          document.body.parentNode.innerHTML
          .match(/name=\"ASIN\" value=\"([0-9A-Z]{10})([\/\-_a-zA-Z0-9]*)/i);
          this._isbn = RegExp.$1;
        },
        get isbn() {
          return this._isbn;
        },
        setTitle: function() {
          this._title = document.getElementById('btAsinTitle').firstChild.textContent.slice(0,-1);
        },
        get title() {
          return this._title;
        },
        setPress: function() {
          document.body.innerHTML.match(/出版社:<\/b> (.+?) \(/);
          this._press = RegExp.$1;
        },
        get press() {
          return this._press;
        },
        setPrice: function() {
          let text = document.querySelectorAll('#actualPriceValue .priceLarge')[0].textContent;
          this._price = text.replace(/￥ /,"").replace("\n","").replace(",","");
        },
        get price() {
          return this._price; 
        },
        setBtAsinTitle: function() {
          this._btAsinTitle = document.getElementById('btAsinTitle').parentNode;

        },
        get btAsinTitle() {
          return this._btAsinTitle;
        },
        setRes: function(response) {
          // 一度ノードに変換しないとdom操作ができない
          let html = document.createElement('div');
          html.innerHTML = response;
          this._res = html;
        },
        get res() {
          return this._res;
        }
      },

      /*
       * 初期化
       */
      init: function() {
        Amazon.info.setIsbn();
        Amazon.info.setTitle();
        Amazon.info.setPress();
        Amazon.info.setPrice();
        Amazon.info.setBtAsinTitle();
      },

      // 図書館情報
      library: {
        setPlace: function() {
          // localStorage.removeItem('place');
          let places = ['千住','千葉','鳩山'];
          if(localStorage.getItem('place') == null) {
            let div = createElement('div',{id:'selectLib'});
            let text = createElement('div',{id: 'readme'});
            text.innerHTML =
            'このプラグインは東京電機大学図書館の蔵書状況を表示します。<br>' +
            '最初に下のリンクからキャンパスの場所を設定してください。<br>' +
            '不具合・要望等があったら' +
            '<a href="http://twitter.com/akameco" target="_blank">赤芽(Twitter)</a>' +
            'までお気軽に。<br>';
            for (let i=0; i < places.length; ++i) {
              let element = createElement('a',{href:'javascript:void(0)'},places[i]);
              element.addEventListener('click',function (event) {
                  localStorage.setItem('place',event.target.text);
                  // 現在表示されているものを削除
                  let p = document.querySelector('.parseasinTitle').children;
                  for (let j=1,len = p.length; j < len; ++j){
                    Amazon.info.btAsinTitle.removeChild(p[1]);
                  }
                  // 再描写
                  Amazon.disp.link();
                  let e = Amazon.info.res.querySelector('.flst_head');
                  if(e != null){
                    Amazon.disp.bookLink();
                  }else{
                    Amazon.disp.orderLink();
                  }
              },false);
              div.appendChild(element);
            }
            text.appendChild(div);
            Amazon.info.btAsinTitle.appendChild(text);
          }
        },
        // 図書館の場所
        get home() {
          return localStorage.getItem('place');
        } 
      },

      // 表示
      disp: {
        // 図書館へのリンク
        link: function() {
          let div = createElement('div',{id:'tdu_link'});
          let link = createElement('a',{
              href: 'https://lib.mrcl.dendai.ac.jp/webopac/ctlsrh.do?isbn_issn=' +
              Amazon.info.isbn,
              target: '_blank'},
            '図書館検索'
          );
          div.appendChild(link);
          Amazon.info.btAsinTitle.appendChild(div);
        },

        // ロード状態の表示
        loading: function() {
          let div = createElement('div',{id:'loading'},'NOW LOADING...');
          Amazon.info.btAsinTitle.appendChild(div);
        },

        // ロード表示の削除 
        removeLoading: function() {
          let element = document.getElementById('loading');
          element.parentNode.removeChild(element);
        },

        // 購入依頼のリンク作成
        orderLink: function() {
          let link = 'https://lib.mrcl.dendai.ac.jp/webopac/odridf.do?isbn=' +
                     Amazon.info.isbn +
                     '&title=' +
                     encodeURIComponent(Amazon.info.title) +
                     '&press=' +
                     encodeURIComponent(Amazon.info.press) +
                     '&price=' +
                     Amazon.info.price;
          let a = createElement('a',{href: link,target:'_blank',id: 'order'},'購入依頼');
          Amazon.info.btAsinTitle.appendChild(a);
        },

        // 各図書館の蔵書状況の表示
        bookLink: function() {
          let div = createElement('div',{id:'tduBooks'});
          // 要素の調査
          let tbody = Amazon.info.res.querySelectorAll('.flst_head')[0].parentNode;
          for (let i=1,len = tbody.children.length; i < len; ++i) {
            let element = createElement('div');
            let tr = tbody.children[i];
            // 所蔵館・状態・返却期限日(配架済 or 貸出中)
            let library = {
              place: tr.children[3].firstChild.firstChild.nodeValue,
              state: tr.children[8].firstChild.firstChild.nodeValue,
              priod: tr.children[9].firstChild.firstChild.nodeValue
            };

            if(library.place == Amazon.library.home) {
              element.setAttribute('id','myhome'); 
            }
            if(library.state == '貸出中') {
              element.innerHTML = library.place + ' ' +
                                  library.state + ' ' +
                                  '返却期限 ' + library.priod;
            }else{
              element.innerHTML = library.place + ' ' + library.state;
            }
            div.appendChild(element);
          }
          Amazon.info.btAsinTitle.appendChild(div);
        }
      },

      // 関数定義
      checkCategory: function() {
        let category = document.querySelector('.nav-category-button').firstChild.innerHTML;
        if(category == '本') {
          return true;
        }
        return false;
      },

      // 蔵書のページ確認
      checkPage: function (response) {
        Amazon.info.setRes(response);
        let element = Amazon.info.res.querySelector('.flst_head');
        if (element != null) {
          Amazon.disp.bookLink();
        }else{
          Amazon.disp.orderLink();
        }  
      },

      // HTTPRequestにより蔵書情報取得
      request: function () {
        let link = 'http://lib.mrcl.dendai.ac.jp/webopac/ctlsrh.do?isbn_issn=' +
                   Amazon.info.isbn;
        GM_xmlhttpRequest({
            method: 'GET',
            url: link,
            onload: function(xhr) {
              Amazon.disp.removeLoading();
              Amazon.library.setPlace();
              Amazon.checkPage(xhr.responseText);
            }
        });
      },

      // css定義
      style: function() {
        let style = "\
        #tduBooks{\
          background: none;\
          color: #333333;\
          font-size: 16px;\
          display:table;\
          margin: 1px 15px 0;\
        }\
        #tduBooks div{\
          margin: 1px 15px;\
        }\
        div#tdu_link{\
          display: table;\
          margin: 2px 2px 2px;\
        }\
        div#tdu_link a{\
          margin: 10px 5px;\
          font-size: 16px;\
        }\
        #loading{\
          display: table;\
          font-size: 16px;\
          color: #333333;\
          margin: 0px 15px;\
          padding: 2px 15px\
        }\
        #myhome {\
          color:#009900;\
          font-weight: bold;\
        }\
        #order {\
          display: table;\
          font-size: 16px;\
          margin: 5px 15px;\
          padding: 2px 15px\
        }\
        #readme{\
          border-style: solid;\
          border-radius: 10px;\
          border-width: 1px;\
          display: table;\
          font-size: 15px;\
          color: #333333;\
          margin: 10px 15px;\
          padding: 10px 15px;\
        }\
        #selectLib{\
          margin: 10px 15px;\
          padding: 2px 15px;\
          display: table;\
          font-size: 18px;\
        }\
        #selectLib a{\
          margin: 0px 5px;\
        }\
        ";
        let head = document.getElementsByTagName('head')[0];
        let element = window.document.createElement('style');
        element.type = "text/css";
        element.textContent = style;
        head.appendChild(element);
      },

      open: function() {
        if(!Amazon.checkCategory()) {
          return;
        }
        if(Amazon.info.isbn) {
          Amazon.request();
          Amazon.disp.link();
          Amazon.disp.loading();
          Amazon.style();
        }
      }
    }; 

    /*
     *  電機大学図書館
     */
    let Library = {

      // URLをオブジェクトにして返却
      get parames() {
        if(1 < window.location.search.length) {
          let parameters = window.location.search.substring(1).split('&');
          let result = {};
          for (let i=0,len = parameters.length; i < len; ++i) {
            let element = parameters[i].split('=');
            result[decodeURIComponent(element[0])] = decodeURIComponent(element[1]);
          }
          return result;
        }
        return null;
      },

      login: function () {
        let loginbutton = null;
        let pass=false;
        let form = document.forms[0];
        form.setAttribute('autocomplete','on');
        for (let j=0; formelement=form.getElementsByTagName('input')[j]; ++j) {
          if(formelement.type == 'password' && formelement.value) {
            pass = true; 
            break;
          }
        }
        for (let j=0; formelement=form.getElementsByTagName('input')[j]; ++j) {
          if (formelement.type == 'image' && pass) {
            loginbutton = formelement;
            break;
          }
        }
        if(loginbutton) {
          loginbutton.focus();
          loginbutton.click();
        }
      },

      checkHasBook: function() {
        let err = document.body.innerHTML.match('指定された条件に該当する資料がありません');
        if (err) {
          Library.openOrderPage();
        }
      },  

      openOrderPage: function() {
        let w;
        document.svcodrform.action='https://' +
                                   window.location.host +
                                   '/webopac/odrexm.do' +
                                   window.location.search;
        document.svcodrform.mode.value='new';
        document.svcodrform.reqType.value='_NEW';
        document.svcodrform.loginType.value='once';
        w = window.open('','_self');
        document.svcodrform.submit();
        w.focus();
      },

      // formのactionにパラメータ追加
      setForm: function() {
        let form = document.forms[0];
        form.action = '/webopac/odridf.do' + window.location.search;
        Library.login();
      },

      // システムメッセージが表示されたか確認
      checkErr: function() {
        let err = document.body.innerHTML.match('OP-2010-E');
        if(err) {
          let url = 'http://lib.mrcl.dendai.ac.jp/webopac/ctlsrh.do' +
                    window.location.search;
          window.open(url,'_self');
        }else{
          Library.input();
        }
      },

      // フォームに自動入力
      input: function () {
        let tds = document.querySelectorAll('table.opt_frame tbody tr td input');
        let values = {
          'bibtr': Library.parames['title'],
          'bibpb': Library.parames['press'],
          'isbn' : Library.parames['isbn'],
          'bibpr': Library.parames['price']
        };
        for (let i=0; i < tds.length; ++i) {
          let td = tds[i].getAttribute('name');
          for(let name in values) {
            if(td == name) {
              tds[i].value = values[name];
            }
          }
        }
      },

      // isbnのみか他のパラメータがあるかチェック
      checkParam: function() {
        let parameters = window.location.search.substring(1).split('&');
        if(parameters.length < 4){
          return false;
        }
        return true;
      },

      start: {
        '/webopac/ctlsrh.do': function () {
          if(Library.checkParam()) {
            Library.checkHasBook();
          }
        },
        '/webopac/odridf.do': function () {
          Library.checkErr();
        },
        '/webopac/odrexm.do': function () {
          if(Library.checkParam()) { 
            Library.setForm();
          }else{
            Library.login();
          }
        },
        '/webopac/rsvexm.do':function () {
          Library.login();
        }
      }
    };

    // urlを確認
    let checkHost = {
      'www.amazon.co.jp': function () {
        Amazon.init();
        Amazon.open();
      },
      'lib.mrcl.dendai.ac.jp': function () {
        let path = window.location.pathname;
        Library.start[path]();
      }       
    };

    window.onload = function () {
      let host = window.location.host;
      try{
        let f = checkHost[host];
        if(f == undefined) return;
        f();
      }catch(err){
        console.log(err);
      } 
      return;
    };
})(); 
