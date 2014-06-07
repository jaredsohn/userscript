// ==UserScript==
// @name                NhapHangCompany
// @namespace	        http://nhaphang.com
// @description	        NhapHangCompany- Công cụ tối ưu đặt hàng trên taobao
// @include		http://item.taobao.com/*
// @include		http://auction.taobao.com/*
// @include		http://item.tmall.com/*
// @include		http://detail.tmall.com/*
// @require    http://nhaphang.com/js/base64.js
// ==/UserScript==

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
		return 3450;
	} 
    addGlobalStyle('.tahoma { font-family: tahoma,arial,verdana ! important; }');
	function getPriceTaobao()
	{
		var p_e=document.getElementById('J_StrPrice');
		
		//kiểm tra nếu có giảm giá thì lấy giảm giá
		if( p_e.className.indexOf('tb-unvalid')!=-1)
		{
			var pr=document.getElementsByClassName('tb-lowest')[0];
		//	p_e=document.getElementsByClassName('tb-price');
			p_e=pr.getElementsByClassName('tb-price');
			p_e=p_e[p_e.length-1];
		}
		if(document.getElementById('J_SpanLimitProm')!=null && document.getElementById('J_SpanLimitProm')!='undefined')
		{
			p_e=document.getElementById('J_SpanLimitProm');
		}
		var webprice_text = p_e.innerHTML;
		webprice_text = parseFloat(webprice_text);
		var price_taobao=(webprice_text + additionPrice());
		
		return price_taobao;
	}

	function getLink()
	{
		var src = 'http://nhaphang.com/nhaphang_order.gif';
		var href = 'http://nhaphang.com/cart_taobao?';
	  
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
		  if(selected_props.length>0)
		  {
			 for(var i=0;i<selected_props.length;i++)
			 {
				var ele=selected_props[i];
				var prop_str=ele.getAttribute("data-value");
				if(prop_str != null && prop_str.length>0)
				{
					max_p++;
					p_params+='&p'+max_p+'='+prop_str;
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
			
		  if(parseInt(amount)>0)
			params+='&amount='+amount;

		  if(max_p>0)
			{
				params+=p_params;
			}
				
		// return href+params;
		  return params;
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
		xmlhttpPost("http://nhaphang.com/cart_taobao");
		
	}
	function htmlOnLoad()
	{
		var href=getLink();
					
		var src = 'http://nhaphang.com/nhaphang_order.gif';
		var rate=rateMoney();
		var price_taobao=getPriceTaobao();
		var price_result = Math.ceil(price_taobao * rate);

		price_result = String(price_result).replace(/^\d+(?=.|$)/, function (int) { return int.replace(/(?=(?:\d{3})+$)(?!^)/g, "."); });
	  
		var s = '<li class="clearfix" id="gia-tinphat" style="height: 40px; border: 2px solid blue;">' +
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
	//setTimeout(function(){htmlOnLoad();}, 4000);
	window.addEventListener("load", function() {htmlOnLoad();}, false);