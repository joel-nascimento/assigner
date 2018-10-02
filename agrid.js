class AGrid {
    constructor(declare, Grid, Keyboard, Selection, columns) {
        var CustomGrid = declare([Grid, Keyboard, Selection]);

        this._grid = new CustomGrid({
            columns,
            selectionMode: 'single',
            cellNavigation: false
        }, 'grid');
    }
    render(data) {
        this._grid.refresh();
        this._grid.renderArray(data);
    }
}