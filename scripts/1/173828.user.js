// ==UserScript==
// @name        superVod
// @namespace   superVod
// @description Drag and drop upload, and more features for fun.
// @include     http://vod.xunlei.com/*
// @require       http://code.jquery.com/jquery-1.10.1.min.js
// @require       http://code.jquery.com/jquery-migrate-1.2.1.min.js
// @require       http://buckwilson.me/lightboxme/jquery.lightbox_me.js
// @require       http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/sha1.js
// @require       http://needim.github.io/noty/js/noty/jquery.noty.js
// @require       http://needim.github.io/noty/js/noty/layouts/bottomRight.js
// @require       http://needim.github.io/noty/js/noty/themes/default.js
// @version     1
// ==/UserScript==
var console = {
  _defined: false,
  log: function(object) {
    if (!console._defined) {
      console._defined = true;
      location.href = "javascript:" + uneval(function() {
        document.addEventListener("consoleData",
        function(event) {
          console.log.apply(this, event.getData("object"));
        },
        false);
      }) + "()";
    }
    setTimeout(send, 100, arguments);
    function send(object) {
      var event = document.createEvent("DataContainerEvent");
      event.initEvent("consoleData", true, false);
      event.setData("object", object);
      document.dispatchEvent(event);
    }
  }
};


$.noty.defaults = {
    layout: 'bottomRight',
    theme: 'defaultTheme',
    type: 'information',
    text: '',
    dismissQueue: true, // If you want to use queue feature set this true
    template: '<div class="noty_message"><span class="noty_text"></span><div class="noty_close"></div></div>',
    animation: {
        open: {height: 'toggle'},
        close: {height: 'toggle'},
        easing: 'swing',
        speed: 500 // opening & closing animation speed
    },
    timeout: false, // delay for closing event. Set false for sticky notifications
    force: false, // adds notification to the beginning of queue when set to true
    modal: false,
    maxVisible: 10, // you can set max visible notification for dismissQueue true option
    closeWith: ['click'], // ['click', 'button', 'hover']
    callback: {
        onShow: function() {},
        afterShow: function() {},
        onClose: function() {},
        afterClose: function() {}
    },
    buttons: false // an array of buttons
};


var bdecode = function(inputStr) {
    function decode( data, encoding ) {
      decode.position = 0;
      decode.encoding = encoding || null;
      decode.data = data;
      return decode.next();
    }

    decode.position = 0;
    decode.data = null;
    decode.encoding = null;

    decode.next = function() {
      switch( decode.data.charAt(decode.position) ) {
          case 'd': 
              return decode.dictionary();
          break;
        case 'l': 
            return decode.list(); 
        break;
        case 'i': 
            return decode.integer(); 
        break;
        default: 
            return decode.bytes(); 
        break;
      };

    };

    decode.find = function( chr ) {

      var i = decode.position;
      var c = decode.data.length;
      var d = decode.data;

      while( i < c ) {
          if( d.charAt(i) === chr ) {
              return i;
          }
          i++;
      };

      throw 'Invalid data: Missing delimiter';
    }

    decode.dictionary = function() {

      decode.position++;

      var dict = {};

      while( decode.data.charAt(decode.position) !== 'e' ) {
        dict[ decode.bytes() ] = decode.next();
      }

      decode.position++;

      return dict;

    }

    decode.list = function() {

      decode.position++;

      var lst = [];

      while( decode.data.charAt(decode.position) !== 'e' ) {
        lst.push( decode.next() );
      }

      decode.position++;

      return lst;

    }

    decode.integer = function() {

      var end = decode.find( 'e' );
      var number = decode.data.substr(decode.position + 1, end );

      decode.position += end + 1 - decode.position;

      return parseInt( number, 10 );
      
    }

    decode.bytes = function() {

      var sep = decode.find( ':' );
      var length = parseInt( decode.data.substr(decode.position, sep ), 10 );
      var end = ++sep + length;

      decode.position += end - decode.position;

      return decode.encoding
        ? decode.data.substr( sep, end )
        : decode.data.slice( sep, end );

    }
    return decode(inputStr);
};


