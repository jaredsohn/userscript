// ==UserScript==
// @name              	Indexers to SABnzbd
// @namespace     		banza.net
// @include           	http://binsearch.info/*
// @include           	http://www.binsearch.info/*
// @include           	http://binsearch.net/*
// @include           	http://www.binsearch.net/*
// @include           	http://nzbindex.nl/*
// @include           	http://www.nzbindex.nl/*
// @require           	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version          	0.4.2.3
// @grant             	GM_getValue
// @grant             	GM_setValue
// @grant             	GM_log
// @grant             	GM_xmlhttpRequest
// @grant             	GM_unsafeWindow
// @grant             	GM_addStyle
// ==/UserScript==

jQ = jQuery.noConflict(true);

unsafeWindow.jQ = jQ;

var Settings = {};

var sabnzbd_icon = '<img style="margin-bottom:-3px;" src="data:image/gif;base64,R0lGODlhEAAQAPZWAAAAAAkFAA8KABIMABYOABgSAB0WACEYACMZACcdADYmADgnAD0rAEEuAEMwAEgyAEoyAEszAEw1AE83AFQ5AFY8AFc9AFg+AFxAAF1BAF9CAGZGAGdHAH9WAIldAI9hAJppAKNvAKRvAMGBAMeFAMqJANGOANmTAN2VAOGYAOidAOueAO2gAPKjAPOkAPqoAPypAP2pAP+tAP+uAP+vAP+wAP+0AP+3AP+5AP++AP/BAP/EAP/HAP/KAP/PA//TDP/YGP/bH//dJv/iMv/jN//lOP/tUP/uVf/1Zf/2Zv/2Z//3a//3bP/4cP/4cf/6dv//m///oP//zf//2///3v7+/v///6usrQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAFcALAAAAAAQABAAAAd+gFeCg4SFhC9QTE6LT1Aphlc8VlNUlVRWNpA4UUlLS0pNUjKQNkhDREVGR0EkkDRCPj9AOighHZAwPTs5LiMiIB6QLDczKyYkAMmFJS81NTEtKicAVQAfHhyCydvc1craVeHU4uHVg9Tc6NXm4OTk6OfJ6+rw7evu7Ffp+9+BADs=" />';

