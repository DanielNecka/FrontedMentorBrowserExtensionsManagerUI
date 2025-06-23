"use strict";
let allData = [];
let theme = "light";

setData();
setupContentHandler();
setTheme();

function setTheme() {
    const btn = document.querySelector(".themeBtn");

    btn.addEventListener('click', () => {
        const bg = document.querySelector("body");
        const headerBox = document.querySelector(".headerBox");
        const logo = document.querySelector(".logo");
        const themeBtn = document.querySelector(".themeBtn");
        const asideText = document.querySelector(".asideText");
        const btns = document.querySelectorAll(".btn");
        const items = document.querySelectorAll(".item");
        const description = document.querySelectorAll(".item.description");
        const removeBtn = document.querySelectorAll(".item.removeBtn");

        if (theme === "light") {
            theme = "dark";

            bg.classList.add("dark");
            headerBox.classList.add("dark");
            logo.classList.add("dark");
            themeBtn.classList.add("dark");
            asideText.classList.add("dark");

            btns.forEach(elem => elem.classList.add("dark"));
            items.forEach(elem => elem.classList.add("dark"));
            description.forEach(elem => elem.classList.add("dark"));
            removeBtn.forEach(elem => elem.classList.add("dark"));
        } else {
            theme = "light";

            bg.classList.remove("dark");
            headerBox.classList.remove("dark");
            logo.classList.remove("dark");
            themeBtn.classList.remove("dark");
            asideText.classList.remove("dark");

            btns.forEach(elem => elem.classList.remove("dark"));
            items.forEach(elem => elem.classList.remove("dark"));
            description.forEach(elem => elem.classList.remove("dark"));
            removeBtn.forEach(elem => elem.classList.remove("dark"));
        }
    });
}

function setData() {
    fetch("https://danielnecka.github.io/FrontedMentorBrowserExtensionsManagerUI/data.json")
        .then(response => response.json())
        .then(data => {
            allData = data;
            loadContent("all");
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
                
        const itemToUpdate = allData.find(dataItem => dataItem.name === elem.name);
        if (itemToUpdate) {
            itemToUpdate.isActive = checkbox.checked;
        }

        const selectedButton = document.querySelector(".btn.selected");

            if (selectedButton.innerText === "All") {
                loadContent("all");
            } else if (selectedButton.innerText === "Active") {
                loadContent("active");
            } else { 
                loadContent("inactive");
            } 
        })
    });

    removeElem();
}

function createItem(elem) {
    const div = document.createElement("div");
    div.classList.add("item");
    div.classList.add("dark");

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