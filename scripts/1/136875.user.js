// ==UserScript==
// @name       TheWayToAli
// @version    1
// @description  在贴吧的回复中，还你可爱的阿狸~~~
// @include http://tieba.baidu.com/tb/editor/v2/simplesmiley.html*
// @copyright  2012, Sam Lee [lilidfgs]
// ==/UserScript==

(function(){
		
    var ali_collection_name='阿狸';
    var ali_collection=[

'http://static.tieba.baidu.com/tb/editor/images/ali/ali_001.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_002.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_003.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_004.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_005.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_006.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_007.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_008.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_009.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_010.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_011.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_012.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_013.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_014.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_015.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_016.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_017.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_018.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_019.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_020.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_021.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_022.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_023.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_024.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_025.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_026.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_027.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_028.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_029.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_030.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_031.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_032.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_033.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_034.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_035.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_036.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_037.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_038.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_039.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_040.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_041.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_042.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_043.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_044.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_045.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_046.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_047.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_048.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_049.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_050.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_051.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_052.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_053.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_054.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_055.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_056.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_057.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_058.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_059.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_060.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_061.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_062.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_063.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_064.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_065.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_066.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_067.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_068.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_069.gif',
'http://static.tieba.baidu.com/tb/editor/images/ali/ali_070.gif',
];

    setTimeout(function(){
        //表情名、表情URL数组、ContentID号，MenuID号，后两者包含的数字应大于16
        fun_UserDefinedSmiley(ali_collection_name, ali_collection, 'tab24', 'tab_24');        
    }, 0);


    function fun_UserDefinedSmiley(collection_name, collection, content_id, menu_id ){
        var f1=document.getElementById('tabContent');
        var f2=document.getElementById('tabMenu');
        if(f1&&f2){
            //添加自定义表情存储表格
            var node=document.createElement('div');
            node.id=content_id;
            node.setAttribute('style', 'display: none;');
            var text='<table cellpadding="1" cellspacing="1" align="center" style="border-collapse:collapse; " border="1" bordercolor="#B8B3FF" width="100%" height="100%"><tbody>';
            var number=0;
            for(var i=0; i<collection.length/7;i++){
                text+='<tr>';
                for(var j=0; j<7 ; j++){
                    var posflag=j>3?1:0;
                    var image_src=collection[number++];
                    if(image_src){
                        text+='<td border="1" width=35px style="border-collapse:collapse;" align="center"  bgcolor="#FFFFFF" onclick="FrozenFaceSmileyInsertSmiley(\''+image_src+'\')" onmouseover="FrozenFaceSmileyOver(this,\''+image_src+'\',\''+posflag+'\')" onmouseout="FrozenFaceSmileyOut(this)">';
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
            node.id=menu_id;
            node.setAttribute('class', 'menuDefault');
            node.setAttribute('onclick', 'FrozenFaceSwitchTab("'+content_id+'","'+menu_id+'");');
            node.innerHTML='<u>'+collection_name+'</u>';
            f2.appendChild(node);

            //设置预览框大小
            document.getElementById('faceReview').setAttribute('style', 'width:100px;height:100px;');
        }
    }
    unsafeWindow.FrozenFaceSwitchTab=function(content_id, menu_id){
        var f1=document.getElementById(content_id);
        if(f1){
            //显示自定义表情储存表格
            var f2=document.getElementById('tabContent');
            if(f2){
                for(var i=0; i<f2.children.length; i++){
                    if(f2.children[i].getAttribute('style')=='display: block;'||
                        f2.children[i].getAttribute('style')=='display: block; '){
                        f2.children[i].setAttribute('style', 'display:none;');
                    }
                }
            }
            f1.setAttribute('style', 'display: block;');

            //表情切换按钮调整
            var f3=document.getElementById('tabMenu');
            if(f3){
                for(var i=0; i<f3.children.length; i++){
                    var item=f3.children[i];
                    if(item.getAttribute('class')!='menuDefault disable'){
                        item.setAttribute('class', 'menuDefault');
                    }
                    var tab_number=item.id.match(/\d+/);
                    if(parseInt(tab_number)<16&&item.getAttribute('class')!='menuDefault disable'){    //假定16以下的序号已被百度贴吧占用，其他序号保留给小脸使用
                        item.setAttribute('onclick', 'document.getElementById("'+content_id+'").setAttribute("style", "display:none;");document.getElementById("'+menu_id+'").setAttribute("class", "menuDefault");switchTab('+tab_number+')');
                    }
                }
                document.getElementById(menu_id).setAttribute('class', 'menuFocus');
            }
        }
    }
    unsafeWindow.FrozenFaceSmileyInsertSmiley=function(image_src){
        var editorID=unsafeWindow.getSearchById('id');
        var editor=parent.TED.Editor.getInstanceById(editorID);
        editor.execCommand('insertimage',  image_src);
        editor.overlay.close();
    }
    unsafeWindow.FrozenFaceSmileyOver=function(td, image_src, posflag){
        td.style.backgroundColor="#E8E8FD";
        document.getElementById('faceReview').setAttribute('src', image_src);
        if(posflag==1)
            document.getElementById("tabIconReview").className="show";
        document.getElementById("tabIconReview").style.display='block';
    }
    unsafeWindow.FrozenFaceSmileyOut=function(td){
        td.style.backgroundColor="#FFFFFF";
        document.getElementById('faceReview').setAttribute('src', 'http://static.tieba.baidu.com/tb/editor/images/default/0.gif');
        document.getElementById("tabIconReview").className="";
        document.getElementById("tabIconReview").style.display='none';
    }


})();