var icon32 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3QYeDR4119gY8gAABA1JREFUWMPNl81rXFUYh597zr1zZ5ImMVUTY5UQUYIUXehGsYuCtRsVNwpuimI3iqCo4KKudFNF/AfcKG6s+AEiVah2o40iTVSq5gubSZshNTExyUzmzv08x8W5k0zSmTg3VuuFYWDmved93t/7cc6Bq/xYrf7IOdg37uWo6/CoFLhKkWRYVWpN4Pl8XFriXQ1+K1O76Y8Sa6ifNwav58VbbwBbglLtRyUERDGcX+CQbXOg+DtHgaBtBboK7Nk/yOqJ55GDTy8D0xmFdYB+Tr96M6+8D2enOKBgpG0FhEXOkcjB/QB7gW6gIwNABNzEwdtBCrAlt4UJ3wK6LQAAxybNXAn4NY0qC0A3Fd8AAG6qdnsAlgW2ABRAEZjbBUCJKAZh7VTqOyggRZ13BoI5sDIA6AjcKaIEpNzZtKUCjkwViKfBm8ve4O4t9XoyKmRWQKYKeBehOgeiDQVkAdzrjAKzbzOzaAKxrN0qoIHyNFRLIOwdGt8B91qoFGFynjO/wA9FuLQCHe4uUiAaAaol8JdaOLYhdw2UL1IeP883kzD7B6z7kCjIORtdkD0Fjl0HmIewyfiygTAkvOAxOgNzyxAlsCdv4P0IRJB2U1aAOCHeUCAA4rQgGxdbhMkiLKxBrKC30zitpbBam3EsBShN1GwGbAHo6cS1QGiN1tBXyEESgFxviFoBIfy5BItlCGPoKhhHfgRKbzoHCGJTzN0d9K1W6ck7+LbEShSq7Jm9wQa4Z5jHB/s4FkbkE03oCHqCyDgolDdpw8jkN4iN1HUbYW06BaOI0mkdAfffycu25KlYodAIYeGdPsezC6uM2ABDfbwwvI87Hr7b5CyKIZ+DQmd9sACJkbOQM/Xhh1v7ux690gZGK9MBwwMQJfTWQnoTZepEaejv5bmFVcZsgC/P8WRnnu8vrdD14OF06obpRFUpQAwygYINcWSc18KtADqNPEkMpJvAQC94AdQiqPqwUoWFFSrTJUYAywZYWmPigzPc50d8tVSh74lH0s2vvn3oNFmJgbLF1uFSj1qlnwdeu7zYXj9iQIqLzH9+lrfChBOAv1GElRo/f/Id91ZrfOgF3PXMY8BAN1TKRoXUOenmIoE8m0WXKJP7JF1RNZxghBCsefDTLL+d+pHjSvMpsHxZG3oBMyfHOJxoPvICDr50pAxDw7A6ZVpRpm2ZtqMEHAWuY5zHiQFp9nw9wejIOMeBU8D6Btx2wzBm+eQoD302xjtvvgdMTMG+Q9DZbXZ1N8XOme9czlS7I83RrdXkGxnnGPBFo/PGI5m+0qfd7SlodXy1m73Q/KApMtm1gtluZ7e7SFYH7cKLq30xsf8uf1lTsGuAKy1t25eY/00KdhNFu+/sZPevzYF/ejn+z56/AGxnuu/oq/qJAAAAAElFTkSuQmCC';
var ajaxloader = 'data:image/gif;base64,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';
var check = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWFJREFUeNqkkktPwlAQhQ+3RTQKibjwVUsVDAjGaDBGjCs2bvxP4h9y4cLopkvjwrAyvlKTAuJjY9SgQFt7vfcuGkJaQJlFJ3c638lk5oQopRgmCIYMmX/OTo8GBoymTlNjxdC/JuBwbnFX5D8LcCirbWMnt4+sVvBE5EHhjLqJfLqIlv2JrZU9VqW4NnVK/Jq738vKOtZSBbSsd1hOA+dXxwy+ANvFIeluTqt5T4Tn5HwOq8kNtJ0POG4Tl3c67mtlAbOWktwJa0oCqkbQsOMwnnU6OxPFtPqGl/YJJDKKitlC7enVg70diNMsZJBcmsKX/QhFBebUmBD+cdsIS1Ff2LsCLxq1W9wYJkKs5MKB69psTxQyGQ+EO89Y4j+r9TpM8xsRaRIjUgwROY5qxQqEu30gRHhzteJgIpIQuRfs5wMuAqOuH4RJFHyiXnCQE8UkD2wn/eBeThST9IN5/AowADW6t1b7X9/tAAAAAElFTkSuQmCC';
var warn = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARtJREFUeNqkU7sKwkAQHIMIClYWgqDVdfZp7YyClaU/YGUhSFq1tbH2JxRE8PETlv7BFaJYCAo2cXclxMedCllYbpjZvZ1L7pwgCBAnHcSMZAjWq+mHmB5PAl6v3XbiXfNqTVmtDri50GiAM9zoqwNTqE5HVr1YWGsc6/R6HbhcJBnbXFgdqFYLo2JRsL/bQS+X/zmQ6ZUKcDxGJGHmTC6MR1CeB+z3EUFYuF8OZLrrPpoPh0hgTBxr7y4+voHKZID5HDif4VerD3I2A7JZqFIJ2uZAppfLxBDFm1DDaLORZCwcaVzz7OLVQSoF5PPEEn27we/1XrVcDjidzL+RrutQjyd9vd3+vP9ca3IwIOHfNzQIQYKfZJy4CzAA3myQydfbv6MAAAAASUVORK5CYII=';

var styles = ' \
  #sabnzbd_safety_sreen {position: fixed; top: 0; left: 0; display: none; \
  	width: 100%; min-height: 100%; height: auto; background-color: rgba(0,0,0,0.4)} \
  #sabnzbd_settings_form {width: 80ex; border: 6px solid black; margin: 10% auto; \
    	background-color: white; border-radius: 10px; padding: 2ex 2ex 3ex 2ex; } \
  #sabnzbd_settings_form h4 { background: url(' + icon32 + ') no-repeat right center; padding: 10px 0px; margin-right: 2ex; } \
  #sabnzbd_settings_form div { margin: 0.2ex 0; } \
  .left_col {display: inline-block; text-align: right; width: 20ex; padding-right: 2ex} \
  .right_col {display: inline-block; width: 50ex} \
  .hidden {display: none;} \
  #sabnzbd_safety_sreen input[type=submit] {float: right;} \
  #sabnzbd_safety_sreen input[type=text] {width: 100%;} \
  div.sabnzbd span, div.sabnzbd form {display:inline-block;} \
  div.sabnzbd span.m_tag{ min-width: 24px; min-height: 16px; background-repeat: no-repeat; margin-bottom: -2px; } \
  div.sabnzbd span.m_tag.loading{ background-image: url(' + ajaxloader + '); } \
  div.sabnzbd span.m_tag.success{ background-image: url(' + check + '); } \
  div.sabnzbd span.m_tag.error{ background-image: url(' + warn + '); } \
  ';

