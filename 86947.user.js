// ==UserScript==
// @name           Gmail Macros
// @namespace      http://d.hatena.ne.jp/ABCbo/
// @description    Add original keyboard shortcut to Gmail
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// ==/UserScript==
// referred to Gmail Macros (New)
// http://blog.persistent.info/2007/11/macros-for-new-version-of-gmail.html
// referred to Modified Gmail Macros v. 2.0
// http://userscripts.org/scripts/show/14189
// Last Update 2010.09.22
// CheckUpdate in http://userscripts.org/scripts/show/86947

window.addEventListener('load', function() {
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', init);
  }
}, true);

const LABEL_ACTIONS = {
  "g": {// e.g. inbox, spam, trash, labels, quicklinks, settings
    label: "Go to label",
    func: function(labelName) {
      if (labelName in SPECIAL_LABELS) {
        top.location.hash = "#" + SPECIAL_LABELS[labelName];
      } else {
        top.location.hash = "#label/" + encodeURIComponent(labelName);
      }
    }
  },
  "l": {
    label: "Apply or Remove label",
    func: function (labelName) {
      clickMoreActionsMenuItem("Labels=>"+labelName);
    }
  },
  "m": {// Remove current label and Add new label
    label: "Move to label",
    func: function (labelName) {
      clickMoreActionsMenuItem("Move to=>"+labelName);
    }
  },
};

const VIEW_LIST = {
  "tl": "ThreadList",
  "co": "Compose Mail",
  "s": "Settings",
  "ct": "Contacts",
  "cv": "Conversation View"
}

const ACTIONS = {
  // sample
  // You can set multi key(e.g. f-a).
  // But if you set multi key, the first key(f) can't set as single key.
  "key to execute function": {
    view: "Execute only specified view(tl, co, s, ct, cv).",
    func: function() {
      // Write function
      return true;  // Overrides Gmail's original shortcht key.
      return false;  // Gmail's original shortcut key is also executed.
    }
  },
  "h": {
    label: "Help (this popup)",
    view: "tl|co|s|ct|cv",
    func: function() {
      return showHelp();
    }
  },
  "f-f": {
    label: "focus (only show unread and inbox messages)",
    view: "tl",  // Can only focus when in threadlist views
    func: function() {
      var loc = top.location.hash;
      if (loc.length <= 1) return;
      loc = loc.substring(1);
      var search = getSearchForLocation(loc);
      if (search === null) return;
      search += " {in:inbox is:starred is:unread} -is:muted";
      top.location.hash = "#search/" + search;
      return true;
    }
  },
  "f-a": {
    label: "Show all unread message",
    view: "tl",
    func: function() {
      top.location.hash = "#search/is:unread";
      return true;
    }
  },
  "f-m": {
    label: "Filter messages like these",
    view: "tl",
    func: function() {
      return doAction("More actions=>Filter messages like these");
    }
  },
  "d": {
    label: "In (spam|trash), Delete forever."
      + "In drafts, Discard. In other, Mark as read and Delete",
    view: "tl|cv",
    func: function() {
      if (getView() == 'tl') {
        if (/#(spam|trash)/.test(top.location.hash)) {
          return doAction("Delete forever");
        } else if (/#drafts/.test(top.location.hash)) {
          return doAction("Discard drafts");
        } else {
          // setTimeoutは指定ミリ秒後に実行キュー（順番待ち）に加わるという意味。
          // カウントダウンが始まると同時に次の行以降が実行される。
          window.setTimeout(function() {
            doAction("Delete");
          }, 100);
          doAction("More actions=>Mark as read");
          return true;
        }
      } else if (getView() == 'cv') {
        if (/#(spam|trash)/.test(top.location.hash)) {
          return doAction("Delete forever");
        } else {
          return doAction("Delete");
        }
      }
    }
  },
  "E": {
    label: "Mark as read and Archive",
    view: "tl|cv",
    func: function() {
      if (/#(inbox|sent|starred|chats)/.test(top.location.hash)) {
        if (doAction("More actions=>Mark as read")) {
          return doAction("Archive");
        }
      } else {
        if (doAction("More actions=>Mark as read")) {
          return doAction("More actions=>Archive");
        }
      }
    }
  },
  "r": {
    label: "Mark as Read or Unread",
    view: "tl",
    func: function() {
      if (!doAction("More actions=>Mark as read")) {
        return doAction("More actions=>Mark as unread");
      } else {
        return true;
      }
    }
  },
  "I": {
    label: "(shift + i). Move to Inbox",
    view: "tl|cv",
    func: function() {
      if (/#(search|sent|drafts|all)/.test(top.location.hash)) {
        doAction("More actions=>Mark as unread");
        return doAction("Move to Inbox");
      } else if (/#spam/.test(top.location.hash)) {
        return doAction("Not spam");  // equal move to inbox
      } else {
        doAction("More actions=>Mark as unread");
        return doAction("Move to=>Inbox");
      }
    }
  },
  "!": {
    label: "Report spam or Not spam",
    view: "tl|cv",
    func: function() {
      if (/#spam/.test(top.location.hash)) {
        return doAction("Not spam");
      } else {
        return doAction("Report spam");
      }
    }
  },
  "M": {
    label: "Popup Move to menu",
    view: "tl|cv",
    func: function() {
      return doAction("Move to");
    }
  },
  "L": {
    label: "Popup Labels menu",
    view: "tl|cv",
    func: function() {
      return doAction("Labels=>");
    }
  },
  "R": {
    label: "Refresh",
    view: "tl",
    func: function() {
      return doAction("Refresh");
    }
  },
  "a": {
    label: "Select All",
    view: "tl",
    func: function() {
      return doAction("Select=>All");
    }
  },
  "u": {
    label: "Select Unread",
    view: "tl",
    func: function() {
      return doAction("Select=>Unread");
    }
  },
  "n": {
    label: "Select None",
    view: "tl",
    func: function() {
      return doAction("Select=>None");
    }
  },
  "D": {
    label: "Empty trash or Delete all spam messages now",
    view: "tl",
    func: function() {
      if (/#trash/.test(top.location.hash)) {
        return doAction("Empty Trash now");
      } else if (/#spam/.test(top.location.hash)) {
        return doAction("Delete all spam messages now");
      }
    }
  },
  "v-l": {
    label: "Show or Hide details",
    view: "cv",
    func: function() {
      return doAction("Conversation=>Show details");
    }
  },
  "v-m": {// Only once in one page.
    label: "Show menu",
    view: "cv",
    func: function() {
      return doAction("Conversation=>Show menu");
    }
  },
  "v-d": {
    label: "Discard",
    view: "co|cv",
    func: function() {
      return doAction("Compose=>Discard");
    }
  },
  "v-s": {
    label: "Send",
    view: "co|cv",
    func: function() {
      return doAction("Compose=>Send");
    }
  },
  "C-i": {// Click link in mail
    label: "Click link",
    view: "cv",
    func: function() {
      var links = evalXPath(
        ".//a[contains(@href, 'http://sample.com/')]", getCurrentPage());
      if (links[0]) {
        simulateClick(links[0], "click");
        return true;
      } else {
        showError("link not found");
      }
    }
  },
  "Q": {
    label: "Add Quick Link",
    view: "tl|cv|co|s|ct",
    func: function() {
      var link = evalXPath(
        ".//div[@class='QOxrP pU']", getDoc().body);
      if (link) {
        simulateClick(link[0], "click");
        return true;
      } else {
        showError("Add quicklink" + link.length + '=>' + link[0].className);
      }
    }
  },
};

