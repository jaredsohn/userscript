// ==UserScript==
// @name        Toodledo Docs Extended
// @namespace   http://userscripts.org/scripts/show/186591
// @version     0.2
// @match	  	http://www.toodledo.com/tasks/*
// @match	  	https://www.toodledo.com/tasks/*
// @match		http://lists.toodledo.com/*
// @match		https://lists.toodledo.com/*
//GUIDO: change jQuery version
// @ require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @description	Extends and updates the original Toodledo Docs script by RalphKurz
// @copyright   2011, RalphKurz - 2013, Guido Villa
// ==/UserScript==

// configuration
var EMBED_LISTS = true;
var EMBED_IMAGES = true;
var MOVE_NOTE_BUTTONS = true;
// end of configuration

unsafeWindow.editit = function (durl,elmid)
{
    var icon;
    var ent="";

      if(durl.indexOf("spreadsheets.google.com")!=-1) {
          icon="https://docs.google.com/favicon.ico";
      }
      else if(durl.indexOf("docs.google.com")!=-1) {
	      icon="https://docs.google.com/favicon.ico";
      }
      else if(durl.indexOf("workspace.office.live.com")!=-1) {	
	      icon="http://workspace.office.live.com/favicon.ico";
      }
      else if(durl.indexOf("evernote.com")!=-1) {
	      icon="http://evernote.com/favicon.ico";
      }
      else if(durl.indexOf("mail.google.com")!=-1) {
	      icon="http://mail.google.com/mail/images/favicon.ico";
      }
      else if(durl.indexOf("scribd.com")!=-1) {
	      icon="http://s6.scribdassets.com/favicon.ico";
      }
      else if(durl.indexOf("slideshare.net")!=-1) {
	      icon="http://www.slideshare.net/favicon.ico";
      }
      else if(durl.indexOf("dropbox.com")!=-1) {
	      icon="https://www.dropbox.com/static/14750/images/favicon.ico";
      }
      else if(durl.indexOf("youtube")!=-1) {
	      icon="http://s.ytimg.com/yt/favicon-vflZlzSbU.ico";
      }
      else {
	      icon="http://images.toodledo.com/t/images/toco.gif";
      }

      ent = "<a href=\""+durl+"\" target=\"_blank\" id=\"gdoc"+elmid+"\"><img src=\""+icon+"\" height=\"16\" width=\"16\" title=\""+durl+"\"></a>";

    return ent;
}

function moveNoteExpanders() {
    $$i("div.row[id]").each(function(rowDiv) {
        moveNoteExpander(rowDiv);
    });
}
function moveNoteExpander(rowDiv) {
    if (rowDiv !== undefined) {
        rowDiv.getElementsBySelector('img.not');

		var id = rowDiv.id.replace("row", "");
        var img = $i('noteic' + id);
        if (img == undefined) {
            img = $i('addnote' + id);
        }
        if (img.style.float != 'left' /* TODO this should be done better */) {
            var taskSpan = $i('tsk' + id);
            taskSpan.up().insertBefore(img, taskSpan.up().firstChild);
            img.style.float = 'left';
            img.style.marginRight = '4px';
        }
    }
    else {
        alert("Error: no task for which to move the 'note expand' button.  Please contact the developer of this script.");
    }
}

