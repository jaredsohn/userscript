    // ==UserScript==
    // @name OGame : Show Fleet Composition
    // @namespace http://userscripts.org/users_src/22465
    // @description OGame : Show Fleet Composition
    // @date 2008-01-11
    // @creator Black Cat
    // @include http://uni*.ogame.*/game/index.php?page=overview*
    // @include http://uni*.ogame.*/game/index.php?page=phalanx*
   // @exclude
   // ==/UserScript==
  
   (function(){
  
       function html_entity_decode(str) {
           var ta=document.createElement("textarea");
           ta.innerHTML=str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
           return ta.value;
     }
    
     if (document.location.href.indexOf('overview') != -1) {
         /* Montrer les flottes a l'aller */
        GM_addStyle('body center table tr th span.flight a[title]:after {content:" ("attr(title)")"; color: #a4aaba; font-size: 12px;}');
          GM_addStyle('body center table tr th span.attack a[title]:after {content:" ("attr(title)")"; color: #a4aaba; font-size: 12px;}');
         GM_addStyle('body center table tr th span.federation a[title]:after {content:" ("attr(title)")"; color: #a4aaba; font-size: 12px;}');
         GM_addStyle('body center table tr th span.ownfederation a[title]:after {content:" ("attr(title)")"; color: #a4aaba; font-size: 12px;}');

          /* Montrer les flottes en stationnement */
        GM_addStyle('body center table tr th span.holding a[title]:after {content:" ("attr(title)")"; color: #FFBB44; font-size: 12px;}');

        /* Montrer les flottes au retour */
         GM_addStyle('body center table tr th span.return a[title]:after {content:" ("attr(title)")"; color: #FFCC66; font-size: 12px;}');
     }
   
      if (document.location.href.indexOf('phalanx') != -1) {
         /* Montrer les flottes sous phalange */
         GM_addStyle('body table tr th span a[title]:after {content:" ("attr(title)")"; color: #FFA500; font-size: 8px;}');
     }
  })();