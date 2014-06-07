// ==UserScript==
// @name          SuuuuuperTwitter
// @description   Get a tweaked Twitter. clean sidebar, view reply, view moar, translate!!1
// @author        Danil Shekhovcov and other. I forgot who. sorry.
// @version       1.2.2
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

/*
очищение сайдбара от мусора
*/

(function () {
var tags = document.getElementsByTagName('div');
for (var key in tags)with (tags[key])if (getAttribute('id') == 'side_lists') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'trends') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'rssfeed') style.display = 'none';
for (var key in tags)with (tags[key])if (getAttribute('id') == 'recommended_users') style.display = 'none';

var tags2 = document.getElementsByTagName('p');
for (var key in tags2)with (tags2[key])if (getAttribute('class') == 'promotion round') style.display = 'none';



})();

/*
просмотр, на что был реплай.
навести на in reply to %username%
*/
var ols = document.getElementsByTagName('ol');
var ol = ols[0];
var as = ol.getElementsByTagName('a');
for (var i = 0; i < as.length; i++) {
    var a = as[i];
    if (a.innerHTML.indexOf("in reply to") == 0) {
        reply_to(a);
    }
}
ol.addEventListener('DOMNodeInserted', function (event) {
    var leenks = event.target.getElementsByTagName('a');
    for (var i = 0; i < leenks.length; i++) {
        var leenk = leenks[i];
        if (leenk.innerHTML.indexOf("in reply to") == 0) {
            window.setTimeout(reply_to, 0, leenk);
        }
    }
},
false);

function tipsify() {
    unsafeWindow.jQuery('.meta a[title]').tipsy();
}

function reply_to(link) {
    GM_xmlhttpRequest({
        method: "GET",
        url: link.href,
        headers: {
            "User-Agent": "Mozilla/5.0",
            "Accept": "text/xml"
        },
        onload: function (response) {
            var parser = new DOMParser();
            var dom = parser.parseFromString(response.responseText, "application/xml");
            var entry = dom.getElementsByTagName('text')[0].textContent;
            link.setAttribute('title', entry);
            tipsify();
        }
    });
}

/* Ответы в сайдбаре */

