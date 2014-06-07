// ==UserScript==
// @name                ordersi.net
// @namespace	        http://ordersi.net
// @description	        ordersi - Công cụ đặt hàng trực tuyến
// @include		http://item.taobao.com/*
// @include		http://item.beta.taobao.com/*
// @include		http://auction.taobao.com/*
// @include		http://item.tmall.com/*
// @include		http://detail.tmall.com/*
// @include		http://detailp4p.china.alibaba.com/*
// @include		http://detail.china.alibaba.com/*
// @include		http://auction1.paipai.com/*
// @include		http://mofayichu.com/shop_*Products.aspx*
// @include		http://www.mofayichu.com/shop_*Products.aspx*
// @include		http://mofayichu.q88e.net/shop_*products.aspx*
// @include		http://mofayichu.q88e.net/shop_*Products.aspx*
// @include		http://www.mofayichu.q88e.net/shop_*Products.aspx*
// @include		http://www.5taobao.net/shop_*Products.aspx*
// @include		http://www.5taobao.net/shop_*products.aspx*
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
// @include		http://www.rihanfushi.com/shop_*Products.aspx*
// @include		http://www.chengzifs.com/SHOP_*Products.aspx*
// @include		http://www.chengzifs.com/SHOP_*products.aspx*
// @include		http://www.69shopfs.com/shop_*products.aspx*
// @include		http://www.69shopfs.com/shop_*Products.aspx*
// @include		http://jj-fashion.com/goods*
// @include		http://www.jj-fashion.com/goods*
// @include		http://www.fuzhuangpifa.cn/goods*
// @include		http://shanghai.q88i.net/shop_*products.aspx*
// @include		http://shanghai.q88i.net/shop_*Products.aspx*
// @include		http://www.eeshow.com.cn/shop_*products.aspx*
// @include		http://www.eeshow.com.cn/shop_*Products.aspx*
// @include		http://eeshow.com.cn/shop_*products.aspx*
// @include		http://eeshow.com.cn/shop_*Products.aspx*
// @include		http://eeshow.q88a.net/shop_*products.aspx*
// @include		http://eeshow.q88a.net/shop_*Products.aspx*
// @include		http://www.charm-dress.com/SHOP_*products.aspx*
// @include		http://www.charm-dress.com/SHOP_*Products.aspx*
// @include		http://www.baobaopifa.com/productshopxp.asp*
// ==/UserScript==

//<editor-fold desc="Support Functions">
String.prototype.format = function () {
    var args = arguments;
    var t = this;
    var vars = t.match(/{\d+}/g);
    for (var i = 0; i < vars.length; i++) {
        var v = vars[i];
        var n = parseInt(v.match(/\d+/)[0]);
        if (typeof args[n] == "undefined") {
            continue;
        } else {
            t = t.replace("{" + n + "}", args[n])
        }
    }
    return t;
}
String.prototype.encodedFormat = function () {
    var args = arguments;
    var t = this;
    var vars = t.match(/{\d+}/g);
    for (var i = 0; i < vars.length; i++) {
        var v = vars[i];
        var n = parseInt(v.match(/\d+/)[0]);
        if (typeof args[n] == "undefined") {
            t = t.replace("{" + n + "}","");
        } else {
            t = t.replace("{" + n + "}", encodeURIComponent(args[n]));
        }
    }
    return t;
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
    iframe.src = 'http://nhaphang.com';
    document.body.appendChild(iframe);
}
function addVersion(url) {
    return url + '&version=18052012';
}
function roundNumber(num, dec) {
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}
function processPrice(price) {
    if(typeof price!="string"){
		
		price = new String(price);
	}
	if(price.charAt(0)=="¥"){
		price = price.substr(1);
	}
    if (price.indexOf(',') > 0) {
        var p = String(price).replace('.', '');
        p = p.replace(',', '.');
        return parseFloat(p);
    }
    else
        return parseFloat(price);
}
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
function rateMoney() {
    return 3500;
}
function getVNDPrice(price_taobao){
    var rate=rateMoney();
    var price_result = roundNumber(price_taobao * rate,2);
    price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });

    return price_result;
}
function Result(r, m) {
    /**
     * Result class
     * @type r boolean
     * @type m string
     */
    this.r = r
    this.m = m;
    this.a = function () {
        alert(this.m);
    };
}
function ajaxJSONResult(data){
    if(typeof data=="undefined")return null
    if(typeof data=="object") return data;
    eval("var tmp="+data);
    return tmp;
}

//</editor-fold>

