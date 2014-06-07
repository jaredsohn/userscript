// ==UserScript==
// @name           Plurk_Plus
// @namespace      http://www.plurk.com/
// @description    Plurk_Plus
// @include        http://www.plurk.com/*
// ==/UserScript==

//===封鎖===
setTimeout(
'try {FRIENDS;} catch (e) {FRIENDS = null;}if(FRIENDS!=null){getAllFriends = loadJSON("/Friends/getMyFriendsCompletion", "POST");getAllFriends.addCallback(function(d){MY_ALL_FRIENDS = d;});getAllFriends.sendReq({ });MoreOptions.renderPlurkVisibility=function () {var e = createListHolder("auto_ta_holder", "auto_ta_input");var e2 = createListHolder("auto_ta_holder2", "auto_ta_input2");var c = e[0];var b = e[1];var c2 = e2[0];var b2 = e2[1];var g, f, a;var g2, f2, a2;var d = DIV({c: "holder"},DIV({c: "caption"}, _("Who can see this plurk?")),DIV({c: "item"}, f = MoreOptions._createRadio("to", "everybody", "input_everybody"), " ",SPAN({id: "span_everybody"}, MoreOptions._getStrPrivacy())),DIV({c: "item",id: "self_holder"}, a = MoreOptions._createRadio("to", "self", "input_friends"), " " + _("only my friends")),DIV({c: "item",id: "only_holder"},TABLE(TBODY(TR(TD({c: "td_radio"}, g = MoreOptions._createRadio("to", "only", "input_only"), LABEL(" " + _("only") + ":")),TD({c: "td_ta"}, c, SPAN({c: "small"}, _("Type the name of the friend or clique"))))))),DIV({c: "item",id: "except_holder"},TABLE(TBODY(TR(TD({c: "td_radio"}, g2 = MoreOptions._createRadio("to", "except", "input_except"), LABEL(" " + _("除了") + ":")),TD({c: "td_ta"}, c2, SPAN({c: "small"}, _("請輸入不允許收看這則 Plurk 的朋友或群組名稱"))),TD(_("以外的所有朋友")))))));AEV(c, "mouseup", function (h) {$("auto_ta_input").focus();return false});AEV(c2, "mouseup", function (h) {$("auto_ta_input2").focus();return false});onEvent(f, ["change", "click"], function () {if ($("input_everybody").checked) {MoreOptions.setPlurkTo()}});onEvent(a, ["change", "click"], function () {if ($("input_friends").checked) {MoreOptions.setPlurkTo(2)}});onEvent(g, ["change"], function () {if ($("input_only").checked) {MoreOptions.setPlurkTo(4)}});onEvent(g2, ["change"], function () {if ($("input_except").checked) {MoreOptions.setPlurkTo()}});b.onadd = function () {MoreOptions._handleRadios(null, false)};AEV(b, "blur", function (h) {MoreOptions._handleRadios(h, false)});b2.onadd = function () {MoreOptions._handleRadios2(null, false)};AEV(b2, "blur", function (h) {MoreOptions._handleRadios2(h, false)});attachKeyDown(b, MoreOptions._handleRadios);attachKeyDown(b2, MoreOptions._handleRadios2);AEV(c, "click", function () {if (!$("input_only").checked) {MoreOptions._handleRadios(true)}});AEV(c2, "click", function () {if (!$("input_except").checked) {MoreOptions._handleRadios2(true)}});return d};/*handleRadios2 is a ugly implementation*/MoreOptions._handleRadios2 =function (c, b) {if (b == undefined) {b = true}var d;if (c) {d = getEventElm(c)}var a = $bytc("li", "person", $("auto_ta_holder2"));MoreOptions._resetRadios();if (d && d.id == "auto_ta_input2" && d.value != "") {$("input_except").checked = true;$("input_except").onchange()} else {if (a.length == 0) {$("input_everybody").checked = true;$("input_everybody").onchange()} else {$("input_except").checked = true;$("input_except").onchange()}}if ($("input_except").checked) {MoreOptions.setPlurkTo(8)} else {if ($("input_everybody").checked) {MoreOptions.setPlurkTo()} else {MoreOptions.setPlurkTo(2)}}if (b) {$("auto_ta_input2").focus()}};MoreOptions.setPlurkTo =function (b) {var g = $("plurk_to");b = b || SETTINGS.view_plurks;if (b == 4) {showElement(g);var f = _("this plurk will be viewable to");var d = $bytc("li", "person", $("auto_ta_holder"));var a = {};map(d, function (j) {if (j.nick_name == "CLIQUE") {var l = PlurkAdder._getCliqueByName(j.full_name);if (l) {var h = PlurkAdder._getCliqueFriends(l);map(h, function (o) {var m = SiteState.getUserById(o) || COMPLETION[o];if (m) {a[m.nick_name] = m.full_name || m.display_name || m.nick_name}})}} else {a[j.nick_name] = j.full_name}});var c = values(a);var e = [];map(c, function (h) {if (h.length > 20) {h = h.substring(0, 20) + "..."}e.push(h)});f += " <b>" + e.join(", ") + "</b>";setHTML(g, f);addClass(g, "private_to")} else if (b == 8) {showElement(g);var f = _("無法看到這則 Plurk 的朋友是");var d = $bytc("li", "person", $("auto_ta_holder2"));var a = {};map(d, function (j) {if (j.nick_name == "CLIQUE") {var l = PlurkAdder._getCliqueByName(j.full_name);if (l) {var h = PlurkAdder._getCliqueFriends(l);map(h, function (o) {var m = SiteState.getUserById(o) || COMPLETION[o];if (m) {a[m.nick_name] = m.full_name || m.display_name || m.nick_name}})}} else {a[j.nick_name] = j.full_name}});var c = values(a);var e = [];map(c, function (h) {if (h.length > 20) {h = h.substring(0, 20) + "..."}e.push(h)});f += " <b>" + e.join(", ") + "</b>";setHTML(g, f);addClass(g, "private_to")} else {var f = _("this plurk will be viewable to") + " <b>" + MoreOptions._getStrPrivacy(b) + "</b>";setHTML(g, f);if (b == MoreOptions.PR_WHOLE_WORLD) {hideElement(g)} else {showElement(g);addClass(g, "private_to")}}};PlurkAdder._getLimitedTo =function () {var d = $("input_everybody");var e = $("input_only");var b = $("input_friends");var g = $("input_except");if (!d || d.checked) {return null}var a = [];a.push(SiteState.getSessionUser().uid);if (e.checked) {var c = PlurkAdder.getAutoCompleteIds("auto_ta_holder");if (!c) {return null} else {map(c, function (f) {if (SiteState.getUserById(f) || COMPLETION[f]) {a.push(f)}})}} else if (g.checked) {var c = PlurkAdder.getAutoCompleteIds("auto_ta_holder2");if (!c) {a = "only-friends";} else {var t = "";for(k in MY_ALL_FRIENDS){if(k=="18757"){continue;/*plurk buddy*/}t+=("|"+k);}t+="|";for(k in c){t = t.replace(("|"+c[k]+"|"), "|");}a = t.split("|"); a.pop();a[0] = SiteState.getSessionUser().uid;}} else {if (b.checked) {a = "only-friends"}}return a}}'
, 500);


