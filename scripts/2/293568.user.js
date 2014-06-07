// ==UserScript==
// @name       RYM: Quick Edit List
// @version    0.1
// @description  inline editing of list items
// @match      https://rateyourmusic.com/lists/edit*
// @copyright  2014+, thought_house
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$('#list_content .picturebutton').after('<br /><a class="smallbutton quick_edit" href="#">quick edit</a>');

$('.quick_edit').on('click', function(event) {
    event.preventDefault();
    if (!$(this).data('editing')) {
    	$(this).data('editing', true);
        var $td = $(this).closest('tr').children('td:last');
        var html = $td.html().replace(/.*?<br><br>/, '');
        var title = $td.html().match(/.*?<br><br>/, '')[0];
        var item_type = '';
        var assoc_id = 0;
        var item_name = '';
        if (title.match(/class="album"/)) {
            item_type = 'l';
        } else if (title.match(/class="artist"/)) {
            item_type = 'a';
        } else if (title.match(/class="label"/)) {
            item_type = 'b';
        } else if (title.match(/class="film"/)) {
            item_type = 'F';
        } else if (title.match(/class="user."/)) {
            $(this).remove();
            return;
        } else {
            item_type = 'g';
            item_name = $td.find('b:first').text();
        }
        if (item_type == 'l') {
        	assoc_id = parseInt($td.find('a:eq(1)').attr('title').match(/\d*]/)[0]);
        } else if (item_type == 'g') {
            assoc_id = 0;
        } else {
            assoc_id = parseInt($td.find('a:eq(0)').attr('title').match(/\d*]/)[0]);
        }
        $td.data('html', html);
        var text = html.replace(/<br>/g, "\n");
        text = text.replace(/<a class="normal_link".*?rel="nofollow".*?href="(.*?)" target="_blank">(.*?)<\/a>/g, '[$1,$2]');
        text = text.replace(/<strong class="rymfmt">/g, '[b]').replace(/<\/strong>/g, '[/b]');
        text = text.replace(/<em class="rymfmt">/g, '[i]').replace(/<\/em>/g, '[/i]');
        text = text.replace(/<s>/g, '[s]').replace(/<\/s>/g, '[/s]');
        text = text.replace(/<span style="color:(.*?);">(.*?)<\/span>/g, '[color $1]$2[/color]');
        text = text.replace(/<blockquote class="rymfmt">/g, '[blockquote]').replace(/<\/blockquote>/g, '[/blockquote]');
        text = text.replace(/<a href="\/wiki_deprecated\/.*?">(.*?)<\/a>/g, '[wp:$1]');
        text = text.replace(/<a class="wiki_link" href="\/wiki\/(.*?)">.*?<\/a>/g, '[wiki:$1]');
        text = text.replace(/<ul class="rymfmt">/g, '[ul]').replace(/<\/ul>/g, '[/ul]');
        text = text.replace(/<ol class="rymfmt">/g, '[ol]').replace(/<\/ol>/g, '[/ol]');
        text = text.replace(/<li class="rymfmt">/g, '[li]').replace(/<\/li>/g, '[/li]');
        text = text.replace(/<tt class="rymfmt">/g, '[tt]').replace(/<\/tt>/g, '[/tt]');
        text = text.replace(/<a title="\[(.*?)\]" href=".*?" class="(artist|album|label)"(?:(?!<\/a>).)+\[.*?<\/a>/g, '[$1]');
        text = text.replace(/<a title="\[(.*?)\]" .*?class="(artist|album|label)">(.*?)<\/a>/g, '[$1,$3]');
        text = text.replace(/<a title="\[(.*?)\]" .*?>.*?<\/a>/g, '[$1]');
        text = text.replace(/<span title="\[(.*?)\]">\.\.\.<\/span>/g, '[$1]');
        text = text.replace(/<a class="user.?" href="\/~.*?">(.*?)<\/a>/g, '[~$1]');
        text = text.replace(/<span class="userd">(.*?)<\/span>/g, '[~$1]');
        text = text.replace(/<div class="rsummaryframe" .*?<a href="\/collection\/.*?\/rating(\d*?)">[\s\S]*?<div class="clear"> <\/div>/g, '[Rating$1]');
        text = text.replace(/<a class="list" href="(.*?)">(.*?)<\/a>/g, '[http://rateyourmusic.com$1,$2]');
        text = text.replace(/<div class="youtube_container" id="youtube_container_.*?" data-youtube-id="(.*?)">[\s\S]*?<\/a>\s*?<\/div>/g, '[YouTube $1]');
        text = text.replace(/<a href="\/rymzilla\/view\?id=(\d*?)" style=".*?" class="bug_a">.*?<\/a>/g, '[Bug$1]');
        text = text.replace(/<span id="spoiler\d*?">[\s\S]*?<span id="spoilerinner\d*?" style="display:none;">([\s\S]*?)<\/span>/g, '[spoiler]$1[/spoiler]');
        text = text.replace(/<a href="\/board_message\?message_id=\d*&amp;find=(\d*)&amp;x=m#msg\d*">(.*?)<\/a>/g, '[Post$1,$2]');
        var lines = text.match(/\n/g);
        var height = Math.max(8, lines ? lines.length + 1 : 8);
        
        var $form = $('<form method="POST" action="/lists/new_item_2"></form>');
        $form.append('<textarea rows="' + height + '" style="width:100%" name="item_description">' + text + '</textarea><br>');
        var $save = $('<input type="submit" class="picturebutton quick_save" value="Save">');
        var $cancel = $('<a href="#" class="smallbutton quick_cancel">Cancel</a>');
        $form.append($save);
        $form.append($cancel);
        $form.append('<input type="hidden" name="item_name" value="' + item_name + '">');
        $form.append('<input type="hidden" name="page" value="' + unsafeWindow.currentPage + '">');
        $form.append('<input type="hidden" name="list_id" value="' + location.search.match(/list_id=\d*/)[0].replace('list_id=', '') + '">');
        $form.append('<input type="hidden" name="item_type" value="' + item_type + '">');
        $form.append('<input type="hidden" name="item_assoc_id" value="' + assoc_id + '">');
        $form.append('<input type="hidden" name="insert_before" value="-50">');
        $form.append('<input type="hidden" name="item_id" value="' + $(this).closest('tr').find('td:first').text() + '">');
        
        $td.html($td.html().replace(html, ''));
        $td.append($form);
        
        var $button = $(this);
        $cancel.on('click', function(event) {
            event.preventDefault();
            $form.replaceWith(html);
            $button.data('editing', false);
        });
    }
});

GM_addStyle(".quick_save { \
    background-color: #d8d8ff; \
    padding:  5px; \
    margin: 3px; \
    font-family: Verdana,Arial,sans-serif; \
    font-size: x-small; \
    font-weight: 700; \
    border-top: 0px; \
    border-left: 0px; \
    border-right: 1px solid #999; \
    border-bottom: 1px solid #555; \
    cursor: pointer; \
} \
");
GM_addStyle(".quick_save:hover { \
    background-color: #ccf; \
    padding:  5px; \
    margin: 3px; \
    font-family: Verdana,Arial,sans-serif; \
    font-size: x-small; \
    font-weight: 700; \
    border-top: 0px; \
    border-left: 0px; \
    border-right: 1px solid #999; \
    border-bottom: 1px solid #555; \
    cursor: pointer; \
} \
");
    