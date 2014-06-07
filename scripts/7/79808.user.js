// ==UserScript==
// @name           Plurk Rich Edit TW V1
// @namespace      plurk_rich_edit_tw_gu_v1
// @description    噗浪快用語法中文化
// @include        http://www.plurk.com/*
// @exclude        http://www.plurk.com/_comet/*
// @exclude        http://www.plurk.com/User/*
// @exclude        http://www.plurk.com/i18n/*

// ==/UserScript==
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		window.setTimeout(doRTE, 2000);
	}
}

GM_wait();

// == CONSTANTS == //

var CONTROL_BAR_ITEM_COMMAND = {
	ITALICIZE: 1,
	EMBOLDEN: 2,
	UNDERLINE: 3,
	LINK: 4,
	FLICKR: 5,
	BOT: 6,
}

// == LIFECYCLE == //

var o_Plurks_editPlurk;
var o_Plurks__cancelOnClick;
var o_Plurks__saveOnClick;
var o_Plurks_removeExpand;

var o_Plurks_editPlurk_cb;

doRTE = function(){

	var input_big = $("#input_big")[0];
	if(input_big) {
			new ControlBar( true, true, true, true, true, true).inject(input_big);
	}
	
	var input_permalink = $("#input_permalink")[0];
	if(input_permalink) {
			new ControlBar( true, true, true, true, true, false).inject(input_permalink);
	}
	
	var p = unsafeWindow.Plurks;

	if(p) {
		o_Plurks_editPlurk = p._editPlurk;
		o_Plurks__cancelOnClick = p.__cancelOnClick;
		p.__cancelOnClick = function() {
			if(o_Plurks_editPlurk_cb) o_Plurks_editPlurk_cb.empty();
			o_Plurks__cancelOnClick();
		};
		o_Plurks_removeExpand = p._removeExpand;

		p._removeExpand = function(D) {
			if(o_Plurks_editPlurk_cb) o_Plurks_editPlurk_cb.empty();
			o_Plurks_removeExpand(D);
		};

		$dp = unsafeWindow.$dp;

		$($dp.manager).children('.action').each(function(){
			$(this).unbind('click',p._editPlurk);
			$(this).click(function() {
				o_Plurks_editPlurk();
				o_Plurks_editPlurk_cb = new ControlBar( true, true, true, true, true, false ).inject($dp.ta);
				p.repositonCurrent();
				return false;
			});
		});

		$($dp.saver).children('.cancel').each(function(){
			$(this).unbind('click', o_Plurks__cancelOnClick);
			$(this).click(p.__cancelOnClick);
		});

		if(p.poster) {
			new ControlBar( true, true, true, true, true, false ).inject(p.poster.input);
		}
	}
};

// == CLASSES == //