//===開新視窗===
(function() {
setTimeout(function() {
as = document.getElementsByTagName('a');
for (i = 0; i<as.length; i++) {
if (as[i].className == "name") as[i].setAttribute('target', '_blank');
}
setTimeout(arguments.callee, 1000);
}, 1000);
})();


//===小月曆===
(function (window) {
_time="23:59:59"

function showCalendar(gomonth)
{	
	var jscript = document.createElement('script');
	jscript.setAttribute('language','JavaScript');
	jscript.setAttribute('src','http://dl.dropbox.com/u/9578781/calendar2.js');  	  
	document.getElementsByTagName('head')[0].appendChild(jscript);    
	
	var style = document.createElement('link');
    style.setAttribute('href','http://dl.dropbox.com/u/9578781/calendar3.css');
    style.setAttribute('rel','stylesheet');
    style.setAttribute('type','text/css');
    document.getElementsByTagName('head')[0].appendChild(style);
	
	var ftb=document.getElementById('filter_tab')
	var buttom = document.createElement('li');
	buttom.setAttribute('id','calbuttom');
	buttom.innerHTML="<a title='檢視日期與訊息' onclick='showCal()' href='#' class='off_tab'>小月曆</a>";
	ftb.appendChild(buttom);	
}

window.addEventListener("load", function(){
	setTimeout(function(){
		if(document.getElementById('filter_tab')!=null){showCalendar(0);}
	},2000);	
}, false);

})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);


//===轉噗===
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
	}
}

