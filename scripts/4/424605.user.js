// ==UserScript==
// @name                OrderForStaff
// @namespace	        http://zelus.com 
// @description	        OrderForStaff- Công cụ tối ưu đặt hàng trên các site Trung Quốc
// @include		http://item.taobao.com/*
// @include             http://detail.taobao.com/meal_detail.htm?spm=*
// @include		http://item.lp.taobao.com/*
// @include		http://item.beta.taobao.com/*
// @include		http://auction.taobao.com/*
// @include		http://item.tmall.com/*
// @include		http://detail.tmall.com/*
// @include		http://detailp4p.china.alibaba.com/*
// @include		http://detail.china.alibaba.com/*
// @include		http://detail.1688.com/*
// @include		http://auction1.paipai.com/*
// @include		http://mofayichu.com/shop_*Products.aspx*
// @include		http://mofayichu.com/shop_*products.aspx*
// @include		http://www.mofayichu.com/shop_*Products.aspx*
// @include		http://www.mofayichu.com/shop_*products.aspx*
// @include		http://mofayichu.q88e.net/shop_*Products.aspx*
// @include		http://mofayichu.q88e.net/shop_*products.aspx*
// @include		http://www.mofayichu.q88e.net/shop_*Products.aspx*
// @include		http://www.mofayichu.q88e.net/shop_*products.aspx*
// @include		http://5taobao.q88k.net/shop_*Products.aspx*
// @include		http://www.5taobao.net/shop_gkm2/products.aspx?sku*
// @include		http://www.5taobao.net/shop_gkm1/products.aspx?sku*
// @include		http://www.5taobao.net/shop_gmb1/products.aspx?sku*
// @include		http://www.5taobao.net/shop_gmb1/products.aspx?shbid=*
// @include		http://5taobao.q88k.net/shop_*products.aspx*
// @include		http://www.chenxifushi.com/shop_*products.aspx*
// @include		http://www.chenxifushi.com/shop_*Products.aspx*
// @include		http://www.lelefushi.com/SHOP_*Products.aspx*
// @include		http://www.lelefushi.com/SHOP_*products.aspx*
// @include		http://www.lelefushi.com/shop_*Products.aspx*
// @include		http://www.lelefushi.com/shop_*products.aspx*
// @include		http://www.yilanfushi.com/shop_*products.aspx*
// @include		http://www.yilanfushi.com/shop_*Products.aspx*
// @include		http://www.shmoyu.com/shop_*products.aspx*
// @include		http://www.shmoyu.com/shop_*Products.aspx*
// @include		http://www.yiranmeifushi.com/shop_*products.aspx*
// @include		http://www.yiwenfushi.com/shop_*products.aspx*
// @include		http://yiwenfushi.q88j.net/shop_*products.aspx*
// @include		http://www.rihanfushi.com/shop_*products.aspx*
// @include		http://www.chengzifs.com/SHOP_*Products.aspx*
// @include		http://www.69shopfs.com/shop_*products.aspx*
// @include		http://fuzhuangpifa.cn/goods*
// @include		http://www.fuzhuangpifa.cn/goods*
// @include		http://jj-fashion.com/goods.php?id*
// @include		http://www.jj-fashion.com/goods.php?id=*
// @include		http://shanghai.q88i.net/shop_*products.aspx*
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
// @include		http://www.hongwufushi.com/sp_xx.asp?bh*
// @include		http://hongwufushi.com/sp_xx.asp?bh*

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

