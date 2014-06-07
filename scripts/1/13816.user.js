// ==UserScript==
// @name           Bibliwo
// @namespace      http://sourceforge.jp/projects/bibliwo/
// @include        http://*.amazon.co.jp/*
// @include        http://amazon.co.jp/*
// @include        http://www.bk1.jp/*
// @include        http://books.rakuten.co.jp/*
// @include        http://www.bookoffonline.co.jp/display/*
// @include        http://store.shopping.yahoo.co.jp/7andy/*
// @include        http://www.jbook.co.jp/p/p.aspx/*
// @include        file:*
// @description    Inserts links into Amazon's page to the libraries.
// ==/UserScript==

var environment = (function(){
   var environments = [
      /*
         name : 名前
         start : 起動時に呼ばれる関数
         isEligible : 現在の実行環境に適合しているか否かを返す関数
      */
      {
         name : "Jetpack",
         isEligible : function(){
            try {
               return jetpack !== undefined;
            } catch(e) {
               return false;
            }
         },
         start : function(){
            // Converts a pattern in this programs simple notation to a regular expression.
            // thanks AdBlock! http://www.mozdev.org/source/browse/adblock/adblock/
            function convert2RegExp( pattern ) {
              var s = new String(pattern);
              var res = new String("^");

              for (var i = 0 ; i < s.length ; i++) {
                switch(s[i]) {
                  case "*" :
                    res += ".*";
                    break;

                  case "." :
                  case "?" :
                  case "^" :
                  case "$" :
                  case "+" :
                  case "{" :
                  case "[" :
                  case "|" :
                  case "(" :
                  case ")" :
                  case "]" :
                    res += "\\" + s[i];
                    break;

                  case "\\" :
                    res += "\\\\";
                    break;

                  case " " :
                    // Remove spaces from URLs.
                    break;

                  default :
                    res += s[i];
                    break;
                }
              }

              var tldRegExp = new RegExp("^(\\^(?:[^/]*)(?://)?(?:[^/]*))(\\\\\\.tld)((?:/.*)?)$")
              var tldRes = res.match(tldRegExp);
              if (tldRes) {
                // build the mighty TLD RegExp
                // {{{
                //var tldStr = "\.(?:demon\\.co\\.uk|esc\\.edu\\.ar|(?:c[oi]\\.)?[^\\.]\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.(?:(?:pvt\\.)?k12|cc|tec|lib|state|gen)\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nvus|ne|gg|tr|mm|ki|biz|sj|my|hn|gl|ro|tn|co|br|coop|cy|bo|ck|tc|bv|ke|aero|cs|dm|km|bf|af|mv|ls|tm|jm|pg|ky|ga|pn|sv|mq|hu|za|se|uy|iq|ai|com|ve|na|ba|ph|xxx|no|lv|tf|kz|ma|in|id|si|re|om|by|fi|gs|ir|li|tz|td|cg|pa|am|tv|jo|bi|ee|cd|pk|mn|gd|nz|as|lc|ae|cn|ag|mx|sy|cx|cr|vi|sg|bm|kh|nr|bz|vu|kw|gf|al|uz|eh|int|ht|mw|gm|bg|gu|info|aw|gy|ac|ca|museum|sk|ax|es|kp|bb|sa|et|ie|tl|org|tj|cf|im|mk|de|pro|md|fm|cl|jp|bn|vn|gp|sm|ar|dj|bd|mc|ug|nu|ci|dk|nc|rw|aq|name|st|hm|mo|gq|ps|ge|ao|gr|va|is|mt|gi|la|bh|ms|bt|gb|it|wf|sb|ly|ng|gt|lu|il|pt|mh|eg|kg|pf|um|fr|sr|vg|fj|py|pm|sn|sd|au|sl|gh|us|mr|dz|ye|kn|cm|arpa|bw|lk|mg|tk|su|sc|ru|travel|az|ec|mz|lb|ml|bj|edu|pr|fk|lr|nf|np|do|mp|bs|to|cu|ch|yu|eu|mu|ni|pw|pl|gov|pe|an|ua|uk|gw|tp|kr|je|tt|net|fo|jobs|yt|cc|sh|io|zm|hk|th|so|er|cz|lt|mil|hr|gn|be|qa|cv|vc|tw|ws|ad|sz|at|tg|zw|nl|info\\.tn|org\\.sd|med\\.sd|com\\.hk|org\\.ai|edu\\.sg|at\\.tt|mail\\.pl|net\\.ni|pol\\.dz|hiroshima\\.jp|org\\.bh|edu\\.vu|net\\.im|ernet\\.in|nic\\.tt|com\\.tn|go\\.cr|jersey\\.je|bc\\.ca|com\\.la|go\\.jp|com\\.uy|tourism\\.tn|com\\.ec|conf\\.au|dk\\.org|shizuoka\\.jp|ac\\.vn|matsuyama\\.jp|agro\\.pl|yamaguchi\\.jp|edu\\.vn|yamanashi\\.jp|mil\\.in|sos\\.pl|bj\\.cn|net\\.au|ac\\.ae|psi\\.br|sch\\.ng|org\\.mt|edu\\.ai|edu\\.ck|ac\\.yu|org\\.ws|org\\.ng|rel\\.pl|uk\\.tt|com\\.py|aomori\\.jp|co\\.ug|video\\.hu|net\\.gg|org\\.pk|id\\.au|gov\\.zw|mil\\.tr|net\\.tn|org\\.ly|re\\.kr|mil\\.ye|mil\\.do|com\\.bb|net\\.vi|edu\\.na|co\\.za|asso\\.re|nom\\.pe|edu\\.tw|name\\.et|jl\\.cn|gov\\.ye|ehime\\.jp|miyazaki\\.jp|kanagawa\\.jp|gov\\.au|nm\\.cn|he\\.cn|edu\\.sd|mod\\.om|web\\.ve|edu\\.hk|medecin\\.fr|org\\.cu|info\\.au|edu\\.ve|nx\\.cn|alderney\\.gg|net\\.cu|org\\.za|mb\\.ca|com\\.ye|edu\\.pa|fed\\.us|ac\\.pa|alt\\.na|mil\\.lv|fukuoka\\.jp|gen\\.in|gr\\.jp|gov\\.br|gov\\.ac|id\\.fj|fukui\\.jp|hu\\.com|org\\.gu|net\\.ae|mil\\.ph|ltd\\.je|alt\\.za|gov\\.np|edu\\.jo|net\\.gu|g12\\.br|org\\.tn|store\\.co|fin\\.tn|ac\\.nz|gouv\\.fr|gov\\.il|org\\.ua|org\\.do|org\\.fj|sci\\.eg|gov\\.tt|cci\\.fr|tokyo\\.jp|net\\.lv|gov\\.lc|ind\\.br|ca\\.tt|gos\\.pk|hi\\.cn|net\\.do|co\\.tv|web\\.co|com\\.pa|com\\.ng|ac\\.ma|gov\\.bh|org\\.zw|csiro\\.au|lakas\\.hu|gob\\.ni|gov\\.fk|org\\.sy|gov\\.lb|gov\\.je|ed\\.cr|nb\\.ca|net\\.uy|com\\.ua|media\\.hu|com\\.lb|nom\\.pl|org\\.br|hk\\.cn|co\\.hu|org\\.my|gov\\.dz|sld\\.pa|gob\\.pk|net\\.uk|guernsey\\.gg|nara\\.jp|telememo\\.au|k12\\.tr|org\\.nz|pub\\.sa|edu\\.ac|com\\.dz|edu\\.lv|edu\\.pk|com\\.ph|net\\.na|net\\.et|id\\.lv|au\\.com|ac\\.ng|com\\.my|net\\.cy|unam\\.na|nom\\.za|net\\.np|info\\.pl|priv\\.hu|rec\\.ve|ac\\.uk|edu\\.mm|go\\.ug|ac\\.ug|co\\.dk|net\\.tt|oita\\.jp|fi\\.cr|org\\.ac|aichi\\.jp|org\\.tt|edu\\.bh|us\\.com|ac\\.kr|js\\.cn|edu\\.ni|com\\.mt|fam\\.pk|experts-comptables\\.fr|or\\.kr|org\\.au|web\\.pk|mil\\.jo|biz\\.pl|org\\.np|city\\.hu|org\\.uy|auto\\.pl|aid\\.pl|bib\\.ve|mo\\.cn|br\\.com|dns\\.be|sh\\.cn|org\\.mo|com\\.sg|me\\.uk|gov\\.kw|eun\\.eg|kagoshima\\.jp|ln\\.cn|seoul\\.kr|school\\.fj|com\\.mk|e164\\.arpa|rnu\\.tn|pro\\.ae|org\\.om|gov\\.my|net\\.ye|gov\\.do|co\\.im|org\\.lb|plc\\.co\\.im|net\\.jp|go\\.id|net\\.tw|gov\\.ai|tlf\\.nr|ac\\.im|com\\.do|net\\.py|tozsde\\.hu|com\\.na|tottori\\.jp|net\\.ge|gov\\.cn|org\\.bb|net\\.bs|ac\\.za|rns\\.tn|biz\\.pk|gov\\.ge|org\\.uk|org\\.fk|nhs\\.uk|net\\.bh|tm\\.za|co\\.nz|gov\\.jp|jogasz\\.hu|shop\\.pl|media\\.pl|chiba\\.jp|city\\.za|org\\.ck|net\\.id|com\\.ar|gon\\.pk|gov\\.om|idf\\.il|net\\.cn|prd\\.fr|co\\.in|or\\.ug|red\\.sv|edu\\.lb|k12\\.ec|gx\\.cn|net\\.nz|info\\.hu|ac\\.zw|info\\.tt|com\\.ws|org\\.gg|com\\.et|ac\\.jp|ac\\.at|avocat\\.fr|org\\.ph|sark\\.gg|org\\.ve|tm\\.pl|net\\.pg|gov\\.co|com\\.lc|film\\.hu|ishikawa\\.jp|hotel\\.hu|hl\\.cn|edu\\.ge|com\\.bm|ac\\.om|tec\\.ve|edu\\.tr|cq\\.cn|com\\.pk|firm\\.in|inf\\.br|gunma\\.jp|gov\\.tn|oz\\.au|nf\\.ca|akita\\.jp|net\\.sd|tourism\\.pl|net\\.bb|or\\.at|idv\\.tw|dni\\.us|org\\.mx|conf\\.lv|net\\.jo|nic\\.in|info\\.vn|pe\\.kr|tw\\.cn|org\\.eg|ad\\.jp|hb\\.cn|kyonggi\\.kr|bourse\\.za|org\\.sb|gov\\.gg|net\\.br|mil\\.pe|kobe\\.jp|net\\.sa|edu\\.mt|org\\.vn|yokohama\\.jp|net\\.il|ac\\.cr|edu\\.sb|nagano\\.jp|travel\\.pl|gov\\.tr|com\\.sv|co\\.il|rec\\.br|biz\\.om|com\\.mm|com\\.az|org\\.vu|edu\\.ng|com\\.mx|info\\.co|realestate\\.pl|mil\\.sh|yamagata\\.jp|or\\.id|org\\.ae|greta\\.fr|k12\\.il|com\\.tw|gov\\.ve|arts\\.ve|cul\\.na|gov\\.kh|org\\.bm|etc\\.br|or\\.th|ch\\.vu|de\\.tt|ind\\.je|org\\.tw|nom\\.fr|co\\.tt|net\\.lc|intl\\.tn|shiga\\.jp|pvt\\.ge|gov\\.ua|org\\.pe|net\\.kh|co\\.vi|iwi\\.nz|biz\\.vn|gov\\.ck|edu\\.eg|zj\\.cn|press\\.ma|ac\\.in|eu\\.tt|art\\.do|med\\.ec|bbs\\.tr|gov\\.uk|edu\\.ua|eu\\.com|web\\.do|szex\\.hu|mil\\.kh|gen\\.nz|okinawa\\.jp|mob\\.nr|edu\\.ws|edu\\.sv|xj\\.cn|net\\.ru|dk\\.tt|erotika\\.hu|com\\.sh|cn\\.com|edu\\.pl|com\\.nc|org\\.il|arts\\.co|chirurgiens-dentistes\\.fr|net\\.pa|takamatsu\\.jp|net\\.ng|org\\.hu|net\\.in|net\\.vu|gen\\.tr|shop\\.hu|com\\.ae|tokushima\\.jp|za\\.com|gov\\.eg|co\\.jp|uba\\.ar|net\\.my|biz\\.et|art\\.br|ac\\.fk|gob\\.pe|com\\.bs|co\\.ae|de\\.net|net\\.eg|hyogo\\.jp|edunet\\.tn|museum\\.om|nom\\.ve|rnrt\\.tn|hn\\.cn|com\\.fk|edu\\.dz|ne\\.kr|co\\.je|sch\\.uk|priv\\.pl|sp\\.br|net\\.hk|name\\.vn|com\\.sa|edu\\.bm|qc\\.ca|bolt\\.hu|per\\.kh|sn\\.cn|mil\\.id|kagawa\\.jp|utsunomiya\\.jp|erotica\\.hu|gd\\.cn|net\\.tr|edu\\.np|asn\\.au|com\\.gu|ind\\.tn|mil\\.br|net\\.lb|nom\\.co|org\\.la|mil\\.pl|ac\\.il|gov\\.jo|com\\.kw|edu\\.sh|otc\\.au|gmina\\.pl|per\\.sg|gov\\.mo|int\\.ve|news\\.hu|sec\\.ps|ac\\.pg|health\\.vn|sex\\.pl|net\\.nc|qc\\.com|idv\\.hk|org\\.hk|gok\\.pk|com\\.ac|tochigi\\.jp|gsm\\.pl|law\\.za|pro\\.vn|edu\\.pe|info\\.et|sch\\.gg|com\\.vn|gov\\.bm|com\\.cn|mod\\.uk|gov\\.ps|toyama\\.jp|gv\\.at|yk\\.ca|org\\.et|suli\\.hu|edu\\.my|org\\.mm|co\\.yu|int\\.ar|pe\\.ca|tm\\.hu|net\\.sb|org\\.yu|com\\.ru|com\\.pe|edu\\.kh|edu\\.kw|org\\.qa|med\\.om|net\\.ws|org\\.in|turystyka\\.pl|store\\.ve|org\\.bs|mil\\.uy|net\\.ar|iwate\\.jp|org\\.nc|us\\.tt|gov\\.sh|nom\\.fk|go\\.th|gov\\.ec|com\\.br|edu\\.do|gov\\.ng|pro\\.tt|sapporo\\.jp|net\\.ua|tm\\.fr|com\\.lv|com\\.mo|edu\\.uk|fin\\.ec|edu\\.ps|ru\\.com|edu\\.ec|ac\\.fj|net\\.mm|veterinaire\\.fr|nom\\.re|ingatlan\\.hu|fr\\.vu|ne\\.jp|int\\.co|gov\\.cy|org\\.lv|de\\.com|nagasaki\\.jp|com\\.sb|gov\\.za|org\\.lc|com\\.fj|ind\\.in|or\\.cr|sc\\.cn|chambagri\\.fr|or\\.jp|forum\\.hu|tmp\\.br|reklam\\.hu|gob\\.sv|com\\.pl|saitama\\.jp|name\\.tt|niigata\\.jp|sklep\\.pl|nom\\.ni|co\\.ma|net\\.la|co\\.om|pharmacien\\.fr|port\\.fr|mil\\.gu|au\\.tt|edu\\.gu|ngo\\.ph|com\\.ve|ac\\.th|gov\\.fj|barreau\\.fr|net\\.ac|ac\\.je|org\\.kw|sport\\.hu|ac\\.cn|net\\.bm|ibaraki\\.jp|tel\\.no|org\\.cy|edu\\.mo|gb\\.net|kyoto\\.jp|sch\\.sa|com\\.au|edu\\.lc|fax\\.nr|gov\\.mm|it\\.tt|org\\.jo|nat\\.tn|mil\\.ve|be\\.tt|org\\.az|rec\\.co|co\\.ve|gifu\\.jp|net\\.th|hokkaido\\.jp|ac\\.gg|go\\.kr|edu\\.ye|qh\\.cn|ab\\.ca|org\\.cn|no\\.com|co\\.uk|gov\\.gu|de\\.vu|miasta\\.pl|kawasaki\\.jp|co\\.cr|miyagi\\.jp|org\\.jp|osaka\\.jp|web\\.za|net\\.za|gov\\.pk|gov\\.vn|agrar\\.hu|asn\\.lv|org\\.sv|net\\.sh|org\\.sa|org\\.dz|assedic\\.fr|com\\.sy|net\\.ph|mil\\.ge|es\\.tt|mobile\\.nr|co\\.kr|ltd\\.uk|ac\\.be|fgov\\.be|geek\\.nz|ind\\.gg|net\\.mt|maori\\.nz|ens\\.tn|edu\\.py|gov\\.sd|gov\\.qa|nt\\.ca|com\\.pg|org\\.kh|pc\\.pl|com\\.eg|net\\.ly|se\\.com|gb\\.com|edu\\.ar|sch\\.je|mil\\.ac|mil\\.ar|okayama\\.jp|gov\\.sg|ac\\.id|co\\.id|com\\.ly|huissier-justice\\.fr|nic\\.im|gov\\.lv|nu\\.ca|org\\.sg|com\\.kh|org\\.vi|sa\\.cr|lg\\.jp|ns\\.ca|edu\\.co|gov\\.im|edu\\.om|net\\.dz|org\\.pl|pp\\.ru|tm\\.mt|org\\.ar|co\\.gg|org\\.im|edu\\.qa|org\\.py|edu\\.uy|targi\\.pl|com\\.ge|gub\\.uy|gov\\.ar|ltd\\.gg|fr\\.tt|net\\.qa|com\\.np|ass\\.dz|se\\.tt|com\\.ai|org\\.ma|plo\\.ps|co\\.at|med\\.sa|net\\.sg|kanazawa\\.jp|com\\.fr|school\\.za|net\\.pl|ngo\\.za|net\\.sy|ed\\.jp|org\\.na|net\\.ma|asso\\.fr|police\\.uk|powiat\\.pl|govt\\.nz|sk\\.ca|tj\\.cn|mil\\.ec|com\\.jo|net\\.mo|notaires\\.fr|avoues\\.fr|aeroport\\.fr|yn\\.cn|gov\\.et|gov\\.sa|gov\\.ae|com\\.tt|art\\.dz|firm\\.ve|com\\.sd|school\\.nz|edu\\.et|gob\\.pa|telecom\\.na|ac\\.cy|gz\\.cn|net\\.kw|mobil\\.nr|nic\\.uk|co\\.th|com\\.vu|com\\.re|belgie\\.be|nl\\.ca|uk\\.com|com\\.om|utazas\\.hu|presse\\.fr|co\\.ck|xz\\.cn|org\\.tr|mil\\.co|edu\\.cn|net\\.ec|on\\.ca|konyvelo\\.hu|gop\\.pk|net\\.om|info\\.ve|com\\.ni|sa\\.com|com\\.tr|sch\\.sd|fukushima\\.jp|tel\\.nr|atm\\.pl|kitakyushu\\.jp|com\\.qa|firm\\.co|edu\\.tt|games\\.hu|mil\\.nz|cri\\.nz|net\\.az|org\\.ge|mie\\.jp|net\\.mx|sch\\.ae|nieruchomosci\\.pl|int\\.vn|edu\\.za|com\\.cy|wakayama\\.jp|gov\\.hk|org\\.pa|edu\\.au|gov\\.in|pro\\.om|2000\\.hu|szkola\\.pl|shimane\\.jp|co\\.zw|gove\\.tw|com\\.co|net\\.ck|net\\.pk|net\\.ve|org\\.ru|uk\\.net|org\\.co|uu\\.mt|com\\.cu|mil\\.za|plc\\.uk|lkd\\.co\\.im|gs\\.cn|sex\\.hu|net\\.je|kumamoto\\.jp|mil\\.lb|edu\\.yu|gov\\.ws|sendai\\.jp|eu\\.org|ah\\.cn|net\\.vn|gov\\.sb|net\\.pe|nagoya\\.jp|geometre-expert\\.fr|net\\.fk|biz\\.tt|org\\.sh|edu\\.sa|saga\\.jp|sx\\.cn|org\\.je|org\\.ye|muni\\.il|kochi\\.jp|com\\.bh|org\\.ec|priv\\.at|gov\\.sy|org\\.ni|casino\\.hu|res\\.in|uy\\.com)"
                // }}}

                // insert it
                res = tldRes[1] + tldStr + tldRes[3];
              }
              return new RegExp(res + "$", "i");
            }
            var includes = [
               "http://*.amazon.co.jp/*",
               "http://amazon.co.jp/*",
               "http://www.bk1.jp/*",
               "http://books.rakuten.co.jp/*",
               "http://www.bookoffonline.co.jp/display/*",
               "http://store.shopping.yahoo.co.jp/7andy/*",
               "http://www.jbook.co.jp/p/p.aspx/*",
               "file:*"
            ];
            var excludes = [];

            function xhrExport(){
               GM_xmlhttpRequest = function(details){
                 var req;
                 var url = details.url;
                  function getCallback(event){
                     return function(){
                        if(details[event]){
                           var responseState = {
                             responseText: req.responseText,
                             readyState: req.readyState,
                             responseHeaders: null,
                             status: null,
                             statusText: null,
                             finalUrl: null
                           };
                           if (4 == req.readyState && 'onerror' != event) {
                              responseState.responseHeaders = req.getAllResponseHeaders();
                              responseState.status = req.status;
                              responseState.statusText = req.statusText;
                              responseState.finalUrl = req.channel.URI.spec;
                           }
                           details[event](responseState);
                        }
                     }
                  }
                 
                 if (typeof url != "string") {
                   throw new Error("Invalid url: url must be of type string");
                 }
                 if(!url.match(/(.*?):/)[1]) {
                     throw new Error("Invalid url: " + url);
                 }
                 req = new XMLHttpRequest();
                 req.onload = getCallback("onload");
                 req.onerror = getCallback("onerror");
                 req.onreadystatechange = getCallback("onreadystatechange");

                 req.open(details.method, url);

                 if (details.overrideMimeType) {
                   req.overrideMimeType(details.overrideMimeType);
                 }

                 if (details.headers) {
                   for (var prop in details.headers) {
                     req.setRequestHeader(prop, details.headers[prop]);
                   }
                 }
                 var body = details.data ? details.data : null;
                 if (details.binary) {
                   // xhr supports binary?
                   if (!req.sendAsBinary) {
                     var err = new Error("Unavailable feature: " +
                             "This version of Firefox does not support sending binary data " +
                             "(you should consider upgrading to version 3 or newer.)");
                     throw err;
                   }
                   req.sendAsBinary(body);
                 } else {
                   req.send(body);
                 }
               };
            }

            GM_log = console.log;
            jetpack.future.import("storage.simple");
            GM_getValue = function(key, def){
               var ret = jetpack.storage.simple[key];
               if(ret === undefined){
                  ret = def;
               }
               return ret;
            };
            GM_setValue = function(key, value){
               jetpack.storage.simple[key] = value;
            };
            xhrExport();
            GM_registerMenuCommand = function(){}; //not supported
            jetpack.tabs.onReady(function(doc){
               //ここでは、documentが含まれているwindow(unsafe)を検索している
               //将来的にwindowオブジェクトを必要とするuserscriptを移植することがあれば有用なコードだが、
               //現状windowオブジェクトは使っていないので無用のコード。
               var i, j;
               var unsafeWindow = null;
               var tmpwin;
               function innerWindows(win){
                  var ret = [];
                  var i;
                  ret.push(win);
                  for(i = 0; i < win.frames.length; ++i){
                     ret.push(win.frames[i]);
                  }
                  return ret;
               }
                function test(page) {
                  return convert2RegExp(page).test(doc.location);
                }
               if(!includes.some(test) || excludes.some(test)){
                  return;
               }
               for(i = 0; i < jetpack.tabs.length; ++i){
                  tmpwin = innerWindows(jetpack.tabs[i].contentWindow);
                  for(j = 0; j < tmpwin.length; ++j){
                     if(tmpwin[j].document === doc){
                        unsafeWindow = tmpwin[j];
                        break;
                     }
                  }
                  if(unsafeWindow){
                     break;
                  }
               }
               scriptmain(doc);
            });
         }
      },
      {
         name : "ChromeExtention",
         isEligible : function(){
            try {
               return chrome !== undefined;
            } catch(e) {
               return false;
            }
         },
         start : function(){
            GM_log = console.log;
            GM_getValue = function(key, def){
               var ret = localStorage[key];
               if(ret === undefined){
                  ret = def;
               }
               return ret;
            };
            GM_setValue = function(key, value){
               localStorage[key] = value;
            };
            GM_registerMenuCommand = function(){}; //not supported

            GM_xmlhttpRequest = function(detail){
               chrome.extension.sendRequest(detail, function(response) {
                  if(detail[response.event]){
                     detail[response.event](response.res);
                  }
               });
            };

            scriptmain(document);
         }
      },
      {
         name : "Android",
         isEligible : function(){
            try {
               return JS_IMPORT !== undefined;
            } catch(e) {
               return false;
            }
         },
         start : function(){
            scriptmain(document);
         },
      },
      {
         name : "Greasemonkey",
         isEligible : function(){
            return true;
         },
         start : function(){
            scriptmain(document);
         }
      }
   ];
   
   for(var i = 0; i < environments.length; ++i){
      if(environments[i].isEligible()){
         return environments[i];
      }
   }
   return null;
})();
environment.start();


