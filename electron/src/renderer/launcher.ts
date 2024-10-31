import { ipcRenderer } from 'electron';

export class Launcher {
    private static _instance: Launcher = new Launcher();

    static getInstance(): Launcher {
        return Launcher._instance;
    }

    constructor() {
        if (Launcher._instance) {
            throw new Error('Error: Instantiation failed: Use Launcher.getInstance');
        }
        Launcher._instance = this;
    }

    ready() {
        ipcRenderer.send('launcher-ready');
    }

    unready() {
        ipcRenderer.send('launcher-unready');
    }

    close() {
        ipcRenderer.send('launcher-close');
    }
}


