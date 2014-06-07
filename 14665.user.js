

# // ==UserScript==
#
# // @name Quick Adder
#
# // @description Makes the adding process faster
#
# // @author DSSR <http://www.orkut.com/Profile.aspx?uid=12361291985705999623>
# 
# // @include http://www.orkut.com/CommMembers.aspx?cmm=26779187&tab=0
# // @include http://www.orkut.com/FriendAdd.aspx?uid=*
# // @include http://www.orkut.com/FriendAdd.aspx?accept=true*
#
# // ==/UserScript==
#
# javascript:dssr=document.forms[1]; dssr.action='FriendAdd.aspx?Action.yes&'+location.href.match(/uid=\d*/gi); dssr.submit();void (0)