// ==UserScript==
// @name FrozenFaceSmiley
// @version 1.0
// @include http://tieba.baidu.com/tb/editor/v2/smiley.html*
// ==/UserScript==


(function(){


    //自定义表情名称
    var image_collection_name='麻将脸';

    //自定义表情资源
    var image_collection=[
        'http://bbs.saraba1st.com/2b/images/post/smile/face/00.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/01.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/02.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/03.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/04.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/05.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/06.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/07.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/08.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/09.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/10.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/11.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/12.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/13.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/14.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/15.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/16.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/17.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/18.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/19.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/20.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/21.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/22.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/23.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/24.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/25.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/26.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/27.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/28.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/29.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/30.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/31.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/32.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/33.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/34.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/35.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/36.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/37.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/38.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/39.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/40.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/41.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/42.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/43.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/44.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/45.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/46.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/47.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/48.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/49.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/50.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/51.gif',
                     'http://bbs.saraba1st.com/2b/images/post/smile/face/52.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/53.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/54.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/55.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/56.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/57.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/58.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/59.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/60.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/61.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/62.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/63.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/64.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/65.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/66.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/67.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/68.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/69.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/70.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/71.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/72.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/73.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/74.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/75.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/76.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/77.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/78.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/79.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/80.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/81.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/82.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/83.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/84.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/84.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/86.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/87.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/88.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/89.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/90.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/91.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/92.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/93.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/94.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/95.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/96.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/97.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/98.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/99.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/101.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/102.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/103.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/104.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/105.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/106.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/107.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/108.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/109.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/110.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/111.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/112.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/113.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/114.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/115.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/116.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/117.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/118.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/119.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/120.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/121.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/122.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/123.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/124.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/125.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/126.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/127.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/128.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/129.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/130.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/131.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/132.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/133.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/134.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/135.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/136.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/137.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/138.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/139.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/140.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/141.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/142.gif',
              'http://bbs.saraba1st.com/2b/images/post/smile/face/143.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/144.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/145.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/146.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/147.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/148.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/149.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/150.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/151.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/152.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/153.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/154.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/155.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/156.gif',
        'http://bbs.saraba1st.com/2b/images/post/smile/face/157.gif'
        ];


    setTimeout(function(){
        fun_UserDefinedSmiley();
    }, 0);


    function fun_UserDefinedSmiley(){
        var f1=document.getElementById('tabContent');
        var f2=document.getElementById('tabMenu');
        if(f1&&f2){
            //添加自定义表情存储表格
            var node=document.createElement('div');
            node.id="tab503";
            node.setAttribute('style', 'display: none;');
            var text='<table cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse; " border="1" bordercolor="#B8B3FF" width="100%" height="100%"><tbody>';
            var image_number=0;
            for(var i=0; i<image_collection.length/7;i++){
                text+='<tr>';
                for(var j=0; j<7 ; j++){
                    var posflag=j>3?1:0;
                    var image_src=image_collection[image_number++];
                    var offset=35*i*(-1)-1;
                    if(image_src){
                        text+='<td border="1" width=35px style="border-collapse:collapse;" align="center"  bgcolor="#FFFFFF" onclick="InsertSmiley(\''+image_src+'\',\'konata\')" onmouseover="this.style.backgroundColor=\'#CCCCCC\'" onmouseout="this.style.backgroundColor=\'#FFFFFF\'">';
                        text+='<img width=35px src="'+image_src+'">';
                        text+='</td>';
                    }else{
                        text+='<td width=35px bgcolor="#FFFFFF"></td>';
                    }
                }
                text+='</tr>';
            }
            text+='</tbody></table>';
            node.innerHTML=text;
            f1.appendChild(node);

            //添加自定义表情切换按钮
            var node=document.createElement('div');
            node.id='tab_503';
            node.setAttribute('class', 'menuDefault');
            node.setAttribute('onclick', 'FrozenFaceSwitchTab();');
            node.innerHTML='<u>'+image_collection_name+'</u>';
            f2.appendChild(node);
        }
    }
    window.wrappedJSObject.FrozenFaceSwitchTab=function(){
        var f1=document.getElementById('tab503');
        if(f1){
            //显示自定义表情储存表格
            var f2=document.getElementById('tabContent');
            if(f2){
                for(var i=0; i<f2.children.length; i++){
                    if(f2.children[i].getAttribute('style')=='display: block;'){
                        f2.children[i].setAttribute('style', 'display:none;');
                    }
                }
            }
            f1.setAttribute('style', 'display: block;');

            //表情切换按钮调整
            var f3=document.getElementById('tabMenu');
            if(f3){
                for(var i=0; i<f3.children.length; i++){
                    item=f3.children[i];
                    item.setAttribute('class', 'menuDefault');
                    var tab_number=item.id.match(/\d+/);
                    if(tab_number!='503'){
                        item.setAttribute('onclick', 'getElementById("tab503").setAttribute("style", "display:none;");switchTab('+tab_number+')');
                    }
                }
            }
        }
    }


})();
