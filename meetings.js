class Meetings {
    constructor(wsClient, people) {
        this._table = 'reunioes';
        this._columns = [{
                column: 'data',
                type: 'text'
            },
            {
                column: 'indicador1',
                type: 'text'
            },
            {
                column: 'indicador2',
                type: 'text'
            },
            {
                column: 'volante1',
                type: 'text'
            },
            {
                column: 'volante2',
                type: 'text'
            },
            {
                column: 'leitorEB',
                type: 'text'
            },
            {
                column: 'leitorA',
                type: 'text'
            },
            {
                column: 'palco',
                type: 'text'
            },
            {
                column: 'som',
                type: 'text'
            },
            {
                column: 'leitorB',
                type: 'text'
            },
            {
                column: 'conversa1',
                type: 'text'
            },
            {
                column: 'conversa1A',
                type: 'text'
            },
            {
                column: 'conversa2',
                type: 'text'
            },
            {
                column: 'conversa2A',
                type: 'text'
            },
            {
                column: 'estudoB',
                type: 'text'
            },
            {
                column: 'estudoBA',
                type: 'text'
            },
            {
                column: 'discurso',
                type: 'text'
            },
        ];

        this._wsClient = wsClient;
        this._people = people;
        this._busy = [];
        // Create an observer instance linked to the callback function
        var observer = new MutationObserver((mutationsList) => {
            var attrClass = mutationsList[0].target.getAttribute("class");
            if (attrClass == "menuLink active") {
                this.init();
            }
        });

        var config = {
            attributes: true
        }
        // Start observing the target node for configured mutations
        observer.observe(document.getElementsByName('addMeeting')[0], config);
    }
    init() {
        this.fillCombo('Indicador', 'dtIndicador', 'riIndicador1');
        this.fillCombo('Indicador', 'dtIndicador', 'riIndicador2');
        this.fillCombo('Volante', 'dtVolante', 'riVolante1');
        this.fillCombo('Volante', 'dtVolante', 'riVolante2');
        this.fillCombo('Leitor_Estudo_Bíblico', 'dtLeitorE', 'riLeitorEB');
        this.fillCombo('Leitor_A_Sentinela', 'dtLeitorA', 'riLeitorA');
        this.fillCombo('Palco', 'dtPalco', 'riPalco');
        this.fillCombo('Som', 'dtSom', 'riSom');
        this.fillCombo('Leitor_Bíblia', 'dtLeitorB', 'riLeitorB');
        this.fillCombo('Conversa', 'dtConversa', 'riConversa1');
        this.fillCombo('Conversa_Ajudante', 'dtConversaA', 'riConversa1A');
        this.fillCombo('Conversa', 'dtConversa', 'riConversa2');
        this.fillCombo('Conversa_Ajudante', 'dtConversaA', 'riConversa2A');
        this.fillCombo('Estudo_Bíblico', 'dtEstudoBiblico', 'riEstudoB');
        this.fillCombo('Estudo_Bíblico_Ajudante', 'dtEstudoBiblicoA', 'riEstudoBA');
        this.fillCombo('Discurso', 'dtDiscurso', 'riDiscurso');
    }
    fillCombo(column, sortColumn, comboId) {
        var node = document.getElementById(comboId);
        this.removeOptions(node);
        var value = 0;
        var sorted = this._people.getAllSorted(column, sortColumn);
        var busy = this._busy;
        var firstNotBusy = true;
        sorted.forEach(el => {
            var found = this._busy.find(b => {
                return b == el['Nome'];
            });
            if (found)
                return;
            if(firstNotBusy)
            {
                this._busy.push(el['Nome']);
                firstNotBusy = false;
            }
            this.addOption(node, el['Nome'], value++, false);
        });
        busy.forEach(el => {
            this.addOption(node, el, value++, true);
        })
        this.addOption(node, 'N/A', value++, false);
    }
    addOption(selectNode, textOption, value, busy) {
        var option = document.createElement("option");
        option.text = textOption;
        option.value = value;
        if(busy)
            option.style += 'color:red';
        selectNode.appendChild(option);
    }
    removeOptions(selectNode) {
        while (selectNode.firstChild) {
            selectNode.removeChild(selectNode.firstChild);
        }
    }
    save() {
        this._busy = [];
    }
}