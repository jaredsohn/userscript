// ==UserScript==
// @name           lepro_love_css
// @author         zloozle
// @include        http://*.leprosorium.ru/*
// @include        http://leprosorium.ru/*
// @version        1.0
// ==/UserScript==

var ih = '.sublepro_main {\n' + 
'color:#000000;\n' + 
'}\n' + 
'.sublepro_main .layout_right_holder {\n' + 
'background-color:#ffffff;\n' + 
'}\n' + 
'.dd .vote {\n' + 
'x-background-color:#ffffff;\n' + 
'background-color:transparent;\n' + 
'}\n' + 
'.comments #content,\n' + 
'.votes #content {\n' + 
'background-image:none;\n' + 
'}\n' + 
'.sublepro_main a {\n' + 
'color:#333300;\n' + 
'}\n' + 
'#reply_link_default a {\n' + 
'color:#333300 !important;\n' + 
'}\n' + 
'.sublepro_main a:hover {\n' + 
'color:#669999 !important;\n' + 
'}\n' + 
'.sublepro_main a:visited {\n' + 
'color:#999966;\n' + 
'}\n' + 
'#president,\n' + 
'#president a,\n' + 
'#parlament a,\n' + 
'#domains_unread,\n' + 
'#domains_unread a,\n' + 
'#tags_add #tags_private a,\n' + 
'#tags_add #tags_private span\n' + 
'{\n' + 
'color:#3d3d3d;\n' + 
'}\n' + 
'#tags_add #tags_private a.del:hover,\n' + 
'.category a,\n' + 
'.category em\n' + 
'{\n' + 
'color:#3d3d3d !important;\n' + 
'}\n' + 
'.category .system a {\n' + 
'border-bottom-color:#3d3d3d;\n' + 
'}\n' + 
'.irony {\n' + 
'color:#cc3333;\n' + 
'}\n' + 
'.sublepro_main h2 {\n' + 
'color:#326ccd;\n' + 
'}\n' + 
'.moderator {\n' + 
'color:#666666;\n' + 
'}\n' + 
'.dd {\n' + 
'color:#666666;\n' + 
'}\n' + 
'.dd a, .dd a:visited {\n' + 
'color:#666666;\n' + 
'}\n' + 
'.comments #content .inuse .vote div span,\n' + 
'.comments #content .mine .vote div span {\n' + 
'background:#ffffff;\n' + 
'}\n' + 
'.dd .vote div span {\n' + 
'color:#9c9c9c;\n' + 
'}\n' + 
'.cloud a,\n' + 
'.cloud a:visited,\n' + 
'.cloud .s2,\n' + 
'.cloud .s3,\n' + 
'.cloud .s4,\n' + 
'.cloud .s5,\n' + 
'.cloud .s6,\n' + 
'.cloud .s7,\n' + 
'.cloud .s8 {\n' + 
'color:#222222 !important;\n' + 
'}\n' + 
'.small,\n' + 
'#reply_form .header a,\n' + 
'#wysiwyg_tools a,\n' + 
'.category span,\n' + 
'#tags_add #tags_new a\n' + 
'{\n' + 
'color:#666666;\n' + 
'}\n' + 
'#reply_form .bottom span {\n' + 
'color:#666666 !important;\n' + 
'border-bottom:1px solid #666666;\n' + 
'}\n' + 
'.sublepro_header h2 a,\n' + 
'.sublepro_header h2 a:hover {\n' + 
'color:#000000 !important;\n' + 
'}\n' + 
'.sublepro_header h2 a:hover {\n' + 
'background-color:#ffffff !important;\n' + 
'}\n' + 
'#navigation #filter,\n' + 
'.category em\n' + 
'{\n' + 
'background-color:#e8e8e8;\n' + 
'}\n' + 
'.comments #content,\n' + 
'.votes #content {\n' + 
'background-image:none;\n' + 
'}\n' + 
'#main .sublepro_main .layout_right_holder {\n' + 
'background-image:url(http://pit.dirty.ru/lepro/202/design/5441-20091228-175050-be8c7abfc7b2bfeb074a6b42d098a363.gif);\n' + 
'background-repeat:repeat-x;\n' + 
'background-position:top left;\n' + 
'}\n' + 
'body #main .sublepro_main .layout_left_sublepro {\n' + 
'background:url(http://pit.dirty.ru/lepro/202/design/5441-20091228-175039-72350b76b61c47af7c96499b3a380af9.gif) no-repeat top left !important;\n' + 
'}\n' + 
'#president {\n' + 
'background-image:url(http://pit.dirty.ru/lepro/202/design/5441-20091228-175143-19fb50b1d7f181c9291f2bcf6f9d9629.gif);\n' + 
'}\n' + 
'#domains_unread {\n' + 
'background-image:url(http://pit.dirty.ru/lepro/202/design/5441-20091228-175155-81cfea582607a5f55c0eefc718051862.gif);\n' + 
'}\n' + 
'.sublepro_header_settings_button a {\n' + 
'background-image:url(http://pit.dirty.ru/lepro/202/design/5441-20110216-175504-279b2f2e47f011e73390c3fe58535e82.gif);\n' + 
'}\n' + 
'.kgb .bg {\n' + 
'background-color:#f7f7f7;\n' + 
'}\n' + 
'.kgb .kgb_sublepro_header_table td, .kgb .kgb_sublepro_header_table td label, .kgb .kgb_sublepro_desc, .kgb_users_table, .kgb .kgb_header, .kgb .kgb_users span {\n' + 
'color:#505050;\n' + 
'}\n' + 
'.kgb a {\n' + 
'color:#333300 !important;\n' + 
'}\n' + 
'.kgb a:hover {\n' + 
'color:#ebebeb !important;\n' + 
'}\n' + 
'.kgb .kgb_arrow_bubble_top {\n' + 
'background-image:url(http://pit.dirty.ru/lepro/202/design/5441-20110216-181849-4ca5e24684ce2f135c1ef1636fab6730.gif);\n' + 
'}\n' + 
'.kgb .kgb_users_next, .kgb .kgb_users_prev {\n' + 
'background-color:#c0c0c0;\n' + 
'}\n' + 
'.dd .vote div a {\n' + 
'background-image:url(http://pit.dirty.ru/lepro/202/design/5441-20110216-180133-3f3b3e6e5df0f0f82d110cc1696f5c2e.gif);\n' + 
'}\n' + 
'.dd .vote div a:hover,\n' + 
'.dd .vote div a.voted {\n' + 
'background-image:url(http://pit.dirty.ru/lepro/202/design/5441-20110216-180159-dc69928747e83c892b6aacb1c7d05e56.gif);\n' + 
'}\n' + 
'.ord .dd .vote div span {\n' + 
'background-image:url(http://pit.dirty.ru/lepro/202/design/5441-20110216-180450-4a167e9e32ad5651e99506011932f03b.gif);\n' + 
'}\n' + 
'#navigation #filter {\n' + 
'background-color:#e9e9e9;\n' + 
'}\n' + 
'#navigation #filter {\n' + 
'background-color:transparent;\n' + 
'}\n' + 
'#president, #parlament {\n' + 
'border-bottom-color:#f7f7f7;\n' + 
'}\n' + 
'#president, #parlament {\n' + 
'border-bottom:none;\n' + 
'}\n' + 
'#comment_textarea,\n' + 
'#tags_input,\n' + 
'#reply_form textarea,\n' + 
'#post_status,\n' + 
'#post_status option,\n' + 
'#navigation #filter #post_status,\n' + 
'#navigation #filter #post_status option {\n' + 
'background-color:#ffffff;\n' + 
'}\n' + 
'#comment_textarea,\n' + 
'#tags_input,\n' + 
'#reply_form textarea,\n' + 
'#post_status,\n' + 
'#post_status option,\n' + 
'#navigation #filter #post_status,\n' + 
'#navigation #filter #post_status option {\n' + 
'color:#000000;\n' + 
'}\n' + 
'#comment_textarea,\n' + 
'#tags_input,\n' + 
'#reply_form textarea {\n' + 
'border-color:#cccccc;\n' + 
'}\n' + 
'#post_status,\n' + 
'#post_status option,\n' + 
'#navigation #filter #post_status,\n' + 
'#navigation #filter #post_status option {\n' + 
'border:none;\n' + 
'}\n' + 
'.highlight4 .new_____ .dt, .highlight4 .new_____ .dd .p {\n' + 
'border-color:#ff0000;\n' + 
'}\n' + 
'.highlight3 .new_____ .dt, .highlight3 .new_____ .dd .p {\n' + 
'background-color:#fdd2f3;\n' + 
'}\n' + 
'.highlight2 .new_____ .dt, .highlight2 .new_____ .dd .p {\n' + 
'background-color:#f7f7f7;\n' + 
'}\n' + 
'.highlight1 .new_____ .dt, .highlight1 .new_____ .dd .p {\n' + 
'background-color:#f7f7f7;\n' + 
'}\n' + 
'.kgb .kgb_minus_users {\n' + 
'border-left-color:#b0b0b0;\n' + 
'}\n' + 
'.dd .pro_hide_post_block {\n' + 
'border:1px solid #e6e6e6;\n' + 
'}\n' + 
'.dd .pro_hide_post_block {\n' + 
'background-color:#ffffff;\n' + 
'}\n' + 
'.dd .pro_hide_post_block a {\n' + 
'color:#383838 !important;\n' + 
'background-color:#ffffff;\n' + 
'}\n' + 
'.dd .pro_hide_post_block a:hover {\n' + 
'color:#383838 !important;\n' + 
'background-color:#e6e6e6;\n' + 
'}\n' + 
'.load_more_posts div {\n' + 
'background-color:#e7e9e8;\n' + 
'}\n' + 
'.load_more_posts_hover div {\n' + 
'background-color:#c7c7c7;\n' + 
'}\n' + 
'.load_more_posts .load_more_posts_inner {\n' + 
'color:#666666;\n' + 
'}\n' + 
'.paginator span em {\n' + 
'color:#ffffff;\n' + 
'}\n' + 
'.paginator span em {\n' + 
'background-color:#ff6c24;\n' + 
'}\n' + 
'.paginator .scrollbar .current_page_point {\n' + 
'background-color:#ff6c24;\n' + 
'}\n' + 
'.paginator .scrollbar .line {\n' + 
'background-color:#cccccc;\n' + 
'}\n' + 
'.paginator .scrollbar .slider {\n' + 
'background-color:#363636;\n' + 
'}\n' + 
'#total_pages, #total_pages.new______total_pages {\n' + 
'color:#666666;\n' + 
'}';

var styles = document.getElementsByTagName('style');
var done = 0;

//alert(styles.length);

for (var i = 0; i < styles.length; i++)
{
  if (styles[i].parentNode.nodeName == 'HEAD' && styles[i].getAttribute('type') == 'text/css')
  {
    styles[i].innerHTML = ih;
    done = 1;
  }
}

//alert('done: ' + done);

if (!done)
{
  var s = document.createElement('style');
  var head = document.getElementsByTagName('title')[0].parentNode;

//  alert('' + !s + ' ' + !head);

  s.type = 'text/css';

  s.innerHTML = ih;
//  alert(s.type + ' ' + s.innerHTML);

//  head.insertBefore(s, head.firstChild);
  head.insertBefore(s, null);
//  alert(s.parentNode.tagName);
}