function scriptmain(document){

//図書の問い合わせ結果表示に用いる文字定数。
//図書館スクリプトからも参照される。
RES_NOT_FOUND = "蔵書なし";
RES_FOUND = "蔵書あり";
RES_SEARCHING = "問い合わせ中";
RES_NOT_IMPLEMENTED = "未実装";  //図書館スクリプトが存在しないため解析不能
RES_UNABAILABLE = "利用不可";    //図書館スクリプトが存在するが解析不能(図書館そのものがISBN検索に対応していない、13桁ISBNの検索に対応していない、など)
RES_ERR_NETWORK = "接続エラー";  //ネットワークのタイムアウトなど

//永続化データを取り出すキー群
KEY_PERSISTENT = "PERSISTENT";
var debug = false;

URL_HOME = "http://bibliwo.sourceforge.jp/";
URL_ROOT  = debug ? "http://localhost:8080/" : "http://bibliwo.sourceforge.jp/rel/";
URL_THIS = URL_ROOT + "bibliwo.user.js";
URL_LIBDATA = URL_ROOT + "libdata/1/"; //図書館スクリプトのディレクトリ
URL_LIBCONFIG = URL_LIBDATA + "libconfig.js"; //図書館設定
URL_REDIRECTOR = URL_ROOT + "redirector.html";

QUERY_TIMEOUT_MS = 30 * 1000; //図書館検索のタイムアウト値
CACHE_LIFETIME_MS = 1000 * 60 * 60 * 24; //スクリプトのキャッシュの寿命


//リビジョン番号
REVISION = "$Rev: 53 $";


//問い合わせクラス
//アクティブになっている図書館と1:1で対応。
var Query = {
   //library : 図書館オブジェクト
   //item : item.isbn10 : ISBN10
   newInstance : function(library, item){
      var that = {};
      var _result = {
         //デフォルトの問い合わせ結果は「問い合わせ中」
         status: RES_SEARCHING
      };
      var _observer;
      
      ////公開インタフェース
      //Queryから生ずるイベントを監視するオブジェクトを登録
      //observer : 関数notify(query)を持つ必要がある。このコールバックは検索結果が更新されたときに呼び出される。
      that.setObserver = function(o){
         _observer = o;
      };
      //検索結果の取得
      that.getResult = function(){
         return _result;
      };
      //図書館の取得
      that.getLibrary = function(){
         return library;
      };
      that.getItem = function(){
         return item;
      };
      //問い合わせを行う。
      that.doSearch = function(){
         //問い合わせ結果がString型だった場合の処理
         //q : 問い合わせオブジェクト。GM_xmlhttpRequestのリクエストオブジェクトに、resHandlerを追加したもの。
         //next : 問い合わせ結果によっては追加の問い合わせが発生する。その際の追加問い合わせの関数。
         function StringHandler(q, next){
            _result = {};
            _result.status = q;
            //コールバック呼び出し
            _observer.notify(that);
            //"next" is ignored
         }
         function ObjectHandler(q, next){
            function callback(res){
               //接続エラー表示用のタイマを解除
               clearTimeout(timeoutId);
               if(res.status == 200){
                  //図書館から返答が帰ってきた
                  //問い合わせオブジェクトを使って、図書館からの返答を解析
                  var res= (q.resHandler instanceof Function) ? q.resHandler(res) : q.resHandler;
                  if(res instanceof Object){
                     //返値がObjectだったら、それは_resultに入れるべき。
                     //返値のretryプロパティが真で、かつnextが存在したら、
                     //追加問い合わせをすべき状況なので追加問い合わせする。
                     _result = res;
                     if(_result.retry){
                        next()
                     }
                  } else if(typeof(res) == "string"){
                     //返値がStringだったら、それを画面表示する。
                     _result = {};
                     _result.url = null;
                     _result.status = res;
                  } else {
                     error("E001", "resHandlerの返値はObjectかStringである必要があります", typeof(res));
                  }
               } else {
                  //問い合わせに失敗したらエラー表示
                  _result.url = null;
                  _result.status = "エラー(" + res.status + ")";
               }
               //コールバック呼び出し
               _observer.notify(that);
            };
            //クエリの型が関数だったら、その実行結果と差し替え
            if(typeof(q) == "function"){
               q = q();
            }
            //クエリ設定にデフォルト値を与える
            q.method = q.method || "GET";
            if(q.method == "POST"){
               q.headers = q.headers || {"Content-Type" : "application/x-www-form-urlencoded"};
            }

            q.onerror = q.onload = (function(obj){return function(res){callback.apply(obj, [res])}})(that);
            //一定時間反応がない場合、接続エラーの表示を行う
            var timeoutId = setTimeout(function(){
                  _result.url = null;
                  _result.status = RES_ERR_NETWORK;
                  //コールバック呼び出し
                  _observer.notify(that);
            }, QUERY_TIMEOUT_MS);
            GM_xmlhttpRequest(q);
         }
         //初期状態表示用にコールバック呼び出し
         _observer.notify(that);

         //図書館の問い合わせオブジェクトを取得。
         try{
            var libQueries = (typeof(library.queries) == "function" ? library.queries(item) : library.queries);
         } catch(e){
            libQueries = [];
         }
         //配列でなければ配列に変換
         if(!(libQueries instanceof Array)){
            libQueries = [libQueries];
         }
         //呼び出しチェーンを作成する。
         //一部の図書館はISBNが正規化されていないため、うまくいくまでリトライする必要がある。
         //そのため、問い合わせオブジェクトの配列の先頭から順に処理を行い、リトライの必要が無くなるまで繰り返す。
         //呼び出しチェーン実現のため、以下では以下のような処理を行っている。
         //1. 空関数を用意してfchainに代入。これは呼び出しチェーンの末尾に配置される。
         //2. 問い合わせオブジェクト配列の末尾(最も優先度が低いもの)を用いて、StringHandlerクロージャかObjectHandlerクロージャを作成する。
         //この際、各クロージャには「処理がうまくいかなかった時に呼ぶ関数」を保存するのだが、これは現時点のfchainになる。
         //3. 2.で作成したクロージャをfchainに代入する。
         //4. 2.に戻る。
         //最終的にできあがったfchainは、優先度の高いものから順に処理を行う関数のチェーンとなっている。
         var fchain = function(){};
         for(var i = libQueries.length - 1; i >= 0; --i){
            var q = libQueries[i];
            var f;
            if(typeof(q) == "string"){
               //問い合わせオブジェクトが文字列型だったらそれを表示して処理完了。
               f = StringHandler;
            } else {
               f = ObjectHandler;
            }
            fchain = (function(f, q, next){return function(){f(q, next);};})(f, q, fchain);
         }
         fchain();
      };
      return that;
   }
};

var Config = (function(){
   var persistent = {};
   var devScriptObj = null;
   function toString(o){
      var ret = "";
      var i;
      var key;
      if(typeof(o) == "function"){
         ret += o.toString();
      } else if(typeof(o) == "string"){
         ret += "\"" + o.replace('"', '\\"') + "\"";
      } else if(typeof(o) == "object" && o instanceof Array){
         ret += "[";
         for(i = 0; i < o.length; ++i){
            ret += toString(o[i]);
            if(i != o.length - 1){
               ret += ",";
            }
         }
         ret += "]";
      } else if(typeof(o) == "object" && o instanceof RegExp){
         ret += o.toString();
      } else if(typeof(o) == "object"){
         ret += "{";
         for(key in o){
            ret += "'" + key + "':" + toString(o[key]) + ",";
         }
         ret.substr(0, ret.length - 1);
         ret += "}";
      } else {
         ret += "\"" + o.toString() + "\"";
      }
      return ret;
   }
   function parseLibData(id, res){
      var lib = null;
      var str;
      if(res.status == 200){ 
         try{
            lib = eval("(" + res.responseText + ")"); 
         } catch(e){
         }
      } 
      lib = lib || {
         id : id,
         name : Config.getLibConfig().libraries[id],
         queries : RES_NOT_IMPLEMENTED
      };
      persistent.libScripts[id] = lib;
   }
   function loadPersistent(){
      persistent = eval("(" + GM_getValue(KEY_PERSISTENT, "{ libConfig : [], libScripts : {}, activeIdSet : {}, lastUpdate : 0, devScript : '' }") + ")");
   }
   function savePersistent(){
      GM_setValue(KEY_PERSISTENT, toString(persistent));
   }

   return {
      getActiveIdList : function(){
         var ret = [];
         var key;
         for(key in persistent.activeIdSet){
            ret[ret.length] = key;
         }
         ret.sort();
         return ret;
      },
      getLibConfig : function(){
         return persistent.libConfig;
      },
      setActive : function(id, b){
         var idset = persistent.activeIdSet;
         if(b){
            idset[id] = true;
         } else {
            delete idset[id];
         }
      },
      isActive : function(id){
         return !!persistent.activeIdSet[id];
      },
      clearActive : function(){
         persistent.activeIdSet = {};
      },
      getLib : function(id){
         if(devScriptObj != null && devScriptObj.id == id){
            return devScriptObj;
         }
         return persistent.libScripts[id];
      },
      //設定データの初期化
      init : function(nextFunc, forceUpdate){
         function loadLibScript(ids, nextFunc){
            var libConfig = Config.getLibConfig();
            var cnt = 0;
            persistent.libScripts = {};
            function callback(id, res){
               parseLibData(id, res);
               if(++cnt == ids.length){
                  Config.savePersistent();
                  nextFunc();
               }
            }
            if(ids.length == 0){
               nextFunc();
               return;
            }
            for(var i = 0; i < ids.length; ++i){
               var id = ids[i];
               if(libConfig.libraries[id]){
                  var req = {
                     method : "GET",
                     url : URL_LIBDATA + id + ".js?" + Math.random(),
                     onload : (function(id){return function(res){
                           callback(id, res);
                        };})(id)
                  };
                  GM_xmlhttpRequest(req);
               } else {
                  Config.setActive(id, false);  
               }
            }
         }         
         loadPersistent();
         try{
            devScriptObj = eval("(" + decodeURI(persistent.devScript) + ")");
         } catch(e){
            devScriptObj = null;
         }
         
         if(!!forceUpdate || new Date().getTime() - persistent.lastUpdate > CACHE_LIFETIME_MS){
            //図書館リストの更新
            GM_xmlhttpRequest({
               method : "GET",
               url : URL_LIBCONFIG + "?" + Math.random(),
               onload : function(res){
                  if(res.status == 200){
                     persistent.libConfig = eval("(" + res.responseText + ")");
                     persistent.lastUpdate = new Date().getTime();
                  }
                  loadLibScript(Config.getActiveIdList(), nextFunc);
               }
            });
         } else {
            nextFunc();
         }
      },
      savePersistent : savePersistent,
      getDevScript : function(){
         return decodeURI(persistent.devScript);
      },
      setDevScript : function(s){
         persistent.devScript = encodeURI(s);
      }
   };
})();


//Queryオブジェクトを表示するクラス。
var QueryView = {
   newInstance : function(){
      var that = {};

      var _container = document.createElement("tr");
      var _lib = document.createElement("td");
      var _status = document.createElement("td");
      _container.appendChild(_lib);
      _container.appendChild(_status);

      ////公開インタフェース
      //モデル(Query)を登録する
      that.setModel = function(query){
         //Queryのコールバックを受け取れるよう指定
         query.setObserver(that);
      };
      //コンテナとなるHTML要素を取得
      that.getContainer = function(){
         return _container;
      };
      //Queryからのコールバック
      that.notify = function(query){
         var result = query.getResult();
         var library = query.getLibrary();
         /*
         function onpostsubmit(evt){
            evt.preventDefault();
            var form = document.createElement("form");
            document.body.appendChild(form);
            form.setAttribute("action", result.url);
            form.setAttribute("method", result.method);
            form.setAttribute("enctype", "application/x-www-form-urlencode");
            var params = result.data.split("&");
            var fmhm = "";
            for(var i = 0; i < params.length; ++i){
               var param = params[i].split("=");
               fmhm += "<input type='hidden' name='" + param[0] + "' value='" + param[1] + "'>";
            }
            form.innerHTML = fmhm;
            form.submit();
         }
         */
         if(!!library.url){
            _lib.innerHTML = "<a href='" + library.url + "'>" + library.name + "</a>";  
         } else {
            _lib.innerHTML = library.name;
         }

         //書籍ページを表示するメソッド。デフォルトはGET
         result.method = result.method || "GET";

         var stat = result.status;

         
         function createUrl(result){
            ret = [];
            for(var key in result){
               ret.push(encodeURIComponent(key) + "=" + encodeURIComponent(result[key]));
            }
            return ret.join("&");
         }
         
         if(result.url){
            _status.innerHTML = "<a href='" + URL_REDIRECTOR + "?" + createUrl(result) + "'>" + stat + "</a>";
         } else {
            _status.innerHTML = stat;
         }

/*
         if(result.method == "GET"){
            //GETで表示できるなら、普通にリンクを作成する。
            if(result.url){
               _status.innerHTML = "<a href='" + result.url + "'>" + stat + "</a>";
            } else {
               _status.innerHTML = stat;
            }
         } else if(result.method == "POST"){
            //POSTで表示する必要がある場合、リンクをクリックした際のイベントハンドラを作成。  
            var link = document.createElement("a");
            _status.removeChild(_status.firstChild);
            _status.appendChild(link);
            link.setAttribute("href", "#");
            link.appendChild(document.createTextNode(stat));
            link.addEventListener("click", function(evt){
                  onpostsubmit(evt);
            }, false);
         }
         */
      };
      return that;
   }
};

//一つの書籍に対する複数図書館の検索結果を表示するビュー
var QueryGroupView = {
   newInstance : function(){
      var that = {};
      var _container = document.createElement("table"); //問い合わせ結果リストを表示する要素

      ////公開インタフェースの定義
      //モデル(Queryの配列)を登録
      //モデルをもとに子Viewの生成を行う
      that.setModel = function(queries){
         var qv;
         var i;
         _container.innerHTML = "";
         for(i = 0; i < queries.length; ++i){
            qv = QueryView.newInstance();
            qv.setModel(queries[i]);
            _container.appendChild(qv.getContainer());
         }
      };
      //コンテナとなるHTML要素を返す
      that.getContainer = function(){return _container;};
         
      return that;
   }
};



//設定画面において１つの図書館表示を担うクラス
var SettingLibView = {
   //lib : 図書館オブジェクト
   newInstance : function(_library){
      var that = {};
      var _container = document.createElement("span");
      var _checkNodeContainer = document.createElement("span");
      var _checkNode = document.createElement("input");
      var _libNode = document.createElement("span");
      _container.appendChild(_checkNodeContainer);
      _checkNodeContainer.appendChild(_checkNode);
      _checkNode.setAttribute("type", "checkbox");
      _container.appendChild(_libNode);

      _checkNode.checked = !!Config.isActive(_library.id);
      //チェックボックスが変更されたら、永続データを更新する。
      _checkNode.addEventListener("change", function(evt){
         Config.setActive(_library.id, evt.target.checked);   
      }, false);
      _libNode.innerHTML = _library.name;  
      
      ////公開インタフェース
      //コンテナを返す
      that.getContainer = function(){
         return _container;
      };
      return that;
   }
};

var SettingView = {
   newInstance : function(){
      var that = {};
      var _onCloseListener = function(){};
      var _container;

      var libConfig = Config.getLibConfig();
      var group= document.createElement("select");
      var libListElm = document.createElement("div");
      var closeElm = document.createElement("input");
      var selectCallbacks = [];
      var g;
      var i;

      _container = document.createElement("div");

      _container.setAttribute("style", "border-style: solid; border-color: rgb(100, 100, 150); width: 90%; top: 0%; left: 0%; position: fixed; background-color: white; overflow: scroll; z-index: 10000");
      _container.style.display = "none";

      _container.appendChild(document.createTextNode("問い合わせる図書館を選んでください"));
      _container.appendChild(document.createElement("br"));
      _container.appendChild(group);
      _container.appendChild(libListElm);

      group.addEventListener("change", function(evt){
         selectCallbacks[group.selectedIndex](evt);
      }, false);

      g = document.createElement("option");
      g.appendChild(document.createTextNode("選択してください"));
      selectCallbacks[selectCallbacks.length] = function(){
         libListElm.innerHTML = "";
      }; 
      group.appendChild(g);

      for(i = 0; i < libConfig.group.length; ++i){
         g = document.createElement("option");
         g.appendChild(document.createTextNode(libConfig.group[i][1]));
         group.appendChild(g);
         
         selectCallbacks[selectCallbacks.length] = function(group){return function(evt){
            var j, id;
            libListElm.innerHTML = "";
            var matchIds = [];
            var groupPattern = group[0];
            for(id in libConfig.libraries){
               if(id.match(groupPattern)){
                  matchIds.push(id);  
               }
            }
            matchIds.sort();
            var j, id;
            for(j = 0; j < matchIds.length; ++j){
               id = matchIds[j];
               libListElm.appendChild(SettingLibView.newInstance({
                  id : id,
                  name : libConfig.libraries[id]
               }).getContainer());
            }
         }}(libConfig.group[i]);
      }
      closeElm.value = "確定して閉じる";
      closeElm.type = "button";
      closeElm.addEventListener("click", function(evt){
         _container.style.display = "none";
         _onCloseListener();
      }, false);
      _container.appendChild(closeElm);
      ////公開インタフェース
      //「確定して閉じる」したときのコールバックを登録
      that.setOnCloseListenter = function(cb){
         _onCloseListener = cb;
      };
      //表示する。
      that.open = function(){
         _container.style.display = "";
      };
      //非表示化する。設定は変更しない。
      that.close = function(){
         _container.style.display = "none";
      };
      //コンテナを返す
      that.getContainer = function(){
         return _container;
      };
      return that;
   }
};
var SettingTriggerView = {
   newInstance : function(){
      var that = {};
      var _container = document.createElement("div");
      var _onClickListener = function(){};

      var triggerElm = document.createElement("a");
      _container.setAttribute("style", "text-align: center; border-top: 1px solid gray;");
      triggerElm.appendChild(document.createTextNode("図書館の設定"));
      triggerElm.setAttribute("href", "#");
      triggerElm.addEventListener("click", function(evt){
         evt.preventDefault();
         _onClickListener();
      }, false);
      _container.appendChild(triggerElm);

      ////公開インタフェース
      that.getContainer = function(){
         return _container;
      };
      that.setOnClickListener = function(cb){
         _onClickListener = cb;
      };
      return that;
   }
};

var AnnounceView = {
   newInstance : function(){
      var _that = {};
      var _container = document.createElement("div");
      _container.setAttribute("style", "text-align: center; border-top: 1px solid gray;");
      GM_xmlhttpRequest({
         method : "GET",
         url : URL_THIS + "?" + Math.random(),
         onload : function(res){
            try{
               if(res.status == 200){
                  var match = res.responseText.match(new RegExp("\\$" + "Rev: (\\d+) \\$", "m"));
                  if(REVISION != match[0]){
                     var udp = document.createElement("div");
                     _container.appendChild(udp);
                     var ud = document.createElement("a");
                     udp.appendChild(ud);
                     ud.setAttribute("href", URL_HOME);
                     ud.innerHTML = "新しいバージョンが入手できます(rev." + REVISION.match(/\d+/)[0] + "->rev." + match[1] + ")";
                  }
               }
            } catch(e){}
         }
      });
      ////公開インタフェース
      _that.getContainer = function(){
         return _container;
      };
      return _that;
   }
};

var TestScriptView = {
   newInstance : function(){
      var _that = {};

      var _container = document.createElement("div");
      var _testArea = document.createElement("textarea");
      var _testSubmitBtn = document.createElement("input");
      var _closeBtn = document.createElement("input");
      var _onCancelListener = _onSaveListener = function(){};

      _container.setAttribute("style", "width: 80%; right: 0%; bottom: 0%; position: fixed; background-color: #cccccc; z-index: 10000");
      _container.style.display = "none";
      _container.appendChild(document.createTextNode("試作図書館データを登録(開発者用)"));
      _container.appendChild(document.createElement("br"));
      _container.appendChild(_testArea);
      _container.appendChild(document.createElement("br"));
      _container.appendChild(_testSubmitBtn);
      _container.appendChild(_closeBtn);
      _testArea.setAttribute("style", "height: 20em; width: 100%;");
      _testArea.value = Config.getDevScript();
      _testSubmitBtn.setAttribute("type", "button");
      _testSubmitBtn.setAttribute("value", "保存して閉じる");
      _testSubmitBtn.addEventListener("click", onsubmit, false);
      _closeBtn.setAttribute("type", "button");
      _closeBtn.setAttribute("value", "破棄して閉じる");
      _closeBtn.addEventListener("click", function(evt){
         _onCancelListener ();
      }, false);

      function onsubmit(evt){
         var errors = [];
         if(_testArea.value.match(/[^\s]+/)){
            try{
               var testObj = eval("(" + _testArea.value + ")");
               if(typeof(testObj) != "object"){
                  errors.push("Objectとして評価される必要があります");
               } else {
                  var mandatoryProps = [["id", "string"], ["name", "string"], ["queries", "function"]];
                  for(var i = 0; i < mandatoryProps.length; ++i){
                     var p = testObj[mandatoryProps[i][0]];
                     if(!p){
                        errors.push("プロパティ " + mandatoryProps[i] + " が必要です");
                     } else if(typeof(p) != mandatoryProps[i][1]){
                        errors.push("プロパティ " + mandatoryProps[i][0] + "は" + mandatoryProps[i][1] + "である必要があります");
                     }
                  }
               }
            } catch(e){
               errors.push(e);
            }
         }
         if(errors.length == 0){
            _onSaveListener();
         } else {
            alert(errors.join("\n"));
         }
      }
      ////公開インタフェース
      //キャンセルが選択された場合のコールバックを設定
      _that.setOnCancelListener  = function(cb){
         _onCancelListener  = cb;
      };
      //設定保存が選択された場合のコールバックを設定
      _that.setOnSaveListener = function(cb){
         _onSaveListener  = cb;
      };
      _that.getContainer = function(){
         return _container;
      };
      _that.getValue = function(){
         return _testArea.value;
      };
      _that.open = function(){
         _container.style.display = "";
      };
      _that.close = function(){
         _container.style.display = "none";
      };
      return _that;
   }
};
TestScriptView.createView = function(submitCallback){
   if(TestScriptView.isActive){
      return;
   }


   testSubmitBtn.addEventListener("click", onsubmit, false);
   var closeBtn = document.createElement("input");
   container.appendChild(closeBtn);
   closeBtn.setAttribute("type", "button");
   closeBtn.setAttribute("value", "破棄して閉じる");
   closeBtn.addEventListener("click", function(evt){
         container.parentNode.removeChild(container);
         TestScriptView.isActive = false;
         submitCallback();
         }, false);

   return container;
};

/*
//スクリプトが正常に動いているか否かを表示するビュー
//現在アクティブな図書館に対してのみ、確認を行う。
var SanityCheckView = {};

//ids : 確認の対象となる図書館IDの配列
SanityCheckView.createView = function(ids){
   SanityCheckView.container = document.createElement("div");
   var q;
   var lib;
   var i, j;
   var isErrorFound = false;
   var inner = "";
   for(i = 0; i < ids.length; ++i){
      lib = Config.getLib(ids[i]);
      if(!!lib && lib.testcases instanceof Array){
         for(j = 0; j < lib.testcases.length; ++j){
            q = new Query(lib, lib.testcases[j].item);
            q.view = (function(lib, cnt){return {
               update : function(res){
                  var result;
                  if(!!res.result && !!res.result.retry){
                     return;
                  }
                  result = lib.testcases[cnt].validate(res.result);
                  GM_log(lib.id + "(" + (cnt + 1) + "/"  + (lib.testcases.length) + ") : " + (result ? "OK" : "NG"));
                  if(result){
                     return;
                  }
                  //テストケースの実行に失敗
                  if(!isErrorFound){
                     inner = "以下の図書館が正常に処理できていません。一時的なものかもしれませんが、異常が続くようであれば<a href='http://sourceforge.jp/forum/forum.php?thread_id=24156&forum_id=20540'>報告をお願いします</a><br/>";
                     isErrorFound = true;
                  } 
                  inner += "・" + lib.name + "(testcase:" + (cnt + 1) + ")<br/>";
                  SanityCheckView.container.innerHTML = inner;
               }
            };})(lib, j);
            q.doSearch();
         }
      }
   }
   return SanityCheckView.container;
};
*/

//在庫状況を表示するオンライン書店Webサイトの情報。
var Stores = (function(){
   //13桁ISBNを10桁ISBNに変換
   //最初の3文字が"978"でないものは変換できないので、空文字で返す。
   function getIsbn10ByIsbn13(isbn13){
      var isbn10;
      var i;
      var mod = 0;
      var cd;
      if(isbn13.length != 13){
         GM_log("isbn13 (" + isbn13 + ") is invalid");
         return "";
      }
      if(isbn13.indexOf("978") != 0){
         return "";
      }
      isbn10 = isbn13.substr(3, 9);
      for(i = 0; i < isbn10.length; ++i){
         mod += parseInt(isbn10.substr(i, 1)) * (10 - i);
      }
      cd = 11 - mod % 11;
      switch(cd){
         case 10:
            cd = "X";
            break;
         case 11:
            cd = "0";
            break;
         default:
            break;
      }
      return isbn10 + cd;
   }
   //10桁ISBNを13桁ISBNに変換
   function getIsbn13ByIsbn10(isbn10){
      var isbn13;
      var i;
      var mod = 0;
      if(isbn10.length != 10){
         GM_log("isbn10 (" + isbn10 + ") is invalid");
         return "";
      }
      isbn13 = "978" + isbn10.substr(0, 9);
      for(i = 0; i < isbn13.length; ++i){
         mod += parseInt(isbn13.substr(i, 1)) * ((i & 1) ? 3 : 1);
      }

      return isbn13 + ((10 - mod % 10) == 10 ? 0 : (10 - mod % 10));
   }

   //配列に格納されているオブジェクトの各要素は以下の通り。
   //name : オブジェクト名(使わない。参考のため)
   //isEligible : そのオブジェクトが利用されるべきか否かを返す関数。
   //setView : 在庫状況Viewのnodeを引数にとり、適当なノードへ追加する関数。
   //getItem : 表示しているHTMLを解析し、商品情報を抽出する関数。商品情報のプロパティは以下の通り。
   //    isbn10 : ISBN10
   var stores = [
      //amazon.co.jp
      (function(){
         function getCartNode(){
            return document.getElementById('SDPBlock');
         }
         function getAsinNode(){
            return document.getElementById('ASIN');
         }
         return {
            name : "Amazon.co.jp",
            getEligibles : function(){
               if(document.location.href.indexOf("amazon.co.jp") >= 0 && !!getCartNode() && !!getAsinNode() && getAsinNode().value.match(/[0-9X]{10}/) != null){
                  return [{
                     setView : function(node){
                        var cartNode = getCartNode();
                        cartNode.parentNode.insertBefore(node, cartNode.nextSibling);
                     },
                     getItem : function(){
                        var ret = {
                           isbn10 : getAsinNode().value,
                           isbn13 : getIsbn13ByIsbn10(getAsinNode().value)
                        };
                        return ret;
                     },
                     option : {
                        minimized : false,
                        announcement : true,
                        setting : true
                     }
                  }];
               } else {
                  return [];
               }
            }
         }
      })(),
      //amazon.co.jp検索結果
      (function(){
         return {
            name : "Amazon.co.jp",
            getEligibles : function(){
               var nl;
               var itemNode;
               var ret = [];
               if(document.location.href.indexOf("amazon.co.jp/s/") >= 0){
                  nl = document.evaluate("//div[@class='listView']/div", document, null, XPathResult.ANY_TYPE, null);
                  while(itemNode = nl.iterateNext()){
                     if(itemNode.getAttribute("name").match(/[0-9X]{10}/) == null){  
                        continue;
                     }

                     ret.push((function(){
                        var theNode = itemNode;
                        var asin = theNode.getAttribute("name");
                        return {
                           setView : function(node){
                              node.style.width = "300px";
                              document.evaluate("./div[@class='productData']", theNode, null, XPathResult.ANY_TYPE, null).iterateNext().appendChild(node);
                           },
                           getItem : function(){
                              return {
                                 isbn10 : asin,
                                 isbn13 : getIsbn13ByIsbn10(asin)
                              };
                           },
                           option : {
                              minimized : true,
                              announcement : false,
                              setting : true
                           }
                        };
                     })());
                  }
                  return ret;
               } else {
                  return [];
               }
            }
         }
      })(),
      //bk1
      (function(){
         function getCartNode(){
            return document.evaluate("//input[@src='http://img.bk1.jp/image/basket_bt.gif']", document, null, XPathResult.ANY_TYPE, null).iterateNext() || document.evaluate("//input[@src='http://img.bk1.jp/image/btn_atode.gif']", document, null, XPathResult.ANY_TYPE, null).iterateNext() ;
         }
         function getItem(){
            var match;
            var isbnstr;
            match = document.body.innerHTML.match(/ISBN ： ((?:\d-?){10})</);
            if(match){
               //10桁ISBNが見つかった
               isbnstr = match[1].replace(/-/g, "");
               return {
                  isbn10 : isbnstr,
                  isbn13 : getIsbn13ByIsbn10(isbnstr)
               };
            }

            match = document.body.innerHTML.match(/ISBN ： ((?:\d-?){13})</);
            if(match){
               //13桁ISBNが見つかった
               isbnstr = match[1].replace(/-/g, "");
               return {
                  isbn10 : getIsbn10ByIsbn13(isbnstr),
                  isbn13 : isbnstr
               };
            }

            return null;
         }
         return {
            name : "bk1.jp",
            getEligibles : function(){
               if(document.location.href.indexOf("www.bk1.jp") >= 0 && !!getCartNode() && !!getItem()){
                  return [{
                     setView : function(node){
                        var cartNode = getCartNode();
                        node.setAttribute("style", "font-size:small;" + node.getAttribute("style"));
                        cartNode.parentNode.insertBefore(node, cartNode.nextSibling);
                     },
                     getItem : function(){
                        return getItem();
                     },
                     option : {
                        minimized : false,
                        announcement : true,
                        setting : true
                     }
                  }];
               } else {
                  return [];
               }
            },
         }
      })(),
      //楽天
      (function(){
         function getCartNode(){
            return document.evaluate("//div[@id='productIdentifier']", document, null, XPathResult.ANY_TYPE, null).iterateNext();
         }
         function getIsbn10(){
            var n = document.evaluate("//meta[@name='keywords']/@content", document, null, XPathResult.ANY_TYPE, null).iterateNext();
            if(!n){
               return null;
            }
         
            var match = n.textContent.match(/(\d{10})/);
            if(!match){
               return null;
            }
            return match[1];
         }
         return {
            name : "rakuten.co.jp",
            getEligibles : function(){
               if(document.location.href.indexOf("http://books.rakuten.co.jp/") >= 0 && !!getCartNode() && !!getIsbn10()){
                  return [{
                     setView : function(node){
                        var cartNode = getCartNode();
                        node.setAttribute("style", "font-size:small;" + node.getAttribute("style"));
                        cartNode.parentNode.insertBefore(node, cartNode.nextSibling);
                     },
                     getItem : function(){
                        var ret = {
                           isbn13 : getIsbn13ByIsbn10(getIsbn10()),
                           isbn10 : getIsbn10()
                        };
                        return ret;
                     },
                     option : {
                        minimized : false,
                        announcement : true,
                        setting : true
                     }
                  }];
               } else {
                  return [];
               };
            }
         }
      })(),
      //ブックオフ
      (function(){
         function getCartNode(){
            return document.getElementById("bkmkframe");
         }
         function getIsbn13(){
            return document.evaluate("//div[@class='infotxt']//th[string()='JAN']/../td/text()", document, null, XPathResult.ANY_TYPE, null).iterateNext().textContent;
         }
         return {
            name : "bookoffonline.co.jp",
            getEligibles : function(){
               if(document.location.href.indexOf("http://www.bookoffonline.co.jp/display/") >= 0 && !!getCartNode() && !!getIsbn13()){
                  return [{
                     setView : function(node){
                        var cartNode = getCartNode();
                        cartNode.parentNode.insertBefore(node, cartNode.nextSibling);
                     },
                     getItem : function(){
                        var ret = {
                           isbn10 : getIsbn10ByIsbn13(getIsbn13()),
                           isbn13 : getIsbn13()
                        };
                        return ret;
                     },
                     option : {
                        minimized : false,
                        announcement : true,
                        setting : true
                     }
                  }];
               } else {
                  return [];
               }
            }
         };
      })(),
      //Yahoo!
      (function(){
         function getCartNode(){
            return document.evaluate("//p[@class='jan']/text()", document, null, XPathResult.ANY_TYPE, null).iterateNext();
         }
         function getIsbn13(){
            var n = document.evaluate("//p[@class='jan']/text()", document, null, XPathResult.ANY_TYPE, null).iterateNext();
            if(!n){
               return null;
            }
            var match = n.textContent.match(/.*(\d{13}).*/);
            if(!match){
               return null;
            }
            return match[1];
         }
         return {
            name : "yahoo.co.jp",
            getEligibles : function(){
               if(document.location.href.indexOf("http://store.shopping.yahoo.co.jp/7andy/") >= 0 && !!getCartNode() && !!getIsbn13()){
                  return [{
                     setView : function(node){
                        var cartNode = getCartNode();
                        cartNode.parentNode.insertBefore(node, cartNode.nextSibling);
                     },
                     getItem : function(){
                        var ret = {
                           isbn10 : getIsbn10ByIsbn13(getIsbn13()),
                           isbn13 : getIsbn13()
                        };
                        return ret;
                     },
                     option : {
                        minimized : false,
                        announcement : true,
                        setting : true
                     }
                  }];
               } else {
                  return [];
               }
            }
         }
         _container.parentNode.removeChild(container);
      })(),
      //JBook
      (function(){
         function getCartNode(){
            return document.evaluate("//td[@class='prodisbn']/span[@class='prodjan']", document, null, XPathResult.ANY_TYPE, null).iterateNext();
         }
         function getIsbn13(){
            var n = document.evaluate("//td[@class='prodisbn']/span[@class='prodjan']//text()", document, null, XPathResult.ANY_TYPE, null).iterateNext();
            if(!n){
               return null;
            }
            var match = n.textContent.match(/.*(\d{13}).*/);
            if(!match){
               return null;
            }
            return match[1];
         }
         return {
            name : "jbook.co.jp",
            getEligibles : function(){
               if(document.location.href.indexOf("http://www.jbook.co.jp/p/p.aspx/") >= 0 && !!getCartNode() && !!getIsbn13()){
                  return [{
                     setView : function(node){
                        var cartNode = getCartNode();
                        cartNode.parentNode.insertBefore(node, cartNode.nextSibling);
                     },
                     getItem : function(){
                        var ret = {
                           isbn10 : getIsbn10ByIsbn13(getIsbn13()),
                           isbn13 : getIsbn13()
                        };
                        return ret;
                     },
                     option : {
                        minimized : false,
                        announcement : true,
                        setting : true
                     }
                  }];
               } else {
                  return [];
               }
            }
         }
      })()
   ];
   return {
      //現在表示しているページに対応するstoresのオブジェクトを取得
      getMatchedStores : function(){
         return stores.reduce(function(res, store){
            return res.concat(store.getEligibles());
         }, []);
      }
   };
})();

var QueryController = {
   _getSettingView : (function(){
      var _instance = null;
      return function(){
         if(_instance == null){
            _instance = SettingView.newInstance();
            _instance.setOnCloseListenter(function(){
               Config.savePersistent();
               Config.init(function(){
                  QueryController.instances.forEach(function(c){
                     c.doSearch();
                  });
               }, true);
            });
         }
         return _instance;
      };
    })(),
    _getTestScriptView : (function(){
      var _instance = null;
      return function(){
         if(_instance == null){
            _instance = TestScriptView.newInstance();
            _instance.setOnSaveListener(function(){
               alert("保存しました");
               _instance.close();
               Config.setDevScript(_instance.getValue());
               Config.savePersistent();
               Config.init(function(){
                  QueryController.instances.forEach(function(c){
                     c.doSearch();
                  });
               }, true);
            });
            _instance.setOnCancelListener(function(){
               Config.init(function(){
                  _instance.close();
                  QueryController.instances.forEach(function(c){
                     c.doSearch();
                  });
               }, true);
            });

            GM_registerMenuCommand("Bibliwo - register test script", function(){
               _instance.open();
            });
         }
         return _instance;
      };
   })(),  
   newInstance : function(_option){
      var that = {};
      
      var _item;  //前回の検索に使われた商品情報。再検索時に使われる。
      var _minimized = _option.minimized;
      var _queryGroupView = QueryGroupView.newInstance();
      var _settingTriggerView = SettingTriggerView.newInstance();
      var _annoView = AnnounceView.newInstance();
      var _minimizedView;
      var _view = (function(){
         var view= {};
         var _container = document.createElement("div");

         _container.appendChild(_queryGroupView.getContainer());
         //Greasemonkey上での動作の場合は、アップデート通知を表示
         if(_option.announcement && environment.name == "Greasemonkey"){
            _container.appendChild(_annoView.getContainer());
         }
         //_container.appendChild(SanityCheckView.createView(Config.getActiveIdList()));
         if(_option.setting){
            _container.appendChild(_settingTriggerView.getContainer());
         }
         //QueryControllerの最初の生成だったら、シングルトンviewをDOMに追加
         if(QueryController.instances.length == 0){
            _container.appendChild(QueryController._getSettingView().getContainer());
            _container.appendChild(QueryController._getTestScriptView().getContainer());
         }

         if(_minimized){
            _queryGroupView.getContainer().style.display = _annoView.getContainer().style.display = _settingTriggerView.getContainer().style.display = "none";
            _minimizedView = document.createElement("div");
            _minimizedView.innerHTML = "▼図書館の蔵書を検索";
            _minimizedView.style.cursor = "pointer";
            _minimizedView.addEventListener("click", function(evt){
               _minimized = false;
               _minimizedView.style.display = "none";
               _queryGroupView.getContainer().style.display = _annoView.getContainer().style.display = _settingTriggerView.getContainer().style.display = "";
               that.doSearch();
            }, false);
            _container.appendChild(_minimizedView);
         }

         view.getContainer = function(){
            return _container;
         };

         return view;
      })();


      _settingTriggerView.setOnClickListener(function(){
         QueryController._getSettingView().open();
      });

      QueryController.instances.push(that);
      
      ///公開インタフェース
      that.setQuery = function(item){
         _item = item;
      }
      //itemの検索を行う。
      //最終的には、Controllerに関連づけられているViewが更新される。
      that.doSearch = function(){
         var i;
         var lib;
         var queries = [];
         var ids;

         if(_minimized){
            return;
         }

         ids = Config.getActiveIdList();
         for(i = 0; i < ids.length; ++i){
            lib = Config.getLib(ids[i]);
            if(!!lib){
               queries.push(Query.newInstance(lib, _item));
            }
         }
         _queryGroupView.setModel(queries);
         /* doSearch methods are executed later in order to use completely constructed DOM tree */
         setTimeout(function(){
               for(var i = 0; i < queries.length; ++i){
                  queries[i].doSearch();
               }}, 1);
      };
      that.getView = function(){ return _view;};
      return that;
   },
   instances : [],
   modifyPage : function(){
      Config.init(function(){
         Stores.getMatchedStores().forEach(function(s){
            var stub = document.createElement('div');
            var ctrl = QueryController.newInstance(s.option);
            stub.setAttribute("style", "border: 1px solid gray; width: 95%");
            s.setView(stub);
            stub.appendChild(ctrl.getView().getContainer());
            ctrl.setQuery(s.getItem());
            ctrl.doSearch();
         });
      }, false);
   }
};


if(environment.name != "Android"){
   QueryController.modifyPage();
}

/*
function main(){
   GM_registerMenuCommand("Bibliwo - auto test", function(){
      Config.init(function(){
         var i;
         var j;
         var lib;
         var q;
         var remainingTests = 0;
         var ok = 0, ng = 0;
         for(i = 0; i < ids.length; ++i){
            lib = C3nfig.getLib(ids[i]);
            if(!!lib && lib.testcases instanceof Array){
               for(j = 0; j < lib.testcases.length; ++j){
                  q = new Query(lib, lib.testcases[j].item);
                  q.view = (function(lib, cnt){return {
                     update : function(res){
                        var result;
                        if(!!res.result && !!res.result.retry){
                           return;
                        }
                        remainingTests--;
                        result = lib.testcases[cnt].validate(res.result);
                        if(result){
                           ++ok;
                        } else {
                           ++ng;
                        }
                        GM_log(lib.id + "(" + (cnt + 1) + "/"  + (lib.testcases.length) + ") : " + (result ? "OK" : "NG"));
                        if(remainingTests == 0){
                           GM_log("test completed. Succeeded(" + ok + "), Failed(" + ng + ")");
                        }
                     }
                  };})(lib, j);
                  q.doSearch();
                  remainingTests++;
               }
            }
         }
      }, true);
   });
}
*/

function error(no){
   var s = no + "\n";
   for(var i = 1; i < arguments.length; ++i){
      s += arguments[i] + "\n";
   }
   alert(s);
}
}
/* vim: set et sw=3 ts=3 syntax=off: */
