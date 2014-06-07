// ==UserScript==
// @name           Another JTV XL
// @version        1.6
// @namespace      
// @author         Poznavator
// @description    A mod of Better JTV and JTV plus lite, it's not tidy but it kind of works
// @include        http://justin.tv/*
// @include        http://*.justin.tv/*
// @delay 2000
// ==/UserScript==


// better jtv mod start
function betterjtv_init()
{
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://raw.github.com/drewmerc/drewjtv.js/master/JTV_XL.js?"+Math.random();
    thehead = document.getElementsByTagName('head')[0];
    if(thehead) thehead.appendChild(script);
}

betterjtv_init();
// better jtv mod end

// jtv plus lite mod start
(function () {
    
    var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
    var d = w.document;
    var l = w.location;
    
    //JTV PLUS Class
    var JTVP = function() {
        this.$ = function( id ) {
            return document.getElementById(id);
        };
        
        this.$$ = function(Class) {
            return document.getElementsByClassName(Class);
        };
        
        this.$$$ = function(tag) {
            return document.getElementsByTagName(tag);
        };

        /**
         * Function Reload Channel List
         */
        this.checkChannelList = function () {
            if(!this.config.enhance.reload) return;
            var url = '';
            var lang = '';
            if(l.href.match(/directory\?/)) {
                if(l.href.match(/(lang=(.{2,6}))(\&|$)/i))
                    lang = RegExp.$2;
            } else return;
            if(!this.$$('hint').length || this.$$('hint')[0].parentNode.childNodes.length > 3)    return;
            
            this.$$('hint')[0].parentNode.innerHTML += '<li id="reloadMessage" style="background:#0080FF; color:#FFF; margin-top:1.4286em; padding:0.3575em; text-align:center;">';
            url = 'http://api.justin.tv/api/stream/list.json?language=' + lang;
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                headers: {
                    'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                    'Accept': 'application/atom+xml,application/xml,text/xml',
                },
                onreadystatechange: function (responseDetails) {
                    switch (responseDetails.readyState) {
                        case 1: jtvp.$('reloadMessage').innerHTML = 'Please wait, channel list loading.......'; break;
                        case 2: jtvp.$('reloadMessage').innerHTML = 'Please wait, channel list loaded........'; break;
                        case 3: jtvp.$('reloadMessage').innerHTML = 'Please wait, channel list interactive...'; break;
                        case 4: jtvp.$('reloadMessage').innerHTML = 'Complete <a style="color:#FF0; cursor:pointer;" onclick="javascript:t=document.getElementById(\'reloadMessage\');t.parentNode.removeChild?(t);"> [Close]</a>'; break;
                    }
                },
                onload: function(responseStr) {
                    var jData = eval(responseStr.responseText);
                    var channelListHtml = '';
                    var channelCount = 0;
                    for (var i=0; i<jData.length; i++)
                    {
                        brocasterId     = jData[i]['channel']['login'];
                        brocastingTitle = (typeof jData[i]['title'] !== 'undefined')?jData[i]['title']:'LIVE NOW!';
                        channelImage     = jData[i]['channel']['screen_cap_url_medium'];
                        viewerCount     = jData[i]['stream_count'];
                        channelUrl         = jData[i]['channel']['channel_url'];
                        buttomTitle     = jData[i]['channel']['title'];
                        
                        channelListHtml +=     '<li id="channel_' + brocasterId + '" class="list_item channel vert-2_col ' + ( (parseInt(i)+1) %4 == 0?'last':'') + '" >'
                                        +        '<a class="thumb" href="/' + brocasterId + '">'
                                        +            '<img id="lateload' + i + '" class="cap lateload" style="" src="' + channelImage+ '" src1="' + channelImage+ '" alt="">'
                                        +            '<span class="overlay viewers_count">' + viewerCount + ' Viewers </span>'
                                        +        '</a>'
                                        +        '<a class="title" href="/' + brocasterId + '">' + brocastingTitle + '</a>'
                                        +        '<span class="small"> on '
                                        +            '<a href="' + channelUrl + '/videos">' + buttomTitle + '</a>'
                                        +        '</span>'
                                        +    '</li>';
                        channelCount++;
                    }
                    jtvp.$$('channel_list')[0].innerHTML += channelListHtml;
                    jtvp.$('reloadMessage').innerHTML = 'Found ' + channelCount + ' channel(s) <a style="color:#FF0; cursor:pointer;" onclick="javascript:t=document.getElementById(\'reloadMessage\');t.parentNode.removeChild?(t);"> [Close]</a>';
                }
            });
        };
        
        
        /**
         * DOM Descriptions
         */
        this.hiddenDOMDescriptions = [
            [0,     {id:0, desc:'Hide site header'                            , name:'header'     ,enable:0}],
            [1,     {id:1, desc:'Hide next channel'                            , name:'random'     ,enable:1}],
            [2,     {id:2, desc:'Remove advertisments'                        , name:'ads'         ,enable:1}],
            [3,     {id:3, desc:'Hide background image and banner image'    , name:'background'    ,enable:1}],
            [4,     {id:4, desc:'Hide banner'                                , name:'banner'     ,enable:1}],
            [5,     {id:5, desc:'Hide Info'                                    , name:'info'         ,enable:1}],
            [6,     {id:6, desc:'Hide actions'                                , name:'actions'     ,enable:1}],
            [7,     {id:7, desc:'Hide related channel'                        , name:'related'     ,enable:1}],
            [8,     {id:8, desc:'Hide channel about'                        , name:'about'         ,enable:1}],
            [9,     {id:9, desc:'Hide footer'                                , name:'footer'     ,enable:1}],
            [10,     {id:10, desc:'Hide meebo'                                , name:'meebo'         ,enable:1}]
        ];
        
        /**
         * hide DOM list (classify by id, class and tag)
         */
        this.hiddenDOMs = {
            header: {
                id: {
                    site_header:''
                }
            },
            random: {
                class: {
                    admin_nxtchan:''
                }
            },
            ads: {
                id: {
                    iphone_banner:'', 
                    google_ads_div_ClipTop:'', 
                    google_ads_div_ClipBottom:'', 
                    frontpage_takeover_banner:'', 
                    ad_holder:'', 
                    google_ads_div_DirectoryMedRectv2:'', 
                    ChanMedRectv2:'', 
                    DirectoryMedRectv2:'', 
                    go_pro_link:'', 
                    adaptv_ad_player_div:'', 
                    PopUnderChan:'',
                    google_ads_div_ChanMedRectv2:'',
                    google_ads_div_SearchMedRect:'',
                    abgc:'',
                    DirectoryLeaderBottomv2:'',
                    DirectoryMedRectBottomv2:'',
                    ChanLeaderBottomv2_holder:'',
                    ChanLeaderBottomv2:''
                },
                class: {
                    managed_ad:'',
                    right_col:'',
                    ad:'',
                    footer_ad:''
                }
            },
            background: {
                id: {
                    page_wrapper:'',
                    body_wrapper:'',
                    status:'',
                    left_col:'',
                    right_col:'',
                    stats:'',
                    popped:'',
                    status_tab:'',
                    directory:''
                },
                class: {
                    col_bg:'',
                    box:'',
                    left_col:''
                },
                tag: {
                    body:''
                }
            }, 
            banner: {
                id: {
                    banner_custom:'',
                    banner_default:''
                }
            },
            info:{
                id:{
                    info:''
                }
            },
            actions:{
                id:{
                    actions:''
                }
            },
            related:{
                id:{
                    related:''
                }
            },
            about:{
                id:{
                    about:''
                }
            },
            footer:{
                id:{
                    footer:''
                }
            },
            meebo:{
                id:{
                    meebo:''
                }
            }
        };
        
        /*
        this.getHiddenDOMDescriptions = function (id) {
            for (var i=0; i<this.hiddenDOMDescriptions.length; i++) {
                if(this.hiddenDOMDescriptions[i][1]['id'] == id) {
                    return this.hiddenDOMDescriptions[i][1];
                }
            }
        }
        */
        
        /**
         * Enhance Function Descriptions
         */
        this.enhanceDescriptions = [
            [0, {id:0, desc:'Alert message before leave channel'    , name:'alert'         , enable:0}],
            [1, {id:1, desc:'Channel heightlight'                    , name:'height'     , enable:1}], //Unfinished
            [2, {id:2, desc:'Chatroom log'                            , name:'log'         , enable:1}], //Unfinished
            [3, {id:3, desc:'Auto refresh channel list'                , name:'reload'     , enable:1}]
        ];
        
        /*
        this.getEnhanceDescriptions = function (id) {
            for (var i=0; i<this.enhanceDescriptions.length; i++) {
                if(this.enhanceDescriptions[i][1]['id'] == id) {
                    return this.enhanceDescriptions[i][1];
                }
            }
        };
        */
        
        /**
         * Function add cookie
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
         * Configs
         */
        this.config = {
            videosize: {
                w: '830',
                h: '614'
            },
            chatroomsize: {
                w: '510',
                h: '503'
            }, 
            colors: {
                background: '000000',
                font: 'FFFFFF'
            },
            hidden: {
                header: 0,
                random: 1,
                ads: 1,
                background: 1,
                banner:    1,
                info: 1,
                actions: 1,
                related: 1,
                about: 1,
                footer: 1,
                meebo: 1
            },
            enhance: {
                alert: 0,
                height: 1,
                log: 1,
                reload: 1
            }
        };
        
        /**
         * set Config to cookie
         */
        this.setConfigs = function (){
            var config 
                = '{'
                +    'videosize: {'
                +        'w:"' + this.$('jtvp_config_videow').value + '",'
                +        'h:"' + this.$('jtvp_config_videoh').value + '"'
                +    '},'
                +    'chatroomsize: {'
                +        'w:"' + this.$('jtvp_config_chatw').value + '",'
                +        'h:"' + this.$('jtvp_config_chath').value + '"'
                +    '},'
                +    'colors: {'
                +        'background:"'+ this.$('jtvp_bg_color').value + '",'
                +        'font:"' + this.$('jtvp_font_color').value + '"'
                +    '},'
                +     'hidden: {'
                +        'header:'        + (this.$('jtvp_config_header')     && this.$('jtvp_config_header').checked?1:0)     + ','
                +        'random:'        + (this.$('jtvp_config_random')     && this.$('jtvp_config_random').checked?1:0)     + ','
                +        'ads:'            + (this.$('jtvp_config_ads')         && this.$('jtvp_config_ads').checked?1:0)         + ','
                +        'background:'    + (this.$('jtvp_config_background') && this.$('jtvp_config_background').checked?1:0) + ','
                +        'banner:'        + (this.$('jtvp_config_banner')     && this.$('jtvp_config_banner').checked?1:0)     + ','
                +        'info:'            + (this.$('jtvp_config_info')         && this.$('jtvp_config_info').checked?1:0)         + ','
                +        'actions:'        + (this.$('jtvp_config_actions')     && this.$('jtvp_config_actions').checked?1:0)     + ','
                +        'related:'        + (this.$('jtvp_config_related')     && this.$('jtvp_config_related').checked?1:0)     + ','
                +        'about:'        + (this.$('jtvp_config_about')         && this.$('jtvp_config_about').checked?1:0)     + ','
                +        'footer:'        + (this.$('jtvp_config_footer')     && this.$('jtvp_config_footer').checked?1:0)     + ','
                +        'meebo:'        + (this.$('jtvp_config_meebo')         && this.$('jtvp_config_meebo').checked?1:0)     + ''
                +     '},'
                +    'enhance: {'
                +        'alert:'    + (this.$('jtvp_config_alert')     && this.$('jtvp_config_alert').checked?1:0)  + ','
                +        'height:'    + (this.$('jtvp_config_height') && this.$('jtvp_config_height').checked?1:0) + ','
                +        'log:'        + (this.$('jtvp_config_log')     && this.$('jtvp_config_log').checked?1:0)      + ','
                +        'reload:'    + (this.$('jtvp_config_reload') && this.$('jtvp_config_reload').checked?1:0) + ''
                +    '}'
                + '}';
                
                if( !/#?[0-9A-Fa-f]{6}/.test(this.$('jtvp_bg_color').value) || this.$('jtvp_bg_color').value.length != 6 || !/#?[0-9A-Fa-f]{6}/.test(this.$('jtvp_font_color').value) || this.$('jtvp_font_color').value.length != 6) {
                    alert('illegal color value (000000 - FFFFFF), 6 characters');
                    return;
                }
                
                if(/[^0-9]/.test(this.$('jtvp_config_videow').value) || /[^0-9]/.test(this.$('jtvp_config_videoh').value) || /[^0-9]/.test(this.$('jtvp_config_chatw').value) || /[^0-9]/.test(this.$('jtvp_config_chath').value)) {
                    alert('size of chatroom or video are integer and decimal numbers only.');
                    return;
                }
                
                this.addCookie('jtvp_config', config);
                this.init();
        };
        
        /**
         * Get Config from cookie
         */
        this.getConfig = function() {
            var config = this.getCookie('jtvp_config');
            if ( config ) {
                this.config = eval('('+config+')');
            }
        };
        /**
         * Function create Menu
         */
        this.createMenu = function () {
            var a = d.createElement('a'); //Main config area
            a.id = 'jtvp_config';
            a.href = 'javascript:jtvp.openConfig();';
            a.title = 'Open JTV Plus configration panel.';
            a.innerHTML = '°º-Config-º°';
            a.style.display = 'compact';
            a.style.width    = '100px';
            a.style.height   = '20px';
            a.style.overflow = 'hidden';
            a.style.zIndex   = '9999';
            a.style.position = 'absolute';
            a.style.top      = '-16px';
            a.style.right    = '70px';
            a.style.color    = '#606060';
            d.body.appendChild(a);
			
//css fix if it fails		
	
			var a = d.createElement('a'); //Refresh Flash player
            a.id = 'jtvp_refresh';
            a.href = 'javascript:jtvp.setConfigs();';
            a.title = 'If you have to press this everytime you load a page increase the @delay meta tag';
            a.innerHTML = '°º-FIX-º°';
            a.style.display = 'compact';
            a.style.width = '100px';
            a.style.height = '20px';
            a.style.overflow = 'hidden';
            a.style.zIndex = '9999';
            a.style.position = 'absolute';
            a.style.top = '-16px';
            a.style.right = '170px';
            a.style.color = '#606060';
            d.body.appendChild(a); 
            
            var b = d.createElement('div'); //config panel
            b.id = 'jtvp_config_panel';
            b.style.display = 'none';
            b.style.border = '1px solid #FFFFFF';
            b.style.margin = '1px';
            b.style.padding = '3px';
            b.style.position = 'absolute';
            b.style.right = '5px';
            b.style.overflow = 'hidden';
            b.style.top = '15px';
            b.style.width = '470px';
            b.style.background = '#262626';
            b.style.color = '#FFFFFF';
            b.style.zIndex = '9999';
            
            b.innerHTML 
                = '<div class="jtvp_config">'
                +        '<table width="100%">'
                +            '<tbody>'
                +                '<th colspan="4">JTV XL</th>';
                
                for(var i=0; i<this.hiddenDOMDescriptions.length; i++) {
                    config = this.hiddenDOMDescriptions[i][1];
                    b.innerHTML +='<tr>'
                    +                '<td>'
                    +                    '<label class="jtvp_config_label" style="margin:0; width:300px; cursor:pointer;" onmouseover="javascript:jtvp.configHover(\''+ config.name + '\', 1);" onmouseout="javascript:jtvp.configHover(\'' + config.name + '\', 0);">'
                    +                        '<input type="Checkbox" id="jtvp_config_' + config.name + '" class="jtvp_config_opt" name="' + config.name + '" '
                    +                                (this.config.hidden[config.name]?'checked=checked>':'>')
                    +                        config.desc + '</label>'
                    +                '</td>'
                    +            '</tr>';
                }
                
                for(var i=0; i<this.enhanceDescriptions.length; i++) {
                    config = this.enhanceDescriptions[i][1];
                    if(config.name=='log' || config.name=='height') continue;
                    b.innerHTML +='<tr>'
                    +                '<td>'
                    +                    '<label class="jtvp_config_label" style="margin:0; width:300px; cursor:pointer;" onmouseover="javascript:jtvp.configHover(\''+ config.name + '\', 1);" onmouseout="javascript:jtvp.configHover(\'' + config.name + '\', 0);">'
                    +                        '<input type="Checkbox" id="jtvp_config_'+config.name+'" class="jtvp_config_opt" name="' + config.name + '" '
                    +                                (this.config.enhance[config.name]?'checked=checked>':'>')
                    +                        config.desc + '</label>'
                    +                '</td>'
                    +            '</tr>';
                }
                b.innerHTML +='</tbody>'
                +        '</table>'
                
                // sample view 
                 +        '<div style="width: 150px; position: absolute; top:30px;right:15px; border:1px #888 solid;">'
                 +            '<div style="text-align: center;">In channel page</div>'
                 +           '<div id="jtvp_samples_header" style="height: 15px;" class="jtvp_samples" name="header" title="header" onmouseover="javascript:jtvp.simpleViewHover(\'header\',1);" onmouseout="jtvp.simpleViewHover(\'header\',0);"></div>'
                 +           '<div id="jtvp_samples_background" class="jtvp_samples" name="background" style="height: 130px; width: auto; padding-top:10px;" title="background" >'
                 +               '<div style="position: absolute; left: 9%; width: 50%;">'
                 +                   '<div id="jtvp_samples_banner" style="height: 8px;" class="jtvp_samples" name="banner" title="banner" onmouseover="javascript:jtvp.simpleViewHover(\'banner\',1);" onmouseout="jtvp.simpleViewHover(\'banner\',0);"></div>'
                 +                   '<div id="jtvp_samples_info" style="height: 8px;" class="jtvp_samples" name="info" title="info" onmouseover="javascript:jtvp.simpleViewHover(\'info\',1);" onmouseout="jtvp.simpleViewHover(\'info\',0);"></div>'
                 +                   '<div id="jtvp_samples_video" style="height: 35px;" class="jtvp_samples" name="video" title="video" onmouseover="javascript:jtvp.simpleViewHover(\'video\',1);" onmouseout="jtvp.simpleViewHover(\'video\',0);"></div>'
                 +                   '<div id="jtvp_samples_actions" style="height: 20px;" class="jtvp_samples" name="actions" title="actions" onmouseover="javascript:jtvp.simpleViewHover(\'actions\',1);" onmouseout="jtvp.simpleViewHover(\'actions\',0);"></div>'
                 +                   '<div id="jtvp_samples_about" style="height: 25px;" class="jtvp_samples" name="about" title="about" onmouseover="javascript:jtvp.simpleViewHover(\'about\',1);" onmouseout="jtvp.simpleViewHover(\'about\',0);"></div>'
                 +                   '<div id="jtvp_samples_custom" style="height: 5px; display:none;" class="jtvp_samples" name="custom" title="custom"></div>'
                 +               '</div>'
                 +               '<div style="position: absolute; right: 9%; width: 30%;">'
                 +                   '<div id="jtvp_samples_ads" style="height: 25px;" class="jtvp_samples" name="ads" title="ads" onmouseover="javascript:jtvp.simpleViewHover(\'ads\',1);" onmouseout="jtvp.simpleViewHover(\'ads\',0);"></div>'
                 +                   '<div id="jtvp_samples_chatroom" style="height: 35px;" class="jtvp_samples" name="chatroom" title="chatroom" onmouseover="javascript:jtvp.simpleViewHover(\'chatroom\',1);" onmouseout="jtvp.simpleViewHover(\'chatroom\',0);"></div>'
                 +                   '<div id="jtvp_samples_log" style="height: 5px; display:none;" class="jtvp_samples" name="log" title="log" onmouseover="javascript:jtvp.simpleViewHover(\'log\',1);" onmouseout="jtvp.simpleViewHover(\'log\',0);"></div>'
                 +                   '<div id="jtvp_samples_related" style="height: 25px;" class="jtvp_samples" name="related" title="related" onmouseover="javascript:jtvp.simpleViewHover(\'related\',1);" onmouseout="jtvp.simpleViewHover(\'related\',0);"></div>'
                 +               '</div>'
                 +                '<div id="jtvp_samples_random" style="width: 4px; right: 1px; float: right; height: 2px;" class="jtvp_samples" name="admin_nxtchan" title="next channel" onmouseover="javascript:jtvp.simpleViewHover(\'random\',1);" onmouseout="jtvp.simpleViewHover(\'random\',0);"></div>'
                 +                '<div id="jtvp_samples_alert"style="margin: auto; width: 35px; height: 20px; position: relative; top: 40px; display:none;" class="jtvp_samples" name="alert" title="alert" onmouseover="javascript:jtvp.simpleViewHover(\'alert\',1);" onmouseout="jtvp.simpleViewHover(\'alert\',0);"></div>'
                 +           '</div>'
                 +           '<div id="jtvp_samples_footer" style="height: 20px;" class="jtvp_samples" name="footer" title="footer" onmouseover="javascript:jtvp.simpleViewHover(\'footer\',1);" onmouseout="jtvp.simpleViewHover(\'footer\',0);"></div>'
                 +           '<div id="jtvp_samples_meebo" style="height: 8px; margin-top:2px;" class="jtvp_samples" name="meebo" title="meebo" onmouseover="javascript:jtvp.simpleViewHover(\'meebo\',1);" onmouseout="jtvp.simpleViewHover(\'meebo\',0);"></div>'
                 +        '</div>'
                
                //video and chatroom size
                +        '<table width="100%">'
                +            '<tbody>'
                +                '<th colspan="4">Chatroom and video size and colors</th>'
                +                '<tr name="colors" style="padding-left:5px; margin-top:3px;">'
                +                    '<td>Colors : </td>'
                +                    '<td><label style="margin-top:2px;">Background : #<input type="text" style="font-size:small;" size="4" id="jtvp_bg_color" value="' + this.config.colors.background + '"></label></td>'
                +                    '<td><label style="margin-top:2px;">Font : #<input type="text" style="font-size:small;" size="4" id="jtvp_font_color" value="' + this.config.colors.font + '"></label></td>'
                +                    '<td></td>'
                +                    '</tr>'
                +                    ''
                +                '</tr>'
                +                '<tr name="video"  style="padding-left:5px; margin-top:3px;" onmouseover="javascript:jtvp.configHover(\'video\', 1);" onmouseout="javascript:jtvp.configHover(\'video\', 0);">'
                +                    '<td id="jtvp_config_video">Live video : '
                +                    '</td>'
                +                    '<td>'
                +                        '<label style="margin-top:3px;" title="default:630px">Width : <input type="text" id="jtvp_config_videow" style="font-size:small;" size="1" value=' + this.config.videosize.w + '> px, </label>'
                +                    '</td>'
                +                    '<td>'
                +                        '<label style="margin-top:3px;" title="default:354px">Height : <input type="text" id="jtvp_config_videoh" style="font-size:small;" size="1" value=' + this.config.videosize.h + '> px </label>'
                +                    '</td>'
                +                    '<td>'
                +                    '</td>'
                +                '</tr>'
                +                '<tr name="chatroom"  style="padding-left:5px; margin-top:3px;" onmouseover="javascript:jtvp.configHover(\'chatroom\', 1);" onmouseout="javascript:jtvp.configHover(\'chatroom\', 0);">'
                +                    '<td id="jtvp_config_chatroom">Chatroom : '
                +                    '</td>'
                +                    '<td>'
                +                        '<label style="margin-top:3px;" title="default:310px">Width : <input type="text" id="jtvp_config_chatw" style="font-size:small;" size="1" value=' + this.config.chatroomsize.w + '> px, </label>'
                +                    '</td>'
                +                    '<td>'
                +                        '<label style="margin-top:3px;" title="default:408px">Height : <input type="text" id="jtvp_config_chath" style="font-size:small;" size="1" value=' + this.config.chatroomsize.h + '> px </label>'
                +                    '</td>'
                +                    '<td>'
                +                    '</td>'
                +                '</tr>'
                +                '<tr>'
                +                    '<td colspan="4" align="center"> <input type="button" value="Save" onClick="javascript:jtvp.setConfigs();" title="Save"> &nbsp;'
                +                    '<input type="button" value="Close" onClick="javascript:jtvp.closeConfig();" title="Close"> </td>'
                +                '</tr>'
                +            '</tbody>'
                +        '</table>';
                d.body.appendChild(b);
        };
        
        this.simpleViewHover = function(id, inout) {
            if(inout)
                this.$('jtvp_config_' + id).parentNode.style.backgroundColor ='#484848';
            else
                this.$('jtvp_config_' + id).parentNode.style.backgroundColor ='';
        };
        
        this.configHover = function(id, inout) {
            if(id == 'reload') return;
            if(inout) {
                if(id == 'alert')
                    this.$('jtvp_samples_' + id).style.display ='block';
                this.$('jtvp_samples_' + id).style.backgroundColor ='#999999';
            } else {
                if(id == 'alert')
                    this.$('jtvp_samples_' + id).style.display ='none';
                this.$('jtvp_samples_' + id).style.backgroundColor ='';
            }
        };
        
        /**
         * Function create XmlHttpRequest
         */
        this.createXHR = function() {
            if ( window.ActiveXObject ) {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e2) {
                        return null;
                    }
                }
            } else if ( window.XMLHttpRequest ) {
                return new XMLHttpRequest();
            } else {
                return null;
            }
        };
        
        /**
         * Function open configration panel
         */
        this.openConfig = function () {
            this.$('jtvp_config_panel').style.display = 'block';
        };
        
        this.closeConfig = function () {
            this.$('jtvp_config_panel').style.display = 'none';
            this.$('jtvp_config').setAttribute('onClick', 'javascript:jtvp.openConfig();');
            this.$('jtvp_config').title='Open JTV Plus configration panel.'
            this.$('jtvp_config').innerHTML = '°º-Config-º°';
        }
        
        this.beforeClose = function () {
            return 'Close?';
        }
        /**
         * init
         */
        this.init = function() {
            this.getConfig();
            var ww = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
            /**
             * Hide Elements.
             */
            try {
                for ( t in this.config.hidden) {
                    if (this.config.hidden[t]) {
                        for ( h in this.hiddenDOMs[t]) {
                            for ( key in this.hiddenDOMs[t][h]) {
                                //if(key == 'adaptv_ad_player_div') alert('.....');
                                var target;
                                if(h == 'id') target = this.$(key);
                                if(h == 'class') target = this.$$(key);
                                if(h == 'tag') target = this.$$$(key);
                                if(h == 'id') {
                                    switch(t) {
                                        //case 'random':        try {this.$('admin_nxtchan').style.display='none';}catch(x){} break;
                                        case 'about':        try {target.parentNode.style.display='none';}catch(x){} break;
                                        case 'background':     try {target.style.cssText='background:#'+ this.config.colors.background + '; color:#' + this.config.colors.font + ';'; this.$('chat_lines').style.color='#000000';}catch(x){} break;
                                        case 'ads' :        try {
                                                                target.parentNode.removeChild(target);
                                                                ww.AdLoader=null;
                                                                ww.adaptvUtils=null;
                                                                ww.adaptvAdPlayer=null;
                                                                ww.adaptvBrowserDetect=null;
                                                                ww.adaptvCompanionAdTag=null;
                                                            }catch(x){} break;
                                        default:try {target.style.cssText='display:none !important;';}catch(x){} break;
                                    }
                                } else {
                                    switch(t) {
                                        //case 'about':        for(var i=0; i<target.length; i++) {try {target[i].parentNode.style.display='none';}catch(x){}} break;
                                        case 'background':     for(var i=0; i<target.length; i++) {try {target[i].style.cssText='background:#'+ this.config.colors.background + '; color:#' + this.config.colors.font + ';'; this.$('chat_lines').style.color='#000000';}catch(x){}} break;
                                        case 'ads' :        try {target.style = 'none !important;';}catch(x){} break;
                                        default:for(var i=0; i<target.length; i++) {try {target[i].style.cssText='display:none !important;';}catch(x){}} break;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        for ( h in this.hiddenDOMs[t]) {
                            for ( key in this.hiddenDOMs[t][h]) {
                                var target;
                                if(h == 'id') target = this.$(key);
                                if(h == 'class') target = this.$$(key);
                                if(h == 'tag') target = this.$$$(key);
                                if(h == 'id') {
                                    switch(t) {
                                        case 'about':        try {target.parentNode.style.display='';}catch(x){} break;
                                        case 'background':     try {target.style.cssText=''}catch(x){} break;
                                        case 'ads' :        try {target.parentNode.removeChild(target);}catch(x){} break;
                                        default:try {target.style.cssText='';}catch(x){} break;
                                    }
                                } else {
                                    switch(t) {
                                        //case 'about':        for(var i=0; i<target.length; i++) {try {target[i].parentNode.style.display='none';}catch(x){}} break;
                                        case 'background':     for(var i=0; i<target.length; i++) {try {target[i].style.cssText=''}catch(x){}} break;
                                        case 'ads' :        try {target.style = '';}catch(x){} break;
                                        default:for(var i=0; i<target.length; i++) {try {target[i].style.cssText='';}catch(x){}} break;
                                    }
                                }
                            }
                        }
                    }
                }
                
                /**
                 * Alert
                 */
                if(ww.onbeforeunload=='video_player().pause_video();' || /close/ig.test(onbeforeunload))
                    if (this.config.enhance.alert)
                        ww.onbeforeunload=function() {return 'Close?'};
                    else
                        ww.onbeforeunload='video_player().pause_video();';
                
                /**
                 * set chatroom size
                 */
                if(!/[^0-9\.]/.test(parseInt(this.config.chatroomsize.h)) || !/[^0-9\.]/.test(parseInt(this.config.chatroomsize.w))) {
                    this.$('chat_lines').style.height     = this.config.chatroomsize.h + 'px';
                    this.$('chat_lines').style.width     = this.config.chatroomsize.w + 'px';
                } 
                /**
                 * set video size
                 */
                if(!/[^0-9\.]/.test(this.config.videosize.h) || !/[^0-9\.]/.test(this.config.videosize.w)) {
                    this.$('live_site_player_flash').style.height     = this.config.videosize.h + 'px';
                    this.$('live_site_player_flash').style.width     = this.config.videosize.w + 'px';
                    this.$('standard_holder').style.height             = this.config.videosize.h + 'px';
                    this.$('standard_holder').style.width             = this.config.videosize.w + 'px';
                }
                
                if(this.$('live_site_player_flash').offsetWidth + this.$('right_col').offsetWidth > 960) {
                    this.$('left_col').style.width = this.$('live_site_player_flash').offsetWidth + 10 + 'px';
                    this.$('right_col').style.width = this.$('chat_lines').offsetWidth + 10 + 'px';
                    this.$$('wrapper')[0].style.width = this.$('live_site_player_flash').offsetWidth + this.$('right_col').offsetWidth + 20 + 'px';
                }
            } catch (x){}
        }
    }
    
    GM_addStyle('.jtvp_samples:hover{background:#999;}');
    GM_addStyle('.jtvp_samples{padding:1px; min-height:10px; background:#333; border:1px solid #555;}');
    GM_addStyle('.jtvp_config_label{width:300px;} .jtvp_config_label:hover{background:#484848;}');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.text
        = 'var JTVP = ' + JTVP.toString() + ';'
        + 'var jtvp = new JTVP();'
    d.body.appendChild(script);
    
    var jtvp = new JTVP();
    jtvp.init();
    jtvp.checkChannelList();
    jtvp.createMenu();
	

    
}) ()

//remove watch with ipad crap
var words = {
"iPhone" : " ", "Watch on" : " ",  "iPad" : " ",  "or" : " ",
"":""};

String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
return (",pre,blockquote,code,input,button,textarea".indexOf(","+tag) == -1);
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
if(word != "") {
regexs.push(new RegExp("\\b"+word.prepareRegex().replace(/\*/g,'[^ ]*')+"\\b", 'gi'));
replacements.push(words[word]);
}
}

