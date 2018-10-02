"use strict";

class Congregation {
    constructor(wsClient) {
        this._congregation = '';
        this._assignaments = [];

        this._wsClient = wsClient;

        var saveCongBtn = document.getElementById('saveCongBtn');
        saveCongBtn.onclick = this.saveCongregation.bind(this);
    }
    init(congregationName){
        var txtCongregation = document.getElementById('congNome')
        if(congregationName)
        {
            this._congregation = congregationName;
            txtCongregation.value = congregationName;
        }
        
        txtCongregation.disabled = true;
        var saveCongBtn = document.getElementById('saveCongBtn');
        saveCongBtn.style.display = 'none';
        var cancelCongBtn = document.getElementById('cancelCongBtn');
        cancelCongBtn.style.display = 'none';
    }
    saveCongregation() {
        var congregation = document.getElementById('congNome').value
        this._congregation = congregation;
        this.init();
        var insertName = {
            'message': 'insert',
            'dbName': 'config',
            'table': 'congregations',
            'columns': 'cong_name',
            'values': '\'' + congregation + '\''
        }
        if(this._wsClient)
            this._wsClient.sendToServer(insertName);
    }
}