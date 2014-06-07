// Hi! This is a UserScript. 
// You need to install https://chrome.google.com/webstore/detail/tampermonkey/dhdg in chrome or the UserScripts Plugin for Firefox to run this. 
//
//
//Copyright (c) 2013, BSolut GmbH
//All rights reserved.
//
//Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
//
//Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
//Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
//THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// ==UserScript==
// @name       Billomat Tweaks
// @namespace  http://bsolut.com/
// @version    0.6
// @description  Open Billomat Results in New Tab on click. Also allow to preview invoices.
// @match      https://*.billomat.net/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  2013, BSolut GmbH, BSD2 License - http://opensource.org/licenses/BSD-2-Clause
// ==/UserScript==
 
function close_layer() {
	$("#frameDiv").css('display','none');
}

$(document).ready(function() {
    $("body").append('<div id="frameDiv" style="border: 3px solid #000; top: 300px; left:200px; position: absolute; z-index: 10; display: none;	background-color: #FFF; width: 800px; height: 700px;"></div>');
    var links = $.merge($("tr.rowodd"),$("tr.roweven"));
    links.each ( function () {
        var action = $(this).attr('onclick');
        //window.location.href='/portal/invoices/show/entityId/519330';
        ///portal/invoices/preview/entityId/549355.pdf
        ///portal/invoices/complete/entityId/549355
        if (action) {
            var res = action.match(/href='([^0-9]*([0-9]+))'/);
            var $e = $( "<td nowrap><a>abschließen</a></td>");
            $e.bind( "click", function() {
                window.open('/portal/invoices/complete/entityId/'+res[2]);
            });
            $(this).append($e);   
            
            $e = $( "<td><a>Preview</a></td>");
            $e.bind( "click", function() {
              //window.open('/portal/invoices/preview/entityId/'+res[2]+'.pdf');
                $("#frameDiv").html("<div style='padding: 10px,0,0,0; text-align: right;'><a id='frameClose'>close</a></div><iframe style='width:100%; height:100%; ' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='/portal/invoices/preview/entityId/"+res[2]+".pdf'></iframe>");
                //$("#frameDiv").css('display','inline');
                $('#frameDiv').show('slow', function() {
                    // Animation complete.
                });
                $("#frameClose").bind( "click", function() {
                    $("#frameDiv").css('display','none');
                });
            });
            $(this).append($e);
            
    	    $(this).attr('onclick',"");
            $e = $( "<td nowrap><a>-></a></td>");
            $e.bind( "click", function() {
                window.open(res[1]);
            });
            $(this).append($e);   
        }
    });
});



