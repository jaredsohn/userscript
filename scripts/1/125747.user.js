// ==UserScript==
// @name          @irdroid翻訳
// @description   Airdroidを日本語にテキトーに翻訳します includeを各自で変更すること!
// @include       http://192.169.00.*:8888/*
// ==/UserScript==

const filters = [

{
    name: "find Apps",
    regexp: /Apps/g,
    txt: function(match) { return "アプリ"; }
  },
{
    name: "find Messages",
    regexp: /Messages/g,
    txt: function(match) { return "メッセージ"; }
  },
   {
    name: "find Photos",
    regexp: /Photos/g,
    txt: function(match) { return "写真"; }
  },
    {
    name: "find Music",
    regexp: /Music/g,
    txt: function(match) { return "音楽"; }
  },
  {
    name: "find Upload",
    regexp: /Upload/g,
    txt: function(match) { return "アップロード"; }
  },
{
    name: "find Select Files",
    regexp: /Select Files/g,
    txt: function(match) { return "ファイルを選択"; }
  },
{
    name: "find Files",
    regexp: /Files/g,
    txt: function(match) { return "ファイル"; }
  },
  {
    name: "find Market",
    regexp: /Market/g,
    txt: function(match) { return "マーケット"; }
  },
  {
    name: "find Ringtones",
    regexp: /Ringtones/g,
    txt: function(match) { return "着信音"; }
  },
{
    name: "find Contacts",
    regexp: /Contacts/g,
    txt: function(match) { return "電話帳"; }
  },
{
    name: "find Call Log",
    regexp: /Call Log/g,
    txt: function(match) { return "通話履歴"; }
  },
   
   {
    name: "find Clipboard",
    regexp: /Clipboard/g,
    txt: function(match) { return "ｸﾘｯﾌﾟﾎﾞｰﾄﾞ"; }
  },
    {
    name: "find Install App",
    regexp: /Install App/g,
    txt: function(match) { return "インストール"; }
  },
  {
    name: "find Search apps...",
    regexp: /Search apps.../g,
    txt: function(match) { return "アプリを探す..."; }
  },
  {
    name: "find Detail...",
    regexp: /Detail.../g,
    txt: function(match) { return "詳細..."; }
  },
   {
    name: "find Login",
    regexp: /Login/g,
    txt: function(match) { return "ログイン"; }
  },
  {
    name: "find Refresh",
    regexp: /Refresh/g,
    txt: function(match) { return "再読み込み"; }
  },
  {
    name: "find Rename",
    regexp: /Rename/g,
    txt: function(match) { return "名前を変更"; }
  },
  {
    name: "find Cut",
    regexp: /Cut/g,
    txt: function(match) { return "切り取り"; }
  },
   {
    name: "find Paste",
    regexp: /Paste/g,
    txt: function(match) { return "貼り付け"; }
  },
  {
    name: "find Delete",
    regexp: /Delete/g,
    txt: function(match) { return "削除"; }
  },
  {
    name: "find Export as ZIP",
    regexp: /Export as ZIP/g,
    txt: function(match) { return "ZIPで保存"; }
  },
    {
    name: "find Export",
    regexp: /Export/g,
    txt: function(match) { return "保存"; }
  },
  {
    name: "find Import",
    regexp: /Import/g,
    txt: function(match) { return "インポート"; }
  },
  {
    name: "find SD Card",
    regexp: /SD Card/g,
    txt: function(match) { return "SDカード"; }
  },
    {
    name: "find Free Space",
    regexp: /Free Space/g,
    txt: function(match) { return "空き容量"; }
  },
  {
    name: "find free of",
    regexp: /free of/g,
    txt: function(match) { return "総容量:"; }
  },
  {
    name: "find Confirm",
    regexp: /Confirm/g,
    txt: function(match) { return "確認"; }
  },
  {
    name: "find Sure to exit AirDroid",
    regexp: /Sure to exit AirDroid/g,
    txt: function(match) { return "AirDroidを終了しますか"; }
  },{
    name: "find Copyright",
    regexp: /Copyright/g,
    txt: function(match) { return "著作権"; }
  },
  {
    name: "find Videos",
    regexp: /Videos/g,
    txt: function(match) { return "動画"; }
  },
  {
    name: "find Availvable :",
    regexp: /Availvable :/g,
    txt: function(match) { return "空き:"; }
  },
  {
    name: "find Other",
    regexp: /Other/g,
    txt: function(match) { return "その他"; }
  },
  {
    name: "find Books",
    regexp: /Books/g,
    txt: function(match) { return "書籍"; }
  },
  {
    name: "find User",
    regexp: /User/g,
    txt: function(match) { return "ユーザー"; }
  },
  {
    name: "find System",
    regexp: /System/g,
    txt: function(match) { return "システム"; }
  },
  {
    name: "find Recommends",
    regexp: /Recommends/g,
    txt: function(match) { return "おすすめ"; }
  },
  {
    name: "find Applications",
    regexp: /Applications/g,
    txt: function(match) { return "アプリケーション"; }
  },
  {
    name: "find App",
    regexp: /App/g,
    txt: function(match) { return "アプリ"; }
  },
  {
    name: "find Uninstall",
    regexp: /Uninstall/g,
    txt: function(match) { return "削除"; }
  },
  {
    name: "find Date Installed",
    regexp: /Date Installed/g,
    txt: function(match) { return "インストール日"; }
  },
    {
    name: "find Are you sure you want to delete this file",
    regexp: /Are you sure you want to delete this file/g,
    txt: function(match) { return "このファイルを削除しますか"; }
  },
  {
    name: "find File",
    regexp: /File/g,
    txt: function(match) { return "ファイル"; }
  },
  {
    name: "find Connecting your device...",
    regexp: /Connecting your device.../g,
    txt: function(match) { return "デバイスに接続中..."; }
  },
  {
    name: "find Open",
    regexp: /Open/g,
    txt: function(match) { return "開く"; }
  },
  {
    name: "find Set",
    regexp: /Set/g,
    txt: function(match) { return "セット"; }
  },

  {
    name: "find This ringtone is in use.",
    regexp: /This ringtone is in use./g,
    txt: function(match) { return "この着信音を使用中です"; }
  },
  {
    name: "find Date",
    regexp: /Date/g,
    txt: function(match) { return "日"; }
  },
  {
    name: "find New ringtone set.",
    regexp: /New ringtone set./g,
    txt: function(match) { return "着信音をセットしました"; }
  },
  {
    name: "find Ringtone",
    regexp: /Ringtone/g,
    txt: function(match) { return "着信音"; }
  },
  {
    name: "find Phone",
    regexp: /Phone/g,
    txt: function(match) { return "着信音"; }
  },
  {
    name: "find Notification",
    regexp: /Notification/g,
    txt: function(match) { return "通知音"; }
  },
  {
    name: "find Alarm",
    regexp: /Alarm/g,
    txt: function(match) { return "アラーム"; }
  },
    {
    name: "find Add to Favorites",
    regexp: /Add to Favorites/g,
    txt: function(match) { return "お気に入りに追加"; }
  },
  {
    name: "find Add",
    regexp: /Add/g,
    txt: function(match) { return "追加"; }
  },
  {
    name: "find Favorites",
    regexp: /Favorites/g,
    txt: function(match) { return "お気に入り"; }
  },
  {
    name: "find With Number",
    regexp: /With Number/g,
    txt: function(match) { return "電話番号あり"; }
  },
    {
    name: "find Non-Grouped",
    regexp: /Non-Grouped/g,
    txt: function(match) { return "グループなし"; }
  },
    {
    name: "find Refresh",
    regexp: /Refresh/g,
    txt: function(match) { return "再読み込み"; }
  },
   {
    name: "find Please connect charger",
    regexp: /Please connect charger/g,
    txt: function(match) { return "充電してください"; }
  },
     {
    name: "find The battery is getting low:",
    regexp: /The battery is getting low:/g,
    txt: function(match) { return "バッテリ残量が少なくなっています:"; }
  },
  {
    name: "find  or less remaining.",
    regexp: / or less remaining./g,
    txt: function(match) { return "かそれ以下"; }
  },
   {
    name: "find Delete",
    regexp: /Delete/g,
    txt: function(match) { return "削除"; }
  },
      {
    name: "find All Rights Reserved",
    regexp: /All Rights Reserved/g,
    txt: function(match) { return "All Rights Reserved"; }
  },
    {
    name: "find All",
    regexp: /All/g,
    txt: function(match) { return "全て"; }
  },
   
  {
    name: "find Incoming",
    regexp: /Incoming/g,
    txt: function(match) { return "着信"; }
  },
  {
    name: "find Outgoing",
    regexp: /Outgoing/g,
    txt: function(match) { return "発信"; }
  },
  {
    name: "find Missed",
    regexp: /Missed/g,
    txt: function(match) { return "不在"; }
  },
  {
    name: "find Call",
    regexp: /Call/g,
    txt: function(match) { return "電話"; }
  },
  {
    name: "find Number",
    regexp: /Number/g,
    txt: function(match) { return "番号"; }
  },
  {
    name: "find Time",
    regexp: /Time/g,
    txt: function(match) { return "時間"; }
  },
  {
    name: "find Duration",
    regexp: /Duration/g,
    txt: function(match) { return "通話時間"; }
  },
  {
    name: "find Artist",
    regexp: /Artist/g,
    txt: function(match) { return "アーティスト"; }
  },
  {
    name: "find Album",
    regexp: /Album/g,
    txt: function(match) { return "アルバム"; }
  },
  {
    name: "find From Device",
    regexp: /From Device/g,
    txt: function(match) { return "デバイスから"; }
  },
  {
    name: "find To Device",
    regexp: /To Device/g,
    txt: function(match) { return "デバイスへ"; }
  },
  {
    name: "find Device clipboard is empty.",
    regexp: /Device clipboard is empty./g,
    txt: function(match) { return "デバイスのクリップボードは空です"; }
  },
  {
    name: "find New Message",
    regexp: /New Message/g,
    txt: function(match) { return "新規作成"; }
  },
  {
    name: "find Lock",
    regexp: /Lock/g,
    txt: function(match) { return "ロック"; }
  },
  {
    name: "find AirDroid Team Blog",
    regexp: /AirDroid Team Blog/g,
    txt: function(match) { return "AirDroidチームブログ"; }
  },
  {
    name: "find Like us on Facebook",
    regexp: /Like us on Facebook/g,
    txt: function(match) { return "Facebook"; }
  },
  {
    name: "find Follow us on Twitter",
    regexp: /Follow us on Twitter/g,
    txt: function(match) { return "Twitter"; }
  },
  {
    name: "find Help",
    regexp: /Help/g,
    txt: function(match) { return "ヘルプ"; }
  },
  {
    name: "find About",
    regexp: /About/g,
    txt: function(match) { return "AirDroidについて"; }
  },
  {
    name: "find Contacts",
    regexp: /Contacts/g,
    txt: function(match) { return "電話帳"; }
  },
  {
    name: "find [Enter] to Send",
    regexp: /\[Enter\] to Send/g,
    txt: function(match) { return "\[Enter\]で送信"; }
  },
  {
    name: "find Send",
    regexp: /Send/g,
    txt: function(match) { return "送信"; }
  },
  {
    name: "find New Contact",
    regexp: /New Contact/g,
    txt: function(match) { return "新規作成"; }
  },
  {
    name: "find Group",
    regexp: /Group/g,
    txt: function(match) { return "グループ"; }
  },
  {
    name: "find Copy",
    regexp: /Copy/g,
    txt: function(match) { return "コピー"; }
  },
  {
    name: "find Move",
    regexp: /Move/g,
    txt: function(match) { return "移動"; }
  },
  {
    name: "find Select a custom group...",
    regexp: /Select a custom group.../g,
    txt: function(match) { return "カスタムグループを選択..."; }
  },
  {
    name: "find Friends",
    regexp: /Friends/g,
    txt: function(match) { return "友達"; }
  },
  {
    name: "find Family",
    regexp: /Family/g,
    txt: function(match) { return "家族"; }
  },
  {
    name: "find Coworkers",
    regexp: /Coworkers/g,
    txt: function(match) { return "仕事"; }
  },
    {
    name: "find Note",
    regexp: /Note/g,
    txt: function(match) { return "ノート"; }
  },
  {
    name: "find Create",
    regexp: /Create/g,
    txt: function(match) { return "作成"; }
  },
  {
    name: "find Cancel",
    regexp: /Cancel/g,
    txt: function(match) { return "キャンセル"; }
  },
  {
    name: "find New Folder",
    regexp: /New Folder/g,
    txt: function(match) { return "新しいフォルダ"; }
  },
  {
    name: "find Clear Succeed",
    regexp: /Clear Succeed/g,
    txt: function(match) { return "成功を消去"; }
  },
    {
    name: "find Progress",
    regexp: /Progress/g,
    txt: function(match) { return "進歩"; }
  },
  {
    name: "find Size",
    regexp: /Size/g,
    txt: function(match) { return "サイズ"; }
  },
  {
    name: "find Cancel",
    regexp: /Cancel/g,
    txt: function(match) { return "キャンセル"; }
  },
      {
    name: "find New Name",
    regexp: /New Name/g,
    txt: function(match) { return "新しい名前"; }
  },
    {
    name: "find Folder Name",
    regexp: /Folder Name/g,
    txt: function(match) { return "フォルダの名前"; }
  },
  {
    name: "find Name",
    regexp: /Name/g,
    txt: function(match) { return "名前"; }
  },
  {
    name: "find sec",
    regexp: /sec/g,
    txt: function(match) { return "秒"; }
  },
  {
    name: "find min",
    regexp: /min/g,
    txt: function(match) { return "分"; }
  },
  {
    name: "find Internal Storage",
    regexp: /Internal Storage/g,
    txt: function(match) { return "内部ストレージ"; }
  },
    {
    name: "find file",
    regexp: /file/g,
    txt: function(match) { return "ファイル"; }
  },
  {
    name: "find MUSIC",
    regexp: /MUSIC/g,
    txt: function(match) { return "音楽"; }
  },
    {
    name: "find sdcard",
    regexp: /sdcard/g,
    txt: function(match) { return "SDカード"; }
  },
      {
    name: "find Success",
    regexp: /Success/g,
    txt: function(match) { return "成功"; }
  },
      {
    name: "find Not Authorized",
    regexp: /Not Authorized/g,
    txt: function(match) { return "権限がありません(保護されたアプリ)"; }
  },
  ];


