// ==UserScript==
// @name        订单粘贴工具
// @description Jiaju Web Tools
// @include     http://*.jiaju.com/*
// @require     http://static.jiaju.com/jiaju/com/js/dojquery-s-min.js
// @version     0.1
// ==/UserScript==


var iconLoading = "data:image/gif;base64,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";
		
function findParent(obj){
	var obj = obj.parentNode;
	
	if(obj.nodeName == "TR") {
		return obj;	
	}
	while(obj){
		if(obj.nodeName == "TR") {
			return obj;	
		}
		obj = obj.parentNode;	
	}
}

function fnEmpty(){
	GM_setValue('info0','');
	GM_setValue('info1','');
	GM_setValue('info2','');
	GM_setValue('info3','');
	GM_setValue('info4','');
	GM_setValue('info5','');
	GM_setValue('info6','');
	console.log("removeOK");
}

function setInfo(btn) {
    
    var consignee = GM_getValue("info0"),
        tel_tel = GM_getValue("info1"),
        mobile = GM_getValue("info2"),
        address = GM_getValue("info3"),
        invoice = GM_getValue("info4"),
        messagebox = GM_getValue("info5"),
		postcode = GM_getValue("info6"),
        oErr =  $("#jsordercopyerror");
		
		
		if((consignee=='') && (tel_tel=='') && (mobile=='') && (address=='') && (invoice=='') && (messagebox=='')){
		      alert("请重新复制订单信息");
		      return false;
		}
		
		console.log(consignee);
		console.log(tel_tel);
		console.log(mobile);
		console.log(address);
		console.log(invoice);
		console.log(messagebox);
		console.log(postcode);
		
	   //oErr.empty();
	
   	   if($("#address").length > 0){
		   	if(address !=''){
       			$("#address").focus().val(address).blur();
	       		//oErr.append("<p>街道地址---OK</p>");
			}
   	   }
	   if($("#consignee").length > 0) {
		   	if(consignee !=''){
		   		$("#consignee").focus().val(consignee).blur();
		   		//oErr.append("<p>收获人姓名-OK</p>");
			}
	   }
       if($("#mobile").length > 0) {
		   	if(mobile !=''){
	       		$("#mobile").focus().val(mobile).blur();
    	   		//oErr.append("<p>手机-------OK</p>");
			}
   	   }
   	   if($("#tel_tel").length > 0) {
		   	if(tel_tel !=''){
	       		$("#tel_tel").focus().val(tel_tel).blur();
    	   		//oErr.append("<p>联系电话---OK</p>");
			}
   	   }
   	   if($(".orderRemark2").length > 0) {
		   	if(messagebox!=''){
				$('.orderRemark2').focus().val(messagebox).blur();
				//oErr.append("<p>给商家留言-OK</p>");
			}
   	   }
	   
	   if($("#postcode").length > 0){
		   	if(postcode !=''){
       			$("#postcode").focus().val(postcode).blur();
	       		//oErr.append("<p>邮编---OK</p>");
			}
   	   }
                                                 	
       fnInvoice(invoice);
              
	   btn.innerHTML = "粘贴订单信息<img src="+iconLoading+">";
	   
	   fnEmpty();
	   setTimeout(function(){
			btn.innerHTML = "粘贴订单信息";	
			alert("粘贴完成");
	   },3e3);
}

function fnInvoice(sVal) {
	var  oErr =  $("#jsordercopyerror");
	
	//假设不开发票
	sVal = $.trim(sVal);
	if(sVal == ''){
       return;
	} else if(sVal) {
	    if($('#invoContent').is(":hidden")){
			$('#getInvoice').click();
		}
			
		// 个人
		if(sVal == "个人") {
		
			// 单步执行 (索取发票) 个人
			setTimeout(function(){
				$("#person").click();
			},300);
			setTimeout(function(){
				$('#saveInvoice').click();
				//oErr.append("<p>索取发票-OK</p>");
			},400);
			
		// 公司抬头	
		} else if(sVal != '个人'){

	       setTimeout(function(){
	           $("#company").click();
	       },300);
		   setTimeout(function(){
		      $("#invoiceTxt").focus().val(sVal).blur();
		   },400);
		   setTimeout(function(){
		      $('#saveInvoice').click();
			  //oErr.append("<p>索取发票-OK</p>");
		   },500);
		   
		}
	} 
}



document.addEventListener("DOMContentLoaded",function(){
	
	if(window.location.href.indexOf("www.jiaju.com/o/trade/confirm")!=-1) {	
		var oDiv = $("<div/>").css({"width":"100px",
									"padding-bottom":"10px",
									"position":"fixed",
									"right":"0",
									"top":"55%",
									"background-image":"linear-gradient(#ffffff,#ecf1f7)",
									"border":"1px solid #b7c3d7",
									"border-radius":"6px",
									"box-shadow":"0 -2px 0 rgba(58, 78, 103, 0.08) inset, 0 2px 0 rgba(190, 210, 230, 0.5)",
									"z-index":999999,
									"text-align":"center"
		});
		
		var oError = $("<div/>").attr('id','jsordercopyerror').css({"padding":"20px 5px 0","color":"#f60","font-size":"12px","text-align":"left"});
		    oError.html("点击粘贴按钮后不要操作鼠标和键盘，以免造成数据粘贴失败。");
		
		var btn = document.createElement("button");
			btn.type = "button";
			btn.innerHTML = "粘贴订单信息";
			
			$(btn).css({
					"background":"-moz-linear-gradient(center top , #93C85E 30%, #55A802 55%) repeat scroll 0 0 transparent",
					"border-color":"#3A7404",
					"color":"#ffffff",
					"font-weight":700,
					"text-shadow":"0 -1px 0 #3A7404",
					"border-radius":"3px",
					"box-shadow":"0 0 2px rgba(255, 255, 255, 0.65) inset",
					"padding":"4px 12px 3px",
					"border-width":"1px",
					"position":"relative",
					"top":"15px",
					"cursor":"pointer"							
			});
			
		btn.onclick = function(){
			//this.innerHTML = "信息粘贴中...";
			
			setInfo(this);
			//fnEmpty();
		}
		oDiv.appendTo($(document.body)).append(btn).append(oError);
	}
	

	if(window.location.hostname.indexOf("admin.jiaju.com")!=-1) {	
		var btnArr = document.getElementsByClassName("js_btncopy"); 
		var i = 0;
		if(btnArr) {
			for(var len = btnArr.length; i < len; i++){
				btnArr[i].onclick = function(){
				    fnEmpty();
					var j = 0,arr = [],oItemArr=null,obj=null;
					
					obj = findParent(this).getElementsByClassName("js_capture")[0];
					if(obj) {
						oItemArr = obj.getElementsByTagName("div");
							for(var len = oItemArr.length; j < len; j++){	
								GM_setValue('info'+j,oItemArr[j].innerHTML);
							}
							alert("复制成功！");		
						
					}
					return false;				
				}	
			}
		}	
	}

	
},false);