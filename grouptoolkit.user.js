// ==UserScript==
// @name Leak Group Leader Toolkit
// @description Various tools useful for group leaders to help manage their groups
//
// @author IRDeNial <http://github.com/IRDeNial>
// @namespace http://github.com/IRDeNial/
// @downloadURL https://raw.githubusercontent.com/IRDeNial/LSX-GroupToolkit/master/grouptoolkit.user.js
//
// @license GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright Copyright (C) 2014, by Mike <http://github.com/IRDeNial>
//
// @include *://leak.sx/managegroup.php?gid=*
// @include *://leakforums.org/managegroup.php?gid=*
// @include *://www.leak.sx/managegroup.php?gid=*
// @include *://www.leakforums.org/managegroup.php?gid=*
//
// @version 1.2.3b
// @updateURL https://raw.githubusercontent.com/IRDeNial/LSX-GroupToolkit/master/grouptoolkit.user.js
//
// @grant metadata
//
// ==/UserScript==
 
/*
    Changelog
        v1.0.0 - 8/1/2014
            Initial Version
        v1.0.1 - 8/1/2014
            Added changelog
        v1.1.0 - 8/2/2014
            Added "Leaders" list
            Added Split view for UID list and Username list.
        v1.1.1 - 8/2/2014
            Hid default leaders list.
        v1.2 - 8/7/2014
            Added "Misc. Information" tool.
        v1.2.1 - 8/7/2014
            Removed "Misc. Information" tool.
            Fixed what I broke... :(
        v1.2.2 - 8/8/2014
            Fixed: https://github.com/IRDeNial/LSX-GroupToolkit/issues/1
        v1.2.3 - 8/16/2014
            Moved repositories
        v1.2.3a - 8/27/2014
            Moved back to original repo.  Fuck that -.-
        v1.2.3b - 9/9/2014
            Updated to include new domain.  No major changes.
*/

/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

