// ==UserScript==
// @name        nK ES qr 1.3
// @description Adds quick reply option to the topic page, smiley checkbox included and checked by default
// @include     http://www.elitesecurity.org/t*
// ==/UserScript==

var nKESqr = {
    run:            function ()
    {
        if (this.authenticate ()) this.insertQRLinks ();
    },
    authenticate:   function ()
    {
        var uname = false;
        var pass = false;
        var c = document.cookie.split ('; ');
        for (var i = 0; i < c.length; i++) {
            var match = /\[(.*)\]/.exec (c [i]);
            if (match == null) continue;
            switch (match [1]) {
                case 'UserName':
                    uname = unescape (c [i].split ('=') [1]);
                    break;
                case 'Password':
                    pass = unescape (c [i].split ('=') [1]);
                    break;
            }
        }
        if (uname === false || pass === false) return false;
        this.uname = uname;
        this.pass = pass;
        return true;
    },
    insertQRLinks:  function ()
    {
        var as = document.getElementsByTagName ('A');
        var qrlink;
        for (var i = 0; i < as.length; i++) {
            if (as [i].className == 'tiny' && as [i].innerHTML == 'Odgovor na temu') {
                qrlink = document.createElement ('a');
                qrlink.addEventListener ('click', function (e) {nKESqr.setQRForm (e);}, false);
                qrlink.className = 'tiny';
                qrlink.setAttribute ('href', 'javascript: void (0);');
                qrlink.appendChild (document.createTextNode ('Brzi odgovor'));
                as [i].parentNode.insertBefore (qrlink, as [i++]);
                as [i].parentNode.insertBefore (document.createTextNode (' '), as [i]);
            }
        }
    },
    setQRForm:      function (e)
    {
        var qrform = document.getElementById ('esqr');
        if (!qrform) qrform = this.createQRForm ();
        var temp = e.target.parentNode;
        while (temp.parentNode != document.body) {
            temp = temp.parentNode;
        }
        document.body.insertBefore (qrform, temp.nextSibling);
        document.getElementsByTagName ('textarea') [0].focus ();
    },
    createQRForm:   function ()
    {
        var f = document.createElement ('FORM');
        f.id = 'esqr';
        f.setAttribute ('style','padding: 0 auto; text-align: center;');
        f.setAttribute ('method','post');
        f.setAttribute ('action','poruka.php');
        f.setAttribute ('class', 'post');
        var d = document.createElement ('div');
        d.setAttribute ('class', 'post_text');
        d.setAttribute ('style', 'margin: 0 20%; padding: 1%;');
        var i = document.createElement ('input');
        i.setAttribute ('type', 'hidden');
        i.setAttribute ('name', 'username');
        i.setAttribute ('value', this.uname);
        d.appendChild (i);
        i = document.createElement ('input');
        i.setAttribute ('type', 'hidden');
        i.setAttribute ('name', 'password');
        i.setAttribute ('value', this.pass);
        d.appendChild (i);
        i = document.createElement ('input');
        i.setAttribute ('type', 'hidden');
        i.setAttribute ('name', 'subject');
        i.setAttribute ('value', 'Re: ' + document.title.substr (6));
        d.appendChild (i);
        i = document.createElement ('input');
        i.setAttribute ('type', 'hidden');
        i.setAttribute ('name', 'BoardID');
        i.setAttribute ('value', document.getElementsByName ('BoardID') [0].getAttribute ('value'));
        d.appendChild (i);
        i = document.createElement ('input');
        i.setAttribute ('type', 'hidden');
        i.setAttribute ('name', 'TopicID');
        i.setAttribute ('value', document.getElementsByName ('TopicID') [document.getElementsByName ('TopicID').length - 1].getAttribute ('value'));
        d.appendChild (i);
        i = document.createElement ('input');
        i.setAttribute ('type', 'hidden');
        i.setAttribute ('name', 'posticon');
        i.setAttribute ('value', 1);
        d.appendChild (i);
        i = document.createElement ('textarea');
        i.setAttribute ('style', 'vertical-align:top');
        i.setAttribute ('cols', 40);
        i.setAttribute ('rows', 10);
        i.setAttribute ('name', 'message');
        d.appendChild (i);
        d.appendChild (document.createElement ('<br>'));
        i = document.createElement ('input');
        i.setAttribute ('type', 'checkbox');
        i.setAttribute ('name', 'emoticon');
        i.setAttribute ('value', '1');
        d.appendChild (i);         
        d.appendChild (document.createTextNode (' smajliji'));
        d.appendChild (document.createElement ('<br>')); 
        i = document.createElement ('input');
        i.setAttribute ('type', 'submit');
        i.setAttribute ('name', 'Submit');
        i.setAttribute ('value', 'Pošalji odgovor');
        d.appendChild (i);
        i = document.createElement ('input');
		i.setAttribute ('type', 'hidden');
		i.setAttribute ('name', 'posticon');
		i.setAttribute ('value', 1);
		d.appendChild (i);
        f.appendChild (d);
        return f;
    }
}

if (typeof (window.opera) == 'undefined') {
    window.addEventListener ('load', function (e) {nKESqr.run ();}, false);
} else {
    nKESqr.run ();
}