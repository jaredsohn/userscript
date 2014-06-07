// ==UserScript==
// @name           google analytics reset
// @namespace      http://www.google.com/analytics
// @include        https://www.google.com/analytics/settings*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

(function() {
	var settings={
		sort: '-VISITS,NAME',
		/* order by
		 * VISITS ,	order by visits asc
		 *-VISITS ,	order by visits desc
		 * NAME ,	order by name asc
		 * or other columns
		 */
		dates: 'DAY',
		//WEEK,MONTH,YEAR
		pagesize: 100
		//rows
		
	}
	if(window.location.pathname.match(/(settings\/home)|(settings\/$)/)){
		hash=window.location.hash
		args=settings
		if(arr=hash.match(/#scid=([^&]+)/))
			args.scid=arr[1]
		if(arr=hash.match(/sort=([^&]+)/))
			args.sort=arr[1]
		if(arr=hash.match(/pagesize=([^&]+)/))
			args.pagesize=arr[1]
		if(arr = hash.match(/dates=([^&]+)/)) {
			args.dates = arr[1]
		}else {
			var d = new Date();
			d.setDate(d.getDate() - 1)
			to = date_string(d)
			from = null
			switch (args.dates) {
				case 'DAY':
					from = to
					break
				case 'WEEK':
					d.setDate(d.getDate() - 7)
					break
				case 'MONTH':
					d.setMonth(d.getMonth() - 1)
					break
				case 'YEAR':
					d.setFullYear(d.getFullYear() - 1)
					break
				default:
					args.dates = null
			}
			if (args.dates != null) {
				if (from == null) {
					d.setDate(d.getDate() + 1)
					from = date_string(d)
				}
				args.dates = from + '-' + to
			}
		}
		arr=[]
		for(key in args){
			val=eval('args.'+key)
			arr[arr.length]=key + '=' + val
		}
		window.location.hash = '#' + arr.join('&')
	}
	function date_string(date){
		year=date.getFullYear().toString()
		month=(date.getMonth() + 1).toString()
		if(month.length == 1)
			month = '0' + month
		day=date.getDate().toString()
		if(day.length == 1)
			day = '0' + day
		return  year + month + day
	}
})()