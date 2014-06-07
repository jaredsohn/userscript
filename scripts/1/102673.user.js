// ==UserScript==// @name           Top Comments
// @namespace      topcoms
// @description    Puts top "liked" comments on top, like youtube :)
// @include        http*://*.facebook.com/*
// @exclude        http://www.tunisia-sat.com
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

//@classes		   	".comment_like_button": the number of likes.//@classes		   	".storyContent .commentList";
//@classes			"uiList uiUfi focus_target fbUfi" //comments initial container;
if(unsafeWindow.top != unsafeWindow) return false;
//log to firebug
function log(obj){
	try{
	unsafeWindow.console.log(obj)
	}catch(ex){}
}

//sort array
function sortfunction(a, b){
    if(a<b)return 1
    if(a==b)return 0
    if(a>b)return -1
}

var top_coms_num = GM_getValue('topcomnum',4);
var top_coms_min = GM_getValue('topcommin',3);
var refresh_interval

$(function(){
	addOptions();
	setTimeout(makeTopLikesUp,3000);
	setInterval(makeTopLikesUp,6000);

	$('.topcomoptions').click(function(){
		$(topcomspopup			.replace('top_coms_num',top_coms_num)			.replace('top_coms_min',top_coms_min)		).appendTo('body');		$('.topcomspopup:last').fadeIn();
		$('#navAccount').removeClass("openToggler")
	});
	$('.topcomcancel').live('click',function(){
		$('.topcomdialog').fadeOut();
	});
		$('.topcomsave').live('click',function(){
		var num = $('#topcomnum').val();
		var min = $('#topcommin').val();
		
		num = isNaN(parseInt(num))?GM_getValue('topcomnum',4):parseInt(num);
		min = isNaN(parseInt(min))?GM_getValue('topcommin',3):parseInt(min);
				GM_setValue('topcomnum',num);
		GM_setValue('topcommin',min);				top_coms_num = num;		top_coms_min = min;
		$('.topcomdialog').fadeOut();
	});	$('.removetopcoms').live('click',function(){		$(this).parent().find('li.upped').hide(300,function(){$(this).remove()});	});});

