// ==UserScript==
// @name       Redmine TCE
// @namespace  http://mcdave.net
// @version    0.1
// @description  new style for tickets
// @match      http://tickets.the-cocktail.com/*
// @copyright  2013+, @mcdave & @pausansol
// ==/UserScript==

( function() {
    
    //======== Useful Sub-routines =====
    GM_addGlobalStyle=function(css) { // Redefine GM_addGlobalStyle with a better routine
        var sel=document.createElement('style'); sel.setAttribute('type','text/css'); sel.appendChild(document.createTextNode(css));
        var hel=document.documentElement.firstChild; while(hel && hel.nodeName!='HEAD') { hel=hel.nextSibling; }
        if(hel && hel.nodeName=='HEAD') { hel.appendChild(sel); } else { document.body.insertBefore(sel,document.body.firstChild); }
        return sel;
    }
    
    GM_addGlobalStyle(''
                      +' body { background: #f1f2ec; }'
                      +' #footer { display: none; } '
                      
                      +' #top-menu { background: transparent; padding: 10px 0 0; position: relative; }'
                      +' #top-menu a { font-weight: normal; color: #999; background-image: none !important; padding: 0 !important; font-size: 10px; text-transform: uppercase; }'
                      +' #top-menu #loggedas { color: transparent; display: none; }'
                      +' #top-menu #account { position: absolute; right: -160px; }'
                      +' #top-menu > ul { float: right; }'
                      +' #top-menu .help, #account .logout { display: none; }'
                      +' .action-account .logout { display: inline; }'
                      
                      +' #wrapper { margin: 0 auto;  max-width: 960px; background: transparent; }'
                      +' #header { background: transparent; padding: 20px 0; height: auto; }'
                      +' #header h1 { background-color: transparent; color: #333; font-weight: normal; }'
                      +' #main-menu { background-color: #fff; border: 0; position: static; text-align: center; box-shadow: 4px 4px 0 rgba(0,0,0,0.06); }'
                      +' #main-menu li { float: none; display: inline-block; }'
                      +' #main-menu li a { background-color: transparent; color: #333; padding: 10px 12px; margin: 0 5px 0 0; }'
                      +' #main-menu li a.selected, #main-menu li a.selected:hover, #main-menu li a:hover { background: transparent; border-bottom: 3px solid #98B80F; box-shadow: 0 3px 0 rgba(152, 184, 15, 0.15); }'
                      
                      +' #main { background: transparent; position: relative; padding-bottom: 30px }'
                      +' #main a { color: #777; -webkit-transition: all 200ms ease-out; border-bottom: 1px dotted transparent; }'
                      +' #main *:hover > a { border-color: #777 !important; }'
                      +' #main a:hover { color: #333; text-decoration: none; border-bottom-color: #333; }'
                      +' #content { width: 100%; box-sizing: border-box; padding: 20px; border: 0; box-shadow: 4px 4px 0 rgba(0,0,0,0.06); }'
                      
                      +' #sidebar { -webkit-transform: translateX(100%); border-box; padding: 0 20px; position: absolute; right: 0;}'
                      +' #sidebar a { line-height: 2em; }'
                      
                      +' .controller-issues.action-show #content { background: transparent; padding: 20px 0; border: 0; box-shadow: none; }'
                      +' #content > .issue { box-shadow: 4px 4px 0 rgba(0,0,0,0.06); border: 0; padding: 30px; margin-bottom: 30px; }'
                      +' .controller-issues.action-show #sidebar { padding-top: 80px; }'
                      +' div.issue img.gravatar { width: 80px; margin: -15px 10px 10px -10px; }'
                      +' div.issue table.attributes { width: 80%; margin: 30px 0; }'
                      +' .other-formats { display: none }'
                      
                      +' #history { padding: 0 30px; }'
                      +' #history .journal { padding: 20px; background: rgba(255,255,255,1); margin-bottom: 20px; box-shadow: 4px 4px 0 rgba(0,0,0,0.06); }'
                      +' #history .journal h4 { margin: 0 0 20px 0; padding-top: 10px; border: 0; color: #ccc; font-weight: normal; }'
                      +' #history .journal .details { margin: 0 0 30px; }'
                      +' #history .journal img.gravatar { margin: -5px 5px 0px 0px; width: 30px; }'
                      
                      +' .contextual, #watchers a.delete, .journal-link { opacity: 0; -webkit-transition: all 200ms ease-out; }'
                      +' #watchers a.delete { float: right; }'
                      +' *:hover > .contextual, *:hover > a.delete, *:hover > .journal-link { opacity: 1 !important; }'
                      
                      +' h2 { font-weight: normal; letter-spacing: 0; padding: 0; margin-bottom: 20px; }'
                      +' img.gravatar { border: 0; border-radius: 50%; box-shadow: 1px 2px 0 rgba(0,0,0,0.05); }'
                      
                      +' //input[name=commit], input[name=continue] { background: transparent; border: 3px solid #333; border-radius: 20px; padding: 10px 20px; text-transform: uppercase; font-weight: bold; color: #333; font-size: 13px; margin-top: 10px; margin-right: 10px; }'
                      
                     );
    
} )();