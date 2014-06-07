// ==UserScript==
// @name           LTM Preview
// @namespace      caetla://ltm.mp.forum.preview
// @description    This is second release alpha version. Not only preview now. Added some enhancements
// @include        http://leetm.mingpao.com/cfm/*
// @include        http://*.leetm.mingpao.com/cfm/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

// *** be expected this script will be failed if website admin alter any html tags


// security read : http://www.oreillynet.com/lpt/a/6257

// ==== icon resources ====
	// links
const icoExt = "data:image/gif;base64,R0lGODdhEAAQAIEAAMLAwP%2F%2F%2FzYvLf%2F%2F%2FyH5BAEAAAMALAAAAAAQABAAQQIsnI%2BJEgIBhBTqyICbmrz6P3BORiUMxJTgyoKiWl0YbJxjpJloRNF1NmsJVwUAOw%3D%3D" ;
const icoMsg = "data:image/gif;base64,R0lGODlhEAAQAPcAAE5OTmtra2%2BXxm%2BYx5EtLf8RkouLi4KjyJOty56qzYm68Iu78I298JC%2B8ZG%2F8a2z0LW30Ly80JLA8ZPA8ZbB8pjC8pvF8pzF857H86PJ86XL9KjM86rN9LDR9bLR9bfV9bnW9rvX9rzY98PDw8rE0tHH08Pc%2BMfe%2BMjf%2BM3i%2BM%2Fi%2BdPl%2BtTm%2BtXm%2Btrq%2Bt3r%2B97r%2B9%2Ft%2B%2B3t7eXv%2FOfx%2FOjy%2Fe31%2FO71%2FfD3%2FfL4%2FfP4%2FvX6%2Fff6%2Fvn7%2Fvr8%2Fvz%2B%2F%2F3%2B%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAUALAAAAAAQABAAAAiSAAsIHEiwoMGDCGUoXKjQoAwDECNGDCBj4EMZQXrkqAFjxYkQCABULGAAow8dBEq0IADBg4YDAAQaCPJjhw0CJFIQeLDhgoOYJIHwuDHDhQoTHzhgmKAAaEkcNF4QiACCQAIKCwQAvRiDBQoRHTJUYDAAwAiLBgCoBWDAQgO1ZxGSlGB2pNy0ceUKNKu3r9%2BCAQEAOw%3D%3D" ;
const icoYTb = "data:image/gif;base64,R0lGODdhEAAQAIcAAP%2F%2F%2F9DQ0JSUlNbW1o%2BPj%2BDg4NHR0VJSUpKSklhYWN%2Ff3%2Brq6vPz8%2Fj4%2BPDw8PT09GpqakJCQnh4eK2trV1dXYGBgbe3t4WFhZmZmaampvz8%2FJubmiIiIqOjo3JyclVVVYuLi15eXomJifr6%2BsLCwkBAQMjIyGxsbI6Ojl9fX4aGhsrKyklJSc%2FPz21tbVtbW4eHh1paWnFxcc7MzFZTU9fT0o%2BLiktGRlxWVqSfn0VBQUlGRpCOjvv6%2Bv%2F9%2FfzZ2euYmcZnaO6JiuR7fLVISc1hYuaChLplZsB6e9ifoPrh4f79%2Ff3u7vZ8ffdpbPhucfZPUvY0NvY3OfZUVvVAQ%2FVKTPVrbPSNjvWlpv3y8vze3%2FRgYveWl%2Fm9vfZpa%2FY%2FQfVJS%2FWZm%2FVdX%2FY7PfZLTvViZPR6fPzl5fvW1vVKS%2FVlZ%2Faen%2FV9f%2FSFh%2FWQkvWxsvewsfV9fvefofacnfVjZvzb2%2FzT0%2FVHSfVkZfadnvWLjvSZmvWkpvSoqfWenvSiove5uvewsPRqbPzY2PzW1vaMjvWen%2FWmp%2FSnqfWcnfSio%2FetrfaMjPRjZPza2%2Fzf3%2FVRU%2FVcXfaLjPWbnfWhovevsPSBg%2FejpPednvRpavzj4%2F3v7%2FZ2d%2FZBQ%2FZGSPZCRPZNT%2FZHSfZISvZOUPZAQvZLTfZOT%2FZ%2Bf%2FvX1%2FmgofmRkvmJivmEhfmDhPmKi%2FmSk%2Fmio%2Fvb2%2F%2F%2B%2FgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAAAALAAAAAAQABAARwjmAAEACCBgAAGBCBMKZNLEyRMoUaRMoVLFyhUsWRKSKGHiBIoUKkJIEJGQUBU8eQoZOoQokaJFjBo5QugAQgQJEyhUsHABQwaFAGbQqGHjBo4cOnbwSIgmjZo1bNq4eQMnjpw5dOoI3MSpk6dPoEKJGkWqlKlTGQUaOIAgAdC3Gzh08ODhAwiRJBWuYNHChYoXMGLIyIvwB5AgQoYQKWLkCJIkShBq2cKli5cvYMKIGUOmjJkzAu3cQalnD58%2Bfv4ACiRokMBHkCJJigNnEqVKli5hyqQJIapUqlaxatWKlatXsGIJDAgAOw%3D%3D" ;
const icoWait = "data:image/gif;base64,R0lGODlhEAAQALMNAD8%2FP7%2B%2FvyoqKlVVVX9%2FfxUVFUBAQGBgYMDAwC8vL5CQkP%2F%2F%2FwAAAP%2F%2F%2FwAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJAAANACwAAAAAEAAQAAAEPbDJSau9OOvNew0AEHDA8wCkiW6g6AXHMU4LgizUYRgEZdsUggFAQCgUP%2BAERggcFYHaDaMgEBQchBNhiQAAIfkECQAADQAsAAAAABAAEAAABDuwyUmrvTYAEDAFzwN4EyiSksaRyHF06GEYBNoQ82EHBwHbCIUCYRMKiwSCYoFALDCIwLDZBFJtTKclAgAh%2BQQJAAANACwAAAAAEAAQAAAEPrDJGQAIM2vwHtAUcVTdBzaHYRCKip2EepxacBAvjSgKQmc83m%2BiILCGEkSgh5wsEIhFEwqdUpvPaHPLnUQAACH5BAkAAA0ALAAAAAAQABAAAAQ%2BsMkZyAkz62MM0ROiKAjRXQCATeOIHEQAPA%2BQKQShZHOdIQFSRqaSLBCIBQiERC41TcQzc0xOr9isdsvtPiMAIfkECQAADQAsAAAAABAAEAAABD2wyYmUQjNra%2FVcCLIoBKEExBFkYRtcBGAQbJsdhnFkoMimGI8wAACshBnA4wFAJpdNp4RolFqv2Kx2q4kAACH5BAkAAA0ALAAAAAAQABAAAAQ9sMm5EFoza2u1b5ylKMjXVFdAjGamrEo7IWMpz8QR3A0BGATewWA48BA5mykAAOxugMcDwItOeUwnb9uKAAAh%2BQQJAAANACwAAAAAEAAQAAAEO7DJSau92C6EVp4c90khMjZbd5KKYo4B0Z4KIZ9I4H7IQQSng8FwwAQAgJgBQMAAHo%2BkD3h5Rk%2FHpCUCACH5BAkAAA0ALAAAAAAQABAAAAQ8sMlJq7046827nwuCLJwoliYXjlIAAAGFKApCAc8DULQSTzgd4kCYEQgKigt2MBgOC5rtQnAeOAHilBIBADs%3D" ;
const icoWiki = "data:image/x-icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAEAgQAhIOEAMjHyABIR0gA6ejpAGlqaQCpqKkAKCgoAPz9%2FAAZGBkAmJiYANjZ2ABXWFcAent6ALm6uQA8OjwAiIiIiIiIiIiIiI4oiL6IiIiIgzuIV4iIiIhndo53KIiIiB%2FWvXoYiIiIfEZfWBSIiIEGi%2FfoqoiIgzuL84i9iIjpGIoMiEHoiMkos3FojmiLlUipYliEWIF%2BiDe0GoRa7D6GPbjcu1yIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" ;
//const icoEdit = "data:image/gif;base64,R0lGODlhEQAQAMQZAPr6%2Bm5ubqenp%2BTk5Ofn5%2Bjo6G1tbaOjo4KCgs%2FPz729vb6%2BvoyMjLW1tY2NjZCQkM3Nzf39%2FZ%2Bfn4uLi4%2BPj0dHR9ra2n5%2Bfv%2F%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABkALAAAAAARABAAAAVtYCZeZGmKqFgZE%2Ba%2BZJpVwcO%2B7oVdKB1MjEgLZrHwMpRKBdEACGEnZEUyIDiHLyMqSbU%2Bs8fMhVu9glE6sneoHbm4kMRBoMC0xS%2BuJFAQ2MM6eUoCfQt3gVkBFQIVFIc4WQ5Kh0WVlpWAJpomIQA7" ;
const icoEdit = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK5SURBVBgZBcFPaJZ1HADwz%2B95n3e6uTnREGdljRKtGCYiHTLxkIUmQeeCOnXzVnQIoi5BQV08TMo6GIiHiKI6ZEWgszzEmtpqSDP7s9ycm9NN977vnuf37fNJEWH%2FG6df6l676vki2YXVSCAhEpFVOU8uzMX36daNV88MH%2BoApIhw8O2zZz45vOuhokjrgoYAIALC7NKKEz8vmP67fee3XyfWjwwfakMJRSNt6yob68avaRQpkYhMHVlVheWV2r6tffYPjNi4eLyncWCodf7jI1Jr6sUSUkq9EdHoajQkIZALZOpEIWlPf27r4jndQy%2FoH9xp4c9tJk4de7eEIEGBlAgJREqKRP%2FyKXVcsH7r4%2BYnf9eVOvrWbtK7YUt%2FCRBB2SBJIiW5Doqkd3nEllWj%2Bgef1r56UldP8tfYhJt3UhTtuR0FRBAoU6FISYFGkaxePG1LfKv%2FgYNa%2F30oNW9o9vbpzvOOXj%2BwsvvwZ5cKCGSkRJGSIiWtK19af%2FuU%2Fgef1ZoaVjRXdG7db%2BbMed173zJVD2QoIFdEkBG4fflrPYs%2F2vjIMzrTxzS6QvvWfWZGRs3tGZY2bFdnoICcQ0QQTI%2Be1L3wk5W82dWLR2Qtt%2BfvNnNuwuLeo1LvgNXNpK4CFFBn6iAysxc%2F8vCel636Z8SlL84a%2B2be%2BHdjlh57R9WzWaDZKFSdCpSQq5AjvPlLx9DkrM74VwZ3POHm7JzJsUk%2F7PvU9Sv3yipwYlPTSjuDEqqqVtcMrG0a%2F%2BOa9z8Ytnv7oOXNOyw9edyjffeIIIIL1yqRw0qrAiVU7ZyrnKNTS%2Bte%2F9flFCYlkJdIS5UcRJEUOSnLlKs6V1DCSqueWdPVuOu1oc6aiCgEGdDfXYIIuptJSnKzkRbrKk9BCSnFe0%2B9cvq5lNLOED0AgkAIIEAr5zxaFk7A%2F5IUWNTkV3l%2FAAAAAElFTkSuQmCC" ;
const quoteIm = "data:image/gif;base64,R0lGODlhFQAUAJEDAP%2F%2FAAAAAP%2F%2F%2FwAAACH5BAEAAAMALAAAAAAVABQAAAJLnI%2Bpyz0BowwtiAuuyJcuy21aZn3dZAmlAo7umqSQGgCyYIa6irNaROv0YiLMa4iQWZa3nMsISz6LPAZKiVRofras4wD5VsTksqMAADs%3D" ;

