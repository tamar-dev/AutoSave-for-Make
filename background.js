
const DEFAULT_INTERVAL = 5;

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.disable();

    chrome.storage.sync.get(['interval', 'autoSaveEnabled', 'saveAnyway'], (data) => {
        if (!data?.interval) {
            chrome.storage.sync.set({ "interval": DEFAULT_INTERVAL }); // Default interval is DEFAULT_INTERVAL minutes
        }
        if (data.autoSaveEnabled === undefined) {
            chrome.storage.sync.set({ "autoSaveEnabled": true });
        }
        if (data.saveAnyway === undefined) {
            chrome.storage.sync.set({ "saveAnyway": true });
        }
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {

        chrome.declarativeContent.onPageChanged.addRules([
            {
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: { hostSuffix: '.make.com' },
                    })
                ],
                actions: [
                    new chrome.declarativeContent.ShowAction(),
                ],
            }
        ]);
    });
});