var Settings = {
    cart_url: "http://ordersi.net/Cart/Add?",
    cart_view_url: "http://ordersi.net/Cart",
    interativeArea: $("<div id='ordersi-message' style='font-size: 12px;font-weight:bold;color: #0DA300;display: block;clear: both;'></div>"),
    priceArea: $('<div style=" font-size: 14px; margin-bottom: 5px;" ><span style="width:60px; float:left;">Giá：</span><b style="color:#F00;" id="hangnhap-price">0 VNĐ</b></div>'),
    Result:{
        notFillProps:new Result(false,"Bạn chưa chọn đủ thuộc tính của sản phẩm"),
        quantity:{
            below1:new Result(false,"Số lượng không thể bé hơn 1")
        }
    },
    account:{
        user:"Vincent",
        password:"viet3010"
    },
    currentMerchant:null
}
var Sys = {
    currentVersion: 1.84,
    currentMerchant: null,
    currentPrice: null,
    updatePrice: function () {
        Sys.currentPrice = Sys.currentMerchant.getTextPrice();
        Settings.priceArea.html('<span style="width:60px; float:left;">Giá：</span><b style="font-size: 16px; color:#F00;" id="hangnhap-price">' + getVNDPrice(Sys.currentPrice) + ' VNĐ</b>');
    },
    message: function (msg, time) {
        //alert(msg);
        var d = Settings.interativeArea;
        d.stop().hide();
        var timeId = new String(new Date().getTime());
        d.attr("data-time", timeId);
        d.html(msg);
        d.stop().fadeIn(400);
        if (time != -1) {
            setTimeout(function () {
                if (d.attr("data-time") == timeId) {
                    d.stop().fadeOut(200, function () {
                        d.html("");
                        d.show();
                    });
                }
            }, time)
        }
    },
    _disable: false,
    disable: function (d, key) {
        Sys._disable = d;
        if (typeof key == "undefined") {
            key = "";
        }
        if (d) {
            var parent = $("#ordersiarea");
            var d_layer = $("<div id='ordersi-block-layer_" + key + "'></div>");
            d_layer.css({
                position: "absolute",
                width: parent.width(),
                height: parent.height(),
                top: "0",
                left: "0",
                zIndex: "9999",
                backgroundColor: "grey",
                opacity: "0.5"
            })
            parent.append(d_layer);
        } else {
            $("#ordersi-block-layer_" + key + "").remove();
        }
    },
    getLoginPrice: function (priceEQuery) {
        if ($("a:contains('登录')")[0]) {
            $.ajax({
                url: $("a:contains('登录')")[0].href,
                type: "POST",
                data: "username=" + Settings.account.user + "&password=" + Settings.account.password,
                success: function (data) {
                    if (data.indexOf("您的用户名或密码有误!") != -1) {//login fail

                    } else {
                        $.ajax({
                            url: window.location,
                            success: function (html) {
                                var j = $(html);
                                if (j.find(priceEQuery).length > 0) {
                                    $(priceEQuery).html(j.find(priceEQuery).html());
                                    Sys.updatePrice();
                                } else {

                                }
                                $.ajax({
                                    url: $("a:contains('登录')")[0].href + "&quit=1"
                                })
                            }
                        })
                    }
                }
            })
        }
    },
    _checkGoogleTranslate: false,
    checkGoogleTranslate: function () {
        if ($("html").attr("class") && $("html").attr("class").indexOf("translated") > -1) {
            if (Sys._checkGoogleTranslate == false) {
                alert("Bạn vui lòng không dùng google dịch để tránh gây những sai sót không đáng có cho giỏ hàng của bạn.\nBạn tải lại trang hoặc cho hiển thị lại văn bản gốc để các chức năng được hoạt động đúng");
                Sys.disable(true)
                Sys._checkGoogleTranslate = true;
            }
        } else {
            Sys.disable(false)
            Sys._checkGoogleTranslate = false;
        }
    },
    checkNewVersion: function () {
        $.ajax({
            url: "http://www.ordersi.net/update.json",
            success: function (json) {
                try {
                    var srv = eval(json);
                    if (srv.version > Sys.currentVersion && new Date().getTime() >= srv.expiredDate.getTime()) {
                        try {
                            if (srv.disable.all == true) {
                                Sys.disable(true, "wrongversion")
                            }
                        } catch (e) {
                            Sys.disable(true, "wrongversion")
                        }
                        msg = "Bạn vui lòng cập nhật lên phiên bản addons mới nhất";
                        try { msg = srv.message } catch (e) { };
                        alert(msg);
                        url = srv.post;
                        window.open(url, '_blank');
                        window.focus();
                    }
                } catch (e) {

                }
            }
        })
    },
    getCartURLFromSettings: function () {
        var add_cart_url = eStorage.getItem("add_to_cart_url", function (val) {
            add_cart_url = val
            if (add_cart_url != null) {
                Settings.cart_url = add_cart_url;
            }
        }),
		view_cart_url = eStorage.getItem("view_cart_url", function (val) {
		    view_cart_url = val;
		    if (view_cart_url != null) {
		        Settings.cart_view_url = view_cart_url;
		    }
		})
    },
    afterLoad: function () {
        Sys.checkNewVersion();
        setInterval(function () {
            Sys.checkGoogleTranslate()
        }, 1000)
    }
}
Sys.getCartURLFromSettings();
//<editor-fold desc="Merchant Class">
function MerchantType(type,customName,paraObj){
    this.type = type;
    this.name = customName;
    this.param = paraObj;
}
function Merchant(type,addtoArray) {
    this.MerchantName = "";
    this.additionPrice = 0;
    this.rateMoney = -1;

    this.getColor = function () {
        return "";
    };
    this.getSize = function () {
        return "";
    };
    this.getComment = function () {
        return $("#txtCmt").val();
    };
    this.getColorSizeName = function () {
        return "";
    };
    this.getSellerId = function () {
        return "";
    };
    this.getItemId = function () {
        return "";
    };
    this.getItemTitle = function () {
        return "";
    };
    this.getItemImage = function () {
        return "";
    };
    this.getItemLink = function () {
        return window.location;
    };
    this.getQuantity = function () {
        return "";
    };
    this.getPrice = function () {
        return "";
    };
    this.getAllowedMinQuantity = function () {
        return 1;
    };
    this.getAllowedMaxQuantity = function(){
        return -1;
    };
    this.getAllowedMultiplyQuantity = function () {
        return 1;
    };
    this.getTextPrice = function(){
        return this.getPrice();
    };
    this.getPriceTable = function () {
        return "";
    };
    this.getVNDPrice = function () {
        return "";
    };
    this.onLoad = function () {
        return "";
    };

    this.validateQuantity = function () {
        if(isNaN(parseInt(this.getQuantity()))||parseInt(this.getQuantity())<1){
            return Settings.Result.quantity.below1;
        }
        if(parseInt(this.getQuantity())>this.getAllowedMaxQuantity()&&this.getAllowedMaxQuantity()!=-1){
            return new Result(false,"Số lượng của sản phẩm phải không được lớn hơn "+this.getAllowedMaxQuantity())
        }
        if(this.MerchantName=='alibaba'){
//            if(parseInt(this.getQuantity())%parseInt(this.firstQuantity)!=0){
//                return new Result(false,"Số lượng của sản phẩm phải là bội số của "+this.firstQuantity)
//            }
        }
        return new Result(true,"");
    };
    this.validateProperties = function () {
        return new Result(true, "")
    };

    this.helper={
        getValByName:function(name){
            var e = $('[name='+name+']');
            var v ="";
            if(e.length>0){
                v = e.eq(0).val();
            }

            return (v);
        },
        getTextByClass:function(clsName){
            var e = $('.'+clsName);
            var v ="";
            if(e.length>0){
                v = e.eq(0).text();
            }

            return (v);
        },
        getColorSizeName:function(stockObj,buyAObject,BASelectClassName,attrValue){
            var stocks=stockObj
            var stocks_amount=stocks.length;

            var buyArea=buyAObject
            if(buyArea.length==0) return '';
            buyArea=buyArea.eq(0);

            var color_size_name='';
            if(stocks_amount>0)
            {
                var selects = buyArea.find("."+BASelectClassName);
                if(selects.length>0)
                {
                    for(var i=0;i<selects.length;i++)
                    {
                        var element = selects.eq(i);
                        if(color_size_name=='')
                            color_size_name+=element.attr(attrValue);
                        else color_size_name+=';'+element.attr(attrValue);
                    }
                }
            }
            return (color_size_name);
        },
        getColorSizeName_factoryMerchant:function(e){
            var val='';
            if(document.getElementById(e)!=null)
            {
                var color_box=document.getElementById(e);
                val=document.getElementById(e).options[document.getElementById(e).selectedIndex].textContent;
            }
            return (val);
        },
        getColorSizeName1a2:function(){
            var val='';
            var sxlist = [];

            $("[id^=sx]").each(function(){
               if(/sx\d+list/.test($(this).attr("id"))){
                   sxlist.push(this);
               }
            });
            for(var i=0;i<sxlist.length;i++){
                val+= ((val!='')?';':'')+ sxlist[i].options[sxlist[i].selectedIndex].textContent;
            }
            return val;
        },
        getColorSizeName2:function(){
            return this.getColorSizeName_factoryMerchant("sx2list")
        },
        getColorSizeName3:function(){
            return this.getColorSizeName_factoryMerchant("sx1list")
        },
        getItemId:function(name){
            var e=$("[name="+name+"]")
            if(e.length>0)
            {
                return e.eq(0).val();
            }
            return 0;
        },
        getItemId2:function(name){
            var e=$("[name="+name+"]")
            var v=0;
            if(e.length>0)
            {
                for(var i=0;i< e.length;i++){
                    if(e.eq(i).val()!=""){
                        v= e.eq(i).val();
                    }
                }
                return v;
            }
            return v;
        },
        validateProperties:function(stock,select){
            var st = $(stock+":visible");
            var se = $(stock+":visible "+select);
            if(st.length>0 && se.length<st.length){
                return Settings.Result.notFillProps;
            }
            return new Result(true,"");
        }
    }
    this.template = {
        factoryMerchant1:function(obj){
            this.getItemId = function(){
                return $(obj.getItemId).text().trim();
            }
            this.onLoad = function(){
                var row = document.createElement("TR");
                var td = document.createElement("TD");
                td.innerHTML=this.myHTML().innerHTML ;
                if(obj.onLoad_colspan!=null){
                    td.setAttribute("colspan", obj.onLoad_colspan);
                }
                row.appendChild(td);
				try{ 
					var tar = obj.onLoad;
					if(tar.substring(0)=="j"){
						tar = tar.substr(1);
						$(tar).parent().append(row)
					}else{
						document.getElementById(obj.onLoad).parentNode.appendChild( row);
						//$("#"+obj.onLoad).parents("tr:eq(0)").parent().append(row)
						//debugger;
					}
				}catch(e){
					document.getElementById(obj.onLoad).parentNode.appendChild( row);
				}
                
            }
            this.getPrice = function(){
                var p = $(obj.getPrice).text().match(/[0-9]+[\.]?[0-9]+/);
                if(p!=null&&p.length==1){
                    return processPrice(p[0]);
                }else{
                    if($(obj.getPrice)[0]){
                        $(obj.getPrice).html("<img src='http://loadinggif.com/images/image-selection/1.gif'>");
                        Sys.getLoginPrice(obj.getPrice);
                    }
                }
                return processPrice("0");
            }
            this.getItemTitle = function(){
                return $(obj.getItemTitle).text();
            }
            this.getItemImage = function(){
                if($(obj.getItemImage)[0]){
                    return $(obj.getItemImage)[0].src;
                }
                return "";
            }
            this.getQuantity = function(){
                return $(obj.getQuantity).val();
            }
            this.getColorSizeName = function(){
                if(obj.getColorSizeName!=null){
                    return this.helper.getColorSizeName_factoryMerchant(obj.getColorSizeName);
                }else{
                    return this.helper.getColorSizeName1a2();
                }
            }
        },
        factoryMerchant1b:function(obj){
            this.template.factoryMerchant1.call(this,obj);
            this.onLoad = function(){
                var row = document.createElement("TR");
                var td = document.createElement("TD");
                td.innerHTML=this.myHTML().innerHTML ;
                if(obj.onLoad_colspan!=null){
                    td.setAttribute("colspan", obj.onLoad_colspan);
                }
                row.appendChild(td);
                document.getElementById(obj.onLoad).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild(row);
            }
        }
    }

    this.myHTML = function () {
        var href = ""// getLink();

        var src = 'http://deptinhte.com/dathang.png';
        var src_cart = 'http://deptinhte.com/shoppingcart.png';

        var price_raw = this.getTextPrice();
        var price_result = getVNDPrice(price_raw);
        var com_text = '<div style="overflow:hidden; margin-bottom: 10px;"><span style="width:60px; float:left; font-size: 14px;">Mô tả：</span><textarea cols="62" id="txtCmt" name="txtCmt" style="margin: 0px; height: 37px; width: 80%;"></textarea></div>';

        var s = '<div id="ordersiarea" class="g-group-member" style="position:relative;overflow: hidden;height: 155px; margin: 10px 0; border: 1px solid #c7c7c7;padding:10px 10px 10px 65px; background: #fff url(http://deptinhte.com/bg.png) no-repeat left center;">' + com_text + '<div class="" style="width:100%;float:right">';
        s += '<div><div style="float:left;margin-left:60px" id="block_button"><a id="id_nhaphang_add_cart" href="javascript:void(0)"><img src="' + src + '" alt="" /></a>' +
            '<a id="id_nhaphang_view_cart" href="' + Settings.cart_view_url + '" target="blank" style="margin-left:10px; float:right;"><img src="' + src_cart + '" alt="" /></a></div>&nbsp;</div>';

        s += '</div></div>';

        var div = document.createElement('div');
        div.innerHTML = s;

//        document.getElementById("id_nhaphang_add_cart").addEventListener('mouseover', linkHover);
//        document.getElementById("id_nhaphang_add_cart").addEventListener('click', linkClick);
//        document.getElementById("id_nhaphang_save_item").addEventListener('click', linkSave);
        return div;
    }
    this.addToCart = function () {
        var valQty = this.validateQuantity();
        var valProp = this.validateProperties();
        if (!valQty.r) {
            valQty.a();
            return false;
        }
        if (!valProp.r) {
            valProp.a();
            return false;
        }
        if(this.getPrice()==null||parseInt(this.getPrice())==NaN||parseFloat(this.getPrice())==0||this.getPrice()=="NaN"||this.getPrice()==NaN||typeof this.getPrice()=="NaN"||(!this.getPrice()>0)){
            alert("Giá không hợp lệ");
            return false;
        }
        $.blockUI({ message: '<h1  style="background:#333; padding: 20px; color:#FFF; font-family:Tahoma, Geneva, sans-serif; font-size: 14px; border-radius: 5px; opacity:0.8"><img src="http://loadinggif.com/images/image-selection/1.gif" /> Đang đặt hàng ...</h1>' });
        var params = ("type={0}&item_id={1}&item_title={2}&item_image={3}&comment={4}&item_link={5}&item_price={6}" +
            "&price_table={7}&color_size_name={8}&seller_id={9}&seller_name={10}&quantity={11}&color={12}&size={13}" +
            "&max={14}&min={15}&multiply={16}")
                .encodedFormat(this.MerchantName, this.getItemId(), this.getItemTitle(), this.getItemImage(), this.getComment(),
                this.getItemLink(), this.getPrice(), this.getPriceTable(), this.getColorSizeName(), this.getSellerId(),
                this.getSellerId(), this.getQuantity(), this.getColor(), this.getSize(),this.getAllowedMaxQuantity(),
                this.getAllowedMinQuantity(),this.getAllowedMultiplyQuantity());

        console.log(params);
        $.ajax({
            url:Settings.cart_url,
            data:params,
            type:"POST",
            success:Merchant.templateFunction.addToCartHandler
        })
    }

    //constructor;
    if(type instanceof MerchantType){
        this.MerchantName = type.name;
        this.template[type.type].call(this,type.param);
    }else{
        this.MerchantName = type;
    }
	var addTo = [];
	if(typeof addtoArray == "object"){
		addTo = addtoArray
	}else{
		addTo = [addtoArray]
	}
	for(var i=0;i<addTo.length;i++){
		merchantArray[addTo[i]] = this;
	}
    
}
Merchant.templateFunction = {
    addToCartHandler: function (data) {
        $.unblockUI();
        var ok = true;
        try {
            tmp_data = ajaxJSONResult(data);
            if (tmp_data == null || tmp_data.result == null || tmp_data.result != "ok") {
                ok = false;
            }
            delete tmp_data;
        } catch (e) {
            ok = false;
        }
        if (ok) {
            Sys.message('Bạn đã đặt hàng thành công!', 2000);
        } else {
            alert("Đặt hàng thất bại, xin mời đặt hàng lại");
        }
    }
}
Merchant.templateParams={
    factoryMerchant1:{
        getItemId:"#Label12",
        onLoad:"Tr3",
        onLoad_colspan:"4",
        getPrice:"#Label5",
        getItemTitle:"#Label1",
        getItemImage:"#img_tp",
        getQuantity:"#sl1"
    },
    factoryMerchant2_gen:function(prefix){
        return {
            getItemId:"#"+prefix+"Label12",
            onLoad:prefix+"Label5",
            onLoad_colspan:"2",
            getPrice:"#"+prefix+"Label5",
            getItemTitle:"#"+prefix+"Label1",
            getItemImage:"#"+prefix+"img_tp",
            getQuantity:"#txt_buy_sl_0"
        }
    }
}
Merchant.templateParams.factoryMerchant2a=Merchant.templateParams.factoryMerchant2_gen("Product_main1_Product_top21_");
Merchant.templateParams.factoryMerchant2b=Merchant.templateParams.factoryMerchant2_gen("Product_main1_Product_top11_");

