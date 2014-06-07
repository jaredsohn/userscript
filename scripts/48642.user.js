// ==UserScript==
// @name            4chan Auto-Meme
// @description     AUTO-MEME LOL ( http://meme.boxofjunk.ws/ )
// @author          W.T. Snacks
// @namespace 	    http://www.8chan.net/gm/
// @version         0.1
// @updated         2009-05-06 06:45 EST
// @include         http://*.4chan.org/*
// ==/UserScript==

addButton();
arr = [];
i = 1;

function addButton() {
	var commentTd, am;

	commentTd = document.evaluate("//td[@class='postblock']/b[text()='Comment']/..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!commentTd) return;
	addCss();

	am = document.createElement('div');
	am.id = 'automeme';
	am.title = 'AUTO-MEME';
	commentTd.appendChild(am);

	am.addEventListener('click', autoMemeGet, false);
}

function addCss() {
	var butan, loada, css, head, style;

	butan = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAjCAYAAACZ6FpfAAAAB3RJTUUH2QUGFDcoqvM0iQAAAAlwSFlzAAAewgAAHsIBbtB1PgAAAARnQU1BAACxjwv8YQUAAAaCSURBVHjahVZpcFNVFP7eS9JsbZOmKWla2iYQ9n1PxYKCLCpgwWpbaAsMqMwAVRh13GbUH4w%2F6jYu4%2BgwIGpBigqiomwBVJqWpYClVEppSWma7qQNadIs73rvK41VC57Mybvv3nO%2Be%2B653zkJh8FlLNU1KUmquWlJKhObcDh7btx09Zyiw51Uq%2FE%2FopZI8MmaLHPw%2FA%2BLSLA2mwh1OaKyMZtbnWUKMhtmO9CRGzCOTYiXHy5%2BL906f7YBHMcNuhMhBMdOtyBvi72sraN3EZ3qZvN8P6BKwX%2B%2B6x2rVa%2BTIxgi%2FwHo8YdQcbkTXZ' +
			'4gFtyfiAOfZliZT38w%2FUBLcpaZMn%2B7Mg7Hqx%2BCdflR3OoORECqa7vx1q54tEqfw%2FTM0zSiZqRP1ePFDWMzmW%2FEMC5WduylTbOI3%2B8nJSUlRK%2FXk6JXZ0by8%2FqLy0goFCJut5skJSWRjPSRYs46L64gzLc%2Fopi5s4bcr9UNhVwuR1ZWFlwuF0KcIbKRMnYUJDTDGo0GDocDK%2FOfxW1vENrYKMyxJsymJtFS%2BpU22hIrT9a1oejN3Ihzir4rcjG8r%2Fwfa%2B5OF6IXJIrjMcM1iu%2FRZGJACoVcgpVLjQiHhQHpTUQo3Jf059YY2X1FVnguETzfd6tRURL2kDMgV2NzD2nr7OVWbz4DZX10hBV3YQDUo8PYtWMateLQRH3pVDMDarKfb7%2Bhj5ObF8w1wFOvhYKX3pO1Z2sbQAQWI4H9Qkc9w2DJJlXXur86YW%2FBE0tTUCU0%2F5' +
			'uB4NgxBoSnTOh7tVGfqpqur5iV5M7apcqr7oJNBSNiHL1duPUHDyUvg0Qqxfy1K%2FHoxnWY%2FvB8ke32qvN4cKMaFlM0cgpLXS1t%2FtXU39dPyM6LV9z5%2BVvsvZvWW%2BCd3Q5X0EOJ%2BSgmL5gLuUoJGdU6lQ%2BWdQKWL05G%2Fla7%2F9IVdx7z%2FXetMVlknRxf%2FP7rU%2BOv1d1GXY0eqqhUBAUvgtw1PLJQLeZm8xvn2ssvdjKQw4MVbeTe6QlepSRdNS%2FdoDWnqkWb%2BgYvsZU2u0%2BdaSumadvGbmqg010uWBQF1UmMsHfeHSyXVP2DGd8NaBTVbKmUu0%2BniRoqJrEr0EjLrZQO91K9%2Bn9ABgmHd5c8lJy9LnuYZPb0BGhjZOKCm7aP0%2BfasH1vXfinY869lPRb6XTLYEATUpNUh3YWzRr6gHXIPRvbybJWrH2%2BvLHB1fMwnb' +
			'o8ECjFPFRdbtszz5iWrMbdRGDkZNykH4fTi3m5Nld9o3cmXWrsqzgZ9%2FUbWydMOVLqx%2BU%2F2zFjojZSlEyqa7vwyT4e566PRtHHxzE8NQpjR2hgnaKP%2BeK7%2BjGCgGJml5G7LE3YUriG%2BHw%2BYjabybbnJ0aaWseFFeS1lzeRcDhMampqCD0y0esUpPlsJglfzyY0l6xlZDBmF4wfqeEef3K92LyktCz2HuoQj8HkR5sTBWsLaYQ8LBYLKioq8GXxfhw64RLzuGGVhYVeIDUkKOYMS42GTqeDTCZDZWUl9pWUoNH1DWjyESWToKysDDabDe5brSK4tyeANHXfRpPHxMGgV2RIU4yqtPSp8fjgw0KoNGZaV4lwNDRhfHxABMpcmEyb%2FXYsnhEPyqk7QCG6aR9PJZQvKUalSUqffGqSGm%2B%2FQOuIdKM34Kb9OET7caxoGCXjMdIcg68POtBw0wcS' +
			'pk1eK8WGvOFgnZUJz3G8tKnV7xQEYtqxrw4nbe1goGoNLxLjdqcA55UAfNelGCbTQSuJE6%2FeI%2FRif3wjnsmzgPqiqc3nlNI2a792w2PKyzTh23c7MKHSCOFOf9ZSJy1LpfKffIrl5Wht6RLHNfUeOJt9pTy9nN07SurEMEc%2BKEMvCbFQRY3QlfzNaibdNKJEo1wc79xXx6b3MFM%2BRi2xn%2F9h8UxapNiYVU1JYY6USHScFhk5y2GeNA4dTc346aPtONxVgZ0HJ6LTHcC0pb%2Bcue0NpzMeCR5veH1O4WkP%2B8HLf2UIKgJN4u5aQwLytr2CcXPS6Y3GwjDchBtpHDZvS4GEMj%2BX%2BlCQ9Qyjv2e3ulr9547%2B7srcvHqU3DiFx4FyBybMmY8kswnONhcOnPoZu08UYe0zHNgfjcee%2FtVTcdm9gvqWDdZGxkWrJdufzrXMyl9u4jpo6I5GL9Qq' +
			'KaaOj0MgKIDmk3y2p7aMRvIUta%2B6V2Njx11IF1YmG5X3JRuUKWzS2eK76XT5Smm6d9PXI%2Bw4A53%2BAsFCpYN4xYo7AAAAAElFTkSuQmCC';
	loada = 'data:image/gif;base64,R0lGODlhEAAQAPIAANm%2FtwAAAKWRizgxLwAAAFNJRm9hXXxtaSH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa%2BdIAAAh%2BQQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZf' +
			'hYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo%2FIpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo%2FIpFKSAAAh%2BQQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh%2BQQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc%2FjDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA%3D%3D';

	css = '#automeme { margin: 0 auto -18px auto; width: 18px; height: 18px; background: transparent url(' + butan + ') no-repeat center 1px; cursor: pointer; }' +
			'#automeme:hover { background-position: center -17px; }' +
			'#automeme:active { background-position: center 1px; opacity: 0.5; }' +
			'#automeme.loading { background-image: url(' + loada + '); }' +
			'#automeme.loading:hover { background-position: center 1px; }';

	head = document.getElementsByTagName('head')[0];
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

function autoMemeGet() {
	if (i < 20 && arr.length > 0) {
		document.getElementsByTagName('textarea')[0].value = arr[i];
		i += 1;
	} else {
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://meme.boxofjunk.ws/moar.txt.json?lines=20',
			onreadystatechange: function(re) {
				var am = document.getElementById('automeme');
				if (re.readyState < 4) {
					am.className = 'loading';
				} else {
					am.className = '';
					if (re.status != '200') return;
		
					arr = eval(re.responseText);
					document.getElementsByTagName('textarea')[0].value = arr[0];
				}
		    }
		});
	}
}