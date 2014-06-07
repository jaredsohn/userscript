// ==UserScript==
// @name      饭否话痨防治器
// @namespace  http://mooninsky.net/
// @version    0.6.1
// @description  专防高手速连续刷屏话痨（而且又舍不得unfo的那批），可与太空饭否配合使用。
// @match      http://fanfou.com/*
// @require http://code.jquery.com/jquery-1.8.0.min.js
// @copyright  2013+, @shinemoon 
// @run-at document-start
// ==/UserScript==

//Style and disable Ads
function filterSite(){

    GM_addStyle(
        "* {font-family:微软雅黑!important;} " 
    );
}

//Post handling
function endAction(){
    var r = foldRepeatMsg();
    var llen = r[0];
    var pName = r[1];
    var dinst = r[2];
    var rpt = r[3];
    $('#pagination-more').bind('click',function(){
        //延时等待
        function wtloading(){
            //console.log(llen + " vs " + $('.wa.solo li .author').size()+ " vs " + $('.wa.solo li .author:empty').size());
            if(llen == $('.wa.solo li .author').size() || $('.wa.solo li .author:empty').size() > 0) {
            	setTimeout(function(){
                	wtloading();
            	}, 1000);
            } else {
                console.log('加载完毕');
				setTimeout(function(){
        			foldRepeatMsg(pName,dinst,rpt);
        		}, 1000);
                
            }
        }
        wtloading();
   });
}

//
function foldRepeatMsg(n,d,rpt){    
    var repeatCnt = (typeof(rpt)=="undefined")?1:rpt;
   var curName = (typeof(n)=="undefined")?'':n;
    var this_d = (typeof(d)=="undefined")?null:d;
    var mlist =$('.wa.solo li');
   //console.log("后续处理");
    //逐行计数看是否有连续的同一人发送
    mlist.each(function(){
        if($(this).find('.author').size()==0) return;
        cName = $(this).find('.author').eq(0).text();
        if(curName!=cName) {	//不是同一人发送，重置状态
            //console.log('author:' + curName + ' sent: '+ repeatCnt);
            curName = cName;
            repeatCnt = 1;
            this_d = $(this);
        } else {
            repeatCnt++;
            this_d.data('cnt',repeatCnt);
            if(repeatCnt > 1) {
                if(typeof(this_d.attr('hid'))=="undefined") {
                    rid++;
                    this_d.addClass('multiple').attr('hid','folded'+rid);

                } 
                if($(this).hasClass('repeated')==false) $(this).addClass('repeated').addClass('folded'+rid );
            }
            if(repeatCnt > 2) {
               $('.'+this_d.attr('hid')).hide();
                this_d.find('.cntnum').remove();
                this_d.append('<span class=cntnum>'+repeatCnt+'</span>');
            }
        }
        
    });
    
    mlist.each(function(index){
        if($(this).find('.author').size()==0) return;
        $(this).click(function(){
      		console.log($(this).attr('hid'));
      		$('.'+$(this).attr('hid')).toggle();
    	});
    });

    
    $('.multiple').css('background','-webkit-linear-gradient(rgba(255, 242, 183,0.7), rgba(250, 230, 145,0.5))');
    $('.repeated').css('background','-webkit-linear-gradient(rgba(255, 242, 200,0.3), rgba(250, 230, 200,0.1))');
    $('.cntnum').css({'position':'relative','top':'-20px','left':'100px','font-size':'60px','font-style':'italic','padding':'10px','color':'rgb(221,102,46)','opacity':'0.2'}); 
                  

    return [$('.wa.solo li .author').size(), curName, this_d, repeatCnt];
    
}

//Organized actions

function init(){
    filterSite();
    document.addEventListener("DOMContentLoaded", endAction, false);
  
}


//Run!
var rid = 0;
init();
