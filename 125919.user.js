// ==UserScript==
// @name           豆悦
// @namespace      DAR
// @description    使豆瓣文章读起来更舒服
// @version        0.5
// @author         Robin Deng
// @include        *.douban.com/note/*
// @include        *.douban.com/group/topic/*
// @include        *.douban.com/widget/notes/*/note/*
// @include        http://9.douban.com/site/entry/*
// ==/UserScript==

GM_info = {
'scriptWillUpdate': true
}

GM_addStyle("\
	#DRA {position: fixed; height:180px; top:257px; left:0; width:30px; opacity:0.3; font-family: courier; font-size:16px;} \
    #DRA:hover {opacity:1;} \
	#DRA span {padding:3px 5px; font-size:14px; background:#eee; border-bottom:1px solid #ddd; display:block; text-align:center;} \
	#DRA span:hover {cursor:pointer; background:#ddd;} \
	#DRAnight,#DRAnight p{background:#343a3f; color:#999 !important; padding:20px; line-height:2em;} \
	#DRAday,#DRAday p{background:#EDEBE8; color:#2C2D32 !important; padding:20px; line-height:2em;} \
");
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "about:blank");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.head.appendChild(script);
    }, false);
    document.head.appendChild(script);
}

function main() {
	var  bts = "<div id='DRA'>" + 
					"<span id='DRAtop' title='顶部'>&and;</span>" +
					"<span id='DRAbig_bt' title='加大字体'>+</span>" +
					"<span id='DRAsml_bt' title='减小字体'>-</span>" +
					"<span id='DRAday_bt' title='白天模式'>D</span>" +
					"<span id='DRAnight_bt' title='夜晚模式'>N</span>" +
					"<span id='DRAdel_bt' title='恢复默认'>X</span>" +
					"<span id='DRAbottom' title='低部'>&or;</span>"
			   "</div>";
    try {
		$("body").prepend(bts);
		var article= $(".article, .note-content");
        var note = $(".topic-content .topic-doc .topic-content p, .note, .note-content div, .article_content");

        //user config:
        var theme = localStorage.getItem('_DAR_setting_theme');
        var ufont = localStorage.getItem('_DAR_setting_font');
        if (theme || ufont){
			note.attr("id", theme);	
            note.css('font-size', ufont);
        /*
        } else {
            var hours = new Date().getHours();
            if (hours >= 6 && hours < 20) {
                note.attr("id","DRAday");	
            } else {
                note.attr("id","DRAnight");	
            }
        */
        }

        function save_setting(theme){
            var font = note.css('font-size');
            if (note.attr('id')){
                localStorage.setItem('_DAR_setting_theme', note.attr('id'));
            };
            localStorage.setItem('_DAR_setting_font', font);
        }

		$("body").delegate("#DRAbig_bt", "click", function(){
			var fz = parseInt(note.css("font-size"),10);
			note.css("font-size",fz+2);	
            save_setting();
		});
		$("body").delegate("#DRAsml_bt", "click", function(){
			var fz = parseInt(note.css("font-size"),10);
			note.css("font-size",fz-2);	
            save_setting();
		});
		$("body").delegate("#DRAday_bt", "click", function(){
			note.removeAttr("id");	
			note.attr("id","DRAday");	
            save_setting('DRAday');
		});
		$("body").delegate("#DRAnight_bt", "click", function(){
			note.removeAttr("id");	
			note.attr("id","DRAnight");	
            save_setting('DRAnight');
		});
		$("body").delegate("#DRAdel_bt", "click", function(){
			note.removeAttr("id");	
			note.css("font-size","13px");	
            localStorage.removeItem('_DAR_setting_theme');
            localStorage.removeItem('_DAR_setting_font');
		});
		$("body").delegate("#DRAtop", "click", function(){
            window.scrollTo(0,0);
		});
		$("body").delegate("#DRAbottom", "click", function(){
            window.scrollTo(0,999999);
		});
    }
    catch (e) {}
}
addJQuery(main);