// You can add new functions to ACTIONS above from ACTIONS_LIST below
const ACTIONS_LIST = {
  // ボタンを押して実行できる動作
  "Archive": "アーカイブ",  // e
  "Report spam": "迷惑メールを報告",  // !
  "Delete": "削除",  // #
  "Move to Inbox": "受信トレイに移動",
  "Discard drafts": "下書きを破棄",
  "Delete forever": "完全に削除",
  "Not spam": "迷惑メールを解除",
  'Remove label': "ラベルを削除",  // y in #label
  "Refresh": "更新",

  // サブメニューから実行する動作
  // (e.g. Move to=>Inbox)
  "Move to": "移動",  // v
    "Inbox": "受信トレイ",
    "Spam": "迷惑メール",
    "Trash": "ゴミ箱",
    "Create new": "新規作成",
    "Manage labels": "ラベルの管理",
  
  // (e.g. Labels=>Manage labels)
  "Labels": "ラベル",  // l
    "Create new": "新規作成",
    "Manage labels": "ラベルの管理",
  
  // (e.g. MoreActions=>Mark all as read)
  "More actions": "その他の操作",  // .
    "Mark all as read": "すべて既読にする",
    "Mark as read": "既読にする",  // shift+i
    "Mark as unread": "未読にする",  // shift+u
    "Add to Tasks": "ToDo リストに追加",  // shift+t
    "Add star": "スターを付ける",  // s
    "Remove star": "スターをはずす",  // s
    "Archive": "アーカイブ",  // e
    "Create event": "予定を作成",
    "Filter messages like these": "メールの自動振り分け設定",
    "Mute": "ミュート",  // m
    
  // (e.g. Select=>All)
  "Select": "選択",
    "All": "すべて",  // *+a
    "None": "選択解除",  // *+n
    "Read": "既読",  // *+r
    "Unread": "未読",  // *+u
    "Starred": "スター付き",  // *+s
    "Unstarred": "スターなし",  // *+t
  
  "Empty Trash now": "\[ゴミ箱\] を今すぐ空にする",
  "Delete all spam messages now": "迷惑メールをすべて削除",

  // Conversation View (e.g. Conversation=>View detail)
  "Conversation": "",
    "Show detail": "詳細を表示",
    "Show menu": "メニューをポップアップ",
    "Reply": "返信",
  
  // Compose mail (e.g Compose=>Send)
  "Compose": "メール作成",
    "Send": "すぐに送信",
    "Save Now": "すぐに保存",
    "Discard": "破棄",
};

