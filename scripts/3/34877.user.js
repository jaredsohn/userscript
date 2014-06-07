// Released under the GPL license

// http://www.gnu.org/copyleft/gpl.html

// version A 08.10.10.22.38



// ==UserScript==

// @name	Douban Quick

// @namespace	http://nonamespace

// @description	提供豆瓣快捷功能：楼层跳转、回复框跟随

// @include	http://www.douban.com/group/topic/*

// ==/UserScript==



//设置   不需要的，将true改成false

var conf_float_area	= true		//浮动区域

var conf_quick_goto	= true		//楼层跳转

var textarea_rows	= 6		//回复框行宽

var textarea_cols	= 28		//回复框列宽





//快捷键

function add_hotkey(fd_hotkey,object)

	{

	 object.addEventListener("keyup",fd_hotkey,false);

	}

function Hotkey(event, action, ctrlKey, shiftKey, altKey, keycode)

	{

	if (	   event.ctrlKey	== ctrlKey 

		&& event.shiftKey	== shiftKey 

		&& event.altKey		== altKey 

		&& event.keyCode	== keycode

		)

		{action();}

	}

//////////////////////////////////////////////////////////////////////////// 



/*

//快速提交   暂缓   

var post_form = document.getElementsByTagName('form')['2'];

var post_txtarea = document.getElementById('last');

add_hotkey(hotkey_post,document);

function hotkey_post(event)

	{

	 action = quick_post ;

	 Hotkey(event, action, true, false, false, 80);

	}

function quick_post()

	{

	 

	 post_form.submit();

	} 

///////////////////////////////////////////////////////////////////////////

*/



//快速到达楼层

if (conf_quick_goto ) { add_hotkey (hotkey_goto,document); }

if (GM_getValue( "over_page_goal", "") != "") {quick_goto_action(GM_getValue( "over_page_goal", "")); };

function hotkey_goto(event)

	{

	 action = quick_goto ;

	 Hotkey(event, action, true, false, false, 77);

	}

function quick_goto()

	{
	 var url_now = window.location.href ;

	 var level = prompt("要到几楼？","");

	 if (level != "" )

		{

		 var level_page = level % 100 ;
		 if ( level_page == 0 ) { start_page = level - 100 ; level_page = 100 ;}

	 	 	else { var start_page = (((level)/100|0))*100 ; }

		 if ( ! ((url_now.substring(49,52) == start_page) || ( (level < 100) && (url_now.substring(49,52)== "") ) ) )

			{

			 var url_goal = url_now.substring(0,42) + "?start=" + start_page ;

			 GM_setValue ("over_page_goal", level_page);

			 self.location= url_goal ;

			}

			else

	 	 	{

			 quick_goto_action(level_page);

			}

		}

	} 

function quick_goto_action(level_page)

	{

	 if (document.getElementsByClassName('wr')[level_page] == undefined )

		{alert ("貌似没有的～") ;}

	  else 	{
		 document.getElementsByClassName('wr')[level_page].firstChild.firstChild.childNodes[1].childNodes[1].focus();
		 //document.getElementsByClassName('wr')[level_page].style.background-color = "#99FF00" ;
		}

	 GM_setValue ("over_page_goal", "");

	}

////////////////////////////////////////////////////////////////////////////



//浮动回复框

if ( conf_float_area )

	{

	 add_hotkey (hotkey_float_area,document);

	 

	 var new_form = document.createElement('div');

	 new_form.innerHTML =  "<form class=\"ft\" name=\"comment_form\" method=\"post\" action=\"\"><textarea id=\"quick_post\" name=\"rv_comment\" rows=\"15\" cols=\"55\"></textarea><br><input value=\"加上去\" type=\"submit\"></form><div align=\"right\" class=\"gact\" style=\"float:right\"><a id=\"show_form\">&nbsp;>显示回应框&nbsp</a><a id=\"quick_goto\">&nbsp;>楼层跳转&nbsp</a><a id=\"bt_top\" href=\"javascript:scroll(0,0)\" >&nbsp;>回到页首&nbsp</a></div>" ;
	 var post_form


	 new_form.style.cssText = "position:fixed;bottom:0em;right:0" ;

	 new_form.id = "float_area"

	 new_form.childNodes[0].childNodes[0].rows = textarea_rows ;

	 new_form.childNodes[0].childNodes[0].cols = textarea_cols ;

	 new_form.childNodes[0].style.display = "none"

	 document.getElementById('tablerm').appendChild(new_form);	 
	 new_form.childNodes[1].childNodes[0].addEventListener("click",float_area_change,false) ;
	 new_form.childNodes[1].childNodes[1].addEventListener("click",quick_goto,false) ;
	 new_form.childNodes[1].childNodes[2].addEventListener("click",goto_top,false) ;
	 /*if (document.getElementById('status').childNodes[1].childNodes[1].innerHTML == "登录")
		{
		 new_form.childNodes[1].childNodes[0].innerHTML = "&nbsp;&gt;登录&nbsp;"
		}*/
	}