var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0,l=regexs.length; x<l; x++) {
	text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
	}
}

// Source: http://wiki.greasespot.net/Content_Script_Injection
function contentEval(source) {
  // Check for function input.
  if ("function" == typeof(source)) {
    source = "(" + source + ")();";
  }

  // Create a script node holding this source code.
  var script = document.createElement("script");
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


contentEval(function() {
var $ = jQuery
  , $viewers
  , input
  , RE_i
  , matches
  , cur
  , lastWasTab = false;

// Whenever a key is pressed in the chat input...
$("#chat_text_input").keypress(function(e) {
  // Ignore if not a tab
  if (9 != e.keyCode) {
    lastWasTab = false;
    return;
  }

  // Get fresh data if the previous key wasn't a tab
  if (!lastWasTab) {
    $viewers = $("#viewers li.nick a");
    input = $(this).val().trimRight();
    RE_i = new RegExp("^" + input, "i");
    matches = [];
    cur = 0;

    // Save matching names
    for (var i = 0, e = $viewers.length, t; i < e; ++i) {
      t = $($viewers[i]).text().trim();
      if (!t) {
        continue;
      }

      if (RE_i.test(t)) {
        matches.push(t);
      }
    }

    // Sort names, ignoring case
    matches.sort(function(a, b) {
      a = a.toLowerCase(), b = b.toLowerCase();
      return (a < b) ? -1 : (a > b) ? 1 : 0;
    });
  }
  // Otherwise try to cycle to the next index
  else {
    cur = ++cur % matches.length;
  }

  // Always remember this was a tab
  lastWasTab = true;

  // Set the new name prefix
  if (matches[cur]) {
    matches[cur] = matches[cur].length == 1 ? matches[cur] : matches[cur][0].toUpperCase() + matches[cur].substring(1);
    $(this).val(matches[cur] + ": ");
  }

  return false;
});

}); // end of call to contentEval

//channel list size increase and remove tooltips
var styleOverride = ".channel_list { width: 980px !important; }";
GM_addStyle(styleOverride);
var styleOverride = ".directory_tooltip { display:none !important; }";
GM_addStyle(styleOverride);

//remove broadcast now red box
	var elmDeleted = document.getElementById("broadcast_container");
	elmDeleted.parentNode.removeChild(elmDeleted);

	//auto refresh flash player
	if(document.getElementById("jtvp_refresh")){
	document.getElementById("jtvp_refresh").click();
};