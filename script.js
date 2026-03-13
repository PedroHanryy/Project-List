const form = document.getElementById("add-form");
const input = document.getElementById("item-name");
const list = document.getElementById("shopping-list");
const alertFooter = document.getElementById("alert-footer");
const closeAlert = document.getElementById("close-alert");

input.addEventListener("input", function() {
    const hasNumbersRegex = /\d+/g;
    input.value = input.value.replace(hasNumbersRegex, "");
});

form.onsubmit = function(event) {
    event.preventDefault();

    try {
        const value = input.value.trim();

        if (value !== "") {
            createItem(value);
            input.value = "";
            input.focus();
        }
    } catch (error) {
        console.log("Erro ao processar:", error);
    }
};

function createItem(text) {
    const li = document.createElement("li");
    li.className = "item-card";

    const infoDiv = document.createElement("div");
    infoDiv.className = "item-info";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox-custom";

    const span = document.createElement("span");
    span.className = "text-item";
    span.textContent = text;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-remove";

    // MUDANÇA: Usando span em vez de i
    const icon = document.createElement("span");
    icon.className = "far fa-trash-alt";

    removeBtn.appendChild(icon);
    infoDiv.appendChild(checkbox);
    infoDiv.appendChild(span);
    li.appendChild(infoDiv);
    li.appendChild(removeBtn);

    setupItemEvents(li, checkbox, span, removeBtn);
    list.appendChild(li);
}

function setupItemEvents(li, checkbox, span, removeBtn) {
    checkbox.onchange = function() {
        if (checkbox.checked) {
            span.classList.add("completed");
        } else {
            span.classList.remove("completed");
        }
    };

    removeBtn.onclick = function() {
        li.remove();
        showAlert();
    };
}

function showAlert() {
    alertFooter.classList.remove("hidden");
    setTimeout(function() {
        alertFooter.classList.add("hidden");
    }, 3000);
}

closeAlert.onclick = function() {
    alertFooter.classList.add("hidden");
};

function initExistingItems() {
    const existingItems = document.querySelectorAll(".item-card");
    existingItems.forEach(function(li) {
        const checkbox = li.querySelector(".checkbox-custom");
        const span = li.querySelector(".text-item");
        const removeBtn = li.querySelector(".btn-remove");
        setupItemEvents(li, checkbox, span, removeBtn);
    });
}

initExistingItems();