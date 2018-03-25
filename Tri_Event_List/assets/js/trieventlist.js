"use strict";
/* Tri Event List Project JS */
let ul = $("ul");
let delBtns = $(".del-event-btn");
let lis = $("li");
let txtBx = $("#event-lstbox-txtbox");
let openLI = '<li><span class="del-event-btn"><i class="fas fa-trash-alt"></i></span> ';
let closeLIBeg = '<img class="event-icon" id="';
let closeLIEnd = 'Icon"></li>';
let addBtn = $(".add-event-btn");
/* @Incomplete - Needs refactoring!!!  Too much stuff happening
  in the event listeners
  ***Update - Refactored a bit.  Still more to come.
*/
//Gets the build string for ul's <li> tag
function BuildLI(ele, oLI, cLIBeg, cLIEnd) {
    let txtInput;
    let icon;
    txtInput = ele.val().toString();
    ele.val("");
    icon = GetIconName(txtInput);
    return oLI + txtInput + cLIBeg + icon + cLIEnd;
}
//Gets the icon name for the <img class="event-icon"> tag
function GetIconName(input) {
    let iconName;
    input = input.toLowerCase();
    if (input.includes("swim")) {
        iconName = "swim";
    }
    else if (input.includes("run") || input.includes("jog")) {
        iconName = "run";
    }
    else if (input.includes("bike") || input.includes("cycle")) {
        iconName = "bike";
    }
    else {
        iconName = "finish";
    }
    return iconName;
}
//Delete specific exercises when the <span> is clicked
//Adds eventListener to current and future <span> tags
ul.on("click", ".del-event-btn", function (event) {
    $(this).parent().fadeOut(500, function () {
        $(this).remove();
    });
    event.stopPropagation();
});
//Add new <li> tags
txtBx.on("keypress", function (event) {
    if (event.which === 13) {
        ul.append(BuildLI($(this), openLI, closeLIBeg, closeLIEnd));
    }
});
addBtn.on("click", function () {
    txtBx.fadeToggle();
});