function getHostname() {
    var url = window.location.href;
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
    iframe.src = 'http://zelus.com';
    document.body.appendChild(iframe);
}
function addVersion(url) {
    return url+'&version=20140225'; // nam-thang-ngay
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

    p = String(price).replace(',','.').match(/[0-9]*[\.]?[0-9]+/g);
    return parseFloat(p);
}

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
    function rateMoney()
    {
        return 3500;
    }
    addGlobalStyle('.tahoma { font-family: tahoma,arial,verdana ! important; }');

    function getPriceTaobao() {

        var normal_price = document.getElementById('J_StrPrice');
        if(normal_price == null) {
            normal_price = document.getElementById('J_StrPriceModBox');
        }
        var promotion_price = document.getElementById('J_PromoPrice');
        if(promotion_price == null) {
            promotion_price = document.getElementById('J_SPrice');
        }

        // NEW
        var price = 0;
        if(promotion_price != null) { // Promotion price
            if(window.location.href.indexOf('tmall') > -1) {
                if(promotion_price.getElementsByClassName('tm-price').length > 0) {
                    price = promotion_price.getElementsByClassName('tm-price')[0].textContent.match(/[0-9]*[\.,]?[0-9]+/g);
                }
            } else {
                if(promotion_price.getElementsByClassName('tb-rmb-num').length > 0) {
                    try{
                        price = promotion_price.getElementsByClassName('tb-rmb-num')[0].textContent.match(/[0-9]*[\.,]?[0-9]+/g);
                    }catch(e){
                        price = promotion_price.getElementsByClassName('tm-price')[0].textContent.match(/[0-9]*[\.,]?[0-9]+/g);
                    }
                } else {
                    // VIP - sau khi chon thuoc tinh (size, color) xay ra truong hop object bi thay doi
                    if(promotion_price.getElementsByClassName('tb-vip-notice').length > 0) {
                        price = promotion_price.getElementsByClassName('tb-vip-notice')[0].textContent.match(/[0-9]*[\.,]?[0-9]+/g);
                    }
                    // 12/12/2013
                    if(promotion_price.className = 'tb-rmb-num') {
						if(promotion_price.getElementsByClassName('tb-promo-price-type').length > 0) {
							if((price == 0 || price == null) & document.getElementsByClassName('tb-rmb-num').length > 0) {
								price = document.getElementsByClassName('tb-rmb-num')[0].innerHTML.match(/[0-9]*[\.,]?[0-9]+/g);
							}
						} else {
							price = promotion_price.innerHTML.match(/[0-9]*[\.,]?[0-9]+/g);	
						}
                    }
					
					
                }
            }
            price = processPrice(price);

            if(price == 0) { // Try if price not found
                price = normal_price.getElementsByClassName('tm-price');
				if(price.length > 0) { 
					price = price[0].textContent.match(/[0-9]*[\.,]?[0-9]+/g);
				} else {
					price = document.getElementById('J_StrPriceModBox');
					if(price != 0) {
						price = price.getElementsByClassName('tb-rmb-num');
						if(price.length > 0) {
							price = price[0].innerHTML.match(/[0-9]*[\.,]?[0-9]+/g);
						}
					}
				}
				
                price = processPrice(price);
            }
        } else {
            if(window.location.href.indexOf('tmall') > -1) {
                try{
                    price = normal_price.getElementsByClassName('tm-price')[0].textContent.match(/[0-9]*[\.,]?[0-9]+/g);

                }catch(e){
                    price = normal_price.getElementsByClassName('tb-rmb-num')[0].textContent.match(/[0-9]*[\.,]?[0-9]+/g);

                }
            } else { // taobao
                try{
                    price = normal_price.getElementsByClassName('tb-rmb-num')[0].textContent.match(/[0-9]*[\.,]?[0-9]+/g);

                }catch(e){
                    price = normal_price.getElementsByClassName('tm-price')[0].textContent.match(/[0-9]*[\.,]?[0-9]+/g);

                }
            }
            price = processPrice(price);
        }
        return price;
        // END NEW
    }

    function getTitle()
    {
        var tb = '';
        if(document.getElementsByClassName("tb-detail-hd").length > 0)
        {
            var h = document.getElementsByClassName("tb-detail-hd");
            tb = (h.length > 0 ? (h[0].getElementsByTagName('h3').length > 0 ? h[0].getElementsByTagName('h3')[0].textContent : ''): '');
        }
        if(document.getElementsByClassName("tb-tit").length > 0)
            tb = document.getElementsByClassName("tb-tit")[0].textContent;
        if(document.getElementsByClassName('tb-item-title').length > 0) {
            if(document.getElementsByClassName('tb-item-title')[1] != undefined) {
                tb = document.getElementsByClassName('tb-item-title')[1].innerHTML;
            }
        }

        return encodeURIComponent(tb);
    }
    
	function getImgLink()
    {
        var img_src = "";
        try {
            var img_obj = document.getElementById('J_ImgBooth');
            if(img_obj != null) { // Image taobao and t
                img_src = img_obj.getAttribute("src");
                return encodeURIComponent(img_src);
            }

            if(host.indexOf('tmall') == -1 ) { // taobao
                img_src = document.getElementById('J_ImgBooth').getAttribute("src");
            } else { // tmall
                if(document.getElementById('J_ImgBooth').tagName == "IMG") {
                    // Find thumb image
                    var thumbs_img_tag = document.getElementById('J_UlThumb');
                    try{
                        if(thumbs_img_tag != null) {
                            img_src = thumbs_img_tag.getElementsByTagName("img")[0].src;
                        } else {
                            img_src = document.getElementById('J_ImgBooth').src;
                        }
                    } catch(e) {
                        console.log(e);
                    }
                } else {
                    // Find thumb image
                    var thumbs_a_tag = document.getElementById('J_UlThumb');
                    if(thumbs_a_tag != null) {
                        img_src = thumbs_a_tag.getElementsByTagName("li")[0].style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                    } else {
                        img_src = document.getElementById('J_ImgBooth').style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                    }
                }
            }
        } catch(e) {
            console.log("Image not found!" + e);
        }
        return encodeURIComponent(img_src);
    }
    function getSellerName()
    {
        var seller_name = '';
        if(window.location.href.indexOf('tmall') > 0) { // Tmall
            if(document.getElementsByClassName('slogo').length > 0) { // Page detail of shop
                if (document.getElementsByClassName('slogo-shopname').length > 0) {
                    seller_name = document.getElementsByClassName('slogo-shopname')[0].innerHTML;
                } else if(document.getElementsByClassName('flagship-icon').length > 0) {
                    seller_name = document.getElementsByClassName('slogo')[0].getElementsByTagName('span')[1].getAttribute('data-tnick');
                } else {
                    seller_name = document.getElementsByClassName('slogo')[0].getElementsByTagName('span')[0].getAttribute('data-tnick');
                }
            } else { // Page detail of general
                if(document.getElementsByClassName('bts-extend').length > 0 ) {
                    try {
                        seller_name = document.getElementsByClassName('bts-extend')[0].getElementsByTagName('li')[1].getElementsByTagName('span')[0].getAttribute('data-tnick');
                    } catch(e) {
                        console.log('Seller name not found!');
                        console.log(e);
                    }
                }
            }

            seller_name = decodeURIComponent(seller_name);
        } else {
            var shop_card = document.getElementsByClassName('shop-card');
            var data_nick = shop_card[0].getElementsByClassName('ww-light');
            seller_name = (data_nick.length > 0 ? data_nick[0].getAttribute('data-nick') : '');
            
			if(seller_name == '') {
				// Find base info
                if( document.getElementsByClassName('base-info').length > 0) {
                    for(var i =0; i < document.getElementsByClassName('base-info').length; i++) {
                        if(document.getElementsByClassName('base-info')[i].getElementsByClassName('seller').length > 0) {
                            if(document.getElementsByClassName('base-info')[i].getElementsByClassName('seller')[0].getElementsByClassName('J_WangWang').length > 0) {
                                seller_name = document.getElementsByClassName('base-info')[i].getElementsByClassName('seller')[0].getElementsByClassName('J_WangWang')[0].getAttribute('data-nick');
                                break;
                            }
                            if(document.getElementsByClassName('base-info')[i].getElementsByClassName('seller')[0].getElementsByClassName('ww-light').length > 0) {
                                seller_name = document.getElementsByClassName('base-info')[i].getElementsByClassName('seller')[0].getElementsByClassName('ww-light')[0].getAttribute('data-nick');
                                break;
                            }
                        }
                    }
                }
				//if(document.getElementById('J_TEnterShop') != null) seller_name = document.getElementById('J_TEnterShop').innerHTML;
			}
        }
        return encodeURIComponent(seller_name);
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
        return unescape(y);
    }
    //ham lay comment
    function getComment()
    {
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
    }
    function getLink()
    {
        var params = 'type=taobao&';
        try {
            var element = document.getElementsByName("item_id");
            var item_id = 0;
            if (element.length > 0) {
                element = element[0];
                item_id = element.value;
            } else item_id = 0;

            if (item_id == 0 || item_id == null || item_id == '') {
                element = document.getElementsByName("item_id_num");
                if (element.length > 0) {
                    element = element[0];
                    item_id = element.value;
                } else item_id = 0;
            }

            var seller_id = '';
            // taobao
            if (host.indexOf('tmall') == -1) {
                element = document.getElementsByName("seller_num_id");
                if (element.length > 0) {
                    element = element[0];
                    seller_id = element.value;
                } 
				if (seller_id == '' & document.getElementById('J_listBuyerOnView') != null) {
                    element = document.getElementById('J_listBuyerOnView');
                    url_params = element.getAttribute('detail:params');
                    if(url_params != '' & url_params != 'undefined' & url_params != null)
						seller_id = urlParams.getUrlVars(url_params)['seller_num_id'];
                }
				
				if(seller_id == '' & document.getElementById('detail-recommend-viewed') != null) {
                    seller_id = document.getElementById('detail-recommend-viewed').getAttribute('data-sellerid');
                } 
				
				if(seller_id == '' & document.getElementById('detail-recommend-bought') != null) {
                    seller_id = document.getElementById('detail-recommend-bought').getAttribute('data-sellerid');
                }
				
				if(seller_id == '') { seller_id = 0; }

            } else { // tmall
                element = document.getElementById('J_listBuyerOnView');
                if (element != null) {
                    url_params = element.getAttribute('detail:params');
                    seller_id = urlParams.getUrlVars(url_params)['seller_num_id'];
                    if (parseInt(item_id) == 0) {
                        item_id = urlParams.getUrlVars(url_params)['item_id'];
                    }
                } else {
                    element = document.getElementById('seller_id');
                    if (element != null) {
                        seller_id = element.value;
                    }else{
                        element = document.getElementById('dsr-userid');
                        seller_id = element.value;
                    }
                }
                if (item_id == 0 & document.getElementById('LineZing') != null) {
                    item_id = document.getElementById('LineZing').getAttribute('itemid');
                }
            }

            var quantity = '';
            element = document.getElementById("J_IptAmount");
            if (element) {
                quantity = element.value;
            } else quantity = '';
            // Get amount: 13/9/2013
            if (quantity == '') {
                try {
                    quantity = document.getElementsByClassName('mui-amount-input')[0].value;
                } catch (e) {
                    console.log(e);
                }
            }

            //lay title
            var title = getTitle();
            //lay img
            var img = getImgLink();
            //lay seller name
            var seller_name = getSellerName();
            element = document.getElementsByName("allow_quantity");
            var amount = 0;
            if (element.length > 0) {
                element = element[0];
                amount = element.value;
            } else amount = 0;

            var selected_props = document.getElementsByClassName('tb-selected');
            /*
             var props = document.getElementsByClassName('tb-prop');
             var selected_props = null;
             if(props.length > 0) {
             for(var o in props) {
             if(isNaN(o)) { continue; }
             selected_props = props[o].getElementsByClassName('tb-selected');
             }
             }
             */

            var p_params = '';
            var max_p = 0;
            var color_size = '';
            var data_value = '';
            if (selected_props.length > 0) {
                for (var i = 0; i < selected_props.length; i++) {
                    var ele = selected_props[i];
                    var prop_str = ele.getAttribute("data-value");
                    if (prop_str != null && prop_str.length > 0) {
                        max_p++;
                        if (data_value == '') {
                            data_value += prop_str;
                        } else {
                            data_value += ';' + prop_str;
                        }
                        var p_e = ele.getElementsByTagName('span');
                        if (p_e.length > 0) {
                            p_e = p_e[p_e.length - 1];
                            prop_str = p_e.textContent
                            color_size += ';' + encodeURIComponent(prop_str);
                        } else {
                            p_e = ele.getElementsByTagName('i');
                            if (p_e.length > 0) {
                                p_e = p_e[0].parentNode;
                                prop_str = p_e.textContent
                                color_size += ';' + encodeURIComponent(prop_str);
                            }
                        }

                    } else continue;
                }
            }

            var item_price = getPriceTaobao();
            var ct = getCookie('t');
            //lay comment
            var comment = getComment();

            if (parseInt(item_id) > 0) params += 'item_id=' + item_id;
            if (item_price > 0) params += '&item_price=' + item_price;
            if (title.length > 0) params += '&title=' + title;
            if (img.length > 0) params += '&img=' + img;
            if (seller_name.length > 0) params += '&seller_name=' + seller_name;
            if (parseInt(seller_id) > 0) {
                params += '&seller_id=' + seller_id;
            } else {
                if (seller_name.length > 0) {
                    params += '&seller_id=' + seller_name;
                }
            }
            if (parseInt(quantity) > 0) params += '&quantity=' + quantity;
            if (parseInt(amount) > 0) params += '&amount=' + amount;
            if (color_size.length > 0) params += '&color_size=' + color_size;

            // Lay comment
            if (comment.length > 0)
                params += '&comment=' + comment;
            if (data_value.length > 0)  params += '&data_value=' + data_value;
            if (ct.length > 0) params += '&ct=' + ct;
            if (max_p > 0) {
                params += p_params;
            }
			
			// Find script tag
			var scripts = document.getElementsByTagName('script');
			if(scripts.length > 0) {
				for(var script = 0; script < scripts.length; script++) {
					if(scripts[script].innerHTML.match(/Hub\.config\.set/)) {
						var skuMap = scripts[script].innerHTML.replace(/\s/g, '').substr(scripts[script].innerHTML.replace(/\s/g, '').indexOf(data_value) , 60);
						if(skuMap.indexOf('skuId') > -1) {
							params += '&outer_id=' + skuMap.substr(skuMap.indexOf('skuId') + 8, 15).match(/[0-9]+/); 
						}
					}	
				}
			}
            params += '&item_link=' + encodeURIComponent(window.location.href);
            params += "&is_addon=1";
        } catch (e) {

            console.log("Có sự cố xảy ra do website đã thay đổi! [" + e + "]");
        }
        // return href+params;
        return addVersion(params);
    }
    function linkHover() {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
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
        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML =
            '<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        console.log('Lưu sản phẩm thành công!');
                    else console.log(self.xmlHttpReq.responseText);
                }else
                    updatepage(self.xmlHttpReq.responseText);

                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                addListener(document.getElementById("id_zelus_add_cart"), 'click', linkClick);
                addListener(document.getElementById("id_zelus_save_item"), 'click', linkSave);
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
        //console.log(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
        //document.getElementById("result").innerHTML = str;
    }
    function closeBox()
    {
        //get box
        var box=document.getElementById("box-confirm-nh-site");
        var p=box.parentNode;
        p.removeChild(box);
    }
    function linkClick() {
        try {
            //tong thuoc tinh
            var props=document.getElementsByClassName('J_TSaleProp');
            var full=true;
            if(props.length > 0) {
                //kiem tra so thuoc tinh da chon cua sp
                var count_selected=0;
                for(var i=0;i<props.length;i++)
                {
                    var selected_props=props[i].getElementsByClassName('tb-selected');
                    if(selected_props!=null && selected_props!='undefined')
                        count_selected+=selected_props.length;
                }
                if(count_selected<props.length)
                {
                    full=false;
                }

            }
            if(full==true)
                document.getElementById("id_zelus_add_cart").setAttribute('target',"_blank");
            else
            {
                document.getElementById("id_zelus_add_cart").setAttribute('target',"");
                console.log("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
                document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
                return ;
            }

            // Khong tim thay phan tu nhap so luong tren trang
            var out_of_stock = true;
            if(document.getElementById("J_IptAmount") != null || document.getElementById("J_Amount") != null) {
                out_of_stock = false;
            }

            if(out_of_stock)
            {
                document.getElementById("id_orderhang_add_cart").setAttribute('target',"");
                console.log("Hết hàng!");
                document.getElementById("id_orderhang_add_cart").setAttribute('href','javascript:void(0);');
                return;
            }
            //document.getElementById("id_zelus_add_cart").setAttribute('href',href);
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');
            document.getElementById("id_zelus_add_cart").setAttribute('target',"");

            xmlhttpPost(cart_url);
        } catch(e) {
            alert(e);
        }

    }
    function linkSave() {
        var href=getLink();

        //tong thuoc tinh
        var props=document.getElementsByClassName('J_TSaleProp');
        var full=true;
        if(props.length>0)
        {
            //kiem tra so thuoc tinh da chon cua sp
            var count_selected=0;
            for(var i=0;i<props.length;i++)
            {
                var selected_props=props[i].getElementsByClassName('tb-selected');
                if(selected_props!=null && selected_props!='undefined')
                    count_selected+=selected_props.length;
            }
            if(count_selected<props.length)
            {
                full=false;
            }
        }
        if(full==true)
            document.getElementById("id_zelus_save_item").setAttribute('target',"_blank");
        else
        {
            document.getElementById("id_zelus_save_item").setAttribute('target',"");
            console.log("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            document.getElementById("id_zelus_save_item").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_save_item").setAttribute('href','javascript:void(0)');
        document.getElementById("id_zelus_save_item").setAttribute('target',"");

        xmlhttpPost(url_save);
    }

    this.htmlOnLoad=function ()
    {
        //  Add class  notranslate
        if (window.location.href.indexOf('tmall') > 0) {
            var shop_info = document.getElementById('J_StrPriceModBox');
            var shop_info_2 = document.getElementById('J_PromoBox');
            if(shop_info != null) {
                shop_info.className = shop_info.className + ' notranslate';
            }
            if(shop_info_2 != null) {
                shop_info_2.className = shop_info_2.className + ' notranslate';
            }
        }
        wait_by_call_ajax(1);
    }

    var max_time_call_ajax = 10;
    function wait_by_call_ajax(time) {

        var self = this;
        self.xmlHttpReq = new XMLHttpRequest();
        self.xmlHttpReq.open('POST', 'http://google.com', true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";
        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(time == max_time_call_ajax) {
                    update_html();
                } else {
                    wait_by_call_ajax(time + 1);
                }
            }
        };
        self.xmlHttpReq.send();
    }

    function update_html() {

        var src     = 'http://zelus.com/zelus_order.gif';
        var rate    = rateMoney();
        var price_taobao = getPriceTaobao();

        var price_result = Math.ceil(price_taobao * rate);

        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) {
            return int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });


        //html vung hien thi gia
        var price_text='<div style="font-weight:bold;color: blue;width: 195px; font-size:24px;line-height:40px;margin-left:55px" id="tinphat-price">'+(price_result)+' VNĐ</div> ';
        //html vung mota
        var com_text='<div><span style="width:50px;">Mô tả：</span><textarea cols="60" id="txtBz" name="txtBz"></textarea></div>';
        //html vung luu lai
        var save_text='<div style="float:right;margin-right:50px;margin-top:6px">[<a id="id_zelus_save_item" href="javascript:;">Lưu lại đặt hàng sau</a>]</div>';

        //html toan bo addon
        var s = '<li class="clearfix" id="gia-tinphat" style="background: #FFF;height: 150px; border: 2px solid blue;padding-top:10px">' +price_text+com_text+
            '<div class="xbTipBlock tahoma"><div style="width:100%;float:right">' +
            ' <div style="float:left;padding-left:55px" id="block_button_zelus"><a id="id_zelus_add_cart" href="javascript:;"><img src="' + src + '" alt="" /></a></div>'+save_text+'</div></div></li>'+
            '';

        var div = document.createElement('div');
        div.innerHTML = s;

        document.getElementById('J_StrPriceModBox').parentNode.insertBefore( div.firstChild , document.getElementById('J_StrPriceModBox').nextSibling );
        // add cac su kien
        // addListener(document.getElementById("id_zelus_add_cart"), 'mouseover', linkHover);
        addListener(document.getElementById("id_zelus_add_cart"), 'click', linkClick);
        addListener(document.getElementById("id_zelus_save_item"), 'click', linkSave);

    }
}