const lrArrow = "data:image/gif;base64,R0lGODdhEQAQAIcAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwMDcwKTI8L8AAAC%2FAL%2B%2FAAAAv78AvwC%2FvwA3PAAAMwAAZgAAmQAAzAAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FMwD%2FZgD%2FmQD%2FzDMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AM%2F8AZv8Amf8AzP8zAP8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP%2F78KCgpICAgP8AAAD%2FAP%2F%2FAAAA%2F%2F8A%2FwD%2F%2F%2F%2F%2F%2FyH5BAEAAP8ALAAAAAARABAARwgzAP8JHEiwYEEABgciTMiw4UKFDSMyfCiQIkGLFyVq3MixY0SM%2FzACGEmyJEmDIEF67BgQADs%3D" ;
const lrdArow = "data:image/gif;base64,R0lGODdhFQASAIcAAAAAAIAAAACAAICAAAAAgIAAgACAgMDAwMDcwKTI8L8AAAC%2FAL%2B%2FAAAAv78AvwC%2Fv8iss7qgp7OIjEKapy9%2BiBpfZwA3PAAAMwAAZgAAmQAAzAAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FMwD%2FZgD%2FmQD%2FzDMAADMAMzMAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMADPMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYzmWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2FM2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJlm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAMwAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AM%2F8AZv8Amf8AzP8zAP8zM%2F8zZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzAAAAAAAAAAAAAAAAAAAAAAAAP8zmf8zzP8z%2F%2F9mAP9mM%2F9mZgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP%2F78KCgpICAgP8AAAD%2FAP%2F%2FAAAA%2F%2F8A%2FwD%2F%2F%2F%2F%2F%2FyH5BAEAAP8ALAAAAAAVABIARwg8AP8JHEiwoEGCABIqXKjwoMOHECMWZEgxocSLBgEc1LgR4z%2BOGTt6HEmypMiTEy%2BCHLjyYUuWLk3KdBgQADs%3D" ;

const nl = "\n" ;
const br = "<br/>" ;
const hr = "<hr/>" ;
const qq = '"' ;
const qs = "'" ;

//const waiting = br + br + '<div style="width:100%;text-align:center;"><img src="' + icoWait + '" alt="" title=" Waiting Content "/></div>' + br + br + br ;

const forum = 'http://leetm.mingpao.com/cfm/' ;

const msgSelector = "tr:has(a[name]):has(td.style01):not(:has(table))" ;

const longSpc = "　　　　　　　　　　　　　　　　　　　　" ;

var idCnt = 0 ;
var uid = function() { return idCnt++ ; } ;

var forumPrefix = 'http://leetm.mingpao.com/cfm/' ;
var forumAttr = function(iD, shortN, longD, color ) {
	return {
		shortName : shortN,
		longDesc  : longD,
		bgcolor   : color,
		url       : forumPrefix + 'Forum2.cfm?CategoryID=' + iD
	} ;
}

var BM = function(h, tt) { // make a bookMArk Object
	if(typeof h == "string") 	// h is a url or url hash
		adr = AddrTemplate(h) ; 
	else										// h is a AddrTemplate object
		adr = h ;                         
	h = adr.q.CategoryID + '-' + adr.q.TopicID ;  
	return {
		hash  : h,
		title : tt
	} ;
} ;

var BMList = function(lnk, withCheck){
	this.max = withCheck ? 25 : 10 ;
	this.check = withCheck ? true : false ;
	this.lnk  = lnk ;
//	this.list  = new Array ;
	this.init  = function() {
		var bmlen = $S[this.lnk].length ;
		if(this.max < bmlen)  this.max = bmlen ;
		var bmStart = $('#' + this.lnk).find(".bmStart") ;
		bmStart.nextAll().remove() ; //.each(function() { $(this).remove() ; }) ;
//		alert(this.lnk  + ' - ' + $S.bookmark + ' - ' ) ;
		for (var i = bmlen - 1 ; i >= 0 ; i--)
			bmStart.after(this.tag(i)) ;
	} ;
	this.add = function(h, tt) {	
		$S[this.lnk].unshift(BM(h,tt)) ;
		for(var i = $S[this.lnk].length - 1 ; i > 0 ; i--)
			if($S[this.lnk][i].hash == $S[this.lnk][0].hash)
				this.del(i) ;		
		var bmStart = $("#" + this.lnk).find(".bmStart") ;
		bmStart.after(this.tag(0)) ;
		while($S[this.lnk].length > this.max)
			this.del(this.max) ;
	} ;
	this.del  = function(i) {
		if(typeof i == 'string') {
			var h = i ;
			for(i = 0 ; i < this.len() ; i++)
				if(this.hash(i) == h ) break ;
			if(i >= this.len()) return false ;
		}
		var bmStart = $("#" + this.lnk).find(".bmStart") ;
		bmStart.attr("rel", $S[this.lnk][i].hash) ;
		bmStart.nextAll().each(function() {
			if($(this).attr("rel") == bmStart.attr("rel"))
				$(this).remove() ;
		}) ;
		$S[this.lnk].splice(i,1) ;
	} ;
	this.len    = function()  { return $S[this.lnk].length ; } ;
	this.hash   = function(i) { return $S[this.lnk][i].hash ; } ;
	this.title  = function(i) { return $S[this.lnk][i].title ; } ;
	this.addr   = function(i) { return AddrTemplate($S[this.lnk][i].hash) ; } ;
	this.url    = function(i) { return AddrTemplate($S[this.lnk][i].hash).url() ; } ;
	this.tag    = function(i) {
		var s = document.createElement("li") ;
		if(this.check) $(s).append('<input type="checkbox"/>&nbsp;&nbsp;') ;
		var t = document.createElement("span") ;
		$(t).append(Forum.tag(this.addr(i).q.CategoryID) + ':' + this.title(i) + longSpc) ;
		$(t).click(function() {
			$sub(AddrTemplate($(this).parent("li").attr("rel")).url()) ;
			return false ;
		}) ;
		$(s).addClass("bookmark").attr("rel", this.hash(i)).append(t) ;
		return s ;
	} ;
	return this ;
} ;

