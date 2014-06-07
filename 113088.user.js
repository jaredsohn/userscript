// ==UserScript==
// @name	Podnapisi.net Download Buttons
// @author	NuJumala <nujumala@gmail.com>
// @namespace	www.podnapisi.net
// @include	http://*.podnapisi.net/*/search*
// @description	Adds download buttons to subtitles list (in search).
// @version	1.6.1
// ==/UserScript==

$ = unsafeWindow.jQuery;
if ($ == null) {
  return;
}
$('#ppodnapisiFps').parent().before('<th class="posts">DL</th>');
$('.list_div2 a').each(function(index, element) {
  href = $(element).attr('href');
  matches = href.match(/.*-p(.*)/);
  if(matches) {
    id = 'dl-'+matches[1];
    button = '<td id="'+id+'" align="center"><a rel="'+href+'"><img vspace="5" hspace="5" alt="Podnapisi" src="http://static2.podnapisi.net/images/nextgen/podnapisi/download.gif" class = "slikevvrsti"></a></td>';
    $(element).parent().parent().after(button);
    $(element).parent().prev().hide();
    $('#'+id).click(function() {
      $.ajax({
	url: $('a', this).attr('rel'),
	beforeSend: function(xhr) { xhr.setRequestHeader('X-Requested-With', {toString: function(){ return ''; }}); },
	dataFilter: function(data) { return data; }
      }).done(function(data) {
	window.location.href = $('.#subtitle .footer a', data).attr('href');
      });
    });
  }
});

// EOF
