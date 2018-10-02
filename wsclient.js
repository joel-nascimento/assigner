class WSClient {
    constructor(ip, port, onOpenCallback, onMessageCallback) {
        this._webSocket = new WebSocket(`ws://${ip}:${port}`);
        this._webSocket.onopen = onOpenCallback.bind(this);
        this._webSocket.onerror = this.onError;
        this._webSocket.onmessage = onMessageCallback.bind(this);
        this._webSocket.onclose = this.onClose;
    }

    onError(err) {
        console.log('err: ', err);
    }

    onClose() {
        console.log("Connection is closed...");
    }

    sendToServer(message) {
        if(this._webSocket)
            this._webSocket.send(JSON.stringify(message));
    }
}