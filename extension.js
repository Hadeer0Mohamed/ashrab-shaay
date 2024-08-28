const vscode = require('vscode');

// Interval for notifications: 30 seconds (30000 milliseconds)
const INTERVAL = 30 * 1000; 

let intervalId;
const messages = [
    'محتاجينك تروق علينا بكوبايتين شاي ',
    'شوفت لما شربت شاي وشك نور أزاي',
    'بقولك اية اذا شربت شاي ف نعنعه عشان تزهزه وتحلو ',
    'هما ساعتين شاي وكوبايتين جد وكل حاجة هتبقى كويسة',
    'ماتيجي نشرب شاي فلربما لسنا بخير'
];

function activate(context) {
    console.log('Congratulations, your extension "ashrab-shaay" is now active!');

    // Start notifications automatically with the predefined interval
    startNotifications(INTERVAL);

    // Register the command in case you want to keep it for other purposes
    const disposable = vscode.commands.registerCommand('ashrab-shaay.setInterval', function () {
        vscode.window.showInformationMessage('Auto notifications are set to every 30 seconds.');
    });

    context.subscriptions.push(disposable);
}

function startNotifications(interval) {
    if (intervalId) {
        clearInterval(intervalId);
    }

    let messageIndex = 0;

    intervalId = setInterval(() => {
        vscode.window.showInformationMessage(messages[messageIndex]);
        messageIndex = (messageIndex + 1) % messages.length;
    }, interval);
}

function deactivate() {
    if (intervalId) {
        clearInterval(intervalId);
    }
}

module.exports = {
    activate,
    deactivate
};
