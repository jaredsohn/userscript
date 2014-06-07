// ==UserScript==
// @name           mobile.bg tweak
// @namespace      *
// @include        http://nfs.mobile.bg/pcgi/mobile.cgi*
// ==/UserScript==

// get GET param
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

////////////////////////////////////////////////////////////////////////// PAGES

function page_searchHome()
{
	// set default search values
	var sorting = document.getElementsByName('f18');
	var i = 0;
	if (sorting[0] != null){
		for(i = 0; i < sorting[0].length; i++){
			if (sorting[0].options[i].value == 3){
				sorting[0].options[i].selected = true;
				break;
			}
		}
	}
	
	// set default engine type
	var engine = document.getElementsByName('f12');
	if (engine[0] != null){
		
		for(i = 0; i < engine[0].length; i++){
			if ((engine[0].options[i].value == 'Äèçåëîâ') || (i == 2)){
				//engine[0].options[i].selected = true;
				break;
			}
		}
	}
	
	// set min year
	var min_year = document.getElementsByName('f10');
	if (min_year[0] != null){
		for(i = 0; i < min_year[0].length; i++){
			if (min_year[0].options[i].value == '1997'){
				min_year[0].options[i].selected = true;
				break;
			}
		}
	}
}


function article_page_mod()
{
	var tables = document.getElementsByTagName('table');
	for (var t_id = 0; t_id < tables.length; t_id++){
		if ((tables[t_id].getAttribute('width') == 284) && (tables[t_id].getAttribute('align') == 'center')){
			var container = tables[t_id].parentNode;
			break;
		}
	}
	
	if (container != null){
		container.setAttribute('style', "z-index:1; position:relative; margin-top:-50px; margin-left: 2px; padding: 45px 0px 0px 0px;");
		
		var image_window_reg = new RegExp('showallpicts.+(photos[0-9]*)/([0-9]+).+/([0-9]+_[0-9]+\.pic)');
		var image_window_big = new RegExp('_1.');
		var img_id = 0;
		var subs = '';
		var main_image = '';
		var main_image_backup = '';
		// collect Image data
		var image_window = container.getElementsByTagName('td');
		for (i = 0; i < image_window.length; i++){
			if (res = image_window_reg.exec(image_window[i].innerHTML)){
				// check if this is the big image
				if (image_window_big.test(image_window[i].innerHTML)){
					if (main_image == ''){
						// big image - load big image
						main_image = 'http://www.mobile.bg/' + res[1] + '/'+res[2]+'/big/' + res[3];
						
						subs = '<img src="http://www.mobile.bg/'+res[1]+'/'+res[2]+'/'+res[3]+'" width=62 height=47 onMouseOver="document.getElementById(\'big_image\').src = \''+main_image+'\'; " />' + subs;
					}
				}else{
					// small image - make it like mobile.de
					subs += '<img src="http://www.mobile.bg/' + res[1] + '/'+res[2]+'/small/' + res[3] + '" onMouseOver="document.getElementById(\'big_image\').src = \'http://www.mobile.bg/' + res[1] + '/'+res[2]+'/big/'+res[3]+'\'; "/>';
					if (main_image_backup == ''){
						main_image_backup = 'http://www.mobile.bg/' + res[1] + '/'+res[2]+'/big/' + res[3];
					}
					
					// cash the image
					preload_image = new Image(1, 1);
					preload_image.src = 'http://www.mobile.bg/' + res[1] + '/'+res[2]+'/big/'+res[3];
					
					if ((++img_id+1) % 2 == 0){
						subs += '<br />';
					}
				}
			}
		}
		
		if (main_image == ''){
			main_image = main_image_backup;
		}
		
		container.setAttribute('id', 'mod_container');
		container.innerHTML = '<style type="text/css"> \n'
			+'#mod_container img{ \n'
			+'margin: 2px; \n'
			+'border: 1px solid #000000; \n'
			+'} \n'
			+'</style> \n';
		container.innerHTML += '<table><tr><td valign="top">'+subs+'</td><td valign="top"><img id="big_image" src="'+main_image+'" /></td></tr></table>';
	}
}

////////////////////////////////////////////////////////////////////////// MAIN

// determining if we are on search results or showing certain article
if ((gup('act') == '2') && (gup('rub') == '1')){
	// serach options
	page_searchHome();
}else if((gup('act') == '4') && (gup('adv') != '')){
	// one article
	article_page_mod();
}else{
	// search results
	// TODO
}

//if (url_results.test(