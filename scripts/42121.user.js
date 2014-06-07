// HWM Skill Set
// (c) 2009, Maxter
//
// ==UserScript==
// @name          hwmskillset
// @description   Skill Set
// @include       http://www.heroeswm.ru/*

//===User Setup===
var posLeft = 50;
var posTop = 55;
//================

//===setup===
var skill_names = [];
var skill_codes = [];
var skill_used = [];
var skill_link = "";
var skill_out = "";
//===========


var url = 'http://www.heroeswm.ru/' ;
var url_cur = location.href ;

var b = document.getElementsByTagName( 'body' ) ;
var anchors = document.getElementsByTagName( 'a' );

var names = GM_getValue( "hwm_skill_name" ) ;

// ------- handle skill set creation ----------
if( url_cur == url + 'skillwheel.php' )
{
	
	var param = document.getElementsByName("FlashVars");
	getSkills(param[2].value.split("=")[1]);
	getCurrentSet();

	ob = document.createElement( 'center' );
	ob.id = 'skillsets';
	
	// create input form
	ob.appendChild(get_input_form());
	
	if( names && names != '' )
	{
		i_name = names.split( '|' ) ;
		for( var i1 = 0; i1 < i_name.length ; i1++ )
		{
			ob.appendChild( get_saved_set( i_name[i1] ) ) ;
		}
	}
	
	b[0].appendChild( ob ) ;
}

for( var i = 0; i < anchors.length; i++ )
{
	var el = anchors[i];
	if( el.href == 'http://www.heroeswm.ru/map.php' )
	{
		d = document.createElement( 'div' );
		d.id = 'hwm_skill_get' ;
		addStyle( '#hwm_skill_get { position: absolute;background:#ddd9cd;top:'+posTop+'px;margin-left:'+posLeft+'px;padding: 0px; }' );

		title = document.createElement( 'b' );
		title.appendChild( document.createTextNode( 'Skill Sets' ) ) ;
		title.style.cursor = 'pointer' ;
		title.addEventListener( "click", display_sets , false );
		d.appendChild( title ) ;

		d1 = document.createElement( 'div' );
		d1.id = 'hwm_skill_sets' ;
		addStyle( '#hwm_skill_sets { padding: 5px; display:none; }' );

		if( names && names != '' )
		{
			
			i_name = names.split( '|' ) ;
			for( var i1 = 0; i1 < i_name.length ; i1++ )
			{
				d1.appendChild( get_set_all( i_name[i1] ) ) ;
			}
		}
		d.appendChild( d1 ) ;

		b[0].appendChild( d ) ;
	}
}

function display_sets()
{
	div_skill_sets = document.getElementById( 'hwm_skill_sets' )
	visible = div_skill_sets.style.display ;
	div_skill_sets.style.display = visible == 'block' ? 'none' : 'block' ;
}

function addStyle( css )
{
	var h , style ;
	h = document.getElementsByTagName('head')[0];
	if( !h ) return;
	style = document.createElement( 'style' );
	style.type = 'text/css';
	style.innerHTML = css;
	h.appendChild( style );
}

function get_set_all( t )
{
	var td = document.createElement( 'div' );
	td.setAttribute( 'sets' , t ) ;

	var i_name = GM_getValue( "hwm_skill_name_" + t ) ;
	var i_set = GM_getValue( "hwm_skill_set_" + t ) ;

	var bt = document.createElement( 'a' );
	bt.href = 'javascript:void(0);' ;
	bt.addEventListener( "click", test , false );
	bt.appendChild( document.createTextNode( decodeURIComponent( i_name ) ) ) ;
	td.appendChild( bt ) ;
//	td.appendChild( document.createTextNode( ': ' + i_set ) ) ;

	return td ;
}

function test()
{
	var set = this.parentNode.getAttribute( 'sets' )
	var i_set = GM_getValue( "hwm_skill_set_" + set);
	GM_xmlhttpRequest
	({
		method: "GET",
		url: url + "skillwheel.php?reset_all=1" ,
		headers:
		{
			'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.8.1)',
			'Accept': 'text /xml,application/xml,application/xhtml+xml,text/html',
		} ,
		onload:function(res)
		{
			GM_xmlhttpRequest
			({
				method: "GET",
				url: i_set ,
				headers:
				{
					'User-agent': 'Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.8.1)',
					'Accept': 'text /xml,application/xml,application/xhtml+xml,text/html',
				} ,
				onload:function(res)
				{
					alert( 'Skill set loaded' );
					return false;
				}
			});
			return false;
		}
	});
	
	return false;
}


