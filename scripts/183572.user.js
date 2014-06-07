// ==UserScript==
// @name       eSim-LinkBar
// @namespace  link_bar
// @version    0.03
// @description  none
// @include       http://*.e-sim.org/*
// @author     xCx
// @downloadURL http://userscripts.org/scripts/source/183572.user.js
// ==/UserScript==


/* 黑卡說: 這句是宣告整個為文檔,直接插入<script>任何瀏覽器都能接受 */  var main = function () {
   
  
   //Custom TopBar
                                                       function TUE_Link() {
               
                
                $("nav.top-bar .top-bar-section .foundation-left").append(
                        "<li class='has-dropdown'><a href='#'><img src='http://secura.e-sim.net:3000/avatars/181906_normal' style= 'height:20px ;width:20px;' ></i>台聯企業</a><ul class='dropdown'>"+
                        "<li class='title back js-generated'><h5><a href='#'>« Back</a></h5></li>"+
                        
                      
                   "<li class=''><a href='stockCompany.html?id=1610'><i class='icon-value'></i>台聯企業</a></li>"+
                    "<li class=''><a href='stockCompanyMoney.html?id=1610'><i class='icon-value'></i>台企匯市</a></li>"+
                    "<li class=''><a href='stockCompanyProducts.html?id=1610'><i class='icon-value'></i>台企倉庫</a></li>"+
                    "<li class=''><a href='stockCompanyLogs.html?id=1610'><i class='icon-value'></i>台企紀錄</a></li>"+
                        "</ul></li><li class='divider'></li>"

                );
                // 隱藏 "更改語言" 欄位
                   $("form[action ='editCitizen.html#changeLanguage']  ").hide();
                
                
                
        } TUE_Link () ;
    
    function addButton_Train_Work (){
                                                                   
                   $("form[action ='editCitizen.html#changeLanguage'] ") .before(
                       
               " <button id='button_click' class ='Button_Click '> " +
                   "  <i class='icon-users-2'></i> " +
                   //   "工作&訓練"+
                       
                  "  </button> " +
                
                "</div>"
    
    );
                       }addButton_Train_Work ();
    
    
                                  function B_autoWork() {
		$.ajax({
			url: 'work.html',
			type: 'POST',
			data: {action:'work'},
			success: function(data) {
				if (data!==null) {
					if ($('#workResultsContainer',data).length !== 0) alert('worked today');
					else alert('something wrong');
				} else {
					setTimeout(function(){ autoWork; }, 1000);
				}
			}
		});
	}              
                                     
                      function B_autoTrain() {
		$.ajax({
			url: 'train.html',
			type: 'POST',
			data: {action:'train'},
			success: function(data) {
				if (data!==null) {
					if ($('.biggerFont',data).length !== 0) alert('trained today');
					else alert('something wrong');
				} else {
					setTimeout(function(){ autoTrain; }, 1000);
				}
			}
		});
	}
    function click_train_work (){
                                     $("#button_click").click(function() {
                                         B_autoWork();
                                         B_autoTrain();
                                     });
                                     }
    click_train_work ();
    
    
    
    
};







/* 以下皆是跟最上面那句是一起的*/  
                          if (window.top === window.self) {
	                      var css = document.createElement("style");
		                  css.type = "text/css";
		                  css.innerHTML =
			
			".top-bar-section .dropdown li:hover .dropdown li a{background: url(../img/bg.png) repeat scroll 0 0 #222222 !important;}"+
			".top-bar-section .dropdown li  .dropdown li:hover a{background: url(../img/bg3.png) repeat scroll 0 0 #444444 !important;}";
	var script = document.createElement('script');
		script.type = "text/javascript";
		script.textContent = '(' + main.toString() + ')();';
	document.body.appendChild(script);
	document.body.appendChild(css);
}