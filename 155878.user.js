// ==UserScript==
// @name Tumblr - Custom Photosets (native prototype version)
// @namespace photo_custom
// @description Use custom photoset layouts, without extra libraries.
// @include http://www.tumblr.com/new/photo
// @include http://www.tumblr.com/new/dashboard
// @include http://www.tumblr.com*
// @version 2.1
// ==/UserScript==
var source = ' '+"\n"+
'window.previously_uploaded = 0; window.valid = ""; window.total = 0; '+"\n"+
'window.new_file_wait = function(){ '+"\n"+
' new PeriodicalExecuter(function(pe){ '+"\n"+
' if($$(\'.thumb\').length != window.previously_uploaded){ //new photos added '+"\n"+
' pe.stop(); '+"\n"+
' window.previously_uploaded = $$(\'.thumb\').length; '+"\n"+
' $$("#custom_layout_input div")[0].update(\'\'); '+"\n"+
' $$("#custom_layout_input div")[1].update(\'\'); '+"\n"+
' $$(\'.thumb\').each(function(thumb){ '+"\n"+
' $$("#custom_layout_input div")[0].insert(\'1\'); '+"\n"+
' $$("#custom_layout_input div")[1].insert(\'1\'); '+"\n"+
' }); '+"\n"+
' } '+"\n"+
' }, 1); '+"\n"+
'} '+"\n"+
'window.pepeat = 0; '+"\n"+
'new PeriodicalExecuter(function(pe) { '+"\n"+
' if ($$(\'#post_content div\')[0]!=null && window.pepeat==0){ '+"\n"+
' pe.stop(); '+"\n"+
' window.pepeat++; '+"\n"+
' Tumblr.PostForms.Photo.prototype.layouts = {"1": [1], '+"\n"+
' "2": [11], '+"\n"+
' "3": [111], '+"\n"+
' "4": [1111], '+"\n"+
' "5": [11111], '+"\n"+
' "6": [111111], '+"\n"+
' "7": [1111111], '+"\n"+
' "8": [11111111], '+"\n"+
' "9": [111111111], '+"\n"+
' "10": [1111111111] }; //all vertical by default '+"\n"+
' window.long_property_path = {}; '+"\n"+
' Tumblr.PostForms.Photo.prototype.render_cells = function(){ '+"\n"+
' window.long_property_path = this; // right to the bottom of the massive Tumblr object '+"\n"+
' window.identical_render(this); '+"\n"+
' } '+"\n"+
' window.thumb_length = $$(\'.thumb\').length; '+"\n"+
' var input = new Element("div"); '+"\n"+
' input.setStyle({fontSize:"12px", '+"\n"+
' height:"16px", '+"\n"+
' display:"block", '+"\n"+
' position:"relative", '+"\n"+
' width:"120px", '+"\n"+
' padding:"5px", '+"\n"+
' border:"3px inset #A8B2B9"}); '+"\n"+
' '+"\n"+
' input.writeAttribute({id:"custom_layout_input"}); '+"\n"+
' var div_zero = new Element("div"); '+"\n"+
' div_zero.setStyle({fontFamily:"monospace", '+"\n"+
' fontSize:"12px", '+"\n"+
' height:"23px", '+"\n"+
' display:"block", '+"\n"+
' position:"absolute", '+"\n"+
' top:"5px", '+"\n"+
' left:"5px", '+"\n"+
' width:"120px", '+"\n"+
' color:"rgba(0,0,0,0.1)", '+"\n"+
' zIndex:"999"}); '+"\n"+
' var highlight = new Element("div"); '+"\n"+
' highlight.setStyle({fontFamily:"monospace", '+"\n"+
' fontSize:"12px", '+"\n"+
' height:"23px", '+"\n"+
' display:"block", '+"\n"+
' position:"absolute", '+"\n"+
' top:"5px", '+"\n"+
' left:"5px", '+"\n"+
' width:"120px", '+"\n"+
' color:"#000", '+"\n"+
' zIndex:"900"}); '+"\n"+
' div_zero.writeAttribute({contenteditable:"true"}); '+"\n"+
' div_zero.update(\'0\'); '+"\n"+
' highlight.update(\'0\'); '+"\n"+
' input.insert(div_zero); '+"\n"+
' input.insert(highlight); '+"\n"+
' var s=\' \'; '+"\n"+
' $$(\'#post_content div\')[0].insert({after: \'<div style="font-size:11px;font-family:monospace;font-weight:bold;">\'+ '+"\n"+
' \'<span style="color:#F00">usage: </span>enter 1, 2, or 3 for each row<br/>\'+ '+"\n"+
' \'<span style="color:#F00">example: </span>121<br/>\'+ '+"\n"+
' \'<span style="color:#F00">will be: </span>row1 has 1 pic<br/>\'+ '+"\n"+
' s+s+s+s+s+s+s+s+s+\'row2 has 2 pics<br/>\'+ '+"\n"+
' s+s+s+s+s+s+s+s+s+\'row3 has 1 pic<br/>\'+ '+"\n"+
' \'<span style="color:#F00">as for: </span>1111<br/>\'+ '+"\n"+
' \'<span style="color:#F00">will be: </span>1 pic on each row.\'+ '+"\n"+
' \'</div>\'}); '+"\n"+
' var use_custom = new Element("input"); '+"\n"+
' use_custom.writeAttribute({id:"tiny_option",type:"button", value:"Use Custom"}); '+"\n"+
' Event.observe(use_custom, \'click\',function(){ '+"\n"+
' while(window.total<$$(\'.thumb\').length){ '+"\n"+
' window.valid+="1"; '+"\n"+
' } '+"\n"+
' if(window.total==$$(\'.thumb\').length){ '+"\n"+
' window.identical_render(false, window.valid); '+"\n"+
' } '+"\n"+
' }); '+"\n"+
' $$(\'#post_content div\')[0].insert({after: use_custom}); '+"\n"+
' '+"\n"+
' Event.observe(div_zero, \'keyup\', function(event){ '+"\n"+
' var value = $$("#custom_layout_input div")[0].innerHTML; '+"\n"+
' $$("#custom_layout_input div")[1].update(value); '+"\n"+
' if(!value.match(/^[^123]$/)){ '+"\n"+
' $$("#custom_layout_input div")[1].update(value.replace(/([^123]+)/g,"<span style=\\"color:#F00\\">$1</span>")); '+"\n"+
' } '+"\n"+
' window.valid = ""; '+"\n"+
' window.total = 0; '+"\n"+
' for(var i=0; i<value.length; i++){ '+"\n"+
' if(value.charAt(i).match(/[123]/)!=null){ '+"\n"+
' if(window.total<$$(\'.thumb\').length) '+"\n"+
' window.valid+=value.charAt(i); '+"\n"+
' window.total+=parseInt(value.charAt(i)); '+"\n"+
' } '+"\n"+
' } '+"\n"+
' if(window.total>$$(\'.thumb\').length){ '+"\n"+
' var fi = 0; '+"\n"+
' for(var i=0;i<$$(\'.thumb\').length;i++){ '+"\n"+
' sum+=parseInt(value.charAt(i)); '+"\n"+
' fi++; '+"\n"+
' } '+"\n"+
' var invalid_sum = new RegExp("(^.{"+fi+"})(.+$)"); '+"\n"+
' $$("#custom_layout_input div")[1].update(value.replace(invalid_sum,"$1<span style=\\"color:#F00\\">$2</span>")); '+"\n"+
' var temp = $$("#custom_layout_input div")[1].innerHTML; '+"\n"+
' $$("#custom_layout_input div")[1].update((temp.substring(0,fi).replace(/([^123]+)/g,"<span style=\\"color:#F00\\">$1</span>"))+temp.substring(fi, temp.length)); '+"\n"+
' window.total=$$(\'.thumb\').length; '+"\n"+
' } '+"\n"+
' }); '+"\n"+
' $$(\'#post_content div\')[0].insert({after:input}); '+"\n"+
' if($(\'photo_file_input\') != null){ '+"\n"+
' Event.observe($(\'photo_file_input\'), \'click\', window.new_file_wait); '+"\n"+
' Event.observe($(\'photo_file_input\'), \'drop\', window.new_file_wait); '+"\n"+
' } '+"\n"+
' } '+"\n"+
'}, 1); '+"\n"+
'window.identical_render = function(t, layout) { '+"\n"+
' if(t==false) '+"\n"+
' t=window.long_property_path; '+"\n"+
' t.$(\'.row\').remove(); '+"\n"+
' t.photo_spinner.stop(); '+"\n"+
' t.$(\'#photo_caption\').show(); '+"\n"+
' t.$(\'.tag_editor\').show(); '+"\n"+
' var html = \'\'; '+"\n"+
' var rows = (typeof layout == \'undefined\')? t.layout : layout; '+"\n"+
' var i, j, k, cell_count; '+"\n"+
' for (i = 0, k = 0; i < rows.length; i++) { '+"\n"+
' cell_count = Number(rows[i]); '+"\n"+
' html += \'<div class="row clearfix">\'; '+"\n"+
' var colspan = cell_count == 1 ? 3 : 1; '+"\n"+
' var gutter_count = cell_count - 1; '+"\n"+
' var gutter_space = gutter_count * 10; '+"\n"+
' var width = (500 - gutter_space) / cell_count; '+"\n"+
' for (j = 0; j < cell_count; j++, k++) { '+"\n"+
' html += t.lighttable_template({ '+"\n"+
' width: t.photos.length == 1 ? t.determine_width(t.photos[k], width) : width, '+"\n"+
' controls: !t.post || !t.post.is_reblog, '+"\n"+
' individual_captions: t.photos.length > 1, '+"\n"+
' linkthrough: t.photos.length == 1, '+"\n"+
' link_url: t.post && t.post.link_url, '+"\n"+
' data_url: t.photos[k].url, '+"\n"+
' filename: encodeURIComponent(t.photos[k].filename || t.photos[k].id), '+"\n"+
' caption: t.photos[k].caption '+"\n"+
' }) '+"\n"+
' } '+"\n"+
' html += \'</div>\'; '+"\n"+
' } '+"\n"+
' t.$(\'.photos .item\').remove(); '+"\n"+
' t.$(\'.photos\').append(html); '+"\n"+
' if (t.photos.length > 1) { '+"\n"+
' t.initialize_lighttable() '+"\n"+
' } else { '+"\n"+
' setTimeout(t.show_photos.bind(t), 200); '+"\n"+
' if (t.lighttable) t.destroy_lighttable() '+"\n"+
' } '+"\n"+
' if (t.post && t.post.is_reblog) { '+"\n"+
' if (t.lighttable) { '+"\n"+
' t.destroy_lighttable() '+"\n"+
' } '+"\n"+
' t.$(\'.photo_field\').hide(); '+"\n"+
' return '+"\n"+
' } '+"\n"+
' if (t.photos.length == t.model.max_number_of_files) { '+"\n"+
' t.$(\'.photo_field\').hide() '+"\n"+
' } else { '+"\n"+
' t.$(\'.photo_field\').show().addClass(\'small\'); '+"\n"+
' t.$(\'.url_button\').hide(); '+"\n"+
' t.$(\'.help .default_text\').hide(); '+"\n"+
' t.$(\'.help .additional_text\').show(); '+"\n"+
' t.$(\'.help_text\').show() '+"\n"+
' } '+"\n"+
'}';

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
var addthis = document.createTextNode(source);
script.appendChild(addthis);
document.body.appendChild(script); 