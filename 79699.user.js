// ==UserScript==
// @name           Moran AutoClicker
// @namespace      http://prairiepolitics.wordpress.com/2010/06/15/gop-senate-primary-poll-2/
// @description    Clicks for Moran for you, because that's what everyone wants
// @include        http://prairiepolitics.wordpress.com/2010/06/15/gop-senate-primary-poll-2/
// ==/UserScript==


var logo = document.createElement("h1");
logo.innerHTML = "TURN OFF COOKIES!<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />Script by Alan aka \"That Guy Tyler Knows\"<br />Automatic voting goodness below:<hr /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />"
document.body.insertBefore(logo, document.body.firstChild);





var pollClosed3346582 = false;
var PDV_POLLRAND3346582 = false;

var PDV_a3346582 = "";
var PDV_o3346582 = "";
var PDV_id3346582 = 3346582;
var PDV_pt3346582 = 0;
var PDV_po3346582 = 0;
var PDV_s3346582 = 106;
var PDV_b3346582 = 1;
var PDV_l3346582 = 0;
var PDV_pr3346582 = 0;
var PDV_w3346582 = 3346582;
var PDV_share3346582 = 1;
var PDV_expire3346582 = 604800;
var PDV_version3346582 = 0;

var PDV_sl3346582 = 1;
var PDV_va3346582 = 0;

var PDV_lnk3346582 = 1;

var PDV_def3346582 = '#PDI_container3346582 .pds-box{font-family: Helvetica, Arial, sans-serif;background: #fff;border: 1px solid #ccc;width: 630px;font-size: 13px;text-align: left;color: #4e4e4e;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;} #PDI_container3346582 .pds-box A{outline: none;} #PDI_container3346582 .pds-clear{display: block;clear: both;} #PDI_container3346582 .pds-box-outer{padding: 14px;} #PDI_container3346582 .pds-question-top{font-size:24px;line-height: 120%;color: #333;font-weight: bold;padding: 5px 0px 20px 0px;position:relative;} #PDI_container3346582 .pds-answer{padding: 20px 0px 20px 0px;border-top: 1px solid #e8e8e8;border-bottom: 1px solid #e8e8e8;} #PDI_container3346582 .pds-answer label{color: #4e4e4e;font-size: 13px;font-weight: bold;line-height: 150%;position: relative;} #PDI_container3346582 .pds-answer-group{display: block;padding: 8px 0px 8px 0px;} #PDI_container3346582 .pds-answer-group BR{display: none;} #PDI_container3346582 .pds-answer-input{display: block;float:left;width: 25px;} #PDI_container3346582 .pds-input-label{display: block;float:left;width: 570px;cursor: pointer;} #PDI_container3346582 .pds-answer-other{padding: 0px 0px 0px 10px;} #PDI_container3346582 .pds-textfield{background: #FFF;border: 1px solid #d1d1d1;font-size: 12px;padding: 2px;width: 250px;} #PDI_container3346582 .pds-answer-other BR{display: none;} #PDI_container3346582 .pds-other-label{display: block;float:left;cursor: pointer;} #PDI_container3346582 .pds-feedback-group{display: block;padding: 8px 0px 8px 0px;} #PDI_container3346582 .pds-feedback-label{display: block;padding: 0px 0px 5px 0px;} #PDI_container3346582 .pds-feedback-per{font-weight: normal;} #PDI_container3346582 .pds-feedback-votes{font-weight: normal;} #PDI_container3346582 .pds-answer-feedback {background-color: #f1f1f1;border: 1px solid #d1d1d1;position: relative;} #PDI_container3346582 .pds-answer-feedback-bar {font-size: 2px;background: #3478e3;height: 18px;} #PDI_container3346582 .pds-vote {padding: 10px 0px;} #PDI_container3346582 .pds-votebutton-outer {} #PDI_container3346582 .pds-vote BR{display: none;} #PDI_container3346582 .pds-vote-button {color: #464646;padding: 3px 25px;white-space: nowrap;background:#F2F2F2 url(http://s3.wordpress.com/wp-admin/images/white-grad.png) repeat-x scroll left top;-webkit-border-radius: 11px;-moz-border-radius:11px;border-radius: 11px;border: 1px solid #999;cursor: pointer;font-size: 12px;font-family: \'Lucida Grande\',Verdana,Arial;text-decoration: none;line-height: 25px;font-weight: bold;float:left;white-space: nowrap;} #PDI_container3346582 .pds-vote-button:hover{border: 1px solid #333;} #PDI_container3346582 .pds-vote-button-load {color: #464646;padding: 3px 25px;white-space: nowrap;-webkit-border-radius: 11px;-moz-border-radius:11px;border-radius: 11px;border: 1px solid #999;cursor: pointer;font-size: 12px;font-family: \'Lucida Grande\',Verdana,Arial;text-decoration: none;line-height: 25px;font-weight: bold;float:left;white-space: nowrap;background:#EEE url(http://i.polldaddy.com/polls/vote-loader-eeeeee.gif) no-repeat scroll 50% 50%;} #PDI_container3346582 .pds-vote-button-load SPAN{visibility: hidden;} #PDI_container3346582 .pds-links A{font-family: Helvetica, Arial, sans-serif;font-size:12px;color: #4e4e4e;text-decoration: none;padding: 10px 0px 0px 15px;float:left;display: block;font-weight: bold;} #PDI_container3346582 .pds-links-back A{font-family: Helvetica, Arial, sans-serif;font-size:12px;color: #4e4e4e;text-decoration: none;padding: 10px 0px 0px 15px;float:left;display: block;font-weight: bold;} #PDI_container3346582 .pds-links A:hover {text-decoration: underline;} #PDI_container3346582 .pds-links-back A:hover {text-decoration: underline;} #PDI_container3346582 .pds-pd-link{float:right !important;} #PDI_container3346582 .pds-comments{padding: 10px 0px 0px 0px;} #PDI_container3346582 .pds-comments SPAN{font-weight: normal;} #PDI_container3346582 .pds-total-votes{padding: 10px 0px 0px 0px;position: relative;} #PDI_container3346582 .pds-total-votes SPAN{font-weight: bold;} #PDI_container3346582 div {margin:0;padding:0;}';

