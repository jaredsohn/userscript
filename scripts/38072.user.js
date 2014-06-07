// ==UserScript==
// @author         yager
// @name           Hatebu Entry Compact
// @namespace      http://creazy.net/
// @include        http://b.hatena.ne.jp/entry/*
// ==/UserScript==

(function() {

    var d = document;
    var w = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
    var l = location;
    var $ = function(id) { return d.getElementById(id); };

    /**
     * add ID
     */
    $('entryinfo').getElementsByTagName('table')[0].setAttribute('id','entryinfo_table');
    d.getElementsByTagName('blockquote')[0].setAttribute('id','entry_blockquote');

    // smaller Headline font
    d.getElementsByTagName('h2')[0].style.fontSize = '26px';

    /**
     * hide objects
     */
    // hide Header
    for ( var i=0; i<$('wrapper').childNodes.length; i++ ) {
        node = $('wrapper').childNodes[i];
        if ( node.nodeName.toLowerCase() != 'div' ) continue;

        if ( node.getAttribute('id') == 'header' ) {
            node.style.display = 'none';
        }
        else if ( node.getAttribute('id') == 'category' ) {
            node.style.display = 'none';
        }
        else if ( node.getAttribute('class') == 'breadcrumbs' ) {
            node.setAttribute('id','wrapper_breadcrumbs');
            node.style.display = 'none';
        }
        else if ( node.getAttribute('class') == 'ad-line' ) {
            node.setAttribute('id','wrapper_ad-line');
            node.style.display = 'none';
        }
    }

    // hide ad
    if ( $('ad') ) {
        $('ad').style.display = 'none';
    }

    // hide blockquote
    makeShowHideLink('entry_blockquote','引用');
    $('entry_blockquote').style.display = 'none';
    $('entry_blockquote_hide').style.display = 'none';

    // hide entryinfo
    makeShowHideLink('entryinfo_table','エントリー情報');
    $('entryinfo_table').style.display = 'none';
    $('entryinfo_table_hide').style.display = 'none';

    // hide bookmarked_user
    makeShowHideLink('bookmarked_user','コメント一覧');
    $('bookmarked_user_show').style.display = 'none';

    var entryinfo_table = $('entryinfo_table').getElementsByTagName('tbody')[0]; // tbody

    // get entry_url
    var entry_url = '';
    var entryinfo_table_a = entryinfo_table.getElementsByTagName('a');
    for ( var i=0; i<entryinfo_table_a.length; i++ ) {
        if ( entryinfo_table_a[i].getAttribute('class') == 'url' ) {
            entry_url = entryinfo_table_a[i].href;
            break;
        }
    }

    // Request Hatena Bookmark Entry JSON API
    requestChartAPI();

    //------------------------------------------------------------
    // Functions
    //------------------------------------------------------------

    /**
     * 表示／非表示のリンクを作る
     */
    function makeShowHideLink(target_id, target_name) {
        var show = d.createElement('a');
        show.setAttribute('id',target_id+'_show');
        show.href
            = 'javascript:'
            + 'document.getElementById(\''+target_id+'\').style.display=\'block\';'
            + 'document.getElementById(\''+target_id+'_hide\').style.display=\'block\';'
            + 'document.getElementById(\''+target_id+'_show\').style.display=\'none\';'
            + 'void(0);';
        show.innerHTML        = '▼「'+target_name+'」表示';
        show.style.marginLeft = '10px';
        $(target_id).parentNode.insertBefore(show,$(target_id));
        
        var hide = d.createElement('a');
        hide.setAttribute('id',target_id+'_hide');
        hide.href
            = 'javascript:'
            + 'document.getElementById(\''+target_id+'\').style.display=\'none\';'
            + 'document.getElementById(\''+target_id+'_show\').style.display=\'block\';'
            + 'document.getElementById(\''+target_id+'_hide\').style.display=\'none\';'
            + 'void(0);';
        hide.innerHTML        = '▲「'+target_name+'」非表示';
        hide.style.marginLeft = '10px';
        $(target_id).parentNode.insertBefore(hide,$(target_id));
    }

    /**
     * create XmlHttpRequest
     */
    function createXHR() {
        if ( w.ActiveXObject ) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e2) {
                    return null;                                                                                                                                            }
            }
        } else if ( w.XMLHttpRequest ) {
            return new XMLHttpRequest();
        } else {
            return null;
        }
    }

    function requestChartAPI() {
        var XHR = createXHR();
        XHR.open( 'GET', 'http://b.hatena.ne.jp/entry/json/?url='+encodeURIComponent(entry_url), true );
        XHR.onreadystatechange = function() {
            if (XHR.readyState==4) {
                var chartInfo = eval('(' + XHR.responseText + ')');
                renderChart(chartInfo);
            }
        }
        XHR.send('');
    }

    function renderChart(chartInfo) {
		var today = new Date();
		var thisyy = today.getYear();  if (thisyy < 2000) { thisyy += 1900; }
		var thismm = today.getMonth();
		var thisdd = today.getDate();
		var thishh = today.getHours();

		var daily      = [];
		var dailyLabel = [];
		for ( var i=0; i<24; i++ ) {
			dt = new Date(today.getTime()-(i*60*60*1000));
			yy = dt.getYear();      if (yy < 2000) { yy += 1900; }
			mm = dt.getMonth() + 1; if (mm < 10) { mm = "0" + mm; }
			dd = dt.getDate();      if (dd < 10) { dd = "0" + dd; }
			hh = dt.getHours();     if (hh < 10) { hh = "0" + hh; }
			daily[i]      = 0;
			dailyLabel[i] = yy+""+mm+""+dd+""+hh;
		}

		var monthly      = [];
		var monthlyLabel = [];
		for ( var i=0; i<31; i++ ) {
			dt = new Date(today.getTime()-(i*24*60*60*1000));
			yy = dt.getYear();      if (yy < 2000) { yy += 1900; }
			mm = dt.getMonth() + 1; if (mm < 10) { mm = "0" + mm; }
			dd = dt.getDate();      if (dd < 10) { dd = "0" + dd; }
			hh = dt.getHours();     if (hh < 10) { hh = "0" + hh; }
			monthly[i]      = 0;
			monthlyLabel[i] = yy+""+mm+""+dd;
		}

		var yearly      = [];
		var yearlyLabel = [];
		for ( var i=0; i<12; i++ ) {
			dt = new Date(thisyy,thismm-i,thisdd);
			yy = dt.getYear();
			mm = dt.getMonth() + 1;
			if (yy < 2000) { yy = yy + 1900; }
			if (mm < 10)   { mm = "0" + mm; }
			yearly[i]      = 0;
			yearlyLabel[i] = yy+""+mm;
		}

		for ( var i=0; i<chartInfo.bookmarks.length; i++ ) {
            bookmark = chartInfo.bookmarks[i];
            userobj = d.getElementById('bookmark-user-'+bookmark.user);

            userobj_span = userobj.getElementsByTagName('span');
            for ( var j=0; j<userobj_span.length; j++ ) {
                if ( userobj_span[j].getAttribute('class') == 'timestamp' ) {
                    userobj.removeChild(userobj_span[j]);
                    break;
                }
            }

            timeobj = d.createElement('span');
            timeobj.innerHTML = bookmark.timestamp;
            timeobj.setAttribute('class','timestamp');
            userobj.insertBefore(timeobj,userobj.firstChild);

			// daily
			dt = bookmark.timestamp.replace(/(\d{4})\/(\d{2})\/(\d{2})\s(\d{2}).*/,"$1$2$3$4");
			if ( dailyLabel[dailyLabel.length-1] <= dt ) {
				//alert(dt);
				for ( var j=0; j<dailyLabel.length; j++ ) {
					if ( dailyLabel[j] == dt ) {
						daily[j]++;
						break;
					}
				}
			}

			// monthly
			dt = bookmark.timestamp.replace(/(\d{4})\/(\d{2})\/(\d{2}).*/,"$1$2$3");
			if ( monthlyLabel[monthlyLabel.length-1] <= dt ) {
				//alert(dt);
				for ( var j=0; j<monthlyLabel.length; j++ ) {
					if ( monthlyLabel[j] == dt ) {
						monthly[j]++;
						break;
					}
				}
			}

			// yearly
			dt = bookmark.timestamp.replace(/^(\d{4})\/(\d{2}).*/,"$1$2");
			if ( yearlyLabel[yearlyLabel.length-1] <= dt ) {
				//alert(dt);
				for ( var j=0; j<yearlyLabel.length; j++ ) {
					if ( yearlyLabel[j] == dt ) {
						yearly[j]++;
						break;
					}
				}
			}

		}

		var daily_max  = Math.max.apply(null, daily);
		var daily_data = [];
		for ( var i=0; i<daily.length; i++ ) {
			daily_data[i] = (daily[i] / daily_max * 100);
			dailyLabel[i] = (dailyLabel[i]).substring(8,10);
		}
		daily_url = _makeChartUrl('last day',daily_data,dailyLabel,daily_max);

		var monthly_max  = Math.max.apply(null, monthly);
		var monthly_data = [];
		for ( var i=0; i<monthly.length; i++ ) {
			monthly_data[i] = (monthly[i] / monthly_max * 100);
			monthlyLabel[i] = (monthlyLabel[i]).substring(6,8);
		}
		monthly_url = _makeChartUrl('last month',monthly_data,monthlyLabel,monthly_max);

		var yearly_max  = Math.max.apply(null, yearly);
		var yearly_data = [];
		for ( var i=0; i<yearly.length; i++ ) {
			yearly_data[i] = (yearly[i] / yearly_max * 100);
			yearlyLabel[i] = (yearlyLabel[i]).substring(4,6);
		}
		yearly_url = _makeChartUrl('last year',yearly_data,yearlyLabel,yearly_max);

		var chartTR = d.createElement('tr');
		var chartTH = d.createElement('th');
		var chartTD = d.createElement('td');
		chartTD.innerHTML
			= '<img src="'+daily_url+'" /><br />'
			+ '<img src="'+monthly_url+'" /><br />'
			+ '<img src="'+yearly_url+'" />';

        chartTR.appendChild(chartTH);
        chartTR.appendChild(chartTD);
        entryinfo_table.appendChild(chartTR);

		// release
		daily = null;
		dailyLabel = null;
		daily_data = null;
		monthly = null;
		monthlyLabel = null;
		monthly_data = null;
		yearly = null;
		yearlyLabel = null;
		yearly_data = null;
	}

	function _makeChartUrl(ctitle,cdata,clabel,cmax) {
		url
			='http://chart.apis.google.com/chart'
			+'?chtt='+ctitle
			+'&chts=333333,12'
			+'&chs=400x100'
			+'&cht=lc'
			+'&chco=0077cc'
			+'&chm=B,e6f2fa,0,0,0'
			+'&chxs=0,333333,9,0|1,333333,9,0'
			+'&chxt=x,y'
			+'&chd=t:'+cdata.reverse().join(',')
			+'&chxl=0:|'+clabel.reverse().join('|')+'|1:|0|'+encodeURIComponent(cmax);
		return url;
	}

})();