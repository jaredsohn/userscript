// ==UserScript==
// @name           Temporary Email Helper
// @version        1.0
// @namespace      http://blog.dikamilo.vipserv.org
// @description    Adds icon after email inputs
// @include        *
// ==/UserScript==

var temporaryEmailHelper = {

    /* valid input names */
    aInputNames: Array(
        "email",
        "email_confirm",
        "EmailAddress",
        "EmailAddress_two",
        "req_email",
        "req_email1",
        "req_email2"
    ),
    
    /* inputs for process */
    aMailInputs: Array(),
    
    /* all inputs */
    aInputs: Array(),
    
    /* check inputs and process request */
    process: function()
    {
        this.aInputs = document.getElementsByTagName( "input" );
        
        for (var i = 0; i < this.aInputs.length; i++)
        {
            this.aInputNames.forEach( function( item )
            {
                if( temporaryEmailHelper.aInputs[i].name == item )
                {
                    temporaryEmailHelper.aMailInputs.push( temporaryEmailHelper.aInputs[i] );
                    
                    var add = document.createElement( "a" );
                        
                    add.innerHTML= '<img id="10minutemail" style="cursor: pointer;" title="Paste temporary email" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAC+ElEQVQ4y7WVS0gVURiA/3PmmV41 LR+V1k2KpCwLjVAxqk0RtMmlmxZBQivpQSvbBhJEEOWqVdAikDaC9NBNEXoNglAJKnpo0TW9du3a zJ05p/PPnTPMjFd3Dvyc53znP//rEEIIhD4c0Jis97GYcLmghjYhRBOi+6L5c2QNKPdheSG2L44Q NwymPqz00q2nF36T7TfSOVq5mOPKeupu3gSsupQvVtP0vQfXzt4VUzn/AJeQgi0Qmrh459WT1Jxx or+7Adp2J6C2QgXO+SqRXzrrwLuvORhKZYDaS5MP+9rPiOkswpGLWpX0DgxftUob+29210OdADLG PIhsJTA+Rr2WLQ4Dw/Pg/JkdvN936jpqLh2kp1n15fNHK6GmjEI+ny8qlmWBbdtBK/um4sK5wwn4 vlLeI1gGMlXptJ9ZUtWaLAHHccB1XU8zKWHNwxqjoMaUUjiwTYPZJUj4fvPAXog56F/hUEd0EDw6 MS1+ZEVtLAUP6WzZA4qieCFkaBRO91xpGHl0O6OGw4kJoMNdD+y6DvyzbDjZ1hRAwlqPTX4ATS2Y DccyHzhj2CGRBEAgmgI3Y3v8yF549uZ9YGO59mJ8GjoOJoOxXAvlRzSzcFFuxkOw7TzUCM/HpwLA y4kZaG/eFdkj/wtxI5knNoorQRSM1+xoTsJoagYwwqSmOB8AEaSqYW4MzEQ2MieiubTpsf07vX54 Th4uzQhrgdF53I1qXMxxsnWcgk8w3IqBedh5xHdgHBw/oDAu7MVww3kMMEIp8rgEMxE5gLGs+FdE GZ/6sioh5AHBLf0+E3FgC4CI4W8S7JW+ujK+MPXD3dJSR72YbN1XHzipWObJOoHaouM+LVDYUcGW 3xZKJ6M+2K5R5gdHpm1YslTQdd3bLEX+LFtN0zwxDANM0wSXmjD6kUB9SfaxYFnIjJXN10OpOb2r t8uApq0ulOkFG8Y1DapaXoHPGR3GBNQkK6vKZtFC/+svqcqsrP80lZuE1SbYmoV+Q54mslGP6X+a VaOTPQwvTQAAAABJRU5ErkJggg=="/>';
                        
                    temporaryEmailHelper.insertAfter( add, temporaryEmailHelper.aInputs[i] );
                        
                    add.addEventListener( "click", temporaryEmailHelper.processRequest, false );
                }
            });
        }
    },

    /* get information form 10minutemail.com */
    processRequest: function()
    {
        GM_xmlhttpRequest(
        {
            method: "GET",
            url: "http://10minutemail.com/10MinuteMail/index.html",
            onload: function(xhr) 
            {
                var html = xhr.responseText;
                var mail =  html.match( 'name="addyForm:addressSelect" value="(.*)" size="30"' );
                var expire = html.match( '<span id="expirationTime">(.*)</span>' );
                
                var box = document.createElement( "div" );
                box.innerHTML = '<div id="light" style="display:none;position:fixed;top:25%;left:25%;width:50%;padding:16px;border:5px solid #8B8B8B;background-color:white;z-index:1002;overflow:auto;"><p>Email: <strong>'+mail[1]+'</strong></p><p>'+expire[1]+'</p><p><a target="_blank" href="http://10minutemail.com/10MinuteMail/index.html">Open 10minutemail.com</a></p><p><a id="hide10minuteBox" href="#">Close</a></p></div><div id="fade" style="display: none;position: fixed;top: 0%;left: 0%;width: 100%;height: 100%;background-color: black;z-index:1001;-moz-opacity: 0.8;opacity:.80;filter: alpha(opacity=80);"></div>';

                document.body.appendChild( box );
                
                document.getElementById( "hide10minuteBox" ).addEventListener( "click", temporaryEmailHelper.hideBox, false );
            
                temporaryEmailHelper.insertMail( mail[1] );
     
                temporaryEmailHelper.showBox();
            }
        });
    },

    /* Insert email into input */
    insertMail: function( mail )
    {
        for (var i = 0; i < this.aMailInputs.length; i++)
        {
            this.aMailInputs[i].value = mail;
        }
    },

    /* Show info box */
    showBox: function()
    {
        document.getElementById('light').style.display='block';
        
        document.getElementById('fade').style.display='block';
    },

    /* Hide info box */
    hideBox: function()
    {
        document.getElementById('light').style.display='none';
        
        document.getElementById('fade').style.display='none';
    },

    /* Help punction for inserting node  after specific node */
    insertAfter: function( newNode, node ) 
    {
        return node.parentNode.insertBefore( newNode, node.nextSibling );
    }
};

temporaryEmailHelper.process();