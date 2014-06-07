// ==UserScript==
// @name    Wretch Album Toolbox
// @namespace    http://yuyi.tw/
// @description    無名相簿工具組
// @homepage    http://yuyi.tw/
// @include    http://www.wretch.cc/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version            0.258
// ==/UserScript==

// Thanks to Expand wretch album http://blog.gslin.org/archives/2007/09/15/1313/
var version = parseFloat("0.258");
var use_original_image = GM_getValue("use_original_image", false);
var original_css;

function use_o()
{
  GM_log( GM_getValue("use_original_image", false) );
	$("img[alt=loading]").each(function() {
	 $(this).attr("src", $(this).attr("src").replace(/([0-9]+.jpg)/,function($1){return "o"+$1;}));
	 });
}

function img_onload(img)
{
	if(use_original_image && $(img).width()==90 && $(img).height()==90)
	{
	  GM_log( $(img).attr("bsrc"));
		$(img).attr("src", $(img).attr("bsrc"));
  }
}

function use_clean_css()
{
  $("link[rel=stylesheet][href*='wretch']").attr("href", original_css==$("link[rel=stylesheet][href*='wretch']").attr("href") ? "http://yuyi.tw/wretch/album.css" : original_css );
}

function insert_menu(text,href)
{
		var new_menu_a = document.createElement("a");
		new_menu_a.href = href;
		new_menu_a.innerHTML = text;
		new_menu_a.style.margin = "0pt 5px 0pt 2px";

		var haha_td = document.createElement("td");
		haha_td.appendChild(new_menu_a);

    $(haha_td).insertBefore( $(document.getElementById('Wretch-haha-menubar')).parent() );

    return new_menu_a;
}

function test11()
{
	if(typeof test11.imgheight == "undefined"||test11.imgheight=="auto")
	  test11.imgheight=400;
	else
	  test11.imgheight="auto";
  GM_log(test11.imgheight);
  $(".scaleimg").height(test11.imgheight);
}