var bencode = function(inputObj){

    function encode_int(x,r) {
        r.push('i'); r.push(x+''); r.push('e');
    }
    
    function encode_string(x,r) {
        r.push(x.length+''); r.push(':'); r.push(x);
    }

    function encode_list(x,r) {
        r.push('l');
        for (var i in x){
            var type = typeof(x[i]);
            type = (type == 'object') ? ((x[i] instanceof Array) ? 'list' : 'dict') : type;
            encode_func[type](x[i], r)
        }
        r.push('e');
    }

    function encode_dict(x,r) {
        r.push('d');
        var keys = [], ilist = {};
        for (var i in x) {
            keys.push(i);
        }
        keys.sort();
        for (var j in keys) {
            ilist[keys[j]] = x[keys[j]];
        }
        for (var k in ilist) {
            r.push(k.length+''); r.push(':'); r.push(k);
            var v = ilist[k];
            var type = typeof(v);
            type = (type == 'object') ? ((v instanceof Array) ? 'list' : 'dict') : type;
            encode_func[type](v, r);
        }
        r.push('e');
    }

    encode_func = {};
    encode_func['number']  = encode_int;
    encode_func['string']  = encode_string;
    encode_func['list']    = encode_list;
    encode_func['dict']    = encode_dict;

    function encode(x) {
        var r = [];
        var type = typeof(x);
        type = (type == 'object') ? ((x instanceof Array) ? 'list' : 'dict') : type;
        encode_func[type](x, r);
        return r.join('');
    }

    return encode(inputObj);
}


