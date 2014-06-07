// ==UserScript==
// @name          clien user memo
// @namespace     http://nuridol.egloos.com
// @description   클리앙 게시판 목록의 아이디에 메모를 넣습니다.
// @version       1.0.0
// @author        NuRi
// @require       http://code.jquery.com/jquery-latest.js
// @include       http://clien.career.co.kr/*
// ==/UserScript==

// ...script by NuRi
// ...modify by ddini 2011-06-17

/*
	2011-06-19	진행상황
				db 저장 & 불러오기

				매핑하기는 아직이며, 구 userList를 전체 로드하여 별명으로 대체하기는 아직

	2011-06-19	1개 삭제, 수정하기 

				아직 안된거

				-	@include 에서 빈창에서는 유저 스크립트 안먹음

				-	덧글작성자 메모

				-	게시물 보기 상태에서 메모등록,확인
				-	서버에 전송하기나 
				-	리스트를 csv로 출력하기는 아직
				-	크롬외 브라우저, UI개선 아직
				-	전체 메모확인, 중복체크, db 클리어
				-	메모삭제, 수정
				-	기초데이터 create table 할때 insert 할거..
				-	저장일자나 ip 색상등 기타 프로퍼티
				-	클리앙외 타사이트
				-	파일 스토리지 지원
*/