const ACTIONS_ACT = {
  "Archive": "7",
  "Move to Inbox": "8",
  "Report spam": "9",
  "Delete": "10",
  "Remove label": "13",
  "Create new": "14",
  "Discard drafts": "16",
  "Delete forever": "17",
  "Not spam": "18",
  "Refresh": "20",
  // "labels": "76",  （すべてのラベルが76で同じ）
  "Manage labels": "78",
};

// Map from nav pane names to location names
var SPECIAL_LABELS = {
  "Inbox":    "inbox",
  "Starred":  "starred",
  "Chats":    "chats",
  "Sent Mail":  "sent",
  "Drafts":  "drafts",
  "All Mail":  "all",
  "Spam":    "spam",
  "Trash":    "trash",
  "set:General":    "settings/general",
  "set:Label":      "settings/labels",
  "set:Account":    "settings/accounts",
  "set:Filter":      "settings/filters",
  "set:Mail":      "settings/fwdandpop",
  "set:Chat":      "settings/chat",
  "set:WebClip":    "settings/webclips",
  "set:PriorityInbox":  "settings/priorityinbox",
  "set:Lab":      "settings/labs",
  "set:Offline":      "settings/offline",
  "set:Theme":      "settings/themes",
  "set:Buzz":      "settings/buzz",
};

var KEY_MAP = {
  '65': 'a', '65s': 'A',
  '66': 'b', '66s': 'B',
  '67': 'c', '67s': 'C',
  '68': 'd', '68s': 'D',
  '69': 'e', '69s': 'E',
  '70': 'f', '70s': 'F',
  '71': 'g', '71s': 'G',
  '72': 'h', '72s': 'H',
  '73': 'i', '73s': 'I',
  '74': 'j', '74s': 'J',
  '75': 'k', '75s': 'K',
  '76': 'l', '76s': 'L',
  '77': 'm', '77s': 'M',
  '78': 'n', '78s': 'N',
  '79': 'o', '79s': 'O',
  '80': 'p', '80s': 'P',
  '81': 'q', '81s': 'Q',
  '82': 'r', '82s': 'R',
  '83': 's', '83s': 'S',
  '84': 't', '84s': 'T',
  '85': 'u', '85s': 'U',
  '86': 'v', '86s': 'V',
  '87': 'w', '87s': 'W',
  '88': 'x', '88s': 'X',
  '89': 'y', '89s': 'Y',
  '90': 'z', '90s': 'Z',
  '48': '0',
  '49': '1',
  '50': '2',
  '51': '3',
  '52': '4',
  '53': '5',
  '54': '6',
  '55': '7',
  '56': '8',
  '57': '9',
};

var KEY_MAP_JP = {
  '48s': ' ',
  '49s': '!',
  '50s': '"',
  '51s': '#',
  '52s': '$',
  '53s': '%',
  '54s': '&',
  '55s': "'",
  '56s': '(',
  '57s': ')',
  '59s': '*',
};

var KEY_MAP_EN = {
  '48s': ')',
  '49s': '!',
  '50s': '@',
  '51s': '#',
  '52s': '$',
  '53s': '%',
  '54s': '^',
  '55s': '&',
  '56s': '*',
  '57s': '(',
};

var LOC_TO_SEARCH = {
  "inbox": "in:inbox",
  "starred": "is:starred",
  "chats": "is:chat",
  "sent": "from:me",
  "drafts": "is:draft",
  "all": "",
  "spam": "in:spam",
  "trash": "in:trash"
};

// TODO(mihaip): too many global variables, use objects
var LABEL_PREFIX = "label/";
var banner = null;
var gmail = null;

var labelInput = null;
var activeLabelAction = null;
var lastPrefix = null;
var selLabelIndex = null;
var setAction = null;
var UNREAD_COUNT_RE = /\s+\(\d+\)?$/;
var USE_JAPANESE = null;
var ignoreNextKey = null;
var multiKey = null;
var needToClick = null;
var before = null;
var showedHelp = null;

