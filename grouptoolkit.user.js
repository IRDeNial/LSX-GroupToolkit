// ==UserScript==
// @name Group Leader Toolkit
// @description Various tools useful for group leaders to help manage their groups
//
// @author IRDeNial <http://github.com/IRDeNial>
// @namespace http://github.com/IRDeNial/
// @downloadURL https://raw.githubusercontent.com/IRDeNial/LSX-GroupToolkit/master/grouptoolkit.user.js
//
// @license GPLv3 - http://www.gnu.org/licenses/gpl-3.0.txt
// @copyright Copyright (C) 2014, by Mike <http://github.com/IRDeNial>
//
// @include *://*.leak.sx/managegroup.php?gid=
//
// @version 1.0
// @updateURL https://raw.githubusercontent.com/IRDeNial/LSX-GroupToolkit/master/grouptoolkit.user.js
//
// @run-at document-start|document-end
// @unwrap
// ==/UserScript==
 
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
        var userGroups = [
            41, // Reality
            61, // Alpha
            27, // Anime
            68, // Diamond
            46, // Ice
            18, // Judgement
            53, // Kingdom
            45, // Knight
            51, // Primus
            32, // Writers
            43, // Impulse
            37, // Maid Cafe
        ];

        if(document.location.toString().indexOf('/managegroup.php') != -1) {
            var gid = document.location.toString().split('/managegroup.php?gid=')[1];

            if(userGroups.indexOf(gid)) {
                var manageMembersForm = jQ('form')[0];
                var addMembersForm = jQ('form')[1];

                jQ(' \
                    <br /> \
                    <table id="toolList" style="border:1px black;width:100%;margin-right:10px;border-collapse:collapse;text-align:center;" border="1"> \
                        <tbody> \
                            <tr style="background-color:grey;color:white;"> \
                                <th class="thead" style="padding:3px;">Tool Link</th> \
                                <th class="thead" style="padding:3px;">Description</th> \
                            </tr> \
                            <tr> \
                                <td style="padding:3px;"> \
                                    <a href="#listMembers" id="listMembersLink">List Members</a> \
                                </td> \
                                <td> \
                                    List members of this user group by their UID tags. \
                                </td> \
                            </tr> \
                            <tr> \
                                <td style="padding:3px;"> \
                                    <a href="#addMembers" id="addMembersLink">Add Members</a> \
                                </td> \
                                <td> \
                                    Add members to this user group. \
                                </td> \
                            </tr> \
                            <tr> \
                                <td style="padding:3px;"> \
                                    <a href="#removeMembers" id="removeMembersLink">Remove Members</a> \
                                </td> \
                                <td> \
                                    Select members to remove this user group. \
                                </td> \
                            </tr> \
                        </tbody> \
                    </table> \
                    <br /> \
                ').insertAfter('p:contains("Group Leaders:")');
        
                jQ(' \
                    <table id="listMembersTable" class="tborder" border="0" cellpadding="10" cellspacing="0"> \
                        <tbody> \
                            <tr> \
                                <td class="thead" colspan="6"> \
                                  <strong>Members in "Reality"</strong> \
                                </td> \
                            </tr> \
                            <tr> \
                                <td> \
                                    <textarea id="userListDiv" readonly="readonly" style="resize:none;width:100%;height:300px;"></textarea> \
                                </td> \
                            </tr> \
                        </tbody> \
                    </table> \
                ').insertAfter('#toolList');

                for(var i = 3;i < jQ('form:first tr').length + 1; ++i) {
                    jQ('#userListDiv').append("[@" + jQ('form:first tr:nth-child(' + i + ') a').prop('href').toString().split('user-')[1] + "]\r\n");
                }

                addMembersForm.hide();
                jQ('#listMembersTable').hide();
                manageMembersForm.hide();

                jQ('#removeMembersLink').click(function(){
                    addMembersForm.hide();
                    jQ('#listMembersTable').hide();
                    manageMembersForm.show();
                });

                jQ('#listMembersLink').click(function(){
                    addMembersForm.hide();
                    jQ('#listMembersTable').show();
                    manageMembersForm.hide();
                });

                jQ('#addMembersLink').click(function(){
                    addMembersForm.show();
                    jQ('#listMembersTable').hide();
                    manageMembersForm.hide();
                });
            }
        }
    }

    addJQuery(main,0);
})();