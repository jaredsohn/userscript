// ==UserScript==
// @name       Zwijanie / rozwijanie wątków w komentarzach pod znaleziskami
// @version    0.3
// @description 
// @updateURL  http://userscripts.org/scripts/source/287782.user.js
// @match      http://wykop.pl/*
// @match      http://www.wykop.pl/*
// @copyright  2014, Michał Krawczak
// ==/UserScript==

function main()
{
	if(!("_mk" in window))
	{
		window._mk = {};
	}

	_mk.comment_visible = {};
	_mk.localStorageActive = ("localStorage" in window) && localStorage != null;

	_mk.toggle_comment = function(comment_id)
	{
		var comment = $("li.comment[data-id="+comment_id+"]");
		var subcomments = $("li.comment[data-id!="+comment_id+"][data-r="+comment_id+"]");
		var comment_header = comment.find("header");
		var breaklist = comment.find("ul.breaklist");
		var comment_content = comment.children().first().children().not("header").not("a.show-comment.toggle-comment").not("ul.breaklist");
		var avatar = comment.find("span.block>img.brc8");
		var avatar_container = avatar.parent().parent();
		var hide_button = comment.find(".commnent-hide-button");
		if(_mk.comment_visible[comment_id])
		{
			_mk.comment_visible[comment_id] = false;
			if(_mk.localStorageActive)
			{
				localStorage["comment-visible-" + comment_id] = false;
			}
			comment.animate({"padding-bottom": "0px", "margin-bottom": "-8px"}, 'slow');
			subcomments.hide('slow');
			comment_content.hide('slow');
			breaklist.css({position: "fixed", bottom:"-500px", right: "-500px"});
			comment_header.animate({opacity: "0.5"}, 'slow');
			avatar.animate({height: "20px", width: "20px"}, 'slow');
			avatar_container.animate({"margin-left": "20px"}, 'slow');
			hide_button.html("(rozwiń)");
		}
		else
		{
			_mk.comment_visible[comment_id] = true;
			if(_mk.localStorageActive)
			{
				localStorage["comment-visible-" + comment_id] = true;
			}
			comment.animate({"padding-bottom": "20px", "margin-bottom": "0px"}, 'slow');
			subcomments.show('slow');
			comment_content.show('slow');
			breaklist.css({position: "absolute", bottom:"0px", right: "0px"})
			comment_header.animate({opacity: "1"}, 'slow');
			avatar.animate({height: "40px", width: "40px"}, 'slow');
			avatar_container.animate({"margin-left": "0px"}, 'slow');
			hide_button.html("(zwiń)");
		}
	}

	_mk.hide_all_comments = function()
	{
		for(i in _mk.comment_visible)
		{
			if(_mk.comment_visible[i])
			{
				_mk.toggle_comment(i);
			}
		}
	}

	_mk.show_all_comments = function()
	{
		for(i in _mk.comment_visible)
		{
			if(!_mk.comment_visible[i])
			{
				_mk.toggle_comment(i);
			}
		}
	}

	_mk.init = function()
	{
		var heading = $("div.brbottbd > h3.xx-large.lheight20:contains(\"Komentarze\")");
		var heading_span = $("<span>");
		heading_span.append("(").append($("<a>zwiń</a>").click(_mk.hide_all_comments)).append(" / ").append($("<a>rozwiń</a>").click(_mk.show_all_comments)).append(" wszystko)").css("margin-left", "10px");
		heading.after(heading_span);
		heading.css("display", "inline")
		
		$.expr[':'].attrEqual = function(obj, index, meta, stack) {
		  var attrs = meta[3].split(" ");
		  return $(obj).attr(attrs[1]) == $(obj).attr(attrs[0]);
		};

		var top_lev_comments = $('li.comment:attrEqual(data-r data-id)');
		top_lev_comments.each(function()
		{
			var comment_id = $(this).attr("data-id");
			_mk.comment_visible[comment_id] = true;
			if(_mk.localStorageActive)
			{ 
				if(!(("comment-visible-" + comment_id) in localStorage))
				{
					localStorage["comment-visible-" + comment_id] = true;
				}
				else if(localStorage["comment-visible-" + comment_id] === "false" || localStorage["comment-visible-" + comment_id] === false)
				{
					_mk.toggle_comment(comment_id);
				}
			}
			var plus_box = $(this).find("span.votes");
			var hide_button = $('<span class="commnent-hide-button">(zwiń)</span>').css("margin-right", "4px").click(function(){ _mk.toggle_comment(comment_id); });
			plus_box.prepend(hide_button);
		});
	};

	_mk.init();
}


if (typeof $ == 'undefined') {
    if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
        // Firefox
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        // Chrome
        addJQuery(main);
    }
} else {
    // Opera
    main();
}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")()";
    document.body.appendChild(script);
}