function init(g) {
  gmail = g;
  // Check browser language ブラウザ言語が日本語かどうかをチェック
  if ((navigator.browserLanguage ||
    navigator.language || navigator.userLanguage).substr(0,2) == 'ja') {
    USE_JAPANESE = true;
    var str = " in JAPANESE";
  }
  // ブラウザ言語が日本語なのに英語表記で使用する場合は以下のコメントを外す
  //USE_JAPANESE = false;
  
  // KEY_MAPを修正
  var ADD_KEY_MAP = USE_JAPANESE ? KEY_MAP_JP : KEY_MAP_EN;
  for (var i in ADD_KEY_MAP) {
    KEY_MAP[i] = ADD_KEY_MAP[i];
  }

  banner = new Banner();
  // 5秒たったら"Gmail Macros Mod has loaded"を自動的に隠す
  showBanner = window.setTimeout(function() {
    banner.hide()
  }, 5000);
  banner.show();
  banner.setFooter("Gmail Macros is started" + str);
  loaded = true;
  
  getDoc().defaultView.addEventListener(
    'mousedown', function(){banner.hide()}, false);
  getDoc().defaultView.addEventListener('keydown', keyHandler, false);
}

function keyHandler(event) {
  before = new Date().getTime();
  // バナーを隠し、EventListener(mousedown)のメモリを開放する
  if (loaded) {
    if (showBanner) clearTimeout(showBanner);
    banner.hide();
    loaded = false;
    getDoc().defaultView.removeEventListener(
      'mousedown', function(){banner.hide()}, false);
    // ヘルプを表示していた場合は、閉じるだけにする。
    if (showedHelp) {
      avoidGmailFunction();
      return showedHelp = false;
    }
  }
  // Apparently we still see Firefox shortcuts like control-T for a new tab - 
  // checking for modifiers lets us ignore those
  if (event.altKey || event.ctrlKey || event.metaKey) return;

  // We also don't want to interfere with regular user typing
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
      (targetNodeName == "input" && event.target.type &&
      (event.target.type.toLowerCase() == "text" ||
      event.target.type.toLowerCase() == "file"))) {
      return;
    }
  }
  var k = event.keyCode;
  k += event.shiftKey ? "s" : "";
  k = k in KEY_MAP ? KEY_MAP[k] : k;
  // When you remove comment slashes below, you can check keyCode
  //banner.show();
  //banner.setFooter(code);
  
  // Don't disturb select functions (e.g. * then a, * then u)
  if (k == '*') {return ignoreNextKey = true;}
  if (ignoreNextKey) {return ignoreNextKey = false;}
  if (multiKey) {
    k = multiKey + k;
    multiKey = false;
  }
  if (k in LABEL_ACTIONS) {
    if (activeLabelAction) {
      endLabelAction();
      return;
    } else {
      activeLabelAction = LABEL_ACTIONS[k];
      beginLabelAction();
      return;
    }
  }
  // 複数キーが設定されていたら次の入力まで待つ
  for (var i in ACTIONS) {
    if (new RegExp('(' + ACTIONS[i].view + ')').test(getView()) &&
      i.match(new RegExp('^(' + k.replace(/\./, "\\.") + '-)'))) {
      multiKey = RegExp.$1;
      avoidGmailFunction();
      return;
    }
  }
  if (k in ACTIONS) {
    if (new RegExp('(' + ACTIONS[k].view + ')').test(getView())) {
      // If false returns, exec Gmail's function too
      if (!ACTIONS[k].func()) {return;}
      avoidGmailFunction();
      console.log(
        "Exec [" + k + "] in " + (new Date().getTime() - before) + "msec");
      return;
    }
  }
  return;
}

// inputにフォーカスを渡すとGmailのショートカットキーが無効になる
function avoidGmailFunction() {
  labelInput = makeLabelInput();
  window.setTimeout(function() {
    labelInput.parentNode.removeChild(labelInput);
    labelInput = null;
  }, 10);
}

function doAction(action) {
  if (action in ACTIONS_ACT) {
    var actionID = ACTIONS_ACT[action];
    // 「更新」だけクリックでしか動作しないし、
    // 他のメニューはクリックでは動作しない
    if (actionID == '20') {needToClick = true;}
    var actionButton = evalXPath(
      ".//div[@act='" + actionID + "']", getCurrentPage());
    if (actionButton) {
      if (needToClick) {
        simulateClick(actionButton[0], "click");
        needToClick = false;
      } else {
        simulateClick(actionButton[0], "mousedown");
        simulateClick(actionButton[0], "mouseup");
      }
      return 1;
    } else {
      showError(act + ' was not found');
      return false;
    }
  }
  return clickMoreActionsMenuItem(action);
}

function japaneseConversion(text) {
  if (USE_JAPANESE && text in ACTIONS_LIST) {
    return ACTIONS_LIST[text];
  } else {
    return text;
  }
}

