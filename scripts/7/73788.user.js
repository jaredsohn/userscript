// ==UserScript==
// @name          helpplz 
// @namespace     http://helpplz.s-nel.com/
// @description   Brings the power of helpplz to deviantart. Instead of navigating to the website, this script places a button right next to the comment form so users can easily access the database.
// @include       http://*.deviantart.com/*
// ==/UserScript==

/*var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);*/
var helpplzUrl = 'http://helpplz.s-nel.com/greasemonkey/index.php?limit=20&lang=en';
$ = unsafeWindow.jQuery;

function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
var numboxes = 0;
GM_wait();

var VERSION = "1.1";
var USERSCRIPT = "http://userscripts.org/scripts/source/73788.user.js"

function letsJQuery() 
{
	if (typeof GM_xmlhttpRequest != 'function') {
		alert('helpplz greasemonkey script not working');
	}
	else
	{	
		$.getJSON("http://helpplz.info/greasemonkey/version.php?callback=?", function(data)
		{
			if(data.version != VERSION)
			{
				$('body').prepend('<div style="padding:5px;position:absolute;background:#F07190;z-index:99999;top:25px;left:5px;width:200px;height:75px;border-top:#FCD7E0 1px solid;border-bottom:#A34E63 1px solid;border-left:#A34E63 1px solid;border-right:#A34E63 1px solid;text-align:center;cursor:default;">Please take a moment to update the helpplz extension.<br><br><a style="cursor:pointer;color:#3693B3;font-size:18pt;" onclick="try{window.location.href = \''+USERSCRIPT+'\';}catch(err){}$(this).parent().hide();">Update</a></div>');
			}
		});
		
		$('#commentbody').attr('onblur', '');
		$('.gmbuttonreply').click(function(){
			addButton(this);
		});	
		var numbers = 0;
		$('.gmbutton2.reply').addClass(function(){
			ret = 'helpplzMenu'+numbers;
			numbers++;
			return ret;
		});
		$('.gmbutton2.reply').click(function(event){
			addButton(this);
		});
		var numcopy = numbers;
		$('.helpplzBtn').click(function(event){
			event.preventDefault();
			event.stopImmediatePropagation();
			event.stopPropagation();
			return helpplzLinkClick(this);
		});
		numbers = numcopy;
		$(".talk-post").append(function(){
			ret = '<div class="helpplzLink" align="right"><a class="emoticons" href="javascript:toggle(\'helpplzMenu'+numbers+'\');">helpplz</a></div><div id="helpplzMenu'+numbers+'" class="helpplzMenu" style="display:none"><iframe class="helpplzIFrame" src="'+helpplzUrl+'"></iframe></div>';
			numbers++;
			return ret;
		});
		$('form.f[action="http://comments.deviantart.com/post"]').append(function(){
			ret = '<div class="helpplzLink" align="right"><a class="emoticons" href="javascript:toggle(\'helpplzMenu'+numbers+'\');">helpplz</a></div><div id="helpplzMenu'+numbers+'" class="helpplzMenu" style="display:none"><iframe class="helpplzIFrame" src="'+helpplzUrl+'"></iframe></div>';
			numbers++;
			return ret;
		});
		$('.gmbuttonlil.gmbuttonreply').addClass(function(){
			ret = 'helpplzMenu'+numbers;
			numbers++;
			return ret;
		});
		$('.gmbuttonlil.gmbuttonreply').click(function(){
			addButtonMessageBox(this);
		});	
		$('body').prepend('<script type="text/javascript">function toggle(id){var vis = document.getElementById(id);vis.style.display = (vis.style.display == \'none\'?\'block\':\'none\');}</script>');
		$('body').prepend('<style type="text/css">.helpplzLink{cursor:pointer;margin-right:10px;height:20px;font-size:8.25pt;}.helpplzIFrame{width:100%;height:350px;border:none;border-top:1px solid #A6B2A6;margin-top:10px}</style>');
	}
}

function addButton(obj)
{
	var helpplzMenu = 'helpplzMenu';
	var classes = getIdentifier(obj, 'class', helpplzMenu);
	if($('#helpplzMenuBtn'+classes).length == 0)
	{
		$(obj).closest('.ccomment.ch.ccomment-activereply').next('.nest').find('.ch-ctrl:first').append('<div class="helpplzLink" align="right"><a class="emoticons" href="javascript:toggle(\'helpplzMenu'+classes+'\');">helpplz</a></div><div id="helpplzMenu'+classes+'" class="helpplzMenu" style="display:none;"><iframe class="helpplzIFrame" src="'+helpplzUrl+'"></iframe></div>');
		$('#helpplzMenuBtn'+classes).click(function(){
			toggle('helpplzMenu'+classes);
		});
	}
}

function addButtonMessageBox(obj)
{
	var helpplzMenu = 'helpplzMenu';
	var classes = getIdentifier(obj, 'class', helpplzMenu);
	if($('#helpplzMenuBtn'+classes).length == 0)
	{
		$(obj).closest('.mcbox.ch.mcbox-full.mcbox-full-comment.mcbox-sel.mcbox-sel-full.mcbox-sel-full-comment').next('.mcbox.mcbox-leech.mcbox-full-reply.ch.mcbox-sel.mcbox-sel-full.mcbox-sel-full-reply').find('.ch-ctrl').append('<div class="helpplzLink" align="right"><a class="emoticons" href="javascript:toggle(\'helpplzMenu'+classes+'\');">helpplz</a></div><div id="helpplzMenu'+classes+'" class="helpplzMenu" style="display:none;"><iframe class="helpplzIFrame" src="'+helpplzUrl+'"></iframe></div>');
		$('#helpplzMenuBtn'+classes).click(function(){
			toggle('helpplzMenu'+classes);
		});
	}
}

function helpplzLinkClick(obj)
{
	var helpplzBtn = 'helpplzMenuBtn';
	var classes = getIdentifier(obj, 'id', helpplzBtn);
	toggle('helpplzMenu'+classes);
	return true;
}

function getIdentifier(obj, type, prefix)
{
	var classes = $(obj).attr(type);
	classes = classes.substring(classes.indexOf(prefix) + prefix.length);
	return classes;
}

function toggle(id)
{
	$('#'+id).toggle();
}
