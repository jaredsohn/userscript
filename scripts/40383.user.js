//
// ==UserScript==
// @name           Better EverNote 
// @namespace      SXLee
// @description    better EverNote
// @include        http://www.evernote.com/Home*
// ==/UserScript==
//

function run_script()
 	{ 
	//隐藏页眉，页脚，但是还没设置页面的高度
	var footer 	= getById("footer") ;
	var top_bar	= getById("top") ;
	footer.style.display = "none" ;
	top_bar.style.display = "none" ;

	//监听 【w】按键，如果按下则显示/隐藏页眉
	window.addEventListener("keypress",handle_key_press,false);
	function handle_key_press(event)
		{
		var KEY_CODE = 119 ;  // "W"
		if( event.which == KEY_CODE )
			top_bar.style.display = top_bar.style.display == "none" ? "block" : "none" ;
		}

	//移动 【搜索】 功能到 【SAVE CHANGE 按钮】的后面
	var timer_id = window.setInterval( move_the_search_box_and_btn , 1000 ) ;
	function move_the_search_box_and_btn ()
		{
		var search_box 		= getById("searchbox") ;
		var search_button = getById("searchbutton") ;
		var save_change_btn = getById("filters_info").firstChild ;
		if ( search_box && search_button && save_change_btn ) 
			{
			window.clearInterval(timer_id) ;
			//移动
			insertBefore( save_change_btn , search_button ) ;
			insertBefore( save_change_btn , search_box ) ;
			save_change_btn.style.cssFloat = "left" ;
			search_box.style.cssFloat = "right" ;
			}
		}
 	}

function insertBefore( where , item )
	{
	where.parentNode.insertBefore( item,where ) ;
	}
function getById( id )
	{
	return document.getElementById(id) ;
	}

//开始执行脚本
run_script();