function ControlBar( showItalic, showBold, showUnderline, showLink, showFlickr, showBot)
{
	this.showItalic = showItalic;
	this.showBold = showBold;
	this.showUnderline = showUnderline;
	this.showLink = showLink;
	this.showFlickr = showFlickr;
	this.showBot = showBot;

	this.inject = function( targetTextArea )
	{
		var controlBar = $("<span></span>").css('padding','1px').css('margin-bottom','1px').css('font-family','Georgia').css('font-size','11px').css('background','#000').css('opacity','0.8').css('-moz-border-radius','4px').css('display','table');

//20100602 修改顯示文字
		if ( showItalic )
		{
			var item = new ControlBarItem( "<i>斜</i>", CONTROL_BAR_ITEM_COMMAND.ITALICIZE, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showBold )
		{
			var item = new ControlBarItem( "<b>粗</b>", CONTROL_BAR_ITEM_COMMAND.EMBOLDEN, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showUnderline )
		{
			var item = new ControlBarItem( "<u>底線</u>", CONTROL_BAR_ITEM_COMMAND.UNDERLINE, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showLink )
		{
			var item = new ControlBarItem( "超連結", CONTROL_BAR_ITEM_COMMAND.LINK, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showFlickr )
		{
			var item = new ControlBarItem( "Flickr相簿", CONTROL_BAR_ITEM_COMMAND.FLICKR, targetTextArea );

			controlBar.append( item.create() );
		}
		
		if( showBot )
		{
      var item = new ControlBarItem( "Plurk機器人", CONTROL_BAR_ITEM_COMMAND.BOT, targetTextArea );
      
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
		link.flickrSearch = this.flickrSearch;
		link.listBot = this.listBot;

		addEvent( link, "click", "execute" );

		return $(link).css('color','#fff').css('padding','4px').css('text-decoration','none');
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
			case CONTROL_BAR_ITEM_COMMAND.FLICKR:
				this.flickrSearch();
				break;
			case CONTROL_BAR_ITEM_COMMAND.BOT:
        this.listBot(e);
				break;
			default:
				throw "Unknown command encountered";
		}

		this.blur();
	}

	this.linkSelection = function()
	{
		var url = prompt( "網址:", "" );

		if (url && url != '' )
		{
			// work around Mozilla Bug #190382
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}
			//We will restore the selection later, so record the current selection.
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;
			var desc = '';
			if(selectionStart == selectionEnd) {
				desc = prompt( "標題:", "" );
			}
			if(!desc) desc = '';

			this.tagSelection( url + ' (', desc + ')' );
		}
	}

	this.flickrSearch = function()
	{
		showFlickrBox(targetTextArea);
	}
	
	this.listBot = function(e)
	{

      showBotBox(e,targetTextArea);
  }

	this.tagSelection = function( tagOpen, tagClose )
	{
		if ( this.targetTextArea.selectionStart || this.targetTextArea.selectionStart == 0 ) //relies on this property.
		{
			//record scroll top to restore it later.
			var scrollTop = this.targetTextArea.scrollTop;

			// work around Mozilla Bug #190382
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}

			//We will restore the selection later, so record the current selection.
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

// == Plurk機器人 List == //
var botBox;
var botWidth = 48;

function BotBox(targetTextArea) {
    this.targetTextArea = targetTextArea;
    this.container;
    this.itemList = new Array();

    this.move = function(e){
      offset = $(e.target).offset();
      this.container.css('top',offset.top - this.container.height()).css('left',offset.left);
    }
    
    this.toggle = function(e){
      if(this.container.css('display') == 'none'){
        this.container.fadeIn();
        this.move(e);
      }else{
        this.container.fadeOut();
      }
    }
    
    this.hide = function(){
      this.container.fadeOut();
    }
    
    this.append = function(item){
       this.itemList[this.itemList.length] = item;
    }
    
    this.create = function(){
      this.container = $('<div></div>').css('display','none').css('position','absolute')
                        .css('overflow','visible').css('border','2px solid #000').css('padding','1px')
                        .css('background','#fff').css('zIndex','999999999').css('color','#000')
                        .css('-moz-border-radius','4px');
      // item
      var size = this.itemList.length;
      var botCountPerRow = Math.sqrt(size);
      if(botCountPerRow > parseInt(botCountPerRow)) {
        botCountPerRow = parseInt(botCountPerRow) + 1;
      }
      this.container.css('width',(botCountPerRow*(botWidth+4+2))+'px');
      for(i=0;i<size;i++) {
        var item = this.itemList[i].create();
        this.container.append(item);
      }
      this.container.height();
      
      $('body').append(this.container);
    }

}

function BotItem(botBox,account,id,avatar,nickname,qualifer,callback) {
  this.botBox = botBox;
  this.account = account;
  this.id = id;
  this.avatar = avatar;
  this.nickname = nickname;
  this.container;
  this.callback = callback;

  this.create = function(){
    if(!this.container) {
      this.container = $('<span></span>').css('display','block').css('float','left')
                      .css('background','#fff').css('color','#000')
                      .css('border','1px solid #888').css('margin','1px').css('padding','1px').css('-moz-border-radius','2px')
                      .css('width',botWidth+'px').css('height',botWidth+'px');

      var avatarImg = $('<div><img src="http://avatars.plurk.com/'+id+'-medium'+avatar+'.gif"/></div>').css('text-align','center').css('width',botWidth+'px').css('height',botWidth+'px');
      this.container.append(avatarImg);

      var info = $('<div></div>')
                .css('width',botWidth+'px').css('height',botWidth+'px')
                .css('font-size','11px').css('text-align','center');
      var header = $('<div></div>').css('margin','0px').css('padding','0px')
                .css('background','#E2560B').css('display','block').css('font-size','11px');
      var link = $('<a href="http://plurk.com/'+account+'" target="_blank">Plurk</a>')
                .css('color','#fff').css('font-family','Ariel').css('font-weight','bold')
                .css('margin','0px').css('padding','0px').css('text-decoration','none');
      var desc = $('<div>'+nickname+'</div>').css('color','#fff').css('line-height','90%')
                 .css('margin-top','3px');
      header.append(link);
      info.append(header);
      info.append(desc);
      link.click(function(){
        botBox.hide();
      });
      desc.click(function(){
        botBox.hide();
        var result = callback();
        if(result && result != '') {
          $(botBox.targetTextArea).val(result);
          if(qualifer && qualifer != '') {
            unsafeWindow.main_poster.menu.updateQualifer(qualifer);
          }
        }
        return false;
      });
      
      this.container.mouseenter(function(){
        $(this).css('background','#000').css('color','#fff').html(info);
      });
      this.container.mouseleave(function(){
        $(this).css('background','#fff').css('color','#000').html(avatarImg);
      });
      
      $('body').append(this.container);
    }
    return this.container;
  }

}

function showBotBox(e,targetTextArea) {
  if(!botBox) {
    botBox = new BotBox(targetTextArea);
    botBox.append(new BotItem(botBox,'song4u','4299622',2,'邦尼妹妹幫你呻吟','',function(){
      var singer = prompt("歌手是?", "");
      if(singer&&singer!=''){
        singer = ' ' + singer;
      }else {
        singer = '';
      }
      var songname = prompt("點播歌曲名稱是?", "");
      if(!songname||songname=='') {
        return;
      }
      return '幫我點播'+singer+' '+songname;
    }));
    botBox.append(new BotItem(botBox,'sheep_knowledge','3902175',4,'羊羊騎貘姿勢佳','asks',function(){
      var question = prompt("發問問題是?", "");
      if(!question || question == '') {
        return;
      }
      return question;
    }));
    botBox.append(new BotItem(botBox,'funkyou','4038751',2,'邦尼阿嬤幫你罵','',function(){
      var who = prompt("你要罵誰?", "");
      return '幫我罵' + who;
    }));
    botBox.append(new BotItem(botBox,'justitrip','3639166',2,'就是愛旅行','',function(){
      var where = prompt("想要去哪玩?", "");
      if(!where || where == '') {
        return;
      }
      return '教我玩' + where;
    }));
    botBox.append(new BotItem(botBox,'mining_tw','4021450',2,'無名挖挖挖','wonders',function(){
      var who = prompt("想挖那個正妹?", "");
      if(!who || who == '') {
        return;
      }
      return who;
    }));
    botBox.append(new BotItem(botBox,'lotteryu','4096250',4,'邦尼樂透幫你套弄','',function(){
      return '給我樂透';
    }));
    botBox.create();
    var src = e.target;
    $('body').click(function(e){
      if(e.target != src) botBox.hide();
    });
  }
  botBox.toggle(e);
}

// == Flickr Serach == //

var frAPIKey = '17f5005ce502a30e727c558a87cb8470';

var frVarWidth = 150;
var frKeyNSID = 'fr_key_nsid';
var frKeyRememberMe = 'fr_key_member_me';

var frBox;
var frResult;
var frCellNum;
var frRowNum;

var frOptUsername;
var frOptKeyword;
var frOptSort;
var frOptRememberMe;

var frSearchURL;

function showFlickrBox(targetTextArea) {

	unsafeWindow.frTargetTA = targetTextArea;

	if(!frBox) {

		frCellNum = parseInt((window.innerWidth - 150) / frVarWidth);
		frRowNum = parseInt((window.innerHeight - 200) / frVarWidth);
		var frBoxWidth = (frCellNum * frVarWidth);

		frBox = $('<div></div>').attr('id','frBox').css('position','absolute').css('overflow','visible').css('width',frBoxWidth + 'px').css('top','20px').css('padding','0px').css('margin','15px').css('left',(1*document.body.clientWidth-frBoxWidth)/2 + 'px').css('display','none').css('border','3px solid #F7861B').css('background','#ffffff').css('zIndex','999999999').css('font-family','Arial,Helvetica,sans-serif').css('-moz-border-radius','8px').css('color','#000');
		$('body').append(frBox);

		// title
		var titlebar = $('<div><span style="color:#0063DC">Flick相簿</span><span style="color:#FF0084">r</span> Search搜尋</div>').css('text-align','center').css('font-size','14px').css('font-weight','bold').css('letter-spacing','2px').css('padding','5px');
		frBox.append(titlebar);

		// option
		var optionbar = $('<div></div>').css('padding','5px').css('background','#fefefe').css('border-top','1px dashed #000');
		frBox.append(optionbar);

		// Flickr Username or Email
		var op1 = $('<span>帳號/電子信箱 : </span>').css('padding','5px');
		op1.append(frOptUsername = $('<input type="text" size="20"/>'));
		optionbar.append(op1);

		// retrieves
		setTimeout(function(){
			var nsid = GM_getValue(frKeyNSID);
			if(nsid) {
				frOptUsername.attr('value',nsid);
			}
		},0);

		// remember me
		var op4 = $('<span>記住帳號 </span>').css('padding','5px');
		op4.append(frOptRememberMe = $('<input type="checkbox"/>'));
		optionbar.append(op4);

		// retrieves
		setTimeout(function(){
			var rememberMe = GM_getValue(frKeyRememberMe);
			if(rememberMe) {
				frOptRememberMe.attr('checked',rememberMe);
			}
		},0);

		optionbar.append('<br>');

		// keyword
		var op2 = $('<span>密碼 : </span>').css('padding','5px');
		op2.append(frOptKeyword = $('<input type="text" size="20"/>'));
		optionbar.append(op2);

		// sort
		var op3 = $('<span>排序 : </span>').css('padding','5px');
		op3.append(frOptSort = $('<select id="frOptSort"></select>').html(
		'<option value="interestingness-desc">依興趣遞減</option>' +
		'<option value="interestingness-asc">依興趣遞增</option>' +
		'<option value="date-posted-asc">依發布日期遞增</option>' +
		'<option value="date-posted-desc">依發布日期遞減</option>' +
		'<option value="date-taken-asc">Date Taken Asc</option>' +
		'<option value="date-taken-desc">Date Taken Desc</option>' +
		'<option value="relevance">relevance</option>'
		));
		optionbar.append(op3);

		var searchbtn;
		optionbar.append(searchbtn = $('<input type="button"/>').attr('value','搜尋'));
		searchbtn.click(function() {
			doFlickrURLAndSearch();
		});

		// result
		frResult = $('<div></div>').css('padding','5px').css('border-top','1px dashed #000').css('text-align','center');
		frBox.append(frResult);

		// close
		var closebar = $('<div></div>').css('text-align','right').css('background','#F7861B');
		var close = $('<span>關閉</span>').css('cursor','point').css('color','#fff').css('background','#F7861B').css('padding','2px').css('font-weight','bold');
		close.click(function() {
			frBox.fadeOut();
		});
		closebar.append(close);
		frBox.append(closebar);
	}

	frBox.fadeIn();

}

function getFlickrURI(method, param) {
	return 'http://api.flickr.com/services/rest/?method=' + method + '&format=json&jsoncallback=?&api_key=' + frAPIKey + '&' + param;
}

function doFlickrURLAndSearch() {

	if(frOptUsername.val() == '') {
		_doFlickrURLAndSearch('');
	}else {
		// by name
		$.getJSON(getFlickrURI('flickr.people.findByUsername','username=' + frOptUsername.val()), function(rsp){
			if(rsp.stat == 'ok') {
				_doFlickrURLAndSearch(rsp.user.nsid);
			}else {
				// by email
				$.getJSON(getFlickrURI('flickr.people.findByEmail','find_email=' + frOptUsername.val()), function(rsp) {
					if(rsp.stat == 'ok') {
						_doFlickrURLAndSearch(rsp.user.nsid);
					}else {
						_doFlickrURLAndSearch(frOptUsername.val());
					}
				});
			}
		});
	}

	// store
	setTimeout(function() {
		var frOptRememberMeisCheck = eval(frOptRememberMe.attr('checked'));
		if(frOptRememberMeisCheck) {
			GM_setValue(frKeyNSID, frOptUsername.attr('value'));
			GM_setValue(frKeyRememberMe, frOptRememberMeisCheck);
		}else {
			GM_setValue(frKeyNSID, '');
			GM_setValue(frKeyRememberMe, false);
		}
	},0);

}

function _doFlickrURLAndSearch(nsid) {

	frSearchURL = getFlickrURI(
		'flickr.photos.search',
		'privacy_filter=1' +
		'&per_page=' + (frCellNum * frRowNum) +
		'&sort=' + $('#frOptSort option:selected')[0].value +
		'&text=' + encodeURIComponent(frOptKeyword.val()) +
		((nsid == '') ? '' : ('&user_id=' + nsid))
		);

	doFlickrSearch();
}

function doFlickrSearch(page) {

	frResult.html('<img src="data:image/gif;base64,R0lGODlhKwALAPEAAP////eGG/rDj/eGGyH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAAKAAEALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQACgACACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkEAAoAAwAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA%3D">');

	setTimeout(function(){
		$.getJSON(frSearchURL + ((page) ? "&page=" + page : ""),function(rsp) {
			generateFlickrResult(rsp);
		});
	}, 500);

}

function generateFlickrResult(rsp) {

	frResult.html('');

	if (rsp.stat != "ok"){
		frResult.html('<b>' + rsp.message + '</b>');
		return;
	}

	if(rsp.photos.total == 0) {
		frResult.html('<b>No Match !</b>');
		return;
	}

	var photo = rsp.photos.photo;

	var table = $('<table></table>').css('width','100%');
	frResult.append(table);

	var tr;

	for(i in photo) {

		if(i % frCellNum == 0) {
			tr = $('<tr></tr>');
			table.append(tr);
		}

		var td = $('<td></td>').css('text-align','center').css('vertical-align','top').css('width',frVarWidth + 'px');
		tr.append(td);
		var p = photo[i];
		var imgUrl = 'http://farm' + p.farm + '.static.flickr.com/' + p.server + '/' + p.id + '_' + p.secret + '_t.jpg';

		var img = $('<img/>').attr('src',imgUrl).css('padding','5px');
		td.append(img);

		var title = $('<div>' + ((p.title.length > 30) ? (p.title.substr(0,30) + '...') : p.title) + '</div>');
		td.append(title);

		var imgLink = 'http://www.flickr.com/photos/' + p.owner + '/' + p.id + '/';
		var append = $('<span><a href="#" style="color:#fff;font-weight:bold;text-decoration:none;" onclick="javascript:frTargetTA.value += \'' + imgLink + ' \';return false;">+</a></span>').css('background','red').css('-moz-border-radius','2px').css('margin-right','5px').css('padding','0px 2px').css('cursor','pointer');
		title.prepend(append);

	}

	var pagebar = $('<div></div>').css('text-align','center').css('padding','5px').css('border-top','1px dashed #000');
	frResult.append(pagebar);

	var prev;
	if(rsp.photos.page > 1) {
		prev = $('<a/>').css('cursor','pointer').css('color','#0063DC');
		prev.click(function(e) {
			doFlickrSearch(rsp.photos.page-1);
		});
	}else {
		prev = $('<span></span>');
	}
	prev.html('&#9668; Prev');
	pagebar.append(prev);

	var pages = $('<span>&nbsp;&nbsp;&nbsp;<span style="color:#FF0084">' + rsp.photos.page + '</span> / ' + rsp.photos.pages + '&nbsp;&nbsp;&nbsp;</span>').css('color','#0063DC');
	pagebar.append(pages);

	var next;
	if(rsp.photos.page < rsp.photos.pages) {
		next = $('<a/>').css('cursor','pointer').css('color','#0063DC');
		next.click(function(e) {
			doFlickrSearch(rsp.photos.page+1);
		});
	}else {
		next = $('<span></span>');
	}
	next.html('Next &#9658;');
	pagebar.append(next);
}

//Delegated event wire-up utitlity. Using this allows you to use the "this" keyword in a delegated function.
function addEvent( target, eventName, handlerName )
{
	target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
}