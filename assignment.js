class Assignment {
    constructor(name) {
        this._name = name;
        this._lastDate = null;
    }
    setLastDate(date) {
        this._lastDate = date;
    } 
    getLastDate() {
        return this._lastDate;
    }
    getName() {
        return this._name;
    }
}