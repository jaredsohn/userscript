// ==UserScript==
// @name           Balloon Juice Troll-B-Gone
// @version        1.3.1
// @namespace      http://fishbulb.net
// @description    Troll Eliminator based on Cleek's Pie Filter
// @include        http://balloon-juice.com/*
// @include        http://www.balloon-juice.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

function Troll_B_Gone() {
    function trollText(name) {
        return "<span class='trollblock' style='color: #cccccc; font-style: italic;'>trolling by " + name + "</span>"
    }

    function trollReplyText(from,to) {
        return "<span class='trollblock' style='color: #cccccc; font-style: italic;'>reply from " + from + " to trolling by " + to + "</span>"
    }

    var trollListKey = "TrollList_BJ"

    var TROLLS = {}

    function main() {
        loadTrolls()
        replaceText()
    }

    // ================================================================

    function trim(s) {
        return s.replace(/^\s+|\s+$/g,"")
    }

    function isTroll(name) {
        return TROLLS[name.toLowerCase()]
    }

    function getCommenterName(commenter) {
		return trim($(commenter).text()) || "-=-unknown-=-"
    }

    function replaceText()
    {
        $("li[id|='comment']").each( function(idx) {
	    var commenter = $('cite.fn', this)
	    var troll = null
	    var name = getCommenterName(commenter)
            if (isTroll(name)) {
                hideTrollComment($(this), trollText(name))
                addUnblockLink($(this), name)
            }
            else if (troll = replyToTroll(this)) {
                hideTrollComment($(this), trollReplyText(name, troll))
                addUnblockLink($(this), troll)
            }
            else {
                addBlockLink($(this), name)
            }
        })
    }

    function replyToTroll(comment)
    {
        var backLinks = $(comment).find('a[href*="#comment"]')
        try {
            backLinks.each(function (idx) {
				var op = $(this).text()
				if (isTroll(op)) throw {'name': op}
            });
        }
        catch (troll) {
			return troll.name
        }
    }

    function hideTrollComment(comment, headertext) {
        var head = $("<div class='troll-header'>" + headertext + "</div>")
        var body = $("<div class='troll-body'></div>")
        $(comment).children().each(function(){body.append($(this))});
        $(comment).append(head)
        $(comment).append(body)
        body.slideToggle()
        head.click(function(){body.slideToggle()})
        head.css('cursor', 'pointer')
    }

    function addUnblockLink(comment,name) {
        var link = $("<a href='javascript:void(0)' class='unblock-troll-link'>unblock</a>")
        link.click(function(){doRemoveTroll(name)})
        var block = comment.find('.trollblock')
        block.append('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
        block.append(link)
        link.hide()
        comment.hover(function(){link.show()}, function(){link.hide()})
    }

    function addBlockLink(comment,name) {
        var link = $("<a href='javascript:void(0)' class='block-troll-link'>block</a>")
        link.click(function(){doAddTroll(name)})
        // var info = $("p > span.comment-info", comment)
        var info = $(".commentmetadata", comment)
        
        info.prepend('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
        info.prepend(link)
        link.hide()
        comment.hover(function(){link.show()}, function(){link.hide()})
    }

    function _getPersistent(key, def) {
        if (typeof localStorage == "undefined")
            return GM_getValue(key,def)

        var v = localStorage.getItem(key)
        return (v == null) ? def : v
    }

    function _setPersistent(key, v) {
        if (typeof localStorage == "undefined")
            GM_setValue(key, v)
        else 
            localStorage.setItem(key, v)
    }

    function loadTrolls()
    {
        TROLLS = {}
        var json = _getPersistent(trollListKey, '')
        if (!json) return
        var ts = JSON.parse(json)
        for (var i in ts) {
            var name = trim(ts[i].toLowerCase())
            TROLLS[name] = true
        }
    }

    function saveTrolls()
    {
        var ts = []
        for (var t in TROLLS)
            ts.push(t)
        _setPersistent(trollListKey, JSON.stringify(ts))
    }

    function doAddTroll(name)
    {
        if (confirm('Add "' + name + '" to troll filter?'))
        {
            loadTrolls()
            name = trim(name.toLowerCase())
            TROLLS[name] = true
            saveTrolls()
            replaceText()
        }
    }

    function doRemoveTroll(name)
    {
        if (confirm('Remove "' + name + '" from troll filter?'))
        {
            loadTrolls()
            name = trim(name.toLowerCase())
            delete TROLLS[name]
            saveTrolls()
            location.reload(true)
        }
    }

    main()
}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


if (typeof jQuery == "undefined")
    addJQuery(Troll_B_Gone)
else
    Troll_B_Gone()