//</editor-fold>

function onload() {
    var host = getHostname();
    if(host.indexOf("lelefushi")>-1){
        Settings.account.user = "trshop";
        Settings.account.password = "anhviet3010";
    }
    var detectedArray = [];
    var merchant = null;
    for (var i in merchantArray) {
        if (host.indexOf(i) != -1) {
            detectedArray.push(i);
        }
    }
    if(detectedArray.length==0)return;
    if(detectedArray.length==1){
        merchant = detectedArray[0];
    }else{
        var last = 0;
        for(var i=1;i<detectedArray.length;i++){
            if(detectedArray[last].length<detectedArray[i].length){
                last = i;
            }
        }
        merchant = detectedArray[last];
    }
    merchant = merchantArray[merchant];
    Sys.currentMerchant=merchant;
    console.log("detected "+merchant.MerchantName);
	if(merchant.MerchantName.indexOf("tmall")>-1){
		$(function(){
			merchant.onLoad();
			Sys.currentMerchant = merchant;

			if($("#ordersiarea").width()<400){
				$("#ordersiarea").css({width:"400px"})
			}
			$("#ordersiarea").prepend(Settings.priceArea);
			$("#ordersiarea div:eq(2) div").append(Settings.interativeArea);
			$("#id_nhaphang_add_cart").click(function () {
				console.log(merchant);
				merchant.addToCart();
			})
			Sys.updatePrice();
		})
	}else{
		merchant.onLoad();
		Sys.currentMerchant = merchant;

		if($("#ordersiarea").width()<400){
			$("#ordersiarea").css({width:"400px"})
		}
		$("#ordersiarea").prepend(Settings.priceArea);
		$("#ordersiarea div:eq(2) div").append(Settings.interativeArea);
		$("#id_nhaphang_add_cart").click(function () {
			console.log(merchant);
			merchant.addToCart();
		})
		Sys.updatePrice();
	}
    Sys.afterLoad();
}
addGlobalStyle('.tahoma { font-family: tahoma,arial,verdana ! important; }');