function alibaba(cart_url,url_save) {
    var beforeHtml = '';
    // Rate
    function rateMoney() {
        return 3300;
    }

    // Comment
    function getComment() {
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
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

        for (var i = 0; i < span_prices.length; i++) {
            str = span_prices[i].textContent;
            // nếu span chứa thông tin số lượng sản phẩm mua:
            if((str.indexOf('-')!=-1) || (str.indexOf('≥')!=-1))
            {
                textPrice   = span_prices[i+1].textContent + '' + span_prices[i+2].textContent;
                if(price_table == '')
                    price_table += str + ':' + processPrice(textPrice);
                else price_table+=';'+str+':'+ processPrice(textPrice);
            }
        }

        return encodeURIComponent(price_table);
    }

    // Get min amount
    function getMinAmount() {

        var min_amount = 1;

        var list_amount = document.getElementById("mod-detail-price");
        if(list_amount == null) {
            return min_amount;
        }

        var span_amount = list_amount.getElementsByTagName("span");
        if( span_amount == null ) {
            return min_amount;
        }

        var str = span_amount[0].textContent;

        // Find range of amount
        if(str.indexOf('-') != -1) {
            return str.split('-')[0];
        }
        // Less than
        if(str.indexOf('<') != -1) {
            return min_amount;
        }
        // Greater than
        if(str.indexOf('>') != -1) {
            return str.split('>')[1];
        }
        if(str.indexOf('≥') != -1) {
            return str.split('≥')[1];
        }
        return min_amount;
    }

    // Get price by item amout
    function getPrice(quantity) {

        quantity = parseInt(quantity);

        var price = 0;
        var span_price = document.getElementsByClassName('mod-detail-price-sku');
        if(span_price != null) {
            span_price = span_price[0];
        }
        // Một mức giá
        if(span_price != null)
        {
            //price=span_price.textContent;
            var e_num = document.getElementsByClassName('mod-detail-price-sku')[0].getElementsByTagName('span')[2].textContent;
            var p_num = document.getElementsByClassName('mod-detail-price-sku')[0].getElementsByTagName('span')[3].textContent;
            price = e_num + p_num;
            return processPrice(price);
        }

        // Nhiều mức giá
        var div_prices = document.getElementById("mod-detail-price");

        if(div_prices == null) {
            return processPrice(price);
        }

        var span_prices = div_prices.getElementsByTagName("span");
        if(span_prices == null) {
            return processPrice(price);
        }

        // Duyệt qua các mức giá
        var quan_compare = '';
        for (var i = 0; i < span_prices.length; i++) {
            var str = span_prices[i].textContent;
            if((str.indexOf('-')!=-1) || (str.indexOf('≥') != -1))
            {
                if(str.indexOf('-')!=-1)
                {
                    quan_compare = str.split('-');
                    price = span_prices[i+1].textContent + '' + span_prices[i+2].textContent;
                    if(quantity >= quan_compare[0] & quantity <= quan_compare[1]) {
                        break;
                    }
                }
                if(str.indexOf('≥')!=-1)
                {
                    price = span_prices[i+1].textContent + '' + span_prices[i+2].textContent;
                }
            }
        }
        return processPrice(price);
    }

    // Seller id
    function getSellerId() {
        var seller_id = '';
        try{
            var element = document.getElementsByName("sellerId");
            if(element.length > 0)
            {
                element     = element[0];
                seller_id   = element.value;
            } else {
                // New 24/4/2013
                element = document.getElementsByClassName('contact-div');
                if(element.length > 0) {
                    seller_id = element[0].getElementsByTagName('a')[0].innerHTML;
                }else{
                    element = document.getElementById('dsr-userid');
                    seller_id = element.value;
                }
            }
        } catch(e) {
            console.log('Không l\u1ea5y được thông tin người bán!');
        }

        return encodeURIComponent(seller_id);
    }

    // Item id
    function getItemId() {
        /*
         var elements =document.getElementsByName("offerId");

         var item_id=0;
         if(elements.length > 0) {
         for(var i=0;i<elements.length;i++) {
         element=elements[i];
         if(element.value!="")
         item_id=element.value;
         }
         } else {
         // New 24/4/2013
         item_id = document.getElementById('feedbackInfoId');
         if(item_id != null) {
         item_id = item_id.value;
         } else {
         item_id = 0;
         }
         }

         if(item_id == 0) {
         console.log('Không tìm th\u1ea5y ID sản phẩm!');
         }
         */
        var item_id = window.location.href.match(/[0-9]+/g);
        if(item_id.length > 1) {
            item_id = item_id[1];
        }

        return item_id;
    }

    // Item title
    function getItemTitle() {
        var element =document.getElementsByName("offerTitle");
        var item_title = '';
        if(element.length > 0) {
            element = element[0];
            item_title = element.value;
        } else {
            // New 24/4/2013
            if(document.getElementById('mod-detail-hd') != null) {
                item_title = document.getElementById('mod-detail-hd').getElementsByTagName('h1')[0].innerHTML;
            } else {
                item_title ='';
            }
        }

        return encodeURIComponent(item_title);
    }

    // Item image
    function getItemImage() {
        var main_image =document.getElementsByClassName("mod-detail-gallery");
        var item_image = '';
        if(main_image != null)
        {
            var img_obj = main_image[0].getElementsByTagName("img");
            if(img_obj.length > 1) {
                item_image = img_obj[1].getAttribute('src');
            } else {
                item_image = img_obj[0].getAttribute('src');
            }
        }
        return encodeURIComponent(item_image);
    }

    // Item link
    function getItemLink() {
        return encodeURIComponent(window.location.href);
    }

    // VN Price
    function getVNDPrice(price_taobao) {
        var rate=rateMoney();
        var price_result = roundNumber(price_taobao * rate,2);
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (_int) {
            return _int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
        });

        return price_result;
    }

    // Post data to cart
    // Url: url posted
    // item_data: data of item (amount, min_amount, size, color)
    function xmlhttpPost(strURL, item_data, pos) {
        var self = this;
        // Mozilla/Safari
        if (window.XMLHttpRequest) {
            self.xmlHttpReq = new XMLHttpRequest();
        }
        // IE
        else if (window.ActiveXObject) {
            self.xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
        }

        document.getElementById("block_button_zelus").innerHTML
            = '<img style="margin-top:12px;margin-right:50px" src="http://orderhang.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        console.log('Lưu sản phẩm thành công!');
                    else console.log(self.xmlHttpReq.responseText);
                } else {
                    updatepage(self.xmlHttpReq.responseText);
                }
                document.getElementById("block_button_zelus").innerHTML = beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
                document.getElementById("id_orderhang_save_item").addEventListener('click', linkSave);
            }
        }
        // Send data
        self.xmlHttpReq.send(getLink(item_data, pos));
    }

    function updatepage(str){
        //console.log(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
    }

    /**
     * Lấy dữ liệu send
     * return Array 2 chiều
     *  result[i][0] = 0; //'amount'
     result[i][1] = 0; //'min_amount'
     result[i][2] = 0; //'size'
     result[i][3] = 0; //'color'
     result[i][4] = 0; //'price'
     * data gồm amount, color, size, min_amount
     **/
    function get_item_data() {

        var result = new Array();
        var input_data = new Array();
        var i = 0;
        var parent_obj = null;

        try {
            // Multi buy
            var tbl_wrap = document.getElementsByClassName('content-wrapper');
            var content = null;
            if(tbl_wrap.length > 0) {
                content = tbl_wrap[0].getElementsByClassName('content');
            }
            if(content != null) { // New 22/5/2013
                content = content[0];
                input_data = content.getElementsByClassName('amount-input'); // Get số lượng đặt
                if(input_data.length > 0) {

                    i = 0;
                    /**
                     * Có class 'leading': màu sắc nằm trong class leading
                     * danh sách phía dưới là kích thước
                     * Nếu không có class 'leading', không có kích thước, chỉ có màu sắc
                     */
                    var color = tbl_wrap[0].getElementsByClassName('leading');
                    if(color.length > 0) { // Has color, and size
                        color = color[0].getElementsByClassName('selected')[0].getAttribute('title').replace(/\n+/, '').replace(/\s+/, '');
                        for(var inc in input_data) {
                            if(isNaN(input_data[inc].value) || input_data[inc].value == 0) {
                                continue;
                            }
                            parent_obj = input_data[inc].parentNode.parentNode.parentNode.parentNode; // Find tr node
                            result[i] = new Array();
                            // Add data to arrayn
                            result[i][0] = input_data[inc].value;
                            result[i][1] = parent_obj.getElementsByClassName('count')[0].getElementsByTagName('span')[0].textContent.replace(/\s+/, "");
                            result[i][2] = color == "" ? "" : parent_obj.getElementsByClassName('name')[0].getElementsByTagName('span')[0].textContent.replace(/\s+/, '').replace(/\n+/, '');
                            result[i][3] = color == "" ? parent_obj.getElementsByClassName('name')[0].getElementsByTagName('span')[0].textContent.replace(/\s+/, '').replace(/\n+/, '') : color;
                            result[i][4] = parent_obj.getElementsByClassName('price')[0].getElementsByTagName('em')[0].textContent.replace(/\s+/, "");
                            i++;
                        }
                    } else { // Có màu sắc, ko có size
                        for(var inc in input_data) {
                            if(isNaN(input_data[inc].value) || input_data[inc].value == 0) {
                                continue;
                            }
                            parent_obj = input_data[inc].parentNode.parentNode.parentNode.parentNode; // Find tr node
                            result[i] = new Array();
                            // Add data to arrayn
                            result[i][0] = input_data[inc].value;
                            result[i][1] = parent_obj.getElementsByClassName('count')[0].getElementsByTagName('span')[0].textContent.replace(/\s+/, "");
                            result[i][2] = "";

                            var span_color  = parent_obj.getElementsByClassName('name')[0].getElementsByTagName('span');
                            var img_color   = parent_obj.getElementsByClassName('name')[0].getElementsByClassName('image');
                            result[i][3] = img_color.length > 0 ?
                                (img_color[0].getAttribute('title'))
                                :
                                span_color[0].textContent.replace(/\s+/, '').replace(/\n+/, '');
                            result[i][4] = parent_obj.getElementsByClassName('price')[0].getElementsByTagName('em')[0].textContent.replace(/\s+/, "");
                            i++;
                        }
                    }

                }
                console.log('Multi input')
            } else {
                // Buy one by one
                result[0] = new Array();
                result[0][0] = (document.getElementById('J_AmountInput') != null ? document.getElementById('J_AmountInput').value :
                    document.getElementsByClassName('amount-input')[0].value);
                result[0][1] = 9999;
                result[0][2] = '';
                result[0][3] = '';
                result[0][4] = '';
                console.log(result);
            }
        } catch(e) {
            console.log("Error mesage: " + e);
        }
        return result;
    }

    // Get link
    /**
     * item_data: Array
     * keys: amount, color, size
     */
    function getLink( item_data, pos ) {

        // Số thự tự lần gửi request
        if(pos == null) {
            pos = 1;
        }
        //lấy item_id
        var item_id     = getItemId();
        //lấy item_title
        var item_title  = getItemTitle();
        //lấy item_image
        var item_image  = getItemImage();
        //lấy item_link
        var item_link   = getItemLink();
        //lấy seller_id	
        var seller_id   = getSellerId();
        var seller_name = seller_id;
        //lay comment
        var comment     = getComment();
        //lay ban gia
        var price_table = getPriceTable();

        // lay gia
        var item_price = getPrice(item_data[0]);
        // Multi buy
        var tbl_wrap = document.getElementsByClassName('content-wrapper');
        if(tbl_wrap.length > 0) {
            if(tbl_wrap[0].getElementsByClassName('content').length > 0) {
                item_price = item_data[4];
            }
        }
        /*
         var price_distance = document.getElementById('mod-detail-price-sku');
         if(price_distance != null) {
         var price_content = price_distance.textContent;
         if(price_content.indexOf('-') != -1) {
         item_price  = item_data['price'];
         } else {
         item_price    = getPrice(item_data[4]);
         }
         } else {
         item_price    = getPrice(item_data[4]);
         }
         */

        var params = 'type=alibaba';
        if(parseInt(item_id) >0 ) params += '&item_id=' + item_id;
        if(item_title != '') params += '&item_title=' + item_title;
        if(item_image != '') params += '&item_image=' + item_image;
        if(comment != '') params += '&comment=' + comment;
        if(item_link != '') params += '&item_link=' + item_link;
        if(item_price > 0) params += '&item_price=' + item_price;
        if(price_table != '') params += '&price_table=' + price_table;
        if(seller_id.length > 0) {
            params+='&seller_id='+seller_id;
        }
        if(seller_name.length > 0) {
            params+='&seller_name=' + seller_name;
        }

        if(parseInt(item_data[0]) > 0)
            params += '&quantity=' + item_data[0];
        delete item_data[0];

        if(parseInt(item_data[1]) > 0)
            params += '&min=' + item_data[1];
        delete item_data[1];

        // Lay color_size_name
        if(item_data[2] != "") {
            params += '&size=' + item_data[2];
        }
        if(item_data[3] != "") {
            params += '&color=' + encodeURIComponent(item_data[3]);
        }
        var color_size_name = item_data[3] + ";" + item_data[2];
        if(color_size_name != '')
            params += '&color_size_name=' + encodeURIComponent(color_size_name);

        // Number post send
        params += '&pos=' + pos;
        params += '&length_pos=' + get_item_data().length;
        return addVersion(params);
    }

    // Click event
    function linkClick() {
        var data = get_item_data();
        var min_amount = getMinAmount();

        if(data.length == 0) {
            console.log('Bạn chưa chọn sản phẩm nào!');
            return;
        }
        for(var o in data) {
            try {
                if(data[0]['amount'] == 0) {
                    console.log('Bạn chưa chọn số lượng');
                    return;
                }
                // Check min amount bought
                if(parseInt(data[0]['amount']) < parseInt(min_amount)) {
                    console.log('Số lượng tối thiểu không đủ!');
                    continue;
                }
                xmlhttpPost(cart_url, data[o], parseInt(o) + 1);
            } catch (e) {
                console.log('Error has found: ' + e);
            }
        }
    }

    // Save data
    function linkSave() {
        var full = true;
        //validate số lượng
        var stocks=document.getElementsByClassName('d-sku');
        var stocks_amount=stocks.length;
        //so luong nho nhat dc phep mua
        var min=getAllowedMinQuantity();
        //so luong kh nhap
        var quantity=getQuantity();

        if(stocks_amount>0)
        {
            var buyArea=document.getElementsByClassName("d-sku-box");
            buyArea=buyArea[0];

            var selects = buyArea.getElementsByClassName('d-selected');
            if(selects.length!=stocks_amount)
            {
                full=false;
            }
        }

        if(full==false)
        {
            console.log("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            document.getElementById("id_orderhang_save_item").setAttribute('href','javascript:void(0);');
            return ;
        }
        var min_quantity=document.getElementById("min_quantity").value;
        if(parseInt(min_quantity)>0 && parseInt(min_quantity)>parseInt(quantity))
        {
            console.log("Số lượng sản phẩm không được bé hơn "+min_quantity+"!");
            document.getElementById("id_orderhang_save_item").setAttribute('href','javascript:void(0);');
            return ;
        }

        if(parseInt(quantity)%parseInt(min_quantity)!=0)
        {
            console.log("Số lượng sản phẩm phải là bội số của "+min_quantity+"!");
            document.getElementById("id_orderhang_save_item").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_orderhang_save_item").setAttribute('href','javascript:void(0)');

        document.getElementById("id_orderhang_save_item").setAttribute('target',"");

        xmlhttpPost(url_save);
    }

    // Load data
    this.htmlOnLoad=function ()
    {
        update_html();
    };

    // Load able
    var loaded = false;
    var loaded_time = 0; // Max 20
    var loaded_max = 2;

    function html_load() {
        loaded_time ++;
        if(loaded_time > loaded_max || loaded) {
            update_html();
        } else {
            setTimeout(html_load, 1000);
        }
    }

    function update_html() {

        // No translate by google chrome
        try {
            var tbl_price = document.getElementById('mod-detail-price');
            if(tbl_price != null) {
                tbl_price.className = tbl_price.className + ' notranslate';
            } else {
                // One price
                var price_primary = document.getElementById('mod-detail-price-sku');
                price_primary.className = price_primary.className + ' notranslate';
            }
            var tbl_pros = document.getElementsByClassName('table-con');
            if(tbl_pros.length != 0) {
                tbl_pros[0].className = tbl_pros[0].className + ' notranslate';
            }
        } catch(e) {}
        // ----------

        var src = 'http://zelus.com/zelus_order.gif';

        var price = getPrice(1);
        var price_result = getVNDPrice(price);

        var s = '<div class="g-group-member" style="height: 150px; border: 2px solid blue;padding-top:10px">'
            + '	<div style="font-weight:bold;color: blue; font-size: 24px;margin-bottom:10px;margin-left:41px" id="hangnhap-price"><span style="font-weight: normal;">Giá tạm tính:</span> '+(price_result)+' VNĐ</div>'
            + '	<div>'
            + '		<span style="width:50px;">Mô tả：</span><textarea cols="64" id="txtBz" name="txtBz"></textarea>'
            + '	</div>'
            + '	<div class="clr" style="width:100%;float:right">'
            + '		<div>'
            + '			<span style="float:left;margin-left:41px" id="block_button_zelus">'
            + '				<a id="id_zelus_add_cart" href="javascript:;">'
            + '					<img src="' + src + '" alt="" />'
            + '				</a>'
            +	'			</span>'
            + '			<span style="float:right;margin-right:40px;margin-top:10px">[<a id="id_zelus_save_item" href="javascript:;">Lưu lại đặt hàng sau</a>]</span>'
            + '		</div>'
            + '	</div>'
            + '</div>';

        var div = document.createElement('div');
        div.innerHTML = s;
        div.style.clear = 'both';
        if(document.getElementsByClassName('d-property').length > 0) {
            document.getElementsByClassName('d-property')[0].insertBefore(div, document.getElementsByClassName('d-property')[0].lastChild);
        }
        if(document.getElementsByClassName('obj-order').length > 0) {
            document.getElementsByClassName('obj-order')[0].style.paddingLeft = '0';
            document.getElementsByClassName('obj-order')[0].insertBefore(div, document.getElementsByClassName('obj-order')[0].lastChild);
        }
        if(document.getElementsByClassName('table-wrap').length > 0) {
            document.getElementsByClassName('table-wrap')[0].style.paddingLeft = '0';
            document.getElementsByClassName('table-wrap')[0].insertBefore(div, document.getElementsByClassName('table-wrap')[0].lastChild);
        }
        // Single price
        if(document.getElementsByClassName('region-detail-property').length > 0) {
            document.getElementsByClassName('region-detail-property')[0].style.paddingLeft = '0';
            document.getElementsByClassName('region-detail-property')[0].insertBefore(div,
                document.getElementsByClassName('region-detail-property')[0].lastChild);
        }

        if(document.getElementById("id_zelus_add_cart") != null) {
            document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
            beforeHtml = document.getElementById("block_button_zelus").innerHTML;
        }

    }
}

function paipai(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
    }
    //ham lay thong tin color_size_name
    function getColorSizeName()
    {
        var stocks=document.getElementById("buyArea").getElementsByClassName('stock');
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
        var element =document.getElementsByName("dsr-userid");
        if(element.length>0)
        {
            element=element[0];
            var seller_id=element.value;
        } else{
            element = document.getElementById('sellerUin');
            var seller_id = element.value;
        }

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
        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        console.log('Lưu sản phẩm thành công!');
                    else console.log(self.xmlHttpReq.responseText);
                }else
                    updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
                document.getElementById("id_zelus_save_item").addEventListener('click', linkSave);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        var comment=getComment();

        var item_price=price_taobao;

        //lấy seller_id	
        var seller_id=getSellerId();
        var seller_name = seller_id;
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();
        var full=true;
        //validate số lượng
        var stocks=document.getElementsByClassName('stock');
        var stocks_amount=stocks.length;

        var buyArea=document.getElementById("buyArea");

        if(stocks_amount>0)
        {
            var selects = buyArea.getElementsByClassName('select');
            if(selects.length!=stocks_amount)
            {
                full=false;
            }
        }

        if(full==false)
        {
            console.log("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

        xmlhttpPost(cart_url);
    }
    function linkSave()
    {
        var href=getLink();
        var full=true;
        //validate số lượng
        var stocks=document.getElementsByClassName('stock');
        var stocks_amount=stocks.length;

        var buyArea=document.getElementById("buyArea");

        if(stocks_amount>0)
        {
            var selects = buyArea.getElementsByClassName('select');
            if(selects.length!=stocks_amount)
            {
                full=false;
            }
        }

        if(full==false)
        {
            console.log("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            document.getElementById("id_zelus_save_item").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_save_item").setAttribute('href','javascript:void(0)');

        xmlhttpPost(url_save);
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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);
        var com_text='<div><span style="width:50px;">Mô tả：</span><textarea cols="62" id="txtBz" name="txtBz"></textarea></div>';
        var price_text='<div style="font-weight:bold;color: blue; font-size: 24px;margin-left:44px" id="hangnhap-price">'+(price_result)+' VNĐ</div>';
        var save_text='<span style="float:right;margin-right:40px;margin-top:10px">[<a id="id_zelus_save_item" href="'+href+'">Lưu lại đặt hàng sau</a>]</span>';

        var s = '<div class="g-group-member" style="height: 150px; border: 2px solid blue;padding-top:10px">'+price_text+com_text+'<div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:left;margin-left:44px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img src="' + src + '" alt="" /></a></span>&nbsp; '+save_text+'</div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        document.getElementById('buyArea').parentNode.insertBefore( div.firstChild , document.getElementById('buyArea') );
        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
        document.getElementById("id_zelus_save_item").addEventListener( 'click', linkSave);
    };
}
function mofayichu(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        console.log('Lưu sản phẩm thành công!');
                    else console.log(self.xmlHttpReq.responseText);
                }else
                    updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
                document.getElementById("id_zelus_save_item").addEventListener('click', linkSave);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
            params+='&size='+size;
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

        xmlhttpPost(cart_url);
    }
    function linkSave()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_save_item").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_save_item").setAttribute('href','javascript:void(0)');

        xmlhttpPost(url_save);
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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var price_text='<div style="font-weight:bold;color: blue; font-size: 17px;margin-bottom:10px" id="hangnhap-price">'+(price_result)+' VNĐ</div>';
        var save_text='<div style="float:right;margin-top:9px">[<a id="id_zelus_save_item" href="'+href+'">Lưu sản phẩm</a>]</div>';

        var s = '<div class="g-group-member" style="height: 70px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">'+price_text;
        s +='<div><div style="float:left" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></div>&nbsp;'+save_text+'</div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "2");
        row.appendChild(td);

        if(document.getElementById('Tr3')==null) return false;
        document.getElementById('Tr3').parentNode.appendChild( row);
        //document.getElementById('Tr3').parentNode.insertBefore( '<tr><td colspan="2">'+div.firstChild +'</td></tr>', document.getElementById('Tr3') );
        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
        document.getElementById("id_zelus_save_item").addEventListener( 'click', linkSave);
    };
}

