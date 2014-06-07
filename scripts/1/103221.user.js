// ==UserScript==
// @name           TW Forum Tracking
// @namespace      http://userscripts.org/scripts/show/94141
// @description    Add button to highest visited page number for each topic in The West in-game Town forum
// @include        http://*.the-west.*/forum.php*
// @history         1.001 Small Fixing to exclude user list from processing
// @history         1.000 Initial release
// ==/UserScript==

<td>
		<img src="graphic/command/attack.png?1" alt="" />

		<span id="label[66139]"><a href="/game.php?village=989&amp;screen=info_command&amp;id=66139&amp;type=own">
			<span id="labelText[66139]">???? ??? abrfd2022 ???? (513|470) K45</span></a>
			<a class="small" href="javascript:editToggle('label[66139]', 'edit[66139]')"><img src="graphic/rename.png?1" alt="????? ?????" title="????? ?????" /></a>		</span>
		<span id="edit[66139]" style="display:none">
			<input id="editInput[66139]" size="55" value="???? ??? abrfd2022 ???? (513|470) K45" onkeydown="if (event.keyCode == 13) $(this).next().click();"/>
			<input type="button" value="?????" onclick="editSubmit('label[66139]', 'labelText[66139]', 'edit[66139]', 'editInput[66139]', '/game.php?village=989&amp;screen=info_command&amp;ajaxaction=edit_own_comment&amp;h=ca54&amp;id=66139')"/>
		</span>
	</td>
							<td>????? ?? <b>16:06:57</b> :<span class="grey large">195</span> </td>
				<td><span class="timer">0:07:12</span></td>
			<td><a href="/game.php?village=989&amp;screen=place&amp;action=cancel&amp;h=029e&amp;id=66139">?????</a></td>