var merchant = null;
var merchantArray = [];

//<editor-fold desc="Taobao">
var mTaobao = new Merchant("taobao",'taobao');
    mTaobao.onLoad = function () {
        var div = this.myHTML();
        $(div).insertAfter($('#J_StrPriceModBox'));
    }
    mTaobao.getItemId=function(){
        var element =document.getElementsByName("item_id");

        if(element.length>0)
        {
            element=element[0];
            var item_id=element.value;
        }else var item_id=0;

        if(item_id==0 || item_id==null || item_id=='')
        {
            var element =document.getElementsByName("item_id_num");

            if(element.length>0)
            {
                element=element[0];
                var item_id=element.value;
            }else var item_id=0;
        }
        return item_id;
    }
    mTaobao.getPrice=function(){
        var p_e=document.getElementById('J_StrPrice');
        if(p_e!=null)
        {
            //kiểm tra nếu có giảm giá thì lấy giảm giá
            if( p_e.className.indexOf('tb-unvalid')!=-1)
            {
                var pr=document.getElementsByClassName('tb-lowest')[0];

                p_e=pr.getElementsByClassName('tb-price');
                p_e=p_e[p_e.length-1];
            }
            if(document.getElementById('J_SpanLimitProm')!=null && document.getElementById('J_SpanLimitProm')!='undefined')
            {
                p_e=document.getElementById('J_SpanLimitProm');
            }
            if(document.getElementById('J_PromoPrice')!=null && document.getElementById('J_PromoPrice')!='undefined')
            {
                var p_p=document.getElementById('J_PromoPrice');
                var tb=document.getElementsByClassName("tb-promo-price-type")[0].textContent;
                if(p_p.getElementsByTagName("strong").length>0 && p_p.getElementsByTagName("strong")[0].textContent!='' && tb.indexOf('VIP')==-1)
                    p_e=p_p.getElementsByTagName("strong")[0];
            }
            var webprice_text = p_e.textContent;

            //webprice_text = parseFloat(webprice_text);
            //var price_taobao=(webprice_text + additionPrice());
            var price_taobao=processPrice(webprice_text);

            return price_taobao;
        }else
            return 0;
    }
    mTaobao.getItemTitle=function(){
        var hd=document.getElementsByClassName('tb-detail-hd')[0];
        var title= hd.getElementsByTagName("h3")[0].textContent;
        return (title);
    }
    mTaobao.getItemImage=function(){
        var img_src=$('#J_ImgBooth').attr("src");
        return (img_src);
    }
    mTaobao.getSellerId=function(){
        var seller_name='';

        var hd=document.getElementsByName('seller_nickname')[0];
        if(hd!=null)
        {
            seller_name= hd.value;
        }else
        {
            var hd=document.getElementsByClassName('hCard')[0];

            seller_name= hd.textContent;
        }

        return (seller_name);
    }
    mTaobao.getQuantity=function(){
        var amount=$("#J_IptAmount")
        if(amount.length==1){
            return amount.val();
        }else{
            return 0;
        }
    }
    mTaobao.getAllowedMinQuantity=function(){
        var min = $("[name=allow_quantity]");
        if(min.length==0){
            return 1;
        }else{
            return min.val();
        }
    }
    mTaobao.getAllowedMaxQuantity = function(){
        if($("#J_SpanStock.tb-count")[0]){
            return $("#J_SpanStock.tb-count").text().trim()
        }else{
            return -1;
        }
    }
    mTaobao.getColorSizeName=function(){
        var selected_props=document.getElementsByClassName('tb-selected');
        var color_size='';

        if (selected_props.length > 0) {
            for (var i = 0; i < selected_props.length; i++) {
                var ele = selected_props[i];
                var prop_str = ele.getAttribute("data-value");
                if (prop_str != null && prop_str.length > 0) {
                    p_e = ele.getElementsByTagName('span');
                    p_e = p_e[p_e.length - 1];
                    prop_str = p_e.textContent
                    color_size += (color_size==''?'':';') + (prop_str);
                } else continue;
            }
        }
        return (color_size);
    }
    mTaobao.validateProperties=function(){
        return this.helper.validateProperties(".J_TSaleProp",".tb-selected");
    }
