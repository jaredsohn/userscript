// ==UserScript==
// @id             truckloadtraffic
// @name           truckloadtraffic
// @version        1.0
// @namespace      
// @author         *老男人 QQ799765001
// @description    
// @run-at         document-end
// @include        http://www.truckloadtraffic.com/*
// ==/UserScript==
//禁止弹出提示框


if(document.getElementsByTagName("frameset").length>0){
	document.getElementsByTagName("frameset")[0].onbeforeunload=function(){};
}
if(document.getElementsByTagName("body").length>0){
	document.getElementsByTagName("body")[0].onload=function(){};
}
var forms=document.getElementsByTagName("form");
for(var fmcount=0;fmcount<forms.length;fmcount++){
    forms[fmcount].onsubmit=function(){return true};
}
if(location.href.indexOf('/surfsv_cobra_ap.php')>0){
    window.location.href="http://www.truckloadtraffic.com/manual-surf.php";
}
if(location.href.indexOf('/manual-surf.php')>0){
    document.getElementsByTagName("frame")[1].src="about:blank;";
}
if(location.href.indexOf('/ptcbar.php')>0){
	var alink=document.getElementsByTagName("a")[0];
	alink.href="javascript:start_timer(20, 20);";
	alink.click();
}
if(location.href.indexOf("ptc.php")>0){
	var alinks=document.getElementsByTagName("a");
	for(var i=0;i<alinks.length;i++){
		if(alinks[i]["onclick"]!=null){
			alinks[i].click();
		}
	}
}
function myrun(){
	clearInterval(s1);
	if(location.href.indexOf('manualbar.php')>0){
		var myimg=document.images[0];
		var myimg1=document.getElementsByTagName('input')[0];
		var myarray=new Array(
		["51_81.gif","76gf79hbn9hb8hs87gshu_7yhvbd6gdreq.gif",1],
		["52_82.gif","76gf79hbn9hb8hs87gshu_7yhvbd6gdreq.gif",2],
		["53_83.gif","76gf79hbn9hb8hs87gshu_7yhvbd6gdreq.gif",3],
		["54_84.gif","76gf79hbn9hb8hs87gshu_7yhvbd6gdreq.gif",4],
		["61_97.gif","s6gb7bb787ygs8yhhsg87vcx_sas3q.gif",1],
		["61_97.gif","46578984h9h_98nbcy7gtd_yhdg5ds.gif",3],
		["61_97.gif","cv4675ghdzx9063hg547g_ydbh48yddbjfhwq.gif",1],
		["61_97.gif","1n89yb3b48bfj8uhdg6gysii_inr76ghbg987wbv3454.gif",1],
		["62_98.gif","1n89yb3b48bfj8uhdg6gysii_inr76ghbg987wbv3454.gif",2],
		["62_98.gif","quyeb4h87dbjdbggu_eyugr78_nbcyg76dw_trea1296.gif",1],
		["62_98.gif","gjhb76gdhg98hdb_uyutdgv8763ds.gif",4],
		["63_99.gif","bvc675dge7896dsg_gdyf8bc_ydg7dg564sgf39hf_14387a354.gif",2],
		["63_99.gif","1n89yb3b48bfj8uhdg6gysii_inr76ghbg987wbv3454.gif",3],
		["63_99.gif","1nb5b69jhdbc7cdhbdve_incvb4hfv4zxopla290.gif",3],
		["64_100.gif","gjhb76gdhg98hdb_uyutdgv8763ds.gif",3],
		["64_100.gif","1n89yb3b48bfj8uhdg6gysii_inr76ghbg987wbv3454.gif",4],
		["65_101.gif","bcvsa78g76d86_0jfh76sghbs9shd87dhds86726shshg7g7b87h_76dv34d.gif",3],
		["65_101.gif","ashgy5dur875hu_ubfy_nbdy76_nbhv1784363h6dc32.gif",1],
		["65_101.gif","s6gb7bb787ygs8yhhsg87vcx_sas3q.gif",2],
		["66_102.gif","ashgy5dur875hu_ubfy_nbdy76_nbhv1784363h6dc32.gif",2],
		["67_103.gif","bcvsa78g76d86_0jfh76sghbs9shd87dhds86726shshg7g7b87h_76dv34d.gif",1],
		["68_104.gif","sgdb7gbvd4fdvgdf5_jhbsf5gf5429.gif",1],
		["68_104.gif","ashgy5dur875hu_ubfy_nbdy76_nbhv1784363h6dc32.gif",4],
		["6A_106.gif","bvc675dge7896dsg_gdyf8bc_ydg7dg564sgf39hf_14387a354.gif",1],
		["67_103.gif","46578984h9h_98nbcy7gtd_yhdg5ds.gif",1],
		["67_103.gif","bcvsa78g76d86_0jfh76sghbs9shd87dhds86726shshg7g7b87h_76dv34d.gif",1],
		["67_103.gif","sgdb7gbvd4fdvgdf5_jhbsf5gf5429.gif",3],
		["67_103.gif","ashgy5dur875hu_ubfy_nbdy76_nbhv1784363h6dc32.gif",3],
		["69_105.gif","sgdb7gbvd4fdvgdf5_jhbsf5gf5429.gif",2],
		["69_105.gif","s6gb7bb787ygs8yhhsg87vcx_sas3q.gif",3],
		["69_105.gif","ab7865sghd_jnbcvgfdtr76syg76tsyg99gs7t6suyc099a176.gif",4],
		["69_105.gif","as786bvh49845h4hjuhy487shjuoh_jkhdbie987ysu876hsas128.gif",1],
		["6A_106.gif","as786bvh49845h4hjuhy487shjuoh_jkhdbie987ysu876hsas128.gif",2],
		["6B_107.gif","as786bvh49845h4hjuhy487shjuoh_jkhdbie987ysu876hsas128.gif",3],
		["6C_108.gif","cv4675ghdzx9063hg547g_ydbh48yddbjfhwq.gif",2],
		["6C_108.gif","ab7865sghd_jnbcvgfdtr76syg76tsyg99gs7t6suyc099a176.gif",1],
		["6C_108.gif","bcvsa78g76d86_0jfh76sghbs9shd87dhds86726shshg7g7b87h_76dv34d.gif",2],
		["6C_108.gif","as786bvh49845h4hjuhy487shjuoh_jkhdbie987ysu876hsas128.gif",4],
		["6D_109.gif","cv4675ghdzx9063hg547g_ydbh48yddbjfhwq.gif",4],
		["6D_109.gif","dsrub87gb5b3j30j4jb36_yhbv3b3j0987fhu48.gif",1],
		["6E_110.gif","sgdb7gbvd4fdvgdf5_jhbsf5gf5429.gif",4],
		["6E_110.gif","bcvsa78g76d86_0jfh76sghbs9shd87dhds86726shshg7g7b87h_76dv34d.gif",4],
		["6E_110.gif","dsrub87gb5b3j30j4jb36_yhbv3b3j0987fhu48.gif",2],
		["6E_110.gif","46578984h9h_98nbcy7gtd_yhdg5ds.gif",4],
		["6F_111.gif","dsrub87gb5b3j30j4jb36_yhbv3b3j0987fhu48.gif",3],
		["6F_111.gif","ab7865sghd_jnbcvgfdtr76syg76tsyg99gs7t6suyc099a176.gif",2],
		["6F_111.gif","quyeb4h87dbjdbggu_eyugr78_nbcyg76dw_trea1296.gif",2],
		["6F_111.gif","s6gb7bb787ygs8yhhsg87vcx_sas3q.gif",4],
		["70_112.gif","1nb5b69jhdbc7cdhbdve_incvb4hfv4zxopla290.gif",1],
		["72_114.gif","cv4675ghdzx9063hg547g_ydbh48yddbjfhwq.gif",3],
		["72_114.gif","46578984h9h_98nbcy7gtd_yhdg5ds.gif",2],
		["73-73_115-115.gif","bvc675dge7896dsg_gdyf8bc_ydg7dg564sgf39hf_14387a354.gif",3],
		["74_116.gif","dsrub87gb5b3j30j4jb36_yhbv3b3j0987fhu48.gif",4],
		["75_117.gif","gfb487fhfncvc87_hdgft76dfgdbklgjtyd87.gif",1],
		["75_117.gif","ab7865sghd_jnbcvgfdtr76syg76tsyg99gs7t6suyc099a176.gif",3],
		["75_117.gif","gjhb76gdhg98hdb_uyutdgv8763ds.gif",1],
		["76_118.gif","gjhb76gdhg98hdb_uyutdgv8763ds.gif",2],
		["76_118.gif","gfb487fhfncvc87_hdgft76dfgdbklgjtyd87.gif",2],
		["76_118.gif","quyeb4h87dbjdbggu_eyugr78_nbcyg76dw_trea1296.gif",3],
		["77-77_119-119.gif","gfb487fhfncvc87_hdgft76dfgdbklgjtyd87.gif",3],
		["78_120.gif","quyeb4h87dbjdbggu_eyugr78_nbcyg76dw_trea1296.gif",4],
		["79_121.gif","1nb5b69jhdbc7cdhbdve_incvb4hfv4zxopla290.gif",2],
		["7A_122.gif","bvc675dge7896dsg_gdyf8bc_ydg7dg564sgf39hf_14387a354.gif",4],
		["7A_122.gif","gfb487fhfncvc87_hdgft76dfgdbklgjtyd87.gif",4],
		["7A_122.gif","1nb5b69jhdbc7cdhbdve_incvb4hfv4zxopla290.gif",4]);

		var pri_imglist=myimg.src.split('/');
		var pri_img=pri_imglist[pri_imglist.length-1];
		var multi_imglist=myimg1.src.split('/');
		var multi_img=multi_imglist[multi_imglist.length-1];
		var h1=myrandom(20,30);
		var h2=myrandom(70,80);
		var h3=myrandom(130,140);
		var h4=myrandom(200,207);
		var myvalue,x,myx;
		for(var x in myarray){
			if(pri_img==myarray[x][0] && multi_img==myarray[x][1])
			{
				myvalue=myarray[x][2]; 
			}
		}
		switch (myvalue){
			case 1:
				myx=h1
				break
			case 2:
				myx=h2
				break
			case 3:
				myx=h3
				break
			case 4:
				myx=h4
				break 
		}
		if(myx){
			window.onbeforeunload=function(){};
			oknext=1;
			var rect=myimg1.getBoundingClientRect();
			var ip1=document.createElement('input');
			ip1.name="x";
			ip1.value=myx;
			var ip2=document.createElement('input');
			ip2.name="y";
			ip2.value=myrandom(10,20);
			document.forms[0].appendChild(ip1);
			document.forms[0].appendChild(ip2);
			document.forms[0].submit();
		}
	}
}
function myrun2(){
	var alink=document.getElementsByTagName('a');
	for (var i=0;i<alink.length;i++)
	{
		if(alink[i].innerHTML.indexOf('won')>0){
			alink[i].click();
		}
	}
}
function myrun3(){
    clearInterval(s3);
	if(window.location.toString().indexOf("surfverify")>0){
		var mybody=document.getElementsByTagName('body')[0].innerHTML;
		if(mybody.indexOf("5 + 6 = 7")>0||mybody.indexOf("14 - 9 = 12")>0||mybody.indexOf("drive 23 hours")>0||mybody.indexOf("drivers are millionaires")>0||mybody.indexOf("l truck drivers speed")>0){
            var inputs=document.getElementsByTagName("input");
            for(var fmcount=0;fmcount<inputs.length;fmcount++){
                if(inputs[fmcount].value.indexOf("FALSE")>0){
                    inputs[fmcount].click();
                    return;
                }
            }
        }
		else if(mybody.indexOf("12 + 7 = 19")>0||mybody.indexOf("16 - 6 = 10")>0||mybody.indexOf("tire pressure will safe")>0||mybody.indexOf("drivers have a special CDL driver's")>0||mybody.indexOf("drivers check bridge hei")>0){
            var inputs=document.getElementsByTagName("input");
            for(var fmcount=0;fmcount<inputs.length;fmcount++){
                if(inputs[fmcount].value.indexOf("TRUE")>0){
                    inputs[fmcount].click();
                    return;
                }
            }
		}
		else {
		  alert('未收录的验证!');
		}
	}
}
//冲浪
var s1=window.setInterval(function() {myrun();}, 15000);
//点奖励
var s2=window.setInterval(function() {myrun2();}, 2000);
//点验证
var s3=window.setInterval(function() {myrun3();}, 2000);
function myrandom(a,b){ return (parseInt(Math.random()*(b-a))+a); }
