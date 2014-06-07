// ==UserScript==
// @name           Warez-BB Preview Post
// @author         Daniel.Blaze
// @version        1.0
// @namespace      http://warez-bb.org
// @description    Preview the first post in a topic from ViewForum.php by hovering over the link
// @include        http://www.warez-bb.org/viewforum.php?f=*
// @include        http://warez-bb.org/viewforum.php?f=*
// ==/UserScript==

    //Found from http://snipplr.com/view/14074/get-string-between-a-prefix-string-and-a-suffix-string/
    String.prototype.between = function(prefix, suffix) {
	s = this;
	var i = s.indexOf(prefix);
	if (i >= 0) {
		s = s.substring(i + prefix.length);
	} else {
		return '';
	}
	if (suffix) {
		i = s.indexOf(suffix);
		if (i >= 0) {
			s = s.substring(0, i);
		} else {
			return '';
		}
	}
	return s;
    }
	
    // Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

    // Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

    // Main Script here
    function letsJQuery() {
		
		var load_timeout = undefined;
		var hide_timeout = undefined;
		var imdb_link = '';
		
		//Show Floating Box and Position at Mouse.
		function FloatingBox(e, msg) {
			document.getElementById("DBFloat").style.left = e.pageX + 10;
			document.getElementById("DBFloat").style.top = e.pageY;
			document.getElementById("DBFloat").innerHTML = msg;
		}
		
		function ExtractIMDB(msg) {
			var IMDB = msg.replace(/\&#58;/g, ':').match(/http:\/\/(www\.)?imdb.com\/title\/tt\d{5,8}/gi);
			try {
				if (IMDB[0] !== '') {
					return "<br /><br /><b>IMDB Link:</b> <a href='" + IMDB[0] + "'>" + IMDB[0] + "</a>";
				} else {
					return '';
				}
			} catch(err) {
				return '';
			}
		}
				
		$('div#loading').after('<div id="DBFloat" style="font-family:Verdana, Geneva, sans-serif; font-size:10px; width:400px; height:auto; padding:5px 5px 5px 5px; border:#0CF double; background-color:#FFC; position:absolute; text-align:justify;">&nbsp;</div>');
		$('#DBFloat').hide();
		
		$("#DBFloat").hover(function() {
			if(hide_timeout !== undefined) {
                clearTimeout(hide_timeout);
				hide_timeout = undefined;
        	}
		}, function () {
			$("#DBFloat").hide();
		});
		
		//Add event to topics and grab topic data when mouse is over the link. Cache results for faster loading on second round.
		var i = 0;
		$(".row1").each(function() {
			i = i + 1;
			if (i % 2 == 0) {
				var href = $(this).html().match(/viewtopic.php\?t=[\d\.]+/g);
				$(this).children("a[class='topictitle']").hover(function(e) {
					load_timeout = setTimeout(function() {
						load_timeout = undefined;
						$('#DBFloat').show();
						FloatingBox(e, "<em>Loading</em>...");
						if (preload[href] == undefined) {
							var request = $.ajax({
								dataType: "text",
								cache: true,
								url: "http://www.warez-bb.org/"+href[0],
								type: "GET",
								timeout: 15000,
								success: function(data){	
									var postbody = data.between('<div class="postbody_div">', '</div>').replace(/<\S[^><]*>/g, '');
									var message = postbody.replace(/^\s*|\s*$/g,'').replace(/\&amp;/g, '&').replace(/\&quot;/g, '"').replace(/\&#58;/g, ':').replace(/\n/g,' ').replace(/code:/gi,'').replace(/quote:/gi,'').substring(0, 300).replace(/http:/gi, '<br /> > http:');
									if (postbody.length > 300) {
										message += ' ...';
									} else if (message == "") {
										message = "&nbsp";
									}
									preload[href] = message;
									imdb_link = ExtractIMDB(message);
									FloatingBox(e, message + imdb_link);
								},
								error: function(){
									$('#DBFloat').hide();
								}
							});
						} else {
							imdb_link = ExtractIMDB(preload[href]);
							FloatingBox(e, preload[href] + imdb_link);
						}
					}, 1000);
				}, function() {
					if(load_timeout != undefined) {
                		clearTimeout(load_timeout);
						load_timeout = undefined;
        			}
					hide_timeout = setTimeout(function() {
						hide_timeout = undefined;
						$('#DBFloat').hide();
					}, 250);
				});
			}
		});	
		var preload = new Array(i/2);
	}