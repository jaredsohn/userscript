// ==UserScript==
// @name        apple_genius
// @namespace   esayr
// @description auto submit genius
// @include     http://concierge.apple.com/geniusbar/*
// @include     https://concierge.apple.com/geniusbar/*
// @version     1
// ==/UserScript==

( function() {
/*
郑//飞红//280882977@qq.com//13380389493
张//瑞星//980281131@qq.com//13924648777
陈//骏//350017165@qq.com//13510997651
周//颖//3030861@qq.com//18038012117
伍//康//1046088255@qq.com//15920009607
陈//水萍//1351632415c@sina.cn
叶升//492281301qq.com//18038012117
*/
	var u_name_f='郑';//姓氏
	var u_name_l='飞红';//名字
	var u_mail='280882977@qq.com';//电子邮件
	var u_tel='13380389493';//电话

    var version="v 1.11 beta";
    function $(id) {
      return document.getElementById(id);
    }
    curl=window.location.href;
    if(curl.indexOf('timeslots')>-1)
    {
        /*
        if($('errorMessageC').innerHTML.indexOf('已满')>-1)
        {

            purl=curl.replace("/timeslots","");

            window.location.href=purl;
        }
        else{

			//$('timeslotNameC').click();

			window.setTimeout(function(){

			var allSpans, thisSpan;

			allSpans = document.getElementsByTagName('span');
			for (var i = 0; i < allSpans.length; i++) {
				 if(allSpans[i].id=='timeslotNameC'){
					//alert(allSpans[i].innerHTML);
					allSpans[i].parentNode.click();
					//allSpans[i].click();
					break;
				 }


			}},1000);
			//thisSpan.click();

			 window.onload=function(){
				$('fwdButtonC').click();
			}

		}
		*/

        if($('timeslotRepetitionC'))
        {
            //$('timeslotNameC').click();

			window.setTimeout(function(){

			var allSpans, thisSpan;

			allSpans = document.getElementsByTagName('span');

			console.log(allSpans.length);
			for (var i = 0; i < allSpans.length; i++) {
				 if(allSpans[i].id=='timeslotNameC'){
				    $('intervalNameC').click();
					console.log(allSpans[i].innerHTML);
					allSpans[i].parentNode.click();
					$('fwdButtonC').click();
					//allSpans[i].click();
					break;
				 }


			}},1000);
			//thisSpan.click();

			 window.onload=function(){
				//$('fwdButtonC').click();
			}
        }
        else{
		    GM_log('imya');
			purl=curl.replace("/timeslots","");
            window.location.href=purl;

		}

    }else if(curl.indexOf('iphone-support')>-1){
	//手机

        window.onload=function(){

			//深圳
			if(curl.indexOf('R484')>-1){
			    document.getElementsByClassName('btn_rect')[0].click();
			}
			else{
			    document.getElementsByClassName('btn_rect')[1].click();
			}

        }


	 }else if(curl.indexOf('signin')>-1){
	 //signin 填写资料

	 f=$('TheForm');

	 f.lastName.value=u_name_f;
	 f.lastName.focus();
	 f.lastName.blur();

	 f.firstName.value=u_name_l;
	 f.firstName.focus();
	 f.firstName.blur();

	 f.email.value=u_mail;
	 f.email.focus();
	 f.email.blur();

	 f.phoneNumber.value=u_tel;
	 f.phoneNumber.focus();
	 f.phoneNumber.blur();


	 window.onload=function(){

	    f.phoneNumber.focus();
		$('fwdButtonC').click();
	}


    }else if(curl.indexOf('reservationConfirmation')>-1){
	//成功

		alert(u_name_f+u_name_l+'预约成功');

		//reservationConfirmation
      //成功

    }else{

        window.onload=function(){

            $('fwdButtonC').click();
        }



    }



  })();