(function(){
    function addJQuery(callback,parameters) {
        var script = document.createElement("script");
        script.setAttribute("src", "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js");
        script.addEventListener('load', function() {
            var script = document.createElement("script");
            script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")(" + parameters.toString() + ");";
            document.body.appendChild(script);
        }, false);
        document.body.appendChild(script);
    }

    function main(parameters) {
        var userGroups = {
            41: "Reality",
            61: "Alpha",
            27: "Anime",
            68: "Diamond",
            46: "Ice",
            18: "Judgement",
            53: "Kingdom",
            45: "Knight",
            51: "Primus",
            32: "Writers",
            43: "Impulse",
            37: "Communism"
        };

        if(document.location.toString().indexOf('/managegroup.php') != -1) {
            var gid = document.location.toString().split('/managegroup.php?gid=')[1];
            jQ('p:contains("Group Leaders:") a').parent().hide();

            if(userGroups.hasOwnProperty(gid)) {
                // User List
                jQ(' ' +
                    '<table id="listMembersTable" class="tborder" border="0" cellpadding="10" cellspacing="0">' + 
                    '    <tbody>' + 
                    '        <tr>' + 
                    '            <td class="thead" colspan="6">' + 
                    '              <strong>Members in ' + userGroups[gid] +'</strong>' + 
                    '            </td>' + 
                    '        </tr>' + 
                    '        <tr>' + 
                    '            <td colspan="2">Current Members: <span id="curMemberCount">0</span></td>' + 
                    '        </tr>' + 
                    '        <tr>' + 
                    '            <td>UID List</td>' + 
                    '            <td>Username list</td>' + 
                    '        <tr>' + 
                    '            <td>' + 
                    '                <textarea id="userListUIDDiv" readonly="readonly" style="resize:none;width:100%;height:300px;"></textarea>' + 
                    '            </td>' + 
                    '            <td>' + 
                    '                <textarea id="userListUNDiv" readonly="readonly" style="resize:none;width:100%;height:300px;"></textarea>' + 
                    '            </td>' + 
                    '        </tr>' + 
                    '    </tbody>' + 
                    '</table>' + 
                '').insertAfter('p:contains("Group Leaders:")');

                // Leader List
                jQ(' ' + 
                    '<table id="listLeadersTable" class="tborder" border="0" cellpadding="10" cellspacing="0">' + 
                    '    <tbody>' + 
                    '        <tr>' + 
                    '            <td class="thead" colspan="6">' +
                    '              <strong>Leaders of ' + userGroups[gid] +'</strong>' + 
                    '            </td>' + 
                    '        </tr>' + 
                    '        <tr>' + 
                    '            <td>UID List</td>' + 
                    '            <td>Username list</td>' + 
                    '        <tr>' + 
                    '            <td>' + 
                    '                <textarea id="leaderUIDDiv" readonly="readonly" style="resize:none;width:100%;height:300px;"></textarea>' + 
                    '            </td>' + 
                    '            <td>' + 
                    '                <textarea id="leaderUNDiv" readonly="readonly" style="resize:none;width:100%;height:300px;"></textarea>' + 
                    '            </td>' + 
                    '        </tr>' + 
                    '    </tbody>' + 
                    '</table>' + 
                '').insertAfter('p:contains("Group Leaders:")');

                // Tool List
                jQ(' ' +
                    ' <br />' +
                    ' <table id="toolList" style="border:1px black;width:100%;margin-right:10px;border-collapse:collapse;text-align:center;" border="1">' + 
                    '     <tbody>' + 
                    '        <tr style="background-color:grey;color:white;">' +
                    '            <th class="thead" style="padding:3px;">Tool Link</th>' +
                    '            <th class="thead" style="padding:3px;">Description</th>' +
                    '        </tr>' + 
                    '        <tr>' + 
                    '            <td style="padding:3px;">' + 
                    '                <a id="listMembersLink" class="toolLink">List Members</a>' + 
                    '            </td>' + 
                    '            <td>' + 
                    '                List members of this user group by their UID tags.' + 
                    '            </td>' + 
                    '        </tr>' + 
                    '        <tr>' + 
                    '            <td style="padding:3px;">' + 
                    '                <a id="listLeadersLink" class="toolLink">List Leaders</a>' + 
                    '            </td>' + 
                    '            <td>' + 
                    '                List leaders of this user group by their UID tags.' + 
                    '            </td>' + 
                    '        </tr>' + 
                    '        <tr>' + 
                    '            <td style="padding:3px;">' + 
                    '                <a id="addMembersLink" class="toolLink">Add Members</a>' + 
                    '            </td>' + 
                    '            <td>' +
                    '                Add members to this user group.' + 
                    '           </td>' +
                    '        </tr>' +
                    '        <tr>' + 
                    '            <td style="padding:3px;">' + 
                    '                <a id="removeMembersLink" class="toolLink">Remove Members</a>' + 
                    '            </td>' + 
                    '            <td>' + 
                    '                Select members to remove this user group.' + 
                    '            </td>' + 
                    '        </tr>' + 
                    '    </tbody>' +
                    '</table>' +
                    '<br />' +
                '').insertAfter('p:contains("Group Leaders:")');

                var removeMembersForm = jQ('form:eq(0)');
                var addMembersForm = jQ('form:eq(1)');
                var listLeadersTable = jQ('#listLeadersTable');
                var listMembersTable = jQ('#listMembersTable');

                jQ('p:contains("Group Leaders:") a').each(function(i){
                    jQ('#leaderUIDDiv').append("[@" + jQ('p:contains("Group Leaders:") a:eq('+i+')').prop('href').toString().split('user-')[1] + "]\r\n");
                    jQ('#leaderUNDiv').append(jQ('p:contains("Group Leaders:") a:eq('+i+') span').text() + "\r\n");
                });

                jQ('form:first tr').each(function(i) {
                    if(i < 2) return;
                    jQ('#userListUIDDiv').append("[@" + jQ('form:first tr:eq('+i+') a').prop('href').toString().split('user-')[1] + "]\r\n");
                    jQ('#userListUNDiv').append(jQ('form:first tr:eq('+i+') a span').text() + "\r\n");
                    jQ('#curMemberCount').text(parseInt(jQ('#curMemberCount').text()) + 1);
                });

                removeMembersForm.hide();
                listMembersTable.hide();
                addMembersForm.hide();
                listLeadersTable.hide();

                jQ('#removeMembersLink').click(function(){
                    addMembersForm.hide();
                    listMembersTable.hide();
                    removeMembersForm.show();
                    listLeadersTable.hide();
                });

                jQ('#listMembersLink').click(function(){
                    addMembersForm.hide();
                    listMembersTable.show();
                    removeMembersForm.hide();
                    listLeadersTable.hide();
                });


                jQ('#addMembersLink').click(function(){
                    addMembersForm.show();
                    listMembersTable.hide();
                    removeMembersForm.hide();
                    listLeadersTable.hide();
                });

                jQ('#listLeadersLink').click(function(){
                    addMembersForm.hide();
                    listMembersTable.hide();
                    removeMembersForm.hide();
                    listLeadersTable.show();
                });
            }
        }
    }

    addJQuery(main,0);
})();
