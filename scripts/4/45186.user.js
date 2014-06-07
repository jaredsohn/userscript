// ==UserScript==
// @name           AmaQuick
// @namespace      http://creazy.net/
// @description    Display Amazon Associate Affiliate forms for ease in copy and past to your Blog
// @include        http://www.amazon.co.jp/*
// @version        1.9.4
// @grant          none
// ==/UserScript==

/*
== version 1.9.4 ==
1) Change script name

== version 1.9.3 ==
1) Bugfix (New Cart bar Design)
*/

(function() {

//------------------------------------------------------------
/**
 * for debug
 * @see http://d.hatena.ne.jp/javascripter/20080729/1217342420
 */
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
//------------------------------------------------------------

/**
 * Main Class
 */
var AmaQuick = function() {

    var d = document;
    
    //------------------------------------------------------------
    //var url_base = 'http://www.amazon.co.jp/exec/obidos/ASIN/';
    //var url_base = 'http://www.amazon.co.jp/dp/';
    var url_base = 'http://www.amazon.co.jp/gp/product/';
    var img_base = 'http://ecx.images-amazon.com/images/I/';
    //var img_base = 'http://images-jp.amazon.com/images/P/';
    var affiliate_images   = [];
    var image_size_pattens = [30,75,160,500];
    
    // Product Information
    var asin      = '';
    var title     = '';
    var url       = '';
    var img       = '';
    var imgid     = '';
    var author    = '';
    var publisher = '';
    var published = '';
    
    // User Settings (default)
    var affiliate_id       = 'aqajp-22';
    var affiliate_enable   = 0;
    var affiliate_img_size = 160;
    var affiliate_template
        = '<a href="${url}" target="_blank">${title}</a><br />'
        + '<a href="${url}" target="_blank"><img src="${img}" alt="${asin}" border="0" /></a>';
    
    // CSS
    var styles = {
        //146EB4
        //bg #C0DBF2
        aqaHeader:
            'font:bold 14px/30px sans-serif;',
        mini_span:
            'display:inline-block;padding:5px;margin:0 5px 5px 0;'
            +'background-color:#C0DBF2;color:#000;'
            +'border:1px solid #C0DBF2;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;',
        aqaButtonClose:
            'display:inline-block;padding:5px;margin:0 5px 5px 0;'
            +'background-color:#FFF;color:#00F;text-decoration:none;'
            +'border:1px solid #CCC;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;',
        aqaButtonCustomOn:
            'display:none;padding:5px 5px 10px 5px;margin:0 5px 0 0;'
            +'background-color:#CCC;color:#00F;text-decoration:none;'
            +'border:1px solid #CCC;border-bottom:1px solid #CCC;border-radius:5px 5px 0 0;-moz-border-radius:5px 5px 0 0;-webkit-border-radius:5px 5px 0 0;',
        aqaButtonCustomOff:
            'display:inline-block;padding:5px;margin:0 5px 5px 0;'
            +'background-color:#FFF;color:#00F;text-decoration:none;'
            +'border:1px solid #CCC;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;',
        aqaButtonSettingOn:
            'display:none;padding:5px 5px 10px 5px;margin:0 5px 0 0;'
            +'background-color:#CCC;color:#00F;text-decoration:none;'
            +'border:1px solid #CCC;border-bottom:1px solid #CCC;border-radius:5px 5px 0 0;-moz-border-radius:5px 5px 0 0;-webkit-border-radius:5px 5px 0 0;',
        aqaButtonSettingOff:
            'display:inline-block;padding:5px;margin:0 5px 5px 0;'
            +'background-color:#FFF;color:#00F;text-decoration:none;'
            +'border:1px solid #CCC;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;',
        aqaBlock:
            'display:none;padding:10px;'
            +'background-color:#CCC;color:#000;'
            +'border:1px solid #CCC;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;',
        aqaH3:
            'margin:0;padding:5px;font:bold 14px/14px sans-serif;background:#CFC;'
    };
    //------------------------------------------------------------
    
    /**
     * Add cookie
     */
    this.addCookie = function(key, value) {
        if ( !key || !value ) {
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
        this.addCookie('affiliate_id',      d.getElementById('affiliate_id').value);
        this.addCookie('affiliate_enable',  d.getElementById('affiliate_enable').checked?'1':'0');
        this.addCookie('affiliate_img_size',d.getElementById('affiliate_img_size').value);
        this.addCookie('affiliate_template',d.getElementById('affiliate_template').value);
        alert('Saved');
        location.reload(true);
    };
    
    /**
     * escape HTML specialchars
     */
    this.esc = function(str) {
        str = '' + str;
        str = str.replace(/&/g,'&amp;');   // &
        str = str.replace(/</g,'&lt;');    // <
        str = str.replace(/>/g,'&gt;');    // >
        str = str.replace(/\"/g,'&quot;'); // "
        str = str.replace(/\'/g,'&#039;'); // '
        return str;
    };
    
    /**
     * Crossbrowser addEventListener
     */
    this._addevent = function(e, type, fn) {
        if (e.addEventListener) {
            e.addEventListener(type, fn, false);
        }
        else {
            e.attachEvent('on' + type, function() {
                fn(window.event);
            });
        }
    };
    
    /**
     * Set Affiliate format
     */
    this.setAffiliateFormat = function() {
        //console.log('setAffiliateFormat');
        var radios = d.getElementById('affiliate_img_sizes').getElementsByTagName('input');
        var imgid = '';
        var imgno = '';
        for ( var i=0; i<radios.length; i++ ) {
            if ( radios[i].checked ) {
                imgid = radios[i].getAttribute('class');
                imgno = radios[i].getAttribute('value').replace('px','');
                break;
            }
        }
        var aid   = d.getElementById('affiliate_aid').value;
        var asin  = d.getElementById('affiliate_asin').value;
        var title = d.getElementById('affiliate_title').value;
        var url   = d.getElementById('affiliate_url').value;
        var img   = img_base + imgid + '._SL' + imgno + '_.jpg';
        
        var custom_tag = d.getElementById('affiliate_template').value;
        custom_tag = custom_tag.replace(/\${aid}/g,       aid);
        custom_tag = custom_tag.replace(/\${asin}/g,      asin);
        custom_tag = custom_tag.replace(/\${title}/g,     title);
        custom_tag = custom_tag.replace(/\${url}/g,       url);
        custom_tag = custom_tag.replace(/\${img}/g,       img);
        custom_tag = custom_tag.replace(/\${imgid}/g,     imgid);
        custom_tag = custom_tag.replace(/\${author}/g,    author);
        custom_tag = custom_tag.replace(/\${publisher}/g, publisher);
        custom_tag = custom_tag.replace(/\${published}/g, published);
        
        // Text Link
        d.getElementById('affiliate_text_tag').value = '<a href="'+url+'" target="_blank">'+title+'</a>';
        
        // Image Link
        d.getElementById('affiliate_image_tag').value
            = '<a href="'+url+'" target="_blank"><img src="'+img+'" alt="'+asin+'" border="0" /></a>';
            
        // Custom Link
        d.getElementById('affiliate_custom_link').innerHTML = custom_tag;
        d.getElementById('affiliate_custom_tag').value      = custom_tag;
    };
    
    /**
     * Initialize
     */
    this.init = function() {
        //console.log('init');
    
        // Loading User Settings from COOKIE
        affiliate_id       = (this.getCookie('affiliate_id')!=='')       ? this.getCookie('affiliate_id')       : affiliate_id;
        affiliate_enable   = (this.getCookie('affiliate_enable')!=='')   ? this.getCookie('affiliate_enable')   : affiliate_enable;
        affiliate_img_size = (this.getCookie('affiliate_img_size'))      ? this.getCookie('affiliate_img_size') : affiliate_img_size;
        affiliate_template = (this.getCookie('affiliate_template')!=='') ? this.getCookie('affiliate_template') : affiliate_template;
        affiliate_images = [];
        
        // Affiliate values
        // get values from productTags
        var main_image = '';
        if ( d.getElementById('tagContentHolder') && d.getElementById('tagContentHolder').getElementsByTagName('script') ) {
            scripts = d.getElementById('tagContentHolder').getElementsByTagName('script');
            scripts_text = '';
            for ( var i=0; i<scripts.length; i++ ) {
                scripts_text = scripts[i].firstChild.textContent || scripts[i].innerText;
                if ( scripts_text.match(/productTags = new TaggingProductTags\((\{.+?\})\);/) ) {
                    //console.log('get values from productTags:'+RegExp.$1);
                    var productTags = eval('('+RegExp.$1+')');
                    author     = productTags['authors'].join(', ');
                    asin       = productTags['asin'];
                    title      = productTags['title'];
                    main_image = productTags['image'];
                    break;
                }
            }
        }
        // get from html
        if ( main_image == '' ) {
            //console.log('get from html:');
            asin  = d.getElementById('ASIN').value;
            title = d.getElementById('btAsinTitle').firstChild.textContent || d.getElementById('btAsinTitle').innerText;
            
            // normal image
            // ex) http://www.amazon.co.jp/dp/4094085513/
            if (
                d.getElementById('prodImageCell') &&
                d.getElementById('prodImageCell').getElementsByTagName('img').length > 0 &&
                d.getElementById('prodImageCell').getElementsByTagName('img')[0].getAttribute('src')
            ) {
                //console.log('normal image');
                main_image = d.getElementById('prodImageCell').getElementsByTagName('img')[0].getAttribute('src');
            }
            // new design
            // http://ec2.images-amazon.com/images/I/41QB1C8D0EL._SL500_AA300_.jpg
            else if (
                d.getElementById('original-main-image') &&
                d.getElementById('original-main-image').getAttribute('src')
            ) {
                //console.log('new design');
                main_image = d.getElementById('original-main-image').getAttribute('src');
            }
            // no image
            // ex) DVD http://www.amazon.co.jp/dp/B000006RWV/
            // ex) カー・バイク http://www.amazon.co.jp/dp/B003ZT7M5Y/
            else if (
                d.getElementById('prodImage') &&
                d.getElementById('prodImage').getAttribute('src')
            ) {
                //console.log('no image');
                main_image = d.getElementById('prodImage').getAttribute('src');
            }
    
            author_as = d.getElementById('btAsinTitle').parentNode.parentNode.getElementsByTagName('a');
            author    = '';
            for ( var i=0; i<author_as.length; i++ ) {
                if ( i>0 ) author += ', ';
                author += author_as[i].firstChild.textContent || author_as[i].innerText;
            }
        }
        url = url_base + asin + '/' + (affiliate_id?'?tag='+affiliate_id:'');
        
        // main_image convert
        //console.log(main_image);
        if ( main_image.match(/http:\/\/(.+?)\/images\/I\/([^\.]+)\..+/) ) {
            img_base = 'http://' + RegExp.$1 + '/images/I/';
            imgid    = RegExp.$2;
            img      = img_base + imgid + '._SL' + affiliate_img_size + '_.jpg';
            affiliate_images[affiliate_images.length] = imgid;
        }
        else if ( main_image.match(/http:\/\/(.+?)\/images\/G\/([^\.]+)\..+/) ) {
            img_base = 'http://' + RegExp.$1 + '/images/G/09/nav2/dp/';
            imgid    = 'no-image-no-ciu';
            img      = img_base + imgid + '._SL' + affiliate_img_size + '_.jpg';
            affiliate_images[affiliate_images.length] = imgid;
        }
        //console.log(affiliate_images);
        
        bs = d.getElementsByTagName('B');
        publisher    = '';
        published    = '';
        for ( var i=0; i<bs.length; i++ ) {
            if ( bs[i].innerHTML.indexOf('CD') == 0 ) {
                published = bs[i].nextSibling.textContent || bs[i].nextSibling.innerText;
                if ( published.match(/([0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2})/) ) {
                    published = RegExp.$1;
                }
            }
            else if ( bs[i].innerHTML.indexOf('出版社:') == 0) {
                publisher = bs[i].nextSibling.textContent || bs[i].nextSibling.innerText;
                if ( publisher.match(/([0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2})/) ) {
                    published = RegExp.$1;
                }
                publisher = publisher.replace(/\s\([0-9]{4}\/[0-9]{1,2}\/[0-9]{1,2}\)$/,'');
                publisher = publisher.replace(/^\s+/,'');
            }
            else if ( bs[i].innerHTML.indexOf('販売元:') == 0 || bs[i].innerHTML.indexOf('レーベル:') == 0) {
                publisher = bs[i].nextSibling.textContent || bs[i].nextSibling.innerText;
                publisher = publisher.replace(/^\s+/,'');
            }
            else if ( bs[i].innerHTML.indexOf(' 発売日：') == 0 || bs[i].innerHTML.indexOf('DVD発売日:') == 0 ) {
                published = bs[i].nextSibling.textContent || bs[i].nextSibling.innerText;
                published = published.replace(/^\s+/,'');
                break;
            }
        }
        //console.log("author:"+author);
        //console.log("publisher:"+publisher);
        //console.log("published:"+published);
        
        // "Alternative" images
        var original_img = d.getElementById('original_image');
        var image_tds    = (original_img) ? original_img.parentNode.getElementsByTagName('td') : [];
        if ( image_tds.length > 0 ) {
            for ( var i=0; i<image_tds.length; i++ ) {
                if ( image_tds[i].getAttribute('id') && image_tds[i].getAttribute('id').match(/(alt_image_[0-9]+)/) ) {
                    image_obj = image_tds[i].getElementsByTagName('img')[0];
                    // Get image ID
                    if ( image_obj.src.match(/http:\/\/(.+?)\/images\/I\/([^\.]+)\..+/) ) {
                        affiliate_images[affiliate_images.length] = RegExp.$2;
                    }
                }
            }
        }
        
        //console.log('buildHTML');
    
        // build Image Sizes controller
        var affiliate_images_html = '';
        if ( affiliate_images.length > 0 ) {
            //console.log(affiliate_images);
            affiliate_images_html = '<table id="affiliate_img_sizes" cellpadding="0" cellspacing="0" border="0" style="margin:10px 10px 20px 10px;">';
            another_image = true;
            for ( var i=0; i<affiliate_images.length; i++ ) {
                imgid = affiliate_images[i];
                affiliate_images_html += '<tr><td><img src="'+img_base+imgid+'._SL30_.jpg" alt="'+imgid+'" border="0" /></td>';
                for ( var j=0; j<image_size_pattens.length; j++ ) {
                    image_size_patten = image_size_pattens[j];
                    checked = '';
                    if ( i == 0 && affiliate_img_size && affiliate_img_size == image_size_patten ) {
                        checked       = ' checked="checked"';
                        another_image = false;
                    }
                    affiliate_images_html
                        += '<td><input type="radio" name="affiliate_image" id="'+imgid+'_'+image_size_patten+'" class="'+imgid+'" value="'+image_size_patten+'px"'+checked+' /><label for="'+imgid+'_'+image_size_patten+'">'+image_size_patten+'px</label></td>';
                }
                if ( affiliate_img_size && another_image ) {
                    affiliate_images_html
                        += '<td><input type="radio" name="affiliate_image" id="'+imgid+'_'+affiliate_img_size+'" class="'+imgid+'" value="'+affiliate_img_size+'px"'+((i==0)?' checked="checked"':'')+'" /><label for="'+imgid+'_'+affiliate_img_size+'">'+affiliate_img_size+'px</label></td>';
                }
                affiliate_images_html += '</tr>';
            }
            affiliate_images_html += '</table>';
        }
        
        // build Affiliate block
        var block = document.createElement('div');
        block.innerHTML
            = '<input type="hidden" id="affiliate_aid" value="' + this.esc(affiliate_id) + '" />'
            + '<input type="hidden" id="affiliate_asin" value="' + this.esc(asin) + '" />'
            + '<input type="hidden" id="affiliate_title" value="' + this.esc(title) + '" />'
            + '<input type="hidden" id="affiliate_url" value="' + this.esc(url) + '" />'
            + '<input type="hidden" id="affiliate_img" value="' + this.esc(img) + '" />'
            + '<input type="hidden" id="affiliate_imgid" value="' + this.esc(imgid) + '" />'
            + '<input type="hidden" id="affiliate_author" value="' + this.esc(author) + '" />'
            + '<input type="hidden" id="affiliate_publisher" value="' + this.esc(publisher) + '" />'
            + '<input type="hidden" id="affiliate_published" value="' + this.esc(published) + '" />'
            /* Header */
            + '<div id="aqaHeader" style="'+styles.aqaHeader+'">'
            + '<span style="margin-right:10px;">AmaQuick</span>'
            + '<a id="aqaButtonClose" style="'+styles.aqaButtonClose+'" href="javascript:void(0);">×</a>'
            + '<a id="aqaButtonCustomOn" style="'+styles.aqaButtonCustomOn+'" href="javascript:void(0);">カスタムリンク</a>'
            + '<a id="aqaButtonCustomOff" style="'+styles.aqaButtonCustomOff+'" href="javascript:void(0);">カスタムリンク</a>'
            + '<a id="aqaButtonSettingOn" style="'+styles.aqaButtonSettingOn+'" href="javascript:void(0);">設定</a>'
            + '<a id="aqaButtonSettingOff" style="'+styles.aqaButtonSettingOff+'" href="javascript:void(0);">設定</a>'
            + '<span style="'+styles.mini_span+'">短縮URL:'
            + '<input type="text" id="display_shorturl" value="http://www.amazon.co.jp/dp/' + asin + '/" />'
            + '</span>'
            + '<span style="'+styles.mini_span+'">テキストリンク:'
            + '<input type="text" id="affiliate_text_tag" size="40" value="" style="width:100px;" />'
            + '</span>'
            + '<span style="'+styles.mini_span+'">画像リンク:'
            + '<input type="text" id="affiliate_image_tag" size="40" value="" style="width:100px;" />'
            + '</span>'
            + '</div>'
            /* Custom Block */
            + '<div id="aqaCustom" style="'+styles.aqaBlock+'">'
            + '<table cellpadding="0" cellspacing="0" border="0" style="border:1px solid #999;"><tr>'
            /* Tags */
            + '<td style="width:500px;background:#FFF;vertical-align:top;">'
            + '<h3 style="'+styles.aqaH3+'">プレビュー</h3>'
            + '<div id="affiliate_custom_link" style="margin:10px 10px 20px 10px;">loading ...</div>'
            + '</td>'
            /* Controller */
            + '<td style="width:500px;background:#FFF;border-left:1px dashed #CCC;vertical-align:top;">'
            + '<h3 style="'+styles.aqaH3+'">画像の種類・サイズ選択</h3>'
            + affiliate_images_html
            + '<h3 style="'+styles.aqaH3+'">コード</h3>'
            + '<textarea id="affiliate_custom_tag" cols="50" rows="5" style="width:480px;font:10px/10px monospace;margin:10px 10px 20px 10px;"></textarea>'
            + '</td>'
            + '</tr>'
            + '</table>'
            + '</div>'
            /* Settings */
            + '<div id="aqaSetting" style="'+styles.aqaBlock+'">'
            + '<table cellpadding="5" cellspacing="1" border="0" style="background:#999;">'
            + '<tr>'
            + '<td style="background:#EEE;text-align:right;width:120px;">&#12450;&#12477;&#12471;&#12456;&#12452;&#12488;ID:</td>'
            + '<td style="background:#FFF;"><input type="text" size="15" id="affiliate_id" value="' + this.esc(affiliate_id) + '" /></td>'
            + '<td style="background:#FFF;">自分のアソシエイトIDを設定</td>'
            + '</tr>'
            + '<tr>'
            + '<td style="background:#EEE;text-align:right;width:120px;">&#24120;&#12395;&#34920;&#31034;:</td>'
            + '<td style="background:#FFF;"><input type="checkbox" id="affiliate_enable" value="1"'+(affiliate_enable>0?' checked=checked':'')+' /><label for="affiliate_enable">ON</label></td>'
            + '<td style="background:#FFF;">カスタムリンクを常に表示する場合はチェック</td>'
            + '</tr>'
            + '<tr>'
            + '<td style="background:#EEE;text-align:right;width:120px;">デフォルト画像サイズ:</td>'
            + '<td style="background:#FFF;"><input type="text" size="15" id="affiliate_img_size" value="' + this.esc(affiliate_img_size) + '" /></td>'
            + '<td style="background:#FFF;">デフォルトで選択したい画像サイズ（pixel）</td>'
            + '</tr>'
            + '<tr>'
            + '<td style="background:#EEE;text-align:right;width:120px;">テンプレート:</td>'
            + '<td style="background:#FFF;">'
            + '<textarea cols="50" rows="5" id="affiliate_template" style="width:480px;height:120px;font:12px/12px monospace;">' + this.esc(affiliate_template) + '</textarea>'
            + '</td>'
            + '<td style="background:#FFF;">'
            + '* テンプレートで使用可能なキーワード:<br />'
            + '<strong>${aid}</strong> : アソシエイトID<br />'
            + '<strong>${asin}</strong> : ASINコード<br />'
            + '<strong>${title}</strong> : 商品名<br />'
            + '<strong>${url}</strong> : 商品URL (アソシエイトID含む)<br />'
            + '<strong>${imgid}</strong> : 画像ID<br />'
            + '<strong>${img}</strong> : 画像URL (${imgid}含む)<br />'
            + '<strong>${author}</strong> : 著者<br />'
            + '<strong>${publisher}</strong> : 出版社<br />'
            + '<strong>${published}</strong> : 発行日<br />'
            + '</td>'
            + '</tr>'
            + '</table>'
            + '<input type="button" id="settings_submit" value="保存してリロード" onclick="aqa.saveSettings();" style="font:bold 14px/14px Arial;" /><br />'
            + '* 「保存してリロード」をすると、設定情報がCOOKIEに保存されます。<br />'
            + '</div></div>';
            
        block.setAttribute('id','quick_affiliate');
        block.style.border     = '1px solid #CCC';
        block.style.background = '#EEE';
        block.style.color      = '#333';
        block.style.margin             = '0 0 20px 0';
        block.style.padding            = '10px';
        block.style.borderRadius       = '10px';
        block.style.MozBorderRadius    = '10px';
        block.style.WebkitBorderRadius = '10px';
        //document.getElementById('handleBuy').insertBefore(block, document.getElementById('handleBuy').firstChild);
        document.getElementById('navbar').parentNode.insertBefore(
            block,
            document.getElementById('navbar').nextSibling
        );
        
        
        this.setAffiliateFormat();
        var affiliate_images = d.getElementById('affiliate_img_sizes').getElementsByTagName('input');
        //console.log(affiliate_images);
        
        for ( var i=0; i<affiliate_images.length; i++ ) {
            this._addevent( affiliate_images[i],'click',this.setAffiliateFormat );
        }
        
        // Default style and EventListener settings
        if ( affiliate_enable > 0 ) {
            d.getElementById('aqaCustom').style.display = 'block';
            d.getElementById('aqaSetting').style.display = 'none';
            d.getElementById('aqaButtonCustomOn').style.display   = 'inline-block';
            d.getElementById('aqaButtonCustomOff').style.display  = 'none';
            d.getElementById('aqaButtonSettingOn').style.display  = 'none';
            d.getElementById('aqaButtonSettingOff').style.display = 'inline-block';
        } else {
            d.getElementById('aqaCustom').style.display = 'none';
            d.getElementById('aqaSetting').style.display = 'none';
            d.getElementById('aqaButtonCustomOn').style.display   = 'none';
            d.getElementById('aqaButtonCustomOff').style.display  = 'inline-block';
            d.getElementById('aqaButtonSettingOn').style.display  = 'none';
            d.getElementById('aqaButtonSettingOff').style.display = 'inline-block';
        }
        
        this._addevent(
            document.getElementById('aqaButtonClose'),
            'click',
            function() {
                document.getElementById('aqaCustom').style.display = 'none';
                document.getElementById('aqaSetting').style.display = 'none';
                document.getElementById('aqaButtonCustomOn').style.display   = 'none';
                document.getElementById('aqaButtonCustomOff').style.display  = 'inline-block';
                document.getElementById('aqaButtonSettingOn').style.display  = 'none';
                document.getElementById('aqaButtonSettingOff').style.display = 'inline-block';
            }
        );
        this._addevent(
            document.getElementById('aqaButtonCustomOn'),
            'click',
            function() {
                document.getElementById('aqaCustom').style.display = 'none';
                document.getElementById('aqaSetting').style.display = 'none';
                document.getElementById('aqaButtonCustomOn').style.display   = 'none';
                document.getElementById('aqaButtonCustomOff').style.display  = 'inline-block';
                document.getElementById('aqaButtonSettingOn').style.display  = 'none';
                document.getElementById('aqaButtonSettingOff').style.display = 'inline-block';
            }
        );
        this._addevent(
            document.getElementById('aqaButtonCustomOff'),
            'click',
            function() {
                document.getElementById('aqaCustom').style.display = 'block';
                document.getElementById('aqaSetting').style.display = 'none';
                document.getElementById('aqaButtonCustomOn').style.display   = 'inline-block';
                document.getElementById('aqaButtonCustomOff').style.display  = 'none';
                document.getElementById('aqaButtonSettingOn').style.display  = 'none';
                document.getElementById('aqaButtonSettingOff').style.display = 'inline-block';
                location.hash = 'quick_affiliate';
            }
        );
        this._addevent(
            document.getElementById('aqaButtonSettingOn'),
            'click',
            function() {
                document.getElementById('aqaCustom').style.display = 'none';
                document.getElementById('aqaSetting').style.display = 'none';
                document.getElementById('aqaButtonCustomOn').style.display   = 'none';
                document.getElementById('aqaButtonCustomOff').style.display  = 'inline-block';
                document.getElementById('aqaButtonSettingOn').style.display  = 'none';
                document.getElementById('aqaButtonSettingOff').style.display = 'inline-block';
            }
        );
        this._addevent(
            document.getElementById('aqaButtonSettingOff'),
            'click',
            function() {
                document.getElementById('aqaCustom').style.display = 'none';
                document.getElementById('aqaSetting').style.display = 'block';
                document.getElementById('aqaButtonCustomOn').style.display   = 'none';
                document.getElementById('aqaButtonCustomOff').style.display  = 'inline-block';
                document.getElementById('aqaButtonSettingOn').style.display  = 'inline-block';
                document.getElementById('aqaButtonSettingOff').style.display = 'none';
                location.hash = 'quick_affiliate';
            }
        );
    };
};

/* add Class to global */
var script = document.createElement('script');
script.type = 'text/javascript';
script.text
    = 'var AmaQuick = ' + AmaQuick.toString() + ';'
    + 'var aqa = new AmaQuick();'
document.body.appendChild(script);

// Do it! (only in product page)
var aqa = new AmaQuick();
var bodys = document.getElementsByTagName('body');
if ( bodys[0].getAttribute('class') == 'dp' ) {
    aqa.init();
}

})();