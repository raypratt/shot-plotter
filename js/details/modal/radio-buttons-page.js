import {
    changePage,
    getDetails,
    setDetails,
    createId,
} from "../details-functions.js";
import { createRadioButtons } from "../widgets/widgets-base.js";
import { createMainPage } from "./main-page.js";

function createRadioButtonsPage(id = "#radio-buttons-page") {
    d3.select(id)
        .selectAll("*")
        .remove();

    var mb = d3
        .select(id)
        .append("div")
        .attr("id", "radio-buttons-page-mb")
        .attr("class", "modal-body");

    // explanation text
    mb.append("h6").text("Create Radio Buttons Column");

    // example
    mb.append("div")
        .attr("id", "radio-buttons-page-example")
        .attr("class", "center example");
    let defaultOptions = [
        { value: "Option 1" },
        { value: "Option 2", checked: true },
    ];
    createRadioButtons("#radio-buttons-page-example", {
        id: "sample-radio-buttons",
        title: "Column Name",
        options: defaultOptions,
    });

    mb.append("div").text(
        "Choose the column name and create options for the text field. There must be 2-5 options. Also select which options should be selected by default."
    );
    mb.append("hr");
    // title
    var form = mb
        .append("form")
        .attr("class", "need-validation")
        .attr("novalidate", "true");
    var nameDiv = form
        .append("div")
        .attr("class", "form-group position-relative");
    nameDiv
        .append("label")
        .attr("for", "radio-buttons-title")
        .attr("class", "form-label")
        .text("Column Name");
    nameDiv
        .append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("id", "radio-buttons-title");
    nameDiv
        .append("div")
        .attr("class", "invalid-tooltip")
        .text("Column names must be 1-16 characters long.");
    // options
    var optionsDiv = form
        .append("div")
        .attr("class", "form-group position-relative")
        .attr("id", "options-div");
    optionsDiv
        .append("label")
        .attr("for", "radio-buttons-options")
        .attr("class", "form-label")
        .text("Options");
    optionsDiv.append("div").attr("id", "radio-buttons-options");

    for (let number of [1, 2]) {
        createOption(number);
    }
    createAddOptionButton();
    optionsDiv
        .append("div")
        .attr("class", "invalid-tooltip")
        .text("Options must be 1-32 characters long and unique.");
    // footer
    var footer = d3
        .select(id)
        .append("div")
        .attr("class", "footer-row");
    footer
        .append("button")
        .attr("type", "button")
        .attr("class", "grey-btn")
        .text("Back")
        .on("click", () => changePage(id, "#widget-type-page"));

    footer
        .append("button")
        .attr("type", "button")
        .attr("class", "grey-btn")
        .text("Create Radio Buttons")
        .on("click", function() {
            var invalid = false;

            var title = d3.select("#radio-buttons-title").property("value");
            if (title.length < 1 || title.length > 16) {
                d3.select("#radio-buttons-title").attr(
                    "class",
                    "form-control is-invalid"
                );
                invalid = true;
            } else {
                d3.select("#radio-buttons-title").attr("class", "form-control");
            }
            var options = [];
            var selected = d3
                .select(`input[name="radio-buttons-options"]:checked`)
                .property("value");
            d3.select("#radio-buttons-options")
                .selectAll(".new-option")
                .each(function() {
                    let option = {};
                    option.value = d3
                        .select(this)
                        .select("input[type='text']")
                        .property("value");
                    if (selected === d3.select(this).attr("id")) {
                        option.checked = true;
                    }
                    options.push(option);
                });

            let optionValues = options.map(x => x.value);
            if (
                optionValues.some(
                    value => value.length < 1 || value.length > 32
                ) ||
                !_.isEqual(optionValues, _.uniq(optionValues))
            ) {
                d3.select("#radio-buttons-options").attr(
                    "class",
                    "form-control is-invalid"
                );
                invalid = true;
            } else {
                d3.select("#radio-buttons-options").attr("class", "");
            }
            if (invalid) {
                return;
            }
            var id = createId(title);
            var details = [
                ...getDetails(),
                {
                    type: "radio",
                    title: title,
                    id: id,
                    options: options,
                },
            ];
            setDetails(details);
            createMainPage("#main-page");

            changePage("#radio-buttons-page", "#main-page");
        });
}

function createOption(number, optionsDiv) {
    var div = d3
        .select("#radio-buttons-options")
        .append("div")
        .attr("class", "form-check new-option")
        .attr("id", `radio-option-${number}`);

    div.append("input")
        .attr("class", "form-check-input")
        .attr("type", "radio")
        .attr("name", "radio-buttons-options")
        .attr("id", `new-radio-${number}`) // sanitize, make sure no duplicate values
        .attr("value", `radio-option-${number}`)
        .attr("checked", number === 1 ? true : null);
    div.append("input")
        .attr("type", "text")
        .attr("class", "form-control")
        .attr("value", `Option ${number}`);
    if (number > 2) {
        div.append("i")
            .attr("class", "bi bi-trash-fill")
            .on("click", () => {
                d3.select(`#radio-option-${number}`).remove();
                if (getNumOptions() === 4) {
                    createAddOptionButton();
                }
            });
    }
}

function createAddOptionButton(id = "#radio-buttons-page") {
    d3.select(id)
        .select("#options-div")
        .append("button")
        .text("Add Option")
        .attr("class", "grey-btn add-option-btn")
        .on("click", function(e) {
            e.preventDefault();
            let number = getNumOptions() + 1;
            createOption(number);
            if (number >= 5) {
                d3.select(this).remove();
            }
        });
}
function getNumOptions(id = "#radio-buttons-page") {
    return d3
        .select(id)
        .selectAll(".new-option")
        .size();
}

export { createRadioButtonsPage };