/***********************************
 *  Helper functions for filters   *
 ***********************************/

function digits(s)
{
  return s.replace(/[^0-9]/g, "");
}

function alphanumerics(s)
{
  return s.replace(/[^0-9a-z]/ig, "");
}


/***********************************
 *           Link styling          *
 ***********************************/
    
/*

  You can make links generated by AutoLink look different from normal links
  by editing styleLink below and/or by setting up user style sheet rules.
  
  Example: on squarefree.com, make autolinked plain text links orange. (Firefox trunk only.)
  
    @-moz-document domain(squarefree.com) { 
      .autolink-plain-text-link { color: orange ! important; }
    }
      
*/

function styleLink(a, filter)
{
  a.style.borderBottom = "0px solid";
}


/***********************************
 *           Fix filters           *
 ***********************************/

function fixFilters()
{
  var i, r;
  for (i = 0; r = filters[i]; ++i) {
    // lowercase, and replace each run of non-alphanumerics with a single hyphen
    r.classNamePart = r.name.toLowerCase().replace(/[^0-9a-z]+/ig, "-");
    if(!r.regexp.global)
      alert("AutoLink filter " + r.name + " is not global! This will break stuff!");
  }
}
fixFilters();


/***********************************
 *      When and where to run      *
 ***********************************/

