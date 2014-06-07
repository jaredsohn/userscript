// ==UserScript==
// @name           DCZzizilban
// @namespace      http://dczzb.j00s.com/
// @downloadURL    http://userscripts.org/scripts/source/158868.user.js
// @description    디씨찌질반 - 글/댓글 차단기
// @version        0.5.4
// @grant          none
// @include        http://gall.dcinside.com/list.php*
// @match          http://gall.dcinside.com/list.php*
// ==/UserScript==
//
////////////////////////////////////////////////////////////////////////////////
//
// DCZzizilBan(디씨찌질반)
//
// Copyrighted (C) 2009-2013 땡칠도사 in 디씨 프로그래밍 갤러리
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
////////////////////////////////////////////////////////////////////////////////

(function(){
function getConfig() {

///////////// 설정 /////////////
  return {
    // 일반 문자열 혹은 자바스크립트용 정규표현식을 사용할 수 있습니다. 
    // 각 항목에 해당하는 내용을 괄호안에 쓰시면 됩니다.
    // ex) Nickname: ["차단하기","원하는","닉네임"],
    // ID: ["일반문자열", /정규표현식/i, "자동인식"], ...

    // 완전히 차단할 닉네임 혹은 아이디입니다.
    Nickname: [],
    ID: [],
    // 닉네임: 게시판에 표시되는 이름
    // 아이디: 로그인할 때 사용하는 ID
    //         해당 사용자의 겔로그 주소의 끝부분이 ID입니다. 
    //         유동닉 사용자들은 ID가 없습니다.

    // 다음 목록에 있는 단어가 제목이나 댓글에 들어있으면 해당글을 차단합니다.
    Words: [],

    // 다음 목록의 사용자들은 차단에서 제외합니다.
    WhiteNickname: [],
    WhiteID: [],

    // 글과 댓글에 따로 차단을 적용할 수도 있습니다.
    NoThread_ID: [],
    NoThread_Nickname: [],

    NoComment_ID: [],
    NoComment_Nickname: [],

    // 부가적인 기능을 선택할 수 있습니다.
    // 사용 방법은 차단 아이디/닉네임 입력 방법과 비슷합니다.
    // ex) Options: [ShowFiltered],
    //       혹은
    //     Options: [ShowFiltered, HighlightWhites],

    // 현재 사용 가능한 기능은 다음과 같습니다:
    //   * ShowFiltered : 차단된 흔적을 남깁니다.
    //   * HighlightWhites : 화이트리스트에 있는 유저를 강조합니다.

    //Options: [ShowFiltered, HighlightWhites],
    Options: [],

    // 사용할 필터를 설정합니다.
    // 스크립트에 대한 이해 없이는 건드리지 않는 것이 좋습니다.
    ThreadFilters:  [isWhiteUser, isBannedUser, isBannedWord, isBannedUser_Thread],
    CommentFilters: [isWhiteUser, isBannedUser, isBannedWord, isBannedUser_Comment]

  };
}


////////////////////////////////////////////////////////////////////////////////
//
// 코드의 시작입니다. 
// 주석을 영문으로 쓰는건 오랫동안 지켜온 습관입니다... [먼산] */
//
////////////////////////////////////////////////////////////////////////////////
//
// Types
//

function Content (type, text, nickname, id, object) {
  this.type = type;
  this.text = text;
  this.nickname = nickname;
  this.id = id;
  this.object = object;
  // object = { self:, nameElem:, textElem: }
}

function Filter (f, action) {
  this.f = f;
  this.action = action;
}

////////////////////////////////////////////////////////////////////////////////
//
// Filters
//
// myFilter = new Filter
//   (
//     f     : function(Content) -> boolean,
//     action: function(Content) -> void
//   );
//
// If 'f' returns true, 'action' will be executed.
// Both *MUST* be functions with only 1 parameter, whose type is 'Content'.
//

var isWhiteUser = new Filter(
  function (c) {
    return ( array_has (Config.WhiteNickname, c.nickname) ||
             array_has (Config.WhiteID      , c.id      ) );
  },
  function (c) {
    // do nothing if the user is in the whitelist. 
  }
);

var isBannedUser = new Filter(
  function (c) {
    return ( array_has (Config.ID, c.id) ||
             array_has (Config.Nickname, c.nickname) );
  },
  function (c) { deleteContent (c); }
);

var isBannedWord = new Filter(
  function (c) {
    if (array_filter (Config.Words, cmpf(c.text)).length == 0)
      return false;
    return true;
  },
  function (c) { deleteContent (c); }
);

isBannedUser_Thread = new Filter(
  function (c) {
    return ( array_has (Config.NoThread_ID      , c.id      ) ||
             array_has (Config.NoThread_Nickname, c.nickname) );
  },
  function (c) { deleteContent (c); }
);

isBannedUser_Comment = new Filter(
  function (c) {
    return ( array_has (Config.NoComment_ID      , c.id      ) ||
             array_has (Config.NoComment_Nickname, c.nickname) );
  },
  function (c) { deleteContent (c); }
);

////////////////////////////////////////////////////////////////////////////////
//
// Helpers
//
// These functions are useful when writing filters.
//

var delbuf = new Array();
// This buffer stores the object to be deleted.
// plz don't access this directly from filters.

function deleteContent (c) {
  // Adds an object to delbuf
  delbuf.push (c);
}

function array_map (arr, f) {
  // apply 'f' to all the members of array 'arr'
  var i, narr = new Array(arr.length);
  for (i = 0; i < arr.length; i ++)
    narr[i] = f(arr[i]);
  return narr; 
}

function array_filter (arr, f) {
  // apply filter 'f' to array 'arr', and return the result.
  // if 'f(arr[i])' returns false, the member will be remove from 'arr'
  var i, narr = new Array();
  for (i = 0; i < arr.length; i ++) 
    if (f (arr[i]))
      narr.push(arr[i]);
  return narr; 
}

function array_has (arr, obj) {
  // Check if the array has the given object */
  return ( array_filter(arr, eqf(obj)).length > 0 );
}

function cmpf (text) {
  // (C)o(M)(P)are (F)unction - A dark magic
  // Returns a function which matches the given text with string/regexp.
  return function(pat) {
    if (text.wholeText)
      text = text.wholeText;
    else if (text.innerHTML)
      text = text.innerHTML;

    if (pat.constructor.prototype === String.prototype)
      return (text.indexOf(pat) != -1);
    else if (pat.constructor.prototype === RegExp.prototype)
      return (text.search(pat) != -1);
    return false;
  };
}

function eqf (str) {
  // Returns a function that checks the equality.
  return function(word) {
    if (word.constructor.prototype === String.prototype)
      return (str === word);
    else if (word.constructor.prototype === RegExp.prototype)
      return (word.test(str));
    return false;
  }
}

////////////////////////////////////////////////////////////////////////////////
//
// Options
//
// Options directly modifies variables/functions.
//

function ShowFiltered ()
{
  flush_delbuf = function() {
    array_map(delbuf, function(c) {
      var o = c.object;
      o.nameElem.innerHTML = "<b>차단돌이</b>";
      if (c.type == 't') {
        o.textElem.innerHTML = "<font color=\"gray\">&nbsp;&nbsp;ⓧ&nbsp;&nbsp;해당 글은 차단되었습니다.</font>";
      } else if (c.type == 'c') {
        o.textElem.innerHTML = "<font color=\"gray\">해당 댓글은 차단되었습니다.</font>";
      }
    }); 
    delbuf.length = 0;
  };
}

function HighlightWhites () {
  isWhiteUser.action = function(c) {
    if (c.type == 't')
      c.object.nameElem.style.background="#98fb98";
    else 
      c.object.nameElem.style.background="#98fb98";
  }
}

////////////////////////////////////////////////////////////////////////////////
//
// Parsers
//

function isReadingThread() {
  return (document.querySelector('input[name=no]'))? true: false;
}

function getThreadList () {
  return array_map(
    array_filter(
      document.getElementById('list_table').rows,
      function(obj) {
        return (obj && obj.getElementsByTagName('SPAN').length > 0)
      }
    ),
    function(row) {
      var title = row.cells[2].querySelector('a').innerHTML;
      var user = row.cells[3].querySelector('a');
      var nick = (user)? user.title: "<운영자>";
      var id = (user)? user.getAttribute('name'): "<운영자>";

      return new Content('t', title, nick, id, {
        self: row,
        nameElem: row.cells[3],
        textElem: row.cells[2],
      });
    }
  );
}

function getCommentList () {
  return array_map(
    document.querySelector('.comment-table').rows,
    function(row) {
      var user = row.querySelector('.com_name>span');
      var nick = (user)? user.title: "<댓글돌이>";
      var id = (user)? user.getAttribute('name'): "<댓글돌이>";

      var comment = ( row.querySelector('.com_text>div')
                    ||row.querySelector('.com_text'    )).firstChild;

      var cont = new Content('c', comment, nick, id, {
        self: row,
        nameElem: row.querySelector('.com_name'),
        textElem: row.querySelector('.com_text')
      });
      return cont;
    }
  );
}

function flush_delbuf () {
  // Delete contents in 'delbuf'
  array_map(delbuf, function(c) {
      var tbl = c.object.self.parentNode;
      var idx = c.object.self.rowIndex;
      tbl.deleteRow(idx);

      // remove separator
      if (c.type == 't')
        tbl.deleteRow(idx);
    }
  ); 
  delbuf.length = 0;
}

////////////////////////////////////////////////////////////////////////////////

function applyFilters (list, filters) {
  var i, j;
  for (i = 0; i < list.length; i ++)
    for (j = 0; j < filters.length; j ++)
      if (filters[j].f (list[i]))
        {
          filters[j].action (list[i]);
          break;
        }
}

function clearThreadList() {
  applyFilters (getThreadList(), Config.ThreadFilters);
  flush_delbuf();
}

function clearCommentList() {
  applyFilters (getCommentList(), Config.CommentFilters);
  flush_delbuf();
}

////////////////////////////////////////////////////////////////////////////////
//
// Main
//

var Config = getConfig();

// apply 'Options'
(function () {
  for (var i in Config.Options)
    (Config.Options[i])();
})();

function bindViewCommentEvent() {
  // inject script into the page to override new_view_comment2
  function code() {
    var old = window.new_view_comment2;
    window.new_view_comment2 = function() {
      old.apply(window, arguments);
      document.querySelector('#dczzb_proxy').onclick();
    };
  }
  var script = document.createElement('script');
  var text = document.createTextNode('('+ code + ')()');
  script.appendChild(text);
  document.body.appendChild(script);

  // proxy that allows us to call functions declared in this scope
  var proxy = document.createElement('span');
  proxy.setAttribute('id', 'dczzb_proxy');
  proxy.onclick = function() {
    clearCommentList();
  };
  document.body.appendChild(proxy);
}

function main() {
  // check if the list is loaded.
  // this prevents some pointless errors
  if (document.getElementById('TB')) {
    clearThreadList();

    if (isReadingThread()) {
      clearCommentList();
      bindViewCommentEvent();
    }
  } else
    setTimeout(main, 30);
}
main();

})();

