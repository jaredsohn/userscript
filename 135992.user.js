// ==UserScript==
// @name                Dathang247.vn
// @namespace	        http://danghang247.vn
// @description	        Dathang247 - Công cụ tối ưu đặt hàng trên các site Trung Quốc
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
    console.log(price);
    if(typeof price!="string")price = new String(price);
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
//</editor-fold>

var Settings = {
    cart_url:"http://demo.dathang247.vn/Cart/add?",
    cart_view_url:"http://demo.dathang247.vn/Cart/",
    interativeArea : $("<div id='dathang247-message' style='position:absolute;right:10px; top:5px;width:200px;height:40px;font-size: 14px;font-weight:bold;color:red'></div>"),
    priceArea:$('<div style="font-weight:bold;color: #f60; font-size: 24px;margin-left:44px" id="hangnhap-price">0 VNĐ</div>'),
    Result:{
        notFillProps:new Result(false,"Bạn chưa chọn đủ thuộc tính của sản phẩm"),
        quantity:{
            below1:new Result(false,"Số lượng không thể bé hơn 1")
        }
    },
    account:{
        user:"Vincent",
        password:"viet3010"
    }
}
var Sys={
    currentMerchant:null,
    updatePrice:function(){
        Settings.priceArea.html(getVNDPrice(Sys.currentMerchant.getPrice())+" VNĐ");
    },
    message:function(msg,time){
        var d = Settings.interativeArea;
        d.stop().hide();
        var timeId = new String(new Date().getTime());
        d.attr("data-time",timeId);
        d.html(msg);
        d.stop().fadeIn(400);
        if(time!=-1){
            setTimeout(function(){
                if(d.attr("data-time")==timeId){
                    d.stop().fadeOut(200,function(){
                        d.html("");
                        d.show();
                    });
                }
            },time)
        }
    },
    getLoginPrice:function(priceEQuery){
        if($("a:contains('登录')")[0]){
            $.ajax({
                url:$("a:contains('登录')")[0].href,
                type:"POST",
                data:"username="+Settings.account.user+"&password="+Settings.account.password,
                success:function(data){
                    if(data.indexOf("您的用户名或密码有误!")!=-1){//login fail

                    }else{
                        $.ajax({
                            url:window.location,
                            success:function(html){
                                var j = $(html);
                                if(j.find(priceEQuery).length>0){
                                    $(priceEQuery).html(j.find(priceEQuery).html());
                                    Sys.updatePrice();
                                }else{

                                }
                                $.ajax({
                                    url:$("a:contains('登录')")[0].href+"&quit=1"
                                })
                            }
                        })
                    }
                }
            })
        }
    }
}
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
            if(parseInt(this.getQuantity())%parseInt(this.firstQuantity)!=0){
                return new Result(false,"Số lượng của sản phẩm phải là bội số của "+this.firstQuantity)
            }
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
            var st = $(stock);
            var se = $(stock+" "+select);
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

                document.getElementById(obj.onLoad).parentNode.appendChild( row);
            }
            this.getPrice = function(){
                var p = $(obj.getPrice).text().match(/[0-9]+[\.]?[0-9]+/);
                if(p!=null&&p.length==1){
                    return processPrice(p[0]);
                }else{
                    if($(obj.getPrice)[0]){
                        $(obj.getPrice).html("<img src='http://dathang247.vn/images/ajax-loader.gif'>");
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
                console.log(obj)
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

        var src = 'http://dathang247.vn/dathang.png';
        var src_cart = 'http://dathang247.vn/cart.png';

        var price_raw = this.getPrice();
        var price_result = getVNDPrice(price_raw);
        var com_text = '<div><span style="width:50px;">Mô tả：</span><textarea cols="62" id="txtCmt" name="txtCmt"></textarea></div>';

        var s = '<div id="dathang247area" class="g-group-member" style="position:relative;overflow: hidden;height: 150px; border: 2px solid #f60;padding-top:10px">' + com_text + '<div class="clr" style="width:100%;float:right">';
        s += '<div><div style="float:left;margin-left:44px" id="block_button"><a id="id_nhaphang_add_cart" href="javascript:void(0)"><img src="' + src + '" alt="" /></a>' +
            '<a id="id_nhaphang_view_cart" href="'+Settings.cart_view_url+'" target="blank" style="margin-left:70px"><img src="' + src_cart + '" alt="" /></a></div>&nbsp;</div>';

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
        if(this.getPrice()==null||parseInt(this.getPrice())==NaN||parseInt(this.getPrice())==0){
            alert("Giá không hợp lệ");
            return false;
        }
        $.blockUI({ message: '<h1><img src="http://jquery.malsup.com/block/busy.gif" /> Đang đặt hàng ...</h1>' });
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
            success:function (data) {
                $.unblockUI();
//                Settings.interativeArea.html("Bạn đã đặt hàng thành công <img src='http://www.veryicon.com/icon/png/System/Must%20Have/Check.png' width='25' height='20'></br>" +
//                    "Nếu bạn đã chọn hàng xong, xin mời vào <a href='"+Settings.cart_view_url+"' target='blank'>giỏ hàng</a>")
//                console.log("Response:" + data.substr(0, 50));
                var ok = true;
                try{
                    eval("tmp_data="+data);
                    if(tmp_data==null|| tmp_data.result==null || tmp_data.result!="ok"){
                        ok = false;
                    }
                    delete tmp_data;
                }catch(e){
                    ok = false;
                }
                if(ok){
                    Sys.message('Bạn đã đặt hàng thành công!',2000);
                }else{
                    alert("Đặt hàng thất bại, xin mời đặt hàng lại");
                }
            }
        })
    }

    //constructor;
    if(type instanceof MerchantType){
        this.MerchantName = type.name;
        this.template[type.type].call(this,type.param);
    }else{
        this.MerchantName = type;
    }
    merchantArray[addtoArray] = this;
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
    console.log("detected "+merchant.MerchantName);
    merchant.onLoad();
    Sys.currentMerchant = merchant;

    if($("#dathang247area").width()<400){
        $("#dathang247area").css({width:"400px"})
    }
    $("#dathang247area").prepend(Settings.priceArea);
    $("#dathang247area div:eq(2) div").append(Settings.interativeArea);
    $("#id_nhaphang_add_cart").click(function () {
        console.log(merchant);
        merchant.addToCart();
    })
    Sys.updatePrice();
    return false;
}
addGlobalStyle('.tahoma { font-family: tahoma,arial,verdana ! important; }');

