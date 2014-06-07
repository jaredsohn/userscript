// ==UserScript==
// @name                OrderForStaff
// @namespace	        http://nhaphang.com
// @description	        OrderForStaff- Công cụ tối ưu đặt hàng trên các site Trung Quốc
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
// @include		http://mofayichu.q88e.net/shop_*Products.aspx*
// @include		http://www.mofayichu.q88e.net/shop_*Products.aspx*
// @include		http://www.5taobao.net/shop_*Products.aspx*
// @include		http://www.5taobao.net/shop_*products.aspx*
// @include		http://www.chenxifushi.com/shop_*products.aspx*
// @include		http://www.chenxifushi.com/shop_*Products.aspx*
// @include		http://www.lelefushi.com/SHOP_*products.aspx*
// @include		http://www.lelefushi.com/SHOP_*Products.aspx*
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
// @include		http://eeshow.q88a.net/shop_*products.aspx*
// @include		http://eeshow.q88a.net/shop_*Products.aspx*
// @include		http://www.charm-dress.com/SHOP_*products.aspx*
// @include		http://www.charm-dress.com/SHOP_*Products.aspx*

// ==/UserScript==
	
	function getHostname() {
		var url = window.location.href;  
		url = url.replace("http://", "");   
		  
		var urlExplode = url.split("/");  
		var serverName = urlExplode[0];
		
		return serverName;
	}
	function addIframe()
	{
		var iframe = document.createElement('iframe');
		//iframe.style.display = "none";
		iframe.height = 0;
		iframe.width = 0;
		iframe.src = 'http://nhaphang.com';
		document.body.appendChild(iframe);
	}
	function addVersion(url)
	{
		return url+'&version=02032012';
	}
	//ham xu lý gia trong truong hop nguoi dung su dung chuc nang tu dong dich cua Chrome
	function processPrice(price)
	{
		if(price.indexOf(',')>0)
		{
			var p=String(price).replace('.','');
			p=p.replace(',','.');
			return parseFloat(p);
		}
		else
			return parseFloat(price);
	}
	function taobao(cart_url)
	{
		function addGlobalStyle(css) {
			  var head, style;
			  head = document.getElementsByTagName('head')[0];
			  if (!head) { return; }
			  style = document.createElement('style');
			  style.type = 'text/css';
			  style.innerHTML = css;
			  head.appendChild(style);
		}
		// Cross-browser implementation of element.addEventListener()
		function addListener(element, type, expression, bubbling)
		{
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
		
		function getPriceTaobao()
		{
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
		function getCookie(c_name)
		{
			var i,x,y,ARRcookies=document.cookie.split(";");

			for (i=0;i<ARRcookies.length;i++)
			{
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
				if (x==c_name)
				{
					return unescape(y);
				}
			}
		}
		//ham lay comment
		function getComment()
		{
			if(document.getElementById("txtBz")!=null)
				return encodeURIComponent(document.getElementById("txtBz").value);
			else return '';
		}
		function getLink()
		{
			var src = 'http://nhaphang.com/nhaphang_order.gif';
			var href = cart_url;
			  
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
			
			var rate=rateMoney();
			var price_taobao=getPriceTaobao();
			var price_result = Math.ceil(price_taobao * rate);
			var item_price=price_taobao;
			  
			var element =document.getElementsByName("seller_num_id");
			if(element.length>0)
			{
				element=element[0];
				var seller_id=element.value;
			}else var seller_id=0;

			var element =document.getElementById("J_IptAmount");
			if(element)
			{
				var quantity=element.value;
			}else var quantity=''; 

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
			  
			  if(selected_props.length>0)
			  {
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
					
			// return href+params;
			  return addVersion(params);
		}
		function linkHover()
		{
			var href=getLink();
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
					addListener(document.getElementById("id_nhaphang_add_cart"), 'click', linkClick);
				}
			}
			//alert(getLink());
			self.xmlHttpReq.send(getLink());
		}
		function getquerystring() {
			var form     = document.forms['f1'];
			var word = form.word.value;
			qstr = 'w=' + escape(word);  // NOTE: no '?' before querystring
			return qstr;
		}
		
		function updatepage(str){
			//alert(str);
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
		function linkClick()
		{
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
				document.getElementById("id_nhaphang_add_cart").setAttribute('target',"_blank");
			else 
			{
				document.getElementById("id_nhaphang_add_cart").setAttribute('target',"");
				alert("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
				document.getElementById("id_nhaphang_add_cart").setAttribute('href','javascript:void(0);');
				return ;
			}
			
			//document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
			document.getElementById("id_nhaphang_add_cart").setAttribute('href','javascript:void(0)');
			document.getElementById("id_nhaphang_add_cart").setAttribute('target',"");
			
			xmlhttpPost(cart_url);
		}
		this.htmlOnLoad=function ()
		{
			if(document.getElementById("J_IptAmount")==null || document.getElementById("J_IptAmount")=='undefined')
			{
				return;
			}
			var href=getLink();
						
			var src = 'http://nhaphang.com/nhaphang_order.gif';
			var rate=rateMoney();
			var price_taobao=getPriceTaobao();
			var price_result = Math.ceil(price_taobao * rate);

			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
			var com_text='<div><span style="width:50px;">Mô tả：</span><textarea cols="60" id="txtBz" name="txtBz"></textarea></div>';
			var s = '<li class="clearfix" id="gia-tinphat" style="height: 100px; border: 2px solid blue;padding-top:10px">' +com_text+
				'<div class="xbTipBlock tahoma"><div style="width:100%;float:right">' +
			'<span style="font-weight:bold;color: blue;width: 195px; font-size: 24px;line-height:40px;" id="tinphat-price">' + (price_result) + ' VNĐ</span> <div style="float:right;" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img src="' + src + '" alt="" /></a></div></div></div></li>'+
			'';
		  
			var div = document.createElement('div');
			div.innerHTML = s;

			document.getElementById('J_StrPriceModBox').parentNode.insertBefore( div.firstChild , document.getElementById('J_StrPriceModBox').nextSibling );
			//add cac su kien
			addListener(document.getElementById("id_nhaphang_add_cart"), 'mouseover', linkHover);
			addListener(document.getElementById("id_nhaphang_add_cart"), 'click', linkClick);
		}
	}
	function alibaba(cart_url)
	{
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
			if(document.getElementById("txtBz")!=null)
				return encodeURIComponent(document.getElementById("txtBz").value);
			else return '';
		}
		//ham lay thong tin color_size_name
		function getColorSizeName()
		{
			var stocks=document.getElementsByClassName('d-sku');
			var stocks_amount=stocks.length;
			
			var buyArea=document.getElementsByClassName("d-sku-box");
			if(buyArea==null) return '';
			buyArea=buyArea[0];
			
			var color_size_name='';
			if(stocks_amount>0)
			{
				var selects = buyArea.getElementsByClassName('d-selected');
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
			}
			return encodeURIComponent(color_size_name);
		}
		function getSellerId()
		{
			var element =document.getElementsByName("sellerId");
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
		function getItemTitle()
		{
			var element =document.getElementsByName("offerTitle");
			
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
			var element =document.getElementById("de-pic-310310");
			
			if(element!=null)
			{
				var item_image=element.getAttribute('src');
			}else var item_image='';
			
			return encodeURIComponent(item_image);
		}
		//ham lay item_link cua san pham
		function getItemLink()
		{
			var element =document.getElementsByName("urlFrom");
			
			if(element.length>0)
			{
				element=element[0];
				var item_link=element.value;
			}else var item_link='';
			
			return encodeURIComponent(item_link);
		}
		//hàm lấy số lượng mua
		function getQuantity()
		{
			return document.getElementById("J_AmountInput").value;
		}
		
		//hàm lấy giá TQ của sản phẩm dựa vào số lượng mua
		function getPrice()
		{
			var quantity =getQuantity();
			var price=0;
			var span_price=document.getElementById('dt-sku-price');
			if(span_price!=null)
			{
				price=span_price.textContent;
				return processPrice(price);
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
						
			//duyệt qua các mức giá
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
							var textPrice=td_prices[i+1].getElementsByTagName("span");
							
							textPrice=textPrice[0].textContent
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
							//alert(prices[0]+':'+prices[1]);	
							//lấy giá ở td bên phải
							var textPrice=td_prices[i+1].getElementsByTagName("span");
							textPrice=textPrice[0].textContent
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
		function getAllowedMinQuantity()
		{
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
		//hàm lấy bảng giá
		function getPriceTable()
		{
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
					var textPrice=td_prices[i+1].getElementsByTagName("span");
					textPrice=textPrice[0].textContent;
					
					if(price_table=='')
						price_table+=str+':'+processPrice(textPrice);
					else price_table+=';'+str+':'+processPrice(textPrice);
				}
			}
			return encodeURIComponent(price_table);
		}
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			//var price_result = getVNDPrice(price_taobao);
			var item_price=price_taobao;
			//lay ban gia
			var price_table = getPriceTable();
			//lấy seller_id	
			var seller_id=getSellerId();
			var seller_name=seller_id;
			//lấy số lượng
			var quantity=getQuantity();
			//lấy màu sắc
			var color=getColor();
			 //lay comment
			var comment= getComment();	
			//lấy kích thước
			var size=getSize();
			
			// lay color_size_name
			var color_size_name=getColorSizeName();
			
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
			  return addVersion(params);
		}
		function linkHover()
		{
			var href=getLink();
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
		}
		function linkClick()
		{
			var href=getLink();
			
			var full=true;
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
				alert("Bạn chưa chọn đầy đủ thuộc tính sản phẩm!");
				document.getElementById("id_nhaphang_add_cart").setAttribute('href','javascript:void(0);');
				return ;
			}
			if(parseInt(min)>0 && parseInt(min)>parseInt(quantity))
			{
				alert("Số lượng sản phẩm không được bé hơn "+min+"!");
				document.getElementById("id_nhaphang_add_cart").setAttribute('href','javascript:void(0);');
				return ;
			}
			
			document.getElementById("id_nhaphang_add_cart").setAttribute('href','javascript:void(0)');
			document.getElementById("id_nhaphang_add_cart").setAttribute('target',"");
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
			if(document.getElementById("J_AmountInput")==null || document.getElementById("J_AmountInput")=='undefined' )
			{
				return;
			}
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);
			var com_text='<div><span style="width:50px;">Mô tả：</span><textarea cols="64" id="txtBz" name="txtBz"></textarea></div>';
			var s = '<div class="g-group-member" style="height: 100px; border: 2px solid blue;padding-top:10px">'+com_text+'<div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 24px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;

			document.getElementById('J_ModTrade').parentNode.insertBefore( div.firstChild , document.getElementById('J_ModTrade') );
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
			document.getElementById("J_AmoutUp").addEventListener( 'click', quantityOnBlur);
			document.getElementById("J_AmoutDown").addEventListener( 'click', quantityOnBlur);
		};
	}
	function paipai(cart_url)
	{
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
			if(document.getElementById("txtBz")!=null)
				return encodeURIComponent(document.getElementById("txtBz").value);
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
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			var comment=getComment();
			
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
			  return addVersion(params);
		}
		function linkHover()
		{
			var href=getLink();
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);
			var com_text='<div><span style="width:50px;">Mô tả：</span><textarea cols="62" id="txtBz" name="txtBz"></textarea></div>';
			var s = '<div class="g-group-member" style="height: 100px; border: 2px solid blue;padding-top:10px">'+com_text+'<div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 24px;float:left;" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;

			document.getElementById('buyArea').parentNode.insertBefore( div.firstChild , document.getElementById('buyArea') );
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	function mofayichu(cart_url)
	{
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
			var frm=document.getElementById("Form1");
			var element = frm.getElementsByTagName("img");
	
			if(element!=null)
			{
				element=element[1];
				var item_image=element.getAttribute('src');
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
			return document.getElementById("sl1").value;
		}
		//hàm lấy giá TQ của sản phẩm
		function getPrice()
		{
			var element =document.getElementById("Label5");
			
			if(element!=null)
			{
				//var item_price=element.textContent.match(/\d+/);
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return processPrice(item_price);
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:8px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "2");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			//document.getElementById('Tr3').parentNode.insertBefore( '<tr><td colspan="2">'+div.firstChild +'</td></tr>', document.getElementById('Tr3') );
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function _5taobao(cart_url)
	{
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
			return document.getElementById("sl1").value;
		}
		//hàm lấy giá TQ của sản phẩm
		function getPrice()
		{
			var element =document.getElementById("Label5");
			
			if(element!=null)
			{
				//var item_price=element.textContent.match(/\d+/);
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return processPrice(item_price);
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "4");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function chenxifushi(cart_url)
	{
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
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "4");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function lelefushi(cart_url)
	{
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
			var element =document.getElementById("Product_main1_Product_top21_Label5");
			
			if(element!=null)
			{
				//var item_price=element.textContent.match(/\d+/);
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			//td.setAttribute("colspan", "2");
			row.appendChild(td);
			
			document.getElementById('Product_main1_Product_top21_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function yilanfushi(cart_url)
	{
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
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "4");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function shmoyu(cart_url)
	{
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
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "4");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function yiranmeifushi(cart_url)
	{
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
			//	element=element[1];
				var item_image=element.getAttribute('src');
			}else var item_image='';
			
			return encodeURIComponent('http://www.yiranmeifushi.com/'+item_image);
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
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
		function linkHover()
		{
			var href=getLink();
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "4");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function yiwenfushi(cart_url)
	{
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
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "4");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function rihanfushi(cart_url)
	{
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
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			//td.setAttribute("colspan", "2");
			row.appendChild(td);
			
			document.getElementById('Product_main1_Product_top11_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function chengzifs(cart_url)
	{
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
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			//td.setAttribute("colspan", "2");
			row.appendChild(td);
			
			document.getElementById('Product_main1_Product_top11_Label5').parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function _69shopfs(cart_url)
	{
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
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			
			var price_result = getVNDPrice(price_taobao);
			
			if(parseInt(price_result)==0)
			return ;

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "4");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function jj_fashion(cart_url)
	{
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
			if(document.getElementById("txtBz")!=null)
				return encodeURIComponent(document.getElementById("txtBz").value);
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
			var element =document.getElementsByName("id");
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
				var list=frm.getElementsByTagName('h3');
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
				var item_image=element.getAttribute('src');
			}else var item_image='';
			
			return encodeURIComponent('http://jj-fashion.com/'+item_image);
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
			
			return document.getElementById("number_"+item_id).value;
		}
		//hàm lấy giá TQ của sản phẩm
		function getPrice()
		{
			var element =document.getElementById("ECS_RANKPRICE_2");
			
			if(element!=null)
			{
				//var item_price=element.textContent.match(/\d+/);
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			
			  var params='type=jj-fashion';
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
			var block_frm=document.getElementsByClassName("goods_xz");
			block_frm=block_frm[0];
			var count_all=block_frm.getElementsByClassName("godds_yanse").length;
			var count_selected=block_frm.getElementsByClassName("sel").length;
			if(count_all>0 && count_all>count_selected)
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);
			var com_text='<div><span style="width:20px;margin-right:40px">Mô tả：</span><textarea cols="35" id="txtBz" name="txtBz"></textarea></div>';
			var s = '<div class="g-group-member" style="height: 100px; border: 2px solid blue;">'+com_text+'<div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
		
			document.getElementsByClassName('goods_xz')[0].appendChild( div);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function shanghai(cart_url)
	{
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
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "4");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function eeshow(cart_url)
	{
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
			return document.getElementById("sl1").value;
		}
		//hàm lấy giá TQ của sản phẩm
		function getPrice()
		{
			var element =document.getElementById("Label5");
			
			if(element!=null)
			{
				//var item_price=element.textContent.match(/\d+/);
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);

			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "4");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	function charm_dress(cart_url)
	{
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
				var item_price=element.textContent.match(/[0-9]+[\.]?[0-9]+/g);
			}else var item_price='';
			
			return item_price;
	 
		}
		
		//hàm lấy giá VND dựa vào giá TQ
		function getVNDPrice(price_taobao)
		{
			var rate=rateMoney();
			var price_result = price_taobao * rate;
			price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
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
			
			var beforeHtml= document.getElementById("block_button").innerHTML;
			document.getElementById("block_button").innerHTML='<img style="margin-top:12px;margin-right:50px" src="http://nhaphang.com/frontend/images/ajax-loader.gif" alt="" />';
			self.xmlHttpReq.open('POST', strURL, true);
			self.xmlHttpReq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			self.xmlHttpReq.withCredentials = "true";

			self.xmlHttpReq.onreadystatechange = function() {
				if (self.xmlHttpReq.readyState == 4) {
					updatepage(self.xmlHttpReq.responseText);
					document.getElementById("block_button").innerHTML=beforeHtml;
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
			document.getElementById("id_nhaphang_add_cart").setAttribute('href',href);
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
		this.htmlOnLoad=function ()
		{
			var href=getLink();
							
			var src = 'http://nhaphang.com/nhaphang_order.gif';

			var price_taobao=getPrice();
			var price_result = getVNDPrice(price_taobao);
			if(parseInt(price_result)==0)
			return ;
			
			var s = '<div class="g-group-member" style="height: 40px; border: 2px solid blue;"><div class="clr" style="width:100%;float:right">';
			s +='<div><span style="float:right;margin-top:2px" id="block_button"><a id="id_nhaphang_add_cart" href="' + href + '"><img width="200" height="30" src="' + src + '" alt="" /></a></span>&nbsp;<span style="font-weight:bold;color: blue; font-size: 17px;float:left;margin-top:10px" id="hangnhap-price">'+(price_result)+' VNĐ</span> </div>';

			s +='</div></div>';
		  
			var div = document.createElement('div');
			div.innerHTML = s;
			
			var row = document.createElement("TR");
			var td = document.createElement("TD");
			td.innerHTML=s ;
			td.setAttribute("colspan", "4");
			row.appendChild(td);
			
			document.getElementById('Tr3').parentNode.appendChild( row);
			
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'mouseover', linkHover);
			document.getElementById("id_nhaphang_add_cart").addEventListener( 'click', linkClick);
		};
	}
	
	var host=getHostname();
	var ex=null;
	
	var url="http://nhaphang.com/cart_taobao?";
	//var url="http://192.168.1.100/checkout/nhaphang/public_html/cart_taobao?";
	//taobao
	if(host.indexOf('taobao')!=-1 || host.indexOf('tmall')!=-1)
	{
		ex=new taobao(url);
	}
	//alibaba
	if(host.indexOf('alibaba')!=-1)
	{
		ex=new alibaba(url);
	}
	//paipai
	if(host.indexOf('paipai')!=-1)
	{
		ex=new paipai(url);
	}
	//mofayichu
	if(host.indexOf('mofayichu')!=-1)
	{
		ex=new mofayichu(url);
	}
	//5taobao
	if(host.indexOf('5taobao')!=-1)
	{
		ex=new _5taobao(url);
	}
	//chenxifushi
	if(host.indexOf('chenxifushi')!=-1)
	{
		ex=new chenxifushi(url);
	}
	//lelefushi
	if(host.indexOf('lelefushi')!=-1)
	{
		ex=new lelefushi(url);
	}
	//yilanfushi
	if(host.indexOf('yilanfushi')!=-1)
	{
		ex=new yilanfushi(url);
	}
	//shmoyu
	if(host.indexOf('shmoyu')!=-1)
	{
		ex=new shmoyu(url);
	}
	//yiranmeifushi
	if(host.indexOf('yiranmeifushi')!=-1)
	{
		ex=new yiranmeifushi(url);
	}
	//yiwenfushi
	if(host.indexOf('yiwenfushi')!=-1)
	{
		ex=new yiwenfushi(url);
	}
	//rihanfushi
	if(host.indexOf('rihanfushi')!=-1)
	{
		ex=new rihanfushi(url);
	}
	//chengzifs
	if(host.indexOf('chengzifs')!=-1)
	{
		ex=new chengzifs(url);
	}
	//69shopfs
	if(host.indexOf('69shopfs')!=-1)
	{
		ex=new _69shopfs(url);
	}
	//jj-fashion
	if(host.indexOf('jj-fashion')!=-1)
	{
		ex=new jj_fashion(url);
	}
	//shanghai
	if(host.indexOf('shanghai')!=-1)
	{
		ex=new shanghai(url);
	}
	//eeshow
	if(host.indexOf('eeshow')!=-1)
	{
		ex=new eeshow(url);
	}
	//charm-dress
	if(host.indexOf('charm-dress')!=-1)
	{
		ex=new charm_dress(url);
	}
	
	ex.htmlOnLoad();
	//addIframe();