// ==UserScript==
// @name        Ubuntu-it Mod Helper
// @description Ubuntu-it Mod Helper
// @include     http://forum.ubuntu-it.org/memberlist.php*
// @grant       none
// ==/UserScript==

$('a[href^="./memberlist.php?mode=viewprofile&u="]').each(function(){
    var $link = $(this);
    var href = $link.attr('href');
    var name = $link.text();
    var $locations = $link.parent().next().next();
    var id = href.replace('./memberlist.php?mode=viewprofile&u=','');
    $.get('http://forum.ubuntu-it.org/mcp.php?i=notes&mode=user_notes&u='+id,function(data){
        $('form td',$(data)).filter(function(){ 
            return (/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/).test( $(this).text() ); 
        }).each(function(){
            $locations.append($(this).text());
        });
    })
    $.get(href,function(data){
        var email = $('a[href^="mailto"]',$(data)).attr('href').substr(7);
        $link.after(' ('+email+')');
    });
});