var PDV_POLL_q3346582 = 'If the GOP primary for U.S. Senate were held today, who would get your vote?'; var PDV_POLL_medType3346582 = '0'; var PDV_POLL_medID3346582 = '';
var PDV_A3346582 = new Array();


  PDV_A3346582[0] = new Array(4); PDV_A3346582[0][0] = "15543936"; PDV_A3346582[0][1] = "Jerry Moran";   PDV_A3346582[0][2] = "0"; PDV_A3346582[0][3] = "";

  PDV_A3346582[1] = new Array(4); PDV_A3346582[1][0] = "15543937"; PDV_A3346582[1][1] = "Todd Tiahrt";   PDV_A3346582[1][2] = "0"; PDV_A3346582[1][3] = "";


var PDV_l1_3346582 = 'View Results';
var PDV_l2_3346582 = 'Other:';
var PDV_l3_3346582  = '';

  
var PDV_l4_3346582 = 'Please choose an answer first!';

var PDV_l12_3346582  = 'Share This';

var PDV_l12_3346582 = 'Share This';


//v2.71 02/June/10
var protocol = document.location.protocol;
var a2a_track_pub = 'polldaddy';
var a2a_no_3p = 1;
var PD_ck3346582 = 0;
var PD_ck_name3346582 = 'PD_poll_3346582';

