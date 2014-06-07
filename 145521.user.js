// ==UserScript==
// @name                Congcudathangonline_giangminh
// @namespace	        giangminh247.com
// @description	        Đặt hàng từ các website của Trung Quốc
// @include		http://item.taobao.com/*
// @include		http://item.lp.taobao.com/*
// @include		http://item.beta.taobao.com/*
// @include		http://auction.taobao.com/*
// @include		http://item.tmall.com/*
// @include		http://detail.tmall.com/*
// @include		http://detailp4p.china.alibaba.com/*
// @include		http://detail.china.alibaba.com/*
// @include		http://auction1.paipai.com/*
// @include		http://mofayichu.com/shop_*Products.aspx*
// @include		http://mofayichu.com/shop_*products.aspx*
// @include		http://www.mofayichu.com/shop_*Products.aspx*
// @include		http://www.mofayichu.com/shop_*products.aspx*
// @include		http://mofayichu.q88e.net/shop_*products.aspx*
// @include		http://mofayichu.q88e.net/shop_*Products.aspx*
// @include		http://www.mofayichu.q88e.net/shop_*Products.aspx*
// @include		http://5taobao.q88k.net/shop_*Products.aspx*
// @include		http://www.5taobao.net/shop_gkm2/products.aspx?sku*
// @include		http://www.5taobao.net/shop_gkm1/products.aspx?sku*
// @include		http://www.5taobao.net/shop_gmb1/products.aspx?sku*
// @include		http://www.5taobao.net/shop_gmb1/products.aspx?shbid=*
// @include		http://5taobao.q88k.net/shop_*products.aspx*
// @include		http://www.chenxifushi.com/shop_*products.aspx*
// @include		http://www.chenxifushi.com/shop_*Products.aspx*
// @include		http://www.lelefushi.com/SHOP_*products.aspx*
// @include		http://www.lelefushi.com/SHOP_*Products.aspx*
// @include		http://www.lelefushi.com/shop_*products.aspx*
// @include		http://www.lelefushi.com/shop_*Products.aspx*
// @include		http://www.yilanfushi.com/shop_*products.aspx*
// @include		http://www.yilanfushi.com/shop_*Products.aspx*
// @include		http://www.shmoyu.com/shop_*products.aspx*
// @include		http://www.shmoyu.com/shop_*Products.aspx*
// @include		http://www.yiranmeifushi.com/shop_*products.aspx*
// @include		http://www.yiranmeifushi.com/shop_*Products.aspx*
// @include		http://www.yiwenfushi.com/shop_*products.aspx*
// @include		http://www.yiwenfushi.com/shop_*Products.aspx*
// @include		http://yiwenfushi.q88j.net/shop_*products.aspx*
// @include		http://yiwenfushi.q88j.net/shop_*Products.aspx*
// @include		http://www.rihanfushi.com/shop_*products.aspx*
// @include		http://www.chengzifs.com/SHOP_*Products.aspx*
// @include		http://www.69shopfs.com/shop_*products.aspx*
// @include		http://jj-fashion.com/goods*
// @include		http://www.jj-fashion.com/goods*
// @include		http://fuzhuangpifa.cn/goods*
// @include		http://www.fuzhuangpifa.cn/goods*
// @include		http://shanghai.q88i.net/shop_*products.aspx*
// @include		http://shanghai.q88i.net/shop_*Products.aspx*
// @include		http://www.eeshow.com.cn/shop_*products.aspx*
// @include		http://eeshow.com.cn/shop_*products.aspx*
// @include		http://eeshow.q88a.net/shop_*products.aspx*
// @include		http://www.charm-dress.com/SHOP_*products.aspx*
// @include		http://www.baobaopifa.com/productshopxp.asp*
// @include		http://www.xinshij.com/shipin*
// @include		http://www.1925.cn/showproduct*
// @include		http://1925.cn/showproduct*
// @include		http://www.tygfushi.com/shop_gjq3/Products.aspx?sku=*
// @include		http://www.tygfushi.com/shop_gjq3/Products.aspx?shbid=*
// @include		http://rihanfs.q88b.net/shop_gln2/1280/products.aspx?sku=*
// @include		http://rihanfs.q88b.net/shop_gln2/1280/products.aspx?shbid=*
// @include             http://www.taopulu.com/shop_gjk1/Products.aspx?sku=*
// ==/UserScript==
			
var urlParams = ({
    getUrlVars: function (url) {
        var vars = [], hash;
        if(url == null) {
            url = window.location.href;
        }
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name,url) {
        return this.getUrlVars(url)[name];
    }
});
var utilities = {
    'windowWidth': function() {
        return window.innerWidth;
    },
    'windowHight': function() {
        return window.innerHeight;
    },
    'parseJSON': function(d) {
        return eval('(' + d + ')');
    }
}
function popup(price, linkOrder) {
    
}
	
function getObjectByClass(classname, elems) {
    var i;
    elems = elems != null ? elems : document.getElementsByTagName('*');
    for (i in elems)
    {
        if((" "+elems[i].className+" ").indexOf(" " + classname + " ") > -1)
        {
            return elems[i];
        }
    }
    return false;
}