function album_expander($)
{
    original_css = $("link[rel=stylesheet]").attr("href");

    if(typeof document.getElementById('Wretch-haha-menubar') != "undefined")
    {
	    insert_menu('無名工具箱首頁','http://yuyi.tw');
	    insert_menu("使用清晰版面(快速鍵:Q)",'javascript: use_clean_css();');
	    insert_menu("test",'javascript: test11();');
	    style='height:600px'
		}

		$("embed").each(function() {
		  var parent_node = $(this).parent();
		  if(parent_node.size()!=0) {
		  	var text = parent_node.html();

		  	if(text.match("mp3")){
		  	  GM_log(text);
	      	text = text.replace('autostart=','ha=').replace('as=','ha=');
	      	parent_node.html(text);
	      }
			}
    	});

		$("body").attr("onDragStart","true");
		$("body").attr("onContextMenu","true");
		$("body").attr("onSelectStart","true");

		if(window.location.toString().match("://www.wretch.cc/album/album.php")===null)
		  return;

    var imgs = "";
    var note = Array();
    var isvideo = Array();

    var i = 0;
    $(".small-e").each(function() {
      n = $("a", this).attr("innerHTML");
      note[i] = typeof(n)=='undefined'?'':n;
			isvideo[i]=$(this).parent().parent().children().size()>1;
      i++;
    });

    i = 0;
    var side=$(".side");
    if(side.size()>100)
    {
			if(!confirm("共有"+side.size()+"件照片或影片要展開，可能會非常緩慢！\n\n按[確定]強制展開，按[取消]使用分頁。"))
			{
				document.cookie='showall=0';
				document.location=document.location;
			  return false;
			}
		}
    side.each(function() {
	    var a = $("a", this);
	    var alink = a.attr("href");
	    var img_preview = $("img", this).attr("src");
	    var ismusic = img_preview.match("http://pic.wretch.cc/e/serv/album/img/") !== null;
	    var img_bsrc = img_preview.replace(/\/thumbs\/t?/, "/");
	    var imgsrc = use_original_image ? img_bsrc.replace(/([0-9]+.jpg)/,function($1){return "o"+$1;}) : img_bsrc;
	    var videosrc = img_bsrc.replace(/\/\/.*\.com/, "//119.160.255.165").replace(/jpg\?.*/,"flv");
			//116.214.13.43

      //var orglink = "<a onClick='replace_src("+ i +")'>原圖 </a>";
	    //imgs += "" + note[i] + "<a href='" + alink + "'><img id='imgid"+ i +"' alt='' src='" + imgsrc + "'></a>";
			if(ismusic)
			{
			  var mp3_id = alink.match(/f=([0-9]*)&/)[1];
				var account = alink.match(/i=([0-9a-zA-Z]*)&/)[1].toLowerCase();
				var album_id = alink.match(/b=([0-9a-zA-Z]*)&/)[1];
				var server_id = original_css.match(/\/f([0-9]*).wretch/)[1];

        var musicsrc = "http://f"+server_id+".wretch.yimg.com/"+account+"/"+album_id+"/"+mp3_id+".mp3";
			  imgs += "<div style='float: left; padding: 2px; display: inline !important;'><a href='" + alink + "'>"+ note[i] + "</a><a href='" + musicsrc + "'> [直接下載] </a><div id='video_"+i+"'></div></div><script type='text/javascript'>s2.addVariable('file','"+musicsrc+"');s2.write('video_"+i+"');</script>";
			}
			else if(isvideo[i])
			  imgs += "<div style='float: left; padding: 2px; display: inline !important;'><a href='" + alink + "'>"+ note[i] + "</a><a href='" + videosrc + "'> [直接下載] </a><div id='video_"+i+"'></div></div><script type='text/javascript'>s1.addVariable('file','"+videosrc+"');s1.addVariable('image','"+img_preview+"');s1.write('video_"+i+"');</script>";
			else
			{
			  //GM_log( GM_getValue("use_original_image") );
				imgs += "<div style='float: left; padding: 2px; display: inline !important;'><a href='" + alink + "'>"+ note[i] + "</a><br /><img class='scaleimg' id='imgid"+ i +"' alt='loading' onclick=\"document.location='" + alink + "'\" src='" + imgsrc + "' bsrc='" + img_bsrc + "' onload='img_onload(this);' /></div>";
			}
			i++;
	});

		$("html").css("overflow","auto");

		$("body").width("auto").css("margin-left","5").css("margin-right","5");
    $("table").slice(2,3).width("auto");
    $("table").slice(3,4).width("100%"); // for CSS
    $("table").slice(3,4).attr("width","100%"); // for attr
    $("table").slice(3,4).children().width("auto").attr("width","auto");
    pic_tr = $("table").slice(3,4).children().children().slice(1,2);
    video_script = "<script type='text/javascript'>var s1 = new SWFObject('http://userscript.sg1013.myweb.hinet.net/player.swf','','640','480','9','#ffffff');s1.addParam('wmode','opaque');s1.addParam('allowfullscreen','true');s1.addParam('allowscriptaccess','always');s1.addVariable('skin','http://userscript.sg1013.myweb.hinet.net/beelden.zip');</script>";
		//music_script = "<script type='text/javascript'>var s2 = new SWFObject('http://l.yimg.com/e/serv/video/video_player/BGMusicPlayer.swf','','470','20','9','#ffffff');s2.addParam('wmode','opaque');s2.addParam('allowfullscreen','true');s2.addParam('allowscriptaccess','always');</script>";
		music_script = "<script type='text/javascript'>var s2 = new SWFObject('http://userscript.sg1013.myweb.hinet.net/player.swf','','470','30','9','#ffffff');s2.addParam('wmode','opaque');s2.addParam('allowfullscreen','false');s2.addParam('allowscriptaccess','always');s2.addVariable('skin','http://userscript.sg1013.myweb.hinet.net/beelden.zip');</script>";
		pic_tr.html(music_script+video_script+"<tr><td>" + imgs + "</td></tr>");


		$("#bigcontainer").attr('style','');
		$("#bigcontainer").width("auto");

    $("html body table tr td div").css("display","inline !important");
    $("div embed").attr('style','display: inline !important;visibility: visible');

    var link_obj = insert_menu(use_original_image?'不使用原始圖檔':'自動尋找原始圖檔','');
    $(link_obj).click(function() {
		  window.setTimeout(function() {
		      GM_setValue("use_original_image", !GM_getValue("use_original_image", false));
		  }, 0);
			document.location=document.location;
			return false;
		});


		//version check
		GM_xmlhttpRequest({
		    method: 'get',
		    url: "http://yuyi.tw/wretch/wretch_album_toobox_version?ver="+version+"&refer="+document.location,
		    onload: function(details){
			    GM_log(parseFloat(details.responseText));
			    if(parseFloat(version) < parseFloat(details.responseText) )
			    {
						insert_menu('<b><font color=red>安裝新版無名相簿工具組 v'+details.responseText+'</font></b>','http://userscripts.org/scripts/source/45824.user.js');
					}
		    }
		 	});


		return true;
}

function GM_wait()
{
    if (typeof unsafeWindow.$ == "undefined")
            window.setTimeout(GM_wait, 100);

    else
    {
            album_expander(unsafeWindow.$)
        		$("*").keypress(function(e){
							if(e.which==113||e.which==81) use_clean_css();
						});

    }
}

//if @require fail
if(typeof jQuery == "undefined")
{
	var GM_JQ = document.createElement("script");
	GM_JQ.src = "http://code.jquery.com/jquery-latest.min.js";
	GM_JQ.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(GM_JQ);
}
else
  unsafeWindow.$ = jQuery;

unsafeWindow.use_o = use_o;
unsafeWindow.use_clean_css = use_clean_css;
unsafeWindow.img_onload = img_onload;
unsafeWindow.test11 = test11;

GM_wait();