if (pollClosed3346582 == false)
 {
    var PDV_server3346582 = protocol + '//polls.polldaddy.com';
    var AA3346582 = new Array();
    var PDV_html3346582 = '<div style="margin-bottom: 0px; margin-top: 0px;" name="PDI_form3346582" id="PDI_form3346582"><div class="pds-box"><div class="pds-box-outer"><div class="pds-box-inner"><div class="pds-box-top"><div class="pds-question"><div class="pds-question-outer"><div class="pds-question-inner"><div class="pds-question-top">' + media3346582(PDV_POLL_medType3346582, PDV_POLL_medID3346582) + ' ' + unescape_HTML_3346582( PDV_POLL_q3346582 ) + '</div></div></div></div><div class="pds-answer"><span id="pds-answer3346582"></span>';
    if (PDV_po3346582 == 1)
    {
		PDV_html3346582 += '<span class="pds-answer-group">';
		
        if (PDV_pt3346582 == 0) {
            PDV_html3346582 += '<span class="pds-answer-input"><input type="radio" name="PDI_answer3346582" id="PDI_answerOther3346582" value="other" class="pds-radiobutton"/></span>';
        }
        PDV_html3346582 += '<label for="PDI_answerOther3346582" class="pds-other-label"><span class="pds-answer-span">' + PDV_l2_3346582 + '</span></label><span class="pds-answer-other"><br/><input class="pds-textfield" type="text" maxlength="80" id="PDI_OtherText3346582" name="PDI_OtherText3346582" onclick="PDI_checkOther3346582();" onchange="PDI_checkOther3346582(true);" /></span>';

		PDV_html3346582 += '<span class="pds-clear"></span>';
		PDV_html3346582 += '</span>';
    }

    PDV_html3346582 += '</div><div class="pds-vote"><div class="pds-votebutton-outer">';

    if ( PDV_l3_3346582 == '' )
    {
		PDV_l3_3346582 = 'Vote';
    }
	
	if ( PDV_s3346582 < 99 || PDV_def3346582.indexOf('input.pds-votebutton') != -1 )	
	{
		if (PDV_l3_3346582 == 'Vote' || PDV_l3_3346582 == '')
	    {
	        PDV_html3346582 += '<input type="button" class="pds-votebutton" style="border:none;cursor: pointer;" src="' + ( is_secure() ? 'https://polldaddy' : 'http://i.polldaddy' ) + '.com/polls/spacer.gif" onclick="PD_vote3346582(0);">';
	    }
	    else
	    {
	        PDV_html3346582 += '<input type="button" class="pds-votebutton-pack" value="' + PDV_l3_3346582 + '"  onclick="PD_vote3346582(0);" />';
	    }
	}
	else
	{
		PDV_html3346582 += '<a href="javascript:PD_vote3346582(0);" id="pd-vote-button3346582" class="pds-vote-button"><span>' + PDV_l3_3346582 + '</span></a>';
	}

	PDV_html3346582 += '<span class="pds-links">';

    if (PDV_pr3346582 == 2) {
        PDV_html3346582 += '<br/>';
    }
    else {
        PDV_html3346582 += '<a href="javascript:PD_vote3346582(1);" class="pds-view-results">' + PDV_l1_3346582 + '</a><br/>';
    }

	if( typeof PDV_share3346582 != "undefined") {
		if (PDV_share3346582 == 1 ) {
			PDV_html3346582 += '<a class="a2a_dd pds-share"  href="javascript:">' + PDV_l12_3346582 + '</a>';
		}
	}
	
    if (PDV_lnk3346582 == 1) {
        PDV_html3346582 += '<a href="' + protocol + '//polldaddy.com/features-polls/?source=poll-front" target="_blank" class="pds-pd-link">Polldaddy.com</a>';
    }

	PDV_html3346582 += '<span class="pds-clear"></span>';
	PDV_html3346582 += '</span><span class="pds-clear"></span>';
	
    PDV_html3346582 += '</div></div></div></div></div></div></div>';

    for (PDV_x = 0; PDV_x < PDV_A3346582.length; PDV_x++)
    {
        if (PDV_pt3346582 == 0)
        {
            AA3346582[PDV_x] = '<span class="pds-answer-group"><span class="pds-answer-input"><input class="pds-radiobutton" type="radio" id="PDI_answer' + PDV_A3346582[PDV_x][0] + '" value="' + PDV_A3346582[PDV_x][0] + '" name="PDI_answer3346582" /></span><label for="PDI_answer' + PDV_A3346582[PDV_x][0] + '" class="pds-input-label"><span class="pds-answer-span">' + unescape_HTML_3346582( PDV_A3346582[PDV_x][1] ) + '</span></label>' + media3346582(PDV_A3346582[PDV_x][2], PDV_A3346582[PDV_x][3]) + '<span class="pds-clear"></span><br/></span>';
        }
        else
        {
            AA3346582[PDV_x] = '<span class="pds-answer-group"><span class="pds-answer-input"><input class="pds-checkbox" type="checkbox" id="PDI_answer' + PDV_A3346582[PDV_x][0] + '" value="' + PDV_A3346582[PDV_x][0] + '" name="PDI_answer' + PDV_A3346582[PDV_x][0] + '" onclick="javascript:PDF_mc3346582(this);" /></span><label for="PDI_answer' + PDV_A3346582[PDV_x][0] + '" class="pds-input-label"><span class="pds-answer-span">' + unescape_HTML_3346582( PDV_A3346582[PDV_x][1] ) + '</span></label>' + media3346582(PDV_A3346582[PDV_x][2], PDV_A3346582[PDV_x][3]) + '<span class="pds-clear"></span><br/></span>';
        }
    }
}

