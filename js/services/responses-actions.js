import { apiClient } from "./api-client.js";

export function fetchResponses(...args) {
    let data = apiClient(
        "/api/v1/responses",
        "GET",
        "json",
        false,
        false,
        {}
    )

    if (args[0] === "load-none")
        return data
    else
        populateResponsesTable(data);
}

export function addResponse(params) {
    return apiClient(
        "/api/v1/response/new",
        "POST",
        "json",
        false,
        false,
        params
    )
}

export function editResponse(params) {
    return apiClient(
        "/api/v1/response/edit",
        "POST",
        "json",
        false,
        false,
        params
    )
}



function populateResponsesTable(dataSet) {
    $("#responsesTable").DataTable({
        destroy: true,
        responsive: true,
        searching: true,
        ordering: true,
        lengthChange: true,
        autoWidth: false,
        info: true,
        data: dataSet,
        columns: [
            { data: "id" },
            { data: "device_name" },
            { data: "event_name" },
            { data: "action_type" },
            { data: "response_description" },
            { data: null }
        ],
        columnDefs: [
            {
                render: getEditResponseBtn,
                data: null,
                targets: [5],
            }
        ],
    });
}

function getEditResponseBtn(data, type, row, metas) {
    let dataFields = `data-response-id = "${data.id}"
                      data-action-type = "edit"`;

    return getButton(dataFields, "response", "success ", "fas fa-edit");
}


function getButton(dataFields, modal, color, icon) {
    return `<button type='button' class="btn btn-block btn-${color}" data-toggle="modal" 
              data-target="#modal-${modal}" ${dataFields} ><i class="${icon}" aria-hidden="true"></i></button>`;
}
