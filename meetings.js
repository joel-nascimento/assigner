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
        this.fillCombo('dtIndicador', 'riIndicador1');
        this.fillCombo('dtIndicador', 'riIndicador2');
        this.fillCombo('dtVolante', 'riVolante1');
        this.fillCombo('dtVolante', 'riVolante2');
        this.fillCombo('dtLeitorE', 'riLeitorEB');
        this.fillCombo('dtLeitorA', 'riLeitorA');
        this.fillCombo('dtPalco', 'riPalco');
        this.fillCombo('dtSom', 'riSom');
        this.fillCombo('dtLeitorB', 'riLeitorB');
        this.fillCombo('dtConversa', 'riConversa1');
        this.fillCombo('dtConversaA', 'riConversa1A');
        this.fillCombo('dtConversa', 'riConversa2');
        this.fillCombo('dtConversaA', 'riConversa2A');
        this.fillCombo('dtEstudoBiblico', 'riEstudoB');
        this.fillCombo('dtEstudoBiblicoA', 'riEstudoBA');
        this.fillCombo('dtDiscurso', 'riDiscurso');
    }
    fillCombo(sortColumn, comboId) {
        var node = document.getElementById(comboId);
        this.removeOptions(node);
        var sorted = this._people.getAllSorted(sortColumn);
        sorted.forEach(el => {
            this.addOption(node, el['nome'] + ' ' + el['sobrenome']);
        });
        this.addOption(node, '');
    }
    addOption(selectNode, textOption) {
        var option = document.createElement("option");
        option.text = textOption;
        selectNode.add(option);
    }
    removeOptions(selectNode) {
        while (selectNode.firstChild) {
            selectNode.removeChild(selectNode.firstChild);
        }
    }
    save() {

    }
}