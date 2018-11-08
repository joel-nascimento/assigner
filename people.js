class People {
    constructor(wsClient) {
        this._table = 'pessoas';
        this._columns = [{
                column: 'nome',
                type: 'text'
            },
            {
                column: 'sobrenome',
                type: 'text'
            },
            {
                column: 'indicador',
                type: 'INT'
            },
            {
                column: 'dtIndicador',
                type: 'text'
            },
            {
                column: 'volante',
                type: 'INT'
            },
            {
                column: 'dtVolante',
                type: 'text'
            },
            {
                column: 'som',
                type: 'INT'
            },
            {
                column: 'dtSom',
                type: 'text'
            },
            {
                column: 'palco',
                type: 'INT'
            },
            {
                column: 'dtPalco',
                type: 'text'
            },
            {
                column: 'leitorA',
                type: 'INT'
            },
            {
                column: 'dtLeitorA',
                type: 'text'
            },
            {
                column: 'leitorE',
                type: 'INT'
            },
            {
                column: 'dtLeitorE',
                type: 'text'
            },
            {
                column: 'leitorB',
                type: 'INT'
            },
            {
                column: 'dtLeitorB',
                type: 'text'
            },
            {
                column: 'conversa',
                type: 'INT'
            },
            {
                column: 'dtConversa',
                type: 'text'
            },
            {
                column: 'conversaA',
                type: 'INT'
            },
            {
                column: 'dtConversaA',
                type: 'text'
            },
            {
                column: 'estudoBiblico',
                type: 'INT'
            },
            {
                column: 'dtEstudoBiblico',
                type: 'text'
            },
            {
                column: 'estudoBiblicoA',
                type: 'INT'
            },
            {
                column: 'dtEstudoBiblicoA',
                type: 'text'
            },
            {
                column: 'discurso',
                type: 'INT'
            },
            {
                column: 'dtDiscurso',
                type: 'text'
            },
        ];

        this._wsClient = wsClient;

        document.getElementById('savePersonBtn').onclick = this.save.bind(this);

        var config = {
            attributes: true
        };

        // Create an observer instance linked to the callback function
        var observer = new MutationObserver((mutationsList) => {
            var attrClass = mutationsList[0].target.getAttribute("class");
            if (attrClass == "menuLink active") {
                this.getAll();
            }
        });

        // Start observing the target node for configured mutations
        observer.observe(document.getElementsByName('people')[0], config);

        var gridColumns = this._columns.filter(item => item.column[0] != 'd' && item.column[1] != 't').map(item => "\"" + item.column + "\": \"" + item.column + "\"").join(', ');
        gridColumns = "{" + gridColumns + "}";
        this._grid = new AGrid(dojo.require('dojo/_base/declare'),
            dojo.require('dgrid/Grid'),
            dojo.require('dgrid/Keyboard'),
            dojo.require('dgrid/Selection'),
            JSON.parse(gridColumns));
    }
    init(congregacao) {
        var createTableColumns = this._columns.map(item => item.column + ' ' + item.type).join(', ');
        this._congregation = congregacao;
        var createTable = {
            'message': 'createTable',
            'dbName': congregacao,
            'table': this._table,
            'columns': createTableColumns
        }

        if (this._wsClient)
            this._wsClient.sendToServer(createTable);
    }
    save() {
        console.log('saving person');
        var nome = document.getElementsByName('nome')[0].value,
            sobrenome = document.getElementsByName('sobrenome')[0].value,
            indicador = document.getElementsByName('indicador')[0].checked,
            volante = document.getElementsByName('volante')[0].checked,
            leitorE = document.getElementsByName('leitorE')[0].checked,
            leitorA = document.getElementsByName('leitorA')[0].checked,
            palco = document.getElementsByName('palco')[0].checked,
            som = document.getElementsByName('som')[0].checked,
            leitorB = document.getElementsByName('leitorB')[0].checked,
            conversa = document.getElementsByName('conversa')[0].checked,
            conversaA = document.getElementsByName('conversaA')[0].checked,
            estudoBiblico = document.getElementsByName('estudoBiblico')[0].checked,
            estudoBiblicoA = document.getElementsByName('estudoBiblicoA')[0].checked,
            discurso = document.getElementsByName('discurso')[0].checked;

        var utc = new Date().toDateString();

        var valuesA = [];
        valuesA.push('\"' + nome + '\"');
        valuesA.push('\"' + sobrenome + '\"');
        valuesA.push(indicador);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(volante);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(som);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(palco);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(leitorA);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(leitorE);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(leitorB);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(conversa);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(conversaA);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(estudoBiblico);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(estudoBiblicoA);
        valuesA.push('\"' + utc + '\"');
        valuesA.push(discurso);
        valuesA.push('\"' + utc + '\"');

        var insertPersonColumns = this._columns.map(item => item.column).join(', ');
        var insertPersonValues = valuesA.map(item => item).join(', ');

        var insert = {
            'message': 'insert',
            'dbName': this._congregation,
            'table': this._table,
            'columns': insertPersonColumns,
            'values': insertPersonValues
        }
        if (this._wsClient)
            this._wsClient.sendToServer(insert);

        document.getElementsByName('nome')[0].value = "";
        document.getElementsByName('sobrenome')[0].value = "";
        document.getElementsByName('indicador')[0].checked = false;
        document.getElementsByName('volante')[0].checked = false;
        document.getElementsByName('leitorE')[0].checked = false;
        document.getElementsByName('leitorA')[0].checked = false;
        document.getElementsByName('palco')[0].checked = false;
        document.getElementsByName('som')[0].checked = false;
        document.getElementsByName('leitorB')[0].checked = false;
        document.getElementsByName('conversa')[0].checked = false;
        document.getElementsByName('conversaA')[0].checked = false;
        document.getElementsByName('estudoBiblico')[0].checked = false;
        document.getElementsByName('estudoBiblicoA')[0].checked = false;
        document.getElementsByName('discurso')[0].checked = false;

        this.getAll();
    }
    getAll() {
        var columns = this._columns.map(item => item.column).join(', ');

        var select = {
            'message': 'selectAll',
            'dbName': this._congregation,
            'table': this._table,
            'columns': columns
        }

        if (this._wsClient)
            this._wsClient.sendToServer(select);
    }
    receiveAll(data) {
        if (this._rows != data) {
            this._rows = data;
            this.populateGrid();
        }
    }
    rows() {
        return this._rows;
    }
    populateGrid() {
        if (this._grid && this._rows) {
            var toRender = [];
            this._rows.forEach(element => {
                toRender.push(JSON.parse("{" + this._columns.filter(item => item.column[0] != 'd' && item.column[1] != 't').map(item => "\"" + item.column + "\":" + "\"" + element[item.column] + "\"").join(', ') + "}"));
            });
            this._grid.render(toRender);
        }
    }
    getAllSorted(columnToSort) {
        if (!this._rows || this._rows.length == 0)
            return [];

        var sorted = this._rows;
        sorted.sort(function (a, b) {
            return Date(a[columnToSort]).getTime() - Date(b[columnToSort]).getTime()
        });
        return sorted;
    }
}