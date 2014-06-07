// ==UserScript==
// @name     Tieba CoolFont
// @author	【贴吧】@背叛丿拂晓
// @icon	http://b.hiphotos.bdimg.com/album/s%3D1100%3Bq%3D90/sign=098fd2aa0bf79052eb1f433f3cc3ecbb/7e3e6709c93d70cf12ec0bb4fadcd100baa12b70.jpg
// @version	2.3
// @description	隔字变色[jQuery升级版]
// @include	http://tieba.baidu.com/*
// @exclude	http://tieba.baidu.com/tb/*
// @homepage	http://userscripts.org/scripts/show/411499
// @updateURL	http://userscripts.org/scripts/source/411499.user.js
// ==/UserScript==
$(function()
{
	$(document).delegate('#ueditor_replace','keydown',function(e)
	{
		if(e.ctrlKey&&e.keyCode==13)
		{
             $.each($(this).children(),function(index,obj)
             {
                 var $thisRow = $(obj);
                 if($thisRow.children().size()>0)
                 {
                     var flag = false;
                     $.each($thisRow.children(),function(index,obj)
                     {
                         if($(obj).is('img'))
                         {
                             flag = true;
                         }
                     });
                     if(flag)
                     {
                         DisImg($thisRow);
                     }
                 }
                 else
                 {
                     $(obj).html(function(index,value)
                     {
                         var row = '';
                         var re = /&nbsp;/g;
                         value = value.replace(re,' ');
                         var j = 0;
                         for(var i=0;i<value.length;i++)
                         {
                             if(value[i]==' ')
                             {
                                 row += '&nbsp;';
                                 continue;
                             }
                             if(j%2==0)
                             {
                                 row += '<font color="#e10602">'+value[i]+'</font>';
                             }
                             else
                             {
                                 row += value[i] ;
                             }
                             j++;
                         }
                         return '<b>'+row+'</b>';
                     });
                 }
             });
		}
	});
});
function DisImg($thisRow)
{
	var re = /<img [^<>]+\>/g;
	var arrImg = $thisRow.html().match(re);
    var arrTxt = $thisRow.html().split(re);
    $thisRow.html('');
    $.each(arrTxt,function(index,value)
    {
        var row = '';
        var re = /&nbsp;/g;
        value = value.replace(re,' ');
        var j = 0;
        for(var i=0;i<value.length;i++)
        {
            if(value[i]==' ')
            {
                row += '&nbsp;';
                continue;
            }
            if(j%2==0)
            {
                row += '<font color="#e10602">'+value[i]+'</font>';
            }
            else
            {
                row += value[i] ;
            }
            j++;
        }
        row = '<b>'+row+'</b>';
        if(arrImg[index])
        {
            row += arrImg[index];
        }
        $thisRow.html(function(index,value)
        {
            return value + row;
        });
    });
}