this.$ = this.jQuery = jQuery.noConflict(true);
$(document).ready(function () {

    var getCookie = function(name) {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr != null) return unescape(arr[2]); return null;
    }

    var uploadUrl = 'http://localhost/realtime/upload.php';
    var userid = getCookie('userid');
    var sessionid = getCookie('sessionid');

    var checkLoadReady = function(){
        if($("#ListDataArea")[0]) {
            return true;
        }
        return false;
    }
    
    var loadCover = function(){
        $("#ListDataArea tr td:nth-child(3)").each(function(){
            var url = coverUrl($(this).find('.file_name').html());
            if(url) {
                $(this).prev().html('<img src="' + url[0] + '" style="float:right;" class="mvPreview" data-pl="' + url[1] +'" height="60" />').css('background', 'url(img/loading_1.gif) no-repeat 50% 50%');
                preloadImage(url[1]);
                //console.log('Cover appended : %s', url[0]);
            }
            
        });
    }

    var preloadImage = function(url) {
        $('<img/>')[0].src = url;
    }

    var coverUrl = function(title){
        var re = /[a-zA-Z]{2,6}-?\d{2,5}/;
        var match = title.match(re);
        if(!match) {
            return false;
        }

        
        //console.log('Found matched : %s', match);
        match = match[0].replace('-', '').toLowerCase();

        var code = match.match(/[a-z]+/);
        switch(code[0]) {
            case 'star':
            case 'dvdes':
            case 'hbad':
            case 'rct':
            case 'dandy':
            case 'nhdta':
            case 'sdmt':
                match = '1' + match;
                break;
            case 'dv':
                match = '53' + match;
                break;
            case 'xv':
                match = '60' + match;
                break;
            case 'mild':
                match = '84' + match;
                break;
            case 'vdd':
            case 'ufd':
                match = '24' + match;
                break;
            case 'wanz':
                match = '3' + match;
                break;
            case 'azsa':
                match = '18' + match;
                break;
            case 'real':
                match = '84' + match;
                break;
            case 'rgd':
                match = '46' + match;
                break;
            case 'sma':
                match = '83' + match;
                break;
            case 'hodv':
                match = '41' + match;
                break;
            case 'gg':
                match = '13' + match;
                break;
            case 'nitr':
                match = '49' + match;
                break;
            case 'crs':
                match = '118' + match;
                break;
            case 'gmed':
                match = '143' + match;
                break;
            case 'vgd':
                match = '512' + match;
                break;
            case 'htms':
                match = 'h_066' + match;
                break;
            case 'natr':
                match = 'h_067' + match;
                break;
            case 'nsps':
                match = 'h_102' + match;
                break;
            case 'lank':
                match = 'h_231' + match;
                break;
            case 'mxgs':
                match = 'h_068' + match;
                break;
            case 'tmdi':
                match = 'h_452' + match;
                break;
            case 'sama':
                match = 'h_244' + match;
                break;
            case 'nfdm':
                match = 'h_188' + match;
                break;
            case 'rdb':
                var num = match.match(/\d+/);
                num = num[0];
                match = code + '00' + num;
                break;
            case 'iesp':
                var num = match.match(/\d+/);
                num = num[0];
                if(num > 200) {
                    match = '1' + match; 
                } else {
                    match = '1ies' + num[0];
                }
                break;
            default:;
        }

        var url = [
            'http://pics.dmm.co.jp/mono/movie/adult/' + match + '/' + match +'ps.jpg',
            'http://pics.dmm.co.jp/mono/movie/adult/' + match + '/' + match +'pl.jpg'
        ];
        return url;
    }
    
    var loadHandler = null;
    var pageInit = function(){
        loadHandler = setInterval(function(){
            var res = checkLoadReady();
            if(true === res) {
                loadCover();
                clearInterval(loadHandler);
            }

            //console.log('Checking page list loaded : %s', res);
        }, 1000);    
    }

    var decodeFile = function(file) {
        //console.log(file);
        var fileReader = new FileReader();
        var fileData = fileReader.readAsText(file);
        fileReader.onload = function(){
            //console.log(this.result);
            /*
            GM_xmlhttpRequest({
                url : 'http://i.vod.xunlei.com/req_add_record?from=vlist&platform=0&userid=46040356&sessionid=70D7800F26C8F8559DAAA0CEB39695FD10B544FD270DA22F9E7FD6813D99DF6935D4E1D20DD1D0457BDB86CFBBAD3103388A9CC0329FB6D472CF5D3FAEB1395D6C06B46EC6948D1347D209A5C16EC145',
                method : 'POST',
                data : '{"urls":[{"id":"1","url":"bt://E07C4A0F5E6B74F362FF08A778DDE6D3B66DFA67"}]}',
                onload : function(response){
                    console.log(response);
                }
            });
            */
            //var res = vod_bdecode( this.result );
            //console.log(res);
        }
        //console.log(fileData);
    }

    

    var dragAndDrop = function(){
        if (!window.File || !window.FileList || !window.FileReader) {
            return false;
        }

        var ignoreDrag = function(e) {
            e.originalEvent.stopPropagation();
            e.originalEvent.preventDefault();
        }

        var deleteFile = function(){
        //http://i.vod.xunlei.com/req_del_list?flag=0&sessionid=70D7800F26C8F8559DAAA0CEB39695FDDD84F27A94687A02E2124A027F062E63B45BE6A9D91CBDF7A0303EA1930BC10B7748AE9C27CD0A2AF52CD8B3521FC3686C06B46EC6948D1347D209A5C16EC145&t=1377042068986&info_hash=62CBCA1AA506D0AACF73CA0AB1F4AB774AC506A7
        }

        var postToXunlei = function(hashJson, file, notice) {
            GM_xmlhttpRequest({
                url : "http://i.vod.xunlei.com/req_add_record?from=vlist&platform=0&userid=" + userid + "&sessionid=" + sessionid,
                method : 'POST',
                data : hashJson,
                onload : function(response){
                    var uploadRes = $.parseJSON(response.responseText);
                    var uploadedFile = decodeURIComponent(uploadRes.resp.res[0].name);
                    if(uploadedFile == '未知文件名') {
                        notice.setText(file.name + ' upload failed.').setType('error');
                    } else {
                        notice.setText(file.name + ' uploaded.').close();
                    }
                    //console.log(uploadedFile));
                }
            });
        }
        var drop = function(e) {
            ignoreDrag(e);
            var dt = e.originalEvent.dataTransfer;
            var droppedFiles = dt.files;
            $.each(droppedFiles, function(index, file) {

                var uploadFormData = new FormData(); 
                uploadFormData.append("file[]", file);
                var notice = noty({text: 'Uploading : ' + file.name});
                GM_xmlhttpRequest({
                    url : uploadUrl,
                    method : 'POST',
                    data : uploadFormData,
                    onload : function(response){
                        console.log(response);
                        postToXunlei(response.responseText, file, notice);
                    }
                });
                /*
                var fileInfo = decodeFile(file);
                var hash = CryptoJS.SHA1(dencode(fileInfo.info));
                GM_log(hash);
                */
            });
            
            //console.log(droppedFiles[0]);
        }



        $('body')
        .on('dragenter', ignoreDrag)
        .on('dragover', ignoreDrag)
        .on('drop', drop);
    }


    pageInit();
    dragAndDrop();

    //page changed
    $(window).on('hashchange', function(e){
        pageInit();
    });


    $("body").append('<div id="lightbox_me" style="position:fixed;"></div>')
    $(document).on("click", ".mvPreview", function(){
        $("#lightbox_me").html('<img src="' + $(this).attr("data-pl") + '">').lightbox_me();
    });
});

