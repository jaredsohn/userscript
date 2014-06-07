// ==UserScript==
// @name           Plurk Smile (低調 3.7 主程式)
// @namespace      程式原始作者 Uchari，Modified by M.
// @description    主程式 含 Koloboks ICQ Style
// @version        
// @license        
// @include        http://www.plurk.com/*
// ==/UserScript==


var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="洋蔥頭" href="http://ch5188.com/smilies/onion/">001.gif,002.gif,003.gif,004.gif,005.gif,006.gif,007.gif,008.gif,009.gif,010.gif,011.gif,012.gif,013.gif,014.gif,015.gif,016.gif,017.gif,018.gif,019.gif,020.gif,021.gif,022.gif,023.gif,024.gif,025.gif,026.gif,027.gif,028.gif,029.gif,030.gif,031.gif,032.gif,033.gif,034.gif,035.gif,036.gif,037.gif,038.gif,039.gif,040.gif,041.gif,042.gif,043.gif,044.gif,045.gif,046.gif,047.gif,048.gif,049.gif,050.gif,051.gif,052.gif,053.gif,054.gif,055.gif,056.gif,057.gif,058.gif,059.gif,060.gif,106.gif,107.gif,061.gif,062.gif,063.gif,064.gif,065.gif,066.gif,067.gif,068.gif,069.gif,070.gif,071.gif,072.gif,073.gif,074.gif,075.gif,076.gif,077.gif,078.gif,079.gif,080.gif,081.gif,082.gif,083.gif,084.gif,085.gif,086.gif,087.gif,088.gif,089.gif,090.gif,091.gif,092.gif,093.gif,094.gif,095.gif,096.gif,097.gif,098.gif,099.gif,100.gif,101.gif,102.gif,103.gif,104.gif,105.gif,106.gif,107.gif,108.gif,109.gif,110.gif,111.gif,112.gif,113.gif,114.gif,115.gif,116.gif,117.gif,118.gif,119.gif,120.gif,121.gif,122.gif</a>';
smilies += '<a title="Koloboks ICQ Style" href="http://www.en.kolobok.us/smiles/icq/">air_kiss.gif,bad.gif,biggrin.gif,blum1.gif,blush.gif,bomb.gif,bye2.gif,cool.gif,cray.gif,crazy.gif,dance.gif,diablo.gif,drinks.gif,gamer.gif,girl_angel.gif,give_heart.gif,give_rose.gif,good.gif,hang1.gif,hi.gif,ireful.gif,i_am_so_happy.gif,kiss.gif,kiss3.gif,lol.gif,mad.gif,man_in_love.gif,mocking.gif,music.gif,nea.gif,pardon.gif,rofl.gif,sad.gif,scratch_one-s_head.gif,shok.gif,shout.gif,smile.gif,sorry.gif,unknown.gif,wacko1.gif,wink.gif,yahoo.gif,yes.gif</a>';

/* Smilies definition ends ====================== */


/* Initialize */
var smilies_holder = document.createElement('div');
smilies_holder.id = 'smilies_holder';
smilies_holder.style.display = 'none';

if (!document.getElementById('smilies_holder')) {
  document.documentElement.appendChild(smilies_holder);
} 
smilies_holder = document.getElementById('smilies_holder');

/* Put the smilies holder */
var container = document.createElement('p')
container.innerHTML = smilies;
smilies_holder.appendChild(container);



var isGreasemonkey = false;
var isLoaded = false;
var isInjected = false;
var wait = 0;
var smilies_data = [];
var target_obj = null;

function init() {
  /* Check if we are in Greasemonkey / GM Compiler (other userscript approach doesn't support GM_-series) */
  if (typeof GM_getValue == 'function') { isGreasemonkey = true; }
  
  document.addEventListener('DOMNodeInserted', watchDom, false);
  window.addEventListener('load', receiveSmilies, false);
}