//<li><span style="background-color:#0099ff">哲</span>：冇附使用說明書的知識</li>


var myBM = new BMList ;
var rcBM = new BMList ;

var Forum = {
	1:forumAttr(1, '思', '　思方、邏輯、數理　', '#3366cc') ,
	2:forumAttr(2, '哲', '　宗教、哲學、科學　', '#0099ff') ,
	3:forumAttr(3, '樂', '　文學、音樂、藝術　', '#49a7c7') ,
	4:forumAttr(4, '人', '　社會、人物、人生　', '#8c83e2') ,
	5:forumAttr(5, '閑', '　幽默、閑談、其他　', '#59cecb') ,
	6:forumAttr(6, '客', '　嘉賓區　',           '#cc9900') ,
  tag : function(n) {
//  	alert(recentBM.hash(0) + ' - ' + recentBM.title(0)) ;
		return '<span style="background-color:' + Forum[n].bgcolor + '">' + Forum[n].shortName + '</span>' ;
	} 
};

var prt = function(s) {
	$("#debugBox").html(s + hr + $("#debugBox").html()) ;
}

// ============

var setVal = function(v, defaultVal) {
	return (typeof v != typeof defaultVal || isNaN(v) ? defaultVal : v) ;
} ;

var saveWinState = function(forceSave) {
	$S.saveCfg("win") ;
//	WIN.cnt = (1 + WIN.cnt) % 300 ; 
//	if(forceSave == 1 || eval(CFG.autoSaveWin) == 1)
//		GM_setValue("WIN", WIN.toSource()) ;	
} ;

var tmpNick = '!!!輸入你的名字!!!' ;

var $S = {	
	win			: {sub:0, jmp:1, up:1, vh:2, med:0, alt:1, trans:1 },
	sys			: {bar:1, url:1, tag:1, img:0, wiki:1, nick:''}, // nick ->default name used in reply
	bookmark: [],
	recent	: [],
	ttCache : {},
	saveCfg	: function(part) {
		var savePart = function(p) { GM_setValue(p, $S[p].toSource()) ; } ;
		if(!part) {
			savePart('win') ;	savePart('sys') ;	savePart('bookmark') ; savePart('recent') ;
		} else 
			savePart(part) ;
	},			
	loadCfg : function(part) {
		var loadPart = function(p) {
			var tmp = eval(GM_getValue(p,"null")) ;
			if(tmp)
				switch(p.toString()) {					
					case 'recent':
					case 'bookmark':
						prt(p + ' = array') ;
						for(var i = 0 ; i < tmp.length ; i++)
							$S[p][i] = tmp[i] ;
						break ;
					default:
						prt(p + ' = object') ;
						for(var k in tmp) 
							if($S[p][k] != undefined) $S[p][k] = tmp[k] ;
				}
		} ;
		if(!part) {
			loadPart('win') ;	loadPart('sys') ;	loadPart('bookmark') ; loadPart('recent') ;
		} else
			loadPart(part) ;
	},				
	winState : function(part, state) {
		if(!part) { // set all
			for(var k in this.win)
				doWinHandle(k, this.win[k]) ;
		} else 
		if (!state) { // set one
			this.win[part] = state ;
			doWinHandle(part, this.win[part]) // get all or one
		} else {
			state = this.win[part] ;						
			return state ;
		}
	}, 
	doWinHandle : function(part, st) {
		
	} 
		
} ;

// ===== pop window management
var doTxtBox = function(s) {
	var t = noYes(s != null ? s : toggleAttr(txtBox,"show")) ;		
	toggleAttr(txtBox,"show", t) ;
	toggleAttr("wbar","show", t) ;
	toggleAttr("barMenu", "right", t) ;
	doWHeight($S.win.vh) ;
	return t ;
} ;

var doDock = function(s) {
		var t = noYes(s != null ? s : toggleAttr(txtPop,"up")) ;		
		toggleAttr(txtPop, "up", t) ;
		toggleAttr("barMenu", "up", t) ;
		var saveScroll = subMsg.scrollTop ;
		if(t == "yes") {
			$("#upper").append($("#cmdBar"))
			$("#lower").append($("#txtBox")) ;
			$(subPage).after(subMsg) ;
		} else {
			$("#lower").append($("#cmdBar"))
			$("#upper").append($("#txtBox")) ;
			$(subMsg).after(subPage) ;
		}
		subMsg.scrollTop = saveScroll ;
		return t ;
}

var doWHeight = function(vh) {
	if(typeof vh == 'string') vh = parseInt(vh) ;
	if(!vh || vh < 1 || vh > 4) vh = 2 ;
	$S.win.vh = vh ;
	var v = window.innerHeight - 60 ;
	if(v < 16) v = 16 ;
	v = Math.ceil(v * vh / 4) + "px" ;
	$(subMsg).css("max-height", v) ;
} ;

// ============== ajax function

var $q = function(href, callback) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: href,
		overrideMimeType : "text/plain; charset=big5",
		headers: {},
		onload: callback,
		onerror: function(response)  {
			$subErr('Server response "' + response.statusText + '"', href) ;
			toggleAttr($("#dropLink"), "busy", "no") ;			
		}
	}) ;
} ;

var $subErr = function(msg, uri) {
		$(subMsg).html('Error :' + msg + hr + '直接去:<a href="' + uri + '">' + uri + '</a>' ) ;
		toggleAttr($("#dropLink"), "busy", "no") ;			
} ;

var reloadBtn = function(adr, tt) {
	if(adr) {
		$("#cReload").attr("rel", adr.u.raw) ;
		$("#cReload").attr("enabled", "yes").html("&#x2713;") ; 
		if(tt) $("#cReload").attr("title", '重載:' + Forum[adr.q.CategoryID].shortName + '-' + tt)
	} else {
		$("#cReload").attr("rel", "") ;
		$("#cReload").attr("enabled", "no").html("&#x2718;") ; 		
	}
} ;

