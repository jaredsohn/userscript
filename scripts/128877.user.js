// ==UserScript==
// @name           4chan LiveStreamer
// @version        12.06.26-1
// @author         Faleij - Edited by Sta1ns
// @description    Turns 4chan boards into live streams
// @changeLog      Updated to work with 4Chan's New HTML and Sticky's
// @updateURL      http://userscripts.org/scripts/source/128877.user.js
// @homepage       http://userscripts.org/scripts/show/128877
// @include        http*://boards.4chan.org/*/
// @exclude        http*://boards.4chan.org/f/
// ==/UserScript==
var $;

    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

	var i = 0;
	var run = true;
	var getPost = function (){
		if(run)
		{
			clearInterval(timer);
			var firstPost = $("form[name=delform]>input:checkbox").attr("name");
			var firstPost2 = $("form[name=delform]>div>input:checkbox").attr("name");
			var firstPostnr = $("form[name=delform]>div:first").attr("name");
			$.get(location, function(data) {
				var pos0 = data.search(/sticky.gif/i);
				if(pos0 != "-1")
					data = data.substr(pos0);
				var pos = data.search(/<div class="thread"[^>]*>/i);
				var data = data.substr(pos);
				var postnum = data.match(/<input\s+[^>]*"([0-9]+)"[^>]*>/i);
				var pos2 = data.search(/<hr[^>]*>/i);
				var newstr = data.substr(0,pos2);
				$("#"+postnum[1]).parent().parent().slideUp('slow', function() {$(this).remove();i--;});
				$("form[name=delform]").prepend($('<div id="' + i + '" class="post" name="'+postnum[1]+'" >' + newstr + '<hr /></div>').hide());
				if(firstPostnr != postnum[1]){
					if(i!=0)
						$("form[name=delform]>div:first").slideDown('slow');
					else
						$("form[name=delform]>div:first").remove();
					$("form[name=delform]>div:not(:first)[name='"+$('form[name=delform]>div#' + i).attr('name')+"']").slideUp('slow', function() {$(this).remove();i--;});
					$("form[name=delform]>table td#"+postnum[1]).parent().parent().slideUp('slow', function() {$(this).remove();i--;});
					i++;					
				}else{
					$("form[name=delform]>div#" + i).remove();
				}
				timer = setInterval(function(){getPost();}, interval);
			});
			if(i > GM_getValue("maxPosts", 15)){
				$("form[name=delform]>.post:last").slideUp('slow', function() {$(this).remove();});
				i--;
			}
		}
	}
	var name, timer;
	var interval = GM_getValue("updateInterval", 1)*1000;
	
	var pause = function (){
		if(run)
		{
			run = false;
			$("span#pause").html("RESUME");
		}else
		{
			run = true;
			$("span#pause").html("PAUSE");
		}
	}
	var gotoscript = function(){
		GM_openInTab('http://userscripts.org/scripts/show/128877');
	}
	var update = function(){
	GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/128877.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						rt=resp.responseText;
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for '+script_name+'.\nWould you like to go to the install page now? (opens in new tab)'))
								{
									$('#4cAupdate').html('An update is available.');
									GM_openInTab('http://userscripts.org/scripts/show/128877');
									GM_setValue('SUC_current_version', remote_version);
									fadeout('#4cAupdate');
								}else{
									$('#4cAupdate').html('An update is available.');
									}
							}else{
								$('#4cAupdate').html('No update is available.');
								fadeout('#4cAupdate');
							}
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');

					}
				});
	}
	
	
	function resize() { //Quick and dirty needs to be fixed
		$("#header").css({left:(($(window).width()/3)*1)+"px", width:(($(window).width()/3)*2-5)+"px"});
	}
	window.addEventListener("resize", resize, false);

	
	var fadeout = function(omg){
		$(omg).fadeOut(5000);
	}
	
    function letsJQuery() {
		$("#header").removeClass('header');
		if(GM_getValue("banner", false) == false)
		{
			$("#header").after('');
			$("#footer").after('');
		}
		$("#header").css({zIndex: "100",position: "fixed",top:"0px", left:(($(window).width()/3)*1)+"px", width:(($(window).width()/3)*2-5)+"px",right:'0px', padding:'5px'});
		$("#header").css({'background-color': 'rgba(200,200, 200, 0.7)'});
		$(".postarea").after("<hr><div style='font-family:Myriad Pro;top:0;left:0;width:100%;position:fixed;zIndex:1;text-shadow:rgba(0,0, 0, 0.4) 0px 0px 3px;'><b><span style='color:rgba(0,0, 0, 0.1);font-size:2em;'>4chan LiveStreamer</span><span style='font-family:Myriad Pro;background-color:#fff;cursor:pointer;cursor:hand;color:rgba(0,0, 0, 0.5);opacity:.5;margin-right:10px' id='pause'>PAUSE</span></b></div>");
		$("span#pause").bind("click", pause);
		$("#4cAupdate").bind("click", update);
		getPost();
    }
	
	
	setmaxnumthreads = function ( str ) {
			var str = prompt( "Enter max number of updated threads to display:", GM_getValue("maxPosts", 15));

		var extractID = /(\d+)[^\d]*$/gi.exec( str )[1];
		if( !extractID ) {
			return false;
		}
		$("#4cAupdate").html("Max number of threads are now " + (extractID++));
		$("#4cAupdate").fadeIn(3000, function(){var timer2 = setInterval(function(){$("#4cAupdate").fadeOut(3000);}, 3000);});
		GM_setValue("maxPosts", extractID++);
		return true;
	}
	
	setupdate = function ( str ) {
		var str = prompt( "Enter new update interval in seconds:", GM_getValue("updateInterval", 1));
	$("#4cAupdate").html("New update interval set at " + str + " seconds");
	$("#4cAupdate").fadeIn(3000, function(){var timer2 = setInterval(function(){$("#4cAupdate").fadeOut(3000);}, 3000);});
	GM_setValue("updateInterval", str);
	interval = str*1000;
	return true;
	}

	largeimg = function ( str ) {
		if(thumbs)
		{
			$("#4cAupdate").html("Load full images disabled");
			GM_setValue("originalImg", false);
		}
		else
		{
			$("#4cAupdate").html("Load full images enabled");
			GM_setValue("originalImg", true);
		}
		$("#4cAupdate").fadeIn(3000, function(){var timer2 = setInterval(function(){$("#4cAupdate").fadeOut(3000);}, 3000);});
		thumbs = GM_getValue("originalImg", false);
	return true;
	}
	GM_registerMenuCommand( "Set update interval : " + GM_getValue("updateInterval", 1) + " s", setupdate, "", "", "" );
	GM_registerMenuCommand( "Set max number of threads to display : " + GM_getValue("maxPosts", 15), setmaxnumthreads, "", "", "" );
//	GM_registerMenuCommand( "Load original image : " + GM_getValue("originalImg", false), largeimg, "", "", "" );