function receiveSmilies() {
  /* Collect smilies data from Userscript */
  var smilies_dom = document.getElementById('smilies_holder').getElementsByTagName('a');
  for (var i = 0; i < smilies_dom.length; i++) {
    smilies_data.push({title: smilies_dom[i].title, prefix: smilies_dom[i].href, images: smilies_dom[i].textContent.split(',')});
  }
  /* XXX: getElementsByClassName support? */
  var smily_holders = document.getElementsByClassName('smily_holder');
  for (var i = 0; i < smily_holders.length; i++) {
    smily_holders[i].addEventListener('click', function(e) {
      /* Determine the right place */
      if(document.getElementById('input_permalink')) { target_obj = document.getElementById('input_permalink'); }
      else if (this.parentNode.parentNode.parentNode.parentNode.id != 'main_poster') { target_obj = document.getElementById('input_small'); }
      else if (document.getElementById('input_big')) { target_obj = document.getElementById('input_big'); }
    }, false);
  }
  isLoaded = true;

}

function watchDom(e) {
  if (e.target && e.target.id && e.target.id === 'emoticon_selecter') {
    isInjected = true;
    /* Use setTimeout to speed up a little */
    window.setTimeout(waitLoaded, 5);
    document.removeEventListener('DOMNodeInserted', watchDom, false);
  }
};

/* Avoid injectTabs before loaded */
function waitLoaded() {
  if (wait == 10) {
    return;
  }
  if (isLoaded) {
     window.setTimeout(injectTabs, 5);
     return;
  }
  wait++;
  window.setTimeout(waitLoaded, 300);
}

function injectTabs() {
  if (!isLoaded) {alert('bad!')}
  /* Set CSS */
  document.getElementById('emoticons_show').style.width = '100%';
  document.getElementById('emoticons_show').style.maxHeight = '200px';
  document.getElementById('emoticons_show').style.overflow = 'auto';
  var tabs = smilies_data.length;
  /* Avoid overflow */
  if (tabs > 6) {
    document.getElementById('emoticons_tabs').firstChild.style.height = (20 * Math.ceil(tabs / 6)).toString()+'px';
  }

  var li = document.createElement('li');
  li.className = 'emoticon_selecter';

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < smilies_data.length; i++) {
    var test = li.cloneNode(false);
    test.id = 'plurksunny-tabs-'+i;
    /* XXX: HTML entitles */
    test.innerHTML = '<a href="#">'+smilies_data[i].title+'</a>';
    test.addEventListener('click', makeTabListener(i), false);
    fragment.appendChild(test);
  }
  document.getElementById('emoticons_tabs').firstChild.appendChild(fragment);
};

function makeTabListener(id)
{
  return function(e) { switchTab(id); e.preventDefault();};
}

function switchTab(id) {
  /* Unset old, set new */
  var tabs = document.getElementById('emoticons_tabs').getElementsByTagName('li');
  for (var i = 0; i < tabs.length; i++) {
    if (tabs[i].className.indexOf('current') != 1) {
      tabs[i].className = 'emoticon_selecter';
    }
    if (tabs[i].id == 'plurksunny-tabs-'+id) {
      tabs[i].className = 'emoticon_selector current';
    }
  }
  var div = document.createElement('div');
  var html = '<table><tbody>'+"\n"+'<tr>';
  for (var i = 0; i < smilies_data[id].images.length; i++ ) {
    html += '<td><a href="#"><img width="35" src="'+smilies_data[id].prefix+smilies_data[id].images[i]+'"></a></td>';
    if (i % 8 == 7 && i < smilies_data[id].images.length - 1) { html += '</tr>'+"\n"+'<tr>'; }
  }
  html += '</tr></tbody></table>';
  div.innerHTML = html;
  document.getElementById('emoticons_show').removeChild(document.getElementById('emoticons_show').firstChild);
  document.getElementById('emoticons_show').appendChild(div);
  
  /* Handle the emoticons insertion */
  var images = document.getElementById('emoticons_show').getElementsByTagName('img');
  for (var i = 0; i < images.length; i++ ) {
    images[i].addEventListener('click', function() {
      /* Set the selection */
      if (typeof target_obj.selectionStart != 'undefined') {
        var start = target_obj.selectionStart;
        var end = target_obj.selectionEnd;
        target_obj.value = target_obj.value.substring(0, start) + this.src + ' ' + target_obj.value.substring(end);
        var p = end + this.src.length + 1;
        target_obj.setSelectionRange(p, p);
      }
    }, false);
  }
}

