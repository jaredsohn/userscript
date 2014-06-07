// ==UserScript==
// @name          DSL.SK Redesign
// @description   Redesign of page www.dsl.sk
// @author        jan.kotulak
// @version       2.0
// @include       http://www.dsl.sk/*
// @include       http://dsl.sk/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==



(function() {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG4KHjNuCh4zbgoeMwAAAAAAAAAAAAAAAAAAAABrCx9AbAshXAAAAAAAAAAAbgoeM24KHjNuCh4zAAAAAAAAAABqCh/aagof2moKH9pqCh/abAshXAAAAABsCh/Dagof2moKH9psCh/DAAAAAGwKH8NqCh/abAofw2sJIE4AAAAAagof2m4KHjMAAAAAbAshXGoKH9oAAAAAawkgTgAAAABuCh4zagof2gAAAABsCh/DbAofegAAAAAAAAAAAAAAAGwKH8NrCx5rAAAAAAAAAABqCh/abAshXAAAAAAAAAAAbAofw2wLIK4AAAAAbAofemwLIK4AAAAAAAAAAAAAAABsCh/DbAofegAAAAAAAAAAbAofw2sLHmsAAAAAagsgnGwKH8MAAAAAAAAAAGsLHmtsCh/DAAAAAAAAAAAAAAAAbAofemwLIK4AAAAAbAshXGoKH9pwCh4Zaw0hJmoKH9pwCh4ZawsfQAAAAABuCh4zagof2gAAAAAAAAAAAAAAAGsLHmtsCyD/agof2moKH9psCyFcAAAAAAAAAABqCh/abAofw2oKH9prCx9Aaw0hJmoKH9oAAAAAAAAAAAAAAAAAAAAAbgoeM24KHjMAAAAAAAAAAAAAAAAAAAAAcAoeGW4KHjNwCh4ZAAAAAAAAAABuCh4zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8mAP//JgD//yYA//8mAI8xJgCCECYAkpMmAJmTJgCZMyYAkBMmAIMDJgDPGyYA//8mAP//JgD//yYA//8mAA==';
    document.getElementsByTagName('head')[0].appendChild(link);
}());


$('#bg > table:nth-child(3) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)').remove();
$('#header > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(2)').remove();
$('#body > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)').remove();


$('#body > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2)').remove();

$('#body > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1)').removeAttr('width');
$('#news_box').removeAttr('style');
$('#news_box').css('font-size','11px');