function getMenuButton(menuText) {
  if (menuText == "Show menu" || menuText == "Reply") {
    var menuButton = evalXPath(
      ".//div[@class='G0']/div/div[@role='button']", getCurrentPage());
    if (menuText == "Show menu") {
      menuButton[0] = menuButton[1];
    }
  } else if (menuText == "Show details") {
    var menuButton = evalXPath(".//span[@class='iD']", getCurrentPage());
  // mousedownでは実行できないメニュー
  } else if (menuText == "Empty Trash now" ||
    menuText == "Delete all spam messages now") {
    menuText = japaneseConversion(menuText);
    needToClick = true;
    var menuButton = evalXPath(
      ".//text()[self::text()='" + menuText + "']/..", getCurrentPage());
  // メール選択はテキストでは検索できない
  } else if (menuText == "Select") {
    var menuButton = evalXPath(
      ".//input[@type='checkbox']/..", getCurrentPage());
  } else {
    menuText = japaneseConversion(menuText);
    var menuButton = evalXPath(
      ".//text()[self::text()='" + menuText + "']", getCurrentPage());
  }
  return menuButton[0];
}

function showError(text) {
  banner.show();
  banner.setFooter(text);
  window.setTimeout(function() {
    banner.hide();
  }, 1500);
  console.log(text);
}

function clickMoreActionsMenuItem(menuItemText) {
  var menuText = menuItemText.split('=>');
  if (menuText[0] == "Compose") {
    var menuButton = getMenuButton(menuText[1]);
  } else if (menuText[0] == "Conversation") {
    var menuButton = getMenuButton(menuText[1]);
    needToClick = true;
  } else {
    var menuButton = getMenuButton(menuText[0]);
  }
  
  // click menu
  if (needToClick) {
    simulateClick(menuButton, "click");
    if (menuText[1] == "Show menu") {
      var menu = evalXPath(".//div[@class='b7 J-M']", getCurrentPage());
      menu[0].style = "";
    }
    needToClick = false;
    return true;
  } else {
    simulateClick(menuButton, "mousedown");
    simulateClick(menuButton, "mouseup");
    
    if (menuText[0] == "Compose") return true;
    // get node with submenu
    var menuBodyNodes = evalXPath(".//div[@class='J-M AW']", getCurrentPage());
    var menuBodyNode = getFirstVisibleNode(menuBodyNodes);
    if (!menuBodyNode) {
      showError(menuText[0] + " was not found");
      return false;
    }
  }
  
  if (menuText[1]) {
    menuText[1] = japaneseConversion(menuText[1]);
    // click submenu
    var submenuItem = evalXPath(
      ".//text()[self::text()='" + menuText[1] + "']", menuBodyNode);
    for (var i = 0; i < submenuItem.length; i++) {
      if (submenuItem[i].textContent == menuText[1]) {
        var style = submenuItem[i].parentNode.parentNode.style.cssText;
        // 非表示の時はfalseを返し、ポップアップを解除する
        if (/display ?: ?none/.test(style)) {
          simulateClick(menuButton, "mousedown");
          simulateClick(menuButton, "mouseup");
          return false;
        } else {
          simulateClick(submenuItem[i], "mousedown");
          simulateClick(submenuItem[i], "mouseup");
          return 2;
        }
      }
    }
    // Make new label ラベルが見つからないときは新規作成
    var inputNode = evalXPath(".//input", menuBodyNode);
    if (inputNode) {
      inputNode[0].value = menuText[1];
      var createNode = getFirstVisibleNode(
        evalXPath(".//div[@act='14']", menuBodyNode));
      if (createNode) {
        simulateClick(createNode, "mousedown");
        simulateClick(createNode, "mouseup");
        return 3;
      } else {
        showError("Couldn't create label '" + menuText[1]);
        return false;
      }
    }
  } else {
    // enable just popup
    var inputNode = evalXPath(".//input", menuBodyNode);
    if (inputNode) {
      window.setTimeout(function() {
        inputNode[0].focus();
      }, 10);
      inputNode[0].blur();
      return 4;
    }
  }
  
  return false;
}

const GMAIL_FUNCTION = {
  "all": {
    "c": "Compose mail",
    "/": "Focus search input",
    "z": "Undo",
    "q": "Focus chat search box",
    "?": "Show keyboard shortcut help",
    "Esc": "Blur(Defocus) from input box",
  },
  "tl|cv": {
    "j/k": "Old/New thread",
    "e": "Archive",
    "m": "Mute",
    "o": "Open thread or mail",
    "s": "Add or Remove star",
    "!": "Report spam",
    "#": "Delete",
    "I": "Mark as read",
    "U": "Mark as unread",
    "y": "<div>Archive(#inbox) Move to inbox(#trash)"
      + "Unstar(#starred) Remove label(#label)</div>",
    "v": "Popup 'Move to' menu",
    "l": "Popup 'Labels' menu",
    ".": "Popup 'More actions' menu",
    "T": "Add to Tasks",
  },
  "tl": {
    "x": "Select thread",
    "u": "Back to threadlist",
    "*+": "Select a(All), n(None), r(Read),"
      +" u(Unread), s(Starred), t(Unstarred)",
  },
  "cv": {
    "n/p": "Next/Prev mail",
    "r": "Reply (R new window)",
    "a": "Reply all (A new window)",
    "f": "Forward (F new window)",
    "N": "Refresh current thread",
    "[/]": "Archive and Prev/Next",
  },
  "co": {
    "Ctrl+s": "Save as draft",
  }
};

