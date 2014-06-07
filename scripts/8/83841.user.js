// ==UserScript==



// @name           Mantis tools



// @namespace      http://www.zhangjingwei.com



// @description    Mantis tools



// @include        http://misc.intra.leju.com/mantis/my_view_page.*



// @include        http://misc.intra.leju.com/mantis/main_page.php



// ==/UserScript==















var ljm = {



    containerStyle : ";position:fixed;right:5px;top:5px;border:2px solid #709CD2;font:14px/1.6 arial;width:130px;background:#FFFFFF",



    tiphtml : "倒计时：<span style='color:red;font:900 14px arial;width:6px;display:inline-block;' id='ljmtimer'>10</span><button id='timebtn' style='margin-left:15px;'>暂停</button>",



    obj : null,



    timer : null,

    title : true



}







ljm.container = document.createElement("div");



ljm.container.style.cssText = ljm.containerStyle;



ljm.container.innerHTML = ljm.tiphtml;



document.body.appendChild(ljm.container);







ljm.obj = document.getElementById("ljmtimer");



ljm.btn = document.getElementById("timebtn");







ljm.btn.addEventListener("click",function(){



    var self = this,



    type = self.innerHTML=="暂停"?true:false;



    if(type){



        self.innerHTML = "恢复";



        clearTimeout(ljm.timer);



    }else{



        self.innerHTML = "暂停";



        ljm.timer = setTimeout(ljfn.reprint,1000);



    }



},false);







var ljfn = {



    timer : 10,



    init : function(){



        if(ljfn.timer >= 1){



            ljm.timer = setTimeout(ljfn.reprint,1000);



        }else{



            ljfn.myrefresh();



        }



    },

    trim : function(str){   

        return (str || "").replace(/^\s+|\s+$/g, "");   

    },



    reprint : function(){



        ljfn.timer--;
        
        ljm.obj.innerHTML = ljfn.timer;
		for (var len = ljm.unspecified.snapshotLength-1; len >=0 ; len-- ){
			var str = ljm.unspecified.snapshotItem(len).innerHTML;
			if(str.indexOf("指定给我的") > 0){
				var result = str.match(/\d{1} - \d{1}/ig)[0];
				if(result != "0 - 0"){
					result = ljfn.trim(result.slice(-2));
					if(ljm.title){
						document.title = "【" + result + "】条未指定的任务，请注意查看";
						ljm.title = false;
					}else{
						document.title = "【】条未指定的任务，请注意查看";
						ljm.title = true;
					}
				}
			}
		}



        ljfn.init();



    },



    myrefresh : function(){



        window.location.reload();



    },

    getAttr : function(name){

        var attr  = document.evaluate(

            '//'+name,

            document,

            null,

            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,

            null);

        return attr;

    }



}



ljm.unspecified = ljfn.getAttr("td[@class='form-title2 bracket-link']");



ljfn.init();