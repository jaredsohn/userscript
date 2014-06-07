// ==UserScript==
// @name kjclub comment reply supporter
// @namespace org.positrium.gm
// @description --
// @include http://*kjclub.com/*/club/targetBoardRead.php?*
// @version 0.0.9
// ==/UserScript==

//  http://userscripts.org/scripts/show/45004
(function() {
	var log = new Logger(false);
	
	var text_area = '/html/body/table[3]/tbody/tr/td[3]/form[2]/table[2]/tbody/tr/td/table/tbody/tr[3]/td/textarea';
	var result = x(text_area, "text_area");
	if(result != null){
		result[0].setAttribute('id', 'comment_0f944b24');
	}
	
	var path = '/html/body/table[3]/tbody/tr/td[3]/form[2]/table/tbody/tr/td[@bgcolor="#f8f8f8"]/table';
	result = x(path, "where?");
	// GM_log("[comment body list]="+result.snapshotLength);

	var comment_bodies = new Array();
	var comment = new Object();

	//var length = result.snapshotLength;
	// var length = 1;
	for (var i in result) {
		var item = result[i]; // XXX DEBUG
		log.debug(item);
		comment = new CommentBody(item);
		comment.setup();
		comment.createLink();
		comment_bodies[comment.unique_key] = comment;
	}

	for (var i in comment_bodies) {
		if (comment_bodies[i].isChild()) {
			for (var j in comment_bodies) {
				if (comment_bodies[i].ref_parent_key == comment_bodies[j].unique_key) {
					comment_bodies[j].append(comment_bodies[i]);
				}
			}
		}
	}

	function CommentBody(DOMNode) {
		this.unique_key = '';// = new Object(); // username + postdate
		this.element = DOMNode; // preformatted dom element
		this.content = new Object();
		this.name_container = new Object();
		this.ref_parent_key = '';
		this.append_point = new Object();
		this.reply_key = '';

		const _name = 0;
		const _content = 1;

		this.setup = function() {
			var tbody = this.element.childNodes;
			for (var i in tbody) {
				if (tbody[i].nodeName == 'TBODY') {
					tbody = tbody[i]; // this timing , tbody is only one.
					break;
				}
			}

			this.append_point = tbody;

			var tr_s = new Array();
			var children = tbody.childNodes;
			for (var i in children) {
				if (children[i].nodeName == 'TR') {
					tr_s.push(children[i]);
				}
			}

			// GM_log(tr_s.length);

			var comment_name = tr_s[_name];
			this.unique_key = comment_name.textContent.replace(/\n/g, '')
					.replace(/ /g, '').replace(/:/g, '').replace(/-/g, '')
					.replace(/>/g, '') // XXX fix2
					.toUpperCase();

			var cnode = comment_name.childNodes;
			var node = '';
			for (var z in cnode) {
				if (cnode[z].nodeName == 'TD' && cnode[z].childNodes.length > 0) {
					node = cnode[z];
				}
			}

			cnode = node.childNodes;
			var name = new String();
			var date = new String();
			for (var z in cnode) {
				if (cnode[z].nodeName == 'B') {
					name = cnode[z].textContent.replace(/\n/g, '').replace(
							/ /g, '');
				} else if (cnode[z].nodeName == 'SPAN') {
					date = cnode[z].textContent;
				}
			}

			this.reply_key = name + ' ' + date;
			var children = comment_name.childNodes;
			for (var i in children) {
				if (children[i].nodeName == 'TD'
						&& children[i].childNodes.length > 0) {
					this.name_container = children[i];
				}
			}

			var comment_content = tr_s[_content];
			this.content = comment_content.textContent.replace(/\n/g, '')
					.replace(/^[ ]+/g, '').replace(/[ ]+$/g, '');

			var check = this.content
					.match(/.+ [0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}/i);
			if (check != null) {
				this.ref_parent_key = new String(check).replace(/ /g, '')
						.replace(/:/g, '').replace(/-/g, '').toUpperCase();
			}
		}

		this.getKey = function() {
			return this.unique_key;
		}

		this.createLink = function() {
			var str = this.reply_key;
			var insert_a = cE('A', {
				// onclick : 'document.getElementById(\'comment_0f944b24\').value=\''
						// + str + ' > \'',
				style : 'cursor:pointer !important;'
			});
			
			insert_a.addEventListener('click', function(event){
				document.getElementById('comment_0f944b24').value=str+" >";
			}, false);
			
			var insert_a_text = document.createTextNode(" > ");
			insert_a.appendChild(insert_a_text);
			this.name_container.appendChild(insert_a);
		}

		this.isChild = function() {
			var ret = false;
			if (this.ref_parent_key.length > 0) {
				ret = true;
			}
			return ret;
		}

		this.toString = function() {
			return "ref_parent_key=" + this.ref_parent_key;
		}

		this.append = function(object2) {
			var appendie = object2.element;

			var tr = document.createElement('TR');
			this.append_point.appendChild(tr);

			var td = cE('TD', {
						style : "padding-left:2em;"
					});
			tr.appendChild(td);

			var parent = appendie.parentNode;

			try {
				td.appendChild(appendie);
				parent.removeChild(appendie);
			} catch (e) {
				var log2 = new Logger();
				switch (e.code) {
					case 3 :
						log.fatal("self reference error occured: " + "[UNIQUE]"
								+ object2.unique_key + " == [REF_KEY]"
								+ object2.ref_parent_key);
						break;

					case 8 :
						log2.info("node was not found ( perhaps , remove node about already_removed_node ): "
										+ "[UNIQUE]" + object2.unique_key);
						break;

					default :
						log2.info(e);
						break;
				}
			}

		}
	}

	/* ======== Logger */
	/** @version 0.0.1 */
	function Logger(isDebug){
		this.isDebug = isDebug?isDebug:false;
		this.debug = function(text){
			if(this.isDebug) console.log(text);
		}
		this.warn = function(text) {
			if (this.isDebug)console.warn(text);
		}
		this.error = function(text) {
			if (this.isDebug)console.error(text);
		}
		this.fatal = function(text) {
			if (this.isDebug)console.fatal(text);
		}
		this.ast = function(expr, msg) {
			console.group('assert ' + parseInt(Math.random() * 10000));
			console.log(msg);
			console.assert(expr);
			console.groupEnd();
		}
		this.info = function(text) {
			if (this.isDebug) console.info(text);
		}
		this.group = function(text) {
			if (this.isDebug)console.group(text);
		}
		this.groupEnd = function(text) {console.groupEnd();}
		this.dir = function(text){
			if(this.isDebug) console.dir(text);
		}
		this.dirxml = function(text){
			if(this.isDebug) console.dirxml(text);
		}
		this.dummy = function() {}
	}	

	/* ======= common Lib */
	/** @version 0.0.2
	 * get nodes array from xpath.
	 * 
	 * @argument _xpath String
	 * @return nodesArray Array
	 */
	function x(_xpath, msg) {
		var nodes = document.evaluate(_xpath, document, null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodesArray = [];
		for (var i = 0; i < nodes.snapshotLength; i++) {
			nodesArray.push(nodes.snapshotItem(i));
		}
		if (nodesArray.length < 1) {
			log.warn(msg + ": node array is NULL."+nodesArray.length);
			return null;
		}else{
			return nodesArray;
		}
	}

	// ========== add from snippet ================
	/** @version 0.0.2 */
	function cE(name, array) {
		var d = document.createElement(name);
		var len = 0;
		for(var i in array){
			len++;
		}
		if(len>0){
			for (var i in array) {
				d.setAttribute(i, array[i]);
			}
		}
		return d;
	}

})();