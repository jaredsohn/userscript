// ==UserScript==
// @name           chuck schwab reconcile
// @namespace      dogself.com
// @description    add a chuck schwab reconcile button to checking transactions
// @include        https://client.schwab.com/Accounts/History/BankHistory.aspx
// ==/UserScript==

$ = unsafeWindow.$;

var cS = "data:image/gif;base64,R0lGODlhFQAQAMQAAIiIiOPj45ubm/v7+5WVlfj4+I6OjsnJya+vr6ioqNbW1ry8vKKiotzc3Pz8/IKCgnBwcKqqqv///+np6dfX1wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABQALAAAAAAVABAAQAV3ICVGZGmeYhoN03QYQTsFSNM+UEpFjkwDwETsllNJZMjkBKfjKZ9MVc8FkzUUsujo2GokgACGjdgsPM7odLo4crgdg0J8IHHUzbrd9InU6lsBBAI2DQICWWx/EwsEfEuJEVwTgoQCjWRGjn2Qkpp+FBChoqOkKSEAOw==";
var clear = "<img src='"+cS+"' ";

var rS = "data:image/gif;base64,R0lGODlhFQAQALMMAM3Nzff396Ojo6urq729vcTExOTk5M/Pz7W1tWBgYP///5ubm9fX1wAAAAAAAAAAACH5BAEAAAwALAAAAAAVABAAQARbkLFEq71E6rQ6UgihFF2paBLnKawSDOVyompsm+h073JefwAEYBSbbUofxEIQMBRzopZ0yvLxbsZUSYDoIgS2rG6lHCgATxqyFUCnj+TFQQHDqa9vLd6e6/tREQA7";
var rec = "<img src='"+rS+"' ";

function set(name,value) {
		window.setTimeout(function() {
				GM_setValue(name, value);
		});        
}

function del(name) {
		window.setTimeout(function() {
				GM_deleteValue(name);
		});        
}

function get(name, cb) {
	window.setTimeout(function() {
				var val = GM_getValue(name);
				cb(val);
	});
}

var d = $(".tblAltWhtGrayRow tr > td:nth-child(1)"); //date col
var w = $(".tblAltWhtGrayRow tr > td:nth-child(5n)"); //Withdrawal col
var b = $(".tblAltWhtGrayRow tr > td:nth-child(7n)"); //balance col

w.each(function(i){
	var hash = $(this).text() + $(b.get(i)).text() + $(d.get(i)).text();
	var td = $(this);
	get(hash, function(val){
		if(val == undefined){
			val = false;
		}
		var type = val ? rec : clear;
		var r = ("<td>"+type+" id='rec"+i+"' style='cursor:pointer' name='"+hash+"|"+val+"'</img></td>");
		td.after(r);
		$("#rec"+i).click(reconcile);
	});
});

function reconcile(){
	var data = $(this).attr("name").split("|");
	var hash = data[0];
	var val = data[1];
	var $this = $(this);
	if(val == "true"){
		del(hash);
		$this.attr("name", hash+"|false");
		$this.attr("src", cS);
	} else {
		set(hash, "true");
		$this.attr("name", hash+"|true");
		$this.attr("src", rS);
	}
	
}