GM_wait(); 
var uw = unsafeWindow;
var p1 = uw.Plurks;
var o_expand = p1.expand;
var o_Plurks_removeExpand = p1._removeExpand;

p1.expand = function(div) {
	o_expand(div);
	var ib = $('#input_big').get(0);

	if(ib) {
		var plurk = uw.getPD(div).obj;
		var info_box1 = $(uw.$dp.info_box);
        
		if(info_box1.children("#RePlurk").length == 0) {
			var rp = $('<a href="#" title="將這則噗轉貼至個人噗浪上" id="RePlurk">轉噗</a>').css('float','right').css('right-padding','3px').click(function(){
				doRePlurk(plurk);
			});
			info_box1.children(".perma_link").after(rp);
		}
	}
}

p1._removeExpand = function(D) {
	var info_box1 = $(uw.$dp.info_box);
	if(info_box1.children("#RePlurk").length == 1) {
	    $("#RePlurk").remove();
	}
	o_Plurks_removeExpand();
};

function doRePlurk(plurk){
	var re_link = 'http://plurk.com/p/' + (plurk.plurk_id).toString(36);
	var raw = plurk.content_raw;
	var owner_id = plurk.owner_id;
	var user_id = plurk.user_id;

	if(owner_id == user_id){
	    window.alert("Oops!! 這是您自己的Plurk內容，不需要再轉了喔!!");
	}
	else{
	    $('#input_big').val(re_link + ' ([轉噗]) ' + raw);
	}
	p1._removeExpand();
	uw.MaxChar.updateBig();
}


//===字型===
var GM_JQ_2 = document.createElement('script');
GM_JQ_2.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
GM_JQ_2.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ_2);

function GM_wait_2() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait_2,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		window.setTimeout(doRTE, 2000);
	}
}

GM_wait_2();

var CONTROL_BAR_ITEM_COMMAND = {
	ITALICIZE: 1,
	EMBOLDEN: 2,
	UNDERLINE: 3,
	LINK: 4,
	TWITTER: 5,
	FACEBOOK: 6,	
}

var o_Plurks_editPlurk; //編輯
var o_Plurks__cancelOnClick; //取消
var o_Plurks__saveOnClick; //儲存
var o_Plurks_removeExpand; //刪除
var o_Plurks_editPlurk_cb;

doRTE = function(){
	var input_big = $("#input_big")[0];
	// $ 是jQuery物件，$("#input_big")用 jQuery 選取元素，選取文件內<input_big>元素
	if(input_big) {
			new ControlBar( true, true, true, true, true, true).inject(input_big);
	}
	
	var input_permalink = $("#input_permalink")[0]; //發噗區輸入框
	if(input_permalink) {
			new ControlBar( true, true, true, true, true, true).inject(input_permalink); //輸入區插入新的ControlBar
	}
	
	var p2 = unsafeWindow.Plurks;

	if(p2) {
		o_Plurks_editPlurk = p2._editPlurk;
		o_Plurks__cancelOnClick = p2.__cancelOnClick;
		p2.__cancelOnClick = function() {
			if(o_Plurks_editPlurk_cb) o_Plurks_editPlurk_cb.empty();
			o_Plurks__cancelOnClick();
		};
		o_Plurks_removeExpand = p._removeExpand;

		p2._removeExpand = function(D) {
			if(o_Plurks_editPlurk_cb) o_Plurks_editPlurk_cb.empty();
			o_Plurks_removeExpand(D);
		};

		$dp2 = unsafeWindow.$dp;
		$($dp2.manager).children('.action').each(function(){
			$(this).unbind('click',p2._editPlurk);
			$(this).click(function() {
				o_Plurks_editPlurk();
				o_Plurks_editPlurk_cb = new ControlBar( true, true, true, true, true, true).inject($dp2.ta);
				p2.repositonCurrent();
				return false;
			});
		});

		$($dp2.saver).children('.cancel').each(function(){
			$(this).unbind('click', o_Plurks__cancelOnClick);
			$(this).click(p2.__cancelOnClick);
		});

		if(p2.poster) {
			new ControlBar( true, true, true, true, true, true).inject(p2.poster.input);
		}
	}
};

