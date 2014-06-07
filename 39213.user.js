// Written by zzyzx.xyzzy@gmail.com
//
// ==UserScript==
// @name           OKC View More Journals
// @namespace      http://zzyzx.xyzzy.googlepages.com/okcviewmorejournals
// @description    Lets you see more of your favorite people's comments and journal entries.
// @include        http://www.okcupid.com/relevant*
// ==/UserScript==

//figure out what the query string parameters were.
var params = { limit:'50', start:'0' }; //defaults
window.location.search.replace(
    /([^?=&]+)(=([^&]*))?/g,
    function( $0, $1, $2, $3 ) {
        params[ $1 ] = decodeURI($3);
    }	
);

//find the comments
//because OKC uses space-delimited class attributes to assign 
//multiple CSS classes, testing the class on XPath requires this string crap.
var comments = document.evaluate(
    "//div[@class='user_info']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
);


//insert controls

var commentRoot= document.evaluate(
    "//ul[@class='relevant_links']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
);

commentRoot.snapshotItem(0).appendChild(
	pager(parseInt(params.start), parseInt(params.limit), comments.snapshotLength));

//what to insert

function pager(start, limit, n) {
    //build the pager elements to be inserted. 'start'
    var dropdown =
        e('select', {
            name: 'limit',
	    id: 'limitOption',
         }, [
            e('option', ((limit ==  50)   ? {value:'50',    selected:'selected'} : {value:'50'}   ), [t('50')]),
            e('option', ((limit ==  100)  ? {value:'100',   selected:'selected'} : {value:'100'}  ), [t('100')]),
            e('option', ((limit ==  200)  ? {value:'200',   selected:'selected'} : {value:'200'}  ), [t('200')]),
            e('option', ((limit ==  500)  ? {value:'500',   selected:'selected'} : {value:'500'}  ), [t('500')]),
            e('option', ((limit ==  1000) ? {value:'1000',  selected:'selected'} : {value:'1000'} ), [t('1000')]),
         ]);

    dropdown.addEventListener('change', function(evt) {
	window.location.href = modSearch({limit: this.value});
    }, true );

    //you don't seem to be able to page back in time through friends' posts, but you can page back in searched-for journals.
    if (params.comments || params.posts || params.mycomm) {
	    var pager = e('div', {align:'center', class:'text'}, [
		e('form', {action:''}, [
		    t('Found ' + n + ' items. Limit: '),
        	    dropdown,
	        ]),
	    ]);
    } else {
        var pager = e('div', {align:'center', class:'text'}, [
            e('form', {action:''}, [
                t('Items ' + (start+1) + '-' + (start + limit) + 
                  ' (showing ' + n + ' items.) Page size: '),
                dropdown,
                e('br', {}, []),
                ((start > 0)
                    ? e('a', 
                        { href:(modSearch( {start: (Math.max(start - limit, 0)) } ) ) }, 
                        [t('Previous page')] )
                    : t('')),
                ((start > 0) ? t(' | ') : t(' ')),
                e('a', {href:modSearch({start:(start + limit)})}, [t('Next page')]),
            ]),
        ]);
    }

    return pager;
}


// ------ helper functions ------

function modSearch(attribs) {
	//modify the window URL search to have the new attributes.
	var combined = {};

	for (var i in params) {
		combined[i] = params[i];
	}
	for (var i in attribs) {
		combined[i] = attribs[i];
	}
	var l = [];

	for (var i in combined) {
		l.push(i + '=' + encodeURIComponent(combined[i]));
	}

	var searchstring = l.join('&');
	var w = window.location;

	return w.protocol + '//' + w.host + w.pathname + '?' + searchstring;
}

function e(name, attribs, children) {
	//make an element with some attributes and children.
	var r = document.createElement(name);
	for (var i in attribs) {
		r.setAttribute(i, attribs[i]);
	}
	for (var i = 0; i < children.length; i++) {
		try {
		r.appendChild(children[i]);
		} catch (e) {
			alert(name + '-' + r + '-' + children[i] + '-[' + i + ']');
			break;
			//throw e;
		}
	} 
	return r;
}

function t(text) {
	//make a text node.
	return document.createTextNode(text);
}