//</editor-fold>


//<editor-fold desc="Tmall">
var mTmall = new Merchant("tmall",'tmall');
mTmall.onLoad = function () {
    var div = this.myHTML();
    $(div).insertAfter($('#J_StrPriceModBox'));
}
mTmall.getItemId=function(){
    var element =document.getElementsByName("item_id");

    if(element.length>0)
    {
        element=element[0];
        var item_id=element.value;
    }else var item_id=0;

    if(item_id==0 || item_id==null || item_id=='')
    {
        var element =document.getElementsByName("item_id_num");

        if(element.length>0)
        {
            element=element[0];
            var item_id=element.value;
        }else var item_id=0;
    }
    return item_id;
}
mTmall.getPrice=function(){
    var p_e=document.getElementById('J_StrPrice');
    if(p_e!=null)
    {
        //kiểm tra nếu có giảm giá thì lấy giảm giá
        if( p_e.className.indexOf('tb-unvalid')!=-1)
        {
            var pr=document.getElementsByClassName('tb-lowest')[0];

            p_e=pr.getElementsByClassName('tb-price');
            p_e=p_e[p_e.length-1];
        }
        if(document.getElementById('J_SpanLimitProm')!=null && document.getElementById('J_SpanLimitProm')!='undefined')
        {
            p_e=document.getElementById('J_SpanLimitProm');
        }
		if($("#J_StrPrice").length>0){
			p_e = $("#J_StrPrice")[0];
		}
        if(document.getElementById('J_PromoPrice')!=null && document.getElementById('J_PromoPrice')!='undefined')
        {
            var p_p=document.getElementById('J_PromoPrice');
			if(document.getElementsByClassName("tb-promo-price-type").length>0){
				var tb=document.getElementsByClassName("tb-promo-price-type")[0].textContent;
				if(p_p.getElementsByTagName("strong").length>0 && p_p.getElementsByTagName("strong")[0].textContent!='' && tb.indexOf('VIP')==-1)
					p_e=p_p.getElementsByTagName("strong")[0];
			}
        }
        var webprice_text = p_e.textContent;

        //webprice_text = parseFloat(webprice_text);
        //var price_taobao=(webprice_text + additionPrice());
        var price_taobao=processPrice(webprice_text);

        return price_taobao;
    }else
        return 0;
}
mTmall.getItemTitle=function(){
    var hd=document.getElementsByClassName('tb-detail-hd')[0];
    var title= hd.getElementsByTagName("h3")[0].textContent;
    return (title);
}
mTmall.getItemImage=function(){
    var img_src=$('#J_ImgBooth').attr("src");
    return (img_src);
}
mTmall.getSellerId=function(){
    var seller_name='';

    var hd=document.getElementsByName('seller_nickname')[0];
    if(hd!=null)
    {
        seller_name= hd.value;
    }else
    {
        var hd=document.getElementsByClassName('hCard')[0];

        seller_name= hd.textContent;
    }

    return (seller_name);
}
mTmall.getQuantity=function(){
    var amount=$("#J_IptAmount,.mui-amount-input")
    if(amount.length>0){
        return amount.val();
    }else{
        return 0;
    }
}
//mTmall.getAllowedMinQuantity=function(){
//    var min = $("[name=allow_quantity]");
//    if(min.length==0){
//        return 1;
//    }else{
//        return min.val();
//    }
//}
mTmall.getAllowedMaxQuantity = function(){
    if($("#J_SpanStock.tb-count")[0]){
        return $("#J_SpanStock.tb-count").text().trim()
    }else if($("#J_EmStock")[0]){
        return $("#J_EmStock").text().match(/(\d+)/)[1];
    }else{
        return -1;
    }
}
mTmall.getColorSizeName=function(){
    var selected_props=document.getElementsByClassName('tb-selected');
    var color_size='';

    if (selected_props.length > 0) {
        for (var i = 0; i < selected_props.length; i++) {
            var ele = selected_props[i];
            var prop_str = ele.getAttribute("data-value");
            if (prop_str != null && prop_str.length > 0) {
                p_e = ele.getElementsByTagName('span');
                p_e = p_e[p_e.length - 1];
                prop_str = p_e.textContent
                color_size += (color_size==''?'':';') + (prop_str);
            } else continue;
        }
    }
    return (color_size);
}
mTmall.validateProperties=function(){
    return this.helper.validateProperties(".J_TSaleProp",".tb-selected");
}
//</editor-fold>