/* Go ahead */
init();









//== RE ==//
var GM_JQ = document.createElement('script');
GM_JQ.src = '';
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
var p = uw.Plurks;
var o_expand;

if(p) {
	o_expand = p.expand;
	p.expand = function(div) {
		o_expand(div);

		var ib = $('#input_big').get(0);

		if(ib) {

			var plurk = uw.getPD(div).obj;
			var link = 'http://plurk.com/p/' + (plurk.plurk_id).toString(36);
			var raw = plurk.content_raw;
			var owner_id = plurk.owner_id;

			var info_box = $(uw.$dp.info_box);
			var pp = info_box.children(".perma_link");

			if(info_box.children("#RePlurk").length == 0) {
				var rp = $('<a href="#" id="RePlurk">轉貼此噗</a>').css('float','right').css('right-padding','3px').click(function(){
					doRePlurk(owner_id,raw,link);
				});

				pp.after(rp);
			}

		}
	}
}


function doRePlurk(owner_id,raw,link){
	var nick = uw.SiteState.getUserById(owner_id).nick_name;

	$('#input_big').val(link + ' ([Re此噗]) ' + ((nick) ? ( ' by ' + '@' + nick + ': ') : '') + raw);
	p._removeExpand();
	uw.MaxChar.updateBig();
}




//==JumpTo==//

var to= "";

(function (window) {
    var date0 = new Date();

    if(!window.$('top_bar')) window.TopBar.init();
    var bar = window.document.getElementById('icon_friends').parentNode.parentNode;
    if(!bar) return;
    var element = window.TopBar.createItem('JumpTo', '[噗浪時光機]', function() {
        if(to=="")
            to= date0.getFullYear()+"/"+(date0.getMonth()+1)+"/"+date0.getDate()+" "+date0.getHours()+":"+date0.getMinutes()+":"+date0.getSeconds(); 
			to = prompt("跳躍至- 西元年份/月/日 時:分:秒 ", to);
        if(!to) return;
	var _date = to.split(' ')[0];
	var _time = to.split(' ')[1];
	var _year = _date.split('/')[0];
	//if no _month,get now Month .
	var _month= (_date.split('/')[1]) ? _date.split('/')[1] : date0.getMonth()+1;
	//if no _day, get now Date .
	var _day  = (_date.split('/')[2]) ? _date.split('/')[2] : date0.getDate();
	// if no _time,make _time=23:59:59 .
	to = _year+"/"+_month+"/"+_day+" "+((_time) ? _time : "23:59:59");
	// call Plurk TimeLine function.
	window.TimeLine.reset();
	window.TimeLine.offset = new Date(to);
	window.TimeLine.showLoading();
	window.TimeLine.getPlurks();
    });
    element.removeChild(element.firstChild);
    bar.appendChild(element);
	
})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);



//== Rich Edit ==//
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
}

// == LIFECYCLE == //

var o_Plurks_editPlurk;
var o_Plurks__cancelOnClick;
var o_Plurks__saveOnClick;
var o_Plurks_removeExpand;

var o_Plurks_editPlurk_cb;

