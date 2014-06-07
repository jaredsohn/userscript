// ==UserScript==
// @name           TwitterAnywhereView
// @namespace      http://d.hatena.ne.jp/yuroyoro/
// @description    show Twitter Anywhere Info
// @include        http://*
// ==/UserScript==

(function() {

  var already_got_chart = false;

  if (self.location.href != top.location.href) {
    return;
  }

  GM_addStyle(<><![CDATA[
    div#TwitterAnywhere_view{
      z-index: 260;
      position: fixed;
      bottom: 41px;
      left: 0px;
      overflow: hidden;
      opacity: 0.85;
      min-height: 20px;
      min-width: 20px;
      max-height: 500px;
      padding: 2px;
      -moz-border-radius: 0 8px 8px 0;
      font-family: Helvetica, Verdana, sans-serif;
	  overflow:auto;
    }

	#TwitterAnywhere_view_content * {
		font-family:"Arial",sans-serif;
		font-weight:normal;
		color:#111111;
		font-size:100%;
		margin:0;
		padding:0;
		text-align:left;
	}

	#TwitterAnywhere_view_content .twitterer_anywhere_go {
		color:#6666CC;
		font-size:90%;
		text-decoration:none;
	}
	
	#TwitterAnywhere_view_content ul {
		background-color:#9AE4E8;
		border-top:2px solid #1133EE;
		list-style-position:inside;
		margin:2px 0 0;
		padding:8px 5px 12px 8px;
	}
	
	#TwitterAnywhere_view_content ul li {
		background-color:white;
		border-bottom:1px dashed #D2DADA;
		list-style-type:none;
		padding:2px;
	}
	
	#TwitterAnywhere_view_content .twitterer_anywhere_user {
		color:#1133EE;
		margin:0 2px;
		text-decoration:underline;
	}

  ]]></>);


  function main() {

    var element = document.createElement('div');
    with (element) {
      id = 'TwitterAnywhere_view';
      init_style(style);
      addEventListener('mouseover', show_TwitterAnywhere_view, false);
      addEventListener('mouseout', hide_TwitterAnywhere_view, false);
    }
    var logo = document.createElement('div');
    with (logo) {
      id = 'TwitterAnywhere_view_logo';
      innerHTML = "Twits";
      with (style) {
        margin = '0';
        padding = '2';
        fontSize = '12px';
        textAlign = 'center';
        color = '#1133EE';
        fontWeight = 'bold';
      }
    }
    element.appendChild(logo);

    var content = document.createElement('div');
    with (content) {
      id = 'TwitterAnywhere_view_content';
      init_style(style);
      with (style) {
        display = 'none';
        margin = '7px 4px 4px 4px';
        width = '620px';

      }
    }
    element.appendChild(content);

    document.body.appendChild(element);
  }

  function show_TwitterAnywhere_view() {

      if (!already_got_chart) {
        get_TwitterAnywhere_Info();
      }

      var TwitterAnywhere_view_logo = document.getElementById('TwitterAnywhere_view_logo');
      TwitterAnywhere_view_logo.style.display = 'none';

      var TwitterAnywhere_view_elem = document.getElementById('TwitterAnywhere_view_content');
      TwitterAnywhere_view_elem.style.display = 'block';
  }

  function hide_TwitterAnywhere_view() {
    var TwitterAnywhere_view_elem = document.getElementById('TwitterAnywhere_view_content');
    if (TwitterAnywhere_view_elem) {
      TwitterAnywhere_view_elem.style.display = 'none';
      var TwitterAnywhere_view_logo = document.getElementById('TwitterAnywhere_view_logo');
      TwitterAnywhere_view_logo.style.display = 'block';
    }
  }

  function get_TwitterAnywhere_Info() {

    var content = document.getElementById('TwitterAnywhere_view_content');

	// URL
	var twitterer_anywhere_url = top.location.href.replace(/#.*/,"");
	var json_url = "http://twitterer.moongift.jp/m/"+ twitterer_anywhere_url + "?callback=show_TwitterAnywhere";

	GM_log("json_url:" + json_url);

    // Twitter anywhereからJSONPで情報取得
    GM_xmlhttpRequest({
        method : 'GET',
        url : json_url,
        onload : function(res) {
            eval("(" + res.responseText+ ")");
        }
      });


    already_got_chart = true;


  }
  
  function show_TwitterAnywhere(json){
  	
  	var content = document.getElementById('TwitterAnywhere_view_content');
	
	if( json == null ){
		var url = top.location.href.replace(/#.*/,"");
		var html ="<div><strong>このエントリーのつぶやき (0)</strong>";
		html += " <a class='twitterer_anywhere_go' href='http://pcod.no-ip.org/yats/search?query="+ url + "'>twitter検索のページへ飛ぶ</a>";
		html += "<br/>";
		html += "<ul id='bookmarked_user'>";
		html += "<li>このページはまだつぶやかれていません。</li>";
		html += "</ul>";
		html += "</div>";
		content.innerHTML = html;
		return;
	}
	  
	var html ="<div><strong>このエントリーのつぶやき ("+ json.count +")</strong>";
	html += " <a class='twitterer_anywhere_go' href='http://pcod.no-ip.org/yats/search?query="+ json.entry_url + "'>twitter検索のページへ飛ぶ</a>";
	html += "<br/>";
	html += "<ul id='bookmarked_user'>";
	
	for( var index in json.bookmarks ){
		html += "<li>";
		html += "<span class='__twitterer_anywhere_timestamp'>" + json.bookmarks[index].timestamp + "</span>";
		html += "<img width='16' height='16' src='http://img.twitty.jp/twitter/user/" +json.bookmarks[index].user + "/s.gif'/>";
		html += "<a class='twitterer_anywhere_user' href='http://twitter.com/" + json.bookmarks[index].user +"'>" + json.bookmarks[index].user +"</a>";
		html += json.bookmarks[index].comment;
		html += "<a class='twitterer_anywhere_user' href='" + json.bookmarks[index].url + "'>view</a>";
		html += "</li>";
	}
	html += "</ul>";
	html += "</div>";
	
	content.innerHTML = html;
  }


  function init_style(style) {
    with (style) {
      fontSize = '12px';
      textAlign = 'left';
      padding = 0;
      margin = 0;
      lineHeight = '15px';
      color = '#9AE4E8';
      backgroundColor = '#9AE4E8';
      border = 'none';
    }
  }

  function init_img_style(style) {
    with (style) {
      border = '1px solid #9AE4E8';
      margin = '5px';
      position = 'relative';
      textAlign = 'center';
    }
  }

  main();

})();