var moddingDOM = false;

window.addEventListener("load", init, false);
function init()
{
  document.addEventListener("DOMNodeInserted", nodeInserted, false);
  setTimeout(go, 50, document.body);
}

// This makes it work at Gmail.
// 20% performance penalty on a plain text file with a link on almost every line.
// Tiny performance penalty on pages with few automatically added links.
function nodeInserted(e)
{
  // our own modifications should not trigger this.
  // (we don't want our regular expression objects getting confused)
  // (we want better control over when we recurse)
  
  //GM_log("Inserted: " + e.target);
  
  if (!moddingDOM)
    go(e.target);
}



/***********************************
 *          DOM traversal          *
 ***********************************/


/*

  This script uses manual DOM traversal, in an iterative way without a stack!

  Advantages of snapshot XPath:
    * Much less code
    * 20-40% faster
    * May be possible to get another speed boost by including the regexp in the XPath expression - http://www.developer.com/xml/article.php/10929_3344421_3
    * All the cool people are using it
  
  Advantages of manual DOM traversal:
    * Lets us stop+continue (snapshot xpath doesn't let us)
    * Lets us modify DOM in strange ways without worrying.
    * Easier to control which elements we recurse into.

*/


// Ignore all children of these elements.
const skippedElements = { 
  trans:        true, // keeps us from screwing with existing links. keeps us from recursing to death :)
  noscript: true, // noscript has uninterpreted, unshown text children; don't waste time+sanity there.
  head:     true,
  script:   true,
  style:    true,
  textarea: true,
  label:    true,
  select:   true,
  button:   true
}