doRTE = function(){
	var taids = ["input_big", "input_permalink"];

	for(i=0;i<taids.length;i++) {
		var t = $("#" + taids[i])[0];
		if(t) {
			new ControlBar( true, true, true, true, true ).inject(t);
		}
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

		$($dp.man).children('.action').each(function(){
			$(this).unbind('click',p._editPlurk);
			$(this).click(function() {
				o_Plurks_editPlurk();
				o_Plurks_editPlurk_cb = new ControlBar( true, true, true, true, true ).inject($dp.ta);
				p.repositonCurrent();
				return false;
			});
		});

		$($dp.saver).children('.cancel').each(function(){
			$(this).unbind('click', o_Plurks__cancelOnClick);
			$(this).click(p.__cancelOnClick);
		});

		if(p.poster) {
			new ControlBar( true, true, true, true, true ).inject(p.poster.input);
		}
	}
};

// == CLASSES == //

function ControlBar( showItalic, showBold, showUnderline, showLink, showFlickr)
{
	this.showItalic = showItalic;
	this.showBold = showBold;
	this.showUnderline = showUnderline;
	this.showLink = showLink;
	this.showFlickr = showFlickr;

	this.inject = function( targetTextArea )
	{
		var controlBar = $("<span></span>").css('padding','1px').css('margin-bottom','1px').css('font-size','11px').css('background','#000').css('opacity','0.75').css('-moz-border-radius','4px').css('display','table');

		if ( showItalic )
		{
			var item = new ControlBarItem( "<i>斜體</i>", CONTROL_BAR_ITEM_COMMAND.ITALICIZE, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showBold )
		{
			var item = new ControlBarItem( "<b>粗體</b>", CONTROL_BAR_ITEM_COMMAND.EMBOLDEN, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showUnderline )
		{
			var item = new ControlBarItem( "<u>底線</u>", CONTROL_BAR_ITEM_COMMAND.UNDERLINE, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showLink )
		{
			var item = new ControlBarItem( "連結", CONTROL_BAR_ITEM_COMMAND.LINK, targetTextArea );

			controlBar.append( item.create() );
		}

		if ( showFlickr )
		{
			var item = new ControlBarItem( "Flickr", CONTROL_BAR_ITEM_COMMAND.FLICKR, targetTextArea );

			controlBar.append( item.create() );
		}
		

		
		$(targetTextArea).before( controlBar);

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
				
				
			default:
				throw "Unknown command encountered";
		}

		this.blur();
	}

	this.linkSelection = function()
	{
		var url = prompt( "請輸入連結網址:", "" );

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
				desc = prompt( "輸入想顯示的文字:", "" );
			}
			if(!desc) desc = '';

			this.tagSelection( url + ' (', desc + ')' );
		}
	}


	
	
	this.flickrSearch = function()
	{
		showFlickrBox(targetTextArea);
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
		var titlebar = $('<div><span style="color:#0063DC">Flick</span><span style="color:#FF0084">r</span> Search</div>').css('text-align','center').css('font-size','14px').css('font-weight','bold').css('letter-spacing','2px').css('padding','5px');
		frBox.append(titlebar);

		// option
		var optionbar = $('<div></div>').css('padding','5px').css('background','#fefefe').css('border-top','1px dashed #000');
		frBox.append(optionbar);

		// Flickr Username or Email
		var op1 = $('<span>NSID/Username/Email : </span>').css('padding','5px');
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
		var op4 = $('<span>Remember Account </span>').css('padding','5px');
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
		var op2 = $('<span>Keyword : </span>').css('padding','5px');
		op2.append(frOptKeyword = $('<input type="text" size="20"/>'));
		optionbar.append(op2);

		// sort
		var op3 = $('<span>Sort : </span>').css('padding','5px');
		op3.append(frOptSort = $('<select id="frOptSort"></select>').html(
		'<option value="interestingness-desc">Interestingness Desc</option>' +
		'<option value="interestingness-asc">Interestingness Asc</option>' +
		'<option value="date-posted-asc">Date Posted Asc</option>' +
		'<option value="date-posted-desc">Date Posted Desc</option>' +
		'<option value="date-taken-asc">Date Taken Asc</option>' +
		'<option value="date-taken-desc">Date Taken Desc</option>' +
		'<option value="relevance">relevance</option>'
		));
		optionbar.append(op3);

		var searchbtn;
		optionbar.append(searchbtn = $('<input type="button"/>').attr('value','Go'));
		searchbtn.click(function() {
			doFlickrURLAndSearch();
		});

		// result
		frResult = $('<div></div>').css('padding','5px').css('border-top','1px dashed #000').css('text-align','center');
		frBox.append(frResult);

		// close
		var closebar = $('<div></div>').css('text-align','right').css('background','#F7861B');
		var close = $('<span>Close</span>').css('cursor','point').css('color','#fff').css('background','#F7861B').css('padding','2px').css('font-weight','bold');
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








// Plurk Translator                       v1.2    2009.03.21//


(function( ) {

function xpath(query) {
    var elems = document.evaluate(query, document, null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var ret = []
    for (var i = 0; i < elems.snapshotLength; i++) {
        ret.push(elems.snapshotItem(i));
    }
    return ret;
}

function xpath_map(query, fn) {
    var elements = xpath(query);
    for (var i = 0; i < elements.length; i++) {
        fn(elements[i]);
    }
}

function translate(str, lang, callback) {
    url = 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=' +
          escape(str) + '&langpair=%7Czh-TW';
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
            Referer: document.location
        },
        onload: function(response) {
            callback(eval('(' + response.responseText + ')'));
        }
    });
}

function translate_plurk(text_holder) {
    txt = text_holder.innerHTML;
    translate(txt, 'en', function (response) {
        text_holder.innerHTML = response.responseData.translatedText;
    });
}

function translate_responses() {
    xpath_map("//div[@class='list']//*//div[@class='text_holder']",
        function(text_holder) {
            translate_plurk(text_holder);
        });
}

function create_translate_link(text_holder) {
    var div = document.createElement('div');
    div.style.textAlign='right';
    div.className = 'translate';
    var a = document.createElement('a');
    a.innerHTML = "&#9658";
    a.addEventListener('click', function(evt) {
            translate_plurk(text_holder);
            translate_responses();
            evt.stopPropagation();
    }, false);
    div.appendChild(a);
    text_holder.parentNode.insertBefore(div, text_holder.nextSibling);
}

function has_parent(elem, name, cls) {
    while (elem.parentNode) {
        if (elem.parentNode.tagName == name.toUpperCase() &&
            elem.parentNode.className == cls)
        {
            return true;
        }
        elem = elem.parentNode;
    }
    return false;
}

setInterval(function () {
    xpath_map("//div[contains(@class, 'text_holder')]",
        function(text_holder) {
            if (text_holder.nextSibling &&
                text_holder.nextSibling.className == "translate")
            {
                return;
            }
            if (has_parent(text_holder, 'div', 'plurk_box')) {
                return;
            }
            
            create_translate_link(text_holder);
            
    });
}, 500);

})();

// Plurkmark This!//

window.setInterval(
	function(){
		permalink_container = document.evaluate('//*[@class="perma_link"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		permalink = document.evaluate('//*[@class="perma_link"]/a[@href]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		plurkmarkthis = document.evaluate('//*[@id="plurkmarkThis"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
		if(permalink != null && permalink_container != null){
			GM_log("Creating link");
			if(plurkmarkthis.singleNodeValue != null){
				permalink_container.singleNodeValue.removeChild(plurkmarkthis.singleNodeValue);
			}
			var plurkmark = document.createElement('a');
			plurkmark.innerHTML = "paste";
			plurkmark.setAttribute('id','plurkmarkThis');
			plurkmark.setAttribute('href', "http://paste.plurk.com/");
			plurkmark.setAttribute('target','_blank');
			plurkmark.setAttribute('style','position:absolute;left:4px;');
                        
                          
			permalink_container.singleNodeValue.appendChild(plurkmark);
		}
	},
	5000
);
