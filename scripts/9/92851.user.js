// ==UserScript==
// @name            Smile Plurk 
// @include         http://www.plurk.com/*
// @description     Plurk Smiles＋米滷蛋＋兔斯基＋Keroro＋SANA＋食物＋其他（＠2010/12/16）
// modified log:    




// ********** Main Script ***********
var smileData = [];



smileData.push([
	'兔斯基',
	'https://dl.dropbox.com/u/15554604/to/',
	[
	'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif',


        
        ]
]);






smileData.push([
	'其他',
	'https://dl.dropbox.com/u/15554604/fu6/',
	[
'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif',


        ]
]);








smileData.push([
	'米滷蛋',
	'https://dl.dropbox.com/u/15554604/au3/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',

        '11.gif','12.gif','13.gif','14.gif','15.gif','16.gif','17.gif','18.gif','19.gif',

'20.gif','21.gif','22.gif','23.gif','24.gif',

        ]
]);







smileData.push([
	'SANA',
	'https://dl.dropbox.com/u/15554604/sana/',
	[
        '1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif',

        
	]
]);





smileData.push([
	'Keroro',
	'https://dl.dropbox.com/u/15554604/ke/',
	[
'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        


        ]
]);





smileData.push([
	'食物',
	'https:// dl.dropbox.com/u/15554604/g/ ',
	[
'1.gif','2.gif','3.gif','4.gif','5.gif','6.gif','7.gif','8.gif','9.gif','10.gif',
        


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

        // bind key up event
        if(pageState == 'p')
            getById('input_permalink').addEventListener('keyup', replaceSmile, false);
        else
        {
            if (document.getElementById('input_big')) { getById('input_big').addEventListener('keyup', replaceSmile, false); }
            getById('input_small').addEventListener('keyup', replaceSmile, false);
        }

        // create tabs
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


// init
function init()
{
    isinit = true;
    // init contents
    for(var i=0; i<smileData.length; i++)
    {
        addTab(i, smileData[i]);
    }
    // init css
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





// == RE 單鍵轉噗== //
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
				var rp = $('<a href="#" id="RePlurk">轉貼此噗</a>').css('float','right').css('right-padding','4px').click(function(){
					doRePlurk(owner_id,raw,link);


				});

				pp.after(rp);
			}

		}
	}
}


function doRePlurk(owner_id,raw,link){
	var nick = uw.SiteState.getUserById(owner_id).nick_name;

	$('#input_big').val(link + ' ([原噗]) ' + ((nick) ? ( ' by ' + '@' + nick + ': ') : '') + raw);
	p._removeExpand();
	uw.MaxChar.updateBig();
}










// Plurk Translator           翻譯            v1.2    2009.03.21//


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






// Plurker 2 _blank (fixed by Kiss K D) 點ID開新頁//

(function(blank) {
setTimeout(function() {
as = document.getElementsByTagName('a');
for (i = 0; i<as.length; i++) {
if (as[i].className == "name") as[i].setAttribute('target', '_blank');
}
setTimeout(arguments.callee, 1000);
}, 1000);
})();







// == Rich Edit == //

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
		var url = prompt( "Enter the URL:", "" );

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
				desc = prompt( "Enter the Description:", "" );
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









//==JumpTo  噗浪時光機==//

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










// ==Plurk Productivity == //