function PDF_mc3346582(obj){
	if ( PDV_pt3346582 > 1 ){
		var nc = 0;
		for (i = 0; i < AA3346582.length; i++)
	    {
	        r = document.getElementById(AA3346582[i].substring(AA3346582[i].indexOf('id=') + 4, AA3346582[i].indexOf('"', AA3346582[i].indexOf('id=') + 4)));
	        if (r.type == "checkbox" && r.checked) { nc += 1; }
	    }
	
		if (PDV_po3346582 == 1)
	    {
			var otherText = document.getElementById("PDI_OtherText3346582").value;
			if( otherText.length > 0 ) { nc += 1; }	
		}		
		
		if ( nc > PDV_pt3346582 ){
			obj.checked = false;
			obj.disabled = true;
		}
		
		if ( nc >= PDV_pt3346582 ){
			for (i = 0; i < AA3346582.length; i++)
		    {
		        r = document.getElementById(AA3346582[i].substring(AA3346582[i].indexOf('id=') + 4, AA3346582[i].indexOf('"', AA3346582[i].indexOf('id=') + 4)));
		        if (r.type == "checkbox" && !r.checked) { r.disabled = true; }
		    }
		}
		else{
			if (PDV_po3346582 == 1) { document.getElementById("PDI_OtherText3346582").disabled=false; }
			for (i = 0; i < AA3346582.length; i++)
		    {
		        r = document.getElementById(AA3346582[i].substring(AA3346582[i].indexOf('id=') + 4, AA3346582[i].indexOf('"', AA3346582[i].indexOf('id=') + 4)));
		        if (r.type == "checkbox" && !r.checked) { r.disabled = false; }
		    }
		}
	}
}

