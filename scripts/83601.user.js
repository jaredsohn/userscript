// ==UserScript==
// @name           phpBB mod tools
// @description    Mod tools
// ==/UserScript==


// Beheerders/Moderators BBCode only
    // Je kunt zelf de rechten nog veranderen door bijvoorbeeld door "m_" te vervangen met "m_edit".  (Enkel moderators die berichten mogen wijzigen.)
    if ($auth->acl_get('a_') || $auth->acl_get('m_', $forum_id))
    {
        $message_parser->message = preg_replace("/\[mod=(.*?)\](.*?)\[\/mod\]/s", "", $message_parser->message);
    } 