function makeHelpHtml(key, label) {
  var class = label.length > 25 ? "normal" : "half";
  var html = "<div class='" + class + "'><span class='key'>" + key + "</span>"
    + "<span class='label'>" + label + "</span></div>";
  return html;
}

function showHelp() {
  var html = "<style type='text/css'>"
    + "div.help div{text-align: left;}"
    + "span.key {"
      + "width: 60px; border: 1px solid #fff; float: left; text-align: center;}"
    + "span.label {border: 1px solid #fff; display: block;}"
    + ".your_shortcut {width: 100% !important;float: left; color: #ff0;}"
    + ".gmail_shortcut {width: 100% !important;float: left;}"
    + ".help .half {width: 33% !important; float: left;}"
    + ".help .normal {width: 66% !important; float: left;}"
    + "hr {clear: left;}"
    + "</style>";
  html += "<div class='help'>";
  html += "<div>All time shortcut key</div>";
  html += "<div class='all_time'><div class='your_shortcut'>";
  for (var i in LABEL_ACTIONS) {
    html += makeHelpHtml(i, LABEL_ACTIONS[i].label);
  }
  html += "</div><div class='gmail_shortcut'>";
  for (var i in GMAIL_FUNCTION['all']) {
      html += makeHelpHtml(i, GMAIL_FUNCTION['all'][i]);
  }
  html += "</div></div>";
  html += "<hr>\n<div>" + VIEW_LIST[getView()] + " shortcut key</div>";
  html += "<div class='get_view'><div class='your_shortcut'>";
  for (var i in ACTIONS) {
    if (new RegExp('(' + ACTIONS[i].view + ')').test(getView())) {
      html += makeHelpHtml(i, ACTIONS[i].label);
    }
  }
  html += "</div><div class='gmail_shortcut'>";
  for (var i in GMAIL_FUNCTION) {
    if (new RegExp('(' + i + ')').test(getView())) {
      for (var j in GMAIL_FUNCTION[i]) {
        html += makeHelpHtml(j, GMAIL_FUNCTION[i][j]);
      }
    }
  }
  html += "</div></div><hr>"
    + "<div class='your_shortcut'>Keys you set is displayed in yellow.</div>"
    + "<div class='gmail_shortcut'>Press any key to close.</div>"
    + "</div>";
  banner.show(true);
  banner.setFooter("Help");
  banner.update(html);
  loaded = true;
  showedHelp = true;
  return true;
}

function getSearchForLocation(loc) {
  if (loc in LOC_TO_SEARCH) {
    return LOC_TO_SEARCH[loc];
  }
  if (loc.indexOf(LABEL_PREFIX) == 0) {
    var labelName = loc.substring(LABEL_PREFIX.length);
    // Normalize spaces to dashes, since that's what Gmail wants for searches
    labelName = labelName.replace(/\+/g, "-");
    return "label:" + labelName;
  }
  return null;
}

function getDoc() {
  return gmail.getMastheadElement().ownerDocument;
}

// ページ移動ごとにHTMLが作られるので、現在ページを取得する
function getCurrentPage() {
  var pages = evalXPath(
    "//div[@class='diLZtc']/div/div[position()='2']/div/div", getDoc().body);
  for (var i = 0; i < pages.length; i++) {
    if (!/display ?: ?none;/.test(pages[i].style.cssText)) {
      return pages[i];
    }
  }
}

function newNode(tagName) {
  return getDoc().createElement(tagName);
}

function getFirstVisibleNode(nodes) {
  for (var i = 0, node; node = nodes[i]; i++) {
    if (node.offsetHeight) return node;
  }
  return null;
}

function getView() {
  var loc = top.location.hash;
  if (/#(compose|drafts\/)/.test(loc)) {
    return 'co';  // メール作成
  } else if (/#settings/.test(loc)) {
    return 's';  // 設定
  } else if (/#contact/.test(loc)) {
    return 'ct';  // 連絡先
  } else if (/^#[^\/]+$/.test(loc) || /^#(label|search)\/[^\/]+$/.test(loc)) {
    return 'tl';  // スレッドリスト
  } else {
    return 'cv';  // メール閲覧
  }
}

function simulateClick(node, eventType) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent(
    eventType,
    true,  // can bubble
    true,  // cancellable
    node.ownerDocument.defaultView,
    1,    // clicks
    50, 50,  // screen coordinates
    50, 50,  // client coordinates
    false, false, false, false,  // control, alt, shift, meta
    0,    // button,
    node
  );
  node.dispatchEvent(event);
}