function float_area_change() 
	{var form_state ;
	 if  ( new_form.childNodes[1].childNodes[0].innerHTML == "&nbsp;&gt;显示回应框&nbsp;" )	{ form_state = 1 ;}
	 if  ( new_form.childNodes[1].childNodes[0].innerHTML == "&nbsp;&gt;隐藏回应框&nbsp;" )	{ form_state = 2 ;}
	 if  ( new_form.childNodes[1].childNodes[0].innerHTML == "&nbsp;&gt;登录&nbsp;" )	{ form_state = 0 ;}
	 switch ( form_state )
		{
		case 0 :
			alert ("登录！");
			document.getElementsByClassName('pl2')[1].onclick();   
		 break
		case 1 :
			new_form.childNodes[0].style.display = "block";
			document.getElementById("quick_post").focus();
			new_form.childNodes[1].childNodes[0].innerHTML = "&nbsp;&gt;隐藏回应框&nbsp;";
		 break
		case 2 :
			new_form.childNodes[0].style.display = "none" ;
			new_form.childNodes[1].childNodes[0].innerHTML = "&nbsp;&gt;显示回应框&nbsp;";
		 break
		}
/*	 if ( new_form.childNodes[1].childNodes[0].innerHTML == "&nbsp;&gt;隐藏回应框&nbsp;" )
		{
		 new_form.childNodes[0].style.display = "none" ;
		 new_form.childNodes[1].childNodes[0].innerHTML = "&nbsp;&gt;显示回应框&nbsp;";
		}
	 else {
	 	if ( new_form.childNodes[1].childNodes[0].innerHTML == "&nbsp;&gt;显示回应框&nbsp;" )
	 	{
		 new_form.childNodes[0].style.display = "block";
		 document.getElementById("quick_post").focus();
		 new_form.childNodes[1].childNodes[0].innerHTML = "&nbsp;&gt;隐藏回应框&nbsp;"
		}
	      }
	 if ( new_form.childNodes[1].childNodes[0].innerHTML == "&nbsp;&gt;登录&nbsp;" )
			{
			}
*/
	}
function hotkey_float_area(event)

	{
	 action = float_area_change ;

	 Hotkey(event, action, true, false, false, 188);

	}

////////////////////////////////////////////////////////////////////////////











/*

    keycode    8 = BackSpace BackSpace

    keycode    9 = Tab Tab

    keycode   12 = Clear

    keycode   13 = Enter

    keycode   16 = Shift_L

    keycode   17 = Control_L

    keycode   18 = Alt_L

    keycode   19 = Pause

    keycode   20 = Caps_Lock

    keycode   27 = Escape Escape

    keycode   32 = space space

    keycode   33 = PrioraddEventListener

    keycode   34 = Next

    keycode   35 = End

    keycode   36 = Home

    keycode   37 = Left

    keycode   38 = Up

    keycode   39 = Right

    keycode   40 = Down

    keycode   41 = Select

    keycode   42 = Print

    keycode   43 = Execute

    keycode   45 = Insert

    keycode   46 = Delete

    keycode   47 = Help

    keycode   48 = 0 equal braceright

    keycode   49 = 1 exclam onesuperior

    keycode   50 = 2 quotedbl twosuperior

    keycode   51 = 3 section threesuperior

    keycode   52 = 4 dollar

    keycode   553 = 5 percent

    keycode   54 = 6 ampersand

    keycode   55 = 7 slash braceleft

    keycode   56 = 8 parenleft bracketleft

    keycode   57 = 9 parenright bracketright

    keycode   65 = a A

    keycode   66 = b B

    keycode   67 = c C

    keycode   68 = d D

    keycode   69 = e E EuroSign

    keycode   70 = f F

    keycode   71 = g G

    keycode   72 = h H

    keycode   73 = i I

    keycode   74 = j J

    keycode   75 = k K

    keycode   76 = l L

    keycode   77 = m M mu

    keycode   78 = n N

    keycode   79 = o O

    keycode   80 = p P

    keycode   81 = q Q at

    keycode   82 = r R

    keycode   83 = s S

    keycode   84 = t T

    keycode   85 = u U

    keycode   86 = v V

    keycode   87 = w W

    keycode   88 = x X

    keycode   89 = y Y

    keycode   90 = z Z

*/