unsafeWindow.tuesjetzt = function ()
{
    // for each note that contains an url...
	$j('.note:contains("http")').each(function(){ 
	// 'ent' will contain the list of icons that are added with the editit (one for each link inside the note)
	var ent="";
    // get the row number from the note ID (which is like "noteXXXXXXX"), then row id is "rowXXXXXXX"
	var elmid=$j(this).attr("id");
	elmid=elmid.substr(4,elmid.length);
	// for each link inside the note of this row
	$j("#row"+elmid+" > .note > a").each(function()
	{
        // get the URL text
		var durl=$j(this).text();
        // check if the links have been added, if not add them through editit
		var thtml=$j("#gdoc"+elmid).html();
		if(thtml==null) { ent+=unsafeWindow.editit(durl,elmid); }	
	});
	// add the list of icons after the text of the task
	$j("#tsk"+elmid).after(ent);
	});

    //TODO check
	//Notes in Goals
    // do the same as above
	if(document.URL.indexOf("goals.php")!=-1)
	{

	$j('.ednote:contains("http")').each(function(){ 
	var ent="";
	var elmid=$j(this).attr("id");
	elmid=elmid.substr(4,elmid.length);
	$j("#row"+elmid+" > .ednote").each(function()
	{
		var durl=$j(this).text();
		var thtml=$j("#gdoc"+elmid).html();
		if(thtml==null) { ent+=unsafeWindow.editit(durl,elmid); }
	});
	$j("#row"+elmid+" > .det235").after(ent);
	
	});		
	}
    /* GUIDO: comment link to script homepage (which is obsolete)
	if(!document.getElementById("tdocshinweis"))
	{
		$j("#viewby").append("<span id=\"tdocshinweis\">| <b><i><a href=\"http://www.ralphkurz.de/toodledo\" target=\"_blank\">Toodledo Docs Homepage</a></i></b></span>");
	}*/

	if(!document.getElementById("notebooklink"))
	{
		$j("#sp2").before("<span id=\"notebooklink\"><a href=\"https://www.evernote.com/Home.action\" target=\"_blank\"><img src=\"http://www.evernote.com/favicon.ico\"></a> | <a href=\"http://workspace.office.live.com\" target=\"_blank\"><img src=\"http://workspace.officelive.com/favicon.ico\"></a> | <a href=\"https://docs.google.com\" target=\"_blank\"><img src=\"https://docs.google.com/favicon.ico\"></a> |<br><a href=\"http://dropbox.com\" target=\"_blank\"><img src=\"https://www.dropbox.com/static/14750/images/favicon.ico\" border=\"0\"></a> | <a href=\"https://calendar.google.com\" target=\"_blank\"><img src=\"http://calendar.google.com/googlecalendar/images/favicon_v2010.ico\"></a> | <a href=\"http://mail.google.com\" target=\"_blank\"><img src=\"https://mail.google.com/mail/images/favicon.ico\"></a> |</span><br><br>");
	}

    // change all links in notes so that they will open in a new window
	$j(".note > a").each(function(){
        $j(this).attr("target","_blank");
        
        // embed into notes
        // get the URL text
        var durl=$j(this).text();

        if (durl.match(/\.jpe?g/i) || durl.match(/\.gif/i) || durl.match(/\.png/i)) {
            if (EMBED_IMAGES) {
                // check if the img has been added, if not add it
                var nurl;
                var imgid="gimg"+durl.replace(/[^a-zA-Z0-9_]/g,"_");
                var check=$j("#"+imgid).html();
                if(check==null) {
                    if(durl.indexOf("://www.dropbox.com")!=-1) {
                        nurl=durl.replace(/:\/\/www\.dropbox\.com/,"://dl.dropbox.com");
                    } else {
                        nurl=durl;
                    }
                    var noteDiv=$j(this).closest('div.note');
                    noteDiv.after("<div id=\""+noteDiv.attr("id")+"_img\" class=\"note_img\"><img id=\""+imgid+"\" src=\""+nurl+"\" style='width: 300px' title=\""+durl+"\" onClick=\"if (this.style.width=='300px') this.style.width='100%'; else this.style.width='300px';\"></div>");
                    if (!noteDiv.visibile) $j("#"+noteDiv.attr("id")+"_img").hide();
                }	
            }
        }
        else if (durl.indexOf("://lists.toodledo.com/") != -1) {
            if (EMBED_LISTS) {
                // check if the iframe has been added, if not add it
                var iframeid="giframe"+durl.replace(/[^a-zA-Z0-9_]/g,"_");
                var check=$j("#"+iframeid).html();
                if(check==null) {
                    var noteDiv=$j(this).closest('div.note');
                    noteDiv.after("<div id=\""+noteDiv.attr("id")+"_img\" class=\"note_img\"><iframe id=\""+iframeid+"\" src=\""+durl+"?slim=iframe&id="+iframeid+"\" style=\"border: none\">iframe to "+durl+"</iframe></div>");
                    if (!noteDiv.visibile) $j("#"+noteDiv.attr("id")+"_img").hide();
                }	
            }
        }
    });
	
    if (MOVE_NOTE_BUTTONS) moveNoteExpanders();
}


