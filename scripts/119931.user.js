// ==UserScript==
// @name           orangereddit
// @namespace      v2
// @include        *.reddit.com*
// @run-at document-start
// ==/UserScript==

function main()
{
    var softCheckInterval = 1000,   // Check other tabs every second
        hardCheckInterval = 300000, // Check using API every 5 mins

        k  = 'mail-'+ reddit.logged,
        mail = $('#header-bottom-right>#mail'),
        modmail = $('#header-bottom-right>#modmail');

    // First run
    if( !localStorage.getItem('ck-'+reddit.logged) ) checkMailProper();

    localStorage.setItem('logged-user',reddit.logged);
    localStorage.setItem('mail-ts-'+reddit.logged,new Date().getTime());

    // Update current mail status
    if( location.pathname == '/message/moderator/' ){ setmodmail(false); localStorage.setItem( 'mod'+k,'' ) } else localStorage.setItem('mod'+k,modmail.hasClass('havemail')?1:'');
    if( location.pathname == '/message/unread/'    ){ setmail(false);    localStorage.setItem( k,'' ) }       else localStorage.setItem(k,mail.hasClass('havemail')?1:'');

    // Check localstorage every second to see if another page has updated the mail status
    function checkMail(){
        k  = 'mail-'+ reddit.logged;
        if(  localStorage.getItem( k ) && !mail.hasClass('havemail') ) setmail(true); // got mail, icon gray
        if( !localStorage.getItem( k ) &&  mail.hasClass('havemail') ) setmail(false); // no mail, icon red

        if(  localStorage.getItem( 'mod'+k ) && !modmail.hasClass('havemail') ) setmodmail(true);
        if(!(localStorage.getItem( 'mod'+k ))&&  modmail.hasClass('havemail') ) setmodmail(false);
    }
    setInterval( checkMail, softCheckInterval );

    // Check with API every 5 mins.
    function checkMailProper(){

        // Only check if another tab hasn't already checked recently
        var oldtime = +localStorage.getItem('mail-ts-'+reddit.logged)||0,
            newtime = new Date().getTime();
        if( oldtime + hardCheckInterval >  newtime ) return;

        // Do API check
        if( !localStorage.getItem( 'mail-'+reddit.logged ) || !localStorage.getItem( 'modmail-'+reddit.logged ) )
            $.getJSON('/api/me.json',function(d){
                localStorage.setItem('mail-'    +reddit.logged, d.data.has_mail?1:'');
                localStorage.setItem('modmail-' +reddit.logged, d.data.has_mod_mail?1:'');
                localStorage.setItem('ck-'      +reddit.logged, d.data.comment_karma);
                localStorage.setItem('mail-ts-' +reddit.logged, newtime);
                localStorage.setItem('logged-user', reddit.logged);
            });
    };
    setInterval( checkMailProper, hardCheckInterval );


    // If we're viewing own userpage, update comment karma to localStorage
    if( location.pathname == '/user/'+reddit.logged+'/' ) localStorage.setItem('ck-'+reddit.logged, $('.comment-karma' ).text().replace(/,/g,'') );

    // Functions to toggle the orangered status of the mail/modmail icons
    function setmail(b){
        $('#header-bottom-right>#mail')
            .toggleClass('nohavemail',!b)
            .toggleClass('havemail',b)
            .attr({
                title:(b?'new mail!':'no new mail'),
                href:(b?'/message/unread/':'/message/inbox/')
            })
    };
    function setmodmail(b){
        $('#header-bottom-right>#modmail')
            .toggleClass('nohavemail',!b)
            .toggleClass('havemail',b)
            .attr('title',b?'new mod mail!':'no new mod mail')
    };
};

// Add script to main page scope
document.addEventListener('DOMContentLoaded',function(e){var s=document.createElement('script');s.textContent="("+main.toString()+')()';document.head.appendChild(s)});

// Append comment karma CSS
(function addcss(){
    if(!document.head)return setTimeout(addcss);
    var u=localStorage.getItem('logged-user'),ck=localStorage.getItem('ck-'+u);
    if(u&&ck){var s=document.createElement('style');s.textContent='#header-bottom-right>.user>b:after{content:" | '+ck+'"}#header-bottom-right>.user>b.alias:after{content:""}';document.head.appendChild(s)};
})();
