// ==UserScript==
// @name           Minimal BeeMp3
// @namespace      http://userscripts.org/users/54612
// @include        http://beemp3.com/
// @version        0.1
// ==/UserScript==

function get_body() {
  var d = unsafeWindow.document;
  var body_e = d.getElementsByTagName('body')[0];
  //FIXME - Check for nil
  return body_e;
}
function set_body_html(html) {
  get_body().innerHTML = html;
}
function clear_page() {
  get_body().innerHTML = '';
}
function add_page_element(e) {
  get_body().appendChild(e);
}
function get_search_form_html() {
  var html = "<form name='form1' method='get' action='http://beemp3.com/index.php'>"+
"<input name='q' size='25' type='text'>"+
"<input name='Submit' id='Submit' value='Search' type='submit'><br>"+
"<input type=radio name='st' value='all' checked><b> All&nbsp;</b>"+
"<input type=radio name='st' value='song'><b> Song&nbsp;</b>"+
"<input type=radio name='st' value='album'><b> Album&nbsp;</b>"+
"<input type=radio name='st' value='artist'><b> Artist&nbsp;</b>"+
"</form>";
  return html;
}
function get_top_downloads_html() {
  var all_link_elements = unsafeWindow.document.getElementsByTagName('a');
  var out = '';           
  if (!all_link_elements) return '';
  for (i=0;i<all_link_elements.length;i++) {
     var e = all_link_elements[i];
     var href = e.href;
     if (href) {
       if (href.match(/\/download\.php\?/)) {
         out = out + "<a href='" + href + "'>" + e.innerHTML + "</a><br>";
       }
     }
  }
  return out;             
}

function get_search_downloads_html() {
  var all_link_elements = unsafeWindow.document.getElementsByTagName('a');
  var out = '';           
  if (!all_link_elements) return '';
  for (i=0;i<all_link_elements.length;i++) {
     var e = all_link_elements[i];
     var href = e.href;
     var link_text = e.innerHTML;
     var onmouse = e.onmouseover;
     if (onmouse) {
       onmouse();
       link_text = document.getElementById('div1').innerHTML;
       var song = null;
       var artist = null;
       var bitrate = null;
       if (link_text) {
       //<table class="popup"><tbody><tr class="first_1"><td><b>Artist:</b> </td><td>Elvis Presley</td></tr><tr class="first_2"><td><b>Song:</b> </td><td>Fool Fool Fool</td></tr><tr class="first_1"><td><b>Album:</b> </td><td>The Hound - July 11, 1992</td></tr><tr class="first_2"><td><b>Year:</b> </td><td>0</td></tr><tr class="first_1"><td><b>Genre: </b></td><td></td></tr><tr class="first_2"><td><b>Duration:</b> </td><td>00:01:51</td></tr><tr class="first_1"><td><b>Bitrate: </b></td><td>32000</td></tr><tr class="first_2"><td><b>Frequency: </b></td><td>22050</td></tr></tbody></table>
         result = link_text.match(/<b>Artist:\s*<\/b>\s*<\/td><td>([^<]*)<\/td>/);
         if (result && result[1]) artist = result[1];
         result = link_text.match(/<b>Song:\s*<\/b>\s*<\/td><td>([^<]*)<\/td>/);
         if (result && result[1]) song = result[1];
         result = link_text.match(/<b>Bitrate:\s*<\/b>\s*<\/td><td>([^<]*)<\/td>/);
         if (result && result[1]) bitrate = result[1];
         if (song && artist) {
           link_text = song + ' - ' + artist + ' (' + bitrate + 'kbps)';
         }
         else {
          link_text = null;
         }
       }

     }
     if (link_text && href) {
       //function may_hren(artist, song, album, year, genre, duration, bitrate, frequency)
       //Example: may_hren('Elvis Presley','Fool Fool Fool','The Hound - July 11, 1992','0','','00:01:51','32000','22050');"
       if (href.match(/\/download\.php\?/)) {
         //var result = onmouse.match(/may_hren\('(.*)','(.*)'/);
         //if (result) {
         //  link_text = result[1] + ' - ' + result[2];
         //}
         out = out + "<li><a href='" + href + "'>" + link_text + "</a><br>";
       }
     }
  }
  return out;             
}

//FIXME - Prettier way to make location a string ?
var my_url = '' + unsafeWindow.location; 

//Page to download an individual file.
if (my_url.match(/^http:\/\/beemp3.com\/download.php\?file=/)) {
  unsafeWindow.show_url('');
  var d = unsafeWindow.document;
  //alert(d.location);
  link_div_e = d.getElementById('ssilka');
  clear_page();
  add_page_element(link_div_e);
  current_inner_html = link_div_e.innerHTML;
  result = current_inner_html.match(/'(go_r\.php\S+)'/);
  //alert(result[1]);
  var links_html = "<a href='http://beemp3.com/" + result[1] + "'>download</a> | <a href='http://beemp3.com'>beemp3 home</a>";
  var new_inner_html = links_html + "<hr>" + get_search_form_html();
  //alert(new_inner_html);
  set_body_html(new_inner_html);
}
//Page resulting from a query.
else if (my_url.match(/^http:\/\/beemp3.com\/index.php\?q=/)) {
  var search_downloads_html = get_search_downloads_html();
  if (search_downloads_html) {
    clear_page();
    var html = search_downloads_html + "<hr>" + get_search_form_html();
    set_body_html(html);
  }
  //FIXME - print message when search_download_html is empty
}
//Top, main beemp3 page
else if (my_url.match(/^http:\/\/beemp3.com\/$/)) {
  var top_downloads_html = get_top_downloads_html();
  if (top_downloads_html) {
    clear_page();
    var new_inner_html = top_downloads_html + "<hr>" + get_search_form_html();
    set_body_html(new_inner_html);
  }
}
