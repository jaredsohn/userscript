// ==UserScript==
// @name        totaobao2
// @namespace   http://www.toozan.com/
// @description fast copy
// @version     0.1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_openInTab
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @include     http://www.toozan.com/wp-admin/post-new.php
// @include     http://*.taobao.com/*
// @include     http://*.tmall.com/*
// @include     http://*.kiees.com/?p=*
// @include     http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey*
// @include     http://service.weibo.com/share/share.php*
// @include     http://share.renren.com/share/*
// @include     http://www.kaixin001.com/rest/*
// @include     http://www.toozan.com/wp-admin/post.php*

// @run-at document-end
// ==/UserScript==


function closeWin(){
    window.open('', '_self', '');
    window.opener = null;
	window.close();
}

// url http://www.kiees.com/?p=171410
var rUrl = /^http:\/\/www\.kiees\.com\/\?p=\d+$/;

if(rUrl.test(window.location.href)){
	// 相关数据信息
	var oPost = jQuery('.postsingle'),
		sTitle = oPost.find('h3').text(),
		sSubTitle = oPost.find('h3 span').text(),
		sTitle = sTitle.replace(sSubTitle,''),
		sContent = jQuery('.entry-content').html(),
		//sContent = jQuery('.entry-content > p:eq(0)').html(),
		regA = /<a[^>]*?>([\w\W]*?)<\/a>/g;

	sContent = sContent.replace(regA,'$1');
	sContent = sContent.replace('发现值得买','').replace('www.kiees.com','').replace('发现值得买kiees.com','').replace(/class="[^"]*"/,'');
	sContent = sContent.replace(/<img[^>]*?>/g,'')
	
	console.log(sTitle);
	console.log(sSubTitle);
	console.log(sContent);


	var sKiees = {
		'title' :jQuery.trim(sTitle),
		'subTitle' : jQuery.trim(sSubTitle),
		'content' : jQuery.trim(sContent)
	};

	GM_setValue('data-kiees',JSON.stringify(sKiees));
    
	window.location.href = jQuery('.single_gobuy a').attr('href').replace('d.php?no=','');
}



// 跳转到tmall商品页
var toSearch = 'http://u.alimama.com/union/spread/selfservice/merchandisePromotion.htm?cat=&mid=&searchType=&q=';
if(function(a) { var b = /tmall.com/i,d = /taobao.com/i;return b.test(a) && /(id=|item_id)/i.test((a.search)) || d.test(a) && /(id=\d|item_id=\d)/i.test((a.search));}(location)){
	var regSpace = /\s+/,
		strKey = document.querySelector('.tb-detail-hd').getElementsByTagName('h3')[0].textContent,
		sSearch = strKey.replace(regSpace,'');
	//console.log(sSearch);
	//alert(sSearch)	
    
    
    var aPic = [],
		sKey = ['.jpg','.gif'];
		sJpgLen = sKey[0].length,
		sGifLen = sKey[1].length;
    
    
    Array.prototype.slice.call(document.getElementById('J_UlThumb').getElementsByTagName('img')).forEach(function(i){
     //aPic.push(i.src.replace('_60x60.jpg',''));
	    if(i.src){
            if(i.src.search(sKey[1]) != -1){
               aPic.push(i.src.substring(0,i.src.search(sKey[1])+sGifLen));
            } else {
			   aPic.push(i.src.substring(0,i.src.search(sKey[0])+sJpgLen));	
			}			
        } else {
			if(i.dataset.src.search(sKey[1]) != -1){
               aPic.push(i.dataset.src.substring(0,i.dataset.src.search(sKey[1])+sGifLen));
            } else {
			   aPic.push(i.dataset.src.substring(0,i.dataset.src.search(sKey[0])+sJpgLen));	
			}
        }
    });
    GM_setValue('data-tmallpic',JSON.stringify(aPic));
    //alert(JSON.parse(JSON.stringify(aPic)));
	
    
    
    GM_openInTab('http://www.toozan.com/wp-admin/post-new.php');
    window.location.href = toSearch + sSearch;
}


