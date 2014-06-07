// ==UserScript==
// @name           diaryBookmark
// @namespace      diaryBookmark
// @include        http://*.diary.ru/*
// ==/UserScript==

// version 0.01
// by R-Ser

function get(name){ return GM_getValue(name, null); }
function del(name){ return GM_deleteValue(name); }
function set(name, value) { return GM_setValue(name, value); }

if (get("noteCount") == null) set("noteCount", 0);

var thisDiaryOwner = document.getElementById("thisDiaryOwner");
var url = String(document.location);
url = url.replace(/\/[^\/]*$/, '');
url = url.replace(/^http:\/\//, '');
url = url.replace(/^(beta|peta)/, 'www');

if (thisDiaryOwner != null){

	thisDiaryOwner.innerHTML = '<div><a href="#" id="noteId"></a></div>' + thisDiaryOwner.innerHTML;
	var noteId = document.getElementById('noteId');

	function getState(){
		var i;
		var count = get('noteCount');
		for (i = 0; i < count; i++)
			if (get('noteUrl[' + i + ']') == url) return i;
		return -1;
	}

	function updateNoteId(){
		if (getState() != -1)
			noteId.innerHTML = 'Удалить из закладок';
		else
			noteId.innerHTML = 'Добавить в закладки';
	}

	noteId.addEventListener('click', function(){
		var flag = getState();
		var count = get("noteCount");
		if (flag != -1){
			set("noteCount", --count);
			set("noteUrl[" + flag + "]", get("noteUrl[" + count + "]"));
			set("noteName[" + flag + "]", get("noteName[" + count + "]"));
			del("noteUrl[" + count + "]");
			del("noteName[" + count + "]");
		}else{
			set("noteUrl[" + count + "]", url);
			set("noteName[" + count + "]", String(document.title).replace(/^[^—]*— /, ''));
			set("noteCount", ++count);
		}
		updateNoteId();
		return false;
	}, false);

	updateNoteId();

}else if (url == 'www.diary.ru'){
	var contant = document.getElementById('contant');
	contant.innerHTML = contant.innerHTML + '<div id="noteMain"></div>';
	var noteMain = document.getElementById('noteMain');

	function delNote(flag){
		return function () {
			var count = get("noteCount");
			set("noteCount", --count);
			set("noteUrl[" + flag + "]", get("noteUrl[" + count + "]"));
			set("noteName[" + flag + "]", get("noteName[" + count + "]"));
			del("noteUrl[" + count + "]");
			del("noteName[" + count + "]");
			updateNote();
		}
	}

	function updateNote(){
		noteMain.innerHTML = '';
		var count = get('noteCount');
		if (count > 0){
			noteMain.innerHTML = '<h1>Мои закладки</h1><div class="line_h"></div><div class="sp" id="noteMainList"></div>';
			var noteMainList = document.getElementById("noteMainList");
			var i;
			for (i = 0; i < count; ++i){
				noteMainList.innerHTML = noteMainList.innerHTML + '<a href="#" id="noteId' + i + '"><img src="http://static.diary.ru/images/-.gif"></a> <a href="http://'
					+ get("noteUrl[" + i + "]") + '/" target="_blank">' + get("noteName[" + i + "]") + '</a><br />';
			}

			for (i = 0; i < count; ++i){
				var noteId = document.getElementById('noteId' + i);
				noteId.addEventListener('click', delNote(i), false);
			}
		}
	}
	updateNote();

	GM_registerMenuCommand( "Delete All Bookmarks", function(){
		var count = get("noteCount");
		var i;
		for (i = 0; i < count; ++i){
			del("noteUrl[" + i + "]");
			del("noteName[" + i + "]");
		}
		set("noteCount", 0);
	});
}
