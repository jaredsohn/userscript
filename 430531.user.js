// ==UserScript==
// @name       IFRAME/FLASH switcher
// @namespace  http://www.kitsis.ca/
// @version    0.4
// @description  Allow to activate or deactivate all Iframes and Flash objects individualy
// @grant      unsafeWindow
// @updateURL  http://userscripts.org/scripts/source/430531.meta.js
// @installURL http://userscripts.org/scripts/source/430531.user.js
// @include    http://good-zona.ru/*
// @copyright  2014+, Lev Kitsis
// ==/UserScript==


var objData = {};

function processObj(key, swichObj) {
  var $swichObj = $(swichObj);
  var tagname = $swichObj.prop('tagName').toLowerCase();
  var id = tagname+'_'+key;
  objData[id] = {
    'obj_tag': tagname,
    'obj_key': key,
    'obj_id': id,
    'html': $swichObj.html() || '',
    'attr': {
        'id': $swichObj.attr('id') || '',
        'name': $swichObj.attr('name') || '',
        'type': $swichObj.attr('type') || '',
        'data': $swichObj.attr('data') || '',
        'wmode': $swichObj.attr('wmode') || '',
        'allowscriptaccess': $swichObj.attr('allowscriptaccess') || '',
        'allowfullscreen': $swichObj.attr('allowfullscreen') || '',
        'pluginspage': $swichObj.attr('pluginspage') || '',
        'src': $swichObj.attr('src') || '',
        'height': $swichObj.attr('height') || '',
        'width': $swichObj.attr('width') || ''
    }
  };  
    $swichObj.before('<div id="'+id+'" class="btn_swich swich_deactive"><b><font color=blue size=3>SWICH ('+tagname+') ['+objData[id]['attr']['src'].substring(0,40)+']</font></b></div>');
  $swichObj.remove();
}

function check_iframes() {
  $('object').each(processObj);
  $('iframe').each(processObj);
  $('embed').each(processObj);
  $('.btn_swich').on('click', switch_obj);
}



function switch_obj() {
    var $btn = $(this);
    var id = $(this).attr('id');
    var d = objData[id];
    
    if($btn.hasClass( 'swich_deactive' )) {
      $btn.removeClass('swich_deactive');
      var str = '';
	  for (key in d['attr']) {
        if (d['attr'][key] != '') {
          str += ' '+key+'="'+d['attr'][key]+'"';
        }
      }
      $btn.after('<div id="obj_'+id+'" class="obj_swich"><'+d['obj_tag']+str+'>'+d['html']+'</'+d['obj_tag']+'></div>');
    } else {
      $btn.addClass('swich_deactive');
      $('#obj_'+id).remove();  
    }
}



var url = location.href;

unsafeWindow.switch_obj = switch_obj;

if(typeof $ === 'function') {
  check_iframes();
} else if(console && console.log) {
  console.log('IFRAME/FLASH switcher: jQuery is not defined', unsafeWindow);
}
