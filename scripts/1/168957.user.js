// ==UserScript==
// @name        淘宝辅助工具加入爱心宝贝
// @namespace   http://diveintogreasemonkey.org/download/
// @description 淘宝辅助工具加入爱心宝贝
// @include     http://tcc.taobao.com/charity/*
// @version     1
// ==/UserScript==


//start checkbox


   
   
   //
   
 /*  	function validateCharityForm()
	{	
		
      
     
        
		if( mainAcceptLicense.checked ) //判断是否选择接受或退出活动
		{
		    if(acceptLicense[0].checked) //接受慈善活动
		    {  
		          var org_idP=document.getElementsByName('org_id');
		          org_idP.value=1;
		          
				if(document.getElementsByName('org_id').value=='0' || document.getElementsByName('org_id').value=='')
			    {
			    	alert('请选择慈善机构！11222');
			    	return false;
			    }
				var charityType=document.getElementsByName('charity_type');
				 charityType[1].checked=true;
				if (charityType[0].checked || charityType[1].checked)//判断捐款方式
				{
					if(charityType[0].checked)
					{
						 var donationRate=document.getElementById('donationRate');
            			 if(!validateDonationRate(donationRate.value))
            			 {
            			   	alert('抱歉，捐赠比例应0.1至0.9的一位小数或1至100的整数！');
            			    donationRate.focus();
            			    return false ;
            			  }
					}else{
						var solidSum=document.getElementsByName('solid_sum');
						solidSum[0].checked=true;
						
						if(!(solidSum[0].checked || solidSum[1].checked ||solidSum[2].checked))
						{
							alert('请选择捐款金额！');
							return false;
						}

					}
				}else{
					alert('请选择捐款方式！');
			    	return false;
				}

			}
             return true;
		} else
		{
			alert('请选择是否参与公益捐赠活动！');
			return false;
		}
    }
/*   $(document).ready(function(){
	$(".memo").hide();
	
	$(".orgdt").click(function(){
		$(".orgdt").removeClass("hover");
		$(this).addClass("hover");
		$('#org_id').val($(this).attr("1"));
		
		$(".memo").hide();
		var orgdtid = $(this).attr("id")+"_memo";
		$("#"+orgdtid).show();
	});
	
	isSigned();
});*/

var acceptLicense=document.getElementsByName('accept_license');
        var mainAcceptLicense;
        mainAcceptLicense=acceptLicense[0];
        mainAcceptLicense.checked=true;

var projectTargetTypes=document.getElementsByName('projectTargetTypes');
        var mainProjectTargetTypes;
        mainProjectTargetTypes=projectTargetTypes[0];
        mainProjectTargetTypes.checked=true;

       var org_idP=document.getElementsByName('org_id');
		          org_idP.value=1;

var charityType=document.getElementsByName('charity_type');
				 charityType[1].checked=true;  

var solidSum=document.getElementsByName('solid_sum');
						solidSum[0].checked=true;
var thisButton;
thisButton=document.getElementsByClassName('submitBtn')

$(".J_projectId").value=1
//alert($(".J_projectId").value+org_idP.value)

//alert($(".submitBtn").type)
$(".submitBtn").click();
    
//window.onload=applyCharity();
//window.setTimeout("",10000);
//window.close();
//}


