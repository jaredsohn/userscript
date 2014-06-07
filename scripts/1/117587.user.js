// ==UserScript==
// @name          Wupload翻訳
// @description   Wuploadを日本語にテキトーに翻訳します
// @include       http://www.wupload.jp*
// ==/UserScript==

const filters = [

{
    name: "find Web Upload",
    regexp: /Web Upload/g,
    txt: function(match) { return "ウェブアップロード"; }
  },
{
    name: "find My Account",
    regexp: /My Account/g,
    txt: function(match) { return "アカウント"; }
  },
{
    name: "find FTP Upload",
    regexp: /FTP Upload/g,
    txt: function(match) { return "FTPアップロード"; }
  },
   {
    name: "find Remote Upload",
    regexp: /Remote Upload/g,
    txt: function(match) { return "リモートアップロード"; }
  },
    {
    name: "find Choose files to upload, then click \"Start Upload\"",
    regexp: /Choose files to upload, then click \"Start Upload\"/g,
    txt: function(match) { return "ファイルを選んで\"Start Upload\"をクリックしてください"; }
  },
  {
    name: "find Upload",
    regexp: /Upload/g,
    txt: function(match) { return "アップロード"; }
  },

{
    name: "find I agree to the",
    regexp: /I agree to the/g,
    txt: function(match) { return "承諾しました - "; }
  },
  {
    name: "find Terms and Conditions",
    regexp: /Terms and Conditions/g,
    txt: function(match) { return "利用規約"; }
  },
  {
    name: "find Intellectual Property Policy",
    regexp: /Intellectual Property Policy/g,
    txt: function(match) { return "著作権ポリシー"; }
  },
{
    name: "find Downloading",
    regexp: /Downloading/g,
    txt: function(match) { return "ダウンロード"; }
  },
{
    name: "find Estimated Download Time",
    regexp: /Estimated Download Time/g,
    txt: function(match) { return "必要時間"; }
  },
   
   {
    name: "find Slow Download",
    regexp: /Slow Download/g,
    txt: function(match) { return "ダウンロード"; }
  },
  {
    name: "find Downloads",
    regexp: /Downloads/g,
    txt: function(match) { return "回ダウンロード"; }
  },
  {
    name: "find Sales",
    regexp: /Sales/g,
    txt: function(match) { return "回販売"; }
  },
   {
    name: "find Login",
    regexp: /Login/g,
    txt: function(match) { return "ログイン"; }
  },
  {
    name: "find Please wait",
    regexp: /Please wait/g,
    txt: function(match) { return "あと"; }
  },
  {
    name: "find to download this file\.",
    regexp: /to download this file\./g,
    txt: function(match) { return "お待ちください"; }
  },
  {
    name: "find Please enter the captcha below\:",
    regexp: /Please enter the captcha below\:/g,
    txt: function(match) { return "以下の文字を入力してください\:"; }
  },
   {
    name: "find Home",
    regexp: /Home/g,
    txt: function(match) { return "ホーム"; }
  },
  {
    name: "find Make Money",
    regexp: /Make Money/g,
    txt: function(match) { return "お金を儲ける"; }
  },
  {
    name: "find Go Premium!",
    regexp: /Go Premium!/g,
    txt: function(match) { return "プレミアムになる"; }
  },
  {
    name: "find News",
    regexp: /News/g,
    txt: function(match) { return "お知らせ"; }
  },
  {
    name: "find Sign Up",
    regexp: /Sign Up/g,
    txt: function(match) { return "登録"; }
  },
    {
    name: "find File Links",
    regexp: /File Links/g,
    txt: function(match) { return "リンク"; }
  },
  {
    name: "find My Files",
    regexp: /My Files/g,
    txt: function(match) { return "ファイル"; }
  },
  {
    name: "find Renew Your Account",
    regexp: /Renew Your Account/g,
    txt: function(match) { return "アカウントを更新"; }
  },
  {
    name: "find Welcome, ",
    regexp: /Welcome, /g,
    txt: function(match) { return "ようこそ、"; }
  },{
    name: "find Logout",
    regexp: /Logout/g,
    txt: function(match) { return "ログアウト"; }
  },
  {
    name: "find My Earnings",
    regexp: /My Earnings/g,
    txt: function(match) { return "収益"; }
  },
  {
    name: "find Total Download Earnings",
    regexp: /Total Download Earnings/g,
    txt: function(match) { return "ダウンロードによる収益"; }
  },
  {
    name: "find Total Premium Earnings",
    regexp: /Total Premium Earnings/g,
    txt: function(match) { return "プレミアム販売による収益"; }
  },
  {
    name: "find Total Referral Earnings",
    regexp: /Total Referral Earnings/g,
    txt: function(match) { return "紹介による収益"; }
  },
  {
    name: "find Total Domain Earnings",
    regexp: /Total Domain Earnings/g,
    txt: function(match) { return "ドメインでの販売による収益"; }
  },
  {
    name: "find Total Earnings\*",
    regexp: /Total Earnings\*/g,
    txt: function(match) { return "合計収益\*"; }
  },
  {
    name: "find Account Balance",
    regexp: /Account Balance/g,
    txt: function(match) { return "アカウントの残高"; }
  },
  {
    name: "find Total Paid in USD\*",
    regexp: /Total Paid in USD\*/g,
    txt: function(match) { return "支払い済み金額(USD)\*"; }
  },
  {
    name: "find Unpaid in USD",
    regexp: /Unpaid in USD/g,
    txt: function(match) { return "未払いの金額(USD)"; }
  },
  {
    name: "find Settings",
    regexp: /Settings/g,
    txt: function(match) { return "設定"; }
  },
  {
    name: "find My Stats",
    regexp: /My Stats/g,
    txt: function(match) { return "統計"; }
  },
  {
    name: "find My Sites",
    regexp: /My Sites/g,
    txt: function(match) { return "サイト"; }
  },
  {
    name: "find Payment Info",
    regexp: /Payment Info/g,
    txt: function(match) { return "支払い情報"; }
  },
  {
    name: "find Edit",
    regexp: /Edit/g,
    txt: function(match) { return "編集"; }
  },
  {
    name: "find Account Earnings History",
    regexp: /Account Earnings History/g,
    txt: function(match) { return "収益の履歴"; }
  },
  {
    name: "find Legend\:",
    regexp: /Legend\:/g,
    txt: function(match) { return "印\:"; }
  },

  {
    name: "find Not Paid",
    regexp: /Not Paid/g,
    txt: function(match) { return "拒否"; }
  },
  {
    name: "find Date",
    regexp: /Date/g,
    txt: function(match) { return "日"; }
  },
  {
    name: "find Paid for",
    regexp: /Paid for/g,
    txt: function(match) { return "収益期間"; }
  },
  {
    name: "find Paid Through",
    regexp: /Paid Through/g,
    txt: function(match) { return "支払い方法"; }
  },
  {
    name: "find Status",
    regexp: /Status/g,
    txt: function(match) { return "状態"; }
  },
  {
    name: "find Amount",
    regexp: /Amount/g,
    txt: function(match) { return "支払い額"; }
  },
  {
    name: "find Total\:",
    regexp: /Total\:/g,
    txt: function(match) { return "合計\:"; }
  },
  {
    name: "find Personal Information",
    regexp: /Personal Information/g,
    txt: function(match) { return "個人情報"; }
  },
  {
    name: "find Change Password",
    regexp: /Change Password/g,
    txt: function(match) { return "パスワードを変更"; }
  },
  {
    name: "find Trade In",
    regexp: /Trade In/g,
    txt: function(match) { return "交換"; }
  },
    {
    name: "find Trade In Points",
    regexp: /Trade In Points/g,
    txt: function(match) { return "交換"; }
  },
    {
    name: "find Referrals",
    regexp: /Referrals/g,
    txt: function(match) { return "紹介"; }
  },
   {
    name: "find Payment Info",
    regexp: /Payment Info/g,
    txt: function(match) { return "分割支払い"; }
  },
    {
    name: "find Payment Information",
    regexp: /Payment Information/g,
    txt: function(match) { return "支払い情報"; }
  },
   
  {
    name: "find Username",
    regexp: /Username/g,
    txt: function(match) { return "ユーザー名"; }
  },
  {
    name: "find New Password",
    regexp: /New Password/g,
    txt: function(match) { return "新しいパスワード"; }
  },
  {
    name: "find Retype new password",
    regexp: /Retype new password/g,
    txt: function(match) { return "新しいパスワードを再入力"; }
  },
  {
    name: "find Payment Plan",
    regexp: /Payment Plan/g,
    txt: function(match) { return "プラン"; }
  },
  {
    name: "find You may change your plan once every 3 days",
    regexp: /You may change your plan once every 3 days/g,
    txt: function(match) { return "プランは3日ごとに変えられます"; }
  },
  {
    name: "find Click here",
    regexp: /Click here/g,
    txt: function(match) { return "ここをクリック"; }
  },
  {
    name: "find Current Password\:",
    regexp: /Current Password\:/g,
    txt: function(match) { return "現在のパスワード\:"; }
  },
  {
    name: "find Verify identity",
    regexp: /Verify identity/g,
    txt: function(match) { return "本人確認"; }
  },
  {
    name: "find Referral Link\:",
    regexp: /Referral Link\:/g,
    txt: function(match) { return "紹介リンク\:"; }
  },
  {
    name: "find Premium Membership Valid Until",
    regexp: /Premium Membership Valid Until/g,
    txt: function(match) { return "プレミアム有効期限"; }
  },
  {
    name: "find Member since",
    regexp: /Member since/g,
    txt: function(match) { return "登録日"; }
  },
  {
    name: "find January",
    regexp: /January/g,
    txt: function(match) { return "1月"; }
  },
  {
    name: "find February",
    regexp: /February/g,
    txt: function(match) { return "2月"; }
  },
  {
    name: "find March",
    regexp: /March/g,
    txt: function(match) { return "3月"; }
  },
  {
    name: "find April",
    regexp: /April/g,
    txt: function(match) { return "4月"; }
  },
  {
    name: "find May",
    regexp: /May/g,
    txt: function(match) { return "5月"; }
  },
  {
    name: "find June",
    regexp: /June/g,
    txt: function(match) { return "6月"; }
  },
  {
    name: "find July",
    regexp: /July/g,
    txt: function(match) { return "7月"; }
  },
  {
    name: "find August",
    regexp: /August/g,
    txt: function(match) { return "8月"; }
  },
  {
    name: "find September",
    regexp: /September/g,
    txt: function(match) { return "9月"; }
  },
  {
    name: "find October",
    regexp: /October/g,
    txt: function(match) { return "10月"; }
  },
  {
    name: "find November",
    regexp: /November/g,
    txt: function(match) { return "11月"; }
  },
  {
    name: "find December",
    regexp: /December/g,
    txt: function(match) { return "12月"; }
  },
  {
    name: "find In order to implement changes you must confirm your identity\.",
    regexp: /In order to implement changes you must confirm your identity\./g,
    txt: function(match) { return "変更を反映させるには本人確認が必要です。"; }
  },
  {
    name: "find My Statistics",
    regexp: /My Statistics/g,
    txt: function(match) { return "統計"; }
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
    name: "find Trash",
    regexp: /Trash/g,
    txt: function(match) { return "削除"; }
  },
  {
    name: "find Download",
    regexp: /Download/g,
    txt: function(match) { return "ダウンロード"; }
  },
  {
    name: "find Select All ",
    regexp: /Select All /g,
    txt: function(match) { return "すべて選択"; }
  },
  {
    name: "find Parent Folder",
    regexp: /Parent Folder/g,
    txt: function(match) { return "親フォルダ"; }
  },
    {
    name: "find New Folder",
    regexp: /New Folder/g,
    txt: function(match) { return "新しいフォルダ"; }
  },
  {
    name: "find Removed",
    regexp: /Removed/g,
    txt: function(match) { return "削除済み"; }
  },
  {
    name: "find You successfully uploaded",
    regexp: /You successfully uploaded/g,
    txt: function(match) { return "アップロードしました - "; }
  },
  {
    name: "find Share Files",
    regexp: /Share Files/g,
    txt: function(match) { return "リンク表示"; }
  },
  {
    name: "find Share Links",
    regexp: /Share Links/g,
    txt: function(match) { return "リンクを共有"; }
  },
    {
    name: "find Share",
    regexp: /Share/g,
    txt: function(match) { return "共有"; }
  },
  {
    name: "find Minimize",
    regexp: /Minimize/g,
    txt: function(match) { return "最小化"; }
  },
  {
    name: "find Email links",
    regexp: /Email links/g,
    txt: function(match) { return "メール送信"; }
  },
  {
    name: "find Forum link\:",
    regexp: /Forum link\:/g,
    txt: function(match) { return "フォーラムリンク\:"; }
  },
  {
    name: "find HTML link\:",
    regexp: /HTML link\:/g,
    txt: function(match) { return "HTMLリンク:"; }
  },
  {
    name: "find Hostname",
    regexp: /Hostname/g,
    txt: function(match) { return "ホスト名"; }
  },
  {
    name: "find In Progress",
    regexp: /In Progress/g,
    txt: function(match) { return "進行中"; }
  },
  {
    name: "find Completed",
    regexp: /Completed/g,
    txt: function(match) { return "完了"; }
  },
  {
    name: "find Failed",
    regexp: /Failed/g,
    txt: function(match) { return "失敗"; }
  },
  {
    name: "find Your Result\(s\)",
    regexp: /Your Result\(s\)/g,
    txt: function(match) { return "結果"; }
  },
  {
    name: "find Source",
    regexp: /Source/g,
    txt: function(match) { return "ソース"; }
  },
  {
    name: "find Size",
    regexp: /Size/g,
    txt: function(match) { return "サイズ"; }
  },
  {
    name: "find Restore",
    regexp: /Restore/g,
    txt: function(match) { return "リストア"; }
  },
  {
    name: "find Cancel",
    regexp: /Cancel/g,
    txt: function(match) { return "キャンセル"; }
  },
  {
    name: "find Name",
    regexp: /Name/g,
    txt: function(match) { return "名前"; }
  },
  {
    name: "find Search all folders:",
    regexp: /Search all folders:/g,
    txt: function(match) { return "全フォルダを検索"; }
  },
    {
    name: "find Your Wupload.com Password",
    regexp: /Your Wupload.com Password/g,
    txt: function(match) { return "Wupload.comのパスワード"; }
  },
  {
    name: "find Delete All",
    regexp: /Delete All/g,
    txt: function(match) { return "全て削除"; }
  },
  {
    name: "find Help me Wupload!",
    regexp: /Help me Wupload!/g,
    txt: function(match) { return "助けてWupload!"; }
  },
  {
    name: "find No password",
    regexp: /No password/g,
    txt: function(match) { return "パスワードなし"; }
  },
  {
    name: "find Created On",
    regexp: /Created On/g,
    txt: function(match) { return "作成日"; }
  },
  {
    name: "find Export links in\:",
    regexp: /Export links in\:/g,
    txt: function(match) { return "リンクをエクスポート\:"; }
  },
  {
    name: "find This Folder",
    regexp: /This Folder/g,
    txt: function(match) { return "このフォルダ"; }
  },
  {
    name: "find Your Account",
    regexp: /Your Account/g,
    txt: function(match) { return "アカウント"; }
  },
  {
    name: "find files selected",
    regexp: /files selected/g,
    txt: function(match) { return "ファイルを選択中"; }
  },
  {
    name: "find Display",
    regexp: /Display/g,
    txt: function(match) { return "表示"; }
  },
  
      {
    name: "find Paid",
    regexp: /Paid/g,
    txt: function(match) { return "済み"; }
  },
    {
    name: "find file",
    regexp: /file/g,
    txt: function(match) { return "ファイル"; }
  },
  {
    name: "find Please Wait\.\.\.",
    regexp: /Please Wait\.\.\./g,
    txt: function(match) { return "お待ちください\.\.\."; }
  },
    {
    name: "find Password",
    regexp: /Password/g,
    txt: function(match) { return "パスワード"; }
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