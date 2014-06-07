// ==UserScript==
// @name           toCustomerpanel
// @namespace      worldstream.nl
// @description    show link to customerpanel
// @include        http://rt.worldstream.nl/Ticket/Display.html?id=*
// @require             http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js

// ==/UserScript==

fromNode = $(".message-header-key:contains('From:'):eq(0)")[0]
valueNode = fromNode.nextSibling.nextSibling;
value = valueNode.innerHTML;
//make pattern for usual case which is: "name name2 <email@domain.com>" 
var emailPatt= /(.*) &lt;(.*)&gt;/
var customer;
var email;
var userid="asd"
var fullLink
//if the pattern does  look like the usual case do things accordingly
if(emailPatt.test(value))
{
	customer = emailPatt.exec(value)[1];
	email = emailPatt.exec(value)[2];
	//make a convenient string which will sent to filled search page in CP.
	fullLink = customer +" <a href=\"https://www.customerpanel.nl/index.php?page=admin_user_search&do_search=true&ud_searchall="+email+"&submitbuttonsearch=\" target=\"_blank\">&lt;"+ email +"&gt;</a>"
}
else
{
	//if not then 
	email=value;
	fullLink="<a href=\"https://www.customerpanel.nl/index.php?page=admin_user_search&do_search=true&ud_searchall="+email+"&submitbuttonsearch=\" target=\"_blank\">&lt;"+ email +"&gt;</a>"
}



//retrieve how many server this aapje has
url = 'https://www.customerpanel.nl/index.php?page=admin_user_search&do_search=true&ud_searchall='+email+'&submitbuttonsearch=';
url2 = "http://localhost"
GM_xmlhttpRequest({
	method: 'GET',
	url: url,
	onload: function(response){
		userid = $(response.responseText).find("#content table:eq(1) tr:eq(2) a:first")[0].innerHTML;
		link= "<a href=\"https://www.customerpanel.nl/index.php?lang=nl&page=admin_edit_user&userid="+ userid +"\">"+ userid+"</a>"
		addRowToCustomerBox("user id",link );
		fillInNumberOfServers();
	}
})

function fillInNumberOfServers()
{
	url="https://www.customerpanel.nl/index.php?lang=nl&page=admin_edit_user&userid="+ userid

	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(response){
			numberOfServers =$(response.responseText).find("#content table:eq(5) tr:gt(1)").length;
			addRowToCustomerBox("number of servers",numberOfServers );
		}
	})
}

//make new title box after! the "more over [person] box"
$("<div class=\"ticket-info-customerpanel\">\n\
	<div class=\"titlebox\">\n\
		<div class=\"titlebox-title\">\n\
			<span class=\"left\">\n\
				Customerpanel\n\
			</span>\n\
		</div>\n\
		<div class=\"titlebox-content\">\n\
			<table id=\"customer-table\">\n\
				<tr>\n\
					<td class=\"label\">\n\
						zoek in customerpanel:\n\
					</td>\n\
					<td class=\"value\">\n\
						"+ fullLink+"\n\
					</td>\n\
				</tr>\n\
			</table>\n\
		</div>\n\
	</div>\n\
</div>\n\
").insertAfter(".ticket-info-requestor:first")



function addRowToCustomerBox(key, value)
{
	$("#customer-table").append("<tr>\n\
					<td class=\"labeltop\">\n\
						"+ key +":\n\
					</td>\n\
					<td class=\"value\">\n\
						"+value+"\n\
					</td>\n\
				</tr>\n\
	");
}


