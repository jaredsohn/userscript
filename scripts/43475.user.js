// ==UserScript==
// @name kjclub write insert code
// @namespace org.positrium.gm
// @description insert '<embed> template' and 'trans_area:block template'
// @include http://*kjclub.com/*/club/targetBoardWrite.php?*
// @include http://*kjclub.com/*/club/targetBoardModify.php?*
// @include http://*kjclub.com/*/club/targetBoardReply.php?*
// @require http://kjclub-support-scripts.googlecode.com/svn/tags/GM_LIB/updateChecker.js
// @version 0.0.8
// ==/UserScript==

(function() {
	var base = new String(window.location).split('?')[0];
	var result = new Object();

	var xpath = new String();
	/* detect Container */
	if (base.search(/Reply/i) == -1) {
		// Write or Modify
		xpath = '/html/body/center/table/tbody/tr/td[3]/table/tbody/tr/td';
	} else {
		// Reply
		xpath = '/html/body/table[3]/tbody/tr/td[3]/table/tbody/tr/td';
	}
	result = x(xpath);
	var container = result.snapshotItem(0);

	/* detect insert to ( always textarea-elem ) */
	if (base.search(/Reply/i) == -1) {
		// Write or Modify
		var mode = locationCheck();
		if (mode == 'jp') {
			xpath = '/html/body/center/table/tbody/tr/td[3]/table[2]/tbody/tr[4]/td[2]/textarea';
		} else if (mode == 'kr') {
			xpath = '/html/body/center/table/tbody/tr/td[3]/table[2]/tbody/tr[5]/td[2]/textarea';
		}
	} else {
		// Reply
		xpath = '/html/body/table[3]/tbody/tr/td[3]/table[2]/tbody/tr[4]/td[2]/textarea';
	}
	result = x(xpath);

	var textarea = result.snapshotItem(0);
	textarea.setAttribute('id', 'textarea_0f944b24');

	/* embed */
	var space = document.createTextNode(' ');
	var embed = createButton(
			'document.getElementById(\'textarea_0f944b24\').value += \'<embed src="http://example.com/"  width="425" height="344"></embed>\';',
			'embed');
	container.appendChild(space);
	container.appendChild(embed);

	/* trans_open */
	var trans_open = createButton(
			'document.getElementById(\'textarea_0f944b24\').value += \'<style>#trans_area { display:block !important;} </style>\';',
			'trans_open');
	container.appendChild(space);
	container.appendChild(trans_open);

	/* trans_only */
	var trans_only_cmd = 'document.getElementById(\'textarea_0f944b24\').value += \'<style>#trans_area { display:block !important;} </style>\';'
	trans_only_cmd += 'document.getElementById(\'textarea_0f944b24\').value += \'<style>td.f13-2b2b2b-read { display:none; }</style>\';';
	var trans_only = createButton(trans_only_cmd, 'trans_only');
	container.appendChild(space);
	container.appendChild(trans_only);

	/* hide_content */
	var hide_content = createButton(
			'document.getElementById(\'textarea_0f944b24\').value += \'<style>td.f13-2b2b2b-read { display:none; }</style>\';',
			'hide_content');
	container.appendChild(space);
	container.appendChild(hide_content);

	/* markdown support for thread */
	var md_thread_str = new String('');
	md_thread_str += '<!-- showdown parser -->\\n';
	md_thread_str += '<script src="/UploadFile/bbs_board_730_20/2009/03/18/200903180347.js"></script>\\n';
	md_thread_str += '<!-- JavaScript-XPath 0.1.11 for IE -->\\n';
	md_thread_str += '<script src="/UploadFile/bbs_board_730_20/2009/03/18/200903180643.js"></script>\\n';
	md_thread_str += '<!-- execute script -->\\n';
	md_thread_str += '<script src="/UploadFile/bbs_board_730_20/2009/03/18/200903181019.js"></script>\\n';
	md_thread_str += '<!-- coloring css -->\\n';
	md_thread_str += '<style>@import "/UploadFile/bbs_board_730_20/2009/03/18/200903181313.css";</style>\\n';

	var md_thread = createButton(
			'document.getElementById(\'textarea_0f944b24\').value += \''
					+ md_thread_str + '\';', 'markdown support');
	container.appendChild(space);
	container.appendChild(md_thread);

	/* strip_escape */
	if (base.search(/Modify/i) != -1) {
		// Modify only
		var strip_escape = createButton(
				'document.getElementById(\'textarea_0f944b24\').value = document.getElementById(\'textarea_0f944b24\').value.replace(/\\\\/g,"");',
				'strip \\');
		container.appendChild(space);
		container.appendChild(strip_escape);

		var strip_single_quote = createButton(
				'document.getElementById(\'textarea_0f944b24\').value = document.getElementById(\'textarea_0f944b24\').value.replace(/\'/g,"");',
				'strip \'');
		container.appendChild(space);
		container.appendChild(strip_single_quote);
		
		var replace_quote_entity = createButton(
						'document.getElementById(\'textarea_0f944b24\').value = document.getElementById(\'textarea_0f944b24\').value.replace(/\"/g,"&quot;");',
				'replace \" entity');
		container.appendChild(space);
		container.appendChild(replace_quote_entity);
		
	}

	// ========== add from snippet ================
	function createButton(cmd, value) {
		var button = new Object();
		button = document.createElement('button');
		button.setAttribute('onclick', cmd);

		var label = document.createTextNode(value);
		button.appendChild(label);

		return button;
	}

	// ========== add from snippet ================
	function x(path, d) {
		if (!d)
			d = unsafeWindow;// document; // document is self.
		return document.evaluate(path, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	// ========== add from snippet ================
	function locationCheck() {
		var base = 'http://www.kjclub.com/';
		var loc = new String(window.location);
		var lang = loc.substr(base.length, 2);
		if (lang != 'jp' && lang != 'kr') {
			alert('plz input valid kj url !');
		}
		return lang;
	}
	// ========== add from snippet ================
	new UpdateChecker({
				script_name : 'kjclub write insert code' // required
				,
				script_url : 'http://userscripts.org/scripts/source/43475.user.js' // required
				,
				current_version : '0.0.8' // required
				,
				more_info_url : 'http://userscripts.org/scripts/show/43475' // optional
			});
})();