var merchant = null;
var merchantArray = [];

//<editor-fold desc="Taobao">
var mTaobao = new Merchant("taobao",'taobao');
    merchantArray["tmall"] = mTaobao
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

//<editor-fold desc="Alibaba">
var mAlibaba= new Merchant("alibaba",'alibaba');
    mAlibaba.onLoad= function(){
        this.firstQuantity = this.getQuantity();
        var div = $(this.myHTML())[0];
        document.getElementById('J_ModTrade').parentNode.insertBefore( div.firstChild , document.getElementById('J_ModTrade') );
        $("#J_AmountInput").bind("change",function(){
            Sys.updatePrice();
        })
    }
    mAlibaba.getAllowedMaxQuantity = function(){
        if($("#dt-sku-can-sold")[0]){
            return $("#dt-sku-can-sold").text().trim()
        }else{
            return -1;
        }
    }
    mAlibaba.getAllowedMultiplyQuantity=function(){
        if(this.firstQuantity)
        return this.firstQuantity;
        else
        return 1;
    }
    mAlibaba.getItemId=function(){
        return this.helper.getItemId2("offerId");
    }
    mAlibaba.getPrice=function(){

        var quantity =this.getQuantity();

        var price=0;
        var span_price=document.getElementById('dt-sku-price');
        if(span_price!=null)
        {
            price=span_price.textContent;
            return processPrice(price);
        }
        if($("#mod-detail-price-sku")[0]){
            return processPrice($("#mod-detail-price-sku .fd-hide").text());
        }
        var div_prices = document.getElementById("mod-detail-price");
        if(div_prices==null)
        {
            return processPrice(price);
        }


        var span_prices = div_prices.getElementsByTagName("span");
        if(span_prices==null)
        {
            return processPrice(price);
        }

        quantity=parseInt(quantity);

        var td_prices = div_prices.getElementsByTagName("td");
        for (var i = 0; i<span_prices.length; i++) {
            var str=span_prices[i].textContent;
            //alert('chua xu ly:'+str);
            //nếu span chứa thông tin số lượng sản phẩm mua:
            if((str.indexOf('-')!=-1) || (str.indexOf('≥')!=-1))
            {
                //alert('tim thay:'+str);
                if(str.indexOf('-')!=-1)
                {
                    var prices=str.split('-');
                    if((prices.length>0) && (parseInt(prices[0])<= quantity) && (parseInt(prices[1])>= quantity))
                    {
                        //alert(prices[0]+':'+prices[1]);
                        //lấy giá ở td bên phải
                        //var td_price=td_prices[i+1];
                        //var textPrice=td_price.getElementsByTagName("span");
                        var textPrice=span_prices[i+3];

                        textPrice=textPrice.textContent
                        //alert('gia ben canh:'+textPrice);
                        //textPrice = parseFloat(textPrice);
                        var price=textPrice;
                        break;
                    }
                }
                if(str.indexOf('≥')!=-1)
                {
                    var prices=str.split('≥');
                    if((prices.length>0) && (parseInt(prices[1])<= quantity))
                    {
                        //lấy giá ở td bên phải
                        //	var td_price=td_prices[i+1];
                        //	var textPrice=td_price.getElementsByTagName("span");
                        var textPrice=span_prices[i+3];
                        textPrice=textPrice.textContent
                        //alert('gia ben canh:'+textPrice);
                        //textPrice = parseFloat(textPrice);

                        var price=textPrice;
                        break;
                    }
                }
            }
        }

        return processPrice(price);
    }
    mAlibaba.getItemTitle=function(){
        return this.helper.getValByName("offerTitle");
    }
    mAlibaba.getItemImage=function(){
        return ($(".fd-show img").attr("src"));
    }
    mAlibaba.getSellerId = function(){
        return this.helper.getValByName("sellerId");
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
        var td_prices = div_prices.getElementsByTagName("td");
        for (var i = 0; i<span_prices.length; i++) {
            var str=span_prices[i].textContent;

            //nếu span chứa thông tin số lượng sản phẩm mua:
            if((str.indexOf('-')!=-1) || (str.indexOf('≥')!=-1))
            {
                //lấy giá ở td bên phải
                //var textPrice=td_prices[i+1].getElementsByTagName("span");
                var textPrice=span_prices[i+3];
                textPrice=textPrice.textContent;

                if(price_table=='')
                    price_table+=str+':'+processPrice(textPrice);
                else price_table+=';'+str+':'+processPrice(textPrice);
            }
        }
        return (price_table);
    }
    mAlibaba.getItemLink=function(){
        var element =document.getElementsByName("urlFrom");

        if(element.length>0)
        {
            element=element[0];
            var item_link=element.value;
        }else var item_link='';

        return (item_link);
    }
    mAlibaba.validateProperties=function(){
        return this.helper.validateProperties(".d-sku",".d-selected");
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

var m5taobao = new Merchant(new MerchantType("factoryMerchant1","5taobao",
    Merchant.templateParams.factoryMerchant1),'5taobao');

var mChenxifushi = new Merchant(new MerchantType("factoryMerchant1","chenxifushi",
    $.extend(true,{},Merchant.templateParams.factoryMerchant1,{getColorSizeName:"sx1list"})),'chenxifushi');

var mLelefushi = new Merchant(new MerchantType("factoryMerchant1b","lelefushi",
    Merchant.templateParams.factoryMerchant2a),'lelefushi');

var mYilanfushi = new Merchant(new MerchantType("factoryMerchant1","yilanfushi",
    Merchant.templateParams.factoryMerchant1),'yilanfushi');

var mShmoyu = new Merchant(new MerchantType("factoryMerchant1","shmoyu",
    $.extend(true,{},Merchant.templateParams.factoryMerchant1,{getColorSizeName:"sx1list"})),'shmoyu');

var mYiranmeifushi = new Merchant(new MerchantType("factoryMerchant1","yiranmeifushi",
    Merchant.templateParams.factoryMerchant1),'yiranmeifushi');

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

var mChengzifs = $.extend(true,{},mRihanfushi,{MerchantName:"chengzifs"});
    merchantArray['chengzifs']=mChengzifs;

var m69shopfs = new Merchant(new MerchantType("factoryMerchant1","69shopfs",
    Merchant.templateParams.factoryMerchant1),'69shopfs');

//<editor-fold desc="jj-fashion">
var mJj_fashion= new Merchant("jj-fashion",'jj-fashion');
    mJj_fashion.onLoad= function(){
        var div = $(this.myHTML())[0];
        document.getElementsByClassName('goods_xz')[0].appendChild(div);
    }
    mJj_fashion.getItemId=function(){
        if(document.getElementsByName("id")[0]){
            return document.getElementsByName("id")[0].value;
        }else{
            return 0;
        }
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
        return $("#ECS_FORMBUY h3").text().trim();
    }
    mJj_fashion.getItemImage=function(){
        return ($("#mp")[0].src);
    }
    mJj_fashion.getQuantity=function(){

        var v=$("#number_"+this.getItemId());
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
    $.extend(true,{},Merchant.templateParams.factoryMerchant1,{getColorSizeName:"sx1list"})),'charm-dress');
var mBaobaopifa = new Merchant(new MerchantType("factoryMerchant1","baobaopifa",
    {
        getItemTitle:".ProName",
        getItemImage:".picture img",
        getPrice:".f_price",
        getQuantity:"[name=productnum]"
    }),'baobaopifa');
    mBaobaopifa.onLoad=function(){
        $("[name=form1]").prepend(this.myHTML());
        $("#DetailBox #RBox #RItem #TContent").css({height:'auto'})
    }
onload();