function _5taobao(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        return encodeURIComponent(document.getElementById("txt_bz").value);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        console.log('Lưu sản phẩm thành công!');
                    else console.log(self.xmlHttpReq.responseText);
                }else
                    updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
                document.getElementById("id_zelus_save_item").addEventListener('click', linkSave);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

        xmlhttpPost(cart_url);
    }
    function linkSave()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_save_item").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_save_item").setAttribute('href','javascript:void(0)');

        xmlhttpPost(url_save);
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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        /*var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
         s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

         s +='</div></div>';*/
        var price_text='<div style="font-weight:bold;color: blue; font-size: 17px;margin-bottom:10px" id="hangnhap-price">'+(price_result)+' VNĐ</div>';
        var save_text='<div style="float:right;margin-top:9px">[<a id="id_zelus_save_item" href="'+href+'">Lưu sản phẩm</a>]</div>';

        var s = '<div class="g-group-member" style="height: 70px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">'+price_text;
        s +='<div><div style="float:left" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></div>&nbsp;'+save_text+'</div>';

        s +='</div></div>';

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

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
        document.getElementById("id_zelus_save_item").addEventListener( 'click', linkSave);
    };
}

function chenxifushi(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        return encodeURIComponent(document.getElementById("txtBz").value);
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
        var element = document.getElementById("img_tp");

        if(element!=null)
        {
            //	element=element[1];
            var item_image=element.getAttribute('src');
        }else var item_image='';

        return encodeURIComponent('http://www.chenxifushi.com/'+item_image);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                if(strURL.indexOf('item_collect')!=-1)
                {
                    //luu san pham
                    if(self.xmlHttpReq.responseText=='OK')
                        console.log('Lưu sản phẩm thành công!');
                    else console.log(self.xmlHttpReq.responseText);
                }else
                    updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
                document.getElementById("id_zelus_save_item").addEventListener('click', linkSave);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

        xmlhttpPost(cart_url);
    }
    function linkSave()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_save_item").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_save_item").setAttribute('href','javascript:void(0)');

        xmlhttpPost(url_save);
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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        /*var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
         s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

         s +='</div></div>';*/
        var price_text='<div style="font-weight:bold;color: blue; font-size: 17px;margin-bottom:10px" id="hangnhap-price">'+(price_result)+' VNĐ</div>';
        var save_text='<div style="float:right;margin-top:9px">[<a id="id_zelus_save_item" href="'+href+'">Lưu sản phẩm</a>]</div>';

        var s = '<div class="g-group-member" style="height: 70px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">'+price_text;
        s +='<div><div style="float:left" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></div>&nbsp;'+save_text+'</div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);

        document.getElementById('Tr3').parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
        document.getElementById("id_zelus_save_item").addEventListener( 'click', linkSave);
    };
}

