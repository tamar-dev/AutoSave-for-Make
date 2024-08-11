# AutoSave for Make - Chrome Extension

## Overview

**AutoSave for Make** is a Chrome extension designed to automatically save scenarios on the Make website. This extension ensures that your progress is consistently saved at specified intervals, with the added functionality of automatically handling warning messages to ensure uninterrupted workflow.

## Features

- **Auto Save**: Automatically saves scenarios at a user-defined interval.
- **Save Anyway**: Handles "Save anyway" warnings by automatically clicking the button to ensure your changes are saved.
- **Customizable Settings**: Users can enable/disable auto-save and "Save anyway" functionality, and set the save interval directly from the extension's popup.
- **Real-Time Logs**: Displays the last save time and logs relevant messages to the user interface.

## Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click on **Load unpacked** and select the folder containing the extension files.

## Usage

1. After installation, click on the extension icon to open the popup.
2. Set your desired auto-save interval and enable/disable the auto-save and "Save anyway" options.
3. The extension will automatically save scenarios at the specified interval and handle any warnings that appear.

## Code Structure

- **background.js**: Contains the core logic for managing auto-save functionality and communicating with the content script.
- **content.js**: Manages the interaction with the Make website, including detecting and clicking the "Save anyway" button.
- **popup.js**: Handles user interactions within the popup interface.

## Contributing

Feel free to fork this repository, make improvements, and submit pull requests. Any contributions to enhance the extension are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have suggestions for improvements, please open an issue on this repository or contact me directly.

---

Happy automating!
