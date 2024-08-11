DEFAULT_INTERVAL = 5;

document.addEventListener('DOMContentLoaded', () => {
    // Load the current settings
    chrome.storage.sync.get(['interval', 'autoSaveEnabled', 'saveAnyway'], (data) => {
        document.getElementById('interval').value = data?.interval ?? DEFAULT_INTERVAL;
        document.getElementById('enableAutoSave').checked = data?.autoSaveEnabled ?? true;
        document.getElementById('saveAnyway').checked = data?.saveAnyway ?? true;
    });

    document.getElementById('saveSettings').addEventListener('click', () => {
        const interval = document.getElementById('interval').value;
        const autoSaveEnabled = document.getElementById('enableAutoSave').checked;
        const saveAnyway = document.getElementById('saveAnyway').checked;

        chrome.storage.sync.set({
            "interval": parseFloat(interval),
            "autoSaveEnabled": autoSaveEnabled,
            "saveAnyway": saveAnyway
        }, () => {
            window.close();
        });
    });
});
