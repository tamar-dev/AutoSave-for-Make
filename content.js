const DEFAULT_INTERVAL = 5;

let lastSavedTimeElement, loggerElement, d, intervalObj;

const observerSaveAnyway = new MutationObserver((mutationsList) => {
    mutationsList.forEach(mutation => {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1 && node.innerText === "Save anyway") {
                    log(`Saved anyway at: ${new Date().toLocaleString()}`);
                    node.click();
                }
            });
        }
    });
});

function onLoad() {
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.justifyContent = "space-between";
    container.style.paddingInline = "35px";

    lastSavedTimeElement = document.createElement("span");
    lastSavedTimeElement.style.color = "#666666";

    loggerElement = document.createElement("span");
    loggerElement.style.color = "#666666";

    container.appendChild(lastSavedTimeElement);
    container.appendChild(loggerElement);

    d.insertBefore(container, d.firstChild);
    log("Loading autosave extension...");

    chrome.storage.onChanged.addListener((changes) => {
        if (changes.interval || changes.autoSaveEnabled || changes.saveAnyway) {
            getSettingsAndStartAutoSave();
        }
    });

    getSettingsAndStartAutoSave();
}

function getSettingsAndStartAutoSave() {
    chrome.storage.sync.get(['interval', 'autoSaveEnabled', 'saveAnyway'], (settings) => {
        const { interval = interval ?? DEFAULT_INTERVAL, autoSaveEnabled = true, saveAnyway = false } = settings;

        if (autoSaveEnabled) {
            startAutoSave(interval, saveAnyway);
        } else {
            clearInterval(intervalObj);
            log("Auto Save is disabled.");
        }
    });
}

function startAutoSave(interval, saveAnyway) {
    clearInterval(intervalObj);

    log(`Auto save started. Saving every ${interval} minutes.`);

    const intervalInMillis = (interval ?? DEFAULT_INTERVAL) * 60 * 1000;
    runSaveAnyway(saveAnyway);

    intervalObj = setInterval(clickSaveButton, intervalInMillis);
}

function clickSaveButton() {
    const saveButton = document.getElementById('scenariosave');
    if (saveButton) {
        saveButton.click();
        updateLastSavedTime();
    }
}

function updateLastSavedTime() {
    lastSavedTimeElement.textContent = `Last saved: ${new Date().toLocaleString()}`;
}

function log(message) {
    loggerElement.textContent = message;
}

function runSaveAnyway(shouldRun) {
    if (shouldRun) {
        observerSaveAnyway.observe(document.body, { childList: true, subtree: true });
    } else {
        observerSaveAnyway.disconnect();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const observer = new MutationObserver(() => {
        d = document.querySelector(".content-scenarios");
        if (d) {
            observer.disconnect();
            onLoad();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
