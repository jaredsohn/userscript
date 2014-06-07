// ==UserScript==
// @name          Google Reader - "Mark as read" keyboard shortcuts
// @author				Taurusqh
// @version				1.0.2 20110411
// @description   Four shortcuts that use existing google shortcuts to mark items as read. 1. Mark an item as read in list view and then moves to the next item (key ','). 2. Mark all items above the urrently selected item as read (key 'W'). 3. Mark all items below the currently selected as read key 'Q').4. Mark all items between the currently selected and the last selected as read (must hold SHIFT).
// Works with 'PostRank Google Reader Integration':
// SHIFT + 'Q': mark all above including the lightened colored ones.
// SHIFT + 'W': mark all below including the lightened colored ones.
// SHIFT + ALT + click: mark all between including the lightened colored ones.
//
// @include       http://www.google.com/reader*
// @include       https://www.google.com/reader*
// @updateURL			https://userscripts.org/scripts/source/87987.meta.js
// @iconURL       http://www.google.com/reader/ui/favicon.ico
// Thanks to Crend King's script: http://userscripts.org/scripts/show/47830
// ==/UserScript==
// 20110321 Some changes for FF4
// 20110330 add an icon to each entry which you can click it to mark the entry as read WITHOUT open it
// 20110401 add an icon to each entry which you can mark it to read later (default tag name: Later)
// 20110411 add a shotcut key to mark entry to read later (default key 'z')