function closeBox()
{
    //get box
    var box = document.getElementById("box-confirm-nh-site");
    var p   = box.parentNode;
    p.removeChild(box);

    var boxOverlay = document.getElementById("box_overlay");
    if(boxOverlay != null) {
        boxOverlay.parentNode.removeChild(boxOverlay);
    }

}
//create function, it expects 2 values.
function insertAfter(newElement,targetElement) {
    //target is what you want it to go after. Look for this elements parent.
    var parent = targetElement.parentNode;
			
    //if the parents lastchild is the targetElement...
    if(parent.lastchild == targetElement) {
        //add the newElement after the target element.
        parent.appendChild(newElement);
    } else {
        // else the target has siblings, insert the new element between the target and it's next sibling.
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}	
function getHostname(url) {
    if(url == null) url = window.location.href;  
    url = url.replace("http://", "");   
		  
    var urlExplode = url.split("/");  
    var serverName = urlExplode[0];
		
    return serverName;
}	
function addIframe() {
    var iframe = document.createElement('iframe');
    //iframe.style.display = "none";
    iframe.height = 0;
    iframe.width = 0;
    iframe.src = 'http://nhaphang.com';
    document.body.appendChild(iframe);
}
function addVersion(url) {
    return url+'&version=20130114'; // nam-thang-ngay
}
//ham lam chon so den2 tp
function roundNumber(num, dec) {
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
}
function is_valid_url(url)
{
    return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
}
//ham xu lý gia trong truong hop nguoi dung su dung chuc nang tu dong dich cua Chrome
function processPrice(price) {
    if(price == null) 
        return 0;
    
    p = String(price).replace(',','.');
    return parseFloat(p);
}
function rateMoney() {
    return '3400';
}

/* SITE ADD-ON */
	
function taobao(cart_url,url_save) {
    
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) {
            return;
        }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }
    // Cross-browser implementation of element.addEventListener()
    function addListener(element, type, expression, bubbling) {
        bubbling = bubbling || false;
        if(window.addEventListener) { // Standard
            element.addEventListener(type, expression, bubbling);
            return true;
        } else if(window.attachEvent) { // IE
            element.attachEvent('on' + type, expression);
            return true;
        } else return false;
    }
    function additionPrice()
    {
        return 0;
    }
    function getCookie(c_name)
    {
        var i,x,y,ARRcookies=document.cookie.split(";");
        for (i=0;i<ARRcookies.length;i++)
        {
            x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
            y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
            x=x.replace(/^\s+|\s+$/g,"");
            if (x==c_name) {
                return unescape(y);
            }
        }
        return y;
    }
    addGlobalStyle('.tahoma { font-family: tahoma,arial,verdana ! important; }');
		
    function getPriceTaobao()
    {
        var p_e=document.getElementById('J_StrPrice');
        if(p_e!=null)
        {
            // Kiểm tra nếu có giảm giá thì lấy giảm giá
            if( p_e.className.indexOf('tb-unvalid')!=-1)
            {
                p_e = document.getElementsByClassName('tb-rmb-num')[0];
            }
            if(document.getElementById('J_SpanLimitProm') != null && document.getElementById('J_SpanLimitProm') != 'undefined')
            {
                p_e=document.getElementById('J_SpanLimitProm');
            }
            if(document.getElementById('J_PromoPrice')!=null && document.getElementById('J_PromoPrice')!='undefined')
            {
                try {
                    var p_p = document.getElementById('J_PromoPrice');
                    var tb  = document.getElementsByClassName("tb-promo-price-type")[0].textContent;
                    if(p_p.getElementsByTagName("strong").length>0 && p_p.getElementsByTagName("strong")[0].textContent!='' && tb.indexOf('VIP')==-1)
                        p_e = p_p.getElementsByTagName("strong")[0];
                } catch(e) { }
            }
            var webprice_text = p_e.textContent.match(/[0-9]*[\.,]?[0-9]+/g);
                        			
            return processPrice(webprice_text);
        } else
            return 0;
    }
    function getTitle()
    {
        var tb='';
        if(document.getElementsByClassName("tb-detail-hd").length>0)
        {
            var h=document.getElementsByClassName("tb-detail-hd")[0];
            tb=h.getElementsByTagName('h3')[0].textContent;
        }                                                                                     
        if(document.getElementsByClassName("tb-tit").length>0)
            tb=document.getElementsByClassName("tb-tit")[0].textContent;
            
        return encodeURIComponent(tb);
    }
    function getImgLink()
    {
        var img_src=document.getElementById('J_ImgBooth').getAttribute("src");
        return encodeURIComponent(img_src);
    }
    function getSellerName()
    {
        var seller_name='';
	
        var hd = document.getElementsByName('seller_nickname')[0];
        if(window.location.href.indexOf('tmall') > 0) {
            // Tmall
            var shop_info = document.getElementById('shop-info');
            if(shop_info != undefined) {
                var shop_status = shop_info.getElementsByClassName('shop-status');
                if(shop_status.length > 0) {
                    seller_name = shop_status[0].getElementsByTagName('span')[0].getAttribute('data-nick');
                    seller_name = decodeURIComponent(seller_name);
                }
            }
        } else { // Taobao
            // Check chrome translate
            if(document.getElementsByClassName('hCard')[0].getElementsByTagName('font').length > 0 & hd == null) {
                /**/
                var shop_card = document.getElementsByClassName('shop-card');
                var data_nick = shop_card[0].getElementsByClassName('ww-light');
                seller_name = data_nick[0].getAttribute('data-nick');

            } else {
                if(hd != null) {
                    seller_name = hd.value;	
                } else {
                    hd = document.getElementsByClassName('hCard')[0];
                    seller_name= hd.textContent;
                }
            }
        }
					
        return encodeURIComponent(seller_name);
    }
    
    //ham lay comment
    function getComment()
    {
        if(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb")!=null)
            return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
        else return '';
    }
    function getLink()
    {
        var item_id=0;
        var element = document.getElementsByName("item_id");
			
        if(element.length>0)
        {
            element = element[0];
            item_id = element.value;
        } else item_id = 0;	
			
        if(item_id==0 || item_id==null || item_id=='') {
            element =document.getElementsByName("item_id_num");
			
            if(element.length>0)
            {
                element=element[0];
                var item_id=element.value;
            }else var item_id=0;
        }
			
        var rate         = rateMoney();
        var price_taobao = getPriceTaobao();
        var price_result = Math.ceil(price_taobao * rate);
        var item_price   = price_taobao;
                   
        var seller_id = '';
        // tmall
        if( host.indexOf('tmall') != -1) {
            element = document.getElementsByName("seller_num_id");
            if(element.length>0)
            {
                element = element[0];
                seller_id = element.value;
            } else seller_id = 0;
        } else { // tmall
            element = document.getElementById('J_listBuyerOnView');
            var url_params   = element.getAttribute('detail:params');
            seller_id = urlParams.getUrlVars(url_params)['seller_num_id'];
        }
        
        var quantity=''; 
        element = document.getElementById("J_IptAmount");
        if(element) {
            quantity = element.value;
        }else quantity = ''; 
        //lay title
        var title=getTitle();
        //lay img
        var img=getImgLink();
        //lay seller name
        var seller_name=getSellerName();
			
        var element =document.getElementsByName("allow_quantity");
        if(element.length>0)
        {
            element=element[0];
            var amount=element.value;
        }else var amount=0; 
        var p_color_id=1627207;
        var p_size_id=20509;

        var selected_props=document.getElementsByClassName('tb-selected');
        var p_params='';

        var max_p=0;
        var color_size='';
        var data_value='';
			  
        if(selected_props.length>0) {
            for(var i=0;i<selected_props.length;i++)
            {
                var ele=selected_props[i];
                var prop_str=ele.getAttribute("data-value");
                if(prop_str != null && prop_str.length>0)
                {
                    max_p++;
                    //p_params+='&p'+max_p+'='+prop_str;
                    if(data_value=='')
                        data_value+=prop_str;
                    else data_value+=';'+prop_str;
                    p_e=ele.getElementsByTagName('span');
                    p_e=p_e[p_e.length-1];
                    prop_str=p_e.textContent
                    color_size+=';'+encodeURIComponent(prop_str);
                }else continue;
            }
        }
			
        var params='';
        if(parseInt(item_id)>0)
            params+='item_id='+item_id;
					
        if(item_price>0)
            params+='&item_price='+item_price;
        if(title.length>0)
            params+='&title='+title;
			  
        if(img.length>0)
            params+='&img='+img;
				
        if(seller_name.length>0)
            params+='&seller_name='+seller_name;
		
        if(parseInt(seller_id)>0)
            params+='&seller_id='+seller_id;
			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
        //lay comment
        var comment= getComment();	
			  
        if(parseInt(amount)>0)
            params+='&amount='+amount;
        if(color_size.length>0)
            params+='&color_size='+color_size;
        //lay comment
        if(comment.length>0)
            params+='&comment='+comment;
        if(data_value.length>0)
            params+='&data_value='+data_value;	
        var ct=	getCookie('t');
        if(ct.length>0)
            params+='&ct='+ct;
        if(max_p>0)
        {
            params+=p_params;
        }
        params += '&act=addon_cart';
        params += '&width=' + utilities.windowWidth();
					
        // return href+params;
        return addVersion(params);
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                addListener(document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb"), 'click', linkClick);
                
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function getquerystring() {
        var form     = document.forms['f1'];
        var word = form.word.value;
        qstr = 'w=' + escape(word);  // NOTE: no '?' before querystring
        return qstr;
    }	
    function updatepage(str){
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;
        document.body.appendChild(htmlObject);
    }
    function linkClick()
    {	
        //tong thuoc tinh
        var props=document.getElementsByClassName('J_TSaleProp');
        var full=true;
        if(props.length>0) {
            // Kiem tra so thuoc tinh da chon cua sp		
            var count_selected=0;
            for(var i=0;i<props.length;i++) {
                var selected_props=props[i].getElementsByClassName('tb-selected');	
                if(selected_props!=null && selected_props!='undefined')
                    count_selected+=selected_props.length;
            }
            if(count_selected<props.length) {
                full=false;
            }	
        }
        
        if(full==false)
        {
            alert("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            return ;
        }
        if(document.getElementById("J_IptAmount")==null || document.getElementById("J_IptAmount")=='undefined')
        {
            alert("Hết hàng!");
            return ;
        }
			
        xmlhttpPost(cart_url);
    }  
    this.htmlOnLoad = function ()
    {
        //  Add class  notranslate
        if(window.location.href.indexOf('tmall') > 0) {
            var shop_info = document.getElementById('shop-info');
            shop_info.className = shop_info.className + ' notranslate';
        }
        html_load();
    }
    
    // Load able
    var loaded = false;
    var loaded_time = 0; // Max 20
    var loaded_max = 5;
    function html_load() {
        // Check price promotion loaded
        if(document.getElementById('J_PromoPrice').length > 0) {
            if(document.getElementsByClassName("tb-promo-price-type").length > 0) {
                loaded = true;
            }                
        }
        loaded_time ++;
        if(loaded_time > loaded_max || loaded) {
            update_html();
        } else {
            setTimeout(html_load, 1000);
        }
    }
    
    function update_html() {
        var rate        = rateMoney();
        var price_taobao= getPriceTaobao();
        var price_result= Math.ceil(price_taobao * rate);

        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });

        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
        + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
        + '          ' + price_result + ' VNĐ '
        + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
        + '              ' + getHostname('http://giangminh247.com')
        + '          </a>'
        + '      </h2>'
        + '      <div style="padding-bottom: 5px; width: 300px;">'
        + '          <span style="text-align:left;">Mô tả:</span>'
        + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
        + '      </div>'
        + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
        + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
        + '      </a></span>'
        + '  </div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        document.getElementById('J_StrPriceModBox').parentNode.insertBefore( div.firstChild , document.getElementById('J_StrPriceModBox').nextSibling );
        // Add event
        addListener(document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb"), 'click', linkClick);
    }
}

function alibaba(cart_url,url_save)     {
    function additionPrice() {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor() {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize() {
        return -1;
    }
    //ham lay comment
    function getComment() {
        if(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb")!=null)
            return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
        else return '';
    }
    //ham lay thong tin color_size_name
    function getColorSizeName() {
        try{
            var buyArea = document.getElementsByClassName("d-sku-content");
            if(buyArea == null) { // không có thuộc tính
                return '';
            }
            var attr_Area = buyArea[0].getElementsByClassName('d-sku-box');
            var attr_list = attr_Area[0].getElementsByClassName('d-sku');
				
            var color_size_name='';
            var selects = attr_Area[0].getElementsByClassName('d-selected');
            if(selects.length>0)
            {
                for(var i=0;i<selects.length;i++)
                {
                    var element = selects[i];
                    if(color_size_name=='')
                        color_size_name+=element.getAttribute('data-value');
                    else color_size_name+=';'+element.getAttribute('data-value');
                }
            }
            return encodeURIComponent(color_size_name);
        } catch (e) {
            return '';
        }
    }
    function getSellerId() {
        var element =document.getElementsByName("sellerId");
        if(element.length>0)
        {
            element=element[0];
            var seller_id=element.value;
        }else var seller_id='';
			
        return encodeURIComponent(seller_id);
    }
    //ham lay item_id cua san pham
    function getItemId() {
        var elements =document.getElementsByName("offerId");
			
        if(elements.length>0)
        {
				
            var item_id=0;
            for(var i=0;i<elements.length;i++)
            {
                element=elements[i];
                if(element.value!="")
                    item_id=element.value;
            }
        }else var item_id=0;
			
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle() {
        var element =document.getElementsByName("offerTitle");
			
        if(element.length>0)
        {
            element=element[0];
            var item_title=element.value;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage() {
        var element =document.getElementsByClassName("mod-detail-gallery");
        var main_image = element[0].getElementsByClassName("vertical-img");
        var item_image = '';
        if(main_image != null)
        {
            img_obj = main_image[0].getElementsByTagName("img");
            item_image = img_obj[0].getAttribute('src');
        }
        return encodeURIComponent(item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink() {
        return encodeURIComponent(window.location.href);
    }
    //hàm lấy số lượng mua
    function getQuantity() {
        if(document.getElementById("J_AmountInput")!=null)
            return document.getElementById("J_AmountInput").value;
        else return getAllowedMinQuantity();
    }		
    //hàm lấy giá TQ của sản phẩm dựa vào số lượng mua
    function getPrice() {
        var quantity =getQuantity();	
        quantity = parseInt(quantity);
		
        var price = 0;        
        var span_price=document.getElementById('mod-detail-price-sku');
        // Một mức giá
        if(span_price!=null)
        {
            //price=span_price.textContent;
            var e_num=document.getElementById('mod-detail-price-sku').getElementsByTagName('span')[1].textContent;
            var p_num=document.getElementById('mod-detail-price-sku').getElementsByTagName('span')[2].textContent;
            price = e_num + p_num;
            return processPrice(price);
        }
        
        // Nhiều mức giá
        var div_prices = document.getElementById("mod-detail-price");
        
        if(div_prices == null) {
            return processPrice(price);
        }
			
        var span_prices = div_prices.getElementsByTagName("span");
        if(span_prices==null) {
            return processPrice(price);
        }
        
        // Duyệt qua các mức giá
        var prices = '';
        var de_price_hd = div_prices.getElementsByClassName('de-price-hd');
        if(de_price_hd[0].getElementsByTagName('font').length > 0) {
            
            tr_list = div_prices.getElementsByTagName('tr');
            for(inc = 1; inc < tr_list.length; inc++) {
                
                span_arr = tr_list[inc].getElementsByTagName('span');
                sp3_text = span_arr[1].getElementsByTagName('font');
                sp4_text = span_arr[2].getElementsByTagName('font');
                
                price   = sp3_text[0].getElementsByTagName('font')[0].innerHTML.replace(/\s/g, '') + '.' + sp4_text[0].getElementsByTagName('font')[0].innerHTML.split(',')[1];
            }
        // End process chrome translate
        } else {
            for (var i = 0; i < span_prices.length; i++) {
                var str = span_prices[i].textContent;
                if((str.indexOf('-')!=-1) || (str.indexOf('≥') != -1))
                {			
                    if(str.indexOf('-')!=-1)
                    {
                        prices = str.split('-');
                        if((prices.length>0) && (parseInt(prices[0])<= quantity) && (parseInt(prices[1])>= quantity))
                        {
                            price = span_prices[i+1].textContent + '' + span_prices[i+2].textContent;
                            break;
                        }
                    }
                    if(str.indexOf('≥')!=-1)
                    {
                        prices = str.split('≥');
                        if((prices.length>0) && (parseInt(prices[1])<= quantity))
                        {			
                            price = span_prices[i+1].textContent + '' + span_prices[i+2].textContent;
                            break;
                        }
                    }
                }
            }
        }
        return processPrice(price);
	 
    }
    function getAllowedMinQuantity() {
        var min=1;
        var div_prices = document.getElementById("mod-detail-price");
        if(div_prices==null) 
        {
            //alert(min);
            return min;
        }
        var span_prices = div_prices.getElementsByTagName("span");
        if(span_prices==null) 
        {
            //alert(min);
            return min;
        }
			
        min=100000;			
        for (var i = 0; i<span_prices.length; i++) {
            var str=span_prices[i].textContent;
					
            //nếu span chứa thông tin số lượng sản phẩm mua:
            if((str.indexOf('-')!=-1) )
            {
                var prices=str.split('-');
                if(prices.length>0 && parseInt(prices[0])<min)
                {
                    min=prices[0];
                }
            }
            if(str.indexOf('≥')!=-1)
            {
                var prices=str.split('≥');
                if(prices.length>0 && parseInt(prices[1])<min)
                {
                    min=prices[1];
                }

            }
        }
			
        if(min!=100000)
            return min;
        else return 1;
    }
    
    // Hàm lấy bảng giá
    function getPriceTable() {
        var div_prices = document.getElementById("mod-detail-price");
        if(div_prices == null) return '';
			
        var span_prices = div_prices.getElementsByTagName("span");
        if(span_prices == null) return '';
			
        var price_table = str = '';
        var inc         = 0;
        var textPrice   = '';
        //duyệt qua các mức giá
        // Check if chrome translate site
        de_price_hd = div_prices.getElementsByClassName('de-price-hd');
        
        if(de_price_hd[0].getElementsByTagName('font').length > 0) {
            tr_list = div_prices.getElementsByTagName('tr');
            for(inc = 1; inc < tr_list.length; inc++) {
                
                span_arr = tr_list[inc].getElementsByTagName('span');
                sp3_text = span_arr[1].getElementsByTagName('font');
                sp4_text = span_arr[2].getElementsByTagName('font');
                
                textPrice   = sp3_text[0].getElementsByTagName('font')[0].innerHTML.replace(/\s/g, '') + '.' + sp4_text[0].getElementsByTagName('font')[0].innerHTML.split(',')[1];
                
                if(price_table == '')
                    price_table += str + ':' + processPrice(textPrice);
                else price_table+=';'+str+':'+ processPrice(textPrice);
                
            }
        // End process chrome translate
        } else {
            for (var i = 0; i < span_prices.length; i++) {

                str = span_prices[i].textContent;
                //nếu span chứa thông tin số lượng sản phẩm mua:
                if((str.indexOf('-')!=-1) || (str.indexOf('≥')!=-1))
                {
                    textPrice   = span_prices[i+1].textContent + '' + span_prices[i+2].textContent;

                    if(price_table == '')
                        price_table += str + ':' + processPrice(textPrice);
                    else price_table+=';'+str+':'+ processPrice(textPrice);
                }
            }
        }
        
        return encodeURIComponent(price_table);
    }
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao) {
        var rate=rateMoney();
        var price_result = roundNumber(price_taobao * rate,2);
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML =
        '<img style="padding: 4px 4px 4px 25px;" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        alert('Lưu sản phẩm thành công!');
                    else alert(self.xmlHttpReq.responseText);
                }else
                    updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink() {
        //lấy item_id
        var item_id     = getItemId();
        //lấy item_title
        var item_title  = getItemTitle();
        //lấy item_image
        var item_image  = getItemImage();
        //lấy item_link
        var item_link   = getItemLink();
        //lay gia
        var price_taobao= getPrice();
        //var price_result = getVNDPrice(price_taobao);
        var item_price  = price_taobao;
        //lay ban gia
        var price_table = getPriceTable();
        //lấy seller_id	
        var seller_id   = getSellerId();
        var seller_name = seller_id;
        //lấy số lượng
        var quantity    = getQuantity();
        //lấy màu sắc
        var color       = getColor();
        //lay comment
        var comment     = getComment();
        //lấy kích thước
        var size        = getSize();
        
        var weight      = document.getElementsByClassName('parcel-unit-weight')[0] != undefined ? 
                                document.getElementsByClassName('parcel-unit-weight')[0].innerHTML.match(/[0-9]*[\.,]?[0-9]+/g) : 0;
			
        // lay color_size_name
        var color_size_name = getColorSizeName();
			
        var params='type=alibaba';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(comment!='')
            params+='&comment='+comment;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(price_table!='')
            params+='&price_table='+price_table;	
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&width=' + utilities.windowWidth();
        params += '&weight=' + weight;
        return addVersion(params);
    }
    function linkClick() {
        var full=true;
        //validate số lượng
        var stocks          = document.getElementById('dt-sku-can-sold');
        var stocks_amount   = parseInt(stocks.innerHTML);
        //so luong nho nhat dc phep mua
        var min             = getAllowedMinQuantity();
        //so luong kh nhap
        var quantity        = parseInt(getQuantity());
			
        /**
			* Kiểm tra các trường hợp:
			* 1. Hàng có đủ số lượng
			* 2. Số lượng mua có đạt min
			* 3. Số lượng mua có là bộ số của số lượng min
			**/
        if(stocks_amount < min)
        {
            alert('Hàng không đủ.');
            return;
        } else if(quantity < min) {
            alert('Số lượng mua tối thiểu là '+min+' sản phẩm.');
            return;
        } /*else if(quantity%min != 0) {
				alert('Số sản phẩm mua phải là bội số của ' + min + '.');
				return;
			}*/
			
        /** Kiểm tra chọn thuộc tính **/
        try{
            var buyArea = document.getElementsByClassName("d-sku-content");
            if(buyArea != null) { // Có đối tượng thuộc tính
                var attr_Area = buyArea[0].getElementsByClassName('d-sku-box');
                var attr_list = attr_Area[0].getElementsByClassName('d-sku');
                var selects = attr_Area[0].getElementsByClassName('d-selected');
                if(selects.length != attr_list.length){ 
                    alert('Bạn chưa chọn đầy đủ thuộc tính');
                    return;
                }
            }
        } catch (e) { }
			
        try {
            xmlhttpPost(cart_url);
        } catch (e) {
            alert('Có lỗi xảy ra: ' + e);
        }
    }	
    
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function ()
    {
        if((document.getElementById("J_AmountInput") == null || 
            document.getElementById("J_AmountInput") == 'undefined') && 
        document.getElementsByClassName('btn-goToWholesale')==null)
        {
            return;
        }			
        var price_taobao= getPrice();
        var price_result= getVNDPrice(price_taobao);
        var quantity    = getQuantity();
			
        
        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
        + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
        + '          ' + price_result + ' VNĐ '
        + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
        + '              ' + getHostname('http://giangminh247.com')
        + '          </a>'
        + '      </h2>'
        + '      <div style="padding-bottom: 5px; width: 300px;">'
        + '          <span style="text-align:left;">Mô tả:</span><input id="min_quantity" type="hidden" value="' + quantity + '" />'
        + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
        + '      </div>'
        + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
        + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
        + '      </a></span>'
        + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
        if(document.getElementById('J_ModTrade')!=null) {
            document.getElementById('J_ModTrade').parentNode.insertBefore( div.firstChild , document.getElementById('J_ModTrade') );
        } else if(document.getElementById('mod-detail-price')!=null) {
            document.getElementById('mod-detail-price').parentNode.insertBefore( div.firstChild , document.getElementById('mod-detail-price') );
        }
			
        //document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
        
        if(document.getElementById("J_AmoutUp")!=null && document.getElementById("J_AmoutDown")!=null) {
            document.getElementById("J_AmoutUp").addEventListener( 'click', quantityOnBlur);
            document.getElementById("J_AmoutDown").addEventListener( 'click', quantityOnBlur);
        }
			
    };
}

function paipai(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay comment
    function getComment()
    {
        if(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb")!=null)
            return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
        else return '';
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var stocks=document.getElementsByClassName('stock');
        var stocks_amount=stocks.length;
			
        var buyArea=document.getElementById("buyArea");
        var color_size_name='';
        if(stocks_amount>0)
        {
            var selects = buyArea.getElementsByClassName('select');
            if(selects.length>0)
            {
                for(var i=0;i<selects.length;i++)
                {
                    var element = selects[i];
                    if(color_size_name=='')
                        color_size_name+=element.getAttribute('attrvalue');
                    else color_size_name+=';'+element.getAttribute('attrvalue');
                }
            }
        }
        return encodeURIComponent(color_size_name);
    }
    function getSellerId()
    {
        var element =document.getElementsByName("sellerUin");
        if(element.length>0)
        {
            element=element[0];
            var seller_id=element.value;
        }else var seller_id='';
			
        return encodeURIComponent(seller_id);
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementsByName("itemid");
			
        if(element.length>0)
        {
            element=element[0];
            var item_id=element.value;
        }else var item_id=0;
			
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementsByName("sTitle");
			
        if(element.length>0)
        {
            element=element[0];
            var item_title=element.value;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element =document.getElementById("pfhlkd_smallImage");
			
        if(element!=null)
        {
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent(item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("selectNum").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
			
        var element =document.getElementById("commodityCurrentPrice");
			
        if(element!=null)
        {
            var item_price=element.textContent;
				
        }else var item_price='';
        if(isNaN(item_price))
        {
            var element =document.getElementsByName("Price");
            if(element.length>0)
            {
                element=element[0];
                item_price=element.value;
            }
        }
        return processPrice(item_price);
	 
    }
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML =
        '<img style="padding: 4px 4px 4px 25px;" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        alert('Lưu sản phẩm thành công!');
                    else alert(self.xmlHttpReq.responseText);
                }else
                    updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML = beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id     = getItemId();
        
        //lấy item_title
        var item_title  = getItemTitle();
        
        //lấy item_image
        var item_image  = getItemImage();
        
        //lấy item_link
        var item_link   = getItemLink();
        
        //lay gia
        var price_taobao= getPrice();
        var comment     = getComment();
			
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
			
        var params='type=paipai';
        if(item_id!='')
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(comment!='')
            params+='&comment='+comment;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;

        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    
    function linkClick()
    {
        var full = true;
        //validate số lượng
        var stocks=document.getElementsByClassName('stock');
        var stocks_amount = stocks.length;
        var buyArea=document.getElementById("buyArea");
			
        if(stocks_amount > 0)
        {
            var selects = buyArea.getElementsByClassName('select');
            if(selects.length != stocks_amount)
            {
                full=false;
            }
        }
			
        if(full == false)
        {
            alert("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            return ;
        }
			
        xmlhttpPost(cart_url);
    }
    
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad=function ()
    {
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);
        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
        + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
        + '          ' + price_result + ' VNĐ '
        + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
        + '              ' + getHostname('http://giangminh247.com')
        + '          </a>'
        + '      </h2>'
        + '      <div style="padding-bottom: 5px; width: 300px;">'
        + '          <span style="text-align:left;">Mô tả:</span>'
        + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
        + '      </div>'
        + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
        + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
        + '      </a></span>'
        + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;

        document.getElementById('buyArea').parentNode.insertBefore( div.firstChild , document.getElementById('buyArea') );
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}

function mofayichu(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val='';
        if(document.getElementById("sx2list")!=null)
        {
            var color_box=document.getElementById("sx2list");
            val=document.getElementById("sx2list").options[document.getElementById("sx2list").selectedIndex].textContent;
        }
        return encodeURIComponent(val);
    }
    //ham lay comment
    function getComment()
    {
        if(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb")!=null)
            return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
        else return '';
    }
    function getSellerId()
    {
				
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Label12");
        var item_id=0;
        if(element!=null)
            item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var frm=document.getElementById("Form1");
        if(frm!=null)
            var element = frm.getElementsByTagName("img");
	
        if(element!=null)
        {
            element=element[1];
            if(element!=null)
                var item_image=element.getAttribute('src');
            else var item_image='';
        }else var item_image='';
			
        return encodeURIComponent('http://www.mofayichu.com/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        if(document.getElementById("sl1")!=null)
            return document.getElementById("sl1").value;
        else return '';
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return processPrice(item_price);
	 
    }
		
    // Hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        alert('Lưu sản phẩm thành công!');
                    else alert(self.xmlHttpReq.responseText);
                }else
                    updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy comment
        var comment= getComment();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
			
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        // Weight
        var weight = document.getElementById('labzl').innerHTML;
			
        var params='type=mofayichu';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(comment!='')
            params+='&comment='+comment;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;

        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params += '&size='+size;
	params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    
    function linkClick()
    {
        //validate số lượng
        var quantity    = getQuantity();
			
        if(parseInt(quantity) == 0) {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
        
        xmlhttpPost(cart_url);
    }
    
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML=price+' VNĐ';
    }
    
    this.htmlOnLoad = function ()
    {
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);
			
        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
        + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
        + '          ' + price_result + ' VNĐ '
        + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
        + '              ' + getHostname('http://giangminh247.com')
        + '          </a>'
        + '      </h2>'
        + '      <div style="padding-bottom: 5px; width: 300px;">'
        + '          <span style="text-align:left;">Mô tả:</span>'
        + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
        + '      </div>'
        + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
        + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
        + '      </a></span>'
        + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "2");
        row.appendChild(td);
        if(document.getElementById('Tr3')==null) return false;
        document.getElementById('Tr3').parentNode.appendChild( row);
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function _5taobao(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    // Hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val='';
        if(document.getElementById("sx2list")!=null)
        {
            var color_box=document.getElementById("sx2list");
            val=document.getElementById("sx2list").options[document.getElementById("sx2list").selectedIndex].textContent;
        }
        return encodeURIComponent(val);
    }
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("Product_main1_Product_top11_img_tp");
	
        if(element!=null)
        {
            //	element=element[1];
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.5taobao.net/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("txt_buy_sl_0").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return processPrice(item_price);
	 
    }
		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML =
        '<img style="padding: 4px 4px 4px 25px;" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        alert('Lưu sản phẩm thành công!');
                    else alert(self.xmlHttpReq.responseText);
                }else
                    updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML = beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id = getItemId();
        //lấy item_title
        var item_title  = getItemTitle();
        //lấy item_image
        var item_image  = getItemImage();
        //lấy item_link
        var item_link   = getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment     = getComment();
        var item_price  = price_taobao;

        //lấy seller_id	
        var seller_id   = getSellerId();
        var seller_name = seller_id;
        //lấy số lượng
        var quantity    = getQuantity();
        //lấy màu sắc
        var color       = getColor();
        // lay color_size_name
        var color_size_name= getColorSizeName();
        //lấy kích thước
        var size        = getSize();
        var weight = document.getElementById('Product_main1_Product_top11_labzl').innerHTML;
			
        var params='type=5taobao';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    
    function linkClick()
    {	
        //validate số lượng
        var quantity=getQuantity();
        if(parseInt(quantity)==0) {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }			
        xmlhttpPost(cart_url);
    }
    
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML=price+' VNĐ';
    }
    
    this.htmlOnLoad = function ()
    {
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);
        		
        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);
        // Insert this element after Tr3
        table = document.getElementsByClassName('SPSX_bian5');
        element = table[0].getElementsByTagName('tr');
        insertAfter(row, element[0]);
			
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function chenxifushi(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val='';
        if(document.getElementById("sx2list")!=null)
        {
            var color_box=document.getElementById("sx2list");
            val=document.getElementById("sx2list").options[document.getElementById("sx2list").selectedIndex].textContent;
        }
        return encodeURIComponent(val);
    }
    function getSellerId() {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element     = document.getElementById("img_tp");
	var item_image  = '';
        if(element!=null) {
            //	element=element[1];
            item_image=element.getAttribute('src');
        }else item_image='';
			
        return encodeURIComponent('http://www.chenxifushi.com/'+item_image);
    }
    // ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("sl1").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
    }
		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML =
            '<img style="padding: 4px 4px 4px 25px;" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        alert('Lưu sản phẩm thành công!');
                    else alert(self.xmlHttpReq.responseText);
                }else
                    updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML = beforeHtml;
                document.getElementById("id_nhaphang_add_cart").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
			
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        var weight = document.getElementById('labzl').innerHTML;
			
        var params='type=chenxifushi';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    
    function linkClick()
    {
        //validate số lượng
        var quantity=getQuantity();
			
        if(parseInt(quantity)==0) {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
			
        xmlhttpPost(cart_url);
    }
    
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML=price+' VNĐ';
    }
    
    this.htmlOnLoad=function ()
    {					
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);
			
        document.getElementById('Tr3').parentNode.appendChild( row);
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function lelefushi(cart_url) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        return '';
    }
    function getSellerId()
    {
        return '';
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Product_main1_Product_top21_Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Product_main1_Product_top21_Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("Product_main1_Product_top21_img_tp");
	
        if(element!=null)
        {
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.lelefushi.com/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("txt_buy_sl_0").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }
		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML =
            '<img style="padding: 4px 4px 4px 25px;" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML = beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        var weight = document.getElementById('Product_main1_Product_top11_labzl').innerHTML;
			
        var params='type=lelefushi';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick()
    {		
        //validate số lượng
        var quantity=getQuantity();
        if(parseInt(quantity)==0) {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
			
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function ()
    {
        var price_taobao=getPrice();
        var price_result= getVNDPrice(price_taobao);

        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        //td.setAttribute("colspan", "2");
        row.appendChild(td);
			
        document.getElementById('Product_main1_Product_top11_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);
			
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}

function shmoyu(cart_url) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val ='';
        if(document.getElementById("sx1list")!=null)
        {
            var color_box=document.getElementById("sx1list");
            val=document.getElementById("sx1list").options[document.getElementById("sx1list").selectedIndex].textContent;
        }
        return encodeURIComponent(val);
    }
    //ham lay comment
    function getComment() 
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("img_tp");
        if(element!=null)
        {
            //element=element[1];
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.shmoyu.com/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("sl1").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
			
        var params='type=shmoyu';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    
    function linkClick()
    {
        //validate số lượng
        var quantity=getQuantity();
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }	
        xmlhttpPost(cart_url);
    }
    
    this.htmlOnLoad = function ()
    {
        var price_taobao    = getPrice();
        var price_result    = getVNDPrice(price_taobao);
        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);
			
        document.getElementById('Tr3').parentNode.appendChild( row);
			
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function yilanfushi(cart_url) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val='';
        if(document.getElementById("sx2list")!=null)
        {
            var color_box=document.getElementById("sx2list");
            val=document.getElementById("sx2list").options[document.getElementById("sx2list").selectedIndex].textContent;
        }
        return encodeURIComponent(val);
    }
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var frm=document.getElementById("Form1");
        var element = document.getElementById("img_tp");
	
        if(element!=null)
        {
            //element=element[1];
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.yilanfushi.com/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("sl1").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML =
            '<img style="padding: 4px 4px 4px 25px;" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        var weight = document.getElementById('labzl').innerHTML;
			
        var params='type=yilanfushi';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;	
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick()
    {	
        //validate số lượng
        var quantity=getQuantity();			
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
			
        xmlhttpPost(cart_url);
    }
    this.htmlOnLoad = function ()
    {
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);
        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);
        document.getElementById('Tr3').parentNode.appendChild( row);
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function yiranmeifushi(cart_url) {
    function additionPrice() {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor() {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize() {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName() {
        return '';
    }
    //ham lay comment
    function getComment() {
        return encodeURIComponent(document.getElementById("txtBz").value);
    }
    function getSellerId() {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId() {
        var element =document.getElementById("Product_main1_Product_top11_Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle() {
        var element =document.getElementById("Product_main1_Product_top11_Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage() {
        var element = document.getElementById("Product_main1_Product_top11_img_tp");
	
        if(element!=null)
        {
            //	element=element[1];
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.yiranmeifushi.com/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink() {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity() {
        return document.getElementById("txt_buy_sl_0").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice() {
        var element =document.getElementById("Product_main1_Product_top11_Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao) {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML = 
            '<img style="padding: 4px 4px 4px;" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML = beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink() {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        var weight = document.getElementById('Product_main1_Product_top11_labzl').innerHTML;
			
        var params='type=yiranmeifushi';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick() {
        //validate số lượng
        var quantity=getQuantity();
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }		
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function () {			
        var price_taobao = getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML = s;
        td.setAttribute("colspan", "4");
        row.appendChild(td);
        try {		
            obj = getObjectByClass('SPSX_bian5');
            insertAfter(row, obj.getElementsByTagName('TR')[1]);
				
            document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
        }
        catch(e) {
            alert('Không tìm thấy phần tử trên trang.' + e);
        }
    };
}
	
function yiwenfushi(cart_url) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val='';
        if(document.getElementById("sx1list")!=null)
        {
            var color_box=document.getElementById("sx1list");
            val=document.getElementById("sx1list").options[document.getElementById("sx1list").selectedIndex].textContent;
        }
        return encodeURIComponent(val);
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("img_tp");
	
        if(element!=null)
        {
            //	element=element[1];
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.yiwenfushi.com/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("sl1").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }
		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML =
        '<img style="padding: 4px 4px 4px 25px;" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML   = beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment = getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        var weight = document.getElementById('labzl').innerHTML;
			
        var params='type=yiwenfushi';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment= ' + comment;	
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").setAttribute('href',href);
    }
    function linkClick()
    {
        //validate số lượng
        var quantity = getQuantity();
			
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").setAttribute('href','javascript:void(0);');
            return ;
        }
		
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").setAttribute('href','javascript:void(0)');
			
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad=function ()
    {	
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);
        
        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
        + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
        + '          ' + price_result + ' VNĐ '
        + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
        + '              ' + getHostname('http://giangminh247.com')
        + '          </a>'
        + '      </h2>'
        + '      <div style="padding-bottom: 5px; width: 300px;">'
        + '          <span style="text-align:left;">Mô tả:</span>'
        + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
        + '      </div>'
        + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
        + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
        + '      </a></span>'
        + '  </div>';
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);
        document.getElementById('Tr3').parentNode.appendChild( row);
			
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function rihanfushi(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val='';
        if(document.getElementsByClassName("tx").length>0)
        {
            var element =document.getElementsByClassName("tx");
            val = element[0].textContent;
        }			
        return encodeURIComponent(val);
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("Product_main1_Product_top11_img_tp");
	
        if(element!=null)
        {
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.rihanfushi.com/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("txt_buy_sl_0").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        var weight = document.getElementById('Product_main1_Product_top11_labzl').innerHTML;
			
        var params='type=rihanfushi';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick()
    {
        //validate số lượng
        var quantity=getQuantity();
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
        if(document.getElementsByClassName("tx2").length>0 && document.getElementsByClassName("tx").length==0)
        {
            alert("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            return ;
        }
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function ()
    {
        var price_taobao = getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        //td.setAttribute("colspan", "2");
        row.appendChild(td);
			
        document.getElementById('Product_main1_Product_top11_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);
	document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function chengzifs(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val='';
        if(document.getElementsByClassName("tx").length>0)
        {
            var element =document.getElementsByClassName("tx");
            val = element[0].textContent;
        }			
        return encodeURIComponent(val);
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBx_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("Product_main1_Product_top11_img_tp");
	
        if(element!=null)
        {
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.chengzifs.com/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("txt_buy_sl_0").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML = 
            '<img style="padding: 4px 4px 4px 25px;" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        var weight = document.getElementById('Product_main1_Product_top11_labzl').innerHTML;
			
        var params='type=chengzifs';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick()
    {
        var href=getLink();
			
        //validate số lượng
        var quantity=getQuantity();
			
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_nhaphang_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }
        if(document.getElementsByClassName("tx2").length>0 && document.getElementsByClassName("tx").length==0)
        {
            alert("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            document.getElementById("id_nhaphang_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }
			
        document.getElementById("id_nhaphang_add_cart").setAttribute('href','javascript:void(0)');
			
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function ()
    {
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        row.appendChild(td);
			
        document.getElementById('Product_main1_Product_top11_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);
	document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function _69shopfs(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val='';
        if(document.getElementById("sx1list")!=null)
        {
            var color_box=document.getElementById("sx1list");
            val=document.getElementById("sx1list").options[document.getElementById("sx1list").selectedIndex].textContent;
        }
        return encodeURIComponent(val);
    }
		
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("img_tp");
	
        if(element!=null)
        {
            //element=element[1];
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.69shopfs.com/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("sl1").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML =
            '<img style="padding: 4px 4px 4px 25px;" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
			
        var params='type=69shopfs';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick()
    {	
        //validate số lượng
        var quantity=getQuantity();
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
        
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad=function ()
    {
        var price_taobao = getPrice();			
        var price_result = getVNDPrice(price_taobao);			
        if(parseInt(price_result)==0)
            return ;

        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);
			
        document.getElementById('Tr3').parentNode.appendChild( row);
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function jj_fashion(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay comment
    function getComment()
    {
        if(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb")!=null)
            return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
        else return '';
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        //lay danh sach mau sac kich co
        var pr_divs=document.getElementsByClassName('godds_yanse');
        var val='';
        if(pr_divs!=null)
        {
            for(var i=0;i<pr_divs.length;i++)
            {
                //lay cac the A
                var pr=pr_divs[i];
                var a_tags=pr.getElementsByTagName('a');
                if(a_tags!=null && a_tags.length>0)
                {
                    for(var j=0;j<a_tags.length;j++)
                    {
                        var parent_li=a_tags[j].parentNode;
                        if(parent_li.className.indexOf('sel')!=-1)
                        {
                            if(val=='')
                                val+=a_tags[j].textContent;
                            else val+=';'+a_tags[j].textContent;
                        }
                    }
                }
            }
        }
        return encodeURIComponent(val);
    } 
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementsByName("goods_id");
        element=element[0];
        var item_id=0;
        item_id = element.value;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var frm =document.getElementById("ECS_FORMBUY");
			
        if(frm!=null)
        {
            var list=frm.getElementsByTagName('h2');
            var item_title=list[0].textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("mp");
	
        if(element!=null)
        {
            var item_image = element.getAttribute('src');
        } else item_image = '';
	
        return encodeURIComponent( !is_valid_url(item_image) ? 'http://fuzhuangpifa.cn/' + item_image : item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        var item_id=getItemId();
			
        return document.getElementById("number").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("ECS_RANKPRICE_3");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        var comment= getComment();
			
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
		
        //lấy kích thước
        var size=getSize();
			
        var params = 'type=fuzhuangpifa';//'type=jj-fashion';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;

        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick()
    {
        //validate số lượng
        var quantity=getQuantity();
            
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
        var block_frm=document.getElementsByClassName("goods_xz");
        block_frm=block_frm[0];
        var count_all=0;
            
        if(block_frm.getElementsByClassName("godds_yanse").length>0)
        {
            for(i=0;i<block_frm.getElementsByClassName("godds_yanse").length;i++)
            {
                var godds=block_frm.getElementsByClassName("godds_yanse")[i];
                    
                if( godds.getAttribute('style')==null ||godds.getAttribute('style').indexOf('none')==-1) 						count_all=count_all+1;
            }
        }
        
        var count_selected=block_frm.getElementsByClassName("sel").length;
        
        if(count_all>0 && count_all>count_selected)
        {
            alert("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            return ;
        }
            
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML = price+' VNĐ';
    }
    this.htmlOnLoad=function ()
    {
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);
        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
		
        document.getElementsByClassName('goods_xz')[0].appendChild( div);
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function jj_fashion(cart_url,url_save) {
   
    this.htmlOnLoad=function ()
    {
        var product_id = document.getElementsByClassName('good_shux')[0].getElementsByTagName('li')[0].innerHTML;
        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 50px;">'
                + '      <h2>'
                + '          <a href="http://www.fuzhuangpifa.cn/search_gj.php?sr_9=' + product_id.match(/[0-9]+/g) + '" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color: #333;">Mua trên fuzhuangpifa.cn sp này</a>'
                + '          <a href="http://giangminh247.vn" title="trang chủ" target="_blank" style="{style_3}; color: #F1F1F1 !important;">'
                + '              http://giangminh247.vn'
                + '          </a>'
                + '      </h2>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
        document.getElementsByClassName('goods_xz')[0].appendChild( div);
    };
}
	
function shanghai(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val ='';
        if(document.getElementById("sx2list")!=null)
        {
            var color_box=document.getElementById("sx2list");
            val=document.getElementById("sx2list").options[document.getElementById("sx2list").selectedIndex].textContent;
        }
        return encodeURIComponent(val);
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("img_tp");
        if(element!=null)
        {
            //element=element[1];
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://shanghai.q88i.net/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("sl1").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }	
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
			
        var params='type=shanghai';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick()
    {	
        //validate số lượng
        var quantity=getQuantity();			
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }			
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad=function ()
    {
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);
			
        document.getElementById('Tr3').parentNode.appendChild( row);
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function eeshow(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val ='';
        if(document.getElementById("sx2list")!=null)
        {
            var color_box=document.getElementById("sx2list");
            val=document.getElementById("sx2list").options[document.getElementById("sx2list").selectedIndex].textContent;
        }
        return encodeURIComponent(val);
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("Product_main1_Product_top11_img_tp");
        if(element!=null)
        {
            //element=element[1];
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.eeshow.com.cn/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("txt_buy_sl_0").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Product_main1_Product_top11_Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }
		
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
			
        var params='type=eeshow';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick()
    {	
        //validate số lượng
        var quantity=getQuantity();			
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
			
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad=function ()
    {
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        row.appendChild(td);
        document.getElementById('Product_main1_Product_top11_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);
	document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function charm_dress(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor()
    {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize()
    {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var val ='';
        if(document.getElementById("sx2list")!=null)
        {
            var color_box=document.getElementById("sx2list");
            val=document.getElementById("sx2list").options[document.getElementById("sx2list").selectedIndex].textContent;
        }
        return encodeURIComponent(val);
    }
    //ham lay comment
    function getComment()
    {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId()
    {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId()
    {
        var element =document.getElementById("Label12");
        var item_id=0;
        item_id = element.textContent;
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle()
    {
        var element =document.getElementById("Label1");
			
        if(element!=null)
        {
            var item_title=element.textContent;
        }else var item_title='';
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage()
    {
        var element = document.getElementById("img_tp");
        if(element!=null)
        {
            //element=element[1];
            var item_image=element.getAttribute('src');
        }else var item_image='';
			
        return encodeURIComponent('http://www.charm-dress.com/'+item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink()
    {
        return encodeURIComponent(window.location);
    }
    //hàm lấy số lượng mua
    function getQuantity()
    {
        return document.getElementById("sl1").value;
    }
    //hàm lấy giá TQ của sản phẩm
    function getPrice()
    {
        var element =document.getElementById("Label5");
			
        if(element!=null)
        {
            //var item_price=element.textContent.match(/\d+/);
            var item_price=element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        }else var item_price='';
			
        return item_price;
	 
    }
    //hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao)
    {
        var rate=rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;
        document.body.appendChild(htmlObject);
    }
    function getLink()
    {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link= getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        var weight = document.getElementById('Product_main1_Product_top11_labzl').innerHTML;
			
        var params='type=charm-dress';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;
				
        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;
			  
        if(parseInt(color)>-1)
            params+='&color='+color;
		
        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick()
    {		
        //validate số lượng
        var quantity=getQuantity();
        if(parseInt(quantity)==0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }			
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur()
    {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad=function ()
    {
        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);
        if(parseInt(price_result)==0)
            return ;
			
        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);
			
        document.getElementById('Tr3').parentNode.appendChild( row);
        document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
    };
}
	
function baobaopifa(cart_url,url_save) {
    function additionPrice() {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor() {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize() {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName() {
        return '';
    }
    //ham lay comment
    function getComment() {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId() {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId() {
        var item_id = 0;
        item_id = urlParams.getUrlVar('id');
        if(item_id == undefined) {
            item_id = 0;
        }
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle() {
        var element = document.getElementsByClassName("ProName");
        var item_title = '';
        if(element!=null) {
            item_title = element[0].innerHTML;
        }
			
        return encodeURIComponent(item_title);
    }
    //ham lay item_image cua san pham
    function getItemImage() {
        var element = document.getElementsByClassName("picture");
        var item_image='';
        if(element!=null) {
            item_image = element[0].getElementsByTagName('img')[0].getAttribute('src');
        }
        return encodeURIComponent(item_image);
    }
    //ham lay item_link cua san pham
    function getItemLink() {
        return encodeURIComponent(window.location.href);
    }
    //hàm lấy số lượng mua
    function getQuantity() {
        return document.getElementsByName("productnum")[0].value;
    }
    // Lấy giá sản phẩm
    function getPrice() {
        var element = document.getElementById("TContent");
        var item_price='';
        if(element!=null) {
            var span_element = element.getElementsByTagName('span');
            if(span_element[1] != undefined) {
                item_price = span_element[1].textContent.match(/[0-9]*[\.]?[0-9]+/g);
            }
        }
        return item_price;
    }		
    // Hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao) {
        var rate = rateMoney();
        var price_result = price_taobao * rate;
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_{3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_{3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_{3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_{3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink() {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link = getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
			
        var params='type=baobaopifa';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;

        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;

        if(parseInt(color)>-1)
            params+='&color='+color;

        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick() {
        //validate số lượng
        var quantity=getQuantity();
        if(parseInt(quantity) == 0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function () {
        var price_taobao = getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
		  
        var div = document.createElement('div');
        div.innerHTML = s;
			
        try {		
            insertAfter(div, document.getElementsByName('productnum')[0]);
            document.getElementById('RItem').style.height = '455px';
            document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
        }
        catch(e) {
            //alert('Không tìm thấy phần tử trên trang.' + e);
        }
    };
}
	
function xinshij(cart_url,url_save) {
    function getElementLikeId(txt) {
        var matches = [];
        var elems = document.getElementsByTagName("*");
        for (var i=0; i<elems.length; i++) {
            if (elems[i].id.indexOf(txt) == 0)
                matches.push(elems[i]);
        }
        return matches;
    }	
    function additionPrice() {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor() {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize() {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName() {
        return '';
    }
    //ham lay comment
    function getComment() {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId() {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId() {
        var item_id = 0;
        try {
            item_id = document.getElementById('idNO').value;
        } catch (e) {
            alert('Không lấy được id sản phẩm. ' + e);
        }
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle() {
        var item_title = '';
        var element = getElementLikeId("price")[0];
        try {
            parent_obj = element.parentNode;
            strong_element = parent_obj.getElementsByTagName('strong');
            item_title = strong_element[0].innerHTML;
        } catch(e) { 
        //alert(e); 
        }
			
        return encodeURIComponent(item_title);
    }
    // ham lay item_image cua san pham
    function getItemImage() {
        var element = getElementLikeId("price")[0];
        parent_node = element.parentNode.parentNode.parentNode;
        var item_image='';
        item_image = parent_node.getElementsByTagName('img')[4].getAttribute('src');
        return encodeURIComponent('http://www.xinshij.com' + item_image);
    }
    // ham lay item_link cua san pham
    function getItemLink() {
        return encodeURIComponent(window.location.href);
    }
    // hàm lấy số lượng mua
    function getQuantity() {
        return getElementLikeId("GoodsNum")[0].value;
    }
    // Lấy giá sản phẩm
    function getPrice() {
        var item_price = '';
        var element = getElementLikeId("price")[0];
        try {
            obj = element.getElementsByTagName('b');
            item_price = obj[0].textContent.match(/[0-9]*[\.]?[0-9]+/g);
        } catch(e) { 
        /*alert(e);*/ 
        }
        return item_price;
    }		
    // Hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao) {
        var rate = rateMoney();
        var price_result = parseInt(price_taobao * rate);
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        //alert(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //alert(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    //document.getElementById("result").innerHTML = str;
    }
    function getLink() {
        //lấy item_id
        var item_id= getItemId();
        //lấy item_title
        var item_title= getItemTitle();
        //lấy item_image
        var item_image= getItemImage();
        //lấy item_link
        var item_link = getItemLink();
        //lay gia
        var price_taobao=getPrice();
        //lấy comment
        var comment= getComment();
        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
			
        var params='type=xinshij';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;

        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;

        if(parseInt(color)>-1)
            params+='&color='+color;

        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick() {
        //validate số lượng
        var quantity = getQuantity();
        if(parseInt(quantity) == 0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
			
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML = price+' VNĐ';
    }
    this.htmlOnLoad = function () {
        try {
            var price_taobao = getPrice();
            var price_result = getVNDPrice(price_taobao);

            var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
			  
            var div = document.createElement('div');
            div.innerHTML = s;
            div.style.clear = "both";
            div.style.width = "320px";
				
            try {	
                getElementLikeId('GoodsNum')[0].parentNode.parentNode.appendChild(div);
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
            }
            catch(e) {
            //alert('Không tìm thấy phần tử trên trang.' + e);
            }
        } catch(e) { 
        //alert(e);
        }
    };
}
	
function _1925(cart_url,url_save) { 
    function additionPrice() {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor() {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize() {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName() {
        return '';
    }
    //ham lay comment
    function getComment() {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId() {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId() {
        var item_id = 0;
        var element = document.getElementById('Table6');
        try {
            a_tag   = element.getElementsByTagName('a');
            slug    = a_tag[0].href.split('?');
            item_id = slug[1].match(/[0-9]*[\.]?[0-9]+/g);
        } catch (e) {
            alert('Không lấy được id sản phẩm. ' + e);
        }
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle() {
        var item_title = '';
        var element = document.getElementById("Table7");
        try {
            strong_tag = element.getElementsByTagName('strong');
            item_title = strong_tag[0].getElementsByTagName('strong')[0].textContent;
        } catch(e) {
            alert('Title not found.' + e);
        }
			
        return encodeURIComponent(item_title);
    }
    // ham lay item_image cua san pham
    function getItemImage() {
        var element = document.getElementById('Table3');
        img_tag = element.getElementsByTagName('img');
        var item_image='';
        item_image = img_tag[0].getAttribute('src');
        return encodeURIComponent(item_image);
    }
    // ham lay item_link cua san pham
    function getItemLink() {
        return encodeURIComponent(window.location.href);
    }
    // hàm lấy số lượng mua
    function getQuantity() {
        return 1;
    }
    // Lấy giá sản phẩm
    function getPrice() {
        var item_price  = '';
        var element     = document.getElementById("Table7");
        try {
            strong_tag  = element.getElementsByTagName('strong');
            item_price = strong_tag[strong_tag.length-1].textContent.match(/[0-9]*[\.,]?[0-9]+/g);
        } catch(e) {
            alert('Price not found!' + e);
        }
        item_price = processPrice(item_price);
        return item_price;
    }		
    // Hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao) {
        var rate = rateMoney();
        var price_result = parseInt(price_taobao * rate);
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (val) {
            return val.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    }
    function getLink() {
        //lấy item_id
        var item_id     = getItemId();
        //lấy item_title
        var item_title  = getItemTitle();
        //lấy item_image
        var item_image  = getItemImage();
        //lấy item_link
        var item_link   = getItemLink();
        //lay gia
        var price_taobao= getPrice();
        //lấy comment
        var comment     = getComment();
        var item_price  = price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
			
        var params='type=1925';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;

        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;

        if(parseInt(color)>-1)
            params+='&color='+color;

        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick() {
        //validate số lượng
        var quantity = getQuantity();
        if(parseInt(quantity) == 0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
			
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML = price+' VNĐ';
    }
    this.htmlOnLoad = function () {
        try {				
            var price_taobao = getPrice();
            var price_result = getVNDPrice(price_taobao);

            var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
			  
            var div = document.createElement('div');
            div.innerHTML = s;
				
            try {	
                document.getElementById('Table6').parentNode.appendChild(div);
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
            }
            catch(e) { }
        } catch(e) { }
    };
}
	
function tygfushi(cart_url,url_save) { 
    function additionPrice() {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor() {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize() {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName() {
        return '';
    }
    //ham lay comment
    function getComment() {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId() {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId() {
        var item_id = 0;
        var element = document.getElementById('Label12');
        try {
            item_id = element.innerHTML;
        } catch (e) {
            alert('Không lấy được id sản phẩm. ' + e);
        }
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle() {
        var item_title = '';
        var element = document.getElementsByClassName("style17");
        element = element[0];
        try {
            item_title = element.innerHTML;
        } catch(e) {
            alert('Title not found.' + e);
        }
			
        return encodeURIComponent(item_title);
    }
    // ham lay item_image cua san pham
    function getItemImage() {
        var element = document.getElementById('img_tp');
        item_image = element.getAttribute('src');
        return encodeURIComponent(item_image);
    }
    // ham lay item_link cua san pham
    function getItemLink() {
        return encodeURIComponent(window.location.href);
    }
    // hàm lấy số lượng mua
    function getQuantity() {
        return document.getElementById('sl1').value;
    }
    // Lấy giá sản phẩm
    function getPrice() {
        var item_price  = '';
        var element     = document.getElementById("Label5");
        try {
            item_price = element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        } catch(e) {
            alert('Price not found!' + e);
        }
        return item_price;
    }		
    // Hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao) {
        var rate = rateMoney();
        var price_result = parseInt(price_taobao * rate);
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (val) {
            return val.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML =
            '<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    }
    function getLink() {
        //lấy item_id
        var item_id     = getItemId();
        //lấy item_title
        var item_title  = getItemTitle();
        //lấy item_image
        var item_image  = getItemImage();
        //lấy item_link
        var item_link   = getItemLink();
        //lay gia
        var price_taobao= getPrice();
        //lấy comment
        var comment     = getComment();
        var item_price  = price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        var weight = document.getElementById('labzl').innerHTML;
			
        var params='type=tygfushi';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;

        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;

        if(parseInt(color)>-1)
            params+='&color='+color;

        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick() {
        //validate số lượng
        var quantity = getQuantity();
        if(parseInt(quantity) == 0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
			
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML = price+' VNĐ';
    }
    this.htmlOnLoad = function() {
        try {				
            var price_taobao = getPrice();
            var price_result = getVNDPrice(price_taobao);

            var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
			  
            var div = document.createElement('div');
            div.innerHTML = s;
		
            var row = document.createElement("TR");
            var td = document.createElement("TD");
            td.innerHTML = s ;
            td.setAttribute("colspan", "2");
            row.appendChild(td);
            if(document.getElementById('Tr3') != null) {
                document.getElementById('Tr3').parentNode.appendChild( row);
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
            }
            
        } catch(e) { }
    };
}
	
// http://taopulu.com
function taopulu(cart_url,url_save) {
    function additionPrice() {
        return 0;
    }
    //hàm lấy danh sách màu sắc
    function getColor() {
        return -1;
    }
    //hàm lấy danh sách kích cỡ
    function getSize() {
        return -1;
    }
    //ham lay thong tin color_size_name
    function getColorSizeName() {
        return '';
    }
    //ham lay comment
    function getComment() {
        return encodeURIComponent(document.getElementById("cms_txtBz_3965d7fd09c19682cb16452e2b4691fb").value);
    }
    function getSellerId() {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId() {
        var item_id = 0;
        var element = document.getElementById('Label12');
        try {
            item_id = element.innerHTML;
        } catch (e) {
            alert('Không lấy được id sản phẩm. ' + e);
        }
        return item_id;
    }
    //ham lay item_title cua san pham
    function getItemTitle() {
        var item_title = '';
        var element = document.getElementById("LblSkuname");
        try {
            item_title = element.innerHTML;
        } catch(e) {
            alert('Title not found.' + e);
        }
			
        return encodeURIComponent(item_title);
    }
    // ham lay item_image cua san pham
    function getItemImage() {
        return encodeURIComponent('http://www.taopulu.com/' + document.getElementById('img_tp').getAttribute('src'));
    }
    // ham lay item_link cua san pham
    function getItemLink() {
        return encodeURIComponent(window.location.href);
    }
    // hàm lấy số lượng mua
    function getQuantity() {
        return document.getElementById('sl1').value;
    }
    // Lấy giá sản phẩm
    function getPrice() {
        var item_price  = '';
        var element     = document.getElementById("Label5");
        try {
            item_price = element.textContent.match(/[0-9]*[\.]?[0-9]+/g);
        } catch(e) {
            alert('Price not found!' + e);
        }
        return item_price;
    }		
    // Hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao) {
        var rate = rateMoney();
        var price_result = parseInt(price_taobao * rate);
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (val) {
            return val.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });
	  
        return price_result;
    }
    function xmlhttpPost(strURL) {
        var xmlHttpReq = false;
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }
			
        var beforeHtml= document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML;
        document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML =
            '<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("cms_block_button_3965d7fd09c19682cb16452e2b4691fb").innerHTML=beforeHtml;
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener('click', linkClick);
            }
        }
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    }
    function getLink() {
        //lấy item_id
        var item_id     = getItemId();
        
        //lấy item_title
        var item_title  = getItemTitle();
        //lấy item_image
        var item_image  = getItemImage();
        //lấy item_link
        var item_link   = getItemLink();
        //lay gia
        var price_taobao= getPrice();
        //lấy comment
        var comment     = getComment();
        var item_price  = price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name=seller_id;
        //lấy số lượng
        var quantity=getQuantity();
        //lấy màu sắc
        var color=getColor();
        // lay color_size_name
        var color_size_name=getColorSizeName();
        //lấy kích thước
        var size=getSize();
        var weight = document.getElementById('labzl').innerHTML;
			
        var params='type=taopulu';
        if(parseInt(item_id)>0)
            params+='&item_id='+item_id;
        if(item_title!='')
            params+='&item_title='+item_title;
        if(item_image!='')
            params+='&item_image='+item_image;
        if(item_link!='')
            params+='&item_link='+item_link;	
        if(item_price>0)
            params+='&item_price='+item_price;
        if(comment!='')
            params+='&comment='+comment;
        if(color_size_name!='')
            params+='&color_size_name='+color_size_name;

        if(seller_id.length>0)
        {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length>0)
        {
            params+='&seller_name='+seller_name;
        }			
        if(parseInt(quantity)>0)
            params+='&quantity='+quantity;

        if(parseInt(color)>-1)
            params+='&color='+color;

        if(parseInt(size)>-1)
            params+='&size='+size;
        params += '&weight=' + weight;
        params += '&width=' + utilities.windowWidth();
        return addVersion(params);
    }
    function linkClick() {
        //validate số lượng
        var quantity = getQuantity();
        if(parseInt(quantity) == 0)
        {
            alert("Bạn phải mua ít nhất một sản phẩm!");
            return ;
        }
			
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap_price_3965d7fd09c19682cb16452e2b4691fb').innerHTML = price+' VNĐ';
    }
    
    this.htmlOnLoad = function() {
        try {				
            var price_taobao = getPrice();
            var price_result = getVNDPrice(price_taobao);
            
            var s = '<div style="background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#F3F6FA), to(#1A82F7)); repeat scroll 0 0 transparent; border: 1px solid blue; width: 300px; padding: 5px; color:blue; height: 123px;">'
                + '      <h2 style="margin:0px; padding: 0px; font-size:18px;" id="hangnhap_price_3965d7fd09c19682cb16452e2b4691fb">'
                + '          ' + price_result + ' VNĐ '
                + '          <a href="http://giangminh247.com" title="trang chủ" target="_blank" style="float:right; font-size:12px; font-weight:normal; text-decoration:none; padding:5px 5px 0 0; color:blue !important;">'
                + '              ' + getHostname('http://giangminh247.com')
                + '          </a>'
                + '      </h2>'
                + '      <div style="padding-bottom: 5px; width: 300px;">'
                + '          <span style="text-align:left;">Mô tả:</span>'
                + '          <textarea style="height: 45px; width: 98%; resize: none; color:blue; border: 1px solid blue;" id="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb" name="cms_txtBz_3965d7fd09c19682cb16452e2b4691fb"></textarea>'
                + '      </div>'
                + '      <span id="cms_block_button_3965d7fd09c19682cb16452e2b4691fb"><a href="javascript:;" style="text-decoration: none; padding: 10px 0;" id="cms_order_post_3965d7fd09c19682cb16452e2b4691fb">'
                + '           <input type="button" value="Đặt hàng" style="background: none repeat scroll 0 0 #CCCCCC; border: 1px solid blue; color: blue; padding: 2px 10px;" />'
                + '      </a></span>'
                + '  </div>';
			  
            var div = document.createElement('div');
            div.innerHTML = s;
		
            var row = document.createElement("TR");
            var td = document.createElement("TD");
            td.innerHTML = s ;
            td.setAttribute("colspan", "4");
            row.appendChild(td);
            if(document.getElementById('Tr3') != null) {
                document.getElementById('Tr3').parentNode.appendChild( row);
                document.getElementById("cms_order_post_3965d7fd09c19682cb16452e2b4691fb").addEventListener( 'click', linkClick);
            }
            
        } catch(e) { }
    };
}

var url     = 'http://giangminh247.com/ajax.php?path=view&fnc=fnc_cart&act=addon_cart';
var url_save= 'http://giangminh247.com';
var host    = getHostname();
var ex      = null;
	
//taobao
if(host.indexOf('taobao')!=-1 || host.indexOf('tmall')!=-1)
{
    ex=new taobao(url,url_save);
}
//alibaba
if(host.indexOf('alibaba')!=-1)
{
    ex=new alibaba(url,url_save);
}
//paipai
if(host.indexOf('paipai')!=-1)
{
    ex=new paipai(url,url_save);
}
//mofayichu
if(host.indexOf('mofayichu')!=-1)
{
    ex=new mofayichu(url,url_save);
}
//5taobao
if(host.indexOf('5taobao')!=-1)
{
    ex=new _5taobao(url,url_save);
}
//chenxifushi
if(host.indexOf('chenxifushi')!=-1)
{
    ex=new chenxifushi(url,url_save);
}
//lelefushi
if(host.indexOf('lelefushi')!=-1)
{
    ex=new lelefushi(url,url_save);
}
//yilanfushi
if(host.indexOf('yilanfushi')!=-1)
{
    ex=new yilanfushi(url,url_save);
}
//shmoyu
if(host.indexOf('shmoyu')!=-1)
{
    ex=new shmoyu(url,url_save);
}
//yiranmeifushi
if(host.indexOf('yiranmeifushi')!=-1)
{
    ex=new yiranmeifushi(url,url_save);
}
//yiwenfushi
if(host.indexOf('yiwenfushi')!=-1)
{
    ex=new yiwenfushi(url,url_save);
}
//rihanfushi
if(host.indexOf('rihanfushi')!=-1)
{
    ex=new rihanfushi(url,url_save);
}
//chengzifs
if(host.indexOf('chengzifs')!=-1)
{
    ex=new chengzifs(url,url_save);
}
//69shopfs
if(host.indexOf('69shopfs')!=-1)
{
    ex=new _69shopfs(url,url_save);
}
//jj-fashion
if(host.indexOf('jj-fashion')!=-1)
{
    ex=new jj_fashion();
}
//jj-fashion (fuzhuangpifa)
if(host.indexOf('fuzhuangpifa')!=-1)
{
    ex=new fuzhuangpifa(url,url_save);
}
//shanghai
if(host.indexOf('shanghai')!=-1)
{
    ex=new shanghai(url,url_save);
}
//eeshow
if(host.indexOf('eeshow')!=-1)
{
    ex=new eeshow(url,url_save);
}
//charm-dress
if(host.indexOf('charm-dress')!=-1)
{
    ex=new charm_dress(url,url_save);
}
//baobaopifa
if(host.indexOf('baobaopifa')!=-1)
{
    ex=new baobaopifa(url,url_save);
}
//xinshij
if(host.indexOf('xinshij')!=-1)
{
    ex=new xinshij(url,url_save);
}
//1925
if(host.indexOf('1925')!=-1)
{
    ex=new _1925(url,url_save);
}
//tygfushi
if(host.indexOf('tygfushi')!=-1)
{
    ex=new tygfushi(url,url_save);
}
//taopulu
if(host.indexOf('taopulu')!=-1)
{
    ex = new taopulu(url ,url_save);
}
ex.htmlOnLoad();