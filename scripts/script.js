"use strict";
let allData = [];

setData();
setupContentHandler();

function setData() {
    fetch("../data.json")
        .then(response => response.json())
        .then(data => {
            allData = data;
            loadContent("all"); // Load all data initially
        });
}

function setupContentHandler() {
    const selectBtn = document.querySelectorAll(".btn");

    selectBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            selectBtn.forEach(button => button.classList.remove("selected"));
            btn.classList.add("selected");

            if (btn.innerText === "All") {
                loadContent("all");
            } else if (btn.innerText === "Active") {
                loadContent("active");
            } else {
                loadContent("inactive");
            }
        });
    });
}

function loadContent(filterType) {
    const container = document.querySelector(".itemContainer");
    
    container.innerHTML = "";

    let filteredData = [];

    if (filterType === "all") {
        filteredData = allData;
    } else if (filterType === "active") {
        filteredData = allData.filter(e => e.isActive);
    } else if (filterType === "inactive") {
        filteredData = allData.filter(e => !e.isActive);
    }

    filteredData.forEach(elem => {
        const div = createItem(elem);
        container.appendChild(div);

        const checkbox = div.querySelector('input[type="checkbox"]');
        checkbox.checked = elem.isActive;

        checkbox.addEventListener('change', () => {

            if (filterType === "active") {
                loadContent("active");
            } else if (filterType === "inactive") {
                loadContent("inactive");
            }
        });
    });

    removeElem();
}

function createItem(elem) {
    const div = document.createElement("div");
    div.classList.add("item");

    div.innerHTML = `
        <div class="itemHeader">
            <img src="${elem.logo}" alt="${elem.name} logo">
            <div class="textParent">
                <p class="title">${elem.name}</p>
                <p class="description">${elem.description}</p>
            </div>
        </div>
        <div class="bar">
            <div class="removeBtn" id="remove${elem.name}">Remove</div>
            <label class="switch">
                <input type="checkbox" id="${elem.name}">
                <span class="slider"></span>
            </label>
        </div>`;

    return div;
}

function removeElem() {
    const removeBtns = document.querySelectorAll('.removeBtn'); // Changed variable name for clarity

    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.id.replace('remove', '');

            allData = allData.filter(item => item.name !== id);

            const selectedButton = document.querySelector(".btn.selected");

            if (selectedButton.innerText === "All") {
                loadContent("all");
            } else if (selectedButton.innerText === "Active") {
                loadContent("active");
            } else {
                loadContent("inactive");
            }
        });
    });
}