(function () {
    var win = window;
	if(typeof(unsafeWindow) != 'undefined') win = unsafeWindow;
    
    if(isBlocked())
    {
        block(true);
        return;
    }
    if(!win.$('top_bar')) win.TopBar.init();
    var bar = win.document.getElementById('icon_friends').parentNode.parentNode;
    if(!bar) return;
    var element = win.TopBar.createItem('beproductive', '[封鎖計時器]', function() {
        var to = prompt("請問你想封鎖噗浪幾分鐘呢？\n\n（好讓工作保持專心）","10");
        if(!to) return;
        setBlock(to);
    });
    element.removeChild(element.firstChild); // Remove the image they added.
    bar.appendChild(element);
    
    function isBlocked()
    {
        var time = new Date();
        var until = blockedTo();
        if(time.getTime() > until || !until)
        {
            return false;
        }
        return true;
    }
    
    function blockedTo()
    {
        var cookies = win.document.cookie.split(';');
		for(var i = 0; i < cookies.length; ++i)
		{
			var cookie = cookies[i];
			while(cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
			if(cookie.indexOf("plurk_be_productive=") == 0) // We've got it.
			{
				var time = cookie.substring(20, cookie.length) || false;
                return time;
			}
		}
    }
    
    function setBlock(to)
    {
        to = to*1;
        if(to != to)
        {
            alert("Please enter a number.");
            return;
        }
        var date = new Date();
        to = date.getTime() + (to * 60000);
        date.setTime(to);
        win.document.cookie = 'plurk_be_productive='+to+'; expires='+date.toGMTString()+"; path=/";
        block();
    }
    
    function hidestuff()
    {
        var div = win.document.getElementById('hidden-stuff-node');
        if(!div)
        {
            var div = win.document.createElement('div');
            div.setAttribute('id','hidden-stuff-node');
            div.style.display = 'none';
            win.getBody().appendChild(div);
        }
        var node = win.getBody().firstChild;
        while(node) {
            var nextnode = node.nextSibling;
            if(node != div) div.appendChild(node);
            node = nextnode;
        }
    }
    
    function block(firstrun)
    {
        win.Users.updateTitle = function() {
            document.title = 'Be Productive - Plurk.com';
        }
        win.Users.updateTitle();
        hidestuff();
        win.Poll.showUpdates = function(G) { }; // Disable update notifications.
        if(win.fluid)
        {
            win.fluid.dockBadge = '';
            if(firstrun)
            {
                setTimeout(function() {
                    win.fluid.dockBadge = '';
                    win.Poll.showUpdates = function(G) { };
                }, 1000); // This is to protect against my notification script.
            }
        }
        var note = win.document.createElement('p');
        note.innerHTML = 'You have blocked yourself from Plurk in the name of productivity. Get some work done and come back later.';
        win.getBody().appendChild(note);
        
        // Hide the annoying arrows that won't go away.
        var link = win.document.createElement('link');
        link.setAttribute('href','data:text/css;base64,LmJyb3dzZV9idXR0b24ge3Zpc2liaWxpdHk6IGhpZGRlbiAhaW1wb3J0YW50O307');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('type','text/css');
        win.document.getElementsByTagName('head')[0].appendChild(link);
    }
})();






// ==Plurk Calendar== //


(function (window) {
_time="23:59:59"



function showCalendar(gomonth)
	{
	
	//
	var showdate = document.createElement('script');
	showdate.setAttribute('language','JavaScript');
    showdate.setAttribute('src','http://rein.murmur.in/plurk/showcal_v2.1.js');  
	document.getElementsByTagName('head')[0].appendChild(showdate);    
	var style = document.createElement('link');
    style.setAttribute('href','http://rein.murmur.in/plurk/dark_.css');
    style.setAttribute('rel','stylesheet');
    style.setAttribute('type','text/css');
    document.getElementsByTagName('head')[0].appendChild(style);
	var ftb=document.getElementById('filter_tab')
	var element = document.createElement('li');
	element.setAttribute('id','calswitch');
	element.innerHTML="<a title='show Calendar' onclick='showCal()' href='#' class='off_tab'>Calendar</a>";
	ftb.appendChild(element);
	/*var calbox = document.getElementById('top_login')
	var todaydate=new Date()
	var curmonth=todaydate.getMonth()+1+gomonth //get current month (1-12)
	var curyear=todaydate.getFullYear() //get current year
	var content=buildCal(curmonth ,curyear, "main", "month", "daysofweek", "days", 0);
	var element2 = document.createElement('div');
	element2.setAttribute('id','calendar');
	element2.setAttribute('style','visibility:hidden');
	element2.setAttribute('class','cnight');
	element2.innerHTML=content;
	//element.innerHTML+="<a href='javascript:updateCalendar("+(curmonth+1)+","+curyear+")'>next</a> /<a href='javascript:updateCalendar("+(curmonth-1)+","+curyear+")'>next</a> ";
	calbox.appendChild(element2);*/	
	}

window.addEventListener("load", function(){
	setTimeout(function(){
	if(document.getElementById('filter_tab')!=null){showCalendar(0);}
	},2000);

}, false);

})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);

// ==/UserScript==