unsafeWindow.changelistwidths = function (id)
{
    var width;
    $j('.table th, .table td').each(function() {
        width = $j(this).attr("width");
        if (width != undefined) {
            $j(this).attr("width", width * .8);
        }
    });
    var style;
    $j('.table th div.ng-binding').each(function() {
        style = $j(this).attr("style");
        if (style != undefined && style.indexOf("width") != -1) {
            $j(this).width($j(this).width() * .8);
        }
    });
//    alert($j(rchunk).width());
//    alert(unsafeWindow.parent.document.getElementById(id).style.width);
    unsafeWindow.parent.document.getElementById(id).width  = $j(rchunk).width()  + 38;
    unsafeWindow.parent.document.getElementById(id).height = $j(rchunk).height() + 20;
}


// taken from userstyles.org
function addCss(cssString) {
    if (typeof GM_addStyle != "undefined") {
        GM_addStyle(cssString);
    } else if (typeof PRO_addStyle != "undefined") {
        PRO_addStyle(cssString);
    } else if (typeof addStyle != "undefined") {
        addStyle(cssString);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(cssString));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node); 
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }
}


/*** This is the beginning of the script ***/
//GUIDO: to have jQuery run together with Prototype (additionally, $ -> $j everywhere)
//TODO find better method than setTimeout to run things at the appropriate time
//TODO handle when the list is reloaded without reloading the page
//TODO handle when one row is added/modified
//TODO resize iframe for embedded lists whe one row is added/removed
jQuery.noConflict();
var $j  = jQuery;
var $i  = unsafeWindow.$;
var $$i = unsafeWindow['$$'];

var url = document.location.toString();
if (url.match(/^https?:\/\/lists\.toodledo\.com\/#\/list\/.*\?slim=iframe&id=giframe[a-zA-Z0-9_]*/i)) {
    if (EMBED_LISTS) {
        var id = url.substr(url.indexOf("&id=")+4,1000);
        window.setTimeout(function() { location.href = "javascript:void(changelistwidths('"+id+"'))"; }, 3000);
        (function() {
            var css = "body{font-size: 80%; line-height: 10px}\n div#header{margin:0; width:auto}\n div#main{background-image:none}\n div#rchunk.notool{padding-top:0; padding-left:3px}\n #details .title{margin-bottom:0}\n #details .keywords{margin-bottom:0; padding-top:0; padding-bottom:0}\n #details .icon-comment{margin-top:0}\n #details .note{line-height:1em; padding-top:0}\n .table{margin-bottom:3px}\n .table-condensed th, .table-condensed td{padding:0 1px 0 1px}\n .btn-small{padding:1px 2px 0px 2px}\n select, textarea, input[type=text], input[type=password], input[type=datetime], input[type=datetime-local], input[type=date], input[type=month], input[type=time], input[type=week], input[type=number], input[type=email], input[type=url], input[type=search], input[type=tel], input[type=color], .uneditable-input{padding:1px 1px 2px; height:15px; font-size:13px}\n .btn{line-height:10px}\n .table thead div.ng-valid.ng-binding{line-height:10px}\n #details .adddiv{line-height:10px; margin-bottom:0}\n #rows.single td>div:first-child, #newrows.single td>div:first-child{padding:0; height:20px}\n div#banner, div#left_side, div#footpad, div#bottom {display:none}";
            addCss(css);
        })();
    }
} else {
    window.setTimeout(function() { location.href = "javascript:void(tuesjetzt())"; }, 3000);
    $j(document).click(function() { setTimeout(function() { location.href = "javascript:void(tuesjetzt())"; }, 3000); });
    (function() {
        var css = ".cols .note_img{margin:0 20px 0 20px}\n .cols:hover .note_img{background-color:#ffffff}";
        addCss(css);
    })();
    
    var _old_ToggleNote = unsafeWindow.toggleNote;
    unsafeWindow.toggleNote = function(a, b) {
        _old_ToggleNote(a, b);
        $j("#" + a.id + "_img").each(function(){
            $j(this).toggle();
        })
    }
    var _old_showDetails = unsafeWindow.showDetails;
    unsafeWindow.showDetails = function(a) {
        _old_showDetails(a);
        $j("div.note_img").each(function(){
            $j(this).show()
        });
    }
    var _old_hideDetails = unsafeWindow.hideDetails;
    unsafeWindow.hideDetails = function(a) {
        _old_hideDetails(a);
        $j("div.note_img").each(function(){
            $j(this).hide()
        });
    }
}