function PDF_a3346582()
 {
    PDF_o3346582();
    var r;
    if (PDV_pt3346582 == 0)
    {
    	for (var i = 0; i < AA3346582.length; i++)
        {
            r = document.getElementById(AA3346582[i].substring(AA3346582[i].indexOf('id=') + 4, AA3346582[i].indexOf('"', AA3346582[i].indexOf('id=') + 4)));
            if (r.checked) {
                return r.value + ",";
            }
        }
        r = document.getElementById("PDI_answerOther3346582");
        if (r) {
            if (r.checked) {
                return r.value + ",";
            } else {
                return '';
            }
        } else {
            return "";
        }
    }
    else
    {
        for (i = 0; i < AA3346582.length; i++)
        {
            r = document.getElementById(AA3346582[i].substring(AA3346582[i].indexOf('id=') + 4, AA3346582[i].indexOf('"', AA3346582[i].indexOf('id=') + 4)));
            if (r.type == "checkbox" && r.checked)
            {
                PDV_a3346582 = PDV_a3346582 + r.value + ",";
            }
        }
        return PDV_a3346582;
    }
}
function PDF_o3346582(r) {
    if (PDV_po3346582 == 1) {
        PDV_o3346582 = document.getElementById("PDI_OtherText3346582").value;
    }
}
function PDI_checkOther3346582( lostfocus )
 {
	var reset = false;
	if( lostfocus ){
		var ot = document.getElementById("PDI_OtherText3346582").value;
		if( ot.length == 0 ){ reset = true; }
	}
	
    if (PDV_pt3346582 == 0)
    {
		if(lostfocus && reset){ document.getElementById("PDI_answerOther3346582").checked = false; }
		else{ document.getElementById("PDI_answerOther3346582").checked = true; }
    }
	else if ( PDV_pt3346582 > 1 ){
		var nc = 1;
		obj = document.getElementById("PDI_OtherText3346582");
		if(lostfocus && reset){ nc = 0; }
		
		for (i = 0; i < AA3346582.length; i++)
	    {
	        r = document.getElementById(AA3346582[i].substring(AA3346582[i].indexOf('id=') + 4, AA3346582[i].indexOf('"', AA3346582[i].indexOf('id=') + 4)));
	        if (r.type == "checkbox" && r.checked) { nc += 1; }
	    }

		if ( nc > PDV_pt3346582 ){
			obj.disabled=true;
			obj.value='';
			for (i = 0; i < AA3346582.length; i++)
		    {
		        r = document.getElementById(AA3346582[i].substring(AA3346582[i].indexOf('id=') + 4, AA3346582[i].indexOf('"', AA3346582[i].indexOf('id=') + 4)));
		        if (r.type == "checkbox" && !r.checked) { r.disabled = true; }
		    }
		}
		else if( nc < PDV_pt3346582 ){
			obj.disabled=false;
			for (i = 0; i < AA3346582.length; i++)
		    {
		        r = document.getElementById(AA3346582[i].substring(AA3346582[i].indexOf('id=') + 4, AA3346582[i].indexOf('"', AA3346582[i].indexOf('id=') + 4)));
		        if (r.type == "checkbox" && !r.checked) { r.disabled = false; }
		    }
		}
	}
}
function PD_vote3346582(R)
 {
    var randomnumber = Math.floor(Math.random() * 11);
    var tags = pd_get_tags3346582();
    if (R == 1)
    {
        var s = document.createElement("SCRIPT");
        s.charset = "utf-8";
        s.src = PDV_server3346582 + "/vote-js.php?s=" + PDV_s3346582 + "&vr=1&b=" + PDV_b3346582 + "&p=" + PDV_id3346582 + "&l=" + PDV_l3346582 + "&sl=" + PDV_sl3346582 + "&pr=" + PDV_pr3346582 + "&pt=" + PDV_pt3346582 + "&va=" + PDV_va3346582 + "&cookie=" + PD_ck3346582 + "&rdm=" + randomnumber + "&url=" + escape(location.href) + "&w=" + PDV_w3346582 + ( tags.length > 0 ? '&tags=' + tags : '' );
        var h = document.getElementsByTagName("head").item(0);
        h.appendChild(s);
    }
    else
    {
        if (PDV_b3346582 > 0 && PD_ck3346582 == 0 ) {
            Set_Cookie3346582(PD_ck_name3346582, 'true', 0, '/', '', '');
        }
        PDV_a3346582 = '';
        PDV_a3346582 = PDF_a3346582(document.getElementById("PDI_form3346582"));
        if (PDV_a3346582.length == 0 && PDV_o3346582.length == 0)
        {
            alert(PDV_l4_3346582);
        }
        else
        {
			if ( PDV_def3346582.indexOf('input.pds-votebutton') == -1 ) {
				document.getElementById('pd-vote-button3346582').className = 'pds-vote-button-load';
			}
	
            var s = document.createElement("SCRIPT");
            s.charset = "utf-8";
            s.src = PDV_server3346582 + "/vote-js.php?s=" + PDV_s3346582 + "&b=" + PDV_b3346582 + "&p=" + PDV_id3346582 + "&a=" + PDV_a3346582 + "&o=" + PDV_o3346582 + "&l=" + PDV_l3346582 + "&sl=" + PDV_sl3346582 + "&pr=" + PDV_pr3346582 + "&pt=" + PDV_pt3346582 + "&va=" + PDV_va3346582 + "&cookie=" + PD_ck3346582 + "&rdm=" + randomnumber + "&url=" + escape(location.href) + "&w=" + PDV_w3346582 + ( tags.length > 0 ? '&tags=' + tags : '' );
            var h = document.getElementsByTagName("head").item(0);
            h.appendChild(s);
        }
    }
}

