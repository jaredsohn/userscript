// ==UserScript==
// @name        cninfoGraber
// @namespace   cninfoGraber
// @description grab cninfo company financial report
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @require     http://bainternet-js-cdn.googlecode.com/svn/trunk/js/jQuery%20BlockUI%20Plugin/2.39/jquery.blockUI.js
// @include     http://www.cninfo.com.cn/information/*
// @version     3
// ==/UserScript==

function getdata()
{
	//var i_nr = document.getElementById("i_nr").contentWindow.document;
	var dd = document.getElementsByClassName("clear");
	var targetTable,trows,tcells;
	var resultArray=new Array()
	var resultArrayP = 0;
	for(var i=0;i<dd.length;i++)
	{
		if(dd[i].childElementCount >0)
		{
			targetTable = dd[i].getElementsByTagName("table");
			break;
		};
	}
	if (targetTable!=null) 
	{
		targetTable = targetTable[0];
		trows = targetTable.rows;
		for(var i=0;i <trows.length;i++)
		{
			tcells = trows[i].cells;
			if (tcells != null) 
			{
				for(var i2=0;i2 <tcells.length;i2++)
				{
					if (tcells[i2].bgColor == "#daf2ff") 
					{
						resultArray[resultArrayP] = tcells[i2].firstElementChild.innerHTML;
						resultArrayP++;
					};							
				}
			};
			
		}
	}
	//resultArray.length = 15;
	var resultString = resultArray[0]+"	";
	for(var i3=1;i3 <resultArray.length;i3++)
	{
		i3++;
		if (i3 <resultArray.length) 
		{
			if (resultArray[i3]!="") 
			{
				resultString+=resultArray[i3]+"	";
			};		
		};		
	}

	for(var i3=2;i3 <resultArray.length;i3++)
	{
		i3++;
		if (i3 <resultArray.length) 
		{	
			if (resultArray[i3]!="") 
			{
				resultString+=resultArray[i3]+"	";
			};			
		};
	}
	var resultString1=resultString.substr(0, resultString.length-1);  
	 $.blockUI({ 
            theme:     false, 
            showOverlay: false,
            draggable: true,     
           	css: { 
	            border: 'none', 
	            top:  ($(window).height() - 600) /2 + 'px', 
                left: ($(window).width() - 800) /2 + 'px', 
                width: '700px' ,
	            padding: '15px', 
	            backgroundColor: '#000', 
	            '-webkit-border-radius': '10px', 
	            '-moz-border-radius': '10px', 
	            opacity: .8, 
	            color: '#fff' 
        	},
            title:    '10秒之内复制', 
            message:  '<textarea rows="1" style="width: 700px;height = 20px" >'+resultString1+'</textarea>', 
            timeout:   10000 
        }); 

    	$('textarea').click(function(){
			if($.browser.msie) this.createTextRange().select();
			else {
				this.selectionStart = 0;
				this.selectionEnd = this.value.length;
			}
		})
	return false;
 }


function span1()
{
	var res=["SpanGetData"], obj; //需要处理的span id
	for(var j=0; j<res.length; j++)
	{
		  obj = document.getElementById(res[j]);
		  obj.title=obj.id;
          obj.j = j;
          obj.onclick= function(){getdata();};
	}
}
 
	var navbar, newElement;
	
	navbar = document.getElementById('cwzbform');
	if (navbar!=null) {
		var icon = document.createElement('span');
	    icon.title = "description";
	    icon.id = "SpanGetData";
	    icon.innerHTML = '获取数据';
	    icon.style.background = "#FFCC00";
	    icon.style.background = "-moz-linear-gradient(top, #FFCC00, #FF9900)";
	    icon.style.border = "1px solid #EE8800";
	    
		navbar.parentNode.insertBefore(icon, navbar.nextSibling);
		span1();
	}
	



