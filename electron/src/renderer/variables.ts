import { ipcRenderer } from 'electron';

export class Variables {
    private static _instance: Variables = new Variables();
    data;

    static getInstance(): Variables {
        return Variables._instance;
    }

    constructor() {
        if (Variables._instance) {
            throw new Error('Error: Instantiation failed: Use Variables.getInstance');
        }
        Variables._instance = this;

        ipcRenderer.send('get-variables');

        this.data = ipcRenderer.sendSync('get-variables');
    }

    get(key) {
        return this.data[key];
    }
}


