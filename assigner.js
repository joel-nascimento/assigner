"use strict";

class Assigner {
    constructor() {
        this._congregation = '';
        this._assignaments = [];

        this._wsClient = new WSClient('127.0.0.1', 8081, this.onConnect.bind(this), this.onMessage.bind(this));
        
        this._congregation = new Congregation(this._wsClient);
        
        var saveMeetingBtn = document.getElementById('saveMeetingBtn');
        saveMeetingBtn.onclick = this.saveMeeting.bind(this);
    }

    init(congregationName) {
        this._people = new People(this._wsClient);
        this._people.init(congregationName);
        this._meetings = new Meetings(this._wsClient, this._people);
    }
    onConnect() {
        var createInfo = {
            'message': 'createTable',
            'dbName': 'config',
            'table': 'congregations',
            'columns': 'cong_name text NOT NULL'
        }
        this._wsClient.sendToServer(createInfo);

        var select = {
            'message': 'selectAll',
            'dbName': 'config',
            'table': 'congregations',
            'columns': 'cong_name'
        }
        this._wsClient.sendToServer(select);
    }
    onMessage(message) {
        var m = JSON.parse(message.data);
        if(m.message == 'selectResult')
        {
            if(m.table == 'congregations')
            {
                if(m.data.length >= 1)
                {
                    this._congregation.init(m.data[0].cong_name);
                    this.init(m.data[0].cong_name);
                }
            }
            else
            {
                if(m.table == 'pessoas')
                {
                    this._people.receiveAll(m.data);
                }
            }
        }
    }
    saveMeeting() {
        console.log('saving meeting');
    }
}

var g = new Assigner();