const gmail = (location.host == "gmail.google.com");

function skipChildren(node)
{
  if (node.tagName)  // !
  {
    if (skippedElements[node.tagName.toLowerCase()]) {
      return true;
    }
    
    if (gmail) {
      if (node.className == "ac") // gmail autocomplete (fake dropdown)
        return true;
      if (node.className == "ilc sxs") // invite foo to gmail (fake link/button)
        return true;
    }
  }

  return false;
}


function go(traversalRoot)
{
  var m;
  
  // Ensure we're not already in a forbidden element.
  for (m = traversalRoot; m != undefined; m = m.parentNode) {
    if (skipChildren(m)) {
      return;
    }
  }

  // work around bug, or in case previous user scripts did crazy stuff
  traversalRoot.normalize();

  function cont(n, didChildren)
  {
    var k = 0; // split work into chunks so Firefox doesn't freeze
    var q;
    
    while (n && k < 100)
    {
      ++k;
    
      // Do stuff at this node
      if (!didChildren && n.nodeType == 3) {
        if((q = runFiltersOnTextNode(n))) {
          n = q[0];

          // if there were changes, run filters again on the new text node that's here          
          if (q[1]) 
            continue;
        }
      }
  
      // Traverse to the "next" node in depth-first order

      if (!n.firstChild)
        didChildren = true;
  
      if (didChildren && n == traversalRoot)
        break;
      else if (!didChildren && n.firstChild && !skipChildren(n)) {
        n = n.firstChild;
        // didChildren is already false and should stay false
      }
      else {
        if (n.nextSibling) {
          n = n.nextSibling;
          didChildren = false;
        }
        else {
          n = n.parentNode;
          didChildren = true;
        }
      }
    } // end while
  
    if (!n) {
      //GM_log("Odd. traversalRoot was " + traversalRoot);
    }
    else if (n == traversalRoot) {
      //GM_log("Done");
      //alert("AutoLink time: " + (new Date() - timeBefore))
    }
    else {
      // Continue after 10ms.
      //GM_log("will have to continue");
      setTimeout(cont, 10, n, didChildren);
    }
    
  } // end function cont
  
  cont(traversalRoot, false);
}


