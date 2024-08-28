const vscode = require('vscode');

let intervalId;
const messages = [
    'Message 1: Keep going!',
    'Message 2: You can do it!',
    'Message 3: Stay focused!',
    'Message 4: Almost there!',
    'Message 5: Great job!'
];

function activate(context) {
    console.log('Congratulations, your extension "ashrab-shaay" is now active!');

    const disposable = vscode.commands.registerCommand('ashrab-shaay.setInterval', async function () {
        const choices = [
            { label: '30 seconds', value: 30 * 1000 },
            { label: '1 minute', value: 1 * 60 * 1000 },
            { label: '5 minutes', value: 5 * 60 * 1000 },
            { label: '10 minutes', value: 10 * 60 * 1000 },
            { label: '15 minutes', value: 15 * 60 * 1000 },
            { label: '30 minutes', value: 30 * 60 * 1000 },
            { label: '1 hour', value: 60 * 60 * 1000 }
        ];

        const selected = await vscode.window.showQuickPick(choices.map(choice => choice.label));
        const selectedChoice = choices.find(choice => choice.label === selected);

        if (selectedChoice) {
            const interval = selectedChoice.value;
            startNotifications(interval);
        } else {
            vscode.window.showErrorMessage('No interval selected.');
        }
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