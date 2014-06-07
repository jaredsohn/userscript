// ==UserScript==
// @name        TweetTheMinutes
// @namespace   http://creazy.net/
// @include     http://twitter.com/*
// @include     https://twitter.com/*
// @version     2.0.0
// ==/UserScript==

//------------------------------------------------------------
// CSS
var styles = document.createElement('style');
styles.setAttribute('type','text/css');
styles.appendChild( document.createTextNode(
     "#ttm {"
    +"display: block;"
    +"position: relative;"
    +"clear: both;"
    +"margin: 50px 0 0 0;"
    +"padding: 10px;"
    +"border: 1px solid #CCC;"
    +"border-radius: 3px;-moz-border-radius: 3px;-webkit-border-radius: 3px;"
    +"background: #EEE;"
    +"background-clip: padding-box;"
    +"}"
    +"#ttm_title {"
    +"float:left;"
    +"font: bold 16px/20px Courier,serif;"
    +"color: #333;"
    +"text-shadow: 2px 2px 0 #FFF;"
    +"}"
    +"#ttm_btn_buttons ,"
    +"#ttm_btn_options ,"
    +"#ttm_btn_help {"
    +"float:right;"
    +"font: 12px/20px;"
    +"}"
    +"#ttm_buttons{"
    +"clear:both;"
    +"display:block;"
    +"}"
    +"#ttm_buttons h4{"
    +"margin: 0;"
    +"padding: 0;"
    +"font: bold 14px/20px Courier,serif;"
    +"}"
    +"#ttm_options{"
    +"clear:both;"
    +"display:none;"
    +"}"
    +"#ttm_menu_template{"
    +"}"
    +"#ttm_form_template{"
    +"width:340px;"
    +"}"
    +"#ttm_menu_speakers{"
    +"}"
    +"#ttm_form_speakers{"
    +"width:340px;"
    +"height:60px;"
    +"}"
    +"#ttm_menu_phrases{"
    +"clear:both;"
    +"}"
    +"#ttm_menu_button {"
    +"clear:both;"
    +"text-align:center;"
    +"}"
    +"#ttm_help{"
    +"clear:both;"
    +"display:none;"
    +"}"
    +""
    +"#ttm table {"
    +"border: 0;"
    +"border-collapse: separate;"
    +"border-spacing: 5px;"
    +"}"
    +"#ttm table th {"
    +"width: 80px;"
    +"padding: 3px;"
    +"text-align: right;"
    +"vertical-align: top;"
    +"color: #666;"
    +"line-height: 20px;"
    +"border-right: 3px solid #CCC;"
    +"}"
    +"#ttm table td {"
    +"padding: 3px;"
    +"text-align: left;"
    +"vertical-align: top;"
    +"}"
));
document.getElementsByTagName('head')[0].appendChild(styles);

//------------------------------------------------------------
// Script
/**
 * Main Class
 */