var $sub = function(uri, callback) { // forum3 only ;
	var p = uri.search("Forum3") ;
	if(p != -1) {
		uri = forumPrefix + uri.substring(p) ;
		toggleAttr($("#dropLink"), "busy", "yes") ;
		$q(uri, function(result) {
			var adr = AddrTemplate(uri ) ;	
			var htm = result.responseText ;
			if(htm.length == 0)
				$subErr('Zero length document', uri) ;
			else {
				var re = /<body[^>]*>([\s\S]*)<\/body>/gim ;
				var m ;
				if((m = re.exec(htm)) != null) {
					var htm = m[1].replace(/<(iframe|script)[\s\S]*<\/\1>/gm,'') ; // kill google-analytics script & iframe
					$(subMsg).empty().append($(htm).filter("table:has(td[width=113]),table:has(td.style01)")) ;

					// modify content
					transMsg(subMsg, uri, true) ;					
					
					// title				
					var tt ;
					if(adr.q.CategoryID == 6) {
						tt = $(subMsg).find("img[src*=writer]:first").siblings("font:last").text() ;
					} else {
						tt = $(subMsg).find("td[width=113]").next("td").text() ;
					}
					$("#msgTitle").text(shortText(tt, 25,23)) ;

///       other link modification			

///       ....		


///       page list

					var lastKid = $("#subMsg font:has(a[href]):contains(" + String.fromCharCode(0x9801,0x6578) + ") :last-child") ;
					var last = setVal(parseInt(lastKid.text()), 1) ;
					lastKid.parent().remove() ;
					var curr = adr.q.OpinionPage ;

					$(subPage).empty().
						append(pgList(adr, curr, last)).prepend('&nbsp;<b>&nbsp;' + curr + '&nbsp;</b>/<small>&nbsp;' + last + '&nbsp;</small>頁&nbsp;:&nbsp;').
						prepend($("#subMsg table:has(td.style01) td>font>a:has(img[align=absmiddle])")) ;

///


// alternative message dispaly style
 					if($S.win.alt) {
//						$("#subMsg > table:not(:has(td.style01))").remove() ;
//						$(subMsg).find("tr:has(td>font>a>img[align=absmiddle]):not(:has(tr)):first").remove();
						$(subMsg).find("td:has(a[name]) + td.style01").each(function(){
							var h = $(this).children() ;
							var fs = document.createElement("fieldset") ;
							var lg = document.createElement("legend") ;
							$(fs).addClass("style01").append(lg).append(h) ;
							$(this).prev("td").find("br").each(function() {
//								$(this).parent().find("font img").attr("height", '16') ;
								var pe = $(this).prevAll("img[align=absmiddle],font") ;
								var ne = $(this).next("font").prepend("&nbsp;").append("&nbsp;") ;
								$(this).after(pe).before(ne) ;
								$(this).remove() ;
							}) ; //replaceWith(spc) ;
							var prv = $(this).prev("td").children() ;
							$(lg).append(prv) ;
//							$(this).prev("td").remove() ;
							$(subMsg).append(fs) ;
						}) ;																				
						$("#subMsg > table").remove() ;
					} // alternative style
////


					$("#txtBox a[href*=Forum3], #subMsg td.style01 a[href*=Forum3]").
						click(function(){			
							$sub($(this).attr("href")) ;
							return false ;
						}) ;
					
					// sometime, it scrolls before dom rendering, 
					// set a timeout to be more sure it scrolls correctly
					if(adr.u.hash.length) {
						var hashNum = /(\d+)/.exec(adr.u.hash) ;
						if(hashNum) {
							doTxtBox(1) ;
							window.location.replace('#' + hashNum[1] + 'pv') ;
						} else
							setTimeout(scroller,50) ;					
						//msgBox.scrollTop = msgBox.scrollTop - 10 ;
					} else  // animation :)
						setTimeout(scroller,50) ;

					$("#cToMain").attr("enabled","yes") ;
					reloadBtn(adr, tt) ;
					recentBM.add(adr, tt) ;
					$S.saveCfg("recent") ;
					//prt(varTbl($S.recent[0])) ;
					
				}	else
					$subErr('Unknown error, may be not a HTML document', uri) ;		
			}							
			toggleAttr($("#dropLink"), "busy", "no") ;
			if(callback) 
				callback() ;
			else
				doTxtBox(1) ;
		}) ;
	}
	return false ;
} ;

var scroller = function() {
	var t = subMsg.scrollTop - 1000 ;
	if(t > 0) {
		subMsg.scrollTop = t ;
		setTimeout(scroller,50) ;
	} else
		subMsg.scrollTop = 0 ;
} ;


var pgList = function(addr, curr, last) {
	var list = document.createElement("span") ;
	var prev = 0 ;
	$(list).append("&nbsp;&nbsp;") ;
	for(var i = 1 ; i <= last ; i++) {
		if(i == curr) {
			prev = i ;
			$(list).append('<span class="plink"><b>' + i + '</b>' + ' </span>') ;
		} else {
			if(i <= 5 || i + 5 > last || Math.abs(i - curr) <= 5) {				
				var eclipse = '' ;
				if(i != prev + 1) {
					var mp = Math.ceil((i + prev)/2) ; // middle page
					eclipse = '<a class="plink" href="' + addr.opPage(mp) + '" title="第' + mp + '頁">&nbsp;...&nbsp;</a>' ;
				}
				prev = i ;
				$(list).append(eclipse + '<span><a class="plink" href="' + addr.opPage(i) + '" title="第' + i + '頁">' + i + '</a> </span>') ;
			} 
		}
	}
	if(last > 21) {
		var pgsel = document.createElement("select") ;
		$(list).prepend(pgsel) ;
		$(pgsel).attr("rel",addr.u.ltmPrefix + '&OpinionPage=') ;
		$(pgsel).css({border:'1px solid #369',width:'4em', textAlign:'right'});
		for(var i = 10 ; i < last + 10 ; i += 10) {
			var selected = i == Math.floor((curr + 9)/ 10) * 10 ? 'selected' : '' ;			
			$(pgsel).append('<option ' + selected + ' value="' + (i > last ? last : i) + '">' + (i > last ? last : i) + '&nbsp;&nbsp;</option>') ;
		}				
		$(pgsel).change(function() {
			$sub($(this).attr("rel") + $(this).find("option:selected").attr("value")) ;
		}) ;		
	}
	
	return list ;
}

var jmpMenu = function() {
	var jmpSel = $("select[name=CategoryID]") ;
	if(jmpSel) {
		var jmpMenu = jmpSel.parent().parent() ;	
			
		jmpSel.removeAttr("onChange") ;
		jmpSel.prependTo($(jmpMenu)) ;
		$(jmpMenu).find("form[action*=Forum2]").remove() ;
		jmpSel.change(function() {
			window.location.href = forum + $(this).find("option:selected").attr("value") ;		
		}) ;
	}
}

// new implementation



var shortLnkTxt	= function(e) {
	if(e && e.tagName == 'A' && e.firstChild) { // e has to be an 'A' link element
		var childTag = e.firstChild.tagName ;
		if(!childTag || childTag != 'IMG') // if text or not img link, 
																			 // note:all html tag inside this anchor 
																			 // will remove, left only text content
			e.textContent = shortText(e.textContent,60,40) ;
	}
};

var shortText = function(t, maxLen, breakAt) { // shorten a text to at most maxLen - 2 chars
	if(t) {
		maxLen  = !maxLen ? 60 : maxLen ;
		breakAt = breakAt ? breakAt : (maxLen - 4)/2 ;
		var l = t.length ;
		if(l > maxLen) {
//			if(breakAt + 2 < maxLen && breakAt > 0)
				t = t.substring(0,breakAt - 2) + '..' + t.substring(l + breakAt + 2 - maxLen, l) ;
//			else
//				t = t.substring(0,maxLen) ;
		}
	}
	return t ;
}

var text2url = function(h) {
	if(h) {
		var re = /(^|[\s\n\r]|[^="\w\d])((ht|f)tps?:\/\/([^"<>\s]+))/gim;
		h = h.replace(re, '$1<a class="ltm" href="$2" title="$4">$4</a>') ; 
	}
	return h ;
} ;

