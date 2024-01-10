import { SaveFile } from './../domain/use-cases/save-file.use-case';
import { CreateTable } from './../domain/use-cases/create-table.use-case';
import { ServerApp } from './server-app';


describe('server-app', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileDestination: 'test-destination',
        fileName: 'test-filename',
    }
    beforeEach(()=> {
        jest.clearAllMocks();
      })

    test('Should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect( typeof ServerApp.run).toBe('function')
    })

    test('Should run ServerApp with options', () => {

        // const logSpy = jest.spyOn(console, 'log');
        // const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute');
        // const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute')
        
        // ServerApp.run(options);

        // expect(logSpy).toHaveBeenCalledTimes(2);
        // expect(logSpy).toHaveBeenCalledWith('Server running...');
        // expect(logSpy).toHaveBeenCalledWith('File created');
        // expect(createTableSpy).toHaveBeenCalledTimes(1);
        // expect(createTableSpy).toHaveBeenCalledWith({
        //     base: options.base,
        //     limit: options.limit
        // })
        // expect(saveFileSpy).toHaveBeenCalledTimes(1);
        
        // expect(saveFileSpy).toHaveBeenCalledWith({
        //     fileContent: expect.any(String),
        //     fileDestination: options.fileDestination,
        //     fileName: options.fileName
        // })
    })

    test('Should run with custom values mocked', () => {

        const logMock = jest.fn();
        const createMock = jest.fn()
        const saveFileMock = jest.fn();

        console.log = logMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;
 0 
        ServerApp.run(options);

    })
})