var TweetTheMinutes = function() {

    this.default_template = '{$speaker}『{$status}』';

    /**
     * Add cookie
     */
    this.addCookie = function(key, value) {
        if ( !key ) {
            return false;
        }
        document.cookie
            = key + '=' + escape(value) + '; '
            + 'expires=Tue, 1-Jan-2030 00:00:00 GMT; '
            + 'path=/; ';
    };
    /**
     * Get cookie
     */
    this.getCookie = function(key) {
        var cookies = document.cookie.split(';');
        for ( var i=0; i<cookies.length; i++ ) {
            if ( cookies[i].indexOf('=') < 0 ) continue;
            key_value  = cookies[i].replace(/(^[\s]+|;)/g,'');
            deli_index = key_value.indexOf('=');
            if ( key_value.substring(0,deli_index) == key ) {
                return unescape(key_value.substring(deli_index+1,key_value.length));
            }
        }
        return '';
    };
    
    /**
     * Save Settings to cookie
     */
    this.saveSettings = function() {
        if ( document.getElementById('ttm_options_template').value == '' ) {
            document.getElementById('ttm_options_template').value = _ttm.default_template;
        }
        _ttm.addCookie('ttm_options_template', document.getElementById('ttm_options_template').value);
        _ttm.addCookie('ttm_options_speakers', document.getElementById('ttm_options_speakers').value);
        alert('保存完了！');
        _ttm.buildButtons();
        _ttm.buttonsPanel();
    };
    
    this.applyTemplate = function(str) {
        if ( !document.getElementById('tweet-box-global') ) return false;
        
        var today = new Date();
        var y = today.getYear();
        var m = today.getMonth() + 1;
        var d = today.getDate();
        if (y < 2000) { y += 1900; }
        if (m < 10) { m = "0" + m; }
        if (d < 10) { d = "0" + d; }
        var h = today.getHours();
        var i = today.getMinutes();
        var s = today.getSeconds();

        var status = document.getElementById('tweet-box-global');
        //status.value = document.getElementById('ttm_options_template').value
        var template = _ttm.esc(_ttm.getCookie('ttm_options_template'))
            .replace(/(\{\$speaker\})/g,str)
            .replace(/(\{\$now\})/g,y+'/'+m+'/'+d+' '+h+':'+i)
            .replace(/(\{\$date\})/g,y+'/'+m+'/'+d)
            .replace(/(\{\$time\})/g,h+':'+i)
            .replace(/(\{\$y\})/g,y)
            .replace(/(\{\$m\})/g,m)
            .replace(/(\{\$d\})/g,d)
            .replace(/(\{\$h\})/g,h)
            .replace(/(\{\$i\})/g,i)
            .replace(/(\{\$s\})/g,s);
        status.focus();
        if ( template.indexOf('{$status}') > -1 ) {
            start_index = template.indexOf('{$status}');
            end_index = start_index+status.value.length;
            status.value = template.replace(/(\{\$status\})/g,status.value);
            status.setSelectionRange(start_index,end_index);
        } else {
            status.setSelectionRange(status.value.length,status.value.length);
        }
        return true;
    };
    
    this.applyPhrase = function(str) {
        //console.log('applyPhrase');
        //console.log(str);
        if ( !document.getElementById('tweet-box-global') ) return false;
        
        var today = new Date();
        var y = today.getYear();
        var m = today.getMonth() + 1;
        var d = today.getDate();
        if (y < 2000) { y += 1900; }
        if (m < 10) { m = "0" + m; }
        if (d < 10) { d = "0" + d; }
        var h = today.getHours();
        var i = today.getMinutes();
        var s = today.getSeconds();

        var status = document.getElementById('tweet-box-global');
        status.value += ' '+str
            .replace(/(\{\$now\})/g,y+'/'+m+'/'+d+' '+h+':'+i)
            .replace(/(\{\$date\})/g,y+'/'+m+'/'+d)
            .replace(/(\{\$time\})/g,h+':'+i)
            .replace(/(\{\$y\})/g,y)
            .replace(/(\{\$m\})/g,m)
            .replace(/(\{\$d\})/g,d)
            .replace(/(\{\$h\})/g,h)
            .replace(/(\{\$i\})/g,i)
            .replace(/(\{\$s\})/g,s);
        status.focus();
        status.setSelectionRange(status.value.length,status.value.length);
        return true;
    };
    
    this.buildButtons = function(str) {
        var ttm_options_template = _ttm.esc(_ttm.getCookie('ttm_options_template'));
        if ( !ttm_options_template ) {
            _ttm.addCookie('ttm_options_template', _ttm.default_template);
            ttm_options_template = _ttm.default_template;
        }
        document.getElementById('ttm_template').innerHTML = ttm_options_template;
        
        var speakers = _ttm.esc(_ttm.getCookie('ttm_options_speakers')).split("\n");
        var speaker_html = '<input type="button" value="(なし)" onclick="_ttm.applyTemplate(\'\');" class="btn" style="background-color:#FCC" />';
        for ( var i=0; i<speakers.length; i++ ) {
            if ( !speakers[i] ) break;
            speaker_html
                += '<input type="button" value="'+_ttm.esc(speakers[i])+'" class="btn" onclick="_ttm.applyTemplate(\''+_ttm.esc(speakers[i])+'\');" />';
        }
        document.getElementById('ttm_speakers').innerHTML = speaker_html;
    };
    
    this.buttonsPanel = function() {
        document.getElementById('ttm_buttons').style.display = 'block';
        document.getElementById('ttm_btn_buttons').setAttribute('class','btn disabled');
        document.getElementById('ttm_btn_buttons').disabled = 'disabled';
        document.getElementById('ttm_options').style.display = 'none';
        document.getElementById('ttm_btn_options').setAttribute('class','btn');
        document.getElementById('ttm_btn_options').disabled = false;
        document.getElementById('ttm_help').style.display = 'none';
        document.getElementById('ttm_btn_help').setAttribute('class','btn');
        document.getElementById('ttm_btn_help').disabled = false;
        document.getElementById('ttm').style.boxShadow = 'none';
        document.getElementById('ttm').style.MozBoxShadow = 'none';
        document.getElementById('ttm').style.WebkitBoxShadow = 'none';
        document.getElementById('ttm').style.background = '#EEE';
    };
    this.optionsPanel = function() {
        document.getElementById('ttm_buttons').style.display = 'none';
        document.getElementById('ttm_btn_buttons').setAttribute('class','btn');
        document.getElementById('ttm_btn_buttons').disabled = false;
        document.getElementById('ttm_options').style.display = 'block';
        document.getElementById('ttm_btn_options').setAttribute('class','btn disabled');
        document.getElementById('ttm_btn_options').disabled = 'disabled';
        document.getElementById('ttm_help').style.display = 'none';
        document.getElementById('ttm_btn_help').setAttribute('class','btn');
        document.getElementById('ttm_btn_help').disabled = false;
        document.getElementById('ttm').style.boxShadow = '0 0 5px 5px #999 inset';
        document.getElementById('ttm').style.MozBoxShadow = '0 0 5px 5px #999 inset';
        document.getElementById('ttm').style.WebkitBoxShadow = '0 0 5px 5px #999 inset';
        document.getElementById('ttm').style.background = '#DDD';
    };
    this.helpPanel = function() {
        document.getElementById('ttm_buttons').style.display = 'none';
        document.getElementById('ttm_btn_buttons').setAttribute('class','btn');
        document.getElementById('ttm_btn_buttons').disabled = false;
        document.getElementById('ttm_options').style.display = 'none';
        document.getElementById('ttm_btn_options').setAttribute('class','btn');
        document.getElementById('ttm_btn_options').disabled = false;
        document.getElementById('ttm_help').style.display = 'block';
        document.getElementById('ttm_btn_help').setAttribute('class','btn disabled');
        document.getElementById('ttm_btn_help').disabled = 'disabled';
        document.getElementById('ttm').style.boxShadow = '0 0 5px 5px #999 inset';
        document.getElementById('ttm').style.MozBoxShadow = '0 0 5px 5px #999 inset';
        document.getElementById('ttm').style.WebkitBoxShadow = '0 0 5px 5px #999 inset';
        document.getElementById('ttm').style.background = '#DDD';
    };

    /**
     * escape HTML specialchars
     */
    this.esc = function(str) {
        str = str.replace(/&/g,'&amp;');   // &
        str = str.replace(/</g,'&lt;');    // <
        str = str.replace(/>/g,'&gt;');    // >
        str = str.replace(/\"/g,'&quot;'); // "
        str = str.replace(/\'/g,'&#039;'); // '
        return str;
    };
    
    /**
     * init
     */
    this.init = function() {

        var div = document.createElement('div');
        div.setAttribute('id','ttm');
        document.getElementById('global-tweet-dialog').getElementsByTagName('form')[0].appendChild(div);
        
        //console.log('init2');
        
        // HTML
        var html 
            = '<h3 id="ttm_title">TweetTheMinutes</h3>'
            + '<button id="ttm_btn_help" class="btn" type="button">ヘルプ</button>'
            + '<button id="ttm_btn_options" class="btn" type="button">設定</button>'
            + '<button id="ttm_btn_buttons" class="btn disabled" type="button" disabled="disabled">ボタン</button>'
            
            // Action panel
            + '<div id="ttm_buttons">'
            +   '<table>'
            +   '<tr>'
            +   '<th>テンプレート</th>'
            +   '<td><div id="ttm_template"></div></td>'
            +   '</tr>'
            +   '<tr>'
            +   '<th>発言者</th>'
            +   '<td><div id="ttm_speakers"></div></td>'
            +   '</tr>'
            +   '</table>'
/*
            +   '<tr>'
            +   '<th>Phrases</th>'
            +   '<td><div id="ttm_phrases"></div></td>'
            +   '</tr>'
            
            +   '<h4>Utility</h4>'
            +   '<div id="ttm_utilities">'
            +     '<input type="button" value="日時(YYYY/MM/DD HH:MI)" onclick="_ttm.applyPhrase(\'{$now}\');" />'
            +     '<input type="button" value="日付(YYYY/MM/DD)" onclick="_ttm.applyPhrase(\'{$date}\');" />'
            +     '<input type="button" value="時間(HH:MI)" onclick="_ttm.applyPhrase(\'{$time}\');" />'
            +   '</div>'
*/
            + '</div>'
            
            // Options panel
            + '<div id="ttm_options">'
            +   '<table>'
            +   '<tr>'
            +   '<th>テンプレート</th>'
            +   '<td><input type="text" id="ttm_options_template" name="ttm_options_template" value="" /><br />'
            +     '<span>'
            +     'テンプレートを定義します。<br />'
            +     '使用可能タグは {$speaker}{$status}{$now}{$date}{$time} …<a href="javascript:_ttm.helpPanel();">説明</a>'
            +     '</span>'
            +   '</td>'
            +   '</tr>'
            +   '<tr>'
            +   '<th>発言者</th>'
            +   '<td><textarea id="ttm_options_speakers"></textarea><br />'
            +   '<span>発言者を改行区切りで複数登録できます</span></td>'
            +   '</tr>'
            +   '<tr>'
            +   '<td style="text-align:center;" colspan="2"><input type="button" value="保存" onclick="_ttm.saveSettings();" /></td>'
            +   '</tr>'
            +   '</table>'
/*
            +   '<div id="ttm_options_phrases">'
            +     '<label for="ttm_form_phrases">Phrasess:</label><br />'
            +     '<textarea id="ttm_form_phrasess"></textarea><br />'
            +     '<small>よく使うフレーズを改行区切りで複数登録できます</small>'
            +   '</div>'
*/
            + '</div>'
            
            // Help panel
            + '<div id="ttm_help">'
            +   '<h4>使用可能タグ</h4>'
            +   '<ul>'
            +   '<li><b>{$speaker}</b> ボタンを選択したSpeakerに変換されます。</li>'
            +   '<li><b>{$status}</b> すでにツイート欄に入っているテキスト</li>'
            +   '<li><b>{$now}</b> 現在の日時。「YYYY/MM/DD HH:MI」形式</li>'
            +   '<li><b>{$date}</b> 現在の日付。「YYYY/MM/DD」形式</li>'
            +   '<li><b>{$time}</b> 現在の時間。「HH:MI」形式</li>'
            +   '<li><b>{$y}</b> 現在の年。「YYYY」形式</li>'
            +   '<li><b>{$m}</b> 現在の月。「MM」形式</li>'
            +   '<li><b>{$d}</b> 現在の日。「DD」形式</li>'
            +   '<li><b>{$h}</b> 現在の時。「24」形式</li>'
            +   '<li><b>{$i}</b> 現在の分。「00」形式</li>'
            +   '<li><b>{$s}</b> 現在の秒。「00」形式</li>'
            +   '</ul>'
            + '</div>'
            ;
        
        document.getElementById('ttm').innerHTML = html;
        
        _ttm.buildButtons();
        
        document.getElementById('ttm_options_template').value = _ttm.esc(_ttm.getCookie('ttm_options_template'));
        document.getElementById('ttm_options_speakers').value = _ttm.esc(_ttm.getCookie('ttm_options_speakers'));
        
        // Setting Switch
        _ttm._AddEventListener(document.getElementById('ttm_btn_buttons'), 'click', _ttm.buttonsPanel);
        _ttm._AddEventListener(document.getElementById('ttm_btn_options'), 'click', _ttm.optionsPanel);
        _ttm._AddEventListener(document.getElementById('ttm_btn_help'), 'click', _ttm.helpPanel);
        
        return true;
    };
    
    /**
     * Crossbrowser addEventListener
     */
    this._AddEventListener = function(e, type, fn) {
        if (e.addEventListener) {
            e.addEventListener(type, fn, false);
        }
        else {
            e.attachEvent('on' + type, function() {
                fn(window.event);
            });
        }
    };
}

/* add Class to global */
var script = document.createElement('script');
script.type = 'text/javascript';
script.text
    = 'var TweetTheMinutes = ' + TweetTheMinutes.toString() + ';'
    + 'var _ttm = new TweetTheMinutes();'
document.body.appendChild(script);
var _ttm = new TweetTheMinutes();

if ( document.getElementById('global-tweet-dialog') ) {
    _ttm.init();
}