/***********************************
 *         Running filters         *
 ***********************************/

// runFiltersOnTextNode
// Return: node at which to continue traversal, or |null| to mean no changes were made.

function runFiltersOnTextNode(node)
{
  // Too many variables.  Good hint that I need to split this function up :P
  var source, j, regexp, match, lastLastIndex, k, filter, href, anyChanges; // things
  var used, unused, firstUnused, lastUnused, a, parent, nextSibling; // nodes
  
  source = node.data;
  
  anyChanges = false;

  // runFiltersOnTextNode has its own do-too-much-at-once avoider thingie.
  // assumption: if there is one text node with a lot of matches,
  // it's more important to finish quickly than be transparent.
  // (e.g. plain text file FULL of links)
  // assumption: 40 * 100 = 140.
  k=0;
  
  for (j = 0; filter = filters[j]; ++j) {
    regexp = filter.regexp;
    
    if (regexp.test(source)) {

      parent = node.parentNode;
      nextSibling = node.nextSibling;

      
      regexp.lastIndex = 0;
      firstUnused = null;
      
      // Optimization from the linkify that came with Greasemonkey(?):
      // instead of splitting a text node multiple times, take advantage
      // of global regexps and substring.

      for (match = null, lastLastIndex = 0; k < 40 && (match = regexp.exec(source)); ) {
      
        // this should happen first, so RegExp.foo is still good :)
        txt = genLink(filter, match); 
        
        if (txt != null && txt != location.href) { 
          ++k;

          unused = document.createTextNode(source.substring(lastLastIndex, match.index));
          if (!anyChanges) {
            anyChanges = true;
            parent.removeChild(node);
            firstUnused = unused;
            moddingDOM = true;
          }
          parent.insertBefore(unused, nextSibling);

          used = document.createTextNode(match[0])
  
          trans = document.createElement("trans");
          //a.href = href;
          trans.title = "translated by filter: " + filter.name;
          //a.className = "autolink autolink-" + filter.classNamePart;
		  trans.innerHTML = txt;
		  
          styleLink(trans, filter);
  
 //         trans.appendChild(used);
		  
          parent.insertBefore(trans, nextSibling);
          
          lastLastIndex = regexp.lastIndex;
        }

      }

      if (anyChanges) {
        lastUnused = document.createTextNode(source.substring(lastLastIndex));
        parent.insertBefore(lastUnused, nextSibling);
        moddingDOM = false;
        return [firstUnused, true]
      }
      
      return [node, false];
    }
  }
  return null;
}

function genLink(filter, match)
{
  try {
    return filter.txt(match); 
  }
  catch(er) {
    return "data:text/plain,Error running AutoLink function for filter: " + encodeURIComponent(filter.name) + "%0A%0A" + encodeURIComponent(er);
  }
}