function evalXPath(expression, rootNode) {
  try {
    var xpathIterator = rootNode.ownerDocument.evaluate(
      expression,
      rootNode,
      null, // no namespace resolver
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null); // no existing results
  } catch (err) {
    GM_log("Error when evaluating XPath expression '"
      + expression + "'" + ": " + err);
    return null;
  }
  var results = [];

  // Convert result to JS array
  while (xpathNode = xpathIterator.iterateNext()) {
    results.push(xpathNode);
  }

  return results;
}

function beginLabelAction() {
  // TODO(mihaip): make sure the labels nav pane is open
  banner.show();
  banner.setFooter(activeLabelAction.label);

  lastPrefix = null;
  selLabelIndex = 0;
  dispatchedActionTimeout = null;

  labelInput = makeLabelInput();
  labelInput.addEventListener("keyup", updateLabelAction, false);
  // we want escape, clicks, etc. to cancel, which seems to be equivalent to the
  // field losing focus
  labelInput.addEventListener("blur", endLabelAction, false);
}

function makeLabelInput() {
  labelInput = newNode("input");
  labelInput.type = "text";
  labelInput.setAttribute("autocomplete", "off");
  with (labelInput.style) {
    // We need to use fixed positioning since we have to ensure
    // that the input is not scrolled out of view (since
    // Gecko will scroll for us if it is).
    position = "fixed"; 
    top = "0";
    left = "-300px";
    width = "200px";
    height = "20px";
    zIndex = "1000";
  }

  getDoc().body.appendChild(labelInput);
  labelInput.focus();
  labelInput.value = "";

  return labelInput;
}

function endLabelAction() {
  if (dispatchedActionTimeout) return;

  // TODO(mihaip): re-close label box if necessary
  banner.hide();
  if (labelInput) {
    labelInput.parentNode.removeChild(labelInput);
    labelInput = null;
  }
  activeLabelAction = null;
}

function doLabelAction(labelName) {
  // Show selected label => Exec function => Hide banner
  // 選択されたラベルを表示 => 関数を実行 => バナーを隠す
  dispatchedActionTimeout = window.setTimeout(function() {
    dispatchedActionTimeout = null;
    endLabelAction();
  }, 1000);
  window.setTimeout(function() {
    activeLabelAction.func(labelName);
  }, 10);
  banner.update(labelName);  // Tell the user what we picked
  return;
}

function updateLabelAction(event) {
  // We've already dispatched the action, the user is just typing away
  if (dispatchedActionTimeout) return;
  
  var labels = getLabels();
  var selectedLabels = [];
  // We need to skip the label shortcut that got us here
  // 入力した文字の2文字目以降を取得（先頭文字はバナー起動キー(glなど)）
  var inputName = labelInput.value.substring(1);
  // 既存ラベルとのマッチング用に小文字に変換
  var labelPrefix = inputName.toLowerCase();
  // We always want to reset the cursor position to the end of the text
  // field, since some of the keys that we support (arrows) would
  // otherwise change it
  labelInput.selectionStart = labelInput.selectionEnd = labelPrefix.length + 1;

  if (labelPrefix.length == 0) {
    banner.update("");
    return;
  }
  for (var i = 0; i < labels.length; i++) {
    label = labels[i];
    // 入力文字とラベルの先頭文字が一致したら追加
    if (label.toLowerCase().indexOf(labelPrefix) == 0) {
      selectedLabels.push(label);
      banner.setFooter(activeLabelAction.label);
    }
  }
  if (labelPrefix != lastPrefix) {
    lastPrefix = labelPrefix;
    selLabelIndex = 0;
  }
  // 一致するラベルがなければ、新しく作成する
  if (selectedLabels.length == 0) {
    banner.update(inputName);
    banner.setFooter("Create new Label");
  }
  // 1秒以内に新たに入力があれば、タイマーを解除する
  if (setAction) {window.clearTimeout(setAction);}
  // 一致するラベルが1つだけの場合、1秒後に選択を確定する
  if (selectedLabels.length == 1) {
    var selectedLabelName = selectedLabels[selLabelIndex];
    if (activeLabelAction.label == 'Go to label') {
      doLabelAction(selectedLabelName);
    } else {
      setAction = window.setTimeout(function() {
        doLabelAction(selectedLabelName)
      }, 1000);
    }
  }
  
  // 13＝エンターキーを押した時
  if (event.keyCode == 13) {
    if (setAction) {window.clearTimeout(setAction);}
    if (selectedLabels.length == 0) {
      var selectedLabelName = inputName;
    } else {
      var selectedLabelName = selectedLabels[selLabelIndex];
    }
    doLabelAction(selectedLabelName);
  } else if (event.keyCode == 40) { // down
    selLabelIndex = (selLabelIndex + 1) % selectedLabels.length;
  } else if (event.keyCode == 38) { // up
    selLabelIndex =
      (selLabelIndex + selectedLabels.length - 1) % selectedLabels.length;
  }
  
  if (selectedLabels.length > 0) {
    var selectedLabelName = selectedLabels[selLabelIndex];
    // 入力文字と一致するラベルの文字に下線を追加
    var highlightedSelectedLabelName =
      selectedLabelName.replace(
        new RegExp("(" + labelPrefix + ")", "i"), "<u>$1</u>");
    var labelPosition = " <small>("
      + (selLabelIndex + 1) + "/" + selectedLabels.length + ")</small>";
    banner.update(highlightedSelectedLabelName + labelPosition);
  }
}