function makeTopLikesUp(){		top_coms_num = GM_getValue('topcomnum',4);	top_coms_min = GM_getValue('topcommin',3);	
	$.each($('.commentList'),function(){
		//get the <li>'s / comments;
		var commentList = this;
		var lis = $(commentList).find('li:not(.upped)');
		if(lis.length < 10) return true;				var stat_elem = $(commentList).parent().parent().find('.uiUfiViewPrevious').find('.stat_elem');		if(stat_elem.length > 0){			var name = stat_elem[0].name;			var name = "next_page[%7B%22offset%22%3A50%2C%22length%22%3A50%2C%22ncomments%22%3A1265%7D]";			ncomments = name.substring(name.indexOf("ncomments")+9).replace("%22%3A","").replace("%7D]","");			name = name.replace(/%7B%22offset%22%3A[0-9]+%2C%22/,"%7B%22offset%22%3A"+ ncomments + "%2C%22")			stat_elem[0].name = name;		}			
		if($(commentList).hasClass('checked')){
			var len = lis.length;
			if($(commentList).hasClass('had'+len)) return true;
			$(commentList).find('.upped').remove();
			log('removed');
		}
		$(commentList).addClass('checked');
		$(commentList).removeClass(function(index,cls){
    		var classes = cls.split(' ');
			var toberemoved = "";
			for(x in classes){
			    if(classes[x].indexOf('had')==0)
			    	toberemoved += classes[x] + " ";
			}
			    return toberemoved
			});
		$(commentList).addClass('had'+lis.length)
		var liked = new Array();
		var coms  = new Array();		
		$.each(lis,function(){
			//get the like button and parse the number of likes :)
			var likeBtn = $(this).find('.comment_like_button');
			if(likeBtn.length == 0) return true;
			var likes = $(likeBtn).text();
			var spaceIdx = likes.indexOf(' ');
			likes = likes.substring(0,spaceIdx);
			//parse the number of likes
			var numLikes = isNaN(parseInt(likes))?0:parseInt(likes);
			liked.push(numLikes);
			coms.push(this);
		});
		//get the [number of top coms] max values indexes of likes;
		var clone = liked.slice(0);
		var maxVals = getMaxVals(clone,top_coms_num);				if (maxVals.length < 1 || maxVals[0]<top_coms_min) {			return true;		}		
		var lastAdded = null;		lastAdded = $(removetopcoms).prependTo(commentList);
		for(k=0;k<maxVals.length;k++){
			var val = maxVals[k];
			if(val<top_coms_min)continue;
			var idx = liked.indexOf(val);			liked[idx] = 0;
			var li = $(coms[idx]).clone().css({backgroundColor:'#DDFFDD'}).addClass('upped');
			$(li).find('.UIImageBlock_Ext').remove();
			//$(li).find('.comment_like_button').parent().attr('class','fsm fwn fcg');
			if(lastAdded == null) 	$(li).prependTo(commentList);
			else					$(li).insertAfter(lastAdded);
			lastAdded = li;
		}	});
}
function addOptions(){
	$(topcomshtml).insertBefore($('#navAccount ul li:last').get(0));}function getMaxVals(likes,num){	var retArr = likes.sort(sortfunction);	if(retArr.length>=num) return retArr.slice(0,num)	else return retArr;}var imageremove = "iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAA\B3RJTUUH2wUMCC4FQ2XanwAAAAd0RVh0QXV0aG9yAKmuzEgAAAAMdEVYdERlc2NyaXB0aW9uABMJ\ISMAAAAKdEVYdENvcHlyaWdodACsD8w6AAAADnRFWHRDcmVhdGlvbiB0aW1lADX3DwkAAAAJdEVY\dFNvZnR3YXJlAF1w/zoAAAALdEVYdERpc2NsYWltZXIAt8C0jwAAAAh0RVh0V2FybmluZwDAG+aH\AAAAB3RFWHRTb3VyY2UA9f+D6wAAAAh0RVh0Q29tbWVudAD2zJa/AAAABnRFWHRUaXRsZQCo7tIn\AAAAh0lEQVQokaXSzxVAMAzA4R8jMQBDOHI1hzW4unYHOoBNOoSL5xGJP5Vjmi9t8ppkdd8BBd/D\p5EQoEgjIQASh2VsS61wywcTL2NbHQol3M9VnDfDrIBSOwdIsrqfjCeeQsLLzVahBk1szfyIrRm1\BnLbF3jXQG7bSSAauWNe3fbb+P09faT1K7NJQKmCsZ7aAAAAAElFTkSuQmCC";var removetopcoms = '\<li class="ufiItem upped removetopcoms">\	<div class="UIImageBlock clearfix">\		<i style="background-position:0 0;background-image:url(data:image/gif;base64,'+ imageremove +')" class="UIImageBlock_Image UIImageBlock_ICON_Image img sp_8begw1 sx_d258d2"></i>\		<a>Remove top comments</a>\	</div>\</li> ';var topcomshtml='<li><a accesskey="91" class="topcomoptions" href="#">Top Comments Options</a></li>';var topcomspopup = '<div style="display:none" class="generic_dialog pop_dialog topcomspopup" tabindex="0" role="alertdialog" aria-labelledby="title_dialog_0" style="">\	<div class="generic_dialog_popup" style="top: 137px; width: 416px;">\		<div class="pop_container_advanced topcomdialog">\			<div id="pop_content" class="pop_content">\				<h2 class="dialog_title" id="title_dialog_0">\					<span>Top Comments Options</span>\				</h2>\				<div class="dialog_content">\					<div class="dialog_body">\						<form onsubmit="return false" method="post">\							<div class="pam uiBoxWhite noborder">\								<div class="pbm"><strong>Top Comments Options</strong> may require refresh to take effect</div>\								<ul class="uiList reportReasonList">\									<li id="report-options" class="uiListItem  uiListVerticalItemBorder">\										<ul class="uiList" style="margin-left: 15px;">\											<li class="mbs uiListItem  uiListVerticalItemBorder">\												<label>How many comments on top ?</label>&nbsp;\												<input onclick="this.select()" type="text" onclick="" id="topcomnum" size="3" style="position: relative; top: 3px; left: 48px;border:1px solid 	#777777;" value="top_coms_num" class="textinput">\											</li>\											<li class="mbs uiListItem  uiListVerticalItemBorder">\												<label>Minimum "likes" to put comment up ?</label>&nbsp;\												<input onclick="this.select()" type="text" onclick="" id="topcommin" size="3" style="position: relative; top: 3px; left: 5px;border:1px solid 	#777777;" value="top_coms_min" class="textinput">\											</li>\										</ul>\									</li>\								</ul>\							</div>\						</form>\					</div>\					<div class="dialog_buttons clearfix">\						<label class="uiButton uiButtonLarge uiButtonConfirm topcomsave"><input type="button" name="submit" value="Submit"></label>\						<label class="uiButton uiButtonLarge topcomcancel "><input type="button" name="cancel" value="Cancel"></label>\					</div>\				</div>\			</div>\		</div>\	</div>\</div>';