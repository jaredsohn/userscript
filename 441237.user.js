// ==UserScript==
// @name        jd
// @namespace   shop.jd.com
// @description 筛选地址
// @version     0.1
// @grant       none
// @include     http://afs2.shop.jd.com*
// @run-at document-end
// ==/UserScript==



function myjdFn()
{
    
	var oSelect = document.getElementsByClassName('thickbox')[0].getElementsByTagName('iframe')[0].contentDocument.getElementById('afsservice_address');
	
  
    
	if(!oSelect) return false;
	
	function createtools()
	{
		var oInput = document.createElement('input');
			oInput.type = 'text';
			oInput.style.border = '1px solid #000';
		
		var oBtn = document.createElement('input');
			oBtn.type = 'button';
			oBtn.value = '筛选一下';
		
			oBtn.style.background = 'green';
			oBtn.style.color = 'white';
			oBtn.style.cursor = 'pointer';
			
		var oDiv = document.createElement('div');
			oDiv.appendChild(oInput);
			oDiv.appendChild(oBtn);
		
		oSelect.parentNode.appendChild(oDiv);
		
		oBtn.onclick = function()
		{
			clearbg();
		   // oInput.value = '';
			var str = oInput.value.trim();
			
			if(str == '')
			{
				alert('请输入要查询的关键字');
				return false;	
			}
			var re =  new RegExp(str,'i');
			var i = 0;
			var p =0;
			var len = oSelect.options.length;    
            var arr = [];
		
			for(i=1; i<len;i++)
			{
               
				//console.log(oSelect.options[i].value);
				if(oSelect.options[i].value.search(re)!=-1)
				{
					p++;
					oSelect.options[i].style.background = '#fcc';		
				}	
                else
                {
                     arr.push(oSelect.options[i]);
                }
			}  
            
            for( i =0; i<arr.length; i++)
            {
                oSelect.appendChild(arr[i]);
            }
        
			alert('筛选完毕,共找到'+p+'个');
					
		};
	}
	createtools();
	
	function clearbg()
	{
		var i = 0;
		var len = oSelect.options.length;    
	
		for(i =0; i<len;i++)
		{
			oSelect.options[i].style.background = '';	
		}   	
	}
}

document.getElementsByClassName('pickwareCustomer')[0].addEventListener('click',function()
{                                                         
    setTimeout(function(){
        myjdFn();
    },2e3);
},false);