function lelefushi(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        return encodeURIComponent(document.getElementById("txt_bz").value);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        //td.setAttribute("colspan", "2");
        row.appendChild(td);

        document.getElementById('Product_main1_Product_top11_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function yilanfushi(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);

        document.getElementById('Tr3').parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function shmoyu(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        return encodeURIComponent(document.getElementById("txtBz").value);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);

        document.getElementById('Tr3').parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function yiranmeifushi(cart_url,url_save) {
    function additionPrice() {
        return 0;
    }
    function rateMoney() {
        return 3550;
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
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover() {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick() {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function () {
        //var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';
        var price_taobao = getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div class="g-group-member" style="height: 94px; border: 2px solid blue;">'
            + '<div><span style="width:10%;">Mô tả：</span><textarea style="width: 90%;" id="txtBz" name="txtBz"></textarea></div>'
            + '<div class="clr" style="width:100%;float:right">'
            + '		<div>'
            + '			<span style="float:right;margin-top:2px" id="block_button_zelus">'
            + '				<a id="id_zelus_add_cart" href="javascript:;"><img width="200" height="30" src="' + src + '" alt=""/></a>'
            + '			</span>'
            + '			<span style="font-weight:bold;color:blue;font-size:17px;float:left;margin-top:10px" id="hangnhap-price">'
            + 				(price_result) +' VNĐ'
            + '			</span>'
            + '		</div>'
            + '</div></div>';

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

            document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
            document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
        }
        catch(e) {
            console.log('Không tìm thấy phần tử trên trang.' + e);
        }
    };
}

function yiwenfushi(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);

        document.getElementById('Tr3').parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function rihanfushi(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        return encodeURIComponent(document.getElementById("txt_bz").value);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }
        if(document.getElementsByClassName("tx2").length>0 && document.getElementsByClassName("tx").length==0)
        {
            console.log("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }
        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        //td.setAttribute("colspan", "2");
        row.appendChild(td);

        document.getElementById('Product_main1_Product_top11_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function chengzifs(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        return encodeURIComponent(document.getElementById("txt_bz").value);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }
        if(document.getElementsByClassName("tx2").length>0 && document.getElementsByClassName("tx").length==0)
        {
            console.log("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        //td.setAttribute("colspan", "2");
        row.appendChild(td);

        document.getElementById('Product_main1_Product_top11_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function _69shopfs(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        return encodeURIComponent(document.getElementById("txtBz").value);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();

        var price_result = getVNDPrice(price_taobao);

        if(parseInt(price_result)==0)
            return ;

        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);

        document.getElementById('Tr3').parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function fuzhuangpifa(cart_url, url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
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
        var list = null;
        var item_title = '';
        if(frm!=null)
        {
            if(host.indexOf('fuzhuangpifa')!=-1) {
                list = frm.getElementsByTagName('h2');
            } else {
                list = frm.getElementsByTagName('h3');
            }

            item_title = list[0].textContent;

        }else item_title = '';

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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
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
            console.log("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }
        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);
        var com_text='<div><span style="width:20px;margin-right:40px">Mô tả：</span><textarea cols="35" id="txtBz" name="txtBz"></textarea></div>';
        var s = '<div class="g-group-member" style="height: 100px; border: 2px solid blue;">'+com_text+'<div style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        document.getElementsByClassName('goods_xz')[0].appendChild( div);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function jj_fashion() {

    this.htmlOnLoad=function ()
    {
        var product_id = document.getElementsByClassName('good_shux')[0].getElementsByTagName('li')[0].innerHTML;
        var s = '<div style="border: 2px solid blue; height: 50px; margin-top: 2px; padding: 5px;">'
            + '      <h2>'
            + '          <a href="http://www.fuzhuangpifa.cn/search_gj.php?sr_9=' + product_id.match(/[0-9]+/g) + '" target="_blank" style="color: #333;">Mua trên fuzhuangpifa.cn sp này</a>'
            + '          <br/><a href="http://zelus.vn" title="trang chủ" target="_blank" style="color: blue !important; float: right; font-size: 13px; position: relative; top: 10px;">'
            + '              zelus.vn'
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
    function rateMoney()
    {
        return 3550;
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
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);

        document.getElementById('Tr3').parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function eeshow(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        return encodeURIComponent(document.getElementById("txt_bz").value);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        //td.setAttribute("colspan", "4");
        row.appendChild(td);

        //document.getElementById('Tr3').parentNode.appendChild( row);
        document.getElementById('Product_main1_Product_top11_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function charm_dress(cart_url,url_save) {
    function additionPrice()
    {
        return 0;
    }
    function rateMoney()
    {
        return 3550;
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
        return encodeURIComponent(document.getElementById("txtBz").value);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover()
    {
        var href=getLink();
        document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick()
    {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();

        if(parseInt(quantity)==0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

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
        var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';

        var price_taobao=getPrice();
        var price_result = getVNDPrice(price_taobao);
        if(parseInt(price_result)==0)
            return ;

        var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
        s +='<div><span style="float:right;margin-top:2px" id="block_button_zelus"><a id="id_zelus_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

        s +='</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        var row = document.createElement("TR");
        var td = document.createElement("TD");
        td.innerHTML=s ;
        td.setAttribute("colspan", "4");
        row.appendChild(td);

        document.getElementById('Tr3').parentNode.appendChild( row);

        document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
        document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
    };
}

function baobaopifa(cart_url,url_save) {
    function additionPrice() {
        return 0;
    }
    function rateMoney() {
        return 3550;
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
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover() {
        //var href=getLink();
        //document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick() {
        var href=getLink();

        //validate số lượng
        var quantity=getQuantity();
        if(parseInt(quantity) == 0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function () {
        //var href=getLink();

        var src = 'http://zelus.com/zelus_order.gif';
        var price_taobao = getPrice();
        var price_result = getVNDPrice(price_taobao);

        var s = '<div class="g-group-member" style="height: 100px; border: 2px solid blue;">'
            + '<div><span style="width:10%;">Mô tả：</span><textarea style="width: 83%;" id="txtBz" name="txtBz"></textarea></div>'
            + '<div class="clr" style="width:100%;float:right">'
            + '		<div>'
            + '			<span style="float:right;margin-top:2px" id="block_button_zelus">'
            + '				<a id="id_zelus_add_cart" href="javascript:;"><img width="160" height="30" src="' + src + '" alt=""/></a>'
            + '			</span>'
            + '			<span style="font-weight:bold;color:blue;font-size:17px;float:left;margin-top:10px" id="hangnhap-price">'
            + 				(price_result) +' VNĐ'
            + '			</span>'
            + '		</div>'
            + '</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

        try {
            insertAfter(div, document.getElementsByName('productnum')[0]);
            document.getElementById('RItem').style.height = '455px';
            document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
            document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
        }
        catch(e) {
            //console.log('Không tìm thấy phần tử trên trang.' + e);
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
    function rateMoney() {
        return 3550;
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
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
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
            console.log('Không lấy được id sản phẩm. ' + e);
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
            //console.log(e);
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
            /*console.log(e);*/
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
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
        return addVersion(params);
    }
    function linkHover() {
        //var href=getLink();
        //document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick() {
        var href=getLink();

        //validate số lượng
        var quantity = getQuantity();
        if(parseInt(quantity) == 0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function () {
        //var href=getLink();
        try {
            var src = 'http://zelus.com/zelus_order.gif';
            var price_taobao = getPrice();
            var price_result = getVNDPrice(price_taobao);

            var s = '<div class="g-group-member" style="height: 100px; border: 2px solid blue;">'
                + '<div><span style="margin-left:5px;width:10%;">Mô tả：</span><textarea style="width: 83%;" id="txtBz" name="txtBz"></textarea></div>'
                + '<div class="clr" style="width:100%;float:right">'
                + '		<div>'
                + '			<span style="float:right;margin-top:2px" id="block_button_zelus">'
                + '				<a id="id_zelus_add_cart" href="javascript:;"><img width="160" height="30" src="' + src + '" alt=""/></a>'
                + '			</span>'
                + '			<span style="font-weight:bold;color:blue;font-size:17px;float:left;margin-top:10px" id="hangnhap-price">'
                + 				(price_result) +' VNĐ'
                + '			</span>'
                + '		</div>'
                + '</div></div>';

            var div = document.createElement('div');
            div.innerHTML = s;
            div.style.clear = "both";
            div.style.width = "320px";

            try {
                getElementLikeId('GoodsNum')[0].parentNode.parentNode.appendChild(div);
                document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
                document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
            }
            catch(e) {
                //console.log('Không tìm thấy phần tử trên trang.' + e);
            }
        } catch(e) {
            //console.log(e);
        }
    };
}

function _1925(cart_url,url_save) {

    function additionPrice() {
        return 0;
    }
    function rateMoney() {
        return 3550;
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
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
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
            console.log('Không lấy được id sản phẩm. ' + e);
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
            console.log('Title not found.' + e);
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
            console.log('Price not found!' + e);
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
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
        return addVersion(params);
    }
    function linkHover() { }
    function linkClick() {

        //validate số lượng
        var quantity = getQuantity();
        if(parseInt(quantity) == 0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }

        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');

        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function () {
        //var href=getLink();
        try {
            var src = 'http://zelus.com/zelus_order.gif';
            var price_taobao = getPrice();
            var price_result = getVNDPrice(price_taobao);

            var s = '<div class="g-group-member" style="border: 2px solid blue;overflow:auto;">'
                + '<div><span style="margin-left:5px;width:18%;float:left">Mô tả：</span><textarea style="width: 80%;" id="txtBz" name="txtBz"></textarea></div>'
                + '<div class="clr" style="width:100%;float:right">'
                + '		<div>'
                + '			<span style="float:right;margin-top:2px" id="block_button_zelus">'
                + '				<a id="id_zelus_add_cart" href="javascript:;"><img width="160" height="30" src="' + src + '" alt=""/></a>'
                + '			</span>'
                + '			<span style="font-weight:bold;color:blue;font-size:17px;float:left;margin-top:10px" id="hangnhap-price">'
                + 				(price_result) +' VNĐ'
                + '			</span>'
                + '		</div>'
                + '</div></div>';

            var div = document.createElement('div');
            div.innerHTML = s;

            try {
                document.getElementById('Table6').parentNode.appendChild(div);
                document.getElementById("id_zelus_add_cart").addEventListener( 'mouseover', linkHover);
                document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
            }
            catch(e) { }
        } catch(e) { }
    };
}

function hongwufushi(cart_url) {

    var element_found = document.getElementsByClassName('zjj2');
    var tbl_data = element_found[0].parentNode.parentNode.parentNode.parentNode.parentNode;
    var img_data = tbl_data.getElementsByTagName('td');
    var content_data = element_found[0].parentNode;

    function getElementLikeId(txt) {
        var matches = [];
        var elems = document.getElementsByTagName("*");
        for (var i=0; i<elems.length; i++) {
            if (elems[i].id.indexOf(txt) == 0)
                matches.push(elems[i]);
        }
        return matches;
    }
    function rateMoney() {
        return 3550;
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
    // Ham lay comment
    function getComment() {
        var comment = document.getElementById("txtBz");
        if(comment != null ) {
            comment = comment.value;
        } else {
            comment = "";
        }
        return encodeURIComponent(comment);
    }
    function getSellerId() {
        return '';
    }
    //ham lay item_id cua san pham
    function getItemId() {
        var item_id = "";
        try {
            item_id = content_data.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('font')[1].innerHTML;
        } catch (e) {
            console.log('Can not get item id. ' + e);
        }
        return item_id.replace(/\s/g, '');
    }

    //ham lay item_title cua san pham
    function getItemTitle() {
        var item_title = '';
        try {
            item_title = content_data.getElementsByTagName('tr')[0].getElementsByTagName('td')[0].getElementsByTagName('font')[0].innerHTML;
        } catch(e) {
            console.log("Can't get item title" . e);
        }

        return encodeURIComponent(item_title.replace(/\s/g, '')); //item_title.replace(/\s/g, '');
    }

    // ham lay item_image cua san pham
    function getItemImage() {
        var item_image = '';
        item_image = img_data[1].getElementsByTagName('img')[0].getAttribute('src');
        return encodeURIComponent("http://" + window.location.hostname + "/" + item_image);
    }
    // ham lay item_link cua san pham
    function getItemLink() {
        return encodeURIComponent(window.location.href);
    }
    // hàm lấy số lượng mua
    function getQuantity() {
        var _quanlity = document.getElementById('zelus_tool_amount').value;
        if(isNaN(_quanlity) || _quanlity < 1) {
            _quanlity = 1;
        }
        return _quanlity;
    }
    // Lấy giá sản phẩm
    function getPrice() {
        var item_price = '';
        // Price retail
        //var retail = content_data.getElementsByTagName('tr')[2].getElementsByTagName('strong')[1].innerHTML;
        // Price wholesale
        var wholesale = content_data.getElementsByTagName('tr')[1].getElementsByTagName('strong')[1].innerHTML;

        item_price = wholesale;
        return item_price.replace(/\s/g, '');
    }

    // Hàm lấy giá VND dựa vào giá TQ
    function getVNDPrice(price_taobao) {
        var rate = rateMoney();
        var price_result = parseInt(price_taobao * rate);
        price_result = String(price_result).replace(/^\d+(?=.|$)/, function (_int) {
            return _int.replace(/(?=(?:\d{3})+$)(?!^)/g, ".");
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

        var beforeHtml= document.getElementById("block_button_zelus").innerHTML;
        document.getElementById("block_button_zelus").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://zelus.com/frontend/images/ajax-loader.gif" alt="" />';
        self.xmlHttpReq.open('POST', strURL, true);
        self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        self.xmlHttpReq.withCredentials = "true";

        self.xmlHttpReq.onreadystatechange = function() {
            if (self.xmlHttpReq.readyState == 4) {
                updatepage(self.xmlHttpReq.responseText);
                document.getElementById("block_button_zelus").innerHTML=beforeHtml;
                document.getElementById("id_zelus_add_cart").addEventListener('click', linkClick);
            }
        }
        //console.log(getLink());
        self.xmlHttpReq.send(getLink());
    }
    function updatepage(str){
        //console.log(str);
        //var dv=document.createElement(str);
        var htmlObject = document.createElement('div');
        htmlObject.innerHTML = str;

        document.body.appendChild(htmlObject);
        //document.getElementById("result").innerHTML = str;
    }
    function getLink() {
        var params='type=hongwufushi';
        try {
            //lấy item_id
            var item_id= getItemId();
            //lấy item_title
            var item_title= getItemTitle();
            //lấy item_image
            var item_image= getItemImage();
            //lấy item_link
            var item_link = getItemLink();
            //lay gia
            var price_taobao = getPrice();
            //lấy comment
            var comment = getComment();
            var item_price=price_taobao;

            //lấy seller_id	
            var seller_id=getSellerId();
            var seller_name = seller_id;
            //lấy số lượng
            var quantity = getQuantity();
            //lấy màu sắc
            var color = getColor();
            // lay color_size_name
            var color_size_name = getColorSizeName();
            //lấy kích thước
            var size = getSize();

            /*if(parseInt(item_id)>0)
             params+='&item_id='+item_id;*/
            params += '&item_id=' + item_id;
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
            // Find weight of item
            var _element_content = element_found[0].textContent.replace(/\s/g, "");
            var _content_length = _element_content.length;
            var _weight = _element_content.substr(_content_length - 8, _content_length)
            _weight = _weight.replace(/[^\d.]/g, '');
            if(_weight != null || _weight != "") {
                params += '&amount=' + _weight;
            }

        } catch(e) {
            console.log("Can't get link daa. " + e);
        }

        return addVersion(params);
    }
    function linkHover() {
        //var href=getLink();
        //document.getElementById("id_zelus_add_cart").setAttribute('href',href);
    }
    function linkClick() {
        //validate số lượng
        var quantity = getQuantity();
        if(parseInt(quantity) == 0)
        {
            console.log("Bạn phải mua ít nhất một sản phẩm!");
            document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0);');
            return ;
        }
        document.getElementById("id_zelus_add_cart").setAttribute('href','javascript:void(0)');
        xmlhttpPost(cart_url);
    }
    function quantityOnBlur() {
        var price_taobao = getPrice();
        var price = getVNDPrice(price_taobao);
        //thay lai text price theo so luong
        document.getElementById('hangnhap-price').innerHTML=price+' VNĐ';
    }
    this.htmlOnLoad = function () {
        try {
            var src = 'http://zelus.com/zelus_order.gif';
            var price_taobao = getPrice();
            var price_result = getVNDPrice(price_taobao);

            var s = '<div class="g-group-member" style="border: 2px solid blue; overflow: auto; font-size: 13px;">'
                + "<div style='margin-bottom: 5px; padding: 5px 2px; border-bottom: 1px solid #CCC;'>Số lượng: <input type='text' id='tool_amount' value='1' style='width: 50px;' /></div>"
                + '<div><span style="margin-left:5px;width:10%;">Mô tả：</span><textarea style="width: 98%; margin: 1%;" id="txtBz" name="txtBz"></textarea></div>'
                + '<div class="clr" style="width:100%;float:right">'
                + '		<div>'
                + '			<span style="float:right;margin-top:2px" id="block_button_zelus">'
                + '				<a id="id_zelus_add_cart" href="javascript:;"><img width="160" height="30" src="' + src + '" alt=""/></a>'
                + '			</span>'
                + '			<span style="font-weight:bold;color:blue;font-size:21px;float:left;margin-top:5px; margin-left: 2px;" id="hangnhap-price">'
                + 				(price_result) +' VNĐ'
                + '			</span>'
                + '		</div>'
                + '</div></div>';

            var div = document.createElement('div');
            div.innerHTML = s;
            div.style.clear = "both";
            div.style.width = "320px";

            try {
                tbl_data.getElementsByTagName('td')[3].getElementsByTagName('table')[0].appendChild(div);
                document.getElementById("id_zelus_add_cart").addEventListener( 'click', linkClick);
            }
            catch(e) {
                console.log("Can't find element on page." + e);
            }
        } catch(e) {
            console.log(e);
        }
    };
}

var host = getHostname();
var ex=null;

// var url = "http://localhost/tp_orderxi/public_html/cart_taobao?";
var url = "http://zelus.vn/cart_taobao?";
// var url = "http://192.168.1.100/checkout/zelus/public_html/cart_taobao?";
// var url = "http://localhost/tp_gm/ajax.php?path=view&fnc=fnc_cart&act=addon_cart"; // Giangminh
var url_save = "http://zelus.vn/item/item_collect_addon?";
// var url_save="http://localhost/abc/public_html/item/item_collect_addon?";
// taobao
if(host.indexOf('taobao')!=-1 || host.indexOf('tmall')!=-1)
{
    ex=new taobao(url,url_save);
}
//alibaba
if(host.indexOf('alibaba')!=-1 || host.indexOf('detail.1688') != -1) {
    ex=new alibaba(url,url_save);
}
//paipai
if(host.indexOf('paipai')!=-1) {
    ex=new paipai(url,url_save);
}
//mofayichu
if(host.indexOf('mofayichu')!=-1) {
    ex=new mofayichu(url,url_save);
}
//5taobao
if(host.indexOf('5taobao')!=-1) {
    ex=new _5taobao(url,url_save);
}
//chenxifushi
if(host.indexOf('chenxifushi')!=-1) {
    ex=new chenxifushi(url,url_save);
}
//lelefushi
if(host.indexOf('lelefushi')!=-1) {
    ex=new lelefushi(url,url_save);
}
//yilanfushi
if(host.indexOf('yilanfushi')!=-1) {
    ex=new yilanfushi(url,url_save);
}
//shmoyu
if(host.indexOf('shmoyu')!=-1) {
    ex=new shmoyu(url,url_save);
}
//yiranmeifushi
if(host.indexOf('yiranmeifushi')!=-1) {
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
// xinshij
if(host.indexOf('hongwufushi')!=-1)
{
    ex=new hongwufushi(url);
}
ex.htmlOnLoad();
//addIframe();