// 목록제거
function addMemo() {

			global_user_memo = '';

			function notice(v1)
			{
				//alert(v1);

				d = document.createElement("div");
				d.id = "cdiv";
				d.style.cssText="font-size:10px;font-face:tahoma;padding:10px;border:1px solid;position:fixed;right:0px;top:0px;width:100px;background:none repeat scroll 0 0 white;z-index:9999;"

				d.innerHTML = v1;
				
				document.getElementsByTagName("body")[0].appendChild(d);

				d.onclick=function()
				{
					d.style.display='none';
				}

			}


			// 데이터베이스 열기
			var db = openDatabase("ClienDB", " ", "Clien  Database", 1024*1024);

			// 테이블 생성
			db.transaction(function (tx)
			{
				// if not exists 구문을 이용, 테이블이 없을때에만 테이블 생성
				// Clien_id는 자동으로 인덱싱되는 키본키

				tx.executeSql("create table if not exists Clien (" +
										" Clien_id integer primary key autoincrement," +
										" user_id, user_memo, reg_date)");
		
			});


			function init()
			{
				add_mute('cipher', '운영자님');
				add_mute('jubei', '주베이님');
				add_mute('ddini', '도미노피자');
			}

			function load(v1, v2, v3)
			{

				// SELECT문 실행
				db.transaction(function (tx)
				{

					tx.executeSql("select * from Clien where user_id = '"+v1+"'", [], function(tx, rs)
					{

						var list = document.getElementById("clienbox");
						list.innerHTML = "";
						
						var rows = rs.rows;

						if(rows.length>0) //메모가 있는경우
						{
							if(!v2)
							{
								if(!v3)
								{
									alert('a:'+rows.length + ',' + rows.item(0).user_memo);						
								}
								global_user_memo = rows.item(0).user_memo;
								notice(global_user_memo);
							}
							else
							{
								update(v1, v2);
							}
						}
						else			  //메모가 없는경우
						{
							if(v2.length>0)
							add(v1, v2);
							//alert(rows.length);
							//alert('what?');
						}

					});				
					
				});
			}

			// 전체 메모 보기
			function loadAll()
			{

				// SELECT문 실행
				db.transaction(function (tx)
				{

					tx.executeSql("select * from Clien", [], function(tx, rs)
					{
						var ht = 20;
						var wd = 0;

						str="<table border=1 style=position:absolute;left:"+wd+"px;top:"+ht+"px;background:red class=menu_tbl><tr><td>idx</td><td>id</td><td>memo</td><td>regdate</td></tr>";
						
						var rows = rs.rows;

						// Clien 테이블에 저장된 모든 값을 표시
						for ( var i = 0 ; i < rows.length ; i++ )
						{
							var row = rows.item(i);						
							var dy = new Date(row.reg_date);
							var ds = dy.getYear()+1900+'-'+dy.getMonth()+'-'+dy.getDate();

							//str+="<tr><td>"+row.Clien_id+"</td><td>"+row.user_id+"</td><td>"+row.user_memo+"</td><td>"+ds+"</td><td><input type=button value='x' class=btn_remove id="+row.user_id+" onclick=\"remove('"+row.user_id+"')\"></td></tr>";
							str+="<tr><td>"+row.Clien_id+"</td><td>"+row.user_id+"</td><td>"+row.user_memo+"</td><td>"+ds+"</td><td><input type=button id='"+row.user_id+"' value='x' class=btn_remove><input type=button id='"+row.user_id+"' value='+' class=btn_update></td></tr>";
						}
						str+="<input type=button onclick=self.close() value=' Close ' class=btn_close></table>";

						//cwin = window.open('','win','width=320,height=320');
						//cwin.document.write(str);
						//alert(str);
						document.body.innerHTML=str+document.body.innerHTML;
						//$("#account").insert(str);
						//$("#account").appendChild(str);

							$(".btn_remove").live('click',
								function(e){
									var flag = confirm(e.srcElement.id+'님의 메모를 삭제할까요?');
									if(flag)remove(e.srcElement.id);	
									location.reload();									
								}
							);

							$(".btn_update").live('click',
								function(e){
									var flag = prompt(e.srcElement.id+'님의 메모수정','');
									if(flag.length>1)update(e.srcElement.id, flag);							
									location.reload();
								}
							);

							$(".btn_close").live('click',
								function(e){
									$(".menu_tbl").hide();
									location.reload();
								}
							);

					});				

					
				});
				

			}

			function add_mute(v1, v2)
			{
				// var user_id = document.getElementById("user_id").value;
				// var user_memo = document.getElementById("user_memo").value;

				var user_id = v1;
				var user_memo = v2;
				var reg_date = new Date().getTime();

				// Clien 테이블에 값 저장
				db.transaction(function (tx)
				{
					tx.executeSql("insert into Clien (user_id, user_memo, reg_date) values (?, ?, ?)",
						[user_id, user_memo, reg_date],
						function (tx, rs)
						{
							//alert("회원ID[" + rs.insertId + "] 레코드가 저장되었습니다.");
							//load(v1);
						});
				});
			}

			function add(v1, v2)
			{
				// var user_id = document.getElementById("user_id").value;
				// var user_memo = document.getElementById("user_memo").value;

				var user_id = v1;
				var user_memo = v2;
				var reg_date = new Date().getTime();

				// Clien 테이블에 값 저장
				db.transaction(function (tx)
				{
					tx.executeSql("insert into Clien (user_id, user_memo, reg_date) values (?, ?, ?)",
						[user_id, user_memo, reg_date],
						function (tx, rs)
						{
							alert("회원ID[" + rs.insertId + "] 레코드가 저장되었습니다.");
							load(v1);
						});
				});
			}

			function update(v1, v2)
			{
				// 선택한 항목을 update
				db.transaction(function (tx)
				{
					//update Clien SET user_memo='user_memo' WHERE user_id='user_id';
					tx.executeSql("update Clien set user_memo=? where user_id = ?",
						[v2, v1],
						function()
						{
							alert("회원ID[" + v1 + "] 메모가 수정되었습니다.");
							load(v1);
						});
				});
			}



			function remove(v1)
			{
				// 선택한 항목을 DELETE 문으로 삭제
				db.transaction(function (tx)
				{
					tx.executeSql("delete from Clien where user_id = ?",
						[v1],
						function()
						{
							alert(v1+" deleted.");
							load(v1);
						});
				});
			}

			function removeAll()
			{

				db.transaction(function(tx) 
				{
					tx.executeSql("delete from Clien", [],
					function() {
						alert("All of list are cleared.");
					});
				});
			}

			function drop()
			{

				db.transaction(function(tx) 
				{
					tx.executeSql("drop table Clien", [],
					function() {
						alert("Table drop complete");
					});
				});
			}



    // 이 목록을 수정해 주세요!
	//아이디 또는 닉네임
    var userList   = ["~",	"cipher",  "wchoi19",  "주베이",   "NuRi",   "도미노"    ]; 
    var userAlias  = ["0",	"대장님",  "최완기님", "주베이님", "NuRi님", "도미노피자"];
    var userColors = ["#0000FF",	"#0000FF", "#00AA00",  "#AABBFF",  "blue",   "green"     ];

 	var aid = $("td.post_name a"); //게시물 작성자 

	// 본문보기 여부
	var viewFlag = 0;

	//alert(aid.length);

	if(aid.length < 10) //본문보기 인경우
	{
	 	var aid = $(".user_info a"); //게시물 작성자 
		viewFlag = 1;

		//alert(aid.length);

		user_id = aid[0].title.match(/\[(.+)\]/);
		//alert('1:'+user_id);
		//user_memo = 
		load(user_id[1], '', 1);
		//alert('2:'+global_user_memo);
	}
	
	for (var i=0;i < aid.length; i++) {

		var flag=0;
		for (var j=0;j < userList.length; j++) {
			user_id = aid[i].title;
			b = aid[i].title.match(/\[(.+)\]/);

			if(user_id.indexOf(userList[j]) != -1 )
			{
				//aid[i].after(search);
				 chbx = document.createElement("input");
				 chbx.setAttribute("type", "button");
				 chbx.setAttribute("id", b[1]);
				 chbx.setAttribute("class", "btn");
				 chbx.setAttribute("value", "=" + userAlias[j]);
				 chbx.setAttribute("style", "font-size:8px;color:"+userColors[j]+";");
				 chbx.setAttribute("size", "8");
				 //chbx.innerText=userAlias[j];
				 //chbx.setAttribute("onClick", "alert()");
				//aid[i].parentElement.parentElement.appendChild(chbx);
				flag=j;
				break;
			} else {
				// 회원 추가 버튼
				 chbx = document.createElement("input");
				 chbx.setAttribute("type", "button");
				 chbx.setAttribute("id", b[1]);
				 chbx.setAttribute("class", "btn");
				 chbx.setAttribute("value", "_" + userAlias[j]);
				 //chbx.setAttribute("style", "font-size:8px;color:"+userColors[j]+";");
				 chbx.setAttribute("size", "8");
				 //chbx.setAttribute("onClick", "alert()");
				//aid[i].parentElement.parentElement.appendChild(chbx);
			}
		} // for j

		if(flag!=0)
		{
			b = aid[i].title.match(/\[(.+)\]/);
			chbx.value=b[1];
			//chbx.setAttribute("onClick", "add0('"+b[1]+"')");

			//$(".btn").click(add0());

			aid[i].parentElement.parentElement.appendChild(chbx);
		} else {
			b = aid[i].title.match(/\[(.+)\]/);
			chbx.value=b[1];
			//chbx.setAttribute("onClick", "add0('"+b[1]+"')");

			//$(".btn").click(add0());

			aid[i].parentElement.parentElement.appendChild(chbx);
		}
		//flag=0;

	} // for i


/*
/
/	메모 명령 클릭
/
*/

	$(".btn").click(
		function(){
			test = prompt(this.id+' 님의 아이디에 메모 하기 ?:help','');
			//alert(test);
			
			if(test == 'clear')
			{
				removeAll();
			} else if(test == 'x')
			{
				q=confirm("메모를 삭제하시겠습니까?");
				if(q)remove(this.id);
			} else if(test =='google')
			{
				window.location='http://www.google.com/webhp?hl=ko#hl=ko&xhr=t&q='+this.id;
			} else if(test == 'all')
			{
				loadAll();
			} else if(test == 'drop')
			{
				drop();
			} else if(test == 'init')
			{
				init();
			} 

			else if(test == 'yozm')
			{
				window.location='http://yozm.daum.net/api/popup/post?prefix='+encodeURIComponent(this.id+'님의 '+document.title)+'&link='+encodeURIComponent(window.location.href);
			}	


			else if(test == 'me2day')
			{
				window.location='http://me2day.net/plugins/post/new?new_post[body]='+this.id+'님의 "'+document.title+'":'+encodeURIComponent(window.location.href);
			}	

	else if(test == 'cyworld')
			{
				window.location='http://csp.cyworld.com/bi/bi_recommend_pop.php?title='+encodeURIComponent(this.id+'님의 '+document.title)+'&url='+encodeURIComponent(window.location.href);
			}	

			else if(test == 'twitter')
			{
				window.location='https://twitter.com/intent/tweet?source=webclient&text='+this.id+'님의 '+document.title+' '+encodeURIComponent(window.location.href);
			}	

			else if(test == 'facebook')
			{
				window.location='http://www.facebook.com/sharer/sharer.php?t='+encodeURIComponent(this.id+'님의 '+document.title)+'&u='+encodeURIComponent(window.location.href);
			}	

			else if(test == 'google plus')
			{
				window.location='https://www.google.com/bookmarks/mark?op=add&title='+encodeURIComponent(this.id+'님의 '+document.title)+'&bkmk='+encodeURIComponent(window.location.href);
			}



			else if(test == '?')
			{
				var helpMsg = "1. 메　　　모: 1자이상 입력\n\n2. 전체　삭제: drop\n3. 전체　보기: all\n4. 전체지우기: clear\n5. 지　우　기: x\n\n6. 구　글　링: google\n\n7. 다 음 요 즘: yozm\n8. 미 투 데 이: me2day\n9. 트　위　터: twitter\n10. 페 이 스 북: facebook\n11. 구글: google plus\n12. 도　움　말: ?";
				alert(helpMsg);
			}
			else
			{
				load(this.id, test);
			} 
		}
	);

}

// call jQuery
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// load jQuery and execute the main function
addJQuery(addMemo);