var simpleTag = function(h) {	
	if(h) {		
		var allowed = 'blockquote|q|em|strong|b|i|ol|ul|li|del|ins|sub|sup' ;
		var shorthand = {
			Q:'blockquote',
			S:'strong'
		} ;
		var direct = {
			'(\{|\\[)#':'<ol>',
			'#(\}|\\])':'</ol>',
			'(\{|\\[)\\$':'<ul>',
			'\\$(\}|\\])':'</ul>',
			'(\{|\\[)%':'<li>',
			'%(\}|\\])':'</li>',
			'(\{|\\[)!':'<i>',
			'!(\}|\\])':'</i>',
			'(\{|\\[)\\*':'<b>',
			'\\*(\}|\\])':'</b>',
			'(\{|\\[)\\+':'<ins>',
			'\\+(\}|\\])':'</ins>',
			'(\{|\\[)-':'<del>',
			'-(\}|\\])':'</del>',
			'(\{|\\[)\\^':'<sup>',
			'\\^(\}|\\])':'</sup>',
			'(\{|\\[)v':'<sub>',
			'v(\}|\\])':'</sub>',
			'(\{|\\[)@':'<q>',
			'@(\}|\\])':'</q>',
			'\{\\[':'<blockquote>',
			']\}':'</blockquote>',
			'\{=':'<blockquote>',
			'=\}':'</blockquote>',

			'(\{|\\[):([a-zA-F]+|\#[0-9a-fA-F]+):':'<font color="$2">',
			':(\}|\\])' : '</font>'
//			,

//			'\{\{([^\{]?)':'<blockquote>$1',
//			'([^\}])\}\}':'$1</blockquote>'
		}
		// modify the closing tag of an attribute-included tag 
		// so that it will not match in next search, ...may be buggy in deep nesting tags
		var re = new RegExp("(&lt;(" + allowed + ")\\s+)(.*)&lt;\\/\\2&gt;", 'gim') ; /**/		
		h = h.replace(re, '$1$3&lt;/ $2&gt;') ;	
		// replace all allowed simple tag (that no attribute-included)
		re = new RegExp("&lt;(\\/?(" + allowed + "))&gt;", 'gm' ) ;	
		h = h.replace(re, '<$1>') ;
		// replace shorthand tag
		for(var sh in shorthand) {	
			re = new RegExp("&lt;(\\/?)" + sh + "&gt;", 'gm' ) ;	
			h = eval('h.replace(re, "<$1' + shorthand[sh] + '>")') ;
		}
		
		for(var dr in direct) {	
			re = new RegExp(dr, 'gm' ) ;	
			h = h.replace(re, direct[dr]) ;
		}
		// font color tag
		re = /&lt;c:((\#[\da-fA-F]+)|[a-zA-Z]+)&gt;/gm ;
		h = h.replace(re, '<font color="$1">') ;
		h = h.replace(/<font color="#([\da-fA-F])([\da-fA-F])([\da-fA-F])">/gm, '<font color="#$1$1$2$2$3$3">') ;
		h = h.replace(/&lt;\/c&gt;/gm, '</font>') ;
		// ul li format tweak
		h = h.replace(/<(\/?)(li|ul|ol)>\s*([\n\r\s]*<br>[\n\r\s]*)+\s*</gim, '<$1$2><'); // /* */
		h = h.replace(/<li><(ul|ol)>/gim, '<li> <$1>'); 
	}
	return h ;
} ;

var txtTransformer = {
	func : [],
	add : function(f) {this.func.push(f) ; return this ; },
	act : function(h) {
		for each(var f in this.func)
			h = f(h) ;
		return h ;
	}
} ;

txtTransformer.add(text2url).add(simpleTag) ;

var noYes = function(v) {	
	return (!v || (typeof v == 'number' && v == 0) || (typeof v == 'string' && v == 'no') ? 'no' : 'yes') ;
} ;

var zero1 = function(v) {	
	return (!v || (typeof v == 'number' && v == 0) || (typeof v == 'string' && v == 'no') ? 0 : 1) ;
} ;

var setAttr =  function(attrName, val, iDs) {
	for(var iD in iDs) $('#' + iD).attr(attrName, noYes(val)) ;
} ;
var getAttr =  function(attrName, iD) {
	var t = noYes($('#' + iD).attr(attrName)) ;
	$('#' + iD).attr(attrName, t) ;
	return t ;
} ;

var toggleAttr = function(e, attrName, attrValue) {
	if(typeof e == "string" && e.substring(0,1) != "#")	e = '#' + e ;
	e = $(e) ;
	if(arguments.length == 2) attrValue = 1 - zero1(e.attr(attrName)) ;
	e.attr(attrName, noYes(attrValue)) ;	
	return noYes(attrValue) ;
}

var transMsg = function(context, baseUrl, isSubMsg) {
	var msgs = $(context).find(msgSelector) ;	
	var adr  = AddrTemplate(baseUrl) ;
	msgs.find("a[name]").each(function() {
		var opId = $(this).attr("name") ;
		if(isSubMsg) $(this).attr("name", opId + 'pv') 
		$(this).addClass("opId").
			attr("href", adr.opId(opId)).text('@' + opId ).
			attr("title", "第 " + opId + " 個留言") ;		
		//  convert datetime
//		var dt = $(this).siblings(":last") ;
		var edId = 'r' + opId ;
		if(isSubMsg) edId = 'r' + edId ;
		$(this).before($('<img id="' + edId + '" rel="" class="click" title="回應文章" src="' + quoteIm + '"/>')) ;
		$('#' + edId).click(function() {
			var Target = $(this).parent().parent().find("span[id*=o]") ;
			var txt = $.trim(Target.html().
				replace(/<br>/gim, "\n").
				replace(/<img[^>]+alt="([^">]+)"[^>]+>/gim, '{*$1*}').
				replace(/<\/?[^>]+>/gim, '')) ;
			var opLnk = $(this).siblings(":first").attr("href") ;
			var nameNtime = "" ;
			$(this).nextAll("font").each(function(){
				var tx = $(this).text() ;
				if(!tx && $(this).find("img[alt]")) tx = $(this).find("img[alt]").attr("alt") ;
				nameNtime += tx + ' ' ; 
			}) ;
			var reply = $(document.createElement("form")) ;
			var nickName = typeof $S.sys.nick == 'string' && $S.sys.nick.length > 1 ? $S.sys.nick : tmpNick ;
			
			prt(baseUrl + br + adr.u.raw + hr + varTbl(adr.u) + hr + varTbl(adr.q) + hr + hr) ;
//			alert(adr.u.raw + ' ' +adr.Query()) ;
//			reply.attr({method:'post', name:'Forum', enctype:'multipart/form-data', action:adr.u.ltmPrefix.replace('Forum3', 'Forum4')}).
			reply.attr({method:'post', name:'Forum', enctype:'multipart/form-data', action:forumPrefix + 'Forum4.cfm' + adr.Query()}).
				append('<input type="text" name="ShowName" value="' + nickName + '"/>').
				append('<input type="text" name="Subject" value=""/>').
				append('<textarea name="Description">' + opLnk + '\n{!' + nameNtime + "!}\n{=" +  txt + '=}</textarea>').
				hide().appendTo(Target).submit();			
			//	prt(reply.attr("action") + br + baseUrl + br + adr.u.raw + hr + varTbl(adr.u) + hr + varTbl(adr.q)) ;
			return false ;
		}) ;
		//dt.text(dt.text().replace(/^\d\d(\d\d)-[0]?([1]?\d)-[0]?([1-3]?\d)\s/, '$1年$2月$3日 ')) ;		
	}) ;

	msgs.find("td.style01").each(function() { transTxt(this) ;}) ;
} ;

var transTxt = function(e) {
		var h = $.trim($(e).html()) ;
		var ori = h ;		

		h = txtTransformer.act(h) ;

		var uiD = uid() ;
		var prv = $(this).prev("td") ;
		if(prv.length) {
			var edt = prv.find("img") ;
			if(edt) {
				edt.attr("rel", uiD) ;
			}
		}
		if(ori != h) {
			$(e).html('<img class="click right" rel="' + uiD+ '" id="a' + uiD + '" src="' + lrdArow + '" title="轉換原文" /><span id="m' + uiD + '" show="yes"></span><span id="o' + uiD + '" show="no"></span>')			
			$(e).find("#o" + uiD).html(ori) ;
			$(e).find("#m" + uiD).html(h) ;									
			$(e).find("#m" + uiD + " a").each(function() { 
				shortLnkTxt(this) ; 
			}) ;
			$(e).find("#a" + uiD).click(function() {
					var myiD = $(this).attr("rel") ;
					var m = $(this).parent().find("#m" + myiD) ;
					var o = $(this).parent().find("#o" + myiD) ;
					toggleAttr(m, "show") ;
					toggleAttr(o, "show") ;
					return false ;
			}) ;
						
		}	else {
			$(e).empty().append('<span id="o' + uiD + '" show="yes"></span>') ;
			$('#o' + uiD).html(ori) ;
		}
} ;

var passOption = function(from, to) {
	for(var p in to)
		if(from[p] != undefined ) {
			if(typeof to[p] == 'number' && typeof from[p] == 'string')
				to[p] = parseInt(from[p]) ;
			else
				to[p] = from[p] ;
		}
} ;

var AddrTemplate = function(u){ return new addrTemplate(u) ; } ;

var addrTemplate = function(uri) {
	this.u = {
		raw						: null,
		type       		: 'external',
		host       		: 'leetm.mingpao.com',
		pathname      : '/cfm/Forum3.cfm',
		search     		: '',
		hash       		: '',
		ltmPrefix     : '',
		wikiLang      : 'en'
	} ;
	// leetm.mingpao.com specific
	this.q = {
		Forum      		: 2,
		CategoryID 		: 0,
		TopicID    		: 0, // 5-3333 => '致網編' :)
		TopicOrder 		: "Desc",
		TopicPage  		: 1,
		OpinionID  		: 1,
		OpinionOrder	: "Desc",
		OpinionPage		: 1,
		title         : '',
		// for youtube
		v        			: '',
		// for wiki
		wiki     			: '',	
	} ;

	// initializing
	var uri = $.trim(uri) ;
	this.u.raw = uri ;

	var re = /^(\d)(-(\d+))?(-(\d+))?$/ ;
	var m = null ;
	if(typeof uri == 'string') m = re.exec(uri) ;

	if(m) { // leetm url represented by a hash string eg. 5-3333-100
		this.q.Forum      = 3 ;
		this.q.CategoryID = parseInt(m[1]) ;
		this.q.TopicID    = m[3] ? parseInt(m[3]) : 1 ;
		this.q.OpinionID  = m[5] ? parseInt(m[5]) : 1 ;
		this.u.type = 'ltm' ;
	} else if(typeof uri == 'string') {
		re = /^http:\/\/([^/?#]*)(\/?[^?#]*)(\??[^#]*)(#?.*)$/ ;
		m = re.exec(uri) ;
		if(m) {
				this.u.host     = m[1] ;
				this.u.pathname = m[2] ;
				this.u.search   = m[3] ;
				this.u.hash     = m[4] ;
				if(/leetm\.mingpao\.com$/.test(this.u.host)) {
						this.u.type = 'ltm' ;
				} else if(/\byoutube\.com$/.test(this.u.host)) {
						this.u.type = 'youtube' ;
				} else if(/\bwikipedia\.org$/.test(this.u.host)) {
						this.u.type = 'wiki' ;
				}
				var query = new Object ;
				if(this.u.search) {
					var tmp = this.u.search.substring(1).split('&') ;
					for each(var p in tmp) {
						var pp = p.split("=") ;
						query[pp[0]] = pp.length > 1 ? pp[1] : '' ;
					}
					passOption(query, this.q) ;
				}
		}	else { // not http url, u.raw treat as text to be found in google (limit inside leetm)
			this.u.type      = "google" ;
		}			
	} else { // dup from another AddrTemplate object
		this.u = uri.u ;
		this.q = uri.q ;
	}
	
	switch(this.u.type) {
		case 'ltm': 
			var m = /Forum(\d)/.exec(this.u.pathname) ;
			if(m) this.q.Forum = parseInt(m[1]) ;
			with(this.q)
			this.u.ltmPrefix = 'http://' + this.u.host + this.u.pathname + 
				'?CategoryID=' + CategoryID + '&TopicID=' + TopicID +
				'&TopicOrder=' + TopicOrder + '&TopicPage=' + TopicPage ;
			break ;
		case 'youtube':
			break ;
		case 'wiki':			
			break ;
		default: // other external link
	}
	
	// member functions :

	this.Query = function() {
		var q ;
		with(this.q)
		q = '?CategoryID=' + CategoryID +
			'&TopicID=' + TopicID + 
			'&TopicOrder=' + TopicOrder + 
			'&TopicPage=' + TopicPage + 
			'&OpinionPage=' + OpinionPage + 
			'&OpinionOrder=' + OpinionOrder ;			
		return q ;
	} ;
	
/*
?
CategoryID=2&
TopicOrder=Desc&
TopicPage=1&
TopicID=2572&
OpinionOrder=Desc&
OpinionPage=1'; return SetHiddenTopicFile();
*/	
	
	this.url = function(alt, forceType) {
		var Type = forceType ? forceType : this.u.type ;
		switch(Type) {
			case 'ltm': 
				var n = !alt ? this.q.OpinionPage : (typeof alt == 'number' ? alt : parseInt(alt)) ;
				return this.opPage(n) ;
			case 'youtube':
				var v = alt ? alt : this.q.v ;
				return 'http://youtube.com/watch?v=' + v ;
			case 'wiki':
				var Topic = alt ? alt : this.q.wiki ;
				return 'http://' + this.u.wikiLang + '.wikipedia.org/wiki/' + encodeURI(Topic) ;
			case 'google':
				var Topic = alt ? alt : this.u.raw ;
				return 'http://www.google.com/search?q=site%3Aleetm.mingpao.com+' + encodeURI(Topic) ;
			default: // other, just return the input url
				return this.u.raw ;
		}
	} ;

	// these two for leetm forum3
	this.opId = function(n) { // 
			return  this.u.ltmPrefix +
				'&OpinionID=' + n + '#' + n ;
	} ;
	this.opPage = function(n) { // 
			return  this.u.ltmPrefix +
				'&OpinionOrder=' + this.q.OpinionOrder + '&OpinionPage=' + n ;
	} ;
	return this ;
} ;


var varTbl = function(o, spec) {
	var s = '<table>' ;
	var p ;
	if(spec)
		for each(var i in spec) p[i] = 1 ;
	else
		p = o ;
	for (var pp in p) {
		s += '<tr><td width="20em">' + pp + '</td><td>&nbsp;:' + (typeof o[pp]) + ':&nbsp;</td><td>[' +  o[pp] + ']</td></tr>' ;
	}

	s += '</table>' ;
	return s ;
} ;


var checkDropLink = function() {
	var uri = $("#dropLink").attr("value") ;
	$("#dropLink").attr("value","") ;
	
	if(uri && typeof uri == "string" && uri.length > 1)
		launch(uri) ;
} ;

var launch = function(uri) {
		var adr ;
		if(typeof uri == 'string') 
			adr = AddrTemplate(uri) ;
		else	
			adr = uri ;
		switch(adr.u.type) {
			case 'ltm':
				if(adr.q.Forum == 3)
					$sub(adr.u.raw) ;
				else
					window.location.href = adr.u.raw ;
				break;
			case 'google':
				var t = adr.u.raw ;
				if(t.substring(0,5) == 'data:' &&  t.length > 100)
					return false ;
				else
					GM_openInTab(adr.url()) ;				
				break ;
			case 'wiki':
			case 'youtube':
				GM_openInTab(adr.url()) ;
				break ;
			default:
				GM_openInTab(adr.u.raw) ;
		}
		return false ;
} ;

/////===================



var	txtPop, subMsg, txtBox, msgBox, subPage, medPop ;
var recentBM, selectBM ;
var debugTxt ;

//inject css
GM_addStyle( nl +
	'#mainMsg, #mingpao, #mainPage, .ltm, .ltm table, .ltm tr, .ltm tbody, .ltm td, .ltm div, div.pop {margin:0px;padding:0px;border:0px;border-collapse:collapse;}.ltm input[type=checkbox] {margin:0px;border:0pxpadding:2px 4em 2px 4px;border-collapse:collapse;}iframe {width:760px}.xserach {height:80px;display:block;border:4px dotted red;}#debugBox {overflow-y:scroll;width:30em;height:20em;position:fixed;top:10em;right:2em;background-color:#ffe;color;black;opacity:1;z-index:888}#msgTitle {overflow:hidden; max-width:20em; padding:2px 0.5em;}.plink {padding:0 2px;}a.plink {text-decoration:none;font-size:80%;font-weight:900}a.opId {font-size:0.7em;font-weight:900;text-decoration:none}.ltm legend {whiteSpace:nowrap}.ltm legend img{vertical-align:middle; max-height:32px}.mark {background-color:yellow;border:1px solid red}td.style01 {border:1px dotted gray;padding:0.2em 0.5em !important; }#subMsg td.style01 {border:0px !important; }img.click {display:inline;border:0px; padding:0px; margin:0px;cursor:pointer;vertical-align:bottom}img.right {float:right;}.datetime {background-color:#e0e0e0;}.styel01 q {display:inline}.style01 blockquote {background-color:#ffe;border:1px dashed #88c;margin:0.3em 3% 0.2em 3%;padding:0.2em 1.5em;float:none;display:inline-block}.style01 blockquote > blockquote {background-color:#ffd;}.style01 blockquote > blockquote > blockquote{background-color:#ffc;}.style01 blockquote > blockquote > blockquote > blockquote{background-color:#ffb;}.style01 a {text-decoration:none}.style01 a:hover  {position:relative;left:1px;top:1px}#mainPage {z-index:11}#mainPage {height:20px;margin:0px;padding:2px 0.5em;font-size:16px;vertical-align:middle}#mainMsg {width:100%;height:100%}#subMsg {overflow:auto;max-height:560px;}#subMsg table, #subMsg td, #subMsg tbody, #subMsg tr  {border:0px}#subPage {padding:2px 0.5em;}*[show="no"], *[NA] {display:none;}.pop {position:fixed;}#txtPop {right:8px;z-index:111}#txtPop[up=yes] {top:4px;}#txtPop[up=no]  {bottom:4px;}#txtBox {background-color:#f2f2f2;}.bar {background-color:#008;height:100%;vertical-align:middle}.bar td{color:white;}.jmp td{color:black;}td.SEP {width:6px;background-color:#669;border:1px solid:#008;}td.SEP[thin] {width:4px;}td.SPC {width:6px;background-color:#008;border:1px solid:#008;}td.btn{cursor:pointer;margin:0px;padding:0px;border:0px;font-size:16px;text-align:center:vertical-align:middle;font: 900 16px/1 "細明體", ”Courier New”;}td.btn:hover {background-color:#c00;}td.btn:active {background-color:#88c;}td.btn[enabled=no] {color:#ccc}td.btn[enabled=no]:hover {background-color:#008;}td.btn[enabled=no]:active {background-color:#008;}#dropLink[busy=yes] {background: white url(data:image/gif;base64,R0lGODlhEAAQALMNAD8%2FP7%2B%2FvyoqKlVVVX9%2FfxUVFUBAQGBgYMDAwC8vL5CQkP%2F%2F%2FwAAAP%2F%2F%2FwAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2BQQJAAANACwAAAAAEAAQAAAEPbDJSau9OOvNew0AEHDA8wCkiW6g6AXHMU4LgizUYRgEZdsUggFAQCgUP%2BAERggcFYHaDaMgEBQchBNhiQAAIfkECQAADQAsAAAAABAAEAAABDuwyUmrvTYAEDAFzwN4EyiSksaRyHF06GEYBNoQ82EHBwHbCIUCYRMKiwSCYoFALDCIwLDZBFJtTKclAgAh%2BQQJAAANACwAAAAAEAAQAAAEPrDJGQAIM2vwHtAUcVTdBzaHYRCKip2EepxacBAvjSgKQmc83m%2BiILCGEkSgh5wsEIhFEwqdUpvPaHPLnUQAACH5BAkAAA0ALAAAAAAQABAAAAQ%2BsMkZyAkz62MM0ROiKAjRXQCATeOIHEQAPA%2BQKQShZHOdIQFSRqaSLBCIBQiERC41TcQzc0xOr9isdsvtPiMAIfkECQAADQAsAAAAABAAEAAABD2wyYmUQjNra%2FVcCLIoBKEExBFkYRtcBGAQbJsdhnFkoMimGI8wAACshBnA4wFAJpdNp4RolFqv2Kx2q4kAACH5BAkAAA0ALAAAAAAQABAAAAQ9sMm5EFoza2u1b5ylKMjXVFdAjGamrEo7IWMpz8QR3A0BGATewWA48BA5mykAAOxugMcDwItOeUwnb9uKAAAh%2BQQJAAANACwAAAAAEAAQAAAEO7DJSau92C6EVp4c90khMjZbd5KKYo4B0Z4KIZ9I4H7IQQSng8FwwAQAgJgBQMAAHo%2BkD3h5Rk%2FHpCUCACH5BAkAAA0ALAAAAAAQABAAAAQ8sMlJq7046827nwuCLJwoliYXjlIAAAGFKApCAc8DULQSTzgd4kCYEQgKigt2MBgOC5rtQnAeOAHilBIBADs%3D) no-repeat scroll left center;}#dropLink					       {hieght:10px;text-align:center;padding:2px;background-color:#88c;border:1px solid #ccf;font-size:8px;cursor:default;}#dropLink[busy=no]:hover {hieght:10px;text-align:center;padding:0px;background-color:#88c;border:3px solid #fcc;font-size:8px;cursor:default;}#dropLink[busy=no]:focus {hieght:10px;text-align:center;padding:0px;background-color:#c88;border:3px solid #fcc;font-size:8px;cursor:default;}span.info > div {background-color:#ffe;color:black;max-width:40em;overflow:scroll;max-height:300px;border:1px solid red;}span.info:hover > div, span.info > div:hover {display:block;}#barMenu li {z-index:99993;opacity:0.95;word-break:keep-all;display:block;white-space:nowrap;}#barMenu ul {z-index:99990;}#barMenu ul, #barMenu li {padding: 0; margin: 0;background-color:#008;}#barMenu li {padding: 0; margin: 0;background-color:#008;}#barMenu li.subMenu {color:#ffc;}#barMenu li.subMenu[enabled=no] {color:#cc8;}#barMenu li li {background-color:#559; border: 1px dotted silver;color:white}#barMenu li:hover {background:#c00}#barMenu ul li {padding:0.2em 0.4em; list-style-type: none; position: relative;}#barMenu ul ul { display:none;}#barMenu ul ul > li { min-width:9em;}#barMenu ul ul > li li{ max-width:25em;overflow:hidden}#barMenu ul li:hover > ul {right: -4em;}#barMenu ul ul li:hover > ul {right: 100%;}#barMenu[up=yes] ul li:hover > ul { top: 1em;}#barMenu[up=yes] ul ul li:hover > ul {top: -1em;}#barMenu[up=no]  ul li:hover > ul { bottom: 1em;}#barMenu[up=no]  ul ul li:hover > ul {bottom: -0.5em;}#barMenu ul li:hover > ul { display:block; position: absolute;}#barMenu ul li[enabled=no]:hover > ul { display:none;}#barMenu ul li[enabled=no] {cursor:default;background-color:#559;color:gray}#subMsg {width:790px;}'. // inject CSS
		replace(/([{;])\s*[\n\r]+\s*/gm,"$1").
		replace(/}(\s*[\n\r]+\s*)+/gm,"}\n")
) ;

$(function() {

	$(document.body).append( // inject HTML
		'<div class="ltm SUB"><div id="txtPop" class="pop" up="yes"><table width="100%"><tbody><tr><td id="upper"><div id="cmdBar" class="bar"><table width="100%"><tbody><tr><td align="left" width="36px"><div id="tswitch" align="left" ><table><tbody><tr><td id="cTxt"    class="btn" enabled="yes" title=" 顯視/隱藏文章 ">&#x25c7;</td><td>&nbsp;</td><td title=" 拖放連結 " id="dropZone"><input busy="no" id="dropLink" type="text" size="2" value="" rel=""/></td><td>&nbsp;</td><td id="cReload" class="topmenu btn" enabled="no" title=" 重載副頁 " rel="">&#x2718;</td></tr></tbody></table></div></td><td align="left"><div id="wbar" show="no"><table><tbody><tr><td>&nbsp;|&nbsp;</td><td class="win btn" enabled="yes" win="4" title=" 全高 ">&#x2588;</td><td class="win btn" enabled="yes" win="3" title=" ３個骨高 ">&#x2586;</td><td class="win btn" enabled="yes" win="2" title=" 半高 ">&#x2584;</td><td class="win btn" enabled="yes" win="1" title=" 四分1高 ">&#x2582;</td><td>&nbsp;|&nbsp;</td><td><span id="msgTitle"></span></td></tr></tbody></table></div></td><td align="right"><div id="jbar" show="yes"><table><tbody><tr><td>&nbsp;|&nbsp;</td><td class="jmp btn" enabled="yes" bgcolor="#cc9900" rel="6" title="　嘉賓區　">客</td><td>&nbsp;|&nbsp;</td><td class="jmp btn" enabled="yes" bgcolor="#3366cc" rel="1" title="　思方、邏輯、數理　">思</td><td class="jmp btn" enabled="yes" bgcolor="#0099ff" rel="2" title="　宗教、哲學、科學　">哲</td><td class="jmp btn" enabled="yes" bgcolor="#49a7c7" rel="3" title="　文學、音樂、藝術　">樂</td><td class="jmp btn" enabled="yes" bgcolor="#8c83e2" rel="4" title="　社會、人物、人生　">人</td><td class="jmp btn" enabled="yes" bgcolor="#59cecb" rel="5" title="　幽默、閑談、其他　">閑</td></tr></tbody></table></div></td><td align="right" width="80px"><div id="lbar" align="right" ><table><tbody><tr><td>&nbsp;|&nbsp;</td><td id="cDock"    class="btn" enabled="yes" title=" 上下轉換 ">&#x25c6;</td><td>&nbsp;|&nbsp;</td><td class="btn" enabled="yes" id="barMenu" right="no" up="yes"><ul class="submenu"><li>&#x203b;<ul><li id="cToMain" enabled="no">&#x2199;移至主頁</li><li id="cFromMain" enabled="no">&#x2197;載入主頁</li><!-- 261a 261c --><li class="subMenu">　最近文章<ul id="recent" check="no"><li>　重載最近文章</li><li class="bmStart"></li></ul></li><li class="subMenu" enabled="yes">　書籤文章<ul id="bookmark" check="yes"><li id="cAddBM">　加入書籤</li><li id="cDelBM">　刪除以下選取書籤</li><li class="bmStart"></li></ul></li><li class="subMenu" enabled="yes">　設定<ul><li id="cNick">　改變署名:</li><li id="cTrans">　半透明文章區</li></ul></li></ul></li></ul></td><td>&nbsp;|&nbsp;</td><td id="cJBar"    class="btn" enabled="yes" title=" 顯視/隱藏連結控制 ">Ｌ</td><td id="cStyle"   class="btn" enabled="yes" title=" 轉變文章樣式 ">Ｔ</td><td id="cMed" class="btn" enabled="yes" title0=" 顯視/隱藏多媒體 ">Ｍ</td><td>&nbsp;&nbsp;</td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr><tr><td id="middle" title=" search tool (to be done) " NA><div id="tool"></div></a></td></tr><tr><td id="lower"><div id="txtBox" show="no"><table><tbody><tr><td id="pageBox"><div id="subPage" class="page"></div></td><tr><td id="msgBox"><!-- SUB CONTENT BEGIN --><div id="subMsg"></div><!-- SUB CONTENT END --></td></tr></tbody></table></div></td></tr></tbody></table></div><div id="medPop" class="pop" rel="" st="a" up="no">(未載入)</div><div id="tipPop" class="pop" rel="" show="no">( tooltip )</div><div id="debugBox" class="pop" show="no"></div></div>'.replace(/>\s*[\n\r]*\s*</gm,"><")
	) ;	

// ================= setup global variables & attached functions
	
	txtPop = document.getElementById("txtPop") ;
	subMsg  = document.getElementById("subMsg") ;
	txtBox  = document.getElementById("txtBox") ;
	msgBox  = document.getElementById("msgBox") ;	
	subPage = document.getElementById("subPage") ;	
	medPop = document.getElementById("medPop") ;

	jmpMenu() ; // hijack forum script to avoid accesses violation

// load & restore config

	$S.loadCfg() ;



	doTxtBox($S.win.sub) ;
	doDock($S.win.up) ;
	$("#jbar").attr("show", noYes($S.win.jmp)) ;
	
	if($S.win.trans) $(txtBox).css("opacity","0.95") ;
	
	$("#cNick").text("　改變署名:" + $S.sys.nick) ;
	
  recentBM = new BMList("recent") ;
  selectBM = new BMList("bookmark", true) ;
	recentBM.init() ;
	selectBM.init() ;
	
//click actions

// button cmd	
	$("#cTxt").click(function() {	
		$S.win.sub = zero1(doTxtBox()) ;
		return false ;
	}) ;
	
	$("#cJBar").click(function() { 
		$S.win.jmp = zero1(toggleAttr("jbar","show")) ; 
		return false ;
	}) ;
	
	$("#cDock").click(function() {
		$S.win.up = zero1(doDock()) ; 
		return false ;
	}) ;

//	$("#cMed").click(function(){ var t = toggleAttr("debugBox","show") ;	}) ;

	$("#txtPop .jmp").click(function() {
		window.location.href = forumPrefix + 'Forum2.cfm?CategoryID=' + $(this).attr("rel") ;
		return false ;
	}) ;
	
	$("#txtPop .win").click(function() {
		doWHeight($(this).attr("win")) ;
		return false ;
	}) ;
	
	$("#cReload").click(function() {
		with($("#cReload"))
			if(attr("enabled") == "yes" && attr("rel"))
				$sub(attr("rel")) ;
		return false ;
	}) ;
	$("#cStyle").click(function() {
		$S.win.alt = $S.win.alt ? 0 : 1 ;
		var reloadUri = $("#cReload").attr("rel") ;
		if(reloadUri) $sub(reloadUri) ;
		return false ;
	}) ;


// menu cmd
	$("#cToMain").click(function() {
		var uri = $("#cReload").attr("rel") ; 
		if(uri) {	window.location.href = uri ; }
		return false ;
	}) ;
	$("#cFromMain").click(function() { $sub(window.location.href) ;	return false ; }) ;
	
	$("#cNick").click(function() {
		var newNick = prompt("輸入新署名", $S.sys.nick) ;
		if(newNick != undefined) {
			$S.sys.nick = newNick ; 
			$S.saveCfg('sys') ;
			$("#cNick").text('　改變署名:' + $S.sys.nick) ;
		}
		return false ;
	}) ;

	$("#cTrans").click(function() {
		$S.win.trans = 1 - $S.win.trans ;
		if($S.win.trans) 
			$(txtBox).css({opacity:0.9}) ;
		else
			$(txtBox).css({opacity:null}) ;
		return false ;
	}) ;

	$("#cAddBM").click(function() {
		var url = $("#cReload").attr("rel") ; 
		var tt  = $("#msgTitle").text() ; 
		if(url.length && tt.length) {
//			alert(selectBM.len() + '-' +  selectBM.max + '-' + $S['bookmark'].length) ;
			if(selectBM.len() >= selectBM.max)
				alert('最大數' + selectBM.max + '個書籤已滿, 先刪除部分書籤') ;
			else {
				selectBM.add(url,tt) ;
				$S.saveCfg("bookmark") ;
			}
		} else 
			alert('未載入文章') ;
		return false ;
	}) ;

	$("#cDelBM").click(function() {
		$("#bookmark").find(".bmStart").nextAll("li:has(input:checked)").each(function(){
			selectBM.del($(this).attr("rel")) ;
		});
		$S.saveCfg("bookmark") ;		
		return false ;
	}) ;
	
//	page content modification	

	var Adr = AddrTemplate(window.location.href ) ;

	if(Adr.q.Forum == 3) {  // opinion pages
		transMsg("body", window.location.href) ;
		$("#cFromMain").attr("enabled","yes") ;
		reloadBtn(Adr, Adr.u.raw) ;
	}	else {
		$("#cFromMain").attr("enabled","no") ;
		reloadBtn() ;
	}

	if(Adr.q.Forum == 4) {// reply form page
		var replyForm = $("form[name=Forum]") ;
		if(replyForm) {
			for(var frm=4; frm <= 5 ; frm++) { // same as above, hijack script
				var alnk = replyForm.parent().find('a[onClick*=Forum' + frm + ']') ;
				alnk.removeAttr("onClick") ;
				alnk.attr("href", forumPrefix + 'Forum' + frm + '.cfm' + Adr.u.search ) ;
				alnk.click(function() {
					$("form[name=Forum]").attr("action", $(this).attr("href")).submit() ;
//					$("form[name=Forum]").submit() ;
					return false ;
				}) ;
			} ;
	
			var pv = replyForm.parent("table").prev("table").find("td[width=20%]").next() ; // preview txt
			if(pv) transTxt(pv.addClass("style01")) ;
			
			$sub(Adr.u.raw.replace(/Forum4/, 'Forum3'), function(){doTxtBox(0);}) ;

			var ss = $("input[type=text][name=Subject]") ;
			if(ss) {
				ss.after('&nbsp;&nbsp;&nbsp;' + $("textarea[name=Description]").text().length + '字') 
			} ;
			ss = $("input[type=text][name=ShowName]") ;
			if(ss.attr("value") == tmpNick) ss.attr("value","") ;
		}
	} ;
		
		
	// prepend forum3 links with an img button to display page on subMsg	
	$('a[href*=Forum3.cfm?]:not(a[href*=OpinionID]):not(a[href*=OpinionPage])').
		each( function() {
			var uri = $(this).attr("href") ;
			uri = forum + uri.substring(uri.search("Forum3.cfm")) ;
			var Img = $('<img src="' + icoMsg + '" class="click"/>') ;	
			$(this).wrapInner('<span style="font-size:0.95em;"></span>').before(Img) ;
			$(Img).
				click(function() { 
					if($("#cReload").attr("rel") == uri)
						doTxtBox() ;
					else
						$sub(uri) ; 
					return false ;
				}) ;
		}) ;
/*	
	if($("#TopicDescription a[onClick]")) {	
		$("#TopicDescription a").removeAttr("onClick").click(function() {
			if($("#TopicFile a").length == 0)
				$("#TopicFile").append($(this).clone(true)) ;
			$("#TopicFile").toggle() ;
		}) ;
	}
*/
	setInterval(checkDropLink, 1000) ;

}) ; // end jQuery.ready

unsafeWindow.onbeforeunload = saveWinState ; // catch unload event to save setting


