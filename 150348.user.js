// ==UserScript==

// @name           SGE Style

// @namespace      www.eintracht.de

// @include        http://www.eintracht.de/*

// ==/UserScript==
 

function addGlobalStyles()

{

    var head, style;

    head = document.getElementsByTagName('head')[0];

    if (!head) { return; }

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div.span24 { width: 1400px ! important}';
    head.appendChild(style);


    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div.span18 { width: 1000px ! important}';
    head.appendChild(style);



    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div.span6 { width: 180px ! important}';
    head.appendChild(style);
 

    style = document.createElement('style')
    style.type = 'text/css';
    style.innerHTML = 'body { color: #000000 ! important; font-size: 13px ! important; font-weight: 500 ! important; font-family:arial,verdana,geneva,sans-serif !important;}';
    head.appendChild(style);
   

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div[class="box span6"]{display:none !important;}';
    head.appendChild(style);


    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div[class="social-media pull-right"]{display:none !important;}';
    head.appendChild(style);


    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div[class="ads scyscraper"]{display:none !important;}';
    head.appendChild(style);


    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div[class="span24"]{display:none !important;}';
    head.appendChild(style);


    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div[class="span24 footer"]{display:none !important;}';
    head.appendChild(style);


    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div[class="span2 bundesliga-member-wrapper"]{display:none !important;}';
    head.appendChild(style);





    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.container { margin-left: 10px ! important}';
    head.appendChild(style);

 

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.content-wrapper { background: none ! important; box-shadow: 0px 0px 0px black ! important; border-bottom-left-radius: ! important; border-bottom-right-radius: ! important}';
    head.appendChild(style);
 

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div.message_body {  font-size:  10pt ! important; }';
    head.appendChild(style);


    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.content h1 { font-size: 15px ! important; }';
    head.appendChild(style);

//    style = document.createElement('style');
//    style.type = 'text/css';
//    style.innerHTML = '.content { background: transparent ! important}';
//    head.appendChild(style);
//

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'div.message_info a.user { font-size: 13px ! important; }';
    head.appendChild(style);

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'table.board_list_forums td.col1 { padding:   3px 5px 3px 7px ! important; }';
    head.appendChild(style);

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '#Left .navigation a { text-decoration: none ! important}';
    head.appendChild(style);

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '#Left .navigation a { color: #000000 ! important}';
    head.appendChild(style);

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '#Left .navigation a:hover { color: #d70014 ! important}';
    head.appendChild(style);

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '#Left .navigation a.current { color: #d70014 ! important}';
    head.appendChild(style);

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'form.board_post_form div#buttons span#fontcolor_list[id] {   margin-left: 72px; ! important}';
    head.appendChild(style);

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.subnavigation.nav-list li a span {  font-size: 12px; ! important ; color: #000000 ! important }';
    head.appendChild(style);

    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.subnavigation { background: white ! important }';
    head.appendChild(style);
 
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.subnavigation.nav-list > li.active { background:  #D10D0D; ! important }';
    head.appendChild(style);
 
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'h1, h2, h4, h5, h6 { font-weight: 500 ! important; line-height: 1 ! important }';
    head.appendChild(style);

}
addGlobalStyles();
