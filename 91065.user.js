// ==UserScript==
// @name           Bangumi ChatRoom inside Bangumi-tan
// @description    Integrate the Bangumi ChatRoom inside Bangumi-tan(小粉红的英文是这么说么……总之就是把聊天室深插入小粉红的身体里啦)
// @author         McFog wxyuan90#gmail.com
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// @version        0.19.1124#final
// ==/UserScript==
function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}


contentEval(function() {

var callUkagaka = function (openMenu){$('#showrobot').html('隐藏春菜 ▼');$("#robot").fadeIn(500);if(openMenu==true){$("#ukagaka_menu").trigger("click");}}


$.mcf = {};
$.mcf.verbose = false;

$.mcf.prompt = function(msg, sec) {
	if(!sec) sec=3;
	var $p = $('#mcf_prompt');
	if($p.size()==0) {
		$p = $('<div id="mcf_prompt" />');
		$p.css({position:'fixed',bottom:0,left:0,'line-height':'30px',height:30,padding:5,'font-size':'14px',background:'silver',opacity:.7}).appendTo($('body'));
		$p.hide();
	}
	$p.html(msg);
	$p.show('normal',function() {clearTimeout($.mcf.prompt.to); $.mcf.prompt.to = setTimeout(function(){$p.hide('slow');}, sec*1000)})
}
$.mcf.update = function() {
	$.get('/dollars', {since_id:$.mcf.update.sinceid, _:(new Date()).getTime()}, $.mcf.update.recData, 'json')
}
$.mcf.update.sinceid = 0;
$.mcf.update.count = 0;
$.mcf.update.extraWait = 0;
$.mcf.data = [];
$.mcf.update.recData = function(data) {
	var next = 4000;
	if(!data || data.length==0) {//nothing new. update slower...
		if($.mcf.update.extraWait < 30000) $.mcf.update.extraWait += 1000;
		next += $.mcf.update.extraWait;
	} else {//new message
		if(callUkagaka) callUkagaka(false);
		for(k in data) $.mcf.data[data[k].id] = data[k];
		$.mcf.$rs.find('*').trigger('bgm_newdata', [data]);
		$.mcf.update.extraWait = 0;
		$.mcf.update.count += data.length;
		data.reverse();
		$.mcf.update.sinceid = data[0].timestamp;
	}
	//$.mcf.parseData(data);

	if($.mcf.verbose) $.mcf.prompt('更新完毕。下次更新: '+(next/1000)+'秒后')
	clearTimeout($.mcf.update.recData.to);
	$.mcf.update.recData.to = setTimeout($.mcf.update, next);
}
/*
$.mcf.parseData = function(data) {
	var $m = $.mcf.$rs, $mm;
	if(data==null) {
		if($m.children().size()==0) {
			$mm = $('<strong>Dollars娘失忆了？！</strong>');
			$mm.click(function() {
				location = '/dollars';
			}).css({cursor:'pointer'});
			$m.html($mm);
		}
		return;
	}
	$mm = $('<div />');
	var d= 0;
	while(d<3 && d<data.length) {
		$.mcf.insertRecord($mm, data[d]);
		d++;
	}

	$mm.append($('<p>以及'+($.mcf.update.count-d)+'条旧消息，现价只要998</p>'));
	$m.html($mm);
}
*/
$.mcf.insertRecord = function($mm, dt) {
	$rec = $('<span />');
	$rec.append($('<span>'+dt.nickname+'</span>').click(function() {
		$.mcf.showBox('@'+dt.nickname+' ');
	}).css({background:dt.color,'font-weight':'bold',color:'white',padding:2,margin:1,cursor:'pointer'}));
	$rec.append(" : ");
	var msg = dt.msg.replace(/((http|https):\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/, function(t) {
			return "<a href='"+t+"'>"+t+"</a>";
	});
	$rec.append(msg).append("<br />");
	if(dt.nickname=='Bangumi娘') {
		$rec.addClass('bgmchat_bgm_tan').css({'font-style':'italic'});
		if($.mcf.hide_btan) $rec.hide();
	}	
	$mm.append($rec);
}

$.mcf.showBox = function(msg) {
	$m = $.mcf.$rs;
	$.mcf.prompt(Math.random()>0.4 ? '按回车发送，按回车取消(咦?)' : '双击发送，双击取消(哈?)');
	var $ta = $.mcf.showBox.$ta;
	if(!$ta) $ta = $.mcf.showBox.$ta = $('<textarea />').width('95%').height('95%');
	$m.after($ta);
	$ta.show().val(msg).focus();
	$ta[0].selectionStart = $ta[0].selectionEnd = $ta.val().length;//无视IE
	var post = function() {
		if($ta.val()=='') return $ta.hide();
		$.ajax({url:'/dollars?ajax=1',type:'POST',data:{message:$ta.val()}, dataType:'json',
			success:function(data) {
				if(data.status!='ok') return;
				$.mcf.prompt("发送成功");
				$.mcf.update();
			},
			complete:function() {
				$ta.hide();
			}
		});
		$ta.val('');
	};
	$ta.keydown(function(ev) {
		if($.mcf.verbose) $.mcf.prompt(ev.keyCode);
		if(ev.keyCode==13) {
			post();
		}
	}).dblclick(post);
}

$.mcf.showLog = function() {
	$m = $.mcf.$rs;
	var $log = $('<div />');
	for(k in $.mcf.data) {
		var dt = $.mcf.data[k];
		$.mcf.insertRecord($log, dt);
	}
	$m.empty().append($log);
	$log.css({'overflow-y':'auto','max-height':'120px','word-wrap':'break-word'}).scrollTop($log.attr('scrollHeight'));
	$log.one('bgm_newdata', $.mcf.showLog);
}

$(function() {
	
	var $rs = $('#robot_speech');
	if($rs.size()>0){
		$rs.after($('<a href="/dollars">[原版]</a>'));
		//$rs.after($('<a>[全部记录]</a>').click($.mcf.showLog).attr({title:'Ctrl+Shift+$'}).css({cursor:'pointer'}));
		$rs.after($('<a>[B娘台词 On]</a>').toggle(function() {
			$(this).text('[B娘台词 Off]');
			$.mcf.$rs.find('.bgmchat_bgm_tan').hide();
			$.mcf.hide_btan = true;
		}, function() {
			$(this).text('[B娘台词 On]');
			$.mcf.$rs.find('.bgmchat_bgm_tan').show();			
			$.mcf.hide_btan = false;
			$.mcf.showLog();//just scroll the log
		}).css({cursor:'pointer'}));

		$rs.after($('<a>[发言]</a>').click(function() {$.mcf.showBox('')}).attr({title:'Alt+Shift+$'}).css({cursor:'pointer'}));
		$.mcf.$rs = $('<div />').insertAfter($rs);
		$rs.after($('<hr />').css({'border-top': '1px dashed #AB515D'}));
		$.mcf.update();
		$.mcf.showLog();
	
	
		$('body').keydown(function(ev) {
			if(ev.keyCode=='52' && ev.shiftKey==1 && ev.altKey==1) {
				$.mcf.showBox('');
				ev.preventDefault();
			}
		});
	}

});



});//end of contentEval