function ControlBar( showItalic, showBold, showUnderline, showLink, showTwitter, showFB)
{
	this.showItalic = showItalic;
	this.showBold = showBold;
	this.showUnderline = showUnderline;
	this.showLink = showLink;
	this.showTwtitter = showTwitter;
	this.showFB = showFB;

	this.inject = function( targetTextArea )
	{
	    var controlBar = $("<span></span>").css('padding','1px').css('margin-bottom','1px').css('font-family','Verdana').css('font-size','12px').css('background','#f59cb9').css('opacity','0.9').css('-moz-border-radius','4px').css('display','table');

		if ( showItalic )
		{
			var item = new ControlBarItem( "<a title='斜線'><i>I</i></a>", CONTROL_BAR_ITEM_COMMAND.ITALICIZE, targetTextArea );
			controlBar.append( item.create() );
		}

		if ( showBold )
		{
			var item = new ControlBarItem( "<a title='粗體'><b>B</b></a>", CONTROL_BAR_ITEM_COMMAND.EMBOLDEN, targetTextArea );
			controlBar.append( item.create() );
		}

		if ( showUnderline )
		{
			var item = new ControlBarItem( "<a title='底線'><u>U</u></a>", CONTROL_BAR_ITEM_COMMAND.UNDERLINE, targetTextArea );
			controlBar.append( item.create() );
		}

		if ( showLink )
		{
			var item = new ControlBarItem( "<a title='超連結'>Link</a>", CONTROL_BAR_ITEM_COMMAND.LINK, targetTextArea );
			controlBar.append( item.create() );
		}
		
		if ( showTwitter )
		{
		    var item = new ControlBarItem( "<a title='不同步發佈至Twitter'>!TW</a>", CONTROL_BAR_ITEM_COMMAND.TWITTER, targetTextArea );			
			controlBar.append( item.create() );
		}
		
		if ( showFB )
		{
		    var item = new ControlBarItem( "<a title='不同步發佈至Facebook'>!FB</a>", CONTROL_BAR_ITEM_COMMAND.FACEBOOK, targetTextArea );			
			controlBar.append( item.create() );
		}

		$(targetTextArea).before( controlBar );
		return controlBar;
	};
}

