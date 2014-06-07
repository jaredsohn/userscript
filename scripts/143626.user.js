// ==UserScript==
// @name       Bgm_id Creater for Book-mod
// @version    0.0.1
// @author     Li Caomu a.k.a.Bonegumi
// @description  快速生成 Bangumi.tv 书籍关联的单行本搜索命令
// @icon       http://lain.bgm.tv/pic/user/s/000/01/41/14127.jpg
// @icon64     http://lain.bgm.tv/pic/user/l/000/01/41/14127.jpg
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @include    http://bgm.tv/subject/*/add_related/subject/book
// @include    http://bangumi.tv/subject/*/add_related/subject/book
// @include    http://chii.in/subject/*/add_related/subject/book
// ==/UserScript==

$(document).ready(function(){
	var css="#multibookbox{margin: 5px 0px;} input.yougali{margin: 0px 2px;} input[type=\"text\"].yougali{width: 80px;}"
	var style = document.createElement('style');
		style.textContent = css;
		document.head.appendChild(style);

	var sbjmod = $("#sbjSearchMod").attr('value');
	var sbjname = $("#subjectName");

	var idbegincontent="<div id=\"multibookbox\"><input type=\"text\" id=\"idbegin\" class=\"yougali\">";
	var idendcontent="<input type=\"text\" id=\"idend\" class=\"yougali\">";
	var creatcontent="<input type=\"button\" id=\"creat\" class=\"yougali\" value=\"生成\">";
	var selectcontent="<input type=\"button\" id=\"select\" class=\"yougali\" value=\"全选\"></div>";
	var multibook= idbegincontent + "至" + idendcontent + creatcontent + selectcontent;

	if (sbjmod = "book"){
		$("#sbjSearchMod").after(multibook);
	};

	var creat = $("#creat");
	var select = $("#select");

	creat.click(function(){
		var idbnoval = $("#idbegin").val();
		var idenoval = $("#idend").val();

		var idbno = Number(idbnoval);
		var ideno = Number(idenoval);
		var idno = ideno - idbno;

		if (idbnoval.length==0||idenoval.length==0){
			alert("请输入 bgm_id 范围");
		}
		else if (idbnoval.match(/\D/)||idenoval.match(/\D/)){
			alert("bgm_id 仅限数字")
		}
		else if (idbno>ideno){
			alert("初值应小于终值")
		}
		else if (idno>30){
			alert("初值与终值之差应小于等于30")
		}
		else{
			var bgmid = idbno;
			var idplus = idbno + 1;
			for (i = 0 ; i < idno ; i++){
				bgmid += ","+idplus;
				idplus ++
			};
			var bgmidcontent = "bgm_id=" + bgmid;

			sbjname.val(bgmidcontent);

			$("#findSubject").click();

		};

	});

	select.click(function(){
		if($("#subjectList").height()!=0){
			$(".avatar.h .avatar.ll").parent().click();
		};
	});

});