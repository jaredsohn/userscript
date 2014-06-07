// ==UserScript==
// @name       Wykop krejdowy
// @namespace  http://www.wykop.pl/*
// @version    0.4
// @description  heheszki dd
// @match      http://www.wykop.pl/*
// @copyright  krejd
// ==/UserScript==


// Goes to next unread tag
$('#nextTag').live('click', function(event) {
    event.preventDefault();

    // Dblclick button to get ajax working as
    // it needs to scrape unread notification urls
    $('#hashNotificationsBtn').click();
    $('#hashNotificationsBtn').click();

    // Checks if ajax complete
    checkIfShown = setInterval(function() {
        if(jQuery.active == 0) {
            $('#hashNotificationsContainer ul li:first a').each(function(index,value) {
                if($(this).attr('href').match(/wpis\//i)) {
                    hashHref = $(this).attr('href');
                    window.location.href = hashHref;
                }
            });
            clearInterval(checkIfShown);
        }
    }, 200);
});

// Goes to next unread notification
$('#nextNote').live('click', function(event) {
    event.preventDefault();

    // Dblclick button to get ajax working as
    // it needs to scrape unread notification urls
    $('#notificationsBtn').click();
    $('#notificationsBtn').click();

    // Checks if ajax complete
    checkIfShownNote = setInterval(function() {
        if(jQuery.active == 0) {
            $('#notificationsContainer ul li:first a').each(function(index,value) {
                if($(this).attr('href').match(/comment/i)) {
                    hashHref = $(this).attr('href');
                    window.location.href = hashHref;

                }
            });
            clearInterval(checkIfShownNote);
        }
    }, 200);
});



// Shows all unread tags on one page. Works
// on every Wykop page.
var ifn = 0;
var tagArr = new Array();
var allActive = false;
$('#allInOne, #showMoreTags').live('click', function(event) {
    event.preventDefault();
    ifn = 0;
    tagArr = new Array();
    $('html, body').animate({ scrollTop: 0 }, 500);

    $('section .scale').html('');
    $('section .scale').append('<h1>Najnowsze wpisy z tagów (<span id="tagCount">trwa sprawdzanie...</span>):</h1>');

    // Dblclick button to get ajax working as
    // it needs to scrape unread notification urls
    $('#hashNotificationsBtn').click();
    $('#hashNotificationsBtn').click();

    // Checks if ajax complete
    checkIfShownHash = setInterval(function() {
        if(jQuery.active == 0) {
            $('#hashNotificationsContainer ul li').each(function(index,value) {

                if( $('a.readNotification.icon', $(this)).length > 0 ) {
                    $('a', $(this)).each(function() {
                        if($(this).attr('href').match(/wpis\//i)) {
                            hashHref = $(this).attr('href');
                            tagArr.push(hashHref);
                        }
                    })
                }
            });
            clearInterval(checkIfShownHash);


            $('#tagCount').text(tagArr.length); // Let user know how many found

            // Loads every page in another iframe, removes useless
            // clutter and shows to users
            appendTags = setInterval(function() {
                if(ifn < tagArr.length) {

                    $('section .scale').append('<iframe id="tag'+ifn+'" width="100%" style="opacity:0;"></iframe>');
                    $('#tag'+ifn).attr('src',tagArr[ifn]);
                    $('#tag'+ifn).load(function() {
                        ifrm = $(this).contents();
                        saver = $('#body-con', ifrm).detach();
                        $('body', ifrm).empty().append(saver);
                        $('aside', ifrm).remove();
                        $('.newtagheader', ifrm).remove();
                        $('head', ifrm).append('<base target="_parent">');
                        $('body', ifrm).append('<style>.scale { margin-right:0 !important; margin-top:0 !important; } #body-con { margin:0 !important; } .wrapper { padding:0 !important; min-width: 0 !important;}</style>');
                        this.style.height = this.contentWindow.document.body.scrollHeight + 'px';
                        $(this).css('opacity','1');

                            checkHeight = setInterval(function() {
                                checkHeight = $('iframe').each(function(index,value) {
                                    if( $(this).attr('id').match(/tag/i) ) {
                                        $(this).height( $(this).contents().find('#body-con').height() + 25);
                                    }
                                });
                            }, 2000);
                    });
                    ifn++;
                } else {
                    $('section .scale').append('<div><a id="showMoreTags" href="/powiadomienia/pokaz-wszystkie-tagi/" style="display:block; width:45%; padding:15px 0px; text-align:center; margin-top:40px; border-radius:25px; margin:0 auto;">Pokaż kolejne wpisy z tagów</a></div>');
                    headerColor = $('#header-con').css('background');
                    $('#showMoreTags').css('background', headerColor);
                    $('#showMoreTags').css('color', '#efefef');
                    clearInterval(appendTags);
                }
            }, 200);
        }
    }, 200);
});

$(window).resize(function() {
    $('iframe').each(function(index,value) {
        if( $(this).attr('id').match(/tag/i) ) {
            $(this).contents().find('section').width( $('section .scale').width()-10 );
            $(this).height( $(this).contents().find('#body-con').height() + 25);
        }
    });
});

var notification_next_image = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAQCAYAAAAMJL+VAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAG2YAABzjgAA2e0AAIGfAAB/mgAA2GMAADIXAAAdLVvevdMAAAHVSURBVHjatJQ/aFNRFMZ/eYZXKkSlNJsUrZFk8Q9BUCouOriUFhwEY4cnWaSCWyguQsRSMIKodCwiomOHbC22Q2gxDtHNGCw0liC1r6JBpRXT9zn0BkKbVl9qP7hwL985555zvnsukmxJdyVV9H9QMfFsACSNaBdQKBRmHcexg0ASIJPJUCqV2Cmi0SipVIpIJNIDpKnfmEwmVSwWVyTdk7S3hfVY0rKkrnpMx3GWrMbbY7GYB5wAnvpI+hjwGjhozssNXNjaYBwGfgPtwJxx3g6jwBgQAL4BXRsNrCZOl4G6GGPA/SY254F54AAgo+ONZhkE14taYHDfHNw6uQhAwJqm58oAvamHpvRJoA9YNe3rNP4V4Op2JVq4ZRhNELe/ghRCCuGt9TP7fJwHlwaAL6YFn4AfQJvJ+jQw9DeBLCYewcr3zYy0H7ecNqWnG5j3QC+w9C8vIMiH/Nast3bB7GaADqOZ52cuLJ9z5PkdPIvuU7+2ZvdMtTDM5wCq1app0dnEE8pvrm/SoT0Eg8/6gZ+tfBm5XA5gMSDJfvdy/NWRj1PxtoW36+zRM3DxJoQP+Q7sui75fJ5sNkutVhsOaOg41z7HbeA2kAAOs3PMAy+AO38GAPWvcbCbhMN3AAAAAElFTkSuQmCC');";
var tag_next_image = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAfCAYAAADnTu3OAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAG2YAABzjgAA2e0AAIGfAAB/mgAA2GMAADIXAAAdLVvevdMAAAHjSURBVHja7JUxaFNRFIa/G2MrDVUCooOrBgexoZtT261Ddtd0EC50yuTQIXVxfYPDC7gogovgkgSXQNshEV2SRawvESV5IUqjSCp9eX3R45BUnqkvfYWOOXCG+597/3P+c+/hKhHhLC3CGduUcEo4JZwS/p9QKYXfgSyQHsPSQNa3Dmcisiwi0mg0qlrrtA8Xx3H2tNbZ0TrQxyUnAcrlchJYGh1OAlSr1cujSk/VwwWAVqsFsONPYts2wHYYmVmffxIRyefz0ul0zBG2JSJSqVSkVqu9OkkyckrTWmcnEUaVUkprLYlEgkwmQ6FQoFgs/lVgmiaWZWEYxhG0CTwIlnz/9tCH8sQ0zWEVQ2xZRKRUKonWesvXpuAKR3tu8PjeOvY71lyX/fnoKvD86Kbb7TZALczTU9J+/4bc2iKHB9F/IjNzA9affeXq9Wu2bROLxXbj8fgXpdTKpL/83OZN9yHdz/PHIr+8CD+/Xewnln53u13led6FXq93pd/vr6ZSqadBhFE+vp0NTGe9ptlsRgzD+BFWcvSkDZZlAdRyudyK/+YnTUopMJq4Q71eDzchPsINZuYGxyLnZ93vi3fbY2MYinCXw4NbHwaX9jwiHrAPvMRzFzYePXnhOM522P4B/BkA1Fxrn1lD6CwAAAAASUVORK5CYII=');";
var tag_all_image = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAQCAYAAADNo/U5AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAG2YAABzjgAA2e0AAIGfAAB/mgAA2GMAADIXAAAdLVvevdMAAAGxSURBVHjalJIxaBNhFMd/dz2oNFgJhDq4aiZpg5uDpN06uLumQ+ELTpk7pJPgdONlFAQXIUsSXAKtaCK65BZpvQSU5ELUxFZS6eW4mOdgLj2OFvEPHx/8eb8/7z0exCQiRRHJxbyciBS5TCKyKSLS6XRaSqlcxBfP84ZKqSKAHuMyAI1GIwNk50AGoNVqpYDcZdAGQK/XA3gdDXJdF+AwOkP4PouIVCoVGQwG1tw7EBFpNpti2/YrAE1EhP9QPp/f1wCUUpJOpykUClSrVWq12qLIsiwcx8E0zQuyvC6U1yVsUyzLEqVUce5tiojU63VRSh2EjDH/77zd5fHpR0j5OzwwzraBF+EG+/0+gB1C2umRvH+zw73p+SLgb9oK0+xzvq3e5pbruiQSieNkMvlV07StpYf+/pNfX7geH3gWoPs/WE1lJ7PRaKQFQXBtPB6vTSaTbWP4geWrNvX9HXS7Xd00zZ/R9ox/rdhxHAC7VCpthZ4O1K8C1u5Du92+uIQItGesMI0DS8v4Nx+d9GMntYCOp+fcPbnxaTjTgwA4A8q/fTaePtt76XneYXQegD8DAMrp7qDdZYKwAAAAAElFTkSuQmCC');";


// Append new buttons to Wykop interface
$('.hashnotifications.quickpoint').after($('<div/>', {
    html: "<a id=\"allInOne\" href=\"/powiadomienia/pokaz-wszystkie-tagi/\" class=\"customquickicon icon inlblk\" style=\"display:block; background-image:"+tag_all_image+" !important; background-position:13px 14px; background-repeat:no-repeat; width:36px; height:36px;\"></a>",
    class: "fright rel quickicon",
    title: "Pokaż nieprzeczytane wpisy z tagów",
    alt: "Pokaż nieprzeczytane wpisy z tagów"
}));

$('.hashnotifications.quickpoint').after($('<div/>', {
    html: "<a id=\"nextTag\" href=\"/powiadomienia/nastepny-tag/\" class=\"customquickicon icon inlblk\" style=\"display:block; background-image:"+tag_next_image+" !important; background-position:13px -1px; background-repeat:no-repeat; width:36px; height:36px;\"></a>",
    class: "fright rel quickicon",
    title: "Czytaj następny tag",
    alt: "Czytaj następny tag"
}));

$('<div/>', {
    html: "<a id=\"nextNote\" href=\"/powiadomienia/nastepne-powiadomienie/\" class=\"customquickicon icon inlblk\" style=\"display:block; background-image:"+notification_next_image+" !important; background-position:7px 14px; background-repeat:no-repeat; width:36px; height:36px;\"></a>",
    class: "fright rel quickicon",
    title: "Czytaj następne powiadomienie",
    alt: "Czytaj następne powiadomienie"
}).appendTo('header nav');

$('body').append('<style>.customquickicon:hover {background-color:#1c1c1c; }</style>');