function ControlBarItem( label, editCommand, targetTextArea )
{
	this.label = label;
	this.editCommand = editCommand;
	this.targetTextArea = targetTextArea;

	this.create = function()
	{
		var link = document.createElement("a");
		link.href = "javascript:;";
		link.innerHTML = label;

		link.editCommand = this.editCommand;
		link.targetTextArea = this.targetTextArea;
		link.execute = this.execute;
		link.linkSelection = this.linkSelection;
		link.tagSelection = this.tagSelection;

		addEvent( link, "click", "execute" );
		return $(link).css('color','#9e0505').css('padding','4px').css('text-decoration','none');
	}

	this.execute = function(e)
	{
		switch( this.editCommand )
		{
			case CONTROL_BAR_ITEM_COMMAND.ITALICIZE:
				this.tagSelection( "*", "*" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.EMBOLDEN:
				this.tagSelection( "**", "**" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.UNDERLINE:
				this.tagSelection( "__", "__" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.LINK:
				this.linkSelection();
				break;
			case CONTROL_BAR_ITEM_COMMAND.TWITTER:
			    this.tagSelection( "", "!TW" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.FACEBOOK:
			    this.tagSelection( "", "!FB" );
				break;
			default:
				throw "Unknown command encountered";
		}
		this.blur();
	}

	this.linkSelection = function()
	{
		var url = prompt( "輸入網址:", "" );

		if (url && url != '' )
		{
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;
			var desc = '';
			if(selectionStart == selectionEnd) {
				desc = prompt( "輸入網址敘述:", "" );
			}
			if(!desc) desc = '';
			
			this.tagSelection( url + ' (', desc + ')' );
		}
	}


	this.tagSelection = function( tagOpen, tagClose )
	{
		if ( this.targetTextArea.selectionStart || this.targetTextArea.selectionStart == 0 ) //relies on this property.
		{
			var scrollTop = this.targetTextArea.scrollTop;

			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}

			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;

			this.targetTextArea.value =
				this.targetTextArea.value.substring( 0, selectionStart ) + //text leading up to the selection start
				tagOpen +
				this.targetTextArea.value.substring( selectionStart, selectionEnd ) + //selected text
				tagClose +
				this.targetTextArea.value.substring( selectionEnd ); //text after the selection end

			this.targetTextArea.selectionStart = selectionStart + tagOpen.length;
			this.targetTextArea.selectionEnd = selectionEnd + tagOpen.length;
			this.targetTextArea.scrollTop = scrollTop;
			this.targetTextArea.focus();
		}
	}
}

function addEvent( target, eventName, handlerName )
{
	target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
}


//===表情符號===
var smileData = [];
smileData.push([
	'NEW',
	'http://dl.dropbox.com/u/9578781/',
	[
        '001.gif','002.gif','003.gif','004.gif','005.gif','006.gif','007.gif','008.gif','009.gif',
		'010.gif','011.gif','012.gif','013.gif','014.gif','015.gif','016.gif','017.gif','018.gif',
		'019.gif','020.gif','021.gif','022.gif','023.gif','024.gif','025.gif','026.gif','027.gif',
		'028.gif','029.gif','030.gif',
	]
]);

var isinit = false;
var currInput = null;
var rplreg = /\[(\d+) (\d+)\]/g;
var pageState = location.href.split('/')[3];

window.addEventListener('load', function()
{
    setTimeout(function()
    {
        var selImgs = document.getElementsByClassName('smily_holder');

        if(pageState == 'p')
            getById('input_permalink').addEventListener('keyup', replaceSmile, false);
        else
        {
            if (document.getElementById('input_big')) { getById('input_big').addEventListener('keyup', replaceSmile, false); }
            getById('input_small').addEventListener('keyup', replaceSmile, false);
        }

        for(var i=0; i<selImgs.length; i++)
        {
            selImgs[i].setAttribute('ref', selImgs.length - i);
            selImgs[i].addEventListener('click', function()
            {
                isinit || setTimeout(init, 1000);
                currInput = pageState != 'p' ? this.getAttribute('ref') == 2 ? getById('input_big') : getById('input_small') : getById('input_permalink');
            }, false);
        }
    }, 2000);
}, false);

function init()
{
    isinit = true;
    for(var i=0; i<smileData.length; i++)
    {
        addTab(i, smileData[i]);
    }

    getById('emoticons_show').style.width  = '100%';
    getById('emoticons_show').style.height = '200px';
    getById('emoticons_show').style.overflow = 'auto';
}

function replaceSmile()
{
    if(rplreg.test(this.value))
        this.value = this.value.replace(rplreg, doReplace);
}

function doReplace(str, datid, smileid)
{
    arr = smileData[datid];
    if (typeof(arr) != 'undefined')
    {
        if(typeof(arr[2][smileid]) != 'undefined')
            str = ' ' + smileData[datid][1] + smileData[datid][2][smileid] + ' ';
    }
    return str;
}

function addTab(id, data)
{
    var myli = document.createElement('li');
    myli.className = 'emoticon_selecter';
    myli.innerHTML = '<a href="javascript:void 0;">'+data[0]+'</a>';
    myli.addEventListener('click', function()
    {
        addImages(this, id);
    }, false);

    getById('emoticons_tabs').getElementsByTagName('ul')[0].appendChild(myli);
}

function addImages(obj, ind)
{
    var showDiv = getById('emoticons_show');
    var lis = getById('emoticons_tabs').getElementsByTagName('li');
    for(var i=0; i<lis.length; i++)
        lis[i].className = 'emoticon_selecter';
		
    obj.className += ' current';

    var data = smileData[ind];
    var baseUrl = data[1];
    var str = '<div>';
	
    for(var i=0, dat = data[2], _url; i<dat.length; i++)
    {
        _url = baseUrl + dat[i];
        str += '<a href="javascript:void 0;"><img width="40" src="'+_url+'" alt="'+dat[i]+'" title="['+ind+' '+i+']" /></a>';
    }
	
    str += '</div>';
    showDiv.innerHTML = str;
    
    var imgs = showDiv.getElementsByTagName('img');
    for(var i=0; i<imgs.length; i++)
    {
        imgs[i].addEventListener('click', function()
        {
            currInput.value += ' ' + this.src + ' ';
            currInput.focus();
        }, false);
    }
}

function getById(oid)
{
    return document.getElementById(oid);
}


//===備份===
(function () {
    var now= "";
    var time ="23:59:59";
    var date = new Date();    
	var bar = document.getElementById('icon_friends').parentNode.parentNode;
	
	var buttom2 = document.createElement('BK');
	buttom2.setAttribute('id','BK');
	buttom2.innerHTML="<a title='開啟程式開始備份自己的訊息' href='http://dl.dropbox.com/u/9578781/PlurkBackup.exe' target='_self'>備份</a>";
	
	bar.appendChild(buttom2);	
	
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);