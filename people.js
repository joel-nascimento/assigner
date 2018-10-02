class People {
    constructor(wsClient) {
        this._table = 'pessoas';
        this._columns = [{
                column: 'nome',
                type: 'varchar(255)'
            },
            {
                column: 'sobrenome',
                type: 'varchar(255)'
            },
            {
                column: 'indicador',
                type: 'bit'
            },
            {
                column: 'dtIndicador',
                type: 'date'
            },
            {
                column: 'volante',
                type: 'bit'
            },
            {
                column: 'dtVolante',
                type: 'date'
            },
            {
                column: 'som',
                type: 'bit'
            },
            {
                column: 'dtSom',
                type: 'date'
            },
            {
                column: 'palco',
                type: 'bit'
            },
            {
                column: 'dtPalco',
                type: 'date'
            },
            {
                column: 'leitorA',
                type: 'bit'
            },
            {
                column: 'dtLeitorA',
                type: 'date'
            },
            {
                column: 'leitorE',
                type: 'bit'
            },
            {
                column: 'dtLeitorE',
                type: 'date'
            },
            {
                column: 'leitorB',
                type: 'bit'
            },
            {
                column: 'dtLeitorB',
                type: 'date'
            },
            {
                column: 'conversa',
                type: 'bit'
            },
            {
                column: 'dtConversa',
                type: 'date'
            },
            {
                column: 'conversaA',
                type: 'bit'
            },
            {
                column: 'dtConversaA',
                type: 'date'
            },
            {
                column: 'estudoBiblico',
                type: 'bit'
            },
            {
                column: 'dtEstudoBiblico',
                type: 'date'
            },
            {
                column: 'estudoBiblicoA',
                type: 'bit'
            },
            {
                column: 'dtEstudoBiblicoA',
                type: 'date'
            },
            {
                column: 'discurso',
                type: 'bit'
            },
            {
                column: 'dtDiscurso',
                type: 'date'
            },
        ];

        this._wsClient = wsClient;

        document.getElementById('savePersonBtn').onclick = this.save.bind(this);

        var config = {
            attributes: true
        };

        // Create an observer instance linked to the callback function
        var observer = new MutationObserver(() => {
            console.log("on change");
        });

        // Start observing the target node for configured mutations
        observer.observe(document.getElementsByName('people')[0], config);

        document.getElementsByName('people')[0].onchange = () => {
            console.log("on change");
        };

        var gridColumns = this._columns.filter(item => item.type != 'date').map(item => "\"" + item.column + "\": \"" + item.column + "\"").join(', ');
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

        this.getAll();
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

        var utc = new Date().toJSON().slice(0, 10); //.replace(/-/g,'/');

        var valuesA = [];
        valuesA.push('\"' + nome + '\"');
        valuesA.push('\"' + sobrenome + '\"');
        valuesA.push(indicador);
        valuesA.push(utc);
        valuesA.push(volante);
        valuesA.push(utc);
        valuesA.push(som);
        valuesA.push(utc);
        valuesA.push(palco);
        valuesA.push(utc);
        valuesA.push(leitorA);
        valuesA.push(utc);
        valuesA.push(leitorE);
        valuesA.push(utc);
        valuesA.push(leitorB);
        valuesA.push(utc);
        valuesA.push(conversa);
        valuesA.push(utc);
        valuesA.push(conversaA);
        valuesA.push(utc);
        valuesA.push(estudoBiblico);
        valuesA.push(utc);
        valuesA.push(estudoBiblicoA);
        valuesA.push(utc);
        valuesA.push(discurso);
        valuesA.push(utc);

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
    populateGrid(data) {
        if (this._grid) {
            var rows = [];
            data.forEach(element => {
                rows.push(JSON.parse("{" + this._columns.filter(item => item.type != 'date').map(item => "\"" + item.column + "\":" + "\"" + element[item.column] + "\"").join(', ') + "}"));
            });

            this._grid.render(rows);
        }
    }
}