SR = {
	un : "",
	url : null,
	user : null,
	hash : null,
  rtwt : null,

	init : function()
	{
        var $ = unsafeWindow.$;
        var x = $("#side_base"), ys = x.css("background-color").replace(/rgb[(]|[)]/g,"").split(", "), r = ys[0]*1, g = ys[1]*1, b = ys[2]*1;
        var composite_rgb = "rgb("+Math.floor((255-r)*.4+r)+","+Math.floor((255-g)*.4+g)+","+Math.floor((255-b)*.4+b)+")";
        var border_color = $("#rssfeed hr").css("background-color");
        var divider_color = "rgb("+Math.floor(r*.85)+","+Math.floor(g*.85)+","+Math.floor(b*.85)+")";

        GM_addStyle("#side div.SR_content { border-top: 1px solid "+border_color+"; }");
		    GM_addStyle("div.SR_p { border-top: 1px solid "+divider_color+"; padding: 0 0 5px 0; float: left; width: 178px; }");
		    GM_addStyle("div.SR_p:hover { background-color: "+composite_rgb+" }");
		    GM_addStyle("div.SR_p em a { color: inherit; text-decoration: none; font-family: Helvetica Neue; }");
		    GM_addStyle("div.SR_p em a:hover { text-decoration: underline; }");
		    GM_addStyle("a.SR_reply { background-color: #fff; -moz-border-radius: 0 0 4px 4px; padding: 0 2px; float: right; margin: 0 0 0 5px; }");
        GM_addStyle(".SR_clear { display:inline-block; }");
        GM_addStyle(".SR_clear:after { display:block; visibility:hidden; clear:both; height:0; content: '.'; }");

		SR.url = new RegExp("((?:https?://)(?:[0-9a-z_!~*'()-]+[.])*(?:[0-9a-z][0-9a-z-]{0,61})?[0-9a-z][.][a-z]{2,6}(?:(?:/[0-9a-z_!~*'().;?:@&=+$,%#-]*)*/?))","gi");
		SR.user = new RegExp("@([a-zA-Z0-9_]+)","gi");
		SR.hash = new RegExp("#([a-zA-Z0-9_]+)","gi");

		var loc = (window.location+"").split("/"),meta,i;
		meta = document.getElementsByTagName("meta");
		for( i = 0; i < meta.length; i++ )
		{
			if( meta[i].name == "session-user-screen_name" && SR.un == "" )
			{
				SR.un = meta[i].content;
			}
			if( meta[i].name == "page-user-screen_name" )
			{
				SR.un = meta[i].content;
			}
		}

    SR.rtwt = new RegExp("(^rt:?[ ]*@"+SR.un+")|([(]via[ ]*@"+SR.un+"[)])","ig");

		if( SR.un != "" )
		{
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://search.twitter.com/search.json?q=%40"+SR.un,
				headers:{
					"User-Agent":"Mozilla/5.0",
					"Accept":"text/json"
				},
				onload:SR.handle
			});
		}
	},

	handle : function(response)
	{
		var r = eval("("+response.responseText+")");

		if( r.results && r.results.length > 0 )
		{
			var il, rx, rx_url, h, 
                ds = document.getElementById("side").appendChild(document.createElement("div")), 
                max = (GM_getValue("SR_MR")) ? GM_getValue("SR_MR")*1 : 1000000;
			ds.className = "section last SR_content";
			h = ds.appendChild(document.createElement("div"));
			h.className = "section-header SR_clear";
			h.appendChild(document.createElement("h1")).appendChild(document.createTextNode("Ответы"));

			for( var i=0; i < r.results.length && i < max; i++ )
			{
        console.log(i+" "+r.results[i].text);
        if( !SR.rtwt.test(r.results[i].text) || !GM_getValue("SR_hidert") )
        {
  				rx = new RegExp("^[@]"+SR.un);
  				il = "<div class='SR_p'>"+
                      "<a class='SR_reply' href='http://twitter.com/?status=@"+r.results[i].from_user+"%20&in_reply_to_status_id="+r.results[i].id+"&in_reply_to="+r.results[i].from_user+"'><img src='http://s.twimg.com/a/1253048135/images/icon_reply.gif'></a>"+
                      "<p><a href='http://twitter.com/"+r.results[i].from_user+"'>"+
  					r.results[i].from_user+"</a>: "+
  					r.results[i].text
  							.replace(SR.url,"<a href='$1'>$1</a>")
  							.replace(SR.user,"@<a href='http://twitter.com/$1'>$1</a>")
  							.replace(SR.hash,"<a href='http://search.twitter.com/search?q=%23$1'>#$1</a>")+
  					" <em><a href='https://twitter.com/"+r.results[i].from_user+"/status/"+r.results[i].id+"'>"+SR.tt(new Date(r.results[i].created_at))+"</a></em> "+
  					"</p></div>";
  				ds.innerHTML += il;
        }
			}
		}
	},

	tt : function(dt)
{
		var nw = new Date(), df = nw - dt, dm = Math.floor(df/60000), dh = Math.floor(dm/60), at = new Date(dt);
		if( dm <= 0 )	{ return "пять секунд назад"; }
		if( dm < 60 )	{ return (dm == 1)?"1 минуту назад":dm+" минуты назад"; }
		if( dh <= 1 )	{ return "около часа назад"; }
		if( dh < 24 )	{ return "около " + dh + " часов назад"; }
		if( (nw.getDate() - dt.getDate()) == 1 )	{ return "вчера"; }
		at.setDate(at.getDate() + 1);
		nw.setDate(nw.getDate() + 1);
		if( (nw.getDate() - at.getDate()) == 1 )	{ return "вчера"; }
		if( dt.getHours() == 0 ) nw = "12:"+dt.getMinutes()+" утра, ";
		else if( dt.getHours() < 12 ) nw = dt.getHours()+":"+dt.getMinutes()+" утра, ";
		else nw = (dt.getHours()-12)+":"+dt.getMinutes()+" вечера, ";
		return nw + " " + dt.getDate() + " " + ["Янв","Фев","Мар","Апр","Май","Июн","Июл","Авг","Сен","Окт","Ноя","Дек"][dt.getMonth()];
	},

    
};

SR.init();

/* загружать больше твитов. как на лукбуке */
tweetmoar = {

  initialize: function() {

    if (typeof unsafeWindow.jQuery == 'undefined') { 
      window.setTimeout(tweetmoar.initialize, 120); 
      return false; 
    }

    $ = unsafeWindow.jQuery;
    jQuery = $;
    
    if (!$('a#more').length) return false;
    
    tweetmoar.addstyle([
      'a#more { display:none; }',
      'div#new_results_notification { display:none !important; }',
      'p#tweetmoar { margin:0; padding:0.3em; -moz-border-radius:5px; text-align:center; color:#999; border:1px solid #DDD; }'
    ]);
    $('ol.statuses > li.buffered').livequery(function() { 
      $(this).removeClass('buffered'); 
    });
    $(window).bind('scroll', function() {
      var triggerY = document.body.clientHeight - window.innerHeight / 4,
          currentY = window.scrollY + window.innerHeight;
      if (currentY >= triggerY) {
        var morebutton = $('a#more');
        if (morebutton.length && !morebutton.hasClass('loading')) {
          morebutton.trigger('click');
          $('div#pagination').append('<p id="tweetmoar">Подгружаются твиты, чуть-чуть подождите...</p>');
        }
      }
    });

  },

  addstyle:function(styles) { 
    var styleelement = $('style:last');
    styles = styles.join("\n");
    if (!styleelement.length) {
      $('head').append("\n<style type=\"text/css\">\n"+styles+"\n</style>\n");
    } else {
      styleelement.append("\n/*=== tweetmoar ===*/\n"+styles+"\n");
    }
  }
}

tweetmoar.initialize();
unsafeWindow.tweetmoar = tweetmoar;    
