'use strict';

const WebSocketServer = require('ws').Server;
var db_helper = require('./db_helper.js');

class Server {
    constructor() {
        const wss = new WebSocketServer({
            port: 8081
        });

        wss.on('connection', this.onConnetion.bind(this));
        this._ws = null;
    }
    onConnetion(ws) {
        this._ws = ws;
        this._ws.on('message', this.onMessage.bind(this))
    }
    onMessage(message) {
        var m = JSON.parse(message);
        var db = db_helper.openConn(m.dbName);
        if (!db) {
            return;
        }
        switch (m.message) {
            case 'createTable':
                db_helper.createTable(db, m.table, m.columns);
                break;
            case 'insert':
                db_helper.insertInto(db, m.table, m.columns, m.values);
                break;
            case 'selectAll':
                db_helper.selectAll(db, m.table, m.columns, this.sendToClient.bind(this));
            default:
                break;
        }
        if (db) {
            db_helper.closeConn(db);
        }
    }
    sendToClient(m) {
         this._ws.send(JSON.stringify(m));
    }
}

var srv = new Server();