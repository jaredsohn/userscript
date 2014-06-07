// ==UserScript==
// @name           TA - My Threads Cleaner
// @namespace      userscripts.org/110201
// @author         Lozzy - http://www.trueachievements.com/gamer.aspx?gamerid=45660
// @description    Allows you to hide threads from your 'My Threads' page
// @include        http://www.trueachievements.com/forum/viewthreads.aspx*
// @version        0.2
// @updateURL      http://userscripts.org/scripts/source/110201.meta.js
// @installURL     http://userscripts.org/scripts/source/110201.user.js
// ==/UserScript==

var t = document.evaluate("//tbody/tr[td[@class='topic']]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var rp = document.evaluate("//div[@id='maincontent']//tbody/tr/th[last()]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var rBtn = document.createElement('img');

var gmCompat = (typeof GM_deleteValue == 'undefined') ? false : true;

if (!gmCompat) {
	
    GM_getValue = function(name, defaultValue) {
        var value = localStorage.getItem(name);
        if (!value)
            return defaultValue;
        var type = value[0];
        value = value.substring(1);
        switch (type) {
            case 'b':
                return value == 'true';
            case 'n':
                return Number(value);
            default:
                return value;
        }
    }
    
    GM_setValue = function(name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(name, value);
    }
}

rBtn.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAAB9ElEQVQ4y6VTPWhTYRQ977vnSxoDRmkXQch7tjU2NtUhIrrUgoKTwUXFyU1QYxeRgugg1F1jQEQXEdwKxUmKotK6mMFBhzRBGzHvJY2UUKham7zPIbWKxvh3pwMXDvf8XMsYg/8Z9atFIr3N/DNB4uyAEc0/usD6UcLQ6IBxeh2ICFyvDJIQLS+p5cbD89PZjgRDo3Gzpc/BjkQCSikoSyCWwodPH1GZd+EtVHLUkpo8+cBtK4FaQAooBJWGVi0cCnVhsG8QsejWpNac7Chh76WkcWwHFMKtleFsthHv3Q5aArEExWoB1cXKmbvHJrJtTXx2OWd58y689y6mzj21vAXv3pMXj31jgKZpwu6xQc10xxQejc1YXE3h/qmp4zrA8WrdQzgQRmRdBNQSW5P9FQyP7zEtDwhqgQ5w7Js3hJCgkpax30W8hrRmfmT3SGxDOILlxmfMvJq+cvTOobBoAbVcsLtt+KaJFX8FpOR/ImCAmXLt3fWe9d0IMogDO/crr+5dFCpEN9oI6iCUpVCsFyCUTNsUDt88+HwgGk/2b+pH0zQQYgjKstAwTYTYhdJiCaWludy1fbd3te9BgKk3tde52eosfN+HrPbAmCaK9QLeLs3lRFSqYw8A4MTEkdOkpIUSEwpEVF5RMleHb2V/+wt/O18AJ2uoP4VMnXwAAAAASUVORK5CYII=');
rp.appendChild(rBtn); rp.style.padding = '0px';
rBtn.title = 'Temporarily restore hidden threads';
rBtn.style.cursor = 'pointer';

rBtn.addEventListener("click",function() {
	
	if (this.getAttribute('clicked')) {
		this.removeAttribute('clicked');
		for (var i=0; i < t.snapshotLength; i++) {
			t.snapshotItem(i).removeAttribute('style');
		};
	} else{
		this.setAttribute('clicked', 'true');
		for (var i=0; i < t.snapshotLength; i++) {
			t.snapshotItem(i).style.display = 'table-row';
		};
	};
	
}, false);

function processList() {
	
	var oThreads = GM_getValue('ignored_threads');
	var ts = new Array();
	if (oThreads) {
		ts = oThreads.split(',');
	};

	for (var i=0; i < t.snapshotLength; i++) {
	  var tRow = t.snapshotItem(i);
	  var threadID = /threadid=(\d+)/.exec(tRow.children[1].children[0].href)[1];
	  var button = tRow.children[7].children[0].children[0];
	  
	  var isMatch = false;
	  
	  for (var j=0; j < ts.length; j++) {
	  		 if (ts[j] === threadID) {
	  			isMatch = true;
	  		};
	  };
	  
	  isMatch === true ? changeButton(threadID, true, button) : changeButton(threadID, false, button);

	};
}
processList();

var sheet = document.styleSheets[0];
sheet.insertRule('table.maintable tr:hover td { background: none }', sheet.cssRules.length - 1);
sheet.insertRule('tr[visibility=hidden] { background: #e6e6fa; background: -moz-linear-gradient(top, #ffffff 0%, #e6e6fa 3%, #d5d5e2 97%, #ffffff 100%); display: none }', sheet.cssRules.length - 1);

function addHidden(threadID) {
	
	var threads = GM_getValue('ignored_threads');
	if (threads) {
		var ts = threads.split(',');
		
		if (ts.indexOf(threadID) === -1) {
			ts.push(threadID);
		}
		
		GM_setValue('ignored_threads', ts.join(','));
	} else {
		GM_setValue('ignored_threads', threadID);
	};
}

function removeHidden(threadID) {
	var threads = GM_getValue('ignored_threads').split(',');
	var idx = threads.indexOf(threadID);
	threads.splice(idx, 1);
	GM_setValue('ignored_threads', threads.join(','))
}

function changeButton(threadID, isMatch, button) {
	
	button.parentNode.removeAttribute('href');
	button.setAttribute('ThreadID', threadID);
	button.style.cursor = "pointer";
	
	var setRed = function(btn) {
		btn.setAttribute('src','/images/icons/cancel.png');
		btn.setAttribute('title','Hide this thread');
		btn.parentNode.parentNode.parentNode.removeAttribute('visibility');
	}
	
	var setGreen = function(btn) {
		btn.setAttribute('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsSAAALEgHS3X78AAACYUlEQVQ4y52TvWsUQRjGn5ndu+zt7Z4mknCYIkhIIXtdGm00USzVVgTLRBEViagIfpA0UZJC9C9QG7WIlR+VAQUttdh0AU0Md3sf8eLNZW+y82UhOTwvCPp0LzO/h3mfd17CGMO/6EbjkjubexBv1/T3w/lkZmg+mQn+AgfSyImp+uShLoP5ZGbIAv1KDQnv8ltdJtcbFwMCEmYt774w4vy59TP7AYAwxtpwCmnAALHZBNe8cNu9twQA135cCCxCQ8/24dk+Il5EbatyWSjxkDDGMJdMO8bozTR6qE99NFQDTDfAFS8oLQFCQ9/y4aU8RK0Ita2yElpkHuUXBNkOcZbfdJRRTYdkLJ96aCiGDVGHMBK+7cFP5VBsFbHOK0oY6T3OL/B2C9u6s3nVUVo2Xcu1fHsXNBQMDDQ0Sq1SG36Sf8F3nMJ0do4LI7168l1rSBTNGtbMKhQ0arysEy064C4DAFBaDIMQqqAgIaCMhIIEIRYVOhn+836HwZWNswFAQsdyIKEwQPLop3lII5HrycGy7PDk6tGOEbczmKpPBoTQMGNnkEvnEMURaryqhBakN7Ob9rt5VOIyynEZccIKb/Z9WGq/4BdMQsd2kE37iOISqryihE48YUQ2akbqG1tBr9uHPZk+pOx0OLY8GgCADQDCiAEbKWgYVOISqq2qkkZ4T/e+5ABwfGXMi5qlZmISy7WzoIRCGz0AYKndwkT11LhF7bcsYVpqkX02+Koj7WNfDjhKq6bf41v1Vv3Iu5FPi13/4HTpxLjU4uPzwdd8p2U6vDzqaKMOvh/5vNgV4v/qJ2JhTV6yMyVfAAAAAElFTkSuQmCC');
		btn.setAttribute('title','Restore this thread');
		btn.parentNode.parentNode.parentNode.setAttribute('visibility', 'hidden');
	}
	
	isMatch == true ? setGreen(button) : setRed(button);
	
	var addremove = function() {
		
		var hideMode = this.getAttribute('title') == 'Hide this thread' ? true : false;
		
		if (hideMode === true) {
			
			addHidden(this.getAttribute('threadID'));
			setGreen(this);
			
		} else{
			
			removeHidden(this.getAttribute('threadID'));
			setRed(this);
		};
	}
	
	button.addEventListener('click', addremove, false);
}