var sabnzbd_form = '<div class="sabnzbd"><span id="sab_m_tag" class="m_tag"></span> \
    <form style="display:inline;"> <input type="text" id="sabnzbd_name" value="' + jQ('input[name=q]').val() 
    + '" class="b" size="50" /><select id="sab_category" name="sab_category" /> \
    <select id="sab_priority"><option value="">Priority</option><option value="2">Force</option> \
		<option value="1">High</option><option value="0">Normal</option><option value="-1">Low</option></select> \
	<select id="sab_pp"><option value="">Processing</option><option value="0">Download</option> \
    	<option value="1">+Repair</option><option value="2">+Unpack</option><option value="3">+Delete</option></select> \
    <input class="b" id="post_to_sabnzbd" type="submit" value="SABnzbd" /></form></div>';
    
var settings_form = '<div id="sabnzbd_safety_sreen"> \
	<div id="sabnzbd_settings_form"> \
        <h4 style="text-align: center">SABnzbd-Settings</h4> \
        <div class="left_col" title"e.g. \'192.168.82.5:8080\'">Host/Ip[:Port]:</div> \
        <div class="right_col"><input type="text" id="sabnzbd_host"></div> \
        <div class="left_col">Api-key:</div> \
        <div class="right_col"><input type="text" id="sabnzbd_api_key"></div> \
        <div class="left_col">Categories:</div> \
        <div id="sabnzbd_categories" type="div" class="right_col"></div> \
        <div id="sabnzbd_last_category" type="div" class="hidden"></div> \
        <div id="sabnzbd_last_priority" type="div" class="hidden"></div> \
        <div id="sabnzbd_last_pp" type="div" class="hidden"></div> \
        <div class="left_col">Last Sync:</div> \
        <div id="sabnzbd_last_sync" type="div" class="right_col"></div> \
        <div class="left_col">Version:</div> \
        <div id="sabnzbd_version" type="div" class="right_col"></div> \
        <br /> \
       	<div class="left_col"></div>  \
       	<div class="right_col"><input id="sabnzbd_sync" type="button" value="Sync Categories" title="get version and categories" /><input type="submit" value="Save" /></div> \
   </div></div>';

var default_settings = {
	sabnzbd_host: 'localhost:8080',
    sabnzbd_api_key: '',
    sabnzbd_user_name: '',
    sabnzbd_password: '',
    sabnzbd_version: 'unknown',
    sabnzbd_http_auth_basic: false,
    sabnzbd_last_sync: 'never',
    sabnzbd_categories: ["*"],
    sabnzbd_last_category: "*",
    sabnzbd_last_priority: "",
    sabnzbd_last_pp: ""
};

var settings_keys = ['sabnzbd_host', 'sabnzbd_api_key', 'sabnzbd_version', 'sabnzbd_last_sync', 
                     'sabnzbd_categories', 'sabnzbd_last_category', 'sabnzbd_last_priority', 'sabnzbd_last_pp'];

var last_opts = ['category', 'priority', 'pp'];

var accessors_map = {
    get: {
        text: function(jq_ob){
            return jq_ob.val();
        },
        div: function(jq_ob){
            return jq_ob.data('data');
        },
        checkbox: function(jq_ob){
            return jq_ob[0].checked;
        }
    },
    set: {
        text: function(jq_ob, val){
            jq_ob.val(val);
        },
        div: function(jq_ob, val){
            console.log(['val', val]);
            jq_ob.data('data',val);
            jq_ob.html(val.toString());
        },
        checkbox: function(jq_ob, val){
            jq_ob[0].checked = val;
        }
	}
};


