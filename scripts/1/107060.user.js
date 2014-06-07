// ==UserScript==
// @name           rebuildGELinks
// @description    rebuild sharing-links for drag'n'drop operations
// @version        0.7
// @include        http://www.goldesel.to/*
// @include        http://goldesel.to/*
// ==/UserScript==

if (jQuery)
{
    var linkArr = [];
    var dd = $("div.entry_box_head:contains('Direct-Downloads')").next('div');

    dd.prepend('<textarea wrap="off" cols="60" rows="10" id="linkBox"></textarea>');

    dd.find('div.ddl_1 a').each(function()
    {
        var tis = $(this);
        if (tis.attr('href') == 'http://goldesel.to/dl/')
        {
            tis.css('color', '#f26522');
            $.ajax(
            {
                type: "POST",
                url: 'ajax/oDL.php',
                data: { 'LNK' : tis.attr('target') },
                success: function(response)
                {
                    tis.attr('href', response);
                    tis.removeAttr('onclick');
                    tis.css('color', '#005b7f');
                    linkArr.push(response);
                    $('#linkBox').text(linkArr.sort().join("\n"));
                },
                dataType: 'text'
            });
        }
    });

    $('div.entry_box_head').parent('div').removeAttr('onmouseover');
}