// http://www.toozan.com/wp-admin/post-new.php
// 标题
var rUrltoozan = /^http:\/\/www\.toozan\.com\/wp-admin\/post-new\.php$/; 

if(rUrltoozan.test(window.location.href)){

	var oDiv = jQuery("<div/>").css({"width":"100px",
									"padding-bottom":"10px",
									"position":"fixed",
									"right":"0",
									"top":"55%",
									//"background-image":"linear-gradient(#ffffff,#ecf1f7)",
                                     "background":"green",
									"border":"1px solid #b7c3d7",
									"border-radius":"6px",
									"box-shadow":"0 -2px 0 rgba(58, 78, 103, 0.08) inset, 0 2px 0 rgba(190, 210, 230, 0.5)",
									"z-index":999999,
									"text-align":"center"
	});


	var btn = document.createElement("button");
			btn.type = "button";
			btn.innerHTML = "粘贴订单信息";
			
			jQuery(btn).css({
					//"background":"-moz-linear-gradient(center top , #93C85E 30%, #55A802 55%) repeat scroll 0 0 transparent",
                	"background":"blue",
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
			
		//btn.onclick = function(){
			
			//alert(GM_getValue('data-kiees'));
			var getDate = '';

			if(GM_getValue('data-kiees')){
			
				 getDate = JSON.parse(GM_getValue('data-kiees'));
				 console.log(getDate);

             
             
                 var oArr = ['天猫包邮','天猫拍下包邮','天猫拍下改包邮','淘宝拍下包邮','淘宝拍下改包邮','拍下包邮'],
                	sTitle = getDate.title,
                	sSubTitle = getDate.subTitle,
                	oRegExp01 = null,
                	str = '',
                	sKey = '';
                
                oArr.forEach(function(v,i){
                   if(i == oArr.length-1){
                       str += '('+v+')';
                   } else {
                        str += '('+v+')|';
                   } 
                });
                
                oRegExp01 = new RegExp(str,'g');
                
                //alert(oRegExp01.source);
                oRegExp01.test(sTitle);
                
                
                function findKey(obj){
                	var i = 1;
                	for(i = 1; i <= obj.length; i++) {
                		
                			if(RegExp['$'+i]){
                			    return obj[i-1];
                			}	
                	}
                	return '';
                }
                
                //alert(findKey(oArr));
                
                sKey = findKey(oArr);
                
                if(sKey){
                	sTitle = sTitle.replace(sKey,'');
                	sSubTitle = sKey.replace('包邮','')+ sSubTitle + '包邮';
                } else {
                    // 保险设置
                    sTitle = getDate.title;
                    sSubTitle = getDate.subTitle;
                }

			jQuery('#title').val(sTitle);
			
			// 标题醒目的红色
			jQuery('#_red_title').val(sSubTitle);
		
			// 内容
            
             var sPic = [];   
            if(GM_getValue('data-tmallpic')){
                var sPicHTML = '';
                //alert(GM_getValue('data-tmallpic'));
               		sPic = GM_getValue('data-tmallpic');
                	sPic = JSON.parse(sPic);
                	
                sPic.forEach(function(i){
                	 sPicHTML += '<img src="'+i+'"/><br/>';
                });
            }    
			
			
			
			jQuery('#publish').bind('click',function(){
				
				if(this.value == '发布') {
					var pageLink = jQuery('#sample-permalink').text();
					if(pageLink!=''){
						
						//GM_openInTab('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+encodeURIComponent(pageLink)+ '&title='+encodeURIComponent(getDate.title + getDate.subTitle)+'&pics='+encodeURIComponent(sPic[0]));
						//GM_openInTab('http://service.weibo.com/share/share.php?url='+encodeURIComponent(pageLink)+'&title='+encodeURIComponent(getDate.title + getDate.subTitle));
						//GM_openInTab('http://share.renren.com/share/buttonshare.do?link='+encodeURIComponent(pageLink)+'&title='+encodeURIComponent(getDate.title + getDate.subTitle));
						//GM_openInTab('http://www.kaixin001.com/rest/records.php?url='+encodeURIComponent(pageLink)+'&style=11&content='+encodeURIComponent(getDate.title + getDate.subTitle)+'&stime=&sig=');
						
						
						
						//GM_openInTab('http://widget.renren.com/dialog/share?resourceUrl='+encodeURIComponent(pageLink)+'&srcUrl='+encodeURIComponent(pageLink)+'&title='+encodeURIComponent(getDate.title + getDate.subTitle)+'&description='+encodeURIComponent(getDate.content));
						
							
					}
				}
			});
			
                
            //alert(sPicHTML);    
			jQuery('#content').val(getDate.content + sPicHTML);
			
			//jQuery('#taourl').focus();
			
			//var sCate = window.prompt("请输入分类");
                var sCate = '食品饮料';
			
			if(sCate) {
				var regCheckbox = new RegExp(sCate),
					i = 0,
					len = jQuery('#categorychecklist > li').length,
					str = '',
					obj = null;
				
				for(; i < len; i++)
				{
					obj = jQuery('#categorychecklist > li:eq('+i+')');
					str = obj.text();
					if(regCheckbox.test(str)){
						jQuery('#categorychecklist > li:eq(0)').find('input[type="checkbox"]')[0].checked = false;
						obj.find('input[type="checkbox"]')[0].checked = true;
						break;
					}		
				}
			}
			
			var oMall = jQuery('#mallchecklist > li'),j = 0;
            for(;j<oMall.length;j++){
                if(/天猫/.test(oMall.eq(j).text())){
                     oMall.eq(j).find('input:checkbox')[0].checked = true;
                     break;
                }
            }

			} else {
                //alert('no product');
			}

			GM_deleteValue("data-kiees");
			GM_deleteValue("data-tmallpic");
                        document.getElementById('content-tmce').click();
			
			setTimeout(function(){
			 document.getElementById('content-html').click();
			},1e3);
            
			
		//}
		//oDiv.appendTo(jQuery(document.body)).append(btn);
}


if(/^http:\/\/sns\.qzone\.qq\.com\/cgi-bin\/qzshare\/cgi_qzshare_onekey[\s\S]*/.test(location.href)){
	document.getElementById('shareWeibo').click();
	setTimeout(function(){
		document.getElementById('postButton').click();
	},6e3);	
}


if(/^http:\/\/service\.weibo\.com\/share\/share\.php[\s\S]*/.test(location.href)){
    setTimeout(function(){
        if( document.getElementsByClassName('weibo_img').length > 0 && document.getElementsByClassName('weibo_img')[0].src != ''  )
        {
           setTimeout(function(){
                document.getElementById('shareIt').click();	
    	   },1e3);	
        } else {
           window.location.reload();
        }
    },3e3);
}

if(/^http:\/\/share\.renren\.com\/share\/buttonshare\.do[\s\S]*/.test(location.href)){
    if(document.getElementById('shareLinkPicbox') && document.getElementById('shareLinkPicbox').src!='' ) {
        
        setTimeout(function(){
            document.getElementsByClassName('input-submit')[0].click();
        },2e3);
        
    } else {
        window.location.reload();
    }
}


//if(/^http:\/\/widget\.renren\.com\/dialog\/share[\s\S]*/.test(location.href)){
//	setTimeout(function(){
//		document.getElementById('shareBtn').click();	
//	},5e3);		
//}

if(/^http:\/\/www\.kaixin001\.com\/rest\/records\.php[\s\S]*/.test(location.href)){

    if(document.getElementById('zpList') && document.getElementById('zpList').getElementsByTagName('img').length > 0){
        setTimeout(function(){
    		jQuery('.btn_yes').find('input:submit').click();
    	},1e3);
    } else {
        window.location.reload();
    }
			
}

//if(/^http:\/\/www\.kaixin001\.com\/rest\/records_submit\.php/.test(location.href)){
//	setTimeout(function(){
//		window.opener=null;window.close();
//	},3e3);		
//}


if(/^http:\/\/www\.toozan\.com\/wp-admin\/post\.php[\s\S]*/.test(location.href)){
	closeWin()
}