function get_saved_set(t)
{
	td = document.createElement( 'div' );
	td.style.width = '900px' ;
	td.setAttribute( 'sets' , t ) ;
	td.id = 'a_' + t ;
	td.style.textAlign = 'left'

	var i_name = '' ;
	var i_names = '' ;
	var i_set ;

	i_set = GM_getValue( "hwm_skill_set_" + t ) ;
	i_name = GM_getValue( "hwm_skill_name_" + t ) ;
	i_names = GM_getValue("hwm_skill_names_" + t);
	td.innerHTML = "<b>" + decodeURIComponent( i_name ) + "</b><br/><br/>" + i_names;// + "<br/><br/>" + i_set;

	if( t > 0 )
	{
		bt = document.createElement( 'input' );
		bt.type = 'button'
		bt.addEventListener( "click", del_i_set , false );
		bt.setAttribute( 'value' , 'delete' ) ;
		td.appendChild( bt ) ;
	}
	td.appendChild( document.createElement( 'hr' ) ) ;
	
	return td ;
}

function get_input_form()
{
	td = document.createElement( 'div' );
	td.style.width = '900px' ;
	td.style.textAlign = 'left';

	bt = document.createElement( 'input' );
	bt.type = 'input';
	bt.id = "title0";
	bt.setAttribute( 'value' , '--current set--' ) ;
	bt.setAttribute( 'size' , 25 ) ;
	if (skill_out == "") bt.style.display = "none";


	var i_name = '' ;
	var i_set ;

	td.appendChild( bt ) ;

	//td.innerHTML = td.innerHTML + "<br/>" + skill_out;
	if (skill_out != "")
	{
		var curr = skill_out.split("<br/>");
		for (var i = 0; i < curr.length; i++)
		{
			td.appendChild( document.createElement("br"));
			td.appendChild( document.createTextNode( curr[i] ) ) ;
		}
	}
	bt = document.createElement( 'input' );
	bt.type = 'button';
	if (skill_out == "") bt.style.display = "none";
	bt.addEventListener( "click", save_cur_set , false );
	bt.setAttribute( 'value' , 'Save current skill set' ) ;
	td.appendChild( bt ) ;
	td.appendChild( document.createElement( 'hr' ) ) ;
	
	return td ;
}

function save_cur_set()
{
  tr = this.parentNode ;
  var i_id = '' ;
  str = document.getElementById( 'title0' ).value
  if( str == '' || str == "--current set--")
  {
    alert( 'Enter the skill set name' )
    return ;
  }

  i_name = GM_getValue( "hwm_skill_name" ) ;
  if( !i_name )
  {
    i_name = '' ;
  }

	var dt = new Date() ;
	var time_cur = dt.getTime() ;
	i_name += ( i_name == '' ? '' : '|' ) + time_cur ;
	
	GM_setValue( "hwm_skill_name" , i_name ) ;
	GM_setValue( "hwm_skill_set_" + time_cur , skill_link ) ;
	GM_setValue( "hwm_skill_name_" + time_cur , encodeURIComponent( str ) ) ;
	GM_setValue( "hwm_skill_names_" + time_cur , skill_out ) ;
	//alert(skill_link);
	//alert(i_names);
	td = document.getElementById( 'skillsets' );
	td.appendChild( get_saved_set( time_cur ) ) ;
	alert( 'ok' ) ;
}

function del_i_set()
{
  tr = this.parentNode ;
  set = tr.getAttribute( 'sets' )
  var i_id = '' ;
  i_name = GM_getValue( "hwm_skill_name" ).split( '|' ) ;
  i_count = i_name.length ;

  for( var i = 0; i < i_count; i++ )
  {
    if( i_name[i] == set )
    {
      GM_setValue( "hwm_army_set_" + i_name[i] , '' ) ;
      GM_setValue( "hwm_army_name_" + i_name[i] , '' ) ;
	  GM_setValue( "hwm_army_names_" + i_name[i] , '' ) ;
      tr.parentNode.removeChild( tr ) ;
    } else
    {
      i_id += ( i_id == '' ? '' : '|' ) + i_name[i] ;
    }
  }
  GM_setValue( "hwm_skill_name" , i_id ) ;
  return;
}


/*function getCombo(id)
{
	cmb = "<select id='cmb_"+id+"'>";
	cmb = cmb + "<option value='blank'>-- empty --</option>";
	
	for (var i = 0; i < skill_names.length-1; i++)
	{
		cmb = cmb + "<option value='"+skill_codes[i]+"'>"+skill_names[i]+"</option>";
	}
	
	cmb = cmb + "</select>";
	return cmb;
}*/

function getSkills(str)
{
	str = "$" + str;
	var arr = str.split("|");
	
	for (var i = 0; i < arr.length; i++)
	{
		if (arr[i].indexOf("$") == 0)
		{
			skill_codes.push(arr[i].substring(1));
			skill_names.push(arr[i+2]);
			skill_used.push(arr[i+8]);
			i = i + 8;
		}
	}
}

function getCurrentSet()
{
	var u = url + "skillwheel.php?";
	var j = 0;
	for (var i = 0; i < skill_names.length-1; i++)
	{
		if (skill_used[i] == "1")
		{
			u = u + ((u.substring(u.length-1)) == "?" ? "" : "&") + "param" + j + "=" + skill_codes[i];
			skill_out = skill_out + skill_names[i] + "<br/>";
			j = j + 1;
		}
	}
	skill_link = u;
}
// ==/UserScript==