function getLabels() {
  var labels = [];
  // 標準トレイ（受信トレイ、ゴミ箱）と設定項目の追加。
  for (var i in SPECIAL_LABELS) {
    labels.push(i);
  }
  
  // ラベルを取得する
  var elem = evalXPath(
    ".//div[@class='zw']//div[contains(concat(' ', @class, ' '), ' TO ')]//a",
    getDoc().body);
  for (var i = 0; i < elem.length; i++) {
    var labelName = elem[i].textContent.replace(UNREAD_COUNT_RE, "");
    labels.push(labelName);
  }
  
  // Get QuickLinks
  var elem = evalXPath(".//a[@class='po']", getDoc().body);
  for (var i = 0; i < elem.length; i++) {
    quickName = elem[i].innerHTML;
    quickLink = elem[i].title;
    if (quickName in SPECIAL_LABELS) {
    } else {
      labels.push(quickName);
      SPECIAL_LABELS[quickName] = quickLink;
    }
  }
  return labels;
}

// ポップアップバナーの設定
function Banner() {
  function getNodeSet() {
    var boxNode = newNode("div");
    boxNode.className = "banner";
    with (boxNode.style) {
      display = "none";
      position = "fixed";
      left = "10%";
      margin = "0 10% 0 10%";
      width = "60%";
      textAlign = "center";
      MozBorderRadius = "10px";
      padding = "10px";
      color = "#fff";
    }

    var messageNode = newNode("div");
    with (messageNode.style) {
      fontSize = "24px";
      fontWeight = "bold";
      fontFamily = "Lucida Grande, Trebuchet MS, sans-serif";
      margin = "0 0 10px 0";
    }
    boxNode.appendChild(messageNode);

    var taglineNode = newNode("div");
    with (taglineNode.style) {
      fontSize = "13px";
      margin = "0";
      position = "absolute";
      right = "0.2em";
      bottom = "0";
      MozOpacity = "0.5";
    }
    taglineNode.innerHTML = 'LabelSelector<span style="color:red">9001</span>';
    boxNode.appendChild(taglineNode);

    var footerNode = newNode("div");
    with (footerNode.style) {
      fontSize = "13px";
    }
    boxNode.appendChild(footerNode);

    return boxNode;
  }

  this.backgroundNode = getNodeSet();
  this.backgroundNode.style.background = "#000";
  this.backgroundNode.style.MozOpacity = "0.70";
  this.backgroundNode.style.zIndex = 100;
  for (var child = this.backgroundNode.firstChild;
    child; child = child.nextSibling) {
    child.style.visibility = "hidden";
  }

  this.foregroundNode = getNodeSet();
  this.foregroundNode.style.zIndex = 101;
}

Banner.prototype.hide = function() {
  this.backgroundNode.style.display =
    this.foregroundNode.style.display = "none";
}

Banner.prototype.show = function(opt_isBottomAnchored) {
  this.update("");
  getDoc().body.appendChild(this.backgroundNode);
  getDoc().body.appendChild(this.foregroundNode);

  if (opt_isBottomAnchored) {
    this.backgroundNode.style.width = this.foregroundNode.style.width = "80%";
    this.backgroundNode.style.left = this.foregroundNode.style.left = "0px";
  }
  this.backgroundNode.style.bottom =
    this.foregroundNode.style.bottom = opt_isBottomAnchored ? "10%" : "";
  this.backgroundNode.style.top =
    this.foregroundNode.style.top = opt_isBottomAnchored ? "10%" : "50%";
  this.backgroundNode.style.display =
    this.foregroundNode.style.display = "block";
}

Banner.prototype.update = function(message) {
  if (message.length) {
    this.backgroundNode.firstChild.style.display =
      this.foregroundNode.firstChild.style.display = "inline";
  } else {
    this.backgroundNode.firstChild.style.display =
      this.foregroundNode.firstChild.style.display = "none";
  }
  this.backgroundNode.firstChild.innerHTML =
    this.foregroundNode.firstChild.innerHTML = message;
}

Banner.prototype.setFooter = function(text) {
  this.backgroundNode.lastChild.innerHTML =
    this.foregroundNode.lastChild.innerHTML = text;
}