var Functions = {

	show_settings_dialog: function(ev){
    	//var settings = Functions.get_settings();
        console.log(Settings);
        settings_keys.forEach(function(i,index){
            jq_ob = jQ('#' + i);
            accessors_map['set'][jq_ob.attr('type')](jq_ob, Settings[i]);
        });
    	jQ('#sabnzbd_safety_sreen').fadeIn();
    	jQ('#sabnzbd_safety_sreen').data('dirty', false);
    	return false;
	},
    hide_settings_dialog: function(){
    	if (jQ('#sabnzbd_safety_sreen').data('dirty')){
        	if (!confirm('Close without saving changes?')){
            	return;
			}
        };
    	jQ('#sabnzbd_safety_sreen').fadeOut();
    },
	get_settings: function(){
        var settings = JSON.parse(GM_getValue('sabnzbd_settings', '{}'));
        //console.log(settings);
        settings = jQ.extend(default_settings, settings);
        return settings;
	},
    synchronize: function(){
        settings = {};
        ['sabnzbd_host','sabnzbd_api_key'].forEach(function(i,index){
            jq_ob = jQ('#' + i);
            settings[i] = accessors_map['get'][jq_ob.attr('type')](jq_ob);
        });
        var api_names = {version: 'version', categories: 'get_cats'};
        var successes = [];
        //var success = false;
        ['version', 'categories'].forEach(function(f){
			GM_xmlhttpRequest({
			    method: "GET",
	    		url: 'http://' + settings["sabnzbd_host"] + '/api?&apikey=' + settings["sabnzbd_api_key"] + '&mode=' + api_names[f] + '&output=json',
	    		onload: function(response) {
                    console.log(['f', f, response, response.responseText]);
                    var responded_obj = JSON.parse(response.responseText);
                    if (responded_obj[f] == undefined) {
                       	successes.push(false);
                        alert('Something went wrong!\n\n' + responded_obj['error']);
                    } else {
                        jq_ob = jQ('#sabnzbd_' + f);
                        accessors_map['set'][jq_ob.attr('type')](jq_ob, responded_obj[f]);
                       	successes.push(true);
                        if (successes.length == 2 && successes.indexOf(false) == -1){
	                        var jq_ob = jQ('#sabnzbd_last_sync');
    	                    accessors_map['set'][jq_ob.attr('type')](jq_ob,Date());
        	                jQ('#sabnzbd_safety_sreen').data('dirty', true);
                        }
                    }
                }
            });
        });
    },
    save_settings: function(){

        Settings = default_settings;
        console.log(Settings);
        
        settings_keys.forEach(function(i,index){
            jq_ob = jQ('#' + i);
            Settings[i] = accessors_map['get'][jq_ob.attr('type')](jq_ob);
        });

        Functions.fill_categories();

		Functions.store_settings();
        
    	jQ('#sabnzbd_safety_sreen').data('dirty', false);
    	jQ('#sabnzbd_safety_sreen').fadeOut();
	},
    //store_option: function(opts){  // slightly superfluous

	//	Settings = jQ().extend(Settings, opts);

	//	Functions.store_settings();
    //},
    store_settings: function(){
        
        console.log(Settings);
    
		GM_setValue('sabnzbd_settings', JSON.stringify(Settings));
    },
    fill_categories: function(){
        
        console.log('fill', Settings);
    
   		var opts = jQ.map(Settings['sabnzbd_categories'],function(i){
        	return '<option value="' + i + '">' + i + "</option>";
        }).join('');
   		jQ("#sab_category").html(opts);
        last_opts.forEach(function(opt){
            jQ("#sab_" + opt).val(Settings['sabnzbd_last_' + opt])
        });
	},
    load_and_post: function(ev){
        ev.preventDefault();
        //var settings = Functions.get_settings();
        if (!Settings['sabnzbd_api_key']){
            alert('Sorry, Api-key must be set');
            return false;
        }
        last_opts.forEach(function(opt){
	        Settings['sabnzbd_last_' + opt] = jQ("#sab_" + opt).val();
        });
        Functions.store_settings();
        var form = jQ(idx_spec['indexer_form']);
        var m_tag = jQ('.m_tag');
        ['loading','error','success'].forEach(function(c){m_tag.removeClass(c)});
        m_tag.addClass('loading');
        GM_xmlhttpRequest({
            method: "POST",
            url: form.attr('action'),
            data: form.serialize(),
            onerror: function(){
                m_tag.removeClass('loading').addClass('error');
            },
            onload: function(response) {
                console.info(response);
                GM_log(Settings['sabnzbd_host']);
                //m_tag.html('Uploading NZB to Sabnzbd at ' + Settings['sabnzbd_host']).css('color','blue');
                var eol = '\r\n';
                var ran_str = '---------------------------' + Math.random() * 10e17;
                var data = '--' + ran_str + eol +
                    'Content-Disposition: form-data; name="name"; filename="' + Math.random() * 10e17 + '.nzb"' + eol +
                    'Content-Type: application/xml' + eol + eol +
                    response.responseText + eol +
                    '--' + ran_str + eol +
                    'Content-Disposition: form-data; name="apikey"' + eol + eol +
                    Settings['sabnzbd_api_key'] + eol +
                    '--' + ran_str + eol +
                    'Content-Disposition: form-data; name="mode"' + eol + eol +
                    'addfile' + eol +
                    '--' + ran_str + eol +
                    'Content-Disposition: form-data; name="nzbname"' + eol + eol +
                    jQ('#sabnzbd_name').val() + eol +
                    '--' + ran_str + eol +
                    'Content-Disposition: form-data; name="cat"' + eol + eol +
                    jQ("#sab_category").val() + eol +
                    '--' + ran_str + eol +
                    'Content-Disposition: form-data; name="priority"' + eol + eol +
                    jQ("#sab_priority").val() + eol +
                    '--' + ran_str + eol +
                    'Content-Disposition: form-data; name="pp"' + eol + eol +
                    jQ("#sab_pp").val() + eol +
                    '--' + ran_str + '--' + eol + eol;
                GM_xmlhttpRequest({
                    method: "POST",
                    url: 'http://' + Settings['sabnzbd_host'] + '/api',
                    data: data,
                    headers: { 'Content-Type': 'multipart/form-data; boundary=' + ran_str, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' },
                    onerror: function(resp){
                        m_tag.removeClass('loading').addClass('error');
                    },
                    onload: function(resp){ console.info(resp); m_tag.removeClass('loading').addClass('success') }
                });
            }
        });
    }
};

var indexer_specifics = {
	'binsearch.info': {
    	prepare: function(){
		  	jQ('iframe').remove();
        },
    	setts_lnk: function(){

			var top_nav_td = jQ('td a[href=\\/rssfeed\\.php]').closest('td');
  			top_nav_td.html(top_nav_td.html() + ' - <a href="#" id="sabnzbd_settings" title="change settings for SABnzbd">' + sabnzbd_icon + '</a>');
        },
        insert_form: function(){
		  jQ(sabnzbd_form).insertBefore('form[name=r]');
        },
        indexer_form: jQ('form[name=r]'),
        styles: ' div.sabnzbd {float: right;}'
    },
	'nzbindex.nl': {
    	prepare: function(){
        },
    	setts_lnk: function(){

			jQ('#menu ul').append('<li><a class="nowrap" id="sabnzbd_settings" href="#"></a></li>');
        },
        insert_form: function(){
		  	jQ(sabnzbd_form).insertBefore('div#results');
        },
        indexer_form: jQ('#results form'),
        styles: '#sabnzbd_settings { background: url(' + icon32 + ') no-repeat center center; width: 32px; \
                height: 32px; margin-top: -20px; display: inline-block;} \
                div.sabnzbd {text-align: right; margin: 20px 0 -20px;}'
 }
};

[['binsearch.info', 'www.binsearch.info', 'binsearch.net', 'www.binsearch.net'],
 ['nzbindex.nl', 'www.nzbindex.nl']].forEach(function(dom){
 	dom.slice(1).forEach(function(i){indexer_specifics[i] = indexer_specifics[dom[0]]});
 });

var idx_spec = indexer_specifics[document.domain];

jQ(document).ready(function(){
    
    idx_spec['prepare']();

    idx_spec['setts_lnk']();

	GM_addStyle(styles + idx_spec['styles']);
    jQ('body').append(settings_form);
    
    //Functions.show_settings_dialog()
    
  	Settings = Functions.get_settings();

   	idx_spec['insert_form']();
  
  	Functions.fill_categories();
});
  
jQ(document).on('click', '#sabnzbd_settings, #storage-setter', Functions.show_settings_dialog);

jQ(document).on('click', '#sabnzbd_safety_sreen input[type=submit]', Functions.save_settings);

//jQ(document).on('click', '#sabnzbd_safety_sreen', function(e){if (e.target.id == 'sabnzbd_safety_sreen') {jQ(e.target).fadeOut()}});
jQ(document).on('click', '#sabnzbd_safety_sreen', function(e){
	if (e.target == e.currentTarget) {
		Functions.hide_settings_dialog();
    }
});

jQ(document).on('change', '#sabnzbd_safety_sreen input', function(e){
	jQ('#sabnzbd_safety_sreen').data('dirty', true);
});

jQ(document).on('click', '#sabnzbd_safety_sreen input[type=button]', Functions.synchronize);

jQ(document).on('click', '#post_to_sabnzbd', Functions.load_and_post);

