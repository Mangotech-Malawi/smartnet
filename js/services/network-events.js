import { apiClient } from "./api-client.js";

export function fetchNetworkEvents(...args) {
    let data = apiClient(
        "/api/v1/network_events",
        "GET",
        "json",
        false,
        false,
        {}
    )

    if (args[0] === "load-none")
        return data
    else
        populateNetworkEventsTable(data);
}


function populateNetworkEventsTable(dataSet) {
    $("#networkEventsTable").DataTable({
        destroy: true,
        responsive: true,
        searching: true,
        ordering: true,
        lengthChange: true,
        autoWidth: false,
        info: true,
        data: dataSet,
        columns: [
            { data: "network_event_id" },
            { data: "device_name" },
            { data: "event_name" },
            { data: "severity" },
            { data: "protocol" },
            { data: "source_ip" },
            { data: "dest_ip" },
            { data: "port" },
            { data: "created_at" },
            { data: null }
        ],
        columnDefs: [

            {
                render: getFlagIntrusionBtn,
                data: null,
                targets: [9],
            }
        ],
    });
}

function getFlagIntrusionBtn(data, type, row, metas) {
    let dataFields = `data-intrusion-network-event-id = "${data.network_event_id}"
    data-action-type = "add"`;

    return getButton(dataFields, "intrusion", "warning", "fas fa-exclamation-triangle");
}

function getButton(dataFields, modal, color, icon) {
    return `<button type='button' class="btn btn-block btn-${color}" data-toggle="modal" 
              data-target="#modal-${modal}" ${dataFields} ><i class="${icon}" aria-hidden="true"></i></button>`;
}
