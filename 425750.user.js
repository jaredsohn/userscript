// ==UserScript==
// @id             api.open.uc.cn-525cfafd-6b04-4416-8f4b-32c04f4782e8@c
// @name           9game.register
// @version        1.0
// @author         qwop
// @description    
// @include        *
// @match          *://*/*
// @namespace      http://userscripts.org/users/qwop
// @homepage       http://userscripts.org/scripts/show/425750
// @downloadURL    https://userscripts.org/scripts/source/425750.user.js
// @updateURL      https://userscripts.org/scripts/source/425750.meta.js
// @run-at         document-end
// ==/UserScript==


//window.localStorage.removeItem( 'num' );
var h = document.location.href;

if ( h.indexOf( 'guideTaskAction' ) >= 0 ) {
    
   window.open( 'http://api.open.uc.cn/cas/logout/commit?client_id=6&redirect_uri=http%3A%2F%2Fmyspace.9game.cn%2Faccountsdk.openPltfrmCallBack%3Frequest_id%3D13931224812264366%26operation%3D3&display=mobile' );
}
else 
if ( h.indexOf( 'http://123.196.125.10:8082' ) >= 0 && (  h.indexOf( 'action=skip' ) >= 0 ||  h.indexOf( 'action=index' ) >= 0 )  ) {
    var links = document.getElementsByTagName('a');
    var template = 'accountsMap.put( "#name#","#pd#" ); // #name#';
    var msg,
    nick,
    pd,
    href;
    for (var i = 0; i < links.length; i++) {
        // http://123.196.125.10:8082/p.d?sid=TcnRk5wLYi04imJrBiUv&r=UN&action=playerInfo
        // http://123.196.125.10:8082/g.d?sid=IvIquGF18kuoePqEd0VE&r=8j&action=skip
        
        if (links[i].href.indexOf('action=playerInfo') >= 0) {
            nick = links[i].innerHTML;
            break;
        }
        
        /*
        if (links[i].href.indexOf('action=skip') >= 0) {
            //nick = links[i].innerHTML;
            href = links[i].href.replace( 'action=skip', 'action=index' );
            break;
        }  
        */
        
    }
    // totalAccountMap.put( "小虾117","/p.d?sid=K1fj782iHO0Tkgelj3tK&r=eb&action=index" ); // 小虾117
    // nick = 'qwop' + window.localStorage[ 'num' ];
    href = document.location.href;
    
    
    pd = href.replace('http://123.196.125.10:8082', '').replace( 'skip', 'index' ).replace( 'g.d', 'p.d' );
    
    msg = template.replace(/#name#/g, nick) .replace(/#pd#/g, pd) + '\r\n';
    
    
    alert(msg);
    
    if ( document.location.href.indexOf( "skip" ) >= 0 )
       document.location.href = 'http://123.196.125.10:8082' + pd;
    
} else {
    if ( h.indexOf( 'register_type=mobile' ) > 0 ) {
        document.location.href = ( h.replace( 'register_type=mobile', "register_type=email" ) );
       // return;
    } else if (  h.indexOf( 'register_type=email' ) > 0 )  {
        var nameDom = document.getElementById( "registerName" );
        var oldVal = nameDom.value;
        var emailDom = document.getElementsByName( 'email_suffix' );
        var foundEmailDom = false;
        
        if ( emailDom ) {
            foundEmailDom = true;
            emailDom[0].selectedIndex = 4;
        }
        
        
        if ( oldVal.replace( /(^\s+)|(\s+$)/, '' ) == '' ) {
            var g_default_num = 132;
           
            
            if ( oldVal == '' ) {
               // window.localStorage[ 'num' ] = '238';
                var v_num = window.localStorage[ 'num' ];
                if ( !v_num  ) { 
                    window.localStorage['num'] = g_default_num; 
                    v_num = g_default_num;
                } else {
                    v_num = parseInt( v_num ) + 1;
                    window.localStorage['num'] = v_num;
                }
    
            
                nameDom.value = 'qwop' + v_num +  ( foundEmailDom ? "" : "@126.com" ) ;
            }
        }
        
        // document.getElementsByName( 'email_suffix' )[0].selectedIndex = 4;
        document.getElementById( 'password' ).value = 'twelfth12';
        document.getElementById( 'confirmPassword' ).value = 'twelfth12';
  
    }
   
}

