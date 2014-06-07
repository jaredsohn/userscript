// ==UserScript==
// @name       Bulk Unfollow 
// @namespace  http://use.i.E.your.homepage/
// @version    0.2.1
// @description  Bulk unfollow users at weibo.com
// @match      http://weibo.com/*/myfollow*
// @copyright  2012+, @程先生是技术宅
// @require		http://lib.sinaapp.com/js/jquery/1.9.0/jquery.min.js
// ==/UserScript==

GM_log("jQuery:"+jQuery().jquery);
unsafeWindow.STK.custEvent.add(unsafeWindow.STK.pageletView,"allPlRendReady",function(){
    console.log("add button to div.bar_left");
    var bar=$("div.bar_left");
    var button = $("<a class='W_btn_c' ><span>取消本页全部关注</span></a>");
    bar.append(button);
    console.log("")
    button.on("click",function(evt){
	GM_log("unFollow All");
    
    unsafeWindow.STK.ui.confirm("确定取消本页内全部关注？",{OK:function(){
        unsafeWindow.STK.ui.alert("真的确定么？",{OK:function(){
            var list = $("div.myfollow_list");
            var ids=[];
    		list.each(function(index,elem){
           		var d=$(elem).attr("action-data"); 
            	var uid=d.match(/uid=([0-9]+)/)[1];
            	console.log(uid); 
                ids.push(uid);
            	
        	});
            /*$.ajax({url:"/aj/f/unfollow",type:"POST",data:{refer_sort:"relationManage",refer_flag:"unfollow_all",uid:ids.slice(0,5).toString(),_t:0,_wv:5,__rnd:new Date().getTime()},success:function(res){
	                console.log(res.msg);
 

	                	GM_log("done...");
	                    $("div.lev2>a.lev_curr")[0].click(); 
	                
	            }
            });*/
            //debugger;
            var diss=$("a[action-type='cancel_follow']")
            var data = unsafeWindow.STK.core.json.queryToJson(diss.attr("diss-data"));
            data["uid"]=ids.toString();
            data["_t"]=0;
            console.log(data);
            debugger;
            unsafeWindow.STK.pl.relation.follow.source.trans.getTrans("unFollow",{onSuccess:function(){
                console.log("succeed!");
                $("div.lev2>a.lev_curr")[0].click(); 
            }}).request(data);
        }
        });

        
    }});
    
	});

});