(function() {

var TAG_LATER = 'Later';			// 标签名（根据需要自己设置），后续阅读时会把条目设置此标签名   Tag name for READ LATER
var HOT_KEYS = {
			KEY_MARK_ABOVE: 'w',
			KEY_MARK_BELOW: 'q',
			KEY_MARK_ABOVE_ALL: 'W',
			KEY_MARK_BELOW_ALL: 'Q',
			KEY_MARK_MOVEON: ',',
			KEY_MARK_MOVEON_ALL: '<',
			KEY_MARK_READ_LATER: 'z'
		};


function simKeyPress(node, iMarkAll, iDirection) {
  var e = node.ownerDocument.createEvent("KeyboardEvent");
	if (!node.className.match("\\sread") && (iMarkAll == 1 || 
				((node.style.opacity == "" || node.style.opacity == "1")
				 && (node.style.display == "" || node.style.display == "block")
				))
		 ) {
		e.initKeyEvent('keypress', true, true, window, false, false, false, false, 77, 0x4D);
		node.dispatchEvent(e);
  }
  if (iDirection == 0)	// 向上
  	e.initKeyEvent('keypress', true, true, window, false, false, false, false, 80, 0x50);
  else // 向下
  	e.initKeyEvent('keypress', true, true, window, false, false, false, false, 78, 0x4E);
  node.dispatchEvent(e);
}

function simulateClick(node) {
   var event = node.ownerDocument.createEvent("MouseEvents");
   event.initMouseEvent("click",
                        true, true, window, 1, 0, 0, 0, 0,
                        false, false, false, false, 0, null);
   node.dispatchEvent(event);
}

function markAsReadAndMoveOn(iMarkAll){
    var currentEntry = document.getElementById('current-entry');
    simKeyPress(currentEntry, iMarkAll, 1);
}

// 向上标记为已读
function markUntilCurrentAsRead(iMarkAll){
	var j = getCurrEntID();
	if (j < 0)
		return;

  var allEntries = getAllEntries();

	// 选中下一个
	var e = allEntries[j].ownerDocument.createEvent("KeyboardEvent");
	e.initKeyEvent('keypress', true, true, window, false, false, false, false, 80, 0x50);
	allEntries[j].dispatchEvent(e);
	
	// 判断是否有第二个参数传入
	var iStopIndex = -1;
	if (arguments.length > 1)
		iStopIndex = arguments[1] + 1;
	else
		iStopIndex = 0;
	if (iStopIndex < 0) 
		return;	

	// 循环标记为已读
  for(var i = j - 1; i >= iStopIndex; i--) {
		simKeyPress(allEntries[i], iMarkAll, 0);
  }

	// 如果一直标记到第一行，才需要重新回到当前项
	if (iStopIndex == 0)
	  for(var i = iStopIndex; i < j; i++) {
			e.initKeyEvent('keypress', true, true, window, false, false, false, false, 78, 0x4E);
			allEntries[j].dispatchEvent(e);
	  }

	allEntries = null;
}

// 向下标记为已读
function markUntilAfterAsRead(iMarkAll){
	var j = getCurrEntID();
	if (j < 0)
		return;

  var allEntries = getAllEntries();

	// 选中下一个
	var e = allEntries[j].ownerDocument.createEvent("KeyboardEvent");
	e.initKeyEvent('keypress', true, true, window, false, false, false, false, 78, 0x4E);
	allEntries[j].dispatchEvent(e);

	// 判断是否有第二个参数传入
	var iStopIndex = -1;
	if (arguments.length > 1)
		iStopIndex = arguments[1] - 1;
	else
		iStopIndex = allEntries.length - 1;
	if (iStopIndex < 0) 
		return;	

	// 循环标记为已读
  for(var i = j + 1; i <= iStopIndex; i++) {
		simKeyPress(allEntries[i], iMarkAll, 1);
  }

	// 如果是一直标记到最后一行，才需要重新回到当前项
	if (iStopIndex == allEntries.length - 1)
	  for(var i = 0; i < iStopIndex - j; i++) {
			e.initKeyEvent('keypress', true, true, window, false, false, false, false, 80, 0x50);
			allEntries[j].dispatchEvent(e);
	  }
	  
	allEntries = null;
}

// 将两条之间的标记为已读
function markBetweenAsRead(iMarkAll, iLastCurr){
	if (iLastCurr > getCurrEntID())
		markUntilAfterAsRead(iMarkAll, iLastCurr); 	
	else
		markUntilCurrentAsRead(iMarkAll, iLastCurr); 	

	// 收起条目
	var e = document.createEvent("KeyboardEvent");
	e.initKeyEvent('keypress', true, true, window, false, false, false, false, 13, 0x0D);
	document.dispatchEvent(e);
}


function getAllEntries(){
    var allDivs = document.evaluate("//div[contains(@class, 'entry')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var allEntries = new Array();
    for(var i=0;i<allDivs.snapshotLength;i++){		
			if(/entry\sentry-\d*/.test(allDivs.snapshotItem(i).className)){
				allEntries.push(allDivs.snapshotItem(i));
			}
    }
    allDivs = null;
    return allEntries;
}


function keyPressEvent(event){
	// 解决输入框不能输入的问题
	if (/^(?:input|textarea)$/i.test(event.target.localName)) 
		return;		
		
	if (event.ctrlKey || event.altKey || event.metaKey)
		return;
		
  var kcode = (event.keyCode)?event.keyCode:event.which;
  var k = String.fromCharCode(kcode);

  var allHotKeys = "";
  for (var key in HOT_KEYS) {
  	allHotKeys += HOT_KEYS[key];
  }
	if (!k.match('[' + allHotKeys + ']')) 
		return;		

  // 记录按键前滚动条位置
	var divEntries = document.getElementById("entries");
  var oScrllPos = divEntries.scrollTop; 
  switch(k) {
  	case HOT_KEYS.KEY_MARK_MOVEON:
    	markAsReadAndMoveOn(0);
    	break;
  	case HOT_KEYS.KEY_MARK_MOVEON_ALL:
    	markAsReadAndMoveOn(1);
    	break;
    case HOT_KEYS.KEY_MARK_ABOVE:
			markUntilCurrentAsRead(0);
			break;
    case HOT_KEYS.KEY_MARK_BELOW:
			markUntilAfterAsRead(0);
			break;
    case HOT_KEYS.KEY_MARK_ABOVE_ALL:
			markUntilCurrentAsRead(1);
			break;
    case HOT_KEYS.KEY_MARK_BELOW_ALL:
			markUntilAfterAsRead(1);
			break;
    case HOT_KEYS.KEY_MARK_READ_LATER:
			markReadLater();
			break;
  }
	event.stopPropagation();  
	
	//20110323 滚回到按下键之前的位置
	if (k.match('[' + allHotKeys + ']'))
  	divEntries.scrollTop = oScrllPos;		
}

// 按键触发标记为后续阅读
function markReadLater() {
	//找到当前阅读条目的后续阅读按钮
	var imgCrtEntry = document.evaluate("//div[@id='current-entry']//div//div//div//img[@id='imgLater']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (imgCrtEntry) {
		var evt = document.createEvent("MouseEvents");
　　evt.initEvent("click", false, false);
　　imgCrtEntry.dispatchEvent(evt); 
	}
}

// 点击图标标记为已读，另一个图标为后续阅读
function markRead(event) {
  // 记录按键前滚动条位置
	var divEntries = document.getElementById("entries");
  var oScrllPos = divEntries.scrollTop; 

	var node = event.target.parentNode;
  var e = node.ownerDocument.createEvent("MouseEvents");
  e.initMouseEvent("click",
	    true, true, window, 1, 0, 0, 0, 0,
	    false, false, false, false, 0, null);

	//如果条目没有展开，展开条目	    
	if (!/expanded/.test(node.parentNode.parentNode.parentNode.className)) {
	  node.dispatchEvent(e);
	}
	
	if ("imgLater" == event.target.id)	{  //设置'Later'标签，以供后续阅读
		event.stopPropagation();	

		// 模拟鼠标点击，显示标签设置窗口	
		var spanTags = document.evaluate("//span[@class='entry-tagging-action-title']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (spanTags)
			spanTags.dispatchEvent(e);
		
		//此处需要等待标签设置窗口出现
		setTimeout(
			function() {
				var iTags = document.evaluate("//input[@class='tags-edit-tags']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if (iTags) {
					iTags.value += "," + TAG_LATER;
			
					//模拟回车键保存tag	    
					var e2 = iTags.ownerDocument.createEvent("KeyboardEvent");
					e2.initKeyEvent('keypress', true, true, window, false, false, false, false, 13, 0x0D);
				  iTags.dispatchEvent(e2);

					//模拟回车键收起条目
				  divEntries.dispatchEvent(e2);
	
				 	divEntries.scrollTop = oScrllPos;		//滚回到按下键之前的位置
				}
			}, 1);
	} else {		// 标记为已读
	  node.dispatchEvent(e);
	  divEntries.scrollTop = oScrllPos;		//滚回到按下键之前的位置
	  event.stopPropagation();
	}
}


/* TODO: API方式设置tag    http://userscripts.org/scripts/review/84126
function markAsReadLater(entry_obj)
{
	if (entry_obj.id)
	{
		GM_xmlhttpRequest(
		{
			method: "POST",
			url: "https://www.google.com/reader/api/0/edit-tag?client=scroll",
			headers: {"Content-type": "application/x-www-form-urlencoded"},
			data: "ac=edit-tags&r=user/-/state/com.google/read&i=" + escape(entry_obj.id),// + "&T=" + escape(session_token),
			onload: function(response)
			{
				if (response.responseText <> "OK")
				{
					// if the response from server is not OK, stop the main function
					clearInterval(interval_ids.main);
					show_info_msg("Error occurred in unread_curr_entry().");
					setTimeout(hide_msg_area, msg_timeout);
				}
			}
		});
	}
}
*/

// 每个entry添加两个图标
function addMarkIcons(event){
	var objTarget = event.target;
	if (/entry/.test(objTarget.className)) {
		var entryIcon = objTarget.getElementsByClassName("entry-secondary");
		if (entryIcon && entryIcon.length > 0) {
			var imgMark = document.createElement('img');
			imgMark.src = "http://www.google.com/reader/ui/favicon.ico";
			imgMark.addEventListener('click', markRead, false);
			imgMark.title = "标记为已读/mark as read";
			entryIcon[0].insertBefore(imgMark, entryIcon[0].firstChild);
			entryIcon[0].insertBefore(document.createTextNode(' '), entryIcon[0].firstChild);
			
			var imgLater = document.createElement('img');
			imgLater.src = "http://readitlaterlist.com/favicon.ico";
			imgLater.id = "imgLater"
			imgLater.title = "以后再看/read later";
			imgLater.addEventListener('click', markRead, false);
			entryIcon[0].insertBefore(imgLater, entryIcon[0].firstChild);
    }
  }
}

// create buttons in the toolbar
function makeButtons()
{
	// clone the "Mark all as read" button
	const mark_all_btn = document.getElementById("mark-all-as-read");
	var mark_below_btn = mark_all_btn.cloneNode(true);
	var mark_above_btn = mark_all_btn.cloneNode(true);

	// change node IDs
	mark_below_btn.id = "mark-below-as-read";
	mark_above_btn.id = "mark-above-as-read";
	
	// attach click events to the buttons
	mark_below_btn.addEventListener("click", function(event) { markUntilAfterAsRead(0); }, true);
	mark_above_btn.addEventListener("click", function(event) { markUntilCurrentAsRead(0); }, true);

	// add buttons
	var viewer_ctrls = document.getElementById("viewer-top-controls");
	viewer_ctrls.insertBefore(mark_below_btn, viewer_ctrls.firstChild);
	viewer_ctrls.insertBefore(mark_above_btn, viewer_ctrls.firstChild);
/*
	viewer_ctrls.appendChild(mark_above_btn);
	viewer_ctrls.appendChild(mark_below_btn);
*/
	// change button texts
	var button_body;
	button_body = document.evaluate("//div[@id='mark-below-as-read']//div[@class='goog-button-body']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	button_body.textContent = "已读↓q";
	button_body = document.evaluate("//div[@id='mark-above-as-read']//div[@class='goog-button-body']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	button_body.textContent = "已读↑w";
	viewer_ctrls = null;
	button_body = null;
}

// 取得当前项的ID
function getCurrEntID() {
  var currentElement = document.getElementById('current-entry');
  if (currentElement == undefined)
  	return -1;
//  var sID = currentElement.className.match('entry entry-\\d*')[0].match('-\\d*');
  var sID = currentElement.className.match(/entry-(\d+)/)[1];
  return parseInt(sID);		// 转换为整数
  currentElement = null;
}	

function on_click(event) {
	// if left click with shift key down
	if (event.button == 0 && event.shiftKey) {
		var curr_entry_id = getCurrEntID();
//		alert(curr_entry_id);
		setTimeout(markBetweenAsRead, 200, (event.altKey ? 1:0), curr_entry_id);
		
		// prevent the default behavior
		// otherwise, when shift+clicking on the "original entry" icon, it opens a new window
		event.preventDefault();
	}
}

var entries=document.getElementById("entries");
if(entries) {
	entries.addEventListener('DOMNodeInserted', addMarkIcons, false);
	document.addEventListener("keypress", keyPressEvent, false);
	entries.addEventListener("click", on_click, true);
	makeButtons();
	entries = null;
}
})();