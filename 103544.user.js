// ==UserScript==
// @name           alba-kick for DVDPRIME
// @namespace      http://www.tobyto.pe.kr
// @grant          none
// @description    Erase alba's articles & comment
// @copyright      2009+, lum34
// @licence        GPL licence
// @version        0.04
// @homepage	   http://www.tobyto.pe.kr
// @include        http://dvdprime.donga.com/bbs/*
// @enable         true
// ==/UserScript==
(function() {

/* alba-kick for DVDPRIME version 0.04
 * 이 스크립트는 DVDPRIME 프차 및 시게에서 알바로 암약하는 놈들과 상종하지않기
 * 위한 스크립트입니다.
 * 0.03 버전에서는 http://dczzb.daz.kr/ 프갤의 땡칠도사님의 찌질반 스크립트를
 * 참조하여 대폭적인 수정이 이루어졌습니다.
 * 프겔의 땡칠도사님께 감사드립니다. (- -) (_ _) (- -)
 *
 * 본 스크립트는 GPL에 따라 누구나 자유롭게 사용하고 배포 및 수정할 수 있습니다.
 * GPL원문: http://www.fsf.org/licensing/licenses/gpl.html
 */

/*  ########## 설정 ##########              */

	function setConfig() { Config = {
/*
일반 문자열 혹은 자바스크립트용 정규표현식을 사용할 수 있습니다. 
각 항목에 해당하는 내용을 괄호안에 쓰시면 됩니다.
ex) Nickname: ["차단하기","원하는","닉네임"],
    ID: ["일반문자열", /정규표현식/i, "자동인식"], ...
    Nickname: 게시판에 표시되는 이름
	ID : 사용자 ID입니다.
	게시판 목록에서 소스 보기를 하시면 아래와 같은 항목을 찾으실 수 있습니다. 아이디라고 표시된 부분이
	DP 아이디 이고 Nickename이 Nickename입니다.
	<p onclick="javascript:id_show_menu('아이디','',event);return false" style="cursor:pointer;">닉네임</p>
	닉네임에 특수문자나 HTML이 들어있는 경우 차단이 안될 수도 있습니다. 이때는 아이디를 넣어주시면 차단이
	됩니다. HTML이 들어 있는 닉네임인 경우 HTML 부분을 대문자로 하시면 차단이 될 수도 있습니다.
*/
		Nickname: [],
		ID: [],
/* 다음 목록에 있는 단어가 제목이나 댓글에 들어있으면 해당글을 차단합니다.   */
		Words: [],

/* 다음 목록의 사용자들은 차단에서 제외합니다.                               */
		WhiteNickname: [],
		WhiteID: [],

                                                                            /*
- 부가적인 기능을 선택할 수 있습니다.
사용 방법은 차단 아이디/닉네임 입력 방법과 비슷합니다.
ex) Dpoptions: [ShowFiltered],
    Dpoptions: [ShowFiltered, HighlightWhites],
아무런 흔적을 남기고 싶지 않다면
Dpoptions: [],
와 같이 하시면 됩니다.

현재 사용 가능한 기능은 다음과 같습니다:
* ShowFiltered : 차단된 흔적을 남깁니다.
* HighlightWhites : 화이트리스트에 있는 유저를 강조합니다.             */

		Dpoptions: [ShowFiltered, HighlightWhites],

/*

- 사용할 필터를 설정합니다.
스크립트에 대한 이해 없이는 건드리지 않는 것이 좋습니다.                  */
	ThreadFilters:  [isWhiteUser, isBannedUser, isBannedWord],
	CommentFilters: [isWhiteUser, isBannedUser, isBannedWord]
};}


/******************************************************************************/
/* 스크립트 시작. 
 *
/******************************************************************************/

	function content (type, text, nickname, id, object)
	{this.type=type; this.text=text; this.nickname=nickname; this.id=id; this.object=object;}

	function filter (f, action)
	{this.f=f;this.action=action;}


/******************************************************************************/
/*  필터 정의 
 *
 * myFilter = new filter (
 *     boolean function (content) f,
 *     void    function (content) action
 * );
 *
 * 'f'가 true를 반환하면, 'action' 이 수행된다.
 *  두 함수는 content 1개의 파라미터만을 가진다.
 */

	isWhiteUser = new filter (
		function(c) { return (array_has(Config.WhiteNickname, c.nickname) || array_has (Config.WhiteID, c.id)); },
		function(c) {}
	);

	isBannedUser = new filter (
		function(c) { return (array_has(Config.ID, c.id) || array_has(Config.Nickname, c.nickname)); },
		function(c) { deleteContent(c); }
	);

	isBannedWord = new filter (
		function(c) {
			if (array_filter (Config.Words, cmpf(c.text)).length == 0)
			return false;
			return true;
		},
		function(c) { deleteContent (c); }
	);

/******************************************************************************/
/* 옵션 정의 */
	function ShowFiltered() {
		flush_delbuf = function () {
			array_map(
				delbuf, 
				function(c) {
					var o = c.object;
					if (c.type == "t") {
						if (document.getElementById('image2')) {
							o.cells[3].innerHTML = "해당 글은 차단되었습니다.";
							o.cells[3].style.textDecoration = "line-through";
							o.cells[3].style.color = "gray";
							o.cells[4].innerHTML = "차단";
							o.cells[4].style.fontWeight = "bold";
						}
						else {
							o.cells[1].innerHTML = "해당 글은 차단되었습니다.";
							o.cells[1].style.textDecoration = "line-through";
							o.cells[1].style.color = "gray";
							o.cells[2].innerHTML = "차단";
							o.cells[2].style.fontWeight = "bold";
						}
					} else if (c.type == "c1") {
						o.cells[0].innerHTML = "차단";
						o.cells[0].style.fontWeight = "bold";
						o.parentNode.rows[2].cells[0].innerHTML = "<img src=http://dvdprime.donga.com/dpUserUpImg/upload/201105/2011520261.jpg>";
						o.parentNode.rows[2].getElementsByTagName("P")[0].innerHTML = "해당 댓글은 차단되었습니다.";
						o.parentNode.rows[2].getElementsByTagName("P")[0].style.textDecoration = "line-through";
						o.parentNode.rows[2].getElementsByTagName("P")[0].style.color = "gray";
					} else if (c.type == "c2") {
						o.cells[1].innerHTML = "차단";
						o.cells[1].style.fontWeight = "bold";
						o.parentNode.rows[2].cells[0].innerHTML = "해당 댓글은 차단되었습니다.";
						o.parentNode.rows[2].cells[0].style.textDecoration = "line-through";
						o.parentNode.rows[2].cells[0].style.color = "gray";
					}
				} 
			);
			delete delbuf;
			delbuf = new Array();
		};
	}

	function HighlightWhites() {
		isWhiteUser.action = function (c) {
			if (c.type == "t") {
				if (document.getElementById('image2')) c.object.cells[4].style.background="#98fb98";
				else c.object.cells[2].style.background = "#98fb98";
			}
			else if (c.type == "c1") 
				c.object.cells[0].style.background = "#98fb98";
			else if (c.type == "c2")
				c.object.cells[1].style.background = "#98fb98";
		}
	}

/******************************************************************************/
/* 필터 */
/* 삭제될 부분이 저장되는 필터 정의*/
	var delbuf = new Array();


/* 'delbuf'에 삭제될 부분 저장 */
	function deleteContent(c) {
		delbuf.push(c);
	}

/* 배열 'arr'에 함수 'f' 적용 */
	function array_map(arr, f) {
		for (var i = 0, j = arr.length; i < j; i++)
			arr[i] = f(arr[i]);
		return arr; 
	}

/* 필터 'f'를  배역 'arr'에 적용하여 결과값 돌려줌..
* 결과값이 false 이면, 배열에서 제거 */
	function array_filter(arr, f) {
		var newlist = new Array();
		for (var i = 0, j = arr.length; i < j; i++)
			if (f (arr[i]))
				newlist.push(arr[i]);
			return newlist;
	}

/* 배열값이 존재하는지 체크 */
	function array_has(arr, obj) {
		if( array_filter (arr, cmpf_equal(obj)).length > 0 )
	    return true;
		return false;
	}

/* 문자열 및 정규표현식 비교함수 */
	function cmpf(str) {
		return function(word) {
			if (word.constructor.prototype === String.prototype) {
				if (str.indexOf(word) >= 0)
				return true;
			}
			else if (word.constructor.prototype === RegExp.prototype) { 
				if (str.search(word) >= 0)
				return true;
			}
			return false;
		}
	}

/* 비교함수 */
	function cmpf_equal(str) {
		return function(word) {
			if (word.constructor.prototype === String.prototype) {
				if (str.length == word.length && str.indexOf(word) == 0)
				return true;
			}
			else if (word.constructor.prototype === RegExp.prototype) {
				if (str.replace(word, "").length == 0)
				return true;
			}
			return false;
		}
	}

/* 트리밍 함수 */
	function trim(str) {
		return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
	}

/******************************************************************************/
/* 게시판 관련 체크함수 */

/* 게시판 본문인지 체크 */
	function is_ReadingThread() {
		if(document.getElementById('divStr')) return true;
		else false;
	}

/* 게시판 리스트인지 체크*/
	function is_inThreadList(obj) {
		if (!obj || typeof( obj.innerHTML ) == "undefined") return false;
		if (obj.parentNode.parentNode.cells.length == 6 || obj.parentNode.parentNode.cells.length == 8) return true;
	}
/* 리플리스트 체크 */
	function is_inCommentList(obj) {
		if (!obj || typeof( obj.innerHTML ) == "undefined") return false;
		if(obj.className == "recom_id" && obj.innerHTML.search(/<img /i) == -1) return true;
	}

/******************************************************************************/
/* 게시판 분석 함수 */
	function get_ID (id) {
		var id = id.parentNode.innerHTML;

		id = id.substr( id.search(/id_show_menu/i)+14 );
		id = id.replace(/\'.*/i, "");

		return id;
	}

	function to_Thread(p) {
		if(p.parentNode.parentNode.cells.length == 6)
		var text	= trim(p.parentNode.parentNode.cells[1].innerHTML);
		else
		var text	= trim(p.parentNode.parentNode.cells[3].innerHTML);
		text		= text.substr( text.search(/<a /i)+1 );
		text		= text.substr( text.indexOf(">"  )+1 );
		text		= text.replace(/<\/a>.*/i, "");
		return new content (
			"t",
			text,
			p.innerHTML, 
			get_ID(p),
			p.parentNode.parentNode);
	}

	function to_Comment(a) {
		var c = a.parentNode.parentNode.parentNode.getElementsByTagName("TD");
		
		for (var i = 0, j = c.length; i < j; i++) {
			if( i== 9  && c[i].className == "recom" && c[i].getElementsByTagName("P").length > 0 && typeof(c[i].innerHTML) != "undefined") {
				var text = c[i].innerHTML;
				var nickname = a.innerHTML;
				nickname = nickname.replace(/.*<strong>/i,"").replace(/<\/strong>.*/i,"");
				return new content (
					"c1",
					text,
					nickname,
					get_ID(a),
					a.parentNode.parentNode);
			}
			else if(i == 6 && c[i].className == "recom" && c[i].getElementsByTagName("P").length == 0 && typeof(c[i].innerHTML) != "undefined") {
				var text = c[i].innerHTML;
				var nickname = a.innerHTML;
				nickname = nickname.replace(/.*<strong>/i,"").replace(/<\/strong>.*/i,"");
				return new content (
					"c2",
					text,
					nickname, 
					get_ID(a),
					a.parentNode.parentNode);
			}
		}
						
	}
/******************************************************************************/
/* 게시판 리스트 가져오기 */
	function getThreadList() {
		var writer = document.getElementsByTagName("P");
		return array_map(array_filter(writer, is_inThreadList), to_Thread);
	}

/* 게시판 리플 가져오기 */
	function getCommentList() {
		var writer = document.getElementsByTagName("A");
		return array_map(array_filter(writer, is_inCommentList), to_Comment);
	}

/******************************************************************************/

/* 'delbuf'의 내용 삭제 */
	function flush_delbuf() {
		array_map (
			delbuf, 
			function(c) {
				var par = c.object.parentNode;
				
				if(c.type == "c1") {
						par.deleteRow(1);
						par.rows[1].cells[0].innerHTML = "";
						par.rows[1].getElementsByTagName("P")[0].innerHTML = "";
			}
				else if(c.type == "c2") {
					for (var i = 0, j = par.rows.length; i < j; i++)
						par.deleteRow(0);
				}
				else if(c.type == "t") {
					var delIdx = c.object.rowIndex;
					par.deleteRow(delIdx);
				}
			}
		); 
		delete delbuf;
		delbuf = new Array();
	}

/* 사용자 필터 적용 */
	function applyFilters(list, filters) {
		for (var i = 0, j = list.length; i < j; i++){
			for (var k = 0, l = filters.length; k < l; k++) {
				if (filters[k].f (list[i])) {
					filters[k].action (list[i]);
					break;
				}
			}
		}
	}

/* 게시판 리스트와 코멘트를 구분하여 사용자 필터를 적용하여 내용삭제 */
	function clearThreadList() {
		applyFilters(getThreadList(), Config.ThreadFilters);
		flush_delbuf();
	}

	function clearCommentList() {
		applyFilters(getCommentList(), Config.CommentFilters);
		flush_delbuf();
	}


	var Config;
	setConfig();
	Config.Done = false;

	(function () {
		var i;
		for (var i = 0, j = Config.Dpoptions.length; i < j; i++) (Config.Dpoptions[i])();
	})();

	dpkickmain = function () {

/* IETOY는 실행 시점을 보장못하므로 페이지가 완전히 로딩될때까지 기다린다.*/
		if (Config.Done) return;

/* 웹페이지가 로딩되었는지 체크 */
		if (document.getElementById("cse-search-box")) {
/* 게시판 리스트/본문인지 체크한후 필터 적용 */
			if(is_ReadingThread()) {
				clearCommentList();
			}
			else {
				clearThreadList();
			}
		}
	}

	dpkickmain();
})();
