// ==UserScript==
// @name           Nomads Blog
// @namespace      GLB
// @include        http://goallineblitz.com/game/team.pl?team_id=3446
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

var test = getElementsByClassName('medium_head', document)[3]

test.innerHTML= '<div id="widgetbox_widget_div_0"><embed height="320" width="400" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="wbx_align=left&wbx_theme=wbxtheme10&wbx_title=The%20Nomad%20Tracker&wbx_show_pubdate=true&wbx_stageWidth=400&wbx_show_post=headline%7Cimage&wbx_show_summary=true&wbx_mainimage=http%3A%2F%2Fimg1.blogblog.com%2Fimg%2Ficon18_wrench_allbkg.png&wbx_stageHeight=400&wbx_show_copyright=true&wbx_mainimage_height=18&wbx_tab_1_default_image=http%3A%2F%2Ffiles.widgetbox.com%2Fservices%2Furl.gif&widget_loadVarsUrl=http%3A%2F%2Fcdn.widgetserver.com%2Fsyndication%2Floadvars%2F413a2fbc-58fa-411a-a925-3a0cdf08ce13%2F5%2Fcf75264b-348f-4770-8c6d-dc092d18f25e%2F2%2F2bcec33ef32d219b0ff51612f40b7344c004953b00000121f18c0397%2F0%2F0%2Fwbx%2F1&wbx_blog=http%3A%2F%2Fyukonnomads.blogspot.com&wbx_show_title=both&wbx_orientation=horz&wbx_framerate=12&wbx_hide_themes=false&wbx_mainimage_width=18&wbx_hostname=widgetserver.com&wbx_padding=0%200%200%200&wbx_assets=http%3A%2F%2Ffiles.widgetbox.com%2Fwidgets%2Fblidget%2F&wbx_margin=12%208%2020%208&wbx_vn=49&wbx_feed=http%3A%2F%2Fyukonnomads.blogspot.com%2Ffeeds%2Fposts%2Fdefault&widget_appId=cf75264b-348f-4770-8c6d-dc092d18f25e&widget_regId=413a2fbc-58fa-411a-a925-3a0cdf08ce13&widget_friendlyId=the-nomad-tracker&widget_name=The%20Nomad%20Tracker&widget_token=2bcec33ef32d219b0ff51612f40b7344c004953b00000121f18c0397&widget_id=0&widget_location=http%3A%2F%2Fwww.widgetbox.com%2Fwidget%2Fthe-nomad-tracker&widget_timestamp=1245302124901&widget_serviceLevel=0&widget_width=400&widget_height=320&widget_wrapper=JAVASCRIPT&widget_isAdFriendly=true&widget_isAdEnabled=true&widget_adChannels=42%3DDefault%2520Channel&widget_adPlacement=TL&widget_appPK=127100274&widget_regPK=2966996&widget_providerPK=1517774&widget_userPK=57560226" salign="tl" wmode="transparent" scale="noScale" allowscriptaccess="always" name="widgetbox_widget_flash_0" id="widgetbox_widget_flash_0" type="application/x-shockwave-flash" src="http://files.widgetbox.com/widgets/blidget/blidget.swf?cb=25083"/><a href="http://files.widgetbox.com/widgets/blidget/blidget.swf?cb=25083" class="rgyprdymsizhswaetdwc visible ontop" title="Click here to block this object with Adblock Plus" style="left: 510.5px ! important; top: -320px ! important;"/></div>'
