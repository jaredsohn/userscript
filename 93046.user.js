// ==UserScript==
// @name           J'aime pas le gris
// @include        http://*leagueoflegends.com/board/showthread.php*
// ==/UserScript==
        style = document.createElement("style" );
        style.setAttribute("type", 'text/css');
        style.innerHTML = ".sca_not_agree .post_content,.sca_not_agree .message_footer,.sca_not_agree .avatar_top{opacity:1;}";
        document.body.appendChild(style);