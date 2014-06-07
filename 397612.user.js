

    

// ==UserScript==
// @name        click_take_quest
// @namespace   http://userscripts.org/scripts/get_three_daily_quest_by_bluesky
// @description get_three_daily_quest
// @include http://*.3gokushi.jp/*
// @version     
// @grant	GM_getValue
// @grant	GM_setValue
// @grant	GM_xmlhttpRequest
// @grant	GM_addStyle
// @grant	GM_deleteValue
// @grant	GM_log
// @grant	GM_registerMenuCommand

// ==/UserScript==




//global_var
 var HOST =location.hostname;
 var flag_take_quest=0;
 var flag_get_resource=0;
 
 
 
    lili = document.createElement("li");  //リスト用
    conf = document.createElement("form"); //form用
    formButton = document.createElement("input"); //button用
    
    
    conf1 = document.createElement("form"); //form用
    formButton1 = document.createElement("input"); //button用
    
    conf2 = document.createElement("form"); //form用
    formButton2 = document.createElement("input"); //button用


    /* button用フォームの製作*/
   
    lili.id = "AS";
    conf.id = "ASFORM";
    formButton.type = "button";
    formButton.id = "ASbutton";
    formButton.addEventListener("click",click_take_quest , false);
   
    formButton.value ="Get_daily_Quest";
  
    
 
    formButton1.type = "button";
    formButton1.id = "ASbutton1";
    formButton1.addEventListener("click", getReward, false);
   
    formButton1.value ="Get_Reward";
    
 
    /*UIの配置*/
    document.getElementById("navi01").appendChild(lili);
 
    document.getElementById("AS").appendChild(conf);
  
    document.getElementById("ASFORM").appendChild(formButton);
    document.getElementById("ASFORM").appendChild(formButton1);
  
    

  
                
function click_take_quest() {
    
       
                         
                          
                          var temp_url= new Array();
                        
                          var temp_url_donation ="http://"+HOST+"/quest/index.php?list=1&p=1&mode=0&action=take_quest&sort_1st_item=-1&sort_1st_order=desc&sort_2nd_item=-1&sort_2nd_order=desc&sort_3rd_item=-1&sort_3rd_order=desc&filter_difficult=-1&filter_category=-1&filter_reward=-1&id=254";
                          var temp_url_b="http://"+HOST+"/quest/index.php?list=1&p=1&mode=0&action=take_quest&sort_1st_item=-1&sort_1st_order=desc&sort_2nd_item=-1&sort_2nd_order=desc&sort_3rd_item=-1&sort_3rd_order=desc&filter_difficult=-1&filter_category=-1&filter_reward=-1&id=255";
                          var temp_url_c="http://"+HOST+"/quest/index.php?list=1&p=1&mode=0&action=take_quest&sort_1st_item=-1&sort_1st_order=desc&sort_2nd_item=-1&sort_2nd_order=desc&sort_3rd_item=-1&sort_3rd_order=desc&filter_difficult=-1&filter_category=-1&filter_reward=-1&id=256";
                          
                          temp_url[0]=temp_url_donation;
                          temp_url[1]=temp_url_b;
                          temp_url[2]=temp_url_c;
                          
                    
                        
                         for ( i=0 ; i <temp_url.length ; i++) {
                         
                            
                                 GM_xmlhttpRequest({
                             
                                        method: "GET",
                                        
                                        url: temp_url[i],
                                      
                                        headers:{"Content-type":"text/html"},
                                        
                                        overrideMimeType:'text/html; charset=utf-8',
                                        
                                        onload: function (response) {
                                        
                                           if(flag_take_quest==0) {
                                            
                                                sendDonate(500);
                                            
                                                flag_take_quest =flag_take_quest+1;
                                            
                                             }
                                            
                                             location.href ="http://"+HOST+"/quest/index.php";
                                        },
                                       
                                        onerror: function (response) {
                                             alert('faile');
                                        }
                                  });
                          }
                          
                }
        
        
                            
        
        
          //寄付処理通信部
       function sendDonate(rice) {
            
           var data = "contributionForm=&wood=0&stone=0&iron=0&rice=" + rice + "&contribution=1";
        
        		GM_xmlhttpRequest({
        			method:"POST", 
        			url:"http://" + HOST + "/alliance/level.php",
        			headers:{"Content-type":"application/x-www-form-urlencoded"},
        			data: data,
      
        			onload:function(x){
        			     getReward();
        			     
			        }
        		});
        
        	
        }
        
        function getReward() {
            
            var data = "c=1";
        	
        		GM_xmlhttpRequest({
        			method:"POST", 
        			url:"http://" + HOST + "/quest/index.php",
        			headers:{"Content-type":"application/x-www-form-urlencoded"},
        			data: data,
                    onload:function(x){
                    
                        getYOROS();
                    
                   
                    
                    }
        		});
        
        	
        }
        
        function getYOROS() {
            
            var data = "send=send&got_type=0";
        	
        		GM_xmlhttpRequest({
        			method:"POST", 
        			url:"http://" + HOST + "/reward_vendor/reward_vendor.php",
        			headers:{"Content-type":"application/x-www-form-urlencoded"},
        			data: data,
                    onload:function(x){
                    
                    
                    location.reload();
                    }
        		});
        
        	
        }