//<editor-fold desc="Alibaba">
var mAlibaba= new Merchant("alibaba",['alibaba','1688']);
    mAlibaba.onLoad= function(){
//        this.firstQuantity = this.getQuantity();
        var that = this;

        var div = $(that.myHTML())[0];
        if ($(".region-detail-price").length > 0) {
            tar = $(".region-detail-price");
            $(div).appendTo(tar);
        } else {

            if ($('#mod-detail-price').length > 0) {
                tar = $('#mod-detail-price');
            } else {
                tar = $("#mod-detail-price-sku");
            }
            if (tar.length == 0) {
                tar = $(".mod-detail-sku");
                if ($(".mod-detail-price-sku").length > 0) {
                    tar = $(".mod-detail-sku");
                }
            }

            $(div).insertAfter(tar);
        }
        //setTimeout(Sys.updatePrice,1000);
		priceUp = setInterval(function(){
			Sys.updatePrice();
			console.log("update price");
		},1000);
        //document.getElementById('J_ModTrade').parentNode.insertBefore( div.firstChild , document.getElementById('J_ModTrade') );
		
//        $("#J_AmountInput").bind("change",function(){
//            Sys.updatePrice();
//        })

        this.data = $.parseJSON($(".mod-detail-sku-batch").attr("data-mod-config"));
    }
    mAlibaba.getAllowedMaxQuantity = function(){
        if($("#dt-sku-can-sold")[0]){
            return $("#dt-sku-can-sold").text().trim()
        }else{
            return -1;
        }
    }
    mAlibaba.getAllowedMultiplyQuantity=function(){
        return 1;
    }
    mAlibaba.getItemId=function(){
        try{
            (new Function($("script:contains('offerid')").text()+";itemconfig=iDetailConfig"))()
            return itemconfig.offerid;
        }catch(e){
            return this.helper.getItemId2("offerId");
        }
    }
    mAlibaba.getPrice=function(quantity){
//        debugger;
        quantity = parseInt(quantity);
		if(isNaN(quantity))quantity = 1;
        var price = 0;
        var span_price=document.getElementById('mod-detail-price-sku');
        // M?t m?c giá
        if(span_price != null)
        {
            //price=span_price.textContent;
            var e_num=document.getElementById('mod-detail-price-sku').getElementsByTagName('span')[1].textContent;
            var p_num=document.getElementById('mod-detail-price-sku').getElementsByTagName('span')[2].textContent;
            price = e_num + p_num;
            return processPrice(price);
        }

        var span_price2=$(".mod-detail-price-sku")
        if(span_price2.length > 0)
        {
            var e_num=span_price2.find("span").eq(1).text()
            var p_num=span_price2.find("span").eq(2).text()
            price = e_num + p_num;
            return processPrice(price);
        }

        var div_prices = document.getElementById("mod-detail-price");

        if(div_prices == null) {
            return processPrice(price);
        }

        var span_prices = div_prices.getElementsByTagName("span");
        if(span_prices==null) {
            return processPrice(price);
        }


        var prices = '';
        var first_price = 0;
        for (var i = 0; i < span_prices.length; i++) {
            var str = span_prices[i].textContent;
            if((str.indexOf('-')!=-1) || (str.indexOf('≥') != -1))
            {
                if(str.indexOf('-')!=-1)
                {
                    prices = str.split('-');
                    price = span_prices[i+1].textContent + '' + span_prices[i+2].textContent;
					if(quantity >= parseInt(prices[0]) && quantity <= parseInt(prices[1])){
						break;
					}
                }
                if(str.indexOf('≥')!=-1)
                {
                    prices = str.split('≥');
                    price = span_prices[i+1].textContent + '' + span_prices[i+2].textContent;
                }
            }
        }
        return processPrice(price);
    }
    mAlibaba.getTextPrice = function(){
		var num = 1;
		try{
			num= parseInt($("#mod-detail .summary .num:eq(0)").text());
			if(num < 1 ) num = 1;
		}catch(e){
			num = 1;
		}
        return this.getPrice(num);
    }
    mAlibaba.getItemTitle=function(){
        return this.helper.getValByName("offerTitle");
    }
    mAlibaba.getItemImage=function(){
        return ($(".box-img img").eq(0).attr("src"));
    }
    mAlibaba.getSellerId = function(){
        return $(".contact-div a:eq(0)").text();
    }
    mAlibaba.getQuantity=function(){
        return $("#J_AmountInput").val();
    }
    mAlibaba.getAllowedMinQuantity=function(){
        var min=1;
        var div_prices = document.getElementById("mod-detail-price");
        if(div_prices==null)
        {
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
    mAlibaba.getColorSizeName=function(){
        return this.helper.getColorSizeName($(".d-sku"),$(".d-sku-box"),"d-selected","data-value");
    }
    mAlibaba.getPriceTable=function(){
        var div_prices = document.getElementById("mod-detail-price");
        if(div_prices==null) return '';

        var span_prices = div_prices.getElementsByTagName("span");
        if(span_prices==null) return '';

        var price_table='';
        //duyệt qua các mức giá

        $(div_prices).find("tr").each(function(){
            var td1 = $(this).find("td:eq(0)");
            var td1_text = td1.text().trim();
            if((td1_text.indexOf('-')!=-1) || (td1_text.indexOf('≥')!=-1)){
                var td2 = $(this).find("td:eq(1)");
                var td2_text = td2.text().trim();
                if(price_table=='')
                    price_table+=td1_text+':'+processPrice(td2_text);
                else
                    price_table+=';'+td1_text+':'+processPrice(td2_text);
            }
        })
        return (price_table);
    }
    mAlibaba.validateProperties=function(){
        return this.helper.validateProperties(".d-sku",".d-selected");
    }
    mAlibaba.get_item_data=function(){
        var result = new Array();
        var i;
        // Multi buy
        if($(".content-wrapper").length>0){
            i = 0;
            $(".content-wrapper table tbody tr").each(function(){
                var $item = $(this);
                var amount = $item.find(".amount-input").val();
                var data = JSON.parse($item.attr("data-sku-config"));
                if(isNaN(amount) || amount == 0){
                    return;
                }else{
                    result[i] = new Array();
                    // Add data to array
                    result[i]['amount'] = amount;
                    result[i]['min_amount'] = data.min;
                    result[i]['max_amount'] = data.max;
                    result[i]['color'] = data.skuName;
                    i++;
                }
            })
        }else{
            // Buy one by one
            result[0] = new Array();
            result[0]['amount'] = document.getElementById('J_AmountInput').value;
            result[0]['min_amount'] = 1;
            result[0]['max_amount'] = -1;
            result[0]['size'] = '';
            result[0]['color'] = '';
        }
//        if(tbl_wrap.length > 0) {
//            var input_data = tbl_wrap[0].getElementsByClassName('amount-input');
//            if(input_data.length > 0) {
//                var i = 0;
//                for(var inc in input_data) {
//                    if(isNaN(input_data[inc].value) || input_data[inc].value == 0) {
//                        continue;
//                    }
//                    result[i] = new Array();
//                    // Add data to array
//                    result[i]['amount'] = input_data[inc].value;
//                    result[i]['min_amount'] = input_data[inc].getAttribute('data-count');
//                    result[i]['size'] = input_data[inc].getAttribute('data-prop2');
//                    result[i]['color'] = input_data[inc].getAttribute('data-prop1');
//                    i++;
//                }
//            }
//        } else {
//            // Buy one by one
//            result[0] = new Array();
//            result[0]['amount'] = document.getElementById('J_AmountInput').value;
//            result[0]['min_amount'] = 9999;
//            result[0]['size'] = '';
//            result[0]['color'] = '';
//        }

        return result;
    }
    mAlibaba.getLink=function( item_data ) {
        var params = ("type={0}&item_id={1}&item_title={2}&item_image={3}&comment={4}&item_link={5}&item_price={6}" +
            "&price_table={7}&color_size_name={8}&seller_id={9}&seller_name={10}&quantity={11}&color={12}&size={13}" +
            "&max={14}&min={15}&multiply={16}")
            .encodedFormat(this.MerchantName, this.getItemId(), this.getItemTitle(), this.getItemImage(), this.getComment(),
            this.getItemLink(), this.getPrice(item_data['amount']), this.getPriceTable(), [item_data['color'],item_data['size']].join(";"), this.getSellerId(),
            this.getSellerId(), item_data['amount'], this.getColor(), this.getSize(),item_data['max_amount'],item_data['min_amount'],1
            ,this.getAllowedMultiplyQuantity());
        return (params);
    }
    mAlibaba.addToCart = function() {
//        debugger;

        var data = this.get_item_data();

        if(data.length == 0) {
            alert('Bạn chưa chọn sản phẩm nào!');
            return;
        }
        $.blockUI({ message: '<h1><img src="http://jquery.malsup.com/block/busy.gif" /> Đang đặt hàng ...</h1>' });
        for(var o in data) {
            try {
                var params = this.getLink(data[o]);
                console.log(params);
                $.ajax({
                    url:Settings.cart_url,
                    data:params,
                    type:"POST",
                    success:Merchant.templateFunction.addToCartHandler
                })
            } catch (e) {
                alert('Error has found: ' + e);
            }
        }
    }
//</editor-fold>

//<editor-fold desc="Paipai">
var mPaipai = new Merchant("paipai",'paipai');
    mPaipai.getItemId=function(){
        return this.helper.getItemId("itemid");
    }
    mPaipai.onLoad = function(){
        var div = $(this.myHTML())[0];
        document.getElementById('buyArea').parentNode.insertBefore( div.firstChild , document.getElementById('buyArea') );
    }
    mPaipai.getPrice = function(){
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
    mPaipai.getItemTitle = function(){
        return this.helper.getValByName("sTitle");
    }
    mPaipai.getItemImage = function(){
        return $("#pfhlkd_smallImage").attr("src");
    }
    mPaipai.getSellerId = function(){
        return this.helper.getValByName("sellerUin");
    }
    mPaipai.getQuantity = function(){
        return $("#selectNum").val();
    }
    mPaipai.getColorSizeName = function(){
        return this.helper.getColorSizeName($('.stock'),$('#buyArea'),'select','attrvalue');
    }
    mPaipai.getItemLink = function(){
        return window.location;
    }
    mPaipai.validateProperties=function(){
        return this.helper.validateProperties(".stock",".select");
    }
//</editor-fold>

var mMofayichu = new Merchant(new MerchantType("factoryMerchant1","mofayichu",
    $.extend(true,{},Merchant.templateParams.factoryMerchant1,{
        onLoad_colspan:"2",
        getItemImage:"#Form1 img:eq(1)"
    })),'mofayichu');

var mChenxifushi = new Merchant(new MerchantType("factoryMerchant1","chenxifushi",
    $.extend(true,{},Merchant.templateParams.factoryMerchant1,{getColorSizeName:"sx2list"})),'chenxifushi');

var mLelefushi = new Merchant(new MerchantType("factoryMerchant1b","lelefushi",
    $.extend(true,{},Merchant.templateParams.factoryMerchant2b),{onLoad:"jtd:has(.div_spsx3):last"}),'lelefushi');
//    Merchant.templateParams.factoryMerchant2a),'lelefushi');
    mLelefushi.getColorSizeName=function(){
        var val='';
        if(document.getElementsByClassName("tx").length>0)
        {
            var element =document.getElementsByClassName("tx");
            for(var i=0;i<element.length;i++){
                if(val!='')val+=';'
                val += element[i].textContent;
            }
        }
        return (val);
    }
    mLelefushi.validateProperties=function(){
        if($(".tx").length<=0){
            return Settings.Result.notFillProps;
        }
        return new Result(true,"");
    }

var mYilanfushi = new Merchant(new MerchantType("factoryMerchant1","yilanfushi",
    Merchant.templateParams.factoryMerchant1),'yilanfushi');

var mShmoyu = new Merchant(new MerchantType("factoryMerchant1","shmoyu",
    $.extend(true,{},Merchant.templateParams.factoryMerchant1,{getColorSizeName:"sx1list"})),'shmoyu');

var mYiranmeifushi = new Merchant(new MerchantType("factoryMerchant1","yiranmeifushi",
    $.extend(true,{},Merchant.templateParams.factoryMerchant2b),{onLoad:"jtd:has(.div_spsx3):last"}),'yiranmeifushi');

var mYiwenfushi = new Merchant(new MerchantType("factoryMerchant1","yiwenfushi",
    $.extend(true,{},Merchant.templateParams.factoryMerchant1,{getColorSizeName:"sx1list"})),'yiwenfushi');


//<editor-fold desc="Rihanfushi">
var mRihanfushi = new Merchant(new MerchantType("factoryMerchant1b","rihanfushi",
    Merchant.templateParams.factoryMerchant2b),'rihanfushi');
    mRihanfushi.getColorSizeName=function(){
        var val='';
        if(document.getElementsByClassName("tx").length>0)
        {
            var element =document.getElementsByClassName("tx");
            for(var i=0;i<element.length;i++){
                if(val!='')val+=';'
                val += element[i].textContent;
            }
        }
        return (val);
    }
    mRihanfushi.validateProperties=function(){
        if($(".tx2").parent('td').length>0 && $(".tx2").parent('td').length!=$('.tx').length){
            return Settings.Result.notFillProps;
        }
        return new Result(true,"");
    }
//</editor-fold>

var m5taobao = new Merchant(new MerchantType("factoryMerchant1b","5taobao",
    Merchant.templateParams.factoryMerchant2b),'5taobao');
	m5taobao.getColorSizeName = mRihanfushi.getColorSizeName;
	m5taobao.validateProperties = mRihanfushi.validateProperties;

var mChengzifs = $.extend(true,{},mRihanfushi,{MerchantName:"chengzifs"});
    merchantArray['chengzifs']=mChengzifs;

var m69shopfs = new Merchant(new MerchantType("factoryMerchant1","69shopfs",
    Merchant.templateParams.factoryMerchant1),'69shopfs');

//<editor-fold desc="jj-fashion">
var mJj_fashion= new Merchant("fuzhuangpifa",'fuzhuangpifa');
    mJj_fashion.onLoad= function(){
        var div = $(this.myHTML())[0];
        document.getElementsByClassName('goods_xz')[0].appendChild(div);
    }
    mJj_fashion.getItemId=function(){
//        if(document.getElementsByName("id")[0]){
//            return document.getElementsByName("id")[0].value;
//        }else{
//            return 0;
//        }
        return location.href.match(/_(\d+)\.html/)[1];
    }
    mJj_fashion.getPrice=function(){

        var element =document.getElementById("ECS_RANKPRICE_3");

        if(element!=null)
        {
            var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
        }else var item_price='';

        return item_price;
    }
    mJj_fashion.getItemTitle=function(){
        return $("#ECS_FORMBUY h2").text().trim();
    }
    mJj_fashion.getItemImage=function(){
        return ($("#mp")[0].src);
    }
    mJj_fashion.getQuantity=function(){

        var v=$("#number_"+this.getItemId());
        if(v.length==0){
            v = $("#number");
        }
        if(v[0]){
            return v.val();
        }else{
            console.log(v);
            return 1;
        }
    }
    mJj_fashion.getColorSizeName=function(){
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
        return (val);
    }
    mJj_fashion.validateProperties=function(){
        return this.helper.validateProperties(".godds_yanse",".sel");
    }
//</editor-fold>

var mShanghai = new Merchant(new MerchantType("factoryMerchant1","shanghai",
    Merchant.templateParams.factoryMerchant1),'shanghai');

var mEeshow = new Merchant(new MerchantType("factoryMerchant1b","eeshow",
    Merchant.templateParams.factoryMerchant2b),'eeshow');
var mCharm_dress = new Merchant(new MerchantType("factoryMerchant1","charm-dress",
    $.extend(true,{},Merchant.templateParams.factoryMerchant2b,{getColorSizeName:"sx1list"})),'charm-dress');
var mBaobaopifa = new Merchant(new MerchantType("factoryMerchant1","baobaopifa",
    {
        getItemTitle:".ProName",
        getItemImage:".picture img",
        getPrice:".f_price",
        getQuantity:"[name=productnum]"
    }),'baobaopifa');
	mBaobaopifa.getItemId=function(){
		try{
			return location.href.match(/id=(\d+)/)[1];
		}catch(e){
		
		}
	}
    mBaobaopifa.onLoad=function(){
        $("[name=form1]").prepend(this.myHTML());
        $("#DetailBox #RBox #RItem #TContent").css({height:'auto'})
    }
onload();