function pd_get_tags3346582() {
	if( typeof pd_tags == "undefined" ) return '';
	var tags = '';
					
	for ( var key in pd_tags )
		tags += pd_url_encode3346582( key ) + ':' + pd_url_encode3346582( pd_tags[ key ] ) + ';';
		
	return tags.slice(0,-1);
}

function pd_url_encode3346582( s ) {
	return encodeURIComponent( s ).replace( /\%20/g, '+' ).replace( /!/g, '%21' ).replace( /'/g, '%27' ).replace( /\(/g, '%28' ).replace( /\)/g, '%29' ).replace( /\*/g, '%2A' ).replace( /\~/g, '%7E' );
}

var PD_pollString3346582 = PDV_html3346582;

function PDV_rand3346582(myArray) {
    var i = myArray.length;
    if (i == 0) return false;
    while (--i) {
        var j = Math.floor(Math.random() * (i + 1));
        var tempi = myArray[i];
        var tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
    return myArray;
}


function PDV_go3346582()
 {
 	if ( is_secure() ){
 		PDV_def3346582 = PDV_def3346582.replace(/http:\/\/i.polldaddy/g,'https://polldaddy');
 		PDV_def3346582 = PDV_def3346582.replace(/http:\/\/s3.wordpress/g,'https://s-ssl.wordpress');
 	}
    if (!document.getElementById('poll_style3346582')) {
        fileref = document.createElement("style");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("id", "poll_style3346582");
        if (fileref.styleSheet)
        // IE
        {
            fileref.styleSheet.cssText = PDV_def3346582;
        }
        else
        // the world
        {
            fileref.appendChild(document.createTextNode(PDV_def3346582));
        }
        document.getElementsByTagName("head").item(0).appendChild(fileref);
    }
    if (!document.getElementById('PDI_container3346582')) {
        document.write('<a name="pd_a_3346582" style="display: inline; padding: 0px; margin: 0px;"></a><div class="PDS_Poll" id="PDI_container3346582"></div>');
    }    
    if( typeof PDV_version3346582 !== "undefined" ) {
       	PD_ck_name3346582 += ( PDV_version3346582 > 0 ? '.' + PDV_version3346582 : '' );
    }    
    if (Get_Cookie3346582(PD_ck_name3346582) == 'true') {
        PD_ck3346582 = 1;
    }

    document.getElementById('PDI_container3346582').innerHTML = PD_pollString3346582 + '<img src="' + protocol + '//pixel.quantserve.com/pixel/p-ab3gTb8xb3dLg.gif" style="display: none;" border="0" height="1" width="1" alt="Quantcast"/>';

    if (PDV_POLLRAND3346582) {
        AA3346582 = PDV_rand3346582(AA3346582);
    }
    y3346582 = '';
    for (x3346582 = 0; x3346582 < AA3346582.length; x3346582++) {
        y3346582 = y3346582 + AA3346582[x3346582];
    }
    document.getElementById('pds-answer3346582').innerHTML = y3346582;
	share3346582();
}
function Set_Cookie3346582(name, value, expires, path, domain, secure)
 {
    var today = new Date();
    today.setTime(today.getTime());
    if(typeof(PDV_expire3346582) !== 'undefined') {
    	expires = parseInt( PDV_expire3346582 );
    }
    if (expires>0) {
        expires = expires * 1000;
    } else{
    	expires = 60 * 60 * 24 * 30 * 1000;
    }
    
    expires = today.getTime() + (expires);
    var expires_date = new Date(expires);

    document.cookie = name + "=" + escape(expires) +
    ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
    ((path) ? ";path=" + path: "") +
    ((domain) ? ";domain=" + domain: "") +
    ((secure) ? ";secure": "");
}

function Get_Cookie3346582(check_name)
 {
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false;

    for (i = 0; i < a_all_cookies.length; i++)
    {
        a_temp_cookie = a_all_cookies[i].split('=');
        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
        if (cookie_name == check_name)
        {
            b_cookie_found = true;
            if (a_temp_cookie.length > 1)
       		{
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            }
            if( cookie_value == 'true' )
            {
            	return cookie_value;
            }
            else
			{
				var today = new Date();
   			 	cookie_value = parseInt( cookie_value );
   			 	if( cookie_value > today.getTime() )
				{
					return 'true';
				}
			}
            break;
        }
        a_temp_cookie = null;
        cookie_name = '';
    }
    if (!b_cookie_found)
    {
        return null;
    }
}

if (pollClosed3346582 == false) {
    PDV_go3346582();
}

function st_go3346582(a)
 {
    var i;
    var u = protocol + '//stats.polldaddy.com/p.gif?host=' + escape(document.location.host) + '&rand=' + Math.random();

    for (i in a)
    {
        u = u + '&' + i + '=' + escape(a[i]);
    }
    u = u + '&ref=' + escape(document.referrer);
    var TrkImg = new Image();
    TrkImg.src = u;
}

st3346582 = {
    "p": "3346582",
    "v": "0"
};

if( !is_secure() ) {
	st_go3346582(st3346582);
}

function share3346582()
{
	if( typeof PDV_share3346582 != "undefined") {
		if (PDV_share3346582 == 1 ) {
			a2a_linkname = 'Poll: ' + PDV_POLL_q3346582;
			a2a_linkurl = document.location + '#pd_a_3346582';
			a2a_track_links = 'custom';
			a2a_track_links_key = document.location + '#pd_a_3346582';
			a2a_onclick = 1;
			
	        var s = document.createElement("SCRIPT");
	        s.charset = "utf-8";
	        s.src = protocol + "//static.addtoany.com/menu/page.js";
	        var h = document.getElementsByTagName("head").item(0);
	        h.appendChild(s);
		}
	}
}

function media3346582(medType, medID)
 {
    switch (medType)
    {
    case '0':
        {
            return '';
            break;
        }
    case '1':
        {
            return '<div style="padding: 10px 0px;"><a target="_blank" href="' + protocol + '//services.nirvanix.com/polldaddy/polldaddy/images/' + medID + '.jpg"><img border="0" title="Click to enlarge" src="' + protocol + '//services.nirvanix.com/polldaddy/polldaddy/images/' + medID + '_sml.jpg"></a></div>';
            break;
        }
    case '2':
        {
            return '<div style="padding: 10px 0px;"><object width="200" height="161"><param name="movie" value="' + protocol + '//www.youtube.com/v/' + medID + '&amp;hl=en&amp;fs=1"><param name="allowFullScreen" value="true"><embed type="application/x-shockwave-flash" allowfullscreen="true" width="200" height="161" src="' + protocol + '//www.youtube.com/v/' + medID + '&amp;hl=en&amp;fs=1"></embed></object></div>';
            break;
        }
    case '3':
        {
            return '<div style="padding: 10px 0px;"><object width="200" height="163"><param name="movie" value="' + protocol + '//seesmic.com/embeds/wrapper.swf"><param name="allowScriptAccess" value="always"><param name="allowFullScreen" value="true"><param name="flashVars" value="video=' + medID + '&amp;version=threadedplayer"><embed src="' + protocol + '//seesmic.com/embeds/wrapper.swf" type="application/x-shockwave-flash" allowFullScreen="true" wmode="transparent" allowScriptAccess="always" width="200" height="163" flashvars="video=' + medID + '&amp;version=threadedplayer"></embed></object></div>';
            break;
        }
    }
}

function unescape_HTML_3346582(html) {
	var htmlNode = document.createElement("DIV");
	
	htmlNode.innerHTML = html;
	
	if(htmlNode.innerText !== undefined)
		return htmlNode.innerText; // IE
	
	return htmlNode.textContent; // FF
}

if (pollClosed3346582 == true) {
	share3346582();
}

function is_secure() {
	return "https:" == document.location.protocol ? true: false;
}


radio_buttons = document.getElementsByTagName("input")

radio_buttons[2].click()

PD_vote3346582(0)


function  refresh_page()
{

	location.reload(true)

}

setTimeout(refresh_page, 10000);
